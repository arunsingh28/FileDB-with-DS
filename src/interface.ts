export interface Sale {
    sKU: any;
    date: string;
    unitPrice: number;
    quantity: number;
    totalPrice: number;
}

export interface MonthlyPopularItem {
    month: number;
    year: number;
    item: string;
    quantitySold: number;
}

export interface MonthlyRevenueItem {
    month: number;
    year: number;
    item: string;
    revenue: number;
}

export interface MonthlyOrderStats {
    month: number;
    year: number;
    minOrders: number;
    maxOrders: number;
    avgOrders: number;
}
