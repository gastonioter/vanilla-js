class SearchBarView {
  #parentEl = document.querySelector(".search");
  constructor(onSubmit) {
    this._addSubmitListener(onSubmit);
  }

  _addSubmitListener(handler) {
    this.#parentEl.addEventListener("submit", (e) => {
      e.preventDefault();

      handler(this.query);

      this._blur();
    });
  }

  clearInput() {
    this.#parentEl.querySelector(".search__input").value = "";
  }
  _blur() {
    this.#parentEl.querySelector(".search__input").blur();
  }

  get query() {
    return this.#parentEl.querySelector(".search__input").value;
  }
}

export default SearchBarView;
