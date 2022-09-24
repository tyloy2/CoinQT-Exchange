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
import { defineComponent, computed, openBlock, createBlock, withCtx, createElementVNode, unref, createElementBlock, createVNode, createCommentVNode, normalizeClass, renderSlot } from "vue";
import { _ as _export_sfc, c as custom_props, a as tmText, t as tmApp } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmIcon } from "../../tm-icon.js";
import { T as TmButton } from "../../tm-button.js";
import { t as tmDivider } from "../../tm-divider.js";
import { t as tmAvatar } from "../../tm-avatar.js";
import { t as tmInput } from "../../tm-input.js";
import "pinia";
var _style_0 = { "wh5": { "": { "width": 0 } } };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "tm-comment",
  props: __spreadProps(__spreadValues({}, custom_props), {
    shadow: {
      type: [Number],
      default: 0
    },
    round: {
      type: [Number],
      default: 4
    },
    border: {
      type: [Number],
      default: 0
    },
    width: {
      type: [Number],
      default: 0
    },
    height: {
      type: [Number],
      default: 0
    },
    margin: {
      type: Array,
      default: () => [32, 8]
    },
    padding: {
      type: Array,
      default: () => [24, 24]
    },
    transprent: {
      type: [Boolean],
      default: false
    },
    color: {
      type: String,
      default: "white"
    },
    borderBottom: {
      type: [Boolean],
      default: false
    },
    author: {
      type: String,
      default: ""
    },
    authorColor: {
      type: String,
      default: "primary"
    },
    avatar: {
      type: String,
      default: ""
    },
    content: {
      type: String,
      default: ""
    },
    time: {
      type: String,
      default: ""
    },
    align: {
      type: String,
      default: "right"
    }
  }),
  emits: ["avatar-click", "author-click", "content-click", "time-click"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const _time = computed(() => uni.$tm.u.getDateToNewData(props.time));
    const _align = computed(() => {
      let agn = {
        time: "flex-between",
        action: "flex-row-center-end flex-1"
      };
      if (props.align == "left") {
        agn = {
          time: "flex-start",
          action: "flex-row-center-start"
        };
      }
      return agn;
    });
    const ctl = computed(() => {
      return {
        time: props.time,
        content: props.content,
        author: props.author,
        authorColor: props.authorColor,
        avatar: props.avatar,
        borderBottom: props.borderBottom
      };
    });
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
        padding: props.padding
      }, {
        default: withCtx(() => [
          createElementVNode("view", { class: "flex flex-row flex-row-top-start" }, [
            unref(ctl).avatar ? (openBlock(), createElementBlock("view", {
              key: 0,
              class: "mr-24",
              style: { "min-width": "60rpx", "align-items": "stretch" }
            }, [
              createVNode(tmAvatar, {
                round: 12,
                onClick: _cache[0] || (_cache[0] = ($event) => emits("avatar-click", $event)),
                followTheme: props.followTheme,
                dark: props.dark,
                followDark: props.followDark,
                size: 60,
                img: unref(ctl).avatar
              }, null, 8, ["followTheme", "dark", "followDark", "img"])
            ])) : createCommentVNode("v-if", true),
            createElementVNode("view", { class: "flex flex-9 flex-col wh5" }, [
              createElementVNode("view", {
                class: normalizeClass(["flex flex-row", [unref(_align).time]])
              }, [
                renderSlot(_ctx.$slots, "author", {}, () => [
                  createVNode(tmText, {
                    onClick: _cache[1] || (_cache[1] = ($event) => emits("author-click", $event)),
                    followTheme: props.followTheme,
                    dark: props.dark,
                    followDark: props.followDark,
                    color: unref(ctl).authorColor,
                    fontSize: 26,
                    label: unref(ctl).author
                  }, null, 8, ["followTheme", "dark", "followDark", "color", "label"])
                ]),
                renderSlot(_ctx.$slots, "time", {}, () => [
                  unref(_time) ? (openBlock(), createBlock(tmText, {
                    key: 0,
                    onClick: _cache[2] || (_cache[2] = ($event) => emits("time-click", $event)),
                    followTheme: props.followTheme,
                    dark: props.dark,
                    followDark: props.followDark,
                    _class: "pl-24 opacity-5",
                    fontSize: 22,
                    label: unref(_time)
                  }, null, 8, ["followTheme", "dark", "followDark", "label"])) : createCommentVNode("v-if", true)
                ])
              ], 2),
              createElementVNode("view", { class: "flex flex-col py-12" }, [
                renderSlot(_ctx.$slots, "content", {}, () => [
                  createVNode(tmText, {
                    onClick: _cache[3] || (_cache[3] = ($event) => emits("content-click", $event)),
                    followTheme: props.followTheme,
                    dark: props.dark,
                    followDark: props.followDark,
                    fontSize: 28,
                    label: unref(ctl).content
                  }, null, 8, ["followTheme", "dark", "followDark", "label"])
                ])
              ]),
              createElementVNode("view", {
                class: normalizeClass(["flex flex-row flex-1 flex-nowrap", [unref(_align).action]])
              }, [
                renderSlot(_ctx.$slots, "actions", {}, () => [
                  createCommentVNode(' <view class="flex flex-row flex-center pl-16">\r\n							<tm-icon :followTheme="props.followTheme" :dark="props.dark" :followDark="props.followDark" :font-size="24" name="tmicon-comment-dots"></tm-icon>\r\n							<tm-text :followTheme="props.followTheme" :dark="props.dark" :followDark="props.followDark" _class="pl-10"  :font-size="24" label="125"></tm-text>\r\n						</view>\r\n						<view class="flex flex-row flex-center pl-16">\r\n							<tm-icon :followTheme="props.followTheme" :dark="props.dark" :followDark="props.followDark" :font-size="24" name="tmicon-md-heart"></tm-icon>\r\n							<tm-text :followTheme="props.followTheme" :dark="props.dark" :followDark="props.followDark" _class="pl-10" :font-size="24" label="125"></tm-text>\r\n						</view> ')
                ])
              ], 2),
              unref(ctl).borderBottom ? (openBlock(), createBlock(tmDivider, { key: 0 })) : createCommentVNode("v-if", true),
              renderSlot(_ctx.$slots, "default")
            ])
          ])
        ]),
        _: 3
      }, 8, ["color", "followTheme", "dark", "followDark", "round", "shadow", "outlined", "border", "borderStyle", "borderDirection", "text", "transprent", "linear", "linearDeep", "width", "height", "margin", "padding"]);
    };
  }
});
var tmComment = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["styles", [_style_0]], ["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-comment/tm-comment.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "comment",
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
                  label: "\u57FA\u7840\u8BC4\u8BBA"
                })
              ]),
              _: 1
            }),
            createVNode(tmComment, {
              author: "\u540C\u540D\u81EA\u5B9A\u4E49",
              avatar: "https://picsum.photos/200/200",
              time: "2022/5/20 13:25",
              content: "\u8FD9\u662F\u4E00\u6761\u6700\u7B80\u5355\u7684\u8BC4\u8BBA\u5185\u5BB9\u3002"
            }),
            createVNode(tmComment, {
              author: "\u540C\u540D\u81EA\u5B9A\u4E49",
              avatar: "https://picsum.photos/200/200",
              time: "2022/5/20 13:25",
              content: "\u8FD9\u662F\u4E00\u6761\u6700\u7B80\u5355\u7684\u8BC4\u8BBA\u5185\u5BB9\u3002"
            }, {
              actions: withCtx(() => [
                createElementVNode("view", { class: "flex flex-row norwap" }, [
                  createElementVNode("view", { class: "flex flex-row flex-center pl-16" }, [
                    createVNode(tmIcon, {
                      "font-size": 24,
                      name: "tmicon-comment-dots"
                    }),
                    createVNode(tmText, {
                      _class: "pl-10",
                      "font-size": 24,
                      label: "125"
                    })
                  ]),
                  createElementVNode("view", { class: "flex flex-row flex-center pl-16" }, [
                    createVNode(tmIcon, {
                      "font-size": 24,
                      name: "tmicon-md-heart"
                    }),
                    createVNode(tmText, {
                      _class: "pl-10",
                      "font-size": 24,
                      label: "125"
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
                  label: "\u53EF\u4EE5\u901A\u8FC7\u63D2\u69FD\uFF0C\u6837\u5F0F\u5C5E\u6027\u914D\u7F6E\u66F4\u4E2A\u6027\u5316"
                })
              ]),
              _: 1
            }),
            createVNode(tmComment, {
              author: "\u540C\u540D\u81EA\u5B9A\u4E49",
              avatar: "https://picsum.photos/200/200",
              time: "2022/5/20 13:25",
              content: "\u8FD9\u662F\u4E00\u6761\u6700\u7B80\u5355\u7684\u8BC4\u8BBA\u5185\u5BB9\u3002"
            }, {
              default: withCtx(() => [
                createVNode(tmComment, {
                  border: 1,
                  margin: [0, 8],
                  author: "\u540C\u540D\u81EA\u5B9A\u4E49",
                  avatar: "https://picsum.photos/200/200",
                  time: "2022/5/20 13:25",
                  content: "\u8FD9\u662F\u4E00\u6761\u6700\u7B80\u5355\u7684\u8BC4\u8BBA\u5185\u5BB9\u3002"
                }, {
                  default: withCtx(() => [
                    createVNode(tmComment, {
                      color: "grey",
                      linear: "left",
                      text: "",
                      border: 1,
                      margin: [0, 8],
                      author: "\u540C\u540D\u81EA\u5B9A\u4E49",
                      avatar: "https://picsum.photos/200/200",
                      time: "2022/5/20 13:25",
                      content: "\u8FD9\u662F\u4E00\u6761\u6700\u7B80\u5355\u7684\u8BC4\u8BBA\u5185\u5BB9\u3002"
                    }, {
                      actions: withCtx(() => [
                        createElementVNode("view", { class: "flex flex-row norwap" }, [
                          createElementVNode("view", { class: "flex flex-row flex-center pl-16" }, [
                            createVNode(tmIcon, {
                              "font-size": 24,
                              name: "tmicon-comment-dots"
                            }),
                            createVNode(tmText, {
                              _class: "pl-10",
                              "font-size": 24,
                              label: "125"
                            })
                          ]),
                          createElementVNode("view", { class: "flex flex-row flex-center pl-16" }, [
                            createVNode(tmIcon, {
                              "font-size": 24,
                              name: "tmicon-md-heart"
                            }),
                            createVNode(tmText, {
                              _class: "pl-10",
                              "font-size": 24,
                              label: "125"
                            })
                          ])
                        ])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            createVNode(tmComment, {
              author: "\u540C\u540D\u81EA\u5B9A\u4E49",
              avatar: "https://picsum.photos/200/200",
              time: "2022/5/20 13:25",
              content: "\u60A8\u4E5F\u53EF\u914D\u7F6E\u8F93\u5165\u6846\u8FDB\u884C\u56DE\u590D\u64CD\u4F5C\u3002"
            }, {
              default: withCtx(() => [
                createVNode(tmInput),
                createElementVNode("view", { class: "flex flex-row flex-row-center-end" }, [
                  createVNode(TmButton, {
                    color: "red",
                    margin: [24, 0],
                    label: "\u786E\u8BA4\u8BC4\u8BBA",
                    "font-size": 24,
                    width: 160,
                    height: 60
                  }),
                  createVNode(TmButton, {
                    color: "white",
                    label: "\u53D6\u6D88",
                    "font-size": 24,
                    width: 120,
                    height: 60
                  })
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
var comment = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/showdata/comment.nvue"]]);
export { comment as default };
