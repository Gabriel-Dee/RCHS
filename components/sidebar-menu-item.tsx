"use client";
import { useSideBarToggle } from '@/hooks/use-sidebar-toggle';
import { SideNavItem } from '@/types/types';
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import { BsChevronRight } from 'react-icons/bs';
import { UrlObject } from 'url';

export const SideBarMenuItem = ({ item }: { item: SideNavItem }) => {

    const { toggleCollapse } = useSideBarToggle();

    const pathname = usePathname();

    const [subMenuOpen, setSubMenuOpen] = useState(false);

    const toggleSubMenu = () => {
        setSubMenuOpen(!subMenuOpen);
    };

    const inactiveLink = classNames("flex items-center min-h-[40px] h-full text-white py-2 px-4 hover:text-sidebar-muted-foreground  hover:bg-rchsLight rounded-md transition duration-200",
        { ["justify-center"]: toggleCollapse }
    );

    const activeLink = classNames("rounded-md text-white light:text-black light:bg-rchs bg-rchsDark text-sidebar-muted-foreground");

    const navMenuDropdownItem = "text-black py-2 px-4 hover:text-white transition duration-200 rounded-md"

    const dropdownMenuHeaderLink = classNames(inactiveLink,
        {
            ["bg-rchs"]: subMenuOpen
        }
    );
    return (
        <>
            {item.submenu ? (
                <div className="min-w-[18px]">
                    <a className={`${dropdownMenuHeaderLink} ${pathname.includes(item.path) ? activeLink : ''}`}
                        onClick={toggleSubMenu}>
                        <div className='min-w-[20px]'>{item.icon}</div>
                        {!toggleCollapse && <>
                            <span className='ml-3 text-base leading-6 font-semibold'>{item.title}</span>
                            <BsChevronRight className={`${subMenuOpen ? 'rotate-90' : ''} ml-auto stroke-2 text-xs`} />
                        </>
                        }
                    </a>
                    {subMenuOpen && !toggleCollapse && (
                        <div className='bg-rchsLight border-l-4 rounded-lg'>
                            <div className='grid gap-y-2 px-10 leading-5 py-3'>
                                {item.subMenuItems?.map((subItem: { path: string | UrlObject; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }, idx: React.Key | null | undefined) => {
                                    return (
                                        <Link
                                            key={idx}
                                            href={subItem.path}
                                            className={`${navMenuDropdownItem} ${subItem.path === pathname ? ' text-white font-medium ' : ' text-white'}`}
                                        >
                                            <span>{subItem.title}</span>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>)
                    }
                </div>
            ) :
                (<Link href={item.path} className={`${inactiveLink} ${item.path === pathname ? activeLink : ''}`}>
                    <div className='min-w-[20px]'>{item.icon}</div>
                    {!toggleCollapse && (<span className="ml-3 leading-6 font-semibold">{item.title}</span>)}
                </Link>)}
        </>
    );
};