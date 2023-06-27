import UserAtom from "@/atoms/UserAtom";
import {useSetAtom} from "jotai";
import {redirect} from "next/navigation";

export default async function Logout() {

    const setUser = useSetAtom(UserAtom)
    setUser(null);
    redirect('/');
}
