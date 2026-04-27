import { atomWithStorage } from "jotai/utils";
import { store } from "../lib/store";

export const tokenAtom = atomWithStorage<string | null>("token",null);

export function RemoveAuthToken(){
    store.set(tokenAtom,null);
}