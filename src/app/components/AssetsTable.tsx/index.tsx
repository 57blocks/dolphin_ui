import Pagination from "@/components/Pagination";
import { Button, ChevronDownIcon } from "@radix-ui/themes";

export default function AssetsTable() {
    return <>
        <h2 className="text-2xl font-bold">Assets Viewer</h2>
        <div className="border rounded-lg mt-4">
            <div className="p-4">
                <ul>
                    {
                        new Array(10).fill(1).map((_, index) => (
                            <li
                                key={index}
                                className="flex justify-between items-center rounded-lg p-4 odd:bg-gray-100">
                                <img
                                    className="w-16 h-16 rounded-lg object-cover"
                                    src="http://gips2.baidu.com/it/u=195724436,3554684702&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960"
                                    alt=""
                                />
                                <div className="flex flex-1 ml-4 items-center">
                                    <div>
                                        <h4 className="text-lg font-bold">name</h4>
                                        <p>Token ID: 123123</p>
                                    </div>
                                    <div className="flex ml-4 basis-1/2 flex-1 justify-around items-center">
                                        <div className="h-[30px] w-[1px] bg-gray-300"></div>
                                        <div>
                                            <h4 className="text-lg font-bold">Commercial Remix</h4>
                                            <p>Token ID: 123123</p>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold">Live</h4>
                                            <p>Token ID: 123123</p>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold">[ 0, 1, 1, 3]</h4>
                                            <p>Token ID: 123123</p>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-green-600">$10-$20</h4>
                                            <p>Token ID: 123123</p>
                                        </div>
                                        <div className="h-[30px] w-[1px] bg-gray-300"></div>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    className="m-2 px-2 cursor-pointer"
                                >
                                    View All
                                    <ChevronDownIcon />
                                </Button>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="flex justify-end p-4">
                <Pagination totalPages={2} />
            </div>
        </div>
    </>
}