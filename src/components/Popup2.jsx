"use client";

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import clsx from "clsx";
import { Fragment } from "react";
import { XIcon } from "lucide-react";

export default function Popup({
  title,
  closeButton = false,
  isOpen,
  onClose = () => {},
  children,
  className,
  maxWidth = "2xl",
  centered = true,
  position = "center", // "center" | "right"
  width = "w-[500px]", // khusus untuk drawer
}) {
  const maxWidthClasses = {
    sm: "sm:max-w-[400px]",
    md: "sm:max-w-md",
    lg: "sm:max-w-lg",
    xl: "sm:max-w-xl",
    "2xl": "sm:max-w-2xl",
    "3xl": "sm:max-w-3xl",
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-[#000000]/40" />
        </Transition.Child>

        {/* Wrapper */}
        <div
          className={`fixed inset-0 flex ${
            position === "center"
              ? "items-end sm:items-center justify-center"
              : "justify-end"
          }`}
        >
          {/* Panel animasi */}
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-out duration-300"
            enterFrom={
              position === "right"
                ? "translate-x-full"
                : "opacity-0 scale-95 translate-y-4"
            }
            enterTo={
              position === "right"
                ? "translate-x-0"
                : "opacity-100 scale-100 translate-y-0"
            }
            leave="transform transition ease-in duration-200"
            leaveFrom={
              position === "right"
                ? "translate-x-0"
                : "opacity-100 scale-100 translate-y-0"
            }
            leaveTo={
              position === "right"
                ? "translate-x-full"
                : "opacity-0 scale-95 translate-y-4"
            }
          >
            <DialogPanel
              className={clsx(
                "relative bg-white shadow-lg overflow-y-auto",
                position === "center"
                  ? `rounded-t-2xl sm:rounded-2xl p-6 max-h-[80vh] min-w-[350px] ${
                      maxWidthClasses[maxWidth] || ""
                    }`
                  : `h-screen ${width}`,
                className ? className : "",
              )}
            >
              {closeButton && (
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
                >
                  <XIcon size={24} />
                </button>
              )}
              <div
                className={
                  centered && position === "center" ? "text-center" : ""
                }
              >
                <DialogTitle className="text-lg font-semibold">
                  {title}
                </DialogTitle>
              </div>
              <div className="h-full ">{children}</div>
            </DialogPanel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
