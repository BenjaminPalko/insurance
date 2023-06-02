import Link from "next/link";
import {PropsWithChildren} from "react";
import {twMerge} from "tailwind-merge";

interface NavItemProps {
    path: string;
    className?: string;
    isCurrent?: boolean;
}

const NavItem = function ({path, className, isCurrent = false, children}: PropsWithChildren<NavItemProps>) {

    return (
        <Link href={path}
              className={twMerge(`flex items-center py-2 px-3 rounded text-md font-light bg-gray-300 active:bg-gray-200 ${isCurrent ? 'dark:bg-secondary-main dark:active:bg-secondary-dark' : 'dark:bg-primary-main dark:active:bg-primary-dark'} hover:cursor-pointer`, className)}>
            {children}
        </Link>
    )
}

export default NavItem;
