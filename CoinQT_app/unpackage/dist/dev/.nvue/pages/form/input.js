import { defineComponent, ref, openBlock, createElementBlock, createVNode, withCtx } from "vue";
import { _ as _export_sfc, t as tmApp, a as tmText } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmInput } from "../../tm-input.js";
import { t as tmDivider } from "../../tm-divider.js";
import "pinia";
import "../../tm-icon.js";
import "../../tm-button.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "input",
  setup(__props) {
    ref("day");
    ref("");
    ref(false);
    const testtext = ref("\u54C8\u54C8");
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
                createVNode(tmInput),
                createVNode(tmInput, {
                  margin: [0, 24],
                  password: "",
                  placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801,\u663E\u793A\u9690\u85CF\u5185\u5BB9",
                  prefix: "tmicon-lock-fill"
                }),
                createVNode(tmInput, {
                  modelValue: testtext.value,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => testtext.value = $event),
                  "confirm-hold": "",
                  "confirm-type": "\u6362\u884C",
                  showCharNumber: "",
                  maxlength: 100,
                  border: 1,
                  color: "grey-5",
                  height: 80,
                  type: "textarea"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: "\u4E00\u4E9B\u5176\u5B83\u5E38\u89C1\u793A\u4F8B"
                }),
                createVNode(tmDivider),
                createVNode(tmInput, {
                  prefix: "tmicon-user-fill",
                  showClear: ""
                }),
                createVNode(tmInput, {
                  prefixLabel: "\u5B57\u7B26\u7EDF\u8BA1",
                  margin: [0, 24],
                  showCharNumber: "",
                  maxlength: 10
                }),
                createVNode(tmInput, {
                  suffix: "tmicon-clock-fill",
                  showClear: ""
                }),
                createVNode(tmInput, {
                  prefix: "tmicon-dollar",
                  suffixLabel: "\u5143",
                  margin: [0, 24]
                }),
                createVNode(tmInput, {
                  prefix: "tmicon-search",
                  searchLabel: "\u641C\u7D22"
                })
              ]),
              _: 1
            }),
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: "\u6837\u5F0F\u914D\u7F6E"
                }),
                createVNode(tmDivider),
                createVNode(tmInput, {
                  color: "primary",
                  prefix: "tmicon-user-fill"
                }),
                createVNode(tmInput, {
                  prefixLabel: "\u805A\u7126\u6837\u5F0F",
                  color: "white",
                  focusColor: "red",
                  margin: [0, 24],
                  prefix: "tmicon-user-fill"
                })
              ]),
              _: 1
            }),
            createVNode(tmSheet, { color: "primary" }, {
              default: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: "\u5176\u5B83"
                }),
                createVNode(tmDivider),
                createVNode(tmInput, {
                  color: "primary",
                  focusColor: "green",
                  prefix: "tmicon-user-fill"
                }),
                createVNode(tmInput, {
                  color: "primary",
                  focusColor: "green",
                  margin: [0, 24],
                  prefix: "tmicon-lock-fill"
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
var input = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/form/input.nvue"]]);
export { input as default };
