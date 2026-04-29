/*
import { atomWithStorage } from "jotai/utils";
import { store } from "../lib/store";
export const tokenAtom = atomWithStorage<string | null>("token",null);

const stored = localStorage.getItem("token");
store.set(tokenAtom, stored);

export function RemoveAuthToken() : void{
    store.set(tokenAtom,null);
}
export function SetAuthToken(newToken : string | null) : void{
    store.set(tokenAtom,newToken);
}
export function GetAuthToken() : string | null{
    const token = store.get(tokenAtom);
    if(token === "null"){
        return null;
    }
    return token ?? null;
}
*/