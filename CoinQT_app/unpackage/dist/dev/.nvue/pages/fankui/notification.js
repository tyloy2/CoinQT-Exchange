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
import { defineComponent, getCurrentInstance, ref, inject, computed, nextTick, onMounted, openBlock, createElementBlock, normalizeClass, normalizeStyle, unref, createVNode, withCtx, renderSlot, createElementVNode, createCommentVNode } from "vue";
import { _ as _export_sfc, c as custom_props, a as tmText, t as tmApp } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmIcon } from "../../tm-icon.js";
import { t as tmTranslate } from "../../tm-translate.js";
import { t as tmDivider } from "../../tm-divider.js";
import { T as TmButton } from "../../tm-button.js";
import "pinia";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "tm-notification",
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
      default: 0
    },
    margin: {
      type: Array,
      default: () => [0, 0]
    },
    padding: {
      type: Array,
      default: () => [24, 16]
    },
    duration: {
      type: Number,
      default: 2e3
    },
    offset: {
      type: Array,
      default: () => [32, 32]
    },
    placement: {
      type: String,
      default: "topLeft"
    },
    label: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: "tmicon-info-circle-fill"
    }
  }),
  emits: ["click", "close"],
  setup(__props, { expose, emit: emits }) {
    var _a, _b;
    const props = __props;
    (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const tranmatioan = ref(null);
    const sysinfo = inject("tmuiSysInfo", computed(() => {
      return { bottom: 0, height: 750, width: uni.upx2px(750), top: 0, isCustomHeader: false, sysinfo: null };
    }));
    let windowBottom = computed(() => sysinfo.value.bottom);
    let windowTop = computed(() => sysinfo.value.top);
    let windowWidth = computed(() => sysinfo.value.width);
    const timeid = ref(uni.$tm.u.getUid(5));
    const iconProxy = ref("");
    const labelProxy = ref("");
    const isEnd = ref(true);
    const showDom = ref(false);
    const handleClose = ref(false);
    const label_str = computed({
      get: () => labelProxy.value,
      set: (val) => {
        labelProxy.value = val;
        if (props.label !== "") {
          showDom.value = true;
        }
        nextTick(function() {
          var _a2;
          if (tranmatioan.value) {
            (_a2 = tranmatioan.value) == null ? void 0 : _a2.play();
          }
        });
      }
    });
    const icon_str = computed({
      get: () => iconProxy.value,
      set: (val) => {
        iconProxy.value = val;
        if (props.label !== "") {
          showDom.value = true;
        }
        nextTick(function() {
          var _a2;
          if (tranmatioan.value) {
            (_a2 = tranmatioan.value) == null ? void 0 : _a2.play();
          }
        });
      }
    });
    const tranName = computed(() => {
      if (props.placement == "topLeft" || props.placement == "bottomLeft")
        return "left";
      if (props.placement == "topRight" || props.placement == "bottomRight")
        return "right";
      if (props.placement == "top")
        return "up";
      if (props.placement == "bottom")
        return "down";
    });
    const pos = computed(() => {
      if (props.placement == "topLeft") {
        return {
          top: windowTop.value + uni.upx2px(props.offset[1]),
          left: uni.upx2px(props.offset[0]),
          right: null,
          bottom: null,
          width: null
        };
      }
      if (props.placement == "topRight") {
        return {
          top: windowTop.value + uni.upx2px(props.offset[1]),
          left: null,
          right: uni.upx2px(props.offset[0]),
          bottom: null,
          width: null
        };
      }
      if (props.placement == "bottomLeft") {
        return {
          top: null,
          left: uni.upx2px(props.offset[0]),
          right: null,
          bottom: windowBottom.value + uni.upx2px(props.offset[1]),
          width: null
        };
      }
      if (props.placement == "bottomRight") {
        return {
          top: null,
          left: null,
          right: uni.upx2px(props.offset[0]),
          bottom: windowBottom.value + uni.upx2px(props.offset[1]),
          width: null
        };
      }
      if (props.placement == "top") {
        return {
          top: windowTop.value + uni.upx2px(props.offset[1]),
          left: uni.upx2px(props.offset[0]),
          right: null,
          bottom: null,
          width: windowWidth.value - uni.upx2px(props.offset[0]) * 2
        };
      }
      if (props.placement == "bottom") {
        return {
          top: null,
          left: uni.upx2px(props.offset[0]),
          right: null,
          bottom: windowBottom.value + uni.upx2px(props.offset[1]),
          width: windowWidth.value - uni.upx2px(props.offset[0]) * 2
        };
      }
      return {
        left: null,
        right: null,
        bottom: null,
        width: null,
        top: null
      };
    });
    const reverse = ref(true);
    onMounted(() => {
      label_str.value = props.label;
      icon_str.value = props.icon;
    });
    function endAnimation() {
      clearTimeout(timeid.value);
      if (props.duration == 0 && !handleClose.value)
        return;
      timeid.value = setTimeout(function() {
        showDom.value = false;
        reverse.value = true;
        isEnd.value = true;
        emits("close");
      }, props.duration);
    }
    function show(arg) {
      if (!isEnd.value)
        return;
      let { icon, label } = arg || {};
      if (!icon && !label) {
        showDom.value = true;
        reverse.value = true;
        handleClose.value = false;
        nextTick(function() {
          var _a2;
          if (tranmatioan.value) {
            (_a2 = tranmatioan.value) == null ? void 0 : _a2.play();
          }
        });
        return;
      }
      label_str.value = label || "";
      icon_str.value = icon || "";
    }
    function hide() {
      if (!isEnd.value)
        return;
      reverse.value = false;
      handleClose.value = true;
      if (tranmatioan.value) {
        nextTick(() => {
          var _a2;
          return (_a2 = tranmatioan.value) == null ? void 0 : _a2.play();
        });
      } else {
        showDom.value = false;
        reverse.value = true;
      }
      emits("close");
    }
    expose({ show, hide });
    return (_ctx, _cache) => {
      return showDom.value ? (openBlock(), createElementBlock("view", {
        key: 0,
        class: normalizeClass(["fixed "]),
        style: normalizeStyle([
          unref(pos).left !== null ? { left: unref(pos).left + "px" } : "",
          unref(pos).right !== null ? { right: unref(pos).right + "px" } : "",
          unref(pos).top !== null ? { top: unref(pos).top + "px" } : "",
          unref(pos).bottom !== null ? { bottom: unref(pos).bottom + "px" } : "",
          unref(pos).width !== null ? { width: unref(pos).width + "px" } : "",
          props.shadow ? { padding: props.shadow * 4 + "rpx" } : "",
          { zIndex: 500 }
        ]),
        renderWhole: true
      }, [
        createVNode(tmTranslate, {
          ref_key: "tranmatioan",
          ref: tranmatioan,
          autoPlay: false,
          name: unref(tranName),
          onEnd: endAnimation,
          reverse: reverse.value
        }, {
          default: withCtx(() => [
            createVNode(tmSheet, {
              onClick: _cache[0] || (_cache[0] = ($event) => emits("click", $event)),
              color: props.color,
              _class: _ctx._class,
              _style: _ctx._style,
              followTheme: props.followTheme,
              dark: props.dark,
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
              margin: props.margin,
              padding: props.padding
            }, {
              default: withCtx(() => [
                renderSlot(_ctx.$slots, "default", {}, () => [
                  createElementVNode("view", { class: "flex flex-row flex-row-center-between relative" }, [
                    createElementVNode("view", { class: "flex flex-1 flex-row overflow flex-row-center-start" }, [
                      createVNode(tmIcon, {
                        _class: "pr-10",
                        fontSize: 26,
                        name: unref(icon_str)
                      }, null, 8, ["name"]),
                      renderSlot(_ctx.$slots, "default", {}, () => [
                        createVNode(tmText, {
                          _class: "text-overflow-1",
                          label: unref(label_str)
                        }, null, 8, ["label"])
                      ])
                    ]),
                    createElementVNode("view", {
                      class: "pl-24 pr-12 flex flex-center",
                      style: { "width": "0rpx" }
                    }, [
                      createVNode(tmIcon, {
                        onClick: hide,
                        fontSize: 24,
                        name: "tmicon-times"
                      })
                    ])
                  ])
                ])
              ]),
              _: 3
            }, 8, ["color", "_class", "_style", "followTheme", "dark", "round", "shadow", "outlined", "border", "borderStyle", "borderDirection", "text", "transprent", "linear", "linearDeep", "margin", "padding"])
          ]),
          _: 3
        }, 8, ["name", "reverse"])
      ], 4)) : createCommentVNode("v-if", true);
    };
  }
});
var tmNotification = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-notification/tm-notification.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "notification",
  setup(__props) {
    const msg = ref(null);
    const placement = ref("topLeft");
    function show(e) {
      placement.value = e;
      msg.value.show();
    }
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
                  label: "\u4E0B\u9762\u662F\u4E00\u4E9B\u5176\u5B83\u5C5E\u6027,\u66F4\u591A\u73A9\u6CD5\u8BF7\u524D\u5F80\u6587\u6863\u3002"
                }),
                createVNode(tmDivider),
                createElementVNode("view", { class: "flex flex-row flex-wrap" }, [
                  createVNode(TmButton, {
                    margin: [12, 12],
                    onClick: _cache[0] || (_cache[0] = ($event) => show("topLeft")),
                    color: "white",
                    width: 120,
                    height: 56,
                    "font-size": 24,
                    label: "\u9ED8\u8BA4"
                  }),
                  createVNode(TmButton, {
                    margin: [12, 12],
                    onClick: _cache[1] || (_cache[1] = ($event) => show("topRight")),
                    color: "red",
                    width: 120,
                    height: 56,
                    "font-size": 24,
                    label: "\u663E\u793A\u53F3\u8FB9"
                  }),
                  createVNode(TmButton, {
                    margin: [12, 12],
                    onClick: _cache[2] || (_cache[2] = ($event) => show("top")),
                    color: "orange",
                    width: 120,
                    height: 56,
                    "font-size": 24,
                    label: "\u663E\u793A\u4E0A\u65B9"
                  }),
                  createVNode(TmButton, {
                    margin: [12, 12],
                    onClick: _cache[3] || (_cache[3] = ($event) => show("bottomLeft")),
                    color: "pink",
                    width: 120,
                    height: 56,
                    "font-size": 24,
                    label: "\u663E\u793A\u5E95\u5DE6"
                  }),
                  createVNode(TmButton, {
                    margin: [12, 12],
                    onClick: _cache[4] || (_cache[4] = ($event) => show("bottomRight")),
                    color: "green",
                    width: 120,
                    height: 56,
                    "font-size": 24,
                    label: "\u663E\u793A\u5E95\u53F3"
                  }),
                  createVNode(TmButton, {
                    margin: [12, 12],
                    onClick: _cache[5] || (_cache[5] = ($event) => show("bottom")),
                    color: "green",
                    text: "",
                    shadow: 0,
                    width: 120,
                    height: 56,
                    "font-size": 24,
                    label: "\u663E\u793A\u5E95\u90E8"
                  })
                ])
              ]),
              _: 1
            }),
            createVNode(tmNotification, {
              placement: placement.value,
              ref_key: "msg",
              ref: msg,
              label: "\u6D88\u606F\u63D0\u9192"
            }, null, 8, ["placement"])
          ]),
          _: 1
        })
      ]);
    };
  }
});
var notification = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/fankui/notification.nvue"]]);
export { notification as default };
