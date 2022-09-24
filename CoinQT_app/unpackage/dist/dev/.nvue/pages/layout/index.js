import { defineComponent, ref, openBlock, createElementBlock, createVNode, withCtx, createElementVNode, Fragment, renderList, createBlock } from "vue";
import { _ as _export_sfc, t as tmApp } from "../../tm-text.js";
import { t as tmDivider } from "../../tm-divider.js";
import { t as tmCell } from "../../tm-cell.js";
import "pinia";
import "../../tm-sheet.js";
import "../../tm-icon.js";
import "../../tm-image.js";
import "../../tm-translate.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  setup(__props) {
    const list = ref([
      { path: "/pages/layout/divider", title: "\u5206\u5272\u7EBF Divider" },
      { path: "/pages/layout/grid", title: "\u5BAB\u683C Grid" },
      { path: "/pages/layout/row", title: "\u5E03\u5C40 Row" },
      { path: "/pages/layout/sheet", title: "\u57FA\u7840\u5BB9\u5668 Sheet" }
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
            createElementVNode("view", { class: "ma-32 round-3 overflow" }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(list.value, (item, index2) => {
                return openBlock(), createBlock(tmCell, {
                  key: index2,
                  url: item.path,
                  margin: [0, 0],
                  titleFontSize: 30,
                  title: item.title
                }, null, 8, ["url", "title"]);
              }), 128))
            ]),
            createElementVNode("view", { class: "py-32 mx-32" }, [
              createVNode(tmDivider, {
                color: "grey-2",
                label: "tmui 3.0.0 \u539F\u751F\u6E32\u67D3\uFF0C\u5168\u7AEF\u517C\u5BB9"
              })
            ])
          ]),
          _: 1
        })
      ]);
    };
  }
});
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/layout/index.nvue"]]);
export { index as default };
