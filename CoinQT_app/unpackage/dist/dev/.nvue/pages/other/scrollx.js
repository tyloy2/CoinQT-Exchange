import { defineComponent, ref, computed, openBlock, createElementBlock, normalizeStyle, createElementVNode, renderSlot, unref, normalizeClass, createVNode, withCtx, createCommentVNode, Fragment, renderList, createBlock } from "vue";
import { _ as _export_sfc, t as tmApp, a as tmText } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmGrid, a as tmGridItem } from "../../tm-grid.js";
import { t as tmImage } from "../../tm-image.js";
import { t as tmDivider } from "../../tm-divider.js";
import "pinia";
import "../../tm-badge.js";
import "../../tm-icon.js";
import "../../tm-translate.js";
var _style_0 = { "bar": { "": { "transitionProperty": "transform", "transitionDelay": 0, "transitionDuration": 50, "transitionTimingFunction": "linear", "transform": "translateX(0px)" } }, "@TRANSITION": { "bar": { "property": "transform", "delay": 0, "duration": 50, "timingFunction": "linear" } } };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "tm-scrollx",
  props: {
    width: {
      type: Number,
      default: 636
    },
    height: {
      type: Number,
      default: 300
    },
    showBar: {
      type: Boolean,
      default: true
    },
    bgColor: {
      type: String,
      default: "grey-2"
    },
    color: {
      type: String,
      default: "primary"
    },
    align: {
      type: String,
      default: "center"
    }
  },
  setup(__props) {
    const props = __props;
    const left = ref(0);
    const totalWidth = uni.upx2px(50);
    const totalContWidth = uni.upx2px(props.width);
    const _showBar = computed(() => props.showBar);
    const alignKey = {
      "center": "flex-center",
      "between": "flex-row flex-row-center-between"
    };
    const onScroll = (e) => {
      if (!_showBar.value)
        return;
      let sL = e.detail.scrollLeft;
      let sT = e.detail.scrollWidth;
      let maxLeft = Math.abs(sT - totalContWidth);
      let nowLeft = sL / maxLeft * totalWidth;
      if (sL <= 0)
        nowLeft = 0;
      if (Math.abs(sL) >= maxLeft) {
        nowLeft = totalWidth;
      }
      left.value = nowLeft;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        class: "relative flex",
        style: normalizeStyle({ width: props.width + "rpx", height: props.height + 32 + "rpx" }),
        renderWhole: true
      }, [
        createElementVNode("scroll-view", {
          onScroll,
          showScrollbar: false,
          scrollX: true,
          class: "flex flex-row flex-nowrap nowrap",
          style: normalizeStyle({ width: props.width + "rpx", height: props.height + "rpx" })
        }, [
          renderSlot(_ctx.$slots, "default")
        ], 36),
        unref(_showBar) ? (openBlock(), createElementBlock("view", {
          key: 0,
          class: normalizeClass(["absolute l-0 b-10 flex", alignKey[props.align]]),
          style: normalizeStyle({ width: props.width + "rpx", height: 32 + "rpx" })
        }, [
          createElementVNode("view", {
            class: "flex-1 pr-40",
            style: { "width": "0px" }
          }, [
            renderSlot(_ctx.$slots, "barll")
          ]),
          createElementVNode("view", {
            class: "px-32",
            style: { "width": "164rpx" }
          }, [
            createVNode(tmSheet, {
              "no-level": "",
              round: 6,
              width: 100,
              height: 8,
              color: props.bgColor,
              margin: [0, 0],
              padding: [0, 0]
            }, {
              default: withCtx(() => [
                createElementVNode("view", {
                  class: "bar",
                  style: normalizeStyle({
                    transform: `translateX(${left.value}px)`
                  })
                }, [
                  createVNode(tmSheet, {
                    round: 6,
                    width: 50,
                    height: 8,
                    color: props.color,
                    margin: [0, 0],
                    padding: [0, 0]
                  }, null, 8, ["color"])
                ], 4)
              ]),
              _: 1
            }, 8, ["color"])
          ])
        ], 6)) : createCommentVNode("v-if", true)
      ], 4);
    };
  }
});
var tmScrollx = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["styles", [_style_0]], ["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-scrollx/tm-scrollx.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "scrollx",
  setup(__props) {
    const list = ref([
      { path: "https://gw.alicdn.com/imgextra/i4/O1CN01XCiY1B1px9ivHkDGm_!!6000000005426-2-tps-183-144.png_q90.jpg", title: "\u5929\u732B\u65B0\u54C1", count: "\u70ED\u9500" },
      { path: "https://gw.alicdn.com/imgextra/i3/O1CN01FgQFp81spmBXqQMtA_!!6000000005816-2-tps-183-144.png_q90.jpg", title: "\u4ECA\u65E5\u7206\u6B3E", count: 0 },
      { path: "https://gw.alicdn.com/imgextra/i1/O1CN01tsk5OY1q0MUo5PJga_!!6000000005433-2-tps-183-144.png_q90.jpg", title: "\u5929\u732B\u56FD\u9645", count: 0 },
      { path: "https://gw.alicdn.com/imgextra/i2/O1CN01yK3Cxn1sTnAx1fOjq_!!6000000005768-2-tps-183-144.png_q90.jpg", title: "\u98DE\u732A\u65C5\u884C", count: 0 },
      { path: "https://gw.alicdn.com/imgextra/i1/O1CN01iZIGkz1URSOUdRHqS_!!6000000002514-2-tps-183-144.png_q90.jpg", title: "\u5929\u732B\u8D85\u5E02", count: 0 },
      { path: "https://gw.alicdn.com/imgextra/i4/O1CN01VuRfwH1muSbsJFxoM_!!6000000005014-2-tps-183-144.png_q90.jpg_.webp", title: "\u51AC\u5965\u516C\u76CA", count: 0 },
      { path: "https://gw.alicdn.com/imgextra/i2/O1CN01yK3Cxn1sTnAx1fOjq_!!6000000005768-2-tps-183-144.png_q90.jpg", title: "\u98DE\u732A\u65C5\u884C", count: 99 },
      { path: "https://gw.alicdn.com/imgextra/i1/O1CN01iZIGkz1URSOUdRHqS_!!6000000002514-2-tps-183-144.png_q90.jpg", title: "\u5929\u732B\u8D85\u5E02", count: 0 },
      { path: "https://gw.alicdn.com/imgextra/i4/O1CN01VuRfwH1muSbsJFxoM_!!6000000005014-2-tps-183-144.png_q90.jpg_.webp", title: "\u51AC\u5965\u516C\u76CA", count: 0 },
      { path: "https://gw.alicdn.com/imgextra/i4/O1CN01XCiY1B1px9ivHkDGm_!!6000000005426-2-tps-183-144.png_q90.jpg", title: "\u5929\u732B\u65B0\u54C1", count: 6 },
      { path: "https://gw.alicdn.com/imgextra/i3/O1CN01FgQFp81spmBXqQMtA_!!6000000005816-2-tps-183-144.png_q90.jpg", title: "\u4ECA\u65E5\u7206\u6B3E", count: 0 },
      { path: "https://gw.alicdn.com/imgextra/i1/O1CN01tsk5OY1q0MUo5PJga_!!6000000005433-2-tps-183-144.png_q90.jpg", title: "\u5929\u732B\u56FD\u9645", count: 0 },
      { path: "https://gw.alicdn.com/imgextra/i2/O1CN01yK3Cxn1sTnAx1fOjq_!!6000000005768-2-tps-183-144.png_q90.jpg", title: "\u98DE\u732A\u65C5\u884C", count: 0 },
      { path: "https://gw.alicdn.com/imgextra/i1/O1CN01iZIGkz1URSOUdRHqS_!!6000000002514-2-tps-183-144.png_q90.jpg", title: "\u5929\u732B\u8D85\u5E02", count: 0 }
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
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 32,
                  label: "\u6A2A\u5411\u6EDA\u52A8"
                }),
                createVNode(tmDivider),
                createVNode(tmText, { label: "\u62B9\u5E73\u4E86\u5E73\u53F0\u5DEE\u5F02,\u9002\u7528\u4E8E\u5E0C\u671B\u5185\u5BB9\u6A2A\u5411\u6EDA\u52A8\u7684\u573A\u666F." }),
                createVNode(tmText, { label: "\u4F7F\u7528\u65F6\u4E00\u5B9A\u8981\u6CE8\u610Fscrollx\u7684\u5BBD\u5EA6\u548C\u5185\u90E8\u7684\u5BBD\u5EA6\u4E00\u5B9A\u8981\u8BBE\u7F6E,\u5426\u5219\u4F1A\u5931\u6548,\u540C\u65F6\u4E5F\u8981\u6CE8\u610F\u9AD8\u5EA6\u7684\u8BBE\u7F6E,\u7559\u51FA\u5E95\u90E8\u5BFC\u822A\u6761\u7684\u95F4\u8DDD." })
              ]),
              _: 1
            }),
            createVNode(tmSheet, {
              padding: [0, 0],
              _class: "overflow"
            }, {
              default: withCtx(() => [
                createVNode(tmScrollx, {
                  width: 686,
                  height: 300
                }, {
                  default: withCtx(() => [
                    createVNode(tmGrid, {
                      col: 7,
                      width: 1340
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(list.value, (item, index) => {
                          return openBlock(), createBlock(tmGridItem, {
                            key: index,
                            height: 140,
                            count: item.count
                          }, {
                            default: withCtx(() => [
                              createVNode(tmImage, {
                                width: 110,
                                height: 79,
                                src: item.path
                              }, null, 8, ["src"]),
                              createVNode(tmText, {
                                "font-size": 24,
                                label: item.title
                              }, null, 8, ["label"])
                            ]),
                            _: 2
                          }, 1032, ["count"]);
                        }), 128))
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
var scrollx = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/other/scrollx.nvue"]]);
export { scrollx as default };
