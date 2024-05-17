'use client';

import Link from "next/link";
import WalletConnector from "../WalletConnector";

export default function Nav() {
    return <nav className="h-[70px] flex justify-between items-center px-8">
        <h1 className="text-2xl w-[150px] font-bold text-indigo-600">
            <Link href='/'>Hackathon</Link>
        </h1>
        <div className="flex items-center flex-1">
            <Link href='/register'>Racking</Link>
        </div>
        <div>
            <WalletConnector />
        </div>
    </nav>
}