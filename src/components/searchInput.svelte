<script lang='ts'>
	import {RadioGroup, RadioItem} from '@skeletonlabs/skeleton';
	import {mergeSort, search} from "../functions/mergesort"
export let data: any;
let searchInput: string = ''
let nameIndex: number = -1;
let value: number = 0;

async function searchAirport(query: string){
	let startTime = performance.now();
	nameIndex = await search(data.sortedNames, query, data.airports.name)
    let endTime = performance.now();
	console.log(startTime, endTime)
    console.log(`Operation took ${endTime - startTime} milliseconds`);
	console.log('searching', nameIndex, data.airports.name[nameIndex])
	
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