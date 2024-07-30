export interface ProductResponse {
    data: Product[];
}

export interface Product {
    id: string;
    name: string;
    description: string;
    logo: string;
    date_release: Date;
    date_revision: Date;
}

export interface CreateProductResponse {
    message: string;
    data: Product;
}

export interface UpdateProductInterafce {
    name: string;
    description: string;
    logo: string;
    date_release: Date;
    date_revision: Date;
}

export interface DeleteProductResponse {
    message: string
}