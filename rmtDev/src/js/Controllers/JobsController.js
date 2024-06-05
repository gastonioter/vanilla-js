import SearchBarView from "../Views/SearchBarView";
import SearchModel from "../Models/SearchModel";
import ErrorView from "../Views/ErrorView";
import CountJobsView from "../Views/CountJobsView";
import JobModel from "../Models/JobModel";
import JobsListView from "../Views/JobsListView";
import JobDetailsView from "../Views/JobDetailsView";

class JobsController {
  #searchBarView = new SearchBarView(this._submitFormHandler.bind(this));
  #jobsListView = new JobsListView(this._clickJobItemHandler.bind(this));
  #errorView = new ErrorView();
  #countJobsView = new CountJobsView();
  #searchModel = new SearchModel();
  #jobModel = new JobModel();
  #jobDetailsView = new JobDetailsView();

  constructor() {
    this.#jobModel.subscribe(
      "fetchSuccess",
      this.#countJobsView.render.bind(this.#countJobsView)
    );
    this.#jobModel.subscribe(
      "fetchSuccess",
      this.#jobsListView.render.bind(this.#jobsListView)
    );
    this.#jobModel.subscribe(
      "selected",
      this.#jobDetailsView.renderContent.bind(this.#jobDetailsView)
    );
  }

  async _clickJobItemHandler() {
    const id = window.location.hash.slice(1);
    try {
      this.#jobDetailsView.renderSpinner();
      await this.#jobModel.fetchJob(id);
    } catch (e) {
      console.log(e);
    }
  }

  async _submitFormHandler(query) {
    try {
      this.#searchModel.query = query;
      this.#jobsListView.showSpinner();
      await this.#jobModel.fetchJobs(query);
      this.#searchBarView.clearInput();
    } catch (e) {
      console.log(e);

      this.#errorView.render("Invalid Search", e.message);
    }
  }
}

const app = new JobsController();

export default JobsController;