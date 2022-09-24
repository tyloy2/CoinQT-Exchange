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
import { defineComponent, getCurrentInstance, computed, ref, resolveComponent, openBlock, createBlock, unref, withCtx, createVNode, normalizeClass, normalizeStyle, renderSlot, createCommentVNode } from "vue";
import { t as tmSheet } from "./tm-sheet.js";
import { _ as _export_sfc, c as custom_props, b as computedStyle, d as computedClass, a as tmText } from "./tm-text.js";
import { t as tmIcon } from "./tm-icon.js";
var _style_0 = { "button": { "": { "backgroundColor": "rgba(0,0,0,0)", "borderWidth": 0, "borderStyle": "solid", "borderColor": "rgba(0,0,0,0)", "paddingTop": 0, "paddingRight": 0, "paddingBottom": 0, "paddingLeft": 0, "borderRadius": 0 } }, "buttonHover": { "": { "backgroundColor": "rgba(0,0,0,0)" } }, "bhover": { "": { "opacity": 0.7 } } };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tm-button",
  props: __spreadProps(__spreadValues({}, custom_props), {
    transprent: {
      type: Boolean,
      default: false
    },
    followTheme: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: "normal"
    },
    fontSize: {
      type: Number,
      default: 0
    },
    fontColor: {
      type: String,
      default: ""
    },
    margin: {
      type: Array,
      default: () => [0, 16]
    },
    padding: {
      type: Array,
      default: () => [0, 0]
    },
    shadow: {
      type: Number,
      default: 2
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    block: {
      type: Boolean,
      default: false
    },
    round: {
      type: Number,
      default: 0
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    url: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    },
    formType: {
      type: String,
      default: ""
    },
    openType: {
      type: String,
      default: ""
    },
    appParameter: {
      type: String,
      default: ""
    },
    sessionFrom: {
      type: String,
      default: ""
    },
    sendMessageTitle: {
      type: String,
      default: ""
    },
    sendMessagePath: {
      type: String,
      default: ""
    },
    sendMessageImg: {
      type: String,
      default: ""
    },
    sendMessageCard: {
      type: String,
      default: ""
    },
    unit: {
      type: String,
      default: "rpx"
    }
  }),
  emits: ["click", "touchstart", "touchmove", "touchcancel", "touchend", "tap", "longpress", "getphonenumber", "getUserInfo", "getUserProfile", "error", "opensetting", "launchapp", "contact"],
  setup(__props, { emit: emits }) {
    var _a, _b, _c;
    const props = __props;
    const proxy = (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const formtype = computed(() => props.formType);
    let FormParent = null;
    if (formtype.value == "reset" || formtype.value == "submit") {
      FormParent = proxy == null ? void 0 : proxy.$parent;
      while (FormParent) {
        if ((FormParent == null ? void 0 : FormParent.tmFormComnameId) == "tmFormId" || !FormParent) {
          break;
        } else {
          FormParent = (_c = FormParent == null ? void 0 : FormParent.$parent) != null ? _c : void 0;
        }
      }
    }
    const customCSSStyle = computed(() => {
      return __spreadProps(__spreadValues({
        height: btnSizeObj.value.h + props.unit
      }, computedStyle(props)), {
        border: "0px solid rgba(0, 0, 0, 0)",
        background: "rgba(0, 0, 0, 0)",
        borderRadius: "0px"
      });
    });
    const customClass = computed(() => computedClass(props));
    const isclickOn = ref(false);
    const _load = computed(() => props.loading);
    const _disabled = computed(() => props.disabled);
    const _label = computed(() => props.label);
    const _icon = computed(() => props.icon);
    const sizeObj = computed(() => {
      if (props.unit == "px") {
        return {
          block: { w: 0, h: 80, fontSize: 28, round: 3 },
          mini: { w: 44, h: 18, fontSize: 10, round: 2 },
          small: { w: 60, h: 28, fontSize: 11, round: 3 },
          normal: { w: 110, h: 40, fontSize: 14, round: 3 },
          middle: { w: 180, h: 40, fontSize: 15, round: 3 },
          large: { w: 268, h: 44, fontSize: 16, round: 4 }
        };
      }
      return {
        block: { w: 0, h: 80, fontSize: 28, round: 3 },
        mini: { w: 88, h: 36, fontSize: 20, round: 2 },
        small: { w: 120, h: 56, fontSize: 22, round: 3 },
        normal: { w: 220, h: 80, fontSize: 28, round: 3 },
        middle: { w: 360, h: 80, fontSize: 30, round: 3 },
        large: { w: 535, h: 88, fontSize: 32, round: 4 }
      };
    });
    const btnSizeObj = computed(() => {
      let fontSize = props.fontSize || 0;
      if (props.block) {
        return { w: 0, h: props.height || sizeObj.value.block.h, fontSize: fontSize || sizeObj.value.block.fontSize, round: props.round == -1 ? 0 : props.round || sizeObj.value.normal.round };
      }
      return {
        w: props.width || sizeObj.value[props.size].w,
        h: props.height || sizeObj.value[props.size].h,
        fontSize: fontSize || sizeObj.value[props.size].fontSize,
        round: props.round == -1 ? 0 : props.round || sizeObj.value[props.size].round
      };
    });
    const _fontColor = computed(() => props.fontColor);
    function touchstart(e) {
      isclickOn.value = true;
      emits("touchstart", e);
    }
    function touchend(e) {
      isclickOn.value = false;
      emits("touchend", e);
    }
    function onclick(e) {
      if (FormParent != null && typeof FormParent != "undefined" && formtype.value && !props.loading) {
        FormParent[formtype.value]();
      }
      emits("click", e);
      if (props.url !== "" && typeof props.url === "string") {
        let url = props.url;
        if (url[0] !== "/")
          url = "/" + url;
        uni.navigateTo({
          url
        });
        return;
      }
      if (props.openType == "getUserInfo" || props.openType == "getUserProfile")
        ;
    }
    return (_ctx, _cache) => {
      const _component_button = resolveComponent("button");
      return openBlock(), createBlock(tmSheet, {
        "no-level": "",
        _style: { opacity: isclickOn.value || unref(_disabled) ? 0.7 : 1 },
        "hover-class": "none",
        round: unref(btnSizeObj).round,
        width: unref(btnSizeObj).w,
        height: unref(btnSizeObj).h,
        padding: props.padding,
        margin: props.margin,
        color: props.color,
        shadow: props.shadow,
        transprent: props.transprent,
        linear: props.linear,
        "linear-deep": props.linearDeep,
        text: props.text,
        outlined: props.outlined,
        dark: props.dark,
        "follow-dark": props.followDark,
        "follow-theme": props.followTheme,
        "border-direction": props.borderDirection,
        "border-style": props.borderStyle,
        border: props.border,
        blur: props.blur,
        _class: "flex flex-row flex-center "
      }, {
        default: withCtx(() => [
          createVNode(_component_button, {
            onClick: onclick,
            onTouchstart: touchstart,
            onTouchend: touchend,
            onLongpress: _cache[0] || (_cache[0] = ($event) => emits("longpress", $event)),
            onTouchcancel: _cache[1] || (_cache[1] = ($event) => {
              isclickOn.value = false;
              emits("touchcancel", $event);
            }),
            onTouchmove: _cache[2] || (_cache[2] = ($event) => emits("touchmove", $event)),
            onGetphonenumber: _cache[3] || (_cache[3] = ($event) => emits("getphonenumber", $event)),
            onError: _cache[4] || (_cache[4] = ($event) => emits("error", $event)),
            onOpensetting: _cache[5] || (_cache[5] = ($event) => emits("opensetting", $event)),
            onLaunchapp: _cache[6] || (_cache[6] = ($event) => emits("launchapp", $event)),
            onContact: _cache[7] || (_cache[7] = ($event) => emits("contact", $event)),
            "form-type": props.formType,
            openType: props.openType,
            appParameter: props.appParameter,
            sessionFrom: props.sessionFrom,
            sendMessageTitle: props.sendMessageTitle,
            sendMessagePath: props.sendMessagePath,
            sendMessageImg: props.sendMessageImg,
            sendMessageCard: props.sendMessageCard,
            loading: unref(_load),
            disabled: unref(_disabled),
            "hover-start-time": 1e7,
            "hover-stop-propagation": "",
            "hover-class": "bhover",
            class: normalizeClass(["button flex-1 flex-center", [unref(customClass)]]),
            style: normalizeStyle(unref(customCSSStyle))
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default", {}, () => [
                unref(_icon) ? (openBlock(), createBlock(tmIcon, {
                  key: 0,
                  userInteractionEnabled: false,
                  color: unref(_fontColor),
                  _class: unref(_label) ? "pr-10" : "",
                  unit: props.unit,
                  fontSize: unref(btnSizeObj).fontSize * 0.9,
                  name: unref(_icon)
                }, null, 8, ["color", "_class", "unit", "fontSize", "name"])) : createCommentVNode("v-if", true),
                createVNode(tmText, {
                  userInteractionEnabled: false,
                  color: unref(_fontColor),
                  fontSize: unref(btnSizeObj).fontSize,
                  unit: props.unit,
                  label: unref(_label)
                }, null, 8, ["color", "fontSize", "unit", "label"])
              ])
            ]),
            _: 3
          }, 8, ["form-type", "openType", "appParameter", "sessionFrom", "sendMessageTitle", "sendMessagePath", "sendMessageImg", "sendMessageCard", "loading", "disabled", "class", "style"])
        ]),
        _: 3
      }, 8, ["_style", "round", "width", "height", "padding", "margin", "color", "shadow", "transprent", "linear", "linear-deep", "text", "outlined", "dark", "follow-dark", "follow-theme", "border-direction", "border-style", "border", "blur"]);
    };
  }
});
var TmButton = /* @__PURE__ */ _export_sfc(_sfc_main, [["styles", [_style_0]], ["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-button/tm-button.vue"]]);
export { TmButton as T };
