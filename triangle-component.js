import {
  TRIANGLE_HEIGHT,
  constrainToTriangle,
  calculateHeightB,
  calculateHeightA,
} from './triangleUtils.js';

class InteractiveTriangle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
    this.initializeElements();
    // Test case
    this.updateDotAndCoordinates(0.5, TRIANGLE_HEIGHT);
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 300px;
          height: 260px;
        }
        .triangle-container {
          width: 100%;
          height: 100%;
          position: relative;
          cursor: none;
        }
        .triangle {
          width: 100%;
          height: 100%;
        }
        #dot {
          position: absolute;
          width: 10px;
          height: 10px;
          background-color: red;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }
        #coordinates {
          margin-top: 20px;
          padding: 10px;
          background-color: white;
          border: 1px solid #ccc;
        }
      </style>
      <div class="triangle-container" id="triangle-container">
        <svg class="triangle" viewBox="0 0 1 0.866" id="triangle-svg">
          <polygon
            points="0,0.866 0.5,0 1,0.866"
            fill="#e0e0e0"
            stroke="#333"
            stroke-width="0.005"
          />
          <text x="0.5" y="0.05" font-size="0.05" text-anchor="middle">1,0</text>
          <text x="0.05" y="0.85" font-size="0.05" text-anchor="start">0,0</text>
          <text x="0.95" y="0.85" font-size="0.05" text-anchor="end">0,1</text>
          <line id="bottom-height-line" x1="0" y1="0" x2="0" y2="0" stroke="blue" stroke-width="0.005" stroke-dasharray="0.01" />
          <text id="bottom-height-label" x="0" y="0" font-size="0.04" text-anchor="start" fill="blue"></text>
          <line id="height-b" x1="0" y1="0" x2="0" y2="0" stroke="red" stroke-width="0.005" stroke-dasharray="0.01" />
          <text id="height-b-label" x="0" y="0" font-size="0.04" text-anchor="start" fill="red"></text>
          <line id="height-a" x1="0" y1="0" x2="0" y2="0" stroke="#9333ea" stroke-width="0.005" stroke-dasharray="0.01" />
          <text id="height-a-label" x="0" y="0" font-size="0.04" text-anchor="start" fill="#9333ea"></text>
        </svg>
        <div id="dot"></div>
      </div>
      <div id="coordinates">0.33, 0.33, 0.33</div>
    `;
  }

  setupEventListeners() {
    const container = this.shadowRoot.getElementById('triangle-container');
    container.addEventListener('mousemove', this.handleMouseMove.bind(this));
  }

  initializeElements() {
    this.container = this.shadowRoot.getElementById('triangle-container');
    this.dot = this.shadowRoot.getElementById('dot');
    this.coordinatesDisplay = this.shadowRoot.getElementById('coordinates');
    this.bottomHeightLine =
      this.shadowRoot.getElementById('bottom-height-line');
    this.bottomHeightLabel = this.shadowRoot.getElementById(
      'bottom-height-label'
    );
    this.heightB = this.shadowRoot.getElementById('height-b');
    this.heightBLabel = this.shadowRoot.getElementById('height-b-label');
    this.heightA = this.shadowRoot.getElementById('height-a');
    this.heightALabel = this.shadowRoot.getElementById('height-a-label');
  }

  updateHeightLines(x, y) {
    console.log('Updating height lines:', x, y);

    // Update bottom height line
    this.bottomHeightLine.setAttribute('x1', x);
    this.bottomHeightLine.setAttribute('y1', TRIANGLE_HEIGHT - y);
    this.bottomHeightLine.setAttribute('x2', x);
    this.bottomHeightLine.setAttribute('y2', TRIANGLE_HEIGHT);

    // Calculate the height of the bottom line
    const bottomHeight = y;

    // Update the bottom height label position and text
    this.bottomHeightLabel.setAttribute('x', x + 0.01);
    this.bottomHeightLabel.setAttribute('y', TRIANGLE_HEIGHT - 0.02);
    this.bottomHeightLabel.textContent = bottomHeight.toFixed(2);

    // Height to side B (right side)
    const {
      intersectBx,
      intersectBy,
      length: heightBLength,
    } = calculateHeightB(x, y);
    this.heightB.setAttribute('x1', x);
    this.heightB.setAttribute('y1', TRIANGLE_HEIGHT - y);
    this.heightB.setAttribute('x2', intersectBx);
    this.heightB.setAttribute('y2', intersectBy);

    // Update height B label
    this.heightBLabel.setAttribute('x', intersectBx + 0.01);
    this.heightBLabel.setAttribute('y', intersectBy);
    this.heightBLabel.textContent = heightBLength.toFixed(2);

    // Height to side A (left side)
    const {
      intersectAx,
      intersectAy,
      length: heightALength,
    } = calculateHeightA(x, y);
    this.heightA.setAttribute('x1', x);
    this.heightA.setAttribute('y1', TRIANGLE_HEIGHT - y);
    this.heightA.setAttribute('x2', intersectAx);
    this.heightA.setAttribute('y2', intersectAy);

    // Update height A label
    this.heightALabel.setAttribute('x', intersectAx - 0.1);
    this.heightALabel.setAttribute('y', intersectAy);
    this.heightALabel.textContent = heightALength.toFixed(2);

    console.log('Bottom height line:', this.bottomHeightLine.outerHTML);
    console.log('Height B line:', this.heightB.outerHTML);
    console.log('Height A line:', this.heightA.outerHTML);
    return {
      bottomHeight,
      heightBLength,
      heightALength,
    };
  }

  updateDotAndCoordinates(x, y) {
    console.log('Input coordinates:', x, y);
    [x, y] = constrainToTriangle(x, y);
    console.log('Constrained coordinates:', x, y);

    const containerRect = this.container.getBoundingClientRect();
    console.log(
      'Container dimensions:',
      containerRect.width,
      containerRect.height
    );

    // Calculate the actual triangle height
    const trianglePixelHeight = (containerRect.width * Math.sqrt(3)) / 2;

    // Calculate dot position based on triangle geometry
    const dotX = x * containerRect.width;
    const dotY =
      containerRect.height - (y / TRIANGLE_HEIGHT) * trianglePixelHeight;

    console.log('Dot position:', dotX, dotY);

    this.dot.style.left = `${dotX}px`;
    this.dot.style.top = `${dotY}px`;
    const { bottomHeight, heightBLength, heightALength } =
      this.updateHeightLines(x, y);

    this.coordinatesDisplay.textContent = `${heightALength.toFixed(
      2
    )}, ${bottomHeight.toFixed(2)},${heightBLength.toFixed(2)}`;
  }

  handleMouseMove(e) {
    const rect = this.container.getBoundingClientRect();
    let x = (e.clientX - rect.left) / rect.width;
    let y = 1 - (e.clientY - rect.top) / rect.height;
    console.log('Mouse event coordinates:', x, y);

    this.updateDotAndCoordinates(x, y);
  }
}

customElements.define('interactive-triangle', InteractiveTriangle);
