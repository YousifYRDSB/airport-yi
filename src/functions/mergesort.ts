

function sliceArray<T>(arr: T[], start: number = 0, end: number = arr.length): T[] {
  if (start >= end) return [];
  const result: T[] = new Array(end - start);
  for (let i = start, j = 0; i < end; i++, j++) {
      result[j] = arr[i];
  }

  return result;
}

function arrayPush<T>(arg: T, arr: T[]): void{
    return arr[...arr, arg];  
}




// function merge<T>(left: T[], right: T[], arr: T[]): any {
//   let i: number = 0;
//   let j: number = 0;

//   while (i < left.length && j < right.length) { 
    
//     if (left[i] < right[j]) {
//       arr[i + j] = left[i]; 
//       i++;
//     } else {
//       arr[i + j] = right[j]; 
//       j++;
//     }
//   }

//   return [...sliceArray(arr, 0, i + j), ...sliceArray(left, i), ...sliceArray(right, j)]; 
// }
  
//   export function mergeSort<T>(arr: T[]): T[] {
//     //Base case
//     if (arr.length <= 1) {
//       return arr;
//     }
  
//     //Divide!
//     const MID: number = Math.floor(arr.length / 2); 
//     let left: T[] = sliceArray(arr, 0, MID); 
//     let right: T[] = sliceArray(arr, MID); 
  
    
//     left = mergeSort(left);
//     right = mergeSort(right);
  
    
//     return merge(left, right, arr);
//   }



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
  
  while(arr[index - displacerLeft].splice(0, 1) === target.splcie(0,1)){
    arrayPush(arr[index - displacerLeft], fullArray); 
    displacerLeft ++; 
  }

  while(arr[index + displacerRight].splice(0, 1) === target.splcie(0,1)){
    arrayPush(arr[index + displacerRight], fullArray); 
    displacerRight ++; 
  }

  return fullArray; 
}

export function search<T>(arr: T[], target:any, data:any): T|null{
  const LENGTH = arr.length; 
  let left =0; 
  let right = LENGTH -1; 

  while(left <= right){
    const MID = Math.floor((left + right)/2);
    console.log('mid', data[MID])
    if(data[arr[MID]] < target){
      left = MID + 1; 
    }else if (data[arr[MID]] > target){
      right = MID  -1 ;
    }else{
      return arr[MID]; 
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








