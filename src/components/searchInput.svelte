<script lang='ts'>
	import {RadioGroup, RadioItem} from '@skeletonlabs/skeleton';
	import {search, distances, displacements} from "../functions/sort-search"
	import type { Writable } from 'svelte/store';
	import { removeNumberFromArray } from '../functions/data-operations';

	export let data: any;
	export let searchedIndexes: Writable<number[]>;
	export let performanceData: Writable<any>;
	export let selectedAirport: Writable<number[]>;

	let airportInfo: any[] =  []; 
	let searchInput: string = '' 
	let searchType: string = "id";

	async function searchAirport(query: string, searchType: string) {
		let searchedIndex: (number | null)[] = [];

		const startTime = performance.now();
		if(searchType === "name")
		searchedIndex = [search(query, data.airports.name, data.sortedNames)];
		else if(searchType === "id")
		searchedIndex = [search(query, data.airports.ident)];
		else if(searchType == "type")
		searchedIndex = data.sortedTypes[query];
		else if(searchType == "country")
		searchedIndex = data.sortedCountries[query];
		const endTime = performance.now();

		const elapsedTime = (endTime - startTime);
		let performanceTemp = [...$performanceData]
		console.log(performanceTemp)
		performanceTemp[1] = [...performanceTemp[1], elapsedTime]
		performanceTemp[0] = [...performanceTemp[0], "search"]
		performanceData.set(performanceTemp)
		console.log(performanceTemp)
		searchedIndexes.set(searchedIndex);
	}


	function calculateDistance(indices: number[]): number[] {
    const latIndex: number = 0;
    const lonIndex: number = 1;
    const typeIndex: number = 2;
    let totalDistance: number = 0;
    let totalDisplacement: number = 0;

    // Array to hold the detailed info for each selected airport
    let airportInfo = indices.map(index => [
        data.airports.latitude[index],
        data.airports.longitude[index],
        data.airports.type[index]
    ]);

    // Ensure there are at least two airports to compare
    if (airportInfo.length < 2) {
        console.log('Please input more than one airport.');
        return [];
    }

    // Iterate over the airportInfo array to calculate distances and displacements
    for (let i = 0; i < airportInfo.length - 1; i++) {
        let air1 = airportInfo[i];
        let air2 = airportInfo[i + 1];

        // Ensure both airports are of the same type before calculating
        if (air1[typeIndex] === air2[typeIndex]) {
            totalDistance += distances(air1[latIndex], air2[latIndex], air1[lonIndex], air2[lonIndex]);
            totalDisplacement += displacements(air1[latIndex], air2[latIndex], air1[lonIndex], air2[lonIndex]);
        } else {
            console.log('Invalid input: Airports must be of the same type to calculate distance and displacement.');
        }
    }

    // Return an array with the total distance and displacement
    return [totalDistance, totalDisplacement];
}


	function deleteSelection(index: number){
		console.log(index)
		const newArray = removeNumberFromArray(index, $selectedAirport)
		selectedAirport.set(newArray)
	}

	function getDistanceHandler(){
		console.log(calculateDistance($selectedAirport))
	}
</script>

<div>
    <div class="relative flex items-center w-[50vw]">
			<input bind:value={searchInput} class="input p-[15px] pl-[15px] pr-[100px] w-full focus:outline-none" type="search" name="demo" placeholder="Search..." />
			<button on:click={() => searchAirport(searchInput, searchType)} class="absolute right-0 top-0 h-full px-4 text-white bg-[#d4163c] hover:bg-red-700 rounded-r-[24px] min-w-[10%]">
			  Search
			</button>
		  </div>
		  <p style="margin-top: 22px;">filter by:</p>
		  <RadioGroup>
			  <RadioItem bind:group={searchType} name="justify" value={"id"}>id</RadioItem>
			  <RadioItem bind:group={searchType} name="justify" value={"name"}>name</RadioItem>
			  <RadioItem bind:group={searchType} name="justify" value={"type"}>type</RadioItem>
			  <RadioItem bind:group={searchType} name="justify" value={"country"}>country</RadioItem>
			  </RadioGroup>
			  <div class="w-[50vw]">

				  <p style="margin-top: 22px;">Selected: </p>
				  {#each $selectedAirport as airport}
				<button on:click={() => deleteSelection(airport)} class="chip variant-filled m-1">{data.airports.name[airport]}  &nbsp; X</button>
				{/each}
				<button on:click={getDistanceHandler}>GET DISTANCE</button>
			  </div>
</div>