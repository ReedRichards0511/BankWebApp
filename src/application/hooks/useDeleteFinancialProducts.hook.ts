import { useMutation } from "@tanstack/react-query";
import { financialProducstServices } from "../../core/application/services.instances";
import { DeleteProductResponse } from "../../domain";


interface UseDeleteFinancialProductHook {
    deleteFinancialProduct: (id: string) => Promise<DeleteProductResponse>;
    isDeletingFinancialProduct: boolean;
    isErrorDeletingFinancialProduct: boolean;
}

export function useDeleteFinancialProduct (): UseDeleteFinancialProductHook {
    const { mutateAsync, isError, isPending } = useMutation({
        mutationFn: async (id: string) => {
            return await financialProducstServices.deleteFinancialProduct(id);
        },
    });
    const deleteFinancialProduct = async (id: string) => {
        return await mutateAsync(id);
    };
    return {
        deleteFinancialProduct,
        isDeletingFinancialProduct: isPending,
        isErrorDeletingFinancialProduct: isError
    };
}