<script lang="ts">
    import Table from '../../components/table.svelte';
    import { reverseArray, combineAllValues } from '../../functions/data-operations';
    import PerformanceLog from '../../components/showPerformance.svelte'
    export let data:any;
    let sortedIndexes: number[] = data.sortedNames
    let selectedCategory: string = '';
    let isAscending: boolean = true;


    /**
 * Handles the sorting of data with different sorting types based on the data structure
 *
 * @param {string} category - the category to be sorted
 */
    function handleSort(category: string){
        const startTime = performance.now();
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
                sortedIndexes =  isAscending ? combineAllValues(data[category]) : reverseArray(combineAllValues(data[category]))
            }
            else {
                    sortedIndexes = isAscending ? data[category] : reverseArray(data[category])

            }
        }
        const endTime = performance.now();
        const elapsedTime = (endTime - startTime);
        let performanceTemp = [...data.performance];
        data.performance[1] = [...performanceTemp[1], elapsedTime];
        data.performance[0] = [...performanceTemp[0], "sort category"];
        
        selectedCategory = category
    }
</script>


 <p class="title"> ALL AIRPORTS </p> 

 <PerformanceLog performanceData={data.performance}/>

    <div class="buttons">
        
        <!-- toggleable buttons to change sorting order and type -->
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
   

<div class="tableContainer">
    <Table data={data} searchedIndexes={sortedIndexes} />
</div>

<style>

    .tableContainer{
        margin: 50px 10%;
    }

    .title{
        font-size: 40px;
        font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        text-align: center; 
        margin: 50px;
    }

    .buttons{
        display: flex;
    justify-content: flex-end;
    margin: 0 10%;
    }
</style>
