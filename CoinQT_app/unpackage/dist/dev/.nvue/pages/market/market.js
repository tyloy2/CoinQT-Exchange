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
import { t as tmIcon, a as tmTranslate, b as tmImage, c as tmInput, _ as __easycom_12, d as tmDivider } from "../../tm-divider.js";
import { defineComponent, computed, openBlock, createElementBlock, normalizeClass, renderSlot, createCommentVNode, unref, createVNode, withCtx, createBlock, getCurrentInstance, inject, ref, onMounted, onBeforeUnmount, watch, nextTick, normalizeStyle, createElementVNode, provide, watchEffect, onUnmounted, toRaw, Fragment, renderList, withModifiers, resolveDynamicComponent, resolveComponent } from "vue";
import { c as custom_props, a as computedStyle, b as computedClass, t as tmText, u as useTmpiniaStore, d as computedDark, e as computedTheme, r as requireNativePlugin, f as resolveEasycom, g as tmApp } from "../../tm-app.js";
import { t as tmNavbar } from "../../tm-navbar.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { _ as _export_sfc } from "../../plugin-vue_export-helper.js";
import "pinia";
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "tm-badge",
  props: __spreadProps(__spreadValues({}, custom_props), {
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
      type: [Boolean],
      default: false
    },
    label: {
      type: String,
      default: ""
    },
    fontSize: {
      type: Number,
      default: 22
    },
    status: {
      type: [Boolean],
      default: false
    },
    dot: {
      type: [Boolean],
      default: false
    },
    icon: {
      type: [String],
      default: ""
    },
    count: {
      type: [Number, String],
      default: 0
    },
    maxCount: {
      type: [Number],
      default: 999
    }
  }),
  emits: ["click"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const customCSSStyle = computed(() => computedStyle(props));
    const customClass = computed(() => computedClass(props));
    const istext = computed(() => {
      return isNaN(parseInt(String(props.count)));
    });
    const show = computed(() => {
      if (!props.dot && !props.icon && !props.count)
        return false;
      return true;
    });
    const size = computed(() => {
      if (props.status || props.dot) {
        return {
          w: 12,
          h: 12,
          pr: 6,
          t: 3
        };
      }
      if (props.icon) {
        let p = props.fontSize * 1.6;
        return {
          w: p,
          h: p,
          pr: 12,
          t: 10
        };
      }
      if (isNaN(parseInt(String(props.count)))) {
        return {
          w: 0,
          h: 0,
          pr: 10,
          t: 10
        };
      }
      if (props.count < 10) {
        return {
          w: 30,
          h: 30,
          pr: 12,
          t: 10
        };
      }
      if (props.count >= 10) {
        return {
          w: 0,
          h: 0,
          pr: 10,
          t: 10
        };
      }
      return {
        w: 0,
        h: 0,
        pr: 0,
        t: 0
      };
    });
    const _icon = computed(() => props.icon);
    const _dot = computed(() => props.dot);
    const _count = computed(() => props.count);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        class: normalizeClass(["flex relative", [props.status ? "flex-row flex-row-center-center mx-8" : ""]]),
        renderWhole: true
      }, [
        !props.status ? (openBlock(), createElementBlock("view", { key: 0 }, [
          renderSlot(_ctx.$slots, "default")
        ])) : createCommentVNode("v-if", true),
        unref(show) ? (openBlock(), createElementBlock("view", {
          key: 1,
          class: normalizeClass([
            (unref(_dot) || unref(_count) || unref(_icon)) && !props.status ? "absolute flex-top-start-end r-0" : ""
          ]),
          style: { zIndex: 10 }
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
            transprent: props.transprent,
            linear: props.linear,
            linearDeep: props.linearDeep,
            width: unref(size).w,
            height: unref(size).h,
            margin: props.margin,
            padding: props.padding
          }, {
            default: withCtx(() => [
              unref(_count) > 0 && !unref(istext) ? (openBlock(), createBlock(tmText, {
                key: 0,
                color: "white",
                "font-size": props.fontSize,
                _class: unref(size).h == 0 ? "py-3 px-8" : "",
                label: unref(_count) > props.maxCount ? props.maxCount + "+" : unref(_count)
              }, null, 8, ["font-size", "_class", "label"])) : createCommentVNode("v-if", true),
              unref(_count) && unref(istext) ? (openBlock(), createBlock(tmText, {
                key: 1,
                color: "white",
                "font-size": props.fontSize,
                _class: unref(size).h == 0 ? "py-3 px-8" : "",
                label: unref(_count)
              }, null, 8, ["font-size", "_class", "label"])) : createCommentVNode("v-if", true),
              unref(_icon) ? (openBlock(), createBlock(tmIcon, {
                key: 2,
                color: "white",
                "font-size": props.fontSize,
                name: unref(_icon)
              }, null, 8, ["font-size", "name"])) : createCommentVNode("v-if", true)
            ]),
            _: 1
          }, 8, ["color", "_class", "_style", "followTheme", "dark", "round", "shadow", "outlined", "border", "borderStyle", "borderDirection", "text", "transprent", "linear", "linearDeep", "width", "height", "margin", "padding"])
        ], 2)) : createCommentVNode("v-if", true),
        props.status ? (openBlock(), createBlock(tmText, {
          key: 2,
          "font-size": props.fontSize,
          _class: "ml-10",
          label: props.label
        }, null, 8, ["font-size", "label"])) : createCommentVNode("v-if", true)
      ], 2);
    };
  }
});
var tmBadge = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-badge/tm-badge.vue"]]);
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "tm-grid-item",
  props: __spreadProps(__spreadValues({}, custom_props), {
    height: {
      type: Number,
      default: 100
    },
    transprent: {
      type: Boolean,
      default: true
    },
    dot: {
      type: [Boolean, String],
      default: false
    },
    icon: {
      type: [String],
      default: ""
    },
    count: {
      type: [Number, String],
      default: 0
    },
    maxCount: {
      type: [Number, String],
      default: 999
    },
    bgColor: {
      type: String,
      default: "white"
    },
    color: {
      type: String,
      default: "red"
    },
    url: {
      type: String,
      default: ""
    }
  }),
  emits: ["click"],
  setup(__props, { emit: emits }) {
    var _a, _b, _c;
    const props = __props;
    const store = useTmpiniaStore();
    const proxy = (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const tmcfg = computed(() => store.tmStore);
    const isDark = computed(() => computedDark(props, tmcfg.value));
    const tmcomputed = computed(() => {
      return computedTheme(__spreadProps(__spreadValues({}, props), { color: props.bgColor }), isDark.value, tmcfg.value);
    });
    const _colWidth = inject("tmGridItemWidth", 0);
    const _tmGridshowBorder = inject("tmGridshowBorder", computed(() => false));
    const tmGridshowCachList = inject("tmGridshowCachList", computed(() => []));
    const uid = ref({
      id: uni.$tm.u.getUid(1),
      type: ""
    });
    let parentFormItem = proxy == null ? void 0 : proxy.$parent;
    while (parentFormItem) {
      if ((parentFormItem == null ? void 0 : parentFormItem.keyName) == "tmGrid" || !parentFormItem) {
        break;
      } else {
        parentFormItem = (_c = parentFormItem == null ? void 0 : parentFormItem.$parent) != null ? _c : void 0;
      }
    }
    onMounted(() => {
      if (parentFormItem == null ? void 0 : parentFormItem.pushKey) {
        parentFormItem.pushKey(uid.value);
      }
    }), onBeforeUnmount(() => {
      parentFormItem.delKey(uid.value);
    });
    let wkStyle = ref(`width:${_colWidth}'rpx'`);
    watch([tmGridshowCachList, _tmGridshowBorder], () => {
      nextTick(() => setStyleFun());
    }, { deep: true });
    function setStyleFun() {
      let ar = tmGridshowCachList.value.filter((el) => el.id == uid.value.id);
      if (ar.length == 1) {
        uid.value = ar[0];
      }
      if (!_tmGridshowBorder.value) {
        wkStyle.value = `border:0rpx solid rgba(0,0,0,0);width:${_colWidth}rpx`;
        return;
      }
      if (uid.value.type == 1) {
        wkStyle.value = `border:1rpx solid ${tmcomputed.value.border};width:${_colWidth}rpx`;
      }
      if (uid.value.type == 2) {
        wkStyle.value = `border-bottom:1rpx solid ${tmcomputed.value.border};border-right:1rpx solid ${tmcomputed.value.border};border-left:1rpx solid rgba(0,0,0,0);border-top:1rpx solid rgba(0,0,0,0);width:${_colWidth}rpx`;
      }
      if (uid.value.type == 3) {
        wkStyle.value = `border-top:1rpx solid rgba(0,0,0,0);border-bottom:1rpx solid ${tmcomputed.value.border};border-right:1rpx solid ${tmcomputed.value.border};border-left:1rpx solid ${tmcomputed.value.border};width:${_colWidth}rpx`;
      }
      if (uid.value.type == 4) {
        wkStyle.value = `border-left:1rpx solid rgba(0,0,0,0);border-bottom:1rpx solid ${tmcomputed.value.border};border-top:1rpx solid ${tmcomputed.value.border};border-right:1rpx solid ${tmcomputed.value.border};width:${_colWidth}rpx`;
      }
    }
    function onClick(e) {
      emits("click", e);
      if (props.url !== "") {
        try {
          uni.navigateTo({
            url: props.url
          });
        } catch (e2) {
        }
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        style: normalizeStyle(unref(wkStyle)),
        renderWhole: true
      }, [
        createVNode(tmSheet, {
          color: props.bgColor,
          text: props.text,
          border: 0,
          "hover-class": "opacity-6",
          transprent: props.transprent,
          height: props.height,
          width: unref(_colWidth) - 0.5,
          margin: [0, 0],
          padding: [0, 0],
          _class: "flex-col flex",
          onClick
        }, {
          default: withCtx(() => [
            createElementVNode("view", { class: "flex-1 flex flex-col-center-center" }, [
              createVNode(tmBadge, {
                userInteractionEnabled: true,
                fontSize: 20,
                dot: props.dot,
                count: props.count,
                "max-count": props.maxCount,
                icon: props.icon,
                color: props.color
              }, {
                default: withCtx(() => [
                  createElementVNode("view", { class: "flex-col flex-col-center-center flex px-10" }, [
                    renderSlot(_ctx.$slots, "default")
                  ])
                ]),
                _: 3
              }, 8, ["dot", "count", "max-count", "icon", "color"])
            ])
          ]),
          _: 3
        }, 8, ["color", "text", "transprent", "height", "width"])
      ], 4);
    };
  }
});
var __easycom_6 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-grid-item/tm-grid-item.vue"]]);
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "tm-grid",
  props: __spreadProps(__spreadValues({}, custom_props), {
    round: {
      type: Number,
      default: 2
    },
    width: {
      type: Number,
      default: 750
    },
    col: {
      type: Number,
      default: 5
    },
    showBorder: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: "white"
    },
    transprent: {
      type: Boolean,
      default: false
    }
  }),
  setup(__props, { expose }) {
    const props = __props;
    let _cachList = ref([]);
    const _colWidth = computed(() => Math.ceil(props.width / props.col - 1));
    provide("tmGridItemWidth", _colWidth.value + (props.showBorder ? 1 : 0));
    provide("tmGridshowBorder", computed(() => props.showBorder));
    provide("tmGridshowCachList", computed(() => _cachList.value));
    function pushKey(e) {
      let index = _cachList.value.findIndex((el) => el.id == e.id);
      if (index == -1) {
        _cachList.value.push(e);
      } else {
        _cachList.value.splice(index, 1, e);
      }
      setIndexType();
    }
    function delKey(e) {
      _cachList.value.findIndex((el) => el.id == e.id);
      setIndexType();
    }
    function setIndexType() {
      let totallen = _cachList.value.length;
      _cachList.value = _cachList.value.map((el, index) => {
        let aIndex = index + 1;
        if (aIndex <= props.col) {
          el.type = 4;
          if (aIndex == totallen && totallen == 1 || aIndex == 1) {
            el.type = 1;
          }
        } else {
          if (aIndex % props.col == 1) {
            el.type = 3;
          } else {
            el.type = 2;
          }
        }
        return el;
      });
    }
    expose({
      pushKey,
      delKey,
      keyName: "tmGrid"
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(tmSheet, {
        round: props.round,
        width: props.width,
        transprent: props.transprent,
        color: props.color,
        margin: [0, 0],
        padding: [0, 0],
        _class: "flex flex-row flex-row-top-start",
        contStyle: "flex-wrap:wrap;"
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["round", "width", "transprent", "color"]);
    };
  }
});
var __easycom_7 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-grid/tm-grid.vue"]]);
var _style_0 = { "animateAll_tabs_tmui": { "": { "transitionDelay": 0, "transitionTimingFunction": "ease", "transitionProperty": "transform,width", "transitionDuration": 300 } }, "@TRANSITION": { "animateAll_tabs_tmui": { "delay": 0, "timingFunction": "ease", "property": "transform,width", "duration": 300 } } };
var _style_1 = { "tmTabsPane": { "": { "transitionDelay": 0, "transitionTimingFunction": "ease", "transitionProperty": "transform", "transitionDuration": 300 } }, "anilineBar": { "": { "transitionDelay": 0, "transitionTimingFunction": "ease", "transitionProperty": "transform,width", "transitionDuration": 300 } }, "@TRANSITION": { "tmTabsPane": { "delay": 0, "timingFunction": "ease", "property": "transform", "duration": 300 }, "anilineBar": { "delay": 0, "timingFunction": "ease", "property": "transform,width", "duration": 300 } } };
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "tm-tabs",
  props: __spreadProps(__spreadValues({}, custom_props), {
    list: {
      type: Array,
      default: () => []
    },
    color: {
      type: String,
      default: "white"
    },
    transprent: {
      type: [Boolean, String],
      default: false
    },
    width: {
      type: Number,
      default: 500
    },
    itemHeight: {
      type: Number,
      default: 80
    },
    height: {
      type: Number,
      default: 1e3
    },
    gutter: {
      type: Number,
      default: 0
    },
    defaultName: {
      type: [String, Number],
      default: ""
    },
    activeName: {
      type: [String, Number],
      default: ""
    },
    tabPos: {
      type: String,
      default: "top"
    },
    itemWidth: {
      type: Number,
      default: 0
    },
    activeColor: {
      type: String,
      default: "primary"
    },
    activeFontColor: {
      type: String,
      default: "primary"
    },
    activeFontSize: {
      type: Number,
      default: 28
    },
    itemModel: {
      type: String,
      default: "text"
    },
    unSelectedColor: {
      type: String,
      default: ""
    },
    itemFontSize: {
      type: Number,
      default: 28
    },
    itemLinear: {
      type: String,
      default: ""
    },
    itemLinearDeep: {
      type: String,
      default: "light"
    },
    itemRound: {
      type: Number,
      default: 0
    },
    align: {
      type: String,
      default: "left"
    },
    swiper: {
      type: Boolean,
      default: false
    },
    showTabsLineAni: {
      type: Boolean,
      default: false
    },
    tabsLineAniColor: {
      type: String,
      default: "primary"
    },
    disAbledPull: {
      type: Boolean,
      default: true
    }
  }),
  emits: ["update:activeName", "change", "click"],
  setup(__props, { expose, emit: emits }) {
    var _a, _b;
    const props = __props;
    const store = useTmpiniaStore();
    var dom = weex.requireModule("dom");
    const Binding = requireNativePlugin("bindingx");
    const animation = requireNativePlugin("animation");
    const proxy = (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const bindxToken = ref(null);
    computed(() => props.disAbledPull);
    const _align = computed(() => {
      let align_list = {
        right: "flex-row-center-end",
        left: "flex-row-center-start",
        center: "flex-row-center-center",
        around: "flex-around"
      };
      let key = "center";
      if (align_list.hasOwnProperty(props.align)) {
        key = props.align;
      }
      return align_list[key];
    });
    const _active = ref(props.defaultName);
    emits("update:activeName", _active.value);
    const cstomClass = computed(() => computedClass(props));
    const _scrollToId = ref("");
    const modelStyle = computed(() => {
      if (props.itemModel == "text") {
        return {
          transprent: true,
          border: 0,
          text: false
        };
      } else if (props.itemModel == "line") {
        return {
          transprent: true,
          border: 4,
          text: false
        };
      } else if (props.itemModel == "textLight") {
        return {
          transprent: false,
          border: 4,
          text: true
        };
      } else if (props.itemModel == "card") {
        return {
          transprent: false,
          border: 0,
          text: false
        };
      }
      return {
        transprent: true,
        border: 0,
        text: false
      };
    });
    const tmTabsId = "tmTabsId";
    const _tabPos = computed(() => props.tabPos);
    const cacheTabs = ref([]);
    const isDulitabs = computed(() => props.list.length > 0);
    const tabsid = "tabs_id_" + uni.$tm.u.getUid(1) + "_";
    const isNvue = ref(false);
    const _itemheight = Math.ceil(uni.upx2px(props.itemHeight));
    const totalWidth = computed(() => uni.upx2px(cacheTabs.value.length * props.width));
    const _itemwidth = Math.ceil(uni.upx2px(props.itemWidth + 40));
    Math.ceil(uni.upx2px(40));
    const _width = Math.ceil(uni.upx2px(props.width));
    const contentWidth = computed(() => {
      let width = (props.itemWidth + 40) * cacheTabs.value.length;
      if (width <= props.width) {
        width = props.width;
      }
      return width;
    });
    computed(() => {
      let width = _itemwidth * cacheTabs.value.length;
      if (width <= props.width) {
        width = uni.upx2px(props.width);
      }
      return Math.ceil(width);
    });
    const anitLineLeft = ref(0);
    isNvue.value = true;
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
    const _startx = ref(0);
    const _starty = ref(0);
    ref(0);
    ref(0);
    const _x = ref(0);
    const _y = ref(0);
    ref(0);
    ref(0);
    const directoStyle = ref(0);
    const isEndMove = ref(true);
    const maxLen = 80;
    const activeIndex = computed(() => cacheTabs.value.findIndex((el) => el.key == _active.value));
    let ctxLeft = 0;
    let ctxTop = 0;
    let timeDetail = 1;
    let isMoveEnb = false;
    let dirType = ref("none");
    ref(false);
    let sliderBarWidth = uni.upx2px(40);
    let widthDrag = ref(sliderBarWidth);
    watchEffect(() => {
      cacheTabs.value = [];
      props.list.forEach((el, index) => {
        var _a2, _b2, _c, _d, _e, _f;
        cacheTabs.value.push({
          key: (_a2 = el == null ? void 0 : el.key) != null ? _a2 : String(index),
          title: (_b2 = el == null ? void 0 : el.title) != null ? _b2 : String(index),
          icon: (_c = el == null ? void 0 : el.icon) != null ? _c : "",
          dot: (_d = el == null ? void 0 : el.dot) != null ? _d : false,
          count: (_e = el == null ? void 0 : el.count) != null ? _e : "",
          dotColor: (_f = el == null ? void 0 : el.dotColor) != null ? _f : "red"
        });
      });
    });
    function setTabsBarLineLeft(key = "") {
      if (!props.showTabsLineAni)
        return;
      let keybl = key || _active.value;
      let index = cacheTabs.value.findIndex((el) => el.key == keybl);
      if (index > -1) {
        let leftPx = _itemwidth * index;
        if (props.align == "center") {
          leftPx = leftPx + (_width - _itemwidth * cacheTabs.value.length) / 2 - 1;
        }
        anitLineLeft.value = Math.ceil(leftPx);
      }
    }
    function unbindKey(key) {
      let index = cacheTabs.value.findIndex((el) => el.key == key);
      if (index > -1) {
        cacheTabs.value.splice(index, 1);
      }
      let index2 = cacheTabs.value.findIndex((el) => el.key == _active.value);
      if (index2 == -1 && cacheTabs.value.length > 0) {
        changeKey(cacheTabs.value[0].key, false);
      } else if (cacheTabs.value.length == 0) {
        changeKey("", false);
      }
    }
    watch(() => props.activeName, () => {
      if (props.activeName == _active.value)
        return;
      changeKey(props.activeName, false);
    });
    onMounted(() => {
      setTimeout(() => {
        _scrollToId.value = tabsid + _active.value;
        nextTick(() => {
          dom.getComponentRect(proxy.$refs.tabsDom, function(res) {
            if (res == null ? void 0 : res.size) {
              ctxLeft = Math.floor(res.size.left);
              ctxTop = Math.floor(res.size.top);
              spinNvueAniEnd(0, -uni.upx2px(activeIndex.value * props.width), 1);
              _startx.value = uni.upx2px(activeIndex.value * props.width);
            }
          });
          setTabsBarLineLeft(props.defaultName);
        });
      }, 300);
    });
    watchEffect(() => {
      directoStyle.value = String(Math.ceil(uni.upx2px(-activeIndex.value * props.width)));
      spinNvueAniEnd(0, -uni.upx2px(activeIndex.value * props.width), timeDetail);
    });
    watch(() => _active.value, () => {
      nextTick(() => {
        var _a2, _b2;
        let index = cacheTabs.value.findIndex((el) => el.key == _active.value);
        if (index > -1) {
          if (typeof cacheTabs.value[index - 2] !== "undefined") {
            _scrollToId.value = tabsid + ((_a2 = cacheTabs.value[index - 2]) == null ? void 0 : _a2.key);
          } else {
            _scrollToId.value = tabsid + ((_b2 = cacheTabs.value[0]) == null ? void 0 : _b2.key);
          }
        } else {
          _scrollToId.value = tabsid + _active.value;
        }
        setTabsBarLineLeft();
      });
    });
    let isMoveing = ref(false);
    function onMove(event) {
      if (!props.swiper || isMoveEnb == false)
        return;
      isMoveing.value = true;
      let nowx = 0;
      let nowy = 0;
      if (event.type.indexOf("mouse") == -1 && event.changedTouches.length == 1) {
        var touch = event.changedTouches[0];
        if (typeof (touch == null ? void 0 : touch.pageX) !== "undefined") {
          nowx = touch.pageX - ctxLeft;
          nowy = touch.pageY - ctxTop;
        } else {
          nowx = touch.x;
          nowy = touch.y;
        }
      } else {
        nowx = event.pageX - event.currentTarget.offsetLeft - ctxLeft;
        nowy = event.pageY - event.currentTarget.offsetTop - ctxTop;
      }
      _x.value = nowx - _startx.value;
      _y.value = nowy - _starty.value;
      setDirXy(_x.value, _y.value);
    }
    function setDirXy(x, y, isEnd = false) {
      activeIndex.value;
      let nowLeft = uni.upx2px(activeIndex.value * props.width);
      debounce(() => {
        if (x > 0 && Math.abs(x) > Math.abs(y)) {
          dirType.value = "right";
        } else if (x < 0 && Math.abs(x) > Math.abs(y)) {
          dirType.value = "left";
        } else if (y > 0 && Math.abs(y) > Math.abs(x)) {
          dirType.value = "down";
        } else if (y < 0 && Math.abs(y) > Math.abs(x)) {
          dirType.value = "up";
        } else {
          dirType.value = "none";
        }
      }, 300, true);
      if (dirType.value == "right") {
        if (activeIndex.value == 0)
          return;
        directoStyle.value = x - nowLeft;
        if (isEnd) {
          setRightDirRight();
          widthDrag.value = sliderBarWidth;
        }
      } else if (dirType.value == "left") {
        if (activeIndex.value == cacheTabs.value.length - 1)
          return;
        directoStyle.value = x - nowLeft;
        if (isEnd) {
          setLeftDirLeft();
          widthDrag.value = sliderBarWidth;
        }
      }
      function setRightDirRight() {
        if (x < maxLen || activeIndex.value <= 0) {
          directoStyle.value = -nowLeft;
        } else {
          _active.value = cacheTabs.value[activeIndex.value - 1].key;
          changeKey(_active.value, false);
        }
      }
      function setLeftDirLeft() {
        if (Math.abs(x) < maxLen || activeIndex.value >= cacheTabs.value.length - 1) {
          directoStyle.value = -nowLeft;
        } else {
          _active.value = cacheTabs.value[activeIndex.value + 1].key;
          changeKey(_active.value, false);
        }
      }
    }
    function getEl(el) {
      if (typeof el === "string" || typeof el === "number")
        return el;
      if (WXEnvironment) {
        return el.ref;
      } else {
        return el instanceof HTMLElement ? el : el.$el;
      }
    }
    onUnmounted(() => {
      if (bindxToken.value) {
        Binding.unbind({
          token: bindxToken.value,
          eventType: "timing"
        });
      }
    });
    function setDirXyNvue(x, y, dirX = "none") {
      activeIndex.value;
      let nowLeft = uni.upx2px(activeIndex.value * props.width);
      let maxLeft = uni.upx2px((cacheTabs.value.length - 1) * props.width);
      dirType.value = dirX;
      if (dirType.value == "right") {
        if (activeIndex.value == 0) {
          _startx.value = 0;
          spinNvueAniEnd(0, 0, 250);
          return;
        }
        if (Math.abs(x) < maxLen) {
          _startx.value = nowLeft;
          spinNvueAniEnd(-nowLeft, 0, 250);
        } else {
          _active.value = cacheTabs.value[activeIndex.value - 1].key;
          nowLeft = uni.upx2px(activeIndex.value * props.width);
          _startx.value = nowLeft;
          spinNvueAniEnd(-nowLeft, 0, 250);
          changeKey(_active.value, false);
        }
      } else if (dirType.value == "left") {
        if (activeIndex.value == cacheTabs.value.length - 1) {
          _startx.value = maxLeft;
          spinNvueAniEnd(-maxLeft, 0, 250);
          return;
        }
        if (Math.abs(x) < maxLen) {
          _startx.value = nowLeft;
          spinNvueAniEnd(-nowLeft, 0, 250);
        } else {
          _active.value = cacheTabs.value[activeIndex.value + 1].key;
          nowLeft = uni.upx2px(activeIndex.value * props.width);
          _startx.value = nowLeft;
          spinNvueAniEnd(-nowLeft, 0, 250);
          changeKey(_active.value, false);
        }
      }
    }
    function spinNvueAni() {
      var _a2;
      if (!props.swiper)
        return;
      if (!((_a2 = proxy.$refs) == null ? void 0 : _a2.tabsDom))
        return;
      let icon = getEl(proxy.$refs.tabsDom);
      getEl(proxy.$refs.sliderBarDom);
      Binding.bind({
        anchor: icon,
        eventType: "pan",
        props: [
          {
            element: icon,
            property: "transform.translateX",
            expression: `abs(y)>abs(x)?${-_startx.value}:x+` + (0 - _startx.value)
          }
        ]
      }, function(res) {
        if (res.state == "end") {
          isMoveing.value = false;
          if (Math.abs(res.deltaY) > 80) {
            let nowLeft = uni.upx2px(activeIndex.value * props.width);
            spinNvueAniEnd(-nowLeft, 0, 0);
            return;
          }
          _startx.value;
          _startx.value -= res.deltaX;
          _starty.value += res.deltaY;
          let lx = "left";
          if (res.deltaX > 0) {
            lx = "right";
          }
          setDirXyNvue(res.deltaX, res.deltaY, lx);
        } else if (res.state == "start") {
          isMoveing.value = true;
        }
      });
    }
    function spinNvueAniEnd(start, end, time = timeDetail) {
      var _a2;
      if (!props.swiper)
        return;
      if (!((_a2 = proxy.$refs) == null ? void 0 : _a2.tabsDom))
        return;
      animation.transition(proxy.$refs.tabsDom, {
        styles: {
          transform: `translateX(${start + end}px)`,
          transformOrigin: "center center"
        },
        duration: time,
        timingFunction: "ease",
        delay: 0
      }, () => {
      });
    }
    function pushKey(o) {
      let index = cacheTabs.value.findIndex((el) => el.key === o.key);
      if (index > -1) {
        cacheTabs.value.splice(index, 1, __spreadValues(__spreadValues({}, cacheTabs.value[0]), o));
      } else {
        cacheTabs.value.push(o);
      }
      if (_active.value == "") {
        changeKey(cacheTabs.value[0].key, false);
      }
    }
    function changeKey(key, isclick = true) {
      isEndMove.value = true;
      _active.value = key;
      _startx.value = uni.upx2px(activeIndex.value * props.width);
      timeDetail = 1;
      emits("change", key);
      emits("update:activeName", toRaw(_active.value));
      if (isclick) {
        emits("click", key);
      }
    }
    function setTitle(o) {
      let index = cacheTabs.value.findIndex((el) => el.key == o.key);
      if (index > -1) {
        cacheTabs.value.splice(index, 1, o);
      }
    }
    provide("tabsActiveName", computed(() => _active.value));
    provide("tabsActiveactiveIndex", activeIndex);
    provide("tabsActiveCacheTabse", computed(() => cacheTabs.value));
    provide("tabsWidth", computed(() => props.width));
    provide("tabsheight", computed(() => {
      if (!props.height)
        return 0;
      return props.height - props.itemHeight - props.gutter;
    }));
    provide("tabsSwiper", computed(() => props.swiper));
    provide("tabsSwiperIsMoveing", computed(() => isMoveing.value));
    provide("tabsSwiperDisAbledPull", computed(() => props.disAbledPull));
    expose({
      pushKey,
      changeKey,
      unbindKey,
      setTitle,
      tmTabsId
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        class: "flex flex-col overflow",
        style: normalizeStyle([
          props.height && unref(isDulitabs) == false ? { height: __props.height + "rpx" } : "",
          { width: props.width + "rpx" }
        ]),
        renderWhole: true
      }, [
        createCommentVNode(" \u6B64\u6E90\u7801\u6709uniapp bug.\u5982\u679C\u5728nvue\u9875\u9762\u7F16\u8BD1\u81F3h5\u5E73\u53F0\u65F6\uFF0C\u5F00\u542Fenable-flexr\u540E\u9700\u8981\u91CC\u9762\u518D\u5957\u5C42view\u518D\u5199flex\u624D\u80FD\u771F\u6B63\u7684\u5F00flex "),
        createCommentVNode(" \u56E0\u6B64\u4E0B\u9762\u7684\u5185\u5BB9\u4F5C\u4E86\u6761\u4EF6\u7F16\u8BD1\u5206\u4E3Anvue\u548C\u975Envue "),
        createCommentVNode(" https://ask.dcloud.net.cn/question/143230 "),
        createCommentVNode(' @touchmove="onMove"\r\n		@touchend="onEnd" \r\n		@touchstart="onStart" '),
        unref(_tabPos) == "bottom" && unref(isDulitabs) == false ? (openBlock(), createElementBlock("view", {
          key: 0,
          onTouchstart: spinNvueAni,
          ref: "tabsDom",
          style: normalizeStyle({ width: props.swiper ? `${unref(totalWidth)}px` : `${props.width}rpx`, transform: `translateX(0px)` }),
          class: "flex flex-row flex-nowrap overflow"
        }, [
          renderSlot(_ctx.$slots, "default")
        ], 36)) : createCommentVNode("v-if", true),
        createVNode(tmSheet, {
          transprent: props.transprent,
          color: props.color,
          followTheme: props.followTheme,
          dark: props.dark,
          round: props.round,
          shadow: props.shadow,
          outlined: props.outlined,
          border: props.border,
          borderStyle: props.borderStyle,
          borderDirection: props.borderDirection,
          text: props.text,
          linear: props.linear,
          linearDeep: props.linearDeep,
          margin: [0, 0],
          padding: [0, 0],
          height: props.itemHeight + unref(modelStyle).border + props.gutter + 4,
          _class: ["flex-center flex-row nonvue", unref(cstomClass)],
          _style: props._style,
          width: props.width
        }, {
          default: withCtx(() => [
            createCommentVNode(" \u6807\u9898 "),
            createCommentVNode(" \u6807\u9898 "),
            !props.showTabsLineAni && props.itemWidth == 0 ? (openBlock(), createElementBlock("scroll-view", {
              key: 0,
              scrollIntoView: _scrollToId.value,
              scrollX: true,
              scrollWithAnimation: true,
              showScrollbar: false,
              enableFlex: "",
              class: normalizeClass(["flex-row", [unref(_align)]]),
              style: normalizeStyle([{ width: `${props.width}rpx`, height: `${props.itemHeight + 4}rpx` }])
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(cacheTabs.value, (item, index) => {
                return openBlock(), createElementBlock("view", {
                  id: tabsid + item.key,
                  key: index
                }, [
                  createVNode(tmSheet, {
                    onClick: ($event) => changeKey(item.key),
                    round: props.itemRound,
                    linear: props.itemLinear,
                    linearDeep: props.itemLinearDeep,
                    borderDirection: "bottom",
                    text: item.key === _active.value ? unref(modelStyle).text : false,
                    border: item.key === _active.value ? unref(modelStyle).border : 0,
                    transprent: item.key === _active.value ? unref(modelStyle).transprent : true,
                    color: props.activeColor && item.key === _active.value ? props.activeColor : props.color,
                    width: props.itemWidth,
                    _class: "flex-center flex-row",
                    margin: [0, 0],
                    padding: [20, 0],
                    height: props.itemHeight,
                    unit: "rpx"
                  }, {
                    default: withCtx(() => [
                      createVNode(tmBadge, {
                        dot: item.dot,
                        count: item.count,
                        color: item.dotColor
                      }, {
                        default: withCtx(() => [
                          createElementVNode("view", {
                            class: "flex flex-row flex-center",
                            style: normalizeStyle({ height: props.itemHeight - 20 + "rpx" })
                          }, [
                            item.icon ? (openBlock(), createBlock(tmIcon, {
                              key: 0,
                              userInteractionEnabled: false,
                              _class: "pr-5",
                              color: item.key === _active.value ? props.activeFontColor : props.unSelectedColor,
                              "font-size": item.key === _active.value ? props.activeFontSize : props.itemFontSize,
                              name: item.icon
                            }, null, 8, ["color", "font-size", "name"])) : createCommentVNode("v-if", true),
                            createVNode(tmText, {
                              userInteractionEnabled: false,
                              "font-size": item.key === _active.value ? props.activeFontSize : props.itemFontSize,
                              color: item.key === _active.value ? props.activeFontColor : props.unSelectedColor,
                              label: item.title
                            }, null, 8, ["font-size", "color", "label"])
                          ], 4)
                        ]),
                        _: 2
                      }, 1032, ["dot", "count", "color"])
                    ]),
                    _: 2
                  }, 1032, ["onClick", "round", "linear", "linearDeep", "text", "border", "transprent", "color", "width", "height"])
                ], 8, ["id"]);
              }), 128)),
              props.showTabsLineAni && props.itemWidth > 0 ? (openBlock(), createElementBlock("view", {
                key: 0,
                class: "absolute l-0 b-0",
                style: normalizeStyle({
                  width: `${unref(contentWidth)}rpx`,
                  height: "1px",
                  backgroundColor: props.showTabsLineAni ? unref(store).tmStore.dark ? "#616161" : "#ebebeb" : ""
                })
              }, null, 4)) : createCommentVNode("v-if", true),
              props.showTabsLineAni && props.itemWidth > 0 ? (openBlock(), createElementBlock("view", {
                key: 1,
                class: "anilineBar absolute l-0 b-0",
                style: normalizeStyle({ transform: `translateX(${anitLineLeft.value}px)` })
              }, [
                createVNode(tmSheet, {
                  round: 10,
                  "follow-dark": false,
                  width: 40,
                  color: props.tabsLineAniColor,
                  height: 8,
                  margin: [0, 0],
                  padding: [0, 0]
                }, null, 8, ["color"])
              ], 4)) : createCommentVNode("v-if", true)
            ], 14, ["scrollIntoView"])) : createCommentVNode("v-if", true),
            props.showTabsLineAni && props.itemWidth > 0 ? (openBlock(), createElementBlock("scroll-view", {
              key: 1,
              scrollIntoView: _scrollToId.value,
              scrollX: true,
              scrollWithAnimation: true,
              showScrollbar: false,
              enableFlex: "",
              class: normalizeClass(["flex-row", [unref(_align)]]),
              style: normalizeStyle([{ width: `${unref(_width)}px`, height: `${props.itemHeight + 4}rpx` }])
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(cacheTabs.value, (item, index) => {
                return openBlock(), createElementBlock("view", {
                  id: tabsid + item.key,
                  key: index
                }, [
                  createVNode(tmSheet, {
                    onClick: ($event) => changeKey(item.key),
                    round: props.itemRound,
                    linear: props.itemLinear,
                    linearDeep: props.itemLinearDeep,
                    borderDirection: "bottom",
                    text: item.key === _active.value ? unref(modelStyle).text : false,
                    border: item.key === _active.value ? unref(modelStyle).border : 0,
                    transprent: item.key === _active.value ? unref(modelStyle).transprent : true,
                    color: props.activeColor && item.key === _active.value ? props.activeColor : props.color,
                    width: unref(_itemwidth),
                    _class: "flex-center flex-row",
                    margin: [0, 0],
                    padding: [0, 0],
                    height: unref(_itemheight),
                    unit: "px"
                  }, {
                    default: withCtx(() => [
                      createVNode(tmBadge, {
                        dot: item.dot,
                        count: item.count,
                        color: item.dotColor
                      }, {
                        default: withCtx(() => [
                          createElementVNode("view", { class: "flex flex-row flex-center" }, [
                            item.icon ? (openBlock(), createBlock(tmIcon, {
                              key: 0,
                              userInteractionEnabled: false,
                              _class: "pr-5",
                              color: item.key === _active.value ? props.activeFontColor : props.unSelectedColor,
                              "font-size": item.key === _active.value ? props.activeFontSize : props.itemFontSize,
                              name: item.icon
                            }, null, 8, ["color", "font-size", "name"])) : createCommentVNode("v-if", true),
                            createVNode(tmText, {
                              userInteractionEnabled: false,
                              "font-size": item.key === _active.value ? props.activeFontSize : props.itemFontSize,
                              color: item.key === _active.value ? props.activeFontColor : props.unSelectedColor,
                              label: item.title
                            }, null, 8, ["font-size", "color", "label"])
                          ])
                        ]),
                        _: 2
                      }, 1032, ["dot", "count", "color"])
                    ]),
                    _: 2
                  }, 1032, ["onClick", "round", "linear", "linearDeep", "text", "border", "transprent", "color", "width", "height"])
                ], 8, ["id"]);
              }), 128)),
              props.showTabsLineAni && props.itemWidth > 0 ? (openBlock(), createElementBlock("view", {
                key: 0,
                class: "absolute l-0 b-0",
                style: normalizeStyle({
                  width: `${unref(contentWidth)}rpx`,
                  height: "1px",
                  backgroundColor: props.showTabsLineAni ? unref(store).tmStore.dark ? "#616161" : "#ebebeb" : ""
                })
              }, null, 4)) : createCommentVNode("v-if", true),
              props.showTabsLineAni && props.itemWidth > 0 ? (openBlock(), createElementBlock("view", {
                key: 1,
                class: "anilineBar absolute l-0 b-0 flex flex-row flex-center",
                style: normalizeStyle({ transform: `translateX(${anitLineLeft.value}px)`, width: unref(_itemwidth) + "px", height: "4px" })
              }, [
                createVNode(tmSheet, {
                  ref: "sliderBarDom",
                  round: 10,
                  "follow-dark": false,
                  width: unref(sliderBarWidth),
                  unit: "px",
                  height: 4,
                  color: props.tabsLineAniColor,
                  margin: [0, 0],
                  padding: [0, 0]
                }, null, 8, ["width", "color"])
              ], 4)) : createCommentVNode("v-if", true)
            ], 14, ["scrollIntoView"])) : createCommentVNode("v-if", true)
          ]),
          _: 1
        }, 8, ["transprent", "color", "followTheme", "dark", "round", "shadow", "outlined", "border", "borderStyle", "borderDirection", "text", "linear", "linearDeep", "height", "_class", "_style", "width"]),
        createCommentVNode(' @touchmove="onMove"\r\n		@touchend="onEnd" \r\n		@touchstart="onStart" '),
        createCommentVNode(' @touchmove="onMove" @touchend="onEnd" @touchcancel="onEnd"  '),
        unref(_tabPos) == "top" ? (openBlock(), createElementBlock("view", {
          key: 1,
          onTouchstart: spinNvueAni,
          onTouchmove: onMove,
          ref: "tabsDom",
          style: normalizeStyle({ width: props.swiper ? `${unref(totalWidth)}px` : `${props.width}rpx`, transform: `translateX(0px)` }),
          class: "flex flex-row flex-nowrap overflow"
        }, [
          renderSlot(_ctx.$slots, "default")
        ], 36)) : createCommentVNode("v-if", true)
      ], 4);
    };
  }
});
var __easycom_8 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["styles", [_style_0, _style_1]], ["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-tabs/tm-tabs.vue"]]);
var justifyAlign = /* @__PURE__ */ ((justifyAlign2) => {
  justifyAlign2["start"] = "flex-start";
  justifyAlign2["end"] = "flex-end";
  justifyAlign2["center"] = "center";
  return justifyAlign2;
})(justifyAlign || {});
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "tm-col",
  props: __spreadProps(__spreadValues({}, custom_props), {
    height: {
      type: [Number, String],
      default: 50
    },
    color: {
      type: String,
      default: "white"
    },
    transprent: {
      type: [Boolean, String],
      default: false
    },
    align: {
      type: String,
      default: "center"
    }
  }),
  emits: ["click"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const store = useTmpiniaStore();
    const tmcfg = computed(() => store.tmStore);
    const customCSSStyle = computed(() => computedStyle(props));
    const customClass = computed(() => computedClass(props));
    const isDark = computed(() => computedDark(props, tmcfg.value));
    const tmcomputed = computed(() => computedTheme(props, isDark.value, tmcfg.value));
    const TmRowWidth = inject("TmRowWidth", computed(() => 0));
    const TmRowColumn = inject("TmRowColumn", computed(() => 0));
    const TmRowGutter = inject("TmRowGutter", computed(() => 0));
    const colWidth = computed(() => {
      if (TmRowWidth.value == 0)
        return 0;
      return TmRowWidth.value / TmRowColumn.value;
    });
    const alignComputed = computed(() => justifyAlign[props.align]);
    let textColor = computed(() => tmcomputed.value.textColor);
    provide("appTextColor", textColor);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        onClick: _cache[0] || (_cache[0] = ($event) => emits("click", $event)),
        class: normalizeClass(["flex flex-col", [unref(colWidth) ? "" : "flex-1"]]),
        style: normalizeStyle([unref(colWidth) ? { width: unref(colWidth) + "rpx" } : ""]),
        renderWhole: true
      }, [
        createElementVNode("view", {
          eventPenetrationEnabled: true,
          style: normalizeStyle([
            unref(TmRowGutter) ? { marginLeft: `${unref(TmRowGutter)}rpx`, marginRight: `${unref(TmRowGutter)}rpx` } : "",
            props.height ? { height: props.height + "rpx" } : "",
            !__props.transprent ? unref(tmcomputed).backgroundColorCss : "",
            { alignItems: unref(alignComputed), justifyContent: "center" },
            unref(customCSSStyle)
          ]),
          class: normalizeClass(["flex flex-col", unref(customClass)])
        }, [
          renderSlot(_ctx.$slots, "default")
        ], 6)
      ], 6);
    };
  }
});
var __easycom_9 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-col/tm-col.vue"]]);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "tm-row",
  props: __spreadProps(__spreadValues({}, custom_props), {
    height: {
      type: [Number, String],
      default: 0
    },
    margin: {
      type: Array,
      default: () => [0, 0]
    },
    width: {
      type: [Number, String],
      default: 0
    },
    round: {
      type: [Number, String],
      default: 0
    },
    gutter: {
      type: Number,
      default: 0
    },
    column: {
      type: Number,
      default: 10
    },
    justify: {
      type: String,
      default: "start"
    },
    align: {
      type: String,
      default: "center"
    },
    color: {
      type: String,
      default: "white"
    }
  }),
  emits: ["click"],
  setup(__props, { emit: emits }) {
    var _a, _b;
    const props = __props;
    const store = useTmpiniaStore();
    requireNativePlugin("dom");
    (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const tmcfg = computed(() => store.tmStore);
    const customCSSStyle = computed(() => computedStyle(props));
    const customClass = computed(() => computedClass(props));
    const isDark = computed(() => computedDark(props, tmcfg.value));
    const tmcomputed = computed(() => computedTheme(props, isDark.value, tmcfg.value));
    const width_px_rect = computed(() => props.width);
    const width_px_rect_rp = computed(() => width_px_rect.value);
    const justifyAlign2 = {
      start: "flex-start",
      end: "flex-end",
      center: "center",
      around: "space-around",
      between: "space-between"
    };
    const justify_rp = computed(() => justifyAlign2[props.justify] || "start");
    const AlignAlign = {
      start: "flex-start",
      end: "flex-end",
      center: "center",
      stretch: "stretch"
    };
    const align_rp = computed(() => AlignAlign[props.align] || "start");
    provide("TmRowWidth", width_px_rect_rp);
    provide("TmRowColumn", computed(() => props.column));
    provide("TmRowGutter", computed(() => props.gutter));
    let textColor = computed(() => tmcomputed.value.textColor);
    provide("appTextColor", textColor);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        ref: "tmRow",
        onClick: _cache[0] || (_cache[0] = withModifiers(($event) => emits("click", $event), ["stop"])),
        class: normalizeClass(["flex tm-row", ["overflow ", `round-${props.round}`, unref(customClass), `mx-${props.margin[0]} my-${__props.margin[1]}`]]),
        style: normalizeStyle([
          { flexDirection: "row", flexWrap: "wrap" },
          props.height ? { height: props.height + "rpx" } : "",
          unref(width_px_rect) ? { width: unref(width_px_rect) + "rpx" } : "",
          { justifyContent: unref(justify_rp), alignItems: unref(align_rp) },
          !props.transprent ? unref(tmcomputed).backgroundColorCss : "",
          !props.transprent ? unref(tmcomputed).shadowColor : "",
          unref(customCSSStyle)
        ]),
        renderWhole: true
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 6);
    };
  }
});
var __easycom_10 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-row/tm-row.vue"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
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
var __easycom_11 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-tag/tm-tag.vue"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "tm-collapse-item",
  props: __spreadProps(__spreadValues({}, custom_props), {
    transprent: {
      type: Boolean,
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
    titleSize: {
      type: Number,
      default: 30
    },
    height: {
      type: Number,
      default: 88
    },
    name: {
      type: [Number, String],
      default: ""
    },
    activeColor: {
      type: [String],
      default: "primary"
    },
    margin: {
      type: Array,
      default: () => [0, 0]
    },
    padding: {
      type: Array,
      default: () => [24, 0]
    },
    disabled: {
      type: [Boolean, String],
      default: false
    },
    leftIcon: {
      type: [String],
      default: ""
    },
    leftIconColor: {
      type: [String],
      default: ""
    }
  }),
  emits: ["click"],
  setup(__props, { emit: emits }) {
    var _a, _b, _c;
    const props = __props;
    const proxy = (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const _activekeyArray = inject("tmCollapseKeyList", computed(() => []));
    const _tmCollapseIconPos = inject("tmCollapseIconPos", computed(() => "left"));
    const _tmCollapsecloseIcon = inject("tmCollapsecloseIcon", computed(() => "tmicon-caret-right"));
    const _tmCollapseopenIcon = inject("tmCollapseopenIcon", computed(() => "tmicon-sort-down"));
    const _leftIcon = computed(() => props.leftIcon);
    const isActiveAfter = ref(false);
    let parent = proxy == null ? void 0 : proxy.$parent;
    while (parent) {
      if ((parent == null ? void 0 : parent.tmCollapse) == "tmCollapse" || !parent) {
        break;
      } else {
        parent = (_c = parent == null ? void 0 : parent.$parent) != null ? _c : void 0;
      }
    }
    if (parent) {
      parent == null ? void 0 : parent.pushKey(props.name);
    }
    const cborder = ref(props.border ? props.border : parent == null ? void 0 : parent.border);
    const isActive = computed(() => {
      let index = _activekeyArray.value.findIndex((el) => {
        return el == props.name;
      });
      return index > -1;
    });
    const _leftIconColor = computed(() => {
      if (props.leftIconColor)
        return props.leftIconColor;
      if (props.leftIconColor === "" && props.activeColor !== "" && isActive.value)
        return props.activeColor;
      return "";
    });
    watchEffect(() => {
      if (isActive.value) {
        setTimeout(function() {
          isActiveAfter.value = true;
        }, 20);
      } else {
        isActiveAfter.value = false;
      }
    });
    function openAndClose(e) {
      emits("click", e);
      if (props.disabled)
        return;
      parent == null ? void 0 : parent.setKey(props.name);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        class: normalizeClass(["flex flex-col overflow", [__props.disabled ? "opacity-7" : ""]]),
        renderWhole: true
      }, [
        createVNode(tmSheet, {
          transprent: props.transprent,
          onClick: openAndClose,
          color: props.color,
          text: __props.disabled,
          border: unref(isActive) ? 0 : cborder.value,
          linear: props.linear,
          linearDeep: props.linearDeep,
          dark: props.dark,
          followDark: props.followDark,
          followTheme: props.followTheme,
          borderDirection: "bottom",
          margin: props.margin,
          padding: props.padding
        }, {
          default: withCtx(() => [
            createElementVNode("view", {
              style: normalizeStyle({ height: props.height + "rpx" }),
              userInteractionEnabledn: false,
              class: "flex-row-center-start flex-row"
            }, [
              unref(_tmCollapseIconPos) == "left" ? (openBlock(), createElementBlock("view", {
                key: 0,
                class: "pr-16 flex-center"
              }, [
                createVNode(tmIcon, {
                  dark: props.dark,
                  followDark: props.followDark,
                  color: unref(isActive) ? props.activeColor : "grey-1",
                  name: unref(isActive) ? unref(_tmCollapseopenIcon) : unref(_tmCollapsecloseIcon),
                  "font-size": 20
                }, null, 8, ["dark", "followDark", "color", "name"])
              ])) : createCommentVNode("v-if", true),
              renderSlot(_ctx.$slots, "icon", {}, () => [
                unref(_leftIcon) ? (openBlock(), createElementBlock("view", {
                  key: 0,
                  class: "flex flex-center pr-16"
                }, [
                  createVNode(tmIcon, {
                    style: { "line-height": "0px" },
                    color: unref(_leftIconColor),
                    "font-size": 24,
                    name: unref(_leftIcon)
                  }, null, 8, ["color", "name"])
                ])) : createCommentVNode("v-if", true)
              ]),
              createElementVNode("view", {
                class: "flex flex-1",
                style: { "width": "0px" }
              }, [
                renderSlot(_ctx.$slots, "title", {
                  data: { isActive: unref(isActive) }
                }, () => [
                  createVNode(tmText, {
                    _class: "",
                    dark: props.dark,
                    followDark: props.followDark,
                    fontSize: props.titleSize,
                    color: unref(isActive) ? props.activeColor : "",
                    label: props.title
                  }, null, 8, ["dark", "followDark", "fontSize", "color", "label"])
                ])
              ]),
              renderSlot(_ctx.$slots, "rightLabel"),
              unref(_tmCollapseIconPos) == "right" ? (openBlock(), createElementBlock("view", {
                key: 1,
                class: "pl-16 flex-center"
              }, [
                createVNode(tmIcon, {
                  dark: props.dark,
                  followDark: props.followDark,
                  color: unref(isActive) ? props.activeColor : "grey-1",
                  name: unref(isActive) ? unref(_tmCollapseopenIcon) : unref(_tmCollapsecloseIcon),
                  "font-size": 20
                }, null, 8, ["dark", "followDark", "color", "name"])
              ])) : createCommentVNode("v-if", true)
            ], 4)
          ]),
          _: 3
        }, 8, ["transprent", "color", "text", "border", "linear", "linearDeep", "dark", "followDark", "followTheme", "margin", "padding"]),
        unref(isActive) ? (openBlock(), createElementBlock("view", {
          key: 0,
          class: "flex overflow"
        }, [
          createElementVNode("view", {
            class: normalizeClass(["flex content flex-col flex-1", [isActiveAfter.value ? "on" : ""]])
          }, [
            renderSlot(_ctx.$slots, "default")
          ], 2)
        ])) : createCommentVNode("v-if", true)
      ], 2);
    };
  }
});
var __easycom_14 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-collapse-item/tm-collapse-item.vue"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "tm-collapse",
  props: {
    activeKey: {
      type: [Array],
      default: () => []
    },
    defaultActiveKey: {
      type: [Array],
      default: () => []
    },
    accordion: {
      type: [Boolean, String],
      default: false
    },
    border: {
      type: [Number, String],
      default: 2
    },
    iconPos: {
      type: String,
      default: "left"
    },
    openIcon: {
      type: String,
      default: "tmicon-angle-up"
    },
    closeIcon: {
      type: String,
      default: "tmicon-angle-down"
    }
  },
  emits: ["change", "update:active-key"],
  setup(__props, { expose, emit: emits }) {
    const props = __props;
    const _activeKey = ref([...props.activeKey, ...props.defaultActiveKey]);
    if (props.accordion) {
      if (_activeKey.value.length > 0) {
        _activeKey.value = [_activeKey.value[0]];
      }
    }
    const cacheKey = ref([]);
    const pushKey = function(key) {
      cacheKey.value = [.../* @__PURE__ */ new Set([...cacheKey.value, key])];
    };
    const setKey = function(key) {
      let findkey = _activeKey.value.findIndex((el) => String(el) == String(key));
      if (props.accordion) {
        if (findkey > -1) {
          _activeKey.value = [];
        } else {
          _activeKey.value = [key];
        }
      } else {
        if (findkey > -1) {
          _activeKey.value.splice(findkey, 1);
        } else {
          _activeKey.value.push(key);
        }
      }
      emits("update:active-key", _activeKey.value);
      emits("change", _activeKey.value);
    };
    emits("update:active-key", _activeKey.value);
    expose({ tmCollapse: "tmCollapse", setKey, pushKey, border: props.border });
    provide("tmCollapseKeyList", computed(() => _activeKey.value));
    provide("tmCollapseIconPos", computed(() => props.iconPos));
    provide("tmCollapseopenIcon", computed(() => props.openIcon));
    provide("tmCollapsecloseIcon", computed(() => props.closeIcon));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        class: "flex-col flex",
        renderWhole: true
      }, [
        renderSlot(_ctx.$slots, "default")
      ]);
    };
  }
});
var __easycom_15 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-collapse/tm-collapse.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "market",
  setup(__props) {
    const coinlist = ref([
      { key: "1", title: "\u6301\u4ED3", icon: "" },
      { key: "2", title: "\u81EA\u9009", icon: "" },
      { key: "3", title: "\u5168\u90E8", dotColor: "yellow", icon: "" },
      { key: "4", title: "AMM", icon: "" },
      { key: "5", title: "\u6760\u6746", icon: "" },
      { key: "6", title: "Terra Classic", icon: "" },
      { key: "7", title: "\u7C89\u4E1D\u4EE3\u5E01", icon: "" },
      { key: "8", title: "MEME", icon: "" },
      { key: "9", title: "NFT", icon: "" },
      { key: "10", title: "DeFi", icon: "" },
      { key: "11", title: "GameFi", icon: "" },
      { key: "12", title: "Coin", icon: "" },
      { key: "13", title: "\u9690\u79C1", icon: "" },
      { key: "14", title: "Avalanche", icon: "" },
      { key: "15", title: "\u5143\u5B87\u5B99", icon: "" },
      { key: "16", title: "Solana", icon: "" },
      { key: "17", title: "Token", icon: "" },
      { key: "18", title: "DAO", icon: "" },
      { key: "19", title: "Layer2", icon: "" },
      { key: "20", title: "\u5B58\u50A8", icon: "" },
      { key: "21", title: "Polkadot", icon: "" },
      { key: "22", title: "Fantom", icon: "" },
      { key: "23", title: "CSC", icon: "" },
      { key: "24", title: "BSC", icon: "" },
      { key: "25", title: "Cosmos", icon: "" }
    ]);
    return (_ctx, _cache) => {
      const _component_tm_icon = resolveEasycom(resolveDynamicComponent("tm-icon"), tmIcon);
      const _component_navigator = resolveComponent("navigator");
      const _component_tm_navbar = resolveEasycom(resolveDynamicComponent("tm-navbar"), tmNavbar);
      const _component_tm_image = resolveEasycom(resolveDynamicComponent("tm-image"), tmImage);
      const _component_tm_text = resolveEasycom(resolveDynamicComponent("tm-text"), tmText);
      const _component_tm_input = resolveEasycom(resolveDynamicComponent("tm-input"), tmInput);
      const _component_tm_sheet = resolveEasycom(resolveDynamicComponent("tm-sheet"), tmSheet);
      const _component_tm_grid_item = resolveEasycom(resolveDynamicComponent("tm-grid-item"), __easycom_6);
      const _component_tm_grid = resolveEasycom(resolveDynamicComponent("tm-grid"), __easycom_7);
      const _component_tm_tabs = resolveEasycom(resolveDynamicComponent("tm-tabs"), __easycom_8);
      const _component_tm_col = resolveEasycom(resolveDynamicComponent("tm-col"), __easycom_9);
      const _component_tm_row = resolveEasycom(resolveDynamicComponent("tm-row"), __easycom_10);
      const _component_tm_tag = resolveEasycom(resolveDynamicComponent("tm-tag"), __easycom_11);
      const _component_tm_button = resolveEasycom(resolveDynamicComponent("tm-button"), __easycom_12);
      const _component_tm_divider = resolveEasycom(resolveDynamicComponent("tm-divider"), tmDivider);
      const _component_tm_collapse_item = resolveEasycom(resolveDynamicComponent("tm-collapse-item"), __easycom_14);
      const _component_tm_collapse = resolveEasycom(resolveDynamicComponent("tm-collapse"), __easycom_15);
      const _component_tm_app = resolveEasycom(resolveDynamicComponent("tm-app"), tmApp);
      return openBlock(), createElementBlock("scroll-view", {
        scrollY: true,
        showScrollbar: true,
        enableBackToTop: true,
        bubble: "true",
        style: { flexDirection: "column" }
      }, [
        createVNode(_component_tm_app, null, {
          default: withCtx(() => [
            createCommentVNode(" navbar "),
            createVNode(_component_tm_navbar, {
              title: "Market",
              linearDeep: "accent",
              hideHome: ""
            }, {
              right: withCtx(() => [
                createVNode(_component_navigator, {
                  url: "search",
                  "open-type": "navigate",
                  "hover-class": "navigator-hover",
                  "animation-type": "pop-in",
                  "animation-duration": "3000"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_tm_icon, {
                      _class: "px-10",
                      name: "tmicon-tongzhi"
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_tm_icon, {
                  _class: "px-32",
                  name: "tmicon-external-link"
                })
              ]),
              _: 1
            }),
            createVNode(_component_tm_sheet, {
              darkBgColor: "#050505",
              margin: [0, 0]
            }, {
              default: withCtx(() => [
                createElementVNode("view", { class: "flex-row flex-row-center-start pb-10" }, [
                  createVNode(_component_tm_image, {
                    width: 108,
                    height: 67.5,
                    src: "/static/logo.png"
                  }, null, 8, ["height"]),
                  createElementVNode("view", { class: "pl-16" }, [
                    createVNode(_component_tm_text, {
                      _class: "text-weight-b",
                      "font-size": 36,
                      label: "TMUI 3.0.0"
                    }),
                    createVNode(_component_tm_text, {
                      color: "grey",
                      label: "\u5168\u7AEF\u517C\u5BB9vue3 TypeScript pinia\u7EC4\u4EF6\u5E93"
                    })
                  ])
                ]),
                createVNode(_component_tm_input, {
                  placeholder: "\u7EC4\u4EF6\u4E2D\u6587/\u82F1\u6587\u540D\u79F0",
                  border: 1,
                  showClear: "",
                  prefix: "tmicon-search",
                  searchLabel: "\u641C\u7D22\u7EC4\u4EF6"
                })
              ]),
              _: 1
            }),
            createCommentVNode(" countlist "),
            createVNode(_component_tm_sheet, null, {
              default: withCtx(() => [
                createVNode(_component_tm_grid, {
                  width: 630,
                  col: 3
                }, {
                  default: withCtx(() => [
                    createVNode(_component_tm_grid_item, null, {
                      default: withCtx(() => [
                        createVNode(_component_tm_text, {
                          label: "\u5E01\u79CD\u6570\u91CF",
                          "font-size": 24
                        }),
                        createVNode(_component_tm_text, {
                          label: "611",
                          _class: "font-weight-b",
                          "font-size": 32
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_tm_grid_item, null, {
                      default: withCtx(() => [
                        createVNode(_component_tm_text, {
                          label: "\u603B\u5E02\u503C(CNY)",
                          "font-size": 24
                        }),
                        createVNode(_component_tm_text, {
                          label: "66878.31\u4EBF",
                          _class: "font-weight-b",
                          "font-size": 36
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_tm_grid_item, null, {
                      default: withCtx(() => [
                        createVNode(_component_tm_text, {
                          label: "24H\u6DA8\u8DCC",
                          "font-size": 24
                        }),
                        createVNode(_component_tm_text, {
                          label: "+0.080%",
                          _class: "font-weight-b",
                          "font-size": 32,
                          color: "#0ead98"
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            createCommentVNode(" coinlist "),
            createVNode(_component_tm_sheet, {
              padding: [0, 0],
              _class: "overflow"
            }, {
              default: withCtx(() => [
                createVNode(_component_tm_tabs, {
                  showTabsLineAni: "",
                  "item-width": 110,
                  width: 636,
                  height: 500,
                  "default-name": "1",
                  list: coinlist.value
                }, null, 8, ["list"]),
                createVNode(_component_tm_row, { gutter: 60 }, {
                  default: withCtx(() => [
                    createVNode(_component_tm_col, {
                      align: "start",
                      class: "flex-1"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_tm_text, {
                          label: "\u5E02\u503C(CNY)",
                          color: "grey",
                          "font-size": 18
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_tm_col, { class: "flex-1" }, {
                      default: withCtx(() => [
                        createVNode(_component_tm_text, {
                          label: "\u4EF7\u683C/\u6210\u4EA4\u989D",
                          color: "grey",
                          "font-size": 18
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_tm_col, {
                      align: "end",
                      class: "flex-1"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_tm_text, {
                          label: "24H\u6DA8\u8DCC",
                          color: "grey",
                          "font-size": 18
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_tm_collapse, { accordion: "" }, {
                  default: withCtx(() => [
                    createVNode(_component_tm_collapse_item, {
                      name: "1",
                      height: 120
                    }, {
                      title: withCtx(() => [
                        createVNode(_component_tm_grid, {
                          col: 3,
                          class: "l--40"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_tm_grid_item, { class: "l--15" }, {
                              default: withCtx(() => [
                                createVNode(_component_tm_row, { gutter: 4 }, {
                                  default: withCtx(() => [
                                    createVNode(_component_tm_col, { height: 100 }, {
                                      default: withCtx(() => [
                                        createVNode(_component_tm_image, {
                                          width: 40,
                                          height: 40,
                                          src: "http://icon.tgbott.com/eth2.png",
                                          _style: "color: red;"
                                        }),
                                        createVNode(_component_tm_tag, {
                                          size: "xs",
                                          class: "",
                                          "font-size": 12,
                                          color: "grey-5",
                                          round: 20,
                                          label: "1"
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_tm_col, { height: 100 }, {
                                      default: withCtx(() => [
                                        createVNode(_component_tm_text, {
                                          label: "XAL",
                                          class: "t--10",
                                          style: { "font-weight": "600" },
                                          "font-size": 32
                                        }),
                                        createVNode(_component_tm_text, {
                                          label: "114.23\u4EBF",
                                          color: "grey",
                                          "font-size": 18
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_tm_grid_item, { class: "l--50" }, {
                              default: withCtx(() => [
                                createVNode(_component_tm_text, {
                                  label: "121.353123",
                                  class: "t--10",
                                  style: { "font-weight": "600" },
                                  "font-size": 32
                                }),
                                createVNode(_component_tm_text, {
                                  label: "842.23\u4E07",
                                  color: "grey",
                                  "font-size": 18
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_tm_grid_item, { class: "l--50" }, {
                              default: withCtx(() => [
                                createVNode(_component_tm_button, {
                                  size: "small",
                                  label: "small"
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      default: withCtx(() => [
                        createVNode(_component_tm_sheet, {
                          color: "grey-5",
                          text: true
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_tm_row, {
                              margin: [0, 5],
                              gutter: 2,
                              color: "grey-5"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_tm_col, {
                                  class: "flex-6",
                                  color: "grey-5",
                                  text: true
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_tm_text, {
                                      color: "grey",
                                      "font-size": 24,
                                      label: "\u5E02\u573A"
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_tm_col, {
                                  class: "flex-3",
                                  color: "grey-5",
                                  text: true
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_tm_text, {
                                      color: "grey",
                                      "font-size": 24,
                                      label: "\u6700\u65B0\u4EF7"
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_tm_col, {
                                  class: "flex-3",
                                  color: "grey-5",
                                  text: true
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_tm_text, {
                                      color: "grey",
                                      "font-size": 24,
                                      label: "24H\u6DA8\u8DCC"
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_tm_divider),
                            createVNode(_component_tm_row, {
                              margin: [0, 5],
                              gutter: 2,
                              color: "grey-5"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_tm_col, {
                                  class: "flex-6",
                                  color: "grey-5",
                                  text: true
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_tm_text, {
                                      label: "\u5E01\u5E01",
                                      style: { "font-size": "24rpx", "font-weight": "900" }
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_tm_col, {
                                  class: "flex-3",
                                  color: "grey-5",
                                  text: true
                                }),
                                createVNode(_component_tm_col, {
                                  class: "flex-3",
                                  color: "grey-5",
                                  text: true
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_tm_row, {
                              margin: [0, 5],
                              gutter: 2,
                              color: "grey-5"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_tm_col, {
                                  class: "flex-6",
                                  color: "grey-5",
                                  text: true
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_tm_text, {
                                      label: "PIT/USDT",
                                      color: "grey-darken-2",
                                      "font-size": 24
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_tm_col, {
                                  class: "flex-3",
                                  color: "grey-5",
                                  text: true
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_tm_text, {
                                      label: "0.0000213123213",
                                      color: "grey-darken-2",
                                      "font-size": 24
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_tm_col, {
                                  class: "flex-3",
                                  color: "grey-5",
                                  text: true
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_tm_text, {
                                      label: "+23.29%",
                                      color: "primary",
                                      "font-size": 24
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_tm_divider)
                      ]),
                      _: 1
                    })
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
var market = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/market/market.nvue"]]);
export { market as default };
