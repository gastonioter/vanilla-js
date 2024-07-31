import Jobs from "../store/jobs.js";
import "./JobItem.js";
import Spinner from "./Spinner.js";

const spinner = Spinner(".spinner--search");

const ul = document.querySelector(".job-list--search");

Jobs.addObserver("fetchingjobs", () => {
  spinner.render();
});

Jobs.addObserver("loadedjobs", renderList);

function renderList() {
  ul.innerHTML = "";
  spinner.hidde();
  console.log(Jobs.jobs);

  Jobs.jobs.slice(0, 7).forEach((job) => {
    const jobEl = document.createElement("job-item");
    jobEl.dataset.job = JSON.stringify(job);
    ul.appendChild(jobEl);
  });
}
