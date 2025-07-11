import React from "react";
import { Link } from "react-router-dom";

export function NavLink({ href, icon, label, mobile = false,}: { href: string; icon: React.ReactNode; label: string; mobile?: boolean; }) {
    const baseClass = "flex items-center gap-2 text-gray-600 hover:text-gray-900 transition";
    const mobileClass = mobile ? "block px-2 py-2 border-b" : "";

    return (
        <Link to={href} className={`${baseClass} ${mobileClass}`}>
            <span className="text-lg">{icon}</span>
            <span>{label}</span>
        </Link>
    );
}