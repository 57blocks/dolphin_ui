export default function SkeletonCard({ number = 1 }) {
    return new Array(number).fill(1).map((_, index) => (
        <div
            className="shadow rounded-md p-4 w-full mx-auto"
            key={index}
        >
            <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-2 py-1">
                    <div className="h-[400px] bg-slate-200 rounded"></div>
                    <div className="space-y-2">
                        <div className="h-2 bg-slate-200 rounded"></div>
                        <div className="h-2 bg-slate-200 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    ))
}