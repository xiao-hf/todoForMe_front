var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global2 = uni.requireGlobal();
  ArrayBuffer = global2.ArrayBuffer;
  Int8Array = global2.Int8Array;
  Uint8Array = global2.Uint8Array;
  Uint8ClampedArray = global2.Uint8ClampedArray;
  Int16Array = global2.Int16Array;
  Uint16Array = global2.Uint16Array;
  Int32Array = global2.Int32Array;
  Uint32Array = global2.Uint32Array;
  Float32Array = global2.Float32Array;
  Float64Array = global2.Float64Array;
  BigInt64Array = global2.BigInt64Array;
  BigUint64Array = global2.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  var _a;
  const fontData = [
    {
      "font_class": "arrow-down",
      "unicode": ""
    },
    {
      "font_class": "arrow-left",
      "unicode": ""
    },
    {
      "font_class": "arrow-right",
      "unicode": ""
    },
    {
      "font_class": "arrow-up",
      "unicode": ""
    },
    {
      "font_class": "auth",
      "unicode": ""
    },
    {
      "font_class": "auth-filled",
      "unicode": ""
    },
    {
      "font_class": "back",
      "unicode": ""
    },
    {
      "font_class": "bars",
      "unicode": ""
    },
    {
      "font_class": "calendar",
      "unicode": ""
    },
    {
      "font_class": "calendar-filled",
      "unicode": ""
    },
    {
      "font_class": "camera",
      "unicode": ""
    },
    {
      "font_class": "camera-filled",
      "unicode": ""
    },
    {
      "font_class": "cart",
      "unicode": ""
    },
    {
      "font_class": "cart-filled",
      "unicode": ""
    },
    {
      "font_class": "chat",
      "unicode": ""
    },
    {
      "font_class": "chat-filled",
      "unicode": ""
    },
    {
      "font_class": "chatboxes",
      "unicode": ""
    },
    {
      "font_class": "chatboxes-filled",
      "unicode": ""
    },
    {
      "font_class": "chatbubble",
      "unicode": ""
    },
    {
      "font_class": "chatbubble-filled",
      "unicode": ""
    },
    {
      "font_class": "checkbox",
      "unicode": ""
    },
    {
      "font_class": "checkbox-filled",
      "unicode": ""
    },
    {
      "font_class": "checkmarkempty",
      "unicode": ""
    },
    {
      "font_class": "circle",
      "unicode": ""
    },
    {
      "font_class": "circle-filled",
      "unicode": ""
    },
    {
      "font_class": "clear",
      "unicode": ""
    },
    {
      "font_class": "close",
      "unicode": ""
    },
    {
      "font_class": "closeempty",
      "unicode": ""
    },
    {
      "font_class": "cloud-download",
      "unicode": ""
    },
    {
      "font_class": "cloud-download-filled",
      "unicode": ""
    },
    {
      "font_class": "cloud-upload",
      "unicode": ""
    },
    {
      "font_class": "cloud-upload-filled",
      "unicode": ""
    },
    {
      "font_class": "color",
      "unicode": ""
    },
    {
      "font_class": "color-filled",
      "unicode": ""
    },
    {
      "font_class": "compose",
      "unicode": ""
    },
    {
      "font_class": "contact",
      "unicode": ""
    },
    {
      "font_class": "contact-filled",
      "unicode": ""
    },
    {
      "font_class": "down",
      "unicode": ""
    },
    {
      "font_class": "bottom",
      "unicode": ""
    },
    {
      "font_class": "download",
      "unicode": ""
    },
    {
      "font_class": "download-filled",
      "unicode": ""
    },
    {
      "font_class": "email",
      "unicode": ""
    },
    {
      "font_class": "email-filled",
      "unicode": ""
    },
    {
      "font_class": "eye",
      "unicode": ""
    },
    {
      "font_class": "eye-filled",
      "unicode": ""
    },
    {
      "font_class": "eye-slash",
      "unicode": ""
    },
    {
      "font_class": "eye-slash-filled",
      "unicode": ""
    },
    {
      "font_class": "fire",
      "unicode": ""
    },
    {
      "font_class": "fire-filled",
      "unicode": ""
    },
    {
      "font_class": "flag",
      "unicode": ""
    },
    {
      "font_class": "flag-filled",
      "unicode": ""
    },
    {
      "font_class": "folder-add",
      "unicode": ""
    },
    {
      "font_class": "folder-add-filled",
      "unicode": ""
    },
    {
      "font_class": "font",
      "unicode": ""
    },
    {
      "font_class": "forward",
      "unicode": ""
    },
    {
      "font_class": "gear",
      "unicode": ""
    },
    {
      "font_class": "gear-filled",
      "unicode": ""
    },
    {
      "font_class": "gift",
      "unicode": ""
    },
    {
      "font_class": "gift-filled",
      "unicode": ""
    },
    {
      "font_class": "hand-down",
      "unicode": ""
    },
    {
      "font_class": "hand-down-filled",
      "unicode": ""
    },
    {
      "font_class": "hand-up",
      "unicode": ""
    },
    {
      "font_class": "hand-up-filled",
      "unicode": ""
    },
    {
      "font_class": "headphones",
      "unicode": ""
    },
    {
      "font_class": "heart",
      "unicode": ""
    },
    {
      "font_class": "heart-filled",
      "unicode": ""
    },
    {
      "font_class": "help",
      "unicode": ""
    },
    {
      "font_class": "help-filled",
      "unicode": ""
    },
    {
      "font_class": "home",
      "unicode": ""
    },
    {
      "font_class": "home-filled",
      "unicode": ""
    },
    {
      "font_class": "image",
      "unicode": ""
    },
    {
      "font_class": "image-filled",
      "unicode": ""
    },
    {
      "font_class": "images",
      "unicode": ""
    },
    {
      "font_class": "images-filled",
      "unicode": ""
    },
    {
      "font_class": "info",
      "unicode": ""
    },
    {
      "font_class": "info-filled",
      "unicode": ""
    },
    {
      "font_class": "left",
      "unicode": ""
    },
    {
      "font_class": "link",
      "unicode": ""
    },
    {
      "font_class": "list",
      "unicode": ""
    },
    {
      "font_class": "location",
      "unicode": ""
    },
    {
      "font_class": "location-filled",
      "unicode": ""
    },
    {
      "font_class": "locked",
      "unicode": ""
    },
    {
      "font_class": "locked-filled",
      "unicode": ""
    },
    {
      "font_class": "loop",
      "unicode": ""
    },
    {
      "font_class": "mail-open",
      "unicode": ""
    },
    {
      "font_class": "mail-open-filled",
      "unicode": ""
    },
    {
      "font_class": "map",
      "unicode": ""
    },
    {
      "font_class": "map-filled",
      "unicode": ""
    },
    {
      "font_class": "map-pin",
      "unicode": ""
    },
    {
      "font_class": "map-pin-ellipse",
      "unicode": ""
    },
    {
      "font_class": "medal",
      "unicode": ""
    },
    {
      "font_class": "medal-filled",
      "unicode": ""
    },
    {
      "font_class": "mic",
      "unicode": ""
    },
    {
      "font_class": "mic-filled",
      "unicode": ""
    },
    {
      "font_class": "micoff",
      "unicode": ""
    },
    {
      "font_class": "micoff-filled",
      "unicode": ""
    },
    {
      "font_class": "minus",
      "unicode": ""
    },
    {
      "font_class": "minus-filled",
      "unicode": ""
    },
    {
      "font_class": "more",
      "unicode": ""
    },
    {
      "font_class": "more-filled",
      "unicode": ""
    },
    {
      "font_class": "navigate",
      "unicode": ""
    },
    {
      "font_class": "navigate-filled",
      "unicode": ""
    },
    {
      "font_class": "notification",
      "unicode": ""
    },
    {
      "font_class": "notification-filled",
      "unicode": ""
    },
    {
      "font_class": "paperclip",
      "unicode": ""
    },
    {
      "font_class": "paperplane",
      "unicode": ""
    },
    {
      "font_class": "paperplane-filled",
      "unicode": ""
    },
    {
      "font_class": "person",
      "unicode": ""
    },
    {
      "font_class": "person-filled",
      "unicode": ""
    },
    {
      "font_class": "personadd",
      "unicode": ""
    },
    {
      "font_class": "personadd-filled",
      "unicode": ""
    },
    {
      "font_class": "personadd-filled-copy",
      "unicode": ""
    },
    {
      "font_class": "phone",
      "unicode": ""
    },
    {
      "font_class": "phone-filled",
      "unicode": ""
    },
    {
      "font_class": "plus",
      "unicode": ""
    },
    {
      "font_class": "plus-filled",
      "unicode": ""
    },
    {
      "font_class": "plusempty",
      "unicode": ""
    },
    {
      "font_class": "pulldown",
      "unicode": ""
    },
    {
      "font_class": "pyq",
      "unicode": ""
    },
    {
      "font_class": "qq",
      "unicode": ""
    },
    {
      "font_class": "redo",
      "unicode": ""
    },
    {
      "font_class": "redo-filled",
      "unicode": ""
    },
    {
      "font_class": "refresh",
      "unicode": ""
    },
    {
      "font_class": "refresh-filled",
      "unicode": ""
    },
    {
      "font_class": "refreshempty",
      "unicode": ""
    },
    {
      "font_class": "reload",
      "unicode": ""
    },
    {
      "font_class": "right",
      "unicode": ""
    },
    {
      "font_class": "scan",
      "unicode": ""
    },
    {
      "font_class": "search",
      "unicode": ""
    },
    {
      "font_class": "settings",
      "unicode": ""
    },
    {
      "font_class": "settings-filled",
      "unicode": ""
    },
    {
      "font_class": "shop",
      "unicode": ""
    },
    {
      "font_class": "shop-filled",
      "unicode": ""
    },
    {
      "font_class": "smallcircle",
      "unicode": ""
    },
    {
      "font_class": "smallcircle-filled",
      "unicode": ""
    },
    {
      "font_class": "sound",
      "unicode": ""
    },
    {
      "font_class": "sound-filled",
      "unicode": ""
    },
    {
      "font_class": "spinner-cycle",
      "unicode": ""
    },
    {
      "font_class": "staff",
      "unicode": ""
    },
    {
      "font_class": "staff-filled",
      "unicode": ""
    },
    {
      "font_class": "star",
      "unicode": ""
    },
    {
      "font_class": "star-filled",
      "unicode": ""
    },
    {
      "font_class": "starhalf",
      "unicode": ""
    },
    {
      "font_class": "trash",
      "unicode": ""
    },
    {
      "font_class": "trash-filled",
      "unicode": ""
    },
    {
      "font_class": "tune",
      "unicode": ""
    },
    {
      "font_class": "tune-filled",
      "unicode": ""
    },
    {
      "font_class": "undo",
      "unicode": ""
    },
    {
      "font_class": "undo-filled",
      "unicode": ""
    },
    {
      "font_class": "up",
      "unicode": ""
    },
    {
      "font_class": "top",
      "unicode": ""
    },
    {
      "font_class": "upload",
      "unicode": ""
    },
    {
      "font_class": "upload-filled",
      "unicode": ""
    },
    {
      "font_class": "videocam",
      "unicode": ""
    },
    {
      "font_class": "videocam-filled",
      "unicode": ""
    },
    {
      "font_class": "vip",
      "unicode": ""
    },
    {
      "font_class": "vip-filled",
      "unicode": ""
    },
    {
      "font_class": "wallet",
      "unicode": ""
    },
    {
      "font_class": "wallet-filled",
      "unicode": ""
    },
    {
      "font_class": "weibo",
      "unicode": ""
    },
    {
      "font_class": "weixin",
      "unicode": ""
    }
  ];
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const getVal = (val) => {
    const reg = /^[0-9]*$/g;
    return typeof val === "number" || reg.test(val) ? val + "px" : val;
  };
  const _sfc_main$j = {
    name: "UniIcons",
    emits: ["click"],
    props: {
      type: {
        type: String,
        default: ""
      },
      color: {
        type: String,
        default: "#333333"
      },
      size: {
        type: [Number, String],
        default: 16
      },
      customPrefix: {
        type: String,
        default: ""
      },
      fontFamily: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        icons: fontData
      };
    },
    computed: {
      unicode() {
        let code = this.icons.find((v) => v.font_class === this.type);
        if (code) {
          return code.unicode;
        }
        return "";
      },
      iconSize() {
        return getVal(this.size);
      },
      styleObj() {
        if (this.fontFamily !== "") {
          return `color: ${this.color}; font-size: ${this.iconSize}; font-family: ${this.fontFamily};`;
        }
        return `color: ${this.color}; font-size: ${this.iconSize};`;
      }
    },
    methods: {
      _onClick() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "text",
      {
        style: vue.normalizeStyle($options.styleObj),
        class: vue.normalizeClass(["uni-icons", ["uniui-" + $props.type, $props.customPrefix, $props.customPrefix ? $props.type : ""]]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options._onClick && $options._onClick(...args))
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$i], ["__scopeId", "data-v-d31e1c47"], ["__file", "C:/Users/Administrator/Documents/HBuilderProjects/todoPlus/uni_modules/uni-icons/components/uni-icons/uni-icons.vue"]]);
  const ON_SHOW = "onShow";
  const ON_LOAD = "onLoad";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return typeof component === "string" ? easycom : component;
  }
  const createHook = (lifecycle) => (hook, target = vue.getCurrentInstance()) => {
    !vue.isInSSRComponentSetup && vue.injectHook(lifecycle, hook, target);
  };
  const onShow = /* @__PURE__ */ createHook(ON_SHOW);
  const onLoad = /* @__PURE__ */ createHook(ON_LOAD);
  const baseURL = "http://110.42.210.113:9999";
  const timeout = 3e4;
  const baseURL_ = baseURL;
  class Request {
    constructor() {
      this.baseURL = baseURL;
      this.timeout = timeout;
    }
    // 封装uni.request
    request(options) {
      return new Promise((resolve2, reject) => {
        let token = "";
        try {
          const userInfo = uni.getStorageSync("userInfo");
          if (userInfo) {
            const userData = typeof userInfo === "string" ? JSON.parse(userInfo) : userInfo;
            token = userData.authorization || "";
          }
        } catch (error) {
          formatAppLog("error", "at utils/request.js:25", "获取token失败:", error);
          token = "";
        }
        uni.request({
          url: this.baseURL + options.url,
          method: options.method || "GET",
          data: options.data || {},
          header: {
            "Content-Type": "application/json",
            "Authorization": token ? `Bearer ${token}` : "",
            ...options.header
          },
          timeout: this.timeout,
          success: (res2) => {
            formatAppLog("log", "at utils/request.js:40", "API请求成功:", res2);
            if (res2.statusCode === 200) {
              if (res2.data.code === "200" || res2.data.code === 200) {
                resolve2(res2.data);
              } else {
                uni.showToast({
                  title: res2.data.message || "请求失败",
                  icon: "none"
                });
                reject(res2.data);
              }
            } else {
              uni.showToast({
                title: `请求失败 ${res2.statusCode}`,
                icon: "none"
              });
              reject(res2);
            }
          },
          fail: (err) => {
            formatAppLog("error", "at utils/request.js:62", "API请求失败:", err);
            uni.showToast({
              title: "网络请求失败",
              icon: "none"
            });
            reject(err);
          }
        });
      });
    }
    get(url, data, options = {}) {
      return this.request({
        url,
        method: "GET",
        data,
        ...options
      });
    }
    post(url, data, options = {}) {
      return this.request({
        url,
        method: "POST",
        data,
        ...options
      });
    }
    put(url, data, options = {}) {
      return this.request({
        url,
        method: "PUT",
        data,
        ...options
      });
    }
    delete(url, data, options = {}) {
      return this.request({
        url,
        method: "DELETE",
        data,
        ...options
      });
    }
  }
  const request = new Request();
  const login = (data) => {
    return request.post("/user/login", data);
  };
  const register = (data) => {
    return request.post("/user/register", data);
  };
  const logout = () => {
    return request.get("/user/logout");
  };
  const updatePassword = (data) => {
    return request.post("/user/updPassword", data);
  };
  const updPasswordCode = (phone) => {
    return request.get("/user/updPasswordCode/" + phone);
  };
  const upd = (nickname, backImg) => {
    return new Promise((resolve2, reject) => {
      const getAuthToken = () => {
        const userInfo = uni.getStorageSync("userInfo");
        return userInfo ? typeof userInfo === "string" ? JSON.parse(userInfo).authorization : userInfo.authorization : "";
      };
      if (backImg && backImg.path) {
        uni.uploadFile({
          url: request.baseURL + "/user/upd",
          filePath: backImg.path,
          name: "backImg",
          formData: {
            nickname
          },
          header: {
            "Authorization": getAuthToken()
          },
          success: (uploadRes) => {
            try {
              const result = JSON.parse(uploadRes.data);
              resolve2(result);
            } catch (e) {
              reject(e);
            }
          },
          fail: (error) => {
            reject(error);
          }
        });
      } else {
        uni.request({
          url: request.baseURL + "/user/upd",
          method: "POST",
          header: {
            "content-type": "application/x-www-form-urlencoded",
            "Authorization": getAuthToken()
          },
          data: {
            nickname
          },
          success: (res2) => {
            resolve2(res2.data);
          },
          fail: (error) => {
            reject(error);
          }
        });
      }
    });
  };
  const getUserInfo = () => {
    return request.get("/user/info");
  };
  const getMoney = () => {
    return request.get("/user/money");
  };
  const cost = (dif) => {
    return request.get("/user/cost/" + dif);
  };
  const userApi = { cost, login, register, logout, updatePassword, updPasswordCode, upd, getUserInfo, getMoney };
  var isVue2 = false;
  function set(target, key, val) {
    if (Array.isArray(target)) {
      target.length = Math.max(target.length, key);
      target.splice(key, 1, val);
      return val;
    }
    target[key] = val;
    return val;
  }
  function del(target, key) {
    if (Array.isArray(target)) {
      target.splice(key, 1);
      return;
    }
    delete target[key];
  }
  function getDevtoolsGlobalHook() {
    return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__;
  }
  function getTarget() {
    return typeof navigator !== "undefined" && typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {};
  }
  const isProxyAvailable = typeof Proxy === "function";
  const HOOK_SETUP = "devtools-plugin:setup";
  const HOOK_PLUGIN_SETTINGS_SET = "plugin:settings:set";
  let supported;
  let perf;
  function isPerformanceSupported() {
    var _a2;
    if (supported !== void 0) {
      return supported;
    }
    if (typeof window !== "undefined" && window.performance) {
      supported = true;
      perf = window.performance;
    } else if (typeof global !== "undefined" && ((_a2 = global.perf_hooks) === null || _a2 === void 0 ? void 0 : _a2.performance)) {
      supported = true;
      perf = global.perf_hooks.performance;
    } else {
      supported = false;
    }
    return supported;
  }
  function now$1() {
    return isPerformanceSupported() ? perf.now() : Date.now();
  }
  class ApiProxy {
    constructor(plugin, hook) {
      this.target = null;
      this.targetQueue = [];
      this.onQueue = [];
      this.plugin = plugin;
      this.hook = hook;
      const defaultSettings = {};
      if (plugin.settings) {
        for (const id in plugin.settings) {
          const item = plugin.settings[id];
          defaultSettings[id] = item.defaultValue;
        }
      }
      const localSettingsSaveId = `__vue-devtools-plugin-settings__${plugin.id}`;
      let currentSettings = Object.assign({}, defaultSettings);
      try {
        const raw = localStorage.getItem(localSettingsSaveId);
        const data = JSON.parse(raw);
        Object.assign(currentSettings, data);
      } catch (e) {
      }
      this.fallbacks = {
        getSettings() {
          return currentSettings;
        },
        setSettings(value) {
          try {
            localStorage.setItem(localSettingsSaveId, JSON.stringify(value));
          } catch (e) {
          }
          currentSettings = value;
        },
        now() {
          return now$1();
        }
      };
      if (hook) {
        hook.on(HOOK_PLUGIN_SETTINGS_SET, (pluginId, value) => {
          if (pluginId === this.plugin.id) {
            this.fallbacks.setSettings(value);
          }
        });
      }
      this.proxiedOn = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target.on[prop];
          } else {
            return (...args) => {
              this.onQueue.push({
                method: prop,
                args
              });
            };
          }
        }
      });
      this.proxiedTarget = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target[prop];
          } else if (prop === "on") {
            return this.proxiedOn;
          } else if (Object.keys(this.fallbacks).includes(prop)) {
            return (...args) => {
              this.targetQueue.push({
                method: prop,
                args,
                resolve: () => {
                }
              });
              return this.fallbacks[prop](...args);
            };
          } else {
            return (...args) => {
              return new Promise((resolve2) => {
                this.targetQueue.push({
                  method: prop,
                  args,
                  resolve: resolve2
                });
              });
            };
          }
        }
      });
    }
    async setRealTarget(target) {
      this.target = target;
      for (const item of this.onQueue) {
        this.target.on[item.method](...item.args);
      }
      for (const item of this.targetQueue) {
        item.resolve(await this.target[item.method](...item.args));
      }
    }
  }
  function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
    const descriptor = pluginDescriptor;
    const target = getTarget();
    const hook = getDevtoolsGlobalHook();
    const enableProxy = isProxyAvailable && descriptor.enableEarlyProxy;
    if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
      hook.emit(HOOK_SETUP, pluginDescriptor, setupFn);
    } else {
      const proxy = enableProxy ? new ApiProxy(descriptor, hook) : null;
      const list2 = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
      list2.push({
        pluginDescriptor: descriptor,
        setupFn,
        proxy
      });
      if (proxy)
        setupFn(proxy.proxiedTarget);
    }
  }
  /*!
   * pinia v2.1.7
   * (c) 2023 Eduardo San Martin Morote
   * @license MIT
   */
  let activePinia;
  const setActivePinia = (pinia) => activePinia = pinia;
  const getActivePinia = () => vue.hasInjectionContext() && vue.inject(piniaSymbol) || activePinia;
  const piniaSymbol = Symbol("pinia");
  function isPlainObject(o) {
    return o && typeof o === "object" && Object.prototype.toString.call(o) === "[object Object]" && typeof o.toJSON !== "function";
  }
  var MutationType;
  (function(MutationType2) {
    MutationType2["direct"] = "direct";
    MutationType2["patchObject"] = "patch object";
    MutationType2["patchFunction"] = "patch function";
  })(MutationType || (MutationType = {}));
  const IS_CLIENT = typeof window !== "undefined";
  const USE_DEVTOOLS = IS_CLIENT;
  const _global = /* @__PURE__ */ (() => typeof window === "object" && window.window === window ? window : typeof self === "object" && self.self === self ? self : typeof global === "object" && global.global === global ? global : typeof globalThis === "object" ? globalThis : { HTMLElement: null })();
  function bom(blob, { autoBom = false } = {}) {
    if (autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
      return new Blob([String.fromCharCode(65279), blob], { type: blob.type });
    }
    return blob;
  }
  function download(url, name, opts) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.onload = function() {
      saveAs(xhr.response, name, opts);
    };
    xhr.onerror = function() {
      console.error("could not download file");
    };
    xhr.send();
  }
  function corsEnabled(url) {
    const xhr = new XMLHttpRequest();
    xhr.open("HEAD", url, false);
    try {
      xhr.send();
    } catch (e) {
    }
    return xhr.status >= 200 && xhr.status <= 299;
  }
  function click(node) {
    try {
      node.dispatchEvent(new MouseEvent("click"));
    } catch (e) {
      const evt = document.createEvent("MouseEvents");
      evt.initMouseEvent("click", true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
      node.dispatchEvent(evt);
    }
  }
  const _navigator = typeof navigator === "object" ? navigator : { userAgent: "" };
  const isMacOSWebView = /* @__PURE__ */ (() => /Macintosh/.test(_navigator.userAgent) && /AppleWebKit/.test(_navigator.userAgent) && !/Safari/.test(_navigator.userAgent))();
  const saveAs = !IS_CLIENT ? () => {
  } : (
    // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
    typeof HTMLAnchorElement !== "undefined" && "download" in HTMLAnchorElement.prototype && !isMacOSWebView ? downloadSaveAs : (
      // Use msSaveOrOpenBlob as a second approach
      "msSaveOrOpenBlob" in _navigator ? msSaveAs : (
        // Fallback to using FileReader and a popup
        fileSaverSaveAs
      )
    )
  );
  function downloadSaveAs(blob, name = "download", opts) {
    const a = document.createElement("a");
    a.download = name;
    a.rel = "noopener";
    if (typeof blob === "string") {
      a.href = blob;
      if (a.origin !== location.origin) {
        if (corsEnabled(a.href)) {
          download(blob, name, opts);
        } else {
          a.target = "_blank";
          click(a);
        }
      } else {
        click(a);
      }
    } else {
      a.href = URL.createObjectURL(blob);
      setTimeout(function() {
        URL.revokeObjectURL(a.href);
      }, 4e4);
      setTimeout(function() {
        click(a);
      }, 0);
    }
  }
  function msSaveAs(blob, name = "download", opts) {
    if (typeof blob === "string") {
      if (corsEnabled(blob)) {
        download(blob, name, opts);
      } else {
        const a = document.createElement("a");
        a.href = blob;
        a.target = "_blank";
        setTimeout(function() {
          click(a);
        });
      }
    } else {
      navigator.msSaveOrOpenBlob(bom(blob, opts), name);
    }
  }
  function fileSaverSaveAs(blob, name, opts, popup) {
    popup = popup || open("", "_blank");
    if (popup) {
      popup.document.title = popup.document.body.innerText = "downloading...";
    }
    if (typeof blob === "string")
      return download(blob, name, opts);
    const force = blob.type === "application/octet-stream";
    const isSafari = /constructor/i.test(String(_global.HTMLElement)) || "safari" in _global;
    const isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent);
    if ((isChromeIOS || force && isSafari || isMacOSWebView) && typeof FileReader !== "undefined") {
      const reader = new FileReader();
      reader.onloadend = function() {
        let url = reader.result;
        if (typeof url !== "string") {
          popup = null;
          throw new Error("Wrong reader.result type");
        }
        url = isChromeIOS ? url : url.replace(/^data:[^;]*;/, "data:attachment/file;");
        if (popup) {
          popup.location.href = url;
        } else {
          location.assign(url);
        }
        popup = null;
      };
      reader.readAsDataURL(blob);
    } else {
      const url = URL.createObjectURL(blob);
      if (popup)
        popup.location.assign(url);
      else
        location.href = url;
      popup = null;
      setTimeout(function() {
        URL.revokeObjectURL(url);
      }, 4e4);
    }
  }
  function toastMessage(message, type) {
    const piniaMessage = "🍍 " + message;
    if (typeof __VUE_DEVTOOLS_TOAST__ === "function") {
      __VUE_DEVTOOLS_TOAST__(piniaMessage, type);
    } else if (type === "error") {
      console.error(piniaMessage);
    } else if (type === "warn") {
      console.warn(piniaMessage);
    } else {
      console.log(piniaMessage);
    }
  }
  function isPinia(o) {
    return "_a" in o && "install" in o;
  }
  function checkClipboardAccess() {
    if (!("clipboard" in navigator)) {
      toastMessage(`Your browser doesn't support the Clipboard API`, "error");
      return true;
    }
  }
  function checkNotFocusedError(error) {
    if (error instanceof Error && error.message.toLowerCase().includes("document is not focused")) {
      toastMessage('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn");
      return true;
    }
    return false;
  }
  async function actionGlobalCopyState(pinia) {
    if (checkClipboardAccess())
      return;
    try {
      await navigator.clipboard.writeText(JSON.stringify(pinia.state.value));
      toastMessage("Global state copied to clipboard.");
    } catch (error) {
      if (checkNotFocusedError(error))
        return;
      toastMessage(`Failed to serialize the state. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  async function actionGlobalPasteState(pinia) {
    if (checkClipboardAccess())
      return;
    try {
      loadStoresState(pinia, JSON.parse(await navigator.clipboard.readText()));
      toastMessage("Global state pasted from clipboard.");
    } catch (error) {
      if (checkNotFocusedError(error))
        return;
      toastMessage(`Failed to deserialize the state from clipboard. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  async function actionGlobalSaveState(pinia) {
    try {
      saveAs(new Blob([JSON.stringify(pinia.state.value)], {
        type: "text/plain;charset=utf-8"
      }), "pinia-state.json");
    } catch (error) {
      toastMessage(`Failed to export the state as JSON. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  let fileInput;
  function getFileOpener() {
    if (!fileInput) {
      fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = ".json";
    }
    function openFile() {
      return new Promise((resolve2, reject) => {
        fileInput.onchange = async () => {
          const files = fileInput.files;
          if (!files)
            return resolve2(null);
          const file = files.item(0);
          if (!file)
            return resolve2(null);
          return resolve2({ text: await file.text(), file });
        };
        fileInput.oncancel = () => resolve2(null);
        fileInput.onerror = reject;
        fileInput.click();
      });
    }
    return openFile;
  }
  async function actionGlobalOpenStateFile(pinia) {
    try {
      const open2 = getFileOpener();
      const result = await open2();
      if (!result)
        return;
      const { text, file } = result;
      loadStoresState(pinia, JSON.parse(text));
      toastMessage(`Global state imported from "${file.name}".`);
    } catch (error) {
      toastMessage(`Failed to import the state from JSON. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  function loadStoresState(pinia, state) {
    for (const key in state) {
      const storeState = pinia.state.value[key];
      if (storeState) {
        Object.assign(storeState, state[key]);
      } else {
        pinia.state.value[key] = state[key];
      }
    }
  }
  function formatDisplay(display) {
    return {
      _custom: {
        display
      }
    };
  }
  const PINIA_ROOT_LABEL = "🍍 Pinia (root)";
  const PINIA_ROOT_ID = "_root";
  function formatStoreForInspectorTree(store) {
    return isPinia(store) ? {
      id: PINIA_ROOT_ID,
      label: PINIA_ROOT_LABEL
    } : {
      id: store.$id,
      label: store.$id
    };
  }
  function formatStoreForInspectorState(store) {
    if (isPinia(store)) {
      const storeNames = Array.from(store._s.keys());
      const storeMap = store._s;
      const state2 = {
        state: storeNames.map((storeId) => ({
          editable: true,
          key: storeId,
          value: store.state.value[storeId]
        })),
        getters: storeNames.filter((id) => storeMap.get(id)._getters).map((id) => {
          const store2 = storeMap.get(id);
          return {
            editable: false,
            key: id,
            value: store2._getters.reduce((getters, key) => {
              getters[key] = store2[key];
              return getters;
            }, {})
          };
        })
      };
      return state2;
    }
    const state = {
      state: Object.keys(store.$state).map((key) => ({
        editable: true,
        key,
        value: store.$state[key]
      }))
    };
    if (store._getters && store._getters.length) {
      state.getters = store._getters.map((getterName) => ({
        editable: false,
        key: getterName,
        value: store[getterName]
      }));
    }
    if (store._customProperties.size) {
      state.customProperties = Array.from(store._customProperties).map((key) => ({
        editable: true,
        key,
        value: store[key]
      }));
    }
    return state;
  }
  function formatEventData(events) {
    if (!events)
      return {};
    if (Array.isArray(events)) {
      return events.reduce((data, event) => {
        data.keys.push(event.key);
        data.operations.push(event.type);
        data.oldValue[event.key] = event.oldValue;
        data.newValue[event.key] = event.newValue;
        return data;
      }, {
        oldValue: {},
        keys: [],
        operations: [],
        newValue: {}
      });
    } else {
      return {
        operation: formatDisplay(events.type),
        key: formatDisplay(events.key),
        oldValue: events.oldValue,
        newValue: events.newValue
      };
    }
  }
  function formatMutationType(type) {
    switch (type) {
      case MutationType.direct:
        return "mutation";
      case MutationType.patchFunction:
        return "$patch";
      case MutationType.patchObject:
        return "$patch";
      default:
        return "unknown";
    }
  }
  let isTimelineActive = true;
  const componentStateTypes = [];
  const MUTATIONS_LAYER_ID = "pinia:mutations";
  const INSPECTOR_ID = "pinia";
  const { assign: assign$1 } = Object;
  const getStoreType = (id) => "🍍 " + id;
  function registerPiniaDevtools(app, pinia) {
    setupDevtoolsPlugin({
      id: "dev.esm.pinia",
      label: "Pinia 🍍",
      logo: "https://pinia.vuejs.org/logo.svg",
      packageName: "pinia",
      homepage: "https://pinia.vuejs.org",
      componentStateTypes,
      app
    }, (api) => {
      if (typeof api.now !== "function") {
        toastMessage("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html.");
      }
      api.addTimelineLayer({
        id: MUTATIONS_LAYER_ID,
        label: `Pinia 🍍`,
        color: 15064968
      });
      api.addInspector({
        id: INSPECTOR_ID,
        label: "Pinia 🍍",
        icon: "storage",
        treeFilterPlaceholder: "Search stores",
        actions: [
          {
            icon: "content_copy",
            action: () => {
              actionGlobalCopyState(pinia);
            },
            tooltip: "Serialize and copy the state"
          },
          {
            icon: "content_paste",
            action: async () => {
              await actionGlobalPasteState(pinia);
              api.sendInspectorTree(INSPECTOR_ID);
              api.sendInspectorState(INSPECTOR_ID);
            },
            tooltip: "Replace the state with the content of your clipboard"
          },
          {
            icon: "save",
            action: () => {
              actionGlobalSaveState(pinia);
            },
            tooltip: "Save the state as a JSON file"
          },
          {
            icon: "folder_open",
            action: async () => {
              await actionGlobalOpenStateFile(pinia);
              api.sendInspectorTree(INSPECTOR_ID);
              api.sendInspectorState(INSPECTOR_ID);
            },
            tooltip: "Import the state from a JSON file"
          }
        ],
        nodeActions: [
          {
            icon: "restore",
            tooltip: 'Reset the state (with "$reset")',
            action: (nodeId) => {
              const store = pinia._s.get(nodeId);
              if (!store) {
                toastMessage(`Cannot reset "${nodeId}" store because it wasn't found.`, "warn");
              } else if (typeof store.$reset !== "function") {
                toastMessage(`Cannot reset "${nodeId}" store because it doesn't have a "$reset" method implemented.`, "warn");
              } else {
                store.$reset();
                toastMessage(`Store "${nodeId}" reset.`);
              }
            }
          }
        ]
      });
      api.on.inspectComponent((payload, ctx) => {
        const proxy = payload.componentInstance && payload.componentInstance.proxy;
        if (proxy && proxy._pStores) {
          const piniaStores = payload.componentInstance.proxy._pStores;
          Object.values(piniaStores).forEach((store) => {
            payload.instanceData.state.push({
              type: getStoreType(store.$id),
              key: "state",
              editable: true,
              value: store._isOptionsAPI ? {
                _custom: {
                  value: vue.toRaw(store.$state),
                  actions: [
                    {
                      icon: "restore",
                      tooltip: "Reset the state of this store",
                      action: () => store.$reset()
                    }
                  ]
                }
              } : (
                // NOTE: workaround to unwrap transferred refs
                Object.keys(store.$state).reduce((state, key) => {
                  state[key] = store.$state[key];
                  return state;
                }, {})
              )
            });
            if (store._getters && store._getters.length) {
              payload.instanceData.state.push({
                type: getStoreType(store.$id),
                key: "getters",
                editable: false,
                value: store._getters.reduce((getters, key) => {
                  try {
                    getters[key] = store[key];
                  } catch (error) {
                    getters[key] = error;
                  }
                  return getters;
                }, {})
              });
            }
          });
        }
      });
      api.on.getInspectorTree((payload) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          let stores = [pinia];
          stores = stores.concat(Array.from(pinia._s.values()));
          payload.rootNodes = (payload.filter ? stores.filter((store) => "$id" in store ? store.$id.toLowerCase().includes(payload.filter.toLowerCase()) : PINIA_ROOT_LABEL.toLowerCase().includes(payload.filter.toLowerCase())) : stores).map(formatStoreForInspectorTree);
        }
      });
      api.on.getInspectorState((payload) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia : pinia._s.get(payload.nodeId);
          if (!inspectedStore) {
            return;
          }
          if (inspectedStore) {
            payload.state = formatStoreForInspectorState(inspectedStore);
          }
        }
      });
      api.on.editInspectorState((payload, ctx) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia : pinia._s.get(payload.nodeId);
          if (!inspectedStore) {
            return toastMessage(`store "${payload.nodeId}" not found`, "error");
          }
          const { path } = payload;
          if (!isPinia(inspectedStore)) {
            if (path.length !== 1 || !inspectedStore._customProperties.has(path[0]) || path[0] in inspectedStore.$state) {
              path.unshift("$state");
            }
          } else {
            path.unshift("state");
          }
          isTimelineActive = false;
          payload.set(inspectedStore, path, payload.state.value);
          isTimelineActive = true;
        }
      });
      api.on.editComponentState((payload) => {
        if (payload.type.startsWith("🍍")) {
          const storeId = payload.type.replace(/^🍍\s*/, "");
          const store = pinia._s.get(storeId);
          if (!store) {
            return toastMessage(`store "${storeId}" not found`, "error");
          }
          const { path } = payload;
          if (path[0] !== "state") {
            return toastMessage(`Invalid path for store "${storeId}":
${path}
Only state can be modified.`);
          }
          path[0] = "$state";
          isTimelineActive = false;
          payload.set(store, path, payload.state.value);
          isTimelineActive = true;
        }
      });
    });
  }
  function addStoreToDevtools(app, store) {
    if (!componentStateTypes.includes(getStoreType(store.$id))) {
      componentStateTypes.push(getStoreType(store.$id));
    }
    setupDevtoolsPlugin({
      id: "dev.esm.pinia",
      label: "Pinia 🍍",
      logo: "https://pinia.vuejs.org/logo.svg",
      packageName: "pinia",
      homepage: "https://pinia.vuejs.org",
      componentStateTypes,
      app,
      settings: {
        logStoreChanges: {
          label: "Notify about new/deleted stores",
          type: "boolean",
          defaultValue: true
        }
        // useEmojis: {
        //   label: 'Use emojis in messages ⚡️',
        //   type: 'boolean',
        //   defaultValue: true,
        // },
      }
    }, (api) => {
      const now2 = typeof api.now === "function" ? api.now.bind(api) : Date.now;
      store.$onAction(({ after, onError, name, args }) => {
        const groupId = runningActionId++;
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now2(),
            title: "🛫 " + name,
            subtitle: "start",
            data: {
              store: formatDisplay(store.$id),
              action: formatDisplay(name),
              args
            },
            groupId
          }
        });
        after((result) => {
          activeAction = void 0;
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: now2(),
              title: "🛬 " + name,
              subtitle: "end",
              data: {
                store: formatDisplay(store.$id),
                action: formatDisplay(name),
                args,
                result
              },
              groupId
            }
          });
        });
        onError((error) => {
          activeAction = void 0;
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: now2(),
              logType: "error",
              title: "💥 " + name,
              subtitle: "end",
              data: {
                store: formatDisplay(store.$id),
                action: formatDisplay(name),
                args,
                error
              },
              groupId
            }
          });
        });
      }, true);
      store._customProperties.forEach((name) => {
        vue.watch(() => vue.unref(store[name]), (newValue, oldValue) => {
          api.notifyComponentUpdate();
          api.sendInspectorState(INSPECTOR_ID);
          if (isTimelineActive) {
            api.addTimelineEvent({
              layerId: MUTATIONS_LAYER_ID,
              event: {
                time: now2(),
                title: "Change",
                subtitle: name,
                data: {
                  newValue,
                  oldValue
                },
                groupId: activeAction
              }
            });
          }
        }, { deep: true });
      });
      store.$subscribe(({ events, type }, state) => {
        api.notifyComponentUpdate();
        api.sendInspectorState(INSPECTOR_ID);
        if (!isTimelineActive)
          return;
        const eventData = {
          time: now2(),
          title: formatMutationType(type),
          data: assign$1({ store: formatDisplay(store.$id) }, formatEventData(events)),
          groupId: activeAction
        };
        if (type === MutationType.patchFunction) {
          eventData.subtitle = "⤵️";
        } else if (type === MutationType.patchObject) {
          eventData.subtitle = "🧩";
        } else if (events && !Array.isArray(events)) {
          eventData.subtitle = events.type;
        }
        if (events) {
          eventData.data["rawEvent(s)"] = {
            _custom: {
              display: "DebuggerEvent",
              type: "object",
              tooltip: "raw DebuggerEvent[]",
              value: events
            }
          };
        }
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: eventData
        });
      }, { detached: true, flush: "sync" });
      const hotUpdate = store._hotUpdate;
      store._hotUpdate = vue.markRaw((newStore) => {
        hotUpdate(newStore);
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now2(),
            title: "🔥 " + store.$id,
            subtitle: "HMR update",
            data: {
              store: formatDisplay(store.$id),
              info: formatDisplay(`HMR update`)
            }
          }
        });
        api.notifyComponentUpdate();
        api.sendInspectorTree(INSPECTOR_ID);
        api.sendInspectorState(INSPECTOR_ID);
      });
      const { $dispose } = store;
      store.$dispose = () => {
        $dispose();
        api.notifyComponentUpdate();
        api.sendInspectorTree(INSPECTOR_ID);
        api.sendInspectorState(INSPECTOR_ID);
        api.getSettings().logStoreChanges && toastMessage(`Disposed "${store.$id}" store 🗑`);
      };
      api.notifyComponentUpdate();
      api.sendInspectorTree(INSPECTOR_ID);
      api.sendInspectorState(INSPECTOR_ID);
      api.getSettings().logStoreChanges && toastMessage(`"${store.$id}" store installed 🆕`);
    });
  }
  let runningActionId = 0;
  let activeAction;
  function patchActionForGrouping(store, actionNames, wrapWithProxy) {
    const actions = actionNames.reduce((storeActions, actionName) => {
      storeActions[actionName] = vue.toRaw(store)[actionName];
      return storeActions;
    }, {});
    for (const actionName in actions) {
      store[actionName] = function() {
        const _actionId = runningActionId;
        const trackedStore = wrapWithProxy ? new Proxy(store, {
          get(...args) {
            activeAction = _actionId;
            return Reflect.get(...args);
          },
          set(...args) {
            activeAction = _actionId;
            return Reflect.set(...args);
          }
        }) : store;
        activeAction = _actionId;
        const retValue = actions[actionName].apply(trackedStore, arguments);
        activeAction = void 0;
        return retValue;
      };
    }
  }
  function devtoolsPlugin({ app, store, options }) {
    if (store.$id.startsWith("__hot:")) {
      return;
    }
    store._isOptionsAPI = !!options.state;
    patchActionForGrouping(store, Object.keys(options.actions), store._isOptionsAPI);
    const originalHotUpdate = store._hotUpdate;
    vue.toRaw(store)._hotUpdate = function(newStore) {
      originalHotUpdate.apply(this, arguments);
      patchActionForGrouping(store, Object.keys(newStore._hmrPayload.actions), !!store._isOptionsAPI);
    };
    addStoreToDevtools(
      app,
      // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
      store
    );
  }
  function createPinia() {
    const scope = vue.effectScope(true);
    const state = scope.run(() => vue.ref({}));
    let _p = [];
    let toBeInstalled = [];
    const pinia = vue.markRaw({
      install(app) {
        setActivePinia(pinia);
        {
          pinia._a = app;
          app.provide(piniaSymbol, pinia);
          app.config.globalProperties.$pinia = pinia;
          if (USE_DEVTOOLS) {
            registerPiniaDevtools(app, pinia);
          }
          toBeInstalled.forEach((plugin) => _p.push(plugin));
          toBeInstalled = [];
        }
      },
      use(plugin) {
        if (!this._a && !isVue2) {
          toBeInstalled.push(plugin);
        } else {
          _p.push(plugin);
        }
        return this;
      },
      _p,
      // it's actually undefined here
      // @ts-expect-error
      _a: null,
      _e: scope,
      _s: /* @__PURE__ */ new Map(),
      state
    });
    if (USE_DEVTOOLS && typeof Proxy !== "undefined") {
      pinia.use(devtoolsPlugin);
    }
    return pinia;
  }
  const isUseStore = (fn) => {
    return typeof fn === "function" && typeof fn.$id === "string";
  };
  function patchObject(newState, oldState) {
    for (const key in oldState) {
      const subPatch = oldState[key];
      if (!(key in newState)) {
        continue;
      }
      const targetValue = newState[key];
      if (isPlainObject(targetValue) && isPlainObject(subPatch) && !vue.isRef(subPatch) && !vue.isReactive(subPatch)) {
        newState[key] = patchObject(targetValue, subPatch);
      } else {
        {
          newState[key] = subPatch;
        }
      }
    }
    return newState;
  }
  function acceptHMRUpdate(initialUseStore, hot) {
    return (newModule) => {
      const pinia = hot.data.pinia || initialUseStore._pinia;
      if (!pinia) {
        return;
      }
      hot.data.pinia = pinia;
      for (const exportName in newModule) {
        const useStore = newModule[exportName];
        if (isUseStore(useStore) && pinia._s.has(useStore.$id)) {
          const id = useStore.$id;
          if (id !== initialUseStore.$id) {
            console.warn(`The id of the store changed from "${initialUseStore.$id}" to "${id}". Reloading.`);
            return hot.invalidate();
          }
          const existingStore = pinia._s.get(id);
          if (!existingStore) {
            console.log(`[Pinia]: skipping hmr because store doesn't exist yet`);
            return;
          }
          useStore(pinia, existingStore);
        }
      }
    };
  }
  const noop = () => {
  };
  function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
    subscriptions.push(callback);
    const removeSubscription = () => {
      const idx = subscriptions.indexOf(callback);
      if (idx > -1) {
        subscriptions.splice(idx, 1);
        onCleanup();
      }
    };
    if (!detached && vue.getCurrentScope()) {
      vue.onScopeDispose(removeSubscription);
    }
    return removeSubscription;
  }
  function triggerSubscriptions(subscriptions, ...args) {
    subscriptions.slice().forEach((callback) => {
      callback(...args);
    });
  }
  const fallbackRunWithContext = (fn) => fn();
  function mergeReactiveObjects(target, patchToApply) {
    if (target instanceof Map && patchToApply instanceof Map) {
      patchToApply.forEach((value, key) => target.set(key, value));
    }
    if (target instanceof Set && patchToApply instanceof Set) {
      patchToApply.forEach(target.add, target);
    }
    for (const key in patchToApply) {
      if (!patchToApply.hasOwnProperty(key))
        continue;
      const subPatch = patchToApply[key];
      const targetValue = target[key];
      if (isPlainObject(targetValue) && isPlainObject(subPatch) && target.hasOwnProperty(key) && !vue.isRef(subPatch) && !vue.isReactive(subPatch)) {
        target[key] = mergeReactiveObjects(targetValue, subPatch);
      } else {
        target[key] = subPatch;
      }
    }
    return target;
  }
  const skipHydrateSymbol = Symbol("pinia:skipHydration");
  function skipHydrate(obj) {
    return Object.defineProperty(obj, skipHydrateSymbol, {});
  }
  function shouldHydrate(obj) {
    return !isPlainObject(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
  }
  const { assign } = Object;
  function isComputed(o) {
    return !!(vue.isRef(o) && o.effect);
  }
  function createOptionsStore(id, options, pinia, hot) {
    const { state, actions, getters } = options;
    const initialState = pinia.state.value[id];
    let store;
    function setup() {
      if (!initialState && !hot) {
        {
          pinia.state.value[id] = state ? state() : {};
        }
      }
      const localState = hot ? (
        // use ref() to unwrap refs inside state TODO: check if this is still necessary
        vue.toRefs(vue.ref(state ? state() : {}).value)
      ) : vue.toRefs(pinia.state.value[id]);
      return assign(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
        if (name in localState) {
          console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${name}" in store "${id}".`);
        }
        computedGetters[name] = vue.markRaw(vue.computed(() => {
          setActivePinia(pinia);
          const store2 = pinia._s.get(id);
          return getters[name].call(store2, store2);
        }));
        return computedGetters;
      }, {}));
    }
    store = createSetupStore(id, setup, options, pinia, hot, true);
    return store;
  }
  function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
    let scope;
    const optionsForPlugin = assign({ actions: {} }, options);
    if (!pinia._e.active) {
      throw new Error("Pinia destroyed");
    }
    const $subscribeOptions = {
      deep: true
      // flush: 'post',
    };
    {
      $subscribeOptions.onTrigger = (event) => {
        if (isListening) {
          debuggerEvents = event;
        } else if (isListening == false && !store._hotUpdating) {
          if (Array.isArray(debuggerEvents)) {
            debuggerEvents.push(event);
          } else {
            console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug.");
          }
        }
      };
    }
    let isListening;
    let isSyncListening;
    let subscriptions = [];
    let actionSubscriptions = [];
    let debuggerEvents;
    const initialState = pinia.state.value[$id];
    if (!isOptionsStore && !initialState && !hot) {
      {
        pinia.state.value[$id] = {};
      }
    }
    const hotState = vue.ref({});
    let activeListener;
    function $patch(partialStateOrMutator) {
      let subscriptionMutation;
      isListening = isSyncListening = false;
      {
        debuggerEvents = [];
      }
      if (typeof partialStateOrMutator === "function") {
        partialStateOrMutator(pinia.state.value[$id]);
        subscriptionMutation = {
          type: MutationType.patchFunction,
          storeId: $id,
          events: debuggerEvents
        };
      } else {
        mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
        subscriptionMutation = {
          type: MutationType.patchObject,
          payload: partialStateOrMutator,
          storeId: $id,
          events: debuggerEvents
        };
      }
      const myListenerId = activeListener = Symbol();
      vue.nextTick().then(() => {
        if (activeListener === myListenerId) {
          isListening = true;
        }
      });
      isSyncListening = true;
      triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
    }
    const $reset = isOptionsStore ? function $reset2() {
      const { state } = options;
      const newState = state ? state() : {};
      this.$patch(($state) => {
        assign($state, newState);
      });
    } : (
      /* istanbul ignore next */
      () => {
        throw new Error(`🍍: Store "${$id}" is built using the setup syntax and does not implement $reset().`);
      }
    );
    function $dispose() {
      scope.stop();
      subscriptions = [];
      actionSubscriptions = [];
      pinia._s.delete($id);
    }
    function wrapAction(name, action) {
      return function() {
        setActivePinia(pinia);
        const args = Array.from(arguments);
        const afterCallbackList = [];
        const onErrorCallbackList = [];
        function after(callback) {
          afterCallbackList.push(callback);
        }
        function onError(callback) {
          onErrorCallbackList.push(callback);
        }
        triggerSubscriptions(actionSubscriptions, {
          args,
          name,
          store,
          after,
          onError
        });
        let ret;
        try {
          ret = action.apply(this && this.$id === $id ? this : store, args);
        } catch (error) {
          triggerSubscriptions(onErrorCallbackList, error);
          throw error;
        }
        if (ret instanceof Promise) {
          return ret.then((value) => {
            triggerSubscriptions(afterCallbackList, value);
            return value;
          }).catch((error) => {
            triggerSubscriptions(onErrorCallbackList, error);
            return Promise.reject(error);
          });
        }
        triggerSubscriptions(afterCallbackList, ret);
        return ret;
      };
    }
    const _hmrPayload = /* @__PURE__ */ vue.markRaw({
      actions: {},
      getters: {},
      state: [],
      hotState
    });
    const partialStore = {
      _p: pinia,
      // _s: scope,
      $id,
      $onAction: addSubscription.bind(null, actionSubscriptions),
      $patch,
      $reset,
      $subscribe(callback, options2 = {}) {
        const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
        const stopWatcher = scope.run(() => vue.watch(() => pinia.state.value[$id], (state) => {
          if (options2.flush === "sync" ? isSyncListening : isListening) {
            callback({
              storeId: $id,
              type: MutationType.direct,
              events: debuggerEvents
            }, state);
          }
        }, assign({}, $subscribeOptions, options2)));
        return removeSubscription;
      },
      $dispose
    };
    const store = vue.reactive(assign(
      {
        _hmrPayload,
        _customProperties: vue.markRaw(/* @__PURE__ */ new Set())
        // devtools custom properties
      },
      partialStore
      // must be added later
      // setupStore
    ));
    pinia._s.set($id, store);
    const runWithContext = pinia._a && pinia._a.runWithContext || fallbackRunWithContext;
    const setupStore = runWithContext(() => pinia._e.run(() => (scope = vue.effectScope()).run(setup)));
    for (const key in setupStore) {
      const prop = setupStore[key];
      if (vue.isRef(prop) && !isComputed(prop) || vue.isReactive(prop)) {
        if (hot) {
          set(hotState.value, key, vue.toRef(setupStore, key));
        } else if (!isOptionsStore) {
          if (initialState && shouldHydrate(prop)) {
            if (vue.isRef(prop)) {
              prop.value = initialState[key];
            } else {
              mergeReactiveObjects(prop, initialState[key]);
            }
          }
          {
            pinia.state.value[$id][key] = prop;
          }
        }
        {
          _hmrPayload.state.push(key);
        }
      } else if (typeof prop === "function") {
        const actionValue = hot ? prop : wrapAction(key, prop);
        {
          setupStore[key] = actionValue;
        }
        {
          _hmrPayload.actions[key] = prop;
        }
        optionsForPlugin.actions[key] = prop;
      } else {
        if (isComputed(prop)) {
          _hmrPayload.getters[key] = isOptionsStore ? (
            // @ts-expect-error
            options.getters[key]
          ) : prop;
          if (IS_CLIENT) {
            const getters = setupStore._getters || // @ts-expect-error: same
            (setupStore._getters = vue.markRaw([]));
            getters.push(key);
          }
        }
      }
    }
    {
      assign(store, setupStore);
      assign(vue.toRaw(store), setupStore);
    }
    Object.defineProperty(store, "$state", {
      get: () => hot ? hotState.value : pinia.state.value[$id],
      set: (state) => {
        if (hot) {
          throw new Error("cannot set hotState");
        }
        $patch(($state) => {
          assign($state, state);
        });
      }
    });
    {
      store._hotUpdate = vue.markRaw((newStore) => {
        store._hotUpdating = true;
        newStore._hmrPayload.state.forEach((stateKey) => {
          if (stateKey in store.$state) {
            const newStateTarget = newStore.$state[stateKey];
            const oldStateSource = store.$state[stateKey];
            if (typeof newStateTarget === "object" && isPlainObject(newStateTarget) && isPlainObject(oldStateSource)) {
              patchObject(newStateTarget, oldStateSource);
            } else {
              newStore.$state[stateKey] = oldStateSource;
            }
          }
          set(store, stateKey, vue.toRef(newStore.$state, stateKey));
        });
        Object.keys(store.$state).forEach((stateKey) => {
          if (!(stateKey in newStore.$state)) {
            del(store, stateKey);
          }
        });
        isListening = false;
        isSyncListening = false;
        pinia.state.value[$id] = vue.toRef(newStore._hmrPayload, "hotState");
        isSyncListening = true;
        vue.nextTick().then(() => {
          isListening = true;
        });
        for (const actionName in newStore._hmrPayload.actions) {
          const action = newStore[actionName];
          set(store, actionName, wrapAction(actionName, action));
        }
        for (const getterName in newStore._hmrPayload.getters) {
          const getter = newStore._hmrPayload.getters[getterName];
          const getterValue = isOptionsStore ? (
            // special handling of options api
            vue.computed(() => {
              setActivePinia(pinia);
              return getter.call(store, store);
            })
          ) : getter;
          set(store, getterName, getterValue);
        }
        Object.keys(store._hmrPayload.getters).forEach((key) => {
          if (!(key in newStore._hmrPayload.getters)) {
            del(store, key);
          }
        });
        Object.keys(store._hmrPayload.actions).forEach((key) => {
          if (!(key in newStore._hmrPayload.actions)) {
            del(store, key);
          }
        });
        store._hmrPayload = newStore._hmrPayload;
        store._getters = newStore._getters;
        store._hotUpdating = false;
      });
    }
    if (USE_DEVTOOLS) {
      const nonEnumerable = {
        writable: true,
        configurable: true,
        // avoid warning on devtools trying to display this property
        enumerable: false
      };
      ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((p) => {
        Object.defineProperty(store, p, assign({ value: store[p] }, nonEnumerable));
      });
    }
    pinia._p.forEach((extender) => {
      if (USE_DEVTOOLS) {
        const extensions = scope.run(() => extender({
          store,
          app: pinia._a,
          pinia,
          options: optionsForPlugin
        }));
        Object.keys(extensions || {}).forEach((key) => store._customProperties.add(key));
        assign(store, extensions);
      } else {
        assign(store, scope.run(() => extender({
          store,
          app: pinia._a,
          pinia,
          options: optionsForPlugin
        })));
      }
    });
    if (store.$state && typeof store.$state === "object" && typeof store.$state.constructor === "function" && !store.$state.constructor.toString().includes("[native code]")) {
      console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${store.$id}".`);
    }
    if (initialState && isOptionsStore && options.hydrate) {
      options.hydrate(store.$state, initialState);
    }
    isListening = true;
    isSyncListening = true;
    return store;
  }
  function defineStore(idOrOptions, setup, setupOptions) {
    let id;
    let options;
    const isSetupStore = typeof setup === "function";
    if (typeof idOrOptions === "string") {
      id = idOrOptions;
      options = isSetupStore ? setupOptions : setup;
    } else {
      options = idOrOptions;
      id = idOrOptions.id;
      if (typeof id !== "string") {
        throw new Error(`[🍍]: "defineStore()" must be passed a store id as its first argument.`);
      }
    }
    function useStore(pinia, hot) {
      const hasContext = vue.hasInjectionContext();
      pinia = // in test mode, ignore the argument provided as we can always retrieve a
      // pinia instance with getActivePinia()
      pinia || (hasContext ? vue.inject(piniaSymbol, null) : null);
      if (pinia)
        setActivePinia(pinia);
      if (!activePinia) {
        throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
      }
      pinia = activePinia;
      if (!pinia._s.has(id)) {
        if (isSetupStore) {
          createSetupStore(id, setup, options, pinia);
        } else {
          createOptionsStore(id, options, pinia);
        }
        {
          useStore._pinia = pinia;
        }
      }
      const store = pinia._s.get(id);
      if (hot) {
        const hotId = "__hot:" + id;
        const newStore = isSetupStore ? createSetupStore(hotId, setup, options, pinia, true) : createOptionsStore(hotId, assign({}, options), pinia, true);
        hot._hotUpdate(newStore);
        delete pinia.state.value[hotId];
        pinia._s.delete(hotId);
      }
      if (IS_CLIENT) {
        const currentInstance = vue.getCurrentInstance();
        if (currentInstance && currentInstance.proxy && // avoid adding stores that are just built for hot module replacement
        !hot) {
          const vm = currentInstance.proxy;
          const cache = "_pStores" in vm ? vm._pStores : vm._pStores = {};
          cache[id] = store;
        }
      }
      return store;
    }
    useStore.$id = id;
    return useStore;
  }
  let mapStoreSuffix = "Store";
  function setMapStoreSuffix(suffix) {
    mapStoreSuffix = suffix;
  }
  function mapStores(...stores) {
    if (Array.isArray(stores[0])) {
      console.warn(`[🍍]: Directly pass all stores to "mapStores()" without putting them in an array:
Replace
	mapStores([useAuthStore, useCartStore])
with
	mapStores(useAuthStore, useCartStore)
This will fail in production if not fixed.`);
      stores = stores[0];
    }
    return stores.reduce((reduced, useStore) => {
      reduced[useStore.$id + mapStoreSuffix] = function() {
        return useStore(this.$pinia);
      };
      return reduced;
    }, {});
  }
  function mapState(useStore, keysOrMapper) {
    return Array.isArray(keysOrMapper) ? keysOrMapper.reduce((reduced, key) => {
      reduced[key] = function() {
        return useStore(this.$pinia)[key];
      };
      return reduced;
    }, {}) : Object.keys(keysOrMapper).reduce((reduced, key) => {
      reduced[key] = function() {
        const store = useStore(this.$pinia);
        const storeKey = keysOrMapper[key];
        return typeof storeKey === "function" ? storeKey.call(this, store) : store[storeKey];
      };
      return reduced;
    }, {});
  }
  const mapGetters = mapState;
  function mapActions(useStore, keysOrMapper) {
    return Array.isArray(keysOrMapper) ? keysOrMapper.reduce((reduced, key) => {
      reduced[key] = function(...args) {
        return useStore(this.$pinia)[key](...args);
      };
      return reduced;
    }, {}) : Object.keys(keysOrMapper).reduce((reduced, key) => {
      reduced[key] = function(...args) {
        return useStore(this.$pinia)[keysOrMapper[key]](...args);
      };
      return reduced;
    }, {});
  }
  function mapWritableState(useStore, keysOrMapper) {
    return Array.isArray(keysOrMapper) ? keysOrMapper.reduce((reduced, key) => {
      reduced[key] = {
        get() {
          return useStore(this.$pinia)[key];
        },
        set(value) {
          return useStore(this.$pinia)[key] = value;
        }
      };
      return reduced;
    }, {}) : Object.keys(keysOrMapper).reduce((reduced, key) => {
      reduced[key] = {
        get() {
          return useStore(this.$pinia)[keysOrMapper[key]];
        },
        set(value) {
          return useStore(this.$pinia)[keysOrMapper[key]] = value;
        }
      };
      return reduced;
    }, {});
  }
  function storeToRefs(store) {
    {
      store = vue.toRaw(store);
      const refs = {};
      for (const key in store) {
        const value = store[key];
        if (vue.isRef(value) || vue.isReactive(value)) {
          refs[key] = // ---
          vue.toRef(store, key);
        }
      }
      return refs;
    }
  }
  const PiniaVuePlugin = function(_Vue) {
    _Vue.mixin({
      beforeCreate() {
        const options = this.$options;
        if (options.pinia) {
          const pinia = options.pinia;
          if (!this._provided) {
            const provideCache = {};
            Object.defineProperty(this, "_provided", {
              get: () => provideCache,
              set: (v) => Object.assign(provideCache, v)
            });
          }
          this._provided[piniaSymbol] = pinia;
          if (!this.$pinia) {
            this.$pinia = pinia;
          }
          pinia._a = this;
          if (IS_CLIENT) {
            setActivePinia(pinia);
          }
          if (USE_DEVTOOLS) {
            registerPiniaDevtools(pinia._a, pinia);
          }
        } else if (!this.$pinia && options.parent && options.parent.$pinia) {
          this.$pinia = options.parent.$pinia;
        }
      },
      destroyed() {
        delete this._pStores;
      }
    });
  };
  const Pinia = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    get MutationType() {
      return MutationType;
    },
    PiniaVuePlugin,
    acceptHMRUpdate,
    createPinia,
    defineStore,
    getActivePinia,
    mapActions,
    mapGetters,
    mapState,
    mapStores,
    mapWritableState,
    setActivePinia,
    setMapStoreSuffix,
    skipHydrate,
    storeToRefs
  }, Symbol.toStringTag, { value: "Module" }));
  const useUserStore = defineStore(
    "user",
    () => {
      const userInfo = vue.ref({
        authorization: "",
        money: 12580,
        // 示例金额
        backgroudImg: ""
        // 背景图片
      });
      const parseAudioList = vue.ref([]);
      const initUserInfo = () => {
        try {
          const savedUserInfo = uni.getStorageSync("userInfo");
          if (savedUserInfo) {
            const userData = typeof savedUserInfo === "string" ? JSON.parse(savedUserInfo) : savedUserInfo;
            userInfo.value = { ...userInfo.value, ...userData };
          }
        } catch (error) {
          formatAppLog("error", "at stores/user.js:24", "恢复用户信息失败:", error);
        }
      };
      initUserInfo();
      const setUserInfo = (userData) => {
        userInfo.value = userData;
        uni.setStorageSync("userInfo", JSON.stringify(userInfo.value));
      };
      const clearUserInfo = () => {
        userInfo.value = {
          id: "",
          username: "",
          email: "",
          nickname: "",
          avatar: "",
          phone: "",
          gender: 0,
          birthday: "",
          bio: "",
          status: 0,
          isVerified: 0,
          lastLoginTime: "",
          lastLoginIp: "",
          loginCount: 0,
          aiQuota: 0,
          aiUsed: 0,
          apiKey: "",
          settings: "",
          createdAt: "",
          role: {
            id: null,
            roleName: "",
            roleCode: "",
            roleDesc: "",
            status: 0,
            createdAt: "",
            updatedAt: ""
          },
          authorization: "",
          money: 0,
          backgroudImg: ""
        };
      };
      const logout2 = () => {
        clearUserInfo();
        uni.removeStorageSync("userInfo");
      };
      return {
        // 状态
        userInfo,
        // 方法
        setUserInfo,
        clearUserInfo,
        logout: logout2,
        initUserInfo,
        // 向后兼容的属性
        username: vue.computed(() => userInfo.value.username),
        avatar: vue.computed(() => userInfo.value.avatar),
        parseAudioList
      };
    }
  );
  const _imports_0 = "/static/2.png";
  const _imports_1 = "/static/3.png";
  const _imports_2 = "/static/sj.png";
  const _imports_3 = "/static/yz.png";
  const _sfc_main$i = {
    __name: "index",
    setup(__props, { expose: __expose }) {
      __expose();
      const userStore = useUserStore();
      const title = vue.ref("todo+");
      const phone = vue.ref("");
      const password = vue.ref("");
      const showPassword = vue.ref(false);
      const showUsage = vue.ref(false);
      const usageModalClosing = vue.ref(false);
      function register2() {
        uni.navigateTo({
          url: "/pages/register/register"
        });
      }
      function forgetPassword() {
        uni.navigateTo({
          url: "/pages/changePassword/changePassword"
        });
      }
      function togglePassword() {
        showPassword.value = !showPassword.value;
      }
      function showUsageModal() {
        showUsage.value = true;
      }
      function closeUsageModal() {
        usageModalClosing.value = true;
        setTimeout(() => {
          showUsage.value = false;
          usageModalClosing.value = false;
        }, 300);
      }
      const login2 = async () => {
        if (!phone.value) {
          uni.showToast({ title: "请输入手机号", icon: "none" });
          return;
        }
        if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(phone.value)) {
          uni.showToast({ title: "请输入正确手机号", icon: "none" });
          return;
        }
        if (!password.value) {
          uni.showToast({ title: "请输入密码", icon: "none" });
          return;
        }
        const res2 = await userApi.login({ phone: phone.value, code: password.value, type: 1 });
        if (res2.code === 200 || res2.code === "200") {
          userStore.setUserInfo(res2.data);
          uni.showToast({ title: "登录成功", icon: "success" });
          uni.navigateTo({
            url: "/pages/home/home"
          });
        } else {
          uni.showToast({ title: "登录失败", icon: "none" });
        }
      };
      const resetPageState = () => {
        showUsage.value = false;
        usageModalClosing.value = false;
      };
      vue.onMounted(() => {
        resetPageState();
      });
      onShow(() => {
        resetPageState();
      });
      const __returned__ = { userStore, title, phone, password, showPassword, showUsage, usageModalClosing, register: register2, forgetPassword, togglePassword, showUsageModal, closeUsageModal, login: login2, resetPageState, ref: vue.ref, onMounted: vue.onMounted, get onShow() {
        return onShow;
      }, get userApi() {
        return userApi;
      }, get useUserStore() {
        return useUserStore;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock("view", { class: "t-login" }, [
      vue.createCommentVNode(" 页面装饰图片 "),
      vue.createElementVNode("image", {
        class: "img-a",
        src: _imports_0
      }),
      vue.createElementVNode("image", {
        class: "img-b",
        src: _imports_1
      }),
      vue.createCommentVNode(" 标题 "),
      vue.createElementVNode(
        "view",
        { class: "t-b" },
        vue.toDisplayString($setup.title),
        1
        /* TEXT */
      ),
      vue.createElementVNode("view", { class: "t-b2" }, [
        vue.createTextVNode(" 欢迎使用，todo+ "),
        vue.createElementVNode("text", {
          class: "usage-link",
          onClick: $setup.showUsageModal
        }, "使用说明")
      ]),
      vue.createElementVNode("form", { class: "cl" }, [
        vue.createElementVNode("view", { class: "t-a" }, [
          vue.createElementVNode("image", { src: _imports_2 }),
          vue.createElementVNode("view", { class: "line" }),
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              type: "number",
              name: "phone",
              placeholder: "请输入手机号",
              maxlength: "11",
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.phone = $event)
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $setup.phone]
          ])
        ]),
        vue.createElementVNode("view", { class: "t-a" }, [
          vue.createElementVNode("image", { src: _imports_3 }),
          vue.createElementVNode("view", { class: "line" }),
          vue.withDirectives(vue.createElementVNode("input", {
            type: $setup.showPassword ? "text" : "password",
            name: "code",
            placeholder: "请输入密码",
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.password = $event)
          }, null, 8, ["type"]), [
            [vue.vModelDynamic, $setup.password]
          ]),
          vue.createElementVNode("view", {
            class: "eye-icon",
            onClick: $setup.togglePassword
          }, [
            vue.createVNode(_component_uni_icons, {
              type: $setup.showPassword ? "eye" : "eye-slash",
              size: "20",
              color: "#999"
            }, null, 8, ["type"])
          ])
        ]),
        vue.createElementVNode("button", {
          onClick: _cache[2] || (_cache[2] = ($event) => $setup.login())
        }, "登 录"),
        vue.createElementVNode("view", { class: "button-group" }, [
          vue.createElementVNode("button", {
            type: "primary",
            style: { "background-color": "#f8f9fa", "color": "#6c757d", "border-color": "#dee2e6" },
            plain: "true",
            class: "t-forget",
            onClick: _cache[3] || (_cache[3] = ($event) => $setup.forgetPassword())
          }, "忘记密码"),
          vue.createElementVNode("button", {
            type: "primary",
            style: { "background-color": "transparent", "color": "#5677fc", "border-color": "#5677fc" },
            plain: "true",
            class: "t-register",
            onClick: _cache[4] || (_cache[4] = ($event) => $setup.register())
          }, "注册")
        ])
      ]),
      vue.createCommentVNode(" 使用说明弹框 "),
      $setup.showUsage ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "modal-overlay",
        onClick: $setup.closeUsageModal
      }, [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["modal-content", { "closing": $setup.usageModalClosing }]),
            onClick: _cache[5] || (_cache[5] = vue.withModifiers(() => {
            }, ["stop"]))
          },
          [
            vue.createElementVNode("view", { class: "modal-header" }, [
              vue.createElementVNode("text", { class: "modal-title" }, "使用说明"),
              vue.createElementVNode("view", {
                class: "modal-close",
                onClick: $setup.closeUsageModal
              }, [
                vue.createVNode(_component_uni_icons, {
                  type: "close",
                  size: "20",
                  color: "#666"
                })
              ])
            ]),
            vue.createElementVNode("view", { class: "modal-body" }, [
              vue.createElementVNode("text", { class: "usage-title" }, "todo+ 智能自律管理软件"),
              vue.createElementVNode("text", { class: "usage-subtitle" }, "让自律变得有趣，让坚持变得简单！"),
              vue.createElementVNode("view", { class: "feature-list" }, [
                vue.createElementVNode("view", { class: "feature-item" }, [
                  vue.createElementVNode("text", { class: "feature-icon" }, "✓"),
                  vue.createElementVNode("text", { class: "feature-text" }, "智能任务规划 - AI管家协助制定个性化计划")
                ]),
                vue.createElementVNode("view", { class: "feature-item" }, [
                  vue.createElementVNode("text", { class: "feature-icon" }, "✓"),
                  vue.createElementVNode("text", { class: "feature-text" }, "奖励机制 - 完成任务获得金币奖励")
                ]),
                vue.createElementVNode("view", { class: "feature-item" }, [
                  vue.createElementVNode("text", { class: "feature-icon" }, "✓"),
                  vue.createElementVNode("text", { class: "feature-text" }, "惩罚机制 - 未完成任务自动扣除余额")
                ]),
                vue.createElementVNode("view", { class: "feature-item" }, [
                  vue.createElementVNode("text", { class: "feature-icon" }, "✓"),
                  vue.createElementVNode("text", { class: "feature-text" }, "数据统计 - 直观查看完成率和收益情况")
                ]),
                vue.createElementVNode("view", { class: "feature-item" }, [
                  vue.createElementVNode("text", { class: "feature-icon" }, "✓"),
                  vue.createElementVNode("text", { class: "feature-text" }, "模板功能 - 快速创建常用任务")
                ])
              ])
            ]),
            vue.createElementVNode("view", { class: "modal-footer" }, [
              vue.createElementVNode("button", {
                class: "confirm-btn",
                onClick: $setup.closeUsageModal
              }, "我知道了")
            ])
          ],
          2
          /* CLASS */
        )
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$h], ["__file", "C:/Users/Administrator/Documents/HBuilderProjects/todoPlus/pages/index/index.vue"]]);
  const _sfc_main$h = {
    name: "UniCard",
    emits: ["click"],
    props: {
      title: {
        type: String,
        default: ""
      },
      subTitle: {
        type: String,
        default: ""
      },
      padding: {
        type: String,
        default: "10px"
      },
      margin: {
        type: String,
        default: "15px"
      },
      spacing: {
        type: String,
        default: "0 10px"
      },
      extra: {
        type: String,
        default: ""
      },
      cover: {
        type: String,
        default: ""
      },
      thumbnail: {
        type: String,
        default: ""
      },
      isFull: {
        // 内容区域是否通栏
        type: Boolean,
        default: false
      },
      isShadow: {
        // 是否开启阴影
        type: Boolean,
        default: true
      },
      shadow: {
        type: String,
        default: "0px 0px 3px 1px rgba(0, 0, 0, 0.08)"
      },
      border: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      onClick(type) {
        this.$emit("click", type);
      }
    }
  };
  function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uni-card", { "uni-card--full": $props.isFull, "uni-card--shadow": $props.isShadow, "uni-card--border": $props.border }]),
        style: vue.normalizeStyle({ "margin": $props.isFull ? 0 : $props.margin, "padding": $props.spacing, "box-shadow": $props.isShadow ? $props.shadow : "" })
      },
      [
        vue.createCommentVNode(" 封面 "),
        vue.renderSlot(_ctx.$slots, "cover", {}, () => [
          $props.cover ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "uni-card__cover"
          }, [
            vue.createElementVNode("image", {
              class: "uni-card__cover-image",
              mode: "widthFix",
              onClick: _cache[0] || (_cache[0] = ($event) => $options.onClick("cover")),
              src: $props.cover
            }, null, 8, ["src"])
          ])) : vue.createCommentVNode("v-if", true)
        ], true),
        vue.renderSlot(_ctx.$slots, "title", {}, () => [
          $props.title || $props.extra ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "uni-card__header"
          }, [
            vue.createCommentVNode(" 卡片标题 "),
            vue.createElementVNode("view", {
              class: "uni-card__header-box",
              onClick: _cache[1] || (_cache[1] = ($event) => $options.onClick("title"))
            }, [
              $props.thumbnail ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "uni-card__header-avatar"
              }, [
                vue.createElementVNode("image", {
                  class: "uni-card__header-avatar-image",
                  src: $props.thumbnail,
                  mode: "aspectFit"
                }, null, 8, ["src"])
              ])) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode("view", { class: "uni-card__header-content" }, [
                vue.createElementVNode(
                  "text",
                  { class: "uni-card__header-content-title uni-ellipsis" },
                  vue.toDisplayString($props.title),
                  1
                  /* TEXT */
                ),
                $props.title && $props.subTitle ? (vue.openBlock(), vue.createElementBlock(
                  "text",
                  {
                    key: 0,
                    class: "uni-card__header-content-subtitle uni-ellipsis"
                  },
                  vue.toDisplayString($props.subTitle),
                  1
                  /* TEXT */
                )) : vue.createCommentVNode("v-if", true)
              ])
            ]),
            vue.createElementVNode("view", {
              class: "uni-card__header-extra",
              onClick: _cache[2] || (_cache[2] = ($event) => $options.onClick("extra"))
            }, [
              vue.createElementVNode(
                "text",
                { class: "uni-card__header-extra-text" },
                vue.toDisplayString($props.extra),
                1
                /* TEXT */
              )
            ])
          ])) : vue.createCommentVNode("v-if", true)
        ], true),
        vue.createCommentVNode(" 卡片内容 "),
        vue.createElementVNode(
          "view",
          {
            class: "uni-card__content",
            style: vue.normalizeStyle({ padding: $props.padding }),
            onClick: _cache[3] || (_cache[3] = ($event) => $options.onClick("content"))
          },
          [
            vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ],
          4
          /* STYLE */
        ),
        vue.createElementVNode("view", {
          class: "uni-card__actions",
          onClick: _cache[4] || (_cache[4] = ($event) => $options.onClick("actions"))
        }, [
          vue.renderSlot(_ctx.$slots, "actions", {}, void 0, true)
        ])
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$g], ["__scopeId", "data-v-ae4bee67"], ["__file", "C:/Users/Administrator/Documents/HBuilderProjects/todoPlus/uni_modules/uni-card/components/uni-card/uni-card.vue"]]);
  const now = () => {
    return request.get("/util/now");
  };
  const utilApi = {
    now
  };
  const queryList$2 = (data) => {
    return request.post("/task/queryList", data);
  };
  const addTask = (data) => {
    return request.post("/task/add", data);
  };
  const updateTask = (data) => {
    return request.post("/task/upd", data);
  };
  const deleteTask = (id) => {
    return request.delete(`/task/del/${id}`);
  };
  const complete = (id) => {
    return request.get(`/task/complete/${id}`);
  };
  const updSorts = (ids) => {
    return request.post("/task/updSorts", ids);
  };
  const like = (id) => {
    return request.get(`/task/like/${id}`);
  };
  const queryLike = (data) => {
    return request.post("/task/queryLike", data);
  };
  const statistic = (data) => {
    return request.post("/task/statistic", data);
  };
  const taskApi = {
    queryList: queryList$2,
    addTask,
    updateTask,
    deleteTask,
    complete,
    updSorts,
    like,
    queryLike,
    statistic
  };
  const _sfc_main$g = {
    __name: "home",
    setup(__props, { expose: __expose }) {
      __expose();
      const userStore = useUserStore();
      const taskList = vue.ref([]);
      const newTask = vue.ref({
        description: "",
        value: "1"
      });
      const showModal = vue.ref(false);
      const modalClosing = vue.ref(false);
      const focusDescription = vue.ref(false);
      const showEditModal = vue.ref(false);
      const editModalClosing = vue.ref(false);
      const focusEditDescription = vue.ref(false);
      const editTask = vue.ref({
        id: null,
        description: "",
        value: "1"
      });
      const showCompletedTasks = vue.ref(false);
      const currentTimestamp = vue.ref(Date.now());
      let nextDayTimer = null;
      const swipeStates = vue.ref({});
      const touchStartX = vue.ref(0);
      const touchStartY = vue.ref(0);
      const currentSwipeTaskId = vue.ref(null);
      const showMoreMenu = vue.ref(false);
      const moreMenuClosing = vue.ref(false);
      const showAIMenu = vue.ref(false);
      const aiMenuClosing = vue.ref(false);
      const showUserInfoModal = vue.ref(false);
      const userInfoModalClosing = vue.ref(false);
      const showCostModal = vue.ref(false);
      const costModalClosing = vue.ref(false);
      const costAmount = vue.ref("1");
      const focusCostAmount = vue.ref(false);
      const isRefreshing = vue.ref(false);
      const refresherTriggered = vue.ref(false);
      const addBtnTouchStartX = vue.ref(0);
      const addBtnTouchStartY = vue.ref(0);
      const addBtnSwipeState = vue.ref({
        translateX: 0,
        showCost: false
      });
      const userForm = vue.ref({
        nickname: "",
        backImg: null
      });
      const tempBackgroundUrl = vue.ref("");
      const imageLoadError = vue.ref(false);
      async function refreshMoney() {
        const res2 = await userApi.getMoney();
        userStore.userInfo.money = res2.data;
        userStore.setUserInfo(userStore.userInfo);
      }
      async function refreshUserInfo() {
        const res2 = await userApi.getUserInfo();
        userStore.userInfo = res2.data;
        userStore.setUserInfo(userStore.userInfo);
      }
      const currentBackgroundImage = vue.computed(() => {
        return userStore.userInfo.backgroudImg || "";
      });
      const currentDate = vue.computed(() => {
        const now2 = new Date(currentTimestamp.value);
        const month = now2.getMonth() + 1;
        const date = now2.getDate();
        const weekdays = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        const weekday = weekdays[now2.getDay()];
        return `${month}月${date}日 ${weekday}`;
      });
      const showBackgroundImage = vue.computed(() => {
        return currentBackgroundImage.value && !imageLoadError.value;
      });
      const formattedMoney = vue.computed(() => {
        const money = userStore.userInfo.money || 0;
        return money.toLocaleString();
      });
      const uncompletedTasks = vue.computed(() => {
        return taskList.value.filter((task) => !task.isCompleted).sort((a, b) => (a.sort || 0) - (b.sort || 0));
      });
      const completedTasks = vue.computed(() => {
        return taskList.value.filter((task) => task.isCompleted).sort((a, b) => (a.sort || 0) - (b.sort || 0));
      });
      const openSettings = () => {
        userForm.value.nickname = userStore.userInfo.nickname || "";
        userForm.value.backImg = null;
        tempBackgroundUrl.value = userStore.userInfo.backgroudImg || "";
        showUserInfoModal.value = true;
      };
      const openMore = () => {
        showMoreMenu.value = true;
      };
      const openAIMenu = () => {
        showAIMenu.value = true;
      };
      const closeAIMenu = () => {
        aiMenuClosing.value = true;
        setTimeout(() => {
          showAIMenu.value = false;
          aiMenuClosing.value = false;
        }, 300);
      };
      const goToChat = () => {
        closeAIMenu();
        setTimeout(() => {
          uni.navigateTo({
            url: "/pages/chat/chat"
          });
        }, 300);
      };
      const goToPersona = () => {
        closeAIMenu();
        setTimeout(() => {
          uni.navigateTo({
            url: "/pages/aiRole/aiRole"
          });
        }, 300);
      };
      const goToAISettings = () => {
        closeAIMenu();
        setTimeout(() => {
          uni.navigateTo({
            url: "/pages/aiSetting/aiSetting"
          });
        }, 300);
      };
      const toggleTask = async (taskId) => {
        try {
          const res2 = await taskApi.complete(taskId);
          if (res2.code === 200 || res2.code === "200") {
            await fetchTaskList();
            refreshMoney();
          } else {
            uni.showToast({
              title: res2.message || "操作失败",
              icon: "none"
            });
          }
        } catch (error) {
          formatAppLog("error", "at pages/home/home.vue:592", "切换任务状态失败:", error);
          uni.showToast({
            title: "操作失败",
            icon: "none"
          });
        }
      };
      const toggleStar = async (taskId) => {
        try {
          const res2 = await taskApi.like(taskId);
          if (res2.code === 200 || res2.code === "200") {
            await fetchTaskList();
          } else {
            uni.showToast({
              title: res2.message || "操作失败",
              icon: "none"
            });
          }
        } catch (error) {
          formatAppLog("error", "at pages/home/home.vue:613", "切换收藏状态失败:", error);
          uni.showToast({
            title: "操作失败",
            icon: "none"
          });
        }
      };
      const toggleCompletedTasks = () => {
        showCompletedTasks.value = !showCompletedTasks.value;
      };
      const handleTouchStart = (e, taskId) => {
        touchStartX.value = e.touches[0].clientX;
        touchStartY.value = e.touches[0].clientY;
        currentSwipeTaskId.value = taskId;
      };
      const handleTouchMove = (e, taskId) => {
        if (currentSwipeTaskId.value !== taskId)
          return;
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;
        const deltaX = touchX - touchStartX.value;
        const deltaY = touchY - touchStartY.value;
        if (Math.abs(deltaY) > Math.abs(deltaX))
          return;
        if (deltaX < 0) {
          const translateX = Math.max(deltaX * 0.5, -120);
          if (!swipeStates.value[taskId]) {
            swipeStates.value[taskId] = {};
          }
          swipeStates.value[taskId].translateX = translateX;
          swipeStates.value[taskId].showDelete = translateX < -30;
        }
      };
      const handleTouchEnd = (e, taskId) => {
        if (currentSwipeTaskId.value !== taskId)
          return;
        const state = swipeStates.value[taskId];
        if (!state)
          return;
        if (state.translateX < -60) {
          confirmDelete(taskId);
        } else if (state.translateX < -30) {
          state.translateX = -120;
          state.showDelete = true;
        } else {
          resetSwipeState(taskId);
        }
        currentSwipeTaskId.value = null;
      };
      const resetSwipeState = (taskId) => {
        if (swipeStates.value[taskId]) {
          swipeStates.value[taskId].translateX = 0;
          swipeStates.value[taskId].showDelete = false;
        }
      };
      const resetAllSwipeStates = () => {
        Object.keys(swipeStates.value).forEach((taskId) => {
          resetSwipeState(taskId);
        });
      };
      const handleScroll = () => {
        resetAllSwipeStates();
        resetAddBtnSwipeState();
      };
      const confirmDelete = (taskId) => {
        resetAllSwipeStates();
        const task = getTaskById(taskId);
        if (!task) {
          formatAppLog("error", "at pages/home/home.vue:701", "未找到要删除的任务:", taskId);
          return;
        }
        uni.showModal({
          title: "删除确认",
          content: `确定要删除"${task.taskDescription}"任务吗？`,
          confirmColor: "#f56c6c",
          success: async (res2) => {
            if (res2.confirm) {
              await executeDelete(taskId);
            }
          }
        });
      };
      const executeDelete = async (taskId) => {
        if (!taskId)
          return;
        uni.showLoading({
          title: "删除中..."
        });
        try {
          const res2 = await taskApi.deleteTask(taskId);
          uni.hideLoading();
          if (res2.code === 200 || res2.code === "200") {
            uni.showToast({
              title: "任务已删除",
              icon: "success"
            });
            await fetchTaskList();
          } else {
            uni.showToast({
              title: res2.message || "删除失败",
              icon: "none"
            });
          }
        } catch (error) {
          uni.hideLoading();
          uni.showToast({
            title: "删除失败",
            icon: "none"
          });
          formatAppLog("error", "at pages/home/home.vue:748", "删除任务失败:", error);
        }
      };
      const getTaskById = (taskId) => {
        return taskList.value.find((task) => task.id === taskId);
      };
      const closeMoreMenu = () => {
        moreMenuClosing.value = true;
        setTimeout(() => {
          showMoreMenu.value = false;
          moreMenuClosing.value = false;
        }, 300);
      };
      const goToFavorites = () => {
        closeMoreMenu();
        setTimeout(() => {
          uni.navigateTo({
            url: "/pages/like/like"
          });
        }, 300);
      };
      const goToStatistics = () => {
        closeMoreMenu();
        setTimeout(() => {
          uni.navigateTo({
            url: "/pages/statistics/statistics"
          });
        }, 300);
      };
      const goToCharts = () => {
        closeMoreMenu();
        setTimeout(() => {
          uni.navigateTo({
            url: "/pages/charts/charts"
          });
        }, 300);
      };
      const goToMilestone = () => {
        closeMoreMenu();
        setTimeout(() => {
          uni.navigateTo({
            url: "/pages/milestore/milestore"
          });
        }, 300);
      };
      const goToTemplate = () => {
        closeMoreMenu();
        setTimeout(() => {
          uni.navigateTo({
            url: "/pages/template/template"
          });
        }, 300);
      };
      const goToTrade = () => {
        closeMoreMenu();
        setTimeout(() => {
          uni.navigateTo({
            url: "/pages/trade/trade"
          });
        }, 300);
      };
      const showAddTaskModal = () => {
        showModal.value = true;
        setTimeout(() => {
          focusDescription.value = true;
        }, 300);
      };
      const editTaskItem = (task, event) => {
        if (event) {
          event.stopPropagation();
        }
        if (task.isCompleted) {
          return;
        }
        editTask.value = {
          id: task.id,
          description: task.taskDescription,
          value: task.value ? task.value.toString() : "1"
        };
        showEditModal.value = true;
        setTimeout(() => {
          focusEditDescription.value = true;
        }, 300);
      };
      const closeEditTaskModal = () => {
        editModalClosing.value = true;
        focusEditDescription.value = false;
        setTimeout(() => {
          showEditModal.value = false;
          editModalClosing.value = false;
          editTask.value = {
            id: null,
            description: "",
            value: "1"
          };
        }, 300);
      };
      const handleAddBtnTouchStart = (e) => {
        addBtnTouchStartX.value = e.touches[0].clientX;
        addBtnTouchStartY.value = e.touches[0].clientY;
      };
      const handleAddBtnTouchMove = (e) => {
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;
        const deltaX = touchX - addBtnTouchStartX.value;
        const deltaY = touchY - addBtnTouchStartY.value;
        if (Math.abs(deltaY) > Math.abs(deltaX))
          return;
        if (deltaX < 0) {
          const translateX = Math.max(deltaX * 0.5, -120);
          addBtnSwipeState.value.translateX = translateX;
          addBtnSwipeState.value.showCost = translateX < -30;
        }
      };
      const handleAddBtnTouchEnd = (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        touchEndX - addBtnTouchStartX.value;
        if (addBtnSwipeState.value.translateX < -30) {
          showCostModal.value = true;
          setTimeout(() => {
            focusCostAmount.value = true;
          }, 300);
          setTimeout(() => {
            resetAddBtnSwipeState();
          }, 100);
          e.preventDefault();
          e.stopPropagation();
        } else {
          resetAddBtnSwipeState();
        }
      };
      const resetAddBtnSwipeState = () => {
        addBtnSwipeState.value.translateX = 0;
        addBtnSwipeState.value.showCost = false;
      };
      const closeAddTaskModal = () => {
        modalClosing.value = true;
        focusDescription.value = false;
        setTimeout(() => {
          showModal.value = false;
          modalClosing.value = false;
          newTask.value = {
            description: "",
            value: "1"
          };
        }, 300);
      };
      const addTask2 = async () => {
        if (!newTask.value.description.trim()) {
          uni.showToast({
            title: "请输入任务描述",
            icon: "none"
          });
          return;
        }
        uni.showLoading({
          title: "添加中..."
        });
        try {
          const reqData = {
            desc: newTask.value.description.trim(),
            value: parseInt(newTask.value.value) || 1
          };
          const res2 = await taskApi.addTask(reqData);
          uni.hideLoading();
          if (res2.code === 200 || res2.code === "200") {
            closeAddTaskModal();
            uni.showToast({
              title: "任务添加成功",
              icon: "success"
            });
            fetchTaskList();
          } else {
            uni.showToast({
              title: res2.message || "添加失败",
              icon: "none"
            });
          }
        } catch (error) {
          uni.hideLoading();
          uni.showToast({
            title: "添加失败",
            icon: "none"
          });
          formatAppLog("error", "at pages/home/home.vue:992", "添加任务失败:", error);
        }
      };
      const updateTask2 = async () => {
        if (!editTask.value.description.trim()) {
          uni.showToast({
            title: "请输入任务描述",
            icon: "none"
          });
          return;
        }
        uni.showLoading({
          title: "修改中..."
        });
        try {
          const reqData = {
            id: editTask.value.id,
            desc: editTask.value.description.trim(),
            value: parseInt(editTask.value.value) || 1
          };
          const res2 = await taskApi.updateTask(reqData);
          uni.hideLoading();
          if (res2.code === 200 || res2.code === "200") {
            closeEditTaskModal();
            uni.showToast({
              title: "任务修改成功",
              icon: "success"
            });
            fetchTaskList();
          } else {
            uni.showToast({
              title: res2.message || "修改失败",
              icon: "none"
            });
          }
        } catch (error) {
          uni.hideLoading();
          uni.showToast({
            title: "修改失败",
            icon: "none"
          });
          formatAppLog("error", "at pages/home/home.vue:1039", "修改任务失败:", error);
        }
      };
      const validateNumber = (e) => {
        let value = e.detail.value || e.target.value;
        value = value.replace(/[^\d]/g, "");
        if (value && parseInt(value) < 1) {
          value = "1";
        }
        if (!value) {
          value = "1";
        }
        newTask.value.value = value;
      };
      const increaseValue = () => {
        const currentValue = parseInt(newTask.value.value) || 1;
        newTask.value.value = (currentValue + 1).toString();
      };
      const decreaseValue = () => {
        const currentValue = parseInt(newTask.value.value) || 1;
        if (currentValue > 1) {
          newTask.value.value = (currentValue - 1).toString();
        }
      };
      const validateEditNumber = (e) => {
        let value = e.detail.value || e.target.value;
        value = value.replace(/[^\d]/g, "");
        if (value && parseInt(value) < 1) {
          value = "1";
        }
        if (!value) {
          value = "1";
        }
        editTask.value.value = value;
      };
      const increaseEditValue = () => {
        const currentValue = parseInt(editTask.value.value) || 1;
        editTask.value.value = (currentValue + 1).toString();
      };
      const decreaseEditValue = () => {
        const currentValue = parseInt(editTask.value.value) || 1;
        if (currentValue > 1) {
          editTask.value.value = (currentValue - 1).toString();
        }
      };
      const fetchCurrentTime = async () => {
        try {
          const res2 = await utilApi.now();
          if (res2 && res2.data) {
            currentTimestamp.value = res2.data;
          }
        } catch (error) {
          formatAppLog("error", "at pages/home/home.vue:1103", "获取服务器时间失败:", error);
          currentTimestamp.value = Date.now();
        }
      };
      const setupNextDayTimer = () => {
        if (nextDayTimer) {
          clearTimeout(nextDayTimer);
        }
        const now2 = new Date(currentTimestamp.value);
        const tomorrow = new Date(now2.getFullYear(), now2.getMonth(), now2.getDate() + 1, 0, 0, 0, 0);
        const msUntilTomorrow = tomorrow.getTime() - now2.getTime();
        nextDayTimer = setTimeout(async () => {
          await fetchCurrentTime();
          formatAppLog("log", "at pages/home/home.vue:1125", "自动更新时间:", new Date(currentTimestamp.value));
          setupNextDayTimer();
        }, msUntilTomorrow);
        formatAppLog("log", "at pages/home/home.vue:1131", `设置每日更新定时器，${Math.round(msUntilTomorrow / 1e3 / 60)} 分钟后触发`);
      };
      const fetchTaskList = async () => {
        try {
          const res2 = await taskApi.queryList({ isToday: true, pageNo: 1, pageSize: 1e4 });
          if (res2 && res2.code === "200" && res2.data && res2.data.list) {
            taskList.value = res2.data.list;
          }
        } catch (error) {
          formatAppLog("error", "at pages/home/home.vue:1142", "获取任务列表失败:", error);
          uni.showToast({
            title: "获取任务列表失败",
            icon: "none"
          });
        }
      };
      const handleImageError = () => {
        imageLoadError.value = true;
        uni.showToast({
          title: "背景图片加载失败",
          icon: "none"
        });
      };
      const handleImageLoad = () => {
        imageLoadError.value = false;
      };
      const chooseBackgroundImage = () => {
        uni.chooseImage({
          count: 1,
          sizeType: ["compressed"],
          sourceType: ["album", "camera"],
          success: (res2) => {
            const tempFilePath = res2.tempFilePaths[0];
            uni.getFileInfo({
              filePath: tempFilePath,
              success: (fileInfo) => {
                userForm.value.backImg = {
                  path: tempFilePath,
                  size: fileInfo.size
                };
                tempBackgroundUrl.value = tempFilePath;
              }
            });
          },
          fail: () => {
          }
        });
      };
      const removeBackgroundImage = () => {
        userForm.value.backImg = null;
        tempBackgroundUrl.value = "";
      };
      const closeUserInfoModal = () => {
        userInfoModalClosing.value = true;
        setTimeout(() => {
          showUserInfoModal.value = false;
          userInfoModalClosing.value = false;
          userForm.value = {
            nickname: "",
            backImg: null
          };
          tempBackgroundUrl.value = "";
        }, 300);
      };
      const updateUserInfo = async () => {
        if (!userForm.value.nickname.trim()) {
          uni.showToast({
            title: "请输入昵称",
            icon: "none"
          });
          return;
        }
        uni.showLoading({
          title: "更新中..."
        });
        try {
          const res2 = await userApi.upd(userForm.value.nickname.trim(), userForm.value.backImg);
          uni.hideLoading();
          if (res2.code === 200 || res2.code === "200") {
            const updatedUserInfo = {
              ...userStore.userInfo,
              nickname: userForm.value.nickname.trim()
            };
            if (res2.data && res2.data.backImg) {
              updatedUserInfo.backgroudImg = res2.data.backImg;
            } else if (tempBackgroundUrl.value && userForm.value.backImg) {
              updatedUserInfo.backgroudImg = tempBackgroundUrl.value;
            }
            userStore.setUserInfo(updatedUserInfo);
            uni.showToast({
              title: "修改成功",
              icon: "success"
            });
            closeUserInfoModal();
            refreshUserInfo();
          } else {
            uni.showToast({
              title: res2.message || "修改失败",
              icon: "none"
            });
          }
        } catch (error) {
          uni.hideLoading();
          uni.showToast({
            title: "修改失败",
            icon: "none"
          });
          formatAppLog("error", "at pages/home/home.vue:1259", "修改用户信息失败:", error);
        }
      };
      const openCostModal = () => {
        showCostModal.value = true;
        setTimeout(() => {
          focusCostAmount.value = true;
        }, 300);
      };
      const closeCostModal = () => {
        costModalClosing.value = true;
        focusCostAmount.value = false;
        setTimeout(() => {
          showCostModal.value = false;
          costModalClosing.value = false;
          costAmount.value = "1";
          resetAddBtnSwipeState();
        }, 300);
      };
      const validateCostAmount = (e) => {
        let value = e.detail.value || e.target.value;
        value = value.replace(/[^\d]/g, "");
        if (value && parseInt(value) < 1) {
          value = "1";
        }
        if (!value) {
          value = "1";
        }
        costAmount.value = value;
      };
      const executeCost = async () => {
        const amount = parseInt(costAmount.value);
        if (!amount || amount < 1) {
          uni.showToast({
            title: "请输入有效金额",
            icon: "none"
          });
          return;
        }
        uni.showLoading({
          title: "消费中..."
        });
        try {
          const res2 = await userApi.cost(amount);
          uni.hideLoading();
          if (res2.code === 200 || res2.code === "200") {
            uni.showToast({
              title: "消费成功",
              icon: "success"
            });
            closeCostModal();
            await refreshMoney();
          } else {
            formatAppLog("log", "at pages/home/home.vue:1325", "xxx", res2);
            uni.showToast({
              title: res2.data.message || "消费失败",
              icon: "none"
            });
          }
        } catch (error) {
          uni.hideLoading();
          uni.showToast({
            title: res.data.message || "消费失败",
            icon: "none"
          });
          formatAppLog("error", "at pages/home/home.vue:1337", "消费失败:", error);
        }
      };
      const handleRefresherPulling = (e) => {
      };
      const handleRefresherRefresh = async () => {
        refresherTriggered.value = true;
        isRefreshing.value = true;
        try {
          await Promise.all([
            fetchTaskList(),
            refreshMoney(),
            refreshUserInfo(),
            fetchCurrentTime()
          ]);
          uni.showToast({
            title: "刷新成功",
            icon: "success",
            duration: 1500
          });
        } catch (error) {
          formatAppLog("error", "at pages/home/home.vue:1367", "刷新失败:", error);
          uni.showToast({
            title: "刷新失败，请重试",
            icon: "none",
            duration: 2e3
          });
        } finally {
          setTimeout(() => {
            refresherTriggered.value = false;
            isRefreshing.value = false;
          }, 800);
        }
      };
      const handleRefresherRestore = () => {
        refresherTriggered.value = false;
        isRefreshing.value = false;
      };
      const handleLogout = async () => {
        uni.showModal({
          title: "确认退出",
          content: "确定要退出登录吗？",
          success: async (res2) => {
            if (res2.confirm) {
              uni.showLoading({
                title: "退出中..."
              });
              try {
                await userApi.logout();
              } catch (error) {
                formatAppLog("error", "at pages/home/home.vue:1403", "调用退出登录接口失败:", error);
              } finally {
                userStore.logout();
                uni.hideLoading();
                uni.showToast({
                  title: "已退出登录",
                  icon: "success"
                });
                setTimeout(() => {
                  uni.reLaunch({
                    url: "/pages/index/index"
                  });
                }, 1e3);
              }
            }
          }
        });
      };
      vue.onMounted(async () => {
        await fetchCurrentTime();
        setupNextDayTimer();
        userStore.initUserInfo();
        fetchTaskList();
      });
      onShow(async () => {
        try {
          await Promise.all([
            fetchTaskList(),
            refreshMoney(),
            refreshUserInfo(),
            fetchCurrentTime()
          ]);
        } catch (error) {
          formatAppLog("error", "at pages/home/home.vue:1447", "页面刷新失败:", error);
        }
      });
      vue.onUnmounted(() => {
        if (nextDayTimer) {
          clearTimeout(nextDayTimer);
          nextDayTimer = null;
        }
      });
      const __returned__ = { userStore, taskList, newTask, showModal, modalClosing, focusDescription, showEditModal, editModalClosing, focusEditDescription, editTask, showCompletedTasks, currentTimestamp, get nextDayTimer() {
        return nextDayTimer;
      }, set nextDayTimer(v) {
        nextDayTimer = v;
      }, swipeStates, touchStartX, touchStartY, currentSwipeTaskId, showMoreMenu, moreMenuClosing, showAIMenu, aiMenuClosing, showUserInfoModal, userInfoModalClosing, showCostModal, costModalClosing, costAmount, focusCostAmount, isRefreshing, refresherTriggered, addBtnTouchStartX, addBtnTouchStartY, addBtnSwipeState, userForm, tempBackgroundUrl, imageLoadError, refreshMoney, refreshUserInfo, currentBackgroundImage, currentDate, showBackgroundImage, formattedMoney, uncompletedTasks, completedTasks, openSettings, openMore, openAIMenu, closeAIMenu, goToChat, goToPersona, goToAISettings, toggleTask, toggleStar, toggleCompletedTasks, handleTouchStart, handleTouchMove, handleTouchEnd, resetSwipeState, resetAllSwipeStates, handleScroll, confirmDelete, executeDelete, getTaskById, closeMoreMenu, goToFavorites, goToStatistics, goToCharts, goToMilestone, goToTemplate, goToTrade, showAddTaskModal, editTaskItem, closeEditTaskModal, handleAddBtnTouchStart, handleAddBtnTouchMove, handleAddBtnTouchEnd, resetAddBtnSwipeState, closeAddTaskModal, addTask: addTask2, updateTask: updateTask2, validateNumber, increaseValue, decreaseValue, validateEditNumber, increaseEditValue, decreaseEditValue, fetchCurrentTime, setupNextDayTimer, fetchTaskList, handleImageError, handleImageLoad, chooseBackgroundImage, removeBackgroundImage, closeUserInfoModal, updateUserInfo, openCostModal, closeCostModal, validateCostAmount, executeCost, handleRefresherPulling, handleRefresherRefresh, handleRefresherRestore, handleLogout, ref: vue.ref, computed: vue.computed, onMounted: vue.onMounted, onUnmounted: vue.onUnmounted, get onShow() {
        return onShow;
      }, get utilApi() {
        return utilApi;
      }, get userApi() {
        return userApi;
      }, get taskApi() {
        return taskApi;
      }, get useUserStore() {
        return useUserStore;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0);
    const _component_uni_card = resolveEasycom(vue.resolveDynamicComponent("uni-card"), __easycom_1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "home-container" }, [
      vue.createCommentVNode(" 背景图片 "),
      $setup.currentBackgroundImage ? (vue.openBlock(), vue.createElementBlock("image", {
        key: 0,
        src: $setup.currentBackgroundImage,
        class: "background-image",
        mode: "aspectFill",
        onError: $setup.handleImageError,
        onLoad: $setup.handleImageLoad
      }, null, 40, ["src"])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 顶部导航 "),
      vue.createElementVNode("view", { class: "nav-header" }, [
        vue.createElementVNode("view", { class: "nav-left" }, [
          vue.createElementVNode("view", { class: "icon-wrapper" }, [
            vue.createVNode(_component_uni_icons, {
              type: "undo",
              size: "24",
              color: "#fff",
              onClick: $setup.handleLogout
            })
          ]),
          vue.createElementVNode("view", { class: "icon-wrapper" }, [
            vue.createVNode(_component_uni_icons, {
              type: "chatboxes",
              size: "24",
              color: "#fff",
              onClick: $setup.openAIMenu
            })
          ])
        ]),
        vue.createElementVNode("view", { class: "nav-center" }, [
          vue.createElementVNode(
            "text",
            { class: "money-text" },
            "¥" + vue.toDisplayString($setup.formattedMoney),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "nav-right" }, [
          vue.createElementVNode("view", { class: "icon-wrapper" }, [
            vue.createVNode(_component_uni_icons, {
              type: "more-filled",
              size: "24",
              color: "#fff",
              onClick: $setup.openMore
            })
          ]),
          vue.createElementVNode("view", { class: "icon-wrapper" }, [
            vue.createVNode(_component_uni_icons, {
              type: "gear",
              size: "24",
              color: "#fff",
              onClick: $setup.openSettings
            })
          ])
        ])
      ]),
      vue.createCommentVNode(" 日期 "),
      vue.createElementVNode("view", { class: "date-header" }, [
        vue.createElementVNode(
          "text",
          { class: "date-info" },
          vue.toDisplayString($setup.currentDate),
          1
          /* TEXT */
        )
      ]),
      vue.createCommentVNode(" 任务列表 "),
      vue.createElementVNode("scroll-view", {
        class: "task-list",
        "scroll-y": "true",
        onScroll: $setup.handleScroll,
        "refresher-enabled": "true",
        "refresher-background": "transparent",
        "refresher-triggered": $setup.refresherTriggered,
        onRefresherpulling: $setup.handleRefresherPulling,
        onRefresherrefresh: $setup.handleRefresherRefresh,
        onRefresherrestore: $setup.handleRefresherRestore
      }, [
        vue.createCommentVNode(" 未完成的任务 "),
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.uncompletedTasks, (task, index) => {
            return vue.openBlock(), vue.createBlock(
              _component_uni_card,
              {
                key: task.id,
                "is-shadow": false,
                border: false,
                margin: "8rpx 20rpx",
                class: "task-card task-swipe-container"
              },
              {
                default: vue.withCtx(() => {
                  var _a2, _b;
                  return [
                    vue.createElementVNode("view", { class: "task-swipe-wrapper" }, [
                      vue.createElementVNode("view", {
                        class: "task-item",
                        style: vue.normalizeStyle({ transform: `translateX(${((_a2 = $setup.swipeStates[task.id]) == null ? void 0 : _a2.translateX) || 0}rpx)` }),
                        onTouchstart: ($event) => $setup.handleTouchStart($event, task.id),
                        onTouchmove: ($event) => $setup.handleTouchMove($event, task.id),
                        onTouchend: ($event) => $setup.handleTouchEnd($event, task.id)
                      }, [
                        vue.createElementVNode("view", {
                          class: "task-checkbox",
                          onClick: ($event) => $setup.toggleTask(task.id)
                        }, [
                          vue.createVNode(_component_uni_icons, {
                            type: "checkbox",
                            size: 24,
                            color: "#C7C7CC"
                          })
                        ], 8, ["onClick"]),
                        vue.createElementVNode("view", {
                          class: "task-content",
                          onClick: ($event) => $setup.editTaskItem(task, $event)
                        }, [
                          vue.createElementVNode(
                            "text",
                            { class: "task-description" },
                            vue.toDisplayString(task.taskDescription),
                            1
                            /* TEXT */
                          ),
                          task.value && task.value >= 1 ? (vue.openBlock(), vue.createElementBlock("view", {
                            key: 0,
                            class: "task-value"
                          }, [
                            vue.createVNode(_component_uni_icons, {
                              type: "wallet",
                              size: "14",
                              color: "#666"
                            }),
                            vue.createElementVNode(
                              "text",
                              { class: "value-text" },
                              vue.toDisplayString(task.value),
                              1
                              /* TEXT */
                            )
                          ])) : vue.createCommentVNode("v-if", true)
                        ], 8, ["onClick"]),
                        vue.createElementVNode("view", { class: "task-actions" }, [
                          vue.createVNode(_component_uni_icons, {
                            type: task.like ? "star-filled" : "star",
                            size: 24,
                            color: task.like ? "#FFD700" : "#C7C7CC",
                            onClick: ($event) => $setup.toggleStar(task.id)
                          }, null, 8, ["type", "color", "onClick"])
                        ])
                      ], 44, ["onTouchstart", "onTouchmove", "onTouchend"]),
                      ((_b = $setup.swipeStates[task.id]) == null ? void 0 : _b.showDelete) ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 0,
                        class: "delete-action",
                        onClick: ($event) => $setup.confirmDelete(task.id)
                      }, [
                        vue.createVNode(_component_uni_icons, {
                          type: "trash",
                          size: "24",
                          color: "#fff"
                        })
                      ], 8, ["onClick"])) : vue.createCommentVNode("v-if", true)
                    ])
                  ];
                }),
                _: 2
                /* DYNAMIC */
              },
              1024
              /* DYNAMIC_SLOTS */
            );
          }),
          128
          /* KEYED_FRAGMENT */
        )),
        vue.createCommentVNode(" 已完成分组标题 "),
        $setup.completedTasks.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "section-title",
          onClick: $setup.toggleCompletedTasks
        }, [
          vue.createVNode(_component_uni_icons, {
            type: $setup.showCompletedTasks ? "down" : "right",
            size: "16",
            color: "rgba(255, 255, 255, 0.7)"
          }, null, 8, ["type"]),
          vue.createElementVNode("text", { class: "section-text" }, "已完成")
        ])) : vue.createCommentVNode("v-if", true),
        vue.createCommentVNode(" 已完成的任务 "),
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["completed-tasks-container", { "collapsed": !$setup.showCompletedTasks }])
          },
          [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.completedTasks, (task, index) => {
                return vue.openBlock(), vue.createBlock(
                  _component_uni_card,
                  {
                    key: task.id,
                    "is-shadow": false,
                    border: false,
                    margin: "8rpx 20rpx",
                    class: "task-card task-swipe-container"
                  },
                  {
                    default: vue.withCtx(() => {
                      var _a2, _b;
                      return [
                        vue.createElementVNode("view", { class: "task-swipe-wrapper" }, [
                          vue.createElementVNode("view", {
                            class: "task-item",
                            style: vue.normalizeStyle({ transform: `translateX(${((_a2 = $setup.swipeStates[task.id]) == null ? void 0 : _a2.translateX) || 0}rpx)` }),
                            onTouchstart: ($event) => $setup.handleTouchStart($event, task.id),
                            onTouchmove: ($event) => $setup.handleTouchMove($event, task.id),
                            onTouchend: ($event) => $setup.handleTouchEnd($event, task.id)
                          }, [
                            vue.createElementVNode("view", {
                              class: "task-checkbox",
                              onClick: ($event) => $setup.toggleTask(task.id)
                            }, [
                              vue.createVNode(_component_uni_icons, {
                                type: "checkbox",
                                size: 24,
                                color: "#4CD964"
                              })
                            ], 8, ["onClick"]),
                            vue.createElementVNode("view", {
                              class: "task-content completed-task",
                              onClick: ($event) => $setup.editTaskItem(task, $event)
                            }, [
                              vue.createElementVNode(
                                "text",
                                { class: "task-description completed" },
                                vue.toDisplayString(task.taskDescription),
                                1
                                /* TEXT */
                              ),
                              task.value && task.value >= 1 ? (vue.openBlock(), vue.createElementBlock("view", {
                                key: 0,
                                class: "task-value"
                              }, [
                                vue.createVNode(_component_uni_icons, {
                                  type: "wallet",
                                  size: "14",
                                  color: "#666"
                                }),
                                vue.createElementVNode(
                                  "text",
                                  { class: "value-text" },
                                  vue.toDisplayString(task.value),
                                  1
                                  /* TEXT */
                                )
                              ])) : vue.createCommentVNode("v-if", true)
                            ], 8, ["onClick"]),
                            vue.createElementVNode("view", { class: "task-actions" }, [
                              vue.createVNode(_component_uni_icons, {
                                type: task.like ? "star-filled" : "star",
                                size: 24,
                                color: task.like ? "#FFD700" : "#C7C7CC",
                                onClick: ($event) => $setup.toggleStar(task.id)
                              }, null, 8, ["type", "color", "onClick"])
                            ])
                          ], 44, ["onTouchstart", "onTouchmove", "onTouchend"]),
                          ((_b = $setup.swipeStates[task.id]) == null ? void 0 : _b.showDelete) ? (vue.openBlock(), vue.createElementBlock("view", {
                            key: 0,
                            class: "delete-action",
                            onClick: ($event) => $setup.confirmDelete(task.id)
                          }, [
                            vue.createVNode(_component_uni_icons, {
                              type: "trash",
                              size: "24",
                              color: "#fff"
                            })
                          ], 8, ["onClick"])) : vue.createCommentVNode("v-if", true)
                        ])
                      ];
                    }),
                    _: 2
                    /* DYNAMIC */
                  },
                  1024
                  /* DYNAMIC_SLOTS */
                );
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ],
          2
          /* CLASS */
        )
      ], 40, ["refresher-triggered"]),
      vue.createCommentVNode(" 添加任务按钮 "),
      vue.createElementVNode("view", { class: "add-task-container" }, [
        vue.createElementVNode("view", { class: "add-task-swipe-wrapper" }, [
          vue.createElementVNode(
            "view",
            {
              class: "add-task-btn",
              style: vue.normalizeStyle({ transform: `translateX(${$setup.addBtnSwipeState.translateX}rpx)` }),
              onClick: $setup.showAddTaskModal,
              onTouchstart: $setup.handleAddBtnTouchStart,
              onTouchmove: $setup.handleAddBtnTouchMove,
              onTouchend: $setup.handleAddBtnTouchEnd
            },
            [
              vue.createVNode(_component_uni_icons, {
                type: "plus",
                size: "20",
                color: "#fff"
              }),
              vue.createElementVNode("text", { class: "add-btn-text" }, "添加任务")
            ],
            36
            /* STYLE, NEED_HYDRATION */
          ),
          $setup.addBtnSwipeState.showCost ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "cost-action",
            onClick: $setup.openCostModal
          }, [
            vue.createVNode(_component_uni_icons, {
              type: "wallet",
              size: "24",
              color: "#fff"
            })
          ])) : vue.createCommentVNode("v-if", true)
        ])
      ]),
      vue.createCommentVNode(" 添加任务弹窗 "),
      $setup.showModal ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "modal-overlay",
        onClick: $setup.closeAddTaskModal
      }, [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["modal-content", { "closing": $setup.modalClosing }]),
            onClick: _cache[3] || (_cache[3] = vue.withModifiers(() => {
            }, ["stop"]))
          },
          [
            vue.createElementVNode("view", { class: "popup-header" }, [
              vue.createElementVNode("text", { class: "popup-title" }, "新建任务"),
              vue.createElementVNode("view", {
                class: "popup-close",
                onClick: $setup.closeAddTaskModal
              }, [
                vue.createVNode(_component_uni_icons, {
                  type: "close",
                  size: "20",
                  color: "#666"
                })
              ])
            ]),
            vue.createElementVNode("view", { class: "input-group" }, [
              vue.createElementVNode("view", { class: "input-label" }, "任务描述"),
              vue.withDirectives(vue.createElementVNode("input", {
                class: "task-input",
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.newTask.description = $event),
                placeholder: "请输入任务描述...",
                maxlength: "100",
                focus: $setup.focusDescription,
                onBlur: _cache[1] || (_cache[1] = ($event) => $setup.focusDescription = false)
              }, null, 40, ["focus"]), [
                [vue.vModelText, $setup.newTask.description]
              ])
            ]),
            vue.createElementVNode("view", { class: "input-group" }, [
              vue.createElementVNode("view", { class: "input-label" }, "任务价值"),
              vue.createElementVNode("view", { class: "number-input-container" }, [
                vue.withDirectives(vue.createElementVNode(
                  "input",
                  {
                    class: "task-input number-input",
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.newTask.value = $event),
                    type: "number",
                    placeholder: "最小值为1",
                    onInput: $setup.validateNumber
                  },
                  null,
                  544
                  /* NEED_HYDRATION, NEED_PATCH */
                ), [
                  [vue.vModelText, $setup.newTask.value]
                ]),
                vue.createElementVNode("view", { class: "number-controls" }, [
                  vue.createElementVNode("view", {
                    class: "control-btn increase-btn",
                    onClick: $setup.increaseValue
                  }, [
                    vue.createVNode(_component_uni_icons, {
                      type: "plus",
                      size: "20",
                      color: "#fff"
                    })
                  ]),
                  vue.createElementVNode("view", {
                    class: "control-btn decrease-btn",
                    onClick: $setup.decreaseValue
                  }, [
                    vue.createVNode(_component_uni_icons, {
                      type: "minus",
                      size: "20",
                      color: "#fff"
                    })
                  ])
                ])
              ])
            ]),
            vue.createElementVNode("view", { class: "popup-actions" }, [
              vue.createElementVNode("button", {
                class: "cancel-btn",
                onClick: $setup.closeAddTaskModal
              }, "取消"),
              vue.createElementVNode("button", {
                class: "confirm-btn",
                onClick: $setup.addTask,
                disabled: !$setup.newTask.description.trim()
              }, "确认添加", 8, ["disabled"])
            ])
          ],
          2
          /* CLASS */
        )
      ])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 修改任务弹窗 "),
      $setup.showEditModal ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 2,
        class: "modal-overlay",
        onClick: $setup.closeEditTaskModal
      }, [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["modal-content", { "closing": $setup.editModalClosing }]),
            onClick: _cache[7] || (_cache[7] = vue.withModifiers(() => {
            }, ["stop"]))
          },
          [
            vue.createElementVNode("view", { class: "popup-header" }, [
              vue.createElementVNode("text", { class: "popup-title" }, "修改任务"),
              vue.createElementVNode("view", {
                class: "popup-close",
                onClick: $setup.closeEditTaskModal
              }, [
                vue.createVNode(_component_uni_icons, {
                  type: "close",
                  size: "20",
                  color: "#666"
                })
              ])
            ]),
            vue.createElementVNode("view", { class: "input-group" }, [
              vue.createElementVNode("view", { class: "input-label" }, "任务描述"),
              vue.withDirectives(vue.createElementVNode("input", {
                class: "task-input",
                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.editTask.description = $event),
                placeholder: "请输入任务描述...",
                maxlength: "100",
                focus: $setup.focusEditDescription,
                onBlur: _cache[5] || (_cache[5] = ($event) => $setup.focusEditDescription = false)
              }, null, 40, ["focus"]), [
                [vue.vModelText, $setup.editTask.description]
              ])
            ]),
            vue.createElementVNode("view", { class: "input-group" }, [
              vue.createElementVNode("view", { class: "input-label" }, "任务价值"),
              vue.createElementVNode("view", { class: "number-input-container" }, [
                vue.withDirectives(vue.createElementVNode(
                  "input",
                  {
                    class: "task-input number-input",
                    "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $setup.editTask.value = $event),
                    type: "number",
                    placeholder: "最小值为1",
                    onInput: $setup.validateEditNumber
                  },
                  null,
                  544
                  /* NEED_HYDRATION, NEED_PATCH */
                ), [
                  [vue.vModelText, $setup.editTask.value]
                ]),
                vue.createElementVNode("view", { class: "number-controls" }, [
                  vue.createElementVNode("view", {
                    class: "control-btn increase-btn",
                    onClick: $setup.increaseEditValue
                  }, [
                    vue.createVNode(_component_uni_icons, {
                      type: "plus",
                      size: "20",
                      color: "#fff"
                    })
                  ]),
                  vue.createElementVNode("view", {
                    class: "control-btn decrease-btn",
                    onClick: $setup.decreaseEditValue
                  }, [
                    vue.createVNode(_component_uni_icons, {
                      type: "minus",
                      size: "20",
                      color: "#fff"
                    })
                  ])
                ])
              ])
            ]),
            vue.createElementVNode("view", { class: "popup-actions" }, [
              vue.createElementVNode("button", {
                class: "cancel-btn",
                onClick: $setup.closeEditTaskModal
              }, "取消"),
              vue.createElementVNode("button", {
                class: "confirm-btn",
                onClick: $setup.updateTask,
                disabled: !$setup.editTask.description.trim()
              }, "确认修改", 8, ["disabled"])
            ])
          ],
          2
          /* CLASS */
        )
      ])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 用户信息修改弹窗 "),
      $setup.showUserInfoModal ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 3,
        class: "modal-overlay",
        onClick: $setup.closeUserInfoModal
      }, [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["modal-content", { "closing": $setup.userInfoModalClosing }]),
            onClick: _cache[9] || (_cache[9] = vue.withModifiers(() => {
            }, ["stop"]))
          },
          [
            vue.createElementVNode("view", { class: "popup-header" }, [
              vue.createElementVNode("text", { class: "popup-title" }, "修改用户信息"),
              vue.createElementVNode("view", {
                class: "popup-close",
                onClick: $setup.closeUserInfoModal
              }, [
                vue.createVNode(_component_uni_icons, {
                  type: "close",
                  size: "20",
                  color: "#666"
                })
              ])
            ]),
            vue.createElementVNode("view", { class: "input-group" }, [
              vue.createElementVNode("view", { class: "input-label" }, "昵称"),
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  class: "task-input",
                  "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $setup.userForm.nickname = $event),
                  placeholder: "请输入昵称...",
                  maxlength: "20"
                },
                null,
                512
                /* NEED_PATCH */
              ), [
                [vue.vModelText, $setup.userForm.nickname]
              ])
            ]),
            vue.createElementVNode("view", { class: "input-group" }, [
              vue.createElementVNode("view", { class: "input-label" }, "背景图片"),
              $setup.tempBackgroundUrl ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "background-preview"
              }, [
                vue.createElementVNode("image", {
                  src: $setup.tempBackgroundUrl,
                  class: "preview-image",
                  mode: "aspectFill"
                }, null, 8, ["src"]),
                vue.createElementVNode("view", {
                  class: "remove-btn",
                  onClick: $setup.removeBackgroundImage
                }, [
                  vue.createVNode(_component_uni_icons, {
                    type: "close",
                    size: "16",
                    color: "#fff"
                  })
                ])
              ])) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode("view", {
                class: "choose-image-btn",
                onClick: $setup.chooseBackgroundImage
              }, [
                vue.createVNode(_component_uni_icons, {
                  type: "image",
                  size: "24",
                  color: "#667eea"
                }),
                vue.createElementVNode(
                  "text",
                  { class: "choose-text" },
                  vue.toDisplayString($setup.tempBackgroundUrl ? "重新选择" : "选择背景图片"),
                  1
                  /* TEXT */
                )
              ])
            ]),
            vue.createElementVNode("view", { class: "popup-actions" }, [
              vue.createElementVNode("button", {
                class: "cancel-btn",
                onClick: $setup.closeUserInfoModal
              }, "取消"),
              vue.createElementVNode("button", {
                class: "confirm-btn",
                onClick: $setup.updateUserInfo,
                disabled: !$setup.userForm.nickname.trim()
              }, "确认修改", 8, ["disabled"])
            ])
          ],
          2
          /* CLASS */
        )
      ])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 更多菜单弹窗 "),
      $setup.showMoreMenu ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 4,
        class: "modal-overlay",
        onClick: $setup.closeMoreMenu
      }, [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["modal-content more-menu", { "closing": $setup.moreMenuClosing }]),
            onClick: _cache[10] || (_cache[10] = vue.withModifiers(() => {
            }, ["stop"]))
          },
          [
            vue.createElementVNode("view", { class: "menu-header" }, [
              vue.createElementVNode("view", { class: "menu-handle" }),
              vue.createElementVNode("text", { class: "menu-title" }, "列表选项"),
              vue.createElementVNode("text", {
                class: "menu-done",
                onClick: $setup.closeMoreMenu
              }, "完成")
            ]),
            vue.createElementVNode("view", { class: "menu-items" }, [
              vue.createElementVNode("view", {
                class: "menu-item",
                onClick: $setup.goToTrade
              }, [
                vue.createVNode(_component_uni_icons, {
                  type: "wallet",
                  size: "20",
                  color: "#333"
                }),
                vue.createElementVNode("text", { class: "menu-text" }, "交易")
              ]),
              vue.createElementVNode("view", {
                class: "menu-item",
                onClick: $setup.goToFavorites
              }, [
                vue.createVNode(_component_uni_icons, {
                  type: "star",
                  size: "20",
                  color: "#333"
                }),
                vue.createElementVNode("text", { class: "menu-text" }, "收藏")
              ]),
              vue.createElementVNode("view", {
                class: "menu-item",
                onClick: $setup.goToStatistics
              }, [
                vue.createVNode(_component_uni_icons, {
                  type: "bars",
                  size: "20",
                  color: "#333"
                }),
                vue.createElementVNode("text", { class: "menu-text" }, "统计")
              ]),
              vue.createElementVNode("view", {
                class: "menu-item",
                onClick: $setup.goToCharts
              }, [
                vue.createVNode(_component_uni_icons, {
                  type: "circle",
                  size: "20",
                  color: "#333"
                }),
                vue.createElementVNode("text", { class: "menu-text" }, "图表")
              ]),
              vue.createElementVNode("view", {
                class: "menu-item",
                onClick: $setup.goToMilestone
              }, [
                vue.createVNode(_component_uni_icons, {
                  type: "flag",
                  size: "20",
                  color: "#333"
                }),
                vue.createElementVNode("text", { class: "menu-text" }, "里程")
              ]),
              vue.createElementVNode("view", {
                class: "menu-item",
                onClick: $setup.goToTemplate
              }, [
                vue.createVNode(_component_uni_icons, {
                  type: "list",
                  size: "20",
                  color: "#333"
                }),
                vue.createElementVNode("text", { class: "menu-text" }, "模板")
              ])
            ])
          ],
          2
          /* CLASS */
        )
      ])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" AI机器人菜单弹窗 "),
      $setup.showAIMenu ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 5,
        class: "modal-overlay",
        onClick: $setup.closeAIMenu
      }, [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["modal-content more-menu", { "closing": $setup.aiMenuClosing }]),
            onClick: _cache[11] || (_cache[11] = vue.withModifiers(() => {
            }, ["stop"]))
          },
          [
            vue.createElementVNode("view", { class: "menu-header" }, [
              vue.createElementVNode("view", { class: "menu-handle" }),
              vue.createElementVNode("text", { class: "menu-title" }, "AI助手"),
              vue.createElementVNode("text", {
                class: "menu-done",
                onClick: $setup.closeAIMenu
              }, "完成")
            ]),
            vue.createElementVNode("view", { class: "menu-items" }, [
              vue.createElementVNode("view", {
                class: "menu-item",
                onClick: $setup.goToChat
              }, [
                vue.createVNode(_component_uni_icons, {
                  type: "chatbubble",
                  size: "20",
                  color: "#333"
                }),
                vue.createElementVNode("text", { class: "menu-text" }, "会话")
              ]),
              vue.createElementVNode("view", {
                class: "menu-item",
                onClick: $setup.goToPersona
              }, [
                vue.createVNode(_component_uni_icons, {
                  type: "person",
                  size: "20",
                  color: "#333"
                }),
                vue.createElementVNode("text", { class: "menu-text" }, "人设")
              ]),
              vue.createElementVNode("view", {
                class: "menu-item",
                onClick: $setup.goToAISettings
              }, [
                vue.createVNode(_component_uni_icons, {
                  type: "settings",
                  size: "20",
                  color: "#333"
                }),
                vue.createElementVNode("text", { class: "menu-text" }, "设置")
              ])
            ])
          ],
          2
          /* CLASS */
        )
      ])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 消费弹窗 "),
      $setup.showCostModal ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 6,
        class: "modal-overlay",
        onClick: $setup.closeCostModal
      }, [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["modal-content", { "closing": $setup.costModalClosing }]),
            onClick: _cache[14] || (_cache[14] = vue.withModifiers(() => {
            }, ["stop"]))
          },
          [
            vue.createElementVNode("view", { class: "popup-header" }, [
              vue.createElementVNode("text", { class: "popup-title" }, "消费"),
              vue.createElementVNode("view", {
                class: "popup-close",
                onClick: $setup.closeCostModal
              }, [
                vue.createVNode(_component_uni_icons, {
                  type: "close",
                  size: "20",
                  color: "#666"
                })
              ])
            ]),
            vue.createElementVNode("view", { class: "input-group" }, [
              vue.createElementVNode("view", { class: "input-label" }, "消费金额"),
              vue.withDirectives(vue.createElementVNode("input", {
                class: "task-input",
                "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => $setup.costAmount = $event),
                type: "number",
                placeholder: "请输入消费金额...",
                focus: $setup.focusCostAmount,
                onBlur: _cache[13] || (_cache[13] = ($event) => $setup.focusCostAmount = false),
                onInput: $setup.validateCostAmount
              }, null, 40, ["focus"]), [
                [vue.vModelText, $setup.costAmount]
              ])
            ]),
            vue.createElementVNode("view", { class: "popup-actions" }, [
              vue.createElementVNode("button", {
                class: "cancel-btn",
                onClick: $setup.closeCostModal
              }, "取消"),
              vue.createElementVNode("button", {
                class: "confirm-btn",
                onClick: $setup.executeCost,
                disabled: !$setup.costAmount || parseInt($setup.costAmount) < 1
              }, "消费", 8, ["disabled"])
            ])
          ],
          2
          /* CLASS */
        )
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const PagesHomeHome = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$f], ["__scopeId", "data-v-07e72d3c"], ["__file", "C:/Users/Administrator/Documents/HBuilderProjects/todoPlus/pages/home/home.vue"]]);
  const _sfc_main$f = {
    __name: "register",
    setup(__props, { expose: __expose }) {
      __expose();
      const mobile = vue.ref("");
      const password = vue.ref("");
      const nickname = vue.ref("");
      const confirmPassword = vue.ref("");
      const showPassword = vue.ref(false);
      const showConfirmPassword = vue.ref(false);
      const mobileError = vue.ref("");
      const passwordError = vue.ref("");
      const nicknameError = vue.ref("");
      const confirmPasswordError = vue.ref("");
      const togglePassword = () => {
        showPassword.value = !showPassword.value;
      };
      const toggleConfirmPassword = () => {
        showConfirmPassword.value = !showConfirmPassword.value;
      };
      const validateNickname = (e) => {
        nickname.value = e.detail.value;
        if (nicknameError.value) {
          nicknameError.value = "";
        }
      };
      const validateMobile = (e) => {
        let value = e.detail.value;
        value = value.replace(/\D/g, "");
        if (value.length > 11) {
          value = value.slice(0, 11);
        }
        mobile.value = value;
        if (mobileError.value) {
          mobileError.value = "";
        }
      };
      const validatePassword = (e) => {
        let value = e.detail.value;
        value = value.replace(/[^a-zA-Z0-9_]/g, "");
        password.value = value;
        if (passwordError.value) {
          passwordError.value = "";
        }
        if (confirmPassword.value && confirmPasswordError.value) {
          validateConfirmPasswordBlur();
        }
      };
      const validateConfirmPasswordInput = (e) => {
        let value = e.detail.value;
        value = value.replace(/[^a-zA-Z0-9_]/g, "");
        confirmPassword.value = value;
        if (confirmPasswordError.value) {
          confirmPasswordError.value = "";
        }
      };
      const validateNicknameBlur = () => {
        if (!nickname.value) {
          nicknameError.value = "";
          return;
        }
        if (nickname.value.trim().length < 2) {
          nicknameError.value = "昵称格式为至少2个字符";
        } else {
          nicknameError.value = "";
        }
      };
      const validateMobileBlur = () => {
        if (!mobile.value) {
          mobileError.value = "";
          return;
        }
        if (!/^1[3-9]\d{9}$/.test(mobile.value)) {
          mobileError.value = "手机号格式为1开头的11位数字";
        } else {
          mobileError.value = "";
        }
      };
      const validatePasswordBlur = () => {
        if (!password.value) {
          passwordError.value = "";
          return;
        }
        if (password.value.length < 8) {
          passwordError.value = "密码格式为至少8位字符";
        } else if (!/^[a-zA-Z0-9_]+$/.test(password.value)) {
          passwordError.value = "密码格式只能包含字母数字和下划线";
        } else {
          passwordError.value = "";
        }
      };
      const validateConfirmPasswordBlur = () => {
        if (!confirmPassword.value) {
          confirmPasswordError.value = "";
          return;
        }
        if (confirmPassword.value !== password.value) {
          confirmPasswordError.value = "确认密码格式需与密码一致";
        } else {
          confirmPasswordError.value = "";
        }
      };
      const canSubmit = vue.computed(() => {
        return /^1[3-9]\d{9}$/.test(mobile.value) && password.value.length >= 8 && /^[a-zA-Z0-9_]+$/.test(password.value) && nickname.value.trim().length >= 2 && confirmPassword.value === password.value;
      });
      const getPasswordStrength = () => {
        const pwd = password.value;
        if (!/^[a-zA-Z0-9_]*$/.test(pwd))
          return 0;
        if (pwd.length < 8)
          return 0;
        if (pwd.length <= 10 && (/^[a-zA-Z]+$/.test(pwd) || /^\d+$/.test(pwd)))
          return 1;
        if (/[a-zA-Z]/.test(pwd) && /\d/.test(pwd) && /_/.test(pwd))
          return 3;
        if (/[a-zA-Z]/.test(pwd) && /\d/.test(pwd))
          return 2;
        return 1;
      };
      const getPasswordStrengthText = () => {
        const strength = getPasswordStrength();
        const pwd = password.value;
        if (!/^[a-zA-Z0-9_]*$/.test(pwd)) {
          return "密码只能包含字母数字和下划线";
        }
        if (pwd.length < 8) {
          return "密码至少8位";
        }
        const texts = ["密码格式错误", "密码强度：弱", "密码强度：中", "密码强度：强"];
        return texts[strength];
      };
      const getPasswordStrengthClass = () => {
        const strength = getPasswordStrength();
        const classes = ["strength-weak", "strength-weak", "strength-medium", "strength-strong"];
        return classes[strength];
      };
      const handleRegister = async () => {
        if (!canSubmit.value)
          return;
        if (nickname.value.trim().length < 2) {
          uni.showToast({
            title: "昵称至少需要2个字符",
            icon: "none"
          });
          return;
        }
        if (!/^1[3-9]\d{9}$/.test(mobile.value)) {
          uni.showToast({
            title: "请输入正确的手机号格式",
            icon: "none"
          });
          return;
        }
        if (password.value.length < 8) {
          uni.showToast({
            title: "密码至少需要8位",
            icon: "none"
          });
          return;
        }
        if (!/^[a-zA-Z0-9_]+$/.test(password.value)) {
          uni.showToast({
            title: "密码只能包含字母数字和下划线",
            icon: "none"
          });
          return;
        }
        if (password.value !== confirmPassword.value) {
          uni.showToast({
            title: "两次密码输入不一致",
            icon: "none"
          });
          return;
        }
        const res2 = await userApi.register({
          phone: mobile.value,
          password: password.value,
          nickname: nickname.value
        });
        formatAppLog("log", "at pages/register/register.vue:366", "注册结果:", res2);
        if (res2.code === 200 || res2.code === "200") {
          uni.showToast({
            title: "注册成功",
            icon: "success"
          });
          uni.navigateTo({
            url: "/pages/index/index"
          });
        } else {
          uni.showToast({
            title: res2.msg,
            icon: "none"
          });
        }
      };
      const goToLogin = () => {
        uni.navigateTo({
          url: "/pages/index/index"
        });
      };
      const __returned__ = { mobile, password, nickname, confirmPassword, showPassword, showConfirmPassword, mobileError, passwordError, nicknameError, confirmPasswordError, togglePassword, toggleConfirmPassword, validateNickname, validateMobile, validatePassword, validateConfirmPasswordInput, validateNicknameBlur, validateMobileBlur, validatePasswordBlur, validateConfirmPasswordBlur, canSubmit, getPasswordStrength, getPasswordStrengthText, getPasswordStrengthClass, handleRegister, goToLogin, ref: vue.ref, computed: vue.computed, get userApi() {
        return userApi;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock("view", { class: "register-container" }, [
      vue.createElementVNode("view", { class: "register-card" }, [
        vue.createCommentVNode(" 顶部Logo区域 "),
        vue.createElementVNode("view", { class: "header" }, [
          vue.createElementVNode("view", { class: "logo" }, [
            vue.createElementVNode("text", { class: "logo-text" }, "TODO+")
          ]),
          vue.createElementVNode("text", { class: "subtitle" }, "创建您的账户")
        ]),
        vue.createCommentVNode(" 表单区域 "),
        vue.createElementVNode("view", { class: "form-container" }, [
          vue.createCommentVNode(" 昵称输入 "),
          vue.createElementVNode("view", { class: "input-group" }, [
            vue.createElementVNode("view", { class: "input-label" }, [
              vue.createElementVNode("text", { class: "label-text" }, "昵称")
            ]),
            vue.createElementVNode("view", { class: "input-wrapper" }, [
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  class: "input-field",
                  type: "text",
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.nickname = $event),
                  placeholder: "请输入您的昵称",
                  "placeholder-class": "placeholder-style",
                  onInput: $setup.validateNickname,
                  onBlur: $setup.validateNicknameBlur
                },
                null,
                544
                /* NEED_HYDRATION, NEED_PATCH */
              ), [
                [vue.vModelText, $setup.nickname]
              ])
            ]),
            vue.createCommentVNode(" 昵称错误提示 "),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["error-tip", { "show": $setup.nicknameError }])
              },
              [
                vue.createElementVNode(
                  "text",
                  { class: "error-text" },
                  vue.toDisplayString($setup.nicknameError),
                  1
                  /* TEXT */
                )
              ],
              2
              /* CLASS */
            )
          ]),
          vue.createCommentVNode(" 手机号输入 "),
          vue.createElementVNode("view", { class: "input-group" }, [
            vue.createElementVNode("view", { class: "input-label" }, [
              vue.createElementVNode("text", { class: "label-text" }, "手机号")
            ]),
            vue.createElementVNode("view", { class: "input-wrapper" }, [
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  class: "input-field",
                  type: "number",
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.mobile = $event),
                  placeholder: "请输入手机号",
                  "placeholder-class": "placeholder-style",
                  maxlength: "11",
                  onInput: $setup.validateMobile,
                  onBlur: $setup.validateMobileBlur
                },
                null,
                544
                /* NEED_HYDRATION, NEED_PATCH */
              ), [
                [vue.vModelText, $setup.mobile]
              ])
            ]),
            vue.createCommentVNode(" 手机号错误提示 "),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["error-tip", { "show": $setup.mobileError }])
              },
              [
                vue.createElementVNode(
                  "text",
                  { class: "error-text" },
                  vue.toDisplayString($setup.mobileError),
                  1
                  /* TEXT */
                )
              ],
              2
              /* CLASS */
            )
          ]),
          vue.createCommentVNode(" 密码输入 "),
          vue.createElementVNode("view", { class: "input-group" }, [
            vue.createElementVNode("view", { class: "input-label" }, [
              vue.createElementVNode("text", { class: "label-text" }, "密码")
            ]),
            vue.createElementVNode("view", { class: "input-wrapper" }, [
              vue.withDirectives(vue.createElementVNode("input", {
                class: "input-field",
                type: $setup.showPassword ? "text" : "password",
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.password = $event),
                placeholder: "请输入密码",
                "placeholder-class": "placeholder-style",
                onInput: $setup.validatePassword,
                onBlur: $setup.validatePasswordBlur
              }, null, 40, ["type"]), [
                [vue.vModelDynamic, $setup.password]
              ]),
              vue.createElementVNode("view", {
                class: "eye-icon",
                onClick: $setup.togglePassword
              }, [
                vue.createVNode(_component_uni_icons, {
                  type: $setup.showPassword ? "eye" : "eye-slash",
                  size: "20",
                  color: "#999"
                }, null, 8, ["type"])
              ])
            ]),
            vue.createCommentVNode(" 密码错误提示 "),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["error-tip", { "show": $setup.passwordError }])
              },
              [
                vue.createElementVNode(
                  "text",
                  { class: "error-text" },
                  vue.toDisplayString($setup.passwordError),
                  1
                  /* TEXT */
                )
              ],
              2
              /* CLASS */
            ),
            vue.createCommentVNode(" 密码强度提示 "),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["password-strength", { "show": $setup.password }])
              },
              [
                vue.createElementVNode(
                  "text",
                  {
                    class: vue.normalizeClass(["strength-text", $setup.getPasswordStrengthClass()])
                  },
                  vue.toDisplayString($setup.getPasswordStrengthText()),
                  3
                  /* TEXT, CLASS */
                )
              ],
              2
              /* CLASS */
            )
          ]),
          vue.createCommentVNode(" 确认密码输入 "),
          vue.createElementVNode("view", { class: "input-group" }, [
            vue.createElementVNode("view", { class: "input-label" }, [
              vue.createElementVNode("text", { class: "label-text" }, "确认密码")
            ]),
            vue.createElementVNode("view", { class: "input-wrapper" }, [
              vue.withDirectives(vue.createElementVNode("input", {
                class: "input-field",
                type: $setup.showConfirmPassword ? "text" : "password",
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.confirmPassword = $event),
                placeholder: "请再次输入密码",
                "placeholder-class": "placeholder-style",
                onInput: $setup.validateConfirmPasswordInput,
                onBlur: $setup.validateConfirmPasswordBlur
              }, null, 40, ["type"]), [
                [vue.vModelDynamic, $setup.confirmPassword]
              ]),
              vue.createElementVNode("view", {
                class: "eye-icon",
                onClick: $setup.toggleConfirmPassword
              }, [
                vue.createVNode(_component_uni_icons, {
                  type: $setup.showConfirmPassword ? "eye" : "eye-slash",
                  size: "20",
                  color: "#999"
                }, null, 8, ["type"])
              ])
            ]),
            vue.createCommentVNode(" 确认密码错误提示 "),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["error-tip", { "show": $setup.confirmPasswordError }])
              },
              [
                vue.createElementVNode(
                  "text",
                  { class: "error-text" },
                  vue.toDisplayString($setup.confirmPasswordError),
                  1
                  /* TEXT */
                )
              ],
              2
              /* CLASS */
            )
          ]),
          vue.createCommentVNode(" 注册按钮 "),
          vue.createElementVNode("view", { class: "button-group" }, [
            vue.createElementVNode("button", {
              class: vue.normalizeClass(["register-btn", { "btn-disabled": !$setup.canSubmit }]),
              disabled: !$setup.canSubmit,
              onClick: $setup.handleRegister
            }, " 注册 ", 10, ["disabled"])
          ]),
          vue.createCommentVNode(" 底部链接 "),
          vue.createElementVNode("view", { class: "footer-links" }, [
            vue.createElementVNode("text", { class: "link-text" }, "已有账户？"),
            vue.createElementVNode("text", {
              class: "link-btn",
              onClick: $setup.goToLogin
            }, "立即登录")
          ])
        ])
      ])
    ]);
  }
  const PagesRegisterRegister = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$e], ["__scopeId", "data-v-bac4a35d"], ["__file", "C:/Users/Administrator/Documents/HBuilderProjects/todoPlus/pages/register/register.vue"]]);
  const _sfc_main$e = {
    __name: "changePassword",
    setup(__props, { expose: __expose }) {
      __expose();
      const mobile = vue.ref("");
      const verificationCode = vue.ref("");
      const newPassword = vue.ref("");
      const confirmPassword = vue.ref("");
      const showNewPassword = vue.ref(false);
      const showConfirmPassword = vue.ref(false);
      const countdown = vue.ref(0);
      const timer = vue.ref(null);
      const mobileError = vue.ref("");
      const verificationCodeError = vue.ref("");
      const newPasswordError = vue.ref("");
      const confirmPasswordError = vue.ref("");
      const toggleNewPassword = () => {
        showNewPassword.value = !showNewPassword.value;
      };
      const toggleConfirmPassword = () => {
        showConfirmPassword.value = !showConfirmPassword.value;
      };
      const validateMobile = (e) => {
        let value = e.detail.value;
        value = value.replace(/\D/g, "");
        if (value.length > 11) {
          value = value.slice(0, 11);
        }
        mobile.value = value;
        if (mobileError.value) {
          mobileError.value = "";
        }
      };
      const validateVerificationCode = (e) => {
        let value = e.detail.value;
        value = value.replace(/\D/g, "");
        if (value.length > 6) {
          value = value.slice(0, 6);
        }
        verificationCode.value = value;
        if (verificationCodeError.value) {
          verificationCodeError.value = "";
        }
      };
      const validateNewPassword = (e) => {
        let value = e.detail.value;
        value = value.replace(/[^a-zA-Z0-9_]/g, "");
        newPassword.value = value;
        if (newPasswordError.value) {
          newPasswordError.value = "";
        }
        if (confirmPassword.value && confirmPasswordError.value) {
          validateConfirmPasswordBlur();
        }
      };
      const validateConfirmPasswordInput = (e) => {
        let value = e.detail.value;
        value = value.replace(/[^a-zA-Z0-9_]/g, "");
        confirmPassword.value = value;
        if (confirmPasswordError.value) {
          confirmPasswordError.value = "";
        }
      };
      const validateMobileBlur = () => {
        if (!mobile.value) {
          mobileError.value = "";
          return;
        }
        if (!/^1[3-9]\d{9}$/.test(mobile.value)) {
          mobileError.value = "手机号格式为1开头的11位数字";
        } else {
          mobileError.value = "";
        }
      };
      const validateVerificationCodeBlur = () => {
        if (!verificationCode.value) {
          verificationCodeError.value = "";
          return;
        }
        if (!/^\d{6}$/.test(verificationCode.value)) {
          verificationCodeError.value = "验证码格式为6位数字";
        } else {
          verificationCodeError.value = "";
        }
      };
      const validateNewPasswordBlur = () => {
        if (!newPassword.value) {
          newPasswordError.value = "";
          return;
        }
        if (newPassword.value.length < 8) {
          newPasswordError.value = "密码格式为至少8位字符";
        } else if (!/^[a-zA-Z0-9_]+$/.test(newPassword.value)) {
          newPasswordError.value = "密码格式只能包含字母数字和下划线";
        } else {
          newPasswordError.value = "";
        }
      };
      const validateConfirmPasswordBlur = () => {
        if (!confirmPassword.value) {
          confirmPasswordError.value = "";
          return;
        }
        if (confirmPassword.value !== newPassword.value) {
          confirmPasswordError.value = "确认密码格式需与新密码一致";
        } else {
          confirmPasswordError.value = "";
        }
      };
      const canSendCode = vue.computed(() => {
        return /^1[3-9]\d{9}$/.test(mobile.value) && countdown.value === 0;
      });
      const sendCodeText = vue.computed(() => {
        return countdown.value > 0 ? `${countdown.value}秒` : "发送验证码";
      });
      const canSubmit = vue.computed(() => {
        return /^1[3-9]\d{9}$/.test(mobile.value) && /^\d{6}$/.test(verificationCode.value) && newPassword.value.length >= 8 && /^[a-zA-Z0-9_]+$/.test(newPassword.value) && confirmPassword.value === newPassword.value;
      });
      const getPasswordStrength = () => {
        const pwd = newPassword.value;
        if (!/^[a-zA-Z0-9_]*$/.test(pwd))
          return 0;
        if (pwd.length < 8)
          return 0;
        if (pwd.length <= 10 && (/^[a-zA-Z]+$/.test(pwd) || /^\d+$/.test(pwd)))
          return 1;
        if (/[a-zA-Z]/.test(pwd) && /\d/.test(pwd) && /_/.test(pwd))
          return 3;
        if (/[a-zA-Z]/.test(pwd) && /\d/.test(pwd))
          return 2;
        return 1;
      };
      const getPasswordStrengthText = () => {
        const strength = getPasswordStrength();
        const pwd = newPassword.value;
        if (!/^[a-zA-Z0-9_]*$/.test(pwd)) {
          return "密码只能包含字母数字和下划线";
        }
        if (pwd.length < 8) {
          return "密码至少8位";
        }
        const texts = ["密码格式错误", "密码强度：弱", "密码强度：中", "密码强度：强"];
        return texts[strength];
      };
      const getPasswordStrengthClass = () => {
        const strength = getPasswordStrength();
        const classes = ["strength-weak", "strength-weak", "strength-medium", "strength-strong"];
        return classes[strength];
      };
      const sendVerificationCode = async () => {
        if (!canSendCode.value)
          return;
        if (!/^1[3-9]\d{9}$/.test(mobile.value)) {
          uni.showToast({
            title: "请输入正确的手机号格式",
            icon: "none"
          });
          return;
        }
        formatAppLog("log", "at pages/changePassword/changePassword.vue:353", "发送验证码到：", mobile.value);
        await userApi.updPasswordCode(mobile.value);
        uni.showToast({
          title: "验证码已发送",
          icon: "success"
        });
        countdown.value = 60;
        timer.value = setInterval(() => {
          countdown.value--;
          if (countdown.value <= 0) {
            clearInterval(timer.value);
            timer.value = null;
          }
        }, 1e3);
      };
      const handleChangePassword = async () => {
        if (!canSubmit.value)
          return;
        if (!/^1[3-9]\d{9}$/.test(mobile.value)) {
          uni.showToast({
            title: "请输入正确的手机号格式",
            icon: "none"
          });
          return;
        }
        if (!/^\d{6}$/.test(verificationCode.value)) {
          uni.showToast({
            title: "验证码必须是6位数字",
            icon: "none"
          });
          return;
        }
        if (newPassword.value.length < 8) {
          uni.showToast({
            title: "密码至少需要8位",
            icon: "none"
          });
          return;
        }
        if (!/^[a-zA-Z0-9_]+$/.test(newPassword.value)) {
          uni.showToast({
            title: "密码只能包含字母数字和下划线",
            icon: "none"
          });
          return;
        }
        if (newPassword.value !== confirmPassword.value) {
          uni.showToast({
            title: "两次密码输入不一致",
            icon: "none"
          });
          return;
        }
        const res2 = await userApi.updatePassword({
          phone: mobile.value,
          password: newPassword.value,
          code: verificationCode.value
        });
        formatAppLog("log", "at pages/changePassword/changePassword.vue:426", "修改密码结果:", res2);
        if (res2.code === 200 || res2.code === "200") {
          uni.showToast({
            title: "密码修改成功",
            icon: "success"
          });
          uni.navigateTo({
            url: "/pages/index/index"
          });
        } else {
          uni.showToast({
            title: res2.msg,
            icon: "none"
          });
        }
        setTimeout(() => {
          goToLogin();
        }, 1500);
      };
      const goToLogin = () => {
        uni.navigateTo({
          url: "/pages/index/index"
        });
      };
      vue.onUnmounted(() => {
        if (timer.value) {
          clearInterval(timer.value);
        }
      });
      const __returned__ = { mobile, verificationCode, newPassword, confirmPassword, showNewPassword, showConfirmPassword, countdown, timer, mobileError, verificationCodeError, newPasswordError, confirmPasswordError, toggleNewPassword, toggleConfirmPassword, validateMobile, validateVerificationCode, validateNewPassword, validateConfirmPasswordInput, validateMobileBlur, validateVerificationCodeBlur, validateNewPasswordBlur, validateConfirmPasswordBlur, canSendCode, sendCodeText, canSubmit, getPasswordStrength, getPasswordStrengthText, getPasswordStrengthClass, sendVerificationCode, handleChangePassword, goToLogin, ref: vue.ref, computed: vue.computed, onUnmounted: vue.onUnmounted, get userApi() {
        return userApi;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock("view", { class: "change-password-container" }, [
      vue.createElementVNode("view", { class: "change-password-card" }, [
        vue.createCommentVNode(" 顶部Logo区域 "),
        vue.createElementVNode("view", { class: "header" }, [
          vue.createElementVNode("view", { class: "logo" }, [
            vue.createElementVNode("text", { class: "logo-text" }, "TODO+")
          ]),
          vue.createElementVNode("text", { class: "subtitle" }, "重置您的密码")
        ]),
        vue.createCommentVNode(" 表单区域 "),
        vue.createElementVNode("view", { class: "form-container" }, [
          vue.createCommentVNode(" 手机号输入 "),
          vue.createElementVNode("view", { class: "input-group" }, [
            vue.createElementVNode("view", { class: "input-label" }, [
              vue.createElementVNode("text", { class: "label-text" }, "手机号")
            ]),
            vue.createElementVNode("view", { class: "input-wrapper" }, [
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  class: "input-field",
                  type: "number",
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.mobile = $event),
                  placeholder: "请输入手机号",
                  "placeholder-class": "placeholder-style",
                  maxlength: "11",
                  onInput: $setup.validateMobile,
                  onBlur: $setup.validateMobileBlur
                },
                null,
                544
                /* NEED_HYDRATION, NEED_PATCH */
              ), [
                [vue.vModelText, $setup.mobile]
              ])
            ]),
            vue.createCommentVNode(" 手机号错误提示 "),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["error-tip", { "show": $setup.mobileError }])
              },
              [
                vue.createElementVNode(
                  "text",
                  { class: "error-text" },
                  vue.toDisplayString($setup.mobileError),
                  1
                  /* TEXT */
                )
              ],
              2
              /* CLASS */
            )
          ]),
          vue.createCommentVNode(" 验证码输入 "),
          vue.createElementVNode("view", { class: "input-group" }, [
            vue.createElementVNode("view", { class: "input-label" }, [
              vue.createElementVNode("text", { class: "label-text" }, "验证码")
            ]),
            vue.createElementVNode("view", { class: "input-wrapper verification-wrapper" }, [
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  class: "input-field verification-input",
                  type: "number",
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.verificationCode = $event),
                  placeholder: "请输入验证码",
                  "placeholder-class": "placeholder-style",
                  maxlength: "6",
                  onInput: $setup.validateVerificationCode,
                  onBlur: $setup.validateVerificationCodeBlur
                },
                null,
                544
                /* NEED_HYDRATION, NEED_PATCH */
              ), [
                [vue.vModelText, $setup.verificationCode]
              ]),
              vue.createElementVNode("button", {
                class: vue.normalizeClass(["send-code-btn", { "btn-disabled": !$setup.canSendCode }]),
                disabled: !$setup.canSendCode,
                onClick: $setup.sendVerificationCode
              }, vue.toDisplayString($setup.sendCodeText), 11, ["disabled"])
            ]),
            vue.createCommentVNode(" 验证码错误提示 "),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["error-tip", { "show": $setup.verificationCodeError }])
              },
              [
                vue.createElementVNode(
                  "text",
                  { class: "error-text" },
                  vue.toDisplayString($setup.verificationCodeError),
                  1
                  /* TEXT */
                )
              ],
              2
              /* CLASS */
            )
          ]),
          vue.createCommentVNode(" 新密码输入 "),
          vue.createElementVNode("view", { class: "input-group" }, [
            vue.createElementVNode("view", { class: "input-label" }, [
              vue.createElementVNode("text", { class: "label-text" }, "新密码")
            ]),
            vue.createElementVNode("view", { class: "input-wrapper" }, [
              vue.withDirectives(vue.createElementVNode("input", {
                class: "input-field",
                type: $setup.showNewPassword ? "text" : "password",
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.newPassword = $event),
                placeholder: "请输入新密码",
                "placeholder-class": "placeholder-style",
                onInput: $setup.validateNewPassword,
                onBlur: $setup.validateNewPasswordBlur
              }, null, 40, ["type"]), [
                [vue.vModelDynamic, $setup.newPassword]
              ]),
              vue.createElementVNode("view", {
                class: "eye-icon",
                onClick: $setup.toggleNewPassword
              }, [
                vue.createVNode(_component_uni_icons, {
                  type: $setup.showNewPassword ? "eye" : "eye-slash",
                  size: "20",
                  color: "#999"
                }, null, 8, ["type"])
              ])
            ]),
            vue.createCommentVNode(" 新密码错误提示 "),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["error-tip", { "show": $setup.newPasswordError }])
              },
              [
                vue.createElementVNode(
                  "text",
                  { class: "error-text" },
                  vue.toDisplayString($setup.newPasswordError),
                  1
                  /* TEXT */
                )
              ],
              2
              /* CLASS */
            ),
            vue.createCommentVNode(" 密码强度提示 "),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["password-strength", { "show": $setup.newPassword }])
              },
              [
                vue.createElementVNode(
                  "text",
                  {
                    class: vue.normalizeClass(["strength-text", $setup.getPasswordStrengthClass()])
                  },
                  vue.toDisplayString($setup.getPasswordStrengthText()),
                  3
                  /* TEXT, CLASS */
                )
              ],
              2
              /* CLASS */
            )
          ]),
          vue.createCommentVNode(" 确认新密码输入 "),
          vue.createElementVNode("view", { class: "input-group" }, [
            vue.createElementVNode("view", { class: "input-label" }, [
              vue.createElementVNode("text", { class: "label-text" }, "确认新密码")
            ]),
            vue.createElementVNode("view", { class: "input-wrapper" }, [
              vue.withDirectives(vue.createElementVNode("input", {
                class: "input-field",
                type: $setup.showConfirmPassword ? "text" : "password",
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.confirmPassword = $event),
                placeholder: "请再次输入新密码",
                "placeholder-class": "placeholder-style",
                onInput: $setup.validateConfirmPasswordInput,
                onBlur: $setup.validateConfirmPasswordBlur
              }, null, 40, ["type"]), [
                [vue.vModelDynamic, $setup.confirmPassword]
              ]),
              vue.createElementVNode("view", {
                class: "eye-icon",
                onClick: $setup.toggleConfirmPassword
              }, [
                vue.createVNode(_component_uni_icons, {
                  type: $setup.showConfirmPassword ? "eye" : "eye-slash",
                  size: "20",
                  color: "#999"
                }, null, 8, ["type"])
              ])
            ]),
            vue.createCommentVNode(" 确认密码错误提示 "),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["error-tip", { "show": $setup.confirmPasswordError }])
              },
              [
                vue.createElementVNode(
                  "text",
                  { class: "error-text" },
                  vue.toDisplayString($setup.confirmPasswordError),
                  1
                  /* TEXT */
                )
              ],
              2
              /* CLASS */
            )
          ]),
          vue.createCommentVNode(" 确认修改按钮 "),
          vue.createElementVNode("view", { class: "button-group" }, [
            vue.createElementVNode("button", {
              class: vue.normalizeClass(["change-password-btn", { "btn-disabled": !$setup.canSubmit }]),
              disabled: !$setup.canSubmit,
              onClick: $setup.handleChangePassword
            }, " 确认修改 ", 10, ["disabled"])
          ]),
          vue.createCommentVNode(" 底部链接 "),
          vue.createElementVNode("view", { class: "footer-links" }, [
            vue.createElementVNode("text", { class: "link-text" }, "记起密码了？"),
            vue.createElementVNode("text", {
              class: "link-btn",
              onClick: $setup.goToLogin
            }, "立即登录")
          ])
        ])
      ])
    ]);
  }
  const PagesChangePasswordChangePassword = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$d], ["__scopeId", "data-v-5b3c36e6"], ["__file", "C:/Users/Administrator/Documents/HBuilderProjects/todoPlus/pages/changePassword/changePassword.vue"]]);
  const _sfc_main$d = {
    __name: "statistics",
    setup(__props, { expose: __expose }) {
      __expose();
      const userStore = useUserStore();
      const statisticsList = vue.ref([]);
      const isLoading = vue.ref(false);
      const imageLoadError = vue.ref(false);
      const currentDate = /* @__PURE__ */ new Date();
      const selectedYear = vue.ref(currentDate.getFullYear());
      const selectedMonth = vue.ref(currentDate.getMonth() + 1);
      const yearOptions = vue.ref([]);
      const yearIndex = vue.ref(0);
      const monthOptions = vue.ref(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]);
      const monthIndex = vue.ref(currentDate.getMonth());
      const expandedItems = vue.ref({});
      const completedSections = vue.ref({});
      const isDescending = vue.ref(false);
      const refresherTriggered = vue.ref(false);
      const currentBackgroundImage = vue.computed(() => {
        return userStore.userInfo.backgroudImg || "";
      });
      const goBack = () => {
        uni.navigateBack({
          delta: 1
        });
      };
      const initYearOptions = () => {
        const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
        const years = [];
        for (let i = currentYear - 2; i <= currentYear + 1; i++) {
          years.push(i.toString());
        }
        yearOptions.value = years;
        const currentYearIndex = years.findIndex((year) => parseInt(year) === selectedYear.value);
        yearIndex.value = currentYearIndex >= 0 ? currentYearIndex : years.length - 2;
      };
      const getWeekday = (year, month, day) => {
        const date = new Date(year, month - 1, day);
        const weekdays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
        return weekdays[date.getDay()];
      };
      const getItemKey = (item) => {
        return `${item.year}-${item.month}-${item.day}`;
      };
      const onYearChange = async (e) => {
        const newIndex = e.detail.value;
        yearIndex.value = newIndex;
        selectedYear.value = parseInt(yearOptions.value[newIndex]);
        await fetchStatistics();
      };
      const onMonthChange = async (e) => {
        const newIndex = e.detail.value;
        monthIndex.value = newIndex;
        selectedMonth.value = parseInt(monthOptions.value[newIndex]);
        await fetchStatistics();
      };
      const toggleExpand = (item) => {
        if (!item.isPast)
          return;
        const key = getItemKey(item);
        expandedItems.value[key] = !expandedItems.value[key];
        if (expandedItems.value[key]) {
          completedSections.value[key] = true;
        }
      };
      const toggleCompletedSection = (item) => {
        const key = getItemKey(item);
        completedSections.value[key] = !completedSections.value[key];
      };
      const getUncompletedTasks = (tasks) => {
        return tasks ? tasks.filter((task) => !task.isCompleted) : [];
      };
      const getCompletedTasks = (tasks) => {
        return tasks ? tasks.filter((task) => task.isCompleted) : [];
      };
      const toggleSort = () => {
        isDescending.value = !isDescending.value;
        statisticsList.value = sortStatisticsList(statisticsList.value);
      };
      const sortStatisticsList = (list2) => {
        return list2.sort((a, b) => {
          return isDescending.value ? b.day - a.day : a.day - b.day;
        });
      };
      const fetchStatistics = async () => {
        isLoading.value = true;
        try {
          const res2 = await taskApi.statistic({
            year: selectedYear.value,
            month: selectedMonth.value
          });
          if (res2 && res2.code === "200" && res2.data) {
            statisticsList.value = sortStatisticsList(res2.data);
          }
        } catch (error) {
          formatAppLog("error", "at pages/statistics/statistics.vue:321", "获取统计数据失败:", error);
          uni.showToast({
            title: "获取统计数据失败",
            icon: "none"
          });
        } finally {
          isLoading.value = false;
        }
      };
      const handleImageError = () => {
        imageLoadError.value = true;
      };
      const handleImageLoad = () => {
        imageLoadError.value = false;
      };
      const handleRefresherPulling = (e) => {
      };
      const handleRefresherRefresh = async () => {
        refresherTriggered.value = true;
        try {
          await fetchStatistics();
          uni.showToast({
            title: "刷新成功",
            icon: "success",
            duration: 1500
          });
        } catch (error) {
          formatAppLog("error", "at pages/statistics/statistics.vue:356", "刷新失败:", error);
          uni.showToast({
            title: "刷新失败，请重试",
            icon: "none",
            duration: 2e3
          });
        } finally {
          setTimeout(() => {
            refresherTriggered.value = false;
          }, 800);
        }
      };
      const handleRefresherRestore = () => {
        refresherTriggered.value = false;
      };
      vue.onMounted(() => {
        userStore.initUserInfo();
        initYearOptions();
        fetchStatistics();
      });
      const __returned__ = { userStore, statisticsList, isLoading, imageLoadError, currentDate, selectedYear, selectedMonth, yearOptions, yearIndex, monthOptions, monthIndex, expandedItems, completedSections, isDescending, refresherTriggered, currentBackgroundImage, goBack, initYearOptions, getWeekday, getItemKey, onYearChange, onMonthChange, toggleExpand, toggleCompletedSection, getUncompletedTasks, getCompletedTasks, toggleSort, sortStatisticsList, fetchStatistics, handleImageError, handleImageLoad, handleRefresherPulling, handleRefresherRefresh, handleRefresherRestore, ref: vue.ref, computed: vue.computed, onMounted: vue.onMounted, get taskApi() {
        return taskApi;
      }, get useUserStore() {
        return useUserStore;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0);
    const _component_uni_card = resolveEasycom(vue.resolveDynamicComponent("uni-card"), __easycom_1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "statistics-container" }, [
      vue.createCommentVNode(" 背景图片 "),
      $setup.currentBackgroundImage ? (vue.openBlock(), vue.createElementBlock("image", {
        key: 0,
        src: $setup.currentBackgroundImage,
        class: "background-image",
        mode: "aspectFill",
        onError: $setup.handleImageError,
        onLoad: $setup.handleImageLoad
      }, null, 40, ["src"])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 顶部导航 "),
      vue.createElementVNode("view", { class: "nav-header" }, [
        vue.createElementVNode("view", { class: "nav-left" }, [
          vue.createVNode(_component_uni_icons, {
            type: "back",
            size: "24",
            color: "#fff",
            onClick: $setup.goBack
          })
        ]),
        vue.createElementVNode("view", { class: "nav-center" }, [
          vue.createElementVNode("text", { class: "nav-title" }, "统计")
        ]),
        vue.createElementVNode("view", { class: "nav-right" })
      ]),
      vue.createCommentVNode(" 年份月份选择器 "),
      vue.createElementVNode("view", { class: "date-selector" }, [
        vue.createElementVNode("view", { class: "selector-left" }, [
          vue.createElementVNode("view", { class: "selector-item" }, [
            vue.createElementVNode("text", { class: "selector-label" }, "年份"),
            vue.createElementVNode("picker", {
              mode: "selector",
              value: $setup.yearIndex,
              range: $setup.yearOptions,
              onChange: $setup.onYearChange
            }, [
              vue.createElementVNode(
                "view",
                { class: "picker-value" },
                vue.toDisplayString($setup.selectedYear) + "年",
                1
                /* TEXT */
              )
            ], 40, ["value", "range"])
          ]),
          vue.createElementVNode("view", { class: "selector-item" }, [
            vue.createElementVNode("text", { class: "selector-label" }, "月份"),
            vue.createElementVNode("picker", {
              mode: "selector",
              value: $setup.monthIndex,
              range: $setup.monthOptions,
              onChange: $setup.onMonthChange
            }, [
              vue.createElementVNode(
                "view",
                { class: "picker-value" },
                vue.toDisplayString($setup.selectedMonth) + "月",
                1
                /* TEXT */
              )
            ], 40, ["value", "range"])
          ])
        ]),
        vue.createElementVNode("view", { class: "selector-right" }, [
          vue.createElementVNode("view", {
            class: "sort-btn",
            onClick: $setup.toggleSort
          }, [
            vue.createVNode(_component_uni_icons, {
              type: $setup.isDescending ? "up" : "down",
              size: "20",
              color: "#fff"
            }, null, 8, ["type"]),
            vue.createElementVNode(
              "text",
              { class: "sort-text" },
              vue.toDisplayString($setup.isDescending ? "倒序" : "正序"),
              1
              /* TEXT */
            )
          ])
        ])
      ]),
      vue.createCommentVNode(" 统计列表 "),
      vue.createElementVNode("scroll-view", {
        class: "statistics-list",
        "scroll-y": "true",
        "refresher-enabled": "true",
        "refresher-background": "transparent",
        "refresher-triggered": $setup.refresherTriggered,
        onRefresherpulling: $setup.handleRefresherPulling,
        onRefresherrefresh: $setup.handleRefresherRefresh,
        onRefresherrestore: $setup.handleRefresherRestore
      }, [
        vue.createCommentVNode(" 空状态 "),
        $setup.statisticsList.length === 0 && !$setup.isLoading ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "empty-state"
        }, [
          vue.createVNode(_component_uni_icons, {
            type: "bars",
            size: "80",
            color: "rgba(255, 255, 255, 0.3)"
          }),
          vue.createElementVNode("text", { class: "empty-text" }, "暂无统计数据")
        ])) : vue.createCommentVNode("v-if", true),
        vue.createCommentVNode(" 统计项列表 "),
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.statisticsList, (item, index) => {
            return vue.openBlock(), vue.createBlock(_component_uni_card, {
              key: `${item.year}-${item.month}-${item.day}`,
              "is-shadow": false,
              border: false,
              margin: "8rpx 20rpx",
              class: vue.normalizeClass(["statistic-card", { "disabled": !item.isPast }])
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", {
                  class: vue.normalizeClass(["statistic-item", { "disabled": !item.isPast }]),
                  onClick: ($event) => $setup.toggleExpand(item)
                }, [
                  vue.createCommentVNode(" 统计头部 "),
                  vue.createElementVNode("view", { class: "statistic-header" }, [
                    vue.createElementVNode("view", { class: "date-info" }, [
                      vue.createElementVNode(
                        "text",
                        { class: "date-text" },
                        vue.toDisplayString(item.month) + "/" + vue.toDisplayString(item.day),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode(
                        "text",
                        { class: "weekday-text" },
                        vue.toDisplayString($setup.getWeekday(item.year, item.month, item.day)),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "stats-info" }, [
                      vue.createElementVNode("view", { class: "stat-item" }, [
                        vue.createElementVNode("text", { class: "stat-label" }, "完成"),
                        vue.createElementVNode(
                          "text",
                          { class: "stat-value finish" },
                          vue.toDisplayString(item.finishCount || 0),
                          1
                          /* TEXT */
                        )
                      ]),
                      vue.createElementVNode("view", { class: "stat-item" }, [
                        vue.createElementVNode("text", { class: "stat-label" }, "未完成"),
                        vue.createElementVNode(
                          "text",
                          { class: "stat-value left" },
                          vue.toDisplayString(item.leftCount || 0),
                          1
                          /* TEXT */
                        )
                      ]),
                      vue.createElementVNode("view", { class: "stat-item" }, [
                        vue.createElementVNode("text", { class: "stat-label" }, "收入"),
                        vue.createElementVNode(
                          "text",
                          { class: "stat-value income" },
                          "+" + vue.toDisplayString(item.addMoney || 0),
                          1
                          /* TEXT */
                        )
                      ]),
                      item.difMoney && item.difMoney > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 0,
                        class: "stat-item"
                      }, [
                        vue.createElementVNode("text", { class: "stat-label" }, "惩罚"),
                        vue.createElementVNode(
                          "text",
                          { class: "stat-value expense" },
                          "-" + vue.toDisplayString(item.difMoney),
                          1
                          /* TEXT */
                        )
                      ])) : vue.createCommentVNode("v-if", true)
                    ]),
                    item.isPast ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 0,
                      class: "expand-icon"
                    }, [
                      vue.createVNode(_component_uni_icons, {
                        type: $setup.expandedItems[$setup.getItemKey(item)] ? "down" : "right",
                        size: "16",
                        color: "rgba(255, 255, 255, 0.7)"
                      }, null, 8, ["type"])
                    ])) : vue.createCommentVNode("v-if", true)
                  ]),
                  vue.createCommentVNode(" 任务详情 "),
                  $setup.expandedItems[$setup.getItemKey(item)] && item.tasks && item.tasks.length > 0 ? (vue.openBlock(), vue.createElementBlock(
                    "view",
                    {
                      key: 0,
                      class: vue.normalizeClass(["tasks-container", { "expanded": $setup.expandedItems[$setup.getItemKey(item)] }])
                    },
                    [
                      vue.createElementVNode("view", { class: "tasks-divider" }),
                      vue.createCommentVNode(" 未完成的任务 "),
                      vue.createElementVNode("view", { class: "task-section" }, [
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList($setup.getUncompletedTasks(item.tasks), (task, taskIndex) => {
                            return vue.openBlock(), vue.createElementBlock("view", {
                              key: task.id,
                              class: "task-item"
                            }, [
                              vue.createElementVNode("view", { class: "task-checkbox" }, [
                                vue.createVNode(_component_uni_icons, {
                                  type: "checkbox",
                                  size: 20,
                                  color: "#C7C7CC"
                                })
                              ]),
                              vue.createElementVNode("view", { class: "task-content" }, [
                                vue.createElementVNode(
                                  "text",
                                  { class: "task-description" },
                                  vue.toDisplayString(task.taskDescription),
                                  1
                                  /* TEXT */
                                ),
                                task.value && task.value >= 1 ? (vue.openBlock(), vue.createElementBlock("view", {
                                  key: 0,
                                  class: "task-value"
                                }, [
                                  vue.createVNode(_component_uni_icons, {
                                    type: "wallet",
                                    size: "12",
                                    color: "#666"
                                  }),
                                  vue.createElementVNode(
                                    "text",
                                    { class: "value-text" },
                                    vue.toDisplayString(task.value),
                                    1
                                    /* TEXT */
                                  )
                                ])) : vue.createCommentVNode("v-if", true)
                              ]),
                              vue.createElementVNode("view", { class: "task-actions" }, [
                                vue.createVNode(_component_uni_icons, {
                                  type: task.like ? "star-filled" : "star",
                                  size: 20,
                                  color: task.like ? "#FFD700" : "#C7C7CC"
                                }, null, 8, ["type", "color"])
                              ])
                            ]);
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ]),
                      vue.createCommentVNode(" 已完成分组标题 "),
                      $setup.getCompletedTasks(item.tasks).length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 0,
                        class: "section-title",
                        onClick: ($event) => $setup.toggleCompletedSection(item)
                      }, [
                        vue.createVNode(_component_uni_icons, {
                          type: $setup.completedSections[$setup.getItemKey(item)] ? "down" : "right",
                          size: "16",
                          color: "rgba(51, 51, 51, 0.7)"
                        }, null, 8, ["type"]),
                        vue.createElementVNode("text", { class: "section-text" }, "已完成")
                      ], 8, ["onClick"])) : vue.createCommentVNode("v-if", true),
                      vue.createCommentVNode(" 已完成的任务 "),
                      vue.createElementVNode(
                        "view",
                        {
                          class: vue.normalizeClass(["completed-tasks-container", { "collapsed": !$setup.completedSections[$setup.getItemKey(item)] }])
                        },
                        [
                          (vue.openBlock(true), vue.createElementBlock(
                            vue.Fragment,
                            null,
                            vue.renderList($setup.getCompletedTasks(item.tasks), (task, taskIndex) => {
                              return vue.openBlock(), vue.createElementBlock("view", {
                                key: task.id,
                                class: "task-item"
                              }, [
                                vue.createElementVNode("view", { class: "task-checkbox" }, [
                                  vue.createVNode(_component_uni_icons, {
                                    type: "checkbox",
                                    size: 20,
                                    color: "#4CD964"
                                  })
                                ]),
                                vue.createElementVNode("view", { class: "task-content" }, [
                                  vue.createElementVNode(
                                    "text",
                                    { class: "task-description completed" },
                                    vue.toDisplayString(task.taskDescription),
                                    1
                                    /* TEXT */
                                  ),
                                  task.value && task.value >= 1 ? (vue.openBlock(), vue.createElementBlock("view", {
                                    key: 0,
                                    class: "task-value"
                                  }, [
                                    vue.createVNode(_component_uni_icons, {
                                      type: "wallet",
                                      size: "12",
                                      color: "#666"
                                    }),
                                    vue.createElementVNode(
                                      "text",
                                      { class: "value-text" },
                                      vue.toDisplayString(task.value),
                                      1
                                      /* TEXT */
                                    )
                                  ])) : vue.createCommentVNode("v-if", true)
                                ]),
                                vue.createElementVNode("view", { class: "task-actions" }, [
                                  vue.createVNode(_component_uni_icons, {
                                    type: task.like ? "star-filled" : "star",
                                    size: 20,
                                    color: task.like ? "#FFD700" : "#C7C7CC"
                                  }, null, 8, ["type", "color"])
                                ])
                              ]);
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ],
                        2
                        /* CLASS */
                      )
                    ],
                    2
                    /* CLASS */
                  )) : vue.createCommentVNode("v-if", true)
                ], 10, ["onClick"])
              ]),
              _: 2
              /* DYNAMIC */
            }, 1032, ["class"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ], 40, ["refresher-triggered"])
    ]);
  }
  const PagesStatisticsStatistics = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$c], ["__scopeId", "data-v-fc23ec97"], ["__file", "C:/Users/Administrator/Documents/HBuilderProjects/todoPlus/pages/statistics/statistics.vue"]]);
  const _sfc_main$c = {};
  function _sfc_render$b(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("h1", null, "账户")
    ]);
  }
  const PagesAccountAccount = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$b], ["__file", "C:/Users/Administrator/Documents/HBuilderProjects/todoPlus/pages/account/account.vue"]]);
  const _sfc_main$b = {
    __name: "test",
    setup(__props, { expose: __expose }) {
      __expose();
      const selectedDate = vue.ref("");
      const send = async () => {
        const res2 = await request.get("/user/updatePasswordCode/13800138000");
        formatAppLog("log", "at pages/test/test.vue:29", res2);
      };
      const onDateChange = (e) => {
        selectedDate.value = e.detail.value;
        formatAppLog("log", "at pages/test/test.vue:34", "选择的日期:", e.detail.value);
      };
      const __returned__ = { selectedDate, send, onDateChange, ref: vue.ref, get userApi() {
        return userApi;
      }, get request() {
        return request;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createElementVNode("img", {
          src: "http://110.42.210.113:9000/todoplus/assets_task_01k1avb3ymfm6vnyhf00xg729b_1753784690_img_0.png",
          alt: ""
        }),
        vue.createElementVNode("view", { class: "test-container" }, [
          vue.createElementVNode("button", {
            onClick: _cache[0] || (_cache[0] = ($event) => $setup.send())
          }, "发送"),
          vue.createElementVNode("view", { class: "date-picker-container" }, [
            vue.createElementVNode("picker", {
              mode: "date",
              value: $setup.selectedDate,
              onChange: $setup.onDateChange
            }, [
              vue.createElementVNode(
                "button",
                { class: "date-picker-btn" },
                " 选择日期: " + vue.toDisplayString($setup.selectedDate || "请选择日期"),
                1
                /* TEXT */
              )
            ], 40, ["value"])
          ]),
          $setup.selectedDate ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "selected-info"
          }, [
            vue.createElementVNode(
              "text",
              null,
              "选中的日期: " + vue.toDisplayString($setup.selectedDate),
              1
              /* TEXT */
            )
          ])) : vue.createCommentVNode("v-if", true)
        ])
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesTestTest = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$a], ["__scopeId", "data-v-727d09f0"], ["__file", "C:/Users/Administrator/Documents/HBuilderProjects/todoPlus/pages/test/test.vue"]]);
  const queryList$1 = () => {
    return request.get("/templateTask/queryList");
  };
  const addTemplateTask = (data) => {
    return request.post("/templateTask/add", data);
  };
  const updateSorts = (ids) => {
    return request.post("/templateTask/updSorts", ids);
  };
  const updateTemplateTask = (data) => {
    return request.post("/templateTask/upd", data);
  };
  const deleteTemplateTask = (id) => {
    return request.delete(`/templateTask/del/${id}`);
  };
  const templateTaskApi = {
    queryList: queryList$1,
    addTemplateTask,
    updateSorts,
    updateTemplateTask,
    deleteTemplateTask
  };
  const _sfc_main$a = {
    __name: "template",
    setup(__props, { expose: __expose }) {
      __expose();
      const userStore = useUserStore();
      const templateList = vue.ref([]);
      const imageLoadError = vue.ref(false);
      const newTemplate = vue.ref({
        description: "",
        value: "1"
      });
      const editTemplate = vue.ref({
        id: null,
        description: "",
        value: "1"
      });
      const showModal = vue.ref(false);
      const modalClosing = vue.ref(false);
      const focusDescription = vue.ref(false);
      const showEditModal = vue.ref(false);
      const editModalClosing = vue.ref(false);
      const focusEditDescription = vue.ref(false);
      const swipeStates = vue.ref({});
      const touchStartX = vue.ref(0);
      const touchStartY = vue.ref(0);
      const currentSwipeTemplateId = vue.ref(null);
      const showMoreMenu = vue.ref(false);
      const moreMenuClosing = vue.ref(false);
      const isRefreshing = vue.ref(false);
      const refresherTriggered = vue.ref(false);
      const currentBackgroundImage = vue.computed(() => {
        return userStore.userInfo.backgroudImg || "";
      });
      const showBackgroundImage = vue.computed(() => {
        return currentBackgroundImage.value && !imageLoadError.value;
      });
      const goBack = () => {
        uni.navigateBack({
          delta: 1
        });
      };
      const openMore = () => {
        showMoreMenu.value = true;
      };
      const handleTouchStart = (e, templateId) => {
        touchStartX.value = e.touches[0].clientX;
        touchStartY.value = e.touches[0].clientY;
        currentSwipeTemplateId.value = templateId;
      };
      const handleTouchMove = (e, templateId) => {
        if (currentSwipeTemplateId.value !== templateId)
          return;
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;
        const deltaX = touchX - touchStartX.value;
        const deltaY = touchY - touchStartY.value;
        if (Math.abs(deltaY) > Math.abs(deltaX))
          return;
        if (deltaX < 0) {
          const translateX = Math.max(deltaX * 0.5, -120);
          if (!swipeStates.value[templateId]) {
            swipeStates.value[templateId] = {};
          }
          swipeStates.value[templateId].translateX = translateX;
          swipeStates.value[templateId].showDelete = translateX < -30;
        }
      };
      const handleTouchEnd = (e, templateId) => {
        if (currentSwipeTemplateId.value !== templateId)
          return;
        const state = swipeStates.value[templateId];
        if (!state)
          return;
        if (state.translateX < -60) {
          confirmDelete(templateId);
        } else if (state.translateX < -30) {
          state.translateX = -120;
          state.showDelete = true;
        } else {
          resetSwipeState(templateId);
        }
        currentSwipeTemplateId.value = null;
      };
      const resetSwipeState = (templateId) => {
        if (swipeStates.value[templateId]) {
          swipeStates.value[templateId].translateX = 0;
          swipeStates.value[templateId].showDelete = false;
        }
      };
      const resetAllSwipeStates = () => {
        Object.keys(swipeStates.value).forEach((templateId) => {
          resetSwipeState(templateId);
        });
      };
      const handleScroll = () => {
        resetAllSwipeStates();
      };
      const handleRefresherPulling = (e) => {
      };
      const handleRefresherRefresh = async () => {
        refresherTriggered.value = true;
        isRefreshing.value = true;
        try {
          await fetchTemplateList();
          uni.showToast({
            title: "刷新成功",
            icon: "success",
            duration: 1500
          });
        } catch (error) {
          formatAppLog("error", "at pages/template/template.vue:339", "刷新失败:", error);
          uni.showToast({
            title: "刷新失败，请重试",
            icon: "none",
            duration: 2e3
          });
        } finally {
          setTimeout(() => {
            refresherTriggered.value = false;
            isRefreshing.value = false;
          }, 800);
        }
      };
      const handleRefresherRestore = () => {
        refresherTriggered.value = false;
        isRefreshing.value = false;
      };
      const confirmDelete = (templateId) => {
        resetAllSwipeStates();
        const template = getTemplateById(templateId);
        if (!template) {
          formatAppLog("error", "at pages/template/template.vue:366", "未找到要删除的模板:", templateId);
          return;
        }
        uni.showModal({
          title: "删除确认",
          content: `确定要删除"${template.taskDescription}"模板吗？`,
          confirmColor: "#f56c6c",
          success: async (res2) => {
            if (res2.confirm) {
              await executeDelete(templateId);
            }
          }
        });
      };
      const executeDelete = async (templateId) => {
        if (!templateId)
          return;
        uni.showLoading({
          title: "删除中..."
        });
        try {
          const res2 = await templateTaskApi.deleteTemplateTask(templateId);
          uni.hideLoading();
          if (res2.code === 200 || res2.code === "200") {
            uni.showToast({
              title: "模板已删除",
              icon: "success"
            });
            await fetchTemplateList();
          } else {
            uni.showToast({
              title: res2.message || "删除失败",
              icon: "none"
            });
          }
        } catch (error) {
          uni.hideLoading();
          uni.showToast({
            title: "删除失败",
            icon: "none"
          });
          formatAppLog("error", "at pages/template/template.vue:415", "删除模板失败:", error);
        }
      };
      const getTemplateById = (templateId) => {
        return templateList.value.find((template) => template.id === templateId);
      };
      const closeMoreMenu = () => {
        moreMenuClosing.value = true;
        setTimeout(() => {
          showMoreMenu.value = false;
          moreMenuClosing.value = false;
        }, 300);
      };
      const sortTemplates = () => {
        closeMoreMenu();
        setTimeout(() => {
          uni.showToast({
            title: "排序功能待实现",
            icon: "none"
          });
        }, 300);
      };
      const showAddTemplateModal = () => {
        showModal.value = true;
        setTimeout(() => {
          focusDescription.value = true;
        }, 300);
      };
      const closeAddTemplateModal = () => {
        modalClosing.value = true;
        focusDescription.value = false;
        setTimeout(() => {
          showModal.value = false;
          modalClosing.value = false;
          newTemplate.value = {
            description: "",
            value: "1"
          };
        }, 300);
      };
      const addTemplate = async () => {
        if (!newTemplate.value.description.trim()) {
          uni.showToast({
            title: "请输入任务描述",
            icon: "none"
          });
          return;
        }
        uni.showLoading({
          title: "添加中..."
        });
        try {
          const reqData = {
            desc: newTemplate.value.description.trim(),
            value: parseInt(newTemplate.value.value) || 1
          };
          const res2 = await templateTaskApi.addTemplateTask(reqData);
          uni.hideLoading();
          if (res2.code === 200 || res2.code === "200") {
            closeAddTemplateModal();
            uni.showToast({
              title: "模板添加成功",
              icon: "success"
            });
            fetchTemplateList();
          } else {
            uni.showToast({
              title: res2.message || "添加失败",
              icon: "none"
            });
          }
        } catch (error) {
          uni.hideLoading();
          uni.showToast({
            title: "添加失败",
            icon: "none"
          });
          formatAppLog("error", "at pages/template/template.vue:511", "添加模板失败:", error);
        }
      };
      const editTemplateItem = (template, event) => {
        if (event) {
          event.stopPropagation();
        }
        editTemplate.value = {
          id: template.id,
          description: template.taskDescription,
          value: template.value ? template.value.toString() : "1"
        };
        showEditModal.value = true;
        setTimeout(() => {
          focusEditDescription.value = true;
        }, 300);
      };
      const closeEditTemplateModal = () => {
        editModalClosing.value = true;
        focusEditDescription.value = false;
        setTimeout(() => {
          showEditModal.value = false;
          editModalClosing.value = false;
          editTemplate.value = {
            id: null,
            description: "",
            value: "1"
          };
        }, 300);
      };
      const updateTemplate = async () => {
        if (!editTemplate.value.description.trim()) {
          uni.showToast({
            title: "请输入任务描述",
            icon: "none"
          });
          return;
        }
        uni.showLoading({
          title: "修改中..."
        });
        try {
          const reqData = {
            id: editTemplate.value.id,
            desc: editTemplate.value.description.trim(),
            value: parseInt(editTemplate.value.value) || 1
          };
          const res2 = await templateTaskApi.updateTemplateTask(reqData);
          uni.hideLoading();
          if (res2.code === 200 || res2.code === "200") {
            closeEditTemplateModal();
            uni.showToast({
              title: "模板修改成功",
              icon: "success"
            });
            fetchTemplateList();
          } else {
            uni.showToast({
              title: res2.message || "修改失败",
              icon: "none"
            });
          }
        } catch (error) {
          uni.hideLoading();
          uni.showToast({
            title: "修改失败",
            icon: "none"
          });
          formatAppLog("error", "at pages/template/template.vue:595", "修改模板失败:", error);
        }
      };
      const validateNumber = (e) => {
        let value = e.detail.value || e.target.value;
        value = value.replace(/[^\d]/g, "");
        if (value && parseInt(value) < 1) {
          value = "1";
        }
        if (!value) {
          value = "1";
        }
        newTemplate.value.value = value;
      };
      const increaseValue = () => {
        const currentValue = parseInt(newTemplate.value.value) || 1;
        newTemplate.value.value = (currentValue + 1).toString();
      };
      const decreaseValue = () => {
        const currentValue = parseInt(newTemplate.value.value) || 1;
        if (currentValue > 1) {
          newTemplate.value.value = (currentValue - 1).toString();
        }
      };
      const validateEditNumber = (e) => {
        let value = e.detail.value || e.target.value;
        value = value.replace(/[^\d]/g, "");
        if (value && parseInt(value) < 1) {
          value = "1";
        }
        if (!value) {
          value = "1";
        }
        editTemplate.value.value = value;
      };
      const increaseEditValue = () => {
        const currentValue = parseInt(editTemplate.value.value) || 1;
        editTemplate.value.value = (currentValue + 1).toString();
      };
      const decreaseEditValue = () => {
        const currentValue = parseInt(editTemplate.value.value) || 1;
        if (currentValue > 1) {
          editTemplate.value.value = (currentValue - 1).toString();
        }
      };
      const fetchTemplateList = async () => {
        try {
          const res2 = await templateTaskApi.queryList();
          if (res2 && res2.code === "200" && res2.data) {
            templateList.value = res2.data;
          }
        } catch (error) {
          formatAppLog("error", "at pages/template/template.vue:659", "获取模板列表失败:", error);
          uni.showToast({
            title: "获取模板列表失败",
            icon: "none"
          });
        }
      };
      const handleImageError = () => {
        imageLoadError.value = true;
        uni.showToast({
          title: "背景图片加载失败",
          icon: "none"
        });
      };
      const handleImageLoad = () => {
        imageLoadError.value = false;
      };
      vue.onMounted(() => {
        userStore.initUserInfo();
        fetchTemplateList();
      });
      const __returned__ = { userStore, templateList, imageLoadError, newTemplate, editTemplate, showModal, modalClosing, focusDescription, showEditModal, editModalClosing, focusEditDescription, swipeStates, touchStartX, touchStartY, currentSwipeTemplateId, showMoreMenu, moreMenuClosing, isRefreshing, refresherTriggered, currentBackgroundImage, showBackgroundImage, goBack, openMore, handleTouchStart, handleTouchMove, handleTouchEnd, resetSwipeState, resetAllSwipeStates, handleScroll, handleRefresherPulling, handleRefresherRefresh, handleRefresherRestore, confirmDelete, executeDelete, getTemplateById, closeMoreMenu, sortTemplates, showAddTemplateModal, closeAddTemplateModal, addTemplate, editTemplateItem, closeEditTemplateModal, updateTemplate, validateNumber, increaseValue, decreaseValue, validateEditNumber, increaseEditValue, decreaseEditValue, fetchTemplateList, handleImageError, handleImageLoad, ref: vue.ref, computed: vue.computed, onMounted: vue.onMounted, get templateTaskApi() {
        return templateTaskApi;
      }, get useUserStore() {
        return useUserStore;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0);
    const _component_uni_card = resolveEasycom(vue.resolveDynamicComponent("uni-card"), __easycom_1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "template-container" }, [
      vue.createCommentVNode(" 背景图片 "),
      $setup.currentBackgroundImage ? (vue.openBlock(), vue.createElementBlock("image", {
        key: 0,
        src: $setup.currentBackgroundImage,
        class: "background-image",
        mode: "aspectFill",
        onError: $setup.handleImageError,
        onLoad: $setup.handleImageLoad
      }, null, 40, ["src"])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 顶部导航 "),
      vue.createElementVNode("view", { class: "nav-header" }, [
        vue.createElementVNode("view", { class: "nav-left" }, [
          vue.createVNode(_component_uni_icons, {
            type: "back",
            size: "24",
            color: "#fff",
            onClick: $setup.goBack
          })
        ]),
        vue.createElementVNode("view", { class: "nav-center" }, [
          vue.createElementVNode("text", { class: "nav-title" }, "任务模板")
        ]),
        vue.createElementVNode("view", { class: "nav-right" }, [
          vue.createVNode(_component_uni_icons, {
            type: "more-filled",
            size: "24",
            color: "#fff",
            onClick: $setup.openMore
          })
        ])
      ]),
      vue.createCommentVNode(" 模板任务列表 "),
      vue.createElementVNode("scroll-view", {
        class: "task-list",
        "scroll-y": "true",
        onScroll: $setup.handleScroll,
        "refresher-enabled": "true",
        "refresher-background": "transparent",
        "refresher-triggered": $setup.refresherTriggered,
        onRefresherpulling: $setup.handleRefresherPulling,
        onRefresherrefresh: $setup.handleRefresherRefresh,
        onRefresherrestore: $setup.handleRefresherRestore
      }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.templateList, (template, index) => {
            return vue.openBlock(), vue.createBlock(
              _component_uni_card,
              {
                key: template.id,
                "is-shadow": false,
                border: false,
                margin: "8rpx 20rpx",
                class: "task-card task-swipe-container"
              },
              {
                default: vue.withCtx(() => {
                  var _a2, _b;
                  return [
                    vue.createElementVNode("view", { class: "task-swipe-wrapper" }, [
                      vue.createElementVNode("view", {
                        class: "task-item",
                        style: vue.normalizeStyle({ transform: `translateX(${((_a2 = $setup.swipeStates[template.id]) == null ? void 0 : _a2.translateX) || 0}rpx)` }),
                        onTouchstart: ($event) => $setup.handleTouchStart($event, template.id),
                        onTouchmove: ($event) => $setup.handleTouchMove($event, template.id),
                        onTouchend: ($event) => $setup.handleTouchEnd($event, template.id)
                      }, [
                        vue.createElementVNode("view", { class: "template-icon" }, [
                          vue.createVNode(_component_uni_icons, {
                            type: "list",
                            size: "24",
                            color: "#667eea"
                          })
                        ]),
                        vue.createElementVNode("view", {
                          class: "task-content",
                          onClick: ($event) => $setup.editTemplateItem(template, $event)
                        }, [
                          vue.createElementVNode(
                            "text",
                            { class: "task-description" },
                            vue.toDisplayString(template.taskDescription),
                            1
                            /* TEXT */
                          ),
                          template.value && template.value >= 1 ? (vue.openBlock(), vue.createElementBlock("view", {
                            key: 0,
                            class: "task-value"
                          }, [
                            vue.createVNode(_component_uni_icons, {
                              type: "wallet",
                              size: "14",
                              color: "#666"
                            }),
                            vue.createElementVNode(
                              "text",
                              { class: "value-text" },
                              vue.toDisplayString(template.value),
                              1
                              /* TEXT */
                            )
                          ])) : vue.createCommentVNode("v-if", true)
                        ], 8, ["onClick"])
                      ], 44, ["onTouchstart", "onTouchmove", "onTouchend"]),
                      ((_b = $setup.swipeStates[template.id]) == null ? void 0 : _b.showDelete) ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 0,
                        class: "delete-action",
                        onClick: ($event) => $setup.confirmDelete(template.id)
                      }, [
                        vue.createVNode(_component_uni_icons, {
                          type: "trash",
                          size: "24",
                          color: "#fff"
                        })
                      ], 8, ["onClick"])) : vue.createCommentVNode("v-if", true)
                    ])
                  ];
                }),
                _: 2
                /* DYNAMIC */
              },
              1024
              /* DYNAMIC_SLOTS */
            );
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ], 40, ["refresher-triggered"]),
      vue.createCommentVNode(" 添加模板按钮 "),
      vue.createElementVNode("view", {
        class: "add-task-btn",
        onClick: $setup.showAddTemplateModal
      }, [
        vue.createVNode(_component_uni_icons, {
          type: "plus",
          size: "20",
          color: "#fff"
        }),
        vue.createElementVNode("text", { class: "add-btn-text" }, "添加模板")
      ]),
      vue.createCommentVNode(" 添加模板弹窗 "),
      $setup.showModal ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "modal-overlay",
        onClick: $setup.closeAddTemplateModal
      }, [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["modal-content", { "closing": $setup.modalClosing }]),
            onClick: _cache[3] || (_cache[3] = vue.withModifiers(() => {
            }, ["stop"]))
          },
          [
            vue.createElementVNode("view", { class: "popup-header" }, [
              vue.createElementVNode("text", { class: "popup-title" }, "新建模板"),
              vue.createElementVNode("view", {
                class: "popup-close",
                onClick: $setup.closeAddTemplateModal
              }, [
                vue.createVNode(_component_uni_icons, {
                  type: "close",
                  size: "20",
                  color: "#666"
                })
              ])
            ]),
            vue.createElementVNode("view", { class: "input-group" }, [
              vue.createElementVNode("view", { class: "input-label" }, "任务描述"),
              vue.withDirectives(vue.createElementVNode("input", {
                class: "task-input",
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.newTemplate.description = $event),
                placeholder: "请输入任务描述...",
                maxlength: "100",
                focus: $setup.focusDescription,
                onBlur: _cache[1] || (_cache[1] = ($event) => $setup.focusDescription = false)
              }, null, 40, ["focus"]), [
                [vue.vModelText, $setup.newTemplate.description]
              ])
            ]),
            vue.createElementVNode("view", { class: "input-group" }, [
              vue.createElementVNode("view", { class: "input-label" }, "任务价值"),
              vue.createElementVNode("view", { class: "number-input-container" }, [
                vue.withDirectives(vue.createElementVNode(
                  "input",
                  {
                    class: "task-input number-input",
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.newTemplate.value = $event),
                    type: "number",
                    placeholder: "最小值为1",
                    onInput: $setup.validateNumber
                  },
                  null,
                  544
                  /* NEED_HYDRATION, NEED_PATCH */
                ), [
                  [vue.vModelText, $setup.newTemplate.value]
                ]),
                vue.createElementVNode("view", { class: "number-controls" }, [
                  vue.createElementVNode("view", {
                    class: "control-btn increase-btn",
                    onClick: $setup.increaseValue
                  }, [
                    vue.createVNode(_component_uni_icons, {
                      type: "plus",
                      size: "20",
                      color: "#fff"
                    })
                  ]),
                  vue.createElementVNode("view", {
                    class: "control-btn decrease-btn",
                    onClick: $setup.decreaseValue
                  }, [
                    vue.createVNode(_component_uni_icons, {
                      type: "minus",
                      size: "20",
                      color: "#fff"
                    })
                  ])
                ])
              ])
            ]),
            vue.createElementVNode("view", { class: "popup-actions" }, [
              vue.createElementVNode("button", {
                class: "cancel-btn",
                onClick: $setup.closeAddTemplateModal
              }, "取消"),
              vue.createElementVNode("button", {
                class: "confirm-btn",
                onClick: $setup.addTemplate,
                disabled: !$setup.newTemplate.description.trim()
              }, "确认添加", 8, ["disabled"])
            ])
          ],
          2
          /* CLASS */
        )
      ])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 修改模板弹窗 "),
      $setup.showEditModal ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 2,
        class: "modal-overlay",
        onClick: $setup.closeEditTemplateModal
      }, [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["modal-content", { "closing": $setup.editModalClosing }]),
            onClick: _cache[7] || (_cache[7] = vue.withModifiers(() => {
            }, ["stop"]))
          },
          [
            vue.createElementVNode("view", { class: "popup-header" }, [
              vue.createElementVNode("text", { class: "popup-title" }, "修改模板"),
              vue.createElementVNode("view", {
                class: "popup-close",
                onClick: $setup.closeEditTemplateModal
              }, [
                vue.createVNode(_component_uni_icons, {
                  type: "close",
                  size: "20",
                  color: "#666"
                })
              ])
            ]),
            vue.createElementVNode("view", { class: "input-group" }, [
              vue.createElementVNode("view", { class: "input-label" }, "任务描述"),
              vue.withDirectives(vue.createElementVNode("input", {
                class: "task-input",
                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.editTemplate.description = $event),
                placeholder: "请输入任务描述...",
                maxlength: "100",
                focus: $setup.focusEditDescription,
                onBlur: _cache[5] || (_cache[5] = ($event) => $setup.focusEditDescription = false)
              }, null, 40, ["focus"]), [
                [vue.vModelText, $setup.editTemplate.description]
              ])
            ]),
            vue.createElementVNode("view", { class: "input-group" }, [
              vue.createElementVNode("view", { class: "input-label" }, "任务价值"),
              vue.createElementVNode("view", { class: "number-input-container" }, [
                vue.withDirectives(vue.createElementVNode(
                  "input",
                  {
                    class: "task-input number-input",
                    "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $setup.editTemplate.value = $event),
                    type: "number",
                    placeholder: "最小值为1",
                    onInput: $setup.validateEditNumber
                  },
                  null,
                  544
                  /* NEED_HYDRATION, NEED_PATCH */
                ), [
                  [vue.vModelText, $setup.editTemplate.value]
                ]),
                vue.createElementVNode("view", { class: "number-controls" }, [
                  vue.createElementVNode("view", {
                    class: "control-btn increase-btn",
                    onClick: $setup.increaseEditValue
                  }, [
                    vue.createVNode(_component_uni_icons, {
                      type: "plus",
                      size: "20",
                      color: "#fff"
                    })
                  ]),
                  vue.createElementVNode("view", {
                    class: "control-btn decrease-btn",
                    onClick: $setup.decreaseEditValue
                  }, [
                    vue.createVNode(_component_uni_icons, {
                      type: "minus",
                      size: "20",
                      color: "#fff"
                    })
                  ])
                ])
              ])
            ]),
            vue.createElementVNode("view", { class: "popup-actions" }, [
              vue.createElementVNode("button", {
                class: "cancel-btn",
                onClick: $setup.closeEditTemplateModal
              }, "取消"),
              vue.createElementVNode("button", {
                class: "confirm-btn",
                onClick: $setup.updateTemplate,
                disabled: !$setup.editTemplate.description.trim()
              }, "确认修改", 8, ["disabled"])
            ])
          ],
          2
          /* CLASS */
        )
      ])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 更多菜单弹窗 "),
      $setup.showMoreMenu ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 3,
        class: "modal-overlay",
        onClick: $setup.closeMoreMenu
      }, [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["modal-content more-menu", { "closing": $setup.moreMenuClosing }]),
            onClick: _cache[8] || (_cache[8] = vue.withModifiers(() => {
            }, ["stop"]))
          },
          [
            vue.createElementVNode("view", { class: "menu-header" }, [
              vue.createElementVNode("view", { class: "menu-handle" }),
              vue.createElementVNode("text", { class: "menu-title" }, "模板选项"),
              vue.createElementVNode("text", {
                class: "menu-done",
                onClick: $setup.closeMoreMenu
              }, "完成")
            ]),
            vue.createElementVNode("view", { class: "menu-items" }, [
              vue.createElementVNode("view", {
                class: "menu-item",
                onClick: $setup.sortTemplates
              }, [
                vue.createVNode(_component_uni_icons, {
                  type: "reload",
                  size: "20",
                  color: "#333"
                }),
                vue.createElementVNode("text", { class: "menu-text" }, "排序")
              ])
            ])
          ],
          2
          /* CLASS */
        )
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const PagesTemplateTemplate = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$9], ["__scopeId", "data-v-754db3c2"], ["__file", "C:/Users/Administrator/Documents/HBuilderProjects/todoPlus/pages/template/template.vue"]]);
  const _sfc_main$9 = {
    __name: "like",
    setup(__props, { expose: __expose }) {
      __expose();
      const userStore = useUserStore();
      const taskList = vue.ref([]);
      const isLoading = vue.ref(false);
      const imageLoadError = vue.ref(false);
      const currentPage = vue.ref(1);
      const pageSize = vue.ref(10);
      const hasMore = vue.ref(true);
      const isLoadingMore = vue.ref(false);
      const total = vue.ref(0);
      const swipeStates = vue.ref({});
      const touchStartX = vue.ref(0);
      const touchStartY = vue.ref(0);
      const currentSwipeTaskId = vue.ref(null);
      const isRefreshing = vue.ref(false);
      const refresherTriggered = vue.ref(false);
      const currentBackgroundImage = vue.computed(() => {
        return userStore.userInfo.backgroudImg || "";
      });
      const goBack = () => {
        uni.navigateBack({
          delta: 1
        });
      };
      const toggleStar = async (taskId) => {
        try {
          const res2 = await taskApi.like(taskId);
          if (res2.code === 200 || res2.code === "200") {
            await fetchTaskList();
          } else {
            uni.showToast({
              title: res2.message || "操作失败",
              icon: "none"
            });
          }
        } catch (error) {
          formatAppLog("error", "at pages/like/like.vue:154", "切换收藏状态失败:", error);
          uni.showToast({
            title: "操作失败",
            icon: "none"
          });
        }
      };
      const handleTouchStart = (e, taskId) => {
        touchStartX.value = e.touches[0].clientX;
        touchStartY.value = e.touches[0].clientY;
        currentSwipeTaskId.value = taskId;
      };
      const handleTouchMove = (e, taskId) => {
        if (currentSwipeTaskId.value !== taskId)
          return;
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;
        const deltaX = touchX - touchStartX.value;
        const deltaY = touchY - touchStartY.value;
        if (Math.abs(deltaY) > Math.abs(deltaX))
          return;
        if (deltaX < 0) {
          const translateX = Math.max(deltaX * 0.5, -120);
          if (!swipeStates.value[taskId]) {
            swipeStates.value[taskId] = {};
          }
          swipeStates.value[taskId].translateX = translateX;
          swipeStates.value[taskId].showDelete = translateX < -30;
        }
      };
      const handleTouchEnd = (e, taskId) => {
        if (currentSwipeTaskId.value !== taskId)
          return;
        const state = swipeStates.value[taskId];
        if (!state)
          return;
        if (state.translateX < -60) {
          confirmUnlike(taskId);
        } else if (state.translateX < -30) {
          state.translateX = -120;
          state.showDelete = true;
        } else {
          resetSwipeState(taskId);
        }
        currentSwipeTaskId.value = null;
      };
      const resetSwipeState = (taskId) => {
        if (swipeStates.value[taskId]) {
          swipeStates.value[taskId].translateX = 0;
          swipeStates.value[taskId].showDelete = false;
        }
      };
      const resetAllSwipeStates = () => {
        Object.keys(swipeStates.value).forEach((taskId) => {
          resetSwipeState(taskId);
        });
      };
      const handleScroll = () => {
        resetAllSwipeStates();
      };
      const confirmUnlike = (taskId) => {
        resetAllSwipeStates();
        const task = getTaskById(taskId);
        if (!task) {
          formatAppLog("error", "at pages/like/like.vue:237", "未找到要取消收藏的任务:", taskId);
          return;
        }
        uni.showModal({
          title: "取消收藏",
          content: `确定要取消收藏"${task.taskDescription}"吗？`,
          confirmColor: "#f56c6c",
          success: async (res2) => {
            if (res2.confirm) {
              await executeUnlike(taskId);
            }
          }
        });
      };
      const executeUnlike = async (taskId) => {
        if (!taskId)
          return;
        uni.showLoading({
          title: "取消收藏中..."
        });
        try {
          const res2 = await taskApi.like(taskId);
          uni.hideLoading();
          if (res2.code === 200 || res2.code === "200") {
            uni.showToast({
              title: "已取消收藏",
              icon: "success"
            });
            await fetchTaskList();
          } else {
            uni.showToast({
              title: res2.message || "取消收藏失败",
              icon: "none"
            });
          }
        } catch (error) {
          uni.hideLoading();
          uni.showToast({
            title: "取消收藏失败",
            icon: "none"
          });
          formatAppLog("error", "at pages/like/like.vue:286", "取消收藏失败:", error);
        }
      };
      const getTaskById = (taskId) => {
        return taskList.value.find((task) => task.id === taskId);
      };
      const handleImageError = () => {
        imageLoadError.value = true;
        uni.showToast({
          title: "背景图片加载失败",
          icon: "none"
        });
      };
      const handleImageLoad = () => {
        imageLoadError.value = false;
      };
      const fetchTaskList = async (isRefresh = true) => {
        if (isRefresh) {
          isLoading.value = true;
          currentPage.value = 1;
          taskList.value = [];
        } else {
          isLoadingMore.value = true;
        }
        try {
          const res2 = await taskApi.queryLike({
            pageNo: currentPage.value,
            pageSize: pageSize.value
          });
          if (res2 && res2.code === "200" && res2.data) {
            const pageInfo = res2.data;
            const newTasks = pageInfo.list || [];
            if (isRefresh) {
              taskList.value = newTasks;
            } else {
              taskList.value = [...taskList.value, ...newTasks];
            }
            total.value = pageInfo.total || 0;
            hasMore.value = currentPage.value < (pageInfo.pages || 1);
          }
        } catch (error) {
          formatAppLog("error", "at pages/like/like.vue:338", "获取收藏列表失败:", error);
          uni.showToast({
            title: "获取收藏列表失败",
            icon: "none"
          });
        } finally {
          if (isRefresh) {
            isLoading.value = false;
          } else {
            isLoadingMore.value = false;
          }
        }
      };
      const handleRefresherPulling = (e) => {
      };
      const handleRefresherRefresh = async () => {
        refresherTriggered.value = true;
        isRefreshing.value = true;
        try {
          await fetchTaskList(true);
          uni.showToast({
            title: "刷新成功",
            icon: "success",
            duration: 1500
          });
        } catch (error) {
          formatAppLog("error", "at pages/like/like.vue:372", "刷新失败:", error);
          uni.showToast({
            title: "刷新失败，请重试",
            icon: "none",
            duration: 2e3
          });
        } finally {
          setTimeout(() => {
            refresherTriggered.value = false;
            isRefreshing.value = false;
          }, 800);
        }
      };
      const handleRefresherRestore = () => {
        refresherTriggered.value = false;
        isRefreshing.value = false;
      };
      const loadMore = async () => {
        if (!hasMore.value || isLoadingMore.value)
          return;
        currentPage.value++;
        await fetchTaskList(false);
      };
      const handleScrollToLower = () => {
        if (hasMore.value && !isLoadingMore.value) {
          loadMore();
        }
      };
      vue.onMounted(() => {
        userStore.initUserInfo();
        fetchTaskList(true);
      });
      const __returned__ = { userStore, taskList, isLoading, imageLoadError, currentPage, pageSize, hasMore, isLoadingMore, total, swipeStates, touchStartX, touchStartY, currentSwipeTaskId, isRefreshing, refresherTriggered, currentBackgroundImage, goBack, toggleStar, handleTouchStart, handleTouchMove, handleTouchEnd, resetSwipeState, resetAllSwipeStates, handleScroll, confirmUnlike, executeUnlike, getTaskById, handleImageError, handleImageLoad, fetchTaskList, handleRefresherPulling, handleRefresherRefresh, handleRefresherRestore, loadMore, handleScrollToLower, ref: vue.ref, computed: vue.computed, onMounted: vue.onMounted, get taskApi() {
        return taskApi;
      }, get useUserStore() {
        return useUserStore;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0);
    const _component_uni_card = resolveEasycom(vue.resolveDynamicComponent("uni-card"), __easycom_1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "like-container" }, [
      vue.createCommentVNode(" 背景图片 "),
      $setup.currentBackgroundImage ? (vue.openBlock(), vue.createElementBlock("image", {
        key: 0,
        src: $setup.currentBackgroundImage,
        class: "background-image",
        mode: "aspectFill",
        onError: $setup.handleImageError,
        onLoad: $setup.handleImageLoad
      }, null, 40, ["src"])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 顶部导航 "),
      vue.createElementVNode("view", { class: "nav-header" }, [
        vue.createElementVNode("view", { class: "nav-left" }, [
          vue.createVNode(_component_uni_icons, {
            type: "back",
            size: "24",
            color: "#fff",
            onClick: $setup.goBack
          })
        ]),
        vue.createElementVNode("view", { class: "nav-center" }, [
          vue.createElementVNode("text", { class: "nav-title" }, "收藏")
        ]),
        vue.createElementVNode("view", { class: "nav-right" })
      ]),
      vue.createCommentVNode(" 任务列表 "),
      vue.createElementVNode("scroll-view", {
        class: "task-list",
        "scroll-y": "true",
        onScroll: $setup.handleScroll,
        onScrolltolower: $setup.handleScrollToLower,
        "refresher-enabled": "true",
        "refresher-background": "transparent",
        "refresher-triggered": $setup.refresherTriggered,
        onRefresherpulling: $setup.handleRefresherPulling,
        onRefresherrefresh: $setup.handleRefresherRefresh,
        onRefresherrestore: $setup.handleRefresherRestore
      }, [
        vue.createCommentVNode(" 空状态 "),
        $setup.taskList.length === 0 && !$setup.isLoading ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "empty-state"
        }, [
          vue.createVNode(_component_uni_icons, {
            type: "star",
            size: "80",
            color: "rgba(255, 255, 255, 0.3)"
          }),
          vue.createElementVNode("text", { class: "empty-text" }, "暂无收藏任务")
        ])) : vue.createCommentVNode("v-if", true),
        vue.createCommentVNode(" 收藏任务列表 "),
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.taskList, (task, index) => {
            return vue.openBlock(), vue.createBlock(
              _component_uni_card,
              {
                key: task.id,
                "is-shadow": false,
                border: false,
                margin: "8rpx 20rpx",
                class: "task-card task-swipe-container"
              },
              {
                default: vue.withCtx(() => {
                  var _a2, _b;
                  return [
                    vue.createElementVNode("view", { class: "task-swipe-wrapper" }, [
                      vue.createElementVNode("view", {
                        class: "task-item",
                        style: vue.normalizeStyle({ transform: `translateX(${((_a2 = $setup.swipeStates[task.id]) == null ? void 0 : _a2.translateX) || 0}rpx)` }),
                        onTouchstart: ($event) => $setup.handleTouchStart($event, task.id),
                        onTouchmove: ($event) => $setup.handleTouchMove($event, task.id),
                        onTouchend: ($event) => $setup.handleTouchEnd($event, task.id)
                      }, [
                        vue.createElementVNode("view", { class: "task-checkbox" }, [
                          vue.createVNode(_component_uni_icons, {
                            type: "checkbox",
                            size: 24,
                            color: task.isCompleted ? "#4CD964" : "#C7C7CC"
                          }, null, 8, ["color"])
                        ]),
                        vue.createElementVNode("view", { class: "task-content" }, [
                          vue.createElementVNode(
                            "text",
                            {
                              class: vue.normalizeClass(["task-description", { completed: task.isCompleted }])
                            },
                            vue.toDisplayString(task.taskDescription),
                            3
                            /* TEXT, CLASS */
                          ),
                          task.value && task.value >= 1 ? (vue.openBlock(), vue.createElementBlock("view", {
                            key: 0,
                            class: "task-value"
                          }, [
                            vue.createVNode(_component_uni_icons, {
                              type: "wallet",
                              size: "14",
                              color: "#666"
                            }),
                            vue.createElementVNode(
                              "text",
                              { class: "value-text" },
                              vue.toDisplayString(task.value),
                              1
                              /* TEXT */
                            )
                          ])) : vue.createCommentVNode("v-if", true)
                        ]),
                        vue.createElementVNode("view", { class: "task-actions" }, [
                          vue.createVNode(_component_uni_icons, {
                            type: "star-filled",
                            size: 24,
                            color: "#FFD700",
                            onClick: ($event) => $setup.toggleStar(task.id)
                          }, null, 8, ["onClick"])
                        ])
                      ], 44, ["onTouchstart", "onTouchmove", "onTouchend"]),
                      ((_b = $setup.swipeStates[task.id]) == null ? void 0 : _b.showDelete) ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 0,
                        class: "delete-action",
                        onClick: ($event) => $setup.confirmUnlike(task.id)
                      }, [
                        vue.createVNode(_component_uni_icons, {
                          type: "heart-filled",
                          size: "24",
                          color: "#fff"
                        })
                      ], 8, ["onClick"])) : vue.createCommentVNode("v-if", true)
                    ])
                  ];
                }),
                _: 2
                /* DYNAMIC */
              },
              1024
              /* DYNAMIC_SLOTS */
            );
          }),
          128
          /* KEYED_FRAGMENT */
        )),
        vue.createCommentVNode(" 加载更多 "),
        $setup.taskList.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: "load-more"
        }, [
          $setup.isLoadingMore ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "loading-text"
          }, [
            vue.createElementVNode("text", null, "加载中...")
          ])) : $setup.hasMore ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "load-more-btn",
            onClick: $setup.loadMore
          }, [
            vue.createElementVNode("text", null, "点击加载更多")
          ])) : (vue.openBlock(), vue.createElementBlock("view", {
            key: 2,
            class: "no-more-text"
          }, [
            vue.createElementVNode("text", null, "已加载全部数据")
          ]))
        ])) : vue.createCommentVNode("v-if", true)
      ], 40, ["refresher-triggered"])
    ]);
  }
  const PagesLikeLike = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8], ["__scopeId", "data-v-03e14ebf"], ["__file", "C:/Users/Administrator/Documents/HBuilderProjects/todoPlus/pages/like/like.vue"]]);
  const _sfc_main$8 = {
    __name: "charts",
    setup(__props, { expose: __expose }) {
      __expose();
      const userStore = useUserStore();
      const imageLoadError = vue.ref(false);
      const currentBackgroundImage = vue.computed(() => {
        return userStore.userInfo.backgroudImg || "";
      });
      const goBack = () => {
        uni.navigateBack({
          delta: 1
        });
      };
      const handleImageError = () => {
        imageLoadError.value = true;
      };
      const handleImageLoad = () => {
        imageLoadError.value = false;
      };
      vue.onMounted(() => {
        userStore.initUserInfo();
      });
      const __returned__ = { userStore, imageLoadError, currentBackgroundImage, goBack, handleImageError, handleImageLoad, ref: vue.ref, computed: vue.computed, onMounted: vue.onMounted, get useUserStore() {
        return useUserStore;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock("view", { class: "charts-container" }, [
      vue.createCommentVNode(" 背景图片 "),
      $setup.currentBackgroundImage ? (vue.openBlock(), vue.createElementBlock("image", {
        key: 0,
        src: $setup.currentBackgroundImage,
        class: "background-image",
        mode: "aspectFill",
        onError: $setup.handleImageError,
        onLoad: $setup.handleImageLoad
      }, null, 40, ["src"])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 顶部导航 "),
      vue.createElementVNode("view", { class: "nav-header" }, [
        vue.createElementVNode("view", { class: "nav-left" }, [
          vue.createVNode(_component_uni_icons, {
            type: "back",
            size: "24",
            color: "#fff",
            onClick: $setup.goBack
          })
        ]),
        vue.createElementVNode("view", { class: "nav-center" }, [
          vue.createElementVNode("text", { class: "nav-title" }, "图表")
        ]),
        vue.createElementVNode("view", { class: "nav-right" })
      ]),
      vue.createCommentVNode(" 内容区域 "),
      vue.createElementVNode("view", { class: "content-area" }, [
        vue.createElementVNode("view", { class: "placeholder" }, [
          vue.createVNode(_component_uni_icons, {
            type: "chart",
            size: "80",
            color: "rgba(255, 255, 255, 0.3)"
          }),
          vue.createElementVNode("text", { class: "placeholder-text" }, "图表功能正在开发中...")
        ])
      ])
    ]);
  }
  const PagesChartsCharts = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__scopeId", "data-v-fe2da769"], ["__file", "C:/Users/Administrator/Documents/HBuilderProjects/todoPlus/pages/charts/charts.vue"]]);
  const queryList = (data) => {
    return request.post("/milestone/list", data);
  };
  const addMilestone = (data) => {
    return request.post("/milestone/add", data);
  };
  const updateMilestone = (data) => {
    return request.post("/milestone/upd", data);
  };
  const deleteMilestone = (id) => {
    return request.delete(`/milestone/del/${id}`);
  };
  const completeMilestone = (id) => {
    return request.get(`/milestone/complete/${id}`);
  };
  const getMilestoneDetail = (id) => {
    return request.get(`/milestone/detail/${id}`);
  };
  const milestoneApi = {
    queryList,
    addMilestone,
    updateMilestone,
    deleteMilestone,
    completeMilestone,
    getMilestoneDetail
  };
  const indicatorStyle = "height: 68rpx; border-top: 1rpx solid #e0e0e0; border-bottom: 1rpx solid #e0e0e0;";
  const maskStyle = "background-image: linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6)), linear-gradient(0deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6));";
  const _sfc_main$7 = {
    __name: "milestore",
    setup(__props, { expose: __expose }) {
      __expose();
      const userStore = useUserStore();
      const milestoneList = vue.ref([]);
      const newMilestone = vue.ref({
        title: "",
        type: 1,
        // 默认为短期
        value: "1",
        desc: "",
        deadline: ""
      });
      const showModal = vue.ref(false);
      const modalClosing = vue.ref(false);
      const focusTitle = vue.ref(false);
      const showEditModal = vue.ref(false);
      const editModalClosing = vue.ref(false);
      const focusEditTitle = vue.ref(false);
      const editMilestone = vue.ref({
        id: null,
        title: "",
        type: 1,
        value: "1",
        desc: "",
        deadline: ""
      });
      const showDateModal = vue.ref(false);
      const selectedDate = vue.ref("");
      const currentDateTarget = vue.ref("");
      const deadlineError = vue.ref("");
      const editDeadlineError = vue.ref("");
      const currentDate = vue.ref({
        year: (/* @__PURE__ */ new Date()).getFullYear(),
        month: (/* @__PURE__ */ new Date()).getMonth() + 1,
        day: (/* @__PURE__ */ new Date()).getDate()
      });
      const todayDate = vue.computed(() => {
        const year = currentDate.value.year;
        const month = String(currentDate.value.month).padStart(2, "0");
        const day = String(currentDate.value.day).padStart(2, "0");
        return `${year}-${month}-${day}`;
      });
      const pickerValue = vue.ref([0, 0, 0]);
      const years = vue.computed(() => {
        const yearArray = [];
        for (let i = 0; i < 10; i++) {
          yearArray.push(currentDate.value.year + i);
        }
        return yearArray;
      });
      const months = vue.computed(() => {
        const monthArray = [];
        const selectedYear = years.value[pickerValue.value[0]];
        const startMonth = selectedYear === currentDate.value.year ? currentDate.value.month : 1;
        for (let i = startMonth; i <= 12; i++) {
          monthArray.push(i);
        }
        return monthArray;
      });
      const days = vue.computed(() => {
        const selectedYear = years.value[pickerValue.value[0]];
        const selectedMonth = months.value[pickerValue.value[1]];
        const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
        const dayArray = [];
        const startDay = selectedYear === currentDate.value.year && selectedMonth === currentDate.value.month ? currentDate.value.day : 1;
        for (let i = startDay; i <= daysInMonth; i++) {
          dayArray.push(i);
        }
        return dayArray;
      });
      const showCompletedMilestones = vue.ref(false);
      const showOverdueMilestones = vue.ref(false);
      const expandedItems = vue.ref({});
      const swipeStates = vue.ref({});
      const touchStartX = vue.ref(0);
      const touchStartY = vue.ref(0);
      const currentSwipeMilestoneId = vue.ref(null);
      const isRefreshing = vue.ref(false);
      const refresherTriggered = vue.ref(false);
      const imageLoadError = vue.ref(false);
      const currentBackgroundImage = vue.computed(() => {
        return userStore.userInfo.backgroudImg || "";
      });
      const uncompletedMilestones = vue.computed(() => {
        const today = /* @__PURE__ */ new Date();
        today.setHours(0, 0, 0, 0);
        return milestoneList.value.filter((milestone) => {
          if (milestone.isComplete)
            return false;
          if (!milestone.deadline)
            return true;
          let deadlineDate;
          if (typeof milestone.deadline === "number" || !isNaN(Number(milestone.deadline))) {
            deadlineDate = new Date(Number(milestone.deadline));
          } else {
            deadlineDate = new Date(milestone.deadline);
          }
          deadlineDate.setHours(23, 59, 59, 999);
          return deadlineDate >= today;
        }).sort((a, b) => (a.sort || 0) - (b.sort || 0));
      });
      const completedMilestones = vue.computed(() => {
        return milestoneList.value.filter((milestone) => milestone.isComplete).sort((a, b) => (a.sort || 0) - (b.sort || 0));
      });
      const overdueMilestones = vue.computed(() => {
        const today = /* @__PURE__ */ new Date();
        today.setHours(0, 0, 0, 0);
        return milestoneList.value.filter((milestone) => {
          if (milestone.isComplete)
            return false;
          if (!milestone.deadline)
            return false;
          let deadlineDate;
          if (typeof milestone.deadline === "number" || !isNaN(Number(milestone.deadline))) {
            deadlineDate = new Date(Number(milestone.deadline));
          } else {
            deadlineDate = new Date(milestone.deadline);
          }
          deadlineDate.setHours(23, 59, 59, 999);
          return deadlineDate < today;
        }).sort((a, b) => (a.sort || 0) - (b.sort || 0));
      });
      const canSubmit = vue.computed(() => {
        return newMilestone.value.title.trim() && newMilestone.value.desc.trim() && newMilestone.value.deadline && parseInt(newMilestone.value.value) >= 1 && !deadlineError.value;
      });
      const canEditSubmit = vue.computed(() => {
        return editMilestone.value.title.trim() && editMilestone.value.desc.trim() && editMilestone.value.deadline && parseInt(editMilestone.value.value) >= 1 && !editDeadlineError.value;
      });
      const goBack = () => {
        uni.navigateBack();
      };
      const handleImageError = () => {
        imageLoadError.value = true;
      };
      const handleImageLoad = () => {
        imageLoadError.value = false;
      };
      const formatDate = (dateStr) => {
        if (!dateStr)
          return "";
        let date;
        if (typeof dateStr === "number" || !isNaN(Number(dateStr))) {
          date = new Date(Number(dateStr));
        } else {
          date = new Date(dateStr);
        }
        if (isNaN(date.getTime())) {
          return dateStr;
        }
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };
      const getRemainingDays = (dateStr) => {
        if (!dateStr)
          return "";
        let deadline;
        if (typeof dateStr === "number" || !isNaN(Number(dateStr))) {
          deadline = new Date(Number(dateStr));
        } else {
          deadline = new Date(dateStr);
        }
        if (isNaN(deadline.getTime())) {
          return "";
        }
        deadline.setHours(23, 59, 59, 999);
        const now2 = /* @__PURE__ */ new Date();
        now2.setHours(0, 0, 0, 0);
        const diffTime = deadline.getTime() - now2.getTime();
        const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
        if (diffDays < 0) {
          return "已逾期" + Math.abs(diffDays) + "天";
        } else if (diffDays === 0) {
          return "今天截止";
        } else {
          return "剩余" + diffDays + "天";
        }
      };
      const getDaysOverdue = (dateStr) => {
        if (!dateStr)
          return 0;
        let deadline;
        if (typeof dateStr === "number" || !isNaN(Number(dateStr))) {
          deadline = new Date(Number(dateStr));
        } else {
          deadline = new Date(dateStr);
        }
        if (isNaN(deadline.getTime())) {
          return 0;
        }
        deadline.setHours(23, 59, 59, 999);
        const now2 = /* @__PURE__ */ new Date();
        now2.setHours(0, 0, 0, 0);
        const diffTime = now2.getTime() - deadline.getTime();
        const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : 0;
      };
      const getRemainingDaysClass = (dateStr) => {
        if (!dateStr)
          return "";
        let deadline;
        if (typeof dateStr === "number" || !isNaN(Number(dateStr))) {
          deadline = new Date(Number(dateStr));
        } else {
          deadline = new Date(dateStr);
        }
        if (isNaN(deadline.getTime())) {
          return "";
        }
        deadline.setHours(23, 59, 59, 999);
        const now2 = /* @__PURE__ */ new Date();
        now2.setHours(0, 0, 0, 0);
        const diffTime = deadline.getTime() - now2.getTime();
        const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
        if (diffDays < 0) {
          return "overdue";
        } else if (diffDays <= 7) {
          return "urgent";
        } else if (diffDays <= 30) {
          return "warning";
        } else {
          return "safe";
        }
      };
      const toggleExpand = (milestoneId, event) => {
        if (event) {
          event.stopPropagation();
        }
        expandedItems.value[milestoneId] = !expandedItems.value[milestoneId];
      };
      const toggleMilestone = async (milestoneId) => {
        const milestone = getMilestoneById(milestoneId);
        if (!milestone) {
          formatAppLog("error", "at pages/milestore/milestore.vue:799", "未找到要操作的里程碑:", milestoneId);
          return;
        }
        if (milestone.isComplete) {
          uni.showModal({
            title: "确认操作",
            content: `确定设置"${milestone.title}"为未完成吗？`,
            confirmColor: "#667eea",
            success: async (res2) => {
              if (res2.confirm) {
                await executeToggleMilestone(milestoneId);
              }
            }
          });
        } else {
          await executeToggleMilestone(milestoneId);
        }
      };
      const executeToggleMilestone = async (milestoneId) => {
        try {
          const res2 = await milestoneApi.completeMilestone(milestoneId);
          if (res2.code === 200 || res2.code === "200") {
            await fetchMilestoneList();
          } else {
            uni.showToast({
              title: res2.message || "操作失败",
              icon: "none"
            });
          }
        } catch (error) {
          formatAppLog("error", "at pages/milestore/milestore.vue:835", "切换里程碑状态失败:", error);
          uni.showToast({
            title: "操作失败",
            icon: "none"
          });
        }
      };
      const toggleCompletedMilestones = () => {
        showCompletedMilestones.value = !showCompletedMilestones.value;
      };
      const toggleOverdueMilestones = () => {
        showOverdueMilestones.value = !showOverdueMilestones.value;
      };
      const handleTouchStart = (e, milestoneId) => {
        touchStartX.value = e.touches[0].clientX;
        touchStartY.value = e.touches[0].clientY;
        currentSwipeMilestoneId.value = milestoneId;
      };
      const handleTouchMove = (e, milestoneId) => {
        if (currentSwipeMilestoneId.value !== milestoneId)
          return;
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;
        const deltaX = touchX - touchStartX.value;
        const deltaY = touchY - touchStartY.value;
        if (Math.abs(deltaY) > Math.abs(deltaX))
          return;
        if (deltaX < 0) {
          const translateX = Math.max(deltaX * 0.5, -120);
          if (!swipeStates.value[milestoneId]) {
            swipeStates.value[milestoneId] = {};
          }
          swipeStates.value[milestoneId].translateX = translateX;
          swipeStates.value[milestoneId].showDelete = translateX < -30;
        }
      };
      const handleTouchEnd = (e, milestoneId) => {
        if (currentSwipeMilestoneId.value !== milestoneId)
          return;
        const state = swipeStates.value[milestoneId];
        if (!state)
          return;
        if (state.translateX < -60) {
          confirmDelete(milestoneId);
        } else if (state.translateX < -30) {
          state.translateX = -120;
          state.showDelete = true;
        } else {
          resetSwipeState(milestoneId);
        }
        currentSwipeMilestoneId.value = null;
      };
      const resetSwipeState = (milestoneId) => {
        if (swipeStates.value[milestoneId]) {
          swipeStates.value[milestoneId].translateX = 0;
          swipeStates.value[milestoneId].showDelete = false;
        }
      };
      const resetAllSwipeStates = () => {
        Object.keys(swipeStates.value).forEach((milestoneId) => {
          resetSwipeState(milestoneId);
        });
      };
      const handleScroll = () => {
        resetAllSwipeStates();
      };
      const confirmDelete = (milestoneId) => {
        resetAllSwipeStates();
        const milestone = getMilestoneById(milestoneId);
        if (!milestone) {
          formatAppLog("error", "at pages/milestore/milestore.vue:926", "未找到要删除的里程碑:", milestoneId);
          return;
        }
        uni.showModal({
          title: "删除确认",
          content: `确定要删除"${milestone.title}"里程碑吗？`,
          confirmColor: "#f56c6c",
          success: async (res2) => {
            if (res2.confirm) {
              await executeDelete(milestoneId);
            }
          }
        });
      };
      const executeDelete = async (milestoneId) => {
        if (!milestoneId)
          return;
        uni.showLoading({
          title: "删除中..."
        });
        try {
          const res2 = await milestoneApi.deleteMilestone(milestoneId);
          uni.hideLoading();
          if (res2.code === 200 || res2.code === "200") {
            uni.showToast({
              title: "里程碑已删除",
              icon: "success"
            });
            await fetchMilestoneList();
          } else {
            uni.showToast({
              title: res2.message || "删除失败",
              icon: "none"
            });
          }
        } catch (error) {
          uni.hideLoading();
          uni.showToast({
            title: "删除失败",
            icon: "none"
          });
          formatAppLog("error", "at pages/milestore/milestore.vue:972", "删除里程碑失败:", error);
        }
      };
      const getMilestoneById = (milestoneId) => {
        return milestoneList.value.find((milestone) => milestone.id === milestoneId);
      };
      const getCurrentServerTime = async () => {
        try {
          const res2 = await utilApi.now();
          if (res2 && res2.code === 200 && res2.data) {
            const serverDate = new Date(res2.data);
            currentDate.value = {
              year: serverDate.getFullYear(),
              month: serverDate.getMonth() + 1,
              day: serverDate.getDate()
            };
          }
        } catch (error) {
          formatAppLog("error", "at pages/milestore/milestore.vue:994", "获取服务器时间失败:", error);
          const localDate = /* @__PURE__ */ new Date();
          currentDate.value = {
            year: localDate.getFullYear(),
            month: localDate.getMonth() + 1,
            day: localDate.getDate()
          };
        }
      };
      const initPickerValue = async (dateStr) => {
        await getCurrentServerTime();
        if (!dateStr) {
          const yearIndex = 0;
          const monthIndex = 0;
          const dayIndex = 0;
          pickerValue.value = [yearIndex, monthIndex, dayIndex];
          updateSelectedDate();
        } else {
          const date = new Date(dateStr);
          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          const day = date.getDate();
          const dateTime = new Date(year, month - 1, day).getTime();
          const todayTime = new Date(currentDate.value.year, currentDate.value.month - 1, currentDate.value.day).getTime();
          if (dateTime < todayTime) {
            const yearIndex = 0;
            const monthIndex = 0;
            const dayIndex = 0;
            pickerValue.value = [yearIndex, monthIndex, dayIndex];
          } else {
            const yearIndex = years.value.indexOf(year);
            if (yearIndex < 0) {
              pickerValue.value = [0, 0, 0];
            } else {
              const availableMonths = months.value;
              const monthIndex = availableMonths.indexOf(month);
              if (monthIndex < 0) {
                pickerValue.value = [yearIndex, 0, 0];
              } else {
                const availableDays = new Array(31).fill(0).map((_, i) => i + 1).filter((d) => {
                  if (year === currentDate.value.year && month === currentDate.value.month) {
                    return d >= currentDate.value.day;
                  }
                  return true;
                });
                const dayIndex = availableDays.indexOf(day);
                if (dayIndex < 0) {
                  pickerValue.value = [yearIndex, monthIndex, 0];
                } else {
                  pickerValue.value = [yearIndex, monthIndex, dayIndex];
                }
              }
            }
          }
          updateSelectedDate();
        }
      };
      const onPickerChange = (e) => {
        let [yearIndex, monthIndex, dayIndex] = e.detail.value;
        const selectedYear = years.value[yearIndex];
        const selectedMonth = months.value[monthIndex];
        if (selectedYear === currentDate.value.year && monthIndex >= months.value.length) {
          monthIndex = 0;
        }
        new Date(selectedYear, selectedMonth, 0).getDate();
        const isCurrentYearMonth = selectedYear === currentDate.value.year && selectedMonth === currentDate.value.month;
        if (isCurrentYearMonth && dayIndex >= days.value.length) {
          dayIndex = 0;
        }
        if (dayIndex >= days.value.length) {
          dayIndex = days.value.length - 1;
        }
        pickerValue.value = [yearIndex, monthIndex, dayIndex];
        updateSelectedDate();
      };
      const updateSelectedDate = () => {
        const selectedYear = years.value[pickerValue.value[0]];
        const selectedMonth = months.value[pickerValue.value[1]];
        const selectedDay = days.value[pickerValue.value[2]];
        if (selectedYear && selectedMonth && selectedDay) {
          const monthStr = String(selectedMonth).padStart(2, "0");
          const dayStr = String(selectedDay).padStart(2, "0");
          selectedDate.value = `${selectedYear}-${monthStr}-${dayStr}`;
        }
      };
      const showDatePicker = async () => {
        modalClosing.value = true;
        setTimeout(async () => {
          showModal.value = false;
          modalClosing.value = false;
          setTimeout(async () => {
            currentDateTarget.value = "new";
            const deadlineDate = newMilestone.value.deadline ? new Date(Number(newMilestone.value.deadline)) : null;
            await initPickerValue(deadlineDate);
            showDateModal.value = true;
          }, 100);
        }, 300);
      };
      const showEditDatePicker = async () => {
        editModalClosing.value = true;
        setTimeout(async () => {
          showEditModal.value = false;
          editModalClosing.value = false;
          setTimeout(async () => {
            currentDateTarget.value = "edit";
            const deadlineDate = editMilestone.value.deadline ? new Date(Number(editMilestone.value.deadline)) : null;
            await initPickerValue(deadlineDate);
            showDateModal.value = true;
          }, 100);
        }, 300);
      };
      const closeDateModal = () => {
        showDateModal.value = false;
        selectedDate.value = "";
        setTimeout(() => {
          if (currentDateTarget.value === "new") {
            showModal.value = true;
            setTimeout(() => {
              focusTitle.value = true;
            }, 300);
          } else if (currentDateTarget.value === "edit") {
            showEditModal.value = true;
            setTimeout(() => {
              focusEditTitle.value = true;
            }, 300);
          }
          currentDateTarget.value = "";
        }, 300);
      };
      const validateDate = (dateValue, isEdit = false) => {
        if (!dateValue) {
          return "请选择截止日期";
        }
        const selectedDateTime = new Date(dateValue);
        const today = new Date(currentDate.value.year, currentDate.value.month - 1, currentDate.value.day);
        today.setHours(0, 0, 0, 0);
        if (selectedDateTime < today) {
          return "截止日期不能小于当前时间";
        }
        return "";
      };
      const confirmDate = () => {
        if (!selectedDate.value) {
          uni.showToast({
            title: "请选择日期",
            icon: "none"
          });
          return;
        }
        const error = validateDate(selectedDate.value, currentDateTarget.value === "edit");
        if (error) {
          uni.showToast({
            title: error,
            icon: "none"
          });
          return;
        }
        if (currentDateTarget.value === "new") {
          newMilestone.value.deadline = selectedDate.value;
          deadlineError.value = "";
        } else if (currentDateTarget.value === "edit") {
          editMilestone.value.deadline = selectedDate.value;
          editDeadlineError.value = "";
        }
        closeDateModal();
        setTimeout(() => {
          if (currentDateTarget.value === "new") {
            showModal.value = true;
            setTimeout(() => {
              focusTitle.value = true;
            }, 300);
          } else if (currentDateTarget.value === "edit") {
            showEditModal.value = true;
            setTimeout(() => {
              focusEditTitle.value = true;
            }, 300);
          }
        }, 300);
      };
      const showAddMilestoneModal = () => {
        showModal.value = true;
        setTimeout(() => {
          focusTitle.value = true;
        }, 300);
      };
      const closeAddMilestoneModal = () => {
        modalClosing.value = true;
        focusTitle.value = false;
        setTimeout(() => {
          showModal.value = false;
          modalClosing.value = false;
          newMilestone.value = {
            title: "",
            type: 1,
            // 默认为短期
            value: "1",
            desc: "",
            deadline: ""
          };
          deadlineError.value = "";
        }, 300);
      };
      const validateNumber = (e) => {
        let value = e.detail.value || e.target.value;
        value = value.replace(/[^\d]/g, "");
        if (value && parseInt(value) < 1) {
          value = "1";
        }
        if (!value) {
          value = "1";
        }
        newMilestone.value.value = value;
      };
      const increaseValue = () => {
        const currentValue = parseInt(newMilestone.value.value) || 1;
        newMilestone.value.value = (currentValue + 1).toString();
      };
      const decreaseValue = () => {
        const currentValue = parseInt(newMilestone.value.value) || 1;
        if (currentValue > 1) {
          newMilestone.value.value = (currentValue - 1).toString();
        }
      };
      const addMilestone2 = async () => {
        if (!canSubmit.value)
          return;
        const dateError = validateDate(newMilestone.value.deadline);
        if (dateError) {
          deadlineError.value = dateError;
          uni.showToast({
            title: dateError,
            icon: "none"
          });
          return;
        }
        uni.showLoading({
          title: "添加中..."
        });
        try {
          const reqData = {
            title: newMilestone.value.title.trim(),
            type: newMilestone.value.type,
            value: parseInt(newMilestone.value.value) || 1,
            desc: newMilestone.value.desc.trim(),
            deadline: newMilestone.value.deadline
          };
          const res2 = await milestoneApi.addMilestone(reqData);
          uni.hideLoading();
          if (res2.code === 200 || res2.code === "200") {
            closeAddMilestoneModal();
            uni.showToast({
              title: "里程碑添加成功",
              icon: "success"
            });
            fetchMilestoneList();
          } else {
            uni.showToast({
              title: res2.message || "添加失败",
              icon: "none"
            });
          }
        } catch (error) {
          uni.hideLoading();
          uni.showToast({
            title: "添加失败",
            icon: "none"
          });
          formatAppLog("error", "at pages/milestore/milestore.vue:1354", "添加里程碑失败:", error);
        }
      };
      const editMilestoneItem = (milestone, event) => {
        if (event) {
          event.stopPropagation();
        }
        if (milestone.isComplete) {
          return;
        }
        editMilestone.value = {
          id: milestone.id,
          title: milestone.title,
          type: milestone.type,
          value: milestone.value ? milestone.value.toString() : "1",
          desc: milestone.desc,
          deadline: milestone.deadline || ""
        };
        formatAppLog("log", "at pages/milestore/milestore.vue:1378", "编辑里程碑日期:", milestone.deadline, formatDate(milestone.deadline));
        editDeadlineError.value = "";
        showEditModal.value = true;
        setTimeout(() => {
          focusEditTitle.value = true;
        }, 300);
      };
      const closeEditMilestoneModal = () => {
        editModalClosing.value = true;
        focusEditTitle.value = false;
        setTimeout(() => {
          showEditModal.value = false;
          editModalClosing.value = false;
          editMilestone.value = {
            id: null,
            title: "",
            type: 1,
            value: "1",
            desc: "",
            deadline: ""
          };
          editDeadlineError.value = "";
        }, 300);
      };
      const validateEditNumber = (e) => {
        let value = e.detail.value || e.target.value;
        value = value.replace(/[^\d]/g, "");
        if (value && parseInt(value) < 1) {
          value = "1";
        }
        if (!value) {
          value = "1";
        }
        editMilestone.value.value = value;
      };
      const increaseEditValue = () => {
        const currentValue = parseInt(editMilestone.value.value) || 1;
        editMilestone.value.value = (currentValue + 1).toString();
      };
      const decreaseEditValue = () => {
        const currentValue = parseInt(editMilestone.value.value) || 1;
        if (currentValue > 1) {
          editMilestone.value.value = (currentValue - 1).toString();
        }
      };
      const updateMilestone2 = async () => {
        if (!canEditSubmit.value)
          return;
        const dateError = validateDate(editMilestone.value.deadline, true);
        if (dateError) {
          editDeadlineError.value = dateError;
          uni.showToast({
            title: dateError,
            icon: "none"
          });
          return;
        }
        uni.showLoading({
          title: "修改中..."
        });
        try {
          const reqData = {
            id: editMilestone.value.id,
            title: editMilestone.value.title.trim(),
            type: editMilestone.value.type,
            value: parseInt(editMilestone.value.value) || 1,
            desc: editMilestone.value.desc.trim(),
            deadline: editMilestone.value.deadline
          };
          const res2 = await milestoneApi.updateMilestone(reqData);
          uni.hideLoading();
          if (res2.code === 200 || res2.code === "200") {
            closeEditMilestoneModal();
            uni.showToast({
              title: "里程碑修改成功",
              icon: "success"
            });
            fetchMilestoneList();
          } else {
            uni.showToast({
              title: res2.message || "修改失败",
              icon: "none"
            });
          }
        } catch (error) {
          uni.hideLoading();
          uni.showToast({
            title: "修改失败",
            icon: "none"
          });
          formatAppLog("error", "at pages/milestore/milestore.vue:1481", "修改里程碑失败:", error);
        }
      };
      const handleRefresherPulling = (e) => {
      };
      const handleRefresherRefresh = async () => {
        refresherTriggered.value = true;
        isRefreshing.value = true;
        try {
          await fetchMilestoneList();
          uni.showToast({
            title: "刷新成功",
            icon: "success",
            duration: 1500
          });
        } catch (error) {
          formatAppLog("error", "at pages/milestore/milestore.vue:1502", "刷新失败:", error);
          uni.showToast({
            title: "刷新失败，请重试",
            icon: "none",
            duration: 2e3
          });
        } finally {
          setTimeout(() => {
            refresherTriggered.value = false;
            isRefreshing.value = false;
          }, 800);
        }
      };
      const handleRefresherRestore = () => {
        refresherTriggered.value = false;
        isRefreshing.value = false;
      };
      const fetchMilestoneList = async () => {
        try {
          const res2 = await milestoneApi.queryList();
          if (res2 && res2.code === "200" && res2.data) {
            milestoneList.value = res2.data;
          }
        } catch (error) {
          formatAppLog("error", "at pages/milestore/milestore.vue:1530", "获取里程碑列表失败:", error);
          uni.showToast({
            title: "获取里程碑列表失败",
            icon: "none"
          });
        }
      };
      vue.onMounted(() => {
        fetchMilestoneList();
      });
      onShow(() => {
        fetchMilestoneList();
      });
      const __returned__ = { userStore, milestoneList, newMilestone, showModal, modalClosing, focusTitle, showEditModal, editModalClosing, focusEditTitle, editMilestone, showDateModal, selectedDate, currentDateTarget, deadlineError, editDeadlineError, currentDate, todayDate, pickerValue, indicatorStyle, maskStyle, years, months, days, showCompletedMilestones, showOverdueMilestones, expandedItems, swipeStates, touchStartX, touchStartY, currentSwipeMilestoneId, isRefreshing, refresherTriggered, imageLoadError, currentBackgroundImage, uncompletedMilestones, completedMilestones, overdueMilestones, canSubmit, canEditSubmit, goBack, handleImageError, handleImageLoad, formatDate, getRemainingDays, getDaysOverdue, getRemainingDaysClass, toggleExpand, toggleMilestone, executeToggleMilestone, toggleCompletedMilestones, toggleOverdueMilestones, handleTouchStart, handleTouchMove, handleTouchEnd, resetSwipeState, resetAllSwipeStates, handleScroll, confirmDelete, executeDelete, getMilestoneById, getCurrentServerTime, initPickerValue, onPickerChange, updateSelectedDate, showDatePicker, showEditDatePicker, closeDateModal, validateDate, confirmDate, showAddMilestoneModal, closeAddMilestoneModal, validateNumber, increaseValue, decreaseValue, addMilestone: addMilestone2, editMilestoneItem, closeEditMilestoneModal, validateEditNumber, increaseEditValue, decreaseEditValue, updateMilestone: updateMilestone2, handleRefresherPulling, handleRefresherRefresh, handleRefresherRestore, fetchMilestoneList, ref: vue.ref, computed: vue.computed, onMounted: vue.onMounted, get onShow() {
        return onShow;
      }, get milestoneApi() {
        return milestoneApi;
      }, get useUserStore() {
        return useUserStore;
      }, get utilApi() {
        return utilApi;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0);
    const _component_uni_card = resolveEasycom(vue.resolveDynamicComponent("uni-card"), __easycom_1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "milestore-container" }, [
      vue.createCommentVNode(" 背景图片 "),
      $setup.currentBackgroundImage ? (vue.openBlock(), vue.createElementBlock("image", {
        key: 0,
        src: $setup.currentBackgroundImage,
        class: "background-image",
        mode: "aspectFill",
        onError: $setup.handleImageError,
        onLoad: $setup.handleImageLoad
      }, null, 40, ["src"])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 顶部导航 "),
      vue.createElementVNode("view", { class: "nav-header" }, [
        vue.createElementVNode("view", { class: "nav-left" }, [
          vue.createElementVNode("view", {
            class: "back-button",
            onClick: $setup.goBack
          }, [
            vue.createVNode(_component_uni_icons, {
              type: "back",
              size: "24",
              color: "#fff"
            })
          ])
        ]),
        vue.createElementVNode("view", { class: "nav-center" }, [
          vue.createElementVNode("text", { class: "nav-title" }, "里程碑")
        ]),
        vue.createElementVNode("view", { class: "nav-right" })
      ]),
      vue.createCommentVNode(" 里程碑列表 "),
      vue.createElementVNode("scroll-view", {
        class: "milestone-list",
        "scroll-y": "true",
        onScroll: $setup.handleScroll,
        "refresher-enabled": "true",
        "refresher-background": "transparent",
        "refresher-triggered": $setup.refresherTriggered,
        onRefresherpulling: $setup.handleRefresherPulling,
        onRefresherrefresh: $setup.handleRefresherRefresh,
        onRefresherrestore: $setup.handleRefresherRestore,
        style: { "top": "160rpx" }
      }, [
        vue.createCommentVNode(" 未完成的里程碑 "),
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.uncompletedMilestones, (milestone, index) => {
            return vue.openBlock(), vue.createBlock(
              _component_uni_card,
              {
                key: milestone.id,
                "is-shadow": false,
                border: false,
                margin: "8rpx 20rpx",
                class: "milestone-card milestone-swipe-container"
              },
              {
                default: vue.withCtx(() => {
                  var _a2, _b;
                  return [
                    vue.createElementVNode("view", { class: "milestone-swipe-wrapper" }, [
                      vue.createElementVNode("view", {
                        class: "milestone-item",
                        style: vue.normalizeStyle({ transform: `translateX(${((_a2 = $setup.swipeStates[milestone.id]) == null ? void 0 : _a2.translateX) || 0}rpx)` }),
                        onTouchstart: ($event) => $setup.handleTouchStart($event, milestone.id),
                        onTouchmove: ($event) => $setup.handleTouchMove($event, milestone.id),
                        onTouchend: ($event) => $setup.handleTouchEnd($event, milestone.id)
                      }, [
                        vue.createElementVNode("view", {
                          class: "milestone-checkbox",
                          onClick: ($event) => $setup.toggleMilestone(milestone.id)
                        }, [
                          vue.createVNode(_component_uni_icons, {
                            type: "checkbox",
                            size: 24,
                            color: "#C7C7CC"
                          })
                        ], 8, ["onClick"]),
                        vue.createElementVNode("view", {
                          class: "milestone-content",
                          onClick: ($event) => $setup.toggleExpand(milestone.id, $event)
                        }, [
                          vue.createElementVNode("view", { class: "milestone-header" }, [
                            vue.createElementVNode(
                              "text",
                              { class: "milestone-title" },
                              vue.toDisplayString(milestone.title),
                              1
                              /* TEXT */
                            )
                          ]),
                          vue.createElementVNode("view", { class: "milestone-info" }, [
                            milestone.value && milestone.value >= 1 ? (vue.openBlock(), vue.createElementBlock("view", {
                              key: 0,
                              class: "milestone-value"
                            }, [
                              vue.createVNode(_component_uni_icons, {
                                type: "wallet",
                                size: "14",
                                color: "#666"
                              }),
                              vue.createElementVNode(
                                "text",
                                { class: "value-text" },
                                vue.toDisplayString(milestone.value),
                                1
                                /* TEXT */
                              )
                            ])) : vue.createCommentVNode("v-if", true),
                            milestone.deadline ? (vue.openBlock(), vue.createElementBlock("view", {
                              key: 1,
                              class: "milestone-deadline"
                            }, [
                              vue.createVNode(_component_uni_icons, {
                                type: "calendar",
                                size: "14",
                                color: "#666"
                              }),
                              vue.createElementVNode(
                                "text",
                                { class: "deadline-text" },
                                vue.toDisplayString($setup.formatDate(milestone.deadline)),
                                1
                                /* TEXT */
                              ),
                              milestone.isComplete && milestone.completeTime ? (vue.openBlock(), vue.createElementBlock("text", {
                                key: 0,
                                class: "complete-time-text"
                              }, [
                                vue.createElementVNode("text", { class: "icon-space" }, [
                                  vue.createVNode(_component_uni_icons, {
                                    type: "checkmarkempty",
                                    size: "14",
                                    color: "#4CD964"
                                  })
                                ]),
                                vue.createTextVNode(
                                  " " + vue.toDisplayString($setup.formatDate(milestone.completeTime)),
                                  1
                                  /* TEXT */
                                )
                              ])) : vue.createCommentVNode("v-if", true),
                              !milestone.isComplete ? (vue.openBlock(), vue.createElementBlock(
                                "text",
                                {
                                  key: 1,
                                  class: vue.normalizeClass(["remaining-days", $setup.getRemainingDaysClass(milestone.deadline)])
                                },
                                " (" + vue.toDisplayString($setup.getRemainingDays(milestone.deadline)) + ") ",
                                3
                                /* TEXT, CLASS */
                              )) : vue.createCommentVNode("v-if", true)
                            ])) : vue.createCommentVNode("v-if", true)
                          ]),
                          vue.createCommentVNode(" 展开的详细描述 "),
                          $setup.expandedItems[milestone.id] ? (vue.openBlock(), vue.createElementBlock(
                            "view",
                            {
                              key: 0,
                              class: vue.normalizeClass(["milestone-description", { "expanded": $setup.expandedItems[milestone.id] }])
                            },
                            [
                              vue.createElementVNode(
                                "text",
                                { class: "description-text" },
                                vue.toDisplayString(milestone.desc),
                                1
                                /* TEXT */
                              )
                            ],
                            2
                            /* CLASS */
                          )) : vue.createCommentVNode("v-if", true)
                        ], 8, ["onClick"]),
                        vue.createElementVNode("view", { class: "milestone-actions" }, [
                          vue.createVNode(_component_uni_icons, {
                            type: "compose",
                            size: 24,
                            color: "#667eea",
                            onClick: ($event) => $setup.editMilestoneItem(milestone, $event)
                          }, null, 8, ["onClick"])
                        ])
                      ], 44, ["onTouchstart", "onTouchmove", "onTouchend"]),
                      ((_b = $setup.swipeStates[milestone.id]) == null ? void 0 : _b.showDelete) ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 0,
                        class: "delete-action",
                        onClick: ($event) => $setup.confirmDelete(milestone.id)
                      }, [
                        vue.createVNode(_component_uni_icons, {
                          type: "trash",
                          size: "24",
                          color: "#fff"
                        })
                      ], 8, ["onClick"])) : vue.createCommentVNode("v-if", true)
                    ])
                  ];
                }),
                _: 2
                /* DYNAMIC */
              },
              1024
              /* DYNAMIC_SLOTS */
            );
          }),
          128
          /* KEYED_FRAGMENT */
        )),
        vue.createCommentVNode(" 已完成分组标题 "),
        $setup.completedMilestones.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "section-title",
          onClick: $setup.toggleCompletedMilestones
        }, [
          vue.createVNode(_component_uni_icons, {
            type: $setup.showCompletedMilestones ? "down" : "right",
            size: "16",
            color: "rgba(255, 255, 255, 0.7)"
          }, null, 8, ["type"]),
          vue.createElementVNode("text", { class: "section-text" }, "已完成")
        ])) : vue.createCommentVNode("v-if", true),
        vue.createCommentVNode(" 已完成的里程碑 "),
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["completed-milestones-container", { "collapsed": !$setup.showCompletedMilestones }])
          },
          [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.completedMilestones, (milestone, index) => {
                return vue.openBlock(), vue.createBlock(
                  _component_uni_card,
                  {
                    key: milestone.id,
                    "is-shadow": false,
                    border: false,
                    margin: "8rpx 20rpx",
                    class: "milestone-card milestone-swipe-container"
                  },
                  {
                    default: vue.withCtx(() => {
                      var _a2, _b;
                      return [
                        vue.createElementVNode("view", { class: "milestone-swipe-wrapper" }, [
                          vue.createElementVNode("view", {
                            class: "milestone-item",
                            style: vue.normalizeStyle({ transform: `translateX(${((_a2 = $setup.swipeStates[milestone.id]) == null ? void 0 : _a2.translateX) || 0}rpx)` }),
                            onTouchstart: ($event) => $setup.handleTouchStart($event, milestone.id),
                            onTouchmove: ($event) => $setup.handleTouchMove($event, milestone.id),
                            onTouchend: ($event) => $setup.handleTouchEnd($event, milestone.id)
                          }, [
                            vue.createElementVNode("view", {
                              class: "milestone-checkbox",
                              onClick: ($event) => $setup.toggleMilestone(milestone.id)
                            }, [
                              vue.createVNode(_component_uni_icons, {
                                type: "checkbox",
                                size: 24,
                                color: "#4CD964"
                              })
                            ], 8, ["onClick"]),
                            vue.createElementVNode("view", {
                              class: "milestone-content completed-milestone",
                              onClick: ($event) => $setup.toggleExpand(milestone.id, $event)
                            }, [
                              vue.createElementVNode("view", { class: "milestone-header" }, [
                                vue.createElementVNode(
                                  "text",
                                  { class: "milestone-title completed" },
                                  vue.toDisplayString(milestone.title),
                                  1
                                  /* TEXT */
                                )
                              ]),
                              vue.createElementVNode("view", { class: "milestone-info" }, [
                                milestone.value && milestone.value >= 1 ? (vue.openBlock(), vue.createElementBlock("view", {
                                  key: 0,
                                  class: "milestone-value"
                                }, [
                                  vue.createVNode(_component_uni_icons, {
                                    type: "wallet",
                                    size: "14",
                                    color: "#666"
                                  }),
                                  vue.createElementVNode(
                                    "text",
                                    { class: "value-text" },
                                    vue.toDisplayString(milestone.value),
                                    1
                                    /* TEXT */
                                  )
                                ])) : vue.createCommentVNode("v-if", true),
                                milestone.deadline ? (vue.openBlock(), vue.createElementBlock("view", {
                                  key: 1,
                                  class: "milestone-deadline"
                                }, [
                                  vue.createVNode(_component_uni_icons, {
                                    type: "calendar",
                                    size: "14",
                                    color: "#666"
                                  }),
                                  vue.createElementVNode(
                                    "text",
                                    { class: "deadline-text" },
                                    vue.toDisplayString($setup.formatDate(milestone.deadline)),
                                    1
                                    /* TEXT */
                                  ),
                                  milestone.completeTime ? (vue.openBlock(), vue.createElementBlock("text", {
                                    key: 0,
                                    class: "complete-time-text"
                                  }, [
                                    vue.createElementVNode("text", { class: "icon-space" }, [
                                      vue.createVNode(_component_uni_icons, {
                                        type: "checkmarkempty",
                                        size: "14",
                                        color: "#4CD964"
                                      })
                                    ]),
                                    vue.createTextVNode(
                                      " " + vue.toDisplayString($setup.formatDate(milestone.completeTime)),
                                      1
                                      /* TEXT */
                                    )
                                  ])) : vue.createCommentVNode("v-if", true)
                                ])) : vue.createCommentVNode("v-if", true)
                              ]),
                              vue.createCommentVNode(" 展开的详细描述 "),
                              $setup.expandedItems[milestone.id] ? (vue.openBlock(), vue.createElementBlock(
                                "view",
                                {
                                  key: 0,
                                  class: vue.normalizeClass(["milestone-description", { "expanded": $setup.expandedItems[milestone.id] }])
                                },
                                [
                                  vue.createElementVNode(
                                    "text",
                                    { class: "description-text" },
                                    vue.toDisplayString(milestone.desc),
                                    1
                                    /* TEXT */
                                  )
                                ],
                                2
                                /* CLASS */
                              )) : vue.createCommentVNode("v-if", true)
                            ], 8, ["onClick"]),
                            vue.createCommentVNode(" 已完成的里程碑不显示编辑按钮 "),
                            vue.createCommentVNode("v-if", true)
                          ], 44, ["onTouchstart", "onTouchmove", "onTouchend"]),
                          ((_b = $setup.swipeStates[milestone.id]) == null ? void 0 : _b.showDelete) ? (vue.openBlock(), vue.createElementBlock("view", {
                            key: 0,
                            class: "delete-action",
                            onClick: ($event) => $setup.confirmDelete(milestone.id)
                          }, [
                            vue.createVNode(_component_uni_icons, {
                              type: "trash",
                              size: "24",
                              color: "#fff"
                            })
                          ], 8, ["onClick"])) : vue.createCommentVNode("v-if", true)
                        ])
                      ];
                    }),
                    _: 2
                    /* DYNAMIC */
                  },
                  1024
                  /* DYNAMIC_SLOTS */
                );
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ],
          2
          /* CLASS */
        ),
        vue.createCommentVNode(" 已逾期分组标题 "),
        $setup.overdueMilestones.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: "section-title",
          onClick: $setup.toggleOverdueMilestones
        }, [
          vue.createVNode(_component_uni_icons, {
            type: $setup.showOverdueMilestones ? "down" : "right",
            size: "16",
            color: "rgba(255, 255, 255, 0.7)"
          }, null, 8, ["type"]),
          vue.createElementVNode("text", { class: "section-text" }, "已逾期")
        ])) : vue.createCommentVNode("v-if", true),
        vue.createCommentVNode(" 已逾期的里程碑 "),
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["overdue-milestones-container", { "collapsed": !$setup.showOverdueMilestones }])
          },
          [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.overdueMilestones, (milestone, index) => {
                return vue.openBlock(), vue.createBlock(
                  _component_uni_card,
                  {
                    key: milestone.id,
                    "is-shadow": false,
                    border: false,
                    margin: "8rpx 20rpx",
                    class: "milestone-card milestone-swipe-container"
                  },
                  {
                    default: vue.withCtx(() => {
                      var _a2, _b;
                      return [
                        vue.createElementVNode("view", { class: "milestone-swipe-wrapper" }, [
                          vue.createElementVNode("view", {
                            class: "milestone-item overdue-item",
                            style: vue.normalizeStyle({ transform: `translateX(${((_a2 = $setup.swipeStates[milestone.id]) == null ? void 0 : _a2.translateX) || 0}rpx)` }),
                            onTouchstart: ($event) => $setup.handleTouchStart($event, milestone.id),
                            onTouchmove: ($event) => $setup.handleTouchMove($event, milestone.id),
                            onTouchend: ($event) => $setup.handleTouchEnd($event, milestone.id)
                          }, [
                            vue.createElementVNode("view", { class: "milestone-checkbox disabled" }, [
                              vue.createVNode(_component_uni_icons, {
                                type: "circle",
                                size: 24,
                                color: "#FF3B30"
                              })
                            ]),
                            vue.createElementVNode("view", {
                              class: "milestone-content overdue-milestone",
                              onClick: ($event) => $setup.toggleExpand(milestone.id, $event)
                            }, [
                              vue.createElementVNode("view", { class: "milestone-header" }, [
                                vue.createElementVNode(
                                  "text",
                                  { class: "milestone-title overdue" },
                                  vue.toDisplayString(milestone.title),
                                  1
                                  /* TEXT */
                                )
                              ]),
                              vue.createElementVNode("view", { class: "milestone-info" }, [
                                milestone.value && milestone.value >= 1 ? (vue.openBlock(), vue.createElementBlock("view", {
                                  key: 0,
                                  class: "milestone-value"
                                }, [
                                  vue.createVNode(_component_uni_icons, {
                                    type: "wallet",
                                    size: "14",
                                    color: "#666"
                                  }),
                                  vue.createElementVNode(
                                    "text",
                                    { class: "value-text" },
                                    vue.toDisplayString(milestone.value),
                                    1
                                    /* TEXT */
                                  )
                                ])) : vue.createCommentVNode("v-if", true),
                                milestone.deadline ? (vue.openBlock(), vue.createElementBlock("view", {
                                  key: 1,
                                  class: "milestone-deadline"
                                }, [
                                  vue.createVNode(_component_uni_icons, {
                                    type: "calendar",
                                    size: "14",
                                    color: "#666"
                                  }),
                                  vue.createElementVNode(
                                    "text",
                                    { class: "deadline-text" },
                                    vue.toDisplayString($setup.formatDate(milestone.deadline)),
                                    1
                                    /* TEXT */
                                  ),
                                  vue.createElementVNode("text", { class: "overdue-text" }, [
                                    vue.createElementVNode("text", { class: "icon-space" }, [
                                      vue.createVNode(_component_uni_icons, {
                                        type: "closeempty",
                                        size: "14",
                                        color: "#FF3B30"
                                      })
                                    ])
                                  ])
                                ])) : vue.createCommentVNode("v-if", true)
                              ]),
                              vue.createCommentVNode(" 展开的详细描述 "),
                              $setup.expandedItems[milestone.id] ? (vue.openBlock(), vue.createElementBlock(
                                "view",
                                {
                                  key: 0,
                                  class: vue.normalizeClass(["milestone-description", { "expanded": $setup.expandedItems[milestone.id] }])
                                },
                                [
                                  vue.createElementVNode(
                                    "text",
                                    { class: "description-text" },
                                    vue.toDisplayString(milestone.desc),
                                    1
                                    /* TEXT */
                                  )
                                ],
                                2
                                /* CLASS */
                              )) : vue.createCommentVNode("v-if", true)
                            ], 8, ["onClick"]),
                            vue.createCommentVNode(" 已逾期的里程碑不显示编辑按钮 "),
                            vue.createCommentVNode("v-if", true)
                          ], 44, ["onTouchstart", "onTouchmove", "onTouchend"]),
                          ((_b = $setup.swipeStates[milestone.id]) == null ? void 0 : _b.showDelete) ? (vue.openBlock(), vue.createElementBlock("view", {
                            key: 0,
                            class: "delete-action",
                            onClick: ($event) => $setup.confirmDelete(milestone.id)
                          }, [
                            vue.createVNode(_component_uni_icons, {
                              type: "trash",
                              size: "24",
                              color: "#fff"
                            })
                          ], 8, ["onClick"])) : vue.createCommentVNode("v-if", true)
                        ])
                      ];
                    }),
                    _: 2
                    /* DYNAMIC */
                  },
                  1024
                  /* DYNAMIC_SLOTS */
                );
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ],
          2
          /* CLASS */
        )
      ], 40, ["refresher-triggered"]),
      vue.createCommentVNode(" 添加里程碑按钮 "),
      vue.createElementVNode("view", { class: "add-milestone-container" }, [
        vue.createElementVNode("view", {
          class: "add-milestone-btn",
          onClick: $setup.showAddMilestoneModal
        }, [
          vue.createVNode(_component_uni_icons, {
            type: "plus",
            size: "20",
            color: "#fff"
          }),
          vue.createElementVNode("text", { class: "add-btn-text" }, "新建里程碑")
        ])
      ]),
      vue.createCommentVNode(" 添加里程碑弹窗 "),
      $setup.showModal ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "modal-overlay",
        onClick: $setup.closeAddMilestoneModal
      }, [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["modal-content", { "closing": $setup.modalClosing }]),
            onClick: _cache[4] || (_cache[4] = vue.withModifiers(() => {
            }, ["stop"]))
          },
          [
            vue.createElementVNode("view", { class: "popup-header" }, [
              vue.createElementVNode("text", { class: "popup-title" }, "新建里程碑"),
              vue.createElementVNode("view", {
                class: "popup-close",
                onClick: $setup.closeAddMilestoneModal
              }, [
                vue.createVNode(_component_uni_icons, {
                  type: "close",
                  size: "20",
                  color: "#666"
                })
              ])
            ]),
            vue.createElementVNode("view", { class: "input-group" }, [
              vue.createElementVNode("view", { class: "input-label" }, "标题"),
              vue.withDirectives(vue.createElementVNode("input", {
                class: "milestone-input",
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.newMilestone.title = $event),
                placeholder: "请输入里程碑标题...",
                maxlength: "50",
                focus: $setup.focusTitle,
                onBlur: _cache[1] || (_cache[1] = ($event) => $setup.focusTitle = false)
              }, null, 40, ["focus"]), [
                [vue.vModelText, $setup.newMilestone.title]
              ])
            ]),
            vue.createElementVNode("view", { class: "input-group" }, [
              vue.createElementVNode("view", { class: "input-label" }, "价值"),
              vue.createElementVNode("view", { class: "number-input-container" }, [
                vue.withDirectives(vue.createElementVNode(
                  "input",
                  {
                    class: "milestone-input number-input",
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.newMilestone.value = $event),
                    type: "number",
                    placeholder: "最小值为1",
                    onInput: $setup.validateNumber
                  },
                  null,
                  544
                  /* NEED_HYDRATION, NEED_PATCH */
                ), [
                  [vue.vModelText, $setup.newMilestone.value]
                ]),
                vue.createElementVNode("view", { class: "number-controls" }, [
                  vue.createElementVNode("view", {
                    class: "control-btn increase-btn",
                    onClick: $setup.increaseValue
                  }, [
                    vue.createVNode(_component_uni_icons, {
                      type: "plus",
                      size: "20",
                      color: "#fff"
                    })
                  ]),
                  vue.createElementVNode("view", {
                    class: "control-btn decrease-btn",
                    onClick: $setup.decreaseValue
                  }, [
                    vue.createVNode(_component_uni_icons, {
                      type: "minus",
                      size: "20",
                      color: "#fff"
                    })
                  ])
                ])
              ])
            ]),
            vue.createElementVNode("view", { class: "input-group" }, [
              vue.createElementVNode("view", { class: "input-label" }, "截止日期"),
              vue.createElementVNode("view", {
                class: "date-picker-container",
                onClick: $setup.showDatePicker
              }, [
                vue.createElementVNode("view", { class: "date-picker-display" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "date-text" },
                    vue.toDisplayString($setup.newMilestone.deadline ? $setup.formatDate($setup.newMilestone.deadline) : "请选择截止日期"),
                    1
                    /* TEXT */
                  ),
                  vue.createVNode(_component_uni_icons, {
                    type: "calendar",
                    size: "20",
                    color: "#999"
                  })
                ])
              ]),
              vue.createCommentVNode(" 截止日期错误提示 "),
              $setup.deadlineError ? (vue.openBlock(), vue.createElementBlock(
                "view",
                {
                  key: 0,
                  class: vue.normalizeClass(["error-tip", { "show": $setup.deadlineError }])
                },
                [
                  vue.createElementVNode(
                    "text",
                    { class: "error-text" },
                    vue.toDisplayString($setup.deadlineError),
                    1
                    /* TEXT */
                  )
                ],
                2
                /* CLASS */
              )) : vue.createCommentVNode("v-if", true)
            ]),
            vue.createElementVNode("view", { class: "input-group" }, [
              vue.createElementVNode("view", { class: "input-label" }, "详细描述"),
              vue.withDirectives(vue.createElementVNode(
                "textarea",
                {
                  class: "milestone-textarea",
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.newMilestone.desc = $event),
                  placeholder: "请输入详细描述...",
                  maxlength: "500",
                  "auto-height": true
                },
                null,
                512
                /* NEED_PATCH */
              ), [
                [vue.vModelText, $setup.newMilestone.desc]
              ])
            ]),
            vue.createElementVNode("view", { class: "popup-actions" }, [
              vue.createElementVNode("button", {
                class: "cancel-btn",
                onClick: $setup.closeAddMilestoneModal
              }, "取消"),
              vue.createElementVNode("button", {
                class: "confirm-btn",
                onClick: $setup.addMilestone,
                disabled: !$setup.canSubmit
              }, "确认添加", 8, ["disabled"])
            ])
          ],
          2
          /* CLASS */
        )
      ])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 修改里程碑弹窗 "),
      $setup.showEditModal ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 2,
        class: "modal-overlay",
        onClick: $setup.closeEditMilestoneModal
      }, [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["modal-content", { "closing": $setup.editModalClosing }]),
            onClick: _cache[9] || (_cache[9] = vue.withModifiers(() => {
            }, ["stop"]))
          },
          [
            vue.createElementVNode("view", { class: "popup-header" }, [
              vue.createElementVNode("text", { class: "popup-title" }, "修改里程碑"),
              vue.createElementVNode("view", {
                class: "popup-close",
                onClick: $setup.closeEditMilestoneModal
              }, [
                vue.createVNode(_component_uni_icons, {
                  type: "close",
                  size: "20",
                  color: "#666"
                })
              ])
            ]),
            vue.createElementVNode("view", { class: "input-group" }, [
              vue.createElementVNode("view", { class: "input-label" }, "标题"),
              vue.withDirectives(vue.createElementVNode("input", {
                class: "milestone-input",
                "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $setup.editMilestone.title = $event),
                placeholder: "请输入里程碑标题...",
                maxlength: "50",
                focus: $setup.focusEditTitle,
                onBlur: _cache[6] || (_cache[6] = ($event) => $setup.focusEditTitle = false)
              }, null, 40, ["focus"]), [
                [vue.vModelText, $setup.editMilestone.title]
              ])
            ]),
            vue.createElementVNode("view", { class: "input-group" }, [
              vue.createElementVNode("view", { class: "input-label" }, "价值"),
              vue.createElementVNode("view", { class: "number-input-container" }, [
                vue.withDirectives(vue.createElementVNode(
                  "input",
                  {
                    class: "milestone-input number-input",
                    "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $setup.editMilestone.value = $event),
                    type: "number",
                    placeholder: "最小值为1",
                    onInput: $setup.validateEditNumber
                  },
                  null,
                  544
                  /* NEED_HYDRATION, NEED_PATCH */
                ), [
                  [vue.vModelText, $setup.editMilestone.value]
                ]),
                vue.createElementVNode("view", { class: "number-controls" }, [
                  vue.createElementVNode("view", {
                    class: "control-btn increase-btn",
                    onClick: $setup.increaseEditValue
                  }, [
                    vue.createVNode(_component_uni_icons, {
                      type: "plus",
                      size: "20",
                      color: "#fff"
                    })
                  ]),
                  vue.createElementVNode("view", {
                    class: "control-btn decrease-btn",
                    onClick: $setup.decreaseEditValue
                  }, [
                    vue.createVNode(_component_uni_icons, {
                      type: "minus",
                      size: "20",
                      color: "#fff"
                    })
                  ])
                ])
              ])
            ]),
            vue.createElementVNode("view", { class: "input-group" }, [
              vue.createElementVNode("view", { class: "input-label" }, "截止日期"),
              vue.createElementVNode("view", {
                class: "date-picker-container",
                onClick: $setup.showEditDatePicker
              }, [
                vue.createElementVNode("view", { class: "date-picker-display" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "date-text" },
                    vue.toDisplayString($setup.editMilestone.deadline ? $setup.formatDate($setup.editMilestone.deadline) : "请选择截止日期"),
                    1
                    /* TEXT */
                  ),
                  vue.createVNode(_component_uni_icons, {
                    type: "calendar",
                    size: "20",
                    color: "#999"
                  })
                ])
              ]),
              vue.createCommentVNode(" 截止日期错误提示 "),
              $setup.editDeadlineError ? (vue.openBlock(), vue.createElementBlock(
                "view",
                {
                  key: 0,
                  class: vue.normalizeClass(["error-tip", { "show": $setup.editDeadlineError }])
                },
                [
                  vue.createElementVNode(
                    "text",
                    { class: "error-text" },
                    vue.toDisplayString($setup.editDeadlineError),
                    1
                    /* TEXT */
                  )
                ],
                2
                /* CLASS */
              )) : vue.createCommentVNode("v-if", true)
            ]),
            vue.createElementVNode("view", { class: "input-group" }, [
              vue.createElementVNode("view", { class: "input-label" }, "详细描述"),
              vue.withDirectives(vue.createElementVNode(
                "textarea",
                {
                  class: "milestone-textarea",
                  "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $setup.editMilestone.desc = $event),
                  placeholder: "请输入详细描述...",
                  maxlength: "500",
                  "auto-height": true
                },
                null,
                512
                /* NEED_PATCH */
              ), [
                [vue.vModelText, $setup.editMilestone.desc]
              ])
            ]),
            vue.createElementVNode("view", { class: "popup-actions" }, [
              vue.createElementVNode("button", {
                class: "cancel-btn",
                onClick: $setup.closeEditMilestoneModal
              }, "取消"),
              vue.createElementVNode("button", {
                class: "confirm-btn",
                onClick: $setup.updateMilestone,
                disabled: !$setup.canEditSubmit
              }, "确认修改", 8, ["disabled"])
            ])
          ],
          2
          /* CLASS */
        )
      ])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 日期选择器弹窗 "),
      $setup.showDateModal ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 3,
        class: "date-modal-overlay",
        onClick: $setup.closeDateModal
      }, [
        vue.createElementVNode("view", {
          class: "date-modal-content",
          onClick: _cache[10] || (_cache[10] = vue.withModifiers(() => {
          }, ["stop"]))
        }, [
          vue.createElementVNode("view", { class: "date-header" }, [
            vue.createElementVNode("text", { class: "date-title" }, "选择截止日期"),
            vue.createElementVNode("view", {
              class: "date-close",
              onClick: $setup.closeDateModal
            }, [
              vue.createVNode(_component_uni_icons, {
                type: "close",
                size: "20",
                color: "#666"
              })
            ])
          ]),
          vue.createElementVNode("view", { class: "date-picker-wheel" }, [
            vue.createElementVNode("picker-view", {
              value: $setup.pickerValue,
              onChange: $setup.onPickerChange,
              class: "picker-view",
              "indicator-style": $setup.indicatorStyle,
              "mask-style": $setup.maskStyle
            }, [
              vue.createElementVNode("picker-view-column", null, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($setup.years, (year, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      key: index,
                      class: "picker-item"
                    }, [
                      vue.createElementVNode(
                        "text",
                        { class: "picker-text" },
                        vue.toDisplayString(year) + "年",
                        1
                        /* TEXT */
                      )
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]),
              vue.createElementVNode("picker-view-column", null, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($setup.months, (month, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      key: index,
                      class: "picker-item"
                    }, [
                      vue.createElementVNode(
                        "text",
                        { class: "picker-text" },
                        vue.toDisplayString(month) + "月",
                        1
                        /* TEXT */
                      )
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]),
              vue.createElementVNode("picker-view-column", null, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($setup.days, (day, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      key: index,
                      class: "picker-item"
                    }, [
                      vue.createElementVNode(
                        "text",
                        { class: "picker-text" },
                        vue.toDisplayString(day) + "日",
                        1
                        /* TEXT */
                      )
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])
            ], 40, ["value"])
          ]),
          $setup.selectedDate ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "selected-info"
          }, [
            vue.createElementVNode(
              "text",
              null,
              "选中的日期: " + vue.toDisplayString($setup.formatDate($setup.selectedDate)),
              1
              /* TEXT */
            )
          ])) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("view", { class: "date-actions" }, [
            vue.createElementVNode("button", {
              class: "date-cancel-btn",
              onClick: $setup.closeDateModal
            }, "取消"),
            vue.createElementVNode("button", {
              class: "date-confirm-btn",
              onClick: $setup.confirmDate,
              disabled: !$setup.selectedDate
            }, "确认", 8, ["disabled"])
          ])
        ])
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const PagesMilestoreMilestore = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__scopeId", "data-v-b0ad881e"], ["__file", "C:/Users/Administrator/Documents/HBuilderProjects/todoPlus/pages/milestore/milestore.vue"]]);
  const useChatStore = defineStore("chat", () => {
    const chatHistory2 = vue.ref([]);
    const chatIndex = vue.ref(0);
    const needFocusInput = vue.ref(false);
    const currentMessages = vue.ref([]);
    const chatMap = vue.ref(/* @__PURE__ */ new Map());
    const setChatMessages = (chatId, messages) => {
      const messagesCopy = JSON.parse(JSON.stringify(messages));
      chatMap.value.set(chatId, messagesCopy);
      if (chatId === getCurrentChatId()) {
        currentMessages.value = JSON.parse(JSON.stringify(messagesCopy));
      }
    };
    const getCurrentChatId = () => {
      if (chatHistory2.value && chatHistory2.value.length > 0 && chatIndex.value >= 0 && chatIndex.value < chatHistory2.value.length) {
        return chatHistory2.value[chatIndex.value].id;
      }
      return null;
    };
    const setCurrentMessages = (chatId) => {
      const messages = chatMap.value.get(chatId);
      if (messages) {
        currentMessages.value = JSON.parse(JSON.stringify(messages));
      } else {
        currentMessages.value = [];
      }
    };
    const getChatMessages = (chatId) => {
      const messages = chatMap.value.get(chatId);
      return messages ? JSON.parse(JSON.stringify(messages)) : [];
    };
    const addChatMessages = (chatId, messages) => {
      const haveMessages = chatMap.value.get(chatId) || [];
      const newMessages = [...haveMessages, ...messages];
      chatMap.value.set(chatId, newMessages);
      formatAppLog("log", "at stores/chat.js:59", "添加消息后:", chatMap.value.get(chatId));
      if (chatId === getCurrentChatId()) {
        currentMessages.value = [...newMessages];
      }
    };
    const clearChatMessages = (chatId) => {
      chatMap.value.delete(chatId);
    };
    const clearAllChatMessages = () => {
      chatMap.value.clear();
      currentMessages.value = [];
    };
    return {
      chatHistory: chatHistory2,
      needFocusInput,
      chatIndex,
      chatMap,
      setChatMessages,
      getChatMessages,
      addChatMessages,
      currentMessages,
      setCurrentMessages,
      getCurrentChatId,
      clearChatMessages,
      clearAllChatMessages
    };
  });
  const chatHistory = async () => {
    const res2 = (await request.get(`/ai/chatHistory`)).data;
    return res2;
  };
  const updRole = async (data) => {
    formatAppLog("log", "at api/chatApi.js:11", "更新角色API被调用，参数:", data);
    let formData;
    let contentType = "application/json";
    try {
      if (typeof FormData !== "undefined") {
        formData = new FormData();
        formData.append("id", data.id);
        formData.append("name", data.name);
        formData.append("prompt", data.prompt);
        if (data.avatar) {
          formatAppLog("log", "at api/chatApi.js:26", "检测到头像文件:", data.avatar);
          if (data.avatar instanceof File || data.avatar instanceof Blob) {
            formatAppLog("log", "at api/chatApi.js:30", "添加文件对象到FormData, 文件名:", data.avatar.name || "未命名文件", "大小:", data.avatar.size, "bytes");
            formData.append("avatar", data.avatar, data.avatar.name || `avatar_${Date.now()}.jpg`);
          } else {
            formatAppLog("error", "at api/chatApi.js:33", "头像不是文件对象:", typeof data.avatar);
            return Promise.reject(new Error("头像必须是文件对象"));
          }
        }
        contentType = "multipart/form-data";
      } else {
        formatAppLog("warn", "at api/chatApi.js:40", "FormData不可用，使用JSON格式发送请求");
        formData = JSON.stringify({
          id: data.id,
          name: data.name,
          prompt: data.prompt
          // 注意：JSON格式无法处理文件上传
        });
      }
    } catch (formDataError) {
      formatAppLog("warn", "at api/chatApi.js:49", "FormData创建失败，使用JSON格式:", formDataError);
      formData = JSON.stringify({
        id: data.id,
        name: data.name,
        prompt: data.prompt
      });
    }
    const userStore = useUserStore();
    formatAppLog("log", "at api/chatApi.js:58", "准备发送请求, URL:", `${baseURL_}/ai/updRole`);
    try {
      const headers = {
        Authorization: userStore.userInfo.authorization ? `Bearer ${userStore.userInfo.authorization}` : ""
      };
      if (contentType === "application/json") {
        headers["Content-Type"] = contentType;
      }
      const response = await fetch(`${baseURL_}/ai/updRole`, {
        method: "POST",
        headers,
        body: formData
      });
      if (!response.ok) {
        const errorText = await response.text();
        formatAppLog("error", "at api/chatApi.js:81", "API请求失败:", response.status, errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      formatAppLog("log", "at api/chatApi.js:86", "API请求成功，返回结果:", result);
      return result.data;
    } catch (error) {
      formatAppLog("error", "at api/chatApi.js:89", "API请求异常:", error);
      throw error;
    }
  };
  const getRoles = async () => {
    const res2 = (await request.get(`/ai/roles`)).data;
    return res2;
  };
  const chatMessages = async (chatId) => {
    const res2 = (await request.get(`/ai/chatMessages/${chatId}`)).data;
    formatAppLog("log", "at api/chatApi.js:197", res2);
    return res2;
  };
  const editChat = async (data) => {
    const res2 = (await request.post(`/ai/updChat`, data)).data;
    return res2;
  };
  const onChunk = (chunk, currentChatId2, messageIndex2, chatStore2) => {
    try {
      const currentMessages = chatStore2.getChatMessages(currentChatId2);
      if (!currentMessages || !currentMessages[messageIndex2]) {
        formatAppLog("error", "at api/chatApi.js:212", "未找到消息索引:", messageIndex2, "聊天ID:", currentChatId2);
        return;
      }
      const updatedMessages = [...currentMessages];
      if (updatedMessages[messageIndex2].status === "loading") {
        formatAppLog("log", "at api/chatApi.js:221", "消息状态由loading变为incomplete，聊天ID:", currentChatId2);
        updatedMessages[messageIndex2].status = "incomplete";
      }
      const isIOSDevice = (() => {
        try {
          const systemInfo = uni.getSystemInfoSync();
          return systemInfo.platform && systemInfo.platform.toLowerCase() === "ios";
        } catch (e) {
          formatAppLog("warn", "at api/chatApi.js:234", "检测iOS设备失败:", e);
          return false;
        }
      })();
      let contentUpdated = false;
      if (chunk && isIOSDevice) {
        formatAppLog("log", "at api/chatApi.js:244", "iOS设备处理响应块，聊天ID:", currentChatId2);
        if (chunk.includes("```") || updatedMessages[messageIndex2].content.includes("```")) {
          formatAppLog("log", "at api/chatApi.js:248", "检测到可能是Markdown代码块，特殊处理");
          const existingContent = updatedMessages[messageIndex2].content;
          if (chunk === existingContent) {
            formatAppLog("log", "at api/chatApi.js:255", "收到完全相同的内容，跳过更新");
            contentUpdated = false;
            return;
          }
          if (existingContent.length > chunk.length * 0.9 && existingContent.includes(chunk.substring(0, Math.floor(chunk.length * 0.9)))) {
            formatAppLog("log", "at api/chatApi.js:262", "已有内容包含新内容的大部分，可能是重复内容，跳过更新");
            contentUpdated = false;
            return;
          }
          if (chunk.length > existingContent.length && chunk.includes(existingContent.substring(0, Math.floor(existingContent.length * 0.9)))) {
            formatAppLog("log", "at api/chatApi.js:269", "新内容包含已有内容且更长，使用新内容替换");
            updatedMessages[messageIndex2].content = chunk;
            contentUpdated = true;
          } else {
            const combinedContent = existingContent + chunk;
            updatedMessages[messageIndex2].content = combinedContent;
            contentUpdated = true;
          }
        } else if (chunk.length > updatedMessages[messageIndex2].content.length) {
          updatedMessages[messageIndex2].content = chunk;
          contentUpdated = true;
        } else if (updatedMessages[messageIndex2].content.indexOf(chunk) === -1) {
          updatedMessages[messageIndex2].content += chunk;
          contentUpdated = true;
        }
      } else if (chunk) {
        updatedMessages[messageIndex2].content += chunk;
        contentUpdated = true;
      }
      if (contentUpdated) {
        formatAppLog("log", "at api/chatApi.js:296", "更新聊天消息，聊天ID:", currentChatId2);
        chatStore2.setChatMessages(currentChatId2, updatedMessages);
        try {
          uni.$emit("chat:newContent", {
            messageIndex: messageIndex2,
            currentChatId: currentChatId2
          });
        } catch (scrollError) {
          formatAppLog("error", "at api/chatApi.js:306", "尝试触发滚动事件失败:", scrollError);
        }
      }
    } catch (error) {
      formatAppLog("error", "at api/chatApi.js:310", "处理数据块错误:", error);
    }
  };
  const askStream = async (promptData, needData, onComplete, onError) => {
    const { currentChatId: currentChatId2, messageIndex: messageIndex2 } = needData;
    const chatStore2 = useChatStore();
    const userStore = useUserStore();
    let reader = null;
    const isIOS = () => {
      try {
        let systemInfo;
        systemInfo = uni.getSystemInfoSync();
        return systemInfo.platform && systemInfo.platform.toLowerCase() === "ios";
      } catch (e) {
        formatAppLog("error", "at api/chatApi.js:330", "检测iOS设备失败:", e);
        return false;
      }
    };
    try {
      formatAppLog("log", "at api/chatApi.js:336", "开始流式请求，设备类型:", isIOS() ? "iOS" : "其他");
      formatAppLog("log", "at api/chatApi.js:337", "请求数据:", promptData);
      if (isIOS()) {
        formatAppLog("log", "at api/chatApi.js:341", "检测到iOS设备，使用uni.request处理请求");
        return new Promise((resolve2, reject) => {
          let isCompleted = false;
          uni.request({
            url: `${baseURL_}/ai/askStream`,
            method: "POST",
            header: {
              "Accept": "text/plain, text/html, */*",
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": userStore.userInfo.authorization ? `Bearer ${userStore.userInfo.authorization}` : ""
            },
            // 使用表单格式发送数据，与后端期望的格式一致
            data: {
              prompt: promptData.prompt || promptData,
              chatId: promptData.chatId || ""
            },
            success: (response) => {
              var _a2;
              if (isCompleted)
                return;
              isCompleted = true;
              formatAppLog("log", "at api/chatApi.js:367", "uni.request完成，状态码:", response.statusCode);
              if (response.statusCode >= 200 && response.statusCode < 300) {
                formatAppLog("log", "at api/chatApi.js:370", "iOS请求成功完成");
                if (response.data) {
                  formatAppLog("log", "at api/chatApi.js:374", "iOS响应数据长度:", typeof response.data === "string" ? response.data.length : "non-string");
                  const fullResponse = response.data;
                  let sentences = [];
                  if (fullResponse.includes("```")) {
                    formatAppLog("log", "at api/chatApi.js:384", "检测到Markdown代码块，特殊处理分割");
                    const isComplexMarkdown = (fullResponse.match(/```/g) || []).length > 2 || // 超过一个代码块
                    fullResponse.includes("##") || // 包含二级及以上标题
                    ((_a2 = fullResponse.match(/\n\n/g)) == null ? void 0 : _a2.length) > 3;
                    if (isComplexMarkdown) {
                      formatAppLog("log", "at api/chatApi.js:395", "检测到复杂Markdown文档，减少分割");
                      sentences.push(fullResponse);
                    } else {
                      const parts = fullResponse.split(new RegExp("(?<=\\n\\n)")).filter((part) => part.trim());
                      for (const part of parts) {
                        if (part.includes("```")) {
                          sentences.push(part);
                        } else {
                          const subSentences = part.split(new RegExp("(?<=[。！？\\n])")).filter((s) => s.trim());
                          sentences.push(...subSentences);
                        }
                      }
                    }
                  } else {
                    sentences = fullResponse.split(new RegExp("(?<=[。！？\\n])")).filter((s) => s.trim());
                  }
                  let currentIndex = 0;
                  let accumulatedContent = "";
                  let lastSentContent = "";
                  const simulateStreaming = () => {
                    if (currentIndex < sentences.length) {
                      const chunk = sentences[currentIndex];
                      const newAccumulatedContent = accumulatedContent + chunk;
                      let shouldSend = true;
                      if (lastSentContent === newAccumulatedContent) {
                        formatAppLog("log", "at api/chatApi.js:436", "跳过完全重复的内容");
                        shouldSend = false;
                      }
                      accumulatedContent = newAccumulatedContent;
                      if (chunk.trim() && shouldSend) {
                        lastSentContent = accumulatedContent;
                        onChunk(accumulatedContent, currentChatId2, messageIndex2, chatStore2);
                      }
                      currentIndex++;
                      setTimeout(simulateStreaming, 100);
                    } else {
                      onComplete == null ? void 0 : onComplete();
                      resolve2();
                    }
                  };
                  simulateStreaming();
                } else {
                  onComplete == null ? void 0 : onComplete();
                  resolve2();
                }
              } else {
                formatAppLog("error", "at api/chatApi.js:467", "请求失败，状态码:", response.statusCode, "响应:", response.data);
                const error = new Error(`HTTP错误: ${response.statusCode}`);
                onError == null ? void 0 : onError(error);
                reject(error);
              }
            },
            fail: (error) => {
              if (isCompleted)
                return;
              isCompleted = true;
              formatAppLog("error", "at api/chatApi.js:477", "uni.request请求错误:", error);
              onError == null ? void 0 : onError(new Error("网络请求失败"));
              reject(new Error("网络请求失败"));
            },
            complete: () => {
              formatAppLog("log", "at api/chatApi.js:482", "uni.request请求完成");
            }
          });
          return {
            cancel: () => {
              if (!isCompleted) {
                formatAppLog("log", "at api/chatApi.js:490", "取消iOS请求");
                isCompleted = true;
              }
            }
          };
        });
      } else {
        formatAppLog("log", "at api/chatApi.js:498", "非iOS设备，使用标准fetch流式处理");
        let requestBody;
        let contentType = "application/json";
        try {
          if (typeof FormData !== "undefined") {
            const formData = new FormData();
            formData.append("prompt", promptData.prompt || promptData);
            formData.append("chatId", promptData.chatId || "");
            if (promptData.files && promptData.files.length > 0) {
              promptData.files.forEach((file) => {
                formData.append("files", file);
              });
            } else {
              formData.append("files", []);
            }
            requestBody = formData;
            contentType = "multipart/form-data";
          } else {
            requestBody = JSON.stringify({
              prompt: promptData.prompt || promptData,
              chatId: promptData.chatId || ""
            });
          }
        } catch (formDataError) {
          formatAppLog("warn", "at api/chatApi.js:531", "FormData创建失败，使用JSON格式:", formDataError);
          requestBody = JSON.stringify({
            prompt: promptData.prompt || promptData,
            chatId: promptData.chatId || ""
          });
        }
        const headers = {
          Accept: "text/plain, text/html, */*",
          Authorization: userStore.userInfo.authorization ? `Bearer ${userStore.userInfo.authorization}` : ""
        };
        if (contentType === "application/json") {
          headers["Content-Type"] = contentType;
        }
        const response = await fetch(`${baseURL_}/ai/askStream`, {
          method: "POST",
          headers,
          body: requestBody
        });
        formatAppLog("log", "at api/chatApi.js:556", "fetch响应状态:", response.status, response.ok);
        if (!response.ok) {
          const errorText = await response.text();
          formatAppLog("error", "at api/chatApi.js:560", "fetch请求失败:", response.status, errorText);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            formatAppLog("log", "at api/chatApi.js:571", "fetch流式读取完成");
            onComplete == null ? void 0 : onComplete();
            break;
          }
          const chunk = decoder.decode(value, { stream: true });
          formatAppLog("log", "at api/chatApi.js:577", "fetch接收数据块:", chunk.length, "字符");
          onChunk(chunk, currentChatId2, messageIndex2, chatStore2);
        }
        return {
          cancel: () => {
            if (reader) {
              formatAppLog("log", "at api/chatApi.js:584", "取消fetch流式读取");
              reader.cancel();
              reader = null;
            }
          }
        };
      }
    } catch (error) {
      formatAppLog("error", "at api/chatApi.js:592", "流式请求错误:", error);
      if (error.name === "AbortError") {
        onError == null ? void 0 : onError(new Error("传输已停止"));
      } else {
        onError == null ? void 0 : onError(error);
      }
      throw error;
    } finally {
      reader = null;
    }
  };
  const createChat = async (data) => {
    const res2 = (await request.post(`/ai/create`, data)).data;
    return res2;
  };
  const createStreamRequest = (promptData, callbacks = {}) => {
    const { onChunk: onChunk2, onComplete, onError, onStart } = callbacks;
    const userStore = useUserStore();
    let reader = null;
    let isActive = false;
    let abortController = null;
    let xhr = null;
    const isIOS = () => {
      try {
        let systemInfo;
        systemInfo = uni.getSystemInfoSync();
        return systemInfo.platform && systemInfo.platform.toLowerCase() === "ios";
      } catch (e) {
        formatAppLog("error", "at api/chatApi.js:628", "检测iOS设备失败:", e);
        return false;
      }
    };
    const start = async () => {
      if (isActive) {
        formatAppLog("warn", "at api/chatApi.js:635", "流式请求已在进行中");
        return;
      }
      isActive = true;
      abortController = isIOS() ? null : new AbortController();
      onStart == null ? void 0 : onStart();
      try {
        formatAppLog("log", "at api/chatApi.js:644", "开始高级流式请求，设备类型:", isIOS() ? "iOS" : "其他");
        let formData;
        let contentType = "application/json";
        try {
          if (typeof FormData !== "undefined") {
            formData = new FormData();
            formData.append("prompt", promptData.prompt || promptData);
            formData.append("chatId", promptData.chatId || "");
            if (promptData.files && promptData.files.length > 0) {
              promptData.files.forEach((file) => {
                formData.append("files", file);
              });
            } else {
              formData.append("files", "");
            }
            contentType = "multipart/form-data";
          } else {
            formatAppLog("warn", "at api/chatApi.js:667", "FormData不可用，使用JSON格式发送请求");
            formData = JSON.stringify({
              prompt: promptData.prompt || promptData,
              chatId: promptData.chatId || ""
            });
          }
        } catch (formDataError) {
          formatAppLog("warn", "at api/chatApi.js:674", "FormData创建失败，使用JSON格式:", formDataError);
          formData = JSON.stringify({
            prompt: promptData.prompt || promptData,
            chatId: promptData.chatId || ""
          });
        }
        if (isIOS()) {
          formatAppLog("log", "at api/chatApi.js:683", "检测到iOS设备，使用uni.request处理请求");
          try {
            uni.request({
              url: `${baseURL_}/ai/askStream`,
              method: "POST",
              header: {
                "Accept": "text/plain, text/html, */*",
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": userStore.userInfo.authorization ? `Bearer ${userStore.userInfo.authorization}` : ""
              },
              // 使用表单格式发送数据，与后端期望的格式一致
              data: {
                prompt: promptData.prompt || promptData,
                chatId: promptData.chatId || ""
              },
              success: (response) => {
                var _a2;
                if (!isActive)
                  return;
                formatAppLog("log", "at api/chatApi.js:705", "uni.request完成，状态码:", response.statusCode);
                if (response.statusCode >= 200 && response.statusCode < 300) {
                  formatAppLog("log", "at api/chatApi.js:708", "iOS请求成功完成");
                  if (response.data) {
                    formatAppLog("log", "at api/chatApi.js:712", "iOS响应数据长度:", typeof response.data === "string" ? response.data.length : "non-string");
                    const fullResponse = response.data;
                    let sentences = [];
                    if (fullResponse.includes("```")) {
                      formatAppLog("log", "at api/chatApi.js:722", "检测到Markdown代码块，特殊处理分割");
                      const isComplexMarkdown = (fullResponse.match(/```/g) || []).length > 2 || // 超过一个代码块
                      fullResponse.includes("##") || // 包含二级及以上标题
                      ((_a2 = fullResponse.match(/\n\n/g)) == null ? void 0 : _a2.length) > 3;
                      if (isComplexMarkdown) {
                        formatAppLog("log", "at api/chatApi.js:733", "检测到复杂Markdown文档，减少分割");
                        sentences.push(fullResponse);
                      } else {
                        const parts = fullResponse.split(new RegExp("(?<=\\n\\n)")).filter((part) => part.trim());
                        for (const part of parts) {
                          if (part.includes("```")) {
                            sentences.push(part);
                          } else {
                            const subSentences = part.split(new RegExp("(?<=[。！？\\n])")).filter((s) => s.trim());
                            sentences.push(...subSentences);
                          }
                        }
                      }
                    } else {
                      sentences = fullResponse.split(new RegExp("(?<=[。！？\\n])")).filter((s) => s.trim());
                    }
                    let currentIndex = 0;
                    let accumulatedContent = "";
                    let lastSentContent = "";
                    const simulateStreaming = () => {
                      if (currentIndex < sentences.length) {
                        const chunk = sentences[currentIndex];
                        const newAccumulatedContent = accumulatedContent + chunk;
                        let shouldSend = true;
                        if (lastSentContent === newAccumulatedContent) {
                          formatAppLog("log", "at api/chatApi.js:774", "跳过完全重复的内容");
                          shouldSend = false;
                        }
                        accumulatedContent = newAccumulatedContent;
                        if (chunk.trim() && shouldSend) {
                          lastSentContent = accumulatedContent;
                          onChunk2(accumulatedContent, currentChatId, messageIndex, chatStore);
                        }
                        currentIndex++;
                        setTimeout(simulateStreaming, 100);
                      } else {
                        onComplete == null ? void 0 : onComplete();
                        resolve();
                      }
                    };
                    simulateStreaming();
                  } else {
                    onComplete == null ? void 0 : onComplete();
                  }
                } else {
                  formatAppLog("error", "at api/chatApi.js:804", "请求失败，状态码:", response.statusCode, "响应:", response.data);
                  onError == null ? void 0 : onError(new Error(`HTTP错误: ${response.statusCode}`));
                }
              },
              fail: (error) => {
                if (!isActive)
                  return;
                formatAppLog("error", "at api/chatApi.js:811", "uni.request请求错误:", error);
                onError == null ? void 0 : onError(new Error("网络请求失败"));
              },
              complete: () => {
                formatAppLog("log", "at api/chatApi.js:815", "uni.request请求完成");
                isActive = false;
                xhr = null;
              }
            });
            formatAppLog("log", "at api/chatApi.js:821", "iOS uni.request已发送");
          } catch (sendError) {
            formatAppLog("error", "at api/chatApi.js:823", "发送uni.request请求失败:", sendError);
            onError == null ? void 0 : onError(sendError);
            isActive = false;
            xhr = null;
          }
        } else {
          formatAppLog("log", "at api/chatApi.js:829", "非iOS设备，使用标准fetch流式处理");
          const response = await fetch(`${baseURL_}/ai/askStream`, {
            method: "POST",
            headers: {
              Accept: "text/plain, text/html, */*",
              Authorization: userStore.userInfo.authorization ? `Bearer ${userStore.userInfo.authorization}` : ""
            },
            body: formData,
            signal: abortController.signal
          });
          formatAppLog("log", "at api/chatApi.js:843", "fetch响应状态:", response.status, response.ok);
          if (!response.ok) {
            const errorText = await response.text();
            formatAppLog("error", "at api/chatApi.js:847", "fetch请求失败:", response.status, errorText);
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          reader = response.body.getReader();
          const decoder = new TextDecoder("utf-8");
          while (isActive && !abortController.signal.aborted) {
            const { done, value } = await reader.read();
            if (done) {
              formatAppLog("log", "at api/chatApi.js:858", "fetch高级流式读取完成");
              onComplete == null ? void 0 : onComplete();
              break;
            }
            const chunk = decoder.decode(value, { stream: true });
            formatAppLog("log", "at api/chatApi.js:864", "fetch高级接收数据块:", chunk.length, "字符");
            onChunk2 == null ? void 0 : onChunk2(chunk);
          }
        }
      } catch (error) {
        formatAppLog("error", "at api/chatApi.js:869", "流式传输错误:", error);
        if (error.name === "AbortError") {
          formatAppLog("log", "at api/chatApi.js:872", "传输已停止");
        } else {
          onError == null ? void 0 : onError(error);
        }
      } finally {
        isActive = false;
        reader = null;
        abortController = null;
      }
    };
    const cancel = () => {
      if (isIOS() && xhr) {
        formatAppLog("log", "at api/chatApi.js:885", "取消iOS高级XHR请求");
        xhr.abort();
        xhr = null;
      } else {
        if (abortController) {
          formatAppLog("log", "at api/chatApi.js:890", "取消fetch高级流式读取");
          abortController.abort();
        }
        if (reader) {
          reader.cancel();
        }
      }
      isActive = false;
      reader = null;
      abortController = null;
    };
    return {
      start,
      cancel,
      isActive: () => isActive
    };
  };
  const askStreamWithChat = async (prompt, chatId, onChunk2, onComplete, onError) => {
    const chatStore2 = useChatStore();
    const needData = {
      currentChatId: chatId,
      messageIndex: chatStore2.currentMessages ? chatStore2.currentMessages.length - 1 : 0
    };
    return await askStream({ prompt, chatId }, needData, onComplete, onError);
  };
  const deleteChat = async (chatId) => {
    const res2 = (await request.delete(`/ai/delChat/${chatId}`)).data;
    return res2;
  };
  const deleteRole = async (roleId) => {
    formatAppLog("log", "at api/chatApi.js:932", "删除角色API被调用，角色ID:", roleId);
    const res2 = (await request.delete(`/ai/delRole/${roleId}`)).data;
    return res2;
  };
  const chatApi = {
    updRole,
    getRoles,
    createChat,
    askStream,
    deleteChat,
    chatHistory,
    chatMessages,
    createStreamRequest,
    askStreamWithChat,
    editChat,
    deleteRole
  };
  function _getDefaults() {
    return {
      async: false,
      breaks: false,
      extensions: null,
      gfm: true,
      hooks: null,
      pedantic: false,
      renderer: null,
      silent: false,
      tokenizer: null,
      walkTokens: null
    };
  }
  var _defaults = _getDefaults();
  function changeDefaults(newDefaults) {
    _defaults = newDefaults;
  }
  var noopTest = { exec: () => null };
  function edit(regex, opt = "") {
    let source = typeof regex === "string" ? regex : regex.source;
    const obj = {
      replace: (name, val) => {
        let valSource = typeof val === "string" ? val : val.source;
        valSource = valSource.replace(other.caret, "$1");
        source = source.replace(name, valSource);
        return obj;
      },
      getRegex: () => {
        return new RegExp(source, opt);
      }
    };
    return obj;
  }
  var other = {
    codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm,
    outputLinkReplace: /\\([\[\]])/g,
    indentCodeCompensation: /^(\s+)(?:```)/,
    beginningSpace: /^\s+/,
    endingHash: /#$/,
    startingSpaceChar: /^ /,
    endingSpaceChar: / $/,
    nonSpaceChar: /[^ ]/,
    newLineCharGlobal: /\n/g,
    tabCharGlobal: /\t/g,
    multipleSpaceGlobal: /\s+/g,
    blankLine: /^[ \t]*$/,
    doubleBlankLine: /\n[ \t]*\n[ \t]*$/,
    blockquoteStart: /^ {0,3}>/,
    blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g,
    blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm,
    listReplaceTabs: /^\t+/,
    listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g,
    listIsTask: /^\[[ xX]\] /,
    listReplaceTask: /^\[[ xX]\] +/,
    anyLine: /\n.*\n/,
    hrefBrackets: /^<(.*)>$/,
    tableDelimiter: /[:|]/,
    tableAlignChars: /^\||\| *$/g,
    tableRowBlankLine: /\n[ \t]*$/,
    tableAlignRight: /^ *-+: *$/,
    tableAlignCenter: /^ *:-+: *$/,
    tableAlignLeft: /^ *:-+ *$/,
    startATag: /^<a /i,
    endATag: /^<\/a>/i,
    startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i,
    endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i,
    startAngleBracket: /^</,
    endAngleBracket: />$/,
    pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/,
    unicodeAlphaNumeric: /[\p{L}\p{N}]/u,
    escapeTest: /[&<>"']/,
    escapeReplace: /[&<>"']/g,
    escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
    escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,
    unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,
    caret: /(^|[^\[])\^/g,
    percentDecode: /%25/g,
    findPipe: /\|/g,
    splitPipe: / \|/,
    slashPipe: /\\\|/g,
    carriageReturn: /\r\n|\r/g,
    spaceLine: /^ +$/gm,
    notSpaceStart: /^\S*/,
    endingNewline: /\n$/,
    listItemRegex: (bull) => new RegExp(`^( {0,3}${bull})((?:[	 ][^\\n]*)?(?:\\n|$))`),
    nextBulletRegex: (indent) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),
    hrRegex: (indent) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),
    fencesBeginRegex: (indent) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:\`\`\`|~~~)`),
    headingBeginRegex: (indent) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}#`),
    htmlBeginRegex: (indent) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}<(?:[a-z].*>|!--)`, "i")
  };
  var newline = /^(?:[ \t]*(?:\n|$))+/;
  var blockCode = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/;
  var fences = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/;
  var hr = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/;
  var heading = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/;
  var bullet = /(?:[*+-]|\d{1,9}[.)])/;
  var lheadingCore = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/;
  var lheading = edit(lheadingCore).replace(/bull/g, bullet).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex();
  var lheadingGfm = edit(lheadingCore).replace(/bull/g, bullet).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex();
  var _paragraph = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/;
  var blockText = /^[^\n]+/;
  var _blockLabel = /(?!\s*\])(?:\\.|[^\[\]\\])+/;
  var def = edit(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", _blockLabel).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex();
  var list = edit(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, bullet).getRegex();
  var _tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
  var _comment = /<!--(?:-?>|[\s\S]*?(?:-->|$))/;
  var html = edit(
    "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))",
    "i"
  ).replace("comment", _comment).replace("tag", _tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
  var paragraph = edit(_paragraph).replace("hr", hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", _tag).getRegex();
  var blockquote = edit(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", paragraph).getRegex();
  var blockNormal = {
    blockquote,
    code: blockCode,
    def,
    fences,
    heading,
    hr,
    html,
    lheading,
    list,
    newline,
    paragraph,
    table: noopTest,
    text: blockText
  };
  var gfmTable = edit(
    "^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
  ).replace("hr", hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", _tag).getRegex();
  var blockGfm = {
    ...blockNormal,
    lheading: lheadingGfm,
    table: gfmTable,
    paragraph: edit(_paragraph).replace("hr", hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", gfmTable).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", _tag).getRegex()
  };
  var blockPedantic = {
    ...blockNormal,
    html: edit(
      `^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`
    ).replace("comment", _comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
    def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
    heading: /^(#{1,6})(.*)(?:\n+|$)/,
    fences: noopTest,
    // fences not supported
    lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
    paragraph: edit(_paragraph).replace("hr", hr).replace("heading", " *#{1,6} *[^\n]").replace("lheading", lheading).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
  };
  var escape = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/;
  var inlineCode = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/;
  var br = /^( {2,}|\\)\n(?!\s*$)/;
  var inlineText = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/;
  var _punctuation = /[\p{P}\p{S}]/u;
  var _punctuationOrSpace = /[\s\p{P}\p{S}]/u;
  var _notPunctuationOrSpace = /[^\s\p{P}\p{S}]/u;
  var punctuation = edit(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, _punctuationOrSpace).getRegex();
  var _punctuationGfmStrongEm = /(?!~)[\p{P}\p{S}]/u;
  var _punctuationOrSpaceGfmStrongEm = /(?!~)[\s\p{P}\p{S}]/u;
  var _notPunctuationOrSpaceGfmStrongEm = /(?:[^\s\p{P}\p{S}]|~)/u;
  var blockSkip = /\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g;
  var emStrongLDelimCore = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/;
  var emStrongLDelim = edit(emStrongLDelimCore, "u").replace(/punct/g, _punctuation).getRegex();
  var emStrongLDelimGfm = edit(emStrongLDelimCore, "u").replace(/punct/g, _punctuationGfmStrongEm).getRegex();
  var emStrongRDelimAstCore = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)";
  var emStrongRDelimAst = edit(emStrongRDelimAstCore, "gu").replace(/notPunctSpace/g, _notPunctuationOrSpace).replace(/punctSpace/g, _punctuationOrSpace).replace(/punct/g, _punctuation).getRegex();
  var emStrongRDelimAstGfm = edit(emStrongRDelimAstCore, "gu").replace(/notPunctSpace/g, _notPunctuationOrSpaceGfmStrongEm).replace(/punctSpace/g, _punctuationOrSpaceGfmStrongEm).replace(/punct/g, _punctuationGfmStrongEm).getRegex();
  var emStrongRDelimUnd = edit(
    "^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)",
    "gu"
  ).replace(/notPunctSpace/g, _notPunctuationOrSpace).replace(/punctSpace/g, _punctuationOrSpace).replace(/punct/g, _punctuation).getRegex();
  var anyPunctuation = edit(/\\(punct)/, "gu").replace(/punct/g, _punctuation).getRegex();
  var autolink = edit(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex();
  var _inlineComment = edit(_comment).replace("(?:-->|$)", "-->").getRegex();
  var tag = edit(
    "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>"
  ).replace("comment", _inlineComment).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex();
  var _inlineLabel = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
  var link = edit(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", _inlineLabel).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex();
  var reflink = edit(/^!?\[(label)\]\[(ref)\]/).replace("label", _inlineLabel).replace("ref", _blockLabel).getRegex();
  var nolink = edit(/^!?\[(ref)\](?:\[\])?/).replace("ref", _blockLabel).getRegex();
  var reflinkSearch = edit("reflink|nolink(?!\\()", "g").replace("reflink", reflink).replace("nolink", nolink).getRegex();
  var inlineNormal = {
    _backpedal: noopTest,
    // only used for GFM url
    anyPunctuation,
    autolink,
    blockSkip,
    br,
    code: inlineCode,
    del: noopTest,
    emStrongLDelim,
    emStrongRDelimAst,
    emStrongRDelimUnd,
    escape,
    link,
    nolink,
    punctuation,
    reflink,
    reflinkSearch,
    tag,
    text: inlineText,
    url: noopTest
  };
  var inlinePedantic = {
    ...inlineNormal,
    link: edit(/^!?\[(label)\]\((.*?)\)/).replace("label", _inlineLabel).getRegex(),
    reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", _inlineLabel).getRegex()
  };
  var inlineGfm = {
    ...inlineNormal,
    emStrongRDelimAst: emStrongRDelimAstGfm,
    emStrongLDelim: emStrongLDelimGfm,
    url: edit(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
    _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
    del: /^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,
    text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
  };
  var inlineBreaks = {
    ...inlineGfm,
    br: edit(br).replace("{2,}", "*").getRegex(),
    text: edit(inlineGfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
  };
  var block = {
    normal: blockNormal,
    gfm: blockGfm,
    pedantic: blockPedantic
  };
  var inline = {
    normal: inlineNormal,
    gfm: inlineGfm,
    breaks: inlineBreaks,
    pedantic: inlinePedantic
  };
  var escapeReplacements = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  };
  var getEscapeReplacement = (ch) => escapeReplacements[ch];
  function escape2(html2, encode) {
    if (encode) {
      if (other.escapeTest.test(html2)) {
        return html2.replace(other.escapeReplace, getEscapeReplacement);
      }
    } else {
      if (other.escapeTestNoEncode.test(html2)) {
        return html2.replace(other.escapeReplaceNoEncode, getEscapeReplacement);
      }
    }
    return html2;
  }
  function cleanUrl(href) {
    try {
      href = encodeURI(href).replace(other.percentDecode, "%");
    } catch {
      return null;
    }
    return href;
  }
  function splitCells(tableRow, count) {
    var _a2;
    const row = tableRow.replace(other.findPipe, (match, offset, str) => {
      let escaped = false;
      let curr = offset;
      while (--curr >= 0 && str[curr] === "\\")
        escaped = !escaped;
      if (escaped) {
        return "|";
      } else {
        return " |";
      }
    }), cells = row.split(other.splitPipe);
    let i = 0;
    if (!cells[0].trim()) {
      cells.shift();
    }
    if (cells.length > 0 && !((_a2 = cells.at(-1)) == null ? void 0 : _a2.trim())) {
      cells.pop();
    }
    if (count) {
      if (cells.length > count) {
        cells.splice(count);
      } else {
        while (cells.length < count)
          cells.push("");
      }
    }
    for (; i < cells.length; i++) {
      cells[i] = cells[i].trim().replace(other.slashPipe, "|");
    }
    return cells;
  }
  function rtrim(str, c, invert) {
    const l = str.length;
    if (l === 0) {
      return "";
    }
    let suffLen = 0;
    while (suffLen < l) {
      const currChar = str.charAt(l - suffLen - 1);
      if (currChar === c && !invert) {
        suffLen++;
      } else if (currChar !== c && invert) {
        suffLen++;
      } else {
        break;
      }
    }
    return str.slice(0, l - suffLen);
  }
  function findClosingBracket(str, b) {
    if (str.indexOf(b[1]) === -1) {
      return -1;
    }
    let level = 0;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === "\\") {
        i++;
      } else if (str[i] === b[0]) {
        level++;
      } else if (str[i] === b[1]) {
        level--;
        if (level < 0) {
          return i;
        }
      }
    }
    if (level > 0) {
      return -2;
    }
    return -1;
  }
  function outputLink(cap, link2, raw, lexer2, rules) {
    const href = link2.href;
    const title = link2.title || null;
    const text = cap[1].replace(rules.other.outputLinkReplace, "$1");
    lexer2.state.inLink = true;
    const token = {
      type: cap[0].charAt(0) === "!" ? "image" : "link",
      raw,
      href,
      title,
      text,
      tokens: lexer2.inlineTokens(text)
    };
    lexer2.state.inLink = false;
    return token;
  }
  function indentCodeCompensation(raw, text, rules) {
    const matchIndentToCode = raw.match(rules.other.indentCodeCompensation);
    if (matchIndentToCode === null) {
      return text;
    }
    const indentToCode = matchIndentToCode[1];
    return text.split("\n").map((node) => {
      const matchIndentInNode = node.match(rules.other.beginningSpace);
      if (matchIndentInNode === null) {
        return node;
      }
      const [indentInNode] = matchIndentInNode;
      if (indentInNode.length >= indentToCode.length) {
        return node.slice(indentToCode.length);
      }
      return node;
    }).join("\n");
  }
  var _Tokenizer = class {
    // set by the lexer
    constructor(options2) {
      __publicField(this, "options");
      __publicField(this, "rules");
      // set by the lexer
      __publicField(this, "lexer");
      this.options = options2 || _defaults;
    }
    space(src) {
      const cap = this.rules.block.newline.exec(src);
      if (cap && cap[0].length > 0) {
        return {
          type: "space",
          raw: cap[0]
        };
      }
    }
    code(src) {
      const cap = this.rules.block.code.exec(src);
      if (cap) {
        const text = cap[0].replace(this.rules.other.codeRemoveIndent, "");
        return {
          type: "code",
          raw: cap[0],
          codeBlockStyle: "indented",
          text: !this.options.pedantic ? rtrim(text, "\n") : text
        };
      }
    }
    fences(src) {
      const cap = this.rules.block.fences.exec(src);
      if (cap) {
        const raw = cap[0];
        const text = indentCodeCompensation(raw, cap[3] || "", this.rules);
        return {
          type: "code",
          raw,
          lang: cap[2] ? cap[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : cap[2],
          text
        };
      }
    }
    heading(src) {
      const cap = this.rules.block.heading.exec(src);
      if (cap) {
        let text = cap[2].trim();
        if (this.rules.other.endingHash.test(text)) {
          const trimmed = rtrim(text, "#");
          if (this.options.pedantic) {
            text = trimmed.trim();
          } else if (!trimmed || this.rules.other.endingSpaceChar.test(trimmed)) {
            text = trimmed.trim();
          }
        }
        return {
          type: "heading",
          raw: cap[0],
          depth: cap[1].length,
          text,
          tokens: this.lexer.inline(text)
        };
      }
    }
    hr(src) {
      const cap = this.rules.block.hr.exec(src);
      if (cap) {
        return {
          type: "hr",
          raw: rtrim(cap[0], "\n")
        };
      }
    }
    blockquote(src) {
      const cap = this.rules.block.blockquote.exec(src);
      if (cap) {
        let lines = rtrim(cap[0], "\n").split("\n");
        let raw = "";
        let text = "";
        const tokens = [];
        while (lines.length > 0) {
          let inBlockquote = false;
          const currentLines = [];
          let i;
          for (i = 0; i < lines.length; i++) {
            if (this.rules.other.blockquoteStart.test(lines[i])) {
              currentLines.push(lines[i]);
              inBlockquote = true;
            } else if (!inBlockquote) {
              currentLines.push(lines[i]);
            } else {
              break;
            }
          }
          lines = lines.slice(i);
          const currentRaw = currentLines.join("\n");
          const currentText = currentRaw.replace(this.rules.other.blockquoteSetextReplace, "\n    $1").replace(this.rules.other.blockquoteSetextReplace2, "");
          raw = raw ? `${raw}
${currentRaw}` : currentRaw;
          text = text ? `${text}
${currentText}` : currentText;
          const top = this.lexer.state.top;
          this.lexer.state.top = true;
          this.lexer.blockTokens(currentText, tokens, true);
          this.lexer.state.top = top;
          if (lines.length === 0) {
            break;
          }
          const lastToken = tokens.at(-1);
          if ((lastToken == null ? void 0 : lastToken.type) === "code") {
            break;
          } else if ((lastToken == null ? void 0 : lastToken.type) === "blockquote") {
            const oldToken = lastToken;
            const newText = oldToken.raw + "\n" + lines.join("\n");
            const newToken = this.blockquote(newText);
            tokens[tokens.length - 1] = newToken;
            raw = raw.substring(0, raw.length - oldToken.raw.length) + newToken.raw;
            text = text.substring(0, text.length - oldToken.text.length) + newToken.text;
            break;
          } else if ((lastToken == null ? void 0 : lastToken.type) === "list") {
            const oldToken = lastToken;
            const newText = oldToken.raw + "\n" + lines.join("\n");
            const newToken = this.list(newText);
            tokens[tokens.length - 1] = newToken;
            raw = raw.substring(0, raw.length - lastToken.raw.length) + newToken.raw;
            text = text.substring(0, text.length - oldToken.raw.length) + newToken.raw;
            lines = newText.substring(tokens.at(-1).raw.length).split("\n");
            continue;
          }
        }
        return {
          type: "blockquote",
          raw,
          tokens,
          text
        };
      }
    }
    list(src) {
      let cap = this.rules.block.list.exec(src);
      if (cap) {
        let bull = cap[1].trim();
        const isordered = bull.length > 1;
        const list2 = {
          type: "list",
          raw: "",
          ordered: isordered,
          start: isordered ? +bull.slice(0, -1) : "",
          loose: false,
          items: []
        };
        bull = isordered ? `\\d{1,9}\\${bull.slice(-1)}` : `\\${bull}`;
        if (this.options.pedantic) {
          bull = isordered ? bull : "[*+-]";
        }
        const itemRegex = this.rules.other.listItemRegex(bull);
        let endsWithBlankLine = false;
        while (src) {
          let endEarly = false;
          let raw = "";
          let itemContents = "";
          if (!(cap = itemRegex.exec(src))) {
            break;
          }
          if (this.rules.block.hr.test(src)) {
            break;
          }
          raw = cap[0];
          src = src.substring(raw.length);
          let line = cap[2].split("\n", 1)[0].replace(this.rules.other.listReplaceTabs, (t) => " ".repeat(3 * t.length));
          let nextLine = src.split("\n", 1)[0];
          let blankLine = !line.trim();
          let indent = 0;
          if (this.options.pedantic) {
            indent = 2;
            itemContents = line.trimStart();
          } else if (blankLine) {
            indent = cap[1].length + 1;
          } else {
            indent = cap[2].search(this.rules.other.nonSpaceChar);
            indent = indent > 4 ? 1 : indent;
            itemContents = line.slice(indent);
            indent += cap[1].length;
          }
          if (blankLine && this.rules.other.blankLine.test(nextLine)) {
            raw += nextLine + "\n";
            src = src.substring(nextLine.length + 1);
            endEarly = true;
          }
          if (!endEarly) {
            const nextBulletRegex = this.rules.other.nextBulletRegex(indent);
            const hrRegex = this.rules.other.hrRegex(indent);
            const fencesBeginRegex = this.rules.other.fencesBeginRegex(indent);
            const headingBeginRegex = this.rules.other.headingBeginRegex(indent);
            const htmlBeginRegex = this.rules.other.htmlBeginRegex(indent);
            while (src) {
              const rawLine = src.split("\n", 1)[0];
              let nextLineWithoutTabs;
              nextLine = rawLine;
              if (this.options.pedantic) {
                nextLine = nextLine.replace(this.rules.other.listReplaceNesting, "  ");
                nextLineWithoutTabs = nextLine;
              } else {
                nextLineWithoutTabs = nextLine.replace(this.rules.other.tabCharGlobal, "    ");
              }
              if (fencesBeginRegex.test(nextLine)) {
                break;
              }
              if (headingBeginRegex.test(nextLine)) {
                break;
              }
              if (htmlBeginRegex.test(nextLine)) {
                break;
              }
              if (nextBulletRegex.test(nextLine)) {
                break;
              }
              if (hrRegex.test(nextLine)) {
                break;
              }
              if (nextLineWithoutTabs.search(this.rules.other.nonSpaceChar) >= indent || !nextLine.trim()) {
                itemContents += "\n" + nextLineWithoutTabs.slice(indent);
              } else {
                if (blankLine) {
                  break;
                }
                if (line.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4) {
                  break;
                }
                if (fencesBeginRegex.test(line)) {
                  break;
                }
                if (headingBeginRegex.test(line)) {
                  break;
                }
                if (hrRegex.test(line)) {
                  break;
                }
                itemContents += "\n" + nextLine;
              }
              if (!blankLine && !nextLine.trim()) {
                blankLine = true;
              }
              raw += rawLine + "\n";
              src = src.substring(rawLine.length + 1);
              line = nextLineWithoutTabs.slice(indent);
            }
          }
          if (!list2.loose) {
            if (endsWithBlankLine) {
              list2.loose = true;
            } else if (this.rules.other.doubleBlankLine.test(raw)) {
              endsWithBlankLine = true;
            }
          }
          let istask = null;
          let ischecked;
          if (this.options.gfm) {
            istask = this.rules.other.listIsTask.exec(itemContents);
            if (istask) {
              ischecked = istask[0] !== "[ ] ";
              itemContents = itemContents.replace(this.rules.other.listReplaceTask, "");
            }
          }
          list2.items.push({
            type: "list_item",
            raw,
            task: !!istask,
            checked: ischecked,
            loose: false,
            text: itemContents,
            tokens: []
          });
          list2.raw += raw;
        }
        const lastItem = list2.items.at(-1);
        if (lastItem) {
          lastItem.raw = lastItem.raw.trimEnd();
          lastItem.text = lastItem.text.trimEnd();
        } else {
          return;
        }
        list2.raw = list2.raw.trimEnd();
        for (let i = 0; i < list2.items.length; i++) {
          this.lexer.state.top = false;
          list2.items[i].tokens = this.lexer.blockTokens(list2.items[i].text, []);
          if (!list2.loose) {
            const spacers = list2.items[i].tokens.filter((t) => t.type === "space");
            const hasMultipleLineBreaks = spacers.length > 0 && spacers.some((t) => this.rules.other.anyLine.test(t.raw));
            list2.loose = hasMultipleLineBreaks;
          }
        }
        if (list2.loose) {
          for (let i = 0; i < list2.items.length; i++) {
            list2.items[i].loose = true;
          }
        }
        return list2;
      }
    }
    html(src) {
      const cap = this.rules.block.html.exec(src);
      if (cap) {
        const token = {
          type: "html",
          block: true,
          raw: cap[0],
          pre: cap[1] === "pre" || cap[1] === "script" || cap[1] === "style",
          text: cap[0]
        };
        return token;
      }
    }
    def(src) {
      const cap = this.rules.block.def.exec(src);
      if (cap) {
        const tag2 = cap[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " ");
        const href = cap[2] ? cap[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "";
        const title = cap[3] ? cap[3].substring(1, cap[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : cap[3];
        return {
          type: "def",
          tag: tag2,
          raw: cap[0],
          href,
          title
        };
      }
    }
    table(src) {
      var _a2;
      const cap = this.rules.block.table.exec(src);
      if (!cap) {
        return;
      }
      if (!this.rules.other.tableDelimiter.test(cap[2])) {
        return;
      }
      const headers = splitCells(cap[1]);
      const aligns = cap[2].replace(this.rules.other.tableAlignChars, "").split("|");
      const rows = ((_a2 = cap[3]) == null ? void 0 : _a2.trim()) ? cap[3].replace(this.rules.other.tableRowBlankLine, "").split("\n") : [];
      const item = {
        type: "table",
        raw: cap[0],
        header: [],
        align: [],
        rows: []
      };
      if (headers.length !== aligns.length) {
        return;
      }
      for (const align of aligns) {
        if (this.rules.other.tableAlignRight.test(align)) {
          item.align.push("right");
        } else if (this.rules.other.tableAlignCenter.test(align)) {
          item.align.push("center");
        } else if (this.rules.other.tableAlignLeft.test(align)) {
          item.align.push("left");
        } else {
          item.align.push(null);
        }
      }
      for (let i = 0; i < headers.length; i++) {
        item.header.push({
          text: headers[i],
          tokens: this.lexer.inline(headers[i]),
          header: true,
          align: item.align[i]
        });
      }
      for (const row of rows) {
        item.rows.push(splitCells(row, item.header.length).map((cell, i) => {
          return {
            text: cell,
            tokens: this.lexer.inline(cell),
            header: false,
            align: item.align[i]
          };
        }));
      }
      return item;
    }
    lheading(src) {
      const cap = this.rules.block.lheading.exec(src);
      if (cap) {
        return {
          type: "heading",
          raw: cap[0],
          depth: cap[2].charAt(0) === "=" ? 1 : 2,
          text: cap[1],
          tokens: this.lexer.inline(cap[1])
        };
      }
    }
    paragraph(src) {
      const cap = this.rules.block.paragraph.exec(src);
      if (cap) {
        const text = cap[1].charAt(cap[1].length - 1) === "\n" ? cap[1].slice(0, -1) : cap[1];
        return {
          type: "paragraph",
          raw: cap[0],
          text,
          tokens: this.lexer.inline(text)
        };
      }
    }
    text(src) {
      const cap = this.rules.block.text.exec(src);
      if (cap) {
        return {
          type: "text",
          raw: cap[0],
          text: cap[0],
          tokens: this.lexer.inline(cap[0])
        };
      }
    }
    escape(src) {
      const cap = this.rules.inline.escape.exec(src);
      if (cap) {
        return {
          type: "escape",
          raw: cap[0],
          text: cap[1]
        };
      }
    }
    tag(src) {
      const cap = this.rules.inline.tag.exec(src);
      if (cap) {
        if (!this.lexer.state.inLink && this.rules.other.startATag.test(cap[0])) {
          this.lexer.state.inLink = true;
        } else if (this.lexer.state.inLink && this.rules.other.endATag.test(cap[0])) {
          this.lexer.state.inLink = false;
        }
        if (!this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(cap[0])) {
          this.lexer.state.inRawBlock = true;
        } else if (this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(cap[0])) {
          this.lexer.state.inRawBlock = false;
        }
        return {
          type: "html",
          raw: cap[0],
          inLink: this.lexer.state.inLink,
          inRawBlock: this.lexer.state.inRawBlock,
          block: false,
          text: cap[0]
        };
      }
    }
    link(src) {
      const cap = this.rules.inline.link.exec(src);
      if (cap) {
        const trimmedUrl = cap[2].trim();
        if (!this.options.pedantic && this.rules.other.startAngleBracket.test(trimmedUrl)) {
          if (!this.rules.other.endAngleBracket.test(trimmedUrl)) {
            return;
          }
          const rtrimSlash = rtrim(trimmedUrl.slice(0, -1), "\\");
          if ((trimmedUrl.length - rtrimSlash.length) % 2 === 0) {
            return;
          }
        } else {
          const lastParenIndex = findClosingBracket(cap[2], "()");
          if (lastParenIndex === -2) {
            return;
          }
          if (lastParenIndex > -1) {
            const start = cap[0].indexOf("!") === 0 ? 5 : 4;
            const linkLen = start + cap[1].length + lastParenIndex;
            cap[2] = cap[2].substring(0, lastParenIndex);
            cap[0] = cap[0].substring(0, linkLen).trim();
            cap[3] = "";
          }
        }
        let href = cap[2];
        let title = "";
        if (this.options.pedantic) {
          const link2 = this.rules.other.pedanticHrefTitle.exec(href);
          if (link2) {
            href = link2[1];
            title = link2[3];
          }
        } else {
          title = cap[3] ? cap[3].slice(1, -1) : "";
        }
        href = href.trim();
        if (this.rules.other.startAngleBracket.test(href)) {
          if (this.options.pedantic && !this.rules.other.endAngleBracket.test(trimmedUrl)) {
            href = href.slice(1);
          } else {
            href = href.slice(1, -1);
          }
        }
        return outputLink(cap, {
          href: href ? href.replace(this.rules.inline.anyPunctuation, "$1") : href,
          title: title ? title.replace(this.rules.inline.anyPunctuation, "$1") : title
        }, cap[0], this.lexer, this.rules);
      }
    }
    reflink(src, links) {
      let cap;
      if ((cap = this.rules.inline.reflink.exec(src)) || (cap = this.rules.inline.nolink.exec(src))) {
        const linkString = (cap[2] || cap[1]).replace(this.rules.other.multipleSpaceGlobal, " ");
        const link2 = links[linkString.toLowerCase()];
        if (!link2) {
          const text = cap[0].charAt(0);
          return {
            type: "text",
            raw: text,
            text
          };
        }
        return outputLink(cap, link2, cap[0], this.lexer, this.rules);
      }
    }
    emStrong(src, maskedSrc, prevChar = "") {
      let match = this.rules.inline.emStrongLDelim.exec(src);
      if (!match)
        return;
      if (match[3] && prevChar.match(this.rules.other.unicodeAlphaNumeric))
        return;
      const nextChar = match[1] || match[2] || "";
      if (!nextChar || !prevChar || this.rules.inline.punctuation.exec(prevChar)) {
        const lLength = [...match[0]].length - 1;
        let rDelim, rLength, delimTotal = lLength, midDelimTotal = 0;
        const endReg = match[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
        endReg.lastIndex = 0;
        maskedSrc = maskedSrc.slice(-1 * src.length + lLength);
        while ((match = endReg.exec(maskedSrc)) != null) {
          rDelim = match[1] || match[2] || match[3] || match[4] || match[5] || match[6];
          if (!rDelim)
            continue;
          rLength = [...rDelim].length;
          if (match[3] || match[4]) {
            delimTotal += rLength;
            continue;
          } else if (match[5] || match[6]) {
            if (lLength % 3 && !((lLength + rLength) % 3)) {
              midDelimTotal += rLength;
              continue;
            }
          }
          delimTotal -= rLength;
          if (delimTotal > 0)
            continue;
          rLength = Math.min(rLength, rLength + delimTotal + midDelimTotal);
          const lastCharLength = [...match[0]][0].length;
          const raw = src.slice(0, lLength + match.index + lastCharLength + rLength);
          if (Math.min(lLength, rLength) % 2) {
            const text2 = raw.slice(1, -1);
            return {
              type: "em",
              raw,
              text: text2,
              tokens: this.lexer.inlineTokens(text2)
            };
          }
          const text = raw.slice(2, -2);
          return {
            type: "strong",
            raw,
            text,
            tokens: this.lexer.inlineTokens(text)
          };
        }
      }
    }
    codespan(src) {
      const cap = this.rules.inline.code.exec(src);
      if (cap) {
        let text = cap[2].replace(this.rules.other.newLineCharGlobal, " ");
        const hasNonSpaceChars = this.rules.other.nonSpaceChar.test(text);
        const hasSpaceCharsOnBothEnds = this.rules.other.startingSpaceChar.test(text) && this.rules.other.endingSpaceChar.test(text);
        if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) {
          text = text.substring(1, text.length - 1);
        }
        return {
          type: "codespan",
          raw: cap[0],
          text
        };
      }
    }
    br(src) {
      const cap = this.rules.inline.br.exec(src);
      if (cap) {
        return {
          type: "br",
          raw: cap[0]
        };
      }
    }
    del(src) {
      const cap = this.rules.inline.del.exec(src);
      if (cap) {
        return {
          type: "del",
          raw: cap[0],
          text: cap[2],
          tokens: this.lexer.inlineTokens(cap[2])
        };
      }
    }
    autolink(src) {
      const cap = this.rules.inline.autolink.exec(src);
      if (cap) {
        let text, href;
        if (cap[2] === "@") {
          text = cap[1];
          href = "mailto:" + text;
        } else {
          text = cap[1];
          href = text;
        }
        return {
          type: "link",
          raw: cap[0],
          text,
          href,
          tokens: [
            {
              type: "text",
              raw: text,
              text
            }
          ]
        };
      }
    }
    url(src) {
      var _a2;
      let cap;
      if (cap = this.rules.inline.url.exec(src)) {
        let text, href;
        if (cap[2] === "@") {
          text = cap[0];
          href = "mailto:" + text;
        } else {
          let prevCapZero;
          do {
            prevCapZero = cap[0];
            cap[0] = ((_a2 = this.rules.inline._backpedal.exec(cap[0])) == null ? void 0 : _a2[0]) ?? "";
          } while (prevCapZero !== cap[0]);
          text = cap[0];
          if (cap[1] === "www.") {
            href = "http://" + cap[0];
          } else {
            href = cap[0];
          }
        }
        return {
          type: "link",
          raw: cap[0],
          text,
          href,
          tokens: [
            {
              type: "text",
              raw: text,
              text
            }
          ]
        };
      }
    }
    inlineText(src) {
      const cap = this.rules.inline.text.exec(src);
      if (cap) {
        const escaped = this.lexer.state.inRawBlock;
        return {
          type: "text",
          raw: cap[0],
          text: cap[0],
          escaped
        };
      }
    }
  };
  var _Lexer = class __Lexer {
    constructor(options2) {
      __publicField(this, "tokens");
      __publicField(this, "options");
      __publicField(this, "state");
      __publicField(this, "tokenizer");
      __publicField(this, "inlineQueue");
      this.tokens = [];
      this.tokens.links = /* @__PURE__ */ Object.create(null);
      this.options = options2 || _defaults;
      this.options.tokenizer = this.options.tokenizer || new _Tokenizer();
      this.tokenizer = this.options.tokenizer;
      this.tokenizer.options = this.options;
      this.tokenizer.lexer = this;
      this.inlineQueue = [];
      this.state = {
        inLink: false,
        inRawBlock: false,
        top: true
      };
      const rules = {
        other,
        block: block.normal,
        inline: inline.normal
      };
      if (this.options.pedantic) {
        rules.block = block.pedantic;
        rules.inline = inline.pedantic;
      } else if (this.options.gfm) {
        rules.block = block.gfm;
        if (this.options.breaks) {
          rules.inline = inline.breaks;
        } else {
          rules.inline = inline.gfm;
        }
      }
      this.tokenizer.rules = rules;
    }
    /**
     * Expose Rules
     */
    static get rules() {
      return {
        block,
        inline
      };
    }
    /**
     * Static Lex Method
     */
    static lex(src, options2) {
      const lexer2 = new __Lexer(options2);
      return lexer2.lex(src);
    }
    /**
     * Static Lex Inline Method
     */
    static lexInline(src, options2) {
      const lexer2 = new __Lexer(options2);
      return lexer2.inlineTokens(src);
    }
    /**
     * Preprocessing
     */
    lex(src) {
      src = src.replace(other.carriageReturn, "\n");
      this.blockTokens(src, this.tokens);
      for (let i = 0; i < this.inlineQueue.length; i++) {
        const next = this.inlineQueue[i];
        this.inlineTokens(next.src, next.tokens);
      }
      this.inlineQueue = [];
      return this.tokens;
    }
    blockTokens(src, tokens = [], lastParagraphClipped = false) {
      var _a2, _b, _c;
      if (this.options.pedantic) {
        src = src.replace(other.tabCharGlobal, "    ").replace(other.spaceLine, "");
      }
      while (src) {
        let token;
        if ((_b = (_a2 = this.options.extensions) == null ? void 0 : _a2.block) == null ? void 0 : _b.some((extTokenizer) => {
          if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            return true;
          }
          return false;
        })) {
          continue;
        }
        if (token = this.tokenizer.space(src)) {
          src = src.substring(token.raw.length);
          const lastToken = tokens.at(-1);
          if (token.raw.length === 1 && lastToken !== void 0) {
            lastToken.raw += "\n";
          } else {
            tokens.push(token);
          }
          continue;
        }
        if (token = this.tokenizer.code(src)) {
          src = src.substring(token.raw.length);
          const lastToken = tokens.at(-1);
          if ((lastToken == null ? void 0 : lastToken.type) === "paragraph" || (lastToken == null ? void 0 : lastToken.type) === "text") {
            lastToken.raw += "\n" + token.raw;
            lastToken.text += "\n" + token.text;
            this.inlineQueue.at(-1).src = lastToken.text;
          } else {
            tokens.push(token);
          }
          continue;
        }
        if (token = this.tokenizer.fences(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.heading(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.hr(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.blockquote(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.list(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.html(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.def(src)) {
          src = src.substring(token.raw.length);
          const lastToken = tokens.at(-1);
          if ((lastToken == null ? void 0 : lastToken.type) === "paragraph" || (lastToken == null ? void 0 : lastToken.type) === "text") {
            lastToken.raw += "\n" + token.raw;
            lastToken.text += "\n" + token.raw;
            this.inlineQueue.at(-1).src = lastToken.text;
          } else if (!this.tokens.links[token.tag]) {
            this.tokens.links[token.tag] = {
              href: token.href,
              title: token.title
            };
          }
          continue;
        }
        if (token = this.tokenizer.table(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.lheading(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        let cutSrc = src;
        if ((_c = this.options.extensions) == null ? void 0 : _c.startBlock) {
          let startIndex = Infinity;
          const tempSrc = src.slice(1);
          let tempStart;
          this.options.extensions.startBlock.forEach((getStartIndex) => {
            tempStart = getStartIndex.call({ lexer: this }, tempSrc);
            if (typeof tempStart === "number" && tempStart >= 0) {
              startIndex = Math.min(startIndex, tempStart);
            }
          });
          if (startIndex < Infinity && startIndex >= 0) {
            cutSrc = src.substring(0, startIndex + 1);
          }
        }
        if (this.state.top && (token = this.tokenizer.paragraph(cutSrc))) {
          const lastToken = tokens.at(-1);
          if (lastParagraphClipped && (lastToken == null ? void 0 : lastToken.type) === "paragraph") {
            lastToken.raw += "\n" + token.raw;
            lastToken.text += "\n" + token.text;
            this.inlineQueue.pop();
            this.inlineQueue.at(-1).src = lastToken.text;
          } else {
            tokens.push(token);
          }
          lastParagraphClipped = cutSrc.length !== src.length;
          src = src.substring(token.raw.length);
          continue;
        }
        if (token = this.tokenizer.text(src)) {
          src = src.substring(token.raw.length);
          const lastToken = tokens.at(-1);
          if ((lastToken == null ? void 0 : lastToken.type) === "text") {
            lastToken.raw += "\n" + token.raw;
            lastToken.text += "\n" + token.text;
            this.inlineQueue.pop();
            this.inlineQueue.at(-1).src = lastToken.text;
          } else {
            tokens.push(token);
          }
          continue;
        }
        if (src) {
          const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
          if (this.options.silent) {
            console.error(errMsg);
            break;
          } else {
            throw new Error(errMsg);
          }
        }
      }
      this.state.top = true;
      return tokens;
    }
    inline(src, tokens = []) {
      this.inlineQueue.push({ src, tokens });
      return tokens;
    }
    /**
     * Lexing/Compiling
     */
    inlineTokens(src, tokens = []) {
      var _a2, _b, _c;
      let maskedSrc = src;
      let match = null;
      if (this.tokens.links) {
        const links = Object.keys(this.tokens.links);
        if (links.length > 0) {
          while ((match = this.tokenizer.rules.inline.reflinkSearch.exec(maskedSrc)) != null) {
            if (links.includes(match[0].slice(match[0].lastIndexOf("[") + 1, -1))) {
              maskedSrc = maskedSrc.slice(0, match.index) + "[" + "a".repeat(match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex);
            }
          }
        }
      }
      while ((match = this.tokenizer.rules.inline.anyPunctuation.exec(maskedSrc)) != null) {
        maskedSrc = maskedSrc.slice(0, match.index) + "++" + maskedSrc.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
      }
      while ((match = this.tokenizer.rules.inline.blockSkip.exec(maskedSrc)) != null) {
        maskedSrc = maskedSrc.slice(0, match.index) + "[" + "a".repeat(match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
      }
      let keepPrevChar = false;
      let prevChar = "";
      while (src) {
        if (!keepPrevChar) {
          prevChar = "";
        }
        keepPrevChar = false;
        let token;
        if ((_b = (_a2 = this.options.extensions) == null ? void 0 : _a2.inline) == null ? void 0 : _b.some((extTokenizer) => {
          if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            return true;
          }
          return false;
        })) {
          continue;
        }
        if (token = this.tokenizer.escape(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.tag(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.link(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.reflink(src, this.tokens.links)) {
          src = src.substring(token.raw.length);
          const lastToken = tokens.at(-1);
          if (token.type === "text" && (lastToken == null ? void 0 : lastToken.type) === "text") {
            lastToken.raw += token.raw;
            lastToken.text += token.text;
          } else {
            tokens.push(token);
          }
          continue;
        }
        if (token = this.tokenizer.emStrong(src, maskedSrc, prevChar)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.codespan(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.br(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.del(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.autolink(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (!this.state.inLink && (token = this.tokenizer.url(src))) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        let cutSrc = src;
        if ((_c = this.options.extensions) == null ? void 0 : _c.startInline) {
          let startIndex = Infinity;
          const tempSrc = src.slice(1);
          let tempStart;
          this.options.extensions.startInline.forEach((getStartIndex) => {
            tempStart = getStartIndex.call({ lexer: this }, tempSrc);
            if (typeof tempStart === "number" && tempStart >= 0) {
              startIndex = Math.min(startIndex, tempStart);
            }
          });
          if (startIndex < Infinity && startIndex >= 0) {
            cutSrc = src.substring(0, startIndex + 1);
          }
        }
        if (token = this.tokenizer.inlineText(cutSrc)) {
          src = src.substring(token.raw.length);
          if (token.raw.slice(-1) !== "_") {
            prevChar = token.raw.slice(-1);
          }
          keepPrevChar = true;
          const lastToken = tokens.at(-1);
          if ((lastToken == null ? void 0 : lastToken.type) === "text") {
            lastToken.raw += token.raw;
            lastToken.text += token.text;
          } else {
            tokens.push(token);
          }
          continue;
        }
        if (src) {
          const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
          if (this.options.silent) {
            console.error(errMsg);
            break;
          } else {
            throw new Error(errMsg);
          }
        }
      }
      return tokens;
    }
  };
  var _Renderer = class {
    // set by the parser
    constructor(options2) {
      __publicField(this, "options");
      __publicField(this, "parser");
      this.options = options2 || _defaults;
    }
    space(token) {
      return "";
    }
    code({ text, lang, escaped }) {
      var _a2;
      const langString = (_a2 = (lang || "").match(other.notSpaceStart)) == null ? void 0 : _a2[0];
      const code = text.replace(other.endingNewline, "") + "\n";
      if (!langString) {
        return "<pre><code>" + (escaped ? code : escape2(code, true)) + "</code></pre>\n";
      }
      return '<pre><code class="language-' + escape2(langString) + '">' + (escaped ? code : escape2(code, true)) + "</code></pre>\n";
    }
    blockquote({ tokens }) {
      const body = this.parser.parse(tokens);
      return `<blockquote>
${body}</blockquote>
`;
    }
    html({ text }) {
      return text;
    }
    heading({ tokens, depth }) {
      return `<h${depth}>${this.parser.parseInline(tokens)}</h${depth}>
`;
    }
    hr(token) {
      return "<hr>\n";
    }
    list(token) {
      const ordered = token.ordered;
      const start = token.start;
      let body = "";
      for (let j = 0; j < token.items.length; j++) {
        const item = token.items[j];
        body += this.listitem(item);
      }
      const type = ordered ? "ol" : "ul";
      const startAttr = ordered && start !== 1 ? ' start="' + start + '"' : "";
      return "<" + type + startAttr + ">\n" + body + "</" + type + ">\n";
    }
    listitem(item) {
      var _a2;
      let itemBody = "";
      if (item.task) {
        const checkbox = this.checkbox({ checked: !!item.checked });
        if (item.loose) {
          if (((_a2 = item.tokens[0]) == null ? void 0 : _a2.type) === "paragraph") {
            item.tokens[0].text = checkbox + " " + item.tokens[0].text;
            if (item.tokens[0].tokens && item.tokens[0].tokens.length > 0 && item.tokens[0].tokens[0].type === "text") {
              item.tokens[0].tokens[0].text = checkbox + " " + escape2(item.tokens[0].tokens[0].text);
              item.tokens[0].tokens[0].escaped = true;
            }
          } else {
            item.tokens.unshift({
              type: "text",
              raw: checkbox + " ",
              text: checkbox + " ",
              escaped: true
            });
          }
        } else {
          itemBody += checkbox + " ";
        }
      }
      itemBody += this.parser.parse(item.tokens, !!item.loose);
      return `<li>${itemBody}</li>
`;
    }
    checkbox({ checked }) {
      return "<input " + (checked ? 'checked="" ' : "") + 'disabled="" type="checkbox">';
    }
    paragraph({ tokens }) {
      return `<p>${this.parser.parseInline(tokens)}</p>
`;
    }
    table(token) {
      let header = "";
      let cell = "";
      for (let j = 0; j < token.header.length; j++) {
        cell += this.tablecell(token.header[j]);
      }
      header += this.tablerow({ text: cell });
      let body = "";
      for (let j = 0; j < token.rows.length; j++) {
        const row = token.rows[j];
        cell = "";
        for (let k = 0; k < row.length; k++) {
          cell += this.tablecell(row[k]);
        }
        body += this.tablerow({ text: cell });
      }
      if (body)
        body = `<tbody>${body}</tbody>`;
      return "<table>\n<thead>\n" + header + "</thead>\n" + body + "</table>\n";
    }
    tablerow({ text }) {
      return `<tr>
${text}</tr>
`;
    }
    tablecell(token) {
      const content = this.parser.parseInline(token.tokens);
      const type = token.header ? "th" : "td";
      const tag2 = token.align ? `<${type} align="${token.align}">` : `<${type}>`;
      return tag2 + content + `</${type}>
`;
    }
    /**
     * span level renderer
     */
    strong({ tokens }) {
      return `<strong>${this.parser.parseInline(tokens)}</strong>`;
    }
    em({ tokens }) {
      return `<em>${this.parser.parseInline(tokens)}</em>`;
    }
    codespan({ text }) {
      return `<code>${escape2(text, true)}</code>`;
    }
    br(token) {
      return "<br>";
    }
    del({ tokens }) {
      return `<del>${this.parser.parseInline(tokens)}</del>`;
    }
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens);
      const cleanHref = cleanUrl(href);
      if (cleanHref === null) {
        return text;
      }
      href = cleanHref;
      let out = '<a href="' + href + '"';
      if (title) {
        out += ' title="' + escape2(title) + '"';
      }
      out += ">" + text + "</a>";
      return out;
    }
    image({ href, title, text, tokens }) {
      if (tokens) {
        text = this.parser.parseInline(tokens, this.parser.textRenderer);
      }
      const cleanHref = cleanUrl(href);
      if (cleanHref === null) {
        return escape2(text);
      }
      href = cleanHref;
      let out = `<img src="${href}" alt="${text}"`;
      if (title) {
        out += ` title="${escape2(title)}"`;
      }
      out += ">";
      return out;
    }
    text(token) {
      return "tokens" in token && token.tokens ? this.parser.parseInline(token.tokens) : "escaped" in token && token.escaped ? token.text : escape2(token.text);
    }
  };
  var _TextRenderer = class {
    // no need for block level renderers
    strong({ text }) {
      return text;
    }
    em({ text }) {
      return text;
    }
    codespan({ text }) {
      return text;
    }
    del({ text }) {
      return text;
    }
    html({ text }) {
      return text;
    }
    text({ text }) {
      return text;
    }
    link({ text }) {
      return "" + text;
    }
    image({ text }) {
      return "" + text;
    }
    br() {
      return "";
    }
  };
  var _Parser = class __Parser {
    constructor(options2) {
      __publicField(this, "options");
      __publicField(this, "renderer");
      __publicField(this, "textRenderer");
      this.options = options2 || _defaults;
      this.options.renderer = this.options.renderer || new _Renderer();
      this.renderer = this.options.renderer;
      this.renderer.options = this.options;
      this.renderer.parser = this;
      this.textRenderer = new _TextRenderer();
    }
    /**
     * Static Parse Method
     */
    static parse(tokens, options2) {
      const parser2 = new __Parser(options2);
      return parser2.parse(tokens);
    }
    /**
     * Static Parse Inline Method
     */
    static parseInline(tokens, options2) {
      const parser2 = new __Parser(options2);
      return parser2.parseInline(tokens);
    }
    /**
     * Parse Loop
     */
    parse(tokens, top = true) {
      var _a2, _b;
      let out = "";
      for (let i = 0; i < tokens.length; i++) {
        const anyToken = tokens[i];
        if ((_b = (_a2 = this.options.extensions) == null ? void 0 : _a2.renderers) == null ? void 0 : _b[anyToken.type]) {
          const genericToken = anyToken;
          const ret = this.options.extensions.renderers[genericToken.type].call({ parser: this }, genericToken);
          if (ret !== false || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(genericToken.type)) {
            out += ret || "";
            continue;
          }
        }
        const token = anyToken;
        switch (token.type) {
          case "space": {
            out += this.renderer.space(token);
            continue;
          }
          case "hr": {
            out += this.renderer.hr(token);
            continue;
          }
          case "heading": {
            out += this.renderer.heading(token);
            continue;
          }
          case "code": {
            out += this.renderer.code(token);
            continue;
          }
          case "table": {
            out += this.renderer.table(token);
            continue;
          }
          case "blockquote": {
            out += this.renderer.blockquote(token);
            continue;
          }
          case "list": {
            out += this.renderer.list(token);
            continue;
          }
          case "html": {
            out += this.renderer.html(token);
            continue;
          }
          case "paragraph": {
            out += this.renderer.paragraph(token);
            continue;
          }
          case "text": {
            let textToken = token;
            let body = this.renderer.text(textToken);
            while (i + 1 < tokens.length && tokens[i + 1].type === "text") {
              textToken = tokens[++i];
              body += "\n" + this.renderer.text(textToken);
            }
            if (top) {
              out += this.renderer.paragraph({
                type: "paragraph",
                raw: body,
                text: body,
                tokens: [{ type: "text", raw: body, text: body, escaped: true }]
              });
            } else {
              out += body;
            }
            continue;
          }
          default: {
            const errMsg = 'Token with "' + token.type + '" type was not found.';
            if (this.options.silent) {
              console.error(errMsg);
              return "";
            } else {
              throw new Error(errMsg);
            }
          }
        }
      }
      return out;
    }
    /**
     * Parse Inline Tokens
     */
    parseInline(tokens, renderer = this.renderer) {
      var _a2, _b;
      let out = "";
      for (let i = 0; i < tokens.length; i++) {
        const anyToken = tokens[i];
        if ((_b = (_a2 = this.options.extensions) == null ? void 0 : _a2.renderers) == null ? void 0 : _b[anyToken.type]) {
          const ret = this.options.extensions.renderers[anyToken.type].call({ parser: this }, anyToken);
          if (ret !== false || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(anyToken.type)) {
            out += ret || "";
            continue;
          }
        }
        const token = anyToken;
        switch (token.type) {
          case "escape": {
            out += renderer.text(token);
            break;
          }
          case "html": {
            out += renderer.html(token);
            break;
          }
          case "link": {
            out += renderer.link(token);
            break;
          }
          case "image": {
            out += renderer.image(token);
            break;
          }
          case "strong": {
            out += renderer.strong(token);
            break;
          }
          case "em": {
            out += renderer.em(token);
            break;
          }
          case "codespan": {
            out += renderer.codespan(token);
            break;
          }
          case "br": {
            out += renderer.br(token);
            break;
          }
          case "del": {
            out += renderer.del(token);
            break;
          }
          case "text": {
            out += renderer.text(token);
            break;
          }
          default: {
            const errMsg = 'Token with "' + token.type + '" type was not found.';
            if (this.options.silent) {
              console.error(errMsg);
              return "";
            } else {
              throw new Error(errMsg);
            }
          }
        }
      }
      return out;
    }
  };
  var _Hooks = (_a = class {
    constructor(options2) {
      __publicField(this, "options");
      __publicField(this, "block");
      this.options = options2 || _defaults;
    }
    /**
     * Process markdown before marked
     */
    preprocess(markdown) {
      return markdown;
    }
    /**
     * Process HTML after marked is finished
     */
    postprocess(html2) {
      return html2;
    }
    /**
     * Process all tokens before walk tokens
     */
    processAllTokens(tokens) {
      return tokens;
    }
    /**
     * Provide function to tokenize markdown
     */
    provideLexer() {
      return this.block ? _Lexer.lex : _Lexer.lexInline;
    }
    /**
     * Provide function to parse tokens
     */
    provideParser() {
      return this.block ? _Parser.parse : _Parser.parseInline;
    }
  }, __publicField(_a, "passThroughHooks", /* @__PURE__ */ new Set([
    "preprocess",
    "postprocess",
    "processAllTokens"
  ])), _a);
  var Marked = class {
    constructor(...args) {
      __publicField(this, "defaults", _getDefaults());
      __publicField(this, "options", this.setOptions);
      __publicField(this, "parse", this.parseMarkdown(true));
      __publicField(this, "parseInline", this.parseMarkdown(false));
      __publicField(this, "Parser", _Parser);
      __publicField(this, "Renderer", _Renderer);
      __publicField(this, "TextRenderer", _TextRenderer);
      __publicField(this, "Lexer", _Lexer);
      __publicField(this, "Tokenizer", _Tokenizer);
      __publicField(this, "Hooks", _Hooks);
      this.use(...args);
    }
    /**
     * Run callback for every token
     */
    walkTokens(tokens, callback) {
      var _a2, _b;
      let values = [];
      for (const token of tokens) {
        values = values.concat(callback.call(this, token));
        switch (token.type) {
          case "table": {
            const tableToken = token;
            for (const cell of tableToken.header) {
              values = values.concat(this.walkTokens(cell.tokens, callback));
            }
            for (const row of tableToken.rows) {
              for (const cell of row) {
                values = values.concat(this.walkTokens(cell.tokens, callback));
              }
            }
            break;
          }
          case "list": {
            const listToken = token;
            values = values.concat(this.walkTokens(listToken.items, callback));
            break;
          }
          default: {
            const genericToken = token;
            if ((_b = (_a2 = this.defaults.extensions) == null ? void 0 : _a2.childTokens) == null ? void 0 : _b[genericToken.type]) {
              this.defaults.extensions.childTokens[genericToken.type].forEach((childTokens) => {
                const tokens2 = genericToken[childTokens].flat(Infinity);
                values = values.concat(this.walkTokens(tokens2, callback));
              });
            } else if (genericToken.tokens) {
              values = values.concat(this.walkTokens(genericToken.tokens, callback));
            }
          }
        }
      }
      return values;
    }
    use(...args) {
      const extensions = this.defaults.extensions || { renderers: {}, childTokens: {} };
      args.forEach((pack) => {
        const opts = { ...pack };
        opts.async = this.defaults.async || opts.async || false;
        if (pack.extensions) {
          pack.extensions.forEach((ext) => {
            if (!ext.name) {
              throw new Error("extension name required");
            }
            if ("renderer" in ext) {
              const prevRenderer = extensions.renderers[ext.name];
              if (prevRenderer) {
                extensions.renderers[ext.name] = function(...args2) {
                  let ret = ext.renderer.apply(this, args2);
                  if (ret === false) {
                    ret = prevRenderer.apply(this, args2);
                  }
                  return ret;
                };
              } else {
                extensions.renderers[ext.name] = ext.renderer;
              }
            }
            if ("tokenizer" in ext) {
              if (!ext.level || ext.level !== "block" && ext.level !== "inline") {
                throw new Error("extension level must be 'block' or 'inline'");
              }
              const extLevel = extensions[ext.level];
              if (extLevel) {
                extLevel.unshift(ext.tokenizer);
              } else {
                extensions[ext.level] = [ext.tokenizer];
              }
              if (ext.start) {
                if (ext.level === "block") {
                  if (extensions.startBlock) {
                    extensions.startBlock.push(ext.start);
                  } else {
                    extensions.startBlock = [ext.start];
                  }
                } else if (ext.level === "inline") {
                  if (extensions.startInline) {
                    extensions.startInline.push(ext.start);
                  } else {
                    extensions.startInline = [ext.start];
                  }
                }
              }
            }
            if ("childTokens" in ext && ext.childTokens) {
              extensions.childTokens[ext.name] = ext.childTokens;
            }
          });
          opts.extensions = extensions;
        }
        if (pack.renderer) {
          const renderer = this.defaults.renderer || new _Renderer(this.defaults);
          for (const prop in pack.renderer) {
            if (!(prop in renderer)) {
              throw new Error(`renderer '${prop}' does not exist`);
            }
            if (["options", "parser"].includes(prop)) {
              continue;
            }
            const rendererProp = prop;
            const rendererFunc = pack.renderer[rendererProp];
            const prevRenderer = renderer[rendererProp];
            renderer[rendererProp] = (...args2) => {
              let ret = rendererFunc.apply(renderer, args2);
              if (ret === false) {
                ret = prevRenderer.apply(renderer, args2);
              }
              return ret || "";
            };
          }
          opts.renderer = renderer;
        }
        if (pack.tokenizer) {
          const tokenizer = this.defaults.tokenizer || new _Tokenizer(this.defaults);
          for (const prop in pack.tokenizer) {
            if (!(prop in tokenizer)) {
              throw new Error(`tokenizer '${prop}' does not exist`);
            }
            if (["options", "rules", "lexer"].includes(prop)) {
              continue;
            }
            const tokenizerProp = prop;
            const tokenizerFunc = pack.tokenizer[tokenizerProp];
            const prevTokenizer = tokenizer[tokenizerProp];
            tokenizer[tokenizerProp] = (...args2) => {
              let ret = tokenizerFunc.apply(tokenizer, args2);
              if (ret === false) {
                ret = prevTokenizer.apply(tokenizer, args2);
              }
              return ret;
            };
          }
          opts.tokenizer = tokenizer;
        }
        if (pack.hooks) {
          const hooks = this.defaults.hooks || new _Hooks();
          for (const prop in pack.hooks) {
            if (!(prop in hooks)) {
              throw new Error(`hook '${prop}' does not exist`);
            }
            if (["options", "block"].includes(prop)) {
              continue;
            }
            const hooksProp = prop;
            const hooksFunc = pack.hooks[hooksProp];
            const prevHook = hooks[hooksProp];
            if (_Hooks.passThroughHooks.has(prop)) {
              hooks[hooksProp] = (arg) => {
                if (this.defaults.async) {
                  return Promise.resolve(hooksFunc.call(hooks, arg)).then((ret2) => {
                    return prevHook.call(hooks, ret2);
                  });
                }
                const ret = hooksFunc.call(hooks, arg);
                return prevHook.call(hooks, ret);
              };
            } else {
              hooks[hooksProp] = (...args2) => {
                let ret = hooksFunc.apply(hooks, args2);
                if (ret === false) {
                  ret = prevHook.apply(hooks, args2);
                }
                return ret;
              };
            }
          }
          opts.hooks = hooks;
        }
        if (pack.walkTokens) {
          const walkTokens2 = this.defaults.walkTokens;
          const packWalktokens = pack.walkTokens;
          opts.walkTokens = function(token) {
            let values = [];
            values.push(packWalktokens.call(this, token));
            if (walkTokens2) {
              values = values.concat(walkTokens2.call(this, token));
            }
            return values;
          };
        }
        this.defaults = { ...this.defaults, ...opts };
      });
      return this;
    }
    setOptions(opt) {
      this.defaults = { ...this.defaults, ...opt };
      return this;
    }
    lexer(src, options2) {
      return _Lexer.lex(src, options2 ?? this.defaults);
    }
    parser(tokens, options2) {
      return _Parser.parse(tokens, options2 ?? this.defaults);
    }
    parseMarkdown(blockType) {
      const parse2 = (src, options2) => {
        const origOpt = { ...options2 };
        const opt = { ...this.defaults, ...origOpt };
        const throwError = this.onError(!!opt.silent, !!opt.async);
        if (this.defaults.async === true && origOpt.async === false) {
          return throwError(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
        }
        if (typeof src === "undefined" || src === null) {
          return throwError(new Error("marked(): input parameter is undefined or null"));
        }
        if (typeof src !== "string") {
          return throwError(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(src) + ", string expected"));
        }
        if (opt.hooks) {
          opt.hooks.options = opt;
          opt.hooks.block = blockType;
        }
        const lexer2 = opt.hooks ? opt.hooks.provideLexer() : blockType ? _Lexer.lex : _Lexer.lexInline;
        const parser2 = opt.hooks ? opt.hooks.provideParser() : blockType ? _Parser.parse : _Parser.parseInline;
        if (opt.async) {
          return Promise.resolve(opt.hooks ? opt.hooks.preprocess(src) : src).then((src2) => lexer2(src2, opt)).then((tokens) => opt.hooks ? opt.hooks.processAllTokens(tokens) : tokens).then((tokens) => opt.walkTokens ? Promise.all(this.walkTokens(tokens, opt.walkTokens)).then(() => tokens) : tokens).then((tokens) => parser2(tokens, opt)).then((html2) => opt.hooks ? opt.hooks.postprocess(html2) : html2).catch(throwError);
        }
        try {
          if (opt.hooks) {
            src = opt.hooks.preprocess(src);
          }
          let tokens = lexer2(src, opt);
          if (opt.hooks) {
            tokens = opt.hooks.processAllTokens(tokens);
          }
          if (opt.walkTokens) {
            this.walkTokens(tokens, opt.walkTokens);
          }
          let html2 = parser2(tokens, opt);
          if (opt.hooks) {
            html2 = opt.hooks.postprocess(html2);
          }
          return html2;
        } catch (e) {
          return throwError(e);
        }
      };
      return parse2;
    }
    onError(silent, async) {
      return (e) => {
        e.message += "\nPlease report this to https://github.com/markedjs/marked.";
        if (silent) {
          const msg = "<p>An error occurred:</p><pre>" + escape2(e.message + "", true) + "</pre>";
          if (async) {
            return Promise.resolve(msg);
          }
          return msg;
        }
        if (async) {
          return Promise.reject(e);
        }
        throw e;
      };
    }
  };
  var markedInstance = new Marked();
  function marked(src, opt) {
    return markedInstance.parse(src, opt);
  }
  marked.options = marked.setOptions = function(options2) {
    markedInstance.setOptions(options2);
    marked.defaults = markedInstance.defaults;
    changeDefaults(marked.defaults);
    return marked;
  };
  marked.getDefaults = _getDefaults;
  marked.defaults = _defaults;
  marked.use = function(...args) {
    markedInstance.use(...args);
    marked.defaults = markedInstance.defaults;
    changeDefaults(marked.defaults);
    return marked;
  };
  marked.walkTokens = function(tokens, callback) {
    return markedInstance.walkTokens(tokens, callback);
  };
  marked.parseInline = markedInstance.parseInline;
  marked.Parser = _Parser;
  marked.parser = _Parser.parse;
  marked.Renderer = _Renderer;
  marked.TextRenderer = _TextRenderer;
  marked.Lexer = _Lexer;
  marked.lexer = _Lexer.lex;
  marked.Tokenizer = _Tokenizer;
  marked.Hooks = _Hooks;
  marked.parse = marked;
  marked.options;
  marked.setOptions;
  marked.use;
  marked.walkTokens;
  marked.parseInline;
  _Parser.parse;
  _Lexer.lex;
  const sidebarWidth = 500;
  const minSwipeDistance = 150;
  const minSwipeSpeed = 2;
  const _sfc_main$6 = {
    __name: "chat",
    setup(__props, { expose: __expose }) {
      __expose();
      let DOMPurify;
      try {
        DOMPurify = require("dompurify");
      } catch (error) {
        formatAppLog("warn", "at pages/chat/chat.vue:297", "DOMPurify不可用，使用简单的HTML清理函数");
        DOMPurify = {
          sanitize: (html2) => {
            return html2.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "").replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "").replace(/javascript:/gi, "").replace(/on\w+\s*=/gi, "").replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, "").replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, "");
          }
        };
      }
      const userStore = useUserStore();
      const userAvatar = vue.ref(userStore.userInfo.avatar || "/static/logo.png");
      const aiAvatar = vue.ref("/static/logo.png");
      const chatStore2 = useChatStore();
      vue.onErrorCaptured((err, instance, info) => {
        formatAppLog("error", "at pages/chat/chat.vue:320", "捕获到组件错误:", err, info);
        return true;
      });
      const currentRoleName = vue.ref("加载中...");
      const currentRoleAvatar = vue.ref("");
      const currentRoleId = vue.ref(null);
      const isSidebarOpen = vue.ref(false);
      const sidebarClosing = vue.ref(false);
      const sidebarVisible = vue.ref(false);
      const showNewChatModal = vue.ref(false);
      const modalClosing = vue.ref(false);
      const modalActive = vue.ref(false);
      const showRolePickerModal = vue.ref(false);
      const rolePickerClosing = vue.ref(false);
      const isEditMode = vue.ref(false);
      const rolesList = vue.ref([]);
      const newChat = vue.ref({
        name: "",
        chatName: "",
        topK: 5,
        similarity: 0.5,
        roleId: null
      });
      const selectedRoleName = vue.ref("请选择人设");
      const selectedRoleId = vue.ref(null);
      const selectedRoleAvatar = vue.ref("");
      const currentBackgroundImage = vue.computed(() => {
        return userStore.userInfo.backgroudImg || "";
      });
      const imageLoadError = vue.ref(false);
      const handleImageError = () => {
        imageLoadError.value = true;
        formatAppLog("error", "at pages/chat/chat.vue:371", "背景图片加载失败");
      };
      const handleImageLoad = () => {
        imageLoadError.value = false;
      };
      const handleRoleAvatarError = () => {
        formatAppLog("error", "at pages/chat/chat.vue:381", "角色头像加载失败");
        currentRoleAvatar.value = "";
      };
      const handleRoleItemAvatarError = (index) => {
        formatAppLog("error", "at pages/chat/chat.vue:387", `人设项头像加载失败，索引: ${index}`);
      };
      const handleSelectedAvatarError = () => {
        formatAppLog("error", "at pages/chat/chat.vue:394", "选中人设头像加载失败");
        selectedRoleAvatar.value = "";
      };
      const getCurrentRoleInfo = () => {
        try {
          if (chatStore2.chatHistory.length === 0) {
            currentRoleName.value = "";
            currentRoleAvatar.value = "";
            return;
          }
          if (chatStore2.chatIndex < 0 || chatStore2.chatIndex >= chatStore2.chatHistory.length) {
            formatAppLog("error", "at pages/chat/chat.vue:408", "无效的聊天索引:", chatStore2.chatIndex);
            currentRoleName.value = "";
            currentRoleAvatar.value = "";
            return;
          }
          const currentChat = chatStore2.chatHistory[chatStore2.chatIndex];
          if (!currentChat) {
            currentRoleName.value = "";
            currentRoleAvatar.value = "";
            return;
          }
          const roleId = currentChat.roleId;
          currentRoleId.value = roleId;
          if (!rolesList.value || !rolesList.value.length) {
            formatAppLog("log", "at pages/chat/chat.vue:426", "角色列表为空，使用聊天名称");
            currentRoleName.value = currentChat.chatName || "未命名对话";
            currentRoleAvatar.value = "";
            return;
          }
          const role = rolesList.value.find((r) => r.id === roleId);
          if (role) {
            currentRoleName.value = role.name || "未命名角色";
            currentRoleAvatar.value = role.avatar || "";
            formatAppLog("log", "at pages/chat/chat.vue:436", "当前角色信息:", role.name, role.avatar);
          } else {
            currentRoleName.value = currentChat.chatName || "未命名对话";
            currentRoleAvatar.value = "";
            formatAppLog("log", "at pages/chat/chat.vue:441", "未找到角色信息,使用聊天名称:", currentRoleName.value);
          }
        } catch (error) {
          formatAppLog("error", "at pages/chat/chat.vue:444", "获取角色信息失败:", error);
          currentRoleName.value = "助手";
          currentRoleAvatar.value = "";
        }
      };
      const messages = vue.ref([]);
      const inputMessage = vue.ref("");
      const scrollIntoView = vue.ref("");
      const isWaitingResponse = vue.ref(false);
      const loadChatMessages = async (chatId) => {
        try {
          if (!chatId) {
            formatAppLog("error", "at pages/chat/chat.vue:462", "无效的聊天ID");
            return [];
          }
          const res2 = await chatApi.chatMessages(chatId);
          if (res2) {
            formatAppLog("log", "at pages/chat/chat.vue:469", "收到的消息:", res2);
            let formattedMessages = res2.map((item) => ({
              content: item.text,
              isUser: item.messageType === "USER",
              time: formatTime(new Date(item.createTime)),
              status: "complete",
              // 添加一个唯一标识，用于去重
              _id: item.id || `${item.createTime}-${item.messageType}`
            }));
            const uniqueMessages = [];
            const seenContents = /* @__PURE__ */ new Set();
            formattedMessages.forEach((msg) => {
              if (msg.isUser) {
                uniqueMessages.push(msg);
                seenContents.add(msg.content);
              } else {
                const similarExists = Array.from(seenContents).some((existingContent) => {
                  if (existingContent === msg.content)
                    return true;
                  const minLength = Math.min(existingContent.length, msg.content.length);
                  const matchLength = minLength * 0.9;
                  return existingContent.substring(0, matchLength) === msg.content.substring(0, matchLength);
                });
                if (!similarExists) {
                  uniqueMessages.push(msg);
                  seenContents.add(msg.content);
                } else {
                  formatAppLog("log", "at pages/chat/chat.vue:507", "跳过重复或类似消息:", msg.content.substring(0, 50) + "...");
                }
              }
            });
            formatAppLog("log", "at pages/chat/chat.vue:512", "去重后的消息:", uniqueMessages.length, "(原始:", formattedMessages.length, ")");
            const messagesCopy = [...uniqueMessages];
            chatStore2.setChatMessages(chatId, messagesCopy);
            messages.value = [...messagesCopy];
            scrollToBottom();
            return messagesCopy;
          }
          return [];
        } catch (error) {
          formatAppLog("error", "at pages/chat/chat.vue:530", "获取聊天消息失败:", error);
          uni.showToast({
            title: "获取聊天记录失败",
            icon: "none"
          });
          return [];
        }
      };
      const sendMessage = async () => {
        if (!inputMessage.value.trim() || isWaitingResponse.value) {
          formatAppLog("log", "at pages/chat/chat.vue:543", "消息为空或正在等待响应，不发送");
          return;
        }
        formatAppLog("log", "at pages/chat/chat.vue:546", "准备发送消息:", inputMessage.value);
        formatAppLog("log", "at pages/chat/chat.vue:547", "聊天历史:", chatStore2.chatHistory);
        if (!chatStore2.chatHistory.length || chatStore2.chatIndex < 0 || chatStore2.chatIndex >= chatStore2.chatHistory.length) {
          uni.showToast({
            title: "请先创建会话",
            icon: "none"
          });
          return;
        }
        const chatId = chatStore2.chatHistory[chatStore2.chatIndex].id;
        isWaitingResponse.value = true;
        const userMsg = {
          content: inputMessage.value,
          isUser: true,
          time: formatTime(/* @__PURE__ */ new Date()),
          status: "complete"
        };
        const currentMessages = chatStore2.getChatMessages(chatId);
        const updatedMessages = [...currentMessages, userMsg];
        formatAppLog("log", "at pages/chat/chat.vue:578", "发送用户消息，更新会话消息，会话ID:", chatId);
        chatStore2.setChatMessages(chatId, updatedMessages);
        const userInput = inputMessage.value;
        inputMessage.value = "";
        scrollToBottom();
        setTimeout(() => {
          scrollToBottom();
        }, 100);
        const aiMsg = {
          content: "",
          isUser: false,
          time: formatTime(/* @__PURE__ */ new Date()),
          status: "loading"
        };
        const latestMessages = chatStore2.getChatMessages(chatId);
        const messagesWithAiResponse = [...latestMessages, aiMsg];
        formatAppLog("log", "at pages/chat/chat.vue:608", "添加AI占位消息，更新会话消息，会话ID:", chatId);
        chatStore2.setChatMessages(chatId, messagesWithAiResponse);
        const aiMsgIndex = chatStore2.currentMessages.length - 1;
        scrollToBottom();
        setTimeout(() => {
          scrollToBottom();
        }, 150);
        try {
          const promptData = {
            prompt: userInput,
            chatId
          };
          const needData = {
            currentChatId: chatId,
            messageIndex: aiMsgIndex
          };
          chatApi.askStream(
            promptData,
            needData,
            () => {
              formatAppLog("log", "at pages/chat/chat.vue:640", "聊天完成");
              try {
                const currentMsgs = chatStore2.getChatMessages(chatId);
                if (currentMsgs && currentMsgs[aiMsgIndex]) {
                  const updatedMsgs = [...currentMsgs];
                  updatedMsgs[aiMsgIndex].status = "complete";
                  formatAppLog("log", "at pages/chat/chat.vue:650", "聊天完成，更新消息状态，会话ID:", chatId);
                  chatStore2.setChatMessages(chatId, updatedMsgs);
                  vue.nextTick(() => {
                    scrollToBottom();
                    setTimeout(() => {
                      scrollToBottom();
                    }, 200);
                    setTimeout(() => {
                      scrollToBottom();
                    }, 500);
                  });
                }
                const currentChat = chatStore2.chatHistory[chatStore2.chatIndex];
                if (currentChat && (!currentChat.chatName || currentChat.chatName.trim() === "")) {
                  formatAppLog("log", "at pages/chat/chat.vue:670", "当前会话名称为空，刷新聊天历史");
                  refreshHistoryChat().then(() => {
                    formatAppLog("log", "at pages/chat/chat.vue:672", "聊天历史已刷新");
                  }).catch((err) => {
                    formatAppLog("error", "at pages/chat/chat.vue:674", "刷新聊天历史失败:", err);
                  });
                }
              } catch (completionError) {
                formatAppLog("error", "at pages/chat/chat.vue:678", "完成回调处理失败:", completionError);
              } finally {
                isWaitingResponse.value = false;
              }
            },
            (error) => {
              formatAppLog("error", "at pages/chat/chat.vue:686", "聊天请求失败:", error);
              try {
                const currentMsgs = chatStore2.getChatMessages(chatId);
                if (currentMsgs && currentMsgs[aiMsgIndex]) {
                  const updatedMsgs = [...currentMsgs];
                  updatedMsgs[aiMsgIndex].content = "抱歉，请求失败";
                  updatedMsgs[aiMsgIndex].status = "error";
                  formatAppLog("log", "at pages/chat/chat.vue:697", "聊天请求失败，更新错误状态，会话ID:", chatId);
                  chatStore2.setChatMessages(chatId, updatedMsgs);
                }
              } catch (errorHandlingError) {
                formatAppLog("error", "at pages/chat/chat.vue:701", "错误处理失败:", errorHandlingError);
              } finally {
                isWaitingResponse.value = false;
              }
            }
          );
        } catch (error) {
          formatAppLog("error", "at pages/chat/chat.vue:709", "发送消息失败:", error);
          uni.showToast({
            title: "发送失败",
            icon: "none"
          });
          try {
            const currentMsgs = chatStore2.getChatMessages(chatId);
            if (currentMsgs && currentMsgs[aiMsgIndex]) {
              const updatedMsgs = [...currentMsgs];
              updatedMsgs[aiMsgIndex].content = "发送失败，请重试";
              updatedMsgs[aiMsgIndex].status = "error";
              formatAppLog("log", "at pages/chat/chat.vue:724", "发送消息失败，更新错误状态，会话ID:", chatId);
              chatStore2.setChatMessages(chatId, updatedMsgs);
            }
          } catch (e) {
            formatAppLog("error", "at pages/chat/chat.vue:728", "更新错误消息失败:", e);
          }
          isWaitingResponse.value = false;
        }
      };
      const switchChat = async (chatId) => {
        try {
          const chatIndex = chatStore2.chatHistory.findIndex((chat) => chat.id === chatId);
          if (chatIndex !== -1) {
            chatStore2.chatIndex = chatIndex;
            closeSidebar();
            getCurrentRoleInfo();
            isWaitingResponse.value = false;
            let cachedMessages = chatStore2.getChatMessages(chatId);
            if (cachedMessages && cachedMessages.length > 0) {
              formatAppLog("log", "at pages/chat/chat.vue:759", "切换会话，使用缓存消息，会话ID:", chatId);
              chatStore2.setCurrentMessages(chatId);
              messages.value = [...cachedMessages];
              formatAppLog("log", "at pages/chat/chat.vue:765", "使用缓存的消息:", cachedMessages);
              scrollToBottom();
            } else {
              await loadChatMessages(chatId);
            }
            try {
              const url = `/pages/chat/chat?chatId=${chatId}`;
              if (typeof history !== "undefined" && history && typeof history.replaceState === "function") {
                history.replaceState(null, "", url);
              } else {
                formatAppLog("log", "at pages/chat/chat.vue:782", "当前环境不支持history.replaceState，跳过URL更新");
              }
            } catch (urlError) {
              formatAppLog("error", "at pages/chat/chat.vue:785", "URL更新失败，但不影响功能:", urlError);
            }
          }
        } catch (error) {
          formatAppLog("error", "at pages/chat/chat.vue:789", "切换会话失败:", error);
          uni.showToast({
            title: "切换会话失败",
            icon: "none"
          });
          isWaitingResponse.value = false;
        }
      };
      const scrollToBottom = () => {
        try {
          if (!autoScrollEnabled.value && isUserScrolling.value) {
            formatAppLog("log", "at pages/chat/chat.vue:804", "用户正在滚动，暂停自动滚动");
            return;
          }
          vue.nextTick(() => {
            if (chatStore2.currentMessages.length > 0) {
              if (autoScrollEnabled.value) {
                const lastIndex = chatStore2.currentMessages.length - 1;
                scrollIntoView.value = `msg-${lastIndex}`;
                setTimeout(() => {
                  const query = uni.createSelectorQuery().in(vue.getCurrentInstance());
                  query.select(".message-list").boundingClientRect((res2) => {
                    if (res2) {
                      const lastMsgQuery = uni.createSelectorQuery().in(vue.getCurrentInstance());
                      lastMsgQuery.select(`#msg-${lastIndex}`).boundingClientRect((lastMsgRes) => {
                        if (lastMsgRes) {
                          const scrollPosition = lastMsgRes.top - res2.top + lastMsgRes.height + 100;
                          const scrollViewQuery = uni.createSelectorQuery().in(vue.getCurrentInstance());
                          scrollViewQuery.select(".message-list").node((scrollNode) => {
                            if (scrollNode && scrollNode.node) {
                              scrollNode.node.scrollTop = 999999;
                            }
                          }).exec();
                          uni.pageScrollTo({
                            scrollTop: scrollPosition,
                            duration: 100
                          });
                        }
                      }).exec();
                    }
                  }).exec();
                  scrollIntoView.value = "";
                  vue.nextTick(() => {
                    scrollIntoView.value = `msg-${lastIndex}`;
                  });
                }, 50);
              }
            }
          });
        } catch (error) {
          formatAppLog("error", "at pages/chat/chat.vue:857", "滚动到底部函数执行失败:", error);
        }
      };
      const formatTime = (date) => {
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
      };
      const goBack = () => {
        uni.navigateBack();
      };
      const copyMessage = (content) => {
        uni.setClipboardData({
          data: content,
          success: () => {
            uni.showToast({
              title: "复制成功",
              icon: "success",
              duration: 1500
            });
          }
        });
      };
      const showNewChatDialog = async () => {
        showNewChatModal.value = true;
        isEditMode.value = false;
        await getRoles2();
        setTimeout(() => {
          modalActive.value = true;
        }, 50);
      };
      const closeNewChatDialog = () => {
        modalClosing.value = true;
        modalActive.value = false;
        if (showRolePickerModal.value) {
          rolePickerClosing.value = true;
          setTimeout(() => {
            showRolePickerModal.value = false;
            rolePickerClosing.value = false;
          }, 300);
        }
        setTimeout(() => {
          showNewChatModal.value = false;
          modalClosing.value = false;
          isEditMode.value = false;
          selectedRoleName.value = "请选择人设";
          selectedRoleId.value = null;
          selectedRoleAvatar.value = "";
        }, 300);
      };
      const getRoles2 = async () => {
        try {
          formatAppLog("log", "at pages/chat/chat.vue:929", "开始获取人设列表");
          const res2 = await chatApi.getRoles();
          formatAppLog("log", "at pages/chat/chat.vue:931", "人设API返回结果:", res2);
          if (res2) {
            formatAppLog("log", "at pages/chat/chat.vue:935", "API返回的人设数据详情:");
            res2.forEach((role, index) => {
              formatAppLog("log", "at pages/chat/chat.vue:937", `人设${index + 1}:`, JSON.stringify(role));
            });
            const testData = [...res2];
            if (testData.length === 0) {
              testData.push({
                id: 1,
                name: "自律管家",
                isSystem: true
              });
            }
            rolesList.value = testData;
            formatAppLog("log", "at pages/chat/chat.vue:952", "处理后的人设列表:", rolesList.value);
          } else {
            formatAppLog("error", "at pages/chat/chat.vue:954", "人设数据格式异常:", res2);
            rolesList.value = [{
              id: 1,
              name: "自律管家",
              isSystem: true
            }];
          }
        } catch (error) {
          formatAppLog("error", "at pages/chat/chat.vue:963", "获取人设列表失败:", error);
          rolesList.value = [{
            id: 1,
            name: "自律管家",
            isSystem: true
          }];
          uni.showToast({
            title: "获取人设列表失败",
            icon: "none"
          });
        }
      };
      const getRoleNameById = (roleId) => {
        formatAppLog("log", "at pages/chat/chat.vue:979", "查找roleId:", roleId, "当前角色列表:", rolesList.value);
        const role = rolesList.value.find((role2) => role2.id === roleId);
        if (role) {
          selectedRoleName.value = role.name;
          selectedRoleId.value = role.id;
          selectedRoleAvatar.value = role.avatar || "";
          return role.name;
        }
        return "请选择人设";
      };
      const showRolePicker = () => {
        showRolePickerModal.value = true;
      };
      const hideRolePicker = () => {
        rolePickerClosing.value = true;
        setTimeout(() => {
          showRolePickerModal.value = false;
          rolePickerClosing.value = false;
        }, 300);
      };
      const selectRole = (role, index) => {
        formatAppLog("log", "at pages/chat/chat.vue:1006", "选择人设:", role);
        if (role) {
          newChat.value.roleId = role.id;
          selectedRoleName.value = role.name;
          selectedRoleId.value = role.id;
          selectedRoleAvatar.value = role.avatar || "";
          formatAppLog("log", "at pages/chat/chat.vue:1012", "已选择人设:", role.name, "(ID:", role.id, ")");
          hideRolePicker();
        }
      };
      const handleTopKChange = (e) => {
        newChat.value.topK = e.detail.value;
      };
      const handleSimilarityChange = (e) => {
        newChat.value.similarity = Math.round(e.detail.value) / 100;
      };
      const editChat2 = (chat) => {
        showNewChatModal.value = true;
        isEditMode.value = true;
        newChat.value = {
          id: chat.id,
          chatName: chat.chatName || "",
          topK: chat.topK || 5,
          similarity: chat.similarity || 0.5,
          roleId: chat.roleId || null
        };
        if (chat.roleId) {
          const role = rolesList.value.find((role2) => role2.id === chat.roleId);
          if (role) {
            selectedRoleName.value = role.name || "请选择人设";
            selectedRoleId.value = role.id;
            selectedRoleAvatar.value = role.avatar || "";
          } else {
            selectedRoleName.value = "请选择人设";
            selectedRoleId.value = null;
            selectedRoleAvatar.value = "";
          }
        } else {
          selectedRoleName.value = "请选择人设";
          selectedRoleId.value = null;
          selectedRoleAvatar.value = "";
        }
        setTimeout(() => {
          modalActive.value = true;
        }, 50);
      };
      const confirmDeleteChat = (chat) => {
        uni.showModal({
          title: "删除会话",
          content: "确定要删除此会话吗？此操作不可恢复。",
          confirmColor: "#FF3B30",
          success: (res2) => {
            if (res2.confirm) {
              deleteChat2(chat.id);
            }
          }
        });
      };
      const deleteChat2 = async (chatId) => {
        try {
          const res2 = await chatApi.deleteChat(chatId);
          formatAppLog("log", "at pages/chat/chat.vue:1083", res2);
          if (res2) {
            uni.showToast({
              title: "删除成功",
              icon: "success",
              duration: 2e3
            });
            const isCurrentChat = chatStore2.chatHistory.length > 0 && chatStore2.chatIndex >= 0 && chatStore2.chatHistory[chatStore2.chatIndex].id === chatId;
            if (chatStore2.chatMap && chatStore2.chatMap.has(chatId)) {
              formatAppLog("log", "at pages/chat/chat.vue:1098", `从chatMap中删除会话缓存: ${chatId}`);
              chatStore2.chatMap.delete(chatId);
            }
            const chatIndex = chatStore2.chatHistory.findIndex((chat) => chat.id === chatId);
            if (chatIndex !== -1) {
              formatAppLog("log", "at pages/chat/chat.vue:1106", `从chatHistory中删除会话: ${chatId}, 索引: ${chatIndex}`);
              chatStore2.chatHistory.splice(chatIndex, 1);
            }
            await refreshHistoryChat();
            if (isCurrentChat) {
              formatAppLog("log", "at pages/chat/chat.vue:1115", "删除的是当前会话");
              if (chatStore2.chatHistory.length > 0) {
                chatStore2.chatIndex = 0;
                const firstChatId = chatStore2.chatHistory[0].id;
                const messages2 = await loadChatMessages(firstChatId);
                formatAppLog("log", "at pages/chat/chat.vue:1127", "加载第一个会话的消息:", messages2);
                getCurrentRoleInfo();
              } else {
                chatStore2.currentMessages = [];
                currentRoleName.value = "";
                currentRoleAvatar.value = "";
              }
            } else {
              if (chatStore2.chatHistory.length === 0) {
                chatStore2.currentMessages = [];
                currentRoleName.value = "";
                currentRoleAvatar.value = "";
              }
            }
          } else {
            uni.showToast({
              title: "删除失败",
              icon: "none",
              duration: 2e3
            });
          }
        } catch (error) {
          formatAppLog("error", "at pages/chat/chat.vue:1156", "删除会话失败:", error);
          uni.showToast({
            title: "删除失败",
            icon: "none",
            duration: 2e3
          });
        }
      };
      const createNewChat = async () => {
        try {
          if (newChat.value.topK && (isNaN(newChat.value.topK) || newChat.value.topK <= 0)) {
            uni.showToast({
              title: "TopK必须为正整数",
              icon: "none"
            });
            return;
          }
          if (newChat.value.similarity && (isNaN(newChat.value.similarity) || newChat.value.similarity < 0 || newChat.value.similarity > 1)) {
            uni.showToast({
              title: "相似度必须在0-1之间",
              icon: "none"
            });
            return;
          }
          if (newChat.value.chatName && newChat.value.chatName.length > 10) {
            uni.showToast({
              title: "会话名称最多10个字符",
              icon: "none"
            });
            return;
          }
          if (!newChat.value.roleId) {
            uni.showToast({
              title: "请选择人设",
              icon: "none"
            });
            return;
          }
          const chatData = {
            chatName: newChat.value.chatName || "",
            topK: newChat.value.topK || 5,
            similarity: newChat.value.similarity || 0.5,
            roleId: newChat.value.roleId
            // 移除默认值null
          };
          let res2;
          if (newChat.value.id) {
            chatData.id = newChat.value.id;
            formatAppLog("log", "at pages/chat/chat.vue:1217", "更新会话数据:", chatData);
            res2 = await chatApi.editChat(chatData);
            formatAppLog("log", "at pages/chat/chat.vue:1219", "更新会话响应:", res2);
          } else {
            formatAppLog("log", "at pages/chat/chat.vue:1222", "创建会话数据:", chatData);
            res2 = await chatApi.createChat(chatData);
            formatAppLog("log", "at pages/chat/chat.vue:1224", "创建会话响应:", res2);
          }
          if (res2) {
            closeNewChatDialog();
            const chatId = newChat.value.id || res2;
            newChat.value = {
              chatName: "",
              topK: 5,
              similarity: 0.5,
              roleId: null
            };
            selectedRoleName.value = "请选择人设";
            selectedRoleId.value = null;
            selectedRoleAvatar.value = "";
            isEditMode.value = false;
            await refreshHistoryChat();
            if (!newChat.value.id) {
              const newChatIndex = chatStore2.chatHistory.findIndex((chat) => chat.id === chatId);
              if (newChatIndex !== -1) {
                await switchChat(chatId);
                formatAppLog("log", "at pages/chat/chat.vue:1256", "已切换到新创建的会话:", chatId);
              } else {
                formatAppLog("error", "at pages/chat/chat.vue:1258", "未找到新创建的会话:", chatId);
                if (chatStore2.chatHistory.length > 0) {
                  const firstChatId = chatStore2.chatHistory[0].id;
                  await switchChat(firstChatId);
                  formatAppLog("log", "at pages/chat/chat.vue:1263", "切换到第一个会话:", firstChatId);
                }
              }
            } else {
              await switchChat(chatId);
              formatAppLog("log", "at pages/chat/chat.vue:1269", "已切换到编辑后的会话:", chatId);
            }
          } else {
            uni.showToast({
              title: res2.message || (newChat.value.id ? "更新会话失败" : "创建会话失败"),
              icon: "none"
            });
          }
        } catch (error) {
          formatAppLog("error", "at pages/chat/chat.vue:1278", newChat.value.id ? "更新会话失败:" : "创建会话失败:", error);
          uni.showToast({
            title: newChat.value.id ? "更新会话失败" : "创建会话失败",
            icon: "none"
          });
        }
      };
      const renderMarkdown = (content) => {
        if (!content)
          return "";
        try {
          const html2 = marked(content);
          try {
            if (DOMPurify && typeof DOMPurify.sanitize === "function") {
              return DOMPurify.sanitize(html2);
            } else {
              return html2.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "").replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "").replace(/javascript:/gi, "").replace(/on\w+\s*=/gi, "").replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, "").replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, "");
            }
          } catch (purifyError) {
            formatAppLog("warn", "at pages/chat/chat.vue:1307", "DOMPurify清理失败，使用原始HTML:", purifyError);
            return html2;
          }
        } catch (error) {
          formatAppLog("error", "at pages/chat/chat.vue:1311", "Markdown渲染失败:", error);
          return content;
        }
      };
      const toggleSidebar = () => {
        if (isSidebarOpen.value) {
          closeSidebar();
        } else {
          openSidebarWithRefresh();
        }
      };
      const scrollHistoryToBottom = () => {
        tryScrollToBottom();
        setTimeout(tryScrollToBottom, 300);
        setTimeout(tryScrollToBottom, 600);
        setTimeout(tryScrollToBottom, 1e3);
      };
      const tryScrollToBottom = () => {
        try {
          const historyListNode = uni.createSelectorQuery().in(vue.getCurrentInstance());
          historyListNode.select(".history-list").node((scrollNode) => {
            if (scrollNode && scrollNode.node) {
              const currentScrollTop = scrollNode.node.scrollTop || 0;
              const scrollHeight = scrollNode.node.scrollHeight || 0;
              const clientHeight = scrollNode.node.clientHeight || 0;
              const targetScrollTop = scrollHeight - clientHeight - 5;
              if (targetScrollTop > currentScrollTop) {
                scrollNode.node.scrollTop = targetScrollTop;
              }
            }
          }).exec();
          const lastItemQuery = uni.createSelectorQuery().in(vue.getCurrentInstance());
          lastItemQuery.selectAll(".history-item").boundingClientRect((items) => {
            if (items && items.length > 0) {
              const lastItem = items[items.length - 1];
              if (lastItem) {
                try {
                  const platform = uni.getSystemInfoSync().platform;
                  if (platform && platform.toLowerCase() === "ios") {
                    const query = uni.createSelectorQuery().in(vue.getCurrentInstance());
                    query.select(".history-list").boundingClientRect((list2) => {
                      if (list2 && lastItem) {
                        const bottomOffset = lastItem.bottom - list2.top;
                        if (bottomOffset > list2.height) {
                          const scrollTop = bottomOffset - list2.height + 20;
                          const scrollView = uni.createSelectorQuery().in(vue.getCurrentInstance());
                          scrollView.select(".history-list").node((node) => {
                            if (node && node.node) {
                              node.node.scrollTop = scrollTop;
                            }
                          }).exec();
                        }
                      }
                    }).exec();
                  }
                } catch (e) {
                  formatAppLog("error", "at pages/chat/chat.vue:1390", "iOS专用滚动处理失败:", e);
                }
              }
            }
          }).exec();
        } catch (e) {
          formatAppLog("error", "at pages/chat/chat.vue:1397", "滚动历史列表到底部失败:", e);
        }
      };
      const openSidebar = () => {
        if (isSidebarOpen.value)
          return;
        sidebarVisible.value = true;
        setTimeout(() => {
          isSidebarOpen.value = true;
          sidebarDragPosition.value = 0;
          scrollHistoryToBottom();
        }, 10);
      };
      const closeSidebar = () => {
        if (!isSidebarOpen.value && !sidebarVisible.value)
          return;
        sidebarClosing.value = true;
        isSidebarOpen.value = false;
        sidebarDragPosition.value = 0;
        setTimeout(() => {
          sidebarVisible.value = false;
          sidebarClosing.value = false;
        }, 600);
      };
      const formatDate = (dateString) => {
        if (!dateString)
          return "";
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        return `${year}-${month}-${day}`;
      };
      const touchStartX = vue.ref(0);
      const touchStartY = vue.ref(0);
      const touchEndX = vue.ref(0);
      const touchCurrentX = vue.ref(0);
      const sidebarDragPosition = vue.ref(0);
      const isDraggingSidebar = vue.ref(false);
      const touchStartTime = vue.ref(0);
      const handleTouchStart = (event) => {
        touchStartX.value = event.touches[0].clientX;
        touchStartY.value = event.touches[0].clientY;
        touchCurrentX.value = event.touches[0].clientX;
        touchStartTime.value = Date.now();
        if (touchStartX.value < 50) {
          formatAppLog("log", "at pages/chat/chat.vue:1469", "左侧边缘触摸开始");
        }
      };
      const handleTouchMove = (event) => {
        if (touchStartX.value <= 0)
          return;
        touchCurrentX.value = event.touches[0].clientX;
        touchEndX.value = event.touches[0].clientX;
        const deltaX = touchCurrentX.value - touchStartX.value;
        const deltaY = event.touches[0].clientY - touchStartY.value;
        const isVerticalSwipe = Math.abs(deltaY) > Math.abs(deltaX);
        if (isVerticalSwipe)
          return;
        if (deltaX > 0 && touchStartX.value < 50) {
          isDraggingSidebar.value = true;
          if (!sidebarVisible.value) {
            sidebarVisible.value = true;
          }
          const pixelsPerRpx = 0.5;
          const maxDragPixels = sidebarWidth * pixelsPerRpx;
          const dragPercent = Math.min(100, deltaX / maxDragPixels * 100);
          sidebarDragPosition.value = dragPercent;
          event.preventDefault();
        }
      };
      const handleTouchEnd = () => {
        if (touchStartX.value <= 0)
          return;
        if (isDraggingSidebar.value) {
          if (sidebarDragPosition.value > 50) {
            formatAppLog("log", "at pages/chat/chat.vue:1522", "拖动超过50%，完全打开侧边栏");
            openSidebar();
          } else {
            formatAppLog("log", "at pages/chat/chat.vue:1526", "拖动未超过50%，关闭侧边栏");
            closeSidebar();
          }
          isDraggingSidebar.value = false;
          sidebarDragPosition.value = 0;
        } else {
          const swipeDistance = touchEndX.value - touchStartX.value;
          const swipeTime = Date.now() - touchStartTime.value;
          const swipeSpeed = Math.abs(swipeDistance) / swipeTime;
          if (swipeDistance > minSwipeDistance && swipeSpeed > minSwipeSpeed) {
            openSidebar();
          } else if (swipeDistance < -minSwipeDistance * 1.5) {
            goBackToHome();
          }
        }
        touchStartX.value = 0;
        touchStartY.value = 0;
        touchEndX.value = 0;
        touchCurrentX.value = 0;
        touchStartTime.value = 0;
      };
      const goBackToHome = () => {
        uni.switchTab({
          url: "/pages/home/home"
        });
      };
      const showNewChatDialogFromSidebar = (event) => {
        if (event) {
          event.stopPropagation();
        }
        closeSidebar();
        setTimeout(() => {
          showNewChatDialog();
        }, 300);
      };
      const openSidebarWithRefresh = async () => {
        openSidebar();
        try {
          await refreshHistoryChat();
        } catch (error) {
          formatAppLog("error", "at pages/chat/chat.vue:1591", "刷新会话列表失败:", error);
        }
        setTimeout(() => {
          scrollHistoryToBottom();
        }, 500);
      };
      const focusMessageInput = () => {
        formatAppLog("log", "at pages/chat/chat.vue:1602", "尝试聚焦输入框...");
        setTimeout(() => {
          try {
            const inputElement = document.querySelector(".message-input");
            if (inputElement) {
              inputElement.focus();
              formatAppLog("log", "at pages/chat/chat.vue:1611", "DOM直接聚焦尝试完成");
            }
          } catch (e) {
            formatAppLog("error", "at pages/chat/chat.vue:1614", "DOM聚焦失败:", e);
          }
          try {
            if (messageInput.value) {
              messageInput.value.focus && messageInput.value.focus();
              formatAppLog("log", "at pages/chat/chat.vue:1621", "Ref聚焦尝试完成");
            }
          } catch (e) {
            formatAppLog("error", "at pages/chat/chat.vue:1624", "Ref聚焦失败:", e);
          }
          try {
            uni.createSelectorQuery().select(".message-input").node((res2) => {
              if (res2 && res2.node) {
                res2.node.focus();
                formatAppLog("log", "at pages/chat/chat.vue:1634", "Node API聚焦尝试完成");
              }
            }).exec();
          } catch (e) {
            formatAppLog("error", "at pages/chat/chat.vue:1638", "Node API聚焦失败:", e);
          }
          setTimeout(() => {
            try {
              uni.hideKeyboard();
              setTimeout(() => {
                uni.showKeyboard();
                formatAppLog("log", "at pages/chat/chat.vue:1647", "原生键盘方法尝试完成");
              }, 300);
            } catch (e) {
              formatAppLog("error", "at pages/chat/chat.vue:1650", "原生键盘方法失败:", e);
            }
          }, 500);
        }, 800);
        setTimeout(() => {
          formatAppLog("log", "at pages/chat/chat.vue:1657", "再次尝试聚焦...");
          try {
            const query = uni.createSelectorQuery().in(vue.getCurrentInstance());
            query.select(".message-input").boundingClientRect((res2) => {
              if (res2) {
                setTimeout(() => {
                  try {
                    if (messageInput.value) {
                      messageInput.value.focus && messageInput.value.focus();
                    }
                    uni.showKeyboard();
                    formatAppLog("log", "at pages/chat/chat.vue:1669", "延迟聚焦尝试完成");
                  } catch (e) {
                    formatAppLog("error", "at pages/chat/chat.vue:1671", "延迟聚焦失败:", e);
                  }
                }, 300);
              }
            }).exec();
          } catch (e) {
            formatAppLog("error", "at pages/chat/chat.vue:1677", "查询输入框失败:", e);
          }
        }, 1500);
      };
      const getChatMessages = async () => {
        try {
          let targetChatId;
          try {
            const query = uni.getQueryString ? uni.getQueryString() : {};
            if (query && query.chatId) {
              targetChatId = query.chatId;
            }
          } catch (queryError) {
            formatAppLog("error", "at pages/chat/chat.vue:1695", "获取URL参数失败:", queryError);
          }
          if (targetChatId) {
            const chatIndex = chatStore2.chatHistory.findIndex((chat) => chat.id === targetChatId);
            if (chatIndex !== -1) {
              formatAppLog("log", "at pages/chat/chat.vue:1703", "根据URL参数设置聊天索引:", chatIndex);
              chatStore2.chatIndex = chatIndex;
              const cachedMessages = chatStore2.getChatMessages(targetChatId);
              if (cachedMessages && cachedMessages.length > 0) {
                formatAppLog("log", "at pages/chat/chat.vue:1710", "使用缓存消息，会话ID:", targetChatId);
                chatStore2.setCurrentMessages(targetChatId);
                messages.value = [...cachedMessages];
                setTimeout(() => {
                  autoScrollEnabled.value = true;
                  scrollToBottom();
                }, 300);
                return;
              }
              await loadChatMessages(targetChatId);
            } else {
              formatAppLog("error", "at pages/chat/chat.vue:1727", "在聊天历史中找不到指定的chatId:", targetChatId);
            }
          } else {
            if (chatStore2.chatHistory.length > 0) {
              formatAppLog("log", "at pages/chat/chat.vue:1732", "使用当前选中的聊天索引:", chatStore2.chatIndex);
              if (chatStore2.chatIndex < 0 || chatStore2.chatIndex >= chatStore2.chatHistory.length) {
                chatStore2.chatIndex = 0;
              }
              const currentChat = chatStore2.chatHistory[chatStore2.chatIndex];
              if (currentChat) {
                targetChatId = currentChat.id;
                const cachedMessages = chatStore2.getChatMessages(targetChatId);
                if (cachedMessages && cachedMessages.length > 0) {
                  formatAppLog("log", "at pages/chat/chat.vue:1744", "使用缓存消息，会话ID:", targetChatId);
                  chatStore2.setCurrentMessages(targetChatId);
                  messages.value = [...cachedMessages];
                  setTimeout(() => {
                    autoScrollEnabled.value = true;
                    scrollToBottom();
                  }, 300);
                  return;
                }
                await loadChatMessages(targetChatId);
              } else {
                formatAppLog("error", "at pages/chat/chat.vue:1761", "当前聊天索引无效或聊天数据异常");
              }
            } else {
              formatAppLog("log", "at pages/chat/chat.vue:1764", "没有可用的聊天会话");
            }
          }
          setTimeout(() => {
            autoScrollEnabled.value = true;
            scrollToBottom();
          }, 500);
        } catch (error) {
          formatAppLog("error", "at pages/chat/chat.vue:1774", "获取聊天消息失败:", error);
          uni.showToast({
            title: "获取聊天记录失败",
            icon: "none"
          });
        }
      };
      const refreshHistoryChat = async () => {
        try {
          formatAppLog("log", "at pages/chat/chat.vue:1785", "刷新聊天历史");
          const currentChatId2 = chatStore2.chatHistory.length > 0 && chatStore2.chatIndex >= 0 ? chatStore2.chatHistory[chatStore2.chatIndex].id : null;
          formatAppLog("log", "at pages/chat/chat.vue:1790", "当前选中的聊天ID:", currentChatId2);
          const res2 = await chatApi.chatHistory();
          formatAppLog("log", "at pages/chat/chat.vue:1793", "获取聊天历史:", res2);
          if (res2 && Array.isArray(res2)) {
            const validChats = res2.filter((chat) => chat && chat.id);
            formatAppLog("log", "at pages/chat/chat.vue:1798", "设置chatStore", validChats);
            chatStore2.chatHistory = validChats;
            if (validChats.length > 0) {
              if (currentChatId2) {
                const newIndex = validChats.findIndex((chat) => chat.id === currentChatId2);
                if (newIndex !== -1) {
                  formatAppLog("log", "at pages/chat/chat.vue:1807", "保持之前选择的聊天索引:", newIndex);
                  chatStore2.chatIndex = newIndex;
                } else {
                  formatAppLog("log", "at pages/chat/chat.vue:1811", "未找到之前的聊天，使用索引0");
                  chatStore2.chatIndex = 0;
                }
              } else {
                formatAppLog("log", "at pages/chat/chat.vue:1816", "没有之前选择的聊天，使用索引0");
                chatStore2.chatIndex = 0;
              }
              if (isSidebarOpen.value) {
                scrollHistoryToBottom();
              }
            }
          } else {
            formatAppLog("error", "at pages/chat/chat.vue:1826", "获取聊天历史数据格式异常:", res2);
            chatStore2.chatHistory = [];
          }
        } catch (error) {
          formatAppLog("error", "at pages/chat/chat.vue:1831", "刷新聊天历史失败:", error);
          chatStore2.chatHistory = [];
        }
      };
      vue.onMounted(async () => {
        formatAppLog("log", "at pages/chat/chat.vue:1839", "页面加载，开始初始化...");
        isFirstVisit.value = true;
        isUserTap.value = false;
        try {
          await getRoles2();
          formatAppLog("log", "at pages/chat/chat.vue:1848", "人设列表已加载");
          await refreshHistoryChat();
          formatAppLog("log", "at pages/chat/chat.vue:1852", "聊天历史已刷新");
          await getChatMessages();
          formatAppLog("log", "at pages/chat/chat.vue:1856", "聊天消息已加载");
          getCurrentRoleInfo();
          formatAppLog("log", "at pages/chat/chat.vue:1860", "当前角色信息已更新");
          uni.$on("chat:newContent", (data) => {
            const currentChatId2 = chatStore2.getCurrentChatId();
            if (data && data.currentChatId === currentChatId2) {
              formatAppLog("log", "at pages/chat/chat.vue:1867", "收到当前会话消息更新，触发滚动，会话ID:", currentChatId2);
              scrollToBottom();
              setTimeout(() => {
                scrollToBottom();
              }, 50);
            } else if (data) {
              formatAppLog("log", "at pages/chat/chat.vue:1877", "收到其他会话的消息更新，会话ID:", data.currentChatId, "当前会话ID:", currentChatId2);
            }
          });
          vue.watch(() => chatStore2.currentMessages.length, (newLen, oldLen) => {
            if (newLen > oldLen) {
              vue.nextTick(() => {
                scrollToBottom();
              });
            }
          });
          vue.nextTick(() => {
            scrollToBottom();
            setTimeout(() => {
              autoScrollEnabled.value = true;
              scrollToBottom();
            }, 500);
            setTimeout(() => {
              autoScrollEnabled.value = true;
              scrollToBottom();
            }, 1e3);
          });
          if (isIOS()) {
            formatAppLog("log", "at pages/chat/chat.vue:1908", "检测到iOS设备，应用特殊处理");
            uni.hideKeyboard();
            setupIOSKeyboardHandling();
          }
        } catch (error) {
          formatAppLog("error", "at pages/chat/chat.vue:1917", "初始化过程中出错:", error);
          uni.showToast({
            title: "加载失败，请重试",
            icon: "none"
          });
        }
        setTimeout(() => {
          formatAppLog("log", "at pages/chat/chat.vue:1926", "页面初始化完成，重置首次访问标记");
          isFirstVisit.value = false;
        }, 2e3);
      });
      const messageInput = vue.ref(null);
      const isIOS = () => {
        const platform = uni.getSystemInfoSync().platform;
        return platform.toLowerCase() === "ios";
      };
      vue.onUnmounted(() => {
        formatAppLog("log", "at pages/chat/chat.vue:1951", "聊天页面卸载");
        uni.$off("chat:newContent");
      });
      const handleConfirmSend = () => {
        formatAppLog("log", "at pages/chat/chat.vue:1958", "确认发送消息");
        if (chatStore2.chatHistory.length > 0 && !isWaitingResponse.value && inputMessage.value.trim().length > 0) {
          uni.hideKeyboard();
          setTimeout(() => {
            sendMessage();
          }, 50);
        }
      };
      const handleSendClick = () => {
        formatAppLog("log", "at pages/chat/chat.vue:1971", "点击发送按钮");
        if (inputMessage.value.trim().length > 0 && chatStore2.chatHistory.length > 0 && !isWaitingResponse.value) {
          uni.hideKeyboard();
          setTimeout(() => {
            sendMessage();
          }, 50);
        }
      };
      vue.watch(() => {
        var _a2;
        if (chatStore2.currentMessages.length > 0) {
          const lastMsg = chatStore2.currentMessages[chatStore2.currentMessages.length - 1];
          return ((_a2 = lastMsg == null ? void 0 : lastMsg.content) == null ? void 0 : _a2.length) || 0;
        }
        return 0;
      }, (newVal, oldVal) => {
        if (newVal > oldVal) {
          vue.nextTick(() => {
            scrollToBottom();
          });
        }
      });
      const manualScrollTop = vue.ref(null);
      const isUserScrolling = vue.ref(false);
      const lastScrollTop = vue.ref(0);
      const autoScrollEnabled = vue.ref(true);
      const touchStartYPos = vue.ref(0);
      const handleListTouchStart = (e) => {
        touchStartYPos.value = e.touches[0].clientY;
      };
      const handleListTouchMove = (e) => {
        const currentY = e.touches[0].clientY;
        const deltaY = currentY - touchStartYPos.value;
        if (deltaY < -10) {
          isUserScrolling.value = true;
          autoScrollEnabled.value = false;
          formatAppLog("log", "at pages/chat/chat.vue:2021", "用户正在向上滑动查看历史消息");
        }
      };
      const handleListTouchEnd = () => {
        setTimeout(() => {
          isUserScrolling.value = false;
        }, 300);
      };
      const handleScroll = (e) => {
        const scrollTop = e.detail.scrollTop;
        const isScrollingDown = scrollTop > lastScrollTop.value;
        lastScrollTop.value = scrollTop;
        if (isScrollingDown) {
          const scrollHeight = e.detail.scrollHeight;
          const clientHeight = e.detail.scrollHeight - e.detail.scrollTop;
          if (scrollHeight - scrollTop - clientHeight < 200) {
            autoScrollEnabled.value = true;
          }
        } else {
          if (scrollTop < lastScrollTop.value) {
            autoScrollEnabled.value = false;
          }
        }
      };
      const adjustInputForKeyboard = (height) => {
        try {
          const sysInfo = uni.getSystemInfoSync();
          const windowHeight = sysInfo.windowHeight;
          keyboardHeight.value = height;
          const safeDistance = 10;
          inputContainerStyle.value.bottom = `${height + safeDistance}px`;
          const keyboardHeightRpx = height * 750 / sysInfo.windowWidth;
          messageListStyle.value.bottom = `${keyboardHeightRpx + 120}rpx`;
          setTimeout(() => {
            uni.pageScrollTo({
              scrollTop: 99999,
              // 滚动到页面底部
              duration: 100
            });
            scrollToBottom();
          }, 150);
          formatAppLog("log", "at pages/chat/chat.vue:2091", "已调整输入框位置到键盘上方，键盘高度:", height);
        } catch (e) {
          formatAppLog("error", "at pages/chat/chat.vue:2093", "调整输入框位置失败:", e);
        }
      };
      const resetKeyboardAdjustment = () => {
        messageListStyle.value.bottom = "60rpx";
        inputContainerStyle.value.bottom = "0";
        keyboardHeight.value = 0;
        formatAppLog("log", "at pages/chat/chat.vue:2106", "键盘收起，重置输入框位置");
        setTimeout(() => {
          scrollToBottom();
        }, 300);
      };
      const messageListStyle = vue.ref({
        bottom: "60rpx"
        // 修改为减半后的值
      });
      const inputContainerStyle = vue.ref({
        bottom: "0"
      });
      const handleInputFocus = (e) => {
        if (isUserTap.value) {
          formatAppLog("log", "at pages/chat/chat.vue:2127", "用户主动点击后的聚焦，允许");
          return;
        }
        if (isIOS() && isFirstVisit.value) {
          formatAppLog("log", "at pages/chat/chat.vue:2133", "iOS设备首次自动聚焦，阻止");
          e && e.preventDefault && e.preventDefault();
          uni.hideKeyboard();
          window.hideKeyboardTimer = setTimeout(() => {
            uni.hideKeyboard();
            formatAppLog("log", "at pages/chat/chat.vue:2141", "再次隐藏键盘");
          }, 100);
        } else if (isIOS()) {
          formatAppLog("log", "at pages/chat/chat.vue:2145", "iOS设备允许聚焦");
          isFirstVisit.value = false;
        }
      };
      const isFirstVisit = vue.ref(true);
      const isUserTap = vue.ref(false);
      const keyboardHeight = vue.ref(0);
      const isKeyboardVisible = vue.ref(false);
      const setupIOSKeyboardHandling = () => {
        try {
          if (plus && plus.key) {
            plus.key.addEventListener("showSoftKeybord", function(e) {
              formatAppLog("log", "at pages/chat/chat.vue:2169", "iOS键盘显示事件，高度:", e.height);
              const height = e.height || 0;
              keyboardHeight.value = height;
              isKeyboardVisible.value = true;
              setInputPosition(height);
              setTimeout(() => {
                scrollToBottom();
              }, 300);
            });
            plus.key.addEventListener("hideSoftKeybord", function() {
              formatAppLog("log", "at pages/chat/chat.vue:2187", "iOS键盘隐藏事件");
              keyboardHeight.value = 0;
              isKeyboardVisible.value = false;
              inputContainerStyle.value.bottom = "0px";
              messageListStyle.value.bottom = "60rpx";
              setTimeout(() => {
                scrollToBottom();
              }, 300);
            });
          } else {
            formatAppLog("log", "at pages/chat/chat.vue:2201", "plus.key API不可用，使用uni.onKeyboardHeightChange");
            useUniKeyboardAPI();
          }
        } catch (error) {
          formatAppLog("error", "at pages/chat/chat.vue:2205", "设置iOS键盘处理失败:", error);
          useUniKeyboardAPI();
        }
      };
      const setInputPosition = (keyboardHeight2) => {
        const safeMargin = 10;
        inputContainerStyle.value.bottom = `${keyboardHeight2 + safeMargin}px`;
        const systemInfo = uni.getSystemInfoSync();
        const screenWidth = systemInfo.windowWidth;
        const keyboardHeightRpx = keyboardHeight2 * 750 / screenWidth;
        messageListStyle.value.bottom = `${keyboardHeightRpx + 120}rpx`;
        formatAppLog("log", "at pages/chat/chat.vue:2233", "iOS设置输入框位置完成");
      };
      const useUniKeyboardAPI = () => {
        uni.onKeyboardHeightChange((res2) => {
          formatAppLog("log", "at pages/chat/chat.vue:2239", "键盘高度变化(uni API):", res2.height);
          const height = res2.height;
          if (height > 0) {
            keyboardHeight.value = height;
            isKeyboardVisible.value = true;
            setInputPosition(height);
            setTimeout(() => {
              scrollToBottom();
            }, 300);
          } else {
            keyboardHeight.value = 0;
            isKeyboardVisible.value = false;
            inputContainerStyle.value.bottom = "0px";
            messageListStyle.value.bottom = "60rpx";
            setTimeout(() => {
              scrollToBottom();
            }, 300);
          }
        });
      };
      const handleInputBlur = () => {
        formatAppLog("log", "at pages/chat/chat.vue:2271", "输入框失焦");
        if (isIOS()) {
          setTimeout(() => {
            inputContainerStyle.value.bottom = `env(safe-area-inset-bottom)`;
            messageListStyle.value.bottom = "60rpx";
          }, 100);
        }
      };
      const handleInputTap = () => {
        formatAppLog("log", "at pages/chat/chat.vue:2284", "用户主动点击输入框");
        isUserTap.value = true;
        isFirstVisit.value = false;
        setTimeout(() => {
          try {
            const query = uni.createSelectorQuery().in(vue.getCurrentInstance());
            query.select(".message-input").node((res2) => {
              if (res2 && res2.node && res2.node.focus) {
                formatAppLog("log", "at pages/chat/chat.vue:2298", "强制聚焦输入框");
                res2.node.focus();
              }
            }).exec();
          } catch (e) {
            formatAppLog("error", "at pages/chat/chat.vue:2303", "聚焦输入框失败:", e);
          }
        }, 50);
        if (window.hideKeyboardTimer) {
          clearTimeout(window.hideKeyboardTimer);
          window.hideKeyboardTimer = null;
        }
      };
      const handleContainerTap = () => {
        formatAppLog("log", "at pages/chat/chat.vue:2316", "用户点击输入框容器");
        isUserTap.value = true;
        isFirstVisit.value = false;
        setTimeout(() => {
          try {
            const query = uni.createSelectorQuery().in(vue.getCurrentInstance());
            query.select(".message-input").node((res2) => {
              if (res2 && res2.node && res2.node.focus) {
                formatAppLog("log", "at pages/chat/chat.vue:2330", "强制聚焦输入框");
                res2.node.focus();
              }
            }).exec();
          } catch (e) {
            formatAppLog("error", "at pages/chat/chat.vue:2335", "聚焦输入框失败:", e);
          }
        }, 50);
        if (window.hideKeyboardTimer) {
          clearTimeout(window.hideKeyboardTimer);
          window.hideKeyboardTimer = null;
        }
      };
      const validChatHistory = vue.computed(() => {
        return chatStore2.chatHistory.filter(
          (chat) => chat && chat.id && typeof chat.id !== "undefined"
        );
      });
      const handleHistoryTouchStart = (e) => {
        e.stopPropagation();
      };
      const handleHistoryTouchMove = (e) => {
        e.stopPropagation();
      };
      const handleHistoryTouchEnd = (e) => {
        e.stopPropagation();
      };
      const __returned__ = { get DOMPurify() {
        return DOMPurify;
      }, set DOMPurify(v) {
        DOMPurify = v;
      }, userStore, userAvatar, aiAvatar, chatStore: chatStore2, currentRoleName, currentRoleAvatar, currentRoleId, isSidebarOpen, sidebarClosing, sidebarVisible, showNewChatModal, modalClosing, modalActive, showRolePickerModal, rolePickerClosing, isEditMode, rolesList, newChat, selectedRoleName, selectedRoleId, selectedRoleAvatar, currentBackgroundImage, imageLoadError, handleImageError, handleImageLoad, handleRoleAvatarError, handleRoleItemAvatarError, handleSelectedAvatarError, getCurrentRoleInfo, messages, inputMessage, scrollIntoView, isWaitingResponse, loadChatMessages, sendMessage, switchChat, scrollToBottom, formatTime, goBack, copyMessage, showNewChatDialog, closeNewChatDialog, getRoles: getRoles2, getRoleNameById, showRolePicker, hideRolePicker, selectRole, handleTopKChange, handleSimilarityChange, editChat: editChat2, confirmDeleteChat, deleteChat: deleteChat2, createNewChat, renderMarkdown, toggleSidebar, scrollHistoryToBottom, tryScrollToBottom, openSidebar, closeSidebar, formatDate, touchStartX, touchStartY, touchEndX, touchCurrentX, sidebarWidth, sidebarDragPosition, isDraggingSidebar, minSwipeDistance, minSwipeSpeed, touchStartTime, handleTouchStart, handleTouchMove, handleTouchEnd, goBackToHome, showNewChatDialogFromSidebar, openSidebarWithRefresh, focusMessageInput, getChatMessages, refreshHistoryChat, messageInput, isIOS, handleConfirmSend, handleSendClick, manualScrollTop, isUserScrolling, lastScrollTop, autoScrollEnabled, touchStartYPos, handleListTouchStart, handleListTouchMove, handleListTouchEnd, handleScroll, adjustInputForKeyboard, resetKeyboardAdjustment, messageListStyle, inputContainerStyle, handleInputFocus, isFirstVisit, isUserTap, keyboardHeight, isKeyboardVisible, setupIOSKeyboardHandling, setInputPosition, useUniKeyboardAPI, handleInputBlur, handleInputTap, handleContainerTap, validChatHistory, handleHistoryTouchStart, handleHistoryTouchMove, handleHistoryTouchEnd, ref: vue.ref, computed: vue.computed, onMounted: vue.onMounted, nextTick: vue.nextTick, getCurrentInstance: vue.getCurrentInstance, onErrorCaptured: vue.onErrorCaptured, onUnmounted: vue.onUnmounted, watch: vue.watch, get useUserStore() {
        return useUserStore;
      }, get useChatStore() {
        return useChatStore;
      }, get chatApi() {
        return chatApi;
      }, get marked() {
        return marked;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "chat-container",
        onTouchstart: $setup.handleTouchStart,
        onTouchmove: $setup.handleTouchMove,
        onTouchend: $setup.handleTouchEnd
      },
      [
        vue.createCommentVNode(" 移除背景图片，改用纯白色背景 "),
        vue.createCommentVNode(" 顶部导航栏 "),
        vue.createElementVNode("view", { class: "nav-header" }, [
          vue.createElementVNode("view", {
            class: "nav-left",
            onClick: $setup.goBack
          }, [
            vue.createElementVNode("view", { class: "icon-wrapper" }, [
              vue.createVNode(_component_uni_icons, {
                type: "back",
                size: "24",
                color: "#333"
              })
            ])
          ]),
          vue.createCommentVNode(" 修改为显示当前角色信息 "),
          vue.createElementVNode("view", { class: "nav-center" }, [
            vue.createElementVNode("view", { class: "role-info" }, [
              vue.createElementVNode("view", { class: "role-avatar" }, [
                $setup.currentRoleAvatar ? (vue.openBlock(), vue.createElementBlock("image", {
                  key: 0,
                  src: $setup.currentRoleAvatar,
                  mode: "aspectFill",
                  class: "avatar-image",
                  onError: $setup.handleRoleAvatarError
                }, null, 40, ["src"])) : (vue.openBlock(), vue.createElementBlock(
                  "text",
                  {
                    key: 1,
                    class: "avatar-text"
                  },
                  vue.toDisplayString($setup.currentRoleName ? $setup.currentRoleName.substring(0, 1) : "A"),
                  1
                  /* TEXT */
                ))
              ]),
              vue.createElementVNode(
                "text",
                { class: "nav-title" },
                vue.toDisplayString($setup.currentRoleName),
                1
                /* TEXT */
              )
            ])
          ]),
          vue.createElementVNode("view", { class: "nav-right" }, [
            vue.createCommentVNode(" 修改这两个按钮，增加事件阻止冒泡，图标改为黑色 "),
            vue.createElementVNode("view", {
              class: "icon-wrapper compose-btn",
              onClick: vue.withModifiers($setup.showNewChatDialog, ["stop"])
            }, [
              vue.createVNode(_component_uni_icons, {
                type: "compose",
                size: "22",
                color: "#333"
              })
            ]),
            vue.createElementVNode("view", {
              class: "icon-wrapper history-btn",
              onClick: vue.withModifiers($setup.toggleSidebar, ["stop"])
            }, [
              vue.createVNode(_component_uni_icons, {
                type: $setup.isSidebarOpen ? "right" : "list",
                size: "22",
                color: "#333"
              }, null, 8, ["type"])
            ])
          ])
        ]),
        vue.createCommentVNode(" 侧边栏-聊天历史 "),
        $setup.sidebarVisible ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 0,
            class: vue.normalizeClass(["sidebar-overlay", { "active": $setup.isSidebarOpen }]),
            onClick: $setup.closeSidebar,
            onTouchstart: _cache[5] || (_cache[5] = vue.withModifiers(() => {
            }, ["stop"])),
            onTouchmove: _cache[6] || (_cache[6] = vue.withModifiers(() => {
            }, ["stop"])),
            onTouchend: _cache[7] || (_cache[7] = vue.withModifiers(() => {
            }, ["stop"]))
          },
          [
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["sidebar", { active: $setup.isSidebarOpen, closing: $setup.sidebarClosing }]),
                style: vue.normalizeStyle({ transform: $setup.isDraggingSidebar ? `translateX(${$setup.sidebarDragPosition - 100}%)` : "" }),
                onClick: _cache[1] || (_cache[1] = vue.withModifiers(() => {
                }, ["stop"])),
                onTouchstart: _cache[2] || (_cache[2] = vue.withModifiers(() => {
                }, ["stop"])),
                onTouchmove: _cache[3] || (_cache[3] = vue.withModifiers(() => {
                }, ["stop"])),
                onTouchend: _cache[4] || (_cache[4] = vue.withModifiers(() => {
                }, ["stop"]))
              },
              [
                vue.createElementVNode("view", { class: "sidebar-header" }, [
                  vue.createElementVNode("text", { class: "sidebar-title" }, "会话历史"),
                  vue.createElementVNode("view", { class: "sidebar-actions" }, [
                    vue.createCommentVNode(" 添加新建会话按钮，使用加号图标 "),
                    vue.createElementVNode("view", {
                      class: "icon-wrapper new-chat-btn",
                      onClick: vue.withModifiers($setup.showNewChatDialogFromSidebar, ["stop"])
                    }, [
                      vue.createVNode(_component_uni_icons, {
                        type: "plus",
                        size: "24",
                        color: "#007AFF"
                      })
                    ])
                  ])
                ]),
                vue.createElementVNode(
                  "scroll-view",
                  {
                    class: "history-list",
                    "scroll-y": "",
                    onTouchstart: vue.withModifiers($setup.handleHistoryTouchStart, ["stop"]),
                    onTouchmove: vue.withModifiers($setup.handleHistoryTouchMove, ["stop"]),
                    onTouchend: vue.withModifiers($setup.handleHistoryTouchEnd, ["stop"])
                  },
                  [
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList($setup.validChatHistory, (chat, index) => {
                        return vue.openBlock(), vue.createElementBlock("view", {
                          key: chat.id,
                          class: vue.normalizeClass(["history-item", {
                            active: $setup.chatStore.chatIndex === index,
                            "last-item": index === $setup.validChatHistory.length - 1
                          }]),
                          onClick: vue.withModifiers(($event) => $setup.switchChat(chat.id), ["stop"])
                        }, [
                          vue.createElementVNode(
                            "text",
                            { class: "history-title" },
                            vue.toDisplayString(chat.chatName || "未命名会话"),
                            1
                            /* TEXT */
                          ),
                          vue.createElementVNode("view", { class: "history-meta" }, [
                            vue.createElementVNode(
                              "text",
                              { class: "history-time" },
                              vue.toDisplayString($setup.formatDate(chat.createdAt)),
                              1
                              /* TEXT */
                            ),
                            chat.messageCount ? (vue.openBlock(), vue.createElementBlock(
                              "text",
                              {
                                key: 0,
                                class: "history-count"
                              },
                              vue.toDisplayString(chat.messageCount) + "条消息",
                              1
                              /* TEXT */
                            )) : vue.createCommentVNode("v-if", true)
                          ]),
                          vue.createCommentVNode(" 会话操作按钮 "),
                          vue.createElementVNode("view", {
                            class: "history-actions",
                            onClick: _cache[0] || (_cache[0] = vue.withModifiers(() => {
                            }, ["stop"]))
                          }, [
                            vue.createElementVNode("view", {
                              class: "icon-wrapper action-btn edit-btn",
                              onClick: vue.withModifiers(($event) => $setup.editChat(chat), ["stop"])
                            }, [
                              vue.createVNode(_component_uni_icons, {
                                type: "compose",
                                size: "20",
                                color: "#999"
                              })
                            ], 8, ["onClick"]),
                            vue.createElementVNode("view", {
                              class: "icon-wrapper action-btn delete-btn",
                              onClick: vue.withModifiers(($event) => $setup.confirmDeleteChat(chat), ["stop"])
                            }, [
                              vue.createVNode(_component_uni_icons, {
                                type: "trash-filled",
                                size: "22",
                                color: "#ff5a5f"
                              })
                            ], 8, ["onClick"])
                          ])
                        ], 10, ["onClick"]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    )),
                    $setup.validChatHistory.length === 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 0,
                      class: "empty-history"
                    }, [
                      vue.createElementVNode("text", null, "暂无会话历史")
                    ])) : vue.createCommentVNode("v-if", true),
                    vue.createCommentVNode(" 非常小的底部间距，只为了防止内容紧贴底部 "),
                    vue.createElementVNode("view", { class: "history-bottom-space" })
                  ],
                  32
                  /* NEED_HYDRATION */
                )
              ],
              38
              /* CLASS, STYLE, NEED_HYDRATION */
            )
          ],
          34
          /* CLASS, NEED_HYDRATION */
        )) : vue.createCommentVNode("v-if", true),
        vue.createCommentVNode(" 聊天消息列表区域 "),
        vue.createElementVNode("scroll-view", {
          class: "message-list",
          "scroll-y": "",
          "scroll-into-view": $setup.scrollIntoView,
          "scroll-with-animation": "false",
          "scroll-top": $setup.manualScrollTop,
          enhanced: true,
          bounces: true,
          "show-scrollbar": true,
          "fast-deceleration": true,
          style: vue.normalizeStyle($setup.messageListStyle),
          onScroll: $setup.handleScroll,
          onTouchstart: $setup.handleListTouchStart,
          onTouchmove: $setup.handleListTouchMove,
          onTouchend: $setup.handleListTouchEnd
        }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.chatStore.currentMessages, (message, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                key: index,
                id: `msg-${index}`,
                class: vue.normalizeClass(["message-item", message.isUser ? "user-message" : "ai-message"])
              }, [
                vue.createCommentVNode(" 用户消息显示气泡 "),
                message.isUser ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "message-bubble"
                }, [
                  vue.createElementVNode("view", { class: "message-content-wrapper" }, [
                    vue.createElementVNode(
                      "view",
                      { class: "message-content" },
                      vue.toDisplayString(message.content),
                      1
                      /* TEXT */
                    )
                  ])
                ])) : (vue.openBlock(), vue.createElementBlock(
                  vue.Fragment,
                  { key: 1 },
                  [
                    vue.createCommentVNode(" AI消息不显示气泡，全宽显示 "),
                    vue.createElementVNode("view", { class: "ai-message-container" }, [
                      vue.createElementVNode("view", { class: "ai-message-content" }, [
                        vue.createElementVNode("view", {
                          class: "markdown-content",
                          innerHTML: $setup.renderMarkdown(message.content)
                        }, null, 8, ["innerHTML"])
                      ])
                    ])
                  ],
                  2112
                  /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                ))
              ], 10, ["id"]);
            }),
            128
            /* KEYED_FRAGMENT */
          )),
          vue.createCommentVNode(" 消息列表为空时显示的提示 "),
          $setup.chatStore.currentMessages.length === 0 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "empty-hint"
          }, [
            $setup.validChatHistory.length === 0 ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "hint-text"
            }, "暂无会话先创建会话把")) : (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: "hint-text"
            }, "发送消息开始聊天"))
          ])) : vue.createCommentVNode("v-if", true),
          vue.createCommentVNode(" 等待AI回复的呼吸小黑球，当最后一条消息是AI消息且状态为loading时显示 "),
          $setup.chatStore.currentMessages.length > 0 && !$setup.chatStore.currentMessages[$setup.chatStore.currentMessages.length - 1].isUser && $setup.chatStore.currentMessages[$setup.chatStore.currentMessages.length - 1].status === "loading" && $setup.chatStore.currentMessages[$setup.chatStore.currentMessages.length - 1].content === "" ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "waiting-indicator"
          }, [
            vue.createElementVNode("view", { class: "breathing-dot" })
          ])) : vue.createCommentVNode("v-if", true)
        ], 44, ["scroll-into-view", "scroll-top"]),
        vue.createCommentVNode(" 底部输入区域 "),
        vue.createElementVNode(
          "view",
          {
            class: "input-container",
            style: vue.normalizeStyle($setup.inputContainerStyle),
            onClick: $setup.handleContainerTap
          },
          [
            vue.createElementVNode("view", { class: "input-wrapper" }, [
              vue.withDirectives(vue.createElementVNode("input", {
                class: "message-input",
                type: "text",
                "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $setup.inputMessage = $event),
                placeholder: "询问任何问题",
                "confirm-type": "send",
                onConfirm: $setup.handleConfirmSend,
                ref: "messageInput",
                disabled: $setup.chatStore.chatHistory.length === 0 || $setup.isWaitingResponse,
                focus: false,
                "auto-focus": false,
                "adjust-position": true,
                fixed: true,
                "hold-keyboard": true,
                "cursor-spacing": "30",
                onFocus: $setup.handleInputFocus,
                onBlur: $setup.handleInputBlur,
                onClick: [$setup.handleInputTap, $setup.handleInputTap]
              }, null, 40, ["disabled"]), [
                [vue.vModelText, $setup.inputMessage]
              ]),
              vue.createElementVNode("view", { class: "right-icons" }, [
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(["send-btn", { "active": $setup.inputMessage.trim().length > 0 && $setup.chatStore.chatHistory.length > 0 && !$setup.isWaitingResponse }]),
                    onClick: $setup.handleSendClick
                  },
                  [
                    vue.createVNode(_component_uni_icons, {
                      type: "paperplane",
                      size: "20",
                      color: $setup.inputMessage.trim().length > 0 && $setup.chatStore.chatHistory.length > 0 && !$setup.isWaitingResponse ? "#007AFF" : "#CCCCCC"
                    }, null, 8, ["color"])
                  ],
                  2
                  /* CLASS */
                )
              ])
            ])
          ],
          4
          /* STYLE */
        ),
        vue.createCommentVNode(" 新建会话弹窗 "),
        $setup.showNewChatModal ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 1,
            class: vue.normalizeClass(["modal-overlay", { "active": $setup.modalActive }]),
            onClick: $setup.closeNewChatDialog
          },
          [
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["modal-content", { "active": $setup.modalActive, "closing": $setup.modalClosing }]),
                onClick: _cache[11] || (_cache[11] = vue.withModifiers(() => {
                }, ["stop"]))
              },
              [
                vue.createElementVNode("view", { class: "popup-header" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "popup-title" },
                    vue.toDisplayString($setup.isEditMode ? "编辑会话" : "新建会话"),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("view", {
                    class: "popup-close",
                    onClick: $setup.closeNewChatDialog
                  }, [
                    vue.createVNode(_component_uni_icons, {
                      type: "close",
                      size: "20",
                      color: "#666"
                    })
                  ])
                ]),
                vue.createElementVNode("view", { class: "input-group" }, [
                  vue.createElementVNode("view", { class: "input-label" }, [
                    vue.createTextVNode("会话名称 "),
                    vue.createElementVNode(
                      "text",
                      { class: "char-counter" },
                      vue.toDisplayString($setup.newChat.chatName.length) + "/10",
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.withDirectives(vue.createElementVNode(
                    "input",
                    {
                      class: "task-input chat-name-input",
                      "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => $setup.newChat.chatName = $event),
                      placeholder: "不填则AI自动生成",
                      maxlength: "10"
                    },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [vue.vModelText, $setup.newChat.chatName]
                  ])
                ]),
                vue.createElementVNode("view", { class: "input-group" }, [
                  vue.createElementVNode("view", { class: "input-label" }, "TopK"),
                  vue.createElementVNode("view", { class: "slider-container" }, [
                    vue.createElementVNode("slider", {
                      value: $setup.newChat.topK,
                      min: 1,
                      max: 20,
                      step: 1,
                      "show-value": true,
                      onChange: $setup.handleTopKChange,
                      activeColor: "#007AFF",
                      backgroundColor: "#e0e0e0",
                      "block-color": "#007AFF",
                      "block-size": "24"
                    }, null, 40, ["value"])
                  ])
                ]),
                vue.createElementVNode("view", { class: "input-group" }, [
                  vue.createElementVNode("view", { class: "input-label" }, "相似度"),
                  vue.createElementVNode("view", { class: "slider-container" }, [
                    vue.createElementVNode("slider", {
                      value: $setup.newChat.similarity * 100,
                      min: 0,
                      max: 100,
                      step: 1,
                      "show-value": true,
                      onChange: $setup.handleSimilarityChange,
                      activeColor: "#007AFF",
                      backgroundColor: "#e0e0e0",
                      "block-color": "#007AFF",
                      "block-size": "24"
                    }, null, 40, ["value"])
                  ])
                ]),
                vue.createElementVNode("view", { class: "input-group" }, [
                  vue.createElementVNode("view", { class: "input-label" }, "人设"),
                  vue.createElementVNode("view", {
                    class: "task-input picker-input",
                    onClick: $setup.showRolePicker
                  }, [
                    vue.createElementVNode("view", { class: "picker-content" }, [
                      vue.createCommentVNode(" 添加选中角色的头像显示 "),
                      $setup.selectedRoleId ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 0,
                        class: "selected-role-avatar"
                      }, [
                        $setup.selectedRoleAvatar ? (vue.openBlock(), vue.createElementBlock("image", {
                          key: 0,
                          src: $setup.selectedRoleAvatar,
                          class: "avatar-image",
                          mode: "aspectFill",
                          onError: $setup.handleSelectedAvatarError
                        }, null, 40, ["src"])) : (vue.openBlock(), vue.createElementBlock(
                          "text",
                          {
                            key: 1,
                            class: "avatar-text"
                          },
                          vue.toDisplayString($setup.selectedRoleName ? $setup.selectedRoleName.substring(0, 1) : "A"),
                          1
                          /* TEXT */
                        ))
                      ])) : vue.createCommentVNode("v-if", true),
                      vue.createElementVNode(
                        "view",
                        {
                          class: vue.normalizeClass(["picker-text", { "has-avatar": $setup.selectedRoleId }])
                        },
                        vue.toDisplayString($setup.selectedRoleName),
                        3
                        /* TEXT, CLASS */
                      )
                    ])
                  ])
                ]),
                vue.createCommentVNode(" 人设选择弹窗 "),
                $setup.showRolePickerModal ? (vue.openBlock(), vue.createElementBlock(
                  "view",
                  {
                    key: 0,
                    class: vue.normalizeClass(["role-picker-modal", { "closing": $setup.rolePickerClosing }]),
                    onClick: vue.withModifiers($setup.hideRolePicker, ["stop"])
                  },
                  [
                    vue.createElementVNode(
                      "view",
                      {
                        class: vue.normalizeClass(["role-list", { "closing": $setup.rolePickerClosing }]),
                        onClick: _cache[10] || (_cache[10] = vue.withModifiers(() => {
                        }, ["stop"]))
                      },
                      [
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList($setup.rolesList, (role, index) => {
                            return vue.openBlock(), vue.createElementBlock("view", {
                              key: role.id,
                              class: "role-item",
                              onClick: ($event) => $setup.selectRole(role, index)
                            }, [
                              vue.createCommentVNode(" 添加人设头像 "),
                              vue.createElementVNode("view", { class: "role-avatar" }, [
                                role.avatar ? (vue.openBlock(), vue.createElementBlock("image", {
                                  key: 0,
                                  src: role.avatar,
                                  class: "avatar-image",
                                  mode: "aspectFill",
                                  onError: ($event) => $setup.handleRoleItemAvatarError(index)
                                }, null, 40, ["src", "onError"])) : (vue.openBlock(), vue.createElementBlock(
                                  "text",
                                  {
                                    key: 1,
                                    class: "avatar-text"
                                  },
                                  vue.toDisplayString(role.name ? role.name.substring(0, 1) : "A"),
                                  1
                                  /* TEXT */
                                ))
                              ]),
                              vue.createElementVNode(
                                "text",
                                { class: "role-name" },
                                vue.toDisplayString(role.name),
                                1
                                /* TEXT */
                              )
                            ], 8, ["onClick"]);
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ],
                      2
                      /* CLASS */
                    )
                  ],
                  2
                  /* CLASS */
                )) : vue.createCommentVNode("v-if", true),
                vue.createElementVNode("view", { class: "popup-actions" }, [
                  vue.createElementVNode("button", {
                    class: "cancel-btn",
                    onClick: $setup.closeNewChatDialog
                  }, "取消"),
                  vue.createElementVNode(
                    "button",
                    {
                      class: "confirm-btn",
                      onClick: $setup.createNewChat
                    },
                    vue.toDisplayString($setup.isEditMode ? "保存" : "完成"),
                    1
                    /* TEXT */
                  )
                ])
              ],
              2
              /* CLASS */
            )
          ],
          2
          /* CLASS */
        )) : vue.createCommentVNode("v-if", true)
      ],
      32
      /* NEED_HYDRATION */
    );
  }
  const PagesChatChat = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__scopeId", "data-v-0a633310"], ["__file", "C:/Users/Administrator/Documents/HBuilderProjects/todoPlus/pages/chat/chat.vue"]]);
  const CANCEL_DISTANCE = 100;
  const _sfc_main$5 = {
    name: "voice-recognition",
    data() {
      return {
        isRecording: false,
        isCancel: false,
        startY: 0,
        tipText: "按住说话",
        recorderManager: null,
        textTip: ""
      };
    },
    created() {
      this.initRecorderManager();
    },
    onReady() {
      this.$nextTick(() => {
        this.open();
      });
    },
    methods: {
      initRecorderManager() {
        this.recorderManager = uni.getRecorderManager();
        this.recorderManager.onStart(() => {
          formatAppLog("log", "at pages/testVoice/testVoice.vue:78", "recorder start");
        });
        this.recorderManager.onError((err) => {
          formatAppLog("error", "at pages/testVoice/testVoice.vue:83", "录音错误：", err);
          uni.showToast({
            title: "录音出错",
            icon: "none"
          });
          this.resetRecordingState();
        });
        this.recorderManager.onInterruptionBegin(() => {
          formatAppLog("log", "at pages/testVoice/testVoice.vue:93", "录音被中断");
          this.recorderManager.stop();
          this.resetRecordingState();
        });
        this.recorderManager.onInterruptionEnd(() => {
          formatAppLog("log", "at pages/testVoice/testVoice.vue:100", "录音中断结束");
        });
        this.recorderManager.onStop((res2) => {
          formatAppLog("log", "at pages/testVoice/testVoice.vue:105", "录音结束", res2);
          if (this.isCancel) {
            this.resetRecordingState();
            return;
          }
          this.handleRecordingFile(res2.tempFilePath);
        });
      },
      handleRecordingFile(tempFilePath) {
        uni.getFileInfo({
          filePath: tempFilePath,
          success: (fileInfo) => {
            if (fileInfo.size < 1024 || fileInfo.size > 2 * 1024 * 1024) {
              uni.showToast({
                title: "录音文件大小异常",
                icon: "none"
              });
              return;
            }
            this.uploadVoiceFile(tempFilePath);
          },
          fail: (err) => {
            formatAppLog("error", "at pages/testVoice/testVoice.vue:132", "获取文件信息失败：", err);
            uni.showToast({
              title: "文件读取失败",
              icon: "none"
            });
          },
          complete: () => {
            this.resetRecordingState();
          }
        });
      },
      uploadVoiceFile(tempFilePath) {
        uni.uploadFile({
          url: "https://5555api.com/data/api/fetchTextByVoice",
          filePath: tempFilePath,
          name: "audio",
          formData: {},
          header: {
            // 这是个测试的key，正式环境请到https://5555api.com申请
            apikey: "test_app_key_5555api"
          },
          success: (suc) => {
            try {
              const result = JSON.parse(suc.data);
              formatAppLog("log", "at pages/testVoice/testVoice.vue:157", "上传成功，解析结果：", result);
              this.textTip = result.data && result.data.partial || "未识别到内容";
            } catch (e) {
              formatAppLog("error", "at pages/testVoice/testVoice.vue:160", "解析结果失败：", e);
              this.textTip = "识别结果解析失败";
            }
          },
          fail: (err) => {
            formatAppLog("error", "at pages/testVoice/testVoice.vue:165", "上传失败：", err);
            uni.showToast({
              title: "上传失败",
              icon: "none"
            });
          }
        });
      },
      resetRecordingState() {
        this.isRecording = false;
        this.tipText = "按住说话";
      },
      open() {
        this.$refs.popup.open();
        this.textTip = "";
      },
      onPopupChange(e) {
        if (!e.show) {
          this.isRecording = false;
          this.isCancel = false;
          this.tipText = "按住说话";
        }
      },
      startRecord(e) {
        formatAppLog("error", "at pages/testVoice/testVoice.vue:193", "按下了");
        this.startY = e.touches[0].clientY;
        this.isRecording = true;
        this.isCancel = false;
        this.tipText = "松开结束";
        this.recorderManager.start({
          duration: 3e4,
          sampleRate: 16e3,
          numberOfChannels: 1,
          encodeBitRate: 16e3,
          format: "wav"
        });
      },
      moveRecord(e) {
        formatAppLog("error", "at pages/testVoice/testVoice.vue:210", "移动了");
        if (!this.isRecording)
          return;
        const moveY = this.startY - e.touches[0].clientY;
        if (moveY > CANCEL_DISTANCE) {
          this.isCancel = true;
          this.tipText = "松开取消";
        } else {
          this.isCancel = false;
          this.tipText = "松开结束";
        }
      },
      endRecord() {
        formatAppLog("error", "at pages/testVoice/testVoice.vue:224", "抬起了", this.isRecording);
        if (!this.isRecording)
          return;
        this.isRecording = false;
        this.recorderManager.stop();
        if (this.isCancel) {
          this.tipText = "已取消";
          setTimeout(() => {
            this.$refs.popup.close();
          }, 500);
        }
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_popup = vue.resolveComponent("uni-popup");
    return vue.openBlock(), vue.createElementBlock("view", { class: "voice-recognition" }, [
      vue.createVNode(_component_uni_popup, {
        ref: "popup",
        type: "bottom",
        "background-color": "#fff",
        "mask-click": true,
        onChange: $options.onPopupChange
      }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", { class: "popup-content" }, [
            vue.createCommentVNode(" 标题区域 "),
            vue.createElementVNode("view", { class: "header" }, [
              vue.createElementVNode("text", { class: "title" }, "语音识别"),
              vue.createElementVNode("text", { class: "subtitle" }, "按住说话，上滑取消")
            ]),
            vue.createCommentVNode(" 录音按钮区域 "),
            vue.createElementVNode("view", { class: "record-area" }, [
              vue.createElementVNode(
                "view",
                {
                  class: vue.normalizeClass(["record-btn", {
                    "recording": $data.isRecording,
                    "cancel": $data.isCancel,
                    "pulse": $data.isRecording
                  }]),
                  onTouchstart: _cache[0] || (_cache[0] = (...args) => $options.startRecord && $options.startRecord(...args)),
                  onTouchend: _cache[1] || (_cache[1] = (...args) => $options.endRecord && $options.endRecord(...args)),
                  onTouchmove: _cache[2] || (_cache[2] = (...args) => $options.moveRecord && $options.moveRecord(...args))
                },
                [
                  vue.createElementVNode("view", { class: "btn-inner" }, [
                    vue.createElementVNode("view", { class: "mic-icon" }, [
                      vue.createElementVNode("image", {
                        src: $data.isRecording ? "/static/icon_mic_fill.png" : "/static/icon_mic_no.png",
                        mode: "aspectFit"
                      }, null, 8, ["src"])
                    ]),
                    $data.isRecording ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 0,
                      class: "ripple"
                    })) : vue.createCommentVNode("v-if", true)
                  ])
                ],
                34
                /* CLASS, NEED_HYDRATION */
              )
            ]),
            vue.createCommentVNode(" 提示文字区域 "),
            vue.createElementVNode("view", { class: "tip-area" }, [
              vue.createElementVNode(
                "text",
                { class: "tip-text" },
                vue.toDisplayString($data.tipText),
                1
                /* TEXT */
              ),
              $data.isCancel ? (vue.openBlock(), vue.createElementBlock("text", {
                key: 0,
                class: "cancel-tip"
              }, "松开手指，取消发送")) : vue.createCommentVNode("v-if", true)
            ]),
            vue.createCommentVNode(" 结果展示区域 "),
            $data.textTip ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "result-area"
            }, [
              vue.createElementVNode("view", { class: "result-title" }, "识别结果"),
              vue.createElementVNode(
                "view",
                { class: "result-content" },
                vue.toDisplayString($data.textTip),
                1
                /* TEXT */
              )
            ])) : vue.createCommentVNode("v-if", true)
          ])
        ]),
        _: 1
        /* STABLE */
      }, 8, ["onChange"])
    ]);
  }
  const PagesTestVoiceTestVoice = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__scopeId", "data-v-b72c4926"], ["__file", "C:/Users/Administrator/Documents/HBuilderProjects/todoPlus/pages/testVoice/testVoice.vue"]]);
  const _sfc_main$4 = {
    __name: "aiRole",
    setup(__props, { expose: __expose }) {
      __expose();
      const userStore = useUserStore();
      const rolesList = vue.ref([]);
      const showDetailModal = vue.ref(false);
      const modalActive = vue.ref(false);
      const modalClosing = vue.ref(false);
      const currentRole = vue.ref({});
      const showCreateModal = vue.ref(false);
      const createModalActive = vue.ref(false);
      const createModalClosing = vue.ref(false);
      const newRole = vue.ref({
        name: "",
        avatar: "",
        // 头像路径，用于预览
        avatarFile: null,
        // 头像文件对象，用于上传 (H5/APP环境)
        tempFilePath: "",
        // 小程序环境下的临时文件路径
        prompt: ""
      });
      const showEditModal = vue.ref(false);
      const editModalActive = vue.ref(false);
      const editModalClosing = vue.ref(false);
      const editRole = vue.ref({
        id: "",
        name: "",
        avatar: "",
        avatarFile: null,
        tempFilePath: "",
        prompt: ""
      });
      const isFormValid = vue.computed(() => {
        return newRole.value.name.trim().length > 0;
      });
      const isEditFormValid = vue.computed(() => {
        return editRole.value.name.trim().length > 0;
      });
      const swipeStates = vue.ref({});
      const touchStartX = vue.ref(0);
      const touchStartY = vue.ref(0);
      const currentSwipeRoleId = vue.ref(null);
      const refresherTriggered = vue.ref(false);
      const currentBackgroundImage = vue.computed(() => {
        return userStore.userInfo.backgroudImg || "";
      });
      const getRolesList = async () => {
        try {
          const res2 = await chatApi.getRoles();
          formatAppLog("log", "at pages/aiRole/aiRole.vue:352", "人设API返回结果:", res2);
          if (res2) {
            rolesList.value = res2;
            rolesList.value.forEach((role, index) => {
              formatAppLog(
                "log",
                "at pages/aiRole/aiRole.vue:358",
                `角色[${index}] ${role.name} 头像信息:`,
                role.avatar || role.avatarUrl || role.avatarImage || "无头像",
                "类型:",
                typeof (role.avatar || role.avatarUrl || role.avatarImage)
              );
            });
          } else {
            rolesList.value = [];
          }
        } catch (error) {
          formatAppLog("error", "at pages/aiRole/aiRole.vue:366", "获取人设列表失败:", error);
          rolesList.value = [];
          uni.showToast({
            title: "获取人设列表失败",
            icon: "none"
          });
        }
      };
      const validateRoleName = (e) => {
        if (newRole.value.name.length > 10) {
          newRole.value.name = newRole.value.name.substring(0, 10);
        }
      };
      const validateEditRoleName = (e) => {
        if (editRole.value.name.length > 10) {
          editRole.value.name = editRole.value.name.substring(0, 10);
        }
      };
      const chooseAvatar = () => {
        uni.chooseImage({
          count: 1,
          // 最多可以选择的图片张数
          sizeType: ["compressed"],
          // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ["album", "camera"],
          // 从相册选择或使用相机
          success: (res2) => {
            formatAppLog("log", "at pages/aiRole/aiRole.vue:398", "选择头像成功, 完整结果:", res2);
            if (res2.tempFilePaths && res2.tempFilePaths.length > 0) {
              const tempPath = res2.tempFilePaths[0];
              formatAppLog("log", "at pages/aiRole/aiRole.vue:402", "设置头像路径:", tempPath);
              newRole.value.avatar = tempPath;
              newRole.value.tempFilePath = tempPath;
            }
          },
          fail: (err) => {
            formatAppLog("error", "at pages/aiRole/aiRole.vue:435", "选择头像失败:", err);
          }
        });
      };
      const chooseEditAvatar = () => {
        uni.chooseImage({
          count: 1,
          // 最多可以选择的图片张数
          sizeType: ["compressed"],
          // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ["album", "camera"],
          // 从相册选择或使用相机
          success: (res2) => {
            formatAppLog("log", "at pages/aiRole/aiRole.vue:447", "选择头像成功, 完整结果:", res2);
            if (res2.tempFilePaths && res2.tempFilePaths.length > 0) {
              const tempPath = res2.tempFilePaths[0];
              formatAppLog("log", "at pages/aiRole/aiRole.vue:451", "设置头像路径:", tempPath);
              editRole.value.avatar = tempPath;
              editRole.value.tempFilePath = tempPath;
            }
          },
          fail: (err) => {
            formatAppLog("error", "at pages/aiRole/aiRole.vue:484", "选择头像失败:", err);
          }
        });
      };
      const createNewRole = async () => {
        if (!isFormValid.value) {
          uni.showToast({
            title: "请填写人设名称",
            icon: "none"
          });
          return;
        }
        try {
          uni.showLoading({
            title: "创建中...",
            mask: true
          });
          formatAppLog("log", "at pages/aiRole/aiRole.vue:547", "准备创建新人设，完整数据:", newRole.value);
          const hasAvatar2 = !!newRole.value.tempFilePath;
          formatAppLog("log", "at pages/aiRole/aiRole.vue:549", "是否有头像:", hasAvatar2);
          const name = newRole.value.name;
          const prompt = newRole.value.prompt || "";
          const filePath = newRole.value.tempFilePath;
          formatAppLog("log", "at pages/aiRole/aiRole.vue:634", "小程序/APP环境，使用uni.uploadFile");
          const userStore2 = useUserStore();
          if (hasAvatar2) {
            formatAppLog("log", "at pages/aiRole/aiRole.vue:640", "上传文件路径:", filePath);
            await new Promise((resolve2, reject) => {
              uni.uploadFile({
                url: `${baseURL_}/ai/addRole`,
                filePath,
                name: "avatar",
                // 服务器接收文件的字段名
                formData: {
                  name,
                  prompt
                },
                header: {
                  Authorization: userStore2.userInfo.authorization ? `Bearer ${userStore2.userInfo.authorization}` : ""
                },
                success: (uploadRes) => {
                  formatAppLog("log", "at pages/aiRole/aiRole.vue:657", "上传结果:", uploadRes);
                  try {
                    const data = typeof uploadRes.data === "string" ? JSON.parse(uploadRes.data) : uploadRes.data;
                    formatAppLog("log", "at pages/aiRole/aiRole.vue:663", "解析后的上传结果:", data);
                    if (data && (data.code == 200 || data.code == "200")) {
                      resolve2(data);
                    } else {
                      reject(new Error((data == null ? void 0 : data.msg) || (data == null ? void 0 : data.message) || "上传失败"));
                    }
                  } catch (e) {
                    reject(new Error("解析响应失败"));
                  }
                },
                fail: (err) => {
                  formatAppLog("error", "at pages/aiRole/aiRole.vue:676", "上传失败:", err);
                  reject(err);
                }
              });
            });
            handleCreateSuccess();
          } else {
            formatAppLog("log", "at pages/aiRole/aiRole.vue:685", "无头像，使用普通请求");
            try {
              const result = await new Promise((resolve2, reject) => {
                uni.request({
                  url: `${baseURL_}/ai/addRole`,
                  method: "POST",
                  // 使用表单格式，不要使用JSON格式
                  data: {
                    name,
                    prompt: prompt || ""
                  },
                  header: {
                    // 表单格式，不要设置为application/json
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": userStore2.userInfo.authorization ? `Bearer ${userStore2.userInfo.authorization}` : ""
                  },
                  success: (res2) => {
                    var _a2, _b;
                    formatAppLog("log", "at pages/aiRole/aiRole.vue:706", "请求结果:", res2);
                    if (res2.statusCode === 200 && (res2.data.code === 200 || res2.data.code === "200")) {
                      resolve2(res2.data);
                    } else {
                      formatAppLog("error", "at pages/aiRole/aiRole.vue:711", "请求失败:", res2.data);
                      reject(new Error(((_a2 = res2.data) == null ? void 0 : _a2.msg) || ((_b = res2.data) == null ? void 0 : _b.message) || "请求失败"));
                    }
                  },
                  fail: (err) => {
                    formatAppLog("error", "at pages/aiRole/aiRole.vue:716", "请求失败:", err);
                    reject(err);
                  }
                });
              });
              handleCreateSuccess();
            } catch (requestError) {
              throw requestError;
            }
          }
        } catch (error) {
          uni.hideLoading();
          formatAppLog("error", "at pages/aiRole/aiRole.vue:731", "创建人设失败:", error);
          uni.showToast({
            title: "创建失败: " + (error.message || "请重试"),
            icon: "none",
            duration: 3e3
          });
        }
      };
      const handleCreateSuccess = () => {
        uni.hideLoading();
        uni.showToast({
          title: "创建成功",
          icon: "success"
        });
        resetCreateForm();
        closeCreateModal();
        getRolesList();
      };
      const resetCreateForm = () => {
        newRole.value = {
          name: "",
          avatar: "",
          avatarFile: null,
          tempFilePath: "",
          prompt: ""
        };
        formatAppLog("log", "at pages/aiRole/aiRole.vue:768", "表单已重置", newRole.value);
      };
      const openCreateModal = () => {
        resetCreateForm();
        showCreateModal.value = true;
        setTimeout(() => {
          createModalActive.value = true;
        }, 50);
      };
      const closeCreateModal = () => {
        createModalClosing.value = true;
        createModalActive.value = false;
        setTimeout(() => {
          showCreateModal.value = false;
          createModalClosing.value = false;
        }, 300);
      };
      const openEditModal = (role) => {
        editRole.value = { ...role };
        showEditModal.value = true;
        setTimeout(() => {
          editModalActive.value = true;
        }, 50);
      };
      const closeEditModal = () => {
        editModalClosing.value = true;
        editModalActive.value = false;
        setTimeout(() => {
          showEditModal.value = false;
          editModalClosing.value = false;
        }, 300);
      };
      const updateRole = async () => {
        if (!isEditFormValid.value) {
          uni.showToast({
            title: "请填写人设名称",
            icon: "none"
          });
          return;
        }
        try {
          uni.showLoading({
            title: "更新中...",
            mask: true
          });
          formatAppLog("log", "at pages/aiRole/aiRole.vue:831", "准备更新人设，完整数据:", editRole.value);
          formatAppLog("log", "at pages/aiRole/aiRole.vue:908", "APP或小程序环境，使用uni.uploadFile");
          const hasAvatar2 = !!editRole.value.tempFilePath;
          const userStore2 = useUserStore();
          if (hasAvatar2) {
            formatAppLog("log", "at pages/aiRole/aiRole.vue:915", "上传文件路径:", editRole.value.tempFilePath);
            await new Promise((resolve2, reject) => {
              uni.uploadFile({
                url: `${baseURL_}/ai/updRole`,
                filePath: editRole.value.tempFilePath,
                name: "avatar",
                formData: {
                  id: editRole.value.id,
                  name: editRole.value.name,
                  prompt: editRole.value.prompt || ""
                },
                header: {
                  Authorization: userStore2.userInfo.authorization ? `Bearer ${userStore2.userInfo.authorization}` : ""
                },
                success: (uploadRes) => {
                  formatAppLog("log", "at pages/aiRole/aiRole.vue:933", "上传结果:", uploadRes);
                  try {
                    const data = typeof uploadRes.data === "string" ? JSON.parse(uploadRes.data) : uploadRes.data;
                    formatAppLog("log", "at pages/aiRole/aiRole.vue:939", "解析后的上传结果:", data);
                    if (data && (data.code == 200 || data.code == "200")) {
                      resolve2(data);
                    } else {
                      reject(new Error((data == null ? void 0 : data.msg) || (data == null ? void 0 : data.message) || "上传失败"));
                    }
                  } catch (e) {
                    reject(new Error("解析响应失败"));
                  }
                },
                fail: (err) => {
                  formatAppLog("error", "at pages/aiRole/aiRole.vue:952", "上传失败:", err);
                  reject(err);
                }
              });
            });
            handleEditSuccess();
          } else {
            formatAppLog("log", "at pages/aiRole/aiRole.vue:962", "无头像，使用普通请求");
            try {
              const result = await new Promise((resolve2, reject) => {
                uni.request({
                  url: `${baseURL_}/ai/updRole`,
                  method: "POST",
                  data: {
                    id: editRole.value.id,
                    name: editRole.value.name,
                    prompt: editRole.value.prompt || ""
                  },
                  header: {
                    // 使用表单格式，不要使用JSON格式
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": userStore2.userInfo.authorization ? `Bearer ${userStore2.userInfo.authorization}` : ""
                  },
                  success: (res2) => {
                    var _a2, _b;
                    formatAppLog("log", "at pages/aiRole/aiRole.vue:982", "请求结果:", res2);
                    if (res2.statusCode === 200 && (res2.data.code === 200 || res2.data.code === "200")) {
                      resolve2(res2.data);
                    } else {
                      formatAppLog("error", "at pages/aiRole/aiRole.vue:987", "请求失败:", res2.data);
                      reject(new Error(((_a2 = res2.data) == null ? void 0 : _a2.msg) || ((_b = res2.data) == null ? void 0 : _b.message) || "请求失败"));
                    }
                  },
                  fail: (err) => {
                    formatAppLog("error", "at pages/aiRole/aiRole.vue:992", "请求失败:", err);
                    reject(err);
                  }
                });
              });
              handleEditSuccess();
            } catch (requestError) {
              throw requestError;
            } finally {
              uni.hideLoading();
            }
          }
        } catch (error) {
          uni.hideLoading();
          formatAppLog("error", "at pages/aiRole/aiRole.vue:1011", "更新人设失败:", error);
          uni.showToast({
            title: "更新失败: " + (error.message || "请重试"),
            icon: "none",
            duration: 3e3
          });
        }
      };
      const handleEditSuccess = () => {
        uni.hideLoading();
        uni.showToast({
          title: "更新成功",
          icon: "success"
        });
        closeEditModal();
        getRolesList();
      };
      const handleTouchStart = (e, roleId) => {
        touchStartX.value = e.touches[0].clientX;
        touchStartY.value = e.touches[0].clientY;
        currentSwipeRoleId.value = roleId;
      };
      const handleTouchMove = (e, roleId) => {
        if (currentSwipeRoleId.value !== roleId)
          return;
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;
        const deltaX = touchX - touchStartX.value;
        const deltaY = touchY - touchStartY.value;
        if (Math.abs(deltaY) > Math.abs(deltaX))
          return;
        if (deltaX < 0) {
          const translateX = Math.max(deltaX * 0.5, -120);
          if (!swipeStates.value[roleId]) {
            swipeStates.value[roleId] = {};
          }
          swipeStates.value[roleId].translateX = translateX;
          swipeStates.value[roleId].showDelete = translateX < -30;
        }
      };
      const handleTouchEnd = (e, roleId) => {
        if (currentSwipeRoleId.value !== roleId)
          return;
        const state = swipeStates.value[roleId];
        if (!state)
          return;
        if (state.translateX < -60) {
          confirmDelete(roleId);
        } else if (state.translateX < -30) {
          state.translateX = -120;
          state.showDelete = true;
        } else {
          resetSwipeState(roleId);
        }
        currentSwipeRoleId.value = null;
      };
      const resetSwipeState = (roleId) => {
        if (swipeStates.value[roleId]) {
          swipeStates.value[roleId].translateX = 0;
          swipeStates.value[roleId].showDelete = false;
        }
      };
      const resetAllSwipeStates = () => {
        Object.keys(swipeStates.value).forEach((roleId) => {
          resetSwipeState(roleId);
        });
      };
      const handleScroll = () => {
        resetAllSwipeStates();
      };
      const confirmDelete = (roleId) => {
        resetAllSwipeStates();
        const role = rolesList.value.find((item) => item.id === roleId);
        if (!role) {
          formatAppLog("error", "at pages/aiRole/aiRole.vue:1108", "未找到要删除的角色:", roleId);
          return;
        }
        uni.showModal({
          title: "删除确认",
          content: `确定要删除"${role.name}"角色吗？`,
          confirmColor: "#f56c6c",
          success: async (res2) => {
            if (res2.confirm) {
              await deleteRole2(roleId);
            }
          }
        });
      };
      const deleteRole2 = async (roleId) => {
        try {
          uni.showLoading({
            title: "删除中...",
            mask: true
          });
          const res2 = await chatApi.deleteRole(roleId);
          uni.hideLoading();
          if (res2) {
            uni.showToast({
              title: "删除成功",
              icon: "success",
              duration: 2e3
            });
            getRolesList();
          } else {
            throw new Error((res2 == null ? void 0 : res2.msg) || "删除失败");
          }
        } catch (error) {
          uni.hideLoading();
          formatAppLog("error", "at pages/aiRole/aiRole.vue:1152", "删除角色失败:", error);
          uni.showToast({
            title: "删除失败: " + (error.message || "请重试"),
            icon: "none",
            duration: 2e3
          });
        }
      };
      const editRoleItem = (role, event) => {
        if (event) {
          event.stopPropagation();
        }
        formatAppLog("log", "at pages/aiRole/aiRole.vue:1167", "编辑角色:", role);
      };
      const showRoleDetail = (role, event) => {
        if (event) {
          event.stopPropagation();
        }
        currentRole.value = role;
        showDetailModal.value = true;
        setTimeout(() => {
          modalActive.value = true;
        }, 50);
      };
      const closeRoleDetail = () => {
        modalClosing.value = true;
        modalActive.value = false;
        setTimeout(() => {
          showDetailModal.value = false;
          modalClosing.value = false;
        }, 300);
      };
      const goBack = () => {
        uni.navigateBack();
      };
      const handleImageError = () => {
        formatAppLog("log", "at pages/aiRole/aiRole.vue:1202", "背景图片加载失败");
      };
      const handleImageLoad = () => {
        formatAppLog("log", "at pages/aiRole/aiRole.vue:1206", "背景图片加载成功");
      };
      const handleAvatarError = (role) => {
        formatAppLog("error", "at pages/aiRole/aiRole.vue:1211", `头像加载失败，角色ID: ${role.id}，角色名称: ${role.name}`);
        formatAppLog("error", "at pages/aiRole/aiRole.vue:1212", `失败的头像URL: ${role.avatar}`);
        testImageUrl(role.avatar);
      };
      const testImageUrl = (url) => {
        if (!url)
          return;
        formatAppLog("log", "at pages/aiRole/aiRole.vue:1223", "尝试测试URL可访问性:", url);
        const img = new Image();
        img.onload = () => {
          formatAppLog("log", "at pages/aiRole/aiRole.vue:1229", "URL可以成功加载:", url);
        };
        img.onerror = () => {
          formatAppLog("error", "at pages/aiRole/aiRole.vue:1233", "URL无法加载:", url);
          formatAppLog("log", "at pages/aiRole/aiRole.vue:1234", "可能的原因: 1.跨域限制 2.URL不存在 3.服务器未响应 4.需要认证");
        };
        img.src = url;
      };
      const handleAvatarLoad = (role) => {
        formatAppLog("log", "at pages/aiRole/aiRole.vue:1243", `头像加载成功，角色ID: ${role.id}，头像URL: ${role.avatar}`);
      };
      const hasAvatar = (role) => {
        if (!role)
          return false;
        if (role.avatar) {
          formatAppLog("log", "at pages/aiRole/aiRole.vue:1252", `角色[${role.id}] ${role.name} 有头像:`, role.avatar);
          return true;
        }
        formatAppLog("log", "at pages/aiRole/aiRole.vue:1256", `角色[${role.id}] ${role.name} 无头像`);
        return false;
      };
      const getAvatarUrl = (role) => {
        if (!role || !role.avatar)
          return "";
        const url = role.avatar;
        formatAppLog("log", "at pages/aiRole/aiRole.vue:1266", `获取头像URL:`, url);
        return url;
      };
      const handleRefresherPulling = (e) => {
      };
      const handleRefresherRefresh = async () => {
        refresherTriggered.value = true;
        try {
          await getRolesList();
          uni.showToast({
            title: "刷新成功",
            icon: "success",
            duration: 1500
          });
        } catch (error) {
          formatAppLog("error", "at pages/aiRole/aiRole.vue:1288", "刷新失败:", error);
          uni.showToast({
            title: "刷新失败，请重试",
            icon: "none",
            duration: 2e3
          });
        } finally {
          setTimeout(() => {
            refresherTriggered.value = false;
          }, 800);
        }
      };
      const handleRefresherRestore = () => {
        refresherTriggered.value = false;
      };
      const showSystemRoles = vue.ref(true);
      const systemRoles = vue.computed(() => {
        return rolesList.value.filter((role) => role.isSystem);
      });
      const customRoles = vue.computed(() => {
        return rolesList.value.filter((role) => !role.isSystem);
      });
      const toggleSystemRoles = () => {
        showSystemRoles.value = !showSystemRoles.value;
      };
      vue.onMounted(async () => {
        await getRolesList();
        if (systemRoles.value.length > 0) {
          showSystemRoles.value = true;
        }
        if (customRoles.value.length > 0)
          ;
        if (rolesList.value.length === 0) {
          formatAppLog("log", "at pages/aiRole/aiRole.vue:1337", "开发环境中添加测试数据");
          rolesList.value = [
            {
              id: "test1",
              name: "测试角色1",
              prompt: "这是一个测试提示词，用于展示界面效果。",
              avatar: "https://via.placeholder.com/200",
              isSystem: true
            },
            {
              id: "test2",
              name: "无头像角色",
              prompt: "这个角色没有头像，将显示名称首字母。"
            },
            {
              id: "test3",
              name: "自定义角色1",
              prompt: "这是一个自定义角色，有头像。",
              avatar: "https://via.placeholder.com/200"
            },
            {
              id: "test4",
              name: "自定义角色2",
              prompt: "这是一个自定义角色，没有头像。"
            }
          ];
          showSystemRoles.value = true;
        }
      });
      const __returned__ = { userStore, rolesList, showDetailModal, modalActive, modalClosing, currentRole, showCreateModal, createModalActive, createModalClosing, newRole, showEditModal, editModalActive, editModalClosing, editRole, isFormValid, isEditFormValid, swipeStates, touchStartX, touchStartY, currentSwipeRoleId, refresherTriggered, currentBackgroundImage, getRolesList, validateRoleName, validateEditRoleName, chooseAvatar, chooseEditAvatar, createNewRole, handleCreateSuccess, resetCreateForm, openCreateModal, closeCreateModal, openEditModal, closeEditModal, updateRole, handleEditSuccess, handleTouchStart, handleTouchMove, handleTouchEnd, resetSwipeState, resetAllSwipeStates, handleScroll, confirmDelete, deleteRole: deleteRole2, editRoleItem, showRoleDetail, closeRoleDetail, goBack, handleImageError, handleImageLoad, handleAvatarError, testImageUrl, handleAvatarLoad, hasAvatar, getAvatarUrl, handleRefresherPulling, handleRefresherRefresh, handleRefresherRestore, showSystemRoles, systemRoles, customRoles, toggleSystemRoles, ref: vue.ref, onMounted: vue.onMounted, computed: vue.computed, get chatApi() {
        return chatApi;
      }, get useUserStore() {
        return useUserStore;
      }, get baseURL_() {
        return baseURL_;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0);
    const _component_uni_card = resolveEasycom(vue.resolveDynamicComponent("uni-card"), __easycom_1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "role-container" }, [
      vue.createCommentVNode(" 背景图片 "),
      $setup.currentBackgroundImage ? (vue.openBlock(), vue.createElementBlock("image", {
        key: 0,
        src: $setup.currentBackgroundImage,
        class: "background-image",
        mode: "aspectFill",
        onError: $setup.handleImageError,
        onLoad: $setup.handleImageLoad
      }, null, 40, ["src"])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 顶部导航栏 "),
      vue.createElementVNode("view", { class: "nav-header" }, [
        vue.createElementVNode("view", { class: "nav-left" }, [
          vue.createElementVNode("view", {
            class: "back-button",
            onClick: $setup.goBack
          }, [
            vue.createVNode(_component_uni_icons, {
              type: "back",
              size: "24",
              color: "#fff"
            })
          ])
        ]),
        vue.createElementVNode("view", { class: "nav-center" }, [
          vue.createElementVNode("text", { class: "nav-title" }, "AI人设")
        ]),
        vue.createElementVNode("view", { class: "nav-right" }, [
          vue.createCommentVNode(" 可以添加其他功能按钮，如新建人设 ")
        ])
      ]),
      vue.createCommentVNode(" 角色列表区域 "),
      vue.createElementVNode("scroll-view", {
        class: "role-list",
        "scroll-y": "true",
        onScroll: $setup.handleScroll,
        "refresher-enabled": "true",
        "refresher-background": "transparent",
        "refresher-triggered": $setup.refresherTriggered,
        onRefresherpulling: $setup.handleRefresherPulling,
        onRefresherrefresh: $setup.handleRefresherRefresh,
        onRefresherrestore: $setup.handleRefresherRestore,
        style: { "top": "160rpx" }
      }, [
        vue.createCommentVNode(" 自定义角色直接显示 "),
        vue.createElementVNode("view", { class: "group-content" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.customRoles, (role, index) => {
              return vue.openBlock(), vue.createBlock(
                _component_uni_card,
                {
                  key: role.id,
                  "is-shadow": false,
                  border: false,
                  margin: "8rpx 20rpx",
                  class: "role-card role-swipe-container"
                },
                {
                  default: vue.withCtx(() => {
                    var _a2, _b;
                    return [
                      vue.createElementVNode("view", { class: "role-swipe-wrapper" }, [
                        vue.createElementVNode("view", {
                          class: "role-item",
                          style: vue.normalizeStyle({ transform: `translateX(${((_a2 = $setup.swipeStates[role.id]) == null ? void 0 : _a2.translateX) || 0}rpx)` }),
                          onTouchstart: ($event) => $setup.handleTouchStart($event, role.id),
                          onTouchmove: ($event) => $setup.handleTouchMove($event, role.id),
                          onTouchend: ($event) => $setup.handleTouchEnd($event, role.id)
                        }, [
                          vue.createElementVNode(
                            "view",
                            {
                              class: vue.normalizeClass(["role-icon", { "has-avatar": $setup.hasAvatar(role) }])
                            },
                            [
                              $setup.hasAvatar(role) ? (vue.openBlock(), vue.createElementBlock("image", {
                                key: 0,
                                src: $setup.getAvatarUrl(role),
                                mode: "aspectFill",
                                class: "avatar-image",
                                onError: ($event) => $setup.handleAvatarError(role),
                                onLoad: ($event) => $setup.handleAvatarLoad(role)
                              }, null, 40, ["src", "onError", "onLoad"])) : (vue.openBlock(), vue.createElementBlock(
                                "text",
                                {
                                  key: 1,
                                  class: "icon-text"
                                },
                                vue.toDisplayString(role.name ? role.name.substring(0, 1) : "A"),
                                1
                                /* TEXT */
                              ))
                            ],
                            2
                            /* CLASS */
                          ),
                          vue.createElementVNode("view", {
                            class: "role-content",
                            onClick: ($event) => $setup.showRoleDetail(role, $event)
                          }, [
                            vue.createElementVNode("view", { class: "role-header" }, [
                              vue.createElementVNode(
                                "text",
                                { class: "role-name" },
                                vue.toDisplayString(role.name || "未命名角色"),
                                1
                                /* TEXT */
                              )
                            ]),
                            vue.createElementVNode("view", { class: "role-info" }, [
                              vue.createElementVNode(
                                "text",
                                { class: "role-desc" },
                                vue.toDisplayString(role.prompt ? role.prompt.length > 50 ? role.prompt.substring(0, 50) + "..." : role.prompt : "该角色暂无提示词"),
                                1
                                /* TEXT */
                              )
                            ])
                          ], 8, ["onClick"]),
                          vue.createElementVNode("view", { class: "role-actions" }, [
                            vue.createVNode(_component_uni_icons, {
                              type: "more-filled",
                              size: 24,
                              color: "#C7C7CC",
                              onClick: ($event) => $setup.editRoleItem(role, $event)
                            }, null, 8, ["onClick"])
                          ]),
                          vue.createCommentVNode(" 添加编辑图标 "),
                          vue.createElementVNode("view", {
                            class: "edit-button",
                            onClick: ($event) => $setup.openEditModal(role)
                          }, [
                            vue.createVNode(_component_uni_icons, {
                              type: "compose",
                              size: "20",
                              color: "#667eea"
                            })
                          ], 8, ["onClick"])
                        ], 44, ["onTouchstart", "onTouchmove", "onTouchend"]),
                        ((_b = $setup.swipeStates[role.id]) == null ? void 0 : _b.showDelete) ? (vue.openBlock(), vue.createElementBlock("view", {
                          key: 0,
                          class: "delete-action",
                          onClick: ($event) => $setup.confirmDelete(role.id)
                        }, [
                          vue.createVNode(_component_uni_icons, {
                            type: "trash",
                            size: "24",
                            color: "#fff"
                          })
                        ], 8, ["onClick"])) : vue.createCommentVNode("v-if", true)
                      ])
                    ];
                  }),
                  _: 2
                  /* DYNAMIC */
                },
                1024
                /* DYNAMIC_SLOTS */
              );
            }),
            128
            /* KEYED_FRAGMENT */
          )),
          $setup.customRoles.length === 0 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "empty-group-hint"
          }, [
            vue.createElementVNode("text", null, "暂无自定义人设，点击右下角按钮创建")
          ])) : vue.createCommentVNode("v-if", true)
        ]),
        vue.createCommentVNode(" 系统角色分组 "),
        $setup.systemRoles.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "role-group"
        }, [
          vue.createElementVNode("view", {
            class: "section-title",
            onClick: $setup.toggleSystemRoles
          }, [
            vue.createVNode(_component_uni_icons, {
              type: $setup.showSystemRoles ? "down" : "right",
              size: "16",
              color: "rgba(255, 255, 255, 0.7)"
            }, null, 8, ["type"]),
            vue.createElementVNode("text", { class: "section-text" }, "系统")
          ]),
          $setup.showSystemRoles ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "group-content"
          }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.systemRoles, (role, index) => {
                return vue.openBlock(), vue.createBlock(
                  _component_uni_card,
                  {
                    key: role.id,
                    "is-shadow": false,
                    border: false,
                    margin: "8rpx 20rpx",
                    class: "role-card role-swipe-container"
                  },
                  {
                    default: vue.withCtx(() => {
                      var _a2;
                      return [
                        vue.createElementVNode("view", { class: "role-swipe-wrapper" }, [
                          vue.createElementVNode(
                            "view",
                            {
                              class: vue.normalizeClass(["role-item", { "system-role": role.isSystem }]),
                              style: vue.normalizeStyle({ transform: `translateX(${((_a2 = $setup.swipeStates[role.id]) == null ? void 0 : _a2.translateX) || 0}rpx)` })
                            },
                            [
                              vue.createElementVNode(
                                "view",
                                {
                                  class: vue.normalizeClass(["role-icon", { "has-avatar": $setup.hasAvatar(role), "system-role-icon": role.isSystem }])
                                },
                                [
                                  $setup.hasAvatar(role) ? (vue.openBlock(), vue.createElementBlock("image", {
                                    key: 0,
                                    src: $setup.getAvatarUrl(role),
                                    mode: "aspectFill",
                                    class: "avatar-image",
                                    onError: ($event) => $setup.handleAvatarError(role),
                                    onLoad: ($event) => $setup.handleAvatarLoad(role)
                                  }, null, 40, ["src", "onError", "onLoad"])) : (vue.openBlock(), vue.createElementBlock(
                                    "text",
                                    {
                                      key: 1,
                                      class: "icon-text"
                                    },
                                    vue.toDisplayString(role.name ? role.name.substring(0, 1) : "A"),
                                    1
                                    /* TEXT */
                                  ))
                                ],
                                2
                                /* CLASS */
                              ),
                              vue.createElementVNode("view", {
                                class: "role-content",
                                onClick: ($event) => $setup.showRoleDetail(role, $event)
                              }, [
                                vue.createElementVNode("view", { class: "role-header" }, [
                                  vue.createElementVNode(
                                    "text",
                                    { class: "role-name" },
                                    vue.toDisplayString(role.name || "未命名角色"),
                                    1
                                    /* TEXT */
                                  ),
                                  vue.createCommentVNode(" 删除系统标签 ")
                                ]),
                                vue.createElementVNode("view", { class: "role-info" }, [
                                  vue.createElementVNode(
                                    "text",
                                    { class: "role-desc" },
                                    vue.toDisplayString(role.prompt ? role.prompt.length > 50 ? role.prompt.substring(0, 50) + "..." : role.prompt : "该角色暂无提示词"),
                                    1
                                    /* TEXT */
                                  )
                                ])
                              ], 8, ["onClick"]),
                              vue.createCommentVNode(" 移除了more图标 ")
                            ],
                            6
                            /* CLASS, STYLE */
                          )
                        ])
                      ];
                    }),
                    _: 2
                    /* DYNAMIC */
                  },
                  1024
                  /* DYNAMIC_SLOTS */
                );
              }),
              128
              /* KEYED_FRAGMENT */
            )),
            $setup.systemRoles.length === 0 ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "empty-group-hint"
            }, [
              vue.createElementVNode("text", null, "暂无系统人设")
            ])) : vue.createCommentVNode("v-if", true)
          ])) : vue.createCommentVNode("v-if", true)
        ])) : vue.createCommentVNode("v-if", true),
        vue.createCommentVNode(" 无数据提示 "),
        $setup.rolesList.length === 0 ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: "empty-hint"
        }, [
          vue.createElementVNode("text", null, "暂无人设数据")
        ])) : vue.createCommentVNode("v-if", true)
      ], 40, ["refresher-triggered"]),
      vue.createCommentVNode(" 新建人设按钮 "),
      vue.createElementVNode("view", { class: "add-button-wrapper" }, [
        vue.createElementVNode("view", {
          class: "add-button",
          onClick: $setup.openCreateModal
        }, [
          vue.createVNode(_component_uni_icons, {
            type: "plusempty",
            size: "24",
            color: "#fff"
          })
        ])
      ]),
      vue.createCommentVNode(" 角色详情弹窗 "),
      $setup.showDetailModal ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 1,
          class: vue.normalizeClass(["modal-overlay", { "active": $setup.modalActive }]),
          onClick: $setup.closeRoleDetail
        },
        [
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["modal-content role-detail-modal", { "active": $setup.modalActive, "closing": $setup.modalClosing }]),
              onClick: _cache[0] || (_cache[0] = vue.withModifiers(() => {
              }, ["stop"]))
            },
            [
              vue.createElementVNode("view", { class: "popup-header" }, [
                vue.createElementVNode(
                  "text",
                  { class: "popup-title" },
                  vue.toDisplayString($setup.currentRole.name),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("view", {
                  class: "popup-close",
                  onClick: $setup.closeRoleDetail
                }, [
                  vue.createVNode(_component_uni_icons, {
                    type: "close",
                    size: "20",
                    color: "#666"
                  })
                ])
              ]),
              vue.createElementVNode("scroll-view", {
                class: "prompt-content",
                "scroll-y": ""
              }, [
                vue.createElementVNode(
                  "view",
                  { class: "prompt-text" },
                  vue.toDisplayString($setup.currentRole.prompt || "该角色暂无提示词"),
                  1
                  /* TEXT */
                )
              ])
            ],
            2
            /* CLASS */
          )
        ],
        2
        /* CLASS */
      )) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 新建人设弹窗 "),
      $setup.showCreateModal ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 2,
          class: vue.normalizeClass(["modal-overlay", { "active": $setup.createModalActive }]),
          onClick: $setup.closeCreateModal
        },
        [
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["modal-content create-modal", { "active": $setup.createModalActive, "closing": $setup.createModalClosing }]),
              onClick: _cache[3] || (_cache[3] = vue.withModifiers(() => {
              }, ["stop"]))
            },
            [
              vue.createElementVNode("view", { class: "popup-header" }, [
                vue.createElementVNode("text", { class: "popup-title" }, "新建人设"),
                vue.createElementVNode("view", {
                  class: "popup-close",
                  onClick: $setup.closeCreateModal
                }, [
                  vue.createVNode(_component_uni_icons, {
                    type: "close",
                    size: "20",
                    color: "#666"
                  })
                ])
              ]),
              vue.createElementVNode("view", { class: "create-form" }, [
                vue.createElementVNode("view", { class: "form-item" }, [
                  vue.createElementVNode("view", { class: "form-label" }, [
                    vue.createElementVNode("text", null, "名称"),
                    vue.createElementVNode(
                      "text",
                      { class: "char-count" },
                      vue.toDisplayString($setup.newRole.name.length) + "/10",
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.withDirectives(vue.createElementVNode(
                    "input",
                    {
                      class: "form-input",
                      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.newRole.name = $event),
                      placeholder: "请输入人设名称(10字以内)",
                      maxlength: "10",
                      onInput: $setup.validateRoleName
                    },
                    null,
                    544
                    /* NEED_HYDRATION, NEED_PATCH */
                  ), [
                    [vue.vModelText, $setup.newRole.name]
                  ])
                ]),
                vue.createElementVNode("view", { class: "form-item" }, [
                  vue.createElementVNode("text", { class: "form-label" }, "头像"),
                  vue.createElementVNode("view", { class: "avatar-picker" }, [
                    vue.createElementVNode("view", {
                      class: "selected-avatar",
                      onClick: $setup.chooseAvatar
                    }, [
                      $setup.newRole.avatar ? (vue.openBlock(), vue.createElementBlock("image", {
                        key: 0,
                        src: $setup.newRole.avatar,
                        mode: "aspectFill",
                        class: "avatar-image"
                      }, null, 8, ["src"])) : (vue.openBlock(), vue.createElementBlock("view", {
                        key: 1,
                        class: "avatar-placeholder"
                      }, [
                        vue.createVNode(_component_uni_icons, {
                          type: "camera",
                          size: "24",
                          color: "#999"
                        })
                      ]))
                    ])
                  ])
                ]),
                vue.createElementVNode("view", { class: "form-item" }, [
                  vue.createElementVNode("text", { class: "form-label" }, "提示词"),
                  vue.withDirectives(vue.createElementVNode(
                    "textarea",
                    {
                      class: "form-textarea",
                      "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.newRole.prompt = $event),
                      placeholder: "请输入人设提示词",
                      maxlength: "5000"
                    },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [vue.vModelText, $setup.newRole.prompt]
                  ])
                ]),
                vue.createElementVNode("view", { class: "form-actions" }, [
                  vue.createElementVNode("button", {
                    class: "cancel-button",
                    onClick: $setup.closeCreateModal
                  }, "取消"),
                  vue.createElementVNode("button", {
                    class: "confirm-button",
                    onClick: $setup.createNewRole,
                    disabled: !$setup.isFormValid
                  }, "确定", 8, ["disabled"])
                ])
              ])
            ],
            2
            /* CLASS */
          )
        ],
        2
        /* CLASS */
      )) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 编辑人设弹窗 "),
      $setup.showEditModal ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 3,
          class: vue.normalizeClass(["modal-overlay", { "active": $setup.editModalActive }]),
          onClick: $setup.closeEditModal
        },
        [
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["modal-content create-modal", { "active": $setup.editModalActive, "closing": $setup.editModalClosing }]),
              onClick: _cache[6] || (_cache[6] = vue.withModifiers(() => {
              }, ["stop"]))
            },
            [
              vue.createElementVNode("view", { class: "popup-header" }, [
                vue.createElementVNode("text", { class: "popup-title" }, "编辑人设"),
                vue.createElementVNode("view", {
                  class: "popup-close",
                  onClick: $setup.closeEditModal
                }, [
                  vue.createVNode(_component_uni_icons, {
                    type: "close",
                    size: "20",
                    color: "#666"
                  })
                ])
              ]),
              vue.createElementVNode("view", { class: "create-form" }, [
                vue.createElementVNode("view", { class: "form-item" }, [
                  vue.createElementVNode("view", { class: "form-label" }, [
                    vue.createElementVNode("text", null, "名称"),
                    vue.createElementVNode(
                      "text",
                      { class: "char-count" },
                      vue.toDisplayString($setup.editRole.name.length) + "/10",
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.withDirectives(vue.createElementVNode(
                    "input",
                    {
                      class: "form-input",
                      "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.editRole.name = $event),
                      placeholder: "请输入人设名称(10字以内)",
                      maxlength: "10",
                      onInput: $setup.validateEditRoleName
                    },
                    null,
                    544
                    /* NEED_HYDRATION, NEED_PATCH */
                  ), [
                    [vue.vModelText, $setup.editRole.name]
                  ])
                ]),
                vue.createElementVNode("view", { class: "form-item" }, [
                  vue.createElementVNode("text", { class: "form-label" }, "头像"),
                  vue.createElementVNode("view", { class: "avatar-picker" }, [
                    vue.createElementVNode("view", {
                      class: "selected-avatar",
                      onClick: $setup.chooseEditAvatar
                    }, [
                      $setup.editRole.avatar ? (vue.openBlock(), vue.createElementBlock("image", {
                        key: 0,
                        src: $setup.editRole.avatar,
                        mode: "aspectFill",
                        class: "avatar-image"
                      }, null, 8, ["src"])) : (vue.openBlock(), vue.createElementBlock("view", {
                        key: 1,
                        class: "avatar-placeholder"
                      }, [
                        vue.createVNode(_component_uni_icons, {
                          type: "camera",
                          size: "24",
                          color: "#999"
                        })
                      ]))
                    ])
                  ])
                ]),
                vue.createElementVNode("view", { class: "form-item" }, [
                  vue.createElementVNode("text", { class: "form-label" }, "提示词"),
                  vue.withDirectives(vue.createElementVNode(
                    "textarea",
                    {
                      class: "form-textarea",
                      "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $setup.editRole.prompt = $event),
                      placeholder: "请输入人设提示词",
                      maxlength: "5000"
                    },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [vue.vModelText, $setup.editRole.prompt]
                  ])
                ]),
                vue.createElementVNode("view", { class: "form-actions" }, [
                  vue.createElementVNode("button", {
                    class: "cancel-button",
                    onClick: $setup.closeEditModal
                  }, "取消"),
                  vue.createElementVNode("button", {
                    class: "confirm-button",
                    onClick: $setup.updateRole,
                    disabled: !$setup.isEditFormValid
                  }, "确定", 8, ["disabled"])
                ])
              ])
            ],
            2
            /* CLASS */
          )
        ],
        2
        /* CLASS */
      )) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const PagesAiRoleAiRole = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__scopeId", "data-v-ac864f29"], ["__file", "C:/Users/Administrator/Documents/HBuilderProjects/todoPlus/pages/aiRole/aiRole.vue"]]);
  const _sfc_main$3 = {
    __name: "aiSetting",
    setup(__props, { expose: __expose }) {
      __expose();
      const userStore = useUserStore();
      const temperature = vue.ref(0.7);
      const topP = vue.ref(0.9);
      const maxTokens = vue.ref(2e3);
      const historyLength = vue.ref(10);
      const selectedModel = vue.ref("gpt-3.5-turbo");
      const modelOptions = [
        {
          name: "GPT-3.5-Turbo",
          description: "平衡效率与性能的通用模型",
          value: "gpt-3.5-turbo"
        },
        {
          name: "GPT-4",
          description: "更强大的理解与推理能力，适合复杂任务",
          value: "gpt-4"
        },
        {
          name: "Claude-2",
          description: "更长的上下文记忆，适合长对话",
          value: "claude-2"
        },
        {
          name: "自定义本地模型",
          description: "使用自部署的开源大语言模型",
          value: "local-model"
        }
      ];
      const currentBackgroundImage = vue.computed(() => {
        return userStore.userInfo.backgroudImg || "";
      });
      const handleTemperatureChange = (e) => {
        temperature.value = (e.detail.value / 100).toFixed(2);
      };
      const handleTopPChange = (e) => {
        topP.value = (e.detail.value / 100).toFixed(2);
      };
      const handleMaxTokensChange = (e) => {
        maxTokens.value = e.detail.value;
      };
      const handleHistoryLengthChange = (e) => {
        historyLength.value = e.detail.value;
      };
      const handleModelChange = (e) => {
        selectedModel.value = e.detail.value;
      };
      const handleImageError = () => {
        formatAppLog("log", "at pages/aiSetting/aiSetting.vue:229", "背景图片加载失败");
      };
      const handleImageLoad = () => {
        formatAppLog("log", "at pages/aiSetting/aiSetting.vue:234", "背景图片加载成功");
      };
      const goBack = () => {
        uni.navigateBack();
      };
      const __returned__ = { userStore, temperature, topP, maxTokens, historyLength, selectedModel, modelOptions, currentBackgroundImage, handleTemperatureChange, handleTopPChange, handleMaxTokensChange, handleHistoryLengthChange, handleModelChange, handleImageError, handleImageLoad, goBack, ref: vue.ref, computed: vue.computed, get useUserStore() {
        return useUserStore;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock("view", { class: "setting-container" }, [
      vue.createCommentVNode(" 背景图片 "),
      $setup.currentBackgroundImage ? (vue.openBlock(), vue.createElementBlock("image", {
        key: 0,
        src: $setup.currentBackgroundImage,
        class: "background-image",
        mode: "aspectFill",
        onError: $setup.handleImageError,
        onLoad: $setup.handleImageLoad
      }, null, 40, ["src"])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 顶部导航栏 "),
      vue.createElementVNode("view", { class: "nav-header" }, [
        vue.createElementVNode("view", { class: "nav-left" }, [
          vue.createElementVNode("view", { class: "icon-wrapper" }, [
            vue.createVNode(_component_uni_icons, {
              type: "back",
              size: "24",
              color: "#fff",
              onClick: $setup.goBack
            })
          ])
        ]),
        vue.createElementVNode("view", { class: "nav-center" }, [
          vue.createElementVNode("text", { class: "nav-title" }, "AI设置")
        ]),
        vue.createElementVNode("view", { class: "nav-right" }, [
          vue.createCommentVNode(" 空出位置保持对称 ")
        ])
      ]),
      vue.createCommentVNode(" 设置内容区域 "),
      vue.createElementVNode("scroll-view", {
        class: "settings-content",
        "scroll-y": ""
      }, [
        vue.createCommentVNode(" 开发中提示 "),
        vue.createElementVNode("view", { class: "development-notice" }, [
          vue.createElementVNode("view", { class: "notice-content" }, [
            vue.createVNode(_component_uni_icons, {
              type: "info",
              size: "24",
              color: "#667eea"
            }),
            vue.createElementVNode("text", { class: "notice-text" }, "该功能开发中，暂时只是演示")
          ])
        ]),
        vue.createCommentVNode(" AI 参数设置区域 "),
        vue.createElementVNode("view", { class: "settings-section" }, [
          vue.createElementVNode("view", { class: "section-title" }, "基础设置"),
          vue.createCommentVNode(" 温度设置 "),
          vue.createElementVNode("view", { class: "setting-item" }, [
            vue.createElementVNode("view", { class: "setting-label" }, [
              vue.createElementVNode("text", { class: "label-text" }, "温度"),
              vue.createElementVNode(
                "text",
                { class: "setting-value" },
                vue.toDisplayString($setup.temperature),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "slider-container" }, [
              vue.createElementVNode("slider", {
                value: $setup.temperature * 100,
                min: 0,
                max: 100,
                step: 1,
                onChange: $setup.handleTemperatureChange,
                activeColor: "#667eea",
                backgroundColor: "#e0e0e0",
                "block-color": "#667eea"
              }, null, 40, ["value"])
            ]),
            vue.createElementVNode("view", { class: "setting-description" }, [
              vue.createElementVNode("text", null, "控制输出的随机性，较高的值会使输出更加随机和创造性")
            ])
          ]),
          vue.createCommentVNode(" Top P设置 "),
          vue.createElementVNode("view", { class: "setting-item" }, [
            vue.createElementVNode("view", { class: "setting-label" }, [
              vue.createElementVNode("text", { class: "label-text" }, "Top P"),
              vue.createElementVNode(
                "text",
                { class: "setting-value" },
                vue.toDisplayString($setup.topP),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "slider-container" }, [
              vue.createElementVNode("slider", {
                value: $setup.topP * 100,
                min: 0,
                max: 100,
                step: 1,
                onChange: $setup.handleTopPChange,
                activeColor: "#667eea",
                backgroundColor: "#e0e0e0",
                "block-color": "#667eea"
              }, null, 40, ["value"])
            ]),
            vue.createElementVNode("view", { class: "setting-description" }, [
              vue.createElementVNode("text", null, "控制词汇多样性，较低的值使输出更加聚焦和确定")
            ])
          ]),
          vue.createCommentVNode(" Max Tokens设置 "),
          vue.createElementVNode("view", { class: "setting-item" }, [
            vue.createElementVNode("view", { class: "setting-label" }, [
              vue.createElementVNode("text", { class: "label-text" }, "最大Tokens"),
              vue.createElementVNode(
                "text",
                { class: "setting-value" },
                vue.toDisplayString($setup.maxTokens),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "slider-container" }, [
              vue.createElementVNode("slider", {
                value: $setup.maxTokens,
                min: 100,
                max: 4e3,
                step: 100,
                onChange: $setup.handleMaxTokensChange,
                activeColor: "#667eea",
                backgroundColor: "#e0e0e0",
                "block-color": "#667eea"
              }, null, 40, ["value"])
            ]),
            vue.createElementVNode("view", { class: "setting-description" }, [
              vue.createElementVNode("text", null, "控制单次响应的最大长度")
            ])
          ])
        ]),
        vue.createCommentVNode(" 模型选择区域 "),
        vue.createElementVNode("view", { class: "settings-section" }, [
          vue.createElementVNode("view", { class: "section-title" }, "模型选择"),
          vue.createElementVNode(
            "radio-group",
            { onChange: $setup.handleModelChange },
            [
              (vue.openBlock(), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($setup.modelOptions, (model, index) => {
                  return vue.createElementVNode("view", {
                    class: "model-item",
                    key: index
                  }, [
                    vue.createElementVNode("view", { class: "model-content" }, [
                      vue.createElementVNode("view", { class: "model-info" }, [
                        vue.createElementVNode(
                          "text",
                          { class: "model-name" },
                          vue.toDisplayString(model.name),
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode(
                          "text",
                          { class: "model-description" },
                          vue.toDisplayString(model.description),
                          1
                          /* TEXT */
                        )
                      ]),
                      vue.createElementVNode("radio", {
                        value: model.value,
                        checked: model.value === $setup.selectedModel,
                        color: "#667eea"
                      }, null, 8, ["value", "checked"])
                    ])
                  ]);
                }),
                64
                /* STABLE_FRAGMENT */
              ))
            ],
            32
            /* NEED_HYDRATION */
          )
        ]),
        vue.createCommentVNode(" 记忆设置区域 "),
        vue.createElementVNode("view", { class: "settings-section" }, [
          vue.createElementVNode("view", { class: "section-title" }, "记忆设置"),
          vue.createCommentVNode(" 历史消息数量设置 "),
          vue.createElementVNode("view", { class: "setting-item" }, [
            vue.createElementVNode("view", { class: "setting-label" }, [
              vue.createElementVNode("text", { class: "label-text" }, "记忆消息数"),
              vue.createElementVNode(
                "text",
                { class: "setting-value" },
                vue.toDisplayString($setup.historyLength),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "slider-container" }, [
              vue.createElementVNode("slider", {
                value: $setup.historyLength,
                min: 1,
                max: 20,
                step: 1,
                onChange: $setup.handleHistoryLengthChange,
                activeColor: "#667eea",
                backgroundColor: "#e0e0e0",
                "block-color": "#667eea"
              }, null, 40, ["value"])
            ]),
            vue.createElementVNode("view", { class: "setting-description" }, [
              vue.createElementVNode("text", null, "AI能够记住的最近对话消息数量")
            ])
          ])
        ])
      ])
    ]);
  }
  const PagesAiSettingAiSetting = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__scopeId", "data-v-80397b72"], ["__file", "C:/Users/Administrator/Documents/HBuilderProjects/todoPlus/pages/aiSetting/aiSetting.vue"]]);
  const addGoods = (data) => {
    return request.post("/trade/addGoods", data);
  };
  const queryProfit = (data) => {
    return request.post("/trade/queryProfit", data);
  };
  const updGoods = (data) => {
    return request.post("/trade/updGoods", data);
  };
  const delGoods = (id) => {
    return request.delete(`/trade/delGoods/${id}`);
  };
  const queryGoods = (data) => {
    return request.post("/trade/queryGoods", data);
  };
  const queryLog = (data) => {
    return request.post("/trade/queryLog", data);
  };
  const addLog = async (data) => {
    formatAppLog("log", "at api/tradeApi.js:71", "新建日志API被调用，参数:", data);
    formatAppLog("log", "at api/tradeApi.js:72", "传入的id:", data.id);
    formatAppLog("log", "at api/tradeApi.js:73", "传入的inDesc:", data.inDesc);
    formatAppLog("log", "at api/tradeApi.js:74", "传入的inPrice:", data.inPrice);
    formatAppLog("log", "at api/tradeApi.js:75", "传入的isRise:", data.isRise);
    formatAppLog("log", "at api/tradeApi.js:76", "传入的count:", data.count);
    formatAppLog("log", "at api/tradeApi.js:77", "传入的addInImgs:", data.addInImgs ? "有入场图片文件" : "无入场图片文件");
    let formData;
    let contentType = "application/json";
    try {
      if (typeof FormData !== "undefined") {
        formData = new FormData();
        formData.append("id", data.id);
        formData.append("inDesc", data.inDesc);
        formData.append("inPrice", data.inPrice);
        formData.append("isRise", data.isRise);
        formData.append("count", data.count);
        if (data.addInImgs && data.addInImgs.length > 0) {
          formatAppLog("log", "at api/tradeApi.js:96", "检测到入场图片文件:", data.addInImgs.length, "张");
          for (let i = 0; i < data.addInImgs.length; i++) {
            const img = data.addInImgs[i];
            formatAppLog("log", "at api/tradeApi.js:99", "处理入场图片", i, ":", typeof img, img instanceof File ? "是File对象" : img instanceof Blob ? "是Blob对象" : "其他类型");
            if (img instanceof File || img instanceof Blob) {
              formatAppLog("log", "at api/tradeApi.js:103", "添加入场图片文件到FormData, 文件名:", img.name || "未命名文件", "大小:", img.size, "bytes");
              formData.append("addInImgs", img, img.name || `inImg_${Date.now()}_${i}.jpg`);
            } else {
              formatAppLog("error", "at api/tradeApi.js:106", "入场图片不是文件对象:", typeof img);
            }
          }
        }
        formatAppLog("log", "at api/tradeApi.js:112", "FormData包含的字段:");
        for (let pair of formData.entries()) {
          formatAppLog("log", "at api/tradeApi.js:114", pair[0], pair[1] instanceof File ? "是File对象" : typeof pair[1]);
        }
        contentType = "multipart/form-data";
      } else {
        formatAppLog("warn", "at api/tradeApi.js:120", "FormData不可用，使用JSON格式发送请求");
        formData = JSON.stringify({
          id: data.id,
          inDesc: data.inDesc,
          inPrice: data.inPrice,
          isRise: data.isRise,
          count: data.count
          // 注意：JSON格式无法处理文件上传
        });
      }
    } catch (formDataError) {
      formatAppLog("warn", "at api/tradeApi.js:131", "FormData创建失败，使用JSON格式:", formDataError);
      formData = JSON.stringify({
        id: data.id,
        inDesc: data.inDesc,
        inPrice: data.inPrice,
        isRise: data.isRise,
        count: data.count
      });
    }
    let token = "";
    try {
      const userInfo = uni.getStorageSync("userInfo");
      if (userInfo) {
        const userData = typeof userInfo === "string" ? JSON.parse(userInfo) : userInfo;
        token = userData.authorization || "";
      }
    } catch (error) {
      formatAppLog("error", "at api/tradeApi.js:150", "获取token失败:", error);
      token = "";
    }
    formatAppLog("log", "at api/tradeApi.js:154", "准备发送请求, URL:", "http://192.168.199.113:9999/trade/addLog");
    try {
      formatAppLog("log", "at api/tradeApi.js:196", "小程序/APP环境，使用uni.request");
      const hasFiles = contentType !== "application/json";
      if (hasFiles) {
        formatAppLog("log", "at api/tradeApi.js:202", "有文件，应该使用uploadFile，但当前版本暂不支持");
        throw new Error("当前版本不支持文件上传");
      } else {
        formatAppLog("log", "at api/tradeApi.js:206", "无文件，使用普通请求");
        const requestData = JSON.parse(formData);
        return new Promise((resolve2, reject) => {
          uni.request({
            url: "http://192.168.199.113:9999/trade/addLog",
            method: "POST",
            data: requestData,
            header: {
              // 使用表单格式，完全参考 aiRole.vue 成功模式
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": token ? `Bearer ${token}` : ""
            },
            success: (res2) => {
              var _a2, _b;
              formatAppLog("log", "at api/tradeApi.js:222", "请求结果:", res2);
              if (res2.statusCode === 200 && (res2.data.code === 200 || res2.data.code === "200")) {
                resolve2(res2.data);
              } else {
                formatAppLog("error", "at api/tradeApi.js:227", "请求失败:", res2.data);
                reject(new Error(((_a2 = res2.data) == null ? void 0 : _a2.msg) || ((_b = res2.data) == null ? void 0 : _b.message) || "请求失败"));
              }
            },
            fail: (err) => {
              formatAppLog("error", "at api/tradeApi.js:232", "请求失败:", err);
              reject(err);
            }
          });
        });
      }
    } catch (error) {
      formatAppLog("error", "at api/tradeApi.js:241", "API请求异常:", error);
      throw error;
    }
  };
  const updLog = async (data) => {
    formatAppLog("log", "at api/tradeApi.js:259", "更新日志API被调用，参数:", data);
    formatAppLog("log", "at api/tradeApi.js:260", "传入的id:", data.id);
    formatAppLog("log", "at api/tradeApi.js:261", "传入的inDesc:", data.inDesc);
    formatAppLog("log", "at api/tradeApi.js:262", "传入的inPrice:", data.inPrice);
    formatAppLog("log", "at api/tradeApi.js:263", "传入的isRise:", data.isRise);
    formatAppLog("log", "at api/tradeApi.js:264", "传入的count:", data.count);
    formatAppLog("log", "at api/tradeApi.js:265", "传入的inImgs:", data.inImgs || "无已有图片");
    formatAppLog("log", "at api/tradeApi.js:266", "传入的addInImgs:", data.addInImgs ? "有入场图片文件" : "无入场图片文件");
    let formData;
    let contentType = "application/json";
    try {
      if (typeof FormData !== "undefined") {
        formData = new FormData();
        formData.append("id", data.id);
        formData.append("inDesc", data.inDesc);
        formData.append("inPrice", data.inPrice);
        formData.append("isRise", data.isRise);
        formData.append("count", data.count);
        if (data.inImgs) {
          formData.append("inImgs", data.inImgs);
          formatAppLog("log", "at api/tradeApi.js:286", "添加已有图片JSON字符串到FormData:", data.inImgs);
        }
        if (data.addInImgs && data.addInImgs.length > 0) {
          formatAppLog("log", "at api/tradeApi.js:291", "检测到入场图片文件:", data.addInImgs.length, "张");
          for (let i = 0; i < data.addInImgs.length; i++) {
            const img = data.addInImgs[i];
            formatAppLog("log", "at api/tradeApi.js:294", "处理入场图片", i, ":", typeof img, img instanceof File ? "是File对象" : img instanceof Blob ? "是Blob对象" : "其他类型");
            if (img instanceof File || img instanceof Blob) {
              formatAppLog("log", "at api/tradeApi.js:298", "添加入场图片文件到FormData, 文件名:", img.name || "未命名文件", "大小:", img.size, "bytes");
              formData.append("addInImgs", img, img.name || `inImg_${Date.now()}_${i}.jpg`);
            } else {
              formatAppLog("error", "at api/tradeApi.js:301", "入场图片不是文件对象:", typeof img);
            }
          }
        }
        formatAppLog("log", "at api/tradeApi.js:307", "FormData包含的字段:");
        for (let pair of formData.entries()) {
          formatAppLog("log", "at api/tradeApi.js:309", pair[0], pair[1] instanceof File ? "是File对象" : typeof pair[1]);
        }
        contentType = "multipart/form-data";
      } else {
        formatAppLog("warn", "at api/tradeApi.js:315", "FormData不可用，使用JSON格式发送请求");
        formData = JSON.stringify({
          id: data.id,
          inDesc: data.inDesc,
          inPrice: data.inPrice,
          isRise: data.isRise,
          count: data.count,
          inImgs: data.inImgs || ""
          // 注意：JSON格式无法处理文件上传
        });
      }
    } catch (formDataError) {
      formatAppLog("warn", "at api/tradeApi.js:327", "FormData创建失败，使用JSON格式:", formDataError);
      formData = JSON.stringify({
        id: data.id,
        inDesc: data.inDesc,
        inPrice: data.inPrice,
        isRise: data.isRise,
        count: data.count,
        inImgs: data.inImgs || ""
      });
    }
    let token = "";
    try {
      const userInfo = uni.getStorageSync("userInfo");
      if (userInfo) {
        const userData = typeof userInfo === "string" ? JSON.parse(userInfo) : userInfo;
        token = userData.authorization || "";
      }
    } catch (error) {
      formatAppLog("error", "at api/tradeApi.js:347", "获取token失败:", error);
      token = "";
    }
    formatAppLog("log", "at api/tradeApi.js:351", "准备发送请求, URL:", "http://192.168.199.113:9999/trade/updLog");
    try {
      formatAppLog("log", "at api/tradeApi.js:393", "小程序/APP环境，使用uni.request");
      const hasFiles = contentType !== "application/json";
      if (hasFiles) {
        formatAppLog("log", "at api/tradeApi.js:399", "有文件，应该使用uploadFile，但当前版本暂不支持");
        throw new Error("当前版本不支持文件上传");
      } else {
        formatAppLog("log", "at api/tradeApi.js:403", "无文件，使用普通请求");
        const requestData = JSON.parse(formData);
        return new Promise((resolve2, reject) => {
          uni.request({
            url: "http://192.168.199.113:9999/trade/updLog",
            method: "POST",
            data: requestData,
            header: {
              // 使用表单格式，完全参考 aiRole.vue 成功模式
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": token ? `Bearer ${token}` : ""
            },
            success: (res2) => {
              var _a2, _b;
              formatAppLog("log", "at api/tradeApi.js:419", "请求结果:", res2);
              if (res2.statusCode === 200 && (res2.data.code === 200 || res2.data.code === "200")) {
                resolve2(res2.data);
              } else {
                formatAppLog("error", "at api/tradeApi.js:424", "请求失败:", res2.data);
                reject(new Error(((_a2 = res2.data) == null ? void 0 : _a2.msg) || ((_b = res2.data) == null ? void 0 : _b.message) || "请求失败"));
              }
            },
            fail: (err) => {
              formatAppLog("error", "at api/tradeApi.js:429", "请求失败:", err);
              reject(err);
            }
          });
        });
      }
    } catch (error) {
      formatAppLog("error", "at api/tradeApi.js:438", "API请求异常:", error);
      throw error;
    }
  };
  const delLog = (id) => {
    return request.delete(`/trade/delLog/${id}`);
  };
  const queryOutLog = (id) => {
    return request.get(`/trade/queryOutLog/${id}`);
  };
  const addOutLog = async (data) => {
    formatAppLog("log", "at api/tradeApi.js:473", "新建出场日志API被调用，参数:", data);
    formatAppLog("log", "at api/tradeApi.js:474", "传入的tradeLogId:", data.tradeLogId);
    formatAppLog("log", "at api/tradeApi.js:475", "传入的count:", data.count);
    formatAppLog("log", "at api/tradeApi.js:476", "传入的outDesc:", data.outDesc);
    formatAppLog("log", "at api/tradeApi.js:477", "传入的outPrice:", data.outPrice);
    formatAppLog("log", "at api/tradeApi.js:478", "传入的outImgs:", data.outImgs || "无已有图片");
    formatAppLog("log", "at api/tradeApi.js:479", "传入的addOutImgs:", data.addOutImgs ? "有出场图片文件" : "无出场图片文件");
    let formData;
    let contentType = "application/json";
    try {
      if (typeof FormData !== "undefined") {
        formData = new FormData();
        formData.append("tradeLogId", data.tradeLogId);
        formData.append("count", data.count);
        formData.append("outDesc", data.outDesc || "");
        formData.append("outPrice", data.outPrice);
        if (data.outImgs) {
          formData.append("outImgs", data.outImgs);
          formatAppLog("log", "at api/tradeApi.js:498", "添加已有出场图片JSON字符串到FormData:", data.outImgs);
        }
        if (data.addOutImgs && data.addOutImgs.length > 0) {
          formatAppLog("log", "at api/tradeApi.js:503", "检测到出场图片文件:", data.addOutImgs.length, "张");
          for (let i = 0; i < data.addOutImgs.length; i++) {
            const img = data.addOutImgs[i];
            formatAppLog("log", "at api/tradeApi.js:506", "处理出场图片", i, ":", typeof img, img instanceof File ? "是File对象" : img instanceof Blob ? "是Blob对象" : "其他类型");
            if (img instanceof File || img instanceof Blob) {
              formatAppLog("log", "at api/tradeApi.js:510", "添加出场图片文件到FormData, 文件名:", img.name || "未命名文件", "大小:", img.size, "bytes");
              formData.append("addOutImgs", img, img.name || `outImg_${Date.now()}_${i}.jpg`);
            } else {
              formatAppLog("error", "at api/tradeApi.js:513", "出场图片不是文件对象:", typeof img);
            }
          }
        }
        formatAppLog("log", "at api/tradeApi.js:519", "FormData包含的字段:");
        for (let pair of formData.entries()) {
          formatAppLog("log", "at api/tradeApi.js:521", pair[0], pair[1] instanceof File ? "是File对象" : typeof pair[1]);
        }
        contentType = "multipart/form-data";
      } else {
        formatAppLog("warn", "at api/tradeApi.js:527", "FormData不可用，使用JSON格式发送请求");
        formData = JSON.stringify({
          tradeLogId: data.tradeLogId,
          count: data.count,
          outDesc: data.outDesc || "",
          outPrice: data.outPrice,
          outImgs: data.outImgs || ""
          // 注意：JSON格式无法处理文件上传
        });
      }
    } catch (formDataError) {
      formatAppLog("warn", "at api/tradeApi.js:538", "FormData创建失败，使用JSON格式:", formDataError);
      formData = JSON.stringify({
        tradeLogId: data.tradeLogId,
        count: data.count,
        outDesc: data.outDesc || "",
        outPrice: data.outPrice,
        outImgs: data.outImgs || ""
      });
    }
    let token = "";
    try {
      const userInfo = uni.getStorageSync("userInfo");
      if (userInfo) {
        const userData = typeof userInfo === "string" ? JSON.parse(userInfo) : userInfo;
        token = userData.authorization || "";
      }
    } catch (error) {
      formatAppLog("error", "at api/tradeApi.js:557", "获取token失败:", error);
      token = "";
    }
    formatAppLog("log", "at api/tradeApi.js:561", "准备发送请求, URL:", "http://192.168.199.113:9999/trade/addOutLog");
    try {
      formatAppLog("log", "at api/tradeApi.js:603", "小程序/APP环境，使用uni.request");
      const hasFiles = contentType !== "application/json";
      if (hasFiles) {
        formatAppLog("log", "at api/tradeApi.js:609", "有文件，应该使用uploadFile，但当前版本暂不支持");
        throw new Error("当前版本不支持文件上传");
      } else {
        formatAppLog("log", "at api/tradeApi.js:613", "无文件，使用普通请求");
        const requestData = JSON.parse(formData);
        return new Promise((resolve2, reject) => {
          uni.request({
            url: "http://192.168.199.113:9999/trade/addOutLog",
            method: "POST",
            data: requestData,
            header: {
              // 使用表单格式，完全参考 aiRole.vue 成功模式
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": token ? `Bearer ${token}` : ""
            },
            success: (res2) => {
              var _a2, _b;
              formatAppLog("log", "at api/tradeApi.js:629", "请求结果:", res2);
              if (res2.statusCode === 200 && (res2.data.code === 200 || res2.data.code === "200")) {
                resolve2(res2.data);
              } else {
                formatAppLog("error", "at api/tradeApi.js:634", "请求失败:", res2.data);
                reject(new Error(((_a2 = res2.data) == null ? void 0 : _a2.msg) || ((_b = res2.data) == null ? void 0 : _b.message) || "请求失败"));
              }
            },
            fail: (err) => {
              formatAppLog("error", "at api/tradeApi.js:639", "请求失败:", err);
              reject(err);
            }
          });
        });
      }
    } catch (error) {
      formatAppLog("error", "at api/tradeApi.js:648", "API请求异常:", error);
      throw error;
    }
  };
  const updOutLog = async (data) => {
    formatAppLog("log", "at api/tradeApi.js:665", "更新出场日志API被调用，参数:", data);
    let formData;
    let contentType = "application/json";
    try {
      if (typeof FormData !== "undefined" && data.addOutImgs && data.addOutImgs.length > 0) {
        formatAppLog("log", "at api/tradeApi.js:674", "检测到文件，使用FormData格式");
        formData = new FormData();
        formData.append("tradeLogOutId", data.tradeLogOutId);
        formData.append("count", data.count);
        formData.append("outDesc", data.outDesc || "");
        formData.append("outPrice", data.outPrice);
        if (data.outImgs) {
          formData.append("outImgs", data.outImgs);
        }
        for (let i = 0; i < data.addOutImgs.length; i++) {
          const img = data.addOutImgs[i];
          if (img instanceof File || img instanceof Blob) {
            formData.append("addOutImgs", img);
            formatAppLog("log", "at api/tradeApi.js:693", "添加出场图片到FormData:", img.name || `blob_${i}`);
          }
        }
        contentType = "multipart/form-data";
      } else {
        formatAppLog("warn", "at api/tradeApi.js:700", "FormData不可用或无文件，使用JSON格式发送请求");
        formData = JSON.stringify({
          tradeLogOutId: data.tradeLogOutId,
          count: data.count,
          outDesc: data.outDesc || "",
          outPrice: data.outPrice,
          outImgs: data.outImgs || ""
        });
        contentType = "application/json";
      }
    } catch (formDataError) {
      formatAppLog("warn", "at api/tradeApi.js:711", "FormData创建失败，使用JSON格式:", formDataError);
      formData = JSON.stringify({
        tradeLogOutId: data.tradeLogOutId,
        count: data.count,
        outDesc: data.outDesc || "",
        outPrice: data.outPrice,
        outImgs: data.outImgs || ""
      });
      contentType = "application/json";
    }
    let token = "";
    try {
      const userInfo = uni.getStorageSync("userInfo");
      if (userInfo) {
        const userData = typeof userInfo === "string" ? JSON.parse(userInfo) : userInfo;
        token = userData.authorization || "";
      }
    } catch (error) {
      formatAppLog("error", "at api/tradeApi.js:731", "获取token失败:", error);
      token = "";
    }
    formatAppLog("log", "at api/tradeApi.js:735", "准备发送请求, URL:", "http://192.168.199.113:9999/trade/updOutLog");
    try {
      formatAppLog("log", "at api/tradeApi.js:777", "小程序/APP环境，使用uni.request");
      const hasFiles = contentType !== "application/json";
      if (hasFiles) {
        formatAppLog("log", "at api/tradeApi.js:783", "有文件，应该使用uploadFile，但当前版本暂不支持");
        throw new Error("当前版本不支持文件上传");
      } else {
        formatAppLog("log", "at api/tradeApi.js:787", "无文件，使用普通请求");
        const requestData = JSON.parse(formData);
        return new Promise((resolve2, reject) => {
          uni.request({
            url: "http://192.168.199.113:9999/trade/updOutLog",
            method: "POST",
            data: requestData,
            header: {
              // 使用表单格式，完全参考 aiRole.vue 成功模式
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": token ? `Bearer ${token}` : ""
            },
            success: (res2) => {
              var _a2, _b;
              formatAppLog("log", "at api/tradeApi.js:803", "请求结果:", res2);
              if (res2.statusCode === 200 && (res2.data.code === 200 || res2.data.code === "200")) {
                resolve2(res2.data);
              } else {
                formatAppLog("error", "at api/tradeApi.js:808", "请求失败:", res2.data);
                reject(new Error(((_a2 = res2.data) == null ? void 0 : _a2.msg) || ((_b = res2.data) == null ? void 0 : _b.message) || "请求失败"));
              }
            },
            fail: (err) => {
              formatAppLog("error", "at api/tradeApi.js:813", "请求失败:", err);
              reject(err);
            }
          });
        });
      }
    } catch (error) {
      formatAppLog("error", "at api/tradeApi.js:822", "API请求异常:", error);
      throw error;
    }
  };
  const delOutLog = (id) => {
    return request.delete(`/trade/delOutLog/${id}`);
  };
  const tradeApi = {
    addGoods,
    updGoods,
    delGoods,
    queryGoods,
    queryLog,
    queryProfit,
    addLog,
    updLog,
    delLog,
    queryOutLog,
    addOutLog,
    updOutLog,
    delOutLog
  };
  const useConstantsStore = defineStore("constants", () => {
    const needRefreshGoods = vue.ref(0.1);
    return {
      needRefreshGoods
    };
  });
  const _sfc_main$2 = {
    __name: "trade",
    setup(__props, { expose: __expose }) {
      __expose();
      const userStore = useUserStore();
      const constantsStore = useConstantsStore();
      const imageLoadError = vue.ref(false);
      const refresherTriggered = vue.ref(false);
      const goodsList = vue.ref([]);
      const totalProfit = vue.ref(0);
      const swipeStates = vue.ref({});
      const touchStartX = vue.ref(0);
      const touchStartY = vue.ref(0);
      const currentSwipeGoodsId = vue.ref(null);
      const searchParams = vue.reactive({
        name: "",
        code: ""
      });
      const showModal = vue.ref(false);
      const modalClosing = vue.ref(false);
      const isEdit = vue.ref(false);
      const goodsForm = vue.ref({
        id: null,
        name: "",
        code: "",
        singleProfit: ""
        // 新增单手单点利润
      });
      const showDetailModal = vue.ref(false);
      const detailModalClosing = vue.ref(false);
      const currentGoods = vue.ref({});
      const showSortMenu = vue.ref(false);
      const currentSortType = vue.ref("default");
      const sortOptions = [
        { value: "default", label: "默认" },
        { value: "profit", label: "盈亏" },
        { value: "winRate", label: "胜率" },
        { value: "profitRatio", label: "盈亏比" }
      ];
      const originalGoodsList = vue.ref([]);
      const currentBackgroundImage = vue.computed(() => {
        return userStore.userInfo.backgroudImg || "";
      });
      const formattedProfit = vue.computed(() => {
        if (totalProfit.value > 0) {
          return "+" + totalProfit.value.toFixed(2);
        } else {
          return totalProfit.value.toFixed(2);
        }
      });
      const currentSortText = vue.computed(() => {
        const option = sortOptions.find((opt) => opt.value === currentSortType.value);
        return option ? option.label.replace("（从高到低）", "") : "盈亏";
      });
      const goBack = () => {
        uni.navigateBack();
      };
      const handleSearch = () => {
        var _a2, _b;
        formatAppLog("log", "at pages/trade/trade.vue:337", "开始搜索, 搜索参数:", searchParams);
        if (((_a2 = searchParams.name) == null ? void 0 : _a2.trim()) || ((_b = searchParams.code) == null ? void 0 : _b.trim())) {
          uni.showToast({
            title: "搜索中...",
            icon: "loading",
            duration: 1e3
          });
        } else {
          uni.showToast({
            title: "加载全部数据...",
            icon: "loading",
            duration: 1e3
          });
        }
        fetchGoodsList();
      };
      const onSearchInput = () => {
        var _a2, _b;
        if (!((_a2 = searchParams.name) == null ? void 0 : _a2.trim()) && !((_b = searchParams.code) == null ? void 0 : _b.trim())) {
          formatAppLog("log", "at pages/trade/trade.vue:361", "搜索框为空，显示所有数据");
          fetchGoodsList();
        }
      };
      const handleTouchStart = (e, goodsId) => {
        touchStartX.value = e.touches[0].clientX;
        touchStartY.value = e.touches[0].clientY;
        currentSwipeGoodsId.value = goodsId;
      };
      const handleTouchMove = (e, goodsId) => {
        if (currentSwipeGoodsId.value !== goodsId)
          return;
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;
        const deltaX = touchX - touchStartX.value;
        const deltaY = touchY - touchStartY.value;
        if (Math.abs(deltaY) > Math.abs(deltaX))
          return;
        if (deltaX < 0) {
          const translateX = Math.max(deltaX * 0.5, -120);
          if (!swipeStates.value[goodsId]) {
            swipeStates.value[goodsId] = {};
          }
          swipeStates.value[goodsId].translateX = translateX;
          swipeStates.value[goodsId].showDelete = translateX < -30;
        }
      };
      const handleTouchEnd = (e, goodsId) => {
        if (currentSwipeGoodsId.value !== goodsId)
          return;
        const state = swipeStates.value[goodsId];
        if (!state)
          return;
        if (state.translateX < -60) {
          state.translateX = -120;
          state.showDelete = true;
        } else if (state.translateX < -30) {
          state.translateX = -120;
          state.showDelete = true;
        } else {
          resetSwipeState(goodsId);
        }
        currentSwipeGoodsId.value = null;
      };
      const resetSwipeState = (goodsId) => {
        if (swipeStates.value[goodsId]) {
          swipeStates.value[goodsId].translateX = 0;
          swipeStates.value[goodsId].showDelete = false;
        }
      };
      const resetAllSwipeStates = () => {
        Object.keys(swipeStates.value).forEach((goodsId) => {
          resetSwipeState(goodsId);
        });
      };
      const getBalance = (goods) => {
        const winMoney = Number(goods.winMoney || 0);
        const lostMoney = Number(goods.lostMoney || 0);
        const balance = winMoney - lostMoney;
        return balance >= 0 ? "+" + balance.toFixed(2) : balance.toFixed(2);
      };
      const getBalanceClass = (goods) => {
        const winMoney = Number(goods.winMoney || 0);
        const lostMoney = Number(goods.lostMoney || 0);
        const balance = winMoney - lostMoney;
        return balance > 0 ? "positive" : balance < 0 ? "negative" : "";
      };
      const getWinRate = (goods) => {
        const winCount = Number(goods.winCount || 0);
        const lostCount = Number(goods.lostCount || 0);
        const totalCount = winCount + lostCount;
        if (totalCount === 0)
          return "0.00%";
        const winRate = winCount / totalCount * 100;
        return winRate.toFixed(2) + "%";
      };
      const getProfitRatio = (goods) => {
        const winMoney = Math.abs(Number(goods.winMoney || 0));
        const lostMoney = Math.abs(Number(goods.lostMoney || 0));
        if (lostMoney === 0) {
          if (winMoney === 0)
            return "0";
          return "∞";
        }
        const ratio = winMoney / lostMoney;
        return ratio.toFixed(2);
      };
      const formatSingleProfit = (value) => {
        if (isNaN(value) || value === "")
          return "0.0";
        return value.toFixed(1);
      };
      const showGoodsDetail = (goods) => {
        resetAllSwipeStates();
        uni.navigateTo({
          url: `/pages/logDetail/logDetail?goodsId=${goods.id}&goodsName=${encodeURIComponent(goods.name || "未命名")}&goodsCode=${encodeURIComponent(goods.code || "")}`
        });
      };
      const closeDetailModal = () => {
        detailModalClosing.value = true;
        setTimeout(() => {
          showDetailModal.value = false;
          detailModalClosing.value = false;
          currentGoods.value = {};
        }, 300);
      };
      const toggleSortMenu = () => {
        showSortMenu.value = !showSortMenu.value;
      };
      const selectSortType = (option) => {
        currentSortType.value = option.value;
        applySorting();
        showSortMenu.value = false;
      };
      const applySorting = () => {
        if (!goodsList.value || goodsList.value.length === 0)
          return;
        if (currentSortType.value === "default") {
          if (originalGoodsList.value.length > 0) {
            goodsList.value = [...originalGoodsList.value];
            formatAppLog("log", "at pages/trade/trade.vue:527", "恢复默认排序（后端返回顺序）");
          }
          return;
        }
        const sorted = [...goodsList.value].sort((a, b) => {
          switch (currentSortType.value) {
            case "profit":
              const profitA = Number(a.winMoney || 0) - Number(a.lostMoney || 0);
              const profitB = Number(b.winMoney || 0) - Number(b.lostMoney || 0);
              return profitB - profitA;
            case "winRate":
              const winRateA = getWinRateNumber(a);
              const winRateB = getWinRateNumber(b);
              return winRateB - winRateA;
            case "profitRatio":
              const ratioA = getProfitRatioNumber(a);
              const ratioB = getProfitRatioNumber(b);
              return ratioB - ratioA;
            default:
              return 0;
          }
        });
        goodsList.value = sorted;
        formatAppLog("log", "at pages/trade/trade.vue:558", `按${currentSortText.value}排序完成`);
      };
      const getWinRateNumber = (goods) => {
        const winCount = Number(goods.winCount || 0);
        const lostCount = Number(goods.lostCount || 0);
        const totalCount = winCount + lostCount;
        if (totalCount === 0)
          return 0;
        return winCount / totalCount * 100;
      };
      const getProfitRatioNumber = (goods) => {
        const winMoney = Math.abs(Number(goods.winMoney || 0));
        const lostMoney = Math.abs(Number(goods.lostMoney || 0));
        if (lostMoney === 0) {
          return winMoney === 0 ? 0 : 999999;
        }
        return winMoney / lostMoney;
      };
      const refreshData = async () => {
        try {
          await Promise.all([fetchProfitData(), fetchGoodsList()]);
          uni.showToast({
            title: "刷新成功",
            icon: "success",
            duration: 1500
          });
        } catch (error) {
          formatAppLog("error", "at pages/trade/trade.vue:593", "刷新数据失败:", error);
          uni.showToast({
            title: "刷新失败",
            icon: "none",
            duration: 2e3
          });
        }
      };
      async function fetchProfitData() {
        try {
          const res2 = await tradeApi.queryProfit({});
          if (res2.code === 200 || res2.code === "200") {
            totalProfit.value = Number(res2.data || 0);
          } else {
            formatAppLog("error", "at pages/trade/trade.vue:609", "获取总盈亏数据失败:", res2.message);
          }
        } catch (error) {
          formatAppLog("error", "at pages/trade/trade.vue:612", "获取总盈亏数据异常:", error);
          totalProfit.value = 0;
        }
      }
      const allGoodsList = vue.ref([]);
      async function fetchGoodsList() {
        var _a2, _b;
        try {
          const queryParams = {
            name: ((_a2 = searchParams.name) == null ? void 0 : _a2.trim()) || "",
            code: ((_b = searchParams.code) == null ? void 0 : _b.trim()) || ""
          };
          formatAppLog("log", "at pages/trade/trade.vue:628", "搜索参数:", queryParams);
          const isEmptySearch = !queryParams.name && !queryParams.code;
          const res2 = await tradeApi.queryGoods(isEmptySearch ? {} : queryParams);
          formatAppLog("log", "at pages/trade/trade.vue:634", "API返回结果:", res2);
          if (res2.code === 200 || res2.code === "200") {
            const data = res2.data || [];
            if (isEmptySearch) {
              allGoodsList.value = data;
              goodsList.value = data;
              originalGoodsList.value = [...data];
              formatAppLog("log", "at pages/trade/trade.vue:644", "加载全部商品列表:", data.length, "条记录");
            } else {
              if (data.length === 0 && allGoodsList.value.length > 0) {
                formatAppLog("log", "at pages/trade/trade.vue:648", "后端搜索无结果，尝试前端过滤");
                const filtered = allGoodsList.value.filter((item) => {
                  const nameMatch = !queryParams.name || item.name && item.name.toLowerCase().includes(queryParams.name.toLowerCase());
                  const codeMatch = !queryParams.code || item.code && item.code.toLowerCase().includes(queryParams.code.toLowerCase());
                  return nameMatch && codeMatch;
                });
                goodsList.value = filtered;
                originalGoodsList.value = [...filtered];
                formatAppLog("log", "at pages/trade/trade.vue:658", "前端过滤结果:", filtered.length, "条记录");
              } else {
                goodsList.value = data;
                originalGoodsList.value = [...data];
                formatAppLog("log", "at pages/trade/trade.vue:662", "后端搜索结果:", data.length, "条记录");
              }
            }
            if (goodsList.value.length > 0 && currentSortType.value !== "default") {
              applySorting();
            }
          } else {
            formatAppLog("error", "at pages/trade/trade.vue:671", "获取商品列表失败:", res2.message);
          }
        } catch (error) {
          formatAppLog("error", "at pages/trade/trade.vue:674", "获取商品列表异常:", error);
        }
      }
      const showAddModal = () => {
        isEdit.value = false;
        goodsForm.value = {
          id: null,
          name: "",
          code: "",
          singleProfit: ""
        };
        showModal.value = true;
      };
      const editGoods = (goods) => {
        isEdit.value = true;
        goodsForm.value = {
          id: goods.id,
          name: goods.name || "",
          code: goods.code || "",
          singleProfit: goods.singleProfit || ""
          // 编辑时也包含单手单点利润
        };
        showModal.value = true;
        if (showDetailModal.value) {
          closeDetailModal();
        }
      };
      const closeModal = () => {
        modalClosing.value = true;
        setTimeout(() => {
          showModal.value = false;
          modalClosing.value = false;
        }, 300);
      };
      const saveGoods = async () => {
        if (!goodsForm.value.name.trim()) {
          uni.showToast({
            title: "品种名称必填",
            icon: "none"
          });
          return;
        }
        if (!goodsForm.value.code.trim()) {
          uni.showToast({
            title: "品种代码必填",
            icon: "none"
          });
          return;
        }
        if (!goodsForm.value.singleProfit.trim()) {
          uni.showToast({
            title: "1手1点利润必填",
            icon: "none"
          });
          return;
        }
        const singleProfitValue = parseFloat(goodsForm.value.singleProfit);
        if (isNaN(singleProfitValue) || singleProfitValue <= 0) {
          uni.showToast({
            title: "请输入有效的1手1点利润",
            icon: "none"
          });
          return;
        }
        uni.showLoading({
          title: isEdit.value ? "保存中..." : "添加中..."
        });
        try {
          const data = {
            ...goodsForm.value,
            singleProfit: singleProfitValue
            // 转换为数字类型
          };
          const res2 = isEdit.value ? await tradeApi.updGoods(data) : await tradeApi.addGoods(data);
          uni.hideLoading();
          if (res2.code === 200 || res2.code === "200") {
            uni.showToast({
              title: isEdit.value ? "保存成功" : "添加成功",
              icon: "success"
            });
            closeModal();
            fetchGoodsList();
          } else {
            uni.showToast({
              title: res2.message || "操作失败",
              icon: "none"
            });
          }
        } catch (error) {
          uni.hideLoading();
          uni.showToast({
            title: "操作失败",
            icon: "none"
          });
          formatAppLog("error", "at pages/trade/trade.vue:791", "保存商品失败:", error);
        }
      };
      const confirmDeleteGoods = (goods) => {
        resetAllSwipeStates();
        uni.showModal({
          title: "删除确认",
          content: `确定要删除"${goods.name || "未命名品种"}"吗？`,
          confirmColor: "#f56c6c",
          success: async (res2) => {
            if (res2.confirm) {
              await deleteGoods(goods.id);
              if (showDetailModal.value) {
                closeDetailModal();
              }
            }
          }
        });
      };
      const deleteGoods = async (id) => {
        if (!id)
          return;
        uni.showLoading({
          title: "删除中..."
        });
        try {
          const res2 = await tradeApi.delGoods(id);
          uni.hideLoading();
          if (res2.code === 200 || res2.code === "200") {
            uni.showToast({
              title: "删除成功",
              icon: "success"
            });
            fetchGoodsList();
          } else {
            uni.showToast({
              title: res2.message || "删除失败",
              icon: "none"
            });
          }
        } catch (error) {
          uni.hideLoading();
          uni.showToast({
            title: "删除失败",
            icon: "none"
          });
          formatAppLog("error", "at pages/trade/trade.vue:847", "删除商品失败:", error);
        }
      };
      const handleRefresherRefresh = async () => {
        refresherTriggered.value = true;
        resetAllSwipeStates();
        try {
          await refreshData();
        } catch (error) {
          formatAppLog("error", "at pages/trade/trade.vue:860", "下拉刷新失败:", error);
        } finally {
          setTimeout(() => {
            refresherTriggered.value = false;
          }, 1e3);
        }
      };
      const formatTime = (timestamp) => {
        if (!timestamp)
          return "";
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hour = String(date.getHours()).padStart(2, "0");
        const minute = String(date.getMinutes()).padStart(2, "0");
        return `${year}-${month}-${day} ${hour}:${minute}`;
      };
      const handleImageError = () => {
        imageLoadError.value = true;
        uni.showToast({
          title: "背景图片加载失败",
          icon: "none"
        });
      };
      const handleImageLoad = () => {
        imageLoadError.value = false;
      };
      vue.watch(() => constantsStore.needRefreshGoods, async (newValue) => {
        if (newValue) {
          formatAppLog("log", "at pages/trade/trade.vue:899", "检测到需要刷新商品数据，开始刷新...", newValue);
          try {
            await Promise.all([
              fetchProfitData(),
              fetchGoodsList()
            ]);
            formatAppLog("log", "at pages/trade/trade.vue:906", "商品数据刷新完成");
          } catch (error) {
            formatAppLog("error", "at pages/trade/trade.vue:908", "刷新商品数据失败:", error);
          }
        }
      });
      const handleListClick = () => {
        if (showSortMenu.value) {
          showSortMenu.value = false;
        }
      };
      vue.onMounted(async () => {
        userStore.initUserInfo();
        try {
          await Promise.all([
            fetchProfitData(),
            fetchGoodsList()
          ]);
        } catch (error) {
          formatAppLog("error", "at pages/trade/trade.vue:930", "加载数据失败:", error);
        }
      });
      const __returned__ = { userStore, constantsStore, imageLoadError, refresherTriggered, goodsList, totalProfit, swipeStates, touchStartX, touchStartY, currentSwipeGoodsId, searchParams, showModal, modalClosing, isEdit, goodsForm, showDetailModal, detailModalClosing, currentGoods, showSortMenu, currentSortType, sortOptions, originalGoodsList, currentBackgroundImage, formattedProfit, currentSortText, goBack, handleSearch, onSearchInput, handleTouchStart, handleTouchMove, handleTouchEnd, resetSwipeState, resetAllSwipeStates, getBalance, getBalanceClass, getWinRate, getProfitRatio, formatSingleProfit, showGoodsDetail, closeDetailModal, toggleSortMenu, selectSortType, applySorting, getWinRateNumber, getProfitRatioNumber, refreshData, fetchProfitData, allGoodsList, fetchGoodsList, showAddModal, editGoods, closeModal, saveGoods, confirmDeleteGoods, deleteGoods, handleRefresherRefresh, formatTime, handleImageError, handleImageLoad, handleListClick, ref: vue.ref, computed: vue.computed, onMounted: vue.onMounted, reactive: vue.reactive, watch: vue.watch, get userApi() {
        return userApi;
      }, get tradeApi() {
        return tradeApi;
      }, get useUserStore() {
        return useUserStore;
      }, get useConstantsStore() {
        return useConstantsStore;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock("view", { class: "trade-container" }, [
      vue.createCommentVNode(" 背景图片 "),
      $setup.currentBackgroundImage ? (vue.openBlock(), vue.createElementBlock("image", {
        key: 0,
        src: $setup.currentBackgroundImage,
        class: "background-image",
        mode: "aspectFill",
        onError: $setup.handleImageError,
        onLoad: $setup.handleImageLoad
      }, null, 40, ["src"])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 顶部导航 "),
      vue.createElementVNode("view", { class: "nav-header" }, [
        vue.createElementVNode("view", { class: "nav-left" }, [
          vue.createElementVNode("view", {
            class: "icon-wrapper",
            onClick: $setup.goBack
          }, [
            vue.createVNode(_component_uni_icons, {
              type: "back",
              size: "24",
              color: "#fff"
            })
          ])
        ]),
        vue.createElementVNode("view", { class: "nav-center" }, [
          vue.createElementVNode("text", { class: "profit-text" }, [
            vue.createTextVNode(" 总盈亏: "),
            vue.createElementVNode(
              "text",
              {
                class: vue.normalizeClass(["profit-number", { "profit-positive": $setup.totalProfit > 0, "profit-negative": $setup.totalProfit < 0 }])
              },
              vue.toDisplayString($setup.formattedProfit),
              3
              /* TEXT, CLASS */
            )
          ])
        ]),
        vue.createElementVNode("view", { class: "nav-right" }, [
          vue.createCommentVNode(" 去掉刷新图标 ")
        ])
      ]),
      vue.createCommentVNode(" 搜索区域 "),
      vue.createElementVNode("view", { class: "search-area" }, [
        vue.createElementVNode("view", { class: "search-box" }, [
          vue.createCommentVNode(" 排序按钮 "),
          vue.createElementVNode("view", { class: "sort-btn-container" }, [
            vue.createElementVNode("view", {
              class: "sort-btn",
              onClick: $setup.toggleSortMenu
            }, [
              vue.createVNode(_component_uni_icons, {
                type: "list",
                size: "18",
                color: "#667eea"
              }),
              vue.createElementVNode(
                "text",
                { class: "sort-text" },
                vue.toDisplayString($setup.currentSortText),
                1
                /* TEXT */
              ),
              vue.createVNode(_component_uni_icons, {
                type: $setup.showSortMenu ? "up" : "down",
                size: "14",
                color: "#667eea"
              }, null, 8, ["type"])
            ]),
            vue.createCommentVNode(" 下拉菜单 "),
            $setup.showSortMenu ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "sort-dropdown"
            }, [
              (vue.openBlock(), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($setup.sortOptions, (option, index) => {
                  return vue.createElementVNode("view", {
                    class: vue.normalizeClass(["sort-option", { "active": $setup.currentSortType === option.value }]),
                    key: index,
                    onClick: ($event) => $setup.selectSortType(option)
                  }, [
                    vue.createElementVNode(
                      "text",
                      { class: "option-text" },
                      vue.toDisplayString(option.label),
                      1
                      /* TEXT */
                    ),
                    $setup.currentSortType === option.value ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 0,
                      class: "option-check"
                    }, [
                      vue.createVNode(_component_uni_icons, {
                        type: "checkmarkempty",
                        size: "16",
                        color: "#667eea"
                      })
                    ])) : vue.createCommentVNode("v-if", true)
                  ], 10, ["onClick"]);
                }),
                64
                /* STABLE_FRAGMENT */
              ))
            ])) : vue.createCommentVNode("v-if", true)
          ]),
          vue.createElementVNode("view", { class: "search-input-wrapper" }, [
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                class: "search-input",
                type: "text",
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.searchParams.name = $event),
                placeholder: "品种名称",
                "confirm-type": "search",
                onConfirm: $setup.handleSearch,
                onInput: $setup.onSearchInput
              },
              null,
              544
              /* NEED_HYDRATION, NEED_PATCH */
            ), [
              [vue.vModelText, $setup.searchParams.name]
            ])
          ]),
          vue.createElementVNode("view", { class: "search-input-wrapper" }, [
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                class: "search-input",
                type: "text",
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.searchParams.code = $event),
                placeholder: "品种代码",
                "confirm-type": "search",
                onConfirm: $setup.handleSearch,
                onInput: $setup.onSearchInput
              },
              null,
              544
              /* NEED_HYDRATION, NEED_PATCH */
            ), [
              [vue.vModelText, $setup.searchParams.code]
            ])
          ]),
          vue.createElementVNode("view", {
            class: "search-btn",
            onClick: $setup.handleSearch
          }, [
            vue.createVNode(_component_uni_icons, {
              type: "search",
              size: "18",
              color: "#667eea"
            })
          ])
        ])
      ]),
      vue.createCommentVNode(" 主要内容 "),
      vue.createElementVNode("view", {
        class: "trade-content",
        onClick: $setup.handleListClick
      }, [
        vue.createCommentVNode(" 商品列表 "),
        vue.createElementVNode("scroll-view", {
          class: "market-list",
          "scroll-y": "true",
          "refresher-enabled": "true",
          "refresher-background": "transparent",
          "refresher-triggered": $setup.refresherTriggered,
          onRefresherrefresh: $setup.handleRefresherRefresh
        }, [
          $setup.goodsList.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "goods-list"
          }, [
            vue.createCommentVNode(" 商品项 "),
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.goodsList, (goods, index) => {
                var _a2, _b;
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: "goods-swipe-container",
                  key: goods.id
                }, [
                  vue.createElementVNode("view", { class: "goods-swipe-wrapper" }, [
                    vue.createElementVNode("view", {
                      class: "goods-item",
                      style: vue.normalizeStyle({ transform: `translateX(${((_a2 = $setup.swipeStates[goods.id]) == null ? void 0 : _a2.translateX) || 0}rpx)` }),
                      onTouchstart: ($event) => $setup.handleTouchStart($event, goods.id),
                      onTouchmove: ($event) => $setup.handleTouchMove($event, goods.id),
                      onTouchend: ($event) => $setup.handleTouchEnd($event, goods.id),
                      onClick: ($event) => $setup.showGoodsDetail(goods)
                    }, [
                      vue.createElementVNode("view", { class: "goods-row" }, [
                        vue.createElementVNode("view", { class: "goods-name-col" }, [
                          vue.createElementVNode(
                            "text",
                            { class: "goods-name" },
                            vue.toDisplayString(goods.name || "未命名"),
                            1
                            /* TEXT */
                          ),
                          vue.createElementVNode(
                            "text",
                            { class: "goods-code" },
                            vue.toDisplayString(goods.code || "-"),
                            1
                            /* TEXT */
                          )
                        ]),
                        vue.createElementVNode("view", { class: "goods-stats-col1" }, [
                          vue.createElementVNode("view", { class: "stats-item" }, [
                            vue.createElementVNode("text", { class: "stats-label" }, "盈亏:"),
                            vue.createElementVNode(
                              "text",
                              {
                                class: vue.normalizeClass(["stats-value", $setup.getBalanceClass(goods)])
                              },
                              vue.toDisplayString($setup.getBalance(goods)),
                              3
                              /* TEXT, CLASS */
                            )
                          ]),
                          vue.createElementVNode("view", { class: "stats-item" }, [
                            vue.createElementVNode("text", { class: "stats-label" }, "胜率:"),
                            vue.createElementVNode(
                              "text",
                              { class: "stats-value" },
                              vue.toDisplayString($setup.getWinRate(goods)),
                              1
                              /* TEXT */
                            )
                          ])
                        ]),
                        vue.createElementVNode("view", { class: "goods-stats-col2" }, [
                          vue.createElementVNode("view", { class: "stats-item" }, [
                            vue.createElementVNode("text", { class: "stats-label" }, "盈亏比:"),
                            vue.createElementVNode(
                              "text",
                              { class: "stats-value" },
                              vue.toDisplayString($setup.getProfitRatio(goods)),
                              1
                              /* TEXT */
                            )
                          ]),
                          vue.createElementVNode("view", { class: "stats-item" }, [
                            vue.createElementVNode("text", { class: "stats-label" }, "利润:"),
                            vue.createElementVNode(
                              "text",
                              { class: "stats-value" },
                              vue.toDisplayString($setup.formatSingleProfit(goods.singleProfit)) + "/点/手",
                              1
                              /* TEXT */
                            )
                          ])
                        ]),
                        vue.createElementVNode("view", {
                          class: "edit-icon",
                          onClick: vue.withModifiers(($event) => $setup.editGoods(goods), ["stop"])
                        }, [
                          vue.createVNode(_component_uni_icons, {
                            type: "compose",
                            size: "22",
                            color: "#667eea"
                          })
                        ], 8, ["onClick"])
                      ])
                    ], 44, ["onTouchstart", "onTouchmove", "onTouchend", "onClick"]),
                    ((_b = $setup.swipeStates[goods.id]) == null ? void 0 : _b.showDelete) ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 0,
                      class: "delete-action",
                      onClick: ($event) => $setup.confirmDeleteGoods(goods)
                    }, [
                      vue.createVNode(_component_uni_icons, {
                        type: "trash",
                        size: "24",
                        color: "#fff"
                      })
                    ], 8, ["onClick"])) : vue.createCommentVNode("v-if", true)
                  ])
                ]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])) : (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            { key: 1 },
            [
              vue.createCommentVNode(" 空状态 "),
              vue.createElementVNode("view", { class: "empty-state" }, [
                vue.createElementVNode("text", { class: "empty-text" }, "暂无交易品种"),
                vue.createElementVNode("text", { class: "empty-tips" }, '点击下方"+"添加交易品种')
              ])
            ],
            2112
            /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
          ))
        ], 40, ["refresher-triggered"])
      ]),
      vue.createCommentVNode(" 添加/编辑商品弹窗 "),
      $setup.showModal ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "modal-overlay",
        onClick: $setup.closeModal
      }, [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["modal-content", { "closing": $setup.modalClosing }]),
            onClick: _cache[5] || (_cache[5] = vue.withModifiers(() => {
            }, ["stop"]))
          },
          [
            vue.createElementVNode("view", { class: "popup-header" }, [
              vue.createElementVNode(
                "text",
                { class: "popup-title" },
                vue.toDisplayString($setup.isEdit ? "编辑品种" : "添加品种"),
                1
                /* TEXT */
              ),
              vue.createElementVNode("view", {
                class: "popup-close",
                onClick: $setup.closeModal
              }, [
                vue.createVNode(_component_uni_icons, {
                  type: "close",
                  size: "20",
                  color: "#666"
                })
              ])
            ]),
            vue.createElementVNode("view", { class: "input-group" }, [
              vue.createElementVNode("view", { class: "input-label" }, [
                vue.createElementVNode("text", { class: "required" }, "*"),
                vue.createTextVNode("品种名称 ")
              ]),
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  class: "goods-input",
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.goodsForm.name = $event),
                  placeholder: "请输入品种名称",
                  maxlength: "50"
                },
                null,
                512
                /* NEED_PATCH */
              ), [
                [vue.vModelText, $setup.goodsForm.name]
              ])
            ]),
            vue.createElementVNode("view", { class: "input-group" }, [
              vue.createElementVNode("view", { class: "input-label" }, [
                vue.createElementVNode("text", { class: "required" }, "*"),
                vue.createTextVNode("品种代码 ")
              ]),
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  class: "goods-input",
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.goodsForm.code = $event),
                  placeholder: "请输入品种代码",
                  maxlength: "20"
                },
                null,
                512
                /* NEED_PATCH */
              ), [
                [vue.vModelText, $setup.goodsForm.code]
              ])
            ]),
            vue.createElementVNode("view", { class: "input-group" }, [
              vue.createElementVNode("view", { class: "input-label" }, [
                vue.createElementVNode("text", { class: "required" }, "*"),
                vue.createTextVNode("1手1点利润 ")
              ]),
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  class: "goods-input",
                  type: "digit",
                  "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.goodsForm.singleProfit = $event),
                  placeholder: "请输入1手1点利润",
                  maxlength: "20"
                },
                null,
                512
                /* NEED_PATCH */
              ), [
                [vue.vModelText, $setup.goodsForm.singleProfit]
              ])
            ]),
            vue.createElementVNode("view", { class: "popup-actions" }, [
              vue.createElementVNode("button", {
                class: "cancel-btn",
                onClick: $setup.closeModal
              }, "取消"),
              vue.createElementVNode("button", {
                class: "confirm-btn",
                onClick: $setup.saveGoods,
                disabled: !$setup.goodsForm.name || !$setup.goodsForm.code || !$setup.goodsForm.singleProfit
              }, vue.toDisplayString($setup.isEdit ? "保存" : "添加"), 9, ["disabled"])
            ])
          ],
          2
          /* CLASS */
        )
      ])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 添加品种按钮 "),
      vue.createElementVNode("view", { class: "add-goods-container" }, [
        vue.createElementVNode("view", {
          class: "add-goods-btn",
          onClick: $setup.showAddModal
        }, [
          vue.createVNode(_component_uni_icons, {
            type: "plus",
            size: "20",
            color: "#fff"
          }),
          vue.createElementVNode("text", { class: "add-btn-text" }, "添加品种")
        ])
      ]),
      vue.createCommentVNode(" 品种详情弹窗 "),
      $setup.showDetailModal ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 2,
        class: "modal-overlay",
        onClick: $setup.closeDetailModal
      }, [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["modal-content detail-modal", { "closing": $setup.detailModalClosing }]),
            onClick: _cache[8] || (_cache[8] = vue.withModifiers(() => {
            }, ["stop"]))
          },
          [
            vue.createElementVNode("view", { class: "popup-header" }, [
              vue.createElementVNode("text", { class: "popup-title" }, "品种详情"),
              vue.createElementVNode("view", {
                class: "popup-close",
                onClick: $setup.closeDetailModal
              }, [
                vue.createVNode(_component_uni_icons, {
                  type: "close",
                  size: "20",
                  color: "#666"
                })
              ])
            ]),
            vue.createElementVNode("view", { class: "detail-content" }, [
              vue.createElementVNode("view", { class: "detail-item" }, [
                vue.createElementVNode("text", { class: "detail-label" }, "品种名称"),
                vue.createElementVNode(
                  "text",
                  { class: "detail-value" },
                  vue.toDisplayString($setup.currentGoods.name || "未命名"),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "detail-item" }, [
                vue.createElementVNode("text", { class: "detail-label" }, "品种代码"),
                vue.createElementVNode(
                  "text",
                  { class: "detail-value" },
                  vue.toDisplayString($setup.currentGoods.code || "-"),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "detail-item" }, [
                vue.createElementVNode("text", { class: "detail-label" }, "当前价格"),
                vue.createElementVNode(
                  "text",
                  { class: "detail-value" },
                  "¥" + vue.toDisplayString(_ctx.formatPrice($setup.currentGoods.price)),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "detail-item" }, [
                vue.createElementVNode("text", { class: "detail-label" }, "涨跌幅"),
                vue.createElementVNode(
                  "text",
                  {
                    class: vue.normalizeClass(["detail-value", _ctx.getChangeClass($setup.currentGoods.change)])
                  },
                  vue.toDisplayString(_ctx.formatChange($setup.currentGoods.change)),
                  3
                  /* TEXT, CLASS */
                )
              ]),
              vue.createElementVNode("view", { class: "detail-item" }, [
                vue.createElementVNode("text", { class: "detail-label" }, "库存"),
                vue.createElementVNode(
                  "text",
                  { class: "detail-value" },
                  vue.toDisplayString($setup.currentGoods.stock || 0),
                  1
                  /* TEXT */
                )
              ])
            ]),
            vue.createElementVNode("view", { class: "popup-actions" }, [
              vue.createElementVNode("button", {
                class: "action-btn edit",
                onClick: _cache[6] || (_cache[6] = ($event) => $setup.editGoods($setup.currentGoods))
              }, "编辑"),
              vue.createElementVNode("button", {
                class: "action-btn delete",
                onClick: _cache[7] || (_cache[7] = ($event) => $setup.confirmDeleteGoods($setup.currentGoods))
              }, "删除")
            ])
          ],
          2
          /* CLASS */
        )
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const PagesTradeTrade = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__scopeId", "data-v-83c5a4cc"], ["__file", "C:/Users/Administrator/Documents/HBuilderProjects/todoPlus/pages/trade/trade.vue"]]);
  const _sfc_main$1 = {
    __name: "logDetail",
    setup(__props, { expose: __expose }) {
      __expose();
      const userStore = useUserStore();
      const constantsStore = useConstantsStore();
      const goodsInfo = vue.reactive({
        id: "",
        name: "",
        code: ""
      });
      const logsList = vue.ref([]);
      const refresherTriggered = vue.ref(false);
      const totalProfit = vue.ref(0);
      const showLogModal = vue.ref(false);
      const logModalClosing = vue.ref(false);
      const isEditMode = vue.ref(false);
      const showOutLogModal = vue.ref(false);
      const outLogModalClosing = vue.ref(false);
      const logForm = vue.reactive({
        id: null,
        // 编辑时的日志ID
        inDesc: "",
        inPrice: "",
        isRise: true,
        // true: 看涨, false: 看跌
        count: "",
        // 手数
        existingImgs: [],
        // 已有图片数组（用于编辑时显示和删除）
        addInImgs: []
        // 新增入场图片数组
      });
      const outLogForm = vue.reactive({
        id: null,
        // 编辑时的出场记录ID
        tradeLogId: null,
        // 入场日志ID
        count: "",
        // 平仓手数
        outPrice: "",
        // 出场价格
        outDesc: "",
        // 出场描述
        existingImgs: [],
        // 已有出场图片数组
        addOutImgs: []
        // 新增出场图片数组
      });
      const isEditOutLogMode = vue.ref(false);
      const showLogDetailModal = vue.ref(false);
      const logDetailModalClosing = vue.ref(false);
      const viewingLog = vue.ref(null);
      const outLogsList = vue.ref([]);
      const isLoadingOutLogs = vue.ref(false);
      const totalOutCount = vue.computed(() => {
        return outLogsList.value.reduce((sum, outLog) => sum + (outLog.count || 0), 0);
      });
      const canAddOutLog = vue.computed(() => {
        const editMode = isEditMode.value;
        const count = logForm.count;
        const inCount = parseInt(logForm.count) || 0;
        const totalOut = totalOutCount.value;
        const result = editMode && count && totalOut < inCount;
        formatAppLog("log", "at pages/logDetail/logDetail.vue:588", "canAddOutLog 检查:", {
          isEditMode: editMode,
          logFormCount: count,
          inCount,
          totalOutCount: totalOut,
          result
        });
        return result;
      });
      const swipeStates = vue.ref({});
      const touchStartX = vue.ref(0);
      const touchStartY = vue.ref(0);
      const currentSwipeLogId = vue.ref(null);
      const currentBackgroundImage = vue.computed(() => {
        return userStore.userInfo.backgroudImg || "";
      });
      const formattedProfit = vue.computed(() => {
        if (totalProfit.value > 0) {
          return "+" + totalProfit.value.toFixed(2);
        } else {
          return totalProfit.value.toFixed(2);
        }
      });
      const goBack = () => {
        uni.navigateBack();
      };
      const addLog2 = () => {
        uni.navigateTo({
          url: `/pages/addLog/addLog?goodsId=${goodsInfo.id}&goodsName=${encodeURIComponent(goodsInfo.name)}`
        });
      };
      const showAddLogModal = () => {
        logForm.id = null;
        logForm.inDesc = "";
        logForm.inPrice = "";
        logForm.isRise = true;
        logForm.count = "";
        logForm.existingImgs = [];
        logForm.addInImgs = [];
        outLogsList.value = [];
        isEditMode.value = false;
        showLogModal.value = true;
      };
      const closeLogModal = () => {
        logModalClosing.value = true;
        setTimeout(() => {
          showLogModal.value = false;
          logModalClosing.value = false;
          outLogsList.value = [];
        }, 300);
      };
      const chooseInImages = () => {
        uni.chooseImage({
          count: 9,
          sizeType: ["original", "compressed"],
          sourceType: ["album", "camera"],
          success: (res2) => {
            formatAppLog("log", "at pages/logDetail/logDetail.vue:662", "选择入场图片成功:", res2.tempFilePaths);
            const newImages = res2.tempFilePaths.map((path, index) => ({
              url: path,
              // 用于预览显示
              path,
              // 实际文件路径
              name: `inImg_${Date.now()}_${index}.jpg`,
              isExisting: false
              // 明确标记为新上传的图片
            }));
            logForm.addInImgs = [...logForm.addInImgs, ...newImages];
            formatAppLog("log", "at pages/logDetail/logDetail.vue:671", "当前新增图片数组:", logForm.addInImgs);
          },
          fail: (error) => {
            formatAppLog("error", "at pages/logDetail/logDetail.vue:674", "选择入场图片失败:", error);
          }
        });
      };
      const removeInImage = (index) => {
        logForm.addInImgs.splice(index, 1);
      };
      const removeExistingImage = (index) => {
        logForm.existingImgs.splice(index, 1);
      };
      const removeNewImage = (index) => {
        logForm.addInImgs.splice(index, 1);
      };
      const canSaveLog = vue.computed(() => {
        return logForm.inDesc.trim() && logForm.inPrice && (logForm.isRise === true || logForm.isRise === false) && logForm.count;
      });
      const createFileFromPath = async (path, fileName, isExisting = false) => {
        try {
          if (isExisting) {
            return path;
          }
          return new Promise((resolve2, reject) => {
            plus.io.resolveLocalFileSystemURL(path, (entry) => {
              entry.file((file) => {
                const reader = new plus.io.FileReader();
                reader.onloadend = (e) => {
                  const arrayBuffer = e.target.result;
                  const blob = new Blob([arrayBuffer], { type: "image/jpeg" });
                  const fileObj = new File([blob], fileName, { type: "image/jpeg" });
                  resolve2(fileObj);
                };
                reader.readAsArrayBuffer(file);
              }, reject);
            }, reject);
          });
          return null;
        } catch (error) {
          formatAppLog("error", "at pages/logDetail/logDetail.vue:735", "创建文件对象失败:", error);
          return null;
        }
      };
      const saveLog = async () => {
        if (!canSaveLog.value) {
          uni.showToast({
            title: "请填写必填项",
            icon: "none"
          });
          return;
        }
        const countValue = parseFloat(logForm.count);
        if (isNaN(countValue) || countValue <= 0) {
          uni.showToast({
            title: "请输入有效的手数",
            icon: "none"
          });
          return;
        }
        uni.showLoading({
          title: isEditMode.value ? "更新中..." : "保存中..."
        });
        try {
          formatAppLog("log", "at pages/logDetail/logDetail.vue:765", "开始保存交易日志");
          formatAppLog("log", "at pages/logDetail/logDetail.vue:766", "表单数据:", logForm);
          formatAppLog("log", "at pages/logDetail/logDetail.vue:767", "编辑模式:", isEditMode.value);
          formatAppLog("log", "at pages/logDetail/logDetail.vue:768", "goodsInfo.id:", goodsInfo.id);
          if (!isEditMode.value) {
            if (!goodsInfo.id || goodsInfo.id === "") {
              uni.hideLoading();
              uni.showToast({
                title: "商品ID不能为空，请重新进入页面",
                icon: "error",
                duration: 3e3
              });
              return;
            }
          } else {
            if (!logForm.id) {
              uni.hideLoading();
              uni.showToast({
                title: "日志ID不能为空",
                icon: "error"
              });
              return;
            }
          }
          const data = {
            id: isEditMode.value ? logForm.id : goodsInfo.id,
            // 编辑模式传日志ID，新增模式传商品ID
            inDesc: logForm.inDesc.trim(),
            inPrice: parseFloat(logForm.inPrice),
            isRise: logForm.isRise,
            count: parseInt(logForm.count)
          };
          if (logForm.outDesc && logForm.outDesc.trim()) {
            data.outDesc = logForm.outDesc.trim();
          }
          if (logForm.outPrice && logForm.outPrice !== "") {
            data.outPrice = parseFloat(logForm.outPrice);
          }
          data.outImgs = "";
          if (isEditMode.value && logForm.existingImgs && logForm.existingImgs.length > 0) {
            const existingImgUrls = logForm.existingImgs.map((img) => img.url);
            data.inImgs = JSON.stringify(existingImgUrls);
            formatAppLog("log", "at pages/logDetail/logDetail.vue:819", "已有入场图片JSON字符串:", data.inImgs);
          } else {
            data.inImgs = "";
          }
          formatAppLog("log", "at pages/logDetail/logDetail.vue:826", "最终发送的数据:", data);
          const hasFiles = logForm.addInImgs && logForm.addInImgs.length > 0;
          formatAppLog("log", "at pages/logDetail/logDetail.vue:830", "是否有文件需要上传:", hasFiles);
          const url = isEditMode.value ? `${baseURL_}/trade/updLog` : `${baseURL_}/trade/addLog`;
          let res2;
          if (hasFiles) {
            formatAppLog("log", "at pages/logDetail/logDetail.vue:841", "有文件，准备上传多个文件:", logForm.addInImgs.length, "张");
            formatAppLog("log", "at pages/logDetail/logDetail.vue:900", "小程序/APP环境，准备上传", logForm.addInImgs.length, "张图片");
            const firstFile = logForm.addInImgs[0];
            const firstFilePath = firstFile.path || firstFile.url;
            const firstRequestData = {
              id: data.id.toString(),
              inDesc: data.inDesc,
              inPrice: data.inPrice.toString(),
              isRise: data.isRise.toString(),
              count: data.count.toString(),
              inImgs: data.inImgs || "",
              outDesc: data.outDesc || "",
              outImgs: data.outImgs || ""
            };
            if (data.outPrice !== void 0) {
              firstRequestData.outPrice = data.outPrice.toString();
            }
            formatAppLog("log", "at pages/logDetail/logDetail.vue:921", "Step 1: 上传第一张图片，调用", isEditMode.value ? "updLog" : "addLog");
            formatAppLog("log", "at pages/logDetail/logDetail.vue:922", "第一张图片路径:", firstFilePath);
            formatAppLog("log", "at pages/logDetail/logDetail.vue:923", "第一张图片请求参数:", firstRequestData);
            res2 = await new Promise((resolve2, reject) => {
              uni.uploadFile({
                url,
                // addLog 或 updLog
                filePath: firstFilePath,
                name: "addInImgs",
                formData: firstRequestData,
                header: {
                  Authorization: userStore.userInfo.authorization ? `Bearer ${userStore.userInfo.authorization}` : ""
                },
                success: (uploadRes) => {
                  formatAppLog("log", "at pages/logDetail/logDetail.vue:937", "第一张图片上传结果:", uploadRes);
                  try {
                    const responseData = typeof uploadRes.data === "string" ? JSON.parse(uploadRes.data) : uploadRes.data;
                    formatAppLog("log", "at pages/logDetail/logDetail.vue:943", "解析后的第一张图片上传结果:", responseData);
                    if (responseData && (responseData.code == 200 || responseData.code == "200")) {
                      resolve2(responseData);
                    } else {
                      reject(new Error((responseData == null ? void 0 : responseData.msg) || (responseData == null ? void 0 : responseData.message) || "第一张图片上传失败"));
                    }
                  } catch (e) {
                    reject(new Error("解析第一张图片响应失败"));
                  }
                },
                fail: (err) => {
                  formatAppLog("error", "at pages/logDetail/logDetail.vue:955", "第一张图片上传失败:", err);
                  reject(err);
                }
              });
            });
            if (logForm.addInImgs.length > 1 && res2 && (res2.code == 200 || res2.code == "200")) {
              formatAppLog("log", "at pages/logDetail/logDetail.vue:963", "Step 2: 继续上传剩余", logForm.addInImgs.length - 1, "张图片");
              let tradeLogId;
              if (isEditMode.value) {
                tradeLogId = data.id;
              } else {
                tradeLogId = res2.data || res2.message;
              }
              formatAppLog("log", "at pages/logDetail/logDetail.vue:974", "获取到的交易记录ID:", tradeLogId);
              if (!tradeLogId) {
                formatAppLog("warn", "at pages/logDetail/logDetail.vue:977", "无法获取交易记录ID，跳过剩余图片上传");
              } else {
                const additionalUrl = isEditMode.value ? `${baseURL_}/trade/updLog` : `${baseURL_}/trade/addLog`;
                for (let i = 1; i < logForm.addInImgs.length; i++) {
                  const additionalFile = logForm.addInImgs[i];
                  const additionalFilePath = additionalFile.path || additionalFile.url;
                  formatAppLog("log", "at pages/logDetail/logDetail.vue:989", `Step 2.${i}: 上传第${i + 1}张图片，调用${isEditMode.value ? "updLog" : "addLog"}接口，isUpload=true`);
                  formatAppLog("log", "at pages/logDetail/logDetail.vue:990", "图片路径:", additionalFilePath);
                  const additionalRequestData = {
                    id: tradeLogId.toString(),
                    // 使用交易记录ID
                    inDesc: data.inDesc,
                    inPrice: data.inPrice.toString(),
                    isRise: data.isRise.toString(),
                    count: data.count.toString(),
                    inImgs: data.inImgs || "",
                    outDesc: data.outDesc || "",
                    outImgs: data.outImgs || "",
                    isUpload: "true"
                    // 关键参数：标识这是追加图片
                  };
                  if (data.outPrice !== void 0) {
                    additionalRequestData.outPrice = data.outPrice.toString();
                  }
                  try {
                    const additionalRes = await new Promise((resolve2, reject) => {
                      uni.uploadFile({
                        url: additionalUrl,
                        // 根据模式选择接口
                        filePath: additionalFilePath,
                        name: "addInImgs",
                        formData: additionalRequestData,
                        header: {
                          Authorization: userStore.userInfo.authorization ? `Bearer ${userStore.userInfo.authorization}` : ""
                        },
                        success: (uploadRes) => {
                          formatAppLog("log", "at pages/logDetail/logDetail.vue:1021", `第${i + 1}张图片上传结果:`, uploadRes);
                          try {
                            const responseData = typeof uploadRes.data === "string" ? JSON.parse(uploadRes.data) : uploadRes.data;
                            if (responseData && (responseData.code == 200 || responseData.code == "200")) {
                              resolve2(responseData);
                            } else {
                              reject(new Error((responseData == null ? void 0 : responseData.msg) || (responseData == null ? void 0 : responseData.message) || `第${i + 1}张图片上传失败`));
                            }
                          } catch (e) {
                            reject(new Error(`解析第${i + 1}张图片响应失败`));
                          }
                        },
                        fail: (err) => {
                          formatAppLog("error", "at pages/logDetail/logDetail.vue:1037", `第${i + 1}张图片上传失败:`, err);
                          reject(err);
                        }
                      });
                    });
                    formatAppLog("log", "at pages/logDetail/logDetail.vue:1043", `第${i + 1}张图片上传成功`);
                  } catch (error) {
                    formatAppLog("error", "at pages/logDetail/logDetail.vue:1045", `第${i + 1}张图片上传失败:`, error);
                  }
                }
                formatAppLog("log", "at pages/logDetail/logDetail.vue:1050", "所有图片上传完成");
              }
            }
          } else {
            formatAppLog("log", "at pages/logDetail/logDetail.vue:1056", "无文件，使用普通请求");
            res2 = await new Promise((resolve2, reject) => {
              uni.request({
                url,
                method: "POST",
                data,
                header: {
                  // 使用表单格式，完全参考人设接口
                  "Content-Type": "application/x-www-form-urlencoded",
                  "Authorization": userStore.userInfo.authorization ? `Bearer ${userStore.userInfo.authorization}` : ""
                },
                success: (res3) => {
                  var _a2, _b;
                  formatAppLog("log", "at pages/logDetail/logDetail.vue:1071", "请求结果:", res3);
                  if (res3.statusCode === 200 && (res3.data.code === 200 || res3.data.code === "200")) {
                    resolve2(res3.data);
                  } else {
                    formatAppLog("error", "at pages/logDetail/logDetail.vue:1076", "请求失败:", res3.data);
                    reject(new Error(((_a2 = res3.data) == null ? void 0 : _a2.msg) || ((_b = res3.data) == null ? void 0 : _b.message) || "请求失败"));
                  }
                },
                fail: (err) => {
                  formatAppLog("error", "at pages/logDetail/logDetail.vue:1081", "请求失败:", err);
                  reject(err);
                }
              });
            });
          }
          uni.hideLoading();
          formatAppLog("log", "at pages/logDetail/logDetail.vue:1090", "保存交易日志响应:", res2);
          if (res2.code === 200 || res2.code === "200") {
            uni.showToast({
              title: isEditMode.value ? "更新成功" : "添加成功",
              icon: "success"
            });
            closeLogModal();
            constantsStore.needRefreshGoods = Math.random();
            if (logForm.id) {
              logOutRecordsCache.value.delete(logForm.id);
              logSummaries.value.delete(logForm.id);
            }
            await Promise.all([fetchLogs(), fetchProfitData()]);
          } else {
            uni.showToast({
              title: res2.message || (isEditMode.value ? "更新失败" : "添加失败"),
              icon: "none"
            });
          }
        } catch (error) {
          uni.hideLoading();
          formatAppLog("error", "at pages/logDetail/logDetail.vue:1115", "保存交易日志异常:", error);
          uni.showToast({
            title: isEditMode.value ? "更新失败" : "添加失败",
            icon: "none"
          });
        }
      };
      const fetchProfitData = async () => {
        if (!goodsInfo.id)
          return;
        try {
          const res2 = await tradeApi.queryProfit({
            goodsId: goodsInfo.id
          });
          if (res2.code === 200 || res2.code === "200") {
            totalProfit.value = Number(res2.data || 0);
          } else {
            formatAppLog("error", "at pages/logDetail/logDetail.vue:1134", "获取商品盈亏数据失败:", res2.message);
          }
        } catch (error) {
          formatAppLog("error", "at pages/logDetail/logDetail.vue:1137", "获取商品盈亏数据异常:", error);
          totalProfit.value = 0;
        }
      };
      const fetchLogs = async () => {
        var _a2;
        if (!goodsInfo.id)
          return;
        try {
          const res2 = await tradeApi.queryLog({
            goodsId: goodsInfo.id,
            pageSize: 50,
            pageNo: 1
          });
          if (res2.code === 200 || res2.code === "200") {
            logsList.value = ((_a2 = res2.data) == null ? void 0 : _a2.list) || [];
            loadAllLogSummaries();
          } else {
            formatAppLog("error", "at pages/logDetail/logDetail.vue:1158", "获取交易日志失败:", res2.message);
          }
        } catch (error) {
          formatAppLog("error", "at pages/logDetail/logDetail.vue:1161", "获取交易日志异常:", error);
        }
      };
      const loadAllLogSummaries = async () => {
        for (const log of logsList.value) {
          if (!logSummaries.value.has(log.id)) {
            const summary = await getLogSummary(log);
            logSummaries.value.set(log.id, summary);
          }
        }
      };
      const fetchOutLogs = async (logId) => {
        if (!logId)
          return;
        isLoadingOutLogs.value = true;
        try {
          const res2 = await tradeApi.queryOutLog(logId);
          if (res2.code === 200 || res2.code === "200") {
            outLogsList.value = res2.data || [];
            formatAppLog("log", "at pages/logDetail/logDetail.vue:1185", "获取出场记录成功:", outLogsList.value);
          } else {
            formatAppLog("error", "at pages/logDetail/logDetail.vue:1187", "获取出场记录失败:", res2.message);
            outLogsList.value = [];
          }
        } catch (error) {
          formatAppLog("error", "at pages/logDetail/logDetail.vue:1191", "获取出场记录异常:", error);
          outLogsList.value = [];
        } finally {
          isLoadingOutLogs.value = false;
        }
      };
      const handleRefresh = async () => {
        refresherTriggered.value = true;
        resetAllSwipeStates();
        logOutRecordsCache.value.clear();
        logSummaries.value.clear();
        try {
          await Promise.all([fetchProfitData(), fetchLogs()]);
        } catch (error) {
          formatAppLog("error", "at pages/logDetail/logDetail.vue:1210", "刷新失败:", error);
        } finally {
          setTimeout(() => {
            refresherTriggered.value = false;
          }, 1e3);
        }
      };
      const formatDate = (timestamp) => {
        if (!timestamp)
          return "";
        const date = new Date(timestamp);
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hour = String(date.getHours()).padStart(2, "0");
        const minute = String(date.getMinutes()).padStart(2, "0");
        return `${month}-${day} ${hour}:${minute}`;
      };
      const formatProfit = (profit) => {
        if (!profit)
          return "0.00";
        return profit > 0 ? `+${profit.toFixed(2)}` : profit.toFixed(2);
      };
      const getProfitClass = (profit) => {
        if (!profit)
          return "";
        return profit > 0 ? "profit-positive" : "profit-negative";
      };
      const formatBalance = () => {
        const total = logsList.value.reduce((sum, log) => sum + (log.profit || 0), 0);
        return total > 0 ? `+${total.toFixed(2)}` : total.toFixed(2);
      };
      const getBalanceClass = () => {
        const total = logsList.value.reduce((sum, log) => sum + (log.profit || 0), 0);
        return total > 0 ? "profit-positive" : total < 0 ? "profit-negative" : "";
      };
      const formatWinRate = () => {
        if (logsList.value.length === 0)
          return "0.00%";
        const winCount = logsList.value.filter((log) => (log.profit || 0) > 0).length;
        const winRate = winCount / logsList.value.length * 100;
        return winRate.toFixed(2) + "%";
      };
      const handleTouchStart = (e, logId) => {
        touchStartX.value = e.touches[0].clientX;
        touchStartY.value = e.touches[0].clientY;
        currentSwipeLogId.value = logId;
      };
      const handleTouchMove = (e, logId) => {
        if (currentSwipeLogId.value !== logId)
          return;
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;
        const deltaX = touchX - touchStartX.value;
        const deltaY = touchY - touchStartY.value;
        if (Math.abs(deltaY) > Math.abs(deltaX))
          return;
        if (deltaX < 0) {
          const translateX = Math.max(deltaX * 0.5, -120);
          if (!swipeStates.value[logId]) {
            swipeStates.value[logId] = {};
          }
          swipeStates.value[logId].translateX = translateX;
          swipeStates.value[logId].showDelete = translateX < -30;
        }
      };
      const handleTouchEnd = (e, logId) => {
        if (currentSwipeLogId.value !== logId)
          return;
        const state = swipeStates.value[logId];
        if (!state)
          return;
        if (state.translateX < -60) {
          state.translateX = -120;
          state.showDelete = true;
        } else if (state.translateX < -30) {
          state.translateX = -120;
          state.showDelete = true;
        } else {
          resetSwipeState(logId);
        }
        currentSwipeLogId.value = null;
      };
      const resetSwipeState = (logId) => {
        if (swipeStates.value[logId]) {
          swipeStates.value[logId].translateX = 0;
          swipeStates.value[logId].showDelete = false;
        }
      };
      const resetAllSwipeStates = () => {
        Object.keys(swipeStates.value).forEach((logId) => {
          resetSwipeState(logId);
        });
      };
      const confirmDeleteLog = (log) => {
        resetAllSwipeStates();
        uni.showModal({
          title: "删除确认",
          content: `确定要删除这条交易记录吗？`,
          confirmColor: "#f56c6c",
          success: async (res2) => {
            if (res2.confirm) {
              await deleteLog(log.id);
            }
          }
        });
      };
      const confirmDeleteOutLog = (outLog) => {
        uni.showModal({
          title: "删除确认",
          content: `确定要删除这条平仓记录吗？`,
          confirmColor: "#f56c6c",
          success: async (res2) => {
            if (res2.confirm) {
              await deleteOutLog(outLog.id);
            }
          }
        });
      };
      const deleteLog = async (id) => {
        if (!id)
          return;
        uni.showLoading({
          title: "删除中..."
        });
        try {
          const res2 = await tradeApi.delLog(id);
          uni.hideLoading();
          if (res2.code === 200 || res2.code === "200") {
            uni.showToast({
              title: "删除成功",
              icon: "success"
            });
            constantsStore.needRefreshGoods = Math.random();
            await Promise.all([fetchLogs(), fetchProfitData()]);
          } else {
            uni.showToast({
              title: res2.message || "删除失败",
              icon: "none"
            });
          }
        } catch (error) {
          uni.hideLoading();
          uni.showToast({
            title: "删除失败",
            icon: "none"
          });
          formatAppLog("error", "at pages/logDetail/logDetail.vue:1396", "删除交易日志失败:", error);
        }
      };
      const deleteOutLog = async (id) => {
        if (!id)
          return;
        uni.showLoading({
          title: "删除中..."
        });
        try {
          const res2 = await tradeApi.delOutLog(id);
          uni.hideLoading();
          if (res2.code === 200 || res2.code === "200") {
            uni.showToast({
              title: "删除成功",
              icon: "success"
            });
            constantsStore.needRefreshGoods = Math.random();
            await Promise.all([fetchOutLogs(logForm.id), fetchLogs(), fetchProfitData()]);
          } else {
            uni.showToast({
              title: res2.message || "删除失败",
              icon: "none"
            });
          }
        } catch (error) {
          uni.hideLoading();
          uni.showToast({
            title: "删除失败",
            icon: "none"
          });
          formatAppLog("error", "at pages/logDetail/logDetail.vue:1433", "删除平仓记录失败:", error);
        }
      };
      const editLog = (log) => {
        formatAppLog("log", "at pages/logDetail/logDetail.vue:1439", "编辑交易日志，log.inImgs:", log.inImgs);
        logForm.id = log.id;
        logForm.inDesc = log.inDesc || "";
        logForm.inPrice = log.inPrice || "";
        logForm.isRise = log.isRise;
        logForm.count = log.count || "";
        if (log.inImgs && Array.isArray(log.inImgs) && log.inImgs.length > 0) {
          logForm.existingImgs = log.inImgs.map((url, index) => ({
            url,
            path: url,
            name: `existingImg_${log.id}_${index}.jpg`,
            isExisting: true
          }));
        } else if (log.inImgs && typeof log.inImgs === "string") {
          try {
            const parsedImgs = JSON.parse(log.inImgs);
            if (Array.isArray(parsedImgs)) {
              logForm.existingImgs = parsedImgs.map((url, index) => ({
                url,
                path: url,
                name: `existingImg_${log.id}_${index}.jpg`,
                isExisting: true
              }));
            } else {
              logForm.existingImgs = [];
            }
          } catch (e) {
            const urlRegex = /https?:\/\/[^\s"',\]]+/g;
            const urls = log.inImgs.match(urlRegex) || [];
            logForm.existingImgs = urls.map((url, index) => {
              const cleanUrl2 = url.replace(/[,\]"']+$/, "");
              return {
                url: cleanUrl2,
                path: cleanUrl2,
                name: `existingImg_${log.id}_${index}.jpg`,
                isExisting: true
              };
            });
          }
        } else {
          logForm.existingImgs = [];
        }
        logForm.addInImgs = [];
        formatAppLog("log", "at pages/logDetail/logDetail.vue:1493", "处理后的已有图片数组:", logForm.existingImgs);
        fetchOutLogs(log.id);
        isEditMode.value = true;
        showLogModal.value = true;
      };
      const handleImageLoad = (src, index) => {
        formatAppLog("log", "at pages/logDetail/logDetail.vue:1504", `图片加载成功: ${src}, 索引: ${index}`);
      };
      const handleImageError = (src, index) => {
        formatAppLog("error", "at pages/logDetail/logDetail.vue:1509", `图片加载失败: ${src}, 索引: ${index}`);
      };
      const previewImage = (current, urls) => {
        uni.previewImage({
          urls,
          // 所有图片的URL数组
          current,
          // 当前显示的图片URL
          success: (res2) => {
            formatAppLog("log", "at pages/logDetail/logDetail.vue:1518", "图片预览成功");
          },
          fail: (err) => {
            formatAppLog("error", "at pages/logDetail/logDetail.vue:1521", "图片预览失败:", err);
            uni.showToast({
              title: "图片预览失败",
              icon: "none"
            });
          }
        });
      };
      const getAllImageUrls = () => {
        const urls = [];
        logForm.existingImgs.forEach((img) => urls.push(img.url));
        logForm.addInImgs.forEach((img) => urls.push(img.url));
        return urls;
      };
      const parseOutImages = (imgUrls) => {
        if (!imgUrls || typeof imgUrls !== "string")
          return [];
        try {
          const parsedImgs = JSON.parse(imgUrls);
          if (Array.isArray(parsedImgs)) {
            return parsedImgs;
          }
        } catch (e) {
          formatAppLog("error", "at pages/logDetail/logDetail.vue:1547", "解析出场图片URL失败:", e);
        }
        return [];
      };
      const previewOutImage = (current, urls) => {
        uni.previewImage({
          urls,
          // 所有图片的URL数组
          current,
          // 当前显示的图片URL
          success: (res2) => {
            formatAppLog("log", "at pages/logDetail/logDetail.vue:1558", "出场图片预览成功");
          },
          fail: (err) => {
            formatAppLog("error", "at pages/logDetail/logDetail.vue:1561", "出场图片预览失败:", err);
            uni.showToast({
              title: "出场图片预览失败",
              icon: "none"
            });
          }
        });
      };
      const showAddOutLogModal = () => {
        const remainingCount = parseInt(logForm.count) - totalOutCount.value;
        formatAppLog("log", "at pages/logDetail/logDetail.vue:1574", "显示新增平仓记录弹窗");
        formatAppLog("log", "at pages/logDetail/logDetail.vue:1575", "入场手数:", logForm.count);
        formatAppLog("log", "at pages/logDetail/logDetail.vue:1576", "已平仓手数:", totalOutCount.value);
        formatAppLog("log", "at pages/logDetail/logDetail.vue:1577", "剩余未平仓手数:", remainingCount);
        outLogForm.id = null;
        outLogForm.tradeLogId = logForm.id;
        outLogForm.count = "";
        outLogForm.outPrice = "";
        outLogForm.outDesc = "";
        outLogForm.existingImgs = [];
        outLogForm.addOutImgs = [];
        isEditOutLogMode.value = false;
        showOutLogModal.value = true;
      };
      const closeOutLogModal = () => {
        outLogModalClosing.value = true;
        setTimeout(() => {
          showOutLogModal.value = false;
          outLogModalClosing.value = false;
          isEditOutLogMode.value = false;
          outLogForm.id = null;
        }, 300);
      };
      const canSaveOutLog = vue.computed(() => {
        const count = parseInt(outLogForm.count) || 0;
        const outPrice = parseFloat(outLogForm.outPrice) || 0;
        if (count <= 0 || outPrice <= 0) {
          return false;
        }
        if (isEditOutLogMode.value) {
          return true;
        } else {
          const remainingCount = parseInt(logForm.count) - totalOutCount.value;
          return count <= remainingCount;
        }
      });
      const chooseOutImages = () => {
        uni.chooseImage({
          count: 9,
          sizeType: ["original", "compressed"],
          sourceType: ["album", "camera"],
          success: (res2) => {
            formatAppLog("log", "at pages/logDetail/logDetail.vue:1636", "选择出场图片成功:", res2.tempFilePaths);
            const newImages = res2.tempFilePaths.map((path, index) => ({
              url: path,
              // 用于预览显示
              path,
              // 实际文件路径
              name: `outImg_${Date.now()}_${index}.jpg`,
              isExisting: false
              // 明确标记为新上传的图片
            }));
            outLogForm.addOutImgs = [...outLogForm.addOutImgs, ...newImages];
            formatAppLog("log", "at pages/logDetail/logDetail.vue:1645", "当前新增出场图片数组:", outLogForm.addOutImgs);
          },
          fail: (error) => {
            formatAppLog("error", "at pages/logDetail/logDetail.vue:1648", "选择出场图片失败:", error);
          }
        });
      };
      const removeExistingOutImage = (index) => {
        outLogForm.existingImgs.splice(index, 1);
      };
      const removeNewOutImage = (index) => {
        outLogForm.addOutImgs.splice(index, 1);
      };
      const getAllOutImageUrls = () => {
        const urls = [];
        outLogForm.existingImgs.forEach((img) => urls.push(img.url));
        outLogForm.addOutImgs.forEach((img) => urls.push(img.url));
        return urls;
      };
      const saveOutLog = async () => {
        if (!canSaveOutLog.value) {
          uni.showToast({
            title: "请填写必填项",
            icon: "none"
          });
          return;
        }
        const count = parseInt(outLogForm.count) || 0;
        if (isEditOutLogMode.value) {
          if (count <= 0) {
            uni.showToast({
              title: "手数必须大于0",
              icon: "none"
            });
            return;
          }
        } else {
          const remainingCount = parseInt(logForm.count) - totalOutCount.value;
          if (count <= 0 || count > remainingCount) {
            uni.showToast({
              title: `平仓手数必须在1-${remainingCount}之间`,
              icon: "none"
            });
            return;
          }
        }
        uni.showLoading({
          title: "保存中..."
        });
        try {
          formatAppLog("log", "at pages/logDetail/logDetail.vue:1711", "开始保存平仓记录");
          formatAppLog("log", "at pages/logDetail/logDetail.vue:1712", "表单数据:", outLogForm);
          const data = {
            count,
            outPrice: parseFloat(outLogForm.outPrice),
            outDesc: outLogForm.outDesc.trim() || ""
          };
          if (isEditOutLogMode.value) {
            data.tradeLogOutId = outLogForm.id;
          } else {
            data.tradeLogId = outLogForm.tradeLogId;
          }
          if (outLogForm.addOutImgs && outLogForm.addOutImgs.length > 0) {
            formatAppLog("log", "at pages/logDetail/logDetail.vue:1732", "处理新增出场图片:", outLogForm.addOutImgs.length, "张");
            data.hasOutImgs = true;
            formatAppLog("log", "at pages/logDetail/logDetail.vue:1759", "iOS/小程序环境，标记有出场图片文件");
          }
          if (isEditOutLogMode.value && outLogForm.existingImgs && outLogForm.existingImgs.length > 0) {
            const existingImgUrls = outLogForm.existingImgs.map((img) => img.url);
            data.outImgs = JSON.stringify(existingImgUrls);
            formatAppLog("log", "at pages/logDetail/logDetail.vue:1767", "已有出场图片JSON字符串:", data.outImgs);
          } else if (isEditOutLogMode.value) {
            data.outImgs = JSON.stringify([]);
            formatAppLog("log", "at pages/logDetail/logDetail.vue:1771", "已有出场图片为空，传递空数组JSON字符串");
          }
          formatAppLog("log", "at pages/logDetail/logDetail.vue:1774", "最终发送的平仓数据:", data);
          const hasFiles = outLogForm.addOutImgs && outLogForm.addOutImgs.length > 0 || data.hasOutImgs;
          formatAppLog("log", "at pages/logDetail/logDetail.vue:1778", "是否有文件需要上传:", hasFiles);
          const url = isEditOutLogMode.value ? `${baseURL_}/trade/updOutLog` : `${baseURL_}/trade/addOutLog`;
          let res2;
          if (hasFiles) {
            formatAppLog("log", "at pages/logDetail/logDetail.vue:1789", "有文件，准备上传多个出场图片:", outLogForm.addOutImgs.length, "张");
            formatAppLog("log", "at pages/logDetail/logDetail.vue:1844", "小程序/APP环境，准备上传", outLogForm.addOutImgs.length, "张出场图片");
            const firstFile = outLogForm.addOutImgs[0];
            const firstFilePath = firstFile.path || firstFile.url;
            const firstRequestData = {
              count: data.count.toString(),
              outPrice: data.outPrice.toString(),
              outDesc: data.outDesc || "",
              outImgs: data.outImgs || ""
            };
            if (data.tradeLogId) {
              firstRequestData.tradeLogId = data.tradeLogId.toString();
            }
            if (data.tradeLogOutId) {
              firstRequestData.tradeLogOutId = data.tradeLogOutId.toString();
            }
            formatAppLog("log", "at pages/logDetail/logDetail.vue:1864", "Step 1: 上传第一张出场图片，调用", isEditOutLogMode.value ? "updOutLog" : "addOutLog");
            formatAppLog("log", "at pages/logDetail/logDetail.vue:1865", "第一张出场图片路径:", firstFilePath);
            formatAppLog("log", "at pages/logDetail/logDetail.vue:1866", "第一张出场图片请求参数:", firstRequestData);
            res2 = await new Promise((resolve2, reject) => {
              uni.uploadFile({
                url,
                // addOutLog 或 updOutLog
                filePath: firstFilePath,
                name: "addOutImgs",
                formData: firstRequestData,
                header: {
                  Authorization: userStore.userInfo.authorization ? `Bearer ${userStore.userInfo.authorization}` : ""
                },
                success: (uploadRes) => {
                  formatAppLog("log", "at pages/logDetail/logDetail.vue:1880", "第一张出场图片上传结果:", uploadRes);
                  try {
                    const responseData = typeof uploadRes.data === "string" ? JSON.parse(uploadRes.data) : uploadRes.data;
                    formatAppLog("log", "at pages/logDetail/logDetail.vue:1886", "解析后的第一张出场图片上传结果:", responseData);
                    if (responseData && (responseData.code == 200 || responseData.code == "200")) {
                      resolve2(responseData);
                    } else {
                      reject(new Error((responseData == null ? void 0 : responseData.msg) || (responseData == null ? void 0 : responseData.message) || "第一张出场图片上传失败"));
                    }
                  } catch (e) {
                    reject(new Error("解析第一张出场图片响应失败"));
                  }
                },
                fail: (err) => {
                  formatAppLog("error", "at pages/logDetail/logDetail.vue:1898", "第一张出场图片上传失败:", err);
                  reject(err);
                }
              });
            });
            if (outLogForm.addOutImgs.length > 1 && res2 && (res2.code == 200 || res2.code == "200")) {
              formatAppLog("log", "at pages/logDetail/logDetail.vue:1906", "Step 2: 继续上传剩余", outLogForm.addOutImgs.length - 1, "张出场图片");
              let outRecordId;
              if (isEditOutLogMode.value) {
                outRecordId = data.tradeLogOutId;
              } else {
                outRecordId = res2.data || res2.message;
              }
              formatAppLog("log", "at pages/logDetail/logDetail.vue:1917", "获取到的平仓记录ID:", outRecordId);
              if (!outRecordId) {
                formatAppLog("warn", "at pages/logDetail/logDetail.vue:1920", "无法获取平仓记录ID，跳过剩余图片上传");
              } else {
                const additionalUrl = isEditOutLogMode.value ? `${baseURL_}/trade/updOutLog` : `${baseURL_}/trade/addOutLog`;
                for (let i = 1; i < outLogForm.addOutImgs.length; i++) {
                  const additionalFile = outLogForm.addOutImgs[i];
                  const additionalFilePath = additionalFile.path || additionalFile.url;
                  formatAppLog("log", "at pages/logDetail/logDetail.vue:1932", `Step 2.${i}: 上传第${i + 1}张出场图片，调用${isEditOutLogMode.value ? "updOutLog" : "addOutLog"}接口，isUpload=true`);
                  formatAppLog("log", "at pages/logDetail/logDetail.vue:1933", "出场图片路径:", additionalFilePath);
                  const additionalRequestData = {
                    count: data.count.toString(),
                    outPrice: data.outPrice.toString(),
                    outDesc: data.outDesc || "",
                    outImgs: data.outImgs || "",
                    isUpload: "true"
                    // 关键参数：标识这是追加图片
                  };
                  if (isEditOutLogMode.value) {
                    additionalRequestData.tradeLogOutId = outRecordId.toString();
                  } else {
                    additionalRequestData.tradeLogId = outRecordId.toString();
                  }
                  try {
                    const additionalRes = await new Promise((resolve2, reject) => {
                      uni.uploadFile({
                        url: additionalUrl,
                        // 根据模式选择接口
                        filePath: additionalFilePath,
                        name: "addOutImgs",
                        formData: additionalRequestData,
                        header: {
                          Authorization: userStore.userInfo.authorization ? `Bearer ${userStore.userInfo.authorization}` : ""
                        },
                        success: (uploadRes) => {
                          formatAppLog("log", "at pages/logDetail/logDetail.vue:1965", `第${i + 1}张出场图片上传结果:`, uploadRes);
                          try {
                            const responseData = typeof uploadRes.data === "string" ? JSON.parse(uploadRes.data) : uploadRes.data;
                            if (responseData && (responseData.code == 200 || responseData.code == "200")) {
                              resolve2(responseData);
                            } else {
                              reject(new Error((responseData == null ? void 0 : responseData.msg) || (responseData == null ? void 0 : responseData.message) || `第${i + 1}张出场图片上传失败`));
                            }
                          } catch (e) {
                            reject(new Error(`解析第${i + 1}张出场图片响应失败`));
                          }
                        },
                        fail: (err) => {
                          formatAppLog("error", "at pages/logDetail/logDetail.vue:1981", `第${i + 1}张出场图片上传失败:`, err);
                          reject(err);
                        }
                      });
                    });
                    formatAppLog("log", "at pages/logDetail/logDetail.vue:1987", `第${i + 1}张出场图片上传成功`);
                  } catch (error) {
                    formatAppLog("error", "at pages/logDetail/logDetail.vue:1989", `第${i + 1}张出场图片上传失败:`, error);
                  }
                }
                formatAppLog("log", "at pages/logDetail/logDetail.vue:1994", "所有出场图片上传完成");
              }
            }
          } else {
            formatAppLog("log", "at pages/logDetail/logDetail.vue:2000", "无文件，使用普通请求");
            res2 = await new Promise((resolve2, reject) => {
              uni.request({
                url,
                method: "POST",
                data,
                header: {
                  // 使用表单格式，完全参考 saveLog 接口
                  "Content-Type": "application/x-www-form-urlencoded",
                  "Authorization": userStore.userInfo.authorization ? `Bearer ${userStore.userInfo.authorization}` : ""
                },
                success: (res3) => {
                  var _a2, _b;
                  formatAppLog("log", "at pages/logDetail/logDetail.vue:2015", "请求结果:", res3);
                  if (res3.statusCode === 200 && (res3.data.code === 200 || res3.data.code === "200")) {
                    resolve2(res3.data);
                  } else {
                    formatAppLog("error", "at pages/logDetail/logDetail.vue:2020", "请求失败:", res3.data);
                    reject(new Error(((_a2 = res3.data) == null ? void 0 : _a2.msg) || ((_b = res3.data) == null ? void 0 : _b.message) || "请求失败"));
                  }
                },
                fail: (err) => {
                  formatAppLog("error", "at pages/logDetail/logDetail.vue:2025", "请求失败:", err);
                  reject(err);
                }
              });
            });
          }
          uni.hideLoading();
          formatAppLog("log", "at pages/logDetail/logDetail.vue:2034", "保存平仓记录响应:", res2);
          if (res2.code === 200 || res2.code === "200") {
            uni.showToast({
              title: isEditOutLogMode.value ? "平仓记录更新成功" : "平仓记录添加成功",
              icon: "success"
            });
            closeOutLogModal();
            constantsStore.needRefreshGoods = Math.random();
            await Promise.all([fetchOutLogs(logForm.id), fetchLogs(), fetchProfitData()]);
          } else {
            uni.showToast({
              title: res2.message || (isEditOutLogMode.value ? "平仓记录更新失败" : "平仓记录添加失败"),
              icon: "none"
            });
          }
        } catch (error) {
          uni.hideLoading();
          formatAppLog("error", "at pages/logDetail/logDetail.vue:2054", "保存平仓记录异常:", error);
          uni.showToast({
            title: "平仓记录添加失败",
            icon: "none"
          });
        }
      };
      onLoad((options) => {
        formatAppLog("log", "at pages/logDetail/logDetail.vue:2064", "页面参数:", options);
        goodsInfo.id = options.goodsId || "";
        goodsInfo.name = decodeURIComponent(options.goodsName || "");
        goodsInfo.code = decodeURIComponent(options.goodsCode || "");
        formatAppLog("log", "at pages/logDetail/logDetail.vue:2071", "解析后的商品信息:", goodsInfo);
        uni.setNavigationBarTitle({
          title: goodsInfo.name || "交易日志"
        });
      });
      vue.onMounted(() => {
        userStore.initUserInfo();
        Promise.all([fetchProfitData(), fetchLogs()]);
      });
      const handleOutCountBlur = (e) => {
        const inputValue = outLogForm.count;
        const maxCount = parseInt(logForm.count) - totalOutCount.value;
        formatAppLog("log", "at pages/logDetail/logDetail.vue:2094", "失焦检查 - 当前值:", inputValue, "最大值:", maxCount);
        if (!inputValue || inputValue === "") {
          return;
        }
        const countValue = parseInt(inputValue);
        if (isNaN(countValue) || countValue <= 0) {
          outLogForm.count = "";
          return;
        }
        if (countValue > maxCount && maxCount > 0) {
          formatAppLog("log", "at pages/logDetail/logDetail.vue:2112", "失焦时超过最大值，强制设置为:", maxCount);
          outLogForm.count = maxCount.toString();
          vue.nextTick(() => {
            uni.showToast({
              title: `已自动调整为最大可平仓手数${maxCount}手`,
              icon: "none",
              duration: 2e3
            });
          });
        }
      };
      vue.watch(() => outLogForm.count, (newValue) => {
        if (!newValue || newValue === "")
          return;
        const maxCount = parseInt(logForm.count) - totalOutCount.value;
        const countValue = parseInt(newValue);
        formatAppLog("log", "at pages/logDetail/logDetail.vue:2133", "实时监听 - 新值:", newValue, "最大值:", maxCount);
        if (countValue > maxCount && maxCount > 0) {
          setTimeout(() => {
            if (parseInt(outLogForm.count) > maxCount) {
              formatAppLog("log", "at pages/logDetail/logDetail.vue:2140", "实时检测超过最大值，调整为:", maxCount);
              outLogForm.count = maxCount.toString();
              uni.showToast({
                title: `最多只能平仓${maxCount}手`,
                icon: "none",
                duration: 1500
              });
            }
          }, 500);
        }
      }, { immediate: false });
      const editOutLog = (outLog) => {
        formatAppLog("log", "at pages/logDetail/logDetail.vue:2154", "编辑出场记录:", outLog);
        isEditOutLogMode.value = true;
        outLogForm.id = outLog.id;
        outLogForm.tradeLogId = outLog.tradeLogId;
        outLogForm.count = outLog.count.toString();
        outLogForm.outPrice = outLog.outPrice ? outLog.outPrice.toString() : "";
        outLogForm.outDesc = outLog.outDesc || "";
        if (outLog.outImgs) {
          try {
            const parsedImgs = JSON.parse(outLog.outImgs);
            if (Array.isArray(parsedImgs)) {
              outLogForm.existingImgs = parsedImgs.map((url, index) => ({
                url,
                path: url,
                name: `existingOutImg_${outLog.id}_${index}.jpg`,
                isExisting: true
              }));
            } else {
              outLogForm.existingImgs = [];
            }
          } catch (e) {
            formatAppLog("error", "at pages/logDetail/logDetail.vue:2181", "解析出场图片失败:", e);
            outLogForm.existingImgs = [];
          }
        } else {
          outLogForm.existingImgs = [];
        }
        outLogForm.addOutImgs = [];
        showOutLogModal.value = true;
      };
      const viewLogDetail = (log) => {
        formatAppLog("log", "at pages/logDetail/logDetail.vue:2197", "查看日志详情:", log);
        viewingLog.value = { ...log };
        fetchOutLogs(log.id);
        showLogDetailModal.value = true;
      };
      const closeLogDetailModal = () => {
        logDetailModalClosing.value = true;
        setTimeout(() => {
          showLogDetailModal.value = false;
          logDetailModalClosing.value = false;
          viewingLog.value = null;
        }, 300);
      };
      const parseInImages = (imgUrls) => {
        if (!imgUrls)
          return [];
        if (Array.isArray(imgUrls)) {
          return imgUrls;
        }
        if (typeof imgUrls === "string") {
          try {
            const parsedImgs = JSON.parse(imgUrls);
            if (Array.isArray(parsedImgs)) {
              return parsedImgs;
            }
          } catch (e) {
            formatAppLog("error", "at pages/logDetail/logDetail.vue:2236", "解析入场图片URL失败:", e);
            const urlRegex = /https?:\/\/[^\s"',\]]+/g;
            const urls = imgUrls.match(urlRegex) || [];
            return urls.map((url) => url.replace(/[,\]"']+$/, ""));
          }
        }
        return [];
      };
      const getLogOutRecords = async (logId) => {
        try {
          const res2 = await tradeApi.queryOutLog(logId);
          if (res2.code === 200 || res2.code === "200") {
            return res2.data || [];
          }
        } catch (error) {
          formatAppLog("error", "at pages/logDetail/logDetail.vue:2255", "获取出场记录失败:", error);
        }
        return [];
      };
      const getUnClosedCount = (log, outRecords = []) => {
        const totalCount = log.count || 0;
        const outCount = outRecords.reduce((sum, record) => sum + (record.count || 0), 0);
        return totalCount - outCount;
      };
      const getHoldingTime = (log, outRecords = []) => {
        let createTime;
        if (typeof log.createTime === "number") {
          createTime = new Date(log.createTime);
        } else if (typeof log.createTime === "string") {
          createTime = new Date(log.createTime);
        } else {
          createTime = new Date(log.createTime);
        }
        const unClosedCount = getUnClosedCount(log, outRecords);
        formatAppLog("log", "at pages/logDetail/logDetail.vue:2281", `[持仓时间计算] 日志ID: ${log.id}, 入场时间: ${log.createTime} -> ${createTime}, 未平手数: ${unClosedCount}`);
        let endTime;
        if (unClosedCount > 0 || outRecords.length === 0) {
          endTime = /* @__PURE__ */ new Date();
          formatAppLog("log", "at pages/logDetail/logDetail.vue:2287", `[持仓时间计算] 使用当前时间: ${endTime}`);
        } else {
          const validOutTimes = [];
          outRecords.forEach((record, index) => {
            let outTime;
            if (typeof record.createTime === "number") {
              outTime = new Date(record.createTime);
            } else if (typeof record.createTime === "string") {
              outTime = new Date(record.createTime);
            } else {
              outTime = new Date(record.createTime);
            }
            formatAppLog("log", "at pages/logDetail/logDetail.vue:2302", `[持仓时间计算] 出场记录${index + 1}: ${record.createTime} -> ${outTime}`);
            if (!isNaN(outTime.getTime())) {
              validOutTimes.push(outTime.getTime());
            }
          });
          if (validOutTimes.length > 0) {
            const latestOutTime = Math.max(...validOutTimes);
            endTime = new Date(latestOutTime);
            formatAppLog("log", "at pages/logDetail/logDetail.vue:2312", `[持仓时间计算] 使用最晚平仓时间: ${endTime}`);
          } else {
            endTime = /* @__PURE__ */ new Date();
            formatAppLog("log", "at pages/logDetail/logDetail.vue:2316", `[持仓时间计算] 无有效出场时间，使用当前时间: ${endTime}`);
          }
        }
        const diffMs = endTime.getTime() - createTime.getTime();
        if (diffMs < 0) {
          formatAppLog("warn", "at pages/logDetail/logDetail.vue:2324", `[持仓时间计算] 时间差为负数: ${diffMs}ms，使用绝对值`);
          const absDiffMs = Math.abs(diffMs);
          const diffHours2 = Math.floor(absDiffMs / (1e3 * 60 * 60));
          const diffMinutes2 = Math.floor(absDiffMs % (1e3 * 60 * 60) / (1e3 * 60));
          return {
            hours: diffHours2,
            minutes: diffMinutes2,
            isOpen: unClosedCount > 0
          };
        }
        const diffHours = Math.floor(diffMs / (1e3 * 60 * 60));
        const diffMinutes = Math.floor(diffMs % (1e3 * 60 * 60) / (1e3 * 60));
        formatAppLog("log", "at pages/logDetail/logDetail.vue:2340", `[持仓时间计算] 时间差: ${diffMs}ms -> ${diffHours}h${diffMinutes}m`);
        return {
          hours: diffHours,
          minutes: diffMinutes,
          isOpen: unClosedCount > 0
          // 是否还有未平仓
        };
      };
      const formatHoldingTime = (timeInfo) => {
        return `${timeInfo.hours}h${timeInfo.minutes}m`;
      };
      const logOutRecordsCache = vue.ref(/* @__PURE__ */ new Map());
      const logSummaries = vue.ref(/* @__PURE__ */ new Map());
      const getLogSummary = async (log) => {
        let outRecords = logOutRecordsCache.value.get(log.id);
        if (!outRecords) {
          outRecords = await getLogOutRecords(log.id);
          logOutRecordsCache.value.set(log.id, outRecords);
        }
        const unClosedCount = getUnClosedCount(log, outRecords);
        const holdingTime = getHoldingTime(log, outRecords);
        return {
          entryPrice: log.inPrice || 0,
          totalCount: log.count || 0,
          unClosedCount,
          holdingTime: formatHoldingTime(holdingTime),
          isOpen: holdingTime.isOpen
        };
      };
      const __returned__ = { userStore, constantsStore, goodsInfo, logsList, refresherTriggered, totalProfit, showLogModal, logModalClosing, isEditMode, showOutLogModal, outLogModalClosing, logForm, outLogForm, isEditOutLogMode, showLogDetailModal, logDetailModalClosing, viewingLog, outLogsList, isLoadingOutLogs, totalOutCount, canAddOutLog, swipeStates, touchStartX, touchStartY, currentSwipeLogId, currentBackgroundImage, formattedProfit, goBack, addLog: addLog2, showAddLogModal, closeLogModal, chooseInImages, removeInImage, removeExistingImage, removeNewImage, canSaveLog, createFileFromPath, saveLog, fetchProfitData, fetchLogs, loadAllLogSummaries, fetchOutLogs, handleRefresh, formatDate, formatProfit, getProfitClass, formatBalance, getBalanceClass, formatWinRate, handleTouchStart, handleTouchMove, handleTouchEnd, resetSwipeState, resetAllSwipeStates, confirmDeleteLog, confirmDeleteOutLog, deleteLog, deleteOutLog, editLog, handleImageLoad, handleImageError, previewImage, getAllImageUrls, parseOutImages, previewOutImage, showAddOutLogModal, closeOutLogModal, canSaveOutLog, chooseOutImages, removeExistingOutImage, removeNewOutImage, getAllOutImageUrls, saveOutLog, handleOutCountBlur, editOutLog, viewLogDetail, closeLogDetailModal, parseInImages, getLogOutRecords, getUnClosedCount, getHoldingTime, formatHoldingTime, logOutRecordsCache, logSummaries, getLogSummary, ref: vue.ref, reactive: vue.reactive, computed: vue.computed, onMounted: vue.onMounted, watch: vue.watch, nextTick: vue.nextTick, get onLoad() {
        return onLoad;
      }, get tradeApi() {
        return tradeApi;
      }, get useUserStore() {
        return useUserStore;
      }, get useConstantsStore() {
        return useConstantsStore;
      }, get baseURL_() {
        return baseURL_;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock("view", { class: "log-detail-container" }, [
      vue.createCommentVNode(" 背景图片 "),
      $setup.currentBackgroundImage ? (vue.openBlock(), vue.createElementBlock("image", {
        key: 0,
        src: $setup.currentBackgroundImage,
        class: "background-image",
        mode: "aspectFill"
      }, null, 8, ["src"])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 导航栏 "),
      vue.createElementVNode("view", { class: "nav-header" }, [
        vue.createElementVNode("view", { class: "nav-left" }, [
          vue.createElementVNode("view", {
            class: "icon-wrapper",
            onClick: $setup.goBack
          }, [
            vue.createVNode(_component_uni_icons, {
              type: "back",
              size: "24",
              color: "#fff"
            })
          ])
        ]),
        vue.createElementVNode("view", { class: "nav-center" }, [
          vue.createElementVNode("text", { class: "profit-text" }, [
            vue.createTextVNode(
              vue.toDisplayString($setup.goodsInfo.code) + " 盈亏: ",
              1
              /* TEXT */
            ),
            vue.createElementVNode(
              "text",
              {
                class: vue.normalizeClass(["profit-number", { "profit-positive": $setup.totalProfit > 0, "profit-negative": $setup.totalProfit < 0 }])
              },
              vue.toDisplayString($setup.formattedProfit),
              3
              /* TEXT, CLASS */
            )
          ])
        ]),
        vue.createElementVNode("view", { class: "nav-right" }, [
          vue.createCommentVNode(" 去掉右上角的添加图标 ")
        ])
      ]),
      vue.createCommentVNode(" 主要内容 "),
      vue.createElementVNode("view", { class: "log-content" }, [
        vue.createCommentVNode(" 日志列表 "),
        vue.createElementVNode("scroll-view", {
          class: "logs-list",
          "scroll-y": "true",
          "refresher-enabled": "true",
          "refresher-background": "transparent",
          "refresher-triggered": $setup.refresherTriggered,
          onRefresherrefresh: $setup.handleRefresh
        }, [
          $setup.logsList.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "logs-container"
          }, [
            vue.createCommentVNode(" 日志项 "),
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.logsList, (log, index) => {
                var _a2, _b;
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: "log-swipe-container",
                  key: log.id
                }, [
                  vue.createElementVNode("view", { class: "log-swipe-wrapper" }, [
                    vue.createElementVNode("view", {
                      class: "log-item",
                      style: vue.normalizeStyle({ transform: `translateX(${((_a2 = $setup.swipeStates[log.id]) == null ? void 0 : _a2.translateX) || 0}rpx)` }),
                      onTouchstart: ($event) => $setup.handleTouchStart($event, log.id),
                      onTouchmove: ($event) => $setup.handleTouchMove($event, log.id),
                      onTouchend: ($event) => $setup.handleTouchEnd($event, log.id),
                      onClick: ($event) => $setup.viewLogDetail(log)
                    }, [
                      vue.createElementVNode("view", { class: "log-row" }, [
                        vue.createElementVNode("view", { class: "log-date-col" }, [
                          vue.createElementVNode(
                            "text",
                            { class: "log-date" },
                            vue.toDisplayString($setup.formatDate(log.createTime)),
                            1
                            /* TEXT */
                          )
                        ]),
                        vue.createElementVNode("view", { class: "log-info-col" }, [
                          $setup.logSummaries.get(log.id) ? (vue.openBlock(), vue.createElementBlock("view", {
                            key: 0,
                            class: "log-summary"
                          }, [
                            vue.createElementVNode("view", { class: "summary-row" }, [
                              vue.createElementVNode(
                                "text",
                                { class: "summary-item" },
                                "开仓: $" + vue.toDisplayString($setup.logSummaries.get(log.id).entryPrice),
                                1
                                /* TEXT */
                              ),
                              vue.createElementVNode(
                                "text",
                                { class: "summary-item" },
                                "手数: " + vue.toDisplayString($setup.logSummaries.get(log.id).totalCount),
                                1
                                /* TEXT */
                              ),
                              vue.createElementVNode(
                                "text",
                                {
                                  class: vue.normalizeClass(["direction-tag", log.isRise ? "direction-long" : "direction-short"])
                                },
                                vue.toDisplayString(log.isRise ? "多" : "空"),
                                3
                                /* TEXT, CLASS */
                              )
                            ]),
                            vue.createElementVNode("view", { class: "summary-row" }, [
                              vue.createElementVNode(
                                "text",
                                {
                                  class: vue.normalizeClass(["summary-item", { "unclosed-text": $setup.logSummaries.get(log.id).isOpen }])
                                },
                                " 未平: " + vue.toDisplayString($setup.logSummaries.get(log.id).unClosedCount) + "手 ",
                                3
                                /* TEXT, CLASS */
                              ),
                              vue.createElementVNode(
                                "text",
                                {
                                  class: vue.normalizeClass(["summary-item", { "holding-open": $setup.logSummaries.get(log.id).isOpen }])
                                },
                                " 持仓: " + vue.toDisplayString($setup.logSummaries.get(log.id).holdingTime),
                                3
                                /* TEXT, CLASS */
                              )
                            ])
                          ])) : (vue.openBlock(), vue.createElementBlock("view", {
                            key: 1,
                            class: "log-summary loading"
                          }, [
                            vue.createElementVNode("text", { class: "loading-text" }, "加载中...")
                          ]))
                        ]),
                        vue.createElementVNode("view", { class: "log-profit-col" }, [
                          vue.createElementVNode(
                            "text",
                            {
                              class: vue.normalizeClass(["log-profit", $setup.getProfitClass(log.profit)])
                            },
                            vue.toDisplayString($setup.formatProfit(log.profit)),
                            3
                            /* TEXT, CLASS */
                          )
                        ]),
                        vue.createElementVNode("view", {
                          class: "edit-icon",
                          onClick: vue.withModifiers(($event) => $setup.editLog(log), ["stop"])
                        }, [
                          vue.createVNode(_component_uni_icons, {
                            type: "compose",
                            size: "22",
                            color: "#667eea"
                          })
                        ], 8, ["onClick"])
                      ])
                    ], 44, ["onTouchstart", "onTouchmove", "onTouchend", "onClick"]),
                    ((_b = $setup.swipeStates[log.id]) == null ? void 0 : _b.showDelete) ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 0,
                      class: "delete-action",
                      onClick: ($event) => $setup.confirmDeleteLog(log)
                    }, [
                      vue.createVNode(_component_uni_icons, {
                        type: "trash",
                        size: "24",
                        color: "#fff"
                      })
                    ], 8, ["onClick"])) : vue.createCommentVNode("v-if", true)
                  ])
                ]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])) : (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            { key: 1 },
            [
              vue.createCommentVNode(" 空状态 "),
              vue.createElementVNode("view", { class: "empty-state" }, [
                vue.createElementVNode("text", { class: "empty-text" }, "暂无交易记录"),
                vue.createElementVNode("text", { class: "empty-tips" }, '点击下方按钮"+"添加交易记录')
              ])
            ],
            2112
            /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
          ))
        ], 40, ["refresher-triggered"])
      ]),
      vue.createCommentVNode(" 添加交易日志按钮 "),
      vue.createElementVNode("view", { class: "add-log-container" }, [
        vue.createElementVNode("view", {
          class: "add-log-btn",
          onClick: $setup.showAddLogModal
        }, [
          vue.createVNode(_component_uni_icons, {
            type: "plus",
            size: "20",
            color: "#fff"
          }),
          vue.createElementVNode("text", { class: "add-btn-text" }, "添加交易记录")
        ])
      ]),
      vue.createCommentVNode(" 添加交易日志弹窗 "),
      $setup.showLogModal ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "modal-overlay",
        onClick: $setup.closeLogModal
      }, [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["modal-content log-modal", { "closing": $setup.logModalClosing }]),
            onClick: _cache[5] || (_cache[5] = vue.withModifiers(() => {
            }, ["stop"]))
          },
          [
            vue.createElementVNode("view", { class: "popup-header" }, [
              vue.createElementVNode(
                "text",
                { class: "popup-title" },
                vue.toDisplayString($setup.isEditMode ? "编辑交易日志" : "添加交易日志"),
                1
                /* TEXT */
              ),
              vue.createElementVNode("view", {
                class: "popup-close",
                onClick: $setup.closeLogModal
              }, [
                vue.createVNode(_component_uni_icons, {
                  type: "close",
                  size: "20",
                  color: "#666"
                })
              ])
            ]),
            vue.createElementVNode("scroll-view", {
              class: "form-content",
              "scroll-y": "true"
            }, [
              vue.createCommentVNode(" 入场描述 "),
              vue.createElementVNode("view", { class: "input-group" }, [
                vue.createElementVNode("view", { class: "input-label" }, [
                  vue.createElementVNode("text", { class: "required" }, "*"),
                  vue.createTextVNode("入场描述 ")
                ]),
                vue.withDirectives(vue.createElementVNode(
                  "textarea",
                  {
                    class: "log-textarea",
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.logForm.inDesc = $event),
                    placeholder: "请输入入场描述",
                    maxlength: "500",
                    "auto-height": ""
                  },
                  null,
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vModelText, $setup.logForm.inDesc]
                ])
              ]),
              vue.createCommentVNode(" 入场价格 "),
              vue.createElementVNode("view", { class: "input-group" }, [
                vue.createElementVNode("view", { class: "input-label" }, [
                  vue.createElementVNode("text", { class: "required" }, "*"),
                  vue.createTextVNode("入场价格 ")
                ]),
                vue.withDirectives(vue.createElementVNode(
                  "input",
                  {
                    class: "log-input",
                    type: "digit",
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.logForm.inPrice = $event),
                    placeholder: "请输入入场价格"
                  },
                  null,
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vModelText, $setup.logForm.inPrice]
                ])
              ]),
              vue.createCommentVNode(" 交易方向 "),
              vue.createElementVNode("view", { class: "input-group" }, [
                vue.createElementVNode("view", { class: "input-label" }, [
                  vue.createElementVNode("text", { class: "required" }, "*"),
                  vue.createTextVNode("交易方向 ")
                ]),
                vue.createElementVNode("view", { class: "radio-group" }, [
                  vue.createElementVNode("view", {
                    class: "radio-item",
                    onClick: _cache[2] || (_cache[2] = ($event) => $setup.logForm.isRise = true)
                  }, [
                    vue.createElementVNode(
                      "view",
                      {
                        class: vue.normalizeClass(["radio", { "checked": $setup.logForm.isRise === true }])
                      },
                      [
                        $setup.logForm.isRise === true ? (vue.openBlock(), vue.createElementBlock("view", {
                          key: 0,
                          class: "radio-inner"
                        })) : vue.createCommentVNode("v-if", true)
                      ],
                      2
                      /* CLASS */
                    ),
                    vue.createElementVNode("text", { class: "radio-text" }, "做多(看涨)")
                  ]),
                  vue.createElementVNode("view", {
                    class: "radio-item",
                    onClick: _cache[3] || (_cache[3] = ($event) => $setup.logForm.isRise = false)
                  }, [
                    vue.createElementVNode(
                      "view",
                      {
                        class: vue.normalizeClass(["radio", { "checked": $setup.logForm.isRise === false }])
                      },
                      [
                        $setup.logForm.isRise === false ? (vue.openBlock(), vue.createElementBlock("view", {
                          key: 0,
                          class: "radio-inner"
                        })) : vue.createCommentVNode("v-if", true)
                      ],
                      2
                      /* CLASS */
                    ),
                    vue.createElementVNode("text", { class: "radio-text" }, "做空(看跌)")
                  ])
                ])
              ]),
              vue.createCommentVNode(" 手数 "),
              vue.createElementVNode("view", { class: "input-group" }, [
                vue.createElementVNode("view", { class: "input-label" }, [
                  vue.createElementVNode("text", { class: "required" }, "*"),
                  vue.createTextVNode("手数 ")
                ]),
                vue.withDirectives(vue.createElementVNode(
                  "input",
                  {
                    class: "log-input",
                    type: "digit",
                    "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.logForm.count = $event),
                    placeholder: "请输入手数"
                  },
                  null,
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vModelText, $setup.logForm.count]
                ])
              ]),
              vue.createCommentVNode(" 入场图片 "),
              vue.createElementVNode("view", { class: "input-group" }, [
                vue.createElementVNode("view", { class: "input-label" }, "入场依据"),
                vue.createElementVNode("view", { class: "image-upload" }, [
                  vue.createCommentVNode(" 统一显示所有图片和上传按钮 "),
                  vue.createElementVNode("view", { class: "image-grid" }, [
                    vue.createCommentVNode(" 上传按钮 "),
                    vue.createElementVNode("view", {
                      class: "upload-btn",
                      onClick: $setup.chooseInImages
                    }, [
                      vue.createVNode(_component_uni_icons, {
                        type: "plus",
                        size: "30",
                        color: "#667eea"
                      })
                    ]),
                    vue.createCommentVNode(" 已有图片 "),
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList($setup.logForm.existingImgs, (img, index) => {
                        return vue.openBlock(), vue.createElementBlock("view", {
                          class: "image-item",
                          key: "existing-" + index
                        }, [
                          vue.createElementVNode("image", {
                            src: img.url,
                            class: "preview-image",
                            mode: "aspectFill",
                            onClick: ($event) => $setup.previewImage(img.url, $setup.getAllImageUrls()),
                            onError: ($event) => $setup.handleImageError(img.url, index),
                            onLoad: ($event) => $setup.handleImageLoad(img.url, index)
                          }, null, 40, ["src", "onClick", "onError", "onLoad"]),
                          vue.createElementVNode("view", {
                            class: "delete-image",
                            onClick: vue.withModifiers(($event) => $setup.removeExistingImage(index), ["stop"])
                          }, [
                            vue.createVNode(_component_uni_icons, {
                              type: "close",
                              size: "16",
                              color: "#fff"
                            })
                          ], 8, ["onClick"])
                        ]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    )),
                    vue.createCommentVNode(" 新增图片 "),
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList($setup.logForm.addInImgs, (img, index) => {
                        return vue.openBlock(), vue.createElementBlock("view", {
                          class: "image-item",
                          key: "new-" + index
                        }, [
                          vue.createElementVNode("image", {
                            src: img.url,
                            class: "preview-image",
                            mode: "aspectFill",
                            onClick: ($event) => $setup.previewImage(img.url, $setup.getAllImageUrls())
                          }, null, 8, ["src", "onClick"]),
                          vue.createElementVNode("view", {
                            class: "delete-image",
                            onClick: vue.withModifiers(($event) => $setup.removeNewImage(index), ["stop"])
                          }, [
                            vue.createVNode(_component_uni_icons, {
                              type: "close",
                              size: "16",
                              color: "#fff"
                            })
                          ], 8, ["onClick"])
                        ]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ])
                ])
              ]),
              vue.createCommentVNode(" 出场记录列表 "),
              $setup.isEditMode && $setup.outLogsList.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "out-logs-section"
              }, [
                vue.createElementVNode("view", { class: "section-title" }, "平仓记录"),
                vue.createElementVNode("view", { class: "out-logs-list" }, [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList($setup.outLogsList, (outLog, index) => {
                      return vue.openBlock(), vue.createElementBlock("view", {
                        class: "out-log-item",
                        key: outLog.id
                      }, [
                        vue.createElementVNode("view", { class: "out-log-header" }, [
                          vue.createElementVNode(
                            "text",
                            { class: "out-log-date" },
                            vue.toDisplayString($setup.formatDate(outLog.createTime)),
                            1
                            /* TEXT */
                          ),
                          vue.createElementVNode("view", { class: "out-log-right" }, [
                            vue.createElementVNode(
                              "text",
                              {
                                class: vue.normalizeClass(["out-log-profit", $setup.getProfitClass(outLog.profit)])
                              },
                              vue.toDisplayString($setup.formatProfit(outLog.profit)),
                              3
                              /* TEXT, CLASS */
                            ),
                            vue.createElementVNode("view", {
                              class: "out-edit-icon",
                              onClick: vue.withModifiers(($event) => $setup.editOutLog(outLog), ["stop"])
                            }, [
                              vue.createVNode(_component_uni_icons, {
                                type: "compose",
                                size: "20",
                                color: "#667eea"
                              })
                            ], 8, ["onClick"]),
                            vue.createElementVNode("view", {
                              class: "out-delete-icon",
                              onClick: vue.withModifiers(($event) => $setup.confirmDeleteOutLog(outLog), ["stop"])
                            }, [
                              vue.createVNode(_component_uni_icons, {
                                type: "trash",
                                size: "20",
                                color: "#f56c6c"
                              })
                            ], 8, ["onClick"])
                          ])
                        ]),
                        vue.createElementVNode("view", { class: "out-log-content" }, [
                          vue.createElementVNode("view", { class: "out-log-info" }, [
                            vue.createElementVNode(
                              "text",
                              { class: "out-count" },
                              "手数: " + vue.toDisplayString(outLog.count),
                              1
                              /* TEXT */
                            )
                          ]),
                          outLog.outDesc ? (vue.openBlock(), vue.createElementBlock("view", {
                            key: 0,
                            class: "out-log-desc"
                          }, [
                            vue.createElementVNode(
                              "text",
                              { class: "desc-text" },
                              vue.toDisplayString(outLog.outDesc),
                              1
                              /* TEXT */
                            )
                          ])) : vue.createCommentVNode("v-if", true),
                          vue.createCommentVNode(" 出场图片 "),
                          outLog.outImgs ? (vue.openBlock(), vue.createElementBlock("view", {
                            key: 1,
                            class: "out-log-images"
                          }, [
                            vue.createElementVNode("view", { class: "out-images-grid" }, [
                              (vue.openBlock(true), vue.createElementBlock(
                                vue.Fragment,
                                null,
                                vue.renderList($setup.parseOutImages(outLog.outImgs), (imgUrl, imgIndex) => {
                                  return vue.openBlock(), vue.createElementBlock("view", {
                                    class: "out-image-item",
                                    key: imgIndex
                                  }, [
                                    vue.createElementVNode("image", {
                                      src: imgUrl,
                                      class: "out-preview-image",
                                      mode: "aspectFill",
                                      onClick: ($event) => $setup.previewOutImage(imgUrl, $setup.parseOutImages(outLog.outImgs))
                                    }, null, 8, ["src", "onClick"])
                                  ]);
                                }),
                                128
                                /* KEYED_FRAGMENT */
                              ))
                            ])
                          ])) : vue.createCommentVNode("v-if", true)
                        ])
                      ]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])
              ])) : vue.createCommentVNode("v-if", true),
              vue.createCommentVNode(" 新增平仓记录按钮区域 - 独立显示 "),
              $setup.canAddOutLog ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "add-out-log-section"
              }, [
                vue.createElementVNode("view", { class: "add-out-log-item" }, [
                  vue.createElementVNode("view", { class: "add-out-content" }, [
                    vue.createElementVNode("view", { class: "remaining-info" }, [
                      vue.createElementVNode("text", { class: "remaining-label" }, "剩余未平仓:"),
                      vue.createElementVNode(
                        "text",
                        { class: "remaining-count" },
                        vue.toDisplayString(parseInt($setup.logForm.count) - $setup.totalOutCount) + " 手",
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("button", {
                      class: "inline-add-btn",
                      onClick: $setup.showAddOutLogModal
                    }, [
                      vue.createElementVNode("text", { class: "btn-text" }, "新增平仓")
                    ])
                  ])
                ])
              ])) : vue.createCommentVNode("v-if", true)
            ]),
            vue.createElementVNode("view", { class: "popup-actions" }, [
              vue.createElementVNode("button", {
                class: "cancel-btn",
                onClick: $setup.closeLogModal
              }, "取消"),
              vue.createElementVNode("button", {
                class: "confirm-btn",
                onClick: $setup.saveLog,
                disabled: !$setup.canSaveLog
              }, vue.toDisplayString($setup.isEditMode ? "更新" : "保存"), 9, ["disabled"])
            ])
          ],
          2
          /* CLASS */
        )
      ])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 新增平仓记录弹窗 "),
      $setup.showOutLogModal ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 2,
        class: "modal-overlay",
        onClick: $setup.closeOutLogModal
      }, [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["modal-content out-log-modal", { "closing": $setup.outLogModalClosing }]),
            onClick: _cache[9] || (_cache[9] = vue.withModifiers(() => {
            }, ["stop"]))
          },
          [
            vue.createElementVNode("view", { class: "popup-header" }, [
              vue.createElementVNode(
                "text",
                { class: "popup-title" },
                vue.toDisplayString($setup.isEditOutLogMode ? "编辑平仓记录" : "新增平仓记录"),
                1
                /* TEXT */
              ),
              vue.createElementVNode("view", {
                class: "popup-close",
                onClick: $setup.closeOutLogModal
              }, [
                vue.createVNode(_component_uni_icons, {
                  type: "close",
                  size: "20",
                  color: "#666"
                })
              ])
            ]),
            vue.createElementVNode("scroll-view", {
              class: "form-content",
              "scroll-y": "true"
            }, [
              vue.createCommentVNode(" 平仓手数 "),
              vue.createElementVNode("view", { class: "input-group" }, [
                vue.createElementVNode("view", { class: "input-label" }, [
                  vue.createElementVNode("text", { class: "required" }, "*"),
                  vue.createTextVNode("平仓手数 ")
                ]),
                vue.withDirectives(vue.createElementVNode("input", {
                  class: "log-input",
                  type: "digit",
                  "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $setup.outLogForm.count = $event),
                  onBlur: $setup.handleOutCountBlur,
                  placeholder: `最多可平仓 ${parseInt($setup.logForm.count) - $setup.totalOutCount} 手`
                }, null, 40, ["placeholder"]), [
                  [vue.vModelText, $setup.outLogForm.count]
                ]),
                vue.createElementVNode("view", { class: "input-hint" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "hint-text" },
                    "剩余未平仓: " + vue.toDisplayString(parseInt($setup.logForm.count) - $setup.totalOutCount) + " 手",
                    1
                    /* TEXT */
                  )
                ])
              ]),
              vue.createCommentVNode(" 出场价格 "),
              vue.createElementVNode("view", { class: "input-group" }, [
                vue.createElementVNode("view", { class: "input-label" }, [
                  vue.createElementVNode("text", { class: "required" }, "*"),
                  vue.createTextVNode("出场价格 ")
                ]),
                vue.withDirectives(vue.createElementVNode(
                  "input",
                  {
                    class: "log-input",
                    type: "digit",
                    "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $setup.outLogForm.outPrice = $event),
                    placeholder: "请输入出场价格"
                  },
                  null,
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vModelText, $setup.outLogForm.outPrice]
                ])
              ]),
              vue.createCommentVNode(" 出场描述 "),
              vue.createElementVNode("view", { class: "input-group" }, [
                vue.createElementVNode("view", { class: "input-label" }, "出场描述"),
                vue.withDirectives(vue.createElementVNode(
                  "textarea",
                  {
                    class: "log-textarea",
                    "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $setup.outLogForm.outDesc = $event),
                    placeholder: "请输入出场描述（可选）",
                    maxlength: "500",
                    "auto-height": ""
                  },
                  null,
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vModelText, $setup.outLogForm.outDesc]
                ])
              ]),
              vue.createCommentVNode(" 出场图片 "),
              vue.createElementVNode("view", { class: "input-group" }, [
                vue.createElementVNode("view", { class: "input-label" }, "出场图片"),
                vue.createElementVNode("view", { class: "image-upload" }, [
                  vue.createCommentVNode(" 统一显示所有图片和上传按钮 "),
                  vue.createElementVNode("view", { class: "image-grid" }, [
                    vue.createCommentVNode(" 上传按钮 "),
                    vue.createElementVNode("view", {
                      class: "upload-btn",
                      onClick: $setup.chooseOutImages
                    }, [
                      vue.createVNode(_component_uni_icons, {
                        type: "plus",
                        size: "30",
                        color: "#667eea"
                      })
                    ]),
                    vue.createCommentVNode(" 已有图片 "),
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList($setup.outLogForm.existingImgs, (img, index) => {
                        return vue.openBlock(), vue.createElementBlock("view", {
                          class: "image-item",
                          key: "existing-" + index
                        }, [
                          vue.createElementVNode("image", {
                            src: img.url,
                            class: "preview-image",
                            mode: "aspectFill",
                            onClick: ($event) => $setup.previewImage(img.url, $setup.getAllOutImageUrls())
                          }, null, 8, ["src", "onClick"]),
                          vue.createElementVNode("view", {
                            class: "delete-image",
                            onClick: vue.withModifiers(($event) => $setup.removeExistingOutImage(index), ["stop"])
                          }, [
                            vue.createVNode(_component_uni_icons, {
                              type: "close",
                              size: "16",
                              color: "#fff"
                            })
                          ], 8, ["onClick"])
                        ]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    )),
                    vue.createCommentVNode(" 新增图片 "),
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList($setup.outLogForm.addOutImgs, (img, index) => {
                        return vue.openBlock(), vue.createElementBlock("view", {
                          class: "image-item",
                          key: "new-" + index
                        }, [
                          vue.createElementVNode("image", {
                            src: img.url,
                            class: "preview-image",
                            mode: "aspectFill",
                            onClick: ($event) => $setup.previewImage(img.url, $setup.getAllOutImageUrls())
                          }, null, 8, ["src", "onClick"]),
                          vue.createElementVNode("view", {
                            class: "delete-image",
                            onClick: vue.withModifiers(($event) => $setup.removeNewOutImage(index), ["stop"])
                          }, [
                            vue.createVNode(_component_uni_icons, {
                              type: "close",
                              size: "16",
                              color: "#fff"
                            })
                          ], 8, ["onClick"])
                        ]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ])
                ])
              ])
            ]),
            vue.createElementVNode("view", { class: "popup-actions" }, [
              vue.createElementVNode("button", {
                class: "cancel-btn",
                onClick: $setup.closeOutLogModal
              }, "取消"),
              vue.createElementVNode("button", {
                class: "confirm-btn",
                onClick: $setup.saveOutLog,
                disabled: !$setup.canSaveOutLog
              }, vue.toDisplayString($setup.isEditOutLogMode ? "更新" : "保存"), 9, ["disabled"])
            ])
          ],
          2
          /* CLASS */
        )
      ])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 日志详情查看弹窗 "),
      $setup.showLogDetailModal ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 3,
        class: "modal-overlay",
        onClick: $setup.closeLogDetailModal
      }, [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["modal-content log-detail-view-modal", { "closing": $setup.logDetailModalClosing }]),
            onClick: _cache[10] || (_cache[10] = vue.withModifiers(() => {
            }, ["stop"]))
          },
          [
            vue.createElementVNode("view", { class: "popup-header" }, [
              vue.createElementVNode("text", { class: "popup-title" }, "交易日志详情"),
              vue.createElementVNode("view", {
                class: "popup-close",
                onClick: $setup.closeLogDetailModal
              }, [
                vue.createVNode(_component_uni_icons, {
                  type: "close",
                  size: "20",
                  color: "#666"
                })
              ])
            ]),
            $setup.viewingLog ? (vue.openBlock(), vue.createElementBlock("scroll-view", {
              key: 0,
              class: "form-content",
              "scroll-y": "true"
            }, [
              vue.createCommentVNode(" 入场描述 "),
              vue.createElementVNode("view", { class: "input-group readonly" }, [
                vue.createElementVNode("view", { class: "input-label" }, "入场描述"),
                vue.createElementVNode(
                  "view",
                  { class: "readonly-content" },
                  vue.toDisplayString($setup.viewingLog.inDesc || "无"),
                  1
                  /* TEXT */
                )
              ]),
              vue.createCommentVNode(" 入场价格 "),
              vue.createElementVNode("view", { class: "input-group readonly" }, [
                vue.createElementVNode("view", { class: "input-label" }, "入场价格"),
                vue.createElementVNode(
                  "view",
                  { class: "readonly-content" },
                  "¥" + vue.toDisplayString($setup.viewingLog.inPrice),
                  1
                  /* TEXT */
                )
              ]),
              vue.createCommentVNode(" 交易方向 "),
              vue.createElementVNode("view", { class: "input-group readonly" }, [
                vue.createElementVNode("view", { class: "input-label" }, "交易方向"),
                vue.createElementVNode("view", { class: "readonly-content" }, [
                  vue.createElementVNode(
                    "view",
                    {
                      class: vue.normalizeClass(["direction-tag", $setup.viewingLog.isRise ? "rise" : "fall"])
                    },
                    vue.toDisplayString($setup.viewingLog.isRise ? "做多(看涨)" : "做空(看跌)"),
                    3
                    /* TEXT, CLASS */
                  )
                ])
              ]),
              vue.createCommentVNode(" 手数 "),
              vue.createElementVNode("view", { class: "input-group readonly" }, [
                vue.createElementVNode("view", { class: "input-label" }, "手数"),
                vue.createElementVNode(
                  "view",
                  { class: "readonly-content" },
                  vue.toDisplayString($setup.viewingLog.count) + "手",
                  1
                  /* TEXT */
                )
              ]),
              vue.createCommentVNode(" 创建时间 "),
              vue.createElementVNode("view", { class: "input-group readonly" }, [
                vue.createElementVNode("view", { class: "input-label" }, "创建时间"),
                vue.createElementVNode(
                  "view",
                  { class: "readonly-content" },
                  vue.toDisplayString($setup.formatDate($setup.viewingLog.createTime)),
                  1
                  /* TEXT */
                )
              ]),
              vue.createCommentVNode(" 总盈亏 "),
              vue.createElementVNode("view", { class: "input-group readonly" }, [
                vue.createElementVNode("view", { class: "input-label" }, "总盈亏"),
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(["readonly-content", $setup.getProfitClass($setup.viewingLog.profit)])
                  },
                  vue.toDisplayString($setup.formatProfit($setup.viewingLog.profit)),
                  3
                  /* TEXT, CLASS */
                )
              ]),
              vue.createCommentVNode(" 入场图片 "),
              $setup.viewingLog.inImgs ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "input-group readonly"
              }, [
                vue.createElementVNode("view", { class: "input-label" }, "入场图片"),
                vue.createElementVNode("view", { class: "readonly-images" }, [
                  vue.createElementVNode("view", { class: "image-grid" }, [
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList($setup.parseInImages($setup.viewingLog.inImgs), (imgUrl, imgIndex) => {
                        return vue.openBlock(), vue.createElementBlock("view", {
                          class: "image-item",
                          key: imgIndex
                        }, [
                          vue.createElementVNode("image", {
                            src: imgUrl,
                            class: "preview-image",
                            mode: "aspectFill",
                            onClick: ($event) => $setup.previewImage(imgUrl, $setup.parseInImages($setup.viewingLog.inImgs))
                          }, null, 8, ["src", "onClick"])
                        ]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ]),
                  $setup.parseInImages($setup.viewingLog.inImgs).length === 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "no-images-text"
                  }, " 无入场图片 ")) : vue.createCommentVNode("v-if", true)
                ])
              ])) : vue.createCommentVNode("v-if", true),
              vue.createCommentVNode(" 出场记录列表 "),
              $setup.outLogsList.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "out-logs-section readonly"
              }, [
                vue.createElementVNode("view", { class: "section-title" }, "出场记录"),
                vue.createElementVNode("view", { class: "out-logs-list" }, [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList($setup.outLogsList, (outLog, index) => {
                      return vue.openBlock(), vue.createElementBlock("view", {
                        class: "out-log-item readonly",
                        key: outLog.id
                      }, [
                        vue.createElementVNode("view", { class: "out-log-header" }, [
                          vue.createElementVNode(
                            "text",
                            { class: "out-log-date" },
                            vue.toDisplayString($setup.formatDate(outLog.createTime)),
                            1
                            /* TEXT */
                          ),
                          vue.createElementVNode(
                            "text",
                            {
                              class: vue.normalizeClass(["out-log-profit", $setup.getProfitClass(outLog.profit)])
                            },
                            vue.toDisplayString($setup.formatProfit(outLog.profit)),
                            3
                            /* TEXT, CLASS */
                          )
                        ]),
                        vue.createElementVNode("view", { class: "out-log-content" }, [
                          vue.createElementVNode("view", { class: "out-log-info" }, [
                            vue.createElementVNode(
                              "text",
                              { class: "out-count" },
                              "手数: " + vue.toDisplayString(outLog.count),
                              1
                              /* TEXT */
                            )
                          ]),
                          outLog.outDesc ? (vue.openBlock(), vue.createElementBlock("view", {
                            key: 0,
                            class: "out-log-desc"
                          }, [
                            vue.createElementVNode(
                              "text",
                              { class: "desc-text" },
                              vue.toDisplayString(outLog.outDesc),
                              1
                              /* TEXT */
                            )
                          ])) : vue.createCommentVNode("v-if", true),
                          vue.createCommentVNode(" 出场图片 "),
                          outLog.outImgs ? (vue.openBlock(), vue.createElementBlock("view", {
                            key: 1,
                            class: "out-log-images"
                          }, [
                            vue.createElementVNode("view", { class: "out-images-grid" }, [
                              (vue.openBlock(true), vue.createElementBlock(
                                vue.Fragment,
                                null,
                                vue.renderList($setup.parseOutImages(outLog.outImgs), (imgUrl, imgIndex) => {
                                  return vue.openBlock(), vue.createElementBlock("view", {
                                    class: "out-image-item",
                                    key: imgIndex
                                  }, [
                                    vue.createElementVNode("image", {
                                      src: imgUrl,
                                      class: "out-preview-image",
                                      mode: "aspectFill",
                                      onClick: ($event) => $setup.previewOutImage(imgUrl, $setup.parseOutImages(outLog.outImgs))
                                    }, null, 8, ["src", "onClick"])
                                  ]);
                                }),
                                128
                                /* KEYED_FRAGMENT */
                              ))
                            ])
                          ])) : vue.createCommentVNode("v-if", true)
                        ])
                      ]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])
              ])) : vue.createCommentVNode("v-if", true),
              vue.createCommentVNode(" 加载中状态 "),
              $setup.isLoadingOutLogs ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 2,
                class: "loading-section"
              }, [
                vue.createElementVNode("text", { class: "loading-text" }, "正在加载出场记录...")
              ])) : vue.createCommentVNode("v-if", true),
              vue.createCommentVNode(" 无出场记录提示 "),
              !$setup.isLoadingOutLogs && $setup.outLogsList.length === 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 3,
                class: "no-out-logs"
              }, [
                vue.createElementVNode("text", { class: "no-out-logs-text" }, "暂无出场记录")
              ])) : vue.createCommentVNode("v-if", true)
            ])) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode("view", { class: "popup-actions" }, [
              vue.createElementVNode("button", {
                class: "cancel-btn full-width",
                onClick: $setup.closeLogDetailModal
              }, "关闭")
            ])
          ],
          2
          /* CLASS */
        )
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const PagesLogDetailLogDetail = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__scopeId", "data-v-003a6ece"], ["__file", "C:/Users/Administrator/Documents/HBuilderProjects/todoPlus/pages/logDetail/logDetail.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/home/home", PagesHomeHome);
  __definePage("pages/register/register", PagesRegisterRegister);
  __definePage("pages/changePassword/changePassword", PagesChangePasswordChangePassword);
  __definePage("pages/statistics/statistics", PagesStatisticsStatistics);
  __definePage("pages/account/account", PagesAccountAccount);
  __definePage("pages/test/test", PagesTestTest);
  __definePage("pages/template/template", PagesTemplateTemplate);
  __definePage("pages/like/like", PagesLikeLike);
  __definePage("pages/charts/charts", PagesChartsCharts);
  __definePage("pages/milestore/milestore", PagesMilestoreMilestore);
  __definePage("pages/chat/chat", PagesChatChat);
  __definePage("pages/testVoice/testVoice", PagesTestVoiceTestVoice);
  __definePage("pages/aiRole/aiRole", PagesAiRoleAiRole);
  __definePage("pages/aiSetting/aiSetting", PagesAiSettingAiSetting);
  __definePage("pages/trade/trade", PagesTradeTrade);
  __definePage("pages/logDetail/logDetail", PagesLogDetailLogDetail);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "C:/Users/Administrator/Documents/HBuilderProjects/todoPlus/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    app.use(createPinia());
    return {
      app,
      Pinia
      // 此处必须将 Pinia 返回
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
