import React, { Fragment } from "react";
import { Dialog, DialogPanel, Transition } from "@headlessui/react";
import { IoIosClose } from "react-icons/io";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const CloseIcon = IoIosClose as React.FC<React.SVGProps<SVGSVGElement>>;

export function Modal({ isOpen, onClose, children }: ModalProps) {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-40" onClose={onClose}>
                {/* Backdrop */}
                <Transition
                    as={Fragment}
                    enter="ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    show={isOpen}
                >
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
                </Transition>

                {/* Modal panel */}
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition
                            as={Fragment}
                            enter="ease-out duration-200"
                            enterFrom="opacity-0 scale-95 translate-y-2"
                            enterTo="opacity-100 scale-100 translate-y-0"
                            leave="ease-in duration-150"
                            leaveFrom="opacity-100 scale-100 translate-y-0"
                            leaveTo="opacity-0 scale-95 translate-y-2"
                            show={isOpen}
                        >
                            <DialogPanel className="relative w-full max-w-screen-lg transform overflow-hidden rounded-xl bg-white px-6 pt-12 pb-16 shadow-xl transition-all">
                                {/* Close Button */}
                                <button
                                    onClick={onClose}
                                    className="absolute top-2 right-2 lg:top-4 lg:right-4 text-gray-500 hover:text-gray-700 transition"
                                    aria-label="Close"
                                >
                                    <CloseIcon className="w-10 h-10" />
                                </button>

                                {children}
                            </DialogPanel>
                        </Transition>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
