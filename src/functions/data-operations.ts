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

export function getAirportInfoByIndex(data: AirportData, index: number[]): any {
    let results: any[] = [];
    for (let i = 0; i < index.length; i++) {
        if (index[i] < 0 || index[i] >= data.name.length) {
            console.error("Invalid index provided.");
            return null;
        }

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

export function getCoordinatesByIndex(data: AirportData, index: number[]): any {
    const maxElements = 800;
    let results: any[] = [];

    // Calculate skip interval to evenly distribute 1000 indices across the array length
    const step = Math.ceil(index.length / maxElements);
    const iterations = Math.min(maxElements, Math.ceil(index.length / step));

    for (let i = 0; i < iterations; i++) {
        const idx = i * step; // Calculate the actual index in the `index` array
        if (idx < index.length && index[idx] >= 0 && index[idx] < data.name.length) {
            results.push([data.longitude_deg[index[idx]], data.latitude_deg[index[idx]]]);
        } else {
            console.error("Invalid index provided at position " + idx);
            return null;
        }
    }

    return results;
}

export function containsNumber(array: number[]) {
    if(array)
    for (let i = 0; i < array.length; i++) {
        if (typeof array[i] === 'number') {
            return true;  // Return true as soon as a number is found
        }
    }
    return false;  // Return false if no numbers are found after checking all elements
}