# Developer Assignment

## Data Conversion
[mobiux.in](https://www.mobiux.in/assignment/sales-data.txt) The provided data is in text format and needs to be parsed into JSON format. To convert the text data to JSON, a custom file converter called convertTextFileToJson is used. This converter processes the text file and generates a new file with the .json extension, containing the converted data.


## APIs
The assignment includes the creation of five APIs, each serving a specific purpose. These APIs can be accessed by selecting the corresponding option:

```
    ***** Select an Option *****

    1. Total sales of the store.
    2. Month wise sales totals.
    3. Most popular item (most quantity sold) in each month.
    4. Items generating most revenue in each month.
    5. For the most popular item, find the min, max and average number of orders each month.
```

1. **calculateTotalSale**
> This API calculates the total sales or total price of the items.

2. **findMonthlyPopularItem**
> This API identifies the popular item(s) by finding the item(s) with the highest quantity sold in each month. It returns an array of multiple items that were popular in each month.

3. **findMonthlyRevenueItems**
> This API determines the items generating the most revenue in each month. It reads the sales data from a JSON file and returns an array containing the following information for each month:

    ```
        month: string,
        year: string,
        item: number,
        revenue: number
    ```

4. **findMonthlyOrderStats**
> This API calculates the monthly order statistics for a specific item. It reads the sales data from a JSON file and takes two parameters:
    - @Params
        - item : provide any item like *Death by Chocolate* 
        - filePath : file path of the data.json file

5. **calculateMonthlySale** 
> This API calculates the total sale value for a specific month and year. It reads the sales data from a JSON file and takes three parameters:
   - @Params
       - filePath: string, 
       - year: number, 
       - month: number


