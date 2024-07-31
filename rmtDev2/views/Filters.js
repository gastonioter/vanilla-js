import Jobs from "../store/Jobs.js";

const sorting = {
  recent: sortyByRecent,
  relevant: sortByRelevant,
};

const filters = document.querySelector(".sorting");

filters.addEventListener("click", (e) => {
  const filterToApply = e.target.classList.contains("sorting__button--relevant")
    ? "relevant"
    : "recent";

  toggleActiveButton(filterToApply);

  Jobs.setJobs(Jobs.jobs.toSorted(sorting[filterToApply]));
});

function toggleActiveButton(filterToApply) {
  document.querySelectorAll(".sorting__button").forEach((btn) => {
    btn.classList.remove("sorting__button--active");
  });

  document
    .querySelector(`.sorting__button--${filterToApply}`)
    .classList.add("sorting__button--active");
}

function sortyByRecent(a, b) {
  return a.daysAgo - b.daysAgo;
}

function sortByRelevant(a, b) {
  return a.relevanceScore - b.relevanceScore;
}
