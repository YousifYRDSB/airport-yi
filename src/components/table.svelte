<script lang="ts">
	import { Table } from '@skeletonlabs/skeleton';
	import type { TableSource } from '@skeletonlabs/skeleton';
	import { tableMapperValues } from '@skeletonlabs/skeleton'; 
	import { getAirportInfoByIndex } from '../functions/data-operations';
	import { writable } from 'svelte/store';
  
	export let data: any;
	export let searchedIndexes: Writable<number[]>;
  
	let sourceData = []; // Initialize sourceData as an empty array
  
	// Reactive statement to update sourceData whenever searchedIndexes changes
	$: {
		console.log($searchedIndexes)
		if(data)
	  sourceData = getAirportInfoByIndex(data.airports, $searchedIndexes);
	  updateTable(); // Function to update the table data
	  console.log(sourceData)
	}
  
	function updateTable() {
	  tableSimple.head = ['Name', 'Id', 'Type', 'Iso_country', 'Iso_region', 'Longitude', 'Latitude'];
	  tableSimple.body = tableMapperValues(sourceData, ['name', 'ident', 'type', 'iso_country', 'iso_region', 'longitude_deg', 'latitude_deg']);
	  tableSimple.meta = tableMapperValues(sourceData, ['name', 'ident', 'type', 'iso_country', 'iso_region', 'longitude_deg', 'latitude_deg']);
	  tableSimple.foot = ['Total', '', `<code class="code">${sourceData.length}</code>`];
	}
  
	// Initialize the table structure
	let tableSimple: TableSource = {
	  head: [],
	  body: [],
	  meta: [],
	  foot: []
	};
  </script>
  
  <main>
	<Table interactive={true} source={tableSimple} />
  </main>
  