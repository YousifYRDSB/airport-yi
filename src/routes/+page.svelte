
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />


<script lang="ts">
	// import '../app.postcss';
	import Table from '../components/table.svelte';
	import WorldRoute from '../components/worldRoute.svelte';
	import {mergeSort, search} from "../functions/sort-search"
	import SearchInput from "../components/searchInput.svelte"
	import { writable } from 'svelte/store';

console.log('test')

    /** @type {import('./$types').LayoutData} */
	export let data;
	// console.log(data.airports)
	let searchedIndexes = writable([]);



				
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<h2 class="h2">Airport Lookup</h2>
		<SearchInput data={data} {searchedIndexes}/>
		  {$searchedIndexes} 
		<div class="flex items-start">

		<WorldRoute/>
		<Table data={data} {searchedIndexes}/>
		

		</div>
		
	</div>
</div>
