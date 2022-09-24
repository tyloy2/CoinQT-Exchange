import { defineComponent, computed, openBlock, createElementBlock, createElementVNode, normalizeStyle, unref, renderSlot, ref, createVNode, withCtx } from "vue";
import { _ as _export_sfc, t as tmApp, a as tmText } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import "pinia";
var _style_0 = { "tm-sticky": { "": { "position": "sticky" } } };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "tm-sticky",
  props: {
    model: {
      type: String,
      default: "top"
    },
    offset: {
      type: [String, Number],
      default: "0px"
    },
    zIndex: {
      type: Number,
      default: 50
    }
  },
  setup(__props) {
    const props = __props;
    const _offset = computed(() => {
      if (typeof props.offset === "number")
        return props.offset + "rpx";
      return props.offset;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", { renderWhole: true }, [
        createElementVNode("view", {
          class: "tm-sticky flex flex-col",
          style: normalizeStyle([
            props.model == "top" ? { top: `${unref(_offset)}` } : "",
            props.model == "left" ? { left: `${unref(_offset)}` } : "",
            { "z-index": props.zIndex }
          ])
        }, [
          createElementVNode("view", { class: "flex flex-col" }, [
            renderSlot(_ctx.$slots, "sticky")
          ])
        ], 4),
        createElementVNode("view", null, [
          renderSlot(_ctx.$slots, "default")
        ])
      ]);
    };
  }
});
var tmSticky = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["styles", [_style_0]], ["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-sticky/tm-sticky.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "sticky",
  setup(__props) {
    const offset = ref(0);
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
            createVNode(tmSticky, { offset: offset.value }, {
              sticky: withCtx(() => [
                createVNode(tmSheet, {
                  color: "primary",
                  margin: [0, 0]
                }, {
                  default: withCtx(() => [
                    createVNode(tmText, {
                      "font-size": 24,
                      _class: "font-weight-b",
                      label: "\u6ED1\u52A8\u9875\u9762\u6211\u88AB\u60AC\u6D6E\u4E86"
                    })
                  ]),
                  _: 1
                })
              ]),
              default: withCtx(() => [
                createVNode(tmSheet, { height: 2e3 })
              ]),
              _: 1
            }, 8, ["offset"])
          ]),
          _: 1
        })
      ]);
    };
  }
});
var sticky = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/other/sticky.nvue"]]);
export { sticky as default };
