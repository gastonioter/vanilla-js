import { loadJobs } from "../services/jobsAPI.js";
import proxiedJobs from "./jobs.js";

const query = {
  value: "",
};

const handler = {
  async set(target, prop, value) {
    target[prop] = value;
    window.dispatchEvent(
      new CustomEvent("jobs", {
        detail: {
          status: "loading",
          data: [],
        },
      })
    );
    const { jobItems: jobs } = await loadJobs();

    proxiedJobs.results = jobs;
    return true;
  },
  get() {},
};
const proxiedQuery = new Proxy(query, handler);

export default proxiedQuery;
