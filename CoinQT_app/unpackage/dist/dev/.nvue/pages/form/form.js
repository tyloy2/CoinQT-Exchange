var __defProp = Object.defineProperty;
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
import { _ as _export_sfc, a as tmText, t as tmApp, g as formatAppLog } from "../../tm-text.js";
import { defineComponent, getCurrentInstance, ref, inject, computed, onUnmounted, provide, openBlock, createBlock, unref, withCtx, createElementVNode, normalizeClass, createElementBlock, normalizeStyle, createCommentVNode, createVNode, renderSlot, watchEffect, nextTick, toRaw, isProxy } from "vue";
import { t as tmInput } from "../../tm-input.js";
import { t as tmRadioGroup, a as tmRadio } from "../../tm-radio.js";
import { t as tmCheckboxGroup } from "../../tm-checkbox-group.js";
import { T as TmCheckbox } from "../../tm-checkbox.js";
import { t as tmRate } from "../../tm-rate.js";
import { t as tmSlider } from "../../tm-slider.js";
import { t as tmSegtab } from "../../tm-segtab.js";
import { T as TmSwitch } from "../../tm-switch.js";
import { t as tmUpload } from "../../tm-upload.js";
import { t as tmCalendar } from "../../tm-calendar.js";
import { t as tmCityPicker } from "../../tm-city-picker.js";
import { t as tmTimePicker } from "../../tm-time-picker.js";
import { t as tmPicker } from "../../tm-picker.js";
import { T as TmButton } from "../../tm-button.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmDivider } from "../../tm-divider.js";
import "pinia";
import "../../tm-icon.js";
import "../../tm-translate.js";
import "../../tm-image.js";
import "../../index2.js";
import "../../index3.js";
import "../../index4.js";
import "../../tm-drawer.js";
import "../../tm-overlay.js";
import "../../tm-picker-view.js";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "tm-form-item",
  props: {
    label: {
      type: String,
      default: ""
    },
    margin: {
      type: Array,
      default: () => [12, 12]
    },
    padding: {
      type: Array,
      default: () => [0, 0]
    },
    field: {
      type: String,
      default: ""
    },
    help: {
      type: String,
      default: ""
    },
    required: {
      type: Boolean,
      default: false
    },
    rules: {
      type: [Object, Array],
      default: () => {
        return [{ validator: false, required: false }];
      }
    },
    border: {
      type: Boolean,
      default: null
    },
    showError: {
      type: Boolean,
      default: true
    },
    requiredTitleChangeColor: {
      type: Boolean,
      default: true
    }
  },
  setup(__props, { expose }) {
    var _a, _b, _c;
    const props = __props;
    const proxy = (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const tmFormComnameFormItem = "tmFormComnameFormItem";
    const item = ref({
      label: "",
      field: props.field,
      value: null,
      isRequiredError: false,
      message: "",
      id: uni.$tm.u.getUid(1),
      componentsName: ""
    });
    const _required = ref(props.required);
    const tmFormLabelWidth = inject("tmFormLabelWidth", computed(() => 100));
    const tmFormLabelAlign = inject("tmFormLabelAlign", computed(() => "left"));
    const tmFormLayout = inject("tmFormLayout", computed(() => "horizontal"));
    const tmFormBorder_inject = inject("tmFormBorder", computed(() => true));
    const tmFormTransprent = inject("tmFormTransprent", computed(() => false));
    const tmFormBorder = computed(() => {
      if (props.border !== null && typeof props.border === "boolean")
        return props.border;
      return tmFormBorder_inject.value;
    });
    const _label = computed(() => props.label);
    let parent = proxy == null ? void 0 : proxy.$parent;
    while (parent) {
      if ((parent == null ? void 0 : parent.tmFormComnameId) == "tmFormId" || !parent) {
        break;
      } else {
        parent = (_c = parent == null ? void 0 : parent.$parent) != null ? _c : void 0;
      }
    }
    pushCom();
    onUnmounted(() => {
      delCom();
    });
    provide("tmFormItemRules", computed(() => {
      var _a2, _b2, _c2, _d, _e;
      let defaultrs = [];
      if (Array.isArray(props == null ? void 0 : props.rules)) {
        props == null ? void 0 : props.rules.forEach((el) => {
          var _a3, _b3;
          let isreq = (el == null ? void 0 : el.required) || props.required;
          defaultrs.push({
            message: (_a3 = el == null ? void 0 : el.message) != null ? _a3 : "\u8BF7\u586B\u5199\u5FC5\u8981\u7684\u5185\u5BB9",
            required: isreq,
            validator: (_b3 = el == null ? void 0 : el.validator) != null ? _b3 : false
          });
        });
      } else {
        defaultrs = [{
          message: (_b2 = (_a2 = props == null ? void 0 : props.rules) == null ? void 0 : _a2.message) != null ? _b2 : "\u8BF7\u586B\u5199\u5FC5\u8981\u7684\u5185\u5BB9",
          required: ((_c2 = props.rules) == null ? void 0 : _c2.required) || props.required,
          validator: (_e = (_d = props.rules) == null ? void 0 : _d.validator) != null ? _e : false
        }];
      }
      return defaultrs;
    }));
    function pushCom(itemComval) {
      if (parent) {
        item.value = __spreadValues(__spreadValues({}, item.value), itemComval != null ? itemComval : {});
        parent.pushKey(__spreadValues({}, item.value));
      }
    }
    function delCom() {
      if (parent) {
        parent.delKey(item.value);
      }
    }
    const tmFormFun = inject("tmFormFun", computed(() => ""));
    expose({ pushCom, delCom, tmFormComnameFormItem });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(tmSheet, {
        transprent: unref(tmFormTransprent),
        margin: props.margin,
        padding: props.padding
      }, {
        default: withCtx(() => [
          createElementVNode("view", {
            class: normalizeClass(["flex", unref(tmFormLayout) == "horizontal" ? "flex-row flex-row-center-start" : "flex-col"])
          }, [
            unref(_label) ? (openBlock(), createElementBlock("view", {
              key: 0,
              style: normalizeStyle([{ width: unref(tmFormLabelWidth) + "rpx" }]),
              class: normalizeClass(["mr-32 flex flex-row", [unref(tmFormLabelAlign) == "right" ? "flex-row-center-end" : "", unref(tmFormLayout) != "horizontal" ? "mb-24" : ""]])
            }, [
              _required.value ? (openBlock(), createBlock(tmText, {
                key: 0,
                color: "red",
                "font-size": 30,
                label: "*"
              })) : createCommentVNode("v-if", true),
              createVNode(tmText, {
                color: unref(tmFormFun) == "validate" && item.value.isRequiredError == true && props.requiredTitleChangeColor ? "red" : "",
                "font-size": 30,
                label: unref(_label)
              }, null, 8, ["color", "label"])
            ], 6)) : createCommentVNode("v-if", true),
            createElementVNode("view", {
              class: "flex-1",
              style: normalizeStyle([unref(tmFormLayout) == "horizontal" ? { width: "0px" } : ""])
            }, [
              createElementVNode("view", null, [
                renderSlot(_ctx.$slots, "default")
              ])
            ], 4)
          ], 2),
          unref(tmFormFun) == "validate" && item.value.isRequiredError == true && props.showError ? (openBlock(), createElementBlock("view", {
            key: 0,
            class: "pt-12"
          }, [
            createVNode(tmText, {
              color: "red",
              "font-size": 22,
              label: item.value.message
            }, null, 8, ["label"])
          ])) : createCommentVNode("v-if", true),
          unref(tmFormBorder) ? (openBlock(), createElementBlock("view", { key: 1 }, [
            createElementVNode("view", {
              class: normalizeClass([`mt-${props.margin[1] * 2}`])
            }, null, 2),
            createVNode(tmDivider, { margin: [0, 0] })
          ])) : createCommentVNode("v-if", true)
        ]),
        _: 3
      }, 8, ["transprent", "margin", "padding"]);
    };
  }
});
var tmFormItem = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-form-item/tm-form-item.vue"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "tm-form",
  props: {
    modelValue: {
      type: Object,
      default: () => {
        return {};
      },
      required: true
    },
    margin: {
      type: Array,
      default: () => [32, 24]
    },
    padding: {
      type: Array,
      default: () => [16, 0]
    },
    layout: {
      type: String,
      default: "horizontal"
    },
    labelWidth: {
      type: Number,
      default: 160
    },
    labelAlign: {
      type: String,
      default: "left"
    },
    border: {
      type: Boolean,
      default: true
    },
    transprent: {
      type: Boolean,
      default: false
    }
  },
  emits: ["submit", "reset", "validate", "clearValidate", "update:modelValue"],
  setup(__props, { expose, emit: emits }) {
    const props = __props;
    const _modelVal = ref({});
    const _backModelVal = __spreadValues({}, props.modelValue);
    watchEffect(() => _modelVal.value = props.modelValue);
    const _callBackModelVal = ref([]);
    const tmFormComnameId = "tmFormId";
    const safeFormCom = ref([
      "tm-radio-group",
      "tm-checkbox-box",
      "tm-input",
      "tm-rate",
      "tm-slider",
      "tm-segtab",
      "tm-switch",
      "tm-upload"
    ]);
    const formFunCallBack = ref("");
    provide("tmFormFun", computed(() => formFunCallBack.value));
    provide("tmFormLabelWidth", computed(() => props.labelWidth));
    provide("tmFormLabelAlign", computed(() => props.labelAlign));
    provide("tmFormLayout", computed(() => props.layout));
    provide("tmFormBorder", computed(() => props.border));
    provide("tmFormTransprent", computed(() => props.transprent));
    let timid = 56321326898746;
    function reset() {
      formFunCallBack.value = "";
      nextTick(() => {
        formFunCallBack.value = "reset";
        clearTimeout(timid);
        timid = setTimeout(function() {
          emits("reset");
          emits("update:modelValue", __spreadValues({}, _backModelVal));
        }, 200);
      });
    }
    function clearValidate() {
      formFunCallBack.value = "";
      nextTick(() => {
        formFunCallBack.value = "clearValidate";
        nextTick(() => {
          emits("clearValidate");
        });
      });
    }
    function submit() {
      formFunCallBack.value = "";
      nextTick(() => {
        formFunCallBack.value = "validate";
        let isPass = true;
        let par = toRaw(_callBackModelVal.value);
        uni.$tm.u.throttle(() => {
          for (let i = 0, len = par.length; i < len; i++) {
            if (par[i].isRequiredError == true) {
              isPass = false;
              break;
            }
          }
          let data = __spreadValues({}, _modelVal.value);
          par.forEach((el) => {
            setObjectVal(data, el.field, el.value);
          });
          emits("submit", { data, validate: isPass });
        }, 200, false);
      });
    }
    function validate() {
      formFunCallBack.value = "";
      nextTick(() => {
        formFunCallBack.value = "validate";
        nextTick(() => {
          emits("reset");
        });
      });
    }
    function pushKey(item) {
      if (item.componentsName == "" && !safeFormCom.value.includes(item.componentsName))
        return;
      let idsIndex = _callBackModelVal.value.findIndex((el) => el.id == item.id);
      if (idsIndex == -1) {
        _callBackModelVal.value.push(item);
      } else {
        _callBackModelVal.value[idsIndex] = item;
      }
    }
    function delKey(item) {
      let idsIndex = _callBackModelVal.value.findIndex((el) => el.id == item.id);
      if (idsIndex > -1) {
        _callBackModelVal.value.splice(idsIndex, 1);
      }
    }
    function setObjectVal(obj, field = "", val) {
      if (field == "")
        return obj;
      var arr = field.split(".");
      while (arr.length > 1) {
        let key = String(arr.shift());
        obj = isProxy(obj[key]) ? toRaw(obj[key]) : obj[key];
      }
      return obj[arr[0]] = isProxy(val) ? toRaw(val) : val;
    }
    expose({ reset, validate, clearValidate, submit, pushKey, delKey, tmFormComnameId });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(tmSheet, {
        transprent: props.transprent,
        round: 3,
        _class: "flex flex-col overflow",
        padding: props.padding,
        margin: props.margin
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["transprent", "padding", "margin"]);
    };
  }
});
var tmForm = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-form/tm-form.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "form",
  setup(__props) {
    getCurrentInstance();
    const app = ref(null);
    const form2 = ref(null);
    const showCal = ref(false);
    const showCity = ref(false);
    const showTimePickerView = ref(false);
    const showPicker = ref(false);
    const pickerlist = ref([
      {
        text: "\u82F9\u679C"
      },
      {
        text: "\u9999\u8549"
      },
      {
        text: "\u674E\u5B50"
      },
      {
        text: "\u6930\u5B50"
      }
    ]);
    const show = ref({
      cale: ["2022-1-4"],
      time: "2022-1-9",
      timeStr: "2022-1-5",
      radio: "",
      pickerIndex: [],
      pickerStr: "",
      checkbox: [],
      rate: 0,
      slider: [0, 50],
      segtab: "",
      switch: false,
      upload: [],
      city: [],
      cityStr: "",
      nameuser: {
        a: ""
      }
    });
    const confirm = (e) => {
      formatAppLog("log", "at pages/form/form.nvue:163", e);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("scroll-view", {
        scrollY: true,
        showScrollbar: true,
        enableBackToTop: true,
        bubble: "true",
        style: { flexDirection: "column" }
      }, [
        createVNode(tmApp, {
          ref_key: "app",
          ref: app,
          color: "grey-5"
        }, {
          default: withCtx(() => [
            createVNode(tmForm, {
              onSubmit: confirm,
              ref_key: "form",
              ref: form2,
              modelValue: show.value,
              "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => show.value = $event)
            }, {
              default: withCtx(() => [
                createVNode(tmFormItem, {
                  label: "\u8EAB\u4EFD\u8BC1\u53F7\u7801",
                  field: "nameuser.a",
                  rules: [{ required: true, message: "\u8BF7\u8F93\u516566", validator: (val) => val == "66" }]
                }, {
                  default: withCtx(() => [
                    createVNode(tmInput, {
                      inputPadding: [0, 0],
                      modelValue: show.value.nameuser.a,
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => show.value.nameuser.a = $event),
                      transprent: true,
                      showBottomBotder: false
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["rules"]),
                createVNode(tmFormItem, {
                  label: "\u9009\u62E9\u65E5\u671F",
                  field: "cale",
                  rules: [{ required: true, message: "\u8BF7\u9009\u62E9\u65E5\u671F\u54E6" }]
                }, {
                  default: withCtx(() => [
                    createVNode(tmInput, {
                      inputPadding: [0, 0],
                      "model-value": show.value.cale[0],
                      onClick: _cache[1] || (_cache[1] = ($event) => showCal.value = !showCal.value),
                      suffix: "tmicon-angle-right",
                      placeholder: "\u8BF7\u9009\u62E9\u6709\u6548\u65E5\u671F",
                      disabled: "",
                      transprent: true,
                      showBottomBotder: false
                    }, null, 8, ["model-value"])
                  ]),
                  _: 1
                }),
                createVNode(tmFormItem, {
                  label: "\u9009\u62E9\u5730\u533A",
                  field: "city",
                  rules: [{ required: true, message: "\u8BF7\u9009\u62E9\u5730\u533A" }]
                }, {
                  default: withCtx(() => [
                    createVNode(tmInput, {
                      inputPadding: [0, 0],
                      "model-value": show.value.cityStr,
                      onClick: _cache[2] || (_cache[2] = ($event) => showCity.value = !showCity.value),
                      suffix: "tmicon-angle-right",
                      placeholder: "\u8BF7\u9009\u62E9\u6240\u5728\u5730\u533A\u5730\u5740",
                      disabled: "",
                      transprent: true,
                      showBottomBotder: false
                    }, null, 8, ["model-value"])
                  ]),
                  _: 1
                }),
                createVNode(tmFormItem, {
                  label: "\u65F6\u95F4\u9009\u62E9",
                  field: "time",
                  rules: [{ required: true, message: "\u8BF7\u9009\u62E9\u65F6\u95F4" }]
                }, {
                  default: withCtx(() => [
                    createVNode(tmInput, {
                      inputPadding: [0, 0],
                      modelValue: show.value.timeStr,
                      "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => show.value.timeStr = $event),
                      onClick: _cache[4] || (_cache[4] = ($event) => showTimePickerView.value = !showTimePickerView.value),
                      suffix: "tmicon-angle-right",
                      placeholder: "\u8BF7\u9009\u62E9\u65F6\u95F4",
                      disabled: "",
                      transprent: true,
                      showBottomBotder: false
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(tmFormItem, {
                  label: "\u5F39\u51FA\u9009\u62E9",
                  field: "time",
                  rules: [{ required: true, message: "\u8BF7\u9009\u62E9\u6C34\u679C\u79CD\u7C7B" }]
                }, {
                  default: withCtx(() => [
                    createVNode(tmInput, {
                      inputPadding: [0, 0],
                      "model-value": show.value.pickerStr,
                      onClick: _cache[5] || (_cache[5] = ($event) => showPicker.value = !showPicker.value),
                      suffix: "tmicon-angle-right",
                      placeholder: "\u8BF7\u9009\u62E9\u4F60\u7684\u6C34\u679C\u79CD\u7C7B",
                      disabled: "",
                      transprent: true,
                      showBottomBotder: false
                    }, null, 8, ["model-value"])
                  ]),
                  _: 1
                }),
                createVNode(tmFormItem, {
                  label: "\u9009\u62E9\u6C34\u679C",
                  field: "radio",
                  rules: [{ required: true, message: "\u8BF7\u9009\u62E9\u6C34\u679C" }]
                }, {
                  default: withCtx(() => [
                    createVNode(tmRadioGroup, {
                      modelValue: show.value.radio,
                      "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => show.value.radio = $event)
                    }, {
                      default: withCtx(() => [
                        createVNode(tmRadio, {
                          label: "\u82F9\u679C",
                          value: "apple"
                        }),
                        createVNode(tmRadio, {
                          label: "\u9999\u7126",
                          value: "bonaer"
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(tmFormItem, {
                  label: "\u591A\u9009\u6C34\u679C\u79CD\u7C7B",
                  field: "checkbox",
                  rules: [{ required: true, message: "\u8BF7\u9009\u62E9" }]
                }, {
                  default: withCtx(() => [
                    createVNode(tmCheckboxGroup, {
                      modelValue: show.value.checkbox,
                      "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => show.value.checkbox = $event)
                    }, {
                      default: withCtx(() => [
                        createVNode(TmCheckbox, {
                          label: "\u82F9\u679C",
                          value: "apple"
                        }),
                        createVNode(TmCheckbox, {
                          label: "\u9999\u7126",
                          value: "bonaer"
                        }),
                        createVNode(TmCheckbox, {
                          label: "\u9999\u7126",
                          value: "bonaer2"
                        }),
                        createVNode(TmCheckbox, {
                          label: "\u9999\u7126",
                          value: "bonaer3"
                        }),
                        createVNode(TmCheckbox, {
                          label: "\u9999\u7126",
                          value: "bonaer4"
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(tmFormItem, {
                  label: "\u8BC4\u5206",
                  field: "rate",
                  rules: [{ required: true, message: "\u8BF7\u9009\u62E9" }]
                }, {
                  default: withCtx(() => [
                    createVNode(tmRate, {
                      modelValue: show.value.rate,
                      "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => show.value.rate = $event)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(tmFormItem, {
                  label: "\u4EF7\u683C\u9009\u62E9",
                  field: "slider",
                  rules: [{ required: true, message: "\u8BF7\u9009\u62E9", validator: (val) => val.reduce((a, b) => Math.abs(a - b)) !== 0 }]
                }, {
                  default: withCtx(() => [
                    createVNode(tmSlider, {
                      width: 450,
                      modelValue: show.value.slider,
                      "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => show.value.slider = $event),
                      "default-value": show.value.slider
                    }, null, 8, ["modelValue", "default-value"])
                  ]),
                  _: 1
                }, 8, ["rules"]),
                createVNode(tmFormItem, {
                  label: "\u5206\u5272\u9009\u62E9",
                  field: "segtab",
                  rules: [{ required: true, message: "\u8BF7\u9009\u62E9" }]
                }, {
                  default: withCtx(() => [
                    createVNode(tmSegtab, {
                      width: 420,
                      list: [{ text: "\u82F9\u679C" }, { text: "\u9999\u8549" }],
                      modelValue: show.value.segtab,
                      "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => show.value.segtab = $event),
                      "default-value": show.value.segtab
                    }, null, 8, ["modelValue", "default-value"])
                  ]),
                  _: 1
                }),
                createVNode(tmFormItem, {
                  label: "\u5F00\u5173",
                  field: "switch",
                  rules: { required: true, message: "\u8BF7\u9009\u62E9" }
                }, {
                  default: withCtx(() => [
                    createVNode(TmSwitch, {
                      modelValue: show.value.switch,
                      "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => show.value.switch = $event)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(tmFormItem, {
                  label: "\u4E0A\u4F20\u622A\u56FE",
                  field: "upload",
                  rules: { required: true, message: "\u8BF7\u4E0A\u4F20" }
                }, {
                  default: withCtx(() => [
                    createVNode(tmUpload, {
                      rows: 3,
                      width: 420,
                      url: "https://mockapi.eolink.com/tNYKNA7ac71aa90bcbe83c5815871a5b419601e96a5524d/upload",
                      modelValue: show.value.upload,
                      "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => show.value.upload = $event)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(tmFormItem, { border: false }, {
                  default: withCtx(() => [
                    createElementVNode("view", { class: "flex flex-row" }, [
                      createElementVNode("view", { class: "flex-1 mr-32" }, [
                        createVNode(TmButton, {
                          "form-type": "submit",
                          label: "\u63D0\u4EA4\u8868\u5355",
                          block: ""
                        })
                      ]),
                      createElementVNode("view", { class: "flex-1" }, [
                        createVNode(TmButton, {
                          shadow: 0,
                          text: "",
                          "form-type": "reset",
                          label: "\u91CD\u7F6E\u8868\u5355",
                          block: ""
                        })
                      ])
                    ])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["modelValue"]),
            createVNode(tmCalendar, {
              modelValue: show.value.cale,
              "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => show.value.cale = $event),
              show: showCal.value,
              "onUpdate:show": _cache[15] || (_cache[15] = ($event) => showCal.value = $event),
              "default-value": show.value.cale
            }, null, 8, ["modelValue", "show", "default-value"]),
            createVNode(tmCityPicker, {
              modelValue: show.value.city,
              "onUpdate:modelValue": _cache[16] || (_cache[16] = ($event) => show.value.city = $event),
              "model-str": show.value.cityStr,
              "onUpdate:model-str": _cache[17] || (_cache[17] = ($event) => show.value.cityStr = $event),
              show: showCity.value,
              "onUpdate:show": _cache[18] || (_cache[18] = ($event) => showCity.value = $event),
              "default-value": show.value.city
            }, null, 8, ["modelValue", "model-str", "show", "default-value"]),
            createVNode(tmTimePicker, {
              modelValue: show.value.time,
              "onUpdate:modelValue": _cache[19] || (_cache[19] = ($event) => show.value.time = $event),
              "model-str": show.value.timeStr,
              "onUpdate:model-str": _cache[20] || (_cache[20] = ($event) => show.value.timeStr = $event),
              show: showTimePickerView.value,
              "onUpdate:show": _cache[21] || (_cache[21] = ($event) => showTimePickerView.value = $event),
              "default-value": show.value.timeStr
            }, null, 8, ["modelValue", "model-str", "show", "default-value"]),
            createVNode(tmPicker, {
              columns: pickerlist.value,
              modelValue: show.value.pickerIndex,
              "onUpdate:modelValue": _cache[22] || (_cache[22] = ($event) => show.value.pickerIndex = $event),
              "model-str": show.value.pickerStr,
              "onUpdate:model-str": _cache[23] || (_cache[23] = ($event) => show.value.pickerStr = $event),
              show: showPicker.value,
              "onUpdate:show": _cache[24] || (_cache[24] = ($event) => showPicker.value = $event),
              "default-value": show.value.pickerIndex
            }, null, 8, ["columns", "modelValue", "model-str", "show", "default-value"])
          ]),
          _: 1
        }, 512)
      ]);
    };
  }
});
var form = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/form/form.nvue"]]);
export { form as default };
