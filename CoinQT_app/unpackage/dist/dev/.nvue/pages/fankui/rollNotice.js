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
import { _ as _export_sfc, c as custom_props, r as requireNativePlugin, a as tmText, t as tmApp, g as formatAppLog } from "../../tm-text.js";
import { defineComponent, getCurrentInstance, computed, ref, onMounted, openBlock, createBlock, unref, withCtx, createElementBlock, createVNode, createCommentVNode, createElementVNode, normalizeStyle, Fragment, renderList } from "vue";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmIcon } from "../../tm-icon.js";
import "pinia";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "tm-roll-notice",
  props: __spreadProps(__spreadValues({}, custom_props), {
    margin: {
      type: Array,
      default: () => [32, 24]
    },
    transprent: {
      type: Boolean,
      default: false
    },
    text: {
      type: Boolean,
      default: true
    },
    width: {
      type: Number,
      default: 726
    },
    height: {
      type: Number,
      default: 70
    },
    fontSize: {
      type: Number,
      default: 26
    },
    color: {
      type: String,
      default: "primary"
    },
    fontColor: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: "tmicon-info-circle"
    },
    showRight: {
      type: Boolean,
      default: false
    },
    shadow: {
      type: Number,
      default: 0
    },
    list: {
      type: [Array, String],
      default: () => ""
    },
    duration: {
      type: Number,
      default: 10
    },
    border: {
      type: Number,
      default: 0
    }
  }),
  emits: ["click"],
  setup(__props, { emit: emits }) {
    var _a, _b;
    const props = __props;
    const animation = requireNativePlugin("animation");
    const proxy = (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const _icon = computed(() => props.icon);
    const _list = computed(() => {
      if (typeof props.list === "string") {
        return [props.list];
      }
      if (Array.isArray(props.list)) {
        return props.list;
      }
      return [];
    });
    const _duration = computed(() => props.duration);
    const _width = computed(() => props.width - props.margin[0] * 2 - 24);
    const _Left = computed(() => {
      if (_icon.value !== "") {
        return _width.value - 124;
      }
      return _width.value - 84;
    });
    const isNvue = ref(false);
    isNvue.value = true;
    onMounted(() => {
      setTimeout(function() {
        nvueani();
      }, 200);
    });
    function nvueani() {
      var testEl = proxy == null ? void 0 : proxy.$refs.content;
      animation.transition(testEl, {
        styles: {
          transform: "translateX(-100%)",
          transformOrigin: "center center"
        },
        duration: props.duration * 1e3,
        timingFunction: "linear",
        delay: 0
      }, () => {
        animation.transition(testEl, {
          styles: {
            transform: "translateX(" + uni.upx2px(_Left.value) + "px)",
            transformOrigin: "center center"
          },
          duration: 0,
          timingFunction: "linear",
          delay: 1
        }, () => {
          nvueani();
        });
      });
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(tmSheet, {
        margin: props.margin,
        padding: [24, 0],
        width: unref(_width),
        height: props.height,
        color: props.color,
        _style: props._style,
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
        _class: "flex flex-row flex-between"
      }, {
        default: withCtx(() => [
          unref(_icon) ? (openBlock(), createElementBlock("view", {
            key: 0,
            class: "flex flex-row flex-row-center-start",
            style: { "width": "50rpx" }
          }, [
            createVNode(tmIcon, {
              "font-size": 28,
              name: unref(_icon),
              style: { "line-height": "normal" }
            }, null, 8, ["name"])
          ])) : createCommentVNode("v-if", true),
          createElementVNode("view", {
            class: "flex-1 flex-row overflow",
            style: { "width": "0px" }
          }, [
            createElementVNode("view", {
              ref: "content",
              style: normalizeStyle({ animationDuration: unref(_duration) + "s", paddingLeft: (isNvue.value ? 0 : unref(_Left)) + "rpx", width: unref(_Left) * __props.list.length + "rpx" }),
              class: "aniRow flex-row flex-row-center-start"
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(_list), (item, index) => {
                return openBlock(), createElementBlock("view", {
                  class: "flex-row flex-row-center-start",
                  key: index
                }, [
                  createVNode(tmText, {
                    _class: "pl-24 nowrap",
                    "font-size": props.fontSize,
                    color: props.fontColor,
                    onClick: ($event) => emits("click", index),
                    label: item
                  }, null, 8, ["font-size", "color", "onClick", "label"])
                ]);
              }), 128))
            ], 4)
          ]),
          props.showRight ? (openBlock(), createElementBlock("view", {
            key: 1,
            class: "flex flex-row flex-row-center-end",
            style: { "width": "40rpx" }
          }, [
            createVNode(tmIcon, {
              "font-size": 24,
              name: "tmicon-angle-right",
              style: { "line-height": "normal" }
            })
          ])) : createCommentVNode("v-if", true)
        ]),
        _: 1
      }, 8, ["margin", "width", "height", "color", "_style", "followTheme", "dark", "round", "shadow", "outlined", "border", "borderStyle", "borderDirection", "text", "transprent", "linear", "linearDeep"]);
    };
  }
});
var tmRollNotice = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-roll-notice/tm-roll-notice.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "rollNotice",
  setup(__props) {
    const content = ref(["11\u6D4B\u8BD5\u6EDA\u52A8\u8BD5\u6EDAend", "22\u6D4B\u8BD5\u6EDA\u52A8\u6D4B\u8BD5\u6EDA\u52A8\u6D4B\u8BD5\u6EDA\u52A8\u6D4B\u8BD5\u6EDA\u52A8\u6D4B\u8BD5\u6EDA\u52A8"]);
    const test = (index) => {
      formatAppLog("log", "at pages/fankui/rollNotice.nvue:17", "\u70B9\u51FB\u4E86\uFF1A", index);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("scroll-view", {
        scrollY: true,
        showScrollbar: true,
        enableBackToTop: true,
        bubble: "true",
        style: { flexDirection: "column" }
      }, [
        createVNode(tmApp, null, {
          default: withCtx(() => [
            createVNode(tmRollNotice, {
              onClick: test,
              list: content.value
            }, null, 8, ["list"]),
            createVNode(tmRollNotice, {
              onClick: test,
              text: false,
              list: content.value
            }, null, 8, ["list"]),
            createVNode(tmRollNotice, {
              onClick: test,
              shadow: 2,
              round: 2,
              color: "red",
              text: false,
              linear: "right",
              list: content.value
            }, null, 8, ["list"])
          ]),
          _: 1
        })
      ]);
    };
  }
});
var rollNotice = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/fankui/rollNotice.nvue"]]);
export { rollNotice as default };
