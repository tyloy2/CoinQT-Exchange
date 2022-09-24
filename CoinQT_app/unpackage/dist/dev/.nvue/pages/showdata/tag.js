import { defineComponent, ref, openBlock, createElementBlock, createVNode, withCtx, createElementVNode } from "vue";
import { _ as _export_sfc, t as tmApp, a as tmText } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmTag } from "../../tm-tag.js";
import { t as tmDivider } from "../../tm-divider.js";
import "pinia";
import "../../tm-icon.js";
import "../../tm-translate.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tag",
  setup(__props) {
    ref([
      { key: "1", title: "\u9009\u98791", icon: "tmicon-ios-leaf" },
      { key: "2", title: "\u9009\u98792", icon: "tmicon-ios-umbrella" },
      { key: "3", title: "\u9009\u98793", icon: "tmicon-ios-rocket" },
      { key: "4", title: "\u9009\u98794", icon: "tmicon-ios-partly-sunny" }
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
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 30,
                  _class: "font-weight-b",
                  label: "\u57FA\u7840\u793A\u4F8B,\u66F4\u591A\u89C1\u6587\u6863"
                }),
                createVNode(tmDivider),
                createElementVNode("view", { class: "flex-row flex flex-wrap" }, [
                  createVNode(tmTag, {
                    size: "xs",
                    label: "\u6807\u7B7E"
                  }),
                  createVNode(tmTag, {
                    color: "green",
                    size: "s",
                    label: "\u6807\u7B7E"
                  }),
                  createVNode(tmTag, {
                    color: "orange",
                    size: "m",
                    label: "\u6807\u7B7E"
                  }),
                  createVNode(tmTag, {
                    color: "red",
                    size: "n",
                    label: "\u6807\u7B7E"
                  }),
                  createVNode(tmTag, {
                    color: "blue",
                    size: "g",
                    label: "\u6807\u7B7E"
                  }),
                  createVNode(tmTag, {
                    color: "teal",
                    size: "lg",
                    label: "\u5927\u53F7\u6807\u7B7E"
                  })
                ])
              ]),
              _: 1
            }),
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 30,
                  _class: "font-weight-b",
                  label: "\u5141\u8BB8\u5173\u95ED"
                }),
                createVNode(tmDivider),
                createElementVNode("view", { class: "flex-row flex flex-wrap" }, [
                  createVNode(tmTag, {
                    closable: "",
                    size: "n",
                    label: "\u6807\u7B7E"
                  }),
                  createVNode(tmTag, {
                    closable: "",
                    color: "green",
                    size: "n",
                    label: "\u6807\u7B7E"
                  }),
                  createVNode(tmTag, {
                    closable: "",
                    color: "orange",
                    size: "n",
                    label: "\u6807\u7B7E"
                  }),
                  createVNode(tmTag, {
                    closable: "",
                    color: "red",
                    size: "n",
                    label: "\u6807\u7B7E"
                  })
                ])
              ]),
              _: 1
            }),
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 30,
                  _class: "font-weight-b",
                  label: "\u653E\u7F6E\u56FE\u6807\uFF0C\u4E00\u4E9B\u5176\u5B83\u5C5E\u6027"
                }),
                createVNode(tmDivider),
                createElementVNode("view", { class: "flex-row flex flex-wrap" }, [
                  createVNode(tmTag, {
                    text: "",
                    shadow: 0,
                    icon: "tmicon-weixinzhifu",
                    color: "orange",
                    size: "m",
                    label: "\u6807\u7B7E"
                  }),
                  createVNode(tmTag, {
                    text: "",
                    shadow: 0,
                    color: "red",
                    size: "m",
                    label: "\u6807\u7B7E"
                  }),
                  createVNode(tmTag, {
                    outlined: "",
                    shadow: 0,
                    color: "red",
                    size: "m",
                    label: "\u6807\u7B7E"
                  }),
                  createVNode(tmTag, {
                    round: 10,
                    text: "",
                    border: 1,
                    borderStyle: "dashed",
                    shadow: 0,
                    color: "red",
                    size: "m",
                    label: "\u6807\u7B7E"
                  }),
                  createVNode(tmTag, {
                    load: "",
                    text: "",
                    border: 1,
                    borderStyle: "dashed",
                    shadow: 0,
                    color: "green",
                    size: "m",
                    label: "\u52A0\u8F7D\u4E2D"
                  })
                ])
              ]),
              _: 1
            }),
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 30,
                  _class: "font-weight-b",
                  label: "\u8BBE\u7F6E\u4E3A\u53EF\u9009\u72B6\u6001"
                }),
                createVNode(tmDivider),
                createElementVNode("view", { class: "flex-row flex flex-wrap" }, [
                  createVNode(tmTag, {
                    checkable: "",
                    color: "orange",
                    size: "m",
                    label: "\u70B9\u6211\u5207\u6362\u9009\u4E2D"
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
var tag = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/showdata/tag.nvue"]]);
export { tag as default };
