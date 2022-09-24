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
import { defineComponent, computed, ref, getCurrentInstance, onUpdated, onMounted, nextTick, openBlock, createElementBlock, createElementVNode, normalizeStyle, renderSlot, withModifiers, normalizeClass, unref, createVNode, createCommentVNode, withCtx } from "vue";
import { _ as _export_sfc, c as custom_props, u as useTmpiniaStore, r as requireNativePlugin, e as computedDark, a as tmText, t as tmApp } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmImage } from "../../tm-image.js";
import { t as tmDivider } from "../../tm-divider.js";
import { t as tmIcon } from "../../tm-icon.js";
import "pinia";
import "../../tm-translate.js";
var _style_0 = { "lightBg": { "": { "backgroundImage": "linear-gradient(to top, rgba(255, 255, 255, 1) 30%, rgba(255, 255, 255, 0.7) 50%)" } }, "darkBg": { "": { "backgroundImage": "linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))" } } };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "tm-more",
  props: __spreadProps(__spreadValues({}, custom_props), {
    height: {
      type: Number,
      default: 250
    },
    openLabel: {
      type: String,
      default: "\u6536\u8D77\u66F4\u591A"
    },
    closeLabel: {
      type: String,
      default: "\u5C55\u5F00\u66F4\u591A"
    },
    beforeOpen: {
      type: [Function, Boolean],
      default: () => false
    }
  }),
  emits: ["change"],
  setup(__props, { emit: emits }) {
    var _a, _b;
    const props = __props;
    const store = useTmpiniaStore();
    const dom = requireNativePlugin("dom");
    const tmcfg = computed(() => store.tmStore);
    const isDark = computed(() => computedDark(props, tmcfg.value));
    const isInit = ref(false);
    const proxy = (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const css_is_nvue = ref(true);
    const css_nvue_size = ref([0, 0]);
    const isOpen = ref(false);
    const fontColor = computed(() => {
      if (isDark.value && !isOpen.value)
        return "white";
      if (isDark.value && isOpen.value)
        return "grey";
      return "black";
    });
    const isMaxheight = ref(false);
    const maxHeight = computed(() => uni.upx2px(props.height));
    async function open() {
      if (typeof props.beforeOpen === "function") {
        let p = await props.beforeOpen().catch((e) => {
        });
        if (typeof p === "function") {
          p = await p();
        }
        if (!p)
          return;
      }
      isOpen.value = !isOpen.value;
      emits("change", isOpen.value);
    }
    onUpdated(() => {
      nvuegetClientRect();
    });
    onMounted(() => {
      nvuegetClientRect();
    });
    function nvuegetClientRect() {
      nextTick(function() {
        dom.getComponentRect(proxy == null ? void 0 : proxy.$refs.contentbody, function(res) {
          if (res == null ? void 0 : res.size) {
            css_nvue_size.value = [res.size.width, res.size.height];
            if (res.size.height >= maxHeight.value) {
              isMaxheight.value = true;
            }
            if (res.size.height == 0) {
              nvuegetClientRect();
            } else {
              isInit.value = true;
            }
          }
        });
      });
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        class: "flex flex-col",
        renderWhole: true
      }, [
        createElementVNode("view", {
          class: "flex-1 flex flex-col relative contentbody overflow",
          ref: "contentbody",
          style: normalizeStyle([
            isMaxheight.value && !isOpen.value ? { height: props.height + "rpx" } : "",
            !isInit.value ? { transform: "translateX(-1000px)" } : { transform: "translateX(0px)" }
          ])
        }, [
          renderSlot(_ctx.$slots, "default")
        ], 4),
        isMaxheight.value ? (openBlock(), createElementBlock("view", {
          key: 0,
          onClick: withModifiers(open, ["stop"]),
          class: normalizeClass(["flex zIndex-10 flex-row flex-row-bottom-center py-24", [
            !css_is_nvue.value && !isOpen.value ? "fulled-height" : "",
            isOpen.value ? "" : unref(isDark) ? "darkBg absolute" : "lightBg absolute"
          ]]),
          style: normalizeStyle([
            !css_is_nvue.value ? { width: "100%" } : "",
            css_is_nvue.value && !isOpen.value ? { width: css_nvue_size.value[0] + "px", height: css_nvue_size.value[1] + "px" } : ""
          ])
        }, [
          renderSlot(_ctx.$slots, "more", {}, () => [
            createVNode(tmIcon, {
              userInteractionEnabled: false,
              "font-size": 24,
              color: unref(fontColor),
              name: isOpen.value ? "tmicon-angle-up" : "tmicon-angle-down"
            }, null, 8, ["color", "name"]),
            createVNode(tmText, {
              userInteractionEnabled: false,
              "font-size": 24,
              color: unref(fontColor),
              _class: "px-16",
              label: isOpen.value ? props.openLabel : props.closeLabel
            }, null, 8, ["color", "label"])
          ])
        ], 14, ["onClick"])) : createCommentVNode("v-if", true)
      ]);
    };
  }
});
var tmMore = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["styles", [_style_0]], ["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-more/tm-more.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "more",
  setup(__props) {
    const text = "\u82F1\u56FD\u5E7F\u64AD\u516C\u53F8\uFF08BBC\uFF0924\u65E5\u518D\u6B21\u201C\u7206\u6599\u201D\uFF0C\u79F0\u9ED1\u5BA2\u4ECE\u65B0\u7586\u8B66\u65B9\u7535\u5B58\u6570\u636E\uFF0C\u5176\u4E2D\u5305\u62EC\u201C\u5B58\u6570\u636E\uFF0C\u5176\u4E2D\u5305\u62EC\u201C\u5B58\u6570\u636E\uFF0C\u5176\u4E2D\u5305\u62EC\u201C\u5B58\u6570\u636E\uFF0C\u5176\u4E2D\u5305\u62EC\u201C\u8111\u670D\u52A1\u5668\u4E2D\u83B7\u53D6\u4E86\u5927\u91CF\u7F13\u5B58\u6570\u636E\uFF0C\u5176\u4E2D\u5305\u62EC\u201C\u518D\u6559\u80B2\u4E2D\u5FC3\u201D\u201C\u56DA\u72AF\u201D\u7167\u7247\u3002\u8BE5\u62A5\u9053\u521A\u521A\u53D1\u51FA\uFF0C\u7F8E\u56FD\u56FD\u52A1\u9662\u548C\u82F1\u56FD\u5916\u4EA4\u90E8\u5C31\u4E00\u9F50\u4E0A\u9635\uFF0C\u5938\u5F20\u5730\u8868\u793A\u201C\u9707\u60CA\u201D\u548C\u201C\u6124\u6168\u201D\u3002\u4E0D\u5F97\u4E0D\u8BF4\uFF0C\u5728\u7F16\u9020\u6D89\u7586\u8C0E\u8A00\u65B9\u9762\uFF0C\u7F8E\u897F\u65B9\u8206\u8BBA\u548C\u653F\u5BA2\u7684\u76F8\u4E92\u914D\u5408\uFF0C\u5DF2\u7ECF\u719F\u7EC3\u5230\u201C\u808C\u8089\u8BB0\u5FC6\u201D\u7684\u7A0B\u5EA6\u3002";
    function beforeOpen() {
      uni.showLoading({ title: "..." });
      return new Promise((res, rej) => {
        setTimeout(function() {
          uni.hideLoading();
          rej();
          uni.showToast({ title: "\u4E0D\u5141\u8BB8\u9605\u8BFB", icon: "none" });
        }, 1500);
      });
    }
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
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: "\u57FA\u7840\u793A\u4F8B,\u66F4\u591A\u89C1\u6587\u6863"
                }),
                createVNode(tmDivider),
                createVNode(tmMore, null, {
                  default: withCtx(() => [
                    createVNode(tmText, { label: text })
                  ]),
                  _: 1
                }),
                createVNode(tmDivider),
                createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: "\u4E0B\u9762\u662F\u6253\u5F00\u524D\u7684\u52FE\u5B50\uFF0C\u4E0D\u5141\u8BB8\u67E5\u770B"
                }),
                createVNode(tmDivider),
                createVNode(tmMore, { beforeOpen }, {
                  default: withCtx(() => [
                    createVNode(tmImage, {
                      width: 636,
                      height: 120,
                      src: "https://picsum.photos/636/120"
                    }),
                    createVNode(tmText, { label: text })
                  ]),
                  _: 1
                })
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
var more = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/showdata/more.nvue"]]);
export { more as default };
