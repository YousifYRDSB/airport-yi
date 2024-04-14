<script lang="ts">
    import {Table} from '../../components/table.svelte';
	import {orderAirports} from "../../functions/sort-search"; 
</script>

 <p class="title"> ALL AIRPORTS </p> 

    <div class="buttons">
        <button type="button" class="button btn variant-filled"><img src="https://cdn2.iconfinder.com/data/icons/4web-3/139/sort3-512.png" alt="button"/></button>
        <div class="group btn-group-vertical variant-filled">
            <button type="button" on:click={() => mergeSort(['idk'])}>Name</button>
            <button type="button" on:click={() => mergeSort(['idk'])}>Longitude</button>
            <button type="button" on:click={() => mergeSort(['idk'])}>Latitude</button>
        </div>
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
        width: 60px; 
        height: 60px; 
        left: 30%;
        z-index: 1; 
         
    }

    .buttons{
        position: relative; 
        bottom: 1%;
        left: 63%; 
    }
    .group{
        position: fixed;
        left: 91%; 
        top: 18%;
        display: none; 
        z-index: 0; 
    }

    .buttons:hover .group{
        display: inline-block;
    }

</style>
