import { Fragment, useEffect } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";

export default function DropdownMenu({
  label,
  items,
  onClick,
  actionOnClose = () => {},
}) {
  return (
    <Menu as="div">
      {({ open }) => {
        useEffect(() => {
          if (!open) actionOnClose();
        }, [open]);

        return (
          <>
            <MenuButton
              onClick={onClick}
              className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-semibold focus:outline-none"
            >
              {label}
            </MenuButton>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-150"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <MenuItems
                anchor="bottom end"
                className="origin-top-right space-y-3 rounded-xl border border-gray-200 text-sm bg-white shadow-lg focus:outline-none select-none p-3 z-20"
              >
                {items.map((item, idx) => {
                  if (typeof item.visible === "boolean" && !item.visible) {
                    return null;
                  }
                  if (item.label === "divider") {
                    return <div key={idx} className="my-1 h-px bg-gray-200" />;
                  }
                  return (
                    <MenuItem key={idx}>
                      <button
                        onClick={item.onClick}
                        className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 hover:bg-gray-100"
                      >
                        {item.icon}
                        {item.label}
                      </button>
                    </MenuItem>
                  );
                })}
              </MenuItems>
            </Transition>
          </>
        );
      }}
    </Menu>
  );
}
