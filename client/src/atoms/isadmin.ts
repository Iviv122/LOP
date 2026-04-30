import { atomWithStorage } from "jotai/utils";
import { store } from "../lib/utils/store";

const tokenAtomStorageName = "isAdmin";

const tokenAtom = atomWithStorage<boolean>(tokenAtomStorageName,false);

export function RemoveAdmin() : void{
    store.set(tokenAtom,false);
}
export function SetAdmin(newValue : boolean) : void{
    store.set(tokenAtom,newValue);
}
export function IsAdmin() : boolean{
    const token = store.get(tokenAtom);
    return token;
}
export function RoleLabel() : string{
    if(IsAdmin()){
        return "superuser"
    }else{
        return "user"
    }
}
