import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { UserType } from "src/_types/type";

export const usernameAtom = atom<string>("");
export const userAtom = atom<UserType>({
  username: "",
  password: "",
});
export const isLoggedInAtom = atomWithStorage<string>("isLoggedIn", "false");
