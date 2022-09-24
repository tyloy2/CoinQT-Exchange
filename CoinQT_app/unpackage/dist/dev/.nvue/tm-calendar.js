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
import { defineComponent, computed, ref, watch, openBlock, createElementBlock, createBlock, withCtx, createElementVNode, withModifiers, createVNode, unref, createCommentVNode, normalizeStyle, Fragment, renderList, normalizeClass, toRaw, getCurrentInstance, nextTick, inject, watchEffect, onMounted } from "vue";
import { _ as _export_sfc, u as useTmpiniaStore, a as tmText, g as formatAppLog, c as custom_props } from "./tm-text.js";
import { t as tmSheet } from "./tm-sheet.js";
import { t as tmIcon } from "./tm-icon.js";
import { T as TmButton } from "./tm-button.js";
import { i as isSameOrBefore, d as dayjs } from "./index2.js";
import { i as isoWeek } from "./index3.js";
import { i as isSameOrAfter, a as isBetween } from "./index4.js";
import { t as tmDrawer } from "./tm-drawer.js";
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "week-day",
  props: {
    followTheme: {
      type: Boolean,
      default: true
    },
    defaultValue: {
      type: Array,
      default: () => []
    },
    modelValue: {
      type: Array,
      default: () => []
    },
    color: {
      type: String,
      default: "primary"
    },
    linear: {
      type: String,
      default: ""
    },
    linearDeep: {
      type: String,
      default: "light"
    },
    start: {
      type: [String, Number, Date],
      default: ""
    },
    end: {
      type: [String, Number, Date],
      default: ""
    },
    hideTool: {
      type: Boolean,
      default: false
    },
    hideButton: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue", "confirm", "click-week", "change"],
  setup(__props, { expose, emit: emits }) {
    const props = __props;
    const store = useTmpiniaStore();
    const _color = computed(() => {
      if (props.followTheme && store.tmStore.color)
        return store.tmStore.color;
      return props.color;
    });
    const DayJs = dayjs;
    DayJs.extend(isoWeek);
    DayJs.extend(isSameOrBefore);
    DayJs.extend(isSameOrAfter);
    DayJs.extend(isBetween);
    const _value = ref(DayJs(props.defaultValue[0]).isValid() ? DayJs(props.defaultValue[0]) : DayJs());
    const _weekNum = ref(getNowWeek(_value.value));
    const weekStr = ["\u5468\u6B21", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u65E5"];
    const _data = ref([]);
    const _dataWeek = ref([]);
    const _start_date = computed(() => {
      let isv = DayJs(props.start).isValid();
      return isv ? DayJs(props.start) : DayJs("1980-1-1");
    });
    const _end_date = computed(() => {
      let isv = DayJs(props.end).isValid();
      return isv ? DayJs(props.end) : DayJs("2450-1-1");
    });
    const _nowDate = computed(() => {
      return _value.value.format("YYYY-MM");
    });
    _data.value = getWeekOfMonthArray();
    watch(() => props.modelValue, () => {
      var _a;
      if (!Array.isArray(props.modelValue))
        return;
      let date_str = (_a = props.modelValue[0]) != null ? _a : "";
      _value.value = DayJs(date_str).isValid() ? DayJs(date_str) : DayJs();
      _weekNum.value = getNowWeek(_value.value);
      _data.value = getWeekOfMonthArray();
    }, { deep: true });
    function getNowWeek(str = "") {
      if (DayJs(str).isValid()) {
        return DayJs(str).isoWeek();
      } else {
        return DayJs().isoWeek();
      }
    }
    function nowWeekClick() {
      _value.value = DayJs();
      _data.value = getWeekOfMonthArray();
      let wk = getNowWeek(_value.value);
      if (!canSelected(wk)) {
        uni.showToast({ title: "\u65E0\u6CD5\u9009\u4E2D", icon: "none" });
        return;
      }
      _weekNum.value = wk;
      updateTimes();
    }
    function clickWeek(wk) {
      if (!canSelected(wk)) {
        uni.showToast({ title: "\u65E0\u6CD5\u9009\u4E2D", icon: "none" });
        return;
      }
      _weekNum.value = wk;
      updateTimes();
    }
    function canSelected(num) {
      let index = _dataWeek.value.findIndex((el) => el == num);
      let item = _data.value[index];
      let ar = item.filter((el) => !el.isVaild);
      return ar.length > 0;
    }
    function nextYear() {
      _value.value = _value.value.add(1, "year");
      _data.value = getWeekOfMonthArray();
      emits("change", _value.value.format("YYYY/MM/DD"));
    }
    function nextMonth() {
      _value.value = _value.value.add(1, "month");
      _data.value = getWeekOfMonthArray();
      emits("change", _value.value.format("YYYY/MM/DD"));
    }
    function prevMonth() {
      _value.value = _value.value.subtract(1, "month");
      _data.value = getWeekOfMonthArray();
      emits("change", _value.value.format("YYYY/MM/DD"));
    }
    function prevYear() {
      _value.value = _value.value.subtract(1, "year");
      _data.value = getWeekOfMonthArray();
      emits("change", _value.value.format("YYYY/MM/DD"));
    }
    function setDefault(data = []) {
      let date_str = data[0];
      _value.value = DayJs(date_str).isValid() ? DayJs(date_str) : DayJs();
      _weekNum.value = getNowWeek(_value.value);
      _data.value = getWeekOfMonthArray();
    }
    function getWeekOfMonthArray() {
      let nowMonth = DayJs(_value.value);
      let startStatickDay = nowMonth.startOf("month").format("YYYY/MM/DD");
      let endStatickDay = nowMonth.endOf("month").format("YYYY/MM/DD");
      let startd = DayJs(startStatickDay);
      let arOfmonth = [];
      let ar = [];
      while (startd.isSameOrBefore(endStatickDay)) {
        ar.push({
          dateStr: startd.format("YYYY/MM/DD"),
          date: startd.date() < 10 ? "0" + startd.date() : startd.date(),
          week: startd.isoWeek(),
          day: startd.isoWeekday(),
          isNowIn: isInNowMonth(nowMonth, startd),
          isVaild: !startd.isBetween(_start_date.value, _end_date.value, "day", "[]")
        });
        arOfmonth.push(startd.isoWeek());
        startd = startd.add(1, "day");
      }
      arOfmonth = [...new Set(arOfmonth)];
      _dataWeek.value = arOfmonth;
      let dArray = [];
      let index = 0;
      dArray.push([]);
      ar.forEach((el) => {
        if (el.week == arOfmonth[index]) {
          dArray[index].push(el);
        } else {
          index += 1;
          dArray.push([]);
          dArray[index].push(el);
        }
      });
      if (dArray[0].length !== 7) {
        let item = dArray[0][dArray[0].length - 1];
        let start_of = DayJs(item.dateStr).isoWeek(item.week).subtract(6, "day");
        let end_of = DayJs(item.dateStr).isoWeek(item.week);
        let pr = [];
        let startd2 = DayJs(start_of);
        while (startd2.isSameOrBefore(end_of)) {
          pr.push({
            dateStr: startd2.format("YYYY/MM/DD"),
            date: startd2.date() < 10 ? "0" + startd2.date() : startd2.date(),
            week: startd2.isoWeek(),
            day: startd2.isoWeekday(),
            isNowIn: isInNowMonth(nowMonth, startd2),
            isVaild: !startd2.isBetween(_start_date.value, _end_date.value, "day", "[]")
          });
          startd2 = startd2.add(1, "day");
        }
        dArray[0] = pr;
      }
      if (dArray[dArray.length - 1].length !== 7) {
        let item = dArray[dArray.length - 1][0];
        let start_of = DayJs(item.dateStr).isoWeek(item.week);
        let end_of = DayJs(item.dateStr).isoWeek(item.week).add(6, "day");
        let pr = [];
        let startd2 = DayJs(start_of);
        while (startd2.isSameOrBefore(end_of)) {
          pr.push({
            dateStr: startd2.format("YYYY/MM/DD"),
            date: startd2.date() < 10 ? "0" + startd2.date() : startd2.date(),
            week: startd2.isoWeek(),
            day: startd2.isoWeekday(),
            isNowIn: isInNowMonth(nowMonth, startd2),
            isVaild: !startd2.isBetween(_start_date.value, _end_date.value, "day", "[]")
          });
          startd2 = startd2.add(1, "day");
        }
        dArray[dArray.length - 1] = pr;
      }
      return dArray;
    }
    function isInNowMonth(date = "", now = "") {
      let startStatickDay = DayJs(date).startOf("month").format("YYYY/MM/DD");
      let endStatickDay = DayJs(date).endOf("month").format("YYYY/MM/DD");
      return DayJs(now).isBetween(startStatickDay, endStatickDay, "day", "[]");
    }
    function updateTimes() {
      let index = _dataWeek.value.findIndex((el) => el == _weekNum.value);
      let item = _data.value[index];
      let start = item[0].dateStr;
      let end = item[item.length - 1].dateStr;
      emits("click-week", [start, end]);
    }
    function confirm() {
      let index = _dataWeek.value.findIndex((el) => el == _weekNum.value);
      let item = [..._data.value[index]];
      let start = item[0].dateStr;
      for (let i = 0; i < item.length; i++) {
        if (DayJs(item[i].dateStr).isSameOrAfter(props.start, "date")) {
          start = item[i].dateStr;
          break;
        }
      }
      let end = item[item.length - 1].dateStr;
      item = item.reverse();
      formatAppLog("log", "at tmui/components/tm-calendar-view/week-day.vue:345", item);
      for (let i = 0; i < item.length; i++) {
        if (DayJs(item[i].dateStr).isSameOrBefore(props.end, "date")) {
          end = item[i].dateStr;
          break;
        }
      }
      emits("update:modelValue", [start, end]);
      emits("confirm", [start, end]);
    }
    expose({
      setDefault,
      nextYear,
      nextMonth,
      prevYear,
      prevMonth
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        class: "flex flex-col relative",
        renderWhole: true
      }, [
        !props.hideTool ? (openBlock(), createBlock(tmSheet, {
          key: 0,
          shadow: 0,
          margin: [0, 0],
          padding: [0, 24],
          _class: "flex flex-row flex-row-center-center"
        }, {
          default: withCtx(() => [
            createElementVNode("view", {
              onClick: withModifiers(prevYear, ["stop"]),
              class: "px-32"
            }, [
              createVNode(tmIcon, {
                userInteractionEnabled: false,
                "font-size": 24,
                name: "tmicon-angle-double-left"
              })
            ], 8, ["onClick"]),
            createElementVNode("view", {
              onClick: withModifiers(prevMonth, ["stop"]),
              class: "px-32"
            }, [
              createVNode(tmIcon, {
                userInteractionEnabled: false,
                "font-size": 24,
                name: "tmicon-angle-left"
              })
            ], 8, ["onClick"]),
            createElementVNode("view", { class: "px-12" }, [
              createVNode(tmText, {
                userInteractionEnabled: false,
                "font-size": 28,
                label: unref(_nowDate)
              }, null, 8, ["label"])
            ]),
            createElementVNode("view", {
              onClick: withModifiers(nextMonth, ["stop"]),
              class: "px-32"
            }, [
              createVNode(tmIcon, {
                userInteractionEnabled: false,
                "font-size": 24,
                name: "tmicon-angle-right"
              })
            ], 8, ["onClick"]),
            createElementVNode("view", {
              onClick: withModifiers(nextYear, ["stop"]),
              class: "px-32"
            }, [
              createVNode(tmIcon, {
                userInteractionEnabled: false,
                "font-size": 24,
                name: "tmicon-angle-double-right"
              })
            ], 8, ["onClick"]),
            createElementVNode("view", {
              onClick: nowWeekClick,
              class: "absolute t-0 r-16 zIndex-10",
              style: { "width": "64rpx" }
            }, [
              createVNode(tmText, {
                userInteractionEnabled: false,
                "font-size": 28,
                label: "\u672C\u5468"
              })
            ])
          ]),
          _: 1
        })) : createCommentVNode("v-if", true),
        createElementVNode("view", {
          class: "flex flex-row flex-row-center-center py-12",
          style: normalizeStyle([{ height: "74rpx" }])
        }, [
          (openBlock(), createElementBlock(Fragment, null, renderList(weekStr, (item, index) => {
            return createElementVNode("view", {
              class: "flex-1 flex-center",
              key: index
            }, [
              createElementVNode("view", {
                style: { "width": "62rpx" },
                class: "flex-center flex-col"
              }, [
                createVNode(tmText, {
                  "font-size": 24,
                  label: item
                }, null, 8, ["label"])
              ])
            ]);
          }), 64))
        ]),
        createElementVNode("view", { class: "flex flex-col" }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_dataWeek.value, (item, index) => {
            return openBlock(), createElementBlock("view", {
              class: "flex flex-row flex-row-center-center",
              style: normalizeStyle([{ height: "74rpx" }]),
              key: index
            }, [
              createElementVNode("view", {
                class: normalizeClass([["opacity-5"], "flex-1 flex-center"])
              }, [
                createElementVNode("view", {
                  style: { "width": "62rpx" },
                  class: "flex-center flex-col"
                }, [
                  createVNode(tmText, {
                    "font-size": 24,
                    label: item
                  }, null, 8, ["label"])
                ])
              ]),
              createVNode(tmSheet, {
                "no-level": "",
                onClick: ($event) => clickWeek(item),
                height: 66,
                shadow: 0,
                round: 10,
                _class: "flex-row",
                class: "flex-6",
                "paren-class": "flex-6",
                text: _weekNum.value == item,
                color: _weekNum.value == item ? unref(_color) : "grey-4",
                margin: [0, 4],
                padding: [0, 0]
              }, {
                default: withCtx(() => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(_data.value[index], (item2, index2) => {
                    return openBlock(), createElementBlock("view", {
                      userInteractionEnabled: false,
                      style: { "width": "62rpx" },
                      class: normalizeClass([[item2.isNowIn ? "" : "opacity-5"], "flex-1 flex-center"]),
                      key: index2
                    }, [
                      createElementVNode("view", {
                        style: normalizeStyle([{ "width": "62rpx" }, [{ opacity: item2.isVaild ? "0.3" : "1" }]]),
                        class: "flex-center flex-col"
                      }, [
                        createVNode(tmText, {
                          "font-size": 28,
                          label: item2.date
                        }, null, 8, ["label"])
                      ], 4)
                    ], 2);
                  }), 128))
                ]),
                _: 2
              }, 1032, ["onClick", "text", "color"])
            ]);
          }), 128))
        ]),
        !props.hideButton ? (openBlock(), createBlock(TmButton, {
          key: 1,
          linear: props.linear,
          "linear-deep": props.linearDeep,
          color: props.color,
          onClick: confirm,
          block: "",
          label: "\u786E\u8BA4",
          margin: [0, 16]
        }, null, 8, ["linear", "linear-deep", "color"])) : createCommentVNode("v-if", true)
      ]);
    };
  }
});
var weekDay = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-calendar-view/week-day.vue"]]);
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "month-year",
  props: {
    followTheme: {
      type: Boolean,
      default: true
    },
    defaultValue: {
      type: Array,
      default: () => []
    },
    modelValue: {
      type: Array,
      default: () => []
    },
    color: {
      type: String,
      default: "primary"
    },
    linear: {
      type: String,
      default: ""
    },
    linearDeep: {
      type: String,
      default: "light"
    },
    start: {
      type: [String, Number, Date],
      default: ""
    },
    end: {
      type: [String, Number, Date],
      default: ""
    },
    hideTool: {
      type: Boolean,
      default: false
    },
    hideButton: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue", "confirm", "click-month", "change"],
  setup(__props, { expose, emit: emits }) {
    const props = __props;
    const store = useTmpiniaStore();
    const _color = computed(() => {
      if (props.followTheme && store.tmStore.color)
        return store.tmStore.color;
      return props.color;
    });
    const DayJs = dayjs;
    DayJs.extend(isoWeek);
    DayJs.extend(isSameOrBefore);
    DayJs.extend(isBetween);
    const _value = ref(DayJs(props.defaultValue[0]).isValid() ? DayJs(props.defaultValue[0]) : DayJs());
    const _start_date = computed(() => {
      let isv = DayJs(props.start).isValid();
      return isv ? DayJs(props.start) : DayJs("1980-1-1");
    });
    const _end_date = computed(() => {
      let isv = DayJs(props.end).isValid();
      return isv ? DayJs(props.end) : DayJs("2450-1-1");
    });
    const _data = ref(getDataArray());
    const _nowDate = computed(() => {
      return _value.value.format("YYYY-MM");
    });
    const _nowMonth = computed(() => {
      return _value.value.format("M");
    });
    watch([
      () => props.modelValue,
      () => props.start,
      () => props.end
    ], () => {
      _value.value = DayJs(props.modelValue[0]);
      _data.value = getDataArray();
    }, { deep: true });
    function nowWeekClick() {
      if (DayJs().isBetween(_start_date.value, _end_date.value, "month", "[]") == false) {
        uni.showToast({ title: "\u65E0\u6CD5\u9009\u4E2D", icon: "none" });
        return;
      }
      _value.value = DayJs();
      _data.value = getDataArray();
      updateTimes();
    }
    function clickWeek(wk) {
      if (wk.isVaild) {
        uni.showToast({ title: "\u65E0\u6CD5\u9009\u4E2D", icon: "none" });
        return;
      }
      _value.value = _value.value.month(wk.month - 1);
      updateTimes();
    }
    function setDefault(data = []) {
      _value.value = data ? DayJs(data[0]) : DayJs(props.modelValue[0]);
      _data.value = getDataArray();
    }
    function getDataArray() {
      let nowMonth = DayJs("2000-1-1").year(_value.value.year());
      let ar = [];
      for (let i = 0; i < 12; i++) {
        nowMonth = nowMonth.month(i);
        ar.push({
          dateStr: nowMonth.format("YYYY-MM"),
          month: nowMonth.month() + 1,
          isVaild: !nowMonth.isBetween(_start_date.value, _end_date.value, "month", "[]")
        });
      }
      return uni.$tm.u.splitData(ar, 3);
    }
    function nextYear() {
      _value.value = _value.value.add(1, "year");
      _data.value = getDataArray();
      emits("change", _value.value.format("YYYY/MM/DD"));
    }
    function prevYear() {
      _value.value = _value.value.subtract(1, "year");
      _data.value = getDataArray();
      emits("change", _value.value.format("YYYY/MM/DD"));
    }
    function updateTimes() {
      emits("click-month", _value.value.format("YYYY-MM"));
    }
    function confirm() {
      emits("update:modelValue", [_value.value.format("YYYY-MM")]);
      emits("confirm", [_value.value.format("YYYY-MM")]);
    }
    expose({
      setDefault,
      nextYear,
      prevYear
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        class: "flex flex-col relative",
        renderWhole: true
      }, [
        !props.hideTool ? (openBlock(), createBlock(tmSheet, {
          key: 0,
          shadow: 0,
          margin: [0, 0],
          padding: [0, 24],
          _class: "flex flex-row flex-row-center-center"
        }, {
          default: withCtx(() => [
            createElementVNode("view", {
              onClick: withModifiers(prevYear, ["stop"]),
              class: "px-32"
            }, [
              createVNode(tmIcon, {
                userInteractionEnabled: false,
                "font-size": 24,
                name: "tmicon-angle-double-left"
              })
            ], 8, ["onClick"]),
            createCommentVNode(' <view @click.stop="prevMonth" class="px-32">\r\n				<tm-icon :userInteractionEnabled="false" :font-size="24" name="tmicon-angle-left"></tm-icon>\r\n			</view> '),
            createElementVNode("view", { class: "px-32" }, [
              createVNode(tmText, {
                userInteractionEnabled: false,
                "font-size": 28,
                label: unref(_nowDate)
              }, null, 8, ["label"])
            ]),
            createCommentVNode(' <view @click.stop="nextMonth" class="px-32">\r\n				<tm-icon :userInteractionEnabled="false" :font-size="24" name="tmicon-angle-right"></tm-icon>\r\n			</view> '),
            createElementVNode("view", {
              onClick: withModifiers(nextYear, ["stop"]),
              class: "px-32"
            }, [
              createVNode(tmIcon, {
                userInteractionEnabled: false,
                "font-size": 24,
                name: "tmicon-angle-double-right"
              })
            ], 8, ["onClick"]),
            createElementVNode("view", {
              onClick: nowWeekClick,
              class: "absolute t-0 r-16 zIndex-10",
              style: { "width": "64rpx" }
            }, [
              createVNode(tmText, {
                userInteractionEnabled: false,
                "font-size": 28,
                label: "\u672C\u6708"
              })
            ])
          ]),
          _: 1
        })) : createCommentVNode("v-if", true),
        createElementVNode("view", { class: "flex flex-col" }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_data.value, (item2, index2) => {
            return openBlock(), createElementBlock("view", { key: index2 }, [
              createElementVNode("view", {
                class: "flex flex-row flex-row-center-center",
                style: normalizeStyle([{ height: "120rpx", flexWrap: "wrap" }])
              }, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(item2, (item, index) => {
                  return openBlock(), createBlock(tmSheet, {
                    onClick: ($event) => clickWeek(item),
                    height: 112,
                    shadow: 0,
                    round: 4,
                    _class: "flex-row flex-center",
                    class: "flex-3",
                    "paren-class": "flex-3",
                    text: unref(_nowMonth) == item.month,
                    color: unref(_nowMonth) == item.month ? unref(_color) : "grey-4",
                    margin: [4, 4],
                    padding: [0, 0],
                    key: index
                  }, {
                    default: withCtx(() => [
                      createElementVNode("view", {
                        style: normalizeStyle([[{ opacity: item.isVaild ? "0.3" : "1" }], { "width": "62rpx" }]),
                        userInteractionEnabled: false,
                        class: "flex-center flex-col"
                      }, [
                        createVNode(tmText, {
                          "font-size": 28,
                          label: item.month + "\u6708"
                        }, null, 8, ["label"])
                      ], 4)
                    ]),
                    _: 2
                  }, 1032, ["onClick", "text", "color"]);
                }), 128))
              ])
            ]);
          }), 128))
        ]),
        !props.hideButton ? (openBlock(), createBlock(TmButton, {
          key: 1,
          linear: props.linear,
          "linear-deep": props.linearDeep,
          color: props.color,
          onClick: confirm,
          block: "",
          label: "\u786E\u8BA4",
          margin: [0, 16]
        }, null, 8, ["linear", "linear-deep", "color"])) : createCommentVNode("v-if", true)
      ]);
    };
  }
});
var monthYear = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-calendar-view/month-year.vue"]]);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "year-du",
  props: {
    followTheme: {
      type: Boolean,
      default: true
    },
    defaultValue: {
      type: Array,
      default: () => []
    },
    modelValue: {
      type: Array,
      default: () => []
    },
    color: {
      type: String,
      default: "primary"
    },
    linear: {
      type: String,
      default: ""
    },
    linearDeep: {
      type: String,
      default: "light"
    },
    start: {
      type: [String, Number, Date],
      default: ""
    },
    end: {
      type: [String, Number, Date],
      default: ""
    },
    hideTool: {
      type: Boolean,
      default: false
    },
    hideButton: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue", "confirm", "click-year", "change"],
  setup(__props, { expose, emit: emits }) {
    const props = __props;
    const store = useTmpiniaStore();
    const _color = computed(() => {
      if (props.followTheme && store.tmStore.color)
        return store.tmStore.color;
      return props.color;
    });
    const DayJs = dayjs;
    DayJs.extend(isoWeek);
    DayJs.extend(isSameOrBefore);
    DayJs.extend(isBetween);
    const _value = ref(DayJs(props.defaultValue[0]).isValid() ? DayJs(props.defaultValue[0]) : DayJs());
    const _cachYear = ref(_value.value);
    const _start_date = computed(() => {
      let isv = DayJs(props.start).isValid();
      return isv ? DayJs(props.start) : DayJs("1980-1-1");
    });
    const _end_date = computed(() => {
      let isv = DayJs(props.end).isValid();
      return isv ? DayJs(props.end) : DayJs("2450-1-1");
    });
    const _data = ref(getYearArray());
    const _nowDate = computed(() => {
      return _value.value.format("YYYY");
    });
    watch([
      () => props.modelValue,
      () => props.start,
      () => props.end
    ], () => {
      _value.value = DayJs(props.modelValue[0]);
      _data.value = getYearArray();
    }, { deep: true });
    function getYearArray(str = "") {
      let nowyear = _value.value.year();
      if (str) {
        nowyear = DayJs(str).year();
      }
      let nowMonth = DayJs("2000-1-1").year(nowyear);
      let ar = [];
      for (let i = nowyear - 4; i < nowyear + 5; i++) {
        nowMonth = nowMonth.year(i);
        ar.push({
          dateStr: nowMonth.format("YYYY-MM"),
          year: nowMonth.year(),
          isVaild: !nowMonth.isBetween(_start_date.value, _end_date.value, "year", "[]")
        });
      }
      return uni.$tm.u.splitData(ar, 3);
    }
    function nowWeekClick() {
      if (DayJs().isBetween(_start_date.value, _end_date.value, "year", "[]") == false) {
        uni.showToast({ title: "\u65E0\u6CD5\u9009\u4E2D", icon: "none" });
        return;
      }
      _value.value = DayJs();
      _data.value = getYearArray();
      updateTimes();
    }
    function clickWeek(wk) {
      if (wk.isVaild) {
        uni.showToast({ title: "\u65E0\u6CD5\u9009\u4E2D", icon: "none" });
        return;
      }
      _value.value = _value.value.year(wk.year);
      _cachYear.value = _value.value;
      updateTimes();
    }
    function nextYear() {
      _cachYear.value = _cachYear.value.add(8, "year");
      _data.value = getYearArray(_cachYear.value);
      emits("change", _cachYear.value.year());
    }
    function prevYear() {
      _cachYear.value = _cachYear.value.subtract(8, "year");
      _data.value = getYearArray(_cachYear.value);
      emits("change", _cachYear.value.year());
    }
    function setDefault(data = []) {
      _value.value = DayJs(data[0] || props.modelValue);
      _data.value = getYearArray();
    }
    function updateTimes() {
      emits("click-year", _value.value.year());
    }
    function confirm() {
      emits("update:modelValue", [String(_value.value.year())]);
      emits("confirm", [String(_value.value.year())]);
    }
    expose({
      setDefault,
      nextYear,
      prevYear
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        class: "flex flex-col relative",
        renderWhole: true
      }, [
        !props.hideTool ? (openBlock(), createBlock(tmSheet, {
          key: 0,
          shadow: 0,
          margin: [0, 0],
          padding: [0, 24],
          _class: "flex flex-row flex-row-center-center"
        }, {
          default: withCtx(() => [
            createElementVNode("view", {
              onClick: withModifiers(prevYear, ["stop"]),
              class: "px-32"
            }, [
              createVNode(tmIcon, {
                userInteractionEnabled: false,
                "font-size": 24,
                name: "tmicon-angle-double-left"
              })
            ], 8, ["onClick"]),
            createCommentVNode(' <view @click.stop="prevMonth" class="px-32">\r\n				<tm-icon :userInteractionEnabled="false" :font-size="24" name="tmicon-angle-left"></tm-icon>\r\n			</view> '),
            createElementVNode("view", { class: "px-32" }, [
              createVNode(tmText, {
                userInteractionEnabled: false,
                "font-size": 28,
                label: unref(_nowDate)
              }, null, 8, ["label"])
            ]),
            createCommentVNode(' <view @click.stop="nextMonth" class="px-32">\r\n				<tm-icon :userInteractionEnabled="false" :font-size="24" name="tmicon-angle-right"></tm-icon>\r\n			</view> '),
            createElementVNode("view", {
              onClick: withModifiers(nextYear, ["stop"]),
              class: "px-32"
            }, [
              createVNode(tmIcon, {
                userInteractionEnabled: false,
                "font-size": 24,
                name: "tmicon-angle-double-right"
              })
            ], 8, ["onClick"]),
            createElementVNode("view", {
              onClick: nowWeekClick,
              class: "absolute t-0 r-16 zIndex-10",
              style: { "width": "64rpx" }
            }, [
              createVNode(tmText, {
                userInteractionEnabled: false,
                "font-size": 28,
                label: "\u672C\u5E74"
              })
            ])
          ]),
          _: 1
        })) : createCommentVNode("v-if", true),
        createElementVNode("view", { class: "flex flex-col" }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_data.value, (item2, index2) => {
            return openBlock(), createElementBlock("view", { key: index2 }, [
              createElementVNode("view", {
                class: "flex flex-row flex-row-center-center",
                style: normalizeStyle([{ height: "120rpx", flexWrap: "wrap" }])
              }, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(item2, (item, index) => {
                  return openBlock(), createBlock(tmSheet, {
                    onClick: ($event) => clickWeek(item),
                    height: 112,
                    shadow: 0,
                    round: 4,
                    _class: "flex-row flex-center",
                    class: "flex-3",
                    "paren-class": "flex-3",
                    text: unref(_nowDate) == item.year,
                    color: unref(_nowDate) == item.year ? unref(_color) : "grey-4",
                    margin: [4, 4],
                    padding: [0, 0],
                    key: index
                  }, {
                    default: withCtx(() => [
                      createElementVNode("view", {
                        style: normalizeStyle([[{ opacity: item.isVaild ? "0.3" : "1" }], { "width": "110rpx" }]),
                        userInteractionEnabled: false,
                        class: "flex-center flex-col"
                      }, [
                        createVNode(tmText, {
                          "font-size": 28,
                          label: item.year + "\u5E74"
                        }, null, 8, ["label"])
                      ], 4)
                    ]),
                    _: 2
                  }, 1032, ["onClick", "text", "color"]);
                }), 128))
              ])
            ]);
          }), 128))
        ]),
        !props.hideButton ? (openBlock(), createBlock(TmButton, {
          key: 1,
          linear: props.linear,
          "linear-deep": props.linearDeep,
          color: props.color,
          onClick: confirm,
          block: "",
          label: "\u786E\u8BA4",
          margin: [0, 16]
        }, null, 8, ["linear", "linear-deep", "color"])) : createCommentVNode("v-if", true)
      ]);
    };
  }
});
var yearDu = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-calendar-view/year-du.vue"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "month-day",
  props: {
    followTheme: {
      type: Boolean,
      default: true
    },
    defaultValue: {
      type: Array,
      default: () => []
    },
    modelValue: {
      type: Array,
      default: () => []
    },
    color: {
      type: String,
      default: "primary"
    },
    linear: {
      type: String,
      default: ""
    },
    linearDeep: {
      type: String,
      default: "light"
    },
    start: {
      type: [String, Number, Date],
      default: ""
    },
    end: {
      type: [String, Number, Date],
      default: ""
    },
    disabledDate: {
      type: Array,
      default: () => []
    },
    multiple: {
      type: Boolean,
      default: false
    },
    dateStyle: {
      type: Array,
      default: () => []
    },
    max: {
      type: Number,
      default: 999
    },
    hideTool: {
      type: Boolean,
      default: false
    },
    hideButton: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue", "confirm", "click-day", "change"],
  setup(__props, { expose, emit: emits }) {
    const props = __props;
    const store = useTmpiniaStore();
    const _color = computed(() => {
      if (props.followTheme && store.tmStore.color)
        return store.tmStore.color;
      return props.color;
    });
    const DayJs = dayjs;
    DayJs.extend(isoWeek);
    DayJs.extend(isSameOrBefore);
    DayJs.extend(isBetween);
    const _value = ref(props.defaultValue);
    const weekStr = ["\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u65E5"];
    const showOpenDate = ref(setShowopenDate());
    const _data = ref([]);
    const _start_date = computed(() => {
      let isv = DayJs(props.start).isValid();
      return isv ? DayJs(props.start) : DayJs("1980-1-1");
    });
    const _end_date = computed(() => {
      let isv = DayJs(props.end).isValid();
      return isv ? DayJs(props.end) : DayJs("2450-1-1");
    });
    const _nowDate = computed(() => {
      return showOpenDate.value.format("YYYY-MM");
    });
    _data.value = getWeekOfMonthArray();
    watch([
      () => props.modelValue,
      () => props.dateStyle,
      () => props.disabledDate,
      () => props.start,
      () => props.end
    ], () => {
      _value.value = props.modelValue;
      showOpenDate.value = setShowopenDate();
      _data.value = getWeekOfMonthArray();
    }, { deep: true });
    function setShowopenDate() {
      if (_value.value.length == 0) {
        return DayJs();
      }
      let n = _value.value[0] || DayJs();
      n = typeof n == "undefined" || n == null ? DayJs() : n;
      return DayJs(n);
    }
    function nowWeekClick() {
      if (isDisabledDate(DayJs())) {
        uni.showToast({ title: "\u65E0\u6CD5\u9009\u4E2D", icon: "none" });
        return;
      }
      selected(DayJs().format("YYYY/MM/DD"));
      showOpenDate.value = DayJs();
      _data.value = getWeekOfMonthArray();
      emits("click-day", DayJs().format("YYYY/MM/DD"));
    }
    function clickWeek(wk) {
      if (wk.disabled) {
        uni.showToast({ title: "\u65E0\u6CD5\u9009\u4E2D", icon: "none" });
        return;
      }
      selected(wk.dateStr);
      emits("click-day", wk.dateStr);
    }
    function selected(item) {
      let fr = _value.value.filter((el) => DayJs(el).isSame(item));
      if (!props.multiple) {
        _value.value = [DayJs(item).format("YYYY/MM/DD")];
        return;
      }
      if (fr.length > 0) {
        _value.value = _value.value.filter((el) => !DayJs(el).isSame(item));
      } else {
        if (_value.value.length >= props.max) {
          uni.showToast({ title: "\u53EA\u53EF\u9009\u62E9" + props.max + "\u5929", icon: "none" });
          return;
        }
        _value.value.push(DayJs(item).format("YYYY/MM/DD"));
      }
    }
    function nextYear() {
      showOpenDate.value = showOpenDate.value.add(1, "year");
      _data.value = getWeekOfMonthArray();
      emits("change", showOpenDate.value.format("YYYY/MM/DD"));
    }
    function nextMonth() {
      showOpenDate.value = showOpenDate.value.add(1, "month");
      _data.value = getWeekOfMonthArray();
      emits("change", showOpenDate.value.format("YYYY/MM/DD"));
    }
    function prevMonth() {
      showOpenDate.value = showOpenDate.value.subtract(1, "month");
      _data.value = getWeekOfMonthArray();
      emits("change", showOpenDate.value.format("YYYY/MM/DD"));
    }
    function prevYear() {
      showOpenDate.value = showOpenDate.value.subtract(1, "year");
      _data.value = getWeekOfMonthArray();
      emits("change", showOpenDate.value.format("YYYY/MM/DD"));
    }
    function setDefault(data = []) {
      _value.value = data.length > 0 ? data : props.modelValue;
      showOpenDate.value = setShowopenDate();
      _data.value = getWeekOfMonthArray();
    }
    function getWeekOfMonthArray() {
      let nowMonth = showOpenDate.value.date(1);
      let startStatickDay = nowMonth.startOf("month");
      let endStatickDay = nowMonth.endOf("month");
      let nowMonthDayNum = nowMonth.daysInMonth();
      let startOfday = startStatickDay.isoWeekday() - 1;
      startStatickDay = nowMonth.subtract(Math.abs(startOfday), "day");
      let endOfday = 7 - endStatickDay.isoWeekday();
      if (endOfday > 0) {
        endStatickDay = nowMonth.date(nowMonthDayNum).add(Math.abs(endOfday), "day");
      }
      let startd = DayJs(startStatickDay);
      let arOfmonth = [];
      let ar = [];
      function setAr() {
        let dy = props.dateStyle.map((el) => {
          el.date = DayJs(el.date).format("YYYY/MM/DD");
          return el;
        });
        let dyObj = {};
        dy.forEach((el) => {
          dyObj[el.date] = el;
        });
        let dySet = new Set(Object.keys(dyObj));
        while (startd.isSameOrBefore(endStatickDay)) {
          let idate = startd.format("YYYY/MM/DD");
          let ext = dySet.has(idate) ? dyObj[idate] : null;
          ar.push({
            dateStr: idate,
            date: startd.date() < 10 ? "0" + startd.date() : startd.date(),
            day: startd.isoWeekday(),
            week: startd.isoWeek(),
            isNowIn: isInNowMonth(nowMonth, startd),
            disabled: isDisabledDate(startd),
            extra: __spreadValues({
              date: idate,
              text: false,
              color: "",
              extra: ""
            }, ext)
          });
          arOfmonth.push(startd.isoWeek());
          startd = startd.add(1, "day");
        }
      }
      setAr();
      if (ar.length < 42) {
        let chaJi = 42 - ar.length;
        endStatickDay = endStatickDay.add(chaJi, "day");
        setAr();
      }
      arOfmonth = [...new Set(arOfmonth)];
      let dArray = [];
      let index = 0;
      dArray.push([]);
      ar.forEach((el) => {
        if (el.week == arOfmonth[index]) {
          dArray[index].push(el);
        } else {
          index += 1;
          dArray.push([]);
          dArray[index].push(el);
        }
      });
      return dArray;
    }
    function isInNowMonth(date = "", now = "") {
      let startStatickDay = DayJs(date).startOf("month").format("YYYY/MM/DD");
      let endStatickDay = DayJs(date).endOf("month").format("YYYY/MM/DD");
      return DayJs(now).isBetween(startStatickDay, endStatickDay, "day", "[]");
    }
    function isDisabledDate(date = "") {
      let valdate = DayJs(date);
      let isds = false;
      isds = !valdate.isBetween(_start_date.value, _end_date.value, "day", "[]");
      for (let i = 0; i < props.disabledDate.length; i++) {
        let item = props.disabledDate[i];
        if (DayJs(item).isSame(valdate)) {
          isds = true;
          break;
        }
      }
      return isds;
    }
    function isSelected(date = "") {
      let fr = _value.value.filter((el) => DayJs(el).isSame(date));
      return fr.length > 0;
    }
    function confirm() {
      let ar = _value.value.map((el) => DayJs(el).format("YYYY/MM/DD"));
      emits("update:modelValue", ar);
      emits("confirm", ar);
    }
    expose({
      setDefault,
      nextYear,
      nextMonth,
      prevYear,
      prevMonth
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        class: "flex flex-col relative",
        renderWhole: true
      }, [
        !props.hideTool ? (openBlock(), createBlock(tmSheet, {
          key: 0,
          shadow: 0,
          round: 0,
          margin: [0, 0],
          padding: [0, 24],
          _class: "flex flex-row flex-row-center-center"
        }, {
          default: withCtx(() => [
            createElementVNode("view", {
              onClick: withModifiers(prevYear, ["stop"]),
              class: "px-32"
            }, [
              createVNode(tmIcon, {
                userInteractionEnabled: false,
                "font-size": 24,
                name: "tmicon-angle-double-left"
              })
            ], 8, ["onClick"]),
            createElementVNode("view", {
              onClick: withModifiers(prevMonth, ["stop"]),
              class: "px-32"
            }, [
              createVNode(tmIcon, {
                userInteractionEnabled: false,
                "font-size": 24,
                name: "tmicon-angle-left"
              })
            ], 8, ["onClick"]),
            createElementVNode("view", { class: "px-12" }, [
              createVNode(tmText, {
                userInteractionEnabled: false,
                "font-size": 28,
                label: unref(_nowDate)
              }, null, 8, ["label"])
            ]),
            createElementVNode("view", {
              onClick: withModifiers(nextMonth, ["stop"]),
              class: "px-32"
            }, [
              createVNode(tmIcon, {
                userInteractionEnabled: false,
                "font-size": 24,
                name: "tmicon-angle-right"
              })
            ], 8, ["onClick"]),
            createElementVNode("view", {
              onClick: withModifiers(nextYear, ["stop"]),
              class: "px-32"
            }, [
              createVNode(tmIcon, {
                userInteractionEnabled: false,
                "font-size": 24,
                name: "tmicon-angle-double-right"
              })
            ], 8, ["onClick"]),
            createElementVNode("view", {
              onClick: nowWeekClick,
              class: "absolute t-0 r-16 zIndex-10",
              style: { "width": "64rpx" }
            }, [
              createVNode(tmText, {
                userInteractionEnabled: false,
                "font-size": 28,
                label: "\u672C\u65E5"
              })
            ])
          ]),
          _: 1
        })) : createCommentVNode("v-if", true),
        createElementVNode("view", {
          class: "flex flex-row flex-row-center-center py-12",
          style: normalizeStyle([{ height: "74rpx" }])
        }, [
          (openBlock(), createElementBlock(Fragment, null, renderList(weekStr, (item, index) => {
            return createElementVNode("view", {
              class: "flex-1 flex-center",
              key: index
            }, [
              createElementVNode("view", {
                style: { "width": "62rpx" },
                class: "flex-center flex-col"
              }, [
                createVNode(tmText, {
                  "font-size": 24,
                  label: item
                }, null, 8, ["label"])
              ])
            ]);
          }), 64))
        ]),
        createElementVNode("view", { class: "flex flex-col" }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_data.value, (item, index) => {
            return openBlock(), createElementBlock("view", {
              class: "flex flex-row flex-row-center-center",
              style: normalizeStyle([{ height: "98rpx" }]),
              key: index
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(item, (item2, index2) => {
                return openBlock(), createBlock(tmSheet, {
                  onClick: ($event) => clickWeek(item2),
                  height: 90,
                  shadow: 0,
                  round: 4,
                  border: item2.extra.color && isSelected(item2.dateStr) ? 1 : 0,
                  _class: "flex-row",
                  class: "flex-1",
                  "paren-class": "flex-1",
                  text: item2.extra.color ? true : isSelected(item2.dateStr),
                  color: item2.extra.color ? item2.extra.color : isSelected(item2.dateStr) ? unref(_color) : "white",
                  margin: [0, 0],
                  padding: [0, 0],
                  key: index2
                }, {
                  default: withCtx(() => [
                    createElementVNode("view", {
                      userInteractionEnabled: false,
                      style: { "width": "62rpx" },
                      class: normalizeClass([[!item2.isNowIn ? "opacity-6" : ""], "flex-1 flex-center"])
                    }, [
                      createElementVNode("view", {
                        style: normalizeStyle([{ "width": "62rpx" }, [{ opacity: item2.disabled ? "0.3" : "1" }]]),
                        class: "flex-center flex-col"
                      }, [
                        createVNode(tmText, {
                          "font-size": 28,
                          label: item2.date
                        }, null, 8, ["label"]),
                        createVNode(tmText, {
                          _class: "flex-center",
                          "vv-if": "item2.extra.extra",
                          "font-size": 22,
                          label: item2.extra.extra
                        }, null, 8, ["label"])
                      ], 4)
                    ], 2)
                  ]),
                  _: 2
                }, 1032, ["onClick", "border", "text", "color"]);
              }), 128))
            ]);
          }), 128))
        ]),
        !props.hideButton ? (openBlock(), createBlock(TmButton, {
          key: 1,
          followTheme: props.followTheme,
          linear: props.linear,
          "linear-deep": props.linearDeep,
          color: props.color,
          onClick: confirm,
          block: "",
          label: "\u786E\u8BA4",
          margin: [0, 16]
        }, null, 8, ["followTheme", "linear", "linear-deep", "color"])) : createCommentVNode("v-if", true)
      ]);
    };
  }
});
var monthDay = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-calendar-view/month-day.vue"]]);
var minMax = function(o, c, d) {
  var sortBy = function sortBy2(method, dates) {
    if (!dates || !dates.length || !dates[0] || dates.length === 1 && !dates[0].length) {
      return null;
    }
    if (dates.length === 1 && dates[0].length > 0) {
      var _dates = dates;
      dates = _dates[0];
    }
    var result;
    var _dates2 = dates;
    result = _dates2[0];
    for (var i = 1; i < dates.length; i += 1) {
      if (!dates[i].isValid() || dates[i][method](result)) {
        result = dates[i];
      }
    }
    return result;
  };
  d.max = function() {
    var args = [].slice.call(arguments, 0);
    return sortBy("isAfter", args);
  };
  d.min = function() {
    var args = [].slice.call(arguments, 0);
    return sortBy("isBefore", args);
  };
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "range-day",
  props: {
    followTheme: {
      type: Boolean,
      default: true
    },
    defaultValue: {
      type: Array,
      default: () => []
    },
    modelValue: {
      type: Array,
      default: () => []
    },
    color: {
      type: String,
      default: "primary"
    },
    linear: {
      type: String,
      default: ""
    },
    linearDeep: {
      type: String,
      default: "light"
    },
    start: {
      type: [String, Number, Date],
      default: ""
    },
    end: {
      type: [String, Number, Date],
      default: ""
    },
    disabledDate: {
      type: Array,
      default: () => []
    },
    dateStyle: {
      type: Array,
      default: () => []
    },
    hideTool: {
      type: Boolean,
      default: false
    },
    hideButton: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue", "confirm", "click-day", "change"],
  setup(__props, { expose, emit: emits }) {
    const props = __props;
    const store = useTmpiniaStore();
    const _color = computed(() => {
      if (props.followTheme && store.tmStore.color)
        return store.tmStore.color;
      return props.color;
    });
    const DayJs = dayjs;
    DayJs.extend(isoWeek);
    DayJs.extend(isSameOrBefore);
    DayJs.extend(isBetween);
    DayJs.extend(minMax);
    const _value = ref(props.defaultValue);
    const weekStr = ["\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u65E5"];
    const showOpenDate = ref(setShowopenDate());
    const _data = ref([]);
    const _start_date = computed(() => {
      let isv = DayJs(props.start).isValid();
      return isv ? DayJs(props.start) : DayJs("1980-1-1");
    });
    const _end_date = computed(() => {
      let isv = DayJs(props.end).isValid();
      return isv ? DayJs(props.end) : DayJs("2450-1-1");
    });
    const _nowDate = computed(() => {
      return showOpenDate.value.format("YYYY-MM");
    });
    _data.value = getWeekOfMonthArray();
    watch([
      () => props.modelValue,
      () => props.dateStyle,
      () => props.disabledDate,
      () => props.start,
      () => props.end
    ], () => {
      _value.value = props.modelValue;
      showOpenDate.value = setShowopenDate();
      _data.value = getWeekOfMonthArray();
    }, { deep: true });
    function setShowopenDate() {
      if (_value.value.length == 0) {
        return DayJs();
      }
      let n = _value.value[0] || DayJs();
      n = typeof n == "undefined" || n == null ? DayJs() : n;
      return DayJs(n);
    }
    function nowWeekClick() {
      if (isDisabledDate(DayJs())) {
        uni.showToast({ title: "\u65E0\u6CD5\u9009\u4E2D", icon: "none" });
        return;
      }
      selected(DayJs().format("YYYY/MM/DD"));
      showOpenDate.value = DayJs();
      _data.value = getWeekOfMonthArray();
      emits("click-day", DayJs().format("YYYY/MM/DD"));
    }
    function clickWeek(wk) {
      if (wk.disabled) {
        uni.showToast({ title: "\u65E0\u6CD5\u9009\u4E2D", icon: "none" });
        return;
      }
      selected(wk.dateStr);
      emits("click-day", wk.dateStr);
    }
    function selected(item) {
      let nowvalue = [...toRaw(_value.value)];
      if (nowvalue.length < 2) {
        nowvalue.push(DayJs(item).format("YYYY/MM/DD"));
      } else {
        nowvalue = [DayJs(item).format("YYYY/MM/DD")];
      }
      if (nowvalue.length == 2) {
        let dToDayjs = [DayJs(nowvalue[0]), DayJs(nowvalue[1])];
        _value.value = [DayJs.min(dToDayjs), DayJs.max(dToDayjs).format("YYYY/MM/DD")];
      } else {
        _value.value = nowvalue;
      }
    }
    function nextYear() {
      showOpenDate.value = showOpenDate.value.add(1, "year");
      _data.value = getWeekOfMonthArray();
      emits("change", showOpenDate.value.format("YYYY/MM/DD"));
    }
    function nextMonth() {
      showOpenDate.value = showOpenDate.value.add(1, "month");
      _data.value = getWeekOfMonthArray();
      emits("change", showOpenDate.value.format("YYYY/MM/DD"));
    }
    function prevMonth() {
      showOpenDate.value = showOpenDate.value.subtract(1, "month");
      _data.value = getWeekOfMonthArray();
      emits("change", showOpenDate.value.format("YYYY/MM/DD"));
    }
    function prevYear() {
      showOpenDate.value = showOpenDate.value.subtract(1, "year");
      _data.value = getWeekOfMonthArray();
      emits("change", showOpenDate.value.format("YYYY/MM/DD"));
    }
    function setDefault(data = []) {
      _value.value = props.modelValue;
      showOpenDate.value = setShowopenDate();
      _data.value = getWeekOfMonthArray();
    }
    function getWeekOfMonthArray() {
      let nowMonth = showOpenDate.value.date(1);
      let startStatickDay = nowMonth.startOf("month");
      let endStatickDay = nowMonth.endOf("month");
      let nowMonthDayNum = nowMonth.daysInMonth();
      let startOfday = startStatickDay.isoWeekday() - 1;
      startStatickDay = nowMonth.subtract(Math.abs(startOfday), "day");
      let endOfday = 7 - endStatickDay.isoWeekday();
      if (endOfday > 0) {
        endStatickDay = nowMonth.date(nowMonthDayNum).add(Math.abs(endOfday), "day");
      }
      let startd = DayJs(startStatickDay);
      let arOfmonth = [];
      let ar = [];
      function setAr() {
        let dy = props.dateStyle.map((el) => {
          el.date = DayJs(el.date).format("YYYY/MM/DD");
          return el;
        });
        let dyObj = {};
        dy.forEach((el) => {
          dyObj[el.date] = el;
        });
        let dySet = new Set(Object.keys(dyObj));
        while (startd.isSameOrBefore(endStatickDay)) {
          let idate = startd.format("YYYY/MM/DD");
          let ext = dySet.has(idate) ? dyObj[idate] : null;
          ar.push({
            dateStr: idate,
            date: startd.date() < 10 ? "0" + startd.date() : startd.date(),
            day: startd.isoWeekday(),
            week: startd.isoWeek(),
            isNowIn: isInNowMonth(nowMonth, startd),
            disabled: isDisabledDate(startd),
            extra: __spreadValues({
              date: idate,
              text: false,
              color: "",
              extra: ""
            }, ext)
          });
          arOfmonth.push(startd.isoWeek());
          startd = startd.add(1, "day");
        }
      }
      setAr();
      if (ar.length < 42) {
        let chaJi = 42 - ar.length;
        endStatickDay = endStatickDay.add(chaJi, "day");
        setAr();
      }
      arOfmonth = [...new Set(arOfmonth)];
      let dArray = [];
      let index = 0;
      dArray.push([]);
      ar.forEach((el) => {
        if (el.week == arOfmonth[index]) {
          dArray[index].push(el);
        } else {
          index += 1;
          dArray.push([]);
          dArray[index].push(el);
        }
      });
      return dArray;
    }
    function isInNowMonth(date = "", now = "") {
      let startStatickDay = DayJs(date).startOf("month").format("YYYY/MM/DD");
      let endStatickDay = DayJs(date).endOf("month").format("YYYY/MM/DD");
      return DayJs(now).isBetween(startStatickDay, endStatickDay, "day", "[]");
    }
    function isDisabledDate(date = "") {
      let valdate = DayJs(date);
      let isds = false;
      isds = !valdate.isBetween(_start_date.value, _end_date.value, "day", "[]");
      for (let i = 0; i < props.disabledDate.length; i++) {
        let item = props.disabledDate[i];
        if (DayJs(item).isSame(valdate, "day")) {
          isds = true;
          break;
        }
      }
      return isds;
    }
    function isSelected(date = "") {
      let isSelected2 = false;
      let fr = _value.value.filter((el) => DayJs(el).isSame(date));
      isSelected2 = fr.length > 0 ? true : false;
      if (_value.value.length == 2) {
        isSelected2 = DayJs(date).isBetween(_value.value[0], _value.value[1], "day", "[]");
      }
      return isSelected2;
    }
    function startOrAnd(date = "") {
      if (_value.value.length == 1) {
        if (DayJs(date).isSame(_value.value[0], "day")) {
          return 1;
        }
      } else if (_value.value.length == 2) {
        if (DayJs(_value.value[1]).isSame(_value.value[0], "day") && DayJs(date).isSame(_value.value[0])) {
          return 3;
        }
        if (DayJs(date).isSame(_value.value[0])) {
          return 1;
        }
        if (DayJs(date).isSame(_value.value[1])) {
          return 2;
        }
      } else {
        return 0;
      }
    }
    function confirm() {
      let ar = _value.value.map((el) => DayJs(el).format("YYYY/MM/DD"));
      emits("update:modelValue", ar);
      emits("confirm", ar);
    }
    expose({
      setDefault,
      nextYear,
      nextMonth,
      prevYear,
      prevMonth
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        class: "flex flex-col relative",
        renderWhole: true
      }, [
        !props.hideTool ? (openBlock(), createBlock(tmSheet, {
          key: 0,
          shadow: 0,
          round: 0,
          margin: [0, 0],
          padding: [0, 24],
          _class: "flex flex-row flex-row-center-center"
        }, {
          default: withCtx(() => [
            createElementVNode("view", {
              onClick: withModifiers(prevYear, ["stop"]),
              class: "px-32"
            }, [
              createVNode(tmIcon, {
                userInteractionEnabled: false,
                "font-size": 24,
                name: "tmicon-angle-double-left"
              })
            ], 8, ["onClick"]),
            createElementVNode("view", {
              onClick: withModifiers(prevMonth, ["stop"]),
              class: "px-32"
            }, [
              createVNode(tmIcon, {
                userInteractionEnabled: false,
                "font-size": 24,
                name: "tmicon-angle-left"
              })
            ], 8, ["onClick"]),
            createElementVNode("view", { class: "px-12" }, [
              createVNode(tmText, {
                userInteractionEnabled: false,
                "font-size": 28,
                label: unref(_nowDate)
              }, null, 8, ["label"])
            ]),
            createElementVNode("view", {
              onClick: withModifiers(nextMonth, ["stop"]),
              class: "px-32"
            }, [
              createVNode(tmIcon, {
                userInteractionEnabled: false,
                "font-size": 24,
                name: "tmicon-angle-right"
              })
            ], 8, ["onClick"]),
            createElementVNode("view", {
              onClick: withModifiers(nextYear, ["stop"]),
              class: "px-32"
            }, [
              createVNode(tmIcon, {
                userInteractionEnabled: false,
                "font-size": 24,
                name: "tmicon-angle-double-right"
              })
            ], 8, ["onClick"]),
            createElementVNode("view", {
              onClick: nowWeekClick,
              class: "absolute t-0 r-16 zIndex-10",
              style: { "width": "64rpx" }
            }, [
              createVNode(tmText, {
                userInteractionEnabled: false,
                "font-size": 28,
                label: "\u672C\u65E5"
              })
            ])
          ]),
          _: 1
        })) : createCommentVNode("v-if", true),
        createElementVNode("view", {
          class: "flex flex-row flex-row-center-center py-12",
          style: normalizeStyle([{ height: "74rpx" }])
        }, [
          (openBlock(), createElementBlock(Fragment, null, renderList(weekStr, (item, index) => {
            return createElementVNode("view", {
              class: "flex-1 flex-center",
              key: index
            }, [
              createElementVNode("view", {
                style: { "width": "62rpx" },
                class: "flex-center flex-col"
              }, [
                createVNode(tmText, {
                  "font-size": 24,
                  label: item
                }, null, 8, ["label"])
              ])
            ]);
          }), 64))
        ]),
        createElementVNode("view", { class: "flex flex-col" }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_data.value, (item, index) => {
            return openBlock(), createElementBlock("view", {
              class: "flex flex-row flex-row-center-center",
              style: normalizeStyle([{ height: "98rpx" }]),
              key: index
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(item, (item2, index2) => {
                return openBlock(), createBlock(tmSheet, {
                  onClick: ($event) => clickWeek(item2),
                  height: 98,
                  shadow: 0,
                  round: 0,
                  border: item2.extra.color && isSelected(item2.dateStr) ? 1 : 0,
                  _class: "flex-row",
                  class: "flex-1",
                  "paren-class": "flex-1",
                  text: startOrAnd(item2.dateStr) == 1 || startOrAnd(item2.dateStr) == 2 || startOrAnd(item2.dateStr) == 3 ? false : item2.extra.color ? true : isSelected(item2.dateStr),
                  color: item2.extra.color ? item2.extra.color : isSelected(item2.dateStr) ? unref(_color) : "white",
                  margin: [0, 0],
                  padding: [0, 0],
                  key: index2
                }, {
                  default: withCtx(() => [
                    createElementVNode("view", {
                      userInteractionEnabled: false,
                      style: { "width": "84rpx" },
                      class: normalizeClass([[!item2.isNowIn ? "opacity-6" : ""], "flex-1 flex-center"])
                    }, [
                      createElementVNode("view", {
                        style: normalizeStyle([{ "width": "84rpx" }, [{ opacity: item2.disabled ? "0.3" : "1" }]]),
                        class: "flex-center flex-col"
                      }, [
                        createVNode(tmText, {
                          "font-size": 28,
                          label: item2.date
                        }, null, 8, ["label"]),
                        startOrAnd(item2.dateStr) == 0 && item2.extra.extra ? (openBlock(), createBlock(tmText, {
                          key: 0,
                          _class: "flex-center",
                          "font-size": 22,
                          label: item2.extra.extra
                        }, null, 8, ["label"])) : createCommentVNode("v-if", true),
                        startOrAnd(item2.dateStr) == 1 ? (openBlock(), createBlock(tmText, {
                          key: 1,
                          _class: "flex-center",
                          "font-size": 22,
                          label: "\u5F00\u59CB"
                        })) : createCommentVNode("v-if", true),
                        startOrAnd(item2.dateStr) == 2 ? (openBlock(), createBlock(tmText, {
                          key: 2,
                          _class: "flex-center",
                          "font-size": 22,
                          label: "\u7ED3\u675F"
                        })) : createCommentVNode("v-if", true),
                        startOrAnd(item2.dateStr) == 3 ? (openBlock(), createBlock(tmText, {
                          key: 3,
                          _class: "flex-center",
                          "font-size": 20,
                          label: "\u59CB/\u7ED3\u675F"
                        })) : createCommentVNode("v-if", true)
                      ], 4)
                    ], 2)
                  ]),
                  _: 2
                }, 1032, ["onClick", "border", "text", "color"]);
              }), 128))
            ]);
          }), 128))
        ]),
        !props.hideButton ? (openBlock(), createBlock(TmButton, {
          key: 1,
          linear: props.linear,
          "linear-deep": props.linearDeep,
          color: props.color,
          onClick: confirm,
          block: "",
          label: "\u786E\u8BA4",
          margin: [32, 16]
        }, null, 8, ["linear", "linear-deep", "color"])) : createCommentVNode("v-if", true)
      ]);
    };
  }
});
var rangeDay = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-calendar-view/range-day.vue"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "tm-calendar-view",
  props: __spreadProps(__spreadValues({}, custom_props), {
    followTheme: {
      type: Boolean,
      default: true
    },
    defaultValue: {
      type: Array,
      default: () => []
    },
    modelValue: {
      type: Array,
      default: () => []
    },
    modelStr: {
      type: String,
      default: ""
    },
    model: {
      type: String,
      default: "day"
    },
    color: {
      type: String,
      default: "primary"
    },
    linear: {
      type: String,
      default: ""
    },
    linearDeep: {
      type: String,
      default: "light"
    },
    start: {
      type: [String, Number, Date],
      default: ""
    },
    end: {
      type: [String, Number, Date],
      default: ""
    },
    disabledDate: {
      type: Array,
      default: () => []
    },
    multiple: {
      type: Boolean,
      default: false
    },
    dateStyle: {
      type: Array,
      default: () => []
    },
    max: {
      type: Number,
      default: 999
    },
    hideButton: {
      type: Boolean,
      default: false
    },
    hideTool: {
      type: Boolean,
      default: false
    }
  }),
  emits: ["update:modelValue", "update:modelStr", "confirm", "click", "change"],
  setup(__props, { expose, emit: emits }) {
    var _a, _b;
    const props = __props;
    (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const rDay = ref(null);
    const Day = ref(null);
    const Year = ref(null);
    const Month = ref(null);
    const Week = ref(null);
    const _value = ref(props.defaultValue);
    const _modelType = computed(() => props.model);
    watch(() => props.modelValue, () => _value.value = props.modelValue, { deep: true });
    watch(_value, () => {
      emits("update:modelStr", _value.value.join("~"));
    }, { deep: true });
    function change(e) {
      emits("change", e);
    }
    function click(e) {
      emits("click", e);
    }
    function confirm(e) {
      emits("confirm", e);
      emits("update:modelValue", e);
    }
    function getRefs() {
      if (_modelType.value == "day")
        return Day.value;
      if (_modelType.value == "rang")
        return rDay.value;
      if (_modelType.value == "week")
        return Week.value;
      if (_modelType.value == "month")
        return Month.value;
      if (_modelType.value == "year")
        return Year.value;
      return Day.value;
    }
    expose({
      setDefault: (e) => {
        nextTick(() => getRefs().setDefault(e));
      },
      nextYear: () => {
        nextTick(() => getRefs().nextYear());
      },
      nextMonth: () => {
        nextTick(() => getRefs().nextMonth());
      },
      prevYear: () => {
        nextTick(() => getRefs().prevYear());
      },
      prevMonth: () => {
        nextTick(() => getRefs().prevMonth());
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(tmSheet, {
        margin: [0, 0],
        padding: [0, 0]
      }, {
        default: withCtx(() => [
          createCommentVNode(" \u6309\u65E5\u9009\u62E9\u7684\u65E5\u671F\uFF0C\u53EF\u5355\u9009\uFF0C\u591A\u9009\u3002 "),
          unref(_modelType) == "rang" ? (openBlock(), createBlock(rangeDay, {
            key: 0,
            hideButton: props.hideButton,
            hideTool: props.hideTool,
            followTheme: props.followTheme,
            ref_key: "rDay",
            ref: rDay,
            onConfirm: confirm,
            onClickDay: click,
            onChange: change,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _value.value = $event),
            "model-value": _value.value,
            "default-value": _value.value,
            dateStyle: props.dateStyle,
            disabledDate: props.disabledDate,
            start: props.start,
            end: props.end,
            color: props.color,
            linear: props.linear,
            linearDeep: props.linearDeep
          }, null, 8, ["hideButton", "hideTool", "followTheme", "model-value", "default-value", "dateStyle", "disabledDate", "start", "end", "color", "linear", "linearDeep"])) : createCommentVNode("v-if", true),
          unref(_modelType) == "day" ? (openBlock(), createBlock(monthDay, {
            key: 1,
            hideButton: props.hideButton,
            hideTool: props.hideTool,
            followTheme: props.followTheme,
            ref_key: "Day",
            ref: Day,
            onConfirm: confirm,
            onClickDay: click,
            onChange: change,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _value.value = $event),
            "model-value": _value.value,
            "default-value": _value.value,
            dateStyle: props.dateStyle,
            disabledDate: props.disabledDate,
            max: props.max,
            multiple: props.multiple,
            start: props.start,
            end: props.end,
            color: props.color,
            linear: props.linear,
            linearDeep: props.linearDeep
          }, null, 8, ["hideButton", "hideTool", "followTheme", "model-value", "default-value", "dateStyle", "disabledDate", "max", "multiple", "start", "end", "color", "linear", "linearDeep"])) : createCommentVNode("v-if", true),
          createCommentVNode(" \u6309\u5E74\u9009\u62E9 "),
          unref(_modelType) == "year" ? (openBlock(), createBlock(yearDu, {
            key: 2,
            hideButton: props.hideButton,
            hideTool: props.hideTool,
            followTheme: props.followTheme,
            ref_key: "Year",
            ref: Year,
            onConfirm: confirm,
            onClickYear: click,
            onChange: change,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _value.value = $event),
            "model-value": _value.value,
            "default-value": _value.value,
            start: props.start,
            end: props.end,
            color: props.color,
            linear: props.linear,
            linearDeep: props.linearDeep
          }, null, 8, ["hideButton", "hideTool", "followTheme", "model-value", "default-value", "start", "end", "color", "linear", "linearDeep"])) : createCommentVNode("v-if", true),
          createCommentVNode(" \u6309\u6708\u9009\u62E9 "),
          unref(_modelType) == "month" ? (openBlock(), createBlock(monthYear, {
            key: 3,
            hideButton: props.hideButton,
            hideTool: props.hideTool,
            followTheme: props.followTheme,
            ref_key: "Month",
            ref: Month,
            onConfirm: confirm,
            onClickMonth: click,
            onChange: change,
            "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => _value.value = $event),
            "model-value": _value.value,
            "default-value": _value.value,
            start: props.start,
            end: props.end,
            color: props.color,
            linear: props.linear,
            linearDeep: props.linearDeep
          }, null, 8, ["hideButton", "hideTool", "followTheme", "model-value", "default-value", "start", "end", "color", "linear", "linearDeep"])) : createCommentVNode("v-if", true),
          createCommentVNode(" \u6309\u5468\u9009\u62E9\u65F6\u6BB5 "),
          unref(_modelType) == "week" ? (openBlock(), createBlock(weekDay, {
            key: 4,
            hideButton: props.hideButton,
            hideTool: props.hideTool,
            followTheme: props.followTheme,
            ref_key: "Week",
            ref: Week,
            onConfirm: confirm,
            onClickWeek: click,
            onChange: change,
            "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => _value.value = $event),
            "model-value": _value.value,
            "default-value": _value.value,
            start: props.start,
            end: props.end,
            color: props.color,
            linear: props.linear,
            linearDeep: props.linearDeep
          }, null, 8, ["hideButton", "hideTool", "followTheme", "model-value", "default-value", "start", "end", "color", "linear", "linearDeep"])) : createCommentVNode("v-if", true)
        ]),
        _: 1
      });
    };
  }
});
var tmCalendarView = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-calendar-view/tm-calendar-view.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tm-calendar",
  props: __spreadProps(__spreadValues({}, custom_props), {
    show: {
      type: Boolean,
      default: false
    },
    defaultValue: {
      type: Array,
      default: () => []
    },
    modelValue: {
      type: Array,
      default: () => []
    },
    modelStr: {
      type: String,
      default: ""
    },
    model: {
      type: String,
      default: "day"
    },
    color: {
      type: String,
      default: "primary"
    },
    linear: {
      type: String,
      default: ""
    },
    linearDeep: {
      type: String,
      default: "light"
    },
    start: {
      type: [String, Number, Date],
      default: ""
    },
    end: {
      type: [String, Number, Date],
      default: ""
    },
    disabledDate: {
      type: Array,
      default: () => []
    },
    multiple: {
      type: Boolean,
      default: false
    },
    dateStyle: {
      type: Array,
      default: () => []
    },
    max: {
      type: Number,
      default: 999
    },
    round: {
      type: Number,
      default: 12
    },
    hideButton: {
      type: Boolean,
      default: false
    },
    hideTool: {
      type: Boolean,
      default: false
    }
  }),
  emits: ["update:modelValue", "update:modelStr", "update:show", "confirm", "click", "change", "cancel", "close", "open"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const drawer = ref(null);
    const calendarView = ref(null);
    const sysinfo = inject("tmuiSysInfo", computed(() => {
      return { bottom: 0, height: 750, width: uni.upx2px(750), top: 0, isCustomHeader: false, sysinfo: null };
    }));
    const _show = ref(props.show);
    const isConfirm = ref(false);
    const _value = ref(props.defaultValue);
    const _strvalue = ref(props.modelStr);
    const _modelType = computed(() => props.model);
    function close() {
      if (!isConfirm.value) {
        emits("cancel");
      }
      emits("close");
      emits("update:show", false);
      isConfirm.value = false;
      _show.value = false;
    }
    function open() {
      emits("open");
      emits("update:show", true);
      _show.value = true;
    }
    watchEffect(() => {
      emits("update:modelStr", _strvalue.value);
      emits("update:modelValue", _value.value);
    });
    watch(() => props.show, () => {
      var _a, _b;
      if (_show.value == props.show)
        return;
      if (drawer.value) {
        if (props.show) {
          (_a = drawer.value) == null ? void 0 : _a.open();
        } else {
          (_b = drawer.value) == null ? void 0 : _b.close();
        }
      }
    });
    onMounted(() => {
      var _a;
      if (props.show && drawer.value) {
        (_a = drawer.value) == null ? void 0 : _a.open();
      }
    });
    watch(() => props.modelValue, () => {
      _value.value = props.modelValue;
      _strvalue.value = _value.value.join("~");
    }, { deep: true });
    function change(e) {
      emits("change", e);
    }
    function onclick(e) {
      emits("click", e);
    }
    function confirm(e) {
      var _a;
      emits("confirm", e);
      (_a = drawer.value) == null ? void 0 : _a.close();
    }
    let win_bottom = computed(() => {
      if (props.hideButton) {
        return sysinfo.value.bottom - 80;
      }
      return sysinfo.value.bottom;
    });
    const dHeight = computed(() => {
      if (_modelType.value == "day")
        return 900 + win_bottom.value;
      if (_modelType.value == "rang")
        return 900 + win_bottom.value;
      if (_modelType.value == "week")
        return 740 + win_bottom.value;
      if (_modelType.value == "month")
        return 720 + win_bottom.value;
      if (_modelType.value == "year")
        return 620 + win_bottom.value;
      return 600 + win_bottom.value;
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(tmDrawer, {
        disabbleScroll: true,
        ref_key: "drawer",
        ref: drawer,
        round: props.round,
        height: unref(dHeight),
        onClose: close,
        onOpen: open,
        hideHeader: true
      }, {
        default: withCtx(() => [
          createElementVNode("view", { class: "mx-16 mt-24" }, [
            createVNode(tmCalendarView, {
              hideButton: props.hideButton,
              hideTool: props.hideTool,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _value.value = $event),
              "model-value": _value.value,
              "onUpdate:modelStr": _cache[1] || (_cache[1] = ($event) => _strvalue.value = $event),
              "model-str": _strvalue.value,
              "default-value": _value.value,
              onChange: change,
              onConfirm: confirm,
              onClick: onclick,
              model: props.model,
              color: props.color,
              linear: props.linear,
              linearDeep: props.linearDeep,
              start: props.start,
              end: props.end,
              disabledDate: props.disabledDate,
              multiple: props.multiple,
              dateStyle: props.dateStyle,
              max: props.max,
              ref_key: "calendarView",
              ref: calendarView
            }, null, 8, ["hideButton", "hideTool", "model-value", "model-str", "default-value", "model", "color", "linear", "linearDeep", "start", "end", "disabledDate", "multiple", "dateStyle", "max"])
          ])
        ]),
        _: 1
      }, 8, ["round", "height"]);
    };
  }
});
var tmCalendar = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-calendar/tm-calendar.vue"]]);
export { tmCalendarView as a, tmCalendar as t };
