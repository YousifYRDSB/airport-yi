function merge<T>(arr1: T[], arr2: T[]): T[] {
    let sorted: T[] = [];
  
    while (arr1.length !== 0 && arr2.length !== 0) {
      if (arr1[0] < arr2[0]) {
        sorted.push(arr1.shift());
      } else {
        sorted.push(arr2.shift());
      }
    }
  
    return [...sorted, ...arr1, ...arr2];
  }
  
  export function mergeSort<T>(arr: T[]): T[] {
    //Base case
    if (arr.length <= 1) {
      return arr;
    }
  
    //Divide!
    let mid: number = Math.floor(arr.length / 2); //It doesn't really matter if it is floor or ceil here.
    let left: T[] = arr.slice(0, mid); //First half
    let right: T[] = arr.slice(mid); //Second half
  
    //Conquer!
    left = mergeSort(left);
    right = mergeSort(right);
  
    //Combine!
    return merge(left, right);
  }

// function tagretMatch(){
//   for
// }



export function search<T>(arr: T[], target:T):T|undefined{
  const LENGTH = arr.length; 
  let L=0; 
  let R= LENGTH -1; 

  while(L<= R){
    const MID = Math.floor((L+R)/2);
    if(arr[MID] < target){
      L = MID + 1; 
    }else if (arr[MID] > target){
      R = MID  -1 ;
    }else{
      return arr[MID]; 
    }
    return undefined; 
  }
}
