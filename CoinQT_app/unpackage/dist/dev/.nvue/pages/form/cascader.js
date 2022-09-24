import { defineComponent, ref, computed, openBlock, createElementBlock, createVNode, withCtx, unref } from "vue";
import { _ as _export_sfc, t as tmApp, a as tmText } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { T as TmButton } from "../../tm-button.js";
import { t as tmDivider } from "../../tm-divider.js";
import { t as tmCascader } from "../../tm-cascader.js";
import "pinia";
import "../../tm-icon.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "cascader",
  setup(__props) {
    const dlist = ref(loop());
    const testValue = ref([]);
    const str = computed(() => testValue.value.join("/"));
    function loop(path = "0", level = 2) {
      const list = [];
      for (let i = 0; i < 5; i += 1) {
        const key = `${path}-${i}`;
        const treeNode = {
          text: "\u9009\u9879" + key,
          id: key,
          disabled: i == 1
        };
        if (level > 0) {
          treeNode.children = loop(key, level - 1);
        }
        list.push(treeNode);
      }
      return list;
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("scroll-view", {
        scrollY: true,
        showScrollbar: true,
        enableBackToTop: true,
        bubble: "true",
        style: { flexDirection: "column" }
      }, [
        createVNode(tmApp, { color: "white" }, {
          default: withCtx(() => [
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: "\u57FA\u7840\u793A\u4F8B,\u66F4\u591A\u89C1\u6587\u6863"
                }),
                createVNode(tmDivider),
                createVNode(TmButton, {
                  onClick: _cache[0] || (_cache[0] = ($event) => testValue.value = []),
                  label: "\u6E05\u7A7A\u9009\u62E9"
                }),
                createVNode(tmText, {
                  label: unref(str) ? unref(str) : "\u8BF7\u9009\u62E9"
                }, null, 8, ["label"])
              ]),
              _: 1
            }),
            createVNode(tmCascader, {
              modelValue: testValue.value,
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => testValue.value = $event),
              data: dlist.value
            }, null, 8, ["modelValue", "data"])
          ]),
          _: 1
        })
      ]);
    };
  }
});
var cascader = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/form/cascader.nvue"]]);
export { cascader as default };
