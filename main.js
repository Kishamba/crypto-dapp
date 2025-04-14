// === Подключаем Orbitron шрифт ===
const fontLink = document.createElement('link');
fontLink.rel = 'stylesheet';
fontLink.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@500&display=swap';
document.head.appendChild(fontLink);

// === Вставка стилей ===
const styleTag = document.createElement('style');
styleTag.textContent = `
  .order-header {
    display: flex;
    justify-content: space-between;
    padding: 0 6px;
    font-weight: bold;
    font-size: 13px;
    margin-bottom: 4px;
    color: #555;
  }
  body {
    font-family: 'Orbitron', sans-serif;
    background: #f4f4f4;
    margin: 0;
    padding: 0;
  }

  .container {
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    box-sizing: border-box;
    gap: 20px;
  }

  .column {
    flex: 1;
    min-width: 300px;
    background: #f9f9f9;
    padding: 10px;
    border-radius: 12px;
  }

  h2 {
    margin-top: 0;
    color: #333;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    background: #fff;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  }

  li img {
    width: 32px;
    height: 32px;
    margin-right: 12px;
    cursor: pointer;
  }

  .price-up {
    color: green;
  }

  .price-down {
    color: red;
  }

  #chart-block, #orderbook-block {
    padding: 20px;
    background: #ffffff;
    margin: 20px auto;
    border-radius: 12px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    max-width: 600px;
    width: 100%;
  }

  .orderbook {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }

  .orderbook-side {
    flex: 1;
  }

  .order-row {
    display: flex;
    align-items: center;
    font-size: 14px;
    margin: 2px 0;
    position: relative;
    height: 24px;
    overflow: hidden;
  }

  .bar {
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.4;
    z-index: 0;
  }

  .bid-row .bar {
    background-color: #00ff00;
  }

  .ask-row .bar {
    background-color: #ff0000;
    left: auto;
    right: 0;
  }

  .order-content {
    display: flex;
    justify-content: space-between;
    width: 100%;
    z-index: 1;
    position: relative;
    padding: 0 6px;
    font-size: 12px;
    word-break: break-word;
  }

  .order-content span {
    font-size: clamp(10px, 1.2vw, 16px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
  }

  #scale-control {
    margin-top: 10px;
    display: flex;
    gap: 10px;
    align-items: center;
  }

  #scale-control input {
    width: 200px;
  }
`;
document.head.appendChild(styleTag);

// === Вставка HTML-блоков ===
const layout = document.createElement('div');
layout.className = 'container';
layout.innerHTML = `
  <div id="left-column" class="column">
    <h2>🔥 Топ 10 Криптомонет по объему</h2>
    <ul id="crypto-list"></ul>
  </div>
  <div id="right-column" class="column">
    <h2>🚀 Потенциально прибыльные монеты</h2>
    <ul id="potential-coins"></ul>
  </div>
`;
document.body.appendChild(layout);

const chartBlock = document.createElement('div');
chartBlock.id = 'chart-block';
chartBlock.innerHTML = `
  <h2>📊 График BTC/USDT (TradingView)</h2>
  <iframe src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_e9f90&symbol=BINANCE:BTCUSDT&interval=30&theme=light&style=1&locale=ru&toolbar_bg=f1f3f6&enable_publishing=false&allow_symbol_change=true&hideideas=1" 
    width="100%" 
    height="500" 
    frameborder="0" 
    allowtransparency="true" 
    scrolling="no">
  </iframe>
`;
document.body.appendChild(chartBlock);

const orderbookBlock = document.createElement('div');
orderbookBlock.id = 'orderbook-block';
orderbookBlock.innerHTML = `
  <h2>📘 Стакан торговли BTC/USDT</h2>
  <div class="orderbook">
    <div class="orderbook-side"><h4>Покупатели (Bids)</h4>
      <div class="order-header"><span>Цена</span><span>Объём</span></div>
      <div id="bids"></div>
    </div>
    <div class="orderbook-side"><h4>Продавцы (Asks)</h4>
      <div class="order-header"><span>Цена</span><span>Объём</span></div>
      <div id="asks"></div>
    </div>
  </div>
`;
document.body.appendChild(orderbookBlock);

// === Добавляем кнопки АНАЛИЗ и ТОРГОВЛЯ ===
const buttonsBlock = document.createElement('div');
buttonsBlock.style.textAlign = 'center';
buttonsBlock.style.margin = '20px';
buttonsBlock.innerHTML = `
  <button id="analyze-btn" style="font-family: 'Orbitron'; font-size: 16px; padding: 10px 20px; margin-right: 20px; cursor: pointer; border: none; border-radius: 8px; background-color: #007bff; color: white;">🔍 АНАЛИЗ</button>
  <button id="trade-btn" style="font-family: 'Orbitron'; font-size: 16px; padding: 10px 20px; cursor: pointer; border: none; border-radius: 8px; background-color: #28a745; color: white;">💼 ТОРГОВЛЯ</button>
`;
document.body.appendChild(buttonsBlock);

// Пример логики по клику (можно заменить позже)
document.getElementById('analyze-btn').addEventListener('click', () => {
  const coinSymbol = currentSymbol.replace('USDT', '');
  window.location.href = `analysis.html?symbol=${coinSymbol}`;
});

