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
import { defineComponent, getCurrentInstance, computed, ref, watch, inject, openBlock, createElementBlock, withModifiers, Fragment, renderList, unref, normalizeClass, createVNode, renderSlot, createBlock, createCommentVNode, toRaw } from "vue";
import { t as tmIcon } from "./tm-icon.js";
import { _ as _export_sfc, c as custom_props, u as useTmpiniaStore, e as computedDark, a as tmText } from "./tm-text.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tm-rate",
  props: __spreadProps(__spreadValues({}, custom_props), {
    count: {
      type: Number,
      default: 5
    },
    modelvalue: {
      type: Number,
      default: 0
    },
    defaultValue: {
      type: Number,
      default: 0
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: "tmicon-collection-fill"
    },
    size: {
      type: Number,
      default: 42
    },
    color: {
      type: [Array, String],
      default: "orange"
    },
    gutter: {
      type: Number,
      default: 16
    },
    followTheme: {
      type: [Boolean, String],
      default: true
    },
    dark: {
      type: [Boolean, String],
      default: false
    },
    followDark: {
      type: [Boolean, String],
      default: true
    },
    label: {
      type: String,
      default: ""
    },
    showLabel: {
      type: Boolean,
      default: false
    }
  }),
  emits: ["click", "change", "update:modelValue"],
  setup(__props, { emit: emits }) {
    var _a, _b, _c;
    const props = __props;
    const store = useTmpiniaStore();
    const proxy = (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const _count = computed(() => props.count);
    const _start = ref(props.defaultValue);
    const tmcfg = computed(() => store.tmStore);
    const isDark = computed(() => computedDark(props, tmcfg.value));
    const _color = computed(() => {
      if (props.followTheme && tmcfg.value.color)
        return tmcfg.value.color;
      if (typeof props.color == "string")
        return props.color;
      if (Array.isArray(props.color)) {
        if (props.color[_start.value - 1]) {
          return props.color[_start.value - 1];
        }
        return props.color[props.color.length - 1];
      }
      return "grey-2";
    });
    const _label = computed(() => {
      if (props.label != "")
        return props.label;
      return _start.value + ".0";
    });
    watch(() => props.modelvalue, () => {
      let valueStart = props.modelvalue >= _count.value ? _count.value : props.modelvalue;
      _start.value = valueStart <= 0 ? 0 : valueStart;
    });
    function startClick(index) {
      if (props.disabled)
        return;
      if (props.readonly) {
        emits("click", index - 1);
        return;
      }
      _start.value = index;
      emits("change", _start.value);
      emits("update:modelValue", _start.value);
      emits("click", index - 1);
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
    let parentFormItem = proxy.$parent;
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
              return val == 0 ? false : true;
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
            let vr = await el.validator(_start.value);
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
              value: _start.value,
              isRequiredError: false,
              componentsName: "tm-rate",
              message: ev.length == 0 ? "" : ev[0].message
            });
          }).catch((er) => {
            parentFormItem.pushCom({
              value: _start.value,
              isRequiredError: true,
              componentsName: "tm-rate",
              message: er.message
            });
          });
        }
      }
    }
    pushFormItem();
    const tmFormFun = inject("tmFormFun", computed(() => ""));
    watch(tmFormFun, () => {
      if (tmFormFun.value == "reset") {
        _start.value = 0;
        emits("update:modelValue", _start.value);
        pushFormItem(false);
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        class: "flex flex-row flex-row-center-start",
        onClick: _cache[0] || (_cache[0] = withModifiers(() => {
        }, ["stop"])),
        renderWhole: true
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(_count), (item, index) => {
          return openBlock(), createElementBlock("view", {
            key: item,
            class: normalizeClass([`pr-${__props.gutter}`, props.disabled ? "opacity-5" : ""])
          }, [
            createVNode(tmIcon, {
              "follow-dark": false,
              color: item <= _start.value ? unref(_color) : "grey-2",
              onClick: ($event) => startClick(item),
              "font-size": props.size,
              name: props.icon
            }, null, 8, ["color", "onClick", "font-size", "name"])
          ], 2);
        }), 128)),
        renderSlot(_ctx.$slots, "default", {}, () => [
          __props.showLabel ? (openBlock(), createBlock(tmText, {
            key: 0,
            dark: unref(isDark),
            color: unref(_color),
            label: unref(_label)
          }, null, 8, ["dark", "color", "label"])) : createCommentVNode("v-if", true)
        ])
      ]);
    };
  }
});
var tmRate = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-rate/tm-rate.vue"]]);
export { tmRate as t };
