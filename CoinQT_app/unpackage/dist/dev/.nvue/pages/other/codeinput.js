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
import { defineComponent, getCurrentInstance, computed, onMounted, nextTick, openBlock, createElementBlock, createVNode, unref, Fragment, renderList, normalizeClass, withCtx, createBlock, createCommentVNode, ref } from "vue";
import { _ as _export_sfc, r as requireNativePlugin, c as custom_props, a as tmText, t as tmApp } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmIcon } from "../../tm-icon.js";
import { t as tmKeyborad } from "../../tm-keyborad.js";
import { t as tmDivider } from "../../tm-divider.js";
import "pinia";
import "../../tm-drawer.js";
import "../../tm-translate.js";
import "../../tm-overlay.js";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "inputinit",
  props: {
    followTheme: {
      type: [Boolean, String],
      default: true
    },
    color: {
      type: String,
      default: "primary"
    },
    size: {
      type: Number,
      default: 50
    }
  },
  setup(__props) {
    const props = __props;
    const animation = requireNativePlugin("animation");
    const { proxy } = getCurrentInstance();
    const _size = computed(() => props.size);
    onMounted(() => {
      nextTick(function() {
        setTimeout(function() {
          spinNvueAni();
        }, 50);
      });
    });
    function spinNvueAni(opacity = 0) {
      var _a;
      let icon = (_a = proxy == null ? void 0 : proxy.$refs) == null ? void 0 : _a.dombg;
      if (!icon)
        return;
      animation.transition(icon, {
        styles: {
          opacity
        },
        duration: 600,
        timingFunction: "linear",
        delay: 0
      }, () => {
        nextTick(function() {
          spinNvueAni(opacity == 0 ? 1 : 0);
        });
      });
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        ref: "dombg",
        renderWhole: true
      }, [
        createVNode(tmSheet, {
          followTheme: props.followTheme,
          text: false,
          userInteractionEnabled: false,
          width: 6,
          color: props.color,
          height: unref(_size) / 2,
          margin: [0, 0],
          padding: [0, 0]
        }, null, 8, ["followTheme", "color", "height"])
      ], 512);
    };
  }
});
var inputinit = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-codeinput/inputinit.vue"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "tm-codeinput",
  props: __spreadProps(__spreadValues({}, custom_props), {
    followTheme: {
      type: [Boolean, String],
      default: true
    },
    size: {
      type: Number,
      default: 100
    },
    gutter: {
      type: Number,
      default: 24
    },
    round: {
      type: Number,
      default: 2
    },
    border: {
      type: Number,
      default: 2
    },
    type: {
      type: String,
      default: "dot"
    },
    fontSize: {
      type: Number,
      default: 44
    },
    fontColor: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "primary"
    },
    count: {
      type: Number,
      default: 4
    },
    value: {
      type: [Number, String],
      default: "35"
    }
  }),
  emits: ["click"],
  setup(__props, { emit: emits }) {
    const props = __props;
    computed(() => props.type);
    const _count = computed(() => props.count);
    const _valueLen = computed(() => String(props.value).split("").length);
    const _size = computed(() => props.size);
    const _datalist = computed(() => {
      var _a;
      let list = [];
      let _value = String(props.value).split("");
      for (let i = 0; i < _count.value; i++) {
        list.push({
          value: (_a = _value[i]) != null ? _a : "",
          index: i
        });
      }
      return list;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        class: "flex-row flex flex-row-center-center",
        renderWhole: true
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(_datalist), (item, index) => {
          return openBlock(), createElementBlock("view", {
            key: index,
            class: normalizeClass([`px-${props.gutter / 2}`])
          }, [
            createVNode(tmSheet, {
              onClick: _cache[0] || (_cache[0] = ($event) => emits("click")),
              round: props.round,
              border: props.border,
              text: true,
              color: props.color,
              width: unref(_size),
              height: unref(_size),
              margin: [0, 0],
              padding: [0, 0],
              _class: "flex-center",
              followTheme: props.followTheme
            }, {
              default: withCtx(() => [
                item.value !== "" ? (openBlock(), createBlock(tmText, {
                  key: 0,
                  userInteractionEnabled: false,
                  label: item.value,
                  color: props.fontColor,
                  "font-size": props.fontSize
                }, null, 8, ["label", "color", "font-size"])) : createCommentVNode("v-if", true),
                item.value == "" && index !== unref(_valueLen) ? (openBlock(), createBlock(tmIcon, {
                  key: 1,
                  userInteractionEnabled: false,
                  color: props.fontColor,
                  name: "tmicon-ios-remove"
                }, null, 8, ["color"])) : createCommentVNode("v-if", true),
                item.value == "" && index === unref(_valueLen) ? (openBlock(), createBlock(inputinit, {
                  key: 2,
                  followTheme: props.followTheme,
                  size: unref(_size),
                  color: props.fontColor || props.color
                }, null, 8, ["followTheme", "size", "color"])) : createCommentVNode("v-if", true)
              ]),
              _: 2
            }, 1032, ["round", "border", "color", "width", "height", "followTheme"])
          ], 2);
        }), 128))
      ]);
    };
  }
});
var tmCodeinput = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-codeinput/tm-codeinput.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "codeinput",
  setup(__props) {
    const show = ref(false);
    const str = ref("");
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
                  label: "\u57FA\u7840\u793A\u4F8B\uFF0C\u66F4\u591A\u5C5E\u6027\u548C\u529F\u80FD\u89C1\u6587\u6863"
                }),
                createVNode(tmDivider),
                createVNode(tmCodeinput, {
                  onClick: _cache[0] || (_cache[0] = ($event) => show.value = true),
                  value: str.value
                }, null, 8, ["value"])
              ]),
              _: 1
            }),
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createVNode(tmCodeinput, {
                  size: 80,
                  count: 6,
                  color: "white",
                  fontColor: "primary",
                  onClick: _cache[1] || (_cache[1] = ($event) => show.value = true),
                  value: str.value
                }, null, 8, ["value"])
              ]),
              _: 1
            }),
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createVNode(tmCodeinput, {
                  size: 80,
                  round: 16,
                  count: 6,
                  color: "green",
                  onClick: _cache[2] || (_cache[2] = ($event) => show.value = true),
                  value: str.value
                }, null, 8, ["value"])
              ]),
              _: 1
            }),
            createVNode(tmKeyborad, {
              show: show.value,
              "onUpdate:show": _cache[3] || (_cache[3] = ($event) => show.value = $event),
              modelValue: str.value,
              "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => str.value = $event)
            }, null, 8, ["show", "modelValue"])
          ]),
          _: 1
        })
      ]);
    };
  }
});
var codeinput = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/other/codeinput.nvue"]]);
export { codeinput as default };
