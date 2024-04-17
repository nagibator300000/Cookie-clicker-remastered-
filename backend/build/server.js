import express from "express";
import cookieParser from "cookie-parser";
console.log("Starting back");
const middleware = cookieParser();
const app = express();
let count = 0;
const stats = [
    { id: 0, money: 0 },
    { id: 1, money: 10 },
    { id: 2, money: 50 },
];
app.use(middleware);
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
app.get("/count?+:count", (req, res) => {
    count += Number(req.params.count) || 1;
    res.send(`${count}`);
});
app.listen(process.env.PORT, () => {
    console.log("Started on port:", process.env.PORT);
});
