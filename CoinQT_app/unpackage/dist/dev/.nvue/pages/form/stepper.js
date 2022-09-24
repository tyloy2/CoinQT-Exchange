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
import { defineComponent, ref, computed, watch, openBlock, createElementBlock, normalizeStyle, createVNode, withCtx, createElementVNode, normalizeClass, unref, nextTick } from "vue";
import { _ as _export_sfc, c as custom_props, u as useTmpiniaStore, e as computedDark, f as computedTheme, t as tmApp, a as tmText } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmIcon } from "../../tm-icon.js";
import { t as tmDivider } from "../../tm-divider.js";
import "pinia";
var _style_0 = {};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "tm-stepper",
  props: __spreadProps(__spreadValues({}, custom_props), {
    followTheme: {
      type: [Boolean, String],
      default: true
    },
    width: {
      type: [Number],
      default: 210
    },
    height: {
      type: [Number],
      default: 52
    },
    disabled: {
      type: Boolean,
      default: false
    },
    disabledInput: {
      type: [Boolean],
      default: false
    },
    black: {
      type: [Boolean, String],
      default: null
    },
    step: {
      type: Number,
      default: 1
    },
    fixed: {
      type: Number,
      default: 0
    },
    color: {
      type: String,
      default: "grey-4"
    },
    bgColor: {
      type: String,
      default: "grey-4"
    },
    linear: {
      type: String,
      default: ""
    },
    linearDeep: {
      type: String,
      default: "light"
    },
    round: {
      type: [String, Number],
      default: 2
    },
    fontSize: {
      type: [String, Number],
      default: 28
    },
    circular: {
      type: [Boolean],
      default: false
    },
    max: {
      type: [Number],
      default: 999
    },
    min: {
      type: [Number],
      default: 3
    },
    beforeEnter: {
      type: [Function, Boolean],
      default: true
    },
    modelValue: {
      type: Number,
      default: null
    },
    defaultValue: {
      type: Number,
      default: null
    }
  }),
  emits: ["update:modelValue", "change"],
  setup(__props, { emit: emits }) {
    var _a;
    const props = __props;
    const store = useTmpiniaStore();
    const setVal = ref((_a = props.defaultValue) != null ? _a : null);
    const tmcfg = computed(() => store.tmStore);
    const isDark = computed(() => computedDark(props, tmcfg.value));
    const tmcomputed = computed(() => computedTheme(__spreadProps(__spreadValues({}, props), { color: props.bgColor, text: true }), isDark.value, tmcfg.value));
    let timeid = NaN;
    const isJianDisabled = computed(() => {
      if (setVal.value <= props.min)
        return true;
      return false;
    });
    const isAddDisabled = computed(() => {
      if (setVal.value >= props.max)
        return true;
      return false;
    });
    watch(() => props.modelValue, () => {
      setVal.value = Number(props.modelValue);
    });
    function strWidth(len) {
      let v = "";
      for (let i = 0; i < len - 1; i++) {
        v += "0";
      }
      return v;
    }
    async function setStep(ty) {
      if (props.disabled)
        return;
      if (typeof props.beforeEnter === "function") {
        uni.showLoading({
          title: "...",
          mask: true
        });
        let p = await props.beforeEnter(ty);
        if (typeof p === "function") {
          p = await p(ty);
        }
        uni.hideLoading();
        if (!p)
          return false;
      }
      var val = !setVal.value ? 0 : setVal.value;
      if (props.fixed > 0) {
        val = val.toFixed(props.fixed);
        if (!val) {
          val = "0." + strWidth(props.fixed) + props.step;
        }
        val = Number(val);
        let _setval = "0." + strWidth(props.fixed) + props.step;
        _setval = Number(String(_setval));
        if (ty == "+") {
          val += _setval;
          if (val > props.max) {
            val = props.max;
          }
        } else {
          val -= _setval;
          if (val < props.min) {
            val = props.min;
          }
        }
      } else {
        val = val.toFixed(props.fixed);
        val = parseInt(val);
        if (ty == "+") {
          val += props.step;
          if (val > props.max) {
            val = props.max;
          }
        } else {
          val -= props.step;
          if (val < props.min) {
            val = props.min;
          }
        }
      }
      val = Number(val.toFixed(props.fixed));
      if (val < 0) {
        if (val <= props.min) {
          val = props.min;
        }
        clearInterval(timeid);
      } else if (val >= props.max) {
        val = props.max;
        clearInterval(timeid);
      }
      nextTick(function() {
        const realVal = val;
        setVal.value = Number(realVal ? realVal : 0);
        emits("update:modelValue", setVal.value);
        emits("change", setVal.value);
      });
    }
    function inputVal(e) {
      var val = parseFloat(e.detail.value);
      jianchData(val);
    }
    function jianchData(val) {
      if (props.fixed > 0) {
        val = Number(val).toFixed(props.fixed);
        if (isNaN(parseInt(val)) || val == "0" || !val) {
          val = "0." + strWidth(props.fixed) + props.step;
        }
      } else if (props.fixed == 0) {
        val = Number(val).toFixed(0);
      }
      const realval = val;
      if (val < props.min) {
        val = String(props.min);
      }
      if (val > props.max) {
        val = String(props.max);
      }
      setVal.value = Number(realval);
      nextTick(function() {
        emits("update:modelValue", setVal.value);
        emits("change", setVal.value);
      });
    }
    function longpressEvent(ty) {
      if (props.disabled)
        return;
      clearInterval(timeid);
      timeid = setInterval(async function() {
        await setStep(ty);
      }, 250);
    }
    function endlongpressEvent(ty) {
      clearInterval(timeid);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        class: "flex flex-row",
        style: normalizeStyle([{ width: `${props.width}rpx`, height: `${props.height}rpx` }]),
        renderWhole: true
      }, [
        createVNode(tmSheet, {
          text: "",
          transprent: props.circular,
          followTheme: false,
          _class: "flex flex-row",
          color: props.bgColor,
          margin: [0, 0],
          padding: [0, 0]
        }, {
          default: withCtx(() => [
            createElementVNode("view", {
              class: normalizeClass([!props.circular ? `` : `round-${10}`, "overflow", props.disabled || unref(isJianDisabled) ? "opacity-5" : ""])
            }, [
              createVNode(tmSheet, {
                followTheme: props.followTheme,
                round: props.circular ? 10 : props.round,
                linear: props.linear,
                "linear-deep": props.linearDeep,
                onClick: _cache[0] || (_cache[0] = ($event) => setStep("-")),
                onLongpress: _cache[1] || (_cache[1] = ($event) => longpressEvent("-")),
                onTouchend: _cache[2] || (_cache[2] = ($event) => endlongpressEvent()),
                _class: "flex-center",
                color: props.color,
                margin: [0, 0],
                padding: [0, 0],
                height: __props.height,
                width: props.height
              }, {
                default: withCtx(() => [
                  createVNode(tmIcon, {
                    userInteractionEnabled: false,
                    "font-size": 22,
                    name: "tmicon-minus"
                  })
                ]),
                _: 1
              }, 8, ["followTheme", "round", "linear", "linear-deep", "color", "height", "width"])
            ], 2),
            createElementVNode("u-input", {
              disabled: props.disabledInput || props.disabled,
              onInput: inputVal,
              value: setVal.value,
              autoBlur: "",
              style: normalizeStyle([{ height: `${props.height}rpx`, textAlign: "center", fontSize: props.fontSize + "rpx", width: `${props.width - 120}rpx`, color: unref(tmcomputed).textColor }]),
              type: "number"
            }, null, 44, ["disabled", "value"]),
            createElementVNode("view", {
              class: normalizeClass([!props.circular ? `` : `round-${10}`, "overflow", props.disabled || unref(isAddDisabled) ? "opacity-5" : ""])
            }, [
              createVNode(tmSheet, {
                followTheme: props.followTheme,
                round: props.circular ? 10 : props.round,
                linear: props.linear,
                "linear-deep": props.linearDeep,
                onClick: _cache[3] || (_cache[3] = ($event) => setStep("+")),
                onLongpress: _cache[4] || (_cache[4] = ($event) => longpressEvent("+")),
                onTouchend: _cache[5] || (_cache[5] = ($event) => endlongpressEvent()),
                _class: "flex-center",
                color: props.color,
                margin: [0, 0],
                padding: [0, 0],
                height: __props.height,
                width: props.height
              }, {
                default: withCtx(() => [
                  createVNode(tmIcon, {
                    userInteractionEnabled: false,
                    "font-size": 22,
                    name: "tmicon-plus"
                  })
                ]),
                _: 1
              }, 8, ["followTheme", "round", "linear", "linear-deep", "color", "height", "width"])
            ], 2)
          ]),
          _: 1
        }, 8, ["transprent", "color"])
      ], 4);
    };
  }
});
var tmStepper = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["styles", [_style_0]], ["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-stepper/tm-stepper.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "stepper",
  setup(__props) {
    function beforeEnter() {
      return new Promise((res) => {
        setTimeout(function() {
          res(true);
        }, 1e3);
      });
    }
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
                createVNode(tmDivider),
                createVNode(tmStepper, { defaultValue: 20 })
              ]),
              _: 1
            }),
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: "\u4E00\u4E9B\u5176\u5B83\u5E38\u89C1\u5C5E\u6027"
                }),
                createVNode(tmDivider),
                createVNode(tmStepper, {
                  color: "primary",
                  bgColor: "primary",
                  circular: "",
                  defaultValue: 20
                })
              ]),
              _: 1
            }),
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: "\u6B65\u5E453"
                }),
                createVNode(tmDivider),
                createVNode(tmStepper, {
                  color: "red",
                  bgColor: "red",
                  step: 3,
                  circular: "",
                  defaultValue: 0
                }),
                createVNode(tmText, {
                  _class: "pt-24 font-weight-b",
                  "font-size": 24,
                  label: "\u5C0F\u6570\u70B9"
                }),
                createVNode(tmDivider),
                createVNode(tmStepper, {
                  round: 0,
                  bgColor: "green",
                  color: "green",
                  fixed: 1,
                  defaultValue: 0.3
                }, null, 8, ["defaultValue"]),
                createVNode(tmText, {
                  _class: "pt-24 font-weight-b",
                  "font-size": 24,
                  label: "\u6700\u5927\u503C10\uFF0C\u6700\u5C0F\u503C-3"
                }),
                createVNode(tmDivider),
                createVNode(tmStepper, {
                  max: 10,
                  min: -3,
                  defaultValue: 1
                })
              ]),
              _: 1
            }),
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: "\u5F02\u6B65\u589E\u51CF,\u5C3A\u5BF8\u7684\u6539\u53D8"
                }),
                createVNode(tmDivider),
                createVNode(tmStepper, {
                  width: 200,
                  height: 62,
                  beforeEnter,
                  color: "red",
                  linear: "bottom",
                  bgColor: "red",
                  circular: "",
                  defaultValue: 20
                })
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
var stepper = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/form/stepper.nvue"]]);
export { stepper as default };
