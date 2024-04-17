//server side rendering set to false to allow for Ajax GET XMLHttpRequests
export const ssr = false;

import { loadJSON } from '../functions/DO_NOT_TOUCH';
import { mergeSort, categorySort } from '../functions/sort-search';
import { writable } from 'svelte/store';

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
        console.log(data)
        
        let startTime = performance.now();
        const sortedNames = mergeSort(data.name)
        let endTime = performance.now();
        let nameSortElapsed = endTime - startTime;
        // console.log(sortedNames)

        startTime = performance.now();
        const sortedLatitudes = mergeSort(data.latitude_deg)
        endTime = performance.now();
        let latitudeSortElapsed = endTime - startTime;

        startTime = performance.now();
        const sortedLongitudes = mergeSort(data.longitude_deg)
        endTime = performance.now();
        let longitudeSortElapsed = endTime - startTime;
        
        startTime = performance.now();
        const sortedTypes = categorySort(data.type)
        endTime = performance.now();
        const typeSortElapsed = endTime - startTime;

        startTime = performance.now();
        const sortedRegions = mergeSort(data.iso_region)
        endTime = performance.now();
        let regionSortElapsed = endTime - startTime;

        startTime = performance.now();
        const sortedContinents = categorySort(data.continent)
        endTime = performance.now();
        let continentSortElapsed = endTime - startTime;

        startTime = performance.now();
        const sortedCountries = categorySort(data.iso_country)
        endTime = performance.now();
        let countrySortElapsed = endTime - startTime;

        return {
                airports: data as AirportData,
                sortedNames: sortedNames,
                sortedTypes: sortedTypes,
                sortedCountries: sortedCountries,
                sortedRegions: sortedRegions,
                sortedContinents: sortedContinents,
                sortedLatitudes: sortedLatitudes,
                sortedLongitudes: sortedLongitudes,
                performance: [["mergeSort(name)", "mergeSort(latitude)", "margeSort(longitude)", "categorySort(type)", "categorySort(country)", "mergeSort(region)", "categorySort(continent)"], [nameSortElapsed, latitudeSortElapsed, longitudeSortElapsed, typeSortElapsed, countrySortElapsed, regionSortElapsed, continentSortElapsed]],
        };
}

