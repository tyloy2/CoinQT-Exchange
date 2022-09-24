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
import { defineComponent, getCurrentInstance, ref, computed, watch, onMounted, nextTick, onUpdated, resolveComponent, openBlock, createElementBlock, Fragment, createCommentVNode, createElementVNode, normalizeStyle, createVNode, withCtx, renderList, createBlock, unref, toRaw, inject, watchEffect } from "vue";
import { _ as _export_sfc, r as requireNativePlugin, u as useTmpiniaStore, a as tmText, c as custom_props } from "./tm-text.js";
import { d as dayjs, i as isSameOrBefore } from "./index2.js";
import { a as isBetween, i as isSameOrAfter } from "./index4.js";
import { t as tmDrawer } from "./tm-drawer.js";
import { T as TmButton } from "./tm-button.js";
var timeDetailType = /* @__PURE__ */ ((timeDetailType2) => {
  timeDetailType2["year"] = "year";
  timeDetailType2["month"] = "month";
  timeDetailType2["day"] = "date";
  timeDetailType2["hour"] = "hour";
  timeDetailType2["minute"] = "minute";
  timeDetailType2["second"] = "second";
  return timeDetailType2;
})(timeDetailType || {});
var _style_0 = { "top": { "": { "backgroundImage": "linear-gradient(to bottom,rgba(17, 17, 17, 1),rgba(36, 36, 36, 0.6))" } }, "bottom": { "": { "backgroundImage": "linear-gradient(to top,rgba(17, 17, 17, 1),rgba(36, 36, 36, 0.6))" } } };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "time-panel",
  props: {
    nowtime: {
      type: String,
      default: "",
      required: true
    },
    start: {
      type: String,
      default: "",
      required: true
    },
    end: {
      type: String,
      default: "",
      required: true
    },
    timeType: {
      type: String,
      default: "year",
      required: true
    },
    disabledDate: {
      type: Array,
      default: () => []
    },
    height: {
      type: Number,
      default: 600
    },
    suffix: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    var _a;
    const props = __props;
    const dom = requireNativePlugin("dom");
    dayjs.extend(isBetween);
    dayjs.extend(isSameOrBefore);
    dayjs.extend(isSameOrAfter);
    const DayJs = dayjs;
    const { proxy } = getCurrentInstance();
    const store = useTmpiniaStore();
    let parent = proxy.$parent;
    while (parent) {
      if ((parent == null ? void 0 : parent.tmTimeViewName) == "tmTimeViewName" || !parent) {
        break;
      } else {
        parent = (_a = parent == null ? void 0 : parent.$parent) != null ? _a : void 0;
      }
    }
    const tmArray = ref([]);
    const _nowtimeValue = computed(() => DayJs(props.nowtime));
    const colIndex = ref(0);
    const isDark = computed(() => store.tmStore.dark);
    const maskHeight = computed(() => {
      return (uni.upx2px(props.height) - 34) / 2;
    });
    const maskWidth = ref(0);
    computed(() => {
      let str_white = "background-image:linear-gradient(rgba(255,255,255,0.95),rgba(255,255,255,0.6)),linear-gradient(rgba(255,255,255,0.6),rgba(255,255,255,0.95))";
      let str_black = "background-image:linear-gradient(rgba(17, 17, 17, 1.0),rgba(106, 106, 106, 0.2)),linear-gradient(rgba(106, 106, 106, 0.2),rgba(17, 17, 17, 1.0))";
      str_black = "background-image: linear-gradient(to bottom,rgba(30, 30, 30, 0.9),rgba(104, 104, 104, 0.6))";
      if (!isDark.value) {
        return str_white;
      }
      return str_black;
    });
    watch([() => props.start, () => props.end], () => {
      rangeTimeArray();
    });
    watch([() => props.nowtime], (newval, oldval) => {
      if (DayJs(String(oldval)).isSame(String(newval), props.timeType)) {
        return;
      }
      rangeTimeArray();
    });
    onMounted(() => {
      nvuegetClientRect();
      nextTick(() => {
        setTimeout(() => {
          rangeTimeArray();
        }, 60);
      });
    });
    onUpdated(() => nvuegetClientRect());
    function getIndexNow() {
      let index = tmArray.value.findIndex((el) => el == _nowtimeValue.value[props.timeType]());
      if (index == -1)
        index = 0;
      if (index >= tmArray.value.length)
        index = tmArray.value.length - 1;
      colIndex.value = index;
    }
    function rangeTimeArray() {
      let _start = DayJs(props.start);
      let _end = DayJs(props.end);
      let intdate = 0;
      if (props.timeType == "date") {
        intdate = 1;
      }
      if (props.timeType == "year") {
        intdate = _start.year();
      }
      if (props.timeType == "year") {
        tmArray.value = rangeNumber(intdate, _end.year());
      } else if (props.timeType == "month") {
        setd(timeDetailType.year, false);
      } else if (props.timeType == "date") {
        setd(timeDetailType.month, false);
      } else if (props.timeType == "hour") {
        setd(timeDetailType.day, false);
      } else if (props.timeType == "minute") {
        setd(timeDetailType.hour, false);
      } else if (props.timeType == "second") {
        setd(timeDetailType.minute, false);
      } else if (props.timeType == "second") {
        setd(timeDetailType.second, false);
      }
      function setd(type, isno = true) {
        if (_nowtimeValue.value.isSameOrBefore(_start, type)) {
          intdate = _start[props.timeType]();
          tmArray.value = rangeNumber(intdate, getEndNumber(_start, true));
        } else if (_nowtimeValue.value.isSameOrAfter(_end, type)) {
          tmArray.value = rangeNumber(intdate, getEndNumber(_end, isno));
        } else if (_nowtimeValue.value.isBetween(_start, _end, props.timeType, "()")) {
          tmArray.value = rangeNumber(intdate, getEndNumber(_nowtimeValue.value, true));
        }
      }
      nextTick(() => getIndexNow());
    }
    function getEndNumber(d, isno = true) {
      DayJs(props.start);
      let _end = DayJs(props.end);
      let jh = {
        year: _end.year(),
        month: 11,
        date: d.daysInMonth(),
        hour: 23,
        minute: 59,
        second: 59
      };
      if (isno)
        return jh[props.timeType];
      return d[props.timeType]();
    }
    function rangeNumber(from = 0, to = 0) {
      let range = [];
      from = from >= 0 ? from : 1;
      for (let i = from; i <= to; i++) {
        range.push(i);
      }
      return range;
    }
    function colchange(e) {
      if (tmArray.value.length == 0)
        return;
      parent == null ? void 0 : parent.setNowtime(tmArray.value[e.detail.value[0]], props.timeType);
    }
    function nvuegetClientRect() {
      nextTick(function() {
        dom.getComponentRect(proxy.$refs.picker, function(res) {
          if (res == null ? void 0 : res.size) {
            maskWidth.value = res.size.width;
            if (res.size.width == 0) {
              nvuegetClientRect();
            }
          }
        });
      });
    }
    return (_ctx, _cache) => {
      const _component_picker_view_column = resolveComponent("picker-view-column");
      const _component_picker_view = resolveComponent("picker-view");
      return openBlock(), createElementBlock(Fragment, null, [
        createCommentVNode(" background:linear-gradient(180deg,rgba(255,255,255,0.95),rgba(255,255,255,0.6)),linear-gradient(0deg, rgba(255,255,255,0.95), rgba(255,255,255,0.6)) "),
        createCommentVNode(` :mask-style="isDark?'background:linear-gradient(0deg,rgba(0,0,0,0.4),rgba(0,0,0,0),rgba(0,0,0,0.4))':'background:rgba(255,255,255,0)'" `),
        createElementVNode("view", {
          class: "flex-1 relative",
          style: normalizeStyle({ height: props.height + "rpx" })
        }, [
          createVNode(_component_picker_view, {
            ref: "picker",
            value: [colIndex.value],
            onChange: colchange,
            style: normalizeStyle([{ height: props.height + "rpx" }])
          }, {
            default: withCtx(() => [
              createVNode(_component_picker_view_column, {
                style: normalizeStyle([{ height: props.height + "rpx" }])
              }, {
                default: withCtx(() => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(tmArray.value, (item, index) => {
                    return openBlock(), createElementBlock("view", {
                      key: index,
                      class: "flex",
                      style: { "justify-content": "center", "height": "34px", "align-items": "center" }
                    }, [
                      props.timeType != "month" ? (openBlock(), createBlock(tmText, {
                        key: 0,
                        "font-size": 30,
                        dark: unref(isDark),
                        label: item + props.suffix
                      }, null, 8, ["dark", "label"])) : createCommentVNode("v-if", true),
                      props.timeType == "month" ? (openBlock(), createBlock(tmText, {
                        key: 1,
                        "font-size": 30,
                        dark: unref(isDark),
                        label: item + 1 + props.suffix
                      }, null, 8, ["dark", "label"])) : createCommentVNode("v-if", true)
                    ]);
                  }), 128))
                ]),
                _: 1
              }, 8, ["style"])
            ]),
            _: 1
          }, 8, ["value", "style"]),
          unref(isDark) ? (openBlock(), createElementBlock("view", {
            key: 0,
            userInteractionEnabled: false,
            class: "top absolute l-0 t-0",
            style: normalizeStyle({ height: unref(maskHeight) + "px", width: maskWidth.value + "px" })
          }, null, 4)) : createCommentVNode("v-if", true),
          unref(isDark) ? (openBlock(), createElementBlock("view", {
            key: 1,
            userInteractionEnabled: false,
            class: "bottom absolute l-0 b-0",
            style: normalizeStyle({ height: unref(maskHeight) + "px", width: maskWidth.value + "px" })
          }, null, 4)) : createCommentVNode("v-if", true)
        ], 4)
      ], 2112);
    };
  }
});
var timePanelVue = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["styles", [_style_0]], ["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-time-view/time-panel.vue"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "tm-time-view",
  props: {
    modelValue: {
      type: [Number, String, Date],
      default: ""
    },
    modelStr: {
      type: [String],
      default: ""
    },
    defaultValue: {
      type: [Number, String, Date],
      default: ""
    },
    disabledDate: {
      type: Array,
      default: () => []
    },
    format: {
      type: String,
      default: "YYYY/MM/DD"
    },
    showDetail: {
      type: Object,
      default: () => {
        return {
          year: true,
          month: true,
          day: true,
          hour: false,
          minute: false,
          second: false
        };
      }
    },
    showSuffix: {
      type: Object,
      default: () => {
        return {
          year: "\u5E74",
          month: "\u6708",
          day: "\u65E5",
          hour: "\u65F6",
          minute: "\u5206",
          second: "\u79D2"
        };
      }
    },
    start: {
      type: [Number, String, Date],
      default: "2008/01/01 00:00:00"
    },
    end: {
      type: [Number, String, Date],
      default: ""
    },
    height: {
      type: Number,
      default: 300
    }
  },
  emits: ["update:modelValue", "update:modelStr", "change"],
  setup(__props, { expose, emit: emits }) {
    const props = __props;
    const tmTimeViewName = "tmTimeViewName";
    const DayJs = dayjs;
    const _nowtime = ref(DayJs(props.defaultValue).isValid() ? DayJs(props.defaultValue) : DayJs());
    const _nowtimeValue = computed(() => _nowtime.value.format());
    const _startTime = computed(() => {
      return DayJs(props.start).isValid() ? DayJs(props.start).format() : DayJs("2008/01/01 00:00:00").format();
    });
    const _endTime = computed(() => {
      return DayJs(props.end).isValid() ? DayJs(props.end).format() : DayJs().format();
    });
    const showCol = computed(() => props.showDetail);
    function setNowtime(data, type) {
      let d = DayJs(toRaw(_nowtime.value));
      const old = _nowtimeValue.value;
      _nowtime.value = DayJs(d[type](data));
      if (isDisabledDate(_nowtime.value.format())) {
        nextTick(() => _nowtime.value = DayJs(old));
        return;
      }
      emits("update:modelValue", _nowtime.value.format("YYYY/MM/DD HH:mm:ss"));
      emits("update:modelStr", _nowtime.value.format(props.format));
      emits("change", _nowtime.value.format(props.format));
    }
    function isDisabledDate(nowtime) {
      let d = DayJs(nowtime);
      let len = props.disabledDate.filter((el) => {
        return d.isSame(el, timeDetailType.day);
      });
      return len.length > 0;
    }
    watch(() => props.modelValue, (newval, oldval) => {
      if (DayJs(props.modelValue).isValid() == false || !oldval)
        return;
      _nowtime.value = DayJs(props.modelValue);
      emits("update:modelStr", _nowtime.value.format(props.format));
    });
    onMounted(() => {
      nextTick(() => {
        emits("update:modelValue", _nowtime.value.format(props.format));
        emits("update:modelStr", _nowtime.value.format(props.format));
      });
    });
    expose({ tmTimeViewName, setNowtime });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        class: "flex flex-row",
        renderWhole: true
      }, [
        unref(showCol).year ? (openBlock(), createBlock(timePanelVue, {
          key: 0,
          suffix: props.showSuffix.year,
          height: props.height,
          disabledDate: props.disabledDate,
          "time-type": unref(timeDetailType).year,
          start: unref(_startTime),
          end: unref(_endTime),
          nowtime: unref(_nowtimeValue),
          class: "flex-1"
        }, null, 8, ["suffix", "height", "disabledDate", "time-type", "start", "end", "nowtime"])) : createCommentVNode("v-if", true),
        unref(showCol).month ? (openBlock(), createBlock(timePanelVue, {
          key: 1,
          suffix: props.showSuffix.month,
          height: props.height,
          disabledDate: props.disabledDate,
          "time-type": unref(timeDetailType).month,
          start: unref(_startTime),
          end: unref(_endTime),
          nowtime: unref(_nowtimeValue),
          class: "flex-1"
        }, null, 8, ["suffix", "height", "disabledDate", "time-type", "start", "end", "nowtime"])) : createCommentVNode("v-if", true),
        unref(showCol).day ? (openBlock(), createBlock(timePanelVue, {
          key: 2,
          suffix: props.showSuffix.day,
          height: props.height,
          disabledDate: props.disabledDate,
          "time-type": unref(timeDetailType).day,
          start: unref(_startTime),
          end: unref(_endTime),
          nowtime: unref(_nowtimeValue),
          class: "flex-1"
        }, null, 8, ["suffix", "height", "disabledDate", "time-type", "start", "end", "nowtime"])) : createCommentVNode("v-if", true),
        unref(showCol).hour ? (openBlock(), createBlock(timePanelVue, {
          key: 3,
          suffix: props.showSuffix.hour,
          height: props.height,
          disabledDate: props.disabledDate,
          "time-type": unref(timeDetailType).hour,
          start: unref(_startTime),
          end: unref(_endTime),
          nowtime: unref(_nowtimeValue),
          class: "flex-1"
        }, null, 8, ["suffix", "height", "disabledDate", "time-type", "start", "end", "nowtime"])) : createCommentVNode("v-if", true),
        unref(showCol).minute ? (openBlock(), createBlock(timePanelVue, {
          key: 4,
          suffix: props.showSuffix.minute,
          height: props.height,
          disabledDate: props.disabledDate,
          "time-type": unref(timeDetailType).minute,
          start: unref(_startTime),
          end: unref(_endTime),
          nowtime: unref(_nowtimeValue),
          class: "flex-1"
        }, null, 8, ["suffix", "height", "disabledDate", "time-type", "start", "end", "nowtime"])) : createCommentVNode("v-if", true),
        unref(showCol).second ? (openBlock(), createBlock(timePanelVue, {
          key: 5,
          suffix: props.showSuffix.second,
          height: props.height,
          disabledDate: props.disabledDate,
          "time-type": unref(timeDetailType).second,
          start: unref(_startTime),
          end: unref(_endTime),
          nowtime: unref(_nowtimeValue),
          class: "flex-1"
        }, null, 8, ["suffix", "height", "disabledDate", "time-type", "start", "end", "nowtime"])) : createCommentVNode("v-if", true)
      ]);
    };
  }
});
var tmTimeView = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-time-view/tm-time-view.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tm-time-picker",
  props: __spreadProps(__spreadValues({}, custom_props), {
    show: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: [Number, String, Date],
      default: ""
    },
    modelStr: {
      type: [String],
      default: ""
    },
    defaultValue: {
      type: [Number, String, Date],
      default: ""
    },
    disabledDate: {
      type: Array,
      default: () => []
    },
    format: {
      type: String,
      default: "YYYY/MM/DD"
    },
    showDetail: {
      type: Object,
      default: () => {
        return {
          year: true,
          month: true,
          day: true,
          hour: false,
          minute: false,
          second: false
        };
      }
    },
    showSuffix: {
      type: Object,
      default: () => {
        return {
          year: "\u5E74",
          month: "\u6708",
          day: "\u65E5",
          hour: "\u65F6",
          minute: "\u5206",
          second: "\u79D2"
        };
      }
    },
    start: {
      type: [Number, String, Date],
      default: "2008/01/01 00:00:00"
    },
    end: {
      type: [Number, String, Date],
      default: ""
    },
    height: {
      type: Number,
      default: 700
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
    btnRound: {
      type: Number,
      default: 3
    },
    round: {
      type: Number,
      default: 12
    }
  }),
  emits: ["update:modelValue", "update:modelStr", "update:show", "confirm", "change", "cancel", "close", "open"],
  setup(__props, { emit: emits }) {
    var _a, _b;
    const props = __props;
    (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const drawer = ref(null);
    const _show = ref(props.show);
    const isConfirm = ref(false);
    const _value = ref(props.defaultValue);
    const _strvalue = ref("");
    const sysinfo = inject("tmuiSysInfo", computed(() => {
      return { bottom: 0, height: 750, width: uni.upx2px(750), top: 0, isCustomHeader: false, sysinfo: null };
    }));
    function close() {
      if (!isConfirm.value) {
        emits("cancel");
        _value.value = "";
        nextTick(() => {
          _value.value = props.modelValue ? props.modelValue : props.defaultValue;
        });
      }
      emits("close");
      emits("update:show", false);
      isConfirm.value = false;
    }
    function open() {
      emits("open");
    }
    watchEffect(() => {
      _show.value = props.show;
    });
    watch(() => props.modelValue, () => {
      _value.value = props.modelValue;
    }, { deep: true });
    function change(e) {
      emits("change", e);
    }
    function confirm() {
      var _a2;
      emits("confirm", _value.value);
      emits("update:modelValue", _value.value);
      emits("update:modelStr", _strvalue.value);
      isConfirm.value = true;
      (_a2 = drawer.value) == null ? void 0 : _a2.close();
    }
    const dHeight = computed(() => {
      return props.height + sysinfo.value.bottom + 80;
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(tmDrawer, {
        disabbleScroll: true,
        round: props.round,
        ref_key: "drawer",
        ref: drawer,
        height: unref(dHeight),
        "onUpdate:show": _cache[2] || (_cache[2] = ($event) => _show.value = $event),
        show: _show.value,
        onClose: close,
        "ok-color": props.color,
        onOpen: open,
        title: "\u8BF7\u9009\u62E9\u65F6\u95F4",
        closable: true,
        onOk: confirm
      }, {
        default: withCtx(() => [
          createVNode(tmTimeView, {
            height: unref(dHeight) - 230,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _value.value = $event),
            "model-value": _value.value,
            "onUpdate:modelStr": _cache[1] || (_cache[1] = ($event) => _strvalue.value = $event),
            "model-str": _strvalue.value,
            "default-value": _value.value,
            onChange: change,
            disabledDate: props.disabledDate,
            format: props.format,
            showDetail: props.showDetail,
            showSuffix: props.showSuffix,
            start: props.start,
            end: props.end
          }, null, 8, ["height", "model-value", "model-str", "default-value", "disabledDate", "format", "showDetail", "showSuffix", "start", "end"]),
          createVNode(TmButton, {
            label: "\u786E\u8BA4\u9009\u62E9",
            block: "",
            margin: [32, 12],
            color: props.color,
            linear: props.linear,
            "linear-deep": props.linearDeep,
            onClick: confirm,
            round: props.btnRound
          }, null, 8, ["color", "linear", "linear-deep", "round"]),
          createElementVNode("view", {
            style: normalizeStyle({ height: unref(sysinfo).bottom + "px" })
          }, null, 4)
        ]),
        _: 1
      }, 8, ["round", "height", "show", "ok-color"]);
    };
  }
});
var tmTimePicker = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-time-picker/tm-time-picker.vue"]]);
export { tmTimeView as a, tmTimePicker as t };
