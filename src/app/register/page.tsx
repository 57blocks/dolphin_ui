'use client'

import { useAccount } from "wagmi";
import NftCards from "./components/NftCards";

export default function Register() {
    const { isConnecting, isDisconnected } = useAccount()
    if (isDisconnected || isConnecting) {
        return (
            <div className="mt-8 flex mx-auto flex-col gap-4 w-full justify-center items-center">
                <div>Please connect wallet</div>
            </div>
        )
    }
    return <main>
        <div className="mx-14 mt-10">
            <NftCards />
        </div>
    </main >
}