import Router from "./Router.js";
import "./views/SearchBar.js";
import "./views/JobList.js";
import "./views/JobDetail.JS";
import './views/Sidebar.js'

document.addEventListener("DOMContentLoaded", init);

function init() {
  Router.init();
}
