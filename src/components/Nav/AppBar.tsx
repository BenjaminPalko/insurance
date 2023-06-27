'use client';
import UserAtom from "@/atoms/UserAtom";
import NavItem from "@/components/Nav/NavItem";
import {useAtom} from "jotai";
import {usePathname} from "next/navigation";


const links: { href: string, name: string }[] = [
    {href: '/', name: 'Home'},
    {href: '/submission', name: 'Submission'}
]

interface AppBarProps {
}

const AppBar = function ({}: AppBarProps) {

    const user = useAtom(UserAtom);
    const pathname = usePathname();

    const profileAvatar = function () {
        if (!user) {
            return (
                <NavItem path={'/login'} isCurrent={pathname === '/login'}>Login</NavItem>
            )
        } else {
            return (
                <NavItem path={'/logout'} isCurrent={pathname === '/logout'}>Logout</NavItem>
            )
        }
    }

    return (
        <nav
            className={'flex gap-3 h-14 px-1 max-w-7xl w-full mx-auto mt-2 p-2 px-4 bg-white dark:bg-gray-700 rounded shadow'}>
            {
                links.map(link => (
                    <NavItem path={link.href} isCurrent={pathname === link.href} key={link.name}>{link.name}</NavItem>
                ))
            }
            <div className={'flex-1'}/>
            {
                profileAvatar()
            }
        </nav>
    )
}

export default AppBar;
