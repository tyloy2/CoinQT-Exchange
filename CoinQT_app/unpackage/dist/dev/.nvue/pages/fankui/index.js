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
      { path: "/pages/fankui/alert", title: "\u8B66\u544A\u63D0\u793A Alert" },
      { path: "/pages/fankui/drawer", title: "\u62BD\u5C49 Drawer" },
      { path: "/pages/fankui/darglist", title: "\u5217\u8868\u62D6\u52A8\u6392\u5E8F DragList" },
      { path: "/pages/fankui/modal", title: "\u5BF9\u8BDD\u6846 Modal" },
      { path: "/pages/fankui/message", title: "\u5168\u5C40\u63D0\u793A Message" },
      { path: "/pages/fankui/overlay", title: "\u906E\u7F69 Overlay" },
      { path: "/pages/fankui/progress", title: "\u8FDB\u5EA6\u6761 Progress" },
      { path: "/pages/fankui/spin", title: "\u52A0\u8F7D\u4E2D Spin" },
      { path: "/pages/fankui/slideSwitch", title: "\u5DE6\u6ED1\u64CD\u4F5C\u680F slideSwitch" },
      { path: "/pages/fankui/skeleton", title: "\u9AA8\u67B6\u5C4F Skeleton" },
      { path: "/pages/fankui/translate", title: "\u52A8\u6548 Translate" },
      { path: "/pages/fankui/notification", title: "\u901A\u77E5\u63D0\u9192 Notification" },
      { path: "/pages/fankui/rollNotice", title: "\u6EDA\u52A8\u901A\u77E5 RollNotice" }
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
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/fankui/index.nvue"]]);
export { index as default };
