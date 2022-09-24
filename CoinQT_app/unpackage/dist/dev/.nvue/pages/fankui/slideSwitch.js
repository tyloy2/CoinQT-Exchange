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
import { _ as _export_sfc, c as custom_props, a as tmText, t as tmApp, g as formatAppLog } from "../../tm-text.js";
import { defineComponent, computed, ref, watchEffect, onMounted, nextTick, resolveComponent, openBlock, createElementBlock, normalizeStyle, unref, normalizeClass, createVNode, withCtx, createElementVNode, Fragment, renderList, createBlock, createCommentVNode, renderSlot } from "vue";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmIcon } from "../../tm-icon.js";
import { t as tmCell } from "../../tm-cell.js";
import { t as tmCard } from "../../tm-card.js";
import { T as TmButton } from "../../tm-button.js";
import "pinia";
import "../../tm-image.js";
import "../../tm-translate.js";
import "../../tm-divider.js";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "tm-slide-switch",
  props: __spreadProps(__spreadValues({}, custom_props), {
    width: {
      type: Number,
      default: 750
    },
    height: {
      type: Number,
      default: 88
    },
    action: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    },
    transprent: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: "white"
    },
    round: {
      type: Number,
      default: 0
    },
    openStatus: {
      type: Boolean,
      default: false
    }
  }),
  emits: ["click", "action-click", "update:open-status"],
  setup(__props, { emit: emits }) {
    const props = __props;
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
    const attr = computed(() => {
      return {
        width: props.width,
        height: props.height,
        disabled: props.disabled
      };
    });
    const _disabled = ref(props.disabled);
    watchEffect(() => {
      _disabled.value = props.disabled;
    });
    const _cellwidth = computed(() => uni.upx2px(attr.value.width));
    computed(() => _cellwidth.value * 2);
    const list = computed(() => {
      let lp = props.action.map((el) => {
        var _a, _b, _c, _d;
        return __spreadValues({
          text: (_a = el == null ? void 0 : el.text) != null ? _a : "",
          color: (_b = el == null ? void 0 : el.color) != null ? _b : "white",
          width: (_c = el == null ? void 0 : el.width) != null ? _c : 180,
          icon: (_d = el == null ? void 0 : el.icon) != null ? _d : ""
        }, el);
      });
      return lp;
    });
    const maxWidth = computed(() => {
      let w = 0;
      for (let i = 0, len = list.value.length; i < len; i++) {
        w += list.value[i].width;
      }
      return uni.upx2px(w);
    });
    const _x = ref(_cellwidth.value);
    const _old_x = ref(_cellwidth.value);
    const _mX = ref(_cellwidth.value);
    const _isDrag = ref(false);
    const isRend = ref(false);
    const _animation = ref(false);
    const _isCloseAni = ref(true);
    let ChaJuli = 0;
    let maxLen = _cellwidth.value - maxWidth.value;
    watchEffect(() => props.openStatus, () => oninit());
    onMounted(() => {
      nextTick(() => isRend.value = true);
      setTimeout(() => _animation.value = true, 300);
    });
    function oninit() {
      if (props.openStatus) {
        _mX.value = _cellwidth.value;
        uni.$tm.u.debounce(() => {
          _old_x.value = maxLen;
          _mX.value = maxLen;
        }, 40);
      } else {
        _mX.value = _cellwidth.value;
      }
    }
    const onChange = (e) => {
      _mX.value = e.detail.x;
      if (_isDrag.value) {
        _old_x.value = _mX.value;
      }
      _isDrag.value = false;
      if (_mX.value < maxLen) {
        _disabled.value = true;
      }
    };
    const startDrag = (e) => {
      _isDrag.value = true;
    };
    const endDrag = () => {
      _isCloseAni.value = false;
      if (!attr.value.disabled) {
        _disabled.value = false;
      }
      if (attr.value.disabled)
        return;
      _mX.value -= 1;
      ChaJuli = Math.abs(_old_x.value) - Math.abs(_mX.value);
      debounce(() => {
        if (ChaJuli > 0) {
          if (ChaJuli >= 10) {
            _old_x.value = _cellwidth.value - maxWidth.value;
            _mX.value = _old_x.value;
            emits("update:open-status", true);
          } else {
            _x.value = _cellwidth.value;
            _mX.value = _x.value;
            emits("update:open-status", false);
          }
        } else {
          _old_x.value = _cellwidth.value;
          _mX.value = _cellwidth.value;
          emits("update:open-status", false);
        }
      }, 10, false);
    };
    const onclick = (e) => {
      emits("click", e);
    };
    const actionClick = (item, index) => {
      emits("action-click", item, index);
    };
    return (_ctx, _cache) => {
      const _component_movable_view = resolveComponent("movable-view");
      const _component_movable_area = resolveComponent("movable-area");
      return openBlock(), createElementBlock("view", {
        style: normalizeStyle(`width:${unref(attr).width}rpx;height:${unref(attr).height}rpx `),
        class: normalizeClass(["overflow", [unref(attr).disabled ? "opacity-7" : ""]]),
        renderWhole: true
      }, [
        createVNode(_component_movable_area, {
          style: normalizeStyle({
            width: unref(attr).width * 2 + "rpx",
            height: unref(attr).height + "rpx",
            transform: `translateX(-${unref(_cellwidth)}px)`
          })
        }, {
          default: withCtx(() => [
            createVNode(_component_movable_view, {
              animation: _animation.value,
              style: normalizeStyle({
                width: unref(attr).width + "rpx",
                height: unref(attr).height + "rpx"
              }),
              x: unref(_cellwidth),
              disabled: "",
              direction: "horizontal",
              class: "flex flex-1 flex-row flex-between"
            }, {
              default: withCtx(() => [
                createElementVNode("view"),
                createElementVNode("view", { class: "flex flex-row flex-row-center-end" }, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(unref(list), (item, index) => {
                    return openBlock(), createBlock(tmSheet, {
                      "no-level": "",
                      "hover-class": "opacity-7",
                      onClick: ($event) => actionClick(item, index),
                      margin: [0, 0],
                      padding: [0, 0],
                      key: index,
                      color: item.color,
                      height: unref(attr).height,
                      width: item.width,
                      _class: "flex-center flex-row"
                    }, {
                      default: withCtx(() => [
                        item.icon ? (openBlock(), createBlock(tmIcon, {
                          key: 0,
                          "font-size": 26,
                          _class: "pr-8",
                          userInteractionEnabled: false,
                          name: item.icon
                        }, null, 8, ["name"])) : createCommentVNode("v-if", true),
                        createVNode(tmText, {
                          userInteractionEnabled: false,
                          label: item.text
                        }, null, 8, ["label"])
                      ]),
                      _: 2
                    }, 1032, ["onClick", "color", "height", "width"]);
                  }), 128))
                ])
              ]),
              _: 1
            }, 8, ["animation", "style", "x"]),
            createVNode(_component_movable_view, {
              animation: _animation.value,
              onClick: onclick,
              onTouchstart: startDrag,
              onMousedown: startDrag,
              onTouchend: endDrag,
              onMouseleave: endDrag,
              onMouseup: endDrag,
              disabled: _disabled.value,
              onChange,
              x: _mX.value,
              style: normalizeStyle({
                width: unref(attr).width + "rpx",
                height: unref(attr).height + "rpx"
              }),
              class: "flex flex-1 flex-row flex-between absolute l-0 t-0",
              direction: "horizontal"
            }, {
              default: withCtx(() => [
                isRend.value ? (openBlock(), createBlock(tmSheet, {
                  key: 0,
                  shadow: 0,
                  outlined: props.outlined,
                  borderStyle: props.borderStyle,
                  borderDirection: props.borderDirection,
                  linearDeep: props.linearDeep,
                  linear: props.linear,
                  round: props.round,
                  color: props.color,
                  text: _disabled.value,
                  transprent: props.transprent,
                  width: unref(attr).width,
                  height: unref(attr).height,
                  margin: [0, 0],
                  padding: [0, 0]
                }, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "default")
                  ]),
                  _: 3
                }, 8, ["outlined", "borderStyle", "borderDirection", "linearDeep", "linear", "round", "color", "text", "transprent", "width", "height"])) : createCommentVNode("v-if", true)
              ]),
              _: 3
            }, 8, ["animation", "disabled", "x", "style"])
          ]),
          _: 3
        }, 8, ["style"])
      ], 6);
    };
  }
});
var tmSlideSwitch = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-slide-switch/tm-slide-switch.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "slideSwitch",
  setup(__props) {
    const isopen = ref(true);
    const action = ref([
      { text: "\u64CD\u4F5C", color: "black" },
      { text: "\u5220\u9664\u6309\u94AE", color: "green", icon: "tmicon-delete" }
    ]);
    function onclick(item, index) {
      formatAppLog("log", "at pages/fankui/slideSwitch.nvue:53", item, index);
      uni.showToast({
        title: `\u70B9\u51FB${item.text}`
      });
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
                  fontSize: 24,
                  _class: "font-weight-b",
                  label: "\u901A\u8FC7\u4E0Ecell\u7EC4\u4EF6\u7EC4\u5408\u53EF\u6ED1\u52A8\u5217\u8868"
                })
              ]),
              _: 1
            }),
            createVNode(tmSheet, { padding: [0, 0] }, {
              default: withCtx(() => [
                createVNode(tmSlideSwitch, {
                  onActionClick: onclick,
                  width: 686,
                  height: 84,
                  action: action.value
                }, {
                  default: withCtx(() => [
                    createVNode(tmCell, {
                      margin: [0, 0],
                      title: "\u5411\u5DE6\u6ED1\u52A8,\u5E76\u70B9\u51FB\u5E95\u90E8\u6309\u94AE"
                    })
                  ]),
                  _: 1
                }, 8, ["action"]),
                createVNode(tmSlideSwitch, {
                  disabled: "",
                  width: 686,
                  height: 84,
                  action: action.value
                }, {
                  default: withCtx(() => [
                    createVNode(tmCell, {
                      margin: [0, 0],
                      title: "\u6211\u88AB\u7981\u7528\u4E86"
                    })
                  ]),
                  _: 1
                }, 8, ["action"]),
                (openBlock(), createElementBlock(Fragment, null, renderList(4, (item) => {
                  return createVNode(tmSlideSwitch, {
                    key: item,
                    width: 686,
                    height: 84,
                    action: action.value
                  }, {
                    default: withCtx(() => [
                      createVNode(tmCell, {
                        margin: [0, 0],
                        title: "\u5411\u5DE6\u6ED1\u52A8\u8BD5" + item
                      }, null, 8, ["title"])
                    ]),
                    _: 2
                  }, 1032, ["action"]);
                }), 64))
              ]),
              _: 1
            }),
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createVNode(tmText, {
                  fontSize: 24,
                  _class: "font-weight-b",
                  label: "\u5229\u7528\u63D2\u69FD\u653E\u7F6E\u5176\u5B83\u7EC4\u4EF6"
                })
              ]),
              _: 1
            }),
            createElementVNode("view", { class: "mx-32 round-2 overflow" }, [
              createVNode(tmSlideSwitch, {
                "open-status": isopen.value,
                "onUpdate:open-status": _cache[0] || (_cache[0] = ($event) => isopen.value = $event),
                width: 686,
                height: 300,
                round: 0,
                action: action.value
              }, {
                default: withCtx(() => [
                  createVNode(tmCard, {
                    margin: [0, 0],
                    shadow: 0,
                    status: "2022-5-2",
                    title: "\u5411\u5DE6\u6ED1\u52A8\u8BD5\u4E0B",
                    content: "\u8FD9\u662F\u4E00\u4E2A\u57FA\u7840\u5361\u7247\u793A\u4F8B\uFF0C\u975E\u5E38\u7B80\u5355\u4E14\u5B9E\u7528\u3002\u8FD9\u662F\u4E00\u4E2A\u57FA\u7840\u5361\u7247\u793A\u4F8B\uFF0C\u975E\u5E38\u7B80\u5355\u4E14\u5B9E\u7528\u3002"
                  }, {
                    action: withCtx(() => [
                      createElementVNode("view", { class: "flex flex-1 flex-row flex-row-center-end" }, [
                        createVNode(TmButton, {
                          margin: [24, 0],
                          label: "\u786E\u8BA4",
                          "font-size": 24,
                          width: 120,
                          height: 50
                        }),
                        createVNode(TmButton, {
                          color: "white",
                          label: "\u53D6\u6D88",
                          "font-size": 24,
                          width: 120,
                          height: 50
                        })
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["open-status", "action"])
            ])
          ]),
          _: 1
        })
      ]);
    };
  }
});
var slideSwitch = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/fankui/slideSwitch.nvue"]]);
export { slideSwitch as default };
