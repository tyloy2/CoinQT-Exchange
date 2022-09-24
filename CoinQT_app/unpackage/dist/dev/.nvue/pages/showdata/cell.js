import { defineComponent, openBlock, createElementBlock, createVNode, withCtx, createElementVNode } from "vue";
import { _ as _export_sfc, t as tmApp, a as tmText } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { T as TmCheckbox } from "../../tm-checkbox.js";
import { t as tmCell } from "../../tm-cell.js";
import "pinia";
import "../../tm-icon.js";
import "../../tm-translate.js";
import "../../tm-image.js";
import "../../tm-divider.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "cell",
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
                })
              ]),
              _: 1
            }),
            createElementVNode("view", { class: "mb-32 mx-32 round-3 overflow" }, [
              createVNode(tmCell, {
                margin: [0, 0],
                titleFontSize: 30,
                title: "\u5934\u50CF Avatar"
              }),
              createVNode(tmCell, {
                margin: [0, 0],
                titleFontSize: 30,
                title: "\u5FBD\u6807 Badge"
              }),
              createVNode(tmCell, {
                margin: [0, 0],
                titleFontSize: 30,
                title: "\u5361\u7247 Card"
              })
            ]),
            createElementVNode("view", { class: "mb-32 mx-32 round-3 overflow" }, [
              createVNode(tmCell, {
                round: 3,
                margin: [0, 8],
                titleFontSize: 30,
                title: "\u5934\u50CF Avatar"
              }),
              createVNode(tmCell, {
                round: 3,
                margin: [0, 8],
                rightText: "\u7B80\u5355\u7EC4\u4EF6\u7B80\u5355\u7EC4\u4EF6",
                titleFontSize: 30,
                title: "\u5FBD\u6807 Badge"
              }),
              createVNode(tmCell, {
                round: 3,
                margin: [0, 8],
                rightColor: "red",
                rightText: "2\u4E2A",
                titleFontSize: 30,
                title: "\u5361\u7247 Card"
              })
            ]),
            createElementVNode("view", { class: "mb-32 mx-32 round-3 overflow" }, [
              createVNode(tmCell, {
                bottomBorder: "",
                margin: [0, 0],
                titleFontSize: 30,
                title: "\u5934\u50CF Avatar"
              }),
              createVNode(tmCell, {
                bottomBorder: "",
                margin: [0, 0],
                titleFontSize: 30,
                title: "\u5FBD\u6807 Badge"
              }),
              createVNode(tmCell, {
                margin: [0, 0],
                titleFontSize: 30,
                title: "\u5361\u7247 Card"
              })
            ]),
            createElementVNode("view", { class: "mb-32 mx-32 round-3 overflow" }, [
              createVNode(tmCell, {
                showAvatar: "",
                avatar: "https://picsum.photos/200",
                rightText: "\u7B80\u5355\u7EC4\u4EF6\u7B80\u5355\u7EC4\u4EF6",
                margin: [0, 0],
                titleFontSize: 30,
                title: "\u5934\u50CF Avatar"
              }),
              createVNode(tmCell, {
                margin: [0, 0],
                titleFontSize: 30,
                title: "\u5FBD\u6807 Badge"
              }, {
                right: withCtx(() => [
                  createVNode(TmCheckbox, { round: 12 })
                ]),
                _: 1
              }),
              createVNode(tmCell, {
                margin: [0, 0],
                titleFontSize: 30,
                title: "\u5361\u7247 Card"
              })
            ])
          ]),
          _: 1
        })
      ]);
    };
  }
});
var cell = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/showdata/cell.nvue"]]);
export { cell as default };
