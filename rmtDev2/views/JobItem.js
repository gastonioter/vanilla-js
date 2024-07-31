import Router from "../Router.js";
import { interpolate } from "../utils/interpolate.js";

export class JobItem extends HTMLElement {
  constructor() {
    super();
    this.template = document.getElementById("job-item-template");
  }

  connectedCallback() {
    const job = JSON.parse(this.dataset.job);
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
    } = job;

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
      bookmarked: job.bookmarked ? "job-info__bookmark-icon--bookmarked" : "",
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
