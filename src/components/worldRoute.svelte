<script lang="ts">
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	import { getCoordinatesByIndex, containsNumber } from '../functions/data-operations';
	import type { Writable } from 'svelte/store';

	let canvas: HTMLCanvasElement;
	let context: CanvasRenderingContext2D;
	let geojson = {};
	let projection: d3.GeoProjection;

	export let data: any;
	export let searchedIndexes: Writable<number[]>;
  export let selectedAirport: Writable<number[]>;
	export let routes: any;

	let locations: number[][] = [];
  let selectedLocations: number[] = [];
  selectedAirport.subscribe((value) => {
  if(containsNumber($selectedAirport))
  selectedLocations = getCoordinatesByIndex(data.airports, $selectedAirport);
  resize();
  
});

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
	let geoInterpolator = d3.geoInterpolate(route[currentSegment], route[currentSegment + 1]);
	let u = 0;
	let speedAdjustment = calculateSpeedAdjustment(route);

	function resize() {
		console.log('RESIZE');

		if (context) {
			const buffer = 50;

      
			let extent;
			if (locations.length === 1) {
        console.log("LEGNTH IS ONE", locations);
				extent = [
					[locations[0][0] - 10, locations[0][1] - 10], // bottom-left corner of the rectangle
					[locations[0][0] + 10, locations[0][1] + 10] // top-right corner of the rectangle
				];
				console.log('EXTENT', extent);
			}
			projection = d3.geoMercator().fitExtent(
				[
					[buffer, buffer],
					[800 - buffer, 600 - buffer]
				],
				{
					type: 'LineString',
					coordinates: extent ? extent : locations
				}
			);

			const geoGenerator = d3.geoPath().projection(projection).pointRadius(3).context(context);
      context.clearRect(0, 0, 800, 600);
			drawMap(geoGenerator);

      if(selectedLocations) {
        console.log("SELECTED LOCATION", selectedLocations);
        context.beginPath();
		context.fillStyle = '#ffffff'; // Change color as needed
		selectedLocations.forEach((point) => {
			const circleGenerator = d3
				.geoCircle()
				.center([point[0], point[1]]) // Set the center of the circle to the lon/lat coordinates of the point
				.radius(0.5); // Set the radius of the circle

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

		function update() {
			if (!canvas) {
				// console.error('Canvas is not initialized.');
				return;
			}

			context.clearRect(0, 0, canvas.width, canvas.height);
			drawMap(geoGenerator);

      if(routes){
			drawLines(geoGenerator); // Ensure lines are drawn
			drawMovingPoint(geoGenerator);
			// resize(projection);
      

			u += speedAdjustment[currentSegment];
			if (u > 1) {
				u = 0;
				currentSegment++;
				if (currentSegment < route.length - 1) {
					geoInterpolator = d3.geoInterpolate(route[currentSegment], route[currentSegment + 1]);
				} else {
					currentSegment = 0;
					geoInterpolator = d3.geoInterpolate(route[currentSegment], route[currentSegment + 1]);
				}
			}

			requestAnimationFrame(update);
    }
		}

		// update();
	});

	function calculateSpeedAdjustment(points: number[][]) {
		let distances = [];
		for (let i = 0; i < points.length - 1; i++) {
			let distance = d3.geoDistance(points[i], points[i + 1]);
			distances.push(distance);
		}
		let maxDistance = Math.max(...distances);
		return distances.map((d) => 0.01 * (maxDistance / d));
	}

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
		context.fillStyle = '#3ae0cd'; // Change color as needed
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
	function drawLines(geoGenerator: any) {
		context.beginPath();
		context.strokeStyle = '#3ae0cd'; // Change color as needed
		route.forEach((point, i) => {
			if (i < route.length - 1) {
				geoGenerator({
					type: 'Feature',
					geometry: {
						type: 'LineString',
						coordinates: [point, route[i + 1]]
					}
				});
			}
		});
		context.stroke();
	}

	function drawMovingPoint(geoGenerator: any) { 
		context.beginPath();
		context.fillStyle = '#3ae0cd';
		let interpolatedPoint = geoInterpolator(u);
		geoGenerator({ type: 'Feature', geometry: { type: 'Point', coordinates: interpolatedPoint } });
		context.fill();
	}
</script>
<div class="relative">
  <p class="absolute top-0 left-0 text-gray-800 m-2">(the earth is flat.)</p>
  {#if locations.length == 0}
  <p class="absolute top-[45%] left-[10%] text-red-800 m-2">No airport selected! Select one to display it on the map</p>
{/if}
  <canvas
      class="bg-black rounded-tl-lg rounded-bl-lg"
      bind:this={canvas}
      width="800"
      height="600"
  ></canvas>
</div>

