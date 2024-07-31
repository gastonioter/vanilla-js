import Router from "../Router.js";
import { interpolate } from "../utils/interpolate.js";

export class JobItem extends HTMLElement {
  constructor() {
    super();
    this.template = document.getElementById("job-item-template");
  }

  connectedCallback() {
    const {
      badgeLetters,
      company,
      companyURL,
      coverImgURL,
      daysAgo,
      duration,
      id,
      relevanceScore,
      location,
      title,
      salary,
      bookmarked,
    } = JSON.parse(this.dataset.job);

    this.innerHTML = interpolate(this.template.innerHTML, {
      badgeLetters,
      company,
      companyURL,
      coverImgURL,
      daysAgo,
      duration,
      id,
      relevanceScore,
      location,
      title,
      salary,
      bookmarked,
    });

    this.addEventListener("click", (e) => {
      e.preventDefault();

      const href = e.currentTarget
        .querySelector(".job-item__link")
        .getAttribute("href");

      Router.go(href);
    });
  }
}
customElements.define("job-item", JobItem);
