import { defineComponent, getCurrentInstance, computed, onUnmounted, openBlock, createElementBlock, normalizeStyle, unref, createBlock, withCtx, createVNode, createCommentVNode, renderSlot, ref, onMounted, nextTick, normalizeClass, createElementVNode, Fragment, renderList } from "vue";
import { _ as _export_sfc, a as tmText, r as requireNativePlugin, t as tmApp } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import "pinia";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "tm-indexes-item",
  props: {
    margin: {
      type: Array,
      default: () => [0, 0]
    },
    padding: {
      type: Array,
      default: () => [32, 0]
    },
    height: {
      type: Number,
      default: 100
    },
    title: {
      type: [String, Number],
      default: ""
    }
  },
  emits: ["click", "title-click"],
  setup(__props, { emit: emits }) {
    var _a, _b, _c;
    const props = __props;
    const proxy = (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const _title = computed(() => props.title);
    const _titleHeight = 50;
    const readId = uni.$tm.u.getUid(1);
    const _height = computed(() => {
      if (_title.value === "")
        return props.height;
      return _titleHeight;
    });
    let parent = proxy.$parent;
    while (parent) {
      if ((parent == null ? void 0 : parent.compentNameId) == "tmIndexesId" || !parent) {
        break;
      } else {
        parent = (_c = parent == null ? void 0 : parent.$parent) != null ? _c : void 0;
      }
    }
    if (parent) {
      parent.pushKey(_height.value, readId, _title.value);
    }
    onUnmounted(() => parent.delKey(_height.value, readId));
    function itemClick() {
      emits("click");
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        style: normalizeStyle([{ height: unref(_height) + "rpx" }]),
        renderWhole: true
      }, [
        unref(_title) !== "" ? (openBlock(), createBlock(tmSheet, {
          key: 0,
          "no-level": "",
          onClick: _cache[0] || (_cache[0] = ($event) => emits("title-click")),
          color: "grey-3",
          height: _titleHeight,
          _class: "flex flex-col flex-col-center-start",
          margin: [props.margin[0], 0],
          padding: [props.padding[0], 0]
        }, {
          default: withCtx(() => [
            createVNode(tmText, {
              userInteractionEnabled: false,
              "font-size": 24,
              _class: "text-weight-b opacity-6",
              label: unref(_title)
            }, null, 8, ["label"])
          ]),
          _: 1
        }, 8, ["margin", "padding"])) : createCommentVNode("v-if", true),
        createVNode(tmSheet, {
          onClick: itemClick,
          color: "white",
          border: 1,
          borderDirection: "bottom",
          height: unref(_height),
          margin: props.margin,
          padding: props.padding
        }, {
          default: withCtx(() => [
            unref(_title) === "" ? (openBlock(), createElementBlock("view", {
              key: 0,
              userInteractionEnabled: false,
              hoverClass: "opacity-5",
              class: "flex-1 flex flex-col flex-col-center-start"
            }, [
              renderSlot(_ctx.$slots, "default")
            ])) : createCommentVNode("v-if", true)
          ]),
          _: 3
        }, 8, ["height", "margin", "padding"])
      ], 4);
    };
  }
});
var tmIndexesItem = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-indexes-item/tm-indexes-item.vue"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "tm-indexes",
  props: {
    followTheme: {
      type: Boolean,
      default: true
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 700
    },
    margin: {
      type: Array,
      default: () => [0, 0]
    },
    padding: {
      type: Array,
      default: () => [0, 0]
    },
    color: {
      type: String,
      default: "primary"
    }
  },
  emits: ["nav-click"],
  setup(__props, { expose, emit: emits }) {
    var _a, _b;
    const props = __props;
    const dom = requireNativePlugin("dom");
    const proxy = (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const _margin = computed(() => props.margin);
    const _padding = computed(() => props.padding);
    const _height = computed(() => props.height);
    const _width = computed(() => props.width);
    const _cureent_id = ref(0);
    const _cureent_item = ref(null);
    const _isNvue = ref(false);
    const _showCenterTitle = ref(false);
    let _timeid = uni.$tm.u.getUid(1);
    ref(false);
    const parentLeft = ref(0);
    _isNvue.value = true;
    const _cacheHeightArrays = ref([]);
    const _cureent_top = ref(0);
    const compentNameId = "tmIndexesId";
    const navright = computed(() => {
      return _cacheHeightArrays.value.filter((el) => el.text !== "");
    });
    function pushKey(height, id, text) {
      _cacheHeightArrays.value.push({
        height,
        id,
        text
      });
    }
    function delKey(height, id) {
      let index = _cacheHeightArrays.value.findIndex((el) => el.id == id);
      if (index > -1) {
        _cacheHeightArrays.value.splice(index, 1);
      }
    }
    function scrollChnage(e) {
      uni.$tm.u.debounce(function() {
        let nowitem = getPosItem(e.detail.scrollTop);
        if (nowitem) {
          _cureent_id.value = nowitem.id;
          _cureent_item.value = nowitem;
        }
      }, 200);
    }
    onMounted(() => nvuegetClientRect());
    function nvuegetClientRect() {
      nextTick(function() {
        dom.getComponentRect(proxy.$refs.tmIndexes, function(res) {
          if (res == null ? void 0 : res.size) {
            if (res.size.width > 0) {
              parentLeft.value = (res.size.width - uni.upx2px(70)) / 2;
            }
            if (res.size.height == 0) {
              nvuegetClientRect();
            }
          }
        });
      });
    }
    function getPosItem(top) {
      let avl = [];
      let nowitem = null;
      navright.value.forEach((el2) => {
        let index = _cacheHeightArrays.value.findIndex((el) => el.id == el2.id);
        if (index > -1) {
          let ar = _cacheHeightArrays.value.slice(0, index);
          let atm = { top: 0, item: el2 };
          ar.forEach((el3) => atm.top += el3.height);
          atm.top = uni.upx2px(atm.top - 50);
          avl.push(atm);
        }
      });
      let pavl = [...avl];
      let lastitem = pavl[pavl.length - 1];
      if (top >= lastitem.top) {
        return lastitem.item;
      }
      avl.reverse();
      for (let i = 0; i < avl.length; i++) {
        let item = avl[i + 1];
        if (top >= item.top) {
          nowitem = item.item;
          break;
        }
      }
      return nowitem;
    }
    function navClick(item) {
      let index = _cacheHeightArrays.value.findIndex((el) => el.id == item.id);
      let ar = _cacheHeightArrays.value.slice(0, index);
      if (index == -1 || _cureent_id.value == item.id)
        return;
      _cureent_id.value = item.id;
      _cureent_item.value = item;
      _cureent_top.value = 0;
      _showCenterTitle.value = true;
      clearTimeout(_timeid);
      _timeid = setTimeout(function() {
        _showCenterTitle.value = false;
      }, 800);
      nextTick(() => {
        let total = 0;
        ar.forEach((el) => total += el.height);
        _cureent_top.value = uni.upx2px(total);
        emits("nav-click", item);
      });
    }
    expose({
      compentNameId,
      pushKey,
      delKey
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        ref: "tmIndexes",
        class: normalizeClass(["overflow relative", `mx-${unref(_margin)[0]} my-${unref(_padding)[1]} px-${unref(_margin)[0]} py-${unref(_padding)[1]}`]),
        style: normalizeStyle([{ height: `${unref(_height)}rpx` }]),
        renderWhole: true
      }, [
        createElementVNode("scroll-view", {
          offsetAccuracy: 5,
          onScroll: scrollChnage,
          scrollWithAnimation: true,
          scrollTop: _cureent_top.value,
          scrollY: true,
          style: normalizeStyle([
            unref(_width) ? { width: unref(_width) + "rpx" } : "",
            unref(_height) ? { height: unref(_height) + "rpx" } : ""
          ])
        }, [
          renderSlot(_ctx.$slots, "default")
        ], 44, ["scrollTop"]),
        createElementVNode("view", {
          class: "absolute flex flex-col flex-center t-0 r-24",
          style: normalizeStyle([{ height: `${unref(_height)}rpx`, width: "60rpx" }])
        }, [
          createVNode(tmSheet, {
            "no-level": "",
            round: 10,
            color: "white",
            shadow: 2,
            margin: [0, 0],
            padding: [0, 0],
            width: 40
          }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(navright), (item, index) => {
                return openBlock(), createElementBlock("view", {
                  onClick: ($event) => navClick(item),
                  hoverClass: "opacity-5",
                  class: "flex-center flex",
                  key: index,
                  style: { "width": "40rpx", "height": "40rpx" }
                }, [
                  createVNode(tmText, {
                    onClick: ($event) => navClick(item),
                    followTheme: _cureent_id.value == item.id ? props.followTheme : false,
                    color: _cureent_id.value == item.id ? props.color : "",
                    "font-size": 20,
                    label: item.text
                  }, null, 8, ["onClick", "followTheme", "color", "label"])
                ], 8, ["onClick"]);
              }), 128))
            ]),
            _: 1
          })
        ], 4),
        _showCenterTitle.value ? (openBlock(), createElementBlock("view", {
          key: 0,
          class: "absolute l-0 t-0 fulled",
          style: normalizeStyle([
            {
              top: (unref(_height) - 70) / 2 + "rpx"
            },
            _isNvue.value ? { left: parentLeft.value + "px" } : { left: "calc(50% - 70rpx)" }
          ])
        }, [
          _cureent_item.value != null ? (openBlock(), createBlock(tmSheet, {
            key: 0,
            _class: "flex flex-center",
            shadow: 5,
            margin: [24, 24],
            padding: [0, 0],
            width: 100,
            height: 100,
            round: 20
          }, {
            default: withCtx(() => [
              createVNode(tmText, {
                followTheme: props.followTheme,
                color: props.color,
                "font-size": 36,
                label: _cureent_item.value.text
              }, null, 8, ["followTheme", "color", "label"])
            ]),
            _: 1
          })) : createCommentVNode("v-if", true)
        ], 4)) : createCommentVNode("v-if", true)
      ], 6);
    };
  }
});
var tmIndexes = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-indexes/tm-indexes.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "indexes",
  setup(__props) {
    const imglist = ref([]);
    for (let i = 0; i < 1900; i++) {
      imglist.value.push("https://picsum.photos/636/150?id=" + i);
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
                })
              ]),
              _: 1
            }),
            createVNode(tmIndexes, null, {
              default: withCtx(() => [
                (openBlock(), createElementBlock(Fragment, null, renderList(60, (item, index) => {
                  return createVNode(tmIndexesItem, {
                    title: index % 10 == 0 ? index : "",
                    key: index
                  }, {
                    default: withCtx(() => [
                      createVNode(tmText, {
                        label: "\u60F3\u8981\u4EC0\u4E48\u7684.-" + index
                      }, null, 8, ["label"])
                    ]),
                    _: 2
                  }, 1032, ["title"]);
                }), 64))
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
var indexes = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/showdata/indexes.nvue"]]);
export { indexes as default };
