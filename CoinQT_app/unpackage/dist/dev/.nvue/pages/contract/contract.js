import { f as resolveEasycom, t as tmText, g as tmApp } from "../../tm-app.js";
import { resolveDynamicComponent, openBlock, createElementBlock, createVNode, withCtx } from "vue";
import { _ as _export_sfc } from "../../plugin-vue_export-helper.js";
import "pinia";
const _sfc_main = {
  components: {},
  data() {
    return {
      test: "21312"
    };
  },
  created() {
  },
  onLoad() {
    uni.$tm.u.toast("213");
  },
  mounted() {
  },
  methods: {}
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_tm_text = resolveEasycom(resolveDynamicComponent("tm-text"), tmText);
  const _component_tm_app = resolveEasycom(resolveDynamicComponent("tm-app"), tmApp);
  return openBlock(), createElementBlock("scroll-view", {
    scrollY: true,
    showScrollbar: true,
    enableBackToTop: true,
    bubble: "true",
    style: { flexDirection: "column" }
  }, [
    createVNode(_component_tm_app, null, {
      default: withCtx(() => [
        createVNode(_component_tm_text, { label: $data.test }, null, 8, ["label"])
      ]),
      _: 1
    })
  ]);
}
var contract = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/CoinQT/CoinQT_app/pages/contract/contract.nvue"]]);
export { contract as default };
