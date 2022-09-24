import { defineComponent, ref, openBlock, createElementBlock, createVNode, withCtx, Fragment, renderList, createBlock } from "vue";
import { _ as _export_sfc, t as tmApp, a as tmText } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmIcon } from "../../tm-icon.js";
import { t as tmDivider } from "../../tm-divider.js";
import { t as tmGrid, a as tmGridItem } from "../../tm-grid.js";
import "pinia";
import "../../tm-badge.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "grid",
  setup(__props) {
    const testNum = ref([]);
    for (let i = 0; i < 6; i++) {
      testNum.value.push(i);
    }
    const del = (index) => {
      testNum.value.splice(index, 1);
    };
    const add = (index) => {
      testNum.value.push(index);
    };
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
                  label: "\u57FA\u7840\u793A\u4F8B(\u70B9\u51FB\u9879\u76EE\u51CF\u5C11)"
                }),
                createVNode(tmDivider),
                createVNode(tmGrid, {
                  width: 630,
                  col: 3
                }, {
                  default: withCtx(() => [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(testNum.value, (item, index) => {
                      return openBlock(), createBlock(tmGridItem, {
                        onClick: ($event) => del(index),
                        key: index
                      }, {
                        default: withCtx(() => [
                          createVNode(tmText, { label: item }, null, 8, ["label"])
                        ]),
                        _: 2
                      }, 1032, ["onClick"]);
                    }), 128))
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
                  label: "\u542B\u6709\u8FB9\u7EBF(\u70B9\u51FB\u9879\u76EE\u65B0\u589E)"
                }),
                createVNode(tmDivider),
                createVNode(tmGrid, {
                  showBorder: "",
                  width: 630,
                  col: 3
                }, {
                  default: withCtx(() => [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(testNum.value, (item, index) => {
                      return openBlock(), createBlock(tmGridItem, {
                        onClick: ($event) => add(index),
                        key: index
                      }, {
                        default: withCtx(() => [
                          createVNode(tmText, { label: item }, null, 8, ["label"])
                        ]),
                        _: 2
                      }, 1032, ["onClick"]);
                    }), 128))
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
                  label: "\u5E26\u89D2\u6807\u7684\u5BAB\u683C"
                }),
                createVNode(tmDivider),
                createVNode(tmGrid, {
                  width: 630,
                  col: 4
                }, {
                  default: withCtx(() => [
                    createVNode(tmGridItem, { dot: "" }, {
                      default: withCtx(() => [
                        createVNode(tmText, { label: "\u5BAB\u683C\u6587\u672C" })
                      ]),
                      _: 1
                    }),
                    createVNode(tmGridItem, { count: "HOT" }, {
                      default: withCtx(() => [
                        createVNode(tmText, { label: "\u5BAB\u683C\u6587\u672C" })
                      ]),
                      _: 1
                    }),
                    createVNode(tmGridItem, { count: 55 }, {
                      default: withCtx(() => [
                        createVNode(tmText, { label: "\u5BAB\u683C\u6587\u672C" })
                      ]),
                      _: 1
                    }),
                    createVNode(tmGridItem, { icon: "tmicon-gem" }, {
                      default: withCtx(() => [
                        createVNode(tmText, { label: "\u5BAB\u683C\u6587\u672C" })
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
                  label: "\u81EA\u5B9A\u66F4\u591A\u5185\u5BB9"
                }),
                createVNode(tmDivider),
                createVNode(tmGrid, {
                  width: 630,
                  col: 3
                }, {
                  default: withCtx(() => [
                    createVNode(tmGridItem, {
                      height: 120,
                      dot: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(tmIcon, {
                          name: "tmicon-user-fill",
                          "font-size": 42
                        }),
                        createVNode(tmText, {
                          _class: "pt-10",
                          "font-size": 22,
                          label: "\u5BAB\u683C\u6587\u672C"
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(tmGridItem, {
                      color: "orange",
                      height: 120,
                      count: "\u79EF\u5206"
                    }, {
                      default: withCtx(() => [
                        createVNode(tmIcon, {
                          name: "tmicon-cog-fill",
                          "font-size": 42
                        }),
                        createVNode(tmText, {
                          _class: "pt-10",
                          "font-size": 22,
                          label: "\u5BAB\u683C\u6587\u672C"
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(tmGridItem, {
                      color: "green",
                      height: 120,
                      count: 55
                    }, {
                      default: withCtx(() => [
                        createVNode(tmIcon, {
                          name: "tmicon-heart-fill",
                          "font-size": 42
                        }),
                        createVNode(tmText, {
                          "font-size": 22,
                          label: "\u5BAB\u683C\u6587\u672C"
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(tmGridItem, {
                      color: "pink",
                      height: 120,
                      icon: "tmicon-gem"
                    }, {
                      default: withCtx(() => [
                        createVNode(tmIcon, {
                          name: "tmicon-layergroup-fill",
                          "font-size": 42
                        }),
                        createVNode(tmText, {
                          _class: "pt-10",
                          "font-size": 22,
                          label: "\u5BAB\u683C\u6587\u672C"
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(tmGridItem, { height: 120 }, {
                      default: withCtx(() => [
                        createVNode(tmIcon, {
                          color: "blue",
                          name: "tmicon-lightbulb-fill",
                          "font-size": 42
                        }),
                        createVNode(tmText, {
                          _class: "pt-10",
                          "font-size": 22,
                          label: "\u5BAB\u683C\u6587\u672C"
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
var grid = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/layout/grid.nvue"]]);
export { grid as default };
