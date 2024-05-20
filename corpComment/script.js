document.addEventListener("DOMContentLoaded", init);

const MAX_LENGTH_ALLOWED = 155;

function init() {
  const textareaEl = document.querySelector(".form__textarea");
  const counterEl = document.querySelector(".counter");
  const formEl = document.querySelector(".form");
  const submitBtn = document.querySelector(".submit-btn");
  const feedbacksListEl = document.querySelector(".feedbacks");
  const spinnerEl = document.querySelector(".spinner");
  counterEl.textContent = MAX_LENGTH_ALLOWED;
  setCounter(counterEl, textareaEl);
  setForm(formEl, textareaEl, counterEl);
  loadRemoteFeedbacks(feedbacksListEl, spinnerEl);
}

const URL = "https://bytegrad.com/course-assets/js/1/api/feedbacks";
function loadRemoteFeedbacks(feedbacksListEl, spinnerEl) {
  let isLoading = true;

  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      const { feedbacks } = data;
      renderFeedbacks(feedbacks);
    })
    .catch((e) => {
      feedbacksListEl.innerHTML = `<p class="error-msg">Falied to fetch feedback items. Error message: ${e.message}</p>`;
    })
    .finally(() => {
      spinnerEl.remove();
    });

  function renderFeedbacks(feedbacks) {
    feedbacksListEl.innerHTML = feedbacks
      .map((feedback) => createFeedbackItem(feedback))
      .join("");
  }
}

function postFeedback(feedback) {
  fetch(URL, {
    method: "POST",
    body: JSON.stringify(feedback),
  });
}

function setCounter(counterEl, textareaEl) {
  textareaEl.addEventListener("input", handleInput);

  function handleInput(e) {
    {
      const userInput = e.target.value;

      if (userInput.length > MAX_LENGTH_ALLOWED) {
        userInput = userInput.substring(0, MAX_LENGTH_ALLOWED);

        return;
      }
      counterEl.textContent = MAX_LENGTH_ALLOWED - userInput.length;
    }
  }
}

function setForm(formEl, textareaEl, counterEl, feedbacksListEl) {
  formEl.addEventListener("submit", handleSubmit);

  function handleSubmit(e) {
    e.preventDefault();
    const userInput = textareaEl.value;
    const regex = /(^|\s)[#][\w]+(\s|$)/;

    if (!regex.test(userInput) || userInput.length <= 5) {
      formEl.classList.add("form--invalid");
      showVisualIndicator(false);
      return;
    }

    showVisualIndicator(true);

    const [company] = userInput.match(regex);
    const newFeedback = {
      company: company.substring(1),
      badgeLetter: company.substring(0, 1),
      upvoteCount: 0,
      daysAgo: 0,
      text: userInput,
    };
    postFeedback(newFeedback);

    feedbacksListEl.insertAdjacentHTML(
      "afterbegin",
      createFeedbackItem(newFeedback)
    );

    textareaEl.value = "";
    counterEl.textContent = MAX_LENGTH_ALLOWED;
    submitBtn.blur();

    function showVisualIndicator(valid) {
      const className = valid ? "form--valid" : "form--invalid";

      formEl.classList.add(className);
      setTimeout(() => {
        formEl.classList.remove(className);
      }, 2000);
    }
  }
}

function createFeedbackItem({
  company,
  badgeLetter,
  upvoteCount,
  daysAgo,
  text,
}) {
  return `
    <li class="feedback">
    <button class="upvote">
        <i class="fa-solid fa-caret-up upvote__icon"></i>
        <span class="upvote__count">${upvoteCount}</span>
    </button>
    <section class="feedback__badge">
        <p class="feedback__letter">${badgeLetter}</p>
    </section>
    <div class="feedback__content">
        <p class="feedback__company">${company}</p>
        <p class="feedback__text">${text}</p>
    </div>
    <p class="feedback__date">${daysAgo}d</p>
</li>`;
}
