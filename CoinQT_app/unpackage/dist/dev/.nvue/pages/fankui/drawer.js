import { defineComponent, ref, openBlock, createElementBlock, createVNode, withCtx, createElementVNode } from "vue";
import { _ as _export_sfc, t as tmApp, a as tmText } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { T as TmButton } from "../../tm-button.js";
import { t as tmDivider } from "../../tm-divider.js";
import { t as tmDrawer } from "../../tm-drawer.js";
import "pinia";
import "../../tm-icon.js";
import "../../tm-translate.js";
import "../../tm-overlay.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "drawer",
  setup(__props) {
    const showWin = ref(false);
    const pos = ref("bottom");
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
                createElementVNode("view", { class: "flex flex-row flex-wrap" }, [
                  createVNode(TmButton, {
                    margin: [12, 12],
                    onClick: _cache[0] || (_cache[0] = ($event) => {
                      pos.value = "bottom";
                      showWin.value = true;
                    }),
                    color: "white",
                    width: 120,
                    height: 56,
                    "font-size": 24,
                    label: "\u5E95\u90E8"
                  }),
                  createVNode(TmButton, {
                    margin: [12, 12],
                    onClick: _cache[1] || (_cache[1] = ($event) => {
                      pos.value = "top";
                      showWin.value = true;
                    }),
                    color: "red",
                    width: 120,
                    height: 56,
                    "font-size": 24,
                    label: "\u9876\u90E8"
                  }),
                  createVNode(TmButton, {
                    margin: [12, 12],
                    onClick: _cache[2] || (_cache[2] = ($event) => {
                      pos.value = "left";
                      showWin.value = true;
                    }),
                    color: "orange",
                    width: 120,
                    height: 56,
                    "font-size": 24,
                    label: "\u5DE6\u8FB9"
                  }),
                  createVNode(TmButton, {
                    margin: [12, 12],
                    onClick: _cache[3] || (_cache[3] = ($event) => {
                      pos.value = "right";
                      showWin.value = true;
                    }),
                    color: "pink",
                    width: 120,
                    height: 56,
                    "font-size": 24,
                    label: "\u53F3\u8FB9"
                  }),
                  createVNode(TmButton, {
                    margin: [12, 12],
                    onClick: _cache[4] || (_cache[4] = ($event) => {
                      pos.value = "center";
                      showWin.value = true;
                    }),
                    color: "green",
                    width: 120,
                    height: 56,
                    "font-size": 24,
                    label: "\u5C45\u4E2D"
                  })
                ])
              ]),
              _: 1
            }),
            createVNode(tmDrawer, {
              placement: pos.value,
              show: showWin.value,
              "onUpdate:show": _cache[5] || (_cache[5] = ($event) => showWin.value = $event)
            }, null, 8, ["placement", "show"])
          ]),
          _: 1
        })
      ]);
    };
  }
});
var drawer = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/fankui/drawer.nvue"]]);
export { drawer as default };
