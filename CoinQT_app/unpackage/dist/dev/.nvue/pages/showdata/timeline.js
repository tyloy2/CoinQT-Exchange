import { defineComponent, provide, computed, openBlock, createElementBlock, normalizeStyle, renderSlot, inject, createElementVNode, normalizeClass, unref, createVNode, withCtx, createBlock, createCommentVNode } from "vue";
import { _ as _export_sfc, a as tmText, t as tmApp } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmIcon } from "../../tm-icon.js";
import { t as tmDivider } from "../../tm-divider.js";
import "pinia";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "tm-timeline",
  props: {
    reverse: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: "left"
    }
  },
  setup(__props) {
    const props = __props;
    provide("tmTimeLinePosition", computed(() => props.position));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        class: "flex",
        style: normalizeStyle({ "flex-direction": __props.reverse ? "column-reverse" : "column" }),
        renderWhole: true
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 4);
    };
  }
});
var tmTimeline = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-timeline/tm-timeline.vue"]]);
var _style_0 = {};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "tm-timeline-item",
  props: {
    size: {
      type: Number,
      default: 24
    },
    color: {
      type: String,
      default: "primary"
    },
    icon: {
      type: String,
      default: ""
    },
    border: {
      type: Number,
      default: 2
    },
    type: {
      type: String,
      default: "outlined"
    },
    time: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    const _time = computed(() => props.time);
    const _position = inject("tmTimeLinePosition", computed(() => "left"));
    const _posSize = computed(() => {
      return props.size;
    });
    const _posSizeWidth = computed(() => {
      return props.size + props.size / 2;
    });
    const _posX = computed(() => {
      let l = uni.upx2px(64 - _posSizeWidth.value / 2 + props.border);
      return l;
    });
    const _icon = computed(() => props.icon);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        class: "flex flex-col flex-1 relative",
        renderWhole: true
      }, [
        createElementVNode("view", {
          class: normalizeClass(["itemPos flex flex-col relative", [unref(_position) == "right" ? "flex-col-top-end" : ""]]),
          style: normalizeStyle([
            unref(_position) == "left" ? { left: "64rpx" } : "",
            unref(_position) == "right" ? { right: "64rpx" } : "",
            unref(_position) == "center" ? { transform: "translateX(50%)" } : "",
            { top: "0rpx" }
          ])
        }, [
          createVNode(tmSheet, {
            border: props.border,
            borderDirection: unref(_position) == "center" ? "left" : unref(_position),
            _class: ["flex flex-col flex-col-top-start"],
            class: "flex-1",
            parenClass: "flex-1",
            transprent: true,
            margin: [0, 0],
            padding: [0, 0]
          }, {
            default: withCtx(() => [
              createElementVNode("view", {
                class: "pb-24 flex-1",
                style: normalizeStyle([
                  unref(_position) == "left" || unref(_position) == "center" ? { paddingLeft: unref(_posSizeWidth) + "rpx", marginRight: "132rpx" } : "",
                  unref(_position) == "right" ? { paddingRight: unref(_posSizeWidth) + "rpx", marginLeft: "132rpx" } : ""
                ])
              }, [
                unref(_time) ? (openBlock(), createBlock(tmText, {
                  key: 0,
                  _style: "line-height:20rpx;",
                  _class: "pb-16",
                  label: unref(_time),
                  fontSize: 24,
                  color: props.color
                }, null, 8, ["label", "color"])) : createCommentVNode("v-if", true),
                renderSlot(_ctx.$slots, "default")
              ], 4)
            ]),
            _: 3
          }, 8, ["border", "borderDirection"])
        ], 6),
        unref(_position) == "center" ? (openBlock(), createElementBlock("view", {
          key: 0,
          style: normalizeStyle([{
            transform: `translateX(50%)`,
            height: unref(_posSizeWidth) + "rpx",
            left: -unref(_posX) + "px"
          }]),
          class: ""
        }, [
          createElementVNode("view", {
            class: "absolute t-0 flex flex-col flex-col-center-center",
            style: normalizeStyle([
              { transform: `translateX(${unref(_posX) / 2}px)` },
              { width: unref(_posSizeWidth) + "rpx", height: unref(_posSizeWidth) + "rpx" }
            ])
          }, [
            createVNode(tmSheet, {
              _class: "flex flex-center",
              round: 10,
              shadow: 2,
              color: props.color,
              width: unref(_posSize),
              height: unref(_posSize),
              margin: [0, 0],
              padding: [0, 0]
            }, {
              default: withCtx(() => [
                unref(_icon) ? (openBlock(), createBlock(tmIcon, {
                  key: 0,
                  fontSize: 20,
                  name: unref(_icon)
                }, null, 8, ["name"])) : createCommentVNode("v-if", true)
              ]),
              _: 1
            }, 8, ["color", "width", "height"])
          ], 4)
        ], 4)) : createCommentVNode("v-if", true),
        unref(_position) == "left" || unref(_position) == "right" ? (openBlock(), createElementBlock("view", {
          key: 1,
          class: normalizeClass(["absolute t-0 flex flex-col", [
            unref(_position) == "left" ? "l-0 flex-col-top-center" : "",
            unref(_position) == "right" ? "r-0 flex-col-top-center" : "",
            unref(_position) == "center" ? "flex-col-center-center" : ""
          ]]),
          style: normalizeStyle([
            unref(_position) == "left" || unref(_position) == "right" ? { transform: `translateX(${unref(_position) == "left" ? unref(_posX) : -unref(_posX)}px)` } : "",
            unref(_position) == "center" ? { transform: `translateX(${unref(_posX) / 2}px)` } : "",
            { width: unref(_posSizeWidth) + "rpx", height: unref(_posSizeWidth) + "rpx" }
          ])
        }, [
          createVNode(tmSheet, {
            _class: "flex flex-center",
            round: 10,
            shadow: 0,
            border: props.type == "outlined" ? 3 : 0,
            text: props.type == "outlined" ? true : false,
            color: props.color,
            width: unref(_posSize),
            height: unref(_posSize),
            margin: [0, 0],
            padding: [0, 0]
          }, {
            default: withCtx(() => [
              unref(_icon) ? (openBlock(), createBlock(tmIcon, {
                key: 0,
                fontSize: 20,
                name: unref(_icon)
              }, null, 8, ["name"])) : createCommentVNode("v-if", true)
            ]),
            _: 1
          }, 8, ["border", "text", "color", "width", "height"])
        ], 6)) : createCommentVNode("v-if", true)
      ]);
    };
  }
});
var tmTimelineItem = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["styles", [_style_0]], ["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-timeline-item/tm-timeline-item.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "timeline",
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
            createVNode(tmSheet, { _class: "flex-col" }, {
              default: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 30,
                  _class: "font-weight-b",
                  label: "\u57FA\u7840\u793A\u4F8B,\u66F4\u591A\u89C1\u6587\u6863"
                }),
                createVNode(tmDivider),
                createElementVNode("view", null, [
                  createVNode(tmTimeline, null, {
                    default: withCtx(() => [
                      createVNode(tmTimelineItem, {
                        color: "green",
                        size: 32,
                        type: "fill",
                        icon: "tmicon-check",
                        time: "20222-3-25"
                      }, {
                        default: withCtx(() => [
                          createVNode(tmSheet, {
                            "no-level": "",
                            shadow: 2,
                            round: 3,
                            margin: [0, 10]
                          }, {
                            default: withCtx(() => [
                              createVNode(tmText, { label: "\u5DF2\u7ECF\u5230\u4E86\u4E2D\u8F6C\u7AD9\uFF0C\u8BF7\u6CE8\u610F\u67E5\u6536\u5DF2\u7ECF\u5230\u4E86\u4E2D\u8F6C\u7AD9\uFF0C\u8BF7\u6CE8\u610F\u67E5\u6536\u5DF2\u7ECF\u5230\u4E86\u4E2D\u8F6C\u7AD9\uFF0C\u8BF7\u6CE8\u610F\u67E5\u6536\u5DF2\u7ECF\u5230\u4E86\u4E2D\u8F6C\u7AD9\uFF0C\u8BF7\u6CE8\u610F\u67E5\u6536" })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(tmTimelineItem, {
                        color: "red",
                        time: "20222-3-25"
                      }, {
                        default: withCtx(() => [
                          createVNode(tmSheet, {
                            "no-level": "",
                            shadow: 2,
                            round: 3,
                            margin: [0, 10]
                          }, {
                            default: withCtx(() => [
                              createVNode(tmText, { label: "\u5DF2\u7ECF\u5230\u4E86\u4E2D\u8F6C\u7AD9\uFF0C\u8BF7\u6CE8\u610F\u67E5\u6536\u5DF2\u7ECF\u5230\u4E86\u4E2D\u8F6C\u7AD9\uFF0C\u8BF7\u6CE8\u610F\u67E5\u6536\u5DF2\u7ECF\u5230\u4E86\u4E2D\u8F6C\u7AD9\uFF0C\u8BF7\u6CE8\u610F\u67E5\u6536\u5DF2\u7ECF\u5230\u4E86\u4E2D\u8F6C\u7AD9\uFF0C\u8BF7\u6CE8\u610F\u67E5\u6536" })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(tmTimelineItem, {
                        color: "blue",
                        time: "20222-3-25"
                      }, {
                        default: withCtx(() => [
                          createVNode(tmSheet, {
                            "no-level": "",
                            shadow: 2,
                            round: 3,
                            margin: [0, 10]
                          }, {
                            default: withCtx(() => [
                              createVNode(tmText, { label: "\u5DF2\u7ECF\u5230\u4E86\u4E2D\u8F6C\u7AD9\uFF0C\u8BF7\u6CE8\u610F\u67E5\u6536\u5DF2\u7ECF\u5230\u4E86\u4E2D\u8F6C\u7AD9\uFF0C\u8BF7\u6CE8\u610F\u67E5\u6536\u5DF2\u7ECF\u5230\u4E86\u4E2D\u8F6C\u7AD9\uFF0C\u8BF7\u6CE8\u610F\u67E5\u6536\u5DF2\u7ECF\u5230\u4E86\u4E2D\u8F6C\u7AD9\uFF0C\u8BF7\u6CE8\u610F\u67E5\u6536" })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
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
var timeline = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/showdata/timeline.nvue"]]);
export { timeline as default };
