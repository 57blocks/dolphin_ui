import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import SearchModal from "./searchModal";

export default function Search() {
    const [open, setOpen] = useState(false);
    return <>
        <div
            onClick={() => setOpen(true)}
            className="flex items-center w-[400px] h-[42px] rounded-lg cursor-pointer border bg-gray-200"
        >
            <div className="shrink-0 p-2">
                <MagnifyingGlassIcon height="16" width="16" />
            </div>
            <p>Search the ip asset with id</p>
        </div>
        <SearchModal visible={open} onClose={() => setOpen(false)} />
    </>

}