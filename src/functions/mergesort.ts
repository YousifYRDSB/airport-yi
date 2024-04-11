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


export function targetMatch<T>(target: any, arr:any[]): T[]{
  let index: number = arr.findIndex(target); 
  let fullArray: T[] = []; 
  let displacer: number = 0; 
  
  while(arr[index - displacer].splice(0, 1) === target.splcie(0,1)){
    fullArray.push(arr[index - displacer]); 
    displacer ++; 
  }

  while(arr[index + displacer].splice(0, 1) === target.splcie(0,1)){
    fullArray.push(arr[index - displacer]); 
    displacer ++; 
  }

  return fullArray; 
}

export function search<T>(arr: T[], target:any):T|undefined{
  const LENGTH = arr.length; 
  let left =0; 
  let right = LENGTH -1; 

  while(left <= right){
    const MID = Math.floor((left + right)/2);
    if(arr[MID] < target){
      left = MID + 1; 
    }else if (arr[MID] > target){
      right = MID  -1 ;
    }else{
      return arr[MID]; 
    }
    return undefined; 
  }

}





