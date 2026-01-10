class LottoGenerator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .lotto-card {
          background-color: var(--white-color, #fff);
          border-radius: 20px;
          padding: 2.5rem;
          box-shadow: 0 15px 35px var(--shadow-color, rgba(0, 0, 0, 0.1));
          text-align: center;
          max-width: 450px;
          margin: 0 auto;
          transition: transform 0.3s ease, background-color 0.3s;
          border: 1px solid rgba(255, 255, 255, 0.5);
        }
        .lotto-card:hover {
          transform: translateY(-5px);
        }
        h1 {
            color: var(--primary-color, #5e72e4);
            text-align: center;
            font-size: 2.8rem;
            margin-bottom: 1em;
            text-shadow: 1px 1px 2px var(--shadow-color, rgba(0,0,0,0.1));
            font-weight: 700;
        }
        .numbers {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin: 2.5rem 0;
        }
        .number {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 55px;
          height: 55px;
          border-radius: 50%;
          color: #fff;
          font-size: 1.6rem;
          font-weight: bold;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          animation: popIn 0.5s ease-out forwards;
          opacity: 0;
        }
        button {
          background-image: linear-gradient(to right, var(--primary-color, #5e72e4) 0%, var(--secondary-color, #f5365c) 100%);
          color: var(--white-color, #fff);
          border: none;
          border-radius: 30px;
          font-size: 1.3rem;
          padding: 1rem 2.5rem;
          cursor: pointer;
          transition: all 0.4s ease;
          box-shadow: 0 8px 25px rgba(94, 114, 228, 0.4);
          font-weight: 600;
        }
        button:hover {
          box-shadow: 0 10px 30px rgba(245, 54, 92, 0.6);
          transform: translateY(-3px);
        }
        button:active {
            transform: translateY(1px);
            box-shadow: 0 4px 15px rgba(94, 114, 228, 0.3);
        }
      </style>
      <div class="lotto-card">
        <h1>Lotto Number Generator</h1>
        <div class="numbers"></div>
        <button>Generate Numbers</button>
      </div>
    `;

    this.numbersContainer = this.shadowRoot.querySelector('.numbers');
    this.generateButton = this.shadowRoot.querySelector('button');
    this.generateButton.addEventListener('click', () => this.generateNumbers());
    this.generateNumbers();
  }

  generateNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
      numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    this.displayNumbers(Array.from(numbers).sort((a, b) => a - b));
  }

  getBackgroundColor(number) {
    if (number <= 10) return '#f5c84c'; // yellow
    if (number <= 20) return '#4caf50'; // green
    if (number <= 30) return '#f44336'; // red
    if (number <= 40) return '#2196f3'; // blue
    return '#9c27b0'; // purple
  }

  displayNumbers(numbers) {
    this.numbersContainer.innerHTML = '';
    numbers.forEach((number, index) => {
      const numberElement = document.createElement('div');
      numberElement.className = 'number';
      numberElement.textContent = number;
      numberElement.style.backgroundColor = this.getBackgroundColor(number);
      numberElement.style.animationDelay = `${index * 0.1}s`;
      this.numbersContainer.appendChild(numberElement);
    });
  }
}

customElements.define('lotto-generator', LottoGenerator);

const themeSwitcher = document.getElementById('theme-switcher');
themeSwitcher.addEventListener('click', () => {
  const currentTheme = document.body.getAttribute('data-theme');
  if (currentTheme === 'dark') {
    document.body.setAttribute('data-theme', 'light');
  } else {
    document.body.setAttribute('data-theme', 'dark');
  }
});