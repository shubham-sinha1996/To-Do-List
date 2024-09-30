// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/storage.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveToStore = exports.getFromStore = void 0;
const saveToStore = (toDoList, completedList) => {
  window.localStorage.setItem('to_Do_List', JSON.stringify(toDoList));
  window.localStorage.setItem('completed_List', JSON.stringify(completedList));
};
exports.saveToStore = saveToStore;
const getFromStore = () => {
  const getListStore = window.localStorage.getItem('to_Do_List');
  const getcompletedListStore = window.localStorage.getItem('completed_List');
  return {
    active: getListStore ? JSON.parse(getListStore) : [],
    completed: getcompletedListStore ? JSON.parse(getcompletedListStore) : []
  };
};
exports.getFromStore = getFromStore;
},{}],"js/model.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setPriority = exports.removeItem = exports.getList = exports.getCompletedList = exports.clearCompleted = exports.bootUp = exports.addtoCompletedList = exports.addToList = void 0;
var _storage = require("./storage");
let toDoList = [];
let completedList = [];
const addToList = task => {
  toDoList.push({
    id: `${parseInt(Math.random() * 500000)}`,
    task,
    priority: 'normal'
  });
  (0, _storage.saveToStore)(toDoList, completedList);
};
exports.addToList = addToList;
const setPriority = (id, priority) => {
  toDoList = toDoList.map(item => {
    if (item.id === id) {
      return {
        ...item,
        priority
      };
    }
    return item;
  });
  (0, _storage.saveToStore)(toDoList, completedList);
};
exports.setPriority = setPriority;
const removeItem = id => {
  toDoList = toDoList.filter(el => el.id !== id);
  (0, _storage.saveToStore)(toDoList, completedList);
};
exports.removeItem = removeItem;
const addtoCompletedList = id => {
  completedList.push(toDoList.find(el => el.id === id));
  toDoList = toDoList.filter(el => el.id !== id);
  (0, _storage.saveToStore)(toDoList, completedList);
};
exports.addtoCompletedList = addtoCompletedList;
const clearCompleted = () => {
  completedList = [];
  (0, _storage.saveToStore)(toDoList, completedList);
};
exports.clearCompleted = clearCompleted;
const getList = () => toDoList;
exports.getList = getList;
const getCompletedList = () => completedList;
exports.getCompletedList = getCompletedList;
const bootUp = () => {
  const {
    active,
    completed
  } = (0, _storage.getFromStore)();
  console.log(active);
  console.log(completed);
  toDoList = active;
  completedList = completed;
};
exports.bootUp = bootUp;
},{"./storage":"js/storage.js"}],"js/Item.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const Item = (task, priority = 'normal', id) => {
  return `<div class="item ${priority}" data-id="${id}" draggable="true">
            <div class="task">${task}</div>
            <div class="priority-control">
              <span class="high"></span>
              <span class="normal"></span>
              <span class="low"></span>
            </div>
            <div class="remove-btn">REMOVE</div>
          </div>`;
};
var _default = exports.default = Item;
},{}],"js/view.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderList = exports.renderCompletedList = void 0;
var _model = require("./model");
var _Item = _interopRequireDefault(require("./Item"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const toDoList = document.querySelector('.do-list');
const completedDiv = document.querySelector('.completed');
const renderList = () => {
  const dom = (0, _model.getList)().map(({
    task,
    priority,
    id
  }) => {
    return (0, _Item.default)(task, priority, id);
  });
  toDoList.innerHTML = dom.join('');
};
exports.renderList = renderList;
const renderCompletedList = () => {
  const dom = (0, _model.getCompletedList)().map(({
    task,
    priority,
    id
  }) => {
    return (0, _Item.default)(task, priority, id);
  });
  completedDiv.innerHTML = dom.join('');
};
exports.renderCompletedList = renderCompletedList;
},{"./model":"js/model.js","./Item":"js/Item.js"}],"js/index.js":[function(require,module,exports) {
"use strict";

var _model = require("./model");
var _view = require("./view");
const inputFld = document.querySelector('input[type ="text"]');
const toDoList = document.querySelector('.do-list');
const completedDiv = document.querySelector('.completed');
const clear = document.querySelector('#clear-completed');
inputFld.addEventListener('keyup', function (evt) {
  evt.preventDefault();
  if (!(this.value === '') && evt.key === 'Enter') {
    //update toDoList
    (0, _model.addToList)(evt.target.value);
    //render toDoList
    (0, _view.renderList)();
    this.value = '';
  }
});
toDoList.addEventListener('click', function (evt) {
  if (evt.target.parentElement.classList.contains('priority-control')) {
    const priority = evt.target.classList.value;
    const id = evt.target.parentElement.parentElement.getAttribute('data-id');
    (0, _model.setPriority)(id, priority);
    (0, _view.renderList)();
  }
  if (evt.target.classList.contains('remove-btn')) {
    const id = evt.target.parentElement.getAttribute('data-id');
    const confirm = window.confirm('Are you sure?');
    if (confirm) {
      (0, _model.removeItem)(id);
      (0, _view.renderList)();
    }
  }
});
toDoList.addEventListener('dragstart', function (evt) {
  if (evt.target.classList.contains('item')) {
    const id = evt.target.getAttribute('data-id');
    evt.dataTransfer.setData('text/plain', id);
  }
});
completedDiv.addEventListener('drop', function (evt) {
  const id = evt.dataTransfer.getData('text/plain');
  (0, _model.addtoCompletedList)(id);
  (0, _view.renderList)();
  (0, _view.renderCompletedList)();
});
clear.addEventListener('click', function (evt) {
  evt.preventDefault();
  (0, _model.clearCompleted)();
  (0, _view.renderCompletedList)();
});
completedDiv.addEventListener('dragover', function (evt) {
  evt.preventDefault();
});
(() => {
  (0, _model.bootUp)();
  (0, _view.renderList)();
  (0, _view.renderCompletedList)();
})();
},{"./model":"js/model.js","./view":"js/view.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57518" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map