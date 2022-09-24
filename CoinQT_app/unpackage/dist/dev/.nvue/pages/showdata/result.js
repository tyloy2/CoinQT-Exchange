import { defineComponent, openBlock, createElementBlock, createVNode, withCtx } from "vue";
import { _ as _export_sfc, t as tmApp, a as tmText } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmResult } from "../../tm-result.js";
import "pinia";
import "../../tm-icon.js";
import "../../tm-translate.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "result",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("scroll-view", {
        scrollY: true,
        showScrollbar: true,
        enableBackToTop: true,
        bubble: "true",
        style: { flexDirection: "column" }
      }, [
        createVNode(tmApp, { color: "white" }, {
          default: withCtx(() => [
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: "\u57FA\u7840\u793A\u4F8B,\u66F4\u591A\u89C1\u6587\u6863"
                })
              ]),
              _: 1
            }),
            createVNode(tmResult, {
              color: "green",
              status: "success"
            }),
            createVNode(tmResult, { showBtn: false }),
            createVNode(tmResult, {
              showBtn: false,
              color: "red",
              status: "network"
            })
          ]),
          _: 1
        })
      ]);
    };
  }
});
var result = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/showdata/result.nvue"]]);
export { result as default };
