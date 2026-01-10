class LunchRecommender extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.menus = [
      { name: 'Kimchi Jjigae', image: 'https://source.unsplash.com/random/800x600?kimchi,jjigae' },
      { name: 'Bibimbap', image: 'https://source.unsplash.com/random/800x600?bibimbap' },
      { name: 'Bulgogi', image: 'https://source.unsplash.com/random/800x600?bulgogi' },
      { name: 'Japchae', image: 'https://source.unsplash.com/random/800x600?japchae' },
      { name: 'Tteokbokki', image: 'https://source.unsplash.com/random/800x600?tteokbokki' },
      { name: 'Kimbap', image: 'https://source.unsplash.com/random/800x600?kimbap' },
    ];
    this.shadowRoot.innerHTML = `
      <style>
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .recommender-card {
          background-color: var(--white-color, #fff);
          border-radius: 20px;
          padding: 2.5rem;
          box-shadow: 0 15px 35px var(--shadow-color, rgba(0, 0, 0, 0.1));
          text-align: center;
          max-width: 400px;
          margin: 0 auto;
          transition: transform 0.3s ease, background-color 0.3s;
        }
        .recommender-card:hover {
          transform: translateY(-5px);
        }
        h1 {
          color: var(--primary-color, #ff6b6b);
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        .menu-display {
          margin: 2rem 0;
        }
        .menu-image {
          width: 100%;
          height: 250px;
          object-fit: cover;
          border-radius: 15px;
          box-shadow: 0 8px 20px var(--shadow-color, rgba(0,0,0,0.15));
          animation: fadeIn 0.8s ease-out;
        }
        .menu-name {
          font-size: 2rem;
          font-weight: bold;
          margin-top: 1.5rem;
          color: var(--text-color, #3d405b);
          animation: fadeIn 0.8s ease-out 0.2s;
        }
        button {
          background-image: linear-gradient(to right, var(--primary-color, #ff6b6b) 0%, var(--secondary-color, #feca57) 100%);
          color: var(--white-color, #fff);
          border: none;
          border-radius: 30px;
          font-size: 1.3rem;
          padding: 1rem 2.5rem;
          cursor: pointer;
          transition: all 0.4s ease;
          box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
          font-weight: 600;
        }
        button:hover {
          box-shadow: 0 10px 30px rgba(254, 202, 87, 0.6);
          transform: translateY(-3px);
        }
        button:active {
            transform: translateY(1px);
            box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
        }
      </style>
      <div class="recommender-card">
        <h1>Today's Lunch</h1>
        <div class="menu-display">
          <img class="menu-image" src="" alt="Recommended Menu">
          <p class="menu-name"></p>
        </div>
        <button>Get Recommendation</button>
      </div>
    `;

    this.imageElement = this.shadowRoot.querySelector('.menu-image');
    this.nameElement = this.shadowRoot.querySelector('.menu-name');
    this.generateButton = this.shadowRoot.querySelector('button');

    this.generateButton.addEventListener('click', () => this.recommendMenu());
    this.recommendMenu();
  }

  recommendMenu() {
    const randomIndex = Math.floor(Math.random() * this.menus.length);
    const { name, image } = this.menus[randomIndex];
    this.imageElement.src = image;
    this.imageElement.alt = name;
    this.nameElement.textContent = name;
  }
}

customElements.define('lunch-recommender', LunchRecommender);

const themeSwitcher = document.getElementById('theme-switcher');
themeSwitcher.addEventListener('click', () => {
  const currentTheme = document.body.getAttribute('data-theme');
  if (currentTheme === 'dark') {
    document.body.setAttribute('data-theme', 'light');
  } else {
    document.body.setAttribute('data-theme', 'dark');
  }
});