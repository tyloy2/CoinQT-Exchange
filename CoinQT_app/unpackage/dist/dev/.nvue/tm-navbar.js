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
import { defineComponent, getCurrentInstance, computed, ref, onMounted, openBlock, createElementBlock, createElementVNode, normalizeStyle, unref, createVNode, withCtx, createBlock, createCommentVNode, renderSlot } from "vue";
import { t as tmSheet } from "./tm-sheet.js";
import { _ as _export_sfc, c as custom_props, u as useTmpiniaStore, a as tmText } from "./tm-text.js";
import { t as tmIcon } from "./tm-icon.js";
var _style_0 = { "statusHeightTop": { "": { "zIndex": 400 } } };
const _sfc_main = /* @__PURE__ */ defineComponent({
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
    var _a, _b;
    const props = __props;
    useTmpiniaStore();
    (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const _height = computed(() => props.height);
    const _width = uni.getSystemInfoSync().windowWidth;
    const statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
    const _barHeight = computed(() => statusBarHeight + _height.value);
    const _leftWidth = computed(() => props.leftWidth);
    const _rightWidth = computed(() => props.rightWidth);
    const contentwidth = computed(() => {
      return _width - uni.upx2px(_leftWidth.value) - uni.upx2px(_rightWidth.value);
    });
    const _title = computed(() => props.title);
    const _fontColor = computed(() => props.fontColor);
    const _homeColor = computed(() => props.homeColor);
    const _blur = computed(() => props.blur);
    const _pages = ref(0);
    onMounted(() => {
      _pages.value = getCurrentPages().length;
    });
    const backhome = () => {
      uni.reLaunch({
        url: props.homePath
      });
    };
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
    const goback = () => {
      debounce(async () => {
        if (typeof props.beforeBack === "function") {
          let p = await props.beforeBack();
          if (typeof p === "function") {
            p = await p();
          }
          if (!p)
            return;
        }
        uni.navigateBack({});
      }, 250, true);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", { renderWhole: true }, [
        createElementVNode("view", {
          class: "statusHeight",
          style: normalizeStyle({ height: unref(_barHeight) + "px" })
        }, null, 4),
        createElementVNode("view", {
          class: "fixed l-0 t-0 statusHeightTop flex",
          style: normalizeStyle({ width: unref(_width) + "px", height: unref(_barHeight) + "px" })
        }, [
          createVNode(tmSheet, {
            onClick: _cache[0] || (_cache[0] = ($event) => emits("click", $event)),
            blur: unref(_blur),
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
            height: unref(_barHeight),
            width: unref(_width),
            unit: "px"
          }, {
            default: withCtx(() => [
              createElementVNode("view", {
                class: "statusHeight",
                style: normalizeStyle({ height: unref(statusBarHeight) + "px" })
              }, null, 4),
              createElementVNode("view", { class: "flex flex-row flex-1 flex-row flex-row-center-between" }, [
                createElementVNode("view", {
                  class: "flex-row flex flex-row-center-start",
                  style: normalizeStyle({ width: unref(_leftWidth) + "rpx" })
                }, [
                  _pages.value > 1 && props.hideBack ? (openBlock(), createBlock(tmIcon, {
                    key: 0,
                    unit: props.unit,
                    "font-size": props.iconFontSize,
                    _class: "pointer pb-12 pt-12 px-24",
                    color: unref(_homeColor),
                    onClick: goback,
                    name: "tmicon-angle-left"
                  }, null, 8, ["unit", "font-size", "color"])) : createCommentVNode("v-if", true),
                  _pages.value == 1 && !__props.hideHome ? (openBlock(), createBlock(tmIcon, {
                    key: 1,
                    unit: props.unit,
                    _class: "pointer  pb-12 pt-12 px-24",
                    onClick: backhome,
                    color: unref(_homeColor),
                    "font-size": props.iconFontSize,
                    name: "tmicon-md-home"
                  }, null, 8, ["unit", "color", "font-size"])) : createCommentVNode("v-if", true),
                  renderSlot(_ctx.$slots, "left")
                ], 4),
                createElementVNode("view", {
                  class: "flex flex-row-center-center",
                  style: normalizeStyle({ width: unref(contentwidth) + "px" })
                }, [
                  renderSlot(_ctx.$slots, "default", {}, () => [
                    createVNode(tmText, {
                      unit: props.unit,
                      _class: "text-weight-b text-overflow-1",
                      color: unref(_fontColor),
                      "font-size": props.fontSize,
                      label: unref(_title)
                    }, null, 8, ["unit", "color", "font-size", "label"])
                  ])
                ], 4),
                createElementVNode("view", {
                  class: "flex-row flex flex-row-center-end",
                  style: normalizeStyle({ width: unref(_rightWidth) + "rpx" })
                }, [
                  renderSlot(_ctx.$slots, "right")
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
var tmNavbar = /* @__PURE__ */ _export_sfc(_sfc_main, [["styles", [_style_0]], ["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-navbar/tm-navbar.vue"]]);
export { tmNavbar as t };
