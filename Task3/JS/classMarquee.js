export default class Marquee {
  constructor(element) {
    this.element = element;
  }
  async marqueeLoad() {
    const serverRes = await fetch(
      "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/actives"
    );
    const serverJson = await serverRes.json();
    let listItem = "";

    serverJson.forEach(async (element) => {
      listItem += `<a class="text-decoration-none text-light" href="http://127.0.0.1:5500/Task3/HTML/company.html?symbol=${element.ticker}" target="_blank"><div class="marquee-tag">${element.ticker}`;
      if (element.changesPercentage.includes("-")) {
        listItem += `<div class="ms-1 text-danger fw-bold">${element.changesPercentage}</div></div></a>`;
      } else {
        listItem += `<div class="ms-1 text-success fw-bold">${element.changesPercentage}</div></div></a>`;
      }
      this.element.innerHTML = listItem;
    });
  }
}
