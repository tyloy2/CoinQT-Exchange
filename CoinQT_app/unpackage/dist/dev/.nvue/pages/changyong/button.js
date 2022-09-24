import { defineComponent, openBlock, createElementBlock, createVNode, withCtx, createElementVNode } from "vue";
import { _ as _export_sfc, t as tmApp, a as tmText } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { T as TmButton } from "../../tm-button.js";
import { t as tmDivider } from "../../tm-divider.js";
import "pinia";
import "../../tm-icon.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "button",
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
                createElementVNode("view", { class: "flex flex-row flex-wrap" }, [
                  createVNode(TmButton, {
                    margin: [10, 10],
                    size: "mini",
                    shadow: 0,
                    label: "mini"
                  }),
                  createVNode(TmButton, {
                    margin: [10, 10],
                    size: "small",
                    shadow: 0,
                    label: "small"
                  }),
                  createVNode(TmButton, {
                    margin: [10, 10],
                    shadow: 0,
                    text: "",
                    size: "normal",
                    label: "normal"
                  }),
                  createVNode(TmButton, {
                    margin: [10, 10],
                    shadow: 0,
                    text: "",
                    border: 2,
                    borderStyle: "dashed",
                    size: "large",
                    label: "large"
                  }),
                  createVNode(TmButton, {
                    margin: [10, 10],
                    shadow: 0,
                    outlined: "",
                    size: "normal",
                    label: "normal"
                  }),
                  createVNode(TmButton, {
                    margin: [10, 10],
                    transprent: "",
                    text: "",
                    shadow: 0,
                    size: "normal",
                    label: "\u900F\u660E\u80CC\u666F"
                  })
                ]),
                createVNode(TmButton, {
                  block: "",
                  label: "block"
                })
              ]),
              _: 1
            }),
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: "\u5E26\u56FE\u6807"
                }),
                createVNode(tmDivider),
                createElementVNode("view", { class: "flex flex-row flex-wrap" }, [
                  createVNode(TmButton, {
                    icon: "tmicon-account",
                    size: "normal",
                    label: "\u6309\u94AE"
                  }),
                  createVNode(TmButton, {
                    color: "red",
                    icon: "tmicon-account",
                    width: 86,
                    round: 10,
                    height: 86,
                    fontSize: 40,
                    margin: [10, 10],
                    shadow: 0,
                    size: "normal"
                  }),
                  createVNode(TmButton, {
                    color: "green",
                    icon: "tmicon-account",
                    width: 86,
                    round: 10,
                    height: 86,
                    fontSize: 40,
                    margin: [10, 10],
                    shadow: 0,
                    text: "",
                    size: "normal"
                  }),
                  createVNode(TmButton, {
                    icon: "tmicon-account",
                    color: "pink",
                    margin: [10, 10],
                    shadow: 0,
                    text: "",
                    border: 2,
                    borderStyle: "dashed",
                    size: "normal",
                    label: "\u6309\u94AE"
                  })
                ])
              ]),
              _: 1
            }),
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: "\u6E10\u53D8\u6837\u5F0F,\u66F4\u591A\u5C5E\u6027\u89C1\u6587\u6863"
                }),
                createVNode(tmDivider),
                createVNode(TmButton, {
                  loading: "",
                  linear: "right",
                  block: "",
                  label: "light \u52A0\u8F7D\u4E2D"
                }),
                createVNode(TmButton, {
                  linear: "right",
                  linearDeep: "dark",
                  block: "",
                  label: "dark \u88AB\u7981\u7528"
                }),
                createVNode(TmButton, {
                  disabled: "",
                  linear: "right",
                  linearDeep: "dark",
                  block: "",
                  label: "dark \u88AB\u7981\u7528"
                }),
                createVNode(TmButton, {
                  linear: "right",
                  linearDeep: "accent",
                  block: "",
                  label: "accent"
                }),
                createVNode(TmButton, {
                  color: "pink",
                  linear: "right",
                  linearDeep: "accent",
                  block: "",
                  label: "accent"
                }),
                createVNode(TmButton, {
                  color: "orange",
                  linear: "right",
                  linearDeep: "accent",
                  block: "",
                  label: "accent top"
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
var button = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/changyong/button.nvue"]]);
export { button as default };
