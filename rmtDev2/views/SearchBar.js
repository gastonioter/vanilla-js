import Jobs from "../store/jobs.js";
const form = document.querySelector(".search");

render();

function render() {
  form.addEventListener("submit", handleSubmit);
}

function handleSubmit(e) {
  e.preventDefault();

  const formData = new FormData(this.form);

  const data = {};

  formData.forEach((value, key) => {
    data[key] = value;
  });

  const { query } = data;

  Jobs.fetchJobs(query);

  form.elements[1].value = "";
}
