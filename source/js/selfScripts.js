export default () => {
  // ! module 1
  function loadBodyHandler() {
    let body = document.getElementsByTagName('body')[0]
    body.classList.add('onload')
    window.removeEventListener("load", loadBodyHandler, false);
  }

  window.addEventListener("load", loadBodyHandler, false);
}