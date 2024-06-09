"use client"
import {categoryItems} from "@/lib/CategoryLists";
import Link from "next/link";
import Image from "next/image";
import {usePathname, useSearchParams} from "next/navigation";
import {useCallback} from "react";
import {cn} from "@/lib/utils";

export default function FilterBar(){
    const searchParams = useSearchParams()
    const pathName = usePathname()
    const search = searchParams.get("filter")
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);
            return params.toString();
        },
        [searchParams]
    );

    return(
        <div className="flex items-center justify-evenly mt-5 w-full overflow-x-scroll no-scrollbar">
            {categoryItems.map((item) => (
                <Link className={cn(
                    search === item.name
                        ? "border-b-2 border-black pb-2 flex-shrink-0"
                        : "opacity-80 flex-shrink-0",
                    "flex flex-col gap-y-3 items-center"
                )} key={item.id} href={pathName + "?" + createQueryString("filter", item.name)}>
                    <div className="relative w-6 h-6">
                        <Image src={item.imageUrl} alt={"Category Image"} width={24} height={24} className="w-6 h-6"/>
                    </div>
                    <p className="text-xs font-medium">
                        {item.title}
                    </p>
                </Link>
            ))}
        </div>
    )
}