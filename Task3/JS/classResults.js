export default class Result {
  constructor(element) {
    this.element = element;
  }

  async resultFetch(value) {
    const spinner = document.getElementById("buttonSpinner");
    spinner.classList.remove("visually-hidden");

    const serverRes = await fetch(
      `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${value}&amp%3Blimit=10&amp%3Bexchange=NASDAQ`
    );
    const serverJson = await serverRes.json();
    return serverJson.slice(0, 10);
  }

  async profileFetch(data) {
    const profileList = await data;
    let profiles = [];
    for (const element of profileList) {
      const serverRes = await fetch(
        `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${element.symbol}`
      );
      const serverJson = await serverRes.json();
      profiles.push(serverJson);
    }
    return profiles;
  }

  async resultDisplay(data) {
    const profiles = await data;
    let resUl = document.getElementById("resUl");
    const spinner = document.getElementById("buttonSpinner");
    let listItem = "";

    await profiles.forEach(async (element) => {
      listItem += `<li class="list-group-item"><img src="${element.profile.image}" width="25px" class="me-3"><a href="./company.html?symbol=${element.symbol}" target="_blank">${element.profile.companyName}</a>`;
      if (element.profile.changesPercentage.includes("-")) {
        listItem += `<span> (${element.symbol})</span><span class="text-danger">${element.profile.changesPercentage}</span></li>`;
      } else {
        listItem += `<span> (${element.symbol})</span><span class="text-success">${element.profile.changesPercentage}</span></li>`;
      }
    });
    resUl.innerHTML = listItem;
    spinner.classList.add("visually-hidden");
    return;
  }
}
