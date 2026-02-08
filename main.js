// ========== Animal Face Test ==========
const URL = "https://teachablemachine.withgoogle.com/models/j-tRnOP9E/";

let model, webcam, labelContainer, maxPredictions;

async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    const flip = true;
    webcam = new tmImage.Webcam(240, 240, flip);
    await webcam.setup();
    await webcam.play();
    window.requestAnimationFrame(loop);

    document.getElementById("webcam-container").appendChild(webcam.canvas);
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) {
        labelContainer.appendChild(document.createElement("div"));
    }
}

async function loop() {
    webcam.update();
    await predict();
    window.requestAnimationFrame(loop);
}

async function predict() {
    const prediction = await model.predict(webcam.canvas);
    for (let i = 0; i < maxPredictions; i++) {
        const pct = (prediction[i].probability * 100).toFixed(1);
        const classPrediction = prediction[i].className + ": " + pct + "%";
        labelContainer.childNodes[i].innerHTML = classPrediction;
    }
}

// ========== Theme Switcher ==========
const themeSwitcher = document.getElementById('theme-switcher');
themeSwitcher.addEventListener('click', function() {
    const currentTheme = document.body.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        document.body.setAttribute('data-theme', 'light');
    } else {
        document.body.setAttribute('data-theme', 'dark');
    }
});

// ========== Tab Navigation ==========
var tabBtns = document.querySelectorAll('.tab-btn');
var tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
        var targetTab = btn.getAttribute('data-tab');

        tabBtns.forEach(function(b) { b.classList.remove('active'); });
        tabContents.forEach(function(c) { c.classList.remove('active'); });

        btn.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// ========== Lunch Menu Recommendation ==========
var menuData = {
    korean: [
        { name: "김치찌개", emoji: "🍲", desc: "얼큰한 김치와 돼지고기의 완벽한 조화" },
        { name: "된장찌개", emoji: "🥘", desc: "구수한 된장에 두부와 야채가 가득" },
        { name: "비빔밥", emoji: "🍚", desc: "알록달록 신선한 나물과 고추장의 하모니" },
        { name: "불고기", emoji: "🥩", desc: "달콤 짭조름한 양념의 부드러운 소고기" },
        { name: "삼겹살", emoji: "🥓", desc: "두툼한 삼겹살을 쌈채소에 싸서" },
        { name: "제육볶음", emoji: "🌶️", desc: "매콤달콤한 돼지고기 볶음" },
        { name: "순두부찌개", emoji: "🫕", desc: "부들부들 순두부에 달걀 톡!" },
        { name: "칼국수", emoji: "🍜", desc: "쫄깃한 면발과 시원한 국물" },
        { name: "떡볶이", emoji: "🧆", desc: "쫄깃한 떡에 매콤한 고추장 소스" },
        { name: "김밥", emoji: "🍙", desc: "한 줄이면 든든한 국민 간식" }
    ],
    chinese: [
        { name: "짜장면", emoji: "🍝", desc: "달콤한 춘장 소스에 면을 쓱쓱" },
        { name: "짬뽕", emoji: "🍜", desc: "얼큰한 해물 국물이 일품" },
        { name: "탕수육", emoji: "🍖", desc: "바삭한 튀김옷에 새콤달콤 소스" },
        { name: "마파두부", emoji: "🥘", desc: "얼얼한 두반장 소스의 두부 요리" },
        { name: "볶음밥", emoji: "🍳", desc: "웍에서 불맛 가득 볶아낸 밥" },
        { name: "깐풍기", emoji: "🍗", desc: "매콤 바삭한 닭고기 튀김" },
        { name: "양장피", emoji: "🥗", desc: "해파리와 야채의 시원한 냉채" }
    ],
    japanese: [
        { name: "초밥", emoji: "🍣", desc: "신선한 생선과 촉촉한 밥의 만남" },
        { name: "라멘", emoji: "🍜", desc: "진한 돈코츠 육수에 탱글 면발" },
        { name: "돈카츠", emoji: "🥩", desc: "두툼한 등심을 바삭하게 튀겨서" },
        { name: "우동", emoji: "🍲", desc: "쫄깃한 면발에 따뜻한 다시 국물" },
        { name: "카레라이스", emoji: "🍛", desc: "걸쭉한 일본식 카레와 밥" },
        { name: "오니기리", emoji: "🍙", desc: "김으로 감싼 삼각 주먹밥" },
        { name: "규동", emoji: "🥘", desc: "달콤한 간장 소스의 소고기 덮밥" }
    ],
    western: [
        { name: "파스타", emoji: "🍝", desc: "알덴테로 삶은 면에 풍부한 소스" },
        { name: "피자", emoji: "🍕", desc: "치즈가 쭉쭉 늘어나는 한 조각" },
        { name: "햄버거", emoji: "🍔", desc: "육즙 가득 패티와 신선한 채소" },
        { name: "스테이크", emoji: "🥩", desc: "미디엄 레어로 구운 완벽한 고기" },
        { name: "리조또", emoji: "🍚", desc: "크리미한 치즈 리조또" },
        { name: "샌드위치", emoji: "🥪", desc: "바삭한 빵 사이 신선한 재료" },
        { name: "오믈렛", emoji: "🥚", desc: "부드러운 달걀에 치즈가 가득" }
    ],
    snack: [
        { name: "라면", emoji: "🍜", desc: "보글보글 끓인 국민 야식" },
        { name: "치킨", emoji: "🍗", desc: "바삭 촉촉 최고의 한국 치킨" },
        { name: "족발", emoji: "🦶", desc: "쫀득한 콜라겐 가득 족발" },
        { name: "타코야끼", emoji: "🐙", desc: "동글동글 문어가 쏙쏙" },
        { name: "호떡", emoji: "🥞", desc: "따끈한 씨앗 소가 가득" },
        { name: "붕어빵", emoji: "🐟", desc: "팥앙금이 꽉 찬 겨울 간식" },
        { name: "핫도그", emoji: "🌭", desc: "바삭한 반죽에 소세지를 감싸서" }
    ],
    healthy: [
        { name: "샐러드", emoji: "🥗", desc: "신선한 채소와 가벼운 드레싱" },
        { name: "포케", emoji: "🐟", desc: "신선한 회와 아보카도 볼" },
        { name: "닭가슴살", emoji: "🍗", desc: "단백질 폭탄 다이어트 식단" },
        { name: "잡곡밥 정식", emoji: "🍚", desc: "균형 잡힌 한식 건강 정식" },
        { name: "두부 스테이크", emoji: "🧈", desc: "고소한 두부를 스테이크처럼" },
        { name: "월남쌈", emoji: "🥬", desc: "라이스페이퍼에 신선한 채소 가득" },
        { name: "아사이볼", emoji: "🫐", desc: "슈퍼푸드 아사이와 과일 토핑" }
    ]
};

