interface AirportData {
    continent: string[];
    ident: string[];
    iso_country: string[];
    iso_region: string[];
    latitude_deg: number[];
    longitude_deg: number[];
    name: string[];
    type: string[];
  }

/**
 * Retrieves airport information based on the provided indices.
 *
 * @param {AirportData} data - The airport data containing all information.
 * @param {number[]} index - The indices of the airports to retrieve information for.
 * 
 * getAirportInfoByIndex is O(n)
 */
export function getAirportInfoByIndex(data: AirportData, index: number[]): any {
    let results: any[] = [];
    for (let i = 0; i < index.length; i++) { //loop through each index to retrieve the data
        if (index[i] < 0 || index[i] > data.ident.length) {
            console.error("Invalid index provided.", index[i], data.ident.length);
            return null;
        }

        // Retrieve information for the current index
        results[i] = {
            continent: data.continent[index[i]],
            ident: data.ident[index[i]],
            iso_country: data.iso_country[index[i]],
            iso_region: data.iso_region[index[i]],
            latitude_deg: data.latitude_deg[index[i]],
            longitude_deg: data.longitude_deg[index[i]],
            name: data.name[index[i]],
            type: data.type[index[i]],
            index: index[i]
            
        }
    }
    return results;
}

/**
 * Retrieves the coordinates of airports based on their indices.
 * If too many indices are inputted, the function will even distribute the indices (for data visualization purposes)
 *
 * @param {AirportData} data - The airport data containing the coordinates.
 * @param {number[]} index - The indices of the airports to retrieve coordinates for.
 * 
 * getCoordinatesByIndex() is O(n)
 */
export function getCoordinatesByIndex(data: AirportData, index: number[]): any {
    const maxElements = 500;
    let results: any[] = [];

    // Calculate skip interval to evenly distribute 500 indices across the array length
    const step = Math.ceil(index.length / maxElements);
    const iterations = Math.min(maxElements, Math.ceil(index.length / step));

    for (let i = 0; i < iterations; i++) {
        const idx = i * step; // Calculate the actual index in the `index` array
        if (idx < index.length && index[idx] >= 0 && index[idx] < data.name.length) {
            results = [...results, [data.longitude_deg[index[idx]], data.latitude_deg[index[idx]]]];
        } else {
            console.error("Invalid index provided at position " + idx);
            return null;
        }
    }

    return results;
}


/**
 * Checks if the array contains any numbers. (used for preventing edge cases across the application)
 *
 * @param {number[]} array - The array to check for numbers.
 * 
 * containsNumber() is O(n)
 */
export function containsNumber(array: number[]) {
    if(array)
    for (let i = 0; i < array.length; i++) {
        if (typeof array[i] === 'number') {
            return true;  // Return true as soon as a number is found
        }
    }
    return false;  // Return false if no numbers are found after checking all elements
}



/**
 * Combines all the values of the given object into a single array.
 * This is used to flatten the object formatting done in categorySort() in functions/sort-search.ts
 *
 * @param {any} obj - The object whose values will be combined.
 * 
 * combineAllValues() is O(n)
 */
export function combineAllValues(obj: any) {
    let result: number[] = [];
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {  // Check to ensure the key is a property of the object, not from the prototype chain
            for (let i = 0; i < obj[key].length; i++) {  // Iterate and push each element in the array from each property
                result = [...result, (obj[key][i])]
        }
    }
}
    return result;
}




/**
 * Reverses the elements of an array in place.
 *
 * @param {T[]} arr - The array to be reversed.
 * 
 * reverseArray() is O(n)
 */
export function reverseArray<T>(arr: T[]): T[] {
    let start = 0;
    let end = arr.length - 1;

    arr = [...arr]

    while (start < end) {
        // Swap elements using a temporary variable
        let temp = arr[start];
        arr[start] = arr[end];
        arr[end] = temp;

        // Move towards the middle of the array
        start++;
        end--;
    }

    return arr;
}


/**
 * Checks if a given element is in an array
 *
 * @param {number} value - The value to search for in the array
 * @param {number[]} array - The array to search for the value
 * 
 * checkIfInArray() is O(n)
 */
export function checkIfInArray(value: number, array: number[]) {
    // Loop through each element in the array
    for (let i = 0; i < array.length; i++) {
        if (array[i] === value) {
            return true;  // Return true if the value matches the current element
        }
    }
    return false;  // Return false if no match is found after checking all elements
}

/**
 * Removes a a particular number from an array.
 *
 * @param {number} number - The number to remove from the array (or index if `numberIsIndex` is true). 
 * @param {number[]} array - The array from which to remove the number.
 * @param {boolean} [numberIsIndex] - Optional. If true, `number` is treated as an index instead of a value. Defaults to false.
 */
export function removeNumberFromArray(number: number, array: number[], numberIsIndex?: boolean) {
    let indexToRemove = -1;
    if(!numberIsIndex){
    for (let i = 0; i < array.length; i++) {
        if (array[i] === number) {
            indexToRemove = i;
            break;
        }
    }
}
else indexToRemove = number;

    if (indexToRemove !== -1) {
        for (let j = indexToRemove; j < array.length - 1; j++) {
            array[j] = array[j + 1];
        }
        array.length--;  // Reduce the array size by one
    }

    return array;
}