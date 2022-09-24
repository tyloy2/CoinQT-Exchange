import { defineComponent, openBlock, createElementBlock, createVNode, withCtx, createElementVNode } from "vue";
import { _ as _export_sfc, t as tmApp, a as tmText } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmDivider } from "../../tm-divider.js";
import "pinia";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "divider",
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
                  label: "\u57FA\u7840\u793A\u4F8B"
                }),
                createVNode(tmDivider, {
                  color: "black",
                  realColor: "",
                  align: "left",
                  label: "\u6211\u5728\u5DE6\u8FB9"
                }),
                createVNode(tmDivider, {
                  align: "left",
                  label: "\u6211\u5728\u5DE6\u8FB9"
                }),
                createVNode(tmDivider, {
                  align: "center",
                  label: "\u6211\u5728\u4E2D\u95F4"
                }),
                createVNode(tmDivider, {
                  align: "right",
                  label: "\u6211\u5728\u53F3\u8FB9"
                }),
                createVNode(tmDivider, {
                  border: 10,
                  label: "\u6539\u53D8\u7C97\u7EC6"
                }),
                createVNode(tmDivider, {
                  color: "red",
                  "font-color": "red",
                  border: 10,
                  label: "\u6539\u53D8\u989C\u8272"
                }),
                createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: "\u4E0B\u65B9\u4E0D\u5E26\u6587\u672C\u5206\u5272\u7EBF"
                }),
                createVNode(tmDivider, { color: "green" })
              ]),
              _: 1
            }),
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createElementVNode("view", { class: "mb-24" }, [
                  createVNode(tmText, {
                    "font-size": 24,
                    _class: "font-weight-b",
                    label: "\u7AD6\u5411\u5206\u5272\u7EBF\uFF0C\u4E0D\u5141\u8BB8 \u643A\u5E26\u6587\u672C\u6807\u7B7E\u3002"
                  })
                ]),
                createElementVNode("view", { class: "flex flex-row flex-center" }, [
                  createVNode(tmDivider, {
                    vertical: "",
                    height: 200
                  }),
                  createVNode(tmDivider, {
                    color: "green",
                    vertical: "",
                    height: 200
                  }),
                  createVNode(tmDivider, {
                    color: "red",
                    vertical: "",
                    height: 200
                  }),
                  createVNode(tmDivider, {
                    color: "primary",
                    vertical: "",
                    height: 200
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
var divider = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/layout/divider.nvue"]]);
export { divider as default };
