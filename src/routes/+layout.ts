//server side rendering set to false to allow for Ajax GET XMLHttpRequests
export const ssr = false;

import { loadJSON } from '../functions/DO_NOT_TOUCH';
import { mergeSort } from '../functions/sort-search';

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
        let startTime = performance.now();
        const sortedNames = mergeSort(data.name)
        let endTime = performance.now();
        console.log(`Operation took ${endTime - startTime} milliseconds`);
        console.log(sortedNames)
        return {
                airports: data as AirportData,
                sortedNames: sortedNames
        };
}