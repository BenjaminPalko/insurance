import {useRouter} from "next/navigation";
import {PropsWithChildren} from "react";

interface NavItemProps {
    path: string;
}

const NavItem = function ({path, children}: PropsWithChildren<NavItemProps>) {

    const router = useRouter();

    const handleClick = function () {
        router.push(path)
    }

    return (
        <button onClick={handleClick} className={'flex items-center m-2 py-2 px-3 rounded text-md font-light bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 active:bg-gray-200 dark:active:bg-gray-800 hover:cursor-pointer'}>
            {children}
        </button>
    )
}

export default NavItem;
