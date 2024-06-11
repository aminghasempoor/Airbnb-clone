import prisma from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";
export default async function getData({
                           searchParams,
                           userId,
                       }: {
    userId: string | undefined;
    searchParams?: {
        filter?: string;
        country?: string;
        guest?: string;
        room?: string;
        bathroom?: string;
    };
}) {
    noStore();
    const data = await prisma.home.findMany({
        where: {
            addedCategory: true,
            addedLocation: true,
            addedDescription: true,
            categoryName: searchParams?.filter ?? undefined,
            country: searchParams?.country ?? undefined,
            guests: searchParams?.guest ?? undefined,
            bedrooms: searchParams?.room ?? undefined,
            bathrooms: searchParams?.bathroom ?? undefined,
        },
        select: {
            photo: true,
            id: true,
            price: true,
            description: true,
            country: true,
            Favorite: {
                where: {
                    userId: userId ?? undefined,
                },
            },
        },
    });

    return data;
}