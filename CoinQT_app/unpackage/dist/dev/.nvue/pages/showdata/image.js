import { defineComponent, computed, provide, openBlock, createElementBlock, normalizeStyle, unref, renderSlot, createVNode, withCtx, createElementVNode, Fragment, renderList } from "vue";
import { _ as _export_sfc, t as tmApp, a as tmText } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmIcon } from "../../tm-icon.js";
import { t as tmDivider } from "../../tm-divider.js";
import { t as tmImage } from "../../tm-image.js";
import "pinia";
import "../../tm-translate.js";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "tm-image-group",
  props: {
    width: {
      type: [Number, String],
      default: 0
    }
  },
  setup(__props, { expose }) {
    const props = __props;
    const _width = computed(() => props.width);
    const _catchList = [];
    function pushKey(e) {
      let index = _catchList.findIndex((el) => {
        return el.src == e.src;
      });
      if (index > -1) {
        _catchList.splice(index, 1, e);
      } else {
        _catchList.push(e);
      }
    }
    expose({ pushKey, tmImageGroup: "tmImageGroup" });
    provide("ImagGrupList", computed(() => {
      return _catchList.map((el) => el.src);
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        class: "flex flex-row flex-row-top-start",
        style: normalizeStyle([{ "flex-flow": "row wrap" }, [unref(_width) ? { width: unref(_width) + "rpx" } : ""]]),
        renderWhole: true
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 4);
    };
  }
});
var tmImageGroup = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-image-group/tm-image-group.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "image",
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
                }),
                createVNode(tmDivider),
                createElementVNode("view", null, [
                  createVNode(tmImage, {
                    preview: "",
                    width: 300,
                    height: 200,
                    src: "https://picsum.photos/200/300"
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
                  label: "\u5173\u95ED\u6309\u94AE"
                }),
                createVNode(tmDivider),
                createElementVNode("view", null, [
                  createVNode(tmImage, {
                    delete: "",
                    preview: "",
                    width: 300,
                    height: 200,
                    src: "https://picsum.photos/200/300?id=666"
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
                  label: "\u5C55\u793A\u989D\u5916\u7684\u5185\u5BB9"
                }),
                createVNode(tmDivider),
                createVNode(tmImage, {
                  extra: "",
                  preview: "",
                  width: 300,
                  height: 200,
                  src: "https://picsum.photos/200/300?id=022"
                }, {
                  extra: withCtx(() => [
                    createVNode(tmSheet, {
                      margin: [0, 0],
                      padding: [12, 10],
                      _class: "flex-row flex-between ",
                      parenClass: "opacity-6"
                    }, {
                      default: withCtx(() => [
                        createElementVNode("view", { class: "flex flex-row flex-center pl-16" }, [
                          createVNode(tmIcon, {
                            "font-size": 24,
                            name: "tmicon-comment-dots"
                          }),
                          createVNode(tmText, {
                            _class: "pl-10",
                            "font-size": 24,
                            label: "125"
                          })
                        ]),
                        createElementVNode("view", { class: "flex flex-row flex-center pl-16" }, [
                          createVNode(tmIcon, {
                            "font-size": 24,
                            name: "tmicon-md-heart"
                          }),
                          createVNode(tmText, {
                            _class: "pl-10",
                            "font-size": 24,
                            label: "125"
                          })
                        ])
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
                  label: "\u56FE\u7247\u7EC4\uFF0C\u7EC4\u6210\u7B80\u5355\u7684\u76F8\u518C\u96C6"
                }),
                createVNode(tmDivider),
                createVNode(tmImageGroup, null, {
                  default: withCtx(() => [
                    (openBlock(), createElementBlock(Fragment, null, renderList(14, (item) => {
                      return createVNode(tmImage, {
                        padding: [2, 2],
                        preview: "",
                        width: 155,
                        height: 156,
                        src: "https://picsum.photos/312/312?id=" + item,
                        key: item
                      }, null, 8, ["src"]);
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
      ]);
    };
  }
});
var image = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/showdata/image.nvue"]]);
export { image as default };
