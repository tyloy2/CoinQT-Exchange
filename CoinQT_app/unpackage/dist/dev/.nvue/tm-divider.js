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
import { defineComponent, computed, getCurrentInstance, openBlock, createElementBlock, unref, normalizeStyle, normalizeClass, createCommentVNode, createElementVNode, createVNode } from "vue";
import { _ as _export_sfc, c as custom_props, u as useTmpiniaStore, e as computedDark, f as computedTheme, a as tmText } from "./tm-text.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
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
    var _a, _b;
    const props = __props;
    const store = useTmpiniaStore();
    const borderDir = computed(() => props.vertical ? "left" : "bottom");
    const _label = computed(() => props.label);
    (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const tmcfg = computed(() => store.tmStore);
    const _realColor = computed(() => props.realColor);
    const isDark = computed(() => computedDark(__spreadProps(__spreadValues({}, props), { borderDirection: borderDir.value }), tmcfg.value));
    const tmcomputed = computed(() => computedTheme(__spreadProps(__spreadValues({}, props), { borderDirection: borderDir.value }), isDark.value, tmcfg.value));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", { renderWhole: true }, [
        !unref(_label) && props.vertical ? (openBlock(), createElementBlock("view", {
          key: 0,
          style: normalizeStyle([{ backgroundColor: unref(_realColor) ? unref(tmcomputed).color : unref(tmcomputed).border }, props.vertical ? { width: props.border + "rpx", height: props.height + "rpx" } : ""]),
          class: normalizeClass([props.vertical ? `mx-${props.margin[0]}` : `my-${props.margin[1]}`])
        }, null, 6)) : createCommentVNode("v-if", true),
        unref(_label) && !props.vertical ? (openBlock(), createElementBlock("view", {
          key: 1,
          class: "flex flex-row flex-center"
        }, [
          createElementVNode("view", {
            style: normalizeStyle([unref(tmcomputed) ? { backgroundColor: unref(_realColor) ? unref(tmcomputed).color : unref(tmcomputed).border, height: props.border + "rpx" } : ""]),
            class: normalizeClass([`my-${props.margin[1]}`, __props.align == "left" ? "flex-2" : "", __props.align == "right" ? "flex-10" : "", __props.align == "center" ? "flex-1" : ""])
          }, null, 6),
          props.label ? (openBlock(), createElementBlock("view", {
            key: 0,
            class: normalizeClass([unref(isDark) ? "opacity-4" : ""])
          }, [
            createVNode(tmText, {
              fontSize: props.fontSize,
              dark: unref(isDark),
              followTheme: props.followTheme,
              color: props.fontColor,
              label: props.label,
              _class: ["mx-32"]
            }, null, 8, ["fontSize", "dark", "followTheme", "color", "label"])
          ], 2)) : createCommentVNode("v-if", true),
          createElementVNode("view", {
            style: normalizeStyle([unref(tmcomputed) ? { backgroundColor: unref(_realColor) ? unref(tmcomputed).color : unref(tmcomputed).border, height: props.border + "rpx" } : ""]),
            class: normalizeClass([`my-${props.margin[1]}`, __props.align == "left" ? "flex-10" : "", __props.align == "right" ? "flex-2" : "", __props.align == "center" ? "flex-1" : ""])
          }, null, 6)
        ])) : createCommentVNode("v-if", true),
        !unref(_label) && !props.vertical ? (openBlock(), createElementBlock("view", {
          key: 2,
          class: "flex flex-row flex-center"
        }, [
          createElementVNode("view", {
            class: normalizeClass(["flex-1", [`my-${props.margin[1]}`]]),
            style: normalizeStyle([unref(tmcomputed) ? { backgroundColor: unref(_realColor) ? unref(tmcomputed).color : unref(tmcomputed).border, height: props.border + "rpx" } : ""])
          }, null, 6)
        ])) : createCommentVNode("v-if", true)
      ]);
    };
  }
});
var tmDivider = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-divider/tm-divider.vue"]]);
export { tmDivider as t };
