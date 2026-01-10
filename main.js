class AnimalClassifier extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .classifier-card {
          background-color: var(--white-color, #fff);
          border-radius: 20px;
          padding: 2.5rem;
          box-shadow: 0 15px 35px var(--shadow-color, rgba(0, 0, 0, 0.1));
          text-align: center;
          max-width: 500px;
          margin: 0 auto;
          transition: transform 0.3s ease, background-color 0.3s;
        }
        h1 {
          color: var(--primary-color, #3f51b5);
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        #webcam-container {
          margin: 2rem auto;
          width: 200px;
          height: 200px;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 8px 20px var(--shadow-color, rgba(0,0,0,0.15));
        }
        #label-container {
          margin-top: 1.5rem;
          font-size: 1.5rem;
          font-weight: bold;
        }
        button {
          background-image: linear-gradient(to right, var(--primary-color, #3f51b5) 0%, var(--secondary-color, #ff4081) 100%);
          color: #fff;
          border: none;
          border-radius: 30px;
          font-size: 1.3rem;
          padding: 1rem 2.5rem;
          cursor: pointer;
          transition: all 0.4s ease;
          box-shadow: 0 8px 25px rgba(63, 81, 181, 0.4);
          font-weight: 600;
          margin-top: 1rem;
        }
        button:hover {
          box-shadow: 0 10px 30px rgba(255, 64, 129, 0.6);
          transform: translateY(-3px);
        }
        .error-message {
          color: var(--secondary-color, #ff4081);
          margin-top: 1rem;
        }
      </style>
      <div class="classifier-card">
        <h1>Animal Face Test</h1>
        <div id="webcam-container"></div>
        <div id="label-container"></div>
        <button id="start-button">Start</button>
        <div id="error-message" class="error-message"></div>
      </div>
    `;

    this.startButton = this.shadowRoot.getElementById('start-button');
    this.webcamContainer = this.shadowRoot.getElementById('webcam-container');
    this.labelContainer = this.shadowRoot.getElementById('label-container');
    this.errorMessage = this.shadowRoot.getElementById('error-message');
    this.startButton.addEventListener('click', () => this.init());
  }

  async init() {
    this.startButton.style.display = 'none';
    const URL = './my_model/';
    const modelURL = URL + 'model.json';
    const metadataURL = URL + 'metadata.json';

    let model, webcam, maxPredictions;

    try {
      model = await tmImage.load(modelURL, metadataURL);
      maxPredictions = model.getTotalClasses();

      const flip = true;
      webcam = new tmImage.Webcam(200, 200, flip);
      await webcam.setup();
      await webcam.play();
      window.requestAnimationFrame(loop);

      this.webcamContainer.appendChild(webcam.canvas);
      this.labelContainer.innerHTML = '';
      for (let i = 0; i < maxPredictions; i++) {
        this.labelContainer.appendChild(document.createElement('div'));
      }
    } catch (e) {
      console.error(e);
      this.errorMessage.textContent = 'Could not load model. Please make sure the model files are in the /my_model directory.';
      this.startButton.style.display = 'block';
      return;
    }

    async function loop() {
      webcam.update();
      await predict();
      window.requestAnimationFrame(loop);
    }

    async function predict() {
      const prediction = await model.predict(webcam.canvas);
      for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
          prediction[i].className + ': ' + prediction[i].probability.toFixed(2);
        this.labelContainer.childNodes[i].innerHTML = classPrediction;
      }
    }
    // Re-bind `this` for the predict function to have access to the component's `labelContainer`
    predict = predict.bind(this);
  }
}

customElements.define('animal-classifier', AnimalClassifier);

const themeSwitcher = document.getElementById('theme-switcher');
themeSwitcher.addEventListener('click', () => {
  const currentTheme = document.body.getAttribute('data-theme');
  if (currentTheme === 'dark') {
    document.body.setAttribute('data-theme', 'light');
  } else {
    document.body.setAttribute('data-theme', 'dark');
  }
});