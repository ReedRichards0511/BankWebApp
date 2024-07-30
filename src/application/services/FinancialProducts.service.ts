import BankApiURL from "../../core/application/api"
import { CreateProductResponse, DeleteProductResponse, Product, ProductResponse, UpdateProductInterafce } from "../../domain"

export class FinancialProducstServices {

    async getAllFinancialProducts(): Promise<Product[]> {
        try {
            const resp = await BankApiURL.get<ProductResponse>('/bp/products');

            return resp?.data?.data
        } catch (error: any) {
            console.log({ error });
            throw new Error(error)

        }
    }

    async validateProductById(productId: string): Promise<string> {
        try {
            const resp = await BankApiURL.get<string>(`/bp/products/${productId}`);
            return resp?.data
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async createNewFinancialProduct(body: Product): Promise<CreateProductResponse> {
        try {
            const resp = await BankApiURL.post<CreateProductResponse>(`/bp/products`, body);
            return resp?.data

        } catch (error: any) {
            throw new Error(error);
        }
    }


    async updateFinancialProduct(body: UpdateProductInterafce, productId: string): Promise<CreateProductResponse> {
        try {
            const resp = await BankApiURL.put<CreateProductResponse>(`/bp/products/${productId}`, body);
            return resp?.data;
        } catch (error: any) {
            throw new Error(error);
        }
    };

    async deleteFinancialProduct(productId: string): Promise<DeleteProductResponse> {
        try {
            const resp = await BankApiURL.delete<DeleteProductResponse>(`/bp/products/${productId}`);
            return resp?.data;
        } catch (error: any) {
            throw new Error(error);
        }
    }

}