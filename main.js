import { ArrayVisualizer } from './visualizer.js';
import { SortingAlgorithms, SearchingAlgorithms } from './algorithms.js';

class AlgorithmVisualizerApp {
  constructor() {
    this.visualizer = new ArrayVisualizer(document.getElementById('array-container'));
    this.sorter = new SortingAlgorithms(this.visualizer);
    this.searcher = new SearchingAlgorithms(this.visualizer);
    this.currentArray = [];
    this.isAnimating = false;
    
    this.algorithmInfo = {
      // Sorting algorithms
      bubble: {
        name: 'Bubble Sort',
        description: 'A simple comparison-based algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)'
      },
      insertion: {
        name: 'Insertion Sort',
        description: 'Builds the final sorted array one item at a time. It is efficient for small data sets and adaptive for nearly sorted data.',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)'
      },
      selection: {
        name: 'Selection Sort',
        description: 'Divides the input list into sorted and unsorted regions, repeatedly selecting the smallest element from the unsorted region.',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)'
      },
      merge: {
        name: 'Merge Sort',
        description: 'A divide-and-conquer algorithm that divides the array into halves, sorts them separately, and then merges them back together.',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(n)'
      },
      quick: {
        name: 'Quick Sort',
        description: 'A divide-and-conquer algorithm that picks a pivot element and partitions the array around it, then recursively sorts the sub-arrays.',
        timeComplexity: 'O(n log n) avg, O(n²) worst',
        spaceComplexity: 'O(log n)'
      },
      tim: {
        name: 'Tim Sort',
        description: 'A hybrid stable sorting algorithm derived from merge sort and insertion sort. It is the algorithm used by Python\'s built-in sort.',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(n)'
      },
      // Searching algorithms
      linear: {
        name: 'Linear Search',
        description: 'A simple search algorithm that checks every element in the list sequentially until the target element is found.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)'
      },
      binary: {
        name: 'Binary Search',
        description: 'An efficient search algorithm that works on sorted arrays by repeatedly dividing the search interval in half.',
        timeComplexity: 'O(log n)',
        spaceComplexity: 'O(1)'
      },
      hash: {
        name: 'Hash Search',
        description: 'Uses a hash table to store key-value pairs, providing very fast average-case search times through direct indexing.',
        timeComplexity: 'O(1) avg, O(n) worst',
        spaceComplexity: 'O(n)'
      },
      interpolation: {
        name: 'Interpolation Search',
        description: 'An improved variant of binary search for uniformly distributed sorted arrays, using interpolation to guess the position.',
        timeComplexity: 'O(log log n) avg, O(n) worst',
        spaceComplexity: 'O(1)'
      }
    };
    
    this.initializeElements();
    this.bindEvents();
    this.loadInitialArray();
    this.updateAlgorithmInfo();
  }

  initializeElements() {
    this.elements = {
      arrayInput: document.getElementById('array-input'),
      generateBtn: document.getElementById('generate-random'),
      sortAlgorithm: document.getElementById('sort-algorithm'),
      sortBtn: document.getElementById('sort-btn'),
      searchInput: document.getElementById('search-input'),
      searchAlgorithm: document.getElementById('search-algorithm'),
      searchBtn: document.getElementById('search-btn'),
      resetBtn: document.getElementById('reset-btn'),
      stopBtn: document.getElementById('stop-btn'),
      algorithmTitle: document.getElementById('algorithm-title'),
      algorithmName: document.getElementById('algorithm-name'),
      algorithmDescription: document.getElementById('algorithm-description'),
      timeComplexity: document.getElementById('time-complexity'),
      spaceComplexity: document.getElementById('space-complexity')
    };
  }

  bindEvents() {
    this.elements.arrayInput.addEventListener('input', () => this.handleArrayInput());
    this.elements.generateBtn.addEventListener('click', () => this.generateRandomArray());
    this.elements.sortBtn.addEventListener('click', () => this.startSorting());
    this.elements.searchBtn.addEventListener('click', () => this.startSearching());
    this.elements.resetBtn.addEventListener('click', () => this.reset());
    this.elements.stopBtn.addEventListener('click', () => this.stopAnimation());
    
    // Update algorithm info when selection changes
    this.elements.sortAlgorithm.addEventListener('change', () => this.updateAlgorithmInfo());
    this.elements.searchAlgorithm.addEventListener('change', () => this.updateAlgorithmInfo());
    
    // Add enter key support for inputs
    this.elements.arrayInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.handleArrayInput();
    });
    
    this.elements.searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.startSearching();
    });
  }

  updateAlgorithmInfo() {
    // Determine which algorithm is currently selected
    const sortAlgorithm = this.elements.sortAlgorithm.value;
    const searchAlgorithm = this.elements.searchAlgorithm.value;
    
    // Default to sort algorithm, but if search input has focus, show search algorithm
    let currentAlgorithm = sortAlgorithm;
    if (document.activeElement === this.elements.searchInput || 
        document.activeElement === this.elements.searchAlgorithm) {
      currentAlgorithm = searchAlgorithm;
    }
    
    const info = this.algorithmInfo[currentAlgorithm];
    if (info) {
      this.elements.algorithmName.textContent = info.name;
      this.elements.algorithmDescription.textContent = info.description;
      this.elements.timeComplexity.textContent = info.timeComplexity;
      this.elements.spaceComplexity.textContent = info.spaceComplexity;
    }
  }

  loadInitialArray() {
    this.handleArrayInput();
  }

  handleArrayInput() {
    const input = this.elements.arrayInput.value.trim();
    
    if (!input) {
      this.currentArray = [];
      this.visualizer.setArray([]);
      return;
    }

    try {
      // Parse comma-separated values
      const values = input.split(',').map(val => {
        const num = parseInt(val.trim());
        if (isNaN(num)) {
          throw new Error(`Invalid number: ${val.trim()}`);
        }
        return num;
      });

      // Validate array size
      if (values.length > 50) {
        throw new Error('Array size should not exceed 50 elements');
      }

      if (values.length === 0) {
        throw new Error('Array cannot be empty');
      }

      this.currentArray = values;
      this.visualizer.setArray(this.currentArray);
      this.elements.arrayInput.classList.remove('input-error');
      
    } catch (error) {
      this.elements.arrayInput.classList.add('input-error');
      console.error('Array input error:', error.message);
      
      // Remove error class after animation
      setTimeout(() => {
        this.elements.arrayInput.classList.remove('input-error');
      }, 500);
    }
  }

  generateRandomArray() {
    const size = Math.floor(Math.random() * 20) + 5; // 5-24 elements
    const maxValue = 100;
    const randomArray = Array.from(
      { length: size }, 
      () => Math.floor(Math.random() * maxValue) + 1
    );
    
    this.elements.arrayInput.value = randomArray.join(', ');
    this.handleArrayInput();
  }

  async startSorting() {
    if (this.isAnimating || this.currentArray.length === 0) return;
    
    const algorithm = this.elements.sortAlgorithm.value;
    const info = this.algorithmInfo[algorithm];
    
    this.elements.algorithmTitle.textContent = info.name;
    this.updateAlgorithmInfo();
    
    // Make a copy of the array for sorting
    const arrayToSort = [...this.currentArray];
    
    this.setAnimationState(true);
    
    try {
      switch (algorithm) {
        case 'bubble':
          await this.sorter.bubbleSort(arrayToSort);
          break;
        case 'insertion':
          await this.sorter.insertionSort(arrayToSort);
          break;
        case 'selection':
          await this.sorter.selectionSort(arrayToSort);
          break;
        case 'merge':
          await this.sorter.mergeSort(arrayToSort);
          break;
        case 'quick':
          await this.sorter.quickSort(arrayToSort);
          break;
        case 'tim':
          await this.sorter.timSort(arrayToSort);
          break;
      }
      
      // Update the current array with sorted result
      this.currentArray = arrayToSort;
      this.elements.arrayInput.value = this.currentArray.join(', ');
      
    } catch (error) {
      console.error('Sorting error:', error);
    } finally {
      this.setAnimationState(false);
    }
  }

  async startSearching() {
    if (this.isAnimating || this.currentArray.length === 0) return;
    
    const searchValue = parseInt(this.elements.searchInput.value);
    if (isNaN(searchValue)) {
      this.elements.searchInput.classList.add('input-error');
      setTimeout(() => {
        this.elements.searchInput.classList.remove('input-error');
      }, 500);
      return;
    }
    
    const algorithm = this.elements.searchAlgorithm.value;
    const info = this.algorithmInfo[algorithm];
    
    this.elements.algorithmTitle.textContent = `${info.name} for ${searchValue}`;
    this.updateAlgorithmInfo();
    
    this.setAnimationState(true);
    
    try {
      let result;
      switch (algorithm) {
        case 'linear':
          result = await this.searcher.linearSearch(this.currentArray, searchValue);
          break;
        case 'binary':
          result = await this.searcher.binarySearch(this.currentArray, searchValue);
          break;
        case 'hash':
          result = await this.searcher.hashSearch(this.currentArray, searchValue);
          break;
        case 'interpolation':
          result = await this.searcher.interpolationSearch(this.currentArray, searchValue);
          break;
      }
      
      // Show result
      setTimeout(() => {
        if (result !== -1) {
          this.showMessage(`Found ${searchValue} at index ${result}`, 'success');
        } else {
          this.showMessage(`${searchValue} not found in the array`, 'error');
        }
      }, 500);
      
    } catch (error) {
      console.error('Searching error:', error);
    } finally {
      this.setAnimationState(false);
    }
  }

  reset() {
    this.stopAnimation();
    this.visualizer.reset();
    this.elements.algorithmTitle.textContent = 'Array Visualization';
    this.sorter.resetStats();
    this.clearMessages();
    this.updateAlgorithmInfo();
  }

  stopAnimation() {
    this.sorter.stop();
    this.searcher.stop();
    this.setAnimationState(false);
    this.visualizer.clearHighlights();
  }

  setAnimationState(isAnimating) {
    this.isAnimating = isAnimating;
    
    // Disable/enable controls
    const controls = [
      this.elements.arrayInput,
      this.elements.generateBtn,
      this.elements.sortBtn,
      this.elements.searchBtn,
      this.elements.resetBtn,
      this.elements.sortAlgorithm,
      this.elements.searchAlgorithm,
      this.elements.searchInput
    ];
    
    controls.forEach(control => {
      control.disabled = isAnimating;
    });
    
    this.elements.stopBtn.disabled = !isAnimating;
    
    // Add visual feedback
    if (isAnimating) {
      document.body.classList.add('loading');
    } else {
      document.body.classList.remove('loading');
    }
  }

  showMessage(text, type = 'info') {
    this.clearMessages();
    
    const message = document.createElement('div');
    message.className = `message ${type}-message`;
    message.textContent = text;
    
    const container = document.querySelector('.visualization-section');
    container.insertBefore(message, container.firstChild);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
      if (message.parentNode) {
        message.parentNode.removeChild(message);
      }
    }, 3000);
  }

  clearMessages() {
    const messages = document.querySelectorAll('.message');
    messages.forEach(message => {
      if (message.parentNode) {
        message.parentNode.removeChild(message);
      }
    });
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new AlgorithmVisualizerApp();
});