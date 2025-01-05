import { Skeleton } from "@/components/ui/skeleton"
export function Productskeleton() {
    return (
    <div className="flex flex-col space-y-3">
        <Skeleton className="h-[100px]  w-[150px] lg:h-[150px]  lg:w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 lg:w-[250px] w-[150px]" />
          <Skeleton className="h-4 lg:w-[150px] w-[125px]" />
        </div>
      </div>
    )
  }
  