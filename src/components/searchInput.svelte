<script lang='ts'>
	import {RadioGroup, RadioItem} from '@skeletonlabs/skeleton';
	import {mergeSort, search} from "../functions/sort-search"
	import type { Writable } from 'svelte/store';

export let data: any;
export let searchedIndexes: Writable<number[]>;
export let performanceData: Writable<any>;
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
</script>

<div>
    <div class="relative flex items-center w-full">
			<input bind:value={searchInput} class="input p-[15px] pl-[15px] pr-[100px] w-full focus:outline-none" type="search" name="demo" placeholder="Search..." />
			<button on:click={() => searchAirport(searchInput, searchType)} class="absolute right-0 top-0 h-full px-4 text-white bg-[#d4163c] hover:bg-red-700 rounded-r-[24px] min-w-[10%]">
			  Search
			</button>
		  </div>
		  <RadioGroup>
			  <RadioItem bind:group={searchType} name="justify" value={"id"}>id</RadioItem>
			  <RadioItem bind:group={searchType} name="justify" value={"name"}>name</RadioItem>
			  <RadioItem bind:group={searchType} name="justify" value={"type"}>type</RadioItem>
			  <RadioItem bind:group={searchType} name="justify" value={"country"}>country</RadioItem>
			  </RadioGroup>
</div>