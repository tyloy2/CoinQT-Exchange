import { defineComponent, ref, openBlock, createElementBlock, createVNode, withCtx, createElementVNode } from "vue";
import { _ as _export_sfc, t as tmApp, a as tmText } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmTranslate } from "../../tm-translate.js";
import { t as tmDivider } from "../../tm-divider.js";
import "pinia";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "translate",
  setup(__props) {
    const translate2 = ref(null);
    setTimeout(function() {
      translate2.value.play();
    }, 1500);
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
                  label: "\u4E0B\u9762\u662F\u57FA\u7840\u6F14\u793A\u5C5E\u6027,\u66F4\u591A\u73A9\u6CD5\u8BF7\u524D\u5F80\u6587\u6863\u3002"
                }),
                createVNode(tmText, {
                  color: "red",
                  _class: "font-weight-b",
                  label: "\u4E00\u51716\u7EC4\u52A8\u6548\uFF0C\u6BCF\u7EC4\u52A8\u6548\u90FD\u53EF\u4EE5\u53CD\u5411\u64AD\u653E\u3002\u624B\u52A8\u6216\u8005\u81EA\u52A8\u63A7\u5236\u8BE6\u89C1\u6587\u6863\u3002\u672C\u7EC4\u4EF6\u5E93\u6240\u6709\u52A8\u6548\u90FD\u662F\u7531\u4E0B\u97626\u7EC4\u52A8\u6548\u5B8C\u6210\u3002"
                }),
                createVNode(tmDivider),
                createElementVNode("view", { class: "flex flex-row flex-wrap" }, [
                  createVNode(tmTranslate, {
                    ref_key: "translate",
                    ref: translate2,
                    name: "fade"
                  }, {
                    default: withCtx(() => [
                      createVNode(tmSheet, {
                        color: "blue",
                        padding: [0, 0],
                        width: 100,
                        height: 100
                      })
                    ]),
                    _: 1
                  }, 512),
                  createVNode(tmTranslate, { name: "zoom" }, {
                    default: withCtx(() => [
                      createVNode(tmSheet, {
                        color: "blue",
                        padding: [0, 0],
                        width: 100,
                        height: 100
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(tmTranslate, { name: "left" }, {
                    default: withCtx(() => [
                      createVNode(tmSheet, {
                        color: "blue",
                        padding: [0, 0],
                        width: 100,
                        height: 100
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(tmTranslate, { name: "right" }, {
                    default: withCtx(() => [
                      createVNode(tmSheet, {
                        color: "blue",
                        padding: [0, 0],
                        width: 100,
                        height: 100
                      })
                    ]),
                    _: 1
                  })
                ]),
                createElementVNode("view", { class: "flex flex-row flex-wrap" }, [
                  createVNode(tmTranslate, { name: "down" }, {
                    default: withCtx(() => [
                      createVNode(tmSheet, {
                        color: "blue",
                        padding: [0, 0],
                        width: 100,
                        height: 100
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(tmTranslate, { name: "up" }, {
                    default: withCtx(() => [
                      createVNode(tmSheet, {
                        color: "blue",
                        padding: [0, 0],
                        width: 100,
                        height: 100
                      })
                    ]),
                    _: 1
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
var translate = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/fankui/translate.nvue"]]);
export { translate as default };
