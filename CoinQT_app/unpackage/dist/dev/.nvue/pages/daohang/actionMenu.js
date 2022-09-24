var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
import { defineComponent, ref, inject, computed, watchEffect, watch, openBlock, createBlock, unref, withCtx, createElementVNode, withModifiers, createVNode, createElementBlock, Fragment, renderList, normalizeStyle } from "vue";
import { _ as _export_sfc, a as tmText, t as tmApp } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmDrawer } from "../../tm-drawer.js";
import { T as TmButton } from "../../tm-button.js";
import { t as tmDivider } from "../../tm-divider.js";
import "pinia";
import "../../tm-translate.js";
import "../../tm-icon.js";
import "../../tm-overlay.js";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "tm-action-menu",
  props: {
    list: {
      type: Array,
      default: () => [],
      required: true
    },
    rangKey: {
      type: String,
      default: "text"
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: "white"
    },
    activeFontColor: {
      type: String,
      default: "primary"
    },
    active: {
      type: Number,
      default: NaN
    },
    allowClose: {
      type: Boolean,
      default: true
    },
    duration: {
      type: Number,
      default: 300
    }
  },
  emits: ["update:modelValue", "update:active", "change", "cancel"],
  setup(__props, { emit: emits }) {
    var _a;
    const props = __props;
    const drawer = ref(null);
    const sysinfo = inject("tmuiSysInfo", { bottom: 0, height: 750, width: uni.upx2px(750), top: 0, isCustomHeader: false, sysinfo: null });
    const show = ref((_a = props == null ? void 0 : props.modelValue) != null ? _a : false);
    const _active = ref(props.active);
    const _list = computed(() => {
      var _a2;
      let plist = (_a2 = props == null ? void 0 : props.list) != null ? _a2 : [];
      let listdata = [];
      listdata = plist.map((el) => {
        let d = {};
        if (typeof el == "string" || typeof el == "number") {
          d.text = el;
          d.disabled = false;
        } else if (typeof el == "object") {
          d.text = el[props.rangKey];
          d = __spreadValues(__spreadValues({}, d), el);
        }
        return d;
      });
      return listdata;
    });
    const cHeight = computed(() => {
      let len = _list.value.length + 1;
      return len * 80 + 180 + sysinfo.bottom;
    });
    const _color = computed(() => props.color);
    watchEffect(() => {
      show.value = props.modelValue;
    });
    watch(() => props.active, () => {
      _active.value = props.active;
    });
    function change(item, index) {
      var _a2;
      emits("change", item, index);
      _active.value = index;
      emits("update:active", index);
      if (props.allowClose) {
        (_a2 = drawer.value) == null ? void 0 : _a2.close();
      }
    }
    function cancel() {
      var _a2;
      emits("cancel");
      (_a2 = drawer.value) == null ? void 0 : _a2.close();
    }
    function drawerClose() {
      emits("update:modelValue", false);
    }
    function drawerOpen() {
      emits("update:modelValue", true);
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(tmDrawer, {
        ref_key: "drawer",
        ref: drawer,
        onClose: drawerClose,
        onOpen: drawerOpen,
        duration: props.duration,
        height: unref(cHeight),
        "onUpdate:show": _cache[1] || (_cache[1] = ($event) => show.value = $event),
        show: show.value,
        transprent: true,
        "hide-header": true
      }, {
        default: withCtx(() => [
          createElementVNode("view", {
            onClick: _cache[0] || (_cache[0] = withModifiers(() => {
            }, ["stop"])),
            class: "flex flex-col"
          }, [
            createElementVNode("view", { style: { "height": "24rpx" } }),
            createVNode(tmSheet, { round: 2 }, {
              default: withCtx(() => [
                createElementVNode("view", { class: "flex flex-col round-2 overflow mx-32" }, [
                  createVNode(tmText, {
                    _class: "opacity-5 text-align-center",
                    "font-size": 24,
                    label: "\u8BF7\u9009\u62E9"
                  }),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(unref(_list), (item, index) => {
                    return openBlock(), createBlock(TmButton, {
                      transprent: true,
                      fontColor: _active.value == index ? props.activeFontColor : "",
                      followTheme: false,
                      disabled: item.disabled,
                      onClick: ($event) => change(item, index),
                      key: index,
                      label: item.text,
                      "font-size": 28,
                      margin: [0, 0],
                      color: "white",
                      block: "",
                      shadow: 0,
                      round: -1
                    }, null, 8, ["fontColor", "disabled", "onClick", "label"]);
                  }), 128))
                ])
              ]),
              _: 1
            }),
            createVNode(TmButton, {
              round: 5,
              fontColor: props.activeFontColor,
              followTheme: false,
              onClick: cancel,
              label: "\u53D6\u6D88",
              "font-size": 28,
              margin: [32, 8],
              color: unref(_color),
              block: "",
              shadow: 0
            }, null, 8, ["fontColor", "color"]),
            createElementVNode("view", {
              style: normalizeStyle({ height: unref(sysinfo).bottom + "px" })
            }, null, 4)
          ])
        ]),
        _: 1
      }, 8, ["duration", "height", "show"]);
    };
  }
});
var tmActionMenu = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-action-menu/tm-action-menu.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "actionMenu",
  setup(__props) {
    const show = ref(false);
    const list = ref([
      { text: "\u82F9\u679C", id: "1" },
      { text: "\u83E0\u841D", id: "2" },
      { text: "\u9999\u8549", id: "3" }
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
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createVNode(tmText, {
                  fontSize: 24,
                  _class: "font-weight-b",
                  label: "\u57FA\u7840\u5C5E\u6027,\u66F4\u591A\u73A9\u6CD5\u8BF7\u524D\u5F80\u6587\u6863\u3002"
                }),
                createVNode(tmDivider),
                createVNode(TmButton, {
                  onClick: _cache[0] || (_cache[0] = ($event) => show.value = true),
                  label: "\u663E\u793A\u64CD\u4F5C\u680F",
                  block: ""
                })
              ]),
              _: 1
            }),
            createVNode(tmActionMenu, {
              modelValue: show.value,
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => show.value = $event),
              list: list.value
            }, null, 8, ["modelValue", "list"])
          ]),
          _: 1
        })
      ]);
    };
  }
});
var actionMenu = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/daohang/actionMenu.nvue"]]);
export { actionMenu as default };
