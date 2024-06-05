import AbstractView from "./AbstractView";

class Error {
  #parentEl = document.querySelector(".error");
  #titleEl = this.#parentEl.querySelector(".error__title");
  #textEl = this.#parentEl.querySelector(".error__text");

  render(title, text) {
    this.#parentEl.classList.add("error--visible");
    console.log(this.#parentEl.classList);
    this.#titleEl.textContent = title;
    this.#textEl.textContent = text;

    setTimeout(() => {
      this.#parentEl.classList.remove("error--visible");
    }, 3000);
  }
}

export default Error;
