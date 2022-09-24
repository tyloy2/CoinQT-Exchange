import { defineComponent, ref, openBlock, createElementBlock, createVNode, withCtx } from "vue";
import { _ as _export_sfc, t as tmApp, a as tmText } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmSegtab } from "../../tm-segtab.js";
import { t as tmDivider } from "../../tm-divider.js";
import "pinia";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "segtab",
  setup(__props) {
    const list = ref([
      { text: "\u82F9\u679C", id: "1" },
      { text: "\u83E0\u841D", id: "2" },
      { text: "\u9999\u8549", id: "3" }
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
                  fontSize: 24,
                  _class: "font-weight-b",
                  label: "\u57FA\u7840\u5C5E\u6027,\u66F4\u591A\u73A9\u6CD5\u8BF7\u524D\u5F80\u6587\u6863\u3002"
                }),
                createVNode(tmDivider),
                createVNode(tmSegtab, {
                  width: 636,
                  list: list.value,
                  defaultValue: "2"
                }, null, 8, ["list"])
              ]),
              _: 1
            }),
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createVNode(tmText, {
                  fontSize: 24,
                  _class: "font-weight-b",
                  label: "\u6539\u53D8\u6309\u94AE\u4E3B\u9898"
                }),
                createVNode(tmDivider),
                createVNode(tmSegtab, {
                  width: 636,
                  color: "primary",
                  activeColor: "white",
                  list: list.value,
                  defaultValue: "2"
                }, null, 8, ["list"])
              ]),
              _: 1
            }),
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createVNode(tmText, {
                  fontSize: 24,
                  _class: "font-weight-b",
                  label: "\u80CC\u666F"
                }),
                createVNode(tmDivider),
                createVNode(tmSegtab, {
                  width: 636,
                  bgColor: "primary",
                  followDark: false,
                  color: "white",
                  activeColor: "black",
                  list: list.value,
                  defaultValue: "2"
                }, null, 8, ["list"])
              ]),
              _: 1
            }),
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createVNode(tmText, {
                  fontSize: 24,
                  _class: "font-weight-b",
                  label: "\u6E10\u53D8"
                }),
                createVNode(tmDivider),
                createVNode(tmSegtab, {
                  width: 636,
                  bgColor: "blue-grey",
                  followDark: false,
                  linear: "right",
                  color: "white",
                  activeColor: "black",
                  list: list.value,
                  defaultValue: "2"
                }, null, 8, ["list"])
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
var segtab = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/daohang/segtab.nvue"]]);
export { segtab as default };
