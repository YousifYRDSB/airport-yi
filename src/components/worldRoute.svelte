<script lang="ts">
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	import { getCoordinatesByIndex, containsNumber } from '../functions/data-operations';
	import type { Writable } from 'svelte/store';

	let canvas: HTMLCanvasElement;
	let context: CanvasRenderingContext2D;
	let geojson = {};
	let projection: d3.GeoProjection;
	export let calculatedInfo: Writable<string>

	export let data: any;
	export let searchedIndexes: Writable<number[]>;
  export let selectedAirport: Writable<number[]>;

	let locations: number[][] = [];
  let selectedLocations: number[] = [];

  //subscribe to the selectedAirport store, and update selectedLocations, as well as resize (/redraw) the map
  $: {
  if(containsNumber($selectedAirport))
  selectedLocations = getCoordinatesByIndex(data.airports, $selectedAirport);
  else selectedLocations = [];

  resize();
  
}

//subscribe to the searchedIndexes store, and update locations, as well as resize (/redraw) the map
	$: {
		if (containsNumber($searchedIndexes))
			locations = getCoordinatesByIndex(data.airports, $searchedIndexes);
		resize();
	}



	//function is called whenever data updates, resizes the canvas to fit the data, and redraws the map, as well as any selected points
	function resize() {

		if (context) {
			const buffer = 50;


			let extent: any = locations;

			//extra buffer if only one airport is selected
			if (extent.length === 1) {
        console.log("LEGNTH IS ONE", locations);
				extent = [
					[locations[0][0] - 10, locations[0][1] - 10],
					[locations[0][0] + 10, locations[0][1] + 10] 
				];
				console.log('EXTENT', extent);
			}
			extent = [...extent, ...selectedLocations]
			
			projection = d3.geoMercator().fitExtent(
				[
					[buffer, buffer],
					[800 - buffer, 600 - buffer]
				],
				{
					type: 'LineString',
					coordinates: extent
				}
			);

			const geoGenerator = d3.geoPath().projection(projection).pointRadius(3).context(context);

			//clears the canvas before redrawing
      context.clearRect(0, 0, 800, 600);
			drawMap(geoGenerator);

			//redraws the selected points, if they exist
      if(selectedLocations) {
		drawLines(geoGenerator, selectedLocations);
        context.beginPath();
		context.fillStyle = '#3ae0cd'; // Change color as needed
		selectedLocations.forEach((point: any) => {
			const circleGenerator = d3
				.geoCircle()
				.center([point[0], point[1]]) // Set the center of the circle to the lon/lat coordinates of the point
				.radius(0.4); // Set the radius of the circle

			const circle = circleGenerator();
			geoGenerator(circle);
		});
		context.fill();
      }
	
		}
	}

	//callback runs when the wouldRoute component is mounted

	onMount(async () => {
		//intialize the canvas
		const canvasContext = canvas.getContext('2d');
		if (canvasContext) {
			context = canvasContext;
		} else {
			console.error('Canvas context is null.');
		}

		//define the projection
		const projection = d3.geoMercator();

		//zooms the map to fit the data, plus a predefined buffer
		const buffer = 100;
		if (locations.length > 0)
			projection.fitExtent(
				[
					[buffer, buffer],
					[800 - buffer, 600 - buffer]
				],
				{ type: 'LineString', coordinates: locations }
			);

		const geoGenerator = d3.geoPath().projection(projection).pointRadius(3).context(context);


		//load the geographical data for the world map
		geojson = await d3.json(
			'https://gist.githubusercontent.com/d3indepth/f28e1c3a99ea6d84986f35ac8646fac7/raw/c58cede8dab4673c91a3db702d50f7447b373d98/ne_110m_land.json'
		);

	});


	//draws the world map and other data on the canvas
	function drawMap(geoGenerator: any) {
		context.lineWidth = 0.5;
		context.strokeStyle = '#bbb';
		context.beginPath();
		geoGenerator({ type: 'FeatureCollection', features: geojson.features });
		context.stroke();

		const graticule = d3.geoGraticule();
		context.beginPath();
		context.strokeStyle = '#222';
		geoGenerator(graticule());
		context.stroke();

		context.beginPath();
		context.fillStyle = '#444'; // Change color as needed
		locations.forEach((point) => {
			const circleGenerator = d3
				.geoCircle()
				.center([point[0], point[1]]) // Set the center of the circle to the lon/lat coordinates of the point
				.radius(0.2); // Set the radius of the circle

			const circle = circleGenerator();
			geoGenerator(circle);
		});
		context.fill();
	}

	// Function to draw lines connecting locations
	function drawLines(geoGenerator: any, linePoints: number[][]) {
		context.beginPath();
		context.strokeStyle = '#3ae0cd'; // Change color as needed
		linePoints.forEach((point, i) => {
			if (i < linePoints.length - 1) {
				geoGenerator({
					type: 'Feature',
					geometry: {
						type: 'LineString',
						coordinates: [point, linePoints[i + 1]]
					}
				});
			}
		});
		context.stroke();
	}

</script>
<div class="relative">

	<!-- conditional rendering to display the calculated information from bonus questions -->
	{#if $calculatedInfo}
  <p class="w-[50%] overflow-auto absolute top-0 left-[250px] text-xl text-green-500 m-2">{$calculatedInfo}</p>
	{/if}

	<!-- conditional rendering if no airport have been searched and canvas is blank -->
  {#if locations.length == 0}
  <p class="absolute top-[45%] left-[10%] text-red-800 m-2">No airports searched! Search one to display it on the map</p>
{/if}

<!-- canvas where all the data will be drawn -->
  <canvas
      class="bg-black rounded-tl-lg rounded-bl-lg"
      bind:this={canvas}
      width="800"
      height="600"
  ></canvas>
</div>

