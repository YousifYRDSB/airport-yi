<svelte:head>
	<script src="https://d3js.org/d3.v4.js"></script>
	<script src="https://d3js.org/d3-scale-chromatic.v1.min.js"></script>
	<script src="https://d3js.org/d3-geo-projection.v2.min.js"></script>
  <!-- <link rel="stylesheet" href="cytoscape-leaf.css" /> -->
</svelte:head>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
<script lang="ts">
	import '../app.postcss';
	import { Table } from '@skeletonlabs/skeleton';
import type { TableSource } from '@skeletonlabs/skeleton';
import { tableMapperValues } from '@skeletonlabs/skeleton';

	import LinePlot from '../components/LinePlot.svelte';
	import WorldRoute from '../components/worldRoute.svelte';
  import * as d3 from 'd3';

//   let data = d3.ticks(-2, 2, 200).map(Math.sin);



const sourceData = [
	{ position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
	{ position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
	{ position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
	{ position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
	{ position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
	{ position: 6, name: 'Robertsonium', weight: 99.999, symbol: 'Rb' },
	{ position: 7, name: 'Radium', weight: 76.452, symbol: 'Ra' },
	{ position: 8, name: 'Barium', weight: 12.842, symbol: 'Ba' },
];			
const tableSimple: TableSource = {
	// A list of heading labels.
	head: ['Name', 'Symbol', 'Weight'],
	// The data visibly shown in your table body UI.
	body: tableMapperValues(sourceData, ['name', 'symbol', 'weight']),
	// Optional: The data returned when interactive is enabled and a row is clicked.
	meta: tableMapperValues(sourceData, ['position', 'name', 'symbol', 'weight']),
	// Optional: A list of footer labels.
	foot: ['Total', '', '<code class="code">5</code>']
};
				
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
		  
		  
		<div class="flex items-start">

			<!-- <LinePlot data={data} /> -->
			<WorldRoute/>
		<Table interactive={true} source={tableSimple} />
		

		</div>
		
	</div>
</div>

<style>

</style>