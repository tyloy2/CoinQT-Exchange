import { defineComponent, openBlock, createElementBlock, createVNode, withCtx, createElementVNode } from "vue";
import { _ as _export_sfc, t as tmApp, a as tmText } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmBadge } from "../../tm-badge.js";
import { t as tmDivider } from "../../tm-divider.js";
import "pinia";
import "../../tm-icon.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "badge",
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
                  label: "\u5E94\u7528\u5728\u5176\u5B83\u4EFB\u4F55\u5143\u7D20\u4E0A"
                }),
                createVNode(tmDivider),
                createElementVNode("view", { class: "flex flex-row flex-between" }, [
                  createVNode(tmBadge, {
                    dot: "",
                    color: "red"
                  }, {
                    default: withCtx(() => [
                      createVNode(tmSheet, {
                        "no-level": "",
                        shadow: 2,
                        width: 100,
                        height: 100,
                        margin: [6, 6],
                        padding: [0, 0]
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(tmBadge, {
                    count: 99999,
                    maxCount: 99,
                    color: "red",
                    linear: "top"
                  }, {
                    default: withCtx(() => [
                      createVNode(tmSheet, {
                        "no-level": "",
                        shadow: 2,
                        width: 100,
                        height: 100,
                        margin: [6, 6],
                        padding: [0, 0]
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(tmBadge, {
                    count: "\u70ED\u95E8",
                    color: "pink",
                    linear: "right",
                    linearDeep: "accent"
                  }, {
                    default: withCtx(() => [
                      createVNode(tmSheet, {
                        "no-level": "",
                        shadow: 2,
                        width: 100,
                        height: 100,
                        margin: [6, 6],
                        padding: [0, 0]
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(tmBadge, {
                    icon: "tmicon-check",
                    color: "green"
                  }, {
                    default: withCtx(() => [
                      createVNode(tmSheet, {
                        "no-level": "",
                        shadow: 2,
                        width: 100,
                        height: 100,
                        margin: [6, 6],
                        padding: [0, 0]
                      })
                    ]),
                    _: 1
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
                  label: "\u57FA\u7840\u793A\u4F8B"
                }),
                createVNode(tmDivider),
                createElementVNode("view", { class: "flex flex-row flex-between" }, [
                  createVNode(tmBadge, {
                    dot: "",
                    color: "red"
                  }, {
                    default: withCtx(() => [
                      createVNode(tmText, { label: "\u6587\u672C\u6A21\u5F0F" })
                    ]),
                    _: 1
                  }),
                  createVNode(tmBadge, {
                    dot: "",
                    color: "green"
                  }, {
                    default: withCtx(() => [
                      createVNode(tmText, { label: "\u6587\u672C\u6A21\u5F0F" })
                    ]),
                    _: 1
                  }),
                  createVNode(tmBadge, {
                    dot: "",
                    color: "blue"
                  }, {
                    default: withCtx(() => [
                      createVNode(tmText, { label: "\u6587\u672C\u6A21\u5F0F" })
                    ]),
                    _: 1
                  }),
                  createVNode(tmBadge, {
                    dot: "",
                    color: "pink"
                  }, {
                    default: withCtx(() => [
                      createVNode(tmText, { label: "\u6587\u672C\u6A21\u5F0F" })
                    ]),
                    _: 1
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
                  label: "\u4F5C\u4E3A\u6587\u672C\u72B6\u6001\u4F7F\u7528"
                }),
                createVNode(tmDivider),
                createElementVNode("view", { class: "flex flex-row flex-between" }, [
                  createVNode(tmBadge, {
                    status: "",
                    dot: "",
                    label: "\u672A\u5904\u7406\u597D",
                    color: "red"
                  }),
                  createVNode(tmBadge, {
                    status: "",
                    dot: "",
                    label: "\u6B63\u786E\u5904\u7406",
                    color: "green"
                  }),
                  createVNode(tmBadge, {
                    status: "",
                    dot: "",
                    label: "\u6B63\u5E38",
                    color: "primary"
                  }),
                  createVNode(tmBadge, {
                    status: "",
                    dot: "",
                    label: "\u975E\u5E38nice",
                    color: "orange"
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
var badge = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/showdata/badge.nvue"]]);
export { badge as default };
