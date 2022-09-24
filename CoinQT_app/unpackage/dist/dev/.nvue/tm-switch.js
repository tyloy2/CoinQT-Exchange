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
import { _ as _export_sfc, c as custom_props, r as requireNativePlugin, a as tmText } from "./tm-text.js";
import { defineComponent, getCurrentInstance, computed, ref, watchEffect, watch, onMounted, nextTick, inject, openBlock, createBlock, unref, withCtx, createElementVNode, normalizeStyle, createVNode, normalizeClass, createCommentVNode, toRaw } from "vue";
import { t as tmSheet } from "./tm-sheet.js";
import { t as tmIcon } from "./tm-icon.js";
import { t as tmTranslate } from "./tm-translate.js";
var _style_0 = { "switchbgani": { "": { "transitionTimingFunction": "ease", "transitionProperty": "backgroundColor", "transitionDuration": 300, "transitionDelay": 0 } }, "@TRANSITION": { "switchbgani": { "timingFunction": "ease", "property": "backgroundColor", "duration": 300, "delay": 0 } } };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tm-switch",
  props: __spreadProps(__spreadValues({}, custom_props), {
    followTheme: {
      type: [Boolean, String],
      default: true
    },
    margin: {
      type: Array,
      default: () => [0, 0]
    },
    transprent: {
      type: Boolean,
      default: false
    },
    defaultValue: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    size: {
      type: String,
      default: "normal"
    },
    color: {
      type: String,
      default: "primary"
    },
    unCheckedColor: {
      type: String,
      default: "grey-3"
    },
    barColor: {
      type: String,
      default: "white"
    },
    round: {
      type: Number,
      default: 10
    },
    load: {
      type: Boolean,
      default: false
    },
    beforeChecked: {
      type: [Function, Boolean, String],
      default: () => false
    },
    barIcon: {
      type: String,
      default: "tmicon-check"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: Array,
      default: () => ["", ""]
    }
  }),
  emits: ["update:modelValue", "change", "click"],
  setup(__props, { emit: emits }) {
    var _a, _b, _c;
    const props = __props;
    const animation = requireNativePlugin("animation");
    const proxy = (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const viewSize = computed(() => {
      let width = 0;
      let height = 0;
      let fontSize = 24;
      let gutter = 2;
      let round = props.round;
      if (props.width && props.height) {
        width = props.width;
        height = props.height;
        fontSize = height * 0.45;
      } else {
        if (props.size == "normal") {
          width = 100;
          height = 50;
          fontSize = 26;
        } else if (props.size == "mini") {
          width = 80;
          height = 40;
          fontSize = 22;
        } else if (props.size == "large") {
          width = 120;
          height = 60;
          fontSize = 32;
          round = 24;
        }
      }
      let gutterPx = gutter;
      width = Math.ceil(uni.upx2px(width));
      height = Math.ceil(uni.upx2px(height));
      let obj = {
        width,
        height,
        innerHeight: height - gutterPx * 2,
        innerWidth: width / 2 - gutterPx * 2,
        coenteWidth: width - gutterPx * 2,
        conentWidthPx: width - gutterPx * 2,
        fontSize,
        round
      };
      return obj;
    });
    const _value = ref(false);
    if (props.defaultValue) {
      _value.value = props.defaultValue;
    }
    const _load = ref(false);
    watchEffect(() => {
      _load.value = props.load;
    });
    async function switchClick() {
      emits("click");
      if (_load.value || props.disabled)
        return;
      if (typeof props.beforeChecked === "function") {
        _load.value = true;
        let p = await props.beforeChecked();
        if (typeof p === "function") {
          p = await p();
        }
        _load.value = false;
        if (!p)
          return;
      }
      _value.value = !_value.value;
      spinNvueAni(_value.value);
      emits("change", _value.value);
      emits("update:modelValue", _value.value);
      pushFormItem();
    }
    watch(() => props.modelValue, (newval) => {
      _value.value = newval;
      spinNvueAni(newval);
    });
    onMounted(() => {
      nextTick(() => spinNvueAni(_value.value));
    });
    function spinNvueAni(reveser = false) {
      if (!(proxy == null ? void 0 : proxy.$refs["switch"]))
        return;
      var testEl = proxy == null ? void 0 : proxy.$refs.switch;
      animation.transition(testEl, {
        styles: {
          transform: reveser ? `translateX(${viewSize.value.innerWidth + 4}px)` : "translateX(0px)",
          transformOrigin: "center center"
        },
        duration: 250,
        timingFunction: "ease",
        delay: 0
      }, () => {
      });
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
              return val === true ? true : false;
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
            let vr = await el.validator(_value.value);
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
              value: _value.value,
              isRequiredError: false,
              componentsName: "tm-switch",
              message: ev.length == 0 ? "" : ev[0].message
            });
          }).catch((er) => {
            parentFormItem.pushCom({
              value: _value.value,
              isRequiredError: true,
              componentsName: "tm-switch",
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
        _value.value = false;
        emits("update:modelValue", _value.value);
        pushFormItem(false);
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(tmSheet, {
        onClick: switchClick,
        "no-level": !_value.value,
        followTheme: props.followTheme,
        followDark: props.followDark,
        dark: props.dark,
        shadow: props.shadow,
        outlined: props.outlined,
        borderStyle: props.borderStyle,
        borderDirection: props.borderDirection,
        linearDeep: props.linearDeep,
        linear: _value.value ? props.linear : "",
        round: unref(viewSize).round,
        color: _value.value ? props.color : props.unCheckedColor,
        height: unref(viewSize).height,
        width: unref(viewSize).width,
        parenClass: "switchbgani",
        _class: ["flex  relative flex-col", props.disabled ? "opacity-4" : ""],
        text: _value.value ? false : props.text,
        unit: "px",
        padding: [0, 0],
        margin: props.margin
      }, {
        default: withCtx(() => [
          createElementVNode("view", {
            class: "relative flex relative flex-col",
            style: normalizeStyle({ padding: "2px", width: `${unref(viewSize).width}px`, height: `${unref(viewSize).height}px` })
          }, [
            createElementVNode("view", {
              userInteractionEnabled: false,
              class: "flex flex-row flex-between",
              style: normalizeStyle([{ width: unref(viewSize).coenteWidth + "px", height: unref(viewSize).innerHeight + "px" }])
            }, [
              createElementVNode("view", { class: "flex-1 flex-row flex-row-center-center" }, [
                createVNode(tmText, {
                  "font-size": unref(viewSize).fontSize,
                  label: props.label[0]
                }, null, 8, ["font-size", "label"])
              ]),
              createElementVNode("view", { class: "flex-1 flex-row flex-row-center-center" }, [
                createVNode(tmText, {
                  "font-size": unref(viewSize).fontSize,
                  label: props.label[1]
                }, null, 8, ["font-size", "label"])
              ])
            ], 4),
            createElementVNode("view", {
              userInteractionEnabled: false,
              class: normalizeClass([["absolute base nvue", _value.value ? "on" : "off"], "flex flex-col"]),
              ref: "switch",
              style: normalizeStyle({
                width: unref(viewSize).innerWidth + "px",
                height: unref(viewSize).innerHeight + "px"
              })
            }, [
              createVNode(tmSheet, {
                userInteractionEnabled: false,
                padding: [0, 0],
                margin: [0, 0],
                height: unref(viewSize).innerHeight,
                width: unref(viewSize).innerWidth,
                color: props.barColor,
                "follow-dark": false,
                round: unref(viewSize).round,
                unit: "px",
                _class: "flex flex-center flex-row"
              }, {
                default: withCtx(() => [
                  _load.value ? (openBlock(), createBlock(tmIcon, {
                    key: 0,
                    followTheme: props.followTheme,
                    "font-size": unref(viewSize).fontSize,
                    color: props.color,
                    name: "tmicon-loading",
                    spin: ""
                  }, null, 8, ["followTheme", "font-size", "color"])) : createCommentVNode("v-if", true),
                  !_load.value && _value.value ? (openBlock(), createBlock(tmTranslate, {
                    key: 1,
                    name: "zoom"
                  }, {
                    default: withCtx(() => [
                      createVNode(tmIcon, {
                        followTheme: props.followTheme,
                        "font-size": unref(viewSize).fontSize,
                        color: props.color,
                        name: props.barIcon
                      }, null, 8, ["followTheme", "font-size", "color", "name"])
                    ]),
                    _: 1
                  })) : createCommentVNode("v-if", true)
                ]),
                _: 1
              }, 8, ["height", "width", "color", "round"])
            ], 6)
          ], 4)
        ]),
        _: 1
      }, 8, ["no-level", "followTheme", "followDark", "dark", "shadow", "outlined", "borderStyle", "borderDirection", "linearDeep", "linear", "round", "color", "height", "width", "_class", "text", "margin"]);
    };
  }
});
var TmSwitch = /* @__PURE__ */ _export_sfc(_sfc_main, [["styles", [_style_0]], ["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-switch/tm-switch.vue"]]);
export { TmSwitch as T };
