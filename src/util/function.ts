import { promises as fs } from 'fs';
import { MonthlyOrderStats, MonthlyPopularItem, MonthlyRevenueItem, Sale } from '../interface'

/**
Calculates the total sale value by reading sales data from a JSON file.
@param {string} filePath - The path to the JSON file containing sales data.

@returns {Promise<number>} - A Promise that resolves to the total sale value.

@throws {Error} - If there is an error reading the file or parsing the JSON data.
*/
export async function calculateTotalSale(filePath: string): Promise<number> {
    try {
        const jsonData: string = await fs.readFile(filePath, 'utf8');
        // Parse the JSON data into an array of sale objects
        const sales: Sale[] = JSON.parse(jsonData);
        // Calculate the total sale value by summing the totalPrice property of each sale object
        const totalSale = sales.reduce((total, sale) => {
            return total + sale.totalPrice;
        }, 0);
        // Return the total sale value
        return totalSale;
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
}

/**
 * Calculates the total sale value for a specific month and year by reading sales data from a JSON file.
 *
 * @param {string} filePath - The path to the JSON file containing sales data.
 * @param {number} year - The year of the month to calculate the sales for.
 * @param {number} month - The month (1-12) to calculate the sales for.
 * @returns {Promise<number>} - A Promise that resolves to the total sale value for the specified month and year.
 * @throws {Error} - If there is an error reading the file or parsing the JSON data.
 */
export async function calculateMonthlySale(filePath: string, year: number, month: number): Promise<number> {
    try {
        // Read the contents of the file as JSON data
        const jsonData: string = await fs.readFile(filePath, 'utf8');
        // Parse the JSON data into an array of sale objects
        const sales: Sale[] = JSON.parse(jsonData);
        // Filter the sales array to include only the sales for the specified month and year
        const filteredSales = sales.filter((sale) => {
            const saleDate = new Date(sale.date);
            return saleDate.getFullYear() === year && saleDate.getMonth() === month - 1;
        });
        // Calculate the total sale value for the specified month and year
        const monthlySale = filteredSales.reduce((total, sale) => {
            return total + sale.totalPrice;
        }, 0);
        // Return the total sale value for the specified month and year
        return monthlySale;
    } catch (err) {
        // Log and re-throw any errors that occur during execution
        console.error('Error:', err);
        throw err;
    }
}

/**
 * Finds the monthly popular items by reading sales data from a JSON file.
 *
 * @param {string} filePath - The path to the JSON file containing sales data.
 * @returns {Promise<MonthlyPopularItem[]>} - A Promise that resolves to an array of MonthlyPopularItem objects representing the most popular items for each month.
 * @throws {Error} - If there is an error reading the file or parsing the JSON data.
 */
export async function findMonthlyPopularItem(filePath: string): Promise<MonthlyPopularItem[]> {
    try {
        // Read the contents of the file as JSON data
        const jsonData: string = await fs.readFile(filePath, 'utf8');
        // Parse the JSON data into an array of sale objects
        const sales: Sale[] = JSON.parse(jsonData);
        // Array to store MonthlyPopularItem objects
        const monthlyPopularItems: MonthlyPopularItem[] = [];
        // Object to store sales grouped by month and year
        const monthlySales: { [month: string]: Sale[] } = {};
        // Group sales by month and year
        sales.forEach((sale) => {
            const saleDate = new Date(sale.date);
            const month = saleDate.getMonth();
            const year = saleDate.getFullYear();

            const key = `${year}-${month}`;

            if (!monthlySales[key]) {
                monthlySales[key] = [];
            }

            monthlySales[key].push(sale);
        });
        // Iterate over monthlySales object
        for (const key in monthlySales) {
            if (Object.prototype.hasOwnProperty.call(monthlySales, key)) {
                const salesInMonth = monthlySales[key];
                // Sort sales in descending order based on quantity
                const sortedSales = salesInMonth.sort((a, b) => b.quantity - a.quantity);
                // Get the most popular item
                const mostPopularItem = sortedSales[0];
                // Create a MonthlyPopularItem object
                const monthlyPopularItem: MonthlyPopularItem = {
                    month: Number(key.split('-')[1]) + 1,
                    year: Number(key.split('-')[0]),
                    item: mostPopularItem.sKU,
                    quantitySold: mostPopularItem.quantity
                };
                // Add MonthlyPopularItem to the array
                monthlyPopularItems.push(monthlyPopularItem);
            }
        }
        // Return the array of MonthlyPopularItem objects
        return monthlyPopularItems;
    } catch (err) {
        // Log and re-throw any errors that occur during execution
        console.error('Error:', err);
        throw err;
    }
}

/**
 * Finds the monthly revenue items by reading sales data from a JSON file.
 *
 * @param {string} filePath - The path to the JSON file containing sales data.
 * @returns {Promise<MonthlyRevenueItem[]>} - A Promise that resolves to an array of MonthlyRevenueItem objects representing the items with the highest revenue for each month.
 * @throws {Error} - If there is an error reading the file or parsing the JSON data.
 */
export async function findMonthlyRevenueItems(filePath: string): Promise<MonthlyRevenueItem[]> {
    try {
        // Read the contents of the file as JSON data
        const jsonData: string = await fs.readFile(filePath, 'utf8');
        // Parse the JSON data into an array of sale objects
        const sales: Sale[] = JSON.parse(jsonData);
        // Array to store MonthlyRevenueItem objects
        const monthlyRevenueItems: MonthlyRevenueItem[] = [];
        // Object to store sales grouped by month and year
        const monthlySales: { [month: string]: Sale[] } = {};
        // Group sales by month and year
        sales.forEach((sale) => {
            const saleDate = new Date(sale.date);
            const month = saleDate.getMonth();
            const year = saleDate.getFullYear();

            const key = `${year}-${month}`;

            if (!monthlySales[key]) {
                monthlySales[key] = [];
            }

            monthlySales[key].push(sale);
        });
        // Iterate over monthlySales object
        for (const key in monthlySales) {
            if (Object.prototype.hasOwnProperty.call(monthlySales, key)) {
                const salesInMonth = monthlySales[key];
                // Object to store revenue items and their total revenue for the month
                const revenueItems: { [item: string]: number } = {};
                // Calculate total revenue for each item in the month
                salesInMonth.forEach((sale) => {
                    if (!revenueItems[sale.sKU]) {
                        revenueItems[sale.sKU] = 0;
                    }

                    revenueItems[sale.sKU] += sale.totalPrice;
                });

                const revenueItemsKeys = Object.keys(revenueItems);
                console.log(revenueItems)

                if (revenueItemsKeys.length === 0) {
                    continue; // Skip the month if no revenue items are found
                }

                let maxRevenue = 0;
                let maxRevenueItem = '';
                // Find the item with the highest revenue in the month
                for (const item in revenueItems) {
                    if (Object.prototype.hasOwnProperty.call(revenueItems, item)) {
                        const revenue = revenueItems[item];
                        if (revenue > maxRevenue) {
                            maxRevenue = revenue;
                            maxRevenueItem = item;
                        }
                    }
                }

                if (!maxRevenueItem) {
                    continue; // Skip the month if the item is empty
                }
                // Create a MonthlyRevenueItem object
                const monthlyRevenueItem: MonthlyRevenueItem = {
                    month: Number(key.split('-')[1]) + 1,
                    year: Number(key.split('-')[0]),
                    item: maxRevenueItem,
                    revenue: maxRevenue
                };
                // Add MonthlyRevenueItem to the array
                monthlyRevenueItems.push(monthlyRevenueItem);
            }
        }
        // Return the array of MonthlyRevenueItem objects
        return monthlyRevenueItems;
    } catch (err) {
        // Log and re-throw any errors that occur during execution
        console.error('Error:', err);
        throw err;
    }
}


/**
 * Finds the monthly order statistics for a specific item by reading sales data from a JSON file.
 *
 * @param {string} filePath - The path to the JSON file containing sales data.
 * @param {string} item - The SKU of the item to calculate order statistics for.
 * @returns {Promise<MonthlyOrderStats[]>} - A Promise that resolves to an array of MonthlyOrderStats objects representing the order statistics for the specified item for each month.
 * @throws {Error} - If there is an error reading the file or parsing the JSON data.
 */
export async function findMonthlyOrderStats(filePath: string, item: string): Promise<MonthlyOrderStats[]> {
    try {
        // Read the contents of the file as JSON data
        const jsonData: string = await fs.readFile(filePath, 'utf8');
        // Parse the JSON data into an array of sale objects
        const sales: Sale[] = JSON.parse(jsonData);
        // Array to store MonthlyOrderStats objects
        const monthlyOrderStats: MonthlyOrderStats[] = [];
        // Object to store sales grouped by month and year
        const monthlySales: { [month: string]: Sale[] } = {};
        // Group sales by month and year
        sales.forEach((sale) => {
            const saleDate = new Date(sale.date);
            const month = saleDate.getMonth();
            const year = saleDate.getFullYear();

            const key = `${year}-${month}`;

            if (!monthlySales[key]) {
                monthlySales[key] = [];
            }

            monthlySales[key].push(sale);
        });
        // Iterate over monthlySales object
        for (const key in monthlySales) {
            if (Object.prototype.hasOwnProperty.call(monthlySales, key)) {
                const salesInMonth = monthlySales[key].filter((sale) => sale.sKU === item);
                // Calculate the number of orders for the item in the month
                const numOrders = salesInMonth.length;

                let minOrders = 0;
                let maxOrders = 0;
                let totalOrders = 0;

                if (numOrders > 0) {
                    // Find the minimum and maximum number of orders for the item in the month
                    minOrders = Math.min(...salesInMonth.map((sale) => sale.quantity));
                    maxOrders = Math.max(...salesInMonth.map((sale) => sale.quantity));
                    // Calculate the total number of orders for the item in the month
                    totalOrders = salesInMonth.reduce((total, sale) => total + sale.quantity, 0);
                }
                // Calculate the average number of orders for the item in the month
                const avgOrders = totalOrders / numOrders;
                // Create a MonthlyOrderStats object
                const monthlyOrderStat: MonthlyOrderStats = {
                    month: Number(key.split('-')[1]) + 1,
                    year: Number(key.split('-')[0]),
                    minOrders: minOrders,
                    maxOrders: maxOrders,
                    avgOrders: avgOrders
                };
                // Add MonthlyOrderStats to the array
                monthlyOrderStats.push(monthlyOrderStat);
            }
        }
        // Return the array of MonthlyOrderStats objects
        return monthlyOrderStats;
    } catch (err) {
        // Log and re-throw any errors that occur during execution
        console.error('Error:', err);
        throw err;
    }
}