'use client';

import WalletConnector from "../WalletConnector";

export default function Nav() {
    return <nav className="h-[70px] flex justify-between items-center px-8">
        <div>Hackathon</div>
        <WalletConnector />
    </nav>
}