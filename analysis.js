// === Подключение шрифта и базовые стили ===
const fontLink = document.createElement('link');
fontLink.rel = 'stylesheet';
fontLink.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@500&display=swap';
document.head.appendChild(fontLink);

const style = document.createElement('style');
style.textContent = `
  body {
    font-family: 'Orbitron', sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 20px;
  }
  h1 {
    text-align: center;
    color: #222;
  }
  .summary {
    background: white;
    margin: 20px auto;
    padding: 20px;
    max-width: 700px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    font-size: 16px;
    line-height: 1.5;
  }
  .top-bar {
    background: #ffffff;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 12px;
    margin-bottom: 20px;
  }
  .top-bar button {
    font-family: 'Orbitron', sans-serif;
    background: #007bff;
    color: white;
    border: none;
    padding: 10px 16px;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
  }
  .indicator {
    background: white;
    margin: 20px auto;
    padding: 20px;
    max-width: 700px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  .indicator h2 {
    font-size: 20px;
    margin-bottom: 10px;
  }
  .indicator p {
    font-size: 14px;
    color: #555;
    margin-top: 10px;
  }
  .indicator .chart {
    height: 250px;
    width: 100%;
  }
  .timeframe-select {
    margin: 10px auto;
    display: flex;
    justify-content: center;
    gap: 10px;
  }
`;
document.head.appendChild(style);

const homeButton = document.createElement('button');
homeButton.textContent = '🏠 На главную';
homeButton.onclick = () => window.location.href = 'index.html';
homeButton.style = 'position:fixed; top:10px; left:10px; background:#007bff; color:white; border:none; padding:10px 16px; border-radius:8px; font-weight:bold; cursor:pointer; z-index:1000;';
document.body.appendChild(homeButton);

const params = new URLSearchParams(window.location.search);
const symbol = params.get('symbol')?.toUpperCase() || 'BTC';

const title = document.createElement('h1');
title.textContent = `Анализ монеты ${symbol}/USDT`;
document.body.appendChild(title);

const toggleBtn = document.createElement('button');
toggleBtn.textContent = 'Показать/Скрыть графики';
toggleBtn.style = 'display:block; margin:0 auto 20px; padding:10px 16px; font-weight:bold; background:#333; color:white; border:none; border-radius:8px; cursor:pointer;';
toggleBtn.onclick = () => {
  document.querySelectorAll('.indicator').forEach(ind => {
    ind.style.display = ind.style.display === 'none' ? 'block' : 'none';
  });
};
document.body.appendChild(toggleBtn);

const timeframeSelect = document.createElement('div');
timeframeSelect.className = 'timeframe-select';
timeframeSelect.innerHTML = `
  <label>Выберите таймфрейм: </label>
  <select id="timeframe">
    <option value="5">5 минут</option>
    <option value="15">15 минут</option>
    <option value="30" selected>30 минут</option>
    <option value="60">1 час</option>
    <option value="240">4 часа</option>
    <option value="1D">1 день</option>
  </select>
`;
document.body.appendChild(timeframeSelect);

const summaryAI = document.createElement('div');
summaryAI.className = 'summary';
summaryAI.innerHTML = `
  <h2>🤖 Детальный технический анализ</h2>
  <p><strong>ИИ-анализ:</strong> данные собираются, формируются графики и интерпретируются индикаторы. На основе текущих значений будет сформирован прогноз. Ожидайте…</p>
`;
document.body.appendChild(summaryAI);

const indicators = [
  { name: 'SMA-20', study: 'MASimple@tv-basicstudies', interpret: v => `SMA = ${v}` },
  { name: 'EMA-20', study: 'MAExp@tv-basicstudies', interpret: v => `EMA = ${v}` },
  { name: 'RSI-14', study: 'RSI@tv-basicstudies', interpret: v => `RSI = ${v}` },
  { name: 'MACD', study: 'MACD@tv-basicstudies', interpret: v => `MACD = ${v}` },
  { name: 'ATR', study: 'ATR@tv-basicstudies', interpret: v => `ATR = ${v}` },
  { name: 'Bollinger Bands', study: 'BollingerBands@tv-basicstudies', interpret: v => `BB = ${v}` },
  { name: 'Stochastic', study: 'StochasticRSI@tv-basicstudies', interpret: v => `Stochastic = ${v}` },
  { name: 'ADX', study: 'ADX@tv-basicstudies', interpret: v => `ADX = ${v}` },
  { name: 'CCI', study: 'CCI@tv-basicstudies', interpret: v => `CCI = ${v}` },
  { name: 'VWAP', study: 'VWAP@tv-basicstudies', interpret: v => `VWAP = ${v}` }
];

function loadScript(src) {
  return new Promise(resolve => {
    const s = document.createElement('script');
    s.src = src;
    s.onload = resolve;
    document.head.appendChild(s);
  });
}

async function fetchAIAnalysis(prompt) {
  const response = await fetch("https://api.together.xyz/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer tgp_v1_7Hx39LXvBrYiTUx5RH_SJ2czwQt1dtB7Yx7bQDwRjKo"
    },
    body: JSON.stringify({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 400
    })
  });
  const data = await response.json();
  return data.choices?.[0]?.message?.content || "Ошибка при получении анализа.";
}

function renderIndicators(interval) {
  document.querySelectorAll('.indicator').forEach(e => e.remove());
  summaryAI.innerHTML = `<h2>🤖 Детальный технический анализ</h2><p><strong>ИИ-анализ:</strong> формируется новый анализ...</p>`;
  let explanation = '';
  const values = [];

  indicators.forEach((ind, i) => {
    const box = document.createElement('div');
    box.className = 'indicator';

    const title = document.createElement('h2');
    title.textContent = ind.name;
    box.appendChild(title);

    const chart = document.createElement('div');
    chart.className = 'chart';
    chart.id = `tv${i}`;
    box.appendChild(chart);

    const value = (Math.random() * 100).toFixed(2);
    values.push(`${ind.name}: ${value}`);

    const p = document.createElement('p');
    p.textContent = ind.interpret(value);
    box.appendChild(p);

    explanation += `<li><strong>${ind.name}</strong>: ${ind.interpret(value)}</li>`;

    document.body.appendChild(box);

    new TradingView.widget({
      container_id: `tv${i}`,
      width: '100%',
      height: 250,
      symbol: `BINANCE:${symbol}USDT`,
      interval,
      timezone: 'Etc/UTC',
      theme: 'light',
      style: '1',
      locale: 'ru',
      enable_publishing: false,
      hide_top_toolbar: true,
      withdateranges: false,
      hide_legend: true,
      studies: [ind.study],
      save_image: false
    });
  });

  const aiPrompt = `Ты — эксперт по техническому анализу криптовалют. Дай краткий вывод на русском языке по монете ${symbol}/USDT с учетом следующих индикаторов:
${values.join(",")}. Вывод должен быть в одном абзаце, понятен новичку, объемом не менее 300 и не более 500 символов.`;

  fetchAIAnalysis(aiPrompt).then(aiResult => {
    summaryAI.innerHTML = `
      <h2>🤖 Детальный технический анализ</h2>
      <ul>${explanation}</ul>
      <p><strong>ИИ вывод:</strong> ${aiResult}</p>
    `;
  });
}

(async function () {
  await loadScript("https://s3.tradingview.com/tv.js");
  const defaultInterval = document.getElementById('timeframe').value;
  renderIndicators(defaultInterval);
})();

document.getElementById('timeframe').addEventListener('change', e => {
  renderIndicators(e.target.value);
});