document.getElementById('trade-btn').addEventListener('click', () => {
  alert('Здесь будет интерфейс торговли...');
});

const scaleControl = document.createElement('div');
scaleControl.id = 'scale-control';
scaleControl.innerHTML = `
  <label>Масштаб стакана: <input id="scale-slider" type="range" min="10" max="50" step="1" value="15"></label>
`;
orderbookBlock.appendChild(scaleControl);

const scaleSlider = scaleControl.querySelector('#scale-slider');
let orderLimit = 15;

scaleSlider.addEventListener('input', (e) => {
  orderLimit = parseInt(e.target.value);
  loadOrderbook();
});

let currentSymbol = 'BTCUSDT';
const PROXY = 'https://corsproxy.io/?';

async function getTopCoins() {
  const res = await fetch(`${PROXY}https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=volume_desc&per_page=10&page=1`);
  const data = await res.json();
  const list = document.getElementById('crypto-list');
  list.innerHTML = '';
  data.forEach(coin => {
    const change = coin.price_change_percentage_24h?.toFixed(2) || 0;
    const changeClass = change >= 0 ? 'price-up' : 'price-down';
    const item = document.createElement('li');
    item.innerHTML = `
      <img src="${coin.image}" alt="${coin.symbol}">
      <strong>${coin.name} (${coin.symbol.toUpperCase()})</strong> — $${coin.current_price.toLocaleString()} <span class="${changeClass}">(${change}%)</span> | Объём: $${coin.total_volume.toLocaleString()}
    `;
    item.querySelector('img').addEventListener('click', () => updateChartAndOrderbook(coin.symbol));
    list.appendChild(item);
  });
}

async function getPotentialCoins() {
  const res = await fetch(`${PROXY}https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1`);
  const data = await res.json();
  const filtered = data.filter(coin => coin.price_change_percentage_24h > 5).slice(0, 10);
  const list = document.getElementById('potential-coins');
  list.innerHTML = '';
  filtered.forEach(coin => {
    const change = coin.price_change_percentage_24h?.toFixed(2) || 0;
    const changeClass = change >= 0 ? 'price-up' : 'price-down';
    const item = document.createElement('li');
    item.innerHTML = `
      <img src="${coin.image}" alt="${coin.symbol}">
      <strong>${coin.name} (${coin.symbol.toUpperCase()})</strong> — $${coin.current_price.toLocaleString()} <span class="${changeClass}">(${change}%)</span> | Объём: $${coin.total_volume.toLocaleString()}
    `;
    item.querySelector('img').addEventListener('click', () => updateChartAndOrderbook(coin.symbol));
    list.appendChild(item);
  });
}

async function loadOrderbook() {
  const symbol = currentSymbol || 'BTCUSDT';
  const res = await fetch(`https://api.binance.com/api/v3/depth?symbol=${symbol}&limit=${orderLimit}`);
  const data = await res.json();
  const bids = document.getElementById('bids');
  const asks = document.getElementById('asks');
  bids.innerHTML = '';
  asks.innerHTML = '';

  const allVolumes = [...data.bids, ...data.asks].map(([_, qty]) => parseFloat(qty));
  const maxVolume = Math.max(...allVolumes);

  data.bids.forEach(([price, quantity]) => {
    const row = document.createElement('div');
    row.className = 'order-row bid-row';
    const percent = (parseFloat(quantity) / maxVolume) * 100;
    row.innerHTML = `
      <div class="bar" style="width: ${percent}%"></div>
      <div class="order-content"><span>${price}</span><span>${parseFloat(quantity).toFixed(4)}</span></div>
    `;
    bids.appendChild(row);
  });

  data.asks.forEach(([price, quantity]) => {
    const row = document.createElement('div');
    row.className = 'order-row ask-row';
    const percent = (parseFloat(quantity) / maxVolume) * 100;
    row.innerHTML = `
      <div class="bar" style="width: ${percent}%"></div>
      <div class="order-content"><span>${price}</span><span>${parseFloat(quantity).toFixed(4)}</span></div>
    `;
    asks.appendChild(row);
  });
}

function updateChartAndOrderbook(symbol) {
  currentSymbol = symbol.toUpperCase() + 'USDT';
  const chart = document.querySelector('#chart-block iframe');
  const chartTitle = document.querySelector('#chart-block h2');
  const orderbookTitle = document.querySelector('#orderbook-block h2');
  chartTitle.textContent = `📊 График ${symbol.toUpperCase()}/USDT (TradingView)`;
  orderbookTitle.textContent = `📘 Стакан торговли ${symbol.toUpperCase()}/USDT`;
  chart.src = `https://s.tradingview.com/widgetembed/?frameElementId=tradingview_e9f90&symbol=BINANCE:${currentSymbol}&interval=30&theme=light&style=1&locale=ru&toolbar_bg=f1f3f6&enable_publishing=false&allow_symbol_change=true&hideideas=1`;
  loadOrderbook();
}

getTopCoins();
getPotentialCoins();
loadOrderbook();

setInterval(() => {
  loadOrderbook();
}, 2000);

setInterval(() => {
  getTopCoins();
  getPotentialCoins();
}, 15000);
