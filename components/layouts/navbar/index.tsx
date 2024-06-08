import {Button} from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import desktopLogo from "@/public/airbnb-desktop.png"
import mobileLogo from "@/public/airbnb-mobile.webp"
import UserNav from "@/components/layouts/navbar/UserNav";

export default function Navbar() {
    return (
        <nav className="w-full border-b">
            <div className="flex w-full items-center justify-between mx-0 px-5 lg:px-10 py-5">
                <Link href={'/'}>
                    <Image src={desktopLogo} alt={"picture"} className="w-32 hidden lg:block"/>
                    <Image src={mobileLogo} alt={"picture"} className="w-12 block lg:hidden"/>
                </Link>
                <div className="rounded-full border px-5 py-2">
                    <h1>Search...</h1>
                </div>
                <UserNav/>
            </div>
        </nav>
    )
}