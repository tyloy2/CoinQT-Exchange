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
import { c as custom_props, i as cssDirection, a as tmText, _ as _export_sfc, g as formatAppLog } from "./tm-text.js";
import { defineComponent, computed, openBlock, createElementBlock, createVNode, withCtx, createElementVNode, normalizeClass, unref, normalizeStyle, renderSlot, createCommentVNode, createBlock } from "vue";
import { t as tmSheet } from "./tm-sheet.js";
import { t as tmIcon } from "./tm-icon.js";
import { t as tmImage } from "./tm-image.js";
import { t as tmDivider } from "./tm-divider.js";
var _style_0 = {};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tm-cell",
  props: __spreadProps(__spreadValues({}, custom_props), {
    shadow: {
      type: [Number],
      default: 0
    },
    round: {
      type: [Number],
      default: 0
    },
    margin: {
      type: Array,
      default: () => [32, 0]
    },
    padding: {
      type: Array,
      default: () => [24, 24]
    },
    height: {
      type: [Number],
      default: 0
    },
    width: {
      type: [Number],
      default: 0
    },
    transprent: {
      type: [Boolean],
      default: false
    },
    color: {
      type: String,
      default: "white"
    },
    title: {
      type: String,
      default: ""
    },
    titleFontSize: {
      type: [Number],
      default: 28
    },
    label: {
      type: String,
      default: ""
    },
    labelColor: {
      type: String,
      default: "grey"
    },
    rightText: {
      type: String,
      default: ""
    },
    rightIcon: {
      type: String,
      default: "tmicon-angle-right"
    },
    rightColor: {
      type: String,
      default: "grey"
    },
    rightTextSize: {
      type: Number,
      default: 24
    },
    showAvatar: {
      type: Boolean,
      default: false
    },
    avatar: {
      type: String,
      default: ""
    },
    avatarSize: {
      type: Number,
      default: 60
    },
    avatarRound: {
      type: Number,
      default: 10
    },
    border: {
      type: [Number],
      default: 0
    },
    borderDirection: {
      type: [String],
      default: cssDirection.bottom
    },
    bottomBorder: {
      type: [Boolean],
      default: false
    },
    url: {
      type: String,
      default: ""
    }
  }),
  emits: ["click"],
  setup(__props, { emit: emits }) {
    const props = __props;
    function cellClick(e) {
      emits("click", e);
      if (props.url !== "") {
        try {
          uni.navigateTo({
            url: props.url,
            fail(error) {
              formatAppLog("error", "at tmui/components/tm-cell/tm-cell.vue:208", "\u6253\u5F00\u8FDE\u63A5\u9519\u8BEF\uFF1A", error);
            }
          });
        } catch (e2) {
        }
      }
    }
    const _computedValue = computed(() => props);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        class: "relative overflow",
        renderWhole: true
      }, [
        createVNode(tmSheet, {
          onClick: cellClick,
          color: props.color,
          followTheme: props.followTheme,
          dark: props.dark,
          followDark: props.followDark,
          round: props.round,
          shadow: props.shadow,
          outlined: props.outlined,
          border: props.border,
          borderStyle: props.borderStyle,
          borderDirection: props.borderDirection,
          text: props.text,
          transprent: props.transprent,
          linear: props.linear,
          linearDeep: props.linearDeep,
          width: props.width,
          height: props.height,
          margin: props.margin,
          padding: props.padding,
          _class: props._class,
          _style: props._style,
          "hover-class": "opacity-6"
        }, {
          default: withCtx(() => [
            createElementVNode("view", {
              userInteractionEnabled: true,
              class: normalizeClass(["flex flex-row flex-row-center-center", [unref(_computedValue).url ? "url" : ""]])
            }, [
              unref(_computedValue).showAvatar ? (openBlock(), createElementBlock("view", {
                key: 0,
                style: normalizeStyle({
                  width: `${unref(_computedValue).avatarSize}rpx`,
                  height: `${unref(_computedValue).avatarSize}rpx`
                }),
                class: "flex flex-row flex-row-center-center"
              }, [
                renderSlot(_ctx.$slots, "avatar", {}, () => [
                  createVNode(tmImage, {
                    round: unref(_computedValue).avatarRound,
                    width: unref(_computedValue).avatarSize,
                    height: unref(_computedValue).avatarSize,
                    src: unref(_computedValue).avatar
                  }, null, 8, ["round", "width", "height", "src"])
                ])
              ], 4)) : createCommentVNode("v-if", true),
              createElementVNode("view", {
                class: "flex-1 flex flex-row flex-row-center-between",
                style: { "width": "0px" }
              }, [
                createElementVNode("view", null, [
                  createElementVNode("view", {
                    class: normalizeClass(["flex flex-5 flex-col", [unref(_computedValue).showAvatar ? "pl-24" : ""]])
                  }, [
                    renderSlot(_ctx.$slots, "title", {}, () => [
                      createVNode(tmText, {
                        fontSize: unref(_computedValue).titleFontSize,
                        label: unref(_computedValue).title
                      }, null, 8, ["fontSize", "label"])
                    ]),
                    renderSlot(_ctx.$slots, "label", {}, () => [
                      unref(_computedValue).label ? (openBlock(), createElementBlock("view", {
                        key: 0,
                        class: "mt-6"
                      }, [
                        createVNode(tmText, {
                          color: unref(_computedValue).labelColor,
                          fontSize: 22,
                          label: unref(_computedValue).label
                        }, null, 8, ["color", "label"])
                      ])) : createCommentVNode("v-if", true)
                    ])
                  ], 2)
                ]),
                createElementVNode("view", {
                  class: "flex-1 flex-row flex-row-center-end",
                  style: { "width": "0px" }
                }, [
                  renderSlot(_ctx.$slots, "rightText", {}, () => [
                    unref(_computedValue).rightText ? (openBlock(), createBlock(tmText, {
                      key: 0,
                      _class: "nowrap pr-12",
                      color: unref(_computedValue).rightColor,
                      fontSize: unref(_computedValue).rightTextSize,
                      label: unref(_computedValue).rightText
                    }, null, 8, ["color", "fontSize", "label"])) : createCommentVNode("v-if", true)
                  ]),
                  renderSlot(_ctx.$slots, "right", {}, () => [
                    unref(_computedValue).rightIcon ? (openBlock(), createBlock(tmIcon, {
                      key: 0,
                      _class: "opacity-3",
                      name: unref(_computedValue).rightIcon,
                      fontSize: 22
                    }, null, 8, ["name"])) : createCommentVNode("v-if", true)
                  ])
                ])
              ])
            ], 2)
          ]),
          _: 3
        }, 8, ["color", "followTheme", "dark", "followDark", "round", "shadow", "outlined", "border", "borderStyle", "borderDirection", "text", "transprent", "linear", "linearDeep", "width", "height", "margin", "padding", "_class", "_style"]),
        unref(_computedValue).bottomBorder ? (openBlock(), createBlock(tmDivider, {
          key: 0,
          margin: [0, 0],
          style: normalizeStyle({
            left: `${unref(_computedValue).avatar !== "" ? unref(_computedValue).avatarSize + unref(_computedValue).margin[0] : 0}rpx`
          })
        }, null, 8, ["style"])) : createCommentVNode("v-if", true)
      ]);
    };
  }
});
var tmCell = /* @__PURE__ */ _export_sfc(_sfc_main, [["styles", [_style_0]], ["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-cell/tm-cell.vue"]]);
export { tmCell as t };
