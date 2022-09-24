"use weex:vue";

if (typeof Promise !== 'undefined' && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor
    return this.then(
      value => promise.resolve(callback()).then(() => value),
      reason => promise.resolve(callback()).then(() => {
        throw reason
      })
    )
  }
};

if (typeof uni !== 'undefined' && uni && uni.requireGlobal) {
  const global = uni.requireGlobal()
  ArrayBuffer = global.ArrayBuffer
  Int8Array = global.Int8Array
  Uint8Array = global.Uint8Array
  Uint8ClampedArray = global.Uint8ClampedArray
  Int16Array = global.Int16Array
  Uint16Array = global.Uint16Array
  Int32Array = global.Int32Array
  Uint32Array = global.Uint32Array
  Float32Array = global.Float32Array
  Float64Array = global.Float64Array
  BigInt64Array = global.BigInt64Array
  BigUint64Array = global.BigUint64Array
};


(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // vue-ns:vue
  var require_vue = __commonJS({
    "vue-ns:vue"(exports, module) {
      module.exports = Vue;
    }
  });

  // pinia-ns:pinia
  var require_pinia = __commonJS({
    "pinia-ns:pinia"(exports, module) {
      module.exports = uni.Pinia;
    }
  });

  // F:/CoinQT/CoinQT_app/unpackage/dist/dev/.nvue/tm-text.js
  var import_vue = __toESM(require_vue());
  var import_pinia = __toESM(require_pinia());
  var __defProp2 = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp2 = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp2.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var _a;
  var _b;
  Object.freeze({});
  Object.freeze([]);
  var ON_LOAD = "onLoad";
  function requireNativePlugin(name) {
    return weex.requireModule(name);
  }
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  var createHook = (lifecycle) => (hook, target = (0, import_vue.getCurrentInstance)()) => {
    !import_vue.isInSSRComponentSetup && (0, import_vue.injectHook)(lifecycle, hook, target);
  };
  var onLoad = /* @__PURE__ */ createHook(ON_LOAD);
  var colortool = {
    rgbaToHsla(scolor) {
      let { r, g, b, a } = scolor;
      r = r / 255;
      g = g / 255;
      b = b / 255;
      var min = Math.min(r, g, b);
      var max = Math.max(r, g, b);
      var l = (min + max) / 2;
      var difference = max - min;
      var h = 0, s = 0;
      if (max == min) {
        h = 0;
        s = 0;
      } else {
        s = l > 0.5 ? difference / (2 - max - min) : difference / (max + min);
        switch (max) {
          case r:
            h = (g - b) / difference + (g < b ? 6 : 0);
            break;
          case g:
            h = 2 + (b - r) / difference;
            break;
          case b:
            h = 4 + (r - g) / difference;
            break;
        }
        h = Math.round(h * 60);
      }
      s = Math.round(s * 100);
      l = Math.round(l * 100);
      return { h, s, l, a };
    },
    hslaToRgba(scolor) {
      let { h, s, l, a } = scolor;
      h = h / 360;
      s = s / 100;
      l = l / 100;
      var rgb = [];
      if (s == 0) {
        rgb = [Math.round(l * 255), Math.round(l * 255), Math.round(l * 255)];
      } else {
        var q = l >= 0.5 ? l + s - l * s : l * (1 + s);
        var p = 2 * l - q;
        rgb[0] = h + 1 / 3;
        rgb[1] = h;
        rgb[2] = h - 1 / 3;
        for (var i = 0; i < rgb.length; i++) {
          var tc = rgb[i];
          if (tc < 0) {
            tc = tc + 1;
          } else if (tc > 1) {
            tc = tc - 1;
          }
          switch (true) {
            case tc < 1 / 6:
              tc = p + (q - p) * 6 * tc;
              break;
            case (1 / 6 <= tc && tc < 0.5):
              tc = q;
              break;
            case (0.5 <= tc && tc < 2 / 3):
              tc = p + (q - p) * (4 - 6 * tc);
              break;
            default:
              tc = p;
              break;
          }
          rgb[i] = Math.round(tc * 255);
        }
      }
      return { r: rgb[0], g: rgb[1], b: rgb[2], a };
    },
    cssToRgba: function(sColor) {
      if (!sColor) {
        return { r: 0, g: 0, b: 0, a: 0 };
      }
      let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
      sColor = sColor.toLowerCase();
      if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
          let sColorNew = "#";
          for (let i = 1; i < 4; i += 1) {
            sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
          }
          sColor = sColorNew;
        }
        let sColorChange = [];
        for (let i = 1; i < 7; i += 2) {
          sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
        }
        return {
          r: sColorChange[0],
          g: sColorChange[1],
          b: sColorChange[2],
          a: 1
        };
      } else if (/^(rgb|RGB|rgba|RGBA)/.test(sColor)) {
        let arr = sColor.replace(/(?:\(|\)|rgb|RGB|RGBA|rgba)*/g, "").split(",");
        let p = arr.map((val) => Number(val));
        if (p.length < 3) {
          return {
            r: 0,
            g: 0,
            b: 0,
            a: 1
          };
        }
        if (p.length == 3) {
          p.push(1);
        }
        return {
          r: p[0],
          g: p[1],
          b: p[2],
          a: p[3]
        };
      } else {
        return {
          r: 0,
          g: 0,
          b: 0,
          a: 1
        };
      }
    },
    rgbaToHsva: function(rgba2) {
      if (!rgba2)
        return {
          h: 0,
          s: 1,
          v: 1,
          a: 1
        };
      const r = rgba2.r / 255;
      const g = rgba2.g / 255;
      const b = rgba2.b / 255;
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0;
      if (max !== min) {
        if (max === r) {
          h = 60 * (0 + (g - b) / (max - min));
        } else if (max === g) {
          h = 60 * (2 + (b - r) / (max - min));
        } else if (max === b) {
          h = 60 * (4 + (r - g) / (max - min));
        }
      }
      if (h < 0)
        h = h + 360;
      const s = max === 0 ? 0 : (max - min) / max;
      const hsv = [h, s, max];
      return {
        h: hsv[0],
        s: hsv[1],
        v: hsv[2],
        a: rgba2.a
      };
    },
    hsvaToRgba: function(sColor) {
      var { h, s, v, a } = sColor;
      var r = 0;
      var g = 0;
      var b = 0;
      var i;
      var f;
      var p;
      var q;
      var t;
      i = Math.floor(h * 6);
      f = h * 6 - i;
      p = v * (1 - s);
      q = v * (1 - f * s);
      t = v * (1 - (1 - f) * s);
      switch (i % 6) {
        case 0:
          r = v;
          g = t;
          b = p;
          break;
        case 1:
          r = q;
          g = v;
          b = p;
          break;
        case 2:
          r = p;
          g = v;
          b = t;
          break;
        case 3:
          r = p;
          g = q;
          b = v;
          break;
        case 4:
          r = t;
          g = p;
          b = v;
          break;
        case 5:
          r = v;
          g = p;
          b = q;
          break;
      }
      return { r, g, b, a };
    },
    rgbaToCss: function(sColor) {
      return `rgba(${sColor.r},${sColor.g},${sColor.b},${sColor.a})`;
    }
  };
  var cssDirection = /* @__PURE__ */ ((cssDirection2) => {
    cssDirection2["left"] = "left";
    cssDirection2["right"] = "right";
    cssDirection2["bottom"] = "bottom";
    cssDirection2["top"] = "top";
    cssDirection2["leftright"] = "x";
    cssDirection2["topbottom"] = "y";
    cssDirection2["topleft"] = "top-left";
    cssDirection2["topright"] = "top-right";
    cssDirection2["bottomleft"] = "bottom-left";
    cssDirection2["bottomright"] = "bottom-right";
    cssDirection2["all"] = "all";
    return cssDirection2;
  })(cssDirection || {});
  var linearDirection = /* @__PURE__ */ ((linearDirection2) => {
    linearDirection2["left"] = "to left";
    linearDirection2["right"] = "to right";
    linearDirection2["top"] = "to top";
    linearDirection2["bottom"] = "to bottom";
    linearDirection2["none"] = "";
    return linearDirection2;
  })(linearDirection || {});
  var linearDeep = /* @__PURE__ */ ((linearDeep2) => {
    linearDeep2["light"] = "light";
    linearDeep2["dark"] = "dark";
    linearDeep2["accent"] = "accent";
    return linearDeep2;
  })(linearDeep || {});
  var borderStyle = /* @__PURE__ */ ((borderStyle2) => {
    borderStyle2["solid"] = "solid";
    borderStyle2["dashed"] = "dashed";
    borderStyle2["dotted"] = "dotted";
    return borderStyle2;
  })(borderStyle || {});
  var theme = {};
  var colors = [];
  var colorObj = __spreadValues({
    red: "#ff2414",
    pink: "#ea2a6a",
    purple: "#9C27B0",
    "deep-purple": "#673AB7",
    indigo: "#3F51B5",
    blue: "#2196F3",
    "light-blue": "#03A9F4",
    cyan: "#00BCD4",
    teal: "#009688",
    green: "#4ec752",
    "light-green": "#8BC34A",
    lime: "#CDDC39",
    yellow: "#ffe814",
    amber: "#FFC107",
    orange: "#ffa114",
    "deep-orange": "#FF5722",
    brown: "#795548",
    "blue-grey": "#607D8B",
    grey: "#9E9E9E",
    black: "#000000",
    white: "#FFFFFF",
    primary: "#3B5CF0",
    "grey-5": "#fafafa",
    "grey-4": "#f5f5f5",
    "grey-3": "#eeeeee",
    "grey-2": "#e0e0e0",
    "grey-1": "#bdbdbd",
    "grey-darken-1": "#757575",
    "grey-darken-2": "#616161",
    "grey-darken-3": "#424242",
    "grey-darken-4": "#212121",
    "grey-darken-5": "#131313",
    "grey-darken-6": "#0a0a0a"
  }, theme);
  for (const key in colorObj) {
    if (Object.prototype.hasOwnProperty.call(colorObj, key)) {
      const element = String(colorObj[key]);
      if (isCssColor(element)) {
        let rgba = colortool.cssToRgba(element);
        colors.push({
          name: key,
          value: element,
          hsva: colortool.rgbaToHsva(colortool.cssToRgba(element)),
          rgba: colortool.cssToRgba(element),
          hsla: colortool.rgbaToHsla(rgba),
          csscolor: `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`
        });
      }
    }
  }
  function isCssColor(color) {
    const reg1 = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    const reg2 = /^(rgb|RGB|rgba|RGBA)/;
    return reg1.test(color) || reg2.test(color);
  }
  function getColor(colorName) {
    let isHand = colors.findIndex(function(el, index) {
      return el.name == colorName;
    });
    if (isHand == -1) {
      colorName = "primary";
      isHand = colors.findIndex(function(el, index) {
        return el.name == colorName;
      });
      formatAppLog("error", "at tmui/tool/theme/theme.ts:80", "\u4E3B\u9898\u4E2D\u4E0D\u5B58\u5728\u76F8\u5173\u540D\u79F0\u7684\u4E3B\u9898\u3002");
    }
    return colors[isHand];
  }
  var themeColors = class {
    constructor(c = colors) {
      this.colors = [];
      this.colors = c;
    }
    add(colorName = "", value = "") {
      let isHand = this.colors.filter(function(el, index) {
        return el.name == colorName;
      });
      if (isHand.length > 0) {
        formatAppLog("error", "at tmui/tool/theme/theme.ts:96", "\u5DF2\u5B58\u5728\u76F8\u5173\u989C\u8272\u540D\u79F0!!!");
        return this.colors;
      }
      if (!value) {
        formatAppLog("error", "at tmui/tool/theme/theme.ts:100", "\u989C\u8272\u503C\u5FC5\u586B!!!");
        return this.colors;
      }
      let rgba = colortool.cssToRgba(value);
      let color = {
        csscolor: "",
        hsva: { h: 0, s: 0, v: 0, a: 0 },
        hsla: { h: 0, s: 0, l: 0, a: 0 },
        rgba: { r: 0, g: 0, b: 0, a: 0 },
        name: colorName,
        value
      };
      color.csscolor = colortool.rgbaToCss(rgba);
      color.hsva = colortool.rgbaToHsva(rgba);
      color.rgba = rgba;
      color.hsla = colortool.rgbaToHsla(rgba);
      this.colors.push(color);
      return this.colors;
    }
    del(colorName) {
      let isHand = this.colors.findIndex(function(el, index) {
        return el.name == colorName;
      });
      if (isHand == -1) {
        formatAppLog("error", "at tmui/tool/theme/theme.ts:123", "\u5220\u9664\u5931\u8D25\uFF0C\u4E3B\u9898\u4E2D\u4E0D\u5B58\u5728\u76F8\u5173\u540D\u79F0\u7684\u4E3B\u9898\u3002");
        return;
      }
      this.colors.splice(isHand, 1);
    }
    getColor(colorName) {
      let isHand = this.colors.findIndex(function(el, index) {
        return el.name == colorName;
      });
      if (isHand == -1) {
        colorName = "primary";
        isHand = this.colors.findIndex(function(el, index) {
          return el.name == colorName;
        });
        formatAppLog("error", "at tmui/tool/theme/theme.ts:137", "\u4E3B\u9898\u4E2D\u4E0D\u5B58\u5728\u76F8\u5173\u540D\u79F0\u7684\u4E3B\u9898\u3002");
      }
      return this.colors[isHand];
    }
    getTheme(config = { colorname: "primary", dark: false }) {
      var _a2;
      if (!config["colorname"]) {
        formatAppLog("error", "at tmui/tool/theme/theme.ts:145", "\u989C\u8272\u540D\u79F0\u5FC5\u586B");
        config.colorname = "primary";
      }
      let index = this.colors.findIndex((el) => el.name == config.colorname);
      if (index == -1) {
        formatAppLog("error", "at tmui/tool/theme/theme.ts:150", "\u4E3B\u9898\u4E0D\u5B58\u5728\uFF0C\u9ED8\u8BA4\u4E3Aprimary");
        config.colorname = "primary";
      }
      let isBlack = false;
      let isWhite = false;
      let isBlackAndWhite = false;
      let isGrey = false;
      let nowColor = __spreadValues({}, this.colors[index]);
      config.borderWidth = isNaN(parseInt(String(config["borderWidth"]))) ? 0 : config["borderWidth"];
      config.borderStyle = config["borderStyle"] ? config["borderStyle"] : "solid";
      config.borderDirection = config["borderDirection"] || cssDirection.all;
      config.linearDirection = config["linearDirection"] || linearDirection.none;
      config.linearDeep = config["linearDeep"] || linearDeep.light;
      config.shadow = isNaN(parseInt(String(config["shadow"]))) ? 6 : config["shadow"];
      config.round = isNaN(parseInt(String(config["round"]))) ? 4 : config["round"];
      config.opaticy = isNaN(parseInt(String(config["opaticy"]))) ? 1 : config["opaticy"];
      config.outlined = typeof config["outlined"] == "boolean" ? config["outlined"] : false;
      config.text = typeof config["text"] == "boolean" ? config["text"] : false;
      config.blur = typeof config["blur"] == "boolean" ? config["blur"] : false;
      if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && nowColor.hsla.l == 0) {
        isBlack = true;
      }
      if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && nowColor.hsla.l == 100) {
        isWhite = true;
      }
      if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && nowColor.hsla.l < 100) {
        isGrey = true;
      }
      if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0) {
        isBlackAndWhite = true;
      }
      let css = {};
      css.color = nowColor.value;
      css.config = __spreadValues({}, config);
      css.isBlackAndWhite = isBlackAndWhite;
      css.gradientColor = [];
      css.colorname = config.colorname;
      let borderhsl = __spreadValues({}, nowColor.hsla);
      css.borderCss = {};
      let bghsl = __spreadValues({}, nowColor.hsla);
      if (config.dark) {
        if (nowColor.hsla.h != 0 && nowColor.hsla.s != 0) {
          bghsl.l = 40;
        }
      }
      if (config.blur) {
        bghsl.a = 0.85;
      }
      css.backgroundColor = colortool.rgbaToCss(colortool.hslaToRgba(__spreadValues({}, bghsl)));
      if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && config.dark) {
        css.backgroundColor = colortool.rgbaToCss(colortool.hslaToRgba(__spreadProps(__spreadValues({}, bghsl), { l: 8 })));
        css.border = colortool.rgbaToCss(colortool.hslaToRgba(__spreadProps(__spreadValues({}, borderhsl), { l: 12 })));
      }
      if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && !config.dark && nowColor.hsla.l == 100) {
        css.border = colortool.rgbaToCss(colortool.hslaToRgba(__spreadProps(__spreadValues({}, borderhsl), { l: 90 })));
      }
      if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && !config.dark && nowColor.hsla.l == 0) {
        css.border = colortool.rgbaToCss(colortool.hslaToRgba(__spreadProps(__spreadValues({}, borderhsl), { l: 12 })));
      }
      css.backgroundColorCss = { "background-color": css.backgroundColor };
      let txcolor = __spreadValues({}, nowColor.hsla);
      if (config.dark) {
        txcolor.l = 95;
      } else {
        if (((_a2 = nowColor.hsla) == null ? void 0 : _a2.l) <= 65) {
          txcolor.l = 95;
        } else {
          if (isGrey) {
            txcolor.l = 10;
          } else {
            txcolor.l = 20;
          }
        }
      }
      if (nowColor.hsla.h > 45 && nowColor.hsla.h < 90 && nowColor.hsla.h != 0 && nowColor.hsla.s != 0) {
        txcolor.l = 20;
      }
      if (config.outlined) {
        txcolor.l = 50;
        if (config.dark) {
          txcolor.l = 55;
        } else {
          if (nowColor.hsla.h > 45 && nowColor.hsla.h < 90 && nowColor.hsla.h != 0 && nowColor.hsla.s != 0) {
            txcolor.l = 20;
          }
        }
        if ((isBlack || isWhite) && config.dark) {
          txcolor.l = 100;
        }
        config.borderWidth = config["borderWidth"] || 2;
        let n_hsl = { h: nowColor.hsla.h, s: nowColor.hsla.s, l: 0, a: 0 };
        let o_bgcss = colortool.rgbaToCss(colortool.hslaToRgba(n_hsl));
        css.backgroundColor = o_bgcss;
        css.backgroundColorCss = { "background-color": o_bgcss };
        css.textColor = colortool.rgbaToCss(colortool.hslaToRgba(txcolor));
        css.border = css.textColor;
      }
      if (config.text) {
        txcolor.l = 90;
        if (isGrey) {
          txcolor.l = 15;
        } else {
          txcolor.l = 55;
          if (nowColor.hsla.h > 45 && nowColor.hsla.h < 90 && nowColor.hsla.h != 0 && nowColor.hsla.s != 0) {
            txcolor.l = 20;
          }
        }
        if (config.dark) {
          txcolor.l = 60;
          if (!isBlackAndWhite) {
            txcolor.s = 100;
          }
        }
        if (isBlack) {
          txcolor.l = 90;
        }
        if (isWhite) {
          txcolor.l = 15;
        }
        if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && config.dark) {
          txcolor.l = 90;
        }
        css.textColor = colortool.rgbaToCss(colortool.hslaToRgba(txcolor));
        css.border = css.textColor;
        let o_now_bgColor = nowColor.csscolor;
        let n_hsl = { h: nowColor.hsla.h, s: nowColor.hsla.s, l: 96, a: nowColor.hsla.a };
        if (config.dark) {
          if (nowColor.hsla.h != 0 && nowColor.hsla.s != 0) {
            n_hsl.l = 12;
            n_hsl.s = 35;
          } else {
            n_hsl.l = 12;
            n_hsl.s = 0;
          }
        }
        if (config.blur) {
          n_hsl.a = 0.85;
        }
        o_now_bgColor = colortool.rgbaToCss(colortool.hslaToRgba(n_hsl));
        css.backgroundColor = o_now_bgColor;
        css.backgroundColorCss = { "background-color": o_now_bgColor };
      }
      if (config.shadow) {
        let n_hsl = { h: nowColor.hsla.h, s: 100, l: 50, a: 0.2 };
        if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0) {
          n_hsl = { h: 0, s: 0, l: 20, a: 0.07 };
        }
        let o_bgcss = colortool.rgbaToCss(colortool.hslaToRgba(n_hsl));
        css.shadowColor = {
          boxShadow: `0rpx ${config.shadow * 2.5}rpx ${config.shadow * 6}rpx ${o_bgcss}`
        };
      }
      if (config.linearDirection) {
        let liner_color_1 = { h: 0, s: 0, l: 0, a: nowColor.hsla.a };
        let liner_color_2 = { h: 0, s: 0, l: 0, a: nowColor.hsla.a };
        let dir_str = linearDirection[config.linearDirection];
        if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && nowColor.hsla.l == 100) {
          if (config.linearDeep == "light") {
            liner_color_1.l = 80;
            liner_color_2.l = 20;
          } else {
            liner_color_1.l = 50;
            liner_color_2.l = 40;
          }
        } else if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && nowColor.hsla.l == 0) {
          if (config.linearDeep == "light") {
            liner_color_1.l = 40;
            liner_color_2.l = 10;
          } else {
            liner_color_1.l = 30;
            liner_color_2.l = 0;
          }
        } else {
          liner_color_2.h = nowColor.hsla.h;
          liner_color_2.s = nowColor.hsla.s;
          liner_color_1.h = nowColor.hsla.h;
          liner_color_1.s = nowColor.hsla.s;
          if (config.linearDeep == "light") {
            liner_color_1.l = 70;
            liner_color_1.s = 95;
            liner_color_1.h -= 5;
            liner_color_2.l = 45;
            liner_color_2.s = 95;
            liner_color_2.h += 5;
          } else if (config.linearDeep == "dark") {
            liner_color_1.l = 70;
            liner_color_1.s = 50;
            liner_color_2.l = 45;
            liner_color_2.s = 100;
          } else if (config.linearDeep == "accent") {
            liner_color_1.h -= 0;
            liner_color_1.s = 80;
            liner_color_1.l = 55;
            liner_color_2.l = 65;
            liner_color_2.h -= 35;
            liner_color_2.s = 80;
          }
        }
        if (config.dark) {
          liner_color_1.l = 40;
          liner_color_2.l = 40;
          txcolor.l = 90;
        }
        let color_t_1 = colortool.rgbaToCss(colortool.hslaToRgba(liner_color_1));
        let color_t_2 = colortool.rgbaToCss(colortool.hslaToRgba(liner_color_2));
        if (!config.text && !config.outlined) {
          css.backgroundColorCss = { "background-image": `linear-gradient(${dir_str},${color_t_1},${color_t_2})` };
          let newBgcolor = {
            h: (liner_color_1.h + liner_color_2.h) / 2,
            s: (liner_color_1.s + liner_color_2.s) / 2,
            l: (liner_color_1.l + liner_color_2.l) / 2,
            a: (liner_color_1.a + liner_color_2.a) / 2
          };
          if (!config.dark) {
            if (nowColor.hsla.h > 45 && nowColor.hsla.h < 90 && nowColor.hsla.h != 0 && nowColor.hsla.s != 0) {
              txcolor.l = 20;
            }
          }
          css.backgroundColor = colortool.rgbaToCss(colortool.hslaToRgba(newBgcolor));
          css.gradientColor = [color_t_1, color_t_2];
        }
      }
      if (config.dark == true) {
        css.cardcolor = "rgba(26, 26,26, 1.0)";
        css.inputcolor = "rgba(31, 31,31, 1.0)";
        css.bodycolor = "rgba(5,5,5, 1.0)";
        css.disablecolor = "rgba(30, 30, 30, 1.0)";
        css.textDisableColor = "rgba(100, 100, 100, 1.0)";
      }
      css.textColor = colortool.rgbaToCss(colortool.hslaToRgba(txcolor));
      if (config.dark) {
        if (nowColor.hsla.h != 0 && nowColor.hsla.s != 0) {
          css.border = colortool.rgbaToCss(colortool.hslaToRgba(__spreadProps(__spreadValues({}, nowColor.hsla), { l: bghsl.l + 10 })));
        }
        if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0) {
          css.border = colortool.rgbaToCss(colortool.hslaToRgba(__spreadProps(__spreadValues({}, nowColor.hsla), { l: 12 })));
        }
      } else {
        if (nowColor.hsla.h != 0 && nowColor.hsla.s != 0) {
          css.border = colortool.rgbaToCss(colortool.hslaToRgba(__spreadProps(__spreadValues({}, nowColor.hsla), { l: bghsl.l - 10 })));
        }
        if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0) {
          css.border = colortool.rgbaToCss(colortool.hslaToRgba(__spreadProps(__spreadValues({}, nowColor.hsla), { l: 90 })));
        }
      }
      if (config.borderDirection == "all") {
        css.borderCss[`border`] = `${config.borderWidth}rpx ${config.borderStyle} ${css.border}`;
      } else if (config.borderDirection == "x" || config.borderDirection == "leftright") {
        css.borderCss[`border-left`] = `${config.borderWidth}rpx ${config.borderStyle} ${css.border}`;
        css.borderCss[`border-right`] = `${config.borderWidth}rpx ${config.borderStyle} ${css.border}`;
      } else if (config.borderDirection == "y" || config.borderDirection == "topbottom") {
        css.borderCss[`border-top`] = `${config.borderWidth}rpx ${config.borderStyle} ${css.border}`;
        css.borderCss[`border-bottom`] = `${config.borderWidth}rpx ${config.borderStyle} ${css.border}`;
      } else if (config.borderDirection == "bottomleft") {
        css.borderCss[`border-left`] = `${config.borderWidth}rpx ${config.borderStyle} ${css.border}`;
        css.borderCss[`border-bottom`] = `${config.borderWidth}rpx ${config.borderStyle} ${css.border}`;
      } else if (config.borderDirection == "bottomright") {
        css.borderCss[`border-right`] = `${config.borderWidth}rpx ${config.borderStyle} ${css.border}`;
        css.borderCss[`border-bottom`] = `${config.borderWidth}rpx ${config.borderStyle} ${css.border}`;
      } else if (config.borderDirection == "topleft") {
        css.borderCss[`border-left`] = `${config.borderWidth}rpx ${config.borderStyle} ${css.border}`;
        css.borderCss[`border-top`] = `${config.borderWidth}rpx ${config.borderStyle} ${css.border}`;
      } else if (config.borderDirection == "topright") {
        css.borderCss[`border-right`] = `${config.borderWidth}rpx ${config.borderStyle} ${css.border}`;
        css.borderCss[`border-top`] = `${config.borderWidth}rpx ${config.borderStyle} ${css.border}`;
      } else {
        let str = "-" + config.borderDirection;
        css.borderCss[`border${str}`] = `${config.borderWidth}rpx ${config.borderStyle} ${css.border}`;
      }
      return css;
    }
  };
  var tool = {
    isCssColor,
    themeColors,
    getColor
  };
  function setCookie(key, data) {
    try {
      uni.setStorageSync(key, data);
      return true;
    } catch (e) {
      return false;
    }
  }
  function getCookie(key) {
    try {
      const value = uni.getStorageSync(key);
      try {
        let val = JSON.parse(value);
        return val;
      } catch (e) {
        return value;
      }
    } catch (e) {
      return void 0;
    }
  }
  function getUid(length = 12) {
    return Number(Number(Math.random().toString().substr(3, length) + Date.now()).toString(8));
  }
  getUid(1);
  function getWindow() {
    var _a2, _b2, _c, _d;
    const sysinfo = uni.getSystemInfoSync();
    let top = 0;
    let height = sysinfo.windowHeight;
    let nowPage = getCurrentPages().pop();
    let isCustomHeader = false;
    (_b2 = (_a2 = uni.$tm) == null ? void 0 : _a2.pages) != null ? _b2 : [];
    let bottom = (_d = (_c = sysinfo.safeAreaInsets) == null ? void 0 : _c.bottom) != null ? _d : 0;
    for (let i = 0; i < uni.$tm.pages.length; i++) {
      if ((nowPage == null ? void 0 : nowPage.route) == uni.$tm.pages[i].path && uni.$tm.pages[i].custom == "custom") {
        isCustomHeader = true;
        break;
      }
    }
    let reulst = { bottom, height, width: sysinfo.windowWidth, top, isCustomHeader, statusBarHeight: sysinfo.statusBarHeight, sysinfo };
    return reulst;
  }
  var pdefault_cookies_color = getCookie("setTmVuetifyColor") || "";
  var pdefault_cookies_black = getCookie("setTmVuetifyBlack");
  var pdefault_cookies_local = getCookie("setTmVuetifyLocal") || "zh-Hans";
  var pdefault_cookies_colorArrayList = getCookie("colorArrayList");
  var dark = typeof pdefault_cookies_black === "boolean" ? pdefault_cookies_black : false;
  var themeObj = new tool.themeColors();
  if (pdefault_cookies_colorArrayList) {
    const result2 = pdefault_cookies_colorArrayList.filter((item) => themeObj.colors.every((subItem) => subItem.name !== item.name));
    themeObj = new tool.themeColors([...themeObj.colors, ...result2]);
  }
  var colorArray = themeObj.colors;
  var os = (_b = (_a = uni.getSystemInfoSync()) == null ? void 0 : _a.osName) != null ? _b : "";
  setCookie("colorArrayList", colorArray);
  var useTmpiniaStore = (0, import_pinia.defineStore)("tmpinia", {
    state: () => {
      return {
        tmStore: {
          color: pdefault_cookies_color,
          dark,
          tmVueTifly_pages: "",
          tmVueTifly_pagesIndex: "",
          os,
          wxshareConfig_miniMp: {
            title: "",
            desc: "",
            imageUrl: "",
            path: "",
            copyLink: "",
            query: {}
          },
          colorList: colorArray,
          local: pdefault_cookies_local
        }
      };
    },
    actions: {
      setPageNow(url) {
        this.tmStore = __spreadProps(__spreadValues({}, this.tmStore), {
          tmVueTifly_pages: url
        });
      },
      setPageNowIndex(index) {
        this.tmStore = __spreadProps(__spreadValues({}, this.tmStore), {
          tmVueTifly_pagesIndex: index
        });
      },
      setTmVuetifyDark(dark2) {
        dark2 = typeof dark2 !== "boolean" ? false : dark2;
        setCookie("setTmVuetifyBlack", dark2);
        this.tmStore = __spreadProps(__spreadValues({}, this.tmStore), {
          dark: dark2
        });
      },
      setWxShare(cfg) {
        let pcf = cfg || {};
        if (typeof pcf !== "object" || Array.isArray(cfg))
          pcf = {};
        this.tmStore = __spreadProps(__spreadValues({}, this.tmStore), {
          wxshareConfig_miniMp: __spreadValues(__spreadValues({}, this.tmStore.wxshareConfig_miniMp), pcf)
        });
      },
      setTmVuetifyTheme(color) {
        let defaultColorName = color;
        if (!defaultColorName || defaultColorName == "" || tool.isCssColor(defaultColorName)) {
          defaultColorName = "";
        }
        setCookie("setTmVuetifyColor", defaultColorName);
        this.tmStore = __spreadProps(__spreadValues({}, this.tmStore), { color: defaultColorName });
      },
      setTmVuetifyAddTheme(colorName, color, isSet = true) {
        this.tmStore = __spreadProps(__spreadValues({}, this.tmStore), {
          colorList: themeObj.add(colorName, color)
        });
        setCookie("colorArrayList", this.tmStore.colorList);
        if (isSet) {
          this.setTmVuetifyTheme(colorName);
        }
      },
      setTmLocal(language) {
        language = language || "zh-Hans";
        setCookie("setTmVuetifyLocal", language);
        this.tmStore = __spreadProps(__spreadValues({}, this.tmStore), {
          local: language
        });
      }
    }
  });
  var custom_props = {
    _style: {
      type: [Array, String, Object],
      default: () => []
    },
    _class: {
      type: [Array, String],
      default: ""
    },
    color: {
      type: String,
      default: "primary"
    },
    followTheme: {
      type: [Boolean, String],
      default: false
    },
    dark: {
      type: [Boolean, String],
      default: false
    },
    followDark: {
      type: [Boolean, String],
      default: true
    },
    round: {
      type: [Number],
      default: 0
    },
    shadow: {
      type: [Number],
      default: 0
    },
    outlined: {
      type: [Boolean],
      default: false
    },
    border: {
      type: [Number],
      default: 0
    },
    borderStyle: {
      type: [String],
      default: borderStyle.solid,
      validator: (value) => {
        let mp = ["dashed", "dotted", "solid"];
        if (!mp.includes(value)) {
          formatAppLog("error", "at tmui/tool/lib/minxs.ts:78", "\u8FB9\u7EBF\u7C7B\u578B\u53EA\u80FD\u4E3AborderStyle\u4E2D\u7684\u4E00\u79CD\u3002");
        }
        return mp.includes(value);
      }
    },
    borderDirection: {
      type: String,
      default: cssDirection.all,
      validator: (value) => {
        let mp = ["all", "bottom", "bottomleft", "bottomright", "left", "leftright", "right", "right", "top", "topbottom", "topleft", "topright", "x", "y"];
        if (!mp.includes(value)) {
          formatAppLog("error", "at tmui/tool/lib/minxs.ts:92", "\u8FB9\u7EBF\u65B9\u5411\u683C\u5F0F\u53EA\u80FD\u4E3AcssDirection\u4E2D\u7684\u4E00\u79CD\u3002");
        }
        return mp.includes(value);
      }
    },
    text: {
      type: [Boolean, String],
      default: false
    },
    transprent: {
      type: [Boolean, String],
      default: true
    },
    linear: {
      type: [String],
      default: linearDirection.none,
      validator: (value) => {
        let mp = ["left", "right", "bottom", "top", ""];
        if (!mp.includes(value)) {
          formatAppLog("error", "at tmui/tool/lib/minxs.ts:120", "\u6E10\u53D8\u65B9\u5411\u53EA\u80FD\u4E3A,left:\u53F3->\u5DE6\uFF0Cright:\u5DE6->\u53F3\u3002top:\u4E0B->\u4E0A\uFF0Cbottom:\u4E0A->\u4E0B,\u4E2D\u7684\u4E00\u79CD\u3002");
        }
        return mp.includes(value);
      }
    },
    linearDeep: {
      type: [String],
      default: linearDeep.light,
      validator: (value) => {
        let mp = ["accent", "dark", "light"];
        if (!mp.includes(value)) {
          formatAppLog("error", "at tmui/tool/lib/minxs.ts:132", "\u6E10\u53D8\u65B9\u5411\u53EA\u80FD\u4E3Alight,dark,accent\u4E2D\u7684\u4E00\u79CD\u3002");
        }
        return mp.includes(value);
      }
    },
    isDisabledRoundAndriod: {
      type: [Boolean, String],
      default: false
    },
    blur: {
      type: Boolean,
      default: false
    }
  };
  var computedDark = (props, tmcfg) => {
    const followDark = props.followDark;
    const dark2 = props.dark;
    const glboalDark = tmcfg.dark;
    if (followDark) {
      return glboalDark;
    }
    return dark2;
  };
  var computedClass = (props) => {
    const _class = props._class;
    if (typeof _class == "string") {
      return _class;
    }
    if (Array.isArray(_class)) {
      return _class.join(" ");
    }
    return "";
  };
  var computedStyle = (props) => {
    const _style = props._style;
    if (typeof _style == "string") {
      let p = _style.split(";");
      let k = p.map((el) => {
        el = el.replace(";", "");
        let node = {};
        let idx = el.split(":");
        node[idx[0]] = idx[1];
        return node;
      });
      let kl = {};
      k.forEach((el) => {
        kl = __spreadValues(__spreadValues({}, kl), el);
      });
      return kl;
    }
    if (typeof _style == "object" && !Array.isArray(_style)) {
      return _style;
    }
    if (typeof _style == "object" && Array.isArray(_style)) {
      let kl = {};
      _style.forEach((el) => {
        kl = __spreadValues(__spreadValues({}, kl), el);
      });
      return kl;
    }
    return {};
  };
  var computedTheme = (props, dark2, store) => {
    const color = props.color;
    const border = props.border;
    const shadow = props.shadow;
    const round = props.round;
    const outlined = props.outlined;
    const text = props.text;
    const borderStyle2 = props.borderStyle;
    const borderDirection = props.borderDirection;
    const linear = props.linear;
    const linearDeep2 = props.linearDeep;
    const blur = props.blur;
    if (tool.isCssColor(color)) {
      formatAppLog("error", "at tmui/tool/lib/minxs.ts:213", "\u4E0D\u652F\u6301\u81EA\u5B9A\u4E49\u7EC4\u4EF6\u4E0A\u7684\u989C\u8272\u503C\uFF0C\u8BF7\u5728theme/theme.js\u4E2D\u6DFB\u52A0\u81EA\u5B9A\u4E49\u7684\u989C\u8272\u503C\u4E3A\u4E3B\u9898\u3002\u5F53\u524D\u5DF2\u5207\u6362\u4E3Aprimary\u4E3B\u9898\u3002");
    }
    let defaultColorName = color || "primary";
    if ((props == null ? void 0 : props.followTheme) == true && store.color) {
      defaultColorName = store.color;
    }
    var theme2 = new tool.themeColors(store.colorList);
    let c = theme2.getTheme({
      colorname: defaultColorName,
      dark: dark2,
      borderWidth: border,
      shadow: parseInt(String(shadow)),
      round: parseInt(String(round)),
      outlined: outlined ? true : false,
      text: text ? true : false,
      borderStyle: borderStyle2,
      borderDirection,
      linearDirection: linear,
      linearDeep: linearDeep2,
      blur
    });
    return c;
  };
  var useTmRouterAfter = (arg) => {
  };
  var _style_0 = { "menu": { "": { "zIndex": 999, "transform": "translateX(-101%)" } } };
  var _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  var _sfc_main$1 = /* @__PURE__ */ (0, import_vue.defineComponent)({
    __name: "tm-app",
    props: __spreadProps(__spreadValues({}, custom_props), {
      theme: {
        type: String,
        default: "grey-5"
      },
      bgImg: {
        type: String,
        default: ""
      },
      color: {
        type: String,
        default: "grey-4"
      },
      darkColor: {
        type: String,
        default: "#050505"
      },
      blur: {
        type: [Boolean, String],
        default: false
      },
      navbar: {
        type: Object,
        default: () => {
          return {
            background: "#ffffff",
            fontColor: "#000000"
          };
        }
      },
      showMenu: {
        type: Boolean,
        default: false
      }
    }),
    emits: ["update:showMenu"],
    setup(__props, { expose, emit: emits }) {
      var _a2, _b2, _c, _d;
      const props = __props;
      const animation = requireNativePlugin("animation");
      const store = useTmpiniaStore();
      const proxy = (_b2 = (_a2 = (0, import_vue.getCurrentInstance)()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      let pages = getCurrentPages().pop();
      onLoad((opts) => {
        var _a3;
        useTmRouterAfter({
          path: (_a3 = pages == null ? void 0 : pages.route) != null ? _a3 : "",
          opts,
          context: proxy
        });
      });
      const tmcfg = (0, import_vue.computed)(() => store.tmStore);
      const isSetThemeOk = (0, import_vue.ref)(false);
      const isDark = (0, import_vue.computed)(() => computedDark(props, tmcfg.value));
      const tmcomputed = (0, import_vue.computed)(() => computedTheme(props, isDark.value, tmcfg.value));
      const _showMenu = (0, import_vue.ref)(props.showMenu);
      const sysinfo = getWindow();
      const sysinfoRef = (0, import_vue.ref)(sysinfo);
      (0, import_vue.provide)("tmuiSysInfo", (0, import_vue.computed)(() => sysinfoRef.value));
      const view_width = (0, import_vue.ref)(sysinfo.width);
      let view_height = (0, import_vue.ref)(sysinfo.height);
      uni.$tm.u.getUid(1);
      let isTabbarPage = false;
      let nowPage = getCurrentPages().pop();
      let barLit = (_d = (_c = uni.$tm.tabBar) == null ? void 0 : _c.list) != null ? _d : [];
      for (let i = 0; i < barLit.length; i++) {
        if ((nowPage == null ? void 0 : nowPage.route) == barLit[i].pagePath) {
          isTabbarPage = true;
          break;
        }
      }
      const _blurEffect = (0, import_vue.computed)(() => {
        if (props.blur === true && isDark.value)
          return "dark";
        if (props.blur === true && !isDark.value)
          return "extralight";
        return "none";
      });
      let appConfig = (0, import_vue.ref)({
        width: view_width,
        height: view_height,
        theme: tmcomputed.value.backgroundColor,
        bgImg: props.bgImg,
        dark: isDark.value
      });
      function setAppStyle() {
        var _a3, _b3;
        if (isDark.value) {
          appConfig.value.theme = props.darkColor;
        } else {
          appConfig.value.theme = tmcomputed.value.backgroundColor;
        }
        if ((_b3 = (_a3 = plus == null ? void 0 : plus.webview) == null ? void 0 : _a3.currentWebview()) == null ? void 0 : _b3.setStyle) {
          plus.webview.currentWebview().setStyle({
            background: appConfig.value.theme,
            backgroundColorTop: appConfig.value.theme,
            backgroundColorBottom: appConfig.value.theme,
            userSelect: true,
            webviewBGTransparent: true
          });
        }
        if (isDark.value) {
          if (!sysinfo.isCustomHeader) {
            uni.setNavigationBarColor({
              backgroundColor: appConfig.value.theme,
              frontColor: "#ffffff"
            });
          }
          if (isTabbarPage) {
            uni.setTabBarStyle({
              backgroundColor: "#000000",
              borderStyle: "#1a1a1a",
              color: "#ffffff",
              selectedColor: uni.$tm.tabBar.selectedColor || tmcomputed.value.textColor
            });
          }
        } else {
          if (!sysinfo.isCustomHeader) {
            uni.setNavigationBarColor({
              backgroundColor: props.navbar.background,
              frontColor: props.navbar.fontColor
            });
          }
          if (isTabbarPage) {
            uni.setTabBarStyle({
              backgroundColor: uni.$tm.tabBar.backgroundColor || props.navbar.background,
              borderStyle: uni.$tm.tabBar.borderStyle || "#888888",
              color: uni.$tm.tabBar.color || props.navbar.fontColor,
              selectedColor: uni.$tm.tabBar.selectedColor || tmcomputed.value.textColor
            });
          }
        }
        isSetThemeOk.value = true;
      }
      (0, import_vue.provide)("appTextColor", (0, import_vue.computed)(() => tmcomputed.value.textColor));
      (0, import_vue.provide)("custom_space_size", [0, 0]);
      function setTheme(colorName) {
        store.setTmVuetifyTheme(colorName);
      }
      function setDark(dark2) {
        let maindark = !isDark.value;
        if (typeof dark2 !== "undefined" && typeof dark2 == "boolean") {
          maindark = dark2;
        }
        appConfig.value.dark = maindark;
        store.setTmVuetifyDark(maindark);
      }
      expose({
        setTheme,
        setDark
      });
      (0, import_vue.onBeforeMount)(() => setAppStyle());
      (0, import_vue.watch)(() => props.showMenu, () => {
        _showMenu.value = props.showMenu;
        spinNvueAni();
      });
      (0, import_vue.watch)([() => tmcfg.value.color, isDark], () => {
        isSetThemeOk.value = false;
        setAppStyle();
      });
      function toogleOpen(type) {
        _showMenu.value = type;
        emits("update:showMenu", _showMenu.value);
      }
      function spinNvueAni(reveser = false) {
        if (!(proxy == null ? void 0 : proxy.$refs.bodyEl))
          return;
        var testEl = proxy == null ? void 0 : proxy.$refs.bodyEl;
        animation.transition(testEl, {
          styles: {
            transform: _showMenu.value ? `translateX(70%)   scale(0.8)` : `translateX(0%)  scale(1)`,
            transformOrigin: "center center"
          },
          duration: 200,
          timingFunction: "ease",
          delay: 0
        }, () => {
        });
        setTimeout(function() {
          if (!(proxy == null ? void 0 : proxy.$refs.menuEl))
            return;
          var testElx = proxy == null ? void 0 : proxy.$refs.menuEl;
          animation.transition(testElx, {
            styles: {
              transform: _showMenu.value ? `translateX(0%)` : `translateX(-101%)`,
              transformOrigin: "center center"
            },
            duration: 200,
            timingFunction: "ease",
            delay: 0
          }, () => {
          });
        }, 50);
      }
      return (_ctx, _cache) => {
        return (0, import_vue.openBlock)(), (0, import_vue.createElementBlock)("view", {
          class: "flex flex-col relative",
          style: (0, import_vue.normalizeStyle)([(0, import_vue.unref)(appConfig).theme ? { background: (0, import_vue.unref)(appConfig).theme } : "", { width: (0, import_vue.unref)(appConfig).width + "px", minHeight: (0, import_vue.unref)(appConfig).height + "px" }]),
          renderWhole: true
        }, [
          (0, import_vue.createElementVNode)("view", {
            class: (0, import_vue.normalizeClass)([[__props.blur ? "blur" : ""], "flex flex-col flex-1"]),
            ref: "bodyEl",
            style: (0, import_vue.normalizeStyle)([
              {
                zIndex: 1,
                width: (0, import_vue.unref)(appConfig).width + "px",
                minHeight: (0, import_vue.unref)(appConfig).height + "px"
              },
              __props.blur ? { backgroundColor: (0, import_vue.unref)(isDark) ? "rgba(0,0,0,0.3)" : "rgba(248, 248, 248, 0.7)" } : ""
            ])
          }, [
            (0, import_vue.renderSlot)(_ctx.$slots, "default", {}, () => [
              (0, import_vue.createElementVNode)("u-text", null, "\u5728\u8FD9\u91CC\u653E\u7F6E\u5185\u5BB9")
            ])
          ], 6),
          (0, import_vue.createElementVNode)("view", {
            blurEffect: (0, import_vue.unref)(_blurEffect),
            onClick: _cache[1] || (_cache[1] = (0, import_vue.withModifiers)(($event) => toogleOpen(false), ["stop"])),
            ref: "menuEl",
            class: (0, import_vue.normalizeClass)([[_showMenu.value ? "menuOn" : ""], "fixed l-0 t-0 menu"]),
            style: (0, import_vue.normalizeStyle)({ width: (0, import_vue.unref)(appConfig).width + "px", height: (0, import_vue.unref)(appConfig).height + "px", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(3px)" })
          }, [
            _showMenu.value ? ((0, import_vue.openBlock)(), (0, import_vue.createElementBlock)("view", {
              key: 0,
              style: (0, import_vue.normalizeStyle)({ width: (0, import_vue.unref)(appConfig).width * 0.7 + "px", height: (0, import_vue.unref)(appConfig).height + "px", boxShadow: "3px 0 16px rgba(0,0,0,0.3)" })
            }, [
              (0, import_vue.createElementVNode)("scroll-view", {
                onClick: _cache[0] || (_cache[0] = (0, import_vue.withModifiers)(() => {
                }, ["stop"])),
                scrollY: true,
                style: (0, import_vue.normalizeStyle)({ width: (0, import_vue.unref)(appConfig).width * 0.7 + "px", height: (0, import_vue.unref)(appConfig).height + "px" })
              }, [
                (0, import_vue.renderSlot)(_ctx.$slots, "menu", {
                  sys: { width: (0, import_vue.unref)(appConfig).width * 0.7, height: (0, import_vue.unref)(appConfig).height }
                })
              ], 4)
            ], 4)) : (0, import_vue.createCommentVNode)("v-if", true)
          ], 14, ["blurEffect"])
        ], 4);
      };
    }
  });
  var tmApp = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["styles", [_style_0]], ["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-app/tm-app.vue"]]);
  var _sfc_main = /* @__PURE__ */ (0, import_vue.defineComponent)({
    __name: "tm-text",
    props: __spreadProps(__spreadValues({}, custom_props), {
      label: {
        type: [String, Number],
        default: ""
      },
      fontSize: {
        type: [Number],
        default: 28
      },
      color: {
        type: String,
        default: ""
      },
      selectable: {
        type: [Boolean],
        default: false
      },
      unit: {
        type: String,
        default: "rpx"
      }
    }),
    emits: ["click"],
    setup(__props, { emit: emits }) {
      const props = __props;
      const store = useTmpiniaStore();
      const tmcfg = (0, import_vue.computed)(() => store.tmStore);
      const customCSSStyle = (0, import_vue.computed)(() => computedStyle(props));
      const customClass = (0, import_vue.computed)(() => computedClass(props));
      const isDark = (0, import_vue.computed)(() => computedDark(props, tmcfg.value));
      const _label = (0, import_vue.computed)(() => props.label);
      const _fontSize = (0, import_vue.computed)(() => Number(props.fontSize));
      const appTextColor = (0, import_vue.inject)("appTextColor", (0, import_vue.computed)(() => void 0));
      const textColor = (0, import_vue.computed)(() => {
        if (props.followTheme && store.tmStore.color)
          return store.tmStore.color;
        let isColorHex = tool.isCssColor(props.color);
        if (isColorHex)
          return props.color;
        if (props.color && !isColorHex) {
          let nowcolor = tool.getColor(props.color);
          return nowcolor.csscolor;
        }
        if (!appTextColor) {
          if (isDark)
            return "rgba(252, 252, 252, 1.0)";
          return "rgba(34, 34, 34, 1.0)";
        }
        if (appTextColor.value) {
          return appTextColor.value;
        }
        return "rgba(34, 34, 34, 1.0)";
      });
      return (_ctx, _cache) => {
        return (0, import_vue.openBlock)(), (0, import_vue.createElementBlock)("view", {
          renderWhole: true,
          class: "flex text-view nvue",
          style: { "line-height": "0" }
        }, [
          (0, import_vue.createElementVNode)("u-text", {
            renderWhole: true,
            onClick: _cache[0] || (_cache[0] = ($event) => emits("click", $event)),
            selectable: __props.selectable,
            userSelect: __props.selectable,
            class: (0, import_vue.normalizeClass)([(0, import_vue.unref)(_fontSize) ? "" : "text-size-m", (0, import_vue.unref)(customClass)]),
            style: (0, import_vue.normalizeStyle)([
              {
                lineHeight: ((0, import_vue.unref)(_fontSize) ? (0, import_vue.unref)(_fontSize) * 1.3 : 42) + props.unit,
                color: (0, import_vue.unref)(textColor)
              },
              (0, import_vue.unref)(_fontSize) ? { fontSize: (0, import_vue.unref)(_fontSize) + props.unit } : "",
              (0, import_vue.unref)(customCSSStyle)
            ])
          }, (0, import_vue.toDisplayString)((0, import_vue.unref)(_label)), 15, ["selectable", "userSelect"])
        ]);
      };
    }
  });
  var tmText = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-text/tm-text.vue"]]);

  // F:/CoinQT/CoinQT_app/unpackage/dist/dev/.nvue/pages/form/form.js
  var import_vue24 = __toESM(require_vue());

  // F:/CoinQT/CoinQT_app/unpackage/dist/dev/.nvue/tm-input.js
  var import_vue5 = __toESM(require_vue());

  // F:/CoinQT/CoinQT_app/unpackage/dist/dev/.nvue/tm-sheet.js
  var import_vue2 = __toESM(require_vue());
  var __defProp3 = Object.defineProperty;
  var __defProps2 = Object.defineProperties;
  var __getOwnPropDescs2 = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols2 = Object.getOwnPropertySymbols;
  var __hasOwnProp3 = Object.prototype.hasOwnProperty;
  var __propIsEnum2 = Object.prototype.propertyIsEnumerable;
  var __defNormalProp2 = (obj, key, value) => key in obj ? __defProp3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues2 = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp3.call(b, prop))
        __defNormalProp2(a, prop, b[prop]);
    if (__getOwnPropSymbols2)
      for (var prop of __getOwnPropSymbols2(b)) {
        if (__propIsEnum2.call(b, prop))
          __defNormalProp2(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps2 = (a, b) => __defProps2(a, __getOwnPropDescs2(b));
  var _sfc_main2 = /* @__PURE__ */ (0, import_vue2.defineComponent)({
    __name: "tm-sheet",
    props: __spreadProps2(__spreadValues2({}, custom_props), {
      parenClass: {
        type: String,
        default: ""
      },
      contStyle: {
        type: String,
        default: ""
      },
      height: {
        type: [Number],
        default: 0
      },
      width: {
        type: [Number],
        default: 0
      },
      color: {
        type: String,
        default: "white"
      },
      transprent: {
        type: [Boolean, String],
        default: false
      },
      border: {
        type: [Number, String],
        default: 0
      },
      margin: {
        type: Array,
        default: () => [32, 12]
      },
      padding: {
        type: Array,
        default: () => [24, 24]
      },
      unit: {
        type: String,
        default: "rpx"
      },
      hoverClass: {
        type: String,
        default: "none"
      },
      darkBgColor: {
        type: String,
        default: ""
      },
      noLevel: {
        type: Boolean,
        default: false
      },
      blur: {
        type: Boolean,
        default: false
      }
    }),
    emits: ["click", "longpress", "touchend", "touchstart", "touchcancel", "mousedown", "mouseup", "mouseleave"],
    setup(__props, { emit: emits }) {
      var _a2, _b2;
      const props = __props;
      const store = useTmpiniaStore();
      (_b2 = (_a2 = (0, import_vue2.getCurrentInstance)()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const parenClass_p = (0, import_vue2.computed)(() => props.parenClass);
      const contStyle_p = (0, import_vue2.computed)(() => props.contStyle);
      const _transprent = (0, import_vue2.computed)(() => props.transprent);
      const tmcfg = (0, import_vue2.computed)(() => store.tmStore);
      const _blur = (0, import_vue2.computed)(() => {
        if (tmcfg.value.os == "android" && _isNvue.value) {
          return false;
        }
        return props.blur;
      });
      const customCSSStyle = (0, import_vue2.computed)(() => computedStyle(props));
      const customClass = (0, import_vue2.computed)(() => computedClass(props));
      const isDark = (0, import_vue2.computed)(() => computedDark(props, tmcfg.value));
      const tmcomputed = (0, import_vue2.computed)(() => {
        let text = props.text;
        if (_blur.value && tmcfg.value.os == "ios" && _isNvue.value) {
          text = true;
        }
        return computedTheme(__spreadProps2(__spreadValues2({}, props), { blur: _blur.value, text }), isDark.value, tmcfg.value);
      });
      const _isNvue = (0, import_vue2.ref)(false);
      _isNvue.value = true;
      const _margin = (0, import_vue2.computed)(() => props.margin);
      const _padding = (0, import_vue2.computed)(() => props.padding);
      const _width = (0, import_vue2.computed)(() => props.width);
      const _height = (0, import_vue2.computed)(() => props.height);
      const _noLevel = (0, import_vue2.computed)(() => props.noLevel);
      const _blue_sheet = (0, import_vue2.ref)(true);
      const _blurEffect = (0, import_vue2.computed)(() => {
        if (props.blur === true && isDark.value)
          return "dark";
        if (props.blur === true && !isDark.value)
          return "extralight";
        return "none";
      });
      (0, import_vue2.watch)(() => isDark.value, () => {
        if (store.tmStore.os == "ios" && _blur.value === true) {
          _blue_sheet.value = false;
          (0, import_vue2.nextTick)(() => _blue_sheet.value = true);
        }
      });
      const _bgcolor = (0, import_vue2.computed)(() => {
        var _a22;
        if (_transprent.value === true)
          return `background-color:rgba(255,255,255,0);`;
        if (props.darkBgColor !== "" && isDark.value === true) {
          return `background-color:${props.darkBgColor};`;
        }
        if (((_a22 = tmcomputed.value.gradientColor) == null ? void 0 : _a22.length) === 2) {
          return tmcomputed.value.backgroundColorCss;
        }
        if (_noLevel.value && tmcomputed.value.isBlackAndWhite === true && isDark.value === true) {
          return `background-color: ${tmcomputed.value.inputcolor}`;
        }
        return `background-color: ${tmcomputed.value.backgroundColor}`;
      });
      const isLongPress = (0, import_vue2.ref)(false);
      function longpress(e) {
        isLongPress.value = true;
        emits("longpress", e);
      }
      function touchstart(e) {
        isLongPress.value = true;
        emits("touchstart", e);
      }
      function touchend(e) {
        isLongPress.value = false;
        emits("touchend", e);
      }
      function touchcancel(e) {
        isLongPress.value = false;
        emits("touchcancel", e);
      }
      function mousedown(e) {
        isLongPress.value = true;
        emits("mousedown", e);
      }
      function mouseup(e) {
        isLongPress.value = false;
        emits("mouseup", e);
      }
      function mouseleave(e) {
        isLongPress.value = false;
        emits("mouseleave", e);
      }
      (0, import_vue2.computed)(() => {
        let w = parseFloat(String(_width.value)) - parseFloat(String(props.padding[0]));
        w = w - parseFloat(String(props.border)) * 2;
        return w;
      });
      (0, import_vue2.computed)(() => {
        let h = parseFloat(String(_height.value)) - parseFloat(String(props.padding[1]));
        h = h - parseFloat(String(props.border)) * 2;
        return h;
      });
      let textColor = (0, import_vue2.computed)(() => {
        return tmcomputed.value.textColor;
      });
      (0, import_vue2.provide)("appTextColor", textColor);
      return (_ctx, _cache) => {
        return _blue_sheet.value ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("view", {
          key: 0,
          renderWhole: true,
          blurEffect: (0, import_vue2.unref)(_blurEffect),
          onClick: _cache[0] || (_cache[0] = ($event) => emits("click", $event)),
          onLongpress: longpress,
          onTouchend: touchend,
          onTouchstart: touchstart,
          onTouchcancel: touchcancel,
          onMousedown: mousedown,
          onMouseup: mouseup,
          onMouseleave: mouseleave,
          class: (0, import_vue2.normalizeClass)([
            "flex flex-col noNvueBorder",
            (0, import_vue2.unref)(parenClass_p),
            `mx-${(0, import_vue2.unref)(_margin)[0]}`,
            `my-${(0, import_vue2.unref)(_margin)[1]}`,
            `px-${(0, import_vue2.unref)(_padding)[0]}`,
            `py-${(0, import_vue2.unref)(_padding)[1]}`,
            isLongPress.value ? props.hoverClass : "",
            props.hoverClass != "" && props.hoverClass != "none" ? "webpc" : "",
            !_ctx.isDisabledRoundAndriod ? `round-${props.round}` : ""
          ]),
          style: (0, import_vue2.normalizeStyle)([
            (0, import_vue2.unref)(_height) ? { height: (0, import_vue2.unref)(_height) + (0, import_vue2.unref)(_padding)[1] * 2 + props.unit } : "",
            (0, import_vue2.unref)(_width) ? { width: (0, import_vue2.unref)(_width) + (0, import_vue2.unref)(_padding)[0] * 2 + props.unit } : "",
            (0, import_vue2.unref)(tmcomputed).borderCss,
            (0, import_vue2.unref)(_blur) && (0, import_vue2.unref)(store).tmStore.os == "ios" && _isNvue.value === true ? "" : (0, import_vue2.unref)(_bgcolor),
            !(0, import_vue2.unref)(_transprent) && props.shadow > 0 ? (0, import_vue2.unref)(tmcomputed).shadowColor : "",
            !(0, import_vue2.unref)(_transprent) && (0, import_vue2.unref)(_blur) ? { backdropFilter: "blur(6px)" } : "",
            (0, import_vue2.unref)(customCSSStyle)
          ])
        }, [
          (0, import_vue2.createElementVNode)("view", {
            renderWhole: true,
            class: (0, import_vue2.normalizeClass)(["flex noNvueBorder flex-col flex-1", (0, import_vue2.unref)(customClass)]),
            style: (0, import_vue2.normalizeStyle)((0, import_vue2.unref)(contStyle_p))
          }, [
            (0, import_vue2.renderSlot)(_ctx.$slots, "default")
          ], 6)
        ], 46, ["blurEffect"])) : (0, import_vue2.createCommentVNode)("v-if", true);
      };
    }
  });
  var tmSheet = /* @__PURE__ */ _export_sfc(_sfc_main2, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-sheet/tm-sheet.vue"]]);

  // F:/CoinQT/CoinQT_app/unpackage/dist/dev/.nvue/tm-icon.js
  var import_vue3 = __toESM(require_vue());
  var __defProp4 = Object.defineProperty;
  var __defProps3 = Object.defineProperties;
  var __getOwnPropDescs3 = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols3 = Object.getOwnPropertySymbols;
  var __hasOwnProp4 = Object.prototype.hasOwnProperty;
  var __propIsEnum3 = Object.prototype.propertyIsEnumerable;
  var __defNormalProp3 = (obj, key, value) => key in obj ? __defProp4(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues3 = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp4.call(b, prop))
        __defNormalProp3(a, prop, b[prop]);
    if (__getOwnPropSymbols3)
      for (var prop of __getOwnPropSymbols3(b)) {
        if (__propIsEnum3.call(b, prop))
          __defNormalProp3(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps3 = (a, b) => __defProps3(a, __getOwnPropDescs3(b));
  var tmiconFont = "AAEAAAALAIAAAwAwR1NVQiCLJXoAAAE4AAAAVE9TLzI8HlQ5AAABjAAAAGBjbWFwbLPjsAAACCQAABiUZ2x5Zkd1ewwAACPYAAD+MGhlYWQiZ3U5AAAA4AAAADZoaGVhCLYGMwAAALwAAAAkaG10eDzf/zgAAAHsAAAGOGxvY2FuDypsAAAguAAAAx5tYXhwAtoCawAAARgAAAAgbmFtZZRMsowAASIIAAACT3Bvc3TIodhFAAEkWAAAFQwAAQAAA4D/gABcBS//p//1BTAAAQAAAAAAAAAAAAAAAAAAAY4AAQAAAAEAANDrHEBfDzz1AAsEAAAAAADfOJh/AAAAAN84mH//p/93BTADxwAAAAgAAgAAAAAAAAABAAABjgJfAEIAAAAAAAIAAAAKAAoAAAD/AAAAAAAAAAEAAAAKADAAPgACREZMVAAObGF0bgAaAAQAAAAAAAAAAQAAAAQAAAAAAAAAAQAAAAFsaWdhAAgAAAABAAAAAQAEAAQAAAABAAgAAQAGAAAAAQAAAAQEAwGQAAUAAAKJAswAAACPAokCzAAAAesAMgEIAAACAAUDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFBmRWQAwOYA8WYDgP+AAAAD3ACJAAAAAQAAAAAAAAAAAAAAAAACBAAAAAQaAAAEAAAABQD//wQAAAAFAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAD//wQAAAAEAAAABAX//gQAAAAEAAAABAAAAAQA//sEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAP/+BAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQA//0EAAAABAAAAAQAAAAEAP//BAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAUi//0EAAAABS8AAAQA//gEAP//BAAAAAQA//oEAP/3BAD//AQA//8EAAAABBn/pwQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAD//wQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQZAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQA//8EAP//BAD//wQAAAAEAAAABAAAAAQA//8EAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAP//BAD//wQA//8EAP//BAD//wQA//8EAP//BAD//wQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQA//8EAP//BAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQA//8EAP//BAD//wQAAAAEAAAABAAAAAQA//8EAAAABAAAAAQAAAAEAAAABAAAAAQA//8EAAAABAAAAAQAAAAEAP//BAD//wQA//8EAP//BAD//wQA//8EAP//BAD//wQAAAAEAAAABAD//wQAAAAEAAAABAAAAAQAAAAEAP//BAD//wQA//8EAAAABAAAAAQA//MEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAP//BAD/9wQAAAAEAP//BAAAAAQAAAAEAAAA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AADmAQAA5gEAAAAHAADmBQAA5gUAAAB3AADmCAAA5ggAAACBAADmDAAA5gwAAAB0AADmDQAA5g0AAAAyAADmDgAA5g4AAAALAADmDwAA5g8AAACCAADmEAAA5hAAAAB9AADmEQAA5hEAAAAPAADmEgAA5hIAAAAQAADmFQAA5hUAAACAAADmIgAA5iIAAAB6AADmLwAA5i8AAAARAADmPwAA5j8AAAB/AADmRgAA5kYAAAA0AADmVwAA5lcAAAA1AADmWAAA5lgAAAAMAADmXQAA5l0AAAANAADmZQAA5mUAAAB+AADmiwAA5osAAAB5AADmrQAA5q0AAAB2AADmwgAA5sIAAAASAADmwwAA5sMAAAATAADmxAAA5sQAAAAUAADmxQAA5sUAAAAVAADmxgAA5sYAAAAWAADmxwAA5scAAAAXAADmyAAA5sgAAAAYAADmyQAA5skAAAB4AADmywAA5ssAAAAZAADmzAAA5swAAAAaAADmzQAA5s0AAAAbAADmzgAA5s4AAAAzAADm2gAA5toAAAAIAADm3gAA5t4AAAAcAADm4gAA5uIAAAAdAADm4wAA5uMAAAAeAADm5AAA5uQAAAAfAADm5wAA5ucAAAAgAADm8QAA5vEAAAAhAADm8gAA5vIAAAAiAADm/QAA5v0AAAAjAADnBgAA5wYAAACDAADnBwAA5wcAAAAkAADnCQAA5wkAAAAlAADnCgAA5woAAAAmAADnDgAA5w4AAAAnAADnEgAA5xIAAAAoAADnEwAA5xMAAAApAADnFAAA5xQAAAArAADnFgAA5xYAAAAqAADnGQAA5xkAAAAsAADnHAAA5xwAAAAtAADnHQAA5x0AAAAuAADnHgAA5x4AAAAvAADnHwAA5x8AAAAwAADnOgAA5zoAAABzAADnPgAA5z4AAAAKAADnWAAA51gAAAAJAADnaQAA52kAAAFvAADnagAA52oAAAFxAADnawAA52sAAAFzAADnbAAA52wAAAF1AADnbQAA520AAAF3AADnbgAA524AAAF5AADnbwAA528AAAF7AADncAAA53AAAAF9AADncQAA53EAAAF/AADncgAA53IAAAGBAADndAAA53QAAAGDAADndQAA53UAAAGEAADndgAA53YAAAGFAADndwAA53cAAAGGAADnigAA54oAAAGHAADnjAAA54wAAAGIAADnjQAA540AAAGJAADnjgAA544AAAGKAADnjwAA548AAAGLAADnkAAA55AAAAGMAADnkQAA55EAAAGNAADnkgAA55IAAACEAADnkwAA55MAAACFAADnlAAA55QAAACGAADnlQAA55UAAACHAADnlgAA55YAAACIAADnlwAA55cAAACJAADnmAAA55gAAACKAADnmQAA55kAAACLAADnmgAA55oAAACMAADnnQAA550AAACNAADnngAA554AAACOAADnnwAA558AAACPAADnoAAA56AAAACQAADnoQAA56EAAACRAADnogAA56IAAACSAADnowAA56MAAACTAADnpAAA56QAAACUAADnpQAA56UAAACVAADnpgAA56YAAACWAADnpwAA56cAAACXAADnqAAA56gAAACYAADnqQAA56kAAACZAADnqgAA56oAAACaAADnqwAA56sAAACbAADnrAAA56wAAACcAADnrQAA560AAACdAADnrgAA564AAACeAADnrwAA568AAACfAADnsAAA57AAAACgAADnsQAA57EAAAChAADnsgAA57IAAACiAADnswAA57MAAACjAADntAAA57QAAACkAADntQAA57UAAAClAADntgAA57YAAACmAADntwAA57cAAACnAADnuAAA57gAAACoAADnuQAA57kAAACpAADnugAA57oAAACqAADnuwAA57sAAACrAADnvAAA57wAAACsAADnvQAA570AAACtAADnvgAA574AAACuAADnvwAA578AAACvAADnwAAA58AAAACwAADnwQAA58EAAACxAADnwgAA58IAAACyAADnwwAA58MAAACzAADnxAAA58QAAAC0AADnxQAA58UAAAC1AADnxgAA58YAAAC2AADnxwAA58cAAAC3AADnyAAA58gAAAC4AADnyQAA58kAAAC5AADnygAA58oAAAC6AADnywAA58sAAAC7AADnzAAA58wAAAC8AADnzQAA580AAAC9AADnzgAA584AAAC+AADnzwAA588AAAC/AADn0AAA59AAAADAAADn0QAA59EAAADBAADn0gAA59IAAADCAADn0wAA59MAAADDAADn1AAA59QAAADEAADn1QAA59UAAADFAADn1gAA59YAAADGAADn1wAA59cAAADHAADn2AAA59gAAADIAADn2QAA59kAAADJAADn2gAA59oAAADKAADn2wAA59sAAADLAADn3AAA59wAAADMAADn3QAA590AAADNAADn3gAA594AAADOAADn3wAA598AAADPAADn4AAA5+AAAADQAADn4QAA5+EAAADRAADn4gAA5+IAAADSAADn4wAA5+MAAADTAADn5AAA5+QAAADUAADn5QAA5+UAAADVAADn5gAA5+YAAADWAADn5wAA5+cAAADXAADn6AAA5+gAAADYAADn6QAA5+kAAADZAADn6gAA5+oAAADaAADn6wAA5+sAAADbAADn7AAA5+wAAADcAADn7QAA5+0AAADdAADn7gAA5+4AAADeAADn7wAA5+8AAADfAADn8AAA5/AAAADgAADn8QAA5/EAAADhAADn8gAA5/IAAADiAADn8wAA5/MAAADjAADn9AAA5/QAAADkAADn9QAA5/UAAADlAADn9gAA5/YAAADmAADn9wAA5/cAAADnAADn+AAA5/gAAADoAADn+QAA5/kAAADpAADn+gAA5/oAAADqAADn+wAA5/sAAADrAADn/AAA5/wAAADsAADn/QAA5/0AAADtAADn/gAA5/4AAADuAADn/wAA5/8AAADvAADoAAAA6AAAAADwAADoAQAA6AEAAADxAADoAgAA6AIAAADyAADoAwAA6AMAAADzAADoBAAA6AQAAAD0AADoBQAA6AUAAAD1AADoBgAA6AYAAAD2AADoBwAA6AcAAAD3AADoCAAA6AgAAAD4AADoCQAA6AkAAAD5AADoCgAA6AoAAAD6AADoCwAA6AsAAAD7AADoDAAA6AwAAAD8AADoDQAA6A0AAAD9AADoDgAA6A4AAAD+AADoDwAA6A8AAAD/AADoEAAA6BAAAAEAAADoEQAA6BEAAAEBAADoEgAA6BIAAAECAADoEwAA6BMAAAEDAADoFAAA6BQAAAEEAADoFQAA6BUAAAEFAADoFgAA6BYAAAEGAADoFwAA6BcAAAEHAADoGAAA6BgAAAEIAADoGQAA6BkAAAEJAADoGgAA6BoAAAEKAADoGwAA6BsAAAELAADoHAAA6BwAAAEMAADoHQAA6B0AAAENAADoHgAA6B4AAAEOAADoHwAA6B8AAAEPAADoIAAA6CAAAAEQAADoIQAA6CEAAAERAADoIgAA6CIAAAESAADoIwAA6CMAAAETAADoJAAA6CQAAAEUAADoJQAA6CUAAAEVAADoJgAA6CYAAAEWAADoJwAA6CcAAAEXAADoKAAA6CgAAAEYAADoKQAA6CkAAAEZAADoKgAA6CoAAAEaAADoKwAA6CsAAAEbAADoLAAA6CwAAAEcAADoLQAA6C0AAAEdAADoLgAA6C4AAAEeAADoLwAA6C8AAAEfAADoMAAA6DAAAAEgAADoMQAA6DEAAAEhAADoMgAA6DIAAAEiAADoMwAA6DMAAAEjAADoNAAA6DQAAAEkAADoNQAA6DUAAAElAADoNgAA6DYAAAEmAADoNwAA6DcAAAEnAADoOAAA6DgAAAEoAADoOQAA6DkAAAEpAADoOgAA6DoAAAEqAADoOwAA6DsAAAErAADoPAAA6DwAAAEsAADoPQAA6D0AAAEtAADoPgAA6D4AAAEuAADoPwAA6D8AAAEvAADoQAAA6EAAAAEwAADoQQAA6EEAAAExAADoQgAA6EIAAAEyAADoQwAA6EMAAAEzAADoRAAA6EQAAAE0AADoRQAA6EUAAAE1AADoRgAA6EYAAAE2AADoRwAA6EcAAAE3AADoSAAA6EgAAAE4AADoSQAA6EkAAAE5AADoSgAA6EoAAAE6AADoSwAA6EsAAAE7AADoTAAA6EwAAAE8AADoTQAA6E0AAAE9AADoTgAA6E4AAAE+AADoTwAA6E8AAAE/AADoUAAA6FAAAAFAAADoUQAA6FEAAAFBAADoUgAA6FIAAAA2AADoUwAA6FMAAAFCAADoVAAA6FQAAAFDAADoVQAA6FUAAAFEAADoVgAA6FYAAAFFAADoVwAA6FcAAAFGAADoWAAA6FgAAAFHAADoWQAA6FkAAAA3AADoWgAA6FoAAAFIAADoWwAA6FsAAAFJAADoXAAA6FwAAAFKAADoXQAA6F0AAAFLAADoXgAA6F4AAAFMAADoXwAA6F8AAAFNAADoYAAA6GAAAAFOAADoYQAA6GEAAAFPAADoYgAA6GIAAAFQAADoYwAA6GMAAAFRAADoZAAA6GQAAAFSAADoZQAA6GUAAAFTAADoZgAA6GYAAAA4AADoZwAA6GcAAAFUAADoaAAA6GgAAAA5AADoaQAA6GkAAAA6AADoagAA6GoAAAFVAADoawAA6GsAAAFWAADobAAA6GwAAAFXAADobQAA6G0AAAFYAADobgAA6G4AAAFZAADobwAA6G8AAAFaAADocAAA6HAAAAFbAADocQAA6HEAAAFcAADocgAA6HIAAAFdAADocwAA6HMAAAFeAADodAAA6HQAAAFfAADodQAA6HUAAAFgAADodgAA6HYAAAA7AADodwAA6HcAAAFhAADoeAAA6HgAAAFiAADoeQAA6HkAAAFjAADoegAA6HoAAAFkAADoewAA6HsAAAFlAADofAAA6HwAAAA8AADofQAA6H0AAAFmAADofgAA6H4AAAFnAADofwAA6H8AAAA9AADogAAA6IAAAAA+AADogQAA6IEAAAFoAADoggAA6IIAAAFpAADogwAA6IMAAAFqAADohAAA6IQAAAFrAADohQAA6IUAAAFsAADohgAA6IYAAAA/AADohwAA6IcAAAFtAADoiAAA6IgAAAFuAADoiQAA6IkAAAFwAADoigAA6IoAAAFyAADoiwAA6IsAAAF0AADojAAA6IwAAAF2AADojQAA6I0AAABAAADojgAA6I4AAAF4AADojwAA6I8AAAF6AADokAAA6JAAAABBAADokQAA6JEAAAF8AADokgAA6JIAAAF+AADokwAA6JMAAABCAADolAAA6JQAAABDAADolQAA6JUAAABEAADolgAA6JYAAABFAADolwAA6JcAAABGAADomAAA6JgAAABHAADomQAA6JkAAABIAADomgAA6JoAAABJAADomwAA6JsAAABKAADonAAA6JwAAABLAADonQAA6J0AAAAuAADongAA6J4AAAGAAADonwAA6J8AAAGCAADooAAA6KAAAABMAADooQAA6KEAAABNAADoogAA6KIAAABOAADoowAA6KMAAABPAADopAAA6KQAAABQAADopQAA6KUAAABRAADopgAA6KYAAABSAADopwAA6KcAAABTAADoqAAA6KgAAABUAADoqQAA6KkAAABVAADoqgAA6KoAAABWAADoqwAA6KsAAABXAADorAAA6KwAAABYAADorQAA6K0AAABZAADorgAA6K4AAABaAADorwAA6K8AAABbAADosAAA6LAAAABcAADosQAA6LEAAABdAADosgAA6LIAAABeAADoswAA6LMAAABfAADotAAA6LQAAABgAADotQAA6LUAAABhAADotgAA6LYAAABiAADotwAA6LcAAABjAADouAAA6LgAAABkAADouQAA6LkAAABlAADougAA6LoAAABm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LgAwAHQAbQBpAGMAbwBuAEcAZQBuAGUAcgBhAHQAZQBkACAAYgB5ACAAcwB2AGcAMgB0AHQAZgAgAGYAcgBvAG0AIABGAG8AbgB0AGUAbABsAG8AIABwAHIAbwBqAGUAYwB0AC4AaAB0AHQAcAA6AC8ALwBmAG8AbgB0AGUAbABsAG8ALgBjAG8AbQAAAgAAAAAAAAAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGOAQIBAwEEAQUBBgEHAQgBCQEKAQsBDAENAQ4BDwEQAREBEgETARQBFQEWARcBGAEZARoBGwEcAR0BHgEfASABIQEiASMBJAElASYBJwEoASkBKgErASwBLQEuAS8BMAExATIBMwE0ATUBNgE3ATgBOQE6ATsBPAE9AT4BPwFAAUEBQgFDAUQBRQFGAUcBSAFJAUoBSwFMAU0BTgFPAVABUQFSAVMBVAFVAVYBVwFYAVkBWgFbAVwBXQFeAV8BYAFhAWIBYwFkAWUBZgFnAWgBaQFqAWsBbAFtAW4BbwFwAXEBcgFzAXQBdQF2AXcBeAF5AXoBewF8AX0BfgF/AYABgQGCAYMBhAGFAYYBhwGIAYkBigGLAYwBjQGOAY8BkAGRAZIBkwGUAZUBlgGXAZgBmQGaAZsBnAGdAZ4BnwGgAaEBogGjAaQBpQGmAacBqAGpAaoBqwGsAa0BrgGvAbABsQGyAbMBtAG1AbYBtwG4AbkBugG7AbwBvQG+Ab8BwAHBAcIBwwHEAcUBxgHHAcgByQHKAcsBzAHNAc4BzwHQAdEB0gHTAdQB1QHWAdcB2AHZAdoB2wHcAd0B3gHfAeAB4QHiAeMB5AHlAeYB5wHoAekB6gHrAewB7QHuAe8B8AHxAfIB8wH0AfUB9gH3AfgB+QH6AfsB/AH9Af4B/wIAAgECAgIDAgQCBQIGAgcCCAIJAgoCCwIMAg0CDgIPAhACEQISAhMCFAIVAhYCFwIYAhkCGgIbAhwCHQIeAh8CIAIhAiICIwIkAiUCJgInAigCKQIqAisCLAItAi4CLwIwAjECMgIzAjQCNQI2AjcCOAI5AjoCOwI8Aj0CPgI/AkACQQJCAkMCRAJFAkYCRwJIAkkCSgJLAkwCTQJOAk8CUAJRAlICUwJUAlUCVgJXAlgCWQJaAlsCXAJdAl4CXwJgAmECYgJjAmQCZQJmAmcCaAJpAmoCawJsAm0CbgJvAnACcQJyAnMCdAJ1AnYCdwJ4AnkCegJ7AnwCfQJ+An8CgAKBAoICgwKEAoUChgKHAogCiQKKAosCjAKNAo4CjwAGcGF5cGFsBmdvb2dsZQlhcHBsZS1wYXkFQXBwbGUKZ29vZ2xlLXBheQdxaWFuZGFpBHF1YW4HaG9uZ2Jhbwt0b25nemhpZmlsbAlyZW5taW5iaTMHdG91cGlhbwRpY29uCXN2Z2dlc2hpLQdtZWl5dWFuBXFpY2hlB3Rvbmd6aGkHaHVpeXVhbhFtZC1waG9uZS1wb3J0cmFpdAltZC1wbGFuZXQSbWQtcGhvbmUtbGFuZHNjYXBlCG1kLXBvd2VyB21kLXJlZG8JbWQtcm9ja2V0CW1kLXJpYmJvbgdtZC11bmRvEG1kLXRyZW5kaW5nLWRvd24ObWQtdHJlbmRpbmctdXAMbWQtZ2l0LW1lcmdlCW1kLWZlbWFsZQdtZC1tYWxlEG1kLWhlYXJ0LWRpc2xpa2UJbWQtaGVhcnQxCGlvcy10ZXh0CGlvcy1yb3NlFmxvZ28tZ2FtZS1jb250cm9sbGVyLWIIaW9zLWJlZXIIaW9zLWNhZmUPaW9zLWNoYXRidWJibGVzEWlvcy1jb2xvci1wYWxldHRlCmlvcy1maWxpbmcQaW9zLWZpbmdlci1wcmludAhpb3MtaGFuZAppb3MtZmxvd2VyDWlvcy1pY2UtY3JlYW0IaW9zLWdyaWQOaW9zLW1haWwtb3BlbjEHaW9zLWtleQdpb3MtbWFuCG1laXl1YW4xCHppZGluZ3lpB3NodWF4aW4IaHVpeXVhbjEEeXVhbgxpb3MtYWlycGxhbmUJaW9zLXdvbWFuDGlvcy1hcGVydHVyZQlpb3MtYWxhcm0SaW9zLWFycm93LWRyb3Bkb3duFGlvcy1hcnJvdy1kcm9wbGVmdC1jEmlvcy1hcnJvdy1kcm9wbGVmdBBpb3MtYXJyb3ctZHJvcHVwFGlvcy1hcnJvdy1kcm9wcmlnaHQtFGlvcy1hcnJvdy1kcm9wZG93bi1jFGlvcy1hcnJvdy1kcm9wdXAtY2lyE2lvcy1hcnJvdy1kcm9wcmlnaHQKaW9zLWF0dGFjaAZpb3MtYXQHaW9zLWJlZBBpb3MtYmF0dGVyeS1mdWxsDWlvcy1ib29rbWFya3MNaW9zLWJsdWV0b290aAxpb3MtY2VsbHVsYXIHaW9zLWN1dAhpb3MtbGVhZgdpb3MtbWljEGlvcy1wYXJ0bHktc3VubnkTaW9zLXJhZGlvLWJ1dHRvbi1vbhRpb3MtcmFkaW8tYnV0dG9uLW9mZgppb3MtcmVtb3ZlFGlvcy1yZW1vdmUtY2lyY2xlLW91EWlvcy1yZW1vdmUtY2lyY2xlCmlvcy1yb2NrZXQKaW9zLXJpYmJvbghpb3Mtc3Rhcg1pb3Mtc3Rhci1oYWxmEGlvcy1zdGFyLW91dGxpbmUIaW9zLXNub3cNaW9zLXN0b3B3YXRjaAlpb3Mtc3VubnkKaW9zLXVubG9jawppb3MtdHJvcGh5DGlvcy11bWJyZWxsYQxpb3MtdmlkZW9jYW0PaW9zLXZvbHVtZS1oaWdoCWlvcy13YXRlcghpb3Mtd2lmaQhtZC13YXRlcgttZC1jaGVja2JveA5tZC1jaGF0YnViYmxlcwxtZC1jaGF0Ym94ZXMNbWQtY2xvdWQtZG9uZQ9tZC1jbG91ZC11cGxvYWQJbWQtY2xvdWR5C21kLWNvbnRyYXN0B21kLWRpc2MObWQtaGVhcnQtZW1wdHkHbWQtaG9tZQxtZC1tYWlsLW9wZW4NbWQtaGVhcnQtaGFsZgltZC1wZXJzb24JbWQtcGVvcGxlB21kLW1vcmUHbWQtbW9vbgZtZC1waW4HZ2VuZ2R1bwNpb3MId2lmaS1vZmYYc2hpbGlhbmd6aGluZW5nZHVpeGlhbmctC3dlaXhpbnpoaWZ1CnlpbmhhbmdxaWEJeXVuc2hhbmZ1DnRvdXRpYW95YW5nc2hpBmRvdXlpbgZhbGlwYXkGaHVhd2VpB2xpYW5qaWUGd2VpeGluC3Blbmd5b3VxdWFuBXdlaWJvAlFRC3hpYW9jaGVuZ3h1DGRpc3BsYXktY29kZRNkaXNwbGF5LWFycm93LXJpZ2h0EmRpc3BsYXktYXJyb3ctbGVmdAxsYXB0b3AtZXJyb3IMbGFwdG9wLWNoZWNrBmxhcHRvcAxtb2JpbGUtZXJyb3IMbW9iaWxlLWNoZWNrCm1vYmlsZS1hbHQLYWxpd2FuZ3dhbmcEbmFpbApuYWlsLWZpeGVkBGVkaXQGZG9sbGFyDHRyYW5zYW5jdGlvbgtmaWx0ZXItZmlsbAhhbGwtZmlsbBFkYXRhYmFzZXBsdXMtZmlsbA1kYXRhYmFzZS1maWxsEWNvbW1lbnRsaW5lcy1maWxsEGNvbW1lbnRkb3RzLWZpbGwPcGFwZXJwbGFuZS1maWxsDWV5ZXNsYXNoLWZpbGwIZXllLWZpbGwObGlnaHRidWxiLWZpbGwJZmxhZy1maWxsCHRhZy1maWxsDXBvc2l0aW9uLWZpbGwNbG9jYXRpb24tZmlsbAhtYXAtZmlsbAxpbmJveGluLWZpbGwIYm94LWZpbGwQZGF0YWJhc2VzZXQtZmlsbA9sYXllcmdyb3VwLWZpbGwIY3J5LWZpbGwKc21pbGUtZmlsbAt1bmxvY2stZmlsbAlsb2NrLWZpbGwPYWxpZ25yaWdodC1maWxsDmFsaWdubGVmdC1maWxsEWJvcmRlcmJvdHRvbS1maWxsDmJvcmRlcnRvcC1maWxsEGFsaWduY2VudGVyLWZpbGwTYm9yZGVydmVydGljbGUtZmlsbA5waWNjZW50ZXItZmlsbAxwaWNzaWRlLWZpbGwPZm9sZGVyb3Blbi1maWxsD2ZvbGRlcnBsdXMtZmlsbAtmb2xkZXItZmlsbAhmaWxlLVNRTA1maWxlcGx1cy1maWxsCWZpbGUtZmlsbAljb3B5LWZpbGwMaGVhZHNldC1maWxsCnBob25lLWZpbGwQcGF1c2VjaXJjbGUtZmlsbA9zdG9wY2lyY2xlLWZpbGwPcGxheWNpcmNsZS1maWxsC2RlbGV0ZS1maWxsDHBpY3R1cmUtZmlsbAltYWlsLWZpbGwKaGVhcnQtZmlsbA9jb2xsZWN0aW9uLWZpbGwPdXNlci1ncm91cC1maWxsDXVzZXJwbHVzLWZpbGwJdXNlci1maWxsCGNvZy1maWxsCmNsb2NrLWZpbGwQY2FsZW5kYXJhbHQtZmlsbBJjbG91ZGRvd25sb2FkLWZpbGwQY2xvdWR1cGxvYWQtZmlsbA1leGNoYW5nZS1maWxsEGluZm8tY2lyY2xlLWZpbGwUcXVlc3Rpb24tY2lyY2xlLWZpbGwTZXhjbGFtYXRpb25jaXJjbGUtZhFtaW51cy1jaXJjbGUtZmlsbBBwbHVzLWNpcmNsZS1maWxsEXRpbWVzLWNpcmNsZS1maWxsEWNoZWNrLWNpcmNsZS1maWxsEGNvbXByZXNzYWx0LWZpbGwOZXhwYW5kYWx0LWZpbGwGZmlsdGVyA2FsbA1kYXRhYmFzZS1wbHVzCGRhdGFiYXNlDWNvbW1lbnQtbGluZXMMY29tbWVudC1kb3RzC3BhcGVyLXBsYW5lCWV5ZS1zbGFzaANleWUJbGlnaHRidWxiBGZsYWcDdGFnCHBvc2l0aW9uCGxvY2F0aW9uA21hcAhpbmJveC1pbgNib3gMZGF0YWJhc2Utc2V0C2xheWVyLWdyb3VwCHdpbmQtY3J5CndpbmQtc21pbGUGdW5sb2NrBGxvY2sLYWxpZ24tcmlnaHQKYWxpZ24tbGVmdA1ib3JkZXItYm90dG9tCmJvcmRlci10b3AMYWxpZ24tY2VudGVyD2JvcmRlci12ZXJ0aWNsZQpwaWMtY2VudGVyCHBpYy1zaWRlC2ZvbGRlci1vcGVuC2ZvbGRlci1wbHVzBmZvbGRlcglmaWxlLVNRTDEJZmlsZS1wbHVzBGZpbGUEY29weQdoZWFkc2V0BXBob25lC3BhdXNlY2lyY2xlCnN0b3BjaXJjbGUKcGxheWNpcmNsZQZkZWxldGUHcGljdHVyZQRtYWlsBGxpa2UKY29sbGVjdGlvbgp1c2VyLWdyb3VwDGFjY291bnQtcGx1cwdhY2NvdW50A2NvZwVjbG9jawxjYWxlbmRhci1hbHQNY2xvdWRkb3dubG9hZAtjbG91ZHVwbG9hZAhleGNoYW5nZQtpbmZvLWNpcmNsZQ9xdWVzdGlvbi1jaXJjbGUSZXhjbGFtYXRpb24tY2lyY2xlDG1pbnVzLWNpcmNsZQtwbHVzLWNpcmNsZQx0aW1lcy1jaXJjbGUMY2hlY2stY2lyY2xlDGNvbXByZXNzLWFsdApleHBhbmQtYWx0A2JhbgVtaW51cwRwbHVzBXRpbWVzBWNoZWNrDHNlYXJjaC1taW51cwtzZWFyY2gtcGx1cwZzZWFyY2gFcmVwbHkEdW5kbwRyZWRvDWV4dGVybmFsLWxpbmsKYXJyb3dzLWFsdAZpbmRlbnQHb3V0ZGVudAlzb3J0LWxpbmUGc3dpdGNoD3dpbmQtZGVzY2VuZGluZw53aW5kLWFzY2VuZGluZwhkb3dubG9hZAZ1cGxvYWQPYXJyb3ctdG8tYm90dG9tDGFycm93LXRvLXRvcA9sb25nLWFycm93LWRvd24NbG9uZy1hcnJvdy11cAthcnJvdy1yaWdodAphcnJvdy1sZWZ0BHNvcnQJc29ydC1kb3duB3NvcnQtdXALY2FyZXQtcmlnaHQKY2FyZXQtbGVmdAhhcnJvd3MtdhFhbmdsZS1kb3VibGUtZG93bg9hbmdsZS1kb3VibGUtdXASYW5nbGUtZG91YmxlLXJpZ2h0EWFuZ2xlLWRvdWJsZS1sZWZ0CmFuZ2xlLWRvd24IYW5nbGUtdXALYW5nbGUtcmlnaHQKYW5nbGUtbGVmdAlwYXBlcmNsaXAKY29ubmVjdGlvbgh0cmFpbmluZwdwcm9jZXNzBG5ld3MEc2F2ZQVwcmludAxuZXctcmVsZWFzZXMHcmVsZWFzZQVhbGVydAliYWNrc3BhY2UDZ2VtCGludGVncmFsC3N0YXItY2lyY2xlC3VzZXItY2lyY2xlEmNsb3VkLW1hY2hpbmUtZmlsbA1jbG91ZC1tYWNoaW5lDXRlcm1pbmFsLWZpbGwIdGVybWluYWwSc2hvcHBpbmctY2FydC1maWxsCHJlc291cmNlBHJhbmsIc3luYy1hbHQHY29tcGFzcxJhcnJvdy1hbHQtZnJvbS10b3AUYXJyb3ctYWx0LWZyb20tYm90dG8EbWVudQlpY29uLWRyYWcNZWFybHktd2FybmluZwVzaGFyZQZzaGFyZTELbWFuYWdlbWVudC0KYWNjZXNza2V5cxNhcnJvdy1zb3J0ZG93bi1zbWFsEW1pbnVzLXNxdWFyZS1maWxsEHBsdXMtc3F1YXJlLWZpbGwMbWludXMtc3F1YXJlC3BsdXMtc3F1YXJlCHN0ZXBtb2RlDXNjcm9sbGluZ21vZGUMc2hvcHBpbmdjYXJ0DHdhaXRpbmctZmlsbAd3YWl0aW5nEHJpZ2h0LWFycm93LXJlY3QPbGVmdC1hcnJvdy1yZWN0BGJlbGwPc3RydWN0dXJlZC1kYXRhBGRyYWcGdmVjdG9yEWVsbGlwc2lzLXZlcnRpY2FsCE5FVy1jb3B5DGdhbGxlcnktdmlldwhIT1QtY29weQRXSUZJBGhvbWUKYnVnLXJlcG9ydAptb25pdG9yaW5nBnFyY29kZQhkaWFnbm9zZQRzY2FuB2xvYWRpbmcDY3V0DkRpcmVjdG9yeS10cmVlBGdpZnQLYXBwbGljYXRpb24EbGluaxBhcHBsaWNhdGlvbmdyb3VwCHBvd2Vyb2ZmA2tleRJzYWZldHktY2VydGlmaWNhdGUJc3VwZXJ2aXNlDHRhZy1zdWJzY2lwdA1jaGFydC1waWUtYWx0DmNoYXJ0LXJlbGF0aW9uEmNoYXJ0LXNjYXR0ZXItcGxvdApjaGFydC1hcmVhCmNoYXJ0LWxpbmUJY2hhcnQtYmFyAAA=";
  var _sfc_main3 = /* @__PURE__ */ (0, import_vue3.defineComponent)({
    __name: "tm-icon",
    props: __spreadProps3(__spreadValues3({}, custom_props), {
      fontSize: {
        type: [Number],
        default: 34
      },
      color: {
        type: String,
        default: ""
      },
      name: {
        type: String,
        default: ""
      },
      spin: {
        type: [Boolean],
        defalut: true
      },
      unit: {
        type: String,
        default: "rpx"
      },
      lineHeight: {
        type: [Number],
        default: -1
      }
    }),
    emits: ["click", "longpress"],
    setup(__props, { emit: emits }) {
      var _a2, _b2;
      const props = __props;
      var domModule = weex.requireModule("dom");
      const animation = requireNativePlugin("animation");
      const store = useTmpiniaStore();
      const proxy = (_b2 = (_a2 = (0, import_vue3.getCurrentInstance)()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const tmcfg = (0, import_vue3.computed)(() => store.tmStore);
      const customCSSStyle = (0, import_vue3.computed)(() => computedStyle(props));
      const customClass = (0, import_vue3.computed)(() => computedClass(props));
      const isDark = (0, import_vue3.computed)(() => computedDark(props, tmcfg.value));
      (0, import_vue3.computed)(() => computedTheme(props, isDark.value, tmcfg.value));
      function clickhandle(e) {
        emits("click", e);
      }
      const appTextColor = (0, import_vue3.inject)("appTextColor", (0, import_vue3.computed)(() => void 0));
      const textColor = (0, import_vue3.computed)(() => {
        if (props.followTheme && store.tmStore.color)
          return store.tmStore.color;
        let isColorHex = tool.isCssColor(props.color);
        if (isColorHex)
          return props.color;
        if (props.color && !isColorHex) {
          let nowcolor = tool.getColor(props.color);
          return nowcolor.csscolor;
        }
        if (appTextColor.value)
          return appTextColor.value;
        return "rgba(34, 34, 34, 1.0)";
      });
      const fontSizeComputed = (0, import_vue3.computed)(() => {
        return { fontSize: (props.fontSize || 30) + props.unit, lineHeight: props.lineHeight > -1 ? props.lineHeight + props.unit : (props.fontSize || 30) + props.unit };
      });
      const isImg = (0, import_vue3.computed)(() => {
        if (props.name[0] == "." || props.name[0] == "/" || props.name.substring(0, 5) == "data:" || props.name.substring(0, 4) == "http" || props.name.substring(0, 5) == "https" || props.name.substring(0, 3) == "ftp") {
          return true;
        }
        return false;
      });
      const prefx = (0, import_vue3.computed)(() => {
        let prefix = props.name.split("-")[0];
        return prefix;
      });
      const iconComputed = (0, import_vue3.computed)(() => {
        if (isImg.value)
          return props.name;
        let name = props.name.substr(props.name.indexOf("-") + 1);
        let index = uni.$tm.tmicon.findIndex((el) => el.font == prefx.value);
        let itemIcon = uni.$tm.tmicon[index].fontJson.find((item, index2) => {
          return item.font_class == name;
        });
        if (itemIcon) {
          return JSON.parse('"\\u' + String(itemIcon.unicode) + '"');
        }
        return props.name;
      });
      const spinComputed = (0, import_vue3.computed)(() => props.spin);
      const custom_space_size = (0, import_vue3.inject)("custom_space_size", [0, 0]);
      (0, import_vue3.computed)(() => Math.ceil(props.fontSize || 34) + custom_space_size[0]);
      (0, import_vue3.computed)(() => Math.ceil(props.fontSize || 34) + custom_space_size[1]);
      function spinNvueAni(jiaodu = 360) {
        let iconEl = proxy == null ? void 0 : proxy.$refs["icon"];
        if (!iconEl)
          return;
        animation.transition(iconEl, {
          styles: {
            transform: `rotate(${jiaodu}deg)`,
            transformOrigin: "center center"
          },
          duration: 1200,
          timingFunction: "linear",
          delay: 0
        }, () => {
          (0, import_vue3.nextTick)(function() {
            animation.transition(iconEl, {
              styles: {
                transform: `rotate(${0}deg)`,
                transformOrigin: "center center"
              },
              duration: 0,
              timingFunction: "linear",
              delay: 0
            }, () => {
              spinNvueAni();
            });
          });
        });
      }
      (0, import_vue3.watch)(spinComputed, () => {
        if (spinComputed.value) {
          (0, import_vue3.nextTick)(function() {
            spinNvueAni();
          });
        }
      });
      (0, import_vue3.onBeforeMount)(() => {
        domModule.addRule("fontFace", {
          fontFamily: "tmicon",
          src: "url('data:font/ttf;charset=utf-8;base64," + tmiconFont + "')"
        });
      });
      (0, import_vue3.onMounted)(() => {
        if (spinComputed.value) {
          setTimeout(function() {
            spinNvueAni();
          }, 50);
        }
      });
      return (_ctx, _cache) => {
        return (0, import_vue3.openBlock)(), (0, import_vue3.createElementBlock)("view", {
          renderWhole: true,
          class: "flex flex-row flex-row-center-center",
          style: (0, import_vue3.normalizeStyle)([{
            marginRight: (0, import_vue3.unref)(custom_space_size)[0] + "rpx",
            marginBottom: (0, import_vue3.unref)(custom_space_size)[1] + "rpx"
          }])
        }, [
          !(0, import_vue3.unref)(isImg) ? ((0, import_vue3.openBlock)(), (0, import_vue3.createElementBlock)("u-text", {
            key: 0,
            renderWhole: true,
            ref: "icon",
            onClick: clickhandle,
            onLongpress: _cache[0] || (_cache[0] = ($event) => emits("longpress", $event)),
            class: (0, import_vue3.normalizeClass)([(0, import_vue3.unref)(spinComputed) ? "spin" : "", "text-size-n d-inline-block ", "tmicon", (0, import_vue3.unref)(customClass)]),
            style: (0, import_vue3.normalizeStyle)([{ fontFamily: "tmicon", color: (0, import_vue3.unref)(textColor) }, (0, import_vue3.unref)(fontSizeComputed), (0, import_vue3.unref)(customCSSStyle)])
          }, (0, import_vue3.toDisplayString)((0, import_vue3.unref)(iconComputed)), 39)) : (0, import_vue3.createCommentVNode)("v-if", true),
          (0, import_vue3.unref)(isImg) ? ((0, import_vue3.openBlock)(), (0, import_vue3.createElementBlock)("u-image", {
            key: 1,
            renderWhole: true,
            onClick: clickhandle,
            onLongpress: _cache[1] || (_cache[1] = ($event) => emits("longpress", $event)),
            ref: "icon",
            src: (0, import_vue3.unref)(iconComputed),
            class: (0, import_vue3.normalizeClass)([(0, import_vue3.unref)(spinComputed) ? "spin" : "", (0, import_vue3.unref)(customClass)]),
            style: (0, import_vue3.normalizeStyle)([{ width: (props.fontSize || 30) + props.unit, height: (props.fontSize || 30) + props.unit }, (0, import_vue3.unref)(customCSSStyle)])
          }, null, 46, ["src"])) : (0, import_vue3.createCommentVNode)("v-if", true)
        ], 4);
      };
    }
  });
  var tmIcon = /* @__PURE__ */ _export_sfc(_sfc_main3, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-icon/tm-icon.vue"]]);

  // F:/CoinQT/CoinQT_app/unpackage/dist/dev/.nvue/tm-button.js
  var import_vue4 = __toESM(require_vue());
  var __defProp5 = Object.defineProperty;
  var __defProps4 = Object.defineProperties;
  var __getOwnPropDescs4 = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols4 = Object.getOwnPropertySymbols;
  var __hasOwnProp5 = Object.prototype.hasOwnProperty;
  var __propIsEnum4 = Object.prototype.propertyIsEnumerable;
  var __defNormalProp4 = (obj, key, value) => key in obj ? __defProp5(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues4 = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp5.call(b, prop))
        __defNormalProp4(a, prop, b[prop]);
    if (__getOwnPropSymbols4)
      for (var prop of __getOwnPropSymbols4(b)) {
        if (__propIsEnum4.call(b, prop))
          __defNormalProp4(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps4 = (a, b) => __defProps4(a, __getOwnPropDescs4(b));
  var _style_02 = { "button": { "": { "backgroundColor": "rgba(0,0,0,0)", "borderWidth": 0, "borderStyle": "solid", "borderColor": "rgba(0,0,0,0)", "paddingTop": 0, "paddingRight": 0, "paddingBottom": 0, "paddingLeft": 0, "borderRadius": 0 } }, "buttonHover": { "": { "backgroundColor": "rgba(0,0,0,0)" } }, "bhover": { "": { "opacity": 0.7 } } };
  var _sfc_main4 = /* @__PURE__ */ (0, import_vue4.defineComponent)({
    __name: "tm-button",
    props: __spreadProps4(__spreadValues4({}, custom_props), {
      transprent: {
        type: Boolean,
        default: false
      },
      followTheme: {
        type: Boolean,
        default: true
      },
      size: {
        type: String,
        default: "normal"
      },
      fontSize: {
        type: Number,
        default: 0
      },
      fontColor: {
        type: String,
        default: ""
      },
      margin: {
        type: Array,
        default: () => [0, 16]
      },
      padding: {
        type: Array,
        default: () => [0, 0]
      },
      shadow: {
        type: Number,
        default: 2
      },
      width: {
        type: Number,
        default: 0
      },
      height: {
        type: Number,
        default: 0
      },
      block: {
        type: Boolean,
        default: false
      },
      round: {
        type: Number,
        default: 0
      },
      loading: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      url: {
        type: String,
        default: ""
      },
      label: {
        type: String,
        default: ""
      },
      icon: {
        type: String,
        default: ""
      },
      formType: {
        type: String,
        default: ""
      },
      openType: {
        type: String,
        default: ""
      },
      appParameter: {
        type: String,
        default: ""
      },
      sessionFrom: {
        type: String,
        default: ""
      },
      sendMessageTitle: {
        type: String,
        default: ""
      },
      sendMessagePath: {
        type: String,
        default: ""
      },
      sendMessageImg: {
        type: String,
        default: ""
      },
      sendMessageCard: {
        type: String,
        default: ""
      },
      unit: {
        type: String,
        default: "rpx"
      }
    }),
    emits: ["click", "touchstart", "touchmove", "touchcancel", "touchend", "tap", "longpress", "getphonenumber", "getUserInfo", "getUserProfile", "error", "opensetting", "launchapp", "contact"],
    setup(__props, { emit: emits }) {
      var _a2, _b2, _c;
      const props = __props;
      const proxy = (_b2 = (_a2 = (0, import_vue4.getCurrentInstance)()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const formtype = (0, import_vue4.computed)(() => props.formType);
      let FormParent = null;
      if (formtype.value == "reset" || formtype.value == "submit") {
        FormParent = proxy == null ? void 0 : proxy.$parent;
        while (FormParent) {
          if ((FormParent == null ? void 0 : FormParent.tmFormComnameId) == "tmFormId" || !FormParent) {
            break;
          } else {
            FormParent = (_c = FormParent == null ? void 0 : FormParent.$parent) != null ? _c : void 0;
          }
        }
      }
      const customCSSStyle = (0, import_vue4.computed)(() => {
        return __spreadProps4(__spreadValues4({
          height: btnSizeObj.value.h + props.unit
        }, computedStyle(props)), {
          border: "0px solid rgba(0, 0, 0, 0)",
          background: "rgba(0, 0, 0, 0)",
          borderRadius: "0px"
        });
      });
      const customClass = (0, import_vue4.computed)(() => computedClass(props));
      const isclickOn = (0, import_vue4.ref)(false);
      const _load = (0, import_vue4.computed)(() => props.loading);
      const _disabled = (0, import_vue4.computed)(() => props.disabled);
      const _label = (0, import_vue4.computed)(() => props.label);
      const _icon = (0, import_vue4.computed)(() => props.icon);
      const sizeObj = (0, import_vue4.computed)(() => {
        if (props.unit == "px") {
          return {
            block: { w: 0, h: 80, fontSize: 28, round: 3 },
            mini: { w: 44, h: 18, fontSize: 10, round: 2 },
            small: { w: 60, h: 28, fontSize: 11, round: 3 },
            normal: { w: 110, h: 40, fontSize: 14, round: 3 },
            middle: { w: 180, h: 40, fontSize: 15, round: 3 },
            large: { w: 268, h: 44, fontSize: 16, round: 4 }
          };
        }
        return {
          block: { w: 0, h: 80, fontSize: 28, round: 3 },
          mini: { w: 88, h: 36, fontSize: 20, round: 2 },
          small: { w: 120, h: 56, fontSize: 22, round: 3 },
          normal: { w: 220, h: 80, fontSize: 28, round: 3 },
          middle: { w: 360, h: 80, fontSize: 30, round: 3 },
          large: { w: 535, h: 88, fontSize: 32, round: 4 }
        };
      });
      const btnSizeObj = (0, import_vue4.computed)(() => {
        let fontSize = props.fontSize || 0;
        if (props.block) {
          return { w: 0, h: props.height || sizeObj.value.block.h, fontSize: fontSize || sizeObj.value.block.fontSize, round: props.round == -1 ? 0 : props.round || sizeObj.value.normal.round };
        }
        return {
          w: props.width || sizeObj.value[props.size].w,
          h: props.height || sizeObj.value[props.size].h,
          fontSize: fontSize || sizeObj.value[props.size].fontSize,
          round: props.round == -1 ? 0 : props.round || sizeObj.value[props.size].round
        };
      });
      const _fontColor = (0, import_vue4.computed)(() => props.fontColor);
      function touchstart(e) {
        isclickOn.value = true;
        emits("touchstart", e);
      }
      function touchend(e) {
        isclickOn.value = false;
        emits("touchend", e);
      }
      function onclick(e) {
        if (FormParent != null && typeof FormParent != "undefined" && formtype.value && !props.loading) {
          FormParent[formtype.value]();
        }
        emits("click", e);
        if (props.url !== "" && typeof props.url === "string") {
          let url = props.url;
          if (url[0] !== "/")
            url = "/" + url;
          uni.navigateTo({
            url
          });
          return;
        }
        if (props.openType == "getUserInfo" || props.openType == "getUserProfile")
          ;
      }
      return (_ctx, _cache) => {
        const _component_button = (0, import_vue4.resolveComponent)("button");
        return (0, import_vue4.openBlock)(), (0, import_vue4.createBlock)(tmSheet, {
          "no-level": "",
          _style: { opacity: isclickOn.value || (0, import_vue4.unref)(_disabled) ? 0.7 : 1 },
          "hover-class": "none",
          round: (0, import_vue4.unref)(btnSizeObj).round,
          width: (0, import_vue4.unref)(btnSizeObj).w,
          height: (0, import_vue4.unref)(btnSizeObj).h,
          padding: props.padding,
          margin: props.margin,
          color: props.color,
          shadow: props.shadow,
          transprent: props.transprent,
          linear: props.linear,
          "linear-deep": props.linearDeep,
          text: props.text,
          outlined: props.outlined,
          dark: props.dark,
          "follow-dark": props.followDark,
          "follow-theme": props.followTheme,
          "border-direction": props.borderDirection,
          "border-style": props.borderStyle,
          border: props.border,
          blur: props.blur,
          _class: "flex flex-row flex-center "
        }, {
          default: (0, import_vue4.withCtx)(() => [
            (0, import_vue4.createVNode)(_component_button, {
              onClick: onclick,
              onTouchstart: touchstart,
              onTouchend: touchend,
              onLongpress: _cache[0] || (_cache[0] = ($event) => emits("longpress", $event)),
              onTouchcancel: _cache[1] || (_cache[1] = ($event) => {
                isclickOn.value = false;
                emits("touchcancel", $event);
              }),
              onTouchmove: _cache[2] || (_cache[2] = ($event) => emits("touchmove", $event)),
              onGetphonenumber: _cache[3] || (_cache[3] = ($event) => emits("getphonenumber", $event)),
              onError: _cache[4] || (_cache[4] = ($event) => emits("error", $event)),
              onOpensetting: _cache[5] || (_cache[5] = ($event) => emits("opensetting", $event)),
              onLaunchapp: _cache[6] || (_cache[6] = ($event) => emits("launchapp", $event)),
              onContact: _cache[7] || (_cache[7] = ($event) => emits("contact", $event)),
              "form-type": props.formType,
              openType: props.openType,
              appParameter: props.appParameter,
              sessionFrom: props.sessionFrom,
              sendMessageTitle: props.sendMessageTitle,
              sendMessagePath: props.sendMessagePath,
              sendMessageImg: props.sendMessageImg,
              sendMessageCard: props.sendMessageCard,
              loading: (0, import_vue4.unref)(_load),
              disabled: (0, import_vue4.unref)(_disabled),
              "hover-start-time": 1e7,
              "hover-stop-propagation": "",
              "hover-class": "bhover",
              class: (0, import_vue4.normalizeClass)(["button flex-1 flex-center", [(0, import_vue4.unref)(customClass)]]),
              style: (0, import_vue4.normalizeStyle)((0, import_vue4.unref)(customCSSStyle))
            }, {
              default: (0, import_vue4.withCtx)(() => [
                (0, import_vue4.renderSlot)(_ctx.$slots, "default", {}, () => [
                  (0, import_vue4.unref)(_icon) ? ((0, import_vue4.openBlock)(), (0, import_vue4.createBlock)(tmIcon, {
                    key: 0,
                    userInteractionEnabled: false,
                    color: (0, import_vue4.unref)(_fontColor),
                    _class: (0, import_vue4.unref)(_label) ? "pr-10" : "",
                    unit: props.unit,
                    fontSize: (0, import_vue4.unref)(btnSizeObj).fontSize * 0.9,
                    name: (0, import_vue4.unref)(_icon)
                  }, null, 8, ["color", "_class", "unit", "fontSize", "name"])) : (0, import_vue4.createCommentVNode)("v-if", true),
                  (0, import_vue4.createVNode)(tmText, {
                    userInteractionEnabled: false,
                    color: (0, import_vue4.unref)(_fontColor),
                    fontSize: (0, import_vue4.unref)(btnSizeObj).fontSize,
                    unit: props.unit,
                    label: (0, import_vue4.unref)(_label)
                  }, null, 8, ["color", "fontSize", "unit", "label"])
                ])
              ]),
              _: 3
            }, 8, ["form-type", "openType", "appParameter", "sessionFrom", "sendMessageTitle", "sendMessagePath", "sendMessageImg", "sendMessageCard", "loading", "disabled", "class", "style"])
          ]),
          _: 3
        }, 8, ["_style", "round", "width", "height", "padding", "margin", "color", "shadow", "transprent", "linear", "linear-deep", "text", "outlined", "dark", "follow-dark", "follow-theme", "border-direction", "border-style", "border", "blur"]);
      };
    }
  });
  var TmButton = /* @__PURE__ */ _export_sfc(_sfc_main4, [["styles", [_style_02]], ["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-button/tm-button.vue"]]);

  // F:/CoinQT/CoinQT_app/unpackage/dist/dev/.nvue/tm-input.js
  var __defProp6 = Object.defineProperty;
  var __defProps5 = Object.defineProperties;
  var __getOwnPropDescs5 = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols5 = Object.getOwnPropertySymbols;
  var __hasOwnProp6 = Object.prototype.hasOwnProperty;
  var __propIsEnum5 = Object.prototype.propertyIsEnumerable;
  var __defNormalProp5 = (obj, key, value) => key in obj ? __defProp6(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues5 = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp6.call(b, prop))
        __defNormalProp5(a, prop, b[prop]);
    if (__getOwnPropSymbols5)
      for (var prop of __getOwnPropSymbols5(b)) {
        if (__propIsEnum5.call(b, prop))
          __defNormalProp5(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps5 = (a, b) => __defProps5(a, __getOwnPropDescs5(b));
  var _sfc_main5 = /* @__PURE__ */ (0, import_vue5.defineComponent)({
    __name: "tm-input",
    props: __spreadProps5(__spreadValues5({}, custom_props), {
      followTheme: {
        type: [Boolean, String],
        default: true
      },
      color: {
        type: String,
        default: "grey-4"
      },
      focusColor: {
        type: String,
        default: "primary"
      },
      fontColor: {
        type: String,
        default: ""
      },
      text: {
        type: Boolean,
        default: true
      },
      outlined: {
        type: Boolean,
        default: false
      },
      border: {
        type: Number,
        default: 0
      },
      transprent: {
        type: Boolean,
        default: false
      },
      round: {
        type: Number,
        default: 3
      },
      shadow: {
        type: Number,
        default: 0
      },
      margin: {
        type: Array,
        default: () => [0, 0]
      },
      padding: {
        type: Array,
        default: () => [0, 0]
      },
      height: {
        type: Number,
        default: 64
      },
      prefix: {
        type: String,
        default: ""
      },
      prefixLabel: {
        type: String,
        default: ""
      },
      suffix: {
        type: String,
        default: ""
      },
      suffixLabel: {
        type: String,
        default: ""
      },
      fontSize: {
        type: Number,
        default: 30
      },
      search: {
        type: String,
        default: ""
      },
      searchLabel: {
        type: String,
        default: ""
      },
      showClear: {
        type: Boolean,
        default: false
      },
      password: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: "\u8BF7\u8F93\u5165\u5185\u5BB9"
      },
      errorLabel: {
        type: String,
        default: "\u8BF7\u8F93\u5165\u5185\u5BB9"
      },
      align: {
        type: String,
        default: "left"
      },
      modelValue: {
        type: [String, Number],
        default: ""
      },
      inputPadding: {
        type: Array,
        default: () => [24, 0]
      },
      showCharNumber: {
        type: Boolean,
        default: false
      },
      maxlength: {
        type: Number,
        default: -1
      },
      type: {
        type: String,
        default: "text"
      },
      cursorSpacing: {
        type: Number,
        default: 24
      },
      confirmType: {
        type: String,
        default: "done"
      },
      confirmHold: {
        type: Boolean,
        default: false
      },
      autoBlur: {
        type: Boolean,
        default: true
      },
      holdKeyboard: {
        type: Boolean,
        default: false
      },
      adjustPosition: {
        type: Boolean,
        default: true
      },
      focus: {
        type: Boolean,
        default: false
      },
      cursor: {
        type: Number,
        default: 0
      },
      showConfirmBar: {
        type: Boolean,
        default: true
      },
      selectionStart: {
        type: Number,
        default: -1
      },
      selectionEnd: {
        type: Number,
        default: -1
      },
      disableDefaultPadding: {
        type: Boolean,
        default: false
      },
      fixed: {
        type: Boolean,
        default: false
      }
    }),
    emits: ["focus", "blur", "confirm", "input", "update:modelValue", "clear", "search", "keyboardheightchange", "click"],
    setup(__props, { emit: emits }) {
      var _a2, _b2, _c;
      const props = __props;
      const store = useTmpiniaStore();
      const proxy = (_b2 = (_a2 = (0, import_vue5.getCurrentInstance)()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      let parentFormItem = proxy == null ? void 0 : proxy.$parent;
      while (parentFormItem) {
        if ((parentFormItem == null ? void 0 : parentFormItem.tmFormComnameFormItem) == "tmFormComnameFormItem" || !parentFormItem) {
          break;
        } else {
          parentFormItem = (_c = parentFormItem == null ? void 0 : parentFormItem.$parent) != null ? _c : void 0;
        }
      }
      const isAndroid = (0, import_vue5.ref)(false);
      isAndroid.value = uni.getSystemInfoSync().osName == "android" ? true : false;
      const _height = (0, import_vue5.computed)(() => props.height);
      const _inputPadding = (0, import_vue5.computed)(() => {
        if (props.search !== "" || props.searchLabel !== "") {
          return [4, 0];
        }
        return props.inputPadding;
      });
      let timerId = NaN;
      function debounce(func, wait = 500, immediate = false) {
        if (!isNaN(timerId))
          clearTimeout(timerId);
        if (immediate) {
          var callNow = !timerId;
          timerId = setTimeout(() => {
            timerId = NaN;
          }, wait);
          if (callNow)
            typeof func === "function" && func();
        } else {
          timerId = setTimeout(() => {
            typeof func === "function" && func();
          }, wait);
        }
      }
      const propsDetail = (0, import_vue5.computed)(() => {
        return {
          focus: props.focus,
          prefix: props.prefix,
          prefixLabel: props.prefixLabel,
          fontSize: props.fontSize,
          fontSize_px: uni.upx2px(props.fontSize),
          suffix: props.suffix,
          suffixLabel: props.suffixLabel,
          fontColor: props.fontColor,
          search: props.search,
          searchLabel: props.searchLabel,
          showClear: props.showClear,
          password: props.password,
          disabled: props.disabled,
          placeholder: props.placeholder,
          showCharNumber: props.showCharNumber,
          maxlength: props.maxlength,
          cursorSpacing: props.cursorSpacing,
          confirmType: props.confirmType,
          confirmHold: props.confirmHold,
          autoBlur: props.autoBlur,
          holdKeyboard: props.holdKeyboard,
          adjustPosition: props.adjustPosition,
          type: props.type,
          cursor: props.cursor,
          showConfirmBar: props.showConfirmBar,
          selectionStart: props.selectionStart,
          selectionEnd: props.selectionEnd,
          disableDefaultPadding: props.disableDefaultPadding,
          fixed: props.fixed
        };
      });
      const tmcfg = (0, import_vue5.computed)(() => store.tmStore);
      (0, import_vue5.computed)(() => computedStyle(props));
      (0, import_vue5.computed)(() => computedClass(props));
      const isDark = (0, import_vue5.computed)(() => computedDark(props, tmcfg.value));
      const _requiredError = (0, import_vue5.ref)(false);
      const _foucsActive = (0, import_vue5.ref)(props.focus || false);
      (0, import_vue5.watch)(() => props.focus, () => {
        _foucsActive.value = props.focus;
      });
      const _color = (0, import_vue5.computed)(() => {
        let color = props.color;
        if (_foucsActive.value) {
          if (props.followTheme && store.tmStore.color) {
            color = store.tmStore.color;
          } else {
            color = props.focusColor;
          }
        }
        if (_requiredError.value)
          color = "red";
        return color;
      });
      const tmcomputed = (0, import_vue5.computed)(() => {
        const _props = __spreadProps5(__spreadValues5({}, props), { color: _color.value });
        return computedTheme(_props, isDark.value, tmcfg.value);
      });
      const showPasswordText = (0, import_vue5.ref)(propsDetail.value.password);
      const showPasswordIcon = (0, import_vue5.computed)(() => props.password);
      (0, import_vue5.ref)(props.errorLabel);
      const _value = (0, import_vue5.ref)(props.modelValue);
      const _valueLenChar = (0, import_vue5.computed)(() => {
        let str = String(_value.value).split("");
        return str.length;
      });
      (0, import_vue5.watch)(() => props.modelValue, () => _value.value = props.modelValue);
      const rulesObj = (0, import_vue5.inject)("tmFormItemRules", (0, import_vue5.computed)(() => {
        var _a22;
        return [{
          message: (_a22 = props == null ? void 0 : props.errorLabel) != null ? _a22 : "\u8BF7\u586B\u5199\u5FC5\u8981\u7684\u5185\u5BB9",
          required: false,
          validator: false
        }];
      }));
      function searchClick() {
        emits("search", _value.value);
      }
      function clearBtn() {
        _value.value = "";
        emits("update:modelValue", "");
        emits("clear");
      }
      function changeSeePassword() {
        showPasswordText.value = !showPasswordText.value;
      }
      function focus() {
        _foucsActive.value = true;
        emits("focus");
      }
      function blur() {
        _foucsActive.value = false;
        pushFormItem();
        emits("blur");
      }
      function confirm() {
        emits("confirm", _value.value);
      }
      function inputHandler(e) {
        _value.value = e.detail.value;
        emits("input", e.detail.value);
        emits("update:modelValue", e.detail.value);
        return e.detail.value;
      }
      function inputClick(e, type) {
        e.stopPropagation();
        if (type == "ali") {
          debounce(() => emits("click", e), 500, true);
          return;
        }
        debounce(() => emits("click", e), 500, true);
      }
      (0, import_vue5.watch)(_value, () => debounce(pushFormItem, 200));
      const tmFormFun = (0, import_vue5.inject)("tmFormFun", (0, import_vue5.computed)(() => ""));
      const validate = (rules) => {
        rules = rules.map((el) => {
          if (typeof el.validator === "function" && el.required === true) {
            return el;
          } else if (typeof el.validator === "boolean" && el.required === true) {
            return __spreadProps5(__spreadValues5({}, el), {
              validator: (val) => {
                return String(val).length == 0 || typeof val === null ? false : true;
              }
            });
          } else {
            return __spreadProps5(__spreadValues5({}, el), {
              validator: (val) => {
                return true;
              }
            });
          }
        });
        let rules_filter = rules.filter((el) => {
          return typeof el.validator === "function" && el.required === true;
        });
        let rules_fun = rules_filter.map((el) => {
          return new Promise((res, rej) => __async(this, null, function* () {
            if (typeof el.validator === "function") {
              let vr = yield el.validator(_value.value);
              if (vr) {
                res({
                  message: String(el.message),
                  validator: true
                });
              } else {
                rej({
                  message: el.message,
                  validator: false
                });
              }
            } else {
              res({
                message: el.message,
                validator: true
              });
            }
          }));
        });
        return Promise.all(rules_fun);
      };
      function pushFormItem(isCheckVail = true) {
        return __async(this, null, function* () {
          if (parentFormItem) {
            if (isCheckVail) {
              validate((0, import_vue5.toRaw)(rulesObj.value)).then((ev) => {
                parentFormItem.pushCom({
                  value: _value.value,
                  isRequiredError: false,
                  componentsName: "tm-input",
                  message: ev.length == 0 ? "" : ev[0].message
                });
              }).catch((er) => {
                parentFormItem.pushCom({
                  value: _value.value,
                  isRequiredError: true,
                  componentsName: "tm-input",
                  message: er.message
                });
              });
            }
          }
        });
      }
      (0, import_vue5.watch)(tmFormFun, () => {
        if (tmFormFun.value == "validate") {
          pushFormItem();
        }
        if (tmFormFun.value == "reset") {
          _value.value = "";
          _requiredError.value = false;
          emits("update:modelValue", _value.value);
          pushFormItem(false);
        }
        if (tmFormFun.value == "clearValidate") {
          _requiredError.value = false;
          pushFormItem(false);
        }
      });
      pushFormItem(false);
      return (_ctx, _cache) => {
        return (0, import_vue5.openBlock)(), (0, import_vue5.createBlock)(tmSheet, {
          transprent: true,
          margin: props.margin,
          padding: props.padding
        }, {
          default: (0, import_vue5.withCtx)(() => [
            (0, import_vue5.createVNode)(tmSheet, {
              transprent: props.transprent,
              round: props.round,
              "no-level": "",
              margin: [0, 0],
              padding: (0, import_vue5.unref)(_inputPadding),
              border: props.border,
              text: props.text,
              color: (0, import_vue5.unref)(_color),
              outlined: props.outlined,
              shadow: props.shadow,
              linear: props.linear,
              linearDeep: props.linearDeep
            }, {
              default: (0, import_vue5.withCtx)(() => [
                (0, import_vue5.createElementVNode)("view", {
                  class: (0, import_vue5.normalizeClass)(["flex flex-row", [(0, import_vue5.unref)(propsDetail).type == "textarea" ? "flex-row-top-center" : "flex-row-center-center"]]),
                  onClick: _cache[7] || (_cache[7] = ($event) => inputClick($event, "")),
                  style: (0, import_vue5.normalizeStyle)([{ height: `${(0, import_vue5.unref)(_height)}rpx` }])
                }, [
                  (0, import_vue5.unref)(propsDetail).search || (0, import_vue5.unref)(propsDetail).searchLabel ? ((0, import_vue5.openBlock)(), (0, import_vue5.createElementBlock)("view", {
                    key: 0,
                    class: "px-9"
                  })) : (0, import_vue5.createCommentVNode)("v-if", true),
                  (0, import_vue5.renderSlot)(_ctx.$slots, "left"),
                  (0, import_vue5.unref)(propsDetail).prefix ? ((0, import_vue5.openBlock)(), (0, import_vue5.createElementBlock)("view", {
                    key: 1,
                    class: "pr-16"
                  }, [
                    (0, import_vue5.createVNode)(tmIcon, {
                      "font-size": (0, import_vue5.unref)(propsDetail).fontSize,
                      name: (0, import_vue5.unref)(propsDetail).prefix
                    }, null, 8, ["font-size", "name"])
                  ])) : (0, import_vue5.createCommentVNode)("v-if", true),
                  (0, import_vue5.unref)(propsDetail).prefixLabel ? ((0, import_vue5.openBlock)(), (0, import_vue5.createElementBlock)("view", {
                    key: 2,
                    class: "pr-24"
                  }, [
                    (0, import_vue5.createVNode)(tmText, {
                      "font-size": (0, import_vue5.unref)(propsDetail).fontSize,
                      label: (0, import_vue5.unref)(propsDetail).prefixLabel
                    }, null, 8, ["font-size", "label"])
                  ])) : (0, import_vue5.createCommentVNode)("v-if", true),
                  !isAndroid.value ? ((0, import_vue5.openBlock)(), (0, import_vue5.createElementBlock)("view", {
                    key: 3,
                    onClick: _cache[2] || (_cache[2] = (0, import_vue5.withModifiers)(($event) => inputClick($event, "ali"), ["stop"])),
                    class: "flex-1 relative flex-row flex",
                    style: (0, import_vue5.normalizeStyle)([{ width: "0px" }])
                  }, [
                    (0, import_vue5.createCommentVNode)(` <view @click.stop="emits('click',$event)" class=" l-0 t-0 flex-1 " :style="{height: \`\${_height}rpx\`,background:'red'}"></view> `),
                    (0, import_vue5.unref)(propsDetail).type != "textarea" ? ((0, import_vue5.openBlock)(), (0, import_vue5.createElementBlock)("u-input", {
                      key: 0,
                      class: "flex-1",
                      userInteractionEnabled: false,
                      value: _value.value,
                      focus: (0, import_vue5.unref)(propsDetail).focus,
                      onFocus: focus,
                      onBlur: blur,
                      onConfirm: confirm,
                      onInput: inputHandler,
                      onKeyboardheightchange: _cache[0] || (_cache[0] = ($event) => emits("keyboardheightchange")),
                      password: showPasswordText.value,
                      maxlength: (0, import_vue5.unref)(propsDetail).maxlength,
                      disabled: (0, import_vue5.unref)(propsDetail).disabled,
                      cursorSpacing: (0, import_vue5.unref)(propsDetail).cursorSpacing,
                      confirmType: (0, import_vue5.unref)(propsDetail).confirmType,
                      confirmHold: (0, import_vue5.unref)(propsDetail).confirmHold,
                      autoBlur: (0, import_vue5.unref)(propsDetail).autoBlur,
                      holdKeyboard: (0, import_vue5.unref)(propsDetail).holdKeyboard,
                      adjustPosition: (0, import_vue5.unref)(propsDetail).adjustPosition,
                      type: (0, import_vue5.unref)(propsDetail).type,
                      placeholder: (0, import_vue5.unref)(propsDetail).placeholder,
                      style: (0, import_vue5.normalizeStyle)([
                        {
                          height: `${(0, import_vue5.unref)(_height)}rpx`,
                          color: (0, import_vue5.unref)(propsDetail).fontColor ? (0, import_vue5.unref)(propsDetail).fontColor : (0, import_vue5.unref)(tmcomputed).textColor,
                          "text-align": props.align,
                          "fontSize": `${(0, import_vue5.unref)(propsDetail).fontSize_px}px`
                        }
                      ]),
                      placeholderStyle: `fontSize:${(0, import_vue5.unref)(propsDetail).fontSize_px}px`
                    }, null, 44, ["value", "focus", "password", "maxlength", "disabled", "cursorSpacing", "confirmType", "confirmHold", "autoBlur", "holdKeyboard", "adjustPosition", "type", "placeholder", "placeholderStyle"])) : (0, import_vue5.createCommentVNode)("v-if", true),
                    (0, import_vue5.unref)(propsDetail).type == "textarea" ? ((0, import_vue5.openBlock)(), (0, import_vue5.createElementBlock)("u-textarea", {
                      key: 1,
                      userInteractionEnabled: false,
                      value: _value.value,
                      focus: (0, import_vue5.unref)(propsDetail).focus,
                      onFocus: focus,
                      onBlur: blur,
                      onConfirm: confirm,
                      onInput: inputHandler,
                      onKeyboardheightchange: _cache[1] || (_cache[1] = ($event) => emits("keyboardheightchange")),
                      maxlength: (0, import_vue5.unref)(propsDetail).maxlength,
                      disabled: (0, import_vue5.unref)(propsDetail).disabled,
                      placeholder: (0, import_vue5.unref)(propsDetail).placeholder,
                      cursorSpacing: (0, import_vue5.unref)(propsDetail).cursorSpacing,
                      confirmHold: (0, import_vue5.unref)(propsDetail).confirmHold,
                      autoBlur: (0, import_vue5.unref)(propsDetail).autoBlur,
                      holdKeyboard: (0, import_vue5.unref)(propsDetail).holdKeyboard,
                      cursor: (0, import_vue5.unref)(propsDetail).cursor,
                      showConfirmBar: (0, import_vue5.unref)(propsDetail).showConfirmBar,
                      selectionStart: (0, import_vue5.unref)(propsDetail).selectionStart,
                      selectionEnd: (0, import_vue5.unref)(propsDetail).selectionEnd,
                      disableDefaultPadding: (0, import_vue5.unref)(propsDetail).disableDefaultPadding,
                      fixed: (0, import_vue5.unref)(propsDetail).fixed,
                      adjustPosition: (0, import_vue5.unref)(propsDetail).adjustPosition,
                      type: (0, import_vue5.unref)(propsDetail).type,
                      style: (0, import_vue5.normalizeStyle)([
                        {
                          height: `${(0, import_vue5.unref)(_height)}rpx`,
                          width: "auto",
                          "word-break": "break-word",
                          color: (0, import_vue5.unref)(propsDetail).fontColor ? (0, import_vue5.unref)(propsDetail).fontColor : (0, import_vue5.unref)(tmcomputed).textColor,
                          "text-align": props.align,
                          "fontSize": `${(0, import_vue5.unref)(propsDetail).fontSize_px}px`
                        }
                      ]),
                      class: "wrap flex-1 py-12",
                      placeholderStyle: `fontSize:${(0, import_vue5.unref)(propsDetail).fontSize_px}px`
                    }, null, 44, ["value", "focus", "maxlength", "disabled", "placeholder", "cursorSpacing", "confirmHold", "autoBlur", "holdKeyboard", "cursor", "showConfirmBar", "selectionStart", "selectionEnd", "disableDefaultPadding", "fixed", "adjustPosition", "type", "placeholderStyle"])) : (0, import_vue5.createCommentVNode)("v-if", true)
                  ])) : (0, import_vue5.createCommentVNode)("v-if", true),
                  isAndroid.value ? ((0, import_vue5.openBlock)(), (0, import_vue5.createElementBlock)("view", {
                    key: 4,
                    class: "flex-1 relative flex-row flex",
                    style: (0, import_vue5.normalizeStyle)([{ width: "0px" }])
                  }, [
                    (0, import_vue5.createCommentVNode)(` <view @click.stop="emits('click',$event)" class=" l-0 t-0 flex-1 " :style="{height: \`\${_height}rpx\`,background:'red'}"></view> `),
                    (0, import_vue5.unref)(propsDetail).type != "textarea" ? ((0, import_vue5.openBlock)(), (0, import_vue5.createElementBlock)("u-input", {
                      key: 0,
                      class: "flex-1",
                      onClick: _cache[3] || (_cache[3] = (0, import_vue5.withModifiers)(($event) => emits("click", $event), ["stop"])),
                      userInteractionEnabled: false,
                      value: _value.value,
                      focus: (0, import_vue5.unref)(propsDetail).focus,
                      onFocus: focus,
                      onBlur: blur,
                      onConfirm: confirm,
                      onInput: inputHandler,
                      onKeyboardheightchange: _cache[4] || (_cache[4] = ($event) => emits("keyboardheightchange")),
                      password: showPasswordText.value,
                      disabled: (0, import_vue5.unref)(propsDetail).disabled,
                      cursorSpacing: (0, import_vue5.unref)(propsDetail).cursorSpacing,
                      confirmType: (0, import_vue5.unref)(propsDetail).confirmType,
                      confirmHold: (0, import_vue5.unref)(propsDetail).confirmHold,
                      autoBlur: (0, import_vue5.unref)(propsDetail).autoBlur,
                      holdKeyboard: (0, import_vue5.unref)(propsDetail).holdKeyboard,
                      adjustPosition: (0, import_vue5.unref)(propsDetail).adjustPosition,
                      maxlength: (0, import_vue5.unref)(propsDetail).maxlength,
                      type: (0, import_vue5.unref)(propsDetail).type,
                      placeholder: (0, import_vue5.unref)(propsDetail).placeholder,
                      style: (0, import_vue5.normalizeStyle)([
                        {
                          height: `${(0, import_vue5.unref)(_height)}rpx`,
                          color: (0, import_vue5.unref)(propsDetail).fontColor ? (0, import_vue5.unref)(propsDetail).fontColor : (0, import_vue5.unref)(tmcomputed).textColor,
                          "text-align": props.align,
                          "fontSize": `${(0, import_vue5.unref)(propsDetail).fontSize_px}px`
                        }
                      ]),
                      placeholderStyle: `fontSize:${(0, import_vue5.unref)(propsDetail).fontSize_px}px`
                    }, null, 44, ["value", "focus", "password", "disabled", "cursorSpacing", "confirmType", "confirmHold", "autoBlur", "holdKeyboard", "adjustPosition", "maxlength", "type", "placeholder", "placeholderStyle"])) : (0, import_vue5.createCommentVNode)("v-if", true),
                    (0, import_vue5.unref)(propsDetail).type == "textarea" ? ((0, import_vue5.openBlock)(), (0, import_vue5.createElementBlock)("u-textarea", {
                      key: 1,
                      onClick: _cache[5] || (_cache[5] = (0, import_vue5.withModifiers)(($event) => emits("click", $event), ["stop"])),
                      userInteractionEnabled: false,
                      value: _value.value,
                      focus: (0, import_vue5.unref)(propsDetail).focus,
                      onFocus: focus,
                      onBlur: blur,
                      onConfirm: confirm,
                      onInput: inputHandler,
                      onKeyboardheightchange: _cache[6] || (_cache[6] = ($event) => emits("keyboardheightchange")),
                      disabled: (0, import_vue5.unref)(propsDetail).disabled,
                      placeholder: (0, import_vue5.unref)(propsDetail).placeholder,
                      cursorSpacing: (0, import_vue5.unref)(propsDetail).cursorSpacing,
                      confirmHold: (0, import_vue5.unref)(propsDetail).confirmHold,
                      autoBlur: (0, import_vue5.unref)(propsDetail).autoBlur,
                      holdKeyboard: (0, import_vue5.unref)(propsDetail).holdKeyboard,
                      adjustPosition: (0, import_vue5.unref)(propsDetail).adjustPosition,
                      maxlength: (0, import_vue5.unref)(propsDetail).maxlength,
                      autoHeight: (0, import_vue5.unref)(propsDetail).autoHeight,
                      cursor: (0, import_vue5.unref)(propsDetail).cursor,
                      showConfirmBar: (0, import_vue5.unref)(propsDetail).showConfirmBar,
                      selectionStart: (0, import_vue5.unref)(propsDetail).selectionStart,
                      selectionEnd: (0, import_vue5.unref)(propsDetail).selectionEnd,
                      disableDefaultPadding: (0, import_vue5.unref)(propsDetail).disableDefaultPadding,
                      fixed: (0, import_vue5.unref)(propsDetail).fixed,
                      type: (0, import_vue5.unref)(propsDetail).type,
                      style: (0, import_vue5.normalizeStyle)([
                        {
                          height: `${(0, import_vue5.unref)(_height)}rpx`,
                          width: "auto",
                          "word-break": "break-word",
                          color: (0, import_vue5.unref)(propsDetail).fontColor ? (0, import_vue5.unref)(propsDetail).fontColor : (0, import_vue5.unref)(tmcomputed).textColor,
                          "text-align": props.align,
                          "fontSize": `${(0, import_vue5.unref)(propsDetail).fontSize_px}px`
                        }
                      ]),
                      class: "wrap flex-1 py-10",
                      placeholderStyle: `fontSize:${(0, import_vue5.unref)(propsDetail).fontSize_px}px`
                    }, null, 44, ["value", "focus", "disabled", "placeholder", "cursorSpacing", "confirmHold", "autoBlur", "holdKeyboard", "adjustPosition", "maxlength", "autoHeight", "cursor", "showConfirmBar", "selectionStart", "selectionEnd", "disableDefaultPadding", "fixed", "type", "placeholderStyle"])) : (0, import_vue5.createCommentVNode)("v-if", true)
                  ])) : (0, import_vue5.createCommentVNode)("v-if", true),
                  (0, import_vue5.unref)(propsDetail).showClear && (0, import_vue5.unref)(_valueLenChar) > 0 ? ((0, import_vue5.openBlock)(), (0, import_vue5.createElementBlock)("view", {
                    key: 5,
                    class: "pl-16"
                  }, [
                    (0, import_vue5.createVNode)(tmIcon, {
                      onClick: clearBtn,
                      "font-size": (0, import_vue5.unref)(propsDetail).fontSize * 0.9,
                      name: "tmicon-times-circle-fill"
                    }, null, 8, ["font-size"])
                  ])) : (0, import_vue5.createCommentVNode)("v-if", true),
                  _requiredError.value ? ((0, import_vue5.openBlock)(), (0, import_vue5.createElementBlock)("view", {
                    key: 6,
                    class: "pl-16"
                  }, [
                    (0, import_vue5.createVNode)(tmIcon, {
                      "font-size": (0, import_vue5.unref)(propsDetail).fontSize,
                      name: "tmicon-exclamation-circle"
                    }, null, 8, ["font-size"])
                  ])) : (0, import_vue5.createCommentVNode)("v-if", true),
                  (0, import_vue5.unref)(propsDetail).suffix ? ((0, import_vue5.openBlock)(), (0, import_vue5.createElementBlock)("view", {
                    key: 7,
                    class: "pl-16"
                  }, [
                    (0, import_vue5.createVNode)(tmIcon, {
                      "font-size": (0, import_vue5.unref)(propsDetail).fontSize * 0.85,
                      name: (0, import_vue5.unref)(propsDetail).suffix
                    }, null, 8, ["font-size", "name"])
                  ])) : (0, import_vue5.createCommentVNode)("v-if", true),
                  (0, import_vue5.unref)(propsDetail).suffixLabel ? ((0, import_vue5.openBlock)(), (0, import_vue5.createElementBlock)("view", {
                    key: 8,
                    class: "pl-16"
                  }, [
                    (0, import_vue5.createVNode)(tmText, {
                      "font-size": (0, import_vue5.unref)(propsDetail).fontSize,
                      label: (0, import_vue5.unref)(propsDetail).suffixLabel
                    }, null, 8, ["font-size", "label"])
                  ])) : (0, import_vue5.createCommentVNode)("v-if", true),
                  (0, import_vue5.unref)(showPasswordIcon) ? ((0, import_vue5.openBlock)(), (0, import_vue5.createElementBlock)("view", {
                    key: 9,
                    class: "pl-16"
                  }, [
                    (0, import_vue5.createCommentVNode)(" tmicon-eyeslash-fill "),
                    (0, import_vue5.createVNode)(tmIcon, {
                      onClick: changeSeePassword,
                      "font-size": (0, import_vue5.unref)(propsDetail).fontSize,
                      name: showPasswordText.value ? "tmicon-eyeslash-fill" : "tmicon-eye-fill"
                    }, null, 8, ["font-size", "name"])
                  ])) : (0, import_vue5.createCommentVNode)("v-if", true),
                  (0, import_vue5.unref)(propsDetail).showCharNumber && (0, import_vue5.unref)(_valueLenChar) > 0 && (0, import_vue5.unref)(propsDetail).type != "textarea" ? ((0, import_vue5.openBlock)(), (0, import_vue5.createElementBlock)("view", {
                    key: 10,
                    class: "pl-16 flex-row flex"
                  }, [
                    (0, import_vue5.createVNode)(tmText, { label: (0, import_vue5.unref)(_valueLenChar) }, null, 8, ["label"]),
                    (0, import_vue5.unref)(propsDetail).maxlength > 0 ? ((0, import_vue5.openBlock)(), (0, import_vue5.createBlock)(tmText, {
                      key: 0,
                      label: "/" + (0, import_vue5.unref)(propsDetail).maxlength
                    }, null, 8, ["label"])) : (0, import_vue5.createCommentVNode)("v-if", true)
                  ])) : (0, import_vue5.createCommentVNode)("v-if", true),
                  (0, import_vue5.createCommentVNode)(" \u539F\u56E0\u662F\u652F\u4ED8\u5B9D\u5C0F\u7A0B\u5E8F\u81EA\u5E26\u4E86\u8BA1\u6570\u5668\u3002\u4F1A\u5BFC\u81F4\u91CD\u53E0\u3002 "),
                  (0, import_vue5.unref)(propsDetail).showCharNumber && (0, import_vue5.unref)(_valueLenChar) > 0 && (0, import_vue5.unref)(propsDetail).type == "textarea" ? ((0, import_vue5.openBlock)(), (0, import_vue5.createElementBlock)("view", {
                    key: 11,
                    class: "pl-16 flex-row flex absolute r-0 b-12"
                  }, [
                    (0, import_vue5.createVNode)(tmText, { label: (0, import_vue5.unref)(_valueLenChar) }, null, 8, ["label"]),
                    (0, import_vue5.unref)(propsDetail).maxlength > 0 ? ((0, import_vue5.openBlock)(), (0, import_vue5.createBlock)(tmText, {
                      key: 0,
                      label: "/" + (0, import_vue5.unref)(propsDetail).maxlength
                    }, null, 8, ["label"])) : (0, import_vue5.createCommentVNode)("v-if", true)
                  ])) : (0, import_vue5.createCommentVNode)("v-if", true),
                  (0, import_vue5.renderSlot)(_ctx.$slots, "right", {}, () => [
                    (0, import_vue5.unref)(propsDetail).search || (0, import_vue5.unref)(propsDetail).searchLabel ? ((0, import_vue5.openBlock)(), (0, import_vue5.createElementBlock)("view", {
                      key: 0,
                      class: "pl-16"
                    }, [
                      (0, import_vue5.createVNode)(TmButton, {
                        followTheme: props.followTheme,
                        onClick: searchClick,
                        color: props.focusColor,
                        "font-size": 24,
                        height: (0, import_vue5.unref)(_height) - 11,
                        padding: [16, 0],
                        block: "",
                        margin: [0, 0],
                        icon: (0, import_vue5.unref)(propsDetail).search,
                        label: (0, import_vue5.unref)(propsDetail).searchLabel
                      }, null, 8, ["followTheme", "color", "height", "icon", "label"])
                    ])) : (0, import_vue5.createCommentVNode)("v-if", true)
                  ])
                ], 6)
              ]),
              _: 3
            }, 8, ["transprent", "round", "padding", "border", "text", "color", "outlined", "shadow", "linear", "linearDeep"]),
            (0, import_vue5.createCommentVNode)(' <view v-if="propsDetail.showBottomBotder" :class="[`mt-${props.margin[1]*2}`]">\r\n            <tm-divider :margin="[0,0]"></tm-divider>\r\n        </view> '),
            (0, import_vue5.createCommentVNode)(" _requiredError "),
            (0, import_vue5.createCommentVNode)(' <view v-if="false" class="pt-12">\r\n            <tmText :font-size="24" color="red" :label="_errorLabel"></tmText>\r\n        </view> ')
          ]),
          _: 3
        }, 8, ["margin", "padding"]);
      };
    }
  });
  var tmInput = /* @__PURE__ */ _export_sfc(_sfc_main5, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-input/tm-input.vue"]]);

  // F:/CoinQT/CoinQT_app/unpackage/dist/dev/.nvue/tm-radio.js
  var import_vue7 = __toESM(require_vue());

  // F:/CoinQT/CoinQT_app/unpackage/dist/dev/.nvue/tm-translate.js
  var import_vue6 = __toESM(require_vue());
  var __defProp7 = Object.defineProperty;
  var __defProps6 = Object.defineProperties;
  var __getOwnPropDescs6 = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols6 = Object.getOwnPropertySymbols;
  var __hasOwnProp7 = Object.prototype.hasOwnProperty;
  var __propIsEnum6 = Object.prototype.propertyIsEnumerable;
  var __defNormalProp6 = (obj, key, value) => key in obj ? __defProp7(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues6 = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp7.call(b, prop))
        __defNormalProp6(a, prop, b[prop]);
    if (__getOwnPropSymbols6)
      for (var prop of __getOwnPropSymbols6(b)) {
        if (__propIsEnum6.call(b, prop))
          __defNormalProp6(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps6 = (a, b) => __defProps6(a, __getOwnPropDescs6(b));
  var _style_03 = { "fade": { "": { "opacity": 0 } }, "fade-reverse": { "": { "opacity": 1 } }, "up": { "": { "transform": "translateY(0%)" } }, "up-reverse": { "": { "transform": "translateY(-101%)" } }, "down": { "": { "transform": "translateY(0%)" } }, "down-reverse": { "": { "transform": "translateY(101%)" } }, "left": { "": { "transform": "translateX(0%)" } }, "left-reverse": { "": { "transform": "translateX(-101%)" } }, "right": { "": { "transform": "translateX(0%)" } }, "right-reverse": { "": { "transform": "translateX(101%)" } }, "zoom": { "": { "transform": "scale(0.7, 0.7)", "opacity": 0 } }, "zoom-reverse": { "": { "transform": "scale(1, 1)", "opacity": 1 } } };
  var _sfc_main6 = /* @__PURE__ */ (0, import_vue6.defineComponent)({
    __name: "tm-translate",
    props: __spreadProps6(__spreadValues6({}, custom_props), {
      duration: {
        type: Number,
        default: 300
      },
      delay: {
        type: Number,
        default: 0
      },
      name: {
        type: String,
        default: "fade"
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      disabled: {
        type: Boolean,
        default: false
      },
      height: {
        type: [Number, String],
        default: 0
      },
      width: {
        type: [Number, String],
        default: 0
      },
      reverse: {
        type: [Boolean, String],
        default: false
      },
      initByWechat: {
        type: Boolean,
        default: false
      }
    }),
    emits: ["start", "end", "click"],
    setup(__props, { expose, emit: emits }) {
      var _a2, _b2;
      const props = __props;
      requireNativePlugin("bindingx");
      requireNativePlugin("dom");
      const animation = requireNativePlugin("animation");
      function hanlder(e) {
        emits("click", e);
      }
      const proxy = (_b2 = (_a2 = (0, import_vue6.getCurrentInstance)()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const customCSSStyle = (0, import_vue6.computed)(() => computedStyle(props));
      const customClass = (0, import_vue6.computed)(() => computedClass(props));
      const computedHeight = (0, import_vue6.computed)(() => {
        if (!props.height || !Number(props.height)) {
          return 0;
        }
        if (String(props.height).indexOf("px") > -1 || String(props.height).indexOf("rpx") > -1) {
          return String(props.height);
        }
        return String(props.height) + "rpx";
      });
      const computedWidth = (0, import_vue6.computed)(() => {
        if (!props.width) {
          return 0;
        }
        if (String(props.width).indexOf("px") > -1 || String(props.width).indexOf("rpx") > -1) {
          return props.width;
        }
        return props.width + "rpx";
      });
      const animationName = (0, import_vue6.computed)(() => props.name || "fade");
      (0, import_vue6.computed)(() => props.duration);
      const computedReverse = (0, import_vue6.computed)(() => props.reverse);
      const reverseAniPrefxname = (0, import_vue6.computed)(() => computedReverse.value ? "-reverse" : "");
      const animationStatus = (0, import_vue6.ref)(0);
      const tmid = (0, import_vue6.ref)(Number(uni.$tm.u.getUid(3)));
      const isLoadEl = (0, import_vue6.ref)(false);
      const animationData = (0, import_vue6.ref)(null);
      (0, import_vue6.watch)(() => props.initByWechat, () => {
        reset();
      });
      function init() {
        (0, import_vue6.nextTick)(() => {
          isLoadEl.value = true;
          if (props.autoPlay == true && !props.disabled) {
            play();
          }
        });
      }
      function play() {
        if (props.disabled == true)
          return;
        animationStatus.value = 0;
        clearTimeout(tmid.value);
        (0, import_vue6.nextTick)(function() {
          tmid.value = setTimeout(function() {
            nvueAmatons();
          }, 50);
        });
      }
      function stop() {
        if (props.disabled == true)
          return;
        clearTimeout(tmid.value);
        animationStatus.value = 0;
      }
      function reset() {
        stop();
        animationStatus.value = 0;
      }
      expose({
        init,
        play,
        stop,
        reset
      });
      (0, import_vue6.onMounted)(() => init());
      (0, import_vue6.onUnmounted)(() => {
        clearTimeout(tmid.value);
        animationStatus.value = 0;
      });
      function nvueAmatons() {
        var el = proxy.$refs.nvueElAni;
        let propsAni = {};
        if (animationName.value == "fade") {
          propsAni = {
            opacity: computedReverse.value ? 0 : 1,
            transformOrigin: "center center"
          };
        } else if (animationName.value == "up") {
          propsAni = {
            opacity: 1,
            transform: computedReverse.value ? "translateY(0%)" : "translateY(-100%)",
            transformOrigin: "center center"
          };
        } else if (animationName.value == "down") {
          propsAni = {
            opacity: 1,
            transform: computedReverse.value ? "translateY(0%)" : "translateY(100%)",
            transformOrigin: "center center"
          };
        } else if (animationName.value == "right") {
          propsAni = {
            opacity: 1,
            transform: computedReverse.value ? "translateX(0%)" : "translateX(100%)",
            transformOrigin: "center center"
          };
        } else if (animationName.value == "left") {
          propsAni = {
            opacity: 1,
            transform: computedReverse.value ? "translateX(0%)" : "translateX(-100%)",
            transformOrigin: "center center"
          };
        } else if (animationName.value == "zoom") {
          propsAni = {
            opacity: computedReverse.value ? 0 : 1,
            transform: computedReverse.value ? "scale(0.7,0.7)" : "scale(1,1)",
            transformOrigin: "center center"
          };
        }
        emits("start");
        animationStatus.value = 1;
        clearTimeout(tmid.value);
        tmid.value = setTimeout(function() {
          animation.transition(el, {
            styles: propsAni,
            duration: props.duration,
            timingFunction: "ease",
            delay: 0
          }, () => {
            emits("end");
            animationStatus.value = 2;
          });
        }, 20);
      }
      return (_ctx, _cache) => {
        return (0, import_vue6.openBlock)(), (0, import_vue6.createElementBlock)("view", {
          ref: "bodywk",
          onClick: hanlder,
          class: (0, import_vue6.normalizeClass)([(0, import_vue6.unref)(customClass), "overflow"]),
          style: (0, import_vue6.normalizeStyle)([
            (0, import_vue6.unref)(computedHeight) ? { height: (0, import_vue6.unref)(computedHeight) } : "",
            (0, import_vue6.unref)(computedWidth) ? { width: (0, import_vue6.unref)(computedWidth) } : "",
            (0, import_vue6.unref)(customCSSStyle)
          ]),
          renderWhole: true
        }, [
          isLoadEl.value ? ((0, import_vue6.openBlock)(), (0, import_vue6.createElementBlock)("view", {
            key: 0,
            ref: "nvueElAni",
            animation: animationData.value,
            class: (0, import_vue6.normalizeClass)([
              "flex-col flex trani",
              (0, import_vue6.unref)(animationName) + (0, import_vue6.unref)(reverseAniPrefxname),
              (0, import_vue6.unref)(customClass)
            ])
          }, [
            (0, import_vue6.renderSlot)(_ctx.$slots, "default")
          ], 10, ["animation"])) : (0, import_vue6.createCommentVNode)("v-if", true)
        ], 6);
      };
    }
  });
  var tmTranslate = /* @__PURE__ */ _export_sfc(_sfc_main6, [["styles", [_style_03]], ["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-translate/tm-translate.vue"]]);

  // F:/CoinQT/CoinQT_app/unpackage/dist/dev/.nvue/tm-radio.js
  var __defProp8 = Object.defineProperty;
  var __defProps7 = Object.defineProperties;
  var __getOwnPropDescs7 = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols7 = Object.getOwnPropertySymbols;
  var __hasOwnProp8 = Object.prototype.hasOwnProperty;
  var __propIsEnum7 = Object.prototype.propertyIsEnumerable;
  var __defNormalProp7 = (obj, key, value) => key in obj ? __defProp8(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues7 = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp8.call(b, prop))
        __defNormalProp7(a, prop, b[prop]);
    if (__getOwnPropSymbols7)
      for (var prop of __getOwnPropSymbols7(b)) {
        if (__propIsEnum7.call(b, prop))
          __defNormalProp7(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps7 = (a, b) => __defProps7(a, __getOwnPropDescs7(b));
  var _sfc_main$12 = /* @__PURE__ */ (0, import_vue7.defineComponent)({
    __name: "tm-radio-group",
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      defaultValue: {
        type: [String, Number, Boolean],
        default: ""
      },
      modelValue: {
        type: [String, Number, Boolean],
        default: ""
      },
      direction: {
        type: String,
        default: "row"
      },
      align: {
        type: String,
        default: "left"
      },
      model: {
        type: String,
        default: "radio"
      }
    },
    emits: ["update:modelValue", "change"],
    setup(__props, { expose, emit: emits }) {
      var _a2, _b2, _c;
      const props = __props;
      const proxy = (_b2 = (_a2 = (0, import_vue7.getCurrentInstance)()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      let _cacheBoxList = [];
      const _mValue = (0, import_vue7.ref)(props.defaultValue || props.modelValue);
      const _align = (0, import_vue7.computed)(() => {
        let list = {
          left: "flex-row-center-start",
          center: "flex-row-center-center",
          right: "flex-row-center-end"
        };
        return list[props.align];
      });
      const checkBoxkeyId = "tmRadioBoxGroup";
      (0, import_vue7.watch)(() => props.modelValue, () => {
        _mValue.value = props.modelValue;
      }, { deep: true });
      function pushKey(key) {
        _cacheBoxList.push(key);
      }
      (0, import_vue7.nextTick)(() => {
        const _filter_key = _cacheBoxList.filter((el) => el == _mValue.value);
        if (_filter_key.length > 0) {
          _mValue.value = _filter_key[0];
        }
        emits("update:modelValue", _mValue.value);
      });
      function addKey(key) {
        _mValue.value = key;
        emits("change", _mValue.value);
        emits("update:modelValue", _mValue.value);
        pushFormItem();
      }
      const rulesObj = (0, import_vue7.inject)("tmFormItemRules", (0, import_vue7.computed)(() => {
        return [
          {
            message: "\u8BF7\u9009\u62E9",
            required: false,
            validator: false
          }
        ];
      }));
      let parentFormItem = proxy == null ? void 0 : proxy.$parent;
      while (parentFormItem) {
        if ((parentFormItem == null ? void 0 : parentFormItem.tmFormComnameFormItem) == "tmFormComnameFormItem" || !parentFormItem) {
          break;
        } else {
          parentFormItem = (_c = parentFormItem == null ? void 0 : parentFormItem.$parent) != null ? _c : void 0;
        }
      }
      const validate = (rules) => {
        rules = rules.map((el) => {
          if (typeof el.validator === "function" && el.required === true) {
            return el;
          } else if (typeof el.validator === "boolean" && el.required === true) {
            return __spreadProps7(__spreadValues7({}, el), {
              validator: (val) => {
                return String(val).length == 0 || typeof val === null ? false : true;
              }
            });
          } else {
            return __spreadProps7(__spreadValues7({}, el), {
              validator: (val) => {
                return true;
              }
            });
          }
        });
        let rules_filter = rules.filter((el) => {
          return typeof el.validator === "function" && el.required === true;
        });
        let rules_fun = rules_filter.map((el) => {
          return new Promise((res, rej) => __async(this, null, function* () {
            if (typeof el.validator === "function") {
              let vr = yield el.validator(_mValue.value);
              if (vr) {
                res({
                  message: String(el.message),
                  validator: true
                });
              } else {
                rej({
                  message: el.message,
                  validator: false
                });
              }
            } else {
              res({
                message: el.message,
                validator: true
              });
            }
          }));
        });
        return Promise.all(rules_fun);
      };
      function pushFormItem(isCheckVail = true) {
        return __async(this, null, function* () {
          if (parentFormItem) {
            if (isCheckVail) {
              validate((0, import_vue7.toRaw)(rulesObj.value)).then((ev) => {
                parentFormItem == null ? void 0 : parentFormItem.pushCom({
                  value: _mValue.value,
                  isRequiredError: false,
                  componentsName: "tm-radio-group",
                  message: ev.length == 0 ? "" : ev[0].message
                });
              }).catch((er) => {
                parentFormItem == null ? void 0 : parentFormItem.pushCom({
                  value: _mValue.value,
                  isRequiredError: true,
                  componentsName: "tm-radio-group",
                  message: er.message
                });
              });
            }
          }
        });
      }
      pushFormItem();
      (0, import_vue7.provide)("tmRadioBoxDisabled", (0, import_vue7.computed)(() => props.disabled));
      (0, import_vue7.provide)("tmRadioBoxVal", (0, import_vue7.computed)(() => _mValue.value));
      (0, import_vue7.provide)("tmRadioBoxModel", (0, import_vue7.computed)(() => props.model == "radio"));
      expose({ pushKey, addKey, checkBoxkeyId });
      return (_ctx, _cache) => {
        return (0, import_vue7.openBlock)(), (0, import_vue7.createElementBlock)("view", {
          class: (0, import_vue7.normalizeClass)(["flex", [props.direction == "row" ? "flex-row  flex-wrap" : "flex-col", (0, import_vue7.unref)(_align)]]),
          renderWhole: true
        }, [
          (0, import_vue7.renderSlot)(_ctx.$slots, "default")
        ], 2);
      };
    }
  });
  var tmRadioGroup = /* @__PURE__ */ _export_sfc(_sfc_main$12, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-radio-group/tm-radio-group.vue"]]);
  var _sfc_main7 = /* @__PURE__ */ (0, import_vue7.defineComponent)({
    __name: "tm-radio",
    props: __spreadProps7(__spreadValues7({}, custom_props), {
      followTheme: {
        type: [Boolean, String],
        default: true
      },
      size: {
        type: Number,
        default: 42
      },
      transprent: {
        type: Boolean,
        default: false
      },
      custom: {
        type: Boolean,
        default: true
      },
      color: {
        type: String,
        default: "primary"
      },
      round: {
        type: Number,
        default: 24
      },
      border: {
        type: Number,
        default: 2
      },
      value: {
        type: [String, Number, Boolean],
        default: ""
      },
      modelValue: {
        type: [String, Number, Boolean],
        default: ""
      },
      label: {
        type: [String, Number],
        default: ""
      },
      defaultChecked: {
        type: [Boolean],
        default: false
      },
      beforChecked: {
        type: [Function, String, Boolean],
        default: () => {
          return false;
        }
      },
      disabled: {
        type: Boolean,
        default: false
      },
      fontSize: {
        type: Number,
        default: 26
      },
      icon: {
        type: String,
        default: "tmicon-check"
      }
    }),
    emits: ["update:modelValue", "change", "click"],
    setup(__props, { emit: emits }) {
      var _a2, _b2, _c, _d;
      const props = __props;
      const proxy = (_b2 = (_a2 = (0, import_vue7.getCurrentInstance)()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const _checked = (0, import_vue7.ref)((_c = props.defaultChecked) != null ? _c : false);
      const _groupCheckedVal = (0, import_vue7.inject)("tmRadioBoxVal", (0, import_vue7.computed)(() => ""));
      const tmCheckedBoxDisabled = (0, import_vue7.inject)("tmRadioBoxDisabled", (0, import_vue7.computed)(() => false));
      const _is_radio = (0, import_vue7.inject)("tmRadioBoxModel", (0, import_vue7.computed)(() => false));
      const _disabled = (0, import_vue7.computed)(() => props.disabled || tmCheckedBoxDisabled.value);
      let parent = proxy == null ? void 0 : proxy.$parent;
      while (parent) {
        if ((parent == null ? void 0 : parent.checkBoxkeyId) == "tmRadioBoxGroup" || !parent) {
          break;
        } else {
          parent = (_d = parent == null ? void 0 : parent.$parent) != null ? _d : void 0;
        }
      }
      if (parent) {
        parent.pushKey(props.value);
      }
      const tmFormFun = (0, import_vue7.inject)("tmFormFun", (0, import_vue7.computed)(() => ""));
      (0, import_vue7.watch)(tmFormFun, () => {
        if (tmFormFun.value == "reset") {
          emits("update:modelValue", "");
          if (parent) {
            parent == null ? void 0 : parent.addKey("");
          }
          _checked.value = false;
        }
      });
      function vailChecked() {
        let checked_val = false;
        if (props.modelValue === props.value && typeof props.value !== "undefined" && props.value !== "" && props.modelValue !== "") {
          checked_val = true;
        }
        if (props.value === _groupCheckedVal.value && _groupCheckedVal.value !== "" && props.value !== "") {
          checked_val = true;
        }
        return checked_val;
      }
      if (vailChecked()) {
        _checked.value = true;
        emits("update:modelValue", props.value);
      }
      function hanlerClick() {
        return __async(this, null, function* () {
          if (_disabled.value || _checked.value) {
            return;
          }
          if (typeof props.beforChecked === "function") {
            uni.showLoading({
              title: "...",
              mask: true
            });
            let p = yield props.beforChecked();
            if (typeof p === "function") {
              p = yield p();
            }
            uni.hideLoading();
            if (!p)
              return;
          }
          _checked.value = true;
          if (parent) {
            parent.addKey(props.value);
          }
          emits("update:modelValue", props.value);
          emits("change", _checked.value);
        });
      }
      (0, import_vue7.watch)([() => props.modelValue, _groupCheckedVal], () => {
        _checked.value = vailChecked();
      });
      return (_ctx, _cache) => {
        return (0, import_vue7.openBlock)(), (0, import_vue7.createElementBlock)("view", {
          class: (0, import_vue7.normalizeClass)(["flex flex-col flex-wrap overflow", [(0, import_vue7.unref)(_disabled) ? "opacity-5" : ""]]),
          style: { "flex-wrap": "wrap" },
          renderWhole: true
        }, [
          (0, import_vue7.createElementVNode)("view", {
            onClick: hanlerClick,
            class: "flex flex-row flex-row-center-start flex-1"
          }, [
            props.custom ? ((0, import_vue7.openBlock)(), (0, import_vue7.createBlock)(tmSheet, {
              key: 0,
              linear: props.linear,
              linearDeep: props.linearDeep,
              followTheme: props.followTheme,
              followDark: props.followDark,
              dark: props.dark,
              shadow: props.shadow,
              userInteractionEnabled: false,
              width: (0, import_vue7.unref)(_is_radio) ? props.size : 0,
              height: (0, import_vue7.unref)(_is_radio) ? props.size : 0,
              text: !_checked.value,
              border: props.border,
              "border-style": props.borderStyle,
              transprent: props.transprent,
              padding: (0, import_vue7.unref)(_is_radio) ? [0, 0] : [16, 10],
              margin: (0, import_vue7.unref)(_is_radio) ? [16, 8] : [8, 8],
              color: (0, import_vue7.unref)(_disabled) ? "grey-2" : props.color,
              round: props.round,
              _class: "flex-row flex-row-center-center"
            }, {
              default: (0, import_vue7.withCtx)(() => [
                _checked.value && (0, import_vue7.unref)(_is_radio) ? ((0, import_vue7.openBlock)(), (0, import_vue7.createBlock)(tmTranslate, {
                  key: 0,
                  duration: 100,
                  name: "zoom",
                  style: { "line-height": "1" }
                }, {
                  default: (0, import_vue7.withCtx)(() => [
                    (0, import_vue7.createVNode)(tmIcon, {
                      "font-size": props.size * 0.54,
                      name: props.icon
                    }, null, 8, ["font-size", "name"])
                  ]),
                  _: 1
                })) : (0, import_vue7.createCommentVNode)("v-if", true),
                !(0, import_vue7.unref)(_is_radio) ? ((0, import_vue7.openBlock)(), (0, import_vue7.createBlock)(tmText, {
                  key: 1,
                  "font-size": props.fontSize,
                  label: props.label
                }, null, 8, ["font-size", "label"])) : (0, import_vue7.createCommentVNode)("v-if", true)
              ]),
              _: 1
            }, 8, ["linear", "linearDeep", "followTheme", "followDark", "dark", "shadow", "width", "height", "text", "border", "border-style", "transprent", "padding", "margin", "color", "round"])) : (0, import_vue7.createCommentVNode)("v-if", true),
            (0, import_vue7.createElementVNode)("view", { userInteractionEnabled: false }, [
              (0, import_vue7.renderSlot)(_ctx.$slots, "default", {}, () => [
                (0, import_vue7.createElementVNode)("view", {
                  class: "flex-1 flex-row flex-row-cneter-cneter",
                  style: { "flex-wrap": "wrap" }
                }, [
                  (0, import_vue7.unref)(_is_radio) ? ((0, import_vue7.openBlock)(), (0, import_vue7.createBlock)(tmText, {
                    key: 0,
                    class: "flex-1 flex-wrap",
                    "font-size": props.fontSize,
                    label: props.label
                  }, null, 8, ["font-size", "label"])) : (0, import_vue7.createCommentVNode)("v-if", true)
                ])
              ])
            ])
          ])
        ], 2);
      };
    }
  });
  var tmRadio = /* @__PURE__ */ _export_sfc(_sfc_main7, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-radio/tm-radio.vue"]]);

  // F:/CoinQT/CoinQT_app/unpackage/dist/dev/.nvue/tm-checkbox-group.js
  var import_vue8 = __toESM(require_vue());
  var __defProp9 = Object.defineProperty;
  var __defProps8 = Object.defineProperties;
  var __getOwnPropDescs8 = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols8 = Object.getOwnPropertySymbols;
  var __hasOwnProp9 = Object.prototype.hasOwnProperty;
  var __propIsEnum8 = Object.prototype.propertyIsEnumerable;
  var __defNormalProp8 = (obj, key, value) => key in obj ? __defProp9(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues8 = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp9.call(b, prop))
        __defNormalProp8(a, prop, b[prop]);
    if (__getOwnPropSymbols8)
      for (var prop of __getOwnPropSymbols8(b)) {
        if (__propIsEnum8.call(b, prop))
          __defNormalProp8(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps8 = (a, b) => __defProps8(a, __getOwnPropDescs8(b));
  var _sfc_main8 = /* @__PURE__ */ (0, import_vue8.defineComponent)({
    __name: "tm-checkbox-group",
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      max: {
        type: Number,
        default: 999
      },
      defaultValue: {
        type: Array,
        default: () => []
      },
      align: {
        type: String,
        default: "left"
      },
      modelValue: {
        type: Array,
        default: () => []
      },
      direction: {
        type: String,
        default: "row"
      }
    },
    emits: ["update:modelValue", "change"],
    setup(__props, { expose, emit: emits }) {
      var _a2, _b2, _c;
      const props = __props;
      const proxy = (_b2 = (_a2 = (0, import_vue8.getCurrentInstance)()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      let _cacheBoxList = [];
      const _mValue = (0, import_vue8.ref)([.../* @__PURE__ */ new Set([...props.defaultValue, ...props.modelValue])]);
      const _align = (0, import_vue8.computed)(() => {
        let list = {
          left: "flex-row-center-start",
          center: "flex-row-center-center",
          right: "flex-row-center-end"
        };
        return list[props.align];
      });
      const checkBoxkeyId = "tmCheckBoxGroup";
      (0, import_vue8.watch)(() => props.modelValue, () => {
        _mValue.value = props.modelValue;
      }, { deep: true });
      const _maxChecked = (0, import_vue8.computed)(() => _mValue.value.length >= props.max);
      function pushKey(key) {
        _cacheBoxList.push(key);
      }
      (0, import_vue8.nextTick)(() => {
        let a = new Set(_mValue.value);
        let b = new Set(_cacheBoxList);
        const _filter_key = new Set([...b].filter((x) => a.has(x)));
        _mValue.value = [..._filter_key];
        emits("update:modelValue", _mValue.value);
      });
      function addKey(key) {
        let seletedKeys = new Set(_mValue.value);
        seletedKeys.add(key);
        _mValue.value = [...seletedKeys];
        emits("change", _mValue.value);
        emits("update:modelValue", _mValue.value);
        pushFormItem();
      }
      function delKey(key) {
        let seletedKeys = new Set(_mValue.value);
        seletedKeys.delete(key);
        _mValue.value = [...seletedKeys];
        emits("change", _mValue.value);
        emits("update:modelValue", _mValue.value);
        pushFormItem();
      }
      const rulesObj = (0, import_vue8.inject)("tmFormItemRules", (0, import_vue8.computed)(() => {
        return [
          {
            message: "\u8BF7\u9009\u62E9",
            required: false,
            validator: false
          }
        ];
      }));
      let parentFormItem = proxy == null ? void 0 : proxy.$parent;
      while (parentFormItem) {
        if ((parentFormItem == null ? void 0 : parentFormItem.tmFormComnameFormItem) == "tmFormComnameFormItem" || !parentFormItem) {
          break;
        } else {
          parentFormItem = (_c = parentFormItem == null ? void 0 : parentFormItem.$parent) != null ? _c : void 0;
        }
      }
      const validate = (rules) => {
        rules = rules.map((el) => {
          if (typeof el.validator === "function" && el.required === true) {
            return el;
          } else if (typeof el.validator === "boolean" && el.required === true) {
            return __spreadProps8(__spreadValues8({}, el), {
              validator: (val) => {
                return String(val).length == 0 ? false : true;
              }
            });
          } else {
            return __spreadProps8(__spreadValues8({}, el), {
              validator: (val) => {
                return true;
              }
            });
          }
        });
        let rules_filter = rules.filter((el) => {
          return typeof el.validator === "function" && el.required === true;
        });
        let rules_fun = rules_filter.map((el) => {
          return new Promise((res, rej) => __async(this, null, function* () {
            if (typeof el.validator === "function") {
              let vr = yield el.validator(_mValue.value);
              if (vr) {
                res({
                  message: String(el.message),
                  validator: true
                });
              } else {
                rej({
                  message: el.message,
                  validator: false
                });
              }
            } else {
              res({
                message: el.message,
                validator: true
              });
            }
          }));
        });
        return Promise.all(rules_fun);
      };
      function pushFormItem(isCheckVail = true) {
        return __async(this, null, function* () {
          if (parentFormItem) {
            if (isCheckVail) {
              validate((0, import_vue8.toRaw)(rulesObj.value)).then((ev) => {
                parentFormItem.pushCom({
                  value: _mValue.value,
                  isRequiredError: false,
                  componentsName: "tm-checkbox-group",
                  message: ev.length == 0 ? "" : ev[0].message
                });
              }).catch((er) => {
                parentFormItem.pushCom({
                  value: _mValue.value,
                  isRequiredError: true,
                  componentsName: "tm-checkbox-group",
                  message: er.message
                });
              });
            }
          }
        });
      }
      pushFormItem();
      (0, import_vue8.provide)("tmCheckedBoxDisabled", (0, import_vue8.computed)(() => props.disabled));
      (0, import_vue8.provide)("tmCheckedBoxVal", (0, import_vue8.computed)(() => _mValue.value));
      (0, import_vue8.provide)("tmCheckedBoxMax", _maxChecked);
      expose({ pushKey, addKey, delKey, checkBoxkeyId });
      return (_ctx, _cache) => {
        return (0, import_vue8.openBlock)(), (0, import_vue8.createElementBlock)("view", {
          class: (0, import_vue8.normalizeClass)(["flex", [props.direction == "row" ? "flex-row " : "flex-col", (0, import_vue8.unref)(_align)]]),
          style: { flexWrap: "wrap" },
          renderWhole: true
        }, [
          (0, import_vue8.renderSlot)(_ctx.$slots, "default")
        ], 2);
      };
    }
  });
  var tmCheckboxGroup = /* @__PURE__ */ _export_sfc(_sfc_main8, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-checkbox-group/tm-checkbox-group.vue"]]);

  // F:/CoinQT/CoinQT_app/unpackage/dist/dev/.nvue/tm-checkbox.js
  var import_vue9 = __toESM(require_vue());
  var __defProp10 = Object.defineProperty;
  var __defProps9 = Object.defineProperties;
  var __getOwnPropDescs9 = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols9 = Object.getOwnPropertySymbols;
  var __hasOwnProp10 = Object.prototype.hasOwnProperty;
  var __propIsEnum9 = Object.prototype.propertyIsEnumerable;
  var __defNormalProp9 = (obj, key, value) => key in obj ? __defProp10(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues9 = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp10.call(b, prop))
        __defNormalProp9(a, prop, b[prop]);
    if (__getOwnPropSymbols9)
      for (var prop of __getOwnPropSymbols9(b)) {
        if (__propIsEnum9.call(b, prop))
          __defNormalProp9(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps9 = (a, b) => __defProps9(a, __getOwnPropDescs9(b));
  var _sfc_main9 = /* @__PURE__ */ (0, import_vue9.defineComponent)({
    __name: "tm-checkbox",
    props: __spreadProps9(__spreadValues9({}, custom_props), {
      followTheme: {
        type: [Boolean, String],
        default: true
      },
      size: {
        type: Number,
        default: 42
      },
      custom: {
        type: Boolean,
        default: true
      },
      transprent: {
        type: Boolean,
        default: false
      },
      color: {
        type: String,
        default: "primary"
      },
      round: {
        type: Number,
        default: 2
      },
      border: {
        type: Number,
        default: 2
      },
      value: {
        type: [String, Number, Boolean],
        default: true
      },
      modelValue: {
        type: [String, Number, Boolean],
        default: false
      },
      label: {
        type: [String, Number],
        default: ""
      },
      defaultChecked: {
        type: [Boolean],
        default: false
      },
      beforChecked: {
        type: [Function, String, Boolean],
        default: () => {
          return false;
        }
      },
      disabled: {
        type: Boolean,
        default: false
      },
      fontSize: {
        type: Number,
        default: 28
      },
      indeterminate: {
        type: [Boolean, String],
        default: false
      },
      closeAni: {
        type: [Boolean, String],
        default: false
      },
      icon: {
        type: String,
        default: "tmicon-check"
      }
    }),
    emits: ["update:modelValue", "change", "click"],
    setup(__props, { emit: emits }) {
      var _a2, _b2, _c, _d;
      const props = __props;
      (0, import_vue9.ref)(null);
      const proxy = (_b2 = (_a2 = (0, import_vue9.getCurrentInstance)()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const _checked = (0, import_vue9.ref)((_c = props.defaultChecked) != null ? _c : false);
      const _groupCheckedVal = (0, import_vue9.inject)("tmCheckedBoxVal", (0, import_vue9.computed)(() => []));
      const tmCheckedBoxDisabled = (0, import_vue9.inject)("tmCheckedBoxDisabled", (0, import_vue9.computed)(() => false));
      const tmCheckedBoxMax = (0, import_vue9.inject)("tmCheckedBoxMax", (0, import_vue9.computed)(() => false));
      const _disabled = (0, import_vue9.computed)(() => props.disabled || tmCheckedBoxDisabled.value);
      let parent = proxy == null ? void 0 : proxy.$parent;
      while (parent) {
        if ((parent == null ? void 0 : parent.checkBoxkeyId) == "tmCheckBoxGroup" || !parent) {
          break;
        } else {
          parent = (_d = parent == null ? void 0 : parent.$parent) != null ? _d : void 0;
        }
      }
      if (parent) {
        parent.pushKey(props.value);
      }
      const tmFormFun = (0, import_vue9.inject)("tmFormFun", (0, import_vue9.computed)(() => ""));
      (0, import_vue9.watch)(tmFormFun, () => {
        if (tmFormFun.value == "reset") {
          emits("update:modelValue", "");
          if (parent) {
            parent == null ? void 0 : parent.delKey(props.value);
          }
          _checked.value = false;
        }
      });
      function vailChecked() {
        let checked_val = false;
        if (props.modelValue === props.value && typeof props.value !== "undefined" && props.value !== "" && props.modelValue !== "") {
          checked_val = true;
        }
        let index = _groupCheckedVal.value.findIndex((el) => el === props.value);
        if (index > -1) {
          checked_val = true;
        }
        return checked_val;
      }
      if (vailChecked()) {
        _checked.value = true;
        emits("update:modelValue", props.value);
      }
      function hanlerClick() {
        return __async(this, null, function* () {
          if (_disabled.value) {
            return;
          }
          if (tmCheckedBoxMax.value && !_checked.value) {
            uni.showToast({ title: "\u8D85\u6700\u5927\u9009\u62E9", icon: "error" });
            return;
          }
          if (typeof props.beforChecked === "function") {
            uni.showLoading({ title: "...", mask: true });
            let p = yield props.beforChecked();
            if (typeof p === "function") {
              p = yield p();
            }
            uni.hideLoading();
            if (!p)
              return;
          }
          _checked.value = !_checked.value;
          if (_checked.value) {
            emits("update:modelValue", props.value);
            if (parent) {
              parent.addKey(props.value);
            }
          } else {
            emits("update:modelValue", false);
            if (parent) {
              parent.delKey(props.value);
            }
          }
          emits("change", _checked.value);
        });
      }
      (0, import_vue9.watch)([() => props.modelValue, _groupCheckedVal], () => {
        _checked.value = vailChecked();
      });
      return (_ctx, _cache) => {
        return (0, import_vue9.openBlock)(), (0, import_vue9.createElementBlock)("view", {
          class: (0, import_vue9.normalizeClass)(["flex flex-row", [(0, import_vue9.unref)(_disabled) ? "opacity-5" : ""]]),
          renderWhole: true
        }, [
          (0, import_vue9.createElementVNode)("view", {
            onClick: hanlerClick,
            class: "flex flex-row flex-row-center-start flex-1"
          }, [
            props.custom ? ((0, import_vue9.openBlock)(), (0, import_vue9.createBlock)(tmSheet, {
              key: 0,
              eventPenetrationEnabled: true,
              linear: props.linear,
              linearDeep: props.linearDeep,
              followTheme: props.followTheme,
              followDark: props.followDark,
              dark: props.dark,
              shadow: props.shadow,
              width: props.size,
              height: props.size,
              text: !props.indeterminate && !_checked.value || (0, import_vue9.unref)(_disabled),
              border: props.border,
              borderStyle: props.borderStyle,
              transprent: props.transprent,
              padding: [0, 0],
              margin: [16, 8],
              color: (0, import_vue9.unref)(_disabled) ? "white" : props.color,
              round: props.round,
              _class: "flex-row flex-row-center-center"
            }, {
              default: (0, import_vue9.withCtx)(() => [
                !props.closeAni ? ((0, import_vue9.openBlock)(), (0, import_vue9.createElementBlock)("view", { key: 0 }, [
                  _checked.value && !props.indeterminate ? ((0, import_vue9.openBlock)(), (0, import_vue9.createBlock)(tmTranslate, {
                    key: 0,
                    duration: 100,
                    name: "zoom",
                    style: { "line-height": "1" }
                  }, {
                    default: (0, import_vue9.withCtx)(() => [
                      (0, import_vue9.createVNode)(tmIcon, {
                        "font-size": props.size * 0.54,
                        name: props.icon
                      }, null, 8, ["font-size", "name"])
                    ]),
                    _: 1
                  })) : (0, import_vue9.createCommentVNode)("v-if", true),
                  props.indeterminate ? ((0, import_vue9.openBlock)(), (0, import_vue9.createBlock)(tmTranslate, {
                    key: 1,
                    duration: 100,
                    name: "zoom",
                    style: { "line-height": "1" }
                  }, {
                    default: (0, import_vue9.withCtx)(() => [
                      (0, import_vue9.createVNode)(tmIcon, {
                        "font-size": props.size * 0.54,
                        name: "tmicon-minus"
                      }, null, 8, ["font-size"])
                    ]),
                    _: 1
                  })) : (0, import_vue9.createCommentVNode)("v-if", true)
                ])) : (0, import_vue9.createCommentVNode)("v-if", true),
                props.closeAni ? ((0, import_vue9.openBlock)(), (0, import_vue9.createElementBlock)("view", { key: 1 }, [
                  _checked.value && !props.indeterminate ? ((0, import_vue9.openBlock)(), (0, import_vue9.createBlock)(tmIcon, {
                    key: 0,
                    "font-size": props.size * 0.54,
                    name: props.icon
                  }, null, 8, ["font-size", "name"])) : (0, import_vue9.createCommentVNode)("v-if", true),
                  props.indeterminate ? ((0, import_vue9.openBlock)(), (0, import_vue9.createBlock)(tmIcon, {
                    key: 1,
                    "font-size": props.size * 0.54,
                    name: "tmicon-minus"
                  }, null, 8, ["font-size"])) : (0, import_vue9.createCommentVNode)("v-if", true)
                ])) : (0, import_vue9.createCommentVNode)("v-if", true)
              ]),
              _: 1
            }, 8, ["linear", "linearDeep", "followTheme", "followDark", "dark", "shadow", "width", "height", "text", "border", "borderStyle", "transprent", "color", "round"])) : (0, import_vue9.createCommentVNode)("v-if", true),
            (0, import_vue9.renderSlot)(_ctx.$slots, "default", {}, () => [
              (0, import_vue9.createVNode)(tmText, {
                userInteractionEnabled: false,
                "font-size": props.fontSize,
                label: props.label
              }, null, 8, ["font-size", "label"])
            ])
          ])
        ], 2);
      };
    }
  });
  var TmCheckbox = /* @__PURE__ */ _export_sfc(_sfc_main9, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-checkbox/tm-checkbox.vue"]]);

  // F:/CoinQT/CoinQT_app/unpackage/dist/dev/.nvue/tm-rate.js
  var import_vue10 = __toESM(require_vue());
  var __defProp11 = Object.defineProperty;
  var __defProps10 = Object.defineProperties;
  var __getOwnPropDescs10 = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols10 = Object.getOwnPropertySymbols;
  var __hasOwnProp11 = Object.prototype.hasOwnProperty;
  var __propIsEnum10 = Object.prototype.propertyIsEnumerable;
  var __defNormalProp10 = (obj, key, value) => key in obj ? __defProp11(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues10 = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp11.call(b, prop))
        __defNormalProp10(a, prop, b[prop]);
    if (__getOwnPropSymbols10)
      for (var prop of __getOwnPropSymbols10(b)) {
        if (__propIsEnum10.call(b, prop))
          __defNormalProp10(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps10 = (a, b) => __defProps10(a, __getOwnPropDescs10(b));
  var _sfc_main10 = /* @__PURE__ */ (0, import_vue10.defineComponent)({
    __name: "tm-rate",
    props: __spreadProps10(__spreadValues10({}, custom_props), {
      count: {
        type: Number,
        default: 5
      },
      modelvalue: {
        type: Number,
        default: 0
      },
      defaultValue: {
        type: Number,
        default: 0
      },
      readonly: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      icon: {
        type: String,
        default: "tmicon-collection-fill"
      },
      size: {
        type: Number,
        default: 42
      },
      color: {
        type: [Array, String],
        default: "orange"
      },
      gutter: {
        type: Number,
        default: 16
      },
      followTheme: {
        type: [Boolean, String],
        default: true
      },
      dark: {
        type: [Boolean, String],
        default: false
      },
      followDark: {
        type: [Boolean, String],
        default: true
      },
      label: {
        type: String,
        default: ""
      },
      showLabel: {
        type: Boolean,
        default: false
      }
    }),
    emits: ["click", "change", "update:modelValue"],
    setup(__props, { emit: emits }) {
      var _a2, _b2, _c;
      const props = __props;
      const store = useTmpiniaStore();
      const proxy = (_b2 = (_a2 = (0, import_vue10.getCurrentInstance)()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const _count = (0, import_vue10.computed)(() => props.count);
      const _start = (0, import_vue10.ref)(props.defaultValue);
      const tmcfg = (0, import_vue10.computed)(() => store.tmStore);
      const isDark = (0, import_vue10.computed)(() => computedDark(props, tmcfg.value));
      const _color = (0, import_vue10.computed)(() => {
        if (props.followTheme && tmcfg.value.color)
          return tmcfg.value.color;
        if (typeof props.color == "string")
          return props.color;
        if (Array.isArray(props.color)) {
          if (props.color[_start.value - 1]) {
            return props.color[_start.value - 1];
          }
          return props.color[props.color.length - 1];
        }
        return "grey-2";
      });
      const _label = (0, import_vue10.computed)(() => {
        if (props.label != "")
          return props.label;
        return _start.value + ".0";
      });
      (0, import_vue10.watch)(() => props.modelvalue, () => {
        let valueStart = props.modelvalue >= _count.value ? _count.value : props.modelvalue;
        _start.value = valueStart <= 0 ? 0 : valueStart;
      });
      function startClick(index) {
        if (props.disabled)
          return;
        if (props.readonly) {
          emits("click", index - 1);
          return;
        }
        _start.value = index;
        emits("change", _start.value);
        emits("update:modelValue", _start.value);
        emits("click", index - 1);
        pushFormItem();
      }
      const rulesObj = (0, import_vue10.inject)("tmFormItemRules", (0, import_vue10.computed)(() => {
        return [
          {
            message: "\u8BF7\u9009\u62E9",
            required: false,
            validator: false
          }
        ];
      }));
      let parentFormItem = proxy.$parent;
      while (parentFormItem) {
        if ((parentFormItem == null ? void 0 : parentFormItem.tmFormComnameFormItem) == "tmFormComnameFormItem" || !parentFormItem) {
          break;
        } else {
          parentFormItem = (_c = parentFormItem == null ? void 0 : parentFormItem.$parent) != null ? _c : void 0;
        }
      }
      const validate = (rules) => {
        rules = rules.map((el) => {
          if (typeof el.validator === "function" && el.required === true) {
            return el;
          } else if (typeof el.validator === "boolean" && el.required === true) {
            return __spreadProps10(__spreadValues10({}, el), {
              validator: (val) => {
                return val == 0 ? false : true;
              }
            });
          } else {
            return __spreadProps10(__spreadValues10({}, el), {
              validator: (val) => {
                return true;
              }
            });
          }
        });
        let rules_filter = rules.filter((el) => {
          return typeof el.validator === "function" && el.required === true;
        });
        let rules_fun = rules_filter.map((el) => {
          return new Promise((res, rej) => __async(this, null, function* () {
            if (typeof el.validator === "function") {
              let vr = yield el.validator(_start.value);
              if (vr) {
                res({
                  message: String(el.message),
                  validator: true
                });
              } else {
                rej({
                  message: el.message,
                  validator: false
                });
              }
            } else {
              res({
                message: el.message,
                validator: true
              });
            }
          }));
        });
        return Promise.all(rules_fun);
      };
      function pushFormItem(isCheckVail = true) {
        return __async(this, null, function* () {
          if (parentFormItem) {
            if (isCheckVail) {
              validate((0, import_vue10.toRaw)(rulesObj.value)).then((ev) => {
                parentFormItem.pushCom({
                  value: _start.value,
                  isRequiredError: false,
                  componentsName: "tm-rate",
                  message: ev.length == 0 ? "" : ev[0].message
                });
              }).catch((er) => {
                parentFormItem.pushCom({
                  value: _start.value,
                  isRequiredError: true,
                  componentsName: "tm-rate",
                  message: er.message
                });
              });
            }
          }
        });
      }
      pushFormItem();
      const tmFormFun = (0, import_vue10.inject)("tmFormFun", (0, import_vue10.computed)(() => ""));
      (0, import_vue10.watch)(tmFormFun, () => {
        if (tmFormFun.value == "reset") {
          _start.value = 0;
          emits("update:modelValue", _start.value);
          pushFormItem(false);
        }
      });
      return (_ctx, _cache) => {
        return (0, import_vue10.openBlock)(), (0, import_vue10.createElementBlock)("view", {
          class: "flex flex-row flex-row-center-start",
          onClick: _cache[0] || (_cache[0] = (0, import_vue10.withModifiers)(() => {
          }, ["stop"])),
          renderWhole: true
        }, [
          ((0, import_vue10.openBlock)(true), (0, import_vue10.createElementBlock)(import_vue10.Fragment, null, (0, import_vue10.renderList)((0, import_vue10.unref)(_count), (item, index) => {
            return (0, import_vue10.openBlock)(), (0, import_vue10.createElementBlock)("view", {
              key: item,
              class: (0, import_vue10.normalizeClass)([`pr-${__props.gutter}`, props.disabled ? "opacity-5" : ""])
            }, [
              (0, import_vue10.createVNode)(tmIcon, {
                "follow-dark": false,
                color: item <= _start.value ? (0, import_vue10.unref)(_color) : "grey-2",
                onClick: ($event) => startClick(item),
                "font-size": props.size,
                name: props.icon
              }, null, 8, ["color", "onClick", "font-size", "name"])
            ], 2);
          }), 128)),
          (0, import_vue10.renderSlot)(_ctx.$slots, "default", {}, () => [
            __props.showLabel ? ((0, import_vue10.openBlock)(), (0, import_vue10.createBlock)(tmText, {
              key: 0,
              dark: (0, import_vue10.unref)(isDark),
              color: (0, import_vue10.unref)(_color),
              label: (0, import_vue10.unref)(_label)
            }, null, 8, ["dark", "color", "label"])) : (0, import_vue10.createCommentVNode)("v-if", true)
          ])
        ]);
      };
    }
  });
  var tmRate = /* @__PURE__ */ _export_sfc(_sfc_main10, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-rate/tm-rate.vue"]]);

  // F:/CoinQT/CoinQT_app/unpackage/dist/dev/.nvue/tm-slider.js
  var import_vue11 = __toESM(require_vue());
  var __defProp12 = Object.defineProperty;
  var __defProps11 = Object.defineProperties;
  var __getOwnPropDescs11 = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols11 = Object.getOwnPropertySymbols;
  var __hasOwnProp12 = Object.prototype.hasOwnProperty;
  var __propIsEnum11 = Object.prototype.propertyIsEnumerable;
  var __defNormalProp11 = (obj, key, value) => key in obj ? __defProp12(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues11 = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp12.call(b, prop))
        __defNormalProp11(a, prop, b[prop]);
    if (__getOwnPropSymbols11)
      for (var prop of __getOwnPropSymbols11(b)) {
        if (__propIsEnum11.call(b, prop))
          __defNormalProp11(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps11 = (a, b) => __defProps11(a, __getOwnPropDescs11(b));
  var _sfc_main$4 = /* @__PURE__ */ (0, import_vue11.defineComponent)({
    __name: "slider-bar",
    props: {
      followTheme: {
        type: [Boolean, String],
        default: true
      },
      size: {
        type: Number,
        default: 6
      },
      x: {
        type: Number,
        dfault: 0
      },
      width: {
        type: Number,
        dfault: 0
      },
      color: {
        type: String,
        default: "primary"
      },
      direction: {
        type: String,
        default: "vertical"
      }
    },
    setup(__props) {
      const props = __props;
      const _sizePx = (0, import_vue11.computed)(() => uni.upx2px(props.size));
      return (_ctx, _cache) => {
        return (0, import_vue11.openBlock)(), (0, import_vue11.createElementBlock)("view", {
          style: (0, import_vue11.normalizeStyle)([
            props.direction == "horizontal" ? { width: props.width + "px", height: props.size + "rpx", left: props.x + "px", top: -props.size + "rpx" } : { height: props.width + "px", width: props.size + "rpx", top: props.x + "px" }
          ]),
          class: (0, import_vue11.normalizeClass)([
            props.direction == "horizontal" ? "flex flex-col" : "flex flex-row absolute"
          ]),
          renderWhole: true
        }, [
          (0, import_vue11.createVNode)(tmSheet, {
            followTheme: props.followTheme,
            round: 10,
            unit: "px",
            color: props.color,
            linear: "right",
            width: props.direction == "horizontal" ? props.width : (0, import_vue11.unref)(_sizePx),
            height: props.direction == "horizontal" ? (0, import_vue11.unref)(_sizePx) : props.width,
            margin: [0, 0],
            padding: [0, 0]
          }, null, 8, ["followTheme", "color", "width", "height"])
        ], 6);
      };
    }
  });
  var sliderBar = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-slider/slider-bar.vue"]]);
  var _sfc_main$3 = /* @__PURE__ */ (0, import_vue11.defineComponent)({
    __name: "slider-button",
    props: {
      followTheme: {
        type: [Boolean, String],
        default: true
      },
      size: {
        type: Number,
        default: 32
      },
      x: {
        type: Number,
        dfault: 0
      },
      color: {
        type: String,
        default: "primary"
      },
      direction: {
        type: String,
        default: "vertical"
      }
    },
    emits: ["movestart", "moveing", "moveend"],
    setup(__props, { emit: emits }) {
      const props = __props;
      const _x = (0, import_vue11.computed)(() => props.x);
      let timerId = NaN;
      function debounce(func, wait = 500, immediate = false) {
        if (!isNaN(timerId))
          clearTimeout(timerId);
        if (immediate) {
          var callNow = !timerId;
          timerId = setTimeout(() => {
            timerId = NaN;
          }, wait);
          if (callNow)
            typeof func === "function" && func();
        } else {
          timerId = setTimeout(() => {
            typeof func === "function" && func();
          }, wait);
        }
      }
      function movestart(e) {
        let etype = e.type.toLocaleLowerCase();
        let ex = 0;
        let ey = 0;
        if (etype == "mousedown") {
          ex = e.pageX;
          ey = e.pageY;
        } else if (etype == "touchstart") {
          ex = e.changedTouches[0].pageX;
          ey = e.changedTouches[0].pageY;
        }
        emits("movestart", { x: ex, y: ey });
      }
      function moveing(e) {
        let etype = e.type.toLocaleLowerCase();
        let ex = 0;
        let ey = 0;
        if (etype == "mousemove") {
          ex = e.pageX;
          ey = e.pageY;
        } else if (etype == "touchmove") {
          ex = e.changedTouches[0].pageX;
          ey = e.changedTouches[0].pageY;
        }
        debounce(() => {
          emits("moveing", { x: ex, y: ey });
        }, 5, false);
        e.preventDefault();
        e.stopPropagation();
      }
      function moveend(e) {
        let etype = e.type.toLocaleLowerCase();
        let ex = 0;
        let ey = 0;
        if (etype == "mouseup" || etype == "mouseleave") {
          ex = e.pageX;
          ey = e.pageY;
        } else if (etype == "touchend") {
          ex = e.changedTouches[0].pageX;
          ey = e.changedTouches[0].pageY;
        }
        emits("moveend", { x: ex, y: ey });
      }
      return (_ctx, _cache) => {
        return (0, import_vue11.openBlock)(), (0, import_vue11.createElementBlock)("view", {
          onTouchstart: (0, import_vue11.withModifiers)(movestart, ["stop"]),
          onMousedown: (0, import_vue11.withModifiers)(movestart, ["stop"]),
          onTouchmove: (0, import_vue11.withModifiers)(moveing, ["stop"]),
          onMousemove: (0, import_vue11.withModifiers)(moveing, ["stop"]),
          onTouchend: (0, import_vue11.withModifiers)(moveend, ["stop"]),
          onMouseup: (0, import_vue11.withModifiers)(moveend, ["stop"]),
          onMouseleave: (0, import_vue11.withModifiers)(moveend, ["stop"]),
          class: "absolute",
          style: (0, import_vue11.normalizeStyle)([
            props.direction == "horizontal" ? { width: props.size + "rpx", height: props.size + "rpx", transform: `translateX(${(0, import_vue11.unref)(_x)}px)`, top: "0px" } : "",
            props.direction == "vertical" ? { width: props.size + "rpx", height: props.size + "rpx", transform: `translateY(${(0, import_vue11.unref)(_x)}px)`, left: 0 + "rpx", top: "0px" } : ""
          ]),
          renderWhole: true
        }, [
          (0, import_vue11.createVNode)(tmSheet, {
            followTheme: props.followTheme,
            text: "",
            border: 4,
            userInteractionEnabled: false,
            color: props.color,
            round: 24,
            width: props.size,
            height: props.size,
            margin: [0, 0],
            padding: [0, 0]
          }, null, 8, ["followTheme", "color", "width", "height"])
        ], 44, ["onTouchstart", "onMousedown", "onTouchmove", "onMousemove", "onTouchend", "onMouseup", "onMouseleave"]);
      };
    }
  });
  var sliderButton = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-slider/slider-button.vue"]]);
  var _sfc_main$2 = /* @__PURE__ */ (0, import_vue11.defineComponent)({
    __name: "slider-label",
    props: {
      direction: {
        type: String,
        default: "horizontal"
      },
      width: {
        type: Number,
        default: 0
      },
      height: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 100
      },
      min: {
        type: Number,
        default: 0
      },
      step: {
        type: Number,
        default: 0
      },
      size: {
        type: Number,
        default: 32
      }
    },
    setup(__props) {
      const props = __props;
      const _stepArray = (0, import_vue11.computed)(() => {
        let label = [];
        if (props.step == 0)
          return [];
        let _step = props.max / props.step;
        for (let i = 1; i <= props.step; i++) {
          label.push(i * _step);
        }
        return [props.min, ...label];
      });
      return (_ctx, _cache) => {
        return (0, import_vue11.openBlock)(), (0, import_vue11.createElementBlock)(import_vue11.Fragment, null, [
          (0, import_vue11.createCommentVNode)(" \u5E95\u90E8\u663E\u793A\u7684\u6807\u7B7E "),
          (0, import_vue11.createElementVNode)("view", {
            class: (0, import_vue11.normalizeClass)(["flex flex-between", [props.direction == "vertical" ? "flex-col" : "flex-row"]]),
            style: (0, import_vue11.normalizeStyle)([
              props.direction == "horizontal" ? { width: __props.width + "rpx" } : { height: __props.height + "rpx" }
            ])
          }, [
            props.direction == "horizontal" ? ((0, import_vue11.openBlock)(true), (0, import_vue11.createElementBlock)(import_vue11.Fragment, { key: 0 }, (0, import_vue11.renderList)((0, import_vue11.unref)(_stepArray), (item, index) => {
              return (0, import_vue11.openBlock)(), (0, import_vue11.createElementBlock)("view", {
                class: (0, import_vue11.normalizeClass)(["flex flex-row", [index == 0 ? "flex-row-top-start" : "", index == (0, import_vue11.unref)(_stepArray).length - 1 ? "flex-row-top-end" : "", index < (0, import_vue11.unref)(_stepArray).length - 1 && index > 0 ? "flex-row-top-center" : ""]]),
                style: { "width": "80rpx" },
                key: index
              }, [
                (0, import_vue11.createVNode)(tmText, {
                  "font-size": 24,
                  label: item
                }, null, 8, ["label"])
              ], 2);
            }), 128)) : (0, import_vue11.createCommentVNode)("v-if", true),
            props.direction != "horizontal" ? ((0, import_vue11.openBlock)(true), (0, import_vue11.createElementBlock)(import_vue11.Fragment, { key: 1 }, (0, import_vue11.renderList)((0, import_vue11.unref)(_stepArray), (item, index) => {
              return (0, import_vue11.openBlock)(), (0, import_vue11.createElementBlock)("view", {
                class: "flex flex-row flex-row-center-start",
                style: { "width": "80rpx" },
                key: index
              }, [
                (0, import_vue11.createVNode)(tmText, {
                  "font-size": 24,
                  label: item
                }, null, 8, ["label"])
              ]);
            }), 128)) : (0, import_vue11.createCommentVNode)("v-if", true)
          ], 6)
        ], 2112);
      };
    }
  });
  var sliderLabel = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-slider/slider-label.vue"]]);
  var _sfc_main$13 = /* @__PURE__ */ (0, import_vue11.defineComponent)({
    __name: "slider-mask",
    props: {
      followTheme: {
        type: [Boolean, String],
        default: true
      },
      direction: {
        type: String,
        default: "horizontal"
      },
      width: {
        type: Number,
        default: 0
      },
      height: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 100
      },
      min: {
        type: Number,
        default: 0
      },
      step: {
        type: Number,
        default: 0
      },
      size: {
        type: Number,
        default: 32
      },
      color: {
        type: String,
        default: "primary"
      }
    },
    setup(__props) {
      const props = __props;
      const _stepArray = (0, import_vue11.computed)(() => {
        let label = [];
        if (props.step == 0)
          return [];
        let _step = props.max / props.step;
        for (let i = 1; i <= props.step; i++) {
          label.push(i * _step);
        }
        return [props.min, ...label];
      });
      return (_ctx, _cache) => {
        return (0, import_vue11.openBlock)(), (0, import_vue11.createElementBlock)(import_vue11.Fragment, null, [
          (0, import_vue11.createCommentVNode)(" \u5E95\u90E8\u663E\u793A\u7684\u6807\u7B7E "),
          (0, import_vue11.createElementVNode)("view", {
            class: (0, import_vue11.normalizeClass)(["flex flex-between absolute", [props.direction == "vertical" ? "flex-col " : "flex-row"]]),
            style: (0, import_vue11.normalizeStyle)([
              props.direction == "horizontal" ? { width: __props.width + "rpx", top: (props.size - 12) / 2 - 2 + "rpx" } : { height: __props.height + "rpx", top: "0px", left: (props.size - 12) / 2 + 2 + "rpx" }
            ])
          }, [
            props.direction == "horizontal" ? ((0, import_vue11.openBlock)(true), (0, import_vue11.createElementBlock)(import_vue11.Fragment, { key: 0 }, (0, import_vue11.renderList)((0, import_vue11.unref)(_stepArray), (item, index) => {
              return (0, import_vue11.openBlock)(), (0, import_vue11.createElementBlock)("view", {
                class: (0, import_vue11.normalizeClass)(["flex flex-row", [index == 0 ? "flex-row-top-start" : "", index == (0, import_vue11.unref)(_stepArray).length - 1 ? "flex-row-top-end" : "", index < (0, import_vue11.unref)(_stepArray).length - 1 && index > 0 ? "flex-row-top-center" : ""]]),
                style: { "width": "80rpx" },
                key: index
              }, [
                (0, import_vue11.createVNode)(tmSheet, {
                  followTheme: props.followTheme,
                  color: props.color,
                  round: 6,
                  margin: [0, 0],
                  padding: [0, 0],
                  width: 12,
                  height: 12,
                  text: "",
                  border: 1
                }, null, 8, ["followTheme", "color"])
              ], 2);
            }), 128)) : (0, import_vue11.createCommentVNode)("v-if", true),
            props.direction != "horizontal" ? ((0, import_vue11.openBlock)(true), (0, import_vue11.createElementBlock)(import_vue11.Fragment, { key: 1 }, (0, import_vue11.renderList)((0, import_vue11.unref)(_stepArray), (item, index) => {
              return (0, import_vue11.openBlock)(), (0, import_vue11.createElementBlock)("view", {
                translate: true,
                class: "flex flex-row flex-row-center-start",
                style: { "width": "80rpx" },
                key: index
              }, [
                (0, import_vue11.createVNode)(tmSheet, {
                  followTheme: props.followTheme,
                  round: 6,
                  margin: [0, 0],
                  padding: [0, 0],
                  width: 12,
                  height: 12,
                  color: "primary",
                  text: "",
                  border: 1
                }, null, 8, ["followTheme"])
              ]);
            }), 128)) : (0, import_vue11.createCommentVNode)("v-if", true)
          ], 6)
        ], 2112);
      };
    }
  });
  var sliderMask = /* @__PURE__ */ _export_sfc(_sfc_main$13, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-slider/slider-mask.vue"]]);
  var _sfc_main11 = /* @__PURE__ */ (0, import_vue11.defineComponent)({
    __name: "tm-slider",
    props: {
      followTheme: {
        type: [Boolean, String],
        default: true
      },
      width: {
        type: Number,
        default: 500
      },
      height: {
        type: Number,
        default: 8
      },
      buttonSize: {
        type: Number,
        default: 46
      },
      direction: {
        type: String,
        default: "horizontal"
      },
      color: {
        type: String,
        default: "primary"
      },
      bgColor: {
        type: String,
        default: "grey-3"
      },
      max: {
        type: Number,
        default: 100
      },
      min: {
        type: Number,
        default: 0
      },
      defaultValue: {
        type: [Array, Number],
        default: 0
      },
      modelValue: {
        type: [Array, Number],
        default: 0
      },
      formart: {
        type: Function,
        default: () => {
          return (val) => {
            return val;
          };
        }
      },
      showLabel: {
        type: Boolean,
        default: false
      },
      step: {
        type: Number,
        default: 5
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    emits: ["update:modelValue", "change"],
    setup(__props, { emit: emits }) {
      var _a2, _b2, _c;
      const props = __props;
      const dom = requireNativePlugin("dom");
      const btn0 = (0, import_vue11.ref)(null);
      const btn1 = (0, import_vue11.ref)(null);
      const proxy = (_b2 = (_a2 = (0, import_vue11.getCurrentInstance)()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const width = (0, import_vue11.computed)(() => uni.upx2px(props.width));
      const isDarg = (0, import_vue11.ref)(false);
      const _disabled = (0, import_vue11.computed)(() => props.disabled);
      const btnPos = (0, import_vue11.ref)([
        {
          x: 0,
          y: 0
        },
        {
          x: 0,
          y: 0
        }
      ]);
      let _x = 0;
      let buttonStaticsLeft = 0;
      let buttonStaticsMaxLeft = width.value;
      const isNvue = (0, import_vue11.ref)(false);
      const nvueDetailPos = (0, import_vue11.ref)({ left: 0, bottom: 0 });
      isNvue.value = true;
      const _sliderBarCssWidth = (0, import_vue11.computed)(() => {
        if (props.direction == "horizontal")
          return props.width + props.buttonSize;
        return props.buttonSize;
      });
      const _sliderBarCssHeight = (0, import_vue11.computed)(() => {
        if (props.direction == "horizontal")
          return props.buttonSize;
        return props.width + props.buttonSize;
      });
      const BtnIndex = (0, import_vue11.ref)(0);
      const showDetail = (0, import_vue11.ref)(false);
      const _valueMax = (0, import_vue11.computed)(() => {
        return props.max - props.min;
      });
      const _barWidth = (0, import_vue11.computed)(() => {
        return Math.abs(btnPos.value[0].x - btnPos.value[1].x);
      });
      const _barLet = (0, import_vue11.computed)(() => {
        return Math.min(Math.abs(btnPos.value[0].x), Math.abs(btnPos.value[1].x));
      });
      const _value = (0, import_vue11.ref)(0);
      const isDablue = (0, import_vue11.ref)(false);
      if (typeof props.defaultValue == "object" && Array.isArray(props.defaultValue)) {
        isDablue.value = true;
      }
      zhuanghuaValue();
      (0, import_vue11.watchEffect)(() => {
        let val = Math.ceil(Math.abs(btnPos.value[BtnIndex.value].x) / uni.upx2px(props.width) * _valueMax.value + props.min);
        if (typeof props.formart === "function") {
          let p = props.formart(val);
          if (typeof p === "function") {
            p = p(val);
          }
          val = p;
        }
        _value.value = val;
      });
      emits("update:modelValue", getValue());
      (0, import_vue11.watch)(() => props.modelValue, () => {
        if (!isDablue.value) {
          btnPos.value[0].x = Math.abs(Number(props.modelValue) / _valueMax.value * uni.upx2px(props.width));
        } else {
          btnPos.value[0].x = Math.abs(Number(props.modelValue[0]) / _valueMax.value * uni.upx2px(props.width));
          btnPos.value[1].x = Math.abs(Number(props.modelValue[1]) / _valueMax.value * uni.upx2px(props.width));
        }
      });
      function zhuanghuaValue() {
        if (!isDablue.value) {
          let vsp = Number(props.defaultValue);
          vsp = vsp >= _valueMax.value ? _valueMax.value : vsp;
          vsp = vsp <= props.min ? props.min : vsp;
          let vl = Math.abs(vsp / _valueMax.value * uni.upx2px(props.width));
          btnPos.value[0].x = vl;
        } else {
          let vsp_0 = Number(props.defaultValue[0]);
          vsp_0 = vsp_0 >= _valueMax.value ? _valueMax.value : vsp_0;
          vsp_0 = vsp_0 <= props.min ? props.min : vsp_0;
          let vl_0 = Math.abs(vsp_0 / _valueMax.value * uni.upx2px(props.width));
          btnPos.value[0].x = vl_0;
          let vsp_1 = Number(props.defaultValue[1]);
          vsp_1 = vsp_1 >= _valueMax.value ? _valueMax.value : vsp_1;
          vsp_1 = vsp_1 <= props.min ? props.min : vsp_1;
          let vl_1 = Math.abs(vsp_1 / _valueMax.value * uni.upx2px(props.width));
          btnPos.value[1].x = vl_1;
        }
      }
      function getValue() {
        if (!isDablue.value) {
          return Math.ceil(Math.abs(btnPos.value[0].x) / uni.upx2px(props.width) * _valueMax.value + props.min);
        } else {
          return [
            Math.ceil(Math.abs(btnPos.value[0].x) / uni.upx2px(props.width) * _valueMax.value + props.min),
            Math.ceil(Math.abs(btnPos.value[1].x) / uni.upx2px(props.width) * _valueMax.value + props.min)
          ];
        }
      }
      function butnMoveStart(e, index) {
        if (props.disabled)
          return;
        isDarg.value = true;
        if (props.direction == "horizontal") {
          _x = e.x - btnPos.value[index].x;
        } else {
          _x = e.y - btnPos.value[index].x;
        }
        BtnIndex.value = index;
      }
      function butnMove(e, index) {
        if (props.disabled)
          return;
        if (!isDarg.value)
          return;
        let left = e.x - _x;
        if (props.direction != "horizontal") {
          left = e.y - _x;
        }
        if (left < buttonStaticsLeft) {
          left = buttonStaticsLeft;
        } else if (left > buttonStaticsMaxLeft) {
          left = buttonStaticsMaxLeft;
        }
        btnPos.value[index].x = left;
        showDetail.value = true;
        getDomRectBound();
      }
      function butnMoveEnd(e, index) {
        if (props.disabled)
          return;
        isDarg.value = false;
        showDetail.value = false;
        emits("update:modelValue", getValue());
        emits("change", getValue());
        pushFormItem();
      }
      function getDomRectBound() {
        dom.getComponentRect(proxy == null ? void 0 : proxy.$refs["btn" + BtnIndex.value], function(res) {
          if (res == null ? void 0 : res.size) {
            const { left, top } = res.size;
            nvueDetailPos.value = {
              left: left - (uni.upx2px(100) - uni.upx2px(props.buttonSize)) / 2,
              bottom: top - 45
            };
          }
        });
      }
      const rulesObj = (0, import_vue11.inject)("tmFormItemRules", (0, import_vue11.computed)(() => {
        return [
          {
            message: "\u8BF7\u9009\u62E9",
            required: false,
            validator: false
          }
        ];
      }));
      let parentFormItem = proxy == null ? void 0 : proxy.$parent;
      while (parentFormItem) {
        if ((parentFormItem == null ? void 0 : parentFormItem.tmFormComnameFormItem) == "tmFormComnameFormItem" || !parentFormItem) {
          break;
        } else {
          parentFormItem = (_c = parentFormItem == null ? void 0 : parentFormItem.$parent) != null ? _c : void 0;
        }
      }
      const validate = (rules) => {
        rules = rules.map((el) => {
          if (typeof el.validator === "function" && el.required === true) {
            return el;
          } else if (typeof el.validator === "boolean" && el.required === true) {
            return __spreadProps11(__spreadValues11({}, el), {
              validator: (val) => {
                if (Array.isArray(val)) {
                  return val.reduce((a, b) => Number(a) + Number(b)) == 0;
                } else {
                  return Number(val) == 0;
                }
              }
            });
          } else {
            return __spreadProps11(__spreadValues11({}, el), {
              validator: (val) => {
                return true;
              }
            });
          }
        });
        let rules_filter = rules.filter((el) => {
          return typeof el.validator === "function" && el.required === true;
        });
        let _valueSlider = getValue();
        let rules_fun = rules_filter.map((el) => {
          return new Promise((res, rej) => __async(this, null, function* () {
            if (typeof el.validator === "function") {
              let vr = yield el.validator(_valueSlider);
              if (vr) {
                res({
                  message: String(el.message),
                  validator: true
                });
              } else {
                rej({
                  message: el.message,
                  validator: false
                });
              }
            } else {
              res({
                message: el.message,
                validator: true
              });
            }
          }));
        });
        return Promise.all(rules_fun);
      };
      function pushFormItem(isCheckVail = true) {
        return __async(this, null, function* () {
          if (parentFormItem) {
            if (isCheckVail) {
              let _valueSlider = getValue();
              validate((0, import_vue11.toRaw)(rulesObj.value)).then((ev) => {
                parentFormItem.pushCom({
                  value: _valueSlider,
                  isRequiredError: false,
                  componentsName: "tm-rate",
                  message: ev.length == 0 ? "" : ev[0].message
                });
              }).catch((er) => {
                parentFormItem.pushCom({
                  value: _valueSlider,
                  isRequiredError: true,
                  componentsName: "tm-slider",
                  message: er.message
                });
              });
            }
          }
        });
      }
      pushFormItem();
      const tmFormFun = (0, import_vue11.inject)("tmFormFun", (0, import_vue11.computed)(() => ""));
      (0, import_vue11.watch)(tmFormFun, () => {
        if (tmFormFun.value == "reset") {
          if (isDablue.value) {
            emits("update:modelValue", [0, 0]);
            btnPos.value[0].x = 0;
            btnPos.value[1].x = 0;
          } else {
            emits("update:modelValue", 0);
            btnPos.value[0].x = 0;
          }
          pushFormItem(false);
        }
      });
      return (_ctx, _cache) => {
        return (0, import_vue11.openBlock)(), (0, import_vue11.createElementBlock)("view", {
          class: (0, import_vue11.normalizeClass)(["flex", [props.direction == "vertical" ? "flex-row" : "", (0, import_vue11.unref)(_disabled) ? "opacity-6" : ""]]),
          renderWhole: true
        }, [
          (0, import_vue11.createElementVNode)("view", {
            class: (0, import_vue11.normalizeClass)(["relative flex flex-col", [props.direction == "horizontal" ? "flex-col-center-start" : "flex-row-center-center"]]),
            style: (0, import_vue11.normalizeStyle)([
              { width: (0, import_vue11.unref)(_sliderBarCssWidth) + "rpx", height: (0, import_vue11.unref)(_sliderBarCssHeight) + "rpx" }
            ])
          }, [
            (0, import_vue11.createVNode)(tmSheet, {
              noLevel: "",
              round: 10,
              color: props.bgColor,
              height: props.direction == "horizontal" ? props.height : (0, import_vue11.unref)(_sliderBarCssHeight),
              width: props.direction == "horizontal" ? (0, import_vue11.unref)(_sliderBarCssWidth) : props.height,
              margin: [0, 0],
              padding: [0, 0]
            }, null, 8, ["color", "height", "width"]),
            (0, import_vue11.createVNode)(sliderBar, {
              followTheme: props.followTheme,
              class: (0, import_vue11.normalizeClass)([props.direction == "horizontal" ? "flex-col-center-start" : "flex-row-center-center"]),
              direction: props.direction,
              color: props.color,
              size: props.height,
              x: (0, import_vue11.unref)(_barLet),
              width: (0, import_vue11.unref)(_barWidth)
            }, null, 8, ["followTheme", "class", "direction", "color", "size", "x", "width"]),
            props.showLabel ? ((0, import_vue11.openBlock)(), (0, import_vue11.createBlock)(sliderMask, {
              key: 0,
              followTheme: props.followTheme,
              color: props.color,
              size: props.buttonSize,
              step: props.step,
              min: props.min,
              max: props.max,
              width: (0, import_vue11.unref)(_sliderBarCssWidth),
              height: (0, import_vue11.unref)(_sliderBarCssHeight),
              direction: props.direction
            }, null, 8, ["followTheme", "color", "size", "step", "min", "max", "width", "height", "direction"])) : (0, import_vue11.createCommentVNode)("v-if", true),
            (0, import_vue11.createVNode)(sliderButton, {
              maxLeft: (0, import_vue11.unref)(buttonStaticsMaxLeft),
              followTheme: props.followTheme,
              direction: props.direction,
              ref_key: "btn0",
              ref: btn0,
              color: props.color,
              x: btnPos.value[0].x,
              onMovestart: _cache[0] || (_cache[0] = ($event) => butnMoveStart($event, 0)),
              onMoveing: _cache[1] || (_cache[1] = ($event) => butnMove($event, 0)),
              onMoveend: _cache[2] || (_cache[2] = ($event) => butnMoveEnd()),
              size: props.buttonSize
            }, null, 8, ["maxLeft", "followTheme", "direction", "color", "x", "size"]),
            isDablue.value ? ((0, import_vue11.openBlock)(), (0, import_vue11.createBlock)(sliderButton, {
              key: 1,
              maxLeft: (0, import_vue11.unref)(buttonStaticsMaxLeft),
              followTheme: props.followTheme,
              direction: props.direction,
              ref_key: "btn1",
              ref: btn1,
              color: props.color,
              x: btnPos.value[1].x,
              onMovestart: _cache[3] || (_cache[3] = ($event) => butnMoveStart($event, 1)),
              onMoveing: _cache[4] || (_cache[4] = ($event) => butnMove($event, 1)),
              onMoveend: _cache[5] || (_cache[5] = ($event) => butnMoveEnd()),
              size: props.buttonSize
            }, null, 8, ["maxLeft", "followTheme", "direction", "color", "x", "size"])) : (0, import_vue11.createCommentVNode)("v-if", true)
          ], 6),
          props.showLabel ? ((0, import_vue11.openBlock)(), (0, import_vue11.createElementBlock)("view", {
            key: 0,
            class: (0, import_vue11.normalizeClass)([props.direction == "vertical" ? "flex-col" : "flex-row"])
          }, [
            (0, import_vue11.createVNode)(sliderLabel, {
              size: props.buttonSize,
              step: props.step,
              min: props.min,
              max: props.max,
              width: (0, import_vue11.unref)(_sliderBarCssWidth),
              height: (0, import_vue11.unref)(_sliderBarCssHeight),
              direction: props.direction
            }, null, 8, ["size", "step", "min", "max", "width", "height", "direction"])
          ], 2)) : (0, import_vue11.createCommentVNode)("v-if", true),
          showDetail.value ? ((0, import_vue11.openBlock)(), (0, import_vue11.createElementBlock)("view", {
            key: 1,
            class: (0, import_vue11.normalizeClass)(["flex absolute", [props.direction == "horizontal" ? "flex-col flex-col-start-center" : " flex-row "]]),
            style: (0, import_vue11.normalizeStyle)([
              props.direction == "horizontal" ? { width: props.width + props.buttonSize + "rpx" } : { height: props.width + props.buttonSize + "rpx" }
            ])
          }, [
            (0, import_vue11.createElementVNode)("view", {
              class: (0, import_vue11.normalizeClass)([[
                isNvue.value ? "fixed" : "absolute ",
                props.direction == "horizontal" ? isNvue.value ? "t-0" : "b-0" : "t-0 "
              ], "mb-0 flex flex-col flex-col-bottom-center"]),
              style: (0, import_vue11.normalizeStyle)([
                !isNvue.value ? props.direction == "horizontal" ? { transform: `translateX(${btnPos.value[BtnIndex.value].x}px)`, left: -(100 - props.buttonSize + 24) / 2 + "rpx" } : { transform: `translateY(${btnPos.value[BtnIndex.value].x}px)`, top: "-70rpx", left: -(100 - props.buttonSize + 24) / 2 + "rpx" } : { left: `${nvueDetailPos.value.left}px`, top: `${nvueDetailPos.value.bottom}px` }
              ])
            }, [
              (0, import_vue11.createVNode)(tmSheet, {
                _class: "flex-center",
                color: "grey-darken-5",
                border: 2,
                margin: [0, 0],
                padding: [10, 6],
                width: 100,
                round: 3
              }, {
                default: (0, import_vue11.withCtx)(() => [
                  (0, import_vue11.createVNode)(tmText, { label: _value.value }, null, 8, ["label"])
                ]),
                _: 1
              }),
              (0, import_vue11.createVNode)(tmIcon, {
                color: "grey-darken-5",
                _class: "t--10",
                "font-size": 32,
                name: "tmicon-sort-down"
              })
            ], 6)
          ], 6)) : (0, import_vue11.createCommentVNode)("v-if", true)
        ], 2);
      };
    }
  });
  var tmSlider = /* @__PURE__ */ _export_sfc(_sfc_main11, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-slider/tm-slider.vue"]]);

  // F:/CoinQT/CoinQT_app/unpackage/dist/dev/.nvue/tm-segtab.js
  var import_vue12 = __toESM(require_vue());
  var __defProp13 = Object.defineProperty;
  var __defProps12 = Object.defineProperties;
  var __getOwnPropDescs12 = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols12 = Object.getOwnPropertySymbols;
  var __hasOwnProp13 = Object.prototype.hasOwnProperty;
  var __propIsEnum12 = Object.prototype.propertyIsEnumerable;
  var __defNormalProp12 = (obj, key, value) => key in obj ? __defProp13(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues12 = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp13.call(b, prop))
        __defNormalProp12(a, prop, b[prop]);
    if (__getOwnPropSymbols12)
      for (var prop of __getOwnPropSymbols12(b)) {
        if (__propIsEnum12.call(b, prop))
          __defNormalProp12(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps12 = (a, b) => __defProps12(a, __getOwnPropDescs12(b));
  var _style_04 = { "bgbtnpos": { "": { "transitionTimingFunction": "linear", "transitionDuration": 200, "transitionProperty": "left,width,transform", "transitionDelay": 0 } }, "@TRANSITION": { "bgbtnpos": { "timingFunction": "linear", "duration": 200, "property": "left,width,transform", "delay": 0 } } };
  var _sfc_main12 = /* @__PURE__ */ (0, import_vue12.defineComponent)({
    __name: "tm-segtab",
    props: __spreadProps12(__spreadValues12({}, custom_props), {
      round: {
        type: Number,
        default: 2
      },
      width: {
        type: Number,
        default: 600
      },
      height: {
        type: Number,
        default: 64
      },
      gutter: {
        type: Number,
        default: 2
      },
      list: {
        type: Array,
        default: () => [],
        required: true
      },
      modelValue: {
        type: [Number, String],
        default: 0
      },
      defaultValue: {
        type: [Number, String],
        default: 0
      },
      beforeChange: {
        type: [Function, Boolean],
        default: () => false
      },
      color: {
        type: String,
        default: "white"
      },
      bgColor: {
        type: String,
        default: "grey-3"
      },
      fontSize: {
        type: Number,
        default: 24
      },
      activeColor: {
        type: String,
        default: "primary"
      }
    }),
    emits: ["update:modelValue", "change", "click"],
    setup(__props, { emit: emits }) {
      var _a2, _b2, _c, _d;
      const props = __props;
      const dom = requireNativePlugin("dom");
      const animation = requireNativePlugin("animation");
      const proxy = (_b2 = (_a2 = (0, import_vue12.getCurrentInstance)()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const leftPos = (0, import_vue12.ref)(0);
      const leftWidth = (0, import_vue12.ref)(0);
      let timid = uni.$tm.u.getUid();
      const _list = (0, import_vue12.computed)(() => {
        var _a22;
        let templist = [];
        for (let i = 0, len = props.list.length; i < len; i++) {
          let al = { text: "", id: i };
          let el = props.list[i];
          if (typeof el == "string" || typeof el == "number") {
            al.text = el;
          } else if (typeof el == "object") {
            al.text = (_a22 = el == null ? void 0 : el.text) != null ? _a22 : "";
            if (typeof (el == null ? void 0 : el.id) != "undefined") {
              al.id = el["id"];
            }
          }
          templist.push(al);
        }
        return templist;
      });
      const _cId = (0, import_vue12.ref)((_c = props.defaultValue) != null ? _c : 0);
      function itemClick(index, id) {
        return __async(this, null, function* () {
          emits("click", index);
          if (typeof props.beforeChange === "function") {
            uni.showLoading({ title: "...", mask: true });
            let p = yield props.beforeChange(index);
            if (typeof p === "function") {
              p = yield p(index);
            }
            uni.hideLoading();
            if (!p)
              return;
          }
          if (_cId.value === id)
            return;
          _cId.value = id;
          getDomRectBound(index);
          emits("change", _cId.value);
          emits("update:modelValue", _cId.value);
          pushFormItem();
        });
      }
      (0, import_vue12.watch)([() => props.modelValue, () => props.list], () => {
        _cId.value = props.modelValue;
      }, { deep: true });
      (0, import_vue12.watch)([_cId], () => {
        initPos();
      }, { deep: true });
      (0, import_vue12.onMounted)(() => {
        initPos();
      });
      function initPos() {
        let indexel = _list.value.findIndex((el) => el.id === _cId.value);
        clearTimeout(timid);
        timid = setTimeout(() => {
          (0, import_vue12.nextTick)(() => getDomRectBound(indexel));
        }, 300);
      }
      function getEl(el) {
        if (typeof el === "string" || typeof el === "number")
          return el;
        if (WXEnvironment) {
          return el.ref;
        } else {
          return el instanceof HTMLElement ? el : el.$el;
        }
      }
      function getDomRectBound(idx) {
        dom.getComponentRect(proxy == null ? void 0 : proxy.$refs["tm-segtab"], function(PARENAREDS) {
          var _a22;
          if (PARENAREDS == null ? void 0 : PARENAREDS.size) {
            let parentleft = Math.floor((_a22 = PARENAREDS.size.left) != null ? _a22 : 0);
            dom.getComponentRect(proxy == null ? void 0 : proxy.$refs["tab_"][idx], function(res) {
              if (res == null ? void 0 : res.size) {
                const { left, top, width } = res.size;
                getEl(proxy == null ? void 0 : proxy.$refs["tmBgEl"]);
                leftWidth.value = Math.ceil(width != null ? width : 0);
                leftPos.value = Math.ceil((left != null ? left : 0) - uni.upx2px(props.gutter) - parentleft);
                animation.transition(proxy == null ? void 0 : proxy.$refs["tmBgEl"], {
                  styles: {
                    transform: "translateX(" + leftPos.value + "px)"
                  },
                  duration: 200,
                  timingFunction: "ease",
                  delay: 0
                }, () => {
                });
              }
            });
          }
        });
      }
      const rulesObj = (0, import_vue12.inject)("tmFormItemRules", (0, import_vue12.computed)(() => {
        return [
          {
            message: "\u8BF7\u9009\u62E9",
            required: false,
            validator: false
          }
        ];
      }));
      let parentFormItem = proxy.$parent;
      while (parentFormItem) {
        if ((parentFormItem == null ? void 0 : parentFormItem.tmFormComnameFormItem) == "tmFormComnameFormItem" || !parentFormItem) {
          break;
        } else {
          parentFormItem = (_d = parentFormItem == null ? void 0 : parentFormItem.$parent) != null ? _d : void 0;
        }
      }
      const validate = (rules) => {
        rules = rules.map((el) => {
          if (typeof el.validator === "function" && el.required === true) {
            return el;
          } else if (typeof el.validator === "boolean" && el.required === true) {
            return __spreadProps12(__spreadValues12({}, el), {
              validator: (val) => {
                return val === "" ? false : true;
              }
            });
          } else {
            return __spreadProps12(__spreadValues12({}, el), {
              validator: (val) => {
                return true;
              }
            });
          }
        });
        let rules_filter = rules.filter((el) => {
          return typeof el.validator === "function" && el.required === true;
        });
        let rules_fun = rules_filter.map((el) => {
          return new Promise((res, rej) => __async(this, null, function* () {
            if (typeof el.validator === "function") {
              let vr = yield el.validator(_cId.value);
              if (vr) {
                res({
                  message: String(el.message),
                  validator: true
                });
              } else {
                rej({
                  message: el.message,
                  validator: false
                });
              }
            } else {
              res({
                message: el.message,
                validator: true
              });
            }
          }));
        });
        return Promise.all(rules_fun);
      };
      function pushFormItem(isCheckVail = true) {
        return __async(this, null, function* () {
          if (parentFormItem) {
            if (isCheckVail) {
              validate((0, import_vue12.toRaw)(rulesObj.value)).then((ev) => {
                parentFormItem.pushCom({
                  value: _cId.value,
                  isRequiredError: false,
                  componentsName: "tm-segtab",
                  message: ev.length == 0 ? "" : ev[0].message
                });
              }).catch((er) => {
                parentFormItem.pushCom({
                  value: _cId.value,
                  isRequiredError: true,
                  componentsName: "tm-segtab",
                  message: er.message
                });
              });
            }
          }
        });
      }
      pushFormItem();
      const tmFormFun = (0, import_vue12.inject)("tmFormFun", (0, import_vue12.computed)(() => ""));
      (0, import_vue12.watch)(tmFormFun, () => {
        if (tmFormFun.value == "reset") {
          _cId.value = "";
          emits("update:modelValue", "");
          pushFormItem(false);
        }
      });
      return (_ctx, _cache) => {
        return (0, import_vue12.openBlock)(), (0, import_vue12.createElementBlock)("view", {
          class: (0, import_vue12.normalizeClass)(["tm-segtab relative flex flex-col", [`round-${props.round}`]]),
          ref: "tm-segtab",
          style: (0, import_vue12.normalizeStyle)({ width: props.width + props.gutter * 2 + "rpx" }),
          renderWhole: true
        }, [
          (0, import_vue12.createVNode)(tmSheet, {
            round: props.round,
            border: props.border,
            linear: props.linear,
            "linear-deep": props.linearDeep,
            "no-level": true,
            height: props.height,
            color: props.bgColor,
            width: props.width,
            _class: "flex-row relative overflow",
            padding: [props.gutter, props.gutter],
            margin: [0, 0]
          }, {
            default: (0, import_vue12.withCtx)(() => [
              _cId.value !== "" ? ((0, import_vue12.openBlock)(), (0, import_vue12.createElementBlock)("view", {
                key: 0,
                ref: "tmBgEl",
                class: "relative flex flex-row",
                style: (0, import_vue12.normalizeStyle)([{ width: leftWidth.value + "px" }])
              }, [
                (0, import_vue12.createCommentVNode)(" left:leftPos+'px',width:leftWidth+'px' "),
                (0, import_vue12.createVNode)(tmSheet, {
                  "follow-dark": props.followDark,
                  round: props.round,
                  class: "flex-1",
                  _class: "flex-1",
                  color: props.color,
                  margin: [0, 0],
                  padding: [0, 0]
                }, null, 8, ["follow-dark", "round", "color"])
              ], 4)) : (0, import_vue12.createCommentVNode)("v-if", true),
              (0, import_vue12.createElementVNode)("view", {
                class: (0, import_vue12.normalizeClass)(["absolute flex flex-row flex-row-center-start", [`pa-${props.gutter}`, `l--${props.gutter / 2}`]]),
                style: (0, import_vue12.normalizeStyle)([{ width: `${props.width}rpx`, height: `${props.height - props.gutter}rpx` }])
              }, [
                ((0, import_vue12.openBlock)(true), (0, import_vue12.createElementBlock)(import_vue12.Fragment, null, (0, import_vue12.renderList)((0, import_vue12.unref)(_list), (item, index) => {
                  return (0, import_vue12.openBlock)(), (0, import_vue12.createElementBlock)("view", {
                    onClick: ($event) => itemClick(index, item.id),
                    ref_for: true,
                    ref: "tab_",
                    class: (0, import_vue12.normalizeClass)([["tab" + index], "flex-1 flex flex-row flex-row-center-center"]),
                    style: (0, import_vue12.normalizeStyle)({ height: `${props.height - props.gutter}rpx` }),
                    key: index
                  }, [
                    (0, import_vue12.createVNode)(tmText, {
                      color: item.id === _cId.value ? props.activeColor : "",
                      "font-size": props.fontSize,
                      userInteractionEnabled: false,
                      label: item.text
                    }, null, 8, ["color", "font-size", "label"])
                  ], 14, ["onClick"]);
                }), 128))
              ], 6)
            ]),
            _: 1
          }, 8, ["round", "border", "linear", "linear-deep", "height", "color", "width", "padding"])
        ], 6);
      };
    }
  });
  var tmSegtab = /* @__PURE__ */ _export_sfc(_sfc_main12, [["styles", [_style_04]], ["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-segtab/tm-segtab.vue"]]);

  // F:/CoinQT/CoinQT_app/unpackage/dist/dev/.nvue/tm-switch.js
  var import_vue13 = __toESM(require_vue());
  var __defProp14 = Object.defineProperty;
  var __defProps13 = Object.defineProperties;
  var __getOwnPropDescs13 = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols13 = Object.getOwnPropertySymbols;
  var __hasOwnProp14 = Object.prototype.hasOwnProperty;
  var __propIsEnum13 = Object.prototype.propertyIsEnumerable;
  var __defNormalProp13 = (obj, key, value) => key in obj ? __defProp14(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues13 = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp14.call(b, prop))
        __defNormalProp13(a, prop, b[prop]);
    if (__getOwnPropSymbols13)
      for (var prop of __getOwnPropSymbols13(b)) {
        if (__propIsEnum13.call(b, prop))
          __defNormalProp13(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps13 = (a, b) => __defProps13(a, __getOwnPropDescs13(b));
  var _style_05 = { "switchbgani": { "": { "transitionTimingFunction": "ease", "transitionProperty": "backgroundColor", "transitionDuration": 300, "transitionDelay": 0 } }, "@TRANSITION": { "switchbgani": { "timingFunction": "ease", "property": "backgroundColor", "duration": 300, "delay": 0 } } };
  var _sfc_main13 = /* @__PURE__ */ (0, import_vue13.defineComponent)({
    __name: "tm-switch",
    props: __spreadProps13(__spreadValues13({}, custom_props), {
      followTheme: {
        type: [Boolean, String],
        default: true
      },
      margin: {
        type: Array,
        default: () => [0, 0]
      },
      transprent: {
        type: Boolean,
        default: false
      },
      defaultValue: {
        type: Boolean,
        default: false
      },
      modelValue: {
        type: Boolean,
        default: false
      },
      width: {
        type: Number,
        default: 0
      },
      height: {
        type: Number,
        default: 0
      },
      size: {
        type: String,
        default: "normal"
      },
      color: {
        type: String,
        default: "primary"
      },
      unCheckedColor: {
        type: String,
        default: "grey-3"
      },
      barColor: {
        type: String,
        default: "white"
      },
      round: {
        type: Number,
        default: 10
      },
      load: {
        type: Boolean,
        default: false
      },
      beforeChecked: {
        type: [Function, Boolean, String],
        default: () => false
      },
      barIcon: {
        type: String,
        default: "tmicon-check"
      },
      disabled: {
        type: Boolean,
        default: false
      },
      label: {
        type: Array,
        default: () => ["", ""]
      }
    }),
    emits: ["update:modelValue", "change", "click"],
    setup(__props, { emit: emits }) {
      var _a2, _b2, _c;
      const props = __props;
      const animation = requireNativePlugin("animation");
      const proxy = (_b2 = (_a2 = (0, import_vue13.getCurrentInstance)()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const viewSize = (0, import_vue13.computed)(() => {
        let width = 0;
        let height = 0;
        let fontSize = 24;
        let gutter = 2;
        let round = props.round;
        if (props.width && props.height) {
          width = props.width;
          height = props.height;
          fontSize = height * 0.45;
        } else {
          if (props.size == "normal") {
            width = 100;
            height = 50;
            fontSize = 26;
          } else if (props.size == "mini") {
            width = 80;
            height = 40;
            fontSize = 22;
          } else if (props.size == "large") {
            width = 120;
            height = 60;
            fontSize = 32;
            round = 24;
          }
        }
        let gutterPx = gutter;
        width = Math.ceil(uni.upx2px(width));
        height = Math.ceil(uni.upx2px(height));
        let obj = {
          width,
          height,
          innerHeight: height - gutterPx * 2,
          innerWidth: width / 2 - gutterPx * 2,
          coenteWidth: width - gutterPx * 2,
          conentWidthPx: width - gutterPx * 2,
          fontSize,
          round
        };
        return obj;
      });
      const _value = (0, import_vue13.ref)(false);
      if (props.defaultValue) {
        _value.value = props.defaultValue;
      }
      const _load = (0, import_vue13.ref)(false);
      (0, import_vue13.watchEffect)(() => {
        _load.value = props.load;
      });
      function switchClick() {
        return __async(this, null, function* () {
          emits("click");
          if (_load.value || props.disabled)
            return;
          if (typeof props.beforeChecked === "function") {
            _load.value = true;
            let p = yield props.beforeChecked();
            if (typeof p === "function") {
              p = yield p();
            }
            _load.value = false;
            if (!p)
              return;
          }
          _value.value = !_value.value;
          spinNvueAni(_value.value);
          emits("change", _value.value);
          emits("update:modelValue", _value.value);
          pushFormItem();
        });
      }
      (0, import_vue13.watch)(() => props.modelValue, (newval) => {
        _value.value = newval;
        spinNvueAni(newval);
      });
      (0, import_vue13.onMounted)(() => {
        (0, import_vue13.nextTick)(() => spinNvueAni(_value.value));
      });
      function spinNvueAni(reveser = false) {
        if (!(proxy == null ? void 0 : proxy.$refs["switch"]))
          return;
        var testEl = proxy == null ? void 0 : proxy.$refs.switch;
        animation.transition(testEl, {
          styles: {
            transform: reveser ? `translateX(${viewSize.value.innerWidth + 4}px)` : "translateX(0px)",
            transformOrigin: "center center"
          },
          duration: 250,
          timingFunction: "ease",
          delay: 0
        }, () => {
        });
      }
      const rulesObj = (0, import_vue13.inject)("tmFormItemRules", (0, import_vue13.computed)(() => {
        return [
          {
            message: "\u8BF7\u9009\u62E9",
            required: false,
            validator: false
          }
        ];
      }));
      let parentFormItem = proxy == null ? void 0 : proxy.$parent;
      while (parentFormItem) {
        if ((parentFormItem == null ? void 0 : parentFormItem.tmFormComnameFormItem) == "tmFormComnameFormItem" || !parentFormItem) {
          break;
        } else {
          parentFormItem = (_c = parentFormItem == null ? void 0 : parentFormItem.$parent) != null ? _c : void 0;
        }
      }
      const validate = (rules) => {
        rules = rules.map((el) => {
          if (typeof el.validator === "function" && el.required === true) {
            return el;
          } else if (typeof el.validator === "boolean" && el.required === true) {
            return __spreadProps13(__spreadValues13({}, el), {
              validator: (val) => {
                return val === true ? true : false;
              }
            });
          } else {
            return __spreadProps13(__spreadValues13({}, el), {
              validator: (val) => {
                return true;
              }
            });
          }
        });
        let rules_filter = rules.filter((el) => {
          return typeof el.validator === "function" && el.required === true;
        });
        let rules_fun = rules_filter.map((el) => {
          return new Promise((res, rej) => __async(this, null, function* () {
            if (typeof el.validator === "function") {
              let vr = yield el.validator(_value.value);
              if (vr) {
                res({
                  message: String(el.message),
                  validator: true
                });
              } else {
                rej({
                  message: el.message,
                  validator: false
                });
              }
            } else {
              res({
                message: el.message,
                validator: true
              });
            }
          }));
        });
        return Promise.all(rules_fun);
      };
      function pushFormItem(isCheckVail = true) {
        return __async(this, null, function* () {
          if (parentFormItem) {
            if (isCheckVail) {
              validate((0, import_vue13.toRaw)(rulesObj.value)).then((ev) => {
                parentFormItem.pushCom({
                  value: _value.value,
                  isRequiredError: false,
                  componentsName: "tm-switch",
                  message: ev.length == 0 ? "" : ev[0].message
                });
              }).catch((er) => {
                parentFormItem.pushCom({
                  value: _value.value,
                  isRequiredError: true,
                  componentsName: "tm-switch",
                  message: er.message
                });
              });
            }
          }
        });
      }
      pushFormItem();
      const tmFormFun = (0, import_vue13.inject)("tmFormFun", (0, import_vue13.computed)(() => ""));
      (0, import_vue13.watch)(tmFormFun, () => {
        if (tmFormFun.value == "reset") {
          _value.value = false;
          emits("update:modelValue", _value.value);
          pushFormItem(false);
        }
      });
      return (_ctx, _cache) => {
        return (0, import_vue13.openBlock)(), (0, import_vue13.createBlock)(tmSheet, {
          onClick: switchClick,
          "no-level": !_value.value,
          followTheme: props.followTheme,
          followDark: props.followDark,
          dark: props.dark,
          shadow: props.shadow,
          outlined: props.outlined,
          borderStyle: props.borderStyle,
          borderDirection: props.borderDirection,
          linearDeep: props.linearDeep,
          linear: _value.value ? props.linear : "",
          round: (0, import_vue13.unref)(viewSize).round,
          color: _value.value ? props.color : props.unCheckedColor,
          height: (0, import_vue13.unref)(viewSize).height,
          width: (0, import_vue13.unref)(viewSize).width,
          parenClass: "switchbgani",
          _class: ["flex  relative flex-col", props.disabled ? "opacity-4" : ""],
          text: _value.value ? false : props.text,
          unit: "px",
          padding: [0, 0],
          margin: props.margin
        }, {
          default: (0, import_vue13.withCtx)(() => [
            (0, import_vue13.createElementVNode)("view", {
              class: "relative flex relative flex-col",
              style: (0, import_vue13.normalizeStyle)({ padding: "2px", width: `${(0, import_vue13.unref)(viewSize).width}px`, height: `${(0, import_vue13.unref)(viewSize).height}px` })
            }, [
              (0, import_vue13.createElementVNode)("view", {
                userInteractionEnabled: false,
                class: "flex flex-row flex-between",
                style: (0, import_vue13.normalizeStyle)([{ width: (0, import_vue13.unref)(viewSize).coenteWidth + "px", height: (0, import_vue13.unref)(viewSize).innerHeight + "px" }])
              }, [
                (0, import_vue13.createElementVNode)("view", { class: "flex-1 flex-row flex-row-center-center" }, [
                  (0, import_vue13.createVNode)(tmText, {
                    "font-size": (0, import_vue13.unref)(viewSize).fontSize,
                    label: props.label[0]
                  }, null, 8, ["font-size", "label"])
                ]),
                (0, import_vue13.createElementVNode)("view", { class: "flex-1 flex-row flex-row-center-center" }, [
                  (0, import_vue13.createVNode)(tmText, {
                    "font-size": (0, import_vue13.unref)(viewSize).fontSize,
                    label: props.label[1]
                  }, null, 8, ["font-size", "label"])
                ])
              ], 4),
              (0, import_vue13.createElementVNode)("view", {
                userInteractionEnabled: false,
                class: (0, import_vue13.normalizeClass)([["absolute base nvue", _value.value ? "on" : "off"], "flex flex-col"]),
                ref: "switch",
                style: (0, import_vue13.normalizeStyle)({
                  width: (0, import_vue13.unref)(viewSize).innerWidth + "px",
                  height: (0, import_vue13.unref)(viewSize).innerHeight + "px"
                })
              }, [
                (0, import_vue13.createVNode)(tmSheet, {
                  userInteractionEnabled: false,
                  padding: [0, 0],
                  margin: [0, 0],
                  height: (0, import_vue13.unref)(viewSize).innerHeight,
                  width: (0, import_vue13.unref)(viewSize).innerWidth,
                  color: props.barColor,
                  "follow-dark": false,
                  round: (0, import_vue13.unref)(viewSize).round,
                  unit: "px",
                  _class: "flex flex-center flex-row"
                }, {
                  default: (0, import_vue13.withCtx)(() => [
                    _load.value ? ((0, import_vue13.openBlock)(), (0, import_vue13.createBlock)(tmIcon, {
                      key: 0,
                      followTheme: props.followTheme,
                      "font-size": (0, import_vue13.unref)(viewSize).fontSize,
                      color: props.color,
                      name: "tmicon-loading",
                      spin: ""
                    }, null, 8, ["followTheme", "font-size", "color"])) : (0, import_vue13.createCommentVNode)("v-if", true),
                    !_load.value && _value.value ? ((0, import_vue13.openBlock)(), (0, import_vue13.createBlock)(tmTranslate, {
                      key: 1,
                      name: "zoom"
                    }, {
                      default: (0, import_vue13.withCtx)(() => [
                        (0, import_vue13.createVNode)(tmIcon, {
                          followTheme: props.followTheme,
                          "font-size": (0, import_vue13.unref)(viewSize).fontSize,
                          color: props.color,
                          name: props.barIcon
                        }, null, 8, ["followTheme", "font-size", "color", "name"])
                      ]),
                      _: 1
                    })) : (0, import_vue13.createCommentVNode)("v-if", true)
                  ]),
                  _: 1
                }, 8, ["height", "width", "color", "round"])
              ], 6)
            ], 4)
          ]),
          _: 1
        }, 8, ["no-level", "followTheme", "followDark", "dark", "shadow", "outlined", "borderStyle", "borderDirection", "linearDeep", "linear", "round", "color", "height", "width", "_class", "text", "margin"]);
      };
    }
  });
  var TmSwitch = /* @__PURE__ */ _export_sfc(_sfc_main13, [["styles", [_style_05]], ["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-switch/tm-switch.vue"]]);

  // F:/CoinQT/CoinQT_app/unpackage/dist/dev/.nvue/tm-upload.js
  var import_vue15 = __toESM(require_vue());

  // F:/CoinQT/CoinQT_app/unpackage/dist/dev/.nvue/tm-image.js
  var import_vue14 = __toESM(require_vue());
  var __defProp15 = Object.defineProperty;
  var __defProps14 = Object.defineProperties;
  var __getOwnPropDescs14 = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols14 = Object.getOwnPropertySymbols;
  var __hasOwnProp15 = Object.prototype.hasOwnProperty;
  var __propIsEnum14 = Object.prototype.propertyIsEnumerable;
  var __defNormalProp14 = (obj, key, value) => key in obj ? __defProp15(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues14 = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp15.call(b, prop))
        __defNormalProp14(a, prop, b[prop]);
    if (__getOwnPropSymbols14)
      for (var prop of __getOwnPropSymbols14(b)) {
        if (__propIsEnum14.call(b, prop))
          __defNormalProp14(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps14 = (a, b) => __defProps14(a, __getOwnPropDescs14(b));
  var _sfc_main14 = /* @__PURE__ */ (0, import_vue14.defineComponent)({
    __name: "tm-image",
    props: __spreadProps14(__spreadValues14({}, custom_props), {
      margin: {
        type: Array,
        default: () => [0, 0]
      },
      padding: {
        type: Array,
        default: () => [0, 0]
      },
      color: {
        type: String,
        default: "white"
      },
      transprent: {
        type: [Boolean, String],
        default: true
      },
      border: {
        type: Number,
        default: 0
      },
      width: {
        type: [Number],
        default: 200,
        required: true
      },
      height: {
        type: [Number],
        default: 200,
        required: true
      },
      src: {
        type: String,
        default: "",
        required: true
      },
      errorIcon: {
        type: String,
        default: ""
      },
      errorLabel: {
        type: String,
        default: "\u52A0\u8F7D\u9519\u8BEF"
      },
      loadIcon: {
        type: String,
        default: ""
      },
      showLoad: {
        type: Boolean,
        default: true
      },
      preview: {
        type: [Boolean],
        default: false
      },
      extra: {
        type: [Boolean],
        default: false
      },
      extraPosition: {
        type: String,
        default: "in"
      },
      delete: {
        type: [Boolean],
        default: false
      },
      allowDelete: {
        type: [Boolean],
        default: true
      },
      model: {
        type: String,
        default: "scaleToFill"
      },
      unit: {
        type: String,
        default: "rpx"
      },
      showMenuByLongPress: {
        type: [Boolean],
        default: false
      }
    }),
    emits: ["load", "error", "click", "delete", "close"],
    setup(__props, { emit: emits }) {
      var _a2, _b2, _c;
      const props = __props;
      const aniplay = (0, import_vue14.ref)(null);
      const proxy = (_b2 = (_a2 = (0, import_vue14.getCurrentInstance)()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      if (!props.height && !props.width) {
        formatAppLog("error", "at tmui/components/tm-image/tm-image.vue:161", "\u9519\u8BEF\uFF1A\u56FE\u7247\u5BBD\u5EA6\u548C\u9AD8\u5EA6\u5FC5\u987B\u8BBE\u7F6E\u4E00\u4E2A");
      }
      const img_width = (0, import_vue14.computed)(() => {
        return props.width;
      });
      const img_height = (0, import_vue14.computed)(() => {
        return props.height - props.padding[1];
      });
      const img_src = (0, import_vue14.computed)(() => props.src);
      const loading = (0, import_vue14.ref)(true);
      const error = (0, import_vue14.ref)(false);
      const isRmove = (0, import_vue14.ref)(false);
      let parent = proxy == null ? void 0 : proxy.$parent;
      while (parent) {
        if ((parent == null ? void 0 : parent.tmImageGroup) == "tmImageGroup" || !parent) {
          break;
        } else {
          parent = (_c = parent == null ? void 0 : parent.$parent) != null ? _c : void 0;
        }
      }
      const ImagGrupList = (0, import_vue14.inject)("ImagGrupList", (0, import_vue14.computed)(() => []));
      if (parent == null ? void 0 : parent.pushKey) {
        parent.pushKey({
          width: img_width.value,
          height: img_width.value,
          src: props.src
        });
      }
      (0, import_vue14.watch)(img_src, () => {
        loading.value = true;
        error.value = false;
        if (parent == null ? void 0 : parent.pushKey) {
          parent.pushKey({
            width: img_width.value,
            height: img_width.value,
            src: props.src
          });
        }
      });
      function imageLoad(event) {
        loading.value = false;
        emits("load", event);
      }
      function imageError(event) {
        formatAppLog("error", "at tmui/components/tm-image/tm-image.vue:212", "\u56FE\u7247\u52A0\u8F7D\u9519:" + props.src, event);
        error.value = true;
        loading.value = false;
        emits("error", event);
      }
      function imageClick(event) {
        emits("click", event);
        if (props.preview) {
          let list = ImagGrupList.value.length > 0 ? ImagGrupList.value : [props.src];
          uni.previewImage({
            urls: list,
            current: props.src
          });
        }
      }
      function del() {
        return __async(this, null, function* () {
          var _a22, _b22;
          isRmove.value = false;
          if (!props.allowDelete) {
            emits("delete", props.src);
            return;
          }
          if ((_a22 = aniplay.value) == null ? void 0 : _a22.play) {
            (_b22 = aniplay.value) == null ? void 0 : _b22.play();
          } else {
            isRmove.value = true;
            emits("close", props.src);
          }
        });
      }
      function aniEnd() {
        isRmove.value = true;
        emits("close", props.src);
      }
      return (_ctx, _cache) => {
        return !isRmove.value ? ((0, import_vue14.openBlock)(), (0, import_vue14.createBlock)(tmTranslate, {
          key: 0,
          width: (0, import_vue14.unref)(img_width) + props.padding[0] * 2 + props.unit,
          onEnd: aniEnd,
          ref_key: "aniplay",
          ref: aniplay,
          autoPlay: false,
          name: "zoom",
          reverse: ""
        }, {
          default: (0, import_vue14.withCtx)(() => [
            (0, import_vue14.createVNode)(tmSheet, {
              color: props.color,
              transprent: props.transprent,
              margin: props.margin,
              round: props.round,
              border: props.border,
              padding: [props.padding[0], 0],
              class: (0, import_vue14.normalizeClass)(["round-" + props.round]),
              width: (0, import_vue14.unref)(img_width) - props.padding[0] * 2,
              unit: props.unit
            }, {
              default: (0, import_vue14.withCtx)(() => [
                (0, import_vue14.createElementVNode)("view", {
                  class: (0, import_vue14.normalizeClass)([`pb-${props.padding[1]}`])
                }, [
                  loading.value ? ((0, import_vue14.openBlock)(), (0, import_vue14.createElementBlock)("u-image", {
                    key: 0,
                    src: (0, import_vue14.unref)(img_src),
                    style: { "width": "10px", "height": "10px", "opacity": "0", "transform": "translateX(1200px)" },
                    onLoad: imageLoad,
                    onError: imageError,
                    mode: "scaleToFill"
                  }, null, 40, ["src"])) : (0, import_vue14.createCommentVNode)("v-if", true),
                  !loading.value && !error.value ? ((0, import_vue14.openBlock)(), (0, import_vue14.createElementBlock)("u-image", {
                    key: 1,
                    showMenuByLongpress: props.showMenuByLongPress,
                    onClick: imageClick,
                    class: (0, import_vue14.normalizeClass)(["round-" + props.round]),
                    src: (0, import_vue14.unref)(img_src),
                    style: (0, import_vue14.normalizeStyle)([{ width: (0, import_vue14.unref)(img_width) + props.unit, height: (0, import_vue14.unref)(img_height) + props.unit }]),
                    mode: props.model
                  }, null, 14, ["showMenuByLongpress", "src", "mode"])) : (0, import_vue14.createCommentVNode)("v-if", true),
                  loading.value && !error.value ? ((0, import_vue14.openBlock)(), (0, import_vue14.createElementBlock)("view", {
                    key: 2,
                    style: (0, import_vue14.normalizeStyle)([{ width: (0, import_vue14.unref)(img_width) + props.unit, height: (0, import_vue14.unref)(img_height) + props.unit }]),
                    class: "flex flex-center opacity-3"
                  }, [
                    props.showLoad ? ((0, import_vue14.openBlock)(), (0, import_vue14.createBlock)(tmIcon, {
                      key: 0,
                      "font-size": 26,
                      spin: "",
                      name: "tmicon-loading"
                    })) : (0, import_vue14.createCommentVNode)("v-if", true)
                  ], 4)) : (0, import_vue14.createCommentVNode)("v-if", true),
                  !loading.value && error.value ? ((0, import_vue14.openBlock)(), (0, import_vue14.createElementBlock)("view", {
                    key: 3,
                    style: (0, import_vue14.normalizeStyle)([{ width: (0, import_vue14.unref)(img_width) + props.unit, height: (0, import_vue14.unref)(img_height) + props.unit }]),
                    class: "flex flex-col flex-center opacity-5"
                  }, [
                    (0, import_vue14.createVNode)(tmIcon, { name: "tmicon-exclamation-circle" }),
                    (0, import_vue14.createVNode)(tmText, {
                      _class: "pt-10",
                      "font-size": 26,
                      label: props.errorLabel
                    }, null, 8, ["label"])
                  ], 4)) : (0, import_vue14.createCommentVNode)("v-if", true),
                  (0, import_vue14.createCommentVNode)(" extra "),
                  props.extra ? ((0, import_vue14.openBlock)(), (0, import_vue14.createElementBlock)("view", {
                    key: 4,
                    onClick: (0, import_vue14.withModifiers)(imageClick, ["stop"]),
                    class: (0, import_vue14.normalizeClass)([
                      props.extraPosition == "in" ? "absolute l-0 b-0 zIndex-5" : "",
                      "flex flex-col flex-col-bottom-start"
                    ]),
                    style: (0, import_vue14.normalizeStyle)([
                      props.extra && props.extraPosition == "in" ? { height: (0, import_vue14.unref)(img_height) + props.unit, width: (0, import_vue14.unref)(img_width) + props.unit } : "",
                      props.extra && props.extraPosition == "out" ? { width: (0, import_vue14.unref)(img_width) + props.unit } : ""
                    ])
                  }, [
                    (0, import_vue14.renderSlot)(_ctx.$slots, "extra")
                  ], 14, ["onClick"])) : (0, import_vue14.createCommentVNode)("v-if", true),
                  (0, import_vue14.createCommentVNode)(" delete \u5C55\u793A\u5220\u9664\u6309\u94AE\u3002 "),
                  props.delete ? ((0, import_vue14.openBlock)(), (0, import_vue14.createElementBlock)("view", {
                    key: 5,
                    class: "absolute r-10 t-10 flex flex-col flex-col-center-end zIndex-10",
                    style: (0, import_vue14.normalizeStyle)([props.delete ? { width: (0, import_vue14.unref)(img_width) + props.unit } : ""])
                  }, [
                    (0, import_vue14.createVNode)(tmIcon, {
                      onClick: del,
                      color: "red",
                      name: "tmicon-times-circle-fill"
                    })
                  ], 4)) : (0, import_vue14.createCommentVNode)("v-if", true)
                ], 2)
              ]),
              _: 3
            }, 8, ["color", "transprent", "margin", "round", "border", "padding", "class", "width", "unit"])
          ]),
          _: 3
        }, 8, ["width"])) : (0, import_vue14.createCommentVNode)("v-if", true);
      };
    }
  });
  var tmImage = /* @__PURE__ */ _export_sfc(_sfc_main14, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-image/tm-image.vue"]]);

  // F:/CoinQT/CoinQT_app/unpackage/dist/dev/.nvue/tm-upload.js
  var __defProp16 = Object.defineProperty;
  var __defProps15 = Object.defineProperties;
  var __getOwnPropDescs15 = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols15 = Object.getOwnPropertySymbols;
  var __hasOwnProp16 = Object.prototype.hasOwnProperty;
  var __propIsEnum15 = Object.prototype.propertyIsEnumerable;
  var __defNormalProp15 = (obj, key, value) => key in obj ? __defProp16(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues15 = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp16.call(b, prop))
        __defNormalProp15(a, prop, b[prop]);
    if (__getOwnPropSymbols15)
      for (var prop of __getOwnPropSymbols15(b)) {
        if (__propIsEnum15.call(b, prop))
          __defNormalProp15(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps15 = (a, b) => __defProps15(a, __getOwnPropDescs15(b));
  var statusCode = /* @__PURE__ */ ((statusCode2) => {
    statusCode2[statusCode2["upload"] = 0] = "upload";
    statusCode2[statusCode2["uploading"] = 1] = "uploading";
    statusCode2[statusCode2["fail"] = 2] = "fail";
    statusCode2[statusCode2["success"] = 3] = "success";
    statusCode2[statusCode2["max"] = 4] = "max";
    return statusCode2;
  })(statusCode || {});
  function getUid2(length = 3) {
    return Number(Number(Math.random().toString().substr(3, length) + Date.now()).toString(8));
  }
  var uploadfile = class {
    constructor(config) {
      var _a2;
      this.filelist = [];
      this.isStop = false;
      this.index = 0;
      this.config = {};
      let cf = { maxSize: 10 * 1024 * 1024, maxFile: 9, fileType: ["album", "camera"], fileList: [], autoUpload: true, header: {}, formData: {} };
      cf = __spreadValues15(__spreadValues15({}, cf), (_a2 = arguments[0]) != null ? _a2 : {});
      this.config = cf;
      this.addFile(cf.fileList);
      delete this.config.fileList;
    }
    beforeChooesefile() {
      return __async(this, null, function* () {
        return true;
      });
    }
    chooesefileAfter(fileList) {
      return __async(this, null, function* () {
        return fileList;
      });
    }
    chooesefileSuccess(fileList) {
      return __async(this, null, function* () {
        return fileList;
      });
    }
    delete(item) {
      let index = this.filelist.findIndex((el) => el.uid == item.uid);
      if (index > -1) {
        let p = [...this.filelist];
        p.splice(index, 1);
        this.filelist = [...p];
      }
      return this.filelist;
    }
    setFileStatus(item) {
      let index = this.filelist.findIndex((el) => el.uid == item.uid);
      if (index > -1) {
        let p = [...this.filelist];
        p.splice(index, 1, item);
        this.filelist = [...p];
      }
    }
    chooesefile() {
      return __async(this, null, function* () {
        let t = this;
        return new Promise((rs, rj) => __async(this, null, function* () {
          let isready = yield t.beforeChooesefile();
          if (!isready) {
            rs([]);
            return;
          }
          uni.chooseImage({
            count: t.config.maxFile,
            sourceType: t.config.fileType,
            fail: (e) => {
              rj("\u53D6\u6D88\u9009\u62E9");
            },
            success: (res) => __async(this, null, function* () {
              if (res.tempFilePaths.length == 0) {
                rj("\u672A\u9009\u62E9");
                return;
              }
              let imgarray = res.tempFilePaths;
              let fielist = res.tempFiles;
              let jgsk = [];
              imgarray.forEach((item, index) => {
                var _a2;
                let isMaxsize = fielist[index].size > t.config.maxSize ? true : false;
                jgsk.push({
                  url: item,
                  status: isMaxsize ? "\u8D85\u8FC7\u5927\u5C0F" : "\u5F85\u4E0A\u4F20",
                  progress: isMaxsize ? 100 : 0,
                  uid: getUid2(),
                  statusCode: isMaxsize ? 4 : 0,
                  response: null,
                  name: (_a2 = fielist[index].name) != null ? _a2 : ""
                });
              });
              let isreadyChoose = yield t.chooesefileAfter(jgsk);
              if (!Array.isArray(isreadyChoose) || typeof isreadyChoose != "object") {
                rj("chooesefileAfter:\u51FD\u6570\u8FC7\u6EE4\uFF0C\u6CA1\u6709\u8FD4\u56DE\u6587\u4EF6\u5217\u8868\u3002");
                return;
              }
              t.filelist.push(...isreadyChoose);
              t.chooesefileSuccess(isreadyChoose);
              rs(isreadyChoose);
              if (t.config.autoUpload) {
                setTimeout(function() {
                  t.start();
                }, 500);
              }
            })
          });
        }));
      });
    }
    chooseMPH5weixinFile() {
      return __async(this, null, function* () {
        let t = this;
        return new Promise((rs, rj) => {
          var _a2;
          var fs = uni.chooseFile;
          var config = {
            count: t.config.maxfile,
            type: t.config.type,
            extension: t.config.extension
          };
          if (!t.config.extension || !Array.isArray(t.config.extension) || ((_a2 = t.config.extension) == null ? void 0 : _a2.length) == 0) {
            delete config.extension;
          }
          fs(__spreadProps15(__spreadValues15({}, config), {
            fail: (e) => {
              formatAppLog("error", "at tmui/components/tm-upload/upload.ts:186", e);
              uni.$tm.toast("\u5DF2\u53D6\u6D88\u9009\u62E9");
              rj(e);
            },
            success: (res) => {
              if (res.tempFiles.length == 0) {
                uni.$tm.toast("\u672A\u9009\u62E9");
                return;
              }
              let fielist = res.tempFiles;
              let jgsk = [];
              fielist.forEach((item, index) => {
                let isMaxsize = fielist[index].size > t.config.maxsize ? true : false;
                let ftype = item.name || "";
                if (ftype) {
                  ftype = ftype.substr(ftype.lastIndexOf(".") + 1).toLocaleLowerCase();
                }
                jgsk.push({
                  url: item.path,
                  name: item.name || "\u9ED8\u8BA4\u6587\u4EF6\u540D\u79F0",
                  type: ftype,
                  status: isMaxsize ? "\u8D85\u8FC7\u5927\u5C0F" : "\u5F85\u4E0A\u4F20",
                  progress: isMaxsize ? 100 : 0,
                  fileId: guid(),
                  statusCode: isMaxsize ? 4 : 0,
                  data: null
                });
              });
              t.filelist.push(...jgsk);
              t.selected(t.filelist);
              if (t.config.isAuto) {
                t.start();
              }
              rs(t.filelist);
            }
          }));
        });
      });
    }
    setConfig(config) {
      this.config = __spreadValues15(__spreadValues15({}, this.config), config != null ? config : {});
    }
    addFile(filelist = []) {
      if (typeof filelist !== "object" && !Array.isArray(filelist))
        return;
      let total_uid = new Set(this.filelist.map((e) => e.uid));
      let total_url = new Set(this.filelist.map((e) => e.url));
      let cfilelist = filelist.map((el) => {
        var _a2, _b2, _c, _d, _e, _f, _g;
        return __spreadProps15(__spreadValues15({}, el), {
          status: (_a2 = el == null ? void 0 : el.status) != null ? _a2 : "\u5F85\u4E0A\u4F20",
          statusCode: (_b2 = el == null ? void 0 : el.statusCode) != null ? _b2 : 0,
          uid: (_c = el == null ? void 0 : el.uid) != null ? _c : getUid2(),
          progress: (_d = el == null ? void 0 : el.progress) != null ? _d : 0,
          name: (_e = el == null ? void 0 : el.name) != null ? _e : "",
          response: (_f = el == null ? void 0 : el.response) != null ? _f : null,
          url: (_g = el == null ? void 0 : el.url) != null ? _g : ""
        });
      });
      let filterFIle = cfilelist.filter((item) => !total_uid.has(item.uid) && !total_url.has(item.url));
      this.filelist.push(...filterFIle);
    }
    beforeSuccess(item) {
      return __async(this, null, function* () {
        return true;
      });
    }
    beforeStart(item) {
      return __async(this, null, function* () {
        return true;
      });
    }
    progress(item) {
    }
    fail(item) {
    }
    success(item, fileList) {
    }
    complete(filelist) {
    }
    uploadComplete(filelist) {
    }
    start() {
      return __async(this, null, function* () {
        if (this.filelist.length <= 0) {
          formatAppLog("error", "at tmui/components/tm-upload/upload.ts:272", "\u672A\u9009\u62E9\u56FE\u7247,\u5DF2\u53D6\u6D88\u4E0A\u4F20");
          return;
        }
        let t = this;
        this.index = 0;
        this.isStop = false;
        function startupload() {
          return __async(this, null, function* () {
            var _a2, _b2;
            if (t.isStop)
              return;
            let item = t.filelist[t.index];
            let canbleStart = yield t.beforeStart(item);
            if (!canbleStart) {
              item.statusCode = 2;
              item.status = "\u4E0D\u5141\u8BB8\u4E0A\u4F20";
              t.filelist.splice(t.index, 1, item);
              t.index++;
              startupload();
              return;
            }
            if (!item || typeof item === "undefined") {
              t.uploadComplete(t.filelist);
              return;
            }
            if (item.statusCode == 3 || item.statusCode == 1 || item.statusCode == 4) {
              t.index++;
              startupload();
              return;
            }
            item.statusCode = 1;
            item.status = "\u4E0A\u4F20\u4E2D...";
            t.setFileStatus(item);
            const upObj = uni.uploadFile({
              url: String(t.config.hostUrl),
              name: "file",
              header: (_b2 = (_a2 = t.config) == null ? void 0 : _a2.header) != null ? _b2 : {},
              filePath: item.url,
              formData: __spreadValues15({ name: item.name }, t.config.formData),
              success: (res) => {
                if (res.statusCode != 200) {
                  item.statusCode = 2;
                  item.status = "\u4E0A\u4F20\u5931\u8D25";
                  t.fail(item);
                  t.setFileStatus(item);
                  t.index++;
                  return;
                }
                item.response = res.data;
                let isOksuccess = t.beforeSuccess(item);
                if (!isOksuccess) {
                  item.statusCode = 2;
                  item.status = "\u4E0A\u4F20\u5931\u8D25";
                  t.fail(item);
                  t.setFileStatus(item);
                  t.index++;
                  return;
                }
                item.statusCode = 3;
                item.status = "\u4E0A\u4F20\u6210\u529F";
                t.setFileStatus(item);
                t.success(item, t.filelist);
                t.index++;
              },
              fail: (res) => {
                item.statusCode = 2;
                item.status = "\u4E0A\u4F20\u5931\u8D25";
                t.setFileStatus(item);
                t.fail(item);
                t.index++;
              },
              complete: (res) => {
                t.complete(item);
                startupload();
              }
            });
            if (upObj) {
              let item2 = t.filelist[t.index];
              upObj.onProgressUpdate((res) => {
                item2.progress = res.progress;
                if (item2.progress >= 100) {
                  item2.status = "\u4E0A\u4F20\u6210\u529F";
                  item2.statusCode = 3;
                } else {
                  item2.statusCode = 1;
                  item2.status = "\u4E0A\u4F20\u4E2D...";
                }
                t.setFileStatus(item2);
                t.progress(item2);
              });
            }
          });
        }
        yield startupload();
      });
    }
    stop() {
      this.isStop = true;
    }
  };
  var _sfc_main15 = /* @__PURE__ */ (0, import_vue15.defineComponent)({
    __name: "tm-upload",
    props: {
      followTheme: {
        type: [Boolean, String],
        default: true
      },
      width: {
        type: Number,
        default: 700
      },
      rows: {
        type: Number,
        default: 5
      },
      imageHeight: {
        type: Number,
        default: 140
      },
      defaultValue: {
        type: Array,
        default: () => []
      },
      modelValue: {
        type: Array,
        default: () => []
      },
      color: {
        type: String,
        default: "primary"
      },
      header: {
        type: Object,
        default: () => {
        }
      },
      formData: {
        type: Object,
        default: () => {
        }
      },
      maxFile: {
        type: Number,
        default: 9
      },
      maxSize: {
        type: Number,
        default: 10 * 1024 * 1024
      },
      url: {
        type: String,
        default: "",
        required: true
      },
      autoUpload: {
        type: Boolean,
        default: true
      },
      disabled: {
        type: Boolean,
        default: false
      },
      onRemove: {
        type: [Function, Boolean],
        default: () => {
          return (item) => true;
        }
      },
      onStart: {
        type: [Function, Boolean],
        default: () => {
          return (item) => true;
        }
      },
      onSuccessAfter: {
        type: [Function, Boolean],
        default: () => {
          return (item) => true;
        }
      },
      beforeChooese: {
        type: [Function, Boolean],
        default: () => {
          return (item) => true;
        }
      }
    },
    emits: ["success", "fail", "complete", "change", "remove", "uploadComplete", "update:modelValue"],
    setup(__props, { expose, emit: emits }) {
      var _a2, _b2, _c;
      const props = __props;
      const proxy = (_b2 = (_a2 = (0, import_vue15.getCurrentInstance)()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const itemWidth = (0, import_vue15.computed)(() => {
        return props.width / props.rows;
      });
      const itemHeight = (0, import_vue15.computed)(() => {
        return props.imageHeight;
      });
      const _filelist = (0, import_vue15.ref)([]);
      const _disabledAdd = (0, import_vue15.computed)(() => {
        return props.disabled || _filelist.value.length >= props.maxFile;
      });
      const _uploadObj = new uploadfile({ hostUrl: props.url, autoUpload: props.autoUpload, fileList: addSuccess(props.defaultValue), header: props.header, formData: props.formData, maxFile: props.maxFile, maxSize: props.maxSize });
      _filelist.value = [..._uploadObj.filelist];
      emits("update:modelValue", _filelist.value);
      (0, import_vue15.watch)([() => props.header, () => props.maxFile, () => props.maxSize, () => props.formData], () => {
        _uploadObj.setConfig({ hostUrl: props.url, header: props.header, formData: props.formData, maxFile: props.maxFile, maxSize: props.maxSize });
      }, { deep: true });
      function addSuccess(fileList = []) {
        fileList = (0, import_vue15.toRaw)(fileList);
        let fl = fileList.map((e) => {
          let _itemfile = { url: "" };
          if (typeof e == "string") {
            _itemfile.url = e;
          } else {
            _itemfile = __spreadValues15({}, e);
          }
          _itemfile = __spreadProps15(__spreadValues15({}, _itemfile), { statusCode: statusCode.success, status: "\u4E0A\u4F20\u6210\u529F", progress: 100 });
          return _itemfile;
        });
        return fl;
      }
      _uploadObj.beforeChooesefile = function() {
        return __async(this, null, function* () {
          _uploadObj.setConfig({ maxFile: props.maxFile - _filelist.value.length });
          if (typeof props.beforeChooese === "function") {
            let p = yield props.beforeChooese();
            if (typeof p === "function") {
              p = yield p();
            }
            if (!p)
              return false;
          }
          return true;
        });
      };
      _uploadObj.beforeSuccess = function(item) {
        return __async(this, null, function* () {
          if (typeof props.onSuccessAfter === "function") {
            let p = yield props.onSuccessAfter(item);
            if (typeof p === "function") {
              p = yield p(item);
            }
            if (!p)
              return false;
          }
          return true;
        });
      };
      _uploadObj.beforeStart = function(item) {
        return __async(this, null, function* () {
          if (typeof props.onStart === "function") {
            let p = yield props.onStart(item);
            if (typeof p === "function") {
              p = yield p(item);
            }
            if (!p)
              return false;
          }
          return true;
        });
      };
      _uploadObj.complete = function(item) {
        _filelist.value = [..._uploadObj.filelist];
        emits("complete", (0, import_vue15.toRaw)(item), (0, import_vue15.toRaw)(_filelist.value));
        emits("update:modelValue", _filelist.value);
        pushFormItem(true);
      };
      (0, import_vue15.watch)(() => props.modelValue, () => {
        let fl = Array.isArray(props.modelValue) ? props.modelValue : [];
        if (fl.length == 0) {
          _filelist.value = [];
          _uploadObj.filelist = [];
        } else {
          _uploadObj.addFile(addSuccess(fl));
          _filelist.value = [..._uploadObj.filelist];
        }
      });
      _uploadObj.uploadComplete = function(filelist) {
        emits("uploadComplete", filelist);
      };
      _uploadObj.success = function(item, fileList) {
        let index = _filelist.value.findIndex((el) => el.uid == item.uid);
        if (index > -1) {
          _filelist.value.splice(index, 1, item);
          emits("success", (0, import_vue15.toRaw)(item), (0, import_vue15.toRaw)(_filelist.value));
          emits("change", (0, import_vue15.toRaw)(_filelist.value));
        }
      };
      _uploadObj.fail = function(item) {
        let index = _filelist.value.findIndex((el) => el.uid == item.uid);
        if (index > -1) {
          _filelist.value.splice(index, 1, item);
          emits("fail", (0, import_vue15.toRaw)(item), (0, import_vue15.toRaw)(_filelist.value));
          emits("change", (0, import_vue15.toRaw)(_filelist.value));
        }
      };
      function chooseFile() {
        _uploadObj.chooesefile().then((fileList) => {
          _filelist.value.push(...fileList);
          emits("update:modelValue", _filelist.value);
        });
      }
      function deletedFile(item) {
        return __async(this, null, function* () {
          if (typeof props.onRemove === "function") {
            let p = yield props.onRemove(item);
            if (typeof p === "function") {
              p = yield p(item);
            }
            if (!p)
              return false;
          }
          const delfilelist = _uploadObj.delete(item);
          _filelist.value = [...delfilelist];
          emits("remove", (0, import_vue15.toRaw)(item));
          emits("update:modelValue", _filelist.value);
          emits("change", (0, import_vue15.toRaw)(_filelist.value));
          pushFormItem();
        });
      }
      function clear() {
        _uploadObj.filelist = [];
        _filelist.value = [];
        emits("update:modelValue", []);
        pushFormItem();
      }
      function del(fileId) {
        let index = _uploadObj.filelist.findIndex((el) => el.uid == fileId);
        if (index > -1) {
          const item = _uploadObj.filelist[index];
          const delfilelist = _uploadObj.delete(item);
          _filelist.value = [...delfilelist];
          emits("remove", (0, import_vue15.toRaw)(item));
          emits("update:modelValue", _filelist.value);
          emits("change", (0, import_vue15.toRaw)(_filelist.value));
          pushFormItem();
        }
      }
      function getFailList() {
        return _uploadObj.filelist.filter((el) => el.statusCode != statusCode.fail && el.statusCode != statusCode.max);
      }
      function clearFail() {
        const list = _uploadObj.filelist.filter((el) => el.statusCode != statusCode.fail && el.statusCode != statusCode.max);
        _uploadObj.filelist = list;
        _filelist.value = [...list];
        emits("update:modelValue", _filelist.value);
      }
      expose({
        start: () => {
          _uploadObj.start();
        },
        stop: () => {
          _uploadObj.stop();
        },
        clear,
        del,
        getFailList,
        clearFail
      });
      const rulesObj = (0, import_vue15.inject)("tmFormItemRules", (0, import_vue15.computed)(() => {
        return [
          {
            message: "\u8BF7\u9009\u62E9\u56FE\u7247\u4E0A\u4F20",
            required: false,
            validator: false
          }
        ];
      }));
      let parentFormItem = proxy.$parent;
      while (parentFormItem) {
        if ((parentFormItem == null ? void 0 : parentFormItem.tmFormComnameFormItem) == "tmFormComnameFormItem" || !parentFormItem) {
          break;
        } else {
          parentFormItem = (_c = parentFormItem == null ? void 0 : parentFormItem.$parent) != null ? _c : void 0;
        }
      }
      const validate = (rules) => {
        let successFile = _filelist.value.filter((el) => el.statusCode === 3);
        rules = rules.map((el) => {
          if (typeof el.validator === "function" && el.required === true) {
            return el;
          } else if (typeof el.validator === "boolean" && el.required === true) {
            return __spreadProps15(__spreadValues15({}, el), {
              validator: (val) => {
                return val.length == 0 ? false : true;
              }
            });
          } else {
            return __spreadProps15(__spreadValues15({}, el), {
              validator: (val) => {
                return true;
              }
            });
          }
        });
        let rules_filter = rules.filter((el) => {
          return typeof el.validator === "function" && el.required === true;
        });
        let rules_fun = rules_filter.map((el) => {
          return new Promise((res, rej) => __async(this, null, function* () {
            if (typeof el.validator === "function") {
              let vr = yield el.validator(successFile);
              if (vr) {
                res({
                  message: String(el.message),
                  validator: true
                });
              } else {
                rej({
                  message: el.message,
                  validator: false
                });
              }
            } else {
              res({
                message: el.message,
                validator: true
              });
            }
          }));
        });
        return Promise.all(rules_fun);
      };
      function pushFormItem(isCheckVail = true) {
        return __async(this, null, function* () {
          if (parentFormItem) {
            if (isCheckVail) {
              let successFile = _filelist.value.filter((el) => el.statusCode === 3);
              validate((0, import_vue15.toRaw)(rulesObj.value)).then((ev) => {
                parentFormItem.pushCom({
                  value: successFile,
                  isRequiredError: false,
                  componentsName: "tm-rate",
                  message: ev.length == 0 ? "" : ev[0].message
                });
              }).catch((er) => {
                parentFormItem.pushCom({
                  value: successFile,
                  isRequiredError: true,
                  componentsName: "tm-rate",
                  message: er.message
                });
              });
            }
          }
        });
      }
      pushFormItem();
      const tmFormFun = (0, import_vue15.inject)("tmFormFun", (0, import_vue15.computed)(() => ""));
      (0, import_vue15.watch)(tmFormFun, () => {
        if (tmFormFun.value == "reset") {
          _filelist.value = [];
          _uploadObj.filelist = [];
          emits("update:modelValue", []);
          pushFormItem(false);
        }
        if (tmFormFun.value == "validate") {
          pushFormItem(true);
        }
        if (tmFormFun.value == "clearValidate") {
          pushFormItem(false);
        }
      });
      return (_ctx, _cache) => {
        return (0, import_vue15.openBlock)(), (0, import_vue15.createElementBlock)("view", {
          class: "flex flex-col flex-col-top-start",
          renderWhole: true
        }, [
          (0, import_vue15.createElementVNode)("view", {
            class: "flex flex-row flex-row-top-start",
            style: (0, import_vue15.normalizeStyle)([{ "flex-wrap": "wrap" }, { width: __props.width + "rpx" }])
          }, [
            ((0, import_vue15.openBlock)(true), (0, import_vue15.createElementBlock)(import_vue15.Fragment, null, (0, import_vue15.renderList)(_filelist.value, (item, index) => {
              return (0, import_vue15.openBlock)(), (0, import_vue15.createElementBlock)("view", {
                class: "ma-5",
                key: index,
                style: (0, import_vue15.normalizeStyle)({ width: (0, import_vue15.unref)(itemWidth) - 10 + "rpx" })
              }, [
                (0, import_vue15.createVNode)(tmSheet, {
                  round: 2,
                  color: "primary",
                  text: "",
                  transprent: true,
                  padding: [0, 0],
                  margin: [0, 0],
                  class: ""
                }, {
                  default: (0, import_vue15.withCtx)(() => [
                    (0, import_vue15.createVNode)(tmImage, {
                      round: 2,
                      allowDelete: false,
                      onDelete: ($event) => deletedFile(item),
                      extra: "",
                      delete: "",
                      src: item.url,
                      width: (0, import_vue15.unref)(itemWidth) - 10,
                      height: (0, import_vue15.unref)(itemHeight) - 10
                    }, {
                      extra: (0, import_vue15.withCtx)(() => [
                        (0, import_vue15.createElementVNode)("view", {
                          style: (0, import_vue15.normalizeStyle)({ background: "rgba(0, 0, 0, 0.7)", width: (0, import_vue15.unref)(itemWidth) - 10 + "rpx" }),
                          class: (0, import_vue15.normalizeClass)([[`round-b-${2}`], "py-4 px-4 flex flex-row flex-row-center-start"])
                        }, [
                          item.statusCode == 0 || item.statusCode == 1 ? ((0, import_vue15.openBlock)(), (0, import_vue15.createBlock)(tmIcon, {
                            key: 0,
                            "font-size": 23,
                            color: "grey-3",
                            name: "tmicon-clock-fill"
                          })) : (0, import_vue15.createCommentVNode)("v-if", true),
                          item.statusCode == 0 || item.statusCode == 1 ? ((0, import_vue15.openBlock)(), (0, import_vue15.createBlock)(tmText, {
                            key: 1,
                            color: "grey-3",
                            _class: "pl-5",
                            "font-size": 23,
                            label: item.status
                          }, null, 8, ["label"])) : (0, import_vue15.createCommentVNode)("v-if", true),
                          item.statusCode == 2 || item.statusCode == 4 ? ((0, import_vue15.openBlock)(), (0, import_vue15.createBlock)(tmIcon, {
                            key: 2,
                            "font-size": 23,
                            color: "red",
                            name: "tmicon-times-circle-fill"
                          })) : (0, import_vue15.createCommentVNode)("v-if", true),
                          item.statusCode == 2 || item.statusCode == 4 ? ((0, import_vue15.openBlock)(), (0, import_vue15.createBlock)(tmText, {
                            key: 3,
                            color: "red",
                            _class: "pl-5",
                            "font-size": 23,
                            label: item.status
                          }, null, 8, ["label"])) : (0, import_vue15.createCommentVNode)("v-if", true),
                          item.statusCode == 3 ? ((0, import_vue15.openBlock)(), (0, import_vue15.createBlock)(tmIcon, {
                            key: 4,
                            "font-size": 23,
                            color: "green",
                            name: "tmicon-check-circle-fill"
                          })) : (0, import_vue15.createCommentVNode)("v-if", true),
                          item.statusCode == 3 ? ((0, import_vue15.openBlock)(), (0, import_vue15.createBlock)(tmText, {
                            key: 5,
                            color: "green",
                            _class: "pl-5",
                            "font-size": 23,
                            label: item.status
                          }, null, 8, ["label"])) : (0, import_vue15.createCommentVNode)("v-if", true)
                        ], 4)
                      ]),
                      _: 2
                    }, 1032, ["onDelete", "src", "width", "height"])
                  ]),
                  _: 2
                }, 1024)
              ], 4);
            }), 128)),
            !(0, import_vue15.unref)(_disabledAdd) ? ((0, import_vue15.openBlock)(), (0, import_vue15.createElementBlock)("view", {
              key: 0,
              onClick: chooseFile,
              class: "ma-5",
              style: (0, import_vue15.normalizeStyle)({ width: (0, import_vue15.unref)(itemWidth) - 10 + "rpx" })
            }, [
              (0, import_vue15.createVNode)(tmSheet, {
                eventPenetrationEnabled: true,
                followTheme: props.followTheme,
                round: 2,
                color: "primary",
                text: "",
                padding: [0, 0],
                margin: [0, 0],
                _class: "flex-center",
                height: (0, import_vue15.unref)(itemHeight) - 10
              }, {
                default: (0, import_vue15.withCtx)(() => [
                  (0, import_vue15.renderSlot)(_ctx.$slots, "icon", {}, () => [
                    (0, import_vue15.createVNode)(tmIcon, {
                      "font-size": 42,
                      userInteractionEnabled: false,
                      name: "tmicon-plus"
                    })
                  ])
                ]),
                _: 3
              }, 8, ["followTheme", "height"])
            ], 4)) : (0, import_vue15.createCommentVNode)("v-if", true)
          ], 4)
        ]);
      };
    }
  });
  var tmUpload = /* @__PURE__ */ _export_sfc(_sfc_main15, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-upload/tm-upload.vue"]]);

  // F:/CoinQT/CoinQT_app/unpackage/dist/dev/.nvue/tm-calendar.js
  var import_vue18 = __toESM(require_vue());

  // F:/CoinQT/CoinQT_app/unpackage/dist/dev/.nvue/index2.js
  var SECONDS_A_MINUTE = 60;
  var SECONDS_A_HOUR = SECONDS_A_MINUTE * 60;
  var SECONDS_A_DAY = SECONDS_A_HOUR * 24;
  var SECONDS_A_WEEK = SECONDS_A_DAY * 7;
  var MILLISECONDS_A_SECOND = 1e3;
  var MILLISECONDS_A_MINUTE = SECONDS_A_MINUTE * MILLISECONDS_A_SECOND;
  var MILLISECONDS_A_HOUR = SECONDS_A_HOUR * MILLISECONDS_A_SECOND;
  var MILLISECONDS_A_DAY = SECONDS_A_DAY * MILLISECONDS_A_SECOND;
  var MILLISECONDS_A_WEEK = SECONDS_A_WEEK * MILLISECONDS_A_SECOND;
  var MS = "millisecond";
  var S = "second";
  var MIN = "minute";
  var H = "hour";
  var D = "day";
  var W = "week";
  var M = "month";
  var Q = "quarter";
  var Y = "year";
  var DATE = "date";
  var FORMAT_DEFAULT = "YYYY-MM-DDTHH:mm:ssZ";
  var INVALID_DATE_STRING = "Invalid Date";
  var REGEX_PARSE = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/;
  var REGEX_FORMAT = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g;
  var en = {
    name: "en",
    weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
    months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_")
  };
  var padStart = function padStart2(string, length, pad) {
    var s = String(string);
    if (!s || s.length >= length)
      return string;
    return "" + Array(length + 1 - s.length).join(pad) + string;
  };
  var padZoneStr = function padZoneStr2(instance) {
    var negMinutes = -instance.utcOffset();
    var minutes = Math.abs(negMinutes);
    var hourOffset = Math.floor(minutes / 60);
    var minuteOffset = minutes % 60;
    return (negMinutes <= 0 ? "+" : "-") + padStart(hourOffset, 2, "0") + ":" + padStart(minuteOffset, 2, "0");
  };
  var monthDiff = function monthDiff2(a, b) {
    if (a.date() < b.date())
      return -monthDiff2(b, a);
    var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month());
    var anchor = a.clone().add(wholeMonthDiff, M);
    var c = b - anchor < 0;
    var anchor2 = a.clone().add(wholeMonthDiff + (c ? -1 : 1), M);
    return +(-(wholeMonthDiff + (b - anchor) / (c ? anchor - anchor2 : anchor2 - anchor)) || 0);
  };
  var absFloor = function absFloor2(n) {
    return n < 0 ? Math.ceil(n) || 0 : Math.floor(n);
  };
  var prettyUnit = function prettyUnit2(u) {
    var special = {
      M,
      y: Y,
      w: W,
      d: D,
      D: DATE,
      h: H,
      m: MIN,
      s: S,
      ms: MS,
      Q
    };
    return special[u] || String(u || "").toLowerCase().replace(/s$/, "");
  };
  var isUndefined = function isUndefined2(s) {
    return s === void 0;
  };
  var U = {
    s: padStart,
    z: padZoneStr,
    m: monthDiff,
    a: absFloor,
    p: prettyUnit,
    u: isUndefined
  };
  var L = "en";
  var Ls = {};
  Ls[L] = en;
  var isDayjs = function isDayjs2(d) {
    return d instanceof Dayjs;
  };
  var parseLocale = function parseLocale2(preset, object, isLocal) {
    var l;
    if (!preset)
      return L;
    if (typeof preset === "string") {
      var presetLower = preset.toLowerCase();
      if (Ls[presetLower]) {
        l = presetLower;
      }
      if (object) {
        Ls[presetLower] = object;
        l = presetLower;
      }
      var presetSplit = preset.split("-");
      if (!l && presetSplit.length > 1) {
        return parseLocale2(presetSplit[0]);
      }
    } else {
      var name = preset.name;
      Ls[name] = preset;
      l = name;
    }
    if (!isLocal && l)
      L = l;
    return l || !isLocal && L;
  };
  var dayjs = function dayjs2(date, c) {
    if (isDayjs(date)) {
      return date.clone();
    }
    var cfg = typeof c === "object" ? c : {};
    cfg.date = date;
    cfg.args = arguments;
    return new Dayjs(cfg);
  };
  var wrapper = function wrapper2(date, instance) {
    return dayjs(date, {
      locale: instance.$L,
      utc: instance.$u,
      x: instance.$x,
      $offset: instance.$offset
    });
  };
  var Utils = U;
  Utils.l = parseLocale;
  Utils.i = isDayjs;
  Utils.w = wrapper;
  var parseDate = function parseDate2(cfg) {
    var date = cfg.date, utc = cfg.utc;
    if (date === null)
      return new Date(NaN);
    if (Utils.u(date))
      return new Date();
    if (date instanceof Date)
      return new Date(date);
    if (typeof date === "string" && !/Z$/i.test(date)) {
      var d = date.match(REGEX_PARSE);
      if (d) {
        var m = d[2] - 1 || 0;
        var ms = (d[7] || "0").substring(0, 3);
        if (utc) {
          return new Date(Date.UTC(d[1], m, d[3] || 1, d[4] || 0, d[5] || 0, d[6] || 0, ms));
        }
        return new Date(d[1], m, d[3] || 1, d[4] || 0, d[5] || 0, d[6] || 0, ms);
      }
    }
    return new Date(date);
  };
  var Dayjs = /* @__PURE__ */ function() {
    function Dayjs2(cfg) {
      this.$L = parseLocale(cfg.locale, null, true);
      this.parse(cfg);
    }
    var _proto = Dayjs2.prototype;
    _proto.parse = function parse(cfg) {
      this.$d = parseDate(cfg);
      this.$x = cfg.x || {};
      this.init();
    };
    _proto.init = function init() {
      var $d = this.$d;
      this.$y = $d.getFullYear();
      this.$M = $d.getMonth();
      this.$D = $d.getDate();
      this.$W = $d.getDay();
      this.$H = $d.getHours();
      this.$m = $d.getMinutes();
      this.$s = $d.getSeconds();
      this.$ms = $d.getMilliseconds();
    };
    _proto.$utils = function $utils() {
      return Utils;
    };
    _proto.isValid = function isValid() {
      return !(this.$d.toString() === INVALID_DATE_STRING);
    };
    _proto.isSame = function isSame(that, units) {
      var other = dayjs(that);
      return this.startOf(units) <= other && other <= this.endOf(units);
    };
    _proto.isAfter = function isAfter(that, units) {
      return dayjs(that) < this.startOf(units);
    };
    _proto.isBefore = function isBefore(that, units) {
      return this.endOf(units) < dayjs(that);
    };
    _proto.$g = function $g(input, get, set) {
      if (Utils.u(input))
        return this[get];
      return this.set(set, input);
    };
    _proto.unix = function unix() {
      return Math.floor(this.valueOf() / 1e3);
    };
    _proto.valueOf = function valueOf() {
      return this.$d.getTime();
    };
    _proto.startOf = function startOf(units, _startOf) {
      var _this = this;
      var isStartOf = !Utils.u(_startOf) ? _startOf : true;
      var unit = Utils.p(units);
      var instanceFactory = function instanceFactory2(d, m) {
        var ins = Utils.w(_this.$u ? Date.UTC(_this.$y, m, d) : new Date(_this.$y, m, d), _this);
        return isStartOf ? ins : ins.endOf(D);
      };
      var instanceFactorySet = function instanceFactorySet2(method, slice) {
        var argumentStart = [0, 0, 0, 0];
        var argumentEnd = [23, 59, 59, 999];
        return Utils.w(_this.toDate()[method].apply(_this.toDate("s"), (isStartOf ? argumentStart : argumentEnd).slice(slice)), _this);
      };
      var $W = this.$W, $M = this.$M, $D = this.$D;
      var utcPad = "set" + (this.$u ? "UTC" : "");
      switch (unit) {
        case Y:
          return isStartOf ? instanceFactory(1, 0) : instanceFactory(31, 11);
        case M:
          return isStartOf ? instanceFactory(1, $M) : instanceFactory(0, $M + 1);
        case W: {
          var weekStart = this.$locale().weekStart || 0;
          var gap = ($W < weekStart ? $W + 7 : $W) - weekStart;
          return instanceFactory(isStartOf ? $D - gap : $D + (6 - gap), $M);
        }
        case D:
        case DATE:
          return instanceFactorySet(utcPad + "Hours", 0);
        case H:
          return instanceFactorySet(utcPad + "Minutes", 1);
        case MIN:
          return instanceFactorySet(utcPad + "Seconds", 2);
        case S:
          return instanceFactorySet(utcPad + "Milliseconds", 3);
        default:
          return this.clone();
      }
    };
    _proto.endOf = function endOf(arg) {
      return this.startOf(arg, false);
    };
    _proto.$set = function $set(units, _int) {
      var _C$D$C$DATE$C$M$C$Y$C;
      var unit = Utils.p(units);
      var utcPad = "set" + (this.$u ? "UTC" : "");
      var name = (_C$D$C$DATE$C$M$C$Y$C = {}, _C$D$C$DATE$C$M$C$Y$C[D] = utcPad + "Date", _C$D$C$DATE$C$M$C$Y$C[DATE] = utcPad + "Date", _C$D$C$DATE$C$M$C$Y$C[M] = utcPad + "Month", _C$D$C$DATE$C$M$C$Y$C[Y] = utcPad + "FullYear", _C$D$C$DATE$C$M$C$Y$C[H] = utcPad + "Hours", _C$D$C$DATE$C$M$C$Y$C[MIN] = utcPad + "Minutes", _C$D$C$DATE$C$M$C$Y$C[S] = utcPad + "Seconds", _C$D$C$DATE$C$M$C$Y$C[MS] = utcPad + "Milliseconds", _C$D$C$DATE$C$M$C$Y$C)[unit];
      var arg = unit === D ? this.$D + (_int - this.$W) : _int;
      if (unit === M || unit === Y) {
        var date = this.clone().set(DATE, 1);
        date.$d[name](arg);
        date.init();
        this.$d = date.set(DATE, Math.min(this.$D, date.daysInMonth())).$d;
      } else if (name)
        this.$d[name](arg);
      this.init();
      return this;
    };
    _proto.set = function set(string, _int2) {
      return this.clone().$set(string, _int2);
    };
    _proto.get = function get(unit) {
      return this[Utils.p(unit)]();
    };
    _proto.add = function add(number, units) {
      var _this2 = this, _C$MIN$C$H$C$S$unit;
      number = Number(number);
      var unit = Utils.p(units);
      var instanceFactorySet = function instanceFactorySet2(n) {
        var d = dayjs(_this2);
        return Utils.w(d.date(d.date() + Math.round(n * number)), _this2);
      };
      if (unit === M) {
        return this.set(M, this.$M + number);
      }
      if (unit === Y) {
        return this.set(Y, this.$y + number);
      }
      if (unit === D) {
        return instanceFactorySet(1);
      }
      if (unit === W) {
        return instanceFactorySet(7);
      }
      var step = (_C$MIN$C$H$C$S$unit = {}, _C$MIN$C$H$C$S$unit[MIN] = MILLISECONDS_A_MINUTE, _C$MIN$C$H$C$S$unit[H] = MILLISECONDS_A_HOUR, _C$MIN$C$H$C$S$unit[S] = MILLISECONDS_A_SECOND, _C$MIN$C$H$C$S$unit)[unit] || 1;
      var nextTimeStamp = this.$d.getTime() + number * step;
      return Utils.w(nextTimeStamp, this);
    };
    _proto.subtract = function subtract(number, string) {
      return this.add(number * -1, string);
    };
    _proto.format = function format(formatStr) {
      var _this3 = this;
      var locale = this.$locale();
      if (!this.isValid())
        return locale.invalidDate || INVALID_DATE_STRING;
      var str = formatStr || FORMAT_DEFAULT;
      var zoneStr = Utils.z(this);
      var $H = this.$H, $m = this.$m, $M = this.$M;
      var weekdays = locale.weekdays, months = locale.months, meridiem = locale.meridiem;
      var getShort = function getShort2(arr, index, full, length) {
        return arr && (arr[index] || arr(_this3, str)) || full[index].slice(0, length);
      };
      var get$H = function get$H2(num) {
        return Utils.s($H % 12 || 12, num, "0");
      };
      var meridiemFunc = meridiem || function(hour, minute, isLowercase) {
        var m = hour < 12 ? "AM" : "PM";
        return isLowercase ? m.toLowerCase() : m;
      };
      var matches = {
        YY: String(this.$y).slice(-2),
        YYYY: this.$y,
        M: $M + 1,
        MM: Utils.s($M + 1, 2, "0"),
        MMM: getShort(locale.monthsShort, $M, months, 3),
        MMMM: getShort(months, $M),
        D: this.$D,
        DD: Utils.s(this.$D, 2, "0"),
        d: String(this.$W),
        dd: getShort(locale.weekdaysMin, this.$W, weekdays, 2),
        ddd: getShort(locale.weekdaysShort, this.$W, weekdays, 3),
        dddd: weekdays[this.$W],
        H: String($H),
        HH: Utils.s($H, 2, "0"),
        h: get$H(1),
        hh: get$H(2),
        a: meridiemFunc($H, $m, true),
        A: meridiemFunc($H, $m, false),
        m: String($m),
        mm: Utils.s($m, 2, "0"),
        s: String(this.$s),
        ss: Utils.s(this.$s, 2, "0"),
        SSS: Utils.s(this.$ms, 3, "0"),
        Z: zoneStr
      };
      return str.replace(REGEX_FORMAT, function(match, $1) {
        return $1 || matches[match] || zoneStr.replace(":", "");
      });
    };
    _proto.utcOffset = function utcOffset() {
      return -Math.round(this.$d.getTimezoneOffset() / 15) * 15;
    };
    _proto.diff = function diff(input, units, _float) {
      var _C$Y$C$M$C$Q$C$W$C$D$;
      var unit = Utils.p(units);
      var that = dayjs(input);
      var zoneDelta = (that.utcOffset() - this.utcOffset()) * MILLISECONDS_A_MINUTE;
      var diff2 = this - that;
      var result = Utils.m(this, that);
      result = (_C$Y$C$M$C$Q$C$W$C$D$ = {}, _C$Y$C$M$C$Q$C$W$C$D$[Y] = result / 12, _C$Y$C$M$C$Q$C$W$C$D$[M] = result, _C$Y$C$M$C$Q$C$W$C$D$[Q] = result / 3, _C$Y$C$M$C$Q$C$W$C$D$[W] = (diff2 - zoneDelta) / MILLISECONDS_A_WEEK, _C$Y$C$M$C$Q$C$W$C$D$[D] = (diff2 - zoneDelta) / MILLISECONDS_A_DAY, _C$Y$C$M$C$Q$C$W$C$D$[H] = diff2 / MILLISECONDS_A_HOUR, _C$Y$C$M$C$Q$C$W$C$D$[MIN] = diff2 / MILLISECONDS_A_MINUTE, _C$Y$C$M$C$Q$C$W$C$D$[S] = diff2 / MILLISECONDS_A_SECOND, _C$Y$C$M$C$Q$C$W$C$D$)[unit] || diff2;
      return _float ? result : Utils.a(result);
    };
    _proto.daysInMonth = function daysInMonth() {
      return this.endOf(M).$D;
    };
    _proto.$locale = function $locale() {
      return Ls[this.$L];
    };
    _proto.locale = function locale(preset, object) {
      if (!preset)
        return this.$L;
      var that = this.clone();
      var nextLocaleName = parseLocale(preset, object, true);
      if (nextLocaleName)
        that.$L = nextLocaleName;
      return that;
    };
    _proto.clone = function clone() {
      return Utils.w(this.$d, this);
    };
    _proto.toDate = function toDate() {
      return new Date(this.valueOf());
    };
    _proto.toJSON = function toJSON() {
      return this.isValid() ? this.toISOString() : null;
    };
    _proto.toISOString = function toISOString() {
      return this.$d.toISOString();
    };
    _proto.toString = function toString() {
      return this.$d.toUTCString();
    };
    return Dayjs2;
  }();
  var proto = Dayjs.prototype;
  dayjs.prototype = proto;
  [["$ms", MS], ["$s", S], ["$m", MIN], ["$H", H], ["$W", D], ["$M", M], ["$y", Y], ["$D", DATE]].forEach(function(g) {
    proto[g[1]] = function(input) {
      return this.$g(input, g[0], g[1]);
    };
  });
  dayjs.extend = function(plugin, option) {
    if (!plugin.$i) {
      plugin(option, Dayjs, dayjs);
      plugin.$i = true;
    }
    return dayjs;
  };
  dayjs.locale = parseLocale;
  dayjs.isDayjs = isDayjs;
  dayjs.unix = function(timestamp) {
    return dayjs(timestamp * 1e3);
  };
  dayjs.en = Ls[L];
  dayjs.Ls = Ls;
  dayjs.p = {};
  var isSameOrBefore = function(o, c) {
    c.prototype.isSameOrBefore = function(that, units) {
      return this.isSame(that, units) || this.isBefore(that, units);
    };
  };

  // F:/CoinQT/CoinQT_app/unpackage/dist/dev/.nvue/index3.js
  var isoWeekPrettyUnit = "isoweek";
  var isoWeek = function(o, c, d) {
    var getYearFirstThursday = function getYearFirstThursday2(year, isUtc) {
      var yearFirstDay = (isUtc ? d.utc : d)().year(year).startOf(Y);
      var addDiffDays = 4 - yearFirstDay.isoWeekday();
      if (yearFirstDay.isoWeekday() > 4) {
        addDiffDays += 7;
      }
      return yearFirstDay.add(addDiffDays, D);
    };
    var getCurrentWeekThursday = function getCurrentWeekThursday2(ins) {
      return ins.add(4 - ins.isoWeekday(), D);
    };
    var proto2 = c.prototype;
    proto2.isoWeekYear = function() {
      var nowWeekThursday = getCurrentWeekThursday(this);
      return nowWeekThursday.year();
    };
    proto2.isoWeek = function(week) {
      if (!this.$utils().u(week)) {
        return this.add((week - this.isoWeek()) * 7, D);
      }
      var nowWeekThursday = getCurrentWeekThursday(this);
      var diffWeekThursday = getYearFirstThursday(this.isoWeekYear(), this.$u);
      return nowWeekThursday.diff(diffWeekThursday, W) + 1;
    };
    proto2.isoWeekday = function(week) {
      if (!this.$utils().u(week)) {
        return this.day(this.day() % 7 ? week : week - 7);
      }
      return this.day() || 7;
    };
    var oldStartOf = proto2.startOf;
    proto2.startOf = function(units, startOf) {
      var utils = this.$utils();
      var isStartOf = !utils.u(startOf) ? startOf : true;
      var unit = utils.p(units);
      if (unit === isoWeekPrettyUnit) {
        return isStartOf ? this.date(this.date() - (this.isoWeekday() - 1)).startOf("day") : this.date(this.date() - 1 - (this.isoWeekday() - 1) + 7).endOf("day");
      }
      return oldStartOf.bind(this)(units, startOf);
    };
  };

  // F:/CoinQT/CoinQT_app/unpackage/dist/dev/.nvue/index4.js
  var isSameOrAfter = function(o, c) {
    c.prototype.isSameOrAfter = function(that, units) {
      return this.isSame(that, units) || this.isAfter(that, units);
    };
  };
  var isBetween = function(o, c, d) {
    c.prototype.isBetween = function(a, b, u, i) {
      var dA = d(a);
      var dB = d(b);
      i = i || "()";
      var dAi = i[0] === "(";
      var dBi = i[1] === ")";
      return (dAi ? this.isAfter(dA, u) : !this.isBefore(dA, u)) && (dBi ? this.isBefore(dB, u) : !this.isAfter(dB, u)) || (dAi ? this.isBefore(dA, u) : !this.isAfter(dA, u)) && (dBi ? this.isAfter(dB, u) : !this.isBefore(dB, u));
    };
  };

  // F:/CoinQT/CoinQT_app/unpackage/dist/dev/.nvue/tm-drawer.js
  var import_vue17 = __toESM(require_vue());

  // F:/CoinQT/CoinQT_app/unpackage/dist/dev/.nvue/tm-overlay.js
  var import_vue16 = __toESM(require_vue());
  var __defProp17 = Object.defineProperty;
  var __defProps16 = Object.defineProperties;
  var __getOwnPropDescs16 = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols16 = Object.getOwnPropertySymbols;
  var __hasOwnProp17 = Object.prototype.hasOwnProperty;
  var __propIsEnum16 = Object.prototype.propertyIsEnumerable;
  var __defNormalProp16 = (obj, key, value) => key in obj ? __defProp17(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues16 = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp17.call(b, prop))
        __defNormalProp16(a, prop, b[prop]);
    if (__getOwnPropSymbols16)
      for (var prop of __getOwnPropSymbols16(b)) {
        if (__propIsEnum16.call(b, prop))
          __defNormalProp16(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps16 = (a, b) => __defProps16(a, __getOwnPropDescs16(b));
  var _style_06 = { "overlay": { "": { "transitionTimingFunction": "ease", "transitionProperty": "opacity", "transitionDelay": 0, "opacity": 0 } }, "blurOn": { "": { "opacity": 1 } }, "blurOff": { "": { "opacity": 0 } }, "@TRANSITION": { "overlay": { "timingFunction": "ease", "property": "opacity", "delay": 0 } } };
  var _sfc_main16 = /* @__PURE__ */ (0, import_vue16.defineComponent)({
    __name: "tm-overlay",
    props: __spreadProps16(__spreadValues16({}, custom_props), {
      align: {
        type: String,
        default: "flex-center"
      },
      bgColor: {
        type: String,
        default: "rgba(0,0,0,0.4)"
      },
      zIndex: {
        type: [Number, String],
        default: 999
      },
      show: {
        type: Boolean,
        default: false
      },
      overlayClick: {
        type: Boolean,
        default: true
      },
      transprent: {
        type: [Boolean, String],
        default: false
      },
      duration: {
        type: Number,
        default: 300
      }
    }),
    emits: ["click", "open", "close", "update:show"],
    setup(__props, { expose, emit: emits }) {
      var _a2, _b2;
      const props = __props;
      const animation = requireNativePlugin("animation");
      const proxy = (_b2 = (_a2 = (0, import_vue16.getCurrentInstance)()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const customCSSStyle = computedStyle(props);
      const customClass = computedClass(props);
      const sysinfo = (0, import_vue16.inject)("tmuiSysInfo", (0, import_vue16.computed)(() => {
        return { bottom: 0, height: 750, width: uni.upx2px(750), top: 0, isCustomHeader: false, sysinfo: null };
      }));
      const width = (0, import_vue16.computed)(() => sysinfo.value.width);
      const height = (0, import_vue16.computed)(() => sysinfo.value.height);
      const top = (0, import_vue16.computed)(() => sysinfo.value.top);
      (0, import_vue16.ref)(false);
      let timids = uni.$tm.u.getUid(1);
      let timerId = NaN;
      (0, import_vue16.ref)(null);
      const showMask = (0, import_vue16.ref)(false);
      const ani = (0, import_vue16.ref)(false);
      (0, import_vue16.onUnmounted)(() => clearTimeout(timerId));
      const align_rpx = (0, import_vue16.computed)(() => props.align);
      const bgColor_rp = (0, import_vue16.computed)(() => {
        if (!props.bgColor || props.transprent)
          return "rgba(0,0,0,0)";
        return props.bgColor || "rgba(0,0,0,0.4)";
      });
      (0, import_vue16.onMounted)(() => {
        if (!props.show)
          return;
        open(props.show);
      });
      function close() {
        if (timerId) {
          clearTimeout(timerId);
          timerId = NaN;
        }
        open(false);
      }
      function closeByclick(e) {
        try {
          e.stopPropagation();
          e.stopImmediatePropagation();
        } catch (e2) {
        }
        emits("click", e);
        if (timerId) {
          clearTimeout(timerId);
          timerId = NaN;
        }
        if (!props.overlayClick)
          return;
        open(false);
      }
      function open(off) {
        if (off == true) {
          uni.hideKeyboard();
        }
        fadeInNvue(off);
      }
      function fadeInNvue(off = false) {
        var _a22;
        if (off == false) {
          if (showMask.value == off)
            return;
          var testEl = (_a22 = proxy == null ? void 0 : proxy.$refs) == null ? void 0 : _a22.overlay;
          animation.transition(testEl, {
            styles: {
              backgroundColor: bgColor_rp.value,
              opacity: 0
            },
            duration: props.duration || 1,
            timingFunction: "linear",
            delay: 0
          }, () => {
            showMask.value = off;
            emits("close");
            emits("update:show", false);
          });
        } else {
          showMask.value = off;
          emits("open");
          clearTimeout(timids);
          timids = setTimeout(function() {
            var testEl2 = proxy == null ? void 0 : proxy.$refs.overlay;
            animation.transition(testEl2, {
              styles: {
                backgroundColor: bgColor_rp.value,
                opacity: 1
              },
              duration: props.duration || 1,
              timingFunction: "linear",
              delay: 0
            }, () => {
            });
          }, 50);
        }
      }
      (0, import_vue16.watch)(() => props.show, (newval) => {
        open(newval);
      });
      expose({
        close,
        open
      });
      return (_ctx, _cache) => {
        return showMask.value ? ((0, import_vue16.openBlock)(), (0, import_vue16.createElementBlock)("view", {
          key: 0,
          class: "l-0",
          style: (0, import_vue16.normalizeStyle)([{ width: (0, import_vue16.unref)(width) + "px", height: (0, import_vue16.unref)(height) + "px", top: (0, import_vue16.unref)(top) + "px", position: "fixed" }, __props.zIndex ? { zIndex: __props.zIndex } : ""]),
          renderWhole: true
        }, [
          (0, import_vue16.createElementVNode)("view", {
            ref: "overlay",
            class: (0, import_vue16.normalizeClass)([(0, import_vue16.unref)(bgColor_rp) && !props.transprent && ani.value ? "blurOn" : "blurOff", "overlay"]),
            style: (0, import_vue16.normalizeStyle)([
              (0, import_vue16.unref)(bgColor_rp) && !props.transprent ? { backgroundColor: showMask.value ? (0, import_vue16.unref)(bgColor_rp) : "" } : "",
              { width: (0, import_vue16.unref)(width) + "px", height: (0, import_vue16.unref)(height) + "px", transitionDuration: props.duration + "ms" }
            ])
          }, null, 6),
          (0, import_vue16.createElementVNode)("view", {
            onClick: (0, import_vue16.withModifiers)(closeByclick, ["stop"]),
            class: (0, import_vue16.normalizeClass)([(0, import_vue16.unref)(align_rpx), " absolute flex flex-col  l-0 t-0 ", (0, import_vue16.unref)(customClass)]),
            style: (0, import_vue16.normalizeStyle)([{ width: (0, import_vue16.unref)(width) + "px", height: (0, import_vue16.unref)(height) + "px" }, (0, import_vue16.unref)(customCSSStyle)])
          }, [
            (0, import_vue16.renderSlot)(_ctx.$slots, "default")
          ], 14, ["onClick"])
        ], 4)) : (0, import_vue16.createCommentVNode)("v-if", true);
      };
    }
  });
  var tmOverlay = /* @__PURE__ */ _export_sfc(_sfc_main16, [["styles", [_style_06]], ["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-overlay/tm-overlay.vue"]]);

  // F:/CoinQT/CoinQT_app/unpackage/dist/dev/.nvue/tm-drawer.js
  var __defProp18 = Object.defineProperty;
  var __defProps17 = Object.defineProperties;
  var __getOwnPropDescs17 = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols17 = Object.getOwnPropertySymbols;
  var __hasOwnProp18 = Object.prototype.hasOwnProperty;
  var __propIsEnum17 = Object.prototype.propertyIsEnumerable;
  var __defNormalProp17 = (obj, key, value) => key in obj ? __defProp18(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues17 = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp18.call(b, prop))
        __defNormalProp17(a, prop, b[prop]);
    if (__getOwnPropSymbols17)
      for (var prop of __getOwnPropSymbols17(b)) {
        if (__propIsEnum17.call(b, prop))
          __defNormalProp17(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps17 = (a, b) => __defProps17(a, __getOwnPropDescs17(b));
  var _style_07 = { "flex-left-custom": { "": { "display": "flex", "justifyContent": "flex-start", "alignItems": "flex-start" } }, "flex-right-custom": { "": { "display": "flex", "justifyContent": "flex-start", "alignItems": "flex-end" } }, "flex-top-custom": { "": { "display": "flex", "justifyContent": "flex-start", "alignItems": "flex-start" } }, "flex-end-custom": { "": { "display": "flex", "justifyContent": "flex-end", "alignItems": "flex-end" } }, "flex-center-custom": { "": { "display": "flex", "justifyContent": "center", "alignItems": "center", "flexDirection": "row" } } };
  var _sfc_main17 = /* @__PURE__ */ (0, import_vue17.defineComponent)({
    __name: "tm-drawer",
    props: __spreadProps17(__spreadValues17({}, custom_props), {
      mask: {
        type: [Boolean, String],
        default: true
      },
      placement: {
        type: String,
        default: "bottom"
      },
      show: {
        type: [Boolean],
        default: false
      },
      width: {
        type: Number,
        default: 500
      },
      height: {
        type: Number,
        default: 600
      },
      round: {
        type: Number,
        default: 12
      },
      duration: {
        type: Number,
        default: 300
      },
      overlayClick: {
        type: Boolean,
        default: true
      },
      transprent: {
        type: [Boolean, String],
        default: false
      },
      closeable: {
        type: [Boolean, String],
        default: false
      },
      color: {
        type: String,
        default: "white"
      },
      title: [String],
      okText: {
        type: [String],
        default: "\u5B8C\u6210"
      },
      okColor: {
        type: [String],
        default: "primary"
      },
      okLoading: {
        type: [Boolean, String],
        default: false
      },
      cancelText: {
        type: [String],
        default: "\u53D6\u6D88"
      },
      hideCancel: {
        type: [Boolean, String],
        default: false
      },
      hideHeader: {
        type: [Boolean, String],
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      zIndex: {
        type: [Number, String],
        default: 401
      },
      unit: {
        type: String,
        default: "rpx"
      },
      disabbleScroll: {
        type: Boolean,
        default: false
      }
    }),
    emits: ["click", "open", "close", "update:show", "ok", "cancel"],
    setup(__props, { expose, emit: emits }) {
      var _a2, _b2;
      const props = __props;
      const drawerANI = (0, import_vue17.ref)(null);
      const overlayAni = (0, import_vue17.ref)(null);
      const store = useTmpiniaStore();
      (_b2 = (_a2 = (0, import_vue17.getCurrentInstance)()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const sysinfo = (0, import_vue17.inject)("tmuiSysInfo", (0, import_vue17.computed)(() => {
        return { bottom: 0, height: 750, width: uni.upx2px(750), top: 0, isCustomHeader: false, sysinfo: null };
      }));
      const tmcfg = (0, import_vue17.computed)(() => store.tmStore);
      const customCSSStyle = (0, import_vue17.computed)(() => computedStyle(props));
      const customClass = (0, import_vue17.computed)(() => computedClass(props));
      const isDark = (0, import_vue17.computed)(() => computedDark(props, tmcfg.value));
      const tmcomputed = (0, import_vue17.computed)(() => computedTheme(props, isDark.value, tmcfg.value));
      const syswidth = (0, import_vue17.computed)(() => sysinfo.value.width);
      const sysheight = (0, import_vue17.computed)(() => sysinfo.value.height);
      const reverse = (0, import_vue17.ref)(true);
      const timeid = (0, import_vue17.ref)(0);
      let timerId = NaN;
      let timerIdth_flas = false;
      uni.hideKeyboard();
      let _show = (0, import_vue17.ref)(props.show);
      function debounce(func, wait = 500, immediate = false) {
        if (!isNaN(timerId))
          clearTimeout(timerId);
        if (immediate) {
          var callNow = !timerId;
          timerId = setTimeout(() => {
            timerId = NaN;
          }, wait);
          if (callNow)
            typeof func === "function" && func();
        } else {
          timerId = setTimeout(() => {
            typeof func === "function" && func();
          }, wait);
        }
      }
      function throttle(func, wait = 500, immediate = true) {
        if (immediate) {
          if (!timerIdth_flas) {
            timerIdth_flas = true;
            typeof func === "function" && func();
            setTimeout(() => {
              timerIdth_flas = false;
            }, wait);
          }
        } else {
          if (!timerIdth_flas) {
            timerIdth_flas = true;
            setTimeout(() => {
              timerIdth_flas = false;
              typeof func === "function" && func();
            }, wait);
          }
        }
      }
      timeid.value = uni.$tm.u.getUid(4);
      if (_show.value) {
        reverse.value = false;
      }
      (0, import_vue17.watch)(() => props.show, (val) => {
        _show.value = props.show;
        if (val) {
          reverse.value = true;
        } else {
          reverse.value = false;
        }
      });
      (0, import_vue17.onMounted)(() => {
        if (_show.value) {
          open();
        }
      });
      const ok_loading = (0, import_vue17.computed)(() => props.okLoading);
      const round_rp = (0, import_vue17.computed)(() => {
        if (aniname.value == "left")
          return "round-r-" + props.round;
        if (aniname.value == "right")
          return "round-l-" + props.round;
        if (aniname.value == "up")
          return "round-b-" + props.round;
        if (aniname.value == "down")
          return "round-t-" + props.round;
        if (aniname.value == "zoom")
          return "round-" + props.round;
      });
      const reverse_rp = (0, import_vue17.computed)(() => {
        if (aniname.value != "zoom")
          return reverse.value;
        return !reverse.value;
      });
      const aniname = (0, import_vue17.computed)(() => {
        if (props.placement == "center")
          return "zoom";
        if (props.placement == "top")
          return "up";
        if (props.placement == "bottom")
          return "down";
        return props.placement;
      });
      const anwidth = (0, import_vue17.computed)(() => {
        if (aniname.value == "zoom") {
          return props.width + props.unit;
        }
        if (props.placement == "left" || props.placement == "right") {
          return props.width + props.unit;
        }
        return syswidth.value + "px";
      });
      const anheight = (0, import_vue17.computed)(() => {
        let wucha = 0;
        if (props.placement == "top" || props.placement == "bottom" || aniname.value == "zoom") {
          return props.height + wucha + props.unit;
        }
        return sysheight.value + "px";
      });
      const contentHeight = (0, import_vue17.computed)(() => {
        let base_height = props.hideHeader ? 0 : 44;
        if (props.placement == "top" || props.placement == "bottom" || aniname.value == "zoom") {
          let h = props.height;
          if (props.unit == "rpx") {
            h = uni.upx2px(props.height);
          }
          return h - base_height + "px";
        }
        return sysheight.value - base_height + "px";
      });
      const align_rp = (0, import_vue17.computed)(() => {
        if (aniname.value == "down") {
          return "flex-col-bottom-center";
        }
        if (aniname.value == "up") {
          return "flex-top-custom";
        }
        if (aniname.value == "left") {
          return "flex-row-top-start";
        }
        if (aniname.value == "right") {
          return "flex-row-bottom-start";
        }
        if (aniname.value == "zoom") {
          return "flex-center";
        }
      });
      function OverLayOpen() {
        (0, import_vue17.nextTick)(function() {
          var _a22;
          (_a22 = drawerANI.value) == null ? void 0 : _a22.play();
        });
        emits("open");
        emits("update:show", true);
        _show.value = true;
      }
      function overclose() {
        (0, import_vue17.nextTick)(() => {
          emits("close");
          emits("update:show", false);
          _show.value = false;
        });
      }
      function overlayClickFun(e) {
        emits("click", e);
        if (!props.overlayClick || props.disabled || !overlayAni.value)
          return;
        reverse.value = false;
        throttle(() => {
          var _a22, _b22;
          (_a22 = overlayAni.value) == null ? void 0 : _a22.close();
          (_b22 = drawerANI.value) == null ? void 0 : _b22.play();
        }, props.duration + 80, true);
      }
      function ok() {
        if (props.disabled)
          return;
        reverse.value = false;
        debounce(() => {
          var _a22, _b22;
          emits("ok");
          (_a22 = overlayAni.value) == null ? void 0 : _a22.close();
          (_b22 = drawerANI.value) == null ? void 0 : _b22.play();
        }, 500, true);
      }
      function cancel() {
        if (props.disabled)
          return;
        reverse.value = false;
        debounce(() => {
          var _a22, _b22;
          emits("cancel");
          (_a22 = overlayAni.value) == null ? void 0 : _a22.close();
          (_b22 = drawerANI.value) == null ? void 0 : _b22.play();
        }, 500, true);
      }
      function open() {
        reverse.value = true;
        _show.value = true;
      }
      function close() {
        var _a22, _b22;
        reverse.value = false;
        (_a22 = overlayAni.value) == null ? void 0 : _a22.close();
        (_b22 = drawerANI.value) == null ? void 0 : _b22.play();
      }
      expose({
        close,
        open
      });
      return (_ctx, _cache) => {
        return (0, import_vue17.openBlock)(), (0, import_vue17.createBlock)(tmOverlay, {
          ref_key: "overlayAni",
          ref: overlayAni,
          duration: props.duration + 80,
          onOpen: OverLayOpen,
          onClose: overclose,
          zIndex: props.zIndex,
          transprent: !props.mask,
          onClick: overlayClickFun,
          align: (0, import_vue17.unref)(align_rp),
          overlayClick: false,
          show: (0, import_vue17.unref)(_show),
          "onUpdate:show": _cache[1] || (_cache[1] = ($event) => (0, import_vue17.isRef)(_show) ? _show.value = $event : _show = $event)
        }, {
          default: (0, import_vue17.withCtx)(() => [
            (0, import_vue17.createVNode)(tmTranslate, {
              reverse: (0, import_vue17.unref)(reverse_rp),
              width: (0, import_vue17.unref)(anwidth),
              height: (0, import_vue17.unref)(anheight),
              ref_key: "drawerANI",
              ref: drawerANI,
              "auto-play": false,
              name: (0, import_vue17.unref)(aniname),
              duration: props.duration
            }, {
              default: (0, import_vue17.withCtx)(() => [
                (0, import_vue17.createElementVNode)("view", {
                  onClick: _cache[0] || (_cache[0] = (0, import_vue17.withModifiers)(($event) => $event.stopPropagation(), ["stop"])),
                  style: (0, import_vue17.normalizeStyle)([
                    { width: (0, import_vue17.unref)(anwidth), height: (0, import_vue17.unref)(anheight) },
                    !props.transprent ? (0, import_vue17.unref)(tmcomputed).borderCss : "",
                    !props.transprent ? (0, import_vue17.unref)(tmcomputed).backgroundColorCss : "",
                    !props.transprent ? (0, import_vue17.unref)(tmcomputed).shadowColor : "",
                    (0, import_vue17.unref)(customCSSStyle)
                  ]),
                  class: (0, import_vue17.normalizeClass)([(0, import_vue17.unref)(round_rp), "flex flex-col overflow ", (0, import_vue17.unref)(customClass)])
                }, [
                  !props.closeable && !props.hideHeader ? ((0, import_vue17.openBlock)(), (0, import_vue17.createElementBlock)("view", {
                    key: 0,
                    class: "flex flex-row flex-row-center-center flex-between px-24",
                    style: { "height": "44px" }
                  }, [
                    (0, import_vue17.createElementVNode)("view", { class: "flex-4 flex-shrink" }, [
                      !props.hideCancel ? ((0, import_vue17.openBlock)(), (0, import_vue17.createBlock)(tmText, {
                        key: 0,
                        onClick: cancel,
                        label: props.cancelText
                      }, null, 8, ["label"])) : (0, import_vue17.createCommentVNode)("v-if", true)
                    ]),
                    (0, import_vue17.createElementVNode)("view", { class: "flex-8 px-32 flex-center" }, [
                      (0, import_vue17.renderSlot)(_ctx.$slots, "title", {}, () => [
                        (0, import_vue17.createVNode)(tmText, {
                          _class: "text-overflow-1 opacity-7",
                          label: props.title
                        }, null, 8, ["label"])
                      ])
                    ]),
                    (0, import_vue17.createElementVNode)("view", { class: "flex-4 flex-shrink flex-row flex-row-center-end" }, [
                      !(0, import_vue17.unref)(ok_loading) ? ((0, import_vue17.openBlock)(), (0, import_vue17.createBlock)(tmText, {
                        key: 0,
                        color: __props.okColor,
                        onClick: ok,
                        dark: props.dark,
                        label: props.okText
                      }, null, 8, ["color", "dark", "label"])) : (0, import_vue17.createCommentVNode)("v-if", true),
                      (0, import_vue17.unref)(ok_loading) ? ((0, import_vue17.openBlock)(), (0, import_vue17.createBlock)(tmIcon, {
                        key: 1,
                        color: __props.okColor,
                        spin: (0, import_vue17.unref)(ok_loading),
                        dark: (0, import_vue17.unref)(isDark),
                        _class: (0, import_vue17.unref)(isDark) !== true ? "opacity-4" : "",
                        fontSize: 34,
                        name: (0, import_vue17.unref)(ok_loading) ? "tmicon-jiazai_dan" : "tmicon-times-circle-fill"
                      }, null, 8, ["color", "spin", "dark", "_class", "name"])) : (0, import_vue17.createCommentVNode)("v-if", true)
                    ])
                  ])) : (0, import_vue17.createCommentVNode)("v-if", true),
                  props.closeable && !props.hideHeader ? ((0, import_vue17.openBlock)(), (0, import_vue17.createElementBlock)("view", {
                    key: 1,
                    class: "flex flex-row flex-row-center-center flex-between px-24",
                    style: { "height": "44px" }
                  }, [
                    (0, import_vue17.createElementVNode)("view", { class: "flex-9 pr-32" }, [
                      (0, import_vue17.renderSlot)(_ctx.$slots, "title", {}, () => [
                        (0, import_vue17.createVNode)(tmText, {
                          _class: "text-overflow-1 opacity-7",
                          dark: props.dark,
                          label: props.title
                        }, null, 8, ["dark", "label"])
                      ])
                    ]),
                    (0, import_vue17.createElementVNode)("view", { class: "flex-3 flex-shrink flex-row flex-row-center-end" }, [
                      (0, import_vue17.createVNode)(tmIcon, {
                        onClick: cancel,
                        dark: props.dark,
                        _class: (0, import_vue17.unref)(isDark) !== true ? "opacity-3" : "",
                        fontSize: 36,
                        name: "tmicon-times-circle-fill"
                      }, null, 8, ["dark", "_class"])
                    ])
                  ])) : (0, import_vue17.createCommentVNode)("v-if", true),
                  (0, import_vue17.createElementVNode)("scroll-view", {
                    scrollY: !props.disabbleScroll,
                    style: (0, import_vue17.normalizeStyle)([{ height: (0, import_vue17.unref)(contentHeight) }]),
                    class: "overflow"
                  }, [
                    (0, import_vue17.renderSlot)(_ctx.$slots, "default")
                  ], 12, ["scrollY"])
                ], 6)
              ]),
              _: 3
            }, 8, ["reverse", "width", "height", "name", "duration"])
          ]),
          _: 3
        }, 8, ["duration", "zIndex", "transprent", "align", "show"]);
      };
    }
  });
  var tmDrawer = /* @__PURE__ */ _export_sfc(_sfc_main17, [["styles", [_style_07]], ["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-drawer/tm-drawer.vue"]]);

  // F:/CoinQT/CoinQT_app/unpackage/dist/dev/.nvue/tm-calendar.js
  var __defProp19 = Object.defineProperty;
  var __defProps18 = Object.defineProperties;
  var __getOwnPropDescs18 = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols18 = Object.getOwnPropertySymbols;
  var __hasOwnProp19 = Object.prototype.hasOwnProperty;
  var __propIsEnum18 = Object.prototype.propertyIsEnumerable;
  var __defNormalProp18 = (obj, key, value) => key in obj ? __defProp19(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues18 = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp19.call(b, prop))
        __defNormalProp18(a, prop, b[prop]);
    if (__getOwnPropSymbols18)
      for (var prop of __getOwnPropSymbols18(b)) {
        if (__propIsEnum18.call(b, prop))
          __defNormalProp18(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps18 = (a, b) => __defProps18(a, __getOwnPropDescs18(b));
  var _sfc_main$6 = /* @__PURE__ */ (0, import_vue18.defineComponent)({
    __name: "week-day",
    props: {
      followTheme: {
        type: Boolean,
        default: true
      },
      defaultValue: {
        type: Array,
        default: () => []
      },
      modelValue: {
        type: Array,
        default: () => []
      },
      color: {
        type: String,
        default: "primary"
      },
      linear: {
        type: String,
        default: ""
      },
      linearDeep: {
        type: String,
        default: "light"
      },
      start: {
        type: [String, Number, Date],
        default: ""
      },
      end: {
        type: [String, Number, Date],
        default: ""
      },
      hideTool: {
        type: Boolean,
        default: false
      },
      hideButton: {
        type: Boolean,
        default: false
      }
    },
    emits: ["update:modelValue", "confirm", "click-week", "change"],
    setup(__props, { expose, emit: emits }) {
      const props = __props;
      const store = useTmpiniaStore();
      const _color = (0, import_vue18.computed)(() => {
        if (props.followTheme && store.tmStore.color)
          return store.tmStore.color;
        return props.color;
      });
      const DayJs = dayjs;
      DayJs.extend(isoWeek);
      DayJs.extend(isSameOrBefore);
      DayJs.extend(isSameOrAfter);
      DayJs.extend(isBetween);
      const _value = (0, import_vue18.ref)(DayJs(props.defaultValue[0]).isValid() ? DayJs(props.defaultValue[0]) : DayJs());
      const _weekNum = (0, import_vue18.ref)(getNowWeek(_value.value));
      const weekStr = ["\u5468\u6B21", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u65E5"];
      const _data = (0, import_vue18.ref)([]);
      const _dataWeek = (0, import_vue18.ref)([]);
      const _start_date = (0, import_vue18.computed)(() => {
        let isv = DayJs(props.start).isValid();
        return isv ? DayJs(props.start) : DayJs("1980-1-1");
      });
      const _end_date = (0, import_vue18.computed)(() => {
        let isv = DayJs(props.end).isValid();
        return isv ? DayJs(props.end) : DayJs("2450-1-1");
      });
      const _nowDate = (0, import_vue18.computed)(() => {
        return _value.value.format("YYYY-MM");
      });
      _data.value = getWeekOfMonthArray();
      (0, import_vue18.watch)(() => props.modelValue, () => {
        var _a2;
        if (!Array.isArray(props.modelValue))
          return;
        let date_str = (_a2 = props.modelValue[0]) != null ? _a2 : "";
        _value.value = DayJs(date_str).isValid() ? DayJs(date_str) : DayJs();
        _weekNum.value = getNowWeek(_value.value);
        _data.value = getWeekOfMonthArray();
      }, { deep: true });
      function getNowWeek(str = "") {
        if (DayJs(str).isValid()) {
          return DayJs(str).isoWeek();
        } else {
          return DayJs().isoWeek();
        }
      }
      function nowWeekClick() {
        _value.value = DayJs();
        _data.value = getWeekOfMonthArray();
        let wk = getNowWeek(_value.value);
        if (!canSelected(wk)) {
          uni.showToast({ title: "\u65E0\u6CD5\u9009\u4E2D", icon: "none" });
          return;
        }
        _weekNum.value = wk;
        updateTimes();
      }
      function clickWeek(wk) {
        if (!canSelected(wk)) {
          uni.showToast({ title: "\u65E0\u6CD5\u9009\u4E2D", icon: "none" });
          return;
        }
        _weekNum.value = wk;
        updateTimes();
      }
      function canSelected(num) {
        let index = _dataWeek.value.findIndex((el) => el == num);
        let item = _data.value[index];
        let ar = item.filter((el) => !el.isVaild);
        return ar.length > 0;
      }
      function nextYear() {
        _value.value = _value.value.add(1, "year");
        _data.value = getWeekOfMonthArray();
        emits("change", _value.value.format("YYYY/MM/DD"));
      }
      function nextMonth() {
        _value.value = _value.value.add(1, "month");
        _data.value = getWeekOfMonthArray();
        emits("change", _value.value.format("YYYY/MM/DD"));
      }
      function prevMonth() {
        _value.value = _value.value.subtract(1, "month");
        _data.value = getWeekOfMonthArray();
        emits("change", _value.value.format("YYYY/MM/DD"));
      }
      function prevYear() {
        _value.value = _value.value.subtract(1, "year");
        _data.value = getWeekOfMonthArray();
        emits("change", _value.value.format("YYYY/MM/DD"));
      }
      function setDefault(data = []) {
        let date_str = data[0];
        _value.value = DayJs(date_str).isValid() ? DayJs(date_str) : DayJs();
        _weekNum.value = getNowWeek(_value.value);
        _data.value = getWeekOfMonthArray();
      }
      function getWeekOfMonthArray() {
        let nowMonth = DayJs(_value.value);
        let startStatickDay = nowMonth.startOf("month").format("YYYY/MM/DD");
        let endStatickDay = nowMonth.endOf("month").format("YYYY/MM/DD");
        let startd = DayJs(startStatickDay);
        let arOfmonth = [];
        let ar = [];
        while (startd.isSameOrBefore(endStatickDay)) {
          ar.push({
            dateStr: startd.format("YYYY/MM/DD"),
            date: startd.date() < 10 ? "0" + startd.date() : startd.date(),
            week: startd.isoWeek(),
            day: startd.isoWeekday(),
            isNowIn: isInNowMonth(nowMonth, startd),
            isVaild: !startd.isBetween(_start_date.value, _end_date.value, "day", "[]")
          });
          arOfmonth.push(startd.isoWeek());
          startd = startd.add(1, "day");
        }
        arOfmonth = [...new Set(arOfmonth)];
        _dataWeek.value = arOfmonth;
        let dArray = [];
        let index = 0;
        dArray.push([]);
        ar.forEach((el) => {
          if (el.week == arOfmonth[index]) {
            dArray[index].push(el);
          } else {
            index += 1;
            dArray.push([]);
            dArray[index].push(el);
          }
        });
        if (dArray[0].length !== 7) {
          let item = dArray[0][dArray[0].length - 1];
          let start_of = DayJs(item.dateStr).isoWeek(item.week).subtract(6, "day");
          let end_of = DayJs(item.dateStr).isoWeek(item.week);
          let pr = [];
          let startd2 = DayJs(start_of);
          while (startd2.isSameOrBefore(end_of)) {
            pr.push({
              dateStr: startd2.format("YYYY/MM/DD"),
              date: startd2.date() < 10 ? "0" + startd2.date() : startd2.date(),
              week: startd2.isoWeek(),
              day: startd2.isoWeekday(),
              isNowIn: isInNowMonth(nowMonth, startd2),
              isVaild: !startd2.isBetween(_start_date.value, _end_date.value, "day", "[]")
            });
            startd2 = startd2.add(1, "day");
          }
          dArray[0] = pr;
        }
        if (dArray[dArray.length - 1].length !== 7) {
          let item = dArray[dArray.length - 1][0];
          let start_of = DayJs(item.dateStr).isoWeek(item.week);
          let end_of = DayJs(item.dateStr).isoWeek(item.week).add(6, "day");
          let pr = [];
          let startd2 = DayJs(start_of);
          while (startd2.isSameOrBefore(end_of)) {
            pr.push({
              dateStr: startd2.format("YYYY/MM/DD"),
              date: startd2.date() < 10 ? "0" + startd2.date() : startd2.date(),
              week: startd2.isoWeek(),
              day: startd2.isoWeekday(),
              isNowIn: isInNowMonth(nowMonth, startd2),
              isVaild: !startd2.isBetween(_start_date.value, _end_date.value, "day", "[]")
            });
            startd2 = startd2.add(1, "day");
          }
          dArray[dArray.length - 1] = pr;
        }
        return dArray;
      }
      function isInNowMonth(date = "", now = "") {
        let startStatickDay = DayJs(date).startOf("month").format("YYYY/MM/DD");
        let endStatickDay = DayJs(date).endOf("month").format("YYYY/MM/DD");
        return DayJs(now).isBetween(startStatickDay, endStatickDay, "day", "[]");
      }
      function updateTimes() {
        let index = _dataWeek.value.findIndex((el) => el == _weekNum.value);
        let item = _data.value[index];
        let start = item[0].dateStr;
        let end = item[item.length - 1].dateStr;
        emits("click-week", [start, end]);
      }
      function confirm() {
        let index = _dataWeek.value.findIndex((el) => el == _weekNum.value);
        let item = [..._data.value[index]];
        let start = item[0].dateStr;
        for (let i = 0; i < item.length; i++) {
          if (DayJs(item[i].dateStr).isSameOrAfter(props.start, "date")) {
            start = item[i].dateStr;
            break;
          }
        }
        let end = item[item.length - 1].dateStr;
        item = item.reverse();
        formatAppLog("log", "at tmui/components/tm-calendar-view/week-day.vue:345", item);
        for (let i = 0; i < item.length; i++) {
          if (DayJs(item[i].dateStr).isSameOrBefore(props.end, "date")) {
            end = item[i].dateStr;
            break;
          }
        }
        emits("update:modelValue", [start, end]);
        emits("confirm", [start, end]);
      }
      expose({
        setDefault,
        nextYear,
        nextMonth,
        prevYear,
        prevMonth
      });
      return (_ctx, _cache) => {
        return (0, import_vue18.openBlock)(), (0, import_vue18.createElementBlock)("view", {
          class: "flex flex-col relative",
          renderWhole: true
        }, [
          !props.hideTool ? ((0, import_vue18.openBlock)(), (0, import_vue18.createBlock)(tmSheet, {
            key: 0,
            shadow: 0,
            margin: [0, 0],
            padding: [0, 24],
            _class: "flex flex-row flex-row-center-center"
          }, {
            default: (0, import_vue18.withCtx)(() => [
              (0, import_vue18.createElementVNode)("view", {
                onClick: (0, import_vue18.withModifiers)(prevYear, ["stop"]),
                class: "px-32"
              }, [
                (0, import_vue18.createVNode)(tmIcon, {
                  userInteractionEnabled: false,
                  "font-size": 24,
                  name: "tmicon-angle-double-left"
                })
              ], 8, ["onClick"]),
              (0, import_vue18.createElementVNode)("view", {
                onClick: (0, import_vue18.withModifiers)(prevMonth, ["stop"]),
                class: "px-32"
              }, [
                (0, import_vue18.createVNode)(tmIcon, {
                  userInteractionEnabled: false,
                  "font-size": 24,
                  name: "tmicon-angle-left"
                })
              ], 8, ["onClick"]),
              (0, import_vue18.createElementVNode)("view", { class: "px-12" }, [
                (0, import_vue18.createVNode)(tmText, {
                  userInteractionEnabled: false,
                  "font-size": 28,
                  label: (0, import_vue18.unref)(_nowDate)
                }, null, 8, ["label"])
              ]),
              (0, import_vue18.createElementVNode)("view", {
                onClick: (0, import_vue18.withModifiers)(nextMonth, ["stop"]),
                class: "px-32"
              }, [
                (0, import_vue18.createVNode)(tmIcon, {
                  userInteractionEnabled: false,
                  "font-size": 24,
                  name: "tmicon-angle-right"
                })
              ], 8, ["onClick"]),
              (0, import_vue18.createElementVNode)("view", {
                onClick: (0, import_vue18.withModifiers)(nextYear, ["stop"]),
                class: "px-32"
              }, [
                (0, import_vue18.createVNode)(tmIcon, {
                  userInteractionEnabled: false,
                  "font-size": 24,
                  name: "tmicon-angle-double-right"
                })
              ], 8, ["onClick"]),
              (0, import_vue18.createElementVNode)("view", {
                onClick: nowWeekClick,
                class: "absolute t-0 r-16 zIndex-10",
                style: { "width": "64rpx" }
              }, [
                (0, import_vue18.createVNode)(tmText, {
                  userInteractionEnabled: false,
                  "font-size": 28,
                  label: "\u672C\u5468"
                })
              ])
            ]),
            _: 1
          })) : (0, import_vue18.createCommentVNode)("v-if", true),
          (0, import_vue18.createElementVNode)("view", {
            class: "flex flex-row flex-row-center-center py-12",
            style: (0, import_vue18.normalizeStyle)([{ height: "74rpx" }])
          }, [
            ((0, import_vue18.openBlock)(), (0, import_vue18.createElementBlock)(import_vue18.Fragment, null, (0, import_vue18.renderList)(weekStr, (item, index) => {
              return (0, import_vue18.createElementVNode)("view", {
                class: "flex-1 flex-center",
                key: index
              }, [
                (0, import_vue18.createElementVNode)("view", {
                  style: { "width": "62rpx" },
                  class: "flex-center flex-col"
                }, [
                  (0, import_vue18.createVNode)(tmText, {
                    "font-size": 24,
                    label: item
                  }, null, 8, ["label"])
                ])
              ]);
            }), 64))
          ]),
          (0, import_vue18.createElementVNode)("view", { class: "flex flex-col" }, [
            ((0, import_vue18.openBlock)(true), (0, import_vue18.createElementBlock)(import_vue18.Fragment, null, (0, import_vue18.renderList)(_dataWeek.value, (item, index) => {
              return (0, import_vue18.openBlock)(), (0, import_vue18.createElementBlock)("view", {
                class: "flex flex-row flex-row-center-center",
                style: (0, import_vue18.normalizeStyle)([{ height: "74rpx" }]),
                key: index
              }, [
                (0, import_vue18.createElementVNode)("view", {
                  class: (0, import_vue18.normalizeClass)([["opacity-5"], "flex-1 flex-center"])
                }, [
                  (0, import_vue18.createElementVNode)("view", {
                    style: { "width": "62rpx" },
                    class: "flex-center flex-col"
                  }, [
                    (0, import_vue18.createVNode)(tmText, {
                      "font-size": 24,
                      label: item
                    }, null, 8, ["label"])
                  ])
                ]),
                (0, import_vue18.createVNode)(tmSheet, {
                  "no-level": "",
                  onClick: ($event) => clickWeek(item),
                  height: 66,
                  shadow: 0,
                  round: 10,
                  _class: "flex-row",
                  class: "flex-6",
                  "paren-class": "flex-6",
                  text: _weekNum.value == item,
                  color: _weekNum.value == item ? (0, import_vue18.unref)(_color) : "grey-4",
                  margin: [0, 4],
                  padding: [0, 0]
                }, {
                  default: (0, import_vue18.withCtx)(() => [
                    ((0, import_vue18.openBlock)(true), (0, import_vue18.createElementBlock)(import_vue18.Fragment, null, (0, import_vue18.renderList)(_data.value[index], (item2, index2) => {
                      return (0, import_vue18.openBlock)(), (0, import_vue18.createElementBlock)("view", {
                        userInteractionEnabled: false,
                        style: { "width": "62rpx" },
                        class: (0, import_vue18.normalizeClass)([[item2.isNowIn ? "" : "opacity-5"], "flex-1 flex-center"]),
                        key: index2
                      }, [
                        (0, import_vue18.createElementVNode)("view", {
                          style: (0, import_vue18.normalizeStyle)([{ "width": "62rpx" }, [{ opacity: item2.isVaild ? "0.3" : "1" }]]),
                          class: "flex-center flex-col"
                        }, [
                          (0, import_vue18.createVNode)(tmText, {
                            "font-size": 28,
                            label: item2.date
                          }, null, 8, ["label"])
                        ], 4)
                      ], 2);
                    }), 128))
                  ]),
                  _: 2
                }, 1032, ["onClick", "text", "color"])
              ]);
            }), 128))
          ]),
          !props.hideButton ? ((0, import_vue18.openBlock)(), (0, import_vue18.createBlock)(TmButton, {
            key: 1,
            linear: props.linear,
            "linear-deep": props.linearDeep,
            color: props.color,
            onClick: confirm,
            block: "",
            label: "\u786E\u8BA4",
            margin: [0, 16]
          }, null, 8, ["linear", "linear-deep", "color"])) : (0, import_vue18.createCommentVNode)("v-if", true)
        ]);
      };
    }
  });
  var weekDay = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-calendar-view/week-day.vue"]]);
  var _sfc_main$5 = /* @__PURE__ */ (0, import_vue18.defineComponent)({
    __name: "month-year",
    props: {
      followTheme: {
        type: Boolean,
        default: true
      },
      defaultValue: {
        type: Array,
        default: () => []
      },
      modelValue: {
        type: Array,
        default: () => []
      },
      color: {
        type: String,
        default: "primary"
      },
      linear: {
        type: String,
        default: ""
      },
      linearDeep: {
        type: String,
        default: "light"
      },
      start: {
        type: [String, Number, Date],
        default: ""
      },
      end: {
        type: [String, Number, Date],
        default: ""
      },
      hideTool: {
        type: Boolean,
        default: false
      },
      hideButton: {
        type: Boolean,
        default: false
      }
    },
    emits: ["update:modelValue", "confirm", "click-month", "change"],
    setup(__props, { expose, emit: emits }) {
      const props = __props;
      const store = useTmpiniaStore();
      const _color = (0, import_vue18.computed)(() => {
        if (props.followTheme && store.tmStore.color)
          return store.tmStore.color;
        return props.color;
      });
      const DayJs = dayjs;
      DayJs.extend(isoWeek);
      DayJs.extend(isSameOrBefore);
      DayJs.extend(isBetween);
      const _value = (0, import_vue18.ref)(DayJs(props.defaultValue[0]).isValid() ? DayJs(props.defaultValue[0]) : DayJs());
      const _start_date = (0, import_vue18.computed)(() => {
        let isv = DayJs(props.start).isValid();
        return isv ? DayJs(props.start) : DayJs("1980-1-1");
      });
      const _end_date = (0, import_vue18.computed)(() => {
        let isv = DayJs(props.end).isValid();
        return isv ? DayJs(props.end) : DayJs("2450-1-1");
      });
      const _data = (0, import_vue18.ref)(getDataArray());
      const _nowDate = (0, import_vue18.computed)(() => {
        return _value.value.format("YYYY-MM");
      });
      const _nowMonth = (0, import_vue18.computed)(() => {
        return _value.value.format("M");
      });
      (0, import_vue18.watch)([
        () => props.modelValue,
        () => props.start,
        () => props.end
      ], () => {
        _value.value = DayJs(props.modelValue[0]);
        _data.value = getDataArray();
      }, { deep: true });
      function nowWeekClick() {
        if (DayJs().isBetween(_start_date.value, _end_date.value, "month", "[]") == false) {
          uni.showToast({ title: "\u65E0\u6CD5\u9009\u4E2D", icon: "none" });
          return;
        }
        _value.value = DayJs();
        _data.value = getDataArray();
        updateTimes();
      }
      function clickWeek(wk) {
        if (wk.isVaild) {
          uni.showToast({ title: "\u65E0\u6CD5\u9009\u4E2D", icon: "none" });
          return;
        }
        _value.value = _value.value.month(wk.month - 1);
        updateTimes();
      }
      function setDefault(data = []) {
        _value.value = data ? DayJs(data[0]) : DayJs(props.modelValue[0]);
        _data.value = getDataArray();
      }
      function getDataArray() {
        let nowMonth = DayJs("2000-1-1").year(_value.value.year());
        let ar = [];
        for (let i = 0; i < 12; i++) {
          nowMonth = nowMonth.month(i);
          ar.push({
            dateStr: nowMonth.format("YYYY-MM"),
            month: nowMonth.month() + 1,
            isVaild: !nowMonth.isBetween(_start_date.value, _end_date.value, "month", "[]")
          });
        }
        return uni.$tm.u.splitData(ar, 3);
      }
      function nextYear() {
        _value.value = _value.value.add(1, "year");
        _data.value = getDataArray();
        emits("change", _value.value.format("YYYY/MM/DD"));
      }
      function prevYear() {
        _value.value = _value.value.subtract(1, "year");
        _data.value = getDataArray();
        emits("change", _value.value.format("YYYY/MM/DD"));
      }
      function updateTimes() {
        emits("click-month", _value.value.format("YYYY-MM"));
      }
      function confirm() {
        emits("update:modelValue", [_value.value.format("YYYY-MM")]);
        emits("confirm", [_value.value.format("YYYY-MM")]);
      }
      expose({
        setDefault,
        nextYear,
        prevYear
      });
      return (_ctx, _cache) => {
        return (0, import_vue18.openBlock)(), (0, import_vue18.createElementBlock)("view", {
          class: "flex flex-col relative",
          renderWhole: true
        }, [
          !props.hideTool ? ((0, import_vue18.openBlock)(), (0, import_vue18.createBlock)(tmSheet, {
            key: 0,
            shadow: 0,
            margin: [0, 0],
            padding: [0, 24],
            _class: "flex flex-row flex-row-center-center"
          }, {
            default: (0, import_vue18.withCtx)(() => [
              (0, import_vue18.createElementVNode)("view", {
                onClick: (0, import_vue18.withModifiers)(prevYear, ["stop"]),
                class: "px-32"
              }, [
                (0, import_vue18.createVNode)(tmIcon, {
                  userInteractionEnabled: false,
                  "font-size": 24,
                  name: "tmicon-angle-double-left"
                })
              ], 8, ["onClick"]),
              (0, import_vue18.createCommentVNode)(' <view @click.stop="prevMonth" class="px-32">\r\n				<tm-icon :userInteractionEnabled="false" :font-size="24" name="tmicon-angle-left"></tm-icon>\r\n			</view> '),
              (0, import_vue18.createElementVNode)("view", { class: "px-32" }, [
                (0, import_vue18.createVNode)(tmText, {
                  userInteractionEnabled: false,
                  "font-size": 28,
                  label: (0, import_vue18.unref)(_nowDate)
                }, null, 8, ["label"])
              ]),
              (0, import_vue18.createCommentVNode)(' <view @click.stop="nextMonth" class="px-32">\r\n				<tm-icon :userInteractionEnabled="false" :font-size="24" name="tmicon-angle-right"></tm-icon>\r\n			</view> '),
              (0, import_vue18.createElementVNode)("view", {
                onClick: (0, import_vue18.withModifiers)(nextYear, ["stop"]),
                class: "px-32"
              }, [
                (0, import_vue18.createVNode)(tmIcon, {
                  userInteractionEnabled: false,
                  "font-size": 24,
                  name: "tmicon-angle-double-right"
                })
              ], 8, ["onClick"]),
              (0, import_vue18.createElementVNode)("view", {
                onClick: nowWeekClick,
                class: "absolute t-0 r-16 zIndex-10",
                style: { "width": "64rpx" }
              }, [
                (0, import_vue18.createVNode)(tmText, {
                  userInteractionEnabled: false,
                  "font-size": 28,
                  label: "\u672C\u6708"
                })
              ])
            ]),
            _: 1
          })) : (0, import_vue18.createCommentVNode)("v-if", true),
          (0, import_vue18.createElementVNode)("view", { class: "flex flex-col" }, [
            ((0, import_vue18.openBlock)(true), (0, import_vue18.createElementBlock)(import_vue18.Fragment, null, (0, import_vue18.renderList)(_data.value, (item2, index2) => {
              return (0, import_vue18.openBlock)(), (0, import_vue18.createElementBlock)("view", { key: index2 }, [
                (0, import_vue18.createElementVNode)("view", {
                  class: "flex flex-row flex-row-center-center",
                  style: (0, import_vue18.normalizeStyle)([{ height: "120rpx", flexWrap: "wrap" }])
                }, [
                  ((0, import_vue18.openBlock)(true), (0, import_vue18.createElementBlock)(import_vue18.Fragment, null, (0, import_vue18.renderList)(item2, (item, index) => {
                    return (0, import_vue18.openBlock)(), (0, import_vue18.createBlock)(tmSheet, {
                      onClick: ($event) => clickWeek(item),
                      height: 112,
                      shadow: 0,
                      round: 4,
                      _class: "flex-row flex-center",
                      class: "flex-3",
                      "paren-class": "flex-3",
                      text: (0, import_vue18.unref)(_nowMonth) == item.month,
                      color: (0, import_vue18.unref)(_nowMonth) == item.month ? (0, import_vue18.unref)(_color) : "grey-4",
                      margin: [4, 4],
                      padding: [0, 0],
                      key: index
                    }, {
                      default: (0, import_vue18.withCtx)(() => [
                        (0, import_vue18.createElementVNode)("view", {
                          style: (0, import_vue18.normalizeStyle)([[{ opacity: item.isVaild ? "0.3" : "1" }], { "width": "62rpx" }]),
                          userInteractionEnabled: false,
                          class: "flex-center flex-col"
                        }, [
                          (0, import_vue18.createVNode)(tmText, {
                            "font-size": 28,
                            label: item.month + "\u6708"
                          }, null, 8, ["label"])
                        ], 4)
                      ]),
                      _: 2
                    }, 1032, ["onClick", "text", "color"]);
                  }), 128))
                ])
              ]);
            }), 128))
          ]),
          !props.hideButton ? ((0, import_vue18.openBlock)(), (0, import_vue18.createBlock)(TmButton, {
            key: 1,
            linear: props.linear,
            "linear-deep": props.linearDeep,
            color: props.color,
            onClick: confirm,
            block: "",
            label: "\u786E\u8BA4",
            margin: [0, 16]
          }, null, 8, ["linear", "linear-deep", "color"])) : (0, import_vue18.createCommentVNode)("v-if", true)
        ]);
      };
    }
  });
  var monthYear = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-calendar-view/month-year.vue"]]);
  var _sfc_main$42 = /* @__PURE__ */ (0, import_vue18.defineComponent)({
    __name: "year-du",
    props: {
      followTheme: {
        type: Boolean,
        default: true
      },
      defaultValue: {
        type: Array,
        default: () => []
      },
      modelValue: {
        type: Array,
        default: () => []
      },
      color: {
        type: String,
        default: "primary"
      },
      linear: {
        type: String,
        default: ""
      },
      linearDeep: {
        type: String,
        default: "light"
      },
      start: {
        type: [String, Number, Date],
        default: ""
      },
      end: {
        type: [String, Number, Date],
        default: ""
      },
      hideTool: {
        type: Boolean,
        default: false
      },
      hideButton: {
        type: Boolean,
        default: false
      }
    },
    emits: ["update:modelValue", "confirm", "click-year", "change"],
    setup(__props, { expose, emit: emits }) {
      const props = __props;
      const store = useTmpiniaStore();
      const _color = (0, import_vue18.computed)(() => {
        if (props.followTheme && store.tmStore.color)
          return store.tmStore.color;
        return props.color;
      });
      const DayJs = dayjs;
      DayJs.extend(isoWeek);
      DayJs.extend(isSameOrBefore);
      DayJs.extend(isBetween);
      const _value = (0, import_vue18.ref)(DayJs(props.defaultValue[0]).isValid() ? DayJs(props.defaultValue[0]) : DayJs());
      const _cachYear = (0, import_vue18.ref)(_value.value);
      const _start_date = (0, import_vue18.computed)(() => {
        let isv = DayJs(props.start).isValid();
        return isv ? DayJs(props.start) : DayJs("1980-1-1");
      });
      const _end_date = (0, import_vue18.computed)(() => {
        let isv = DayJs(props.end).isValid();
        return isv ? DayJs(props.end) : DayJs("2450-1-1");
      });
      const _data = (0, import_vue18.ref)(getYearArray());
      const _nowDate = (0, import_vue18.computed)(() => {
        return _value.value.format("YYYY");
      });
      (0, import_vue18.watch)([
        () => props.modelValue,
        () => props.start,
        () => props.end
      ], () => {
        _value.value = DayJs(props.modelValue[0]);
        _data.value = getYearArray();
      }, { deep: true });
      function getYearArray(str = "") {
        let nowyear = _value.value.year();
        if (str) {
          nowyear = DayJs(str).year();
        }
        let nowMonth = DayJs("2000-1-1").year(nowyear);
        let ar = [];
        for (let i = nowyear - 4; i < nowyear + 5; i++) {
          nowMonth = nowMonth.year(i);
          ar.push({
            dateStr: nowMonth.format("YYYY-MM"),
            year: nowMonth.year(),
            isVaild: !nowMonth.isBetween(_start_date.value, _end_date.value, "year", "[]")
          });
        }
        return uni.$tm.u.splitData(ar, 3);
      }
      function nowWeekClick() {
        if (DayJs().isBetween(_start_date.value, _end_date.value, "year", "[]") == false) {
          uni.showToast({ title: "\u65E0\u6CD5\u9009\u4E2D", icon: "none" });
          return;
        }
        _value.value = DayJs();
        _data.value = getYearArray();
        updateTimes();
      }
      function clickWeek(wk) {
        if (wk.isVaild) {
          uni.showToast({ title: "\u65E0\u6CD5\u9009\u4E2D", icon: "none" });
          return;
        }
        _value.value = _value.value.year(wk.year);
        _cachYear.value = _value.value;
        updateTimes();
      }
      function nextYear() {
        _cachYear.value = _cachYear.value.add(8, "year");
        _data.value = getYearArray(_cachYear.value);
        emits("change", _cachYear.value.year());
      }
      function prevYear() {
        _cachYear.value = _cachYear.value.subtract(8, "year");
        _data.value = getYearArray(_cachYear.value);
        emits("change", _cachYear.value.year());
      }
      function setDefault(data = []) {
        _value.value = DayJs(data[0] || props.modelValue);
        _data.value = getYearArray();
      }
      function updateTimes() {
        emits("click-year", _value.value.year());
      }
      function confirm() {
        emits("update:modelValue", [String(_value.value.year())]);
        emits("confirm", [String(_value.value.year())]);
      }
      expose({
        setDefault,
        nextYear,
        prevYear
      });
      return (_ctx, _cache) => {
        return (0, import_vue18.openBlock)(), (0, import_vue18.createElementBlock)("view", {
          class: "flex flex-col relative",
          renderWhole: true
        }, [
          !props.hideTool ? ((0, import_vue18.openBlock)(), (0, import_vue18.createBlock)(tmSheet, {
            key: 0,
            shadow: 0,
            margin: [0, 0],
            padding: [0, 24],
            _class: "flex flex-row flex-row-center-center"
          }, {
            default: (0, import_vue18.withCtx)(() => [
              (0, import_vue18.createElementVNode)("view", {
                onClick: (0, import_vue18.withModifiers)(prevYear, ["stop"]),
                class: "px-32"
              }, [
                (0, import_vue18.createVNode)(tmIcon, {
                  userInteractionEnabled: false,
                  "font-size": 24,
                  name: "tmicon-angle-double-left"
                })
              ], 8, ["onClick"]),
              (0, import_vue18.createCommentVNode)(' <view @click.stop="prevMonth" class="px-32">\r\n				<tm-icon :userInteractionEnabled="false" :font-size="24" name="tmicon-angle-left"></tm-icon>\r\n			</view> '),
              (0, import_vue18.createElementVNode)("view", { class: "px-32" }, [
                (0, import_vue18.createVNode)(tmText, {
                  userInteractionEnabled: false,
                  "font-size": 28,
                  label: (0, import_vue18.unref)(_nowDate)
                }, null, 8, ["label"])
              ]),
              (0, import_vue18.createCommentVNode)(' <view @click.stop="nextMonth" class="px-32">\r\n				<tm-icon :userInteractionEnabled="false" :font-size="24" name="tmicon-angle-right"></tm-icon>\r\n			</view> '),
              (0, import_vue18.createElementVNode)("view", {
                onClick: (0, import_vue18.withModifiers)(nextYear, ["stop"]),
                class: "px-32"
              }, [
                (0, import_vue18.createVNode)(tmIcon, {
                  userInteractionEnabled: false,
                  "font-size": 24,
                  name: "tmicon-angle-double-right"
                })
              ], 8, ["onClick"]),
              (0, import_vue18.createElementVNode)("view", {
                onClick: nowWeekClick,
                class: "absolute t-0 r-16 zIndex-10",
                style: { "width": "64rpx" }
              }, [
                (0, import_vue18.createVNode)(tmText, {
                  userInteractionEnabled: false,
                  "font-size": 28,
                  label: "\u672C\u5E74"
                })
              ])
            ]),
            _: 1
          })) : (0, import_vue18.createCommentVNode)("v-if", true),
          (0, import_vue18.createElementVNode)("view", { class: "flex flex-col" }, [
            ((0, import_vue18.openBlock)(true), (0, import_vue18.createElementBlock)(import_vue18.Fragment, null, (0, import_vue18.renderList)(_data.value, (item2, index2) => {
              return (0, import_vue18.openBlock)(), (0, import_vue18.createElementBlock)("view", { key: index2 }, [
                (0, import_vue18.createElementVNode)("view", {
                  class: "flex flex-row flex-row-center-center",
                  style: (0, import_vue18.normalizeStyle)([{ height: "120rpx", flexWrap: "wrap" }])
                }, [
                  ((0, import_vue18.openBlock)(true), (0, import_vue18.createElementBlock)(import_vue18.Fragment, null, (0, import_vue18.renderList)(item2, (item, index) => {
                    return (0, import_vue18.openBlock)(), (0, import_vue18.createBlock)(tmSheet, {
                      onClick: ($event) => clickWeek(item),
                      height: 112,
                      shadow: 0,
                      round: 4,
                      _class: "flex-row flex-center",
                      class: "flex-3",
                      "paren-class": "flex-3",
                      text: (0, import_vue18.unref)(_nowDate) == item.year,
                      color: (0, import_vue18.unref)(_nowDate) == item.year ? (0, import_vue18.unref)(_color) : "grey-4",
                      margin: [4, 4],
                      padding: [0, 0],
                      key: index
                    }, {
                      default: (0, import_vue18.withCtx)(() => [
                        (0, import_vue18.createElementVNode)("view", {
                          style: (0, import_vue18.normalizeStyle)([[{ opacity: item.isVaild ? "0.3" : "1" }], { "width": "110rpx" }]),
                          userInteractionEnabled: false,
                          class: "flex-center flex-col"
                        }, [
                          (0, import_vue18.createVNode)(tmText, {
                            "font-size": 28,
                            label: item.year + "\u5E74"
                          }, null, 8, ["label"])
                        ], 4)
                      ]),
                      _: 2
                    }, 1032, ["onClick", "text", "color"]);
                  }), 128))
                ])
              ]);
            }), 128))
          ]),
          !props.hideButton ? ((0, import_vue18.openBlock)(), (0, import_vue18.createBlock)(TmButton, {
            key: 1,
            linear: props.linear,
            "linear-deep": props.linearDeep,
            color: props.color,
            onClick: confirm,
            block: "",
            label: "\u786E\u8BA4",
            margin: [0, 16]
          }, null, 8, ["linear", "linear-deep", "color"])) : (0, import_vue18.createCommentVNode)("v-if", true)
        ]);
      };
    }
  });
  var yearDu = /* @__PURE__ */ _export_sfc(_sfc_main$42, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-calendar-view/year-du.vue"]]);
  var _sfc_main$32 = /* @__PURE__ */ (0, import_vue18.defineComponent)({
    __name: "month-day",
    props: {
      followTheme: {
        type: Boolean,
        default: true
      },
      defaultValue: {
        type: Array,
        default: () => []
      },
      modelValue: {
        type: Array,
        default: () => []
      },
      color: {
        type: String,
        default: "primary"
      },
      linear: {
        type: String,
        default: ""
      },
      linearDeep: {
        type: String,
        default: "light"
      },
      start: {
        type: [String, Number, Date],
        default: ""
      },
      end: {
        type: [String, Number, Date],
        default: ""
      },
      disabledDate: {
        type: Array,
        default: () => []
      },
      multiple: {
        type: Boolean,
        default: false
      },
      dateStyle: {
        type: Array,
        default: () => []
      },
      max: {
        type: Number,
        default: 999
      },
      hideTool: {
        type: Boolean,
        default: false
      },
      hideButton: {
        type: Boolean,
        default: false
      }
    },
    emits: ["update:modelValue", "confirm", "click-day", "change"],
    setup(__props, { expose, emit: emits }) {
      const props = __props;
      const store = useTmpiniaStore();
      const _color = (0, import_vue18.computed)(() => {
        if (props.followTheme && store.tmStore.color)
          return store.tmStore.color;
        return props.color;
      });
      const DayJs = dayjs;
      DayJs.extend(isoWeek);
      DayJs.extend(isSameOrBefore);
      DayJs.extend(isBetween);
      const _value = (0, import_vue18.ref)(props.defaultValue);
      const weekStr = ["\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u65E5"];
      const showOpenDate = (0, import_vue18.ref)(setShowopenDate());
      const _data = (0, import_vue18.ref)([]);
      const _start_date = (0, import_vue18.computed)(() => {
        let isv = DayJs(props.start).isValid();
        return isv ? DayJs(props.start) : DayJs("1980-1-1");
      });
      const _end_date = (0, import_vue18.computed)(() => {
        let isv = DayJs(props.end).isValid();
        return isv ? DayJs(props.end) : DayJs("2450-1-1");
      });
      const _nowDate = (0, import_vue18.computed)(() => {
        return showOpenDate.value.format("YYYY-MM");
      });
      _data.value = getWeekOfMonthArray();
      (0, import_vue18.watch)([
        () => props.modelValue,
        () => props.dateStyle,
        () => props.disabledDate,
        () => props.start,
        () => props.end
      ], () => {
        _value.value = props.modelValue;
        showOpenDate.value = setShowopenDate();
        _data.value = getWeekOfMonthArray();
      }, { deep: true });
      function setShowopenDate() {
        if (_value.value.length == 0) {
          return DayJs();
        }
        let n = _value.value[0] || DayJs();
        n = typeof n == "undefined" || n == null ? DayJs() : n;
        return DayJs(n);
      }
      function nowWeekClick() {
        if (isDisabledDate(DayJs())) {
          uni.showToast({ title: "\u65E0\u6CD5\u9009\u4E2D", icon: "none" });
          return;
        }
        selected(DayJs().format("YYYY/MM/DD"));
        showOpenDate.value = DayJs();
        _data.value = getWeekOfMonthArray();
        emits("click-day", DayJs().format("YYYY/MM/DD"));
      }
      function clickWeek(wk) {
        if (wk.disabled) {
          uni.showToast({ title: "\u65E0\u6CD5\u9009\u4E2D", icon: "none" });
          return;
        }
        selected(wk.dateStr);
        emits("click-day", wk.dateStr);
      }
      function selected(item) {
        let fr = _value.value.filter((el) => DayJs(el).isSame(item));
        if (!props.multiple) {
          _value.value = [DayJs(item).format("YYYY/MM/DD")];
          return;
        }
        if (fr.length > 0) {
          _value.value = _value.value.filter((el) => !DayJs(el).isSame(item));
        } else {
          if (_value.value.length >= props.max) {
            uni.showToast({ title: "\u53EA\u53EF\u9009\u62E9" + props.max + "\u5929", icon: "none" });
            return;
          }
          _value.value.push(DayJs(item).format("YYYY/MM/DD"));
        }
      }
      function nextYear() {
        showOpenDate.value = showOpenDate.value.add(1, "year");
        _data.value = getWeekOfMonthArray();
        emits("change", showOpenDate.value.format("YYYY/MM/DD"));
      }
      function nextMonth() {
        showOpenDate.value = showOpenDate.value.add(1, "month");
        _data.value = getWeekOfMonthArray();
        emits("change", showOpenDate.value.format("YYYY/MM/DD"));
      }
      function prevMonth() {
        showOpenDate.value = showOpenDate.value.subtract(1, "month");
        _data.value = getWeekOfMonthArray();
        emits("change", showOpenDate.value.format("YYYY/MM/DD"));
      }
      function prevYear() {
        showOpenDate.value = showOpenDate.value.subtract(1, "year");
        _data.value = getWeekOfMonthArray();
        emits("change", showOpenDate.value.format("YYYY/MM/DD"));
      }
      function setDefault(data = []) {
        _value.value = data.length > 0 ? data : props.modelValue;
        showOpenDate.value = setShowopenDate();
        _data.value = getWeekOfMonthArray();
      }
      function getWeekOfMonthArray() {
        let nowMonth = showOpenDate.value.date(1);
        let startStatickDay = nowMonth.startOf("month");
        let endStatickDay = nowMonth.endOf("month");
        let nowMonthDayNum = nowMonth.daysInMonth();
        let startOfday = startStatickDay.isoWeekday() - 1;
        startStatickDay = nowMonth.subtract(Math.abs(startOfday), "day");
        let endOfday = 7 - endStatickDay.isoWeekday();
        if (endOfday > 0) {
          endStatickDay = nowMonth.date(nowMonthDayNum).add(Math.abs(endOfday), "day");
        }
        let startd = DayJs(startStatickDay);
        let arOfmonth = [];
        let ar = [];
        function setAr() {
          let dy = props.dateStyle.map((el) => {
            el.date = DayJs(el.date).format("YYYY/MM/DD");
            return el;
          });
          let dyObj = {};
          dy.forEach((el) => {
            dyObj[el.date] = el;
          });
          let dySet = new Set(Object.keys(dyObj));
          while (startd.isSameOrBefore(endStatickDay)) {
            let idate = startd.format("YYYY/MM/DD");
            let ext = dySet.has(idate) ? dyObj[idate] : null;
            ar.push({
              dateStr: idate,
              date: startd.date() < 10 ? "0" + startd.date() : startd.date(),
              day: startd.isoWeekday(),
              week: startd.isoWeek(),
              isNowIn: isInNowMonth(nowMonth, startd),
              disabled: isDisabledDate(startd),
              extra: __spreadValues18({
                date: idate,
                text: false,
                color: "",
                extra: ""
              }, ext)
            });
            arOfmonth.push(startd.isoWeek());
            startd = startd.add(1, "day");
          }
        }
        setAr();
        if (ar.length < 42) {
          let chaJi = 42 - ar.length;
          endStatickDay = endStatickDay.add(chaJi, "day");
          setAr();
        }
        arOfmonth = [...new Set(arOfmonth)];
        let dArray = [];
        let index = 0;
        dArray.push([]);
        ar.forEach((el) => {
          if (el.week == arOfmonth[index]) {
            dArray[index].push(el);
          } else {
            index += 1;
            dArray.push([]);
            dArray[index].push(el);
          }
        });
        return dArray;
      }
      function isInNowMonth(date = "", now = "") {
        let startStatickDay = DayJs(date).startOf("month").format("YYYY/MM/DD");
        let endStatickDay = DayJs(date).endOf("month").format("YYYY/MM/DD");
        return DayJs(now).isBetween(startStatickDay, endStatickDay, "day", "[]");
      }
      function isDisabledDate(date = "") {
        let valdate = DayJs(date);
        let isds = false;
        isds = !valdate.isBetween(_start_date.value, _end_date.value, "day", "[]");
        for (let i = 0; i < props.disabledDate.length; i++) {
          let item = props.disabledDate[i];
          if (DayJs(item).isSame(valdate)) {
            isds = true;
            break;
          }
        }
        return isds;
      }
      function isSelected(date = "") {
        let fr = _value.value.filter((el) => DayJs(el).isSame(date));
        return fr.length > 0;
      }
      function confirm() {
        let ar = _value.value.map((el) => DayJs(el).format("YYYY/MM/DD"));
        emits("update:modelValue", ar);
        emits("confirm", ar);
      }
      expose({
        setDefault,
        nextYear,
        nextMonth,
        prevYear,
        prevMonth
      });
      return (_ctx, _cache) => {
        return (0, import_vue18.openBlock)(), (0, import_vue18.createElementBlock)("view", {
          class: "flex flex-col relative",
          renderWhole: true
        }, [
          !props.hideTool ? ((0, import_vue18.openBlock)(), (0, import_vue18.createBlock)(tmSheet, {
            key: 0,
            shadow: 0,
            round: 0,
            margin: [0, 0],
            padding: [0, 24],
            _class: "flex flex-row flex-row-center-center"
          }, {
            default: (0, import_vue18.withCtx)(() => [
              (0, import_vue18.createElementVNode)("view", {
                onClick: (0, import_vue18.withModifiers)(prevYear, ["stop"]),
                class: "px-32"
              }, [
                (0, import_vue18.createVNode)(tmIcon, {
                  userInteractionEnabled: false,
                  "font-size": 24,
                  name: "tmicon-angle-double-left"
                })
              ], 8, ["onClick"]),
              (0, import_vue18.createElementVNode)("view", {
                onClick: (0, import_vue18.withModifiers)(prevMonth, ["stop"]),
                class: "px-32"
              }, [
                (0, import_vue18.createVNode)(tmIcon, {
                  userInteractionEnabled: false,
                  "font-size": 24,
                  name: "tmicon-angle-left"
                })
              ], 8, ["onClick"]),
              (0, import_vue18.createElementVNode)("view", { class: "px-12" }, [
                (0, import_vue18.createVNode)(tmText, {
                  userInteractionEnabled: false,
                  "font-size": 28,
                  label: (0, import_vue18.unref)(_nowDate)
                }, null, 8, ["label"])
              ]),
              (0, import_vue18.createElementVNode)("view", {
                onClick: (0, import_vue18.withModifiers)(nextMonth, ["stop"]),
                class: "px-32"
              }, [
                (0, import_vue18.createVNode)(tmIcon, {
                  userInteractionEnabled: false,
                  "font-size": 24,
                  name: "tmicon-angle-right"
                })
              ], 8, ["onClick"]),
              (0, import_vue18.createElementVNode)("view", {
                onClick: (0, import_vue18.withModifiers)(nextYear, ["stop"]),
                class: "px-32"
              }, [
                (0, import_vue18.createVNode)(tmIcon, {
                  userInteractionEnabled: false,
                  "font-size": 24,
                  name: "tmicon-angle-double-right"
                })
              ], 8, ["onClick"]),
              (0, import_vue18.createElementVNode)("view", {
                onClick: nowWeekClick,
                class: "absolute t-0 r-16 zIndex-10",
                style: { "width": "64rpx" }
              }, [
                (0, import_vue18.createVNode)(tmText, {
                  userInteractionEnabled: false,
                  "font-size": 28,
                  label: "\u672C\u65E5"
                })
              ])
            ]),
            _: 1
          })) : (0, import_vue18.createCommentVNode)("v-if", true),
          (0, import_vue18.createElementVNode)("view", {
            class: "flex flex-row flex-row-center-center py-12",
            style: (0, import_vue18.normalizeStyle)([{ height: "74rpx" }])
          }, [
            ((0, import_vue18.openBlock)(), (0, import_vue18.createElementBlock)(import_vue18.Fragment, null, (0, import_vue18.renderList)(weekStr, (item, index) => {
              return (0, import_vue18.createElementVNode)("view", {
                class: "flex-1 flex-center",
                key: index
              }, [
                (0, import_vue18.createElementVNode)("view", {
                  style: { "width": "62rpx" },
                  class: "flex-center flex-col"
                }, [
                  (0, import_vue18.createVNode)(tmText, {
                    "font-size": 24,
                    label: item
                  }, null, 8, ["label"])
                ])
              ]);
            }), 64))
          ]),
          (0, import_vue18.createElementVNode)("view", { class: "flex flex-col" }, [
            ((0, import_vue18.openBlock)(true), (0, import_vue18.createElementBlock)(import_vue18.Fragment, null, (0, import_vue18.renderList)(_data.value, (item, index) => {
              return (0, import_vue18.openBlock)(), (0, import_vue18.createElementBlock)("view", {
                class: "flex flex-row flex-row-center-center",
                style: (0, import_vue18.normalizeStyle)([{ height: "98rpx" }]),
                key: index
              }, [
                ((0, import_vue18.openBlock)(true), (0, import_vue18.createElementBlock)(import_vue18.Fragment, null, (0, import_vue18.renderList)(item, (item2, index2) => {
                  return (0, import_vue18.openBlock)(), (0, import_vue18.createBlock)(tmSheet, {
                    onClick: ($event) => clickWeek(item2),
                    height: 90,
                    shadow: 0,
                    round: 4,
                    border: item2.extra.color && isSelected(item2.dateStr) ? 1 : 0,
                    _class: "flex-row",
                    class: "flex-1",
                    "paren-class": "flex-1",
                    text: item2.extra.color ? true : isSelected(item2.dateStr),
                    color: item2.extra.color ? item2.extra.color : isSelected(item2.dateStr) ? (0, import_vue18.unref)(_color) : "white",
                    margin: [0, 0],
                    padding: [0, 0],
                    key: index2
                  }, {
                    default: (0, import_vue18.withCtx)(() => [
                      (0, import_vue18.createElementVNode)("view", {
                        userInteractionEnabled: false,
                        style: { "width": "62rpx" },
                        class: (0, import_vue18.normalizeClass)([[!item2.isNowIn ? "opacity-6" : ""], "flex-1 flex-center"])
                      }, [
                        (0, import_vue18.createElementVNode)("view", {
                          style: (0, import_vue18.normalizeStyle)([{ "width": "62rpx" }, [{ opacity: item2.disabled ? "0.3" : "1" }]]),
                          class: "flex-center flex-col"
                        }, [
                          (0, import_vue18.createVNode)(tmText, {
                            "font-size": 28,
                            label: item2.date
                          }, null, 8, ["label"]),
                          (0, import_vue18.createVNode)(tmText, {
                            _class: "flex-center",
                            "vv-if": "item2.extra.extra",
                            "font-size": 22,
                            label: item2.extra.extra
                          }, null, 8, ["label"])
                        ], 4)
                      ], 2)
                    ]),
                    _: 2
                  }, 1032, ["onClick", "border", "text", "color"]);
                }), 128))
              ]);
            }), 128))
          ]),
          !props.hideButton ? ((0, import_vue18.openBlock)(), (0, import_vue18.createBlock)(TmButton, {
            key: 1,
            followTheme: props.followTheme,
            linear: props.linear,
            "linear-deep": props.linearDeep,
            color: props.color,
            onClick: confirm,
            block: "",
            label: "\u786E\u8BA4",
            margin: [0, 16]
          }, null, 8, ["followTheme", "linear", "linear-deep", "color"])) : (0, import_vue18.createCommentVNode)("v-if", true)
        ]);
      };
    }
  });
  var monthDay = /* @__PURE__ */ _export_sfc(_sfc_main$32, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-calendar-view/month-day.vue"]]);
  var minMax = function(o, c, d) {
    var sortBy = function sortBy2(method, dates) {
      if (!dates || !dates.length || !dates[0] || dates.length === 1 && !dates[0].length) {
        return null;
      }
      if (dates.length === 1 && dates[0].length > 0) {
        var _dates = dates;
        dates = _dates[0];
      }
      var result;
      var _dates2 = dates;
      result = _dates2[0];
      for (var i = 1; i < dates.length; i += 1) {
        if (!dates[i].isValid() || dates[i][method](result)) {
          result = dates[i];
        }
      }
      return result;
    };
    d.max = function() {
      var args = [].slice.call(arguments, 0);
      return sortBy("isAfter", args);
    };
    d.min = function() {
      var args = [].slice.call(arguments, 0);
      return sortBy("isBefore", args);
    };
  };
  var _sfc_main$22 = /* @__PURE__ */ (0, import_vue18.defineComponent)({
    __name: "range-day",
    props: {
      followTheme: {
        type: Boolean,
        default: true
      },
      defaultValue: {
        type: Array,
        default: () => []
      },
      modelValue: {
        type: Array,
        default: () => []
      },
      color: {
        type: String,
        default: "primary"
      },
      linear: {
        type: String,
        default: ""
      },
      linearDeep: {
        type: String,
        default: "light"
      },
      start: {
        type: [String, Number, Date],
        default: ""
      },
      end: {
        type: [String, Number, Date],
        default: ""
      },
      disabledDate: {
        type: Array,
        default: () => []
      },
      dateStyle: {
        type: Array,
        default: () => []
      },
      hideTool: {
        type: Boolean,
        default: false
      },
      hideButton: {
        type: Boolean,
        default: false
      }
    },
    emits: ["update:modelValue", "confirm", "click-day", "change"],
    setup(__props, { expose, emit: emits }) {
      const props = __props;
      const store = useTmpiniaStore();
      const _color = (0, import_vue18.computed)(() => {
        if (props.followTheme && store.tmStore.color)
          return store.tmStore.color;
        return props.color;
      });
      const DayJs = dayjs;
      DayJs.extend(isoWeek);
      DayJs.extend(isSameOrBefore);
      DayJs.extend(isBetween);
      DayJs.extend(minMax);
      const _value = (0, import_vue18.ref)(props.defaultValue);
      const weekStr = ["\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u65E5"];
      const showOpenDate = (0, import_vue18.ref)(setShowopenDate());
      const _data = (0, import_vue18.ref)([]);
      const _start_date = (0, import_vue18.computed)(() => {
        let isv = DayJs(props.start).isValid();
        return isv ? DayJs(props.start) : DayJs("1980-1-1");
      });
      const _end_date = (0, import_vue18.computed)(() => {
        let isv = DayJs(props.end).isValid();
        return isv ? DayJs(props.end) : DayJs("2450-1-1");
      });
      const _nowDate = (0, import_vue18.computed)(() => {
        return showOpenDate.value.format("YYYY-MM");
      });
      _data.value = getWeekOfMonthArray();
      (0, import_vue18.watch)([
        () => props.modelValue,
        () => props.dateStyle,
        () => props.disabledDate,
        () => props.start,
        () => props.end
      ], () => {
        _value.value = props.modelValue;
        showOpenDate.value = setShowopenDate();
        _data.value = getWeekOfMonthArray();
      }, { deep: true });
      function setShowopenDate() {
        if (_value.value.length == 0) {
          return DayJs();
        }
        let n = _value.value[0] || DayJs();
        n = typeof n == "undefined" || n == null ? DayJs() : n;
        return DayJs(n);
      }
      function nowWeekClick() {
        if (isDisabledDate(DayJs())) {
          uni.showToast({ title: "\u65E0\u6CD5\u9009\u4E2D", icon: "none" });
          return;
        }
        selected(DayJs().format("YYYY/MM/DD"));
        showOpenDate.value = DayJs();
        _data.value = getWeekOfMonthArray();
        emits("click-day", DayJs().format("YYYY/MM/DD"));
      }
      function clickWeek(wk) {
        if (wk.disabled) {
          uni.showToast({ title: "\u65E0\u6CD5\u9009\u4E2D", icon: "none" });
          return;
        }
        selected(wk.dateStr);
        emits("click-day", wk.dateStr);
      }
      function selected(item) {
        let nowvalue = [...(0, import_vue18.toRaw)(_value.value)];
        if (nowvalue.length < 2) {
          nowvalue.push(DayJs(item).format("YYYY/MM/DD"));
        } else {
          nowvalue = [DayJs(item).format("YYYY/MM/DD")];
        }
        if (nowvalue.length == 2) {
          let dToDayjs = [DayJs(nowvalue[0]), DayJs(nowvalue[1])];
          _value.value = [DayJs.min(dToDayjs), DayJs.max(dToDayjs).format("YYYY/MM/DD")];
        } else {
          _value.value = nowvalue;
        }
      }
      function nextYear() {
        showOpenDate.value = showOpenDate.value.add(1, "year");
        _data.value = getWeekOfMonthArray();
        emits("change", showOpenDate.value.format("YYYY/MM/DD"));
      }
      function nextMonth() {
        showOpenDate.value = showOpenDate.value.add(1, "month");
        _data.value = getWeekOfMonthArray();
        emits("change", showOpenDate.value.format("YYYY/MM/DD"));
      }
      function prevMonth() {
        showOpenDate.value = showOpenDate.value.subtract(1, "month");
        _data.value = getWeekOfMonthArray();
        emits("change", showOpenDate.value.format("YYYY/MM/DD"));
      }
      function prevYear() {
        showOpenDate.value = showOpenDate.value.subtract(1, "year");
        _data.value = getWeekOfMonthArray();
        emits("change", showOpenDate.value.format("YYYY/MM/DD"));
      }
      function setDefault(data = []) {
        _value.value = props.modelValue;
        showOpenDate.value = setShowopenDate();
        _data.value = getWeekOfMonthArray();
      }
      function getWeekOfMonthArray() {
        let nowMonth = showOpenDate.value.date(1);
        let startStatickDay = nowMonth.startOf("month");
        let endStatickDay = nowMonth.endOf("month");
        let nowMonthDayNum = nowMonth.daysInMonth();
        let startOfday = startStatickDay.isoWeekday() - 1;
        startStatickDay = nowMonth.subtract(Math.abs(startOfday), "day");
        let endOfday = 7 - endStatickDay.isoWeekday();
        if (endOfday > 0) {
          endStatickDay = nowMonth.date(nowMonthDayNum).add(Math.abs(endOfday), "day");
        }
        let startd = DayJs(startStatickDay);
        let arOfmonth = [];
        let ar = [];
        function setAr() {
          let dy = props.dateStyle.map((el) => {
            el.date = DayJs(el.date).format("YYYY/MM/DD");
            return el;
          });
          let dyObj = {};
          dy.forEach((el) => {
            dyObj[el.date] = el;
          });
          let dySet = new Set(Object.keys(dyObj));
          while (startd.isSameOrBefore(endStatickDay)) {
            let idate = startd.format("YYYY/MM/DD");
            let ext = dySet.has(idate) ? dyObj[idate] : null;
            ar.push({
              dateStr: idate,
              date: startd.date() < 10 ? "0" + startd.date() : startd.date(),
              day: startd.isoWeekday(),
              week: startd.isoWeek(),
              isNowIn: isInNowMonth(nowMonth, startd),
              disabled: isDisabledDate(startd),
              extra: __spreadValues18({
                date: idate,
                text: false,
                color: "",
                extra: ""
              }, ext)
            });
            arOfmonth.push(startd.isoWeek());
            startd = startd.add(1, "day");
          }
        }
        setAr();
        if (ar.length < 42) {
          let chaJi = 42 - ar.length;
          endStatickDay = endStatickDay.add(chaJi, "day");
          setAr();
        }
        arOfmonth = [...new Set(arOfmonth)];
        let dArray = [];
        let index = 0;
        dArray.push([]);
        ar.forEach((el) => {
          if (el.week == arOfmonth[index]) {
            dArray[index].push(el);
          } else {
            index += 1;
            dArray.push([]);
            dArray[index].push(el);
          }
        });
        return dArray;
      }
      function isInNowMonth(date = "", now = "") {
        let startStatickDay = DayJs(date).startOf("month").format("YYYY/MM/DD");
        let endStatickDay = DayJs(date).endOf("month").format("YYYY/MM/DD");
        return DayJs(now).isBetween(startStatickDay, endStatickDay, "day", "[]");
      }
      function isDisabledDate(date = "") {
        let valdate = DayJs(date);
        let isds = false;
        isds = !valdate.isBetween(_start_date.value, _end_date.value, "day", "[]");
        for (let i = 0; i < props.disabledDate.length; i++) {
          let item = props.disabledDate[i];
          if (DayJs(item).isSame(valdate, "day")) {
            isds = true;
            break;
          }
        }
        return isds;
      }
      function isSelected(date = "") {
        let isSelected2 = false;
        let fr = _value.value.filter((el) => DayJs(el).isSame(date));
        isSelected2 = fr.length > 0 ? true : false;
        if (_value.value.length == 2) {
          isSelected2 = DayJs(date).isBetween(_value.value[0], _value.value[1], "day", "[]");
        }
        return isSelected2;
      }
      function startOrAnd(date = "") {
        if (_value.value.length == 1) {
          if (DayJs(date).isSame(_value.value[0], "day")) {
            return 1;
          }
        } else if (_value.value.length == 2) {
          if (DayJs(_value.value[1]).isSame(_value.value[0], "day") && DayJs(date).isSame(_value.value[0])) {
            return 3;
          }
          if (DayJs(date).isSame(_value.value[0])) {
            return 1;
          }
          if (DayJs(date).isSame(_value.value[1])) {
            return 2;
          }
        } else {
          return 0;
        }
      }
      function confirm() {
        let ar = _value.value.map((el) => DayJs(el).format("YYYY/MM/DD"));
        emits("update:modelValue", ar);
        emits("confirm", ar);
      }
      expose({
        setDefault,
        nextYear,
        nextMonth,
        prevYear,
        prevMonth
      });
      return (_ctx, _cache) => {
        return (0, import_vue18.openBlock)(), (0, import_vue18.createElementBlock)("view", {
          class: "flex flex-col relative",
          renderWhole: true
        }, [
          !props.hideTool ? ((0, import_vue18.openBlock)(), (0, import_vue18.createBlock)(tmSheet, {
            key: 0,
            shadow: 0,
            round: 0,
            margin: [0, 0],
            padding: [0, 24],
            _class: "flex flex-row flex-row-center-center"
          }, {
            default: (0, import_vue18.withCtx)(() => [
              (0, import_vue18.createElementVNode)("view", {
                onClick: (0, import_vue18.withModifiers)(prevYear, ["stop"]),
                class: "px-32"
              }, [
                (0, import_vue18.createVNode)(tmIcon, {
                  userInteractionEnabled: false,
                  "font-size": 24,
                  name: "tmicon-angle-double-left"
                })
              ], 8, ["onClick"]),
              (0, import_vue18.createElementVNode)("view", {
                onClick: (0, import_vue18.withModifiers)(prevMonth, ["stop"]),
                class: "px-32"
              }, [
                (0, import_vue18.createVNode)(tmIcon, {
                  userInteractionEnabled: false,
                  "font-size": 24,
                  name: "tmicon-angle-left"
                })
              ], 8, ["onClick"]),
              (0, import_vue18.createElementVNode)("view", { class: "px-12" }, [
                (0, import_vue18.createVNode)(tmText, {
                  userInteractionEnabled: false,
                  "font-size": 28,
                  label: (0, import_vue18.unref)(_nowDate)
                }, null, 8, ["label"])
              ]),
              (0, import_vue18.createElementVNode)("view", {
                onClick: (0, import_vue18.withModifiers)(nextMonth, ["stop"]),
                class: "px-32"
              }, [
                (0, import_vue18.createVNode)(tmIcon, {
                  userInteractionEnabled: false,
                  "font-size": 24,
                  name: "tmicon-angle-right"
                })
              ], 8, ["onClick"]),
              (0, import_vue18.createElementVNode)("view", {
                onClick: (0, import_vue18.withModifiers)(nextYear, ["stop"]),
                class: "px-32"
              }, [
                (0, import_vue18.createVNode)(tmIcon, {
                  userInteractionEnabled: false,
                  "font-size": 24,
                  name: "tmicon-angle-double-right"
                })
              ], 8, ["onClick"]),
              (0, import_vue18.createElementVNode)("view", {
                onClick: nowWeekClick,
                class: "absolute t-0 r-16 zIndex-10",
                style: { "width": "64rpx" }
              }, [
                (0, import_vue18.createVNode)(tmText, {
                  userInteractionEnabled: false,
                  "font-size": 28,
                  label: "\u672C\u65E5"
                })
              ])
            ]),
            _: 1
          })) : (0, import_vue18.createCommentVNode)("v-if", true),
          (0, import_vue18.createElementVNode)("view", {
            class: "flex flex-row flex-row-center-center py-12",
            style: (0, import_vue18.normalizeStyle)([{ height: "74rpx" }])
          }, [
            ((0, import_vue18.openBlock)(), (0, import_vue18.createElementBlock)(import_vue18.Fragment, null, (0, import_vue18.renderList)(weekStr, (item, index) => {
              return (0, import_vue18.createElementVNode)("view", {
                class: "flex-1 flex-center",
                key: index
              }, [
                (0, import_vue18.createElementVNode)("view", {
                  style: { "width": "62rpx" },
                  class: "flex-center flex-col"
                }, [
                  (0, import_vue18.createVNode)(tmText, {
                    "font-size": 24,
                    label: item
                  }, null, 8, ["label"])
                ])
              ]);
            }), 64))
          ]),
          (0, import_vue18.createElementVNode)("view", { class: "flex flex-col" }, [
            ((0, import_vue18.openBlock)(true), (0, import_vue18.createElementBlock)(import_vue18.Fragment, null, (0, import_vue18.renderList)(_data.value, (item, index) => {
              return (0, import_vue18.openBlock)(), (0, import_vue18.createElementBlock)("view", {
                class: "flex flex-row flex-row-center-center",
                style: (0, import_vue18.normalizeStyle)([{ height: "98rpx" }]),
                key: index
              }, [
                ((0, import_vue18.openBlock)(true), (0, import_vue18.createElementBlock)(import_vue18.Fragment, null, (0, import_vue18.renderList)(item, (item2, index2) => {
                  return (0, import_vue18.openBlock)(), (0, import_vue18.createBlock)(tmSheet, {
                    onClick: ($event) => clickWeek(item2),
                    height: 98,
                    shadow: 0,
                    round: 0,
                    border: item2.extra.color && isSelected(item2.dateStr) ? 1 : 0,
                    _class: "flex-row",
                    class: "flex-1",
                    "paren-class": "flex-1",
                    text: startOrAnd(item2.dateStr) == 1 || startOrAnd(item2.dateStr) == 2 || startOrAnd(item2.dateStr) == 3 ? false : item2.extra.color ? true : isSelected(item2.dateStr),
                    color: item2.extra.color ? item2.extra.color : isSelected(item2.dateStr) ? (0, import_vue18.unref)(_color) : "white",
                    margin: [0, 0],
                    padding: [0, 0],
                    key: index2
                  }, {
                    default: (0, import_vue18.withCtx)(() => [
                      (0, import_vue18.createElementVNode)("view", {
                        userInteractionEnabled: false,
                        style: { "width": "84rpx" },
                        class: (0, import_vue18.normalizeClass)([[!item2.isNowIn ? "opacity-6" : ""], "flex-1 flex-center"])
                      }, [
                        (0, import_vue18.createElementVNode)("view", {
                          style: (0, import_vue18.normalizeStyle)([{ "width": "84rpx" }, [{ opacity: item2.disabled ? "0.3" : "1" }]]),
                          class: "flex-center flex-col"
                        }, [
                          (0, import_vue18.createVNode)(tmText, {
                            "font-size": 28,
                            label: item2.date
                          }, null, 8, ["label"]),
                          startOrAnd(item2.dateStr) == 0 && item2.extra.extra ? ((0, import_vue18.openBlock)(), (0, import_vue18.createBlock)(tmText, {
                            key: 0,
                            _class: "flex-center",
                            "font-size": 22,
                            label: item2.extra.extra
                          }, null, 8, ["label"])) : (0, import_vue18.createCommentVNode)("v-if", true),
                          startOrAnd(item2.dateStr) == 1 ? ((0, import_vue18.openBlock)(), (0, import_vue18.createBlock)(tmText, {
                            key: 1,
                            _class: "flex-center",
                            "font-size": 22,
                            label: "\u5F00\u59CB"
                          })) : (0, import_vue18.createCommentVNode)("v-if", true),
                          startOrAnd(item2.dateStr) == 2 ? ((0, import_vue18.openBlock)(), (0, import_vue18.createBlock)(tmText, {
                            key: 2,
                            _class: "flex-center",
                            "font-size": 22,
                            label: "\u7ED3\u675F"
                          })) : (0, import_vue18.createCommentVNode)("v-if", true),
                          startOrAnd(item2.dateStr) == 3 ? ((0, import_vue18.openBlock)(), (0, import_vue18.createBlock)(tmText, {
                            key: 3,
                            _class: "flex-center",
                            "font-size": 20,
                            label: "\u59CB/\u7ED3\u675F"
                          })) : (0, import_vue18.createCommentVNode)("v-if", true)
                        ], 4)
                      ], 2)
                    ]),
                    _: 2
                  }, 1032, ["onClick", "border", "text", "color"]);
                }), 128))
              ]);
            }), 128))
          ]),
          !props.hideButton ? ((0, import_vue18.openBlock)(), (0, import_vue18.createBlock)(TmButton, {
            key: 1,
            linear: props.linear,
            "linear-deep": props.linearDeep,
            color: props.color,
            onClick: confirm,
            block: "",
            label: "\u786E\u8BA4",
            margin: [32, 16]
          }, null, 8, ["linear", "linear-deep", "color"])) : (0, import_vue18.createCommentVNode)("v-if", true)
        ]);
      };
    }
  });
  var rangeDay = /* @__PURE__ */ _export_sfc(_sfc_main$22, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-calendar-view/range-day.vue"]]);
  var _sfc_main$14 = /* @__PURE__ */ (0, import_vue18.defineComponent)({
    __name: "tm-calendar-view",
    props: __spreadProps18(__spreadValues18({}, custom_props), {
      followTheme: {
        type: Boolean,
        default: true
      },
      defaultValue: {
        type: Array,
        default: () => []
      },
      modelValue: {
        type: Array,
        default: () => []
      },
      modelStr: {
        type: String,
        default: ""
      },
      model: {
        type: String,
        default: "day"
      },
      color: {
        type: String,
        default: "primary"
      },
      linear: {
        type: String,
        default: ""
      },
      linearDeep: {
        type: String,
        default: "light"
      },
      start: {
        type: [String, Number, Date],
        default: ""
      },
      end: {
        type: [String, Number, Date],
        default: ""
      },
      disabledDate: {
        type: Array,
        default: () => []
      },
      multiple: {
        type: Boolean,
        default: false
      },
      dateStyle: {
        type: Array,
        default: () => []
      },
      max: {
        type: Number,
        default: 999
      },
      hideButton: {
        type: Boolean,
        default: false
      },
      hideTool: {
        type: Boolean,
        default: false
      }
    }),
    emits: ["update:modelValue", "update:modelStr", "confirm", "click", "change"],
    setup(__props, { expose, emit: emits }) {
      var _a2, _b2;
      const props = __props;
      (_b2 = (_a2 = (0, import_vue18.getCurrentInstance)()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const rDay = (0, import_vue18.ref)(null);
      const Day = (0, import_vue18.ref)(null);
      const Year = (0, import_vue18.ref)(null);
      const Month = (0, import_vue18.ref)(null);
      const Week = (0, import_vue18.ref)(null);
      const _value = (0, import_vue18.ref)(props.defaultValue);
      const _modelType = (0, import_vue18.computed)(() => props.model);
      (0, import_vue18.watch)(() => props.modelValue, () => _value.value = props.modelValue, { deep: true });
      (0, import_vue18.watch)(_value, () => {
        emits("update:modelStr", _value.value.join("~"));
      }, { deep: true });
      function change(e) {
        emits("change", e);
      }
      function click(e) {
        emits("click", e);
      }
      function confirm(e) {
        emits("confirm", e);
        emits("update:modelValue", e);
      }
      function getRefs() {
        if (_modelType.value == "day")
          return Day.value;
        if (_modelType.value == "rang")
          return rDay.value;
        if (_modelType.value == "week")
          return Week.value;
        if (_modelType.value == "month")
          return Month.value;
        if (_modelType.value == "year")
          return Year.value;
        return Day.value;
      }
      expose({
        setDefault: (e) => {
          (0, import_vue18.nextTick)(() => getRefs().setDefault(e));
        },
        nextYear: () => {
          (0, import_vue18.nextTick)(() => getRefs().nextYear());
        },
        nextMonth: () => {
          (0, import_vue18.nextTick)(() => getRefs().nextMonth());
        },
        prevYear: () => {
          (0, import_vue18.nextTick)(() => getRefs().prevYear());
        },
        prevMonth: () => {
          (0, import_vue18.nextTick)(() => getRefs().prevMonth());
        }
      });
      return (_ctx, _cache) => {
        return (0, import_vue18.openBlock)(), (0, import_vue18.createBlock)(tmSheet, {
          margin: [0, 0],
          padding: [0, 0]
        }, {
          default: (0, import_vue18.withCtx)(() => [
            (0, import_vue18.createCommentVNode)(" \u6309\u65E5\u9009\u62E9\u7684\u65E5\u671F\uFF0C\u53EF\u5355\u9009\uFF0C\u591A\u9009\u3002 "),
            (0, import_vue18.unref)(_modelType) == "rang" ? ((0, import_vue18.openBlock)(), (0, import_vue18.createBlock)(rangeDay, {
              key: 0,
              hideButton: props.hideButton,
              hideTool: props.hideTool,
              followTheme: props.followTheme,
              ref_key: "rDay",
              ref: rDay,
              onConfirm: confirm,
              onClickDay: click,
              onChange: change,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _value.value = $event),
              "model-value": _value.value,
              "default-value": _value.value,
              dateStyle: props.dateStyle,
              disabledDate: props.disabledDate,
              start: props.start,
              end: props.end,
              color: props.color,
              linear: props.linear,
              linearDeep: props.linearDeep
            }, null, 8, ["hideButton", "hideTool", "followTheme", "model-value", "default-value", "dateStyle", "disabledDate", "start", "end", "color", "linear", "linearDeep"])) : (0, import_vue18.createCommentVNode)("v-if", true),
            (0, import_vue18.unref)(_modelType) == "day" ? ((0, import_vue18.openBlock)(), (0, import_vue18.createBlock)(monthDay, {
              key: 1,
              hideButton: props.hideButton,
              hideTool: props.hideTool,
              followTheme: props.followTheme,
              ref_key: "Day",
              ref: Day,
              onConfirm: confirm,
              onClickDay: click,
              onChange: change,
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _value.value = $event),
              "model-value": _value.value,
              "default-value": _value.value,
              dateStyle: props.dateStyle,
              disabledDate: props.disabledDate,
              max: props.max,
              multiple: props.multiple,
              start: props.start,
              end: props.end,
              color: props.color,
              linear: props.linear,
              linearDeep: props.linearDeep
            }, null, 8, ["hideButton", "hideTool", "followTheme", "model-value", "default-value", "dateStyle", "disabledDate", "max", "multiple", "start", "end", "color", "linear", "linearDeep"])) : (0, import_vue18.createCommentVNode)("v-if", true),
            (0, import_vue18.createCommentVNode)(" \u6309\u5E74\u9009\u62E9 "),
            (0, import_vue18.unref)(_modelType) == "year" ? ((0, import_vue18.openBlock)(), (0, import_vue18.createBlock)(yearDu, {
              key: 2,
              hideButton: props.hideButton,
              hideTool: props.hideTool,
              followTheme: props.followTheme,
              ref_key: "Year",
              ref: Year,
              onConfirm: confirm,
              onClickYear: click,
              onChange: change,
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _value.value = $event),
              "model-value": _value.value,
              "default-value": _value.value,
              start: props.start,
              end: props.end,
              color: props.color,
              linear: props.linear,
              linearDeep: props.linearDeep
            }, null, 8, ["hideButton", "hideTool", "followTheme", "model-value", "default-value", "start", "end", "color", "linear", "linearDeep"])) : (0, import_vue18.createCommentVNode)("v-if", true),
            (0, import_vue18.createCommentVNode)(" \u6309\u6708\u9009\u62E9 "),
            (0, import_vue18.unref)(_modelType) == "month" ? ((0, import_vue18.openBlock)(), (0, import_vue18.createBlock)(monthYear, {
              key: 3,
              hideButton: props.hideButton,
              hideTool: props.hideTool,
              followTheme: props.followTheme,
              ref_key: "Month",
              ref: Month,
              onConfirm: confirm,
              onClickMonth: click,
              onChange: change,
              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => _value.value = $event),
              "model-value": _value.value,
              "default-value": _value.value,
              start: props.start,
              end: props.end,
              color: props.color,
              linear: props.linear,
              linearDeep: props.linearDeep
            }, null, 8, ["hideButton", "hideTool", "followTheme", "model-value", "default-value", "start", "end", "color", "linear", "linearDeep"])) : (0, import_vue18.createCommentVNode)("v-if", true),
            (0, import_vue18.createCommentVNode)(" \u6309\u5468\u9009\u62E9\u65F6\u6BB5 "),
            (0, import_vue18.unref)(_modelType) == "week" ? ((0, import_vue18.openBlock)(), (0, import_vue18.createBlock)(weekDay, {
              key: 4,
              hideButton: props.hideButton,
              hideTool: props.hideTool,
              followTheme: props.followTheme,
              ref_key: "Week",
              ref: Week,
              onConfirm: confirm,
              onClickWeek: click,
              onChange: change,
              "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => _value.value = $event),
              "model-value": _value.value,
              "default-value": _value.value,
              start: props.start,
              end: props.end,
              color: props.color,
              linear: props.linear,
              linearDeep: props.linearDeep
            }, null, 8, ["hideButton", "hideTool", "followTheme", "model-value", "default-value", "start", "end", "color", "linear", "linearDeep"])) : (0, import_vue18.createCommentVNode)("v-if", true)
          ]),
          _: 1
        });
      };
    }
  });
  var tmCalendarView = /* @__PURE__ */ _export_sfc(_sfc_main$14, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-calendar-view/tm-calendar-view.vue"]]);
  var _sfc_main18 = /* @__PURE__ */ (0, import_vue18.defineComponent)({
    __name: "tm-calendar",
    props: __spreadProps18(__spreadValues18({}, custom_props), {
      show: {
        type: Boolean,
        default: false
      },
      defaultValue: {
        type: Array,
        default: () => []
      },
      modelValue: {
        type: Array,
        default: () => []
      },
      modelStr: {
        type: String,
        default: ""
      },
      model: {
        type: String,
        default: "day"
      },
      color: {
        type: String,
        default: "primary"
      },
      linear: {
        type: String,
        default: ""
      },
      linearDeep: {
        type: String,
        default: "light"
      },
      start: {
        type: [String, Number, Date],
        default: ""
      },
      end: {
        type: [String, Number, Date],
        default: ""
      },
      disabledDate: {
        type: Array,
        default: () => []
      },
      multiple: {
        type: Boolean,
        default: false
      },
      dateStyle: {
        type: Array,
        default: () => []
      },
      max: {
        type: Number,
        default: 999
      },
      round: {
        type: Number,
        default: 12
      },
      hideButton: {
        type: Boolean,
        default: false
      },
      hideTool: {
        type: Boolean,
        default: false
      }
    }),
    emits: ["update:modelValue", "update:modelStr", "update:show", "confirm", "click", "change", "cancel", "close", "open"],
    setup(__props, { emit: emits }) {
      const props = __props;
      const drawer = (0, import_vue18.ref)(null);
      const calendarView = (0, import_vue18.ref)(null);
      const sysinfo = (0, import_vue18.inject)("tmuiSysInfo", (0, import_vue18.computed)(() => {
        return { bottom: 0, height: 750, width: uni.upx2px(750), top: 0, isCustomHeader: false, sysinfo: null };
      }));
      const _show = (0, import_vue18.ref)(props.show);
      const isConfirm = (0, import_vue18.ref)(false);
      const _value = (0, import_vue18.ref)(props.defaultValue);
      const _strvalue = (0, import_vue18.ref)(props.modelStr);
      const _modelType = (0, import_vue18.computed)(() => props.model);
      function close() {
        if (!isConfirm.value) {
          emits("cancel");
        }
        emits("close");
        emits("update:show", false);
        isConfirm.value = false;
        _show.value = false;
      }
      function open() {
        emits("open");
        emits("update:show", true);
        _show.value = true;
      }
      (0, import_vue18.watchEffect)(() => {
        emits("update:modelStr", _strvalue.value);
        emits("update:modelValue", _value.value);
      });
      (0, import_vue18.watch)(() => props.show, () => {
        var _a2, _b2;
        if (_show.value == props.show)
          return;
        if (drawer.value) {
          if (props.show) {
            (_a2 = drawer.value) == null ? void 0 : _a2.open();
          } else {
            (_b2 = drawer.value) == null ? void 0 : _b2.close();
          }
        }
      });
      (0, import_vue18.onMounted)(() => {
        var _a2;
        if (props.show && drawer.value) {
          (_a2 = drawer.value) == null ? void 0 : _a2.open();
        }
      });
      (0, import_vue18.watch)(() => props.modelValue, () => {
        _value.value = props.modelValue;
        _strvalue.value = _value.value.join("~");
      }, { deep: true });
      function change(e) {
        emits("change", e);
      }
      function onclick(e) {
        emits("click", e);
      }
      function confirm(e) {
        var _a2;
        emits("confirm", e);
        (_a2 = drawer.value) == null ? void 0 : _a2.close();
      }
      let win_bottom = (0, import_vue18.computed)(() => {
        if (props.hideButton) {
          return sysinfo.value.bottom - 80;
        }
        return sysinfo.value.bottom;
      });
      const dHeight = (0, import_vue18.computed)(() => {
        if (_modelType.value == "day")
          return 900 + win_bottom.value;
        if (_modelType.value == "rang")
          return 900 + win_bottom.value;
        if (_modelType.value == "week")
          return 740 + win_bottom.value;
        if (_modelType.value == "month")
          return 720 + win_bottom.value;
        if (_modelType.value == "year")
          return 620 + win_bottom.value;
        return 600 + win_bottom.value;
      });
      return (_ctx, _cache) => {
        return (0, import_vue18.openBlock)(), (0, import_vue18.createBlock)(tmDrawer, {
          disabbleScroll: true,
          ref_key: "drawer",
          ref: drawer,
          round: props.round,
          height: (0, import_vue18.unref)(dHeight),
          onClose: close,
          onOpen: open,
          hideHeader: true
        }, {
          default: (0, import_vue18.withCtx)(() => [
            (0, import_vue18.createElementVNode)("view", { class: "mx-16 mt-24" }, [
              (0, import_vue18.createVNode)(tmCalendarView, {
                hideButton: props.hideButton,
                hideTool: props.hideTool,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _value.value = $event),
                "model-value": _value.value,
                "onUpdate:modelStr": _cache[1] || (_cache[1] = ($event) => _strvalue.value = $event),
                "model-str": _strvalue.value,
                "default-value": _value.value,
                onChange: change,
                onConfirm: confirm,
                onClick: onclick,
                model: props.model,
                color: props.color,
                linear: props.linear,
                linearDeep: props.linearDeep,
                start: props.start,
                end: props.end,
                disabledDate: props.disabledDate,
                multiple: props.multiple,
                dateStyle: props.dateStyle,
                max: props.max,
                ref_key: "calendarView",
                ref: calendarView
              }, null, 8, ["hideButton", "hideTool", "model-value", "model-str", "default-value", "model", "color", "linear", "linearDeep", "start", "end", "disabledDate", "multiple", "dateStyle", "max"])
            ])
          ]),
          _: 1
        }, 8, ["round", "height"]);
      };
    }
  });
  var tmCalendar = /* @__PURE__ */ _export_sfc(_sfc_main18, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-calendar/tm-calendar.vue"]]);

  // F:/CoinQT/CoinQT_app/unpackage/dist/dev/.nvue/tm-city-picker.js
  var import_vue20 = __toESM(require_vue());

  // F:/CoinQT/CoinQT_app/unpackage/dist/dev/.nvue/tm-picker-view.js
  var import_vue19 = __toESM(require_vue());
  var _style_08 = { "top": { "": { "backgroundImage": "linear-gradient(to bottom,rgba(17, 17, 17, 1),rgba(36, 36, 36, 0.6))" } }, "bottom": { "": { "backgroundImage": "linear-gradient(to top,rgba(17, 17, 17, 1),rgba(36, 36, 36, 0.6))" } } };
  var _sfc_main$15 = /* @__PURE__ */ (0, import_vue19.defineComponent)({
    __name: "picker-panel",
    props: {
      followTheme: {
        type: [Boolean],
        default: true
      },
      col: {
        type: Number,
        default: 0
      },
      disabled: {
        type: Boolean,
        default: false
      },
      height: {
        type: Number,
        default: 600
      },
      data: {
        type: Array,
        default: () => [],
        required: true
      },
      dataKey: {
        type: String,
        default: "text"
      }
    },
    emits: ["change", "end", "start"],
    setup(__props, { emit: emits }) {
      var _a2, _b2;
      const props = __props;
      const dom = requireNativePlugin("dom");
      const proxy = (_b2 = (_a2 = (0, import_vue19.getCurrentInstance)()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const store = useTmpiniaStore();
      const isDark = (0, import_vue19.computed)(() => store.tmStore.dark);
      const _data = (0, import_vue19.computed)(() => props.data);
      const colIndex = (0, import_vue19.ref)(0);
      const showDom = (0, import_vue19.ref)(false);
      const maskHeight = (0, import_vue19.computed)(() => {
        return (uni.upx2px(props.height) - 34) / 2;
      });
      const maskWidth = (0, import_vue19.ref)(0);
      (0, import_vue19.computed)(() => {
        let str_white = "background-image:linear-gradient(rgba(255,255,255,0.95),rgba(255,255,255,0.6)),linear-gradient(rgba(255,255,255,0.6),rgba(255,255,255,0.95))";
        let str_black = "background-image:linear-gradient(rgba(17, 17, 17, 1.0),rgba(106, 106, 106, 0.2)),linear-gradient(rgba(106, 106, 106, 0.2),rgba(17, 17, 17, 1.0))";
        str_black = "background-image: linear-gradient(to bottom,rgba(30, 30, 30, 0.9),rgba(104, 104, 104, 0.6))";
        if (!isDark.value) {
          return str_white;
        }
        return str_black;
      });
      (0, import_vue19.onMounted)(() => {
        showDom.value = true;
        nvuegetClientRect();
        setTimeout(function() {
          colIndex.value = props.col;
        }, 50);
      });
      (0, import_vue19.onUpdated)(() => nvuegetClientRect());
      (0, import_vue19.watch)(() => props.col, () => {
        colIndex.value = props.col;
      });
      function colchange(e) {
        colIndex.value = e.detail.value[0];
        emits("change", colIndex.value);
      }
      function nvuegetClientRect() {
        (0, import_vue19.nextTick)(function() {
          dom.getComponentRect(proxy.$refs.picker, function(res) {
            if (res == null ? void 0 : res.size) {
              maskWidth.value = res.size.width;
              if (res.size.width == 0) {
                nvuegetClientRect();
              }
            }
          });
        });
      }
      return (_ctx, _cache) => {
        const _component_picker_view_column = (0, import_vue19.resolveComponent)("picker-view-column");
        const _component_picker_view = (0, import_vue19.resolveComponent)("picker-view");
        return (0, import_vue19.openBlock)(), (0, import_vue19.createElementBlock)("view", {
          class: "flex-1 relative",
          style: (0, import_vue19.normalizeStyle)({ height: props.height + "rpx" }),
          renderWhole: true
        }, [
          (0, import_vue19.createCommentVNode)(" uniapp\u6709bug\u5728nvue\u4E0A\uFF0C\u6682\u65F6\u4E0D\u8BBE\u7F6E "),
          (0, import_vue19.createCommentVNode)(` :mask-style="isDark?'background:linear-gradient(0deg,rgba(0,0,0,0.4),rgba(0,0,0,0),rgba(0,0,0,0.4))':'background:rgba(255,255,255,0)'" `),
          showDom.value ? ((0, import_vue19.openBlock)(), (0, import_vue19.createBlock)(_component_picker_view, {
            key: 0,
            ref: "picker",
            onPickend: _cache[0] || (_cache[0] = ($event) => emits("end")),
            onPickstart: _cache[1] || (_cache[1] = ($event) => emits("start")),
            value: [colIndex.value],
            onChange: colchange,
            style: (0, import_vue19.normalizeStyle)([{ height: props.height + "rpx" }])
          }, {
            default: (0, import_vue19.withCtx)(() => [
              (0, import_vue19.createVNode)(_component_picker_view_column, {
                style: (0, import_vue19.normalizeStyle)([{ height: props.height + "rpx" }])
              }, {
                default: (0, import_vue19.withCtx)(() => [
                  ((0, import_vue19.openBlock)(true), (0, import_vue19.createElementBlock)(import_vue19.Fragment, null, (0, import_vue19.renderList)((0, import_vue19.unref)(_data), (item, index) => {
                    return (0, import_vue19.openBlock)(), (0, import_vue19.createElementBlock)("view", {
                      class: (0, import_vue19.normalizeClass)([[item["disabled"] ? "opacity-5" : ""], "flex"]),
                      key: index,
                      style: { "justify-content": "center", "height": "34px", "align-items": "center" }
                    }, [
                      typeof item == "string" ? ((0, import_vue19.openBlock)(), (0, import_vue19.createBlock)(tmText, {
                        key: 0,
                        _class: "text-align-center",
                        "font-size": item.length > 7 ? 24 : 30,
                        dark: (0, import_vue19.unref)(isDark),
                        label: item
                      }, null, 8, ["font-size", "dark", "label"])) : (0, import_vue19.createCommentVNode)("v-if", true),
                      typeof item == "object" ? ((0, import_vue19.openBlock)(), (0, import_vue19.createBlock)(tmText, {
                        key: 1,
                        _class: "text-align-center",
                        "font-size": item[props.dataKey].length > 7 ? 24 : 30,
                        dark: (0, import_vue19.unref)(isDark),
                        label: item[props.dataKey] || ""
                      }, null, 8, ["font-size", "dark", "label"])) : (0, import_vue19.createCommentVNode)("v-if", true)
                    ], 2);
                  }), 128))
                ]),
                _: 1
              }, 8, ["style"])
            ]),
            _: 1
          }, 8, ["value", "style"])) : (0, import_vue19.createCommentVNode)("v-if", true),
          (0, import_vue19.unref)(isDark) ? ((0, import_vue19.openBlock)(), (0, import_vue19.createElementBlock)("view", {
            key: 1,
            userInteractionEnabled: false,
            class: "top absolute l-0 t-0",
            style: (0, import_vue19.normalizeStyle)({ height: (0, import_vue19.unref)(maskHeight) + "px", width: maskWidth.value + "px" })
          }, null, 4)) : (0, import_vue19.createCommentVNode)("v-if", true),
          (0, import_vue19.unref)(isDark) ? ((0, import_vue19.openBlock)(), (0, import_vue19.createElementBlock)("view", {
            key: 2,
            userInteractionEnabled: false,
            class: "bottom absolute l-0 b-0",
            style: (0, import_vue19.normalizeStyle)({ height: (0, import_vue19.unref)(maskHeight) + "px", width: maskWidth.value + "px" })
          }, null, 4)) : (0, import_vue19.createCommentVNode)("v-if", true)
        ], 4);
      };
    }
  });
  var pickerPanelVue = /* @__PURE__ */ _export_sfc(_sfc_main$15, [["styles", [_style_08]], ["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-picker-view/picker-panel.vue"]]);
  var _sfc_main19 = /* @__PURE__ */ (0, import_vue19.defineComponent)({
    __name: "tm-picker-view",
    props: {
      followTheme: {
        type: [Boolean, String],
        default: true
      },
      height: {
        type: Number,
        default: 450
      },
      modelValue: {
        type: Array,
        default: () => []
      },
      modelStr: {
        type: [String],
        default: ""
      },
      defaultValue: {
        type: Array,
        default: () => [0]
      },
      columns: {
        type: Array,
        default: () => [],
        required: true
      },
      dataKey: {
        type: String,
        default: "text"
      },
      beforeChange: {
        type: [Boolean, Function],
        default: () => false
      }
    },
    emits: ["change", "update:modelValue", "update:modelStr", "end", "start"],
    setup(__props, { emit: emits }) {
      const props = __props;
      const _colIndex = (0, import_vue19.ref)([...props.defaultValue]);
      const _data = (0, import_vue19.ref)([]);
      const _modelStr = (0, import_vue19.computed)(() => {
        let str = [];
        _data.value.forEach((el, index) => {
          var _a2;
          let item = el[_colIndex.value[index]];
          if (typeof item == "undefined")
            return;
          str.push((_a2 = item[props.dataKey]) != null ? _a2 : "");
        });
        return str.join("/");
      });
      (0, import_vue19.watch)(() => _colIndex.value, () => {
        (0, import_vue19.nextTick)(() => {
          emits("update:modelStr", _modelStr.value);
        });
      }, { deep: true });
      function getIndexLoop(defaultindex = 0, data) {
        var _a2;
        let ds = [];
        if (data.length == 0)
          return [];
        if (typeof _colIndex.value[defaultindex] == "undefined") {
          _colIndex.value.push(0);
        }
        let nowData = data[_colIndex.value[defaultindex]];
        if (!nowData) {
          _colIndex.value[defaultindex] = 0;
          nowData = data[_colIndex.value[defaultindex]];
        }
        if (nowData && (nowData == null ? void 0 : nowData.children) && Array.isArray(nowData == null ? void 0 : nowData.children) && ((_a2 = nowData == null ? void 0 : nowData.children) == null ? void 0 : _a2.length) > 0) {
          ds.push(data);
          let dy = getIndexLoop(defaultindex + 1, nowData == null ? void 0 : nowData.children);
          ds = [...ds, ...dy];
        } else {
          if ((data == null ? void 0 : data.length) > 0 && Array.isArray(data) && data) {
            ds.push(data);
          }
        }
        return ds;
      }
      _data.value = getIndexLoop(0, props.columns);
      (0, import_vue19.watch)(() => props.columns, () => {
        _data.value = getIndexLoop(0, props.columns);
      }, { deep: true });
      (0, import_vue19.watch)(() => props.modelValue, () => {
        _colIndex.value = props.modelValue;
        _data.value = getIndexLoop(0, props.columns);
      }, { deep: true });
      function pickerChange(itemindex, levelIndex) {
        return __async(this, null, function* () {
          let isActive = true;
          let toItem = _data.value[levelIndex][itemindex];
          const params = {
            from: { itemindex: _colIndex.value[levelIndex], levelIndex, data: _data.value[levelIndex][_colIndex.value[levelIndex]] },
            to: { itemindex, levelIndex, data: toItem }
          };
          _colIndex.value.splice(levelIndex, 1, itemindex);
          if (typeof props.beforeChange === "function") {
            uni.showLoading({ title: "...", mask: true });
            let p = yield props.beforeChange(params);
            if (typeof p === "function") {
              p = yield p(params);
            }
            if (!p) {
              isActive = false;
              (0, import_vue19.nextTick)(() => {
                _colIndex.value.splice(levelIndex, 1, params.from.itemindex);
              });
              uni.hideLoading();
            }
          }
          if ((toItem == null ? void 0 : toItem.disabled) == true) {
            isActive = false;
            (0, import_vue19.nextTick)(() => {
              _colIndex.value.splice(levelIndex, 1, params.from.itemindex);
            });
          }
          if (isActive) {
            _data.value = getIndexLoop(0, props.columns);
            emits("change", levelIndex, itemindex);
            emits("update:modelValue", (0, import_vue19.toRaw)(_colIndex.value));
          }
        });
      }
      (0, import_vue19.nextTick)(() => {
        emits("update:modelValue", (0, import_vue19.toRaw)(_colIndex.value));
        emits("update:modelStr", _modelStr.value || props.modelStr);
      });
      return (_ctx, _cache) => {
        return (0, import_vue19.openBlock)(), (0, import_vue19.createElementBlock)("view", {
          class: "flex flex-row",
          renderWhole: true
        }, [
          ((0, import_vue19.openBlock)(true), (0, import_vue19.createElementBlock)(import_vue19.Fragment, null, (0, import_vue19.renderList)(_data.value, (item, index) => {
            return (0, import_vue19.openBlock)(), (0, import_vue19.createBlock)(pickerPanelVue, {
              followTheme: props.followTheme,
              onEnd: _cache[0] || (_cache[0] = ($event) => emits("end")),
              onStart: _cache[1] || (_cache[1] = ($event) => emits("start")),
              dataKey: props.dataKey,
              onChange: ($event) => pickerChange($event, index),
              col: _colIndex.value[index],
              data: item,
              key: index,
              height: props.height,
              class: "flex-1"
            }, null, 8, ["followTheme", "dataKey", "onChange", "col", "data", "height"]);
          }), 128))
        ]);
      };
    }
  });
  var tmPickerView = /* @__PURE__ */ _export_sfc(_sfc_main19, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-picker-view/tm-picker-view.vue"]]);

  // F:/CoinQT/CoinQT_app/unpackage/dist/dev/.nvue/tm-city-picker.js
  var __defProp20 = Object.defineProperty;
  var __defProps19 = Object.defineProperties;
  var __getOwnPropDescs19 = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols19 = Object.getOwnPropertySymbols;
  var __hasOwnProp20 = Object.prototype.hasOwnProperty;
  var __propIsEnum19 = Object.prototype.propertyIsEnumerable;
  var __defNormalProp19 = (obj, key, value) => key in obj ? __defProp20(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues19 = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp20.call(b, prop))
        __defNormalProp19(a, prop, b[prop]);
    if (__getOwnPropSymbols19)
      for (var prop of __getOwnPropSymbols19(b)) {
        if (__propIsEnum19.call(b, prop))
          __defNormalProp19(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps19 = (a, b) => __defProps19(a, __getOwnPropDescs19(b));
  var provinceData = [{ "label": "\u5317\u4EAC\u5E02", "value": "11" }, { "label": "\u5929\u6D25\u5E02", "value": "12" }, { "label": "\u6CB3\u5317\u7701", "value": "13" }, { "label": "\u5C71\u897F\u7701", "value": "14" }, { "label": "\u5185\u8499\u53E4\u81EA\u6CBB\u533A", "value": "15" }, { "label": "\u8FBD\u5B81\u7701", "value": "21" }, { "label": "\u5409\u6797\u7701", "value": "22" }, { "label": "\u9ED1\u9F99\u6C5F\u7701", "value": "23" }, { "label": "\u4E0A\u6D77\u5E02", "value": "31" }, { "label": "\u6C5F\u82CF\u7701", "value": "32" }, { "label": "\u6D59\u6C5F\u7701", "value": "33" }, { "label": "\u5B89\u5FBD\u7701", "value": "34" }, { "label": "\u798F\u5EFA\u7701", "value": "35" }, { "label": "\u6C5F\u897F\u7701", "value": "36" }, { "label": "\u5C71\u4E1C\u7701", "value": "37" }, { "label": "\u6CB3\u5357\u7701", "value": "41" }, { "label": "\u6E56\u5317\u7701", "value": "42" }, { "label": "\u6E56\u5357\u7701", "value": "43" }, { "label": "\u5E7F\u4E1C\u7701", "value": "44" }, { "label": "\u5E7F\u897F\u58EE\u65CF\u81EA\u6CBB\u533A", "value": "45" }, { "label": "\u6D77\u5357\u7701", "value": "46" }, { "label": "\u91CD\u5E86\u5E02", "value": "50" }, { "label": "\u56DB\u5DDD\u7701", "value": "51" }, { "label": "\u8D35\u5DDE\u7701", "value": "52" }, { "label": "\u4E91\u5357\u7701", "value": "53" }, { "label": "\u897F\u85CF\u81EA\u6CBB\u533A", "value": "54" }, { "label": "\u9655\u897F\u7701", "value": "61" }, { "label": "\u7518\u8083\u7701", "value": "62" }, { "label": "\u9752\u6D77\u7701", "value": "63" }, { "label": "\u5B81\u590F\u56DE\u65CF\u81EA\u6CBB\u533A", "value": "64" }, { "label": "\u65B0\u7586\u7EF4\u543E\u5C14\u81EA\u6CBB\u533A", "value": "65" }, { "label": "\u53F0\u6E7E", "value": "66" }, { "label": "\u9999\u6E2F", "value": "67" }, { "label": "\u6FB3\u95E8", "value": "68" }];
  var cityData = [[{ "label": "\u5E02\u8F96\u533A", "value": "1101" }], [{ "label": "\u5E02\u8F96\u533A", "value": "1201" }], [{ "label": "\u77F3\u5BB6\u5E84\u5E02", "value": "1301" }, { "label": "\u5510\u5C71\u5E02", "value": "1302" }, { "label": "\u79E6\u7687\u5C9B\u5E02", "value": "1303" }, { "label": "\u90AF\u90F8\u5E02", "value": "1304" }, { "label": "\u90A2\u53F0\u5E02", "value": "1305" }, { "label": "\u4FDD\u5B9A\u5E02", "value": "1306" }, { "label": "\u5F20\u5BB6\u53E3\u5E02", "value": "1307" }, { "label": "\u627F\u5FB7\u5E02", "value": "1308" }, { "label": "\u6CA7\u5DDE\u5E02", "value": "1309" }, { "label": "\u5ECA\u574A\u5E02", "value": "1310" }, { "label": "\u8861\u6C34\u5E02", "value": "1311" }], [{ "label": "\u592A\u539F\u5E02", "value": "1401" }, { "label": "\u5927\u540C\u5E02", "value": "1402" }, { "label": "\u9633\u6CC9\u5E02", "value": "1403" }, { "label": "\u957F\u6CBB\u5E02", "value": "1404" }, { "label": "\u664B\u57CE\u5E02", "value": "1405" }, { "label": "\u6714\u5DDE\u5E02", "value": "1406" }, { "label": "\u664B\u4E2D\u5E02", "value": "1407" }, { "label": "\u8FD0\u57CE\u5E02", "value": "1408" }, { "label": "\u5FFB\u5DDE\u5E02", "value": "1409" }, { "label": "\u4E34\u6C7E\u5E02", "value": "1410" }, { "label": "\u5415\u6881\u5E02", "value": "1411" }], [{ "label": "\u547C\u548C\u6D69\u7279\u5E02", "value": "1501" }, { "label": "\u5305\u5934\u5E02", "value": "1502" }, { "label": "\u4E4C\u6D77\u5E02", "value": "1503" }, { "label": "\u8D64\u5CF0\u5E02", "value": "1504" }, { "label": "\u901A\u8FBD\u5E02", "value": "1505" }, { "label": "\u9102\u5C14\u591A\u65AF\u5E02", "value": "1506" }, { "label": "\u547C\u4F26\u8D1D\u5C14\u5E02", "value": "1507" }, { "label": "\u5DF4\u5F66\u6DD6\u5C14\u5E02", "value": "1508" }, { "label": "\u4E4C\u5170\u5BDF\u5E03\u5E02", "value": "1509" }, { "label": "\u5174\u5B89\u76DF", "value": "1522" }, { "label": "\u9521\u6797\u90ED\u52D2\u76DF", "value": "1525" }, { "label": "\u963F\u62C9\u5584\u76DF", "value": "1529" }], [{ "label": "\u6C88\u9633\u5E02", "value": "2101" }, { "label": "\u5927\u8FDE\u5E02", "value": "2102" }, { "label": "\u978D\u5C71\u5E02", "value": "2103" }, { "label": "\u629A\u987A\u5E02", "value": "2104" }, { "label": "\u672C\u6EAA\u5E02", "value": "2105" }, { "label": "\u4E39\u4E1C\u5E02", "value": "2106" }, { "label": "\u9526\u5DDE\u5E02", "value": "2107" }, { "label": "\u8425\u53E3\u5E02", "value": "2108" }, { "label": "\u961C\u65B0\u5E02", "value": "2109" }, { "label": "\u8FBD\u9633\u5E02", "value": "2110" }, { "label": "\u76D8\u9526\u5E02", "value": "2111" }, { "label": "\u94C1\u5CAD\u5E02", "value": "2112" }, { "label": "\u671D\u9633\u5E02", "value": "2113" }, { "label": "\u846B\u82A6\u5C9B\u5E02", "value": "2114" }], [{ "label": "\u957F\u6625\u5E02", "value": "2201" }, { "label": "\u5409\u6797\u5E02", "value": "2202" }, { "label": "\u56DB\u5E73\u5E02", "value": "2203" }, { "label": "\u8FBD\u6E90\u5E02", "value": "2204" }, { "label": "\u901A\u5316\u5E02", "value": "2205" }, { "label": "\u767D\u5C71\u5E02", "value": "2206" }, { "label": "\u677E\u539F\u5E02", "value": "2207" }, { "label": "\u767D\u57CE\u5E02", "value": "2208" }, { "label": "\u5EF6\u8FB9\u671D\u9C9C\u65CF\u81EA\u6CBB\u5DDE", "value": "2224" }], [{ "label": "\u54C8\u5C14\u6EE8\u5E02", "value": "2301" }, { "label": "\u9F50\u9F50\u54C8\u5C14\u5E02", "value": "2302" }, { "label": "\u9E21\u897F\u5E02", "value": "2303" }, { "label": "\u9E64\u5C97\u5E02", "value": "2304" }, { "label": "\u53CC\u9E2D\u5C71\u5E02", "value": "2305" }, { "label": "\u5927\u5E86\u5E02", "value": "2306" }, { "label": "\u4F0A\u6625\u5E02", "value": "2307" }, { "label": "\u4F73\u6728\u65AF\u5E02", "value": "2308" }, { "label": "\u4E03\u53F0\u6CB3\u5E02", "value": "2309" }, { "label": "\u7261\u4E39\u6C5F\u5E02", "value": "2310" }, { "label": "\u9ED1\u6CB3\u5E02", "value": "2311" }, { "label": "\u7EE5\u5316\u5E02", "value": "2312" }, { "label": "\u5927\u5174\u5B89\u5CAD\u5730\u533A", "value": "2327" }], [{ "label": "\u5E02\u8F96\u533A", "value": "3101" }], [{ "label": "\u5357\u4EAC\u5E02", "value": "3201" }, { "label": "\u65E0\u9521\u5E02", "value": "3202" }, { "label": "\u5F90\u5DDE\u5E02", "value": "3203" }, { "label": "\u5E38\u5DDE\u5E02", "value": "3204" }, { "label": "\u82CF\u5DDE\u5E02", "value": "3205" }, { "label": "\u5357\u901A\u5E02", "value": "3206" }, { "label": "\u8FDE\u4E91\u6E2F\u5E02", "value": "3207" }, { "label": "\u6DEE\u5B89\u5E02", "value": "3208" }, { "label": "\u76D0\u57CE\u5E02", "value": "3209" }, { "label": "\u626C\u5DDE\u5E02", "value": "3210" }, { "label": "\u9547\u6C5F\u5E02", "value": "3211" }, { "label": "\u6CF0\u5DDE\u5E02", "value": "3212" }, { "label": "\u5BBF\u8FC1\u5E02", "value": "3213" }], [{ "label": "\u676D\u5DDE\u5E02", "value": "3301" }, { "label": "\u5B81\u6CE2\u5E02", "value": "3302" }, { "label": "\u6E29\u5DDE\u5E02", "value": "3303" }, { "label": "\u5609\u5174\u5E02", "value": "3304" }, { "label": "\u6E56\u5DDE\u5E02", "value": "3305" }, { "label": "\u7ECD\u5174\u5E02", "value": "3306" }, { "label": "\u91D1\u534E\u5E02", "value": "3307" }, { "label": "\u8862\u5DDE\u5E02", "value": "3308" }, { "label": "\u821F\u5C71\u5E02", "value": "3309" }, { "label": "\u53F0\u5DDE\u5E02", "value": "3310" }, { "label": "\u4E3D\u6C34\u5E02", "value": "3311" }], [{ "label": "\u5408\u80A5\u5E02", "value": "3401" }, { "label": "\u829C\u6E56\u5E02", "value": "3402" }, { "label": "\u868C\u57E0\u5E02", "value": "3403" }, { "label": "\u6DEE\u5357\u5E02", "value": "3404" }, { "label": "\u9A6C\u978D\u5C71\u5E02", "value": "3405" }, { "label": "\u6DEE\u5317\u5E02", "value": "3406" }, { "label": "\u94DC\u9675\u5E02", "value": "3407" }, { "label": "\u5B89\u5E86\u5E02", "value": "3408" }, { "label": "\u9EC4\u5C71\u5E02", "value": "3410" }, { "label": "\u6EC1\u5DDE\u5E02", "value": "3411" }, { "label": "\u961C\u9633\u5E02", "value": "3412" }, { "label": "\u5BBF\u5DDE\u5E02", "value": "3413" }, { "label": "\u516D\u5B89\u5E02", "value": "3415" }, { "label": "\u4EB3\u5DDE\u5E02", "value": "3416" }, { "label": "\u6C60\u5DDE\u5E02", "value": "3417" }, { "label": "\u5BA3\u57CE\u5E02", "value": "3418" }], [{ "label": "\u798F\u5DDE\u5E02", "value": "3501" }, { "label": "\u53A6\u95E8\u5E02", "value": "3502" }, { "label": "\u8386\u7530\u5E02", "value": "3503" }, { "label": "\u4E09\u660E\u5E02", "value": "3504" }, { "label": "\u6CC9\u5DDE\u5E02", "value": "3505" }, { "label": "\u6F33\u5DDE\u5E02", "value": "3506" }, { "label": "\u5357\u5E73\u5E02", "value": "3507" }, { "label": "\u9F99\u5CA9\u5E02", "value": "3508" }, { "label": "\u5B81\u5FB7\u5E02", "value": "3509" }], [{ "label": "\u5357\u660C\u5E02", "value": "3601" }, { "label": "\u666F\u5FB7\u9547\u5E02", "value": "3602" }, { "label": "\u840D\u4E61\u5E02", "value": "3603" }, { "label": "\u4E5D\u6C5F\u5E02", "value": "3604" }, { "label": "\u65B0\u4F59\u5E02", "value": "3605" }, { "label": "\u9E70\u6F6D\u5E02", "value": "3606" }, { "label": "\u8D63\u5DDE\u5E02", "value": "3607" }, { "label": "\u5409\u5B89\u5E02", "value": "3608" }, { "label": "\u5B9C\u6625\u5E02", "value": "3609" }, { "label": "\u629A\u5DDE\u5E02", "value": "3610" }, { "label": "\u4E0A\u9976\u5E02", "value": "3611" }], [{ "label": "\u6D4E\u5357\u5E02", "value": "3701" }, { "label": "\u9752\u5C9B\u5E02", "value": "3702" }, { "label": "\u6DC4\u535A\u5E02", "value": "3703" }, { "label": "\u67A3\u5E84\u5E02", "value": "3704" }, { "label": "\u4E1C\u8425\u5E02", "value": "3705" }, { "label": "\u70DF\u53F0\u5E02", "value": "3706" }, { "label": "\u6F4D\u574A\u5E02", "value": "3707" }, { "label": "\u6D4E\u5B81\u5E02", "value": "3708" }, { "label": "\u6CF0\u5B89\u5E02", "value": "3709" }, { "label": "\u5A01\u6D77\u5E02", "value": "3710" }, { "label": "\u65E5\u7167\u5E02", "value": "3711" }, { "label": "\u83B1\u829C\u5E02", "value": "3712" }, { "label": "\u4E34\u6C82\u5E02", "value": "3713" }, { "label": "\u5FB7\u5DDE\u5E02", "value": "3714" }, { "label": "\u804A\u57CE\u5E02", "value": "3715" }, { "label": "\u6EE8\u5DDE\u5E02", "value": "3716" }, { "label": "\u83CF\u6CFD\u5E02", "value": "3717" }], [{ "label": "\u90D1\u5DDE\u5E02", "value": "4101" }, { "label": "\u5F00\u5C01\u5E02", "value": "4102" }, { "label": "\u6D1B\u9633\u5E02", "value": "4103" }, { "label": "\u5E73\u9876\u5C71\u5E02", "value": "4104" }, { "label": "\u5B89\u9633\u5E02", "value": "4105" }, { "label": "\u9E64\u58C1\u5E02", "value": "4106" }, { "label": "\u65B0\u4E61\u5E02", "value": "4107" }, { "label": "\u7126\u4F5C\u5E02", "value": "4108" }, { "label": "\u6FEE\u9633\u5E02", "value": "4109" }, { "label": "\u8BB8\u660C\u5E02", "value": "4110" }, { "label": "\u6F2F\u6CB3\u5E02", "value": "4111" }, { "label": "\u4E09\u95E8\u5CE1\u5E02", "value": "4112" }, { "label": "\u5357\u9633\u5E02", "value": "4113" }, { "label": "\u5546\u4E18\u5E02", "value": "4114" }, { "label": "\u4FE1\u9633\u5E02", "value": "4115" }, { "label": "\u5468\u53E3\u5E02", "value": "4116" }, { "label": "\u9A7B\u9A6C\u5E97\u5E02", "value": "4117" }, { "label": "\u7701\u76F4\u8F96\u53BF\u7EA7\u884C\u653F\u533A\u5212", "value": "4190" }], [{ "label": "\u6B66\u6C49\u5E02", "value": "4201" }, { "label": "\u9EC4\u77F3\u5E02", "value": "4202" }, { "label": "\u5341\u5830\u5E02", "value": "4203" }, { "label": "\u5B9C\u660C\u5E02", "value": "4205" }, { "label": "\u8944\u9633\u5E02", "value": "4206" }, { "label": "\u9102\u5DDE\u5E02", "value": "4207" }, { "label": "\u8346\u95E8\u5E02", "value": "4208" }, { "label": "\u5B5D\u611F\u5E02", "value": "4209" }, { "label": "\u8346\u5DDE\u5E02", "value": "4210" }, { "label": "\u9EC4\u5188\u5E02", "value": "4211" }, { "label": "\u54B8\u5B81\u5E02", "value": "4212" }, { "label": "\u968F\u5DDE\u5E02", "value": "4213" }, { "label": "\u6069\u65BD\u571F\u5BB6\u65CF\u82D7\u65CF\u81EA\u6CBB\u5DDE", "value": "4228" }, { "label": "\u7701\u76F4\u8F96\u53BF\u7EA7\u884C\u653F\u533A\u5212", "value": "4290" }], [{ "label": "\u957F\u6C99\u5E02", "value": "4301" }, { "label": "\u682A\u6D32\u5E02", "value": "4302" }, { "label": "\u6E58\u6F6D\u5E02", "value": "4303" }, { "label": "\u8861\u9633\u5E02", "value": "4304" }, { "label": "\u90B5\u9633\u5E02", "value": "4305" }, { "label": "\u5CB3\u9633\u5E02", "value": "4306" }, { "label": "\u5E38\u5FB7\u5E02", "value": "4307" }, { "label": "\u5F20\u5BB6\u754C\u5E02", "value": "4308" }, { "label": "\u76CA\u9633\u5E02", "value": "4309" }, { "label": "\u90F4\u5DDE\u5E02", "value": "4310" }, { "label": "\u6C38\u5DDE\u5E02", "value": "4311" }, { "label": "\u6000\u5316\u5E02", "value": "4312" }, { "label": "\u5A04\u5E95\u5E02", "value": "4313" }, { "label": "\u6E58\u897F\u571F\u5BB6\u65CF\u82D7\u65CF\u81EA\u6CBB\u5DDE", "value": "4331" }], [{ "label": "\u5E7F\u5DDE\u5E02", "value": "4401" }, { "label": "\u97F6\u5173\u5E02", "value": "4402" }, { "label": "\u6DF1\u5733\u5E02", "value": "4403" }, { "label": "\u73E0\u6D77\u5E02", "value": "4404" }, { "label": "\u6C55\u5934\u5E02", "value": "4405" }, { "label": "\u4F5B\u5C71\u5E02", "value": "4406" }, { "label": "\u6C5F\u95E8\u5E02", "value": "4407" }, { "label": "\u6E5B\u6C5F\u5E02", "value": "4408" }, { "label": "\u8302\u540D\u5E02", "value": "4409" }, { "label": "\u8087\u5E86\u5E02", "value": "4412" }, { "label": "\u60E0\u5DDE\u5E02", "value": "4413" }, { "label": "\u6885\u5DDE\u5E02", "value": "4414" }, { "label": "\u6C55\u5C3E\u5E02", "value": "4415" }, { "label": "\u6CB3\u6E90\u5E02", "value": "4416" }, { "label": "\u9633\u6C5F\u5E02", "value": "4417" }, { "label": "\u6E05\u8FDC\u5E02", "value": "4418" }, { "label": "\u4E1C\u839E\u5E02", "value": "4419" }, { "label": "\u4E2D\u5C71\u5E02", "value": "4420" }, { "label": "\u6F6E\u5DDE\u5E02", "value": "4451" }, { "label": "\u63ED\u9633\u5E02", "value": "4452" }, { "label": "\u4E91\u6D6E\u5E02", "value": "4453" }], [{ "label": "\u5357\u5B81\u5E02", "value": "4501" }, { "label": "\u67F3\u5DDE\u5E02", "value": "4502" }, { "label": "\u6842\u6797\u5E02", "value": "4503" }, { "label": "\u68A7\u5DDE\u5E02", "value": "4504" }, { "label": "\u5317\u6D77\u5E02", "value": "4505" }, { "label": "\u9632\u57CE\u6E2F\u5E02", "value": "4506" }, { "label": "\u94A6\u5DDE\u5E02", "value": "4507" }, { "label": "\u8D35\u6E2F\u5E02", "value": "4508" }, { "label": "\u7389\u6797\u5E02", "value": "4509" }, { "label": "\u767E\u8272\u5E02", "value": "4510" }, { "label": "\u8D3A\u5DDE\u5E02", "value": "4511" }, { "label": "\u6CB3\u6C60\u5E02", "value": "4512" }, { "label": "\u6765\u5BBE\u5E02", "value": "4513" }, { "label": "\u5D07\u5DE6\u5E02", "value": "4514" }], [{ "label": "\u6D77\u53E3\u5E02", "value": "4601" }, { "label": "\u4E09\u4E9A\u5E02", "value": "4602" }, { "label": "\u4E09\u6C99\u5E02", "value": "4603" }, { "label": "\u510B\u5DDE\u5E02", "value": "4604" }, { "label": "\u7701\u76F4\u8F96\u53BF\u7EA7\u884C\u653F\u533A\u5212", "value": "4690" }], [{ "label": "\u5E02\u8F96\u533A", "value": "5001" }, { "label": "\u53BF", "value": "5002" }], [{ "label": "\u6210\u90FD\u5E02", "value": "5101" }, { "label": "\u81EA\u8D21\u5E02", "value": "5103" }, { "label": "\u6500\u679D\u82B1\u5E02", "value": "5104" }, { "label": "\u6CF8\u5DDE\u5E02", "value": "5105" }, { "label": "\u5FB7\u9633\u5E02", "value": "5106" }, { "label": "\u7EF5\u9633\u5E02", "value": "5107" }, { "label": "\u5E7F\u5143\u5E02", "value": "5108" }, { "label": "\u9042\u5B81\u5E02", "value": "5109" }, { "label": "\u5185\u6C5F\u5E02", "value": "5110" }, { "label": "\u4E50\u5C71\u5E02", "value": "5111" }, { "label": "\u5357\u5145\u5E02", "value": "5113" }, { "label": "\u7709\u5C71\u5E02", "value": "5114" }, { "label": "\u5B9C\u5BBE\u5E02", "value": "5115" }, { "label": "\u5E7F\u5B89\u5E02", "value": "5116" }, { "label": "\u8FBE\u5DDE\u5E02", "value": "5117" }, { "label": "\u96C5\u5B89\u5E02", "value": "5118" }, { "label": "\u5DF4\u4E2D\u5E02", "value": "5119" }, { "label": "\u8D44\u9633\u5E02", "value": "5120" }, { "label": "\u963F\u575D\u85CF\u65CF\u7F8C\u65CF\u81EA\u6CBB\u5DDE", "value": "5132" }, { "label": "\u7518\u5B5C\u85CF\u65CF\u81EA\u6CBB\u5DDE", "value": "5133" }, { "label": "\u51C9\u5C71\u5F5D\u65CF\u81EA\u6CBB\u5DDE", "value": "5134" }], [{ "label": "\u8D35\u9633\u5E02", "value": "5201" }, { "label": "\u516D\u76D8\u6C34\u5E02", "value": "5202" }, { "label": "\u9075\u4E49\u5E02", "value": "5203" }, { "label": "\u5B89\u987A\u5E02", "value": "5204" }, { "label": "\u6BD5\u8282\u5E02", "value": "5205" }, { "label": "\u94DC\u4EC1\u5E02", "value": "5206" }, { "label": "\u9ED4\u897F\u5357\u5E03\u4F9D\u65CF\u82D7\u65CF\u81EA\u6CBB\u5DDE", "value": "5223" }, { "label": "\u9ED4\u4E1C\u5357\u82D7\u65CF\u4F97\u65CF\u81EA\u6CBB\u5DDE", "value": "5226" }, { "label": "\u9ED4\u5357\u5E03\u4F9D\u65CF\u82D7\u65CF\u81EA\u6CBB\u5DDE", "value": "5227" }], [{ "label": "\u6606\u660E\u5E02", "value": "5301" }, { "label": "\u66F2\u9756\u5E02", "value": "5303" }, { "label": "\u7389\u6EAA\u5E02", "value": "5304" }, { "label": "\u4FDD\u5C71\u5E02", "value": "5305" }, { "label": "\u662D\u901A\u5E02", "value": "5306" }, { "label": "\u4E3D\u6C5F\u5E02", "value": "5307" }, { "label": "\u666E\u6D31\u5E02", "value": "5308" }, { "label": "\u4E34\u6CA7\u5E02", "value": "5309" }, { "label": "\u695A\u96C4\u5F5D\u65CF\u81EA\u6CBB\u5DDE", "value": "5323" }, { "label": "\u7EA2\u6CB3\u54C8\u5C3C\u65CF\u5F5D\u65CF\u81EA\u6CBB\u5DDE", "value": "5325" }, { "label": "\u6587\u5C71\u58EE\u65CF\u82D7\u65CF\u81EA\u6CBB\u5DDE", "value": "5326" }, { "label": "\u897F\u53CC\u7248\u7EB3\u50A3\u65CF\u81EA\u6CBB\u5DDE", "value": "5328" }, { "label": "\u5927\u7406\u767D\u65CF\u81EA\u6CBB\u5DDE", "value": "5329" }, { "label": "\u5FB7\u5B8F\u50A3\u65CF\u666F\u9887\u65CF\u81EA\u6CBB\u5DDE", "value": "5331" }, { "label": "\u6012\u6C5F\u5088\u50F3\u65CF\u81EA\u6CBB\u5DDE", "value": "5333" }, { "label": "\u8FEA\u5E86\u85CF\u65CF\u81EA\u6CBB\u5DDE", "value": "5334" }], [{ "label": "\u62C9\u8428\u5E02", "value": "5401" }, { "label": "\u65E5\u5580\u5219\u5E02", "value": "5402" }, { "label": "\u660C\u90FD\u5E02", "value": "5403" }, { "label": "\u6797\u829D\u5E02", "value": "5404" }, { "label": "\u5C71\u5357\u5E02", "value": "5405" }, { "label": "\u90A3\u66F2\u5730\u533A", "value": "5424" }, { "label": "\u963F\u91CC\u5730\u533A", "value": "5425" }], [{ "label": "\u897F\u5B89\u5E02", "value": "6101" }, { "label": "\u94DC\u5DDD\u5E02", "value": "6102" }, { "label": "\u5B9D\u9E21\u5E02", "value": "6103" }, { "label": "\u54B8\u9633\u5E02", "value": "6104" }, { "label": "\u6E2D\u5357\u5E02", "value": "6105" }, { "label": "\u5EF6\u5B89\u5E02", "value": "6106" }, { "label": "\u6C49\u4E2D\u5E02", "value": "6107" }, { "label": "\u6986\u6797\u5E02", "value": "6108" }, { "label": "\u5B89\u5EB7\u5E02", "value": "6109" }, { "label": "\u5546\u6D1B\u5E02", "value": "6110" }], [{ "label": "\u5170\u5DDE\u5E02", "value": "6201" }, { "label": "\u5609\u5CEA\u5173\u5E02", "value": "6202" }, { "label": "\u91D1\u660C\u5E02", "value": "6203" }, { "label": "\u767D\u94F6\u5E02", "value": "6204" }, { "label": "\u5929\u6C34\u5E02", "value": "6205" }, { "label": "\u6B66\u5A01\u5E02", "value": "6206" }, { "label": "\u5F20\u6396\u5E02", "value": "6207" }, { "label": "\u5E73\u51C9\u5E02", "value": "6208" }, { "label": "\u9152\u6CC9\u5E02", "value": "6209" }, { "label": "\u5E86\u9633\u5E02", "value": "6210" }, { "label": "\u5B9A\u897F\u5E02", "value": "6211" }, { "label": "\u9647\u5357\u5E02", "value": "6212" }, { "label": "\u4E34\u590F\u56DE\u65CF\u81EA\u6CBB\u5DDE", "value": "6229" }, { "label": "\u7518\u5357\u85CF\u65CF\u81EA\u6CBB\u5DDE", "value": "6230" }], [{ "label": "\u897F\u5B81\u5E02", "value": "6301" }, { "label": "\u6D77\u4E1C\u5E02", "value": "6302" }, { "label": "\u6D77\u5317\u85CF\u65CF\u81EA\u6CBB\u5DDE", "value": "6322" }, { "label": "\u9EC4\u5357\u85CF\u65CF\u81EA\u6CBB\u5DDE", "value": "6323" }, { "label": "\u6D77\u5357\u85CF\u65CF\u81EA\u6CBB\u5DDE", "value": "6325" }, { "label": "\u679C\u6D1B\u85CF\u65CF\u81EA\u6CBB\u5DDE", "value": "6326" }, { "label": "\u7389\u6811\u85CF\u65CF\u81EA\u6CBB\u5DDE", "value": "6327" }, { "label": "\u6D77\u897F\u8499\u53E4\u65CF\u85CF\u65CF\u81EA\u6CBB\u5DDE", "value": "6328" }], [{ "label": "\u94F6\u5DDD\u5E02", "value": "6401" }, { "label": "\u77F3\u5634\u5C71\u5E02", "value": "6402" }, { "label": "\u5434\u5FE0\u5E02", "value": "6403" }, { "label": "\u56FA\u539F\u5E02", "value": "6404" }, { "label": "\u4E2D\u536B\u5E02", "value": "6405" }], [{ "label": "\u4E4C\u9C81\u6728\u9F50\u5E02", "value": "6501" }, { "label": "\u514B\u62C9\u739B\u4F9D\u5E02", "value": "6502" }, { "label": "\u5410\u9C81\u756A\u5E02", "value": "6504" }, { "label": "\u54C8\u5BC6\u5E02", "value": "6505" }, { "label": "\u660C\u5409\u56DE\u65CF\u81EA\u6CBB\u5DDE", "value": "6523" }, { "label": "\u535A\u5C14\u5854\u62C9\u8499\u53E4\u81EA\u6CBB\u5DDE", "value": "6527" }, { "label": "\u5DF4\u97F3\u90ED\u695E\u8499\u53E4\u81EA\u6CBB\u5DDE", "value": "6528" }, { "label": "\u963F\u514B\u82CF\u5730\u533A", "value": "6529" }, { "label": "\u514B\u5B5C\u52D2\u82CF\u67EF\u5C14\u514B\u5B5C\u81EA\u6CBB\u5DDE", "value": "6530" }, { "label": "\u5580\u4EC0\u5730\u533A", "value": "6531" }, { "label": "\u548C\u7530\u5730\u533A", "value": "6532" }, { "label": "\u4F0A\u7281\u54C8\u8428\u514B\u81EA\u6CBB\u5DDE", "value": "6540" }, { "label": "\u5854\u57CE\u5730\u533A", "value": "6542" }, { "label": "\u963F\u52D2\u6CF0\u5730\u533A", "value": "6543" }, { "label": "\u81EA\u6CBB\u533A\u76F4\u8F96\u53BF\u7EA7\u884C\u653F\u533A\u5212", "value": "6590" }], [{ "label": "\u53F0\u5317", "value": "6601" }, { "label": "\u9AD8\u96C4", "value": "6602" }, { "label": "\u57FA\u9686", "value": "6603" }, { "label": "\u53F0\u4E2D", "value": "6604" }, { "label": "\u53F0\u5357", "value": "6605" }, { "label": "\u65B0\u7AF9", "value": "6606" }, { "label": "\u5609\u4E49", "value": "6607" }, { "label": "\u5B9C\u5170", "value": "6608" }, { "label": "\u6843\u56ED", "value": "6609" }, { "label": "\u82D7\u6817", "value": "6610" }, { "label": "\u5F70\u5316", "value": "6611" }, { "label": "\u5357\u6295", "value": "6612" }, { "label": "\u4E91\u6797", "value": "6613" }, { "label": "\u5C4F\u4E1C", "value": "6614" }, { "label": "\u53F0\u4E1C", "value": "6615" }, { "label": "\u82B1\u83B2", "value": "6616" }, { "label": "\u6F8E\u6E56", "value": "6617" }], [{ "label": "\u9999\u6E2F\u5C9B", "value": "6701" }, { "label": "\u4E5D\u9F99", "value": "6702" }, { "label": "\u65B0\u754C", "value": "6703" }], [{ "label": "\u6FB3\u95E8\u534A\u5C9B", "value": "6801" }, { "label": "\u6C39\u4ED4\u5C9B", "value": "6802" }, { "label": "\u8DEF\u73AF\u5C9B", "value": "6803" }, { "label": "\u8DEF\u6C39\u57CE", "value": "6804" }]];
  var areaData = [[[{ "label": "\u4E1C\u57CE\u533A", "value": "110101" }, { "label": "\u897F\u57CE\u533A", "value": "110102" }, { "label": "\u671D\u9633\u533A", "value": "110105" }, { "label": "\u4E30\u53F0\u533A", "value": "110106" }, { "label": "\u77F3\u666F\u5C71\u533A", "value": "110107" }, { "label": "\u6D77\u6DC0\u533A", "value": "110108" }, { "label": "\u95E8\u5934\u6C9F\u533A", "value": "110109" }, { "label": "\u623F\u5C71\u533A", "value": "110111" }, { "label": "\u901A\u5DDE\u533A", "value": "110112" }, { "label": "\u987A\u4E49\u533A", "value": "110113" }, { "label": "\u660C\u5E73\u533A", "value": "110114" }, { "label": "\u5927\u5174\u533A", "value": "110115" }, { "label": "\u6000\u67D4\u533A", "value": "110116" }, { "label": "\u5E73\u8C37\u533A", "value": "110117" }, { "label": "\u5BC6\u4E91\u533A", "value": "110118" }, { "label": "\u5EF6\u5E86\u533A", "value": "110119" }]], [[{ "label": "\u548C\u5E73\u533A", "value": "120101" }, { "label": "\u6CB3\u4E1C\u533A", "value": "120102" }, { "label": "\u6CB3\u897F\u533A", "value": "120103" }, { "label": "\u5357\u5F00\u533A", "value": "120104" }, { "label": "\u6CB3\u5317\u533A", "value": "120105" }, { "label": "\u7EA2\u6865\u533A", "value": "120106" }, { "label": "\u4E1C\u4E3D\u533A", "value": "120110" }, { "label": "\u897F\u9752\u533A", "value": "120111" }, { "label": "\u6D25\u5357\u533A", "value": "120112" }, { "label": "\u5317\u8FB0\u533A", "value": "120113" }, { "label": "\u6B66\u6E05\u533A", "value": "120114" }, { "label": "\u5B9D\u577B\u533A", "value": "120115" }, { "label": "\u6EE8\u6D77\u65B0\u533A", "value": "120116" }, { "label": "\u5B81\u6CB3\u533A", "value": "120117" }, { "label": "\u9759\u6D77\u533A", "value": "120118" }, { "label": "\u84DF\u5DDE\u533A", "value": "120119" }]], [[{ "label": "\u957F\u5B89\u533A", "value": "130102" }, { "label": "\u6865\u897F\u533A", "value": "130104" }, { "label": "\u65B0\u534E\u533A", "value": "130105" }, { "label": "\u4E95\u9649\u77FF\u533A", "value": "130107" }, { "label": "\u88D5\u534E\u533A", "value": "130108" }, { "label": "\u85C1\u57CE\u533A", "value": "130109" }, { "label": "\u9E7F\u6CC9\u533A", "value": "130110" }, { "label": "\u683E\u57CE\u533A", "value": "130111" }, { "label": "\u4E95\u9649\u53BF", "value": "130121" }, { "label": "\u6B63\u5B9A\u53BF", "value": "130123" }, { "label": "\u884C\u5510\u53BF", "value": "130125" }, { "label": "\u7075\u5BFF\u53BF", "value": "130126" }, { "label": "\u9AD8\u9091\u53BF", "value": "130127" }, { "label": "\u6DF1\u6CFD\u53BF", "value": "130128" }, { "label": "\u8D5E\u7687\u53BF", "value": "130129" }, { "label": "\u65E0\u6781\u53BF", "value": "130130" }, { "label": "\u5E73\u5C71\u53BF", "value": "130131" }, { "label": "\u5143\u6C0F\u53BF", "value": "130132" }, { "label": "\u8D75\u53BF", "value": "130133" }, { "label": "\u77F3\u5BB6\u5E84\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u5F00\u53D1\u533A", "value": "130171" }, { "label": "\u77F3\u5BB6\u5E84\u5FAA\u73AF\u5316\u5DE5\u56ED\u533A", "value": "130172" }, { "label": "\u8F9B\u96C6\u5E02", "value": "130181" }, { "label": "\u664B\u5DDE\u5E02", "value": "130183" }, { "label": "\u65B0\u4E50\u5E02", "value": "130184" }], [{ "label": "\u8DEF\u5357\u533A", "value": "130202" }, { "label": "\u8DEF\u5317\u533A", "value": "130203" }, { "label": "\u53E4\u51B6\u533A", "value": "130204" }, { "label": "\u5F00\u5E73\u533A", "value": "130205" }, { "label": "\u4E30\u5357\u533A", "value": "130207" }, { "label": "\u4E30\u6DA6\u533A", "value": "130208" }, { "label": "\u66F9\u5983\u7538\u533A", "value": "130209" }, { "label": "\u6EE6\u53BF", "value": "130223" }, { "label": "\u6EE6\u5357\u53BF", "value": "130224" }, { "label": "\u4E50\u4EAD\u53BF", "value": "130225" }, { "label": "\u8FC1\u897F\u53BF", "value": "130227" }, { "label": "\u7389\u7530\u53BF", "value": "130229" }, { "label": "\u5510\u5C71\u5E02\u82A6\u53F0\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A", "value": "130271" }, { "label": "\u5510\u5C71\u5E02\u6C49\u6CBD\u7BA1\u7406\u533A", "value": "130272" }, { "label": "\u5510\u5C71\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u5F00\u53D1\u533A", "value": "130273" }, { "label": "\u6CB3\u5317\u5510\u5C71\u6D77\u6E2F\u7ECF\u6D4E\u5F00\u53D1\u533A", "value": "130274" }, { "label": "\u9075\u5316\u5E02", "value": "130281" }, { "label": "\u8FC1\u5B89\u5E02", "value": "130283" }], [{ "label": "\u6D77\u6E2F\u533A", "value": "130302" }, { "label": "\u5C71\u6D77\u5173\u533A", "value": "130303" }, { "label": "\u5317\u6234\u6CB3\u533A", "value": "130304" }, { "label": "\u629A\u5B81\u533A", "value": "130306" }, { "label": "\u9752\u9F99\u6EE1\u65CF\u81EA\u6CBB\u53BF", "value": "130321" }, { "label": "\u660C\u9ECE\u53BF", "value": "130322" }, { "label": "\u5362\u9F99\u53BF", "value": "130324" }, { "label": "\u79E6\u7687\u5C9B\u5E02\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A", "value": "130371" }, { "label": "\u5317\u6234\u6CB3\u65B0\u533A", "value": "130372" }], [{ "label": "\u90AF\u5C71\u533A", "value": "130402" }, { "label": "\u4E1B\u53F0\u533A", "value": "130403" }, { "label": "\u590D\u5174\u533A", "value": "130404" }, { "label": "\u5CF0\u5CF0\u77FF\u533A", "value": "130406" }, { "label": "\u80A5\u4E61\u533A", "value": "130407" }, { "label": "\u6C38\u5E74\u533A", "value": "130408" }, { "label": "\u4E34\u6F33\u53BF", "value": "130423" }, { "label": "\u6210\u5B89\u53BF", "value": "130424" }, { "label": "\u5927\u540D\u53BF", "value": "130425" }, { "label": "\u6D89\u53BF", "value": "130426" }, { "label": "\u78C1\u53BF", "value": "130427" }, { "label": "\u90B1\u53BF", "value": "130430" }, { "label": "\u9E21\u6CFD\u53BF", "value": "130431" }, { "label": "\u5E7F\u5E73\u53BF", "value": "130432" }, { "label": "\u9986\u9676\u53BF", "value": "130433" }, { "label": "\u9B4F\u53BF", "value": "130434" }, { "label": "\u66F2\u5468\u53BF", "value": "130435" }, { "label": "\u90AF\u90F8\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A", "value": "130471" }, { "label": "\u90AF\u90F8\u5180\u5357\u65B0\u533A", "value": "130473" }, { "label": "\u6B66\u5B89\u5E02", "value": "130481" }], [{ "label": "\u6865\u4E1C\u533A", "value": "130502" }, { "label": "\u6865\u897F\u533A", "value": "130503" }, { "label": "\u90A2\u53F0\u53BF", "value": "130521" }, { "label": "\u4E34\u57CE\u53BF", "value": "130522" }, { "label": "\u5185\u4E18\u53BF", "value": "130523" }, { "label": "\u67CF\u4E61\u53BF", "value": "130524" }, { "label": "\u9686\u5C27\u53BF", "value": "130525" }, { "label": "\u4EFB\u53BF", "value": "130526" }, { "label": "\u5357\u548C\u53BF", "value": "130527" }, { "label": "\u5B81\u664B\u53BF", "value": "130528" }, { "label": "\u5DE8\u9E7F\u53BF", "value": "130529" }, { "label": "\u65B0\u6CB3\u53BF", "value": "130530" }, { "label": "\u5E7F\u5B97\u53BF", "value": "130531" }, { "label": "\u5E73\u4E61\u53BF", "value": "130532" }, { "label": "\u5A01\u53BF", "value": "130533" }, { "label": "\u6E05\u6CB3\u53BF", "value": "130534" }, { "label": "\u4E34\u897F\u53BF", "value": "130535" }, { "label": "\u6CB3\u5317\u90A2\u53F0\u7ECF\u6D4E\u5F00\u53D1\u533A", "value": "130571" }, { "label": "\u5357\u5BAB\u5E02", "value": "130581" }, { "label": "\u6C99\u6CB3\u5E02", "value": "130582" }], [{ "label": "\u7ADE\u79C0\u533A", "value": "130602" }, { "label": "\u83B2\u6C60\u533A", "value": "130606" }, { "label": "\u6EE1\u57CE\u533A", "value": "130607" }, { "label": "\u6E05\u82D1\u533A", "value": "130608" }, { "label": "\u5F90\u6C34\u533A", "value": "130609" }, { "label": "\u6D9E\u6C34\u53BF", "value": "130623" }, { "label": "\u961C\u5E73\u53BF", "value": "130624" }, { "label": "\u5B9A\u5174\u53BF", "value": "130626" }, { "label": "\u5510\u53BF", "value": "130627" }, { "label": "\u9AD8\u9633\u53BF", "value": "130628" }, { "label": "\u5BB9\u57CE\u53BF", "value": "130629" }, { "label": "\u6D9E\u6E90\u53BF", "value": "130630" }, { "label": "\u671B\u90FD\u53BF", "value": "130631" }, { "label": "\u5B89\u65B0\u53BF", "value": "130632" }, { "label": "\u6613\u53BF", "value": "130633" }, { "label": "\u66F2\u9633\u53BF", "value": "130634" }, { "label": "\u8821\u53BF", "value": "130635" }, { "label": "\u987A\u5E73\u53BF", "value": "130636" }, { "label": "\u535A\u91CE\u53BF", "value": "130637" }, { "label": "\u96C4\u53BF", "value": "130638" }, { "label": "\u4FDD\u5B9A\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u5F00\u53D1\u533A", "value": "130671" }, { "label": "\u4FDD\u5B9A\u767D\u6C9F\u65B0\u57CE", "value": "130672" }, { "label": "\u6DBF\u5DDE\u5E02", "value": "130681" }, { "label": "\u5B9A\u5DDE\u5E02", "value": "130682" }, { "label": "\u5B89\u56FD\u5E02", "value": "130683" }, { "label": "\u9AD8\u7891\u5E97\u5E02", "value": "130684" }], [{ "label": "\u6865\u4E1C\u533A", "value": "130702" }, { "label": "\u6865\u897F\u533A", "value": "130703" }, { "label": "\u5BA3\u5316\u533A", "value": "130705" }, { "label": "\u4E0B\u82B1\u56ED\u533A", "value": "130706" }, { "label": "\u4E07\u5168\u533A", "value": "130708" }, { "label": "\u5D07\u793C\u533A", "value": "130709" }, { "label": "\u5F20\u5317\u53BF", "value": "130722" }, { "label": "\u5EB7\u4FDD\u53BF", "value": "130723" }, { "label": "\u6CBD\u6E90\u53BF", "value": "130724" }, { "label": "\u5C1A\u4E49\u53BF", "value": "130725" }, { "label": "\u851A\u53BF", "value": "130726" }, { "label": "\u9633\u539F\u53BF", "value": "130727" }, { "label": "\u6000\u5B89\u53BF", "value": "130728" }, { "label": "\u6000\u6765\u53BF", "value": "130730" }, { "label": "\u6DBF\u9E7F\u53BF", "value": "130731" }, { "label": "\u8D64\u57CE\u53BF", "value": "130732" }, { "label": "\u5F20\u5BB6\u53E3\u5E02\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u5F00\u53D1\u533A", "value": "130771" }, { "label": "\u5F20\u5BB6\u53E3\u5E02\u5BDF\u5317\u7BA1\u7406\u533A", "value": "130772" }, { "label": "\u5F20\u5BB6\u53E3\u5E02\u585E\u5317\u7BA1\u7406\u533A", "value": "130773" }], [{ "label": "\u53CC\u6865\u533A", "value": "130802" }, { "label": "\u53CC\u6EE6\u533A", "value": "130803" }, { "label": "\u9E70\u624B\u8425\u5B50\u77FF\u533A", "value": "130804" }, { "label": "\u627F\u5FB7\u53BF", "value": "130821" }, { "label": "\u5174\u9686\u53BF", "value": "130822" }, { "label": "\u6EE6\u5E73\u53BF", "value": "130824" }, { "label": "\u9686\u5316\u53BF", "value": "130825" }, { "label": "\u4E30\u5B81\u6EE1\u65CF\u81EA\u6CBB\u53BF", "value": "130826" }, { "label": "\u5BBD\u57CE\u6EE1\u65CF\u81EA\u6CBB\u53BF", "value": "130827" }, { "label": "\u56F4\u573A\u6EE1\u65CF\u8499\u53E4\u65CF\u81EA\u6CBB\u53BF", "value": "130828" }, { "label": "\u627F\u5FB7\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u5F00\u53D1\u533A", "value": "130871" }, { "label": "\u5E73\u6CC9\u5E02", "value": "130881" }], [{ "label": "\u65B0\u534E\u533A", "value": "130902" }, { "label": "\u8FD0\u6CB3\u533A", "value": "130903" }, { "label": "\u6CA7\u53BF", "value": "130921" }, { "label": "\u9752\u53BF", "value": "130922" }, { "label": "\u4E1C\u5149\u53BF", "value": "130923" }, { "label": "\u6D77\u5174\u53BF", "value": "130924" }, { "label": "\u76D0\u5C71\u53BF", "value": "130925" }, { "label": "\u8083\u5B81\u53BF", "value": "130926" }, { "label": "\u5357\u76AE\u53BF", "value": "130927" }, { "label": "\u5434\u6865\u53BF", "value": "130928" }, { "label": "\u732E\u53BF", "value": "130929" }, { "label": "\u5B5F\u6751\u56DE\u65CF\u81EA\u6CBB\u53BF", "value": "130930" }, { "label": "\u6CB3\u5317\u6CA7\u5DDE\u7ECF\u6D4E\u5F00\u53D1\u533A", "value": "130971" }, { "label": "\u6CA7\u5DDE\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u5F00\u53D1\u533A", "value": "130972" }, { "label": "\u6CA7\u5DDE\u6E24\u6D77\u65B0\u533A", "value": "130973" }, { "label": "\u6CCA\u5934\u5E02", "value": "130981" }, { "label": "\u4EFB\u4E18\u5E02", "value": "130982" }, { "label": "\u9EC4\u9A85\u5E02", "value": "130983" }, { "label": "\u6CB3\u95F4\u5E02", "value": "130984" }], [{ "label": "\u5B89\u6B21\u533A", "value": "131002" }, { "label": "\u5E7F\u9633\u533A", "value": "131003" }, { "label": "\u56FA\u5B89\u53BF", "value": "131022" }, { "label": "\u6C38\u6E05\u53BF", "value": "131023" }, { "label": "\u9999\u6CB3\u53BF", "value": "131024" }, { "label": "\u5927\u57CE\u53BF", "value": "131025" }, { "label": "\u6587\u5B89\u53BF", "value": "131026" }, { "label": "\u5927\u5382\u56DE\u65CF\u81EA\u6CBB\u53BF", "value": "131028" }, { "label": "\u5ECA\u574A\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A", "value": "131071" }, { "label": "\u9738\u5DDE\u5E02", "value": "131081" }, { "label": "\u4E09\u6CB3\u5E02", "value": "131082" }], [{ "label": "\u6843\u57CE\u533A", "value": "131102" }, { "label": "\u5180\u5DDE\u533A", "value": "131103" }, { "label": "\u67A3\u5F3A\u53BF", "value": "131121" }, { "label": "\u6B66\u9091\u53BF", "value": "131122" }, { "label": "\u6B66\u5F3A\u53BF", "value": "131123" }, { "label": "\u9976\u9633\u53BF", "value": "131124" }, { "label": "\u5B89\u5E73\u53BF", "value": "131125" }, { "label": "\u6545\u57CE\u53BF", "value": "131126" }, { "label": "\u666F\u53BF", "value": "131127" }, { "label": "\u961C\u57CE\u53BF", "value": "131128" }, { "label": "\u6CB3\u5317\u8861\u6C34\u7ECF\u6D4E\u5F00\u53D1\u533A", "value": "131171" }, { "label": "\u8861\u6C34\u6EE8\u6E56\u65B0\u533A", "value": "131172" }, { "label": "\u6DF1\u5DDE\u5E02", "value": "131182" }]], [[{ "label": "\u5C0F\u5E97\u533A", "value": "140105" }, { "label": "\u8FCE\u6CFD\u533A", "value": "140106" }, { "label": "\u674F\u82B1\u5CAD\u533A", "value": "140107" }, { "label": "\u5C16\u8349\u576A\u533A", "value": "140108" }, { "label": "\u4E07\u67CF\u6797\u533A", "value": "140109" }, { "label": "\u664B\u6E90\u533A", "value": "140110" }, { "label": "\u6E05\u5F90\u53BF", "value": "140121" }, { "label": "\u9633\u66F2\u53BF", "value": "140122" }, { "label": "\u5A04\u70E6\u53BF", "value": "140123" }, { "label": "\u5C71\u897F\u8F6C\u578B\u7EFC\u5408\u6539\u9769\u793A\u8303\u533A", "value": "140171" }, { "label": "\u53E4\u4EA4\u5E02", "value": "140181" }], [{ "label": "\u57CE\u533A", "value": "140202" }, { "label": "\u77FF\u533A", "value": "140203" }, { "label": "\u5357\u90CA\u533A", "value": "140211" }, { "label": "\u65B0\u8363\u533A", "value": "140212" }, { "label": "\u9633\u9AD8\u53BF", "value": "140221" }, { "label": "\u5929\u9547\u53BF", "value": "140222" }, { "label": "\u5E7F\u7075\u53BF", "value": "140223" }, { "label": "\u7075\u4E18\u53BF", "value": "140224" }, { "label": "\u6D51\u6E90\u53BF", "value": "140225" }, { "label": "\u5DE6\u4E91\u53BF", "value": "140226" }, { "label": "\u5927\u540C\u53BF", "value": "140227" }, { "label": "\u5C71\u897F\u5927\u540C\u7ECF\u6D4E\u5F00\u53D1\u533A", "value": "140271" }], [{ "label": "\u57CE\u533A", "value": "140302" }, { "label": "\u77FF\u533A", "value": "140303" }, { "label": "\u90CA\u533A", "value": "140311" }, { "label": "\u5E73\u5B9A\u53BF", "value": "140321" }, { "label": "\u76C2\u53BF", "value": "140322" }, { "label": "\u5C71\u897F\u9633\u6CC9\u7ECF\u6D4E\u5F00\u53D1\u533A", "value": "140371" }], [{ "label": "\u57CE\u533A", "value": "140402" }, { "label": "\u90CA\u533A", "value": "140411" }, { "label": "\u957F\u6CBB\u53BF", "value": "140421" }, { "label": "\u8944\u57A3\u53BF", "value": "140423" }, { "label": "\u5C6F\u7559\u53BF", "value": "140424" }, { "label": "\u5E73\u987A\u53BF", "value": "140425" }, { "label": "\u9ECE\u57CE\u53BF", "value": "140426" }, { "label": "\u58F6\u5173\u53BF", "value": "140427" }, { "label": "\u957F\u5B50\u53BF", "value": "140428" }, { "label": "\u6B66\u4E61\u53BF", "value": "140429" }, { "label": "\u6C81\u53BF", "value": "140430" }, { "label": "\u6C81\u6E90\u53BF", "value": "140431" }, { "label": "\u5C71\u897F\u957F\u6CBB\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u56ED\u533A", "value": "140471" }, { "label": "\u6F5E\u57CE\u5E02", "value": "140481" }], [{ "label": "\u57CE\u533A", "value": "140502" }, { "label": "\u6C81\u6C34\u53BF", "value": "140521" }, { "label": "\u9633\u57CE\u53BF", "value": "140522" }, { "label": "\u9675\u5DDD\u53BF", "value": "140524" }, { "label": "\u6CFD\u5DDE\u53BF", "value": "140525" }, { "label": "\u9AD8\u5E73\u5E02", "value": "140581" }], [{ "label": "\u6714\u57CE\u533A", "value": "140602" }, { "label": "\u5E73\u9C81\u533A", "value": "140603" }, { "label": "\u5C71\u9634\u53BF", "value": "140621" }, { "label": "\u5E94\u53BF", "value": "140622" }, { "label": "\u53F3\u7389\u53BF", "value": "140623" }, { "label": "\u6000\u4EC1\u53BF", "value": "140624" }, { "label": "\u5C71\u897F\u6714\u5DDE\u7ECF\u6D4E\u5F00\u53D1\u533A", "value": "140671" }], [{ "label": "\u6986\u6B21\u533A", "value": "140702" }, { "label": "\u6986\u793E\u53BF", "value": "140721" }, { "label": "\u5DE6\u6743\u53BF", "value": "140722" }, { "label": "\u548C\u987A\u53BF", "value": "140723" }, { "label": "\u6614\u9633\u53BF", "value": "140724" }, { "label": "\u5BFF\u9633\u53BF", "value": "140725" }, { "label": "\u592A\u8C37\u53BF", "value": "140726" }, { "label": "\u7941\u53BF", "value": "140727" }, { "label": "\u5E73\u9065\u53BF", "value": "140728" }, { "label": "\u7075\u77F3\u53BF", "value": "140729" }, { "label": "\u4ECB\u4F11\u5E02", "value": "140781" }], [{ "label": "\u76D0\u6E56\u533A", "value": "140802" }, { "label": "\u4E34\u7317\u53BF", "value": "140821" }, { "label": "\u4E07\u8363\u53BF", "value": "140822" }, { "label": "\u95FB\u559C\u53BF", "value": "140823" }, { "label": "\u7A37\u5C71\u53BF", "value": "140824" }, { "label": "\u65B0\u7EDB\u53BF", "value": "140825" }, { "label": "\u7EDB\u53BF", "value": "140826" }, { "label": "\u57A3\u66F2\u53BF", "value": "140827" }, { "label": "\u590F\u53BF", "value": "140828" }, { "label": "\u5E73\u9646\u53BF", "value": "140829" }, { "label": "\u82AE\u57CE\u53BF", "value": "140830" }, { "label": "\u6C38\u6D4E\u5E02", "value": "140881" }, { "label": "\u6CB3\u6D25\u5E02", "value": "140882" }], [{ "label": "\u5FFB\u5E9C\u533A", "value": "140902" }, { "label": "\u5B9A\u8944\u53BF", "value": "140921" }, { "label": "\u4E94\u53F0\u53BF", "value": "140922" }, { "label": "\u4EE3\u53BF", "value": "140923" }, { "label": "\u7E41\u5CD9\u53BF", "value": "140924" }, { "label": "\u5B81\u6B66\u53BF", "value": "140925" }, { "label": "\u9759\u4E50\u53BF", "value": "140926" }, { "label": "\u795E\u6C60\u53BF", "value": "140927" }, { "label": "\u4E94\u5BE8\u53BF", "value": "140928" }, { "label": "\u5CA2\u5C9A\u53BF", "value": "140929" }, { "label": "\u6CB3\u66F2\u53BF", "value": "140930" }, { "label": "\u4FDD\u5FB7\u53BF", "value": "140931" }, { "label": "\u504F\u5173\u53BF", "value": "140932" }, { "label": "\u4E94\u53F0\u5C71\u98CE\u666F\u540D\u80DC\u533A", "value": "140971" }, { "label": "\u539F\u5E73\u5E02", "value": "140981" }], [{ "label": "\u5C27\u90FD\u533A", "value": "141002" }, { "label": "\u66F2\u6C83\u53BF", "value": "141021" }, { "label": "\u7FFC\u57CE\u53BF", "value": "141022" }, { "label": "\u8944\u6C7E\u53BF", "value": "141023" }, { "label": "\u6D2A\u6D1E\u53BF", "value": "141024" }, { "label": "\u53E4\u53BF", "value": "141025" }, { "label": "\u5B89\u6CFD\u53BF", "value": "141026" }, { "label": "\u6D6E\u5C71\u53BF", "value": "141027" }, { "label": "\u5409\u53BF", "value": "141028" }, { "label": "\u4E61\u5B81\u53BF", "value": "141029" }, { "label": "\u5927\u5B81\u53BF", "value": "141030" }, { "label": "\u96B0\u53BF", "value": "141031" }, { "label": "\u6C38\u548C\u53BF", "value": "141032" }, { "label": "\u84B2\u53BF", "value": "141033" }, { "label": "\u6C7E\u897F\u53BF", "value": "141034" }, { "label": "\u4FAF\u9A6C\u5E02", "value": "141081" }, { "label": "\u970D\u5DDE\u5E02", "value": "141082" }], [{ "label": "\u79BB\u77F3\u533A", "value": "141102" }, { "label": "\u6587\u6C34\u53BF", "value": "141121" }, { "label": "\u4EA4\u57CE\u53BF", "value": "141122" }, { "label": "\u5174\u53BF", "value": "141123" }, { "label": "\u4E34\u53BF", "value": "141124" }, { "label": "\u67F3\u6797\u53BF", "value": "141125" }, { "label": "\u77F3\u697C\u53BF", "value": "141126" }, { "label": "\u5C9A\u53BF", "value": "141127" }, { "label": "\u65B9\u5C71\u53BF", "value": "141128" }, { "label": "\u4E2D\u9633\u53BF", "value": "141129" }, { "label": "\u4EA4\u53E3\u53BF", "value": "141130" }, { "label": "\u5B5D\u4E49\u5E02", "value": "141181" }, { "label": "\u6C7E\u9633\u5E02", "value": "141182" }]], [[{ "label": "\u65B0\u57CE\u533A", "value": "150102" }, { "label": "\u56DE\u6C11\u533A", "value": "150103" }, { "label": "\u7389\u6CC9\u533A", "value": "150104" }, { "label": "\u8D5B\u7F55\u533A", "value": "150105" }, { "label": "\u571F\u9ED8\u7279\u5DE6\u65D7", "value": "150121" }, { "label": "\u6258\u514B\u6258\u53BF", "value": "150122" }, { "label": "\u548C\u6797\u683C\u5C14\u53BF", "value": "150123" }, { "label": "\u6E05\u6C34\u6CB3\u53BF", "value": "150124" }, { "label": "\u6B66\u5DDD\u53BF", "value": "150125" }, { "label": "\u547C\u548C\u6D69\u7279\u91D1\u6D77\u5DE5\u4E1A\u56ED\u533A", "value": "150171" }, { "label": "\u547C\u548C\u6D69\u7279\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A", "value": "150172" }], [{ "label": "\u4E1C\u6CB3\u533A", "value": "150202" }, { "label": "\u6606\u90FD\u4ED1\u533A", "value": "150203" }, { "label": "\u9752\u5C71\u533A", "value": "150204" }, { "label": "\u77F3\u62D0\u533A", "value": "150205" }, { "label": "\u767D\u4E91\u9102\u535A\u77FF\u533A", "value": "150206" }, { "label": "\u4E5D\u539F\u533A", "value": "150207" }, { "label": "\u571F\u9ED8\u7279\u53F3\u65D7", "value": "150221" }, { "label": "\u56FA\u9633\u53BF", "value": "150222" }, { "label": "\u8FBE\u5C14\u7F55\u8302\u660E\u5B89\u8054\u5408\u65D7", "value": "150223" }, { "label": "\u5305\u5934\u7A00\u571F\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u5F00\u53D1\u533A", "value": "150271" }], [{ "label": "\u6D77\u52C3\u6E7E\u533A", "value": "150302" }, { "label": "\u6D77\u5357\u533A", "value": "150303" }, { "label": "\u4E4C\u8FBE\u533A", "value": "150304" }], [{ "label": "\u7EA2\u5C71\u533A", "value": "150402" }, { "label": "\u5143\u5B9D\u5C71\u533A", "value": "150403" }, { "label": "\u677E\u5C71\u533A", "value": "150404" }, { "label": "\u963F\u9C81\u79D1\u5C14\u6C81\u65D7", "value": "150421" }, { "label": "\u5DF4\u6797\u5DE6\u65D7", "value": "150422" }, { "label": "\u5DF4\u6797\u53F3\u65D7", "value": "150423" }, { "label": "\u6797\u897F\u53BF", "value": "150424" }, { "label": "\u514B\u4EC0\u514B\u817E\u65D7", "value": "150425" }, { "label": "\u7FC1\u725B\u7279\u65D7", "value": "150426" }, { "label": "\u5580\u5587\u6C81\u65D7", "value": "150428" }, { "label": "\u5B81\u57CE\u53BF", "value": "150429" }, { "label": "\u6556\u6C49\u65D7", "value": "150430" }], [{ "label": "\u79D1\u5C14\u6C81\u533A", "value": "150502" }, { "label": "\u79D1\u5C14\u6C81\u5DE6\u7FFC\u4E2D\u65D7", "value": "150521" }, { "label": "\u79D1\u5C14\u6C81\u5DE6\u7FFC\u540E\u65D7", "value": "150522" }, { "label": "\u5F00\u9C81\u53BF", "value": "150523" }, { "label": "\u5E93\u4F26\u65D7", "value": "150524" }, { "label": "\u5948\u66FC\u65D7", "value": "150525" }, { "label": "\u624E\u9C81\u7279\u65D7", "value": "150526" }, { "label": "\u901A\u8FBD\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A", "value": "150571" }, { "label": "\u970D\u6797\u90ED\u52D2\u5E02", "value": "150581" }], [{ "label": "\u4E1C\u80DC\u533A", "value": "150602" }, { "label": "\u5EB7\u5DF4\u4EC0\u533A", "value": "150603" }, { "label": "\u8FBE\u62C9\u7279\u65D7", "value": "150621" }, { "label": "\u51C6\u683C\u5C14\u65D7", "value": "150622" }, { "label": "\u9102\u6258\u514B\u524D\u65D7", "value": "150623" }, { "label": "\u9102\u6258\u514B\u65D7", "value": "150624" }, { "label": "\u676D\u9526\u65D7", "value": "150625" }, { "label": "\u4E4C\u5BA1\u65D7", "value": "150626" }, { "label": "\u4F0A\u91D1\u970D\u6D1B\u65D7", "value": "150627" }], [{ "label": "\u6D77\u62C9\u5C14\u533A", "value": "150702" }, { "label": "\u624E\u8D49\u8BFA\u5C14\u533A", "value": "150703" }, { "label": "\u963F\u8363\u65D7", "value": "150721" }, { "label": "\u83AB\u529B\u8FBE\u74E6\u8FBE\u65A1\u5C14\u65CF\u81EA\u6CBB\u65D7", "value": "150722" }, { "label": "\u9102\u4F26\u6625\u81EA\u6CBB\u65D7", "value": "150723" }, { "label": "\u9102\u6E29\u514B\u65CF\u81EA\u6CBB\u65D7", "value": "150724" }, { "label": "\u9648\u5DF4\u5C14\u864E\u65D7", "value": "150725" }, { "label": "\u65B0\u5DF4\u5C14\u864E\u5DE6\u65D7", "value": "150726" }, { "label": "\u65B0\u5DF4\u5C14\u864E\u53F3\u65D7", "value": "150727" }, { "label": "\u6EE1\u6D32\u91CC\u5E02", "value": "150781" }, { "label": "\u7259\u514B\u77F3\u5E02", "value": "150782" }, { "label": "\u624E\u5170\u5C6F\u5E02", "value": "150783" }, { "label": "\u989D\u5C14\u53E4\u7EB3\u5E02", "value": "150784" }, { "label": "\u6839\u6CB3\u5E02", "value": "150785" }], [{ "label": "\u4E34\u6CB3\u533A", "value": "150802" }, { "label": "\u4E94\u539F\u53BF", "value": "150821" }, { "label": "\u78F4\u53E3\u53BF", "value": "150822" }, { "label": "\u4E4C\u62C9\u7279\u524D\u65D7", "value": "150823" }, { "label": "\u4E4C\u62C9\u7279\u4E2D\u65D7", "value": "150824" }, { "label": "\u4E4C\u62C9\u7279\u540E\u65D7", "value": "150825" }, { "label": "\u676D\u9526\u540E\u65D7", "value": "150826" }], [{ "label": "\u96C6\u5B81\u533A", "value": "150902" }, { "label": "\u5353\u8D44\u53BF", "value": "150921" }, { "label": "\u5316\u5FB7\u53BF", "value": "150922" }, { "label": "\u5546\u90FD\u53BF", "value": "150923" }, { "label": "\u5174\u548C\u53BF", "value": "150924" }, { "label": "\u51C9\u57CE\u53BF", "value": "150925" }, { "label": "\u5BDF\u54C8\u5C14\u53F3\u7FFC\u524D\u65D7", "value": "150926" }, { "label": "\u5BDF\u54C8\u5C14\u53F3\u7FFC\u4E2D\u65D7", "value": "150927" }, { "label": "\u5BDF\u54C8\u5C14\u53F3\u7FFC\u540E\u65D7", "value": "150928" }, { "label": "\u56DB\u5B50\u738B\u65D7", "value": "150929" }, { "label": "\u4E30\u9547\u5E02", "value": "150981" }], [{ "label": "\u4E4C\u5170\u6D69\u7279\u5E02", "value": "152201" }, { "label": "\u963F\u5C14\u5C71\u5E02", "value": "152202" }, { "label": "\u79D1\u5C14\u6C81\u53F3\u7FFC\u524D\u65D7", "value": "152221" }, { "label": "\u79D1\u5C14\u6C81\u53F3\u7FFC\u4E2D\u65D7", "value": "152222" }, { "label": "\u624E\u8D49\u7279\u65D7", "value": "152223" }, { "label": "\u7A81\u6CC9\u53BF", "value": "152224" }], [{ "label": "\u4E8C\u8FDE\u6D69\u7279\u5E02", "value": "152501" }, { "label": "\u9521\u6797\u6D69\u7279\u5E02", "value": "152502" }, { "label": "\u963F\u5DF4\u560E\u65D7", "value": "152522" }, { "label": "\u82CF\u5C3C\u7279\u5DE6\u65D7", "value": "152523" }, { "label": "\u82CF\u5C3C\u7279\u53F3\u65D7", "value": "152524" }, { "label": "\u4E1C\u4E4C\u73E0\u7A46\u6C81\u65D7", "value": "152525" }, { "label": "\u897F\u4E4C\u73E0\u7A46\u6C81\u65D7", "value": "152526" }, { "label": "\u592A\u4EC6\u5BFA\u65D7", "value": "152527" }, { "label": "\u9576\u9EC4\u65D7", "value": "152528" }, { "label": "\u6B63\u9576\u767D\u65D7", "value": "152529" }, { "label": "\u6B63\u84DD\u65D7", "value": "152530" }, { "label": "\u591A\u4F26\u53BF", "value": "152531" }, { "label": "\u4E4C\u62C9\u76D6\u7BA1\u59D4\u4F1A", "value": "152571" }], [{ "label": "\u963F\u62C9\u5584\u5DE6\u65D7", "value": "152921" }, { "label": "\u963F\u62C9\u5584\u53F3\u65D7", "value": "152922" }, { "label": "\u989D\u6D4E\u7EB3\u65D7", "value": "152923" }, { "label": "\u5185\u8499\u53E4\u963F\u62C9\u5584\u7ECF\u6D4E\u5F00\u53D1\u533A", "value": "152971" }]], [[{ "label": "\u548C\u5E73\u533A", "value": "210102" }, { "label": "\u6C88\u6CB3\u533A", "value": "210103" }, { "label": "\u5927\u4E1C\u533A", "value": "210104" }, { "label": "\u7687\u59D1\u533A", "value": "210105" }, { "label": "\u94C1\u897F\u533A", "value": "210106" }, { "label": "\u82CF\u5BB6\u5C6F\u533A", "value": "210111" }, { "label": "\u6D51\u5357\u533A", "value": "210112" }, { "label": "\u6C88\u5317\u65B0\u533A", "value": "210113" }, { "label": "\u4E8E\u6D2A\u533A", "value": "210114" }, { "label": "\u8FBD\u4E2D\u533A", "value": "210115" }, { "label": "\u5EB7\u5E73\u53BF", "value": "210123" }, { "label": "\u6CD5\u5E93\u53BF", "value": "210124" }, { "label": "\u65B0\u6C11\u5E02", "value": "210181" }], [{ "label": "\u4E2D\u5C71\u533A", "value": "210202" }, { "label": "\u897F\u5C97\u533A", "value": "210203" }, { "label": "\u6C99\u6CB3\u53E3\u533A", "value": "210204" }, { "label": "\u7518\u4E95\u5B50\u533A", "value": "210211" }, { "label": "\u65C5\u987A\u53E3\u533A", "value": "210212" }, { "label": "\u91D1\u5DDE\u533A", "value": "210213" }, { "label": "\u666E\u5170\u5E97\u533A", "value": "210214" }, { "label": "\u957F\u6D77\u53BF", "value": "210224" }, { "label": "\u74E6\u623F\u5E97\u5E02", "value": "210281" }, { "label": "\u5E84\u6CB3\u5E02", "value": "210283" }], [{ "label": "\u94C1\u4E1C\u533A", "value": "210302" }, { "label": "\u94C1\u897F\u533A", "value": "210303" }, { "label": "\u7ACB\u5C71\u533A", "value": "210304" }, { "label": "\u5343\u5C71\u533A", "value": "210311" }, { "label": "\u53F0\u5B89\u53BF", "value": "210321" }, { "label": "\u5CAB\u5CA9\u6EE1\u65CF\u81EA\u6CBB\u53BF", "value": "210323" }, { "label": "\u6D77\u57CE\u5E02", "value": "210381" }], [{ "label": "\u65B0\u629A\u533A", "value": "210402" }, { "label": "\u4E1C\u6D32\u533A", "value": "210403" }, { "label": "\u671B\u82B1\u533A", "value": "210404" }, { "label": "\u987A\u57CE\u533A", "value": "210411" }, { "label": "\u629A\u987A\u53BF", "value": "210421" }, { "label": "\u65B0\u5BBE\u6EE1\u65CF\u81EA\u6CBB\u53BF", "value": "210422" }, { "label": "\u6E05\u539F\u6EE1\u65CF\u81EA\u6CBB\u53BF", "value": "210423" }], [{ "label": "\u5E73\u5C71\u533A", "value": "210502" }, { "label": "\u6EAA\u6E56\u533A", "value": "210503" }, { "label": "\u660E\u5C71\u533A", "value": "210504" }, { "label": "\u5357\u82AC\u533A", "value": "210505" }, { "label": "\u672C\u6EAA\u6EE1\u65CF\u81EA\u6CBB\u53BF", "value": "210521" }, { "label": "\u6853\u4EC1\u6EE1\u65CF\u81EA\u6CBB\u53BF", "value": "210522" }], [{ "label": "\u5143\u5B9D\u533A", "value": "210602" }, { "label": "\u632F\u5174\u533A", "value": "210603" }, { "label": "\u632F\u5B89\u533A", "value": "210604" }, { "label": "\u5BBD\u7538\u6EE1\u65CF\u81EA\u6CBB\u53BF", "value": "210624" }, { "label": "\u4E1C\u6E2F\u5E02", "value": "210681" }, { "label": "\u51E4\u57CE\u5E02", "value": "210682" }], [{ "label": "\u53E4\u5854\u533A", "value": "210702" }, { "label": "\u51CC\u6CB3\u533A", "value": "210703" }, { "label": "\u592A\u548C\u533A", "value": "210711" }, { "label": "\u9ED1\u5C71\u53BF", "value": "210726" }, { "label": "\u4E49\u53BF", "value": "210727" }, { "label": "\u51CC\u6D77\u5E02", "value": "210781" }, { "label": "\u5317\u9547\u5E02", "value": "210782" }], [{ "label": "\u7AD9\u524D\u533A", "value": "210802" }, { "label": "\u897F\u5E02\u533A", "value": "210803" }, { "label": "\u9C85\u9C7C\u5708\u533A", "value": "210804" }, { "label": "\u8001\u8FB9\u533A", "value": "210811" }, { "label": "\u76D6\u5DDE\u5E02", "value": "210881" }, { "label": "\u5927\u77F3\u6865\u5E02", "value": "210882" }], [{ "label": "\u6D77\u5DDE\u533A", "value": "210902" }, { "label": "\u65B0\u90B1\u533A", "value": "210903" }, { "label": "\u592A\u5E73\u533A", "value": "210904" }, { "label": "\u6E05\u6CB3\u95E8\u533A", "value": "210905" }, { "label": "\u7EC6\u6CB3\u533A", "value": "210911" }, { "label": "\u961C\u65B0\u8499\u53E4\u65CF\u81EA\u6CBB\u53BF", "value": "210921" }, { "label": "\u5F70\u6B66\u53BF", "value": "210922" }], [{ "label": "\u767D\u5854\u533A", "value": "211002" }, { "label": "\u6587\u5723\u533A", "value": "211003" }, { "label": "\u5B8F\u4F1F\u533A", "value": "211004" }, { "label": "\u5F13\u957F\u5CAD\u533A", "value": "211005" }, { "label": "\u592A\u5B50\u6CB3\u533A", "value": "211011" }, { "label": "\u8FBD\u9633\u53BF", "value": "211021" }, { "label": "\u706F\u5854\u5E02", "value": "211081" }], [{ "label": "\u53CC\u53F0\u5B50\u533A", "value": "211102" }, { "label": "\u5174\u9686\u53F0\u533A", "value": "211103" }, { "label": "\u5927\u6D3C\u533A", "value": "211104" }, { "label": "\u76D8\u5C71\u53BF", "value": "211122" }], [{ "label": "\u94F6\u5DDE\u533A", "value": "211202" }, { "label": "\u6E05\u6CB3\u533A", "value": "211204" }, { "label": "\u94C1\u5CAD\u53BF", "value": "211221" }, { "label": "\u897F\u4E30\u53BF", "value": "211223" }, { "label": "\u660C\u56FE\u53BF", "value": "211224" }, { "label": "\u8C03\u5175\u5C71\u5E02", "value": "211281" }, { "label": "\u5F00\u539F\u5E02", "value": "211282" }], [{ "label": "\u53CC\u5854\u533A", "value": "211302" }, { "label": "\u9F99\u57CE\u533A", "value": "211303" }, { "label": "\u671D\u9633\u53BF", "value": "211321" }, { "label": "\u5EFA\u5E73\u53BF", "value": "211322" }, { "label": "\u5580\u5587\u6C81\u5DE6\u7FFC\u8499\u53E4\u65CF\u81EA\u6CBB\u53BF", "value": "211324" }, { "label": "\u5317\u7968\u5E02", "value": "211381" }, { "label": "\u51CC\u6E90\u5E02", "value": "211382" }], [{ "label": "\u8FDE\u5C71\u533A", "value": "211402" }, { "label": "\u9F99\u6E2F\u533A", "value": "211403" }, { "label": "\u5357\u7968\u533A", "value": "211404" }, { "label": "\u7EE5\u4E2D\u53BF", "value": "211421" }, { "label": "\u5EFA\u660C\u53BF", "value": "211422" }, { "label": "\u5174\u57CE\u5E02", "value": "211481" }]], [[{ "label": "\u5357\u5173\u533A", "value": "220102" }, { "label": "\u5BBD\u57CE\u533A", "value": "220103" }, { "label": "\u671D\u9633\u533A", "value": "220104" }, { "label": "\u4E8C\u9053\u533A", "value": "220105" }, { "label": "\u7EFF\u56ED\u533A", "value": "220106" }, { "label": "\u53CC\u9633\u533A", "value": "220112" }, { "label": "\u4E5D\u53F0\u533A", "value": "220113" }, { "label": "\u519C\u5B89\u53BF", "value": "220122" }, { "label": "\u957F\u6625\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A", "value": "220171" }, { "label": "\u957F\u6625\u51C0\u6708\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u5F00\u53D1\u533A", "value": "220172" }, { "label": "\u957F\u6625\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u5F00\u53D1\u533A", "value": "220173" }, { "label": "\u957F\u6625\u6C7D\u8F66\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A", "value": "220174" }, { "label": "\u6986\u6811\u5E02", "value": "220182" }, { "label": "\u5FB7\u60E0\u5E02", "value": "220183" }], [{ "label": "\u660C\u9091\u533A", "value": "220202" }, { "label": "\u9F99\u6F6D\u533A", "value": "220203" }, { "label": "\u8239\u8425\u533A", "value": "220204" }, { "label": "\u4E30\u6EE1\u533A", "value": "220211" }, { "label": "\u6C38\u5409\u53BF", "value": "220221" }, { "label": "\u5409\u6797\u7ECF\u6D4E\u5F00\u53D1\u533A", "value": "220271" }, { "label": "\u5409\u6797\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u5F00\u53D1\u533A", "value": "220272" }, { "label": "\u5409\u6797\u4E2D\u56FD\u65B0\u52A0\u5761\u98DF\u54C1\u533A", "value": "220273" }, { "label": "\u86DF\u6CB3\u5E02", "value": "220281" }, { "label": "\u6866\u7538\u5E02", "value": "220282" }, { "label": "\u8212\u5170\u5E02", "value": "220283" }, { "label": "\u78D0\u77F3\u5E02", "value": "220284" }], [{ "label": "\u94C1\u897F\u533A", "value": "220302" }, { "label": "\u94C1\u4E1C\u533A", "value": "220303" }, { "label": "\u68A8\u6811\u53BF", "value": "220322" }, { "label": "\u4F0A\u901A\u6EE1\u65CF\u81EA\u6CBB\u53BF", "value": "220323" }, { "label": "\u516C\u4E3B\u5CAD\u5E02", "value": "220381" }, { "label": "\u53CC\u8FBD\u5E02", "value": "220382" }], [{ "label": "\u9F99\u5C71\u533A", "value": "220402" }, { "label": "\u897F\u5B89\u533A", "value": "220403" }, { "label": "\u4E1C\u4E30\u53BF", "value": "220421" }, { "label": "\u4E1C\u8FBD\u53BF", "value": "220422" }], [{ "label": "\u4E1C\u660C\u533A", "value": "220502" }, { "label": "\u4E8C\u9053\u6C5F\u533A", "value": "220503" }, { "label": "\u901A\u5316\u53BF", "value": "220521" }, { "label": "\u8F89\u5357\u53BF", "value": "220523" }, { "label": "\u67F3\u6CB3\u53BF", "value": "220524" }, { "label": "\u6885\u6CB3\u53E3\u5E02", "value": "220581" }, { "label": "\u96C6\u5B89\u5E02", "value": "220582" }], [{ "label": "\u6D51\u6C5F\u533A", "value": "220602" }, { "label": "\u6C5F\u6E90\u533A", "value": "220605" }, { "label": "\u629A\u677E\u53BF", "value": "220621" }, { "label": "\u9756\u5B87\u53BF", "value": "220622" }, { "label": "\u957F\u767D\u671D\u9C9C\u65CF\u81EA\u6CBB\u53BF", "value": "220623" }, { "label": "\u4E34\u6C5F\u5E02", "value": "220681" }], [{ "label": "\u5B81\u6C5F\u533A", "value": "220702" }, { "label": "\u524D\u90ED\u5C14\u7F57\u65AF\u8499\u53E4\u65CF\u81EA\u6CBB\u53BF", "value": "220721" }, { "label": "\u957F\u5CAD\u53BF", "value": "220722" }, { "label": "\u4E7E\u5B89\u53BF", "value": "220723" }, { "label": "\u5409\u6797\u677E\u539F\u7ECF\u6D4E\u5F00\u53D1\u533A", "value": "220771" }, { "label": "\u6276\u4F59\u5E02", "value": "220781" }], [{ "label": "\u6D2E\u5317\u533A", "value": "220802" }, { "label": "\u9547\u8D49\u53BF", "value": "220821" }, { "label": "\u901A\u6986\u53BF", "value": "220822" }, { "label": "\u5409\u6797\u767D\u57CE\u7ECF\u6D4E\u5F00\u53D1\u533A", "value": "220871" }, { "label": "\u6D2E\u5357\u5E02", "value": "220881" }, { "label": "\u5927\u5B89\u5E02", "value": "220882" }], [{ "label": "\u5EF6\u5409\u5E02", "value": "222401" }, { "label": "\u56FE\u4EEC\u5E02", "value": "222402" }, { "label": "\u6566\u5316\u5E02", "value": "222403" }, { "label": "\u73F2\u6625\u5E02", "value": "222404" }, { "label": "\u9F99\u4E95\u5E02", "value": "222405" }, { "label": "\u548C\u9F99\u5E02", "value": "222406" }, { "label": "\u6C6A\u6E05\u53BF", "value": "222424" }, { "label": "\u5B89\u56FE\u53BF", "value": "222426" }]], [[{ "label": "\u9053\u91CC\u533A", "value": "230102" }, { "label": "\u5357\u5C97\u533A", "value": "230103" }, { "label": "\u9053\u5916\u533A", "value": "230104" }, { "label": "\u5E73\u623F\u533A", "value": "230108" }, { "label": "\u677E\u5317\u533A", "value": "230109" }, { "label": "\u9999\u574A\u533A", "value": "230110" }, { "label": "\u547C\u5170\u533A", "value": "230111" }, { "label": "\u963F\u57CE\u533A", "value": "230112" }, { "label": "\u53CC\u57CE\u533A", "value": "230113" }, { "label": "\u4F9D\u5170\u53BF", "value": "230123" }, { "label": "\u65B9\u6B63\u53BF", "value": "230124" }, { "label": "\u5BBE\u53BF", "value": "230125" }, { "label": "\u5DF4\u5F66\u53BF", "value": "230126" }, { "label": "\u6728\u5170\u53BF", "value": "230127" }, { "label": "\u901A\u6CB3\u53BF", "value": "230128" }, { "label": "\u5EF6\u5BFF\u53BF", "value": "230129" }, { "label": "\u5C1A\u5FD7\u5E02", "value": "230183" }, { "label": "\u4E94\u5E38\u5E02", "value": "230184" }], [{ "label": "\u9F99\u6C99\u533A", "value": "230202" }, { "label": "\u5EFA\u534E\u533A", "value": "230203" }, { "label": "\u94C1\u950B\u533A", "value": "230204" }, { "label": "\u6602\u6602\u6EAA\u533A", "value": "230205" }, { "label": "\u5BCC\u62C9\u5C14\u57FA\u533A", "value": "230206" }, { "label": "\u78BE\u5B50\u5C71\u533A", "value": "230207" }, { "label": "\u6885\u91CC\u65AF\u8FBE\u65A1\u5C14\u65CF\u533A", "value": "230208" }, { "label": "\u9F99\u6C5F\u53BF", "value": "230221" }, { "label": "\u4F9D\u5B89\u53BF", "value": "230223" }, { "label": "\u6CF0\u6765\u53BF", "value": "230224" }, { "label": "\u7518\u5357\u53BF", "value": "230225" }, { "label": "\u5BCC\u88D5\u53BF", "value": "230227" }, { "label": "\u514B\u5C71\u53BF", "value": "230229" }, { "label": "\u514B\u4E1C\u53BF", "value": "230230" }, { "label": "\u62DC\u6CC9\u53BF", "value": "230231" }, { "label": "\u8BB7\u6CB3\u5E02", "value": "230281" }], [{ "label": "\u9E21\u51A0\u533A", "value": "230302" }, { "label": "\u6052\u5C71\u533A", "value": "230303" }, { "label": "\u6EF4\u9053\u533A", "value": "230304" }, { "label": "\u68A8\u6811\u533A", "value": "230305" }, { "label": "\u57CE\u5B50\u6CB3\u533A", "value": "230306" }, { "label": "\u9EBB\u5C71\u533A", "value": "230307" }, { "label": "\u9E21\u4E1C\u53BF", "value": "230321" }, { "label": "\u864E\u6797\u5E02", "value": "230381" }, { "label": "\u5BC6\u5C71\u5E02", "value": "230382" }], [{ "label": "\u5411\u9633\u533A", "value": "230402" }, { "label": "\u5DE5\u519C\u533A", "value": "230403" }, { "label": "\u5357\u5C71\u533A", "value": "230404" }, { "label": "\u5174\u5B89\u533A", "value": "230405" }, { "label": "\u4E1C\u5C71\u533A", "value": "230406" }, { "label": "\u5174\u5C71\u533A", "value": "230407" }, { "label": "\u841D\u5317\u53BF", "value": "230421" }, { "label": "\u7EE5\u6EE8\u53BF", "value": "230422" }], [{ "label": "\u5C16\u5C71\u533A", "value": "230502" }, { "label": "\u5CAD\u4E1C\u533A", "value": "230503" }, { "label": "\u56DB\u65B9\u53F0\u533A", "value": "230505" }, { "label": "\u5B9D\u5C71\u533A", "value": "230506" }, { "label": "\u96C6\u8D24\u53BF", "value": "230521" }, { "label": "\u53CB\u8C0A\u53BF", "value": "230522" }, { "label": "\u5B9D\u6E05\u53BF", "value": "230523" }, { "label": "\u9976\u6CB3\u53BF", "value": "230524" }], [{ "label": "\u8428\u5C14\u56FE\u533A", "value": "230602" }, { "label": "\u9F99\u51E4\u533A", "value": "230603" }, { "label": "\u8BA9\u80E1\u8DEF\u533A", "value": "230604" }, { "label": "\u7EA2\u5C97\u533A", "value": "230605" }, { "label": "\u5927\u540C\u533A", "value": "230606" }, { "label": "\u8087\u5DDE\u53BF", "value": "230621" }, { "label": "\u8087\u6E90\u53BF", "value": "230622" }, { "label": "\u6797\u7538\u53BF", "value": "230623" }, { "label": "\u675C\u5C14\u4F2F\u7279\u8499\u53E4\u65CF\u81EA\u6CBB\u53BF", "value": "230624" }, { "label": "\u5927\u5E86\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u5F00\u53D1\u533A", "value": "230671" }], [{ "label": "\u4F0A\u6625\u533A", "value": "230702" }, { "label": "\u5357\u5C94\u533A", "value": "230703" }, { "label": "\u53CB\u597D\u533A", "value": "230704" }, { "label": "\u897F\u6797\u533A", "value": "230705" }, { "label": "\u7FE0\u5CE6\u533A", "value": "230706" }, { "label": "\u65B0\u9752\u533A", "value": "230707" }, { "label": "\u7F8E\u6EAA\u533A", "value": "230708" }, { "label": "\u91D1\u5C71\u5C6F\u533A", "value": "230709" }, { "label": "\u4E94\u8425\u533A", "value": "230710" }, { "label": "\u4E4C\u9A6C\u6CB3\u533A", "value": "230711" }, { "label": "\u6C64\u65FA\u6CB3\u533A", "value": "230712" }, { "label": "\u5E26\u5CAD\u533A", "value": "230713" }, { "label": "\u4E4C\u4F0A\u5CAD\u533A", "value": "230714" }, { "label": "\u7EA2\u661F\u533A", "value": "230715" }, { "label": "\u4E0A\u7518\u5CAD\u533A", "value": "230716" }, { "label": "\u5609\u836B\u53BF", "value": "230722" }, { "label": "\u94C1\u529B\u5E02", "value": "230781" }], [{ "label": "\u5411\u9633\u533A", "value": "230803" }, { "label": "\u524D\u8FDB\u533A", "value": "230804" }, { "label": "\u4E1C\u98CE\u533A", "value": "230805" }, { "label": "\u90CA\u533A", "value": "230811" }, { "label": "\u6866\u5357\u53BF", "value": "230822" }, { "label": "\u6866\u5DDD\u53BF", "value": "230826" }, { "label": "\u6C64\u539F\u53BF", "value": "230828" }, { "label": "\u540C\u6C5F\u5E02", "value": "230881" }, { "label": "\u5BCC\u9526\u5E02", "value": "230882" }, { "label": "\u629A\u8FDC\u5E02", "value": "230883" }], [{ "label": "\u65B0\u5174\u533A", "value": "230902" }, { "label": "\u6843\u5C71\u533A", "value": "230903" }, { "label": "\u8304\u5B50\u6CB3\u533A", "value": "230904" }, { "label": "\u52C3\u5229\u53BF", "value": "230921" }], [{ "label": "\u4E1C\u5B89\u533A", "value": "231002" }, { "label": "\u9633\u660E\u533A", "value": "231003" }, { "label": "\u7231\u6C11\u533A", "value": "231004" }, { "label": "\u897F\u5B89\u533A", "value": "231005" }, { "label": "\u6797\u53E3\u53BF", "value": "231025" }, { "label": "\u7261\u4E39\u6C5F\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A", "value": "231071" }, { "label": "\u7EE5\u82AC\u6CB3\u5E02", "value": "231081" }, { "label": "\u6D77\u6797\u5E02", "value": "231083" }, { "label": "\u5B81\u5B89\u5E02", "value": "231084" }, { "label": "\u7A46\u68F1\u5E02", "value": "231085" }, { "label": "\u4E1C\u5B81\u5E02", "value": "231086" }], [{ "label": "\u7231\u8F89\u533A", "value": "231102" }, { "label": "\u5AE9\u6C5F\u53BF", "value": "231121" }, { "label": "\u900A\u514B\u53BF", "value": "231123" }, { "label": "\u5B59\u5434\u53BF", "value": "231124" }, { "label": "\u5317\u5B89\u5E02", "value": "231181" }, { "label": "\u4E94\u5927\u8FDE\u6C60\u5E02", "value": "231182" }], [{ "label": "\u5317\u6797\u533A", "value": "231202" }, { "label": "\u671B\u594E\u53BF", "value": "231221" }, { "label": "\u5170\u897F\u53BF", "value": "231222" }, { "label": "\u9752\u5188\u53BF", "value": "231223" }, { "label": "\u5E86\u5B89\u53BF", "value": "231224" }, { "label": "\u660E\u6C34\u53BF", "value": "231225" }, { "label": "\u7EE5\u68F1\u53BF", "value": "231226" }, { "label": "\u5B89\u8FBE\u5E02", "value": "231281" }, { "label": "\u8087\u4E1C\u5E02", "value": "231282" }, { "label": "\u6D77\u4F26\u5E02", "value": "231283" }], [{ "label": "\u52A0\u683C\u8FBE\u5947\u533A", "value": "232701" }, { "label": "\u677E\u5CAD\u533A", "value": "232702" }, { "label": "\u65B0\u6797\u533A", "value": "232703" }, { "label": "\u547C\u4E2D\u533A", "value": "232704" }, { "label": "\u547C\u739B\u53BF", "value": "232721" }, { "label": "\u5854\u6CB3\u53BF", "value": "232722" }, { "label": "\u6F20\u6CB3\u53BF", "value": "232723" }]], [[{ "label": "\u9EC4\u6D66\u533A", "value": "310101" }, { "label": "\u5F90\u6C47\u533A", "value": "310104" }, { "label": "\u957F\u5B81\u533A", "value": "310105" }, { "label": "\u9759\u5B89\u533A", "value": "310106" }, { "label": "\u666E\u9640\u533A", "value": "310107" }, { "label": "\u8679\u53E3\u533A", "value": "310109" }, { "label": "\u6768\u6D66\u533A", "value": "310110" }, { "label": "\u95F5\u884C\u533A", "value": "310112" }, { "label": "\u5B9D\u5C71\u533A", "value": "310113" }, { "label": "\u5609\u5B9A\u533A", "value": "310114" }, { "label": "\u6D66\u4E1C\u65B0\u533A", "value": "310115" }, { "label": "\u91D1\u5C71\u533A", "value": "310116" }, { "label": "\u677E\u6C5F\u533A", "value": "310117" }, { "label": "\u9752\u6D66\u533A", "value": "310118" }, { "label": "\u5949\u8D24\u533A", "value": "310120" }, { "label": "\u5D07\u660E\u533A", "value": "310151" }]], [[{ "label": "\u7384\u6B66\u533A", "value": "320102" }, { "label": "\u79E6\u6DEE\u533A", "value": "320104" }, { "label": "\u5EFA\u90BA\u533A", "value": "320105" }, { "label": "\u9F13\u697C\u533A", "value": "320106" }, { "label": "\u6D66\u53E3\u533A", "value": "320111" }, { "label": "\u6816\u971E\u533A", "value": "320113" }, { "label": "\u96E8\u82B1\u53F0\u533A", "value": "320114" }, { "label": "\u6C5F\u5B81\u533A", "value": "320115" }, { "label": "\u516D\u5408\u533A", "value": "320116" }, { "label": "\u6EA7\u6C34\u533A", "value": "320117" }, { "label": "\u9AD8\u6DF3\u533A", "value": "320118" }], [{ "label": "\u9521\u5C71\u533A", "value": "320205" }, { "label": "\u60E0\u5C71\u533A", "value": "320206" }, { "label": "\u6EE8\u6E56\u533A", "value": "320211" }, { "label": "\u6881\u6EAA\u533A", "value": "320213" }, { "label": "\u65B0\u5434\u533A", "value": "320214" }, { "label": "\u6C5F\u9634\u5E02", "value": "320281" }, { "label": "\u5B9C\u5174\u5E02", "value": "320282" }], [{ "label": "\u9F13\u697C\u533A", "value": "320302" }, { "label": "\u4E91\u9F99\u533A", "value": "320303" }, { "label": "\u8D3E\u6C6A\u533A", "value": "320305" }, { "label": "\u6CC9\u5C71\u533A", "value": "320311" }, { "label": "\u94DC\u5C71\u533A", "value": "320312" }, { "label": "\u4E30\u53BF", "value": "320321" }, { "label": "\u6C9B\u53BF", "value": "320322" }, { "label": "\u7762\u5B81\u53BF", "value": "320324" }, { "label": "\u5F90\u5DDE\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A", "value": "320371" }, { "label": "\u65B0\u6C82\u5E02", "value": "320381" }, { "label": "\u90B3\u5DDE\u5E02", "value": "320382" }], [{ "label": "\u5929\u5B81\u533A", "value": "320402" }, { "label": "\u949F\u697C\u533A", "value": "320404" }, { "label": "\u65B0\u5317\u533A", "value": "320411" }, { "label": "\u6B66\u8FDB\u533A", "value": "320412" }, { "label": "\u91D1\u575B\u533A", "value": "320413" }, { "label": "\u6EA7\u9633\u5E02", "value": "320481" }], [{ "label": "\u864E\u4E18\u533A", "value": "320505" }, { "label": "\u5434\u4E2D\u533A", "value": "320506" }, { "label": "\u76F8\u57CE\u533A", "value": "320507" }, { "label": "\u59D1\u82CF\u533A", "value": "320508" }, { "label": "\u5434\u6C5F\u533A", "value": "320509" }, { "label": "\u82CF\u5DDE\u5DE5\u4E1A\u56ED\u533A", "value": "320571" }, { "label": "\u5E38\u719F\u5E02", "value": "320581" }, { "label": "\u5F20\u5BB6\u6E2F\u5E02", "value": "320582" }, { "label": "\u6606\u5C71\u5E02", "value": "320583" }, { "label": "\u592A\u4ED3\u5E02", "value": "320585" }], [{ "label": "\u5D07\u5DDD\u533A", "value": "320602" }, { "label": "\u6E2F\u95F8\u533A", "value": "320611" }, { "label": "\u901A\u5DDE\u533A", "value": "320612" }, { "label": "\u6D77\u5B89\u53BF", "value": "320621" }, { "label": "\u5982\u4E1C\u53BF", "value": "320623" }, { "label": "\u5357\u901A\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A", "value": "320671" }, { "label": "\u542F\u4E1C\u5E02", "value": "320681" }, { "label": "\u5982\u768B\u5E02", "value": "320682" }, { "label": "\u6D77\u95E8\u5E02", "value": "320684" }], [{ "label": "\u8FDE\u4E91\u533A", "value": "320703" }, { "label": "\u6D77\u5DDE\u533A", "value": "320706" }, { "label": "\u8D63\u6986\u533A", "value": "320707" }, { "label": "\u4E1C\u6D77\u53BF", "value": "320722" }, { "label": "\u704C\u4E91\u53BF", "value": "320723" }, { "label": "\u704C\u5357\u53BF", "value": "320724" }, { "label": "\u8FDE\u4E91\u6E2F\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A", "value": "320771" }, { "label": "\u8FDE\u4E91\u6E2F\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u5F00\u53D1\u533A", "value": "320772" }], [{ "label": "\u6DEE\u5B89\u533A", "value": "320803" }, { "label": "\u6DEE\u9634\u533A", "value": "320804" }, { "label": "\u6E05\u6C5F\u6D66\u533A", "value": "320812" }, { "label": "\u6D2A\u6CFD\u533A", "value": "320813" }, { "label": "\u6D9F\u6C34\u53BF", "value": "320826" }, { "label": "\u76F1\u7719\u53BF", "value": "320830" }, { "label": "\u91D1\u6E56\u53BF", "value": "320831" }, { "label": "\u6DEE\u5B89\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A", "value": "320871" }], [{ "label": "\u4EAD\u6E56\u533A", "value": "320902" }, { "label": "\u76D0\u90FD\u533A", "value": "320903" }, { "label": "\u5927\u4E30\u533A", "value": "320904" }, { "label": "\u54CD\u6C34\u53BF", "value": "320921" }, { "label": "\u6EE8\u6D77\u53BF", "value": "320922" }, { "label": "\u961C\u5B81\u53BF", "value": "320923" }, { "label": "\u5C04\u9633\u53BF", "value": "320924" }, { "label": "\u5EFA\u6E56\u53BF", "value": "320925" }, { "label": "\u76D0\u57CE\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A", "value": "320971" }, { "label": "\u4E1C\u53F0\u5E02", "value": "320981" }], [{ "label": "\u5E7F\u9675\u533A", "value": "321002" }, { "label": "\u9097\u6C5F\u533A", "value": "321003" }, { "label": "\u6C5F\u90FD\u533A", "value": "321012" }, { "label": "\u5B9D\u5E94\u53BF", "value": "321023" }, { "label": "\u626C\u5DDE\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A", "value": "321071" }, { "label": "\u4EEA\u5F81\u5E02", "value": "321081" }, { "label": "\u9AD8\u90AE\u5E02", "value": "321084" }], [{ "label": "\u4EAC\u53E3\u533A", "value": "321102" }, { "label": "\u6DA6\u5DDE\u533A", "value": "321111" }, { "label": "\u4E39\u5F92\u533A", "value": "321112" }, { "label": "\u9547\u6C5F\u65B0\u533A", "value": "321171" }, { "label": "\u4E39\u9633\u5E02", "value": "321181" }, { "label": "\u626C\u4E2D\u5E02", "value": "321182" }, { "label": "\u53E5\u5BB9\u5E02", "value": "321183" }], [{ "label": "\u6D77\u9675\u533A", "value": "321202" }, { "label": "\u9AD8\u6E2F\u533A", "value": "321203" }, { "label": "\u59DC\u5830\u533A", "value": "321204" }, { "label": "\u6CF0\u5DDE\u533B\u836F\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u5F00\u53D1\u533A", "value": "321271" }, { "label": "\u5174\u5316\u5E02", "value": "321281" }, { "label": "\u9756\u6C5F\u5E02", "value": "321282" }, { "label": "\u6CF0\u5174\u5E02", "value": "321283" }], [{ "label": "\u5BBF\u57CE\u533A", "value": "321302" }, { "label": "\u5BBF\u8C6B\u533A", "value": "321311" }, { "label": "\u6CAD\u9633\u53BF", "value": "321322" }, { "label": "\u6CD7\u9633\u53BF", "value": "321323" }, { "label": "\u6CD7\u6D2A\u53BF", "value": "321324" }, { "label": "\u5BBF\u8FC1\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A", "value": "321371" }]], [[{ "label": "\u4E0A\u57CE\u533A", "value": "330102" }, { "label": "\u4E0B\u57CE\u533A", "value": "330103" }, { "label": "\u6C5F\u5E72\u533A", "value": "330104" }, { "label": "\u62F1\u5885\u533A", "value": "330105" }, { "label": "\u897F\u6E56\u533A", "value": "330106" }, { "label": "\u6EE8\u6C5F\u533A", "value": "330108" }, { "label": "\u8427\u5C71\u533A", "value": "330109" }, { "label": "\u4F59\u676D\u533A", "value": "330110" }, { "label": "\u5BCC\u9633\u533A", "value": "330111" }, { "label": "\u4E34\u5B89\u533A", "value": "330112" }, { "label": "\u6850\u5E90\u53BF", "value": "330122" }, { "label": "\u6DF3\u5B89\u53BF", "value": "330127" }, { "label": "\u5EFA\u5FB7\u5E02", "value": "330182" }], [{ "label": "\u6D77\u66D9\u533A", "value": "330203" }, { "label": "\u6C5F\u5317\u533A", "value": "330205" }, { "label": "\u5317\u4ED1\u533A", "value": "330206" }, { "label": "\u9547\u6D77\u533A", "value": "330211" }, { "label": "\u911E\u5DDE\u533A", "value": "330212" }, { "label": "\u5949\u5316\u533A", "value": "330213" }, { "label": "\u8C61\u5C71\u53BF", "value": "330225" }, { "label": "\u5B81\u6D77\u53BF", "value": "330226" }, { "label": "\u4F59\u59DA\u5E02", "value": "330281" }, { "label": "\u6148\u6EAA\u5E02", "value": "330282" }], [{ "label": "\u9E7F\u57CE\u533A", "value": "330302" }, { "label": "\u9F99\u6E7E\u533A", "value": "330303" }, { "label": "\u74EF\u6D77\u533A", "value": "330304" }, { "label": "\u6D1E\u5934\u533A", "value": "330305" }, { "label": "\u6C38\u5609\u53BF", "value": "330324" }, { "label": "\u5E73\u9633\u53BF", "value": "330326" }, { "label": "\u82CD\u5357\u53BF", "value": "330327" }, { "label": "\u6587\u6210\u53BF", "value": "330328" }, { "label": "\u6CF0\u987A\u53BF", "value": "330329" }, { "label": "\u6E29\u5DDE\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A", "value": "330371" }, { "label": "\u745E\u5B89\u5E02", "value": "330381" }, { "label": "\u4E50\u6E05\u5E02", "value": "330382" }], [{ "label": "\u5357\u6E56\u533A", "value": "330402" }, { "label": "\u79C0\u6D32\u533A", "value": "330411" }, { "label": "\u5609\u5584\u53BF", "value": "330421" }, { "label": "\u6D77\u76D0\u53BF", "value": "330424" }, { "label": "\u6D77\u5B81\u5E02", "value": "330481" }, { "label": "\u5E73\u6E56\u5E02", "value": "330482" }, { "label": "\u6850\u4E61\u5E02", "value": "330483" }], [{ "label": "\u5434\u5174\u533A", "value": "330502" }, { "label": "\u5357\u6D54\u533A", "value": "330503" }, { "label": "\u5FB7\u6E05\u53BF", "value": "330521" }, { "label": "\u957F\u5174\u53BF", "value": "330522" }, { "label": "\u5B89\u5409\u53BF", "value": "330523" }], [{ "label": "\u8D8A\u57CE\u533A", "value": "330602" }, { "label": "\u67EF\u6865\u533A", "value": "330603" }, { "label": "\u4E0A\u865E\u533A", "value": "330604" }, { "label": "\u65B0\u660C\u53BF", "value": "330624" }, { "label": "\u8BF8\u66A8\u5E02", "value": "330681" }, { "label": "\u5D4A\u5DDE\u5E02", "value": "330683" }], [{ "label": "\u5A7A\u57CE\u533A", "value": "330702" }, { "label": "\u91D1\u4E1C\u533A", "value": "330703" }, { "label": "\u6B66\u4E49\u53BF", "value": "330723" }, { "label": "\u6D66\u6C5F\u53BF", "value": "330726" }, { "label": "\u78D0\u5B89\u53BF", "value": "330727" }, { "label": "\u5170\u6EAA\u5E02", "value": "330781" }, { "label": "\u4E49\u4E4C\u5E02", "value": "330782" }, { "label": "\u4E1C\u9633\u5E02", "value": "330783" }, { "label": "\u6C38\u5EB7\u5E02", "value": "330784" }], [{ "label": "\u67EF\u57CE\u533A", "value": "330802" }, { "label": "\u8862\u6C5F\u533A", "value": "330803" }, { "label": "\u5E38\u5C71\u53BF", "value": "330822" }, { "label": "\u5F00\u5316\u53BF", "value": "330824" }, { "label": "\u9F99\u6E38\u53BF", "value": "330825" }, { "label": "\u6C5F\u5C71\u5E02", "value": "330881" }], [{ "label": "\u5B9A\u6D77\u533A", "value": "330902" }, { "label": "\u666E\u9640\u533A", "value": "330903" }, { "label": "\u5CB1\u5C71\u53BF", "value": "330921" }, { "label": "\u5D4A\u6CD7\u53BF", "value": "330922" }], [{ "label": "\u6912\u6C5F\u533A", "value": "331002" }, { "label": "\u9EC4\u5CA9\u533A", "value": "331003" }, { "label": "\u8DEF\u6865\u533A", "value": "331004" }, { "label": "\u4E09\u95E8\u53BF", "value": "331022" }, { "label": "\u5929\u53F0\u53BF", "value": "331023" }, { "label": "\u4ED9\u5C45\u53BF", "value": "331024" }, { "label": "\u6E29\u5CAD\u5E02", "value": "331081" }, { "label": "\u4E34\u6D77\u5E02", "value": "331082" }, { "label": "\u7389\u73AF\u5E02", "value": "331083" }], [{ "label": "\u83B2\u90FD\u533A", "value": "331102" }, { "label": "\u9752\u7530\u53BF", "value": "331121" }, { "label": "\u7F19\u4E91\u53BF", "value": "331122" }, { "label": "\u9042\u660C\u53BF", "value": "331123" }, { "label": "\u677E\u9633\u53BF", "value": "331124" }, { "label": "\u4E91\u548C\u53BF", "value": "331125" }, { "label": "\u5E86\u5143\u53BF", "value": "331126" }, { "label": "\u666F\u5B81\u7572\u65CF\u81EA\u6CBB\u53BF", "value": "331127" }, { "label": "\u9F99\u6CC9\u5E02", "value": "331181" }]], [[{ "label": "\u7476\u6D77\u533A", "value": "340102" }, { "label": "\u5E90\u9633\u533A", "value": "340103" }, { "label": "\u8700\u5C71\u533A", "value": "340104" }, { "label": "\u5305\u6CB3\u533A", "value": "340111" }, { "label": "\u957F\u4E30\u53BF", "value": "340121" }, { "label": "\u80A5\u4E1C\u53BF", "value": "340122" }, { "label": "\u80A5\u897F\u53BF", "value": "340123" }, { "label": "\u5E90\u6C5F\u53BF", "value": "340124" }, { "label": "\u5408\u80A5\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u5F00\u53D1\u533A", "value": "340171" }, { "label": "\u5408\u80A5\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A", "value": "340172" }, { "label": "\u5408\u80A5\u65B0\u7AD9\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u5F00\u53D1\u533A", "value": "340173" }, { "label": "\u5DE2\u6E56\u5E02", "value": "340181" }], [{ "label": "\u955C\u6E56\u533A", "value": "340202" }, { "label": "\u5F0B\u6C5F\u533A", "value": "340203" }, { "label": "\u9E20\u6C5F\u533A", "value": "340207" }, { "label": "\u4E09\u5C71\u533A", "value": "340208" }, { "label": "\u829C\u6E56\u53BF", "value": "340221" }, { "label": "\u7E41\u660C\u53BF", "value": "340222" }, { "label": "\u5357\u9675\u53BF", "value": "340223" }, { "label": "\u65E0\u4E3A\u53BF", "value": "340225" }, { "label": "\u829C\u6E56\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A", "value": "340271" }, { "label": "\u5B89\u5FBD\u829C\u6E56\u957F\u6C5F\u5927\u6865\u7ECF\u6D4E\u5F00\u53D1\u533A", "value": "340272" }], [{ "label": "\u9F99\u5B50\u6E56\u533A", "value": "340302" }, { "label": "\u868C\u5C71\u533A", "value": "340303" }, { "label": "\u79B9\u4F1A\u533A", "value": "340304" }, { "label": "\u6DEE\u4E0A\u533A", "value": "340311" }, { "label": "\u6000\u8FDC\u53BF", "value": "340321" }, { "label": "\u4E94\u6CB3\u53BF", "value": "340322" }, { "label": "\u56FA\u9547\u53BF", "value": "340323" }, { "label": "\u868C\u57E0\u5E02\u9AD8\u65B0\u6280\u672F\u5F00\u53D1\u533A", "value": "340371" }, { "label": "\u868C\u57E0\u5E02\u7ECF\u6D4E\u5F00\u53D1\u533A", "value": "340372" }], [{ "label": "\u5927\u901A\u533A", "value": "340402" }, { "label": "\u7530\u5BB6\u5EB5\u533A", "value": "340403" }, { "label": "\u8C22\u5BB6\u96C6\u533A", "value": "340404" }, { "label": "\u516B\u516C\u5C71\u533A", "value": "340405" }, { "label": "\u6F58\u96C6\u533A", "value": "340406" }, { "label": "\u51E4\u53F0\u53BF", "value": "340421" }, { "label": "\u5BFF\u53BF", "value": "340422" }], [{ "label": "\u82B1\u5C71\u533A", "value": "340503" }, { "label": "\u96E8\u5C71\u533A", "value": "340504" }, { "label": "\u535A\u671B\u533A", "value": "340506" }, { "label": "\u5F53\u6D82\u53BF", "value": "340521" }, { "label": "\u542B\u5C71\u53BF", "value": "340522" }, { "label": "\u548C\u53BF", "value": "340523" }], [{ "label": "\u675C\u96C6\u533A", "value": "340602" }, { "label": "\u76F8\u5C71\u533A", "value": "340603" }, { "label": "\u70C8\u5C71\u533A", "value": "340604" }, { "label": "\u6FC9\u6EAA\u53BF", "value": "340621" }], [{ "label": "\u94DC\u5B98\u533A", "value": "340705" }, { "label": "\u4E49\u5B89\u533A", "value": "340706" }, { "label": "\u90CA\u533A", "value": "340711" }, { "label": "\u679E\u9633\u53BF", "value": "340722" }], [{ "label": "\u8FCE\u6C5F\u533A", "value": "340802" }, { "label": "\u5927\u89C2\u533A", "value": "340803" }, { "label": "\u5B9C\u79C0\u533A", "value": "340811" }, { "label": "\u6000\u5B81\u53BF", "value": "340822" }, { "label": "\u6F5C\u5C71\u53BF", "value": "340824" }, { "label": "\u592A\u6E56\u53BF", "value": "340825" }, { "label": "\u5BBF\u677E\u53BF", "value": "340826" }, { "label": "\u671B\u6C5F\u53BF", "value": "340827" }, { "label": "\u5CB3\u897F\u53BF", "value": "340828" }, { "label": "\u5B89\u5FBD\u5B89\u5E86\u7ECF\u6D4E\u5F00\u53D1\u533A", "value": "340871" }, { "label": "\u6850\u57CE\u5E02", "value": "340881" }], [{ "label": "\u5C6F\u6EAA\u533A", "value": "341002" }, { "label": "\u9EC4\u5C71\u533A", "value": "341003" }, { "label": "\u5FBD\u5DDE\u533A", "value": "341004" }, { "label": "\u6B59\u53BF", "value": "341021" }, { "label": "\u4F11\u5B81\u53BF", "value": "341022" }, { "label": "\u9EDF\u53BF", "value": "341023" }, { "label": "\u7941\u95E8\u53BF", "value": "341024" }], [{ "label": "\u7405\u740A\u533A", "value": "341102" }, { "label": "\u5357\u8C2F\u533A", "value": "341103" }, { "label": "\u6765\u5B89\u53BF", "value": "341122" }, { "label": "\u5168\u6912\u53BF", "value": "341124" }, { "label": "\u5B9A\u8FDC\u53BF", "value": "341125" }, { "label": "\u51E4\u9633\u53BF", "value": "341126" }, { "label": "\u82CF\u6EC1\u73B0\u4EE3\u4EA7\u4E1A\u56ED", "value": "341171" }, { "label": "\u6EC1\u5DDE\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A", "value": "341172" }, { "label": "\u5929\u957F\u5E02", "value": "341181" }, { "label": "\u660E\u5149\u5E02", "value": "341182" }], [{ "label": "\u988D\u5DDE\u533A", "value": "341202" }, { "label": "\u988D\u4E1C\u533A", "value": "341203" }, { "label": "\u988D\u6CC9\u533A", "value": "341204" }, { "label": "\u4E34\u6CC9\u53BF", "value": "341221" }, { "label": "\u592A\u548C\u53BF", "value": "341222" }, { "label": "\u961C\u5357\u53BF", "value": "341225" }, { "label": "\u988D\u4E0A\u53BF", "value": "341226" }, { "label": "\u961C\u9633\u5408\u80A5\u73B0\u4EE3\u4EA7\u4E1A\u56ED\u533A", "value": "341271" }, { "label": "\u961C\u9633\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A", "value": "341272" }, { "label": "\u754C\u9996\u5E02", "value": "341282" }], [{ "label": "\u57C7\u6865\u533A", "value": "341302" }, { "label": "\u7800\u5C71\u53BF", "value": "341321" }, { "label": "\u8427\u53BF", "value": "341322" }, { "label": "\u7075\u74A7\u53BF", "value": "341323" }, { "label": "\u6CD7\u53BF", "value": "341324" }, { "label": "\u5BBF\u5DDE\u9A6C\u978D\u5C71\u73B0\u4EE3\u4EA7\u4E1A\u56ED\u533A", "value": "341371" }, { "label": "\u5BBF\u5DDE\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A", "value": "341372" }], [{ "label": "\u91D1\u5B89\u533A", "value": "341502" }, { "label": "\u88D5\u5B89\u533A", "value": "341503" }, { "label": "\u53F6\u96C6\u533A", "value": "341504" }, { "label": "\u970D\u90B1\u53BF", "value": "341522" }, { "label": "\u8212\u57CE\u53BF", "value": "341523" }, { "label": "\u91D1\u5BE8\u53BF", "value": "341524" }, { "label": "\u970D\u5C71\u53BF", "value": "341525" }], [{ "label": "\u8C2F\u57CE\u533A", "value": "341602" }, { "label": "\u6DA1\u9633\u53BF", "value": "341621" }, { "label": "\u8499\u57CE\u53BF", "value": "341622" }, { "label": "\u5229\u8F9B\u53BF", "value": "341623" }], [{ "label": "\u8D35\u6C60\u533A", "value": "341702" }, { "label": "\u4E1C\u81F3\u53BF", "value": "341721" }, { "label": "\u77F3\u53F0\u53BF", "value": "341722" }, { "label": "\u9752\u9633\u53BF", "value": "341723" }], [{ "label": "\u5BA3\u5DDE\u533A", "value": "341802" }, { "label": "\u90CE\u6EAA\u53BF", "value": "341821" }, { "label": "\u5E7F\u5FB7\u53BF", "value": "341822" }, { "label": "\u6CFE\u53BF", "value": "341823" }, { "label": "\u7EE9\u6EAA\u53BF", "value": "341824" }, { "label": "\u65CC\u5FB7\u53BF", "value": "341825" }, { "label": "\u5BA3\u57CE\u5E02\u7ECF\u6D4E\u5F00\u53D1\u533A", "value": "341871" }, { "label": "\u5B81\u56FD\u5E02", "value": "341881" }]], [[{ "label": "\u9F13\u697C\u533A", "value": "350102" }, { "label": "\u53F0\u6C5F\u533A", "value": "350103" }, { "label": "\u4ED3\u5C71\u533A", "value": "350104" }, { "label": "\u9A6C\u5C3E\u533A", "value": "350105" }, { "label": "\u664B\u5B89\u533A", "value": "350111" }, { "label": "\u95FD\u4FAF\u53BF", "value": "350121" }, { "label": "\u8FDE\u6C5F\u53BF", "value": "350122" }, { "label": "\u7F57\u6E90\u53BF", "value": "350123" }, { "label": "\u95FD\u6E05\u53BF", "value": "350124" }, { "label": "\u6C38\u6CF0\u53BF", "value": "350125" }, { "label": "\u5E73\u6F6D\u53BF", "value": "350128" }, { "label": "\u798F\u6E05\u5E02", "value": "350181" }, { "label": "\u957F\u4E50\u5E02", "value": "350182" }], [{ "label": "\u601D\u660E\u533A", "value": "350203" }, { "label": "\u6D77\u6CA7\u533A", "value": "350205" }, { "label": "\u6E56\u91CC\u533A", "value": "350206" }, { "label": "\u96C6\u7F8E\u533A", "value": "350211" }, { "label": "\u540C\u5B89\u533A", "value": "350212" }, { "label": "\u7FD4\u5B89\u533A", "value": "350213" }], [{ "label": "\u57CE\u53A2\u533A", "value": "350302" }, { "label": "\u6DB5\u6C5F\u533A", "value": "350303" }, { "label": "\u8354\u57CE\u533A", "value": "350304" }, { "label": "\u79C0\u5C7F\u533A", "value": "350305" }, { "label": "\u4ED9\u6E38\u53BF", "value": "350322" }], [{ "label": "\u6885\u5217\u533A", "value": "350402" }, { "label": "\u4E09\u5143\u533A", "value": "350403" }, { "label": "\u660E\u6EAA\u53BF", "value": "350421" }, { "label": "\u6E05\u6D41\u53BF", "value": "350423" }, { "label": "\u5B81\u5316\u53BF", "value": "350424" }, { "label": "\u5927\u7530\u53BF", "value": "350425" }, { "label": "\u5C24\u6EAA\u53BF", "value": "350426" }, { "label": "\u6C99\u53BF", "value": "350427" }, { "label": "\u5C06\u4E50\u53BF", "value": "350428" }, { "label": "\u6CF0\u5B81\u53BF", "value": "350429" }, { "label": "\u5EFA\u5B81\u53BF", "value": "350430" }, { "label": "\u6C38\u5B89\u5E02", "value": "350481" }], [{ "label": "\u9CA4\u57CE\u533A", "value": "350502" }, { "label": "\u4E30\u6CFD\u533A", "value": "350503" }, { "label": "\u6D1B\u6C5F\u533A", "value": "350504" }, { "label": "\u6CC9\u6E2F\u533A", "value": "350505" }, { "label": "\u60E0\u5B89\u53BF", "value": "350521" }, { "label": "\u5B89\u6EAA\u53BF", "value": "350524" }, { "label": "\u6C38\u6625\u53BF", "value": "350525" }, { "label": "\u5FB7\u5316\u53BF", "value": "350526" }, { "label": "\u91D1\u95E8\u53BF", "value": "350527" }, { "label": "\u77F3\u72EE\u5E02", "value": "350581" }, { "label": "\u664B\u6C5F\u5E02", "value": "350582" }, { "label": "\u5357\u5B89\u5E02", "value": "350583" }], [{ "label": "\u8297\u57CE\u533A", "value": "350602" }, { "label": "\u9F99\u6587\u533A", "value": "350603" }, { "label": "\u4E91\u9704\u53BF", "value": "350622" }, { "label": "\u6F33\u6D66\u53BF", "value": "350623" }, { "label": "\u8BCF\u5B89\u53BF", "value": "350624" }, { "label": "\u957F\u6CF0\u53BF", "value": "350625" }, { "label": "\u4E1C\u5C71\u53BF", "value": "350626" }, { "label": "\u5357\u9756\u53BF", "value": "350627" }, { "label": "\u5E73\u548C\u53BF", "value": "350628" }, { "label": "\u534E\u5B89\u53BF", "value": "350629" }, { "label": "\u9F99\u6D77\u5E02", "value": "350681" }], [{ "label": "\u5EF6\u5E73\u533A", "value": "350702" }, { "label": "\u5EFA\u9633\u533A", "value": "350703" }, { "label": "\u987A\u660C\u53BF", "value": "350721" }, { "label": "\u6D66\u57CE\u53BF", "value": "350722" }, { "label": "\u5149\u6CFD\u53BF", "value": "350723" }, { "label": "\u677E\u6EAA\u53BF", "value": "350724" }, { "label": "\u653F\u548C\u53BF", "value": "350725" }, { "label": "\u90B5\u6B66\u5E02", "value": "350781" }, { "label": "\u6B66\u5937\u5C71\u5E02", "value": "350782" }, { "label": "\u5EFA\u74EF\u5E02", "value": "350783" }], [{ "label": "\u65B0\u7F57\u533A", "value": "350802" }, { "label": "\u6C38\u5B9A\u533A", "value": "350803" }, { "label": "\u957F\u6C40\u53BF", "value": "350821" }, { "label": "\u4E0A\u676D\u53BF", "value": "350823" }, { "label": "\u6B66\u5E73\u53BF", "value": "350824" }, { "label": "\u8FDE\u57CE\u53BF", "value": "350825" }, { "label": "\u6F33\u5E73\u5E02", "value": "350881" }], [{ "label": "\u8549\u57CE\u533A", "value": "350902" }, { "label": "\u971E\u6D66\u53BF", "value": "350921" }, { "label": "\u53E4\u7530\u53BF", "value": "350922" }, { "label": "\u5C4F\u5357\u53BF", "value": "350923" }, { "label": "\u5BFF\u5B81\u53BF", "value": "350924" }, { "label": "\u5468\u5B81\u53BF", "value": "350925" }, { "label": "\u67D8\u8363\u53BF", "value": "350926" }, { "label": "\u798F\u5B89\u5E02", "value": "350981" }, { "label": "\u798F\u9F0E\u5E02", "value": "350982" }]], [[{ "label": "\u4E1C\u6E56\u533A", "value": "360102" }, { "label": "\u897F\u6E56\u533A", "value": "360103" }, { "label": "\u9752\u4E91\u8C31\u533A", "value": "360104" }, { "label": "\u6E7E\u91CC\u533A", "value": "360105" }, { "label": "\u9752\u5C71\u6E56\u533A", "value": "360111" }, { "label": "\u65B0\u5EFA\u533A", "value": "360112" }, { "label": "\u5357\u660C\u53BF", "value": "360121" }, { "label": "\u5B89\u4E49\u53BF", "value": "360123" }, { "label": "\u8FDB\u8D24\u53BF", "value": "360124" }], [{ "label": "\u660C\u6C5F\u533A", "value": "360202" }, { "label": "\u73E0\u5C71\u533A", "value": "360203" }, { "label": "\u6D6E\u6881\u53BF", "value": "360222" }, { "label": "\u4E50\u5E73\u5E02", "value": "360281" }], [{ "label": "\u5B89\u6E90\u533A", "value": "360302" }, { "label": "\u6E58\u4E1C\u533A", "value": "360313" }, { "label": "\u83B2\u82B1\u53BF", "value": "360321" }, { "label": "\u4E0A\u6817\u53BF", "value": "360322" }, { "label": "\u82A6\u6EAA\u53BF", "value": "360323" }], [{ "label": "\u6FC2\u6EAA\u533A", "value": "360402" }, { "label": "\u6D54\u9633\u533A", "value": "360403" }, { "label": "\u67F4\u6851\u533A", "value": "360404" }, { "label": "\u6B66\u5B81\u53BF", "value": "360423" }, { "label": "\u4FEE\u6C34\u53BF", "value": "360424" }, { "label": "\u6C38\u4FEE\u53BF", "value": "360425" }, { "label": "\u5FB7\u5B89\u53BF", "value": "360426" }, { "label": "\u90FD\u660C\u53BF", "value": "360428" }, { "label": "\u6E56\u53E3\u53BF", "value": "360429" }, { "label": "\u5F6D\u6CFD\u53BF", "value": "360430" }, { "label": "\u745E\u660C\u5E02", "value": "360481" }, { "label": "\u5171\u9752\u57CE\u5E02", "value": "360482" }, { "label": "\u5E90\u5C71\u5E02", "value": "360483" }], [{ "label": "\u6E1D\u6C34\u533A", "value": "360502" }, { "label": "\u5206\u5B9C\u53BF", "value": "360521" }], [{ "label": "\u6708\u6E56\u533A", "value": "360602" }, { "label": "\u4F59\u6C5F\u53BF", "value": "360622" }, { "label": "\u8D35\u6EAA\u5E02", "value": "360681" }], [{ "label": "\u7AE0\u8D21\u533A", "value": "360702" }, { "label": "\u5357\u5EB7\u533A", "value": "360703" }, { "label": "\u8D63\u53BF\u533A", "value": "360704" }, { "label": "\u4FE1\u4E30\u53BF", "value": "360722" }, { "label": "\u5927\u4F59\u53BF", "value": "360723" }, { "label": "\u4E0A\u72B9\u53BF", "value": "360724" }, { "label": "\u5D07\u4E49\u53BF", "value": "360725" }, { "label": "\u5B89\u8FDC\u53BF", "value": "360726" }, { "label": "\u9F99\u5357\u53BF", "value": "360727" }, { "label": "\u5B9A\u5357\u53BF", "value": "360728" }, { "label": "\u5168\u5357\u53BF", "value": "360729" }, { "label": "\u5B81\u90FD\u53BF", "value": "360730" }, { "label": "\u4E8E\u90FD\u53BF", "value": "360731" }, { "label": "\u5174\u56FD\u53BF", "value": "360732" }, { "label": "\u4F1A\u660C\u53BF", "value": "360733" }, { "label": "\u5BFB\u4E4C\u53BF", "value": "360734" }, { "label": "\u77F3\u57CE\u53BF", "value": "360735" }, { "label": "\u745E\u91D1\u5E02", "value": "360781" }], [{ "label": "\u5409\u5DDE\u533A", "value": "360802" }, { "label": "\u9752\u539F\u533A", "value": "360803" }, { "label": "\u5409\u5B89\u53BF", "value": "360821" }, { "label": "\u5409\u6C34\u53BF", "value": "360822" }, { "label": "\u5CE1\u6C5F\u53BF", "value": "360823" }, { "label": "\u65B0\u5E72\u53BF", "value": "360824" }, { "label": "\u6C38\u4E30\u53BF", "value": "360825" }, { "label": "\u6CF0\u548C\u53BF", "value": "360826" }, { "label": "\u9042\u5DDD\u53BF", "value": "360827" }, { "label": "\u4E07\u5B89\u53BF", "value": "360828" }, { "label": "\u5B89\u798F\u53BF", "value": "360829" }, { "label": "\u6C38\u65B0\u53BF", "value": "360830" }, { "label": "\u4E95\u5188\u5C71\u5E02", "value": "360881" }], [{ "label": "\u8881\u5DDE\u533A", "value": "360902" }, { "label": "\u5949\u65B0\u53BF", "value": "360921" }, { "label": "\u4E07\u8F7D\u53BF", "value": "360922" }, { "label": "\u4E0A\u9AD8\u53BF", "value": "360923" }, { "label": "\u5B9C\u4E30\u53BF", "value": "360924" }, { "label": "\u9756\u5B89\u53BF", "value": "360925" }, { "label": "\u94DC\u9F13\u53BF", "value": "360926" }, { "label": "\u4E30\u57CE\u5E02", "value": "360981" }, { "label": "\u6A1F\u6811\u5E02", "value": "360982" }, { "label": "\u9AD8\u5B89\u5E02", "value": "360983" }], [{ "label": "\u4E34\u5DDD\u533A", "value": "361002" }, { "label": "\u4E1C\u4E61\u533A", "value": "361003" }, { "label": "\u5357\u57CE\u53BF", "value": "361021" }, { "label": "\u9ECE\u5DDD\u53BF", "value": "361022" }, { "label": "\u5357\u4E30\u53BF", "value": "361023" }, { "label": "\u5D07\u4EC1\u53BF", "value": "361024" }, { "label": "\u4E50\u5B89\u53BF", "value": "361025" }, { "label": "\u5B9C\u9EC4\u53BF", "value": "361026" }, { "label": "\u91D1\u6EAA\u53BF", "value": "361027" }, { "label": "\u8D44\u6EAA\u53BF", "value": "361028" }, { "label": "\u5E7F\u660C\u53BF", "value": "361030" }], [{ "label": "\u4FE1\u5DDE\u533A", "value": "361102" }, { "label": "\u5E7F\u4E30\u533A", "value": "361103" }, { "label": "\u4E0A\u9976\u53BF", "value": "361121" }, { "label": "\u7389\u5C71\u53BF", "value": "361123" }, { "label": "\u94C5\u5C71\u53BF", "value": "361124" }, { "label": "\u6A2A\u5CF0\u53BF", "value": "361125" }, { "label": "\u5F0B\u9633\u53BF", "value": "361126" }, { "label": "\u4F59\u5E72\u53BF", "value": "361127" }, { "label": "\u9131\u9633\u53BF", "value": "361128" }, { "label": "\u4E07\u5E74\u53BF", "value": "361129" }, { "label": "\u5A7A\u6E90\u53BF", "value": "361130" }, { "label": "\u5FB7\u5174\u5E02", "value": "361181" }]], [[{ "label": "\u5386\u4E0B\u533A", "value": "370102" }, { "label": "\u5E02\u4E2D\u533A", "value": "370103" }, { "label": "\u69D0\u836B\u533A", "value": "370104" }, { "label": "\u5929\u6865\u533A", "value": "370105" }, { "label": "\u5386\u57CE\u533A", "value": "370112" }, { "label": "\u957F\u6E05\u533A", "value": "370113" }, { "label": "\u7AE0\u4E18\u533A", "value": "370114" }, { "label": "\u5E73\u9634\u53BF", "value": "370124" }, { "label": "\u6D4E\u9633\u53BF", "value": "370125" }, { "label": "\u5546\u6CB3\u53BF", "value": "370126" }, { "label": "\u6D4E\u5357\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u5F00\u53D1\u533A", "value": "370171" }], [{ "label": "\u5E02\u5357\u533A", "value": "370202" }, { "label": "\u5E02\u5317\u533A", "value": "370203" }, { "label": "\u9EC4\u5C9B\u533A", "value": "370211" }, { "label": "\u5D02\u5C71\u533A", "value": "370212" }, { "label": "\u674E\u6CA7\u533A", "value": "370213" }, { "label": "\u57CE\u9633\u533A", "value": "370214" }, { "label": "\u5373\u58A8\u533A", "value": "370215" }, { "label": "\u9752\u5C9B\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u5F00\u53D1\u533A", "value": "370271" }, { "label": "\u80F6\u5DDE\u5E02", "value": "370281" }, { "label": "\u5E73\u5EA6\u5E02", "value": "370283" }, { "label": "\u83B1\u897F\u5E02", "value": "370285" }], [{ "label": "\u6DC4\u5DDD\u533A", "value": "370302" }, { "label": "\u5F20\u5E97\u533A", "value": "370303" }, { "label": "\u535A\u5C71\u533A", "value": "370304" }, { "label": "\u4E34\u6DC4\u533A", "value": "370305" }, { "label": "\u5468\u6751\u533A", "value": "370306" }, { "label": "\u6853\u53F0\u53BF", "value": "370321" }, { "label": "\u9AD8\u9752\u53BF", "value": "370322" }, { "label": "\u6C82\u6E90\u53BF", "value": "370323" }], [{ "label": "\u5E02\u4E2D\u533A", "value": "370402" }, { "label": "\u859B\u57CE\u533A", "value": "370403" }, { "label": "\u5CC4\u57CE\u533A", "value": "370404" }, { "label": "\u53F0\u513F\u5E84\u533A", "value": "370405" }, { "label": "\u5C71\u4EAD\u533A", "value": "370406" }, { "label": "\u6ED5\u5DDE\u5E02", "value": "370481" }], [{ "label": "\u4E1C\u8425\u533A", "value": "370502" }, { "label": "\u6CB3\u53E3\u533A", "value": "370503" }, { "label": "\u57A6\u5229\u533A", "value": "370505" }, { "label": "\u5229\u6D25\u53BF", "value": "370522" }, { "label": "\u5E7F\u9976\u53BF", "value": "370523" }, { "label": "\u4E1C\u8425\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A", "value": "370571" }, { "label": "\u4E1C\u8425\u6E2F\u7ECF\u6D4E\u5F00\u53D1\u533A", "value": "370572" }], [{ "label": "\u829D\u7F58\u533A", "value": "370602" }, { "label": "\u798F\u5C71\u533A", "value": "370611" }, { "label": "\u725F\u5E73\u533A", "value": "370612" }, { "label": "\u83B1\u5C71\u533A", "value": "370613" }, { "label": "\u957F\u5C9B\u53BF", "value": "370634" }, { "label": "\u70DF\u53F0\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u5F00\u53D1\u533A", "value": "370671" }, { "label": "\u70DF\u53F0\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A", "value": "370672" }, { "label": "\u9F99\u53E3\u5E02", "value": "370681" }, { "label": "\u83B1\u9633\u5E02", "value": "370682" }, { "label": "\u83B1\u5DDE\u5E02", "value": "370683" }, { "label": "\u84EC\u83B1\u5E02", "value": "370684" }, { "label": "\u62DB\u8FDC\u5E02", "value": "370685" }, { "label": "\u6816\u971E\u5E02", "value": "370686" }, { "label": "\u6D77\u9633\u5E02", "value": "370687" }], [{ "label": "\u6F4D\u57CE\u533A", "value": "370702" }, { "label": "\u5BD2\u4EAD\u533A", "value": "370703" }, { "label": "\u574A\u5B50\u533A", "value": "370704" }, { "label": "\u594E\u6587\u533A", "value": "370705" }, { "label": "\u4E34\u6710\u53BF", "value": "370724" }, { "label": "\u660C\u4E50\u53BF", "value": "370725" }, { "label": "\u6F4D\u574A\u6EE8\u6D77\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A", "value": "370772" }, { "label": "\u9752\u5DDE\u5E02", "value": "370781" }, { "label": "\u8BF8\u57CE\u5E02", "value": "370782" }, { "label": "\u5BFF\u5149\u5E02", "value": "370783" }, { "label": "\u5B89\u4E18\u5E02", "value": "370784" }, { "label": "\u9AD8\u5BC6\u5E02", "value": "370785" }, { "label": "\u660C\u9091\u5E02", "value": "370786" }], [{ "label": "\u4EFB\u57CE\u533A", "value": "370811" }, { "label": "\u5156\u5DDE\u533A", "value": "370812" }, { "label": "\u5FAE\u5C71\u53BF", "value": "370826" }, { "label": "\u9C7C\u53F0\u53BF", "value": "370827" }, { "label": "\u91D1\u4E61\u53BF", "value": "370828" }, { "label": "\u5609\u7965\u53BF", "value": "370829" }, { "label": "\u6C76\u4E0A\u53BF", "value": "370830" }, { "label": "\u6CD7\u6C34\u53BF", "value": "370831" }, { "label": "\u6881\u5C71\u53BF", "value": "370832" }, { "label": "\u6D4E\u5B81\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u5F00\u53D1\u533A", "value": "370871" }, { "label": "\u66F2\u961C\u5E02", "value": "370881" }, { "label": "\u90B9\u57CE\u5E02", "value": "370883" }], [{ "label": "\u6CF0\u5C71\u533A", "value": "370902" }, { "label": "\u5CB1\u5CB3\u533A", "value": "370911" }, { "label": "\u5B81\u9633\u53BF", "value": "370921" }, { "label": "\u4E1C\u5E73\u53BF", "value": "370923" }, { "label": "\u65B0\u6CF0\u5E02", "value": "370982" }, { "label": "\u80A5\u57CE\u5E02", "value": "370983" }], [{ "label": "\u73AF\u7FE0\u533A", "value": "371002" }, { "label": "\u6587\u767B\u533A", "value": "371003" }, { "label": "\u5A01\u6D77\u706B\u70AC\u9AD8\u6280\u672F\u4EA7\u4E1A\u5F00\u53D1\u533A", "value": "371071" }, { "label": "\u5A01\u6D77\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A", "value": "371072" }, { "label": "\u5A01\u6D77\u4E34\u6E2F\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A", "value": "371073" }, { "label": "\u8363\u6210\u5E02", "value": "371082" }, { "label": "\u4E73\u5C71\u5E02", "value": "371083" }], [{ "label": "\u4E1C\u6E2F\u533A", "value": "371102" }, { "label": "\u5C9A\u5C71\u533A", "value": "371103" }, { "label": "\u4E94\u83B2\u53BF", "value": "371121" }, { "label": "\u8392\u53BF", "value": "371122" }, { "label": "\u65E5\u7167\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A", "value": "371171" }, { "label": "\u65E5\u7167\u56FD\u9645\u6D77\u6D0B\u57CE", "value": "371172" }], [{ "label": "\u83B1\u57CE\u533A", "value": "371202" }, { "label": "\u94A2\u57CE\u533A", "value": "371203" }], [{ "label": "\u5170\u5C71\u533A", "value": "371302" }, { "label": "\u7F57\u5E84\u533A", "value": "371311" }, { "label": "\u6CB3\u4E1C\u533A", "value": "371312" }, { "label": "\u6C82\u5357\u53BF", "value": "371321" }, { "label": "\u90EF\u57CE\u53BF", "value": "371322" }, { "label": "\u6C82\u6C34\u53BF", "value": "371323" }, { "label": "\u5170\u9675\u53BF", "value": "371324" }, { "label": "\u8D39\u53BF", "value": "371325" }, { "label": "\u5E73\u9091\u53BF", "value": "371326" }, { "label": "\u8392\u5357\u53BF", "value": "371327" }, { "label": "\u8499\u9634\u53BF", "value": "371328" }, { "label": "\u4E34\u6CAD\u53BF", "value": "371329" }, { "label": "\u4E34\u6C82\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u5F00\u53D1\u533A", "value": "371371" }, { "label": "\u4E34\u6C82\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A", "value": "371372" }, { "label": "\u4E34\u6C82\u4E34\u6E2F\u7ECF\u6D4E\u5F00\u53D1\u533A", "value": "371373" }], [{ "label": "\u5FB7\u57CE\u533A", "value": "371402" }, { "label": "\u9675\u57CE\u533A", "value": "371403" }, { "label": "\u5B81\u6D25\u53BF", "value": "371422" }, { "label": "\u5E86\u4E91\u53BF", "value": "371423" }, { "label": "\u4E34\u9091\u53BF", "value": "371424" }, { "label": "\u9F50\u6CB3\u53BF", "value": "371425" }, { "label": "\u5E73\u539F\u53BF", "value": "371426" }, { "label": "\u590F\u6D25\u53BF", "value": "371427" }, { "label": "\u6B66\u57CE\u53BF", "value": "371428" }, { "label": "\u5FB7\u5DDE\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A", "value": "371471" }, { "label": "\u5FB7\u5DDE\u8FD0\u6CB3\u7ECF\u6D4E\u5F00\u53D1\u533A", "value": "371472" }, { "label": "\u4E50\u9675\u5E02", "value": "371481" }, { "label": "\u79B9\u57CE\u5E02", "value": "371482" }], [{ "label": "\u4E1C\u660C\u5E9C\u533A", "value": "371502" }, { "label": "\u9633\u8C37\u53BF", "value": "371521" }, { "label": "\u8398\u53BF", "value": "371522" }, { "label": "\u830C\u5E73\u53BF", "value": "371523" }, { "label": "\u4E1C\u963F\u53BF", "value": "371524" }, { "label": "\u51A0\u53BF", "value": "371525" }, { "label": "\u9AD8\u5510\u53BF", "value": "371526" }, { "label": "\u4E34\u6E05\u5E02", "value": "371581" }], [{ "label": "\u6EE8\u57CE\u533A", "value": "371602" }, { "label": "\u6CBE\u5316\u533A", "value": "371603" }, { "label": "\u60E0\u6C11\u53BF", "value": "371621" }, { "label": "\u9633\u4FE1\u53BF", "value": "371622" }, { "label": "\u65E0\u68E3\u53BF", "value": "371623" }, { "label": "\u535A\u5174\u53BF", "value": "371625" }, { "label": "\u90B9\u5E73\u53BF", "value": "371626" }], [{ "label": "\u7261\u4E39\u533A", "value": "371702" }, { "label": "\u5B9A\u9676\u533A", "value": "371703" }, { "label": "\u66F9\u53BF", "value": "371721" }, { "label": "\u5355\u53BF", "value": "371722" }, { "label": "\u6210\u6B66\u53BF", "value": "371723" }, { "label": "\u5DE8\u91CE\u53BF", "value": "371724" }, { "label": "\u90D3\u57CE\u53BF", "value": "371725" }, { "label": "\u9104\u57CE\u53BF", "value": "371726" }, { "label": "\u4E1C\u660E\u53BF", "value": "371728" }, { "label": "\u83CF\u6CFD\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A", "value": "371771" }, { "label": "\u83CF\u6CFD\u9AD8\u65B0\u6280\u672F\u5F00\u53D1\u533A", "value": "371772" }]], [[{ "label": "\u4E2D\u539F\u533A", "value": "410102" }, { "label": "\u4E8C\u4E03\u533A", "value": "410103" }, { "label": "\u7BA1\u57CE\u56DE\u65CF\u533A", "value": "410104" }, { "label": "\u91D1\u6C34\u533A", "value": "410105" }, { "label": "\u4E0A\u8857\u533A", "value": "410106" }, { "label": "\u60E0\u6D4E\u533A", "value": "410108" }, { "label": "\u4E2D\u725F\u53BF", "value": "410122" }, { "label": "\u90D1\u5DDE\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A", "value": "410171" }, { "label": "\u90D1\u5DDE\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u5F00\u53D1\u533A", "value": "410172" }, { "label": "\u90D1\u5DDE\u822A\u7A7A\u6E2F\u7ECF\u6D4E\u7EFC\u5408\u5B9E\u9A8C\u533A", "value": "410173" }, { "label": "\u5DE9\u4E49\u5E02", "value": "410181" }, { "label": "\u8365\u9633\u5E02", "value": "410182" }, { "label": "\u65B0\u5BC6\u5E02", "value": "410183" }, { "label": "\u65B0\u90D1\u5E02", "value": "410184" }, { "label": "\u767B\u5C01\u5E02", "value": "410185" }], [{ "label": "\u9F99\u4EAD\u533A", "value": "410202" }, { "label": "\u987A\u6CB3\u56DE\u65CF\u533A", "value": "410203" }, { "label": "\u9F13\u697C\u533A", "value": "410204" }, { "label": "\u79B9\u738B\u53F0\u533A", "value": "410205" }, { "label": "\u7965\u7B26\u533A", "value": "410212" }, { "label": "\u675E\u53BF", "value": "410221" }, { "label": "\u901A\u8BB8\u53BF", "value": "410222" }, { "label": "\u5C09\u6C0F\u53BF", "value": "410223" }, { "label": "\u5170\u8003\u53BF", "value": "410225" }], [{ "label": "\u8001\u57CE\u533A", "value": "410302" }, { "label": "\u897F\u5DE5\u533A", "value": "410303" }, { "label": "\u700D\u6CB3\u56DE\u65CF\u533A", "value": "410304" }, { "label": "\u6DA7\u897F\u533A", "value": "410305" }, { "label": "\u5409\u5229\u533A", "value": "410306" }, { "label": "\u6D1B\u9F99\u533A", "value": "410311" }, { "label": "\u5B5F\u6D25\u53BF", "value": "410322" }, { "label": "\u65B0\u5B89\u53BF", "value": "410323" }, { "label": "\u683E\u5DDD\u53BF", "value": "410324" }, { "label": "\u5D69\u53BF", "value": "410325" }, { "label": "\u6C5D\u9633\u53BF", "value": "410326" }, { "label": "\u5B9C\u9633\u53BF", "value": "410327" }, { "label": "\u6D1B\u5B81\u53BF", "value": "410328" }, { "label": "\u4F0A\u5DDD\u53BF", "value": "410329" }, { "label": "\u6D1B\u9633\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u5F00\u53D1\u533A", "value": "410371" }, { "label": "\u5043\u5E08\u5E02", "value": "410381" }], [{ "label": "\u65B0\u534E\u533A", "value": "410402" }, { "label": "\u536B\u4E1C\u533A", "value": "410403" }, { "label": "\u77F3\u9F99\u533A", "value": "410404" }, { "label": "\u6E5B\u6CB3\u533A", "value": "410411" }, { "label": "\u5B9D\u4E30\u53BF", "value": "410421" }, { "label": "\u53F6\u53BF", "value": "410422" }, { "label": "\u9C81\u5C71\u53BF", "value": "410423" }, { "label": "\u90CF\u53BF", "value": "410425" }, { "label": "\u5E73\u9876\u5C71\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u5F00\u53D1\u533A", "value": "410471" }, { "label": "\u5E73\u9876\u5C71\u5E02\u65B0\u57CE\u533A", "value": "410472" }, { "label": "\u821E\u94A2\u5E02", "value": "410481" }, { "label": "\u6C5D\u5DDE\u5E02", "value": "410482" }], [{ "label": "\u6587\u5CF0\u533A", "value": "410502" }, { "label": "\u5317\u5173\u533A", "value": "410503" }, { "label": "\u6BB7\u90FD\u533A", "value": "410505" }, { "label": "\u9F99\u5B89\u533A", "value": "410506" }, { "label": "\u5B89\u9633\u53BF", "value": "410522" }, { "label": "\u6C64\u9634\u53BF", "value": "410523" }, { "label": "\u6ED1\u53BF", "value": "410526" }, { "label": "\u5185\u9EC4\u53BF", "value": "410527" }, { "label": "\u5B89\u9633\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u5F00\u53D1\u533A", "value": "410571" }, { "label": "\u6797\u5DDE\u5E02", "value": "410581" }], [{ "label": "\u9E64\u5C71\u533A", "value": "410602" }, { "label": "\u5C71\u57CE\u533A", "value": "410603" }, { "label": "\u6DC7\u6EE8\u533A", "value": "410611" }, { "label": "\u6D5A\u53BF", "value": "410621" }, { "label": "\u6DC7\u53BF", "value": "410622" }, { "label": "\u9E64\u58C1\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A", "value": "410671" }], [{ "label": "\u7EA2\u65D7\u533A", "value": "410702" }, { "label": "\u536B\u6EE8\u533A", "value": "410703" }, { "label": "\u51E4\u6CC9\u533A", "value": "410704" }, { "label": "\u7267\u91CE\u533A", "value": "410711" }, { "label": "\u65B0\u4E61\u53BF", "value": "410721" }, { "label": "\u83B7\u5609\u53BF", "value": "410724" }, { "label": "\u539F\u9633\u53BF", "value": "410725" }, { "label": "\u5EF6\u6D25\u53BF", "value": "410726" }, { "label": "\u5C01\u4E18\u53BF", "value": "410727" }, { "label": "\u957F\u57A3\u53BF", "value": "410728" }, { "label": "\u65B0\u4E61\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u5F00\u53D1\u533A", "value": "410771" }, { "label": "\u65B0\u4E61\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A", "value": "410772" }, { "label": "\u65B0\u4E61\u5E02\u5E73\u539F\u57CE\u4E61\u4E00\u4F53\u5316\u793A\u8303\u533A", "value": "410773" }, { "label": "\u536B\u8F89\u5E02", "value": "410781" }, { "label": "\u8F89\u53BF\u5E02", "value": "410782" }], [{ "label": "\u89E3\u653E\u533A", "value": "410802" }, { "label": "\u4E2D\u7AD9\u533A", "value": "410803" }, { "label": "\u9A6C\u6751\u533A", "value": "410804" }, { "label": "\u5C71\u9633\u533A", "value": "410811" }, { "label": "\u4FEE\u6B66\u53BF", "value": "410821" }, { "label": "\u535A\u7231\u53BF", "value": "410822" }, { "label": "\u6B66\u965F\u53BF", "value": "410823" }, { "label": "\u6E29\u53BF", "value": "410825" }, { "label": "\u7126\u4F5C\u57CE\u4E61\u4E00\u4F53\u5316\u793A\u8303\u533A", "value": "410871" }, { "label": "\u6C81\u9633\u5E02", "value": "410882" }, { "label": "\u5B5F\u5DDE\u5E02", "value": "410883" }], [{ "label": "\u534E\u9F99\u533A", "value": "410902" }, { "label": "\u6E05\u4E30\u53BF", "value": "410922" }, { "label": "\u5357\u4E50\u53BF", "value": "410923" }, { "label": "\u8303\u53BF", "value": "410926" }, { "label": "\u53F0\u524D\u53BF", "value": "410927" }, { "label": "\u6FEE\u9633\u53BF", "value": "410928" }, { "label": "\u6CB3\u5357\u6FEE\u9633\u5DE5\u4E1A\u56ED\u533A", "value": "410971" }, { "label": "\u6FEE\u9633\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A", "value": "410972" }], [{ "label": "\u9B4F\u90FD\u533A", "value": "411002" }, { "label": "\u5EFA\u5B89\u533A", "value": "411003" }, { "label": "\u9122\u9675\u53BF", "value": "411024" }, { "label": "\u8944\u57CE\u53BF", "value": "411025" }, { "label": "\u8BB8\u660C\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A", "value": "411071" }, { "label": "\u79B9\u5DDE\u5E02", "value": "411081" }, { "label": "\u957F\u845B\u5E02", "value": "411082" }], [{ "label": "\u6E90\u6C47\u533A", "value": "411102" }, { "label": "\u90FE\u57CE\u533A", "value": "411103" }, { "label": "\u53EC\u9675\u533A", "value": "411104" }, { "label": "\u821E\u9633\u53BF", "value": "411121" }, { "label": "\u4E34\u988D\u53BF", "value": "411122" }, { "label": "\u6F2F\u6CB3\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A", "value": "411171" }], [{ "label": "\u6E56\u6EE8\u533A", "value": "411202" }, { "label": "\u9655\u5DDE\u533A", "value": "411203" }, { "label": "\u6E11\u6C60\u53BF", "value": "411221" }, { "label": "\u5362\u6C0F\u53BF", "value": "411224" }, { "label": "\u6CB3\u5357\u4E09\u95E8\u5CE1\u7ECF\u6D4E\u5F00\u53D1\u533A", "value": "411271" }, { "label": "\u4E49\u9A6C\u5E02", "value": "411281" }, { "label": "\u7075\u5B9D\u5E02", "value": "411282" }], [{ "label": "\u5B9B\u57CE\u533A", "value": "411302" }, { "label": "\u5367\u9F99\u533A", "value": "411303" }, { "label": "\u5357\u53EC\u53BF", "value": "411321" }, { "label": "\u65B9\u57CE\u53BF", "value": "411322" }, { "label": "\u897F\u5CE1\u53BF", "value": "411323" }, { "label": "\u9547\u5E73\u53BF", "value": "411324" }, { "label": "\u5185\u4E61\u53BF", "value": "411325" }, { "label": "\u6DC5\u5DDD\u53BF", "value": "411326" }, { "label": "\u793E\u65D7\u53BF", "value": "411327" }, { "label": "\u5510\u6CB3\u53BF", "value": "411328" }, { "label": "\u65B0\u91CE\u53BF", "value": "411329" }, { "label": "\u6850\u67CF\u53BF", "value": "411330" }, { "label": "\u5357\u9633\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u5F00\u53D1\u533A", "value": "411371" }, { "label": "\u5357\u9633\u5E02\u57CE\u4E61\u4E00\u4F53\u5316\u793A\u8303\u533A", "value": "411372" }, { "label": "\u9093\u5DDE\u5E02", "value": "411381" }], [{ "label": "\u6881\u56ED\u533A", "value": "411402" }, { "label": "\u7762\u9633\u533A", "value": "411403" }, { "label": "\u6C11\u6743\u53BF", "value": "411421" }, { "label": "\u7762\u53BF", "value": "411422" }, { "label": "\u5B81\u9675\u53BF", "value": "411423" }, { "label": "\u67D8\u57CE\u53BF", "value": "411424" }, { "label": "\u865E\u57CE\u53BF", "value": "411425" }, { "label": "\u590F\u9091\u53BF", "value": "411426" }, { "label": "\u8C6B\u4E1C\u7EFC\u5408\u7269\u6D41\u4EA7\u4E1A\u805A\u96C6\u533A", "value": "411471" }, { "label": "\u6CB3\u5357\u5546\u4E18\u7ECF\u6D4E\u5F00\u53D1\u533A", "value": "411472" }, { "label": "\u6C38\u57CE\u5E02", "value": "411481" }], [{ "label": "\u6D49\u6CB3\u533A", "value": "411502" }, { "label": "\u5E73\u6865\u533A", "value": "411503" }, { "label": "\u7F57\u5C71\u53BF", "value": "411521" }, { "label": "\u5149\u5C71\u53BF", "value": "411522" }, { "label": "\u65B0\u53BF", "value": "411523" }, { "label": "\u5546\u57CE\u53BF", "value": "411524" }, { "label": "\u56FA\u59CB\u53BF", "value": "411525" }, { "label": "\u6F62\u5DDD\u53BF", "value": "411526" }, { "label": "\u6DEE\u6EE8\u53BF", "value": "411527" }, { "label": "\u606F\u53BF", "value": "411528" }, { "label": "\u4FE1\u9633\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u5F00\u53D1\u533A", "value": "411571" }], [{ "label": "\u5DDD\u6C47\u533A", "value": "411602" }, { "label": "\u6276\u6C9F\u53BF", "value": "411621" }, { "label": "\u897F\u534E\u53BF", "value": "411622" }, { "label": "\u5546\u6C34\u53BF", "value": "411623" }, { "label": "\u6C88\u4E18\u53BF", "value": "411624" }, { "label": "\u90F8\u57CE\u53BF", "value": "411625" }, { "label": "\u6DEE\u9633\u53BF", "value": "411626" }, { "label": "\u592A\u5EB7\u53BF", "value": "411627" }, { "label": "\u9E7F\u9091\u53BF", "value": "411628" }, { "label": "\u6CB3\u5357\u5468\u53E3\u7ECF\u6D4E\u5F00\u53D1\u533A", "value": "411671" }, { "label": "\u9879\u57CE\u5E02", "value": "411681" }], [{ "label": "\u9A7F\u57CE\u533A", "value": "411702" }, { "label": "\u897F\u5E73\u53BF", "value": "411721" }, { "label": "\u4E0A\u8521\u53BF", "value": "411722" }, { "label": "\u5E73\u8206\u53BF", "value": "411723" }, { "label": "\u6B63\u9633\u53BF", "value": "411724" }, { "label": "\u786E\u5C71\u53BF", "value": "411725" }, { "label": "\u6CCC\u9633\u53BF", "value": "411726" }, { "label": "\u6C5D\u5357\u53BF", "value": "411727" }, { "label": "\u9042\u5E73\u53BF", "value": "411728" }, { "label": "\u65B0\u8521\u53BF", "value": "411729" }, { "label": "\u6CB3\u5357\u9A7B\u9A6C\u5E97\u7ECF\u6D4E\u5F00\u53D1\u533A", "value": "411771" }], [{ "label": "\u6D4E\u6E90\u5E02", "value": "419001" }]], [[{ "label": "\u6C5F\u5CB8\u533A", "value": "420102" }, { "label": "\u6C5F\u6C49\u533A", "value": "420103" }, { "label": "\u785A\u53E3\u533A", "value": "420104" }, { "label": "\u6C49\u9633\u533A", "value": "420105" }, { "label": "\u6B66\u660C\u533A", "value": "420106" }, { "label": "\u9752\u5C71\u533A", "value": "420107" }, { "label": "\u6D2A\u5C71\u533A", "value": "420111" }, { "label": "\u4E1C\u897F\u6E56\u533A", "value": "420112" }, { "label": "\u6C49\u5357\u533A", "value": "420113" }, { "label": "\u8521\u7538\u533A", "value": "420114" }, { "label": "\u6C5F\u590F\u533A", "value": "420115" }, { "label": "\u9EC4\u9642\u533A", "value": "420116" }, { "label": "\u65B0\u6D32\u533A", "value": "420117" }], [{ "label": "\u9EC4\u77F3\u6E2F\u533A", "value": "420202" }, { "label": "\u897F\u585E\u5C71\u533A", "value": "420203" }, { "label": "\u4E0B\u9646\u533A", "value": "420204" }, { "label": "\u94C1\u5C71\u533A", "value": "420205" }, { "label": "\u9633\u65B0\u53BF", "value": "420222" }, { "label": "\u5927\u51B6\u5E02", "value": "420281" }], [{ "label": "\u8305\u7BAD\u533A", "value": "420302" }, { "label": "\u5F20\u6E7E\u533A", "value": "420303" }, { "label": "\u90E7\u9633\u533A", "value": "420304" }, { "label": "\u90E7\u897F\u53BF", "value": "420322" }, { "label": "\u7AF9\u5C71\u53BF", "value": "420323" }, { "label": "\u7AF9\u6EAA\u53BF", "value": "420324" }, { "label": "\u623F\u53BF", "value": "420325" }, { "label": "\u4E39\u6C5F\u53E3\u5E02", "value": "420381" }], [{ "label": "\u897F\u9675\u533A", "value": "420502" }, { "label": "\u4F0D\u5BB6\u5C97\u533A", "value": "420503" }, { "label": "\u70B9\u519B\u533A", "value": "420504" }, { "label": "\u7307\u4EAD\u533A", "value": "420505" }, { "label": "\u5937\u9675\u533A", "value": "420506" }, { "label": "\u8FDC\u5B89\u53BF", "value": "420525" }, { "label": "\u5174\u5C71\u53BF", "value": "420526" }, { "label": "\u79ED\u5F52\u53BF", "value": "420527" }, { "label": "\u957F\u9633\u571F\u5BB6\u65CF\u81EA\u6CBB\u53BF", "value": "420528" }, { "label": "\u4E94\u5CF0\u571F\u5BB6\u65CF\u81EA\u6CBB\u53BF", "value": "420529" }, { "label": "\u5B9C\u90FD\u5E02", "value": "420581" }, { "label": "\u5F53\u9633\u5E02", "value": "420582" }, { "label": "\u679D\u6C5F\u5E02", "value": "420583" }], [{ "label": "\u8944\u57CE\u533A", "value": "420602" }, { "label": "\u6A0A\u57CE\u533A", "value": "420606" }, { "label": "\u8944\u5DDE\u533A", "value": "420607" }, { "label": "\u5357\u6F33\u53BF", "value": "420624" }, { "label": "\u8C37\u57CE\u53BF", "value": "420625" }, { "label": "\u4FDD\u5EB7\u53BF", "value": "420626" }, { "label": "\u8001\u6CB3\u53E3\u5E02", "value": "420682" }, { "label": "\u67A3\u9633\u5E02", "value": "420683" }, { "label": "\u5B9C\u57CE\u5E02", "value": "420684" }], [{ "label": "\u6881\u5B50\u6E56\u533A", "value": "420702" }, { "label": "\u534E\u5BB9\u533A", "value": "420703" }, { "label": "\u9102\u57CE\u533A", "value": "420704" }], [{ "label": "\u4E1C\u5B9D\u533A", "value": "420802" }, { "label": "\u6387\u5200\u533A", "value": "420804" }, { "label": "\u4EAC\u5C71\u53BF", "value": "420821" }, { "label": "\u6C99\u6D0B\u53BF", "value": "420822" }, { "label": "\u949F\u7965\u5E02", "value": "420881" }], [{ "label": "\u5B5D\u5357\u533A", "value": "420902" }, { "label": "\u5B5D\u660C\u53BF", "value": "420921" }, { "label": "\u5927\u609F\u53BF", "value": "420922" }, { "label": "\u4E91\u68A6\u53BF", "value": "420923" }, { "label": "\u5E94\u57CE\u5E02", "value": "420981" }, { "label": "\u5B89\u9646\u5E02", "value": "420982" }, { "label": "\u6C49\u5DDD\u5E02", "value": "420984" }], [{ "label": "\u6C99\u5E02\u533A", "value": "421002" }, { "label": "\u8346\u5DDE\u533A", "value": "421003" }, { "label": "\u516C\u5B89\u53BF", "value": "421022" }, { "label": "\u76D1\u5229\u53BF", "value": "421023" }, { "label": "\u6C5F\u9675\u53BF", "value": "421024" }, { "label": "\u8346\u5DDE\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A", "value": "421071" }, { "label": "\u77F3\u9996\u5E02", "value": "421081" }, { "label": "\u6D2A\u6E56\u5E02", "value": "421083" }, { "label": "\u677E\u6ECB\u5E02", "value": "421087" }], [{ "label": "\u9EC4\u5DDE\u533A", "value": "421102" }, { "label": "\u56E2\u98CE\u53BF", "value": "421121" }, { "label": "\u7EA2\u5B89\u53BF", "value": "421122" }, { "label": "\u7F57\u7530\u53BF", "value": "421123" }, { "label": "\u82F1\u5C71\u53BF", "value": "421124" }, { "label": "\u6D60\u6C34\u53BF", "value": "421125" }, { "label": "\u8572\u6625\u53BF", "value": "421126" }, { "label": "\u9EC4\u6885\u53BF", "value": "421127" }, { "label": "\u9F99\u611F\u6E56\u7BA1\u7406\u533A", "value": "421171" }, { "label": "\u9EBB\u57CE\u5E02", "value": "421181" }, { "label": "\u6B66\u7A74\u5E02", "value": "421182" }], [{ "label": "\u54B8\u5B89\u533A", "value": "421202" }, { "label": "\u5609\u9C7C\u53BF", "value": "421221" }, { "label": "\u901A\u57CE\u53BF", "value": "421222" }, { "label": "\u5D07\u9633\u53BF", "value": "421223" }, { "label": "\u901A\u5C71\u53BF", "value": "421224" }, { "label": "\u8D64\u58C1\u5E02", "value": "421281" }], [{ "label": "\u66FE\u90FD\u533A", "value": "421303" }, { "label": "\u968F\u53BF", "value": "421321" }, { "label": "\u5E7F\u6C34\u5E02", "value": "421381" }], [{ "label": "\u6069\u65BD\u5E02", "value": "422801" }, { "label": "\u5229\u5DDD\u5E02", "value": "422802" }, { "label": "\u5EFA\u59CB\u53BF", "value": "422822" }, { "label": "\u5DF4\u4E1C\u53BF", "value": "422823" }, { "label": "\u5BA3\u6069\u53BF", "value": "422825" }, { "label": "\u54B8\u4E30\u53BF", "value": "422826" }, { "label": "\u6765\u51E4\u53BF", "value": "422827" }, { "label": "\u9E64\u5CF0\u53BF", "value": "422828" }], [{ "label": "\u4ED9\u6843\u5E02", "value": "429004" }, { "label": "\u6F5C\u6C5F\u5E02", "value": "429005" }, { "label": "\u5929\u95E8\u5E02", "value": "429006" }, { "label": "\u795E\u519C\u67B6\u6797\u533A", "value": "429021" }]], [[{ "label": "\u8299\u84C9\u533A", "value": "430102" }, { "label": "\u5929\u5FC3\u533A", "value": "430103" }, { "label": "\u5CB3\u9E93\u533A", "value": "430104" }, { "label": "\u5F00\u798F\u533A", "value": "430105" }, { "label": "\u96E8\u82B1\u533A", "value": "430111" }, { "label": "\u671B\u57CE\u533A", "value": "430112" }, { "label": "\u957F\u6C99\u53BF", "value": "430121" }, { "label": "\u6D4F\u9633\u5E02", "value": "430181" }, { "label": "\u5B81\u4E61\u5E02", "value": "430182" }], [{ "label": "\u8377\u5858\u533A", "value": "430202" }, { "label": "\u82A6\u6DDE\u533A", "value": "430203" }, { "label": "\u77F3\u5CF0\u533A", "value": "430204" }, { "label": "\u5929\u5143\u533A", "value": "430211" }, { "label": "\u682A\u6D32\u53BF", "value": "430221" }, { "label": "\u6538\u53BF", "value": "430223" }, { "label": "\u8336\u9675\u53BF", "value": "430224" }, { "label": "\u708E\u9675\u53BF", "value": "430225" }, { "label": "\u4E91\u9F99\u793A\u8303\u533A", "value": "430271" }, { "label": "\u91B4\u9675\u5E02", "value": "430281" }], [{ "label": "\u96E8\u6E56\u533A", "value": "430302" }, { "label": "\u5CB3\u5858\u533A", "value": "430304" }, { "label": "\u6E58\u6F6D\u53BF", "value": "430321" }, { "label": "\u6E56\u5357\u6E58\u6F6D\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u56ED\u533A", "value": "430371" }, { "label": "\u6E58\u6F6D\u662D\u5C71\u793A\u8303\u533A", "value": "430372" }, { "label": "\u6E58\u6F6D\u4E5D\u534E\u793A\u8303\u533A", "value": "430373" }, { "label": "\u6E58\u4E61\u5E02", "value": "430381" }, { "label": "\u97F6\u5C71\u5E02", "value": "430382" }], [{ "label": "\u73E0\u6656\u533A", "value": "430405" }, { "label": "\u96C1\u5CF0\u533A", "value": "430406" }, { "label": "\u77F3\u9F13\u533A", "value": "430407" }, { "label": "\u84B8\u6E58\u533A", "value": "430408" }, { "label": "\u5357\u5CB3\u533A", "value": "430412" }, { "label": "\u8861\u9633\u53BF", "value": "430421" }, { "label": "\u8861\u5357\u53BF", "value": "430422" }, { "label": "\u8861\u5C71\u53BF", "value": "430423" }, { "label": "\u8861\u4E1C\u53BF", "value": "430424" }, { "label": "\u7941\u4E1C\u53BF", "value": "430426" }, { "label": "\u8861\u9633\u7EFC\u5408\u4FDD\u7A0E\u533A", "value": "430471" }, { "label": "\u6E56\u5357\u8861\u9633\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u56ED\u533A", "value": "430472" }, { "label": "\u6E56\u5357\u8861\u9633\u677E\u6728\u7ECF\u6D4E\u5F00\u53D1\u533A", "value": "430473" }, { "label": "\u8012\u9633\u5E02", "value": "430481" }, { "label": "\u5E38\u5B81\u5E02", "value": "430482" }], [{ "label": "\u53CC\u6E05\u533A", "value": "430502" }, { "label": "\u5927\u7965\u533A", "value": "430503" }, { "label": "\u5317\u5854\u533A", "value": "430511" }, { "label": "\u90B5\u4E1C\u53BF", "value": "430521" }, { "label": "\u65B0\u90B5\u53BF", "value": "430522" }, { "label": "\u90B5\u9633\u53BF", "value": "430523" }, { "label": "\u9686\u56DE\u53BF", "value": "430524" }, { "label": "\u6D1E\u53E3\u53BF", "value": "430525" }, { "label": "\u7EE5\u5B81\u53BF", "value": "430527" }, { "label": "\u65B0\u5B81\u53BF", "value": "430528" }, { "label": "\u57CE\u6B65\u82D7\u65CF\u81EA\u6CBB\u53BF", "value": "430529" }, { "label": "\u6B66\u5188\u5E02", "value": "430581" }], [{ "label": "\u5CB3\u9633\u697C\u533A", "value": "430602" }, { "label": "\u4E91\u6EAA\u533A", "value": "430603" }, { "label": "\u541B\u5C71\u533A", "value": "430611" }, { "label": "\u5CB3\u9633\u53BF", "value": "430621" }, { "label": "\u534E\u5BB9\u53BF", "value": "430623" }, { "label": "\u6E58\u9634\u53BF", "value": "430624" }, { "label": "\u5E73\u6C5F\u53BF", "value": "430626" }, { "label": "\u5CB3\u9633\u5E02\u5C48\u539F\u7BA1\u7406\u533A", "value": "430671" }, { "label": "\u6C68\u7F57\u5E02", "value": "430681" }, { "label": "\u4E34\u6E58\u5E02", "value": "430682" }], [{ "label": "\u6B66\u9675\u533A", "value": "430702" }, { "label": "\u9F0E\u57CE\u533A", "value": "430703" }, { "label": "\u5B89\u4E61\u53BF", "value": "430721" }, { "label": "\u6C49\u5BFF\u53BF", "value": "430722" }, { "label": "\u6FA7\u53BF", "value": "430723" }, { "label": "\u4E34\u6FA7\u53BF", "value": "430724" }, { "label": "\u6843\u6E90\u53BF", "value": "430725" }, { "label": "\u77F3\u95E8\u53BF", "value": "430726" }, { "label": "\u5E38\u5FB7\u5E02\u897F\u6D1E\u5EAD\u7BA1\u7406\u533A", "value": "430771" }, { "label": "\u6D25\u5E02\u5E02", "value": "430781" }], [{ "label": "\u6C38\u5B9A\u533A", "value": "430802" }, { "label": "\u6B66\u9675\u6E90\u533A", "value": "430811" }, { "label": "\u6148\u5229\u53BF", "value": "430821" }, { "label": "\u6851\u690D\u53BF", "value": "430822" }], [{ "label": "\u8D44\u9633\u533A", "value": "430902" }, { "label": "\u8D6B\u5C71\u533A", "value": "430903" }, { "label": "\u5357\u53BF", "value": "430921" }, { "label": "\u6843\u6C5F\u53BF", "value": "430922" }, { "label": "\u5B89\u5316\u53BF", "value": "430923" }, { "label": "\u76CA\u9633\u5E02\u5927\u901A\u6E56\u7BA1\u7406\u533A", "value": "430971" }, { "label": "\u6E56\u5357\u76CA\u9633\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u56ED\u533A", "value": "430972" }, { "label": "\u6C85\u6C5F\u5E02", "value": "430981" }], [{ "label": "\u5317\u6E56\u533A", "value": "431002" }, { "label": "\u82CF\u4ED9\u533A", "value": "431003" }, { "label": "\u6842\u9633\u53BF", "value": "431021" }, { "label": "\u5B9C\u7AE0\u53BF", "value": "431022" }, { "label": "\u6C38\u5174\u53BF", "value": "431023" }, { "label": "\u5609\u79BE\u53BF", "value": "431024" }, { "label": "\u4E34\u6B66\u53BF", "value": "431025" }, { "label": "\u6C5D\u57CE\u53BF", "value": "431026" }, { "label": "\u6842\u4E1C\u53BF", "value": "431027" }, { "label": "\u5B89\u4EC1\u53BF", "value": "431028" }, { "label": "\u8D44\u5174\u5E02", "value": "431081" }], [{ "label": "\u96F6\u9675\u533A", "value": "431102" }, { "label": "\u51B7\u6C34\u6EE9\u533A", "value": "431103" }, { "label": "\u7941\u9633\u53BF", "value": "431121" }, { "label": "\u4E1C\u5B89\u53BF", "value": "431122" }, { "label": "\u53CC\u724C\u53BF", "value": "431123" }, { "label": "\u9053\u53BF", "value": "431124" }, { "label": "\u6C5F\u6C38\u53BF", "value": "431125" }, { "label": "\u5B81\u8FDC\u53BF", "value": "431126" }, { "label": "\u84DD\u5C71\u53BF", "value": "431127" }, { "label": "\u65B0\u7530\u53BF", "value": "431128" }, { "label": "\u6C5F\u534E\u7476\u65CF\u81EA\u6CBB\u53BF", "value": "431129" }, { "label": "\u6C38\u5DDE\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A", "value": "431171" }, { "label": "\u6C38\u5DDE\u5E02\u91D1\u6D1E\u7BA1\u7406\u533A", "value": "431172" }, { "label": "\u6C38\u5DDE\u5E02\u56DE\u9F99\u5729\u7BA1\u7406\u533A", "value": "431173" }], [{ "label": "\u9E64\u57CE\u533A", "value": "431202" }, { "label": "\u4E2D\u65B9\u53BF", "value": "431221" }, { "label": "\u6C85\u9675\u53BF", "value": "431222" }, { "label": "\u8FB0\u6EAA\u53BF", "value": "431223" }, { "label": "\u6E86\u6D66\u53BF", "value": "431224" }, { "label": "\u4F1A\u540C\u53BF", "value": "431225" }, { "label": "\u9EBB\u9633\u82D7\u65CF\u81EA\u6CBB\u53BF", "value": "431226" }, { "label": "\u65B0\u6643\u4F97\u65CF\u81EA\u6CBB\u53BF", "value": "431227" }, { "label": "\u82B7\u6C5F\u4F97\u65CF\u81EA\u6CBB\u53BF", "value": "431228" }, { "label": "\u9756\u5DDE\u82D7\u65CF\u4F97\u65CF\u81EA\u6CBB\u53BF", "value": "431229" }, { "label": "\u901A\u9053\u4F97\u65CF\u81EA\u6CBB\u53BF", "value": "431230" }, { "label": "\u6000\u5316\u5E02\u6D2A\u6C5F\u7BA1\u7406\u533A", "value": "431271" }, { "label": "\u6D2A\u6C5F\u5E02", "value": "431281" }], [{ "label": "\u5A04\u661F\u533A", "value": "431302" }, { "label": "\u53CC\u5CF0\u53BF", "value": "431321" }, { "label": "\u65B0\u5316\u53BF", "value": "431322" }, { "label": "\u51B7\u6C34\u6C5F\u5E02", "value": "431381" }, { "label": "\u6D9F\u6E90\u5E02", "value": "431382" }], [{ "label": "\u5409\u9996\u5E02", "value": "433101" }, { "label": "\u6CF8\u6EAA\u53BF", "value": "433122" }, { "label": "\u51E4\u51F0\u53BF", "value": "433123" }, { "label": "\u82B1\u57A3\u53BF", "value": "433124" }, { "label": "\u4FDD\u9756\u53BF", "value": "433125" }, { "label": "\u53E4\u4E08\u53BF", "value": "433126" }, { "label": "\u6C38\u987A\u53BF", "value": "433127" }, { "label": "\u9F99\u5C71\u53BF", "value": "433130" }, { "label": "\u6E56\u5357\u5409\u9996\u7ECF\u6D4E\u5F00\u53D1\u533A", "value": "433172" }, { "label": "\u6E56\u5357\u6C38\u987A\u7ECF\u6D4E\u5F00\u53D1\u533A", "value": "433173" }]], [[{ "label": "\u8354\u6E7E\u533A", "value": "440103" }, { "label": "\u8D8A\u79C0\u533A", "value": "440104" }, { "label": "\u6D77\u73E0\u533A", "value": "440105" }, { "label": "\u5929\u6CB3\u533A", "value": "440106" }, { "label": "\u767D\u4E91\u533A", "value": "440111" }, { "label": "\u9EC4\u57D4\u533A", "value": "440112" }, { "label": "\u756A\u79BA\u533A", "value": "440113" }, { "label": "\u82B1\u90FD\u533A", "value": "440114" }, { "label": "\u5357\u6C99\u533A", "value": "440115" }, { "label": "\u4ECE\u5316\u533A", "value": "440117" }, { "label": "\u589E\u57CE\u533A", "value": "440118" }], [{ "label": "\u6B66\u6C5F\u533A", "value": "440203" }, { "label": "\u6D48\u6C5F\u533A", "value": "440204" }, { "label": "\u66F2\u6C5F\u533A", "value": "440205" }, { "label": "\u59CB\u5174\u53BF", "value": "440222" }, { "label": "\u4EC1\u5316\u53BF", "value": "440224" }, { "label": "\u7FC1\u6E90\u53BF", "value": "440229" }, { "label": "\u4E73\u6E90\u7476\u65CF\u81EA\u6CBB\u53BF", "value": "440232" }, { "label": "\u65B0\u4E30\u53BF", "value": "440233" }, { "label": "\u4E50\u660C\u5E02", "value": "440281" }, { "label": "\u5357\u96C4\u5E02", "value": "440282" }], [{ "label": "\u7F57\u6E56\u533A", "value": "440303" }, { "label": "\u798F\u7530\u533A", "value": "440304" }, { "label": "\u5357\u5C71\u533A", "value": "440305" }, { "label": "\u5B9D\u5B89\u533A", "value": "440306" }, { "label": "\u9F99\u5C97\u533A", "value": "440307" }, { "label": "\u76D0\u7530\u533A", "value": "440308" }, { "label": "\u9F99\u534E\u533A", "value": "440309" }, { "label": "\u576A\u5C71\u533A", "value": "440310" }], [{ "label": "\u9999\u6D32\u533A", "value": "440402" }, { "label": "\u6597\u95E8\u533A", "value": "440403" }, { "label": "\u91D1\u6E7E\u533A", "value": "440404" }], [{ "label": "\u9F99\u6E56\u533A", "value": "440507" }, { "label": "\u91D1\u5E73\u533A", "value": "440511" }, { "label": "\u6FE0\u6C5F\u533A", "value": "440512" }, { "label": "\u6F6E\u9633\u533A", "value": "440513" }, { "label": "\u6F6E\u5357\u533A", "value": "440514" }, { "label": "\u6F84\u6D77\u533A", "value": "440515" }, { "label": "\u5357\u6FB3\u53BF", "value": "440523" }], [{ "label": "\u7985\u57CE\u533A", "value": "440604" }, { "label": "\u5357\u6D77\u533A", "value": "440605" }, { "label": "\u987A\u5FB7\u533A", "value": "440606" }, { "label": "\u4E09\u6C34\u533A", "value": "440607" }, { "label": "\u9AD8\u660E\u533A", "value": "440608" }], [{ "label": "\u84EC\u6C5F\u533A", "value": "440703" }, { "label": "\u6C5F\u6D77\u533A", "value": "440704" }, { "label": "\u65B0\u4F1A\u533A", "value": "440705" }, { "label": "\u53F0\u5C71\u5E02", "value": "440781" }, { "label": "\u5F00\u5E73\u5E02", "value": "440783" }, { "label": "\u9E64\u5C71\u5E02", "value": "440784" }, { "label": "\u6069\u5E73\u5E02", "value": "440785" }], [{ "label": "\u8D64\u574E\u533A", "value": "440802" }, { "label": "\u971E\u5C71\u533A", "value": "440803" }, { "label": "\u5761\u5934\u533A", "value": "440804" }, { "label": "\u9EBB\u7AE0\u533A", "value": "440811" }, { "label": "\u9042\u6EAA\u53BF", "value": "440823" }, { "label": "\u5F90\u95FB\u53BF", "value": "440825" }, { "label": "\u5EC9\u6C5F\u5E02", "value": "440881" }, { "label": "\u96F7\u5DDE\u5E02", "value": "440882" }, { "label": "\u5434\u5DDD\u5E02", "value": "440883" }], [{ "label": "\u8302\u5357\u533A", "value": "440902" }, { "label": "\u7535\u767D\u533A", "value": "440904" }, { "label": "\u9AD8\u5DDE\u5E02", "value": "440981" }, { "label": "\u5316\u5DDE\u5E02", "value": "440982" }, { "label": "\u4FE1\u5B9C\u5E02", "value": "440983" }], [{ "label": "\u7AEF\u5DDE\u533A", "value": "441202" }, { "label": "\u9F0E\u6E56\u533A", "value": "441203" }, { "label": "\u9AD8\u8981\u533A", "value": "441204" }, { "label": "\u5E7F\u5B81\u53BF", "value": "441223" }, { "label": "\u6000\u96C6\u53BF", "value": "441224" }, { "label": "\u5C01\u5F00\u53BF", "value": "441225" }, { "label": "\u5FB7\u5E86\u53BF", "value": "441226" }, { "label": "\u56DB\u4F1A\u5E02", "value": "441284" }], [{ "label": "\u60E0\u57CE\u533A", "value": "441302" }, { "label": "\u60E0\u9633\u533A", "value": "441303" }, { "label": "\u535A\u7F57\u53BF", "value": "441322" }, { "label": "\u60E0\u4E1C\u53BF", "value": "441323" }, { "label": "\u9F99\u95E8\u53BF", "value": "441324" }], [{ "label": "\u6885\u6C5F\u533A", "value": "441402" }, { "label": "\u6885\u53BF\u533A", "value": "441403" }, { "label": "\u5927\u57D4\u53BF", "value": "441422" }, { "label": "\u4E30\u987A\u53BF", "value": "441423" }, { "label": "\u4E94\u534E\u53BF", "value": "441424" }, { "label": "\u5E73\u8FDC\u53BF", "value": "441426" }, { "label": "\u8549\u5CAD\u53BF", "value": "441427" }, { "label": "\u5174\u5B81\u5E02", "value": "441481" }], [{ "label": "\u57CE\u533A", "value": "441502" }, { "label": "\u6D77\u4E30\u53BF", "value": "441521" }, { "label": "\u9646\u6CB3\u53BF", "value": "441523" }, { "label": "\u9646\u4E30\u5E02", "value": "441581" }], [{ "label": "\u6E90\u57CE\u533A", "value": "441602" }, { "label": "\u7D2B\u91D1\u53BF", "value": "441621" }, { "label": "\u9F99\u5DDD\u53BF", "value": "441622" }, { "label": "\u8FDE\u5E73\u53BF", "value": "441623" }, { "label": "\u548C\u5E73\u53BF", "value": "441624" }, { "label": "\u4E1C\u6E90\u53BF", "value": "441625" }], [{ "label": "\u6C5F\u57CE\u533A", "value": "441702" }, { "label": "\u9633\u4E1C\u533A", "value": "441704" }, { "label": "\u9633\u897F\u53BF", "value": "441721" }, { "label": "\u9633\u6625\u5E02", "value": "441781" }], [{ "label": "\u6E05\u57CE\u533A", "value": "441802" }, { "label": "\u6E05\u65B0\u533A", "value": "441803" }, { "label": "\u4F5B\u5188\u53BF", "value": "441821" }, { "label": "\u9633\u5C71\u53BF", "value": "441823" }, { "label": "\u8FDE\u5C71\u58EE\u65CF\u7476\u65CF\u81EA\u6CBB\u53BF", "value": "441825" }, { "label": "\u8FDE\u5357\u7476\u65CF\u81EA\u6CBB\u53BF", "value": "441826" }, { "label": "\u82F1\u5FB7\u5E02", "value": "441881" }, { "label": "\u8FDE\u5DDE\u5E02", "value": "441882" }], [{ "label": "\u4E1C\u839E\u5E02", "value": "441900" }], [{ "label": "\u4E2D\u5C71\u5E02", "value": "442000" }], [{ "label": "\u6E58\u6865\u533A", "value": "445102" }, { "label": "\u6F6E\u5B89\u533A", "value": "445103" }, { "label": "\u9976\u5E73\u53BF", "value": "445122" }], [{ "label": "\u6995\u57CE\u533A", "value": "445202" }, { "label": "\u63ED\u4E1C\u533A", "value": "445203" }, { "label": "\u63ED\u897F\u53BF", "value": "445222" }, { "label": "\u60E0\u6765\u53BF", "value": "445224" }, { "label": "\u666E\u5B81\u5E02", "value": "445281" }], [{ "label": "\u4E91\u57CE\u533A", "value": "445302" }, { "label": "\u4E91\u5B89\u533A", "value": "445303" }, { "label": "\u65B0\u5174\u53BF", "value": "445321" }, { "label": "\u90C1\u5357\u53BF", "value": "445322" }, { "label": "\u7F57\u5B9A\u5E02", "value": "445381" }]], [[{ "label": "\u5174\u5B81\u533A", "value": "450102" }, { "label": "\u9752\u79C0\u533A", "value": "450103" }, { "label": "\u6C5F\u5357\u533A", "value": "450105" }, { "label": "\u897F\u4E61\u5858\u533A", "value": "450107" }, { "label": "\u826F\u5E86\u533A", "value": "450108" }, { "label": "\u9095\u5B81\u533A", "value": "450109" }, { "label": "\u6B66\u9E23\u533A", "value": "450110" }, { "label": "\u9686\u5B89\u53BF", "value": "450123" }, { "label": "\u9A6C\u5C71\u53BF", "value": "450124" }, { "label": "\u4E0A\u6797\u53BF", "value": "450125" }, { "label": "\u5BBE\u9633\u53BF", "value": "450126" }, { "label": "\u6A2A\u53BF", "value": "450127" }], [{ "label": "\u57CE\u4E2D\u533A", "value": "450202" }, { "label": "\u9C7C\u5CF0\u533A", "value": "450203" }, { "label": "\u67F3\u5357\u533A", "value": "450204" }, { "label": "\u67F3\u5317\u533A", "value": "450205" }, { "label": "\u67F3\u6C5F\u533A", "value": "450206" }, { "label": "\u67F3\u57CE\u53BF", "value": "450222" }, { "label": "\u9E7F\u5BE8\u53BF", "value": "450223" }, { "label": "\u878D\u5B89\u53BF", "value": "450224" }, { "label": "\u878D\u6C34\u82D7\u65CF\u81EA\u6CBB\u53BF", "value": "450225" }, { "label": "\u4E09\u6C5F\u4F97\u65CF\u81EA\u6CBB\u53BF", "value": "450226" }], [{ "label": "\u79C0\u5CF0\u533A", "value": "450302" }, { "label": "\u53E0\u5F69\u533A", "value": "450303" }, { "label": "\u8C61\u5C71\u533A", "value": "450304" }, { "label": "\u4E03\u661F\u533A", "value": "450305" }, { "label": "\u96C1\u5C71\u533A", "value": "450311" }, { "label": "\u4E34\u6842\u533A", "value": "450312" }, { "label": "\u9633\u6714\u53BF", "value": "450321" }, { "label": "\u7075\u5DDD\u53BF", "value": "450323" }, { "label": "\u5168\u5DDE\u53BF", "value": "450324" }, { "label": "\u5174\u5B89\u53BF", "value": "450325" }, { "label": "\u6C38\u798F\u53BF", "value": "450326" }, { "label": "\u704C\u9633\u53BF", "value": "450327" }, { "label": "\u9F99\u80DC\u5404\u65CF\u81EA\u6CBB\u53BF", "value": "450328" }, { "label": "\u8D44\u6E90\u53BF", "value": "450329" }, { "label": "\u5E73\u4E50\u53BF", "value": "450330" }, { "label": "\u8354\u6D66\u53BF", "value": "450331" }, { "label": "\u606D\u57CE\u7476\u65CF\u81EA\u6CBB\u53BF", "value": "450332" }], [{ "label": "\u4E07\u79C0\u533A", "value": "450403" }, { "label": "\u957F\u6D32\u533A", "value": "450405" }, { "label": "\u9F99\u5729\u533A", "value": "450406" }, { "label": "\u82CD\u68A7\u53BF", "value": "450421" }, { "label": "\u85E4\u53BF", "value": "450422" }, { "label": "\u8499\u5C71\u53BF", "value": "450423" }, { "label": "\u5C91\u6EAA\u5E02", "value": "450481" }], [{ "label": "\u6D77\u57CE\u533A", "value": "450502" }, { "label": "\u94F6\u6D77\u533A", "value": "450503" }, { "label": "\u94C1\u5C71\u6E2F\u533A", "value": "450512" }, { "label": "\u5408\u6D66\u53BF", "value": "450521" }], [{ "label": "\u6E2F\u53E3\u533A", "value": "450602" }, { "label": "\u9632\u57CE\u533A", "value": "450603" }, { "label": "\u4E0A\u601D\u53BF", "value": "450621" }, { "label": "\u4E1C\u5174\u5E02", "value": "450681" }], [{ "label": "\u94A6\u5357\u533A", "value": "450702" }, { "label": "\u94A6\u5317\u533A", "value": "450703" }, { "label": "\u7075\u5C71\u53BF", "value": "450721" }, { "label": "\u6D66\u5317\u53BF", "value": "450722" }], [{ "label": "\u6E2F\u5317\u533A", "value": "450802" }, { "label": "\u6E2F\u5357\u533A", "value": "450803" }, { "label": "\u8983\u5858\u533A", "value": "450804" }, { "label": "\u5E73\u5357\u53BF", "value": "450821" }, { "label": "\u6842\u5E73\u5E02", "value": "450881" }], [{ "label": "\u7389\u5DDE\u533A", "value": "450902" }, { "label": "\u798F\u7EF5\u533A", "value": "450903" }, { "label": "\u5BB9\u53BF", "value": "450921" }, { "label": "\u9646\u5DDD\u53BF", "value": "450922" }, { "label": "\u535A\u767D\u53BF", "value": "450923" }, { "label": "\u5174\u4E1A\u53BF", "value": "450924" }, { "label": "\u5317\u6D41\u5E02", "value": "450981" }], [{ "label": "\u53F3\u6C5F\u533A", "value": "451002" }, { "label": "\u7530\u9633\u53BF", "value": "451021" }, { "label": "\u7530\u4E1C\u53BF", "value": "451022" }, { "label": "\u5E73\u679C\u53BF", "value": "451023" }, { "label": "\u5FB7\u4FDD\u53BF", "value": "451024" }, { "label": "\u90A3\u5761\u53BF", "value": "451026" }, { "label": "\u51CC\u4E91\u53BF", "value": "451027" }, { "label": "\u4E50\u4E1A\u53BF", "value": "451028" }, { "label": "\u7530\u6797\u53BF", "value": "451029" }, { "label": "\u897F\u6797\u53BF", "value": "451030" }, { "label": "\u9686\u6797\u5404\u65CF\u81EA\u6CBB\u53BF", "value": "451031" }, { "label": "\u9756\u897F\u5E02", "value": "451081" }], [{ "label": "\u516B\u6B65\u533A", "value": "451102" }, { "label": "\u5E73\u6842\u533A", "value": "451103" }, { "label": "\u662D\u5E73\u53BF", "value": "451121" }, { "label": "\u949F\u5C71\u53BF", "value": "451122" }, { "label": "\u5BCC\u5DDD\u7476\u65CF\u81EA\u6CBB\u53BF", "value": "451123" }], [{ "label": "\u91D1\u57CE\u6C5F\u533A", "value": "451202" }, { "label": "\u5B9C\u5DDE\u533A", "value": "451203" }, { "label": "\u5357\u4E39\u53BF", "value": "451221" }, { "label": "\u5929\u5CE8\u53BF", "value": "451222" }, { "label": "\u51E4\u5C71\u53BF", "value": "451223" }, { "label": "\u4E1C\u5170\u53BF", "value": "451224" }, { "label": "\u7F57\u57CE\u4EEB\u4F6C\u65CF\u81EA\u6CBB\u53BF", "value": "451225" }, { "label": "\u73AF\u6C5F\u6BDB\u5357\u65CF\u81EA\u6CBB\u53BF", "value": "451226" }, { "label": "\u5DF4\u9A6C\u7476\u65CF\u81EA\u6CBB\u53BF", "value": "451227" }, { "label": "\u90FD\u5B89\u7476\u65CF\u81EA\u6CBB\u53BF", "value": "451228" }, { "label": "\u5927\u5316\u7476\u65CF\u81EA\u6CBB\u53BF", "value": "451229" }], [{ "label": "\u5174\u5BBE\u533A", "value": "451302" }, { "label": "\u5FFB\u57CE\u53BF", "value": "451321" }, { "label": "\u8C61\u5DDE\u53BF", "value": "451322" }, { "label": "\u6B66\u5BA3\u53BF", "value": "451323" }, { "label": "\u91D1\u79C0\u7476\u65CF\u81EA\u6CBB\u53BF", "value": "451324" }, { "label": "\u5408\u5C71\u5E02", "value": "451381" }], [{ "label": "\u6C5F\u5DDE\u533A", "value": "451402" }, { "label": "\u6276\u7EE5\u53BF", "value": "451421" }, { "label": "\u5B81\u660E\u53BF", "value": "451422" }, { "label": "\u9F99\u5DDE\u53BF", "value": "451423" }, { "label": "\u5927\u65B0\u53BF", "value": "451424" }, { "label": "\u5929\u7B49\u53BF", "value": "451425" }, { "label": "\u51ED\u7965\u5E02", "value": "451481" }]], [[{ "label": "\u79C0\u82F1\u533A", "value": "460105" }, { "label": "\u9F99\u534E\u533A", "value": "460106" }, { "label": "\u743C\u5C71\u533A", "value": "460107" }, { "label": "\u7F8E\u5170\u533A", "value": "460108" }], [{ "label": "\u6D77\u68E0\u533A", "value": "460202" }, { "label": "\u5409\u9633\u533A", "value": "460203" }, { "label": "\u5929\u6DAF\u533A", "value": "460204" }, { "label": "\u5D16\u5DDE\u533A", "value": "460205" }], [{ "label": "\u897F\u6C99\u7FA4\u5C9B", "value": "460321" }, { "label": "\u5357\u6C99\u7FA4\u5C9B", "value": "460322" }, { "label": "\u4E2D\u6C99\u7FA4\u5C9B\u7684\u5C9B\u7901\u53CA\u5176\u6D77\u57DF", "value": "460323" }], [{ "label": "\u510B\u5DDE\u5E02", "value": "460400" }], [{ "label": "\u4E94\u6307\u5C71\u5E02", "value": "469001" }, { "label": "\u743C\u6D77\u5E02", "value": "469002" }, { "label": "\u6587\u660C\u5E02", "value": "469005" }, { "label": "\u4E07\u5B81\u5E02", "value": "469006" }, { "label": "\u4E1C\u65B9\u5E02", "value": "469007" }, { "label": "\u5B9A\u5B89\u53BF", "value": "469021" }, { "label": "\u5C6F\u660C\u53BF", "value": "469022" }, { "label": "\u6F84\u8FC8\u53BF", "value": "469023" }, { "label": "\u4E34\u9AD8\u53BF", "value": "469024" }, { "label": "\u767D\u6C99\u9ECE\u65CF\u81EA\u6CBB\u53BF", "value": "469025" }, { "label": "\u660C\u6C5F\u9ECE\u65CF\u81EA\u6CBB\u53BF", "value": "469026" }, { "label": "\u4E50\u4E1C\u9ECE\u65CF\u81EA\u6CBB\u53BF", "value": "469027" }, { "label": "\u9675\u6C34\u9ECE\u65CF\u81EA\u6CBB\u53BF", "value": "469028" }, { "label": "\u4FDD\u4EAD\u9ECE\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF", "value": "469029" }, { "label": "\u743C\u4E2D\u9ECE\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF", "value": "469030" }]], [[{ "label": "\u4E07\u5DDE\u533A", "value": "500101" }, { "label": "\u6DAA\u9675\u533A", "value": "500102" }, { "label": "\u6E1D\u4E2D\u533A", "value": "500103" }, { "label": "\u5927\u6E21\u53E3\u533A", "value": "500104" }, { "label": "\u6C5F\u5317\u533A", "value": "500105" }, { "label": "\u6C99\u576A\u575D\u533A", "value": "500106" }, { "label": "\u4E5D\u9F99\u5761\u533A", "value": "500107" }, { "label": "\u5357\u5CB8\u533A", "value": "500108" }, { "label": "\u5317\u789A\u533A", "value": "500109" }, { "label": "\u7DA6\u6C5F\u533A", "value": "500110" }, { "label": "\u5927\u8DB3\u533A", "value": "500111" }, { "label": "\u6E1D\u5317\u533A", "value": "500112" }, { "label": "\u5DF4\u5357\u533A", "value": "500113" }, { "label": "\u9ED4\u6C5F\u533A", "value": "500114" }, { "label": "\u957F\u5BFF\u533A", "value": "500115" }, { "label": "\u6C5F\u6D25\u533A", "value": "500116" }, { "label": "\u5408\u5DDD\u533A", "value": "500117" }, { "label": "\u6C38\u5DDD\u533A", "value": "500118" }, { "label": "\u5357\u5DDD\u533A", "value": "500119" }, { "label": "\u74A7\u5C71\u533A", "value": "500120" }, { "label": "\u94DC\u6881\u533A", "value": "500151" }, { "label": "\u6F7C\u5357\u533A", "value": "500152" }, { "label": "\u8363\u660C\u533A", "value": "500153" }, { "label": "\u5F00\u5DDE\u533A", "value": "500154" }, { "label": "\u6881\u5E73\u533A", "value": "500155" }, { "label": "\u6B66\u9686\u533A", "value": "500156" }], [{ "label": "\u57CE\u53E3\u53BF", "value": "500229" }, { "label": "\u4E30\u90FD\u53BF", "value": "500230" }, { "label": "\u57AB\u6C5F\u53BF", "value": "500231" }, { "label": "\u5FE0\u53BF", "value": "500233" }, { "label": "\u4E91\u9633\u53BF", "value": "500235" }, { "label": "\u5949\u8282\u53BF", "value": "500236" }, { "label": "\u5DEB\u5C71\u53BF", "value": "500237" }, { "label": "\u5DEB\u6EAA\u53BF", "value": "500238" }, { "label": "\u77F3\u67F1\u571F\u5BB6\u65CF\u81EA\u6CBB\u53BF", "value": "500240" }, { "label": "\u79C0\u5C71\u571F\u5BB6\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF", "value": "500241" }, { "label": "\u9149\u9633\u571F\u5BB6\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF", "value": "500242" }, { "label": "\u5F6D\u6C34\u82D7\u65CF\u571F\u5BB6\u65CF\u81EA\u6CBB\u53BF", "value": "500243" }]], [[{ "label": "\u9526\u6C5F\u533A", "value": "510104" }, { "label": "\u9752\u7F8A\u533A", "value": "510105" }, { "label": "\u91D1\u725B\u533A", "value": "510106" }, { "label": "\u6B66\u4FAF\u533A", "value": "510107" }, { "label": "\u6210\u534E\u533A", "value": "510108" }, { "label": "\u9F99\u6CC9\u9A7F\u533A", "value": "510112" }, { "label": "\u9752\u767D\u6C5F\u533A", "value": "510113" }, { "label": "\u65B0\u90FD\u533A", "value": "510114" }, { "label": "\u6E29\u6C5F\u533A", "value": "510115" }, { "label": "\u53CC\u6D41\u533A", "value": "510116" }, { "label": "\u90EB\u90FD\u533A", "value": "510117" }, { "label": "\u91D1\u5802\u53BF", "value": "510121" }, { "label": "\u5927\u9091\u53BF", "value": "510129" }, { "label": "\u84B2\u6C5F\u53BF", "value": "510131" }, { "label": "\u65B0\u6D25\u53BF", "value": "510132" }, { "label": "\u90FD\u6C5F\u5830\u5E02", "value": "510181" }, { "label": "\u5F6D\u5DDE\u5E02", "value": "510182" }, { "label": "\u909B\u5D03\u5E02", "value": "510183" }, { "label": "\u5D07\u5DDE\u5E02", "value": "510184" }, { "label": "\u7B80\u9633\u5E02", "value": "510185" }], [{ "label": "\u81EA\u6D41\u4E95\u533A", "value": "510302" }, { "label": "\u8D21\u4E95\u533A", "value": "510303" }, { "label": "\u5927\u5B89\u533A", "value": "510304" }, { "label": "\u6CBF\u6EE9\u533A", "value": "510311" }, { "label": "\u8363\u53BF", "value": "510321" }, { "label": "\u5BCC\u987A\u53BF", "value": "510322" }], [{ "label": "\u4E1C\u533A", "value": "510402" }, { "label": "\u897F\u533A", "value": "510403" }, { "label": "\u4EC1\u548C\u533A", "value": "510411" }, { "label": "\u7C73\u6613\u53BF", "value": "510421" }, { "label": "\u76D0\u8FB9\u53BF", "value": "510422" }], [{ "label": "\u6C5F\u9633\u533A", "value": "510502" }, { "label": "\u7EB3\u6EAA\u533A", "value": "510503" }, { "label": "\u9F99\u9A6C\u6F6D\u533A", "value": "510504" }, { "label": "\u6CF8\u53BF", "value": "510521" }, { "label": "\u5408\u6C5F\u53BF", "value": "510522" }, { "label": "\u53D9\u6C38\u53BF", "value": "510524" }, { "label": "\u53E4\u853A\u53BF", "value": "510525" }], [{ "label": "\u65CC\u9633\u533A", "value": "510603" }, { "label": "\u7F57\u6C5F\u533A", "value": "510604" }, { "label": "\u4E2D\u6C5F\u53BF", "value": "510623" }, { "label": "\u5E7F\u6C49\u5E02", "value": "510681" }, { "label": "\u4EC0\u90A1\u5E02", "value": "510682" }, { "label": "\u7EF5\u7AF9\u5E02", "value": "510683" }], [{ "label": "\u6DAA\u57CE\u533A", "value": "510703" }, { "label": "\u6E38\u4ED9\u533A", "value": "510704" }, { "label": "\u5B89\u5DDE\u533A", "value": "510705" }, { "label": "\u4E09\u53F0\u53BF", "value": "510722" }, { "label": "\u76D0\u4EAD\u53BF", "value": "510723" }, { "label": "\u6893\u6F7C\u53BF", "value": "510725" }, { "label": "\u5317\u5DDD\u7F8C\u65CF\u81EA\u6CBB\u53BF", "value": "510726" }, { "label": "\u5E73\u6B66\u53BF", "value": "510727" }, { "label": "\u6C5F\u6CB9\u5E02", "value": "510781" }], [{ "label": "\u5229\u5DDE\u533A", "value": "510802" }, { "label": "\u662D\u5316\u533A", "value": "510811" }, { "label": "\u671D\u5929\u533A", "value": "510812" }, { "label": "\u65FA\u82CD\u53BF", "value": "510821" }, { "label": "\u9752\u5DDD\u53BF", "value": "510822" }, { "label": "\u5251\u9601\u53BF", "value": "510823" }, { "label": "\u82CD\u6EAA\u53BF", "value": "510824" }], [{ "label": "\u8239\u5C71\u533A", "value": "510903" }, { "label": "\u5B89\u5C45\u533A", "value": "510904" }, { "label": "\u84EC\u6EAA\u53BF", "value": "510921" }, { "label": "\u5C04\u6D2A\u53BF", "value": "510922" }, { "label": "\u5927\u82F1\u53BF", "value": "510923" }], [{ "label": "\u5E02\u4E2D\u533A", "value": "511002" }, { "label": "\u4E1C\u5174\u533A", "value": "511011" }, { "label": "\u5A01\u8FDC\u53BF", "value": "511024" }, { "label": "\u8D44\u4E2D\u53BF", "value": "511025" }, { "label": "\u5185\u6C5F\u7ECF\u6D4E\u5F00\u53D1\u533A", "value": "511071" }, { "label": "\u9686\u660C\u5E02", "value": "511083" }], [{ "label": "\u5E02\u4E2D\u533A", "value": "511102" }, { "label": "\u6C99\u6E7E\u533A", "value": "511111" }, { "label": "\u4E94\u901A\u6865\u533A", "value": "511112" }, { "label": "\u91D1\u53E3\u6CB3\u533A", "value": "511113" }, { "label": "\u728D\u4E3A\u53BF", "value": "511123" }, { "label": "\u4E95\u7814\u53BF", "value": "511124" }, { "label": "\u5939\u6C5F\u53BF", "value": "511126" }, { "label": "\u6C90\u5DDD\u53BF", "value": "511129" }, { "label": "\u5CE8\u8FB9\u5F5D\u65CF\u81EA\u6CBB\u53BF", "value": "511132" }, { "label": "\u9A6C\u8FB9\u5F5D\u65CF\u81EA\u6CBB\u53BF", "value": "511133" }, { "label": "\u5CE8\u7709\u5C71\u5E02", "value": "511181" }], [{ "label": "\u987A\u5E86\u533A", "value": "511302" }, { "label": "\u9AD8\u576A\u533A", "value": "511303" }, { "label": "\u5609\u9675\u533A", "value": "511304" }, { "label": "\u5357\u90E8\u53BF", "value": "511321" }, { "label": "\u8425\u5C71\u53BF", "value": "511322" }, { "label": "\u84EC\u5B89\u53BF", "value": "511323" }, { "label": "\u4EEA\u9647\u53BF", "value": "511324" }, { "label": "\u897F\u5145\u53BF", "value": "511325" }, { "label": "\u9606\u4E2D\u5E02", "value": "511381" }], [{ "label": "\u4E1C\u5761\u533A", "value": "511402" }, { "label": "\u5F6D\u5C71\u533A", "value": "511403" }, { "label": "\u4EC1\u5BFF\u53BF", "value": "511421" }, { "label": "\u6D2A\u96C5\u53BF", "value": "511423" }, { "label": "\u4E39\u68F1\u53BF", "value": "511424" }, { "label": "\u9752\u795E\u53BF", "value": "511425" }], [{ "label": "\u7FE0\u5C4F\u533A", "value": "511502" }, { "label": "\u5357\u6EAA\u533A", "value": "511503" }, { "label": "\u5B9C\u5BBE\u53BF", "value": "511521" }, { "label": "\u6C5F\u5B89\u53BF", "value": "511523" }, { "label": "\u957F\u5B81\u53BF", "value": "511524" }, { "label": "\u9AD8\u53BF", "value": "511525" }, { "label": "\u73D9\u53BF", "value": "511526" }, { "label": "\u7B60\u8FDE\u53BF", "value": "511527" }, { "label": "\u5174\u6587\u53BF", "value": "511528" }, { "label": "\u5C4F\u5C71\u53BF", "value": "511529" }], [{ "label": "\u5E7F\u5B89\u533A", "value": "511602" }, { "label": "\u524D\u950B\u533A", "value": "511603" }, { "label": "\u5CB3\u6C60\u53BF", "value": "511621" }, { "label": "\u6B66\u80DC\u53BF", "value": "511622" }, { "label": "\u90BB\u6C34\u53BF", "value": "511623" }, { "label": "\u534E\u84E5\u5E02", "value": "511681" }], [{ "label": "\u901A\u5DDD\u533A", "value": "511702" }, { "label": "\u8FBE\u5DDD\u533A", "value": "511703" }, { "label": "\u5BA3\u6C49\u53BF", "value": "511722" }, { "label": "\u5F00\u6C5F\u53BF", "value": "511723" }, { "label": "\u5927\u7AF9\u53BF", "value": "511724" }, { "label": "\u6E20\u53BF", "value": "511725" }, { "label": "\u8FBE\u5DDE\u7ECF\u6D4E\u5F00\u53D1\u533A", "value": "511771" }, { "label": "\u4E07\u6E90\u5E02", "value": "511781" }], [{ "label": "\u96E8\u57CE\u533A", "value": "511802" }, { "label": "\u540D\u5C71\u533A", "value": "511803" }, { "label": "\u8365\u7ECF\u53BF", "value": "511822" }, { "label": "\u6C49\u6E90\u53BF", "value": "511823" }, { "label": "\u77F3\u68C9\u53BF", "value": "511824" }, { "label": "\u5929\u5168\u53BF", "value": "511825" }, { "label": "\u82A6\u5C71\u53BF", "value": "511826" }, { "label": "\u5B9D\u5174\u53BF", "value": "511827" }], [{ "label": "\u5DF4\u5DDE\u533A", "value": "511902" }, { "label": "\u6069\u9633\u533A", "value": "511903" }, { "label": "\u901A\u6C5F\u53BF", "value": "511921" }, { "label": "\u5357\u6C5F\u53BF", "value": "511922" }, { "label": "\u5E73\u660C\u53BF", "value": "511923" }, { "label": "\u5DF4\u4E2D\u7ECF\u6D4E\u5F00\u53D1\u533A", "value": "511971" }], [{ "label": "\u96C1\u6C5F\u533A", "value": "512002" }, { "label": "\u5B89\u5CB3\u53BF", "value": "512021" }, { "label": "\u4E50\u81F3\u53BF", "value": "512022" }], [{ "label": "\u9A6C\u5C14\u5EB7\u5E02", "value": "513201" }, { "label": "\u6C76\u5DDD\u53BF", "value": "513221" }, { "label": "\u7406\u53BF", "value": "513222" }, { "label": "\u8302\u53BF", "value": "513223" }, { "label": "\u677E\u6F58\u53BF", "value": "513224" }, { "label": "\u4E5D\u5BE8\u6C9F\u53BF", "value": "513225" }, { "label": "\u91D1\u5DDD\u53BF", "value": "513226" }, { "label": "\u5C0F\u91D1\u53BF", "value": "513227" }, { "label": "\u9ED1\u6C34\u53BF", "value": "513228" }, { "label": "\u58E4\u5858\u53BF", "value": "513230" }, { "label": "\u963F\u575D\u53BF", "value": "513231" }, { "label": "\u82E5\u5C14\u76D6\u53BF", "value": "513232" }, { "label": "\u7EA2\u539F\u53BF", "value": "513233" }], [{ "label": "\u5EB7\u5B9A\u5E02", "value": "513301" }, { "label": "\u6CF8\u5B9A\u53BF", "value": "513322" }, { "label": "\u4E39\u5DF4\u53BF", "value": "513323" }, { "label": "\u4E5D\u9F99\u53BF", "value": "513324" }, { "label": "\u96C5\u6C5F\u53BF", "value": "513325" }, { "label": "\u9053\u5B5A\u53BF", "value": "513326" }, { "label": "\u7089\u970D\u53BF", "value": "513327" }, { "label": "\u7518\u5B5C\u53BF", "value": "513328" }, { "label": "\u65B0\u9F99\u53BF", "value": "513329" }, { "label": "\u5FB7\u683C\u53BF", "value": "513330" }, { "label": "\u767D\u7389\u53BF", "value": "513331" }, { "label": "\u77F3\u6E20\u53BF", "value": "513332" }, { "label": "\u8272\u8FBE\u53BF", "value": "513333" }, { "label": "\u7406\u5858\u53BF", "value": "513334" }, { "label": "\u5DF4\u5858\u53BF", "value": "513335" }, { "label": "\u4E61\u57CE\u53BF", "value": "513336" }, { "label": "\u7A3B\u57CE\u53BF", "value": "513337" }, { "label": "\u5F97\u8363\u53BF", "value": "513338" }], [{ "label": "\u897F\u660C\u5E02", "value": "513401" }, { "label": "\u6728\u91CC\u85CF\u65CF\u81EA\u6CBB\u53BF", "value": "513422" }, { "label": "\u76D0\u6E90\u53BF", "value": "513423" }, { "label": "\u5FB7\u660C\u53BF", "value": "513424" }, { "label": "\u4F1A\u7406\u53BF", "value": "513425" }, { "label": "\u4F1A\u4E1C\u53BF", "value": "513426" }, { "label": "\u5B81\u5357\u53BF", "value": "513427" }, { "label": "\u666E\u683C\u53BF", "value": "513428" }, { "label": "\u5E03\u62D6\u53BF", "value": "513429" }, { "label": "\u91D1\u9633\u53BF", "value": "513430" }, { "label": "\u662D\u89C9\u53BF", "value": "513431" }, { "label": "\u559C\u5FB7\u53BF", "value": "513432" }, { "label": "\u5195\u5B81\u53BF", "value": "513433" }, { "label": "\u8D8A\u897F\u53BF", "value": "513434" }, { "label": "\u7518\u6D1B\u53BF", "value": "513435" }, { "label": "\u7F8E\u59D1\u53BF", "value": "513436" }, { "label": "\u96F7\u6CE2\u53BF", "value": "513437" }]], [[{ "label": "\u5357\u660E\u533A", "value": "520102" }, { "label": "\u4E91\u5CA9\u533A", "value": "520103" }, { "label": "\u82B1\u6EAA\u533A", "value": "520111" }, { "label": "\u4E4C\u5F53\u533A", "value": "520112" }, { "label": "\u767D\u4E91\u533A", "value": "520113" }, { "label": "\u89C2\u5C71\u6E56\u533A", "value": "520115" }, { "label": "\u5F00\u9633\u53BF", "value": "520121" }, { "label": "\u606F\u70FD\u53BF", "value": "520122" }, { "label": "\u4FEE\u6587\u53BF", "value": "520123" }, { "label": "\u6E05\u9547\u5E02", "value": "520181" }], [{ "label": "\u949F\u5C71\u533A", "value": "520201" }, { "label": "\u516D\u679D\u7279\u533A", "value": "520203" }, { "label": "\u6C34\u57CE\u53BF", "value": "520221" }, { "label": "\u76D8\u5DDE\u5E02", "value": "520281" }], [{ "label": "\u7EA2\u82B1\u5C97\u533A", "value": "520302" }, { "label": "\u6C47\u5DDD\u533A", "value": "520303" }, { "label": "\u64AD\u5DDE\u533A", "value": "520304" }, { "label": "\u6850\u6893\u53BF", "value": "520322" }, { "label": "\u7EE5\u9633\u53BF", "value": "520323" }, { "label": "\u6B63\u5B89\u53BF", "value": "520324" }, { "label": "\u9053\u771F\u4EE1\u4F6C\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF", "value": "520325" }, { "label": "\u52A1\u5DDD\u4EE1\u4F6C\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF", "value": "520326" }, { "label": "\u51E4\u5188\u53BF", "value": "520327" }, { "label": "\u6E44\u6F6D\u53BF", "value": "520328" }, { "label": "\u4F59\u5E86\u53BF", "value": "520329" }, { "label": "\u4E60\u6C34\u53BF", "value": "520330" }, { "label": "\u8D64\u6C34\u5E02", "value": "520381" }, { "label": "\u4EC1\u6000\u5E02", "value": "520382" }], [{ "label": "\u897F\u79C0\u533A", "value": "520402" }, { "label": "\u5E73\u575D\u533A", "value": "520403" }, { "label": "\u666E\u5B9A\u53BF", "value": "520422" }, { "label": "\u9547\u5B81\u5E03\u4F9D\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF", "value": "520423" }, { "label": "\u5173\u5CAD\u5E03\u4F9D\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF", "value": "520424" }, { "label": "\u7D2B\u4E91\u82D7\u65CF\u5E03\u4F9D\u65CF\u81EA\u6CBB\u53BF", "value": "520425" }], [{ "label": "\u4E03\u661F\u5173\u533A", "value": "520502" }, { "label": "\u5927\u65B9\u53BF", "value": "520521" }, { "label": "\u9ED4\u897F\u53BF", "value": "520522" }, { "label": "\u91D1\u6C99\u53BF", "value": "520523" }, { "label": "\u7EC7\u91D1\u53BF", "value": "520524" }, { "label": "\u7EB3\u96CD\u53BF", "value": "520525" }, { "label": "\u5A01\u5B81\u5F5D\u65CF\u56DE\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF", "value": "520526" }, { "label": "\u8D6B\u7AE0\u53BF", "value": "520527" }], [{ "label": "\u78A7\u6C5F\u533A", "value": "520602" }, { "label": "\u4E07\u5C71\u533A", "value": "520603" }, { "label": "\u6C5F\u53E3\u53BF", "value": "520621" }, { "label": "\u7389\u5C4F\u4F97\u65CF\u81EA\u6CBB\u53BF", "value": "520622" }, { "label": "\u77F3\u9621\u53BF", "value": "520623" }, { "label": "\u601D\u5357\u53BF", "value": "520624" }, { "label": "\u5370\u6C5F\u571F\u5BB6\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF", "value": "520625" }, { "label": "\u5FB7\u6C5F\u53BF", "value": "520626" }, { "label": "\u6CBF\u6CB3\u571F\u5BB6\u65CF\u81EA\u6CBB\u53BF", "value": "520627" }, { "label": "\u677E\u6843\u82D7\u65CF\u81EA\u6CBB\u53BF", "value": "520628" }], [{ "label": "\u5174\u4E49\u5E02", "value": "522301" }, { "label": "\u5174\u4EC1\u53BF", "value": "522322" }, { "label": "\u666E\u5B89\u53BF", "value": "522323" }, { "label": "\u6674\u9686\u53BF", "value": "522324" }, { "label": "\u8D1E\u4E30\u53BF", "value": "522325" }, { "label": "\u671B\u8C1F\u53BF", "value": "522326" }, { "label": "\u518C\u4EA8\u53BF", "value": "522327" }, { "label": "\u5B89\u9F99\u53BF", "value": "522328" }], [{ "label": "\u51EF\u91CC\u5E02", "value": "522601" }, { "label": "\u9EC4\u5E73\u53BF", "value": "522622" }, { "label": "\u65BD\u79C9\u53BF", "value": "522623" }, { "label": "\u4E09\u7A57\u53BF", "value": "522624" }, { "label": "\u9547\u8FDC\u53BF", "value": "522625" }, { "label": "\u5C91\u5DE9\u53BF", "value": "522626" }, { "label": "\u5929\u67F1\u53BF", "value": "522627" }, { "label": "\u9526\u5C4F\u53BF", "value": "522628" }, { "label": "\u5251\u6CB3\u53BF", "value": "522629" }, { "label": "\u53F0\u6C5F\u53BF", "value": "522630" }, { "label": "\u9ECE\u5E73\u53BF", "value": "522631" }, { "label": "\u6995\u6C5F\u53BF", "value": "522632" }, { "label": "\u4ECE\u6C5F\u53BF", "value": "522633" }, { "label": "\u96F7\u5C71\u53BF", "value": "522634" }, { "label": "\u9EBB\u6C5F\u53BF", "value": "522635" }, { "label": "\u4E39\u5BE8\u53BF", "value": "522636" }], [{ "label": "\u90FD\u5300\u5E02", "value": "522701" }, { "label": "\u798F\u6CC9\u5E02", "value": "522702" }, { "label": "\u8354\u6CE2\u53BF", "value": "522722" }, { "label": "\u8D35\u5B9A\u53BF", "value": "522723" }, { "label": "\u74EE\u5B89\u53BF", "value": "522725" }, { "label": "\u72EC\u5C71\u53BF", "value": "522726" }, { "label": "\u5E73\u5858\u53BF", "value": "522727" }, { "label": "\u7F57\u7538\u53BF", "value": "522728" }, { "label": "\u957F\u987A\u53BF", "value": "522729" }, { "label": "\u9F99\u91CC\u53BF", "value": "522730" }, { "label": "\u60E0\u6C34\u53BF", "value": "522731" }, { "label": "\u4E09\u90FD\u6C34\u65CF\u81EA\u6CBB\u53BF", "value": "522732" }]], [[{ "label": "\u4E94\u534E\u533A", "value": "530102" }, { "label": "\u76D8\u9F99\u533A", "value": "530103" }, { "label": "\u5B98\u6E21\u533A", "value": "530111" }, { "label": "\u897F\u5C71\u533A", "value": "530112" }, { "label": "\u4E1C\u5DDD\u533A", "value": "530113" }, { "label": "\u5448\u8D21\u533A", "value": "530114" }, { "label": "\u664B\u5B81\u533A", "value": "530115" }, { "label": "\u5BCC\u6C11\u53BF", "value": "530124" }, { "label": "\u5B9C\u826F\u53BF", "value": "530125" }, { "label": "\u77F3\u6797\u5F5D\u65CF\u81EA\u6CBB\u53BF", "value": "530126" }, { "label": "\u5D69\u660E\u53BF", "value": "530127" }, { "label": "\u7984\u529D\u5F5D\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF", "value": "530128" }, { "label": "\u5BFB\u7538\u56DE\u65CF\u5F5D\u65CF\u81EA\u6CBB\u53BF", "value": "530129" }, { "label": "\u5B89\u5B81\u5E02", "value": "530181" }], [{ "label": "\u9E92\u9E9F\u533A", "value": "530302" }, { "label": "\u6CBE\u76CA\u533A", "value": "530303" }, { "label": "\u9A6C\u9F99\u53BF", "value": "530321" }, { "label": "\u9646\u826F\u53BF", "value": "530322" }, { "label": "\u5E08\u5B97\u53BF", "value": "530323" }, { "label": "\u7F57\u5E73\u53BF", "value": "530324" }, { "label": "\u5BCC\u6E90\u53BF", "value": "530325" }, { "label": "\u4F1A\u6CFD\u53BF", "value": "530326" }, { "label": "\u5BA3\u5A01\u5E02", "value": "530381" }], [{ "label": "\u7EA2\u5854\u533A", "value": "530402" }, { "label": "\u6C5F\u5DDD\u533A", "value": "530403" }, { "label": "\u6F84\u6C5F\u53BF", "value": "530422" }, { "label": "\u901A\u6D77\u53BF", "value": "530423" }, { "label": "\u534E\u5B81\u53BF", "value": "530424" }, { "label": "\u6613\u95E8\u53BF", "value": "530425" }, { "label": "\u5CE8\u5C71\u5F5D\u65CF\u81EA\u6CBB\u53BF", "value": "530426" }, { "label": "\u65B0\u5E73\u5F5D\u65CF\u50A3\u65CF\u81EA\u6CBB\u53BF", "value": "530427" }, { "label": "\u5143\u6C5F\u54C8\u5C3C\u65CF\u5F5D\u65CF\u50A3\u65CF\u81EA\u6CBB\u53BF", "value": "530428" }], [{ "label": "\u9686\u9633\u533A", "value": "530502" }, { "label": "\u65BD\u7538\u53BF", "value": "530521" }, { "label": "\u9F99\u9675\u53BF", "value": "530523" }, { "label": "\u660C\u5B81\u53BF", "value": "530524" }, { "label": "\u817E\u51B2\u5E02", "value": "530581" }], [{ "label": "\u662D\u9633\u533A", "value": "530602" }, { "label": "\u9C81\u7538\u53BF", "value": "530621" }, { "label": "\u5DE7\u5BB6\u53BF", "value": "530622" }, { "label": "\u76D0\u6D25\u53BF", "value": "530623" }, { "label": "\u5927\u5173\u53BF", "value": "530624" }, { "label": "\u6C38\u5584\u53BF", "value": "530625" }, { "label": "\u7EE5\u6C5F\u53BF", "value": "530626" }, { "label": "\u9547\u96C4\u53BF", "value": "530627" }, { "label": "\u5F5D\u826F\u53BF", "value": "530628" }, { "label": "\u5A01\u4FE1\u53BF", "value": "530629" }, { "label": "\u6C34\u5BCC\u53BF", "value": "530630" }], [{ "label": "\u53E4\u57CE\u533A", "value": "530702" }, { "label": "\u7389\u9F99\u7EB3\u897F\u65CF\u81EA\u6CBB\u53BF", "value": "530721" }, { "label": "\u6C38\u80DC\u53BF", "value": "530722" }, { "label": "\u534E\u576A\u53BF", "value": "530723" }, { "label": "\u5B81\u8497\u5F5D\u65CF\u81EA\u6CBB\u53BF", "value": "530724" }], [{ "label": "\u601D\u8305\u533A", "value": "530802" }, { "label": "\u5B81\u6D31\u54C8\u5C3C\u65CF\u5F5D\u65CF\u81EA\u6CBB\u53BF", "value": "530821" }, { "label": "\u58A8\u6C5F\u54C8\u5C3C\u65CF\u81EA\u6CBB\u53BF", "value": "530822" }, { "label": "\u666F\u4E1C\u5F5D\u65CF\u81EA\u6CBB\u53BF", "value": "530823" }, { "label": "\u666F\u8C37\u50A3\u65CF\u5F5D\u65CF\u81EA\u6CBB\u53BF", "value": "530824" }, { "label": "\u9547\u6C85\u5F5D\u65CF\u54C8\u5C3C\u65CF\u62C9\u795C\u65CF\u81EA\u6CBB\u53BF", "value": "530825" }, { "label": "\u6C5F\u57CE\u54C8\u5C3C\u65CF\u5F5D\u65CF\u81EA\u6CBB\u53BF", "value": "530826" }, { "label": "\u5B5F\u8FDE\u50A3\u65CF\u62C9\u795C\u65CF\u4F64\u65CF\u81EA\u6CBB\u53BF", "value": "530827" }, { "label": "\u6F9C\u6CA7\u62C9\u795C\u65CF\u81EA\u6CBB\u53BF", "value": "530828" }, { "label": "\u897F\u76DF\u4F64\u65CF\u81EA\u6CBB\u53BF", "value": "530829" }], [{ "label": "\u4E34\u7FD4\u533A", "value": "530902" }, { "label": "\u51E4\u5E86\u53BF", "value": "530921" }, { "label": "\u4E91\u53BF", "value": "530922" }, { "label": "\u6C38\u5FB7\u53BF", "value": "530923" }, { "label": "\u9547\u5EB7\u53BF", "value": "530924" }, { "label": "\u53CC\u6C5F\u62C9\u795C\u65CF\u4F64\u65CF\u5E03\u6717\u65CF\u50A3\u65CF\u81EA\u6CBB\u53BF", "value": "530925" }, { "label": "\u803F\u9A6C\u50A3\u65CF\u4F64\u65CF\u81EA\u6CBB\u53BF", "value": "530926" }, { "label": "\u6CA7\u6E90\u4F64\u65CF\u81EA\u6CBB\u53BF", "value": "530927" }], [{ "label": "\u695A\u96C4\u5E02", "value": "532301" }, { "label": "\u53CC\u67CF\u53BF", "value": "532322" }, { "label": "\u725F\u5B9A\u53BF", "value": "532323" }, { "label": "\u5357\u534E\u53BF", "value": "532324" }, { "label": "\u59DA\u5B89\u53BF", "value": "532325" }, { "label": "\u5927\u59DA\u53BF", "value": "532326" }, { "label": "\u6C38\u4EC1\u53BF", "value": "532327" }, { "label": "\u5143\u8C0B\u53BF", "value": "532328" }, { "label": "\u6B66\u5B9A\u53BF", "value": "532329" }, { "label": "\u7984\u4E30\u53BF", "value": "532331" }], [{ "label": "\u4E2A\u65E7\u5E02", "value": "532501" }, { "label": "\u5F00\u8FDC\u5E02", "value": "532502" }, { "label": "\u8499\u81EA\u5E02", "value": "532503" }, { "label": "\u5F25\u52D2\u5E02", "value": "532504" }, { "label": "\u5C4F\u8FB9\u82D7\u65CF\u81EA\u6CBB\u53BF", "value": "532523" }, { "label": "\u5EFA\u6C34\u53BF", "value": "532524" }, { "label": "\u77F3\u5C4F\u53BF", "value": "532525" }, { "label": "\u6CF8\u897F\u53BF", "value": "532527" }, { "label": "\u5143\u9633\u53BF", "value": "532528" }, { "label": "\u7EA2\u6CB3\u53BF", "value": "532529" }, { "label": "\u91D1\u5E73\u82D7\u65CF\u7476\u65CF\u50A3\u65CF\u81EA\u6CBB\u53BF", "value": "532530" }, { "label": "\u7EFF\u6625\u53BF", "value": "532531" }, { "label": "\u6CB3\u53E3\u7476\u65CF\u81EA\u6CBB\u53BF", "value": "532532" }], [{ "label": "\u6587\u5C71\u5E02", "value": "532601" }, { "label": "\u781A\u5C71\u53BF", "value": "532622" }, { "label": "\u897F\u7574\u53BF", "value": "532623" }, { "label": "\u9EBB\u6817\u5761\u53BF", "value": "532624" }, { "label": "\u9A6C\u5173\u53BF", "value": "532625" }, { "label": "\u4E18\u5317\u53BF", "value": "532626" }, { "label": "\u5E7F\u5357\u53BF", "value": "532627" }, { "label": "\u5BCC\u5B81\u53BF", "value": "532628" }], [{ "label": "\u666F\u6D2A\u5E02", "value": "532801" }, { "label": "\u52D0\u6D77\u53BF", "value": "532822" }, { "label": "\u52D0\u814A\u53BF", "value": "532823" }], [{ "label": "\u5927\u7406\u5E02", "value": "532901" }, { "label": "\u6F3E\u6FDE\u5F5D\u65CF\u81EA\u6CBB\u53BF", "value": "532922" }, { "label": "\u7965\u4E91\u53BF", "value": "532923" }, { "label": "\u5BBE\u5DDD\u53BF", "value": "532924" }, { "label": "\u5F25\u6E21\u53BF", "value": "532925" }, { "label": "\u5357\u6DA7\u5F5D\u65CF\u81EA\u6CBB\u53BF", "value": "532926" }, { "label": "\u5DCD\u5C71\u5F5D\u65CF\u56DE\u65CF\u81EA\u6CBB\u53BF", "value": "532927" }, { "label": "\u6C38\u5E73\u53BF", "value": "532928" }, { "label": "\u4E91\u9F99\u53BF", "value": "532929" }, { "label": "\u6D31\u6E90\u53BF", "value": "532930" }, { "label": "\u5251\u5DDD\u53BF", "value": "532931" }, { "label": "\u9E64\u5E86\u53BF", "value": "532932" }], [{ "label": "\u745E\u4E3D\u5E02", "value": "533102" }, { "label": "\u8292\u5E02", "value": "533103" }, { "label": "\u6881\u6CB3\u53BF", "value": "533122" }, { "label": "\u76C8\u6C5F\u53BF", "value": "533123" }, { "label": "\u9647\u5DDD\u53BF", "value": "533124" }], [{ "label": "\u6CF8\u6C34\u5E02", "value": "533301" }, { "label": "\u798F\u8D21\u53BF", "value": "533323" }, { "label": "\u8D21\u5C71\u72EC\u9F99\u65CF\u6012\u65CF\u81EA\u6CBB\u53BF", "value": "533324" }, { "label": "\u5170\u576A\u767D\u65CF\u666E\u7C73\u65CF\u81EA\u6CBB\u53BF", "value": "533325" }], [{ "label": "\u9999\u683C\u91CC\u62C9\u5E02", "value": "533401" }, { "label": "\u5FB7\u94A6\u53BF", "value": "533422" }, { "label": "\u7EF4\u897F\u5088\u50F3\u65CF\u81EA\u6CBB\u53BF", "value": "533423" }]], [[{ "label": "\u57CE\u5173\u533A", "value": "540102" }, { "label": "\u5806\u9F99\u5FB7\u5E86\u533A", "value": "540103" }, { "label": "\u6797\u5468\u53BF", "value": "540121" }, { "label": "\u5F53\u96C4\u53BF", "value": "540122" }, { "label": "\u5C3C\u6728\u53BF", "value": "540123" }, { "label": "\u66F2\u6C34\u53BF", "value": "540124" }, { "label": "\u8FBE\u5B5C\u53BF", "value": "540126" }, { "label": "\u58A8\u7AF9\u5DE5\u5361\u53BF", "value": "540127" }, { "label": "\u683C\u5C14\u6728\u85CF\u9752\u5DE5\u4E1A\u56ED\u533A", "value": "540171" }, { "label": "\u62C9\u8428\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A", "value": "540172" }, { "label": "\u897F\u85CF\u6587\u5316\u65C5\u6E38\u521B\u610F\u56ED\u533A", "value": "540173" }, { "label": "\u8FBE\u5B5C\u5DE5\u4E1A\u56ED\u533A", "value": "540174" }], [{ "label": "\u6851\u73E0\u5B5C\u533A", "value": "540202" }, { "label": "\u5357\u6728\u6797\u53BF", "value": "540221" }, { "label": "\u6C5F\u5B5C\u53BF", "value": "540222" }, { "label": "\u5B9A\u65E5\u53BF", "value": "540223" }, { "label": "\u8428\u8FE6\u53BF", "value": "540224" }, { "label": "\u62C9\u5B5C\u53BF", "value": "540225" }, { "label": "\u6602\u4EC1\u53BF", "value": "540226" }, { "label": "\u8C22\u901A\u95E8\u53BF", "value": "540227" }, { "label": "\u767D\u6717\u53BF", "value": "540228" }, { "label": "\u4EC1\u5E03\u53BF", "value": "540229" }, { "label": "\u5EB7\u9A6C\u53BF", "value": "540230" }, { "label": "\u5B9A\u7ED3\u53BF", "value": "540231" }, { "label": "\u4EF2\u5DF4\u53BF", "value": "540232" }, { "label": "\u4E9A\u4E1C\u53BF", "value": "540233" }, { "label": "\u5409\u9686\u53BF", "value": "540234" }, { "label": "\u8042\u62C9\u6728\u53BF", "value": "540235" }, { "label": "\u8428\u560E\u53BF", "value": "540236" }, { "label": "\u5C97\u5DF4\u53BF", "value": "540237" }], [{ "label": "\u5361\u82E5\u533A", "value": "540302" }, { "label": "\u6C5F\u8FBE\u53BF", "value": "540321" }, { "label": "\u8D21\u89C9\u53BF", "value": "540322" }, { "label": "\u7C7B\u4E4C\u9F50\u53BF", "value": "540323" }, { "label": "\u4E01\u9752\u53BF", "value": "540324" }, { "label": "\u5BDF\u96C5\u53BF", "value": "540325" }, { "label": "\u516B\u5BBF\u53BF", "value": "540326" }, { "label": "\u5DE6\u8D21\u53BF", "value": "540327" }, { "label": "\u8292\u5EB7\u53BF", "value": "540328" }, { "label": "\u6D1B\u9686\u53BF", "value": "540329" }, { "label": "\u8FB9\u575D\u53BF", "value": "540330" }], [{ "label": "\u5DF4\u5B9C\u533A", "value": "540402" }, { "label": "\u5DE5\u5E03\u6C5F\u8FBE\u53BF", "value": "540421" }, { "label": "\u7C73\u6797\u53BF", "value": "540422" }, { "label": "\u58A8\u8131\u53BF", "value": "540423" }, { "label": "\u6CE2\u5BC6\u53BF", "value": "540424" }, { "label": "\u5BDF\u9685\u53BF", "value": "540425" }, { "label": "\u6717\u53BF", "value": "540426" }], [{ "label": "\u4E43\u4E1C\u533A", "value": "540502" }, { "label": "\u624E\u56CA\u53BF", "value": "540521" }, { "label": "\u8D21\u560E\u53BF", "value": "540522" }, { "label": "\u6851\u65E5\u53BF", "value": "540523" }, { "label": "\u743C\u7ED3\u53BF", "value": "540524" }, { "label": "\u66F2\u677E\u53BF", "value": "540525" }, { "label": "\u63AA\u7F8E\u53BF", "value": "540526" }, { "label": "\u6D1B\u624E\u53BF", "value": "540527" }, { "label": "\u52A0\u67E5\u53BF", "value": "540528" }, { "label": "\u9686\u5B50\u53BF", "value": "540529" }, { "label": "\u9519\u90A3\u53BF", "value": "540530" }, { "label": "\u6D6A\u5361\u5B50\u53BF", "value": "540531" }], [{ "label": "\u90A3\u66F2\u53BF", "value": "542421" }, { "label": "\u5609\u9ECE\u53BF", "value": "542422" }, { "label": "\u6BD4\u5982\u53BF", "value": "542423" }, { "label": "\u8042\u8363\u53BF", "value": "542424" }, { "label": "\u5B89\u591A\u53BF", "value": "542425" }, { "label": "\u7533\u624E\u53BF", "value": "542426" }, { "label": "\u7D22\u53BF", "value": "542427" }, { "label": "\u73ED\u6208\u53BF", "value": "542428" }, { "label": "\u5DF4\u9752\u53BF", "value": "542429" }, { "label": "\u5C3C\u739B\u53BF", "value": "542430" }, { "label": "\u53CC\u6E56\u53BF", "value": "542431" }], [{ "label": "\u666E\u5170\u53BF", "value": "542521" }, { "label": "\u672D\u8FBE\u53BF", "value": "542522" }, { "label": "\u5676\u5C14\u53BF", "value": "542523" }, { "label": "\u65E5\u571F\u53BF", "value": "542524" }, { "label": "\u9769\u5409\u53BF", "value": "542525" }, { "label": "\u6539\u5219\u53BF", "value": "542526" }, { "label": "\u63AA\u52E4\u53BF", "value": "542527" }]], [[{ "label": "\u65B0\u57CE\u533A", "value": "610102" }, { "label": "\u7891\u6797\u533A", "value": "610103" }, { "label": "\u83B2\u6E56\u533A", "value": "610104" }, { "label": "\u705E\u6865\u533A", "value": "610111" }, { "label": "\u672A\u592E\u533A", "value": "610112" }, { "label": "\u96C1\u5854\u533A", "value": "610113" }, { "label": "\u960E\u826F\u533A", "value": "610114" }, { "label": "\u4E34\u6F7C\u533A", "value": "610115" }, { "label": "\u957F\u5B89\u533A", "value": "610116" }, { "label": "\u9AD8\u9675\u533A", "value": "610117" }, { "label": "\u9120\u9091\u533A", "value": "610118" }, { "label": "\u84DD\u7530\u53BF", "value": "610122" }, { "label": "\u5468\u81F3\u53BF", "value": "610124" }], [{ "label": "\u738B\u76CA\u533A", "value": "610202" }, { "label": "\u5370\u53F0\u533A", "value": "610203" }, { "label": "\u8000\u5DDE\u533A", "value": "610204" }, { "label": "\u5B9C\u541B\u53BF", "value": "610222" }], [{ "label": "\u6E2D\u6EE8\u533A", "value": "610302" }, { "label": "\u91D1\u53F0\u533A", "value": "610303" }, { "label": "\u9648\u4ED3\u533A", "value": "610304" }, { "label": "\u51E4\u7FD4\u53BF", "value": "610322" }, { "label": "\u5C90\u5C71\u53BF", "value": "610323" }, { "label": "\u6276\u98CE\u53BF", "value": "610324" }, { "label": "\u7709\u53BF", "value": "610326" }, { "label": "\u9647\u53BF", "value": "610327" }, { "label": "\u5343\u9633\u53BF", "value": "610328" }, { "label": "\u9E9F\u6E38\u53BF", "value": "610329" }, { "label": "\u51E4\u53BF", "value": "610330" }, { "label": "\u592A\u767D\u53BF", "value": "610331" }], [{ "label": "\u79E6\u90FD\u533A", "value": "610402" }, { "label": "\u6768\u9675\u533A", "value": "610403" }, { "label": "\u6E2D\u57CE\u533A", "value": "610404" }, { "label": "\u4E09\u539F\u53BF", "value": "610422" }, { "label": "\u6CFE\u9633\u53BF", "value": "610423" }, { "label": "\u4E7E\u53BF", "value": "610424" }, { "label": "\u793C\u6CC9\u53BF", "value": "610425" }, { "label": "\u6C38\u5BFF\u53BF", "value": "610426" }, { "label": "\u5F6C\u53BF", "value": "610427" }, { "label": "\u957F\u6B66\u53BF", "value": "610428" }, { "label": "\u65EC\u9091\u53BF", "value": "610429" }, { "label": "\u6DF3\u5316\u53BF", "value": "610430" }, { "label": "\u6B66\u529F\u53BF", "value": "610431" }, { "label": "\u5174\u5E73\u5E02", "value": "610481" }], [{ "label": "\u4E34\u6E2D\u533A", "value": "610502" }, { "label": "\u534E\u5DDE\u533A", "value": "610503" }, { "label": "\u6F7C\u5173\u53BF", "value": "610522" }, { "label": "\u5927\u8354\u53BF", "value": "610523" }, { "label": "\u5408\u9633\u53BF", "value": "610524" }, { "label": "\u6F84\u57CE\u53BF", "value": "610525" }, { "label": "\u84B2\u57CE\u53BF", "value": "610526" }, { "label": "\u767D\u6C34\u53BF", "value": "610527" }, { "label": "\u5BCC\u5E73\u53BF", "value": "610528" }, { "label": "\u97E9\u57CE\u5E02", "value": "610581" }, { "label": "\u534E\u9634\u5E02", "value": "610582" }], [{ "label": "\u5B9D\u5854\u533A", "value": "610602" }, { "label": "\u5B89\u585E\u533A", "value": "610603" }, { "label": "\u5EF6\u957F\u53BF", "value": "610621" }, { "label": "\u5EF6\u5DDD\u53BF", "value": "610622" }, { "label": "\u5B50\u957F\u53BF", "value": "610623" }, { "label": "\u5FD7\u4E39\u53BF", "value": "610625" }, { "label": "\u5434\u8D77\u53BF", "value": "610626" }, { "label": "\u7518\u6CC9\u53BF", "value": "610627" }, { "label": "\u5BCC\u53BF", "value": "610628" }, { "label": "\u6D1B\u5DDD\u53BF", "value": "610629" }, { "label": "\u5B9C\u5DDD\u53BF", "value": "610630" }, { "label": "\u9EC4\u9F99\u53BF", "value": "610631" }, { "label": "\u9EC4\u9675\u53BF", "value": "610632" }], [{ "label": "\u6C49\u53F0\u533A", "value": "610702" }, { "label": "\u5357\u90D1\u533A", "value": "610703" }, { "label": "\u57CE\u56FA\u53BF", "value": "610722" }, { "label": "\u6D0B\u53BF", "value": "610723" }, { "label": "\u897F\u4E61\u53BF", "value": "610724" }, { "label": "\u52C9\u53BF", "value": "610725" }, { "label": "\u5B81\u5F3A\u53BF", "value": "610726" }, { "label": "\u7565\u9633\u53BF", "value": "610727" }, { "label": "\u9547\u5DF4\u53BF", "value": "610728" }, { "label": "\u7559\u575D\u53BF", "value": "610729" }, { "label": "\u4F5B\u576A\u53BF", "value": "610730" }], [{ "label": "\u6986\u9633\u533A", "value": "610802" }, { "label": "\u6A2A\u5C71\u533A", "value": "610803" }, { "label": "\u5E9C\u8C37\u53BF", "value": "610822" }, { "label": "\u9756\u8FB9\u53BF", "value": "610824" }, { "label": "\u5B9A\u8FB9\u53BF", "value": "610825" }, { "label": "\u7EE5\u5FB7\u53BF", "value": "610826" }, { "label": "\u7C73\u8102\u53BF", "value": "610827" }, { "label": "\u4F73\u53BF", "value": "610828" }, { "label": "\u5434\u5821\u53BF", "value": "610829" }, { "label": "\u6E05\u6DA7\u53BF", "value": "610830" }, { "label": "\u5B50\u6D32\u53BF", "value": "610831" }, { "label": "\u795E\u6728\u5E02", "value": "610881" }], [{ "label": "\u6C49\u6EE8\u533A", "value": "610902" }, { "label": "\u6C49\u9634\u53BF", "value": "610921" }, { "label": "\u77F3\u6CC9\u53BF", "value": "610922" }, { "label": "\u5B81\u9655\u53BF", "value": "610923" }, { "label": "\u7D2B\u9633\u53BF", "value": "610924" }, { "label": "\u5C9A\u768B\u53BF", "value": "610925" }, { "label": "\u5E73\u5229\u53BF", "value": "610926" }, { "label": "\u9547\u576A\u53BF", "value": "610927" }, { "label": "\u65EC\u9633\u53BF", "value": "610928" }, { "label": "\u767D\u6CB3\u53BF", "value": "610929" }], [{ "label": "\u5546\u5DDE\u533A", "value": "611002" }, { "label": "\u6D1B\u5357\u53BF", "value": "611021" }, { "label": "\u4E39\u51E4\u53BF", "value": "611022" }, { "label": "\u5546\u5357\u53BF", "value": "611023" }, { "label": "\u5C71\u9633\u53BF", "value": "611024" }, { "label": "\u9547\u5B89\u53BF", "value": "611025" }, { "label": "\u67DE\u6C34\u53BF", "value": "611026" }]], [[{ "label": "\u57CE\u5173\u533A", "value": "620102" }, { "label": "\u4E03\u91CC\u6CB3\u533A", "value": "620103" }, { "label": "\u897F\u56FA\u533A", "value": "620104" }, { "label": "\u5B89\u5B81\u533A", "value": "620105" }, { "label": "\u7EA2\u53E4\u533A", "value": "620111" }, { "label": "\u6C38\u767B\u53BF", "value": "620121" }, { "label": "\u768B\u5170\u53BF", "value": "620122" }, { "label": "\u6986\u4E2D\u53BF", "value": "620123" }, { "label": "\u5170\u5DDE\u65B0\u533A", "value": "620171" }], [{ "label": "\u5609\u5CEA\u5173\u5E02", "value": "620201" }], [{ "label": "\u91D1\u5DDD\u533A", "value": "620302" }, { "label": "\u6C38\u660C\u53BF", "value": "620321" }], [{ "label": "\u767D\u94F6\u533A", "value": "620402" }, { "label": "\u5E73\u5DDD\u533A", "value": "620403" }, { "label": "\u9756\u8FDC\u53BF", "value": "620421" }, { "label": "\u4F1A\u5B81\u53BF", "value": "620422" }, { "label": "\u666F\u6CF0\u53BF", "value": "620423" }], [{ "label": "\u79E6\u5DDE\u533A", "value": "620502" }, { "label": "\u9EA6\u79EF\u533A", "value": "620503" }, { "label": "\u6E05\u6C34\u53BF", "value": "620521" }, { "label": "\u79E6\u5B89\u53BF", "value": "620522" }, { "label": "\u7518\u8C37\u53BF", "value": "620523" }, { "label": "\u6B66\u5C71\u53BF", "value": "620524" }, { "label": "\u5F20\u5BB6\u5DDD\u56DE\u65CF\u81EA\u6CBB\u53BF", "value": "620525" }], [{ "label": "\u51C9\u5DDE\u533A", "value": "620602" }, { "label": "\u6C11\u52E4\u53BF", "value": "620621" }, { "label": "\u53E4\u6D6A\u53BF", "value": "620622" }, { "label": "\u5929\u795D\u85CF\u65CF\u81EA\u6CBB\u53BF", "value": "620623" }], [{ "label": "\u7518\u5DDE\u533A", "value": "620702" }, { "label": "\u8083\u5357\u88D5\u56FA\u65CF\u81EA\u6CBB\u53BF", "value": "620721" }, { "label": "\u6C11\u4E50\u53BF", "value": "620722" }, { "label": "\u4E34\u6CFD\u53BF", "value": "620723" }, { "label": "\u9AD8\u53F0\u53BF", "value": "620724" }, { "label": "\u5C71\u4E39\u53BF", "value": "620725" }], [{ "label": "\u5D06\u5CD2\u533A", "value": "620802" }, { "label": "\u6CFE\u5DDD\u53BF", "value": "620821" }, { "label": "\u7075\u53F0\u53BF", "value": "620822" }, { "label": "\u5D07\u4FE1\u53BF", "value": "620823" }, { "label": "\u534E\u4EAD\u53BF", "value": "620824" }, { "label": "\u5E84\u6D6A\u53BF", "value": "620825" }, { "label": "\u9759\u5B81\u53BF", "value": "620826" }, { "label": "\u5E73\u51C9\u5DE5\u4E1A\u56ED\u533A", "value": "620871" }], [{ "label": "\u8083\u5DDE\u533A", "value": "620902" }, { "label": "\u91D1\u5854\u53BF", "value": "620921" }, { "label": "\u74DC\u5DDE\u53BF", "value": "620922" }, { "label": "\u8083\u5317\u8499\u53E4\u65CF\u81EA\u6CBB\u53BF", "value": "620923" }, { "label": "\u963F\u514B\u585E\u54C8\u8428\u514B\u65CF\u81EA\u6CBB\u53BF", "value": "620924" }, { "label": "\u7389\u95E8\u5E02", "value": "620981" }, { "label": "\u6566\u714C\u5E02", "value": "620982" }], [{ "label": "\u897F\u5CF0\u533A", "value": "621002" }, { "label": "\u5E86\u57CE\u53BF", "value": "621021" }, { "label": "\u73AF\u53BF", "value": "621022" }, { "label": "\u534E\u6C60\u53BF", "value": "621023" }, { "label": "\u5408\u6C34\u53BF", "value": "621024" }, { "label": "\u6B63\u5B81\u53BF", "value": "621025" }, { "label": "\u5B81\u53BF", "value": "621026" }, { "label": "\u9547\u539F\u53BF", "value": "621027" }], [{ "label": "\u5B89\u5B9A\u533A", "value": "621102" }, { "label": "\u901A\u6E2D\u53BF", "value": "621121" }, { "label": "\u9647\u897F\u53BF", "value": "621122" }, { "label": "\u6E2D\u6E90\u53BF", "value": "621123" }, { "label": "\u4E34\u6D2E\u53BF", "value": "621124" }, { "label": "\u6F33\u53BF", "value": "621125" }, { "label": "\u5CB7\u53BF", "value": "621126" }], [{ "label": "\u6B66\u90FD\u533A", "value": "621202" }, { "label": "\u6210\u53BF", "value": "621221" }, { "label": "\u6587\u53BF", "value": "621222" }, { "label": "\u5B95\u660C\u53BF", "value": "621223" }, { "label": "\u5EB7\u53BF", "value": "621224" }, { "label": "\u897F\u548C\u53BF", "value": "621225" }, { "label": "\u793C\u53BF", "value": "621226" }, { "label": "\u5FBD\u53BF", "value": "621227" }, { "label": "\u4E24\u5F53\u53BF", "value": "621228" }], [{ "label": "\u4E34\u590F\u5E02", "value": "622901" }, { "label": "\u4E34\u590F\u53BF", "value": "622921" }, { "label": "\u5EB7\u4E50\u53BF", "value": "622922" }, { "label": "\u6C38\u9756\u53BF", "value": "622923" }, { "label": "\u5E7F\u6CB3\u53BF", "value": "622924" }, { "label": "\u548C\u653F\u53BF", "value": "622925" }, { "label": "\u4E1C\u4E61\u65CF\u81EA\u6CBB\u53BF", "value": "622926" }, { "label": "\u79EF\u77F3\u5C71\u4FDD\u5B89\u65CF\u4E1C\u4E61\u65CF\u6492\u62C9\u65CF\u81EA\u6CBB\u53BF", "value": "622927" }], [{ "label": "\u5408\u4F5C\u5E02", "value": "623001" }, { "label": "\u4E34\u6F6D\u53BF", "value": "623021" }, { "label": "\u5353\u5C3C\u53BF", "value": "623022" }, { "label": "\u821F\u66F2\u53BF", "value": "623023" }, { "label": "\u8FED\u90E8\u53BF", "value": "623024" }, { "label": "\u739B\u66F2\u53BF", "value": "623025" }, { "label": "\u788C\u66F2\u53BF", "value": "623026" }, { "label": "\u590F\u6CB3\u53BF", "value": "623027" }]], [[{ "label": "\u57CE\u4E1C\u533A", "value": "630102" }, { "label": "\u57CE\u4E2D\u533A", "value": "630103" }, { "label": "\u57CE\u897F\u533A", "value": "630104" }, { "label": "\u57CE\u5317\u533A", "value": "630105" }, { "label": "\u5927\u901A\u56DE\u65CF\u571F\u65CF\u81EA\u6CBB\u53BF", "value": "630121" }, { "label": "\u6E5F\u4E2D\u53BF", "value": "630122" }, { "label": "\u6E5F\u6E90\u53BF", "value": "630123" }], [{ "label": "\u4E50\u90FD\u533A", "value": "630202" }, { "label": "\u5E73\u5B89\u533A", "value": "630203" }, { "label": "\u6C11\u548C\u56DE\u65CF\u571F\u65CF\u81EA\u6CBB\u53BF", "value": "630222" }, { "label": "\u4E92\u52A9\u571F\u65CF\u81EA\u6CBB\u53BF", "value": "630223" }, { "label": "\u5316\u9686\u56DE\u65CF\u81EA\u6CBB\u53BF", "value": "630224" }, { "label": "\u5FAA\u5316\u6492\u62C9\u65CF\u81EA\u6CBB\u53BF", "value": "630225" }], [{ "label": "\u95E8\u6E90\u56DE\u65CF\u81EA\u6CBB\u53BF", "value": "632221" }, { "label": "\u7941\u8FDE\u53BF", "value": "632222" }, { "label": "\u6D77\u664F\u53BF", "value": "632223" }, { "label": "\u521A\u5BDF\u53BF", "value": "632224" }], [{ "label": "\u540C\u4EC1\u53BF", "value": "632321" }, { "label": "\u5C16\u624E\u53BF", "value": "632322" }, { "label": "\u6CFD\u5E93\u53BF", "value": "632323" }, { "label": "\u6CB3\u5357\u8499\u53E4\u65CF\u81EA\u6CBB\u53BF", "value": "632324" }], [{ "label": "\u5171\u548C\u53BF", "value": "632521" }, { "label": "\u540C\u5FB7\u53BF", "value": "632522" }, { "label": "\u8D35\u5FB7\u53BF", "value": "632523" }, { "label": "\u5174\u6D77\u53BF", "value": "632524" }, { "label": "\u8D35\u5357\u53BF", "value": "632525" }], [{ "label": "\u739B\u6C81\u53BF", "value": "632621" }, { "label": "\u73ED\u739B\u53BF", "value": "632622" }, { "label": "\u7518\u5FB7\u53BF", "value": "632623" }, { "label": "\u8FBE\u65E5\u53BF", "value": "632624" }, { "label": "\u4E45\u6CBB\u53BF", "value": "632625" }, { "label": "\u739B\u591A\u53BF", "value": "632626" }], [{ "label": "\u7389\u6811\u5E02", "value": "632701" }, { "label": "\u6742\u591A\u53BF", "value": "632722" }, { "label": "\u79F0\u591A\u53BF", "value": "632723" }, { "label": "\u6CBB\u591A\u53BF", "value": "632724" }, { "label": "\u56CA\u8C26\u53BF", "value": "632725" }, { "label": "\u66F2\u9EBB\u83B1\u53BF", "value": "632726" }], [{ "label": "\u683C\u5C14\u6728\u5E02", "value": "632801" }, { "label": "\u5FB7\u4EE4\u54C8\u5E02", "value": "632802" }, { "label": "\u4E4C\u5170\u53BF", "value": "632821" }, { "label": "\u90FD\u5170\u53BF", "value": "632822" }, { "label": "\u5929\u5CFB\u53BF", "value": "632823" }, { "label": "\u5927\u67F4\u65E6\u884C\u653F\u59D4\u5458\u4F1A", "value": "632857" }, { "label": "\u51B7\u6E56\u884C\u653F\u59D4\u5458\u4F1A", "value": "632858" }, { "label": "\u832B\u5D16\u884C\u653F\u59D4\u5458\u4F1A", "value": "632859" }]], [[{ "label": "\u5174\u5E86\u533A", "value": "640104" }, { "label": "\u897F\u590F\u533A", "value": "640105" }, { "label": "\u91D1\u51E4\u533A", "value": "640106" }, { "label": "\u6C38\u5B81\u53BF", "value": "640121" }, { "label": "\u8D3A\u5170\u53BF", "value": "640122" }, { "label": "\u7075\u6B66\u5E02", "value": "640181" }], [{ "label": "\u5927\u6B66\u53E3\u533A", "value": "640202" }, { "label": "\u60E0\u519C\u533A", "value": "640205" }, { "label": "\u5E73\u7F57\u53BF", "value": "640221" }], [{ "label": "\u5229\u901A\u533A", "value": "640302" }, { "label": "\u7EA2\u5BFA\u5821\u533A", "value": "640303" }, { "label": "\u76D0\u6C60\u53BF", "value": "640323" }, { "label": "\u540C\u5FC3\u53BF", "value": "640324" }, { "label": "\u9752\u94DC\u5CE1\u5E02", "value": "640381" }], [{ "label": "\u539F\u5DDE\u533A", "value": "640402" }, { "label": "\u897F\u5409\u53BF", "value": "640422" }, { "label": "\u9686\u5FB7\u53BF", "value": "640423" }, { "label": "\u6CFE\u6E90\u53BF", "value": "640424" }, { "label": "\u5F6D\u9633\u53BF", "value": "640425" }], [{ "label": "\u6C99\u5761\u5934\u533A", "value": "640502" }, { "label": "\u4E2D\u5B81\u53BF", "value": "640521" }, { "label": "\u6D77\u539F\u53BF", "value": "640522" }]], [[{ "label": "\u5929\u5C71\u533A", "value": "650102" }, { "label": "\u6C99\u4F9D\u5DF4\u514B\u533A", "value": "650103" }, { "label": "\u65B0\u5E02\u533A", "value": "650104" }, { "label": "\u6C34\u78E8\u6C9F\u533A", "value": "650105" }, { "label": "\u5934\u5C6F\u6CB3\u533A", "value": "650106" }, { "label": "\u8FBE\u5742\u57CE\u533A", "value": "650107" }, { "label": "\u7C73\u4E1C\u533A", "value": "650109" }, { "label": "\u4E4C\u9C81\u6728\u9F50\u53BF", "value": "650121" }, { "label": "\u4E4C\u9C81\u6728\u9F50\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A", "value": "650171" }, { "label": "\u4E4C\u9C81\u6728\u9F50\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u5F00\u53D1\u533A", "value": "650172" }], [{ "label": "\u72EC\u5C71\u5B50\u533A", "value": "650202" }, { "label": "\u514B\u62C9\u739B\u4F9D\u533A", "value": "650203" }, { "label": "\u767D\u78B1\u6EE9\u533A", "value": "650204" }, { "label": "\u4E4C\u5C14\u79BE\u533A", "value": "650205" }], [{ "label": "\u9AD8\u660C\u533A", "value": "650402" }, { "label": "\u912F\u5584\u53BF", "value": "650421" }, { "label": "\u6258\u514B\u900A\u53BF", "value": "650422" }], [{ "label": "\u4F0A\u5DDE\u533A", "value": "650502" }, { "label": "\u5DF4\u91CC\u5764\u54C8\u8428\u514B\u81EA\u6CBB\u53BF", "value": "650521" }, { "label": "\u4F0A\u543E\u53BF", "value": "650522" }], [{ "label": "\u660C\u5409\u5E02", "value": "652301" }, { "label": "\u961C\u5EB7\u5E02", "value": "652302" }, { "label": "\u547C\u56FE\u58C1\u53BF", "value": "652323" }, { "label": "\u739B\u7EB3\u65AF\u53BF", "value": "652324" }, { "label": "\u5947\u53F0\u53BF", "value": "652325" }, { "label": "\u5409\u6728\u8428\u5C14\u53BF", "value": "652327" }, { "label": "\u6728\u5792\u54C8\u8428\u514B\u81EA\u6CBB\u53BF", "value": "652328" }], [{ "label": "\u535A\u4E50\u5E02", "value": "652701" }, { "label": "\u963F\u62C9\u5C71\u53E3\u5E02", "value": "652702" }, { "label": "\u7CBE\u6CB3\u53BF", "value": "652722" }, { "label": "\u6E29\u6CC9\u53BF", "value": "652723" }], [{ "label": "\u5E93\u5C14\u52D2\u5E02", "value": "652801" }, { "label": "\u8F6E\u53F0\u53BF", "value": "652822" }, { "label": "\u5C09\u7281\u53BF", "value": "652823" }, { "label": "\u82E5\u7F8C\u53BF", "value": "652824" }, { "label": "\u4E14\u672B\u53BF", "value": "652825" }, { "label": "\u7109\u8006\u56DE\u65CF\u81EA\u6CBB\u53BF", "value": "652826" }, { "label": "\u548C\u9759\u53BF", "value": "652827" }, { "label": "\u548C\u7855\u53BF", "value": "652828" }, { "label": "\u535A\u6E56\u53BF", "value": "652829" }, { "label": "\u5E93\u5C14\u52D2\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A", "value": "652871" }], [{ "label": "\u963F\u514B\u82CF\u5E02", "value": "652901" }, { "label": "\u6E29\u5BBF\u53BF", "value": "652922" }, { "label": "\u5E93\u8F66\u53BF", "value": "652923" }, { "label": "\u6C99\u96C5\u53BF", "value": "652924" }, { "label": "\u65B0\u548C\u53BF", "value": "652925" }, { "label": "\u62DC\u57CE\u53BF", "value": "652926" }, { "label": "\u4E4C\u4EC0\u53BF", "value": "652927" }, { "label": "\u963F\u74E6\u63D0\u53BF", "value": "652928" }, { "label": "\u67EF\u576A\u53BF", "value": "652929" }], [{ "label": "\u963F\u56FE\u4EC0\u5E02", "value": "653001" }, { "label": "\u963F\u514B\u9676\u53BF", "value": "653022" }, { "label": "\u963F\u5408\u5947\u53BF", "value": "653023" }, { "label": "\u4E4C\u6070\u53BF", "value": "653024" }], [{ "label": "\u5580\u4EC0\u5E02", "value": "653101" }, { "label": "\u758F\u9644\u53BF", "value": "653121" }, { "label": "\u758F\u52D2\u53BF", "value": "653122" }, { "label": "\u82F1\u5409\u6C99\u53BF", "value": "653123" }, { "label": "\u6CFD\u666E\u53BF", "value": "653124" }, { "label": "\u838E\u8F66\u53BF", "value": "653125" }, { "label": "\u53F6\u57CE\u53BF", "value": "653126" }, { "label": "\u9EA6\u76D6\u63D0\u53BF", "value": "653127" }, { "label": "\u5CB3\u666E\u6E56\u53BF", "value": "653128" }, { "label": "\u4F3D\u5E08\u53BF", "value": "653129" }, { "label": "\u5DF4\u695A\u53BF", "value": "653130" }, { "label": "\u5854\u4EC0\u5E93\u5C14\u5E72\u5854\u5409\u514B\u81EA\u6CBB\u53BF", "value": "653131" }], [{ "label": "\u548C\u7530\u5E02", "value": "653201" }, { "label": "\u548C\u7530\u53BF", "value": "653221" }, { "label": "\u58A8\u7389\u53BF", "value": "653222" }, { "label": "\u76AE\u5C71\u53BF", "value": "653223" }, { "label": "\u6D1B\u6D66\u53BF", "value": "653224" }, { "label": "\u7B56\u52D2\u53BF", "value": "653225" }, { "label": "\u4E8E\u7530\u53BF", "value": "653226" }, { "label": "\u6C11\u4E30\u53BF", "value": "653227" }], [{ "label": "\u4F0A\u5B81\u5E02", "value": "654002" }, { "label": "\u594E\u5C6F\u5E02", "value": "654003" }, { "label": "\u970D\u5C14\u679C\u65AF\u5E02", "value": "654004" }, { "label": "\u4F0A\u5B81\u53BF", "value": "654021" }, { "label": "\u5BDF\u5E03\u67E5\u5C14\u9521\u4F2F\u81EA\u6CBB\u53BF", "value": "654022" }, { "label": "\u970D\u57CE\u53BF", "value": "654023" }, { "label": "\u5DE9\u7559\u53BF", "value": "654024" }, { "label": "\u65B0\u6E90\u53BF", "value": "654025" }, { "label": "\u662D\u82CF\u53BF", "value": "654026" }, { "label": "\u7279\u514B\u65AF\u53BF", "value": "654027" }, { "label": "\u5C3C\u52D2\u514B\u53BF", "value": "654028" }], [{ "label": "\u5854\u57CE\u5E02", "value": "654201" }, { "label": "\u4E4C\u82CF\u5E02", "value": "654202" }, { "label": "\u989D\u654F\u53BF", "value": "654221" }, { "label": "\u6C99\u6E7E\u53BF", "value": "654223" }, { "label": "\u6258\u91CC\u53BF", "value": "654224" }, { "label": "\u88D5\u6C11\u53BF", "value": "654225" }, { "label": "\u548C\u5E03\u514B\u8D5B\u5C14\u8499\u53E4\u81EA\u6CBB\u53BF", "value": "654226" }], [{ "label": "\u963F\u52D2\u6CF0\u5E02", "value": "654301" }, { "label": "\u5E03\u5C14\u6D25\u53BF", "value": "654321" }, { "label": "\u5BCC\u8574\u53BF", "value": "654322" }, { "label": "\u798F\u6D77\u53BF", "value": "654323" }, { "label": "\u54C8\u5DF4\u6CB3\u53BF", "value": "654324" }, { "label": "\u9752\u6CB3\u53BF", "value": "654325" }, { "label": "\u5409\u6728\u4E43\u53BF", "value": "654326" }], [{ "label": "\u77F3\u6CB3\u5B50\u5E02", "value": "659001" }, { "label": "\u963F\u62C9\u5C14\u5E02", "value": "659002" }, { "label": "\u56FE\u6728\u8212\u514B\u5E02", "value": "659003" }, { "label": "\u4E94\u5BB6\u6E20\u5E02", "value": "659004" }, { "label": "\u94C1\u95E8\u5173\u5E02", "value": "659006" }]], [[{ "label": "\u53F0\u5317", "value": "660101" }], [{ "label": "\u9AD8\u96C4", "value": "660201" }], [{ "label": "\u57FA\u9686", "value": "660301" }], [{ "label": "\u53F0\u4E2D", "value": "660401" }], [{ "label": "\u53F0\u5357", "value": "660501" }], [{ "label": "\u65B0\u7AF9", "value": "660601" }], [{ "label": "\u5609\u4E49", "value": "660701" }], [{ "label": "\u5B9C\u5170", "value": "660801" }], [{ "label": "\u6843\u56ED", "value": "660901" }], [{ "label": "\u82D7\u6817", "value": "661001" }], [{ "label": "\u5F70\u5316", "value": "661101" }], [{ "label": "\u5357\u6295", "value": "661201" }], [{ "label": "\u4E91\u6797", "value": "661301" }], [{ "label": "\u5C4F\u4E1C", "value": "661401" }], [{ "label": "\u53F0\u4E1C", "value": "661501" }], [{ "label": "\u82B1\u83B2", "value": "661601" }], [{ "label": "\u6F8E\u6E56", "value": "661701" }]], [[{ "label": "\u9999\u6E2F\u5C9B", "value": "670101" }], [{ "label": "\u4E5D\u9F99", "value": "670201" }], [{ "label": "\u65B0\u754C", "value": "670301" }]], [[{ "label": "\u6FB3\u95E8\u534A\u5C9B", "value": "680101" }], [{ "label": "\u6C39\u4ED4\u5C9B", "value": "680201" }], [{ "label": "\u8DEF\u73AF\u5C9B", "value": "680301" }], [{ "label": "\u8DEF\u6C39\u57CE", "value": "680401" }]]];
  var _sfc_main20 = /* @__PURE__ */ (0, import_vue20.defineComponent)({
    __name: "tm-city-picker",
    props: __spreadProps19(__spreadValues19({}, custom_props), {
      followTheme: {
        type: [Boolean, String],
        default: true
      },
      modelValue: {
        type: Array,
        default: () => []
      },
      modelStr: {
        type: String,
        default: ""
      },
      show: {
        type: [Boolean],
        default: false
      },
      selectedModel: {
        type: String,
        default: "id"
      },
      color: {
        type: String,
        default: "primary"
      },
      linear: {
        type: String,
        default: ""
      },
      linearDeep: {
        type: String,
        default: "light"
      },
      btnRound: {
        type: Number,
        default: 3
      },
      round: {
        type: Number,
        default: 12
      }
    }),
    emits: ["update:show", "update:modelValue", "update:modelStr", "confirm", "cancel"],
    setup(__props, { emit: emits }) {
      var _a2, _b2;
      const props = __props;
      (_b2 = (_a2 = (0, import_vue20.getCurrentInstance)()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const drawer = (0, import_vue20.ref)(null);
      const showCity = (0, import_vue20.ref)(true);
      const _colIndex = (0, import_vue20.ref)([]);
      const _data = (0, import_vue20.ref)(chiliFormatCity_area());
      const _colStr = (0, import_vue20.ref)("");
      const aniover = (0, import_vue20.ref)(true);
      const sysinfo = (0, import_vue20.inject)("tmuiSysInfo", { bottom: 0, height: 750, width: uni.upx2px(750), top: 0, isCustomHeader: false, sysinfo: null });
      let win_bottom = sysinfo.bottom;
      (0, import_vue20.watchEffect)(() => {
        showCity.value = props.show;
      });
      function closeDrawer(e) {
        showCity.value = e;
        emits("update:show", showCity.value);
        getIndexBymodel(_data.value, props.selectedModel, 0, props.modelValue);
      }
      getIndexBymodel(_data.value, props.selectedModel, 0, props.modelValue);
      function drawerOpen() {
      }
      function confirm() {
        var _a22;
        if (!aniover.value)
          return;
        setVal();
        emits("confirm", props.modelValue);
        (_a22 = drawer.value) == null ? void 0 : _a22.close();
      }
      function cancel() {
        if (!aniover.value)
          return;
        emits("cancel");
      }
      function setVal() {
        var _a22;
        let val = [];
        if (props.selectedModel == "name") {
          val = (_a22 = _colStr.value.split("/")) != null ? _a22 : [];
        } else if (props.selectedModel == "id") {
          val = getRouterId(_data.value, 0);
        } else {
          val = [..._colIndex.value];
        }
        emits("update:modelValue", val);
        emits("update:modelStr", _colStr.value);
      }
      function getIndexBymodel(vdata = [], model = "name", parentIndex = 0, value = []) {
        if (model == "name") {
          let item = vdata.filter((el) => value[parentIndex] == el["text"]);
          if (item.length == 0) {
            item = vdata[0];
            if (item) {
              value[parentIndex] = item["text"];
              _colIndex.value[parentIndex] = 0;
              if (item["children"]) {
                getIndexBymodel(item["children"], model, parentIndex + 1, value);
              }
            }
          } else {
            item = item[0];
            if (item) {
              _colIndex.value[parentIndex] = vdata.findIndex((el) => el["text"] == item["text"]);
              if (item["children"]) {
                getIndexBymodel(item["children"], model, parentIndex + 1, value);
              }
            }
          }
        } else if (model == "id") {
          let item = vdata.filter((el) => value[parentIndex] == el["id"]);
          if (item.length == 0) {
            item = vdata[0];
            if (item) {
              value[parentIndex] = item["id"];
              _colIndex.value[parentIndex] = 0;
              if (item["children"]) {
                getIndexBymodel(item["children"], model, parentIndex + 1, value);
              }
            }
          } else {
            item = item[0];
            if (item) {
              _colIndex.value[parentIndex] = vdata.findIndex((el) => el["id"] == item["id"]);
              if (item["children"]) {
                getIndexBymodel(item["children"], model, parentIndex + 1, value);
              }
            }
          }
        }
        return _colIndex.value;
      }
      function getRouterId(list = [], parentIndex = 0) {
        let p = [];
        for (let i = 0; i < list.length; i++) {
          if (i == _colIndex.value[parentIndex]) {
            p.push(list[i]["id"]);
            if (typeof _colIndex.value[parentIndex] != "undefined") {
              let c = getRouterId(list[i]["children"], parentIndex + 1);
              p = [...p, ...c];
            }
            break;
          }
        }
        return p;
      }
      function chiliFormatCity_area() {
        let list = [];
        provinceData.forEach((item, index) => {
          var _a22;
          list.push({
            id: (_a22 = item.value) != null ? _a22 : "",
            text: String(item.label),
            children: []
          });
        });
        if (props.cityLevel == "province")
          return list;
        cityData.forEach((item, index) => {
          item.forEach((citem, cindex) => {
            var _a22, _b22, _c;
            (_c = list[index]) == null ? void 0 : _c.children.push({
              id: (_a22 = citem.value) != null ? _a22 : "",
              text: (_b22 = citem.label) != null ? _b22 : "",
              children: []
            });
          });
        });
        if (props.cityLevel == "city")
          return list;
        list.forEach((item, index) => {
          item.children.forEach((citem, cindex) => {
            areaData[index][cindex].forEach((jitem) => {
              var _a22, _b22, _c, _d;
              (_d = (_a22 = list[index]) == null ? void 0 : _a22.children[cindex]) == null ? void 0 : _d.children.push({
                id: (_b22 = jitem.value) != null ? _b22 : "",
                text: (_c = jitem.label) != null ? _c : ""
              });
            });
          });
        });
        return list;
      }
      return (_ctx, _cache) => {
        return showCity.value ? ((0, import_vue20.openBlock)(), (0, import_vue20.createBlock)(tmDrawer, {
          key: 0,
          disabbleScroll: true,
          round: props.round,
          ref_key: "drawer",
          ref: drawer,
          height: 820,
          closable: true,
          overlayClick: aniover.value,
          onOpen: drawerOpen,
          onCancel: cancel,
          onOk: confirm,
          show: showCity.value,
          "onUpdate:show": closeDrawer,
          title: "\u8BF7\u9009\u62E9\u5730\u533A",
          "ok-text": "\u786E\u8BA4"
        }, {
          default: (0, import_vue20.withCtx)(() => [
            (0, import_vue20.createVNode)(tmPickerView, {
              height: 590,
              onEnd: _cache[0] || (_cache[0] = ($event) => aniover.value = true),
              onStart: _cache[1] || (_cache[1] = ($event) => aniover.value = false),
              value: _colIndex.value,
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _colIndex.value = $event),
              "onUpdate:modelStr": _cache[3] || (_cache[3] = ($event) => _colStr.value = $event),
              "model-str": _colStr.value,
              "default-value": _colIndex.value,
              columns: _data.value
            }, null, 8, ["value", "model-str", "default-value", "columns"]),
            (0, import_vue20.createVNode)(TmButton, {
              label: "\u786E\u8BA4\u9009\u62E9",
              block: "",
              margin: [32, 12],
              color: props.color,
              linear: props.linear,
              "linear-deep": props.linearDeep,
              onClick: confirm,
              round: props.btnRound
            }, null, 8, ["color", "linear", "linear-deep", "round"]),
            (0, import_vue20.createElementVNode)("view", {
              style: (0, import_vue20.normalizeStyle)({ height: (0, import_vue20.unref)(win_bottom) + "px" })
            }, null, 4)
          ]),
          _: 1
        }, 8, ["round", "overlayClick", "show"])) : (0, import_vue20.createCommentVNode)("v-if", true);
      };
    }
  });
  var tmCityPicker = /* @__PURE__ */ _export_sfc(_sfc_main20, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-city-picker/tm-city-picker.vue"]]);

  // F:/CoinQT/CoinQT_app/unpackage/dist/dev/.nvue/tm-time-picker.js
  var import_vue21 = __toESM(require_vue());
  var __defProp21 = Object.defineProperty;
  var __defProps20 = Object.defineProperties;
  var __getOwnPropDescs20 = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols20 = Object.getOwnPropertySymbols;
  var __hasOwnProp21 = Object.prototype.hasOwnProperty;
  var __propIsEnum20 = Object.prototype.propertyIsEnumerable;
  var __defNormalProp20 = (obj, key, value) => key in obj ? __defProp21(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues20 = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp21.call(b, prop))
        __defNormalProp20(a, prop, b[prop]);
    if (__getOwnPropSymbols20)
      for (var prop of __getOwnPropSymbols20(b)) {
        if (__propIsEnum20.call(b, prop))
          __defNormalProp20(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps20 = (a, b) => __defProps20(a, __getOwnPropDescs20(b));
  var timeDetailType = /* @__PURE__ */ ((timeDetailType2) => {
    timeDetailType2["year"] = "year";
    timeDetailType2["month"] = "month";
    timeDetailType2["day"] = "date";
    timeDetailType2["hour"] = "hour";
    timeDetailType2["minute"] = "minute";
    timeDetailType2["second"] = "second";
    return timeDetailType2;
  })(timeDetailType || {});
  var _style_09 = { "top": { "": { "backgroundImage": "linear-gradient(to bottom,rgba(17, 17, 17, 1),rgba(36, 36, 36, 0.6))" } }, "bottom": { "": { "backgroundImage": "linear-gradient(to top,rgba(17, 17, 17, 1),rgba(36, 36, 36, 0.6))" } } };
  var _sfc_main$23 = /* @__PURE__ */ (0, import_vue21.defineComponent)({
    __name: "time-panel",
    props: {
      nowtime: {
        type: String,
        default: "",
        required: true
      },
      start: {
        type: String,
        default: "",
        required: true
      },
      end: {
        type: String,
        default: "",
        required: true
      },
      timeType: {
        type: String,
        default: "year",
        required: true
      },
      disabledDate: {
        type: Array,
        default: () => []
      },
      height: {
        type: Number,
        default: 600
      },
      suffix: {
        type: String,
        default: ""
      }
    },
    setup(__props) {
      var _a2;
      const props = __props;
      const dom = requireNativePlugin("dom");
      dayjs.extend(isBetween);
      dayjs.extend(isSameOrBefore);
      dayjs.extend(isSameOrAfter);
      const DayJs = dayjs;
      const { proxy } = (0, import_vue21.getCurrentInstance)();
      const store = useTmpiniaStore();
      let parent = proxy.$parent;
      while (parent) {
        if ((parent == null ? void 0 : parent.tmTimeViewName) == "tmTimeViewName" || !parent) {
          break;
        } else {
          parent = (_a2 = parent == null ? void 0 : parent.$parent) != null ? _a2 : void 0;
        }
      }
      const tmArray = (0, import_vue21.ref)([]);
      const _nowtimeValue = (0, import_vue21.computed)(() => DayJs(props.nowtime));
      const colIndex = (0, import_vue21.ref)(0);
      const isDark = (0, import_vue21.computed)(() => store.tmStore.dark);
      const maskHeight = (0, import_vue21.computed)(() => {
        return (uni.upx2px(props.height) - 34) / 2;
      });
      const maskWidth = (0, import_vue21.ref)(0);
      (0, import_vue21.computed)(() => {
        let str_white = "background-image:linear-gradient(rgba(255,255,255,0.95),rgba(255,255,255,0.6)),linear-gradient(rgba(255,255,255,0.6),rgba(255,255,255,0.95))";
        let str_black = "background-image:linear-gradient(rgba(17, 17, 17, 1.0),rgba(106, 106, 106, 0.2)),linear-gradient(rgba(106, 106, 106, 0.2),rgba(17, 17, 17, 1.0))";
        str_black = "background-image: linear-gradient(to bottom,rgba(30, 30, 30, 0.9),rgba(104, 104, 104, 0.6))";
        if (!isDark.value) {
          return str_white;
        }
        return str_black;
      });
      (0, import_vue21.watch)([() => props.start, () => props.end], () => {
        rangeTimeArray();
      });
      (0, import_vue21.watch)([() => props.nowtime], (newval, oldval) => {
        if (DayJs(String(oldval)).isSame(String(newval), props.timeType)) {
          return;
        }
        rangeTimeArray();
      });
      (0, import_vue21.onMounted)(() => {
        nvuegetClientRect();
        (0, import_vue21.nextTick)(() => {
          setTimeout(() => {
            rangeTimeArray();
          }, 60);
        });
      });
      (0, import_vue21.onUpdated)(() => nvuegetClientRect());
      function getIndexNow() {
        let index = tmArray.value.findIndex((el) => el == _nowtimeValue.value[props.timeType]());
        if (index == -1)
          index = 0;
        if (index >= tmArray.value.length)
          index = tmArray.value.length - 1;
        colIndex.value = index;
      }
      function rangeTimeArray() {
        let _start = DayJs(props.start);
        let _end = DayJs(props.end);
        let intdate = 0;
        if (props.timeType == "date") {
          intdate = 1;
        }
        if (props.timeType == "year") {
          intdate = _start.year();
        }
        if (props.timeType == "year") {
          tmArray.value = rangeNumber(intdate, _end.year());
        } else if (props.timeType == "month") {
          setd(timeDetailType.year, false);
        } else if (props.timeType == "date") {
          setd(timeDetailType.month, false);
        } else if (props.timeType == "hour") {
          setd(timeDetailType.day, false);
        } else if (props.timeType == "minute") {
          setd(timeDetailType.hour, false);
        } else if (props.timeType == "second") {
          setd(timeDetailType.minute, false);
        } else if (props.timeType == "second") {
          setd(timeDetailType.second, false);
        }
        function setd(type, isno = true) {
          if (_nowtimeValue.value.isSameOrBefore(_start, type)) {
            intdate = _start[props.timeType]();
            tmArray.value = rangeNumber(intdate, getEndNumber(_start, true));
          } else if (_nowtimeValue.value.isSameOrAfter(_end, type)) {
            tmArray.value = rangeNumber(intdate, getEndNumber(_end, isno));
          } else if (_nowtimeValue.value.isBetween(_start, _end, props.timeType, "()")) {
            tmArray.value = rangeNumber(intdate, getEndNumber(_nowtimeValue.value, true));
          }
        }
        (0, import_vue21.nextTick)(() => getIndexNow());
      }
      function getEndNumber(d, isno = true) {
        DayJs(props.start);
        let _end = DayJs(props.end);
        let jh = {
          year: _end.year(),
          month: 11,
          date: d.daysInMonth(),
          hour: 23,
          minute: 59,
          second: 59
        };
        if (isno)
          return jh[props.timeType];
        return d[props.timeType]();
      }
      function rangeNumber(from = 0, to = 0) {
        let range = [];
        from = from >= 0 ? from : 1;
        for (let i = from; i <= to; i++) {
          range.push(i);
        }
        return range;
      }
      function colchange(e) {
        if (tmArray.value.length == 0)
          return;
        parent == null ? void 0 : parent.setNowtime(tmArray.value[e.detail.value[0]], props.timeType);
      }
      function nvuegetClientRect() {
        (0, import_vue21.nextTick)(function() {
          dom.getComponentRect(proxy.$refs.picker, function(res) {
            if (res == null ? void 0 : res.size) {
              maskWidth.value = res.size.width;
              if (res.size.width == 0) {
                nvuegetClientRect();
              }
            }
          });
        });
      }
      return (_ctx, _cache) => {
        const _component_picker_view_column = (0, import_vue21.resolveComponent)("picker-view-column");
        const _component_picker_view = (0, import_vue21.resolveComponent)("picker-view");
        return (0, import_vue21.openBlock)(), (0, import_vue21.createElementBlock)(import_vue21.Fragment, null, [
          (0, import_vue21.createCommentVNode)(" background:linear-gradient(180deg,rgba(255,255,255,0.95),rgba(255,255,255,0.6)),linear-gradient(0deg, rgba(255,255,255,0.95), rgba(255,255,255,0.6)) "),
          (0, import_vue21.createCommentVNode)(` :mask-style="isDark?'background:linear-gradient(0deg,rgba(0,0,0,0.4),rgba(0,0,0,0),rgba(0,0,0,0.4))':'background:rgba(255,255,255,0)'" `),
          (0, import_vue21.createElementVNode)("view", {
            class: "flex-1 relative",
            style: (0, import_vue21.normalizeStyle)({ height: props.height + "rpx" })
          }, [
            (0, import_vue21.createVNode)(_component_picker_view, {
              ref: "picker",
              value: [colIndex.value],
              onChange: colchange,
              style: (0, import_vue21.normalizeStyle)([{ height: props.height + "rpx" }])
            }, {
              default: (0, import_vue21.withCtx)(() => [
                (0, import_vue21.createVNode)(_component_picker_view_column, {
                  style: (0, import_vue21.normalizeStyle)([{ height: props.height + "rpx" }])
                }, {
                  default: (0, import_vue21.withCtx)(() => [
                    ((0, import_vue21.openBlock)(true), (0, import_vue21.createElementBlock)(import_vue21.Fragment, null, (0, import_vue21.renderList)(tmArray.value, (item, index) => {
                      return (0, import_vue21.openBlock)(), (0, import_vue21.createElementBlock)("view", {
                        key: index,
                        class: "flex",
                        style: { "justify-content": "center", "height": "34px", "align-items": "center" }
                      }, [
                        props.timeType != "month" ? ((0, import_vue21.openBlock)(), (0, import_vue21.createBlock)(tmText, {
                          key: 0,
                          "font-size": 30,
                          dark: (0, import_vue21.unref)(isDark),
                          label: item + props.suffix
                        }, null, 8, ["dark", "label"])) : (0, import_vue21.createCommentVNode)("v-if", true),
                        props.timeType == "month" ? ((0, import_vue21.openBlock)(), (0, import_vue21.createBlock)(tmText, {
                          key: 1,
                          "font-size": 30,
                          dark: (0, import_vue21.unref)(isDark),
                          label: item + 1 + props.suffix
                        }, null, 8, ["dark", "label"])) : (0, import_vue21.createCommentVNode)("v-if", true)
                      ]);
                    }), 128))
                  ]),
                  _: 1
                }, 8, ["style"])
              ]),
              _: 1
            }, 8, ["value", "style"]),
            (0, import_vue21.unref)(isDark) ? ((0, import_vue21.openBlock)(), (0, import_vue21.createElementBlock)("view", {
              key: 0,
              userInteractionEnabled: false,
              class: "top absolute l-0 t-0",
              style: (0, import_vue21.normalizeStyle)({ height: (0, import_vue21.unref)(maskHeight) + "px", width: maskWidth.value + "px" })
            }, null, 4)) : (0, import_vue21.createCommentVNode)("v-if", true),
            (0, import_vue21.unref)(isDark) ? ((0, import_vue21.openBlock)(), (0, import_vue21.createElementBlock)("view", {
              key: 1,
              userInteractionEnabled: false,
              class: "bottom absolute l-0 b-0",
              style: (0, import_vue21.normalizeStyle)({ height: (0, import_vue21.unref)(maskHeight) + "px", width: maskWidth.value + "px" })
            }, null, 4)) : (0, import_vue21.createCommentVNode)("v-if", true)
          ], 4)
        ], 2112);
      };
    }
  });
  var timePanelVue = /* @__PURE__ */ _export_sfc(_sfc_main$23, [["styles", [_style_09]], ["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-time-view/time-panel.vue"]]);
  var _sfc_main$16 = /* @__PURE__ */ (0, import_vue21.defineComponent)({
    __name: "tm-time-view",
    props: {
      modelValue: {
        type: [Number, String, Date],
        default: ""
      },
      modelStr: {
        type: [String],
        default: ""
      },
      defaultValue: {
        type: [Number, String, Date],
        default: ""
      },
      disabledDate: {
        type: Array,
        default: () => []
      },
      format: {
        type: String,
        default: "YYYY/MM/DD"
      },
      showDetail: {
        type: Object,
        default: () => {
          return {
            year: true,
            month: true,
            day: true,
            hour: false,
            minute: false,
            second: false
          };
        }
      },
      showSuffix: {
        type: Object,
        default: () => {
          return {
            year: "\u5E74",
            month: "\u6708",
            day: "\u65E5",
            hour: "\u65F6",
            minute: "\u5206",
            second: "\u79D2"
          };
        }
      },
      start: {
        type: [Number, String, Date],
        default: "2008/01/01 00:00:00"
      },
      end: {
        type: [Number, String, Date],
        default: ""
      },
      height: {
        type: Number,
        default: 300
      }
    },
    emits: ["update:modelValue", "update:modelStr", "change"],
    setup(__props, { expose, emit: emits }) {
      const props = __props;
      const tmTimeViewName = "tmTimeViewName";
      const DayJs = dayjs;
      const _nowtime = (0, import_vue21.ref)(DayJs(props.defaultValue).isValid() ? DayJs(props.defaultValue) : DayJs());
      const _nowtimeValue = (0, import_vue21.computed)(() => _nowtime.value.format());
      const _startTime = (0, import_vue21.computed)(() => {
        return DayJs(props.start).isValid() ? DayJs(props.start).format() : DayJs("2008/01/01 00:00:00").format();
      });
      const _endTime = (0, import_vue21.computed)(() => {
        return DayJs(props.end).isValid() ? DayJs(props.end).format() : DayJs().format();
      });
      const showCol = (0, import_vue21.computed)(() => props.showDetail);
      function setNowtime(data, type) {
        let d = DayJs((0, import_vue21.toRaw)(_nowtime.value));
        const old = _nowtimeValue.value;
        _nowtime.value = DayJs(d[type](data));
        if (isDisabledDate(_nowtime.value.format())) {
          (0, import_vue21.nextTick)(() => _nowtime.value = DayJs(old));
          return;
        }
        emits("update:modelValue", _nowtime.value.format("YYYY/MM/DD HH:mm:ss"));
        emits("update:modelStr", _nowtime.value.format(props.format));
        emits("change", _nowtime.value.format(props.format));
      }
      function isDisabledDate(nowtime) {
        let d = DayJs(nowtime);
        let len = props.disabledDate.filter((el) => {
          return d.isSame(el, timeDetailType.day);
        });
        return len.length > 0;
      }
      (0, import_vue21.watch)(() => props.modelValue, (newval, oldval) => {
        if (DayJs(props.modelValue).isValid() == false || !oldval)
          return;
        _nowtime.value = DayJs(props.modelValue);
        emits("update:modelStr", _nowtime.value.format(props.format));
      });
      (0, import_vue21.onMounted)(() => {
        (0, import_vue21.nextTick)(() => {
          emits("update:modelValue", _nowtime.value.format(props.format));
          emits("update:modelStr", _nowtime.value.format(props.format));
        });
      });
      expose({ tmTimeViewName, setNowtime });
      return (_ctx, _cache) => {
        return (0, import_vue21.openBlock)(), (0, import_vue21.createElementBlock)("view", {
          class: "flex flex-row",
          renderWhole: true
        }, [
          (0, import_vue21.unref)(showCol).year ? ((0, import_vue21.openBlock)(), (0, import_vue21.createBlock)(timePanelVue, {
            key: 0,
            suffix: props.showSuffix.year,
            height: props.height,
            disabledDate: props.disabledDate,
            "time-type": (0, import_vue21.unref)(timeDetailType).year,
            start: (0, import_vue21.unref)(_startTime),
            end: (0, import_vue21.unref)(_endTime),
            nowtime: (0, import_vue21.unref)(_nowtimeValue),
            class: "flex-1"
          }, null, 8, ["suffix", "height", "disabledDate", "time-type", "start", "end", "nowtime"])) : (0, import_vue21.createCommentVNode)("v-if", true),
          (0, import_vue21.unref)(showCol).month ? ((0, import_vue21.openBlock)(), (0, import_vue21.createBlock)(timePanelVue, {
            key: 1,
            suffix: props.showSuffix.month,
            height: props.height,
            disabledDate: props.disabledDate,
            "time-type": (0, import_vue21.unref)(timeDetailType).month,
            start: (0, import_vue21.unref)(_startTime),
            end: (0, import_vue21.unref)(_endTime),
            nowtime: (0, import_vue21.unref)(_nowtimeValue),
            class: "flex-1"
          }, null, 8, ["suffix", "height", "disabledDate", "time-type", "start", "end", "nowtime"])) : (0, import_vue21.createCommentVNode)("v-if", true),
          (0, import_vue21.unref)(showCol).day ? ((0, import_vue21.openBlock)(), (0, import_vue21.createBlock)(timePanelVue, {
            key: 2,
            suffix: props.showSuffix.day,
            height: props.height,
            disabledDate: props.disabledDate,
            "time-type": (0, import_vue21.unref)(timeDetailType).day,
            start: (0, import_vue21.unref)(_startTime),
            end: (0, import_vue21.unref)(_endTime),
            nowtime: (0, import_vue21.unref)(_nowtimeValue),
            class: "flex-1"
          }, null, 8, ["suffix", "height", "disabledDate", "time-type", "start", "end", "nowtime"])) : (0, import_vue21.createCommentVNode)("v-if", true),
          (0, import_vue21.unref)(showCol).hour ? ((0, import_vue21.openBlock)(), (0, import_vue21.createBlock)(timePanelVue, {
            key: 3,
            suffix: props.showSuffix.hour,
            height: props.height,
            disabledDate: props.disabledDate,
            "time-type": (0, import_vue21.unref)(timeDetailType).hour,
            start: (0, import_vue21.unref)(_startTime),
            end: (0, import_vue21.unref)(_endTime),
            nowtime: (0, import_vue21.unref)(_nowtimeValue),
            class: "flex-1"
          }, null, 8, ["suffix", "height", "disabledDate", "time-type", "start", "end", "nowtime"])) : (0, import_vue21.createCommentVNode)("v-if", true),
          (0, import_vue21.unref)(showCol).minute ? ((0, import_vue21.openBlock)(), (0, import_vue21.createBlock)(timePanelVue, {
            key: 4,
            suffix: props.showSuffix.minute,
            height: props.height,
            disabledDate: props.disabledDate,
            "time-type": (0, import_vue21.unref)(timeDetailType).minute,
            start: (0, import_vue21.unref)(_startTime),
            end: (0, import_vue21.unref)(_endTime),
            nowtime: (0, import_vue21.unref)(_nowtimeValue),
            class: "flex-1"
          }, null, 8, ["suffix", "height", "disabledDate", "time-type", "start", "end", "nowtime"])) : (0, import_vue21.createCommentVNode)("v-if", true),
          (0, import_vue21.unref)(showCol).second ? ((0, import_vue21.openBlock)(), (0, import_vue21.createBlock)(timePanelVue, {
            key: 5,
            suffix: props.showSuffix.second,
            height: props.height,
            disabledDate: props.disabledDate,
            "time-type": (0, import_vue21.unref)(timeDetailType).second,
            start: (0, import_vue21.unref)(_startTime),
            end: (0, import_vue21.unref)(_endTime),
            nowtime: (0, import_vue21.unref)(_nowtimeValue),
            class: "flex-1"
          }, null, 8, ["suffix", "height", "disabledDate", "time-type", "start", "end", "nowtime"])) : (0, import_vue21.createCommentVNode)("v-if", true)
        ]);
      };
    }
  });
  var tmTimeView = /* @__PURE__ */ _export_sfc(_sfc_main$16, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-time-view/tm-time-view.vue"]]);
  var _sfc_main21 = /* @__PURE__ */ (0, import_vue21.defineComponent)({
    __name: "tm-time-picker",
    props: __spreadProps20(__spreadValues20({}, custom_props), {
      show: {
        type: Boolean,
        default: false
      },
      modelValue: {
        type: [Number, String, Date],
        default: ""
      },
      modelStr: {
        type: [String],
        default: ""
      },
      defaultValue: {
        type: [Number, String, Date],
        default: ""
      },
      disabledDate: {
        type: Array,
        default: () => []
      },
      format: {
        type: String,
        default: "YYYY/MM/DD"
      },
      showDetail: {
        type: Object,
        default: () => {
          return {
            year: true,
            month: true,
            day: true,
            hour: false,
            minute: false,
            second: false
          };
        }
      },
      showSuffix: {
        type: Object,
        default: () => {
          return {
            year: "\u5E74",
            month: "\u6708",
            day: "\u65E5",
            hour: "\u65F6",
            minute: "\u5206",
            second: "\u79D2"
          };
        }
      },
      start: {
        type: [Number, String, Date],
        default: "2008/01/01 00:00:00"
      },
      end: {
        type: [Number, String, Date],
        default: ""
      },
      height: {
        type: Number,
        default: 700
      },
      color: {
        type: String,
        default: "primary"
      },
      linear: {
        type: String,
        default: ""
      },
      linearDeep: {
        type: String,
        default: "light"
      },
      btnRound: {
        type: Number,
        default: 3
      },
      round: {
        type: Number,
        default: 12
      }
    }),
    emits: ["update:modelValue", "update:modelStr", "update:show", "confirm", "change", "cancel", "close", "open"],
    setup(__props, { emit: emits }) {
      var _a2, _b2;
      const props = __props;
      (_b2 = (_a2 = (0, import_vue21.getCurrentInstance)()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const drawer = (0, import_vue21.ref)(null);
      const _show = (0, import_vue21.ref)(props.show);
      const isConfirm = (0, import_vue21.ref)(false);
      const _value = (0, import_vue21.ref)(props.defaultValue);
      const _strvalue = (0, import_vue21.ref)("");
      const sysinfo = (0, import_vue21.inject)("tmuiSysInfo", (0, import_vue21.computed)(() => {
        return { bottom: 0, height: 750, width: uni.upx2px(750), top: 0, isCustomHeader: false, sysinfo: null };
      }));
      function close() {
        if (!isConfirm.value) {
          emits("cancel");
          _value.value = "";
          (0, import_vue21.nextTick)(() => {
            _value.value = props.modelValue ? props.modelValue : props.defaultValue;
          });
        }
        emits("close");
        emits("update:show", false);
        isConfirm.value = false;
      }
      function open() {
        emits("open");
      }
      (0, import_vue21.watchEffect)(() => {
        _show.value = props.show;
      });
      (0, import_vue21.watch)(() => props.modelValue, () => {
        _value.value = props.modelValue;
      }, { deep: true });
      function change(e) {
        emits("change", e);
      }
      function confirm() {
        var _a22;
        emits("confirm", _value.value);
        emits("update:modelValue", _value.value);
        emits("update:modelStr", _strvalue.value);
        isConfirm.value = true;
        (_a22 = drawer.value) == null ? void 0 : _a22.close();
      }
      const dHeight = (0, import_vue21.computed)(() => {
        return props.height + sysinfo.value.bottom + 80;
      });
      return (_ctx, _cache) => {
        return (0, import_vue21.openBlock)(), (0, import_vue21.createBlock)(tmDrawer, {
          disabbleScroll: true,
          round: props.round,
          ref_key: "drawer",
          ref: drawer,
          height: (0, import_vue21.unref)(dHeight),
          "onUpdate:show": _cache[2] || (_cache[2] = ($event) => _show.value = $event),
          show: _show.value,
          onClose: close,
          "ok-color": props.color,
          onOpen: open,
          title: "\u8BF7\u9009\u62E9\u65F6\u95F4",
          closable: true,
          onOk: confirm
        }, {
          default: (0, import_vue21.withCtx)(() => [
            (0, import_vue21.createVNode)(tmTimeView, {
              height: (0, import_vue21.unref)(dHeight) - 230,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _value.value = $event),
              "model-value": _value.value,
              "onUpdate:modelStr": _cache[1] || (_cache[1] = ($event) => _strvalue.value = $event),
              "model-str": _strvalue.value,
              "default-value": _value.value,
              onChange: change,
              disabledDate: props.disabledDate,
              format: props.format,
              showDetail: props.showDetail,
              showSuffix: props.showSuffix,
              start: props.start,
              end: props.end
            }, null, 8, ["height", "model-value", "model-str", "default-value", "disabledDate", "format", "showDetail", "showSuffix", "start", "end"]),
            (0, import_vue21.createVNode)(TmButton, {
              label: "\u786E\u8BA4\u9009\u62E9",
              block: "",
              margin: [32, 12],
              color: props.color,
              linear: props.linear,
              "linear-deep": props.linearDeep,
              onClick: confirm,
              round: props.btnRound
            }, null, 8, ["color", "linear", "linear-deep", "round"]),
            (0, import_vue21.createElementVNode)("view", {
              style: (0, import_vue21.normalizeStyle)({ height: (0, import_vue21.unref)(sysinfo).bottom + "px" })
            }, null, 4)
          ]),
          _: 1
        }, 8, ["round", "height", "show", "ok-color"]);
      };
    }
  });
  var tmTimePicker = /* @__PURE__ */ _export_sfc(_sfc_main21, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-time-picker/tm-time-picker.vue"]]);

  // F:/CoinQT/CoinQT_app/unpackage/dist/dev/.nvue/tm-picker.js
  var import_vue22 = __toESM(require_vue());
  var __defProp22 = Object.defineProperty;
  var __defProps21 = Object.defineProperties;
  var __getOwnPropDescs21 = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols21 = Object.getOwnPropertySymbols;
  var __hasOwnProp22 = Object.prototype.hasOwnProperty;
  var __propIsEnum21 = Object.prototype.propertyIsEnumerable;
  var __defNormalProp21 = (obj, key, value) => key in obj ? __defProp22(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues21 = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp22.call(b, prop))
        __defNormalProp21(a, prop, b[prop]);
    if (__getOwnPropSymbols21)
      for (var prop of __getOwnPropSymbols21(b)) {
        if (__propIsEnum21.call(b, prop))
          __defNormalProp21(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps21 = (a, b) => __defProps21(a, __getOwnPropDescs21(b));
  var _sfc_main22 = /* @__PURE__ */ (0, import_vue22.defineComponent)({
    __name: "tm-picker",
    props: __spreadProps21(__spreadValues21({}, custom_props), {
      modelValue: {
        type: Array,
        default: () => []
      },
      modelStr: {
        type: [String],
        default: ""
      },
      defaultValue: {
        type: Array,
        default: () => []
      },
      selectedModel: {
        type: String,
        default: "index"
      },
      columns: {
        type: Array,
        default: () => [],
        required: true
      },
      dataKey: {
        type: String,
        default: "text"
      },
      beforeChange: {
        type: [Boolean, Function],
        default: () => false
      },
      show: {
        type: [Boolean],
        default: false
      },
      color: {
        type: String,
        default: "primary"
      },
      linear: {
        type: String,
        default: ""
      },
      linearDeep: {
        type: String,
        default: "light"
      },
      btnRound: {
        type: Number,
        default: 3
      },
      round: {
        type: Number,
        default: 12
      },
      height: {
        type: Number,
        default: 700
      }
    }),
    emits: ["update:show", "update:modelValue", "update:modelStr", "confirm", "cancel", "close", "open"],
    setup(__props, { emit: emits }) {
      var _a2, _b2;
      const props = __props;
      const drawer = (0, import_vue22.ref)(null);
      (_b2 = (_a2 = (0, import_vue22.getCurrentInstance)()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const showCity = (0, import_vue22.ref)(true);
      const _colIndex = (0, import_vue22.ref)([]);
      const _data = (0, import_vue22.computed)(() => props.columns);
      const _colStr = (0, import_vue22.ref)(props.modelStr);
      const aniover = (0, import_vue22.ref)(true);
      const sysinfo = (0, import_vue22.inject)("tmuiSysInfo", (0, import_vue22.computed)(() => {
        return { bottom: 0, height: 750, width: uni.upx2px(750), top: 0, isCustomHeader: false, sysinfo: null };
      }));
      (0, import_vue22.watchEffect)(() => {
        showCity.value = props.show;
      });
      function closeDrawer(e) {
        showCity.value = e;
        emits("update:show", showCity.value);
        getIndexBymodel(_data.value, props.selectedModel, 0, props.modelValue);
        emits("close");
      }
      function drawerOpen() {
        emits("open");
      }
      getIndexBymodel(_data.value, props.selectedModel, 0, props.defaultValue);
      setVal();
      function confirm() {
        var _a22;
        setVal();
        emits("confirm", (0, import_vue22.toRaw)(_colIndex.value));
        (_a22 = drawer.value) == null ? void 0 : _a22.close();
      }
      function cancel() {
        if (!aniover.value)
          return;
        emits("cancel");
      }
      function setVal() {
        var _a22;
        let val = [];
        if (props.selectedModel == "name") {
          val = (_a22 = _colStr.value.split("/")) != null ? _a22 : [];
        } else if (props.selectedModel == "id") {
          val = getRouterId(_data.value, 0);
        } else {
          val = [..._colIndex.value];
        }
        emits("update:modelValue", val);
        emits("update:modelStr", _colStr.value);
      }
      function getIndexBymodel(vdata = [], model = "name", parentIndex = 0, value = []) {
        if (model == "name") {
          let item = vdata.filter((el) => value[parentIndex] == el["text"]);
          if (item.length == 0) {
            item = vdata[0];
            if (item) {
              value[parentIndex] = item["text"];
              _colIndex.value[parentIndex] = 0;
              if (item["children"]) {
                getIndexBymodel(item["children"], model, parentIndex + 1, value);
              }
            }
          } else {
            item = item[0];
            if (item) {
              _colIndex.value[parentIndex] = vdata.findIndex((el) => el["text"] == item["text"]);
              if (item["children"]) {
                getIndexBymodel(item["children"], model, parentIndex + 1, value);
              }
            }
          }
        } else if (model == "id") {
          let item = vdata.filter((el) => value[parentIndex] == el["id"]);
          if (item.length == 0) {
            item = vdata[0];
            if (item) {
              value[parentIndex] = item["id"];
              _colIndex.value[parentIndex] = 0;
              if (item["children"]) {
                getIndexBymodel(item["children"], model, parentIndex + 1, value);
              }
            }
          } else {
            item = item[0];
            if (item) {
              _colIndex.value[parentIndex] = vdata.findIndex((el) => el["id"] == item["id"]);
              if (item["children"]) {
                getIndexBymodel(item["children"], model, parentIndex + 1, value);
              }
            }
          }
        } else {
          _colIndex.value = [...value];
        }
        return _colIndex.value;
      }
      function getRouterId(list = [], parentIndex = 0) {
        let p = [];
        for (let i = 0; i < list.length; i++) {
          if (i == _colIndex.value[parentIndex]) {
            p.push(list[i]["id"]);
            if (typeof _colIndex.value[parentIndex] != "undefined") {
              let c = getRouterId(list[i]["children"], parentIndex + 1);
              p = [...p, ...c];
            }
            break;
          }
        }
        return p;
      }
      const dHeight = (0, import_vue22.computed)(() => {
        return props.height + sysinfo.value.bottom + 80;
      });
      return (_ctx, _cache) => {
        return showCity.value ? ((0, import_vue22.openBlock)(), (0, import_vue22.createBlock)(tmDrawer, {
          key: 0,
          disabbleScroll: true,
          round: props.round,
          ref_key: "drawer",
          ref: drawer,
          height: (0, import_vue22.unref)(dHeight),
          closable: true,
          overlayClick: aniover.value,
          onOpen: drawerOpen,
          onCancel: cancel,
          onOk: confirm,
          show: showCity.value,
          "onUpdate:show": closeDrawer,
          title: "\u8BF7\u9009\u62E9",
          "ok-text": "\u786E\u8BA4"
        }, {
          default: (0, import_vue22.withCtx)(() => [
            (0, import_vue22.createVNode)(tmPickerView, {
              dataKey: props.dataKey,
              height: (0, import_vue22.unref)(dHeight) - 230,
              onEnd: _cache[0] || (_cache[0] = ($event) => aniover.value = true),
              onStart: _cache[1] || (_cache[1] = ($event) => aniover.value = false),
              value: _colIndex.value,
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _colIndex.value = $event),
              "onUpdate:modelStr": _cache[3] || (_cache[3] = ($event) => _colStr.value = $event),
              "model-str": _colStr.value,
              "default-value": _colIndex.value,
              beforeChange: props.beforeChange,
              columns: (0, import_vue22.unref)(_data)
            }, null, 8, ["dataKey", "height", "value", "model-str", "default-value", "beforeChange", "columns"]),
            (0, import_vue22.createVNode)(TmButton, {
              label: "\u786E\u8BA4\u9009\u62E9",
              block: "",
              margin: [32, 12],
              color: props.color,
              linear: props.linear,
              "linear-deep": props.linearDeep,
              onClick: confirm,
              round: props.btnRound
            }, null, 8, ["color", "linear", "linear-deep", "round"]),
            (0, import_vue22.createElementVNode)("view", {
              style: (0, import_vue22.normalizeStyle)({ height: (0, import_vue22.unref)(sysinfo).bottom + "px" })
            }, null, 4)
          ]),
          _: 1
        }, 8, ["round", "height", "overlayClick", "show"])) : (0, import_vue22.createCommentVNode)("v-if", true);
      };
    }
  });
  var tmPicker = /* @__PURE__ */ _export_sfc(_sfc_main22, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-picker/tm-picker.vue"]]);

  // F:/CoinQT/CoinQT_app/unpackage/dist/dev/.nvue/tm-divider.js
  var import_vue23 = __toESM(require_vue());
  var __defProp23 = Object.defineProperty;
  var __defProps22 = Object.defineProperties;
  var __getOwnPropDescs22 = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols22 = Object.getOwnPropertySymbols;
  var __hasOwnProp23 = Object.prototype.hasOwnProperty;
  var __propIsEnum22 = Object.prototype.propertyIsEnumerable;
  var __defNormalProp22 = (obj, key, value) => key in obj ? __defProp23(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues22 = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp23.call(b, prop))
        __defNormalProp22(a, prop, b[prop]);
    if (__getOwnPropSymbols22)
      for (var prop of __getOwnPropSymbols22(b)) {
        if (__propIsEnum22.call(b, prop))
          __defNormalProp22(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps22 = (a, b) => __defProps22(a, __getOwnPropDescs22(b));
  var _sfc_main23 = /* @__PURE__ */ (0, import_vue23.defineComponent)({
    __name: "tm-divider",
    props: __spreadProps22(__spreadValues22({}, custom_props), {
      color: {
        type: String,
        default: "grey-3"
      },
      fontColor: {
        type: String,
        default: "grey-1"
      },
      fontSize: {
        type: Number,
        default: 26
      },
      vertical: {
        type: [Boolean],
        default: false
      },
      height: {
        type: [Number, String],
        default: 26
      },
      label: {
        type: String,
        default: ""
      },
      align: {
        type: String,
        default: "center"
      },
      margin: {
        type: Array,
        default: () => [16, 24]
      },
      border: {
        type: [Number],
        default: 1
      },
      realColor: {
        type: [Boolean],
        default: false
      }
    }),
    setup(__props) {
      var _a2, _b2;
      const props = __props;
      const store = useTmpiniaStore();
      const borderDir = (0, import_vue23.computed)(() => props.vertical ? "left" : "bottom");
      const _label = (0, import_vue23.computed)(() => props.label);
      (_b2 = (_a2 = (0, import_vue23.getCurrentInstance)()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const tmcfg = (0, import_vue23.computed)(() => store.tmStore);
      const _realColor = (0, import_vue23.computed)(() => props.realColor);
      const isDark = (0, import_vue23.computed)(() => computedDark(__spreadProps22(__spreadValues22({}, props), { borderDirection: borderDir.value }), tmcfg.value));
      const tmcomputed = (0, import_vue23.computed)(() => computedTheme(__spreadProps22(__spreadValues22({}, props), { borderDirection: borderDir.value }), isDark.value, tmcfg.value));
      return (_ctx, _cache) => {
        return (0, import_vue23.openBlock)(), (0, import_vue23.createElementBlock)("view", { renderWhole: true }, [
          !(0, import_vue23.unref)(_label) && props.vertical ? ((0, import_vue23.openBlock)(), (0, import_vue23.createElementBlock)("view", {
            key: 0,
            style: (0, import_vue23.normalizeStyle)([{ backgroundColor: (0, import_vue23.unref)(_realColor) ? (0, import_vue23.unref)(tmcomputed).color : (0, import_vue23.unref)(tmcomputed).border }, props.vertical ? { width: props.border + "rpx", height: props.height + "rpx" } : ""]),
            class: (0, import_vue23.normalizeClass)([props.vertical ? `mx-${props.margin[0]}` : `my-${props.margin[1]}`])
          }, null, 6)) : (0, import_vue23.createCommentVNode)("v-if", true),
          (0, import_vue23.unref)(_label) && !props.vertical ? ((0, import_vue23.openBlock)(), (0, import_vue23.createElementBlock)("view", {
            key: 1,
            class: "flex flex-row flex-center"
          }, [
            (0, import_vue23.createElementVNode)("view", {
              style: (0, import_vue23.normalizeStyle)([(0, import_vue23.unref)(tmcomputed) ? { backgroundColor: (0, import_vue23.unref)(_realColor) ? (0, import_vue23.unref)(tmcomputed).color : (0, import_vue23.unref)(tmcomputed).border, height: props.border + "rpx" } : ""]),
              class: (0, import_vue23.normalizeClass)([`my-${props.margin[1]}`, __props.align == "left" ? "flex-2" : "", __props.align == "right" ? "flex-10" : "", __props.align == "center" ? "flex-1" : ""])
            }, null, 6),
            props.label ? ((0, import_vue23.openBlock)(), (0, import_vue23.createElementBlock)("view", {
              key: 0,
              class: (0, import_vue23.normalizeClass)([(0, import_vue23.unref)(isDark) ? "opacity-4" : ""])
            }, [
              (0, import_vue23.createVNode)(tmText, {
                fontSize: props.fontSize,
                dark: (0, import_vue23.unref)(isDark),
                followTheme: props.followTheme,
                color: props.fontColor,
                label: props.label,
                _class: ["mx-32"]
              }, null, 8, ["fontSize", "dark", "followTheme", "color", "label"])
            ], 2)) : (0, import_vue23.createCommentVNode)("v-if", true),
            (0, import_vue23.createElementVNode)("view", {
              style: (0, import_vue23.normalizeStyle)([(0, import_vue23.unref)(tmcomputed) ? { backgroundColor: (0, import_vue23.unref)(_realColor) ? (0, import_vue23.unref)(tmcomputed).color : (0, import_vue23.unref)(tmcomputed).border, height: props.border + "rpx" } : ""]),
              class: (0, import_vue23.normalizeClass)([`my-${props.margin[1]}`, __props.align == "left" ? "flex-10" : "", __props.align == "right" ? "flex-2" : "", __props.align == "center" ? "flex-1" : ""])
            }, null, 6)
          ])) : (0, import_vue23.createCommentVNode)("v-if", true),
          !(0, import_vue23.unref)(_label) && !props.vertical ? ((0, import_vue23.openBlock)(), (0, import_vue23.createElementBlock)("view", {
            key: 2,
            class: "flex flex-row flex-center"
          }, [
            (0, import_vue23.createElementVNode)("view", {
              class: (0, import_vue23.normalizeClass)(["flex-1", [`my-${props.margin[1]}`]]),
              style: (0, import_vue23.normalizeStyle)([(0, import_vue23.unref)(tmcomputed) ? { backgroundColor: (0, import_vue23.unref)(_realColor) ? (0, import_vue23.unref)(tmcomputed).color : (0, import_vue23.unref)(tmcomputed).border, height: props.border + "rpx" } : ""])
            }, null, 6)
          ])) : (0, import_vue23.createCommentVNode)("v-if", true)
        ]);
      };
    }
  });
  var tmDivider = /* @__PURE__ */ _export_sfc(_sfc_main23, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-divider/tm-divider.vue"]]);

  // F:/CoinQT/CoinQT_app/unpackage/dist/dev/.nvue/pages/form/form.js
  var import_pinia2 = __toESM(require_pinia());
  var __defProp24 = Object.defineProperty;
  var __getOwnPropSymbols23 = Object.getOwnPropertySymbols;
  var __hasOwnProp24 = Object.prototype.hasOwnProperty;
  var __propIsEnum23 = Object.prototype.propertyIsEnumerable;
  var __defNormalProp23 = (obj, key, value) => key in obj ? __defProp24(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues23 = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp24.call(b, prop))
        __defNormalProp23(a, prop, b[prop]);
    if (__getOwnPropSymbols23)
      for (var prop of __getOwnPropSymbols23(b)) {
        if (__propIsEnum23.call(b, prop))
          __defNormalProp23(a, prop, b[prop]);
      }
    return a;
  };
  var _sfc_main$24 = /* @__PURE__ */ (0, import_vue24.defineComponent)({
    __name: "tm-form-item",
    props: {
      label: {
        type: String,
        default: ""
      },
      margin: {
        type: Array,
        default: () => [12, 12]
      },
      padding: {
        type: Array,
        default: () => [0, 0]
      },
      field: {
        type: String,
        default: ""
      },
      help: {
        type: String,
        default: ""
      },
      required: {
        type: Boolean,
        default: false
      },
      rules: {
        type: [Object, Array],
        default: () => {
          return [{ validator: false, required: false }];
        }
      },
      border: {
        type: Boolean,
        default: null
      },
      showError: {
        type: Boolean,
        default: true
      },
      requiredTitleChangeColor: {
        type: Boolean,
        default: true
      }
    },
    setup(__props, { expose }) {
      var _a2, _b2, _c;
      const props = __props;
      const proxy = (_b2 = (_a2 = (0, import_vue24.getCurrentInstance)()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const tmFormComnameFormItem = "tmFormComnameFormItem";
      const item = (0, import_vue24.ref)({
        label: "",
        field: props.field,
        value: null,
        isRequiredError: false,
        message: "",
        id: uni.$tm.u.getUid(1),
        componentsName: ""
      });
      const _required = (0, import_vue24.ref)(props.required);
      const tmFormLabelWidth = (0, import_vue24.inject)("tmFormLabelWidth", (0, import_vue24.computed)(() => 100));
      const tmFormLabelAlign = (0, import_vue24.inject)("tmFormLabelAlign", (0, import_vue24.computed)(() => "left"));
      const tmFormLayout = (0, import_vue24.inject)("tmFormLayout", (0, import_vue24.computed)(() => "horizontal"));
      const tmFormBorder_inject = (0, import_vue24.inject)("tmFormBorder", (0, import_vue24.computed)(() => true));
      const tmFormTransprent = (0, import_vue24.inject)("tmFormTransprent", (0, import_vue24.computed)(() => false));
      const tmFormBorder = (0, import_vue24.computed)(() => {
        if (props.border !== null && typeof props.border === "boolean")
          return props.border;
        return tmFormBorder_inject.value;
      });
      const _label = (0, import_vue24.computed)(() => props.label);
      let parent = proxy == null ? void 0 : proxy.$parent;
      while (parent) {
        if ((parent == null ? void 0 : parent.tmFormComnameId) == "tmFormId" || !parent) {
          break;
        } else {
          parent = (_c = parent == null ? void 0 : parent.$parent) != null ? _c : void 0;
        }
      }
      pushCom();
      (0, import_vue24.onUnmounted)(() => {
        delCom();
      });
      (0, import_vue24.provide)("tmFormItemRules", (0, import_vue24.computed)(() => {
        var _a22, _b22, _c2, _d, _e;
        let defaultrs = [];
        if (Array.isArray(props == null ? void 0 : props.rules)) {
          props == null ? void 0 : props.rules.forEach((el) => {
            var _a3, _b3;
            let isreq = (el == null ? void 0 : el.required) || props.required;
            defaultrs.push({
              message: (_a3 = el == null ? void 0 : el.message) != null ? _a3 : "\u8BF7\u586B\u5199\u5FC5\u8981\u7684\u5185\u5BB9",
              required: isreq,
              validator: (_b3 = el == null ? void 0 : el.validator) != null ? _b3 : false
            });
          });
        } else {
          defaultrs = [{
            message: (_b22 = (_a22 = props == null ? void 0 : props.rules) == null ? void 0 : _a22.message) != null ? _b22 : "\u8BF7\u586B\u5199\u5FC5\u8981\u7684\u5185\u5BB9",
            required: ((_c2 = props.rules) == null ? void 0 : _c2.required) || props.required,
            validator: (_e = (_d = props.rules) == null ? void 0 : _d.validator) != null ? _e : false
          }];
        }
        return defaultrs;
      }));
      function pushCom(itemComval) {
        if (parent) {
          item.value = __spreadValues23(__spreadValues23({}, item.value), itemComval != null ? itemComval : {});
          parent.pushKey(__spreadValues23({}, item.value));
        }
      }
      function delCom() {
        if (parent) {
          parent.delKey(item.value);
        }
      }
      const tmFormFun = (0, import_vue24.inject)("tmFormFun", (0, import_vue24.computed)(() => ""));
      expose({ pushCom, delCom, tmFormComnameFormItem });
      return (_ctx, _cache) => {
        return (0, import_vue24.openBlock)(), (0, import_vue24.createBlock)(tmSheet, {
          transprent: (0, import_vue24.unref)(tmFormTransprent),
          margin: props.margin,
          padding: props.padding
        }, {
          default: (0, import_vue24.withCtx)(() => [
            (0, import_vue24.createElementVNode)("view", {
              class: (0, import_vue24.normalizeClass)(["flex", (0, import_vue24.unref)(tmFormLayout) == "horizontal" ? "flex-row flex-row-center-start" : "flex-col"])
            }, [
              (0, import_vue24.unref)(_label) ? ((0, import_vue24.openBlock)(), (0, import_vue24.createElementBlock)("view", {
                key: 0,
                style: (0, import_vue24.normalizeStyle)([{ width: (0, import_vue24.unref)(tmFormLabelWidth) + "rpx" }]),
                class: (0, import_vue24.normalizeClass)(["mr-32 flex flex-row", [(0, import_vue24.unref)(tmFormLabelAlign) == "right" ? "flex-row-center-end" : "", (0, import_vue24.unref)(tmFormLayout) != "horizontal" ? "mb-24" : ""]])
              }, [
                _required.value ? ((0, import_vue24.openBlock)(), (0, import_vue24.createBlock)(tmText, {
                  key: 0,
                  color: "red",
                  "font-size": 30,
                  label: "*"
                })) : (0, import_vue24.createCommentVNode)("v-if", true),
                (0, import_vue24.createVNode)(tmText, {
                  color: (0, import_vue24.unref)(tmFormFun) == "validate" && item.value.isRequiredError == true && props.requiredTitleChangeColor ? "red" : "",
                  "font-size": 30,
                  label: (0, import_vue24.unref)(_label)
                }, null, 8, ["color", "label"])
              ], 6)) : (0, import_vue24.createCommentVNode)("v-if", true),
              (0, import_vue24.createElementVNode)("view", {
                class: "flex-1",
                style: (0, import_vue24.normalizeStyle)([(0, import_vue24.unref)(tmFormLayout) == "horizontal" ? { width: "0px" } : ""])
              }, [
                (0, import_vue24.createElementVNode)("view", null, [
                  (0, import_vue24.renderSlot)(_ctx.$slots, "default")
                ])
              ], 4)
            ], 2),
            (0, import_vue24.unref)(tmFormFun) == "validate" && item.value.isRequiredError == true && props.showError ? ((0, import_vue24.openBlock)(), (0, import_vue24.createElementBlock)("view", {
              key: 0,
              class: "pt-12"
            }, [
              (0, import_vue24.createVNode)(tmText, {
                color: "red",
                "font-size": 22,
                label: item.value.message
              }, null, 8, ["label"])
            ])) : (0, import_vue24.createCommentVNode)("v-if", true),
            (0, import_vue24.unref)(tmFormBorder) ? ((0, import_vue24.openBlock)(), (0, import_vue24.createElementBlock)("view", { key: 1 }, [
              (0, import_vue24.createElementVNode)("view", {
                class: (0, import_vue24.normalizeClass)([`mt-${props.margin[1] * 2}`])
              }, null, 2),
              (0, import_vue24.createVNode)(tmDivider, { margin: [0, 0] })
            ])) : (0, import_vue24.createCommentVNode)("v-if", true)
          ]),
          _: 3
        }, 8, ["transprent", "margin", "padding"]);
      };
    }
  });
  var tmFormItem = /* @__PURE__ */ _export_sfc(_sfc_main$24, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-form-item/tm-form-item.vue"]]);
  var _sfc_main$17 = /* @__PURE__ */ (0, import_vue24.defineComponent)({
    __name: "tm-form",
    props: {
      modelValue: {
        type: Object,
        default: () => {
          return {};
        },
        required: true
      },
      margin: {
        type: Array,
        default: () => [32, 24]
      },
      padding: {
        type: Array,
        default: () => [16, 0]
      },
      layout: {
        type: String,
        default: "horizontal"
      },
      labelWidth: {
        type: Number,
        default: 160
      },
      labelAlign: {
        type: String,
        default: "left"
      },
      border: {
        type: Boolean,
        default: true
      },
      transprent: {
        type: Boolean,
        default: false
      }
    },
    emits: ["submit", "reset", "validate", "clearValidate", "update:modelValue"],
    setup(__props, { expose, emit: emits }) {
      const props = __props;
      const _modelVal = (0, import_vue24.ref)({});
      const _backModelVal = __spreadValues23({}, props.modelValue);
      (0, import_vue24.watchEffect)(() => _modelVal.value = props.modelValue);
      const _callBackModelVal = (0, import_vue24.ref)([]);
      const tmFormComnameId = "tmFormId";
      const safeFormCom = (0, import_vue24.ref)([
        "tm-radio-group",
        "tm-checkbox-box",
        "tm-input",
        "tm-rate",
        "tm-slider",
        "tm-segtab",
        "tm-switch",
        "tm-upload"
      ]);
      const formFunCallBack = (0, import_vue24.ref)("");
      (0, import_vue24.provide)("tmFormFun", (0, import_vue24.computed)(() => formFunCallBack.value));
      (0, import_vue24.provide)("tmFormLabelWidth", (0, import_vue24.computed)(() => props.labelWidth));
      (0, import_vue24.provide)("tmFormLabelAlign", (0, import_vue24.computed)(() => props.labelAlign));
      (0, import_vue24.provide)("tmFormLayout", (0, import_vue24.computed)(() => props.layout));
      (0, import_vue24.provide)("tmFormBorder", (0, import_vue24.computed)(() => props.border));
      (0, import_vue24.provide)("tmFormTransprent", (0, import_vue24.computed)(() => props.transprent));
      let timid = 56321326898746;
      function reset() {
        formFunCallBack.value = "";
        (0, import_vue24.nextTick)(() => {
          formFunCallBack.value = "reset";
          clearTimeout(timid);
          timid = setTimeout(function() {
            emits("reset");
            emits("update:modelValue", __spreadValues23({}, _backModelVal));
          }, 200);
        });
      }
      function clearValidate() {
        formFunCallBack.value = "";
        (0, import_vue24.nextTick)(() => {
          formFunCallBack.value = "clearValidate";
          (0, import_vue24.nextTick)(() => {
            emits("clearValidate");
          });
        });
      }
      function submit() {
        formFunCallBack.value = "";
        (0, import_vue24.nextTick)(() => {
          formFunCallBack.value = "validate";
          let isPass = true;
          let par = (0, import_vue24.toRaw)(_callBackModelVal.value);
          uni.$tm.u.throttle(() => {
            for (let i = 0, len = par.length; i < len; i++) {
              if (par[i].isRequiredError == true) {
                isPass = false;
                break;
              }
            }
            let data = __spreadValues23({}, _modelVal.value);
            par.forEach((el) => {
              setObjectVal(data, el.field, el.value);
            });
            emits("submit", { data, validate: isPass });
          }, 200, false);
        });
      }
      function validate() {
        formFunCallBack.value = "";
        (0, import_vue24.nextTick)(() => {
          formFunCallBack.value = "validate";
          (0, import_vue24.nextTick)(() => {
            emits("reset");
          });
        });
      }
      function pushKey(item) {
        if (item.componentsName == "" && !safeFormCom.value.includes(item.componentsName))
          return;
        let idsIndex = _callBackModelVal.value.findIndex((el) => el.id == item.id);
        if (idsIndex == -1) {
          _callBackModelVal.value.push(item);
        } else {
          _callBackModelVal.value[idsIndex] = item;
        }
      }
      function delKey(item) {
        let idsIndex = _callBackModelVal.value.findIndex((el) => el.id == item.id);
        if (idsIndex > -1) {
          _callBackModelVal.value.splice(idsIndex, 1);
        }
      }
      function setObjectVal(obj, field = "", val) {
        if (field == "")
          return obj;
        var arr = field.split(".");
        while (arr.length > 1) {
          let key = String(arr.shift());
          obj = (0, import_vue24.isProxy)(obj[key]) ? (0, import_vue24.toRaw)(obj[key]) : obj[key];
        }
        return obj[arr[0]] = (0, import_vue24.isProxy)(val) ? (0, import_vue24.toRaw)(val) : val;
      }
      expose({ reset, validate, clearValidate, submit, pushKey, delKey, tmFormComnameId });
      return (_ctx, _cache) => {
        return (0, import_vue24.openBlock)(), (0, import_vue24.createBlock)(tmSheet, {
          transprent: props.transprent,
          round: 3,
          _class: "flex flex-col overflow",
          padding: props.padding,
          margin: props.margin
        }, {
          default: (0, import_vue24.withCtx)(() => [
            (0, import_vue24.renderSlot)(_ctx.$slots, "default")
          ]),
          _: 3
        }, 8, ["transprent", "padding", "margin"]);
      };
    }
  });
  var tmForm = /* @__PURE__ */ _export_sfc(_sfc_main$17, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-form/tm-form.vue"]]);
  var _sfc_main24 = /* @__PURE__ */ (0, import_vue24.defineComponent)({
    __name: "form",
    setup(__props) {
      (0, import_vue24.getCurrentInstance)();
      const app = (0, import_vue24.ref)(null);
      const form2 = (0, import_vue24.ref)(null);
      const showCal = (0, import_vue24.ref)(false);
      const showCity = (0, import_vue24.ref)(false);
      const showTimePickerView = (0, import_vue24.ref)(false);
      const showPicker = (0, import_vue24.ref)(false);
      const pickerlist = (0, import_vue24.ref)([
        {
          text: "\u82F9\u679C"
        },
        {
          text: "\u9999\u8549"
        },
        {
          text: "\u674E\u5B50"
        },
        {
          text: "\u6930\u5B50"
        }
      ]);
      const show = (0, import_vue24.ref)({
        cale: ["2022-1-4"],
        time: "2022-1-9",
        timeStr: "2022-1-5",
        radio: "",
        pickerIndex: [],
        pickerStr: "",
        checkbox: [],
        rate: 0,
        slider: [0, 50],
        segtab: "",
        switch: false,
        upload: [],
        city: [],
        cityStr: "",
        nameuser: {
          a: ""
        }
      });
      const confirm = (e) => {
        formatAppLog("log", "at pages/form/form.nvue:163", e);
      };
      return (_ctx, _cache) => {
        return (0, import_vue24.openBlock)(), (0, import_vue24.createElementBlock)("scroll-view", {
          scrollY: true,
          showScrollbar: true,
          enableBackToTop: true,
          bubble: "true",
          style: { flexDirection: "column" }
        }, [
          (0, import_vue24.createVNode)(tmApp, {
            ref_key: "app",
            ref: app,
            color: "grey-5"
          }, {
            default: (0, import_vue24.withCtx)(() => [
              (0, import_vue24.createVNode)(tmForm, {
                onSubmit: confirm,
                ref_key: "form",
                ref: form2,
                modelValue: show.value,
                "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => show.value = $event)
              }, {
                default: (0, import_vue24.withCtx)(() => [
                  (0, import_vue24.createVNode)(tmFormItem, {
                    label: "\u8EAB\u4EFD\u8BC1\u53F7\u7801",
                    field: "nameuser.a",
                    rules: [{ required: true, message: "\u8BF7\u8F93\u516566", validator: (val) => val == "66" }]
                  }, {
                    default: (0, import_vue24.withCtx)(() => [
                      (0, import_vue24.createVNode)(tmInput, {
                        inputPadding: [0, 0],
                        modelValue: show.value.nameuser.a,
                        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => show.value.nameuser.a = $event),
                        transprent: true,
                        showBottomBotder: false
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }, 8, ["rules"]),
                  (0, import_vue24.createVNode)(tmFormItem, {
                    label: "\u9009\u62E9\u65E5\u671F",
                    field: "cale",
                    rules: [{ required: true, message: "\u8BF7\u9009\u62E9\u65E5\u671F\u54E6" }]
                  }, {
                    default: (0, import_vue24.withCtx)(() => [
                      (0, import_vue24.createVNode)(tmInput, {
                        inputPadding: [0, 0],
                        "model-value": show.value.cale[0],
                        onClick: _cache[1] || (_cache[1] = ($event) => showCal.value = !showCal.value),
                        suffix: "tmicon-angle-right",
                        placeholder: "\u8BF7\u9009\u62E9\u6709\u6548\u65E5\u671F",
                        disabled: "",
                        transprent: true,
                        showBottomBotder: false
                      }, null, 8, ["model-value"])
                    ]),
                    _: 1
                  }),
                  (0, import_vue24.createVNode)(tmFormItem, {
                    label: "\u9009\u62E9\u5730\u533A",
                    field: "city",
                    rules: [{ required: true, message: "\u8BF7\u9009\u62E9\u5730\u533A" }]
                  }, {
                    default: (0, import_vue24.withCtx)(() => [
                      (0, import_vue24.createVNode)(tmInput, {
                        inputPadding: [0, 0],
                        "model-value": show.value.cityStr,
                        onClick: _cache[2] || (_cache[2] = ($event) => showCity.value = !showCity.value),
                        suffix: "tmicon-angle-right",
                        placeholder: "\u8BF7\u9009\u62E9\u6240\u5728\u5730\u533A\u5730\u5740",
                        disabled: "",
                        transprent: true,
                        showBottomBotder: false
                      }, null, 8, ["model-value"])
                    ]),
                    _: 1
                  }),
                  (0, import_vue24.createVNode)(tmFormItem, {
                    label: "\u65F6\u95F4\u9009\u62E9",
                    field: "time",
                    rules: [{ required: true, message: "\u8BF7\u9009\u62E9\u65F6\u95F4" }]
                  }, {
                    default: (0, import_vue24.withCtx)(() => [
                      (0, import_vue24.createVNode)(tmInput, {
                        inputPadding: [0, 0],
                        modelValue: show.value.timeStr,
                        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => show.value.timeStr = $event),
                        onClick: _cache[4] || (_cache[4] = ($event) => showTimePickerView.value = !showTimePickerView.value),
                        suffix: "tmicon-angle-right",
                        placeholder: "\u8BF7\u9009\u62E9\u65F6\u95F4",
                        disabled: "",
                        transprent: true,
                        showBottomBotder: false
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  (0, import_vue24.createVNode)(tmFormItem, {
                    label: "\u5F39\u51FA\u9009\u62E9",
                    field: "time",
                    rules: [{ required: true, message: "\u8BF7\u9009\u62E9\u6C34\u679C\u79CD\u7C7B" }]
                  }, {
                    default: (0, import_vue24.withCtx)(() => [
                      (0, import_vue24.createVNode)(tmInput, {
                        inputPadding: [0, 0],
                        "model-value": show.value.pickerStr,
                        onClick: _cache[5] || (_cache[5] = ($event) => showPicker.value = !showPicker.value),
                        suffix: "tmicon-angle-right",
                        placeholder: "\u8BF7\u9009\u62E9\u4F60\u7684\u6C34\u679C\u79CD\u7C7B",
                        disabled: "",
                        transprent: true,
                        showBottomBotder: false
                      }, null, 8, ["model-value"])
                    ]),
                    _: 1
                  }),
                  (0, import_vue24.createVNode)(tmFormItem, {
                    label: "\u9009\u62E9\u6C34\u679C",
                    field: "radio",
                    rules: [{ required: true, message: "\u8BF7\u9009\u62E9\u6C34\u679C" }]
                  }, {
                    default: (0, import_vue24.withCtx)(() => [
                      (0, import_vue24.createVNode)(tmRadioGroup, {
                        modelValue: show.value.radio,
                        "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => show.value.radio = $event)
                      }, {
                        default: (0, import_vue24.withCtx)(() => [
                          (0, import_vue24.createVNode)(tmRadio, {
                            label: "\u82F9\u679C",
                            value: "apple"
                          }),
                          (0, import_vue24.createVNode)(tmRadio, {
                            label: "\u9999\u7126",
                            value: "bonaer"
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  (0, import_vue24.createVNode)(tmFormItem, {
                    label: "\u591A\u9009\u6C34\u679C\u79CD\u7C7B",
                    field: "checkbox",
                    rules: [{ required: true, message: "\u8BF7\u9009\u62E9" }]
                  }, {
                    default: (0, import_vue24.withCtx)(() => [
                      (0, import_vue24.createVNode)(tmCheckboxGroup, {
                        modelValue: show.value.checkbox,
                        "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => show.value.checkbox = $event)
                      }, {
                        default: (0, import_vue24.withCtx)(() => [
                          (0, import_vue24.createVNode)(TmCheckbox, {
                            label: "\u82F9\u679C",
                            value: "apple"
                          }),
                          (0, import_vue24.createVNode)(TmCheckbox, {
                            label: "\u9999\u7126",
                            value: "bonaer"
                          }),
                          (0, import_vue24.createVNode)(TmCheckbox, {
                            label: "\u9999\u7126",
                            value: "bonaer2"
                          }),
                          (0, import_vue24.createVNode)(TmCheckbox, {
                            label: "\u9999\u7126",
                            value: "bonaer3"
                          }),
                          (0, import_vue24.createVNode)(TmCheckbox, {
                            label: "\u9999\u7126",
                            value: "bonaer4"
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  (0, import_vue24.createVNode)(tmFormItem, {
                    label: "\u8BC4\u5206",
                    field: "rate",
                    rules: [{ required: true, message: "\u8BF7\u9009\u62E9" }]
                  }, {
                    default: (0, import_vue24.withCtx)(() => [
                      (0, import_vue24.createVNode)(tmRate, {
                        modelValue: show.value.rate,
                        "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => show.value.rate = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  (0, import_vue24.createVNode)(tmFormItem, {
                    label: "\u4EF7\u683C\u9009\u62E9",
                    field: "slider",
                    rules: [{ required: true, message: "\u8BF7\u9009\u62E9", validator: (val) => val.reduce((a, b) => Math.abs(a - b)) !== 0 }]
                  }, {
                    default: (0, import_vue24.withCtx)(() => [
                      (0, import_vue24.createVNode)(tmSlider, {
                        width: 450,
                        modelValue: show.value.slider,
                        "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => show.value.slider = $event),
                        "default-value": show.value.slider
                      }, null, 8, ["modelValue", "default-value"])
                    ]),
                    _: 1
                  }, 8, ["rules"]),
                  (0, import_vue24.createVNode)(tmFormItem, {
                    label: "\u5206\u5272\u9009\u62E9",
                    field: "segtab",
                    rules: [{ required: true, message: "\u8BF7\u9009\u62E9" }]
                  }, {
                    default: (0, import_vue24.withCtx)(() => [
                      (0, import_vue24.createVNode)(tmSegtab, {
                        width: 420,
                        list: [{ text: "\u82F9\u679C" }, { text: "\u9999\u8549" }],
                        modelValue: show.value.segtab,
                        "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => show.value.segtab = $event),
                        "default-value": show.value.segtab
                      }, null, 8, ["modelValue", "default-value"])
                    ]),
                    _: 1
                  }),
                  (0, import_vue24.createVNode)(tmFormItem, {
                    label: "\u5F00\u5173",
                    field: "switch",
                    rules: { required: true, message: "\u8BF7\u9009\u62E9" }
                  }, {
                    default: (0, import_vue24.withCtx)(() => [
                      (0, import_vue24.createVNode)(TmSwitch, {
                        modelValue: show.value.switch,
                        "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => show.value.switch = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  (0, import_vue24.createVNode)(tmFormItem, {
                    label: "\u4E0A\u4F20\u622A\u56FE",
                    field: "upload",
                    rules: { required: true, message: "\u8BF7\u4E0A\u4F20" }
                  }, {
                    default: (0, import_vue24.withCtx)(() => [
                      (0, import_vue24.createVNode)(tmUpload, {
                        rows: 3,
                        width: 420,
                        url: "https://mockapi.eolink.com/tNYKNA7ac71aa90bcbe83c5815871a5b419601e96a5524d/upload",
                        modelValue: show.value.upload,
                        "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => show.value.upload = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  (0, import_vue24.createVNode)(tmFormItem, { border: false }, {
                    default: (0, import_vue24.withCtx)(() => [
                      (0, import_vue24.createElementVNode)("view", { class: "flex flex-row" }, [
                        (0, import_vue24.createElementVNode)("view", { class: "flex-1 mr-32" }, [
                          (0, import_vue24.createVNode)(TmButton, {
                            "form-type": "submit",
                            label: "\u63D0\u4EA4\u8868\u5355",
                            block: ""
                          })
                        ]),
                        (0, import_vue24.createElementVNode)("view", { class: "flex-1" }, [
                          (0, import_vue24.createVNode)(TmButton, {
                            shadow: 0,
                            text: "",
                            "form-type": "reset",
                            label: "\u91CD\u7F6E\u8868\u5355",
                            block: ""
                          })
                        ])
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["modelValue"]),
              (0, import_vue24.createVNode)(tmCalendar, {
                modelValue: show.value.cale,
                "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => show.value.cale = $event),
                show: showCal.value,
                "onUpdate:show": _cache[15] || (_cache[15] = ($event) => showCal.value = $event),
                "default-value": show.value.cale
              }, null, 8, ["modelValue", "show", "default-value"]),
              (0, import_vue24.createVNode)(tmCityPicker, {
                modelValue: show.value.city,
                "onUpdate:modelValue": _cache[16] || (_cache[16] = ($event) => show.value.city = $event),
                "model-str": show.value.cityStr,
                "onUpdate:model-str": _cache[17] || (_cache[17] = ($event) => show.value.cityStr = $event),
                show: showCity.value,
                "onUpdate:show": _cache[18] || (_cache[18] = ($event) => showCity.value = $event),
                "default-value": show.value.city
              }, null, 8, ["modelValue", "model-str", "show", "default-value"]),
              (0, import_vue24.createVNode)(tmTimePicker, {
                modelValue: show.value.time,
                "onUpdate:modelValue": _cache[19] || (_cache[19] = ($event) => show.value.time = $event),
                "model-str": show.value.timeStr,
                "onUpdate:model-str": _cache[20] || (_cache[20] = ($event) => show.value.timeStr = $event),
                show: showTimePickerView.value,
                "onUpdate:show": _cache[21] || (_cache[21] = ($event) => showTimePickerView.value = $event),
                "default-value": show.value.timeStr
              }, null, 8, ["modelValue", "model-str", "show", "default-value"]),
              (0, import_vue24.createVNode)(tmPicker, {
                columns: pickerlist.value,
                modelValue: show.value.pickerIndex,
                "onUpdate:modelValue": _cache[22] || (_cache[22] = ($event) => show.value.pickerIndex = $event),
                "model-str": show.value.pickerStr,
                "onUpdate:model-str": _cache[23] || (_cache[23] = ($event) => show.value.pickerStr = $event),
                show: showPicker.value,
                "onUpdate:show": _cache[24] || (_cache[24] = ($event) => showPicker.value = $event),
                "default-value": show.value.pickerIndex
              }, null, 8, ["columns", "modelValue", "model-str", "show", "default-value"])
            ]),
            _: 1
          }, 512)
        ]);
      };
    }
  });
  var form = /* @__PURE__ */ _export_sfc(_sfc_main24, [["__file", "F:/CoinQT/CoinQT_app/pages/form/form.nvue"]]);

  // <stdin>
  var webview = plus.webview.currentWebview();
  if (webview) {
    const __pageId = parseInt(webview.id);
    const __pagePath = "pages/form/form";
    let __pageQuery = {};
    try {
      __pageQuery = JSON.parse(webview.__query__);
    } catch (e) {
    }
    form.mpType = "page";
    const app = Vue.createPageApp(form, { $store: getApp({ allowDefault: true }).$store, __pageId, __pagePath, __pageQuery });
    app.provide("__globalStyles", Vue.useCssStyles([...__uniConfig.styles, ...form.styles || []]));
    app.mount("#root");
  }
})();
