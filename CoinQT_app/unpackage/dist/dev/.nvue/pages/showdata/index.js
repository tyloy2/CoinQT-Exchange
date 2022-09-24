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
      { path: "/pages/showdata/avatar", title: "\u5934\u50CF Avatar" },
      { path: "/pages/showdata/qrcode", title: "\u4E8C\u7EF4\u7801 Qrcode" },
      { path: "/pages/showdata/badge", title: "\u5FBD\u6807 Badge" },
      { path: "/pages/showdata/card", title: "\u5361\u7247 Card" },
      { path: "/pages/showdata/carousel", title: "\u8F6E\u64AD Carousel" },
      { path: "/pages/showdata/collapse", title: "\u6298\u53E0\u9762\u677F Collapse" },
      { path: "/pages/showdata/comment", title: "\u8BC4\u8BBA Comment" },
      { path: "/pages/showdata/cell", title: "\u5355\u5143\u683C Cell" },
      { path: "/pages/showdata/countdown", title: "\u5012\u8BA1\u65F6 Countdown" },
      { path: "/pages/showdata/descriptions", title: "\u63CF\u8FF0 Descriptions" },
      { path: "/pages/showdata/image", title: "\u56FE\u7247 Image" },
      { path: "/pages/showdata/indexes", title: "\u5217\u8868\u7D22\u5F15 Indexes" },
      { path: "/pages/showdata/more", title: "\u663E\u793A\u66F4\u591A More" },
      { path: "/pages/showdata/result", title: "\u7ED3\u679C\u9875 Result" },
      { path: "/pages/showdata/popover", title: "\u6C7D\u6CE1\u5361\u7247 Popover" },
      { path: "/pages/showdata/statistic", title: "\u6570\u503C\u663E\u793A Statistic" },
      { path: "/pages/showdata/table", title: "\u8868\u683C Table" },
      { path: "/pages/showdata/tabs", title: "\u9009\u9879\u5361 Tabs" },
      { path: "/pages/showdata/tag", title: "\u6807\u7B7E Tag" },
      { path: "/pages/showdata/datatable", title: "\u6570\u636E\u8868\u683C DataTable" },
      { path: "/pages/showdata/timeline", title: "\u65F6\u95F4\u8F74 Timeline" },
      { path: "/pages/showdata/tree", title: "\u6811 Tree" },
      { path: "/pages/showdata/virtual", title: "\u865A\u62DF\u5217\u8868 Virtual" },
      { path: "/pages/showdata/waterfall", title: "\u7011\u5E03\u6D41 Waterfall" }
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
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/showdata/index.nvue"]]);
export { index as default };
