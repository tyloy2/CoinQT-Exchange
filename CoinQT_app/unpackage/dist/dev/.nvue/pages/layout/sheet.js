import { defineComponent, openBlock, createElementBlock, createVNode, withCtx } from "vue";
import { _ as _export_sfc, t as tmApp, a as tmText } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import "pinia";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "sheet",
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
            createVNode(tmSheet, {
              round: 3,
              shadow: 2
            }, {
              default: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: "\u672C\u7EC4\u4EF6\uFF0C\u662F\u6240\u6709\u7EC4\u4EF6\u7684\u57FA\u77F3\uFF0C\u62E5\u6709\u4F17\u591A\u4E2A\u6027\u5316\u5C5E\u6027\uFF0C\u8BF7\u67E5\u770B\u6587\u6863\u4E86\u89E3\u66F4\u591A\u5C5E\u6027\u3002\u8FB9\u7EBF\uFF0C\u80CC\u666F\u3001\u5706\u89D2\u3001\u6295\u5F71\u3001\u6E10\u53D8\u3001\u5185\u5916\u8FB9\u8DDD\u8F7B\u677E\u8BBE\u7F6E\uFF0C\u8FD8\u80FD\u517C\u5BB9\u5168\u7AEF\u3002"
                })
              ]),
              _: 1
            }),
            createVNode(tmSheet, { color: "primary" }, {
              default: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: "\u80CC\u666F\u8272"
                })
              ]),
              _: 1
            }),
            createVNode(tmSheet, {
              color: "pink",
              linear: "right"
            }, {
              default: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: "\u6E10\u53D8\u80CC\u666F\uFF0C\u8FD8\u6709\u66F4\u591A\u4E30\u5BCC\u5C5E\u6027\u89C1\u6587\u6863"
                })
              ]),
              _: 1
            }),
            createVNode(tmSheet, {
              color: "orange",
              linear: "bottom",
              liearDeep: "accent"
            }, {
              default: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: "\u4E0D\u540C\u7684\u65B9\u5411\uFF0C\u8FD8\u6709\u66F4\u591A\u4E30\u5BCC\u5C5E\u6027\u89C1\u6587\u6863"
                })
              ]),
              _: 1
            }),
            createVNode(tmSheet, {
              color: "orange",
              text: "",
              round: 3
            }, {
              default: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: "\u6587\u672C\u6D45\u8272\u80CC\u666F\uFF0C\u5706\u89D2"
                })
              ]),
              _: 1
            }),
            createVNode(tmSheet, {
              color: "orange",
              outlined: "",
              round: 3
            }, {
              default: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: "\u5E26\u8FB9\u6846,\u80CC\u666F\u900F\u660E"
                })
              ]),
              _: 1
            }),
            createVNode(tmSheet, {
              color: "green",
              border: 1,
              borderStyle: "dashed",
              text: "",
              round: 3
            }, {
              default: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: "\u865A\u7EBF\u8FB9\u6846"
                })
              ]),
              _: 1
            }),
            createVNode(tmSheet, {
              color: "blue-grey",
              border: 1,
              borderDirection: "y",
              text: ""
            }, {
              default: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: "\u4E0A\u4E0B\u8FB9\u7EBF"
                })
              ]),
              _: 1
            }),
            createVNode(tmSheet, {
              color: "blue-grey",
              outlined: "",
              round: 3
            }, {
              default: withCtx(() => [
                createVNode(tmSheet, {
                  color: "green",
                  outlined: "",
                  round: 3
                }, {
                  default: withCtx(() => [
                    createVNode(tmSheet, {
                      color: "red",
                      outlined: "",
                      round: 3
                    }, {
                      default: withCtx(() => [
                        createVNode(tmSheet, {
                          color: "green",
                          outlined: "",
                          text: "",
                          round: 3
                        }, {
                          default: withCtx(() => [
                            createVNode(tmText, {
                              "font-size": 24,
                              _class: "font-weight-b",
                              label: "\u53EF\u4EE5\u65E0\u9650\u5D4C\u5957"
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
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
var sheet = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/layout/sheet.nvue"]]);
export { sheet as default };
