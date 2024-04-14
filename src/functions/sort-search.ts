

function sliceArray<T>(arr: T[], start: number = 0, end: number = arr.length): T[] {
  if (start >= end) return [];
  const result: T[] = new Array(end - start);
  for (let i = start, j = 0; i < end; i++, j++) {
      result[j] = arr[i];
  }

  return result;
}

function arrayPush<T>(arg: T, arr: T[]): T[] {
    return [...arr, arg];
}



export function mergeSort<T>(arr: T[]): number[] {
  // Initialize indices array
  const indices: number[] = new Array(arr.length);
  for (let i = 0; i < arr.length; i++) {
      indices[i] = i;
  }
  // Start recursive sort on the entire array of indices
  return recursiveMergeSort(arr, indices);
}


// Function to recursively sort indices based on the values they point to in arr
function recursiveMergeSort(arr: any[], indices: number[]): number[] {
  // console.log(indices.length)
    if (indices.length <= 1) {
        // return sliceArray(indices, start, end)
        return indices
    }

    const mid = Math.floor(indices.length / 2);
    let left = sliceArray(indices, 0, mid) //First half
    let right = sliceArray(indices, mid) //Second half
     left = recursiveMergeSort(arr, left);
     right = recursiveMergeSort(arr, right);

      return merge(arr, left, right, indices);

}

function merge<T>( arr: any[], left: number[], right: number[], indices: number[]): number[] {
  let i: number = 0;
  let j: number = 0;

  for (let k = 0; k < indices.length; k++) {
    if (i >= left.length) {
      //If left is empty
      indices[k] = right[j]; //Dump in the values from right
      j++;
    } else if (j >= right.length) {
      //If right is empty
      indices[k] = left[i]; //Dump in the values from left
      i++;
    } else if (arr[left[i]] < arr[right[j]]) {
      indices[k] = left[i];
      i++;
    } else {
      indices[k] = right[j];
      j++;
    }
  }

  return indices;

}




export function targetMatch<T>(target: any, arr:any[]): T[]{
  let index: number = arr.findIndex(target); 
  let fullArray: T[] = new Array(1); 
  let displacerLeft: number = 0; 
  let displacerRight: number =0; 
  
  while(arr[index - displacerLeft].splice(0, 1) === target.splice(0,1)){
    arrayPush(arr[index - displacerLeft], fullArray); 
    displacerLeft ++; 
  }

  while(arr[index + displacerRight].splice(0, 1) === target.splice(0,1)){
    arrayPush(arr[index + displacerRight], fullArray); 
    displacerRight ++; 
  }

  return fullArray; 
}

export function search<T>(target:any, data:any, arr: T[]): T|null{
  const LENGTH = data.length; 
  let left =0; 
  let right = LENGTH -1; 

  while(left <= right){
    const MID = Math.floor((left + right)/2);
    let index: any = 0;
    if(arr) index = arr[MID];
    else index = MID;
    // console.log('mid', data[MID])
    if(data[index] < target){
      left = MID + 1; 
    }else if (data[index] > target){
      right = MID  -1 ;
    }else{
      return index; 
    }
  }
  return null; 

}

// makes each colum in the table given range of airports 
// range is based on search parameters ie. small airports are only from indexs x to y 
export function catergorize<T>(arr: T[], main: T[], start: number, end:number):T[]{
    const LENGTH = end-start; 
    const category: T[] = new Array(LENGTH); 
    for(let i=0; i<LENGTH; i++){
        let index = arr[start + i]; 
        category[i] = main[index]; 
    }

    return category; 
}

// generated from GPT-4
// function that takes an array of strings and returns an object where the keys are the unique strings and the values are arrays of all occurrences of the string
// O(n)
export function categorySort(strings: string[]): string[] {
  const buckets: any = {};

  for (let i = 0; i < strings.length; i++) {
      const str = strings[i];
      if (!buckets[str]) {
          buckets[str] = [];
      }
      buckets[str].push(i);
  }

  return buckets;
}
 

// bonus 1 
function comapre(airOne: string, airTwo:string): number | undefined{
    let indexOne = search(data.sortedID, airOne, data.airports.ID);
    let indexTwo = search(data.sortedID, airTwo, data.airports.ID);

    if(data.airports.type[indexOne] === data.airports.type[indexTwo]){
      const lon1 = data.airports.longitude[indexOne];
      const lon2 = data.airports.longitude[indexTwo];
      const lat1 = data.airports.longitude[indexOne];
      const lat2 = data.airports.longitude[indexTwo];
      const dlon = lon2 - lon1;
      const dlat = lat2 - lat1; 
      const R = 6371; 

      let d = 2*R*Math.asin(Math.sqrt((1-Math.cos(dlat)+ Math.cos(lat1)*Math.cos(lat2)*(1-Math.cos(dlon)))/2)); 

      return d; 
    }else{
      return undefined; 
    }
}







