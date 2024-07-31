const jobsSplit = {
  selected: null,
  results: [],
};

const handler = {
  set(target, prop, value) {
    target[prop] = value;

    window.dispatchEvent(
      new CustomEvent("jobs", {
        detail: {
          status: "success",
          data: value,
        },
      })
    );

    return true;
  },
};
const Jobs = new Proxy(jobsSplit, handler);
export default Jobs;
