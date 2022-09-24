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
import { _ as _export_sfc, c as custom_props, u as useTmpiniaStore, r as requireNativePlugin, d as computedClass, a as tmText, t as tmApp, g as formatAppLog } from "../../tm-text.js";
import { defineComponent, getCurrentInstance, ref, computed, watchEffect, watch, onMounted, nextTick, onUnmounted, toRaw, provide, openBlock, createElementBlock, normalizeStyle, unref, createCommentVNode, renderSlot, createVNode, withCtx, normalizeClass, Fragment, renderList, createElementVNode, createBlock, inject, resolveComponent } from "vue";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmIcon } from "../../tm-icon.js";
import { t as tmBadge } from "../../tm-badge.js";
import { t as tmDivider } from "../../tm-divider.js";
import "pinia";
var _style_0$1 = { "animateAll_tabs_tmui": { "": { "transitionDelay": 0, "transitionTimingFunction": "ease", "transitionProperty": "transform,width", "transitionDuration": 300 } }, "@TRANSITION": { "animateAll_tabs_tmui": { "delay": 0, "timingFunction": "ease", "property": "transform,width", "duration": 300 } } };
var _style_1 = { "tmTabsPane": { "": { "transitionDelay": 0, "transitionTimingFunction": "ease", "transitionProperty": "transform", "transitionDuration": 300 } }, "anilineBar": { "": { "transitionDelay": 0, "transitionTimingFunction": "ease", "transitionProperty": "transform,width", "transitionDuration": 300 } }, "@TRANSITION": { "tmTabsPane": { "delay": 0, "timingFunction": "ease", "property": "transform", "duration": 300 }, "anilineBar": { "delay": 0, "timingFunction": "ease", "property": "transform,width", "duration": 300 } } };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
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
        let sx = Math.abs(sliderBarWidth) * 1.05;
        sx = Math.min(sx, sliderBarWidth);
        sx = Math.max(sx, _itemwidth);
        widthDrag.value = sx;
        if (isEnd) {
          setRightDirRight();
          widthDrag.value = sliderBarWidth;
        }
      } else if (dirType.value == "left") {
        if (activeIndex.value == cacheTabs.value.length - 1)
          return;
        directoStyle.value = x - nowLeft;
        let sx = Math.abs(_x.value) * 1.0002;
        sx = Math.min(sx, sliderBarWidth);
        sx = Math.max(sx, _itemwidth);
        widthDrag.value = sx;
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
        }
      }
      function setLeftDirLeft() {
        if (Math.abs(x) < maxLen || activeIndex.value >= cacheTabs.value.length - 1) {
          directoStyle.value = -nowLeft;
        } else {
          _active.value = cacheTabs.value[activeIndex.value + 1].key;
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
var tmTabs = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["styles", [_style_0$1, _style_1]], ["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-tabs/tm-tabs.vue"]]);
var _style_0 = { "contentx": { "": { "transitionDuration": 500, "transitionTimingFunction": "ease", "transitionDelay": 0, "transform": "translateY(0px)", "transitionProperty": "transform,top" } }, "@TRANSITION": { "contentx": { "duration": 500, "timingFunction": "ease", "delay": 0, "property": "transform,top" } } };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "tm-tabs-pane",
  props: __spreadProps(__spreadValues({}, custom_props), {
    transprent: {
      type: [Boolean, String],
      default: false
    },
    color: {
      type: String,
      default: "white"
    },
    dot: {
      type: Boolean,
      default: false
    },
    count: {
      type: [String, Number],
      default: ""
    },
    dotColor: {
      type: String,
      default: "red"
    },
    name: {
      type: [String, Number],
      default: "",
      required: true
    },
    title: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    }
  }),
  setup(__props) {
    var _a, _b, _c;
    const props = __props;
    ref(null);
    const proxy = (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const sc_top = ref(0);
    const refreshJuli = -100;
    const reFresh = ref(0);
    const isyesResh = ref(false);
    const isUpToogle = ref(true);
    const _pname = computed(() => String(props.name));
    let parent = proxy == null ? void 0 : proxy.$parent;
    while (parent) {
      if ((parent == null ? void 0 : parent.tmTabsId) == "tmTabsId" || !parent) {
        break;
      } else {
        parent = (_c = parent == null ? void 0 : parent.$parent) != null ? _c : null;
      }
    }
    if (typeof _pname.value != "undefined" && _pname.value != "") {
      parent == null ? void 0 : parent.pushKey({
        key: _pname.value,
        title: props.title,
        icon: props.icon,
        dot: props.dot,
        count: props.count,
        dotColor: props.dotColor
      });
    }
    const _width = inject("tabsWidth", computed(() => 0));
    const _height = inject("tabsheight", computed(() => 0));
    inject("tabsActiveName", computed(() => void 0));
    const tabsActiveCacheTabse = inject("tabsActiveCacheTabse", computed(() => {
      return [];
    }));
    const tabsSwiper = inject("tabsSwiper", computed(() => false));
    const tabsSwiperIsMoveing = inject("tabsSwiperIsMoveing", computed(() => false));
    const activeIndex = inject("tabsActiveactiveIndex", computed(() => 0));
    const selfIndex = computed(() => tabsActiveCacheTabse.value.findIndex((el) => el.key == _pname.value));
    const isShowRender = computed(() => {
      if (tabsSwiper.value == false) {
        return selfIndex.value == activeIndex.value;
      }
      return selfIndex.value >= activeIndex.value - 1 && selfIndex.value <= activeIndex.value + 1;
    });
    watch([() => props.title, () => props.icon, () => props.dot, () => props.dotColor], () => {
      parent == null ? void 0 : parent.setTitle({
        key: _pname.value,
        title: props.title,
        icon: props.icon,
        dot: props.dot,
        dotColor: props.dotColor
      });
    });
    onUnmounted(() => {
      parent == null ? void 0 : parent.unbindKey(_pname.value);
    });
    function onScroll(e) {
      if (tabsSwiperIsMoveing.value)
        return;
      if (reFresh.value == 2 && isUpToogle.value)
        return;
      if (sc_top.value <= refreshJuli) {
        isyesResh.value = true;
      } else {
        isyesResh.value = false;
      }
      sc_top.value = e.detail.scrollTop;
      reFresh.value = 1;
    }
    function onScrollStart() {
      if (tabsSwiperIsMoveing.value)
        return;
      isUpToogle.value = false;
    }
    function onScrollEnd() {
      if (tabsSwiperIsMoveing.value)
        return;
      isUpToogle.value = true;
      if (reFresh.value == 2)
        return;
      if (isyesResh.value) {
        reFresh.value = 2;
        setTimeout(function() {
          reFresh.value = 0;
        }, 1500);
      } else {
        reFresh.value = 0;
      }
    }
    return (_ctx, _cache) => {
      const _component_tm_icon = resolveComponent("tm-icon");
      const _component_tm_text = resolveComponent("tm-text");
      return unref(tabsSwiper) || !unref(tabsSwiper) && unref(isShowRender) ? (openBlock(), createBlock(tmSheet, {
        key: 0,
        transprent: props.transprent,
        color: props.color,
        followTheme: props.followTheme,
        followDark: props.followDark,
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
        _style: props._style,
        _class: props._class,
        eventPenetrationEnabled: true,
        margin: [0, 0],
        padding: [0, 0],
        width: unref(_width),
        height: unref(_height)
      }, {
        default: withCtx(() => [
          sc_top.value < -30 && reFresh.value != 0 ? (openBlock(), createElementBlock("view", {
            key: 0,
            style: normalizeStyle({ top: (reFresh.value == 2 ? -refreshJuli / 2 : -sc_top.value - 30) + "px", width: unref(_width) + "rpx" }),
            class: "zIndex-17 absolute l-0 flex flex-row flex-row-center-center"
          }, [
            createElementVNode("view", { class: "pr-32" }, [
              sc_top.value > refreshJuli && reFresh.value != 2 ? (openBlock(), createBlock(_component_tm_icon, {
                key: 0,
                name: "tmicon-long-arrow-down"
              })) : createCommentVNode("v-if", true),
              sc_top.value <= refreshJuli && reFresh.value != 2 ? (openBlock(), createBlock(_component_tm_icon, {
                key: 1,
                name: "tmicon-long-arrow-up"
              })) : createCommentVNode("v-if", true),
              reFresh.value == 2 ? (openBlock(), createBlock(_component_tm_icon, {
                key: 2,
                spin: "",
                name: "tmicon-shuaxin"
              })) : createCommentVNode("v-if", true)
            ]),
            createElementVNode("view", null, [
              sc_top.value > refreshJuli ? (openBlock(), createBlock(_component_tm_text, {
                key: 0,
                _class: "text-align-center",
                label: "\u4E0B\u62C9\u5237\u65B0"
              })) : createCommentVNode("v-if", true),
              sc_top.value <= refreshJuli ? (openBlock(), createBlock(_component_tm_text, {
                key: 1,
                _class: "text-align-center",
                label: "\u677E\u5F00\u7ACB\u5373\u5237\u65B0"
              })) : createCommentVNode("v-if", true),
              createVNode(_component_tm_text, {
                _class: "text-align-center",
                label: "\u66F4\u65B0\u4E8E\u4ECA\u65E58:30"
              })
            ])
          ], 4)) : createCommentVNode("v-if", true),
          createElementVNode("scroll-view", {
            onScroll,
            scrollY: unref(_height) ? true : false,
            enableFlex: "",
            class: "flex-col",
            style: normalizeStyle([{ width: unref(_width) + "rpx" }, unref(_height) ? { height: unref(_height) + "rpx" } : ""])
          }, [
            unref(isShowRender) ? (openBlock(), createElementBlock("view", {
              key: 0,
              onTouchStart: onScrollStart,
              onTouchend: onScrollEnd,
              style: normalizeStyle({ transform: `translateY(${reFresh.value == 2 ? -refreshJuli : 0}px)` }),
              class: "flex contentx"
            }, [
              renderSlot(_ctx.$slots, "default")
            ], 36)) : createCommentVNode("v-if", true)
          ], 44, ["scrollY"])
        ]),
        _: 3
      }, 8, ["transprent", "color", "followTheme", "followDark", "dark", "round", "shadow", "outlined", "border", "borderStyle", "borderDirection", "text", "linear", "linearDeep", "_style", "_class", "width", "height"])) : createCommentVNode("v-if", true);
    };
  }
});
var tmTabsPane = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["styles", [_style_0]], ["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-tabs-pane/tm-tabs-pane.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tabs",
  setup(__props) {
    const tabsTitle = ref([
      { key: "1", title: "\u9009\u98791", icon: "tmicon-ios-leaf" },
      { key: "2", title: "\u9009\u98792", icon: "tmicon-ios-umbrella" },
      { key: "3", title: "\u9009\u98793", dot: true, dotColor: "yellow", icon: "tmicon-ios-rocket" },
      { key: "4", title: "\u9009\u98794", icon: "tmicon-ios-partly-sunny" }
    ]);
    function tabschange(key) {
      formatAppLog("log", "at pages/showdata/tabs.nvue:68", key);
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
                createVNode(tmTabs, {
                  showTabsLineAni: "",
                  "item-width": 110,
                  swiper: "",
                  width: 636,
                  height: 500,
                  "default-name": "2"
                }, {
                  default: withCtx(() => [
                    (openBlock(), createElementBlock(Fragment, null, renderList(20, (item, index) => {
                      return createVNode(tmTabsPane, {
                        dot: item == 3,
                        key: index,
                        name: item,
                        title: "\u6807\u9898"
                      }, {
                        default: withCtx(() => [
                          createVNode(tmSheet, { margin: [0, 0] }, {
                            default: withCtx(() => [
                              createVNode(tmText, {
                                "font-size": 30,
                                _class: "font-weight-b",
                                color: "red",
                                label: item + ";\u672C\u7EC4\u4EF6\u53EF\u4EE5\u5F00\u542Fswiper\u5C5E\u6027\uFF0C\u4F60\u73B0\u5728\u53EF\u4EE5\u5C1D\u8BD5\u5DE6\u53F3\u6ED1\u52A8\u3002\u5F00\u542F\u5DE6\u53F3\u6ED1\u52A8\uFF0C\u9875\u9762\u6700\u597D\u7981\u7528\u6EDA\u52A8\uFF0C\u4EE5\u9632\u4E0E\u9875\u9762\u4E8B\u4EF6\u51B2\u7A81\u3002(\u5F53\u7136\u662F\u517C\u5BB9\u4E86WEB pc\u7AEF)"
                              }, null, 8, ["label"]),
                              createVNode(tmText, {
                                "font-size": 30,
                                _class: "font-weight-b",
                                label: "\u4E5F\u53EF\u4EE5\u5173\u95EDswiper\u5C5E\u6027\u3002\u5982\u679C\u5F00\u542F\uFF0C\u6240\u6709\u7684tabs\u5185\u5BB9\u9ED8\u8BA4\u90FD\u663E\u793A\u7684\uFF0C\u56E0\u6B64\u8BF7\u6CE8\u610F\u4F18\u5316\u754C\u9762\u7684\u6D41\u7545\u5EA6\u3002"
                              }),
                              createVNode(tmDivider)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1032, ["dot", "name"]);
                    }), 64))
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: "\u4E0B\u9762\u7684\u793A\u4F8B\u4E3A\u5355\u72EC\u4F7F\u7528"
                }),
                createVNode(tmDivider),
                createVNode(tmTabs, {
                  list: tabsTitle.value,
                  width: 636,
                  height: 300,
                  "default-name": "1"
                }, null, 8, ["list"])
              ]),
              _: 1
            }),
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: "\u5176\u5B83\u4E00\u4E9B\u5C5E\u6027\u7279\u6027"
                }),
                createVNode(tmDivider),
                createVNode(tmTabs, {
                  list: tabsTitle.value,
                  border: 1,
                  width: 636,
                  height: 300,
                  "default-name": "1",
                  round: 2,
                  color: "grey",
                  text: "",
                  activeFontColor: "primary",
                  unSelectedColor: "grey-darken-2"
                }, null, 8, ["list"]),
                createVNode(tmDivider),
                createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: "\u6E10\u53D8\u80CC\u666F"
                }),
                createVNode(tmDivider),
                createVNode(tmTabs, {
                  list: tabsTitle.value,
                  width: 636,
                  height: 300,
                  "default-name": "1",
                  round: 2,
                  color: "red",
                  activeFontColor: "yellow",
                  linear: "left"
                }, null, 8, ["list"]),
                createVNode(tmDivider),
                createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: "\u5361\u7247\u5F0F"
                }),
                createVNode(tmDivider),
                createVNode(tmTabs, {
                  onChange: tabschange,
                  list: tabsTitle.value,
                  align: "center",
                  width: 636,
                  height: 300,
                  "default-name": "1",
                  round: 2,
                  color: "black",
                  itemModel: "card",
                  activeColor: "yellow",
                  activeFontColor: "black"
                }, null, 8, ["list"]),
                createVNode(tmDivider),
                createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: "\u7EBF\u5F0F"
                }),
                createVNode(tmDivider),
                createVNode(tmTabs, {
                  list: tabsTitle.value,
                  align: "center",
                  width: 636,
                  height: 300,
                  "default-name": "1",
                  itemModel: "line",
                  activeColor: "primary",
                  activeFontColor: "primary"
                }, null, 8, ["list"])
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
var tabs = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/showdata/tabs.nvue"]]);
export { tabs as default };
