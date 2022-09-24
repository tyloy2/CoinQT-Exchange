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
import { defineComponent, getCurrentInstance, computed, inject, ref, onMounted, onBeforeUnmount, watch, nextTick, openBlock, createElementBlock, normalizeStyle, unref, createVNode, withCtx, createElementVNode, renderSlot, provide, createBlock } from "vue";
import { t as tmSheet } from "./tm-sheet.js";
import { t as tmBadge } from "./tm-badge.js";
import { _ as _export_sfc, c as custom_props, u as useTmpiniaStore, e as computedDark, f as computedTheme } from "./tm-text.js";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
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
var tmGridItem = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-grid-item/tm-grid-item.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
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
var tmGrid = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-grid/tm-grid.vue"]]);
export { tmGridItem as a, tmGrid as t };
