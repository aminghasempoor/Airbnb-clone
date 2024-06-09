import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/lib/db";
import {NextResponse} from "next/server";
export async function GET(){
    const {getUser} = getKindeServerSession()
    const user = await getUser() // first we get the user from kinde

    if (!user || !user.id) // we check if there is the user or not
        throw new Error("Something went wrong")

    //we check if that user exists on database or not
    let dbUser = await prisma.user.findUnique({
        where : {
            id : user.id
        }
    })

    //if the not exist we create one
    if (!dbUser){
        dbUser = await prisma.user.create({
            data : {
                email : user.email ?? "",
                firstName : user.given_name ?? "",
                lastName : user.family_name ?? "",
                profileImage : user.picture ?? `https://avatar.vercel.sh/${user.given_name}`,
                id : user.id
            }
        })
    }

    return NextResponse.redirect("http://localhost:3000/")
}