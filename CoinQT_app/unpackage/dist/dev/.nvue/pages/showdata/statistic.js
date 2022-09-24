import { defineComponent, ref, watch, onMounted, onBeforeUnmount, openBlock, createElementBlock, renderSlot, createVNode, unref, withCtx, createElementVNode } from "vue";
import { _ as _export_sfc, a as tmText, t as tmApp } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmDivider } from "../../tm-divider.js";
import "pinia";
let lastTime = 0;
let requestAnimationFrame = null;
let cancelAnimationFrame = null;
if (!requestAnimationFrame || !cancelAnimationFrame) {
  requestAnimationFrame = function(callback) {
    const currTime = new Date().getTime();
    const timeToCall = Math.max(0, 16 - (currTime - lastTime));
    const id = setTimeout(() => {
      callback(currTime + timeToCall);
    }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };
  cancelAnimationFrame = function(id) {
    clearTimeout(id);
  };
}
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "tm-statistic",
  props: {
    followTheme: {
      type: [Boolean, String],
      default: true
    },
    fontSize: {
      type: Number,
      default: 30
    },
    color: {
      type: String,
      default: ""
    },
    startVal: {
      type: Number,
      required: false,
      default: 0
    },
    endVal: {
      type: Number,
      required: false,
      default: 2021
    },
    duration: {
      type: Number,
      required: false,
      default: 3e3
    },
    autoplay: {
      type: Boolean,
      required: false,
      default: true
    },
    decimals: {
      type: Number,
      required: false,
      default: 0,
      validator(value) {
        return value >= 0;
      }
    },
    decimal: {
      type: String,
      required: false,
      default: "."
    },
    separator: {
      type: String,
      required: false,
      default: ","
    },
    prefix: {
      type: String,
      required: false,
      default: ""
    },
    suffix: {
      type: String,
      required: false,
      default: ""
    },
    useEasing: {
      type: Boolean,
      required: false,
      default: true
    },
    isFrequent: {
      type: Boolean,
      required: false,
      default: false
    },
    frequentTime: {
      type: Number,
      required: false,
      default: 5e3
    }
  },
  emits: ["mountedCallback", "callback"],
  setup(__props, { expose, emit: emits }) {
    const props = __props;
    let localStartVal = props.startVal;
    let displayValue = ref(formatNumber(props.startVal));
    let printVal = null;
    let localDuration = props.duration;
    let startTime = null;
    let timestamp = null;
    let rAF = null;
    let timer = null;
    const countDown = props.startVal > props.endVal ? true : false;
    watch([() => props.startVal, () => props.endVal], () => {
      start();
    });
    onMounted(() => {
      if (props.autoplay) {
        start();
      }
      if (props.isFrequent && props.frequentTime) {
        timer = setInterval(() => {
          start(randomNum(0, props.endVal));
        }, props.frequentTime);
      }
      emits("mountedCallback");
    });
    onBeforeUnmount(() => clearInterval(timer));
    function easingFn(t = 0, b = 0, c = 0, d = 0) {
      let p = c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b;
      return p;
    }
    function randomNum(a, b) {
      return Math.round(Math.random() * (b - a) + a);
    }
    function start(startVal) {
      localStartVal = startVal || props.startVal;
      startTime = null;
      localDuration = props.duration;
      rAF = requestAnimationFrame(count);
    }
    function pause() {
      cancelAnimationFrame(rAF);
    }
    function reset() {
      startTime = null;
      cancelAnimationFrame(rAF);
      displayValue.val = formatNumber(props.startVal);
    }
    function count(timestamp_e) {
      if (!startTime)
        startTime = timestamp_e;
      timestamp = timestamp_e;
      const progress = timestamp - startTime;
      if (props.useEasing) {
        if (countDown) {
          printVal = localStartVal - easingFn(progress, 0, localStartVal - props.endVal, localDuration) || 0;
        } else {
          printVal = easingFn(progress, localStartVal, props.endVal - localStartVal, localDuration);
        }
      } else {
        if (countDown) {
          printVal = localStartVal - (localStartVal - props.endVal) * (progress / localDuration);
        } else {
          printVal = localStartVal + (props.endVal - localStartVal) * (progress / localDuration);
        }
      }
      if (countDown) {
        printVal = printVal < props.endVal ? props.endVal : printVal;
      } else {
        printVal = printVal > props.endVal ? props.endVal : printVal;
      }
      displayValue.value = formatNumber(printVal);
      if (progress < localDuration) {
        rAF = requestAnimationFrame(count);
      } else {
        emits("callback");
      }
    }
    function isNumber(val) {
      return !isNaN(parseFloat(val));
    }
    function formatNumber(num) {
      num = num.toFixed(props.decimals);
      num += "";
      const x = num.split(".");
      let x1 = x[0];
      const x2 = x.length > 1 ? props.decimal + x[1] : "";
      const rgx = /(\d+)(\d{3})/;
      if (props.separator && !isNumber(props.separator)) {
        while (rgx.test(x1)) {
          x1 = x1.replace(rgx, "$1" + props.separator + "$2");
        }
      }
      return x1 + x2;
    }
    expose({ start, reset, pause });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        class: "flex flex-row flex-row-bottom-center",
        renderWhole: true
      }, [
        renderSlot(_ctx.$slots, "prefix", {}, () => [
          createVNode(tmText, {
            followTheme: props.followTheme,
            color: props.color,
            "font-size": props.fontSize * 0.7,
            label: props.prefix
          }, null, 8, ["followTheme", "color", "font-size", "label"])
        ]),
        renderSlot(_ctx.$slots, "default", {}, () => [
          createVNode(tmText, {
            followTheme: props.followTheme,
            _class: "px-12",
            color: props.color,
            "font-size": props.fontSize,
            label: unref(displayValue)
          }, null, 8, ["followTheme", "color", "font-size", "label"])
        ]),
        renderSlot(_ctx.$slots, "suffix", {}, () => [
          createVNode(tmText, {
            followTheme: props.followTheme,
            color: props.color,
            "font-size": props.fontSize * 0.7,
            label: props.suffix
          }, null, 8, ["followTheme", "color", "font-size", "label"])
        ])
      ]);
    };
  }
});
var tmStatistic = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-statistic/tm-statistic.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "statistic",
  setup(__props) {
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
                createVNode(tmStatistic, {
                  endVal: 2022,
                  fontSize: 62,
                  suffix: "\u5E74",
                  color: "primary"
                })
              ]),
              _: 1
            }),
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: "\u57FA\u7840\u793A\u4F8B,\u66F4\u591A\u89C1\u6587\u6863"
                }),
                createVNode(tmDivider),
                createElementVNode("view", { class: "flex flex-row flex-between" }, [
                  createElementVNode("view", { class: "px-12" }, [
                    createVNode(tmStatistic, {
                      prefix: "\u2191",
                      startVal: 0,
                      decimals: 2,
                      endVal: 86.32,
                      fontSize: 32,
                      suffix: "%",
                      color: "green"
                    }, null, 8, ["endVal"])
                  ]),
                  createElementVNode("view", { class: "px-12" }, [
                    createVNode(tmStatistic, {
                      prefix: "\u2193",
                      startVal: 0,
                      decimals: 2,
                      endVal: 1050.98,
                      fontSize: 32,
                      suffix: "\u5143",
                      color: "red"
                    }, null, 8, ["endVal"])
                  ]),
                  createElementVNode("view", { class: "px-12" }, [
                    createVNode(tmStatistic, {
                      fontSize: 32,
                      suffix: "\u5143",
                      color: "orange"
                    })
                  ])
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
var statistic = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/showdata/statistic.nvue"]]);
export { statistic as default };
