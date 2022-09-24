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
import { _ as _export_sfc, a as tmText, r as requireNativePlugin } from "./tm-text.js";
import { defineComponent, computed, openBlock, createElementBlock, normalizeStyle, normalizeClass, createVNode, unref, withModifiers, Fragment, createCommentVNode, createElementVNode, renderList, ref, getCurrentInstance, watchEffect, watch, inject, createBlock, withCtx, toRaw } from "vue";
import { t as tmSheet } from "./tm-sheet.js";
import { t as tmIcon } from "./tm-icon.js";
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "slider-bar",
  props: {
    followTheme: {
      type: [Boolean, String],
      default: true
    },
    size: {
      type: Number,
      default: 6
    },
    x: {
      type: Number,
      dfault: 0
    },
    width: {
      type: Number,
      dfault: 0
    },
    color: {
      type: String,
      default: "primary"
    },
    direction: {
      type: String,
      default: "vertical"
    }
  },
  setup(__props) {
    const props = __props;
    const _sizePx = computed(() => uni.upx2px(props.size));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        style: normalizeStyle([
          props.direction == "horizontal" ? { width: props.width + "px", height: props.size + "rpx", left: props.x + "px", top: -props.size + "rpx" } : { height: props.width + "px", width: props.size + "rpx", top: props.x + "px" }
        ]),
        class: normalizeClass([
          props.direction == "horizontal" ? "flex flex-col" : "flex flex-row absolute"
        ]),
        renderWhole: true
      }, [
        createVNode(tmSheet, {
          followTheme: props.followTheme,
          round: 10,
          unit: "px",
          color: props.color,
          linear: "right",
          width: props.direction == "horizontal" ? props.width : unref(_sizePx),
          height: props.direction == "horizontal" ? unref(_sizePx) : props.width,
          margin: [0, 0],
          padding: [0, 0]
        }, null, 8, ["followTheme", "color", "width", "height"])
      ], 6);
    };
  }
});
var sliderBar = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-slider/slider-bar.vue"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "slider-button",
  props: {
    followTheme: {
      type: [Boolean, String],
      default: true
    },
    size: {
      type: Number,
      default: 32
    },
    x: {
      type: Number,
      dfault: 0
    },
    color: {
      type: String,
      default: "primary"
    },
    direction: {
      type: String,
      default: "vertical"
    }
  },
  emits: ["movestart", "moveing", "moveend"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const _x = computed(() => props.x);
    let timerId = NaN;
    function debounce(func, wait = 500, immediate = false) {
      if (!isNaN(timerId))
        clearTimeout(timerId);
      if (immediate) {
        var callNow = !timerId;
        timerId = setTimeout(() => {
          timerId = NaN;
        }, wait);
        if (callNow)
          typeof func === "function" && func();
      } else {
        timerId = setTimeout(() => {
          typeof func === "function" && func();
        }, wait);
      }
    }
    function movestart(e) {
      let etype = e.type.toLocaleLowerCase();
      let ex = 0;
      let ey = 0;
      if (etype == "mousedown") {
        ex = e.pageX;
        ey = e.pageY;
      } else if (etype == "touchstart") {
        ex = e.changedTouches[0].pageX;
        ey = e.changedTouches[0].pageY;
      }
      emits("movestart", { x: ex, y: ey });
    }
    function moveing(e) {
      let etype = e.type.toLocaleLowerCase();
      let ex = 0;
      let ey = 0;
      if (etype == "mousemove") {
        ex = e.pageX;
        ey = e.pageY;
      } else if (etype == "touchmove") {
        ex = e.changedTouches[0].pageX;
        ey = e.changedTouches[0].pageY;
      }
      debounce(() => {
        emits("moveing", { x: ex, y: ey });
      }, 5, false);
      e.preventDefault();
      e.stopPropagation();
    }
    function moveend(e) {
      let etype = e.type.toLocaleLowerCase();
      let ex = 0;
      let ey = 0;
      if (etype == "mouseup" || etype == "mouseleave") {
        ex = e.pageX;
        ey = e.pageY;
      } else if (etype == "touchend") {
        ex = e.changedTouches[0].pageX;
        ey = e.changedTouches[0].pageY;
      }
      emits("moveend", { x: ex, y: ey });
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        onTouchstart: withModifiers(movestart, ["stop"]),
        onMousedown: withModifiers(movestart, ["stop"]),
        onTouchmove: withModifiers(moveing, ["stop"]),
        onMousemove: withModifiers(moveing, ["stop"]),
        onTouchend: withModifiers(moveend, ["stop"]),
        onMouseup: withModifiers(moveend, ["stop"]),
        onMouseleave: withModifiers(moveend, ["stop"]),
        class: "absolute",
        style: normalizeStyle([
          props.direction == "horizontal" ? { width: props.size + "rpx", height: props.size + "rpx", transform: `translateX(${unref(_x)}px)`, top: "0px" } : "",
          props.direction == "vertical" ? { width: props.size + "rpx", height: props.size + "rpx", transform: `translateY(${unref(_x)}px)`, left: 0 + "rpx", top: "0px" } : ""
        ]),
        renderWhole: true
      }, [
        createVNode(tmSheet, {
          followTheme: props.followTheme,
          text: "",
          border: 4,
          userInteractionEnabled: false,
          color: props.color,
          round: 24,
          width: props.size,
          height: props.size,
          margin: [0, 0],
          padding: [0, 0]
        }, null, 8, ["followTheme", "color", "width", "height"])
      ], 44, ["onTouchstart", "onMousedown", "onTouchmove", "onMousemove", "onTouchend", "onMouseup", "onMouseleave"]);
    };
  }
});
var sliderButton = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-slider/slider-button.vue"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "slider-label",
  props: {
    direction: {
      type: String,
      default: "horizontal"
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    min: {
      type: Number,
      default: 0
    },
    step: {
      type: Number,
      default: 0
    },
    size: {
      type: Number,
      default: 32
    }
  },
  setup(__props) {
    const props = __props;
    const _stepArray = computed(() => {
      let label = [];
      if (props.step == 0)
        return [];
      let _step = props.max / props.step;
      for (let i = 1; i <= props.step; i++) {
        label.push(i * _step);
      }
      return [props.min, ...label];
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createCommentVNode(" \u5E95\u90E8\u663E\u793A\u7684\u6807\u7B7E "),
        createElementVNode("view", {
          class: normalizeClass(["flex flex-between", [props.direction == "vertical" ? "flex-col" : "flex-row"]]),
          style: normalizeStyle([
            props.direction == "horizontal" ? { width: __props.width + "rpx" } : { height: __props.height + "rpx" }
          ])
        }, [
          props.direction == "horizontal" ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(unref(_stepArray), (item, index) => {
            return openBlock(), createElementBlock("view", {
              class: normalizeClass(["flex flex-row", [index == 0 ? "flex-row-top-start" : "", index == unref(_stepArray).length - 1 ? "flex-row-top-end" : "", index < unref(_stepArray).length - 1 && index > 0 ? "flex-row-top-center" : ""]]),
              style: { "width": "80rpx" },
              key: index
            }, [
              createVNode(tmText, {
                "font-size": 24,
                label: item
              }, null, 8, ["label"])
            ], 2);
          }), 128)) : createCommentVNode("v-if", true),
          props.direction != "horizontal" ? (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(unref(_stepArray), (item, index) => {
            return openBlock(), createElementBlock("view", {
              class: "flex flex-row flex-row-center-start",
              style: { "width": "80rpx" },
              key: index
            }, [
              createVNode(tmText, {
                "font-size": 24,
                label: item
              }, null, 8, ["label"])
            ]);
          }), 128)) : createCommentVNode("v-if", true)
        ], 6)
      ], 2112);
    };
  }
});
var sliderLabel = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-slider/slider-label.vue"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "slider-mask",
  props: {
    followTheme: {
      type: [Boolean, String],
      default: true
    },
    direction: {
      type: String,
      default: "horizontal"
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    min: {
      type: Number,
      default: 0
    },
    step: {
      type: Number,
      default: 0
    },
    size: {
      type: Number,
      default: 32
    },
    color: {
      type: String,
      default: "primary"
    }
  },
  setup(__props) {
    const props = __props;
    const _stepArray = computed(() => {
      let label = [];
      if (props.step == 0)
        return [];
      let _step = props.max / props.step;
      for (let i = 1; i <= props.step; i++) {
        label.push(i * _step);
      }
      return [props.min, ...label];
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createCommentVNode(" \u5E95\u90E8\u663E\u793A\u7684\u6807\u7B7E "),
        createElementVNode("view", {
          class: normalizeClass(["flex flex-between absolute", [props.direction == "vertical" ? "flex-col " : "flex-row"]]),
          style: normalizeStyle([
            props.direction == "horizontal" ? { width: __props.width + "rpx", top: (props.size - 12) / 2 - 2 + "rpx" } : { height: __props.height + "rpx", top: "0px", left: (props.size - 12) / 2 + 2 + "rpx" }
          ])
        }, [
          props.direction == "horizontal" ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(unref(_stepArray), (item, index) => {
            return openBlock(), createElementBlock("view", {
              class: normalizeClass(["flex flex-row", [index == 0 ? "flex-row-top-start" : "", index == unref(_stepArray).length - 1 ? "flex-row-top-end" : "", index < unref(_stepArray).length - 1 && index > 0 ? "flex-row-top-center" : ""]]),
              style: { "width": "80rpx" },
              key: index
            }, [
              createVNode(tmSheet, {
                followTheme: props.followTheme,
                color: props.color,
                round: 6,
                margin: [0, 0],
                padding: [0, 0],
                width: 12,
                height: 12,
                text: "",
                border: 1
              }, null, 8, ["followTheme", "color"])
            ], 2);
          }), 128)) : createCommentVNode("v-if", true),
          props.direction != "horizontal" ? (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(unref(_stepArray), (item, index) => {
            return openBlock(), createElementBlock("view", {
              translate: true,
              class: "flex flex-row flex-row-center-start",
              style: { "width": "80rpx" },
              key: index
            }, [
              createVNode(tmSheet, {
                followTheme: props.followTheme,
                round: 6,
                margin: [0, 0],
                padding: [0, 0],
                width: 12,
                height: 12,
                color: "primary",
                text: "",
                border: 1
              }, null, 8, ["followTheme"])
            ]);
          }), 128)) : createCommentVNode("v-if", true)
        ], 6)
      ], 2112);
    };
  }
});
var sliderMask = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-slider/slider-mask.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tm-slider",
  props: {
    followTheme: {
      type: [Boolean, String],
      default: true
    },
    width: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 8
    },
    buttonSize: {
      type: Number,
      default: 46
    },
    direction: {
      type: String,
      default: "horizontal"
    },
    color: {
      type: String,
      default: "primary"
    },
    bgColor: {
      type: String,
      default: "grey-3"
    },
    max: {
      type: Number,
      default: 100
    },
    min: {
      type: Number,
      default: 0
    },
    defaultValue: {
      type: [Array, Number],
      default: 0
    },
    modelValue: {
      type: [Array, Number],
      default: 0
    },
    formart: {
      type: Function,
      default: () => {
        return (val) => {
          return val;
        };
      }
    },
    showLabel: {
      type: Boolean,
      default: false
    },
    step: {
      type: Number,
      default: 5
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue", "change"],
  setup(__props, { emit: emits }) {
    var _a, _b, _c;
    const props = __props;
    const dom = requireNativePlugin("dom");
    const btn0 = ref(null);
    const btn1 = ref(null);
    const proxy = (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const width = computed(() => uni.upx2px(props.width));
    const isDarg = ref(false);
    const _disabled = computed(() => props.disabled);
    const btnPos = ref([
      {
        x: 0,
        y: 0
      },
      {
        x: 0,
        y: 0
      }
    ]);
    let _x = 0;
    let buttonStaticsLeft = 0;
    let buttonStaticsMaxLeft = width.value;
    const isNvue = ref(false);
    const nvueDetailPos = ref({ left: 0, bottom: 0 });
    isNvue.value = true;
    const _sliderBarCssWidth = computed(() => {
      if (props.direction == "horizontal")
        return props.width + props.buttonSize;
      return props.buttonSize;
    });
    const _sliderBarCssHeight = computed(() => {
      if (props.direction == "horizontal")
        return props.buttonSize;
      return props.width + props.buttonSize;
    });
    const BtnIndex = ref(0);
    const showDetail = ref(false);
    const _valueMax = computed(() => {
      return props.max - props.min;
    });
    const _barWidth = computed(() => {
      return Math.abs(btnPos.value[0].x - btnPos.value[1].x);
    });
    const _barLet = computed(() => {
      return Math.min(Math.abs(btnPos.value[0].x), Math.abs(btnPos.value[1].x));
    });
    const _value = ref(0);
    const isDablue = ref(false);
    if (typeof props.defaultValue == "object" && Array.isArray(props.defaultValue)) {
      isDablue.value = true;
    }
    zhuanghuaValue();
    watchEffect(() => {
      let val = Math.ceil(Math.abs(btnPos.value[BtnIndex.value].x) / uni.upx2px(props.width) * _valueMax.value + props.min);
      if (typeof props.formart === "function") {
        let p = props.formart(val);
        if (typeof p === "function") {
          p = p(val);
        }
        val = p;
      }
      _value.value = val;
    });
    emits("update:modelValue", getValue());
    watch(() => props.modelValue, () => {
      if (!isDablue.value) {
        btnPos.value[0].x = Math.abs(Number(props.modelValue) / _valueMax.value * uni.upx2px(props.width));
      } else {
        btnPos.value[0].x = Math.abs(Number(props.modelValue[0]) / _valueMax.value * uni.upx2px(props.width));
        btnPos.value[1].x = Math.abs(Number(props.modelValue[1]) / _valueMax.value * uni.upx2px(props.width));
      }
    });
    function zhuanghuaValue() {
      if (!isDablue.value) {
        let vsp = Number(props.defaultValue);
        vsp = vsp >= _valueMax.value ? _valueMax.value : vsp;
        vsp = vsp <= props.min ? props.min : vsp;
        let vl = Math.abs(vsp / _valueMax.value * uni.upx2px(props.width));
        btnPos.value[0].x = vl;
      } else {
        let vsp_0 = Number(props.defaultValue[0]);
        vsp_0 = vsp_0 >= _valueMax.value ? _valueMax.value : vsp_0;
        vsp_0 = vsp_0 <= props.min ? props.min : vsp_0;
        let vl_0 = Math.abs(vsp_0 / _valueMax.value * uni.upx2px(props.width));
        btnPos.value[0].x = vl_0;
        let vsp_1 = Number(props.defaultValue[1]);
        vsp_1 = vsp_1 >= _valueMax.value ? _valueMax.value : vsp_1;
        vsp_1 = vsp_1 <= props.min ? props.min : vsp_1;
        let vl_1 = Math.abs(vsp_1 / _valueMax.value * uni.upx2px(props.width));
        btnPos.value[1].x = vl_1;
      }
    }
    function getValue() {
      if (!isDablue.value) {
        return Math.ceil(Math.abs(btnPos.value[0].x) / uni.upx2px(props.width) * _valueMax.value + props.min);
      } else {
        return [
          Math.ceil(Math.abs(btnPos.value[0].x) / uni.upx2px(props.width) * _valueMax.value + props.min),
          Math.ceil(Math.abs(btnPos.value[1].x) / uni.upx2px(props.width) * _valueMax.value + props.min)
        ];
      }
    }
    function butnMoveStart(e, index) {
      if (props.disabled)
        return;
      isDarg.value = true;
      if (props.direction == "horizontal") {
        _x = e.x - btnPos.value[index].x;
      } else {
        _x = e.y - btnPos.value[index].x;
      }
      BtnIndex.value = index;
    }
    function butnMove(e, index) {
      if (props.disabled)
        return;
      if (!isDarg.value)
        return;
      let left = e.x - _x;
      if (props.direction != "horizontal") {
        left = e.y - _x;
      }
      if (left < buttonStaticsLeft) {
        left = buttonStaticsLeft;
      } else if (left > buttonStaticsMaxLeft) {
        left = buttonStaticsMaxLeft;
      }
      btnPos.value[index].x = left;
      showDetail.value = true;
      getDomRectBound();
    }
    function butnMoveEnd(e, index) {
      if (props.disabled)
        return;
      isDarg.value = false;
      showDetail.value = false;
      emits("update:modelValue", getValue());
      emits("change", getValue());
      pushFormItem();
    }
    function getDomRectBound() {
      dom.getComponentRect(proxy == null ? void 0 : proxy.$refs["btn" + BtnIndex.value], function(res) {
        if (res == null ? void 0 : res.size) {
          const { left, top } = res.size;
          nvueDetailPos.value = {
            left: left - (uni.upx2px(100) - uni.upx2px(props.buttonSize)) / 2,
            bottom: top - 45
          };
        }
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
              if (Array.isArray(val)) {
                return val.reduce((a, b) => Number(a) + Number(b)) == 0;
              } else {
                return Number(val) == 0;
              }
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
      let _valueSlider = getValue();
      let rules_fun = rules_filter.map((el) => {
        return new Promise(async (res, rej) => {
          if (typeof el.validator === "function") {
            let vr = await el.validator(_valueSlider);
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
          let _valueSlider = getValue();
          validate(toRaw(rulesObj.value)).then((ev) => {
            parentFormItem.pushCom({
              value: _valueSlider,
              isRequiredError: false,
              componentsName: "tm-rate",
              message: ev.length == 0 ? "" : ev[0].message
            });
          }).catch((er) => {
            parentFormItem.pushCom({
              value: _valueSlider,
              isRequiredError: true,
              componentsName: "tm-slider",
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
        if (isDablue.value) {
          emits("update:modelValue", [0, 0]);
          btnPos.value[0].x = 0;
          btnPos.value[1].x = 0;
        } else {
          emits("update:modelValue", 0);
          btnPos.value[0].x = 0;
        }
        pushFormItem(false);
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        class: normalizeClass(["flex", [props.direction == "vertical" ? "flex-row" : "", unref(_disabled) ? "opacity-6" : ""]]),
        renderWhole: true
      }, [
        createElementVNode("view", {
          class: normalizeClass(["relative flex flex-col", [props.direction == "horizontal" ? "flex-col-center-start" : "flex-row-center-center"]]),
          style: normalizeStyle([
            { width: unref(_sliderBarCssWidth) + "rpx", height: unref(_sliderBarCssHeight) + "rpx" }
          ])
        }, [
          createVNode(tmSheet, {
            noLevel: "",
            round: 10,
            color: props.bgColor,
            height: props.direction == "horizontal" ? props.height : unref(_sliderBarCssHeight),
            width: props.direction == "horizontal" ? unref(_sliderBarCssWidth) : props.height,
            margin: [0, 0],
            padding: [0, 0]
          }, null, 8, ["color", "height", "width"]),
          createVNode(sliderBar, {
            followTheme: props.followTheme,
            class: normalizeClass([props.direction == "horizontal" ? "flex-col-center-start" : "flex-row-center-center"]),
            direction: props.direction,
            color: props.color,
            size: props.height,
            x: unref(_barLet),
            width: unref(_barWidth)
          }, null, 8, ["followTheme", "class", "direction", "color", "size", "x", "width"]),
          props.showLabel ? (openBlock(), createBlock(sliderMask, {
            key: 0,
            followTheme: props.followTheme,
            color: props.color,
            size: props.buttonSize,
            step: props.step,
            min: props.min,
            max: props.max,
            width: unref(_sliderBarCssWidth),
            height: unref(_sliderBarCssHeight),
            direction: props.direction
          }, null, 8, ["followTheme", "color", "size", "step", "min", "max", "width", "height", "direction"])) : createCommentVNode("v-if", true),
          createVNode(sliderButton, {
            maxLeft: unref(buttonStaticsMaxLeft),
            followTheme: props.followTheme,
            direction: props.direction,
            ref_key: "btn0",
            ref: btn0,
            color: props.color,
            x: btnPos.value[0].x,
            onMovestart: _cache[0] || (_cache[0] = ($event) => butnMoveStart($event, 0)),
            onMoveing: _cache[1] || (_cache[1] = ($event) => butnMove($event, 0)),
            onMoveend: _cache[2] || (_cache[2] = ($event) => butnMoveEnd()),
            size: props.buttonSize
          }, null, 8, ["maxLeft", "followTheme", "direction", "color", "x", "size"]),
          isDablue.value ? (openBlock(), createBlock(sliderButton, {
            key: 1,
            maxLeft: unref(buttonStaticsMaxLeft),
            followTheme: props.followTheme,
            direction: props.direction,
            ref_key: "btn1",
            ref: btn1,
            color: props.color,
            x: btnPos.value[1].x,
            onMovestart: _cache[3] || (_cache[3] = ($event) => butnMoveStart($event, 1)),
            onMoveing: _cache[4] || (_cache[4] = ($event) => butnMove($event, 1)),
            onMoveend: _cache[5] || (_cache[5] = ($event) => butnMoveEnd()),
            size: props.buttonSize
          }, null, 8, ["maxLeft", "followTheme", "direction", "color", "x", "size"])) : createCommentVNode("v-if", true)
        ], 6),
        props.showLabel ? (openBlock(), createElementBlock("view", {
          key: 0,
          class: normalizeClass([props.direction == "vertical" ? "flex-col" : "flex-row"])
        }, [
          createVNode(sliderLabel, {
            size: props.buttonSize,
            step: props.step,
            min: props.min,
            max: props.max,
            width: unref(_sliderBarCssWidth),
            height: unref(_sliderBarCssHeight),
            direction: props.direction
          }, null, 8, ["size", "step", "min", "max", "width", "height", "direction"])
        ], 2)) : createCommentVNode("v-if", true),
        showDetail.value ? (openBlock(), createElementBlock("view", {
          key: 1,
          class: normalizeClass(["flex absolute", [props.direction == "horizontal" ? "flex-col flex-col-start-center" : " flex-row "]]),
          style: normalizeStyle([
            props.direction == "horizontal" ? { width: props.width + props.buttonSize + "rpx" } : { height: props.width + props.buttonSize + "rpx" }
          ])
        }, [
          createElementVNode("view", {
            class: normalizeClass([[
              isNvue.value ? "fixed" : "absolute ",
              props.direction == "horizontal" ? isNvue.value ? "t-0" : "b-0" : "t-0 "
            ], "mb-0 flex flex-col flex-col-bottom-center"]),
            style: normalizeStyle([
              !isNvue.value ? props.direction == "horizontal" ? { transform: `translateX(${btnPos.value[BtnIndex.value].x}px)`, left: -(100 - props.buttonSize + 24) / 2 + "rpx" } : { transform: `translateY(${btnPos.value[BtnIndex.value].x}px)`, top: "-70rpx", left: -(100 - props.buttonSize + 24) / 2 + "rpx" } : { left: `${nvueDetailPos.value.left}px`, top: `${nvueDetailPos.value.bottom}px` }
            ])
          }, [
            createVNode(tmSheet, {
              _class: "flex-center",
              color: "grey-darken-5",
              border: 2,
              margin: [0, 0],
              padding: [10, 6],
              width: 100,
              round: 3
            }, {
              default: withCtx(() => [
                createVNode(tmText, { label: _value.value }, null, 8, ["label"])
              ]),
              _: 1
            }),
            createVNode(tmIcon, {
              color: "grey-darken-5",
              _class: "t--10",
              "font-size": 32,
              name: "tmicon-sort-down"
            })
          ], 6)
        ], 6)) : createCommentVNode("v-if", true)
      ], 2);
    };
  }
});
var tmSlider = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-slider/tm-slider.vue"]]);
export { tmSlider as t };
