class JobDetailsView {
  #parentEl = document.querySelector(".job-details");
  #data;

  renderSpinner() {
    this._clear();
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
    <img src="${job.coverImgURL}" alt="#" class="job-details__cover-img">

<a class="apply-btn" href="${
      job.companyURL
    }" target="_blank">Apply <i class="fa-solid fa-square-arrow-up-right apply-btn__icon"></i></a>

<section class="job-info">
    <div class="job-info__left">
        <div class="job-info__badge">${job.badgeLetters}</div>
        <div class="job-info__below-badge">
            <time class="job-info__time">${job.daysAgo}</time>
            <button class="job-info__bookmark-btn">
                <i class="fa-solid fa-bookmark job-info__bookmark-icon"></i>
            </button>
        </div>
    </div>
    <div class="job-info__right">
        <h2 class="second-heading">${job.title}</h2>
        <p class="job-info__company">${job.company}</p>
        <p class="job-info__description">${job.description}</p>
        <div class="job-info__extras">
            <p class="job-info__extra"><i class="fa-solid fa-clock job-info__extra-icon"></i> ${
              job.duration
            }</p>
            <p class="job-info__extra"><i class="fa-solid fa-money-bill job-info__extra-icon"></i> ${
              job.salary
            }</p>
            <p class="job-info__extra"><i class="fa-solid fa-location-dot job-info__extra-icon"></i> ${
              job.location
            }</p>
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
        ${job.qualifications
          .map((q) => `<li class="qualifications__item">${q}</li>`)
          .join("")}
            
        </ul>
    </section>

    <section class="reviews">
        <div class="reviews__left">
            <h4 class="fourth-heading">Company reviews</h4>
            <p class="reviews__sub-text">Recent things people are saying</p>
        </div>
        <ul class="reviews__list">
        ${job.reviews
          .map((review) => ` <li class="reviews__item">${review}</li>`)
          .join("")}
           
        </ul>
    </section>
</div>

<footer class="job-details__footer">
    <p class="job-details__footer-text">If possible, please reference that you found the job on <span class="u-bold">rmtDev</span>, we would really appreciate it!</p>
</footer>`;
  }
  render({ selectedJob }) {

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
