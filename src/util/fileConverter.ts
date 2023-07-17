import { promises as fs } from 'fs';

/**
 * Converts a text file containing comma-separated values (CSV) to a JSON file.
 *
 * @param {string} inputFilePath - The path to the input text file.
 * @param {string} outputFilePath - The path to the output JSON file.
 * @returns {Promise<void>} - A Promise that resolves when the conversion is complete.
 * @throws {Error} - If there is an error reading the input file, writing the output file, or during the conversion process.
 */
async function convertTextFileToJson(inputFilePath: string, outputFilePath: string): Promise<void> {
    try {
        // Read the contents of the input file as text
        const data: string = await fs.readFile(inputFilePath, 'utf8');
        // Split the text into an array of lines
        const lines: string[] = data.trim().split('\n');
        // Array to store the converted JSON data
        const jsonData: object[] = [];
        // Extract the headers from the first line
        const headers: string[] = lines[0].trim().split(',');
        // Process each line of the text (starting from the second line)
        for (let i = 1; i < lines.length; i++) {
            const line: string = lines[i];
            // Split the line into an array of values
            const values: string[] = line.trim().split(',');
            // Object to store the entry for this line
            const entry: any = {};
            // Process each value and create key-value pairs in the entry object
            for (let j = 0; j < headers.length; j++) {
                let key: string = headers[j].trim();
                const value: string = values[j];

                // Remove spaces and convert to camel case
                key = key.replace(/\s+/g, '');
                key = key.charAt(0).toLowerCase() + key.slice(1);
                // Convert value to number if it's a valid number, otherwise keep it as a string
                entry[key] = isNaN(Number(value)) ? value : Number(value);
            }
            // Add the entry to the jsonData array
            jsonData.push(entry);
        }
        // Convert the jsonData array to a JSON string
        const jsonOutput: string = JSON.stringify(jsonData);
        // Write the JSON string to the output file
        await fs.writeFile(outputFilePath, jsonOutput, 'utf8');

        console.log('JSON data written to file successfully.');
    } catch (err) {
        // Log and re-throw any errors that occur during execution
        console.error('Error:', err);
        throw err;
    }
}


const inputFilePath: string = './src/data/data.txt';
const outputFilePath: string = './src/data/data.json';

// define bootstrap function for asynchronous
const bootstrap = async () => {
    try {
        // Call the convertTextFileToJson function
        await convertTextFileToJson(inputFilePath, outputFilePath)
        console.log('Done')
        process.exit(1)
    } catch (error) {
        // Log and re-throw any errors that occur during execution
        console.error('Error:', error);
    }
}
// run bootstrap for converting txt file to json 
bootstrap()
