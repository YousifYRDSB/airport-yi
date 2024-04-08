
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />


<script lang="ts">
	import '../app.postcss';
	import { Table } from '@skeletonlabs/skeleton';
import type { TableSource } from '@skeletonlabs/skeleton';
import { tableMapperValues } from '@skeletonlabs/skeleton';



const sourceData = [
	{ position: 1, name: 'London', type: '1.0079', country: 'H', longitude:'4', value: 2.1, symbol: 'H' },
    { position: 2, name: 'Toronto', type: '4.0026', country: 'He', longitude:'4', value: 3.9, symbol: 'He' },
    { position: 3, name: 'Vancouver', type: '6.941', country: 'Li', longitude:'4', value: 4.2, symbol: 'Li' },
    { position: 4, name: 'Beryllium', type: '9.012', country: 'Be', longitude:'4', value: 5.7, symbol: 'Be' },
    { position: 5, name: 'Boron', type: '10.81', country: 'B', longitude:'4', value: 6.9, symbol: 'B' },
    { position: '', name: '', type: '', country: '', longitude:'', value: '', symbol: '' }

];			
const tableSimple: TableSource = {
	// A list of heading labels.
	head: ['Name', 'Id', 'Type', 'Iso_country', 'Iso_region', 'Longitude', 'Latitude'],
	// The data visibly shown in your table body UI.
	body: tableMapperValues(sourceData, ['name', 'symbol', 'type', 'value', 'region', 'longitude', 'latitude']),
	// Optional: The data returned when interactive is enabled and a row is clicked.
	meta: tableMapperValues(sourceData, ['position', 'type', 'name', 'symbol', 'weight']),
	// Optional: A list of footer labels.
	foot: ['Total', '', `<code class="code">${sourceData.length}</code>`]
};
				
</script>

<main>
	

		<Table interactive={true} source={tableSimple} />
        
		

</main>
