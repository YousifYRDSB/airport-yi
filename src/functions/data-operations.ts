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

        results = [...results, {
            continent: data.continent[index[i]],
            ident: data.ident[index[i]],
            iso_country: data.iso_country[index[i]],
            iso_region: data.iso_region[index[i]],
            latitude_deg: data.latitude_deg[index[i]],
            longitude_deg: data.longitude_deg[index[i]],
            name: data.name[index[i]],
            type: data.type[index[i]]
            
        }]
    }
    console.log(results)
    return results;
}