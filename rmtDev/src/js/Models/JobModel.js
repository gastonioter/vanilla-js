import AbstractModel from "./AbstractModel";
import { ApiServices } from "../services/ApiServices";

class JobModel extends AbstractModel {
  #selectedJob = {};
  #jobs = [];
  #apiUtils = ApiServices("https://bytegrad.com/course-assets/js/2/api");
  #bookmarks = [];

  async fetchJobs(query) {
    try {
      const data = await this.#apiUtils.fetchResources(`jobs?search=${query}`);
      this.#jobs = data.jobItems;

      this.notify("jobListUpdated", {
        jobs: this.#jobs,
      });
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

  setBookmark(id) {
    const job = this.#jobs.find((job) => job.id == id);
    job.bookmarked = !job.bookmarked;

    this.notify("jobListUpdated", {
      jobs: this.#jobs,
    });
    this.notify("bookmarked");
  }

  getBookmarks() {
    return this.#jobs.filter((job) => job.bookmarked);
  }
}

export default JobModel;
