import observerMixin from "../mixins/observerMixin.js";
import { loadJobs } from "../services/jobsAPI.js";


const Jobs = {
  jobs: [],

  setJobs(value) {
    this.jobs = value;
    this.notify("jobschanged");
  },

  async fetchJobs(query) {
    this.notify("fetchingjobs");
    const { jobItems: jobs } = await loadJobs(query);
    this.setJobs(jobs);
  },

  
};

Object.assign(Jobs, observerMixin);

export default Jobs;
