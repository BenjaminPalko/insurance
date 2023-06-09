import UserAtom from "@/atoms/UserAtom";
import {useSetAtom} from "jotai";
import {redirect} from "next/navigation";

export default async function Login() {

    const setUser = useSetAtom(UserAtom)
    setUser({email: 'test@dev.com'});
    redirect('/');
}
