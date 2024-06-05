class JobDetailsView {
  #parentEl = document.querySelector(".job-details");
  #data;

  renderSpinner() {
    this._clear()
    this.#parentEl
      .querySelector(".spinner--job-details")
      .classList.add("spinner--visible");
  }

  hiddeSpinner() {
    this._clear();
    this.#parentEl
      .querySelector(".spinner--job-details")
      .classList.remove("spinner--visible");
  }

  _createMarkup(job) {
    return `
    <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1272&h=348&q=100" alt="#" class="job-details__cover-img">

<a class="apply-btn" href="https://fictionalversonetworkswebsite.com" target="_blank">Apply <i class="fa-solid fa-square-arrow-up-right apply-btn__icon"></i></a>

<section class="job-info">
    <div class="job-info__left">
        <div class="job-info__badge">VN</div>
        <div class="job-info__below-badge">
            <time class="job-info__time">1d</time>
            <button class="job-info__bookmark-btn">
                <i class="fa-solid fa-bookmark job-info__bookmark-icon"></i>
            </button>
        </div>
    </div>
    <div class="job-info__right">
        <h2 class="second-heading">JS Developer</h2>
        <p class="job-info__company">Verso Networks</p>
        <p class="job-info__description">Developers are responsible for developing and designing front end web architecture, ensuring the responsiveness of applications, and working alongside graphic designers for web design features, among other duties.</p>
        <div class="job-info__extras">
            <p class="job-info__extra"><i class="fa-solid fa-clock job-info__extra-icon"></i> Full-Time</p>
            <p class="job-info__extra"><i class="fa-solid fa-money-bill job-info__extra-icon"></i> $80,000+</p>
            <p class="job-info__extra"><i class="fa-solid fa-location-dot job-info__extra-icon"></i> Global</p>
        </div>
    </div>
</section>

<div class="job-details__other">
    <section class="qualifications">
        <div class="qualifications__left">
            <h4 class="fourth-heading">Qualifications</h4>
            <p class="qualifications__sub-text">Other qualifications may apply</p>
        </div>
        <ul class="qualifications__list">
            <li class="qualifications__item">Node.js</li>
        </ul>
    </section>

    <section class="reviews">
        <div class="reviews__left">
            <h4 class="fourth-heading">Company reviews</h4>
            <p class="reviews__sub-text">Recent things people are saying</p>
        </div>
        <ul class="reviews__list">
            <li class="reviews__item">Only job I liked going to.</li>
        </ul>
    </section>
</div>

<footer class="job-details__footer">
    <p class="job-details__footer-text">If possible, please reference that you found the job on <span class="u-bold">rmtDev</span>, we would really appreciate it!</p>
</footer>`;
  }
  renderContent({ selectedJob }) {
    this._clear();
    this.hiddeSpinner();
    const html = this._createMarkup(selectedJob);
    this.#parentEl.querySelector(".job-details__content").innerHTML = html;
  }

  _clear() {
    this.#parentEl.querySelector(".job-details__content").innerHTML = "";
  }
}

export default JobDetailsView;
