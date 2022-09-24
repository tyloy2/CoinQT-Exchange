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

  // F:/CoinQT/CoinQT_app/unpackage/dist/dev/.nvue/pages/fankui/translate.js
  var import_vue5 = __toESM(require_vue());

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

  // F:/CoinQT/CoinQT_app/unpackage/dist/dev/.nvue/tm-translate.js
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
  var _style_02 = { "fade": { "": { "opacity": 0 } }, "fade-reverse": { "": { "opacity": 1 } }, "up": { "": { "transform": "translateY(0%)" } }, "up-reverse": { "": { "transform": "translateY(-101%)" } }, "down": { "": { "transform": "translateY(0%)" } }, "down-reverse": { "": { "transform": "translateY(101%)" } }, "left": { "": { "transform": "translateX(0%)" } }, "left-reverse": { "": { "transform": "translateX(-101%)" } }, "right": { "": { "transform": "translateX(0%)" } }, "right-reverse": { "": { "transform": "translateX(101%)" } }, "zoom": { "": { "transform": "scale(0.7, 0.7)", "opacity": 0 } }, "zoom-reverse": { "": { "transform": "scale(1, 1)", "opacity": 1 } } };
  var _sfc_main3 = /* @__PURE__ */ (0, import_vue3.defineComponent)({
    __name: "tm-translate",
    props: __spreadProps3(__spreadValues3({}, custom_props), {
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
      const proxy = (_b2 = (_a2 = (0, import_vue3.getCurrentInstance)()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const customCSSStyle = (0, import_vue3.computed)(() => computedStyle(props));
      const customClass = (0, import_vue3.computed)(() => computedClass(props));
      const computedHeight = (0, import_vue3.computed)(() => {
        if (!props.height || !Number(props.height)) {
          return 0;
        }
        if (String(props.height).indexOf("px") > -1 || String(props.height).indexOf("rpx") > -1) {
          return String(props.height);
        }
        return String(props.height) + "rpx";
      });
      const computedWidth = (0, import_vue3.computed)(() => {
        if (!props.width) {
          return 0;
        }
        if (String(props.width).indexOf("px") > -1 || String(props.width).indexOf("rpx") > -1) {
          return props.width;
        }
        return props.width + "rpx";
      });
      const animationName = (0, import_vue3.computed)(() => props.name || "fade");
      (0, import_vue3.computed)(() => props.duration);
      const computedReverse = (0, import_vue3.computed)(() => props.reverse);
      const reverseAniPrefxname = (0, import_vue3.computed)(() => computedReverse.value ? "-reverse" : "");
      const animationStatus = (0, import_vue3.ref)(0);
      const tmid = (0, import_vue3.ref)(Number(uni.$tm.u.getUid(3)));
      const isLoadEl = (0, import_vue3.ref)(false);
      const animationData = (0, import_vue3.ref)(null);
      (0, import_vue3.watch)(() => props.initByWechat, () => {
        reset();
      });
      function init() {
        (0, import_vue3.nextTick)(() => {
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
        (0, import_vue3.nextTick)(function() {
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
      (0, import_vue3.onMounted)(() => init());
      (0, import_vue3.onUnmounted)(() => {
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
        return (0, import_vue3.openBlock)(), (0, import_vue3.createElementBlock)("view", {
          ref: "bodywk",
          onClick: hanlder,
          class: (0, import_vue3.normalizeClass)([(0, import_vue3.unref)(customClass), "overflow"]),
          style: (0, import_vue3.normalizeStyle)([
            (0, import_vue3.unref)(computedHeight) ? { height: (0, import_vue3.unref)(computedHeight) } : "",
            (0, import_vue3.unref)(computedWidth) ? { width: (0, import_vue3.unref)(computedWidth) } : "",
            (0, import_vue3.unref)(customCSSStyle)
          ]),
          renderWhole: true
        }, [
          isLoadEl.value ? ((0, import_vue3.openBlock)(), (0, import_vue3.createElementBlock)("view", {
            key: 0,
            ref: "nvueElAni",
            animation: animationData.value,
            class: (0, import_vue3.normalizeClass)([
              "flex-col flex trani",
              (0, import_vue3.unref)(animationName) + (0, import_vue3.unref)(reverseAniPrefxname),
              (0, import_vue3.unref)(customClass)
            ])
          }, [
            (0, import_vue3.renderSlot)(_ctx.$slots, "default")
          ], 10, ["animation"])) : (0, import_vue3.createCommentVNode)("v-if", true)
        ], 6);
      };
    }
  });
  var tmTranslate = /* @__PURE__ */ _export_sfc(_sfc_main3, [["styles", [_style_02]], ["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-translate/tm-translate.vue"]]);

  // F:/CoinQT/CoinQT_app/unpackage/dist/dev/.nvue/tm-divider.js
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
  var _sfc_main4 = /* @__PURE__ */ (0, import_vue4.defineComponent)({
    __name: "tm-divider",
    props: __spreadProps4(__spreadValues4({}, custom_props), {
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
      const borderDir = (0, import_vue4.computed)(() => props.vertical ? "left" : "bottom");
      const _label = (0, import_vue4.computed)(() => props.label);
      (_b2 = (_a2 = (0, import_vue4.getCurrentInstance)()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const tmcfg = (0, import_vue4.computed)(() => store.tmStore);
      const _realColor = (0, import_vue4.computed)(() => props.realColor);
      const isDark = (0, import_vue4.computed)(() => computedDark(__spreadProps4(__spreadValues4({}, props), { borderDirection: borderDir.value }), tmcfg.value));
      const tmcomputed = (0, import_vue4.computed)(() => computedTheme(__spreadProps4(__spreadValues4({}, props), { borderDirection: borderDir.value }), isDark.value, tmcfg.value));
      return (_ctx, _cache) => {
        return (0, import_vue4.openBlock)(), (0, import_vue4.createElementBlock)("view", { renderWhole: true }, [
          !(0, import_vue4.unref)(_label) && props.vertical ? ((0, import_vue4.openBlock)(), (0, import_vue4.createElementBlock)("view", {
            key: 0,
            style: (0, import_vue4.normalizeStyle)([{ backgroundColor: (0, import_vue4.unref)(_realColor) ? (0, import_vue4.unref)(tmcomputed).color : (0, import_vue4.unref)(tmcomputed).border }, props.vertical ? { width: props.border + "rpx", height: props.height + "rpx" } : ""]),
            class: (0, import_vue4.normalizeClass)([props.vertical ? `mx-${props.margin[0]}` : `my-${props.margin[1]}`])
          }, null, 6)) : (0, import_vue4.createCommentVNode)("v-if", true),
          (0, import_vue4.unref)(_label) && !props.vertical ? ((0, import_vue4.openBlock)(), (0, import_vue4.createElementBlock)("view", {
            key: 1,
            class: "flex flex-row flex-center"
          }, [
            (0, import_vue4.createElementVNode)("view", {
              style: (0, import_vue4.normalizeStyle)([(0, import_vue4.unref)(tmcomputed) ? { backgroundColor: (0, import_vue4.unref)(_realColor) ? (0, import_vue4.unref)(tmcomputed).color : (0, import_vue4.unref)(tmcomputed).border, height: props.border + "rpx" } : ""]),
              class: (0, import_vue4.normalizeClass)([`my-${props.margin[1]}`, __props.align == "left" ? "flex-2" : "", __props.align == "right" ? "flex-10" : "", __props.align == "center" ? "flex-1" : ""])
            }, null, 6),
            props.label ? ((0, import_vue4.openBlock)(), (0, import_vue4.createElementBlock)("view", {
              key: 0,
              class: (0, import_vue4.normalizeClass)([(0, import_vue4.unref)(isDark) ? "opacity-4" : ""])
            }, [
              (0, import_vue4.createVNode)(tmText, {
                fontSize: props.fontSize,
                dark: (0, import_vue4.unref)(isDark),
                followTheme: props.followTheme,
                color: props.fontColor,
                label: props.label,
                _class: ["mx-32"]
              }, null, 8, ["fontSize", "dark", "followTheme", "color", "label"])
            ], 2)) : (0, import_vue4.createCommentVNode)("v-if", true),
            (0, import_vue4.createElementVNode)("view", {
              style: (0, import_vue4.normalizeStyle)([(0, import_vue4.unref)(tmcomputed) ? { backgroundColor: (0, import_vue4.unref)(_realColor) ? (0, import_vue4.unref)(tmcomputed).color : (0, import_vue4.unref)(tmcomputed).border, height: props.border + "rpx" } : ""]),
              class: (0, import_vue4.normalizeClass)([`my-${props.margin[1]}`, __props.align == "left" ? "flex-10" : "", __props.align == "right" ? "flex-2" : "", __props.align == "center" ? "flex-1" : ""])
            }, null, 6)
          ])) : (0, import_vue4.createCommentVNode)("v-if", true),
          !(0, import_vue4.unref)(_label) && !props.vertical ? ((0, import_vue4.openBlock)(), (0, import_vue4.createElementBlock)("view", {
            key: 2,
            class: "flex flex-row flex-center"
          }, [
            (0, import_vue4.createElementVNode)("view", {
              class: (0, import_vue4.normalizeClass)(["flex-1", [`my-${props.margin[1]}`]]),
              style: (0, import_vue4.normalizeStyle)([(0, import_vue4.unref)(tmcomputed) ? { backgroundColor: (0, import_vue4.unref)(_realColor) ? (0, import_vue4.unref)(tmcomputed).color : (0, import_vue4.unref)(tmcomputed).border, height: props.border + "rpx" } : ""])
            }, null, 6)
          ])) : (0, import_vue4.createCommentVNode)("v-if", true)
        ]);
      };
    }
  });
  var tmDivider = /* @__PURE__ */ _export_sfc(_sfc_main4, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-divider/tm-divider.vue"]]);

  // F:/CoinQT/CoinQT_app/unpackage/dist/dev/.nvue/pages/fankui/translate.js
  var import_pinia2 = __toESM(require_pinia());
  var _sfc_main5 = /* @__PURE__ */ (0, import_vue5.defineComponent)({
    __name: "translate",
    setup(__props) {
      const translate2 = (0, import_vue5.ref)(null);
      setTimeout(function() {
        translate2.value.play();
      }, 1500);
      return (_ctx, _cache) => {
        return (0, import_vue5.openBlock)(), (0, import_vue5.createElementBlock)("scroll-view", {
          scrollY: true,
          showScrollbar: true,
          enableBackToTop: true,
          bubble: "true",
          style: { flexDirection: "column" }
        }, [
          (0, import_vue5.createVNode)(tmApp, null, {
            default: (0, import_vue5.withCtx)(() => [
              (0, import_vue5.createVNode)(tmSheet, null, {
                default: (0, import_vue5.withCtx)(() => [
                  (0, import_vue5.createVNode)(tmText, {
                    "font-size": 24,
                    _class: "font-weight-b",
                    label: "\u4E0B\u9762\u662F\u57FA\u7840\u6F14\u793A\u5C5E\u6027,\u66F4\u591A\u73A9\u6CD5\u8BF7\u524D\u5F80\u6587\u6863\u3002"
                  }),
                  (0, import_vue5.createVNode)(tmText, {
                    color: "red",
                    _class: "font-weight-b",
                    label: "\u4E00\u51716\u7EC4\u52A8\u6548\uFF0C\u6BCF\u7EC4\u52A8\u6548\u90FD\u53EF\u4EE5\u53CD\u5411\u64AD\u653E\u3002\u624B\u52A8\u6216\u8005\u81EA\u52A8\u63A7\u5236\u8BE6\u89C1\u6587\u6863\u3002\u672C\u7EC4\u4EF6\u5E93\u6240\u6709\u52A8\u6548\u90FD\u662F\u7531\u4E0B\u97626\u7EC4\u52A8\u6548\u5B8C\u6210\u3002"
                  }),
                  (0, import_vue5.createVNode)(tmDivider),
                  (0, import_vue5.createElementVNode)("view", { class: "flex flex-row flex-wrap" }, [
                    (0, import_vue5.createVNode)(tmTranslate, {
                      ref_key: "translate",
                      ref: translate2,
                      name: "fade"
                    }, {
                      default: (0, import_vue5.withCtx)(() => [
                        (0, import_vue5.createVNode)(tmSheet, {
                          color: "blue",
                          padding: [0, 0],
                          width: 100,
                          height: 100
                        })
                      ]),
                      _: 1
                    }, 512),
                    (0, import_vue5.createVNode)(tmTranslate, { name: "zoom" }, {
                      default: (0, import_vue5.withCtx)(() => [
                        (0, import_vue5.createVNode)(tmSheet, {
                          color: "blue",
                          padding: [0, 0],
                          width: 100,
                          height: 100
                        })
                      ]),
                      _: 1
                    }),
                    (0, import_vue5.createVNode)(tmTranslate, { name: "left" }, {
                      default: (0, import_vue5.withCtx)(() => [
                        (0, import_vue5.createVNode)(tmSheet, {
                          color: "blue",
                          padding: [0, 0],
                          width: 100,
                          height: 100
                        })
                      ]),
                      _: 1
                    }),
                    (0, import_vue5.createVNode)(tmTranslate, { name: "right" }, {
                      default: (0, import_vue5.withCtx)(() => [
                        (0, import_vue5.createVNode)(tmSheet, {
                          color: "blue",
                          padding: [0, 0],
                          width: 100,
                          height: 100
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  (0, import_vue5.createElementVNode)("view", { class: "flex flex-row flex-wrap" }, [
                    (0, import_vue5.createVNode)(tmTranslate, { name: "down" }, {
                      default: (0, import_vue5.withCtx)(() => [
                        (0, import_vue5.createVNode)(tmSheet, {
                          color: "blue",
                          padding: [0, 0],
                          width: 100,
                          height: 100
                        })
                      ]),
                      _: 1
                    }),
                    (0, import_vue5.createVNode)(tmTranslate, { name: "up" }, {
                      default: (0, import_vue5.withCtx)(() => [
                        (0, import_vue5.createVNode)(tmSheet, {
                          color: "blue",
                          padding: [0, 0],
                          width: 100,
                          height: 100
                        })
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]);
      };
    }
  });
  var translate = /* @__PURE__ */ _export_sfc(_sfc_main5, [["__file", "F:/CoinQT/CoinQT_app/pages/fankui/translate.nvue"]]);

  // <stdin>
  var webview = plus.webview.currentWebview();
  if (webview) {
    const __pageId = parseInt(webview.id);
    const __pagePath = "pages/fankui/translate";
    let __pageQuery = {};
    try {
      __pageQuery = JSON.parse(webview.__query__);
    } catch (e) {
    }
    translate.mpType = "page";
    const app = Vue.createPageApp(translate, { $store: getApp({ allowDefault: true }).$store, __pageId, __pagePath, __pageQuery });
    app.provide("__globalStyles", Vue.useCssStyles([...__uniConfig.styles, ...translate.styles || []]));
    app.mount("#root");
  }
})();
