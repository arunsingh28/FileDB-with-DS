import { calculateMonthlySale, calculateTotalSale, findMonthlyOrderStats, findMonthlyPopularItem, findMonthlyRevenueItems } from './util/function'
import readline from 'readline'

// importing data_file from data dir
const filePath: string = './src/data/data.json';

/**
 * Root function for finding monthly order statistics for a specific item.
 * This function is intended to be the entry point for invoking the findMonthlyOrderStats function.
 * It demonstrates an example usage of the findMonthlyOrderStats function.
 */
const rootFindMonthlyOrderStats = async () => {
    try {
        // Specify the item SKU to calculate order statistics for
        const item: string = 'Death by Chocolate';
        // Call the findMonthlyOrderStats function with the file path and item SKU
        const result = await findMonthlyOrderStats(filePath, item)
        // Log the resulting monthly order statistics to the console
        console.log('Monthly Order Statistics:', result)
    } catch (error) {
        // Log and handle any errors that occur during execution
        console.error('Error:', error);
    }
}

/**
 * Root function for calculating the total monthly sale for a specific year and month.
 * This function is intended to be the entry point for invoking the calculateMonthlySale function.
 * It demonstrates an example usage of the calculateMonthlySale function.
 */
const rootCalculateMonthlySale = async () => {
    const year: number = 2019;
    const month: number = 3; // January
    try {
        // Call the calculateMonthlySale function with the file path, year, and month
        const result = await calculateMonthlySale(filePath, year, month)
        // Log the resulting monthly sale to the console
        console.log('Monthly sale:', result);
    } catch (error) {
        // Log and handle any errors that occur during execution
        console.error('Error:', error);
    }
}

/**
 * Root function for finding the monthly popular items.
 * This function is intended to be the entry point for invoking the findMonthlyPopularItem function.
 * It demonstrates an example usage of the findMonthlyPopularItem function.
 */
const rootFindMonthlyPopularItem = async () => {
    try {
        // Call the findMonthlyPopularItem function with the file path
        const result = await findMonthlyPopularItem(filePath)
        // Log the resulting monthly popular items to the console
        console.log('Monthly Popular Items:', result);
    } catch (error) {
        // Log and handle any errors that occur during execution
        console.error('Error:', error);
    }
}

/**
 * Root function for finding the monthly revenue items.
 * This function is intended to be the entry point for invoking the findMonthlyRevenueItems function.
 * It demonstrates an example usage of the findMonthlyRevenueItems function.
 */
const rootFindMonthlyRevenueItems = async () => {
    try {
        // Call the findMonthlyRevenueItems function with the file path
        const result = await findMonthlyRevenueItems(filePath)
        // Log the resulting monthly revenue items to the console
        console.log('Monthly Revenue Items:', result);
    } catch (error) {
        // Log and handle any errors that occur during execution
        console.error('Error:', error);
    }
}

/**
 * Root function for calculating the total sale.
 * This function is intended to be the entry point for invoking the calculateTotalSale function.
 * It demonstrates an example usage of the calculateTotalSale function.
 */
const rootCalculateTotalSale = async () => {
    try {
        // Call the calculateTotalSale function with the file path
        const result = await calculateTotalSale(filePath)
        // Log the resulting total sale to the console
        console.log('Total sale:', result)
    } catch (error) {
        // Log and handle any errors that occur during execution
        console.error('Error:', error);
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// promt for terminal
rl.question(`
    *****Select an option*****\n
    1. Total sales of the store.
    2. Month wise sales totals.
    3. Most popular item (most quantity sold) in each month.
    4. Items generating most revenue in each month.
    5. For the most popular item, find the min, max and average number of orders each month.
`, (answer) => {
    switch (Number(answer)) {
        case 1:
            rootCalculateTotalSale()
            break;
        case 2:
            rootFindMonthlyPopularItem()
            break;
        case 3:
            rootFindMonthlyRevenueItems()
            break;
        case 4:
            rootCalculateMonthlySale()
        case 5:
            rootFindMonthlyOrderStats()
            break;
        default:
            console.log('wrong Selection Restart again.')
            rl.close()
            process.exit(0)
    }
})
