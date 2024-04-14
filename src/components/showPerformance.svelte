<script lang="ts">
    import type { Writable } from 'svelte/store';
    
    export let performanceData: any[][]; 
</script>

<div class="absolute bottom-0 left-0 bg-black text-green-500 p-4 overflow-y-scroll rounded-tr-3xl shadow-2xl" style="height: 300px; width: 200px">
    <h3 class="text-white">Performance Log:</h3>
    <ul>
      {#each performanceData[0] as name, index}
      <li>{performanceData[0][performanceData[0].length - 1 - index]} - {(performanceData[1][performanceData[1].length - 1 - index]).toFixed(3)}ms</li>
      {/each}
    </ul>
  </div>
