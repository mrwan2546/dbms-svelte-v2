export interface ICheckoutByBasketId {
    id: number
    product_id: number;
    title: string
    image: string
    price: number
    stocks: number
    units: number
}

export interface IOrders {
    id: number;
    order_id: string
    shipping_name: string;
    shipping_address: string;
    shipping_province: string;
    shipping_mobile: string;
    items: string;
}

export interface IOrdersParsed {
    id: number;
    order_id: string;
    shipping_name: string;
    shipping_address: string;
    shipping_province: string;
    shipping_mobile: string;
    items: {
        id: number;
        units: number;
        title: string;
        price: number;
        image: string;
    }[]
}