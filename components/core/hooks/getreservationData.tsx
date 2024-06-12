import {unstable_noStore as noStore} from "next/dist/server/web/spec-extension/unstable-no-store";
import prisma from "@/lib/db";

export default async function getReservationData(userId: string) {
    noStore();
    const data = await prisma.reservation.findMany({
        where: {
            userId: userId,
        },
        select: {
            Home: {
                select: {
                    id: true,
                    country: true,
                    photo: true,
                    description: true,
                    price: true,
                    Favorite: {
                        where: {
                            userId: userId,
                        },
                    },
                },
            },
        },
    });

    return data;
}