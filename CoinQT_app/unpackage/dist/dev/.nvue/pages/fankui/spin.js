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
import { defineComponent, getCurrentInstance, computed, ref, onUpdated, onMounted, nextTick, openBlock, createElementBlock, normalizeClass, unref, normalizeStyle, createElementVNode, renderSlot, withModifiers, createVNode, createCommentVNode, withCtx } from "vue";
import { _ as _export_sfc, c as custom_props, u as useTmpiniaStore, r as requireNativePlugin, b as computedStyle, d as computedClass, e as computedDark, a as tmText, t as tmApp } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmIcon } from "../../tm-icon.js";
import { t as tmDivider } from "../../tm-divider.js";
import { t as tmImage } from "../../tm-image.js";
import "pinia";
import "../../tm-translate.js";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "tm-spin",
  props: __spreadProps(__spreadValues({}, custom_props), {
    followTheme: {
      type: [Boolean, String],
      default: true
    },
    color: {
      type: String,
      default: "primary"
    },
    icon: {
      type: String,
      default: "tmicon-loading"
    },
    size: {
      type: Number,
      default: 60
    },
    bgColor: {
      type: String,
      default: "rgba(255,255,255,0.9)"
    },
    tip: {
      type: [String],
      defalut: ""
    },
    load: {
      type: [Boolean, String],
      default: false
    }
  }),
  emits: ["click"],
  setup(__props, { emit: emits }) {
    var _a, _b;
    const props = __props;
    const store = useTmpiniaStore();
    const dom = requireNativePlugin("dom");
    const proxy = (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const tmcfg = computed(() => store.tmStore);
    const customCSSStyle = computed(() => computedStyle(props));
    const customClass = computed(() => computedClass(props));
    const isDark = computed(() => computedDark(props, tmcfg.value));
    const css_is_nvue = ref(true);
    const css_nvue_size = ref([0, 0]);
    const bgColorComputed = computed(() => isDark.value ? "rgba(0,0,0,0.9)" : props.bgColor);
    const loadingComputed = computed(() => props.load);
    const _color = computed(() => props.color);
    onUpdated(() => {
      nvuegetClientRect();
    });
    onMounted(() => {
      nvuegetClientRect();
    });
    function nvuegetClientRect() {
      nextTick(function() {
        dom.getComponentRect(proxy.$refs.tmspin, function(res) {
          if (res == null ? void 0 : res.size) {
            css_nvue_size.value = [res.size.width, res.size.height];
            if (res.size.height == 0) {
              nvuegetClientRect();
            }
          }
        });
      });
    }
    function clickMask(e) {
      e.stopPropagation();
      emits("click", e);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        ref: "tmspin",
        class: normalizeClass([[unref(customClass)], "flex relative flex-col"]),
        style: normalizeStyle([unref(customCSSStyle)]),
        renderWhole: true
      }, [
        createElementVNode("view", { class: "relative zIndex-1" }, [
          renderSlot(_ctx.$slots, "default")
        ]),
        unref(loadingComputed) ? (openBlock(), createElementBlock("view", {
          key: 0,
          onClick: withModifiers(clickMask, ["stop"]),
          class: normalizeClass(["absolute zIndex-10 flex-center blur", [
            css_is_nvue.value ? "" : " fulled-height   "
          ]]),
          style: normalizeStyle([
            css_is_nvue.value ? "" : { width: "100%" },
            { backgroundColor: unref(bgColorComputed) },
            css_is_nvue.value ? { width: (css_nvue_size.value[0] || props.fontSize) + "px", height: (css_nvue_size.value[1] || props.fontSize) + "px" } : ""
          ])
        }, [
          createElementVNode("view", {
            userInteractionEnabled: false,
            class: "pa-10 flex-col flex-col-center-center"
          }, [
            createVNode(tmIcon, {
              spin: "",
              fontSize: props.size,
              dark: unref(isDark),
              color: unref(_color),
              followDark: _ctx.followDark,
              followTheme: props.followTheme,
              name: props.icon
            }, null, 8, ["fontSize", "dark", "color", "followDark", "followTheme", "name"]),
            createVNode(tmText, {
              followTheme: props.followTheme,
              dark: unref(isDark),
              followDark: _ctx.followDark,
              color: unref(_color),
              _class: "mt-16",
              label: props.tip
            }, null, 8, ["followTheme", "dark", "followDark", "color", "label"])
          ])
        ], 14, ["onClick"])) : createCommentVNode("v-if", true)
      ], 6);
    };
  }
});
var tmSpin = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-spin/tm-spin.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "spin",
  setup(__props) {
    getCurrentInstance();
    const load = ref(true);
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
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createVNode(tmText, {
                  fontSize: 24,
                  _class: "font-weight-b",
                  label: "\u57FA\u7840\u5C5E\u6027,\u66F4\u591A\u73A9\u6CD5\u8BF7\u524D\u5F80\u6587\u6863\u3002"
                }),
                createVNode(tmDivider),
                createVNode(tmSpin, {
                  load: load.value,
                  tip: "\u70B9\u6211\u53D6\u6D88\u52A0\u8F7D",
                  onClick: _cache[0] || (_cache[0] = ($event) => load.value = false)
                }, {
                  default: withCtx(() => [
                    createVNode(tmSheet, {
                      margin: [0, 0],
                      padding: [0, 0]
                    }, {
                      default: withCtx(() => [
                        createVNode(tmImage, {
                          src: "https://picsum.photos/620/150",
                          width: 636,
                          height: 150
                        }),
                        createVNode(tmText, { label: "\u52A0\u8F7D\u4E2D Spin\u53EF\u4EE5\u5E94\u7528\u4E8E\u4EFB\u4F55\u5143\u7D20\u4E2D\uFF0C\u5F53\u7136\u4F7F\u7528\u573A\u666F\u4E3B\u8981\u662F\u5C40\u90E8\u5185\u5BB9\u52A0\u8F7D\u53CD\u9988\u7B49\u7B49\u3002\u52A0\u8F7D\u4E2D Spin\u53EF\u4EE5\u5E94\u7528\u4E8E\u4EFB\u4F55\u5143\u7D20\u4E2D\uFF0C\u5F53\u7136\u4F7F\u7528\u573A\u666F\u4E3B\u8981\u662F\u5C40\u90E8\u5185\u5BB9\u52A0\u8F7D\u53CD\u9988\u7B49\u7B49\u3002" })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["load"])
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]);
    };
  }
});
var spin = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/fankui/spin.nvue"]]);
export { spin as default };
