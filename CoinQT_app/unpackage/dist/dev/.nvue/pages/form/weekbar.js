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
import { defineComponent, ref, computed, watch, openBlock, createBlock, withCtx, createElementVNode, createElementBlock, withModifiers, createVNode, createCommentVNode, Fragment, renderList, unref, normalizeClass } from "vue";
import { _ as _export_sfc, c as custom_props, a as tmText, t as tmApp } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmIcon } from "../../tm-icon.js";
import { i as isSameOrBefore, d as dayjs } from "../../index2.js";
import { i as isoWeek } from "../../index3.js";
import "pinia";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "tm-weekbar",
  props: __spreadProps(__spreadValues({}, custom_props), {
    padding: {
      type: Array,
      default: [12, 24]
    },
    margin: {
      type: Array,
      default: [32, 32]
    },
    followTheme: {
      type: [Boolean, String],
      default: true
    },
    transprent: {
      type: Boolean,
      default: false
    },
    round: {
      type: Number,
      default: 3
    },
    shadow: {
      type: Number,
      default: 3
    },
    defaultValue: {
      type: [String, Date, Number],
      default: () => ""
    },
    modelValue: {
      type: [String, Date, Number],
      default: () => ""
    },
    color: {
      type: String,
      default: "white"
    },
    activeColor: {
      type: String,
      default: "primary"
    },
    model: {
      type: String,
      default: "week"
    },
    dayNumber: {
      type: Number,
      default: 4
    },
    showArrow: {
      type: Boolean,
      default: true
    }
  }),
  emits: ["change", "update:modelValue"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const DayJs = dayjs;
    DayJs.extend(isoWeek);
    DayJs.extend(isSameOrBefore);
    const _value = ref(DayJs(props.defaultValue).isValid() ? DayJs(props.defaultValue).format("YYYY-MM-DD") : DayJs().format("YYYY-MM-DD"));
    const nowWeek = ref(getweek_s_e("now", _value.value));
    const nowWeekDayArray = computed(() => getAllDay(nowWeek.value[0], nowWeek.value[1]));
    const weekStr = ref(["\u5468\u4E00", "\u5468\u4E8C", "\u5468\u4E09", "\u5468\u56DB", "\u5468\u4E94", "\u5468\u516D", "\u5468\u65E5"]);
    const weekStrIndex = {
      0: "\u5468\u65E5",
      1: "\u5468\u4E00",
      2: "\u5468\u4E8C",
      3: "\u5468\u4E09",
      4: "\u5468\u56DB",
      5: "\u5468\u4E94",
      6: "\u5468\u516D"
    };
    watch(() => props.modelValue, () => {
      if (DayJs(props.modelValue).isValid()) {
        _value.value = DayJs(props.modelValue).format("YYYY-MM-DD");
        nowWeek.value = getweek_s_e("now", _value.value);
      }
    });
    function changeDate(date) {
      _value.value = date;
      emits("update:modelValue", date);
      emits("change", date);
    }
    function nexWeek() {
      nowWeek.value = getweek_s_e("next");
    }
    function prevWeek() {
      nowWeek.value = getweek_s_e("prev");
    }
    function getweek_s_e(type = "next", daytime = "") {
      let nowTimeDay = DayJs(_value.value);
      if (type == "next") {
        if (props.model == "custom") {
          let s = nowTimeDay.add(1, "day");
          _value.value = s.format("YYYY-MM-DD");
          return [s.format("YYYY-MM-DD"), s.add(props.dayNumber - 1, "day").format("YYYY-MM-DD")];
        } else {
          let date = DayJs(nowWeek.value[1]).add(1, "week");
          return [date.startOf("isoWeek").format("YYYY-MM-DD"), date.format("YYYY-MM-DD")];
        }
      } else if (type == "prev") {
        if (props.model == "custom") {
          let s = nowTimeDay.subtract(1, "day");
          _value.value = s.format("YYYY-MM-DD");
          return [s.format("YYYY-MM-DD"), s.add(props.dayNumber - 1, "day").format("YYYY-MM-DD")];
        } else {
          let date = DayJs(nowWeek.value[0]).subtract(1, "week");
          return [date.format("YYYY-MM-DD"), date.endOf("isoWeek").format("YYYY-MM-DD")];
        }
      } else {
        if (props.model == "custom") {
          if (!DayJs(daytime).isValid()) {
            return [DayJs().subtract(1, "day").format("YYYY-MM-DD"), DayJs().add(props.dayNumber - 2, "day").format("YYYY-MM-DD")];
          } else {
            return [DayJs(daytime).subtract(2, "day").format("YYYY-MM-DD"), DayJs(daytime).add(props.dayNumber - 3, "day").format("YYYY-MM-DD")];
          }
        } else {
          if (!DayJs(daytime).isValid()) {
            return [DayJs().startOf("isoWeek").format("YYYY-MM-DD"), DayJs().endOf("isoWeek").format("YYYY-MM-DD")];
          } else {
            return [DayJs(daytime).startOf("isoWeek").format("YYYY-MM-DD"), DayJs(daytime).endOf("isoWeek").format("YYYY-MM-DD")];
          }
        }
      }
    }
    function getAllDay(start, end) {
      let ar = [];
      let weeksType = [];
      let endD = DayJs(end);
      let startd = DayJs(start);
      while (startd.isSameOrBefore(endD)) {
        ar.push({
          date: startd.format("YYYY-MM-DD"),
          str: startd.format("MM/DD")
        });
        let index = startd.get("day") || 0;
        if (startd.isSame(DayJs(), "date")) {
          weeksType.push("\u4ECA\u5929");
        } else {
          weeksType.push(weekStrIndex[index]);
        }
        startd = startd.add(1, "day");
      }
      weekStr.value = weeksType;
      return ar;
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(tmSheet, {
        "follow-dark": props.followDark,
        "follow-theme": props.followTheme,
        dark: props.dark,
        shadow: props.shadow,
        round: props.round,
        margin: props.margin,
        padding: props.padding,
        color: props.color
      }, {
        default: withCtx(() => [
          createElementVNode("view", { class: "flex flex-row flex-row-center-center" }, [
            __props.showArrow ? (openBlock(), createElementBlock("view", {
              key: 0,
              onClick: withModifiers(prevWeek, ["stop"]),
              class: "opacity-7"
            }, [
              createVNode(tmIcon, {
                "font-size": 28,
                userInteractionEnabled: false,
                name: "tmicon-angle-left"
              })
            ], 8, ["onClick"])) : createCommentVNode("v-if", true),
            createElementVNode("view", {
              class: "flex-1 flex flex-row",
              style: { "width": "0px" }
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(nowWeekDayArray), (item, index) => {
                return openBlock(), createElementBlock("view", {
                  onClick: withModifiers(($event) => changeDate(item.date), ["stop"]),
                  class: normalizeClass([[item.date == _value.value ? "" : "opacity-7"], "flex-1 flex flex-col flex-col-center-center"]),
                  key: index
                }, [
                  createVNode(tmText, {
                    followTheme: false,
                    color: item.date == _value.value ? props.activeColor : "",
                    userInteractionEnabled: false,
                    "font-size": 23,
                    label: weekStr.value[index]
                  }, null, 8, ["color", "label"]),
                  createVNode(tmText, {
                    followTheme: false,
                    color: item.date == _value.value ? props.activeColor : "",
                    userInteractionEnabled: false,
                    "font-size": 23,
                    label: item.str
                  }, null, 8, ["color", "label"])
                ], 10, ["onClick"]);
              }), 128))
            ]),
            __props.showArrow ? (openBlock(), createElementBlock("view", {
              key: 1,
              onClick: withModifiers(nexWeek, ["stop"]),
              class: "opacity-7"
            }, [
              createVNode(tmIcon, {
                "font-size": 28,
                userInteractionEnabled: false,
                name: "tmicon-angle-right"
              })
            ], 8, ["onClick"])) : createCommentVNode("v-if", true)
          ])
        ]),
        _: 1
      }, 8, ["follow-dark", "follow-theme", "dark", "shadow", "round", "margin", "padding", "color"]);
    };
  }
});
var tmWeekbar = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-weekbar/tm-weekbar.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "weekbar",
  setup(__props) {
    ref("");
    ref(false);
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
                })
              ]),
              _: 1
            }),
            createVNode(tmWeekbar),
            createVNode(tmWeekbar, {
              followTheme: false,
              activeColor: "white",
              color: "red"
            }),
            createVNode(tmWeekbar, {
              followTheme: false,
              activeColor: "black",
              color: "yellow",
              linear: "bottom"
            })
          ]),
          _: 1
        })
      ]);
    };
  }
});
var weekbar = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/form/weekbar.nvue"]]);
export { weekbar as default };
