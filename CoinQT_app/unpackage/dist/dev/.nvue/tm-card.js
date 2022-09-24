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
import { defineComponent, computed, openBlock, createBlock, unref, withCtx, createElementVNode, renderSlot, createVNode } from "vue";
import { _ as _export_sfc, c as custom_props, b as computedStyle, d as computedClass, a as tmText } from "./tm-text.js";
import { t as tmSheet } from "./tm-sheet.js";
import { t as tmDivider } from "./tm-divider.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tm-card",
  props: __spreadProps(__spreadValues({}, custom_props), {
    shadow: {
      type: [Number],
      default: 2
    },
    round: {
      type: [Number],
      default: 4
    },
    border: {
      type: [Number],
      default: 0
    },
    margin: {
      type: Array,
      default: () => [32, 16]
    },
    padding: {
      type: Array,
      default: () => [16, 0]
    },
    transprent: {
      type: [Boolean],
      default: false
    },
    color: {
      type: String,
      default: "white"
    },
    width: {
      type: [Number],
      default: 0
    },
    height: {
      type: [Number],
      default: 0
    },
    title: {
      type: [String],
      default: ""
    },
    status: {
      type: [String],
      default: ""
    },
    statusColor: {
      type: [String],
      default: "primary"
    },
    content: {
      type: [String],
      default: ""
    }
  }),
  setup(__props) {
    const props = __props;
    const customCSSStyle = computed(() => computedStyle(props));
    const customClass = computed(() => computedClass(props));
    return (_ctx, _cache) => {
      return openBlock(), createBlock(tmSheet, {
        color: props.color,
        _class: [unref(customClass), "flex-col"],
        _style: [unref(customCSSStyle)],
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
        width: props.width,
        height: props.height,
        margin: props.margin,
        padding: props.padding
      }, {
        default: withCtx(() => [
          createElementVNode("view", { class: "flex-row flex flex-between pt-24" }, [
            renderSlot(_ctx.$slots, "title", {}, () => [
              createVNode(tmText, {
                "font-size": 28,
                _class: "text-weight-b",
                label: props.title
              }, null, 8, ["label"])
            ]),
            renderSlot(_ctx.$slots, "status", {}, () => [
              createVNode(tmText, {
                followTheme: false,
                color: props.statusColor,
                "font-size": 26,
                label: props.status
              }, null, 8, ["color", "label"])
            ])
          ]),
          createVNode(tmDivider),
          createElementVNode("view", { class: "pb-24 flex" }, [
            renderSlot(_ctx.$slots, "content", {}, () => [
              createVNode(tmText, {
                "font-size": 26,
                _class: "wrap",
                label: props.content
              }, null, 8, ["label"])
            ])
          ]),
          createElementVNode("view", { class: "flex pb-24" }, [
            renderSlot(_ctx.$slots, "action")
          ])
        ]),
        _: 3
      }, 8, ["color", "_class", "_style", "followTheme", "dark", "round", "shadow", "outlined", "border", "borderStyle", "borderDirection", "text", "transprent", "linear", "linearDeep", "width", "height", "margin", "padding"]);
    };
  }
});
var tmCard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-card/tm-card.vue"]]);
export { tmCard as t };
