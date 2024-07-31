const jobsSplit = {
  results: [],
};

const handler = {
  set(target, prop, value) {
    target[prop] = value;

    if (prop == "results") {
      notify("jobs", {
        status: "success",
        data: value,
      });
    }

    return true;
  },
};

function notify(event, { status, data } = {}) {
  window.dispatchEvent(
    new CustomEvent(event, {
      detail: {
        status,
        data,
      },
    })
  );
}
const Jobs = new Proxy(jobsSplit, handler);
export default Jobs;
