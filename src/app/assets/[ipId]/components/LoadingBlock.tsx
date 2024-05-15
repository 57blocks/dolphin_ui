export default function LoadingBlock() {
    return (
        <main className="flex flex-col items-center justify-between">
            <div className="container grid max-w-7xl animate-pulse grid-cols-12 gap-8 py-8">
                <div className="page-header col-span-12 flex items-center justify-between">
                    {/* title */}
                    <div className="h-16 w-1/3 rounded-4xl bg-neutral-50"></div>
                </div>
                {/* image */}
                <div className="relative col-span-12 flex flex-col gap-6 md:col-span-6">
                    <div className="flex aspect-square w-full flex-shrink-0 rounded-4xl bg-neutral-50"></div>

                    {/* description */}
                    <div className="col-span-12 h-24 rounded-4xl bg-neutral-50 md:col-span-6"></div>
                </div>

                <div className="col-span-12 flex flex-col gap-6 md:col-span-6">
                    {/* licenses */}
                    <div className="aspect-video w-full rounded-4xl bg-neutral-50"></div>
                    {/* details */}
                    <div className="aspect-video w-full rounded-4xl bg-neutral-50"></div>
                </div>
                {/* lineage */}
                <div className="col-span-12 rounded-4xl bg-neutral-50"></div>
            </div>
        </main>
    )
}