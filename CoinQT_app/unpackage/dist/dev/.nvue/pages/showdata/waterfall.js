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
import { defineComponent, computed, ref, provide, openBlock, createElementBlock, createElementVNode, normalizeStyle, unref, renderSlot, createCommentVNode, createBlock, withCtx, createVNode, getCurrentInstance, inject, onMounted, nextTick, toRaw, Fragment, renderList } from "vue";
import { _ as _export_sfc, r as requireNativePlugin, g as formatAppLog, t as tmApp, a as tmText } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmIcon } from "../../tm-icon.js";
import { t as tmImage } from "../../tm-image.js";
import { t as tmDivider } from "../../tm-divider.js";
import "pinia";
import "../../tm-translate.js";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "tm-waterfall",
  props: {
    width: {
      type: Number,
      default: 750
    },
    gutter: {
      type: Number,
      default: 12
    }
  },
  setup(__props, { expose }) {
    const props = __props;
    const _containerWidth = computed(() => props.width);
    const _itemRealWidth = computed(() => {
      return (_containerWidth.value - props.gutter) / 2;
    });
    const parentNameId = "tmWaterfallId";
    const _cacheList = ref([]);
    const _totalSort = ref([[], []]);
    const _list = ref([]);
    const _totalNum = ref([]);
    const _containerHeight = computed(() => {
      let lh = _totalSort.value[0].map((el) => el.height);
      let l_height = lh.length == 0 ? 0 : lh.reduce((a, b) => a + b);
      let rh = _totalSort.value[1].map((el) => el.height);
      let r_height = rh.length == 0 ? 0 : rh.reduce((a, b) => a + b);
      return { left: l_height, right: r_height, maxHeight: Math.max(r_height, l_height), minHeight: Math.min(r_height, l_height) };
    });
    provide("tmWaterFallItemRealWidth", computed(() => uni.upx2px(_itemRealWidth.value)));
    function sumTotal(id) {
      _totalNum.value.push(id);
    }
    async function pushKey(n) {
      let index = _cacheList.value.findIndex((el) => el.id == n.id);
      let item = n;
      if (index > -1) {
        _cacheList.value[index] = item;
        return item;
      } else {
        _cacheList.value.push(item);
        return countPushSort(item);
      }
    }
    function countPushSort(item) {
      var _a, _b;
      let dir = _containerHeight.value.left > _containerHeight.value.right ? 1 : 0;
      let bottom = (_b = (_a = _totalSort.value[dir][_totalSort.value[dir].length - 1]) == null ? void 0 : _a.bottom) != null ? _b : 0;
      item.top = bottom + uni.upx2px(props.gutter);
      item.bottom = item.top + item.height;
      item.left = dir == 0 ? 0 : uni.upx2px(_itemRealWidth.value) + uni.upx2px(props.gutter);
      let index = _list.value.findIndex((el) => el.id == item.id);
      _totalSort.value[dir].push(item);
      if (index > -1) {
        _list.value[index] = item;
      } else {
        _list.value.push(item);
      }
      return item;
    }
    expose({ parentNameId, pushKey, sumTotal });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", { renderWhole: true }, [
        createElementVNode("view", {
          class: "flex flex-col flex-col-top-start flex-between relative overflow",
          style: normalizeStyle([{ width: unref(_containerWidth) + "rpx", height: unref(_containerHeight).maxHeight + 50 + "px" }])
        }, [
          renderSlot(_ctx.$slots, "default")
        ], 4),
        createCommentVNode(" \u865A\u62DF\u52A0\u8F7D\u5360\u4F4D\u7B26\u3002 "),
        _totalNum.value.length != _list.value.length ? (openBlock(), createBlock(tmSheet, {
          key: 0,
          _class: "flex flex-center",
          margin: [0, 0],
          padding: [0, 0]
        }, {
          default: withCtx(() => [
            createVNode(tmIcon, {
              name: "tmicon-loading",
              spin: ""
            })
          ]),
          _: 1
        })) : createCommentVNode("v-if", true)
      ]);
    };
  }
});
var tmWaterfall = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-waterfall/tm-waterfall.vue"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "tm-waterfall-item",
  props: {
    img: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "white"
    },
    round: {
      type: Number,
      default: 4
    }
  },
  emits: ["img-click"],
  setup(__props, { emit: emits }) {
    var _a, _b;
    const props = __props;
    const dom = requireNativePlugin("dom");
    const proxy = (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const _width = inject("tmWaterFallItemRealWidth", computed(() => uni.upx2px(_width.value)));
    let _nodeInfo = ref({
      id: uni.$tm.u.getUid(2),
      width: _width.value,
      height: _width.value,
      imgWidth: _width.value,
      imgHeight: _width.value,
      bottom: 0,
      index: NaN,
      top: 0,
      left: 0
    });
    const isimgLoad = ref(props.img ? false : true);
    const _parentComs = getParent();
    const isPush = ref(false);
    if (!_parentComs) {
      formatAppLog("error", "at tmui/components/tm-waterfall-item/tm-waterfall-item.vue:64", "\u8BF7\u4E0D\u8981\u5355\u72EC\u4F7F\u7528\u6B64\u7EC4\u4EF6\uFF0C\u8BF7\u653E\u7F6E\u5728:tm-waterfall\u5185\uFF1B");
    }
    _parentComs.sumTotal(_nodeInfo.value.id);
    onMounted(() => {
      nextTick(() => {
        if (isimgLoad.value === true) {
          nvuegetClientRect();
        }
      });
    });
    function imgLoadSuccess(e) {
      const { width, height } = e.detail;
      let _w = _width.value;
      let _height = _w / (width / height);
      _nodeInfo.value = __spreadProps(__spreadValues({}, _nodeInfo.value), { imgWidth: _w, imgHeight: _height });
      setTimeout(() => {
        nextTick(() => nvuegetClientRect());
      }, 50);
    }
    function getParent() {
      var _a2;
      let parent = proxy.$parent;
      while (parent) {
        if ((parent == null ? void 0 : parent.parentNameId) == "tmWaterfallId" || !parent) {
          break;
        } else {
          parent = (_a2 = parent == null ? void 0 : parent.$parent) != null ? _a2 : void 0;
        }
      }
      return parent;
    }
    function nvuegetClientRect() {
      nextTick(function() {
        dom.getComponentRect(proxy.$refs.itemWall, function(res) {
          if (res == null ? void 0 : res.size) {
            if (res.size.height == 0 && res.size.width == 0) {
              nvuegetClientRect();
            } else {
              isimgLoad.value = true;
              const { width, height } = res.size;
              _nodeInfo.value = __spreadProps(__spreadValues({}, _nodeInfo.value), {
                height
              });
              if (isPush.value === false && isimgLoad.value) {
                pushKey();
                isPush.value = true;
              }
            }
          }
        });
      });
    }
    async function pushKey() {
      if (_parentComs) {
        let pos = await _parentComs.pushKey(toRaw(_nodeInfo.value));
        _nodeInfo.value = pos;
      }
    }
    function onImgClick(e) {
      emits("img-click", e);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        ref: "itemWall",
        class: "absolute itemWall",
        style: normalizeStyle([
          !isPush.value ? { transform: "translateX(-1000px)" } : "",
          isPush.value ? { transform: `translateX(${unref(_nodeInfo).left}px) translateY(${unref(_nodeInfo).top}px)` } : ""
        ]),
        renderWhole: true
      }, [
        createVNode(tmSheet, {
          margin: [0, 0],
          padding: [0, 0],
          round: props.round,
          width: unref(_width),
          unit: "px",
          color: props.color,
          _class: "flex flex-col flex-col-top-start"
        }, {
          default: withCtx(() => [
            props.img ? (openBlock(), createBlock(tmImage, {
              key: 0,
              onClick: onImgClick,
              round: props.round,
              onLoad: imgLoadSuccess,
              src: props.img,
              unit: "px",
              height: unref(_nodeInfo).imgHeight,
              width: unref(_nodeInfo).imgWidth
            }, null, 8, ["round", "src", "height", "width"])) : createCommentVNode("v-if", true),
            createElementVNode("view", { class: "flex flex-col flex-1 flex-col-top-start" }, [
              renderSlot(_ctx.$slots, "default")
            ])
          ]),
          _: 3
        }, 8, ["round", "width", "color"])
      ], 4);
    };
  }
});
var tmWaterfallItem = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-waterfall-item/tm-waterfall-item.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "waterfall",
  setup(__props) {
    const imglist = ref([]);
    for (let i = 0; i < 21; i++) {
      imglist.value.push({
        img: `https://picsum.photos/${Math.ceil(200 + Math.random() * 100)}/${Math.ceil(200 + Math.random() * 100)}?id=${i}`,
        text: "\u6587\u5B57_" + i
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
                  "font-size": 30,
                  _class: "font-weight-b",
                  label: "\u57FA\u7840\u793A\u4F8B,\u66F4\u591A\u89C1\u6587\u6863"
                }),
                createVNode(tmDivider),
                createElementVNode("view", { class: "flex flex-col flex-col-top-center" }, [
                  createVNode(tmWaterfall, { width: 626 }, {
                    default: withCtx(() => [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(imglist.value, (item, index) => {
                        return openBlock(), createBlock(tmWaterfallItem, {
                          img: item.img
                        }, {
                          default: withCtx(() => [
                            createElementVNode("view", { class: "py-24" }, [
                              createVNode(tmText, {
                                label: item.text
                              }, null, 8, ["label"])
                            ])
                          ]),
                          _: 2
                        }, 1032, ["img"]);
                      }), 256))
                    ]),
                    _: 1
                  })
                ])
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
var waterfall = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/showdata/waterfall.nvue"]]);
export { waterfall as default };
