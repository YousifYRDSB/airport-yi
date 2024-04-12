//server side rendering set to false to allow for Ajax GET XMLHttpRequests
export const ssr = false;

import { loadJSON } from '../functions/DO_NOT_TOUCH';

/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
        const data = await loadJSON("DO_NOT_TOUCH/data.json")
        return {
                airports: data
        };
}