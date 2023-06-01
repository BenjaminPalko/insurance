'use client';
import NavItem from "@/components/Nav/NavItem";

const AppBar = function () {
    return (
        <nav className={'flex gap-5 h-14 px-1 max-w-7xl mx-auto mt-2 bg-white dark:bg-gray-700 rounded shadow'}>
            <NavItem path={'/'}>Home</NavItem>
            <span className={'flex-1'}/>
            <NavItem path={'/login'}>Login</NavItem>
        </nav>
    )
}

export default AppBar;
