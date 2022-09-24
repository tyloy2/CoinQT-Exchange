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
import { defineComponent, getCurrentInstance, inject, ref, computed, watchEffect, openBlock, createElementBlock, unref, createBlock, createCommentVNode, toRaw, watch, createVNode, createElementVNode, renderSlot, Fragment, renderList, withCtx, provide, readonly } from "vue";
import { _ as _export_sfc, a as tmText, g as formatAppLog, t as tmApp } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmIcon } from "../../tm-icon.js";
import { T as TmCheckbox } from "../../tm-checkbox.js";
import { t as tmDivider } from "../../tm-divider.js";
import "pinia";
import "../../tm-translate.js";
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "child-node",
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
    fieldNames: {
      type: Object,
      default: () => {
        return {
          id: "id",
          text: "text"
        };
      }
    }
  },
  setup(__props) {
    var _a, _b, _c;
    const props = __props;
    const { proxy } = getCurrentInstance();
    let parent = proxy.$parent;
    while (parent) {
      if ((parent == null ? void 0 : parent.TreeParaentName) == "tmTree" || !parent) {
        break;
      } else {
        parent = (_a = parent == null ? void 0 : parent.$parent) != null ? _a : void 0;
      }
    }
    const TreePareantSelectedIds = inject("TreePareantSelectedIds", ref([]));
    const color = (_b = parent == null ? void 0 : parent.$props.color) != null ? _b : "primary";
    const nodeData = computed(() => {
      var _a2, _b2;
      return {
        icon: (_a2 = props.data["icon"]) != null ? _a2 : "",
        color: props.data["color"] || color,
        disabled: (_b2 = props.data["disabled"]) != null ? _b2 : false,
        text: props.data[props.fieldNames.text],
        id: props.data[props.fieldNames.id]
      };
    });
    const showCheckbox = inject("TreeNodeCheckable", computed(() => true));
    const _checked = ref("");
    const _indeterminate = ref(false);
    const _multiple = (_c = parent.$props.multiple) != null ? _c : true;
    function setChecked() {
      let sletctedIdArray = TreePareantSelectedIds.value.filter((el) => el == nodeData.value.id);
      if (sletctedIdArray.length >= 0) {
        _checked.value = sletctedIdArray[0];
      } else {
        _checked.value = "";
      }
    }
    watchEffect(() => setChecked());
    function checkboxChange(e) {
      if (!_multiple && TreePareantSelectedIds.value.length >= 1) {
        parent == null ? void 0 : parent.checkAll(false);
      }
      if (e) {
        parent == null ? void 0 : parent.onSelected([nodeData.value.id]);
      } else {
        parent == null ? void 0 : parent.onUnSelected([nodeData.value.id]);
      }
      parent == null ? void 0 : parent.onCheck({ checked: e, data: toRaw(props.data) });
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        class: "flex flex-row flex-row-center-start",
        renderWhole: true
      }, [
        unref(showCheckbox) ? (openBlock(), createBlock(TmCheckbox, {
          key: 0,
          followTheme: props.followTheme,
          closeAni: "",
          color: unref(nodeData)["color"],
          indeterminate: _indeterminate.value,
          onChange: checkboxChange,
          disabled: unref(nodeData)["disabled"],
          modelValue: _checked.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _checked.value = $event),
          value: unref(nodeData)[props.fieldNames.id]
        }, null, 8, ["followTheme", "color", "indeterminate", "disabled", "modelValue", "value"])) : createCommentVNode("v-if", true)
      ]);
    };
  }
});
var childNode = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-tree/child-node.vue"]]);
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
  return null;
};
const treeFlat = function(arr = [], idmap = "id") {
  let res = [];
  arr.forEach((item) => {
    res.push(item[idmap]);
    if (item.children) {
      res.push(...treeFlat(item.children, idmap = "id"));
    }
  });
  return res;
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
const queryParentNode = function(arr = [], idmap = "id") {
  let res = [];
  for (let i = 0, len = arr.length; i < len; i++) {
    let item = arr[i];
    if (item.children) {
      res.push(item[idmap]);
      res.push(...queryParentNode(item.children));
    }
  }
  return res;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "parent-node",
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
    fieldNames: {
      type: Object,
      default: () => {
        return {
          id: "id",
          text: "text"
        };
      }
    }
  },
  setup(__props) {
    var _a, _b, _c;
    const props = __props;
    const { proxy } = getCurrentInstance();
    let parent = proxy.$parent;
    while (parent) {
      if ((parent == null ? void 0 : parent.TreeParaentName) == "tmTree" || !parent) {
        break;
      } else {
        parent = (_a = parent == null ? void 0 : parent.$parent) != null ? _a : void 0;
      }
    }
    const TreeParentIds = inject("TreeParentIds", ref([]));
    const TreePareantSelectedIds = inject("TreePareantSelectedIds", ref([]));
    const color = (_b = parent == null ? void 0 : parent.$props.color) != null ? _b : "primary";
    const nodeData = computed(() => {
      var _a2, _b2;
      return {
        icon: (_a2 = props.data["icon"]) != null ? _a2 : "",
        color: props.data["color"] || color,
        disabled: (_b2 = props.data["disabled"]) != null ? _b2 : false,
        text: props.data[props.fieldNames.text],
        id: props.data[props.fieldNames.id]
      };
    });
    const allListFlat = parent.getAllListData();
    const showCheckbox = inject("TreeNodeCheckable", computed(() => true));
    const _checked = ref("");
    const _indeterminate = ref(false);
    const _multiple = (_c = parent.$props.multiple) != null ? _c : true;
    const flatlist = computed(() => {
      var _a2;
      return treeFlat((_a2 = props.data["children"]) != null ? _a2 : [], props.fieldNames.id);
    });
    let listParentFlat = queryParentNode(allListFlat, props.fieldNames.id);
    let _listParentFlat = new Set(listParentFlat);
    const childreNodelist = flatlist.value.filter((el) => !_listParentFlat.has(el));
    const parentNodelist = flatlist.value.filter((el) => _listParentFlat.has(el));
    let sletctedIdArray = TreeParentIds.value.filter((el) => el == nodeData.value.id);
    if (flatlist.value.length > 0 && sletctedIdArray.length > 0) {
      if (_multiple) {
        parent == null ? void 0 : parent.onSelected(childreNodelist);
        parent == null ? void 0 : parent.onSelectedParent(parentNodelist);
      }
    }
    function checkboxChange(e) {
      if (!_multiple && TreePareantSelectedIds.value.length >= 1) {
        parent == null ? void 0 : parent.checkAll(false);
      }
      if (e) {
        parent == null ? void 0 : parent.onSelectedParent([nodeData.value.id, ...parentNodelist]);
        parent == null ? void 0 : parent.onSelected(childreNodelist);
      } else {
        parent == null ? void 0 : parent.onUnSelectedParent([nodeData.value.id, ...parentNodelist]);
        parent == null ? void 0 : parent.onUnSelected(childreNodelist);
      }
      parent == null ? void 0 : parent.onCheck({ checked: e, data: toRaw(props.data) });
    }
    toRaw(nodeData.value.id);
    function setExpaned() {
      let ar = /* @__PURE__ */ new Set([...TreePareantSelectedIds.value, ...TreeParentIds.value]);
      let _seleteds = flatlist.value.filter((el) => ar.has(el));
      if (_seleteds.length == flatlist.value.length) {
        _indeterminate.value = false;
        _checked.value = nodeData.value.id;
        return;
      }
      if (_seleteds.length > 0) {
        _indeterminate.value = true;
        _checked.value = "";
        return;
      }
      if (_seleteds.length == 0) {
        _indeterminate.value = false;
        _checked.value = "";
      }
    }
    watchEffect(() => setExpaned());
    watch(() => _checked.value, (newval, oldval) => {
      let ar = /* @__PURE__ */ new Set([...TreePareantSelectedIds.value, ...TreeParentIds.value]);
      let _seleteds = flatlist.value.filter((el) => ar.has(el));
      if (_seleteds.length == flatlist.value.length) {
        parent == null ? void 0 : parent.onSelectedParent([nodeData.value.id]);
        return;
      }
      if (_seleteds.length > 0) {
        parent == null ? void 0 : parent.onUnSelectedParent([nodeData.value.id]);
        return;
      }
      if (_seleteds.length == 0) {
        parent == null ? void 0 : parent.onUnSelectedParent([nodeData.value.id]);
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        class: "flex flex-row flex-row-center-start",
        renderWhole: true
      }, [
        unref(showCheckbox) ? (openBlock(), createBlock(TmCheckbox, {
          key: 0,
          followTheme: props.followTheme,
          closeAni: "",
          color: unref(nodeData)["color"],
          indeterminate: _indeterminate.value,
          onChange: checkboxChange,
          disabled: unref(nodeData)["disabled"],
          modelValue: _checked.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _checked.value = $event),
          value: unref(nodeData)[props.fieldNames.id]
        }, null, 8, ["followTheme", "color", "indeterminate", "disabled", "modelValue", "value"])) : createCommentVNode("v-if", true)
      ]);
    };
  }
});
var parentNode = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-tree/parent-node.vue"]]);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "tree-node",
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
    fieldNames: {
      type: Object,
      default: () => {
        return {
          id: "id",
          text: "text"
        };
      }
    }
  },
  setup(__props) {
    var _a, _b;
    const props = __props;
    const { proxy } = getCurrentInstance();
    let parent = proxy.$parent;
    while (parent) {
      if ((parent == null ? void 0 : parent.TreeParaentName) == "tmTree" || !parent) {
        break;
      } else {
        parent = (_a = parent == null ? void 0 : parent.$parent) != null ? _a : void 0;
      }
    }
    const color = (_b = parent == null ? void 0 : parent.$props.color) != null ? _b : "primary";
    const nodeData = computed(() => {
      var _a2, _b2;
      return {
        icon: (_a2 = props.data["icon"]) != null ? _a2 : "",
        color: props.data["color"] || color,
        disabled: (_b2 = props.data["disabled"]) != null ? _b2 : false,
        text: props.data[props.fieldNames.text],
        id: props.data[props.fieldNames.id]
      };
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        class: "flex flex-row flex-row-center-start",
        renderWhole: true
      }, [
        !props.data["children"] ? (openBlock(), createBlock(childNode, {
          key: 0,
          followTheme: props.followTheme,
          fieldNames: props.fieldNames,
          data: props.data
        }, null, 8, ["followTheme", "fieldNames", "data"])) : createCommentVNode("v-if", true),
        props.data["children"] ? (openBlock(), createBlock(parentNode, {
          key: 1,
          followTheme: props.followTheme,
          fieldNames: props.fieldNames,
          data: props.data
        }, null, 8, ["followTheme", "fieldNames", "data"])) : createCommentVNode("v-if", true),
        unref(nodeData)["icon"] ? (openBlock(), createBlock(tmIcon, {
          key: 2,
          _class: "pr-16",
          color: unref(nodeData)["color"],
          "font-size": 28,
          name: unref(nodeData)["icon"]
        }, null, 8, ["color", "name"])) : createCommentVNode("v-if", true),
        createVNode(tmText, {
          "font-size": 28,
          label: unref(nodeData).text
        }, null, 8, ["label"])
      ]);
    };
  }
});
var treeNode = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-tree/tree-node.vue"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "expanded-node",
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
    fieldNames: {
      type: Object,
      default: () => {
        return {
          id: "id",
          text: "text"
        };
      }
    }
  },
  setup(__props) {
    var _a, _b, _c;
    const props = __props;
    const { proxy } = getCurrentInstance();
    let parent = proxy.$parent;
    while (parent) {
      if ((parent == null ? void 0 : parent.TreeParaentName) == "tmTree" || !parent) {
        break;
      } else {
        parent = (_a = parent == null ? void 0 : parent.$parent) != null ? _a : void 0;
      }
    }
    const TreePareantSelectedExpandedId = inject("TreePareantSelectedExpandedId", ref([]));
    const expandedIconOpenIcon = (_b = parent == null ? void 0 : parent.$props.expandedIconOpen) != null ? _b : "tmicon-sort-down";
    const expandedIconCloseIcon = (_c = parent == null ? void 0 : parent.$props.expandedIconClose) != null ? _c : "tmicon-caret-right";
    const _item = computed(() => props.data);
    const _checked = ref("");
    function expandHandler() {
      _checked.value = _checked.value ? "" : _item.value[props.fieldNames.id];
      if (_checked.value) {
        parent == null ? void 0 : parent.onExpand({ data: toRaw(_item.value), expand: true });
      } else {
        parent == null ? void 0 : parent.onUnExpand({ data: toRaw(_item.value), expand: false });
      }
    }
    function isCheckedOpen() {
      var _a2;
      let sAr = TreePareantSelectedExpandedId.value.filter((el) => el == _item.value[props.fieldNames.id]);
      _checked.value = (_a2 = sAr[0]) != null ? _a2 : "";
    }
    watchEffect(() => isCheckedOpen());
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", { renderWhole: true }, [
        createElementVNode("view", { class: "flex flex-row flex-row-center-start" }, [
          unref(_item)["children"] ? (openBlock(), createBlock(tmIcon, {
            key: 0,
            onClick: _cache[0] || (_cache[0] = ($event) => expandHandler(unref(_item)[props.fieldNames.id])),
            "font-size": 26,
            name: _checked.value ? unref(expandedIconOpenIcon) : unref(expandedIconCloseIcon)
          }, null, 8, ["name"])) : createCommentVNode("v-if", true),
          renderSlot(_ctx.$slots, "default")
        ]),
        unref(_item)["children"] && _checked.value ? (openBlock(), createElementBlock("view", { key: 0 }, [
          createVNode(baseNodeVue, {
            followTheme: props.followTheme,
            fieldNames: props.fieldNames,
            data: unref(_item)["children"]
          }, null, 8, ["followTheme", "fieldNames", "data"])
        ])) : createCommentVNode("v-if", true)
      ]);
    };
  }
});
var expandedNode = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-tree/expanded-node.vue"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "base-node",
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
    fieldNames: {
      type: Object,
      default: () => {
        return {
          id: "id",
          text: "text"
        };
      }
    }
  },
  setup(__props) {
    const props = __props;
    const treeNodeData = computed(() => props.data);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        class: "pa-24",
        renderWhole: true
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(treeNodeData), (item, index) => {
          return openBlock(), createElementBlock("view", { key: index }, [
            createVNode(expandedNode, {
              followTheme: props.followTheme,
              fieldNames: props.fieldNames,
              data: item
            }, {
              default: withCtx(() => [
                createVNode(treeNode, {
                  followTheme: props.followTheme,
                  fieldNames: props.fieldNames,
                  data: item
                }, null, 8, ["followTheme", "fieldNames", "data"])
              ]),
              _: 2
            }, 1032, ["followTheme", "fieldNames", "data"])
          ]);
        }), 128))
      ]);
    };
  }
});
var baseNodeVue = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-tree/base-node.vue"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "tm-tree",
  props: {
    followTheme: {
      type: [Boolean, String],
      default: true
    },
    color: {
      type: String,
      default: "primary"
    },
    expandedIconOpen: {
      type: String,
      default: "tmicon-sort-down"
    },
    expandedIconClose: {
      type: String,
      default: "tmicon-caret-right"
    },
    checkable: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default: true
    },
    expandedId: {
      type: Array,
      default: () => []
    },
    defaultExpandedId: {
      type: Array,
      default: () => []
    },
    selectedId: {
      type: Array,
      default: () => []
    },
    defaultSelectedId: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => [],
      required: true
    },
    fieldNames: {
      type: Object,
      default: () => {
        return {
          id: "id",
          text: "text"
        };
      }
    },
    showLine: {
      type: [Boolean, String],
      default: true
    }
  },
  emits: ["node-click", "check", "expand", "update:selectedId", "update:expandedId"],
  setup(__props, { expose, emit: emits }) {
    const props = __props;
    let listData = ref(props.data);
    let listDataFlat = [...treeFlat(props.data, props.fieldNames.id)];
    let listParentFlat = queryParentNode(props.data, props.fieldNames.id);
    const selectedIds = ref([.../* @__PURE__ */ new Set([...props.defaultSelectedId, ...props.selectedId])]);
    const SelectedExpandedId = ref([.../* @__PURE__ */ new Set([...props.defaultExpandedId, ...props.expandedId])]);
    const parentIds = ref([]);
    if (!props.multiple && selectedIds.value.length >= 1) {
      selectedIds.value = [selectedIds.value[0]];
    }
    let __selectedIdsSet = new Set(listParentFlat);
    parentIds.value = selectedIds.value.filter((el) => __selectedIdsSet.has(el));
    const ___a_selectedIds = new Set(selectedIds.value);
    selectedIds.value = listDataFlat.filter((el) => ___a_selectedIds.has(el));
    selectedIds.value = selectedIds.value.filter((el) => !__selectedIdsSet.has(el));
    const ___a_ExpandedId = new Set(SelectedExpandedId.value);
    SelectedExpandedId.value = listDataFlat.filter((el) => ___a_ExpandedId.has(el));
    provide("TreePareantSelectedIds", readonly(selectedIds));
    provide("TreePareantSelectedExpandedId", readonly(SelectedExpandedId));
    provide("TreeParentIds", readonly(parentIds));
    function onSelected(key) {
      selectedIds.value = [.../* @__PURE__ */ new Set([...selectedIds.value, ...key])];
      emits("update:selectedId", selectedIds.value);
    }
    function onUnSelected(key) {
      let a = new Set(key);
      selectedIds.value = [...new Set([...selectedIds.value].filter((el) => !a.has(el)))];
      emits("update:selectedId", selectedIds.value);
    }
    function onCheck(e) {
      emits("check", e);
    }
    function onExpand(e) {
      SelectedExpandedId.value = [.../* @__PURE__ */ new Set([...SelectedExpandedId.value, e.data[props.fieldNames.id]])];
      emits("expand", __spreadProps(__spreadValues({}, e.data), { expanded: e.expand }));
      emits("update:expandedId", SelectedExpandedId.value);
    }
    function onUnExpand(e) {
      SelectedExpandedId.value = [...new Set([...SelectedExpandedId.value].filter((el) => el != e.data[props.fieldNames.id]))];
      emits("expand", __spreadProps(__spreadValues({}, e.data), { expanded: e.expand }));
      emits("update:expandedId", SelectedExpandedId.value);
    }
    function onSelectedParent(key) {
      parentIds.value = [.../* @__PURE__ */ new Set([...parentIds.value, ...key])];
    }
    function onUnSelectedParent(key) {
      let a = new Set(key);
      parentIds.value = [...new Set([...parentIds.value].filter((el) => !a.has(el)))];
    }
    function getAllListData() {
      return toRaw(props.data);
    }
    watch([() => props.expandedId], () => {
      SelectedExpandedId.value = [...props.expandedId];
    });
    watch([() => props.data], () => {
      listData.value = props.data;
      listDataFlat = [...treeFlat(props.data)];
      listParentFlat = queryParentNode(props.data, props.fieldNames.id);
      let __selectedIdsSet2 = new Set(listParentFlat);
      parentIds.value = selectedIds.value.filter((el) => __selectedIdsSet2.has(el));
      let _a_selectedIds = new Set(selectedIds.value);
      let s = listDataFlat.filter((el) => _a_selectedIds.has(el));
      selectedIds.value = s.filter((el) => !__selectedIdsSet2.has(el));
      emits("update:selectedId", selectedIds.value);
      let _a_ExpandedId = new Set(SelectedExpandedId.value);
      SelectedExpandedId.value = listDataFlat.filter((el) => _a_ExpandedId.has(el));
      emits("update:expandedId", SelectedExpandedId.value);
    }, { deep: true });
    provide("TreeNodeCheckable", computed(() => props.checkable));
    function checkAll(checked = true) {
      if (checked == true) {
        onSelected(listDataFlat);
        onSelectedParent(listParentFlat);
      } else {
        selectedIds.value = [];
        onUnSelectedParent(listParentFlat);
      }
      emits("update:selectedId", [...selectedIds.value, ...parentIds.value]);
    }
    function checkNode(key, checked) {
      if (!new Set(listDataFlat).has(key)) {
        formatAppLog("error", "at tmui/components/tm-tree/tm-tree.vue:220", "\u4E0D\u5B58\u5728\u8BE5\u8282\u70B9");
        return false;
      }
      let parentData = queryNodeIsParent(toRaw(props.data), key, props.fieldNames.id);
      if (parentData) {
        let flat_nodataNodes = treeFlat(parentData.children, props.fieldNames.id);
        let all_parent = new Set(listParentFlat);
        let flat_nodataParentNodes = [...flat_nodataNodes, key].filter((el) => all_parent.has(el));
        let flat_nodataChildNodes = [...flat_nodataNodes, key].filter((el) => !all_parent.has(el));
        if (checked == true) {
          onSelected(flat_nodataChildNodes);
          onSelectedParent(flat_nodataParentNodes);
        } else {
          onUnSelected(flat_nodataChildNodes);
          onUnSelectedParent(flat_nodataParentNodes);
        }
      } else {
        if (checked == true) {
          onSelected([key]);
        } else {
          onUnSelected([key]);
        }
      }
      emits("update:selectedId", [...selectedIds.value, ...parentIds.value]);
      return true;
    }
    function expandAll(checked = true) {
      let flatarray = queryParentNode(toRaw(props.data), props.fieldNames.id);
      if (checked) {
        SelectedExpandedId.value = [.../* @__PURE__ */ new Set([...SelectedExpandedId.value, ...flatarray])];
      } else {
        SelectedExpandedId.value = [];
      }
      emits("update:expandedId", SelectedExpandedId.value);
    }
    function expandNode(key, checked) {
      if (!new Set(listDataFlat).has(key)) {
        formatAppLog("error", "at tmui/components/tm-tree/tm-tree.vue:274", "\u4E0D\u5B58\u5728\u8BE5\u8282\u70B9");
        return false;
      }
      let parentData = queryNodeIsParent(toRaw(props.data, props.fieldNames.id), key);
      if (!parentData) {
        formatAppLog("error", "at tmui/components/tm-tree/tm-tree.vue:279", "\u8BE5\u8282\u70B9\u975E\u7236\u8282\u70B9");
        return false;
      }
      if (checked == true) {
        SelectedExpandedId.value = [.../* @__PURE__ */ new Set([...SelectedExpandedId.value, key])];
      } else {
        SelectedExpandedId.value = [...new Set(SelectedExpandedId.value.filter((el) => el != key))];
      }
      emits("update:expandedId", SelectedExpandedId.value);
      return true;
    }
    function showNode(key) {
      let nodepath = getNodePath(key);
      let parentData = queryNodeIsParent(toRaw(props.data), key, props.fieldNames.id);
      if (!parentData) {
        nodepath = nodepath.filter((el) => el != key);
      }
      SelectedExpandedId.value = [.../* @__PURE__ */ new Set([...SelectedExpandedId.value, ...nodepath])];
      emits("update:expandedId", SelectedExpandedId.value);
    }
    function getCheckedNodes(strategy = "all") {
      if (strategy == "all") {
        return [...toRaw(selectedIds.value), ...parentIds.value];
      } else if (strategy == "parent") {
        return toRaw(parentIds.value);
      } else if (strategy == "children") {
        return toRaw(selectedIds.value);
      } else {
        return [];
      }
    }
    function getExpandedNodes() {
      return toRaw(SelectedExpandedId.value);
    }
    function getNodePath(key) {
      return getNodeRouter(toRaw(props.data), key, props.fieldNames.id);
    }
    expose({
      TreeParaentName: "tmTree",
      onUnSelected,
      onSelected,
      onCheck,
      onExpand,
      onUnExpand,
      onSelectedParent,
      onUnSelectedParent,
      getAllListData,
      checkAll,
      checkNode,
      expandAll,
      expandNode,
      getCheckedNodes,
      getExpandedNodes,
      getNodePath,
      showNode
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", { renderWhole: true }, [
        createVNode(baseNodeVue, {
          followTheme: props.followTheme,
          fieldNames: props.fieldNames,
          data: unref(listData)
        }, null, 8, ["followTheme", "fieldNames", "data"])
      ]);
    };
  }
});
var tmTree = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-tree/tm-tree.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tree",
  setup(__props) {
    const dlist = ref(loop());
    function loop(path = "0", level = 2) {
      const list = [];
      for (let i = 0; i < 5; i += 1) {
        const key = `${path}-${i}`;
        const treeNode2 = {
          text: "\u9009\u9879" + key,
          id: key,
          disabled: i == 1
        };
        if (level > 0) {
          treeNode2.children = loop(key, level - 1);
        }
        list.push(treeNode2);
      }
      return list;
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
                createVNode(tmTree, { data: dlist.value }, null, 8, ["data"])
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
var tree = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/showdata/tree.nvue"]]);
export { tree as default };
