export default () => {
  // ! module 1
  function loadBodyHandler() {
    let body = document.getElementsByTagName('body')[0]
    body.classList.add('onload')
    window.removeEventListener("load", loadBodyHandler, false);
  }
  window.addEventListener("load", loadBodyHandler, false);

  // ! module 2
  class textAnimationBuild {
    constructor(
      selector,
      timer,
      activateClass,
      property,
      everyLetter,
    ) {
      this._TIME_SPACE = 100

      this._selector = selector
      // появление одной буквы
      this._timer = timer
      this._activateClass = activateClass
      this._property = property
      // Через какую букву повторяется
      this._everyLetter = everyLetter

      // Разница в появлении между баквами
      this._pause = 30
      this._element = document.querySelector(this._selector)
      this._timeOffset = 0

      this.prepareText()
    }

    runAnimation() {
      if (!this._element) {
        return;
      }
      this._element.classList.add(this._activateClass);
    }

    destroyAnimation() {
      this._element.classList.remove(this._activateClass);
    }

    prepareText() {
      if (!this._element) {
        return
      }

      const wordsArray = this._element.textContent.trim().split(' ')

      let finallyFragment = document.createDocumentFragment()

      for (let [index, word] of wordsArray.entries()) {
        let wordContainer = document.createElement('span')
        wordContainer.classList.add(`text__word`);
        let timeDelay = index * this._pause * this._everyLetter * this._timer * 2 / this._timer

        for (let [index, letter] of Array.from(word).entries()) {
          if (!((index + 1) % this._everyLetter) || index + 1 === word.length) {
            this._timeOffset = timeDelay + 0
          } else {
            this._timeOffset = timeDelay + (this._pause * this._everyLetter - ((index + 1) % this._everyLetter) * this._pause)
          }
          wordContainer.appendChild(this.getSpanFromLetter(letter))
        }
        finallyFragment.appendChild(wordContainer);
      }

      this._element.innerHTML = ''
      this._element.appendChild(finallyFragment)
    }

    getSpanFromLetter(letter) {
      let span = document.createElement('span')
      span.textContent = letter
      span.style.transition = `${this._property} ${this._timer}ms ease-in-out ${this._timeOffset}ms`;
      return span
    }
  }

  // дата проведения конкурса
  let dateEvent = new textAnimationBuild(`.intro__date`, 400, `intro__date-active`, 'transform', 2)
  setTimeout(() => {
    dateEvent.runAnimation();
  }, 100);

  // Массив заголовков, для которых нужна анимация
  let titles = [
    { name: 'top', class: 'intro__title', everyLetter: 3, time: 100 },
    { name: 'story', class: 'slider__item-title', everyLetter: 3, time: 100 },
    { name: 'prizes', class: 'prizes__title', everyLetter: 2, time: 500 },
    { name: 'rules', class: 'rules__title', everyLetter: 2, time: 100 },
    { name: 'game', class: 'game__title', everyLetter: 2, time: 100 }
  ]
  // Обект, где ключ - название заголовка, значение - экземпляр класса для этого заголовка
  let vars = {}

  // Создаем классы для всех обозначенных заголовков страниц с анимацией
  // Запускаем, чтобы при открытии любой страницы происходила анимация
  for (let title of titles) {
    vars[`${title.name}AnimationTitle`] = new textAnimationBuild(`.${title.class}`, 400, `${title.class}-active`, 'transform', title.everyLetter)
    setTimeout(() => {
      vars[`${title.name}AnimationTitle`].runAnimation();
    }, title.time);
  }
  // клики по пунктам меню
  let links = document.querySelectorAll('.js-menu-link')
  for (let link of links) {
    link.onclick = startAnimateTitle
  }
  // клик по логотипу
  let logo = document.querySelector('.page-header__logo')
  logo.onclick = startAnimateTitle

  function startAnimateTitle(event) {
    let name = event.target.getAttribute('data-href')
    if (!name) {
      name = 'top'
    }
    if (name === 'top') {
      dateEvent.destroyAnimation()
      setTimeout(() => {
        dateEvent.runAnimation();
      }, 100);
    }
    vars[`${name}AnimationTitle`].destroyAnimation()
    setTimeout(() => {
      vars[`${name}AnimationTitle`].runAnimation();
    }, titles.find(title => title.name === name).time);
  } 
}
