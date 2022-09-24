import { defineComponent, ref, openBlock, createElementBlock, createVNode, withCtx, createElementVNode, Fragment, renderList, createBlock } from "vue";
import { _ as _export_sfc, t as tmApp } from "../../tm-text.js";
import { t as tmCell } from "../../tm-cell.js";
import { t as tmDivider } from "../../tm-divider.js";
import "pinia";
import "../../tm-sheet.js";
import "../../tm-icon.js";
import "../../tm-image.js";
import "../../tm-translate.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  setup(__props) {
    const list = ref([
      { path: "/pages/daohang/actionMenu", title: "\u5E95\u90E8\u64CD\u4F5C\u680F ActionMenu" },
      { path: "/pages/daohang/dropdown", title: "\u4E0B\u62C9\u9009\u9879 Dropdown" },
      { path: "/pages/daohang/navbar", title: "\u6807\u9898\u5BFC\u822A\u680F Navbar" },
      { path: "/pages/daohang/pagination", title: "\u5206\u9875 Pagination" },
      { path: "/pages/daohang/segtab", title: "\u5206\u6BB5\u5668 Segtab" },
      { path: "/pages/daohang/steps", title: "\u6B65\u9AA4\u6761 Steps" },
      { path: "/pages/daohang/tabbar", title: "\u5E95\u90E8\u5BFC\u822A Tabbar" }
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
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/daohang/index.nvue"]]);
export { index as default };
