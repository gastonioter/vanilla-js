import SearchBarView from "../Views/SearchBarView";
import JobsModel from "../Models/JobModel";
import SearchModel from "../Models/SearchModel";
import Error from "../Views/Error";

class JobsController {
  #searchBarView = new SearchBarView();
  #searchModel = new SearchModel();
  #errorView = new Error();

  constructor() {
    this.#searchBarView.addHandlerSearch((query) => {
      try {
        this.#searchModel.query = query;
        this.#searchBarView.clearInput();
      } catch (e) {
        this.#errorView.render("Invalid Search", e.message);
      }
    });
  }
}
const app = new JobsController();
