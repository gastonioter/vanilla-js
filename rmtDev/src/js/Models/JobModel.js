import AbstractModel from "./AbstractModel";
import { ApiServices } from "../services/ApiServices";
import SearchModel from "./SearchModel";

class JobModel extends AbstractModel {
  #selectedJob = {};
  #jobs = [];
  #apiUtils = ApiServices("https://bytegrad.com/course-assets/js/2/api");

  async fetchJobs(query) {
    try {
      const data = await this.#apiUtils.fetchResources(`jobs?search=${query}`);
      this.#jobs = data.jobItems;

      this.notify("fetchSuccess", { jobs: this.#jobs });
    } catch (e) {
      throw new Error(e);
      
    } 
  }

  async fetchJob(id) {
    try {
      const data = await this.#apiUtils.fetchResourceById("jobs", id);

      const { jobItem } = data;
      this.setSelectedJob(jobItem);

      this.notify("selected", { selectedJob: this.#selectedJob });
    } catch (e) {
      throw new Error(e);
    }
  }

  getJobs() {
    return this.#jobs;
  }

  setSelectedJob(job) {
    this.#selectedJob = job;
  }
}

export default JobModel;
