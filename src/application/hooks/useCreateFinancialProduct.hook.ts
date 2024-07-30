import { useMutation } from "@tanstack/react-query";
import { CreateProductResponse, Product } from "../../domain";
import { financialProducstServices } from "../../core/application/services.instances";


interface UseCreateFinancialProduct {
    createNewProduct: (product: Product) => Promise<CreateProductResponse>;
    isLoadingCreateProduct: boolean;
    isErrorCreateProduct: boolean;
    error ?: any;
}

export function useCreateFinancialProduct(): UseCreateFinancialProduct {
    const { mutateAsync, isError, isPending, error } = useMutation({
        mutationFn: async (product: Product) => {
            return await financialProducstServices.createNewFinancialProduct(product);
        },
    });

    const createNewProduct = async (product: Product): Promise<CreateProductResponse> => {
        return await mutateAsync(product);
    };

    return {
        createNewProduct,
        isLoadingCreateProduct: isPending,
        isErrorCreateProduct: isError,
        error
    };
}
