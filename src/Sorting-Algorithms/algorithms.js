const delay = 2;

async function merge(ele, low, mid, high){
  console.log('In merge()');
  console.log(`low=${low}, mid=${mid}, high=${high}`);
  const n1 = mid - low + 1;
  const n2 = high - mid;
  console.log(`n1=${n1}, n2=${n2}`);
  let left = new Array(n1);
  let right = new Array(n2);

  for(let i = 0; i < n1; i++){
      await waitforme(delay);
      console.log('In merge left loop');
      console.log(ele[low + i].style.height + ' at ' + (low+i));
      // color
      ele[low + i].style.background = 'orange';
      left[i] = ele[low + i].style.height;
  }
  for(let i = 0; i < n2; i++){
      await waitforme(delay);
      console.log('In merge right loop');
      console.log(ele[mid + 1 + i].style.height + ' at ' + (mid+1+i));
      // color
      ele[mid + 1 + i].style.background = 'yellow';
      right[i] = ele[mid + 1 + i].style.height;
  }
  await waitforme(delay);
  let i = 0, j = 0, k = low;
  while(i < n1 && j < n2){
      await waitforme(delay);
      console.log('In merge while loop');
      console.log(parseInt(left[i]), parseInt(right[j]));
      
      // To add color for which two r being compared for merging
      
      if(parseInt(left[i]) <= parseInt(right[j])){
          console.log('In merge while loop if');
          // color
          if((n1 + n2) === ele.length){
              ele[k].style.background = 'green';
          }
          else{
              ele[k].style.background = 'lightgreen';
          }
          
          ele[k].style.height = left[i];
          i++;
          k++;
      }
      else{
          console.log('In merge while loop else');
          // color
          if((n1 + n2) === ele.length){
              ele[k].style.background = 'green';
          }
          else{
              ele[k].style.background = 'lightgreen';
          } 
          ele[k].style.height = right[j];
          j++;
          k++;
      }
  }
  while(i < n1){
      await waitforme(delay);
      console.log("In while if n1 is left");
      // color
      if((n1 + n2) === ele.length){
          ele[k].style.background = 'green';
      }
      else{
          ele[k].style.background = 'lightgreen';
      }
      ele[k].style.height = left[i];
      i++;
      k++;
  }
  while(j < n2){
      await waitforme(delay);
      console.log("In while if n2 is left");
      // color
      if((n1 + n2) === ele.length){
          ele[k].style.background = 'green';
      }
      else{
          ele[k].style.background = 'lightgreen';
      }
      ele[k].style.height = right[j];
      j++;
      k++;
  }
}

export async function mergeSort(ele, l, r){
  console.log('In mergeSort()');
  if(l >= r){
      console.log(`return cause just 1 elemment l=${l}, r=${r}`);
      return;
  }
  const m = l + Math.floor((r - l) / 2);
  console.log(`left=${l} mid=${m} right=${r}`, typeof(m));
  await mergeSort(ele, l, m);
  await mergeSort(ele, m + 1, r);
  await merge(ele, l, m, r);
}

  export async function bubbleSort(ele) {
    for(let i = 0; i < ele.length-1; i++){
        console.log('In ith loop');
        for(let j = 0; j < ele.length-i-1; j++){
            console.log('In jth loop');
            ele[j].style.background = 'blue';
            ele[j+1].style.background = 'blue';
            if(parseInt(ele[j].style.height) > parseInt(ele[j+1].style.height)){
                console.log('In if condition');
                await waitforme(delay);
                swap(ele[j], ele[j+1]);
            }
            ele[j].style.background = '#A76F6F';
            ele[j+1].style.background = '#A76F6F';
        }
        ele[ele.length-1-i].style.background = 'green';
    }
    ele[0].style.background = 'green';
}


async function partitionLomuto(ele, l, r){
  console.log('In partitionLomuto()');
  let i = l - 1;
  // color pivot element
  ele[r].style.background = 'red';
  for(let j = l; j <= r - 1; j++){
      console.log('In partitionLomuto for j');
      // color current element
      ele[j].style.background = 'yellow';
      // pauseChamp
      await waitforme(delay);

      if(parseInt(ele[j].style.height) < parseInt(ele[r].style.height)){
          console.log('In partitionLomuto for j if');
          i++;
          swap(ele[i],ele[j]);
          // color 
          ele[i].style.background = 'orange';
          if(i != j) ele[j].style.background = 'orange';
          // pauseChamp
         await waitforme(delay);
      }
      else{
          // color if not less than pivot
          ele[j].style.background = 'pink';
      }
  }
  i++; 
  // pauseChamp
  await waitforme(delay);
  swap(ele[i],ele[r]);
  console.log(`i = ${i}`, typeof(i));
  // color
  ele[r].style.background = 'pink';
  ele[i].style.background = 'green';

  // pauseChamp
  await waitforme(delay);
  
  // color
  for(let k = 0; k < ele.length; k++){
      if(ele[k].style.background != 'green')
          ele[k].style.background = '#A76F6F';
  }

  return i;
}

