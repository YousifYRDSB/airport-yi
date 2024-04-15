<script lang="ts">
    import Table from '../../components/table.svelte';
	//import {orderAirports} from "../../functions/sort-search"; 
    import { reverseArray, combineAllValues } from '../../functions/data-operations';
    export let data:any;
    let sortedIndexes: number[] = []
    let selectedCategory: string = '';
    let isAscending: boolean = true;

    function handleSort(category: string){
        if(category == selectedCategory)
            isAscending = !isAscending


        if(category == "ident"){
            let identIndexes = [];
            for (let i = 0; i <= data.airports.ident.length; i++) {
                identIndexes[i] = i
            }
            sortedIndexes = isAscending ? identIndexes : reverseArray(identIndexes);
            
        }
        else {
            if(!Array.isArray(data[category])){
                console.log(isAscending)
                sortedIndexes =  isAscending ? combineAllValues(data[category]) : reverseArray(combineAllValues(data[category]))
            }
            else {
                if(!isAscending){
                sortedIndexes = data[category]
                }
                if(isAscending){ 
                    sortedIndexes = reverseArray(data[category])

                }
            }
        }
        
        selectedCategory = category
    }
</script>


 <p class="title"> ALL AIRPORTS </p> 

    <div class="buttons">
        <!-- <button type="button" class="button btn variant-filled"><img src="https://cdn2.iconfinder.com/data/icons/4web-3/139/sort3-512.png" alt="button"/></button> -->
        <div class="group btn-group variant-filled">
            <button type="button" on:click={() => handleSort('sortedNames')}>Name↑↓</button>
            <button type="button" on:click={() => handleSort('sortedTypes')}>Type↑↓</button>
            <button type="button" on:click={() => handleSort('sortedCountries')}>Country↑↓</button>
            <button type="button" on:click={() => handleSort('sortedContinents')}>Continent↑↓</button>
            <button type="button" on:click={() => handleSort('sortedRegions')}>Region↑↓</button>
            <button type="button" on:click={() => handleSort('ident')}>Ident↑↓</button>
            <button type="button" on:click={() => handleSort('sortedLatitudes')}>Longitude↑↓</button>
            <button type="button" on:click={() => handleSort('sortedLongitudes')}>Latitude↑↓</button>
        </div>
    </div>
   

<div>
    <Table data={data} searchedIndexes={sortedIndexes} />
</div>

<style>
    .title{
        font-size: 40px;
        font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        text-align: center; 
        margin: 50px;
    }

    .button{
        width: 60px; 
        height: 60px; 
         
    }

    .buttons{
        display: flex;
    justify-content: flex-end;
    margin: 20px;
    }
</style>
