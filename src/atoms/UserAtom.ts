import {atom} from "jotai";

const UserAtom = atom<{ email: string } | null>(null);

export default UserAtom;
