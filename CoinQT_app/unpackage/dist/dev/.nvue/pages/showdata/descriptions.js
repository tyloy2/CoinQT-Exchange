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
import { defineComponent, inject, computed, unref, openBlock, createElementBlock, normalizeStyle, createElementVNode, createVNode, renderSlot, createCommentVNode, ref, getCurrentInstance, onMounted, provide, createBlock, withCtx, Fragment, renderList, nextTick } from "vue";
import { _ as _export_sfc, a as tmText, c as custom_props, r as requireNativePlugin, t as tmApp } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmDivider } from "../../tm-divider.js";
import "pinia";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "tm-descriptions-item",
  props: {
    label: {
      type: String,
      default: ""
    },
    value: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: ""
    },
    fontSize: {
      type: Number,
      default: 23
    }
  },
  setup(__props) {
    const props = __props;
    const _width = inject("tmDescriptionsItem", "");
    const labelWidth = inject("tmDescriptionsLabelWidth", "");
    const _fontSize = computed(() => props.fontSize);
    return (_ctx, _cache) => {
      return unref(_width) != "0px" && unref(_width) != "0%" ? (openBlock(), createElementBlock("view", {
        key: 0,
        style: normalizeStyle([unref(_width) ? { width: unref(_width) } : ""]),
        class: "flex flex-row flex-row-center-start py-8",
        renderWhole: true
      }, [
        createElementVNode("view", {
          style: normalizeStyle([unref(labelWidth) ? { width: unref(labelWidth) + "rpx" } : ""]),
          class: "flex flex-row flex-row-center-start"
        }, [
          createVNode(tmText, {
            _class: "opacity-7",
            "font-size": unref(_fontSize),
            label: props.label
          }, null, 8, ["font-size", "label"])
        ], 4),
        renderSlot(_ctx.$slots, "default", {}, () => [
          createVNode(tmText, {
            color: props.color,
            _class: "px-16",
            "font-size": unref(_fontSize),
            label: props.value
          }, null, 8, ["color", "font-size", "label"])
        ])
      ], 4)) : createCommentVNode("v-if", true);
    };
  }
});
var tmDescriptionsItem = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-descriptions-item/tm-descriptions-item.vue"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "tm-descriptions",
  props: __spreadProps(__spreadValues({}, custom_props), {
    shadow: {
      type: [Number, String],
      default: 0
    },
    round: {
      type: [Number, String],
      default: 0
    },
    border: {
      type: [Number],
      default: 0
    },
    margin: {
      type: Array,
      default: () => [0, 0]
    },
    padding: {
      type: Array,
      default: () => [16, 16]
    },
    transprent: {
      type: [Boolean, String],
      default: false
    },
    color: {
      type: String,
      default: "white"
    },
    column: {
      type: [Number, String],
      default: 2
    },
    data: {
      type: [Array],
      default: () => []
    },
    keyMap: {
      type: [Object],
      default: { key: "label", value: "value" }
    },
    title: {
      type: String,
      default: ""
    },
    labelWidth: {
      type: [String, Number],
      default: ""
    }
  }),
  setup(__props) {
    var _a, _b;
    const props = __props;
    const dom = requireNativePlugin("dom");
    const tmDescriptions2 = ref(null);
    (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const _dataList = computed(() => {
      return props.data.map((el) => {
        return {
          label: el[props.keyMap.key],
          value: el[props.keyMap.value]
        };
      });
    });
    const _cellWidth = ref("0px");
    function nvueGetRect() {
      if (Number(props.column) <= 1) {
        _cellWidth.value = "auto";
        return;
      }
      try {
        nextTick(function() {
          dom == null ? void 0 : dom.getComponentRect(tmDescriptions2.value, function(res) {
            if (!(res == null ? void 0 : res.size))
              return;
            _cellWidth.value = res.size.width / Number(props.column) - uni.upx2px(20) + "px";
            if (res.size.width == 0) {
              nvueGetRect();
            }
          });
        });
      } catch (e) {
      }
    }
    onMounted(() => {
      if (_cellWidth.value == "0px") {
        nvueGetRect();
      }
    });
    provide("tmDescriptionsItem", computed(() => _cellWidth.value));
    provide("tmDescriptionsLabelWidth", computed(() => props.labelWidth));
    return (_ctx, _cache) => {
      return openBlock(), createBlock(tmSheet, {
        color: props.color,
        followTheme: props.followTheme,
        dark: props.dark,
        followDark: props.followDark,
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
        width: props.width,
        height: props.height,
        margin: props.margin,
        padding: props.padding,
        ref_key: "tmDescriptions",
        ref: tmDescriptions2
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "title", {}, () => [
            props.title ? (openBlock(), createBlock(tmText, {
              key: 0,
              _class: "pb-12",
              label: props.title,
              "font-size": 30
            }, null, 8, ["label"])) : createCommentVNode("v-if", true)
          ]),
          createElementVNode("view", {
            class: "flex tmDescriptions",
            style: normalizeStyle([{ flexFlow: _cellWidth.value == "auto" ? "column" : "row wrap" }])
          }, [
            renderSlot(_ctx.$slots, "default", {}, () => [
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(_dataList), (item, index) => {
                return openBlock(), createElementBlock("view", { key: index }, [
                  createVNode(tmDescriptionsItem, {
                    label: item.label,
                    value: item.value
                  }, null, 8, ["label", "value"])
                ]);
              }), 128))
            ])
          ], 4)
        ]),
        _: 3
      }, 8, ["color", "followTheme", "dark", "followDark", "round", "shadow", "outlined", "border", "borderStyle", "borderDirection", "text", "transprent", "linear", "linearDeep", "width", "height", "margin", "padding"]);
    };
  }
});
var tmDescriptions = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-descriptions/tm-descriptions.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "descriptions",
  setup(__props) {
    const list = [
      { label: "\u540C\u6B65\u65F6\u95F4", value: "2022/5/12" },
      { label: "\u540C\u6B65\u65F6\u95F4", value: "2022/5/12" },
      { label: "\u540C\u6B65\u65F6\u95F4", value: "2022/5/12" },
      { label: "\u540C\u6B65\u65F6\u95F4", value: "2022/5/12" }
    ];
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
                  label: "\u57FA\u7840\u793A\u4F8B"
                }),
                createVNode(tmDivider),
                createVNode(tmDescriptions, { data: list })
              ]),
              _: 1
            }),
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: "\u914D\u7F6E\u989C\u8272\u548C\u5B57\u4F53\u5927\u5C0F\uFF0C\u4EE5\u53CA\u6807\u9898\uFF0C\u63D2\u69FD"
                }),
                createVNode(tmDivider),
                createVNode(tmDescriptions, {
                  transprent: "",
                  round: 3,
                  text: "",
                  title: "\u65F6\u95F4\u5DE5\u5177\u6807\u9898"
                }, {
                  default: withCtx(() => [
                    (openBlock(), createElementBlock(Fragment, null, renderList(list, (item, index) => {
                      return createVNode(tmDescriptionsItem, {
                        "font-size": 24,
                        key: index,
                        label: item.label,
                        value: item.value
                      }, null, 8, ["label", "value"]);
                    }), 64)),
                    createVNode(tmDescriptionsItem, {
                      "font-size": 24,
                      color: "red",
                      label: "\u5F00\u53D1\u5DE5\u5177",
                      value: "vscode"
                    }, {
                      default: withCtx(() => [
                        createVNode(tmSheet, {
                          color: "red",
                          text: "",
                          border: 1,
                          margin: [12, 0],
                          padding: [12, 4],
                          round: 2
                        }, {
                          default: withCtx(() => [
                            createVNode(tmText, {
                              "font-size": 24,
                              label: "\u63D2\u69FD\u914D\u7F6E"
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
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
var descriptions = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/showdata/descriptions.nvue"]]);
export { descriptions as default };
