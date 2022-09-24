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
import { defineComponent, getCurrentInstance, ref, computed, watch, inject, openBlock, createBlock, withCtx, createVNode, unref, createElementVNode, normalizeClass, normalizeStyle, createElementBlock, createCommentVNode, renderSlot, withModifiers, toRaw } from "vue";
import { t as tmSheet } from "./tm-sheet.js";
import { t as tmIcon } from "./tm-icon.js";
import { _ as _export_sfc, c as custom_props, u as useTmpiniaStore, b as computedStyle, d as computedClass, e as computedDark, f as computedTheme, a as tmText } from "./tm-text.js";
import { T as TmButton } from "./tm-button.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tm-input",
  props: __spreadProps(__spreadValues({}, custom_props), {
    followTheme: {
      type: [Boolean, String],
      default: true
    },
    color: {
      type: String,
      default: "grey-4"
    },
    focusColor: {
      type: String,
      default: "primary"
    },
    fontColor: {
      type: String,
      default: ""
    },
    text: {
      type: Boolean,
      default: true
    },
    outlined: {
      type: Boolean,
      default: false
    },
    border: {
      type: Number,
      default: 0
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
      default: 0
    },
    margin: {
      type: Array,
      default: () => [0, 0]
    },
    padding: {
      type: Array,
      default: () => [0, 0]
    },
    height: {
      type: Number,
      default: 64
    },
    prefix: {
      type: String,
      default: ""
    },
    prefixLabel: {
      type: String,
      default: ""
    },
    suffix: {
      type: String,
      default: ""
    },
    suffixLabel: {
      type: String,
      default: ""
    },
    fontSize: {
      type: Number,
      default: 30
    },
    search: {
      type: String,
      default: ""
    },
    searchLabel: {
      type: String,
      default: ""
    },
    showClear: {
      type: Boolean,
      default: false
    },
    password: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: "\u8BF7\u8F93\u5165\u5185\u5BB9"
    },
    errorLabel: {
      type: String,
      default: "\u8BF7\u8F93\u5165\u5185\u5BB9"
    },
    align: {
      type: String,
      default: "left"
    },
    modelValue: {
      type: [String, Number],
      default: ""
    },
    inputPadding: {
      type: Array,
      default: () => [24, 0]
    },
    showCharNumber: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: Number,
      default: -1
    },
    type: {
      type: String,
      default: "text"
    },
    cursorSpacing: {
      type: Number,
      default: 24
    },
    confirmType: {
      type: String,
      default: "done"
    },
    confirmHold: {
      type: Boolean,
      default: false
    },
    autoBlur: {
      type: Boolean,
      default: true
    },
    holdKeyboard: {
      type: Boolean,
      default: false
    },
    adjustPosition: {
      type: Boolean,
      default: true
    },
    focus: {
      type: Boolean,
      default: false
    },
    cursor: {
      type: Number,
      default: 0
    },
    showConfirmBar: {
      type: Boolean,
      default: true
    },
    selectionStart: {
      type: Number,
      default: -1
    },
    selectionEnd: {
      type: Number,
      default: -1
    },
    disableDefaultPadding: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    }
  }),
  emits: ["focus", "blur", "confirm", "input", "update:modelValue", "clear", "search", "keyboardheightchange", "click"],
  setup(__props, { emit: emits }) {
    var _a, _b, _c;
    const props = __props;
    const store = useTmpiniaStore();
    const proxy = (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    let parentFormItem = proxy == null ? void 0 : proxy.$parent;
    while (parentFormItem) {
      if ((parentFormItem == null ? void 0 : parentFormItem.tmFormComnameFormItem) == "tmFormComnameFormItem" || !parentFormItem) {
        break;
      } else {
        parentFormItem = (_c = parentFormItem == null ? void 0 : parentFormItem.$parent) != null ? _c : void 0;
      }
    }
    const isAndroid = ref(false);
    isAndroid.value = uni.getSystemInfoSync().osName == "android" ? true : false;
    const _height = computed(() => props.height);
    const _inputPadding = computed(() => {
      if (props.search !== "" || props.searchLabel !== "") {
        return [4, 0];
      }
      return props.inputPadding;
    });
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
    const propsDetail = computed(() => {
      return {
        focus: props.focus,
        prefix: props.prefix,
        prefixLabel: props.prefixLabel,
        fontSize: props.fontSize,
        fontSize_px: uni.upx2px(props.fontSize),
        suffix: props.suffix,
        suffixLabel: props.suffixLabel,
        fontColor: props.fontColor,
        search: props.search,
        searchLabel: props.searchLabel,
        showClear: props.showClear,
        password: props.password,
        disabled: props.disabled,
        placeholder: props.placeholder,
        showCharNumber: props.showCharNumber,
        maxlength: props.maxlength,
        cursorSpacing: props.cursorSpacing,
        confirmType: props.confirmType,
        confirmHold: props.confirmHold,
        autoBlur: props.autoBlur,
        holdKeyboard: props.holdKeyboard,
        adjustPosition: props.adjustPosition,
        type: props.type,
        cursor: props.cursor,
        showConfirmBar: props.showConfirmBar,
        selectionStart: props.selectionStart,
        selectionEnd: props.selectionEnd,
        disableDefaultPadding: props.disableDefaultPadding,
        fixed: props.fixed
      };
    });
    const tmcfg = computed(() => store.tmStore);
    computed(() => computedStyle(props));
    computed(() => computedClass(props));
    const isDark = computed(() => computedDark(props, tmcfg.value));
    const _requiredError = ref(false);
    const _foucsActive = ref(props.focus || false);
    watch(() => props.focus, () => {
      _foucsActive.value = props.focus;
    });
    const _color = computed(() => {
      let color = props.color;
      if (_foucsActive.value) {
        if (props.followTheme && store.tmStore.color) {
          color = store.tmStore.color;
        } else {
          color = props.focusColor;
        }
      }
      if (_requiredError.value)
        color = "red";
      return color;
    });
    const tmcomputed = computed(() => {
      const _props = __spreadProps(__spreadValues({}, props), { color: _color.value });
      return computedTheme(_props, isDark.value, tmcfg.value);
    });
    const showPasswordText = ref(propsDetail.value.password);
    const showPasswordIcon = computed(() => props.password);
    ref(props.errorLabel);
    const _value = ref(props.modelValue);
    const _valueLenChar = computed(() => {
      let str = String(_value.value).split("");
      return str.length;
    });
    watch(() => props.modelValue, () => _value.value = props.modelValue);
    const rulesObj = inject("tmFormItemRules", computed(() => {
      var _a2;
      return [{
        message: (_a2 = props == null ? void 0 : props.errorLabel) != null ? _a2 : "\u8BF7\u586B\u5199\u5FC5\u8981\u7684\u5185\u5BB9",
        required: false,
        validator: false
      }];
    }));
    function searchClick() {
      emits("search", _value.value);
    }
    function clearBtn() {
      _value.value = "";
      emits("update:modelValue", "");
      emits("clear");
    }
    function changeSeePassword() {
      showPasswordText.value = !showPasswordText.value;
    }
    function focus() {
      _foucsActive.value = true;
      emits("focus");
    }
    function blur() {
      _foucsActive.value = false;
      pushFormItem();
      emits("blur");
    }
    function confirm() {
      emits("confirm", _value.value);
    }
    function inputHandler(e) {
      _value.value = e.detail.value;
      emits("input", e.detail.value);
      emits("update:modelValue", e.detail.value);
      return e.detail.value;
    }
    function inputClick(e, type) {
      e.stopPropagation();
      if (type == "ali") {
        debounce(() => emits("click", e), 500, true);
        return;
      }
      debounce(() => emits("click", e), 500, true);
    }
    watch(_value, () => debounce(pushFormItem, 200));
    const tmFormFun = inject("tmFormFun", computed(() => ""));
    const validate = (rules) => {
      rules = rules.map((el) => {
        if (typeof el.validator === "function" && el.required === true) {
          return el;
        } else if (typeof el.validator === "boolean" && el.required === true) {
          return __spreadProps(__spreadValues({}, el), {
            validator: (val) => {
              return String(val).length == 0 || typeof val === null ? false : true;
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
              componentsName: "tm-input",
              message: ev.length == 0 ? "" : ev[0].message
            });
          }).catch((er) => {
            parentFormItem.pushCom({
              value: _value.value,
              isRequiredError: true,
              componentsName: "tm-input",
              message: er.message
            });
          });
        }
      }
    }
    watch(tmFormFun, () => {
      if (tmFormFun.value == "validate") {
        pushFormItem();
      }
      if (tmFormFun.value == "reset") {
        _value.value = "";
        _requiredError.value = false;
        emits("update:modelValue", _value.value);
        pushFormItem(false);
      }
      if (tmFormFun.value == "clearValidate") {
        _requiredError.value = false;
        pushFormItem(false);
      }
    });
    pushFormItem(false);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(tmSheet, {
        transprent: true,
        margin: props.margin,
        padding: props.padding
      }, {
        default: withCtx(() => [
          createVNode(tmSheet, {
            transprent: props.transprent,
            round: props.round,
            "no-level": "",
            margin: [0, 0],
            padding: unref(_inputPadding),
            border: props.border,
            text: props.text,
            color: unref(_color),
            outlined: props.outlined,
            shadow: props.shadow,
            linear: props.linear,
            linearDeep: props.linearDeep
          }, {
            default: withCtx(() => [
              createElementVNode("view", {
                class: normalizeClass(["flex flex-row", [unref(propsDetail).type == "textarea" ? "flex-row-top-center" : "flex-row-center-center"]]),
                onClick: _cache[7] || (_cache[7] = ($event) => inputClick($event, "")),
                style: normalizeStyle([{ height: `${unref(_height)}rpx` }])
              }, [
                unref(propsDetail).search || unref(propsDetail).searchLabel ? (openBlock(), createElementBlock("view", {
                  key: 0,
                  class: "px-9"
                })) : createCommentVNode("v-if", true),
                renderSlot(_ctx.$slots, "left"),
                unref(propsDetail).prefix ? (openBlock(), createElementBlock("view", {
                  key: 1,
                  class: "pr-16"
                }, [
                  createVNode(tmIcon, {
                    "font-size": unref(propsDetail).fontSize,
                    name: unref(propsDetail).prefix
                  }, null, 8, ["font-size", "name"])
                ])) : createCommentVNode("v-if", true),
                unref(propsDetail).prefixLabel ? (openBlock(), createElementBlock("view", {
                  key: 2,
                  class: "pr-24"
                }, [
                  createVNode(tmText, {
                    "font-size": unref(propsDetail).fontSize,
                    label: unref(propsDetail).prefixLabel
                  }, null, 8, ["font-size", "label"])
                ])) : createCommentVNode("v-if", true),
                !isAndroid.value ? (openBlock(), createElementBlock("view", {
                  key: 3,
                  onClick: _cache[2] || (_cache[2] = withModifiers(($event) => inputClick($event, "ali"), ["stop"])),
                  class: "flex-1 relative flex-row flex",
                  style: normalizeStyle([{ width: "0px" }])
                }, [
                  createCommentVNode(` <view @click.stop="emits('click',$event)" class=" l-0 t-0 flex-1 " :style="{height: \`\${_height}rpx\`,background:'red'}"></view> `),
                  unref(propsDetail).type != "textarea" ? (openBlock(), createElementBlock("u-input", {
                    key: 0,
                    class: "flex-1",
                    userInteractionEnabled: false,
                    value: _value.value,
                    focus: unref(propsDetail).focus,
                    onFocus: focus,
                    onBlur: blur,
                    onConfirm: confirm,
                    onInput: inputHandler,
                    onKeyboardheightchange: _cache[0] || (_cache[0] = ($event) => emits("keyboardheightchange")),
                    password: showPasswordText.value,
                    maxlength: unref(propsDetail).maxlength,
                    disabled: unref(propsDetail).disabled,
                    cursorSpacing: unref(propsDetail).cursorSpacing,
                    confirmType: unref(propsDetail).confirmType,
                    confirmHold: unref(propsDetail).confirmHold,
                    autoBlur: unref(propsDetail).autoBlur,
                    holdKeyboard: unref(propsDetail).holdKeyboard,
                    adjustPosition: unref(propsDetail).adjustPosition,
                    type: unref(propsDetail).type,
                    placeholder: unref(propsDetail).placeholder,
                    style: normalizeStyle([
                      {
                        height: `${unref(_height)}rpx`,
                        color: unref(propsDetail).fontColor ? unref(propsDetail).fontColor : unref(tmcomputed).textColor,
                        "text-align": props.align,
                        "fontSize": `${unref(propsDetail).fontSize_px}px`
                      }
                    ]),
                    placeholderStyle: `fontSize:${unref(propsDetail).fontSize_px}px`
                  }, null, 44, ["value", "focus", "password", "maxlength", "disabled", "cursorSpacing", "confirmType", "confirmHold", "autoBlur", "holdKeyboard", "adjustPosition", "type", "placeholder", "placeholderStyle"])) : createCommentVNode("v-if", true),
                  unref(propsDetail).type == "textarea" ? (openBlock(), createElementBlock("u-textarea", {
                    key: 1,
                    userInteractionEnabled: false,
                    value: _value.value,
                    focus: unref(propsDetail).focus,
                    onFocus: focus,
                    onBlur: blur,
                    onConfirm: confirm,
                    onInput: inputHandler,
                    onKeyboardheightchange: _cache[1] || (_cache[1] = ($event) => emits("keyboardheightchange")),
                    maxlength: unref(propsDetail).maxlength,
                    disabled: unref(propsDetail).disabled,
                    placeholder: unref(propsDetail).placeholder,
                    cursorSpacing: unref(propsDetail).cursorSpacing,
                    confirmHold: unref(propsDetail).confirmHold,
                    autoBlur: unref(propsDetail).autoBlur,
                    holdKeyboard: unref(propsDetail).holdKeyboard,
                    cursor: unref(propsDetail).cursor,
                    showConfirmBar: unref(propsDetail).showConfirmBar,
                    selectionStart: unref(propsDetail).selectionStart,
                    selectionEnd: unref(propsDetail).selectionEnd,
                    disableDefaultPadding: unref(propsDetail).disableDefaultPadding,
                    fixed: unref(propsDetail).fixed,
                    adjustPosition: unref(propsDetail).adjustPosition,
                    type: unref(propsDetail).type,
                    style: normalizeStyle([
                      {
                        height: `${unref(_height)}rpx`,
                        width: "auto",
                        "word-break": "break-word",
                        color: unref(propsDetail).fontColor ? unref(propsDetail).fontColor : unref(tmcomputed).textColor,
                        "text-align": props.align,
                        "fontSize": `${unref(propsDetail).fontSize_px}px`
                      }
                    ]),
                    class: "wrap flex-1 py-12",
                    placeholderStyle: `fontSize:${unref(propsDetail).fontSize_px}px`
                  }, null, 44, ["value", "focus", "maxlength", "disabled", "placeholder", "cursorSpacing", "confirmHold", "autoBlur", "holdKeyboard", "cursor", "showConfirmBar", "selectionStart", "selectionEnd", "disableDefaultPadding", "fixed", "adjustPosition", "type", "placeholderStyle"])) : createCommentVNode("v-if", true)
                ])) : createCommentVNode("v-if", true),
                isAndroid.value ? (openBlock(), createElementBlock("view", {
                  key: 4,
                  class: "flex-1 relative flex-row flex",
                  style: normalizeStyle([{ width: "0px" }])
                }, [
                  createCommentVNode(` <view @click.stop="emits('click',$event)" class=" l-0 t-0 flex-1 " :style="{height: \`\${_height}rpx\`,background:'red'}"></view> `),
                  unref(propsDetail).type != "textarea" ? (openBlock(), createElementBlock("u-input", {
                    key: 0,
                    class: "flex-1",
                    onClick: _cache[3] || (_cache[3] = withModifiers(($event) => emits("click", $event), ["stop"])),
                    userInteractionEnabled: false,
                    value: _value.value,
                    focus: unref(propsDetail).focus,
                    onFocus: focus,
                    onBlur: blur,
                    onConfirm: confirm,
                    onInput: inputHandler,
                    onKeyboardheightchange: _cache[4] || (_cache[4] = ($event) => emits("keyboardheightchange")),
                    password: showPasswordText.value,
                    disabled: unref(propsDetail).disabled,
                    cursorSpacing: unref(propsDetail).cursorSpacing,
                    confirmType: unref(propsDetail).confirmType,
                    confirmHold: unref(propsDetail).confirmHold,
                    autoBlur: unref(propsDetail).autoBlur,
                    holdKeyboard: unref(propsDetail).holdKeyboard,
                    adjustPosition: unref(propsDetail).adjustPosition,
                    maxlength: unref(propsDetail).maxlength,
                    type: unref(propsDetail).type,
                    placeholder: unref(propsDetail).placeholder,
                    style: normalizeStyle([
                      {
                        height: `${unref(_height)}rpx`,
                        color: unref(propsDetail).fontColor ? unref(propsDetail).fontColor : unref(tmcomputed).textColor,
                        "text-align": props.align,
                        "fontSize": `${unref(propsDetail).fontSize_px}px`
                      }
                    ]),
                    placeholderStyle: `fontSize:${unref(propsDetail).fontSize_px}px`
                  }, null, 44, ["value", "focus", "password", "disabled", "cursorSpacing", "confirmType", "confirmHold", "autoBlur", "holdKeyboard", "adjustPosition", "maxlength", "type", "placeholder", "placeholderStyle"])) : createCommentVNode("v-if", true),
                  unref(propsDetail).type == "textarea" ? (openBlock(), createElementBlock("u-textarea", {
                    key: 1,
                    onClick: _cache[5] || (_cache[5] = withModifiers(($event) => emits("click", $event), ["stop"])),
                    userInteractionEnabled: false,
                    value: _value.value,
                    focus: unref(propsDetail).focus,
                    onFocus: focus,
                    onBlur: blur,
                    onConfirm: confirm,
                    onInput: inputHandler,
                    onKeyboardheightchange: _cache[6] || (_cache[6] = ($event) => emits("keyboardheightchange")),
                    disabled: unref(propsDetail).disabled,
                    placeholder: unref(propsDetail).placeholder,
                    cursorSpacing: unref(propsDetail).cursorSpacing,
                    confirmHold: unref(propsDetail).confirmHold,
                    autoBlur: unref(propsDetail).autoBlur,
                    holdKeyboard: unref(propsDetail).holdKeyboard,
                    adjustPosition: unref(propsDetail).adjustPosition,
                    maxlength: unref(propsDetail).maxlength,
                    autoHeight: unref(propsDetail).autoHeight,
                    cursor: unref(propsDetail).cursor,
                    showConfirmBar: unref(propsDetail).showConfirmBar,
                    selectionStart: unref(propsDetail).selectionStart,
                    selectionEnd: unref(propsDetail).selectionEnd,
                    disableDefaultPadding: unref(propsDetail).disableDefaultPadding,
                    fixed: unref(propsDetail).fixed,
                    type: unref(propsDetail).type,
                    style: normalizeStyle([
                      {
                        height: `${unref(_height)}rpx`,
                        width: "auto",
                        "word-break": "break-word",
                        color: unref(propsDetail).fontColor ? unref(propsDetail).fontColor : unref(tmcomputed).textColor,
                        "text-align": props.align,
                        "fontSize": `${unref(propsDetail).fontSize_px}px`
                      }
                    ]),
                    class: "wrap flex-1 py-10",
                    placeholderStyle: `fontSize:${unref(propsDetail).fontSize_px}px`
                  }, null, 44, ["value", "focus", "disabled", "placeholder", "cursorSpacing", "confirmHold", "autoBlur", "holdKeyboard", "adjustPosition", "maxlength", "autoHeight", "cursor", "showConfirmBar", "selectionStart", "selectionEnd", "disableDefaultPadding", "fixed", "type", "placeholderStyle"])) : createCommentVNode("v-if", true)
                ])) : createCommentVNode("v-if", true),
                unref(propsDetail).showClear && unref(_valueLenChar) > 0 ? (openBlock(), createElementBlock("view", {
                  key: 5,
                  class: "pl-16"
                }, [
                  createVNode(tmIcon, {
                    onClick: clearBtn,
                    "font-size": unref(propsDetail).fontSize * 0.9,
                    name: "tmicon-times-circle-fill"
                  }, null, 8, ["font-size"])
                ])) : createCommentVNode("v-if", true),
                _requiredError.value ? (openBlock(), createElementBlock("view", {
                  key: 6,
                  class: "pl-16"
                }, [
                  createVNode(tmIcon, {
                    "font-size": unref(propsDetail).fontSize,
                    name: "tmicon-exclamation-circle"
                  }, null, 8, ["font-size"])
                ])) : createCommentVNode("v-if", true),
                unref(propsDetail).suffix ? (openBlock(), createElementBlock("view", {
                  key: 7,
                  class: "pl-16"
                }, [
                  createVNode(tmIcon, {
                    "font-size": unref(propsDetail).fontSize * 0.85,
                    name: unref(propsDetail).suffix
                  }, null, 8, ["font-size", "name"])
                ])) : createCommentVNode("v-if", true),
                unref(propsDetail).suffixLabel ? (openBlock(), createElementBlock("view", {
                  key: 8,
                  class: "pl-16"
                }, [
                  createVNode(tmText, {
                    "font-size": unref(propsDetail).fontSize,
                    label: unref(propsDetail).suffixLabel
                  }, null, 8, ["font-size", "label"])
                ])) : createCommentVNode("v-if", true),
                unref(showPasswordIcon) ? (openBlock(), createElementBlock("view", {
                  key: 9,
                  class: "pl-16"
                }, [
                  createCommentVNode(" tmicon-eyeslash-fill "),
                  createVNode(tmIcon, {
                    onClick: changeSeePassword,
                    "font-size": unref(propsDetail).fontSize,
                    name: showPasswordText.value ? "tmicon-eyeslash-fill" : "tmicon-eye-fill"
                  }, null, 8, ["font-size", "name"])
                ])) : createCommentVNode("v-if", true),
                unref(propsDetail).showCharNumber && unref(_valueLenChar) > 0 && unref(propsDetail).type != "textarea" ? (openBlock(), createElementBlock("view", {
                  key: 10,
                  class: "pl-16 flex-row flex"
                }, [
                  createVNode(tmText, { label: unref(_valueLenChar) }, null, 8, ["label"]),
                  unref(propsDetail).maxlength > 0 ? (openBlock(), createBlock(tmText, {
                    key: 0,
                    label: "/" + unref(propsDetail).maxlength
                  }, null, 8, ["label"])) : createCommentVNode("v-if", true)
                ])) : createCommentVNode("v-if", true),
                createCommentVNode(" \u539F\u56E0\u662F\u652F\u4ED8\u5B9D\u5C0F\u7A0B\u5E8F\u81EA\u5E26\u4E86\u8BA1\u6570\u5668\u3002\u4F1A\u5BFC\u81F4\u91CD\u53E0\u3002 "),
                unref(propsDetail).showCharNumber && unref(_valueLenChar) > 0 && unref(propsDetail).type == "textarea" ? (openBlock(), createElementBlock("view", {
                  key: 11,
                  class: "pl-16 flex-row flex absolute r-0 b-12"
                }, [
                  createVNode(tmText, { label: unref(_valueLenChar) }, null, 8, ["label"]),
                  unref(propsDetail).maxlength > 0 ? (openBlock(), createBlock(tmText, {
                    key: 0,
                    label: "/" + unref(propsDetail).maxlength
                  }, null, 8, ["label"])) : createCommentVNode("v-if", true)
                ])) : createCommentVNode("v-if", true),
                renderSlot(_ctx.$slots, "right", {}, () => [
                  unref(propsDetail).search || unref(propsDetail).searchLabel ? (openBlock(), createElementBlock("view", {
                    key: 0,
                    class: "pl-16"
                  }, [
                    createVNode(TmButton, {
                      followTheme: props.followTheme,
                      onClick: searchClick,
                      color: props.focusColor,
                      "font-size": 24,
                      height: unref(_height) - 11,
                      padding: [16, 0],
                      block: "",
                      margin: [0, 0],
                      icon: unref(propsDetail).search,
                      label: unref(propsDetail).searchLabel
                    }, null, 8, ["followTheme", "color", "height", "icon", "label"])
                  ])) : createCommentVNode("v-if", true)
                ])
              ], 6)
            ]),
            _: 3
          }, 8, ["transprent", "round", "padding", "border", "text", "color", "outlined", "shadow", "linear", "linearDeep"]),
          createCommentVNode(' <view v-if="propsDetail.showBottomBotder" :class="[`mt-${props.margin[1]*2}`]">\r\n            <tm-divider :margin="[0,0]"></tm-divider>\r\n        </view> '),
          createCommentVNode(" _requiredError "),
          createCommentVNode(' <view v-if="false" class="pt-12">\r\n            <tmText :font-size="24" color="red" :label="_errorLabel"></tmText>\r\n        </view> ')
        ]),
        _: 3
      }, 8, ["margin", "padding"]);
    };
  }
});
var tmInput = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-input/tm-input.vue"]]);
export { tmInput as t };
