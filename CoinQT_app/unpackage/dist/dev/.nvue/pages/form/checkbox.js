import { defineComponent, ref, computed, openBlock, createElementBlock, createVNode, withCtx, createElementVNode, unref } from "vue";
import { _ as _export_sfc, t as tmApp, a as tmText } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { T as TmCheckbox } from "../../tm-checkbox.js";
import { t as tmCheckboxGroup } from "../../tm-checkbox-group.js";
import { t as tmDivider } from "../../tm-divider.js";
import "pinia";
import "../../tm-icon.js";
import "../../tm-translate.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "checkbox",
  setup(__props) {
    const checkboxlist = ref(["banner"]);
    const str = computed(() => checkboxlist.value.join(" "));
    const banxuan = ref(true);
    const allCheckbox = ref(false);
    function allChange(e) {
      if (e == false) {
        checkboxlist.value = [];
        banxuan.value = false;
      } else if (e == true) {
        checkboxlist.value = ["banner", "apple", "test", "other"];
        banxuan.value = false;
      }
    }
    function boxlistchange(e) {
      if (e.length == 0) {
        banxuan.value = false;
        allCheckbox.value = false;
      } else if (e.length == 4) {
        banxuan.value = false;
        allCheckbox.value = true;
      } else {
        banxuan.value = true;
        allCheckbox.value = true;
      }
    }
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
                createElementVNode("view", { class: "flex flex-row" }, [
                  createVNode(TmCheckbox, { label: "\u82F9\u679C" }),
                  createVNode(TmCheckbox, {
                    color: "orange",
                    label: "\u9999\u8549"
                  }),
                  createVNode(TmCheckbox, {
                    color: "green",
                    label: "\u5176\u5B83\u6C34\u679C"
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
                  label: "\u9009\u62E9\u7EC4"
                }),
                createVNode(tmDivider),
                createElementVNode("view", { class: "pb-24" }, [
                  createVNode(tmText, {
                    label: unref(str) ? unref(str) : "\u8BF7\u9009\u62E9"
                  }, null, 8, ["label"])
                ]),
                createVNode(TmCheckbox, {
                  indeterminate: banxuan.value,
                  modelValue: allCheckbox.value,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => allCheckbox.value = $event),
                  onChange: allChange,
                  value: true,
                  label: "\u5168\u9009"
                }, null, 8, ["indeterminate", "modelValue"]),
                createVNode(tmCheckboxGroup, {
                  onChange: boxlistchange,
                  modelValue: checkboxlist.value,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => checkboxlist.value = $event)
                }, {
                  default: withCtx(() => [
                    createVNode(TmCheckbox, {
                      value: "apple",
                      label: "\u82F9\u679C"
                    }),
                    createVNode(TmCheckbox, {
                      color: "orange",
                      value: "banner",
                      label: "\u9999\u8549"
                    }),
                    createVNode(TmCheckbox, {
                      color: "pink",
                      value: "test",
                      label: "\u6D4B\u8BD5\u9879"
                    }),
                    createVNode(TmCheckbox, {
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
                  label: "\u4E00\u4E9B\u6837\u5F0F\u5C5E\u6027"
                }),
                createVNode(tmDivider),
                createElementVNode("view", { class: "flex flex-row flex-wrap" }, [
                  createVNode(TmCheckbox, {
                    size: 54,
                    fontSize: 28,
                    value: "apple",
                    label: "\u5927\u5C0F"
                  }),
                  createVNode(TmCheckbox, {
                    round: 10,
                    color: "orange",
                    value: "banner",
                    label: "\u5F62\u72B6"
                  }),
                  createVNode(TmCheckbox, {
                    color: "orange",
                    disabled: "",
                    value: "banner",
                    label: "\u7981\u7528"
                  }),
                  createVNode(TmCheckbox, {
                    icon: "tmicon-position-fill",
                    color: "green",
                    value: "other",
                    label: "\u9009\u4E2D\u56FE\u6807"
                  }),
                  createVNode(TmCheckbox, {
                    border: 1,
                    linear: "bottom",
                    defaultChecked: true,
                    color: "green",
                    value: "other",
                    label: "\u6E10\u53D8"
                  }),
                  createVNode(TmCheckbox, {
                    "border-style": "dashed",
                    color: "green",
                    value: "other",
                    label: "\u865A\u7EBF\u8FB9\u6846"
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
                  label: "\u9009\u4E2D\u524D\u7684\u52FE\u5B50"
                }),
                createVNode(tmDivider),
                createElementVNode("view", { class: "flex flex-row flex-wrap" }, [
                  createVNode(TmCheckbox, {
                    beforChecked,
                    label: "\u5F02\u6B65\u9009\u4E2D"
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
var checkbox = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/form/checkbox.nvue"]]);
export { checkbox as default };
