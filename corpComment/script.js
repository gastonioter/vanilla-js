document.addEventListener("DOMContentLoaded", init);

const MAX_LENGTH_ALLOWED = 155;
const BASE_API = "https://bytegrad.com/course-assets/js/1/api";
let feedbacksArr = [];
function init() {
  const textareaEl = document.querySelector(".form__textarea");
  const counterEl = document.querySelector(".counter");
  const formEl = document.querySelector(".form");
  const submitBtn = document.querySelector(".submit-btn");
  const feedbacksListEl = document.querySelector(".feedbacks");
  const spinnerEl = document.querySelector(".spinner");
  const hashtagsUl = document.querySelector(".hashtags");

  counterEl.textContent = MAX_LENGTH_ALLOWED;
  setCounter(counterEl, textareaEl);
  setForm(formEl, textareaEl, counterEl, feedbacksListEl, submitBtn);
  loadFeedbacks(feedbacksListEl, spinnerEl);
  setFeedbacksListEl(feedbacksListEl);
  setHashtags(hashtagsUl, feedbacksListEl);
}

function setHashtags(hashtagsUl, feedbacksListEl) {
  hashtagsUl.addEventListener("click", handleHastagsClick);

  function handleHastagsClick(e) {
    if (!e.target.closest(".hashtag")) return;

    const { textContent: hashtagName } = e.target;

    if (hashtagName.toUpperCase() === "ALL") {
      renderFeedbacks(feedbacksArr, feedbacksListEl);
      return;
    }

    const filteredFeedbacks = feedbacksArr.filter((feedback) =>
      feedback.text.toLowerCase().includes(hashtagName.toLowerCase())
    );

    renderFeedbacks(filteredFeedbacks, feedbacksListEl);
  }
}

function setFeedbacksListEl(feedbacksListEl) {
  feedbacksListEl.addEventListener("click", handleListClick);

  function handleListClick(e) {
    const clickedEl = e.target;

    if (clickedEl.closest(".upvote")) {
      const upvote = clickedEl.closest(".upvote");
      upvote.disabled = true;
      const upvoteEl = upvote.querySelector(".upvote__count");
      const countValue = +upvoteEl.textContent;
      upvoteEl.textContent = ++countValue;
      return;
    }

    const feedbackEl = clickedEl.closest(".feedback");
    feedbackEl.classList.toggle("feedback--expand");
  }
}
function loadFeedbacks(feedbacksListEl, spinnerEl) {
  fetch(`${BASE_API}/feedbacks`)
    .then((response) => response.json())
    .then((data) => {
      const { feedbacks } = data;
      feedbacksArr = [...feedbacks];
      renderFeedbacks(feedbacksArr, feedbacksListEl);
    })
    .catch((e) => {
      feedbacksListEl.innerHTML = `<p class="error-msg">Falied to fetch feedback items. Error message: ${e.message}</p>`;
    })
    .finally(() => {
      spinnerEl.remove();
    });
}

function renderFeedbacks(feedbacks, feedbacksListEl) {
  feedbacksListEl.innerHTML = feedbacks
    .map((feedback) => createFeedbackItem(feedback))
    .join("");
}

function postFeedback(feedback) {
  fetch(`${BASE_API}/feedbacks`, {
    method: "POST",
    body: JSON.stringify(feedback),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) throw Error("failed to send your feedback");
    })
    .catch((e) => {
      alert(e.message);
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

function setForm(formEl, textareaEl, counterEl, feedbacksListEl, submitBtn) {
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
