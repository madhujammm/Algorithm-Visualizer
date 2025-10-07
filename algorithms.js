//  Sorting Algorithms
export class SortingAlgorithms {
  constructor(visualizer) {
    this.visualizer = visualizer;
    this.comparisons = 0;
    this.swaps = 0;
    this.isRunning = false;
  }

  async bubbleSort(arr) {
    this.resetStats();
    this.isRunning = true;
    const n = arr.length;

    for (let i = 0; i < n - 1 && this.isRunning; i++) {
      for (let j = 0; j < n - i - 1 && this.isRunning; j++) {
        // Highlight comparing elements
        this.visualizer.highlightBars([j, j + 1], 'comparing');
        this.comparisons++;
        this.updateStats();
        
        await this.delay(500);
        
        if (arr[j] > arr[j + 1]) {
          // Highlight swapping elements
          this.visualizer.highlightBars([j, j + 1], 'swapping');
          await this.delay(300);
          
          // Swap elements
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          this.swaps++;
          this.updateStats();
          
          // Update visualization
          this.visualizer.updateArray(arr);
          await this.delay(300);
        }
        
        // Clear highlighting
        this.visualizer.clearHighlights();
      }
      
      // Mark last element as sorted
      this.visualizer.highlightBars([n - i - 1], 'sorted');
    }
    
    // Mark all elements as sorted
    if (this.isRunning) {
      this.visualizer.highlightBars(Array.from({length: n}, (_, i) => i), 'sorted');
    }
    
    this.isRunning = false;
    return arr;
  }

  async insertionSort(arr) {
    this.resetStats();
    this.isRunning = true;
    const n = arr.length;

    for (let i = 1; i < n && this.isRunning; i++) {
      let key = arr[i];
      let j = i - 1;
      
      // Highlight current element
      this.visualizer.highlightBars([i], 'comparing');
      await this.delay(500);

      while (j >= 0 && this.isRunning) {
        this.comparisons++;
        this.updateStats();
        
        // Highlight comparing elements
        this.visualizer.highlightBars([j, j + 1], 'comparing');
        await this.delay(300);
        
        if (arr[j] > key) {
          // Highlight swapping elements
          this.visualizer.highlightBars([j, j + 1], 'swapping');
          
          arr[j + 1] = arr[j];
          this.swaps++;
          this.updateStats();
          
          // Update visualization
          this.visualizer.updateArray(arr);
          await this.delay(300);
          
          j--;
        } else {
          break;
        }
      }
      
      arr[j + 1] = key;
      this.visualizer.updateArray(arr);
      
      // Mark sorted portion
      this.visualizer.highlightBars(Array.from({length: i + 1}, (_, idx) => idx), 'sorted');
      await this.delay(200);
    }
    
    // Mark all elements as sorted
    if (this.isRunning) {
      this.visualizer.highlightBars(Array.from({length: n}, (_, i) => i), 'sorted');
    }
    
    this.isRunning = false;
    return arr;
  }

  async selectionSort(arr) {
    this.resetStats();
    this.isRunning = true;
    const n = arr.length;

    for (let i = 0; i < n - 1 && this.isRunning; i++) {
      let minIndex = i;
      
      // Highlight current minimum
      this.visualizer.highlightBars([minIndex], 'comparing');
      await this.delay(300);

      for (let j = i + 1; j < n && this.isRunning; j++) {
        this.comparisons++;
        this.updateStats();
        
        // Highlight comparing element
        this.visualizer.highlightBars([minIndex, j], 'comparing');
        await this.delay(200);
        
        if (arr[j] < arr[minIndex]) {
          // Clear old minimum highlight
          this.visualizer.clearHighlights();
          minIndex = j;
          // Highlight new minimum
          this.visualizer.highlightBars([minIndex], 'comparing');
          await this.delay(200);
        }
      }

      if (minIndex !== i) {
        // Highlight swapping elements
        this.visualizer.highlightBars([i, minIndex], 'swapping');
        await this.delay(500);
        
        // Swap elements
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        this.swaps++;
        this.updateStats();
        
        // Update visualization
        this.visualizer.updateArray(arr);
        await this.delay(300);
      }
      
      // Mark element as sorted
      this.visualizer.highlightBars([i], 'sorted');
      await this.delay(200);
    }
    
    // Mark all elements as sorted
    if (this.isRunning) {
      this.visualizer.highlightBars(Array.from({length: n}, (_, i) => i), 'sorted');
    }
    
    this.isRunning = false;
    return arr;
  }

