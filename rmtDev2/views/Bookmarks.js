import { isBookmarked } from "../app/bookmarks.js";
import Jobs from "../store/Jobs.js";

const bookmarkBtn = document.querySelector(".bookmarks-btn");
const bookmarksList = document.querySelector(".job-list--bookmarks");

let bookmarks = [];

Jobs.addObserver("jobschanged", () => {
  bookmarks = Jobs.jobs.filter((job) => isBookmarked(job.id));
  renderList();
});

function renderList() {
  bookmarksList.innerHTML = "";
  bookmarks.forEach((job) => {
    const jobEl = document.createElement("job-item");
    jobEl.dataset.job = JSON.stringify(job);
    bookmarksList.appendChild(jobEl);
  });
}

bookmarkBtn.addEventListener("mouseenter", (e) => {
  bookmarksList.classList.add("job-list--bookmarks--show");
});

bookmarkBtn.addEventListener("mouseleave", () => {
  bookmarksList.classList.remove("job-list--bookmarks--show");
});
