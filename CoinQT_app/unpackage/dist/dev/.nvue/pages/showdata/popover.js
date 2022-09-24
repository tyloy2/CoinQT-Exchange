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
import { defineComponent, getCurrentInstance, ref, inject, computed, onUpdated, onMounted, watch, openBlock, createElementBlock, unref, withModifiers, isRef, normalizeStyle, createCommentVNode, createElementVNode, normalizeClass, renderSlot, createVNode, withCtx, createBlock, nextTick } from "vue";
import { _ as _export_sfc, c as custom_props, r as requireNativePlugin, a as tmText, t as tmApp } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmTranslate } from "../../tm-translate.js";
import { t as tmDivider } from "../../tm-divider.js";
import "pinia";
var _style_0 = { "popover-tcc": { "": { "transform": "translateY(-15rpx)" } }, "popover-bcc": { "": { "transform": "translateY(15rpx)" } }, "popover-tr": { "": { "display": "flex", "justifyContent": "flex-start", "alignItems": "flex-start" } } };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "tm-popover",
  props: __spreadProps(__spreadValues({}, custom_props), {
    shadow: {
      type: Number,
      default: 0
    },
    border: {
      type: [Number, String],
      default: 0
    },
    round: {
      type: [Number, String],
      default: 3
    },
    transprent: {
      type: [Boolean, String],
      default: false
    },
    color: {
      type: String,
      default: "white"
    },
    width: {
      type: Number,
      default: 0
    },
    position: {
      type: String,
      default: "tc"
    },
    label: {
      type: String,
      default: "\u63D0\u793A\u5185\u5BB9"
    }
  }),
  setup(__props) {
    var _a, _b;
    const props = __props;
    const dom = requireNativePlugin("dom");
    const proxy = (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const aniDom = ref(null);
    const sysinfo = inject("tmuiSysInfo", computed(() => {
      return { bottom: 0, height: 750, width: uni.upx2px(750), top: 0, isCustomHeader: false, sysinfo: null };
    }));
    const windowWidth = computed(() => sysinfo.value.width);
    const windowHeight = computed(() => sysinfo.value.height);
    let isNvue = ref(false);
    isNvue.value = true;
    let timeid = ref(uni.$tm.u.getUid(5));
    let show = ref(false);
    let domNvuePosCss = ref({
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
      width: 0,
      height: 0
    });
    let domNvueContentCss = ref({
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
      width: 0,
      height: 0
    });
    const tarnslateName = computed(() => {
      if (props.position == "bc" || props.position == "bl" || props.position == "br")
        return "up";
      return "down";
    });
    function nvueDomPos() {
      try {
        nextTick(function() {
          dom.getComponentRect(proxy == null ? void 0 : proxy.$refs.popver, function(res) {
            domNvuePosCss.value = __spreadValues({}, res.size);
          });
          dom.getComponentRect(proxy == null ? void 0 : proxy.$refs.content, function(res) {
            if (res == null ? void 0 : res.size) {
              domNvueContentCss.value = __spreadValues({}, res.size);
            }
          });
        });
      } catch (e) {
      }
    }
    onUpdated(() => {
      if (domNvuePosCss.value.width == 0 || !domNvueContentCss.value.height) {
        nvueDomPos();
      }
    });
    onMounted(() => nvueDomPos());
    watch(() => show.value, () => {
      clearTimeout(timeid.value);
      if (show.value == true) {
        setTimeout(function() {
          var _a2;
          (_a2 = aniDom.value) == null ? void 0 : _a2.play();
        }, 80);
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        class: "flex flex-row relative",
        renderWhole: true
      }, [
        unref(show) ? (openBlock(), createElementBlock("view", {
          key: 0,
          onClick: _cache[0] || (_cache[0] = withModifiers(($event) => isRef(show) ? show.value = false : show = false, ["stop"])),
          class: "l-0 t-0 fixed zIndex-9",
          style: normalizeStyle([{ width: unref(windowWidth) + "px", height: unref(windowHeight) + "px", background: "rgba(0,0,0,0)" }])
        }, null, 4)) : createCommentVNode("v-if", true),
        createElementVNode("view", {
          class: normalizeClass(["flex flex-col", [
            props.position == "tc" ? "popover-tc" : "",
            props.position == "tl" ? "popover-tl" : "",
            props.position == "tr" ? "popover-tr" : "",
            props.position == "bc" ? "popover-bc" : "",
            props.position == "bl" ? "popover-bl" : "",
            props.position == "br" ? "popover-br" : ""
          ]])
        }, [
          createElementVNode("view", {
            onClick: _cache[1] || (_cache[1] = ($event) => isRef(show) ? show.value = true : show = true),
            class: "relative zIndex-1 flex flex-row"
          }, [
            createElementVNode("view", {
              userInteractionEnabled: false,
              eventPenetrationEnabled: true,
              ref: "popver",
              class: "flex flex-row"
            }, [
              renderSlot(_ctx.$slots, "default")
            ], 512)
          ]),
          unref(show) ? (openBlock(), createElementBlock("view", {
            key: 0,
            class: normalizeClass(["zIndex-10", [
              unref(isNvue) ? "fixed" : "absolute",
              props.position == "tc" || props.position == "tl" || props.position == "tr" ? "popover-tcc" : "",
              props.position == "bc" || props.position == "bl" || props.position == "br" ? "popover-bcc" : ""
            ]]),
            style: normalizeStyle([
              unref(isNvue) && props.position == "tc" ? {
                top: unref(domNvuePosCss).top - unref(domNvueContentCss).height + "px",
                left: unref(domNvuePosCss).left + unref(domNvuePosCss).width / 2 - unref(domNvueContentCss).width / 2 + "px"
              } : "",
              unref(isNvue) && props.position == "tl" ? {
                top: unref(domNvuePosCss).top - unref(domNvueContentCss).height + "px",
                left: unref(domNvuePosCss).left + "px"
              } : "",
              unref(isNvue) && props.position == "tr" ? {
                top: unref(domNvuePosCss).top - unref(domNvueContentCss).height + "px",
                left: unref(domNvuePosCss).right - unref(domNvueContentCss).width + "px"
              } : "",
              unref(isNvue) && props.position == "bc" ? {
                top: unref(domNvuePosCss).bottom + "px",
                left: unref(domNvuePosCss).left + unref(domNvuePosCss).width / 2 - unref(domNvueContentCss).width / 2 + "px"
              } : "",
              unref(isNvue) && props.position == "bl" ? {
                top: unref(domNvuePosCss).bottom + "px",
                left: unref(domNvuePosCss).left + "px"
              } : "",
              unref(isNvue) && props.position == "br" ? {
                top: unref(domNvuePosCss).bottom + "px",
                left: unref(domNvuePosCss).right - unref(domNvueContentCss).width + "px"
              } : ""
            ]),
            ref: "content"
          }, [
            createVNode(tmTranslate, {
              ref_key: "aniDom",
              ref: aniDom,
              reverse: "",
              name: unref(tarnslateName),
              duration: 120,
              autoPlay: !unref(isNvue)
            }, {
              default: withCtx(() => [
                createElementVNode("view", {
                  class: normalizeClass(["flex flex-col", [
                    props.position == "tc" ? "flex-col-center-center" : "",
                    props.position == "tl" ? "flex-col-top-start" : "",
                    props.position == "tr" ? "flex-col-bottom-end" : "",
                    props.position == "bc" ? "flex-col-center-center" : "",
                    props.position == "bl" ? "flex-col-top-start" : "",
                    props.position == "br" ? "flex-col-bottom-end" : ""
                  ]]),
                  style: normalizeStyle([props.width ? { width: props.width + "rpx" } : ""])
                }, [
                  props.position == "bc" || props.position == "bl" || props.position == "br" ? (openBlock(), createBlock(tmSheet, {
                    key: 0,
                    text: props.text,
                    color: props.color,
                    _class: props._class,
                    followTheme: props.followTheme,
                    dark: props.dark,
                    round: 0,
                    shadow: props.shadow,
                    outlined: props.outlined,
                    border: props.border,
                    borderStyle: props.borderStyle,
                    borderDirection: props.borderDirection,
                    transprent: props.transprent,
                    linear: props.linear,
                    linearDeep: props.linearDeep,
                    _style: [
                      { zIndex: 1 },
                      props.position == "bc" ? { transform: " rotate(45deg)", bottom: "-10rpx", marginRight: "0rpx" } : {},
                      props.position == "bl" ? { transform: " rotate(45deg)", bottom: "-12rpx", marginLeft: "12rpx" } : {},
                      props.position == "br" ? { transform: " rotate(45deg)", bottom: "-12rpx", marginRight: "12rpx" } : {}
                    ],
                    margin: [0, 0],
                    padding: [0, 0],
                    width: 20,
                    height: 20
                  }, null, 8, ["text", "color", "_class", "followTheme", "dark", "shadow", "outlined", "border", "borderStyle", "borderDirection", "transprent", "linear", "linearDeep", "_style"])) : createCommentVNode("v-if", true),
                  createVNode(tmSheet, {
                    text: props.text,
                    color: props.color,
                    _class: "flex-col flex-col flex-col-center-center",
                    _style: [{ zIndex: 2, position: "relative" }],
                    followTheme: props.followTheme,
                    dark: props.dark,
                    round: props.round,
                    shadow: props.shadow,
                    outlined: props.outlined,
                    border: props.border,
                    borderStyle: props.borderStyle,
                    borderDirection: props.borderDirection,
                    transprent: props.transprent,
                    linear: props.linear,
                    linearDeep: props.linearDeep,
                    margin: [0, 0],
                    padding: [16, 12]
                  }, {
                    default: withCtx(() => [
                      createVNode(tmText, {
                        "font-size": 24,
                        _style: "line-height:normal;",
                        _class: [props.width ? "" : "nowrap  "],
                        label: props.label
                      }, null, 8, ["_class", "label"])
                    ]),
                    _: 1
                  }, 8, ["text", "color", "followTheme", "dark", "round", "shadow", "outlined", "border", "borderStyle", "borderDirection", "transprent", "linear", "linearDeep"]),
                  props.position == "tc" || props.position == "tl" || props.position == "tr" ? (openBlock(), createBlock(tmSheet, {
                    key: 1,
                    text: props.text,
                    color: props.color,
                    _class: props._class,
                    followTheme: props.followTheme,
                    dark: props.dark,
                    round: 0,
                    shadow: props.shadow,
                    outlined: props.outlined,
                    border: props.border,
                    borderStyle: props.borderStyle,
                    borderDirection: props.borderDirection,
                    transprent: props.transprent,
                    linear: props.linear,
                    linearDeep: props.linearDeep,
                    _style: [
                      { zIndex: 1 },
                      props.position == "tc" ? { transform: " rotate(45deg)", top: "-12rpx" } : {},
                      props.position == "tl" ? { transform: " rotate(45deg)", top: "-12rpx", marginLeft: "12rpx" } : {},
                      props.position == "tr" ? { transform: " rotate(45deg)", top: "-12rpx", marginRight: "12rpx" } : {}
                    ],
                    margin: [0, 0],
                    padding: [0, 0],
                    width: 20,
                    height: 20
                  }, null, 8, ["text", "color", "_class", "followTheme", "dark", "shadow", "outlined", "border", "borderStyle", "borderDirection", "transprent", "linear", "linearDeep", "_style"])) : createCommentVNode("v-if", true)
                ], 6)
              ]),
              _: 1
            }, 8, ["name", "autoPlay"])
          ], 6)) : createCommentVNode("v-if", true)
        ], 2)
      ]);
    };
  }
});
var tmPopover = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["styles", [_style_0]], ["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-popover/tm-popover.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "popover",
  setup(__props) {
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
                createElementVNode("view", { class: "flex flex-row" }, [
                  createElementVNode("view", { class: "mx-32" }, [
                    createVNode(tmPopover, { position: "tl" }, {
                      default: withCtx(() => [
                        createVNode(tmText, { label: "\u6C7D\u6CE1\u4E0A\u5DE6" })
                      ]),
                      _: 1
                    })
                  ]),
                  createElementVNode("view", { class: "mx-32" }, [
                    createVNode(tmPopover, { color: "red" }, {
                      default: withCtx(() => [
                        createVNode(tmText, { label: "\u6C7D\u6CE1\u4E0A\u4E2D" })
                      ]),
                      _: 1
                    })
                  ]),
                  createElementVNode("view", { class: "mx-32" }, [
                    createVNode(tmPopover, {
                      position: "tr",
                      color: "primary",
                      text: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(tmText, { label: "\u6C7D\u6CE1\u4E0A\u53F3" })
                      ]),
                      _: 1
                    })
                  ])
                ])
              ]),
              _: 1
            }),
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: "\u4E0D\u540C\u7684\u4F4D\u7F6E\uFF0C\u989C\u8272\u6E10\u53D8\u7B49\u5341\u4F59\u79CD\u5C5E\u6027\u89C1\u6587\u6863"
                }),
                createVNode(tmDivider),
                createElementVNode("view", { class: "flex flex-row" }, [
                  createElementVNode("view", { class: "mx-32" }, [
                    createVNode(tmPopover, {
                      position: "bl",
                      linear: "bottom",
                      color: "green"
                    }, {
                      default: withCtx(() => [
                        createVNode(tmText, { label: "\u6C7D\u6CE1\u5E95\u5DE6" })
                      ]),
                      _: 1
                    })
                  ]),
                  createElementVNode("view", { class: "mx-32" }, [
                    createVNode(tmPopover, {
                      position: "bc",
                      color: "black"
                    }, {
                      default: withCtx(() => [
                        createVNode(tmText, { label: "\u6C7D\u6CE1\u5E95\u4E2D" })
                      ]),
                      _: 1
                    })
                  ]),
                  createElementVNode("view", { class: "mx-32" }, [
                    createVNode(tmPopover, {
                      position: "br",
                      color: "primary"
                    }, {
                      default: withCtx(() => [
                        createVNode(tmText, { label: "\u6C7D\u6CE1\u5E95\u53F3" })
                      ]),
                      _: 1
                    })
                  ])
                ])
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
var popover = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/showdata/popover.nvue"]]);
export { popover as default };