  async mergeSort(arr) {
    this.resetStats();
    this.isRunning = true;
    
    await this.mergeSortHelper(arr, 0, arr.length - 1);
    
    // Mark all elements as sorted
    if (this.isRunning) {
      this.visualizer.highlightBars(Array.from({length: arr.length}, (_, i) => i), 'sorted');
    }
    
    this.isRunning = false;
    return arr;
  }

  async mergeSortHelper(arr, left, right) {
    if (left >= right || !this.isRunning) return;
    
    const mid = Math.floor((left + right) / 2);
    
    // Highlight current range being divided
    const rangeIndices = Array.from({length: right - left + 1}, (_, i) => left + i);
    this.visualizer.highlightBars(rangeIndices, 'comparing');
    await this.delay(400);
    
    // Recursively sort left and right halves
    await this.mergeSortHelper(arr, left, mid);
    await this.mergeSortHelper(arr, mid + 1, right);
    
    // Merge the sorted halves
    await this.merge(arr, left, mid, right);
  }

  async merge(arr, left, mid, right) {
    if (!this.isRunning) return;
    
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    
    let i = 0, j = 0, k = left;
    
    // Highlight merging ranges
    const leftIndices = Array.from({length: mid - left + 1}, (_, idx) => left + idx);
    const rightIndices = Array.from({length: right - mid}, (_, idx) => mid + 1 + idx);
    
    while (i < leftArr.length && j < rightArr.length && this.isRunning) {
      this.comparisons++;
      this.updateStats();
      
      // Highlight elements being compared
      this.visualizer.highlightBars([left + i, mid + 1 + j], 'comparing');
      await this.delay(300);
      
      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }
      
      this.swaps++;
      this.updateStats();
      
      // Highlight merged element
      this.visualizer.highlightBars([k], 'swapping');
      this.visualizer.updateArray(arr);
      await this.delay(200);
      
      k++;
    }
    
    // Copy remaining elements
    while (i < leftArr.length && this.isRunning) {
      arr[k] = leftArr[i];
      this.visualizer.highlightBars([k], 'swapping');
      this.visualizer.updateArray(arr);
      await this.delay(150);
      i++;
      k++;
    }
    
    while (j < rightArr.length && this.isRunning) {
      arr[k] = rightArr[j];
      this.visualizer.highlightBars([k], 'swapping');
      this.visualizer.updateArray(arr);
      await this.delay(150);
      j++;
      k++;
    }
    
