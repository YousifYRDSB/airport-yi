//server side rendering set to false to allow for Ajax GET XMLHttpRequests
export const ssr = false;

import { loadJSON } from '../functions/DO_NOT_TOUCH';
import { mergeSort, categorySort } from '../functions/sort-search';

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

/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
        const data = await loadJSON("DO_NOT_TOUCH/data.json")
        // console.log(data)
        
        let startTime = performance.now();
        const sortedNames = mergeSort(data.name)
        let endTime = performance.now();
        let nameSortElapsed = endTime - startTime;
        // console.log(sortedNames)
        
        startTime = performance.now();
        const sortedTypes = categorySort(data.type)
        endTime = performance.now();
        let typeSortElapsed = endTime - startTime;

        startTime = performance.now();
        const sortedCountries = categorySort(data.iso_country)
        endTime = performance.now();
        let countrySortElapsed = endTime - startTime;
        return {
                airports: data as AirportData,
                sortedNames: sortedNames,
                sortedTypes: sortedTypes,
                sortedCountries: sortedCountries,
                performance: [["mergeSort(name)", "categorySort(type)", "categorySort(country)"], [nameSortElapsed, typeSortElapsed, countrySortElapsed]]
        };
}

