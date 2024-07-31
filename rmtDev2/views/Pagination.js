import Jobs from "../store/Jobs.js";
import { renderList } from "./JobList.js";

const paginationEl = document.querySelector(".pagination");

const backBtn = paginationEl.querySelector(".pagination__button--back");
const nextBtn = paginationEl.querySelector(".pagination__button--next");

const JOBS_PER_PAGE = 6;
let totalJobs;
let start = 0;
let end = JOBS_PER_PAGE + 1;
let totalPages;
let currentPage = 1;

Jobs.addObserver("jobschanged", () => {
  totalJobs = Jobs.jobs.length;
  totalPages = Math.ceil(totalJobs / JOBS_PER_PAGE);
  go(currentPage);
});

nextBtn.addEventListener("click", next);

backBtn.addEventListener("click", back);

function go(page) {
  if (!Jobs.jobs.length) return;
  start = (page - 1) * JOBS_PER_PAGE + 1;
  end = start + JOBS_PER_PAGE + 1;
  currentPage = page;
  renderList();
  updateButtons();
}
function next(e) {
  go(currentPage + 1);
}

function back(e) {
  go(currentPage - 1);
}

function updateButtons() {
  nextBtn.children[0].textContent = currentPage + 1;
  backBtn.children[1].textContent = currentPage - 1;

  switch (currentPage) {
    case 1:
      backBtn.classList.add("pagination__button--hidden");
      nextBtn.classList.remove("pagination__button--hidden");
      break;
    case totalPages:
      nextBtn.classList.add("pagination__button--hidden");
      backBtn.classList.remove("pagination__button--hidden");
      break;

    default:
      nextBtn.classList.remove("pagination__button--hidden");
      backBtn.classList.remove("pagination__button--hidden");
  }
}

export function getPage() {
  return { start, end };
}
