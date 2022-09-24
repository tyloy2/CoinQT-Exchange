import { defineComponent, getCurrentInstance, computed, ref, onMounted, onUpdated, watch, nextTick, resolveComponent, openBlock, createElementBlock, normalizeStyle, createCommentVNode, createBlock, withCtx, createVNode, Fragment, renderList, unref, normalizeClass, toRaw } from "vue";
import { _ as _export_sfc, r as requireNativePlugin, u as useTmpiniaStore, a as tmText } from "./tm-text.js";
var _style_0 = { "top": { "": { "backgroundImage": "linear-gradient(to bottom,rgba(17, 17, 17, 1),rgba(36, 36, 36, 0.6))" } }, "bottom": { "": { "backgroundImage": "linear-gradient(to top,rgba(17, 17, 17, 1),rgba(36, 36, 36, 0.6))" } } };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "picker-panel",
  props: {
    followTheme: {
      type: [Boolean],
      default: true
    },
    col: {
      type: Number,
      default: 0
    },
    disabled: {
      type: Boolean,
      default: false
    },
    height: {
      type: Number,
      default: 600
    },
    data: {
      type: Array,
      default: () => [],
      required: true
    },
    dataKey: {
      type: String,
      default: "text"
    }
  },
  emits: ["change", "end", "start"],
  setup(__props, { emit: emits }) {
    var _a, _b;
    const props = __props;
    const dom = requireNativePlugin("dom");
    const proxy = (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const store = useTmpiniaStore();
    const isDark = computed(() => store.tmStore.dark);
    const _data = computed(() => props.data);
    const colIndex = ref(0);
    const showDom = ref(false);
    const maskHeight = computed(() => {
      return (uni.upx2px(props.height) - 34) / 2;
    });
    const maskWidth = ref(0);
    computed(() => {
      let str_white = "background-image:linear-gradient(rgba(255,255,255,0.95),rgba(255,255,255,0.6)),linear-gradient(rgba(255,255,255,0.6),rgba(255,255,255,0.95))";
      let str_black = "background-image:linear-gradient(rgba(17, 17, 17, 1.0),rgba(106, 106, 106, 0.2)),linear-gradient(rgba(106, 106, 106, 0.2),rgba(17, 17, 17, 1.0))";
      str_black = "background-image: linear-gradient(to bottom,rgba(30, 30, 30, 0.9),rgba(104, 104, 104, 0.6))";
      if (!isDark.value) {
        return str_white;
      }
      return str_black;
    });
    onMounted(() => {
      showDom.value = true;
      nvuegetClientRect();
      setTimeout(function() {
        colIndex.value = props.col;
      }, 50);
    });
    onUpdated(() => nvuegetClientRect());
    watch(() => props.col, () => {
      colIndex.value = props.col;
    });
    function colchange(e) {
      colIndex.value = e.detail.value[0];
      emits("change", colIndex.value);
    }
    function nvuegetClientRect() {
      nextTick(function() {
        dom.getComponentRect(proxy.$refs.picker, function(res) {
          if (res == null ? void 0 : res.size) {
            maskWidth.value = res.size.width;
            if (res.size.width == 0) {
              nvuegetClientRect();
            }
          }
        });
      });
    }
    return (_ctx, _cache) => {
      const _component_picker_view_column = resolveComponent("picker-view-column");
      const _component_picker_view = resolveComponent("picker-view");
      return openBlock(), createElementBlock("view", {
        class: "flex-1 relative",
        style: normalizeStyle({ height: props.height + "rpx" }),
        renderWhole: true
      }, [
        createCommentVNode(" uniapp\u6709bug\u5728nvue\u4E0A\uFF0C\u6682\u65F6\u4E0D\u8BBE\u7F6E "),
        createCommentVNode(` :mask-style="isDark?'background:linear-gradient(0deg,rgba(0,0,0,0.4),rgba(0,0,0,0),rgba(0,0,0,0.4))':'background:rgba(255,255,255,0)'" `),
        showDom.value ? (openBlock(), createBlock(_component_picker_view, {
          key: 0,
          ref: "picker",
          onPickend: _cache[0] || (_cache[0] = ($event) => emits("end")),
          onPickstart: _cache[1] || (_cache[1] = ($event) => emits("start")),
          value: [colIndex.value],
          onChange: colchange,
          style: normalizeStyle([{ height: props.height + "rpx" }])
        }, {
          default: withCtx(() => [
            createVNode(_component_picker_view_column, {
              style: normalizeStyle([{ height: props.height + "rpx" }])
            }, {
              default: withCtx(() => [
                (openBlock(true), createElementBlock(Fragment, null, renderList(unref(_data), (item, index) => {
                  return openBlock(), createElementBlock("view", {
                    class: normalizeClass([[item["disabled"] ? "opacity-5" : ""], "flex"]),
                    key: index,
                    style: { "justify-content": "center", "height": "34px", "align-items": "center" }
                  }, [
                    typeof item == "string" ? (openBlock(), createBlock(tmText, {
                      key: 0,
                      _class: "text-align-center",
                      "font-size": item.length > 7 ? 24 : 30,
                      dark: unref(isDark),
                      label: item
                    }, null, 8, ["font-size", "dark", "label"])) : createCommentVNode("v-if", true),
                    typeof item == "object" ? (openBlock(), createBlock(tmText, {
                      key: 1,
                      _class: "text-align-center",
                      "font-size": item[props.dataKey].length > 7 ? 24 : 30,
                      dark: unref(isDark),
                      label: item[props.dataKey] || ""
                    }, null, 8, ["font-size", "dark", "label"])) : createCommentVNode("v-if", true)
                  ], 2);
                }), 128))
              ]),
              _: 1
            }, 8, ["style"])
          ]),
          _: 1
        }, 8, ["value", "style"])) : createCommentVNode("v-if", true),
        unref(isDark) ? (openBlock(), createElementBlock("view", {
          key: 1,
          userInteractionEnabled: false,
          class: "top absolute l-0 t-0",
          style: normalizeStyle({ height: unref(maskHeight) + "px", width: maskWidth.value + "px" })
        }, null, 4)) : createCommentVNode("v-if", true),
        unref(isDark) ? (openBlock(), createElementBlock("view", {
          key: 2,
          userInteractionEnabled: false,
          class: "bottom absolute l-0 b-0",
          style: normalizeStyle({ height: unref(maskHeight) + "px", width: maskWidth.value + "px" })
        }, null, 4)) : createCommentVNode("v-if", true)
      ], 4);
    };
  }
});
var pickerPanelVue = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["styles", [_style_0]], ["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-picker-view/picker-panel.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tm-picker-view",
  props: {
    followTheme: {
      type: [Boolean, String],
      default: true
    },
    height: {
      type: Number,
      default: 450
    },
    modelValue: {
      type: Array,
      default: () => []
    },
    modelStr: {
      type: [String],
      default: ""
    },
    defaultValue: {
      type: Array,
      default: () => [0]
    },
    columns: {
      type: Array,
      default: () => [],
      required: true
    },
    dataKey: {
      type: String,
      default: "text"
    },
    beforeChange: {
      type: [Boolean, Function],
      default: () => false
    }
  },
  emits: ["change", "update:modelValue", "update:modelStr", "end", "start"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const _colIndex = ref([...props.defaultValue]);
    const _data = ref([]);
    const _modelStr = computed(() => {
      let str = [];
      _data.value.forEach((el, index) => {
        var _a;
        let item = el[_colIndex.value[index]];
        if (typeof item == "undefined")
          return;
        str.push((_a = item[props.dataKey]) != null ? _a : "");
      });
      return str.join("/");
    });
    watch(() => _colIndex.value, () => {
      nextTick(() => {
        emits("update:modelStr", _modelStr.value);
      });
    }, { deep: true });
    function getIndexLoop(defaultindex = 0, data) {
      var _a;
      let ds = [];
      if (data.length == 0)
        return [];
      if (typeof _colIndex.value[defaultindex] == "undefined") {
        _colIndex.value.push(0);
      }
      let nowData = data[_colIndex.value[defaultindex]];
      if (!nowData) {
        _colIndex.value[defaultindex] = 0;
        nowData = data[_colIndex.value[defaultindex]];
      }
      if (nowData && (nowData == null ? void 0 : nowData.children) && Array.isArray(nowData == null ? void 0 : nowData.children) && ((_a = nowData == null ? void 0 : nowData.children) == null ? void 0 : _a.length) > 0) {
        ds.push(data);
        let dy = getIndexLoop(defaultindex + 1, nowData == null ? void 0 : nowData.children);
        ds = [...ds, ...dy];
      } else {
        if ((data == null ? void 0 : data.length) > 0 && Array.isArray(data) && data) {
          ds.push(data);
        }
      }
      return ds;
    }
    _data.value = getIndexLoop(0, props.columns);
    watch(() => props.columns, () => {
      _data.value = getIndexLoop(0, props.columns);
    }, { deep: true });
    watch(() => props.modelValue, () => {
      _colIndex.value = props.modelValue;
      _data.value = getIndexLoop(0, props.columns);
    }, { deep: true });
    async function pickerChange(itemindex, levelIndex) {
      let isActive = true;
      let toItem = _data.value[levelIndex][itemindex];
      const params = {
        from: { itemindex: _colIndex.value[levelIndex], levelIndex, data: _data.value[levelIndex][_colIndex.value[levelIndex]] },
        to: { itemindex, levelIndex, data: toItem }
      };
      _colIndex.value.splice(levelIndex, 1, itemindex);
      if (typeof props.beforeChange === "function") {
        uni.showLoading({ title: "...", mask: true });
        let p = await props.beforeChange(params);
        if (typeof p === "function") {
          p = await p(params);
        }
        if (!p) {
          isActive = false;
          nextTick(() => {
            _colIndex.value.splice(levelIndex, 1, params.from.itemindex);
          });
          uni.hideLoading();
        }
      }
      if ((toItem == null ? void 0 : toItem.disabled) == true) {
        isActive = false;
        nextTick(() => {
          _colIndex.value.splice(levelIndex, 1, params.from.itemindex);
        });
      }
      if (isActive) {
        _data.value = getIndexLoop(0, props.columns);
        emits("change", levelIndex, itemindex);
        emits("update:modelValue", toRaw(_colIndex.value));
      }
    }
    nextTick(() => {
      emits("update:modelValue", toRaw(_colIndex.value));
      emits("update:modelStr", _modelStr.value || props.modelStr);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        class: "flex flex-row",
        renderWhole: true
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_data.value, (item, index) => {
          return openBlock(), createBlock(pickerPanelVue, {
            followTheme: props.followTheme,
            onEnd: _cache[0] || (_cache[0] = ($event) => emits("end")),
            onStart: _cache[1] || (_cache[1] = ($event) => emits("start")),
            dataKey: props.dataKey,
            onChange: ($event) => pickerChange($event, index),
            col: _colIndex.value[index],
            data: item,
            key: index,
            height: props.height,
            class: "flex-1"
          }, null, 8, ["followTheme", "dataKey", "onChange", "col", "data", "height"]);
        }), 128))
      ]);
    };
  }
});
var tmPickerView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-picker-view/tm-picker-view.vue"]]);
export { tmPickerView as t };
