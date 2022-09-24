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
import { defineComponent, ref, provide, computed, watch, openBlock, createElementBlock, normalizeClass, renderSlot, createElementVNode, normalizeStyle, getCurrentInstance, inject, unref, createCommentVNode, createVNode, withCtx, createBlock, withModifiers, Fragment, renderList } from "vue";
import { _ as _export_sfc, c as custom_props, a as tmText, t as tmApp } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmIcon } from "../../tm-icon.js";
import { t as tmDivider } from "../../tm-divider.js";
import "pinia";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "tm-steps",
  props: {
    direction: {
      type: String,
      default: "horizontal"
    },
    current: {
      type: [Number],
      default: 0
    },
    defaultCurrent: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      default: ""
    },
    showLine: {
      type: Boolean,
      default: true
    },
    changeable: {
      type: Boolean,
      default: false
    },
    beforeStepChange: {
      type: [Function, Boolean],
      default: () => false
    },
    contentHeight: {
      type: Number,
      default: 160
    },
    color: {
      type: String,
      default: "grey-3"
    },
    activeColor: {
      type: String,
      default: "primary"
    },
    type: {
      type: String,
      default: "dot"
    }
  },
  emits: ["change", "update:current", "step-click"],
  setup(__props, { expose, emit: emits }) {
    var _a;
    const props = __props;
    const _current = ref((_a = props.defaultCurrent) != null ? _a : -1);
    provide("tmStepsCureent", computed(() => _current.value));
    const _countCurrent = ref(-1);
    provide("tmStepsCountCureent", computed(() => _countCurrent.value));
    provide("tmStepsCountActiveColor", computed(() => props.activeColor));
    provide("tmStepsCountColor", computed(() => props.color));
    const compoenentName = "tmSteps";
    function pushKey() {
      _countCurrent.value += 1;
      return _countCurrent.value;
    }
    watch(() => props.current, () => {
      _current.value = props.current;
      emits("change", _current.value);
    });
    function steplick(index) {
      _current.value = index;
      emits("step-click", index);
      emits("update:current", _current.value);
    }
    expose({ pushKey, compoenentName, steplick });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        class: normalizeClass(["flex relative flex-row flex-row-start-center px-24", [props.direction == "horizontal" ? "flex-row" : ""]]),
        renderWhole: true
      }, [
        renderSlot(_ctx.$slots, "default"),
        createElementVNode("view", {
          style: normalizeStyle([{ "clear": "both" }, [{ height: __props.contentHeight + "rpx" }]])
        }, null, 4)
      ], 2);
    };
  }
});
var tmSteps = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-steps/tm-steps.vue"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "tm-steps-item",
  props: __spreadProps(__spreadValues({}, custom_props), {
    transprent: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: ""
    },
    activeColor: {
      type: String,
      default: ""
    },
    title: {
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
    size: {
      type: Number,
      default: 32
    }
  }),
  setup(__props) {
    var _a, _b, _c, _d;
    const props = __props;
    const proxy = (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    let parent = proxy.$parent;
    while (parent) {
      if ((parent == null ? void 0 : parent.compoenentName) == "tmSteps" || !parent) {
        break;
      } else {
        parent = (_c = parent == null ? void 0 : parent.$parent) != null ? _c : void 0;
      }
    }
    const _isNvue = ref(false);
    _isNvue.value = true;
    const _cureent = ref((_d = parent == null ? void 0 : parent.pushKey()) != null ? _d : 0);
    const _countCurrent = inject("tmStepsCountCureent", computed(() => 0));
    const _tmStepsCureent = inject("tmStepsCureent", computed(() => -1));
    const tmStepsCountActiveColor = inject("tmStepsCountActiveColor", computed(() => "primary"));
    const tmStepsCountColor = inject("tmStepsCountColor", computed(() => "grey-3"));
    const _activeColor = computed(() => {
      if (props.activeColor)
        return props.activeColor;
      return tmStepsCountActiveColor.value;
    });
    const _typeModel = computed(() => parent.$props.type);
    const status_obj = {
      wait: {
        color: _activeColor.value,
        icon: "tmicon-clock-fill"
      },
      process: {
        color: "grey-2",
        icon: "tmicon-loading"
      },
      finish: {
        color: "green",
        icon: "tmicon-check"
      },
      error: {
        color: "red",
        icon: "tmicon-times"
      }
    };
    const status = computed(() => {
      if (!_isActive.value)
        return null;
      if (!status_obj.hasOwnProperty(parent.$props.status))
        return null;
      return status_obj[String(parent.$props.status)];
    });
    const _isActive = computed(() => _cureent.value === _tmStepsCureent.value);
    const _isCheck = computed(() => _cureent.value < _tmStepsCureent.value);
    const _color = computed(() => {
      if (status.value && _isActive.value) {
        return status.value.color;
      }
      if (_isCheck.value)
        return _activeColor.value;
      if (props.color)
        return props.color;
      return tmStepsCountColor.value;
    });
    const _icon = computed(() => {
      return props.icon;
    });
    const showLine = computed(() => parent.$props.showLine);
    const _width = computed(() => 100 / (_countCurrent.value + 1) + "%");
    const offsetLeft = computed(() => {
      let nowstep = _cureent.value + 1;
      return (nowstep - 1) * (100 / (_countCurrent.value + 1));
    });
    async function stepClick() {
      if (!parent.$props.changeable)
        return;
      if (typeof parent.$props.beforeStepChange === "function") {
        uni.showLoading({ title: "...", mask: true });
        let p = await parent.$props.beforeStepChange();
        if (typeof p === "function") {
          p = await p();
        }
        uni.hideLoading();
        if (!p)
          return;
      }
      parent == null ? void 0 : parent.steplick(_cureent.value);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        class: normalizeClass([
          _isNvue.value ? "relative " : "absolute",
          "flex flex-row flex-row-start-center overflow",
          _cureent.value < unref(_countCurrent) ? "flex-1" : ""
        ]),
        style: normalizeStyle([
          !_isNvue.value ? { width: _cureent.value < unref(_countCurrent) ? unref(_width) : "auto", left: `${unref(offsetLeft)}%`, marginLeft: "24rpx" } : ""
        ]),
        renderWhole: true
      }, [
        createCommentVNode(" \u5185\u5BB9 \u533A\u57DF\u3002 "),
        createElementVNode("view", {
          class: "flex flex-col",
          style: { "justify-content": "flex-start", "align-items": "center" }
        }, [
          createVNode(tmSheet, {
            "no-level": "",
            onClick: stepClick,
            followTheme: props.followTheme,
            followDark: props.followDark,
            dark: props.dark,
            shadow: props.shadow,
            outlined: props.outlined,
            borderStyle: props.borderStyle,
            borderDirection: props.borderDirection,
            text: unref(_isCheck) ? false : !unref(status),
            linearDeep: props.linearDeep,
            linear: props.linear,
            color: unref(_color),
            round: 24,
            _class: "flex-center",
            margin: [0, 0],
            padding: [0, 0],
            width: unref(_typeModel) != "dot" ? props.size : 20,
            height: unref(_typeModel) != "dot" ? props.size : 20
          }, {
            default: withCtx(() => [
              !unref(_icon) && !unref(status) && unref(_typeModel) != "dot" ? (openBlock(), createBlock(tmText, {
                key: 0,
                onClick: stepClick,
                userInteractionEnabled: false,
                "font-size": 22,
                label: _cureent.value + 1
              }, null, 8, ["label"])) : createCommentVNode("v-if", true),
              unref(status) && unref(_isActive) && unref(_typeModel) != "dot" ? (openBlock(), createBlock(tmIcon, {
                key: 1,
                "font-size": 22,
                onClick: stepClick,
                name: unref(status).icon
              }, null, 8, ["name"])) : createCommentVNode("v-if", true),
              !unref(status) && unref(_icon) && unref(_typeModel) != "dot" ? (openBlock(), createBlock(tmIcon, {
                key: 2,
                "font-size": 22,
                onClick: stepClick,
                name: unref(_icon)
              }, null, 8, ["name"])) : createCommentVNode("v-if", true)
            ]),
            _: 1
          }, 8, ["followTheme", "followDark", "dark", "shadow", "outlined", "borderStyle", "borderDirection", "text", "linearDeep", "linear", "color", "width", "height"]),
          createElementVNode("view", {
            onClick: withModifiers(stepClick, ["stop"]),
            style: { "width": "120rpx" },
            class: "flex flex-col flex-col-center-center mt-12"
          }, [
            renderSlot(_ctx.$slots, "default", {}, () => [
              props.title ? (openBlock(), createBlock(tmText, {
                key: 0,
                onClick: stepClick,
                userInteractionEnabled: false,
                color: unref(_isCheck) ? unref(_activeColor) : "",
                _class: "text-overflow-2",
                "font-size": 24,
                label: props.title
              }, null, 8, ["color", "label"])) : createCommentVNode("v-if", true),
              props.label ? (openBlock(), createBlock(tmText, {
                key: 1,
                onClick: stepClick,
                userInteractionEnabled: false,
                color: unref(_isCheck) ? unref(_activeColor) : "",
                _class: "text-overflow-2 opacity-5",
                "font-size": 22,
                label: props.label
              }, null, 8, ["color", "label"])) : createCommentVNode("v-if", true)
            ])
          ], 8, ["onClick"])
        ]),
        createCommentVNode(" \u7EBF "),
        _cureent.value < unref(_countCurrent) && unref(showLine) ? (openBlock(), createElementBlock("view", {
          key: 0,
          class: "flex-1 flex-col flex-col-start-start",
          style: { "width": "0" }
        }, [
          createElementVNode("view", {
            style: normalizeStyle([{ marginTop: (unref(_typeModel) != "dot" ? props.size / 2 : 10) + "rpx" }])
          }, [
            createVNode(tmDivider, {
              color: unref(_color),
              followDark: props.followDark,
              dark: props.dark,
              margin: [16, 0]
            }, null, 8, ["color", "followDark", "dark"])
          ], 4)
        ])) : createCommentVNode("v-if", true)
      ], 6);
    };
  }
});
var tmStepsItem = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-steps-item/tm-steps-item.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "steps",
  setup(__props) {
    const list = ref([
      { title: "\u5F00\u59CB" },
      { title: "\u6295\u653E\u4E2D" },
      { title: "\u5BA1\u6838" },
      { title: "\u6700\u540E\u5BA1\u67E5" },
      { title: "\u5B8C\u6210" }
    ]);
    const list2 = ref([
      { title: "\u5F00\u59CB" },
      { title: "\u6295\u653E\u4E2D" },
      { title: "\u5BA1\u6838" }
    ]);
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
                  fontSize: 24,
                  _class: "font-weight-b",
                  label: "\u57FA\u7840\u5C5E\u6027,\u66F4\u591A\u73A9\u6CD5\u8BF7\u524D\u5F80\u6587\u6863\u3002"
                })
              ]),
              _: 1
            }),
            createVNode(tmSheet, {
              padding: [0, 24],
              margin: [0, 0]
            }, {
              default: withCtx(() => [
                createVNode(tmSteps, {
                  color: "primary",
                  defaultCurrent: 1,
                  contentHeight: 80
                }, {
                  default: withCtx(() => [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(list.value, (item, index) => {
                      return openBlock(), createBlock(tmStepsItem, {
                        title: item.title,
                        key: index
                      }, null, 8, ["title"]);
                    }), 128))
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            createVNode(tmSheet, {
              padding: [0, 24],
              margin: [0, 0]
            }, {
              default: withCtx(() => [
                createVNode(tmSteps, {
                  type: "number",
                  activeColor: "green",
                  defaultCurrent: 2,
                  contentHeight: 80
                }, {
                  default: withCtx(() => [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(list2.value, (item, index) => {
                      return openBlock(), createBlock(tmStepsItem, {
                        title: item.title,
                        key: index
                      }, null, 8, ["title"]);
                    }), 128))
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            createVNode(tmSheet, {
              padding: [0, 24],
              margin: [0, 0]
            }, {
              default: withCtx(() => [
                createVNode(tmSteps, {
                  activeColor: "green",
                  status: "error",
                  defaultCurrent: 1,
                  contentHeight: 80
                }, {
                  default: withCtx(() => [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(list2.value, (item, index) => {
                      return openBlock(), createBlock(tmStepsItem, {
                        title: item.title,
                        key: index
                      }, null, 8, ["title"]);
                    }), 128))
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]);
    };
  }
});
var steps = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/daohang/steps.nvue"]]);
export { steps as default };
