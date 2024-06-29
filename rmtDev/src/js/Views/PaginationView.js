class PaginationView {
  #parentEl = document.querySelector(".pagination");
  #backBtnEl = this.#parentEl.querySelector(".pagination__button--back");
  #nextBtnEl = this.#parentEl.querySelector(".pagination__button--next");
  constructor(totalItems, itemsPerPage) {
    this.totalItems = totalItems;
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1;
  }

  render({ currentPage }) {
    // we are in the first page
    if (currentPage === 1) {
      this.#backBtnEl.classList.add("pagination__button--hidden");
    } else {
      this.#backBtnEl.classList.remove("pagination__button--hidden");
    }

    // last page
    if (currentPage === this._computeTotalPages()) {
      this.#parentEl;
      this.#nextBtnEl.classList.add("pagination__button--hidden");
    } else {
      this.#nextBtnEl.classList.remove("pagination__button--hidden");
    }

    // anywhere in the middle
    this.#nextBtnEl.querySelector(".pagination__number").textContent =
      this.currentPage + 1;
    this.#backBtnEl.querySelector(".pagination__number").textContent =
      this.currentPage - 1;
  }

  setEventListeners(next, prev) {
    this.#parentEl.addEventListener("click", (e) => {
      e.stopPropagation();
      const btnClicked = e.target;
      if (btnClicked.classList.contains("button-pagination--next")) {
        next(this.currentPage);
      }
      if (btnClicked.classList.contains("button-pagination--next")) {
        prev(this.currentPage);
      }
    });
  }

  _computeTotalPages() {
    return Math.floor(this.totalItems / this.itemsPerPage);
  }
}

export default PaginationView;
