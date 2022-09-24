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
import { defineComponent, getCurrentInstance, computed, ref, resolveComponent, openBlock, createElementBlock, createElementVNode, normalizeClass, normalizeStyle, createVNode, unref, withCtx, Fragment, renderList, createBlock, createCommentVNode, toDisplayString, nextTick } from "vue";
import { _ as _export_sfc, t as tmApp, a as tmText } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmImage } from "../../tm-image.js";
import "pinia";
import "../../tm-icon.js";
import "../../tm-translate.js";
var listItemType = /* @__PURE__ */ ((listItemType2) => {
  listItemType2["img"] = "img";
  listItemType2["video"] = "video";
  return listItemType2;
})(listItemType || {});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "tm-carousel",
  props: {
    followTheme: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: "primary"
    },
    width: {
      type: Number,
      default: 750
    },
    height: {
      type: Number,
      default: 500
    },
    round: {
      type: Number,
      default: 0
    },
    margin: {
      type: Array,
      default: () => [0, 0]
    },
    list: {
      type: Array,
      default: () => []
    },
    rangKey: {
      type: String,
      default: "url"
    },
    defaultValue: {
      type: Number,
      default: 0
    },
    dotPosition: {
      type: String,
      default: "bottom"
    },
    align: {
      type: String,
      default: "center"
    },
    model: {
      type: String,
      default: "number"
    },
    interval: {
      type: Number,
      default: 5e3
    },
    duration: {
      type: Number,
      default: 500
    },
    circular: {
      type: Boolean,
      default: true
    },
    vertical: {
      type: Boolean,
      default: false
    },
    acceleration: {
      type: Boolean,
      default: false
    },
    disableProgrammaticAnimation: {
      type: Boolean,
      default: false
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    displayMultipleItems: {
      type: Number,
      default: 1
    },
    skipHiddenItemLayout: {
      type: Boolean,
      default: false
    },
    disableTouch: {
      type: Boolean,
      default: false
    },
    touchable: {
      type: Boolean,
      default: false
    },
    indicatorDots: {
      type: Boolean,
      default: true
    },
    showLoad: {
      type: Boolean,
      default: true
    }
  },
  emits: ["change", "click"],
  setup(__props, { emit: emits }) {
    var _a, _b;
    const props = __props;
    (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const _list = computed(() => {
      let l = [];
      props.list.forEach((el) => {
        var _a2, _b2;
        if (typeof el == "string") {
          l.push({
            url: el,
            type: listItemType.img
          });
        } else if (typeof el === "object") {
          l.push(__spreadValues({
            url: el[props.rangKey],
            type: (_a2 = el == null ? void 0 : el.type) != null ? _a2 : listItemType.img,
            img: (_b2 = el == null ? void 0 : el.img) != null ? _b2 : ""
          }, el));
        }
      });
      return l;
    });
    const _current = ref(props.defaultValue || 0);
    const _currentActive = ref(props.defaultValue || 0);
    const _model = computed(() => props.model);
    const _dotPosition = computed(() => props.dotPosition);
    const _align = computed(() => props.align);
    const _autoplay = computed(() => props.autoplay);
    function sliderChange(e) {
      var _a2, _b2;
      if (!_autoplay.value) {
        _current.value = (_a2 = e == null ? void 0 : e.detail) == null ? void 0 : _a2.current;
      }
      _currentActive.value = (_b2 = e == null ? void 0 : e.detail) == null ? void 0 : _b2.current;
      nextTick(() => {
        emits("change", _currentActive.value);
      });
    }
    function dotClick(index) {
      _currentActive.value = index;
      if (!_autoplay.value) {
        _current.value = index;
      }
    }
    return (_ctx, _cache) => {
      const _component_swiper_item = resolveComponent("swiper-item");
      const _component_swiper = resolveComponent("swiper");
      return openBlock(), createElementBlock("view", {
        class: "flex flex-col flex-col-center-center",
        renderWhole: true
      }, [
        createElementVNode("view", {
          class: normalizeClass(["relative overflow", [`round-${props.round} mx-${props.margin[0]} my-${props.margin[1]}`]]),
          style: normalizeStyle([
            { width: `${props.width}rpx`, height: `${props.height}rpx` }
          ])
        }, [
          createVNode(_component_swiper, {
            "indicator-dots": false,
            interval: props.interval,
            duration: props.duration,
            circular: props.circular,
            vertical: props.vertical,
            acceleration: props.acceleration,
            disableProgrammaticAnimation: props.disableProgrammaticAnimation,
            autoplay: unref(_autoplay),
            displayMultipleItems: props.displayMultipleItems,
            skipHiddenItemLayout: props.skipHiddenItemLayout,
            disableTouch: props.disableTouch,
            touchable: props.touchable,
            onChange: sliderChange,
            class: normalizeClass(`round-${props.round}`),
            current: _current.value,
            style: normalizeStyle([
              { width: `${props.width}rpx`, height: `${props.height}rpx` }
            ])
          }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(_list), (item, index) => {
                return openBlock(), createBlock(_component_swiper_item, {
                  class: normalizeClass(`round-${props.round}`),
                  onClick: ($event) => emits("click", index),
                  key: index,
                  style: normalizeStyle([
                    { width: `${props.width}rpx`, height: `${props.height}rpx` }
                  ])
                }, {
                  default: withCtx(() => [
                    item.type == unref(listItemType).img ? (openBlock(), createBlock(tmImage, {
                      key: 0,
                      round: props.round,
                      userInteractionEnabled: false,
                      showLoad: props.showLoad,
                      src: item.url,
                      width: props.width,
                      height: props.height
                    }, null, 8, ["round", "showLoad", "src", "width", "height"])) : createCommentVNode("v-if", true),
                    item.type == unref(listItemType).video && item.img && _currentActive.value != index ? (openBlock(), createBlock(tmImage, {
                      key: 1,
                      round: props.round,
                      userInteractionEnabled: false,
                      showLoad: props.showLoad,
                      src: item.img,
                      width: props.width,
                      height: props.height
                    }, null, 8, ["round", "showLoad", "src", "width", "height"])) : createCommentVNode("v-if", true),
                    item.type == unref(listItemType).video && _currentActive.value === index ? (openBlock(), createElementBlock("u-video", {
                      key: 2,
                      userInteractionEnabled: false,
                      id: "video",
                      src: item.url,
                      style: normalizeStyle([
                        { width: `${props.width}rpx`, height: `${props.height}rpx` }
                      ]),
                      autoplay: _currentActive.value === index,
                      class: normalizeClass(`round-${props.round}`)
                    }, null, 14, ["src", "autoplay"])) : createCommentVNode("v-if", true)
                  ]),
                  _: 2
                }, 1032, ["class", "onClick", "style"]);
              }), 128))
            ]),
            _: 1
          }, 8, ["interval", "duration", "circular", "vertical", "acceleration", "disableProgrammaticAnimation", "autoplay", "displayMultipleItems", "skipHiddenItemLayout", "disableTouch", "touchable", "class", "current", "style"]),
          createCommentVNode(" dot "),
          unref(_model) == "dot" && props.indicatorDots ? (openBlock(), createElementBlock("view", {
            key: 0,
            class: normalizeClass(["absolute", [
              unref(_dotPosition) == "bottom" || unref(_dotPosition) == "top" ? "flex flex-row " : "",
              unref(_dotPosition) == "left" || unref(_dotPosition) == "right" ? "flex flex-col " : "",
              unref(_align) == "center" ? "flex-center" : "",
              unref(_align) == "left" ? "flex-row-center-start " : "",
              unref(_align) == "right" ? "flex-row-center-end " : "",
              unref(_dotPosition) == "left" && unref(_align) == "left" ? "ml-12 mt-24" : "",
              unref(_dotPosition) == "left" && unref(_align) == "right" ? "ml-12 pb-24" : "",
              unref(_dotPosition) == "right" && unref(_align) == "left" ? "pr-12 mt-24" : "",
              unref(_dotPosition) == "right" && unref(_align) == "right" ? "pr-12 pb-24" : "",
              unref(_dotPosition) == "bottom" && unref(_align) == "left" ? "ml-12 mb-24" : "",
              unref(_dotPosition) == "bottom" && unref(_align) == "right" ? "pr-12 mb-24" : "",
              unref(_dotPosition) == "top" && unref(_align) == "left" ? "ml-12 " : "",
              unref(_dotPosition) == "top" && unref(_align) == "right" ? "pr-12 " : ""
            ]]),
            style: normalizeStyle([
              unref(_dotPosition) == "bottom" ? { left: "0px", bottom: "0px", width: `${props.width}rpx`, height: `${60}rpx` } : "",
              unref(_dotPosition) == "top" ? { left: "0px", top: "0px", width: `${props.width}rpx`, height: `${60}rpx` } : "",
              unref(_dotPosition) == "left" ? { left: "0px", top: "0px", width: `${60}rpx`, height: `${props.height}rpx` } : "",
              unref(_dotPosition) == "right" ? { right: "0px", top: "0px", width: `${60}rpx`, height: `${props.height}rpx` } : ""
            ])
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(_list), (item, index) => {
              return openBlock(), createBlock(tmSheet, {
                margin: [10, 10],
                "follow-theme": _currentActive.value == index ? props.followTheme : false,
                padding: [0, 0],
                round: 10,
                onClick: ($event) => dotClick(index),
                color: _currentActive.value == index ? props.color : "white",
                key: index,
                width: 18,
                height: 18
              }, null, 8, ["follow-theme", "onClick", "color"]);
            }), 128))
          ], 6)) : createCommentVNode("v-if", true),
          createCommentVNode(" rect "),
          unref(_model) == "rect" && props.indicatorDots ? (openBlock(), createElementBlock("view", {
            key: 1,
            class: normalizeClass(["absolute", [
              unref(_dotPosition) == "bottom" || unref(_dotPosition) == "top" ? "flex flex-row " : "",
              unref(_dotPosition) == "left" || unref(_dotPosition) == "right" ? "flex flex-col " : "",
              unref(_align) == "center" ? "flex-center" : "",
              unref(_align) == "left" ? "flex-row-center-start " : "",
              unref(_align) == "right" ? "flex-row-center-end " : "",
              unref(_dotPosition) == "left" && unref(_align) == "left" ? "ml-12 mt-24" : "",
              unref(_dotPosition) == "left" && unref(_align) == "right" ? "ml-12 pb-24" : "",
              unref(_dotPosition) == "right" && unref(_align) == "left" ? "pr-12 mt-24" : "",
              unref(_dotPosition) == "right" && unref(_align) == "right" ? "pr-12 pb-24" : "",
              unref(_dotPosition) == "bottom" && unref(_align) == "left" ? "ml-12 mb-24" : "",
              unref(_dotPosition) == "bottom" && unref(_align) == "right" ? "pr-12 mb-24" : "",
              unref(_dotPosition) == "top" && unref(_align) == "left" ? "ml-12 " : "",
              unref(_dotPosition) == "top" && unref(_align) == "right" ? "pr-12 " : ""
            ]]),
            style: normalizeStyle([
              unref(_dotPosition) == "bottom" ? { left: "0px", bottom: "0px", width: `${props.width}rpx`, height: `${60}rpx` } : "",
              unref(_dotPosition) == "top" ? { left: "0px", top: "0px", width: `${props.width}rpx`, height: `${60}rpx` } : "",
              unref(_dotPosition) == "left" ? { left: "0px", top: "0px", width: `${60}rpx`, height: `${props.height}rpx` } : "",
              unref(_dotPosition) == "right" ? { right: "0px", top: "0px", width: `${60}rpx`, height: `${props.height}rpx` } : ""
            ])
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(_list), (item, index) => {
              return openBlock(), createBlock(tmSheet, {
                round: index == 0 || index == unref(_list).length - 1 ? 10 : 0,
                margin: unref(_dotPosition) == "left" || unref(_dotPosition) == "right" ? [10, 0] : [0, 10],
                padding: [0, 0],
                onClick: ($event) => dotClick(index),
                "follow-theme": _currentActive.value == index ? props.followTheme : false,
                color: _currentActive.value == index ? props.color : "white",
                key: index,
                width: unref(_dotPosition) == "left" || unref(_dotPosition) == "right" ? 6 : 36,
                height: unref(_dotPosition) == "left" || unref(_dotPosition) == "right" ? 36 : 6
              }, null, 8, ["round", "margin", "onClick", "follow-theme", "color", "width", "height"]);
            }), 128))
          ], 6)) : createCommentVNode("v-if", true),
          createCommentVNode(" number "),
          unref(_model) == "number" && props.indicatorDots ? (openBlock(), createElementBlock("view", {
            key: 2,
            class: normalizeClass(["absolute", [
              unref(_dotPosition) == "bottom" || unref(_dotPosition) == "top" ? "flex flex-row " : "",
              unref(_dotPosition) == "left" || unref(_dotPosition) == "right" ? "flex flex-col " : "",
              unref(_align) == "center" ? "flex-center" : "",
              unref(_align) == "left" ? "flex-row-center-start " : "",
              unref(_align) == "right" ? "flex-row-center-end " : "",
              unref(_dotPosition) == "left" && unref(_align) == "left" ? "ml-12 mt-24" : "",
              unref(_dotPosition) == "left" && unref(_align) == "right" ? "ml-12 pb-24" : "",
              unref(_dotPosition) == "right" && unref(_align) == "left" ? "pr-12 mt-24" : "",
              unref(_dotPosition) == "right" && unref(_align) == "right" ? "pr-12 pb-24" : "",
              unref(_dotPosition) == "bottom" && unref(_align) == "left" ? "ml-12 mb-24" : "",
              unref(_dotPosition) == "bottom" && unref(_align) == "right" ? "pr-12 mb-24" : "",
              unref(_dotPosition) == "top" && unref(_align) == "left" ? "ml-12 " : "",
              unref(_dotPosition) == "top" && unref(_align) == "right" ? "pr-12 " : ""
            ]]),
            style: normalizeStyle([
              unref(_dotPosition) == "bottom" ? { left: "0px", bottom: "0px", width: `${props.width}rpx`, height: `${60}rpx` } : "",
              unref(_dotPosition) == "top" ? { left: "0px", top: "0px", width: `${props.width}rpx`, height: `${60}rpx` } : "",
              unref(_dotPosition) == "left" ? { left: "0px", top: "0px", width: `${60}rpx`, height: `${props.height}rpx` } : "",
              unref(_dotPosition) == "right" ? { right: "0px", top: "0px", width: `${60}rpx`, height: `${props.height}rpx` } : ""
            ])
          }, [
            createElementVNode("view", {
              class: normalizeClass(["round-10", [
                unref(_dotPosition) == "left" || unref(_dotPosition) == "right" ? "px-5 py-24 " : "",
                unref(_dotPosition) == "bottom" || unref(_dotPosition) == "top" ? "px-24 py-5 " : ""
              ]]),
              style: { "background-color": "rgba(0, 0, 0, 0.4)" }
            }, [
              createElementVNode("u-text", { style: { "font-size": "22rpx", "color": "white" } }, toDisplayString(_currentActive.value + 1) + "/" + toDisplayString(unref(_list).length), 1)
            ], 2)
          ], 6)) : createCommentVNode("v-if", true)
        ], 6)
      ]);
    };
  }
});
var tmCarousel = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-carousel/tm-carousel.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "carousel",
  setup(__props) {
    const listimg = [
      "https://picsum.photos/200/300?id=43335",
      "https://picsum.photos/200/300?id=433",
      "https://picsum.photos/200/300?id=439",
      "https://picsum.photos/200/300?id=459"
    ];
    const listvedio = [
      "https://picsum.photos/200/300?id=43335",
      {
        url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        img: "https://picsum.photos/200/300?id=43335",
        type: "video"
      },
      "https://picsum.photos/200/300?id=433"
    ];
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
                  label: "\u66F4\u591A\u6307\u793A\u70B9\u4F4D\u7F6E\uFF0C\u5C5E\u6027\u7B49\u8BF7\u770B\u6587\u6863"
                })
              ]),
              _: 1
            }),
            createVNode(tmCarousel, {
              autoplay: "",
              margin: [0, 16],
              round: 3,
              width: 686,
              height: 300,
              list: listimg
            }),
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: "\u6307\u793A\u70B9\u5BF9\u9F50"
                })
              ]),
              _: 1
            }),
            createVNode(tmCarousel, {
              autoplay: "",
              margin: [0, 16],
              align: "right",
              round: 3,
              width: 686,
              height: 300,
              list: listimg
            }),
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: "\u6307\u793A\u4F4D\u7F6E\uFF0C\u5305\u542B\u89C6\u9891\u64AD\u653E"
                })
              ]),
              _: 1
            }),
            createVNode(tmCarousel, {
              autoplay: "",
              margin: [0, 16],
              dotPosition: "right",
              vertical: "",
              model: "rect",
              round: 3,
              width: 686,
              height: 300,
              list: listvedio
            })
          ]),
          _: 1
        })
      ]);
    };
  }
});
var carousel = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/showdata/carousel.nvue"]]);
export { carousel as default };
