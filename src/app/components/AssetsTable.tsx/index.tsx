import Pagination from "@/components/Pagination";

export default function AssetsTable() {
    return <>
        <h2>Assets Viewer</h2>
        <div className="border rounded-md">
            <div className="p-4 font-bold">Global</div>
            <div className="p-4 border-t">
                table
            </div>
            <div className="flex justify-end p-4">
                <Pagination totalPages={2} />
            </div>
        </div>
    </>
}