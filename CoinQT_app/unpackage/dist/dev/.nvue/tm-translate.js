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
import { defineComponent, getCurrentInstance, computed, ref, watch, onMounted, onUnmounted, openBlock, createElementBlock, normalizeClass, unref, normalizeStyle, renderSlot, createCommentVNode, nextTick } from "vue";
var _style_0 = { "fade": { "": { "opacity": 0 } }, "fade-reverse": { "": { "opacity": 1 } }, "up": { "": { "transform": "translateY(0%)" } }, "up-reverse": { "": { "transform": "translateY(-101%)" } }, "down": { "": { "transform": "translateY(0%)" } }, "down-reverse": { "": { "transform": "translateY(101%)" } }, "left": { "": { "transform": "translateX(0%)" } }, "left-reverse": { "": { "transform": "translateX(-101%)" } }, "right": { "": { "transform": "translateX(0%)" } }, "right-reverse": { "": { "transform": "translateX(101%)" } }, "zoom": { "": { "transform": "scale(0.7, 0.7)", "opacity": 0 } }, "zoom-reverse": { "": { "transform": "scale(1, 1)", "opacity": 1 } } };
const _sfc_main = /* @__PURE__ */ defineComponent({
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
    var _a, _b;
    const props = __props;
    requireNativePlugin("bindingx");
    requireNativePlugin("dom");
    const animation = requireNativePlugin("animation");
    function hanlder(e) {
      emits("click", e);
    }
    const proxy = (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const customCSSStyle = computed(() => computedStyle(props));
    const customClass = computed(() => computedClass(props));
    const computedHeight = computed(() => {
      if (!props.height || !Number(props.height)) {
        return 0;
      }
      if (String(props.height).indexOf("px") > -1 || String(props.height).indexOf("rpx") > -1) {
        return String(props.height);
      }
      return String(props.height) + "rpx";
    });
    const computedWidth = computed(() => {
      if (!props.width) {
        return 0;
      }
      if (String(props.width).indexOf("px") > -1 || String(props.width).indexOf("rpx") > -1) {
        return props.width;
      }
      return props.width + "rpx";
    });
    const animationName = computed(() => props.name || "fade");
    computed(() => props.duration);
    const computedReverse = computed(() => props.reverse);
    const reverseAniPrefxname = computed(() => computedReverse.value ? "-reverse" : "");
    const animationStatus = ref(0);
    const tmid = ref(Number(uni.$tm.u.getUid(3)));
    const isLoadEl = ref(false);
    const animationData = ref(null);
    watch(() => props.initByWechat, () => {
      reset();
    });
    function init() {
      nextTick(() => {
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
      nextTick(function() {
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
    onMounted(() => init());
    onUnmounted(() => {
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
      return openBlock(), createElementBlock("view", {
        ref: "bodywk",
        onClick: hanlder,
        class: normalizeClass([unref(customClass), "overflow"]),
        style: normalizeStyle([
          unref(computedHeight) ? { height: unref(computedHeight) } : "",
          unref(computedWidth) ? { width: unref(computedWidth) } : "",
          unref(customCSSStyle)
        ]),
        renderWhole: true
      }, [
        isLoadEl.value ? (openBlock(), createElementBlock("view", {
          key: 0,
          ref: "nvueElAni",
          animation: animationData.value,
          class: normalizeClass([
            "flex-col flex trani",
            unref(animationName) + unref(reverseAniPrefxname),
            unref(customClass)
          ])
        }, [
          renderSlot(_ctx.$slots, "default")
        ], 10, ["animation"])) : createCommentVNode("v-if", true)
      ], 6);
    };
  }
});
var tmTranslate = /* @__PURE__ */ _export_sfc(_sfc_main, [["styles", [_style_0]], ["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-translate/tm-translate.vue"]]);
export { tmTranslate as t };
