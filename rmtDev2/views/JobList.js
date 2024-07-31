import Jobs from "../store/jobs.js";
import "./JobItem.js";
import Spinner from "./Spinner.js";

attachListeners();
const spinner = Spinner(".spinner--search");

const ul = document.querySelector(".job-list--search");

function attachListeners() {
  window.addEventListener("jobs", render);
}

function render(e) {
  ul.innerHTML = "";

  const { status, data } = e.detail;
  if (status == "loading") {
    spinner.render();

    return;
  }

  spinner.hidde();

  data.slice(0, 7).forEach((job) => {
    const jobEl = document.createElement("job-item");
    jobEl.dataset.job = JSON.stringify(job);
    ul.appendChild(jobEl);
  });
}
