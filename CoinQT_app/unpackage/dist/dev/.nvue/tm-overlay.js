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
import { _ as _export_sfc, c as custom_props, r as requireNativePlugin, b as computedStyle, d as computedClass } from "./tm-text.js";
import { defineComponent, getCurrentInstance, inject, computed, ref, onUnmounted, onMounted, watch, openBlock, createElementBlock, normalizeStyle, unref, createElementVNode, normalizeClass, withModifiers, renderSlot, createCommentVNode } from "vue";
var _style_0 = { "overlay": { "": { "transitionTimingFunction": "ease", "transitionProperty": "opacity", "transitionDelay": 0, "opacity": 0 } }, "blurOn": { "": { "opacity": 1 } }, "blurOff": { "": { "opacity": 0 } }, "@TRANSITION": { "overlay": { "timingFunction": "ease", "property": "opacity", "delay": 0 } } };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tm-overlay",
  props: __spreadProps(__spreadValues({}, custom_props), {
    align: {
      type: String,
      default: "flex-center"
    },
    bgColor: {
      type: String,
      default: "rgba(0,0,0,0.4)"
    },
    zIndex: {
      type: [Number, String],
      default: 999
    },
    show: {
      type: Boolean,
      default: false
    },
    overlayClick: {
      type: Boolean,
      default: true
    },
    transprent: {
      type: [Boolean, String],
      default: false
    },
    duration: {
      type: Number,
      default: 300
    }
  }),
  emits: ["click", "open", "close", "update:show"],
  setup(__props, { expose, emit: emits }) {
    var _a, _b;
    const props = __props;
    const animation = requireNativePlugin("animation");
    const proxy = (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const customCSSStyle = computedStyle(props);
    const customClass = computedClass(props);
    const sysinfo = inject("tmuiSysInfo", computed(() => {
      return { bottom: 0, height: 750, width: uni.upx2px(750), top: 0, isCustomHeader: false, sysinfo: null };
    }));
    const width = computed(() => sysinfo.value.width);
    const height = computed(() => sysinfo.value.height);
    const top = computed(() => sysinfo.value.top);
    ref(false);
    let timids = uni.$tm.u.getUid(1);
    let timerId = NaN;
    ref(null);
    const showMask = ref(false);
    const ani = ref(false);
    onUnmounted(() => clearTimeout(timerId));
    const align_rpx = computed(() => props.align);
    const bgColor_rp = computed(() => {
      if (!props.bgColor || props.transprent)
        return "rgba(0,0,0,0)";
      return props.bgColor || "rgba(0,0,0,0.4)";
    });
    onMounted(() => {
      if (!props.show)
        return;
      open(props.show);
    });
    function close() {
      if (timerId) {
        clearTimeout(timerId);
        timerId = NaN;
      }
      open(false);
    }
    function closeByclick(e) {
      try {
        e.stopPropagation();
        e.stopImmediatePropagation();
      } catch (e2) {
      }
      emits("click", e);
      if (timerId) {
        clearTimeout(timerId);
        timerId = NaN;
      }
      if (!props.overlayClick)
        return;
      open(false);
    }
    function open(off) {
      if (off == true) {
        uni.hideKeyboard();
      }
      fadeInNvue(off);
    }
    function fadeInNvue(off = false) {
      var _a2;
      if (off == false) {
        if (showMask.value == off)
          return;
        var testEl = (_a2 = proxy == null ? void 0 : proxy.$refs) == null ? void 0 : _a2.overlay;
        animation.transition(testEl, {
          styles: {
            backgroundColor: bgColor_rp.value,
            opacity: 0
          },
          duration: props.duration || 1,
          timingFunction: "linear",
          delay: 0
        }, () => {
          showMask.value = off;
          emits("close");
          emits("update:show", false);
        });
      } else {
        showMask.value = off;
        emits("open");
        clearTimeout(timids);
        timids = setTimeout(function() {
          var testEl2 = proxy == null ? void 0 : proxy.$refs.overlay;
          animation.transition(testEl2, {
            styles: {
              backgroundColor: bgColor_rp.value,
              opacity: 1
            },
            duration: props.duration || 1,
            timingFunction: "linear",
            delay: 0
          }, () => {
          });
        }, 50);
      }
    }
    watch(() => props.show, (newval) => {
      open(newval);
    });
    expose({
      close,
      open
    });
    return (_ctx, _cache) => {
      return showMask.value ? (openBlock(), createElementBlock("view", {
        key: 0,
        class: "l-0",
        style: normalizeStyle([{ width: unref(width) + "px", height: unref(height) + "px", top: unref(top) + "px", position: "fixed" }, __props.zIndex ? { zIndex: __props.zIndex } : ""]),
        renderWhole: true
      }, [
        createElementVNode("view", {
          ref: "overlay",
          class: normalizeClass([unref(bgColor_rp) && !props.transprent && ani.value ? "blurOn" : "blurOff", "overlay"]),
          style: normalizeStyle([
            unref(bgColor_rp) && !props.transprent ? { backgroundColor: showMask.value ? unref(bgColor_rp) : "" } : "",
            { width: unref(width) + "px", height: unref(height) + "px", transitionDuration: props.duration + "ms" }
          ])
        }, null, 6),
        createElementVNode("view", {
          onClick: withModifiers(closeByclick, ["stop"]),
          class: normalizeClass([unref(align_rpx), " absolute flex flex-col  l-0 t-0 ", unref(customClass)]),
          style: normalizeStyle([{ width: unref(width) + "px", height: unref(height) + "px" }, unref(customCSSStyle)])
        }, [
          renderSlot(_ctx.$slots, "default")
        ], 14, ["onClick"])
      ], 4)) : createCommentVNode("v-if", true);
    };
  }
});
var tmOverlay = /* @__PURE__ */ _export_sfc(_sfc_main, [["styles", [_style_0]], ["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-overlay/tm-overlay.vue"]]);
export { tmOverlay as t };
