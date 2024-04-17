<script lang='ts'>
	import {RadioGroup, RadioItem} from '@skeletonlabs/skeleton';
	import {search, haversineDistance, mergeSort} from "../functions/sort-search"
	import type { Writable } from 'svelte/store';
	import { removeNumberFromArray } from '../functions/data-operations';
	import { getToastStore } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();

	export let data: any; // data of the airports 
	export let searchedIndexes: Writable<number[]>; // stores the indexes of the airports based on the search parameters 
	export let performanceData: Writable<any>; // the performance/time of running the search 
	export let selectedAirport: Writable<number[]>; //stores the selected airports to be used as chips  
	export let calculatedDistance: Writable<number[]> // stores the distances between the airports 


	let searchInput: string = '' 
	let searchType: string = "id";
	let selectedMode = "getDistance"

	let usedAirports: any[] = []; //the airports that will be transfer points when going from airport a to airport b 

	// searches for the input airport based on search type 
	async function searchAirport(query: string, searchType: string) {
		let searchedIndex: number[] = [];

		const startTime = performance.now();
		if(searchType === "name")
		searchedIndex = [search(query, data.airports.name, data.sortedNames)];
		else if(searchType === "id")
		searchedIndex = [search(query, data.airports.ident)];
		else if(searchType == "type")
		searchedIndex = data.sortedTypes[query];
		else if(searchType == "country")
		searchedIndex = data.sortedCountries[query];
		
		// logs the performance time 
		const endTime = performance.now();
		const elapsedTime = (endTime - startTime);
		let performanceTemp = [...$performanceData];
		console.log(performanceTemp);
		performanceTemp[1] = [...performanceTemp[1], elapsedTime];
		performanceTemp[0] = [...performanceTemp[0], "search"];
		performanceData.set(performanceTemp);
		console.log(performanceTemp);
		searchedIndexes.set(searchedIndex);
	}


// calculates the distance between airports (bonus 1 and 2)
function calculateDistance(indices: number[]): number[] {
    const latIndex: number = 0;
    const lonIndex: number = 1;
    let totalDistance: number = 0;
    let displacement: number = 0;

    // Convert indices to detailed info for each selected airport
    // Ensure all selected airports are of the same type and not closed
    let airportTypes = indices.map(index => data.airports.type[index]);
    let allSameType = airportTypes.every(type => type === airportTypes[0] && type !== "closed");

    if (!allSameType) {
		toastStore.trigger({
	message: 'All selected airports must be of the same type and not closed.',
	timeout: 2000,
	background: 'variant-filled-error',
});
        return [];
    }

    let airportInfo = indices.filter(index => data.airports.type[index] !== "closed").map(index => [
        data.airports.latitude_deg[index], // Latitude
        data.airports.longitude_deg[index] // Longitude
    ]);

    // Ensure there are at least two valid airports to calculate meaningful distances
    if (airportInfo.length < 2) {
		toastStore.trigger({
	message: 'Please input more than one valid airport to calculate distance.',
	timeout: 2000,
	background: 'variant-filled-warning',
});
        return [];
    }

    // Calculate the total distance by summing distances between consecutive airports
    for (let i = 0; i < airportInfo.length - 1; i++) {
        let currentAirport = airportInfo[i];
        let nextAirport = airportInfo[i + 1];
        
        totalDistance += haversineDistance(
            currentAirport[latIndex], currentAirport[lonIndex],
            nextAirport[latIndex], nextAirport[lonIndex]
        );
    }

    // Calculate displacement only between the first and last airports
    let firstAirport = airportInfo[0];
    let lastAirport = airportInfo[airportInfo.length - 1];
    displacement = haversineDistance(
        firstAirport[latIndex], firstAirport[lonIndex],
        lastAirport[latIndex], lastAirport[lonIndex]
    );

    // Return an array with the total distance and displacement
    return [totalDistance, displacement];
}


	function deleteSelection(index: number){
		console.log(index)
		const newArray = removeNumberFromArray(index, $selectedAirport)
		selectedAirport.set(newArray)
	}

	
	function getDataHandler(){
		if($selectedAirport.length){
		if(selectedMode === "getDistance")
			calculatedDistance.set(calculateDistance($selectedAirport))
		// else foundShortest($selectedAirport[0], $selectedAirport[$selectedAirport.length - 1])
		}
	}

	// finds the closest airports to distance between airport A and airport B 
	function findRoutes(air1:number, air2:number, n:number): number[][]{
		// longitude and latitude for airports A and B 
		const lat1 = data.airports.latitude_deg[air1]; 
		const lat2 = data.airports.latitude_deg[air2];
		const lon1 = data.airports.longitude_deg[air1];
		const lon2 = data.airports.longitude_deg[air2]; 

		let airports: any[] = []; 
		let left = 0; 
  		let right = data.airports.length -1; 

		// the distance between airports A and B is equally divided by the number of transfers 
		// each equal part becomes a indicator point to where the transfer airport should be - find the airport closest to that point
		for(let i=0; i<=n; i++){
			// the points for the transfers (longitude and latitude)
			let latPoint= (lat1 +lat2)/i;
			let lonPoint= (lon1 + lon2)/i;
			
			// does a binary search and returns the airport with the closest longitude and latitude to the reference points 
			while (left < right) {
				const mid = Math.floor((left + right) / 2);

				// replaces index of latitude and longitude in the inner array
				const midLat = data.airports.latitude_deg(mid); 
				const midLon = data.airports.longitude_deg(mid);

				if (latPoint < midLat || (latPoint === midLat && lonPoint < midLon)) {
					right = mid;
				} else {
					left = mid + 1;
				}
			}
			// stores all the longitude and latitude values of the transfer airports into a 2D array 
			airports = [...airports, [data.airports.latitude_deg[left], data.airports.longitude_deg[left]]];

		}
	
		// adds the first and last airport (airport A and B) to the array 
		usedAirports = [
			[data.airports.latitude_deg[air1], data.airports.longitude_deg[air1]],
			 ...airports, 
			[data.airports.latitude_deg[air2], data.airports.longitude_deg[air2]]
		]; 
		return usedAirports; 

	}
		
	

	// calculates the flight time based on the type of irport 
	function flightTime(type: string, distance:number):any{
			let velocity:number = 0;   
			if(type === 'large_airport'){
				velocity = 800; 
			}else if(type === 'small_airport'){
				velocity = 230; 
			}else if(type === 'helicopter'){
				velocity = 160; 
			}else{
				return undefined; 
			}

			let t = distance/velocity; 
			return t + ' hr(s)'
	}

	// finds the total distance as it iterates through each transfer, returns distance and time 
	function computeDistance(air1:number, air2:number, n:number): any{
		findRoutes(air1, air2, n); 
		let totalDistance: any =0; 
		for(let i=0; i<n+2; i++){
			totalDistance += distances(usedAirports[i][0], usedAirports[i][1], usedAirports[i+1][0], usedAirports[i+1][1]); 
		}

		let time:any = flightTime(data.airports.type[air1], totalDistance)
		let information:any = 'Distance: ' + totalDistance + ' Time: ' +  time; 

		return information; 
		
	}
