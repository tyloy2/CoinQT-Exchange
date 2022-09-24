import { defineComponent, openBlock, createElementBlock, createVNode, withCtx } from "vue";
import { _ as _export_sfc, t as tmApp, a as tmText } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmDivider } from "../../tm-divider.js";
import "pinia";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "text",
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
                  label: "\u57FA\u672C\u793A\u4F8B"
                }),
                createVNode(tmDivider),
                createVNode(tmText, { label: "\u8FD9\u662F\u6587\u672C\u6807\u7B7E\uFF0C\u6587\u672C\u663E\u793A\u5FC5\u9700\u8981\u4F7F\u7528\u6B64\u6807\u7B7E" })
              ]),
              _: 1
            }),
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: "\u5176\u5B83\u793A\u4F8B"
                }),
                createVNode(tmDivider),
                createVNode(tmText, {
                  color: "red",
                  label: "\u989C\u8272\uFF0C\u8FD9\u662F\u6587\u672C\u6807\u7B7E\uFF0C\u6587\u672C\u663E\u793A\u5FC5\u9700\u8981\u4F7F\u7528\u6B64\u6807\u7B7E"
                }),
                createVNode(tmText, {
                  color: "grey",
                  "font-size": 24,
                  label: "\u6587\u5B57\u5927\u5C0F\uFF0C\u8FD9\u662F\u6587\u672C\u6807\u7B7E\uFF0C\u6587\u672C\u663E\u793A\u5FC5\u9700\u8981\u4F7F\u7528\u6B64\u6807\u7B7E"
                })
              ]),
              _: 1
            }),
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createVNode(tmText, {
                  _class: "text-overflow-1",
                  label: "1\u884C\u5E26\u7701\u7565\uFF0C\u8FD9\u662F\u6587\u672C\u6807\u7B7E\uFF0C\u6587\u672C\u663E\u793A\u5FC5\u9700\u8981\u4F7F\u7528\u6B64\u6807\u7B7E\uFF0C\u6587\u672C\u663E\u793A\u5FC5\u9700\u8981\u4F7F\u7528\u6B64\u6807"
                })
              ]),
              _: 1
            }),
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createVNode(tmText, {
                  _class: "text-overflow-2",
                  label: "2\u884C\u5E26\u7701\u7565\uFF0C\u8FD9\u662F\u6587\u672C\u6807\u7B7E\uFF0C\u6587\u672C\u663E\u793A\u5FC5\u9700\u8981\u4F7F\u7528\u6B64\u6807\u7B7E\uFF0C\u6587\u672C\u663E\u793A\u5FC5\u9700\u8981\u4F7F\u7528\u6B64\u6807\u793A\u5FC5\u9700\u8981\u4F7F\u7528\u6B64\u6807\u7B7E\uFF0C\u6587\u672C\u663E\u793A\u5FC5\u9700\u8981\u4F7F\u7528\u6B64\u6807"
                })
              ]),
              _: 1
            }),
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createVNode(tmText, {
                  selectable: "",
                  label: "\u957F\u6309\u6587\u672C\u53EF\u4EE5\u590D\u5236"
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
var text = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/changyong/text.nvue"]]);
export { text as default };
