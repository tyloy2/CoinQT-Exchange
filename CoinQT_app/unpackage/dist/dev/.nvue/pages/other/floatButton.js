import { defineComponent, openBlock, createElementBlock, createVNode, withCtx } from "vue";
import { _ as _export_sfc, t as tmApp, a as tmText } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmFloatButton } from "../../tm-float-button.js";
import "pinia";
import "../../tm-icon.js";
import "../../tm-button.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "floatButton",
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
                  label: "\u57FA\u7840\u793A\u4F8B\uFF0C\u66F4\u591A\u5C5E\u6027\u548C\u529F\u80FD\u89C1\u6587\u6863"
                })
              ]),
              _: 1
            }),
            createVNode(tmFloatButton, {
              position: "tr",
              btn: { icon: "tmicon-reply", linear: "bottom" }
            }),
            createVNode(tmFloatButton, {
              position: "bc",
              btn: { icon: "tmicon-plus", linear: "bottom", color: "green" }
            })
          ]),
          _: 1
        })
      ]);
    };
  }
});
var floatButton = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/other/floatButton.nvue"]]);
export { floatButton as default };