    // Highlight merged section
    const mergedIndices = Array.from({length: right - left + 1}, (_, idx) => left + idx);
    this.visualizer.highlightBars(mergedIndices, 'sorted');
    await this.delay(300);
  }

  async quickSort(arr) {
    this.resetStats();
    this.isRunning = true;
    
    await this.quickSortHelper(arr, 0, arr.length - 1);
    
    // Mark all elements as sorted
    if (this.isRunning) {
      this.visualizer.highlightBars(Array.from({length: arr.length}, (_, i) => i), 'sorted');
    }
    
    this.isRunning = false;
    return arr;
  }

  async quickSortHelper(arr, low, high) {
    if (low < high && this.isRunning) {
      // Highlight current range
      const rangeIndices = Array.from({length: high - low + 1}, (_, i) => low + i);
      this.visualizer.highlightBars(rangeIndices, 'comparing');
      await this.delay(400);
      
      const pivotIndex = await this.partition(arr, low, high);
      
      await this.quickSortHelper(arr, low, pivotIndex - 1);
      await this.quickSortHelper(arr, pivotIndex + 1, high);
    }
  }

  async partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    
    // Highlight pivot
    this.visualizer.highlightBars([high], 'found');
    await this.delay(500);
    
    for (let j = low; j < high && this.isRunning; j++) {
      this.comparisons++;
      this.updateStats();
      
      // Highlight current element being compared with pivot
      this.visualizer.highlightBars([j, high], 'comparing');
      await this.delay(300);
      
      if (arr[j] < pivot) {
        i++;
        if (i !== j) {
          // Highlight swapping elements
          this.visualizer.highlightBars([i, j], 'swapping');
          await this.delay(300);
          
          [arr[i], arr[j]] = [arr[j], arr[i]];
          this.swaps++;
          this.updateStats();
          
          this.visualizer.updateArray(arr);
          await this.delay(200);
        }
      }
    }
    
    // Place pivot in correct position
    this.visualizer.highlightBars([i + 1, high], 'swapping');
    await this.delay(300);
    
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    this.swaps++;
    this.updateStats();
    
    this.visualizer.updateArray(arr);
    this.visualizer.highlightBars([i + 1], 'sorted');
    await this.delay(400);
    
    return i + 1;
  }

  async timSort(arr) {
    this.resetStats();
    this.isRunning = true;
    const MIN_MERGE = 32;
    const n = arr.length;
    
    // Sort individual subarrays of size MIN_MERGE using insertion sort
    for (let i = 0; i < n && this.isRunning; i += MIN_MERGE) {
      const right = Math.min(i + MIN_MERGE - 1, n - 1);
      await this.insertionSortRange(arr, i, right);
    }
    
    // Start merging from size MIN_MERGE
    let size = MIN_MERGE;
    while (size < n && this.isRunning) {
      for (let start = 0; start < n && this.isRunning; start += size * 2) {
        const mid = start + size - 1;
        const end = Math.min(start + size * 2 - 1, n - 1);
        
        if (mid < end) {
          await this.merge(arr, start, mid, end);
        }
      }
      size *= 2;
    }
    
    // Mark all elements as sorted
    if (this.isRunning) {
      this.visualizer.highlightBars(Array.from({length: n}, (_, i) => i), 'sorted');
    }
    
    this.isRunning = false;
    return arr;
  }

  async insertionSortRange(arr, left, right) {
    for (let i = left + 1; i <= right && this.isRunning; i++) {
      let key = arr[i];
      let j = i - 1;
      
      // Highlight current element
      this.visualizer.highlightBars([i], 'comparing');
      await this.delay(200);
      
      while (j >= left && this.isRunning) {
        this.comparisons++;
        this.updateStats();
        
        if (arr[j] > key) {
          arr[j + 1] = arr[j];
          this.swaps++;
          this.updateStats();
          
          this.visualizer.updateArray(arr);
          await this.delay(100);
          j--;
        } else {
          break;
        }
      }
      
      arr[j + 1] = key;
      this.visualizer.updateArray(arr);
    }
    
    // Highlight sorted range
    const rangeIndices = Array.from({length: right - left + 1}, (_, i) => left + i);
    this.visualizer.highlightBars(rangeIndices, 'sorted');
    await this.delay(200);
  }

  resetStats() {
    this.comparisons = 0;
    this.swaps = 0;
    this.updateStats();
  }

  updateStats() {
    document.getElementById('comparisons').textContent = `Comparisons: ${this.comparisons}`;
    document.getElementById('swaps').textContent = `Swaps: ${this.swaps}`;
  }

  stop() {
    this.isRunning = false;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Searching Algorithms
export class SearchingAlgorithms {
  constructor(visualizer) {
    this.visualizer = visualizer;
    this.comparisons = 0;
    this.isRunning = false;
    this.hashTable = new Map();
  }

  async linearSearch(arr, target) {
    this.resetStats();
    this.isRunning = true;
    
    for (let i = 0; i < arr.length && this.isRunning; i++) {
      this.comparisons++;
      this.updateStats();
      
      // Highlight current element being checked
      this.visualizer.highlightBars([i], 'comparing');
      await this.delay(600);
      
      if (arr[i] === target) {
        // Found the target
        this.visualizer.highlightBars([i], 'found');
        this.isRunning = false;
        return i;
      }
    }
    
    // Not found
    this.visualizer.clearHighlights();
    this.isRunning = false;
    return -1;
  }

  async binarySearch(arr, target) {
    this.resetStats();
    this.isRunning = true;
    
    // First check if array is sorted
    const sortedArr = [...arr].sort((a, b) => a - b);
    const isSorted = JSON.stringify(arr) === JSON.stringify(sortedArr);
    
    if (!isSorted) {
      alert('Array must be sorted for binary search. Please sort the array first.');
      this.isRunning = false;
      return -1;
    }
    
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right && this.isRunning) {
      const mid = Math.floor((left + right) / 2);
      this.comparisons++;
      this.updateStats();
      
      // Highlight search range
      const rangeIndices = Array.from({length: right - left + 1}, (_, i) => left + i);
      this.visualizer.highlightBars(rangeIndices, 'comparing');
      
      // Highlight middle element
      await this.delay(500);
      this.visualizer.highlightBars([mid], 'swapping');
      await this.delay(800);
      
      if (arr[mid] === target) {
        // Found the target
        this.visualizer.highlightBars([mid], 'found');
        this.isRunning = false;
        return mid;
      } else if (arr[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
      
      // Clear previous highlights before next iteration
      this.visualizer.clearHighlights();
      await this.delay(300);
    }
    
    // Not found
    this.visualizer.clearHighlights();
    this.isRunning = false;
    return -1;
  }

  async hashSearch(arr, target) {
    this.resetStats();
    this.isRunning = true;
    
    // Build hash table
    this.hashTable.clear();
    
    // Phase 1: Build hash table
    for (let i = 0; i < arr.length && this.isRunning; i++) {
      // Highlight current element being hashed
      this.visualizer.highlightBars([i], 'comparing');
      await this.delay(300);
      
      const value = arr[i];
      if (!this.hashTable.has(value)) {
        this.hashTable.set(value, []);
      }
      this.hashTable.get(value).push(i);
      
      // Show building process
      this.visualizer.highlightBars([i], 'swapping');
      await this.delay(200);
    }
    
    // Clear highlights after building
    this.visualizer.clearHighlights();
    await this.delay(500);
    
    // Phase 2: Search in hash table
    this.comparisons++;
    this.updateStats();
    
    // Simulate hash lookup with visual feedback
    if (this.hashTable.has(target)) {
      const indices = this.hashTable.get(target);
      
      // Highlight all occurrences
      for (let i = 0; i < indices.length && this.isRunning; i++) {
        this.visualizer.highlightBars([indices[i]], 'found');
        await this.delay(400);
      }
      
      this.isRunning = false;
      return indices[0]; // Return first occurrence
    } else {
      // Not found - show quick lookup
      await this.delay(300);
      this.visualizer.clearHighlights();
      this.isRunning = false;
      return -1;
    }
  }

  async interpolationSearch(arr, target) {
    this.resetStats();
    this.isRunning = true;
    
    // Check if array is sorted
    const sortedArr = [...arr].sort((a, b) => a - b);
    const isSorted = JSON.stringify(arr) === JSON.stringify(sortedArr);
    
    if (!isSorted) {
      alert('Array must be sorted for interpolation search. Please sort the array first.');
      this.isRunning = false;
      return -1;
    }
    
    let low = 0;
    let high = arr.length - 1;
    
    while (low <= high && target >= arr[low] && target <= arr[high] && this.isRunning) {
      // If array has only one element
      if (low === high) {
        this.comparisons++;
        this.updateStats();
        
        this.visualizer.highlightBars([low], 'comparing');
        await this.delay(600);
        
        if (arr[low] === target) {
          this.visualizer.highlightBars([low], 'found');
          this.isRunning = false;
          return low;
        }
        break;
      }
      
      // Calculate position using interpolation formula
      const pos = low + Math.floor(((target - arr[low]) / (arr[high] - arr[low])) * (high - low));
      
      this.comparisons++;
      this.updateStats();
      
      // Highlight search range
      const rangeIndices = Array.from({length: high - low + 1}, (_, i) => low + i);
      this.visualizer.highlightBars(rangeIndices, 'comparing');
      
      // Highlight interpolated position
      await this.delay(500);
      this.visualizer.highlightBars([pos], 'swapping');
      await this.delay(800);
      
      if (arr[pos] === target) {
        // Found the target
        this.visualizer.highlightBars([pos], 'found');
        this.isRunning = false;
        return pos;
      }
      
      if (arr[pos] < target) {
        low = pos + 1;
      } else {
        high = pos - 1;
      }
      
      // Clear previous highlights
      this.visualizer.clearHighlights();
      await this.delay(300);
    }
    
    // Not found
    this.visualizer.clearHighlights();
    this.isRunning = false;
    return -1;
  }

  resetStats() {
    this.comparisons = 0;
    this.updateStats();
  }

  updateStats() {
    document.getElementById('comparisons').textContent = `Comparisons: ${this.comparisons}`;
    document.getElementById('swaps').textContent = `Hash Operations: ${this.hashTable.size || 0}`;
  }

  stop() {
    this.isRunning = false;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
