import { defineComponent, openBlock, createElementBlock, createVNode, withCtx } from "vue";
import { _ as _export_sfc, t as tmApp, a as tmText } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmRate } from "../../tm-rate.js";
import { t as tmDivider } from "../../tm-divider.js";
import "pinia";
import "../../tm-icon.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "rate",
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
                  label: "\u57FA\u7840\u793A\u4F8B,\u66F4\u591A\u89C1\u6587\u6863"
                }),
                createVNode(tmDivider),
                createVNode(tmRate, { defaultValue: 2 })
              ]),
              _: 1
            }),
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: "\u53EA\u8BFB"
                }),
                createVNode(tmDivider),
                createVNode(tmRate, {
                  color: "green",
                  readonly: "",
                  defaultValue: 4,
                  showLabel: ""
                })
              ]),
              _: 1
            }),
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: "\u6839\u636E\u661F\u6570\u4E0D\u540C\u989C\u8272\u4E0D\u4E00\u6837"
                }),
                createVNode(tmDivider),
                createVNode(tmRate, {
                  color: ["red", "orange", "primary", "pink", "green"],
                  showLabel: ""
                })
              ]),
              _: 1
            }),
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: "\u66F4\u6362\u4E0D\u540C\u7684\u56FE\u6807"
                }),
                createVNode(tmDivider),
                createVNode(tmRate, {
                  defaultValue: 1,
                  icon: "tmicon-smile-fill",
                  color: ["red", "orange", "primary", "pink", "green"],
                  showLabel: ""
                })
              ]),
              _: 1
            }),
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: "\u7981\u7528"
                }),
                createVNode(tmDivider),
                createVNode(tmRate, {
                  defaultValue: 1,
                  disabled: ""
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
var rate = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/form/rate.nvue"]]);
export { rate as default };
