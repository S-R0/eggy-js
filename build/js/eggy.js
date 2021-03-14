function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*!
 * Eggy JS 1.0.0
*/
class Builder {
  //Constructor
  constructor(userOptions) {
    //Build our default options
    this.options = _objectSpread(_objectSpread({}, {
      title: 'Success',
      message: 'Task complete successfully!',
      position: 'top-right',
      type: 'success',
      styles: true,
      duration: 5000
    }), userOptions);
  }
  /**
   * Create a new toast
   * 
   * @return {Promise}
  */


  create() {
    var _this = this;

    return _asyncToGenerator(function* () {
      //Add our styling
      yield Promise.all([_this.addStyling(), _this.addTheme()]); //Build it

      var toast = yield _this.build(); //Toast bindings

      yield _this.bindings(toast); //Once its buil, open it after a split second

      setTimeout(() => {
        toast.classList.add('open');
      }, 250); //Wait the specified time in the options then close it

      setTimeout(() => {
        _this.destroyToast(toast);
      }, _this.options.duration); //Done

      return toast;
    })();
  }
  /**
   * Build the popup
   * 
   * @return {Promise} HTMLElement The new toast
  */


  build() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      //Check if its already open
      var wrapper = yield _this2.isAlreadyOpen();

      if (!wrapper) {
        //Create one
        wrapper = yield _this2.createWrapper();
      } //Create the toast


      var toast = yield _this2.createToast(); //Put the toast in the wrapper

      wrapper.appendChild(toast); //Add it to the page

      document.querySelector('body').appendChild(wrapper); //Resolve

