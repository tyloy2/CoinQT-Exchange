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
import { defineComponent, computed, ref, openBlock, createElementBlock, normalizeClass, createVNode, unref, withCtx, renderSlot, createBlock, createCommentVNode, createElementVNode } from "vue";
import { _ as _export_sfc, c as custom_props, u as useTmpiniaStore, a as tmText, t as tmApp } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmAvatar } from "../../tm-avatar.js";
import { t as tmIcon } from "../../tm-icon.js";
import { T as TmButton } from "../../tm-button.js";
import { T as TmCheckbox } from "../../tm-checkbox.js";
import "pinia";
import "../../tm-translate.js";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "tm-coupon",
  props: __spreadProps(__spreadValues({}, custom_props), {
    margin: {
      type: Array,
      default: () => [32, 12]
    },
    transprent: {
      type: Boolean,
      default: false
    },
    text: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: "white"
    },
    fontColor: {
      type: String,
      default: "black"
    },
    priceDetail: {
      type: Object,
      default: () => {
        return {
          price: 100,
          suffix: "\u5143",
          prefix: "",
          subtext: "\u6EE1\u51CF\u5238"
        };
      }
    },
    rightDetail: {
      type: Object,
      default: () => {
        return {
          title: "\u5238\u7684\u6807\u9898",
          subtitle: "\u5238\u7684\u5C0F\u6807\u9898",
          time: "\u6709\u6548\u671F:2022-6-3-2022-7-3"
        };
      }
    },
    shadow: {
      type: Number,
      default: 0
    },
    round: {
      type: Number,
      default: 3
    },
    border: {
      type: Number,
      default: 0
    },
    thumb: {
      type: String,
      default: ""
    },
    showRight: {
      type: Boolean,
      default: true
    },
    extra: {
      type: Boolean,
      default: false
    },
    extraActive: {
      type: Boolean,
      default: false
    },
    moreText: {
      type: String,
      default: "\u89C4\u5219\u8BE6\u60C5"
    },
    mainColor: {
      type: String,
      default: "red"
    },
    btnTextMode: {
      type: Boolean,
      default: false
    },
    btnLabel: {
      type: String,
      default: "\u7ACB\u5373\u4F7F\u7528"
    },
    disable: {
      type: Boolean,
      default: false
    }
  }),
  emits: ["click"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const store = useTmpiniaStore();
    const _priceDetail = computed(() => props.priceDetail);
    const _rightDetail = computed(() => props.rightDetail);
    const _thumb = computed(() => props.thumb);
    const _extraActive = ref(props.extraActive);
    const _moreText = computed(() => props.moreText);
    const _btnLabel = computed(() => props.btnLabel);
    const _disable = computed(() => props.disable);
    computed(() => store.tmStore.dark);
    const _fontColor = computed(() => {
      if (store.tmStore.dark && props.fontColor !== "" && (props.fontColor == "black" || props.fontColor == "white")) {
        return "white";
      }
      return props.fontColor;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        class: normalizeClass(["flex flex-row", `px-${props.margin[0]}`, `pb-${props.margin[1]}`]),
        renderWhole: true
      }, [
        createVNode(tmSheet, {
          margin: [0, 0],
          padding: [24, 24],
          "paren-class": "flex-1",
          class: "flex-1",
          color: unref(_disable) ? "grey-3" : props.color,
          _style: props._style,
          followTheme: props.followTheme,
          dark: props.dark,
          round: props.round,
          shadow: props.shadow,
          outlined: props.outlined,
          border: props.border,
          borderStyle: props.borderStyle,
          borderDirection: props.borderDirection,
          text: props.text,
          transprent: props.transprent,
          linear: props.linear,
          linearDeep: props.linearDeep,
          _class: "flex flex-row flex-between flex-row-start-start"
        }, {
          default: withCtx(() => [
            props.showRight ? (openBlock(), createElementBlock("view", {
              key: 0,
              class: "pr-24 flex flex-col"
            }, [
              renderSlot(_ctx.$slots, "thumb", {}, () => [
                unref(_thumb) ? (openBlock(), createBlock(tmAvatar, {
                  key: 0,
                  size: 80,
                  round: 24,
                  img: unref(_thumb)
                }, null, 8, ["img"])) : createCommentVNode("v-if", true),
                !unref(_thumb) ? (openBlock(), createElementBlock("view", {
                  key: 1,
                  class: "flex flex-col"
                }, [
                  createElementVNode("view", { class: "flex-row flex flex-row-bottom-center" }, [
                    createVNode(tmText, {
                      "follow-dark": true,
                      userInteractionEnabled: false,
                      color: unref(_disable) ? "grey-1" : props.mainColor,
                      "font-size": 22,
                      label: unref(_priceDetail).prefix
                    }, null, 8, ["color", "label"]),
                    createVNode(tmText, {
                      userInteractionEnabled: false,
                      color: unref(_disable) ? "grey-1" : props.mainColor,
                      _class: "px-10 text-weight-b",
                      "font-size": 42,
                      label: unref(_priceDetail).price
                    }, null, 8, ["color", "label"]),
                    createVNode(tmText, {
                      "follow-dark": true,
                      userInteractionEnabled: false,
                      color: unref(_disable) ? "grey-1" : props.mainColor,
                      "font-size": 22,
                      label: unref(_priceDetail).suffix
                    }, null, 8, ["color", "label"])
                  ]),
                  createElementVNode("view", { class: "flex flex-center" }, [
                    createVNode(tmText, {
                      userInteractionEnabled: false,
                      color: unref(_disable) ? "grey-1" : unref(_fontColor),
                      _class: "pr-10 opacity-7",
                      "font-size": 22,
                      label: unref(_priceDetail).subtext
                    }, null, 8, ["color", "label"])
                  ])
                ])) : createCommentVNode("v-if", true)
              ])
            ])) : createCommentVNode("v-if", true),
            createElementVNode("view", {
              class: "flex-1 flex flex-col",
              style: { "width": "0px" }
            }, [
              createElementVNode("view", { class: "flex flex-row flex-between" }, [
                createElementVNode("view", { class: "flex flex-col flex-1" }, [
                  renderSlot(_ctx.$slots, "default", {}, () => [
                    createVNode(tmText, {
                      "follow-dark": true,
                      color: unref(_disable) ? "grey-1" : unref(_fontColor),
                      "font-size": 36,
                      _class: "text-weight-b",
                      label: unref(_rightDetail).title
                    }, null, 8, ["color", "label"]),
                    createVNode(tmText, {
                      "follow-dark": true,
                      _class: "opacity-7",
                      color: unref(_disable) ? "grey-1" : unref(_fontColor),
                      "font-size": 24,
                      label: unref(_rightDetail).subtitle
                    }, null, 8, ["color", "label"])
                  ])
                ]),
                createElementVNode("view", {
                  class: "flex flex-row flex-row-center-end",
                  style: { "width": "150rpx" }
                }, [
                  renderSlot(_ctx.$slots, "btn", {}, () => [
                    createVNode(TmButton, {
                      onClick: _cache[0] || (_cache[0] = ($event) => emits("click", $event)),
                      disabled: unref(_disable),
                      color: unref(_disable) ? "grey-1" : props.mainColor,
                      "font-color": unref(_disable) ? "grey" : "",
                      text: props.btnTextMode,
                      size: "small",
                      width: 120,
                      label: unref(_btnLabel)
                    }, null, 8, ["disabled", "color", "font-color", "text", "label"])
                  ])
                ])
              ]),
              createElementVNode("view", { class: "flex flex-col pt-16" }, [
                createElementVNode("view", { class: "flex flex-row flex-between" }, [
                  createVNode(tmText, {
                    _class: "opacity-7",
                    color: unref(_disable) ? "grey-1" : unref(_fontColor),
                    "font-size": 22,
                    label: unref(_rightDetail).time
                  }, null, 8, ["color", "label"]),
                  props.extra && !_extraActive.value ? (openBlock(), createElementBlock("view", {
                    key: 0,
                    onClick: _cache[1] || (_cache[1] = ($event) => _extraActive.value = !_extraActive.value),
                    class: "flex flex-row flex-row-center-center opacity-7"
                  }, [
                    createVNode(tmText, {
                      userInteractionEnabled: false,
                      color: unref(_disable) ? "grey-1" : unref(_fontColor),
                      _class: "pr-10",
                      "font-size": 22,
                      label: unref(_moreText)
                    }, null, 8, ["color", "label"]),
                    createVNode(tmIcon, {
                      userInteractionEnabled: false,
                      color: unref(_disable) ? "grey-1" : unref(_fontColor),
                      "font-size": 20,
                      name: "tmicon-angle-down"
                    }, null, 8, ["color"])
                  ])) : createCommentVNode("v-if", true)
                ]),
                props.extra && _extraActive.value ? (openBlock(), createElementBlock("view", {
                  key: 0,
                  class: "flex flex-col pt-16"
                }, [
                  renderSlot(_ctx.$slots, "extra"),
                  createElementVNode("view", {
                    onClick: _cache[2] || (_cache[2] = ($event) => _extraActive.value = !_extraActive.value),
                    class: "flex flex-row flex-row-center-end opacity-7 pt-16"
                  }, [
                    createVNode(tmText, {
                      userInteractionEnabled: false,
                      color: unref(_disable) ? "grey-1" : unref(_fontColor),
                      _class: "pr-10",
                      "font-size": 22,
                      label: unref(_moreText)
                    }, null, 8, ["color", "label"]),
                    props.extra && _extraActive.value ? (openBlock(), createBlock(tmIcon, {
                      key: 0,
                      userInteractionEnabled: false,
                      color: unref(_disable) ? "grey-1" : unref(_fontColor),
                      "font-size": 20,
                      name: "tmicon-angle-up"
                    }, null, 8, ["color"])) : createCommentVNode("v-if", true)
                  ])
                ])) : createCommentVNode("v-if", true)
              ])
            ])
          ]),
          _: 3
        }, 8, ["color", "_style", "followTheme", "dark", "round", "shadow", "outlined", "border", "borderStyle", "borderDirection", "text", "transprent", "linear", "linearDeep"])
      ], 2);
    };
  }
});
var tmCoupon = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-coupon/tm-coupon.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "coupon",
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
                createVNode(tmText, { label: "\u4F18\u60E0\u5238\u6837\u4F8B" })
              ]),
              _: 1
            }),
            createVNode(tmCoupon, {
              extra: "",
              thumb: "https://picsum.photos/200/300"
            }, {
              extra: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 22,
                  _class: "opacity-7",
                  label: "1.\u4F7F\u7528\u4E0D\u53D7\u9650\u5236"
                }),
                createVNode(tmText, {
                  "font-size": 22,
                  _class: "opacity-7",
                  label: "2.\u4F7F\u7528\u4E0D\u53D7\u9650\u5236"
                })
              ]),
              _: 1
            }),
            createVNode(tmCoupon, {
              extra: "",
              "show-right": false
            }, {
              extra: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 22,
                  _class: "opacity-7",
                  label: "1.\u4F7F\u7528\u4E0D\u53D7\u9650\u5236"
                }),
                createVNode(tmText, {
                  "font-size": 22,
                  _class: "opacity-7",
                  label: "2.\u4F7F\u7528\u4E0D\u53D7\u9650\u5236"
                })
              ]),
              _: 1
            }),
            createVNode(tmCoupon, { mainColor: "pink" }),
            createVNode(tmCoupon, { mainColor: "pink" }, {
              btn: withCtx(() => [
                createVNode(TmCheckbox, {
                  color: "pink",
                  round: 24
                })
              ]),
              _: 1
            }),
            createVNode(tmCoupon, {
              disable: "",
              "btn-label": "\u5DF2\u7ECF\u4F7F\u7528"
            }),
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createVNode(tmText, { label: "\u5176\u5B83\u6837\u5F0F\u8BBE\u5B9A" })
              ]),
              _: 1
            }),
            createVNode(tmCoupon, {
              color: "orange",
              linear: "right",
              "linear-deep": "accent",
              mainColor: "orange",
              "font-color": "",
              thumb: "https://picsum.photos/200/300"
            }),
            createVNode(tmCoupon, {
              color: "pink",
              linear: "right",
              "linear-deep": "accent",
              mainColor: "yellow",
              "font-color": "",
              extra: ""
            }, {
              extra: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 22,
                  _class: "opacity-7",
                  label: "1.\u4F7F\u7528\u4E0D\u53D7\u9650\u5236"
                }),
                createVNode(tmText, {
                  "font-size": 22,
                  _class: "opacity-7",
                  label: "2.\u4F7F\u7528\u4E0D\u53D7\u9650\u5236"
                })
              ]),
              _: 1
            }),
            createVNode(tmCoupon, {
              color: "yellow",
              mainColor: "pink",
              "font-color": "",
              extra: ""
            }, {
              extra: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 22,
                  _class: "opacity-7",
                  label: "1.\u4F7F\u7528\u4E0D\u53D7\u9650\u5236"
                }),
                createVNode(tmText, {
                  "font-size": 22,
                  _class: "opacity-7",
                  label: "2.\u4F7F\u7528\u4E0D\u53D7\u9650\u5236"
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
var coupon = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/yewu/coupon.nvue"]]);
export { coupon as default };
