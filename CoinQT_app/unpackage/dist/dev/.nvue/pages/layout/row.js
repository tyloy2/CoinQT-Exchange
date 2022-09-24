import { defineComponent, openBlock, createElementBlock, createVNode, withCtx, Fragment, renderList } from "vue";
import { _ as _export_sfc, t as tmApp, a as tmText } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmRow, a as tmCol } from "../../tm-col.js";
import { t as tmDivider } from "../../tm-divider.js";
import "pinia";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "row",
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
              color: "primary",
              round: 3,
              shadow: 2
            }, {
              default: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 24,
                  label: "\u7279\u522B\u6CE8\u610F\uFF1A\u4E3A\u4E86\u517C\u5BB9\u5168\u7AEF\uFF0C\u672Crow col\u91C7\u7528flex\u5E03\u5C40\uFF0C\u4E00\u5B9A\u8981\u4E25\u683C\u6309\u7167\u6587\u6863\u5C5E\u6027\u4F7F\u7528\uFF0C\u56E0\u4E3Arow col\u53EF\u80FD\u5728\u5E03\u5C40\u4E2D\u4F1A\u5927\u91CF\u5D4C\u5957\uFF0C\u56E0\u6B64\u4E0D\u91C7\u7528\u8BA1\u7B97\u5BBD\uFF0C\u4EE5\u53CA\u5FAE\u4FE1\u5B98\u65B9\u7684\u767E\u5206\u6BD4\uFF0C\u6D6E\u52A8\u7684\u5E03\u5C40\uFF0C\u56E0\u6B64 \u5E26\u6765\u4E86\u4E9B\u4E0D\u4FBF\u3002\u4F46\u5374\u83B7\u5F97\u4E86\u6700\u5927\u7684\u6027\u80FD\u4F18\u52BF\u3002"
                })
              ]),
              _: 1
            }),
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: "\u57FA\u7840\u793A\u4F8B,\u5E03\u5C40\u7EC4\u4EF6\u4E0D\u4F1A\u81EA\u52A8\u65AD\u884C"
                }),
                createVNode(tmDivider),
                createVNode(tmRow, { gutter: 5 }, {
                  default: withCtx(() => [
                    createVNode(tmCol, {
                      color: "red",
                      align: "start",
                      class: "flex-1"
                    }, {
                      default: withCtx(() => [
                        createVNode(tmText, { label: "\u5DE6\u5BF9\u9F501" })
                      ]),
                      _: 1
                    }),
                    createVNode(tmCol, {
                      color: "green",
                      class: "flex-1"
                    }, {
                      default: withCtx(() => [
                        createVNode(tmText, { label: "flex2\u6587\u672C1" })
                      ]),
                      _: 1
                    }),
                    createVNode(tmCol, {
                      color: "blue",
                      align: "end",
                      class: "flex-1"
                    }, {
                      default: withCtx(() => [
                        createVNode(tmText, { label: "\u53F3\u5BF9\u9F501" })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(tmRow, {
                  margin: [0, 5],
                  gutter: 5,
                  color: "blue-grey"
                }, {
                  default: withCtx(() => [
                    createVNode(tmCol, {
                      class: "flex-1",
                      color: "green"
                    }, {
                      default: withCtx(() => [
                        createVNode(tmText, { label: "1" })
                      ]),
                      _: 1
                    }),
                    createVNode(tmCol, {
                      class: "flex-2",
                      color: "red"
                    }, {
                      default: withCtx(() => [
                        createVNode(tmText, { label: "2" })
                      ]),
                      _: 1
                    }),
                    createVNode(tmCol, {
                      class: "flex-3",
                      color: "blue"
                    }, {
                      default: withCtx(() => [
                        createVNode(tmText, { label: "3" })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(tmRow, {
                  gutter: 5,
                  color: "blue-grey"
                }, {
                  default: withCtx(() => [
                    createVNode(tmCol, {
                      class: "flex-1",
                      color: "green"
                    }, {
                      default: withCtx(() => [
                        createVNode(tmText, { label: "1" })
                      ]),
                      _: 1
                    }),
                    createVNode(tmCol, {
                      class: "flex-11",
                      color: "blue"
                    }, {
                      default: withCtx(() => [
                        createVNode(tmText, { label: "11" })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(tmRow, {
                  margin: [0, 5],
                  gutter: 5,
                  color: "blue-grey"
                }, {
                  default: withCtx(() => [
                    createVNode(tmCol, {
                      class: "flex-6",
                      color: "green"
                    }, {
                      default: withCtx(() => [
                        createVNode(tmText, { label: "6" })
                      ]),
                      _: 1
                    }),
                    createVNode(tmCol, {
                      class: "flex-3",
                      color: "red"
                    }, {
                      default: withCtx(() => [
                        createVNode(tmText, { label: "3" })
                      ]),
                      _: 1
                    }),
                    createVNode(tmCol, {
                      class: "flex-3",
                      color: "blue"
                    }, {
                      default: withCtx(() => [
                        createVNode(tmText, { label: "3" })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(tmRow, {
                  gutter: 5,
                  color: "blue-grey"
                }, {
                  default: withCtx(() => [
                    (openBlock(), createElementBlock(Fragment, null, renderList(5, (item) => {
                      return createVNode(tmCol, {
                        key: item,
                        class: "flex-1",
                        color: "green"
                      }, {
                        default: withCtx(() => [
                          createVNode(tmText, { label: item }, null, 8, ["label"])
                        ]),
                        _: 2
                      }, 1024);
                    }), 64))
                  ]),
                  _: 1
                }),
                createVNode(tmRow, {
                  margin: [0, 5],
                  gutter: 5
                }, {
                  default: withCtx(() => [
                    createVNode(tmCol, {
                      color: "green",
                      class: "flex-1"
                    }, {
                      default: withCtx(() => [
                        createVNode(tmText, { label: "1" })
                      ]),
                      _: 1
                    }),
                    createVNode(tmCol, {
                      color: "green",
                      class: "flex-2"
                    }, {
                      default: withCtx(() => [
                        createVNode(tmText, { label: "2" })
                      ]),
                      _: 1
                    }),
                    createVNode(tmCol, {
                      class: "flex-7",
                      _class: "flex-row flex"
                    }, {
                      default: withCtx(() => [
                        createVNode(tmRow, {
                          class: "flex-12 fulled",
                          _class: "fulled"
                        }, {
                          default: withCtx(() => [
                            (openBlock(), createElementBlock(Fragment, null, renderList(3, (item) => {
                              return createVNode(tmCol, {
                                color: "blue",
                                key: item,
                                class: "flex-1"
                              }, {
                                default: withCtx(() => [
                                  createVNode(tmText, {
                                    label: "\u5D4C\u5957" + item
                                  }, null, 8, ["label"])
                                ]),
                                _: 2
                              }, 1024);
                            }), 64))
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
            }),
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: "\u66F4\u6539\u80CC\u666F\uFF0C\u95F4\u9699\uFF0C\u56FA\u5B9A\u5BBD\u9AD8"
                }),
                createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: "\u63D0\u4F9B\u4E86\u5BBD\u548C\u5217\u6570\uFF0C\u5C31\u4E0D\u8981\u4F7F\u7528flex\u5E03\u5C40\uFF0C\u56E0\u6B64\u4E0D\u8981\u63D0\u4F9Bflex-x\u5C5E\u6027\u3002"
                }),
                createVNode(tmDivider),
                createVNode(tmRow, {
                  width: 630,
                  column: 3,
                  color: "blue-grey",
                  gutter: 5
                }, {
                  default: withCtx(() => [
                    createVNode(tmCol, { color: "green" }, {
                      default: withCtx(() => [
                        createVNode(tmText, { label: "\u6587\u672C" })
                      ]),
                      _: 1
                    }),
                    createVNode(tmCol, { color: "red" }, {
                      default: withCtx(() => [
                        createVNode(tmText, { label: "\u6587\u672C" })
                      ]),
                      _: 1
                    }),
                    createVNode(tmCol, { color: "blue" }, {
                      default: withCtx(() => [
                        createVNode(tmText, { label: "\u6587\u672C" })
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
var row = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/layout/row.nvue"]]);
export { row as default };
