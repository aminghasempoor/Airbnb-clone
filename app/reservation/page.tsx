import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ListingCard } from "@/components/ListingCard";
import { redirect } from "next/navigation";
import {NoItems} from "@/components/NoItems";
import getReservationData from "@/components/core/hooks/getreservationData";

export default async function ReservationsRoute() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user?.id) return redirect("/");
    const data = await getReservationData(user.id);
    return (
        <section className="container mx-atuo px-5 lg:px-10 mt-10">
            <h2 className="text-3xl font-semibold tracking-tight">
                Your Reservations
            </h2>
            {data.length === 0 ? (
                <NoItems
                    title="Hey you dont have any Reservations"
                    description="Please add a reservation to see it right here..."
                />
            ) : (
                <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
                    {data.map((item) => (
                        <ListingCard
                            key={item.Home?.id}
                            description={item.Home?.description as string}
                            location={item.Home?.country as string}
                            pathName="/favorites"
                            homeId={item.Home?.id as string}
                            imagePath={item.Home?.photo as string}
                            price={item.Home?.price as number}
                            userId={user.id}
                            favoriteId={item.Home?.Favorite[0]?.id as string}
                            isInFavoriteList={
                                (item.Home?.Favorite.length as number) > 0
                            }
                        />
                    ))}
                </div>
            )}
        </section>
    );
}