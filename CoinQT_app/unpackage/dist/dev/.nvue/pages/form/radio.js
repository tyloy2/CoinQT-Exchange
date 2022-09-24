import { defineComponent, ref, computed, openBlock, createElementBlock, createVNode, withCtx, createElementVNode, unref } from "vue";
import { _ as _export_sfc, t as tmApp, a as tmText } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmDivider } from "../../tm-divider.js";
import { t as tmRadioGroup, a as tmRadio } from "../../tm-radio.js";
import "pinia";
import "../../tm-icon.js";
import "../../tm-translate.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "radio",
  setup(__props) {
    const radio2 = ref(null);
    const radiolist = ref("banner");
    const str = computed(() => radiolist.value);
    function beforChecked() {
      return new Promise((res) => {
        setTimeout(function() {
          res(true);
        }, 1e3);
      });
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
                createElementVNode("view", { class: "pb-24" }, [
                  createVNode(tmText, {
                    label: unref(str) ? unref(str) : "\u8BF7\u9009\u62E9"
                  }, null, 8, ["label"])
                ]),
                createVNode(tmRadioGroup, {
                  modelValue: radiolist.value,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => radiolist.value = $event)
                }, {
                  default: withCtx(() => [
                    createVNode(tmRadio, {
                      value: "apple",
                      label: "\u82F9\u679C"
                    }),
                    createVNode(tmRadio, {
                      color: "orange",
                      value: "banner",
                      label: "\u9999\u8549"
                    }),
                    createVNode(tmRadio, {
                      color: "pink",
                      value: "test",
                      label: "\u6D4B\u8BD5\u9879"
                    }),
                    createVNode(tmRadio, {
                      color: "green",
                      value: "other",
                      label: "\u5176\u5B83\u6C34\u679C"
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue"])
              ]),
              _: 1
            }),
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: "\u5176\u5B83\u5C5E\u6027\u548Ccheckbox\u4E00\u6837\uFF0C\u62E5\u6709\u4E30\u5BCC\u7684\u5C5E\u6027\u8BBE\u7F6E"
                }),
                createVNode(tmDivider),
                createElementVNode("view", { class: "pb-24" }, [
                  createVNode(tmText, {
                    label: unref(str) ? unref(str) : "\u8BF7\u9009\u62E9"
                  }, null, 8, ["label"])
                ]),
                createVNode(tmRadioGroup, {
                  modelValue: radiolist.value,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => radiolist.value = $event)
                }, {
                  default: withCtx(() => [
                    createVNode(tmRadio, {
                      beforChecked,
                      value: "apple",
                      label: "\u82F9\u679C\u5F02\u6B65\u9009\u4E2D"
                    }),
                    createVNode(tmRadio, {
                      color: "orange",
                      value: "banner",
                      label: "\u9999\u8549"
                    }),
                    createVNode(tmRadio, {
                      disabled: "",
                      color: "pink",
                      value: "test",
                      label: "\u6D4B\u8BD5\u9879"
                    }),
                    createVNode(tmRadio, {
                      "border-style": "dashed",
                      color: "green",
                      value: "other",
                      label: "\u5176\u5B83\u6C34\u679C"
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue"])
              ]),
              _: 1
            }),
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: "\u6309\u94AE\u6837\u5F0F"
                }),
                createVNode(tmDivider),
                createVNode(tmRadioGroup, {
                  model: "button",
                  modelValue: radio2.value,
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => radio2.value = $event)
                }, {
                  default: withCtx(() => [
                    createVNode(tmRadio, {
                      value: true,
                      label: "\u9009\u6211\u5440"
                    }),
                    createVNode(tmRadio, {
                      value: false,
                      label: "\u4E0D\u8981\u9009\u6211\u5440"
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue"])
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
var radio = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/form/radio.nvue"]]);
export { radio as default };
