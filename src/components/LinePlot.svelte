<script>
  import { onMount } from 'svelte';
  import { select, geoMercator, geoPath, json } from 'd3';

  onMount(async () => {
    // The svg
    const svg = select("#my_dataviz");
    const width = +svg.attr("width");
    const height = +svg.attr("height");

    // Map and projection
    const projection = geoMercator()
      .scale(85)
      .translate([width/2, height/2*1.3]);

    // Create data: coordinates of start and end
    const link = {type: "LineString", coordinates: [[100, 60], [-60, -30]]}; // Change these data to see how the great circle reacts

    // A path generator
    const path = geoPath()
      .projection(projection);

    // Load world shape
    const data = await json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson");

    // Draw the map
    svg.append("g")
      .selectAll("path")
      .data(data.features)
      .enter().append("path")
        .attr("fill", "#b8b8b8")
        .attr("d", d => path(d))
        .style("stroke", "#fff")
        .style("stroke-width", 0);

    // Add the path
    svg.append("path")
      .attr("d", path(link))
      .style("fill", "none")
      .style("stroke", "cyan")
      .style("stroke-width", 3);
  });
</script>

<svg id="my_dataviz" width="440" height="300"></svg>

<style>
  /* Your component styles here */
</style>