
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />


<script lang="ts">
	// import '../app.postcss';
	import Table from '../components/table.svelte';
	import {RadioGroup, RadioItem} from '@skeletonlabs/skeleton';
import { onMount } from 'svelte';
	import WorldRoute from '../components/worldRoute.svelte';
	import {loadJSON} from "../functions/DO_NOT_TOUCH"
	import {mergeSort, search} from "../functions/mergesort"

	interface Data {
  continent: string[];
  ident: string[];
  iso_country: string[];
  iso_region: string[];
  latitude_deg: number[];
  longitude_deg: number[];
  name: string[];
  type: string[];
}

onMount(async () => {
	const data: Data = await loadJSON("/src/DO_NOT_TOUCH/data.json") as Data; //Don't delete this line. All your data is here. It does take a few seconds for Replit to load the data because it's so large.
	
	//This below just shows you how to access the data. You can remove these.
	console.log(data); 
	console.log(data.ident);
	console.log(mergeSort(data.name))
	console.log(search(data.name, 'Buol Airport'))
})

				
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<h2 class="h2">Airport Lookup</h2>
		<div class="relative flex items-center w-full">
			<input class="input p-[15px] pl-[15px] pr-[100px] w-full focus:outline-none" type="search" name="demo" placeholder="Search..." />
			<button class="absolute right-0 top-0 h-full px-4 text-white bg-[#d4163c] hover:bg-red-700 rounded-r-[24px] min-w-[10%]">
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
