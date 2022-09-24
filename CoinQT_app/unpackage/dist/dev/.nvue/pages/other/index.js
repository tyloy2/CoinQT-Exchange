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
      { path: "/pages/other/codeinput", title: "\u9A8C\u8BC1\u7801\u8F93\u5165\u6846 Codeinput" },
      { path: "/pages/other/cropimg", title: "\u56FE\u7247\u88C1\u526A Cropimg" },
      { path: "/pages/other/floatButton", title: "\u60AC\u6D6E\u6309\u94AE FloatButton" },
      { path: "/pages/other/sticky", title: "\u5438\u9876 Sticky" },
      { path: "/pages/other/signBoard", title: "\u7B7E\u540D\u677F SignBoard" },
      { path: "/pages/other/barCode", title: "\u6761\u5F62\u7801 BarCode" },
      { path: "/pages/other/scrollx", title: "\u6A2A\u5411\u6EDA\u52A8 Scrollx" },
      { path: "/pages/other/watermark", title: "\u6C34\u5370 Watermark" }
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
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/other/index.nvue"]]);
export { index as default };
