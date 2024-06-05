import JobItemView from "./JobItemView";

class JobsListView {
  #jobsArray;
  #parentEl = document.querySelector(".job-list--search");
  #spinnerEl = document.querySelector(".spinner--search");

  constructor(onJobClickItem) {
    this._addClickListener(onJobClickItem);
  }

  showSpinner() {
    this.#parentEl.innerHTML = "";
    this.#spinnerEl.classList.add("spinner--visible");
  }
  hiddeSpinner() {
    this.#spinnerEl.classList.remove("spinner--visible");
  }

  _addClickListener(onJobClickItem) {
    this.#parentEl.addEventListener("click", (e) => {
      e.preventDefault();

      const itemEl = e.target.closest(".job-item");
      const linkEl = itemEl.querySelector(".job-item__link");

      this.#parentEl
        .querySelector(".job-item--active")
        ?.classList.remove("job-item--active");

      itemEl.classList.add("job-item--active");

      window.location.href = linkEl.href;

      onJobClickItem();
    });
  }

  _createMarkup() {
    return this.#jobsArray
      .map((job) => new JobItemView().getHTML(job))
      .join("");
  }

  render({ jobs }) {
    if (!jobs) return;
    this.hiddeSpinner();
    this.#jobsArray = jobs;
    const html = this._createMarkup();

    this.#parentEl.innerHTML = html;
  }
}

export default JobsListView;
