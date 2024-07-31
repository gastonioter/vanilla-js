import Jobs from "../store/Jobs.js";

const el = document.querySelector(".count__number");

Jobs.addObserver("jobschanged", () => {
  el.textContent = Jobs.jobs.length;
});
