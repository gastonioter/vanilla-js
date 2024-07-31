function Spinner(type) {
  const spinner = document.querySelector(type);

  function render() {
    spinner.classList.toggle("spinner--visible", true);
  }

  function hidde() {
    spinner.classList.toggle("spinner--visible", false);
  }

  return {
    render,
    hidde,
  };
}

export default Spinner;
