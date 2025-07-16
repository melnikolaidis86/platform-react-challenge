import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { IoIosClose } from "react-icons/io";

type PopupProps = {
    message: string;
    type?: "success" | "error" | "info";
    onClose: () => void;
};

const CloseIcon = IoIosClose as React.FC<React.SVGProps<SVGSVGElement>>;

export function PopupMessage({ message, type = "info", onClose }: PopupProps) {
    const [visible, setVisible] = useState(true);

    // Automatically close after 4 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            setTimeout(onClose, 300); // wait for transition to complete
        }, 4000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const handleClose = () => {
        setVisible(false);
        setTimeout(onClose, 300); // match the transition duration
    };

    return (
        <div
            className={classNames(
                "fixed top-5 right-5 z-50 px-6 py-4 rounded-lg shadow-lg text-white transition-all duration-300 transform",
                {
                    "bg-green-600": type === "success",
                    "bg-red-600": type === "error",
                    "bg-blue-600": type === "info",
                    "opacity-0 translate-y-4": !visible,
                    "opacity-100 translate-y-0": visible,
                }
            )}
        >
            <div className="flex items-center justify-between gap-4">
                <span>{message}</span>
                <button
                    onClick={handleClose}
                    aria-label="Close popup"
                    className="text-white hover:text-gray-300"
                >
                    <CloseIcon className="h-6 w-6" />
                </button>
            </div>
        </div>
    );
}
