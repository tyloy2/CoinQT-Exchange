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
import { _ as _export_sfc, c as custom_props, r as requireNativePlugin, b as computedStyle, d as computedClass, a as tmText } from "./tm-text.js";
import { defineComponent, ref, computed, watch, openBlock, createElementBlock, normalizeClass, unref, createVNode, withCtx, createBlock, createCommentVNode, createElementVNode, renderSlot, withModifiers } from "vue";
import { t as tmSheet } from "./tm-sheet.js";
import { t as tmIcon } from "./tm-icon.js";
import { t as tmTranslate } from "./tm-translate.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tm-tag",
  props: __spreadProps(__spreadValues({}, custom_props), {
    followTheme: {
      type: [Boolean],
      default: true
    },
    transprent: {
      type: [Boolean],
      default: false
    },
    border: {
      type: [Number],
      default: 0
    },
    round: {
      type: [Number],
      default: 2
    },
    shadow: {
      type: [Number],
      default: 1
    },
    margin: {
      type: Array,
      default: () => [10, 10]
    },
    padding: {
      type: Array,
      default: () => [0, 0]
    },
    checkable: {
      type: [Boolean, String],
      default: false
    },
    checked: {
      type: [Boolean, String],
      default: false
    },
    load: {
      type: [Boolean, String],
      default: false
    },
    size: {
      type: [String],
      default: "m"
    },
    fontSize: {
      type: [Number],
      default: 0
    },
    closable: {
      type: [Boolean],
      default: false
    },
    icon: {
      type: [String],
      default: ""
    },
    label: {
      type: [String],
      default: ""
    },
    fontColor: {
      type: String,
      default: ""
    }
  }),
  emits: ["click", "close", "change", "update:checked"],
  setup(__props, { emit: emits }) {
    const props = __props;
    requireNativePlugin("bindingx");
    requireNativePlugin("dom");
    const anitag = ref(null);
    const customCSSStyle = computed(() => computedStyle(props));
    computed(() => computedClass(props));
    const show = ref(true);
    const _checked_ = ref(false);
    const _fontColor = computed(() => props.fontColor);
    const loading = computed(() => props.load);
    const checked_com = computed({
      get: function() {
        return _checked_.value;
      },
      set: function(val) {
        _checked_.value = val;
        emits("update:checked", _checked_.value);
      }
    });
    checked_com.value = props.checked;
    watch(() => props.checked, (newval) => {
      checked_com.value = newval;
      emits("change", checked_com.value);
    });
    const wh = computed(() => {
      if (props.size == "xs") {
        return {
          px: props.padding[0] || 10,
          py: props.padding[1] || 4,
          fontSize: props.fontSize || 22
        };
      } else if (props.size == "s") {
        return {
          px: props.padding[0] || 14,
          py: props.padding[1] || 4,
          fontSize: props.fontSize || 24
        };
      } else if (props.size == "m") {
        return {
          px: props.padding[0] || 16,
          py: props.padding[1] || 8,
          fontSize: props.fontSize || 26
        };
      } else if (props.size == "n") {
        return {
          px: props.padding[0] || 18,
          py: props.padding[1] || 10,
          fontSize: props.fontSize || 28
        };
      } else if (props.size == "g") {
        return {
          px: props.padding[0] || 20,
          py: props.padding[1] || 12,
          fontSize: props.fontSize || 32
        };
      } else if (props.size == "lg") {
        return {
          px: props.padding[0] || 24,
          py: props.padding[1] || 16,
          fontSize: props.fontSize || 36
        };
      }
      return {
        px: props.padding[0],
        py: props.padding[1],
        fontSize: props.fontSize
      };
    });
    function onclick(e) {
      e.stopPropagation();
      e.preventDefault();
      emits("click", e);
      if (loading.value)
        return;
      checked_com.value = !checked_com.value;
    }
    function aniEnd() {
      show.value = false;
    }
    function closeTag(e) {
      if (loading.value)
        return;
      e.stopPropagation();
      emits("close");
      if (anitag.value) {
        anitag.value.play();
      } else {
        show.value = false;
      }
    }
    return (_ctx, _cache) => {
      return show.value ? (openBlock(), createElementBlock("view", {
        key: 0,
        class: normalizeClass(["flex flex-row", [unref(loading) ? "opacity-5" : ""]]),
        renderWhole: true
      }, [
        createVNode(tmTranslate, {
          onEnd: aniEnd,
          ref_key: "anitag",
          ref: anitag,
          name: "zoom",
          reverse: "",
          autoPlay: false
        }, {
          default: withCtx(() => [
            createVNode(tmSheet, {
              "hover-class": "opacity-6",
              onClick: onclick,
              transprent: props.transprent,
              color: props.color,
              _class: "flex-row flex flex-row-center-center",
              _style: unref(customCSSStyle),
              followTheme: props.followTheme,
              followDark: props.followDark,
              dark: props.dark,
              round: props.round,
              shadow: props.checkable && unref(checked_com) || !props.checkable ? props.shadow : 0,
              outlined: props.checkable && !unref(checked_com) ? true : props.outlined,
              border: props.border,
              borderStyle: props.borderStyle,
              borderDirection: props.borderDirection,
              text: props.checkable && !unref(checked_com) ? true : props.text,
              linear: props.linear,
              linearDeep: props.linearDeep,
              margin: props.margin,
              padding: [unref(wh).px, unref(wh).py]
            }, {
              default: withCtx(() => [
                props.icon ? (openBlock(), createBlock(tmIcon, {
                  key: 0,
                  color: unref(_fontColor),
                  name: props.icon,
                  followDark: props.followDark,
                  fontSize: unref(wh).fontSize,
                  dark: props.dark,
                  userInteractionEnabled: false
                }, null, 8, ["color", "name", "followDark", "fontSize", "dark"])) : createCommentVNode("v-if", true),
                createElementVNode("view", { class: "flex-1 flex flex-center" }, [
                  renderSlot(_ctx.$slots, "default", {}, () => [
                    createVNode(tmText, {
                      color: unref(_fontColor),
                      _class: props.icon ? "pl-10" : "",
                      fontSize: unref(wh).fontSize,
                      followDark: props.followDark,
                      userInteractionEnabled: false,
                      dark: props.dark,
                      label: props.label
                    }, null, 8, ["color", "_class", "fontSize", "followDark", "dark", "label"])
                  ])
                ]),
                createElementVNode("view", {
                  onClick: _cache[0] || (_cache[0] = withModifiers(() => {
                  }, ["stop"]))
                }, [
                  props.closable && !unref(loading) ? (openBlock(), createBlock(tmIcon, {
                    key: 0,
                    color: unref(_fontColor),
                    onClick: closeTag,
                    followDark: props.followDark,
                    _class: "pl-10",
                    fontSize: unref(wh).fontSize * 0.8,
                    name: "tmicon-times",
                    dark: props.dark
                  }, null, 8, ["color", "followDark", "fontSize", "dark"])) : createCommentVNode("v-if", true)
                ]),
                unref(loading) ? (openBlock(), createElementBlock("view", {
                  key: 1,
                  userInteractionEnabled: false,
                  class: "pl-10 flex flex-center flex-row",
                  style: { "line-height": "0" }
                }, [
                  createVNode(tmIcon, {
                    color: unref(_fontColor),
                    followDark: props.followDark,
                    fontSize: unref(wh).fontSize * 0.8,
                    name: "tmicon-loading",
                    spin: "",
                    dark: _ctx.dark
                  }, null, 8, ["color", "followDark", "fontSize", "dark"])
                ])) : createCommentVNode("v-if", true)
              ]),
              _: 3
            }, 8, ["transprent", "color", "_style", "followTheme", "followDark", "dark", "round", "shadow", "outlined", "border", "borderStyle", "borderDirection", "text", "linear", "linearDeep", "margin", "padding"])
          ]),
          _: 3
        }, 512)
      ], 2)) : createCommentVNode("v-if", true);
    };
  }
});
var tmTag = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-tag/tm-tag.vue"]]);
export { tmTag as t };
