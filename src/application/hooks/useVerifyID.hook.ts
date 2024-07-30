import { useQuery } from "@tanstack/react-query";
import { financialProducstServices } from "../../core/application/services.instances";



type UseVerifyID = {
    existId: string;
    isLoadingExistId: boolean;
    isErrorExistId: boolean;
}


export function useVerifyID(id: string): UseVerifyID {
    const { data, isLoading, isError } = useQuery(
        {
            queryKey: ['existID'],
            queryFn: async () => {
                return await financialProducstServices.validateProductById(id);
            }
        }

    )
    return {
        existId: data!,
        isLoadingExistId: isLoading,
        isErrorExistId: isError,
    }
}