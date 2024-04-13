
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />


<script lang="ts">
	// import '../app.postcss';
	import Table from '../components/table.svelte';
	import WorldRoute from '../components/worldRoute.svelte';
	import {mergeSort, search} from "../functions/mergesort"
	import SearchInput from "../components/searchInput.svelte"

console.log('test')

    /** @type {import('./$types').LayoutData} */
	export let data;
	console.log(data.airports)
	let nameIndex = -1
	
// 	onMount( () => {
// 		nameIndex= -1
// 	console.log(airportData); 
// 	console.log(airportData.ident);
// 	let startTime = performance.now();
//     sortedNames = mergeSort(airportData.name);
//     let endTime = performance.now();
//     console.log(`Operation took ${endTime - startTime} milliseconds`);
// 	console.log(sortedNames)
// 	console.log(search(sortedNames, 'Buol Airport'))
// })



				
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	{nameIndex}
	<div class="space-y-10 text-center flex flex-col items-center">
		<h2 class="h2">Airport Lookup</h2>
		<SearchInput data={data}/>
		  
		<div class="flex items-start">

			<WorldRoute/>
		<Table />
		

		</div>
		
	</div>
</div>
