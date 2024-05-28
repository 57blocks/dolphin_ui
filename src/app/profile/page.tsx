'use client'
import { useAccount } from "wagmi";
import IPCards from "./components/IPCards";

export default function Page() {
    const { address } = useAccount();
    return <div>
        <div className="relative">
            <div className="h-[400px] bg-gradient-to-r from-violet-500 to-fuchsia-500"></div>
            <div className="absolute left-8 bottom-[-20px] h-[150px] w-[150px] rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 border-[5px] border-white shadow-2xl"></div>
        </div>
        <div className="px-8 font-bold mt-16">
            Wallet: {address}
        </div>
        <h4 className="px-8 mt-8 font-bold text-3xl">My Holds</h4>
        <div className="px-4 grid grid-cols-4 gap-y-8 gap-x-1 mt-8">
            <IPCards address={address} />
        </div>
    </div>
}