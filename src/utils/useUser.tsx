import { useQuery } from "@tanstack/react-query";
import fetchJSON from "./fetchJSON";
import UserSchema from "../../schemas/user";

const BACK_URL = import.meta.env.VITE_BACK_URL;

async function fetchUser() {
  const res = await fetchJSON(BACK_URL + "/user", {
    credentials: "include",
  });
  return UserSchema.parse(res);
}

export default function useUser() {
  return useQuery({ queryKey: ["user"], queryFn: fetchUser });
}
