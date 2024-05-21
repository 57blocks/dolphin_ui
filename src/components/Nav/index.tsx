'use client';

import Link from "next/link";
import WalletConnector from "../WalletConnector";

export default function Nav() {
    return <nav className="h-[70px] flex justify-between items-center px-8">
        <h1 className="text-2xl w-[150px] font-bold text-indigo-600">
            <Link href='/'>Dolphin</Link>
        </h1>
        <div>
            <WalletConnector />
        </div>
    </nav>
}