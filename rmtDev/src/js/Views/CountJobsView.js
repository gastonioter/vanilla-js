class CountJobsView {
  #parentEl = document.querySelector(".count");

  render({ jobs }) {
    this.#parentEl.querySelector(".count__number").textContent = jobs.length;
  }
}

export default CountJobsView;
