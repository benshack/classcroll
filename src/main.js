// Defaults
const defaultOptions = {
  class: null,
  add: 0,
  remove: null,
  target: null,
}

// Shared Variables
let scrollers = [];
let listening = false;
let wHeight = window.innerHeight;

// Object Class
class ScrollObj {
  constructor(elem, options) {
      this.elem = elem;
      this.classes = [];
      this.parseOptions(options);
      this.queryTargets();
      this.controller();
  }

  parseOptions(options) {
      if (typeof(options) === 'string') {
          this.classes.push({...defaultOptions, ...{class:options}});
          return;
      }

      if (Array.isArray(options)) {
          Array.from(options).forEach(option => {
              this.classes.push({...defaultOptions, ...option});
          })
          return;
      }

      if (typeof(options) === 'object') {
          this.classes.push({...defaultOptions, ...options});
          return
      }
  }

  queryTargets() {
      Array.from(this.classes).forEach(c => {
          c.target = c.target ? document.querySelector(`${c.target}`) : this.elem;
      })
  }

  pos() {
      const rect = this.elem.getBoundingClientRect();
      const height = wHeight + rect.height;
      const pos = Math.floor((height - (rect.top + rect.height)) / height * 100);
      return pos;
  }

  controller() {
      Array.from(this.classes).forEach(c => {
          if (this.pos() >= c.add) {
              c.target.classList.add(c.class);
          }

          if ((c.remove && this.pos() >= c.remove) || (c.remove && this.pos() < c.add)) {
              c.target.classList.remove(c.class);
          }
      })
  }
}

// Listeners
const initListeners = () => {
  window.addEventListener('resize', () => {
      wHeight = window.innerHeight;
      checkPosition();
  })

  window.addEventListener('scroll', () => {
      checkPosition();
  })
}

// Helpers
const makeScrollObj = (target, options) => {
  const elem = new ScrollObj(target, options);
  scrollers.push(elem);
}

const checkPosition = () => {
  Array.from(scrollers).forEach(elem => {
      elem.controller();
  })
}

// Export
export default (target, options = {}) => {
  if (typeof(target) === 'string') {
      target = document.querySelectorAll(`${target}`);
  }

  if (target.length <= 0) return false;

  if (target) {
      if (target.length) {
          Array.from(target).forEach(elem => {
              makeScrollObj(elem, options);
          })
      } else {
          makeScrollObj(elem, options);
      }

      if (!listening) {
          initListeners();
          listening = true;
      }
  }
}
