

/**
 * Function to push a given element at the end of an array
 * @param {T} arg element to append at the end of an array
 * @param {T} arr array to have arg added to
 */
function arrayPush<T>(arg: T, arr: T[]): T[] {
    return [...arr, arg];
}



/**
 * Implementation of Merge Sort that works with indices as opposed to actual values of the array
 * @param {T[]} arr original array, for which the function will return a sorted array of its indices
 * 
 * This particular function is the starting function that takes the data and initializes an array of indices [1...i], as well as a buffer array
 * after which, it calls iterativeMergeSort, which calls merge
 * **This implementation uses double buffering, which is a tradeoff of space complexity (S(2n), extra copy) in turn for reduced array writes, time complexity is still O(nlogn)
 * 
 * this function is O(n) + recurseMergeSort()
 */
export function mergeSort<T>(arr: T[]): number[] {
  let n = arr.length
  const indices: number[] = new Array(arr.length); //generate an array of indices of ascending integers that will be later mutated to correspond to the sorted order
  for (let i = 0; i < n; i++) { 
      indices[i] = i;
  }
  const aux: number[] = new Array(n).fill(0); // initializes the buffer array for double buffering


  recurseMergeSort(arr, indices, aux, 0, n - 1);


   // the number of merges in mergesort is calculated with log2, depending if this value is even or odd, the final updated array will be in indices, or the aux array respectively; 
   // based on this the correct final array is returned
    if (Math.ceil(Math.log2(n)) % 2 == 0)
        return indices
    else return aux;  
    }




/**
 * @param {T} arr original array, used for comparison of data, to sort the indices array
 * @param {number[]} src the source/read array for merge(), initally indices[]
 * @param {number[]} dest the destination/write array for merge(), initially aux[]
 * @param {number[]} start the start of the particular segment of the array to be merged
 * @param {number[]} end the end of the particular segment of the array to be merged
 * 
 * recursive function splits the array into 2 (DAC), and merges the results at each level of recursion
 * the dest and src parameters are also reversed here in the recursive calls, as per the double buffer implementation
 * recurseMergeSort() is O(nlogn) + merge()
 */
function recurseMergeSort<T>(arr: T[], src: number[], dest: number[], start: number, end: number) {
  if (start >= end) return;  // Base case: a single element or no element

  let mid = Math.floor((start + end) / 2);
  recurseMergeSort(arr, dest, src, start, mid);  // Sorts the first (left) half, swapping dest and src
  recurseMergeSort(arr, dest, src, mid + 1, end); //same is done with the second (right) half

  // Merge the sorted halves back into dest
  merge(arr, src, dest, start, mid, end);
}

/**
 * Merges two sorted halves of an array based on indices into a single sorted segment. 
 * The function reads from the `src` array and writes the sorted result into the `dest` array.
 *
 * same params as recurseMergeSort()
 *
 * merge() is O(n)
 *
 */
function merge<T>(arr: T[], src: number[], dest: number[], start: number, mid: number, end: number) {
  let i = start;
  let j = mid + 1;
  let k = start;

  // Compare elements from both halves and merge in sorted order into `dest`
  for (; i <= mid && j <= end; k++) {
      if (arr[src[i]] <= arr[src[j]]) {
          dest[k] = src[i++];
      } else {
          dest[k] = src[j++];
      }
  }

  // Copy any remaining elements from the first half
  for (let m = i <= mid ? i : j; k <= end; k++, m++) {
      dest[k] = src[m];
  }
}

// function not used, commented out
// export function targetMatch<T>(target: any, arr:any[]): T[]{
//   let index: number = arr.findIndex(target); 
//   let fullArray: T[] = new Array(1); 
//   let displacerLeft: number = 0; 
//   let displacerRight: number =0; 
  
//   while(arr[index - displacerLeft].splice(0, 1) === target.splice(0,1)){
//     arrayPush(arr[index - displacerLeft], fullArray); 
//     displacerLeft ++; 
//   }

//   while(arr[index + displacerRight].splice(0, 1) === target.splice(0,1)){
//     arrayPush(arr[index + displacerRight], fullArray); 
//     displacerRight ++; 
//   }

//   return fullArray; 
// }


/**
 * Performs a binary search on the data array to find the target, optionally using an index array for indirect searching.
 * @param {any} target - The value to search for.
 * @param {any[]} data - The array of data.
 * @param {T[]} [arr] - Optional index array for indirect searches.
 * 
 * O(logn)
 */
export function search<T>(target:any, data:any, arr?: T[]): number|null{
  const LENGTH = data.length; 
  let left =0; 
  let right = LENGTH -1; 

  while(left <= right){
    const MID = Math.floor((left + right)/2);
    let index: any = 0;
    if(arr) index = arr[MID];
    else index = MID;
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

/**
 * Categorizes strings by their occurrences in the provided array.
 * returns an object where each key is a unique string from the input array,
 * and the corresponding value is an array of indices where that string appears.
 * 
 * The advantage of this type of search is that it is O(n), simply iterates and categorizes the data
 * 
 * @param {string[]} strings - array of data to categorize
 */
export function categorySort(strings: string[]): string[] {
  const obj: any = {};

  for (let i = 0; i < strings.length; i++) {
      const str = strings[i];
      if (!obj[str]) { //Initializes a new key for a given string if one does not already exist
          obj[str] = [];
      }
      obj[str][ obj[str].length] = i // pushes index of matching string into the category key
  }

  return obj;
}
 

// bonus 1 


/**
 * Calculates the Haversine distance between two points on the Earth.
 *
 * @param {number} lat1 - Latitude of the first point in degrees.
 * @param {number} lon1 - Longitude of the first point in degrees.
 * @param {number} lat2 - Latitude of the second point in degrees.
 * @param {number} lon2 - Longitude of the second point in degrees.
 */
export function haversineDistance(lat1:number, lon1: number, lat2: number, lon2: number) {
  // Helper function to convert degrees to radians
  function toRadians(degrees: number) {
      return degrees * Math.PI / 180;
  }

  const earthRadiusKm = 6371;
  const lat1InRadians = toRadians(lat1);
  const lat2InRadians = toRadians(lat2);
  const deltaLatitude = toRadians(lat2 - lat1);
  const deltaLongitude = toRadians(lon2 - lon1);

  //computes using haversine formula
  const a = Math.sin(deltaLatitude / 2) * Math.sin(deltaLatitude / 2) +
            Math.cos(lat1InRadians) * Math.cos(lat2InRadians) *
            Math.sin(deltaLongitude / 2) * Math.sin(deltaLongitude / 2);
  const angularDistanceInRadians = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadiusKm * angularDistanceInRadians;
}








