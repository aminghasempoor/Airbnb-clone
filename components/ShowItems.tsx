import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import getData from "@/components/core/hooks/getHomeData";
import {NoItems} from "@/components/NoItems";
import {ListingCard} from "@/components/ListingCard";

export default async function ShowItems({
                             searchParams,
                         }: {
    searchParams?: {
        filter?: string;
        country?: string;
        guest?: string;
        room?: string;
        bathroom?: string;
    };
}) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const data = await getData({ searchParams: searchParams, userId: user?.id });

    return (
        <>
            {data.length === 0 ? (
                <NoItems
                    description="Please check a other category or create your own listing!"
                    title="Sorry no listings found for this category..."
                />
            ) : (
                <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
                    {data.map((item) => (
                        <ListingCard
                            key={item.id}
                            description={item.description as string}
                            imagePath={item.photo as string}
                            location={item.country as string}
                            price={item.price as number}
                            userId={user?.id}
                            favoriteId={item.Favorite[0]?.id}
                            isInFavoriteList={item.Favorite.length > 0}
                            homeId={item.id}
                            pathName="/"
                        />
                    ))}
                </div>
            )}
        </>
    );
}