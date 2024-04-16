
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />


<script lang="ts">
	// import '../app.postcss';
	import Table from '../components/table.svelte';
	import WorldRoute from '../components/worldRoute.svelte';
	import {mergeSort, search} from "../functions/sort-search"
	import SearchInput from "../components/searchInput.svelte"
	import { writable } from 'svelte/store';
	import PerformanceLog from '../components/showPerformance.svelte'

console.log('test')

    /** @type {import('./$types').LayoutData} */
	export let data:any;
	// console.log(data.airports)
	let searchedIndexes = writable([]);
	let performanceData = writable(data.performance);
	let selectedAirport = writable([])

	$: console.log('Data updated', data);

 

				
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<PerformanceLog performanceData={$performanceData}/>
	<div class="flex items-start">
	<div class="space-y-10 text-center flex flex-col items-center">
		<h2 class="h2">Airport Lookup</h2>
		<SearchInput data={data} performanceData={performanceData} {searchedIndexes} {selectedAirport}/> 
		<div class="flex">
			<WorldRoute data={data} routes={undefined} {searchedIndexes} {selectedAirport}/>
			<Table data={data} searchedIndexes={$searchedIndexes} {selectedAirport}/>
		</div>
			

		</div>
		
	</div>
</div>
