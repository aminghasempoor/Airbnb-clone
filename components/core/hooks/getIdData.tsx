import {unstable_noStore as noStore} from "next/dist/server/web/spec-extension/unstable-no-store";
import prisma from "@/lib/db";

export async function getIdData(homeId: string) {
    noStore();
    const data = await prisma.home.findUnique({
        where: {
            id: homeId,
        },
        select: {
            photo: true,
            description: true,
            guests: true,
            bedrooms: true,
            bathrooms: true,
            title: true,
            categoryName: true,
            price: true,
            country: true,
            Reservation: {
                where: {
                    homeId: homeId,
                },
            },

            User: {
                select: {
                    profileImage: true,
                    firstName: true,
                },
            },
        },
    });

    return data;
}