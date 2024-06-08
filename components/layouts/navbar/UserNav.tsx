import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {MenuIcon} from "lucide-react";
import Image from "next/image";
import avatar from "@/public/avatar.jpg"
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";

export default function UserNav(){
    return(
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="rounded-full border px-2 py-2 lg:px-4 lg:py-2 flex items-center gap-x-3">
                    <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5" />
                    <Image src={avatar} alt={"image of user"} className="rounded-full h-8 w-8 hidden lg:block" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem>
                    <RegisterLink className="w-full">Register</RegisterLink>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <LoginLink className="w-full">Login</LoginLink>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}