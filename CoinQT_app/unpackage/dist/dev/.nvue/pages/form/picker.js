import { _ as _export_sfc, t as tmApp, a as tmText, g as formatAppLog } from "../../tm-text.js";
import { defineComponent, ref, openBlock, createElementBlock, createVNode, withCtx, createElementVNode } from "vue";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmDivider } from "../../tm-divider.js";
import { t as tmPickerView } from "../../tm-picker-view.js";
import { t as tmPicker } from "../../tm-picker.js";
import { t as tmCell } from "../../tm-cell.js";
import "pinia";
import "../../tm-drawer.js";
import "../../tm-translate.js";
import "../../tm-icon.js";
import "../../tm-overlay.js";
import "../../tm-button.js";
import "../../tm-image.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "picker",
  setup(__props) {
    const dateStr = ref("");
    const pickydata = ref([]);
    const citydate = ref([
      { text: "\u82F9\u679C", id: 0 },
      { text: "\u9999\u8549", id: 1 },
      { text: "\u5176\u5B83\u6C34\u679C", id: 2 },
      { text: "\u8D8A\u5357\u6C34\u679C", id: 4 }
    ]);
    const citydate2 = ref([
      { text: "\u82F9\u679C", id: 0, children: [{ text: "\u9999\u8549", id: 10 }, { text: "\u9999\u85492", id: 122 }] },
      { text: "\u5B50\u7EA7", id: 1, children: [{ text: "\u9999\u8549", id: 10 }, { text: "\u9999\u85492", id: 122 }] },
      { text: "\u8D8A\u5357\u6C34\u679C", id: 2, children: [{ text: "\u82F9\u679C2222", id: 10 }, { text: "\u9999\u8549", id: 12 }] }
    ]);
    const citydate3 = ref([
      { text: "\u82F9\u679C", id: 0, children: [{ text: "\u9999\u8549", id: 10 }, { text: "\u9999\u85492", id: 122 }] },
      { text: "\u82F9\u679C", id: 1, children: [{ text: "\u9999\u8549", id: 10 }, { text: "\u9999\u85492", id: 122 }] },
      { text: "\u8D8A\u5357\u6C34\u679C", id: 3, children: [{ text: "\u82F9\u679C2222", id: 10 }, { text: "\u9999\u8549", id: 12 }] }
    ]);
    const showdate = ref(false);
    function pickok(e) {
      formatAppLog("log", "at pages/form/picker.nvue:48", e);
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
                createVNode(tmPickerView, { columns: citydate.value }, null, 8, ["columns"])
              ]),
              _: 1
            }),
            createVNode(tmCell, {
              onClick: _cache[0] || (_cache[0] = ($event) => showdate.value = true),
              title: "\u8BF7\u9009\u62E9\u6C34\u679C\u79CD\u7C7B",
              "right-text": dateStr.value || "\u8BF7\u9009\u62E9"
            }, null, 8, ["right-text"]),
            createVNode(tmPicker, {
              defaultValue: [1, 1],
              onConfirm: pickok,
              show: showdate.value,
              "onUpdate:show": _cache[1] || (_cache[1] = ($event) => showdate.value = $event),
              columns: citydate3.value,
              modelValue: pickydata.value,
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => pickydata.value = $event),
              "model-str": dateStr.value,
              "onUpdate:model-str": _cache[3] || (_cache[3] = ($event) => dateStr.value = $event)
            }, null, 8, ["show", "columns", "modelValue", "model-str"]),
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: "\u591A\u7EA7\u8054\u52A8,\u66F4\u591A\u5C5E\u6027\u8BF7\u81EA\u884C\u770B\u6587\u6863"
                }),
                createVNode(tmDivider),
                createVNode(tmPickerView, { columns: citydate2.value }, null, 8, ["columns"])
              ]),
              _: 1
            }),
            createElementVNode("view", { class: "py-32" })
          ]),
          _: 1
        })
      ]);
    };
  }
});
var picker = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/form/picker.nvue"]]);
export { picker as default };
