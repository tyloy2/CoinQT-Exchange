import { defineComponent, ref, openBlock, createElementBlock, createVNode, withCtx } from "vue";
import { _ as _export_sfc, t as tmApp, a as tmText } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmUpload } from "../../tm-upload.js";
import { t as tmDivider } from "../../tm-divider.js";
import "pinia";
import "../../tm-image.js";
import "../../tm-icon.js";
import "../../tm-translate.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "upload",
  setup(__props) {
    ref("");
    ref(false);
    const up = ref(null);
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
                createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: "\u66F4\u591A\u5C5E\u6027\u89C1\u6587\u6863\uFF1A\u4E0A\u4F20\u524D\u52FE\u5B50\uFF0C\u4E0A\u4F20\u524D\u6DFB\u52A0\u5934\u90E8\u53C2\u6570\uFF0C\u662F\u5426\u5141\u8BB8\u5220\u9664\u975E\u5E38\u591A\u7684\u4EBA\u6027\u5316\u914D\u7F6E\u7B49\u7B49"
                }),
                createVNode(tmDivider),
                createVNode(tmUpload, {
                  ref_key: "up",
                  ref: up,
                  width: 636,
                  rows: 4,
                  url: "https://mockapi.eolink.com/tNYKNA7ac71aa90bcbe83c5815871a5b419601e96a5524d/upload"
                }, null, 512),
                createVNode(tmDivider),
                createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: "\u901A\u8FC7\u63D2\u69FD\u4FEE\u6539\u4E0A\u4F20\u56FE\u6807"
                }),
                createVNode(tmDivider),
                createVNode(tmUpload, {
                  ref_key: "up",
                  ref: up,
                  width: 636,
                  rows: 4,
                  url: "https://mockapi.eolink.com/tNYKNA7ac71aa90bcbe83c5815871a5b419601e96a5524d/upload"
                }, {
                  icon: withCtx(() => [
                    createVNode(tmText, { label: "\u4E0A\u4F20" })
                  ]),
                  _: 1
                }, 512)
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
var upload = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/form/upload.nvue"]]);
export { upload as default };
