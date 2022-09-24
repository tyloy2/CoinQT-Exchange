import { defineComponent, openBlock, createElementBlock, createVNode, withCtx, createElementVNode } from "vue";
import { _ as _export_sfc, t as tmApp, a as tmText } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmCard } from "../../tm-card.js";
import { T as TmButton } from "../../tm-button.js";
import "pinia";
import "../../tm-divider.js";
import "../../tm-icon.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "card",
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
                  label: "\u5361\u7247\u53EF\u4EE5\u5B8C\u5168\u901A\u8FC7\u63D2\u69FD\u81EA\u5B9A\u4E49"
                })
              ]),
              _: 1
            }),
            createVNode(tmCard, {
              status: "2022-5-2",
              title: "\u5361\u7247\u6807\u9898",
              content: "\u8FD9\u662F\u4E00\u4E2A\u57FA\u7840\u5361\u7247\u793A\u4F8B\uFF0C\u975E\u5E38\u7B80\u5355\u4E14\u5B9E\u7528\u3002\u8FD9\u662F\u4E00\u4E2A\u57FA\u7840\u5361\u7247\u793A\u4F8B\uFF0C\u975E\u5E38\u7B80\u5355\u4E14\u5B9E\u7528\u3002"
            }, {
              action: withCtx(() => [
                createElementVNode("view", { class: "flex flex-row flex-row-center-end" }, [
                  createVNode(TmButton, {
                    margin: [24, 0],
                    label: "\u786E\u8BA4",
                    "font-size": 24,
                    width: 120,
                    height: 50
                  }),
                  createVNode(TmButton, {
                    color: "white",
                    label: "\u53D6\u6D88",
                    "font-size": 24,
                    width: 120,
                    height: 50
                  })
                ])
              ]),
              _: 1
            }),
            createVNode(tmCard, {
              status: "2022-5-2",
              title: "\u5361\u7247\u6807\u9898",
              content: "\u8FD9\u662F\u4E00\u4E2A\u57FA\u7840\u5361\u7247\u793A\u4F8B\uFF0C\u975E\u5E38\u7B80\u5355\u4E14\u5B9E\u7528\u3002\u8FD9\u662F\u4E00\u4E2A\u57FA\u7840\u5361\u7247\u793A\u4F8B\uFF0C\u975E\u5E38\u7B80\u5355\u4E14\u5B9E\u7528\u3002"
            }),
            createVNode(tmCard, {
              border: 1,
              statusColor: "red",
              status: "2022-5-2",
              title: "\u770B\u5230\u8FB9\u7EBF\u5361\u7247\u6807\u9898\u4E86\u5417\uFF1F",
              content: "\u8FD9\u662F\u4E00\u4E2A\u57FA\u7840\u5361\u7247\u793A\u4F8B\uFF0C\u975E\u5E38\u7B80\u5355\u4E14\u5B9E\u7528\u3002\u8FD9\u662F\u4E00\u4E2A\u57FA\u7840\u5361\u7247\u793A\u4F8B\uFF0C\u975E\u5E38\u7B80\u5355\u4E14\u5B9E\u7528\u3002"
            }),
            createVNode(tmCard, {
              status: "2022-5-2",
              title: "\u5361\u7247\u6807\u9898",
              content: "\u8FD9\u662F\u4E00\u4E2A\u57FA\u7840\u5361\u7247\u793A\u4F8B\uFF0C\u975E\u5E38\u7B80\u5355\u4E14\u5B9E\u7528\u3002\u8FD9\u662F\u4E00\u4E2A\u57FA\u7840\u5361\u7247\u793A\u4F8B\uFF0C\u975E\u5E38\u7B80\u5355\u4E14\u5B9E\u7528\u3002"
            }, {
              action: withCtx(() => [
                createElementVNode("view", { class: "flex flex-row flex-row-center-end" }, [
                  createVNode(TmButton, {
                    color: "red",
                    margin: [24, 0],
                    label: "\u786E\u8BA4",
                    "font-size": 24,
                    width: 120,
                    height: 50
                  }),
                  createVNode(TmButton, {
                    color: "white",
                    label: "\u53D6\u6D88",
                    "font-size": 24,
                    width: 120,
                    height: 50
                  })
                ])
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
var card = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/showdata/card.nvue"]]);
export { card as default };
