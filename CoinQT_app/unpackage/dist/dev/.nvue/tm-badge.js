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
import { defineComponent, computed, openBlock, createElementBlock, normalizeClass, renderSlot, createCommentVNode, unref, createVNode, withCtx, createBlock } from "vue";
import { _ as _export_sfc, c as custom_props, b as computedStyle, d as computedClass, a as tmText } from "./tm-text.js";
import { t as tmSheet } from "./tm-sheet.js";
import { t as tmIcon } from "./tm-icon.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
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
    const customCSSStyle = computed(() => computedStyle(props));
    const customClass = computed(() => computedClass(props));
    const istext = computed(() => {
      return isNaN(parseInt(String(props.count)));
    });
    const show = computed(() => {
      if (!props.dot && !props.icon && !props.count)
        return false;
      return true;
    });
    const size = computed(() => {
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
    const _icon = computed(() => props.icon);
    const _dot = computed(() => props.dot);
    const _count = computed(() => props.count);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        class: normalizeClass(["flex relative", [props.status ? "flex-row flex-row-center-center mx-8" : ""]]),
        renderWhole: true
      }, [
        !props.status ? (openBlock(), createElementBlock("view", { key: 0 }, [
          renderSlot(_ctx.$slots, "default")
        ])) : createCommentVNode("v-if", true),
        unref(show) ? (openBlock(), createElementBlock("view", {
          key: 1,
          class: normalizeClass([
            (unref(_dot) || unref(_count) || unref(_icon)) && !props.status ? "absolute flex-top-start-end r-0" : ""
          ]),
          style: { zIndex: 10 }
        }, [
          createVNode(tmSheet, {
            onClick: _cache[0] || (_cache[0] = ($event) => emits("click", $event)),
            color: props.color,
            _class: [unref(customClass), "flex-center flex-col"],
            _style: [unref(customCSSStyle), { flexShrink: 1 }],
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
            width: unref(size).w,
            height: unref(size).h,
            margin: props.margin,
            padding: props.padding
          }, {
            default: withCtx(() => [
              unref(_count) > 0 && !unref(istext) ? (openBlock(), createBlock(tmText, {
                key: 0,
                color: "white",
                "font-size": props.fontSize,
                _class: unref(size).h == 0 ? "py-3 px-8" : "",
                label: unref(_count) > props.maxCount ? props.maxCount + "+" : unref(_count)
              }, null, 8, ["font-size", "_class", "label"])) : createCommentVNode("v-if", true),
              unref(_count) && unref(istext) ? (openBlock(), createBlock(tmText, {
                key: 1,
                color: "white",
                "font-size": props.fontSize,
                _class: unref(size).h == 0 ? "py-3 px-8" : "",
                label: unref(_count)
              }, null, 8, ["font-size", "_class", "label"])) : createCommentVNode("v-if", true),
              unref(_icon) ? (openBlock(), createBlock(tmIcon, {
                key: 2,
                color: "white",
                "font-size": props.fontSize,
                name: unref(_icon)
              }, null, 8, ["font-size", "name"])) : createCommentVNode("v-if", true)
            ]),
            _: 1
          }, 8, ["color", "_class", "_style", "followTheme", "dark", "round", "shadow", "outlined", "border", "borderStyle", "borderDirection", "text", "transprent", "linear", "linearDeep", "width", "height", "margin", "padding"])
        ], 2)) : createCommentVNode("v-if", true),
        props.status ? (openBlock(), createBlock(tmText, {
          key: 2,
          "font-size": props.fontSize,
          _class: "ml-10",
          label: props.label
        }, null, 8, ["font-size", "label"])) : createCommentVNode("v-if", true)
      ], 2);
    };
  }
});
var tmBadge = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-badge/tm-badge.vue"]]);
export { tmBadge as t };
