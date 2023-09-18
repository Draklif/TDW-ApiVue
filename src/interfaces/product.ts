export interface Product {
    id: number,
    category: number,
    title: string,
    description: string,
    image: string,
    price: number,
    rating: {
        count: number,
        rate: number
    }
}

export interface NewProduct {
    category?: number,
    title?: string,
    description?: string,
    image?: string,
    price?: number,
}