# Developer Assignment

## Data Conversion
[mobiux.in](https://www.mobiux.in/assignment/sales-data.txt) Proide the data in txt format so to parse the data into JSON. I have use custome file converter **convertTextFileToJson** which change txt format to JSON and create new file with .json extension.


## APIs
I have created 5 APIs

```
    ***** Select an Option *****

    1. Total sales of the store.
    2. Month wise sales totals.
    3. Most popular item (most quantity sold) in each month.
    4. Items generating most revenue in each month.
    5. For the most popular item, find the min, max and average number of orders each month.
```

1. **calculateTotalSale**
> This API find the total sales or total price of item.

2. **findMonthlyPopularItem**
> This API find the popular item and return array of the muliple item which are polular in each months 

3. **findMonthlyRevenueItems**
    > Finds the monthly revenue items by reading sales data from a JSON file. Return array of 
    ```
        month: string,
        year: string,
        item: number,
        revenue: number
    ```

4. **findMonthlyOrderStats**
    > Finds the monthly order statistics for a specific item by reading sales data from a JSON file.
    Ans this api take 2 Parameters
    - @Params
        - item : provide any item like *Death by Chocolate*
        - filePath : file path of the data.json file

5. **calculateMonthlySale** 
   > Calculates the total sale value for a specific month and year by reading sales data from a JSON file.
   - @Params
       - filePath: string, 
       - year: number, 
       - month: number


