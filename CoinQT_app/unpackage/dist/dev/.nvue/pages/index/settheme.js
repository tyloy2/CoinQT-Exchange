import { u as useTmpiniaStore, o as onLoad, i as formatAppLog, g as tmApp, t as tmText } from "../../tm-app.js";
import { defineComponent, ref, getCurrentInstance, onMounted, openBlock, createElementBlock, createVNode, withCtx, createElementVNode, Fragment, renderList, createBlock } from "vue";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmNavbar } from "../../tm-navbar.js";
import { _ as _export_sfc } from "../../plugin-vue_export-helper.js";
import "pinia";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "settheme",
  setup(__props) {
    const app = ref(null);
    const store = useTmpiniaStore();
    getCurrentInstance();
    const list = ref([]);
    onMounted(() => showlist());
    function showlist() {
      list.value = [...store.tmStore.colorList];
    }
    function setTheme(colorname) {
      var _a;
      (_a = app.value) == null ? void 0 : _a.setTheme(colorname);
    }
    onLoad(() => {
      formatAppLog("log", "at pages/index/settheme.nvue:52", "--------");
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("scroll-view", {
        scrollY: true,
        showScrollbar: true,
        enableBackToTop: true,
        bubble: "true",
        style: { flexDirection: "column" }
      }, [
        createVNode(tmApp, {
          ref_key: "app",
          ref: app
        }, {
          default: withCtx(() => [
            createVNode(tmNavbar, {
              color: "blue",
              linear: "left",
              title: "\u8BBE\u7F6E\u66F4\u591A\u4E3B\u9898"
            }),
            createElementVNode("view", { class: "mx-32 flex flex-row flex-wrap" }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(list.value, (item, index) => {
                return openBlock(), createBlock(tmSheet, {
                  onClick: ($event) => setTheme(item.name),
                  round: 3,
                  margin: [4, 15],
                  color: item.name,
                  key: index,
                  width: 285,
                  height: 130
                }, {
                  default: withCtx(() => [
                    createVNode(tmSheet, {
                      userInteractionEnabled: false,
                      round: 3,
                      blur: "",
                      margin: [0, 0],
                      height: 80
                    }, {
                      default: withCtx(() => [
                        createVNode(tmText, {
                          label: item.name
                        }, null, 8, ["label"])
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 2
                }, 1032, ["onClick", "color"]);
              }), 128))
            ])
          ]),
          _: 1
        }, 512)
      ]);
    };
  }
});
var settheme = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/index/settheme.nvue"]]);
export { settheme as default };
