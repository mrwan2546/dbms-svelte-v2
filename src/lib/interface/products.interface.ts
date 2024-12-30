export interface IProduct {
    id: number;
    created_at: Date;
    updated_at: Date;
    title: string;
    description: string | null;
    price: number;
    image: string;
    stocks: number
}