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
import { _ as _export_sfc, g as formatAppLog, a as tmText } from "./tm-text.js";
import { defineComponent, inject, computed, ref, openBlock, createElementBlock, normalizeStyle, unref, createCommentVNode, createElementVNode, createVNode, withCtx, renderSlot, createBlock, Fragment, renderList } from "vue";
import { t as tmSheet } from "./tm-sheet.js";
import { t as tmIcon } from "./tm-icon.js";
import { T as TmButton } from "./tm-button.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tm-float-button",
  props: {
    followTheme: {
      type: [Boolean, String],
      default: true
    },
    position: {
      type: String,
      default: "br",
      validator: (val) => {
        let isv = ["bc", "bl", "br", "tc", "tl", "tr"].includes(val);
        if (!isv) {
          formatAppLog("error", "at tmui/components/tm-float-button/tm-float-button.vue:76", "\u4F4D\u7F6E\u53C2\u6570\u4E3A:'bc','bl','br','tc','tl','tr'\u5176\u4E2D\u7684\u4E00\u9879");
        }
        return isv;
      }
    },
    actionsPos: {
      type: String,
      default: "top",
      validator: (val) => {
        let isv = ["left", "right", "top", "bottom"].includes(val);
        if (!isv) {
          formatAppLog("error", "at tmui/components/tm-float-button/tm-float-button.vue:88", "\u4F4D\u7F6E\u53C2\u6570\u4E3A:'left','right','top','bottom'\u5176\u4E2D\u7684\u4E00\u9879");
        }
        return isv;
      }
    },
    width: {
      type: Number,
      default: 112
    },
    height: {
      type: Number,
      default: 112
    },
    offset: {
      type: Array,
      default: () => [32, 32]
    },
    actions: {
      type: Array,
      default: () => []
    },
    btn: {
      type: Object,
      default: () => {
      },
      required: true
    },
    showActions: {
      type: Boolean,
      default: false
    },
    clickHidnActions: {
      type: Boolean,
      default: true
    }
  },
  emits: ["click", "change"],
  setup(__props, { emit: emits }) {
    var _a;
    const props = __props;
    const sysinfo = inject("tmuiSysInfo", computed(() => {
      return { bottom: 0, height: 750, width: uni.upx2px(750), top: 0, isCustomHeader: false, sysinfo: null };
    }));
    const windowWidth = computed(() => sysinfo.value.width);
    computed(() => sysinfo.value.top);
    const isH5 = ref(false);
    const showActions = ref((_a = props.showActions) != null ? _a : false);
    const BtnPos = computed(() => props.position);
    const AcionPos = computed(() => props.actionsPos);
    const _offset = computed(() => {
      var _a2;
      let ost = (_a2 = props.offset) != null ? _a2 : [0, 0];
      ost = [uni.upx2px(props.offset[0]), uni.upx2px(props.offset[1])];
      return ost;
    });
    const centerPosLeft = computed(() => {
      let ps = (windowWidth.value - uni.upx2px(props.width * 1.5)) / 2 + uni.upx2px(_offset.value[0]);
      return ps;
    });
    const _btn = computed(() => {
      var _a2;
      return __spreadValues({ icon: "tmicon-plus", fontSize: 20, color: "primary", linear: "", linearDeep: "accent", label: "", iconSize: 42, fontColor: "" }, (_a2 = props.btn) != null ? _a2 : {});
    });
    const _actionsItem = computed(() => {
      let asbtn = props.actions.map((el) => {
        let default_btn = { icon: "tmicon-plus", fontSize: 20, color: "primary", linear: "", linearDeep: "accent", label: "", fontColor: "", iconSize: 36 };
        return __spreadValues(__spreadValues({}, default_btn), el);
      });
      return asbtn;
    });
    const AcionPos_xy = computed(() => {
      if ((BtnPos.value == "tl" || BtnPos.value == "tr" || BtnPos.value == "tc" || BtnPos.value == "bc") && AcionPos.value == "bottom") {
        return { top: `${props.height}rpx`, height: props.actions.length * props.height + "rpx", dispaly: "flex", "flex-direction": "column" };
      }
      if ((BtnPos.value == "bl" || BtnPos.value == "br") && AcionPos.value == "bottom") {
        return { top: `${props.height}rpx`, height: props.actions.length * props.height + "rpx", dispaly: "flex", "flex-direction": "column" };
      }
      if ((BtnPos.value == "bl" || BtnPos.value == "br") && AcionPos.value == "top") {
        return { top: `0px`, dispaly: "flex", "flex-direction": "column-reverse" };
      }
      if ((BtnPos.value == "tl" || BtnPos.value == "tr" || BtnPos.value == "tc" || BtnPos.value == "bc") && AcionPos.value == "top") {
        return { top: `-0rpx`, height: props.actions.length * props.height + "rpx", dispaly: "flex", "flex-direction": "column" };
      }
      if ((BtnPos.value == "tl" || BtnPos.value == "tc" || BtnPos.value == "bl" || BtnPos.value == "br" || BtnPos.value == "bc") && AcionPos.value == "right") {
        return { left: `${props.height}rpx`, width: props.actions.length * props.height + "rpx", dispaly: "flex", "flex-direction": "row" };
      }
      if ((BtnPos.value == "tl" || BtnPos.value == "tr" || BtnPos.value == "tc" || BtnPos.value == "bl" || BtnPos.value == "br" || BtnPos.value == "bc") && AcionPos.value == "left") {
        return { right: `${props.height}rpx`, width: props.actions.length * props.height + "rpx", dispaly: "flex", "flex-direction": "row-reverse" };
      }
      if (BtnPos.value == "tr" && AcionPos.value == "right") {
        return { right: `${0}rpx`, width: props.actions.length * props.height + "rpx", dispaly: "flex", "flex-direction": "row" };
      }
    });
    const parent_style = computed(() => {
      let height_width = showActions.value ? (props.actions.length + 1) * props.height : props.height;
      height_width = (props.actions.length + 1) * props.height;
      if ((BtnPos.value == "tl" || BtnPos.value == "tr" || BtnPos.value == "tc") && AcionPos.value == "bottom") {
        return { height: height_width + "rpx" };
      }
      if (BtnPos.value == "tl" && AcionPos.value == "top") {
        let top = -(props.actions.length * props.height - _offset.value[1]);
        top = -props.height + _offset.value[1];
        return {
          height: height_width + "rpx",
          transform: `translateX(${_offset.value[0]}rpx) translateY(${top}rpx)`,
          "flex-direction": "column-reverse"
        };
      }
      if ((BtnPos.value == "tl" || BtnPos.value == "tc") && AcionPos.value == "right") {
        return { width: height_width + "rpx" };
      }
      if (BtnPos.value == "tl" && AcionPos.value == "left") {
        let left = -(props.actions.length * props.height - _offset.value[0]);
        left = -props.height + _offset.value[0];
        return {
          width: height_width + "rpx",
          transform: `translateX(${left}rpx) translateY(${_offset.value[1]}rpx)`,
          "flex-direction": "row-reverse"
        };
      }
      if (BtnPos.value == "tr" && AcionPos.value == "left") {
        -(props.actions.length * props.height - _offset.value[0]);
        -props.height + _offset.value[0];
        return {
          width: height_width + "rpx",
          "flex-direction": "row-reverse"
        };
      }
      if (BtnPos.value == "tr" && AcionPos.value == "top") {
        let top = -(props.actions.length * props.height - _offset.value[1]);
        return {
          height: height_width + "rpx",
          transform: `translateX(-${_offset.value[0]}rpx) translateY(${top}rpx)`,
          "flex-direction": "column-reverse"
        };
      }
      if (BtnPos.value == "tr" && AcionPos.value == "right") {
        let right = props.actions.length * props.height - _offset.value[0];
        return {
          width: height_width + "rpx",
          transform: `translateX(${right}rpx) translateY(${_offset.value[1]}rpx)`
        };
      }
      if (BtnPos.value == "tc" && AcionPos.value == "left") {
        let left = centerPosLeft.value - uni.upx2px(props.actions.length * props.height) - uni.upx2px(_offset.value[0]);
        return {
          width: height_width + "rpx",
          transform: `translateX(${left}px) translateY(${_offset.value[1]}rpx)`,
          "flex-direction": "row-reverse"
        };
      }
      if (BtnPos.value == "tc" && AcionPos.value == "top") {
        let left = centerPosLeft.value + uni.upx2px(_offset.value[0]);
        let top = -(props.actions.length * props.height - _offset.value[1]);
        return {
          height: height_width + "rpx",
          transform: `translateX(${left}px) translateY(${top}rpx)`,
          "flex-direction": "column-reverse"
        };
      }
      if (BtnPos.value == "bl" && AcionPos.value == "bottom") {
        let top = props.actions.length * props.height - _offset.value[1];
        top = props.height - _offset.value[1];
        return {
          height: height_width + "rpx",
          transform: `translateX(${_offset.value[0]}rpx) translateY(${top}rpx)`
        };
      }
      if (BtnPos.value == "bl" && AcionPos.value == "top") {
        let top = -_offset.value[1];
        return {
          height: height_width + "rpx",
          transform: `translateX(${_offset.value[0]}rpx) translateY(${top}rpx)`,
          "flex-direction": "column-reverse"
        };
      }
      if (BtnPos.value == "bl" && AcionPos.value == "right") {
        return {
          width: height_width + "rpx"
        };
      }
      if (BtnPos.value == "bl" && AcionPos.value == "left") {
        let left = -(props.actions.length * props.height - _offset.value[0]);
        left = -props.height + _offset.value[0];
        return {
          width: height_width + "rpx",
          transform: `translateX(${left}rpx) translateY(${-_offset.value[1]}rpx)`,
          "flex-direction": "row-reverse"
        };
      }
      if (BtnPos.value == "br" && AcionPos.value == "bottom") {
        let top = props.actions.length * props.height - _offset.value[1];
        top = props.height - _offset.value[1];
        return {
          height: height_width + "rpx",
          transform: `translateX(${-_offset.value[0]}rpx) translateY(${top}rpx)`
        };
      }
      if (BtnPos.value == "br" && AcionPos.value == "top") {
        let top = -_offset.value[1];
        return {
          height: height_width + "rpx",
          transform: `translateX(${-_offset.value[0]}rpx) translateY(${top}rpx)`,
          "flex-direction": "column-reverse"
        };
      }
      if (BtnPos.value == "br" && AcionPos.value == "right") {
        let right = props.actions.length * props.height - _offset.value[0];
        right = props.height - _offset.value[0];
        return {
          width: height_width + "rpx",
          transform: `translateX(${right}rpx) translateY(${-_offset.value[1]}rpx)`
        };
      }
      if (BtnPos.value == "br" && AcionPos.value == "left") {
        let left = -_offset.value[0];
        return {
          width: height_width + "rpx",
          transform: `translateX(${left}rpx) translateY(${-_offset.value[1]}rpx)`,
          "flex-direction": "row-reverse"
        };
      }
      if (BtnPos.value == "bc" && AcionPos.value == "left") {
        let left = centerPosLeft.value - uni.upx2px(props.actions.length * props.height) - uni.upx2px(_offset.value[0]);
        return {
          width: height_width + "rpx",
          transform: `translateX(${left}px) translateY(${-_offset.value[1]}rpx)`,
          "flex-direction": "row-reverse"
        };
      }
      if (BtnPos.value == "bc" && AcionPos.value == "right") {
        let left = centerPosLeft.value + uni.upx2px(_offset.value[0]);
        return {
          width: height_width + "rpx",
          transform: `translateX(${left}px) translateY(${-_offset.value[1]}rpx)`,
          "flex-direction": "row"
        };
      }
      if (BtnPos.value == "bc" && AcionPos.value == "top") {
        let left = centerPosLeft.value + uni.upx2px(_offset.value[0]);
        let top = -_offset.value[1];
        return {
          height: height_width + "rpx",
          transform: `translateX(${left}px) translateY(${top}rpx)`,
          "flex-direction": "column-reverse"
        };
      }
      if (BtnPos.value == "bc" && AcionPos.value == "bottom") {
        let left = centerPosLeft.value + uni.upx2px(_offset.value[0]);
        let top = props.actions.length * props.height + _offset.value[1];
        top = props.height - _offset.value[1];
        return {
          height: height_width + "rpx",
          transform: `translateX(${left}px) translateY(${top}rpx)`,
          "flex-direction": "column"
        };
      }
    });
    function onclick(e) {
      if (props.clickHidnActions) {
        showActions.value = !showActions.value;
      } else {
        showActions.value = true;
      }
      emits("click", e);
    }
    function change(index, item) {
      if (props.clickHidnActions) {
        showActions.value = false;
      }
      emits("change", index, item);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        class: "fixed zIndex-12 flex",
        style: normalizeStyle([
          unref(BtnPos) == "tl" ? { transform: `translateX(${unref(_offset)[0]}rpx) translateY(${unref(_offset)[1]}rpx)` } : "",
          unref(BtnPos) == "tr" ? { transform: `translateX(-${unref(_offset)[0]}rpx) translateY(${unref(_offset)[1]}rpx)`, right: "0px" } : "",
          unref(BtnPos) == "tc" ? { transform: `translateX(${unref(centerPosLeft)}px) translateY(${unref(_offset)[1]}rpx)` } : "",
          unref(BtnPos) == "bl" ? { transform: `translateX(${unref(_offset)[0]}rpx) translateY(-${unref(_offset)[1]}rpx)`, bottom: "0px" } : "",
          unref(BtnPos) == "br" ? { transform: `translateX(-${unref(_offset)[0]}rpx) translateY(-${unref(_offset)[1]}rpx)`, right: "0px", bottom: "0px" } : "",
          unref(BtnPos) == "bc" ? { transform: `translateX(${unref(centerPosLeft)}px) translateY(-${unref(_offset)[1]}rpx)`, bottom: "0px" } : "",
          !isH5.value && (unref(BtnPos) == "tl" || unref(BtnPos) == "tc" || unref(BtnPos) == "tr") ? { top: "0px" } : "",
          unref(parent_style)
        ]),
        renderWhole: true
      }, [
        createCommentVNode(" \u4E3B\u6309\u94AE "),
        createElementVNode("view", {
          style: normalizeStyle([{ width: props.width + "rpx", height: props.height + "rpx" }]),
          class: "flex-center"
        }, [
          createVNode(tmSheet, {
            transprent: true,
            padding: [0, 0],
            margin: [0, 0],
            color: unref(_btn).color
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default", {}, () => [
                createVNode(TmButton, {
                  followTheme: props.followTheme,
                  onClick: onclick,
                  _class: "flex flex-col flex-col-center-center",
                  shadow: 3,
                  linear: unref(_btn).linear,
                  "linear-deep": unref(_btn).linearDeep,
                  color: unref(_btn).color,
                  margin: [0, 0],
                  round: 16,
                  padding: [0, 0],
                  width: props.width - 12,
                  height: props.height - 12
                }, {
                  default: withCtx(() => [
                    createVNode(tmIcon, {
                      userInteractionEnabled: false,
                      "follow-dark": false,
                      color: unref(_btn).fontColor,
                      name: unref(_btn).icon,
                      "font-size": unref(_btn).iconSize
                    }, null, 8, ["color", "name", "font-size"]),
                    unref(_btn).label ? (openBlock(), createBlock(tmText, {
                      key: 0,
                      userInteractionEnabled: false,
                      "follow-dark": false,
                      color: unref(_btn).fontColor,
                      label: unref(_btn).label,
                      "font-size": unref(_btn).fontSize
                    }, null, 8, ["color", "label", "font-size"])) : createCommentVNode("v-if", true)
                  ]),
                  _: 1
                }, 8, ["followTheme", "linear", "linear-deep", "color", "width", "height"])
              ])
            ]),
            _: 3
          }, 8, ["color"])
        ], 4),
        createCommentVNode(" \u5B50\u83DC\u5355 "),
        unref(_actionsItem).length > 0 && showActions.value ? (openBlock(), createElementBlock("view", {
          key: 0,
          userInteractionEnabled: showActions.value,
          class: "absolute flex",
          style: normalizeStyle([unref(AcionPos_xy)])
        }, [
          createElementVNode("view", {
            style: normalizeStyle([{ width: props.width + "rpx", height: props.height + "rpx" }]),
            class: "flex-center"
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(_actionsItem), (item, index) => {
              return openBlock(), createBlock(tmSheet, {
                followTheme: props.followTheme,
                onClick: ($event) => change(index, item),
                key: index,
                _class: "flex flex-col flex-col-center-center",
                round: 16,
                shadow: 2,
                linear: item.linear,
                "linear-deep": item.linearDeep,
                color: item.color,
                margin: [0, 0],
                padding: [0, 0],
                width: props.width - 12,
                height: props.height - 12
              }, {
                default: withCtx(() => [
                  createVNode(tmIcon, {
                    userInteractionEnabled: false,
                    color: item.fontColor,
                    name: item.icon,
                    "font-size": item.iconSize
                  }, null, 8, ["color", "name", "font-size"]),
                  item.label ? (openBlock(), createBlock(tmText, {
                    key: 0,
                    userInteractionEnabled: false,
                    color: item.fontColor,
                    label: item.label,
                    "font-size": item.fontSize
                  }, null, 8, ["color", "label", "font-size"])) : createCommentVNode("v-if", true)
                ]),
                _: 2
              }, 1032, ["followTheme", "onClick", "linear", "linear-deep", "color", "width", "height"]);
            }), 128))
          ], 4)
        ], 12, ["userInteractionEnabled"])) : createCommentVNode("v-if", true)
      ], 4);
    };
  }
});
var tmFloatButton = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-float-button/tm-float-button.vue"]]);
export { tmFloatButton as t };
