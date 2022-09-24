import { defineComponent, ref, openBlock, createElementBlock, createVNode, withCtx } from "vue";
import { _ as _export_sfc, t as tmApp, a as tmText } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmRadioGroup, a as tmRadio } from "../../tm-radio.js";
import { t as tmDivider } from "../../tm-divider.js";
import { t as tmCell } from "../../tm-cell.js";
import { t as tmKeyborad } from "../../tm-keyborad.js";
import "pinia";
import "../../tm-icon.js";
import "../../tm-translate.js";
import "../../tm-image.js";
import "../../tm-drawer.js";
import "../../tm-overlay.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "keyborad",
  setup(__props) {
    const modeltype = ref("password");
    const dateStr = ref("");
    const showdate = ref(false);
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
                createVNode(tmRadioGroup, {
                  modelValue: modeltype.value,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => modeltype.value = $event)
                }, {
                  default: withCtx(() => [
                    createVNode(tmRadio, {
                      value: "password",
                      label: "\u5BC6\u7801"
                    }),
                    createVNode(tmRadio, {
                      value: "card",
                      color: "red",
                      label: "\u8EAB\u4EFD\u8BC1"
                    }),
                    createVNode(tmRadio, {
                      value: "car",
                      color: "blue",
                      label: "\u8F66\u724C"
                    }),
                    createVNode(tmRadio, {
                      value: "number",
                      color: "green",
                      label: "\u6570\u5B57\u952E\u76D8"
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue"])
              ]),
              _: 1
            }),
            createVNode(tmCell, {
              onClick: _cache[1] || (_cache[1] = ($event) => showdate.value = true),
              title: "\u5F39\u51FA\u952E\u76D8",
              rightColor: "primary",
              "right-text": dateStr.value
            }, null, 8, ["right-text"]),
            createVNode(tmKeyborad, {
              type: modeltype.value,
              modelValue: dateStr.value,
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => dateStr.value = $event),
              show: showdate.value,
              "onUpdate:show": _cache[3] || (_cache[3] = ($event) => showdate.value = $event)
            }, null, 8, ["type", "modelValue", "show"])
          ]),
          _: 1
        })
      ]);
    };
  }
});
var keyborad = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/form/keyborad.nvue"]]);
export { keyborad as default };
