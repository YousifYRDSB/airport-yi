<script lang='ts'>
	import {RadioGroup, RadioItem} from '@skeletonlabs/skeleton';
	import {mergeSort, search} from "../functions/sort-search"
	import type { Writable } from 'svelte/store';

export let data: any;
export let searchedIndexes: Writable<number[]>;
let searchInput: string = '' 
let value: number = 0;

async function searchAirport(query: string){
	const startTime = performance.now();
    const searchedIndex = [search(data.sortedNames, query, data.airports.name)];
    const endTime = performance.now();
    const elapsedTime = (endTime - startTime);
    console.log(`The search function took ${elapsedTime} milliseconds.`);
	searchedIndexes.set(searchedIndex);
}
</script>

<div>
    <div class="relative flex items-center w-full">
			<input bind:value={searchInput} class="input p-[15px] pl-[15px] pr-[100px] w-full focus:outline-none" type="search" name="demo" placeholder="Search..." />
			<button on:click={() => searchAirport(searchInput)} class="absolute right-0 top-0 h-full px-4 text-white bg-[#d4163c] hover:bg-red-700 rounded-r-[24px] min-w-[10%]">
			  Search
			</button>
		  </div>
		  <RadioGroup>
			  <RadioItem bind:group={value} name="justify" value={0}>type</RadioItem>
			  <RadioItem bind:group={value} name="justify" value={1}>name</RadioItem>
			  <RadioItem bind:group={value} name="justify" value={2}>id</RadioItem>
			  </RadioGroup>
</div>