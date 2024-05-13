'use client'

import AssetsTable from "./components/AssetsTable.tsx";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="container mt-10">
        <AssetsTable />
      </div>
    </main >
  );
}
