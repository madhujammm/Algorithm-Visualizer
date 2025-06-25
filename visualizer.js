export class ArrayVisualizer {
  constructor(container) {
    this.container = container;
    this.array = [];
    this.bars = [];
  }

  setArray(arr) {
    this.array = [...arr];
    this.render();
  }

  updateArray(arr) {
    this.array = [...arr];
    this.updateBars();
  }

  render() {
    this.container.innerHTML = '';
    this.bars = [];
    
    if (this.array.length === 0) {
      this.container.innerHTML = '<div style="color: #cbd5e1; font-size: 1.2rem;">Enter an array to visualize</div>';
      return;
    }

    const maxValue = Math.max(...this.array);
    const minValue = Math.min(...this.array);
    const range = maxValue - minValue || 1;
    
    this.array.forEach((value, index) => {
      const bar = document.createElement('div');
      bar.className = 'array-bar';
      
      // Calculate height (minimum 30px, maximum 280px)
      const height = Math.max(30, (value - minValue) / range * 250 + 30);
      bar.style.height = `${height}px`;
      
      // Add value label
      const label = document.createElement('span');
      label.textContent = value;
      bar.appendChild(label);
      
      this.container.appendChild(bar);
      this.bars.push(bar);
    });
  }

  updateBars() {
    if (this.bars.length !== this.array.length) {
      this.render();
      return;
    }

    const maxValue = Math.max(...this.array);
    const minValue = Math.min(...this.array);
    const range = maxValue - minValue || 1;
    
    this.array.forEach((value, index) => {
      const bar = this.bars[index];
      const height = Math.max(30, (value - minValue) / range * 250 + 30);
      
      bar.style.height = `${height}px`;
      bar.querySelector('span').textContent = value;
    });
  }

  highlightBars(indices, className) {
    this.clearHighlights();
    
    indices.forEach(index => {
      if (index >= 0 && index < this.bars.length) {
        this.bars[index].classList.add(className);
      }
    });
  }

  clearHighlights() {
    this.bars.forEach(bar => {
      bar.classList.remove('comparing', 'swapping', 'sorted', 'found');
    });
  }

  reset() {
    this.clearHighlights();
    this.render();
  }
}