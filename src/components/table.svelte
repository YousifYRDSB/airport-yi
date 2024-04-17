<script lang="ts">
	import { Table } from '@skeletonlabs/skeleton';
	import type { TableSource, PaginationSettings } from '@skeletonlabs/skeleton';
	import { tableMapperValues } from '@skeletonlabs/skeleton';
	import { Paginator } from '@skeletonlabs/skeleton';
	import { getAirportInfoByIndex, containsNumber, checkIfInArray } from '../functions/data-operations';
	import {writable, type Writable } from 'svelte/store';

	export let data: any;
	export let searchedIndexes: number[] = [];
		export let selectedAirport: Writable<number[]> = writable<number[]>([]);

	let sourceData: any = []; // Initialize sourceData as an empty array
	let paginatedSource: any = []; // Initialize paginatedSource as an empty array
	let tableSimple: TableSource = {
		head: [],
		body: [],
		meta: [],
		foot: []
	};

	// Reactive statement to update sourceData whenever searchedIndexes changes
	$: {
		if (containsNumber(searchedIndexes)) {
			let paginatedIndexes = searchedIndexes.slice(
				paginationSettings.page * paginationSettings.limit,
				paginationSettings.page * paginationSettings.limit + paginationSettings.limit
			);
			sourceData = getAirportInfoByIndex(data.airports, paginatedIndexes);
			paginatedSource = sourceData;
			updateTable();
		} else sourceData = [];
	}

	let paginationSettings = {
		page: 0,
		limit: 5,
		size: searchedIndexes.length,
		amounts: [5]
	} satisfies PaginationSettings;

	function updateTable() {
		tableSimple.head = ['Name', 'Id', 'Type', 'Iso_country', 'Iso_region', 'Longitude', 'Latitude'];
		tableSimple.body = tableMapperValues(paginatedSource, [
			'name',
			'ident',
			'type',
			'iso_country',
			'iso_region',
			'longitude_deg',
			'latitude_deg'
		]);
		tableSimple.meta = tableMapperValues(paginatedSource, [
			'name',
			'ident',
			'type',
			'iso_country',
			'iso_region',
			'longitude_deg',
			'latitude_deg',
			'index'
		]);
		tableSimple.foot = ['Total', '', `<code class="code">${paginatedSource.length}</code>`];
		paginationSettings.size = searchedIndexes.length;
	}

	function tableSelectionHandler(event: CustomEvent) {

		if(!checkIfInArray(event.detail[7], $selectedAirport))
		 selectedAirport.set([...$selectedAirport, event.detail[7]])
	}

</script>

<span>
	<Table interactive={true} source={tableSimple} on:selected={tableSelectionHandler} />
	<Paginator showFirstLastButtons={true} bind:settings={paginationSettings} />
</span>
