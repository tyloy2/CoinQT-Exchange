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
import { _ as _export_sfc, c as custom_props, u as useTmpiniaStore, r as requireNativePlugin, b as computedStyle, d as computedClass, e as computedDark, f as computedTheme } from "./tm-text.js";
import { defineComponent, getCurrentInstance, computed, provide, openBlock, createElementBlock, withModifiers, normalizeClass, unref, normalizeStyle, renderSlot, inject, createElementVNode } from "vue";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
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
    var _a, _b;
    const props = __props;
    const store = useTmpiniaStore();
    requireNativePlugin("dom");
    (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const tmcfg = computed(() => store.tmStore);
    const customCSSStyle = computed(() => computedStyle(props));
    const customClass = computed(() => computedClass(props));
    const isDark = computed(() => computedDark(props, tmcfg.value));
    const tmcomputed = computed(() => computedTheme(props, isDark.value, tmcfg.value));
    const width_px_rect = computed(() => props.width);
    const width_px_rect_rp = computed(() => width_px_rect.value);
    const justifyAlign2 = {
      start: "flex-start",
      end: "flex-end",
      center: "center",
      around: "space-around",
      between: "space-between"
    };
    const justify_rp = computed(() => justifyAlign2[props.justify] || "start");
    const AlignAlign = {
      start: "flex-start",
      end: "flex-end",
      center: "center",
      stretch: "stretch"
    };
    const align_rp = computed(() => AlignAlign[props.align] || "start");
    provide("TmRowWidth", width_px_rect_rp);
    provide("TmRowColumn", computed(() => props.column));
    provide("TmRowGutter", computed(() => props.gutter));
    let textColor = computed(() => tmcomputed.value.textColor);
    provide("appTextColor", textColor);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        ref: "tmRow",
        onClick: _cache[0] || (_cache[0] = withModifiers(($event) => emits("click", $event), ["stop"])),
        class: normalizeClass(["flex tm-row", ["overflow ", `round-${props.round}`, unref(customClass), `mx-${props.margin[0]} my-${__props.margin[1]}`]]),
        style: normalizeStyle([
          { flexDirection: "row", flexWrap: "wrap" },
          props.height ? { height: props.height + "rpx" } : "",
          unref(width_px_rect) ? { width: unref(width_px_rect) + "rpx" } : "",
          { justifyContent: unref(justify_rp), alignItems: unref(align_rp) },
          !props.transprent ? unref(tmcomputed).backgroundColorCss : "",
          !props.transprent ? unref(tmcomputed).shadowColor : "",
          unref(customCSSStyle)
        ]),
        renderWhole: true
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 6);
    };
  }
});
var tmRow = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-row/tm-row.vue"]]);
var justifyAlign = /* @__PURE__ */ ((justifyAlign2) => {
  justifyAlign2["start"] = "flex-start";
  justifyAlign2["end"] = "flex-end";
  justifyAlign2["center"] = "center";
  return justifyAlign2;
})(justifyAlign || {});
const _sfc_main = /* @__PURE__ */ defineComponent({
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
    const tmcfg = computed(() => store.tmStore);
    const customCSSStyle = computed(() => computedStyle(props));
    const customClass = computed(() => computedClass(props));
    const isDark = computed(() => computedDark(props, tmcfg.value));
    const tmcomputed = computed(() => computedTheme(props, isDark.value, tmcfg.value));
    const TmRowWidth = inject("TmRowWidth", computed(() => 0));
    const TmRowColumn = inject("TmRowColumn", computed(() => 0));
    const TmRowGutter = inject("TmRowGutter", computed(() => 0));
    const colWidth = computed(() => {
      if (TmRowWidth.value == 0)
        return 0;
      return TmRowWidth.value / TmRowColumn.value;
    });
    const alignComputed = computed(() => justifyAlign[props.align]);
    let textColor = computed(() => tmcomputed.value.textColor);
    provide("appTextColor", textColor);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        onClick: _cache[0] || (_cache[0] = ($event) => emits("click", $event)),
        class: normalizeClass(["flex flex-col", [unref(colWidth) ? "" : "flex-1"]]),
        style: normalizeStyle([unref(colWidth) ? { width: unref(colWidth) + "rpx" } : ""]),
        renderWhole: true
      }, [
        createElementVNode("view", {
          eventPenetrationEnabled: true,
          style: normalizeStyle([
            unref(TmRowGutter) ? { marginLeft: `${unref(TmRowGutter)}rpx`, marginRight: `${unref(TmRowGutter)}rpx` } : "",
            props.height ? { height: props.height + "rpx" } : "",
            !__props.transprent ? unref(tmcomputed).backgroundColorCss : "",
            { alignItems: unref(alignComputed), justifyContent: "center" },
            unref(customCSSStyle)
          ]),
          class: normalizeClass(["flex flex-col", unref(customClass)])
        }, [
          renderSlot(_ctx.$slots, "default")
        ], 6)
      ], 6);
    };
  }
});
var tmCol = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-col/tm-col.vue"]]);
export { tmCol as a, tmRow as t };
