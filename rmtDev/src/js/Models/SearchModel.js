import AbstractModel from "./AbstractModel";

class SearchModel extends AbstractModel {
  #query = "";

  get query() {
    return this.#query.trim().toLowerCase();
  }

  set query(value) {
    try {
      this._validate(value);
      this.#query = String(value);
    } catch (e) {
      throw Error(e.message);
    }
  }

 
  _validate(value) {
    let errorMsg = "";
    if (/[\d]/.test(value)) {
      errorMsg = "The query must contain only letters...";
    }

    if (value.length <= 2) {
      errorMsg = "The query must include at least 2 characters...";
    }

    if (!value) {
      errorMsg = "Please, enter some job to start...";
    }

    if (errorMsg) throw new Error(errorMsg);
  }
}

export default SearchModel;
