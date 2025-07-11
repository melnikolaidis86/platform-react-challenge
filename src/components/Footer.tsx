import React from "react";

export function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="w-full py-4 text-center text-sm text-gray-700 bg-gray-100 border-t">
            © {year} <span className="font-semibold text-gray-700">mnworks</span>
        </footer>
    );
}
