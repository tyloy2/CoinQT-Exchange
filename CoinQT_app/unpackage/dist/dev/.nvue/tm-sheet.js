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
import { defineComponent, getCurrentInstance, computed, ref, watch, nextTick, provide, openBlock, createElementBlock, unref, normalizeClass, normalizeStyle, createElementVNode, renderSlot, createCommentVNode } from "vue";
import { _ as _export_sfc, c as custom_props, u as useTmpiniaStore, b as computedStyle, d as computedClass, e as computedDark, f as computedTheme } from "./tm-text.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
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
    var _a, _b;
    const props = __props;
    const store = useTmpiniaStore();
    (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const parenClass_p = computed(() => props.parenClass);
    const contStyle_p = computed(() => props.contStyle);
    const _transprent = computed(() => props.transprent);
    const tmcfg = computed(() => store.tmStore);
    const _blur = computed(() => {
      if (tmcfg.value.os == "android" && _isNvue.value) {
        return false;
      }
      return props.blur;
    });
    const customCSSStyle = computed(() => computedStyle(props));
    const customClass = computed(() => computedClass(props));
    const isDark = computed(() => computedDark(props, tmcfg.value));
    const tmcomputed = computed(() => {
      let text = props.text;
      if (_blur.value && tmcfg.value.os == "ios" && _isNvue.value) {
        text = true;
      }
      return computedTheme(__spreadProps(__spreadValues({}, props), { blur: _blur.value, text }), isDark.value, tmcfg.value);
    });
    const _isNvue = ref(false);
    _isNvue.value = true;
    const _margin = computed(() => props.margin);
    const _padding = computed(() => props.padding);
    const _width = computed(() => props.width);
    const _height = computed(() => props.height);
    const _noLevel = computed(() => props.noLevel);
    const _blue_sheet = ref(true);
    const _blurEffect = computed(() => {
      if (props.blur === true && isDark.value)
        return "dark";
      if (props.blur === true && !isDark.value)
        return "extralight";
      return "none";
    });
    watch(() => isDark.value, () => {
      if (store.tmStore.os == "ios" && _blur.value === true) {
        _blue_sheet.value = false;
        nextTick(() => _blue_sheet.value = true);
      }
    });
    const _bgcolor = computed(() => {
      var _a2;
      if (_transprent.value === true)
        return `background-color:rgba(255,255,255,0);`;
      if (props.darkBgColor !== "" && isDark.value === true) {
        return `background-color:${props.darkBgColor};`;
      }
      if (((_a2 = tmcomputed.value.gradientColor) == null ? void 0 : _a2.length) === 2) {
        return tmcomputed.value.backgroundColorCss;
      }
      if (_noLevel.value && tmcomputed.value.isBlackAndWhite === true && isDark.value === true) {
        return `background-color: ${tmcomputed.value.inputcolor}`;
      }
      return `background-color: ${tmcomputed.value.backgroundColor}`;
    });
    const isLongPress = ref(false);
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
    computed(() => {
      let w = parseFloat(String(_width.value)) - parseFloat(String(props.padding[0]));
      w = w - parseFloat(String(props.border)) * 2;
      return w;
    });
    computed(() => {
      let h = parseFloat(String(_height.value)) - parseFloat(String(props.padding[1]));
      h = h - parseFloat(String(props.border)) * 2;
      return h;
    });
    let textColor = computed(() => {
      return tmcomputed.value.textColor;
    });
    provide("appTextColor", textColor);
    return (_ctx, _cache) => {
      return _blue_sheet.value ? (openBlock(), createElementBlock("view", {
        key: 0,
        renderWhole: true,
        blurEffect: unref(_blurEffect),
        onClick: _cache[0] || (_cache[0] = ($event) => emits("click", $event)),
        onLongpress: longpress,
        onTouchend: touchend,
        onTouchstart: touchstart,
        onTouchcancel: touchcancel,
        onMousedown: mousedown,
        onMouseup: mouseup,
        onMouseleave: mouseleave,
        class: normalizeClass([
          "flex flex-col noNvueBorder",
          unref(parenClass_p),
          `mx-${unref(_margin)[0]}`,
          `my-${unref(_margin)[1]}`,
          `px-${unref(_padding)[0]}`,
          `py-${unref(_padding)[1]}`,
          isLongPress.value ? props.hoverClass : "",
          props.hoverClass != "" && props.hoverClass != "none" ? "webpc" : "",
          !_ctx.isDisabledRoundAndriod ? `round-${props.round}` : ""
        ]),
        style: normalizeStyle([
          unref(_height) ? { height: unref(_height) + unref(_padding)[1] * 2 + props.unit } : "",
          unref(_width) ? { width: unref(_width) + unref(_padding)[0] * 2 + props.unit } : "",
          unref(tmcomputed).borderCss,
          unref(_blur) && unref(store).tmStore.os == "ios" && _isNvue.value === true ? "" : unref(_bgcolor),
          !unref(_transprent) && props.shadow > 0 ? unref(tmcomputed).shadowColor : "",
          !unref(_transprent) && unref(_blur) ? { backdropFilter: "blur(6px)" } : "",
          unref(customCSSStyle)
        ])
      }, [
        createElementVNode("view", {
          renderWhole: true,
          class: normalizeClass(["flex noNvueBorder flex-col flex-1", unref(customClass)]),
          style: normalizeStyle(unref(contStyle_p))
        }, [
          renderSlot(_ctx.$slots, "default")
        ], 6)
      ], 46, ["blurEffect"])) : createCommentVNode("v-if", true);
    };
  }
});
var tmSheet = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-sheet/tm-sheet.vue"]]);
export { tmSheet as t };
