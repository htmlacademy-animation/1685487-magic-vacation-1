export default () => {
  // ! module 1
  function loadBodyHandler() {
    let body = document.getElementsByTagName('body')[0]
    body.classList.add('onload')
    window.removeEventListener("load", loadBodyHandler, false);
  }
  window.addEventListener("load", loadBodyHandler, false);

  // ! module 2
  function animateText(domEl, animationSettings = {}) {
    let text = domEl.innerHTML
    domEl.innerHTML = ''
    let stringSpan = document.createElement('span')
    for (let letter of text.split('')) {
      let letterSpan = document.createElement('span')
      letterSpan.textContent = letter
      stringSpan.appendChild(letterSpan)
    }
    domEl.appendChild(stringSpan)
  }

  let mainTitle = document.getElementById('mainTitle')
  animateText(mainTitle)
}
