import Jobs from "../store/Jobs.js";
import "./JobItem.js";
import { getPage } from "./Pagination.js";
import Spinner from "./Spinner.js";

const spinner = Spinner(".spinner--search");

const ul = document.querySelector(".job-list--search");

Jobs.addObserver("fetchingjobs", () => {
  ul.innerHTML = "";
  spinner.render();
});

Jobs.addObserver("jobschanged", renderList);

export function renderList() {
  ul.innerHTML = "";
  spinner.hidde();
  const { start, end } = getPage();

  Jobs.jobs.slice(start, end).forEach((job) => {
    const jobEl = document.createElement("job-item");
    jobEl.dataset.job = JSON.stringify(job);
    ul.appendChild(jobEl);
  });
}
