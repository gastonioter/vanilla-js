class JobItemView {
  getHTML({
    badgeLetters,
    company,
    companyURL,
    coverImgURL,
    daysAgo,
    duration,
    id,
    relevanceScore,
    location,
    title,
    salary,
  }) {
    return `<li class="job-item">
    <a class="job-item__link" href="#${id}">
        <div class="job-item__badge">${badgeLetters}</div>
        <div class="job-item__middle">
            <h3 class="third-heading">${title}</h3>
            <p class="job-item__company">${company}</p>
            <div class="job-item__extras">
                <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i> ${duration}</p>
                <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i> ${salary}</p>
                <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i> ${location}</p>
            </div>
        </div>
        <div class="job-item__right">
            <i class="fa-solid fa-bookmark job-item__bookmark-icon"></i>
            <time class="job-item__time">${daysAgo}</time>
        </div>
    </a>
</li>`;
  }
}

export default JobItemView;
