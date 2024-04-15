

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



// export function mergeSort<T>(arr: T[]): number[] {
//   // Initialize indices array
//   const indices: number[] = new Array(arr.length);
//   for (let i = 0; i < arr.length; i++) {
//       indices[i] = i;
//   }
//   // Start recursive sort on the entire array of indices
//   return recursiveMergeSort(arr, indices);
// }


// Function to recursively sort indices based on the values they point to in arr

export function mergeSort<T>(arr: T[]): number[] {
  const indices: number[] = new Array(arr.length);
  for (let i = 0; i < arr.length; i++) {
      indices[i] = i;
  }
  const aux: number[] = new Array(arr.length);
  iterativeMergeSort(arr, indices, aux);
  if (Math.ceil(Math.log2(arr.length)) % 2 !== 0) {
    // After an odd number of total passes, copy back from aux to indices
    for (let i = 0; i < arr.length; i++) {
        indices[i] = aux[i];
    }
  }
  return indices;
}

function iterativeMergeSort<T>(arr: T[], indices: number[], aux: number[]) {
  let n = indices.length;
  let read = indices;   // Initially, read from indices
  let write = aux;      // Initially, write to aux

  for (let size = 1; size < n; size *= 2) {
    for (let leftStart = 0; leftStart < n - size; leftStart += 2 * size) {
      let mid = leftStart + size - 1;
      let rightEnd = Math.min(leftStart + 2 * size - 1, n - 1);
      merge(arr, read, write, leftStart, mid, rightEnd);
    }
    // Swap read and write arrays for the next level
    let temp = read;
    read = write;
    write = temp;
  }

  // Ensure the final sorted indices are in the original indices array if needed
  if (read !== indices) {
    for (let i = 0; i < n; i++) {
      indices[i] = read[i];
    }
  }
}

function merge<T>(arr: T[], read: number[], write: number[], start: number, mid: number, end: number) {
  let i = start;
  let j = mid + 1;
  let k = start;

  for (; i <= mid && j <= end; k++) {
      if (arr[read[i]] <= arr[read[j]]) {
          write[k] = read[i++];
      } else {
          write[k] = read[j++];
      }
  }

  for (let m = i <= mid ? i : j; k <= end; k++, m++) {
      write[k] = read[m];
  }
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

export function search<T>(target:any, data:any, arr?: T[]): number|null{
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
      buckets[str][ buckets[str].length] = i
  }

  return buckets;
}
 

// bonus 1 
export function distances(lat1:number, lat2:number, lon1:number,lon2:number): number | undefined{
    
  const dlon = lon2 - lon1;
  const dlat = lat2 - lat1; 
  const R = 6371; 

  const d = 2*R*Math.asin(Math.sqrt((1-Math.cos(dlat)+ Math.cos(lat1)*Math.cos(lat2)*(1-Math.cos(dlon)))/2)); 

  return d; 
}



export function displacements(lat1:number, lat2:number, lon1:number,lon2:number): number | undefined{
    
  const dlon = lon2 - lon1;
  const dlat = lat2 - lat1; 
  const R = 6371; 

  const dx = (dlon)*R*Math.cos(dlat/2)
  const dy = dlat*R 
  const d = Math.sqrt(Math.sqrt(dx) + Math.sqrt(dy)); 


  return d; 
}