</script>

<div class="flex flex-col w-[50vw]">
    <!-- Search bar and filter side by side -->
    <div class="flex items-center justify-between relative">
        <!-- Search input and button -->
        <div class="relative flex-grow">
            <input bind:value={searchInput} class="input p-[15px] pl-[15px] pr-[100px] w-full focus:outline-none" type="search" name="demo" placeholder="Search..." />
            <button on:click={() => searchAirport(searchInput, searchType)} class="absolute right-0 top-0 h-full px-4 text-white bg-[#d4163c] hover:bg-red-700 rounded-r-[24px] min-w-[10%]">
                Search
            </button>
        </div>

        <!-- Filter by options -->
        <div class="ml-4 relative">
            <p class="absolute top-[-14px] left-0 text-gray-500">filter search by:</p>
            <RadioGroup>
                <RadioItem bind:group={searchType} name="justify" value={"id"}>id</RadioItem>
                <RadioItem bind:group={searchType} name="justify" value={"name"}>name</RadioItem>
                <RadioItem bind:group={searchType} name="justify" value={"type"}>type</RadioItem>
                <RadioItem bind:group={searchType} name="justify" value={"country"}>country</RadioItem>
            </RadioGroup>
        </div>
    </div>

    <!-- Buttons for selected airports and action -->
    <div class="flex items-center mt-4">
        <button on:click={getDataHandler} class="ml-4 variant-filled p-2 rounded-md border border-gray-600">GET DATA</button>
		<select bind:value={selectedMode} class="ml-4 bg-gray-800 text-white border border-gray-600 rounded-md shadow focus:ring-blue-500 focus:border-blue-500 p-2">
			<option value="getDistance">Get Flight Distances</option>
			<option value="flyFrugal">© Fly Frugal</option>
		</select>		
        <div class="flex flex-wrap">
            {#each $selectedAirport as airport}
                <button on:click={() => deleteSelection(airport)} class="chip variant-filled m-1">{data.airports.name[airport]} &nbsp; X</button>
            {/each}
        </div>
    </div>
	
</div>
