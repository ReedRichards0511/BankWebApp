import { useMutation } from "@tanstack/react-query";
import { CreateProductResponse, Product } from "../../domain";
import { financialProducstServices } from "../../core/application/services.instances";


interface UseUpdateFinancialProductHook {
    updateFinancialProduct: (financialProduct: Product) => Promise<CreateProductResponse>;
    isLoadingUpdateFinancialProduct: boolean;
    isErrorUpdateFinancialProduct: boolean;
}


export function useUpdateFinancialProduct(): UseUpdateFinancialProductHook {
    const { mutateAsync, isError, isPending } = useMutation({
        mutationFn: async (product: Product) => {
            return await financialProducstServices.updateFinancialProduct(product, product.id);
        },
    });

    const updateFinancialProduct = async (product: Product): Promise<CreateProductResponse> => {
        return await mutateAsync(product);
    };

    return {
        updateFinancialProduct,
        isLoadingUpdateFinancialProduct: isPending,
        isErrorUpdateFinancialProduct: isError,
    };
}
