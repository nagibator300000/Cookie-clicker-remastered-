import express from "express";
import cookiePlugin from "cookie-parser";
import sessionPlugin from "express-session";
import corsPlugin from "cors";
import { PrismaClient } from "@prisma/client";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { Strategy } from "passport-google-oauth20";
import { loadEnv } from "./utils.js";
import passport from "passport";
import bodyParser from "body-parser";
console.log("Starting back");
const cookieMiddleware = cookiePlugin();
const db = new PrismaClient();
const prismaStore = new PrismaSessionStore(db, {
    checkPeriod: 2 * 6000,
    dbRecordIdIsSessionId: true,
});
const strategy = new Strategy({
    clientID: loadEnv("CLIENT_ID"),
    clientSecret: loadEnv("CLIENT_SECRET"),
    callbackURL: "http://localhost:1488/callback",
}, async (_accessToken, _refreshToken, profile, callback) => {
    console.log(JSON.stringify(profile, null, 2));
    const picture = profile.photos ? profile.photos[0].value : "";
    const user = await db.user.upsert({
        where: { id: profile.id },
        update: {},
        create: {
            id: profile.id,
            name: profile.displayName,
            picture,
            gameData: "{}",
        },
    });
    callback(null, user);
});
passport.use(strategy);
const corsMiddleware = corsPlugin({
    origin: "http://localhost:1941",
    credentials: true,
});
const sessionMiddleware = sessionPlugin({
    secret: loadEnv("SECRET"),
    resave: false,
    saveUninitialized: false,
    store: prismaStore,
});
const app = express();
const stats = [
    { id: 0, money: 0 },
    { id: 1, money: 10 },
    { id: 2, money: 50 },
];
app.use(cookieMiddleware);
app.use(sessionMiddleware);
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
function hasId(obj) {
    return (typeof obj === "object" &&
        !!obj &&
        "id" in obj &&
        typeof obj.id === "string");
}
passport.serializeUser((user, done) => {
    done(null, { id: user.id });
});
passport.deserializeUser(async (userData, done) => {
    if (hasId(userData)) {
        const user = await db.user.findUnique({
            where: { id: userData.id },
        });
        done(null, user);
    }
    else {
        done("User hasn't id");
    }
});
app.get("/", (_req, res) => {
    res.send("Nuke");
});
app.get("/stat/:userId", (req, res) => {
    console.log("aaa");
    const stat = stats[Number(req.params.userId)];
    if (!stat) {
        res.status(404).send("Not found");
    }
    res.json(stat);
});
app.get("/login", passport.authenticate("google", {
    scope: ["profile"],
}));
app.get("/user", corsMiddleware, (req, res) => {
    if (req.user) {
        const json = { name: req.user.name, picture: req.user.picture };
        res.json(json);
    }
    else {
        res.sendStatus(401);
    }
});
app.get("/callback", passport.authenticate("google", {
    successRedirect: "http://localhost:1941/",
}));
app.get("/gamedata", corsMiddleware, (req, res) => {
    if (req.user) {
        const data = JSON.parse(req.user?.gameData);
        res.json(data);
    }
    else {
        res.sendStatus(401);
    }
});
app.options("/gamedata", corsMiddleware);
app.post("/gamedata", corsMiddleware, async (req, res) => {
    if (req.user) {
        const newData = req.body;
        console.log(newData);
        const { gameData: string_gameData } = await db.user.update({
            where: { id: req.user.id },
            data: { gameData: JSON.stringify(newData) },
        });
        const gameData = JSON.parse(string_gameData);
        res.json(gameData);
    }
    else {
        res.sendStatus(401);
    }
});
app.get("/logout", (req, res) => {
    req.logout((err) => {
        console.log(err);
    });
    res.redirect("http://localhost:1941/");
});
app.listen(process.env.VITE_BACK_PORT, () => {
    console.log("Started on port:", process.env.VITE_BACK_PORT);
});
