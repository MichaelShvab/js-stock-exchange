const getParam = (paramKey) => {
  let urlParam = new URLSearchParams(window.location.search);
  return urlParam.get(paramKey);
};

const paramSymbol = getParam("symbol");
let compUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${paramSymbol}`;
let stockHisUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${paramSymbol}?serietype=line`;

const fetchCompInfo = async (url) => {
  const response = await fetch(url);
  const json = await response.json();
  return json.profile;
};

const fetchStockHis = async (url) => {
  const response = await fetch(url);
  const json = await response.json();
  return json.historical;
};

const siteConstructor = async (data) => {
  const profileData = await data;

  let compImg = document.getElementById("companyImg");
  let compTitle = document.getElementById("companyName");
  let compDesc = document.getElementById("companyDesc");
  let stockPrice = document.getElementById("stockPrice");
  let stockPercent = document.getElementById("stockPercent");
  let changesPercent = profileData.changesPercentage;

  if (changesPercent.includes("-")) {
    stockPercent.classList.add("text-danger");
  } else {
    stockPercent.classList.add("text-success");
  }

  compImg.src = profileData.image;
  compTitle.innerText = profileData.companyName;
  compTitle.href = profileData.website;
  compDesc.innerText = profileData.description;
  stockPrice.innerText = `Stock Price: $${profileData.price}`;
  stockPercent.innerText = `${changesPercent}`;
};

const chartFunction = async (data) => {
  let stockData = await data;
  let stockDataDates = [];
  let stockDataClose = [];

  stockData.forEach((element) => {
    stockDataDates.push(element.date);
    stockDataClose.push(element.close);
  });

  let myChart = document.getElementById("myChart");
  let newChart = new Chart(myChart, {
    type: "line",
    data: {
      labels: stockDataDates.reverse(),
      datasets: [
        {
          label: "Stock Data",
          backgroundColor: "rgb(190, 29, 118)",
          borderColor: "rgb(190, 29, 118)",
          data: stockDataClose.reverse(),
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
      },
    },
  });
  return newChart;
};

const profileData = fetchCompInfo(compUrl);
const stockData = fetchStockHis(stockHisUrl);

console.log(profileData);
console.log(stockData);

siteConstructor(profileData);
chartFunction(stockData);
