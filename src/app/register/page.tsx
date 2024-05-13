'use client'

import NftsCard from "./components/NftsCards/";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient()

export default function Register() {
    return <main className="flex min-h-screen flex-col items-center justify-between">
        <div className="container mt-10">
            <NftsCard />
        </div>
    </main >
}