var lastCategory = null;
var lastMenuIndex = -1;

function selectCategory(category) {
    // Highlight selected category button
    document.querySelectorAll('.category-btn').forEach(function(btn) {
        btn.classList.remove('selected');
    });
    document.querySelector('[data-category="' + category + '"]').classList.add('selected');

    lastCategory = category;
    showRandomMenu(category);
}

function spinRandom() {
    // Remove category selection highlight
    document.querySelectorAll('.category-btn').forEach(function(btn) {
        btn.classList.remove('selected');
    });

    var categories = Object.keys(menuData);
    var randomCategory = categories[Math.floor(Math.random() * categories.length)];
    lastCategory = randomCategory;
    showRandomMenu(randomCategory);
}

function showRandomMenu(category) {
    var items = menuData[category];
    var index;
    do {
        index = Math.floor(Math.random() * items.length);
    } while (index === lastMenuIndex && items.length > 1);
    lastMenuIndex = index;

    var item = items[index];

    var resultEl = document.getElementById('menu-result');
    resultEl.classList.remove('hidden');
    resultEl.classList.add('spinning');

    document.getElementById('result-emoji').textContent = item.emoji;
    document.getElementById('result-menu').textContent = item.name;
    document.getElementById('result-desc').textContent = item.desc;

    // Re-trigger animation
    var resultCard = resultEl.querySelector('.result-card');
    resultCard.style.animation = 'none';
    resultCard.offsetHeight; // trigger reflow
    resultCard.style.animation = '';

    setTimeout(function() {
        resultEl.classList.remove('spinning');
    }, 800);
}

function reroll() {
    if (lastCategory) {
        showRandomMenu(lastCategory);
    } else {
        spinRandom();
    }
}
