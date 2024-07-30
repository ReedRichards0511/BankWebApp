import { useQuery } from "@tanstack/react-query";
import { Product } from "../../domain";
import { financialProducstServices } from "../../core/application/services.instances";



type UseFinancialProducstResponse = {
    financialProducts: Product[];
    isLoadingFinancialProducts: boolean;
    isErrorFinancialProducts: boolean;
    refetchFinancialProducts: () => void;
    isRefetchingFinancialProducts: boolean;
}


export function useGetFinancialProducts(): UseFinancialProducstResponse {
    const { data, isLoading, isError, refetch, isRefetching } = useQuery(
        { 
            queryKey: ['financialProducts'],
            queryFn:  async () => {
                return await financialProducstServices.getAllFinancialProducts();
            } 
        }
      
    )
    return {
        financialProducts: data! ,
        isLoadingFinancialProducts: isLoading || isRefetching,
        isErrorFinancialProducts: isError,
        refetchFinancialProducts: refetch,
        isRefetchingFinancialProducts: isRefetching
    }
}