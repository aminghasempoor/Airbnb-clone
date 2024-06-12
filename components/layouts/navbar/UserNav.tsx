import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {MenuIcon} from "lucide-react";
import Image from "next/image";
import avatar from "@/public/avatar.jpg"
import {RegisterLink, LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import {createAirbnbHome} from "@/lib/action";
export default async function UserNav() {
    const {getUser} = getKindeServerSession()
    const user = await getUser()
    const createHomewithId = createAirbnbHome.bind(null, {
        userId: user?.id as string,
    });

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="rounded-full border px-2 py-2 lg:px-4 lg:py-2 flex items-center gap-x-3">
                    <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5"/>
                    <Image width={32} height={32}  src={user?.picture ??  avatar} alt={"image of user"} className="rounded-full h-8 w-8 hidden lg:block"/>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
                {user ? (
                    <>
                        <DropdownMenuLabel>{user.given_name! + user.family_name!}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <form action={createHomewithId} className="w-full px-2 py-2">
                            <button type="submit" className="w-full text-start">
                                Airbnb your Home
                            </button>
                        </form>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link href="/MyHomes" className="w-full">My List</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href="/favorite" className="w-full">My Favorites</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href="/" className="w-full">My Reservation</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <LogoutLink className="w-full">Log out</LogoutLink>
                        </DropdownMenuItem>
                    </>
                ) : (
                    <>
                        <DropdownMenuItem>
                            <RegisterLink className="w-full">Register</RegisterLink>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <LoginLink className="w-full">Login</LoginLink>
                        </DropdownMenuItem>
                    </>
                )}

            </DropdownMenuContent>
        </DropdownMenu>
    )
}