const mem = require('./memory');
const memory = new mem();

class Array {
  constructor() {
    this.length = 0;
    this._capacity = 0;
    this.ptr = memory.allocate(this.length);
  }

  push(value) {
    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }
    memory.set(this.ptr + this.length, value); 
    this.length++; 
  }

  _resize(size) {
    const oldPtr = this.ptr; 
    this.ptr = memory.allocate(size); // get new ptr from memory
    if (this.ptr === null) {
      throw new Error('Out of memory'); 
    }
    memory.copy(this.ptr, oldPtr, this.length); 
    memory.free(oldPtr); // free up unused memory
    this._capacity = size;
  }

  get(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }
    return memory.get(this.ptr + index);
  }

  pop () {
    if (this.length === 0) {
      throw new Error('Index error');
    }
    const value = memory.get(this.ptr + this.length - 1);
    this.length--;
    return value;
  }

  insert(index, value) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }

    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }

    memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
    memory.set(this.ptr + index, value);
    this.length++;
  }

  remove(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }
    memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index - 1);
    this.length--;
  }

}

Array.SIZE_RATIO = 3;

module.exports = Array;



function drills(){

    Array.SIZE_RATIO = 3;

    // Create an instance of the Array class
    let arr = new Array();

    // Add an item to the array
    //arr.push(3);//[length: 1, _capacity: 3, ptr: 0], capacity is set for default of 3

    //arr.push(5);
    //arr.push(15);
    //arr.push(19);
    //arr.push(45);
    //arr.push(10);//#2 Answer - [length: 6, _capacity: 12, ptr: 3], we push 5 more items, at the 4th item, a resize is needed (4 length X size_ratio of 3 for a capacity of 12), which is a ptr of 3

    //arr.pop();
    //arr.pop();
    //arr.pop(); //#3 Answer - [ length: 1, _capacity: 12, ptr: 3 ], this removes 3 values and reduces the length by 3 but does not resize because resize only occurs when length is larger than capacity
    
    //arr.push("tauhida"); //NaN because memory is setup as a Float64Array so a string cannot be added
    //When an array has reached capacity, it allocates a new, larger chunk of memory and copies the values from the old to the new and frees up the old chunk
    
    //console.log(arr);
    
        
        
}

//URLify a string
function URLify(str) {
    return str.trim().replace(/\s/g, '%20');
}

//Filtering an array
function filter(arr) {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] >= 5) {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}

//Max Sum in array
function maxSum(arr) {
    let currentSum = 0;
    let maxSum = 0;
  
    for (let i = 0; i < arr.length; i++) {
      let currentNum = arr[i]
  
      currentSum = Math.max((currentSum + currentNum), 0)
      maxSum = Math.max(currentSum, maxSum)
    }
    return maxSum
}
//console.log(maxSum([4, 6, -3, 5, -2, 1]));

//Merge Arrays
function mergeArrays(arr1, arr2) {
    let result = [...arr1, ...arr2];
    return result.sort((a, b) => a - b);
  
}
//console.log(mergeArrays([1, 3, 6, 8, 11], [2, 3, 5, 8, 9, 10]))

//Remove Characters
function removeChar(str, chars) {
    let newStr = '';
    let lowerStr = str.toLowerCase();
    for (let i = 0; i < str.length; i++) {
        let match = false;
        for (let j = 0; j < chars.length; j++) {
            if (lowerStr.charAt(i) === chars.charAt(j)) {
                match = !match;
            }
        }
        if (match === false) {
            newStr += str.charAt(i);
        }
    }
    return newStr;
}

//console.log(removeChar('Battle of the Vowels: Hawaii vs. Grozny', 'aeiou'));



//Products

function findProducts(arr) {
    let product = 1;
    for (let i = 0; i < arr.length; i++) {
        product = arr[i] * product;
    }
    let products = [];
    for (let j = 0; j < arr.length; j++) {
        products.push(product/arr[j]);
    }
    return products;
}

//console.log(findProducts([1, 3, 9, 4]));


//2D array

function array2d(arr) {
    let row = [1, 1, 1, 1, 1]
    let column = [1, 1, 1, 1, 1]
    for (let r = 0; r < row.length; r++) {
      for (let c = 0; c < column.length; c++) {
        if (arr[r][c] === 0) {
          row[r] = 0
          column[c] = 0
        }
      }
    }
    for (let r = 0; r < row.length; r++) {
      for (let c = 0; c < column.length; c++) {
        if (row[r] === 0 || column[c] === 0) {
          arr[r][c] = 0
        }
      }
    }
    return arr
  }
  
  /*console.log(array2d([[1, 0, 1, 1, 0],
  [0, 1, 1, 1, 0],
  [1, 1, 1, 1, 1],
  [1, 0, 1, 1, 1],
  [1, 1, 1, 1, 1]]));*/


  //String rotation

  function stringRotate(str1, str2) {
    str1 = str1.split('');
    str2 = str2.split('');
    let isRotation = false;

    for (let i = 0; i < str1.length; i++) {
        let first = str1.shift();
        str1.push(first);
        if (str1.join('') === str2.join('')) {
            isRotation = true;
        }
    }
    return isRotation;
}

console.log(stringRotate('amazon', 'azonma'));
console.log(stringRotate('amazon', 'azonam'));