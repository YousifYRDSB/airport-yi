<script lang="ts">
    import Table from '../../components/table.svelte';
	import {orderAirports} from "../../functions/sort-search"; 
</script>

 <p class="title"> ALL AIRPORTS </p> 


 <button type="button" class="button"><img src="https://cdn2.iconfinder.com/data/icons/4web-3/139/sort3-512.png"/></button>
 <div class="filters">
    <button type="button" on:click={() => orderAirports(['placeholder'])}></button>
    <button type="button" on:click={() => orderAirports(['placeholder'])}></button>
    <button type="button" on:click={() => orderAirports(['placeholder'])}></button>
 </div>

<div>
    <Table/>
</div>

<style>
    .title{
        font-size: 40px;
        font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        text-align: center; 
        position: relative; 
        top: 2%; 
    }

    .button{
        position: relative;
        top: 3%; 
        left: 90%; 
        width: 50px; 
        height: 50px;
    }

</style>