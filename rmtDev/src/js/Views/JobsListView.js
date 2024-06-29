import JobItemView from "./JobItemView";

class JobsListView {
  #jobsArray;
  #parentEl = document.querySelector(".job-list--search");
  #spinnerEl = document.querySelector(".spinner--search");
  #paginationEl = document.querySelector(".pagination");
  #sortingEl = document.querySelector(".sorting");
  #backBtnEl = this.#paginationEl.querySelector(".pagination__button--back");
  #nextBtnEl = this.#paginationEl.querySelector(".pagination__button--next");

  #listEl = document.querySelector(".job-list--bookmarks");
  #currentPage = 0;
  #jobsPerPage = 7;

  constructor(onJobClickItem, onBookmarkClick) {
    this._listenJobClick(onJobClickItem, onBookmarkClick);

    this.#backBtnEl.addEventListener("click", this._back.bind(this));
    this.#nextBtnEl.addEventListener("click", this._next.bind(this));
    this.#sortingEl.addEventListener("click", this._sortingHandler.bind(this));
    this._updateSortingButtons;
  }

  showSpinner() {
    this.#parentEl.innerHTML = "";
    this.#spinnerEl.classList.add("spinner--visible");
  }
  hiddeSpinner() {
    this.#spinnerEl.classList.remove("spinner--visible");
  }

  _listenJobClick(onJobClickItem, onBookmarkClick) {
    this.#parentEl.addEventListener("click", handler(this.#parentEl));
    this.#listEl.addEventListener("click", handler(this.#listEl));

    function handler(parentList) {
      return function (e) {
        e.preventDefault();

        const itemEl = e.target.closest(".job-item");
        const linkEl = itemEl.querySelector(".job-item__link");

        if (!itemEl) return;

        if (e.target.className.includes("job-item__bookmark-icon")) {
          onBookmarkClick(linkEl.getAttribute("href"));

          return;
        }

        parentList
          .querySelector(".job-item--active")
          ?.classList.remove("job-item--active");

        itemEl.classList.add("job-item--active");

        onJobClickItem(linkEl.getAttribute("href"));
      };
    }
  }

  renderBookmarks() {
    this.#listEl.innerHTML = "";

    this.#parentEl
      .querySelectorAll(".job-item__bookmark-icon--bookmarked")
      .forEach((el) => {
        

        this.#listEl.insertAdjacentElement(
          "afterbegin",
          el.closest(".job-item").cloneNode(true)
        );
      });
  }

  _createMarkup(filteredJobs) {
    return filteredJobs.map((job) => new JobItemView().getHTML(job)).join("");
  }

  render({ jobs }, sortCriteria = "relevant") {
    if (!jobs) return;
    this.hiddeSpinner();
    this._updateSortingButtons(sortCriteria);
    this.#jobsArray = jobs;
    const jobsToRender = this._filterJobs().sort(this._sortBy(sortCriteria));

    const html = this._createMarkup(jobsToRender);

    this.#parentEl.innerHTML = html;
    this._updatePagination(this.#currentPage);
  }

  _sortBy(criteria) {
    if (criteria === "recent") {
      return (a, b) => a.daysAgo - b.daysAgo;
    }
    return (a, b) => a.relevanceScore - b.relevanceScore;
  }

  // PAGINATION
  _filterJobs() {
    const startIndex = this.#currentPage * this.#jobsPerPage;
    const endIndex = startIndex + this.#jobsPerPage;

    return this.#jobsArray.slice(startIndex, endIndex);
  }

  _updatePagination(currentPage) {
    // we are in the first page
    if (currentPage + 1 === 1) {
      this.#backBtnEl.classList.add("pagination__button--hidden");
    } else {
      this.#backBtnEl.classList.remove("pagination__button--hidden");
    }

    // last page
    if (currentPage + 1 === this._computeTotalPages()) {
      this.#parentEl;
      this.#nextBtnEl.classList.add("pagination__button--hidden");
    } else {
      this.#nextBtnEl.classList.remove("pagination__button--hidden");
    }

    // anywhere in the middle
    this.#nextBtnEl.querySelector(".pagination__number").textContent =
      currentPage + 2;
    this.#backBtnEl.querySelector(".pagination__number").textContent =
      currentPage;
  }

  _next() {
    this.#currentPage++;
    this.render({ jobs: this.#jobsArray });
  }

  _back() {
    this.#currentPage--;
    this.render({ jobs: this.#jobsArray });
  }

  _computeTotalPages() {
    return Math.ceil(this.#jobsArray.length / this.#jobsPerPage);
  }

  _sortingHandler(e) {
    if (!e.target.classList.contains("sorting__button")) return;

    const btnCliked = e.target;

    const criteria = btnCliked.classList.contains("sorting__button--recent")
      ? "recent"
      : "relevant";

    this.render({ jobs: this.#jobsArray }, criteria);
    this._updateSortingButtons(criteria);
  }

  _updateSortingButtons(criteria = "relevant") {
    this.#sortingEl
      .querySelectorAll(".sorting__button")
      .forEach((b) => b.classList.remove("sorting__button--active"));

    this.#sortingEl
      .querySelector(`.sorting__button--${criteria}`)
      .classList.add("sorting__button--active");
  }
}

export default JobsListView;
