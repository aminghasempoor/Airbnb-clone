import FilterBar from "@/components/FilterBar";
import {ListingCard} from "@/components/ListingCard";
import {Suspense} from "react";
import SkeletonLoading from "@/components/SkeletonLoading";
import ShowItems from "@/components/ShowItems";

export default function Home({searchParams}: {
    searchParams?: {
        filter?: string;
        country?: string;
        guest?: string;
        room?: string;
        bathroom?: string}
}) {
  return (
      <div className="container mx-auto px-5 lg:px-10">
          <FilterBar/>
          <Suspense key={searchParams?.filter} fallback={<SkeletonLoading />}>
              <ShowItems searchParams={searchParams} />
          </Suspense>
      </div>
  );
}
