const Router = {
  init,
  go,
  listenURLChanges,
};

export default Router;

function init() {
  go(location.pathname);
  listenURLChanges();
}

function listenURLChanges() {
  window.addEventListener("popstate", (e) => {
    go(e.state.path, false);
  });
}
function go(path, addToHistory = true) {
  if (addToHistory) {
    history.pushState({ path }, null, path);
  }

  path = path.replace(/\/$/, "");
  const pathSegments = path.split("/").slice(1);

  if (pathSegments.length == 2) {
    const id = pathSegments[1];
    const jobDetailEl = document.createElement("job-detail");
    jobDetailEl.dataset.id = id;
    document
      .querySelector(".job-details__content")
      .replaceChildren(jobDetailEl);
  }
}
