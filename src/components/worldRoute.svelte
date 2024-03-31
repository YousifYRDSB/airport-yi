<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
  
    let canvas;
    let context;
    let geojson = {};
  
    const londonLonLat = [0.1278, 51.5074];
    const newYorkLonLat = [-74.0059, 40.7128];
    const laLonLat = [-118.2426, 34.0549];
    const route = [londonLonLat, newYorkLonLat, laLonLat];
    let currentSegment = 0;
    let geoInterpolator = d3.geoInterpolate(route[currentSegment], route[currentSegment + 1]);
    let u = 0;
    let speedAdjustment = calculateSpeedAdjustment(route);
  
    onMount(async () => {
      context = canvas.getContext('2d');
      
      const projection = d3.geoOrthographic()
        .scale(200)
        .rotate([30, -45])
        .translate([400, 300]);
  
      const geoGenerator = d3.geoPath()
        .projection(projection)
        .pointRadius(3)
        .context(context);
  
      geojson = await d3.json('https://gist.githubusercontent.com/d3indepth/f28e1c3a99ea6d84986f35ac8646fac7/raw/c58cede8dab4673c91a3db702d50f7447b373d98/ne_110m_land.json');
  
      function update() {
        context.clearRect(0, 0, canvas.width, canvas.height);
  
        drawMap(geoGenerator);
        drawLines(geoGenerator); // Ensure lines are drawn
        drawMovingPoint(geoGenerator);
  
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
  
      update();
    });
  
    function calculateSpeedAdjustment(points) {
      let distances = [];
      for (let i = 0; i < points.length - 1; i++) {
        let distance = d3.geoDistance(points[i], points[i + 1]);
        distances.push(distance);
      }
      let maxDistance = Math.max(...distances);
      return distances.map(d => 0.01 * (maxDistance / d));
    }
  
    function drawMap(geoGenerator) {
      context.lineWidth = 0.5;
      context.strokeStyle = '#bbb';
      context.beginPath();
      geoGenerator({ type: 'FeatureCollection', features: geojson.features });
      context.stroke();
  
      const graticule = d3.geoGraticule();
      context.beginPath();
      context.strokeStyle = '#444';
      geoGenerator(graticule());
      context.stroke();
    }
  
    // Function to draw lines connecting locations
    function drawLines(geoGenerator) {
      context.beginPath();
      context.strokeStyle = '#3ae0cd'; // Change color as needed
      route.forEach((point, i) => {
        if (i < route.length - 1) {
          geoGenerator({
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: [point, route[i + 1]],
            },
          });
        }
      });
      context.stroke();
    }
  
    function drawMovingPoint(geoGenerator) {
      context.beginPath();
      context.fillStyle = '#3ae0cd';
      let interpolatedPoint = geoInterpolator(u);
      geoGenerator({ type: 'Feature', geometry: { type: 'Point', coordinates: interpolatedPoint } });
      context.fill();
    }
  </script>
  
  <canvas class="bg-black rounded-tl-[50px] rounded-bl-[50px]" bind:this={canvas} width="800" height="600"></canvas>
  