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
import { defineComponent, ref, getCurrentInstance, computed, inject, watchEffect, openBlock, createBlock, unref, withCtx, createVNode, createElementVNode, normalizeStyle, createCommentVNode, toRaw } from "vue";
import { _ as _export_sfc, c as custom_props } from "./tm-text.js";
import { t as tmDrawer } from "./tm-drawer.js";
import { t as tmPickerView } from "./tm-picker-view.js";
import { T as TmButton } from "./tm-button.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tm-picker",
  props: __spreadProps(__spreadValues({}, custom_props), {
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
      default: () => []
    },
    selectedModel: {
      type: String,
      default: "index"
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
    },
    show: {
      type: [Boolean],
      default: false
    },
    color: {
      type: String,
      default: "primary"
    },
    linear: {
      type: String,
      default: ""
    },
    linearDeep: {
      type: String,
      default: "light"
    },
    btnRound: {
      type: Number,
      default: 3
    },
    round: {
      type: Number,
      default: 12
    },
    height: {
      type: Number,
      default: 700
    }
  }),
  emits: ["update:show", "update:modelValue", "update:modelStr", "confirm", "cancel", "close", "open"],
  setup(__props, { emit: emits }) {
    var _a, _b;
    const props = __props;
    const drawer = ref(null);
    (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const showCity = ref(true);
    const _colIndex = ref([]);
    const _data = computed(() => props.columns);
    const _colStr = ref(props.modelStr);
    const aniover = ref(true);
    const sysinfo = inject("tmuiSysInfo", computed(() => {
      return { bottom: 0, height: 750, width: uni.upx2px(750), top: 0, isCustomHeader: false, sysinfo: null };
    }));
    watchEffect(() => {
      showCity.value = props.show;
    });
    function closeDrawer(e) {
      showCity.value = e;
      emits("update:show", showCity.value);
      getIndexBymodel(_data.value, props.selectedModel, 0, props.modelValue);
      emits("close");
    }
    function drawerOpen() {
      emits("open");
    }
    getIndexBymodel(_data.value, props.selectedModel, 0, props.defaultValue);
    setVal();
    function confirm() {
      var _a2;
      setVal();
      emits("confirm", toRaw(_colIndex.value));
      (_a2 = drawer.value) == null ? void 0 : _a2.close();
    }
    function cancel() {
      if (!aniover.value)
        return;
      emits("cancel");
    }
    function setVal() {
      var _a2;
      let val = [];
      if (props.selectedModel == "name") {
        val = (_a2 = _colStr.value.split("/")) != null ? _a2 : [];
      } else if (props.selectedModel == "id") {
        val = getRouterId(_data.value, 0);
      } else {
        val = [..._colIndex.value];
      }
      emits("update:modelValue", val);
      emits("update:modelStr", _colStr.value);
    }
    function getIndexBymodel(vdata = [], model = "name", parentIndex = 0, value = []) {
      if (model == "name") {
        let item = vdata.filter((el) => value[parentIndex] == el["text"]);
        if (item.length == 0) {
          item = vdata[0];
          if (item) {
            value[parentIndex] = item["text"];
            _colIndex.value[parentIndex] = 0;
            if (item["children"]) {
              getIndexBymodel(item["children"], model, parentIndex + 1, value);
            }
          }
        } else {
          item = item[0];
          if (item) {
            _colIndex.value[parentIndex] = vdata.findIndex((el) => el["text"] == item["text"]);
            if (item["children"]) {
              getIndexBymodel(item["children"], model, parentIndex + 1, value);
            }
          }
        }
      } else if (model == "id") {
        let item = vdata.filter((el) => value[parentIndex] == el["id"]);
        if (item.length == 0) {
          item = vdata[0];
          if (item) {
            value[parentIndex] = item["id"];
            _colIndex.value[parentIndex] = 0;
            if (item["children"]) {
              getIndexBymodel(item["children"], model, parentIndex + 1, value);
            }
          }
        } else {
          item = item[0];
          if (item) {
            _colIndex.value[parentIndex] = vdata.findIndex((el) => el["id"] == item["id"]);
            if (item["children"]) {
              getIndexBymodel(item["children"], model, parentIndex + 1, value);
            }
          }
        }
      } else {
        _colIndex.value = [...value];
      }
      return _colIndex.value;
    }
    function getRouterId(list = [], parentIndex = 0) {
      let p = [];
      for (let i = 0; i < list.length; i++) {
        if (i == _colIndex.value[parentIndex]) {
          p.push(list[i]["id"]);
          if (typeof _colIndex.value[parentIndex] != "undefined") {
            let c = getRouterId(list[i]["children"], parentIndex + 1);
            p = [...p, ...c];
          }
          break;
        }
      }
      return p;
    }
    const dHeight = computed(() => {
      return props.height + sysinfo.value.bottom + 80;
    });
    return (_ctx, _cache) => {
      return showCity.value ? (openBlock(), createBlock(tmDrawer, {
        key: 0,
        disabbleScroll: true,
        round: props.round,
        ref_key: "drawer",
        ref: drawer,
        height: unref(dHeight),
        closable: true,
        overlayClick: aniover.value,
        onOpen: drawerOpen,
        onCancel: cancel,
        onOk: confirm,
        show: showCity.value,
        "onUpdate:show": closeDrawer,
        title: "\u8BF7\u9009\u62E9",
        "ok-text": "\u786E\u8BA4"
      }, {
        default: withCtx(() => [
          createVNode(tmPickerView, {
            dataKey: props.dataKey,
            height: unref(dHeight) - 230,
            onEnd: _cache[0] || (_cache[0] = ($event) => aniover.value = true),
            onStart: _cache[1] || (_cache[1] = ($event) => aniover.value = false),
            value: _colIndex.value,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _colIndex.value = $event),
            "onUpdate:modelStr": _cache[3] || (_cache[3] = ($event) => _colStr.value = $event),
            "model-str": _colStr.value,
            "default-value": _colIndex.value,
            beforeChange: props.beforeChange,
            columns: unref(_data)
          }, null, 8, ["dataKey", "height", "value", "model-str", "default-value", "beforeChange", "columns"]),
          createVNode(TmButton, {
            label: "\u786E\u8BA4\u9009\u62E9",
            block: "",
            margin: [32, 12],
            color: props.color,
            linear: props.linear,
            "linear-deep": props.linearDeep,
            onClick: confirm,
            round: props.btnRound
          }, null, 8, ["color", "linear", "linear-deep", "round"]),
          createElementVNode("view", {
            style: normalizeStyle({ height: unref(sysinfo).bottom + "px" })
          }, null, 4)
        ]),
        _: 1
      }, 8, ["round", "height", "overlayClick", "show"])) : createCommentVNode("v-if", true);
    };
  }
});
var tmPicker = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-picker/tm-picker.vue"]]);
export { tmPicker as t };
