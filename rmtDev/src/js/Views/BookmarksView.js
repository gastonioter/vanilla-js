class BookmarksView {
  #toggleButton = document.querySelector(".bookmarks-btn");
  #listEl = document.querySelector(".job-list--bookmarks");

  constructor() {
    this.#toggleButton.addEventListener("click", this._toggleList.bind(this));
  }
  _toggleList(e) {
    this.#listEl.classList.toggle("job-list--visible");
  }
}

export default BookmarksView;
