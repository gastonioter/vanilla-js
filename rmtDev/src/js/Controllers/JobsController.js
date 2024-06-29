import SearchBarView from "../Views/SearchBarView";
import SearchModel from "../Models/SearchModel";
import ErrorView from "../Views/ErrorView";
import CountJobsView from "../Views/CountJobsView";
import JobModel from "../Models/JobModel";
import JobsListView from "../Views/JobsListView";
import JobDetailsView from "../Views/JobDetailsView";
import BookmarksView from "../Views/BookmarksView";

class JobsController {
  #searchBarView = new SearchBarView(this._handleFormSubmit.bind(this));
  #jobsListView = new JobsListView(
    this._handleClickJobItem.bind(this),
    this._handleBookmarkClick.bind(this)
  );
  #errorView = new ErrorView();
  #countJobsView = new CountJobsView();
  #searchModel = new SearchModel();
  #jobModel = new JobModel();
  #jobDetailsView = new JobDetailsView();
  #bookmarksView = new BookmarksView();

  constructor() {
    this.#jobModel.subscribe(
      "jobListUpdated",
      this.#countJobsView.render.bind(this.#countJobsView)
    );
    this.#jobModel.subscribe(
      "jobListUpdated",
      this.#jobsListView.render.bind(this.#jobsListView)
    );

    this.#jobModel.subscribe(
      "bookmarked",
      this.#jobsListView.renderBookmarks.bind(this.#jobsListView)
    );

    this.#jobModel.subscribe(
      "selected",
      this.#jobDetailsView.render.bind(this.#jobDetailsView)
    );

    ["popstate", "DOMContentLoaded"].forEach((event) => {
      window.addEventListener(event, this._loadJobDetailsFromURL.bind(this));
    });
  }

  async _loadJobDetailsFromURL() {
    const id = location.pathname.slice(1);

    if (!id) return;

    try {
      this.#jobDetailsView.renderSpinner();
      await this.#jobModel.fetchJob(id);
    } catch (e) {
      this.#errorView.render(
        "Sorry...",
        "Something went wrong fetching the job! Try later"
      );
    }
  }

  async _handleClickJobItem(hash) {
    try {
      const id = hash.slice(1);
      this.#jobDetailsView.renderSpinner();
      await this.#jobModel.fetchJob(id);
      history.pushState(null, "", path);
    } catch (e) {
      this.#errorView.render(
        "Sorry...",
        "Something went wrong fetching the job! Try later"
      );
    }
  }

  _handleBookmarkClick(hash) {
    const id = hash.slice(1);
    this.#jobModel.setBookmark(id);
  }

  async _handleFormSubmit(query) {
    try {
      this.#searchModel.query = query;
      this.#jobsListView.showSpinner();
      await this.#jobModel.fetchJobs(query);
      this.#searchBarView.clearInput();
    } catch (e) {
      console.log(e);
      this.#errorView.render("Invalid Search", e.message);
      this.#jobsListView.hiddeSpinner();
    }
  }
}

//const app = new JobsController();

export default JobsController;
