import { defineComponent, ref, computed, openBlock, createElementBlock, normalizeClass, Fragment, renderList, unref, createBlock, withCtx, createVNode, createCommentVNode } from "vue";
import { _ as _export_sfc, a as tmText, t as tmApp } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmIcon } from "../../tm-icon.js";
import "pinia";
var _style_0 = { "keywordBoradAni": { "": { "transitionDuration": 100, "transitionTimingFunction": "linear", "transitionDelay": 0, "transitionProperty": "transform", "transform": "scale(0.85)" } }, "@TRANSITION": { "keywordBoradAni": { "duration": 100, "timingFunction": "linear", "delay": 0, "property": "transform" } } };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "tm-pagination",
  props: {
    followTheme: {
      type: [Boolean, String],
      default: false
    },
    total: {
      type: Number,
      default: 0,
      required: true
    },
    current: {
      type: Number,
      default: 0
    },
    defaultCurrent: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    disabled: {
      type: Boolean,
      default: false
    },
    simple: {
      type: Boolean,
      default: false
    },
    btnSize: {
      type: Number,
      default: 5
    },
    btnSizeNum: {
      type: Number,
      default: 1
    },
    color: {
      type: String,
      default: "primary"
    },
    btnColor: {
      type: String,
      default: "white"
    },
    followDark: {
      type: [Boolean, String],
      default: true
    },
    dark: {
      type: [Boolean, String],
      default: false
    },
    round: {
      type: [Number],
      default: 3
    },
    shadow: {
      type: [Number],
      default: 2
    },
    text: {
      type: [Boolean, String],
      default: false
    },
    linear: {
      type: [String],
      default: "bottom"
    },
    linearDeep: {
      type: [String],
      default: "light"
    }
  },
  emits: ["update:current", "change"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const p_current = ref(props.defaultCurrent || 1);
    const _pageSize = ref(props.pageSize || 10);
    const computedCurrent = computed(() => p_current.value);
    const computedPageSize = computed(() => _pageSize.value);
    const pages = computed(() => Math.ceil(props.total / computedPageSize.value));
    const pageList = computed(() => {
      const pageList2 = [];
      if (pages.value < props.btnSize + props.btnSizeNum * 2) {
        for (let i = 1; i <= pages.value; i++) {
          pageList2.push({
            key: i,
            page: i
          });
        }
      } else {
        let left = 1;
        let right = pages.value;
        let hasLeftEllipsis = false;
        let hasRightEllipsis = false;
        if (computedCurrent.value > 2 + props.btnSizeNum) {
          hasLeftEllipsis = true;
          left = Math.min(computedCurrent.value - props.btnSizeNum, pages.value - 2 * props.btnSizeNum);
        }
        if (computedCurrent.value < pages.value - (props.btnSizeNum + 1)) {
          hasRightEllipsis = true;
          right = Math.max(computedCurrent.value + props.btnSizeNum, 2 * props.btnSizeNum + 1);
        }
        if (hasLeftEllipsis) {
          pageList2.push({
            key: 1,
            page: 1
          });
          pageList2.push({
            key: "left-more",
            page: "...",
            step: -(props.btnSizeNum * 2 + 1)
          });
        }
        for (let i = left; i <= right; i++) {
          pageList2.push({
            key: i,
            page: i
          });
        }
        if (hasRightEllipsis) {
          pageList2.push({
            key: "right-more",
            page: "...",
            step: props.btnSizeNum * 2 + 1
          });
          pageList2.push({
            key: pages.value,
            page: pages.value
          });
        }
      }
      return pageList2;
    });
    function btnClick(item) {
      if (props.disabled)
        return;
      if (item.page != "...") {
        p_current.value = parseInt(item.page);
        emits("update:current", p_current.value);
        emits("change", p_current.value);
      } else {
        p_current.value = p_current.value + item.step;
        emits("update:current", p_current.value);
        emits("change", p_current.value);
      }
    }
    function pnbtn(type) {
      if (props.disabled)
        return;
      if (type == "prev") {
        let p = p_current.value - 1;
        if (p <= 1)
          p = 1;
        p_current.value = p;
        emits("update:current", p_current.value);
        emits("change", p_current.value);
      } else if (type == "next") {
        let p = p_current.value + 1;
        if (p >= pages.value)
          p = pages.value;
        p_current.value = p;
        emits("update:current", p_current.value);
        emits("change", p_current.value);
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        class: "flex flex-col relative flex-center",
        renderWhole: true
      }, [
        !__props.simple ? (openBlock(), createElementBlock("view", {
          key: 0,
          class: normalizeClass(["flex flex-row relative flex-center", [props.disabled ? "opacity-5" : ""]])
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(pageList), (item, index) => {
            return openBlock(), createBlock(tmSheet, {
              noLevel: "",
              "hover-class": "keywordBoradAni opacity-5",
              onClick: ($event) => btnClick(item),
              width: 70,
              height: 70,
              padding: [0, 0],
              round: props.round,
              shadow: item.page == "..." ? 0 : props.shadow,
              followTheme: unref(computedCurrent) == item.page ? props.followTheme : false,
              followDark: props.followDark,
              dark: props.dark,
              text: props.text,
              linear: unref(computedCurrent) == item.page ? props.linear : "",
              linearDeep: props.linearDeep,
              _class: "flex-center",
              transprent: item.page == "...",
              color: unref(computedCurrent) == item.page ? props.color : props.btnColor,
              margin: [16, 24],
              key: index
            }, {
              default: withCtx(() => [
                createVNode(tmText, {
                  userInteractionEnabled: false,
                  _style: "line-height:70rpx;cursor: pointer;",
                  label: String(item.page)
                }, null, 8, ["label"])
              ]),
              _: 2
            }, 1032, ["onClick", "round", "shadow", "followTheme", "followDark", "dark", "text", "linear", "linearDeep", "transprent", "color"]);
          }), 128))
        ], 2)) : createCommentVNode("v-if", true),
        __props.simple ? (openBlock(), createElementBlock("view", {
          key: 1,
          class: normalizeClass(["flex flex-row relative flex-center", [props.disabled ? "opacity-5" : ""]])
        }, [
          createVNode(tmSheet, {
            noLevel: "",
            "hover-class": "keywordBoradAni opacity-5",
            onClick: _cache[0] || (_cache[0] = ($event) => pnbtn("prev")),
            width: 140,
            height: 70,
            padding: [0, 0],
            round: props.round,
            shadow: props.shadow,
            followTheme: false,
            followDark: props.followDark,
            dark: props.dark,
            text: props.text,
            _class: ["flex-center", unref(computedCurrent) == 1 ? "opacity-3" : ""],
            color: props.btnColor,
            margin: [10, 24]
          }, {
            default: withCtx(() => [
              createVNode(tmIcon, {
                userInteractionEnabled: false,
                dark: props.dark,
                color: "grey-darken-2",
                fontSize: 24,
                followTheme: false,
                name: "tmicon-angle-left"
              }, null, 8, ["dark"])
            ]),
            _: 1
          }, 8, ["round", "shadow", "followDark", "dark", "text", "_class", "color"]),
          createVNode(tmText, {
            dark: props.dark,
            _style: "line-height:70rpx;",
            _class: "px-40",
            label: `${unref(computedCurrent)}/${unref(pages)}`
          }, null, 8, ["dark", "label"]),
          createVNode(tmSheet, {
            noLevel: "",
            "hover-class": "keywordBoradAni opacity-5",
            onClick: _cache[1] || (_cache[1] = ($event) => pnbtn("next")),
            width: 140,
            height: 70,
            padding: [0, 0],
            round: props.round,
            shadow: props.shadow,
            followTheme: false,
            followDark: props.followDark,
            dark: props.dark,
            text: props.text,
            _class: ["flex-center", unref(computedCurrent) == unref(pages) ? "opacity-3" : ""],
            color: props.btnColor,
            margin: [10, 24]
          }, {
            default: withCtx(() => [
              createVNode(tmIcon, {
                userInteractionEnabled: false,
                dark: props.dark,
                color: "grey-darken-2",
                fontSize: 24,
                followTheme: false,
                name: "tmicon-angle-right"
              }, null, 8, ["dark"])
            ]),
            _: 1
          }, 8, ["round", "shadow", "followDark", "dark", "text", "_class", "color"])
        ], 2)) : createCommentVNode("v-if", true)
      ]);
    };
  }
});
var tmPagination = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["styles", [_style_0]], ["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-pagination/tm-pagination.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "pagination",
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
                  fontSize: 24,
                  _class: "font-weight-b",
                  label: "\u57FA\u7840\u5C5E\u6027,\u66F4\u591A\u73A9\u6CD5\u8BF7\u524D\u5F80\u6587\u6863\u3002"
                })
              ]),
              _: 1
            }),
            createVNode(tmSheet, {
              padding: [12, 12],
              margin: [0, 0]
            }, {
              default: withCtx(() => [
                createVNode(tmPagination, { total: 100 })
              ]),
              _: 1
            }),
            createVNode(tmSheet, {
              padding: [12, 12],
              margin: [0, 0]
            }, {
              default: withCtx(() => [
                createVNode(tmPagination, {
                  color: "red",
                  total: 100
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
var pagination = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/daohang/pagination.nvue"]]);
export { pagination as default };
