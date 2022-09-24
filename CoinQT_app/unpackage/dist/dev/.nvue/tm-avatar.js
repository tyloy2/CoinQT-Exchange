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
import { defineComponent, computed, openBlock, createElementBlock, normalizeClass, normalizeStyle, unref, createVNode, withCtx, renderSlot, createBlock, createCommentVNode, withModifiers } from "vue";
import { _ as _export_sfc, c as custom_props, b as computedStyle, d as computedClass, a as tmText } from "./tm-text.js";
import { t as tmSheet } from "./tm-sheet.js";
import { t as tmIcon } from "./tm-icon.js";
var _style_0 = {};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tm-avatar",
  props: __spreadProps(__spreadValues({}, custom_props), {
    size: {
      type: [Number],
      default: 90
    },
    trigger: {
      type: [Boolean, String],
      default: false
    },
    triggerColor: {
      type: [String],
      default: ""
    },
    triggerIcon: {
      type: [String],
      default: ""
    },
    triggerStyle: {
      type: [String],
      default: ""
    },
    round: {
      type: [Number],
      default: 6
    },
    border: {
      type: [Number],
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
    transprent: {
      type: [Boolean, String],
      default: false
    },
    label: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    },
    img: {
      type: String,
      default: ""
    },
    fontSize: {
      type: [Number],
      default: 0
    },
    unit: {
      type: String,
      default: "rpx"
    }
  }),
  emits: ["click"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const customCSSStyle = computed(() => computedStyle(props));
    const customClass = computed(() => computedClass(props));
    const width = computed(() => {
      var _a;
      return (_a = props.size) != null ? _a : 90;
    });
    const height = computed(() => {
      var _a;
      return (_a = props.size) != null ? _a : 90;
    });
    const fontSize = computed(() => {
      var _a;
      if (props.fontSize)
        return props.fontSize;
      if (props.label)
        return parseInt(String(width.value)) * 0.4;
      if (props.icon)
        return parseInt(String(width.value)) * 0.7;
      return (_a = props.size) != null ? _a : 90;
    });
    const imgsize = computed(() => {
      return uni.upx2px(fontSize.value - 4) + "px";
    });
    const triggSize = computed(() => {
      let wh = width.value / 3 + 6;
      wh = wh >= 64 ? 64 : wh;
      return {
        size: wh,
        fontSize: wh * 0.5
      };
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        ref: "avatar",
        class: normalizeClass(["flex-col flex", [__props.trigger ? "trigger" : "", `mx-${props.margin[0]} my-${props.margin[1]}`]]),
        style: normalizeStyle({ width: unref(width) + props.unit, height: unref(height) + props.unit }),
        renderWhole: true
      }, [
        createVNode(tmSheet, {
          onClick: _cache[0] || (_cache[0] = ($event) => emits("click", $event)),
          color: props.color,
          _class: [unref(customClass), "flex-center flex-col"],
          _style: [unref(customCSSStyle), { flexShrink: 1 }],
          followTheme: props.followTheme,
          dark: props.dark,
          round: props.round,
          shadow: props.shadow,
          outlined: props.outlined,
          border: props.border,
          borderStyle: props.borderStyle,
          borderDirection: props.borderDirection,
          text: props.text,
          transprent: props.img ? true : props.transprent,
          linear: props.linear,
          linearDeep: props.linearDeep,
          width: unref(width),
          height: unref(height),
          margin: [0, 0],
          padding: props.padding,
          unit: props.unit
        }, {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "default", {}, () => [
              props.label && !props.icon && !props.img ? (openBlock(), createBlock(tmText, {
                key: 0,
                userInteractionEnabled: false,
                label: props.label,
                "font-size": unref(fontSize),
                unit: props.unit
              }, null, 8, ["label", "font-size", "unit"])) : createCommentVNode("v-if", true),
              !props.label && props.icon && !props.img ? (openBlock(), createBlock(tmIcon, {
                key: 1,
                userInteractionEnabled: false,
                name: props.icon,
                "font-size": unref(fontSize),
                unit: props.unit
              }, null, 8, ["name", "font-size", "unit"])) : createCommentVNode("v-if", true),
              !props.label && !props.icon && props.img ? (openBlock(), createElementBlock("u-image", {
                key: 2,
                userInteractionEnabled: false,
                src: props.img,
                mode: "scaleToFill",
                style: normalizeStyle({ width: unref(imgsize), height: unref(imgsize) }),
                class: normalizeClass(["round-" + props.round])
              }, null, 14, ["src"])) : createCommentVNode("v-if", true)
            ])
          ]),
          _: 3
        }, 8, ["color", "_class", "_style", "followTheme", "dark", "round", "shadow", "outlined", "border", "borderStyle", "borderDirection", "text", "transprent", "linear", "linearDeep", "width", "height", "padding", "unit"]),
        props.triggerIcon ? (openBlock(), createElementBlock("view", {
          key: 0,
          onClick: _cache[1] || (_cache[1] = withModifiers(($event) => emits("click", $event), ["stop"])),
          class: "absolute flex flex-col-bottom-end b-0 r-0",
          style: normalizeStyle({ width: `${unref(width)}${props.unit}` })
        }, [
          createVNode(tmSheet, {
            userInteractionEnabled: false,
            width: unref(triggSize).size,
            height: unref(triggSize).size,
            _style: props.triggerStyle,
            text: props.img ? false : !props.text,
            color: props.triggerColor || props.color,
            transprent: false,
            dark: props.dark,
            _class: "flex-center ",
            margin: [0, 0],
            padding: [0, 0],
            round: 24,
            unit: props.unit
          }, {
            default: withCtx(() => [
              createVNode(tmIcon, {
                name: props.triggerIcon,
                "font-size": unref(triggSize).fontSize,
                unit: props.unit
              }, null, 8, ["name", "font-size", "unit"])
            ]),
            _: 1
          }, 8, ["width", "height", "_style", "text", "color", "dark", "unit"])
        ], 4)) : createCommentVNode("v-if", true)
      ], 6);
    };
  }
});
var tmAvatar = /* @__PURE__ */ _export_sfc(_sfc_main, [["styles", [_style_0]], ["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-avatar/tm-avatar.vue"]]);
export { tmAvatar as t };
