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
import { defineComponent, ref, computed, onUnmounted, onMounted, openBlock, createBlock, unref, withCtx, createVNode, createElementVNode, normalizeClass, createElementBlock, Fragment, renderList, createCommentVNode } from "vue";
import { _ as _export_sfc, c as custom_props, a as tmText, t as tmApp } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmIcon } from "../../tm-icon.js";
import { t as tmTranslate } from "../../tm-translate.js";
import "pinia";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "tm-alert",
  props: __spreadProps(__spreadValues({}, custom_props), {
    transprent: {
      type: [Boolean],
      default: false
    },
    border: {
      type: [Number],
      default: 0
    },
    round: {
      type: [Number],
      default: 2
    },
    margin: {
      type: Array,
      default: () => [32, 12]
    },
    padding: {
      type: Array,
      default: () => [24, 24]
    },
    content: {
      type: Array,
      default: () => []
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    hidnAniName: {
      type: String,
      default: "zoom"
    },
    duration: {
      type: Number,
      default: 3e3
    },
    closable: {
      type: [Boolean, String],
      default: true
    },
    height: {
      type: [Number],
      default: 160
    },
    maxLine: {
      type: [Number],
      default: 1
    },
    showDot: {
      type: Boolean,
      default: false
    }
  }),
  emits: ["click"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const bodyani = ref(null);
    const activeIndex = ref(0);
    const showBody = ref(true);
    let timeid = uni.$tm.u.getUid(5);
    const reani = computed(() => props.hidnAniName == "zoom" || props.hidnAniName == "fade" ? true : false);
    const list = computed(() => {
      let c = props.content.map((el) => {
        var _a, _b, _c;
        el["content"] = (_a = el == null ? void 0 : el.content) != null ? _a : "";
        el["title"] = (_b = el == null ? void 0 : el.title) != null ? _b : "";
        el["icon"] = (_c = el == null ? void 0 : el.icon) != null ? _c : "";
        return el;
      });
      return c;
    });
    const len = computed(() => list.value.length);
    onUnmounted(() => clearTimeout(timeid));
    onMounted(() => {
      if (props.autoPlay) {
        play();
      }
    });
    function hide() {
      clearTimeout(timeid);
      showBody.value = false;
    }
    function play() {
      if (len.value < 1)
        return;
      clearTimeout(timeid);
      timeid = setTimeout(function() {
        next();
      }, props.duration);
    }
    function next() {
      clearTimeout(timeid);
      let index = activeIndex.value + 1;
      if (index == len.value) {
        index = 0;
      }
      activeIndex.value = index;
      play();
    }
    function close() {
      var _a;
      (_a = bodyani.value) == null ? void 0 : _a.play();
    }
    return (_ctx, _cache) => {
      return showBody.value ? (openBlock(), createBlock(tmTranslate, {
        key: 0,
        onEnd: hide,
        ref_key: "bodyani",
        ref: bodyani,
        reverse: unref(reani),
        name: __props.hidnAniName,
        autoPlay: false
      }, {
        default: withCtx(() => [
          createVNode(tmSheet, {
            height: props.height - props.padding[1] * 2,
            color: props.color,
            _class: _ctx._class,
            _style: _ctx._style,
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
            margin: props.margin,
            padding: props.padding
          }, {
            default: withCtx(() => [
              createElementVNode("view", { class: "relative bdcld flex flex-row flex-row-top-start" }, [
                createElementVNode("view", {
                  style: { "width": "0px" },
                  class: normalizeClass(["flex flex-12 flex-row flex-row-top-start", [__props.closable ? "pr-24 " : ""]])
                }, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(unref(list), (item, index) => {
                    return openBlock(), createElementBlock("view", {
                      key: index,
                      class: normalizeClass([[activeIndex.value == index ? "flex-12 " : " flex-0 "], "flex flex-row flex-row-top-start anifun"])
                    }, [
                      activeIndex.value == index ? (openBlock(), createBlock(tmTranslate, {
                        key: 0,
                        name: "zoom",
                        style: { "width": "100%" },
                        _class: "flex-12 flex flex-row flex-row-top-start"
                      }, {
                        default: withCtx(() => [
                          createElementVNode("view", { class: "flex-12 flex flex-row flex-row-top-start" }, [
                            item["icon"] ? (openBlock(), createElementBlock("view", {
                              key: 0,
                              class: "pr-32"
                            }, [
                              createVNode(tmIcon, {
                                fontSize: 32,
                                name: item["icon"]
                              }, null, 8, ["name"])
                            ])) : createCommentVNode("v-if", true),
                            createElementVNode("view", {
                              style: { "width": "0px" },
                              class: "flex-12 flex flex-col"
                            }, [
                              item["title"] ? (openBlock(), createElementBlock("view", {
                                key: 0,
                                class: "pb-12"
                              }, [
                                createVNode(tmText, {
                                  onClick: _cache[0] || (_cache[0] = ($event) => emits("click", $event)),
                                  _class: "text-size-m  text-overflow-1 text-weight-b",
                                  fontSize: 30,
                                  label: item["title"]
                                }, null, 8, ["label"])
                              ])) : createCommentVNode("v-if", true),
                              item["content"] ? (openBlock(), createElementBlock("view", {
                                key: 1,
                                class: "flex-12 overflow"
                              }, [
                                createVNode(tmText, {
                                  onClick: _cache[1] || (_cache[1] = ($event) => emits("click", $event)),
                                  fontSize: 26,
                                  _class: "text-overflow-" + props.maxLine,
                                  _style: { lineHeight: "34rpx" },
                                  label: item["content"]
                                }, null, 8, ["_class", "label"]),
                                unref(len) > 1 && props.showDot ? (openBlock(), createBlock(tmText, {
                                  key: 0,
                                  _class: "pt-24",
                                  label: `${activeIndex.value + 1}/${unref(len)}`
                                }, null, 8, ["label"])) : createCommentVNode("v-if", true)
                              ])) : createCommentVNode("v-if", true)
                            ])
                          ])
                        ]),
                        _: 2
                      }, 1024)) : createCommentVNode("v-if", true)
                    ], 2);
                  }), 128))
                ], 2),
                __props.closable ? (openBlock(), createElementBlock("view", {
                  key: 0,
                  class: "flex flex-row flex-row-top-end"
                }, [
                  createVNode(tmIcon, {
                    onClick: close,
                    fontSize: 32,
                    name: "tmicon-times-circle-fill"
                  })
                ])) : createCommentVNode("v-if", true)
              ])
            ]),
            _: 1
          }, 8, ["height", "color", "_class", "_style", "followTheme", "dark", "round", "shadow", "outlined", "border", "borderStyle", "borderDirection", "text", "transprent", "linear", "linearDeep", "margin", "padding"])
        ]),
        _: 1
      }, 8, ["reverse", "name"])) : createCommentVNode("v-if", true);
    };
  }
});
var tmAlert = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-alert/tm-alert.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "alert",
  setup(__props) {
    const content = ref([
      {
        icon: "tmicon-alert",
        content: "\u8FD9\u662F\u4E00\u6761\u65B0\u95FB\u8FD9\u662F\u4E00\u6761\u65B0\u95FB\u8FD9\u662F\u4E00\u6761\u65B0\u95FB\u8FD9\u662F\u4E00\u6761\u65B0\u95FB\u8FD9\u662F\u4E00\u6761\u65B0\u95FB\u8FD9\u662F\u4E00\u6761\u65B0\u95FB22\u8FD9\u662F\u4E00\u6761\u65B0\u95FB\u8FD9\u662F\u4E00\u6761\u65B0\u95FB\u8FD9\u662F\u4E00\u6761\u65B0\u95FB"
      }
    ]);
    const content2 = ref([
      {
        title: "\u6211\u662F\u6807\u9898",
        content: "\u6211\u662F\u4ECB\u7ECD\u5185\u5BB9\u54E6"
      }
    ]);
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
            createVNode(tmAlert, {
              shadow: 2,
              content: content.value,
              height: 80
            }, null, 8, ["content"]),
            createVNode(tmAlert, {
              color: "orange",
              linear: "right",
              content: content.value,
              height: 80
            }, null, 8, ["content"]),
            createVNode(tmAlert, {
              color: "pink",
              linearDeep: "accent",
              linear: "right",
              content: content2.value,
              height: 140
            }, null, 8, ["content"]),
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: "\u4E0B\u9762\u662F\u4E00\u4E9B\u5176\u5B83\u5C5E\u6027,\u66F4\u591A\u73A9\u6CD5\u8BF7\u524D\u5F80\u6587\u6863\u3002"
                })
              ]),
              _: 1
            }),
            createVNode(tmAlert, {
              content: content.value,
              text: "",
              height: 80
            }, null, 8, ["content"]),
            createVNode(tmAlert, {
              color: "green",
              text: "",
              border: 1,
              content: content.value,
              height: 80
            }, null, 8, ["content"]),
            createVNode(tmAlert, {
              color: "blue",
              outlined: "",
              "border-style": "dashed",
              border: 1,
              content: content.value,
              height: 80
            }, null, 8, ["content"])
          ]),
          _: 1
        })
      ]);
    };
  }
});
var alert = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/fankui/alert.nvue"]]);
export { alert as default };
