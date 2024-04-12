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
  let displacerLeft: number = 0; 
  let displacerRight: number =0; 
  
  while(arr[index - displacerLeft].splice(0, 1) === target.splcie(0,1)){
    fullArray.push(arr[index - displacerLeft]); 
    displacerLeft ++; 
  }

  while(arr[index + displacerRight].splice(0, 1) === target.splcie(0,1)){
    fullArray.push(arr[index - displacerRight]); 
    displacerRight ++; 
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

let clicked: number =0; 
export function orderAirports<T>(arr:T[]):T[] | undefined{
  let length = arr.length; 
  let counter: number = 0; 
  let order:T[] = arr; 
  if(clicked%2 === 0){
    clicked ++; 
    if(clicked>0){
      for(let i=0; i<length; i++){
        order[i] = order[counter]; 
        return order; 
      }
    }
    return order; 
  }else{
    counter = 0; 
    for(let i=0; i> length; i--){
      order[i] = order[counter]; 
      return order; 
    }

  }
}








