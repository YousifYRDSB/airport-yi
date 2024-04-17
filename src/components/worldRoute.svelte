<script lang="ts">
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	import { getCoordinatesByIndex, containsNumber } from '../functions/data-operations';
	import type { Writable } from 'svelte/store';

	let canvas: HTMLCanvasElement;
	let context: CanvasRenderingContext2D;
	let foregroundContext: CanvasRenderingContext2D;
	let geojson = {};
	let projection: d3.GeoProjection;
	export let calculatedInfo: Writable<string>

	export let data: any;
	export let searchedIndexes: Writable<number[]>;
  export let selectedAirport: Writable<number[]>;
	export let optimalPath: any;

	let locations: number[][] = [];
  let selectedLocations: number[] = [];
  $: {
  if(containsNumber($selectedAirport))
  selectedLocations = getCoordinatesByIndex(data.airports, $selectedAirport);
  else selectedLocations = [];

  resize();
  
}

	$: {
		if (containsNumber($searchedIndexes))
			locations = getCoordinatesByIndex(data.airports, $searchedIndexes);
		resize();
	}

	const londonLonLat = [0.1278, 51.5074];
	const newYorkLonLat = [-74.0059, 40.7128];
	const laLonLat = [-118.2426, 34.0549];
	let route = [londonLonLat, newYorkLonLat, laLonLat, [-89.0059, 50.7128]];
	let currentSegment = 0;

	function resize() {
		console.log('RESIZE');

		if (context) {
			const buffer = 50;


			let extent: any = locations;
			if (extent.length === 1) {
        console.log("LEGNTH IS ONE", locations);
				extent = [
					[locations[0][0] - 10, locations[0][1] - 10], // bottom-left corner of the rectangle
					[locations[0][0] + 10, locations[0][1] + 10] // top-right corner of the rectangle
				];
				console.log('EXTENT', extent);
			}
			extent = [...extent, ...selectedLocations]
			// console.log(extent)
			
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
      context.clearRect(0, 0, 800, 600);

			drawMap(geoGenerator);

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

	onMount(async () => {
		const canvasContext = canvas.getContext('2d');
		if (canvasContext) {
			context = canvasContext;
		} else {
			console.error('Canvas context is null.');
		}

		const route = [londonLonLat, newYorkLonLat, laLonLat];

		const projection = d3.geoMercator();
		// Use fitSize to set the scale and translation of the projection to fit the route within the canvas size
		const buffer = 100; // Adjust the buffer size as needed

		if (locations.length > 0)
			projection.fitExtent(
				[
					[buffer, buffer],
					[800 - buffer, 600 - buffer]
				],
				{ type: 'LineString', coordinates: locations }
			);
		const geoGenerator = d3.geoPath().projection(projection).pointRadius(3).context(context);

		geojson = await d3.json(
			'https://gist.githubusercontent.com/d3indepth/f28e1c3a99ea6d84986f35ac8646fac7/raw/c58cede8dab4673c91a3db702d50f7447b373d98/ne_110m_land.json'
		);

	});


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
	{#if $calculatedInfo}
  <p class="w-[50%] overflow-auto absolute top-0 left-[250px] text-xl text-green-500 m-2">{$calculatedInfo}</p>
	{/if}
  {#if locations.length == 0}
  <p class="absolute top-[45%] left-[10%] text-red-800 m-2">No airports searched! Search one to display it on the map</p>
{/if}
  <canvas
      class="bg-black rounded-tl-lg rounded-bl-lg"
      bind:this={canvas}
      width="800"
      height="600"
  ></canvas>
</div>

