import { _ as _export_sfc, a as tmText, g as formatAppLog } from "./tm-text.js";
import { defineComponent, getCurrentInstance, inject, computed, ref, watchEffect, openBlock, createElementBlock, withModifiers, normalizeClass, unref, createElementVNode, createVNode, createBlock, createCommentVNode, Fragment, normalizeStyle, renderList, provide, watch, withCtx, renderSlot, isProxy, toRaw, nextTick } from "vue";
import { t as tmIcon } from "./tm-icon.js";
import { t as tmDivider } from "./tm-divider.js";
import { t as tmSheet } from "./tm-sheet.js";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "node-cell",
  props: {
    followTheme: {
      type: [Boolean, String],
      default: true
    },
    data: {
      type: Object,
      default: () => {
      },
      required: true
    },
    color: {
      type: String,
      default: "primary"
    },
    level: {
      type: Number,
      default: 0
    }
  },
  emits: ["click"],
  setup(__props, { emit: emits }) {
    var _a, _b, _c;
    const props = __props;
    const proxy = (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    let parent = proxy == null ? void 0 : proxy.$parent;
    while (parent) {
      if ((parent == null ? void 0 : parent.tmCascaderName) == "tmCascader" || !parent) {
        break;
      } else {
        parent = (_c = parent == null ? void 0 : parent.$parent) != null ? _c : null;
      }
    }
    const ParentActivedLs = inject("tmCascaderValue", computed(() => []));
    const _value = computed(() => props.data);
    const _activeId = ref("");
    function queryNode() {
      let xd = ParentActivedLs.value.filter((el) => el == _value.value.id);
      _activeId.value = xd.length > 0 ? xd[0] : "";
    }
    watchEffect(() => queryNode());
    const isSelected = computed(() => _activeId.value == _value.value.id);
    function nodeClick() {
      var _a2, _b2, _c2;
      if (_value.value["disabled"])
        return;
      if (typeof ((_a2 = _value.value) == null ? void 0 : _a2.children) === "object" && Array.isArray((_b2 = _value.value) == null ? void 0 : _b2.children) && ((_c2 = _value.value) == null ? void 0 : _c2.children.length) > 0) {
        parent == null ? void 0 : parent.addActiveIndex(props.level + 1);
      } else {
        parent == null ? void 0 : parent.endSelected();
      }
      parent == null ? void 0 : parent.pushValue(_value.value, props.level, _value.value.id);
      emits("click");
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        onClick: withModifiers(nodeClick, ["stop"]),
        class: normalizeClass(["flex px-24", [unref(_value)["disabled"] ? "opacity-5" : ""]]),
        renderWhole: true
      }, [
        createElementVNode("view", {
          userInteractionEnabled: false,
          class: "flex flex-row flex-between"
        }, [
          createVNode(tmText, {
            followTheme: unref(isSelected) ? props.followTheme : false,
            color: unref(isSelected) ? props.color : "",
            label: unref(_value).text
          }, null, 8, ["followTheme", "color", "label"]),
          createElementVNode("view", {
            fontSize: 30,
            class: "flex flex-row flex-row-center-end"
          }, [
            unref(isSelected) ? (openBlock(), createBlock(tmIcon, {
              key: 0,
              followTheme: unref(isSelected) ? props.followTheme : false,
              "font-size": 28,
              color: unref(isSelected) ? props.color : "",
              name: "tmicon-check"
            }, null, 8, ["followTheme", "color"])) : createCommentVNode("v-if", true),
            !unref(isSelected) && unref(_value)["children"] ? (openBlock(), createBlock(tmIcon, {
              key: 1,
              "font-size": 22,
              name: "tmicon-angle-right",
              color: "grey-1"
            })) : createCommentVNode("v-if", true)
          ])
        ]),
        createVNode(tmDivider)
      ], 10, ["onClick"]);
    };
  }
});
var nodeCellVue = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-cascader/node-cell.vue"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "base-cascader",
  props: {
    followTheme: {
      type: [Boolean, String],
      default: true
    },
    data: {
      type: Array,
      default: () => [],
      required: true
    },
    height: {
      type: Number,
      default: 0,
      required: true
    },
    color: {
      type: String,
      default: "primary"
    },
    level: {
      type: Number,
      default: 0
    }
  },
  setup(__props) {
    const props = __props;
    const _value = computed(() => props.data);
    const _level = props.level + 1;
    const tmCascaderShowIndex = inject("tmCascaderShowIndex", computed(() => 0));
    const ParentActivedLs = inject("tmCascaderValue", computed(() => []));
    const nextChildData = ref([]);
    watchEffect(() => {
      var _a, _b, _c, _d;
      if (ParentActivedLs.value[props.level]) {
        let nowobj = _value.value.filter((el) => el.id == ParentActivedLs.value[props.level]);
        if (nowobj.length > 0) {
          if (typeof ((_a = nowobj[0]) == null ? void 0 : _a.children) == "object" && Array.isArray((_b = nowobj[0]) == null ? void 0 : _b.children) && ((_c = nowobj[0]) == null ? void 0 : _c.children.length) > 0) {
            nextChildData.value = (_d = nowobj[0]) == null ? void 0 : _d.children;
          }
        }
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createCommentVNode(' v-if="tmCascaderShowIndex==_level" '),
        createElementVNode("view", { class: "flex" }, [
          unref(tmCascaderShowIndex) == props.level ? (openBlock(), createElementBlock("scroll-view", {
            key: 0,
            style: normalizeStyle([{ height: `${props.height}rpx` }]),
            scrollY: ""
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(_value), (item, index) => {
              return openBlock(), createElementBlock("view", { key: index }, [
                createVNode(nodeCellVue, {
                  followTheme: props.followTheme,
                  level: props.level,
                  data: item
                }, null, 8, ["followTheme", "level", "data"])
              ]);
            }), 128))
          ], 4)) : createCommentVNode("v-if", true),
          nextChildData.value.length > 0 ? (openBlock(), createBlock(BaseCascader, {
            key: 1,
            followTheme: props.followTheme,
            level: _level,
            height: props.height,
            color: props.color,
            data: nextChildData.value
          }, null, 8, ["followTheme", "height", "color", "data"])) : createCommentVNode("v-if", true)
        ])
      ], 2112);
    };
  }
});
var BaseCascader = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-cascader/base-cascader.vue"]]);
const getNodeRouterData = function(list, id = "", prentId = [], idmap = "id") {
  if (typeof prentId == "undefined") {
    prentId = [];
  }
  if (!Array.isArray(id)) {
    id = [id];
  }
  let arr = Array.from(prentId);
  for (let i = 0, len = list.length; i < len; i++) {
    arr.push(list[i]);
    if (list[i].id === id[0]) {
      return arr;
    }
    let children = list[i].children;
    if (children && children.length) {
      let result = getNodeRouter(children, id, arr, idmap = "id");
      if (result)
        return result;
    }
    arr.pop();
  }
  return null;
};
const getNodeRouter = function(list = [], id = "", prentId = [], idmap = "id") {
  if (typeof prentId == "undefined") {
    prentId = [];
  }
  if (!Array.isArray(id)) {
    id = [id];
  }
  let arr = Array.from(prentId);
  for (let i = 0, len = list.length; i < len; i++) {
    arr.push(list[i][idmap]);
    if (list[i].id === id[0]) {
      return arr;
    }
    let children = list[i].children;
    if (children && children.length) {
      let result = getNodeRouter(children, id, arr, idmap = "id");
      if (result)
        return result;
    }
    arr.pop();
  }
  return "";
};
const queryNodeIsParent = function(arr = [], id = "", idmap = "id") {
  let res = null;
  for (let i = 0, len = arr.length; i < len; i++) {
    let item = arr[i];
    if (item[idmap] == id && item.children) {
      res = item;
      break;
    } else if (item.children) {
      let rulst = queryNodeIsParent(item.children, id, idmap = "id");
      if (rulst) {
        res = rulst;
      }
    }
  }
  return res;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tm-cascader",
  props: {
    followTheme: {
      type: [Boolean, String],
      default: true
    },
    data: {
      type: Array,
      default: () => [],
      required: true
    },
    defaultValue: {
      type: Array,
      default: () => []
    },
    modelValue: {
      type: Array,
      default: () => []
    },
    height: {
      type: Number,
      default: 650
    },
    activeColor: {
      type: String,
      default: "primary"
    },
    color: {
      type: String,
      default: "white"
    },
    beforeTabClick: {
      type: [Function, Boolean],
      default: () => {
        return false;
      }
    },
    beforeCellClick: {
      type: [Function, Boolean],
      default: () => {
        return false;
      }
    },
    slotTabHeigth: {
      type: Number,
      default: 0
    }
  },
  emits: ["update:modelValue", "tab-click", "cell-click", "change"],
  setup(__props, { expose, emit: emits }) {
    const props = __props;
    let listData = ref(props.data);
    const tmCascaderName = "tmCascader";
    let save_value_obj = ref([]);
    const _value = ref("");
    const _idArrays = ref([]);
    const _activeIndex = ref(0);
    const _nowLevel = ref(0);
    function initNode(once = false) {
      let moisref = isProxy(props.modelValue) ? toRaw(props.modelValue) : props.modelValue;
      if (once) {
        moisref = isProxy(props.defaultValue) ? toRaw(props.defaultValue) : props.defaultValue;
      }
      let ls_ids = Array.isArray(moisref) ? moisref : [];
      _value.value = ls_ids.length == 0 ? "" : ls_ids[ls_ids.length - 1];
      if (_value.value == "" || typeof _value.value == "undefined")
        return;
      let isParent = queryNodeIsParent(toRaw(props.data), String(_value.value), "id");
      if (isParent)
        return;
      _idArrays.value = moisref;
      _activeIndex.value = _idArrays.value.length ? _idArrays.value.length - 1 : 0;
      _nowLevel.value = _activeIndex.value;
    }
    initNode(true);
    provide("tmCascaderValue", computed(() => _idArrays.value));
    provide("tmCascaderShowIndex", computed(() => _activeIndex.value));
    function pushValue(key, level, id) {
      if (_idArrays.value.length < level) {
        _idArrays.value.push(id);
      } else {
        _idArrays.value[level] = id;
        nextTick(() => _idArrays.value = _idArrays.value.slice(0, level + 1));
      }
    }
    async function addActiveIndex(level) {
      if (typeof props.beforeCellClick === "function") {
        uni.showLoading({ title: "..." });
        let p = await props.beforeCellClick();
        if (typeof p === "function") {
          p = await props.beforeCellClick();
        }
        uni.hideLoading();
        if (!p)
          return;
      }
      _activeIndex.value = level;
      _nowLevel.value = level;
    }
    function endSelected() {
      emits("update:modelValue", _idArrays.value);
      emits("change", _idArrays.value);
    }
    watch(() => props.modelValue, () => {
      if (props.modelValue.length == 0) {
        _value.value = "";
        save_value_obj.value = [];
        _idArrays.value = [];
        _activeIndex.value = 0;
        _nowLevel.value = 0;
        return;
      }
      initNode();
    }, { deep: true });
    watch(() => props.data, () => {
      save_value_obj.value = [];
      _activeIndex.value = 0;
      _nowLevel.value = 0;
      _idArrays.value = [];
    }, { deep: true });
    function getValueObject() {
      let [lastId] = _idArrays.value.reverse();
      let moisref = isProxy(props.data) ? toRaw(props.data) : props.data;
      let ar = getNodeRouterData(moisref, String(lastId), [], "id");
      return ar;
    }
    function getValueStr() {
      let ar = getValueObject();
      let str = ar.map((el) => el.text);
      return str;
    }
    async function tabClick(index) {
      if (typeof props.beforeTabClick === "function") {
        uni.showLoading({ title: "..." });
        let p = await props.beforeTabClick();
        if (typeof p === "function") {
          p = await p();
        }
        uni.hideLoading();
        if (!p)
          return;
      }
      _activeIndex.value = index;
      emits("tab-click", index);
    }
    function reFresh(data = []) {
      listData.value = [];
      if (!Array.isArray(data)) {
        formatAppLog("error", "at tmui/components/tm-cascader/tm-cascader.vue:233", "\u9700\u8981\u63D0\u4F9B\u6570\u7EC4\u683C\u5F0F");
        return;
      }
      listData.value = data.length > 0 ? data : props.data;
    }
    expose({ pushValue, addActiveIndex, tmCascaderName, getValueStr, getValueObject, endSelected, reFresh });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(tmSheet, {
        color: props.color,
        class: "flex flex-col",
        height: props.height,
        padding: [0, 0]
      }, {
        default: withCtx(() => [
          createVNode(tmSheet, {
            color: props.color,
            text: "",
            round: 3,
            border: 0,
            _class: "flex flex-row overflow",
            height: 68,
            margin: [0, 0],
            padding: [24, 0]
          }, {
            default: withCtx(() => [
              createElementVNode("view", {
                style: { "height": "68rpx" },
                class: "flex flex-row flex-row-center-start"
              }, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(_idArrays.value, (item, index) => {
                  return openBlock(), createElementBlock("view", {
                    key: index,
                    class: "flex flex-row flex-row-center-start"
                  }, [
                    createElementVNode("view", null, [
                      createVNode(tmText, {
                        followTheme: _activeIndex.value == index ? props.followTheme : false,
                        fontSize: 28,
                        _class: "text-overflow-1",
                        color: _activeIndex.value == index ? props.activeColor : "",
                        label: item,
                        onClick: ($event) => tabClick(index)
                      }, null, 8, ["followTheme", "color", "label", "onClick"])
                    ]),
                    index < _idArrays.value.length - 1 ? (openBlock(), createElementBlock("view", {
                      key: 0,
                      class: "mx-10"
                    }, [
                      createVNode(tmText, {
                        followTheme: props.followTheme,
                        label: "/",
                        fontSize: 24,
                        color: props.activeColor
                      }, null, 8, ["followTheme", "color"])
                    ])) : createCommentVNode("v-if", true)
                  ]);
                }), 128)),
                _nowLevel.value == _idArrays.value.length ? (openBlock(), createBlock(tmText, {
                  key: 0,
                  followTheme: _activeIndex.value == _nowLevel.value ? props.followTheme : false,
                  color: _activeIndex.value == _nowLevel.value ? props.activeColor : "",
                  fontSize: 28,
                  _class: "ml-10",
                  label: ">\u8BF7\u9009\u62E9",
                  onClick: _cache[0] || (_cache[0] = ($event) => tabClick(_nowLevel.value))
                }, null, 8, ["followTheme", "color"])) : createCommentVNode("v-if", true)
              ])
            ]),
            _: 1
          }, 8, ["color"]),
          createElementVNode("view", { style: { "height": "16rpx" } }),
          __props.slotTabHeigth ? (openBlock(), createElementBlock("view", {
            key: 0,
            class: "flex flex-row flex-row-center-start"
          }, [
            renderSlot(_ctx.$slots, "default")
          ])) : createCommentVNode("v-if", true),
          createElementVNode("view", { style: { "height": "16rpx" } }),
          createVNode(BaseCascader, {
            followTheme: props.followTheme,
            color: props.activeColor,
            height: props.height - 120 - __props.slotTabHeigth,
            data: unref(listData)
          }, null, 8, ["followTheme", "color", "height", "data"])
        ]),
        _: 3
      }, 8, ["color", "height"]);
    };
  }
});
var tmCascader = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-cascader/tm-cascader.vue"]]);
export { tmCascader as t };
