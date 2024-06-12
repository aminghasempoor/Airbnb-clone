import {HomeMap} from "@/components/HomeMap";
import {SelectCalender} from "@/components/SelectCalender";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import Link from "next/link";
import {useCountries} from "@/lib/getCountries";
import {ReservationSubmitButton} from "@/components/SubmitButtons";
import {createReservation} from "@/lib/action";
import {CategoryShowcase} from "@/components/CaegoryShowcase";
import {getIdData} from "@/components/core/hooks/getIdData";
import Avatar from "@/public/avatar.jpg"
export default async function HomeRoute({params}: { params: { id: string } }) {
    const data = await getIdData(params.id);
    const {getCountryByValue} = useCountries();
    const country = getCountryByValue(data?.country as string);
    const {getUser} = getKindeServerSession();
    const user = await getUser();
    return (
        <div className="w-[75%] mx-auto mt-10 mb-12">
            <h1 className="font-medium text-2xl mb-5">{data?.title}</h1>
            <div className="relative h-[550px]">
                <Image
                    alt="Image of Home"
                    src={`https://fmvbfucauukhkcqwcuhy.supabase.co/storage/v1/object/public/images/${data?.photo}`}
                    fill
                    className="rounded-lg h-full object-cover w-full"
                />
            </div>
            <div className="flex justify-between gap-x-24 mt-8">
                <div className="w-2/3">
                    <h3 className="text-xl font-medium">
                        {country?.flag} {country?.label} / {country?.region}
                    </h3>
                    <div className="flex gap-x-2 text-muted-foreground">
                        <p>{data?.guests} Guests</p> * <p>{data?.bedrooms} Bedrooms</p> *{" "}
                        {data?.bathrooms} Bathrooms
                    </div>
                    <div className="flex items-center mt-6">
                        <Image
                            src={data?.User?.profileImage ?? Avatar}
                            alt="User Profile"
                            width={44}
                            height={44}
                            className="w-11 h-11 rounded-full"
                        />
                        <div className="flex flex-col ml-4">
                            <h3 className="font-medium">Hosted by {data?.User?.firstName}</h3>
                            <p className="text-sm text-muted-foreground">Host since 2015</p>
                        </div>
                    </div>
                    <Separator className="my-7"/>
                    <CategoryShowcase categoryName={data?.categoryName as string}/>
                    <Separator className="my-7"/>
                    <p className="text-muted-foreground">{data?.description}</p>
                    <Separator className="my-7"/>
                    <HomeMap locationValue={country?.value as string}/>
                </div>
                <form action={createReservation}>
                    <input type="hidden" name="homeId" value={params.id}/>
                    <input type="hidden" name="userId" value={user?.id}/>
                    <SelectCalender reservation={data?.Reservation}/>
                    {user?.id ? (
                        <ReservationSubmitButton/>
                    ) : (
                        <Button className="w-full" asChild>
                            <Link href="/api/auth/login">Make a Reservation</Link>
                        </Button>
                    )}
                </form>
            </div>
        </div>
    );
}