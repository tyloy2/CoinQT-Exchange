import { defineComponent, ref, openBlock, createElementBlock, createVNode, withCtx, createElementVNode, withModifiers } from "vue";
import { _ as _export_sfc, t as tmApp, a as tmText } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmDivider } from "../../tm-divider.js";
import { T as TmButton } from "../../tm-button.js";
import { t as tmOverlay } from "../../tm-overlay.js";
import "pinia";
import "../../tm-icon.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "overlay",
  setup(__props) {
    const showWin = ref(false);
    ref("bottom");
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
                createVNode(tmDivider),
                createVNode(TmButton, {
                  block: "",
                  onClick: _cache[0] || (_cache[0] = ($event) => showWin.value = true),
                  label: "\u663E\u793A"
                })
              ]),
              _: 1
            }),
            createVNode(tmOverlay, {
              show: showWin.value,
              "onUpdate:show": _cache[2] || (_cache[2] = ($event) => showWin.value = $event)
            }, {
              default: withCtx(() => [
                createElementVNode("view", {
                  onClick: _cache[1] || (_cache[1] = withModifiers(() => {
                  }, ["stop"]))
                }, [
                  createVNode(tmSheet, null, {
                    default: withCtx(() => [
                      createVNode(tmText, { label: "\u66F4\u591A\u5C5E\u6027\u52A8\u753B\u65F6\u957F\u8FD9\u4E9B\u8BF7\u524D\u6587\u6863" })
                    ]),
                    _: 1
                  })
                ])
              ]),
              _: 1
            }, 8, ["show"])
          ]),
          _: 1
        })
      ]);
    };
  }
});
var overlay = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/fankui/overlay.nvue"]]);
export { overlay as default };
