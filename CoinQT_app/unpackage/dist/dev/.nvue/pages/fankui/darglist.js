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
import { defineComponent, ref, onMounted, nextTick, openBlock, createElementBlock, createElementVNode, normalizeStyle, normalizeClass, Fragment, renderList, createVNode, withCtx, createCommentVNode, withModifiers, toRaw } from "vue";
import { _ as _export_sfc, a as tmText, t as tmApp } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmIcon } from "../../tm-icon.js";
import "pinia";
var _style_0 = { "tm-dragList-item": { "": { "transitionDelay": 0, "transitionProperty": "top,left,transform", "transitionTimingFunction": "ease", "transitionDuration": 150 } }, "@TRANSITION": { "tm-dragList-item": { "delay": 0, "property": "top,left,transform", "timingFunction": "ease", "duration": 150 } } };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "tm-drag-list",
  props: {
    disabled: {
      type: [String, Boolean],
      default: false
    },
    width: {
      type: Number,
      default: 700
    },
    height: {
      type: Number,
      default: 90
    },
    list: {
      type: Array,
      default: () => {
        return [];
      }
    },
    rangKey: {
      type: String,
      default: "text"
    },
    rightIcon: {
      type: String,
      default: "icon-menu"
    },
    bgColor: {
      type: String,
      default: "white"
    }
  },
  emits: ["change"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const w = ref(0);
    const h = ref(0);
    const totalH = ref(0);
    let y = 0;
    const new_index = ref(NaN);
    const nowMove_index = ref(NaN);
    const listData = ref([]);
    const endDrage = ref(false);
    const isNvue = ref(false);
    isNvue.value = true;
    onMounted(() => jishunTopData());
    function jishunTopData() {
      nextTick(function() {
        listData.value = [];
        w.value = uni.upx2px(props.width) || 700;
        h.value = uni.upx2px(props.height) || 120;
        totalH.value = h.value * props.list.length;
        for (let i = 0; i < props.list.length; i++) {
          let p = props.list[i];
          p["top"] = i * h.value;
          p["i"] = i;
          p["__id"] = uni.$tm.u.getUid();
          listData.value.push(p);
        }
        [...listData.value];
      });
    }
    function m_start_longpress(index) {
      endDrage.value = false;
      nowMove_index.value = index;
      uni.vibrateShort({
        success: function() {
        }
      });
    }
    function m_start(event, index) {
      event.preventDefault();
      event.stopPropagation();
      if (props.disabled)
        return;
      [...listData.value];
      if (event.type.indexOf("mouse") == -1 && event.changedTouches.length == 1) {
        var touch = event.changedTouches[0];
        y = touch.pageY - event.currentTarget.offsetTop - listData.value[index].top;
      } else {
        y = event.pageY - event.currentTarget.offsetTop - listData.value[index].top;
      }
    }
    function m_move(event, index) {
      if (props.disabled)
        return;
      event.preventDefault();
      event.stopPropagation();
      if (isNaN(nowMove_index.value))
        return;
      let ch = 0;
      if (event.type.indexOf("mouse") == -1 && event.changedTouches.length == 1) {
        var touch = event.changedTouches[0];
        ch = touch.pageY - y;
      } else {
        ch = event.pageY - y;
      }
      listData.value.splice(index, 1, __spreadProps(__spreadValues({}, listData.value[index]), {
        top: ch
      }));
      const currenit_index = index;
      const currentSort = listData.value[currenit_index].i;
      const currenit_id = listData.value[currenit_index].__id;
      let moveIndex = Math.round(ch / h.value);
      moveIndex = moveIndex < 0 ? 0 : moveIndex;
      moveIndex = moveIndex > listData.value.length - 1 ? listData.value.length - 1 : moveIndex;
      moveIndex = Math.abs(moveIndex);
      index = moveIndex;
      let elList = [...listData.value];
      for (let i = 0; i < elList.length; i++) {
        if (currentSort < moveIndex) {
          if (elList[i].i > currentSort && elList[i].i <= moveIndex) {
            elList[i].i -= 1;
          }
        } else if (currentSort > moveIndex) {
          if (elList[i].i < currentSort && elList[i].i >= moveIndex) {
            elList[i].i += 1;
          }
        }
      }
      elList[currenit_index].i = moveIndex;
      elList = elList.map((im) => {
        if (im.__id != currenit_id) {
          im.top = im.i * h.value;
        }
        return im;
      });
      listData.value = elList;
      new_index.value = moveIndex;
    }
    function m_end(event, index) {
      if (props.disabled)
        return;
      event.preventDefault();
      event.stopPropagation();
      nowMove_index.value = NaN;
      endDrage.value = true;
      if (isNaN(new_index.value))
        return;
      let elList = [...listData.value];
      elList = elList.map((im) => {
        im.top = im.i * h.value;
        return im;
      });
      elList.sort((a, b) => a.i - b.i);
      listData.value = [...elList];
      moveChange();
    }
    function moveChange() {
      if (props.disabled)
        return;
      emits("change", toRaw(listData.value));
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        ref: "tm-dragList",
        class: "tm-dragList flex flex-col flex-col-center-center",
        renderWhole: true
      }, [
        createElementVNode("view", {
          style: normalizeStyle({ height: h.value * __props.list.length + "px", width: w.value + "px" }),
          class: normalizeClass(["relative flex flex-col", [__props.disabled ? "opacity-4" : ""]])
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(listData.value, (item, index) => {
            return openBlock(), createElementBlock("view", {
              class: normalizeClass(["overflow flex flex-col", [
                "absolute",
                "tm-dragList-item",
                "flex-between"
              ]]),
              key: index,
              style: normalizeStyle([
                {
                  top: `${item.top}px`,
                  height: h.value + "px",
                  width: w.value + "px",
                  zIndex: nowMove_index.value == index ? 5 : 0
                },
                isNvue.value ? { "transition-delay": "0.1s" } : { "transition-duration": nowMove_index.value == index || endDrage.value ? "0s" : "0.25s" }
              ])
            }, [
              createVNode(tmSheet, {
                "hover-class": "opacity-6",
                border: 1,
                "border-direction": "bottom",
                color: nowMove_index.value == index ? "grey-3" : "white",
                _class: "flex-1 flex flex-row flex-between",
                class: "flex-1",
                margin: [0, 0],
                padding: [0, 0]
              }, {
                default: withCtx(() => [
                  createElementVNode("view", {
                    class: "flex flex-row flex-row-center-start pl-12",
                    style: normalizeStyle({ height: h.value - 1 + "px" })
                  }, [
                    item["icon"] ? (openBlock(), createElementBlock("view", {
                      key: 0,
                      class: "flex-shrink fulled-height flex-center"
                    }, [
                      createVNode(tmIcon, {
                        color: item["color"],
                        name: item["icon"],
                        fontSize: 40
                      }, null, 8, ["color", "name"])
                    ])) : createCommentVNode("v-if", true),
                    createVNode(tmText, {
                      _class: " pl-24",
                      "font-size": 30,
                      label: item.text
                    }, null, 8, ["label"])
                  ], 4),
                  createElementVNode("view", {
                    style: normalizeStyle({ height: h.value - 1 + "px", width: "100rpx" }),
                    onTouchstart: withModifiers(($event) => m_start($event, index), ["stop", "prevent"]),
                    onLongpress: ($event) => m_start_longpress(index),
                    onMousedown: ($event) => m_start($event, index),
                    onTouchmove: withModifiers(($event) => m_move($event, index), ["stop", "prevent"]),
                    onMousemove: withModifiers(($event) => m_move($event, index), ["stop", "prevent"]),
                    onTouchend: ($event) => m_end($event),
                    onMouseup: ($event) => m_end($event),
                    class: "flex-shrink flex flex-row flex-row-center-center opacity-3"
                  }, [
                    createVNode(tmIcon, {
                      userInteractionEnabled: false,
                      name: "tmicon-menu"
                    })
                  ], 44, ["onTouchstart", "onLongpress", "onMousedown", "onTouchmove", "onMousemove", "onTouchend", "onMouseup"])
                ]),
                _: 2
              }, 1032, ["color"])
            ], 4);
          }), 128))
        ], 6)
      ], 512);
    };
  }
});
var tmDragList = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["styles", [_style_0]], ["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-drag-list/tm-drag-list.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "darglist",
  setup(__props) {
    ref(false);
    ref("bottom");
    const lsit = ref([
      { text: "\u6D4B\u8BD5\u9879\u76EE1-1" },
      { text: "\u6D4B\u8BD5\u9879\u76EE2-1" },
      { text: "\u6D4B\u8BD5\u9879\u76EE3-1" },
      { text: "\u6D4B\u8BD5\u9879\u76EE4-1" },
      { text: "\u6D4B\u8BD5\u9879\u76EE5-1" }
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
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: "\u957F\u6309\u56FE\u6807\u5F00\u59CB\u62D6\u52A8"
                })
              ]),
              _: 1
            }),
            createVNode(tmDragList, { list: lsit.value }, null, 8, ["list"])
          ]),
          _: 1
        })
      ]);
    };
  }
});
var darglist = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/fankui/darglist.nvue"]]);
export { darglist as default };
