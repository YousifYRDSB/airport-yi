
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />


<script lang="ts">
	// import '../app.postcss';
	import Table from '../components/table.svelte';
	import {RadioGroup, RadioItem} from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import WorldRoute from '../components/worldRoute.svelte';
<<<<<<< HEAD
	import {loadJSON} from "../functions/DO_NOT_TOUCH"	
=======
>>>>>>> 0f26dcbe44c8638a0e4f32c11799f9797f36ea0d
	import {mergeSort, search} from "../functions/mergesort"

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
console.log('test')

    /** @type {import('./$types').LayoutData} */
	export let data;
	let name = 'unknown'
	console.log('test')
	let sortedNames = []

	const airportData: AirportData = data.airports as AirportData
	onMount( () => {
		name='mount'
	console.log(airportData); 
	console.log(airportData.ident);
    sortedNames = mergeSort(airportData.name);
	let startTime = performance.now();
	console.log(search(sortedNames, 'Buol Airport'))
    let endTime = performance.now();
    console.log(`Operation took ${endTime - startTime} milliseconds`);
})

let searchInput = ''
function searchAirport(query: string){
	console.log('searching')
	name = search(sortedNames, query)
}

				
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	{name}
	<div class="space-y-10 text-center flex flex-col items-center">
		<h2 class="h2">Airport Lookup</h2>
		<div class="relative flex items-center w-full">
			<input bind:value={searchInput} class="input p-[15px] pl-[15px] pr-[100px] w-full focus:outline-none" type="search" name="demo" placeholder="Search..." />
			<button on:click={() => searchAirport(searchInput)} class="absolute right-0 top-0 h-full px-4 text-white bg-[#d4163c] hover:bg-red-700 rounded-r-[24px] min-w-[10%]">
			  Search
			</button>
		  </div>
		  <RadioGroup>
			  <RadioItem name="justify" value={0}>type</RadioItem>
			  <RadioItem name="justify" value={1}>name</RadioItem>
			  <RadioItem name="justify" value={2}>id</RadioItem>
		</RadioGroup>
		  
		  
		<div class="flex items-start">

			<WorldRoute/>
		<Table />
		

		</div>
		
	</div>
</div>
