import { _ as _export_sfc, t as tmApp, a as tmText, g as formatAppLog } from "../../tm-text.js";
import { defineComponent, ref, openBlock, createElementBlock, createVNode, withCtx, createBlock, createCommentVNode, createElementVNode } from "vue";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmRadioGroup, a as tmRadio } from "../../tm-radio.js";
import { t as tmDivider } from "../../tm-divider.js";
import { t as tmCell } from "../../tm-cell.js";
import { a as tmCalendarView, t as tmCalendar } from "../../tm-calendar.js";
import { T as TmCheckbox } from "../../tm-checkbox.js";
import "pinia";
import "../../tm-icon.js";
import "../../tm-translate.js";
import "../../tm-image.js";
import "../../tm-button.js";
import "../../index2.js";
import "../../index3.js";
import "../../index4.js";
import "../../tm-drawer.js";
import "../../tm-overlay.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "calendar",
  setup(__props) {
    const modeltype = ref("day");
    const dateStr = ref("");
    const showdate = ref(false);
    const multiple = ref(false);
    const test = (e) => {
      formatAppLog("log", "at pages/form/calendar.nvue:52", e);
    };
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
                      value: "day",
                      label: "\u6309\u5929"
                    }),
                    createVNode(tmRadio, {
                      value: "week",
                      color: "red",
                      label: "\u6309\u5468"
                    }),
                    createVNode(tmRadio, {
                      value: "month",
                      color: "blue",
                      label: "\u6309\u6708"
                    }),
                    createVNode(tmRadio, {
                      value: "year",
                      color: "pink",
                      label: "\u6309\u5E74"
                    }),
                    createVNode(tmRadio, {
                      value: "rang",
                      color: "green",
                      label: "\u8303\u56F4"
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue"]),
                modeltype.value == "day" ? (openBlock(), createBlock(TmCheckbox, {
                  key: 0,
                  modelValue: multiple.value,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => multiple.value = $event),
                  label: "\u591A\u9009\u65E5\u671F"
                }, null, 8, ["modelValue"])) : createCommentVNode("v-if", true),
                createVNode(tmCalendarView, {
                  multiple: multiple.value,
                  color: "green",
                  model: modeltype.value
                }, null, 8, ["multiple", "model"])
              ]),
              _: 1
            }),
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: "\u5F39\u5C42\u5F0F,\u4E0A\u65B9\u7EC4\u4EF6\u4E00\u81F4\u7684\u7528\u6CD5"
                }),
                createVNode(tmDivider),
                createVNode(tmRadioGroup, {
                  modelValue: modeltype.value,
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => modeltype.value = $event)
                }, {
                  default: withCtx(() => [
                    createVNode(tmRadio, {
                      value: "day",
                      label: "\u6309\u5929"
                    }),
                    createVNode(tmRadio, {
                      value: "week",
                      color: "red",
                      label: "\u6309\u5468"
                    }),
                    createVNode(tmRadio, {
                      value: "month",
                      color: "blue",
                      label: "\u6309\u6708"
                    }),
                    createVNode(tmRadio, {
                      value: "year",
                      color: "pink",
                      label: "\u6309\u5E74"
                    }),
                    createVNode(tmRadio, {
                      value: "rang",
                      color: "green",
                      label: "\u8303\u56F4"
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue"])
              ]),
              _: 1
            }),
            createVNode(tmCell, {
              onClick: _cache[3] || (_cache[3] = ($event) => showdate.value = true),
              title: "\u8BF7\u9009\u62E9\u65F6\u95F4",
              "right-text": dateStr.value
            }, null, 8, ["right-text"]),
            createVNode(tmCalendar, {
              onClick: test,
              multiple: multiple.value,
              color: "red",
              show: showdate.value,
              "onUpdate:show": _cache[4] || (_cache[4] = ($event) => showdate.value = $event),
              "model-str": dateStr.value,
              "onUpdate:model-str": _cache[5] || (_cache[5] = ($event) => dateStr.value = $event),
              model: modeltype.value
            }, null, 8, ["multiple", "show", "model-str", "model"]),
            createElementVNode("view", { style: { "height": "100rpx" } })
          ]),
          _: 1
        })
      ]);
    };
  }
});
var calendar = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/form/calendar.nvue"]]);
export { calendar as default };
