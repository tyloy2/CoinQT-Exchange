import { defineComponent, ref, openBlock, createElementBlock, createVNode, withCtx } from "vue";
import { _ as _export_sfc, t as tmApp, a as tmText } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { a as tmTimeView, t as tmTimePicker } from "../../tm-time-picker.js";
import { t as tmDivider } from "../../tm-divider.js";
import { t as tmCell } from "../../tm-cell.js";
import "pinia";
import "../../index2.js";
import "../../index4.js";
import "../../tm-drawer.js";
import "../../tm-translate.js";
import "../../tm-icon.js";
import "../../tm-overlay.js";
import "../../tm-button.js";
import "../../tm-image.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "time",
  setup(__props) {
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
                createVNode(tmTimeView)
              ]),
              _: 1
            }),
            createVNode(tmCell, {
              onClick: _cache[0] || (_cache[0] = ($event) => showdate.value = true),
              title: "\u8BF7\u9009\u62E9\u65F6\u95F4",
              "right-text": dateStr.value || "\u8BF7\u9009\u62E9"
            }, null, 8, ["right-text"]),
            createVNode(tmTimePicker, {
              "default-value": "2021-1-5",
              show: showdate.value,
              "onUpdate:show": _cache[1] || (_cache[1] = ($event) => showdate.value = $event),
              "model-str": dateStr.value,
              "onUpdate:model-str": _cache[2] || (_cache[2] = ($event) => dateStr.value = $event)
            }, null, 8, ["show", "model-str"]),
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: "\u5168\u90E8\u663E\u793A,\u66F4\u591A\u8BF7\u81EA\u884C\u914D\u7F6E"
                }),
                createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: "[2022-5-23]\u88AB\u7981\u7528\u65E0\u6CD5\u9009\u62E9"
                }),
                createVNode(tmDivider),
                createVNode(tmTimeView, {
                  "default-value": "2021-1-5",
                  start: "2016-2-5",
                  disabledDate: ["2022-5-23"],
                  showDetail: {
                    year: true,
                    month: true,
                    day: true,
                    hour: true,
                    minute: true,
                    second: true
                  }
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
var time = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/form/time.nvue"]]);
export { time as default };