      return toast;
    })();
  }
  /**
   * Create the toast element
   * 
   * @return {Promise} 
  */


  createToast() {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      //Create the element
      var toast = document.createElement('div'),
          innerWrapper = document.createElement('div'),
          title = document.createElement('p'),
          message = document.createElement('p'); //Generate a random toast id

      toast.setAttribute('id', 'eggy-' + Math.random().toString(36).substr(2, 4)); //Set toast attributes

      toast.classList.add(_this3.options.type); //Set title attributes and content

      title.classList.add('title');
      title.innerHTML = _this3.options.title; //Set message attributes and content

      message.classList.add('message');
      message.innerHTML = _this3.options.message; //Append the items to the inner wrapper

      innerWrapper.appendChild(title);
      innerWrapper.appendChild(message); //Append the icon, inner wrapper and close btn to the toast

      toast.innerHTML = yield _this3.getIconContent();
      toast.appendChild(innerWrapper);
      toast.innerHTML += yield _this3.getCloseBtnContent(); //Return it

      return toast;
    })();
  }
  /**
   * Destroy the toast, remove it!
   * 
   * @param {HTMLElement} toast - The toast element we're removing
   * @return {Promise}
  */


  destroyToast(toast) {
    return _asyncToGenerator(function* () {
      //Add the closing class for smooth closing
      toast.classList.add('closing'); //After 200ms (the length of the css animation plus a bit), remove it

      setTimeout(() => {
        toast.remove();
      }, 450);
    })();
  }
  /**
   * Add all of the bindings for the toast
   * 
   * @param {HTMLElement} toast - The toast we're building the bindings for
   * @return {Promise}
  */


  bindings(toast) {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      //Close btn
      toast.querySelector('.close-btn').addEventListener('click', /*#__PURE__*/_asyncToGenerator(function* () {
        _this4.destroyToast(toast);
      }));
    })();
  }
  /**
   * Create the element that the toasts are wrapped in
   * 
   * @return {Promise} The wrapper HTML Element
  */


  createWrapper() {
    var _this5 = this;

    return _asyncToGenerator(function* () {
      //Create the element
      var wrapper = document.createElement('div'); //Set its attributes

      wrapper.classList.add('eggy', _this5.options.position); //Return it

      return wrapper;
    })();
  }
  /**
   * Check if there is already a toast initialised in the specified position
   * 
   * @return {Promise} The wrapper if it exists, false if it doesnt
  */


  isAlreadyOpen() {
    var _this6 = this;

    return _asyncToGenerator(function* () {
      //Get the wrapper
      var wrapper = document.querySelector(".eggy.".concat(_this6.options.position));
      return wrapper ? wrapper : false;
    })();
  }
  /**
   * Get the icons content
   * 
   * @return {Promise}
  */


  getIconContent() {
    var _this7 = this;

    return _asyncToGenerator(function* () {
      //Switch the type
      switch (_this7.options.type) {
        case 'success':
          return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 6.48 6.47998 2 12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.47998 22 2 17.52 2 12ZM5 12L10 17L19 8L17.59 6.58L10 14.17L6.41003 10.59L5 12Z"></path></svg>';
          break;

        case 'info':
          return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><g id="icon/action/info_24px"><path id="icon/action/info_24px_2" fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.47998 2 2 6.48 2 12C2 17.52 6.47998 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 17C11.45 17 11 16.55 11 16V12C11 11.45 11.45 11 12 11C12.55 11 13 11.45 13 12V16C13 16.55 12.55 17 12 17ZM11 7V9H13V7H11Z"></path></g></svg>';
          break;

        case 'warning':
          return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><g id="icon/alert/warning_24px"><path id="icon/alert/warning_24px_2" fill-rule="evenodd" clip-rule="evenodd" d="M19.53 20.5037C21.07 20.5037 22.03 18.8337 21.26 17.5037L13.73 4.49374C12.96 3.16375 11.04 3.16375 10.27 4.49374L2.74001 17.5037C1.96999 18.8337 2.93001 20.5037 4.46999 20.5037H19.53ZM12 13.5037C11.45 13.5037 11 13.0537 11 12.5037V10.5037C11 9.95376 11.45 9.50375 12 9.50375C12.55 9.50375 13 9.95376 13 10.5037V12.5037C13 13.0537 12.55 13.5037 12 13.5037ZM11 15.5037V17.5037H13V15.5037H11Z"></path></g></svg>';
          break;

        case 'error':
          return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><g id="icon/alert/error_24px"><path id="icon/alert/error_24px_2" fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.47998 2 2 6.48001 2 12C2 17.52 6.47998 22 12 22C17.52 22 22 17.52 22 12C22 6.48001 17.52 2 12 2ZM12 13C11.45 13 11 12.55 11 12V8C11 7.45001 11.45 7 12 7C12.55 7 13 7.45001 13 8V12C13 12.55 12.55 13 12 13ZM11 15V17H13V15H11Z"></path></g></svg>';
          break;
      }
    })();
  }
  /**
   * Get the close content
   * 
   * @return {Promise}
  */


  getCloseBtnContent() {
    return _asyncToGenerator(function* () {
      return '<svg class="close-btn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><g id="icon/navigation/close_24px"><path id="icon/navigation/close_24px_2" d="M18.3 5.70999C18.1131 5.52273 17.8595 5.4175 17.595 5.4175C17.3305 5.4175 17.0768 5.52273 16.89 5.70999L12 10.59L7.10997 5.69999C6.92314 5.51273 6.66949 5.4075 6.40497 5.4075C6.14045 5.4075 5.8868 5.51273 5.69997 5.69999C5.30997 6.08999 5.30997 6.71999 5.69997 7.10999L10.59 12L5.69997 16.89C5.30997 17.28 5.30997 17.91 5.69997 18.3C6.08997 18.69 6.71997 18.69 7.10997 18.3L12 13.41L16.89 18.3C17.28 18.69 17.91 18.69 18.3 18.3C18.69 17.91 18.69 17.28 18.3 16.89L13.41 12L18.3 7.10999C18.68 6.72999 18.68 6.08999 18.3 5.70999Z"></path></g></svg>';
    })();
  }
  /**
   * Add the mandatory styling to the page
   * 
   * @return {Promise}
  */


  addStyling() {
    return _asyncToGenerator(function* () {
      //If there is no page styling already
      if (!document.querySelector('.eggy-styles')) {
        //Create the style tag
        var styles = document.createElement('style'); //Add a class

        styles.classList.add('eggy-styles'); //Populate it

        styles.innerHTML = '.eggy{position:fixed;width:400px;max-width:90%;padding:1rem;top:0}.eggy,.eggy>div{overflow:hidden;box-sizing:border-box}.eggy>div{width:100%;transition:opacity .3s ease,left .2s ease,right .2s ease,max-height .4s,margin-top .4s,padding .4s;position:relative;opacity:0;max-height:200px;margin-top:10px;border-radius:4px;padding:.75rem 1rem;background:#fff;display:grid;grid-template-columns:1fr 5fr 1fr;grid-gap:.5rem;align-items:center;z-index:2}.eggy>div.open{opacity:1}.eggy>div.closing{max-height:0;opacity:0;margin-top:0;padding:0}.eggy.top-right{right:0}.eggy.top-right>div{right:-425px}.eggy.top-right>div.open{right:0}.eggy.top-left{left:0}.eggy.top-left>div{left:-425px}.eggy.top-left>div.open{left:0}'; //Add to the head

        document.querySelector('head').appendChild(styles);
      } //Resolve


      return;
    })();
  }
  /**
   * Add the theme styling to the page
  */


  addTheme() {
    var _this8 = this;

    return _asyncToGenerator(function* () {
      //If there is no page styling already
      if (!document.querySelector('.eggy-theme') && _this8.options.styles) {
        //Create the style tag
        var styles = document.createElement('style'); //Add a class

        styles.classList.add('eggy-theme'); //Populate it

        styles.innerHTML = '@-webkit-keyframes progressBar{0%{left:0}to{left:-105%}}@keyframes progressBar{0%{left:0}to{left:-105%}}.eggy>div.success{border:2px solid #61c9a8}.eggy>div.success svg:first-of-type{fill:#61c9a8}.eggy>div.warning{border:2px solid #ed9b40}.eggy>div.warning svg:first-of-type{fill:#ed9b40}.eggy>div.info{border:2px solid #40a2ed}.eggy>div.info svg:first-of-type{fill:#40a2ed}.eggy>div.error{border:2px solid #d64550}.eggy>div.error svg:first-of-type{fill:#d64550}.eggy>div svg:first-of-type{width:30px;z-index:2}.eggy>div svg:last-of-type{z-index:2;width:25px;fill:#8d8d8d;justify-self:center;cursor:pointer}.eggy>div>div .message,.eggy>div>div .title{margin:.1rem 0;color:#404040}.eggy>div>div .message.title,.eggy>div>div .title.title{font-weight:700;font-size:.9rem}.eggy>div>div .message.message,.eggy>div>div .title.message{font-weight:400;font-size:.8rem}.eggy>div .progress-bar{height:100%;width:105%;position:absolute;top:0;left:0;background-color:rgba(97,201,168,.1);z-index:1;-webkit-clip-path:polygon(0 0,100% 0,95% 100%,0 100%);clip-path:polygon(0 0,100% 0,95% 100%,0 100%)}'; //Add to the head

        document.querySelector('head').appendChild(styles);
      } //Resolve


      return;
    })();
  }

} //Export the Eggy function for use


export var Eggy = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (options) {
    //Start a new Eggy Toast
    var newBuild = new Builder(options); //Run the build

    return yield newBuild.create();
  });

  return function Eggy(_x) {
    return _ref2.apply(this, arguments);
  };
}();