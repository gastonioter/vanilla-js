import { findJobById } from "../services/jobsAPI.js";
import { interpolate } from "../utils/interpolate.js";
import Spinner from "./Spinner.js";

const findJobFn = findJobById();

export class JobDetail extends HTMLElement {
  constructor() {
    super();
    this.template = document.getElementById("job-details-template");
    this.spinner = Spinner(".spinner--job-details");
  }

  connectedCallback() {
    this.appendChild(this.template.content.cloneNode(true));
    this.jobId = this.dataset.id;
    this.innerHTML = "";
    this.render();
  }

  async render() {
    if (!this.jobId) return;

    this.spinner.render();
    const {
      description,
      title,
      badgeLetters,
      company,
      qualifications,
      duration,
      salary,
      location,
      reviews,
      daysAgo,
      companyURL,
      coverImgURL,
    } = await findJobFn(this.jobId);

    this.spinner.hidde();
    this.innerHTML = interpolate(this.template.innerHTML, {
      description,
      companyURL,
      coverImgURL,
      qualifications: qualifications
        .map((q) => `<li class="qualifications__item">${q}</li>`)
        .join(""),
      reviews: reviews
        .map((r) => `<li class="reviews__item">${r}</li>`)
        .join(""),
      title,
      badgeLetters,
      company,
      duration,
      salary,
      location,
      daysAgo,
      coverImgURL:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1272&h=348&q=100",
      companyURL: "https://fictionalcomputerhaverwebsite.com",
      badgeBgColor: "#3d87f1",
    });
  }
}

customElements.define("job-detail", JobDetail);
