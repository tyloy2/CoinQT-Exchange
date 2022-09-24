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
  var __toESM = (mod, isNodeMode, target2) => (target2 = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target2, "default", { value: mod, enumerable: true }) : target2, mod));
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

  // F:/CoinQT/CoinQT_app/unpackage/dist/dev/.nvue/pages/showdata/qrcode.js
  var import_vue9 = __toESM(require_vue());

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
  function requireNativePlugin(name2) {
    return weex.requireModule(name2);
  }
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  var createHook = (lifecycle) => (hook, target2 = (0, import_vue.getCurrentInstance)()) => {
    !import_vue.isInSSRComponentSetup && (0, import_vue.injectHook)(lifecycle, hook, target2);
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
        for (var i2 = 0; i2 < rgb.length; i2++) {
          var tc = rgb[i2];
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
          rgb[i2] = Math.round(tc * 255);
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
          for (let i2 = 1; i2 < 4; i2 += 1) {
            sColorNew += sColor.slice(i2, i2 + 1).concat(sColor.slice(i2, i2 + 1));
          }
          sColor = sColorNew;
        }
        let sColorChange = [];
        for (let i2 = 1; i2 < 7; i2 += 2) {
          sColorChange.push(parseInt("0x" + sColor.slice(i2, i2 + 2)));
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
      var i2;
      var f;
      var p;
      var q;
      var t;
      i2 = Math.floor(h * 6);
      f = h * 6 - i2;
      p = v * (1 - s);
      q = v * (1 - f * s);
      t = v * (1 - (1 - f) * s);
      switch (i2 % 6) {
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
    for (let i2 = 0; i2 < uni.$tm.pages.length; i2++) {
      if ((nowPage == null ? void 0 : nowPage.route) == uni.$tm.pages[i2].path && uni.$tm.pages[i2].custom == "custom") {
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
    const target2 = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target2[key] = val;
    }
    return target2;
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
      for (let i2 = 0; i2 < barLit.length; i2++) {
        if ((nowPage == null ? void 0 : nowPage.route) == barLit[i2].pagePath) {
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

  // F:/CoinQT/CoinQT_app/unpackage/dist/dev/.nvue/tm-radio.js
  var import_vue5 = __toESM(require_vue());

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
        let name2 = props.name.substr(props.name.indexOf("-") + 1);
        let index = uni.$tm.tmicon.findIndex((el) => el.font == prefx.value);
        let itemIcon = uni.$tm.tmicon[index].fontJson.find((item, index2) => {
          return item.font_class == name2;
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

  // F:/CoinQT/CoinQT_app/unpackage/dist/dev/.nvue/tm-translate.js
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
  var _style_02 = { "fade": { "": { "opacity": 0 } }, "fade-reverse": { "": { "opacity": 1 } }, "up": { "": { "transform": "translateY(0%)" } }, "up-reverse": { "": { "transform": "translateY(-101%)" } }, "down": { "": { "transform": "translateY(0%)" } }, "down-reverse": { "": { "transform": "translateY(101%)" } }, "left": { "": { "transform": "translateX(0%)" } }, "left-reverse": { "": { "transform": "translateX(-101%)" } }, "right": { "": { "transform": "translateX(0%)" } }, "right-reverse": { "": { "transform": "translateX(101%)" } }, "zoom": { "": { "transform": "scale(0.7, 0.7)", "opacity": 0 } }, "zoom-reverse": { "": { "transform": "scale(1, 1)", "opacity": 1 } } };
  var _sfc_main4 = /* @__PURE__ */ (0, import_vue4.defineComponent)({
    __name: "tm-translate",
    props: __spreadProps4(__spreadValues4({}, custom_props), {
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
      const proxy = (_b2 = (_a2 = (0, import_vue4.getCurrentInstance)()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const customCSSStyle = (0, import_vue4.computed)(() => computedStyle(props));
      const customClass = (0, import_vue4.computed)(() => computedClass(props));
      const computedHeight = (0, import_vue4.computed)(() => {
        if (!props.height || !Number(props.height)) {
          return 0;
        }
        if (String(props.height).indexOf("px") > -1 || String(props.height).indexOf("rpx") > -1) {
          return String(props.height);
        }
        return String(props.height) + "rpx";
      });
      const computedWidth = (0, import_vue4.computed)(() => {
        if (!props.width) {
          return 0;
        }
        if (String(props.width).indexOf("px") > -1 || String(props.width).indexOf("rpx") > -1) {
          return props.width;
        }
        return props.width + "rpx";
      });
      const animationName = (0, import_vue4.computed)(() => props.name || "fade");
      (0, import_vue4.computed)(() => props.duration);
      const computedReverse = (0, import_vue4.computed)(() => props.reverse);
      const reverseAniPrefxname = (0, import_vue4.computed)(() => computedReverse.value ? "-reverse" : "");
      const animationStatus = (0, import_vue4.ref)(0);
      const tmid = (0, import_vue4.ref)(Number(uni.$tm.u.getUid(3)));
      const isLoadEl = (0, import_vue4.ref)(false);
      const animationData = (0, import_vue4.ref)(null);
      (0, import_vue4.watch)(() => props.initByWechat, () => {
        reset();
      });
      function init() {
        (0, import_vue4.nextTick)(() => {
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
        (0, import_vue4.nextTick)(function() {
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
      (0, import_vue4.onMounted)(() => init());
      (0, import_vue4.onUnmounted)(() => {
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
        return (0, import_vue4.openBlock)(), (0, import_vue4.createElementBlock)("view", {
          ref: "bodywk",
          onClick: hanlder,
          class: (0, import_vue4.normalizeClass)([(0, import_vue4.unref)(customClass), "overflow"]),
          style: (0, import_vue4.normalizeStyle)([
            (0, import_vue4.unref)(computedHeight) ? { height: (0, import_vue4.unref)(computedHeight) } : "",
            (0, import_vue4.unref)(computedWidth) ? { width: (0, import_vue4.unref)(computedWidth) } : "",
            (0, import_vue4.unref)(customCSSStyle)
          ]),
          renderWhole: true
        }, [
          isLoadEl.value ? ((0, import_vue4.openBlock)(), (0, import_vue4.createElementBlock)("view", {
            key: 0,
            ref: "nvueElAni",
            animation: animationData.value,
            class: (0, import_vue4.normalizeClass)([
              "flex-col flex trani",
              (0, import_vue4.unref)(animationName) + (0, import_vue4.unref)(reverseAniPrefxname),
              (0, import_vue4.unref)(customClass)
            ])
          }, [
            (0, import_vue4.renderSlot)(_ctx.$slots, "default")
          ], 10, ["animation"])) : (0, import_vue4.createCommentVNode)("v-if", true)
        ], 6);
      };
    }
  });
  var tmTranslate = /* @__PURE__ */ _export_sfc(_sfc_main4, [["styles", [_style_02]], ["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-translate/tm-translate.vue"]]);

  // F:/CoinQT/CoinQT_app/unpackage/dist/dev/.nvue/tm-radio.js
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
  var _sfc_main$12 = /* @__PURE__ */ (0, import_vue5.defineComponent)({
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
      const proxy = (_b2 = (_a2 = (0, import_vue5.getCurrentInstance)()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      let _cacheBoxList = [];
      const _mValue = (0, import_vue5.ref)(props.defaultValue || props.modelValue);
      const _align = (0, import_vue5.computed)(() => {
        let list = {
          left: "flex-row-center-start",
          center: "flex-row-center-center",
          right: "flex-row-center-end"
        };
        return list[props.align];
      });
      const checkBoxkeyId = "tmRadioBoxGroup";
      (0, import_vue5.watch)(() => props.modelValue, () => {
        _mValue.value = props.modelValue;
      }, { deep: true });
      function pushKey(key) {
        _cacheBoxList.push(key);
      }
      (0, import_vue5.nextTick)(() => {
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
      const rulesObj = (0, import_vue5.inject)("tmFormItemRules", (0, import_vue5.computed)(() => {
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
              validate((0, import_vue5.toRaw)(rulesObj.value)).then((ev) => {
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
      (0, import_vue5.provide)("tmRadioBoxDisabled", (0, import_vue5.computed)(() => props.disabled));
      (0, import_vue5.provide)("tmRadioBoxVal", (0, import_vue5.computed)(() => _mValue.value));
      (0, import_vue5.provide)("tmRadioBoxModel", (0, import_vue5.computed)(() => props.model == "radio"));
      expose({ pushKey, addKey, checkBoxkeyId });
      return (_ctx, _cache) => {
        return (0, import_vue5.openBlock)(), (0, import_vue5.createElementBlock)("view", {
          class: (0, import_vue5.normalizeClass)(["flex", [props.direction == "row" ? "flex-row  flex-wrap" : "flex-col", (0, import_vue5.unref)(_align)]]),
          renderWhole: true
        }, [
          (0, import_vue5.renderSlot)(_ctx.$slots, "default")
        ], 2);
      };
    }
  });
  var tmRadioGroup = /* @__PURE__ */ _export_sfc(_sfc_main$12, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-radio-group/tm-radio-group.vue"]]);
  var _sfc_main5 = /* @__PURE__ */ (0, import_vue5.defineComponent)({
    __name: "tm-radio",
    props: __spreadProps5(__spreadValues5({}, custom_props), {
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
      const proxy = (_b2 = (_a2 = (0, import_vue5.getCurrentInstance)()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const _checked = (0, import_vue5.ref)((_c = props.defaultChecked) != null ? _c : false);
      const _groupCheckedVal = (0, import_vue5.inject)("tmRadioBoxVal", (0, import_vue5.computed)(() => ""));
      const tmCheckedBoxDisabled = (0, import_vue5.inject)("tmRadioBoxDisabled", (0, import_vue5.computed)(() => false));
      const _is_radio = (0, import_vue5.inject)("tmRadioBoxModel", (0, import_vue5.computed)(() => false));
      const _disabled = (0, import_vue5.computed)(() => props.disabled || tmCheckedBoxDisabled.value);
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
      const tmFormFun = (0, import_vue5.inject)("tmFormFun", (0, import_vue5.computed)(() => ""));
      (0, import_vue5.watch)(tmFormFun, () => {
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
      (0, import_vue5.watch)([() => props.modelValue, _groupCheckedVal], () => {
        _checked.value = vailChecked();
      });
      return (_ctx, _cache) => {
        return (0, import_vue5.openBlock)(), (0, import_vue5.createElementBlock)("view", {
          class: (0, import_vue5.normalizeClass)(["flex flex-col flex-wrap overflow", [(0, import_vue5.unref)(_disabled) ? "opacity-5" : ""]]),
          style: { "flex-wrap": "wrap" },
          renderWhole: true
        }, [
          (0, import_vue5.createElementVNode)("view", {
            onClick: hanlerClick,
            class: "flex flex-row flex-row-center-start flex-1"
          }, [
            props.custom ? ((0, import_vue5.openBlock)(), (0, import_vue5.createBlock)(tmSheet, {
              key: 0,
              linear: props.linear,
              linearDeep: props.linearDeep,
              followTheme: props.followTheme,
              followDark: props.followDark,
              dark: props.dark,
              shadow: props.shadow,
              userInteractionEnabled: false,
              width: (0, import_vue5.unref)(_is_radio) ? props.size : 0,
              height: (0, import_vue5.unref)(_is_radio) ? props.size : 0,
              text: !_checked.value,
              border: props.border,
              "border-style": props.borderStyle,
              transprent: props.transprent,
              padding: (0, import_vue5.unref)(_is_radio) ? [0, 0] : [16, 10],
              margin: (0, import_vue5.unref)(_is_radio) ? [16, 8] : [8, 8],
              color: (0, import_vue5.unref)(_disabled) ? "grey-2" : props.color,
              round: props.round,
              _class: "flex-row flex-row-center-center"
            }, {
              default: (0, import_vue5.withCtx)(() => [
                _checked.value && (0, import_vue5.unref)(_is_radio) ? ((0, import_vue5.openBlock)(), (0, import_vue5.createBlock)(tmTranslate, {
                  key: 0,
                  duration: 100,
                  name: "zoom",
                  style: { "line-height": "1" }
                }, {
                  default: (0, import_vue5.withCtx)(() => [
                    (0, import_vue5.createVNode)(tmIcon, {
                      "font-size": props.size * 0.54,
                      name: props.icon
                    }, null, 8, ["font-size", "name"])
                  ]),
                  _: 1
                })) : (0, import_vue5.createCommentVNode)("v-if", true),
                !(0, import_vue5.unref)(_is_radio) ? ((0, import_vue5.openBlock)(), (0, import_vue5.createBlock)(tmText, {
                  key: 1,
                  "font-size": props.fontSize,
                  label: props.label
                }, null, 8, ["font-size", "label"])) : (0, import_vue5.createCommentVNode)("v-if", true)
              ]),
              _: 1
            }, 8, ["linear", "linearDeep", "followTheme", "followDark", "dark", "shadow", "width", "height", "text", "border", "border-style", "transprent", "padding", "margin", "color", "round"])) : (0, import_vue5.createCommentVNode)("v-if", true),
            (0, import_vue5.createElementVNode)("view", { userInteractionEnabled: false }, [
              (0, import_vue5.renderSlot)(_ctx.$slots, "default", {}, () => [
                (0, import_vue5.createElementVNode)("view", {
                  class: "flex-1 flex-row flex-row-cneter-cneter",
                  style: { "flex-wrap": "wrap" }
                }, [
                  (0, import_vue5.unref)(_is_radio) ? ((0, import_vue5.openBlock)(), (0, import_vue5.createBlock)(tmText, {
                    key: 0,
                    class: "flex-1 flex-wrap",
                    "font-size": props.fontSize,
                    label: props.label
                  }, null, 8, ["font-size", "label"])) : (0, import_vue5.createCommentVNode)("v-if", true)
                ])
              ])
            ])
          ])
        ], 2);
      };
    }
  });
  var tmRadio = /* @__PURE__ */ _export_sfc(_sfc_main5, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-radio/tm-radio.vue"]]);

  // F:/CoinQT/CoinQT_app/unpackage/dist/dev/.nvue/index.js
  var FillStylePattern = class {
    constructor(img, pattern) {
      this._style = pattern;
      this._img = img;
    }
  };
  var FillStyleLinearGradient = class {
    constructor(x0, y0, x1, y1) {
      this.addColorStop = function(pos, color) {
        if (this._stop_count < 5 && 0 <= pos && pos <= 1) {
          this._stops[this._stop_count] = { _pos: pos, _color: color };
          this._stop_count++;
        }
      };
      this._start_pos = { _x: x0, _y: y0 };
      this._end_pos = { _x: x1, _y: y1 };
      this._stop_count = 0;
      this._stops = [0, 0, 0, 0, 0];
    }
  };
  var FillStyleRadialGradient = class {
    constructor(x0, y0, r0, x1, y1, r1) {
      this._start_pos = { _x: x0, _y: y0, _r: r0 };
      this._end_pos = { _x: x1, _y: y1, _r: r1 };
      this._stop_count = 0;
      this._stops = [0, 0, 0, 0, 0];
    }
    addColorStop(pos, color) {
      if (this._stop_count < 5 && 0 <= pos && pos <= 1) {
        this._stops[this._stop_count] = { _pos: pos, _color: color };
        this._stop_count++;
      }
    }
  };
  var incId = 1;
  var noop = function() {
  };
  var _GImage = class {
    constructor() {
      this._id = incId++;
      this._width = 0;
      this._height = 0;
      this._src = void 0;
      this._onload = noop;
      this._onerror = noop;
      this.complete = false;
    }
    get width() {
      return this._width;
    }
    set width(v) {
      this._width = v;
    }
    get height() {
      return this._height;
    }
    set height(v) {
      this._height = v;
    }
    get src() {
      return this._src;
    }
    set src(v) {
      if (v.startsWith("//")) {
        v = "http:" + v;
      }
      this._src = v;
      _GImage.GBridge.perloadImage([this._src, this._id], (data) => {
        if (typeof data === "string") {
          data = JSON.parse(data);
        }
        if (data.error) {
          var evt = { type: "error", target: this };
          this.onerror(evt);
        } else {
          this.complete = true;
          this.width = typeof data.width === "number" ? data.width : 0;
          this.height = typeof data.height === "number" ? data.height : 0;
          var evt = { type: "load", target: this };
          this.onload(evt);
        }
      });
    }
    addEventListener(name2, listener) {
      if (name2 === "load") {
        this.onload = listener;
      } else if (name2 === "error") {
        this.onerror = listener;
      }
    }
    removeEventListener(name2, listener) {
      if (name2 === "load") {
        this.onload = noop;
      } else if (name2 === "error") {
        this.onerror = noop;
      }
    }
    get onload() {
      return this._onload;
    }
    set onload(v) {
      this._onload = v;
    }
    get onerror() {
      return this._onerror;
    }
    set onerror(v) {
      this._onerror = v;
    }
  };
  var GImage = _GImage;
  GImage.GBridge = null;
  function ArrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = new Uint8ClampedArray(buffer);
    for (var len = bytes.byteLength, i2 = 0; i2 < len; i2++) {
      binary += String.fromCharCode(bytes[i2]);
    }
    return btoa(binary);
  }
  function Base64ToUint8ClampedArray(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");
    const rawData = atob(base64);
    const outputArray = new Uint8ClampedArray(rawData.length);
    for (let i2 = 0; i2 < rawData.length; ++i2) {
      outputArray[i2] = rawData.charCodeAt(i2);
    }
    return outputArray;
  }
  var CanvasRenderingContext2D = class {
    constructor() {
      this._drawCommands = "";
      this._globalAlpha = 1;
      this._fillStyle = "rgb(0,0,0)";
      this._strokeStyle = "rgb(0,0,0)";
      this._lineWidth = 1;
      this._lineCap = "butt";
      this._lineJoin = "miter";
      this._miterLimit = 10;
      this._globalCompositeOperation = "source-over";
      this._textAlign = "start";
      this._textBaseline = "alphabetic";
      this._font = "10px sans-serif";
      this._savedGlobalAlpha = [];
      this.timer = null;
      this.componentId = null;
      this._notCommitDrawImageCache = [];
      this._needRedrawImageCache = [];
      this._redrawCommands = "";
      this._autoSaveContext = true;
      this.createRadialGradient = function(x0, y0, r0, x1, y1, r1) {
        return new FillStyleRadialGradient(x0, y0, r0, x1, y1, r1);
      };
      this.createCircularGradient = function(x0, y0, r0) {
        return new FillStyleRadialGradient(x0, y0, 0, x0, y0, r0);
      };
      this.quadraticCurveTo = function(cpx, cpy, x, y) {
        this._drawCommands = this._drawCommands.concat("u" + cpx + "," + cpy + "," + x + "," + y + ";");
      };
      this.strokeText = function(text, x, y) {
        let tmptext = text.replace(/!/g, "!!");
        tmptext = tmptext.replace(/,/g, "!,");
        tmptext = tmptext.replace(/;/g, "!;");
        this._drawCommands = this._drawCommands.concat("U" + tmptext + "," + x + "," + y + ",0.0;");
      };
      this.isPointInPath = function(x, y) {
        throw new Error("GCanvas not supported yet");
      };
      this.className = "CanvasRenderingContext2D";
    }
    setFillStyle(value) {
      this.fillStyle = value;
    }
    set fillStyle(value) {
      this._fillStyle = value;
      if (typeof value == "string") {
        this._drawCommands = this._drawCommands.concat("F" + value + ";");
      } else if (value instanceof FillStylePattern) {
        const image2 = value._img;
        if (!image2.complete) {
          image2.onload = () => {
            var index = this._needRedrawImageCache.indexOf(image2);
            if (index > -1) {
              this._needRedrawImageCache.splice(index, 1);
              CanvasRenderingContext2D.GBridge.bindImageTexture(this.componentId, image2.src, image2._id);
              this._redrawflush(true);
            }
          };
          this._notCommitDrawImageCache.push(image2);
        } else {
          CanvasRenderingContext2D.GBridge.bindImageTexture(this.componentId, image2.src, image2._id);
        }
        this._drawCommands = this._drawCommands.concat("G" + image2._id + "," + value._style + ";");
      } else if (value instanceof FillStyleLinearGradient) {
        var command = "D" + value._start_pos._x.toFixed(2) + "," + value._start_pos._y.toFixed(2) + "," + value._end_pos._x.toFixed(2) + "," + value._end_pos._y.toFixed(2) + "," + value._stop_count;
        for (var i2 = 0; i2 < value._stop_count; ++i2) {
          command += "," + value._stops[i2]._pos + "," + value._stops[i2]._color;
        }
        this._drawCommands = this._drawCommands.concat(command + ";");
      } else if (value instanceof FillStyleRadialGradient) {
        var command = "H" + value._start_pos._x.toFixed(2) + "," + value._start_pos._y.toFixed(2) + "," + value._start_pos._r.toFixed(2) + "," + value._end_pos._x.toFixed(2) + "," + value._end_pos._y.toFixed(2) + "," + value._end_pos._r.toFixed(2) + "," + value._stop_count;
        for (var i2 = 0; i2 < value._stop_count; ++i2) {
          command += "," + value._stops[i2]._pos + "," + value._stops[i2]._color;
        }
        this._drawCommands = this._drawCommands.concat(command + ";");
      }
    }
    get fillStyle() {
      return this._fillStyle;
    }
    get globalAlpha() {
      return this._globalAlpha;
    }
    setGlobalAlpha(value) {
      this.globalAlpha = value;
    }
    set globalAlpha(value) {
      this._globalAlpha = value;
      this._drawCommands = this._drawCommands.concat("a" + value.toFixed(2) + ";");
    }
    get strokeStyle() {
      return this._strokeStyle;
    }
    setStrokeStyle(value) {
      this.strokeStyle = value;
    }
    set strokeStyle(value) {
      this._strokeStyle = value;
      if (typeof value == "string") {
        this._drawCommands = this._drawCommands.concat("S" + value + ";");
      } else if (value instanceof FillStylePattern) {
        CanvasRenderingContext2D.GBridge.bindImageTexture(this.componentId, image.src, image._id);
        this._drawCommands = this._drawCommands.concat("G" + image._id + "," + value._style + ";");
      } else if (value instanceof FillStyleLinearGradient) {
        var command = "D" + value._start_pos._x.toFixed(2) + "," + value._start_pos._y.toFixed(2) + "," + value._end_pos._x.toFixed(2) + "," + value._end_pos._y.toFixed(2) + "," + value._stop_count;
        for (var i2 = 0; i2 < value._stop_count; ++i2) {
          command += "," + value._stops[i2]._pos + "," + value._stops[i2]._color;
        }
        this._drawCommands = this._drawCommands.concat(command + ";");
      } else if (value instanceof FillStyleRadialGradient) {
        var command = "H" + value._start_pos._x.toFixed(2) + "," + value._start_pos._y.toFixed(2) + "," + value._start_pos._r.toFixed(2) + "," + value._end_pos._x.toFixed(2) + "," + value._end_pos._y + ",".toFixed(2) + value._end_pos._r.toFixed(2) + "," + value._stop_count;
        for (var i2 = 0; i2 < value._stop_count; ++i2) {
          command += "," + value._stops[i2]._pos + "," + value._stops[i2]._color;
        }
        this._drawCommands = this._drawCommands.concat(command + ";");
      }
    }
    get lineWidth() {
      return this._lineWidth;
    }
    setLineWidth(value) {
      this.lineWidth = value;
    }
    set lineWidth(value) {
      this._lineWidth = value;
      this._drawCommands = this._drawCommands.concat("W" + value + ";");
    }
    get lineCap() {
      return this._lineCap;
    }
    setLineCap(value) {
      this.lineCap = value;
    }
    set lineCap(value) {
      this._lineCap = value;
      this._drawCommands = this._drawCommands.concat("C" + value + ";");
    }
    get lineJoin() {
      return this._lineJoin;
    }
    setLineJoin(value) {
      this.lineJoin = value;
    }
    set lineJoin(value) {
      this._lineJoin = value;
      this._drawCommands = this._drawCommands.concat("J" + value + ";");
    }
    get miterLimit() {
      return this._miterLimit;
    }
    setMiterLimit(value) {
      this.miterLimit = value;
    }
    set miterLimit(value) {
      this._miterLimit = value;
      this._drawCommands = this._drawCommands.concat("M" + value + ";");
    }
    get globalCompositeOperation() {
      return this._globalCompositeOperation;
    }
    set globalCompositeOperation(value) {
      this._globalCompositeOperation = value;
      let mode = 0;
      switch (value) {
        case "source-over":
          mode = 0;
          break;
        case "source-atop":
          mode = 5;
          break;
        case "source-in":
          mode = 0;
          break;
        case "source-out":
          mode = 2;
          break;
        case "destination-over":
          mode = 4;
          break;
        case "destination-atop":
          mode = 4;
          break;
        case "destination-in":
          mode = 4;
          break;
        case "destination-out":
          mode = 3;
          break;
        case "lighter":
          mode = 1;
          break;
        case "copy":
          mode = 2;
          break;
        case "xor":
          mode = 6;
          break;
        default:
          mode = 0;
      }
      this._drawCommands = this._drawCommands.concat("B" + mode + ";");
    }
    get textAlign() {
      return this._textAlign;
    }
    setTextAlign(value) {
      this.textAlign = value;
    }
    set textAlign(value) {
      this._textAlign = value;
      let Align = 0;
      switch (value) {
        case "start":
          Align = 0;
          break;
        case "end":
          Align = 1;
          break;
        case "left":
          Align = 2;
          break;
        case "center":
          Align = 3;
          break;
        case "right":
          Align = 4;
          break;
        default:
          Align = 0;
      }
      this._drawCommands = this._drawCommands.concat("A" + Align + ";");
    }
    get textBaseline() {
      return this._textBaseline;
    }
    setTextBaseline(value) {
      this.textBaseline = value;
    }
    set textBaseline(value) {
      this._textBaseline = value;
      let baseline = 0;
      switch (value) {
        case "alphabetic":
          baseline = 0;
          break;
        case "middle":
          baseline = 1;
          break;
        case "top":
          baseline = 2;
          break;
        case "hanging":
          baseline = 3;
          break;
        case "bottom":
          baseline = 4;
          break;
        case "ideographic":
          baseline = 5;
          break;
        default:
          baseline = 0;
          break;
      }
      this._drawCommands = this._drawCommands.concat("E" + baseline + ";");
    }
    get font() {
      return this._font;
    }
    setFontSize(size) {
      var str = this._font;
      var strs = str.trim().split(/\s+/);
      for (var i2 = 0; i2 < strs.length; i2++) {
        var values = [
          "normal",
          "italic",
          "oblique",
          "normal",
          "small-caps",
          "normal",
          "bold",
          "bolder",
          "lighter",
          "100",
          "200",
          "300",
          "400",
          "500",
          "600",
          "700",
          "800",
          "900",
          "normal",
          "ultra-condensed",
          "extra-condensed",
          "condensed",
          "semi-condensed",
          "semi-expanded",
          "expanded",
          "extra-expanded",
          "ultra-expanded"
        ];
        if (values.indexOf(strs[i2].trim()) == -1) {
          if (typeof size === "string") {
            strs[i2] = size;
          } else if (typeof size === "number") {
            strs[i2] = String(size) + "px";
          }
          break;
        }
      }
      this.font = strs.join(" ");
    }
    set font(value) {
      this._font = value;
      this._drawCommands = this._drawCommands.concat("j" + value + ";");
    }
    setTransform(a, b, c, d, tx, ty) {
      this._drawCommands = this._drawCommands.concat("t" + (a === 1 ? "1" : a.toFixed(2)) + "," + (b === 0 ? "0" : b.toFixed(2)) + "," + (c === 0 ? "0" : c.toFixed(2)) + "," + (d === 1 ? "1" : d.toFixed(2)) + "," + tx.toFixed(2) + "," + ty.toFixed(2) + ";");
    }
    transform(a, b, c, d, tx, ty) {
      this._drawCommands = this._drawCommands.concat("f" + (a === 1 ? "1" : a.toFixed(2)) + "," + (b === 0 ? "0" : b.toFixed(2)) + "," + (c === 0 ? "0" : c.toFixed(2)) + "," + (d === 1 ? "1" : d.toFixed(2)) + "," + tx + "," + ty + ";");
    }
    resetTransform() {
      this._drawCommands = this._drawCommands.concat("m;");
    }
    scale(a, d) {
      this._drawCommands = this._drawCommands.concat("k" + a.toFixed(2) + "," + d.toFixed(2) + ";");
    }
    rotate(angle) {
      this._drawCommands = this._drawCommands.concat("r" + angle.toFixed(6) + ";");
    }
    translate(tx, ty) {
      this._drawCommands = this._drawCommands.concat("l" + tx.toFixed(2) + "," + ty.toFixed(2) + ";");
    }
    save() {
      this._savedGlobalAlpha.push(this._globalAlpha);
      this._drawCommands = this._drawCommands.concat("v;");
    }
    restore() {
      this._drawCommands = this._drawCommands.concat("e;");
      this._globalAlpha = this._savedGlobalAlpha.pop();
    }
    createPattern(img, pattern) {
      if (typeof img === "string") {
        var imgObj = new GImage();
        imgObj.src = img;
        img = imgObj;
      }
      return new FillStylePattern(img, pattern);
    }
    createLinearGradient(x0, y0, x1, y1) {
      return new FillStyleLinearGradient(x0, y0, x1, y1);
    }
    strokeRect(x, y, w, h) {
      this._drawCommands = this._drawCommands.concat("s" + x + "," + y + "," + w + "," + h + ";");
    }
    clearRect(x, y, w, h) {
      this._drawCommands = this._drawCommands.concat("c" + x + "," + y + "," + w + "," + h + ";");
    }
    clip() {
      this._drawCommands = this._drawCommands.concat("p;");
    }
    resetClip() {
      this._drawCommands = this._drawCommands.concat("q;");
    }
    closePath() {
      this._drawCommands = this._drawCommands.concat("o;");
    }
    moveTo(x, y) {
      this._drawCommands = this._drawCommands.concat("g" + x.toFixed(2) + "," + y.toFixed(2) + ";");
    }
    lineTo(x, y) {
      this._drawCommands = this._drawCommands.concat("i" + x.toFixed(2) + "," + y.toFixed(2) + ";");
    }
    bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
      this._drawCommands = this._drawCommands.concat("z" + cp1x.toFixed(2) + "," + cp1y.toFixed(2) + "," + cp2x.toFixed(2) + "," + cp2y.toFixed(2) + "," + x.toFixed(2) + "," + y.toFixed(2) + ";");
    }
    arcTo(x1, y1, x2, y2, radius) {
      this._drawCommands = this._drawCommands.concat("h" + x1 + "," + y1 + "," + x2 + "," + y2 + "," + radius + ";");
    }
    beginPath() {
      this._drawCommands = this._drawCommands.concat("b;");
    }
    fillRect(x, y, w, h) {
      this._drawCommands = this._drawCommands.concat("n" + x + "," + y + "," + w + "," + h + ";");
    }
    rect(x, y, w, h) {
      this._drawCommands = this._drawCommands.concat("w" + x + "," + y + "," + w + "," + h + ";");
    }
    fill() {
      this._drawCommands = this._drawCommands.concat("L;");
    }
    stroke(path) {
      this._drawCommands = this._drawCommands.concat("x;");
    }
    arc(x, y, radius, startAngle, endAngle, anticlockwise) {
      let ianticlockwise = 0;
      if (anticlockwise) {
        ianticlockwise = 1;
      }
      this._drawCommands = this._drawCommands.concat("y" + x.toFixed(2) + "," + y.toFixed(2) + "," + radius.toFixed(2) + "," + startAngle + "," + endAngle + "," + ianticlockwise + ";");
    }
    fillText(text, x, y) {
      let tmptext = text.replace(/!/g, "!!");
      tmptext = tmptext.replace(/,/g, "!,");
      tmptext = tmptext.replace(/;/g, "!;");
      this._drawCommands = this._drawCommands.concat("T" + tmptext + "," + x + "," + y + ",0.0;");
    }
    measureText(text) {
      return CanvasRenderingContext2D.GBridge.measureText(text, this.font, this.componentId);
    }
    drawImage(image2, sx, sy, sw, sh, dx, dy, dw, dh) {
      if (typeof image2 === "string") {
        var imgObj = new GImage();
        imgObj.src = image2;
        image2 = imgObj;
      }
      formatAppLog("log", "at tmui/tool/gcanvas/context-2d/RenderingContext.js:531", imgObj);
      if (image2 instanceof GImage) {
        if (!image2.complete) {
          imgObj.onload = () => {
            var index = this._needRedrawImageCache.indexOf(image2);
            if (index > -1) {
              this._needRedrawImageCache.splice(index, 1);
              CanvasRenderingContext2D.GBridge.bindImageTexture(this.componentId, image2.src, image2._id);
              this._redrawflush(true);
            }
          };
          this._notCommitDrawImageCache.push(image2);
        } else {
          CanvasRenderingContext2D.GBridge.bindImageTexture(this.componentId, image2.src, image2._id);
        }
        var srcArgs = [image2, sx, sy, sw, sh, dx, dy, dw, dh];
        var args = [];
        for (var arg in srcArgs) {
          if (typeof srcArgs[arg] != "undefined") {
            args.push(srcArgs[arg]);
          }
        }
        this.__drawImage.apply(this, args);
      }
    }
    __drawImage(image2, sx, sy, sw, sh, dx, dy, dw, dh) {
      const numArgs = arguments.length;
      function drawImageCommands() {
        if (numArgs === 3) {
          const x = parseFloat(sx) || 0;
          const y = parseFloat(sy) || 0;
          return "d" + image2._id + ",0,0," + image2.width + "," + image2.height + "," + x + "," + y + "," + image2.width + "," + image2.height + ";";
        } else if (numArgs === 5) {
          const x = parseFloat(sx) || 0;
          const y = parseFloat(sy) || 0;
          const width = parseInt(sw) || image2.width;
          const height = parseInt(sh) || image2.height;
          return "d" + image2._id + ",0,0," + image2.width + "," + image2.height + "," + x + "," + y + "," + width + "," + height + ";";
        } else if (numArgs === 9) {
          sx = parseFloat(sx) || 0;
          sy = parseFloat(sy) || 0;
          sw = parseInt(sw) || image2.width;
          sh = parseInt(sh) || image2.height;
          dx = parseFloat(dx) || 0;
          dy = parseFloat(dy) || 0;
          dw = parseInt(dw) || image2.width;
          dh = parseInt(dh) || image2.height;
          return "d" + image2._id + "," + sx + "," + sy + "," + sw + "," + sh + "," + dx + "," + dy + "," + dw + "," + dh + ";";
        }
      }
      this._drawCommands += drawImageCommands();
    }
    _flush(reserve, callback) {
      const commands = this._drawCommands;
      this._drawCommands = "";
      CanvasRenderingContext2D.GBridge.render2d(this.componentId, commands, callback);
      this._needRender = false;
    }
    _redrawflush(reserve, callback) {
      const commands = this._redrawCommands;
      CanvasRenderingContext2D.GBridge.render2d(this.componentId, commands, callback);
      if (this._needRedrawImageCache.length == 0) {
        this._redrawCommands = "";
      }
    }
    draw(reserve, callback) {
      if (!reserve) {
        this._globalAlpha = this._savedGlobalAlpha.pop();
        this._savedGlobalAlpha.push(this._globalAlpha);
        this._redrawCommands = this._drawCommands;
        this._needRedrawImageCache = this._notCommitDrawImageCache;
        if (this._autoSaveContext) {
          this._drawCommands = "v;" + this._drawCommands;
          this._autoSaveContext = false;
        } else {
          this._drawCommands = "e;X;v;" + this._drawCommands;
        }
      } else {
        this._needRedrawImageCache = this._needRedrawImageCache.concat(this._notCommitDrawImageCache);
        this._redrawCommands += this._drawCommands;
        if (this._autoSaveContext) {
          this._drawCommands = "v;" + this._drawCommands;
          this._autoSaveContext = false;
        }
      }
      this._notCommitDrawImageCache = [];
      if (this._flush) {
        this._flush(reserve, callback);
      }
    }
    getImageData(x, y, w, h, callback) {
      CanvasRenderingContext2D.GBridge.getImageData(this.componentId, x, y, w, h, function(res) {
        res.data = Base64ToUint8ClampedArray(res.data);
        if (typeof callback == "function") {
          callback(res);
        }
      });
    }
    putImageData(data, x, y, w, h, callback) {
      if (data instanceof Uint8ClampedArray) {
        data = ArrayBufferToBase64(data);
        CanvasRenderingContext2D.GBridge.putImageData(this.componentId, data, x, y, w, h, function(res) {
          if (typeof callback == "function") {
            callback(res);
          }
        });
      }
    }
    toTempFilePath(x, y, width, height, destWidth, destHeight, fileType, quality, callback) {
      CanvasRenderingContext2D.GBridge.toTempFilePath(this.componentId, x, y, width, height, destWidth, destHeight, fileType, quality, function(res) {
        if (typeof callback == "function") {
          callback(res);
        }
      });
    }
  };
  var GLenum = {
    "DEPTH_BUFFER_BIT": 256,
    "STENCIL_BUFFER_BIT": 1024,
    "COLOR_BUFFER_BIT": 16384,
    "POINTS": 0,
    "LINES": 1,
    "LINE_LOOP": 2,
    "LINE_STRIP": 3,
    "TRIANGLES": 4,
    "TRIANGLE_STRIP": 5,
    "TRIANGLE_FAN": 6,
    "ZERO": 0,
    "ONE": 1,
    "SRC_COLOR": 768,
    "ONE_MINUS_SRC_COLOR": 769,
    "SRC_ALPHA": 770,
    "ONE_MINUS_SRC_ALPHA": 771,
    "DST_ALPHA": 772,
    "ONE_MINUS_DST_ALPHA": 773,
    "DST_COLOR": 774,
    "ONE_MINUS_DST_COLOR": 775,
    "SRC_ALPHA_SATURATE": 776,
    "FUNC_ADD": 32774,
    "BLEND_EQUATION": 32777,
    "BLEND_EQUATION_RGB": 32777,
    "BLEND_EQUATION_ALPHA": 34877,
    "FUNC_SUBTRACT": 32778,
    "FUNC_REVERSE_SUBTRACT": 32779,
    "BLEND_DST_RGB": 32968,
    "BLEND_SRC_RGB": 32969,
    "BLEND_DST_ALPHA": 32970,
    "BLEND_SRC_ALPHA": 32971,
    "CONSTANT_COLOR": 32769,
    "ONE_MINUS_CONSTANT_COLOR": 32770,
    "CONSTANT_ALPHA": 32771,
    "ONE_MINUS_CONSTANT_ALPHA": 32772,
    "BLEND_COLOR": 32773,
    "ARRAY_BUFFER": 34962,
    "ELEMENT_ARRAY_BUFFER": 34963,
    "ARRAY_BUFFER_BINDING": 34964,
    "ELEMENT_ARRAY_BUFFER_BINDING": 34965,
    "STREAM_DRAW": 35040,
    "STATIC_DRAW": 35044,
    "DYNAMIC_DRAW": 35048,
    "BUFFER_SIZE": 34660,
    "BUFFER_USAGE": 34661,
    "CURRENT_VERTEX_ATTRIB": 34342,
    "FRONT": 1028,
    "BACK": 1029,
    "FRONT_AND_BACK": 1032,
    "TEXTURE_2D": 3553,
    "CULL_FACE": 2884,
    "BLEND": 3042,
    "DITHER": 3024,
    "STENCIL_TEST": 2960,
    "DEPTH_TEST": 2929,
    "SCISSOR_TEST": 3089,
    "POLYGON_OFFSET_FILL": 32823,
    "SAMPLE_ALPHA_TO_COVERAGE": 32926,
    "SAMPLE_COVERAGE": 32928,
    "NO_ERROR": 0,
    "INVALID_ENUM": 1280,
    "INVALID_VALUE": 1281,
    "INVALID_OPERATION": 1282,
    "OUT_OF_MEMORY": 1285,
    "CW": 2304,
    "CCW": 2305,
    "LINE_WIDTH": 2849,
    "ALIASED_POINT_SIZE_RANGE": 33901,
    "ALIASED_LINE_WIDTH_RANGE": 33902,
    "CULL_FACE_MODE": 2885,
    "FRONT_FACE": 2886,
    "DEPTH_RANGE": 2928,
    "DEPTH_WRITEMASK": 2930,
    "DEPTH_CLEAR_VALUE": 2931,
    "DEPTH_FUNC": 2932,
    "STENCIL_CLEAR_VALUE": 2961,
    "STENCIL_FUNC": 2962,
    "STENCIL_FAIL": 2964,
    "STENCIL_PASS_DEPTH_FAIL": 2965,
    "STENCIL_PASS_DEPTH_PASS": 2966,
    "STENCIL_REF": 2967,
    "STENCIL_VALUE_MASK": 2963,
    "STENCIL_WRITEMASK": 2968,
    "STENCIL_BACK_FUNC": 34816,
    "STENCIL_BACK_FAIL": 34817,
    "STENCIL_BACK_PASS_DEPTH_FAIL": 34818,
    "STENCIL_BACK_PASS_DEPTH_PASS": 34819,
    "STENCIL_BACK_REF": 36003,
    "STENCIL_BACK_VALUE_MASK": 36004,
    "STENCIL_BACK_WRITEMASK": 36005,
    "VIEWPORT": 2978,
    "SCISSOR_BOX": 3088,
    "COLOR_CLEAR_VALUE": 3106,
    "COLOR_WRITEMASK": 3107,
    "UNPACK_ALIGNMENT": 3317,
    "PACK_ALIGNMENT": 3333,
    "MAX_TEXTURE_SIZE": 3379,
    "MAX_VIEWPORT_DIMS": 3386,
    "SUBPIXEL_BITS": 3408,
    "RED_BITS": 3410,
    "GREEN_BITS": 3411,
    "BLUE_BITS": 3412,
    "ALPHA_BITS": 3413,
    "DEPTH_BITS": 3414,
    "STENCIL_BITS": 3415,
    "POLYGON_OFFSET_UNITS": 10752,
    "POLYGON_OFFSET_FACTOR": 32824,
    "TEXTURE_BINDING_2D": 32873,
    "SAMPLE_BUFFERS": 32936,
    "SAMPLES": 32937,
    "SAMPLE_COVERAGE_VALUE": 32938,
    "SAMPLE_COVERAGE_INVERT": 32939,
    "COMPRESSED_TEXTURE_FORMATS": 34467,
    "DONT_CARE": 4352,
    "FASTEST": 4353,
    "NICEST": 4354,
    "GENERATE_MIPMAP_HINT": 33170,
    "BYTE": 5120,
    "UNSIGNED_BYTE": 5121,
    "SHORT": 5122,
    "UNSIGNED_SHORT": 5123,
    "INT": 5124,
    "UNSIGNED_INT": 5125,
    "FLOAT": 5126,
    "DEPTH_COMPONENT": 6402,
    "ALPHA": 6406,
    "RGB": 6407,
    "RGBA": 6408,
    "LUMINANCE": 6409,
    "LUMINANCE_ALPHA": 6410,
    "UNSIGNED_SHORT_4_4_4_4": 32819,
    "UNSIGNED_SHORT_5_5_5_1": 32820,
    "UNSIGNED_SHORT_5_6_5": 33635,
    "FRAGMENT_SHADER": 35632,
    "VERTEX_SHADER": 35633,
    "MAX_VERTEX_ATTRIBS": 34921,
    "MAX_VERTEX_UNIFORM_VECTORS": 36347,
    "MAX_VARYING_VECTORS": 36348,
    "MAX_COMBINED_TEXTURE_IMAGE_UNITS": 35661,
    "MAX_VERTEX_TEXTURE_IMAGE_UNITS": 35660,
    "MAX_TEXTURE_IMAGE_UNITS": 34930,
    "MAX_FRAGMENT_UNIFORM_VECTORS": 36349,
    "SHADER_TYPE": 35663,
    "DELETE_STATUS": 35712,
    "LINK_STATUS": 35714,
    "VALIDATE_STATUS": 35715,
    "ATTACHED_SHADERS": 35717,
    "ACTIVE_UNIFORMS": 35718,
    "ACTIVE_ATTRIBUTES": 35721,
    "SHADING_LANGUAGE_VERSION": 35724,
    "CURRENT_PROGRAM": 35725,
    "NEVER": 512,
    "LESS": 513,
    "EQUAL": 514,
    "LEQUAL": 515,
    "GREATER": 516,
    "NOTEQUAL": 517,
    "GEQUAL": 518,
    "ALWAYS": 519,
    "KEEP": 7680,
    "REPLACE": 7681,
    "INCR": 7682,
    "DECR": 7683,
    "INVERT": 5386,
    "INCR_WRAP": 34055,
    "DECR_WRAP": 34056,
    "VENDOR": 7936,
    "RENDERER": 7937,
    "VERSION": 7938,
    "NEAREST": 9728,
    "LINEAR": 9729,
    "NEAREST_MIPMAP_NEAREST": 9984,
    "LINEAR_MIPMAP_NEAREST": 9985,
    "NEAREST_MIPMAP_LINEAR": 9986,
    "LINEAR_MIPMAP_LINEAR": 9987,
    "TEXTURE_MAG_FILTER": 10240,
    "TEXTURE_MIN_FILTER": 10241,
    "TEXTURE_WRAP_S": 10242,
    "TEXTURE_WRAP_T": 10243,
    "TEXTURE": 5890,
    "TEXTURE_CUBE_MAP": 34067,
    "TEXTURE_BINDING_CUBE_MAP": 34068,
    "TEXTURE_CUBE_MAP_POSITIVE_X": 34069,
    "TEXTURE_CUBE_MAP_NEGATIVE_X": 34070,
    "TEXTURE_CUBE_MAP_POSITIVE_Y": 34071,
    "TEXTURE_CUBE_MAP_NEGATIVE_Y": 34072,
    "TEXTURE_CUBE_MAP_POSITIVE_Z": 34073,
    "TEXTURE_CUBE_MAP_NEGATIVE_Z": 34074,
    "MAX_CUBE_MAP_TEXTURE_SIZE": 34076,
    "TEXTURE0": 33984,
    "TEXTURE1": 33985,
    "TEXTURE2": 33986,
    "TEXTURE3": 33987,
    "TEXTURE4": 33988,
    "TEXTURE5": 33989,
    "TEXTURE6": 33990,
    "TEXTURE7": 33991,
    "TEXTURE8": 33992,
    "TEXTURE9": 33993,
    "TEXTURE10": 33994,
    "TEXTURE11": 33995,
    "TEXTURE12": 33996,
    "TEXTURE13": 33997,
    "TEXTURE14": 33998,
    "TEXTURE15": 33999,
    "TEXTURE16": 34e3,
    "TEXTURE17": 34001,
    "TEXTURE18": 34002,
    "TEXTURE19": 34003,
    "TEXTURE20": 34004,
    "TEXTURE21": 34005,
    "TEXTURE22": 34006,
    "TEXTURE23": 34007,
    "TEXTURE24": 34008,
    "TEXTURE25": 34009,
    "TEXTURE26": 34010,
    "TEXTURE27": 34011,
    "TEXTURE28": 34012,
    "TEXTURE29": 34013,
    "TEXTURE30": 34014,
    "TEXTURE31": 34015,
    "ACTIVE_TEXTURE": 34016,
    "REPEAT": 10497,
    "CLAMP_TO_EDGE": 33071,
    "MIRRORED_REPEAT": 33648,
    "FLOAT_VEC2": 35664,
    "FLOAT_VEC3": 35665,
    "FLOAT_VEC4": 35666,
    "INT_VEC2": 35667,
    "INT_VEC3": 35668,
    "INT_VEC4": 35669,
    "BOOL": 35670,
    "BOOL_VEC2": 35671,
    "BOOL_VEC3": 35672,
    "BOOL_VEC4": 35673,
    "FLOAT_MAT2": 35674,
    "FLOAT_MAT3": 35675,
    "FLOAT_MAT4": 35676,
    "SAMPLER_2D": 35678,
    "SAMPLER_CUBE": 35680,
    "VERTEX_ATTRIB_ARRAY_ENABLED": 34338,
    "VERTEX_ATTRIB_ARRAY_SIZE": 34339,
    "VERTEX_ATTRIB_ARRAY_STRIDE": 34340,
    "VERTEX_ATTRIB_ARRAY_TYPE": 34341,
    "VERTEX_ATTRIB_ARRAY_NORMALIZED": 34922,
    "VERTEX_ATTRIB_ARRAY_POINTER": 34373,
    "VERTEX_ATTRIB_ARRAY_BUFFER_BINDING": 34975,
    "IMPLEMENTATION_COLOR_READ_TYPE": 35738,
    "IMPLEMENTATION_COLOR_READ_FORMAT": 35739,
    "COMPILE_STATUS": 35713,
    "LOW_FLOAT": 36336,
    "MEDIUM_FLOAT": 36337,
    "HIGH_FLOAT": 36338,
    "LOW_INT": 36339,
    "MEDIUM_INT": 36340,
    "HIGH_INT": 36341,
    "FRAMEBUFFER": 36160,
    "RENDERBUFFER": 36161,
    "RGBA4": 32854,
    "RGB5_A1": 32855,
    "RGB565": 36194,
    "DEPTH_COMPONENT16": 33189,
    "STENCIL_INDEX8": 36168,
    "DEPTH_STENCIL": 34041,
    "RENDERBUFFER_WIDTH": 36162,
    "RENDERBUFFER_HEIGHT": 36163,
    "RENDERBUFFER_INTERNAL_FORMAT": 36164,
    "RENDERBUFFER_RED_SIZE": 36176,
    "RENDERBUFFER_GREEN_SIZE": 36177,
    "RENDERBUFFER_BLUE_SIZE": 36178,
    "RENDERBUFFER_ALPHA_SIZE": 36179,
    "RENDERBUFFER_DEPTH_SIZE": 36180,
    "RENDERBUFFER_STENCIL_SIZE": 36181,
    "FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE": 36048,
    "FRAMEBUFFER_ATTACHMENT_OBJECT_NAME": 36049,
    "FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL": 36050,
    "FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE": 36051,
    "COLOR_ATTACHMENT0": 36064,
    "DEPTH_ATTACHMENT": 36096,
    "STENCIL_ATTACHMENT": 36128,
    "DEPTH_STENCIL_ATTACHMENT": 33306,
    "NONE": 0,
    "FRAMEBUFFER_COMPLETE": 36053,
    "FRAMEBUFFER_INCOMPLETE_ATTACHMENT": 36054,
    "FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT": 36055,
    "FRAMEBUFFER_INCOMPLETE_DIMENSIONS": 36057,
    "FRAMEBUFFER_UNSUPPORTED": 36061,
    "FRAMEBUFFER_BINDING": 36006,
    "RENDERBUFFER_BINDING": 36007,
    "MAX_RENDERBUFFER_SIZE": 34024,
    "INVALID_FRAMEBUFFER_OPERATION": 1286,
    "UNPACK_FLIP_Y_WEBGL": 37440,
    "UNPACK_PREMULTIPLY_ALPHA_WEBGL": 37441,
    "CONTEXT_LOST_WEBGL": 37442,
    "UNPACK_COLORSPACE_CONVERSION_WEBGL": 37443,
    "BROWSER_DEFAULT_WEBGL": 37444
  };
  var WebGLActiveInfo = class {
    constructor({
      type,
      name: name2,
      size
    }) {
      this.className = "WebGLActiveInfo";
      this.type = type;
      this.name = name2;
      this.size = size;
    }
  };
  function getTransferedObjectUUID(name2, id) {
    return `${name2.toLowerCase()}-${id}`;
  }
  var name$6 = "WebGLBuffer";
  function uuid$6(id) {
    return getTransferedObjectUUID(name$6, id);
  }
  var WebGLBuffer = class {
    constructor(id) {
      this.className = name$6;
      this.id = id;
    }
    uuid() {
      return uuid$6(this.id);
    }
  };
  WebGLBuffer.uuid = uuid$6;
  var name$5 = "WebGLFrameBuffer";
  function uuid$5(id) {
    return getTransferedObjectUUID(name$5, id);
  }
  var WebGLFramebuffer = class {
    constructor(id) {
      this.className = name$5;
      this.id = id;
    }
    uuid() {
      return uuid$5(this.id);
    }
  };
  WebGLFramebuffer.uuid = uuid$5;
  var name$4 = "WebGLRenderBuffer";
  function uuid$4(id) {
    return getTransferedObjectUUID(name$4, id);
  }
  var WebGLRenderbuffer = class {
    constructor(id) {
      this.className = name$4;
      this.id = id;
    }
    uuid() {
      return uuid$4(this.id);
    }
  };
  WebGLRenderbuffer.uuid = uuid$4;
  var name$3 = "WebGLTexture";
  function uuid$3(id) {
    return getTransferedObjectUUID(name$3, id);
  }
  var WebGLTexture = class {
    constructor(id, type) {
      this.className = name$3;
      this.id = id;
      this.type = type;
    }
    uuid() {
      return uuid$3(this.id);
    }
  };
  WebGLTexture.uuid = uuid$3;
  var name$2 = "WebGLProgram";
  function uuid$2(id) {
    return getTransferedObjectUUID(name$2, id);
  }
  var WebGLProgram = class {
    constructor(id) {
      this.className = name$2;
      this.id = id;
    }
    uuid() {
      return uuid$2(this.id);
    }
  };
  WebGLProgram.uuid = uuid$2;
  var name$1 = "WebGLShader";
  function uuid$1(id) {
    return getTransferedObjectUUID(name$1, id);
  }
  var WebGLShader = class {
    constructor(id, type) {
      this.className = name$1;
      this.id = id;
      this.type = type;
    }
    uuid() {
      return uuid$1(this.id);
    }
  };
  WebGLShader.uuid = uuid$1;
  var WebGLShaderPrecisionFormat = class {
    constructor({
      rangeMin,
      rangeMax,
      precision
    }) {
      this.className = "WebGLShaderPrecisionFormat";
      this.rangeMin = rangeMin;
      this.rangeMax = rangeMax;
      this.precision = precision;
    }
  };
  var name = "WebGLUniformLocation";
  function uuid(id) {
    return getTransferedObjectUUID(name, id);
  }
  var WebGLUniformLocation = class {
    constructor(id, type) {
      this.className = name;
      this.id = id;
      this.type = type;
    }
    uuid() {
      return uuid(this.id);
    }
  };
  WebGLUniformLocation.uuid = uuid;
  var i = 1;
  var GLmethod = {};
  GLmethod.activeTexture = i++;
  GLmethod.attachShader = i++;
  GLmethod.bindAttribLocation = i++;
  GLmethod.bindBuffer = i++;
  GLmethod.bindFramebuffer = i++;
  GLmethod.bindRenderbuffer = i++;
  GLmethod.bindTexture = i++;
  GLmethod.blendColor = i++;
  GLmethod.blendEquation = i++;
  GLmethod.blendEquationSeparate = i++;
  GLmethod.blendFunc = i++;
  GLmethod.blendFuncSeparate = i++;
  GLmethod.bufferData = i++;
  GLmethod.bufferSubData = i++;
  GLmethod.checkFramebufferStatus = i++;
  GLmethod.clear = i++;
  GLmethod.clearColor = i++;
  GLmethod.clearDepth = i++;
  GLmethod.clearStencil = i++;
  GLmethod.colorMask = i++;
  GLmethod.compileShader = i++;
  GLmethod.compressedTexImage2D = i++;
  GLmethod.compressedTexSubImage2D = i++;
  GLmethod.copyTexImage2D = i++;
  GLmethod.copyTexSubImage2D = i++;
  GLmethod.createBuffer = i++;
  GLmethod.createFramebuffer = i++;
  GLmethod.createProgram = i++;
  GLmethod.createRenderbuffer = i++;
  GLmethod.createShader = i++;
  GLmethod.createTexture = i++;
  GLmethod.cullFace = i++;
  GLmethod.deleteBuffer = i++;
  GLmethod.deleteFramebuffer = i++;
  GLmethod.deleteProgram = i++;
  GLmethod.deleteRenderbuffer = i++;
  GLmethod.deleteShader = i++;
  GLmethod.deleteTexture = i++;
  GLmethod.depthFunc = i++;
  GLmethod.depthMask = i++;
  GLmethod.depthRange = i++;
  GLmethod.detachShader = i++;
  GLmethod.disable = i++;
  GLmethod.disableVertexAttribArray = i++;
  GLmethod.drawArrays = i++;
  GLmethod.drawArraysInstancedANGLE = i++;
  GLmethod.drawElements = i++;
  GLmethod.drawElementsInstancedANGLE = i++;
  GLmethod.enable = i++;
  GLmethod.enableVertexAttribArray = i++;
  GLmethod.flush = i++;
  GLmethod.framebufferRenderbuffer = i++;
  GLmethod.framebufferTexture2D = i++;
  GLmethod.frontFace = i++;
  GLmethod.generateMipmap = i++;
  GLmethod.getActiveAttrib = i++;
  GLmethod.getActiveUniform = i++;
  GLmethod.getAttachedShaders = i++;
  GLmethod.getAttribLocation = i++;
  GLmethod.getBufferParameter = i++;
  GLmethod.getContextAttributes = i++;
  GLmethod.getError = i++;
  GLmethod.getExtension = i++;
  GLmethod.getFramebufferAttachmentParameter = i++;
  GLmethod.getParameter = i++;
  GLmethod.getProgramInfoLog = i++;
  GLmethod.getProgramParameter = i++;
  GLmethod.getRenderbufferParameter = i++;
  GLmethod.getShaderInfoLog = i++;
  GLmethod.getShaderParameter = i++;
  GLmethod.getShaderPrecisionFormat = i++;
  GLmethod.getShaderSource = i++;
  GLmethod.getSupportedExtensions = i++;
  GLmethod.getTexParameter = i++;
  GLmethod.getUniform = i++;
  GLmethod.getUniformLocation = i++;
  GLmethod.getVertexAttrib = i++;
  GLmethod.getVertexAttribOffset = i++;
  GLmethod.isBuffer = i++;
  GLmethod.isContextLost = i++;
  GLmethod.isEnabled = i++;
  GLmethod.isFramebuffer = i++;
  GLmethod.isProgram = i++;
  GLmethod.isRenderbuffer = i++;
  GLmethod.isShader = i++;
  GLmethod.isTexture = i++;
  GLmethod.lineWidth = i++;
  GLmethod.linkProgram = i++;
  GLmethod.pixelStorei = i++;
  GLmethod.polygonOffset = i++;
  GLmethod.readPixels = i++;
  GLmethod.renderbufferStorage = i++;
  GLmethod.sampleCoverage = i++;
  GLmethod.scissor = i++;
  GLmethod.shaderSource = i++;
  GLmethod.stencilFunc = i++;
  GLmethod.stencilFuncSeparate = i++;
  GLmethod.stencilMask = i++;
  GLmethod.stencilMaskSeparate = i++;
  GLmethod.stencilOp = i++;
  GLmethod.stencilOpSeparate = i++;
  GLmethod.texImage2D = i++;
  GLmethod.texParameterf = i++;
  GLmethod.texParameteri = i++;
  GLmethod.texSubImage2D = i++;
  GLmethod.uniform1f = i++;
  GLmethod.uniform1fv = i++;
  GLmethod.uniform1i = i++;
  GLmethod.uniform1iv = i++;
  GLmethod.uniform2f = i++;
  GLmethod.uniform2fv = i++;
  GLmethod.uniform2i = i++;
  GLmethod.uniform2iv = i++;
  GLmethod.uniform3f = i++;
  GLmethod.uniform3fv = i++;
  GLmethod.uniform3i = i++;
  GLmethod.uniform3iv = i++;
  GLmethod.uniform4f = i++;
  GLmethod.uniform4fv = i++;
  GLmethod.uniform4i = i++;
  GLmethod.uniform4iv = i++;
  GLmethod.uniformMatrix2fv = i++;
  GLmethod.uniformMatrix3fv = i++;
  GLmethod.uniformMatrix4fv = i++;
  GLmethod.useProgram = i++;
  GLmethod.validateProgram = i++;
  GLmethod.vertexAttrib1f = i++;
  GLmethod.vertexAttrib2f = i++;
  GLmethod.vertexAttrib3f = i++;
  GLmethod.vertexAttrib4f = i++;
  GLmethod.vertexAttrib1fv = i++;
  GLmethod.vertexAttrib2fv = i++;
  GLmethod.vertexAttrib3fv = i++;
  GLmethod.vertexAttrib4fv = i++;
  GLmethod.vertexAttribPointer = i++;
  GLmethod.viewport = i++;
  var processArray = (array, checkArrayType = false) => {
    function joinArray2(arr, sep) {
      let res = "";
      for (let i2 = 0; i2 < arr.length; i2++) {
        if (i2 !== 0) {
          res += sep;
        }
        res += arr[i2];
      }
      return res;
    }
    let type = "Float32Array";
    if (checkArrayType) {
      if (array instanceof Uint8Array) {
        type = "Uint8Array";
      } else if (array instanceof Uint16Array) {
        type = "Uint16Array";
      } else if (array instanceof Uint32Array) {
        type = "Uint32Array";
      } else if (array instanceof Float32Array) {
        type = "Float32Array";
      } else {
        throw new Error("Check array type failed. Array type is " + typeof array);
      }
    }
    const ArrayTypes = {
      Uint8Array: 1,
      Uint16Array: 2,
      Uint32Array: 4,
      Float32Array: 14
    };
    return ArrayTypes[type] + "," + btoa(joinArray2(array, ","));
  };
  var WebGLRenderingContext = class {
    constructor(canvas, type, attrs) {
      this.className = "WebGLRenderingContext";
      this.activeTexture = function(textureUnit) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.activeTexture + "," + textureUnit, true);
      };
      this.attachShader = function(progarm, shader) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.attachShader + "," + progarm.id + "," + shader.id, true);
      };
      this.bindAttribLocation = function(program, index, name2) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.bindAttribLocation + "," + program.id + "," + index + "," + name2, true);
      };
      this.bindBuffer = function(target2, buffer) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.bindBuffer + "," + target2 + "," + (buffer ? buffer.id : 0), true);
      };
      this.bindFramebuffer = function(target2, framebuffer) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.bindFramebuffer + "," + target2 + "," + (framebuffer ? framebuffer.id : 0), true);
      };
      this.bindRenderbuffer = function(target2, renderBuffer) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.bindRenderbuffer + "," + target2 + "," + (renderBuffer ? renderBuffer.id : 0), true);
      };
      this.bindTexture = function(target2, texture) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.bindTexture + "," + target2 + "," + (texture ? texture.id : 0), true);
      };
      this.blendColor = function(r, g, b, a) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.blendColor + "," + target + "," + r + "," + g + "," + b + "," + a, true);
      };
      this.blendEquation = function(mode) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.blendEquation + "," + mode, true);
      };
      this.blendEquationSeparate = function(modeRGB, modeAlpha) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.blendEquationSeparate + "," + modeRGB + "," + modeAlpha, true);
      };
      this.blendFunc = function(sfactor, dfactor) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.blendFunc + "," + sfactor + "," + dfactor, true);
      };
      this.blendFuncSeparate = function(srcRGB, dstRGB, srcAlpha, dstAlpha) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.blendFuncSeparate + "," + srcRGB + "," + dstRGB + "," + srcAlpha + "," + dstAlpha, true);
      };
      this.bufferData = function(target2, data, usage) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.bufferData + "," + target2 + "," + processArray(data, true) + "," + usage, true);
      };
      this.bufferSubData = function(target2, offset, data) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.bufferSubData + "," + target2 + "," + offset + "," + processArray(data, true), true);
      };
      this.checkFramebufferStatus = function(target2) {
        const result = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.checkFramebufferStatus + "," + target2);
        return Number(result);
      };
      this.clear = function(mask) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.clear + "," + mask);
        this._canvas._needRender = true;
      };
      this.clearColor = function(r, g, b, a) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.clearColor + "," + r + "," + g + "," + b, true);
      };
      this.clearDepth = function(depth) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.clearDepth + "," + depth, true);
      };
      this.clearStencil = function(s) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.clearStencil + "," + s);
      };
      this.colorMask = function(r, g, b, a) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.colorMask + "," + r + "," + g + "," + b + "," + a);
      };
      this.compileShader = function(shader) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.compileShader + "," + shader.id, true);
      };
      this.compressedTexImage2D = function(target2, level, internalformat, width, height, border, pixels) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.compressedTexImage2D + "," + target2 + "," + level + "," + internalformat + "," + width + "," + height + "," + border + "," + processArray(pixels), true);
      };
      this.compressedTexSubImage2D = function(target2, level, xoffset, yoffset, width, height, format, pixels) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.compressedTexSubImage2D + "," + target2 + "," + level + "," + xoffset + "," + yoffset + "," + width + "," + height + "," + format + "," + processArray(pixels), true);
      };
      this.copyTexImage2D = function(target2, level, internalformat, x, y, width, height, border) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.copyTexImage2D + "," + target2 + "," + level + "," + internalformat + "," + x + "," + y + "," + width + "," + height + "," + border, true);
      };
      this.copyTexSubImage2D = function(target2, level, xoffset, yoffset, x, y, width, height) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.copyTexSubImage2D + "," + target2 + "," + level + "," + xoffset + "," + yoffset + "," + x + "," + y + "," + width + "," + height);
      };
      this.createBuffer = function() {
        const result = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.createBuffer + "");
        const buffer = new WebGLBuffer(result);
        this._map.set(buffer.uuid(), buffer);
        return buffer;
      };
      this.createFramebuffer = function() {
        const result = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.createFramebuffer + "");
        const framebuffer = new WebGLFramebuffer(result);
        this._map.set(framebuffer.uuid(), framebuffer);
        return framebuffer;
      };
      this.createProgram = function() {
        const id = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.createProgram + "");
        const program = new WebGLProgram(id);
        this._map.set(program.uuid(), program);
        return program;
      };
      this.createRenderbuffer = function() {
        const id = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.createRenderbuffer + "");
        const renderBuffer = new WebGLRenderbuffer(id);
        this._map.set(renderBuffer.uuid(), renderBuffer);
        return renderBuffer;
      };
      this.createShader = function(type2) {
        const id = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.createShader + "," + type2);
        const shader = new WebGLShader(id, type2);
        this._map.set(shader.uuid(), shader);
        return shader;
      };
      this.createTexture = function() {
        const id = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.createTexture + "");
        const texture = new WebGLTexture(id);
        this._map.set(texture.uuid(), texture);
        return texture;
      };
      this.cullFace = function(mode) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.cullFace + "," + mode, true);
      };
      this.deleteBuffer = function(buffer) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.deleteBuffer + "," + buffer.id, true);
      };
      this.deleteFramebuffer = function(framebuffer) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.deleteFramebuffer + "," + framebuffer.id, true);
      };
      this.deleteProgram = function(program) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.deleteProgram + "," + program.id, true);
      };
      this.deleteRenderbuffer = function(renderbuffer2) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.deleteRenderbuffer + "," + renderbuffer2.id, true);
      };
      this.deleteShader = function(shader) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.deleteShader + "," + shader.id, true);
      };
      this.deleteTexture = function(texture) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.deleteTexture + "," + texture.id, true);
      };
      this.depthFunc = function(func) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.depthFunc + "," + func);
      };
      this.depthMask = function(flag) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.depthMask + "," + Number(flag), true);
      };
      this.depthRange = function(zNear, zFar) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.depthRange + "," + zNear + "," + zFar, true);
      };
      this.detachShader = function(program, shader) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.detachShader + "," + program.id + "," + shader.id, true);
      };
      this.disable = function(cap) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.disable + "," + cap, true);
      };
      this.disableVertexAttribArray = function(index) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.disableVertexAttribArray + "," + index, true);
      };
      this.drawArrays = function(mode, first, count) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.drawArrays + "," + mode + "," + first + "," + count);
        this._canvas._needRender = true;
      };
      this.drawElements = function(mode, count, type2, offset) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.drawElements + "," + mode + "," + count + "," + type2 + "," + offset + ";");
        this._canvas._needRender = true;
      };
      this.enable = function(cap) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.enable + "," + cap, true);
      };
      this.enableVertexAttribArray = function(index) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.enableVertexAttribArray + "," + index, true);
      };
      this.flush = function() {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.flush + "");
      };
      this.framebufferRenderbuffer = function(target2, attachment, textarget, texture, level) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.framebufferRenderbuffer + "," + target2 + "," + attachment + "," + textarget + "," + (texture ? texture.id : 0) + "," + level, true);
      };
      this.framebufferTexture2D = function(target2, attachment, textarget, texture, level) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.framebufferTexture2D + "," + target2 + "," + attachment + "," + textarget + "," + (texture ? texture.id : 0) + "," + level, true);
      };
      this.frontFace = function(mode) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.frontFace + "," + mode, true);
      };
      this.generateMipmap = function(target2) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.generateMipmap + "," + target2, true);
      };
      this.getActiveAttrib = function(progarm, index) {
        const resultString = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.getActiveAttrib + "," + progarm.id + "," + index);
        const [type2, size, name2] = resultString.split(",");
        return new WebGLActiveInfo({
          type: Number(type2),
          size: Number(size),
          name: name2
        });
      };
      this.getActiveUniform = function(progarm, index) {
        const resultString = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.getActiveUniform + "," + progarm.id + "," + index);
        const [type2, size, name2] = resultString.split(",");
        return new WebGLActiveInfo({
          type: Number(type2),
          size: Number(size),
          name: name2
        });
      };
      this.getAttachedShaders = function(progarm) {
        const result = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.getAttachedShaders + "," + progarm.id);
        const [type2, ...ids] = result;
        return ids.map((id) => this._map.get(WebGLShader.uuid(id)));
      };
      this.getAttribLocation = function(progarm, name2) {
        return WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.getAttribLocation + "," + progarm.id + "," + name2);
      };
      this.getBufferParameter = function(target2, pname) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.getBufferParameter + "," + target2 + "," + pname);
        const [type2, res] = getBufferParameter;
        return res;
      };
      this.getError = function() {
        const result = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.getError + "");
        return result;
      };
      this.getExtension = function(name2) {
        return null;
      };
      this.getFramebufferAttachmentParameter = function(target2, attachment, pname) {
        const result = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.getFramebufferAttachmentParameter + "," + target2 + "," + attachment + "," + pname);
        switch (pname) {
          case GLenum.FRAMEBUFFER_ATTACHMENT_OBJECT_NAME:
            return this._map.get(WebGLRenderbuffer.uuid(result)) || this._map.get(WebGLTexture.uuid(result)) || null;
          default:
            return result;
        }
      };
      this.getParameter = function(pname) {
        const result = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.getParameter + "," + pname);
        switch (pname) {
          case GLenum.VERSION:
            return this._version;
          case GLenum.ARRAY_BUFFER_BINDING:
          case GLenum.ELEMENT_ARRAY_BUFFER_BINDING:
            return this._map.get(WebGLBuffer.uuid(result)) || null;
          case GLenum.CURRENT_PROGRAM:
            return this._map.get(WebGLProgram.uuid(result)) || null;
          case GLenum.FRAMEBUFFER_BINDING:
            return this._map.get(WebGLFramebuffer.uuid(result)) || null;
          case GLenum.RENDERBUFFER_BINDING:
            return this._map.get(WebGLRenderbuffer.uuid(result)) || null;
          case GLenum.TEXTURE_BINDING_2D:
          case GLenum.TEXTURE_BINDING_CUBE_MAP:
            return this._map.get(WebGLTexture.uuid(result)) || null;
          case GLenum.ALIASED_LINE_WIDTH_RANGE:
          case GLenum.ALIASED_POINT_SIZE_RANGE:
          case GLenum.BLEND_COLOR:
          case GLenum.COLOR_CLEAR_VALUE:
          case GLenum.DEPTH_RANGE:
          case GLenum.MAX_VIEWPORT_DIMS:
          case GLenum.SCISSOR_BOX:
          case GLenum.VIEWPORT:
          case GLenum.COMPRESSED_TEXTURE_FORMATS:
          default:
            const [type2, ...res] = result.split(",");
            if (res.length === 1) {
              return Number(res[0]);
            } else {
              return res.map(Number);
            }
        }
      };
      this.getProgramInfoLog = function(progarm) {
        return WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.getProgramInfoLog + "," + progarm.id);
      };
      this.getProgramParameter = function(program, pname) {
        const res = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.getProgramParameter + "," + program.id + "," + pname);
        const [type2, result] = res.split(",").map((i2) => parseInt(i2));
        if (type2 === 1) {
          return Boolean(result);
        } else if (type2 === 2) {
          return result;
        } else {
          throw new Error("Unrecongized program paramater " + res + ", type: " + typeof res);
        }
      };
      this.getRenderbufferParameter = function(target2, pname) {
        const result = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.getRenderbufferParameter + "," + target2 + "," + pname);
        return result;
      };
      this.getShaderInfoLog = function(shader) {
        return WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.getShaderInfoLog + "," + shader.id);
      };
      this.getShaderParameter = function(shader, pname) {
        return WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.getShaderParameter + "," + shader.id + "," + pname);
      };
      this.getShaderPrecisionFormat = function(shaderType, precisionType) {
        const [rangeMin, rangeMax, precision] = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.getShaderPrecisionFormat + "," + shaderType + "," + precisionType);
        const shaderPrecisionFormat = new WebGLShaderPrecisionFormat({
          rangeMin: Number(rangeMin),
          rangeMax: Number(rangeMax),
          precision: Number(precision)
        });
        return shaderPrecisionFormat;
      };
      this.getShaderSource = function(shader) {
        const result = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.getShaderSource + "," + shader.id);
        return result;
      };
      this.getSupportedExtensions = function() {
        return Object.keys({});
      };
      this.getTexParameter = function(target2, pname) {
        const result = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.getTexParameter + "," + target2 + "," + pname);
        return result;
      };
      this.getUniformLocation = function(program, name2) {
        const id = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.getUniformLocation + "," + program.id + "," + name2);
        if (id === -1) {
          return null;
        } else {
          return new WebGLUniformLocation(Number(id));
        }
      };
      this.getVertexAttrib = function(index, pname) {
        const result = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.getVertexAttrib + "," + index + "," + pname);
        switch (pname) {
          case GLenum.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING:
            return this._map.get(WebGLBuffer.uuid(result)) || null;
          case GLenum.CURRENT_VERTEX_ATTRIB:
          default:
            return result;
        }
      };
      this.getVertexAttribOffset = function(index, pname) {
        const result = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.getVertexAttribOffset + "," + index + "," + pname);
        return Number(result);
      };
      this.isBuffer = function(buffer) {
        const result = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.isBuffer + "," + buffer.id);
        return Boolean(result);
      };
      this.isContextLost = function() {
        return false;
      };
      this.isEnabled = function(cap) {
        const result = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.isEnabled + "," + cap);
        return Boolean(result);
      };
      this.isFramebuffer = function(framebuffer) {
        const result = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.isFramebuffer + "," + framebuffer.id);
        return Boolean(result);
      };
      this.isProgram = function(program) {
        const result = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.isProgram + "," + program.id);
        return Boolean(result);
      };
      this.isRenderbuffer = function(renderBuffer) {
        const result = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.isRenderbuffer + "," + renderbuffer.id);
        return Boolean(result);
      };
      this.isShader = function(shader) {
        const result = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.isShader + "," + shader.id);
        return Boolean(result);
      };
      this.isTexture = function(texture) {
        const result = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.isTexture + "," + texture.id);
        return Boolean(result);
      };
      this.lineWidth = function(width) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.lineWidth + "," + width, true);
      };
      this.linkProgram = function(program) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.linkProgram + "," + program.id, true);
      };
      this.pixelStorei = function(pname, param) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.pixelStorei + "," + pname + "," + Number(param));
      };
      this.polygonOffset = function(factor, units) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.polygonOffset + "," + factor + "," + units);
      };
      this.readPixels = function(x, y, width, height, format, type2, pixels) {
        const result = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.readPixels + "," + x + "," + y + "," + width + "," + height + "," + format + "," + type2);
        return result;
      };
      this.renderbufferStorage = function(target2, internalFormat, width, height) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.renderbufferStorage + "," + target2 + "," + internalFormat + "," + width + "," + height, true);
      };
      this.sampleCoverage = function(value, invert) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.sampleCoverage + "," + value + "," + Number(invert), true);
      };
      this.scissor = function(x, y, width, height) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.scissor + "," + x + "," + y + "," + width + "," + height, true);
      };
      this.shaderSource = function(shader, source) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.shaderSource + "," + shader.id + "," + source);
      };
      this.stencilFunc = function(func, ref8, mask) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.stencilFunc + "," + func + "," + ref8 + "," + mask, true);
      };
      this.stencilFuncSeparate = function(face, func, ref8, mask) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.stencilFuncSeparate + "," + face + "," + func + "," + ref8 + "," + mask, true);
      };
      this.stencilMask = function(mask) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.stencilMask + "," + mask, true);
      };
      this.stencilMaskSeparate = function(face, mask) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.stencilMaskSeparate + "," + face + "," + mask, true);
      };
      this.stencilOp = function(fail, zfail, zpass) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.stencilOp + "," + fail + "," + zfail + "," + zpass);
      };
      this.stencilOpSeparate = function(face, fail, zfail, zpass) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.stencilOp + "," + face + "," + fail + "," + zfail + "," + zpass, true);
      };
      this.texImage2D = function(...args) {
        WebGLRenderingContext.GBridge.texImage2D(this._canvas.id, ...args);
      };
      this.texParameterf = function(target2, pname, param) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.texParameterf + "," + target2 + "," + pname + "," + param, true);
      };
      this.texParameteri = function(target2, pname, param) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.texParameteri + "," + target2 + "," + pname + "," + param);
      };
      this.texSubImage2D = function(...args) {
        WebGLRenderingContext.GBridge.texSubImage2D(this._canvas.id, ...args);
      };
      this.uniform1f = function(location, v0) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.uniform1f + "," + location.id + "," + v0);
      };
      this.uniform1fv = function(location, value) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.uniform1fv + "," + location.id + "," + processArray(value), true);
      };
      this.uniform1i = function(location, v0) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.uniform1i + "," + location.id + "," + v0);
      };
      this.uniform1iv = function(location, value) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.uniform1iv + "," + location.id + "," + processArray(value), true);
      };
      this.uniform2f = function(location, v0, v1) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.uniform2f + "," + location.id + "," + v0 + "," + v1, true);
      };
      this.uniform2fv = function(location, value) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.uniform2fv + "," + location.id + "," + processArray(value), true);
      };
      this.uniform2i = function(location, v0, v1) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.uniform2i + "," + location.id + "," + v0 + "," + v1, true);
      };
      this.uniform2iv = function(location, value) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.uniform2iv + "," + location.id + "," + processArray(value), true);
      };
      this.uniform3f = function(location, v0, v1, v2) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.uniform3f + "," + location.id + "," + v0 + "," + v1 + "," + v2, true);
      };
      this.uniform3fv = function(location, value) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.uniform3fv + "," + location.id + "," + processArray(value), true);
      };
      this.uniform3i = function(location, v0, v1, v2) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.uniform3i + "," + location.id + "," + v0 + "," + v1 + "," + v2, true);
      };
      this.uniform3iv = function(location, value) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.uniform3iv + "," + location.id + "," + processArray(value), true);
      };
      this.uniform4f = function(location, v0, v1, v2, v3) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.uniform4f + "," + location.id + "," + v0 + "," + v1 + "," + v2 + "," + v3, true);
      };
      this.uniform4fv = function(location, value) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.uniform4fv + "," + location.id + "," + processArray(value), true);
      };
      this.uniform4i = function(location, v0, v1, v2, v3) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.uniform4i + "," + location.id + "," + v0 + "," + v1 + "," + v2 + "," + v3, true);
      };
      this.uniform4iv = function(location, value) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.uniform4iv + "," + location.id + "," + processArray(value, true), true);
      };
      this.uniformMatrix2fv = function(location, transpose, value) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.uniformMatrix2fv + "," + location.id + "," + Number(transpose) + "," + processArray(value), true);
      };
      this.uniformMatrix3fv = function(location, transpose, value) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.uniformMatrix3fv + "," + location.id + "," + Number(transpose) + "," + processArray(value), true);
      };
      this.uniformMatrix4fv = function(location, transpose, value) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.uniformMatrix4fv + "," + location.id + "," + Number(transpose) + "," + processArray(value), true);
      };
      this.useProgram = function(progarm) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.useProgram + "," + progarm.id, true);
      };
      this.validateProgram = function(program) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.validateProgram + "," + program.id, true);
      };
      this.vertexAttrib1f = function(index, v0) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.vertexAttrib1f + "," + index + "," + v0, true);
      };
      this.vertexAttrib2f = function(index, v0, v1) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.vertexAttrib2f + "," + index + "," + v0 + "," + v1, true);
      };
      this.vertexAttrib3f = function(index, v0, v1, v2) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.vertexAttrib3f + "," + index + "," + v0 + "," + v1 + "," + v2, true);
      };
      this.vertexAttrib4f = function(index, v0, v1, v2, v3) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.vertexAttrib4f + "," + index + "," + v0 + "," + v1 + "," + v2 + "," + v3, true);
      };
      this.vertexAttrib1fv = function(index, value) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.vertexAttrib1fv + "," + index + "," + processArray(value), true);
      };
      this.vertexAttrib2fv = function(index, value) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.vertexAttrib2fv + "," + index + "," + processArray(value), true);
      };
      this.vertexAttrib3fv = function(index, value) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.vertexAttrib3fv + "," + index + "," + processArray(value), true);
      };
      this.vertexAttrib4fv = function(index, value) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.vertexAttrib4fv + "," + index + "," + processArray(value), true);
      };
      this.vertexAttribPointer = function(index, size, type2, normalized, stride, offset) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.vertexAttribPointer + "," + index + "," + size + "," + type2 + "," + Number(normalized) + "," + stride + "," + offset, true);
      };
      this.viewport = function(x, y, width, height) {
        WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.viewport + "," + x + "," + y + "," + width + "," + height, true);
      };
      this._canvas = canvas;
      this._type = type;
      this._version = "WebGL 1.0";
      this._attrs = attrs;
      this._map = /* @__PURE__ */ new Map();
      Object.keys(GLenum).forEach((name2) => Object.defineProperty(this, name2, {
        value: GLenum[name2]
      }));
    }
    get canvas() {
      return this._canvas;
    }
  };
  var GCanvas = class {
    constructor(id, { disableAutoSwap }) {
      this.id = null;
      this._needRender = true;
      this.id = id;
      this._disableAutoSwap = disableAutoSwap;
      if (disableAutoSwap) {
        this._swapBuffers = () => {
          GCanvas.GBridge.render(this.id);
        };
      }
    }
    getContext(type) {
      let context = null;
      if (type.match(/webgl/i)) {
        context = new WebGLRenderingContext(this);
        context.componentId = this.id;
        if (!this._disableAutoSwap) {
          const render = () => {
            if (this._needRender) {
              GCanvas.GBridge.render(this.id);
              this._needRender = false;
            }
          };
          setInterval(render, 16);
        }
        GCanvas.GBridge.callSetContextType(this.id, 1);
      } else if (type.match(/2d/i)) {
        context = new CanvasRenderingContext2D(this);
        context.componentId = this.id;
        GCanvas.GBridge.callSetContextType(this.id, 0);
      } else {
        throw new Error("not supported context " + type);
      }
      return context;
    }
    reset() {
      GCanvas.GBridge.callReset(this.id);
    }
  };
  var isWeex = typeof WXEnvironment !== "undefined";
  var isWeexIOS = isWeex && /ios/i.test(WXEnvironment.platform);
  var isWeexAndroid = isWeex && !isWeexIOS;
  var GCanvasModule = typeof weex !== "undefined" && weex.requireModule ? weex.requireModule("gcanvas") : typeof __weex_require__ !== "undefined" ? __weex_require__("@weex-module/gcanvas") : {};
  var isDebugging = false;
  var isComboDisabled = false;
  var logCommand = function() {
    const methodQuery = [];
    Object.keys(GLmethod).forEach((key) => {
      methodQuery[GLmethod[key]] = key;
    });
    const queryMethod = (id) => {
      return methodQuery[parseInt(id)] || "NotFoundMethod";
    };
    const logCommand2 = (id, cmds) => {
      const mId = cmds.split(",")[0];
      const mName = queryMethod(mId);
      formatAppLog("log", "at tmui/tool/gcanvas/bridge/bridge-weex.js:26", `=== callNative - componentId:${id}; method: ${mName}; cmds: ${cmds}`);
    };
    return logCommand2;
  }();
  function joinArray(arr, sep) {
    let res = "";
    for (let i2 = 0; i2 < arr.length; i2++) {
      if (i2 !== 0) {
        res += sep;
      }
      res += arr[i2];
    }
    return res;
  }
  var commandsCache = {};
  var GBridge = {
    callEnable: (ref8, configArray) => {
      commandsCache[ref8] = [];
      return GCanvasModule.enable({
        componentId: ref8,
        config: configArray
      });
    },
    callEnableDebug: () => {
      isDebugging = true;
    },
    callEnableDisableCombo: () => {
      isComboDisabled = true;
    },
    callSetContextType: function(componentId2, context_type) {
      GCanvasModule.setContextType(context_type, componentId2);
    },
    callReset: function(id) {
      GCanvasModule.resetComponent && canvasModule.resetComponent(componentId);
    },
    render: isWeexIOS ? function(componentId2) {
      return GCanvasModule.extendCallNative({
        contextId: componentId2,
        type: 1610612737
      });
    } : function(componentId2) {
      return callGCanvasLinkNative(componentId2, 1610612737, "render");
    },
    render2d: isWeexIOS ? function(componentId2, commands, callback) {
      if (isDebugging) {
        formatAppLog("log", "at tmui/tool/gcanvas/bridge/bridge-weex.js:84", ">>> >>> render2d ===");
        formatAppLog("log", "at tmui/tool/gcanvas/bridge/bridge-weex.js:85", ">>> commands: " + commands);
      }
      GCanvasModule.render([commands, callback ? true : false], componentId2, callback);
    } : function(componentId2, commands, callback) {
      if (isDebugging) {
        formatAppLog("log", "at tmui/tool/gcanvas/bridge/bridge-weex.js:93", ">>> >>> render2d ===");
        formatAppLog("log", "at tmui/tool/gcanvas/bridge/bridge-weex.js:94", ">>> commands: " + commands);
      }
      callGCanvasLinkNative(componentId2, 536870913, commands);
      if (callback) {
        callback();
      }
    },
    callExtendCallNative: isWeexIOS ? function(componentId2, cmdArgs) {
      throw "should not be here anymore " + cmdArgs;
    } : function(componentId2, cmdArgs) {
      throw "should not be here anymore " + cmdArgs;
    },
    flushNative: isWeexIOS ? function(componentId2) {
      const cmdArgs = joinArray(commandsCache[componentId2], ";");
      commandsCache[componentId2] = [];
      if (isDebugging) {
        formatAppLog("log", "at tmui/tool/gcanvas/bridge/bridge-weex.js:120", ">>> >>> flush native ===");
        formatAppLog("log", "at tmui/tool/gcanvas/bridge/bridge-weex.js:121", ">>> commands: " + cmdArgs);
      }
      const result = GCanvasModule.extendCallNative({
        "contextId": componentId2,
        "type": 1610612736,
        "args": cmdArgs
      });
      const res = result && result.result;
      if (isDebugging) {
        formatAppLog("log", "at tmui/tool/gcanvas/bridge/bridge-weex.js:133", ">>> result: " + res);
      }
      return res;
    } : function(componentId2) {
      const cmdArgs = joinArray(commandsCache[componentId2], ";");
      commandsCache[componentId2] = [];
      if (isDebugging) {
        formatAppLog("log", "at tmui/tool/gcanvas/bridge/bridge-weex.js:144", ">>> >>> flush native ===");
        formatAppLog("log", "at tmui/tool/gcanvas/bridge/bridge-weex.js:145", ">>> commands: " + cmdArgs);
      }
      const result = callGCanvasLinkNative(componentId2, 1610612736, cmdArgs);
      if (isDebugging) {
        formatAppLog("log", "at tmui/tool/gcanvas/bridge/bridge-weex.js:151", ">>> result: " + result);
      }
      return result;
    },
    callNative: function(componentId2, cmdArgs, cache) {
      if (isDebugging) {
        logCommand(componentId2, cmdArgs);
      }
      commandsCache[componentId2].push(cmdArgs);
      if (!cache || isComboDisabled) {
        return GBridge.flushNative(componentId2);
      } else {
        return void 0;
      }
    },
    texImage2D(componentId2, ...args) {
      if (isWeexIOS) {
        if (args.length === 6) {
          const [target2, level, internalformat, format, type, image2] = args;
          GBridge.callNative(componentId2, GLmethod.texImage2D + "," + 6 + "," + target2 + "," + level + "," + internalformat + "," + format + "," + type + "," + image2.src);
        } else if (args.length === 9) {
          const [target2, level, internalformat, width, height, border, format, type, image2] = args;
          GBridge.callNative(componentId2, GLmethod.texImage2D + "," + 9 + "," + target2 + "," + level + "," + internalformat + "," + width + "," + height + "," + border + "," + +format + "," + type + "," + (image2 ? image2.src : 0));
        }
      } else if (isWeexAndroid) {
        if (args.length === 6) {
          const [target2, level, internalformat, format, type, image2] = args;
          GCanvasModule.texImage2D(componentId2, target2, level, internalformat, format, type, image2.src);
        } else if (args.length === 9) {
          const [target2, level, internalformat, width, height, border, format, type, image2] = args;
          GCanvasModule.texImage2D(componentId2, target2, level, internalformat, width, height, border, format, type, image2 ? image2.src : 0);
        }
      }
    },
    texSubImage2D(componentId2, target2, level, xoffset, yoffset, format, type, image2) {
      if (isWeexIOS) {
        if (arguments.length === 8) {
          GBridge.callNative(componentId2, GLmethod.texSubImage2D + "," + 6 + "," + target2 + "," + level + "," + xoffset + "," + yoffset, +"," + format + "," + type + "," + image2.src);
        }
      } else if (isWeexAndroid) {
        GCanvasModule.texSubImage2D(componentId2, target2, level, xoffset, yoffset, format, type, image2.src);
      }
    },
    bindImageTexture(componentId2, src, imageId) {
      GCanvasModule.bindImageTexture([src, imageId], componentId2);
    },
    perloadImage([url, id], callback) {
      GCanvasModule.preLoadImage([url, id], function(image2) {
        image2.url = url;
        image2.id = id;
        callback(image2);
      });
    },
    measureText(text, fontStyle, componentId2) {
      return GCanvasModule.measureText([text, fontStyle], componentId2);
    },
    getImageData(componentId2, x, y, w, h, callback) {
      GCanvasModule.getImageData([x, y, w, h], componentId2, callback);
    },
    putImageData(componentId2, data, x, y, w, h, callback) {
      GCanvasModule.putImageData([x, y, w, h, data], componentId2, callback);
    },
    toTempFilePath(componentId2, x, y, width, height, destWidth, destHeight, fileType, quality, callback) {
      GCanvasModule.toTempFilePath([x, y, width, height, destWidth, destHeight, fileType, quality], componentId2, callback);
    }
  };
  var WeexBridge = GBridge;
  function enable(el, { bridge, debug, disableAutoSwap, disableComboCommands } = {}) {
    const GBridge2 = GImage.GBridge = GCanvas.GBridge = WebGLRenderingContext.GBridge = CanvasRenderingContext2D.GBridge = bridge;
    GBridge2.callEnable(el.ref, [
      0,
      -1,
      false,
      false,
      1,
      "white",
      false
    ]);
    if (debug === true) {
      GBridge2.callEnableDebug();
    }
    if (disableComboCommands) {
      GBridge2.callEnableDisableCombo();
    }
    var canvas = new GCanvas(el.ref, { disableAutoSwap });
    canvas.width = el.style.width;
    canvas.height = el.style.height;
    return canvas;
  }

  // F:/CoinQT/CoinQT_app/unpackage/dist/dev/.nvue/tm-divider.js
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
  var _sfc_main6 = /* @__PURE__ */ (0, import_vue6.defineComponent)({
    __name: "tm-divider",
    props: __spreadProps6(__spreadValues6({}, custom_props), {
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
      const borderDir = (0, import_vue6.computed)(() => props.vertical ? "left" : "bottom");
      const _label = (0, import_vue6.computed)(() => props.label);
      (_b2 = (_a2 = (0, import_vue6.getCurrentInstance)()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const tmcfg = (0, import_vue6.computed)(() => store.tmStore);
      const _realColor = (0, import_vue6.computed)(() => props.realColor);
      const isDark = (0, import_vue6.computed)(() => computedDark(__spreadProps6(__spreadValues6({}, props), { borderDirection: borderDir.value }), tmcfg.value));
      const tmcomputed = (0, import_vue6.computed)(() => computedTheme(__spreadProps6(__spreadValues6({}, props), { borderDirection: borderDir.value }), isDark.value, tmcfg.value));
      return (_ctx, _cache) => {
        return (0, import_vue6.openBlock)(), (0, import_vue6.createElementBlock)("view", { renderWhole: true }, [
          !(0, import_vue6.unref)(_label) && props.vertical ? ((0, import_vue6.openBlock)(), (0, import_vue6.createElementBlock)("view", {
            key: 0,
            style: (0, import_vue6.normalizeStyle)([{ backgroundColor: (0, import_vue6.unref)(_realColor) ? (0, import_vue6.unref)(tmcomputed).color : (0, import_vue6.unref)(tmcomputed).border }, props.vertical ? { width: props.border + "rpx", height: props.height + "rpx" } : ""]),
            class: (0, import_vue6.normalizeClass)([props.vertical ? `mx-${props.margin[0]}` : `my-${props.margin[1]}`])
          }, null, 6)) : (0, import_vue6.createCommentVNode)("v-if", true),
          (0, import_vue6.unref)(_label) && !props.vertical ? ((0, import_vue6.openBlock)(), (0, import_vue6.createElementBlock)("view", {
            key: 1,
            class: "flex flex-row flex-center"
          }, [
            (0, import_vue6.createElementVNode)("view", {
              style: (0, import_vue6.normalizeStyle)([(0, import_vue6.unref)(tmcomputed) ? { backgroundColor: (0, import_vue6.unref)(_realColor) ? (0, import_vue6.unref)(tmcomputed).color : (0, import_vue6.unref)(tmcomputed).border, height: props.border + "rpx" } : ""]),
              class: (0, import_vue6.normalizeClass)([`my-${props.margin[1]}`, __props.align == "left" ? "flex-2" : "", __props.align == "right" ? "flex-10" : "", __props.align == "center" ? "flex-1" : ""])
            }, null, 6),
            props.label ? ((0, import_vue6.openBlock)(), (0, import_vue6.createElementBlock)("view", {
              key: 0,
              class: (0, import_vue6.normalizeClass)([(0, import_vue6.unref)(isDark) ? "opacity-4" : ""])
            }, [
              (0, import_vue6.createVNode)(tmText, {
                fontSize: props.fontSize,
                dark: (0, import_vue6.unref)(isDark),
                followTheme: props.followTheme,
                color: props.fontColor,
                label: props.label,
                _class: ["mx-32"]
              }, null, 8, ["fontSize", "dark", "followTheme", "color", "label"])
            ], 2)) : (0, import_vue6.createCommentVNode)("v-if", true),
            (0, import_vue6.createElementVNode)("view", {
              style: (0, import_vue6.normalizeStyle)([(0, import_vue6.unref)(tmcomputed) ? { backgroundColor: (0, import_vue6.unref)(_realColor) ? (0, import_vue6.unref)(tmcomputed).color : (0, import_vue6.unref)(tmcomputed).border, height: props.border + "rpx" } : ""]),
              class: (0, import_vue6.normalizeClass)([`my-${props.margin[1]}`, __props.align == "left" ? "flex-10" : "", __props.align == "right" ? "flex-2" : "", __props.align == "center" ? "flex-1" : ""])
            }, null, 6)
          ])) : (0, import_vue6.createCommentVNode)("v-if", true),
          !(0, import_vue6.unref)(_label) && !props.vertical ? ((0, import_vue6.openBlock)(), (0, import_vue6.createElementBlock)("view", {
            key: 2,
            class: "flex flex-row flex-center"
          }, [
            (0, import_vue6.createElementVNode)("view", {
              class: (0, import_vue6.normalizeClass)(["flex-1", [`my-${props.margin[1]}`]]),
              style: (0, import_vue6.normalizeStyle)([(0, import_vue6.unref)(tmcomputed) ? { backgroundColor: (0, import_vue6.unref)(_realColor) ? (0, import_vue6.unref)(tmcomputed).color : (0, import_vue6.unref)(tmcomputed).border, height: props.border + "rpx" } : ""])
            }, null, 6)
          ])) : (0, import_vue6.createCommentVNode)("v-if", true)
        ]);
      };
    }
  });
  var tmDivider = /* @__PURE__ */ _export_sfc(_sfc_main6, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-divider/tm-divider.vue"]]);

  // F:/CoinQT/CoinQT_app/unpackage/dist/dev/.nvue/tm-input.js
  var import_vue8 = __toESM(require_vue());

  // F:/CoinQT/CoinQT_app/unpackage/dist/dev/.nvue/tm-button.js
  var import_vue7 = __toESM(require_vue());
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
  var _style_03 = { "button": { "": { "backgroundColor": "rgba(0,0,0,0)", "borderWidth": 0, "borderStyle": "solid", "borderColor": "rgba(0,0,0,0)", "paddingTop": 0, "paddingRight": 0, "paddingBottom": 0, "paddingLeft": 0, "borderRadius": 0 } }, "buttonHover": { "": { "backgroundColor": "rgba(0,0,0,0)" } }, "bhover": { "": { "opacity": 0.7 } } };
  var _sfc_main7 = /* @__PURE__ */ (0, import_vue7.defineComponent)({
    __name: "tm-button",
    props: __spreadProps7(__spreadValues7({}, custom_props), {
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
      const proxy = (_b2 = (_a2 = (0, import_vue7.getCurrentInstance)()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const formtype = (0, import_vue7.computed)(() => props.formType);
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
      const customCSSStyle = (0, import_vue7.computed)(() => {
        return __spreadProps7(__spreadValues7({
          height: btnSizeObj.value.h + props.unit
        }, computedStyle(props)), {
          border: "0px solid rgba(0, 0, 0, 0)",
          background: "rgba(0, 0, 0, 0)",
          borderRadius: "0px"
        });
      });
      const customClass = (0, import_vue7.computed)(() => computedClass(props));
      const isclickOn = (0, import_vue7.ref)(false);
      const _load = (0, import_vue7.computed)(() => props.loading);
      const _disabled = (0, import_vue7.computed)(() => props.disabled);
      const _label = (0, import_vue7.computed)(() => props.label);
      const _icon = (0, import_vue7.computed)(() => props.icon);
      const sizeObj = (0, import_vue7.computed)(() => {
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
      const btnSizeObj = (0, import_vue7.computed)(() => {
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
      const _fontColor = (0, import_vue7.computed)(() => props.fontColor);
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
        const _component_button = (0, import_vue7.resolveComponent)("button");
        return (0, import_vue7.openBlock)(), (0, import_vue7.createBlock)(tmSheet, {
          "no-level": "",
          _style: { opacity: isclickOn.value || (0, import_vue7.unref)(_disabled) ? 0.7 : 1 },
          "hover-class": "none",
          round: (0, import_vue7.unref)(btnSizeObj).round,
          width: (0, import_vue7.unref)(btnSizeObj).w,
          height: (0, import_vue7.unref)(btnSizeObj).h,
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
          default: (0, import_vue7.withCtx)(() => [
            (0, import_vue7.createVNode)(_component_button, {
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
              loading: (0, import_vue7.unref)(_load),
              disabled: (0, import_vue7.unref)(_disabled),
              "hover-start-time": 1e7,
              "hover-stop-propagation": "",
              "hover-class": "bhover",
              class: (0, import_vue7.normalizeClass)(["button flex-1 flex-center", [(0, import_vue7.unref)(customClass)]]),
              style: (0, import_vue7.normalizeStyle)((0, import_vue7.unref)(customCSSStyle))
            }, {
              default: (0, import_vue7.withCtx)(() => [
                (0, import_vue7.renderSlot)(_ctx.$slots, "default", {}, () => [
                  (0, import_vue7.unref)(_icon) ? ((0, import_vue7.openBlock)(), (0, import_vue7.createBlock)(tmIcon, {
                    key: 0,
                    userInteractionEnabled: false,
                    color: (0, import_vue7.unref)(_fontColor),
                    _class: (0, import_vue7.unref)(_label) ? "pr-10" : "",
                    unit: props.unit,
                    fontSize: (0, import_vue7.unref)(btnSizeObj).fontSize * 0.9,
                    name: (0, import_vue7.unref)(_icon)
                  }, null, 8, ["color", "_class", "unit", "fontSize", "name"])) : (0, import_vue7.createCommentVNode)("v-if", true),
                  (0, import_vue7.createVNode)(tmText, {
                    userInteractionEnabled: false,
                    color: (0, import_vue7.unref)(_fontColor),
                    fontSize: (0, import_vue7.unref)(btnSizeObj).fontSize,
                    unit: props.unit,
                    label: (0, import_vue7.unref)(_label)
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
  var TmButton = /* @__PURE__ */ _export_sfc(_sfc_main7, [["styles", [_style_03]], ["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-button/tm-button.vue"]]);

  // F:/CoinQT/CoinQT_app/unpackage/dist/dev/.nvue/tm-input.js
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
    __name: "tm-input",
    props: __spreadProps8(__spreadValues8({}, custom_props), {
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
      const proxy = (_b2 = (_a2 = (0, import_vue8.getCurrentInstance)()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      let parentFormItem = proxy == null ? void 0 : proxy.$parent;
      while (parentFormItem) {
        if ((parentFormItem == null ? void 0 : parentFormItem.tmFormComnameFormItem) == "tmFormComnameFormItem" || !parentFormItem) {
          break;
        } else {
          parentFormItem = (_c = parentFormItem == null ? void 0 : parentFormItem.$parent) != null ? _c : void 0;
        }
      }
      const isAndroid = (0, import_vue8.ref)(false);
      isAndroid.value = uni.getSystemInfoSync().osName == "android" ? true : false;
      const _height = (0, import_vue8.computed)(() => props.height);
      const _inputPadding = (0, import_vue8.computed)(() => {
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
      const propsDetail = (0, import_vue8.computed)(() => {
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
      const tmcfg = (0, import_vue8.computed)(() => store.tmStore);
      (0, import_vue8.computed)(() => computedStyle(props));
      (0, import_vue8.computed)(() => computedClass(props));
      const isDark = (0, import_vue8.computed)(() => computedDark(props, tmcfg.value));
      const _requiredError = (0, import_vue8.ref)(false);
      const _foucsActive = (0, import_vue8.ref)(props.focus || false);
      (0, import_vue8.watch)(() => props.focus, () => {
        _foucsActive.value = props.focus;
      });
      const _color = (0, import_vue8.computed)(() => {
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
      const tmcomputed = (0, import_vue8.computed)(() => {
        const _props = __spreadProps8(__spreadValues8({}, props), { color: _color.value });
        return computedTheme(_props, isDark.value, tmcfg.value);
      });
      const showPasswordText = (0, import_vue8.ref)(propsDetail.value.password);
      const showPasswordIcon = (0, import_vue8.computed)(() => props.password);
      (0, import_vue8.ref)(props.errorLabel);
      const _value = (0, import_vue8.ref)(props.modelValue);
      const _valueLenChar = (0, import_vue8.computed)(() => {
        let str = String(_value.value).split("");
        return str.length;
      });
      (0, import_vue8.watch)(() => props.modelValue, () => _value.value = props.modelValue);
      const rulesObj = (0, import_vue8.inject)("tmFormItemRules", (0, import_vue8.computed)(() => {
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
      (0, import_vue8.watch)(_value, () => debounce(pushFormItem, 200));
      const tmFormFun = (0, import_vue8.inject)("tmFormFun", (0, import_vue8.computed)(() => ""));
      const validate = (rules) => {
        rules = rules.map((el) => {
          if (typeof el.validator === "function" && el.required === true) {
            return el;
          } else if (typeof el.validator === "boolean" && el.required === true) {
            return __spreadProps8(__spreadValues8({}, el), {
              validator: (val) => {
                return String(val).length == 0 || typeof val === null ? false : true;
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
              validate((0, import_vue8.toRaw)(rulesObj.value)).then((ev) => {
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
      (0, import_vue8.watch)(tmFormFun, () => {
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
        return (0, import_vue8.openBlock)(), (0, import_vue8.createBlock)(tmSheet, {
          transprent: true,
          margin: props.margin,
          padding: props.padding
        }, {
          default: (0, import_vue8.withCtx)(() => [
            (0, import_vue8.createVNode)(tmSheet, {
              transprent: props.transprent,
              round: props.round,
              "no-level": "",
              margin: [0, 0],
              padding: (0, import_vue8.unref)(_inputPadding),
              border: props.border,
              text: props.text,
              color: (0, import_vue8.unref)(_color),
              outlined: props.outlined,
              shadow: props.shadow,
              linear: props.linear,
              linearDeep: props.linearDeep
            }, {
              default: (0, import_vue8.withCtx)(() => [
                (0, import_vue8.createElementVNode)("view", {
                  class: (0, import_vue8.normalizeClass)(["flex flex-row", [(0, import_vue8.unref)(propsDetail).type == "textarea" ? "flex-row-top-center" : "flex-row-center-center"]]),
                  onClick: _cache[7] || (_cache[7] = ($event) => inputClick($event, "")),
                  style: (0, import_vue8.normalizeStyle)([{ height: `${(0, import_vue8.unref)(_height)}rpx` }])
                }, [
                  (0, import_vue8.unref)(propsDetail).search || (0, import_vue8.unref)(propsDetail).searchLabel ? ((0, import_vue8.openBlock)(), (0, import_vue8.createElementBlock)("view", {
                    key: 0,
                    class: "px-9"
                  })) : (0, import_vue8.createCommentVNode)("v-if", true),
                  (0, import_vue8.renderSlot)(_ctx.$slots, "left"),
                  (0, import_vue8.unref)(propsDetail).prefix ? ((0, import_vue8.openBlock)(), (0, import_vue8.createElementBlock)("view", {
                    key: 1,
                    class: "pr-16"
                  }, [
                    (0, import_vue8.createVNode)(tmIcon, {
                      "font-size": (0, import_vue8.unref)(propsDetail).fontSize,
                      name: (0, import_vue8.unref)(propsDetail).prefix
                    }, null, 8, ["font-size", "name"])
                  ])) : (0, import_vue8.createCommentVNode)("v-if", true),
                  (0, import_vue8.unref)(propsDetail).prefixLabel ? ((0, import_vue8.openBlock)(), (0, import_vue8.createElementBlock)("view", {
                    key: 2,
                    class: "pr-24"
                  }, [
                    (0, import_vue8.createVNode)(tmText, {
                      "font-size": (0, import_vue8.unref)(propsDetail).fontSize,
                      label: (0, import_vue8.unref)(propsDetail).prefixLabel
                    }, null, 8, ["font-size", "label"])
                  ])) : (0, import_vue8.createCommentVNode)("v-if", true),
                  !isAndroid.value ? ((0, import_vue8.openBlock)(), (0, import_vue8.createElementBlock)("view", {
                    key: 3,
                    onClick: _cache[2] || (_cache[2] = (0, import_vue8.withModifiers)(($event) => inputClick($event, "ali"), ["stop"])),
                    class: "flex-1 relative flex-row flex",
                    style: (0, import_vue8.normalizeStyle)([{ width: "0px" }])
                  }, [
                    (0, import_vue8.createCommentVNode)(` <view @click.stop="emits('click',$event)" class=" l-0 t-0 flex-1 " :style="{height: \`\${_height}rpx\`,background:'red'}"></view> `),
                    (0, import_vue8.unref)(propsDetail).type != "textarea" ? ((0, import_vue8.openBlock)(), (0, import_vue8.createElementBlock)("u-input", {
                      key: 0,
                      class: "flex-1",
                      userInteractionEnabled: false,
                      value: _value.value,
                      focus: (0, import_vue8.unref)(propsDetail).focus,
                      onFocus: focus,
                      onBlur: blur,
                      onConfirm: confirm,
                      onInput: inputHandler,
                      onKeyboardheightchange: _cache[0] || (_cache[0] = ($event) => emits("keyboardheightchange")),
                      password: showPasswordText.value,
                      maxlength: (0, import_vue8.unref)(propsDetail).maxlength,
                      disabled: (0, import_vue8.unref)(propsDetail).disabled,
                      cursorSpacing: (0, import_vue8.unref)(propsDetail).cursorSpacing,
                      confirmType: (0, import_vue8.unref)(propsDetail).confirmType,
                      confirmHold: (0, import_vue8.unref)(propsDetail).confirmHold,
                      autoBlur: (0, import_vue8.unref)(propsDetail).autoBlur,
                      holdKeyboard: (0, import_vue8.unref)(propsDetail).holdKeyboard,
                      adjustPosition: (0, import_vue8.unref)(propsDetail).adjustPosition,
                      type: (0, import_vue8.unref)(propsDetail).type,
                      placeholder: (0, import_vue8.unref)(propsDetail).placeholder,
                      style: (0, import_vue8.normalizeStyle)([
                        {
                          height: `${(0, import_vue8.unref)(_height)}rpx`,
                          color: (0, import_vue8.unref)(propsDetail).fontColor ? (0, import_vue8.unref)(propsDetail).fontColor : (0, import_vue8.unref)(tmcomputed).textColor,
                          "text-align": props.align,
                          "fontSize": `${(0, import_vue8.unref)(propsDetail).fontSize_px}px`
                        }
                      ]),
                      placeholderStyle: `fontSize:${(0, import_vue8.unref)(propsDetail).fontSize_px}px`
                    }, null, 44, ["value", "focus", "password", "maxlength", "disabled", "cursorSpacing", "confirmType", "confirmHold", "autoBlur", "holdKeyboard", "adjustPosition", "type", "placeholder", "placeholderStyle"])) : (0, import_vue8.createCommentVNode)("v-if", true),
                    (0, import_vue8.unref)(propsDetail).type == "textarea" ? ((0, import_vue8.openBlock)(), (0, import_vue8.createElementBlock)("u-textarea", {
                      key: 1,
                      userInteractionEnabled: false,
                      value: _value.value,
                      focus: (0, import_vue8.unref)(propsDetail).focus,
                      onFocus: focus,
                      onBlur: blur,
                      onConfirm: confirm,
                      onInput: inputHandler,
                      onKeyboardheightchange: _cache[1] || (_cache[1] = ($event) => emits("keyboardheightchange")),
                      maxlength: (0, import_vue8.unref)(propsDetail).maxlength,
                      disabled: (0, import_vue8.unref)(propsDetail).disabled,
                      placeholder: (0, import_vue8.unref)(propsDetail).placeholder,
                      cursorSpacing: (0, import_vue8.unref)(propsDetail).cursorSpacing,
                      confirmHold: (0, import_vue8.unref)(propsDetail).confirmHold,
                      autoBlur: (0, import_vue8.unref)(propsDetail).autoBlur,
                      holdKeyboard: (0, import_vue8.unref)(propsDetail).holdKeyboard,
                      cursor: (0, import_vue8.unref)(propsDetail).cursor,
                      showConfirmBar: (0, import_vue8.unref)(propsDetail).showConfirmBar,
                      selectionStart: (0, import_vue8.unref)(propsDetail).selectionStart,
                      selectionEnd: (0, import_vue8.unref)(propsDetail).selectionEnd,
                      disableDefaultPadding: (0, import_vue8.unref)(propsDetail).disableDefaultPadding,
                      fixed: (0, import_vue8.unref)(propsDetail).fixed,
                      adjustPosition: (0, import_vue8.unref)(propsDetail).adjustPosition,
                      type: (0, import_vue8.unref)(propsDetail).type,
                      style: (0, import_vue8.normalizeStyle)([
                        {
                          height: `${(0, import_vue8.unref)(_height)}rpx`,
                          width: "auto",
                          "word-break": "break-word",
                          color: (0, import_vue8.unref)(propsDetail).fontColor ? (0, import_vue8.unref)(propsDetail).fontColor : (0, import_vue8.unref)(tmcomputed).textColor,
                          "text-align": props.align,
                          "fontSize": `${(0, import_vue8.unref)(propsDetail).fontSize_px}px`
                        }
                      ]),
                      class: "wrap flex-1 py-12",
                      placeholderStyle: `fontSize:${(0, import_vue8.unref)(propsDetail).fontSize_px}px`
                    }, null, 44, ["value", "focus", "maxlength", "disabled", "placeholder", "cursorSpacing", "confirmHold", "autoBlur", "holdKeyboard", "cursor", "showConfirmBar", "selectionStart", "selectionEnd", "disableDefaultPadding", "fixed", "adjustPosition", "type", "placeholderStyle"])) : (0, import_vue8.createCommentVNode)("v-if", true)
                  ])) : (0, import_vue8.createCommentVNode)("v-if", true),
                  isAndroid.value ? ((0, import_vue8.openBlock)(), (0, import_vue8.createElementBlock)("view", {
                    key: 4,
                    class: "flex-1 relative flex-row flex",
                    style: (0, import_vue8.normalizeStyle)([{ width: "0px" }])
                  }, [
                    (0, import_vue8.createCommentVNode)(` <view @click.stop="emits('click',$event)" class=" l-0 t-0 flex-1 " :style="{height: \`\${_height}rpx\`,background:'red'}"></view> `),
                    (0, import_vue8.unref)(propsDetail).type != "textarea" ? ((0, import_vue8.openBlock)(), (0, import_vue8.createElementBlock)("u-input", {
                      key: 0,
                      class: "flex-1",
                      onClick: _cache[3] || (_cache[3] = (0, import_vue8.withModifiers)(($event) => emits("click", $event), ["stop"])),
                      userInteractionEnabled: false,
                      value: _value.value,
                      focus: (0, import_vue8.unref)(propsDetail).focus,
                      onFocus: focus,
                      onBlur: blur,
                      onConfirm: confirm,
                      onInput: inputHandler,
                      onKeyboardheightchange: _cache[4] || (_cache[4] = ($event) => emits("keyboardheightchange")),
                      password: showPasswordText.value,
                      disabled: (0, import_vue8.unref)(propsDetail).disabled,
                      cursorSpacing: (0, import_vue8.unref)(propsDetail).cursorSpacing,
                      confirmType: (0, import_vue8.unref)(propsDetail).confirmType,
                      confirmHold: (0, import_vue8.unref)(propsDetail).confirmHold,
                      autoBlur: (0, import_vue8.unref)(propsDetail).autoBlur,
                      holdKeyboard: (0, import_vue8.unref)(propsDetail).holdKeyboard,
                      adjustPosition: (0, import_vue8.unref)(propsDetail).adjustPosition,
                      maxlength: (0, import_vue8.unref)(propsDetail).maxlength,
                      type: (0, import_vue8.unref)(propsDetail).type,
                      placeholder: (0, import_vue8.unref)(propsDetail).placeholder,
                      style: (0, import_vue8.normalizeStyle)([
                        {
                          height: `${(0, import_vue8.unref)(_height)}rpx`,
                          color: (0, import_vue8.unref)(propsDetail).fontColor ? (0, import_vue8.unref)(propsDetail).fontColor : (0, import_vue8.unref)(tmcomputed).textColor,
                          "text-align": props.align,
                          "fontSize": `${(0, import_vue8.unref)(propsDetail).fontSize_px}px`
                        }
                      ]),
                      placeholderStyle: `fontSize:${(0, import_vue8.unref)(propsDetail).fontSize_px}px`
                    }, null, 44, ["value", "focus", "password", "disabled", "cursorSpacing", "confirmType", "confirmHold", "autoBlur", "holdKeyboard", "adjustPosition", "maxlength", "type", "placeholder", "placeholderStyle"])) : (0, import_vue8.createCommentVNode)("v-if", true),
                    (0, import_vue8.unref)(propsDetail).type == "textarea" ? ((0, import_vue8.openBlock)(), (0, import_vue8.createElementBlock)("u-textarea", {
                      key: 1,
                      onClick: _cache[5] || (_cache[5] = (0, import_vue8.withModifiers)(($event) => emits("click", $event), ["stop"])),
                      userInteractionEnabled: false,
                      value: _value.value,
                      focus: (0, import_vue8.unref)(propsDetail).focus,
                      onFocus: focus,
                      onBlur: blur,
                      onConfirm: confirm,
                      onInput: inputHandler,
                      onKeyboardheightchange: _cache[6] || (_cache[6] = ($event) => emits("keyboardheightchange")),
                      disabled: (0, import_vue8.unref)(propsDetail).disabled,
                      placeholder: (0, import_vue8.unref)(propsDetail).placeholder,
                      cursorSpacing: (0, import_vue8.unref)(propsDetail).cursorSpacing,
                      confirmHold: (0, import_vue8.unref)(propsDetail).confirmHold,
                      autoBlur: (0, import_vue8.unref)(propsDetail).autoBlur,
                      holdKeyboard: (0, import_vue8.unref)(propsDetail).holdKeyboard,
                      adjustPosition: (0, import_vue8.unref)(propsDetail).adjustPosition,
                      maxlength: (0, import_vue8.unref)(propsDetail).maxlength,
                      autoHeight: (0, import_vue8.unref)(propsDetail).autoHeight,
                      cursor: (0, import_vue8.unref)(propsDetail).cursor,
                      showConfirmBar: (0, import_vue8.unref)(propsDetail).showConfirmBar,
                      selectionStart: (0, import_vue8.unref)(propsDetail).selectionStart,
                      selectionEnd: (0, import_vue8.unref)(propsDetail).selectionEnd,
                      disableDefaultPadding: (0, import_vue8.unref)(propsDetail).disableDefaultPadding,
                      fixed: (0, import_vue8.unref)(propsDetail).fixed,
                      type: (0, import_vue8.unref)(propsDetail).type,
                      style: (0, import_vue8.normalizeStyle)([
                        {
                          height: `${(0, import_vue8.unref)(_height)}rpx`,
                          width: "auto",
                          "word-break": "break-word",
                          color: (0, import_vue8.unref)(propsDetail).fontColor ? (0, import_vue8.unref)(propsDetail).fontColor : (0, import_vue8.unref)(tmcomputed).textColor,
                          "text-align": props.align,
                          "fontSize": `${(0, import_vue8.unref)(propsDetail).fontSize_px}px`
                        }
                      ]),
                      class: "wrap flex-1 py-10",
                      placeholderStyle: `fontSize:${(0, import_vue8.unref)(propsDetail).fontSize_px}px`
                    }, null, 44, ["value", "focus", "disabled", "placeholder", "cursorSpacing", "confirmHold", "autoBlur", "holdKeyboard", "adjustPosition", "maxlength", "autoHeight", "cursor", "showConfirmBar", "selectionStart", "selectionEnd", "disableDefaultPadding", "fixed", "type", "placeholderStyle"])) : (0, import_vue8.createCommentVNode)("v-if", true)
                  ])) : (0, import_vue8.createCommentVNode)("v-if", true),
                  (0, import_vue8.unref)(propsDetail).showClear && (0, import_vue8.unref)(_valueLenChar) > 0 ? ((0, import_vue8.openBlock)(), (0, import_vue8.createElementBlock)("view", {
                    key: 5,
                    class: "pl-16"
                  }, [
                    (0, import_vue8.createVNode)(tmIcon, {
                      onClick: clearBtn,
                      "font-size": (0, import_vue8.unref)(propsDetail).fontSize * 0.9,
                      name: "tmicon-times-circle-fill"
                    }, null, 8, ["font-size"])
                  ])) : (0, import_vue8.createCommentVNode)("v-if", true),
                  _requiredError.value ? ((0, import_vue8.openBlock)(), (0, import_vue8.createElementBlock)("view", {
                    key: 6,
                    class: "pl-16"
                  }, [
                    (0, import_vue8.createVNode)(tmIcon, {
                      "font-size": (0, import_vue8.unref)(propsDetail).fontSize,
                      name: "tmicon-exclamation-circle"
                    }, null, 8, ["font-size"])
                  ])) : (0, import_vue8.createCommentVNode)("v-if", true),
                  (0, import_vue8.unref)(propsDetail).suffix ? ((0, import_vue8.openBlock)(), (0, import_vue8.createElementBlock)("view", {
                    key: 7,
                    class: "pl-16"
                  }, [
                    (0, import_vue8.createVNode)(tmIcon, {
                      "font-size": (0, import_vue8.unref)(propsDetail).fontSize * 0.85,
                      name: (0, import_vue8.unref)(propsDetail).suffix
                    }, null, 8, ["font-size", "name"])
                  ])) : (0, import_vue8.createCommentVNode)("v-if", true),
                  (0, import_vue8.unref)(propsDetail).suffixLabel ? ((0, import_vue8.openBlock)(), (0, import_vue8.createElementBlock)("view", {
                    key: 8,
                    class: "pl-16"
                  }, [
                    (0, import_vue8.createVNode)(tmText, {
                      "font-size": (0, import_vue8.unref)(propsDetail).fontSize,
                      label: (0, import_vue8.unref)(propsDetail).suffixLabel
                    }, null, 8, ["font-size", "label"])
                  ])) : (0, import_vue8.createCommentVNode)("v-if", true),
                  (0, import_vue8.unref)(showPasswordIcon) ? ((0, import_vue8.openBlock)(), (0, import_vue8.createElementBlock)("view", {
                    key: 9,
                    class: "pl-16"
                  }, [
                    (0, import_vue8.createCommentVNode)(" tmicon-eyeslash-fill "),
                    (0, import_vue8.createVNode)(tmIcon, {
                      onClick: changeSeePassword,
                      "font-size": (0, import_vue8.unref)(propsDetail).fontSize,
                      name: showPasswordText.value ? "tmicon-eyeslash-fill" : "tmicon-eye-fill"
                    }, null, 8, ["font-size", "name"])
                  ])) : (0, import_vue8.createCommentVNode)("v-if", true),
                  (0, import_vue8.unref)(propsDetail).showCharNumber && (0, import_vue8.unref)(_valueLenChar) > 0 && (0, import_vue8.unref)(propsDetail).type != "textarea" ? ((0, import_vue8.openBlock)(), (0, import_vue8.createElementBlock)("view", {
                    key: 10,
                    class: "pl-16 flex-row flex"
                  }, [
                    (0, import_vue8.createVNode)(tmText, { label: (0, import_vue8.unref)(_valueLenChar) }, null, 8, ["label"]),
                    (0, import_vue8.unref)(propsDetail).maxlength > 0 ? ((0, import_vue8.openBlock)(), (0, import_vue8.createBlock)(tmText, {
                      key: 0,
                      label: "/" + (0, import_vue8.unref)(propsDetail).maxlength
                    }, null, 8, ["label"])) : (0, import_vue8.createCommentVNode)("v-if", true)
                  ])) : (0, import_vue8.createCommentVNode)("v-if", true),
                  (0, import_vue8.createCommentVNode)(" \u539F\u56E0\u662F\u652F\u4ED8\u5B9D\u5C0F\u7A0B\u5E8F\u81EA\u5E26\u4E86\u8BA1\u6570\u5668\u3002\u4F1A\u5BFC\u81F4\u91CD\u53E0\u3002 "),
                  (0, import_vue8.unref)(propsDetail).showCharNumber && (0, import_vue8.unref)(_valueLenChar) > 0 && (0, import_vue8.unref)(propsDetail).type == "textarea" ? ((0, import_vue8.openBlock)(), (0, import_vue8.createElementBlock)("view", {
                    key: 11,
                    class: "pl-16 flex-row flex absolute r-0 b-12"
                  }, [
                    (0, import_vue8.createVNode)(tmText, { label: (0, import_vue8.unref)(_valueLenChar) }, null, 8, ["label"]),
                    (0, import_vue8.unref)(propsDetail).maxlength > 0 ? ((0, import_vue8.openBlock)(), (0, import_vue8.createBlock)(tmText, {
                      key: 0,
                      label: "/" + (0, import_vue8.unref)(propsDetail).maxlength
                    }, null, 8, ["label"])) : (0, import_vue8.createCommentVNode)("v-if", true)
                  ])) : (0, import_vue8.createCommentVNode)("v-if", true),
                  (0, import_vue8.renderSlot)(_ctx.$slots, "right", {}, () => [
                    (0, import_vue8.unref)(propsDetail).search || (0, import_vue8.unref)(propsDetail).searchLabel ? ((0, import_vue8.openBlock)(), (0, import_vue8.createElementBlock)("view", {
                      key: 0,
                      class: "pl-16"
                    }, [
                      (0, import_vue8.createVNode)(TmButton, {
                        followTheme: props.followTheme,
                        onClick: searchClick,
                        color: props.focusColor,
                        "font-size": 24,
                        height: (0, import_vue8.unref)(_height) - 11,
                        padding: [16, 0],
                        block: "",
                        margin: [0, 0],
                        icon: (0, import_vue8.unref)(propsDetail).search,
                        label: (0, import_vue8.unref)(propsDetail).searchLabel
                      }, null, 8, ["followTheme", "color", "height", "icon", "label"])
                    ])) : (0, import_vue8.createCommentVNode)("v-if", true)
                  ])
                ], 6)
              ]),
              _: 3
            }, 8, ["transprent", "round", "padding", "border", "text", "color", "outlined", "shadow", "linear", "linearDeep"]),
            (0, import_vue8.createCommentVNode)(' <view v-if="propsDetail.showBottomBotder" :class="[`mt-${props.margin[1]*2}`]">\r\n            <tm-divider :margin="[0,0]"></tm-divider>\r\n        </view> '),
            (0, import_vue8.createCommentVNode)(" _requiredError "),
            (0, import_vue8.createCommentVNode)(' <view v-if="false" class="pt-12">\r\n            <tmText :font-size="24" color="red" :label="_errorLabel"></tmText>\r\n        </view> ')
          ]),
          _: 3
        }, 8, ["margin", "padding"]);
      };
    }
  });
  var tmInput = /* @__PURE__ */ _export_sfc(_sfc_main8, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-input/tm-input.vue"]]);

  // F:/CoinQT/CoinQT_app/unpackage/dist/dev/.nvue/pages/showdata/qrcode.js
  var import_pinia2 = __toESM(require_pinia());
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
  var qrOptsDefault = {
    baseColor: "#fff",
    backgroundImage: null,
    backgroundColor: null,
    size: 300,
    border: 0.05,
    str: "tmui",
    forgroundColor: "#000",
    logoImage: null,
    logoWidth: 20,
    logoHeight: 20,
    ecc: "M",
    linearDir: "tlbr"
  };
  var ALIGNMENT_DELTA = [
    0,
    11,
    15,
    19,
    23,
    27,
    31,
    16,
    18,
    20,
    22,
    24,
    26,
    28,
    20,
    22,
    24,
    24,
    26,
    28,
    28,
    22,
    24,
    24,
    26,
    26,
    28,
    28,
    24,
    24,
    26,
    26,
    26,
    28,
    28,
    24,
    26,
    26,
    26,
    28,
    28
  ];
  var ECC_BLOCKS = [
    1,
    0,
    19,
    7,
    1,
    0,
    16,
    10,
    1,
    0,
    13,
    13,
    1,
    0,
    9,
    17,
    1,
    0,
    34,
    10,
    1,
    0,
    28,
    16,
    1,
    0,
    22,
    22,
    1,
    0,
    16,
    28,
    1,
    0,
    55,
    15,
    1,
    0,
    44,
    26,
    2,
    0,
    17,
    18,
    2,
    0,
    13,
    22,
    1,
    0,
    80,
    20,
    2,
    0,
    32,
    18,
    2,
    0,
    24,
    26,
    4,
    0,
    9,
    16,
    1,
    0,
    108,
    26,
    2,
    0,
    43,
    24,
    2,
    2,
    15,
    18,
    2,
    2,
    11,
    22,
    2,
    0,
    68,
    18,
    4,
    0,
    27,
    16,
    4,
    0,
    19,
    24,
    4,
    0,
    15,
    28,
    2,
    0,
    78,
    20,
    4,
    0,
    31,
    18,
    2,
    4,
    14,
    18,
    4,
    1,
    13,
    26,
    2,
    0,
    97,
    24,
    2,
    2,
    38,
    22,
    4,
    2,
    18,
    22,
    4,
    2,
    14,
    26,
    2,
    0,
    116,
    30,
    3,
    2,
    36,
    22,
    4,
    4,
    16,
    20,
    4,
    4,
    12,
    24,
    2,
    2,
    68,
    18,
    4,
    1,
    43,
    26,
    6,
    2,
    19,
    24,
    6,
    2,
    15,
    28,
    4,
    0,
    81,
    20,
    1,
    4,
    50,
    30,
    4,
    4,
    22,
    28,
    3,
    8,
    12,
    24,
    2,
    2,
    92,
    24,
    6,
    2,
    36,
    22,
    4,
    6,
    20,
    26,
    7,
    4,
    14,
    28,
    4,
    0,
    107,
    26,
    8,
    1,
    37,
    22,
    8,
    4,
    20,
    24,
    12,
    4,
    11,
    22,
    3,
    1,
    115,
    30,
    4,
    5,
    40,
    24,
    11,
    5,
    16,
    20,
    11,
    5,
    12,
    24,
    5,
    1,
    87,
    22,
    5,
    5,
    41,
    24,
    5,
    7,
    24,
    30,
    11,
    7,
    12,
    24,
    5,
    1,
    98,
    24,
    7,
    3,
    45,
    28,
    15,
    2,
    19,
    24,
    3,
    13,
    15,
    30,
    1,
    5,
    107,
    28,
    10,
    1,
    46,
    28,
    1,
    15,
    22,
    28,
    2,
    17,
    14,
    28,
    5,
    1,
    120,
    30,
    9,
    4,
    43,
    26,
    17,
    1,
    22,
    28,
    2,
    19,
    14,
    28,
    3,
    4,
    113,
    28,
    3,
    11,
    44,
    26,
    17,
    4,
    21,
    26,
    9,
    16,
    13,
    26,
    3,
    5,
    107,
    28,
    3,
    13,
    41,
    26,
    15,
    5,
    24,
    30,
    15,
    10,
    15,
    28,
    4,
    4,
    116,
    28,
    17,
    0,
    42,
    26,
    17,
    6,
    22,
    28,
    19,
    6,
    16,
    30,
    2,
    7,
    111,
    28,
    17,
    0,
    46,
    28,
    7,
    16,
    24,
    30,
    34,
    0,
    13,
    24,
    4,
    5,
    121,
    30,
    4,
    14,
    47,
    28,
    11,
    14,
    24,
    30,
    16,
    14,
    15,
    30,
    6,
    4,
    117,
    30,
    6,
    14,
    45,
    28,
    11,
    16,
    24,
    30,
    30,
    2,
    16,
    30,
    8,
    4,
    106,
    26,
    8,
    13,
    47,
    28,
    7,
    22,
    24,
    30,
    22,
    13,
    15,
    30,
    10,
    2,
    114,
    28,
    19,
    4,
    46,
    28,
    28,
    6,
    22,
    28,
    33,
    4,
    16,
    30,
    8,
    4,
    122,
    30,
    22,
    3,
    45,
    28,
    8,
    26,
    23,
    30,
    12,
    28,
    15,
    30,
    3,
    10,
    117,
    30,
    3,
    23,
    45,
    28,
    4,
    31,
    24,
    30,
    11,
    31,
    15,
    30,
    7,
    7,
    116,
    30,
    21,
    7,
    45,
    28,
    1,
    37,
    23,
    30,
    19,
    26,
    15,
    30,
    5,
    10,
    115,
    30,
    19,
    10,
    47,
    28,
    15,
    25,
    24,
    30,
    23,
    25,
    15,
    30,
    13,
    3,
    115,
    30,
    2,
    29,
    46,
    28,
    42,
    1,
    24,
    30,
    23,
    28,
    15,
    30,
    17,
    0,
    115,
    30,
    10,
    23,
    46,
    28,
    10,
    35,
    24,
    30,
    19,
    35,
    15,
    30,
    17,
    1,
    115,
    30,
    14,
    21,
    46,
    28,
    29,
    19,
    24,
    30,
    11,
    46,
    15,
    30,
    13,
    6,
    115,
    30,
    14,
    23,
    46,
    28,
    44,
    7,
    24,
    30,
    59,
    1,
    16,
    30,
    12,
    7,
    121,
    30,
    12,
    26,
    47,
    28,
    39,
    14,
    24,
    30,
    22,
    41,
    15,
    30,
    6,
    14,
    121,
    30,
    6,
    34,
    47,
    28,
    46,
    10,
    24,
    30,
    2,
    64,
    15,
    30,
    17,
    4,
    122,
    30,
    29,
    14,
    46,
    28,
    49,
    10,
    24,
    30,
    24,
    46,
    15,
    30,
    4,
    18,
    122,
    30,
    13,
    32,
    46,
    28,
    48,
    14,
    24,
    30,
    42,
    32,
    15,
    30,
    20,
    4,
    117,
    30,
    40,
    7,
    47,
    28,
    43,
    22,
    24,
    30,
    10,
    67,
    15,
    30,
    19,
    6,
    118,
    30,
    18,
    31,
    47,
    28,
    34,
    34,
    24,
    30,
    20,
    61,
    15,
    30
  ];
  var ECC_LEVELS = {
    L: 1,
    M: 2,
    Q: 3,
    H: 4
  };
  var FINAL_FORMAT = [
    30660,
    29427,
    32170,
    30877,
    26159,
    25368,
    27713,
    26998,
    21522,
    20773,
    24188,
    23371,
    17913,
    16590,
    20375,
    19104,
    13663,
    12392,
    16177,
    14854,
    9396,
    8579,
    11994,
    11245,
    5769,
    5054,
    7399,
    6608,
    1890,
    597,
    3340,
    2107
  ];
  var GALOIS_EXPONENT = [
    1,
    2,
    4,
    8,
    16,
    32,
    64,
    128,
    29,
    58,
    116,
    232,
    205,
    135,
    19,
    38,
    76,
    152,
    45,
    90,
    180,
    117,
    234,
    201,
    143,
    3,
    6,
    12,
    24,
    48,
    96,
    192,
    157,
    39,
    78,
    156,
    37,
    74,
    148,
    53,
    106,
    212,
    181,
    119,
    238,
    193,
    159,
    35,
    70,
    140,
    5,
    10,
    20,
    40,
    80,
    160,
    93,
    186,
    105,
    210,
    185,
    111,
    222,
    161,
    95,
    190,
    97,
    194,
    153,
    47,
    94,
    188,
    101,
    202,
    137,
    15,
    30,
    60,
    120,
    240,
    253,
    231,
    211,
    187,
    107,
    214,
    177,
    127,
    254,
    225,
    223,
    163,
    91,
    182,
    113,
    226,
    217,
    175,
    67,
    134,
    17,
    34,
    68,
    136,
    13,
    26,
    52,
    104,
    208,
    189,
    103,
    206,
    129,
    31,
    62,
    124,
    248,
    237,
    199,
    147,
    59,
    118,
    236,
    197,
    151,
    51,
    102,
    204,
    133,
    23,
    46,
    92,
    184,
    109,
    218,
    169,
    79,
    158,
    33,
    66,
    132,
    21,
    42,
    84,
    168,
    77,
    154,
    41,
    82,
    164,
    85,
    170,
    73,
    146,
    57,
    114,
    228,
    213,
    183,
    115,
    230,
    209,
    191,
    99,
    198,
    145,
    63,
    126,
    252,
    229,
    215,
    179,
    123,
    246,
    241,
    255,
    227,
    219,
    171,
    75,
    150,
    49,
    98,
    196,
    149,
    55,
    110,
    220,
    165,
    87,
    174,
    65,
    130,
    25,
    50,
    100,
    200,
    141,
    7,
    14,
    28,
    56,
    112,
    224,
    221,
    167,
    83,
    166,
    81,
    162,
    89,
    178,
    121,
    242,
    249,
    239,
    195,
    155,
    43,
    86,
    172,
    69,
    138,
    9,
    18,
    36,
    72,
    144,
    61,
    122,
    244,
    245,
    247,
    243,
    251,
    235,
    203,
    139,
    11,
    22,
    44,
    88,
    176,
    125,
    250,
    233,
    207,
    131,
    27,
    54,
    108,
    216,
    173,
    71,
    142,
    0
  ];
  var GALOIS_LOG = [
    255,
    0,
    1,
    25,
    2,
    50,
    26,
    198,
    3,
    223,
    51,
    238,
    27,
    104,
    199,
    75,
    4,
    100,
    224,
    14,
    52,
    141,
    239,
    129,
    28,
    193,
    105,
    248,
    200,
    8,
    76,
    113,
    5,
    138,
    101,
    47,
    225,
    36,
    15,
    33,
    53,
    147,
    142,
    218,
    240,
    18,
    130,
    69,
    29,
    181,
    194,
    125,
    106,
    39,
    249,
    185,
    201,
    154,
    9,
    120,
    77,
    228,
    114,
    166,
    6,
    191,
    139,
    98,
    102,
    221,
    48,
    253,
    226,
    152,
    37,
    179,
    16,
    145,
    34,
    136,
    54,
    208,
    148,
    206,
    143,
    150,
    219,
    189,
    241,
    210,
    19,
    92,
    131,
    56,
    70,
    64,
    30,
    66,
    182,
    163,
    195,
    72,
    126,
    110,
    107,
    58,
    40,
    84,
    250,
    133,
    186,
    61,
    202,
    94,
    155,
    159,
    10,
    21,
    121,
    43,
    78,
    212,
    229,
    172,
    115,
    243,
    167,
    87,
    7,
    112,
    192,
    247,
    140,
    128,
    99,
    13,
    103,
    74,
    222,
    237,
    49,
    197,
    254,
    24,
    227,
    165,
    153,
    119,
    38,
    184,
    180,
    124,
    17,
    68,
    146,
    217,
    35,
    32,
    137,
    46,
    55,
    63,
    209,
    91,
    149,
    188,
    207,
    205,
    144,
    135,
    151,
    178,
    220,
    252,
    190,
    97,
    242,
    86,
    211,
    171,
    20,
    42,
    93,
    158,
    132,
    60,
    57,
    83,
    71,
    109,
    65,
    162,
    31,
    45,
    67,
    216,
    183,
    123,
    164,
    118,
    196,
    23,
    73,
    236,
    127,
    12,
    111,
    246,
    108,
    161,
    59,
    82,
    41,
    157,
    85,
    170,
    251,
    96,
    134,
    177,
    187,
    204,
    62,
    90,
    203,
    89,
    95,
    176,
    156,
    169,
    160,
    81,
    11,
    245,
    22,
    235,
    122,
    117,
    44,
    215,
    79,
    174,
    213,
    233,
    230,
    231,
    173,
    232,
    116,
    214,
    244,
    234,
    168,
    80,
    88,
    175
  ];
  var N1 = 3;
  var N2 = 3;
  var N3 = 40;
  var N4 = 10;
  var VERSION_BLOCK = [
    3220,
    1468,
    2713,
    1235,
    3062,
    1890,
    2119,
    1549,
    2344,
    2936,
    1117,
    2583,
    1330,
    2470,
    1667,
    2249,
    2028,
    3780,
    481,
    4011,
    142,
    3098,
    831,
    3445,
    592,
    2517,
    1776,
    2234,
    1951,
    2827,
    1070,
    2660,
    1345,
    3177
  ];
  function generateFrame(_str, ecc) {
    var i2, j, k, m, t, v, x, y, version, eccLevel = ECC_LEVELS[ecc || "L"] || 1, str = _str || "", width;
    var badBuffer = [];
    var dataBlock;
    var eccBlock, neccBlock1, neccBlock2;
    var eccBuffer = [];
    var frameBuffer = [];
    var frameMask = [];
    var polynomial = [];
    var stringBuffer = [];
    function setMask(_x, _y) {
      var bit, x2 = _x, y2 = _y;
      if (x2 > y2) {
        bit = x2;
        x2 = y2;
        y2 = bit;
      }
      bit = y2;
      bit *= y2;
      bit += y2;
      bit >>= 1;
      bit += x2;
      frameMask[bit] = 1;
    }
    function addAlignment(_x, _y) {
      var i22, x2 = _x, y2 = _y;
      frameBuffer[x2 + width * y2] = 1;
      for (i22 = -2; i22 < 2; i22++) {
        frameBuffer[x2 + i22 + width * (y2 - 2)] = 1;
        frameBuffer[x2 - 2 + width * (y2 + i22 + 1)] = 1;
        frameBuffer[x2 + 2 + width * (y2 + i22)] = 1;
        frameBuffer[x2 + i22 + 1 + width * (y2 + 2)] = 1;
      }
      for (i22 = 0; i22 < 2; i22++) {
        setMask(x2 - 1, y2 + i22);
        setMask(x2 + 1, y2 - i22);
        setMask(x2 - i22, y2 - 1);
        setMask(x2 + i22, y2 + 1);
      }
    }
    function modN(_x) {
      var x2 = _x;
      while (x2 >= 255) {
        x2 -= 255;
        x2 = (x2 >> 8) + (x2 & 255);
      }
      return x2;
    }
    function appendData(_data, _dataLength, _ecc, _eccLength) {
      var bit, i22, j2, data = _data, dataLength = _dataLength, ecc2 = _ecc, eccLength = _eccLength;
      for (i22 = 0; i22 < eccLength; i22++) {
        stringBuffer[ecc2 + i22] = 0;
      }
      for (i22 = 0; i22 < dataLength; i22++) {
        bit = GALOIS_LOG[stringBuffer[data + i22] ^ stringBuffer[ecc2]];
        if (bit !== 255) {
          for (j2 = 1; j2 < eccLength; j2++) {
            stringBuffer[ecc2 + j2 - 1] = stringBuffer[ecc2 + j2] ^ GALOIS_EXPONENT[modN(bit + polynomial[eccLength - j2])];
          }
        } else {
          for (j2 = ecc2; j2 < ecc2 + eccLength; j2++) {
            stringBuffer[j2] = stringBuffer[j2 + 1];
          }
        }
        stringBuffer[ecc2 + eccLength - 1] = bit === 255 ? 0 : GALOIS_EXPONENT[modN(bit + polynomial[0])];
      }
    }
    function isMasked(_x, _y) {
      var bit, x2 = _x, y2 = _y;
      if (x2 > y2) {
        bit = x2;
        x2 = y2;
        y2 = bit;
      }
      bit = y2;
      bit += y2 * y2;
      bit >>= 1;
      bit += x2;
      return frameMask[bit] === 1;
    }
    function applyMask(_mask) {
      var x2, y2, r3x, r3y, mask = _mask;
      if (mask === 0)
        for (y2 = 0; y2 < width; y2++) {
          for (x2 = 0; x2 < width; x2++) {
            if (!(x2 + y2 & 1) && !isMasked(x2, y2)) {
              frameBuffer[x2 + y2 * width] ^= 1;
            }
          }
        }
      if (mask === 1)
        for (y2 = 0; y2 < width; y2++) {
          for (x2 = 0; x2 < width; x2++) {
            if (!(y2 & 1) && !isMasked(x2, y2)) {
              frameBuffer[x2 + y2 * width] ^= 1;
            }
          }
        }
      if (mask === 2)
        for (y2 = 0; y2 < width; y2++) {
          for (r3x = 0, x2 = 0; x2 < width; x2++, r3x++) {
            if (r3x === 3)
              r3x = 0;
            if (!r3x && !isMasked(x2, y2)) {
              frameBuffer[x2 + y2 * width] ^= 1;
            }
          }
        }
      if (mask === 3)
        for (r3y = 0, y2 = 0; y2 < width; y2++, r3y++) {
          if (r3y === 3)
            r3y = 0;
          for (r3x = r3y, x2 = 0; x2 < width; x2++, r3x++) {
            if (r3x === 3)
              r3x = 0;
            if (!r3x && !isMasked(x2, y2)) {
              frameBuffer[x2 + y2 * width] ^= 1;
            }
          }
        }
      if (mask === 4)
        for (y2 = 0; y2 < width; y2++) {
          for (r3x = 0, r3y = y2 >> 1 & 1, x2 = 0; x2 < width; x2++, r3x++) {
            if (r3x === 3) {
              r3x = 0;
              r3y = !r3y;
            }
            if (!r3y && !isMasked(x2, y2)) {
              frameBuffer[x2 + y2 * width] ^= 1;
            }
          }
        }
      if (mask === 5)
        for (r3y = 0, y2 = 0; y2 < width; y2++, r3y++) {
          if (r3y === 3)
            r3y = 0;
          for (r3x = 0, x2 = 0; x2 < width; x2++, r3x++) {
            if (r3x === 3)
              r3x = 0;
            if (!((x2 & y2 & 1) + !(!r3x | !r3y)) && !isMasked(x2, y2)) {
              frameBuffer[x2 + y2 * width] ^= 1;
            }
          }
        }
      if (mask === 6)
        for (r3y = 0, y2 = 0; y2 < width; y2++, r3y++) {
          if (r3y === 3)
            r3y = 0;
          for (r3x = 0, x2 = 0; x2 < width; x2++, r3x++) {
            if (r3x === 3)
              r3x = 0;
            if (!((x2 & y2 & 1) + (r3x && r3x === r3y) & 1) && !isMasked(x2, y2)) {
              frameBuffer[x2 + y2 * width] ^= 1;
            }
          }
        }
      if (mask === 7)
        for (r3y = 0, y2 = 0; y2 < width; y2++, r3y++) {
          if (r3y === 3)
            r3y = 0;
          for (r3x = 0, x2 = 0; x2 < width; x2++, r3x++) {
            if (r3x === 3)
              r3x = 0;
            if (!((r3x && r3x === r3y) + (x2 + y2 & 1) & 1) && !isMasked(x2, y2)) {
              frameBuffer[x2 + y2 * width] ^= 1;
            }
          }
        }
    }
    function getBadRuns(_length) {
      var badRuns = 0;
      var i22;
      var length = _length;
      for (i22 = 0; i22 <= length; i22++) {
        if (badBuffer[i22] >= 5) {
          badRuns += N1 + badBuffer[i22] - 5;
        }
      }
      for (i22 = 3; i22 < length - 1; i22 += 2) {
        if (badBuffer[i22 - 2] === badBuffer[i22 + 2] && badBuffer[i22 + 2] === badBuffer[i22 - 1] && badBuffer[i22 - 1] === badBuffer[i22 + 1] && badBuffer[i22 - 1] * 3 === badBuffer[i22] && (badBuffer[i22 - 3] === 0 || i22 + 3 > length || badBuffer[i22 - 3] * 3 >= badBuffer[i22] * 4 || badBuffer[i22 + 3] * 3 >= badBuffer[i22] * 4)) {
          badRuns += N3;
        }
      }
      return badRuns;
    }
    function checkBadness() {
      var b, b1, bad, big, bw, count, h, x2, y2;
      bad = bw = count = 0;
      for (y2 = 0; y2 < width - 1; y2++) {
        for (x2 = 0; x2 < width - 1; x2++) {
          if (frameBuffer[x2 + width * y2] && frameBuffer[x2 + 1 + width * y2] && frameBuffer[x2 + width * (y2 + 1)] && frameBuffer[x2 + 1 + width * (y2 + 1)] || !(frameBuffer[x2 + width * y2] || frameBuffer[x2 + 1 + width * y2] || frameBuffer[x2 + width * (y2 + 1)] || frameBuffer[x2 + 1 + width * (y2 + 1)])) {
            bad += N2;
          }
        }
      }
      for (y2 = 0; y2 < width; y2++) {
        badBuffer[0] = 0;
        for (h = b = x2 = 0; x2 < width; x2++) {
          if ((b1 = frameBuffer[x2 + width * y2]) === b) {
            badBuffer[h]++;
          } else {
            badBuffer[++h] = 1;
          }
          b = b1;
          bw += b ? 1 : -1;
        }
        bad += getBadRuns(h);
      }
      if (bw < 0)
        bw = -bw;
      big = bw;
      big += big << 2;
      big <<= 1;
      while (big > width * width) {
        big -= width * width;
        count++;
      }
      bad += count * N4;
      for (x2 = 0; x2 < width; x2++) {
        badBuffer[0] = 0;
        for (h = b = y2 = 0; y2 < width; y2++) {
          if ((b1 = frameBuffer[x2 + width * y2]) === b) {
            badBuffer[h]++;
          } else {
            badBuffer[++h] = 1;
          }
          b = b1;
        }
        bad += getBadRuns(h);
      }
      return bad;
    }
    function toUtf8(str2) {
      var out, i22, len, c;
      out = "";
      len = str2.length;
      for (i22 = 0; i22 < len; i22++) {
        c = str2.charCodeAt(i22);
        if (c >= 1 && c <= 127) {
          out += str2.charAt(i22);
        } else if (c > 2047) {
          out += String.fromCharCode(224 | c >> 12 & 15);
          out += String.fromCharCode(128 | c >> 6 & 63);
          out += String.fromCharCode(128 | c >> 0 & 63);
        } else {
          out += String.fromCharCode(192 | c >> 6 & 31);
          out += String.fromCharCode(128 | c >> 0 & 63);
        }
      }
      return out;
    }
    str = toUtf8(str);
    t = str.length;
    version = 0;
    do {
      version++;
      k = (eccLevel - 1) * 4 + (version - 1) * 16;
      neccBlock1 = ECC_BLOCKS[k++];
      neccBlock2 = ECC_BLOCKS[k++];
      dataBlock = ECC_BLOCKS[k++];
      eccBlock = ECC_BLOCKS[k];
      k = dataBlock * (neccBlock1 + neccBlock2) + neccBlock2 - 3 + (version <= 9);
      if (t <= k)
        break;
    } while (version < 40);
    width = 17 + 4 * version;
    v = dataBlock + (dataBlock + eccBlock) * (neccBlock1 + neccBlock2) + neccBlock2;
    for (t = 0; t < v; t++) {
      eccBuffer[t] = 0;
    }
    stringBuffer = str.slice(0);
    for (t = 0; t < width * width; t++) {
      frameBuffer[t] = 0;
    }
    for (t = 0; t < (width * (width + 1) + 1) / 2; t++) {
      frameMask[t] = 0;
    }
    for (t = 0; t < 3; t++) {
      k = y = 0;
      if (t === 1)
        k = width - 7;
      if (t === 2)
        y = width - 7;
      frameBuffer[y + 3 + width * (k + 3)] = 1;
      for (x = 0; x < 6; x++) {
        frameBuffer[y + x + width * k] = 1;
        frameBuffer[y + width * (k + x + 1)] = 1;
        frameBuffer[y + 6 + width * (k + x)] = 1;
        frameBuffer[y + x + 1 + width * (k + 6)] = 1;
      }
      for (x = 1; x < 5; x++) {
        setMask(y + x, k + 1);
        setMask(y + 1, k + x + 1);
        setMask(y + 5, k + x);
        setMask(y + x + 1, k + 5);
      }
      for (x = 2; x < 4; x++) {
        frameBuffer[y + x + width * (k + 2)] = 1;
        frameBuffer[y + 2 + width * (k + x + 1)] = 1;
        frameBuffer[y + 4 + width * (k + x)] = 1;
        frameBuffer[y + x + 1 + width * (k + 4)] = 1;
      }
    }
    if (version > 1) {
      t = ALIGNMENT_DELTA[version];
      y = width - 7;
      for (; ; ) {
        x = width - 7;
        while (x > t - 3) {
          addAlignment(x, y);
          if (x < t)
            break;
          x -= t;
        }
        if (y <= t + 9)
          break;
        y -= t;
        addAlignment(6, y);
        addAlignment(y, 6);
      }
    }
    frameBuffer[8 + width * (width - 8)] = 1;
    for (y = 0; y < 7; y++) {
      setMask(7, y);
      setMask(width - 8, y);
      setMask(7, y + width - 7);
    }
    for (x = 0; x < 8; x++) {
      setMask(x, 7);
      setMask(x + width - 8, 7);
      setMask(x, width - 8);
    }
    for (x = 0; x < 9; x++) {
      setMask(x, 8);
    }
    for (x = 0; x < 8; x++) {
      setMask(x + width - 8, 8);
      setMask(8, x);
    }
    for (y = 0; y < 7; y++) {
      setMask(8, y + width - 7);
    }
    for (x = 0; x < width - 14; x++) {
      if (x & 1) {
        setMask(8 + x, 6);
        setMask(6, 8 + x);
      } else {
        frameBuffer[8 + x + width * 6] = 1;
        frameBuffer[6 + width * (8 + x)] = 1;
      }
    }
    if (version > 6) {
      t = VERSION_BLOCK[version - 7];
      k = 17;
      for (x = 0; x < 6; x++) {
        for (y = 0; y < 3; y++, k--) {
          if (1 & (k > 11 ? version >> k - 12 : t >> k)) {
            frameBuffer[5 - x + width * (2 - y + width - 11)] = 1;
            frameBuffer[2 - y + width - 11 + width * (5 - x)] = 1;
          } else {
            setMask(5 - x, 2 - y + width - 11);
            setMask(2 - y + width - 11, 5 - x);
          }
        }
      }
    }
    for (y = 0; y < width; y++) {
      for (x = 0; x <= y; x++) {
        if (frameBuffer[x + width * y]) {
          setMask(x, y);
        }
      }
    }
    v = stringBuffer.length;
    for (i2 = 0; i2 < v; i2++) {
      eccBuffer[i2] = stringBuffer.charCodeAt(i2);
    }
    stringBuffer = eccBuffer.slice(0);
    x = dataBlock * (neccBlock1 + neccBlock2) + neccBlock2;
    if (v >= x - 2) {
      v = x - 2;
      if (version > 9)
        v--;
    }
    i2 = v;
    if (version > 9) {
      stringBuffer[i2 + 2] = 0;
      stringBuffer[i2 + 3] = 0;
      while (i2--) {
        t = stringBuffer[i2];
        stringBuffer[i2 + 3] |= 255 & t << 4;
        stringBuffer[i2 + 2] = t >> 4;
      }
      stringBuffer[2] |= 255 & v << 4;
      stringBuffer[1] = v >> 4;
      stringBuffer[0] = 64 | v >> 12;
    } else {
      stringBuffer[i2 + 1] = 0;
      stringBuffer[i2 + 2] = 0;
      while (i2--) {
        t = stringBuffer[i2];
        stringBuffer[i2 + 2] |= 255 & t << 4;
        stringBuffer[i2 + 1] = t >> 4;
      }
      stringBuffer[1] |= 255 & v << 4;
      stringBuffer[0] = 64 | v >> 4;
    }
    i2 = v + 3 - (version < 10);
    while (i2 < x) {
      stringBuffer[i2++] = 236;
      stringBuffer[i2++] = 17;
    }
    polynomial[0] = 1;
    for (i2 = 0; i2 < eccBlock; i2++) {
      polynomial[i2 + 1] = 1;
      for (j = i2; j > 0; j--) {
        polynomial[j] = polynomial[j] ? polynomial[j - 1] ^ GALOIS_EXPONENT[modN(GALOIS_LOG[polynomial[j]] + i2)] : polynomial[j - 1];
      }
      polynomial[0] = GALOIS_EXPONENT[modN(GALOIS_LOG[polynomial[0]] + i2)];
    }
    for (i2 = 0; i2 <= eccBlock; i2++) {
      polynomial[i2] = GALOIS_LOG[polynomial[i2]];
    }
    k = x;
    y = 0;
    for (i2 = 0; i2 < neccBlock1; i2++) {
      appendData(y, dataBlock, k, eccBlock);
      y += dataBlock;
      k += eccBlock;
    }
    for (i2 = 0; i2 < neccBlock2; i2++) {
      appendData(y, dataBlock + 1, k, eccBlock);
      y += dataBlock + 1;
      k += eccBlock;
    }
    y = 0;
    for (i2 = 0; i2 < dataBlock; i2++) {
      for (j = 0; j < neccBlock1; j++) {
        eccBuffer[y++] = stringBuffer[i2 + j * dataBlock];
      }
      for (j = 0; j < neccBlock2; j++) {
        eccBuffer[y++] = stringBuffer[neccBlock1 * dataBlock + i2 + j * (dataBlock + 1)];
      }
    }
    for (j = 0; j < neccBlock2; j++) {
      eccBuffer[y++] = stringBuffer[neccBlock1 * dataBlock + i2 + j * (dataBlock + 1)];
    }
    for (i2 = 0; i2 < eccBlock; i2++) {
      for (j = 0; j < neccBlock1 + neccBlock2; j++) {
        eccBuffer[y++] = stringBuffer[x + i2 + j * eccBlock];
      }
    }
    stringBuffer = eccBuffer;
    x = y = width - 1;
    k = v = 1;
    m = (dataBlock + eccBlock) * (neccBlock1 + neccBlock2) + neccBlock2;
    for (i2 = 0; i2 < m; i2++) {
      t = stringBuffer[i2];
      for (j = 0; j < 8; j++, t <<= 1) {
        if (128 & t) {
          frameBuffer[x + width * y] = 1;
        }
        do {
          if (v) {
            x--;
          } else {
            x++;
            if (k) {
              if (y !== 0) {
                y--;
              } else {
                x -= 2;
                k = !k;
                if (x === 6) {
                  x--;
                  y = 9;
                }
              }
            } else {
              if (y !== width - 1) {
                y++;
              } else {
                x -= 2;
                k = !k;
                if (x === 6) {
                  x--;
                  y -= 8;
                }
              }
            }
          }
          v = !v;
        } while (isMasked(x, y));
      }
    }
    stringBuffer = frameBuffer.slice(0);
    t = 0;
    y = 3e4;
    for (k = 0; k < 8; k++) {
      applyMask(k);
      x = checkBadness();
      if (x < y) {
        y = x;
        t = k;
      }
      if (t === 7)
        break;
      frameBuffer = stringBuffer.slice(0);
    }
    if (t !== k) {
      applyMask(t);
    }
    y = FINAL_FORMAT[t + (eccLevel - 1 << 3)];
    for (k = 0; k < 8; k++, y >>= 1) {
      if (y & 1) {
        frameBuffer[width - 1 - k + width * 8] = 1;
        if (k < 6) {
          frameBuffer[8 + width * k] = 1;
        } else {
          frameBuffer[8 + width * (k + 1)] = 1;
        }
      }
    }
    for (k = 0; k < 7; k++, y >>= 1) {
      if (y & 1) {
        frameBuffer[8 + width * (width - 7 + k)] = 1;
        if (k) {
          frameBuffer[6 - k + width * 8] = 1;
        } else {
          frameBuffer[7 + width * 8] = 1;
        }
      }
    }
    return {
      frameBuffer,
      width
    };
  }
  function computeLogoPos(size, lw, lh) {
    return {
      x: (size - lw) / 2,
      y: (size - lh) / 2,
      w: lw,
      h: lh
    };
  }
  function qr(ctx, option, canvas2d) {
    return __async(this, null, function* () {
      if (!ctx)
        return;
      var defaults = Object.assign(__spreadValues9({}, qrOptsDefault), option), size = defaults.size, borderWidth = size * defaults.border, qrSize = size - borderWidth * 2, backgroundColor = defaults.backgroundColor, backgroundImage = defaults.backgroundImage, logoImage = defaults.logoImage, i2, j, points, width, fo, px, logoPos, linearDir = defaults.linearDir;
      var c2d = ctx;
      if (!(c2d == null ? void 0 : c2d.width)) {
        c2d.width = size;
      }
      if (!(c2d == null ? void 0 : c2d.height)) {
        c2d.height = size;
      }
      fillStyle(c2d, defaults.baseColor, linearDir);
      c2d.fillRect(0, 0, size, size);
      c2d.save();
      if (backgroundColor) {
        fillStyle(c2d, backgroundColor, linearDir);
        c2d.fillRect(0, 0, size, size);
      }
      c2d.restore();
      if (backgroundImage) {
        if (canvas2d) {
          yield drawImage(canvas2d, c2d, { width: size, height: size, src: backgroundImage, x: 0, y: 0 });
        } else {
          c2d.drawImage(backgroundImage, 0, 0, size, size);
        }
      }
      fo = generateFrame(defaults.str, defaults.ecc);
      points = fo.frameBuffer;
      width = fo.width;
      px = qrSize / width;
      fillStyle(c2d, defaults.forgroundColor, linearDir);
      for (i2 = 0; i2 < width; i2++) {
        for (j = 0; j < width; j++) {
          if (points[j * width + i2]) {
            c2d.fillRect(borderWidth + px * i2, borderWidth + px * j, px, px);
          }
        }
      }
      if (logoImage) {
        logoPos = computeLogoPos(size, defaults.logoWidth, defaults.logoHeight);
        if (canvas2d) {
          yield drawImage(canvas2d, c2d, { width: defaults.logoWidth, height: defaults.logoHeight, src: logoImage, x: logoPos.x, y: logoPos.y });
        } else {
          c2d.drawImage(logoImage, logoPos.x, logoPos.y, defaults.logoWidth, defaults.logoHeight);
        }
      }
      if (!canvas2d) {
        c2d.draw();
      }
      uni.hideLoading();
      return ctx;
    });
  }
  function fillStyle(ctx, value, linearDir = "left") {
    if (typeof value == "object" && Array.isArray(value)) {
      let w2w = parseInt(String(ctx.width / 2));
      formatAppLog("log", "at tmui/components/tm-qrcode/drawing.ts:125", w2w);
      var gradient = ctx.createLinearGradient(w2w, 0, w2w, ctx.width);
      if (linearDir == "left") {
        gradient = ctx.createLinearGradient(ctx.width, w2w, 0, w2w);
      } else if (linearDir == "bottom") {
        gradient = ctx.createLinearGradient(w2w, 0, w2w, ctx.width);
      } else if (linearDir == "top") {
        gradient = ctx.createLinearGradient(w2w, ctx.width, w2w, 0);
      } else if (linearDir == "right") {
        gradient = ctx.createLinearGradient(0, w2w, ctx.width, w2w);
      } else if (linearDir == "tlbr") {
        gradient = ctx.createLinearGradient(0, 0, ctx.width, ctx.width);
      } else if (linearDir == "trbl") {
        gradient = ctx.createLinearGradient(ctx.width, 0, 0, ctx.width);
      } else if (linearDir == "bltr") {
        gradient = ctx.createLinearGradient(0, ctx.width, ctx.width, 0);
      } else if (linearDir == "brtl") {
        gradient = ctx.createLinearGradient(ctx.width, ctx.width, 0, 0);
      }
      for (let i2 = 0, len = value.length; i2 < len; i2++) {
        let stop = i2 / len;
        if (i2 == 0)
          stop = 0;
        if (i2 == len - 1)
          stop = 1;
        gradient.addColorStop(stop, value[i2]);
      }
      formatAppLog("log", "at tmui/components/tm-qrcode/drawing.ts:150", gradient);
      ctx.strokeStyle = gradient;
      ctx.fillStyle = gradient;
    } else {
      ctx.fillStyle = value;
    }
  }
  function drawImage(canvas2d, ctx, opts) {
    uni.showLoading({
      title: "..."
    });
    let img = canvas2d.createImage();
    img.width = opts.width;
    img.height = opts.height;
    img.src = opts.src;
    return new Promise((res) => {
      img.onload = function() {
        ctx.drawImage(img, opts.x, opts.y, opts.width, opts.height);
        uni.hideLoading();
        res(true);
      };
    });
  }
  var _sfc_main$13 = /* @__PURE__ */ (0, import_vue9.defineComponent)({
    __name: "tm-qrcode",
    props: {
      option: {
        type: Object,
        default: () => {
          return qrOptsDefault;
        }
      }
    },
    setup(__props, { expose }) {
      var _a2, _b2;
      const props = __props;
      const proxy = (_b2 = (_a2 = (0, import_vue9.getCurrentInstance)()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const vnodeCtx = proxy;
      const canvasId = (0, import_vue9.ref)("canvasId");
      canvasId.value = "tm" + uni.$tm.u.getUid(5);
      let ctx;
      let canvas2d;
      let opts = (0, import_vue9.computed)(() => {
        return __spreadValues9(__spreadValues9({}, qrOptsDefault), props.option);
      });
      const _width = (0, import_vue9.computed)(() => opts.value.size);
      const _height = (0, import_vue9.computed)(() => opts.value.size);
      const show = (0, import_vue9.ref)(false);
      let isAndroid = false;
      isAndroid = uni.getSystemInfoSync().osName == "android";
      (0, import_vue9.onMounted)(() => {
        (0, import_vue9.nextTick)(function() {
          return __async(this, null, function* () {
            if (isAndroid) {
              setTimeout(() => {
                show.value = true;
                init().then(() => qr(ctx, __spreadProps9(__spreadValues9({}, opts.value), { size: uni.upx2px(_width.value) }), canvas2d));
                setTimeout(function() {
                  init().then(() => qr(ctx, __spreadProps9(__spreadValues9({}, opts.value), { size: uni.upx2px(_width.value) }), canvas2d));
                }, 50);
              }, 200);
            } else {
              show.value = true;
              init().then(() => qr(ctx, __spreadProps9(__spreadValues9({}, opts.value), { size: uni.upx2px(_width.value) }), canvas2d));
            }
          });
        });
      });
      (0, import_vue9.watch)(() => props.option, () => {
        if (!ctx)
          ;
        else {
          qr(ctx, __spreadProps9(__spreadValues9({}, opts.value), { size: uni.upx2px(_width.value) }), canvas2d);
        }
      }, { deep: true });
      function init() {
        return new Promise((res, rej) => {
          setTimeout(function() {
            return __async(this, null, function* () {
              ctx = yield drawNvue_init();
              res(true);
            });
          }, 150);
        });
      }
      function drawNvue_init() {
        var ganvas = vnodeCtx.$refs[canvasId.value];
        var canvasObj = enable(ganvas, {
          bridge: WeexBridge
        });
        return canvasObj.getContext("2d");
      }
      function save() {
        return new Promise((su, fa) => {
          var _a22;
          if (!ctx) {
            uni.showToast({ title: "\u521D\u59CB\u5316\u5931\u8D25", icon: "none" });
            fa("\u521D\u59CB\u5316\u5931\u8D25");
            return;
          }
          let size = (_a22 = props.option.size) != null ? _a22 : 0;
          uni.showLoading({ title: "..." });
          ctx.toTempFilePath(0, 0, size, size, uni.upx2px(size), uni.upx2px(size), "png", 1, function(res) {
            uni.hideLoading();
            formatAppLog("log", "at tmui/components/tm-qrcode/tm-qrcode.vue:185", res.errMsg);
            if (res.errMsg == "canvasToTempFilePath:ok") {
              su(res.tempFilePath);
            } else {
              fa(res.errMsg);
            }
          });
        });
      }
      expose({ save });
      return (_ctx, _cache) => {
        return (0, import_vue9.openBlock)(), (0, import_vue9.createElementBlock)("view", {
          style: (0, import_vue9.normalizeStyle)({ width: `${(0, import_vue9.unref)(_width)}rpx`, height: `${(0, import_vue9.unref)(_height)}rpx` }),
          renderWhole: true
        }, [
          show.value ? ((0, import_vue9.openBlock)(), (0, import_vue9.createElementBlock)("gcanvas", {
            key: 0,
            id: canvasId.value,
            ref: canvasId.value,
            class: "canvas",
            style: (0, import_vue9.normalizeStyle)({ width: `${(0, import_vue9.unref)(_width)}rpx`, height: `${(0, import_vue9.unref)(_height)}rpx` })
          }, null, 12, ["id"])) : (0, import_vue9.createCommentVNode)("v-if", true)
        ], 4);
      };
    }
  });
  var tmQrcode = /* @__PURE__ */ _export_sfc(_sfc_main$13, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-qrcode/tm-qrcode.vue"]]);
  var _sfc_main9 = /* @__PURE__ */ (0, import_vue9.defineComponent)({
    __name: "qrcode",
    setup(__props) {
      const str = (0, import_vue9.ref)("\u6211\u7231\u4F60tmui.design");
      const cfig = (0, import_vue9.ref)({ str: str.value });
      const vsd = (0, import_vue9.ref)("0");
      function change(e) {
        let type = Number(e);
        if (type === 0) {
          cfig.value = { baseColor: "#FFFFFF", forgroundColor: "#000000", str: str.value };
        } else if (type === 1) {
          cfig.value = { baseColor: "#FFFFFF", forgroundColor: "#FF0000", str: str.value };
        } else if (type === 2) {
          cfig.value = { baseColor: "#FFFFFF", forgroundColor: ["#FF0000", "#FFFF00"], str: str.value };
        } else if (type === 3) {
          cfig.value = { baseColor: ["#FF0000", "#FFFF00"], forgroundColor: "#000000", str: str.value };
        } else if (type === 4) {
          cfig.value = { logoImage: "https://cdn.tmui.design/public/design/logoCir.png", str: str.value, logoWidth: 30, logoHeight: 30 };
        } else if (type === 5) {
          cfig.value = { border: 0.1, str };
        } else if (type === 6) {
          cfig.value = { forgroundColor: "#FFFFFF", str, backgroundImage: "https://cdn.tmui.design/public/echart/qrbg.jpg" };
        }
      }
      function changeStr() {
        cfig.value = { baseColor: "#FFFFFF", forgroundColor: "#000000", str: str.value };
        vsd.value = "0";
      }
      return (_ctx, _cache) => {
        return (0, import_vue9.openBlock)(), (0, import_vue9.createElementBlock)("scroll-view", {
          scrollY: true,
          showScrollbar: true,
          enableBackToTop: true,
          bubble: "true",
          style: { flexDirection: "column" }
        }, [
          (0, import_vue9.createVNode)(tmApp, null, {
            default: (0, import_vue9.withCtx)(() => [
              (0, import_vue9.createVNode)(tmSheet, { _class: "flex-col" }, {
                default: (0, import_vue9.withCtx)(() => [
                  (0, import_vue9.createVNode)(tmText, {
                    "font-size": 30,
                    _class: "font-weight-b",
                    label: "\u57FA\u7840\u793A\u4F8B,\u66F4\u591A\u73A9\u6CD5\u89C1\u6587\u6863"
                  }),
                  (0, import_vue9.createVNode)(tmDivider),
                  (0, import_vue9.createVNode)(tmInput, {
                    border: 1,
                    modelValue: str.value,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => str.value = $event),
                    onSearch: changeStr,
                    searchLabel: "\u751F\u6210"
                  }, null, 8, ["modelValue"]),
                  (0, import_vue9.createVNode)(tmDivider),
                  (0, import_vue9.createVNode)(tmRadioGroup, {
                    modelValue: vsd.value,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => vsd.value = $event),
                    defaultValue: "0",
                    onChange: change
                  }, {
                    default: (0, import_vue9.withCtx)(() => [
                      (0, import_vue9.createVNode)(tmRadio, {
                        value: "0",
                        label: "\u57FA\u7840"
                      }),
                      (0, import_vue9.createVNode)(tmRadio, {
                        value: "1",
                        label: "\u7EA2\u7801"
                      }),
                      (0, import_vue9.createVNode)(tmRadio, {
                        value: "2",
                        label: "\u6E10\u53D8"
                      }),
                      (0, import_vue9.createVNode)(tmRadio, {
                        value: "3",
                        label: "\u5F69\u8272\u80CC\u666F"
                      }),
                      (0, import_vue9.createVNode)(tmRadio, {
                        value: "4",
                        label: "\u52A0logo"
                      }),
                      (0, import_vue9.createVNode)(tmRadio, {
                        value: "5",
                        label: "\u6539\u53D8\u8FB9\u8DDD"
                      }),
                      (0, import_vue9.createVNode)(tmRadio, {
                        value: "6",
                        label: "\u80CC\u666F\u56FE"
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue"]),
                  (0, import_vue9.createVNode)(tmDivider),
                  (0, import_vue9.createVNode)(tmQrcode, { option: cfig.value }, null, 8, ["option"])
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
  var qrcode = /* @__PURE__ */ _export_sfc(_sfc_main9, [["__file", "F:/CoinQT/CoinQT_app/pages/showdata/qrcode.nvue"]]);

  // <stdin>
  var webview = plus.webview.currentWebview();
  if (webview) {
    const __pageId = parseInt(webview.id);
    const __pagePath = "pages/showdata/qrcode";
    let __pageQuery = {};
    try {
      __pageQuery = JSON.parse(webview.__query__);
    } catch (e) {
    }
    qrcode.mpType = "page";
    const app = Vue.createPageApp(qrcode, { $store: getApp({ allowDefault: true }).$store, __pageId, __pagePath, __pageQuery });
    app.provide("__globalStyles", Vue.useCssStyles([...__uniConfig.styles, ...qrcode.styles || []]));
    app.mount("#root");
  }
})();
