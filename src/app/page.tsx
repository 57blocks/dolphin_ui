'use client'

import AssetsTable from "./components/AssetsTable.tsx";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <div className="container">
        <AssetsTable />
      </div>
    </main >
  );
}
