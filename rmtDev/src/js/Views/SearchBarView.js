class SearchBarView {
  #parentEl = document.querySelector(".search");
  #queryInput = document.querySelector(".search__input");

  addHandlerSearch(handler) {
    this.#parentEl.addEventListener("submit", (e) => {
      e.preventDefault();

      handler(this.query);
    });
  }

  clearInput() {
    this.#parentEl.querySelector(".search__input").value = "";
  }

  get query() {
    return this.#parentEl.querySelector(".search__input").value;
  }
}

export default SearchBarView;
