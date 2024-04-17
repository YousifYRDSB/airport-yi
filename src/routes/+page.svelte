
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />


<script lang="ts">
	// import '../app.postcss';
	import Table from '../components/table.svelte';
	import WorldRoute from '../components/worldRoute.svelte';
	import SearchInput from "../components/searchInput.svelte"
	import { writable } from 'svelte/store';
	import PerformanceLog from '../components/showPerformance.svelte'

	
    /** @type {import('./$types').LayoutData} */
	export let data:any;
	let searchedIndexes = writable([]);
	let performanceData = writable(data.performance);
	let selectedAirport = writable([])
	let calculatedInfo = writable("")
	
    $: data.performance = $performanceData

				
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<PerformanceLog performanceData={$performanceData}/>
	<div class="flex items-start">
	<div class="space-y-10 text-center flex flex-col items-center">
		<h2 class="h2">
			<span class="bg-gradient-to-br from-red-700 to-red-500 bg-clip-text text-transparent box-decoration-clone">Airport Lookup and Routing</span>
		</h2>
		<SearchInput data={data} performanceData={performanceData} {calculatedInfo} {searchedIndexes} {selectedAirport}/> 
		<div class="flex">
			<WorldRoute data={data} optimalPath={undefined} {searchedIndexes} {calculatedInfo} {selectedAirport}/>
			<Table data={data} searchedIndexes={$searchedIndexes} {selectedAirport}/>
		</div>
			

		</div>
		
	</div>
</div>
