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
import { defineComponent, getCurrentInstance, ref, computed, watch, nextTick, inject, provide, openBlock, createElementBlock, normalizeClass, unref, renderSlot, toRaw } from "vue";
import { _ as _export_sfc } from "./tm-text.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tm-checkbox-group",
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    max: {
      type: Number,
      default: 999
    },
    defaultValue: {
      type: Array,
      default: () => []
    },
    align: {
      type: String,
      default: "left"
    },
    modelValue: {
      type: Array,
      default: () => []
    },
    direction: {
      type: String,
      default: "row"
    }
  },
  emits: ["update:modelValue", "change"],
  setup(__props, { expose, emit: emits }) {
    var _a, _b, _c;
    const props = __props;
    const proxy = (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    let _cacheBoxList = [];
    const _mValue = ref([.../* @__PURE__ */ new Set([...props.defaultValue, ...props.modelValue])]);
    const _align = computed(() => {
      let list = {
        left: "flex-row-center-start",
        center: "flex-row-center-center",
        right: "flex-row-center-end"
      };
      return list[props.align];
    });
    const checkBoxkeyId = "tmCheckBoxGroup";
    watch(() => props.modelValue, () => {
      _mValue.value = props.modelValue;
    }, { deep: true });
    const _maxChecked = computed(() => _mValue.value.length >= props.max);
    function pushKey(key) {
      _cacheBoxList.push(key);
    }
    nextTick(() => {
      let a = new Set(_mValue.value);
      let b = new Set(_cacheBoxList);
      const _filter_key = new Set([...b].filter((x) => a.has(x)));
      _mValue.value = [..._filter_key];
      emits("update:modelValue", _mValue.value);
    });
    function addKey(key) {
      let seletedKeys = new Set(_mValue.value);
      seletedKeys.add(key);
      _mValue.value = [...seletedKeys];
      emits("change", _mValue.value);
      emits("update:modelValue", _mValue.value);
      pushFormItem();
    }
    function delKey(key) {
      let seletedKeys = new Set(_mValue.value);
      seletedKeys.delete(key);
      _mValue.value = [...seletedKeys];
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
              return String(val).length == 0 ? false : true;
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
            parentFormItem.pushCom({
              value: _mValue.value,
              isRequiredError: false,
              componentsName: "tm-checkbox-group",
              message: ev.length == 0 ? "" : ev[0].message
            });
          }).catch((er) => {
            parentFormItem.pushCom({
              value: _mValue.value,
              isRequiredError: true,
              componentsName: "tm-checkbox-group",
              message: er.message
            });
          });
        }
      }
    }
    pushFormItem();
    provide("tmCheckedBoxDisabled", computed(() => props.disabled));
    provide("tmCheckedBoxVal", computed(() => _mValue.value));
    provide("tmCheckedBoxMax", _maxChecked);
    expose({ pushKey, addKey, delKey, checkBoxkeyId });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        class: normalizeClass(["flex", [props.direction == "row" ? "flex-row " : "flex-col", unref(_align)]]),
        style: { flexWrap: "wrap" },
        renderWhole: true
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 2);
    };
  }
});
var tmCheckboxGroup = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-checkbox-group/tm-checkbox-group.vue"]]);
export { tmCheckboxGroup as t };
