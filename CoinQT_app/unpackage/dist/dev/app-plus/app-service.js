var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then((value) => promise.resolve(callback()).then(() => value), (reason) => promise.resolve(callback()).then(() => {
      throw reason;
    }));
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
(function(vue, shared) {
  var _a, _b, _c;
  "use strict";
  const ON_LOAD = "onLoad";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom2) {
    return shared.isString(component) ? easycom2 : component;
  }
  const createHook = (lifecycle) => (hook, target = vue.getCurrentInstance()) => {
    !vue.isInSSRComponentSetup && vue.injectHook(lifecycle, hook, target);
  };
  const onLoad = /* @__PURE__ */ createHook(ON_LOAD);
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
  const theme = {};
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
  class themeColors {
    constructor(c = colors) {
      this.colors = [];
      this.colors = c;
    }
    hasColors(colorName = "") {
      let isHand = this.colors.filter(function(el, index) {
        return el.name == colorName;
      });
      return isHand.length > 0;
    }
    add(colorName = "", value = "") {
      let isHand = this.colors.filter(function(el, index) {
        return el.name == colorName;
      });
      if (isHand.length > 0) {
        return this.colors;
      }
      if (!value) {
        formatAppLog("error", "at tmui/tool/theme/theme.ts:106", "\u989C\u8272\u503C\u5FC5\u586B!!!");
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
        formatAppLog("error", "at tmui/tool/theme/theme.ts:130", "\u5220\u9664\u5931\u8D25\uFF0C\u4E3B\u9898\u4E2D\u4E0D\u5B58\u5728\u76F8\u5173\u540D\u79F0\u7684\u4E3B\u9898\u3002");
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
        formatAppLog("error", "at tmui/tool/theme/theme.ts:144", "\u4E3B\u9898\u4E2D\u4E0D\u5B58\u5728\u76F8\u5173\u540D\u79F0\u7684\u4E3B\u9898\u3002");
      }
      return this.colors[isHand];
    }
    getTheme(config2 = { colorname: "primary", dark: false }) {
      if (!config2["colorname"]) {
        formatAppLog("error", "at tmui/tool/theme/theme.ts:152", "\u989C\u8272\u540D\u79F0\u5FC5\u586B");
        config2.colorname = "primary";
      }
      let index = this.colors.findIndex((el) => el.name == config2.colorname);
      if (index == -1) {
        formatAppLog("error", "at tmui/tool/theme/theme.ts:157", "\u4E3B\u9898\u4E0D\u5B58\u5728\uFF0C\u9ED8\u8BA4\u4E3Aprimary");
        config2.colorname = "primary";
      }
      let isBlack = false;
      let isWhite = false;
      let isBlackAndWhite = false;
      let isGrey = false;
      let isDarkColor = false;
      let nowColor = __spreadValues({}, this.colors[index]);
      config2.borderWidth = isNaN(parseInt(String(config2["borderWidth"]))) ? 0 : config2["borderWidth"];
      config2.borderStyle = config2["borderStyle"] ? config2["borderStyle"] : "solid";
      config2.borderDirection = config2["borderDirection"] || cssDirection.all;
      config2.linearDirection = config2["linearDirection"] || linearDirection.none;
      config2.linearDeep = config2["linearDeep"] || linearDeep.light;
      config2.shadow = isNaN(parseInt(String(config2["shadow"]))) ? 6 : config2["shadow"];
      config2.round = isNaN(parseInt(String(config2["round"]))) ? 4 : config2["round"];
      config2.opaticy = isNaN(parseInt(String(config2["opaticy"]))) ? 1 : config2["opaticy"];
      config2.outlined = typeof config2["outlined"] == "boolean" ? config2["outlined"] : false;
      config2.text = typeof config2["text"] == "boolean" ? config2["text"] : false;
      config2.blur = typeof config2["blur"] == "boolean" ? config2["blur"] : false;
      function isDarkColorFun(r, g, b) {
        const yiq = (r * 2126 + g * 7152 + b * 722) / 1e4;
        return yiq < 180;
      }
      isDarkColor = isDarkColorFun(nowColor.rgba.r, nowColor.rgba.g, nowColor.rgba.b);
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
      css.config = __spreadValues({}, config2);
      css.isBlackAndWhite = isBlackAndWhite;
      css.gradientColor = [];
      css.colorname = config2.colorname;
      let borderhsl = __spreadValues({}, nowColor.hsla);
      css.borderCss = {};
      let bghsl = __spreadValues({}, nowColor.hsla);
      if (config2.dark) {
        if (nowColor.hsla.h != 0 && nowColor.hsla.s != 0) {
          bghsl.l = 40;
        }
      }
      if (config2.blur) {
        bghsl.a = 0.85;
      }
      css.backgroundColor = colortool.rgbaToCss(colortool.hslaToRgba(__spreadValues({}, bghsl)));
      if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && config2.dark) {
        css.backgroundColor = colortool.rgbaToCss(colortool.hslaToRgba(__spreadProps(__spreadValues({}, bghsl), { l: 8 })));
        css.border = colortool.rgbaToCss(colortool.hslaToRgba(__spreadProps(__spreadValues({}, borderhsl), { l: 12 })));
      }
      if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && !config2.dark && nowColor.hsla.l == 100) {
        css.border = colortool.rgbaToCss(colortool.hslaToRgba(__spreadProps(__spreadValues({}, borderhsl), { l: 90 })));
      }
      if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && !config2.dark && nowColor.hsla.l == 0) {
        css.border = colortool.rgbaToCss(colortool.hslaToRgba(__spreadProps(__spreadValues({}, borderhsl), { l: 12 })));
      }
      css.backgroundColorCss = { "background-color": css.backgroundColor };
      let txcolor = __spreadValues({}, nowColor.hsla);
      if (config2.dark) {
        txcolor.l = 95;
      } else {
        if (isDarkColor) {
          txcolor.l = 95;
        } else {
          if (isGrey) {
            txcolor.l = 10;
          } else {
            txcolor.l = 20;
          }
        }
      }
      if (config2.outlined) {
        txcolor.l = 50;
        if (config2.dark) {
          txcolor.l = 55;
        } else {
          if (nowColor.hsla.h > 45 && nowColor.hsla.h < 90 && nowColor.hsla.h != 0 && nowColor.hsla.s != 0) {
            txcolor.l = 20;
          }
        }
        if ((isBlack || isWhite) && config2.dark) {
          txcolor.l = 100;
        }
        config2.borderWidth = config2["borderWidth"] || 2;
        let n_hsl = { h: nowColor.hsla.h, s: nowColor.hsla.s, l: 0, a: 0 };
        let o_bgcss = colortool.rgbaToCss(colortool.hslaToRgba(n_hsl));
        css.backgroundColor = o_bgcss;
        css.backgroundColorCss = { "background-color": o_bgcss };
        css.textColor = colortool.rgbaToCss(colortool.hslaToRgba(txcolor));
        css.border = css.textColor;
      }
      if (config2.text) {
        txcolor.l = 90;
        if (isGrey) {
          txcolor.l = 15;
        } else {
          txcolor.l = 55;
          if (nowColor.hsla.h > 45 && nowColor.hsla.h < 90 && nowColor.hsla.h != 0 && nowColor.hsla.s != 0) {
            txcolor.l = 20;
          }
        }
        if (config2.dark) {
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
        if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && config2.dark) {
          txcolor.l = 90;
        }
        css.textColor = colortool.rgbaToCss(colortool.hslaToRgba(txcolor));
        css.border = css.textColor;
        let o_now_bgColor = nowColor.csscolor;
        let n_hsl = { h: nowColor.hsla.h, s: nowColor.hsla.s, l: 96, a: nowColor.hsla.a };
        if (config2.dark) {
          if (nowColor.hsla.h != 0 && nowColor.hsla.s != 0) {
            n_hsl.l = 12;
            n_hsl.s = 35;
          } else {
            n_hsl.l = 12;
            n_hsl.s = 0;
          }
        }
        if (config2.blur) {
          n_hsl.a = 0.85;
        }
        o_now_bgColor = colortool.rgbaToCss(colortool.hslaToRgba(n_hsl));
        css.backgroundColor = o_now_bgColor;
        css.backgroundColorCss = { "background-color": o_now_bgColor };
      }
      if (config2.shadow) {
        let n_hsl = { h: nowColor.hsla.h, s: 100, l: 50, a: 0.2 };
        if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0) {
          n_hsl = { h: 0, s: 0, l: 20, a: 0.07 };
        }
        let o_bgcss = colortool.rgbaToCss(colortool.hslaToRgba(n_hsl));
        css.shadowColor = {
          boxShadow: `0rpx ${config2.shadow * 2.5}rpx ${config2.shadow * 6}rpx ${o_bgcss}`
        };
      }
      if (config2.linearDirection) {
        let liner_color_1 = { h: 0, s: 0, l: 0, a: nowColor.hsla.a };
        let liner_color_2 = { h: 0, s: 0, l: 0, a: nowColor.hsla.a };
        let dir_str = linearDirection[config2.linearDirection];
        if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && nowColor.hsla.l == 100) {
          if (config2.linearDeep == "light") {
            liner_color_1.l = 80;
            liner_color_2.l = 20;
          } else {
            liner_color_1.l = 50;
            liner_color_2.l = 40;
          }
        } else if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && nowColor.hsla.l == 0) {
          if (config2.linearDeep == "light") {
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
          if (config2.linearDeep == "light") {
            liner_color_1.l = 70;
            liner_color_1.s = 95;
            liner_color_1.h -= 5;
            liner_color_2.l = 45;
            liner_color_2.s = 95;
            liner_color_2.h += 5;
          } else if (config2.linearDeep == "dark") {
            liner_color_1.l = 70;
            liner_color_1.s = 50;
            liner_color_2.l = 45;
            liner_color_2.s = 100;
          } else if (config2.linearDeep == "accent") {
            liner_color_1.h -= 0;
            liner_color_1.s = 80;
            liner_color_1.l = 55;
            liner_color_2.l = 65;
            liner_color_2.h -= 35;
            liner_color_2.s = 80;
          }
        }
        if (config2.dark) {
          liner_color_1.l = 40;
          liner_color_2.l = 40;
          txcolor.l = 90;
        }
        let color_t_1 = colortool.rgbaToCss(colortool.hslaToRgba(liner_color_1));
        let color_t_2 = colortool.rgbaToCss(colortool.hslaToRgba(liner_color_2));
        if (!config2.text && !config2.outlined) {
          css.backgroundColorCss = { "background-image": `linear-gradient(${dir_str},${color_t_1},${color_t_2})` };
          let newBgcolor = {
            h: (liner_color_1.h + liner_color_2.h) / 2,
            s: (liner_color_1.s + liner_color_2.s) / 2,
            l: (liner_color_1.l + liner_color_2.l) / 2,
            a: (liner_color_1.a + liner_color_2.a) / 2
          };
          let newBgcolorRgb = colortool.hslaToRgba(newBgcolor);
          if (!config2.dark) {
            if (!isDarkColorFun(newBgcolorRgb.r, newBgcolorRgb.g, newBgcolorRgb.b) && nowColor.hsla.h != 0 && nowColor.hsla.s != 0) {
              txcolor.l = 20;
            }
          }
          css.backgroundColor = colortool.rgbaToCss(colortool.hslaToRgba(newBgcolor));
          css.gradientColor = [color_t_1, color_t_2];
        }
      }
      if (config2.dark == true) {
        css.cardcolor = "rgba(26, 26,26, 1.0)";
        css.inputcolor = "rgba(31, 31,31, 1.0)";
        css.bodycolor = "rgba(5,5,5, 1.0)";
        css.disablecolor = "rgba(30, 30, 30, 1.0)";
        css.textDisableColor = "rgba(100, 100, 100, 1.0)";
      }
      css.textColor = colortool.rgbaToCss(colortool.hslaToRgba(txcolor));
      if (config2.dark) {
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
      if (config2.borderDirection == "all") {
        css.borderCss[`border`] = `${config2.borderWidth}rpx ${config2.borderStyle} ${css.border}`;
      } else if (config2.borderDirection == "x" || config2.borderDirection == "leftright") {
        css.borderCss[`border-left`] = `${config2.borderWidth}rpx ${config2.borderStyle} ${css.border}`;
        css.borderCss[`border-right`] = `${config2.borderWidth}rpx ${config2.borderStyle} ${css.border}`;
      } else if (config2.borderDirection == "y" || config2.borderDirection == "topbottom") {
        css.borderCss[`border-top`] = `${config2.borderWidth}rpx ${config2.borderStyle} ${css.border}`;
        css.borderCss[`border-bottom`] = `${config2.borderWidth}rpx ${config2.borderStyle} ${css.border}`;
      } else if (config2.borderDirection == "bottomleft") {
        css.borderCss[`border-left`] = `${config2.borderWidth}rpx ${config2.borderStyle} ${css.border}`;
        css.borderCss[`border-bottom`] = `${config2.borderWidth}rpx ${config2.borderStyle} ${css.border}`;
      } else if (config2.borderDirection == "bottomright") {
        css.borderCss[`border-right`] = `${config2.borderWidth}rpx ${config2.borderStyle} ${css.border}`;
        css.borderCss[`border-bottom`] = `${config2.borderWidth}rpx ${config2.borderStyle} ${css.border}`;
      } else if (config2.borderDirection == "topleft") {
        css.borderCss[`border-left`] = `${config2.borderWidth}rpx ${config2.borderStyle} ${css.border}`;
        css.borderCss[`border-top`] = `${config2.borderWidth}rpx ${config2.borderStyle} ${css.border}`;
      } else if (config2.borderDirection == "topright") {
        css.borderCss[`border-right`] = `${config2.borderWidth}rpx ${config2.borderStyle} ${css.border}`;
        css.borderCss[`border-top`] = `${config2.borderWidth}rpx ${config2.borderStyle} ${css.border}`;
      } else {
        let str = "-" + config2.borderDirection;
        css.borderCss[`border${str}`] = `${config2.borderWidth}rpx ${config2.borderStyle} ${css.border}`;
      }
      return css;
    }
  }
  var themeTool = {
    isCssColor,
    themeColors,
    getColor
  };
  const custom_props = {
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
      type: String,
      default: borderStyle.solid,
      validator: (value) => {
        let mp = ["dashed", "dotted", "solid"];
        if (!mp.includes(value)) {
          formatAppLog("error", "at tmui/tool/lib/minxs.ts:90", "\u8FB9\u7EBF\u7C7B\u578B\u53EA\u80FD\u4E3AborderStyle\u4E2D\u7684\u4E00\u79CD\u3002");
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
          formatAppLog("error", "at tmui/tool/lib/minxs.ts:104", "\u8FB9\u7EBF\u65B9\u5411\u683C\u5F0F\u53EA\u80FD\u4E3AcssDirection\u4E2D\u7684\u4E00\u79CD\u3002");
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
      type: String,
      default: linearDirection.none,
      validator: (value) => {
        let mp = ["left", "right", "bottom", "top", ""];
        if (!mp.includes(value)) {
          formatAppLog("error", "at tmui/tool/lib/minxs.ts:132", "\u6E10\u53D8\u65B9\u5411\u53EA\u80FD\u4E3A,left:\u53F3->\u5DE6\uFF0Cright:\u5DE6->\u53F3\u3002top:\u4E0B->\u4E0A\uFF0Cbottom:\u4E0A->\u4E0B,\u4E2D\u7684\u4E00\u79CD\u3002");
        }
        return mp.includes(value);
      }
    },
    linearDeep: {
      type: String,
      default: linearDeep.light,
      validator: (value) => {
        let mp = ["accent", "dark", "light"];
        if (!mp.includes(value)) {
          formatAppLog("error", "at tmui/tool/lib/minxs.ts:144", "\u6E10\u53D8\u65B9\u5411\u53EA\u80FD\u4E3Alight,dark,accent\u4E2D\u7684\u4E00\u79CD\u3002");
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
  const computedDark = (props, tmcfg) => {
    const followDark = props.followDark;
    const dark2 = props.dark;
    const glboalDark = tmcfg.dark;
    if (followDark) {
      return glboalDark;
    }
    return dark2;
  };
  const computedClass = (props) => {
    const _class = props._class;
    if (typeof _class == "string") {
      return _class;
    }
    if (Array.isArray(_class)) {
      return _class.join(" ");
    }
    return "";
  };
  const computedStyle = (props) => {
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
  const computedTheme = (props, dark2, store) => {
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
    var theme2 = new themeTool.themeColors(store.colorList);
    if (themeTool.isCssColor(color) && !theme2.hasColors(color)) {
      theme2 = new themeTool.themeColors(theme2.add(color, color));
    }
    let defaultColorName = color || "primary";
    if ((props == null ? void 0 : props.followTheme) == true && store.color) {
      defaultColorName = store.color;
    }
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
  function getDevtoolsGlobalHook$1() {
    return getTarget$1().__VUE_DEVTOOLS_GLOBAL_HOOK__;
  }
  function getTarget$1() {
    return typeof navigator !== "undefined" && typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {};
  }
  const isProxyAvailable$1 = typeof Proxy === "function";
  const HOOK_SETUP$1 = "devtools-plugin:setup";
  const HOOK_PLUGIN_SETTINGS_SET$1 = "plugin:settings:set";
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
  class ApiProxy$1 {
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
        hook.on(HOOK_PLUGIN_SETTINGS_SET$1, (pluginId, value) => {
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
              return new Promise((resolve) => {
                this.targetQueue.push({
                  method: prop,
                  args,
                  resolve
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
  function setupDevtoolsPlugin$1(pluginDescriptor, setupFn) {
    const descriptor = pluginDescriptor;
    const target = getTarget$1();
    const hook = getDevtoolsGlobalHook$1();
    const enableProxy = isProxyAvailable$1 && descriptor.enableEarlyProxy;
    if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
      hook.emit(HOOK_SETUP$1, pluginDescriptor, setupFn);
    } else {
      const proxy = enableProxy ? new ApiProxy$1(descriptor, hook) : null;
      const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
      list.push({
        pluginDescriptor: descriptor,
        setupFn,
        proxy
      });
      if (proxy)
        setupFn(proxy.proxiedTarget);
    }
  }
  /*!
    * pinia v2.0.14
    * (c) 2022 Eduardo San Martin Morote
    * @license MIT
    */
  let activePinia;
  const setActivePinia = (pinia) => activePinia = pinia;
  const getActivePinia = () => vue.getCurrentInstance() && vue.inject(piniaSymbol) || activePinia;
  const piniaSymbol = Symbol("pinia");
  function isPlainObject$1(o) {
    return o && typeof o === "object" && Object.prototype.toString.call(o) === "[object Object]" && typeof o.toJSON !== "function";
  }
  var MutationType;
  (function(MutationType2) {
    MutationType2["direct"] = "direct";
    MutationType2["patchObject"] = "patch object";
    MutationType2["patchFunction"] = "patch function";
  })(MutationType || (MutationType = {}));
  const IS_CLIENT = typeof window !== "undefined";
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
  } : typeof HTMLAnchorElement !== "undefined" && "download" in HTMLAnchorElement.prototype && !isMacOSWebView ? downloadSaveAs : "msSaveOrOpenBlob" in _navigator ? msSaveAs : fileSaverSaveAs;
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
    const piniaMessage = "\u{1F34D} " + message;
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
      pinia.state.value = JSON.parse(await navigator.clipboard.readText());
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
      return new Promise((resolve, reject) => {
        fileInput.onchange = async () => {
          const files = fileInput.files;
          if (!files)
            return resolve(null);
          const file = files.item(0);
          if (!file)
            return resolve(null);
          return resolve({ text: await file.text(), file });
        };
        fileInput.oncancel = () => resolve(null);
        fileInput.onerror = reject;
        fileInput.click();
      });
    }
    return openFile;
  }
  async function actionGlobalOpenStateFile(pinia) {
    try {
      const open2 = await getFileOpener();
      const result = await open2();
      if (!result)
        return;
      const { text, file } = result;
      pinia.state.value = JSON.parse(text);
      toastMessage(`Global state imported from "${file.name}".`);
    } catch (error) {
      toastMessage(`Failed to export the state as JSON. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  function formatDisplay(display) {
    return {
      _custom: {
        display
      }
    };
  }
  const PINIA_ROOT_LABEL = "\u{1F34D} Pinia (root)";
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
  const getStoreType = (id) => "\u{1F34D} " + id;
  function registerPiniaDevtools(app2, pinia) {
    setupDevtoolsPlugin$1({
      id: "dev.esm.pinia",
      label: "Pinia \u{1F34D}",
      logo: "https://pinia.vuejs.org/logo.svg",
      packageName: "pinia",
      homepage: "https://pinia.vuejs.org",
      componentStateTypes,
      app: app2
    }, (api) => {
      if (typeof api.now !== "function") {
        toastMessage("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html.");
      }
      api.addTimelineLayer({
        id: MUTATIONS_LAYER_ID,
        label: `Pinia \u{1F34D}`,
        color: 15064968
      });
      api.addInspector({
        id: INSPECTOR_ID,
        label: "Pinia \u{1F34D}",
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
                  value: store.$state,
                  actions: [
                    {
                      icon: "restore",
                      tooltip: "Reset the state of this store",
                      action: () => store.$reset()
                    }
                  ]
                }
              } : store.$state
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
        if (payload.app === app2 && payload.inspectorId === INSPECTOR_ID) {
          let stores = [pinia];
          stores = stores.concat(Array.from(pinia._s.values()));
          payload.rootNodes = (payload.filter ? stores.filter((store) => "$id" in store ? store.$id.toLowerCase().includes(payload.filter.toLowerCase()) : PINIA_ROOT_LABEL.toLowerCase().includes(payload.filter.toLowerCase())) : stores).map(formatStoreForInspectorTree);
        }
      });
      api.on.getInspectorState((payload) => {
        if (payload.app === app2 && payload.inspectorId === INSPECTOR_ID) {
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
        if (payload.app === app2 && payload.inspectorId === INSPECTOR_ID) {
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
        if (payload.type.startsWith("\u{1F34D}")) {
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
  function addStoreToDevtools(app2, store) {
    if (!componentStateTypes.includes(getStoreType(store.$id))) {
      componentStateTypes.push(getStoreType(store.$id));
    }
    setupDevtoolsPlugin$1({
      id: "dev.esm.pinia",
      label: "Pinia \u{1F34D}",
      logo: "https://pinia.vuejs.org/logo.svg",
      packageName: "pinia",
      homepage: "https://pinia.vuejs.org",
      componentStateTypes,
      app: app2,
      settings: {
        logStoreChanges: {
          label: "Notify about new/deleted stores",
          type: "boolean",
          defaultValue: true
        }
      }
    }, (api) => {
      const now2 = typeof api.now === "function" ? api.now.bind(api) : Date.now;
      store.$onAction(({ after, onError, name, args }) => {
        const groupId = runningActionId++;
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now2(),
            title: "\u{1F6EB} " + name,
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
              title: "\u{1F6EC} " + name,
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
              title: "\u{1F4A5} " + name,
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
          data: __spreadValues({
            store: formatDisplay(store.$id)
          }, formatEventData(events)),
          groupId: activeAction
        };
        activeAction = void 0;
        if (type === MutationType.patchFunction) {
          eventData.subtitle = "\u2935\uFE0F";
        } else if (type === MutationType.patchObject) {
          eventData.subtitle = "\u{1F9E9}";
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
            title: "\u{1F525} " + store.$id,
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
        api.getSettings().logStoreChanges && toastMessage(`Disposed "${store.$id}" store \u{1F5D1}`);
      };
      api.notifyComponentUpdate();
      api.sendInspectorTree(INSPECTOR_ID);
      api.sendInspectorState(INSPECTOR_ID);
      api.getSettings().logStoreChanges && toastMessage(`"${store.$id}" store installed \u{1F195}`);
    });
  }
  let runningActionId = 0;
  let activeAction;
  function patchActionForGrouping(store, actionNames) {
    const actions = actionNames.reduce((storeActions, actionName) => {
      storeActions[actionName] = vue.toRaw(store)[actionName];
      return storeActions;
    }, {});
    for (const actionName in actions) {
      store[actionName] = function() {
        const _actionId = runningActionId;
        const trackedStore = new Proxy(store, {
          get(...args) {
            activeAction = _actionId;
            return Reflect.get(...args);
          },
          set(...args) {
            activeAction = _actionId;
            return Reflect.set(...args);
          }
        });
        return actions[actionName].apply(trackedStore, arguments);
      };
    }
  }
  function devtoolsPlugin({ app: app2, store, options }) {
    if (store.$id.startsWith("__hot:")) {
      return;
    }
    if (options.state) {
      store._isOptionsAPI = true;
    }
    if (typeof options.state === "function") {
      patchActionForGrouping(store, Object.keys(options.actions));
      const originalHotUpdate = store._hotUpdate;
      vue.toRaw(store)._hotUpdate = function(newStore) {
        originalHotUpdate.apply(this, arguments);
        patchActionForGrouping(store, Object.keys(newStore._hmrPayload.actions));
      };
    }
    addStoreToDevtools(app2, store);
  }
  function createPinia() {
    const scope = vue.effectScope(true);
    const state = scope.run(() => vue.ref({}));
    let _p = [];
    let toBeInstalled = [];
    const pinia = vue.markRaw({
      install(app2) {
        setActivePinia(pinia);
        {
          pinia._a = app2;
          app2.provide(piniaSymbol, pinia);
          app2.config.globalProperties.$pinia = pinia;
          if (IS_CLIENT) {
            registerPiniaDevtools(app2, pinia);
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
      _a: null,
      _e: scope,
      _s: /* @__PURE__ */ new Map(),
      state
    });
    if (IS_CLIENT && true) {
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
      if (isPlainObject$1(targetValue) && isPlainObject$1(subPatch) && !vue.isRef(subPatch) && !vue.isReactive(subPatch)) {
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
    if (!detached && vue.getCurrentInstance()) {
      vue.onUnmounted(removeSubscription);
    }
    return removeSubscription;
  }
  function triggerSubscriptions(subscriptions, ...args) {
    subscriptions.slice().forEach((callback) => {
      callback(...args);
    });
  }
  function mergeReactiveObjects(target, patchToApply) {
    for (const key in patchToApply) {
      if (!patchToApply.hasOwnProperty(key))
        continue;
      const subPatch = patchToApply[key];
      const targetValue = target[key];
      if (isPlainObject$1(targetValue) && isPlainObject$1(subPatch) && target.hasOwnProperty(key) && !vue.isRef(subPatch) && !vue.isReactive(subPatch)) {
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
    return !isPlainObject$1(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
  }
  const { assign: assign$1 } = Object;
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
      const localState = hot ? vue.toRefs(vue.ref(state ? state() : {}).value) : vue.toRefs(pinia.state.value[id]);
      return assign$1(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
        computedGetters[name] = vue.markRaw(vue.computed(() => {
          setActivePinia(pinia);
          const store2 = pinia._s.get(id);
          return getters[name].call(store2, store2);
        }));
        return computedGetters;
      }, {}));
    }
    store = createSetupStore(id, setup, options, pinia, hot, true);
    store.$reset = function $reset() {
      const newState = state ? state() : {};
      this.$patch(($state) => {
        assign$1($state, newState);
      });
    };
    return store;
  }
  function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
    let scope;
    const optionsForPlugin = assign$1({ actions: {} }, options);
    if (!pinia._e.active) {
      throw new Error("Pinia destroyed");
    }
    const $subscribeOptions = {
      deep: true
    };
    {
      $subscribeOptions.onTrigger = (event) => {
        if (isListening) {
          debuggerEvents = event;
        } else if (isListening == false && !store._hotUpdating) {
          if (Array.isArray(debuggerEvents)) {
            debuggerEvents.push(event);
          } else {
            console.error("\u{1F34D} debuggerEvents should be an array. This is most likely an internal Pinia bug.");
          }
        }
      };
    }
    let isListening;
    let isSyncListening;
    let subscriptions = vue.markRaw([]);
    let actionSubscriptions = vue.markRaw([]);
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
    const $reset = () => {
      throw new Error(`\u{1F34D}: Store "${$id}" is build using the setup syntax and does not implement $reset().`);
    };
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
        }, assign$1({}, $subscribeOptions, options2)));
        return removeSubscription;
      },
      $dispose
    };
    const store = vue.reactive(assign$1(IS_CLIENT ? {
      _customProperties: vue.markRaw(/* @__PURE__ */ new Set()),
      _hmrPayload
    } : {}, partialStore));
    pinia._s.set($id, store);
    const setupStore = pinia._e.run(() => {
      scope = vue.effectScope();
      return scope.run(() => setup());
    });
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
          _hmrPayload.getters[key] = isOptionsStore ? options.getters[key] : prop;
          if (IS_CLIENT) {
            const getters = setupStore._getters || (setupStore._getters = vue.markRaw([]));
            getters.push(key);
          }
        }
      }
    }
    {
      assign$1(store, setupStore);
      assign$1(vue.toRaw(store), setupStore);
    }
    Object.defineProperty(store, "$state", {
      get: () => hot ? hotState.value : pinia.state.value[$id],
      set: (state) => {
        if (hot) {
          throw new Error("cannot set hotState");
        }
        $patch(($state) => {
          assign$1($state, state);
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
            if (typeof newStateTarget === "object" && isPlainObject$1(newStateTarget) && isPlainObject$1(oldStateSource)) {
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
          const getterValue = isOptionsStore ? vue.computed(() => {
            setActivePinia(pinia);
            return getter.call(store, store);
          }) : getter;
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
      const nonEnumerable = {
        writable: true,
        configurable: true,
        enumerable: false
      };
      if (IS_CLIENT) {
        ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((p) => {
          Object.defineProperty(store, p, __spreadValues({
            value: store[p]
          }, nonEnumerable));
        });
      }
    }
    pinia._p.forEach((extender) => {
      if (IS_CLIENT) {
        const extensions = scope.run(() => extender({
          store,
          app: pinia._a,
          pinia,
          options: optionsForPlugin
        }));
        Object.keys(extensions || {}).forEach((key) => store._customProperties.add(key));
        assign$1(store, extensions);
      } else {
        assign$1(store, scope.run(() => extender({
          store,
          app: pinia._a,
          pinia,
          options: optionsForPlugin
        })));
      }
    });
    if (store.$state && typeof store.$state === "object" && typeof store.$state.constructor === "function" && !store.$state.constructor.toString().includes("[native code]")) {
      console.warn(`[\u{1F34D}]: The "state" must be a plain object. It cannot be
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
    }
    function useStore(pinia, hot) {
      const currentInstance = vue.getCurrentInstance();
      pinia = pinia || currentInstance && vue.inject(piniaSymbol);
      if (pinia)
        setActivePinia(pinia);
      if (!activePinia) {
        throw new Error(`[\u{1F34D}]: getActivePinia was called with no active Pinia. Did you forget to install pinia?
	const pinia = createPinia()
	app.use(pinia)
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
        const newStore = isSetupStore ? createSetupStore(hotId, setup, options, pinia, true) : createOptionsStore(hotId, assign$1({}, options), pinia, true);
        hot._hotUpdate(newStore);
        delete pinia.state.value[hotId];
        pinia._s.delete(hotId);
      }
      if (IS_CLIENT && currentInstance && currentInstance.proxy && !hot) {
        const vm = currentInstance.proxy;
        const cache2 = "_pStores" in vm ? vm._pStores : vm._pStores = {};
        cache2[id] = store;
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
      console.warn(`[\u{1F34D}]: Directly pass all stores to "mapStores()" without putting them in an array:
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
          refs[key] = vue.toRef(store, key);
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
            {
              registerPiniaDevtools(pinia._a, pinia);
            }
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
  var Pinia = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    [Symbol.toStringTag]: "Module",
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
  });
  function preview(url = "", list = [], rangKey = "url") {
    if (!url) {
      uni.$tm.u.toast("\u53C2\u6570\u6709\u8BEF");
      return;
    }
    if (arguments.length == 1) {
      uni.previewImage({
        current: url,
        urls: list ? list : [url]
      });
    } else if (arguments.length === 3) {
      if (typeof list[0] === "object" && typeof list[0] !== "undefined") {
        let urls = [];
        list.forEach((item) => {
          urls.push(item[rangKey]);
        });
        uni.previewImage({
          current: url,
          urls,
          fail: (er) => {
            formatAppLog("warn", "at tmui/tool/function/preview.ts:35", er);
          }
        });
      } else if (typeof list[0] === "string") {
        uni.previewImage({
          current: url,
          urls: list
        });
      }
    } else {
      uni.$tm.u.toast("\u53C2\u6570\u6709\u8BEF");
    }
  }
  function splitData(oArr = [], length = 1) {
    let arr = [];
    let minArr = [];
    oArr.forEach((c) => {
      if (minArr.length === length) {
        minArr = [];
      }
      if (minArr.length === 0) {
        arr.push(minArr);
      }
      minArr.push(c);
    });
    return arr;
  }
  function timeMuch(t) {
    let format2 = {
      d: "00",
      h: "00",
      m: "00",
      s: "00"
    };
    if (t > 0) {
      let d = Math.floor(t / 86400);
      let h = Math.floor(t / 3600 % 24);
      let m = Math.floor(t / 60 % 60);
      let s = Math.floor(t % 60);
      format2.d = d < 10 ? "0" + d : d;
      format2.h = h < 10 ? "0" + h : h;
      format2.m = m < 10 ? "0" + m : m;
      format2.s = s < 10 ? "0" + s : s;
    }
    return format2;
  }
  function getDateToNewData(timestamp = new Date().getTime()) {
    if (typeof timestamp == "string") {
      timestamp = new Date(timestamp).getTime();
    }
    var arrTimestamp = (timestamp + "").split("");
    for (var start = 0; start < 13; start++) {
      if (!arrTimestamp[start]) {
        arrTimestamp[start] = "0";
      }
    }
    timestamp = Number(arrTimestamp.join("")) * 1;
    var minute = 1e3 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var month = day * 30;
    var now2 = new Date().getTime();
    var diffValue = now2 - timestamp;
    if (diffValue < 0) {
      return "\u4E0D\u4E45\u524D";
    }
    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;
    var zero = function(value) {
      if (value < 10) {
        return "0" + value;
      }
      return value;
    };
    if (monthC > 12) {
      return function() {
        var date = new Date(timestamp);
        return date.getFullYear() + "\u5E74" + zero(date.getMonth() + 1) + "\u6708" + zero(date.getDate()) + "\u65E5";
      }();
    } else if (monthC >= 1) {
      return parseInt(monthC + "") + "\u6708\u524D";
    } else if (weekC >= 1) {
      return parseInt(weekC + "") + "\u5468\u524D";
    } else if (dayC >= 1) {
      return parseInt(dayC + "") + "\u5929\u524D";
    } else if (hourC >= 1) {
      return parseInt(hourC + "") + "\u5C0F\u65F6\u524D";
    } else if (minC >= 1) {
      return parseInt(minC + "") + "\u5206\u949F\u524D";
    }
    return "\u521A\u521A";
  }
  function callPhone(phoneNumber = "") {
    let num = phoneNumber.toString();
    return new Promise((rs, rj) => {
      uni.makePhoneCall({
        phoneNumber: num,
        success: () => rs(true),
        fail: (err) => rj(err)
      });
    });
  }
  function scanCode(onlyFromCamera = true, scanType = ["barCode", "qrCode", "datamatrix", "datamatrix"]) {
    return new Promise((rs, rj) => {
      uni.scanCode({
        onlyFromCamera,
        scanType,
        success: (res) => rs(res),
        fail: (error) => rj(error)
      });
    });
  }
  function setClipboardData(data) {
    return new Promise((rs, rj) => {
      uni.setClipboardData({
        data,
        success: () => rs(true),
        fail: (error) => rj(error)
      });
    });
  }
  function getClipboardData() {
    return new Promise((rs, rj) => {
      uni.getClipboardData({
        success: (res) => rs(res.data),
        fail: (error) => rj(error)
      });
    });
  }
  function setCookie(key, data) {
    try {
      uni.setStorageSync(key, data);
      return true;
    } catch (e) {
      return false;
    }
  }
  function delCookie(key) {
    try {
      uni.removeStorageSync(key);
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
  function httpUrlAddKey(uri, key, value) {
    if (!value) {
      return uri;
    }
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf("?") !== -1 ? "&" : "?";
    if (uri.match(re)) {
      return uri.replace(re, "$1" + key + "=" + value + "$2");
    } else {
      return uri + separator + key + "=" + value;
    }
  }
  function getQueryString(url, key) {
    var query_string = url.substring(url.indexOf("?"));
    if (!query_string)
      return "";
    var re = /[?&]?([^=]+)=([^&]*)/g;
    var tokens;
    while (tokens = re.exec(query_string)) {
      if (decodeURIComponent(tokens[1]) === key) {
        return decodeURIComponent(tokens[2]);
      }
    }
    return "";
  }
  function getUid(length = 12) {
    return Number(Number(Math.random().toString().substr(3, length) + Date.now()).toString(8));
  }
  var timeout = getUid(1);
  function debounce(func, wait = 500, immediate = false) {
    if (timeout !== null)
      clearTimeout(timeout);
    if (immediate) {
      var callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow)
        typeof func === "function" && func();
    } else {
      timeout = getUid(1);
      timeout = setTimeout(() => {
        typeof func === "function" && func();
      }, wait);
    }
  }
  function throttle(func, wait = 500, immediate = true, timer = 85688, flag = false) {
    if (immediate) {
      if (!flag) {
        flag = true;
        typeof func === "function" && func();
        timer = setTimeout(() => {
          flag = false;
        }, wait);
      }
    } else {
      if (!flag) {
        flag = true;
        timer = setTimeout(() => {
          flag = false;
          typeof func === "function" && func();
        }, wait);
      }
    }
  }
  function deepClone(obj) {
    if ([null, void 0, NaN, false].includes(obj))
      return obj;
    if (typeof obj !== "object" && typeof obj !== "function") {
      return obj;
    }
    var o = Array.isArray(obj) ? [] : {};
    for (let i in obj) {
      if (obj.hasOwnProperty(i)) {
        o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
      }
    }
    return o;
  }
  function quereyDom(t, node) {
    return new Promise((res, rej) => {
      const query = uni.createSelectorQuery().in(t);
      query.select(node).boundingClientRect((el) => {
        res(el);
      }).exec();
    });
  }
  function isPhone(phone) {
    let val = String(phone);
    let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    return !!val.match(reg);
  }
  function isChina(s) {
    var patrn = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
    return !!patrn.exec(s);
  }
  function isEmpty(s) {
    if (typeof s === "string") {
      s = s.trim();
    }
    if (s == "")
      return true;
    if (s == null)
      return true;
    if (typeof s === "undefined")
      return true;
    if (Array.isArray(s)) {
      if (s.length == 0)
        return true;
    }
    if (typeof s === "object") {
      if (Object.keys(s).length == 0)
        return true;
    }
    return false;
  }
  function isEmail(s) {
    let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    return !!s.match(reg);
  }
  function isIdCard(val) {
    val = String(val);
    var p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    var parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
    var code = val.substring(17);
    if (p.test(val)) {
      var sum = 0;
      for (var i = 0; i < 17; i++) {
        let id = val[i];
        sum += id * factor[i];
      }
      if (parity[sum % 11] == code.toUpperCase()) {
        return true;
      }
    }
    return false;
  }
  function isIdCar(s) {
    let reg = /^[京|沪|津|渝|鲁|冀|晋|蒙|辽|吉|黑|苏|浙|皖|闽|赣|豫|湘|鄂|粤|桂|琼|川|贵|云|藏|陕|甘|青|宁|新|港|澳|台|新|使]{1}[A-Z]{1}[A-Z_0-9]{5,6}$/;
    return !!s.match(reg);
  }
  function isPasswordOfNumber(s, len = 6, maxLen = 20) {
    s = String(s);
    let reg = new RegExp(`^[0-9]{${len},${maxLen}}$`);
    return !!s.match(reg);
  }
  function isPasswordOfOther(s, len = 6, maxLen = 20, model = 0) {
    s = String(s);
    let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
    if (model === 1) {
      reg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,20}$/;
    }
    if (model === 2) {
      reg = /(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{6,20}$/;
    }
    return !!s.match(reg);
  }
  function isDate$1(s) {
    if (s == null || typeof s === "undefined" || !s)
      return false;
    if (typeof s === "string") {
      s = s.replace("-", "/");
    }
    let d = new Date(s);
    if (d.toString() == "Invalid Date")
      return false;
    return true;
  }
  function toast(word, mask = true, icon = "none") {
    uni.showToast({
      mask,
      title: word,
      icon
    });
  }
  function getWindow() {
    var _a2, _b2, _c2, _d;
    const sysinfo2 = uni.getSystemInfoSync();
    let top = 0;
    let height = sysinfo2.windowHeight;
    let nowPage = getCurrentPages().pop();
    let isCustomHeader = false;
    (_b2 = (_a2 = uni.$tm) == null ? void 0 : _a2.pages) != null ? _b2 : [];
    let bottom = (_d = (_c2 = sysinfo2.safeAreaInsets) == null ? void 0 : _c2.bottom) != null ? _d : 0;
    for (let i = 0; i < uni.$tm.pages.length; i++) {
      if ((nowPage == null ? void 0 : nowPage.route) == uni.$tm.pages[i].path && uni.$tm.pages[i].custom == "custom") {
        isCustomHeader = true;
        break;
      }
    }
    let reulst = { bottom, height, width: sysinfo2.windowWidth, top, isCustomHeader, statusBarHeight: sysinfo2.statusBarHeight, sysinfo: sysinfo2 };
    return reulst;
  }
  function routerTo(url, type = "navigate") {
    let funType = {
      navigate: "navigateTo",
      redirect: "redirectTo",
      switchTab: "switchTab",
      reLaunch: "reLaunch",
      navigateBack: "navigateBack"
    };
    let fun = funType[type];
    if (fun == "navigateBack") {
      uni.navigateBack({ fail(error) {
        formatAppLog("error", "at tmui/tool/function/util.ts:629", error);
      } });
    } else if (fun == "reLaunch") {
      uni.reLaunch({
        url,
        fail(error) {
          formatAppLog("error", "at tmui/tool/function/util.ts:635", error);
        }
      });
    } else if (fun == "switchTab") {
      uni.switchTab({
        url,
        fail(error) {
          formatAppLog("error", "at tmui/tool/function/util.ts:642", error);
        }
      });
    } else if (fun == "redirectTo") {
      uni.redirectTo({
        url,
        fail(error) {
          formatAppLog("error", "at tmui/tool/function/util.ts:649", error);
        }
      });
    } else if (fun == "navigateTo") {
      uni.navigateTo({
        url,
        fail(error) {
          formatAppLog("error", "at tmui/tool/function/util.ts:656", error);
        }
      });
    }
  }
  var util = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    [Symbol.toStringTag]: "Module",
    "default": preview,
    splitData,
    timeMuch,
    getDateToNewData,
    callPhone,
    scanCode,
    setClipboardData,
    getClipboardData,
    setCookie,
    delCookie,
    getCookie,
    httpUrlAddKey,
    getQueryString,
    getUid,
    debounce,
    throttle,
    deepClone,
    quereyDom,
    isPhone,
    isChina,
    isEmpty,
    isEmail,
    isIdCard,
    isIdCar,
    isPasswordOfNumber,
    isPasswordOfOther,
    isDate: isDate$1,
    toast,
    getWindow,
    routerTo
  });
  let pdefault_cookies_color = getCookie("setTmVuetifyColor") || "";
  let pdefault_cookies_black = getCookie("setTmVuetifyBlack");
  let pdefault_cookies_local = getCookie("setTmVuetifyLocal") || "zh-Hans";
  let pdefault_cookies_colorArrayList = getCookie("colorArrayList");
  let dark = typeof pdefault_cookies_black === "boolean" ? pdefault_cookies_black : false;
  let themeObj = new themeTool.themeColors();
  if (pdefault_cookies_colorArrayList) {
    const result2 = pdefault_cookies_colorArrayList.filter((item) => themeObj.colors.every((subItem) => subItem.name !== item.name));
    themeObj = new themeTool.themeColors([...themeObj.colors, ...result2]);
  }
  const colorArray = themeObj.colors;
  const os = (_b = (_a = uni.getSystemInfoSync()) == null ? void 0 : _a.osName) != null ? _b : "";
  setCookie("colorArrayList", colorArray);
  const useTmpiniaStore = defineStore("tmpinia", {
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
        if (!defaultColorName || defaultColorName == "" || themeTool.isCssColor(defaultColorName)) {
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
      setTmLocal(language2) {
        language2 = language2 || "zh-Hans";
        setCookie("setTmVuetifyLocal", language2);
        this.tmStore = __spreadProps(__spreadValues({}, this.tmStore), {
          local: language2
        });
      }
    }
  });
  var _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$r = /* @__PURE__ */ vue.defineComponent({
    __name: "tm-sheet",
    props: __spreadProps(__spreadValues({}, custom_props), {
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
      (_b2 = (_a2 = vue.getCurrentInstance()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const parenClass_p = vue.computed(() => props.parenClass);
      const contStyle_p = vue.computed(() => props.contStyle);
      const _transprent = vue.computed(() => props.transprent);
      const tmcfg = vue.computed(() => store.tmStore);
      const _blur = vue.computed(() => {
        if (tmcfg.value.os == "android" && _isNvue.value) {
          return false;
        }
        return props.blur;
      });
      const customCSSStyle = vue.computed(() => computedStyle(props));
      const customClass = vue.computed(() => computedClass(props));
      const isDark = vue.computed(() => computedDark(props, tmcfg.value));
      const tmcomputed = vue.computed(() => {
        let text = props.text;
        if (_blur.value && tmcfg.value.os == "ios" && _isNvue.value) {
          text = true;
        }
        return computedTheme(__spreadProps(__spreadValues({}, props), { blur: _blur.value, text }), isDark.value, tmcfg.value);
      });
      const _isNvue = vue.ref(false);
      const _margin = vue.computed(() => props.margin);
      const _padding = vue.computed(() => props.padding);
      const _width = vue.computed(() => props.width);
      const _height = vue.computed(() => props.height);
      const _noLevel = vue.computed(() => props.noLevel);
      const _blue_sheet = vue.ref(true);
      const _blurEffect = vue.computed(() => {
        if (props.blur === true && isDark.value)
          return "dark";
        if (props.blur === true && !isDark.value)
          return "extralight";
        return "none";
      });
      vue.watch(() => isDark.value, () => {
      });
      const _bgcolor = vue.computed(() => {
        var _a3;
        if (_transprent.value === true)
          return `background-color:rgba(255,255,255,0);`;
        if (props.darkBgColor !== "" && isDark.value === true) {
          return `background-color:${props.darkBgColor};`;
        }
        if (((_a3 = tmcomputed.value.gradientColor) == null ? void 0 : _a3.length) === 2) {
          return tmcomputed.value.backgroundColorCss;
        }
        if (_noLevel.value && tmcomputed.value.isBlackAndWhite === true && isDark.value === true) {
          return `background-color: ${tmcomputed.value.inputcolor}`;
        }
        return `background-color: ${tmcomputed.value.backgroundColor}`;
      });
      const isLongPress = vue.ref(false);
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
      vue.computed(() => {
        let w = parseFloat(String(_width.value)) - parseFloat(String(props.padding[0]));
        w = w - parseFloat(String(props.border)) * 2;
        return w;
      });
      vue.computed(() => {
        let h = parseFloat(String(_height.value)) - parseFloat(String(props.padding[1]));
        h = h - parseFloat(String(props.border)) * 2;
        return h;
      });
      let textColor = vue.computed(() => {
        return tmcomputed.value.textColor;
      });
      vue.provide("appTextColor", textColor);
      return (_ctx, _cache) => {
        return _blue_sheet.value ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          "render-whole": true,
          blurEffect: vue.unref(_blurEffect),
          onClick: _cache[0] || (_cache[0] = ($event) => emits("click", $event)),
          onLongpress: longpress,
          onTouchend: touchend,
          onTouchstart: touchstart,
          onTouchcancel: touchcancel,
          onMousedown: mousedown,
          onMouseup: mouseup,
          onMouseleave: mouseleave,
          class: vue.normalizeClass([
            "flex flex-col noNvueBorder",
            vue.unref(parenClass_p),
            `mx-${vue.unref(_margin)[0]}`,
            `my-${vue.unref(_margin)[1]}`,
            `px-${vue.unref(_padding)[0]}`,
            `py-${vue.unref(_padding)[1]}`,
            isLongPress.value ? props.hoverClass : "",
            props.hoverClass != "" && props.hoverClass != "none" ? "webpc" : "",
            !_ctx.isDisabledRoundAndriod ? `round-${props.round}` : ""
          ]),
          style: vue.normalizeStyle([
            vue.unref(_height) ? { height: vue.unref(_height) + vue.unref(_padding)[1] * 2 + props.unit } : "",
            vue.unref(_width) ? { width: vue.unref(_width) + vue.unref(_padding)[0] * 2 + props.unit } : "",
            vue.unref(tmcomputed).borderCss,
            vue.unref(_blur) && vue.unref(store).tmStore.os == "ios" && _isNvue.value === true ? "" : vue.unref(_bgcolor),
            !vue.unref(_transprent) && props.shadow > 0 ? vue.unref(tmcomputed).shadowColor : "",
            !vue.unref(_transprent) && vue.unref(_blur) ? { backdropFilter: "blur(6px)" } : "",
            vue.unref(customCSSStyle)
          ])
        }, [
          vue.createElementVNode("view", {
            "render-whole": true,
            class: vue.normalizeClass(["flex noNvueBorder flex-col flex-1", vue.unref(customClass)]),
            style: vue.normalizeStyle(vue.unref(contStyle_p))
          }, [
            vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ], 6)
        ], 46, ["blurEffect"])) : vue.createCommentVNode("v-if", true);
      };
    }
  });
  var __easycom_7$1 = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["__scopeId", "data-v-3c6cb18c"], ["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-sheet/tm-sheet.vue"]]);
  const _sfc_main$q = /* @__PURE__ */ vue.defineComponent({
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
      },
      parentClass: {
        type: String,
        default: ""
      }
    }),
    emits: ["click"],
    setup(__props, { emit: emits }) {
      const props = __props;
      const store = useTmpiniaStore();
      const _parentClass = vue.computed(() => props.parentClass);
      const tmcfg = vue.computed(() => store.tmStore);
      const customCSSStyle = vue.computed(() => computedStyle(props));
      const customClass = vue.computed(() => computedClass(props));
      const isDark = vue.computed(() => computedDark(props, tmcfg.value));
      const _label = vue.computed(() => props.label);
      const _fontSize = vue.computed(() => Number(props.fontSize));
      const appTextColor = vue.inject("appTextColor", vue.computed(() => void 0));
      const textColor = vue.computed(() => {
        if (props.followTheme && store.tmStore.color)
          return store.tmStore.color;
        let isColorHex = themeTool.isCssColor(props.color);
        if (isColorHex)
          return props.color;
        if (props.color && !isColorHex) {
          let nowcolor = themeTool.getColor(props.color);
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
        return vue.openBlock(), vue.createElementBlock("view", {
          "render-whole": true,
          class: vue.normalizeClass(["flex text-view nv", [vue.unref(_parentClass)]]),
          style: { "line-height": "0" }
        }, [
          vue.createElementVNode("view", null, [
            vue.createElementVNode("text", {
              onClick: _cache[0] || (_cache[0] = ($event) => emits("click", $event)),
              selectable: __props.selectable,
              "user-select": __props.selectable,
              class: vue.normalizeClass([__props.fontSize ? "" : "text-size-m", vue.unref(customClass)]),
              style: vue.normalizeStyle([
                {
                  lineHeight: (vue.unref(_fontSize) ? vue.unref(_fontSize) * 1.3 : 42) + props.unit,
                  color: vue.unref(textColor)
                },
                vue.unref(_fontSize) ? { fontSize: vue.unref(_fontSize) + props.unit } : "",
                vue.unref(customCSSStyle)
              ])
            }, [
              vue.renderSlot(_ctx.$slots, "default", {}, () => [
                vue.createTextVNode(vue.toDisplayString(vue.unref(_label)), 1)
              ], true)
            ], 14, ["selectable", "user-select"])
          ])
        ], 2);
      };
    }
  });
  var __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["__scopeId", "data-v-0d77a45e"], ["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-text/tm-text.vue"]]);
  const _sfc_main$p = /* @__PURE__ */ vue.defineComponent({
    __name: "tm-icon",
    props: __spreadProps(__spreadValues({}, custom_props), {
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
      const store = useTmpiniaStore();
      (_b2 = (_a2 = vue.getCurrentInstance()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const tmcfg = vue.computed(() => store.tmStore);
      const customCSSStyle = vue.computed(() => computedStyle(props));
      const customClass = vue.computed(() => computedClass(props));
      const isDark = vue.computed(() => computedDark(props, tmcfg.value));
      vue.computed(() => computedTheme(props, isDark.value, tmcfg.value));
      function clickhandle(e) {
        emits("click", e);
      }
      const appTextColor = vue.inject("appTextColor", vue.computed(() => void 0));
      const textColor = vue.computed(() => {
        if (props.followTheme && store.tmStore.color)
          return store.tmStore.color;
        let isColorHex = themeTool.isCssColor(props.color);
        if (isColorHex)
          return props.color;
        if (props.color && !isColorHex) {
          let nowcolor = themeTool.getColor(props.color);
          return nowcolor.csscolor;
        }
        if (appTextColor.value)
          return appTextColor.value;
        return "rgba(34, 34, 34, 1.0)";
      });
      const fontSizeComputed = vue.computed(() => {
        return { fontSize: (props.fontSize || 30) + props.unit, lineHeight: props.lineHeight > -1 ? props.lineHeight + props.unit : (props.fontSize || 30) + props.unit };
      });
      const isImg = vue.computed(() => {
        if (props.name[0] == "." || props.name[0] == "/" || props.name.substring(0, 5) == "data:" || props.name.substring(0, 4) == "http" || props.name.substring(0, 5) == "https" || props.name.substring(0, 3) == "ftp") {
          return true;
        }
        return false;
      });
      const prefx = vue.computed(() => {
        let prefix = props.name.split("-")[0];
        return prefix;
      });
      const iconComputed = vue.computed(() => {
        if (isImg.value)
          return props.name;
        return props.name;
      });
      const spinComputed = vue.computed(() => props.spin);
      const custom_space_size = vue.inject("custom_space_size", [0, 0]);
      vue.computed(() => Math.ceil(props.fontSize || 34) + custom_space_size[0]);
      vue.computed(() => Math.ceil(props.fontSize || 34) + custom_space_size[1]);
      vue.watch(spinComputed, () => {
      });
      vue.onBeforeMount(() => {
      });
      vue.onMounted(() => {
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", {
          "render-whole": true,
          class: "flex flex-row flex-row-center-center",
          style: vue.normalizeStyle([{
            marginRight: vue.unref(custom_space_size)[0] + "rpx",
            marginBottom: vue.unref(custom_space_size)[1] + "rpx"
          }])
        }, [
          !vue.unref(isImg) ? (vue.openBlock(), vue.createElementBlock("text", {
            key: 0,
            onClick: clickhandle,
            onLongpress: _cache[0] || (_cache[0] = ($event) => emits("longpress", $event)),
            class: vue.normalizeClass([vue.unref(spinComputed) ? "spin" : "", "text-size-n d-inline-block", "tmicon ", vue.unref(prefx), vue.unref(iconComputed), vue.unref(customClass)]),
            style: vue.normalizeStyle([vue.unref(fontSizeComputed), { color: vue.unref(textColor) }, vue.unref(customCSSStyle)])
          }, null, 38)) : vue.createCommentVNode("v-if", true),
          vue.unref(isImg) ? (vue.openBlock(), vue.createElementBlock("image", {
            key: 1,
            "render-whole": true,
            onClick: clickhandle,
            onLongpress: _cache[1] || (_cache[1] = ($event) => emits("longpress", $event)),
            ref: "icon",
            src: vue.unref(iconComputed),
            class: vue.normalizeClass([vue.unref(spinComputed) ? "spin" : "", vue.unref(customClass)]),
            style: vue.normalizeStyle([{ width: (props.fontSize || 30) + props.unit, height: (props.fontSize || 30) + props.unit }, vue.unref(customCSSStyle)])
          }, null, 46, ["src"])) : vue.createCommentVNode("v-if", true)
        ], 4);
      };
    }
  });
  var __easycom_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["__scopeId", "data-v-30747af6"], ["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-icon/tm-icon.vue"]]);
  const _sfc_main$o = /* @__PURE__ */ vue.defineComponent({
    __name: "tm-avatar",
    props: __spreadProps(__spreadValues({}, custom_props), {
      size: {
        type: [Number],
        default: 90
      },
      trigger: {
        type: [Boolean, String],
        default: false
      },
      triggerColor: {
        type: [String],
        default: ""
      },
      triggerIcon: {
        type: [String],
        default: ""
      },
      triggerStyle: {
        type: [String],
        default: ""
      },
      round: {
        type: [Number],
        default: 6
      },
      border: {
        type: [Number],
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
      transprent: {
        type: [Boolean, String],
        default: false
      },
      label: {
        type: String,
        default: ""
      },
      icon: {
        type: String,
        default: ""
      },
      img: {
        type: String,
        default: ""
      },
      fontSize: {
        type: [Number],
        default: 0
      },
      unit: {
        type: String,
        default: "rpx"
      }
    }),
    emits: ["click"],
    setup(__props, { emit: emits }) {
      const props = __props;
      const customCSSStyle = vue.computed(() => computedStyle(props));
      const customClass = vue.computed(() => computedClass(props));
      const width = vue.computed(() => {
        var _a2;
        return (_a2 = props.size) != null ? _a2 : 90;
      });
      const height = vue.computed(() => {
        var _a2;
        return (_a2 = props.size) != null ? _a2 : 90;
      });
      const fontSize = vue.computed(() => {
        var _a2;
        if (props.fontSize)
          return props.fontSize;
        if (props.label)
          return parseInt(String(width.value)) * 0.4;
        if (props.icon)
          return parseInt(String(width.value)) * 0.7;
        return (_a2 = props.size) != null ? _a2 : 90;
      });
      const imgsize = vue.computed(() => {
        return uni.upx2px(fontSize.value - 4) + "px";
      });
      const triggSize = vue.computed(() => {
        let wh = width.value / 3 + 6;
        wh = wh >= 64 ? 64 : wh;
        return {
          size: wh,
          fontSize: wh * 0.5
        };
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", {
          ref: "avatar",
          class: vue.normalizeClass(["flex-col flex", [__props.trigger ? "trigger" : "", `mx-${props.margin[0]} my-${props.margin[1]}`]]),
          style: vue.normalizeStyle({ width: vue.unref(width) + props.unit, height: vue.unref(height) + props.unit })
        }, [
          vue.createVNode(__easycom_7$1, {
            onClick: _cache[0] || (_cache[0] = ($event) => emits("click", $event)),
            color: props.color,
            _class: [vue.unref(customClass), "flex-center flex-col"],
            _style: [vue.unref(customCSSStyle), { flexShrink: 1 }],
            followTheme: props.followTheme,
            dark: props.dark,
            round: props.round,
            shadow: props.shadow,
            outlined: props.outlined,
            border: props.border,
            borderStyle: props.borderStyle,
            borderDirection: props.borderDirection,
            text: props.text,
            transprent: props.img ? true : props.transprent,
            linear: props.linear,
            linearDeep: props.linearDeep,
            width: vue.unref(width),
            height: vue.unref(height),
            margin: [0, 0],
            padding: props.padding,
            unit: props.unit
          }, {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default", {}, () => [
                props.label && !props.icon && !props.img ? (vue.openBlock(), vue.createBlock(__easycom_1, {
                  key: 0,
                  userInteractionEnabled: false,
                  label: props.label,
                  "font-size": vue.unref(fontSize),
                  unit: props.unit
                }, null, 8, ["label", "font-size", "unit"])) : vue.createCommentVNode("v-if", true),
                !props.label && props.icon && !props.img ? (vue.openBlock(), vue.createBlock(__easycom_0$2, {
                  key: 1,
                  userInteractionEnabled: false,
                  name: props.icon,
                  "font-size": vue.unref(fontSize),
                  unit: props.unit
                }, null, 8, ["name", "font-size", "unit"])) : vue.createCommentVNode("v-if", true),
                !props.label && !props.icon && props.img ? (vue.openBlock(), vue.createElementBlock("image", {
                  key: 2,
                  userInteractionEnabled: false,
                  src: props.img,
                  mode: "scaleToFill",
                  style: vue.normalizeStyle({ width: vue.unref(imgsize), height: vue.unref(imgsize) }),
                  class: vue.normalizeClass(["round-" + props.round])
                }, null, 14, ["src"])) : vue.createCommentVNode("v-if", true)
              ], true)
            ]),
            _: 3
          }, 8, ["color", "_class", "_style", "followTheme", "dark", "round", "shadow", "outlined", "border", "borderStyle", "borderDirection", "text", "transprent", "linear", "linearDeep", "width", "height", "padding", "unit"]),
          props.triggerIcon ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            onClick: _cache[1] || (_cache[1] = vue.withModifiers(($event) => emits("click", $event), ["stop"])),
            class: "absolute flex flex-col-bottom-end b-0 r-0",
            style: vue.normalizeStyle({ width: `${vue.unref(width)}${props.unit}` })
          }, [
            vue.createVNode(__easycom_7$1, {
              userInteractionEnabled: false,
              width: vue.unref(triggSize).size,
              height: vue.unref(triggSize).size,
              _style: props.triggerStyle,
              text: props.img ? false : !props.text,
              color: props.triggerColor || props.color,
              transprent: false,
              dark: props.dark,
              _class: "flex-center ",
              margin: [0, 0],
              padding: [0, 0],
              round: 24,
              unit: props.unit
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(__easycom_0$2, {
                  name: props.triggerIcon,
                  "font-size": vue.unref(triggSize).fontSize,
                  unit: props.unit
                }, null, 8, ["name", "font-size", "unit"])
              ]),
              _: 1
            }, 8, ["width", "height", "_style", "text", "color", "dark", "unit"])
          ], 4)) : vue.createCommentVNode("v-if", true)
        ], 6);
      };
    }
  });
  var __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["__scopeId", "data-v-92d6ec94"], ["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-avatar/tm-avatar.vue"]]);
  const _sfc_main$n = /* @__PURE__ */ vue.defineComponent({
    __name: "tm-navbar",
    props: __spreadProps(__spreadValues({}, custom_props), {
      followTheme: {
        type: [Boolean, String],
        default: true
      },
      transprent: {
        type: [Boolean, String],
        default: false
      },
      color: {
        type: [String],
        default: "white"
      },
      text: {
        type: [Boolean],
        default: false
      },
      border: {
        type: [Number],
        default: 0
      },
      shadow: {
        type: [Number],
        default: 1
      },
      borderDirection: {
        type: String,
        default: "bottom"
      },
      round: {
        type: [Number],
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
        type: [Number],
        default: 44
      },
      leftWidth: {
        type: [Number],
        default: 220
      },
      rightWidth: {
        type: [Number],
        default: 220
      },
      fontSize: {
        type: [Number],
        default: 30
      },
      iconFontSize: {
        type: [Number],
        default: 37
      },
      title: {
        type: [String],
        default: "\u6807\u9898\u6807\u9898\u6807\u9898\u6807\u9898\u6807\u9898\u6807\u9898\u6807\u9898\u6807\u9898\u6807\u9898\u6807\u9898\u6807\u9898\u6807\u9898\u6807\u9898\u6807\u9898\u6807\u9898\u6807\u9898"
      },
      fontColor: {
        type: [String],
        default: ""
      },
      homeColor: {
        type: [String],
        default: ""
      },
      hideHome: {
        type: Boolean,
        default: false
      },
      hideBack: {
        type: Boolean,
        default: true
      },
      homePath: {
        type: [String],
        default: "/pages/index/index"
      },
      beforeBack: {
        type: [Boolean, Function],
        default: () => true
      },
      blur: {
        type: Boolean,
        default: false
      },
      unit: {
        type: String,
        default: "rpx"
      }
    }),
    emits: ["click", "close"],
    setup(__props, { emit: emits }) {
      var _a2, _b2;
      const props = __props;
      useTmpiniaStore();
      (_b2 = (_a2 = vue.getCurrentInstance()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const _height = vue.computed(() => props.height);
      const _width = uni.getSystemInfoSync().windowWidth;
      const statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
      const _barHeight = vue.computed(() => statusBarHeight + _height.value);
      const _leftWidth = vue.computed(() => props.leftWidth);
      const _rightWidth = vue.computed(() => props.rightWidth);
      const contentwidth = vue.computed(() => {
        return _width - uni.upx2px(_leftWidth.value) - uni.upx2px(_rightWidth.value);
      });
      const _title = vue.computed(() => props.title);
      const _fontColor = vue.computed(() => props.fontColor);
      vue.computed(() => props.homeColor);
      const _blur = vue.computed(() => props.blur);
      const _pages = vue.ref(0);
      vue.onMounted(() => {
        _pages.value = getCurrentPages().length;
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createElementVNode("view", {
            class: "statusHeight",
            style: vue.normalizeStyle({ height: vue.unref(_barHeight) + "px" })
          }, null, 4),
          vue.createElementVNode("view", {
            class: "fixed l-0 t-0 statusHeightTop flex",
            style: vue.normalizeStyle({ width: vue.unref(_width) + "px", height: vue.unref(_barHeight) + "px" })
          }, [
            vue.createVNode(__easycom_7$1, {
              onClick: _cache[0] || (_cache[0] = ($event) => emits("click", $event)),
              blur: vue.unref(_blur),
              color: props.color,
              _class: _ctx._class,
              _style: _ctx._style,
              followTheme: props.followTheme,
              "follow-dark": props.followDark,
              dark: props.dark,
              round: props.round,
              shadow: props.shadow,
              outlined: props.outlined,
              border: props.border,
              borderStyle: props.borderStyle,
              borderDirection: props.borderDirection,
              text: props.text,
              transprent: props.transprent,
              linear: props.linear,
              linearDeep: props.linearDeep,
              margin: props.margin,
              padding: props.padding,
              height: vue.unref(_barHeight),
              width: vue.unref(_width),
              unit: "px"
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", {
                  class: "statusHeight",
                  style: vue.normalizeStyle({ height: vue.unref(statusBarHeight) + "px" })
                }, null, 4),
                vue.createElementVNode("view", { class: "flex flex-row flex-1 flex-row flex-row-center-between" }, [
                  vue.createElementVNode("view", {
                    class: "flex-row flex flex-row-center-start",
                    style: vue.normalizeStyle({ width: vue.unref(_leftWidth) + "rpx" })
                  }, [
                    vue.createCommentVNode(' 						<tm-icon :unit="props.unit" :font-size="props.iconFontSize" _class="pointer pb-12 pt-12 px-24" :color="_homeColor" @click="goback" v-if="_pages>1&&props.hideBack" name="tmicon-angle-left"></tm-icon>\r\n						<tm-icon :unit="props.unit" _class="pointer  pb-12 pt-12 px-24" @click="backhome" v-if="_pages==1&&!hideHome" :color="_homeColor" :font-size="props.iconFontSize" name="tmicon-md-home"></tm-icon>\r\n '),
                    vue.renderSlot(_ctx.$slots, "left", {}, void 0, true)
                  ], 4),
                  vue.createElementVNode("view", {
                    class: "flex flex-row-center-center",
                    style: vue.normalizeStyle({ width: vue.unref(contentwidth) + "px" })
                  }, [
                    vue.renderSlot(_ctx.$slots, "default", {}, () => [
                      vue.createVNode(__easycom_1, {
                        unit: props.unit,
                        _class: "text-weight-b text-overflow-1",
                        color: vue.unref(_fontColor),
                        "font-size": props.fontSize,
                        label: vue.unref(_title)
                      }, null, 8, ["unit", "color", "font-size", "label"])
                    ], true)
                  ], 4),
                  vue.createElementVNode("view", {
                    class: "flex-row flex flex-row-center-end",
                    style: vue.normalizeStyle({ width: vue.unref(_rightWidth) + "rpx" })
                  }, [
                    vue.renderSlot(_ctx.$slots, "right", {}, void 0, true)
                  ], 4)
                ])
              ]),
              _: 3
            }, 8, ["blur", "color", "_class", "_style", "followTheme", "follow-dark", "dark", "round", "shadow", "outlined", "border", "borderStyle", "borderDirection", "text", "transprent", "linear", "linearDeep", "margin", "padding", "height", "width"])
          ], 4)
        ]);
      };
    }
  });
  var __easycom_2 = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["__scopeId", "data-v-1a3e7f64"], ["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-navbar/tm-navbar.vue"]]);
  const _sfc_main$m = /* @__PURE__ */ vue.defineComponent({
    __name: "tm-divider",
    props: __spreadProps(__spreadValues({}, custom_props), {
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
      const borderDir = vue.computed(() => props.vertical ? "left" : "bottom");
      const _label = vue.computed(() => props.label);
      (_b2 = (_a2 = vue.getCurrentInstance()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const tmcfg = vue.computed(() => store.tmStore);
      const _realColor = vue.computed(() => props.realColor);
      const isDark = vue.computed(() => computedDark(__spreadProps(__spreadValues({}, props), { borderDirection: borderDir.value }), tmcfg.value));
      const tmcomputed = vue.computed(() => computedTheme(__spreadProps(__spreadValues({}, props), { borderDirection: borderDir.value }), isDark.value, tmcfg.value));
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", null, [
          !vue.unref(_label) && props.vertical ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            style: vue.normalizeStyle([{ backgroundColor: vue.unref(_realColor) ? vue.unref(tmcomputed).color : vue.unref(tmcomputed).border }, props.vertical ? { width: props.border + "rpx", height: props.height + "rpx" } : ""]),
            class: vue.normalizeClass([props.vertical ? `mx-${props.margin[0]}` : `my-${props.margin[1]}`])
          }, null, 6)) : vue.createCommentVNode("v-if", true),
          vue.unref(_label) && !props.vertical ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "flex flex-row flex-center"
          }, [
            vue.createElementVNode("view", {
              style: vue.normalizeStyle([vue.unref(tmcomputed) ? { backgroundColor: vue.unref(_realColor) ? vue.unref(tmcomputed).color : vue.unref(tmcomputed).border, height: props.border + "rpx" } : ""]),
              class: vue.normalizeClass([`my-${props.margin[1]}`, __props.align == "left" ? "flex-2" : "", __props.align == "right" ? "flex-10" : "", __props.align == "center" ? "flex-1" : ""])
            }, null, 6),
            props.label ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: vue.normalizeClass([vue.unref(isDark) ? "opacity-4" : ""])
            }, [
              vue.createVNode(__easycom_1, {
                fontSize: props.fontSize,
                dark: vue.unref(isDark),
                followTheme: props.followTheme,
                color: props.fontColor,
                label: props.label,
                _class: ["mx-32"]
              }, null, 8, ["fontSize", "dark", "followTheme", "color", "label"])
            ], 2)) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode("view", {
              style: vue.normalizeStyle([vue.unref(tmcomputed) ? { backgroundColor: vue.unref(_realColor) ? vue.unref(tmcomputed).color : vue.unref(tmcomputed).border, height: props.border + "rpx" } : ""]),
              class: vue.normalizeClass([`my-${props.margin[1]}`, __props.align == "left" ? "flex-10" : "", __props.align == "right" ? "flex-2" : "", __props.align == "center" ? "flex-1" : ""])
            }, null, 6)
          ])) : vue.createCommentVNode("v-if", true),
          !vue.unref(_label) && !props.vertical ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 2,
            class: "flex flex-row flex-center"
          }, [
            vue.createElementVNode("view", {
              class: vue.normalizeClass(["flex-1", [`my-${props.margin[1]}`]]),
              style: vue.normalizeStyle([vue.unref(tmcomputed) ? { backgroundColor: vue.unref(_realColor) ? vue.unref(tmcomputed).color : vue.unref(tmcomputed).border, height: props.border + "rpx" } : ""])
            }, null, 6)
          ])) : vue.createCommentVNode("v-if", true)
        ]);
      };
    }
  });
  var tmDivider = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-divider/tm-divider.vue"]]);
  const _sfc_main$l = /* @__PURE__ */ vue.defineComponent({
    __name: "tm-translate",
    props: __spreadProps(__spreadValues({}, custom_props), {
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
      function hanlder(e) {
        emits("click", e);
      }
      (_b2 = (_a2 = vue.getCurrentInstance()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const customCSSStyle = vue.computed(() => computedStyle(props));
      const customClass = vue.computed(() => computedClass(props));
      const computedHeight = vue.computed(() => {
        if (!props.height || !Number(props.height)) {
          return 0;
        }
        if (String(props.height).indexOf("px") > -1 || String(props.height).indexOf("rpx") > -1) {
          return String(props.height);
        }
        return String(props.height) + "rpx";
      });
      const computedWidth = vue.computed(() => {
        if (!props.width) {
          return 0;
        }
        if (String(props.width).indexOf("px") > -1 || String(props.width).indexOf("rpx") > -1) {
          return props.width;
        }
        return props.width + "rpx";
      });
      const animationName = vue.computed(() => props.name || "fade");
      const durationtos = vue.computed(() => props.duration);
      const computedReverse = vue.computed(() => props.reverse);
      const reverseAniPrefxname = vue.computed(() => computedReverse.value ? "-reverse" : "");
      const animationStatus = vue.ref(0);
      const tmid = vue.ref(Number(uni.$tm.u.getUid(3)));
      const isLoadEl = vue.ref(false);
      const animationData = vue.ref(null);
      vue.watch(() => props.initByWechat, () => {
        reset();
      });
      function init() {
        vue.nextTick(() => {
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
        noNvueAmations();
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
      vue.onMounted(() => init());
      vue.onUnmounted(() => {
        clearTimeout(tmid.value);
        animationStatus.value = 0;
      });
      function noNvueAmations() {
        animationData.value = null;
        vue.nextTick(function() {
          var animation2 = uni.createAnimation({
            duration: durationtos.value,
            timingFunction: "ease",
            delay: 30
          });
          clearTimeout(tmid.value);
          if (animationName.value == "fade") {
            let opacity = computedReverse.value ? 1 : 0;
            animation2.opacity(opacity).step({
              duration: 0
            });
          } else if (animationName.value == "up") {
            let opacity = computedReverse.value ? "-101%" : "0%";
            animation2.translateY(opacity).opacity(1).step({
              duration: 0
            });
          } else if (animationName.value == "down") {
            let opacity = computedReverse.value ? "101%" : "0%";
            animation2.translateY(opacity).opacity(1).step({
              duration: 0
            });
          } else if (animationName.value == "left") {
            let opacity = computedReverse.value ? "-101%" : "0%";
            animation2.translateX(opacity).opacity(1).step({
              duration: 0
            });
          } else if (animationName.value == "right") {
            let opacity = computedReverse.value ? "101%" : "0";
            animation2.translateX(opacity).opacity(1).step({
              duration: 0
            });
          } else if (animationName.value == "zoom") {
            let scale = computedReverse.value ? [1, 1] : [0.8, 0.8];
            let opacity = computedReverse.value ? 1 : 0;
            animation2.scale(...scale).opacity(opacity).step({
              duration: 0
            });
          }
          animationData.value = animation2.export();
          tmid.value = setTimeout(function() {
            if (animationName.value == "fade") {
              let opacity = computedReverse.value ? 0 : 1;
              animation2.opacity(opacity).step();
            } else if (animationName.value == "up") {
              let opacity = computedReverse.value ? "0%" : "-101%";
              animation2.translateY(opacity).opacity(1).step();
            } else if (animationName.value == "down") {
              let opacity = computedReverse.value ? "0%" : "101%";
              animation2.translateY(opacity).opacity(1).step();
            } else if (animationName.value == "left") {
              let opacity = computedReverse.value ? "0%" : "-101%";
              animation2.translateX(opacity).opacity(1).step();
            } else if (animationName.value == "right") {
              let opacity = computedReverse.value ? "0" : "101%";
              animation2.translateX(opacity).opacity(1).step();
            } else if (animationName.value == "zoom") {
              let scale = computedReverse.value ? [0.8, 0.8] : [1, 1];
              let opacity = computedReverse.value ? 0 : 1;
              animation2.scale(...scale).opacity(opacity).step();
            }
            emits("start");
            animationData.value = animation2.export();
            animationStatus.value = 1;
            clearTimeout(tmid.value);
            tmid.value = setTimeout(function() {
              emits("end");
              animationStatus.value = 2;
            }, durationtos.value);
          }, 50);
        });
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", {
          ref: "bodywk",
          onClick: hanlder,
          class: vue.normalizeClass([vue.unref(customClass), "overflow"]),
          style: vue.normalizeStyle([
            vue.unref(computedHeight) ? { height: vue.unref(computedHeight) } : "",
            vue.unref(computedWidth) ? { width: vue.unref(computedWidth) } : "",
            vue.unref(customCSSStyle)
          ])
        }, [
          isLoadEl.value ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            ref: "nvueElAni",
            animation: animationData.value,
            class: vue.normalizeClass([
              "flex-col flex trani",
              vue.unref(animationName) + vue.unref(reverseAniPrefxname),
              vue.unref(customClass)
            ])
          }, [
            vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ], 10, ["animation"])) : vue.createCommentVNode("v-if", true)
        ], 6);
      };
    }
  });
  var tmTranslate = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["__scopeId", "data-v-7cafae9a"], ["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-translate/tm-translate.vue"]]);
  const _sfc_main$k = /* @__PURE__ */ vue.defineComponent({
    __name: "tm-image",
    props: __spreadProps(__spreadValues({}, custom_props), {
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
      var _a2, _b2, _c2;
      const props = __props;
      const aniplay = vue.ref(null);
      const proxy = (_b2 = (_a2 = vue.getCurrentInstance()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      if (!props.height && !props.width) {
        formatAppLog("error", "at tmui/components/tm-image/tm-image.vue:163", "\u9519\u8BEF\uFF1A\u56FE\u7247\u5BBD\u5EA6\u548C\u9AD8\u5EA6\u5FC5\u987B\u8BBE\u7F6E\u4E00\u4E2A");
      }
      const img_width = vue.computed(() => {
        return props.width;
      });
      const img_height = vue.computed(() => {
        return props.height - props.padding[1];
      });
      const img_src = vue.computed(() => props.src);
      const loading = vue.ref(true);
      const error = vue.ref(false);
      const isRmove = vue.ref(false);
      let parent = proxy == null ? void 0 : proxy.$parent;
      while (parent) {
        if ((parent == null ? void 0 : parent.tmImageGroup) == "tmImageGroup" || !parent) {
          break;
        } else {
          parent = (_c2 = parent == null ? void 0 : parent.$parent) != null ? _c2 : void 0;
        }
      }
      const ImagGrupList = vue.inject("ImagGrupList", vue.computed(() => []));
      if (parent == null ? void 0 : parent.pushKey) {
        parent.pushKey({
          width: img_width.value,
          height: img_width.value,
          src: props.src
        });
      }
      vue.watch(img_src, () => {
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
        formatAppLog("error", "at tmui/components/tm-image/tm-image.vue:214", "\u56FE\u7247\u52A0\u8F7D\u9519:" + props.src, event);
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
      async function del2() {
        var _a3, _b3;
        isRmove.value = false;
        if (!props.allowDelete) {
          emits("delete", props.src);
          return;
        }
        if ((_a3 = aniplay.value) == null ? void 0 : _a3.play) {
          (_b3 = aniplay.value) == null ? void 0 : _b3.play();
        } else {
          isRmove.value = true;
          emits("close", props.src);
        }
      }
      function aniEnd() {
        isRmove.value = true;
        emits("close", props.src);
      }
      return (_ctx, _cache) => {
        return !isRmove.value ? (vue.openBlock(), vue.createBlock(tmTranslate, {
          key: 0,
          width: vue.unref(img_width) + props.padding[0] * 2 + props.unit,
          onEnd: aniEnd,
          ref_key: "aniplay",
          ref: aniplay,
          autoPlay: false,
          name: "zoom",
          reverse: ""
        }, {
          default: vue.withCtx(() => [
            vue.createVNode(__easycom_7$1, {
              color: props.color,
              transprent: props.transprent,
              margin: props.margin,
              round: props.round,
              border: props.border,
              padding: [props.padding[0], 0],
              class: vue.normalizeClass(["round-" + props.round]),
              width: vue.unref(img_width) - props.padding[0] * 2,
              unit: props.unit
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", {
                  class: vue.normalizeClass([`pb-${props.padding[1]}`])
                }, [
                  loading.value ? (vue.openBlock(), vue.createElementBlock("image", {
                    key: 0,
                    src: vue.unref(img_src),
                    style: { "width": "10px", "height": "10px", "opacity": "0", "transform": "translateX(1200px)" },
                    onLoad: imageLoad,
                    onError: imageError,
                    mode: "scaleToFill"
                  }, null, 40, ["src"])) : vue.createCommentVNode("v-if", true),
                  !loading.value && !error.value ? (vue.openBlock(), vue.createElementBlock("image", {
                    key: 1,
                    "show-menu-by-longpress": props.showMenuByLongPress,
                    onClick: imageClick,
                    class: vue.normalizeClass(["round-" + props.round]),
                    src: vue.unref(img_src),
                    style: vue.normalizeStyle([{ width: vue.unref(img_width) + props.unit, height: vue.unref(img_height) + props.unit }]),
                    mode: props.model
                  }, null, 14, ["show-menu-by-longpress", "src", "mode"])) : vue.createCommentVNode("v-if", true),
                  loading.value && !error.value ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 2,
                    style: vue.normalizeStyle([{ width: vue.unref(img_width) + props.unit, height: vue.unref(img_height) + props.unit }]),
                    class: "flex flex-center opacity-3"
                  }, [
                    props.showLoad ? (vue.openBlock(), vue.createBlock(__easycom_0$2, {
                      key: 0,
                      "font-size": 26,
                      spin: "",
                      name: "tmicon-loading"
                    })) : vue.createCommentVNode("v-if", true)
                  ], 4)) : vue.createCommentVNode("v-if", true),
                  vue.renderSlot(_ctx.$slots, "error", {}, () => [
                    !loading.value && error.value ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 0,
                      style: vue.normalizeStyle([{ width: vue.unref(img_width) + props.unit, height: vue.unref(img_height) + props.unit }]),
                      class: "flex flex-col flex-center opacity-5"
                    }, [
                      vue.createVNode(__easycom_0$2, { name: "tmicon-exclamation-circle" }),
                      vue.createVNode(__easycom_1, {
                        _class: "pt-10",
                        "font-size": 26,
                        label: props.errorLabel
                      }, null, 8, ["label"])
                    ], 4)) : vue.createCommentVNode("v-if", true)
                  ]),
                  vue.createCommentVNode(" extra "),
                  props.extra ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 3,
                    onClick: vue.withModifiers(imageClick, ["stop"]),
                    class: vue.normalizeClass([
                      props.extraPosition == "in" ? "absolute l-0 b-0 zIndex-5" : "",
                      "flex flex-col flex-col-bottom-start"
                    ]),
                    style: vue.normalizeStyle([
                      props.extra && props.extraPosition == "in" ? { height: vue.unref(img_height) + props.unit, width: vue.unref(img_width) + props.unit } : "",
                      props.extra && props.extraPosition == "out" ? { width: vue.unref(img_width) + props.unit } : ""
                    ])
                  }, [
                    vue.renderSlot(_ctx.$slots, "extra")
                  ], 14, ["onClick"])) : vue.createCommentVNode("v-if", true),
                  vue.createCommentVNode(" delete \u5C55\u793A\u5220\u9664\u6309\u94AE\u3002 "),
                  props.delete ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 4,
                    class: "absolute r-10 t-10 flex flex-col flex-col-center-end zIndex-10",
                    style: vue.normalizeStyle([props.delete ? { width: vue.unref(img_width) + props.unit } : ""])
                  }, [
                    vue.createVNode(__easycom_0$2, {
                      onClick: del2,
                      color: "red",
                      name: "tmicon-times-circle-fill"
                    })
                  ], 4)) : vue.createCommentVNode("v-if", true)
                ], 2)
              ]),
              _: 3
            }, 8, ["color", "transprent", "margin", "round", "border", "padding", "class", "width", "unit"])
          ]),
          _: 3
        }, 8, ["width"])) : vue.createCommentVNode("v-if", true);
      };
    }
  });
  var __easycom_9 = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-image/tm-image.vue"]]);
  var listItemType = /* @__PURE__ */ ((listItemType2) => {
    listItemType2["img"] = "img";
    listItemType2["video"] = "video";
    return listItemType2;
  })(listItemType || {});
  const _sfc_main$j = /* @__PURE__ */ vue.defineComponent({
    __name: "tm-carousel",
    props: {
      followTheme: {
        type: Boolean,
        default: true
      },
      color: {
        type: String,
        default: "primary"
      },
      width: {
        type: Number,
        default: 750
      },
      height: {
        type: Number,
        default: 500
      },
      round: {
        type: Number,
        default: 0
      },
      margin: {
        type: Array,
        default: () => [0, 0]
      },
      list: {
        type: Array,
        default: () => []
      },
      rangKey: {
        type: String,
        default: "url"
      },
      defaultValue: {
        type: Number,
        default: 0
      },
      dotPosition: {
        type: String,
        default: "bottom"
      },
      align: {
        type: String,
        default: "center"
      },
      model: {
        type: String,
        default: "number"
      },
      interval: {
        type: Number,
        default: 5e3
      },
      duration: {
        type: Number,
        default: 500
      },
      circular: {
        type: Boolean,
        default: true
      },
      vertical: {
        type: Boolean,
        default: false
      },
      acceleration: {
        type: Boolean,
        default: false
      },
      disableProgrammaticAnimation: {
        type: Boolean,
        default: false
      },
      autoplay: {
        type: Boolean,
        default: true
      },
      displayMultipleItems: {
        type: Number,
        default: 1
      },
      skipHiddenItemLayout: {
        type: Boolean,
        default: false
      },
      disableTouch: {
        type: Boolean,
        default: false
      },
      touchable: {
        type: Boolean,
        default: false
      },
      indicatorDots: {
        type: Boolean,
        default: true
      },
      showLoad: {
        type: Boolean,
        default: true
      }
    },
    emits: ["change", "click"],
    setup(__props, { emit: emits }) {
      var _a2, _b2;
      const props = __props;
      (_b2 = (_a2 = vue.getCurrentInstance()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const _list = vue.computed(() => {
        let l = [];
        props.list.forEach((el) => {
          var _a3, _b3;
          if (typeof el == "string") {
            l.push({
              url: el,
              type: listItemType.img
            });
          } else if (typeof el === "object") {
            l.push(__spreadValues({
              url: el[props.rangKey],
              type: (_a3 = el == null ? void 0 : el.type) != null ? _a3 : listItemType.img,
              img: (_b3 = el == null ? void 0 : el.img) != null ? _b3 : ""
            }, el));
          }
        });
        return l;
      });
      const _current = vue.ref(props.defaultValue || 0);
      const _currentActive = vue.ref(props.defaultValue || 0);
      const _model = vue.computed(() => props.model);
      const _dotPosition = vue.computed(() => props.dotPosition);
      const _align = vue.computed(() => props.align);
      const _autoplay = vue.computed(() => props.autoplay);
      function sliderChange(e) {
        var _a3, _b3;
        if (!_autoplay.value) {
          _current.value = (_a3 = e == null ? void 0 : e.detail) == null ? void 0 : _a3.current;
        }
        _currentActive.value = (_b3 = e == null ? void 0 : e.detail) == null ? void 0 : _b3.current;
        vue.nextTick(() => {
          emits("change", _currentActive.value);
        });
      }
      function dotClick(index) {
        _currentActive.value = index;
        if (!_autoplay.value) {
          _current.value = index;
        }
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "flex flex-col flex-col-center-center" }, [
          vue.createElementVNode("view", {
            class: vue.normalizeClass(["relative overflow", [`round-${props.round} mx-${props.margin[0]} my-${props.margin[1]}`]]),
            style: vue.normalizeStyle([
              { width: `${props.width}rpx`, height: `${props.height}rpx` }
            ])
          }, [
            vue.createElementVNode("swiper", {
              "indicator-dots": false,
              interval: props.interval,
              duration: props.duration,
              circular: props.circular,
              vertical: props.vertical,
              acceleration: props.acceleration,
              disableProgrammaticAnimation: props.disableProgrammaticAnimation,
              autoplay: vue.unref(_autoplay),
              displayMultipleItems: props.displayMultipleItems,
              skipHiddenItemLayout: props.skipHiddenItemLayout,
              disableTouch: props.disableTouch,
              touchable: props.touchable,
              onChange: sliderChange,
              class: vue.normalizeClass(`round-${props.round}`),
              current: _current.value,
              style: vue.normalizeStyle([
                { width: `${props.width}rpx`, height: `${props.height}rpx` }
              ])
            }, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(_list), (item, index) => {
                return vue.openBlock(), vue.createElementBlock("swiper-item", {
                  class: vue.normalizeClass(`round-${props.round}`),
                  onClick: ($event) => emits("click", index),
                  key: index,
                  style: vue.normalizeStyle([
                    { width: `${props.width}rpx`, height: `${props.height}rpx` }
                  ])
                }, [
                  item.type == vue.unref(listItemType).img ? (vue.openBlock(), vue.createBlock(__easycom_9, {
                    key: 0,
                    round: props.round,
                    userInteractionEnabled: false,
                    showLoad: props.showLoad,
                    src: item.url,
                    width: props.width,
                    height: props.height
                  }, null, 8, ["round", "showLoad", "src", "width", "height"])) : vue.createCommentVNode("v-if", true),
                  item.type == vue.unref(listItemType).video && item.img && _currentActive.value != index ? (vue.openBlock(), vue.createBlock(__easycom_9, {
                    key: 1,
                    round: props.round,
                    userInteractionEnabled: false,
                    showLoad: props.showLoad,
                    src: item.img,
                    width: props.width,
                    height: props.height
                  }, null, 8, ["round", "showLoad", "src", "width", "height"])) : vue.createCommentVNode("v-if", true),
                  item.type == vue.unref(listItemType).video && _currentActive.value === index ? (vue.openBlock(), vue.createElementBlock("video", {
                    key: 2,
                    userInteractionEnabled: false,
                    id: "video",
                    src: item.url,
                    style: vue.normalizeStyle([
                      { width: `${props.width}rpx`, height: `${props.height}rpx` }
                    ]),
                    autoplay: _currentActive.value === index,
                    class: vue.normalizeClass(`round-${props.round}`)
                  }, null, 14, ["src", "autoplay"])) : vue.createCommentVNode("v-if", true)
                ], 14, ["onClick"]);
              }), 128))
            ], 46, ["interval", "duration", "circular", "vertical", "acceleration", "disableProgrammaticAnimation", "autoplay", "displayMultipleItems", "skipHiddenItemLayout", "disableTouch", "touchable", "current"]),
            vue.createCommentVNode(" dot "),
            vue.unref(_model) == "dot" && props.indicatorDots ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: vue.normalizeClass(["absolute", [
                vue.unref(_dotPosition) == "bottom" || vue.unref(_dotPosition) == "top" ? "flex flex-row " : "",
                vue.unref(_dotPosition) == "left" || vue.unref(_dotPosition) == "right" ? "flex flex-col " : "",
                vue.unref(_align) == "center" ? "flex-center" : "",
                vue.unref(_align) == "left" ? "flex-row-center-start " : "",
                vue.unref(_align) == "right" ? "flex-row-center-end " : "",
                vue.unref(_dotPosition) == "left" && vue.unref(_align) == "left" ? "ml-12 mt-24" : "",
                vue.unref(_dotPosition) == "left" && vue.unref(_align) == "right" ? "ml-12 pb-24" : "",
                vue.unref(_dotPosition) == "right" && vue.unref(_align) == "left" ? "pr-12 mt-24" : "",
                vue.unref(_dotPosition) == "right" && vue.unref(_align) == "right" ? "pr-12 pb-24" : "",
                vue.unref(_dotPosition) == "bottom" && vue.unref(_align) == "left" ? "ml-12 mb-24" : "",
                vue.unref(_dotPosition) == "bottom" && vue.unref(_align) == "right" ? "pr-12 mb-24" : "",
                vue.unref(_dotPosition) == "top" && vue.unref(_align) == "left" ? "ml-12 " : "",
                vue.unref(_dotPosition) == "top" && vue.unref(_align) == "right" ? "pr-12 " : ""
              ]]),
              style: vue.normalizeStyle([
                vue.unref(_dotPosition) == "bottom" ? { left: "0px", bottom: "0px", width: `${props.width}rpx`, height: `${60}rpx` } : "",
                vue.unref(_dotPosition) == "top" ? { left: "0px", top: "0px", width: `${props.width}rpx`, height: `${60}rpx` } : "",
                vue.unref(_dotPosition) == "left" ? { left: "0px", top: "0px", width: `${60}rpx`, height: `${props.height}rpx` } : "",
                vue.unref(_dotPosition) == "right" ? { right: "0px", top: "0px", width: `${60}rpx`, height: `${props.height}rpx` } : ""
              ])
            }, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(_list), (item, index) => {
                return vue.openBlock(), vue.createBlock(__easycom_7$1, {
                  margin: [10, 10],
                  "follow-theme": _currentActive.value == index ? props.followTheme : false,
                  padding: [0, 0],
                  round: 10,
                  onClick: ($event) => dotClick(index),
                  color: _currentActive.value == index ? props.color : "white",
                  key: index,
                  width: 18,
                  height: 18
                }, null, 8, ["follow-theme", "onClick", "color"]);
              }), 128))
            ], 6)) : vue.createCommentVNode("v-if", true),
            vue.createCommentVNode(" rect "),
            vue.unref(_model) == "rect" && props.indicatorDots ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: vue.normalizeClass(["absolute", [
                vue.unref(_dotPosition) == "bottom" || vue.unref(_dotPosition) == "top" ? "flex flex-row " : "",
                vue.unref(_dotPosition) == "left" || vue.unref(_dotPosition) == "right" ? "flex flex-col " : "",
                vue.unref(_align) == "center" ? "flex-center" : "",
                vue.unref(_align) == "left" ? "flex-row-center-start " : "",
                vue.unref(_align) == "right" ? "flex-row-center-end " : "",
                vue.unref(_dotPosition) == "left" && vue.unref(_align) == "left" ? "ml-12 mt-24" : "",
                vue.unref(_dotPosition) == "left" && vue.unref(_align) == "right" ? "ml-12 pb-24" : "",
                vue.unref(_dotPosition) == "right" && vue.unref(_align) == "left" ? "pr-12 mt-24" : "",
                vue.unref(_dotPosition) == "right" && vue.unref(_align) == "right" ? "pr-12 pb-24" : "",
                vue.unref(_dotPosition) == "bottom" && vue.unref(_align) == "left" ? "ml-12 mb-24" : "",
                vue.unref(_dotPosition) == "bottom" && vue.unref(_align) == "right" ? "pr-12 mb-24" : "",
                vue.unref(_dotPosition) == "top" && vue.unref(_align) == "left" ? "ml-12 " : "",
                vue.unref(_dotPosition) == "top" && vue.unref(_align) == "right" ? "pr-12 " : ""
              ]]),
              style: vue.normalizeStyle([
                vue.unref(_dotPosition) == "bottom" ? { left: "0px", bottom: "0px", width: `${props.width}rpx`, height: `${60}rpx` } : "",
                vue.unref(_dotPosition) == "top" ? { left: "0px", top: "0px", width: `${props.width}rpx`, height: `${60}rpx` } : "",
                vue.unref(_dotPosition) == "left" ? { left: "0px", top: "0px", width: `${60}rpx`, height: `${props.height}rpx` } : "",
                vue.unref(_dotPosition) == "right" ? { right: "0px", top: "0px", width: `${60}rpx`, height: `${props.height}rpx` } : ""
              ])
            }, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(_list), (item, index) => {
                return vue.openBlock(), vue.createBlock(__easycom_7$1, {
                  round: index == 0 || index == vue.unref(_list).length - 1 ? 10 : 0,
                  margin: vue.unref(_dotPosition) == "left" || vue.unref(_dotPosition) == "right" ? [10, 0] : [0, 10],
                  padding: [0, 0],
                  onClick: ($event) => dotClick(index),
                  "follow-theme": _currentActive.value == index ? props.followTheme : false,
                  color: _currentActive.value == index ? props.color : "white",
                  key: index,
                  width: vue.unref(_dotPosition) == "left" || vue.unref(_dotPosition) == "right" ? 6 : 36,
                  height: vue.unref(_dotPosition) == "left" || vue.unref(_dotPosition) == "right" ? 36 : 6
                }, null, 8, ["round", "margin", "onClick", "follow-theme", "color", "width", "height"]);
              }), 128))
            ], 6)) : vue.createCommentVNode("v-if", true),
            vue.createCommentVNode(" number "),
            vue.unref(_model) == "number" && props.indicatorDots ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 2,
              class: vue.normalizeClass(["absolute", [
                vue.unref(_dotPosition) == "bottom" || vue.unref(_dotPosition) == "top" ? "flex flex-row " : "",
                vue.unref(_dotPosition) == "left" || vue.unref(_dotPosition) == "right" ? "flex flex-col " : "",
                vue.unref(_align) == "center" ? "flex-center" : "",
                vue.unref(_align) == "left" ? "flex-row-center-start " : "",
                vue.unref(_align) == "right" ? "flex-row-center-end " : "",
                vue.unref(_dotPosition) == "left" && vue.unref(_align) == "left" ? "ml-12 mt-24" : "",
                vue.unref(_dotPosition) == "left" && vue.unref(_align) == "right" ? "ml-12 pb-24" : "",
                vue.unref(_dotPosition) == "right" && vue.unref(_align) == "left" ? "pr-12 mt-24" : "",
                vue.unref(_dotPosition) == "right" && vue.unref(_align) == "right" ? "pr-12 pb-24" : "",
                vue.unref(_dotPosition) == "bottom" && vue.unref(_align) == "left" ? "ml-12 mb-24" : "",
                vue.unref(_dotPosition) == "bottom" && vue.unref(_align) == "right" ? "pr-12 mb-24" : "",
                vue.unref(_dotPosition) == "top" && vue.unref(_align) == "left" ? "ml-12 " : "",
                vue.unref(_dotPosition) == "top" && vue.unref(_align) == "right" ? "pr-12 " : ""
              ]]),
              style: vue.normalizeStyle([
                vue.unref(_dotPosition) == "bottom" ? { left: "0px", bottom: "0px", width: `${props.width}rpx`, height: `${60}rpx` } : "",
                vue.unref(_dotPosition) == "top" ? { left: "0px", top: "0px", width: `${props.width}rpx`, height: `${60}rpx` } : "",
                vue.unref(_dotPosition) == "left" ? { left: "0px", top: "0px", width: `${60}rpx`, height: `${props.height}rpx` } : "",
                vue.unref(_dotPosition) == "right" ? { right: "0px", top: "0px", width: `${60}rpx`, height: `${props.height}rpx` } : ""
              ])
            }, [
              vue.createElementVNode("view", {
                class: vue.normalizeClass(["round-10", [
                  vue.unref(_dotPosition) == "left" || vue.unref(_dotPosition) == "right" ? "px-5 py-24 " : "",
                  vue.unref(_dotPosition) == "bottom" || vue.unref(_dotPosition) == "top" ? "px-24 py-5 " : ""
                ]]),
                style: { "background-color": "rgba(0, 0, 0, 0.4)" }
              }, [
                vue.createElementVNode("text", { style: { "font-size": "22rpx", "color": "white" } }, vue.toDisplayString(_currentActive.value + 1) + "/" + vue.toDisplayString(vue.unref(_list).length), 1)
              ], 2)
            ], 6)) : vue.createCommentVNode("v-if", true)
          ], 6)
        ]);
      };
    }
  });
  var __easycom_5$1 = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-carousel/tm-carousel.vue"]]);
  const _sfc_main$i = /* @__PURE__ */ vue.defineComponent({
    __name: "tm-badge",
    props: __spreadProps(__spreadValues({}, custom_props), {
      round: {
        type: [Number],
        default: 6
      },
      border: {
        type: [Number],
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
      transprent: {
        type: [Boolean],
        default: false
      },
      label: {
        type: String,
        default: ""
      },
      fontSize: {
        type: Number,
        default: 22
      },
      status: {
        type: [Boolean],
        default: false
      },
      dot: {
        type: [Boolean],
        default: false
      },
      icon: {
        type: [String],
        default: ""
      },
      count: {
        type: [Number, String],
        default: 0
      },
      maxCount: {
        type: [Number],
        default: 999
      }
    }),
    emits: ["click"],
    setup(__props, { emit: emits }) {
      const props = __props;
      const customCSSStyle = vue.computed(() => computedStyle(props));
      const customClass = vue.computed(() => computedClass(props));
      const istext = vue.computed(() => {
        return isNaN(parseInt(String(props.count)));
      });
      const show = vue.computed(() => {
        if (!props.dot && !props.icon && !props.count)
          return false;
        return true;
      });
      const size = vue.computed(() => {
        if (props.status || props.dot) {
          return {
            w: 12,
            h: 12,
            pr: 6,
            t: 3
          };
        }
        if (props.icon) {
          let p = props.fontSize * 1.6;
          return {
            w: p,
            h: p,
            pr: 12,
            t: 10
          };
        }
        if (isNaN(parseInt(String(props.count)))) {
          return {
            w: 0,
            h: 0,
            pr: 10,
            t: 10
          };
        }
        if (props.count < 10) {
          return {
            w: 30,
            h: 30,
            pr: 12,
            t: 10
          };
        }
        if (props.count >= 10) {
          return {
            w: 0,
            h: 0,
            pr: 10,
            t: 10
          };
        }
        return {
          w: 0,
          h: 0,
          pr: 0,
          t: 0
        };
      });
      const _icon = vue.computed(() => props.icon);
      const _dot = vue.computed(() => props.dot);
      const _count = vue.computed(() => props.count);
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", {
          class: vue.normalizeClass(["flex relative", [props.status ? "flex-row flex-row-center-center mx-8" : ""]])
        }, [
          !props.status ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
            vue.renderSlot(_ctx.$slots, "default")
          ])) : vue.createCommentVNode("v-if", true),
          vue.unref(show) ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: vue.normalizeClass([
              (vue.unref(_dot) || vue.unref(_count) || vue.unref(_icon)) && !props.status ? "absolute flex-top-start-end r-0" : ""
            ]),
            style: { zIndex: 10 }
          }, [
            vue.createVNode(__easycom_7$1, {
              onClick: _cache[0] || (_cache[0] = ($event) => emits("click", $event)),
              color: props.color,
              _class: [vue.unref(customClass), "flex-center flex-col"],
              _style: [vue.unref(customCSSStyle), { flexShrink: 1 }],
              followTheme: props.followTheme,
              dark: props.dark,
              round: props.round,
              shadow: props.shadow,
              outlined: props.outlined,
              border: props.border,
              borderStyle: props.borderStyle,
              borderDirection: props.borderDirection,
              text: props.text,
              transprent: props.transprent,
              linear: props.linear,
              linearDeep: props.linearDeep,
              width: vue.unref(size).w,
              height: vue.unref(size).h,
              margin: props.margin,
              padding: props.padding
            }, {
              default: vue.withCtx(() => [
                vue.unref(_count) > 0 && !vue.unref(istext) ? (vue.openBlock(), vue.createBlock(__easycom_1, {
                  key: 0,
                  color: "white",
                  "font-size": props.fontSize,
                  _class: vue.unref(size).h == 0 ? "py-3 px-8" : "",
                  label: vue.unref(_count) > props.maxCount ? props.maxCount + "+" : vue.unref(_count)
                }, null, 8, ["font-size", "_class", "label"])) : vue.createCommentVNode("v-if", true),
                vue.unref(_count) && vue.unref(istext) ? (vue.openBlock(), vue.createBlock(__easycom_1, {
                  key: 1,
                  color: "white",
                  "font-size": props.fontSize,
                  _class: vue.unref(size).h == 0 ? "py-3 px-8" : "",
                  label: vue.unref(_count)
                }, null, 8, ["font-size", "_class", "label"])) : vue.createCommentVNode("v-if", true),
                vue.unref(_icon) ? (vue.openBlock(), vue.createBlock(__easycom_0$2, {
                  key: 2,
                  color: "white",
                  "font-size": props.fontSize,
                  name: vue.unref(_icon)
                }, null, 8, ["font-size", "name"])) : vue.createCommentVNode("v-if", true)
              ]),
              _: 1
            }, 8, ["color", "_class", "_style", "followTheme", "dark", "round", "shadow", "outlined", "border", "borderStyle", "borderDirection", "text", "transprent", "linear", "linearDeep", "width", "height", "margin", "padding"])
          ], 2)) : vue.createCommentVNode("v-if", true),
          props.status ? (vue.openBlock(), vue.createBlock(__easycom_1, {
            key: 2,
            "font-size": props.fontSize,
            _class: "ml-10",
            label: props.label
          }, null, 8, ["font-size", "label"])) : vue.createCommentVNode("v-if", true)
        ], 2);
      };
    }
  });
  var tmBadge = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-badge/tm-badge.vue"]]);
  const _sfc_main$h = /* @__PURE__ */ vue.defineComponent({
    __name: "tm-grid-item",
    props: __spreadProps(__spreadValues({}, custom_props), {
      height: {
        type: Number,
        default: 100
      },
      transprent: {
        type: Boolean,
        default: true
      },
      dot: {
        type: [Boolean, String],
        default: false
      },
      icon: {
        type: [String],
        default: ""
      },
      count: {
        type: [Number, String],
        default: 0
      },
      maxCount: {
        type: [Number, String],
        default: 999
      },
      bgColor: {
        type: String,
        default: "white"
      },
      color: {
        type: String,
        default: "red"
      },
      url: {
        type: String,
        default: ""
      }
    }),
    emits: ["click"],
    setup(__props, { emit: emits }) {
      var _a2, _b2, _c2;
      const props = __props;
      const store = useTmpiniaStore();
      const proxy = (_b2 = (_a2 = vue.getCurrentInstance()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const tmcfg = vue.computed(() => store.tmStore);
      const isDark = vue.computed(() => computedDark(props, tmcfg.value));
      const tmcomputed = vue.computed(() => {
        return computedTheme(__spreadProps(__spreadValues({}, props), { color: props.bgColor }), isDark.value, tmcfg.value);
      });
      const _colWidth = vue.inject("tmGridItemWidth", 0);
      const _tmGridshowBorder = vue.inject("tmGridshowBorder", vue.computed(() => false));
      const tmGridshowCachList = vue.inject("tmGridshowCachList", vue.computed(() => []));
      const uid = vue.ref({
        id: uni.$tm.u.getUid(1),
        type: ""
      });
      let parentFormItem = proxy == null ? void 0 : proxy.$parent;
      while (parentFormItem) {
        if ((parentFormItem == null ? void 0 : parentFormItem.keyName) == "tmGrid" || !parentFormItem) {
          break;
        } else {
          parentFormItem = (_c2 = parentFormItem == null ? void 0 : parentFormItem.$parent) != null ? _c2 : void 0;
        }
      }
      vue.onMounted(() => {
        if (parentFormItem == null ? void 0 : parentFormItem.pushKey) {
          parentFormItem.pushKey(uid.value);
        }
      }), vue.onBeforeUnmount(() => {
        parentFormItem.delKey(uid.value);
      });
      let wkStyle = vue.ref(`width:${_colWidth}'rpx'`);
      vue.watch([tmGridshowCachList, _tmGridshowBorder], () => {
        vue.nextTick(() => setStyleFun());
      }, { deep: true });
      function setStyleFun() {
        let ar = tmGridshowCachList.value.filter((el) => el.id == uid.value.id);
        if (ar.length == 1) {
          uid.value = ar[0];
        }
        if (!_tmGridshowBorder.value) {
          wkStyle.value = `border:0rpx solid rgba(0,0,0,0);width:${_colWidth}rpx`;
          return;
        }
        if (uid.value.type == 1) {
          wkStyle.value = `border:1rpx solid ${tmcomputed.value.border};width:${_colWidth}rpx`;
        }
        if (uid.value.type == 2) {
          wkStyle.value = `border-bottom:1rpx solid ${tmcomputed.value.border};border-right:1rpx solid ${tmcomputed.value.border};border-left:1rpx solid rgba(0,0,0,0);border-top:1rpx solid rgba(0,0,0,0);width:${_colWidth}rpx`;
        }
        if (uid.value.type == 3) {
          wkStyle.value = `border-top:1rpx solid rgba(0,0,0,0);border-bottom:1rpx solid ${tmcomputed.value.border};border-right:1rpx solid ${tmcomputed.value.border};border-left:1rpx solid ${tmcomputed.value.border};width:${_colWidth}rpx`;
        }
        if (uid.value.type == 4) {
          wkStyle.value = `border-left:1rpx solid rgba(0,0,0,0);border-bottom:1rpx solid ${tmcomputed.value.border};border-top:1rpx solid ${tmcomputed.value.border};border-right:1rpx solid ${tmcomputed.value.border};width:${_colWidth}rpx`;
        }
      }
      function onClick(e) {
        emits("click", e);
        if (props.url !== "") {
          try {
            uni.navigateTo({
              url: props.url
            });
          } catch (e2) {
          }
        }
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", {
          style: vue.normalizeStyle(vue.unref(wkStyle))
        }, [
          vue.createVNode(__easycom_7$1, {
            color: props.bgColor,
            text: props.text,
            border: 0,
            "hover-class": "opacity-6",
            transprent: props.transprent,
            height: props.height,
            width: vue.unref(_colWidth) - 0.5,
            margin: [0, 0],
            padding: [0, 0],
            _class: "flex-col flex",
            onClick
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("view", { class: "flex-1 flex flex-col-center-center" }, [
                vue.createVNode(tmBadge, {
                  userInteractionEnabled: true,
                  fontSize: 20,
                  dot: props.dot,
                  count: props.count,
                  "max-count": props.maxCount,
                  icon: props.icon,
                  color: props.color
                }, {
                  default: vue.withCtx(() => [
                    vue.createElementVNode("view", { class: "flex-col flex-col-center-center flex px-10" }, [
                      vue.renderSlot(_ctx.$slots, "default")
                    ])
                  ]),
                  _: 3
                }, 8, ["dot", "count", "max-count", "icon", "color"])
              ])
            ]),
            _: 3
          }, 8, ["color", "text", "transprent", "height", "width"])
        ], 4);
      };
    }
  });
  var __easycom_7 = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-grid-item/tm-grid-item.vue"]]);
  const _sfc_main$g = /* @__PURE__ */ vue.defineComponent({
    __name: "tm-grid",
    props: __spreadProps(__spreadValues({}, custom_props), {
      round: {
        type: Number,
        default: 2
      },
      width: {
        type: Number,
        default: 750
      },
      col: {
        type: Number,
        default: 5
      },
      showBorder: {
        type: Boolean,
        default: false
      },
      color: {
        type: String,
        default: "white"
      },
      transprent: {
        type: Boolean,
        default: false
      }
    }),
    setup(__props, { expose }) {
      const props = __props;
      let _cachList = vue.ref([]);
      const _colWidth = vue.computed(() => Math.ceil(props.width / props.col - 1));
      vue.provide("tmGridItemWidth", _colWidth.value + (props.showBorder ? 1 : 0));
      vue.provide("tmGridshowBorder", vue.computed(() => props.showBorder));
      vue.provide("tmGridshowCachList", vue.computed(() => _cachList.value));
      function pushKey(e) {
        let index = _cachList.value.findIndex((el) => el.id == e.id);
        if (index == -1) {
          _cachList.value.push(e);
        } else {
          _cachList.value.splice(index, 1, e);
        }
        setIndexType();
      }
      function delKey(e) {
        _cachList.value.findIndex((el) => el.id == e.id);
        setIndexType();
      }
      function setIndexType() {
        let totallen = _cachList.value.length;
        _cachList.value = _cachList.value.map((el, index) => {
          let aIndex = index + 1;
          if (aIndex <= props.col) {
            el.type = 4;
            if (aIndex == totallen && totallen == 1 || aIndex == 1) {
              el.type = 1;
            }
          } else {
            if (aIndex % props.col == 1) {
              el.type = 3;
            } else {
              el.type = 2;
            }
          }
          return el;
        });
      }
      expose({
        pushKey,
        delKey,
        keyName: "tmGrid"
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createBlock(__easycom_7$1, {
          round: props.round,
          width: props.width,
          transprent: props.transprent,
          color: props.color,
          margin: [0, 0],
          padding: [0, 0],
          _class: "flex flex-row flex-row-top-start",
          contStyle: "flex-wrap:wrap;"
        }, {
          default: vue.withCtx(() => [
            vue.renderSlot(_ctx.$slots, "default")
          ]),
          _: 3
        }, 8, ["round", "width", "transprent", "color"]);
      };
    }
  });
  var __easycom_8$1 = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-grid/tm-grid.vue"]]);
  var justifyAlign = /* @__PURE__ */ ((justifyAlign2) => {
    justifyAlign2["start"] = "flex-start";
    justifyAlign2["end"] = "flex-end";
    justifyAlign2["center"] = "center";
    return justifyAlign2;
  })(justifyAlign || {});
  const _sfc_main$f = /* @__PURE__ */ vue.defineComponent({
    __name: "tm-col",
    props: __spreadProps(__spreadValues({}, custom_props), {
      height: {
        type: [Number, String],
        default: 50
      },
      color: {
        type: String,
        default: "white"
      },
      transprent: {
        type: [Boolean, String],
        default: false
      },
      align: {
        type: String,
        default: "center"
      }
    }),
    emits: ["click"],
    setup(__props, { emit: emits }) {
      const props = __props;
      const store = useTmpiniaStore();
      const tmcfg = vue.computed(() => store.tmStore);
      const customCSSStyle = vue.computed(() => computedStyle(props));
      const customClass = vue.computed(() => computedClass(props));
      const isDark = vue.computed(() => computedDark(props, tmcfg.value));
      const tmcomputed = vue.computed(() => computedTheme(props, isDark.value, tmcfg.value));
      const TmRowWidth = vue.inject("TmRowWidth", vue.computed(() => 0));
      const TmRowColumn = vue.inject("TmRowColumn", vue.computed(() => 0));
      const TmRowGutter = vue.inject("TmRowGutter", vue.computed(() => 0));
      const colWidth = vue.computed(() => {
        if (TmRowWidth.value == 0)
          return 0;
        return TmRowWidth.value / TmRowColumn.value;
      });
      const alignComputed = vue.computed(() => justifyAlign[props.align]);
      let textColor = vue.computed(() => tmcomputed.value.textColor);
      vue.provide("appTextColor", textColor);
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", {
          onClick: _cache[0] || (_cache[0] = ($event) => emits("click", $event)),
          class: vue.normalizeClass(["flex flex-col", [vue.unref(colWidth) ? "" : "flex-1"]]),
          style: vue.normalizeStyle([vue.unref(colWidth) ? { width: vue.unref(colWidth) + "rpx" } : ""])
        }, [
          vue.createElementVNode("view", {
            eventPenetrationEnabled: true,
            style: vue.normalizeStyle([
              vue.unref(TmRowGutter) ? { marginLeft: `${vue.unref(TmRowGutter)}rpx`, marginRight: `${vue.unref(TmRowGutter)}rpx` } : "",
              props.height ? { height: props.height + "rpx" } : "",
              !__props.transprent ? vue.unref(tmcomputed).backgroundColorCss : "",
              { alignItems: vue.unref(alignComputed), justifyContent: "center" },
              vue.unref(customCSSStyle)
            ]),
            class: vue.normalizeClass(["flex flex-col", vue.unref(customClass)])
          }, [
            vue.renderSlot(_ctx.$slots, "default")
          ], 6)
        ], 6);
      };
    }
  });
  var __easycom_10 = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-col/tm-col.vue"]]);
  const _sfc_main$e = /* @__PURE__ */ vue.defineComponent({
    __name: "tm-row",
    props: __spreadProps(__spreadValues({}, custom_props), {
      height: {
        type: [Number, String],
        default: 0
      },
      margin: {
        type: Array,
        default: () => [0, 0]
      },
      width: {
        type: [Number, String],
        default: 0
      },
      round: {
        type: [Number, String],
        default: 0
      },
      gutter: {
        type: Number,
        default: 0
      },
      column: {
        type: Number,
        default: 10
      },
      justify: {
        type: String,
        default: "start"
      },
      align: {
        type: String,
        default: "center"
      },
      color: {
        type: String,
        default: "white"
      }
    }),
    emits: ["click"],
    setup(__props, { emit: emits }) {
      var _a2, _b2;
      const props = __props;
      const store = useTmpiniaStore();
      (_b2 = (_a2 = vue.getCurrentInstance()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const tmcfg = vue.computed(() => store.tmStore);
      const customCSSStyle = vue.computed(() => computedStyle(props));
      const customClass = vue.computed(() => computedClass(props));
      const isDark = vue.computed(() => computedDark(props, tmcfg.value));
      const tmcomputed = vue.computed(() => computedTheme(props, isDark.value, tmcfg.value));
      const width_px_rect = vue.computed(() => props.width);
      const width_px_rect_rp = vue.computed(() => width_px_rect.value);
      const justifyAlign2 = {
        start: "flex-start",
        end: "flex-end",
        center: "center",
        around: "space-around",
        between: "space-between"
      };
      const justify_rp = vue.computed(() => justifyAlign2[props.justify] || "start");
      const AlignAlign = {
        start: "flex-start",
        end: "flex-end",
        center: "center",
        stretch: "stretch"
      };
      const align_rp = vue.computed(() => AlignAlign[props.align] || "start");
      vue.provide("TmRowWidth", width_px_rect_rp);
      vue.provide("TmRowColumn", vue.computed(() => props.column));
      vue.provide("TmRowGutter", vue.computed(() => props.gutter));
      let textColor = vue.computed(() => tmcomputed.value.textColor);
      vue.provide("appTextColor", textColor);
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", {
          ref: "tmRow",
          onClick: _cache[0] || (_cache[0] = vue.withModifiers(($event) => emits("click", $event), ["stop"])),
          class: vue.normalizeClass(["flex tm-row", ["overflow ", `round-${props.round}`, vue.unref(customClass), `mx-${props.margin[0]} my-${__props.margin[1]}`]]),
          style: vue.normalizeStyle([
            { flexDirection: "row", flexWrap: "wrap" },
            props.height ? { height: props.height + "rpx" } : "",
            vue.unref(width_px_rect) ? { width: vue.unref(width_px_rect) + "rpx" } : "",
            { justifyContent: vue.unref(justify_rp), alignItems: vue.unref(align_rp) },
            !props.transprent ? vue.unref(tmcomputed).backgroundColorCss : "",
            !props.transprent ? vue.unref(tmcomputed).shadowColor : "",
            vue.unref(customCSSStyle)
          ])
        }, [
          vue.renderSlot(_ctx.$slots, "default")
        ], 6);
      };
    }
  });
  var __easycom_11 = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-row/tm-row.vue"]]);
  const _sfc_main$d = /* @__PURE__ */ vue.defineComponent({
    __name: "tm-tabs",
    props: __spreadProps(__spreadValues({}, custom_props), {
      list: {
        type: Array,
        default: () => []
      },
      color: {
        type: String,
        default: "white"
      },
      transprent: {
        type: [Boolean, String],
        default: false
      },
      width: {
        type: Number,
        default: 500
      },
      itemHeight: {
        type: Number,
        default: 80
      },
      height: {
        type: Number,
        default: 1e3
      },
      gutter: {
        type: Number,
        default: 0
      },
      defaultName: {
        type: [String, Number],
        default: ""
      },
      activeName: {
        type: [String, Number],
        default: ""
      },
      tabPos: {
        type: String,
        default: "top"
      },
      itemWidth: {
        type: Number,
        default: 0
      },
      activeColor: {
        type: String,
        default: "primary"
      },
      activeFontColor: {
        type: String,
        default: "primary"
      },
      activeFontSize: {
        type: Number,
        default: 28
      },
      itemModel: {
        type: String,
        default: "text"
      },
      unSelectedColor: {
        type: String,
        default: ""
      },
      itemFontSize: {
        type: Number,
        default: 28
      },
      itemLinear: {
        type: String,
        default: ""
      },
      itemLinearDeep: {
        type: String,
        default: "light"
      },
      itemRound: {
        type: Number,
        default: 0
      },
      align: {
        type: String,
        default: "left"
      },
      swiper: {
        type: Boolean,
        default: false
      },
      showTabsLineAni: {
        type: Boolean,
        default: false
      },
      tabsLineAniColor: {
        type: String,
        default: "primary"
      },
      disAbledPull: {
        type: Boolean,
        default: true
      }
    }),
    emits: ["update:activeName", "change", "click"],
    setup(__props, { expose, emit: emits }) {
      var _a2, _b2;
      const props = __props;
      const store = useTmpiniaStore();
      (_b2 = (_a2 = vue.getCurrentInstance()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      vue.ref(null);
      vue.computed(() => props.disAbledPull);
      const _align = vue.computed(() => {
        let align_list = {
          right: "flex-row-center-end",
          left: "flex-row-center-start",
          center: "flex-row-center-center",
          around: "flex-around"
        };
        let key = "center";
        if (align_list.hasOwnProperty(props.align)) {
          key = props.align;
        }
        return align_list[key];
      });
      const _active = vue.ref(props.defaultName);
      emits("update:activeName", _active.value);
      const cstomClass = vue.computed(() => computedClass(props));
      const _scrollToId = vue.ref("");
      const modelStyle = vue.computed(() => {
        if (props.itemModel == "text") {
          return {
            transprent: true,
            border: 0,
            text: false
          };
        } else if (props.itemModel == "line") {
          return {
            transprent: true,
            border: 4,
            text: false
          };
        } else if (props.itemModel == "textLight") {
          return {
            transprent: false,
            border: 4,
            text: true
          };
        } else if (props.itemModel == "card") {
          return {
            transprent: false,
            border: 0,
            text: false
          };
        }
        return {
          transprent: true,
          border: 0,
          text: false
        };
      });
      const tmTabsId = "tmTabsId";
      const _tabPos = vue.computed(() => props.tabPos);
      const cacheTabs = vue.ref([]);
      const isDulitabs = vue.computed(() => props.list.length > 0);
      const tabsid = "tabs_id_" + uni.$tm.u.getUid(1) + "_";
      const isNvue = vue.ref(false);
      Math.ceil(uni.upx2px(props.itemHeight));
      const totalWidth = vue.computed(() => uni.upx2px(cacheTabs.value.length * props.width));
      const _itemwidth = Math.ceil(uni.upx2px(props.itemWidth + 40));
      Math.ceil(uni.upx2px(40));
      const _width = Math.ceil(uni.upx2px(props.width));
      const contentWidth = vue.computed(() => {
        let width = (props.itemWidth + 40) * cacheTabs.value.length;
        if (width <= props.width) {
          width = props.width;
        }
        return width;
      });
      vue.computed(() => {
        let width = _itemwidth * cacheTabs.value.length;
        if (width <= props.width) {
          width = uni.upx2px(props.width);
        }
        return Math.ceil(width);
      });
      const anitLineLeft = vue.ref(0);
      let timerId = NaN;
      let timerId2 = NaN;
      function debounce2(func, wait = 500, immediate = false) {
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
      function debounce22(func, wait = 500, immediate = false) {
        if (!isNaN(timerId2))
          clearTimeout(timerId2);
        if (immediate) {
          var callNow = !timerId2;
          timerId2 = setTimeout(() => {
            timerId2 = NaN;
          }, wait);
          if (callNow)
            typeof func === "function" && func();
        } else {
          timerId2 = setTimeout(() => {
            typeof func === "function" && func();
          }, wait);
        }
      }
      const _startx = vue.ref(0);
      const _starty = vue.ref(0);
      vue.ref(0);
      vue.ref(0);
      const _x = vue.ref(0);
      const _y = vue.ref(0);
      vue.ref(0);
      vue.ref(0);
      const directoStyle = vue.ref(0);
      const isEndMove = vue.ref(true);
      const maxLen = 80;
      const activeIndex = vue.computed(() => cacheTabs.value.findIndex((el) => el.key == _active.value));
      let ctxLeft = 0;
      let ctxTop = 0;
      let timeDetail = 1;
      let isMoveEnb = false;
      let dirType = vue.ref("none");
      let isDrag = vue.ref(false);
      let sliderBarWidth = uni.upx2px(40);
      let widthDrag = vue.ref(sliderBarWidth);
      vue.watchEffect(() => {
        cacheTabs.value = [];
        props.list.forEach((el, index) => {
          var _a3, _b3, _c2, _d, _e, _f;
          cacheTabs.value.push({
            key: (_a3 = el == null ? void 0 : el.key) != null ? _a3 : String(index),
            title: (_b3 = el == null ? void 0 : el.title) != null ? _b3 : String(index),
            icon: (_c2 = el == null ? void 0 : el.icon) != null ? _c2 : "",
            dot: (_d = el == null ? void 0 : el.dot) != null ? _d : false,
            count: (_e = el == null ? void 0 : el.count) != null ? _e : "",
            dotColor: (_f = el == null ? void 0 : el.dotColor) != null ? _f : "red"
          });
        });
      });
      function setTabsBarLineLeft(key = "") {
        if (!props.showTabsLineAni)
          return;
        let keybl = key || _active.value;
        let index = cacheTabs.value.findIndex((el) => el.key == keybl);
        if (index > -1) {
          let leftPx = _itemwidth * index;
          if (props.align == "center") {
            leftPx = leftPx + (_width - _itemwidth * cacheTabs.value.length) / 2 - 1;
          }
          anitLineLeft.value = Math.ceil(leftPx);
        }
      }
      function unbindKey(key) {
        let index = cacheTabs.value.findIndex((el) => el.key == key);
        if (index > -1) {
          cacheTabs.value.splice(index, 1);
        }
        let index2 = cacheTabs.value.findIndex((el) => el.key == _active.value);
        if (index2 == -1 && cacheTabs.value.length > 0) {
          changeKey(cacheTabs.value[0].key, false);
        } else if (cacheTabs.value.length == 0) {
          changeKey("", false);
        }
      }
      vue.watch(() => props.activeName, () => {
        if (props.activeName == _active.value)
          return;
        changeKey(props.activeName, false);
      });
      vue.onMounted(() => {
        setTimeout(() => {
          _scrollToId.value = tabsid + _active.value;
          vue.nextTick(() => {
            setTabsBarLineLeft(props.defaultName);
          });
        }, 300);
      });
      vue.watchEffect(() => {
        directoStyle.value = String(Math.ceil(uni.upx2px(-activeIndex.value * props.width)));
        spinNvueAniEnd(0, -uni.upx2px(activeIndex.value * props.width), timeDetail);
      });
      vue.watch(() => _active.value, () => {
        vue.nextTick(() => {
          var _a3, _b3;
          let index = cacheTabs.value.findIndex((el) => el.key == _active.value);
          if (index > -1) {
            if (typeof cacheTabs.value[index - 2] !== "undefined") {
              _scrollToId.value = tabsid + ((_a3 = cacheTabs.value[index - 2]) == null ? void 0 : _a3.key);
            } else {
              _scrollToId.value = tabsid + ((_b3 = cacheTabs.value[0]) == null ? void 0 : _b3.key);
            }
          } else {
            _scrollToId.value = tabsid + _active.value;
          }
          setTabsBarLineLeft();
        });
      });
      let isMoveing = vue.ref(false);
      function onStart(event) {
        if (!props.swiper)
          return;
        isEndMove.value = true;
        isMoveEnb = true;
        isMoveing.value = false;
        isDrag.value = true;
        if (event.type.indexOf("mouse") == -1 && event.changedTouches.length == 1) {
          var touch = event.changedTouches[0];
          if (typeof (touch == null ? void 0 : touch.pageX) !== "undefined") {
            _startx.value = touch.pageX - ctxLeft;
            _starty.value = touch.pageY - ctxTop;
          } else {
            _startx.value = touch.x;
            _starty.value = touch.y;
          }
        } else {
          _startx.value = event.pageX - event.currentTarget.offsetLeft - ctxLeft;
          _starty.value = event.pageY - event.currentTarget.offsetTop - ctxTop;
        }
      }
      function onMove(event) {
        if (!props.swiper || isMoveEnb == false)
          return;
        isMoveing.value = true;
        let nowx = 0;
        let nowy = 0;
        if (event.type.indexOf("mouse") == -1 && event.changedTouches.length == 1) {
          var touch = event.changedTouches[0];
          if (typeof (touch == null ? void 0 : touch.pageX) !== "undefined") {
            nowx = touch.pageX - ctxLeft;
            nowy = touch.pageY - ctxTop;
          } else {
            nowx = touch.x;
            nowy = touch.y;
          }
        } else {
          nowx = event.pageX - event.currentTarget.offsetLeft - ctxLeft;
          nowy = event.pageY - event.currentTarget.offsetTop - ctxTop;
        }
        _x.value = nowx - _startx.value;
        _y.value = nowy - _starty.value;
        setDirXy(_x.value, _y.value);
      }
      function onEnd(event) {
        if (!props.swiper || !isMoveEnb || !isMoveing.value)
          return;
        isEndMove.value = false;
        isMoveing.value = false;
        debounce22(() => {
          setDirXy(_x.value, _y.value, true);
          isDrag.value = false;
        }, 250, true);
        isMoveEnb = false;
      }
      function setDirXy(x, y, isEnd = false) {
        activeIndex.value;
        let nowLeft = uni.upx2px(activeIndex.value * props.width);
        debounce2(() => {
          if (x > 0 && Math.abs(x) > Math.abs(y)) {
            dirType.value = "right";
          } else if (x < 0 && Math.abs(x) > Math.abs(y)) {
            dirType.value = "left";
          } else if (y > 0 && Math.abs(y) > Math.abs(x)) {
            dirType.value = "down";
          } else if (y < 0 && Math.abs(y) > Math.abs(x)) {
            dirType.value = "up";
          } else {
            dirType.value = "none";
          }
        }, 300, true);
        if (dirType.value == "right") {
          if (activeIndex.value == 0)
            return;
          directoStyle.value = x - nowLeft;
          if (isEnd) {
            setRightDirRight();
            widthDrag.value = sliderBarWidth;
          }
        } else if (dirType.value == "left") {
          if (activeIndex.value == cacheTabs.value.length - 1)
            return;
          directoStyle.value = x - nowLeft;
          if (isEnd) {
            setLeftDirLeft();
            widthDrag.value = sliderBarWidth;
          }
        }
        function setRightDirRight() {
          if (x < maxLen || activeIndex.value <= 0) {
            directoStyle.value = -nowLeft;
          } else {
            _active.value = cacheTabs.value[activeIndex.value - 1].key;
            changeKey(_active.value, false);
          }
        }
        function setLeftDirLeft() {
          if (Math.abs(x) < maxLen || activeIndex.value >= cacheTabs.value.length - 1) {
            directoStyle.value = -nowLeft;
          } else {
            _active.value = cacheTabs.value[activeIndex.value + 1].key;
            changeKey(_active.value, false);
          }
        }
      }
      vue.onUnmounted(() => {
      });
      function spinNvueAniEnd(start, end, time = timeDetail) {
        if (!props.swiper)
          return;
      }
      function pushKey(o) {
        let index = cacheTabs.value.findIndex((el) => el.key === o.key);
        if (index > -1) {
          cacheTabs.value.splice(index, 1, __spreadValues(__spreadValues({}, cacheTabs.value[0]), o));
        } else {
          cacheTabs.value.push(o);
        }
        if (_active.value == "") {
          changeKey(cacheTabs.value[0].key, false);
        }
      }
      function changeKey(key, isclick = true) {
        isEndMove.value = true;
        _active.value = key;
        timeDetail = 1;
        emits("change", key);
        emits("update:activeName", vue.toRaw(_active.value));
        if (isclick) {
          emits("click", key);
        }
      }
      function setTitle(o) {
        let index = cacheTabs.value.findIndex((el) => el.key == o.key);
        if (index > -1) {
          cacheTabs.value.splice(index, 1, o);
        }
      }
      vue.provide("tabsActiveName", vue.computed(() => _active.value));
      vue.provide("tabsActiveactiveIndex", activeIndex);
      vue.provide("tabsActiveCacheTabse", vue.computed(() => cacheTabs.value));
      vue.provide("tabsWidth", vue.computed(() => props.width));
      vue.provide("tabsheight", vue.computed(() => {
        if (!props.height)
          return 0;
        return props.height - props.itemHeight - props.gutter;
      }));
      vue.provide("tabsSwiper", vue.computed(() => props.swiper));
      vue.provide("tabsSwiperIsMoveing", vue.computed(() => isMoveing.value));
      vue.provide("tabsSwiperDisAbledPull", vue.computed(() => props.disAbledPull));
      expose({
        pushKey,
        changeKey,
        unbindKey,
        setTitle,
        tmTabsId
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", {
          class: "flex flex-col overflow",
          style: vue.normalizeStyle([
            props.height && vue.unref(isDulitabs) == false ? { height: __props.height + "rpx" } : "",
            { width: props.width + "rpx" }
          ])
        }, [
          vue.createCommentVNode(" \u6B64\u6E90\u7801\u6709uniapp bug.\u5982\u679C\u5728nvue\u9875\u9762\u7F16\u8BD1\u81F3h5\u5E73\u53F0\u65F6\uFF0C\u5F00\u542Fenable-flexr\u540E\u9700\u8981\u91CC\u9762\u518D\u5957\u5C42view\u518D\u5199flex\u624D\u80FD\u771F\u6B63\u7684\u5F00flex "),
          vue.createCommentVNode(" \u56E0\u6B64\u4E0B\u9762\u7684\u5185\u5BB9\u4F5C\u4E86\u6761\u4EF6\u7F16\u8BD1\u5206\u4E3Anvue\u548C\u975Envue "),
          vue.createCommentVNode(" https://ask.dcloud.net.cn/question/143230 "),
          vue.unref(_tabPos) == "bottom" && vue.unref(isDulitabs) == false ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            onTouchmove: onMove,
            onTouchend: onEnd,
            onTouchstart: onStart,
            onMousemove: onMove,
            onMouseup: onEnd,
            onMouseleave: onEnd,
            onMousedown: onStart,
            ref: "tabsDom",
            style: vue.normalizeStyle({ width: props.swiper ? `${vue.unref(totalWidth)}px` : `${props.width}rpx`, transform: props.swiper ? `translateX(${directoStyle.value}px)` : `translateX(0px)` }),
            class: vue.normalizeClass([[!isEndMove.value || isNvue.value ? "tmTabsPane" : ""], "flex flex-row flex-nowrap overflow"])
          }, [
            vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ], 38)) : vue.createCommentVNode("v-if", true),
          vue.createVNode(__easycom_7$1, {
            transprent: props.transprent,
            color: props.color,
            followTheme: props.followTheme,
            dark: props.dark,
            round: props.round,
            shadow: props.shadow,
            outlined: props.outlined,
            border: props.border,
            borderStyle: props.borderStyle,
            borderDirection: props.borderDirection,
            text: props.text,
            linear: props.linear,
            linearDeep: props.linearDeep,
            margin: [0, 0],
            padding: [0, 0],
            height: props.itemHeight + vue.unref(modelStyle).border + props.gutter + 4,
            _class: ["flex-center flex-row nonvue", vue.unref(cstomClass)],
            _style: props._style,
            width: props.width
          }, {
            default: vue.withCtx(() => [
              vue.createCommentVNode(" \u6807\u9898 "),
              vue.createElementVNode("scroll-view", {
                style: vue.normalizeStyle([{ width: `${props.width}rpx`, height: `${props.itemHeight + 4}rpx` }]),
                "scroll-with-animation": true,
                "scroll-into-view": _scrollToId.value,
                "scroll-x": true,
                "show-scrollbar": false,
                "enable-flex": "",
                class: "tableHeader flex-row relative"
              }, [
                vue.createElementVNode("view", {
                  class: vue.normalizeClass(["flex flex-row nowrap nonvue fulled", [vue.unref(_align)]]),
                  style: vue.normalizeStyle([{ height: `${props.itemHeight + 4}rpx` }])
                }, [
                  (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(cacheTabs.value, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      id: tabsid + item.key,
                      key: index
                    }, [
                      vue.createVNode(__easycom_7$1, {
                        onClick: ($event) => changeKey(item.key),
                        round: props.itemRound,
                        linear: props.itemLinear,
                        linearDeep: props.itemLinearDeep,
                        borderDirection: "bottom",
                        text: item.key == _active.value ? vue.unref(modelStyle).text : false,
                        border: item.key == _active.value ? vue.unref(modelStyle).border : 0,
                        transprent: item.key == _active.value ? vue.unref(modelStyle).transprent : true,
                        color: props.activeColor && item.key == _active.value ? props.activeColor : props.color,
                        width: props.itemWidth,
                        _class: "flex-col flex-col-center-center",
                        margin: [0, 0],
                        padding: [20, 0],
                        height: props.itemHeight
                      }, {
                        default: vue.withCtx(() => [
                          vue.createElementVNode("view", {
                            style: vue.normalizeStyle([props.itemWidth > 0 ? { width: props.itemWidth + "rpx" } : {}, { height: props.itemHeight + "rpx" }]),
                            class: "flex flex-row flex-row-center-center"
                          }, [
                            vue.createElementVNode("view", { class: "flex flex-row flex-center" }, [
                              item.icon ? (vue.openBlock(), vue.createBlock(__easycom_0$2, {
                                key: 0,
                                userInteractionEnabled: false,
                                _class: "pr-5",
                                color: item.key == _active.value ? props.activeFontColor : props.unSelectedColor,
                                "font-size": item.key == _active.value ? props.activeFontSize : props.itemFontSize,
                                name: item.icon
                              }, null, 8, ["color", "font-size", "name"])) : vue.createCommentVNode("v-if", true),
                              vue.createVNode(__easycom_1, {
                                userInteractionEnabled: false,
                                "font-size": item.key == _active.value ? props.activeFontSize : props.itemFontSize,
                                _class: item.key == _active.value ? "text-weight-b" : "",
                                color: item.key == _active.value ? props.activeFontColor : props.unSelectedColor,
                                label: item.title
                              }, null, 8, ["font-size", "_class", "color", "label"])
                            ]),
                            !item.count && item.dot ? (vue.openBlock(), vue.createBlock(tmBadge, {
                              key: 0,
                              dot: "",
                              color: item.dotColor
                            }, {
                              default: vue.withCtx(() => [
                                vue.createElementVNode("view", {
                                  style: vue.normalizeStyle({ height: `${props.itemHeight / 3}rpx` })
                                }, null, 4)
                              ]),
                              _: 2
                            }, 1032, ["color"])) : vue.createCommentVNode("v-if", true),
                            item.count && !item.dot ? (vue.openBlock(), vue.createBlock(tmBadge, {
                              key: 1,
                              count: item.count,
                              color: item.dotColor
                            }, {
                              default: vue.withCtx(() => [
                                vue.createElementVNode("view", {
                                  style: vue.normalizeStyle({ height: `${props.itemHeight - 20}rpx` })
                                }, null, 4)
                              ]),
                              _: 2
                            }, 1032, ["count", "color"])) : vue.createCommentVNode("v-if", true)
                          ], 4)
                        ]),
                        _: 2
                      }, 1032, ["onClick", "round", "linear", "linearDeep", "text", "border", "transprent", "color", "width", "height"])
                    ], 8, ["id"]);
                  }), 128))
                ], 6),
                props.showTabsLineAni && props.itemWidth > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "anilineBar absolute l-0",
                  style: vue.normalizeStyle({
                    width: `${vue.unref(contentWidth)}rpx`,
                    height: "1px",
                    top: `${props.itemHeight}rpx`,
                    backgroundColor: props.showTabsLineAni ? vue.unref(store).tmStore.dark ? "#616161" : "#ebebeb" : ""
                  })
                }, null, 4)) : vue.createCommentVNode("v-if", true),
                props.showTabsLineAni && props.itemWidth > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 1,
                  class: "anilineBar absolute l-0 b-0 flex flex-row flex-center",
                  style: vue.normalizeStyle({ transform: `translateX(${anitLineLeft.value}px)`, top: `${props.itemHeight - 2}rpx`, width: vue.unref(_itemwidth) + "px", height: "4px" })
                }, [
                  vue.createVNode(__easycom_7$1, {
                    parenClass: "animateAll_tabs_tmui",
                    "follow-dark": false,
                    color: props.tabsLineAniColor,
                    width: vue.unref(widthDrag),
                    unit: "px",
                    height: 4,
                    margin: [0, 0],
                    padding: [0, 0]
                  }, null, 8, ["color", "width"])
                ], 4)) : vue.createCommentVNode("v-if", true)
              ], 12, ["scroll-into-view"]),
              vue.createCommentVNode(" \u6807\u9898 ")
            ]),
            _: 1
          }, 8, ["transprent", "color", "followTheme", "dark", "round", "shadow", "outlined", "border", "borderStyle", "borderDirection", "text", "linear", "linearDeep", "height", "_class", "_style", "width"]),
          vue.unref(_tabPos) == "top" && vue.unref(isDulitabs) == false ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            id: "webIdTabs",
            onTouchmove: onMove,
            onTouchend: onEnd,
            onTouchstart: onStart,
            onTouchcancel: onEnd,
            onMousemove: onMove,
            onMouseup: onEnd,
            onMouseleave: onEnd,
            onMousedown: onStart,
            ref: "tabsDom",
            style: vue.normalizeStyle({ width: props.swiper ? `${vue.unref(totalWidth)}px` : `${props.width}rpx`, transform: props.swiper ? `translateX(${directoStyle.value}px)` : `translateX(0px)` }),
            class: vue.normalizeClass([[!isEndMove.value || isNvue.value ? "tmTabsPane" : ""], "flex flex-row flex-nowrap overflow"])
          }, [
            vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ], 38)) : vue.createCommentVNode("v-if", true)
        ], 4);
      };
    }
  });
  var __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-5545ff00"], ["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-tabs/tm-tabs.vue"]]);
  const _sfc_main$c = /* @__PURE__ */ vue.defineComponent({
    __name: "tm-button",
    props: __spreadProps(__spreadValues({}, custom_props), {
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
      groupId: {
        type: String,
        default: ""
      },
      guildId: {
        type: String,
        default: ""
      },
      publicId: {
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
      var _a2, _b2, _c2;
      const props = __props;
      const proxy = (_b2 = (_a2 = vue.getCurrentInstance()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const formtype = vue.computed(() => props.formType);
      let FormParent = null;
      if (formtype.value == "reset" || formtype.value == "submit") {
        FormParent = proxy == null ? void 0 : proxy.$parent;
        while (FormParent) {
          if ((FormParent == null ? void 0 : FormParent.tmFormComnameId) == "tmFormId" || !FormParent) {
            break;
          } else {
            FormParent = (_c2 = FormParent == null ? void 0 : FormParent.$parent) != null ? _c2 : void 0;
          }
        }
      }
      const customCSSStyle = vue.computed(() => {
        return __spreadProps(__spreadValues({
          height: btnSizeObj.value.h + props.unit
        }, computedStyle(props)), {
          border: "0px solid rgba(0, 0, 0, 0)",
          background: "rgba(0, 0, 0, 0)",
          borderRadius: "0px"
        });
      });
      const customClass = vue.computed(() => computedClass(props));
      const isclickOn = vue.ref(false);
      const _load = vue.computed(() => props.loading);
      const _disabled = vue.computed(() => props.disabled);
      const _label = vue.computed(() => props.label);
      const _icon = vue.computed(() => props.icon);
      const sizeObj = vue.computed(() => {
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
      const btnSizeObj = vue.computed(() => {
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
      const _fontColor = vue.computed(() => props.fontColor);
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
        return vue.openBlock(), vue.createBlock(__easycom_7$1, {
          "no-level": "",
          _style: { opacity: isclickOn.value || vue.unref(_disabled) ? 0.7 : 1 },
          "hover-class": "none",
          round: vue.unref(btnSizeObj).round,
          width: vue.unref(btnSizeObj).w,
          height: vue.unref(btnSizeObj).h,
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
          default: vue.withCtx(() => [
            vue.createElementVNode("button", {
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
              loading: vue.unref(_load),
              disabled: vue.unref(_disabled),
              "group-id": props.groupId,
              "guild-id": props.guildId,
              "public-id": props.publicId,
              "hover-start-time": 1e7,
              "hover-stop-propagation": "",
              "hover-class": "bhover",
              class: vue.normalizeClass(["button flex-1 flex-center", [vue.unref(customClass)]]),
              style: vue.normalizeStyle([vue.unref(customCSSStyle), { height: vue.unref(btnSizeObj).h - props.border + "rpx", top: "-" + props.border + "rpx" }])
            }, [
              vue.renderSlot(_ctx.$slots, "default", {}, () => [
                vue.unref(_icon) ? (vue.openBlock(), vue.createBlock(__easycom_0$2, {
                  key: 0,
                  userInteractionEnabled: false,
                  color: vue.unref(_fontColor),
                  _class: vue.unref(_label) ? "pr-10" : "",
                  unit: props.unit,
                  fontSize: vue.unref(btnSizeObj).fontSize * 0.9,
                  name: vue.unref(_icon)
                }, null, 8, ["color", "_class", "unit", "fontSize", "name"])) : vue.createCommentVNode("v-if", true),
                vue.createVNode(__easycom_1, {
                  userInteractionEnabled: false,
                  color: vue.unref(_fontColor),
                  fontSize: vue.unref(btnSizeObj).fontSize,
                  unit: props.unit,
                  label: vue.unref(_label)
                }, null, 8, ["color", "fontSize", "unit", "label"])
              ], true)
            ], 46, ["form-type", "openType", "appParameter", "sessionFrom", "sendMessageTitle", "sendMessagePath", "sendMessageImg", "sendMessageCard", "loading", "disabled", "group-id", "guild-id", "public-id"])
          ]),
          _: 3
        }, 8, ["_style", "round", "width", "height", "padding", "margin", "color", "shadow", "transprent", "linear", "linear-deep", "text", "outlined", "dark", "follow-dark", "follow-theme", "border-direction", "border-style", "border", "blur"]);
      };
    }
  });
  var __easycom_5 = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-f959ddb0"], ["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-button/tm-button.vue"]]);
  const _sfc_main$b = /* @__PURE__ */ vue.defineComponent({
    __name: "tm-table",
    props: {
      showHeader: {
        type: Boolean,
        default: true
      },
      header: {
        type: Array,
        default: () => []
      },
      tableData: {
        type: Array,
        default: () => [],
        required: true
      },
      width: {
        type: Number,
        default: 750
      },
      height: {
        type: Number,
        default: 0
      },
      cellHeight: {
        type: Number,
        default: 72
      },
      headerHeight: {
        type: Number,
        default: 88
      },
      showBottomBorder: {
        type: Boolean,
        default: true
      }
    },
    emits: ["rowClick"],
    setup(__props, { emit: emits }) {
      const props = __props;
      const defaultProps = vue.computed(() => {
        return {
          width: props.width,
          height: props.height,
          cellHeight: props.cellHeight,
          headerHeight: props.headerHeight
        };
      });
      const _col = vue.ref([]);
      const _tabel = vue.ref([]);
      const _showBottomBorder = vue.computed(() => props.showBottomBorder);
      const _showHeader = vue.computed(() => props.showHeader);
      const isNvue = vue.ref(false);
      const headerLeft = vue.ref(0);
      const tableLeft = vue.ref([...new Array(props.tableData.length).fill(0)]);
      let scrollDong = vue.ref("");
      let scrollIndex = vue.ref(NaN);
      function headerScroll(e, index) {
        if (scrollDong.value != "h")
          return;
        vue.nextTick(() => {
          if (scrollIndex.value === index) {
            headerLeft.value = e.detail.scrollLeft;
            tableLeft.value = tableLeft.value.map((el, idx) => {
              return idx !== index ? headerLeft.value : el;
            });
          }
        });
      }
      function tableScroll(e) {
        if (scrollDong.value != "t")
          return;
        vue.nextTick(() => {
          tableLeft.value = [...new Array(props.tableData.length).fill(e.detail.scrollLeft)];
        });
      }
      function touchStartScroll(index) {
        scrollIndex.value = index;
        scrollDong.value = "h";
      }
      vue.onMounted(() => {
        vue.nextTick(() => setColData());
      });
      vue.watch([() => props.tableData, () => props.header], () => {
        setColData();
      }, { deep: true });
      function setColData() {
        _col.value = [];
        _tabel.value = [];
        props.header.forEach((el, index) => {
          var _a2, _b2, _c2, _d, _e, _f, _g, _h;
          let defaultSort2 = (_a2 = el == null ? void 0 : el.sortType) != null ? _a2 : "none";
          if (defaultSort2 != "none") {
            defaultSort2 = "none";
          }
          _col.value.push({
            title: (_b2 = el == null ? void 0 : el.title) != null ? _b2 : "",
            width: (_c2 = el == null ? void 0 : el.width) != null ? _c2 : 145,
            align: "flex-row-center-" + ((el == null ? void 0 : el.align) || "center"),
            sort: (_d = el == null ? void 0 : el.sort) != null ? _d : false,
            bgColor: (_e = el == null ? void 0 : el.bgColor) != null ? _e : "white",
            cellColor: (_f = el == null ? void 0 : el.cellColor) != null ? _f : "white",
            light: (_g = el == null ? void 0 : el.light) != null ? _g : false,
            key: (_h = el == null ? void 0 : el.key) != null ? _h : String(index),
            sortType: defaultSort2
          });
        });
        props.tableData.forEach((el, index) => {
          var _a2, _b2, _c2, _d, _e, _f;
          let d = (_a2 = el == null ? void 0 : el.data) != null ? _a2 : {};
          let keys = Object.keys(d);
          for (let ik = 0, len = keys.length; ik < len; ik++) {
            if (typeof _col.value[ik] == "undefined") {
              _col.value.push({
                title: String(ik),
                width: (_b2 = el == null ? void 0 : el.width) != null ? _b2 : 145,
                align: "flex-col-center-" + ((el == null ? void 0 : el.align) || "center"),
                sort: false,
                bgColor: "white",
                cellColor: "white",
                light: false,
                key: String(ik),
                sortType: "none"
              });
            }
          }
          let dataRuslt = [];
          dataRuslt = _col.value.map((el2, index2) => {
            var _a3, _b3, _c3, _d2, _e2, _f2, _g, _h, _i, _j, _k, _l;
            let color = "white";
            let light = false;
            if (typeof d[el2.key] !== "object") {
              color = (el == null ? void 0 : el.color) || ((_a3 = _col.value[index2]) == null ? void 0 : _a3.cellColor) || color;
              light = (el == null ? void 0 : el.light) || ((_b3 = _col.value[index2]) == null ? void 0 : _b3.light) || light;
            } else {
              color = ((_c3 = d[el2.key]) == null ? void 0 : _c3.color) || (el == null ? void 0 : el.color) || ((_d2 = _col.value[index2]) == null ? void 0 : _d2.color) || color;
              light = ((_e2 = d[el2.key]) == null ? void 0 : _e2.light) || (el == null ? void 0 : el.light) || ((_f2 = _col.value[index2]) == null ? void 0 : _f2.light) || light;
            }
            let cel = {
              key: el2.key,
              text: typeof d[el2.key] !== "object" ? d[el2.key] : (_h = (_g = d[el2.key]) == null ? void 0 : _g.text) != null ? _h : "",
              type: typeof d[el2.key] !== "object" ? "text" : (_j = (_i = d[el2.key]) == null ? void 0 : _i.type) != null ? _j : "text",
              width: (_l = (_k = _col.value[index2]) == null ? void 0 : _k.width) != null ? _l : 145,
              light,
              color
            };
            if (typeof d[el.key] === "object") {
              cel = __spreadValues(__spreadValues({}, cel), d[el.key]);
            }
            return cel;
          });
          _tabel.value.push({
            data: dataRuslt,
            align: (_e = (_d = el == null ? void 0 : el.align) != null ? _d : (_c2 = _col.value[index]) == null ? void 0 : _c2.align) != null ? _e : "flex-row-center-center",
            key: (_f = el == null ? void 0 : el.key) != null ? _f : String(index)
          });
        });
      }
      function headerClick(key, isSort = false) {
        if (!isSort)
          return;
        let valueArray = _col.value.filter((el) => el.key == key);
        let keyDesc = valueArray[0].sortType;
        if (!keyDesc || keyDesc == "none") {
          sort(key, "desc");
          return;
        }
        if (keyDesc == "none") {
          sort(key, "desc");
          return;
        }
        if (keyDesc == "desc") {
          sort(key, "asce");
          return;
        }
        if (keyDesc == "asce") {
          sort(key, "none");
          return;
        }
      }
      function sort(descKey = "", type = "none") {
        uni.showLoading({
          title: "...",
          mask: true
        });
        if (type == "none" || descKey === "") {
          setColData();
          uni.hideLoading();
          return;
        }
        let lsTemp = _tabel.value.map((item, index) => {
          let valueArray = item.data.filter((el) => el.key == descKey);
          return {
            oldIndex: index,
            value: valueArray[0].text
          };
        });
        if (type == "desc") {
          lsTemp.sort((a, b) => a.value - b.value);
        }
        if (type == "asce") {
          lsTemp.sort((a, b) => b.value - a.value);
        }
        const backTable = vue.toRaw(_tabel.value);
        vue.nextTick(() => {
          _col.value = _col.value.map((el) => {
            return __spreadProps(__spreadValues({}, el), { sortType: el.key == descKey ? type : el.sortType });
          });
          _tabel.value = lsTemp.map((el) => {
            return backTable[el.oldIndex];
          });
          uni.hideLoading();
        });
      }
      function rowClick(rowIndex, colIndex) {
        emits("rowClick", rowIndex, colIndex);
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.unref(_showHeader) ? (vue.openBlock(), vue.createElementBlock("scroll-view", {
            key: 0,
            "enable-flex": isNvue.value,
            class: vue.normalizeClass([isNvue.value ? "flex-row flex" : "tableHeader"]),
            "scroll-x": true,
            "scroll-with-animation": false,
            "show-scrollbar": false,
            onScroll: tableScroll,
            onTouchstart: _cache[2] || (_cache[2] = ($event) => vue.isRef(scrollDong) ? scrollDong.value = "t" : scrollDong = "t"),
            onMouseup: _cache[3] || (_cache[3] = ($event) => vue.isRef(scrollDong) ? scrollDong.value = "t" : scrollDong = "t"),
            "scroll-left": headerLeft.value,
            style: vue.normalizeStyle({ width: `${vue.unref(defaultProps).width}rpx`, height: `${vue.unref(defaultProps).headerHeight}rpx` })
          }, [
            vue.createElementVNode("view", { class: "flex-1 flex flex-row flex-nowrap" }, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_col.value, (item, index) => {
                return vue.openBlock(), vue.createBlock(__easycom_7$1, {
                  border: vue.unref(_showBottomBorder) ? 1 : 0,
                  "border-direction": "bottom",
                  color: item.bgColor,
                  text: item.light,
                  _class: "flex flex-col " + item.align,
                  height: vue.unref(defaultProps).headerHeight - 6,
                  width: item.width - 10,
                  key: index,
                  margin: [0, 0],
                  padding: [10, 6],
                  onClick: ($event) => headerClick(item.key, item.sort)
                }, {
                  default: vue.withCtx(() => [
                    vue.createElementVNode("view", {
                      style: vue.normalizeStyle({ width: item.width - 10 + "rpx", height: vue.unref(defaultProps).headerHeight - 6 + "rpx" }),
                      class: vue.normalizeClass(["flex flex-row-center-center flex-row", [item.align]])
                    }, [
                      vue.createElementVNode("view", {
                        onClick: _cache[0] || (_cache[0] = vue.withModifiers(() => {
                        }, ["stop"])),
                        class: "flex-1 flex-center",
                        style: { "width": "0px" }
                      }, [
                        vue.createVNode(__easycom_1, {
                          onClick: ($event) => headerClick(item.key, item.sort),
                          _style: "line-height:normal;",
                          "font-size": 26,
                          _class: "text-weight-b text-align-center",
                          label: item.title
                        }, null, 8, ["onClick", "label"])
                      ]),
                      item.sort ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 0,
                        onClick: _cache[1] || (_cache[1] = vue.withModifiers(() => {
                        }, ["stop"])),
                        class: "flex flex-col flex-col-center-center"
                      }, [
                        vue.createVNode(__easycom_0$2, {
                          lineHeight: 11,
                          onClick: ($event) => headerClick(item.key, item.sort),
                          _class: item.sortType == "asce" || item.sortType == "none" ? "" : "opacity-6",
                          "font-size": 20,
                          name: "tmicon-sort-up"
                        }, null, 8, ["onClick", "_class"]),
                        vue.createVNode(__easycom_0$2, {
                          lineHeight: 11,
                          onClick: ($event) => headerClick(item.key, item.sort),
                          _class: item.sortType == "desc" || item.sortType == "none" ? "" : "opacity-6",
                          "font-size": 20,
                          name: "tmicon-sort-down"
                        }, null, 8, ["onClick", "_class"])
                      ])) : vue.createCommentVNode("v-if", true)
                    ], 6)
                  ]),
                  _: 2
                }, 1032, ["border", "color", "text", "_class", "height", "width", "onClick"]);
              }), 128))
            ])
          ], 46, ["enable-flex", "scroll-left"])) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("scroll-view", {
            "scroll-with-animation": false,
            onScroll: _cache[4] || (_cache[4] = ($event) => headerScroll($event, 0)),
            onTouchstart: _cache[5] || (_cache[5] = ($event) => touchStartScroll(0)),
            onMouseup: _cache[6] || (_cache[6] = ($event) => touchStartScroll(0)),
            "scroll-x": true,
            "scroll-y": true,
            "scroll-left": tableLeft.value[0],
            style: vue.normalizeStyle([vue.unref(defaultProps).height ? { height: `${vue.unref(defaultProps).height}rpx` } : "", { width: `${vue.unref(defaultProps).width}rpx` }])
          }, [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_tabel.value, (item2, index2) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "flex flex-row flex-nowrap",
                style: { "white-space": "nowrap" },
                key: index2,
                margin: [0, 0]
              }, [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(item2.data, (item, index) => {
                  return vue.openBlock(), vue.createBlock(__easycom_7$1, {
                    border: vue.unref(_showBottomBorder) ? 1 : 0,
                    "border-direction": "bottom",
                    key: index,
                    margin: [0, 0],
                    color: item.color,
                    text: item.light,
                    style: { "flex-shrink": "0" },
                    _class: "flex flex-row " + item2.align,
                    height: vue.unref(defaultProps).cellHeight - 6,
                    width: item.width - 10,
                    padding: [10, 6]
                  }, {
                    default: vue.withCtx(() => {
                      var _a2;
                      return [
                        item.type == "text" ? (vue.openBlock(), vue.createBlock(__easycom_1, {
                          key: 0,
                          "font-size": 24,
                          label: item.text
                        }, null, 8, ["label"])) : vue.createCommentVNode("v-if", true),
                        item.type == "button" ? (vue.openBlock(), vue.createBlock(__easycom_5, {
                          key: 1,
                          onClick: ($event) => rowClick(index2, index),
                          margin: [0, 0],
                          size: "small",
                          color: (_a2 = _col.value[index]) == null ? void 0 : _a2.bgColor,
                          width: item.width - 16,
                          "font-size": 24,
                          label: item.text
                        }, null, 8, ["onClick", "color", "width", "label"])) : vue.createCommentVNode("v-if", true)
                      ];
                    }),
                    _: 2
                  }, 1032, ["border", "color", "text", "_class", "height", "width"]);
                }), 128))
              ]);
            }), 128))
          ], 44, ["scroll-left"])
        ]);
      };
    }
  });
  var __easycom_6$1 = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-2f8a041a"], ["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-table/tm-table.vue"]]);
  const _sfc_main$a = /* @__PURE__ */ vue.defineComponent({
    __name: "tm-float-button",
    props: {
      followTheme: {
        type: [Boolean, String],
        default: true
      },
      position: {
        type: String,
        default: "br",
        validator: (val) => {
          let isv = ["bc", "bl", "br", "tc", "tl", "tr"].includes(val);
          if (!isv) {
            formatAppLog("error", "at tmui/components/tm-float-button/tm-float-button.vue:76", "\u4F4D\u7F6E\u53C2\u6570\u4E3A:'bc','bl','br','tc','tl','tr'\u5176\u4E2D\u7684\u4E00\u9879");
          }
          return isv;
        }
      },
      actionsPos: {
        type: String,
        default: "top",
        validator: (val) => {
          let isv = ["left", "right", "top", "bottom"].includes(val);
          if (!isv) {
            formatAppLog("error", "at tmui/components/tm-float-button/tm-float-button.vue:88", "\u4F4D\u7F6E\u53C2\u6570\u4E3A:'left','right','top','bottom'\u5176\u4E2D\u7684\u4E00\u9879");
          }
          return isv;
        }
      },
      width: {
        type: Number,
        default: 112
      },
      height: {
        type: Number,
        default: 112
      },
      offset: {
        type: Array,
        default: () => [32, 32]
      },
      actions: {
        type: Array,
        default: () => []
      },
      btn: {
        type: Object,
        default: () => {
        },
        required: true
      },
      showActions: {
        type: Boolean,
        default: false
      },
      clickHidnActions: {
        type: Boolean,
        default: true
      }
    },
    emits: ["click", "change"],
    setup(__props, { emit: emits }) {
      var _a2;
      const props = __props;
      const sysinfo2 = vue.inject("tmuiSysInfo", vue.computed(() => {
        return { bottom: 0, height: 750, width: uni.upx2px(750), top: 0, isCustomHeader: false, sysinfo: null };
      }));
      const windowWidth = vue.computed(() => sysinfo2.value.width);
      vue.computed(() => sysinfo2.value.top);
      const isH5 = vue.ref(false);
      const showActions = vue.ref((_a2 = props.showActions) != null ? _a2 : false);
      const BtnPos = vue.computed(() => props.position);
      const AcionPos = vue.computed(() => props.actionsPos);
      const _offset = vue.computed(() => {
        var _a3;
        let ost = (_a3 = props.offset) != null ? _a3 : [0, 0];
        return ost;
      });
      const centerPosLeft = vue.computed(() => {
        let ps = (windowWidth.value - uni.upx2px(props.width * 1.5)) / 2 + uni.upx2px(_offset.value[0]);
        ps = (windowWidth.value - uni.upx2px(props.width * 2)) / 2 + uni.upx2px(_offset.value[0]);
        return ps;
      });
      const _btn = vue.computed(() => {
        var _a3;
        return __spreadValues({ icon: "tmicon-plus", fontSize: 20, color: "primary", linear: "", linearDeep: "accent", label: "", iconSize: 42, fontColor: "" }, (_a3 = props.btn) != null ? _a3 : {});
      });
      const _actionsItem = vue.computed(() => {
        let asbtn = props.actions.map((el) => {
          let default_btn = { icon: "tmicon-plus", fontSize: 20, color: "primary", linear: "", linearDeep: "accent", label: "", fontColor: "", iconSize: 36 };
          return __spreadValues(__spreadValues({}, default_btn), el);
        });
        return asbtn;
      });
      const AcionPos_xy = vue.computed(() => {
        if ((BtnPos.value == "tl" || BtnPos.value == "tr" || BtnPos.value == "tc" || BtnPos.value == "bc") && AcionPos.value == "bottom") {
          return { top: `${props.height}rpx`, height: props.actions.length * props.height + "rpx", dispaly: "flex", "flex-direction": "column" };
        }
        if ((BtnPos.value == "bl" || BtnPos.value == "br") && AcionPos.value == "bottom") {
          return { top: `${props.height}rpx`, height: props.actions.length * props.height + "rpx", dispaly: "flex", "flex-direction": "column" };
        }
        if ((BtnPos.value == "bl" || BtnPos.value == "br") && AcionPos.value == "top") {
          return { top: `0px`, dispaly: "flex", "flex-direction": "column-reverse" };
        }
        if ((BtnPos.value == "tl" || BtnPos.value == "tr" || BtnPos.value == "tc" || BtnPos.value == "bc") && AcionPos.value == "top") {
          return { top: `-0rpx`, height: props.actions.length * props.height + "rpx", dispaly: "flex", "flex-direction": "column" };
        }
        if ((BtnPos.value == "tl" || BtnPos.value == "tc" || BtnPos.value == "bl" || BtnPos.value == "br" || BtnPos.value == "bc") && AcionPos.value == "right") {
          return { left: `${props.height}rpx`, width: props.actions.length * props.height + "rpx", dispaly: "flex", "flex-direction": "row" };
        }
        if ((BtnPos.value == "tl" || BtnPos.value == "tr" || BtnPos.value == "tc" || BtnPos.value == "bl" || BtnPos.value == "br" || BtnPos.value == "bc") && AcionPos.value == "left") {
          return { right: `${props.height}rpx`, width: props.actions.length * props.height + "rpx", dispaly: "flex", "flex-direction": "row-reverse" };
        }
        if (BtnPos.value == "tr" && AcionPos.value == "right") {
          return { right: `${0}rpx`, width: props.actions.length * props.height + "rpx", dispaly: "flex", "flex-direction": "row" };
        }
      });
      const parent_style = vue.computed(() => {
        let height_width = showActions.value ? (props.actions.length + 1) * props.height : props.height;
        if ((BtnPos.value == "tl" || BtnPos.value == "tr" || BtnPos.value == "tc") && AcionPos.value == "bottom") {
          return { height: height_width + "rpx" };
        }
        if (BtnPos.value == "tl" && AcionPos.value == "top") {
          let top = -(props.actions.length * props.height - _offset.value[1]);
          return {
            height: height_width + "rpx",
            transform: `translateX(${_offset.value[0]}rpx) translateY(${top}rpx)`,
            "flex-direction": "column-reverse"
          };
        }
        if ((BtnPos.value == "tl" || BtnPos.value == "tc") && AcionPos.value == "right") {
          return { width: height_width + "rpx" };
        }
        if (BtnPos.value == "tl" && AcionPos.value == "left") {
          let left = -(props.actions.length * props.height - _offset.value[0]);
          return {
            width: height_width + "rpx",
            transform: `translateX(${left}rpx) translateY(${_offset.value[1]}rpx)`,
            "flex-direction": "row-reverse"
          };
        }
        if (BtnPos.value == "tr" && AcionPos.value == "left") {
          -(props.actions.length * props.height - _offset.value[0]);
          return {
            width: height_width + "rpx",
            "flex-direction": "row-reverse"
          };
        }
        if (BtnPos.value == "tr" && AcionPos.value == "top") {
          let top = -(props.actions.length * props.height - _offset.value[1]);
          return {
            height: height_width + "rpx",
            transform: `translateX(-${_offset.value[0]}rpx) translateY(${top}rpx)`,
            "flex-direction": "column-reverse"
          };
        }
        if (BtnPos.value == "tr" && AcionPos.value == "right") {
          let right = props.actions.length * props.height - _offset.value[0];
          return {
            width: height_width + "rpx",
            transform: `translateX(${right}rpx) translateY(${_offset.value[1]}rpx)`
          };
        }
        if (BtnPos.value == "tc" && AcionPos.value == "left") {
          let left = centerPosLeft.value - uni.upx2px(props.actions.length * props.height) - uni.upx2px(_offset.value[0]);
          return {
            width: height_width + "rpx",
            transform: `translateX(${left}px) translateY(${_offset.value[1]}rpx)`,
            "flex-direction": "row-reverse"
          };
        }
        if (BtnPos.value == "tc" && AcionPos.value == "top") {
          let left = centerPosLeft.value + uni.upx2px(_offset.value[0]);
          let top = -(props.actions.length * props.height - _offset.value[1]);
          return {
            height: height_width + "rpx",
            transform: `translateX(${left}px) translateY(${top}rpx)`,
            "flex-direction": "column-reverse"
          };
        }
        if (BtnPos.value == "bl" && AcionPos.value == "bottom") {
          let top = props.actions.length * props.height - _offset.value[1];
          return {
            height: height_width + "rpx",
            transform: `translateX(${_offset.value[0]}rpx) translateY(${top}rpx)`
          };
        }
        if (BtnPos.value == "bl" && AcionPos.value == "top") {
          let top = -_offset.value[1];
          return {
            height: height_width + "rpx",
            transform: `translateX(${_offset.value[0]}rpx) translateY(${top}rpx)`,
            "flex-direction": "column-reverse"
          };
        }
        if (BtnPos.value == "bl" && AcionPos.value == "right") {
          return {
            width: height_width + "rpx"
          };
        }
        if (BtnPos.value == "bl" && AcionPos.value == "left") {
          let left = -(props.actions.length * props.height - _offset.value[0]);
          return {
            width: height_width + "rpx",
            transform: `translateX(${left}rpx) translateY(${-_offset.value[1]}rpx)`,
            "flex-direction": "row-reverse"
          };
        }
        if (BtnPos.value == "br" && AcionPos.value == "bottom") {
          let top = props.actions.length * props.height - _offset.value[1];
          return {
            height: height_width + "rpx",
            transform: `translateX(${-_offset.value[0]}rpx) translateY(${top}rpx)`
          };
        }
        if (BtnPos.value == "br" && AcionPos.value == "top") {
          let top = -_offset.value[1];
          return {
            height: height_width + "rpx",
            transform: `translateX(${-_offset.value[0]}rpx) translateY(${top}rpx)`,
            "flex-direction": "column-reverse"
          };
        }
        if (BtnPos.value == "br" && AcionPos.value == "right") {
          let right = props.actions.length * props.height - _offset.value[0];
          return {
            width: height_width + "rpx",
            transform: `translateX(${right}rpx) translateY(${-_offset.value[1]}rpx)`
          };
        }
        if (BtnPos.value == "br" && AcionPos.value == "left") {
          let left = -_offset.value[0];
          return {
            width: height_width + "rpx",
            transform: `translateX(${left}rpx) translateY(${-_offset.value[1]}rpx)`,
            "flex-direction": "row-reverse"
          };
        }
        if (BtnPos.value == "bc" && AcionPos.value == "left") {
          let left = centerPosLeft.value - uni.upx2px(props.actions.length * props.height) - uni.upx2px(_offset.value[0]);
          return {
            width: height_width + "rpx",
            transform: `translateX(${left}px) translateY(${-_offset.value[1]}rpx)`,
            "flex-direction": "row-reverse"
          };
        }
        if (BtnPos.value == "bc" && AcionPos.value == "right") {
          let left = centerPosLeft.value + uni.upx2px(_offset.value[0]);
          return {
            width: height_width + "rpx",
            transform: `translateX(${left}px) translateY(${-_offset.value[1]}rpx)`,
            "flex-direction": "row"
          };
        }
        if (BtnPos.value == "bc" && AcionPos.value == "top") {
          let left = centerPosLeft.value + uni.upx2px(_offset.value[0]);
          let top = -_offset.value[1];
          return {
            height: height_width + "rpx",
            transform: `translateX(${left}px) translateY(${top}rpx)`,
            "flex-direction": "column-reverse"
          };
        }
        if (BtnPos.value == "bc" && AcionPos.value == "bottom") {
          let left = centerPosLeft.value + uni.upx2px(_offset.value[0]);
          let top = props.actions.length * props.height + _offset.value[1];
          return {
            height: height_width + "rpx",
            transform: `translateX(${left}px) translateY(${top}rpx)`,
            "flex-direction": "column"
          };
        }
      });
      function onclick(e) {
        if (props.clickHidnActions) {
          showActions.value = !showActions.value;
        } else {
          showActions.value = true;
        }
        emits("click", e);
      }
      function change(index, item) {
        if (props.clickHidnActions) {
          showActions.value = false;
        }
        emits("change", index, item);
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", {
          class: "fixed zIndex-12 flex",
          style: vue.normalizeStyle([
            vue.unref(BtnPos) == "tl" ? { transform: `translateX(${vue.unref(_offset)[0]}rpx) translateY(${vue.unref(_offset)[1]}rpx)` } : "",
            vue.unref(BtnPos) == "tr" ? { transform: `translateX(-${vue.unref(_offset)[0]}rpx) translateY(${vue.unref(_offset)[1]}rpx)`, right: "0px" } : "",
            vue.unref(BtnPos) == "tc" ? { transform: `translateX(${vue.unref(centerPosLeft)}px) translateY(${vue.unref(_offset)[1]}rpx)` } : "",
            vue.unref(BtnPos) == "bl" ? { transform: `translateX(${vue.unref(_offset)[0]}rpx) translateY(-${vue.unref(_offset)[1]}rpx)`, bottom: "0px" } : "",
            vue.unref(BtnPos) == "br" ? { transform: `translateX(-${vue.unref(_offset)[0]}rpx) translateY(-${vue.unref(_offset)[1]}rpx)`, right: "0px", bottom: "0px" } : "",
            vue.unref(BtnPos) == "bc" ? { transform: `translateX(${vue.unref(centerPosLeft)}px) translateY(-${vue.unref(_offset)[1]}rpx)`, bottom: "0px" } : "",
            !isH5.value && (vue.unref(BtnPos) == "tl" || vue.unref(BtnPos) == "tc" || vue.unref(BtnPos) == "tr") ? { top: "0px" } : "",
            vue.unref(parent_style)
          ])
        }, [
          vue.createCommentVNode(" \u4E3B\u6309\u94AE "),
          vue.createElementVNode("view", {
            style: vue.normalizeStyle([{ width: props.width + "rpx", height: props.height + "rpx" }]),
            class: "flex-center"
          }, [
            vue.createVNode(__easycom_7$1, {
              transprent: true,
              padding: [0, 0],
              margin: [0, 0],
              color: vue.unref(_btn).color
            }, {
              default: vue.withCtx(() => [
                vue.renderSlot(_ctx.$slots, "default", {}, () => [
                  vue.createVNode(__easycom_5, {
                    followTheme: props.followTheme,
                    onClick: onclick,
                    _class: "flex flex-col flex-col-center-center",
                    shadow: 3,
                    linear: vue.unref(_btn).linear,
                    "linear-deep": vue.unref(_btn).linearDeep,
                    color: vue.unref(_btn).color,
                    margin: [0, 0],
                    round: 16,
                    padding: [0, 0],
                    width: props.width - 12,
                    height: props.height - 12
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(__easycom_0$2, {
                        userInteractionEnabled: false,
                        "follow-dark": false,
                        color: vue.unref(_btn).fontColor,
                        name: vue.unref(_btn).icon,
                        "font-size": vue.unref(_btn).iconSize
                      }, null, 8, ["color", "name", "font-size"]),
                      vue.unref(_btn).label ? (vue.openBlock(), vue.createBlock(__easycom_1, {
                        key: 0,
                        userInteractionEnabled: false,
                        "follow-dark": false,
                        color: vue.unref(_btn).fontColor,
                        label: vue.unref(_btn).label,
                        "font-size": vue.unref(_btn).fontSize
                      }, null, 8, ["color", "label", "font-size"])) : vue.createCommentVNode("v-if", true)
                    ]),
                    _: 1
                  }, 8, ["followTheme", "linear", "linear-deep", "color", "width", "height"])
                ])
              ]),
              _: 3
            }, 8, ["color"])
          ], 4),
          vue.createCommentVNode(" \u5B50\u83DC\u5355 "),
          vue.unref(_actionsItem).length > 0 && showActions.value ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            userInteractionEnabled: showActions.value,
            class: "absolute flex",
            style: vue.normalizeStyle([vue.unref(AcionPos_xy)])
          }, [
            vue.createElementVNode("view", {
              style: vue.normalizeStyle([{ width: props.width + "rpx", height: props.height + "rpx" }]),
              class: "flex-center"
            }, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(_actionsItem), (item, index) => {
                return vue.openBlock(), vue.createBlock(__easycom_7$1, {
                  followTheme: props.followTheme,
                  onClick: ($event) => change(index, item),
                  key: index,
                  _class: "flex flex-col flex-col-center-center",
                  round: 16,
                  shadow: 2,
                  linear: item.linear,
                  "linear-deep": item.linearDeep,
                  color: item.color,
                  margin: [0, 0],
                  padding: [0, 0],
                  width: props.width - 12,
                  height: props.height - 12
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(__easycom_0$2, {
                      userInteractionEnabled: false,
                      color: item.fontColor,
                      name: item.icon,
                      "font-size": item.iconSize
                    }, null, 8, ["color", "name", "font-size"]),
                    item.label ? (vue.openBlock(), vue.createBlock(__easycom_1, {
                      key: 0,
                      userInteractionEnabled: false,
                      color: item.fontColor,
                      label: item.label,
                      "font-size": item.fontSize
                    }, null, 8, ["color", "label", "font-size"])) : vue.createCommentVNode("v-if", true)
                  ]),
                  _: 2
                }, 1032, ["followTheme", "onClick", "linear", "linear-deep", "color", "width", "height"]);
              }), 128))
            ], 4)
          ], 12, ["userInteractionEnabled"])) : vue.createCommentVNode("v-if", true)
        ], 4);
      };
    }
  });
  var __easycom_14 = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-float-button/tm-float-button.vue"]]);
  const useTmRouterBefore = (arg) => {
    formatAppLog("log", "at router/index.ts:18", "\u524D");
    if (!uni.$tm.u.getCookie("token") && arg.path != "/pages/assets/login" && arg.path != "/pages/assets/register") {
      uni.$tm.u.routerTo("/pages/assets/login", "redirect");
    }
  };
  const useTmRouterAfter = (arg) => {
    formatAppLog("log", "at router/index.ts:31", "\u540E");
  };
  const _sfc_main$9 = /* @__PURE__ */ vue.defineComponent({
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
      var _a2, _b2, _c2, _d;
      const props = __props;
      const store = useTmpiniaStore();
      const proxy = (_b2 = (_a2 = vue.getCurrentInstance()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      let pages2 = getCurrentPages().pop();
      onLoad((opts) => {
        var _a3;
        useTmRouterAfter({
          path: (_a3 = pages2 == null ? void 0 : pages2.route) != null ? _a3 : "",
          opts,
          context: proxy
        });
      });
      const tmcfg = vue.computed(() => store.tmStore);
      const isSetThemeOk = vue.ref(false);
      const isDark = vue.computed(() => computedDark(props, tmcfg.value));
      const tmcomputed = vue.computed(() => computedTheme(props, isDark.value, tmcfg.value));
      const _showMenu = vue.ref(props.showMenu);
      const sysinfo2 = getWindow();
      const sysinfoRef = vue.ref(sysinfo2);
      vue.provide("tmuiSysInfo", vue.computed(() => sysinfoRef.value));
      const view_width = vue.ref(sysinfo2.width);
      let view_height = vue.ref(sysinfo2.height);
      uni.$tm.u.getUid(1);
      let isTabbarPage = false;
      let nowPage = getCurrentPages().pop();
      let barLit = (_d = (_c2 = uni.$tm.tabBar) == null ? void 0 : _c2.list) != null ? _d : [];
      for (let i = 0; i < barLit.length; i++) {
        if ((nowPage == null ? void 0 : nowPage.route) == barLit[i].pagePath) {
          isTabbarPage = true;
          break;
        }
      }
      const _blurEffect = vue.computed(() => {
        if (props.blur === true && isDark.value)
          return "dark";
        if (props.blur === true && !isDark.value)
          return "extralight";
        return "none";
      });
      let appConfig = vue.ref({
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
          if (!sysinfo2.isCustomHeader) {
            uni.setNavigationBarColor({
              backgroundColor: appConfig.value.theme,
              frontColor: "#ffffff"
            });
          }
          plus.navigator.setStatusBarStyle("light");
          if (isTabbarPage) {
            uni.setTabBarStyle({
              backgroundColor: "#000000",
              borderStyle: "#1a1a1a",
              color: "#ffffff",
              selectedColor: uni.$tm.tabBar.selectedColor || tmcomputed.value.textColor
            });
          }
        } else {
          if (!sysinfo2.isCustomHeader) {
            uni.setNavigationBarColor({
              backgroundColor: props.navbar.background,
              frontColor: props.navbar.fontColor
            });
          }
          plus.navigator.setStatusBarStyle("dark");
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
      vue.provide("appTextColor", vue.computed(() => tmcomputed.value.textColor));
      vue.provide("custom_space_size", [0, 0]);
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
      vue.onBeforeMount(() => setAppStyle());
      vue.watch(() => props.showMenu, () => {
        _showMenu.value = props.showMenu;
      });
      vue.watch([() => tmcfg.value.color, isDark], () => {
        isSetThemeOk.value = false;
        setAppStyle();
      });
      function toogleOpen(type) {
        _showMenu.value = type;
        emits("update:showMenu", _showMenu.value);
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", {
          class: "flex flex-col relative",
          style: vue.normalizeStyle([vue.unref(appConfig).theme ? { background: vue.unref(appConfig).theme } : "", { width: vue.unref(appConfig).width + "px", minHeight: vue.unref(appConfig).height + "px" }])
        }, [
          vue.createElementVNode("view", {
            class: vue.normalizeClass([[__props.blur ? "blur" : ""], "flex flex-col flex-1"]),
            ref: "bodyEl",
            style: vue.normalizeStyle([
              {
                zIndex: 1,
                width: vue.unref(appConfig).width + "px",
                minHeight: vue.unref(appConfig).height + "px"
              },
              __props.blur ? { backgroundColor: vue.unref(isDark) ? "rgba(0,0,0,0.3)" : "rgba(248, 248, 248, 0.7)" } : ""
            ])
          }, [
            vue.renderSlot(_ctx.$slots, "default", {}, () => [
              vue.createElementVNode("text", null, "\u5728\u8FD9\u91CC\u653E\u7F6E\u5185\u5BB9")
            ], true)
          ], 6),
          vue.createElementVNode("view", {
            blurEffect: vue.unref(_blurEffect),
            onClick: _cache[1] || (_cache[1] = vue.withModifiers(($event) => toogleOpen(false), ["stop"])),
            ref: "menuEl",
            class: vue.normalizeClass([[_showMenu.value ? "menuOn" : ""], "fixed l-0 t-0 menu"]),
            style: vue.normalizeStyle({ width: vue.unref(appConfig).width + "px", height: vue.unref(appConfig).height + "px", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(3px)" })
          }, [
            _showMenu.value ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              style: vue.normalizeStyle({ width: vue.unref(appConfig).width * 0.7 + "px", height: vue.unref(appConfig).height + "px", boxShadow: "3px 0 16px rgba(0,0,0,0.3)" })
            }, [
              vue.createElementVNode("scroll-view", {
                onClick: _cache[0] || (_cache[0] = vue.withModifiers(() => {
                }, ["stop"])),
                "scroll-y": true,
                style: vue.normalizeStyle({ width: vue.unref(appConfig).width * 0.7 + "px", height: vue.unref(appConfig).height + "px" })
              }, [
                vue.renderSlot(_ctx.$slots, "menu", {
                  sys: { width: vue.unref(appConfig).width * 0.7, height: vue.unref(appConfig).height }
                }, void 0, true)
              ], 4)
            ], 4)) : vue.createCommentVNode("v-if", true)
          ], 14, ["blurEffect"])
        ], 4);
      };
    }
  });
  var __easycom_8 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-5d38090c"], ["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-app/tm-app.vue"]]);
  const websiteUrl = "http://qtadmin.tgbott.com/api";
  const now = Date.now || function() {
    return new Date().getTime();
  };
  const isArray$1 = Array.isArray || function(obj) {
    return obj instanceof Array;
  };
  const sysinfo = uni.$tm.u.getWindow();
  sysinfo.width = sysinfo.width + 300;
  const userinfo = uni.$tm.u.getCookie("userinfo");
  var helper = {
    websiteUrl,
    now,
    isArray: isArray$1,
    sysinfo,
    userinfo
  };
  const _sfc_main$8 = {
    components: {
      helper
    },
    data() {
      return {
        banner: [
          "https://file.coinexstatic.com/2022-07-25/5D33F9D38DA075B4D176818C48AA6EFF.png",
          "https://file.coinexstatic.com/2022-07-22/8388D3449FADF0D958DABB16BE42AC54.png",
          "https://file.coinexstatic.com/2022-08-05/FD18BEF8CFAA163CA6AA5B59BE0F52D8.png",
          "https://file.coinexstatic.com/2022-03-22/C858460B76A0A6F856E4D8B6752C59AB.png"
        ],
        sysinfo: "",
        test: "21312",
        tableData: [
          {
            data: {
              unpayamount: 100,
              desc: "\u6CA1\u6709",
              status: "\u901A\u8FC7"
            }
          },
          {
            data: {
              paytime: {
                text: "\u83B7\u53D6",
                type: "button"
              },
              desc: {
                text: "\u597D\u5427",
                color: "orange",
                light: true
              },
              status: "\u901A\u8FC7"
            }
          }
        ],
        userinfo: "",
        header: [
          { title: "\u5E02\u503C", key: "paytime", width: 200 },
          { title: "\u4EF7\u683C", key: "desc", width: 200 },
          { title: "24\u6DA8\u8DCC", key: "status", sort: true, width: 200 }
        ],
        coinlist: [
          { key: "1", title: "\u6DA8\u5E45\u699C", icon: "" },
          { key: "2", title: "\u8DCC\u5E45\u699C", icon: "" },
          { key: "3", title: "\u6210\u4EA4\u699C", dotColor: "yellow", icon: "" },
          { key: "4", title: "\u5E02\u503C\u699C", icon: "" }
        ]
      };
    },
    created() {
    },
    onLoad() {
      uni.$tm.u.toast("213");
      this.userinfo = uni.$tm.u.getCookie("userinfo");
    },
    mounted() {
    },
    methods: {
      onChangeDark() {
        var _a2;
        formatAppLog("log", "at pages/index/index.vue:141", "\u5207\u6362");
        (_a2 = app.value) == null ? void 0 : _a2.setDark();
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_tm_avatar = resolveEasycom(vue.resolveDynamicComponent("tm-avatar"), __easycom_0$1);
    const _component_tm_navbar = resolveEasycom(vue.resolveDynamicComponent("tm-navbar"), __easycom_2);
    const _component_tm_text = resolveEasycom(vue.resolveDynamicComponent("tm-text"), __easycom_1);
    const _component_tm_divider = resolveEasycom(vue.resolveDynamicComponent("tm-divider"), tmDivider);
    const _component_tm_sheet = resolveEasycom(vue.resolveDynamicComponent("tm-sheet"), __easycom_7$1);
    const _component_tm_carousel = resolveEasycom(vue.resolveDynamicComponent("tm-carousel"), __easycom_5$1);
    const _component_tm_icon = resolveEasycom(vue.resolveDynamicComponent("tm-icon"), __easycom_0$2);
    const _component_tm_grid_item = resolveEasycom(vue.resolveDynamicComponent("tm-grid-item"), __easycom_7);
    const _component_tm_grid = resolveEasycom(vue.resolveDynamicComponent("tm-grid"), __easycom_8$1);
    const _component_tm_image = resolveEasycom(vue.resolveDynamicComponent("tm-image"), __easycom_9);
    const _component_tm_col = resolveEasycom(vue.resolveDynamicComponent("tm-col"), __easycom_10);
    const _component_tm_row = resolveEasycom(vue.resolveDynamicComponent("tm-row"), __easycom_11);
    const _component_tm_tabs = resolveEasycom(vue.resolveDynamicComponent("tm-tabs"), __easycom_0);
    const _component_tm_table = resolveEasycom(vue.resolveDynamicComponent("tm-table"), __easycom_6$1);
    const _component_tm_float_button = resolveEasycom(vue.resolveDynamicComponent("tm-float-button"), __easycom_14);
    const _component_tm_app = resolveEasycom(vue.resolveDynamicComponent("tm-app"), __easycom_8);
    return vue.openBlock(), vue.createBlock(_component_tm_app, { ref: "app" }, {
      default: vue.withCtx(() => [
        vue.createCommentVNode(" navbar "),
        vue.createVNode(_component_tm_navbar, {
          title: "avatar",
          shadow: 0,
          "hide-home": "",
          hideBack: ""
        }, {
          left: vue.withCtx(() => [
            vue.createElementVNode("navigator", {
              url: "/pages/assets/login",
              "hover-class": "none",
              "open-type": "navigate",
              "animation-type": "pop-in",
              "animation-duration": "200"
            }, [
              vue.createVNode(_component_tm_avatar, {
                "font-size": 60,
                img: $data.userinfo.avatar
              }, null, 8, ["img"])
            ])
          ]),
          right: vue.withCtx(() => [
            vue.createVNode(_component_tm_avatar, {
              onClick: _ctx.testurl,
              "font-size": 50,
              img: "/static/logo.png"
            }, null, 8, ["onClick"]),
            vue.createCommentVNode(' <tm-icon _class="px-10" :fontSize="40" name="tmicon-comment-dots"></tm-icon> '),
            vue.createElementVNode("navigator", {
              url: "search",
              "open-type": "navigate",
              "hover-class": "navigator-hover",
              "animation-type": "pop-in",
              "animation-duration": "3000"
            }, [
              vue.createVNode(_component_tm_avatar, {
                "font-size": 50,
                img: "/static/logo.png"
              })
            ])
          ]),
          _: 1
        }),
        vue.createVNode(_component_tm_sheet, {
          margin: [0, 0],
          followTheme: true
        }, {
          default: vue.withCtx(() => [
            vue.createCommentVNode(" asset "),
            vue.createVNode(_component_tm_sheet, {
              margin: [0, 0],
              followTheme: true
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_tm_text, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: "\u603B\u8D44\u4EA7\u4F30\u503C"
                }),
                vue.createVNode(_component_tm_divider),
                vue.createVNode(_component_tm_text, {
                  label: "85.61USD",
                  "font-size": 38,
                  style: { "font-weight": "700" }
                })
              ]),
              _: 1
            }),
            vue.createCommentVNode(" carousel "),
            vue.createVNode(_component_tm_carousel, {
              autoplay: "",
              margin: [0, 18],
              align: "center",
              round: 3,
              width: 686,
              height: 300,
              list: $data.banner
            }, null, 8, ["list"]),
            vue.createCommentVNode(" menu "),
            vue.createVNode(_component_tm_grid, {
              width: $data.sysinfo.width,
              col: 4
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_tm_grid_item, { dot: "" }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_tm_icon, {
                      name: "tmicon-user-fill",
                      "font-size": 42
                    })
                  ]),
                  _: 1
                }),
                vue.createVNode(_component_tm_grid_item, { count: "HOT" }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_tm_icon, {
                      name: "tmicon-user-fill",
                      "font-size": 42
                    })
                  ]),
                  _: 1
                }),
                vue.createVNode(_component_tm_grid_item, { count: 55 }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_tm_icon, {
                      name: "tmicon-user-fill",
                      "font-size": 42
                    })
                  ]),
                  _: 1
                }),
                vue.createVNode(_component_tm_grid_item, { icon: "tmicon-gem" }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_tm_icon, {
                      name: "tmicon-user-fill",
                      "font-size": 42
                    })
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["width"])
          ]),
          _: 1
        }),
        vue.createCommentVNode(" quick "),
        vue.createVNode(_component_tm_sheet, {
          padding: [0, 0],
          margin: [0, 15],
          followTheme: true,
          _class: "overflow"
        }, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_tm_row, {
              gutter: 0,
              color: "blue-grey"
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_tm_col, {
                  class: "flex-6",
                  height: 160
                }, {
                  default: vue.withCtx(() => [
                    vue.createElementVNode("view", { class: "flex-row flex-row-center-between" }, [
                      vue.createVNode(_component_tm_text, {
                        "font-size": 34,
                        label: "\u5FEB\u6377\u4E70\u5E01"
                      }),
                      vue.createVNode(_component_tm_image, {
                        width: 60,
                        height: 60,
                        src: "/static/logo.png"
                      })
                    ])
                  ]),
                  _: 1
                }),
                vue.createVNode(_component_tm_divider, {
                  color: "green",
                  vertical: ""
                }),
                vue.createVNode(_component_tm_col, {
                  class: "flex-6",
                  height: 160
                }, {
                  default: vue.withCtx(() => [
                    vue.createElementVNode("view", { class: "flex-row flex-row-center-between" }, [
                      vue.createVNode(_component_tm_text, {
                        "font-size": 34,
                        label: "C2C\u4E70\u5E01"
                      }),
                      vue.createVNode(_component_tm_image, {
                        width: 60,
                        height: 60,
                        src: "/static/logo.png"
                      })
                    ])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        vue.createCommentVNode(" coin list "),
        vue.createVNode(_component_tm_sheet, {
          padding: [0, 0],
          _class: "overflow",
          margin: [0, 0],
          followTheme: true
        }, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_tm_tabs, {
              showTabsLineAni: "",
              "item-width": 110,
              width: 636,
              height: 500,
              "default-name": "1",
              list: $data.coinlist
            }, null, 8, ["list"]),
            vue.createVNode(_component_tm_table, {
              height: 450,
              width: 638,
              "table-data": $data.tableData,
              header: $data.header
            }, null, 8, ["table-data", "header"])
          ]),
          _: 1
        }),
        vue.createCommentVNode(" end "),
        vue.createElementVNode("view", { style: { "height": "150rpx" } }),
        vue.createVNode(_component_tm_float_button, {
          onClick: $options.onChangeDark,
          btn: { icon: "tmicon-ios-sunny", color: "primary", linear: "right", linearDeep: "dark" },
          style: { "margin-bottom": "10%" }
        }, null, 8, ["onClick"])
      ]),
      _: 1
    }, 512);
  }
  var PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render], ["__file", "F:/CoinQT/CoinQT_app/pages/index/index.vue"]]);
  const _sfc_main$7 = /* @__PURE__ */ vue.defineComponent({
    __name: "tm-segtab",
    props: __spreadProps(__spreadValues({}, custom_props), {
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
      var _a2, _b2, _c2, _d;
      const props = __props;
      const proxy = (_b2 = (_a2 = vue.getCurrentInstance()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const leftPos = vue.ref(0);
      const leftWidth = vue.ref(0);
      let timid = uni.$tm.u.getUid();
      const _list = vue.computed(() => {
        var _a3;
        let templist = [];
        for (let i = 0, len = props.list.length; i < len; i++) {
          let al = { text: "", id: i };
          let el = props.list[i];
          if (typeof el == "string" || typeof el == "number") {
            al.text = el;
          } else if (typeof el == "object") {
            al.text = (_a3 = el == null ? void 0 : el.text) != null ? _a3 : "";
            if (typeof (el == null ? void 0 : el.id) != "undefined") {
              al.id = el["id"];
            }
          }
          templist.push(al);
        }
        return templist;
      });
      const _cId = vue.ref((_c2 = props.defaultValue) != null ? _c2 : 0);
      const _blackValue = _cId.value;
      async function itemClick(index, id) {
        emits("click", index);
        if (typeof props.beforeChange === "function") {
          uni.showLoading({ title: "...", mask: true });
          let p = await props.beforeChange(index);
          if (typeof p === "function") {
            p = await p(index);
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
      }
      vue.watch([() => props.modelValue, () => props.list], () => {
        _cId.value = props.modelValue;
      }, { deep: true });
      vue.watch([_cId], () => {
        initPos();
      }, { deep: true });
      vue.onMounted(() => {
        initPos();
      });
      function initPos() {
        let indexel = _list.value.findIndex((el) => el.id === _cId.value);
        clearTimeout(timid);
        timid = setTimeout(() => {
          vue.nextTick(() => getDomRectBound(indexel));
        }, 300);
      }
      function getDomRectBound(idx) {
        uni.createSelectorQuery().in(proxy).select(".tm-segtab").boundingClientRect((nodeParent) => {
          var _a3;
          let parentleft = (_a3 = nodeParent == null ? void 0 : nodeParent.left) != null ? _a3 : 0;
          uni.createSelectorQuery().in(proxy).select(".tab" + idx).boundingClientRect((node) => {
            var _a4, _b3;
            if (!node)
              return;
            leftPos.value = ((_a4 = node == null ? void 0 : node.left) != null ? _a4 : 0) - uni.upx2px(props.gutter) - parentleft;
            leftWidth.value = ((_b3 = node == null ? void 0 : node.width) != null ? _b3 : 0) - 0;
          }).exec();
        }).exec();
      }
      const rulesObj = vue.inject("tmFormItemRules", vue.computed(() => {
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
            return __spreadProps(__spreadValues({}, el), {
              validator: (val) => {
                return val === "" ? false : true;
              }
            });
          } else {
            return __spreadProps(__spreadValues({}, el), {
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
          return new Promise(async (res, rej) => {
            if (typeof el.validator === "function") {
              let vr = await el.validator(_cId.value);
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
          });
        });
        return Promise.all(rules_fun);
      };
      async function pushFormItem(isCheckVail = true) {
        if (parentFormItem) {
          if (isCheckVail) {
            validate(vue.toRaw(rulesObj.value)).then((ev) => {
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
      }
      pushFormItem();
      const tmFormFun = vue.inject("tmFormFun", vue.computed(() => ""));
      vue.watch(tmFormFun, () => {
        if (tmFormFun.value == "reset") {
          _cId.value = _blackValue;
          emits("update:modelValue", _blackValue);
          pushFormItem(true);
        }
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", {
          class: vue.normalizeClass(["tm-segtab relative flex flex-col", [`round-${props.round}`]]),
          ref: "tm-segtab",
          style: vue.normalizeStyle({ width: props.width + props.gutter * 2 + "rpx" })
        }, [
          vue.createVNode(__easycom_7$1, {
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
            default: vue.withCtx(() => [
              _cId.value !== "" ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "relative flex flex-row bgbtnpos",
                style: vue.normalizeStyle([{ transform: "translateX(" + leftPos.value + "px)", width: leftWidth.value + "px" }])
              }, [
                vue.createCommentVNode(" left:leftPos+'px',width:leftWidth+'px' "),
                vue.createVNode(__easycom_7$1, {
                  "follow-dark": props.followDark,
                  round: props.round,
                  class: "flex-1 flex flex-row",
                  parenClass: "flex-1",
                  _class: "flex-1 flex flex-row",
                  color: props.color,
                  margin: [0, 0],
                  padding: [0, 0]
                }, null, 8, ["follow-dark", "round", "color"])
              ], 4)) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode("view", {
                class: vue.normalizeClass(["absolute flex flex-row flex-row-center-start", [`pa-${props.gutter}`, `l--${props.gutter / 2}`]]),
                style: vue.normalizeStyle([{ width: `${props.width}rpx`, height: `${props.height - props.gutter}rpx` }])
              }, [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(_list), (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    onClick: ($event) => itemClick(index, item.id),
                    ref_for: true,
                    ref: "tab_",
                    class: vue.normalizeClass([["tab" + index], "flex-1 flex flex-row flex-row-center-center"]),
                    style: vue.normalizeStyle({ height: `${props.height - props.gutter}rpx` }),
                    key: index
                  }, [
                    vue.createVNode(__easycom_1, {
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
  var __easycom_4$1 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-185df184"], ["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-segtab/tm-segtab.vue"]]);
  const _sfc_main$6 = /* @__PURE__ */ vue.defineComponent({
    __name: "tm-input",
    props: __spreadProps(__spreadValues({}, custom_props), {
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
      var _a2, _b2, _c2;
      const props = __props;
      const store = useTmpiniaStore();
      const proxy = (_b2 = (_a2 = vue.getCurrentInstance()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      let parentFormItem = proxy == null ? void 0 : proxy.$parent;
      while (parentFormItem) {
        if ((parentFormItem == null ? void 0 : parentFormItem.tmFormComnameFormItem) == "tmFormComnameFormItem" || !parentFormItem) {
          break;
        } else {
          parentFormItem = (_c2 = parentFormItem == null ? void 0 : parentFormItem.$parent) != null ? _c2 : void 0;
        }
      }
      const isAndroid = vue.ref(false);
      isAndroid.value = uni.getSystemInfoSync().osName == "android" ? true : false;
      const _height = vue.computed(() => props.height);
      const _inputPadding = vue.computed(() => {
        if (props.search !== "" || props.searchLabel !== "") {
          return [4, 0];
        }
        return props.inputPadding;
      });
      let timerId = NaN;
      function debounce2(func, wait = 500, immediate = false) {
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
      const propsDetail = vue.computed(() => {
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
      const _blackValue = props.modelValue;
      const tmcfg = vue.computed(() => store.tmStore);
      vue.computed(() => computedStyle(props));
      vue.computed(() => computedClass(props));
      const isDark = vue.computed(() => computedDark(props, tmcfg.value));
      const _requiredError = vue.ref(false);
      const _foucsActive = vue.ref(props.focus || false);
      vue.watch(() => props.focus, () => {
        _foucsActive.value = props.focus;
      });
      const _color = vue.computed(() => {
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
      const tmcomputed = vue.computed(() => {
        const _props = __spreadProps(__spreadValues({}, props), { color: _color.value });
        return computedTheme(_props, isDark.value, tmcfg.value);
      });
      const showPasswordText = vue.ref(propsDetail.value.password);
      const showPasswordIcon = vue.computed(() => props.password);
      vue.ref(props.errorLabel);
      const _value = vue.ref(props.modelValue);
      const _valueLenChar = vue.computed(() => {
        let str = String(_value.value).split("");
        return str.length;
      });
      vue.watch(() => props.modelValue, () => _value.value = props.modelValue);
      const rulesObj = vue.inject("tmFormItemRules", vue.computed(() => {
        var _a3;
        return [{
          message: (_a3 = props == null ? void 0 : props.errorLabel) != null ? _a3 : "\u8BF7\u586B\u5199\u5FC5\u8981\u7684\u5185\u5BB9",
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
          debounce2(() => emits("click", e), 500, true);
          return;
        }
        debounce2(() => emits("click", e), 500, true);
      }
      vue.watch(_value, () => debounce2(pushFormItem, 200));
      const tmFormFun = vue.inject("tmFormFun", vue.computed(() => ""));
      const validate = (rules) => {
        rules = rules.map((el) => {
          if (typeof el.validator === "function" && el.required === true) {
            return el;
          } else if (typeof el.validator === "boolean" && el.required === true) {
            return __spreadProps(__spreadValues({}, el), {
              validator: (val) => {
                return String(val).length == 0 || typeof val === null ? false : true;
              }
            });
          } else {
            return __spreadProps(__spreadValues({}, el), {
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
          return new Promise(async (res, rej) => {
            if (typeof el.validator === "function") {
              let vr = await el.validator(_value.value);
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
          });
        });
        return Promise.all(rules_fun);
      };
      async function pushFormItem(isCheckVail = true) {
        if (parentFormItem) {
          if (isCheckVail) {
            validate(vue.toRaw(rulesObj.value)).then((ev) => {
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
      }
      vue.watch(tmFormFun, () => {
        if (tmFormFun.value == "validate") {
          pushFormItem();
        }
        if (tmFormFun.value == "reset") {
          _value.value = _blackValue;
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
        return vue.openBlock(), vue.createBlock(__easycom_7$1, {
          transprent: true,
          margin: props.margin,
          padding: props.padding
        }, {
          default: vue.withCtx(() => [
            vue.createVNode(__easycom_7$1, {
              transprent: props.transprent,
              round: props.round,
              "no-level": "",
              margin: [0, 0],
              padding: vue.unref(_inputPadding),
              border: props.border,
              text: props.text,
              color: vue.unref(_color),
              outlined: props.outlined,
              shadow: props.shadow,
              linear: props.linear,
              linearDeep: props.linearDeep
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", {
                  class: vue.normalizeClass(["flex flex-row", [vue.unref(propsDetail).type == "textarea" ? "flex-row-top-center" : "flex-row-center-center"]]),
                  onClick: _cache[7] || (_cache[7] = ($event) => inputClick($event, "")),
                  style: vue.normalizeStyle([{ height: `${vue.unref(_height)}rpx` }])
                }, [
                  vue.unref(propsDetail).search || vue.unref(propsDetail).searchLabel ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "px-9"
                  })) : vue.createCommentVNode("v-if", true),
                  vue.renderSlot(_ctx.$slots, "left", {}, void 0, true),
                  vue.unref(propsDetail).prefix ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 1,
                    class: "pr-16"
                  }, [
                    vue.createVNode(__easycom_0$2, {
                      "font-size": vue.unref(propsDetail).fontSize,
                      name: vue.unref(propsDetail).prefix
                    }, null, 8, ["font-size", "name"])
                  ])) : vue.createCommentVNode("v-if", true),
                  vue.unref(propsDetail).prefixLabel ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 2,
                    class: "pr-24"
                  }, [
                    vue.createVNode(__easycom_1, {
                      "font-size": vue.unref(propsDetail).fontSize,
                      label: vue.unref(propsDetail).prefixLabel
                    }, null, 8, ["font-size", "label"])
                  ])) : vue.createCommentVNode("v-if", true),
                  !isAndroid.value ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 3,
                    onClick: _cache[2] || (_cache[2] = vue.withModifiers(($event) => inputClick($event, "ali"), ["stop"])),
                    class: "flex-1 relative flex-row flex",
                    style: vue.normalizeStyle([{ width: "0px" }])
                  }, [
                    vue.createCommentVNode(` <view @click.stop="emits('click',$event)" class=" l-0 t-0 flex-1 " :style="{height: \`\${_height}rpx\`,background:'red'}"></view> `),
                    vue.unref(propsDetail).type != "textarea" ? (vue.openBlock(), vue.createElementBlock("input", {
                      key: 0,
                      class: "flex-1",
                      userInteractionEnabled: false,
                      value: _value.value,
                      focus: vue.unref(propsDetail).focus,
                      onFocus: focus,
                      onBlur: blur,
                      onConfirm: confirm,
                      onInput: inputHandler,
                      onKeyboardheightchange: _cache[0] || (_cache[0] = ($event) => emits("keyboardheightchange")),
                      password: showPasswordText.value,
                      maxlength: vue.unref(propsDetail).maxlength,
                      disabled: vue.unref(propsDetail).disabled,
                      cursorSpacing: vue.unref(propsDetail).cursorSpacing,
                      confirmType: vue.unref(propsDetail).confirmType,
                      confirmHold: vue.unref(propsDetail).confirmHold,
                      autoBlur: vue.unref(propsDetail).autoBlur,
                      holdKeyboard: vue.unref(propsDetail).holdKeyboard,
                      adjustPosition: vue.unref(propsDetail).adjustPosition,
                      type: vue.unref(propsDetail).type,
                      placeholder: vue.unref(propsDetail).placeholder,
                      style: vue.normalizeStyle([
                        {
                          height: `${vue.unref(_height)}rpx`,
                          color: vue.unref(propsDetail).fontColor ? vue.unref(propsDetail).fontColor : vue.unref(tmcomputed).textColor,
                          "text-align": props.align,
                          "fontSize": `${vue.unref(propsDetail).fontSize_px}px`
                        }
                      ]),
                      "placeholder-style": `fontSize:${vue.unref(propsDetail).fontSize_px}px`
                    }, null, 44, ["value", "focus", "password", "maxlength", "disabled", "cursorSpacing", "confirmType", "confirmHold", "autoBlur", "holdKeyboard", "adjustPosition", "type", "placeholder", "placeholder-style"])) : vue.createCommentVNode("v-if", true),
                    vue.unref(propsDetail).type == "textarea" ? (vue.openBlock(), vue.createElementBlock("textarea", {
                      key: 1,
                      userInteractionEnabled: false,
                      value: _value.value,
                      focus: vue.unref(propsDetail).focus,
                      onFocus: focus,
                      onBlur: blur,
                      onConfirm: confirm,
                      onInput: inputHandler,
                      onKeyboardheightchange: _cache[1] || (_cache[1] = ($event) => emits("keyboardheightchange")),
                      maxlength: vue.unref(propsDetail).maxlength,
                      disabled: vue.unref(propsDetail).disabled,
                      placeholder: vue.unref(propsDetail).placeholder,
                      cursorSpacing: vue.unref(propsDetail).cursorSpacing,
                      confirmHold: vue.unref(propsDetail).confirmHold,
                      autoBlur: vue.unref(propsDetail).autoBlur,
                      holdKeyboard: vue.unref(propsDetail).holdKeyboard,
                      cursor: vue.unref(propsDetail).cursor,
                      "show-confirm-bar": vue.unref(propsDetail).showConfirmBar,
                      selectionStart: vue.unref(propsDetail).selectionStart,
                      selectionEnd: vue.unref(propsDetail).selectionEnd,
                      "disable-default-padding": vue.unref(propsDetail).disableDefaultPadding,
                      fixed: vue.unref(propsDetail).fixed,
                      adjustPosition: vue.unref(propsDetail).adjustPosition,
                      type: vue.unref(propsDetail).type,
                      style: vue.normalizeStyle([
                        {
                          height: `${vue.unref(_height)}rpx`,
                          width: "auto",
                          "word-break": "break-word",
                          color: vue.unref(propsDetail).fontColor ? vue.unref(propsDetail).fontColor : vue.unref(tmcomputed).textColor,
                          "text-align": props.align,
                          "fontSize": `${vue.unref(propsDetail).fontSize_px}px`
                        }
                      ]),
                      class: "wrap flex-1 py-12",
                      "placeholder-style": `fontSize:${vue.unref(propsDetail).fontSize_px}px`
                    }, null, 44, ["value", "focus", "maxlength", "disabled", "placeholder", "cursorSpacing", "confirmHold", "autoBlur", "holdKeyboard", "cursor", "show-confirm-bar", "selectionStart", "selectionEnd", "disable-default-padding", "fixed", "adjustPosition", "type", "placeholder-style"])) : vue.createCommentVNode("v-if", true)
                  ])) : vue.createCommentVNode("v-if", true),
                  isAndroid.value ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 4,
                    class: "flex-1 relative flex-row flex",
                    style: vue.normalizeStyle([{ width: "0px" }])
                  }, [
                    vue.createCommentVNode(` <view @click.stop="emits('click',$event)" class=" l-0 t-0 flex-1 " :style="{height: \`\${_height}rpx\`,background:'red'}"></view> `),
                    vue.unref(propsDetail).type != "textarea" ? (vue.openBlock(), vue.createElementBlock("input", {
                      key: 0,
                      class: "flex-1",
                      onClick: _cache[3] || (_cache[3] = vue.withModifiers(($event) => emits("click", $event), ["stop"])),
                      userInteractionEnabled: false,
                      value: _value.value,
                      focus: vue.unref(propsDetail).focus,
                      onFocus: focus,
                      onBlur: blur,
                      onConfirm: confirm,
                      onInput: inputHandler,
                      onKeyboardheightchange: _cache[4] || (_cache[4] = ($event) => emits("keyboardheightchange")),
                      password: showPasswordText.value,
                      disabled: vue.unref(propsDetail).disabled,
                      cursorSpacing: vue.unref(propsDetail).cursorSpacing,
                      confirmType: vue.unref(propsDetail).confirmType,
                      confirmHold: vue.unref(propsDetail).confirmHold,
                      autoBlur: vue.unref(propsDetail).autoBlur,
                      holdKeyboard: vue.unref(propsDetail).holdKeyboard,
                      adjustPosition: vue.unref(propsDetail).adjustPosition,
                      maxlength: vue.unref(propsDetail).maxlength,
                      type: vue.unref(propsDetail).type,
                      placeholder: vue.unref(propsDetail).placeholder,
                      style: vue.normalizeStyle([
                        {
                          height: `${vue.unref(_height)}rpx`,
                          color: vue.unref(propsDetail).fontColor ? vue.unref(propsDetail).fontColor : vue.unref(tmcomputed).textColor,
                          "text-align": props.align,
                          "fontSize": `${vue.unref(propsDetail).fontSize_px}px`
                        }
                      ]),
                      "placeholder-style": `fontSize:${vue.unref(propsDetail).fontSize_px}px`
                    }, null, 44, ["value", "focus", "password", "disabled", "cursorSpacing", "confirmType", "confirmHold", "autoBlur", "holdKeyboard", "adjustPosition", "maxlength", "type", "placeholder", "placeholder-style"])) : vue.createCommentVNode("v-if", true),
                    vue.unref(propsDetail).type == "textarea" ? (vue.openBlock(), vue.createElementBlock("textarea", {
                      key: 1,
                      onClick: _cache[5] || (_cache[5] = vue.withModifiers(($event) => emits("click", $event), ["stop"])),
                      userInteractionEnabled: false,
                      value: _value.value,
                      focus: vue.unref(propsDetail).focus,
                      onFocus: focus,
                      onBlur: blur,
                      onConfirm: confirm,
                      onInput: inputHandler,
                      onKeyboardheightchange: _cache[6] || (_cache[6] = ($event) => emits("keyboardheightchange")),
                      disabled: vue.unref(propsDetail).disabled,
                      placeholder: vue.unref(propsDetail).placeholder,
                      cursorSpacing: vue.unref(propsDetail).cursorSpacing,
                      confirmHold: vue.unref(propsDetail).confirmHold,
                      autoBlur: vue.unref(propsDetail).autoBlur,
                      holdKeyboard: vue.unref(propsDetail).holdKeyboard,
                      adjustPosition: vue.unref(propsDetail).adjustPosition,
                      maxlength: vue.unref(propsDetail).maxlength,
                      autoHeight: vue.unref(propsDetail).autoHeight,
                      cursor: vue.unref(propsDetail).cursor,
                      "show-confirm-bar": vue.unref(propsDetail).showConfirmBar,
                      selectionStart: vue.unref(propsDetail).selectionStart,
                      selectionEnd: vue.unref(propsDetail).selectionEnd,
                      "disable-default-padding": vue.unref(propsDetail).disableDefaultPadding,
                      fixed: vue.unref(propsDetail).fixed,
                      type: vue.unref(propsDetail).type,
                      style: vue.normalizeStyle([
                        {
                          height: `${vue.unref(_height)}rpx`,
                          width: "auto",
                          "word-break": "break-word",
                          color: vue.unref(propsDetail).fontColor ? vue.unref(propsDetail).fontColor : vue.unref(tmcomputed).textColor,
                          "text-align": props.align,
                          "fontSize": `${vue.unref(propsDetail).fontSize_px}px`
                        }
                      ]),
                      class: "wrap flex-1 py-10",
                      "placeholder-style": `fontSize:${vue.unref(propsDetail).fontSize_px}px`
                    }, null, 44, ["value", "focus", "disabled", "placeholder", "cursorSpacing", "confirmHold", "autoBlur", "holdKeyboard", "adjustPosition", "maxlength", "autoHeight", "cursor", "show-confirm-bar", "selectionStart", "selectionEnd", "disable-default-padding", "fixed", "type", "placeholder-style"])) : vue.createCommentVNode("v-if", true)
                  ])) : vue.createCommentVNode("v-if", true),
                  vue.unref(propsDetail).showClear && vue.unref(_valueLenChar) > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 5,
                    class: "pl-16"
                  }, [
                    vue.createVNode(__easycom_0$2, {
                      onClick: clearBtn,
                      "font-size": vue.unref(propsDetail).fontSize * 0.9,
                      name: "tmicon-times-circle-fill"
                    }, null, 8, ["font-size"])
                  ])) : vue.createCommentVNode("v-if", true),
                  _requiredError.value ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 6,
                    class: "pl-16"
                  }, [
                    vue.createVNode(__easycom_0$2, {
                      "font-size": vue.unref(propsDetail).fontSize,
                      name: "tmicon-exclamation-circle"
                    }, null, 8, ["font-size"])
                  ])) : vue.createCommentVNode("v-if", true),
                  vue.unref(propsDetail).suffix ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 7,
                    class: "pl-16"
                  }, [
                    vue.createVNode(__easycom_0$2, {
                      "font-size": vue.unref(propsDetail).fontSize * 0.85,
                      name: vue.unref(propsDetail).suffix
                    }, null, 8, ["font-size", "name"])
                  ])) : vue.createCommentVNode("v-if", true),
                  vue.unref(propsDetail).suffixLabel ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 8,
                    class: "pl-16"
                  }, [
                    vue.createVNode(__easycom_1, {
                      "font-size": vue.unref(propsDetail).fontSize,
                      label: vue.unref(propsDetail).suffixLabel
                    }, null, 8, ["font-size", "label"])
                  ])) : vue.createCommentVNode("v-if", true),
                  vue.unref(showPasswordIcon) ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 9,
                    class: "pl-16"
                  }, [
                    vue.createCommentVNode(" tmicon-eyeslash-fill "),
                    vue.createVNode(__easycom_0$2, {
                      onClick: changeSeePassword,
                      "font-size": vue.unref(propsDetail).fontSize,
                      name: showPasswordText.value ? "tmicon-eyeslash-fill" : "tmicon-eye-fill"
                    }, null, 8, ["font-size", "name"])
                  ])) : vue.createCommentVNode("v-if", true),
                  vue.unref(propsDetail).showCharNumber && vue.unref(_valueLenChar) > 0 && vue.unref(propsDetail).type != "textarea" ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 10,
                    class: "pl-16 flex-row flex"
                  }, [
                    vue.createVNode(__easycom_1, { label: vue.unref(_valueLenChar) }, null, 8, ["label"]),
                    vue.unref(propsDetail).maxlength > 0 ? (vue.openBlock(), vue.createBlock(__easycom_1, {
                      key: 0,
                      label: "/" + vue.unref(propsDetail).maxlength
                    }, null, 8, ["label"])) : vue.createCommentVNode("v-if", true)
                  ])) : vue.createCommentVNode("v-if", true),
                  vue.createCommentVNode(" \u539F\u56E0\u662F\u652F\u4ED8\u5B9D\u5C0F\u7A0B\u5E8F\u81EA\u5E26\u4E86\u8BA1\u6570\u5668\u3002\u4F1A\u5BFC\u81F4\u91CD\u53E0\u3002 "),
                  vue.unref(propsDetail).showCharNumber && vue.unref(_valueLenChar) > 0 && vue.unref(propsDetail).type == "textarea" ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 11,
                    class: "pl-16 flex-row flex absolute r-0 b-12"
                  }, [
                    vue.createVNode(__easycom_1, { label: vue.unref(_valueLenChar) }, null, 8, ["label"]),
                    vue.unref(propsDetail).maxlength > 0 ? (vue.openBlock(), vue.createBlock(__easycom_1, {
                      key: 0,
                      label: "/" + vue.unref(propsDetail).maxlength
                    }, null, 8, ["label"])) : vue.createCommentVNode("v-if", true)
                  ])) : vue.createCommentVNode("v-if", true),
                  vue.renderSlot(_ctx.$slots, "right", {}, () => [
                    vue.unref(propsDetail).search || vue.unref(propsDetail).searchLabel ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 0,
                      class: "pl-16"
                    }, [
                      vue.createVNode(__easycom_5, {
                        followTheme: props.followTheme,
                        onClick: searchClick,
                        color: props.focusColor,
                        "font-size": 24,
                        height: vue.unref(_height) - 11,
                        padding: [16, 0],
                        block: "",
                        margin: [0, 0],
                        icon: vue.unref(propsDetail).search,
                        label: vue.unref(propsDetail).searchLabel
                      }, null, 8, ["followTheme", "color", "height", "icon", "label"])
                    ])) : vue.createCommentVNode("v-if", true)
                  ], true)
                ], 6)
              ]),
              _: 3
            }, 8, ["transprent", "round", "padding", "border", "text", "color", "outlined", "shadow", "linear", "linearDeep"]),
            vue.createCommentVNode(' <view v-if="propsDetail.showBottomBotder" :class="[`mt-${props.margin[1]*2}`]">\r\n            <tm-divider :margin="[0,0]"></tm-divider>\r\n        </view> '),
            vue.createCommentVNode(" _requiredError "),
            vue.createCommentVNode(' <view v-if="false" class="pt-12">\r\n            <tmText :font-size="24" color="red" :label="_errorLabel"></tmText>\r\n        </view> ')
          ]),
          _: 3
        }, 8, ["margin", "padding"]);
      };
    }
  });
  var __easycom_3 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-6cd9ff9a"], ["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-input/tm-input.vue"]]);
  const _sfc_main$5 = /* @__PURE__ */ vue.defineComponent({
    __name: "currency",
    setup(__props) {
      const coinlist = vue.ref([
        { key: "1", title: "\u4EA4\u6613", icon: "" },
        { key: "2", title: "\u5151\u6362", icon: "" }
      ]);
      const cointype = vue.ref([
        { key: "1", title: "\u73B0\u8D27", icon: "" },
        { key: "2", title: "\u8D44\u91D1\u6C60", icon: "" }
      ]);
      const ordertype = vue.ref([
        { key: "1", title: "\u5F53\u524D\u59D4\u6258", icon: "" },
        { key: "2", title: "\u5386\u53F2\u59D4\u6258", icon: "" }
      ]);
      const tablist = vue.ref([
        { text: "\u4E70\u5165", id: "1" },
        { text: "\u5356\u51FA", id: "2" }
      ]);
      const header = vue.ref([
        { title: "\u4EF7\u683C", width: 150, key: "paytime" },
        { title: "\u6570\u91CF", width: 150, key: "unpayamount" }
      ]);
      const tableData = vue.ref([
        {
          data: {
            unpayamount: 18,
            paytime: "44.21233"
          }
        },
        {
          data: {
            unpayamount: 25,
            paytime: "44.21233"
          }
        },
        {
          data: {
            unpayamount: 25,
            paytime: "44.21233"
          }
        }
      ]);
      function onClick(row, col) {
        formatAppLog("log", "at pages/currency/currency.vue:101", row);
        uni.$tm.u.toast("\u884C:" + String(row) + ",\u5217" + String(col));
      }
      return (_ctx, _cache) => {
        const _component_tm_tabs = resolveEasycom(vue.resolveDynamicComponent("tm-tabs"), __easycom_0);
        const _component_tm_icon = resolveEasycom(vue.resolveDynamicComponent("tm-icon"), __easycom_0$2);
        const _component_tm_text = resolveEasycom(vue.resolveDynamicComponent("tm-text"), __easycom_1);
        const _component_tm_sheet = resolveEasycom(vue.resolveDynamicComponent("tm-sheet"), __easycom_7$1);
        const _component_tm_segtab = resolveEasycom(vue.resolveDynamicComponent("tm-segtab"), __easycom_4$1);
        const _component_tm_input = resolveEasycom(vue.resolveDynamicComponent("tm-input"), __easycom_3);
        const _component_tm_table = resolveEasycom(vue.resolveDynamicComponent("tm-table"), __easycom_6$1);
        const _component_tm_app = resolveEasycom(vue.resolveDynamicComponent("tm-app"), __easycom_8);
        return vue.openBlock(), vue.createBlock(_component_tm_app, null, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_tm_sheet, {
              margin: [0, 0],
              padding: [0, 0]
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_tm_tabs, {
                  showTabsLineAni: "",
                  activeFontSize: "32",
                  "item-width": 110,
                  width: 636,
                  height: 500,
                  "default-name": "1",
                  list: coinlist.value
                }, null, 8, ["list"]),
                vue.createVNode(_component_tm_sheet, null, {
                  default: vue.withCtx(() => [
                    vue.createElementVNode("view", { class: "flex flex-row flex-start" }, [
                      vue.createElementVNode("view", { class: "px-0" }, [
                        vue.createVNode(_component_tm_icon, { name: "tmicon-all" })
                      ]),
                      vue.createElementVNode("view", { class: "px-10" }, [
                        vue.createVNode(_component_tm_text, {
                          label: "ETHW/USDT",
                          class: "text-align-left",
                          style: { "float": "left" }
                        })
                      ]),
                      vue.createElementVNode("view", { class: "px-5 flex-11" }, [
                        vue.createVNode(_component_tm_text, { label: "-22%" })
                      ]),
                      vue.createElementVNode("view", { class: "px-10" }, [
                        vue.createVNode(_component_tm_icon, { name: "tmicon-chart-line" })
                      ]),
                      vue.createElementVNode("view", { class: "px-10" }, [
                        vue.createVNode(_component_tm_icon, { name: "tmicon-zidingyi" })
                      ]),
                      vue.createElementVNode("view", { class: "px-10" }, [
                        vue.createVNode(_component_tm_icon, { name: "tmicon-applicationgroup" })
                      ])
                    ])
                  ]),
                  _: 1
                }),
                vue.createElementVNode("view", { class: "flex flex-row flex-center" }, [
                  vue.createVNode(_component_tm_tabs, {
                    "default-name": "1",
                    align: "center",
                    list: cointype.value,
                    "item-width": 210,
                    showTabsLineAni: ""
                  }, null, 8, ["list"])
                ]),
                vue.createVNode(_component_tm_sheet, null, {
                  default: vue.withCtx(() => [
                    vue.createElementVNode("view", { class: "flex flex-row flex-row-between" }, [
                      vue.createElementVNode("view", { class: "px-0" }, [
                        vue.createVNode(_component_tm_segtab, {
                          width: 360,
                          bgColor: "white",
                          color: "primary",
                          class: "border-1",
                          activeColor: "white",
                          list: tablist.value,
                          defaultValue: "1"
                        }, null, 8, ["list"]),
                        vue.createVNode(_component_tm_input, { margin: [0, 20] }),
                        vue.createVNode(_component_tm_input, { margin: [0, 20] }),
                        vue.createVNode(_component_tm_input, { margin: [0, 20] })
                      ]),
                      vue.createElementVNode("view", { class: "px-10" }, [
                        vue.createVNode(_component_tm_table, {
                          onRowClick: onClick,
                          height: 450,
                          width: 638,
                          "table-data": tableData.value,
                          header: header.value
                        }, null, 8, ["table-data", "header"])
                      ])
                    ])
                  ]),
                  _: 1
                }),
                vue.createVNode(_component_tm_tabs, {
                  "default-name": "1",
                  list: ordertype.value,
                  "item-width": 130,
                  showTabsLineAni: ""
                }, null, 8, ["list"]),
                vue.createVNode(_component_tm_segtab, {
                  color: "primary",
                  class: "border-1",
                  activeColor: "white",
                  list: tablist.value,
                  defaultValue: "1"
                }, null, 8, ["list"])
              ]),
              _: 1
            })
          ]),
          _: 1
        });
      };
    }
  });
  var PagesCurrencyCurrency = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__file", "F:/CoinQT/CoinQT_app/pages/currency/currency.vue"]]);
  const _sfc_main$4 = /* @__PURE__ */ vue.defineComponent({
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
      var _a2, _b2, _c2;
      const props = __props;
      const proxy = (_b2 = (_a2 = vue.getCurrentInstance()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const tmFormComnameFormItem = "tmFormComnameFormItem";
      const item = vue.ref({
        label: "",
        field: props.field,
        value: null,
        isRequiredError: false,
        message: "",
        id: uni.$tm.u.getUid(1),
        componentsName: ""
      });
      const _required = vue.ref(props.required);
      const tmFormLabelWidth = vue.inject("tmFormLabelWidth", vue.computed(() => 100));
      const tmFormLabelAlign = vue.inject("tmFormLabelAlign", vue.computed(() => "left"));
      const tmFormLayout = vue.inject("tmFormLayout", vue.computed(() => "horizontal"));
      const tmFormBorder_inject = vue.inject("tmFormBorder", vue.computed(() => true));
      const tmFormTransprent = vue.inject("tmFormTransprent", vue.computed(() => false));
      const tmFormBorder = vue.computed(() => {
        if (props.border !== null && typeof props.border === "boolean")
          return props.border;
        return tmFormBorder_inject.value;
      });
      const _label = vue.computed(() => props.label);
      let parent = proxy == null ? void 0 : proxy.$parent;
      while (parent) {
        if ((parent == null ? void 0 : parent.tmFormComnameId) == "tmFormId" || !parent) {
          break;
        } else {
          parent = (_c2 = parent == null ? void 0 : parent.$parent) != null ? _c2 : void 0;
        }
      }
      pushCom();
      vue.onUnmounted(() => {
        delCom();
      });
      vue.provide("tmFormItemRules", vue.computed(() => {
        var _a3, _b3, _c3, _d, _e;
        let defaultrs = [];
        if (Array.isArray(props == null ? void 0 : props.rules)) {
          props == null ? void 0 : props.rules.forEach((el) => {
            var _a4, _b4;
            let isreq = (el == null ? void 0 : el.required) || props.required;
            defaultrs.push({
              message: (_a4 = el == null ? void 0 : el.message) != null ? _a4 : "\u8BF7\u586B\u5199\u5FC5\u8981\u7684\u5185\u5BB9",
              required: isreq,
              validator: (_b4 = el == null ? void 0 : el.validator) != null ? _b4 : false
            });
          });
        } else {
          defaultrs = [{
            message: (_b3 = (_a3 = props == null ? void 0 : props.rules) == null ? void 0 : _a3.message) != null ? _b3 : "\u8BF7\u586B\u5199\u5FC5\u8981\u7684\u5185\u5BB9",
            required: ((_c3 = props.rules) == null ? void 0 : _c3.required) || props.required,
            validator: (_e = (_d = props.rules) == null ? void 0 : _d.validator) != null ? _e : false
          }];
        }
        return defaultrs;
      }));
      function pushCom(itemComval) {
        if (parent) {
          item.value = __spreadValues(__spreadValues({}, item.value), itemComval != null ? itemComval : {});
          parent.pushKey(__spreadValues({}, item.value));
        }
      }
      function delCom() {
        if (parent) {
          parent.delKey(item.value);
        }
      }
      const tmFormFun = vue.inject("tmFormFun", vue.computed(() => ""));
      expose({ pushCom, delCom, tmFormComnameFormItem });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createBlock(__easycom_7$1, {
          transprent: vue.unref(tmFormTransprent),
          margin: props.margin,
          padding: props.padding
        }, {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", {
              class: vue.normalizeClass(["flex", vue.unref(tmFormLayout) == "horizontal" ? "flex-row flex-row-center-start" : "flex-col"])
            }, [
              vue.unref(_label) ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                style: vue.normalizeStyle([{ width: vue.unref(tmFormLabelWidth) + "rpx" }]),
                class: vue.normalizeClass(["mr-32 flex flex-row", [vue.unref(tmFormLabelAlign) == "right" ? "flex-row-center-end" : "", vue.unref(tmFormLayout) != "horizontal" ? "mb-24" : ""]])
              }, [
                _required.value ? (vue.openBlock(), vue.createBlock(__easycom_1, {
                  key: 0,
                  color: "red",
                  "font-size": 30,
                  label: "*"
                })) : vue.createCommentVNode("v-if", true),
                vue.createVNode(__easycom_1, {
                  color: vue.unref(tmFormFun) == "validate" && item.value.isRequiredError == true && props.requiredTitleChangeColor ? "red" : "",
                  "font-size": 30,
                  label: vue.unref(_label)
                }, null, 8, ["color", "label"])
              ], 6)) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode("view", {
                class: "flex-1",
                style: vue.normalizeStyle([vue.unref(tmFormLayout) == "horizontal" ? { width: "0px" } : ""])
              }, [
                vue.createElementVNode("view", null, [
                  vue.renderSlot(_ctx.$slots, "default")
                ])
              ], 4)
            ], 2),
            vue.unref(tmFormFun) == "validate" && item.value.isRequiredError == true && props.showError ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "pt-12"
            }, [
              vue.createVNode(__easycom_1, {
                color: "red",
                "font-size": 22,
                label: item.value.message
              }, null, 8, ["label"])
            ])) : vue.createCommentVNode("v-if", true),
            vue.unref(tmFormBorder) ? (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
              vue.createElementVNode("view", {
                class: vue.normalizeClass([`mt-${props.margin[1] * 2}`])
              }, null, 2),
              vue.createVNode(tmDivider, { margin: [0, 0] })
            ])) : vue.createCommentVNode("v-if", true)
          ]),
          _: 3
        }, 8, ["transprent", "margin", "padding"]);
      };
    }
  });
  var __easycom_4 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-form-item/tm-form-item.vue"]]);
  const _sfc_main$3 = /* @__PURE__ */ vue.defineComponent({
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
      const _modelVal = vue.ref({});
      uni.$tm.u.deepClone(props.modelValue);
      vue.watchEffect(() => _modelVal.value = props.modelValue);
      const _callBackModelVal = vue.ref([]);
      const tmFormComnameId = "tmFormId";
      const safeFormCom = vue.ref([
        "tm-radio-group",
        "tm-checkbox-box",
        "tm-input",
        "tm-rate",
        "tm-slider",
        "tm-segtab",
        "tm-switch",
        "tm-upload"
      ]);
      const formFunCallBack = vue.ref("");
      vue.provide("tmFormFun", vue.computed(() => formFunCallBack.value));
      vue.provide("tmFormLabelWidth", vue.computed(() => props.labelWidth));
      vue.provide("tmFormLabelAlign", vue.computed(() => props.labelAlign));
      vue.provide("tmFormLayout", vue.computed(() => props.layout));
      vue.provide("tmFormBorder", vue.computed(() => props.border));
      vue.provide("tmFormTransprent", vue.computed(() => props.transprent));
      let timid = 56321326898746;
      function reset() {
        formFunCallBack.value = "";
        vue.nextTick(() => {
          formFunCallBack.value = "reset";
          clearTimeout(timid);
          emits("reset");
        });
      }
      function clearValidate() {
        formFunCallBack.value = "";
        vue.nextTick(() => {
          formFunCallBack.value = "clearValidate";
          vue.nextTick(() => {
            emits("clearValidate");
          });
        });
      }
      function submit() {
        formFunCallBack.value = "";
        vue.nextTick(() => {
          formFunCallBack.value = "validate";
          let isPass = true;
          let par = vue.toRaw(_callBackModelVal.value);
          uni.$tm.u.throttle(() => {
            for (let i = 0, len = par.length; i < len; i++) {
              if (par[i].isRequiredError == true) {
                isPass = false;
                break;
              }
            }
            let data = __spreadValues({}, _modelVal.value);
            par.forEach((el) => {
              setObjectVal(data, el.field, el.value);
            });
            emits("submit", { data, validate: isPass });
          }, 200, false);
        });
      }
      function validate() {
        formFunCallBack.value = "";
        vue.nextTick(() => {
          formFunCallBack.value = "validate";
          vue.nextTick(() => {
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
          obj = vue.isProxy(obj[key]) ? vue.toRaw(obj[key]) : obj[key];
        }
        return obj[arr[0]] = vue.isProxy(val) ? vue.toRaw(val) : val;
      }
      expose({ reset, validate, clearValidate, submit, pushKey, delKey, tmFormComnameId });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createBlock(__easycom_7$1, {
          transprent: props.transprent,
          round: 3,
          _class: "flex flex-col overflow",
          padding: props.padding,
          margin: props.margin
        }, {
          default: vue.withCtx(() => [
            vue.renderSlot(_ctx.$slots, "default")
          ]),
          _: 3
        }, 8, ["transprent", "padding", "margin"]);
      };
    }
  });
  var __easycom_6 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-form/tm-form.vue"]]);
  const _sfc_main$2 = /* @__PURE__ */ vue.defineComponent({
    __name: "login",
    setup(__props) {
      const login_form = vue.ref({
        email: "",
        password: "",
        phone: "",
        type: 1
      });
      const login = (e) => {
        uni.request({
          url: helper.websiteUrl + "/member/login",
          method: "POST",
          data: {
            email: e.data.email,
            phone: e.data.phone,
            password: e.data.password
          },
          success: (res) => {
            formatAppLog("log", "at pages/assets/login.vue:69", res);
            uni.$tm.u.setCookie("token", res.data.token);
            uni.$tm.u.setCookie("userinfo", res.data.userinfo);
            uni.$tm.u.toast(res.data.msg);
          }
        });
      };
      const change_type = (type) => {
        login_form.value.type = type;
      };
      return (_ctx, _cache) => {
        const _component_tm_icon = resolveEasycom(vue.resolveDynamicComponent("tm-icon"), __easycom_0$2);
        const _component_tm_text = resolveEasycom(vue.resolveDynamicComponent("tm-text"), __easycom_1);
        const _component_tm_navbar = resolveEasycom(vue.resolveDynamicComponent("tm-navbar"), __easycom_2);
        const _component_tm_input = resolveEasycom(vue.resolveDynamicComponent("tm-input"), __easycom_3);
        const _component_tm_form_item = resolveEasycom(vue.resolveDynamicComponent("tm-form-item"), __easycom_4);
        const _component_tm_button = resolveEasycom(vue.resolveDynamicComponent("tm-button"), __easycom_5);
        const _component_tm_form = resolveEasycom(vue.resolveDynamicComponent("tm-form"), __easycom_6);
        const _component_tm_sheet = resolveEasycom(vue.resolveDynamicComponent("tm-sheet"), __easycom_7$1);
        const _component_tm_app = resolveEasycom(vue.resolveDynamicComponent("tm-app"), __easycom_8);
        return vue.openBlock(), vue.createBlock(_component_tm_app, { ref: "app" }, {
          default: vue.withCtx(() => [
            vue.createCommentVNode(" navbar "),
            vue.createVNode(_component_tm_navbar, {
              title: "",
              linearDeep: "accent",
              shadow: 0
            }, {
              left: vue.withCtx(() => [
                vue.createElementVNode("navigator", {
                  "hover-class": "none",
                  "open-type": "navigateBack",
                  "animation-type": "pop-out",
                  "animation-duration": "200"
                }, [
                  vue.createVNode(_component_tm_icon, {
                    _class: "px-20",
                    fontSize: 40,
                    name: "tmicon-times"
                  })
                ])
              ]),
              right: vue.withCtx(() => [
                vue.createElementVNode("navigator", {
                  url: "/pages/assets/register",
                  "open-type": "navigate",
                  "hover-class": "navigator-hover",
                  "animation-type": "pop-in",
                  "animation-duration": "3000"
                }, [
                  vue.createVNode(_component_tm_text, {
                    "font-size": 32,
                    _class: "px-20",
                    label: "\u6CE8\u518C"
                  })
                ])
              ]),
              _: 1
            }),
            vue.createVNode(_component_tm_sheet, {
              margin: [230, 0],
              style: { "height": "100vh" },
              class: "round-t-10"
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_tm_form, {
                  onSubmit: login,
                  ref: "form",
                  modelValue: login_form.value,
                  "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => login_form.value = $event)
                }, {
                  default: vue.withCtx(() => [
                    login_form.value.type == 1 ? (vue.openBlock(), vue.createBlock(_component_tm_form_item, {
                      key: 0,
                      required: "",
                      rules: [{ required: true, message: "\u90AE\u7BB1\u5730\u5740" }]
                    }, {
                      default: vue.withCtx(() => [
                        vue.createVNode(_component_tm_input, {
                          modelValue: login_form.value.email,
                          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => login_form.value.email = $event),
                          prefix: "tmicon-md-mail-open",
                          placeholder: "\u90AE\u7BB1\u5730\u5740",
                          margin: [0, 24]
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    })) : vue.createCommentVNode("v-if", true),
                    login_form.value.type == 2 ? (vue.openBlock(), vue.createBlock(_component_tm_form_item, {
                      key: 1,
                      required: "",
                      rules: [{ required: true, message: "\u624B\u673A\u53F7" }]
                    }, {
                      default: vue.withCtx(() => [
                        vue.createVNode(_component_tm_input, {
                          modelValue: login_form.value.phone,
                          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => login_form.value.phone = $event),
                          prefix: "tmicon-md-mail-open",
                          placeholder: "\u624B\u673A\u53F7",
                          margin: [0, 24]
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    })) : vue.createCommentVNode("v-if", true),
                    vue.createVNode(_component_tm_form_item, {
                      required: "",
                      rules: [{ required: true, message: "\u767B\u5F55\u5BC6\u7801" }]
                    }, {
                      default: vue.withCtx(() => [
                        vue.createVNode(_component_tm_input, {
                          modelValue: login_form.value.password,
                          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => login_form.value.password = $event),
                          margin: [0, 24],
                          password: "",
                          placeholder: "\u767B\u5F55\u5BC6\u7801",
                          prefix: "tmicon-lock-fill"
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    }),
                    vue.createVNode(_component_tm_form_item, { border: false }, {
                      default: vue.withCtx(() => [
                        vue.createElementVNode("view", { class: "flex flex-row" }, [
                          vue.createElementVNode("view", { class: "flex-1 mr-32" }, [
                            vue.createVNode(_component_tm_button, {
                              "form-type": "submit",
                              label: "\u767B\u5F55",
                              block: ""
                            })
                          ]),
                          vue.createElementVNode("view", { class: "flex-1" }, [
                            login_form.value.type == 1 ? (vue.openBlock(), vue.createBlock(_component_tm_button, {
                              key: 0,
                              onClick: _cache[3] || (_cache[3] = ($event) => change_type(2)),
                              shadow: 0,
                              text: "",
                              "form-type": "reset",
                              label: "\u624B\u673A\u767B\u5F55",
                              block: ""
                            })) : vue.createCommentVNode("v-if", true),
                            login_form.value.type == 2 ? (vue.openBlock(), vue.createBlock(_component_tm_button, {
                              key: 1,
                              onClick: _cache[4] || (_cache[4] = ($event) => change_type(1)),
                              shadow: 0,
                              text: "",
                              "form-type": "reset",
                              label: "\u90AE\u7BB1\u767B\u5F55",
                              block: ""
                            })) : vue.createCommentVNode("v-if", true)
                          ])
                        ])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue"])
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 512);
      };
    }
  });
  var PagesAssetsLogin = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "F:/CoinQT/CoinQT_app/pages/assets/login.vue"]]);
  const _sfc_main$1 = /* @__PURE__ */ vue.defineComponent({
    __name: "register",
    setup(__props) {
      vue.ref(null);
      const register_form = vue.ref({
        email: "",
        password: "",
        password_confirm: "",
        phone: "",
        type: 1
      });
      const register = (e) => {
        formatAppLog("log", "at pages/assets/register.vue:67", e.data.email);
        uni.request({
          url: helper.websiteUrl + "/member/register",
          method: "POST",
          data: {
            email: e.data.email,
            phone: e.data.phone,
            password: e.data.password
          },
          success: (res) => {
            formatAppLog("log", "at pages/assets/register.vue:77", res);
            uni.$tm.u.toast(res.data.msg);
          }
        });
      };
      const change_type = (type) => {
        register_form.value.type = type;
      };
      return (_ctx, _cache) => {
        const _component_tm_icon = resolveEasycom(vue.resolveDynamicComponent("tm-icon"), __easycom_0$2);
        const _component_tm_text = resolveEasycom(vue.resolveDynamicComponent("tm-text"), __easycom_1);
        const _component_tm_navbar = resolveEasycom(vue.resolveDynamicComponent("tm-navbar"), __easycom_2);
        const _component_tm_input = resolveEasycom(vue.resolveDynamicComponent("tm-input"), __easycom_3);
        const _component_tm_form_item = resolveEasycom(vue.resolveDynamicComponent("tm-form-item"), __easycom_4);
        const _component_tm_button = resolveEasycom(vue.resolveDynamicComponent("tm-button"), __easycom_5);
        const _component_tm_form = resolveEasycom(vue.resolveDynamicComponent("tm-form"), __easycom_6);
        const _component_tm_sheet = resolveEasycom(vue.resolveDynamicComponent("tm-sheet"), __easycom_7$1);
        const _component_tm_app = resolveEasycom(vue.resolveDynamicComponent("tm-app"), __easycom_8);
        return vue.openBlock(), vue.createBlock(_component_tm_app, { ref: "app" }, {
          default: vue.withCtx(() => [
            vue.createCommentVNode(" navbar "),
            vue.createVNode(_component_tm_navbar, {
              title: "",
              linearDeep: "accent",
              shadow: 0,
              "hide-home": "",
              hideBack: "",
              beforeBack: ""
            }, {
              left: vue.withCtx(() => [
                vue.createElementVNode("navigator", {
                  delta: "2",
                  "hover-class": "none",
                  "open-type": "navigateBack",
                  "animation-type": "pop-out",
                  "animation-duration": "200"
                }, [
                  vue.createVNode(_component_tm_icon, {
                    _class: "px-20",
                    fontSize: 40,
                    name: "tmicon-times"
                  })
                ])
              ]),
              right: vue.withCtx(() => [
                vue.createElementVNode("navigator", {
                  url: "/pages/assets/login",
                  "open-type": "navigateBack",
                  "hover-class": "none",
                  "animation-type": "pop-out",
                  "animation-duration": "200"
                }, [
                  vue.createVNode(_component_tm_text, {
                    "font-size": 32,
                    _class: "px-20",
                    label: "\u767B\u5F55"
                  })
                ])
              ]),
              _: 1
            }),
            vue.createVNode(_component_tm_sheet, {
              margin: [230, 0],
              style: { "height": "100vh" },
              class: "round-t-10"
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_tm_form, {
                  onSubmit: register,
                  ref: "form",
                  modelValue: register_form.value,
                  "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => register_form.value = $event)
                }, {
                  default: vue.withCtx(() => [
                    register_form.value.type == 1 ? (vue.openBlock(), vue.createBlock(_component_tm_form_item, {
                      key: 0,
                      required: "",
                      rules: [{ required: true, message: "\u90AE\u7BB1\u5730\u5740" }]
                    }, {
                      default: vue.withCtx(() => [
                        vue.createVNode(_component_tm_input, {
                          modelValue: register_form.value.email,
                          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => register_form.value.email = $event),
                          prefix: "tmicon-md-mail-open",
                          placeholder: "\u90AE\u7BB1\u5730\u5740",
                          margin: [0, 24]
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    })) : vue.createCommentVNode("v-if", true),
                    register_form.value.type == 2 ? (vue.openBlock(), vue.createBlock(_component_tm_form_item, {
                      key: 1,
                      required: "",
                      rules: [{ required: true, message: "\u624B\u673A\u53F7" }]
                    }, {
                      default: vue.withCtx(() => [
                        vue.createVNode(_component_tm_input, {
                          modelValue: register_form.value.phone,
                          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => register_form.value.phone = $event),
                          prefix: "tmicon-md-mail-open",
                          placeholder: "\u624B\u673A\u53F7",
                          margin: [0, 24]
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    })) : vue.createCommentVNode("v-if", true),
                    vue.createVNode(_component_tm_form_item, {
                      required: "",
                      rules: [{ required: true, message: "\u767B\u5F55\u5BC6\u7801" }]
                    }, {
                      default: vue.withCtx(() => [
                        vue.createVNode(_component_tm_input, {
                          modelValue: register_form.value.password,
                          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => register_form.value.password = $event),
                          margin: [0, 24],
                          password: "",
                          placeholder: "\u767B\u5F55\u5BC6\u7801",
                          prefix: "tmicon-lock-fill"
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    }),
                    vue.createVNode(_component_tm_form_item, {
                      required: "",
                      rules: [{ required: true, message: "\u786E\u8BA4\u5BC6\u7801" }]
                    }, {
                      default: vue.withCtx(() => [
                        vue.createVNode(_component_tm_input, {
                          modelValue: register_form.value.password_confirm,
                          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => register_form.value.password_confirm = $event),
                          margin: [0, 24],
                          password: "",
                          placeholder: "\u786E\u8BA4\u5BC6\u7801",
                          prefix: "tmicon-lock-fill"
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    }),
                    vue.createVNode(_component_tm_form_item, { border: false }, {
                      default: vue.withCtx(() => [
                        vue.createElementVNode("view", { class: "flex flex-row" }, [
                          vue.createElementVNode("view", { class: "flex-1 mr-32" }, [
                            vue.createVNode(_component_tm_button, {
                              "form-type": "submit",
                              label: "\u6CE8\u518C",
                              block: ""
                            })
                          ]),
                          vue.createElementVNode("view", { class: "flex-1" }, [
                            register_form.value.type == 1 ? (vue.openBlock(), vue.createBlock(_component_tm_button, {
                              key: 0,
                              onClick: _cache[4] || (_cache[4] = ($event) => change_type(2)),
                              shadow: 0,
                              text: "",
                              "form-type": "reset",
                              label: "\u624B\u673A\u6CE8\u518C",
                              block: ""
                            })) : vue.createCommentVNode("v-if", true),
                            register_form.value.type == 2 ? (vue.openBlock(), vue.createBlock(_component_tm_button, {
                              key: 1,
                              onClick: _cache[5] || (_cache[5] = ($event) => change_type(1)),
                              shadow: 0,
                              text: "",
                              "form-type": "reset",
                              label: "\u90AE\u7BB1\u6CE8\u518C",
                              block: ""
                            })) : vue.createCommentVNode("v-if", true)
                          ])
                        ])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue"])
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 512);
      };
    }
  });
  var PagesAssetsRegister = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "F:/CoinQT/CoinQT_app/pages/assets/register.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/currency/currency", PagesCurrencyCurrency);
  __definePage("pages/assets/login", PagesAssetsLogin);
  __definePage("pages/assets/register", PagesAssetsRegister);
  let config = {
    url: "",
    data: {},
    header: {},
    method: "POST",
    timeout: 6e4,
    dataType: "json",
    responseType: "text",
    sslVerify: true,
    withCredentials: false,
    firstIpv4: false
  };
  function request(cog = config, complete, beforeRequest2, afterRequest2) {
    let newConfig = __spreadValues(__spreadValues({}, config), cog);
    return new Promise(async (resolve, reject) => {
      if (typeof beforeRequest2 === "function") {
        let opts = await beforeRequest2(newConfig);
        if (typeof opts !== "object") {
          opts = {};
        }
        newConfig = __spreadValues(__spreadValues({}, newConfig), opts);
      }
      uni.request({
        url: newConfig.url || "",
        data: newConfig.data,
        header: newConfig.header,
        method: newConfig.method,
        timeout: newConfig.timeout,
        dataType: newConfig.dataType,
        responseType: newConfig.responseType,
        sslVerify: newConfig.sslVerify,
        withCredentials: newConfig.withCredentials,
        firstIpv4: newConfig.firstIpv4,
        async success(result) {
          if (result.statusCode !== 200) {
            reject(result);
            return;
          }
          if (typeof afterRequest2 === "function") {
            let opts = await afterRequest2(result);
            if (typeof opts !== "object") {
              opts = result;
            }
            result = __spreadValues(__spreadValues({}, result), opts);
          }
          resolve(result);
        },
        fail(result) {
          reject(result);
        },
        complete(result) {
          if (typeof complete === "function") {
            complete(result);
          }
        }
      });
    });
  }
  var beforeRequest = (val) => val;
  var afterRequest = (val) => val;
  class fetchNet {
    constructor(cog, beforeRequestFun, afterRequesFunt) {
      config = __spreadValues(__spreadValues({}, config), cog || {});
      if (typeof beforeRequestFun == "function") {
        beforeRequest = beforeRequestFun;
      }
      if (typeof afterRequesFunt == "function") {
        afterRequest = afterRequesFunt;
      }
    }
    static get(url, data = {}, opts = {}) {
      let cfg = __spreadProps(__spreadValues(__spreadValues({}, config), opts || {}), { url, method: "GET", data });
      return request(cfg);
    }
    static post(url, data = {}, opts = {}) {
      let cfg = __spreadProps(__spreadValues(__spreadValues({}, config), opts || {}), { url, method: "POST", data });
      return request(cfg);
    }
    static async request(cog = config, beforeFun, afterFun, complete) {
      let newConfig = __spreadValues(__spreadValues({}, config), cog);
      if (typeof beforeFun == "function") {
        let testFun = await beforeFun();
        let cb = { errMsg: "\u4E2D\u6B62\u8BF7\u6C42" };
        if (!testFun)
          return cb;
      }
      return request(newConfig, complete, beforeFun || beforeRequest, afterFun || afterRequest);
    }
  }
  var fontJson = [
    {
      "icon_id": "400994",
      "name": "paypal",
      "font_class": "paypal",
      "unicode": "e8c8",
      "unicode_decimal": 59592
    },
    {
      "icon_id": "4936951",
      "name": "google",
      "font_class": "google",
      "unicode": "e8c9",
      "unicode_decimal": 59593
    },
    {
      "icon_id": "5634565",
      "name": "apple-pay",
      "font_class": "apple-pay",
      "unicode": "f166",
      "unicode_decimal": 61798
    },
    {
      "icon_id": "6808509",
      "name": "Apple",
      "font_class": "Apple",
      "unicode": "edd8",
      "unicode_decimal": 60888
    },
    {
      "icon_id": "27365105",
      "name": "google-pay",
      "font_class": "google-pay",
      "unicode": "ec04",
      "unicode_decimal": 60420
    },
    {
      "icon_id": "1039",
      "name": "\u94B1\u888B",
      "font_class": "qiandai",
      "unicode": "e600",
      "unicode_decimal": 58880
    },
    {
      "icon_id": "1431",
      "name": "\u5238",
      "font_class": "quan",
      "unicode": "e601",
      "unicode_decimal": 58881
    },
    {
      "icon_id": "780044",
      "name": "\u7EA2\u5305",
      "font_class": "hongbao",
      "unicode": "e6da",
      "unicode_decimal": 59098
    },
    {
      "icon_id": "577373",
      "name": "\u901A\u77E5-fill",
      "font_class": "tongzhifill",
      "unicode": "e758",
      "unicode_decimal": 59224
    },
    {
      "icon_id": "844648",
      "name": "\u4EBA\u6C11\u5E013",
      "font_class": "renminbi3",
      "unicode": "e73e",
      "unicode_decimal": 59198
    },
    {
      "icon_id": "1240755",
      "name": "\u6295\u7968",
      "font_class": "toupiao",
      "unicode": "e60e",
      "unicode_decimal": 58894
    },
    {
      "icon_id": "5117623",
      "name": "\u7968\u5238-\u8272\u5757icon",
      "font_class": "icon",
      "unicode": "e658",
      "unicode_decimal": 58968
    },
    {
      "icon_id": "5178379",
      "name": "\u8DB3\u7403",
      "font_class": "svggeshi-",
      "unicode": "e65d",
      "unicode_decimal": 58973
    },
    {
      "icon_id": "5387627",
      "name": "\u7F8E\u5143",
      "font_class": "meiyuan",
      "unicode": "eb1a",
      "unicode_decimal": 60186
    },
    {
      "icon_id": "7516900",
      "name": "\u6C7D\u8F66",
      "font_class": "qiche",
      "unicode": "e611",
      "unicode_decimal": 58897
    },
    {
      "icon_id": "8023415",
      "name": "\u901A\u77E5",
      "font_class": "tongzhi",
      "unicode": "e612",
      "unicode_decimal": 58898
    },
    {
      "icon_id": "8575345",
      "name": "\u4F1A\u5458",
      "font_class": "huiyuan",
      "unicode": "e62f",
      "unicode_decimal": 58927
    },
    {
      "icon_id": "9456772",
      "name": "md-phone-portrait",
      "font_class": "md-phone-portrait",
      "unicode": "e6c2",
      "unicode_decimal": 59074
    },
    {
      "icon_id": "9456777",
      "name": "md-planet",
      "font_class": "md-planet",
      "unicode": "e6c3",
      "unicode_decimal": 59075
    },
    {
      "icon_id": "9456779",
      "name": "md-phone-landscape",
      "font_class": "md-phone-landscape",
      "unicode": "e6c4",
      "unicode_decimal": 59076
    },
    {
      "icon_id": "9456788",
      "name": "md-power",
      "font_class": "md-power",
      "unicode": "e6c5",
      "unicode_decimal": 59077
    },
    {
      "icon_id": "9456798",
      "name": "md-redo",
      "font_class": "md-redo",
      "unicode": "e6c6",
      "unicode_decimal": 59078
    },
    {
      "icon_id": "9456808",
      "name": "md-rocket",
      "font_class": "md-rocket",
      "unicode": "e6c7",
      "unicode_decimal": 59079
    },
    {
      "icon_id": "9456819",
      "name": "md-ribbon",
      "font_class": "md-ribbon",
      "unicode": "e6c8",
      "unicode_decimal": 59080
    },
    {
      "icon_id": "9456835",
      "name": "md-undo",
      "font_class": "md-undo",
      "unicode": "e6cb",
      "unicode_decimal": 59083
    },
    {
      "icon_id": "9456837",
      "name": "md-trending-down",
      "font_class": "md-trending-down",
      "unicode": "e6cc",
      "unicode_decimal": 59084
    },
    {
      "icon_id": "9456851",
      "name": "md-trending-up",
      "font_class": "md-trending-up",
      "unicode": "e6cd",
      "unicode_decimal": 59085
    },
    {
      "icon_id": "9457020",
      "name": "md-git-merge",
      "font_class": "md-git-merge",
      "unicode": "e6de",
      "unicode_decimal": 59102
    },
    {
      "icon_id": "9457071",
      "name": "md-female",
      "font_class": "md-female",
      "unicode": "e6e2",
      "unicode_decimal": 59106
    },
    {
      "icon_id": "9457091",
      "name": "md-male",
      "font_class": "md-male",
      "unicode": "e6e3",
      "unicode_decimal": 59107
    },
    {
      "icon_id": "9457108",
      "name": "md-heart-dislike",
      "font_class": "md-heart-dislike",
      "unicode": "e6e4",
      "unicode_decimal": 59108
    },
    {
      "icon_id": "9457111",
      "name": "md-heart",
      "font_class": "md-heart1",
      "unicode": "e6e7",
      "unicode_decimal": 59111
    },
    {
      "icon_id": "9457220",
      "name": "ios-text",
      "font_class": "ios-text",
      "unicode": "e6f1",
      "unicode_decimal": 59121
    },
    {
      "icon_id": "9457232",
      "name": "ios-rose",
      "font_class": "ios-rose",
      "unicode": "e6f2",
      "unicode_decimal": 59122
    },
    {
      "icon_id": "9457346",
      "name": "logo-game-controller-b",
      "font_class": "logo-game-controller-b",
      "unicode": "e6fd",
      "unicode_decimal": 59133
    },
    {
      "icon_id": "9457416",
      "name": "ios-beer",
      "font_class": "ios-beer",
      "unicode": "e707",
      "unicode_decimal": 59143
    },
    {
      "icon_id": "9457424",
      "name": "ios-cafe",
      "font_class": "ios-cafe",
      "unicode": "e709",
      "unicode_decimal": 59145
    },
    {
      "icon_id": "9457440",
      "name": "ios-chatbubbles",
      "font_class": "ios-chatbubbles",
      "unicode": "e70a",
      "unicode_decimal": 59146
    },
    {
      "icon_id": "9457465",
      "name": "ios-color-palette",
      "font_class": "ios-color-palette",
      "unicode": "e70e",
      "unicode_decimal": 59150
    },
    {
      "icon_id": "9457485",
      "name": "ios-filing",
      "font_class": "ios-filing",
      "unicode": "e712",
      "unicode_decimal": 59154
    },
    {
      "icon_id": "9457494",
      "name": "ios-finger-print",
      "font_class": "ios-finger-print",
      "unicode": "e713",
      "unicode_decimal": 59155
    },
    {
      "icon_id": "9457501",
      "name": "ios-hand",
      "font_class": "ios-hand",
      "unicode": "e716",
      "unicode_decimal": 59158
    },
    {
      "icon_id": "9457504",
      "name": "ios-flower",
      "font_class": "ios-flower",
      "unicode": "e714",
      "unicode_decimal": 59156
    },
    {
      "icon_id": "9457529",
      "name": "ios-ice-cream",
      "font_class": "ios-ice-cream",
      "unicode": "e719",
      "unicode_decimal": 59161
    },
    {
      "icon_id": "9457539",
      "name": "ios-grid",
      "font_class": "ios-grid",
      "unicode": "e71c",
      "unicode_decimal": 59164
    },
    {
      "icon_id": "9457540",
      "name": "ios-mail-open",
      "font_class": "ios-mail-open1",
      "unicode": "e71d",
      "unicode_decimal": 59165
    },
    {
      "icon_id": "9457543",
      "name": "ios-key",
      "font_class": "ios-key",
      "unicode": "e71e",
      "unicode_decimal": 59166
    },
    {
      "icon_id": "9457545",
      "name": "ios-man",
      "font_class": "ios-man",
      "unicode": "e71f",
      "unicode_decimal": 59167
    },
    {
      "icon_id": "12387153",
      "name": "\u7F8E\u5143",
      "font_class": "meiyuan1",
      "unicode": "e90d",
      "unicode_decimal": 59661
    },
    {
      "icon_id": "13030084",
      "name": "\u81EA\u5B9A\u4E49",
      "font_class": "zidingyi",
      "unicode": "e60d",
      "unicode_decimal": 58893
    },
    {
      "icon_id": "20587178",
      "name": "\u5237\u65B0",
      "font_class": "shuaxin",
      "unicode": "e6ce",
      "unicode_decimal": 59086
    },
    {
      "icon_id": "21242934",
      "name": "\u4F1A\u5458",
      "font_class": "huiyuan1",
      "unicode": "e646",
      "unicode_decimal": 58950
    },
    {
      "icon_id": "1250665",
      "name": "\u5706",
      "font_class": "yuan",
      "unicode": "e657",
      "unicode_decimal": 58967
    },
    {
      "icon_id": "7137863",
      "name": "ios-airplane",
      "font_class": "ios-airplane",
      "unicode": "e852",
      "unicode_decimal": 59474
    },
    {
      "icon_id": "7137864",
      "name": "ios-woman",
      "font_class": "ios-woman",
      "unicode": "e859",
      "unicode_decimal": 59481
    },
    {
      "icon_id": "7137869",
      "name": "ios-aperture",
      "font_class": "ios-aperture",
      "unicode": "e866",
      "unicode_decimal": 59494
    },
    {
      "icon_id": "7137873",
      "name": "ios-alarm",
      "font_class": "ios-alarm",
      "unicode": "e868",
      "unicode_decimal": 59496
    },
    {
      "icon_id": "7137875",
      "name": "ios-arrow-dropdown",
      "font_class": "ios-arrow-dropdown",
      "unicode": "e869",
      "unicode_decimal": 59497
    },
    {
      "icon_id": "7137879",
      "name": "ios-arrow-dropleft-c",
      "font_class": "ios-arrow-dropleft-c",
      "unicode": "e876",
      "unicode_decimal": 59510
    },
    {
      "icon_id": "7137880",
      "name": "ios-arrow-dropleft",
      "font_class": "ios-arrow-dropleft",
      "unicode": "e87c",
      "unicode_decimal": 59516
    },
    {
      "icon_id": "7137881",
      "name": "ios-arrow-dropup",
      "font_class": "ios-arrow-dropup",
      "unicode": "e87f",
      "unicode_decimal": 59519
    },
    {
      "icon_id": "7137882",
      "name": "ios-arrow-dropright-",
      "font_class": "ios-arrow-dropright-",
      "unicode": "e880",
      "unicode_decimal": 59520
    },
    {
      "icon_id": "7137883",
      "name": "ios-arrow-dropdown-c",
      "font_class": "ios-arrow-dropdown-c",
      "unicode": "e886",
      "unicode_decimal": 59526
    },
    {
      "icon_id": "7137886",
      "name": "ios-arrow-dropup-cir",
      "font_class": "ios-arrow-dropup-cir",
      "unicode": "e88d",
      "unicode_decimal": 59533
    },
    {
      "icon_id": "7137887",
      "name": "ios-arrow-dropright",
      "font_class": "ios-arrow-dropright",
      "unicode": "e890",
      "unicode_decimal": 59536
    },
    {
      "icon_id": "7137892",
      "name": "ios-attach",
      "font_class": "ios-attach",
      "unicode": "e893",
      "unicode_decimal": 59539
    },
    {
      "icon_id": "7137893",
      "name": "ios-at",
      "font_class": "ios-at",
      "unicode": "e894",
      "unicode_decimal": 59540
    },
    {
      "icon_id": "7137901",
      "name": "ios-bed",
      "font_class": "ios-bed",
      "unicode": "e895",
      "unicode_decimal": 59541
    },
    {
      "icon_id": "7137903",
      "name": "ios-battery-full",
      "font_class": "ios-battery-full",
      "unicode": "e896",
      "unicode_decimal": 59542
    },
    {
      "icon_id": "7137906",
      "name": "ios-bookmarks",
      "font_class": "ios-bookmarks",
      "unicode": "e897",
      "unicode_decimal": 59543
    },
    {
      "icon_id": "7137926",
      "name": "ios-bluetooth",
      "font_class": "ios-bluetooth",
      "unicode": "e898",
      "unicode_decimal": 59544
    },
    {
      "icon_id": "7137930",
      "name": "ios-cellular",
      "font_class": "ios-cellular",
      "unicode": "e899",
      "unicode_decimal": 59545
    },
    {
      "icon_id": "7137971",
      "name": "ios-cut",
      "font_class": "ios-cut",
      "unicode": "e89a",
      "unicode_decimal": 59546
    },
    {
      "icon_id": "7138027",
      "name": "ios-leaf",
      "font_class": "ios-leaf",
      "unicode": "e89b",
      "unicode_decimal": 59547
    },
    {
      "icon_id": "7138043",
      "name": "ios-mic",
      "font_class": "ios-mic",
      "unicode": "e89c",
      "unicode_decimal": 59548
    },
    {
      "icon_id": "7138045",
      "name": "ios-mail-open",
      "font_class": "ios-mail-open",
      "unicode": "e89d",
      "unicode_decimal": 59549
    },
    {
      "icon_id": "7138078",
      "name": "ios-partly-sunny",
      "font_class": "ios-partly-sunny",
      "unicode": "e8a0",
      "unicode_decimal": 59552
    },
    {
      "icon_id": "7138095",
      "name": "ios-radio-button-on",
      "font_class": "ios-radio-button-on",
      "unicode": "e8a1",
      "unicode_decimal": 59553
    },
    {
      "icon_id": "7138098",
      "name": "ios-radio-button-off",
      "font_class": "ios-radio-button-off",
      "unicode": "e8a2",
      "unicode_decimal": 59554
    },
    {
      "icon_id": "7138105",
      "name": "ios-remove",
      "font_class": "ios-remove",
      "unicode": "e8a3",
      "unicode_decimal": 59555
    },
    {
      "icon_id": "7138112",
      "name": "ios-remove-circle-ou",
      "font_class": "ios-remove-circle-ou",
      "unicode": "e8a4",
      "unicode_decimal": 59556
    },
    {
      "icon_id": "7138113",
      "name": "ios-remove-circle",
      "font_class": "ios-remove-circle",
      "unicode": "e8a5",
      "unicode_decimal": 59557
    },
    {
      "icon_id": "7138118",
      "name": "ios-rocket",
      "font_class": "ios-rocket",
      "unicode": "e8a6",
      "unicode_decimal": 59558
    },
    {
      "icon_id": "7138122",
      "name": "ios-ribbon",
      "font_class": "ios-ribbon",
      "unicode": "e8a7",
      "unicode_decimal": 59559
    },
    {
      "icon_id": "7138128",
      "name": "ios-star",
      "font_class": "ios-star",
      "unicode": "e8a8",
      "unicode_decimal": 59560
    },
    {
      "icon_id": "7138134",
      "name": "ios-star-half",
      "font_class": "ios-star-half",
      "unicode": "e8a9",
      "unicode_decimal": 59561
    },
    {
      "icon_id": "7138135",
      "name": "ios-star-outline",
      "font_class": "ios-star-outline",
      "unicode": "e8aa",
      "unicode_decimal": 59562
    },
    {
      "icon_id": "7138137",
      "name": "ios-snow",
      "font_class": "ios-snow",
      "unicode": "e8ab",
      "unicode_decimal": 59563
    },
    {
      "icon_id": "7138138",
      "name": "ios-stopwatch",
      "font_class": "ios-stopwatch",
      "unicode": "e8ac",
      "unicode_decimal": 59564
    },
    {
      "icon_id": "7138139",
      "name": "ios-sunny",
      "font_class": "ios-sunny",
      "unicode": "e8ad",
      "unicode_decimal": 59565
    },
    {
      "icon_id": "7138160",
      "name": "ios-unlock",
      "font_class": "ios-unlock",
      "unicode": "e8ae",
      "unicode_decimal": 59566
    },
    {
      "icon_id": "7138165",
      "name": "ios-trophy",
      "font_class": "ios-trophy",
      "unicode": "e8af",
      "unicode_decimal": 59567
    },
    {
      "icon_id": "7138167",
      "name": "ios-umbrella",
      "font_class": "ios-umbrella",
      "unicode": "e8b0",
      "unicode_decimal": 59568
    },
    {
      "icon_id": "7138168",
      "name": "ios-videocam",
      "font_class": "ios-videocam",
      "unicode": "e8b1",
      "unicode_decimal": 59569
    },
    {
      "icon_id": "7138169",
      "name": "ios-volume-high",
      "font_class": "ios-volume-high",
      "unicode": "e8b2",
      "unicode_decimal": 59570
    },
    {
      "icon_id": "7138170",
      "name": "ios-water",
      "font_class": "ios-water",
      "unicode": "e8b3",
      "unicode_decimal": 59571
    },
    {
      "icon_id": "7138176",
      "name": "ios-wifi",
      "font_class": "ios-wifi",
      "unicode": "e8b4",
      "unicode_decimal": 59572
    },
    {
      "icon_id": "7138213",
      "name": "md-water",
      "font_class": "md-water",
      "unicode": "e8b5",
      "unicode_decimal": 59573
    },
    {
      "icon_id": "7138292",
      "name": "md-checkbox",
      "font_class": "md-checkbox",
      "unicode": "e8b6",
      "unicode_decimal": 59574
    },
    {
      "icon_id": "7138295",
      "name": "md-chatbubbles",
      "font_class": "md-chatbubbles",
      "unicode": "e8b7",
      "unicode_decimal": 59575
    },
    {
      "icon_id": "7138296",
      "name": "md-chatboxes",
      "font_class": "md-chatboxes",
      "unicode": "e8b8",
      "unicode_decimal": 59576
    },
    {
      "icon_id": "7138301",
      "name": "md-cloud-done",
      "font_class": "md-cloud-done",
      "unicode": "e8b9",
      "unicode_decimal": 59577
    },
    {
      "icon_id": "7138303",
      "name": "md-cloud-upload",
      "font_class": "md-cloud-upload",
      "unicode": "e8ba",
      "unicode_decimal": 59578
    },
    {
      "icon_id": "7138310",
      "name": "md-cloudy",
      "font_class": "md-cloudy",
      "unicode": "e8bb",
      "unicode_decimal": 59579
    },
    {
      "icon_id": "7138328",
      "name": "md-contrast",
      "font_class": "md-contrast",
      "unicode": "e8bc",
      "unicode_decimal": 59580
    },
    {
      "icon_id": "7138332",
      "name": "md-disc",
      "font_class": "md-disc",
      "unicode": "e8bd",
      "unicode_decimal": 59581
    },
    {
      "icon_id": "7138369",
      "name": "md-heart-empty",
      "font_class": "md-heart-empty",
      "unicode": "e8be",
      "unicode_decimal": 59582
    },
    {
      "icon_id": "7138372",
      "name": "md-heart",
      "font_class": "md-heart",
      "unicode": "e8bf",
      "unicode_decimal": 59583
    },
    {
      "icon_id": "7138374",
      "name": "md-home",
      "font_class": "md-home",
      "unicode": "e8c0",
      "unicode_decimal": 59584
    },
    {
      "icon_id": "7138376",
      "name": "md-mail-open",
      "font_class": "md-mail-open",
      "unicode": "e8c1",
      "unicode_decimal": 59585
    },
    {
      "icon_id": "7138391",
      "name": "md-heart-half",
      "font_class": "md-heart-half",
      "unicode": "e8c2",
      "unicode_decimal": 59586
    },
    {
      "icon_id": "7138393",
      "name": "md-person",
      "font_class": "md-person",
      "unicode": "e8c3",
      "unicode_decimal": 59587
    },
    {
      "icon_id": "7138405",
      "name": "md-people",
      "font_class": "md-people",
      "unicode": "e8c4",
      "unicode_decimal": 59588
    },
    {
      "icon_id": "7138421",
      "name": "md-more",
      "font_class": "md-more",
      "unicode": "e8c5",
      "unicode_decimal": 59589
    },
    {
      "icon_id": "7138431",
      "name": "md-moon",
      "font_class": "md-moon",
      "unicode": "e8c6",
      "unicode_decimal": 59590
    },
    {
      "icon_id": "7138481",
      "name": "md-pin",
      "font_class": "md-pin",
      "unicode": "e8c7",
      "unicode_decimal": 59591
    },
    {
      "icon_id": "577338",
      "name": "\u66F4\u591A",
      "font_class": "gengduo",
      "unicode": "e73a",
      "unicode_decimal": 59194
    },
    {
      "icon_id": "1420800",
      "name": "IOS",
      "font_class": "ios",
      "unicode": "e60c",
      "unicode_decimal": 58892
    },
    {
      "icon_id": "1445619",
      "name": "wifi-off",
      "font_class": "wifi-off",
      "unicode": "e93a",
      "unicode_decimal": 59706
    },
    {
      "icon_id": "3629124",
      "name": "\u5217\u8868\u7A7A\u7A7A",
      "font_class": "shiliangzhinengduixiang-",
      "unicode": "e6ad",
      "unicode_decimal": 59053
    },
    {
      "icon_id": "3977929",
      "name": "\u5FAE\u4FE1\u652F\u4ED8",
      "font_class": "weixinzhifu",
      "unicode": "e605",
      "unicode_decimal": 58885
    },
    {
      "icon_id": "8338693",
      "name": "\u94F6\u884C\u5361",
      "font_class": "yinhangqia",
      "unicode": "e6c9",
      "unicode_decimal": 59081
    },
    {
      "icon_id": "9306316",
      "name": "\u4E91\u95EA\u4ED8",
      "font_class": "yunshanfu",
      "unicode": "e68b",
      "unicode_decimal": 59019
    },
    {
      "icon_id": "15989503",
      "name": "\u5934\u6761\u6837\u5F0F",
      "font_class": "toutiaoyangshi",
      "unicode": "e622",
      "unicode_decimal": 58914
    },
    {
      "icon_id": "18166694",
      "name": "\u6296\u97F3",
      "font_class": "douyin",
      "unicode": "e8db",
      "unicode_decimal": 59611
    },
    {
      "icon_id": "18166716",
      "name": "\u652F\u4ED8,\u652F\u4ED8\u5B9D",
      "font_class": "alipay",
      "unicode": "e8de",
      "unicode_decimal": 59614
    },
    {
      "icon_id": "24164616",
      "name": "\u534E\u4E3A",
      "font_class": "huawei",
      "unicode": "e610",
      "unicode_decimal": 58896
    },
    {
      "icon_id": "167190",
      "name": "\u94FE\u63A5",
      "font_class": "lianjie",
      "unicode": "e665",
      "unicode_decimal": 58981
    },
    {
      "icon_id": "1185485",
      "name": "\u5FAE\u4FE1",
      "font_class": "weixin",
      "unicode": "e63f",
      "unicode_decimal": 58943
    },
    {
      "icon_id": "6556747",
      "name": "\u670B\u53CB\u5708",
      "font_class": "pengyouquan",
      "unicode": "e615",
      "unicode_decimal": 58901
    },
    {
      "icon_id": "6756291",
      "name": "\u5FAE\u535A",
      "font_class": "weibo",
      "unicode": "e608",
      "unicode_decimal": 58888
    },
    {
      "icon_id": "16286932",
      "name": "QQ",
      "font_class": "QQ",
      "unicode": "e60f",
      "unicode_decimal": 58895
    },
    {
      "icon_id": "16322953",
      "name": "\u5C0F\u7A0B\u5E8F",
      "font_class": "xiaochengxu",
      "unicode": "e706",
      "unicode_decimal": 59142
    },
    {
      "icon_id": "6151036",
      "name": "display-code",
      "font_class": "display-code",
      "unicode": "e792",
      "unicode_decimal": 59282
    },
    {
      "icon_id": "6151037",
      "name": "display-arrow-right",
      "font_class": "display-arrow-right",
      "unicode": "e793",
      "unicode_decimal": 59283
    },
    {
      "icon_id": "6151038",
      "name": "display-arrow-left",
      "font_class": "display-arrow-left",
      "unicode": "e794",
      "unicode_decimal": 59284
    },
    {
      "icon_id": "6151039",
      "name": "laptop-error",
      "font_class": "laptop-error",
      "unicode": "e795",
      "unicode_decimal": 59285
    },
    {
      "icon_id": "6151040",
      "name": "laptop-check",
      "font_class": "laptop-check",
      "unicode": "e796",
      "unicode_decimal": 59286
    },
    {
      "icon_id": "6151041",
      "name": "laptop",
      "font_class": "laptop",
      "unicode": "e797",
      "unicode_decimal": 59287
    },
    {
      "icon_id": "6151050",
      "name": "mobile-error",
      "font_class": "mobile-error",
      "unicode": "e798",
      "unicode_decimal": 59288
    },
    {
      "icon_id": "6151051",
      "name": "mobile-check",
      "font_class": "mobile-check",
      "unicode": "e799",
      "unicode_decimal": 59289
    },
    {
      "icon_id": "6151052",
      "name": "mobile-alt",
      "font_class": "mobile-alt",
      "unicode": "e79a",
      "unicode_decimal": 59290
    },
    {
      "icon_id": "6151059",
      "name": "aliwangwang",
      "font_class": "aliwangwang",
      "unicode": "e79d",
      "unicode_decimal": 59293
    },
    {
      "icon_id": "6151060",
      "name": "nail",
      "font_class": "nail",
      "unicode": "e79e",
      "unicode_decimal": 59294
    },
    {
      "icon_id": "6151061",
      "name": "nail-fixed",
      "font_class": "nail-fixed",
      "unicode": "e79f",
      "unicode_decimal": 59295
    },
    {
      "icon_id": "6151070",
      "name": "edit",
      "font_class": "edit",
      "unicode": "e7a0",
      "unicode_decimal": 59296
    },
    {
      "icon_id": "6151072",
      "name": "dollar",
      "font_class": "dollar",
      "unicode": "e7a1",
      "unicode_decimal": 59297
    },
    {
      "icon_id": "6151080",
      "name": "transanction",
      "font_class": "transanction",
      "unicode": "e7a2",
      "unicode_decimal": 59298
    },
    {
      "icon_id": "6151087",
      "name": "filter-fill",
      "font_class": "filter-fill",
      "unicode": "e7a3",
      "unicode_decimal": 59299
    },
    {
      "icon_id": "6151089",
      "name": "all-fill",
      "font_class": "all-fill",
      "unicode": "e7a4",
      "unicode_decimal": 59300
    },
    {
      "icon_id": "6151090",
      "name": "database plus-fill",
      "font_class": "databaseplus-fill",
      "unicode": "e7a5",
      "unicode_decimal": 59301
    },
    {
      "icon_id": "6151091",
      "name": "database-fill",
      "font_class": "database-fill",
      "unicode": "e7a6",
      "unicode_decimal": 59302
    },
    {
      "icon_id": "6151092",
      "name": "comment lines-fill",
      "font_class": "commentlines-fill",
      "unicode": "e7a7",
      "unicode_decimal": 59303
    },
    {
      "icon_id": "6151093",
      "name": "comment dots-fill",
      "font_class": "commentdots-fill",
      "unicode": "e7a8",
      "unicode_decimal": 59304
    },
    {
      "icon_id": "6151095",
      "name": "paper plane-fill",
      "font_class": "paperplane-fill",
      "unicode": "e7a9",
      "unicode_decimal": 59305
    },
    {
      "icon_id": "6151096",
      "name": "eye slash-fill",
      "font_class": "eyeslash-fill",
      "unicode": "e7aa",
      "unicode_decimal": 59306
    },
    {
      "icon_id": "6151097",
      "name": "eye-fill",
      "font_class": "eye-fill",
      "unicode": "e7ab",
      "unicode_decimal": 59307
    },
    {
      "icon_id": "6151098",
      "name": "lightbulb-fill",
      "font_class": "lightbulb-fill",
      "unicode": "e7ac",
      "unicode_decimal": 59308
    },
    {
      "icon_id": "6151099",
      "name": "flag-fill",
      "font_class": "flag-fill",
      "unicode": "e7ad",
      "unicode_decimal": 59309
    },
    {
      "icon_id": "6151100",
      "name": "tag-fill",
      "font_class": "tag-fill",
      "unicode": "e7ae",
      "unicode_decimal": 59310
    },
    {
      "icon_id": "6151101",
      "name": "position-fill",
      "font_class": "position-fill",
      "unicode": "e7af",
      "unicode_decimal": 59311
    },
    {
      "icon_id": "6151102",
      "name": "location-fill",
      "font_class": "location-fill",
      "unicode": "e7b0",
      "unicode_decimal": 59312
    },
    {
      "icon_id": "6151103",
      "name": "map-fill",
      "font_class": "map-fill",
      "unicode": "e7b1",
      "unicode_decimal": 59313
    },
    {
      "icon_id": "6151105",
      "name": "inbox in-fill",
      "font_class": "inboxin-fill",
      "unicode": "e7b2",
      "unicode_decimal": 59314
    },
    {
      "icon_id": "6151106",
      "name": "box-fill",
      "font_class": "box-fill",
      "unicode": "e7b3",
      "unicode_decimal": 59315
    },
    {
      "icon_id": "6151108",
      "name": "database set-fill",
      "font_class": "databaseset-fill",
      "unicode": "e7b4",
      "unicode_decimal": 59316
    },
    {
      "icon_id": "6151109",
      "name": "layer group-fill",
      "font_class": "layergroup-fill",
      "unicode": "e7b5",
      "unicode_decimal": 59317
    },
    {
      "icon_id": "6151111",
      "name": "cry-fill",
      "font_class": "cry-fill",
      "unicode": "e7b6",
      "unicode_decimal": 59318
    },
    {
      "icon_id": "6151113",
      "name": "smile-fill",
      "font_class": "smile-fill",
      "unicode": "e7b7",
      "unicode_decimal": 59319
    },
    {
      "icon_id": "6151115",
      "name": "unlock-fill",
      "font_class": "unlock-fill",
      "unicode": "e7b8",
      "unicode_decimal": 59320
    },
    {
      "icon_id": "6151117",
      "name": "lock-fill",
      "font_class": "lock-fill",
      "unicode": "e7b9",
      "unicode_decimal": 59321
    },
    {
      "icon_id": "6151118",
      "name": "align right-fill",
      "font_class": "alignright-fill",
      "unicode": "e7ba",
      "unicode_decimal": 59322
    },
    {
      "icon_id": "6151119",
      "name": "align left-fill",
      "font_class": "alignleft-fill",
      "unicode": "e7bb",
      "unicode_decimal": 59323
    },
    {
      "icon_id": "6151120",
      "name": "border bottom-fill",
      "font_class": "borderbottom-fill",
      "unicode": "e7bc",
      "unicode_decimal": 59324
    },
    {
      "icon_id": "6151121",
      "name": "border top-fill",
      "font_class": "bordertop-fill",
      "unicode": "e7bd",
      "unicode_decimal": 59325
    },
    {
      "icon_id": "6151122",
      "name": "align center-fill",
      "font_class": "aligncenter-fill",
      "unicode": "e7be",
      "unicode_decimal": 59326
    },
    {
      "icon_id": "6151123",
      "name": "border verticle-fill",
      "font_class": "borderverticle-fill",
      "unicode": "e7bf",
      "unicode_decimal": 59327
    },
    {
      "icon_id": "6151126",
      "name": "pic center-fill",
      "font_class": "piccenter-fill",
      "unicode": "e7c0",
      "unicode_decimal": 59328
    },
    {
      "icon_id": "6151127",
      "name": "pic side-fill",
      "font_class": "picside-fill",
      "unicode": "e7c1",
      "unicode_decimal": 59329
    },
    {
      "icon_id": "6151128",
      "name": "folder open-fill",
      "font_class": "folderopen-fill",
      "unicode": "e7c2",
      "unicode_decimal": 59330
    },
    {
      "icon_id": "6151129",
      "name": "folder plus-fill",
      "font_class": "folderplus-fill",
      "unicode": "e7c3",
      "unicode_decimal": 59331
    },
    {
      "icon_id": "6151130",
      "name": "folder-fill",
      "font_class": "folder-fill",
      "unicode": "e7c4",
      "unicode_decimal": 59332
    },
    {
      "icon_id": "6151132",
      "name": "file-SQL",
      "font_class": "file-SQL",
      "unicode": "e7c5",
      "unicode_decimal": 59333
    },
    {
      "icon_id": "6151133",
      "name": "file plus-fill",
      "font_class": "fileplus-fill",
      "unicode": "e7c6",
      "unicode_decimal": 59334
    },
    {
      "icon_id": "6151134",
      "name": "file-fill",
      "font_class": "file-fill",
      "unicode": "e7c7",
      "unicode_decimal": 59335
    },
    {
      "icon_id": "6151135",
      "name": "copy-fill",
      "font_class": "copy-fill",
      "unicode": "e7c8",
      "unicode_decimal": 59336
    },
    {
      "icon_id": "6151136",
      "name": "headset-fill",
      "font_class": "headset-fill",
      "unicode": "e7c9",
      "unicode_decimal": 59337
    },
    {
      "icon_id": "6151138",
      "name": "phone-fill",
      "font_class": "phone-fill",
      "unicode": "e7ca",
      "unicode_decimal": 59338
    },
    {
      "icon_id": "6151139",
      "name": "pause circle-fill",
      "font_class": "pausecircle-fill",
      "unicode": "e7cb",
      "unicode_decimal": 59339
    },
    {
      "icon_id": "6151140",
      "name": "stop circle-fill",
      "font_class": "stopcircle-fill",
      "unicode": "e7cc",
      "unicode_decimal": 59340
    },
    {
      "icon_id": "6151141",
      "name": "play circle-fill",
      "font_class": "playcircle-fill",
      "unicode": "e7cd",
      "unicode_decimal": 59341
    },
    {
      "icon_id": "6151143",
      "name": "delete-fill",
      "font_class": "delete-fill",
      "unicode": "e7ce",
      "unicode_decimal": 59342
    },
    {
      "icon_id": "6151144",
      "name": "picture-fill",
      "font_class": "picture-fill",
      "unicode": "e7cf",
      "unicode_decimal": 59343
    },
    {
      "icon_id": "6151145",
      "name": "mail-fill",
      "font_class": "mail-fill",
      "unicode": "e7d0",
      "unicode_decimal": 59344
    },
    {
      "icon_id": "6151146",
      "name": "heart-fill",
      "font_class": "heart-fill",
      "unicode": "e7d1",
      "unicode_decimal": 59345
    },
    {
      "icon_id": "6151147",
      "name": "collection-fill",
      "font_class": "collection-fill",
      "unicode": "e7d2",
      "unicode_decimal": 59346
    },
    {
      "icon_id": "6151149",
      "name": "user-group-fill",
      "font_class": "user-group-fill",
      "unicode": "e7d3",
      "unicode_decimal": 59347
    },
    {
      "icon_id": "6151150",
      "name": "user plus-fill",
      "font_class": "userplus-fill",
      "unicode": "e7d4",
      "unicode_decimal": 59348
    },
    {
      "icon_id": "6151151",
      "name": "user-fill",
      "font_class": "user-fill",
      "unicode": "e7d5",
      "unicode_decimal": 59349
    },
    {
      "icon_id": "6151152",
      "name": "cog-fill",
      "font_class": "cog-fill",
      "unicode": "e7d6",
      "unicode_decimal": 59350
    },
    {
      "icon_id": "6151154",
      "name": "clock-fill",
      "font_class": "clock-fill",
      "unicode": "e7d7",
      "unicode_decimal": 59351
    },
    {
      "icon_id": "6151155",
      "name": "calendar alt-fill",
      "font_class": "calendaralt-fill",
      "unicode": "e7d8",
      "unicode_decimal": 59352
    },
    {
      "icon_id": "6151157",
      "name": "cloud download-fill",
      "font_class": "clouddownload-fill",
      "unicode": "e7d9",
      "unicode_decimal": 59353
    },
    {
      "icon_id": "6151158",
      "name": "cloud upload-fill",
      "font_class": "cloudupload-fill",
      "unicode": "e7da",
      "unicode_decimal": 59354
    },
    {
      "icon_id": "6151159",
      "name": "exchange-fill",
      "font_class": "exchange-fill",
      "unicode": "e7db",
      "unicode_decimal": 59355
    },
    {
      "icon_id": "6151161",
      "name": "info-circle-fill",
      "font_class": "info-circle-fill",
      "unicode": "e7dc",
      "unicode_decimal": 59356
    },
    {
      "icon_id": "6151162",
      "name": "question-circle-fill",
      "font_class": "question-circle-fill",
      "unicode": "e7dd",
      "unicode_decimal": 59357
    },
    {
      "icon_id": "6151171",
      "name": "exclamation circle-f",
      "font_class": "exclamationcircle-f",
      "unicode": "e7de",
      "unicode_decimal": 59358
    },
    {
      "icon_id": "6151173",
      "name": "minus-circle-fill",
      "font_class": "minus-circle-fill",
      "unicode": "e7df",
      "unicode_decimal": 59359
    },
    {
      "icon_id": "6151174",
      "name": "plus-circle-fill",
      "font_class": "plus-circle-fill",
      "unicode": "e7e0",
      "unicode_decimal": 59360
    },
    {
      "icon_id": "6151176",
      "name": "times-circle-fill",
      "font_class": "times-circle-fill",
      "unicode": "e7e1",
      "unicode_decimal": 59361
    },
    {
      "icon_id": "6151177",
      "name": "check-circle-fill",
      "font_class": "check-circle-fill",
      "unicode": "e7e2",
      "unicode_decimal": 59362
    },
    {
      "icon_id": "6151178",
      "name": "compress alt-fill",
      "font_class": "compressalt-fill",
      "unicode": "e7e3",
      "unicode_decimal": 59363
    },
    {
      "icon_id": "6151181",
      "name": "expand alt-fill",
      "font_class": "expandalt-fill",
      "unicode": "e7e4",
      "unicode_decimal": 59364
    },
    {
      "icon_id": "6151187",
      "name": "filter",
      "font_class": "filter",
      "unicode": "e7e5",
      "unicode_decimal": 59365
    },
    {
      "icon_id": "6151188",
      "name": "all",
      "font_class": "all",
      "unicode": "e7e6",
      "unicode_decimal": 59366
    },
    {
      "icon_id": "6151192",
      "name": "database-plus",
      "font_class": "database-plus",
      "unicode": "e7e7",
      "unicode_decimal": 59367
    },
    {
      "icon_id": "6151193",
      "name": "database",
      "font_class": "database",
      "unicode": "e7e8",
      "unicode_decimal": 59368
    },
    {
      "icon_id": "6151195",
      "name": "comment-lines",
      "font_class": "comment-lines",
      "unicode": "e7e9",
      "unicode_decimal": 59369
    },
    {
      "icon_id": "6151196",
      "name": "comment-dots",
      "font_class": "comment-dots",
      "unicode": "e7ea",
      "unicode_decimal": 59370
    },
    {
      "icon_id": "6151198",
      "name": "paper-plane",
      "font_class": "paper-plane",
      "unicode": "e7eb",
      "unicode_decimal": 59371
    },
    {
      "icon_id": "6151208",
      "name": "eye-slash",
      "font_class": "eye-slash",
      "unicode": "e7ec",
      "unicode_decimal": 59372
    },
    {
      "icon_id": "6151209",
      "name": "eye",
      "font_class": "eye",
      "unicode": "e7ed",
      "unicode_decimal": 59373
    },
    {
      "icon_id": "6151210",
      "name": "lightbulb",
      "font_class": "lightbulb",
      "unicode": "e7ee",
      "unicode_decimal": 59374
    },
    {
      "icon_id": "6151211",
      "name": "flag",
      "font_class": "flag",
      "unicode": "e7ef",
      "unicode_decimal": 59375
    },
    {
      "icon_id": "6151212",
      "name": "tag",
      "font_class": "tag",
      "unicode": "e7f0",
      "unicode_decimal": 59376
    },
    {
      "icon_id": "6151214",
      "name": "position",
      "font_class": "position",
      "unicode": "e7f1",
      "unicode_decimal": 59377
    },
    {
      "icon_id": "6151215",
      "name": "location",
      "font_class": "location",
      "unicode": "e7f2",
      "unicode_decimal": 59378
    },
    {
      "icon_id": "6151216",
      "name": "map",
      "font_class": "map",
      "unicode": "e7f3",
      "unicode_decimal": 59379
    },
    {
      "icon_id": "6151218",
      "name": "inbox-in",
      "font_class": "inbox-in",
      "unicode": "e7f4",
      "unicode_decimal": 59380
    },
    {
      "icon_id": "6151219",
      "name": "box",
      "font_class": "box",
      "unicode": "e7f5",
      "unicode_decimal": 59381
    },
    {
      "icon_id": "6151221",
      "name": "database-set",
      "font_class": "database-set",
      "unicode": "e7f6",
      "unicode_decimal": 59382
    },
    {
      "icon_id": "6151223",
      "name": "layer-group",
      "font_class": "layer-group",
      "unicode": "e7f7",
      "unicode_decimal": 59383
    },
    {
      "icon_id": "6151224",
      "name": "wind-cry",
      "font_class": "wind-cry",
      "unicode": "e7f8",
      "unicode_decimal": 59384
    },
    {
      "icon_id": "6151225",
      "name": "wind-smile",
      "font_class": "wind-smile",
      "unicode": "e7f9",
      "unicode_decimal": 59385
    },
    {
      "icon_id": "6151227",
      "name": "unlock",
      "font_class": "unlock",
      "unicode": "e7fa",
      "unicode_decimal": 59386
    },
    {
      "icon_id": "6151228",
      "name": "lock",
      "font_class": "lock",
      "unicode": "e7fb",
      "unicode_decimal": 59387
    },
    {
      "icon_id": "6151230",
      "name": "align-right",
      "font_class": "align-right",
      "unicode": "e7fc",
      "unicode_decimal": 59388
    },
    {
      "icon_id": "6151231",
      "name": "align-left",
      "font_class": "align-left",
      "unicode": "e7fd",
      "unicode_decimal": 59389
    },
    {
      "icon_id": "6151232",
      "name": "border-bottom",
      "font_class": "border-bottom",
      "unicode": "e7fe",
      "unicode_decimal": 59390
    },
    {
      "icon_id": "6151233",
      "name": "border-top",
      "font_class": "border-top",
      "unicode": "e7ff",
      "unicode_decimal": 59391
    },
    {
      "icon_id": "6151234",
      "name": "align-center",
      "font_class": "align-center",
      "unicode": "e800",
      "unicode_decimal": 59392
    },
    {
      "icon_id": "6151236",
      "name": "border-verticle",
      "font_class": "border-verticle",
      "unicode": "e801",
      "unicode_decimal": 59393
    },
    {
      "icon_id": "6151237",
      "name": "pic-center",
      "font_class": "pic-center",
      "unicode": "e802",
      "unicode_decimal": 59394
    },
    {
      "icon_id": "6151238",
      "name": "pic-side",
      "font_class": "pic-side",
      "unicode": "e803",
      "unicode_decimal": 59395
    },
    {
      "icon_id": "6151239",
      "name": "folder-open",
      "font_class": "folder-open",
      "unicode": "e804",
      "unicode_decimal": 59396
    },
    {
      "icon_id": "6151241",
      "name": "folder-plus",
      "font_class": "folder-plus",
      "unicode": "e805",
      "unicode_decimal": 59397
    },
    {
      "icon_id": "6151242",
      "name": "folder",
      "font_class": "folder",
      "unicode": "e806",
      "unicode_decimal": 59398
    },
    {
      "icon_id": "6151251",
      "name": "file-SQL",
      "font_class": "file-SQL1",
      "unicode": "e807",
      "unicode_decimal": 59399
    },
    {
      "icon_id": "6151252",
      "name": "file-plus",
      "font_class": "file-plus",
      "unicode": "e808",
      "unicode_decimal": 59400
    },
    {
      "icon_id": "6151253",
      "name": "file",
      "font_class": "file",
      "unicode": "e809",
      "unicode_decimal": 59401
    },
    {
      "icon_id": "6151256",
      "name": "copy",
      "font_class": "copy",
      "unicode": "e80a",
      "unicode_decimal": 59402
    },
    {
      "icon_id": "6151257",
      "name": "headset",
      "font_class": "headset",
      "unicode": "e80b",
      "unicode_decimal": 59403
    },
    {
      "icon_id": "6151258",
      "name": "phone",
      "font_class": "phone",
      "unicode": "e80c",
      "unicode_decimal": 59404
    },
    {
      "icon_id": "6151260",
      "name": "pause circle",
      "font_class": "pausecircle",
      "unicode": "e80d",
      "unicode_decimal": 59405
    },
    {
      "icon_id": "6151261",
      "name": "stop circle",
      "font_class": "stopcircle",
      "unicode": "e80e",
      "unicode_decimal": 59406
    },
    {
      "icon_id": "6151262",
      "name": "play circle",
      "font_class": "playcircle",
      "unicode": "e80f",
      "unicode_decimal": 59407
    },
    {
      "icon_id": "6151263",
      "name": "delete",
      "font_class": "delete",
      "unicode": "e810",
      "unicode_decimal": 59408
    },
    {
      "icon_id": "6151264",
      "name": "picture",
      "font_class": "picture",
      "unicode": "e811",
      "unicode_decimal": 59409
    },
    {
      "icon_id": "6151265",
      "name": "mail",
      "font_class": "mail",
      "unicode": "e812",
      "unicode_decimal": 59410
    },
    {
      "icon_id": "6151266",
      "name": "like",
      "font_class": "like",
      "unicode": "e813",
      "unicode_decimal": 59411
    },
    {
      "icon_id": "6151267",
      "name": "collection",
      "font_class": "collection",
      "unicode": "e814",
      "unicode_decimal": 59412
    },
    {
      "icon_id": "6151268",
      "name": "user-group",
      "font_class": "user-group",
      "unicode": "e815",
      "unicode_decimal": 59413
    },
    {
      "icon_id": "6151270",
      "name": "account-plus",
      "font_class": "account-plus",
      "unicode": "e816",
      "unicode_decimal": 59414
    },
    {
      "icon_id": "6151272",
      "name": "account",
      "font_class": "account",
      "unicode": "e817",
      "unicode_decimal": 59415
    },
    {
      "icon_id": "6151273",
      "name": "cog",
      "font_class": "cog",
      "unicode": "e818",
      "unicode_decimal": 59416
    },
    {
      "icon_id": "6151275",
      "name": "clock",
      "font_class": "clock",
      "unicode": "e819",
      "unicode_decimal": 59417
    },
    {
      "icon_id": "6151276",
      "name": "calendar-alt",
      "font_class": "calendar-alt",
      "unicode": "e81a",
      "unicode_decimal": 59418
    },
    {
      "icon_id": "6151277",
      "name": "cloud download",
      "font_class": "clouddownload",
      "unicode": "e81b",
      "unicode_decimal": 59419
    },
    {
      "icon_id": "6151278",
      "name": "cloud upload",
      "font_class": "cloudupload",
      "unicode": "e81c",
      "unicode_decimal": 59420
    },
    {
      "icon_id": "6151279",
      "name": "exchange",
      "font_class": "exchange",
      "unicode": "e81d",
      "unicode_decimal": 59421
    },
    {
      "icon_id": "6151280",
      "name": "info-circle",
      "font_class": "info-circle",
      "unicode": "e81e",
      "unicode_decimal": 59422
    },
    {
      "icon_id": "6151281",
      "name": "question-circle",
      "font_class": "question-circle",
      "unicode": "e81f",
      "unicode_decimal": 59423
    },
    {
      "icon_id": "6151282",
      "name": "exclamation-circle",
      "font_class": "exclamation-circle",
      "unicode": "e820",
      "unicode_decimal": 59424
    },
    {
      "icon_id": "6151283",
      "name": "minus-circle",
      "font_class": "minus-circle",
      "unicode": "e821",
      "unicode_decimal": 59425
    },
    {
      "icon_id": "6151285",
      "name": "plus-circle",
      "font_class": "plus-circle",
      "unicode": "e822",
      "unicode_decimal": 59426
    },
    {
      "icon_id": "6151286",
      "name": "times-circle",
      "font_class": "times-circle",
      "unicode": "e823",
      "unicode_decimal": 59427
    },
    {
      "icon_id": "6151287",
      "name": "check-circle",
      "font_class": "check-circle",
      "unicode": "e824",
      "unicode_decimal": 59428
    },
    {
      "icon_id": "6151288",
      "name": "compress-alt",
      "font_class": "compress-alt",
      "unicode": "e825",
      "unicode_decimal": 59429
    },
    {
      "icon_id": "6151289",
      "name": "expand-alt",
      "font_class": "expand-alt",
      "unicode": "e826",
      "unicode_decimal": 59430
    },
    {
      "icon_id": "6151290",
      "name": "ban",
      "font_class": "ban",
      "unicode": "e827",
      "unicode_decimal": 59431
    },
    {
      "icon_id": "6151292",
      "name": "minus",
      "font_class": "minus",
      "unicode": "e828",
      "unicode_decimal": 59432
    },
    {
      "icon_id": "6151293",
      "name": "plus",
      "font_class": "plus",
      "unicode": "e829",
      "unicode_decimal": 59433
    },
    {
      "icon_id": "6151294",
      "name": "times",
      "font_class": "times",
      "unicode": "e82a",
      "unicode_decimal": 59434
    },
    {
      "icon_id": "6151295",
      "name": "check",
      "font_class": "check",
      "unicode": "e82b",
      "unicode_decimal": 59435
    },
    {
      "icon_id": "6151299",
      "name": "search-minus",
      "font_class": "search-minus",
      "unicode": "e82c",
      "unicode_decimal": 59436
    },
    {
      "icon_id": "6151300",
      "name": "search-plus",
      "font_class": "search-plus",
      "unicode": "e82d",
      "unicode_decimal": 59437
    },
    {
      "icon_id": "6151301",
      "name": "search",
      "font_class": "search",
      "unicode": "e82e",
      "unicode_decimal": 59438
    },
    {
      "icon_id": "6151304",
      "name": "reply",
      "font_class": "reply",
      "unicode": "e82f",
      "unicode_decimal": 59439
    },
    {
      "icon_id": "6151306",
      "name": "undo",
      "font_class": "undo",
      "unicode": "e830",
      "unicode_decimal": 59440
    },
    {
      "icon_id": "6151307",
      "name": "redo",
      "font_class": "redo",
      "unicode": "e831",
      "unicode_decimal": 59441
    },
    {
      "icon_id": "6151308",
      "name": "external-link",
      "font_class": "external-link",
      "unicode": "e832",
      "unicode_decimal": 59442
    },
    {
      "icon_id": "6151309",
      "name": "arrows-alt",
      "font_class": "arrows-alt",
      "unicode": "e833",
      "unicode_decimal": 59443
    },
    {
      "icon_id": "6151310",
      "name": "indent",
      "font_class": "indent",
      "unicode": "e834",
      "unicode_decimal": 59444
    },
    {
      "icon_id": "6151311",
      "name": "outdent",
      "font_class": "outdent",
      "unicode": "e835",
      "unicode_decimal": 59445
    },
    {
      "icon_id": "6151312",
      "name": "sort-line",
      "font_class": "sort-line",
      "unicode": "e836",
      "unicode_decimal": 59446
    },
    {
      "icon_id": "6151314",
      "name": "switch",
      "font_class": "switch",
      "unicode": "e837",
      "unicode_decimal": 59447
    },
    {
      "icon_id": "6151316",
      "name": "wind-descending",
      "font_class": "wind-descending",
      "unicode": "e838",
      "unicode_decimal": 59448
    },
    {
      "icon_id": "6151317",
      "name": "wind-ascending",
      "font_class": "wind-ascending",
      "unicode": "e839",
      "unicode_decimal": 59449
    },
    {
      "icon_id": "6151351",
      "name": "download",
      "font_class": "download",
      "unicode": "e83a",
      "unicode_decimal": 59450
    },
    {
      "icon_id": "6151353",
      "name": "upload",
      "font_class": "upload",
      "unicode": "e83b",
      "unicode_decimal": 59451
    },
    {
      "icon_id": "6151360",
      "name": "arrow-to-bottom",
      "font_class": "arrow-to-bottom",
      "unicode": "e83c",
      "unicode_decimal": 59452
    },
    {
      "icon_id": "6151361",
      "name": "arrow-to-top",
      "font_class": "arrow-to-top",
      "unicode": "e83d",
      "unicode_decimal": 59453
    },
    {
      "icon_id": "6151363",
      "name": "long-arrow-down",
      "font_class": "long-arrow-down",
      "unicode": "e83e",
      "unicode_decimal": 59454
    },
    {
      "icon_id": "6151364",
      "name": "long-arrow-up",
      "font_class": "long-arrow-up",
      "unicode": "e83f",
      "unicode_decimal": 59455
    },
    {
      "icon_id": "6151368",
      "name": "arrow-right",
      "font_class": "arrow-right",
      "unicode": "e840",
      "unicode_decimal": 59456
    },
    {
      "icon_id": "6151370",
      "name": "arrow-left",
      "font_class": "arrow-left",
      "unicode": "e841",
      "unicode_decimal": 59457
    },
    {
      "icon_id": "6151371",
      "name": "sort",
      "font_class": "sort",
      "unicode": "e842",
      "unicode_decimal": 59458
    },
    {
      "icon_id": "6151377",
      "name": "sort-down",
      "font_class": "sort-down",
      "unicode": "e843",
      "unicode_decimal": 59459
    },
    {
      "icon_id": "6151384",
      "name": "sort-up",
      "font_class": "sort-up",
      "unicode": "e844",
      "unicode_decimal": 59460
    },
    {
      "icon_id": "6151385",
      "name": "caret-right",
      "font_class": "caret-right",
      "unicode": "e845",
      "unicode_decimal": 59461
    },
    {
      "icon_id": "6151386",
      "name": "caret-left",
      "font_class": "caret-left",
      "unicode": "e846",
      "unicode_decimal": 59462
    },
    {
      "icon_id": "6151387",
      "name": "arrows-v",
      "font_class": "arrows-v",
      "unicode": "e847",
      "unicode_decimal": 59463
    },
    {
      "icon_id": "6151390",
      "name": "angle- double-down",
      "font_class": "angle-double-down",
      "unicode": "e848",
      "unicode_decimal": 59464
    },
    {
      "icon_id": "6151391",
      "name": "angle-double-up",
      "font_class": "angle-double-up",
      "unicode": "e849",
      "unicode_decimal": 59465
    },
    {
      "icon_id": "6151392",
      "name": "angle-double-right",
      "font_class": "angle-double-right",
      "unicode": "e84a",
      "unicode_decimal": 59466
    },
    {
      "icon_id": "6151393",
      "name": "angle-double-left",
      "font_class": "angle-double-left",
      "unicode": "e84b",
      "unicode_decimal": 59467
    },
    {
      "icon_id": "6151394",
      "name": "angle-down",
      "font_class": "angle-down",
      "unicode": "e84c",
      "unicode_decimal": 59468
    },
    {
      "icon_id": "6151395",
      "name": "angle-up",
      "font_class": "angle-up",
      "unicode": "e84d",
      "unicode_decimal": 59469
    },
    {
      "icon_id": "6151396",
      "name": "angle-right",
      "font_class": "angle-right",
      "unicode": "e84e",
      "unicode_decimal": 59470
    },
    {
      "icon_id": "6151456",
      "name": "angle-left",
      "font_class": "angle-left",
      "unicode": "e84f",
      "unicode_decimal": 59471
    },
    {
      "icon_id": "6168585",
      "name": "paperclip",
      "font_class": "paperclip",
      "unicode": "e850",
      "unicode_decimal": 59472
    },
    {
      "icon_id": "6172713",
      "name": "connection",
      "font_class": "connection",
      "unicode": "e851",
      "unicode_decimal": 59473
    },
    {
      "icon_id": "6172717",
      "name": "training",
      "font_class": "training",
      "unicode": "e853",
      "unicode_decimal": 59475
    },
    {
      "icon_id": "6172721",
      "name": "process",
      "font_class": "process",
      "unicode": "e854",
      "unicode_decimal": 59476
    },
    {
      "icon_id": "6172722",
      "name": "news",
      "font_class": "news",
      "unicode": "e855",
      "unicode_decimal": 59477
    },
    {
      "icon_id": "6172724",
      "name": "save",
      "font_class": "save",
      "unicode": "e856",
      "unicode_decimal": 59478
    },
    {
      "icon_id": "6172748",
      "name": "print",
      "font_class": "print",
      "unicode": "e857",
      "unicode_decimal": 59479
    },
    {
      "icon_id": "6172751",
      "name": "new-releases",
      "font_class": "new-releases",
      "unicode": "e858",
      "unicode_decimal": 59480
    },
    {
      "icon_id": "6172758",
      "name": "release",
      "font_class": "release",
      "unicode": "e85a",
      "unicode_decimal": 59482
    },
    {
      "icon_id": "6172762",
      "name": "alert",
      "font_class": "alert",
      "unicode": "e85b",
      "unicode_decimal": 59483
    },
    {
      "icon_id": "6172770",
      "name": "backspace",
      "font_class": "backspace",
      "unicode": "e85c",
      "unicode_decimal": 59484
    },
    {
      "icon_id": "6172775",
      "name": "gem",
      "font_class": "gem",
      "unicode": "e85d",
      "unicode_decimal": 59485
    },
    {
      "icon_id": "6172776",
      "name": "integral",
      "font_class": "integral",
      "unicode": "e85e",
      "unicode_decimal": 59486
    },
    {
      "icon_id": "6172777",
      "name": "star-circle",
      "font_class": "star-circle",
      "unicode": "e85f",
      "unicode_decimal": 59487
    },
    {
      "icon_id": "6172778",
      "name": "user-circle",
      "font_class": "user-circle",
      "unicode": "e860",
      "unicode_decimal": 59488
    },
    {
      "icon_id": "6172783",
      "name": "cloud-machine-fill",
      "font_class": "cloud-machine-fill",
      "unicode": "e861",
      "unicode_decimal": 59489
    },
    {
      "icon_id": "6172784",
      "name": "cloud-machine",
      "font_class": "cloud-machine",
      "unicode": "e862",
      "unicode_decimal": 59490
    },
    {
      "icon_id": "6172785",
      "name": "terminal-fill",
      "font_class": "terminal-fill",
      "unicode": "e863",
      "unicode_decimal": 59491
    },
    {
      "icon_id": "6172786",
      "name": "terminal",
      "font_class": "terminal",
      "unicode": "e864",
      "unicode_decimal": 59492
    },
    {
      "icon_id": "6173016",
      "name": "shopping-cart-fill",
      "font_class": "shopping-cart-fill",
      "unicode": "e865",
      "unicode_decimal": 59493
    },
    {
      "icon_id": "6228652",
      "name": "resource",
      "font_class": "resource",
      "unicode": "e867",
      "unicode_decimal": 59495
    },
    {
      "icon_id": "6303226",
      "name": "rank",
      "font_class": "rank",
      "unicode": "e86a",
      "unicode_decimal": 59498
    },
    {
      "icon_id": "6343820",
      "name": "sync-alt",
      "font_class": "sync-alt",
      "unicode": "e86b",
      "unicode_decimal": 59499
    },
    {
      "icon_id": "6343821",
      "name": "compass",
      "font_class": "compass",
      "unicode": "e86c",
      "unicode_decimal": 59500
    },
    {
      "icon_id": "6343822",
      "name": "arrow-alt- from-top",
      "font_class": "arrow-alt-from-top",
      "unicode": "e86d",
      "unicode_decimal": 59501
    },
    {
      "icon_id": "6343823",
      "name": "arrow-alt-from-botto",
      "font_class": "arrow-alt-from-botto",
      "unicode": "e86e",
      "unicode_decimal": 59502
    },
    {
      "icon_id": "6343824",
      "name": "menu",
      "font_class": "menu",
      "unicode": "e86f",
      "unicode_decimal": 59503
    },
    {
      "icon_id": "6353291",
      "name": "icon-drag",
      "font_class": "icon-drag",
      "unicode": "e870",
      "unicode_decimal": 59504
    },
    {
      "icon_id": "6353292",
      "name": "early-warning",
      "font_class": "early-warning",
      "unicode": "e871",
      "unicode_decimal": 59505
    },
    {
      "icon_id": "6353293",
      "name": "share",
      "font_class": "share",
      "unicode": "e872",
      "unicode_decimal": 59506
    },
    {
      "icon_id": "6353306",
      "name": "share",
      "font_class": "share1",
      "unicode": "e873",
      "unicode_decimal": 59507
    },
    {
      "icon_id": "6861314",
      "name": "management",
      "font_class": "management-",
      "unicode": "e874",
      "unicode_decimal": 59508
    },
    {
      "icon_id": "6863066",
      "name": "accesskeys",
      "font_class": "accesskeys",
      "unicode": "e875",
      "unicode_decimal": 59509
    },
    {
      "icon_id": "7357537",
      "name": "arrow-sort down-small",
      "font_class": "arrow-sortdown-smal",
      "unicode": "e877",
      "unicode_decimal": 59511
    },
    {
      "icon_id": "7410218",
      "name": "minus-square-fill",
      "font_class": "minus-square-fill",
      "unicode": "e878",
      "unicode_decimal": 59512
    },
    {
      "icon_id": "7410219",
      "name": "plus-square-fill",
      "font_class": "plus-square-fill",
      "unicode": "e879",
      "unicode_decimal": 59513
    },
    {
      "icon_id": "7410220",
      "name": "minus-square",
      "font_class": "minus-square",
      "unicode": "e87a",
      "unicode_decimal": 59514
    },
    {
      "icon_id": "7410222",
      "name": "plus-square",
      "font_class": "plus-square",
      "unicode": "e87b",
      "unicode_decimal": 59515
    },
    {
      "icon_id": "7906283",
      "name": "step mode",
      "font_class": "stepmode",
      "unicode": "e87d",
      "unicode_decimal": 59517
    },
    {
      "icon_id": "7906284",
      "name": "scrolling mode",
      "font_class": "scrollingmode",
      "unicode": "e87e",
      "unicode_decimal": 59518
    },
    {
      "icon_id": "8268337",
      "name": "shopping cart",
      "font_class": "shoppingcart",
      "unicode": "e881",
      "unicode_decimal": 59521
    },
    {
      "icon_id": "8305716",
      "name": "waiting-fill",
      "font_class": "waiting-fill",
      "unicode": "e882",
      "unicode_decimal": 59522
    },
    {
      "icon_id": "8305718",
      "name": "waiting",
      "font_class": "waiting",
      "unicode": "e883",
      "unicode_decimal": 59523
    },
    {
      "icon_id": "8307796",
      "name": "right-arrow-rect",
      "font_class": "right-arrow-rect",
      "unicode": "e884",
      "unicode_decimal": 59524
    },
    {
      "icon_id": "8307800",
      "name": "left-arrow-rect",
      "font_class": "left-arrow-rect",
      "unicode": "e885",
      "unicode_decimal": 59525
    },
    {
      "icon_id": "8623603",
      "name": "bell",
      "font_class": "bell",
      "unicode": "e887",
      "unicode_decimal": 59527
    },
    {
      "icon_id": "8762555",
      "name": "structured data",
      "font_class": "structured-data",
      "unicode": "e888",
      "unicode_decimal": 59528
    },
    {
      "icon_id": "6150957",
      "name": "drag",
      "font_class": "drag",
      "unicode": "e769",
      "unicode_decimal": 59241
    },
    {
      "icon_id": "8762556",
      "name": "vector",
      "font_class": "vector",
      "unicode": "e889",
      "unicode_decimal": 59529
    },
    {
      "icon_id": "6150958",
      "name": "ellipsis-v",
      "font_class": "ellipsis-vertical",
      "unicode": "e76a",
      "unicode_decimal": 59242
    },
    {
      "icon_id": "9009443",
      "name": "NEW",
      "font_class": "NEW-copy",
      "unicode": "e88a",
      "unicode_decimal": 59530
    },
    {
      "icon_id": "6150959",
      "name": "gallery-view",
      "font_class": "gallery-view",
      "unicode": "e76b",
      "unicode_decimal": 59243
    },
    {
      "icon_id": "9009475",
      "name": "HOT",
      "font_class": "HOT-copy",
      "unicode": "e88b",
      "unicode_decimal": 59531
    },
    {
      "icon_id": "6150960",
      "name": "WIFI",
      "font_class": "WIFI",
      "unicode": "e76c",
      "unicode_decimal": 59244
    },
    {
      "icon_id": "9066652",
      "name": "home",
      "font_class": "home",
      "unicode": "e88c",
      "unicode_decimal": 59532
    },
    {
      "icon_id": "6150961",
      "name": "bug-report",
      "font_class": "bug-report",
      "unicode": "e76d",
      "unicode_decimal": 59245
    },
    {
      "icon_id": "9340469",
      "name": "monitoring",
      "font_class": "monitoring",
      "unicode": "e88e",
      "unicode_decimal": 59534
    },
    {
      "icon_id": "6150962",
      "name": "qrcode",
      "font_class": "qrcode",
      "unicode": "e76e",
      "unicode_decimal": 59246
    },
    {
      "icon_id": "9340470",
      "name": "diagnose",
      "font_class": "diagnose",
      "unicode": "e88f",
      "unicode_decimal": 59535
    },
    {
      "icon_id": "6150963",
      "name": "scan",
      "font_class": "scan",
      "unicode": "e76f",
      "unicode_decimal": 59247
    },
    {
      "icon_id": "10273624",
      "name": "loading",
      "font_class": "loading",
      "unicode": "e891",
      "unicode_decimal": 59537
    },
    {
      "icon_id": "6150964",
      "name": "cut",
      "font_class": "cut",
      "unicode": "e770",
      "unicode_decimal": 59248
    },
    {
      "icon_id": "11307823",
      "name": "Directory tree",
      "font_class": "Directory-tree",
      "unicode": "e892",
      "unicode_decimal": 59538
    },
    {
      "icon_id": "6150965",
      "name": "gift",
      "font_class": "gift",
      "unicode": "e771",
      "unicode_decimal": 59249
    },
    {
      "icon_id": "12253601",
      "name": "application",
      "font_class": "application",
      "unicode": "e89e",
      "unicode_decimal": 59550
    },
    {
      "icon_id": "6150966",
      "name": "link",
      "font_class": "link",
      "unicode": "e772",
      "unicode_decimal": 59250
    },
    {
      "icon_id": "12253602",
      "name": "application  group",
      "font_class": "applicationgroup",
      "unicode": "e89f",
      "unicode_decimal": 59551
    },
    {
      "icon_id": "6150968",
      "name": "poweroff",
      "font_class": "poweroff",
      "unicode": "e774",
      "unicode_decimal": 59252
    },
    {
      "icon_id": "6150969",
      "name": "key",
      "font_class": "key",
      "unicode": "e775",
      "unicode_decimal": 59253
    },
    {
      "icon_id": "6150970",
      "name": "safety-certificate",
      "font_class": "safety-certificate",
      "unicode": "e776",
      "unicode_decimal": 59254
    },
    {
      "icon_id": "6150971",
      "name": "supervise",
      "font_class": "supervise",
      "unicode": "e777",
      "unicode_decimal": 59255
    },
    {
      "icon_id": "6151018",
      "name": "tag-subscipt",
      "font_class": "tag-subscipt",
      "unicode": "e78a",
      "unicode_decimal": 59274
    },
    {
      "icon_id": "6151030",
      "name": "chart-pie-alt",
      "font_class": "chart-pie-alt",
      "unicode": "e78c",
      "unicode_decimal": 59276
    },
    {
      "icon_id": "6151031",
      "name": "chart-relation",
      "font_class": "chart-relation",
      "unicode": "e78d",
      "unicode_decimal": 59277
    },
    {
      "icon_id": "6151032",
      "name": "chart-scatter-plot",
      "font_class": "chart-scatter-plot",
      "unicode": "e78e",
      "unicode_decimal": 59278
    },
    {
      "icon_id": "6151033",
      "name": "chart-area",
      "font_class": "chart-area",
      "unicode": "e78f",
      "unicode_decimal": 59279
    },
    {
      "icon_id": "6151034",
      "name": "chart-line",
      "font_class": "chart-line",
      "unicode": "e790",
      "unicode_decimal": 59280
    },
    {
      "icon_id": "6151035",
      "name": "chart-bar",
      "font_class": "chart-bar",
      "unicode": "e791",
      "unicode_decimal": 59281
    }
  ];
  const language$2 = "English-US";
  var en = {
    language: language$2,
    "index.search.subtext": "Fully compatible with vue3 TypeScript pinia component library",
    "index.search.tips": "Chinese/English name",
    "index.search.btntext": "search",
    "index.com.navtitle": "TMUI All platforms",
    "index.com.title": "Category Navigation",
    "index.com.tongyong": "Universal",
    "index.com.row": "Layout",
    "index.com.show": "Display",
    "index.com.form": "Form",
    "index.com.fd": "Reminder",
    "index.com.nav": "Navigation",
    "index.com.yewu": "Business",
    "index.com.other": "Other",
    "index.com.tubiao": "Chart",
    "index.com.tongyongSub": "can't translate",
    "index.com.rowSub": "can't translate",
    "index.com.showSub": "can't translate",
    "index.com.formSub": "can't translate",
    "index.com.fdSub": "can't translate",
    "index.com.navSub": "can't translate",
    "index.com.yewuSub": "can't translate",
    "index.com.otherSub": "can't translate",
    "index.com.tubiaoSub": "Echarts 5.3.2",
    "index.com.render": "Render",
    "index.com.renderSub": "cavas render",
    "index.com.bottom": "tmui 3.0.0 fully compatible",
    "index.com.setLocal": "language setting",
    "index.com.love": "Action support",
    "index.com.loveSub": "Watch an ad",
    "index.com.themetext": "Dynamically switch themes\uFF0Cmore of see docs",
    "index.com.themeGreen": "Yellow",
    "index.com.themeBlue": "Blue",
    "index.com.themeRed": "Red",
    "index.com.themeDefault": "Default",
    "index.com.themeCustText": "custom",
    "message.load.text": "Loading",
    "message.error.text": "Error",
    "message.info.text": "Tips",
    "message.warn.text": "Warning",
    "message.quest.text": "Question",
    "message.success.text": "Success",
    "message.disabled.text": "Disabled",
    "message.wait.text": "Waiting"
  };
  const language$1 = "\u7B80\u4F53-\u4E2D\u56FD";
  var zhHans = {
    language: language$1,
    "index.search.subtext": "\u5168\u7AEF\u517C\u5BB9vue3 TypeScript pinia\u7EC4\u4EF6\u5E93",
    "index.search.tips": "\u7EC4\u4EF6\u4E2D\u6587/\u82F1\u6587\u540D\u79F0",
    "index.search.btntext": "\u641C\u7D22\u7EC4\u4EF6",
    "index.com.navtitle": "TMUI \u5168\u5E73\u53F0\u7EC4\u4EF6\u5E93",
    "index.com.title": "\u5206\u7C7B\u5BFC\u822A",
    "index.com.tongyong": "\u901A\u7528\u7EC4\u4EF6",
    "index.com.tongyongSub": "\u9AD8\u9891\u5E38\u7528\u7EC4\u4EF6",
    "index.com.row": "\u5E03\u5C40\u7EC4\u4EF6",
    "index.com.rowSub": "\u5E03\u5C40\u6392\u7248",
    "index.com.show": "\u5C55\u793A\u7EC4\u4EF6",
    "index.com.showSub": "\u5E38\u89C1\u6570\u636E\u5C55\u793A",
    "index.com.form": "\u8868\u5355\u5F55\u5165",
    "index.com.formSub": "\u6570\u636E\u63D0\u4EA4\u7C7B",
    "index.com.fd": "\u53CD\u9988\u7C7B\u578B",
    "index.com.fdSub": "\u63D0\u793A\u5F39\u5C42\u7C7B\u7EC4\u4EF6",
    "index.com.nav": "\u5BFC\u822A\u7C7B\u578B",
    "index.com.navSub": "\u5206\u9875\u5BFC\u822A\u7C7B",
    "index.com.yewu": "\u4E1A\u52A1\u578B\u7EC4\u4EF6",
    "index.com.yewuSub": "\u4F18\u60E0\u5238\u5BFC\u8D2D\u7C7B",
    "index.com.other": "\u5176\u5B83",
    "index.com.otherSub": "\u529F\u80FD\u578B\u7EC4\u4EF6",
    "index.com.tubiao": "\u56FE\u8868\u7EC4\u4EF6",
    "index.com.tubiaoSub": "Echarts 5.3.2",
    "index.com.render": "Render",
    "index.com.renderSub": "cavas\u754C\u9762\u6E32\u67D3",
    "index.com.bottom": "tmui 3.0.0 \u539F\u751F\u6E32\u67D3\uFF0C\u5168\u7AEF\u517C\u5BB9",
    "index.com.setLocal": "\u8BBE\u7F6E\u8BED\u8A00",
    "index.com.love": "TMUI\u7528\u6237\u4E2D\u5FC3",
    "index.com.loveSub": "\u770B\u5E7F\u544A\u8D5A\u79EF\u5206",
    "index.com.themetext": "\u52A8\u6001\u5207\u6362\u4E3B\u9898,\u9ED8\u8BA4\u4E3B\u9898\u89C1\u6587\u6863",
    "index.com.themeGreen": "\u5C0F\u9EC4",
    "index.com.themeBlue": "\u84DD\u8272",
    "index.com.themeRed": "\u7EA2\u8272",
    "index.com.themeDefault": "\u9ED8\u8BA4",
    "index.com.themeCustText": "\u81EA\u5B9A",
    "message.load.text": "\u52A0\u8F7D\u4E2D",
    "message.error.text": "\u64CD\u4F5C\u9519\u8BEF",
    "message.info.text": "\u63D0\u793A\u4FE1\u606F",
    "message.warn.text": "\u8B66\u544A\u4FE1\u606F",
    "message.quest.text": "\u4F3C\u4E4E\u6709\u95EE\u9898",
    "message.success.text": "\u64CD\u4F5C\u6210\u529F",
    "message.disabled.text": "\u7981\u6B62\u64CD\u4F5C",
    "message.wait.text": "\u8BF7\u7A0D\u5019.."
  };
  /*!
    * @intlify/shared v9.1.9
    * (c) 2021 kazuya kawaguchi
    * Released under the MIT License.
    */
  const inBrowser = typeof window !== "undefined";
  let mark;
  let measure;
  {
    const perf2 = inBrowser && window.performance;
    if (perf2 && perf2.mark && perf2.measure && perf2.clearMarks && perf2.clearMeasures) {
      mark = (tag) => perf2.mark(tag);
      measure = (name, startTag, endTag) => {
        perf2.measure(name, startTag, endTag);
        perf2.clearMarks(startTag);
        perf2.clearMarks(endTag);
      };
    }
  }
  const RE_ARGS = /\{([0-9a-zA-Z]+)\}/g;
  function format(message, ...args) {
    if (args.length === 1 && isObject$1(args[0])) {
      args = args[0];
    }
    if (!args || !args.hasOwnProperty) {
      args = {};
    }
    return message.replace(RE_ARGS, (match, identifier) => {
      return args.hasOwnProperty(identifier) ? args[identifier] : "";
    });
  }
  const hasSymbol = typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol";
  const makeSymbol = (name) => hasSymbol ? Symbol(name) : name;
  const generateFormatCacheKey = (locale, key, source) => friendlyJSONstringify({ l: locale, k: key, s: source });
  const friendlyJSONstringify = (json) => JSON.stringify(json).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027");
  const isNumber = (val) => typeof val === "number" && isFinite(val);
  const isDate = (val) => toTypeString(val) === "[object Date]";
  const isRegExp = (val) => toTypeString(val) === "[object RegExp]";
  const isEmptyObject = (val) => isPlainObject(val) && Object.keys(val).length === 0;
  function warn(msg, err) {
    if (typeof console !== "undefined") {
      console.warn(`[intlify] ` + msg);
      if (err) {
        console.warn(err.stack);
      }
    }
  }
  const assign = Object.assign;
  let _globalThis;
  const getGlobalThis = () => {
    return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
  };
  function escapeHtml(rawText) {
    return rawText.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
  }
  const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
  function hasOwn$1(obj, key) {
    return hasOwnProperty$1.call(obj, key);
  }
  const isArray = Array.isArray;
  const isFunction = (val) => typeof val === "function";
  const isString = (val) => typeof val === "string";
  const isBoolean = (val) => typeof val === "boolean";
  const isObject$1 = (val) => val !== null && typeof val === "object";
  const objectToString = Object.prototype.toString;
  const toTypeString = (value) => objectToString.call(value);
  const isPlainObject = (val) => toTypeString(val) === "[object Object]";
  const toDisplayString = (val) => {
    return val == null ? "" : isArray(val) || isPlainObject(val) && val.toString === objectToString ? JSON.stringify(val, null, 2) : String(val);
  };
  const RANGE = 2;
  function generateCodeFrame(source, start = 0, end = source.length) {
    const lines = source.split(/\r?\n/);
    let count = 0;
    const res = [];
    for (let i = 0; i < lines.length; i++) {
      count += lines[i].length + 1;
      if (count >= start) {
        for (let j = i - RANGE; j <= i + RANGE || end > count; j++) {
          if (j < 0 || j >= lines.length)
            continue;
          const line = j + 1;
          res.push(`${line}${" ".repeat(3 - String(line).length)}|  ${lines[j]}`);
          const lineLength = lines[j].length;
          if (j === i) {
            const pad = start - (count - lineLength) + 1;
            const length = Math.max(1, end > count ? lineLength - pad : end - start);
            res.push(`   |  ` + " ".repeat(pad) + "^".repeat(length));
          } else if (j > i) {
            if (end > count) {
              const length = Math.max(Math.min(end - count, lineLength), 1);
              res.push(`   |  ` + "^".repeat(length));
            }
            count += lineLength + 1;
          }
        }
        break;
      }
    }
    return res.join("\n");
  }
  function createEmitter() {
    const events = /* @__PURE__ */ new Map();
    const emitter = {
      events,
      on(event, handler) {
        const handlers = events.get(event);
        const added = handlers && handlers.push(handler);
        if (!added) {
          events.set(event, [handler]);
        }
      },
      off(event, handler) {
        const handlers = events.get(event);
        if (handlers) {
          handlers.splice(handlers.indexOf(handler) >>> 0, 1);
        }
      },
      emit(event, payload) {
        (events.get(event) || []).slice().map((handler) => handler(payload));
        (events.get("*") || []).slice().map((handler) => handler(event, payload));
      }
    };
    return emitter;
  }
  /*!
    * @intlify/message-resolver v9.1.9
    * (c) 2021 kazuya kawaguchi
    * Released under the MIT License.
    */
  const hasOwnProperty = Object.prototype.hasOwnProperty;
  function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
  }
  const isObject = (val) => val !== null && typeof val === "object";
  const pathStateMachine = [];
  pathStateMachine[0] = {
    ["w"]: [0],
    ["i"]: [3, 0],
    ["["]: [4],
    ["o"]: [7]
  };
  pathStateMachine[1] = {
    ["w"]: [1],
    ["."]: [2],
    ["["]: [4],
    ["o"]: [7]
  };
  pathStateMachine[2] = {
    ["w"]: [2],
    ["i"]: [3, 0],
    ["0"]: [3, 0]
  };
  pathStateMachine[3] = {
    ["i"]: [3, 0],
    ["0"]: [3, 0],
    ["w"]: [1, 1],
    ["."]: [2, 1],
    ["["]: [4, 1],
    ["o"]: [7, 1]
  };
  pathStateMachine[4] = {
    ["'"]: [5, 0],
    ['"']: [6, 0],
    ["["]: [
      4,
      2
    ],
    ["]"]: [1, 3],
    ["o"]: 8,
    ["l"]: [4, 0]
  };
  pathStateMachine[5] = {
    ["'"]: [4, 0],
    ["o"]: 8,
    ["l"]: [5, 0]
  };
  pathStateMachine[6] = {
    ['"']: [4, 0],
    ["o"]: 8,
    ["l"]: [6, 0]
  };
  const literalValueRE = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
  function isLiteral(exp) {
    return literalValueRE.test(exp);
  }
  function stripQuotes(str) {
    const a = str.charCodeAt(0);
    const b = str.charCodeAt(str.length - 1);
    return a === b && (a === 34 || a === 39) ? str.slice(1, -1) : str;
  }
  function getPathCharType(ch) {
    if (ch === void 0 || ch === null) {
      return "o";
    }
    const code = ch.charCodeAt(0);
    switch (code) {
      case 91:
      case 93:
      case 46:
      case 34:
      case 39:
        return ch;
      case 95:
      case 36:
      case 45:
        return "i";
      case 9:
      case 10:
      case 13:
      case 160:
      case 65279:
      case 8232:
      case 8233:
        return "w";
    }
    return "i";
  }
  function formatSubPath(path) {
    const trimmed = path.trim();
    if (path.charAt(0) === "0" && isNaN(parseInt(path))) {
      return false;
    }
    return isLiteral(trimmed) ? stripQuotes(trimmed) : "*" + trimmed;
  }
  function parse(path) {
    const keys = [];
    let index = -1;
    let mode = 0;
    let subPathDepth = 0;
    let c;
    let key;
    let newChar;
    let type;
    let transition;
    let action;
    let typeMap;
    const actions = [];
    actions[0] = () => {
      if (key === void 0) {
        key = newChar;
      } else {
        key += newChar;
      }
    };
    actions[1] = () => {
      if (key !== void 0) {
        keys.push(key);
        key = void 0;
      }
    };
    actions[2] = () => {
      actions[0]();
      subPathDepth++;
    };
    actions[3] = () => {
      if (subPathDepth > 0) {
        subPathDepth--;
        mode = 4;
        actions[0]();
      } else {
        subPathDepth = 0;
        if (key === void 0) {
          return false;
        }
        key = formatSubPath(key);
        if (key === false) {
          return false;
        } else {
          actions[1]();
        }
      }
    };
    function maybeUnescapeQuote() {
      const nextChar = path[index + 1];
      if (mode === 5 && nextChar === "'" || mode === 6 && nextChar === '"') {
        index++;
        newChar = "\\" + nextChar;
        actions[0]();
        return true;
      }
    }
    while (mode !== null) {
      index++;
      c = path[index];
      if (c === "\\" && maybeUnescapeQuote()) {
        continue;
      }
      type = getPathCharType(c);
      typeMap = pathStateMachine[mode];
      transition = typeMap[type] || typeMap["l"] || 8;
      if (transition === 8) {
        return;
      }
      mode = transition[0];
      if (transition[1] !== void 0) {
        action = actions[transition[1]];
        if (action) {
          newChar = c;
          if (action() === false) {
            return;
          }
        }
      }
      if (mode === 7) {
        return keys;
      }
    }
  }
  const cache = /* @__PURE__ */ new Map();
  function resolveValue(obj, path) {
    if (!isObject(obj)) {
      return null;
    }
    let hit = cache.get(path);
    if (!hit) {
      hit = parse(path);
      if (hit) {
        cache.set(path, hit);
      }
    }
    if (!hit) {
      return null;
    }
    const len = hit.length;
    let last = obj;
    let i = 0;
    while (i < len) {
      const val = last[hit[i]];
      if (val === void 0) {
        return null;
      }
      last = val;
      i++;
    }
    return last;
  }
  function handleFlatJson(obj) {
    if (!isObject(obj)) {
      return obj;
    }
    for (const key in obj) {
      if (!hasOwn(obj, key)) {
        continue;
      }
      if (!key.includes(".")) {
        if (isObject(obj[key])) {
          handleFlatJson(obj[key]);
        }
      } else {
        const subKeys = key.split(".");
        const lastIndex = subKeys.length - 1;
        let currentObj = obj;
        for (let i = 0; i < lastIndex; i++) {
          if (!(subKeys[i] in currentObj)) {
            currentObj[subKeys[i]] = {};
          }
          currentObj = currentObj[subKeys[i]];
        }
        currentObj[subKeys[lastIndex]] = obj[key];
        delete obj[key];
        if (isObject(currentObj[subKeys[lastIndex]])) {
          handleFlatJson(currentObj[subKeys[lastIndex]]);
        }
      }
    }
    return obj;
  }
  /*!
    * @intlify/runtime v9.1.9
    * (c) 2021 kazuya kawaguchi
    * Released under the MIT License.
    */
  const DEFAULT_MODIFIER = (str) => str;
  const DEFAULT_MESSAGE = (ctx) => "";
  const DEFAULT_MESSAGE_DATA_TYPE = "text";
  const DEFAULT_NORMALIZE = (values) => values.length === 0 ? "" : values.join("");
  const DEFAULT_INTERPOLATE = toDisplayString;
  function pluralDefault(choice, choicesLength) {
    choice = Math.abs(choice);
    if (choicesLength === 2) {
      return choice ? choice > 1 ? 1 : 0 : 1;
    }
    return choice ? Math.min(choice, 2) : 0;
  }
  function getPluralIndex(options) {
    const index = isNumber(options.pluralIndex) ? options.pluralIndex : -1;
    return options.named && (isNumber(options.named.count) || isNumber(options.named.n)) ? isNumber(options.named.count) ? options.named.count : isNumber(options.named.n) ? options.named.n : index : index;
  }
  function normalizeNamed(pluralIndex, props) {
    if (!props.count) {
      props.count = pluralIndex;
    }
    if (!props.n) {
      props.n = pluralIndex;
    }
  }
  function createMessageContext(options = {}) {
    const locale = options.locale;
    const pluralIndex = getPluralIndex(options);
    const pluralRule = isObject$1(options.pluralRules) && isString(locale) && isFunction(options.pluralRules[locale]) ? options.pluralRules[locale] : pluralDefault;
    const orgPluralRule = isObject$1(options.pluralRules) && isString(locale) && isFunction(options.pluralRules[locale]) ? pluralDefault : void 0;
    const plural = (messages) => messages[pluralRule(pluralIndex, messages.length, orgPluralRule)];
    const _list = options.list || [];
    const list = (index) => _list[index];
    const _named = options.named || {};
    isNumber(options.pluralIndex) && normalizeNamed(pluralIndex, _named);
    const named = (key) => _named[key];
    function message(key) {
      const msg = isFunction(options.messages) ? options.messages(key) : isObject$1(options.messages) ? options.messages[key] : false;
      return !msg ? options.parent ? options.parent.message(key) : DEFAULT_MESSAGE : msg;
    }
    const _modifier = (name) => options.modifiers ? options.modifiers[name] : DEFAULT_MODIFIER;
    const normalize = isPlainObject(options.processor) && isFunction(options.processor.normalize) ? options.processor.normalize : DEFAULT_NORMALIZE;
    const interpolate = isPlainObject(options.processor) && isFunction(options.processor.interpolate) ? options.processor.interpolate : DEFAULT_INTERPOLATE;
    const type = isPlainObject(options.processor) && isString(options.processor.type) ? options.processor.type : DEFAULT_MESSAGE_DATA_TYPE;
    const ctx = {
      ["list"]: list,
      ["named"]: named,
      ["plural"]: plural,
      ["linked"]: (key, modifier) => {
        const msg = message(key)(ctx);
        return isString(modifier) ? _modifier(modifier)(msg) : msg;
      },
      ["message"]: message,
      ["type"]: type,
      ["interpolate"]: interpolate,
      ["normalize"]: normalize
    };
    return ctx;
  }
  /*!
    * @intlify/message-compiler v9.1.9
    * (c) 2021 kazuya kawaguchi
    * Released under the MIT License.
    */
  const errorMessages$2 = {
    [0]: `Expected token: '{0}'`,
    [1]: `Invalid token in placeholder: '{0}'`,
    [2]: `Unterminated single quote in placeholder`,
    [3]: `Unknown escape sequence: \\{0}`,
    [4]: `Invalid unicode escape sequence: {0}`,
    [5]: `Unbalanced closing brace`,
    [6]: `Unterminated closing brace`,
    [7]: `Empty placeholder`,
    [8]: `Not allowed nest placeholder`,
    [9]: `Invalid linked format`,
    [10]: `Plural must have messages`,
    [11]: `Unexpected empty linked modifier`,
    [12]: `Unexpected empty linked key`,
    [13]: `Unexpected lexical analysis in token: '{0}'`
  };
  function createCompileError(code, loc, options = {}) {
    const { domain, messages, args } = options;
    const msg = format((messages || errorMessages$2)[code] || "", ...args || []);
    const error = new SyntaxError(String(msg));
    error.code = code;
    if (loc) {
      error.location = loc;
    }
    error.domain = domain;
    return error;
  }
  /*!
    * @intlify/devtools-if v9.1.9
    * (c) 2021 kazuya kawaguchi
    * Released under the MIT License.
    */
  const IntlifyDevToolsHooks = {
    I18nInit: "i18n:init",
    FunctionTranslate: "function:translate"
  };
  /*!
    * @intlify/core-base v9.1.9
    * (c) 2021 kazuya kawaguchi
    * Released under the MIT License.
    */
  let devtools = null;
  function setDevToolsHook(hook) {
    devtools = hook;
  }
  function initI18nDevTools(i18n, version, meta) {
    devtools && devtools.emit(IntlifyDevToolsHooks.I18nInit, {
      timestamp: Date.now(),
      i18n,
      version,
      meta
    });
  }
  const translateDevTools = /* @__PURE__ */ createDevToolsHook(IntlifyDevToolsHooks.FunctionTranslate);
  function createDevToolsHook(hook) {
    return (payloads) => devtools && devtools.emit(hook, payloads);
  }
  const warnMessages$1 = {
    [0]: `Not found '{key}' key in '{locale}' locale messages.`,
    [1]: `Fall back to translate '{key}' key with '{target}' locale.`,
    [2]: `Cannot format a number value due to not supported Intl.NumberFormat.`,
    [3]: `Fall back to number format '{key}' key with '{target}' locale.`,
    [4]: `Cannot format a date value due to not supported Intl.DateTimeFormat.`,
    [5]: `Fall back to datetime format '{key}' key with '{target}' locale.`
  };
  function getWarnMessage$1(code, ...args) {
    return format(warnMessages$1[code], ...args);
  }
  const VERSION$1 = "9.1.9";
  const NOT_REOSLVED = -1;
  const MISSING_RESOLVE_VALUE = "";
  function getDefaultLinkedModifiers() {
    return {
      upper: (val) => isString(val) ? val.toUpperCase() : val,
      lower: (val) => isString(val) ? val.toLowerCase() : val,
      capitalize: (val) => isString(val) ? `${val.charAt(0).toLocaleUpperCase()}${val.substr(1)}` : val
    };
  }
  let _compiler;
  let _additionalMeta = null;
  const setAdditionalMeta = (meta) => {
    _additionalMeta = meta;
  };
  const getAdditionalMeta = () => _additionalMeta;
  let _cid = 0;
  function createCoreContext(options = {}) {
    const version = isString(options.version) ? options.version : VERSION$1;
    const locale = isString(options.locale) ? options.locale : "en-US";
    const fallbackLocale = isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || isString(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : locale;
    const messages = isPlainObject(options.messages) ? options.messages : { [locale]: {} };
    const datetimeFormats = isPlainObject(options.datetimeFormats) ? options.datetimeFormats : { [locale]: {} };
    const numberFormats = isPlainObject(options.numberFormats) ? options.numberFormats : { [locale]: {} };
    const modifiers = assign({}, options.modifiers || {}, getDefaultLinkedModifiers());
    const pluralRules = options.pluralRules || {};
    const missing = isFunction(options.missing) ? options.missing : null;
    const missingWarn = isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
    const fallbackWarn = isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
    const fallbackFormat = !!options.fallbackFormat;
    const unresolving = !!options.unresolving;
    const postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
    const processor = isPlainObject(options.processor) ? options.processor : null;
    const warnHtmlMessage = isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
    const escapeParameter = !!options.escapeParameter;
    const messageCompiler = isFunction(options.messageCompiler) ? options.messageCompiler : _compiler;
    const onWarn = isFunction(options.onWarn) ? options.onWarn : warn;
    const internalOptions = options;
    const __datetimeFormatters = isObject$1(internalOptions.__datetimeFormatters) ? internalOptions.__datetimeFormatters : /* @__PURE__ */ new Map();
    const __numberFormatters = isObject$1(internalOptions.__numberFormatters) ? internalOptions.__numberFormatters : /* @__PURE__ */ new Map();
    const __meta = isObject$1(internalOptions.__meta) ? internalOptions.__meta : {};
    _cid++;
    const context = {
      version,
      cid: _cid,
      locale,
      fallbackLocale,
      messages,
      datetimeFormats,
      numberFormats,
      modifiers,
      pluralRules,
      missing,
      missingWarn,
      fallbackWarn,
      fallbackFormat,
      unresolving,
      postTranslation,
      processor,
      warnHtmlMessage,
      escapeParameter,
      messageCompiler,
      onWarn,
      __datetimeFormatters,
      __numberFormatters,
      __meta
    };
    {
      context.__v_emitter = internalOptions.__v_emitter != null ? internalOptions.__v_emitter : void 0;
    }
    {
      initI18nDevTools(context, version, __meta);
    }
    return context;
  }
  function isTranslateFallbackWarn(fallback, key) {
    return fallback instanceof RegExp ? fallback.test(key) : fallback;
  }
  function isTranslateMissingWarn(missing, key) {
    return missing instanceof RegExp ? missing.test(key) : missing;
  }
  function handleMissing(context, key, locale, missingWarn, type) {
    const { missing, onWarn } = context;
    {
      const emitter = context.__v_emitter;
      if (emitter) {
        emitter.emit("missing", {
          locale,
          key,
          type,
          groupId: `${type}:${key}`
        });
      }
    }
    if (missing !== null) {
      const ret = missing(context, locale, key, type);
      return isString(ret) ? ret : key;
    } else {
      if (isTranslateMissingWarn(missingWarn, key)) {
        onWarn(getWarnMessage$1(0, { key, locale }));
      }
      return key;
    }
  }
  function getLocaleChain(ctx, fallback, start) {
    const context = ctx;
    if (!context.__localeChainCache) {
      context.__localeChainCache = /* @__PURE__ */ new Map();
    }
    let chain = context.__localeChainCache.get(start);
    if (!chain) {
      chain = [];
      let block = [start];
      while (isArray(block)) {
        block = appendBlockToChain(chain, block, fallback);
      }
      const defaults = isArray(fallback) ? fallback : isPlainObject(fallback) ? fallback["default"] ? fallback["default"] : null : fallback;
      block = isString(defaults) ? [defaults] : defaults;
      if (isArray(block)) {
        appendBlockToChain(chain, block, false);
      }
      context.__localeChainCache.set(start, chain);
    }
    return chain;
  }
  function appendBlockToChain(chain, block, blocks) {
    let follow = true;
    for (let i = 0; i < block.length && isBoolean(follow); i++) {
      const locale = block[i];
      if (isString(locale)) {
        follow = appendLocaleToChain(chain, block[i], blocks);
      }
    }
    return follow;
  }
  function appendLocaleToChain(chain, locale, blocks) {
    let follow;
    const tokens = locale.split("-");
    do {
      const target = tokens.join("-");
      follow = appendItemToChain(chain, target, blocks);
      tokens.splice(-1, 1);
    } while (tokens.length && follow === true);
    return follow;
  }
  function appendItemToChain(chain, target, blocks) {
    let follow = false;
    if (!chain.includes(target)) {
      follow = true;
      if (target) {
        follow = target[target.length - 1] !== "!";
        const locale = target.replace(/!/g, "");
        chain.push(locale);
        if ((isArray(blocks) || isPlainObject(blocks)) && blocks[locale]) {
          follow = blocks[locale];
        }
      }
    }
    return follow;
  }
  function updateFallbackLocale(ctx, locale, fallback) {
    const context = ctx;
    context.__localeChainCache = /* @__PURE__ */ new Map();
    getLocaleChain(ctx, fallback, locale);
  }
  function createCoreError(code) {
    return createCompileError(code, null, { messages: errorMessages$1 });
  }
  const errorMessages$1 = {
    [14]: "Invalid arguments",
    [15]: "The date provided is an invalid Date object.Make sure your Date represents a valid date.",
    [16]: "The argument provided is not a valid ISO date string"
  };
  const NOOP_MESSAGE_FUNCTION = () => "";
  const isMessageFunction = (val) => isFunction(val);
  function translate(context, ...args) {
    const { fallbackFormat, postTranslation, unresolving, fallbackLocale, messages } = context;
    const [key, options] = parseTranslateArgs(...args);
    const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
    const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
    const escapeParameter = isBoolean(options.escapeParameter) ? options.escapeParameter : context.escapeParameter;
    const resolvedMessage = !!options.resolvedMessage;
    const defaultMsgOrKey = isString(options.default) || isBoolean(options.default) ? !isBoolean(options.default) ? options.default : key : fallbackFormat ? key : "";
    const enableDefaultMsg = fallbackFormat || defaultMsgOrKey !== "";
    const locale = isString(options.locale) ? options.locale : context.locale;
    escapeParameter && escapeParams(options);
    let [format2, targetLocale, message] = !resolvedMessage ? resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) : [
      key,
      locale,
      messages[locale] || {}
    ];
    let cacheBaseKey = key;
    if (!resolvedMessage && !(isString(format2) || isMessageFunction(format2))) {
      if (enableDefaultMsg) {
        format2 = defaultMsgOrKey;
        cacheBaseKey = format2;
      }
    }
    if (!resolvedMessage && (!(isString(format2) || isMessageFunction(format2)) || !isString(targetLocale))) {
      return unresolving ? NOT_REOSLVED : key;
    }
    if (isString(format2) && context.messageCompiler == null) {
      warn(`The message format compilation is not supported in this build. Because message compiler isn't included. You need to pre-compilation all message format. So translate function return '${key}'.`);
      return key;
    }
    let occurred = false;
    const errorDetector = () => {
      occurred = true;
    };
    const msg = !isMessageFunction(format2) ? compileMessageFormat(context, key, targetLocale, format2, cacheBaseKey, errorDetector) : format2;
    if (occurred) {
      return format2;
    }
    const ctxOptions = getMessageContextOptions(context, targetLocale, message, options);
    const msgContext = createMessageContext(ctxOptions);
    const messaged = evaluateMessage(context, msg, msgContext);
    const ret = postTranslation ? postTranslation(messaged) : messaged;
    {
      const payloads = {
        timestamp: Date.now(),
        key: isString(key) ? key : isMessageFunction(format2) ? format2.key : "",
        locale: targetLocale || (isMessageFunction(format2) ? format2.locale : ""),
        format: isString(format2) ? format2 : isMessageFunction(format2) ? format2.source : "",
        message: ret
      };
      payloads.meta = assign({}, context.__meta, getAdditionalMeta() || {});
      translateDevTools(payloads);
    }
    return ret;
  }
  function escapeParams(options) {
    if (isArray(options.list)) {
      options.list = options.list.map((item) => isString(item) ? escapeHtml(item) : item);
    } else if (isObject$1(options.named)) {
      Object.keys(options.named).forEach((key) => {
        if (isString(options.named[key])) {
          options.named[key] = escapeHtml(options.named[key]);
        }
      });
    }
  }
  function resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) {
    const { messages, onWarn } = context;
    const locales = getLocaleChain(context, fallbackLocale, locale);
    let message = {};
    let targetLocale;
    let format2 = null;
    let from = locale;
    let to = null;
    const type = "translate";
    for (let i = 0; i < locales.length; i++) {
      targetLocale = to = locales[i];
      if (locale !== targetLocale && isTranslateFallbackWarn(fallbackWarn, key)) {
        onWarn(getWarnMessage$1(1, {
          key,
          target: targetLocale
        }));
      }
      if (locale !== targetLocale) {
        const emitter = context.__v_emitter;
        if (emitter) {
          emitter.emit("fallback", {
            type,
            key,
            from,
            to,
            groupId: `${type}:${key}`
          });
        }
      }
      message = messages[targetLocale] || {};
      let start = null;
      let startTag;
      let endTag;
      if (inBrowser) {
        start = window.performance.now();
        startTag = "intlify-message-resolve-start";
        endTag = "intlify-message-resolve-end";
        mark && mark(startTag);
      }
      if ((format2 = resolveValue(message, key)) === null) {
        format2 = message[key];
      }
      if (inBrowser) {
        const end = window.performance.now();
        const emitter = context.__v_emitter;
        if (emitter && start && format2) {
          emitter.emit("message-resolve", {
            type: "message-resolve",
            key,
            message: format2,
            time: end - start,
            groupId: `${type}:${key}`
          });
        }
        if (startTag && endTag && mark && measure) {
          mark(endTag);
          measure("intlify message resolve", startTag, endTag);
        }
      }
      if (isString(format2) || isFunction(format2))
        break;
      const missingRet = handleMissing(context, key, targetLocale, missingWarn, type);
      if (missingRet !== key) {
        format2 = missingRet;
      }
      from = to;
    }
    return [format2, targetLocale, message];
  }
  function compileMessageFormat(context, key, targetLocale, format2, cacheBaseKey, errorDetector) {
    const { messageCompiler, warnHtmlMessage } = context;
    if (isMessageFunction(format2)) {
      const msg2 = format2;
      msg2.locale = msg2.locale || targetLocale;
      msg2.key = msg2.key || key;
      return msg2;
    }
    let start = null;
    let startTag;
    let endTag;
    if (inBrowser) {
      start = window.performance.now();
      startTag = "intlify-message-compilation-start";
      endTag = "intlify-message-compilation-end";
      mark && mark(startTag);
    }
    const msg = messageCompiler(format2, getCompileOptions(context, targetLocale, cacheBaseKey, format2, warnHtmlMessage, errorDetector));
    if (inBrowser) {
      const end = window.performance.now();
      const emitter = context.__v_emitter;
      if (emitter && start) {
        emitter.emit("message-compilation", {
          type: "message-compilation",
          message: format2,
          time: end - start,
          groupId: `${"translate"}:${key}`
        });
      }
      if (startTag && endTag && mark && measure) {
        mark(endTag);
        measure("intlify message compilation", startTag, endTag);
      }
    }
    msg.locale = targetLocale;
    msg.key = key;
    msg.source = format2;
    return msg;
  }
  function evaluateMessage(context, msg, msgCtx) {
    let start = null;
    let startTag;
    let endTag;
    if (inBrowser) {
      start = window.performance.now();
      startTag = "intlify-message-evaluation-start";
      endTag = "intlify-message-evaluation-end";
      mark && mark(startTag);
    }
    const messaged = msg(msgCtx);
    if (inBrowser) {
      const end = window.performance.now();
      const emitter = context.__v_emitter;
      if (emitter && start) {
        emitter.emit("message-evaluation", {
          type: "message-evaluation",
          value: messaged,
          time: end - start,
          groupId: `${"translate"}:${msg.key}`
        });
      }
      if (startTag && endTag && mark && measure) {
        mark(endTag);
        measure("intlify message evaluation", startTag, endTag);
      }
    }
    return messaged;
  }
  function parseTranslateArgs(...args) {
    const [arg1, arg2, arg3] = args;
    const options = {};
    if (!isString(arg1) && !isNumber(arg1) && !isMessageFunction(arg1)) {
      throw createCoreError(14);
    }
    const key = isNumber(arg1) ? String(arg1) : isMessageFunction(arg1) ? arg1 : arg1;
    if (isNumber(arg2)) {
      options.plural = arg2;
    } else if (isString(arg2)) {
      options.default = arg2;
    } else if (isPlainObject(arg2) && !isEmptyObject(arg2)) {
      options.named = arg2;
    } else if (isArray(arg2)) {
      options.list = arg2;
    }
    if (isNumber(arg3)) {
      options.plural = arg3;
    } else if (isString(arg3)) {
      options.default = arg3;
    } else if (isPlainObject(arg3)) {
      assign(options, arg3);
    }
    return [key, options];
  }
  function getCompileOptions(context, locale, key, source, warnHtmlMessage, errorDetector) {
    return {
      warnHtmlMessage,
      onError: (err) => {
        errorDetector && errorDetector(err);
        {
          const message = `Message compilation error: ${err.message}`;
          const codeFrame = err.location && generateCodeFrame(source, err.location.start.offset, err.location.end.offset);
          const emitter = context.__v_emitter;
          if (emitter) {
            emitter.emit("compile-error", {
              message: source,
              error: err.message,
              start: err.location && err.location.start.offset,
              end: err.location && err.location.end.offset,
              groupId: `${"translate"}:${key}`
            });
          }
          console.error(codeFrame ? `${message}
${codeFrame}` : message);
        }
      },
      onCacheKey: (source2) => generateFormatCacheKey(locale, key, source2)
    };
  }
  function getMessageContextOptions(context, locale, message, options) {
    const { modifiers, pluralRules } = context;
    const resolveMessage = (key) => {
      const val = resolveValue(message, key);
      if (isString(val)) {
        let occurred = false;
        const errorDetector = () => {
          occurred = true;
        };
        const msg = compileMessageFormat(context, key, locale, val, key, errorDetector);
        return !occurred ? msg : NOOP_MESSAGE_FUNCTION;
      } else if (isMessageFunction(val)) {
        return val;
      } else {
        return NOOP_MESSAGE_FUNCTION;
      }
    };
    const ctxOptions = {
      locale,
      modifiers,
      pluralRules,
      messages: resolveMessage
    };
    if (context.processor) {
      ctxOptions.processor = context.processor;
    }
    if (options.list) {
      ctxOptions.list = options.list;
    }
    if (options.named) {
      ctxOptions.named = options.named;
    }
    if (isNumber(options.plural)) {
      ctxOptions.pluralIndex = options.plural;
    }
    return ctxOptions;
  }
  const intlDefined = typeof Intl !== "undefined";
  const Availabilities = {
    dateTimeFormat: intlDefined && typeof Intl.DateTimeFormat !== "undefined",
    numberFormat: intlDefined && typeof Intl.NumberFormat !== "undefined"
  };
  function datetime(context, ...args) {
    const { datetimeFormats, unresolving, fallbackLocale, onWarn } = context;
    const { __datetimeFormatters } = context;
    if (!Availabilities.dateTimeFormat) {
      onWarn(getWarnMessage$1(4));
      return MISSING_RESOLVE_VALUE;
    }
    const [key, value, options, overrides] = parseDateTimeArgs(...args);
    const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
    const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
    const part = !!options.part;
    const locale = isString(options.locale) ? options.locale : context.locale;
    const locales = getLocaleChain(context, fallbackLocale, locale);
    if (!isString(key) || key === "") {
      return new Intl.DateTimeFormat(locale).format(value);
    }
    let datetimeFormat = {};
    let targetLocale;
    let format2 = null;
    let from = locale;
    let to = null;
    const type = "datetime format";
    for (let i = 0; i < locales.length; i++) {
      targetLocale = to = locales[i];
      if (locale !== targetLocale && isTranslateFallbackWarn(fallbackWarn, key)) {
        onWarn(getWarnMessage$1(5, {
          key,
          target: targetLocale
        }));
      }
      if (locale !== targetLocale) {
        const emitter = context.__v_emitter;
        if (emitter) {
          emitter.emit("fallback", {
            type,
            key,
            from,
            to,
            groupId: `${type}:${key}`
          });
        }
      }
      datetimeFormat = datetimeFormats[targetLocale] || {};
      format2 = datetimeFormat[key];
      if (isPlainObject(format2))
        break;
      handleMissing(context, key, targetLocale, missingWarn, type);
      from = to;
    }
    if (!isPlainObject(format2) || !isString(targetLocale)) {
      return unresolving ? NOT_REOSLVED : key;
    }
    let id = `${targetLocale}__${key}`;
    if (!isEmptyObject(overrides)) {
      id = `${id}__${JSON.stringify(overrides)}`;
    }
    let formatter = __datetimeFormatters.get(id);
    if (!formatter) {
      formatter = new Intl.DateTimeFormat(targetLocale, assign({}, format2, overrides));
      __datetimeFormatters.set(id, formatter);
    }
    return !part ? formatter.format(value) : formatter.formatToParts(value);
  }
  function parseDateTimeArgs(...args) {
    const [arg1, arg2, arg3, arg4] = args;
    let options = {};
    let overrides = {};
    let value;
    if (isString(arg1)) {
      if (!/\d{4}-\d{2}-\d{2}(T.*)?/.test(arg1)) {
        throw createCoreError(16);
      }
      value = new Date(arg1);
      try {
        value.toISOString();
      } catch (e) {
        throw createCoreError(16);
      }
    } else if (isDate(arg1)) {
      if (isNaN(arg1.getTime())) {
        throw createCoreError(15);
      }
      value = arg1;
    } else if (isNumber(arg1)) {
      value = arg1;
    } else {
      throw createCoreError(14);
    }
    if (isString(arg2)) {
      options.key = arg2;
    } else if (isPlainObject(arg2)) {
      options = arg2;
    }
    if (isString(arg3)) {
      options.locale = arg3;
    } else if (isPlainObject(arg3)) {
      overrides = arg3;
    }
    if (isPlainObject(arg4)) {
      overrides = arg4;
    }
    return [options.key || "", value, options, overrides];
  }
  function clearDateTimeFormat(ctx, locale, format2) {
    const context = ctx;
    for (const key in format2) {
      const id = `${locale}__${key}`;
      if (!context.__datetimeFormatters.has(id)) {
        continue;
      }
      context.__datetimeFormatters.delete(id);
    }
  }
  function number(context, ...args) {
    const { numberFormats, unresolving, fallbackLocale, onWarn } = context;
    const { __numberFormatters } = context;
    if (!Availabilities.numberFormat) {
      onWarn(getWarnMessage$1(2));
      return MISSING_RESOLVE_VALUE;
    }
    const [key, value, options, overrides] = parseNumberArgs(...args);
    const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
    const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
    const part = !!options.part;
    const locale = isString(options.locale) ? options.locale : context.locale;
    const locales = getLocaleChain(context, fallbackLocale, locale);
    if (!isString(key) || key === "") {
      return new Intl.NumberFormat(locale).format(value);
    }
    let numberFormat = {};
    let targetLocale;
    let format2 = null;
    let from = locale;
    let to = null;
    const type = "number format";
    for (let i = 0; i < locales.length; i++) {
      targetLocale = to = locales[i];
      if (locale !== targetLocale && isTranslateFallbackWarn(fallbackWarn, key)) {
        onWarn(getWarnMessage$1(3, {
          key,
          target: targetLocale
        }));
      }
      if (locale !== targetLocale) {
        const emitter = context.__v_emitter;
        if (emitter) {
          emitter.emit("fallback", {
            type,
            key,
            from,
            to,
            groupId: `${type}:${key}`
          });
        }
      }
      numberFormat = numberFormats[targetLocale] || {};
      format2 = numberFormat[key];
      if (isPlainObject(format2))
        break;
      handleMissing(context, key, targetLocale, missingWarn, type);
      from = to;
    }
    if (!isPlainObject(format2) || !isString(targetLocale)) {
      return unresolving ? NOT_REOSLVED : key;
    }
    let id = `${targetLocale}__${key}`;
    if (!isEmptyObject(overrides)) {
      id = `${id}__${JSON.stringify(overrides)}`;
    }
    let formatter = __numberFormatters.get(id);
    if (!formatter) {
      formatter = new Intl.NumberFormat(targetLocale, assign({}, format2, overrides));
      __numberFormatters.set(id, formatter);
    }
    return !part ? formatter.format(value) : formatter.formatToParts(value);
  }
  function parseNumberArgs(...args) {
    const [arg1, arg2, arg3, arg4] = args;
    let options = {};
    let overrides = {};
    if (!isNumber(arg1)) {
      throw createCoreError(14);
    }
    const value = arg1;
    if (isString(arg2)) {
      options.key = arg2;
    } else if (isPlainObject(arg2)) {
      options = arg2;
    }
    if (isString(arg3)) {
      options.locale = arg3;
    } else if (isPlainObject(arg3)) {
      overrides = arg3;
    }
    if (isPlainObject(arg4)) {
      overrides = arg4;
    }
    return [options.key || "", value, options, overrides];
  }
  function clearNumberFormat(ctx, locale, format2) {
    const context = ctx;
    for (const key in format2) {
      const id = `${locale}__${key}`;
      if (!context.__numberFormatters.has(id)) {
        continue;
      }
      context.__numberFormatters.delete(id);
    }
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
      let currentSettings = __spreadValues({}, defaultSettings);
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
        }
      };
      hook.on(HOOK_PLUGIN_SETTINGS_SET, (pluginId, value) => {
        if (pluginId === this.plugin.id) {
          this.fallbacks.setSettings(value);
        }
      });
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
              return new Promise((resolve) => {
                this.targetQueue.push({
                  method: prop,
                  args,
                  resolve
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
    const target = getTarget();
    const hook = getDevtoolsGlobalHook();
    const enableProxy = isProxyAvailable && pluginDescriptor.enableEarlyProxy;
    if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
      hook.emit(HOOK_SETUP, pluginDescriptor, setupFn);
    } else {
      const proxy = enableProxy ? new ApiProxy(pluginDescriptor, hook) : null;
      const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
      list.push({
        pluginDescriptor,
        setupFn,
        proxy
      });
      if (proxy)
        setupFn(proxy.proxiedTarget);
    }
  }
  /*!
    * @intlify/vue-devtools v9.1.9
    * (c) 2021 kazuya kawaguchi
    * Released under the MIT License.
    */
  const VueDevToolsLabels = {
    ["vue-devtools-plugin-vue-i18n"]: "Vue I18n devtools",
    ["vue-i18n-resource-inspector"]: "I18n Resources",
    ["vue-i18n-timeline"]: "Vue I18n"
  };
  const VueDevToolsPlaceholders = {
    ["vue-i18n-resource-inspector"]: "Search for scopes ..."
  };
  const VueDevToolsTimelineColors = {
    ["vue-i18n-timeline"]: 16764185
  };
  /*!
    * vue-i18n v9.1.9
    * (c) 2022 kazuya kawaguchi
    * Released under the MIT License.
    */
  const VERSION = "9.1.9";
  function initFeatureFlags() {
    let needWarn = false;
    {
      needWarn = true;
    }
    if (needWarn) {
      console.warn(`You are running the esm-bundler build of vue-i18n. It is recommended to configure your bundler to explicitly replace feature flag globals with boolean literals to get proper tree-shaking in the final bundle.`);
    }
  }
  const warnMessages = {
    [6]: `Fall back to {type} '{key}' with root locale.`,
    [7]: `Not supported 'preserve'.`,
    [8]: `Not supported 'formatter'.`,
    [9]: `Not supported 'preserveDirectiveContent'.`,
    [10]: `Not supported 'getChoiceIndex'.`,
    [11]: `Component name legacy compatible: '{name}' -> 'i18n'`,
    [12]: `Not found parent scope. use the global scope.`
  };
  function getWarnMessage(code, ...args) {
    return format(warnMessages[code], ...args);
  }
  function createI18nError(code, ...args) {
    return createCompileError(code, null, { messages: errorMessages, args });
  }
  const errorMessages = {
    [14]: "Unexpected return type in composer",
    [15]: "Invalid argument",
    [16]: "Must be called at the top of a `setup` function",
    [17]: "Need to install with `app.use` function",
    [22]: "Unexpected error",
    [18]: "Not available in legacy mode",
    [19]: `Required in value: {0}`,
    [20]: `Invalid value`,
    [21]: `Cannot setup vue-devtools plugin`
  };
  const DEVTOOLS_META = "__INTLIFY_META__";
  const TransrateVNodeSymbol = makeSymbol("__transrateVNode");
  const DatetimePartsSymbol = makeSymbol("__datetimeParts");
  const NumberPartsSymbol = makeSymbol("__numberParts");
  const EnableEmitter = makeSymbol("__enableEmitter");
  const DisableEmitter = makeSymbol("__disableEmitter");
  const SetPluralRulesSymbol = makeSymbol("__setPluralRules");
  makeSymbol("__intlifyMeta");
  const InejctWithOption = makeSymbol("__injectWithOption");
  let composerID = 0;
  function defineCoreMissingHandler(missing) {
    return (ctx, locale, key, type) => {
      return missing(locale, key, vue.getCurrentInstance() || void 0, type);
    };
  }
  function getLocaleMessages(locale, options) {
    const { messages, __i18n } = options;
    const ret = isPlainObject(messages) ? messages : isArray(__i18n) ? {} : { [locale]: {} };
    if (isArray(__i18n)) {
      __i18n.forEach(({ locale: locale2, resource }) => {
        if (locale2) {
          ret[locale2] = ret[locale2] || {};
          deepCopy(resource, ret[locale2]);
        } else {
          deepCopy(resource, ret);
        }
      });
    }
    if (options.flatJson) {
      for (const key in ret) {
        if (hasOwn$1(ret, key)) {
          handleFlatJson(ret[key]);
        }
      }
    }
    return ret;
  }
  const isNotObjectOrIsArray = (val) => !isObject$1(val) || isArray(val);
  function deepCopy(src, des) {
    if (isNotObjectOrIsArray(src) || isNotObjectOrIsArray(des)) {
      throw createI18nError(20);
    }
    for (const key in src) {
      if (hasOwn$1(src, key)) {
        if (isNotObjectOrIsArray(src[key]) || isNotObjectOrIsArray(des[key])) {
          des[key] = src[key];
        } else {
          deepCopy(src[key], des[key]);
        }
      }
    }
  }
  const getMetaInfo = () => {
    const instance = vue.getCurrentInstance();
    return instance && instance.type[DEVTOOLS_META] ? { [DEVTOOLS_META]: instance.type[DEVTOOLS_META] } : null;
  };
  function createComposer(options = {}) {
    const { __root } = options;
    const _isGlobal = __root === void 0;
    let _inheritLocale = isBoolean(options.inheritLocale) ? options.inheritLocale : true;
    const _locale = vue.ref(__root && _inheritLocale ? __root.locale.value : isString(options.locale) ? options.locale : "en-US");
    const _fallbackLocale = vue.ref(__root && _inheritLocale ? __root.fallbackLocale.value : isString(options.fallbackLocale) || isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale.value);
    const _messages = vue.ref(getLocaleMessages(_locale.value, options));
    const _datetimeFormats = vue.ref(isPlainObject(options.datetimeFormats) ? options.datetimeFormats : { [_locale.value]: {} });
    const _numberFormats = vue.ref(isPlainObject(options.numberFormats) ? options.numberFormats : { [_locale.value]: {} });
    let _missingWarn = __root ? __root.missingWarn : isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
    let _fallbackWarn = __root ? __root.fallbackWarn : isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
    let _fallbackRoot = __root ? __root.fallbackRoot : isBoolean(options.fallbackRoot) ? options.fallbackRoot : true;
    let _fallbackFormat = !!options.fallbackFormat;
    let _missing = isFunction(options.missing) ? options.missing : null;
    let _runtimeMissing = isFunction(options.missing) ? defineCoreMissingHandler(options.missing) : null;
    let _postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
    let _warnHtmlMessage = isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
    let _escapeParameter = !!options.escapeParameter;
    const _modifiers = __root ? __root.modifiers : isPlainObject(options.modifiers) ? options.modifiers : {};
    let _pluralRules = options.pluralRules || __root && __root.pluralRules;
    let _context;
    function getCoreContext() {
      return createCoreContext({
        version: VERSION,
        locale: _locale.value,
        fallbackLocale: _fallbackLocale.value,
        messages: _messages.value,
        messageCompiler: function compileToFunction(source) {
          return (ctx) => {
            return ctx.normalize([source]);
          };
        },
        datetimeFormats: _datetimeFormats.value,
        numberFormats: _numberFormats.value,
        modifiers: _modifiers,
        pluralRules: _pluralRules,
        missing: _runtimeMissing === null ? void 0 : _runtimeMissing,
        missingWarn: _missingWarn,
        fallbackWarn: _fallbackWarn,
        fallbackFormat: _fallbackFormat,
        unresolving: true,
        postTranslation: _postTranslation === null ? void 0 : _postTranslation,
        warnHtmlMessage: _warnHtmlMessage,
        escapeParameter: _escapeParameter,
        __datetimeFormatters: isPlainObject(_context) ? _context.__datetimeFormatters : void 0,
        __numberFormatters: isPlainObject(_context) ? _context.__numberFormatters : void 0,
        __v_emitter: isPlainObject(_context) ? _context.__v_emitter : void 0,
        __meta: { framework: "vue" }
      });
    }
    _context = getCoreContext();
    updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
    function trackReactivityValues() {
      return [
        _locale.value,
        _fallbackLocale.value,
        _messages.value,
        _datetimeFormats.value,
        _numberFormats.value
      ];
    }
    const locale = vue.computed({
      get: () => _locale.value,
      set: (val) => {
        _locale.value = val;
        _context.locale = _locale.value;
      }
    });
    const fallbackLocale = vue.computed({
      get: () => _fallbackLocale.value,
      set: (val) => {
        _fallbackLocale.value = val;
        _context.fallbackLocale = _fallbackLocale.value;
        updateFallbackLocale(_context, _locale.value, val);
      }
    });
    const messages = vue.computed(() => _messages.value);
    const datetimeFormats = vue.computed(() => _datetimeFormats.value);
    const numberFormats = vue.computed(() => _numberFormats.value);
    function getPostTranslationHandler() {
      return isFunction(_postTranslation) ? _postTranslation : null;
    }
    function setPostTranslationHandler(handler) {
      _postTranslation = handler;
      _context.postTranslation = handler;
    }
    function getMissingHandler() {
      return _missing;
    }
    function setMissingHandler(handler) {
      if (handler !== null) {
        _runtimeMissing = defineCoreMissingHandler(handler);
      }
      _missing = handler;
      _context.missing = _runtimeMissing;
    }
    function isResolvedTranslateMessage(type, arg) {
      return type !== "translate" || !!arg.resolvedMessage === false;
    }
    function wrapWithDeps(fn, argumentParser, warnType, fallbackSuccess, fallbackFail, successCondition) {
      trackReactivityValues();
      let ret;
      {
        try {
          setAdditionalMeta(getMetaInfo());
          ret = fn(_context);
        } finally {
          setAdditionalMeta(null);
        }
      }
      if (isNumber(ret) && ret === NOT_REOSLVED) {
        const [key, arg2] = argumentParser();
        if (__root && isString(key) && isResolvedTranslateMessage(warnType, arg2)) {
          if (_fallbackRoot && (isTranslateFallbackWarn(_fallbackWarn, key) || isTranslateMissingWarn(_missingWarn, key))) {
            warn(getWarnMessage(6, {
              key,
              type: warnType
            }));
          }
          {
            const { __v_emitter: emitter } = _context;
            if (emitter && _fallbackRoot) {
              emitter.emit("fallback", {
                type: warnType,
                key,
                to: "global",
                groupId: `${warnType}:${key}`
              });
            }
          }
        }
        return __root && _fallbackRoot ? fallbackSuccess(__root) : fallbackFail(key);
      } else if (successCondition(ret)) {
        return ret;
      } else {
        throw createI18nError(14);
      }
    }
    function t(...args) {
      return wrapWithDeps((context) => translate(context, ...args), () => parseTranslateArgs(...args), "translate", (root) => root.t(...args), (key) => key, (val) => isString(val));
    }
    function rt(...args) {
      const [arg1, arg2, arg3] = args;
      if (arg3 && !isObject$1(arg3)) {
        throw createI18nError(15);
      }
      return t(...[arg1, arg2, assign({ resolvedMessage: true }, arg3 || {})]);
    }
    function d(...args) {
      return wrapWithDeps((context) => datetime(context, ...args), () => parseDateTimeArgs(...args), "datetime format", (root) => root.d(...args), () => MISSING_RESOLVE_VALUE, (val) => isString(val));
    }
    function n(...args) {
      return wrapWithDeps((context) => number(context, ...args), () => parseNumberArgs(...args), "number format", (root) => root.n(...args), () => MISSING_RESOLVE_VALUE, (val) => isString(val));
    }
    function normalize(values) {
      return values.map((val) => isString(val) ? vue.createVNode(vue.Text, null, val, 0) : val);
    }
    const interpolate = (val) => val;
    const processor = {
      normalize,
      interpolate,
      type: "vnode"
    };
    function transrateVNode(...args) {
      return wrapWithDeps((context) => {
        let ret;
        const _context2 = context;
        try {
          _context2.processor = processor;
          ret = translate(_context2, ...args);
        } finally {
          _context2.processor = null;
        }
        return ret;
      }, () => parseTranslateArgs(...args), "translate", (root) => root[TransrateVNodeSymbol](...args), (key) => [vue.createVNode(vue.Text, null, key, 0)], (val) => isArray(val));
    }
    function numberParts(...args) {
      return wrapWithDeps((context) => number(context, ...args), () => parseNumberArgs(...args), "number format", (root) => root[NumberPartsSymbol](...args), () => [], (val) => isString(val) || isArray(val));
    }
    function datetimeParts(...args) {
      return wrapWithDeps((context) => datetime(context, ...args), () => parseDateTimeArgs(...args), "datetime format", (root) => root[DatetimePartsSymbol](...args), () => [], (val) => isString(val) || isArray(val));
    }
    function setPluralRules(rules) {
      _pluralRules = rules;
      _context.pluralRules = _pluralRules;
    }
    function te(key, locale2) {
      const targetLocale = isString(locale2) ? locale2 : _locale.value;
      const message = getLocaleMessage(targetLocale);
      return resolveValue(message, key) !== null;
    }
    function resolveMessages(key) {
      let messages2 = null;
      const locales = getLocaleChain(_context, _fallbackLocale.value, _locale.value);
      for (let i = 0; i < locales.length; i++) {
        const targetLocaleMessages = _messages.value[locales[i]] || {};
        const messageValue = resolveValue(targetLocaleMessages, key);
        if (messageValue != null) {
          messages2 = messageValue;
          break;
        }
      }
      return messages2;
    }
    function tm(key) {
      const messages2 = resolveMessages(key);
      return messages2 != null ? messages2 : __root ? __root.tm(key) || {} : {};
    }
    function getLocaleMessage(locale2) {
      return _messages.value[locale2] || {};
    }
    function setLocaleMessage(locale2, message) {
      _messages.value[locale2] = message;
      _context.messages = _messages.value;
    }
    function mergeLocaleMessage(locale2, message) {
      _messages.value[locale2] = _messages.value[locale2] || {};
      deepCopy(message, _messages.value[locale2]);
      _context.messages = _messages.value;
    }
    function getDateTimeFormat(locale2) {
      return _datetimeFormats.value[locale2] || {};
    }
    function setDateTimeFormat(locale2, format2) {
      _datetimeFormats.value[locale2] = format2;
      _context.datetimeFormats = _datetimeFormats.value;
      clearDateTimeFormat(_context, locale2, format2);
    }
    function mergeDateTimeFormat(locale2, format2) {
      _datetimeFormats.value[locale2] = assign(_datetimeFormats.value[locale2] || {}, format2);
      _context.datetimeFormats = _datetimeFormats.value;
      clearDateTimeFormat(_context, locale2, format2);
    }
    function getNumberFormat(locale2) {
      return _numberFormats.value[locale2] || {};
    }
    function setNumberFormat(locale2, format2) {
      _numberFormats.value[locale2] = format2;
      _context.numberFormats = _numberFormats.value;
      clearNumberFormat(_context, locale2, format2);
    }
    function mergeNumberFormat(locale2, format2) {
      _numberFormats.value[locale2] = assign(_numberFormats.value[locale2] || {}, format2);
      _context.numberFormats = _numberFormats.value;
      clearNumberFormat(_context, locale2, format2);
    }
    composerID++;
    if (__root) {
      vue.watch(__root.locale, (val) => {
        if (_inheritLocale) {
          _locale.value = val;
          _context.locale = val;
          updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
        }
      });
      vue.watch(__root.fallbackLocale, (val) => {
        if (_inheritLocale) {
          _fallbackLocale.value = val;
          _context.fallbackLocale = val;
          updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
        }
      });
    }
    const composer = {
      id: composerID,
      locale,
      fallbackLocale,
      get inheritLocale() {
        return _inheritLocale;
      },
      set inheritLocale(val) {
        _inheritLocale = val;
        if (val && __root) {
          _locale.value = __root.locale.value;
          _fallbackLocale.value = __root.fallbackLocale.value;
          updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
        }
      },
      get availableLocales() {
        return Object.keys(_messages.value).sort();
      },
      messages,
      datetimeFormats,
      numberFormats,
      get modifiers() {
        return _modifiers;
      },
      get pluralRules() {
        return _pluralRules || {};
      },
      get isGlobal() {
        return _isGlobal;
      },
      get missingWarn() {
        return _missingWarn;
      },
      set missingWarn(val) {
        _missingWarn = val;
        _context.missingWarn = _missingWarn;
      },
      get fallbackWarn() {
        return _fallbackWarn;
      },
      set fallbackWarn(val) {
        _fallbackWarn = val;
        _context.fallbackWarn = _fallbackWarn;
      },
      get fallbackRoot() {
        return _fallbackRoot;
      },
      set fallbackRoot(val) {
        _fallbackRoot = val;
      },
      get fallbackFormat() {
        return _fallbackFormat;
      },
      set fallbackFormat(val) {
        _fallbackFormat = val;
        _context.fallbackFormat = _fallbackFormat;
      },
      get warnHtmlMessage() {
        return _warnHtmlMessage;
      },
      set warnHtmlMessage(val) {
        _warnHtmlMessage = val;
        _context.warnHtmlMessage = val;
      },
      get escapeParameter() {
        return _escapeParameter;
      },
      set escapeParameter(val) {
        _escapeParameter = val;
        _context.escapeParameter = val;
      },
      t,
      rt,
      d,
      n,
      te,
      tm,
      getLocaleMessage,
      setLocaleMessage,
      mergeLocaleMessage,
      getDateTimeFormat,
      setDateTimeFormat,
      mergeDateTimeFormat,
      getNumberFormat,
      setNumberFormat,
      mergeNumberFormat,
      getPostTranslationHandler,
      setPostTranslationHandler,
      getMissingHandler,
      setMissingHandler,
      [TransrateVNodeSymbol]: transrateVNode,
      [NumberPartsSymbol]: numberParts,
      [DatetimePartsSymbol]: datetimeParts,
      [SetPluralRulesSymbol]: setPluralRules,
      [InejctWithOption]: options.__injectWithOption
    };
    {
      composer[EnableEmitter] = (emitter) => {
        _context.__v_emitter = emitter;
      };
      composer[DisableEmitter] = () => {
        _context.__v_emitter = void 0;
      };
    }
    return composer;
  }
  function convertComposerOptions(options) {
    const locale = isString(options.locale) ? options.locale : "en-US";
    const fallbackLocale = isString(options.fallbackLocale) || isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : locale;
    const missing = isFunction(options.missing) ? options.missing : void 0;
    const missingWarn = isBoolean(options.silentTranslationWarn) || isRegExp(options.silentTranslationWarn) ? !options.silentTranslationWarn : true;
    const fallbackWarn = isBoolean(options.silentFallbackWarn) || isRegExp(options.silentFallbackWarn) ? !options.silentFallbackWarn : true;
    const fallbackRoot = isBoolean(options.fallbackRoot) ? options.fallbackRoot : true;
    const fallbackFormat = !!options.formatFallbackMessages;
    const modifiers = isPlainObject(options.modifiers) ? options.modifiers : {};
    const pluralizationRules = options.pluralizationRules;
    const postTranslation = isFunction(options.postTranslation) ? options.postTranslation : void 0;
    const warnHtmlMessage = isString(options.warnHtmlInMessage) ? options.warnHtmlInMessage !== "off" : true;
    const escapeParameter = !!options.escapeParameterHtml;
    const inheritLocale = isBoolean(options.sync) ? options.sync : true;
    if (options.formatter) {
      warn(getWarnMessage(8));
    }
    if (options.preserveDirectiveContent) {
      warn(getWarnMessage(9));
    }
    let messages = options.messages;
    if (isPlainObject(options.sharedMessages)) {
      const sharedMessages = options.sharedMessages;
      const locales = Object.keys(sharedMessages);
      messages = locales.reduce((messages2, locale2) => {
        const message = messages2[locale2] || (messages2[locale2] = {});
        assign(message, sharedMessages[locale2]);
        return messages2;
      }, messages || {});
    }
    const { __i18n, __root, __injectWithOption } = options;
    const datetimeFormats = options.datetimeFormats;
    const numberFormats = options.numberFormats;
    const flatJson = options.flatJson;
    return {
      locale,
      fallbackLocale,
      messages,
      flatJson,
      datetimeFormats,
      numberFormats,
      missing,
      missingWarn,
      fallbackWarn,
      fallbackRoot,
      fallbackFormat,
      modifiers,
      pluralRules: pluralizationRules,
      postTranslation,
      warnHtmlMessage,
      escapeParameter,
      inheritLocale,
      __i18n,
      __root,
      __injectWithOption
    };
  }
  function createVueI18n(options = {}) {
    const composer = createComposer(convertComposerOptions(options));
    const vueI18n = {
      id: composer.id,
      get locale() {
        return composer.locale.value;
      },
      set locale(val) {
        composer.locale.value = val;
      },
      get fallbackLocale() {
        return composer.fallbackLocale.value;
      },
      set fallbackLocale(val) {
        composer.fallbackLocale.value = val;
      },
      get messages() {
        return composer.messages.value;
      },
      get datetimeFormats() {
        return composer.datetimeFormats.value;
      },
      get numberFormats() {
        return composer.numberFormats.value;
      },
      get availableLocales() {
        return composer.availableLocales;
      },
      get formatter() {
        warn(getWarnMessage(8));
        return {
          interpolate() {
            return [];
          }
        };
      },
      set formatter(val) {
        warn(getWarnMessage(8));
      },
      get missing() {
        return composer.getMissingHandler();
      },
      set missing(handler) {
        composer.setMissingHandler(handler);
      },
      get silentTranslationWarn() {
        return isBoolean(composer.missingWarn) ? !composer.missingWarn : composer.missingWarn;
      },
      set silentTranslationWarn(val) {
        composer.missingWarn = isBoolean(val) ? !val : val;
      },
      get silentFallbackWarn() {
        return isBoolean(composer.fallbackWarn) ? !composer.fallbackWarn : composer.fallbackWarn;
      },
      set silentFallbackWarn(val) {
        composer.fallbackWarn = isBoolean(val) ? !val : val;
      },
      get modifiers() {
        return composer.modifiers;
      },
      get formatFallbackMessages() {
        return composer.fallbackFormat;
      },
      set formatFallbackMessages(val) {
        composer.fallbackFormat = val;
      },
      get postTranslation() {
        return composer.getPostTranslationHandler();
      },
      set postTranslation(handler) {
        composer.setPostTranslationHandler(handler);
      },
      get sync() {
        return composer.inheritLocale;
      },
      set sync(val) {
        composer.inheritLocale = val;
      },
      get warnHtmlInMessage() {
        return composer.warnHtmlMessage ? "warn" : "off";
      },
      set warnHtmlInMessage(val) {
        composer.warnHtmlMessage = val !== "off";
      },
      get escapeParameterHtml() {
        return composer.escapeParameter;
      },
      set escapeParameterHtml(val) {
        composer.escapeParameter = val;
      },
      get preserveDirectiveContent() {
        warn(getWarnMessage(9));
        return true;
      },
      set preserveDirectiveContent(val) {
        warn(getWarnMessage(9));
      },
      get pluralizationRules() {
        return composer.pluralRules || {};
      },
      __composer: composer,
      t(...args) {
        const [arg1, arg2, arg3] = args;
        const options2 = {};
        let list = null;
        let named = null;
        if (!isString(arg1)) {
          throw createI18nError(15);
        }
        const key = arg1;
        if (isString(arg2)) {
          options2.locale = arg2;
        } else if (isArray(arg2)) {
          list = arg2;
        } else if (isPlainObject(arg2)) {
          named = arg2;
        }
        if (isArray(arg3)) {
          list = arg3;
        } else if (isPlainObject(arg3)) {
          named = arg3;
        }
        return composer.t(key, list || named || {}, options2);
      },
      rt(...args) {
        return composer.rt(...args);
      },
      tc(...args) {
        const [arg1, arg2, arg3] = args;
        const options2 = { plural: 1 };
        let list = null;
        let named = null;
        if (!isString(arg1)) {
          throw createI18nError(15);
        }
        const key = arg1;
        if (isString(arg2)) {
          options2.locale = arg2;
        } else if (isNumber(arg2)) {
          options2.plural = arg2;
        } else if (isArray(arg2)) {
          list = arg2;
        } else if (isPlainObject(arg2)) {
          named = arg2;
        }
        if (isString(arg3)) {
          options2.locale = arg3;
        } else if (isArray(arg3)) {
          list = arg3;
        } else if (isPlainObject(arg3)) {
          named = arg3;
        }
        return composer.t(key, list || named || {}, options2);
      },
      te(key, locale) {
        return composer.te(key, locale);
      },
      tm(key) {
        return composer.tm(key);
      },
      getLocaleMessage(locale) {
        return composer.getLocaleMessage(locale);
      },
      setLocaleMessage(locale, message) {
        composer.setLocaleMessage(locale, message);
      },
      mergeLocaleMessage(locale, message) {
        composer.mergeLocaleMessage(locale, message);
      },
      d(...args) {
        return composer.d(...args);
      },
      getDateTimeFormat(locale) {
        return composer.getDateTimeFormat(locale);
      },
      setDateTimeFormat(locale, format2) {
        composer.setDateTimeFormat(locale, format2);
      },
      mergeDateTimeFormat(locale, format2) {
        composer.mergeDateTimeFormat(locale, format2);
      },
      n(...args) {
        return composer.n(...args);
      },
      getNumberFormat(locale) {
        return composer.getNumberFormat(locale);
      },
      setNumberFormat(locale, format2) {
        composer.setNumberFormat(locale, format2);
      },
      mergeNumberFormat(locale, format2) {
        composer.mergeNumberFormat(locale, format2);
      },
      getChoiceIndex(choice, choicesLength) {
        warn(getWarnMessage(10));
        return -1;
      },
      __onComponentInstanceCreated(target) {
        const { componentInstanceCreatedListener } = options;
        if (componentInstanceCreatedListener) {
          componentInstanceCreatedListener(target, vueI18n);
        }
      }
    };
    {
      vueI18n.__enableEmitter = (emitter) => {
        const __composer = composer;
        __composer[EnableEmitter] && __composer[EnableEmitter](emitter);
      };
      vueI18n.__disableEmitter = () => {
        const __composer = composer;
        __composer[DisableEmitter] && __composer[DisableEmitter]();
      };
    }
    return vueI18n;
  }
  const baseFormatProps = {
    tag: {
      type: [String, Object]
    },
    locale: {
      type: String
    },
    scope: {
      type: String,
      validator: (val) => val === "parent" || val === "global",
      default: "parent"
    },
    i18n: {
      type: Object
    }
  };
  const Translation = {
    name: "i18n-t",
    props: assign({
      keypath: {
        type: String,
        required: true
      },
      plural: {
        type: [Number, String],
        validator: (val) => isNumber(val) || !isNaN(val)
      }
    }, baseFormatProps),
    setup(props, context) {
      const { slots, attrs } = context;
      const i18n = props.i18n || useI18n({
        useScope: props.scope,
        __useComponent: true
      });
      const keys = Object.keys(slots).filter((key) => key !== "_");
      return () => {
        const options = {};
        if (props.locale) {
          options.locale = props.locale;
        }
        if (props.plural !== void 0) {
          options.plural = isString(props.plural) ? +props.plural : props.plural;
        }
        const arg = getInterpolateArg(context, keys);
        const children = i18n[TransrateVNodeSymbol](props.keypath, arg, options);
        const assignedAttrs = assign({}, attrs);
        return isString(props.tag) ? vue.h(props.tag, assignedAttrs, children) : isObject$1(props.tag) ? vue.h(props.tag, assignedAttrs, children) : vue.h(vue.Fragment, assignedAttrs, children);
      };
    }
  };
  function getInterpolateArg({ slots }, keys) {
    if (keys.length === 1 && keys[0] === "default") {
      return slots.default ? slots.default() : [];
    } else {
      return keys.reduce((arg, key) => {
        const slot = slots[key];
        if (slot) {
          arg[key] = slot();
        }
        return arg;
      }, {});
    }
  }
  function renderFormatter(props, context, slotKeys, partFormatter) {
    const { slots, attrs } = context;
    return () => {
      const options = { part: true };
      let overrides = {};
      if (props.locale) {
        options.locale = props.locale;
      }
      if (isString(props.format)) {
        options.key = props.format;
      } else if (isObject$1(props.format)) {
        if (isString(props.format.key)) {
          options.key = props.format.key;
        }
        overrides = Object.keys(props.format).reduce((options2, prop) => {
          return slotKeys.includes(prop) ? assign({}, options2, { [prop]: props.format[prop] }) : options2;
        }, {});
      }
      const parts = partFormatter(...[props.value, options, overrides]);
      let children = [options.key];
      if (isArray(parts)) {
        children = parts.map((part, index) => {
          const slot = slots[part.type];
          return slot ? slot({ [part.type]: part.value, index, parts }) : [part.value];
        });
      } else if (isString(parts)) {
        children = [parts];
      }
      const assignedAttrs = assign({}, attrs);
      return isString(props.tag) ? vue.h(props.tag, assignedAttrs, children) : isObject$1(props.tag) ? vue.h(props.tag, assignedAttrs, children) : vue.h(vue.Fragment, assignedAttrs, children);
    };
  }
  const NUMBER_FORMAT_KEYS = [
    "localeMatcher",
    "style",
    "unit",
    "unitDisplay",
    "currency",
    "currencyDisplay",
    "useGrouping",
    "numberingSystem",
    "minimumIntegerDigits",
    "minimumFractionDigits",
    "maximumFractionDigits",
    "minimumSignificantDigits",
    "maximumSignificantDigits",
    "notation",
    "formatMatcher"
  ];
  const NumberFormat = {
    name: "i18n-n",
    props: assign({
      value: {
        type: Number,
        required: true
      },
      format: {
        type: [String, Object]
      }
    }, baseFormatProps),
    setup(props, context) {
      const i18n = props.i18n || useI18n({ useScope: "parent", __useComponent: true });
      return renderFormatter(props, context, NUMBER_FORMAT_KEYS, (...args) => i18n[NumberPartsSymbol](...args));
    }
  };
  const DATETIME_FORMAT_KEYS = [
    "dateStyle",
    "timeStyle",
    "fractionalSecondDigits",
    "calendar",
    "dayPeriod",
    "numberingSystem",
    "localeMatcher",
    "timeZone",
    "hour12",
    "hourCycle",
    "formatMatcher",
    "weekday",
    "era",
    "year",
    "month",
    "day",
    "hour",
    "minute",
    "second",
    "timeZoneName"
  ];
  const DatetimeFormat = {
    name: "i18n-d",
    props: assign({
      value: {
        type: [Number, Date],
        required: true
      },
      format: {
        type: [String, Object]
      }
    }, baseFormatProps),
    setup(props, context) {
      const i18n = props.i18n || useI18n({ useScope: "parent", __useComponent: true });
      return renderFormatter(props, context, DATETIME_FORMAT_KEYS, (...args) => i18n[DatetimePartsSymbol](...args));
    }
  };
  function getComposer$2(i18n, instance) {
    const i18nInternal = i18n;
    if (i18n.mode === "composition") {
      return i18nInternal.__getInstance(instance) || i18n.global;
    } else {
      const vueI18n = i18nInternal.__getInstance(instance);
      return vueI18n != null ? vueI18n.__composer : i18n.global.__composer;
    }
  }
  function vTDirective(i18n) {
    const bind = (el, { instance, value, modifiers }) => {
      if (!instance || !instance.$) {
        throw createI18nError(22);
      }
      const composer = getComposer$2(i18n, instance.$);
      if (modifiers.preserve) {
        warn(getWarnMessage(7));
      }
      const parsedValue = parseValue(value);
      el.textContent = composer.t(...makeParams(parsedValue));
    };
    return {
      beforeMount: bind,
      beforeUpdate: bind
    };
  }
  function parseValue(value) {
    if (isString(value)) {
      return { path: value };
    } else if (isPlainObject(value)) {
      if (!("path" in value)) {
        throw createI18nError(19, "path");
      }
      return value;
    } else {
      throw createI18nError(20);
    }
  }
  function makeParams(value) {
    const { path, locale, args, choice, plural } = value;
    const options = {};
    const named = args || {};
    if (isString(locale)) {
      options.locale = locale;
    }
    if (isNumber(choice)) {
      options.plural = choice;
    }
    if (isNumber(plural)) {
      options.plural = plural;
    }
    return [path, named, options];
  }
  function apply(app2, i18n, ...options) {
    const pluginOptions = isPlainObject(options[0]) ? options[0] : {};
    const useI18nComponentName = !!pluginOptions.useI18nComponentName;
    const globalInstall = isBoolean(pluginOptions.globalInstall) ? pluginOptions.globalInstall : true;
    if (globalInstall && useI18nComponentName) {
      warn(getWarnMessage(11, {
        name: Translation.name
      }));
    }
    if (globalInstall) {
      app2.component(!useI18nComponentName ? Translation.name : "i18n", Translation);
      app2.component(NumberFormat.name, NumberFormat);
      app2.component(DatetimeFormat.name, DatetimeFormat);
    }
    app2.directive("t", vTDirective(i18n));
  }
  const VUE_I18N_COMPONENT_TYPES = "vue-i18n: composer properties";
  let devtoolsApi;
  async function enableDevTools(app2, i18n) {
    return new Promise((resolve, reject) => {
      try {
        setupDevtoolsPlugin({
          id: "vue-devtools-plugin-vue-i18n",
          label: VueDevToolsLabels["vue-devtools-plugin-vue-i18n"],
          packageName: "vue-i18n",
          homepage: "https://vue-i18n.intlify.dev",
          logo: "https://vue-i18n.intlify.dev/vue-i18n-devtools-logo.png",
          componentStateTypes: [VUE_I18N_COMPONENT_TYPES],
          app: app2
        }, (api) => {
          devtoolsApi = api;
          api.on.visitComponentTree(({ componentInstance, treeNode }) => {
            updateComponentTreeTags(componentInstance, treeNode, i18n);
          });
          api.on.inspectComponent(({ componentInstance, instanceData }) => {
            if (componentInstance.vnode.el.__VUE_I18N__ && instanceData) {
              if (i18n.mode === "legacy") {
                if (componentInstance.vnode.el.__VUE_I18N__ !== i18n.global.__composer) {
                  inspectComposer(instanceData, componentInstance.vnode.el.__VUE_I18N__);
                }
              } else {
                inspectComposer(instanceData, componentInstance.vnode.el.__VUE_I18N__);
              }
            }
          });
          api.addInspector({
            id: "vue-i18n-resource-inspector",
            label: VueDevToolsLabels["vue-i18n-resource-inspector"],
            icon: "language",
            treeFilterPlaceholder: VueDevToolsPlaceholders["vue-i18n-resource-inspector"]
          });
          api.on.getInspectorTree((payload) => {
            if (payload.app === app2 && payload.inspectorId === "vue-i18n-resource-inspector") {
              registerScope(payload, i18n);
            }
          });
          api.on.getInspectorState((payload) => {
            if (payload.app === app2 && payload.inspectorId === "vue-i18n-resource-inspector") {
              inspectScope(payload, i18n);
            }
          });
          api.on.editInspectorState((payload) => {
            if (payload.app === app2 && payload.inspectorId === "vue-i18n-resource-inspector") {
              editScope(payload, i18n);
            }
          });
          api.addTimelineLayer({
            id: "vue-i18n-timeline",
            label: VueDevToolsLabels["vue-i18n-timeline"],
            color: VueDevToolsTimelineColors["vue-i18n-timeline"]
          });
          resolve(true);
        });
      } catch (e) {
        console.error(e);
        reject(false);
      }
    });
  }
  function updateComponentTreeTags(instance, treeNode, i18n) {
    const global2 = i18n.mode === "composition" ? i18n.global : i18n.global.__composer;
    if (instance && instance.vnode.el.__VUE_I18N__) {
      if (instance.vnode.el.__VUE_I18N__ !== global2) {
        const label = instance.type.name || instance.type.displayName || instance.type.__file;
        const tag = {
          label: `i18n (${label} Scope)`,
          textColor: 0,
          backgroundColor: 16764185
        };
        treeNode.tags.push(tag);
      }
    }
  }
  function inspectComposer(instanceData, composer) {
    const type = VUE_I18N_COMPONENT_TYPES;
    instanceData.state.push({
      type,
      key: "locale",
      editable: true,
      value: composer.locale.value
    });
    instanceData.state.push({
      type,
      key: "availableLocales",
      editable: false,
      value: composer.availableLocales
    });
    instanceData.state.push({
      type,
      key: "fallbackLocale",
      editable: true,
      value: composer.fallbackLocale.value
    });
    instanceData.state.push({
      type,
      key: "inheritLocale",
      editable: true,
      value: composer.inheritLocale
    });
    instanceData.state.push({
      type,
      key: "messages",
      editable: false,
      value: getLocaleMessageValue(composer.messages.value)
    });
    instanceData.state.push({
      type,
      key: "datetimeFormats",
      editable: false,
      value: composer.datetimeFormats.value
    });
    instanceData.state.push({
      type,
      key: "numberFormats",
      editable: false,
      value: composer.numberFormats.value
    });
  }
  function getLocaleMessageValue(messages) {
    const value = {};
    Object.keys(messages).forEach((key) => {
      const v = messages[key];
      if (isFunction(v) && "source" in v) {
        value[key] = getMessageFunctionDetails(v);
      } else if (isObject$1(v)) {
        value[key] = getLocaleMessageValue(v);
      } else {
        value[key] = v;
      }
    });
    return value;
  }
  const ESC = {
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "&": "&amp;"
  };
  function escape(s) {
    return s.replace(/[<>"&]/g, escapeChar);
  }
  function escapeChar(a) {
    return ESC[a] || a;
  }
  function getMessageFunctionDetails(func) {
    const argString = func.source ? `("${escape(func.source)}")` : `(?)`;
    return {
      _custom: {
        type: "function",
        display: `<span>\u0192</span> ${argString}`
      }
    };
  }
  function registerScope(payload, i18n) {
    payload.rootNodes.push({
      id: "global",
      label: "Global Scope"
    });
    const global2 = i18n.mode === "composition" ? i18n.global : i18n.global.__composer;
    for (const [keyInstance, instance] of i18n.__instances) {
      const composer = i18n.mode === "composition" ? instance : instance.__composer;
      if (global2 === composer) {
        continue;
      }
      const label = keyInstance.type.name || keyInstance.type.displayName || keyInstance.type.__file;
      payload.rootNodes.push({
        id: composer.id.toString(),
        label: `${label} Scope`
      });
    }
  }
  function getComposer$1(nodeId, i18n) {
    if (nodeId === "global") {
      return i18n.mode === "composition" ? i18n.global : i18n.global.__composer;
    } else {
      const instance = Array.from(i18n.__instances.values()).find((item) => item.id.toString() === nodeId);
      if (instance) {
        return i18n.mode === "composition" ? instance : instance.__composer;
      } else {
        return null;
      }
    }
  }
  function inspectScope(payload, i18n) {
    const composer = getComposer$1(payload.nodeId, i18n);
    if (composer) {
      payload.state = makeScopeInspectState(composer);
    }
  }
  function makeScopeInspectState(composer) {
    const state = {};
    const localeType = "Locale related info";
    const localeStates = [
      {
        type: localeType,
        key: "locale",
        editable: true,
        value: composer.locale.value
      },
      {
        type: localeType,
        key: "fallbackLocale",
        editable: true,
        value: composer.fallbackLocale.value
      },
      {
        type: localeType,
        key: "availableLocales",
        editable: false,
        value: composer.availableLocales
      },
      {
        type: localeType,
        key: "inheritLocale",
        editable: true,
        value: composer.inheritLocale
      }
    ];
    state[localeType] = localeStates;
    const localeMessagesType = "Locale messages info";
    const localeMessagesStates = [
      {
        type: localeMessagesType,
        key: "messages",
        editable: false,
        value: getLocaleMessageValue(composer.messages.value)
      }
    ];
    state[localeMessagesType] = localeMessagesStates;
    const datetimeFormatsType = "Datetime formats info";
    const datetimeFormatsStates = [
      {
        type: datetimeFormatsType,
        key: "datetimeFormats",
        editable: false,
        value: composer.datetimeFormats.value
      }
    ];
    state[datetimeFormatsType] = datetimeFormatsStates;
    const numberFormatsType = "Datetime formats info";
    const numberFormatsStates = [
      {
        type: numberFormatsType,
        key: "numberFormats",
        editable: false,
        value: composer.numberFormats.value
      }
    ];
    state[numberFormatsType] = numberFormatsStates;
    return state;
  }
  function addTimelineEvent(event, payload) {
    if (devtoolsApi) {
      let groupId;
      if (payload && "groupId" in payload) {
        groupId = payload.groupId;
        delete payload.groupId;
      }
      devtoolsApi.addTimelineEvent({
        layerId: "vue-i18n-timeline",
        event: {
          title: event,
          groupId,
          time: Date.now(),
          meta: {},
          data: payload || {},
          logType: event === "compile-error" ? "error" : event === "fallback" || event === "missing" ? "warning" : "default"
        }
      });
    }
  }
  function editScope(payload, i18n) {
    const composer = getComposer$1(payload.nodeId, i18n);
    if (composer) {
      const [field] = payload.path;
      if (field === "locale" && isString(payload.state.value)) {
        composer.locale.value = payload.state.value;
      } else if (field === "fallbackLocale" && (isString(payload.state.value) || isArray(payload.state.value) || isObject$1(payload.state.value))) {
        composer.fallbackLocale.value = payload.state.value;
      } else if (field === "inheritLocale" && isBoolean(payload.state.value)) {
        composer.inheritLocale = payload.state.value;
      }
    }
  }
  function defineMixin(vuei18n, composer, i18n) {
    return {
      beforeCreate() {
        const instance = vue.getCurrentInstance();
        if (!instance) {
          throw createI18nError(22);
        }
        const options = this.$options;
        if (options.i18n) {
          const optionsI18n = options.i18n;
          if (options.__i18n) {
            optionsI18n.__i18n = options.__i18n;
          }
          optionsI18n.__root = composer;
          if (this === this.$root) {
            this.$i18n = mergeToRoot(vuei18n, optionsI18n);
          } else {
            optionsI18n.__injectWithOption = true;
            this.$i18n = createVueI18n(optionsI18n);
          }
        } else if (options.__i18n) {
          if (this === this.$root) {
            this.$i18n = mergeToRoot(vuei18n, options);
          } else {
            this.$i18n = createVueI18n({
              __i18n: options.__i18n,
              __injectWithOption: true,
              __root: composer
            });
          }
        } else {
          this.$i18n = vuei18n;
        }
        vuei18n.__onComponentInstanceCreated(this.$i18n);
        i18n.__setInstance(instance, this.$i18n);
        this.$t = (...args) => this.$i18n.t(...args);
        this.$rt = (...args) => this.$i18n.rt(...args);
        this.$tc = (...args) => this.$i18n.tc(...args);
        this.$te = (key, locale) => this.$i18n.te(key, locale);
        this.$d = (...args) => this.$i18n.d(...args);
        this.$n = (...args) => this.$i18n.n(...args);
        this.$tm = (key) => this.$i18n.tm(key);
      },
      mounted() {
        {
          this.$el.__VUE_I18N__ = this.$i18n.__composer;
          const emitter = this.__v_emitter = createEmitter();
          const _vueI18n = this.$i18n;
          _vueI18n.__enableEmitter && _vueI18n.__enableEmitter(emitter);
          emitter.on("*", addTimelineEvent);
        }
      },
      beforeUnmount() {
        const instance = vue.getCurrentInstance();
        if (!instance) {
          throw createI18nError(22);
        }
        {
          if (this.__v_emitter) {
            this.__v_emitter.off("*", addTimelineEvent);
            delete this.__v_emitter;
          }
          const _vueI18n = this.$i18n;
          _vueI18n.__disableEmitter && _vueI18n.__disableEmitter();
          delete this.$el.__VUE_I18N__;
        }
        delete this.$t;
        delete this.$rt;
        delete this.$tc;
        delete this.$te;
        delete this.$d;
        delete this.$n;
        delete this.$tm;
        i18n.__deleteInstance(instance);
        delete this.$i18n;
      }
    };
  }
  function mergeToRoot(root, options) {
    root.locale = options.locale || root.locale;
    root.fallbackLocale = options.fallbackLocale || root.fallbackLocale;
    root.missing = options.missing || root.missing;
    root.silentTranslationWarn = options.silentTranslationWarn || root.silentFallbackWarn;
    root.silentFallbackWarn = options.silentFallbackWarn || root.silentFallbackWarn;
    root.formatFallbackMessages = options.formatFallbackMessages || root.formatFallbackMessages;
    root.postTranslation = options.postTranslation || root.postTranslation;
    root.warnHtmlInMessage = options.warnHtmlInMessage || root.warnHtmlInMessage;
    root.escapeParameterHtml = options.escapeParameterHtml || root.escapeParameterHtml;
    root.sync = options.sync || root.sync;
    root.__composer[SetPluralRulesSymbol](options.pluralizationRules || root.pluralizationRules);
    const messages = getLocaleMessages(root.locale, {
      messages: options.messages,
      __i18n: options.__i18n
    });
    Object.keys(messages).forEach((locale) => root.mergeLocaleMessage(locale, messages[locale]));
    if (options.datetimeFormats) {
      Object.keys(options.datetimeFormats).forEach((locale) => root.mergeDateTimeFormat(locale, options.datetimeFormats[locale]));
    }
    if (options.numberFormats) {
      Object.keys(options.numberFormats).forEach((locale) => root.mergeNumberFormat(locale, options.numberFormats[locale]));
    }
    return root;
  }
  function createI18n(options = {}) {
    const __legacyMode = isBoolean(options.legacy) ? options.legacy : true;
    const __globalInjection = !!options.globalInjection;
    const __instances = /* @__PURE__ */ new Map();
    const __global = __legacyMode ? createVueI18n(options) : createComposer(options);
    const symbol = makeSymbol("vue-i18n");
    const i18n = {
      get mode() {
        return __legacyMode ? "legacy" : "composition";
      },
      async install(app2, ...options2) {
        {
          app2.__VUE_I18N__ = i18n;
        }
        app2.__VUE_I18N_SYMBOL__ = symbol;
        app2.provide(app2.__VUE_I18N_SYMBOL__, i18n);
        if (!__legacyMode && __globalInjection) {
          injectGlobalFields(app2, i18n.global);
        }
        {
          apply(app2, i18n, ...options2);
        }
        if (__legacyMode) {
          app2.mixin(defineMixin(__global, __global.__composer, i18n));
        }
        {
          const ret = await enableDevTools(app2, i18n);
          if (!ret) {
            throw createI18nError(21);
          }
          const emitter = createEmitter();
          if (__legacyMode) {
            const _vueI18n = __global;
            _vueI18n.__enableEmitter && _vueI18n.__enableEmitter(emitter);
          } else {
            const _composer = __global;
            _composer[EnableEmitter] && _composer[EnableEmitter](emitter);
          }
          emitter.on("*", addTimelineEvent);
        }
      },
      get global() {
        return __global;
      },
      __instances,
      __getInstance(component) {
        return __instances.get(component) || null;
      },
      __setInstance(component, instance) {
        __instances.set(component, instance);
      },
      __deleteInstance(component) {
        __instances.delete(component);
      }
    };
    return i18n;
  }
  function useI18n(options = {}) {
    const instance = vue.getCurrentInstance();
    if (instance == null) {
      throw createI18nError(16);
    }
    if (!instance.appContext.app.__VUE_I18N_SYMBOL__) {
      throw createI18nError(17);
    }
    const i18n = vue.inject(instance.appContext.app.__VUE_I18N_SYMBOL__);
    if (!i18n) {
      throw createI18nError(22);
    }
    const global2 = i18n.mode === "composition" ? i18n.global : i18n.global.__composer;
    const scope = isEmptyObject(options) ? "__i18n" in instance.type ? "local" : "global" : !options.useScope ? "local" : options.useScope;
    if (scope === "global") {
      let messages = isObject$1(options.messages) ? options.messages : {};
      if ("__i18nGlobal" in instance.type) {
        messages = getLocaleMessages(global2.locale.value, {
          messages,
          __i18n: instance.type.__i18nGlobal
        });
      }
      const locales = Object.keys(messages);
      if (locales.length) {
        locales.forEach((locale) => {
          global2.mergeLocaleMessage(locale, messages[locale]);
        });
      }
      if (isObject$1(options.datetimeFormats)) {
        const locales2 = Object.keys(options.datetimeFormats);
        if (locales2.length) {
          locales2.forEach((locale) => {
            global2.mergeDateTimeFormat(locale, options.datetimeFormats[locale]);
          });
        }
      }
      if (isObject$1(options.numberFormats)) {
        const locales2 = Object.keys(options.numberFormats);
        if (locales2.length) {
          locales2.forEach((locale) => {
            global2.mergeNumberFormat(locale, options.numberFormats[locale]);
          });
        }
      }
      return global2;
    }
    if (scope === "parent") {
      let composer2 = getComposer(i18n, instance, options.__useComponent);
      if (composer2 == null) {
        {
          warn(getWarnMessage(12));
        }
        composer2 = global2;
      }
      return composer2;
    }
    if (i18n.mode === "legacy") {
      throw createI18nError(18);
    }
    const i18nInternal = i18n;
    let composer = i18nInternal.__getInstance(instance);
    if (composer == null) {
      const type = instance.type;
      const composerOptions = assign({}, options);
      if (type.__i18n) {
        composerOptions.__i18n = type.__i18n;
      }
      if (global2) {
        composerOptions.__root = global2;
      }
      composer = createComposer(composerOptions);
      setupLifeCycle(i18nInternal, instance, composer);
      i18nInternal.__setInstance(instance, composer);
    }
    return composer;
  }
  function getComposer(i18n, target, useComponent = false) {
    let composer = null;
    const root = target.root;
    let current = target.parent;
    while (current != null) {
      const i18nInternal = i18n;
      if (i18n.mode === "composition") {
        composer = i18nInternal.__getInstance(current);
      } else {
        const vueI18n = i18nInternal.__getInstance(current);
        if (vueI18n != null) {
          composer = vueI18n.__composer;
        }
        if (useComponent && composer && !composer[InejctWithOption]) {
          composer = null;
        }
      }
      if (composer != null) {
        break;
      }
      if (root === current) {
        break;
      }
      current = current.parent;
    }
    return composer;
  }
  function setupLifeCycle(i18n, target, composer) {
    let emitter = null;
    vue.onMounted(() => {
      if (target.vnode.el) {
        target.vnode.el.__VUE_I18N__ = composer;
        emitter = createEmitter();
        const _composer = composer;
        _composer[EnableEmitter] && _composer[EnableEmitter](emitter);
        emitter.on("*", addTimelineEvent);
      }
    }, target);
    vue.onUnmounted(() => {
      if (target.vnode.el && target.vnode.el.__VUE_I18N__) {
        emitter && emitter.off("*", addTimelineEvent);
        const _composer = composer;
        _composer[DisableEmitter] && _composer[DisableEmitter]();
        delete target.vnode.el.__VUE_I18N__;
      }
      i18n.__deleteInstance(target);
    }, target);
  }
  const globalExportProps = [
    "locale",
    "fallbackLocale",
    "availableLocales"
  ];
  const globalExportMethods = ["t", "rt", "d", "n", "tm"];
  function injectGlobalFields(app2, composer) {
    const i18n = /* @__PURE__ */ Object.create(null);
    globalExportProps.forEach((prop) => {
      const desc = Object.getOwnPropertyDescriptor(composer, prop);
      if (!desc) {
        throw createI18nError(22);
      }
      const wrap = vue.isRef(desc.value) ? {
        get() {
          return desc.value.value;
        },
        set(val) {
          desc.value.value = val;
        }
      } : {
        get() {
          return desc.get && desc.get();
        }
      };
      Object.defineProperty(i18n, prop, wrap);
    });
    app2.config.globalProperties.$i18n = i18n;
    globalExportMethods.forEach((method) => {
      const desc = Object.getOwnPropertyDescriptor(composer, method);
      if (!desc || !desc.value) {
        throw createI18nError(22);
      }
      Object.defineProperty(app2.config.globalProperties, `$${method}`, desc);
    });
  }
  {
    initFeatureFlags();
  }
  {
    const target = getGlobalThis();
    target.__INTLIFY__ = true;
    setDevToolsHook(target.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
  }
  const language = function(key) {
    const messages = {
      en,
      "zh-Hans": zhHans
    };
    let i18nConfig = {
      locale: uni.getLocale(),
      messages
    };
    const i18n = createI18n(i18nConfig);
    return i18n.global.t(key);
  };
  const languageByGlobal = function() {
    const messages = {
      en,
      "zh-Hans": zhHans
    };
    let i18nConfig = {
      locale: uni.getLocale(),
      messages
    };
    const i18n = createI18n(i18nConfig);
    return i18n;
  };
  const easycom = {
    autoscan: true,
    custom: {
      "^tm-(.*)": "@/tmui/components/tm-$1/tm-$1.vue"
    }
  };
  const pages$1 = [
    {
      path: "pages/index/index",
      style: {
        navigationBarTitleText: "",
        navigationStyle: "custom",
        titlePenetrate: "YES",
        transparentTitle: "always"
      }
    },
    {
      path: "pages/market/market",
      style: {
        navigationBarTitleText: "\u884C\u60C5",
        navigationStyle: "custom",
        titlePenetrate: "YES",
        transparentTitle: "always"
      }
    },
    {
      path: "pages/currency/currency",
      style: {
        navigationBarTitleText: "\u5E01\u5E01"
      }
    },
    {
      path: "pages/contract/contract",
      style: {
        navigationBarTitleText: "\u5408\u7EA6",
        navigationStyle: "custom",
        titlePenetrate: "YES",
        transparentTitle: "always"
      }
    },
    {
      path: "pages/assets/assets",
      style: {
        navigationBarTitleText: "\u8D44\u4EA7",
        navigationStyle: "custom",
        titlePenetrate: "YES",
        transparentTitle: "always"
      }
    },
    {
      path: "pages/index/search",
      style: {
        navigationBarTitleText: "\u641C\u7D22\u7EC4\u4EF6"
      }
    },
    {
      path: "pages/assets/login",
      style: {
        navigationBarTitleText: "\u767B\u5F55",
        navigationStyle: "custom",
        titlePenetrate: "YES",
        transparentTitle: "always"
      }
    },
    {
      path: "pages/assets/register",
      style: {
        navigationBarTitleText: "\u6CE8\u518C",
        navigationStyle: "custom",
        titlePenetrate: "YES",
        transparentTitle: "always"
      }
    },
    {
      path: "pages/index/settheme",
      style: {
        navigationBarTitleText: "",
        enablePullDownRefresh: false,
        navigationStyle: "custom",
        titlePenetrate: "YES",
        transparentTitle: "always"
      }
    }
  ];
  const globalStyle = {
    navigationBarTextStyle: "black",
    navigationBarTitleText: "uni-app",
    navigationBarBackgroundColor: "#FFFFFF",
    backgroundColor: "#FFFFFF"
  };
  const condition = {
    current: 0,
    list: [
      {
        name: "",
        path: "",
        query: ""
      }
    ]
  };
  const tabBar$1 = {
    color: "#7A7E83",
    selectedColor: "#0ead98",
    borderStyle: "black",
    backgroundColor: "#ffffff",
    list: [
      {
        pagePath: "pages/index/index",
        iconPath: "static/tabbar/home.png",
        selectedIconPath: "static/tabbar/home_select.png",
        text: "\u9996\u9875"
      },
      {
        pagePath: "pages/market/market",
        iconPath: "static/tabbar/market.png",
        selectedIconPath: "static/tabbar/market_select.png",
        text: "\u884C\u60C5"
      },
      {
        pagePath: "pages/currency/currency",
        iconPath: "static/tabbar/currency.png",
        selectedIconPath: "static/tabbar/currency_select.png",
        text: "\u5E01\u5E01"
      },
      {
        pagePath: "pages/contract/contract",
        iconPath: "static/tabbar/contract.png",
        selectedIconPath: "static/tabbar/contract_select.png",
        text: "\u5408\u7EA6"
      },
      {
        pagePath: "pages/assets/assets",
        iconPath: "static/tabbar/assets.png",
        selectedIconPath: "static/tabbar/assets_select.png",
        text: "\u8D44\u4EA7"
      }
    ]
  };
  var PageJsonInit = {
    easycom,
    pages: pages$1,
    globalStyle,
    condition,
    tabBar: tabBar$1
  };
  let pages = [];
  if (typeof (PageJsonInit == null ? void 0 : PageJsonInit.pages) == "undefined") {
    PageJsonInit.pages = [];
  }
  PageJsonInit.pages.forEach((el) => {
    var _a2, _b2;
    let customType = (_b2 = (_a2 = el == null ? void 0 : el.style) == null ? void 0 : _a2.navigationStyle) != null ? _b2 : "default";
    pages.push({
      path: el.path,
      custom: customType
    });
  });
  if (Array.isArray(PageJsonInit == null ? void 0 : PageJsonInit.subPackages)) {
    PageJsonInit.subPackages.forEach((el) => {
      let rootPath = el.root;
      el.pages.forEach((el2) => {
        var _a2, _b2;
        let elany = el2;
        pages.push({
          path: rootPath + "/" + elany.path,
          custom: (_b2 = (_a2 = elany == null ? void 0 : elany.style) == null ? void 0 : _a2.navigationStyle) != null ? _b2 : "default"
        });
      });
    });
  }
  let pagers = PageJsonInit;
  let tabBar = (_c = pagers == null ? void 0 : pagers.tabBar) != null ? _c : {
    color: "",
    selectedColor: "",
    borderStyle: "",
    backgroundColor: "",
    list: []
  };
  let cusutomIconList = [];
  cusutomIconList = fontJson;
  const $tm = {
    tabBar,
    pages,
    isColor: themeTool.isCssColor,
    u: __spreadProps(__spreadValues({}, util), { preview }),
    language,
    fetch: fetchNet,
    tmicon: [
      {
        font: "tmicon",
        prefix: "tmicon-",
        fontJson: cusutomIconList
      }
    ]
  };
  uni.$tm = $tm;
  var tmui = {
    install: (app2, options) => {
      uni.addInterceptor("navigateTo", {
        invoke(result) {
          vue.nextTick(() => {
            linsInko({
              path: result.url,
              context: null,
              openType: "navigateTo"
            });
          });
        },
        success(result) {
        }
      });
      uni.addInterceptor("redirectTo", {
        success(result) {
          var _a2, _b2, _c2;
          let pages2 = getCurrentPages().pop();
          let path = (_a2 = pages2 == null ? void 0 : pages2.route) != null ? _a2 : "";
          let msg = (_b2 = result.errMsg) != null ? _b2 : "";
          let opentype = (_c2 = msg.split(":")[0]) != null ? _c2 : "";
          linsInko({
            path,
            context: null,
            openType: opentype
          });
        }
      });
      uni.addInterceptor("reLaunch", {
        success(result) {
          var _a2, _b2, _c2;
          let pages2 = getCurrentPages().pop();
          let path = (_a2 = pages2 == null ? void 0 : pages2.route) != null ? _a2 : "";
          let msg = (_b2 = result.errMsg) != null ? _b2 : "";
          let opentype = (_c2 = msg.split(":")[0]) != null ? _c2 : "";
          linsInko({
            path,
            context: null,
            openType: opentype
          });
        }
      });
      uni.addInterceptor("navigateBack", {
        invoke(result) {
          vue.nextTick(() => {
            var _a2, _b2, _c2;
            let pages2 = getCurrentPages().pop();
            let path = (_a2 = pages2 == null ? void 0 : pages2.route) != null ? _a2 : "";
            let msg = (_b2 = result.errMsg) != null ? _b2 : "";
            (_c2 = msg.split(":")[0]) != null ? _c2 : "";
            linsInko({
              path,
              context: null,
              openType: "navigateBack"
            });
          });
        },
        success(result) {
        }
      });
      function linsInko(obj) {
        useTmRouterBefore(obj);
      }
      app2.use(languageByGlobal());
      let appconfig = {};
      app2.mixin(__spreadValues({}, appconfig));
      app2.config.globalProperties.tm = $tm;
    }
  };
  const _sfc_main = {
    globalData: {
      userinfo: "text"
    },
    onLaunch: function() {
      formatAppLog("log", "at App.vue:7", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:10", "App Show");
      this.userinfo = uni.$tm.u.getCookie("userinfo");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:14", "App Hide");
    }
  };
  var App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/App.vue"]]);
  function createApp() {
    const app2 = vue.createVueApp(App);
    app2.use(createPinia());
    app2.use(tmui);
    return {
      app: app2,
      Pinia
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
})(Vue, uni.VueShared);
