import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import { FaCat, FaPaw, FaHeart } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { NavLink } from "./NavLink";
import { resetCats } from "../features/cats";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../app/store";

const FatCatIcon = FaCat as React.FC<React.SVGProps<SVGSVGElement>>;
const FatPawIcon = FaPaw as React.FC<React.SVGProps<SVGSVGElement>>;
const FaHeartIcon = FaHeart as React.FC<React.SVGProps<SVGSVGElement>>;
const HiMenuIcon = HiMenu as React.FC<React.SVGProps<SVGSVGElement>>;
const HixIcon = HiX as React.FC<React.SVGProps<SVGSVGElement>>;

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation();

    const toggleMenu = () => setIsOpen(!isOpen);

    useEffect(() => {
        // Clear cats on other views
        if (location.pathname.startsWith("/favourites") ||
            location.pathname.startsWith("/breeds")
        ) {
            dispatch(resetCats());
        }
    }, [location.pathname, dispatch]);

    return (
        <nav className="w-full bg-white border-b shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <Link to="/" className="text-xl font-bold text-gray-800">
                        CatLover
                    </Link>

                    <div className="hidden md:flex items-center space-x-6">
                        <NavLink href="/" icon={<FatCatIcon />} label="Cats"/>
                        <NavLink href="/breeds" icon={<FatPawIcon />} label="Breeds"/>
                        <NavLink href="/favourites" icon={<FaHeartIcon />} label="My Favorites"/>
                    </div>

                    <button
                        onClick={toggleMenu}
                        className="md:hidden text-gray-700 focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <HixIcon className="w-6 h-6"/> : <HiMenuIcon className="w-6 h-6"/>}
                    </button>
                </div>

                {isOpen && (
                    <div className="md:hidden mt-2 space-y-2">
                        <NavLink href="/" icon={<FatCatIcon />} label="Cats" mobile/>
                        <NavLink href="/breeds" icon={<FatPawIcon />} label="Breeds" mobile/>
                        <NavLink href="/favourites" icon={<FaHeartIcon />} label="My Favourites" mobile/>
                    </div>
                )}
            </div>
        </nav>
    );
}