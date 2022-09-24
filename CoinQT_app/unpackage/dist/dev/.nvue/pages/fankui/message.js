import { defineComponent, ref, openBlock, createElementBlock, createVNode, withCtx, createElementVNode } from "vue";
import { _ as _export_sfc, t as tmApp, a as tmText } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmMessage } from "../../tm-message.js";
import { t as tmDivider } from "../../tm-divider.js";
import { T as TmButton } from "../../tm-button.js";
import "pinia";
import "../../tm-icon.js";
import "../../tm-translate.js";
import "../../tm-overlay.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "message",
  setup(__props) {
    const msg = ref(null);
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
                  fontSize: 24,
                  _class: "font-weight-b",
                  label: "\u4E0B\u9762\u662F\u4E00\u4E9B\u5176\u5B83\u5C5E\u6027,\u66F4\u591A\u73A9\u6CD5\u8BF7\u524D\u5F80\u6587\u6863\u3002"
                }),
                createVNode(tmDivider),
                createElementVNode("view", { class: "flex flex-row flex-wrap" }, [
                  createVNode(TmButton, {
                    margin: [12, 12],
                    onClick: _cache[0] || (_cache[0] = ($event) => msg.value.show()),
                    color: "white",
                    width: 120,
                    height: 56,
                    fontSize: 26,
                    label: "\u9ED8\u8BA4"
                  }),
                  createVNode(TmButton, {
                    margin: [12, 12],
                    onClick: _cache[1] || (_cache[1] = ($event) => msg.value.show({ model: "error" })),
                    color: "red",
                    width: 120,
                    height: 56,
                    fontSize: 26,
                    label: "\u9519\u8BEF"
                  }),
                  createVNode(TmButton, {
                    margin: [12, 12],
                    onClick: _cache[2] || (_cache[2] = ($event) => msg.value.show({ model: "warn" })),
                    color: "orange",
                    width: 120,
                    height: 56,
                    fontSize: 26,
                    label: "\u8B66\u544A"
                  }),
                  createVNode(TmButton, {
                    margin: [12, 12],
                    onClick: _cache[3] || (_cache[3] = ($event) => msg.value.show({ model: "quest" })),
                    color: "pink",
                    width: 120,
                    height: 56,
                    fontSize: 26,
                    label: "\u7591\u95EE"
                  }),
                  createVNode(TmButton, {
                    margin: [12, 12],
                    onClick: _cache[4] || (_cache[4] = ($event) => msg.value.show({ model: "success" })),
                    color: "green",
                    width: 120,
                    height: 56,
                    fontSize: 26,
                    label: "\u6210\u529F"
                  }),
                  createVNode(TmButton, {
                    margin: [12, 12],
                    onClick: _cache[5] || (_cache[5] = ($event) => msg.value.show({ model: "disabled" })),
                    color: "green",
                    text: "",
                    shadow: 0,
                    width: 120,
                    height: 56,
                    fontSize: 26,
                    label: "\u7981\u6B62"
                  }),
                  createVNode(TmButton, {
                    margin: [12, 12],
                    onClick: _cache[6] || (_cache[6] = ($event) => msg.value.show({ model: "wait" })),
                    color: "black",
                    width: 120,
                    height: 56,
                    fontSize: 26,
                    label: "\u7B49\u5F85"
                  }),
                  createVNode(TmButton, {
                    margin: [12, 12],
                    onClick: _cache[7] || (_cache[7] = ($event) => msg.value.show({ model: "load" })),
                    color: "primary",
                    width: 120,
                    height: 56,
                    fontSize: 26,
                    label: "\u52A0\u8F7D\u4E2D"
                  })
                ])
              ]),
              _: 1
            }),
            createVNode(tmMessage, {
              ref_key: "msg",
              ref: msg
            }, null, 512)
          ]),
          _: 1
        })
      ]);
    };
  }
});
var message = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/fankui/message.nvue"]]);
export { message as default };
