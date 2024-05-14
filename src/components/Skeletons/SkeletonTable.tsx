export function SkeletonTable({ number = 1 }) {
    return <div className="space-y-2">
        {
            new Array(number).fill(1).map((_, index) => (
                <div
                    className="shadow rounded-md w-full mx-auto"
                    key={index}
                >
                    <div className="animate-pulse">
                        <div className="bg-gray-200 h-16 w-full rounded-lg"></div>
                    </div>
                </div>
            ))
        }
    </div>

}
