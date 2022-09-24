import { defineComponent, ref, openBlock, createElementBlock, createVNode, withCtx, createElementVNode, Fragment, renderList, createBlock } from "vue";
import { _ as _export_sfc, t as tmApp } from "../../tm-text.js";
import { t as tmCell } from "../../tm-cell.js";
import { t as tmDivider } from "../../tm-divider.js";
import "pinia";
import "../../tm-sheet.js";
import "../../tm-icon.js";
import "../../tm-image.js";
import "../../tm-translate.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  setup(__props) {
    const list = ref([
      { path: "/pages/form/cascader", title: "\u7EA7\u8054\u5668(\u70B9\u9009) Cascader" },
      { path: "/pages/form/checkbox", title: "\u590D\u9009\u6846 Checkbox" },
      { path: "/pages/form/calendar", title: "\u65E5\u5386 Calendar" },
      { path: "/pages/form/city", title: "\u57CE\u5E02\u9009\u62E9 City" },
      { path: "/pages/form/form", title: "\u8868\u5355 Form" },
      { path: "/pages/form/input", title: "\u8F93\u5165\u6846 Input" },
      { path: "/pages/form/keyborad", title: "\u952E\u76D8 Keyborad" },
      { path: "/pages/form/picker", title: "\u9009\u62E9\u5668 Picker" },
      { path: "/pages/form/rate", title: "\u8BC4\u5206 Rate" },
      { path: "/pages/form/radio", title: "\u5355\u9009\u6846 Radio" },
      { path: "/pages/form/stepper", title: "\u6B65\u8FDB\u5668 Stepper" },
      { path: "/pages/form/slider", title: "\u6ED1\u5757 Slider" },
      { path: "/pages/form/switch", title: "\u5F00\u5173 Switch" },
      { path: "/pages/form/time", title: "\u65F6\u95F4\u9009\u62E9\u5668 Time" },
      { path: "/pages/form/upload", title: "\u56FE\u7247\u4E0A\u4F20 Upload" },
      { path: "/pages/form/weekbar", title: "\u65F6\u95F4\u5468 Weekbar" }
    ]);
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
            createElementVNode("view", { class: "ma-32 round-3 overflow" }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(list.value, (item, index2) => {
                return openBlock(), createBlock(tmCell, {
                  key: index2,
                  url: item.path,
                  margin: [0, 0],
                  titleFontSize: 30,
                  title: item.title
                }, null, 8, ["url", "title"]);
              }), 128))
            ]),
            createElementVNode("view", { class: "py-32 mx-32" }, [
              createVNode(tmDivider, {
                color: "grey-2",
                label: "tmui 3.0.0 \u539F\u751F\u6E32\u67D3\uFF0C\u5168\u7AEF\u517C\u5BB9"
              })
            ])
          ]),
          _: 1
        })
      ]);
    };
  }
});
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/form/index.nvue"]]);
export { index as default };
