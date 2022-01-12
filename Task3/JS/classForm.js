import Result from "./classResults.js";

export default class Form {
  constructor(element) {
    this.element = element;
  }
  async createElements() {
    const form = document.createElement("form");
    form.classList.add("input-group");
    this.element.appendChild(form);

    const input = document.createElement("input");
    input.classList.add("form-control", "rounded");
    input.type = "search";
    input.id = "formInput";
    input.placeholder = "Search";
    form.appendChild(input);

    const button = document.createElement("button");
    button.classList.add("btn", "btn-outline-primary", "ps-4", "pe-4");
    button.type = "submit";
    button.id = "searchButton";
    button.innerText = "Search";
    form.appendChild(button);

    const spinner = document.createElement("div");
    spinner.classList.add(
      "spinner-border",
      "spinner-border-sm",
      "ms-2",
      "visually-hidden"
    );
    spinner.id = "buttonSpinner";
    button.appendChild(spinner);

    const resUl = document.createElement("ul");
    resUl.id = "resUl";
    resUl.style.padding = 0;
    mainContainer.appendChild(resUl);
    return;
  }

  async onSubmit() {
    const button = document.getElementById("searchButton");
    const result = new Result(document.getElementById("resultContainer"));

    button.addEventListener("click", async (event) => {
      event.preventDefault();
      const input = document.getElementById("formInput").value;
      const data = result.resultFetch(input);
      const profile = result.profileFetch(data);
      result.resultDisplay(profile);
    });
  }
}
