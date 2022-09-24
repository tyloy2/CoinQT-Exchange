import { defineComponent, openBlock, createElementBlock, createVNode, withCtx } from "vue";
import { _ as _export_sfc, t as tmApp, a as tmText } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmSlider } from "../../tm-slider.js";
import { t as tmDivider } from "../../tm-divider.js";
import "pinia";
import "../../tm-icon.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "slider",
  setup(__props) {
    function formart(val) {
      return val + "%";
    }
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
                createVNode(tmSlider, {
                  width: 600,
                  height: 6,
                  defaultValue: 50
                }),
                createVNode(tmSlider, {
                  color: "green",
                  width: 600,
                  height: 6,
                  defaultValue: 50
                }),
                createVNode(tmSlider, {
                  color: "orange",
                  bgColor: "red",
                  width: 600,
                  height: 6,
                  defaultValue: 50
                })
              ]),
              _: 1
            }),
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: "\u53CC\u5411\u6ED1\u5757"
                }),
                createVNode(tmDivider),
                createVNode(tmSlider, {
                  color: "green",
                  width: 600,
                  height: 6,
                  defaultValue: [10, 50]
                })
              ]),
              _: 1
            }),
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: "\u6807\u7B7E,\u683C\u5F0F\u5316\u663E\u793A,\u62D6\u52A8\u5C06\u663E\u793A\u767E\u5206\u6BD4"
                }),
                createVNode(tmDivider),
                createVNode(tmSlider, {
                  formart,
                  step: 5,
                  showLabel: "",
                  color: "green",
                  width: 600,
                  height: 6,
                  defaultValue: [10, 50]
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
var slider = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/form/slider.nvue"]]);
export { slider as default };
