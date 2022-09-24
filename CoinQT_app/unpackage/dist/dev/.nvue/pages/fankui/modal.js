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
import { _ as _export_sfc, c as custom_props, u as useTmpiniaStore, b as computedStyle, d as computedClass, e as computedDark, f as computedTheme, a as tmText, t as tmApp, g as formatAppLog } from "../../tm-text.js";
import { defineComponent, ref, getCurrentInstance, computed, watch, onMounted, openBlock, createBlock, unref, isRef, withCtx, createVNode, createElementVNode, withModifiers, normalizeStyle, normalizeClass, createCommentVNode, renderSlot, createElementBlock, nextTick } from "vue";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmTranslate } from "../../tm-translate.js";
import { t as tmIcon } from "../../tm-icon.js";
import { t as tmOverlay } from "../../tm-overlay.js";
import { t as tmDivider } from "../../tm-divider.js";
import { T as TmButton } from "../../tm-button.js";
import { t as tmImage } from "../../tm-image.js";
import "pinia";
var _style_0 = { "flex-left-custom": { "": { "display": "flex", "justifyContent": "flex-start", "alignItems": "flex-start" } }, "flex-right-custom": { "": { "display": "flex", "justifyContent": "flex-start", "alignItems": "flex-end" } }, "flex-top-custom": { "": { "display": "flex", "justifyContent": "flex-start", "alignItems": "flex-start" } }, "flex-end-custom": { "": { "display": "flex", "justifyContent": "flex-end", "alignItems": "flex-end" } }, "flex-center-custom": { "": { "display": "flex", "justifyContent": "center", "alignItems": "center", "flexDirection": "row" } } };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "tm-modal",
  props: __spreadProps(__spreadValues({}, custom_props), {
    mask: {
      type: [Boolean],
      default: false
    },
    border: {
      type: Number,
      default: 2
    },
    show: {
      type: [Boolean],
      default: false
    },
    width: {
      type: Number,
      default: 600
    },
    height: {
      type: Number,
      default: 450
    },
    round: {
      type: Number,
      default: 12
    },
    duration: {
      type: Number,
      default: 250
    },
    overlayClick: {
      type: Boolean,
      default: true
    },
    transprent: {
      type: [Boolean],
      default: false
    },
    closeable: {
      type: [Boolean],
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
    okLinear: {
      type: [String],
      default: ""
    },
    okLlinearDeep: {
      type: [String],
      default: "accent"
    },
    cancelColor: {
      type: [String],
      default: "primary"
    },
    cancelText: {
      type: [String],
      default: "\u53D6\u6D88"
    },
    cancelLinear: {
      type: [String],
      default: ""
    },
    cancelLlinearDeep: {
      type: [String],
      default: "accent"
    },
    btnRound: {
      type: Number,
      default: 24
    },
    hideCancel: {
      type: [Boolean],
      default: false
    },
    splitBtn: {
      type: Boolean,
      default: false
    },
    beforeClose: {
      type: Function,
      default: () => {
        return () => true;
      }
    },
    content: {
      type: String,
      default: ""
    },
    disabled: {
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
    const tmcfg = computed(() => store.tmStore);
    const customCSSStyle = computed(() => computedStyle(props));
    const customClass = computed(() => computedClass(props));
    const isDark = computed(() => computedDark(props, tmcfg.value));
    const tmcomputed = computed(() => computedTheme(props, isDark.value, tmcfg.value));
    const reverse = ref(true);
    let flag = false;
    uni.$tm.u.getUid(4);
    const okLoading = ref(false);
    let _show = ref(false);
    let timerId = NaN;
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
        if (!flag) {
          flag = true;
          typeof func === "function" && func();
          setTimeout(() => {
            flag = false;
          }, wait);
        }
      } else {
        if (!flag) {
          flag = true;
          setTimeout(() => {
            flag = false;
            typeof func === "function" && func();
          }, wait);
        }
      }
    }
    if (_show.value) {
      reverse.value = false;
    }
    watch(() => props.show, (val) => {
      if (val) {
        open();
      } else {
        close();
      }
    });
    onMounted(() => {
      if (_show.value) {
        open();
      }
    });
    const round_rp = computed(() => {
      return "round-" + props.round;
    });
    const reverse_rp = computed(() => {
      if (aniname.value != "zoom")
        return reverse.value;
      return !reverse.value;
    });
    const aniname = computed(() => {
      return "zoom";
    });
    const anwidth = computed(() => {
      return props.width + "rpx";
    });
    const anheight = computed(() => {
      return props.height + "rpx";
    });
    const contentHeight = computed(() => {
      let bas = 0;
      if (props.splitBtn) {
        bas = uni.upx2px(64);
      }
      return uni.upx2px(props.height) - 44 - uni.upx2px(90) - bas + "px";
    });
    const align_rp = computed(() => {
      return "flex-center";
    });
    async function ok() {
      if (props.disabled)
        return;
      debounce(async () => {
        if (typeof props.beforeClose === "function") {
          okLoading.value = true;
          let p = await props.beforeClose();
          if (typeof p === "function") {
            p = await p();
          }
          okLoading.value = false;
          if (!p)
            return;
        }
        emits("ok");
        close();
      }, 250, true);
    }
    function cancel() {
      if (props.disabled)
        return;
      if (okLoading.value)
        return;
      emits("cancel");
      close();
    }
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
    function open() {
      if (props.disabled)
        return;
      if (okLoading.value)
        return;
      if (_show.value == true)
        return;
      throttle(() => {
        var _a2;
        reverse.value = true;
        (_a2 = overlayAni.value) == null ? void 0 : _a2.open(true);
      }, props.duration, true);
    }
    function close() {
      var _a2, _b2;
      if (props.disabled)
        return;
      reverse.value = false;
      if (!drawerANI.value)
        return;
      (_a2 = overlayAni.value) == null ? void 0 : _a2.close();
      (_b2 = drawerANI.value) == null ? void 0 : _b2.play();
    }
    function overlayClickFun(e) {
      if (_show.value == false)
        return;
      emits("click", e);
      if (!props.overlayClick || props.disabled || okLoading.value || !overlayAni.value)
        return;
      reverse.value = false;
      throttle(() => {
        var _a2, _b2;
        (_a2 = overlayAni.value) == null ? void 0 : _a2.close();
        (_b2 = drawerANI.value) == null ? void 0 : _b2.play();
      }, props.duration, true);
    }
    expose({
      close,
      open
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(tmOverlay, {
        ref_key: "overlayAni",
        ref: overlayAni,
        blur: "",
        duration: props.duration,
        onClose: overclose,
        onOpen: OverLayOpen,
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
                createElementVNode("view", {
                  class: normalizeClass(["flex flex-row px-24", [props.closeable ? "flex-row-center-between" : "flex-center"]]),
                  style: { "height": "44px" }
                }, [
                  createVNode(tmText, {
                    dark: props.dark,
                    followTheme: false,
                    _class: "text-overflow-1 text-weight-b text-size-m",
                    class: "flex-center",
                    label: props.title
                  }, null, 8, ["dark", "label"]),
                  __props.closeable ? (openBlock(), createBlock(tmIcon, {
                    key: 0,
                    _class: "opacity-3",
                    name: "tmicon-times-circle-fill",
                    fontSize: 32,
                    onClick: close
                  })) : createCommentVNode("v-if", true)
                ], 2),
                createElementVNode("scroll-view", {
                  scrollY: "",
                  style: normalizeStyle([props.height ? { height: unref(contentHeight) } : ""])
                }, [
                  createElementVNode("view", { class: "px-32" }, [
                    renderSlot(_ctx.$slots, "default", {}, () => [
                      createVNode(tmText, {
                        "font-size": 30,
                        dark: props.dark,
                        followTheme: false,
                        label: props.content,
                        _style: "line-height:46rpx"
                      }, null, 8, ["dark", "label"])
                    ])
                  ])
                ], 4),
                createElementVNode("view", {
                  class: normalizeClass(["flex flex-row", [props.splitBtn ? "pa-32" : ""]])
                }, [
                  !props.hideCancel ? (openBlock(), createElementBlock("view", {
                    key: 0,
                    class: "flex-1 overflow",
                    style: { "height": "90rpx" }
                  }, [
                    createVNode(tmSheet, {
                      dark: props.dark,
                      followTheme: true,
                      isDisabledRoundAndriod: true,
                      onClick: cancel,
                      height: 90,
                      linear: props.cancelLinear,
                      linearDeep: props.cancelLlinearDeep,
                      text: "",
                      color: props.cancelColor,
                      _class: [
                        "flex-center overflow flex"
                      ],
                      "paren-class": props.splitBtn ? "round-" + props.btnRound : "round-bl-" + props.round,
                      margin: [0, 0],
                      padding: [0, 0]
                    }, {
                      default: withCtx(() => [
                        createVNode(tmText, {
                          _class: "text-weight-b",
                          _style: "line-height:90rpx",
                          onClick: withModifiers(cancel, ["stop"]),
                          dark: props.dark,
                          followTheme: false,
                          userInteractionEnabled: false,
                          label: props.cancelText
                        }, null, 8, ["onClick", "dark", "label"])
                      ]),
                      _: 1
                    }, 8, ["dark", "linear", "linearDeep", "color", "paren-class"])
                  ])) : createCommentVNode("v-if", true),
                  props.splitBtn && !props.hideCancel ? (openBlock(), createElementBlock("view", {
                    key: 1,
                    class: "overflow",
                    style: { "width": "24rpx" }
                  })) : createCommentVNode("v-if", true),
                  createElementVNode("view", {
                    class: normalizeClass(["flex-1 flex", [okLoading.value ? "opacity-5" : "", "overflow"]]),
                    style: { "height": "90rpx" }
                  }, [
                    createVNode(tmSheet, {
                      paretClass: "flex-1",
                      class: "flex-1",
                      dark: props.dark,
                      followTheme: true,
                      isDisabledRoundAndriod: true,
                      onClick: ok,
                      height: 90,
                      linear: props.okLinear,
                      linearDeep: props.okLlinearDeep,
                      color: props.okColor,
                      margin: [0, 0],
                      _class: [
                        "flex-center overflow"
                      ],
                      "paren-class": props.splitBtn ? "round-" + props.btnRound : "round-br-" + props.round,
                      padding: [0, 0]
                    }, {
                      default: withCtx(() => [
                        createElementVNode("view", {
                          userInteractionEnabled: false,
                          class: "flex flex-row"
                        }, [
                          okLoading.value ? (openBlock(), createElementBlock("view", {
                            key: 0,
                            class: "pr-10"
                          }, [
                            createVNode(tmIcon, {
                              userInteractionEnabled: false,
                              name: "tmicon-loading",
                              spin: ""
                            })
                          ])) : createCommentVNode("v-if", true),
                          createVNode(tmText, {
                            _class: "text-weight-b",
                            dark: props.dark,
                            userInteractionEnabled: false,
                            label: props.okText
                          }, null, 8, ["dark", "label"])
                        ])
                      ]),
                      _: 1
                    }, 8, ["dark", "linear", "linearDeep", "color", "paren-class"])
                  ], 2)
                ], 2)
              ], 6)
            ]),
            _: 3
          }, 8, ["reverse", "width", "height", "name", "duration"])
        ]),
        _: 3
      }, 8, ["duration", "align", "show"]);
    };
  }
});
var tmModal = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["styles", [_style_0]], ["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-modal/tm-modal.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "modal",
  setup(__props) {
    const modal2 = ref(null);
    const showWin = ref(false);
    const showWin1 = ref(false);
    const showWin2 = ref(false);
    const showWin3 = ref(false);
    function beforeClose() {
      return new Promise((res) => {
        setTimeout(() => {
          res(true);
        }, 1500);
      });
    }
    function test(e) {
      formatAppLog("log", "at pages/fankui/modal.nvue:54", "ok\u4E8B\u4EF6\u70B9\u51FB");
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
                  label: "\u4E0B\u9762\u662F\u57FA\u7840\u6F14\u793A\u5C5E\u6027,\u66F4\u591A\u73A9\u6CD5\u8BF7\u524D\u5F80\u6587\u6863\u3002"
                }),
                createVNode(tmDivider),
                createElementVNode("view", { class: "flex flex-row flex-wrap" }, [
                  createVNode(TmButton, {
                    margin: [12, 12],
                    onClick: _cache[0] || (_cache[0] = ($event) => showWin.value = true),
                    color: "white",
                    width: 120,
                    height: 56,
                    "font-size": 24,
                    label: "\u9ED8\u8BA4"
                  }),
                  createVNode(TmButton, {
                    margin: [12, 12],
                    onClick: _cache[1] || (_cache[1] = ($event) => showWin1.value = true),
                    color: "red",
                    width: 120,
                    height: 56,
                    "font-size": 24,
                    label: "\u5206\u79BB\u6309\u94AE"
                  }),
                  createVNode(TmButton, {
                    margin: [12, 12],
                    onClick: _cache[2] || (_cache[2] = ($event) => showWin2.value = true),
                    color: "orange",
                    width: 120,
                    height: 56,
                    "font-size": 24,
                    label: "\u4E2A\u6027\u5316"
                  }),
                  createVNode(TmButton, {
                    margin: [12, 12],
                    onClick: _cache[3] || (_cache[3] = ($event) => showWin3.value = true),
                    color: "pink",
                    width: 120,
                    height: 56,
                    "font-size": 24,
                    label: "\u5F02\u6B65\u5173\u95ED"
                  }),
                  createVNode(TmButton, {
                    margin: [12, 12],
                    onClick: _cache[4] || (_cache[4] = ($event) => modal2.value.open()),
                    color: "green",
                    width: 120,
                    height: 56,
                    "font-size": 24,
                    label: "Ref\u6253\u5F00"
                  })
                ])
              ]),
              _: 1
            }),
            createVNode(tmModal, {
              title: "\u4FE1\u606F\u6846",
              content: "\u4E3B\u4F53\u5185\u5BB9\u54E6",
              show: showWin.value,
              "onUpdate:show": _cache[5] || (_cache[5] = ($event) => showWin.value = $event)
            }, null, 8, ["show"]),
            createVNode(tmModal, {
              color: "white",
              okColor: "red",
              cancelColor: "red",
              okLinear: "left",
              splitBtn: "",
              title: "\u4FE1\u606F\u6846",
              content: "\u4E3B\u4F53\u5185\u5BB9\u54E6",
              show: showWin1.value,
              "onUpdate:show": _cache[6] || (_cache[6] = ($event) => showWin1.value = $event)
            }, null, 8, ["show"]),
            createVNode(tmModal, {
              ref_key: "modal",
              ref: modal2,
              color: "grey-5",
              height: 500,
              border: 0,
              text: "",
              okColor: "black",
              cancelColor: "white",
              linear: "bottom",
              title: "\u4FE1\u606F\u6846",
              show: showWin2.value,
              "onUpdate:show": _cache[7] || (_cache[7] = ($event) => showWin2.value = $event)
            }, {
              default: withCtx(() => [
                createElementVNode("view", null, [
                  createVNode(tmImage, {
                    src: "https://picsum.photos/450/150",
                    height: 150,
                    width: 450
                  }),
                  createVNode(tmText, { label: "\u4E3B\u4F53\u5185\u5BB9\u54E6\u4E3B\u4F53\u5185\u5BB9\u54E6\u4E3B\u4F53\u5185\u5BB9\u54E6\u4E3B\u4F53\u5185\u5BB9\u54E6\u4E3B\u4F53\u5185\u5BB9\u54E6\u4E3B\u4F53\u5185\u5BB9\u54E6\u4E3B\u4F53\u5185\u5BB9\u54E6\u4E3B\u4F53\u5185\u5BB9\u54E6\u4E3B\u4F53\u5185\u5BB9\u54E6\u4E3B\u4F53\u5185\u5BB9\u54E6\u4E3B\u4F53\u5185\u5BB9\u54E6\u4E3B\u4F53\u5185\u5BB9\u54E6\u4E3B\u4F53\u5185\u5BB9\u54E6\u4E3B\u4F53\u5185\u5BB9\u54E6\u4E3B\u4F53\u5185\u5BB9\u54E6" }),
                  createVNode(tmImage, {
                    src: "https://picsum.photos/450/150?id=36",
                    height: 150,
                    width: 450
                  })
                ])
              ]),
              _: 1
            }, 8, ["show"]),
            createVNode(tmModal, {
              onOk: test,
              color: "white",
              okColor: "pink",
              cancelColor: "pink",
              okLinear: "left",
              splitBtn: "",
              title: "\u4FE1\u606F\u6846",
              content: "\u5173\u95ED\u540E\u4F1A\u5EF6\u8FDF\u5173\u95ED\u7A97\u4F53",
              show: showWin3.value,
              "onUpdate:show": _cache[8] || (_cache[8] = ($event) => showWin3.value = $event),
              beforeClose
            }, null, 8, ["show"])
          ]),
          _: 1
        })
      ]);
    };
  }
});
var modal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/fankui/modal.nvue"]]);
export { modal as default };
