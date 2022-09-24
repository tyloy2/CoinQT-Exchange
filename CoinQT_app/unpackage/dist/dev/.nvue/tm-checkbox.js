var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import { defineComponent, ref, getCurrentInstance, inject, computed, watch, openBlock, createElementBlock, normalizeClass, unref, createElementVNode, createBlock, withCtx, createVNode, createCommentVNode, renderSlot } from "vue";
import { t as tmSheet } from "./tm-sheet.js";
import { t as tmIcon } from "./tm-icon.js";
import { _ as _export_sfc, c as custom_props, a as tmText } from "./tm-text.js";
import { t as tmTranslate } from "./tm-translate.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tm-checkbox",
  props: __spreadProps(__spreadValues({}, custom_props), {
    followTheme: {
      type: [Boolean, String],
      default: true
    },
    size: {
      type: Number,
      default: 42
    },
    custom: {
      type: Boolean,
      default: true
    },
    transprent: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: "primary"
    },
    round: {
      type: Number,
      default: 2
    },
    border: {
      type: Number,
      default: 2
    },
    value: {
      type: [String, Number, Boolean],
      default: true
    },
    modelValue: {
      type: [String, Number, Boolean],
      default: false
    },
    label: {
      type: [String, Number],
      default: ""
    },
    defaultChecked: {
      type: [Boolean],
      default: false
    },
    beforChecked: {
      type: [Function, String, Boolean],
      default: () => {
        return false;
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    fontSize: {
      type: Number,
      default: 28
    },
    indeterminate: {
      type: [Boolean, String],
      default: false
    },
    closeAni: {
      type: [Boolean, String],
      default: false
    },
    icon: {
      type: String,
      default: "tmicon-check"
    }
  }),
  emits: ["update:modelValue", "change", "click"],
  setup(__props, { emit: emits }) {
    var _a, _b, _c, _d;
    const props = __props;
    ref(null);
    const proxy = (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const _checked = ref((_c = props.defaultChecked) != null ? _c : false);
    const _groupCheckedVal = inject("tmCheckedBoxVal", computed(() => []));
    const tmCheckedBoxDisabled = inject("tmCheckedBoxDisabled", computed(() => false));
    const tmCheckedBoxMax = inject("tmCheckedBoxMax", computed(() => false));
    const _disabled = computed(() => props.disabled || tmCheckedBoxDisabled.value);
    let parent = proxy == null ? void 0 : proxy.$parent;
    while (parent) {
      if ((parent == null ? void 0 : parent.checkBoxkeyId) == "tmCheckBoxGroup" || !parent) {
        break;
      } else {
        parent = (_d = parent == null ? void 0 : parent.$parent) != null ? _d : void 0;
      }
    }
    if (parent) {
      parent.pushKey(props.value);
    }
    const tmFormFun = inject("tmFormFun", computed(() => ""));
    watch(tmFormFun, () => {
      if (tmFormFun.value == "reset") {
        emits("update:modelValue", "");
        if (parent) {
          parent == null ? void 0 : parent.delKey(props.value);
        }
        _checked.value = false;
      }
    });
    function vailChecked() {
      let checked_val = false;
      if (props.modelValue === props.value && typeof props.value !== "undefined" && props.value !== "" && props.modelValue !== "") {
        checked_val = true;
      }
      let index = _groupCheckedVal.value.findIndex((el) => el === props.value);
      if (index > -1) {
        checked_val = true;
      }
      return checked_val;
    }
    if (vailChecked()) {
      _checked.value = true;
      emits("update:modelValue", props.value);
    }
    async function hanlerClick() {
      if (_disabled.value) {
        return;
      }
      if (tmCheckedBoxMax.value && !_checked.value) {
        uni.showToast({ title: "\u8D85\u6700\u5927\u9009\u62E9", icon: "error" });
        return;
      }
      if (typeof props.beforChecked === "function") {
        uni.showLoading({ title: "...", mask: true });
        let p = await props.beforChecked();
        if (typeof p === "function") {
          p = await p();
        }
        uni.hideLoading();
        if (!p)
          return;
      }
      _checked.value = !_checked.value;
      if (_checked.value) {
        emits("update:modelValue", props.value);
        if (parent) {
          parent.addKey(props.value);
        }
      } else {
        emits("update:modelValue", false);
        if (parent) {
          parent.delKey(props.value);
        }
      }
      emits("change", _checked.value);
    }
    watch([() => props.modelValue, _groupCheckedVal], () => {
      _checked.value = vailChecked();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        class: normalizeClass(["flex flex-row", [unref(_disabled) ? "opacity-5" : ""]]),
        renderWhole: true
      }, [
        createElementVNode("view", {
          onClick: hanlerClick,
          class: "flex flex-row flex-row-center-start flex-1"
        }, [
          props.custom ? (openBlock(), createBlock(tmSheet, {
            key: 0,
            eventPenetrationEnabled: true,
            linear: props.linear,
            linearDeep: props.linearDeep,
            followTheme: props.followTheme,
            followDark: props.followDark,
            dark: props.dark,
            shadow: props.shadow,
            width: props.size,
            height: props.size,
            text: !props.indeterminate && !_checked.value || unref(_disabled),
            border: props.border,
            borderStyle: props.borderStyle,
            transprent: props.transprent,
            padding: [0, 0],
            margin: [16, 8],
            color: unref(_disabled) ? "white" : props.color,
            round: props.round,
            _class: "flex-row flex-row-center-center"
          }, {
            default: withCtx(() => [
              !props.closeAni ? (openBlock(), createElementBlock("view", { key: 0 }, [
                _checked.value && !props.indeterminate ? (openBlock(), createBlock(tmTranslate, {
                  key: 0,
                  duration: 100,
                  name: "zoom",
                  style: { "line-height": "1" }
                }, {
                  default: withCtx(() => [
                    createVNode(tmIcon, {
                      "font-size": props.size * 0.54,
                      name: props.icon
                    }, null, 8, ["font-size", "name"])
                  ]),
                  _: 1
                })) : createCommentVNode("v-if", true),
                props.indeterminate ? (openBlock(), createBlock(tmTranslate, {
                  key: 1,
                  duration: 100,
                  name: "zoom",
                  style: { "line-height": "1" }
                }, {
                  default: withCtx(() => [
                    createVNode(tmIcon, {
                      "font-size": props.size * 0.54,
                      name: "tmicon-minus"
                    }, null, 8, ["font-size"])
                  ]),
                  _: 1
                })) : createCommentVNode("v-if", true)
              ])) : createCommentVNode("v-if", true),
              props.closeAni ? (openBlock(), createElementBlock("view", { key: 1 }, [
                _checked.value && !props.indeterminate ? (openBlock(), createBlock(tmIcon, {
                  key: 0,
                  "font-size": props.size * 0.54,
                  name: props.icon
                }, null, 8, ["font-size", "name"])) : createCommentVNode("v-if", true),
                props.indeterminate ? (openBlock(), createBlock(tmIcon, {
                  key: 1,
                  "font-size": props.size * 0.54,
                  name: "tmicon-minus"
                }, null, 8, ["font-size"])) : createCommentVNode("v-if", true)
              ])) : createCommentVNode("v-if", true)
            ]),
            _: 1
          }, 8, ["linear", "linearDeep", "followTheme", "followDark", "dark", "shadow", "width", "height", "text", "border", "borderStyle", "transprent", "color", "round"])) : createCommentVNode("v-if", true),
          renderSlot(_ctx.$slots, "default", {}, () => [
            createVNode(tmText, {
              userInteractionEnabled: false,
              "font-size": props.fontSize,
              label: props.label
            }, null, 8, ["font-size", "label"])
          ])
        ])
      ], 2);
    };
  }
});
var TmCheckbox = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-checkbox/tm-checkbox.vue"]]);
export { TmCheckbox as T };
