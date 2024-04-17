<script lang='ts'>
	import {RadioGroup, RadioItem} from '@skeletonlabs/skeleton';
	import {search, distances, displacements, mergeSort} from "../functions/sort-search"
	import {search, haversineDistance, mergeSort} from "../functions/sort-search"
	import type { Writable } from 'svelte/store';
	import { removeNumberFromArray } from '../functions/data-operations';
	import { getToastStore } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();

	export let data: any;
	export let searchedIndexes: Writable<number[]>;
	export let performanceData: Writable<any>;
	export let selectedAirport: Writable<number[]>;
	export let calculatedDistance: Writable<number[]>

	let searchInput: string = '' 
	let searchType: string = "id";
	let selectedMode = "getDistance"

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

	function getDistanceHandler(){
		calculatedDistance.set(calculateDistance($selectedAirport));
	
	function getDataHandler(){
		if($selectedAirport.length){
		if(selectedMode === "getDistance")
			calculatedDistance.set(calculateDistance($selectedAirport))
		// else foundShortest($selectedAirport[0], $selectedAirport[$selectedAirport.length - 1])
		}
	}


	let closestIndinces: any[] = []; 
	function findCloseAirports(air1:number, air2:number){
		const lat1 = data.airports.latitude_deg[air1]; 
		const lat2 = data.airports.latitude_deg[air2];
		const lon1 = data.airports.longitude_deg[air1];
		const lon2 = data.airports.longitude_deg[air2]; 
	// let closestIndinces: any[] = []; 
	// function findCloseAirports(air1:number, air2:number){
	// 	console.log(data)
	// 	const lat1 = data.airports.latitude_deg[air1]; 
	// 	const lat2 = data.airports.latitude_deg[air2];
	// 	const lon1 = data.airports.longitude_deg[air1];
	// 	const lon2 = data.airports.longitude_deg[air2]; 

	// 	let distanceRecord:any[] = [];
	// 	let latCenter = (lat1 +lat2)/2;
	// 	let lonCenter = (lon1 + lon2)/2;

		for(let i =0; i<data.length; i++){
			let transferDistance = distances(latCenter, data.airports.latitude_deg[i], lonCenter, data.airports.longitude_deg[i]);
			distanceRecord = [...distanceRecord, transferDistance]; 
	// 	for(let i =0; i<data.airports.latitude_deg.length; i++){
	// 		let transferDistance = haversineDistance(latCenter, data.airports.latitude_deg[i], lonCenter, data.airports.longitude_deg[i]);
	// 		distanceRecord = [...distanceRecord, transferDistance]; 

	// 	}

	// 	mergeSort(distanceRecord); 
		
	// 	for(let i =0; i<6; i++){
	// 		closestIndinces = [air1, ...closestIndinces, distanceRecord[i], air2]; 
	// 	}

	// 	return closestIndinces; 

	// }

	// let distanceSelection: number[] = []; 
	// function findShortest(arr: number[], transfers:number, currentDistance: number):number | undefined{
	// 	if(transfers === 5){
	// 		distanceSelection = [...distanceSelection, currentDistance]
	// 		return currentDistance; 
	// 	}
	// 	const mid:number = Math.floor(arr.length/2); 
	// 	const left:number[]= arr.slice(0,mid); 
	// 	const right:number[] = arr.slice(mid); 

		const distance = distances(
			data.airports.latitude_deg[closestIndinces[transfers]], 
			data.airports.latitude_deg[closestIndinces[mid]],
			data.airports.longitude_deg[closestIndinces[transfers]], 
			data.airports.longitude_deg[closestIndinces[mid]]
		); 
	// 	const distance = haversineDistance(
	// 		data.latitude[closestIndinces[transfers]], 
	// 		data.latitude[closestIndinces[mid]],
	// 		data.longitude[closestIndinces[transfers]], 
	// 		data.longitude[closestIndinces[mid]]
	// 	); 

	// 	if(distance === undefined){
	// 		return undefined; 
	// 	}
	// 	findShortest(left, transfers + 1, currentDistance + distance);

	// 	findShortest(right, transfers + 1,  currentDistance + distance); 

		
	// }


	// function foundShortest(air1:number, air2:number):number{
	// 	findCloseAirports(air1, air2); 
	// 	findShortest(closestIndinces, 0, 0); 
	// 	removeNumberFromArray(0, distanceSelection, true)
	// 	for(let i=0; i<distanceSelection.length; i++){
	// 		for(let j=i; j>0; j--){
	// 			if(distanceSelection[j]<distanceSelection[j-1]){
	// 				let value: number= distanceSelection[j]; 
    //             	let prevValue:number  = distanceSelection[j-1]; 
    //             	distanceSelection[j] = prevValue; 
    //             	distanceSelection[j-1] = value; 
	// 			}
	// 		}
	// 	}
	// 	return distanceSelection[0]; 
		
	// }
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
