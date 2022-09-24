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
import { defineComponent, ref, getCurrentInstance, inject, computed, watch, onMounted, openBlock, createBlock, unref, isRef, withCtx, createVNode, createElementVNode, withModifiers, normalizeStyle, normalizeClass, createElementBlock, createCommentVNode, renderSlot, nextTick } from "vue";
import { t as tmTranslate } from "./tm-translate.js";
import { _ as _export_sfc, c as custom_props, u as useTmpiniaStore, b as computedStyle, d as computedClass, e as computedDark, f as computedTheme, a as tmText } from "./tm-text.js";
import { t as tmIcon } from "./tm-icon.js";
import { t as tmOverlay } from "./tm-overlay.js";
var _style_0 = { "flex-left-custom": { "": { "display": "flex", "justifyContent": "flex-start", "alignItems": "flex-start" } }, "flex-right-custom": { "": { "display": "flex", "justifyContent": "flex-start", "alignItems": "flex-end" } }, "flex-top-custom": { "": { "display": "flex", "justifyContent": "flex-start", "alignItems": "flex-start" } }, "flex-end-custom": { "": { "display": "flex", "justifyContent": "flex-end", "alignItems": "flex-end" } }, "flex-center-custom": { "": { "display": "flex", "justifyContent": "center", "alignItems": "center", "flexDirection": "row" } } };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tm-drawer",
  props: __spreadProps(__spreadValues({}, custom_props), {
    mask: {
      type: [Boolean, String],
      default: true
    },
    placement: {
      type: String,
      default: "bottom"
    },
    show: {
      type: [Boolean],
      default: false
    },
    width: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 600
    },
    round: {
      type: Number,
      default: 12
    },
    duration: {
      type: Number,
      default: 300
    },
    overlayClick: {
      type: Boolean,
      default: true
    },
    transprent: {
      type: [Boolean, String],
      default: false
    },
    closeable: {
      type: [Boolean, String],
      default: false
    },
    color: {
      type: String,
      default: "white"
    },
    title: [String],
    okText: {
      type: [String],
      default: "\u5B8C\u6210"
    },
    okColor: {
      type: [String],
      default: "primary"
    },
    okLoading: {
      type: [Boolean, String],
      default: false
    },
    cancelText: {
      type: [String],
      default: "\u53D6\u6D88"
    },
    hideCancel: {
      type: [Boolean, String],
      default: false
    },
    hideHeader: {
      type: [Boolean, String],
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: [Number, String],
      default: 401
    },
    unit: {
      type: String,
      default: "rpx"
    },
    disabbleScroll: {
      type: Boolean,
      default: false
    }
  }),
  emits: ["click", "open", "close", "update:show", "ok", "cancel"],
  setup(__props, { expose, emit: emits }) {
    var _a, _b;
    const props = __props;
    const drawerANI = ref(null);
    const overlayAni = ref(null);
    const store = useTmpiniaStore();
    (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const sysinfo = inject("tmuiSysInfo", computed(() => {
      return { bottom: 0, height: 750, width: uni.upx2px(750), top: 0, isCustomHeader: false, sysinfo: null };
    }));
    const tmcfg = computed(() => store.tmStore);
    const customCSSStyle = computed(() => computedStyle(props));
    const customClass = computed(() => computedClass(props));
    const isDark = computed(() => computedDark(props, tmcfg.value));
    const tmcomputed = computed(() => computedTheme(props, isDark.value, tmcfg.value));
    const syswidth = computed(() => sysinfo.value.width);
    const sysheight = computed(() => sysinfo.value.height);
    const reverse = ref(true);
    const timeid = ref(0);
    let timerId = NaN;
    let timerIdth_flas = false;
    uni.hideKeyboard();
    let _show = ref(props.show);
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
    function throttle(func, wait = 500, immediate = true) {
      if (immediate) {
        if (!timerIdth_flas) {
          timerIdth_flas = true;
          typeof func === "function" && func();
          setTimeout(() => {
            timerIdth_flas = false;
          }, wait);
        }
      } else {
        if (!timerIdth_flas) {
          timerIdth_flas = true;
          setTimeout(() => {
            timerIdth_flas = false;
            typeof func === "function" && func();
          }, wait);
        }
      }
    }
    timeid.value = uni.$tm.u.getUid(4);
    if (_show.value) {
      reverse.value = false;
    }
    watch(() => props.show, (val) => {
      _show.value = props.show;
      if (val) {
        reverse.value = true;
      } else {
        reverse.value = false;
      }
    });
    onMounted(() => {
      if (_show.value) {
        open();
      }
    });
    const ok_loading = computed(() => props.okLoading);
    const round_rp = computed(() => {
      if (aniname.value == "left")
        return "round-r-" + props.round;
      if (aniname.value == "right")
        return "round-l-" + props.round;
      if (aniname.value == "up")
        return "round-b-" + props.round;
      if (aniname.value == "down")
        return "round-t-" + props.round;
      if (aniname.value == "zoom")
        return "round-" + props.round;
    });
    const reverse_rp = computed(() => {
      if (aniname.value != "zoom")
        return reverse.value;
      return !reverse.value;
    });
    const aniname = computed(() => {
      if (props.placement == "center")
        return "zoom";
      if (props.placement == "top")
        return "up";
      if (props.placement == "bottom")
        return "down";
      return props.placement;
    });
    const anwidth = computed(() => {
      if (aniname.value == "zoom") {
        return props.width + props.unit;
      }
      if (props.placement == "left" || props.placement == "right") {
        return props.width + props.unit;
      }
      return syswidth.value + "px";
    });
    const anheight = computed(() => {
      let wucha = 0;
      if (props.placement == "top" || props.placement == "bottom" || aniname.value == "zoom") {
        return props.height + wucha + props.unit;
      }
      return sysheight.value + "px";
    });
    const contentHeight = computed(() => {
      let base_height = props.hideHeader ? 0 : 44;
      if (props.placement == "top" || props.placement == "bottom" || aniname.value == "zoom") {
        let h = props.height;
        if (props.unit == "rpx") {
          h = uni.upx2px(props.height);
        }
        return h - base_height + "px";
      }
      return sysheight.value - base_height + "px";
    });
    const align_rp = computed(() => {
      if (aniname.value == "down") {
        return "flex-col-bottom-center";
      }
      if (aniname.value == "up") {
        return "flex-top-custom";
      }
      if (aniname.value == "left") {
        return "flex-row-top-start";
      }
      if (aniname.value == "right") {
        return "flex-row-bottom-start";
      }
      if (aniname.value == "zoom") {
        return "flex-center";
      }
    });
    function OverLayOpen() {
      nextTick(function() {
        var _a2;
        (_a2 = drawerANI.value) == null ? void 0 : _a2.play();
      });
      emits("open");
      emits("update:show", true);
      _show.value = true;
    }
    function overclose() {
      nextTick(() => {
        emits("close");
        emits("update:show", false);
        _show.value = false;
      });
    }
    function overlayClickFun(e) {
      emits("click", e);
      if (!props.overlayClick || props.disabled || !overlayAni.value)
        return;
      reverse.value = false;
      throttle(() => {
        var _a2, _b2;
        (_a2 = overlayAni.value) == null ? void 0 : _a2.close();
        (_b2 = drawerANI.value) == null ? void 0 : _b2.play();
      }, props.duration + 80, true);
    }
    function ok() {
      if (props.disabled)
        return;
      reverse.value = false;
      debounce(() => {
        var _a2, _b2;
        emits("ok");
        (_a2 = overlayAni.value) == null ? void 0 : _a2.close();
        (_b2 = drawerANI.value) == null ? void 0 : _b2.play();
      }, 500, true);
    }
    function cancel() {
      if (props.disabled)
        return;
      reverse.value = false;
      debounce(() => {
        var _a2, _b2;
        emits("cancel");
        (_a2 = overlayAni.value) == null ? void 0 : _a2.close();
        (_b2 = drawerANI.value) == null ? void 0 : _b2.play();
      }, 500, true);
    }
    function open() {
      reverse.value = true;
      _show.value = true;
    }
    function close() {
      var _a2, _b2;
      reverse.value = false;
      (_a2 = overlayAni.value) == null ? void 0 : _a2.close();
      (_b2 = drawerANI.value) == null ? void 0 : _b2.play();
    }
    expose({
      close,
      open
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(tmOverlay, {
        ref_key: "overlayAni",
        ref: overlayAni,
        duration: props.duration + 80,
        onOpen: OverLayOpen,
        onClose: overclose,
        zIndex: props.zIndex,
        transprent: !props.mask,
        onClick: overlayClickFun,
        align: unref(align_rp),
        overlayClick: false,
        show: unref(_show),
        "onUpdate:show": _cache[1] || (_cache[1] = ($event) => isRef(_show) ? _show.value = $event : _show = $event)
      }, {
        default: withCtx(() => [
          createVNode(tmTranslate, {
            reverse: unref(reverse_rp),
            width: unref(anwidth),
            height: unref(anheight),
            ref_key: "drawerANI",
            ref: drawerANI,
            "auto-play": false,
            name: unref(aniname),
            duration: props.duration
          }, {
            default: withCtx(() => [
              createElementVNode("view", {
                onClick: _cache[0] || (_cache[0] = withModifiers(($event) => $event.stopPropagation(), ["stop"])),
                style: normalizeStyle([
                  { width: unref(anwidth), height: unref(anheight) },
                  !props.transprent ? unref(tmcomputed).borderCss : "",
                  !props.transprent ? unref(tmcomputed).backgroundColorCss : "",
                  !props.transprent ? unref(tmcomputed).shadowColor : "",
                  unref(customCSSStyle)
                ]),
                class: normalizeClass([unref(round_rp), "flex flex-col overflow ", unref(customClass)])
              }, [
                !props.closeable && !props.hideHeader ? (openBlock(), createElementBlock("view", {
                  key: 0,
                  class: "flex flex-row flex-row-center-center flex-between px-24",
                  style: { "height": "44px" }
                }, [
                  createElementVNode("view", { class: "flex-4 flex-shrink" }, [
                    !props.hideCancel ? (openBlock(), createBlock(tmText, {
                      key: 0,
                      onClick: cancel,
                      label: props.cancelText
                    }, null, 8, ["label"])) : createCommentVNode("v-if", true)
                  ]),
                  createElementVNode("view", { class: "flex-8 px-32 flex-center" }, [
                    renderSlot(_ctx.$slots, "title", {}, () => [
                      createVNode(tmText, {
                        _class: "text-overflow-1 opacity-7",
                        label: props.title
                      }, null, 8, ["label"])
                    ])
                  ]),
                  createElementVNode("view", { class: "flex-4 flex-shrink flex-row flex-row-center-end" }, [
                    !unref(ok_loading) ? (openBlock(), createBlock(tmText, {
                      key: 0,
                      color: __props.okColor,
                      onClick: ok,
                      dark: props.dark,
                      label: props.okText
                    }, null, 8, ["color", "dark", "label"])) : createCommentVNode("v-if", true),
                    unref(ok_loading) ? (openBlock(), createBlock(tmIcon, {
                      key: 1,
                      color: __props.okColor,
                      spin: unref(ok_loading),
                      dark: unref(isDark),
                      _class: unref(isDark) !== true ? "opacity-4" : "",
                      fontSize: 34,
                      name: unref(ok_loading) ? "tmicon-jiazai_dan" : "tmicon-times-circle-fill"
                    }, null, 8, ["color", "spin", "dark", "_class", "name"])) : createCommentVNode("v-if", true)
                  ])
                ])) : createCommentVNode("v-if", true),
                props.closeable && !props.hideHeader ? (openBlock(), createElementBlock("view", {
                  key: 1,
                  class: "flex flex-row flex-row-center-center flex-between px-24",
                  style: { "height": "44px" }
                }, [
                  createElementVNode("view", { class: "flex-9 pr-32" }, [
                    renderSlot(_ctx.$slots, "title", {}, () => [
                      createVNode(tmText, {
                        _class: "text-overflow-1 opacity-7",
                        dark: props.dark,
                        label: props.title
                      }, null, 8, ["dark", "label"])
                    ])
                  ]),
                  createElementVNode("view", { class: "flex-3 flex-shrink flex-row flex-row-center-end" }, [
                    createVNode(tmIcon, {
                      onClick: cancel,
                      dark: props.dark,
                      _class: unref(isDark) !== true ? "opacity-3" : "",
                      fontSize: 36,
                      name: "tmicon-times-circle-fill"
                    }, null, 8, ["dark", "_class"])
                  ])
                ])) : createCommentVNode("v-if", true),
                createElementVNode("scroll-view", {
                  scrollY: !props.disabbleScroll,
                  style: normalizeStyle([{ height: unref(contentHeight) }]),
                  class: "overflow"
                }, [
                  renderSlot(_ctx.$slots, "default")
                ], 12, ["scrollY"])
              ], 6)
            ]),
            _: 3
          }, 8, ["reverse", "width", "height", "name", "duration"])
        ]),
        _: 3
      }, 8, ["duration", "zIndex", "transprent", "align", "show"]);
    };
  }
});
var tmDrawer = /* @__PURE__ */ _export_sfc(_sfc_main, [["styles", [_style_0]], ["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-drawer/tm-drawer.vue"]]);
export { tmDrawer as t };
