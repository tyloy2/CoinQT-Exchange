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
import { defineComponent, getCurrentInstance, ref, computed, watch, onMounted, nextTick, openBlock, createElementBlock, normalizeStyle, createElementVNode, createVNode, unref, renderSlot, withCtx, createCommentVNode, normalizeClass, createBlock } from "vue";
import { _ as _export_sfc, c as custom_props, u as useTmpiniaStore, e as computedDark, f as computedTheme, h as tool, a as tmText, t as tmApp } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { e as enable, W as WeexBridge } from "../../index.js";
import { t as tmDivider } from "../../tm-divider.js";
import { T as TmButton } from "../../tm-button.js";
import "pinia";
import "../../tm-icon.js";
var _style_0 = { "tmRogress": { "": { "transitionDuration": 500, "transitionTimingFunction": "ease-in-out", "transitionProperty": "width" } }, "@TRANSITION": { "tmRogress": { "duration": 500, "timingFunction": "ease-in-out", "property": "width" } } };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "tm-progress",
  props: __spreadProps(__spreadValues({}, custom_props), {
    model: {
      type: String,
      default: "line"
    },
    semicircle: {
      type: [Boolean, String],
      default: false
    },
    semicircleFlip: {
      type: [Boolean, String],
      default: false
    },
    fontSize: {
      type: [Number, String],
      default: 28
    },
    percent: {
      type: Number,
      default: 0
    },
    percentSuffix: {
      type: String,
      default: "%"
    },
    width: {
      type: Number,
      default: 120
    },
    height: {
      type: Number,
      default: 6
    },
    bgColor: {
      type: String,
      default: "grey-3"
    },
    color: {
      type: String,
      default: "primary"
    },
    followTheme: {
      type: [Boolean, String],
      default: true
    },
    dark: {
      type: [Boolean],
      default: false
    },
    linear: {
      type: [String],
      default: ""
    },
    linearDeep: {
      type: [String],
      default: "light"
    },
    round: {
      type: [Number, String],
      default: 3
    },
    showBar: {
      type: [Boolean, String],
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }),
  emits: ["update:percent", "change"],
  setup(__props, { emit: emits }) {
    var _a, _b;
    const props = __props;
    const store = useTmpiniaStore();
    const proxy = (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const vnodeCtx = proxy;
    const canvasId = ref("canvasId");
    canvasId.value = "tm" + String(new Date().getTime());
    let ctx;
    const shadow_pr = computed(() => props.shadow * 4);
    const tmcfg = computed(() => store.tmStore);
    const isDark = computed(() => computedDark(props, tmcfg.value));
    const tmcomputed = computed(() => computedTheme(props, isDark.value, tmcfg.value));
    const _bgColor = computed(() => computedTheme(__spreadProps(__spreadValues({}, props), { color: props.bgColor, followTheme: false }), isDark.value, tmcfg.value).backgroundColor);
    tool.getColor(props.color).value;
    tmcomputed.value.backgroundColor;
    const activeWidth = computed(() => {
      let pr = props.percent >= 100 ? 100 : props.percent;
      let w = Math.floor(pr / 100 * props.width);
      w = w >= props.width ? props.width : w;
      return w;
    });
    const percent_rp = computed(() => {
      let pr = props.percent >= 100 ? 100 : props.percent;
      return pr;
    });
    watch(() => props.percent, (val) => {
      if (props.disabled)
        return;
      drawNvue_draw();
      let newval = val >= 100 ? 100 : val;
      newval = newval <= 0 ? 0 : newval;
      emits("update:percent", newval);
      emits("change", newval);
    });
    onMounted(() => {
      nextTick(function() {
        setTimeout(() => drawNvue_init(), 300);
      });
    });
    function drawNvue_init() {
      if (props.model != "circle")
        return;
      var ganvas = vnodeCtx.$refs[canvasId.value];
      var canvasObj = enable(ganvas, {
        bridge: WeexBridge
      });
      ctx = canvasObj.getContext("2d");
      drawNvue_draw();
    }
    function drawNvue_draw() {
      if (props.model != "circle")
        return;
      let width = uni.upx2px(props.width);
      let center = {
        x: width / 2,
        y: width / 2,
        r: width / 2 - uni.upx2px(props.height / 2) - 4 - uni.upx2px(shadow_pr.value) * 2
      };
      if (props.semicircle && props.semicircleFlip) {
        center = {
          x: width / 2,
          y: 6,
          r: width / 2 - uni.upx2px(props.height) / 2 - 4 - uni.upx2px(shadow_pr.value) * 2
        };
      }
      tmcomputed.value;
      let bgColor = _bgColor.value || "#f5f5f5";
      let activeColor = tool.getColor(props.color).csscolor || "#ff0000";
      let strokeWidth = uni.upx2px(props.height);
      ctx.lineWidth = strokeWidth;
      ctx.strokeStyle = bgColor;
      ctx.lineCap = "round";
      ctx.beginPath();
      if (props.semicircle) {
        ctx.arc(center.x, center.y, center.r, -Math.PI, 0, props.semicircleFlip ? true : false);
      } else {
        ctx.arc(center.x, center.y, center.r, 0, 2 * Math.PI, props.semicircleFlip ? true : false);
      }
      ctx.stroke();
      ctx.closePath();
      let blv = Math.PI / 50;
      let jinduo = (percent_rp.value - 25) * blv;
      if (props.semicircle) {
        let base = percent_rp.value / 2;
        let rpp = base >= 50 ? 50 : base;
        jinduo = (rpp - 50) * blv;
        if (props.semicircleFlip) {
          jinduo = -jinduo;
          jinduo = jinduo >= Math.PI ? Math.PI - 1e-5 : jinduo;
          jinduo = jinduo >= Math.PI ? Math.PI - 1e-5 : jinduo;
        }
      }
      ctx.strokeStyle = activeColor;
      ctx.strokeStyle = activeColor;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.shadowBlur = shadow_pr.value;
      ctx.beginPath();
      if (props.semicircle) {
        ctx.arc(center.x, center.y, center.r, -Math.PI, jinduo, props.semicircleFlip);
      } else {
        ctx.arc(center.x, center.y, center.r, -Math.PI / 2, jinduo, props.semicircleFlip);
      }
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
      ctx.draw();
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        class: "flex flex-col",
        renderWhole: true
      }, [
        __props.model == "line" ? (openBlock(), createElementBlock("view", {
          key: 0,
          style: normalizeStyle([{ width: __props.width + "rpx", paddingTop: "16rpx", paddingBottom: "16rpx" }]),
          class: "flex relative flex flex-col overflow"
        }, [
          createElementVNode("view", { class: "relative" }, [
            createVNode(tmSheet, {
              "no-level": "",
              round: props.round,
              followTheme: false,
              dark: props.dark,
              margin: [0, 0],
              width: props.width,
              height: props.height,
              color: props.bgColor,
              padding: [0, 0]
            }, null, 8, ["round", "dark", "width", "height", "color"])
          ]),
          createElementVNode("view", {
            class: "absolute l-0 tmRogress overflow",
            style: normalizeStyle([{ width: unref(activeWidth) + "rpx", top: 16 + "rpx" }])
          }, [
            createVNode(tmSheet, {
              round: props.round,
              followTheme: props.followTheme,
              dark: props.dark,
              margin: [0, 0],
              linear: props.linear,
              linearDeep: props.linearDeep,
              width: unref(activeWidth),
              height: props.height,
              color: props.color,
              padding: [0, 0]
            }, null, 8, ["round", "followTheme", "dark", "linear", "linearDeep", "width", "height", "color"])
          ], 4),
          props.showBar ? (openBlock(), createElementBlock("view", {
            key: 0,
            class: "absolute l-0 t-0 tmRogress flex flex-col",
            style: normalizeStyle([
              { width: unref(activeWidth) + "rpx", height: props.height + 32 + "rpx", "align-items": "flex-end", "justify-content": "center" }
            ])
          }, [
            renderSlot(_ctx.$slots, "default", {}, () => [
              createVNode(tmSheet, {
                linear: props.linear,
                linearDeep: props.linearDeep,
                followTheme: props.followTheme,
                dark: props.dark,
                color: props.color,
                margin: [0, 0],
                padding: [12, 4],
                round: 4
              }, {
                default: withCtx(() => [
                  createVNode(tmText, {
                    _class: "text-size-xxs",
                    fontSize: 22,
                    label: props.percent + props.percentSuffix
                  }, null, 8, ["label"])
                ]),
                _: 1
              }, 8, ["linear", "linearDeep", "followTheme", "dark", "color"])
            ])
          ], 4)) : createCommentVNode("v-if", true)
        ], 4)) : createCommentVNode("v-if", true),
        __props.model == "circle" ? (openBlock(), createElementBlock("view", {
          key: 1,
          style: normalizeStyle({ width: `${props.width}rpx`, height: `${props.semicircle ? props.width / 2 + 16 : props.width}rpx` }),
          class: "flex relative flex-col"
        }, [
          createElementVNode("gcanvas", {
            id: canvasId.value,
            ref: canvasId.value,
            class: "canvas",
            style: normalizeStyle({ width: `${props.width}rpx`, height: `${props.semicircle ? props.width / 2 + 16 : props.width}rpx` })
          }, null, 12, ["id"]),
          createElementVNode("cover-view", {
            style: normalizeStyle([
              { width: `${props.width}rpx`, height: `${props.semicircle ? props.width / 2 + 16 : props.width}rpx` },
              props.semicircle && props.semicircleFlip ? { "justify-content": "flex-start", "align-items": "center" } : "",
              props.semicircle && !props.semicircleFlip ? { "justify-content": "flex-end", "align-items": "center" } : ""
            ]),
            class: normalizeClass(["relative absolute l-0 t-0 flex flex-col", [!props.semicircle ? "flex-center" : ""]])
          }, [
            renderSlot(_ctx.$slots, "title", {}, () => [
              props.showBar ? (openBlock(), createBlock(tmText, {
                key: 0,
                color: props.color,
                followTheme: props.followTheme,
                dark: props.dark,
                fontSize: props.fontSize,
                label: props.percent + props.percentSuffix
              }, null, 8, ["color", "followTheme", "dark", "fontSize", "label"])) : createCommentVNode("v-if", true)
            ])
          ], 6)
        ], 4)) : createCommentVNode("v-if", true)
      ]);
    };
  }
});
var tmProgress = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["styles", [_style_0]], ["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-progress/tm-progress.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "progress",
  setup(__props) {
    getCurrentInstance();
    const percent = ref(50);
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
                createVNode(tmProgress, {
                  width: 636,
                  percent: percent.value,
                  "onUpdate:percent": _cache[0] || (_cache[0] = ($event) => percent.value = $event)
                }, null, 8, ["percent"]),
                createElementVNode("view", { class: "py-12" }),
                createVNode(tmProgress, {
                  linear: "right",
                  width: 636,
                  color: "red",
                  percent: percent.value,
                  "onUpdate:percent": _cache[1] || (_cache[1] = ($event) => percent.value = $event)
                }, null, 8, ["percent"]),
                createElementVNode("view", { class: "py-12" }),
                createVNode(tmProgress, {
                  linear: "right",
                  showBar: "",
                  width: 636,
                  color: "orange",
                  percent: percent.value,
                  "onUpdate:percent": _cache[2] || (_cache[2] = ($event) => percent.value = $event)
                }, null, 8, ["percent"])
              ]),
              _: 1
            }),
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createVNode(tmText, {
                  fontSize: 24,
                  _class: "font-weight-b",
                  label: "\u5706\u5F62"
                }),
                createVNode(tmDivider),
                createElementVNode("view", { class: "flex flex-row" }, [
                  createVNode(tmProgress, {
                    model: "circle",
                    bgColor: "grey",
                    height: 24,
                    width: 200,
                    percent: percent.value,
                    "onUpdate:percent": _cache[3] || (_cache[3] = ($event) => percent.value = $event)
                  }, null, 8, ["percent"]),
                  createElementVNode("view", { class: "py-12" }),
                  createVNode(tmProgress, {
                    model: "circle",
                    linear: "right",
                    height: 24,
                    color: "red",
                    width: 200,
                    percent: percent.value,
                    "onUpdate:percent": _cache[4] || (_cache[4] = ($event) => percent.value = $event)
                  }, null, 8, ["percent"]),
                  createElementVNode("view", { class: "py-12" })
                ])
              ]),
              _: 1
            }),
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createVNode(tmText, {
                  fontSize: 24,
                  _class: "font-weight-b",
                  label: "\u534A\u5706\u5F62\uFF0C\u4EE5\u53CA\u955C\u50CF"
                }),
                createVNode(tmDivider),
                createElementVNode("view", { class: "flex flex-row" }, [
                  createVNode(tmProgress, {
                    model: "circle",
                    color: "yellow",
                    semicircle: "",
                    height: 24,
                    width: 200,
                    percent: percent.value,
                    "onUpdate:percent": _cache[5] || (_cache[5] = ($event) => percent.value = $event)
                  }, null, 8, ["percent"]),
                  createElementVNode("view", { class: "py-12" }),
                  createVNode(tmProgress, {
                    model: "circle",
                    semicircle: "",
                    semicircleFlip: "",
                    height: 24,
                    color: "orange",
                    width: 200,
                    percent: percent.value,
                    "onUpdate:percent": _cache[6] || (_cache[6] = ($event) => percent.value = $event)
                  }, null, 8, ["percent"]),
                  createElementVNode("view", { class: "py-12" })
                ])
              ]),
              _: 1
            }),
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createVNode(tmText, {
                  fontSize: 24,
                  _class: "font-weight-b",
                  label: "\u8FDB\u5EA6\u64CD\u4F5C"
                }),
                createVNode(tmDivider),
                createElementVNode("view", { class: "flex flex-row" }, [
                  createVNode(TmButton, {
                    onClick: _cache[7] || (_cache[7] = ($event) => percent.value = percent.value >= 100 ? 0 : percent.value + 10),
                    label: "\u589E\u52A0"
                  }),
                  createElementVNode("view", { class: "px-12" }),
                  createVNode(TmButton, {
                    color: "red",
                    onClick: _cache[8] || (_cache[8] = ($event) => percent.value = percent.value <= 0 ? 0 : percent.value - 10),
                    label: "\u51CF\u5C11"
                  })
                ])
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
var progress = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/fankui/progress.nvue"]]);
export { progress as default };
