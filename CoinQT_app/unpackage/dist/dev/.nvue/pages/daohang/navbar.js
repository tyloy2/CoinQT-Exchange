import { defineComponent, ref, openBlock, createElementBlock, createVNode, withCtx } from "vue";
import { _ as _export_sfc, t as tmApp, a as tmText } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmIcon } from "../../tm-icon.js";
import { t as tmNavbar } from "../../tm-navbar.js";
import "pinia";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "navbar",
  setup(__props) {
    ref([
      { title: "\u5F00\u59CB" },
      { title: "\u6295\u653E\u4E2D" },
      { title: "\u5BA1\u6838" },
      { title: "\u6700\u540E\u5BA1\u67E5" },
      { title: "\u5B8C\u6210" }
    ]);
    ref([
      { title: "\u5F00\u59CB" },
      { title: "\u6295\u653E\u4E2D" },
      { title: "\u5BA1\u6838" }
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
            createVNode(tmNavbar, {
              title: "\u6807\u9898\u5BFC\u822A\u680F",
              color: "primary",
              linear: "right",
              linearDeep: "accent"
            }, {
              right: withCtx(() => [
                createVNode(tmIcon, { name: "tmicon-plus" })
              ]),
              _: 1
            }),
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createVNode(tmText, {
                  fontSize: 24,
                  _class: "font-weight-b",
                  label: "\u4F7F\u7528\u65F6\u5FC5\u987B\u653E\u7F6E\u5728\u9875\u9762\u7684\u9876\u90E8\r\n			\u5B83\u6709\u975E\u591A\u7684\u5C5E\u6027,\u8BF7\u884C\u914D\u7F6E\u5176\u5C5E\u6027,\u5F53\u4E3A\u6E10\u53D8\u80CC\u666F\u65F6,\u80CC\u666F\u78E8\u7802\u6548\u679C\u5C06\u4F1A\u6D88\u5931.\r\n			"
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
var navbar = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/daohang/navbar.nvue"]]);
export { navbar as default };
