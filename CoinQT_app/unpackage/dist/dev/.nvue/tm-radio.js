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
import { defineComponent, getCurrentInstance, ref, computed, watch, nextTick, inject, provide, openBlock, createElementBlock, normalizeClass, unref, renderSlot, toRaw, createElementVNode, createBlock, withCtx, createVNode, createCommentVNode } from "vue";
import { _ as _export_sfc, c as custom_props, a as tmText } from "./tm-text.js";
import { t as tmSheet } from "./tm-sheet.js";
import { t as tmIcon } from "./tm-icon.js";
import { t as tmTranslate } from "./tm-translate.js";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "tm-radio-group",
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    defaultValue: {
      type: [String, Number, Boolean],
      default: ""
    },
    modelValue: {
      type: [String, Number, Boolean],
      default: ""
    },
    direction: {
      type: String,
      default: "row"
    },
    align: {
      type: String,
      default: "left"
    },
    model: {
      type: String,
      default: "radio"
    }
  },
  emits: ["update:modelValue", "change"],
  setup(__props, { expose, emit: emits }) {
    var _a, _b, _c;
    const props = __props;
    const proxy = (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    let _cacheBoxList = [];
    const _mValue = ref(props.defaultValue || props.modelValue);
    const _align = computed(() => {
      let list = {
        left: "flex-row-center-start",
        center: "flex-row-center-center",
        right: "flex-row-center-end"
      };
      return list[props.align];
    });
    const checkBoxkeyId = "tmRadioBoxGroup";
    watch(() => props.modelValue, () => {
      _mValue.value = props.modelValue;
    }, { deep: true });
    function pushKey(key) {
      _cacheBoxList.push(key);
    }
    nextTick(() => {
      const _filter_key = _cacheBoxList.filter((el) => el == _mValue.value);
      if (_filter_key.length > 0) {
        _mValue.value = _filter_key[0];
      }
      emits("update:modelValue", _mValue.value);
    });
    function addKey(key) {
      _mValue.value = key;
      emits("change", _mValue.value);
      emits("update:modelValue", _mValue.value);
      pushFormItem();
    }
    const rulesObj = inject("tmFormItemRules", computed(() => {
      return [
        {
          message: "\u8BF7\u9009\u62E9",
          required: false,
          validator: false
        }
      ];
    }));
    let parentFormItem = proxy == null ? void 0 : proxy.$parent;
    while (parentFormItem) {
      if ((parentFormItem == null ? void 0 : parentFormItem.tmFormComnameFormItem) == "tmFormComnameFormItem" || !parentFormItem) {
        break;
      } else {
        parentFormItem = (_c = parentFormItem == null ? void 0 : parentFormItem.$parent) != null ? _c : void 0;
      }
    }
    const validate = (rules) => {
      rules = rules.map((el) => {
        if (typeof el.validator === "function" && el.required === true) {
          return el;
        } else if (typeof el.validator === "boolean" && el.required === true) {
          return __spreadProps(__spreadValues({}, el), {
            validator: (val) => {
              return String(val).length == 0 || typeof val === null ? false : true;
            }
          });
        } else {
          return __spreadProps(__spreadValues({}, el), {
            validator: (val) => {
              return true;
            }
          });
        }
      });
      let rules_filter = rules.filter((el) => {
        return typeof el.validator === "function" && el.required === true;
      });
      let rules_fun = rules_filter.map((el) => {
        return new Promise(async (res, rej) => {
          if (typeof el.validator === "function") {
            let vr = await el.validator(_mValue.value);
            if (vr) {
              res({
                message: String(el.message),
                validator: true
              });
            } else {
              rej({
                message: el.message,
                validator: false
              });
            }
          } else {
            res({
              message: el.message,
              validator: true
            });
          }
        });
      });
      return Promise.all(rules_fun);
    };
    async function pushFormItem(isCheckVail = true) {
      if (parentFormItem) {
        if (isCheckVail) {
          validate(toRaw(rulesObj.value)).then((ev) => {
            parentFormItem == null ? void 0 : parentFormItem.pushCom({
              value: _mValue.value,
              isRequiredError: false,
              componentsName: "tm-radio-group",
              message: ev.length == 0 ? "" : ev[0].message
            });
          }).catch((er) => {
            parentFormItem == null ? void 0 : parentFormItem.pushCom({
              value: _mValue.value,
              isRequiredError: true,
              componentsName: "tm-radio-group",
              message: er.message
            });
          });
        }
      }
    }
    pushFormItem();
    provide("tmRadioBoxDisabled", computed(() => props.disabled));
    provide("tmRadioBoxVal", computed(() => _mValue.value));
    provide("tmRadioBoxModel", computed(() => props.model == "radio"));
    expose({ pushKey, addKey, checkBoxkeyId });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        class: normalizeClass(["flex", [props.direction == "row" ? "flex-row  flex-wrap" : "flex-col", unref(_align)]]),
        renderWhole: true
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 2);
    };
  }
});
var tmRadioGroup = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-radio-group/tm-radio-group.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tm-radio",
  props: __spreadProps(__spreadValues({}, custom_props), {
    followTheme: {
      type: [Boolean, String],
      default: true
    },
    size: {
      type: Number,
      default: 42
    },
    transprent: {
      type: Boolean,
      default: false
    },
    custom: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: "primary"
    },
    round: {
      type: Number,
      default: 24
    },
    border: {
      type: Number,
      default: 2
    },
    value: {
      type: [String, Number, Boolean],
      default: ""
    },
    modelValue: {
      type: [String, Number, Boolean],
      default: ""
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
      default: 26
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
    const proxy = (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const _checked = ref((_c = props.defaultChecked) != null ? _c : false);
    const _groupCheckedVal = inject("tmRadioBoxVal", computed(() => ""));
    const tmCheckedBoxDisabled = inject("tmRadioBoxDisabled", computed(() => false));
    const _is_radio = inject("tmRadioBoxModel", computed(() => false));
    const _disabled = computed(() => props.disabled || tmCheckedBoxDisabled.value);
    let parent = proxy == null ? void 0 : proxy.$parent;
    while (parent) {
      if ((parent == null ? void 0 : parent.checkBoxkeyId) == "tmRadioBoxGroup" || !parent) {
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
          parent == null ? void 0 : parent.addKey("");
        }
        _checked.value = false;
      }
    });
    function vailChecked() {
      let checked_val = false;
      if (props.modelValue === props.value && typeof props.value !== "undefined" && props.value !== "" && props.modelValue !== "") {
        checked_val = true;
      }
      if (props.value === _groupCheckedVal.value && _groupCheckedVal.value !== "" && props.value !== "") {
        checked_val = true;
      }
      return checked_val;
    }
    if (vailChecked()) {
      _checked.value = true;
      emits("update:modelValue", props.value);
    }
    async function hanlerClick() {
      if (_disabled.value || _checked.value) {
        return;
      }
      if (typeof props.beforChecked === "function") {
        uni.showLoading({
          title: "...",
          mask: true
        });
        let p = await props.beforChecked();
        if (typeof p === "function") {
          p = await p();
        }
        uni.hideLoading();
        if (!p)
          return;
      }
      _checked.value = true;
      if (parent) {
        parent.addKey(props.value);
      }
      emits("update:modelValue", props.value);
      emits("change", _checked.value);
    }
    watch([() => props.modelValue, _groupCheckedVal], () => {
      _checked.value = vailChecked();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        class: normalizeClass(["flex flex-col flex-wrap overflow", [unref(_disabled) ? "opacity-5" : ""]]),
        style: { "flex-wrap": "wrap" },
        renderWhole: true
      }, [
        createElementVNode("view", {
          onClick: hanlerClick,
          class: "flex flex-row flex-row-center-start flex-1"
        }, [
          props.custom ? (openBlock(), createBlock(tmSheet, {
            key: 0,
            linear: props.linear,
            linearDeep: props.linearDeep,
            followTheme: props.followTheme,
            followDark: props.followDark,
            dark: props.dark,
            shadow: props.shadow,
            userInteractionEnabled: false,
            width: unref(_is_radio) ? props.size : 0,
            height: unref(_is_radio) ? props.size : 0,
            text: !_checked.value,
            border: props.border,
            "border-style": props.borderStyle,
            transprent: props.transprent,
            padding: unref(_is_radio) ? [0, 0] : [16, 10],
            margin: unref(_is_radio) ? [16, 8] : [8, 8],
            color: unref(_disabled) ? "grey-2" : props.color,
            round: props.round,
            _class: "flex-row flex-row-center-center"
          }, {
            default: withCtx(() => [
              _checked.value && unref(_is_radio) ? (openBlock(), createBlock(tmTranslate, {
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
              !unref(_is_radio) ? (openBlock(), createBlock(tmText, {
                key: 1,
                "font-size": props.fontSize,
                label: props.label
              }, null, 8, ["font-size", "label"])) : createCommentVNode("v-if", true)
            ]),
            _: 1
          }, 8, ["linear", "linearDeep", "followTheme", "followDark", "dark", "shadow", "width", "height", "text", "border", "border-style", "transprent", "padding", "margin", "color", "round"])) : createCommentVNode("v-if", true),
          createElementVNode("view", { userInteractionEnabled: false }, [
            renderSlot(_ctx.$slots, "default", {}, () => [
              createElementVNode("view", {
                class: "flex-1 flex-row flex-row-cneter-cneter",
                style: { "flex-wrap": "wrap" }
              }, [
                unref(_is_radio) ? (openBlock(), createBlock(tmText, {
                  key: 0,
                  class: "flex-1 flex-wrap",
                  "font-size": props.fontSize,
                  label: props.label
                }, null, 8, ["font-size", "label"])) : createCommentVNode("v-if", true)
              ])
            ])
          ])
        ])
      ], 2);
    };
  }
});
var tmRadio = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-radio/tm-radio.vue"]]);
export { tmRadio as a, tmRadioGroup as t };
