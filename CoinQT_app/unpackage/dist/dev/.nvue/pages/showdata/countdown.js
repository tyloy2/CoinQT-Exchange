import { defineComponent, ref, computed, onMounted, openBlock, createElementBlock, renderSlot, unref, createVNode, withCtx, createElementVNode } from "vue";
import { _ as _export_sfc, a as tmText, t as tmApp } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmDivider } from "../../tm-divider.js";
import { T as TmButton } from "../../tm-button.js";
import "pinia";
import "../../tm-icon.js";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "tm-countdown",
  props: {
    time: {
      type: Number,
      default: 10 * 1e3
    },
    format: {
      type: String,
      default: "DD\u5929HH\u5C0F\u65F6MM\u5206SS\u79D2MS\u6BEB\u79D2"
    },
    autoStart: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: ""
    }
  },
  emits: ["start", "end", "change"],
  setup(__props, { expose, emit: emits }) {
    const props = __props;
    let timid = void 0;
    let now = ref(0);
    let time_data = computed(() => formatTime(props.time - now.value));
    const isfinish = computed(() => now.value == props.time || now.value === 0);
    const text = computed(() => {
      let ps = props.format;
      ps = ps.replace(/(DD)/g, String(time_data.value.day));
      ps = ps.replace(/(MM)/g, String(time_data.value.minutes));
      ps = ps.replace(/(HH)/g, String(time_data.value.hour));
      ps = ps.replace(/(SS)/g, String(time_data.value.seconds));
      ps = ps.replace(/(MS)/g, String(time_data.value.millisecond));
      return ps;
    });
    onMounted(() => {
      formatTime(props.time);
      if (props.autoStart) {
        start();
      }
    });
    function formatTime(my_time) {
      var daysRound = Math.floor(my_time / 1e3 / 60 / 60 / 24);
      var hoursRound = Math.floor(my_time / 1e3 / 60 / 60 % 24);
      var minutesRound = Math.floor(my_time / 1e3 / 60 % 60);
      var secondsRound = Math.floor(my_time / 1e3 % 60);
      var millisecondRound = Math.floor(my_time % 1e3);
      let time = {
        day: daysRound > 9 ? daysRound : "0" + daysRound,
        hour: hoursRound > 9 ? hoursRound : "0" + hoursRound,
        minutes: minutesRound > 9 ? minutesRound : "0" + minutesRound,
        seconds: secondsRound > 9 ? secondsRound : "0" + secondsRound,
        millisecond: millisecondRound > 9 ? millisecondRound : "00" + millisecondRound
      };
      return time;
    }
    function start() {
      clearInterval(timid);
      emits("start");
      timid = setInterval(() => {
        let lst = now.value + 50;
        if (lst > props.time) {
          clearInterval(timid);
          emits("end");
          return;
        }
        now.value = lst;
        emits("change", time_data);
      }, 50);
    }
    function stop() {
      clearInterval(timid);
      now.value = props.time;
      emits("end");
    }
    function pause() {
      clearInterval(timid);
    }
    function resinit() {
      clearInterval(timid);
      now.value = 0;
    }
    expose({ finish: isfinish, start, stop, pause, resinit });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        class: "flex flex-row",
        renderWhole: true
      }, [
        renderSlot(_ctx.$slots, "default", {
          data: { data: unref(time_data), finish: unref(isfinish) }
        }, () => [
          createVNode(tmText, {
            color: props.color,
            label: unref(text)
          }, null, 8, ["color", "label"])
        ])
      ]);
    };
  }
});
var tmCountdown = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-countdown/tm-countdown.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "countdown",
  setup(__props) {
    const cu = ref(null);
    function actions(fun) {
      cu.value[fun]();
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
                  label: "\u57FA\u7840\u793A\u4F8B,\u9ED8\u8BA4\u662F\u7CBE\u786E\u5230\u6BEB\u79D2\u7EA7"
                }),
                createVNode(tmDivider),
                createElementVNode("view", null, [
                  createVNode(tmCountdown, {
                    ref_key: "cu",
                    ref: cu,
                    autoStart: false
                  }, null, 512)
                ]),
                createElementVNode("view", { class: "mt-32 flex flex-row flex-around" }, [
                  createVNode(TmButton, {
                    onClick: _cache[0] || (_cache[0] = ($event) => actions("resinit")),
                    size: "small",
                    label: "\u91CD\u7F6E"
                  }),
                  createVNode(TmButton, {
                    onClick: _cache[1] || (_cache[1] = ($event) => actions("start")),
                    size: "small",
                    width: 140,
                    "font-size": 22,
                    label: "\u5F00\u59CB/\u7EE7\u7EED",
                    color: "green"
                  }),
                  createVNode(TmButton, {
                    onClick: _cache[2] || (_cache[2] = ($event) => actions("pause")),
                    size: "small",
                    label: "\u6682\u505C",
                    color: "orange"
                  }),
                  createVNode(TmButton, {
                    onClick: _cache[3] || (_cache[3] = ($event) => actions("stop")),
                    size: "small",
                    label: "\u7ED3\u675F",
                    color: "red"
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
var countdown = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/showdata/countdown.nvue"]]);
export { countdown as default };
