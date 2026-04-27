import { atomWithStorage } from "jotai/utils";
import { store } from "../lib/store";

export const tokenAtom = atomWithStorage<string | null>("token",null);

export function RemoveAuthToken() : void{
    store.set(tokenAtom,null);
}
export function SetAuthToken(newToken : string | null) : void{
    store.set(tokenAtom,newToken);
}
export function GetAuthToken() : string | null{
    return store.get(tokenAtom);
}