export async function quickSort(ele, l, r){
  console.log('In quickSort()', `l=${l} r=${r}`, typeof(l), typeof(r));
  if(l < r){
      let pivot_index = await partitionLomuto(ele, l, r);
      await quickSort(ele, l, pivot_index - 1);
      await quickSort(ele, pivot_index + 1, r);
  }
  else{
      if(l >= 0 && r >= 0 && l <ele.length && r <ele.length){
          ele[r].style.background = 'green';
          ele[l].style.background = 'green';
      }
  }
}

function waitforme(milisec) { 
  return new Promise(resolve => { 
      setTimeout(() => { resolve('') }, milisec); 
  }) 
}
  
function swap(i,j){
  const temp = i.style.height;
  i.style.height = j.style.height;
  j.style.height = temp;
}

async function heapify(ele, n, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
  
    if (left < n && parseInt(ele[left].style.height) > parseInt(ele[largest].style.height)) {
        largest = left;
    }
  
    if (right < n && parseInt(ele[right].style.height) > parseInt(ele[largest].style.height)) {
        largest = right;
    }
  
    if (largest != i) {
        ele[i].style.backgroundColor = 'orange'; // Element being moved
        ele[largest].style.backgroundColor = 'orange'; // Element being moved
        await waitforme(delay);
        swap(ele[i], ele[largest]);
  
        ele[i].style.backgroundColor = '#A76F6F'; // Element has been swapped
        ele[largest].style.backgroundColor = '#A76F6F'; // Element has been swapped
        await heapify(ele, n, largest);
    }
  }
  
  export async function heapSort(ele) {
    let n = ele.length;
  
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(ele, n, i);
    }
  
    for (let i = n - 1; i > 0; i--) {
        ele[0].style.backgroundColor = 'orange'; // Element being moved
        ele[i].style.backgroundColor = 'orange'; // Element being moved
        await waitforme(delay);
        swap(ele[0], ele[i]);
  
        ele[0].style.backgroundColor = '#A76F6F'; // Element has been swapped
        ele[i].style.backgroundColor = 'lightgreen'; // Element is now sorted
        await heapify(ele, i, 0);
    }
  
    ele[0].style.backgroundColor = 'lightgreen'; // Final element is now sorted
  }
  
 export async function insertion(ele){
    console.log('In insertion()');
    // color
    ele[0].style.background = 'green';
    for(let i = 1; i < ele.length; i++){
        console.log('In ith loop');
        let j = i - 1;
        let key = ele[i].style.height;
        // color
        ele[i].style.background = 'blue';

        await waitforme(delay);

        while(j >= 0 && (parseInt(ele[j].style.height) > parseInt(key))){
            console.log('In while loop');
            // color
            ele[j].style.background = 'blue';
            ele[j + 1].style.height = ele[j].style.height;
            j--;

            await waitforme(delay);

            // color
            for(let k = i; k >= 0; k--){
                ele[k].style.background = 'green';
            }
        }
        ele[j + 1].style.height = key;
        // color
        ele[i].style.background = 'green';
    }
}

export async function selection(ele){
    console.log('In selection()');
    for(let i = 0; i < ele.length; i++){
        console.log('In ith loop');
        let min_index = i;
        // Change color of the position to swap with the next min
        ele[i].style.background = 'blue';
        for(let j = i+1; j < ele.length; j++){
            console.log('In jth loop');
            // Change color for the current comparision (in consideration for min_index)
            ele[j].style.background = 'red';

            await waitforme(delay);
            if(parseInt(ele[j].style.height) < parseInt(ele[min_index].style.height)){
                console.log('In if condition height comparision');
                if(min_index !== i){
                    // new min_index is found so change prev min_index color back to normal
                    ele[min_index].style.background = '#A76F6F';
                }
                min_index = j;
            } 
            else{
                // if the currnent comparision is more than min_index change is back to normal
                ele[j].style.background = '#A76F6F';
            }   
        }
        await waitforme(delay);
        swap(ele[min_index], ele[i]);
        // change the min element index back to normal as it is swapped 
        ele[min_index].style.background = '#A76F6F';
        // change the sorted elements color to green
        ele[i].style.background = 'green';
    }
}