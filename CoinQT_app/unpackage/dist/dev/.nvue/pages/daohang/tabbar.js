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
import { _ as _export_sfc, c as custom_props, u as useTmpiniaStore, a as tmText, t as tmApp, g as formatAppLog } from "../../tm-text.js";
import { defineComponent, computed, ref, provide, watch, openBlock, createElementBlock, normalizeStyle, unref, createCommentVNode, createElementVNode, createVNode, renderSlot, getCurrentInstance, inject, onUnmounted, nextTick, withCtx, normalizeClass, createBlock } from "vue";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmBadge } from "../../tm-badge.js";
import { t as tmIcon } from "../../tm-icon.js";
import "pinia";
var _style_0 = { "barcont": { "": { "display": "flex", "flexDirection": "row", "justifyContent": "space-around", "alignItems": "center" } } };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "tm-tabbar",
  props: __spreadProps(__spreadValues({}, custom_props), {
    transprent: {
      type: [Boolean],
      default: false
    },
    color: {
      type: [String],
      default: "white"
    },
    text: {
      type: [Boolean],
      default: false
    },
    round: {
      type: [Number],
      default: 0
    },
    shadow: {
      type: [Number],
      default: 0
    },
    width: {
      type: [Number],
      default: 0
    },
    bottom: {
      type: [Number],
      default: 0
    },
    showSafe: {
      type: [Boolean],
      default: false
    },
    active: {
      type: Number,
      default: -1
    },
    autoSelect: {
      type: Boolean,
      default: true
    }
  }),
  emits: ["change", "update:active"],
  setup(__props, { expose, emit: emits }) {
    var _a, _b;
    const props = __props;
    useTmpiniaStore();
    let sys = uni.getSystemInfoSync();
    const _width = computed(() => uni.upx2px(props.width) || (sys == null ? void 0 : sys.windowWidth) || 750);
    const _blur = computed(() => props.blur);
    const _activeUrl = ref("");
    const _activeUid = ref("");
    const tmTabbarId = "tmTabbarId";
    const _cachlist = ref([]);
    const _showSafe = ref(props.showSafe);
    const _activeIndex = ref(props.active);
    const win_bottom = (_b = (_a = sys == null ? void 0 : sys.safeAreaInsets) == null ? void 0 : _a.bottom) != null ? _b : 0;
    if (win_bottom > 0) {
      _showSafe.value = true;
    }
    const _totalBarHeight = computed(() => {
      if (_showSafe.value)
        return 90;
      return 75;
    });
    const _BarHeight = computed(() => {
      if (_showSafe.value)
        return 75;
      return 60;
    });
    function setNowurl(url, nowuid) {
      _activeUrl.value = url;
      _activeUid.value = String(nowuid);
    }
    function pushKey(uid) {
      _cachlist.value = [.../* @__PURE__ */ new Set([..._cachlist.value, uid])];
    }
    function delKey(uid) {
      _cachlist.value = _cachlist.value.filter((el) => el != uid);
    }
    expose({ tmTabbarId, setNowurl, pushKey, delKey });
    provide("tmTabbarUrl", computed(() => _activeUrl.value));
    provide("tmTabbarUid", computed(() => _activeUid.value));
    provide("tmTabbarWidth", computed(() => Math.ceil(_width / _cachlist.value.length)));
    provide("tmTabbarItemList", computed(() => _cachlist.value));
    provide("tmTabbarItemActive", computed(() => _activeIndex.value));
    provide("tmTabbarItemSafe", _showSafe.value);
    provide("tmTabbarItemAutoSelect", computed(() => props.autoSelect));
    watch(() => props.active, () => {
      if (props.active == _activeIndex.value)
        return;
      _activeIndex.value = props.active;
    });
    watch(_activeIndex, () => {
      emits("change", _activeIndex.value);
      emits("update:active", _activeIndex.value);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        class: "fixed l-0 b-0 flex",
        style: normalizeStyle({ width: unref(_width) + "px", height: unref(_totalBarHeight) + "px", transform: `translateY(${props.bottom}rpx)` }),
        renderWhole: true
      }, [
        createCommentVNode(` 			@click="emits('click', $event)"    `),
        createElementVNode("view", {
          class: "relative",
          style: { "top": "15px" }
        }, [
          createVNode(tmSheet, {
            blur: unref(_blur),
            color: props.color,
            parenClass: "relative",
            class: "relative",
            followTheme: props.followTheme,
            dark: props.dark,
            round: props.round,
            shadow: props.shadow,
            outlined: props.outlined,
            border: 0,
            borderDirection: "top",
            text: props.text,
            transprent: false,
            linear: props.linear,
            linearDeep: props.linearDeep,
            margin: [0, 0],
            padding: [0, 0],
            height: unref(_BarHeight),
            width: unref(_width),
            unit: "px"
          }, null, 8, ["blur", "color", "followTheme", "dark", "round", "shadow", "outlined", "text", "linear", "linearDeep", "height", "width"])
        ]),
        createElementVNode("view", {
          class: "absolute flex flex-col l-0",
          style: normalizeStyle({ width: unref(_width) + "px", height: unref(_totalBarHeight) + "px" })
        }, [
          createElementVNode("view", {
            class: "relative barcont flex flex-row flex-row-top-center flex-around flex-1",
            style: normalizeStyle({ width: unref(_width) + "px" })
          }, [
            renderSlot(_ctx.$slots, "default")
          ], 4)
        ], 4)
      ], 4);
    };
  }
});
var tmTabbar = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["styles", [_style_0]], ["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-tabbar/tm-tabbar.vue"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "tm-tabbar-item",
  props: __spreadProps(__spreadValues({}, custom_props), {
    followTheme: {
      type: [Boolean, String],
      default: true
    },
    transprent: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: "white"
    },
    fontColor: {
      type: String,
      default: "grey-darken-1"
    },
    linear: {
      type: String,
      default: ""
    },
    activeColor: {
      type: String,
      default: "primary"
    },
    active: {
      type: Boolean,
      default: false
    },
    btnTop: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    },
    unicon: {
      type: String,
      default: ""
    },
    textSize: {
      type: Number,
      default: 20
    },
    iconSize: {
      type: Number,
      default: 38
    },
    dot: {
      type: [Boolean],
      default: false
    },
    dotColor: {
      type: [String],
      default: "red"
    },
    dotIcon: {
      type: [String],
      default: ""
    },
    count: {
      type: [Number, String],
      default: 0
    },
    maxCount: {
      type: [Number],
      default: 99
    },
    url: {
      type: [String],
      default: ""
    },
    openType: {
      type: String,
      default: "navigate"
    },
    beforeClick: {
      type: [Function, Boolean],
      default: () => false
    },
    load: {
      type: [Boolean, String],
      default: false
    },
    data: {
      type: [Object, String, Number],
      default: () => void 0
    }
  }),
  emits: ["click", "beforeClick"],
  setup(__props, { emit: emits }) {
    var _a, _b, _c;
    const props = __props;
    const store = useTmpiniaStore();
    const proxy = (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const _btnTop = computed(() => props.btnTop);
    const _transprent = computed(() => {
      if (_btnTop.value === true)
        return false;
      return true;
    });
    const _styletop = computed(() => {
      if (_btnTop.value !== true)
        return "top:15px";
      return "top:0px";
    });
    const _padding = computed(() => {
      return [0, 0];
    });
    const _load = ref(props.load);
    const _active = ref(false);
    const c_font_style = computed(() => {
      return { dotColor: props.dotColor, text: props.text, icon: props.icon, textSize: props.textSize, iconSize: props.iconSize, unicon: props.unicon };
    });
    const uid = uni.$tm.u.getUid(1);
    const tmTabbarWidth = inject("tmTabbarWidth", computed(() => 50));
    const _width = computed(() => {
      if (_btnTop.value === true)
        return 60;
      return tmTabbarWidth.value;
    });
    inject("tmTabbarUrl", computed(() => ""));
    const tmTabbarItemList = inject("tmTabbarItemList", computed(() => []));
    const nowUid = inject("tmTabbarUid", computed(() => ""));
    inject("tmTabbarItemSafe", false);
    const tmTabbarItemActive = inject("tmTabbarItemActive", computed(() => -1));
    const tmTabbarItemAutoSelect = inject("tmTabbarItemAutoSelect", computed(() => false));
    const _color = computed(() => {
      if (_active.value === true && !_btnTop.value) {
        if (store.tmStore.color && props.followTheme) {
          return store.tmStore.color;
        }
        return props.activeColor;
      }
      return props.fontColor;
    });
    let parent = proxy == null ? void 0 : proxy.$parent;
    while (parent) {
      if ((parent == null ? void 0 : parent.tmTabbarId) == "tmTabbarId" || !parent) {
        break;
      } else {
        parent = (_c = parent == null ? void 0 : parent.$parent) != null ? _c : void 0;
      }
    }
    if (parent) {
      parent.pushKey(uid);
    }
    onUnmounted(() => {
      if (parent) {
        parent.delKey(uid);
      }
    });
    if (tmTabbarItemAutoSelect.value) {
      _active.value = props.active || false;
    } else {
      if (tmTabbarItemList.value[tmTabbarItemActive.value] == uid) {
        _active.value = true;
      } else {
        _active.value = false;
      }
    }
    function setActive() {
      if (nowUid.value == uid) {
        _active.value = true;
      } else {
        _active.value = false;
      }
    }
    watch([nowUid, () => props.active], () => {
      if (tmTabbarItemAutoSelect.value) {
        setActive();
      }
    });
    watch(tmTabbarItemActive, () => {
      if (!tmTabbarItemAutoSelect.value) {
        if (tmTabbarItemList.value[tmTabbarItemActive.value] == uid) {
          nextTick(() => {
            _active.value = true;
          });
        } else {
          nextTick(() => {
            _active.value = false;
          });
        }
      }
    });
    watch([() => props.load], () => {
      _load.value = props.load;
    });
    async function itemClick() {
      if (_load.value)
        return;
      if (typeof props.beforeClick === "function") {
        _load.value = true;
        let p = await props.beforeClick(props.data);
        if (typeof p === "function") {
          p = await p(props.data);
        }
        _load.value = false;
        if (!p)
          return;
      }
      emits("click");
      nextTick(() => {
        if (tmTabbarItemAutoSelect.value) {
          if (parent) {
            parent.setNowurl(props.url, uid);
          }
          setActive();
        }
        if (props.url == "")
          return;
        uni.$tm.u.routerTo(props.url, props.openType);
      });
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        class: "flex flex-col flex-col-top-center",
        style: { "height": "75px" },
        renderWhole: true
      }, [
        createVNode(tmSheet, {
          height: 60,
          width: unref(_width),
          round: 24,
          unit: "px",
          _class: "flex-center flex ",
          parenClass: "relative",
          class: "relative",
          _style: unref(_styletop),
          followTheme: unref(_btnTop) && props.followTheme,
          transprent: unref(_transprent),
          color: props.color,
          margin: [0, 0],
          padding: unref(_padding),
          shadow: props.shadow,
          outlined: props.outlined,
          border: props.border,
          borderStyle: props.borderStyle,
          borderDirection: props.borderDirection,
          linear: props.linear,
          linearDeep: props.linearDeep,
          onClick: itemClick
        }, {
          default: withCtx(() => [
            createVNode(tmBadge, {
              fontSize: 20,
              color: unref(c_font_style).dotColor,
              eventPenetrationEnabled: true,
              dot: props.dot,
              count: props.count,
              icon: props.dotIcon,
              maxCount: props.maxCount
            }, {
              default: withCtx(() => [
                createElementVNode("view", {
                  class: normalizeClass([[_active.value ? "anifun" : ""], "flex flex-col flex-col-center-center"]),
                  style: { width: 65 + "px", height: "30px" }
                }, [
                  renderSlot(_ctx.$slots, "default", {}, () => [
                    !_load.value ? (openBlock(), createBlock(tmIcon, {
                      key: 0,
                      _style: "line-height: 0px;",
                      color: unref(_color),
                      "font-size": unref(c_font_style).iconSize,
                      name: _active.value ? unref(c_font_style).icon : unref(c_font_style).unicon || unref(c_font_style).icon
                    }, null, 8, ["color", "font-size", "name"])) : createCommentVNode("v-if", true)
                  ]),
                  _load.value ? (openBlock(), createBlock(tmIcon, {
                    key: 0,
                    spin: "",
                    _style: "line-height: 0px;",
                    color: unref(_color),
                    "font-size": unref(c_font_style).iconSize,
                    name: "tmicon-loading"
                  }, null, 8, ["color", "font-size"])) : createCommentVNode("v-if", true)
                ], 2)
              ]),
              _: 3
            }, 8, ["color", "dot", "count", "icon", "maxCount"]),
            unref(c_font_style).text !== "" ? (openBlock(), createBlock(tmText, {
              key: 0,
              color: unref(_color),
              _class: "pb-0",
              "font-size": unref(c_font_style).textSize,
              label: unref(c_font_style).text
            }, null, 8, ["color", "font-size", "label"])) : createCommentVNode("v-if", true)
          ]),
          _: 3
        }, 8, ["width", "_style", "followTheme", "transprent", "color", "padding", "shadow", "outlined", "border", "borderStyle", "borderDirection", "linear", "linearDeep"])
      ]);
    };
  }
});
var tmTabbarItem = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-tabbar-item/tm-tabbar-item.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tabbar",
  setup(__props) {
    function laodingfun(val) {
      return new Promise((res) => {
        setTimeout(function() {
          formatAppLog("log", "at pages/daohang/tabbar.nvue:27", "\u9009\u4E2D\u4E86\uFF1A", val);
          res(true);
        }, 2e3);
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
                createVNode(tmText, { label: "\u70B9\u51FB\u4E2D\u95F4+\u6309\u94AE\u53EF\u4EE5\u4F53\u9A8C\u5F02\u6B65\u52A0\u8F7D\u52A8\u6001\u6548\u679C." })
              ]),
              _: 1
            }),
            createVNode(tmTabbar, null, {
              default: withCtx(() => [
                createVNode(tmTabbarItem, {
                  activeColor: "orange",
                  count: "HOT",
                  "open-type": "reLaunch",
                  url: "/pages/index/index",
                  text: "\u9996\u9875",
                  icon: "tmicon-collection-fill"
                }),
                createVNode(tmTabbarItem, {
                  activeColor: "orange",
                  url: "/pages/form/index",
                  text: "\u8868\u5355",
                  icon: "tmicon-cog-fill"
                }),
                createVNode(tmTabbarItem, {
                  shadow: 2,
                  beforeClick: laodingfun,
                  data: "\u4E2D\u95F4\u9879",
                  "btn-top": "",
                  fontColor: "white",
                  activeColor: "white",
                  linear: "top",
                  linearDeep: "accent",
                  color: "yellow",
                  icon: "tmicon-plus"
                }),
                createVNode(tmTabbarItem, {
                  activeColor: "orange",
                  url: "/pages/fankui/index",
                  text: "\u53CD\u9988\u5206\u7C7B",
                  unicon: "tmicon-like",
                  icon: "tmicon-heart-fill"
                }),
                createVNode(tmTabbarItem, {
                  activeColor: "orange",
                  count: 8,
                  url: "/pages/chart/index",
                  active: "",
                  text: "\u56FE\u8868\u4E2D\u5FC3",
                  unicon: "tmicon-account",
                  icon: "tmicon-userplus-fill"
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
var tabbar = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/daohang/tabbar.nvue"]]);
export { tabbar as default };
