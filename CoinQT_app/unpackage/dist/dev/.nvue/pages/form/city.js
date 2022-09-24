import { defineComponent, ref, isProxy, openBlock, createElementBlock, createVNode, unref, isRef, withCtx } from "vue";
import { _ as _export_sfc, t as tmApp, a as tmText } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmCell } from "../../tm-cell.js";
import { p as provinceData, c as cityData, a as areaData, t as tmCityPicker } from "../../tm-city-picker.js";
import { t as tmCascader } from "../../tm-cascader.js";
import { t as tmDivider } from "../../tm-divider.js";
import "pinia";
import "../../tm-icon.js";
import "../../tm-image.js";
import "../../tm-translate.js";
import "../../tm-drawer.js";
import "../../tm-overlay.js";
import "../../tm-picker-view.js";
import "../../tm-button.js";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "tm-city-cascader",
  props: {
    selectionModel: {
      type: String,
      default: "name"
    },
    cityLevel: {
      type: String,
      default: "area"
    },
    hotCity: {
      type: Array,
      default: () => [
        { name: "\u5357\u660C\u5E02", data: ["\u6C5F\u897F\u7701", "\u5357\u660C\u5E02", "\u7EA2\u8C37\u6EE9\u533A"] },
        { name: "\u676D\u5DDE\u5E02", data: ["\u6D59\u6C5F\u7701", "\u676D\u5DDE\u5E02", "\u4F59\u676D\u533A"] }
      ]
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
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const cityAlldata = ref(chiliFormatCity_area());
    let _value = ref([]);
    let _def = isProxy(props.defaultValue) ? props.defaultValue : ref(props.defaultValue);
    function changData(e) {
      emits("update:modelValue", e);
    }
    function chiliFormatCity_area() {
      let list = [];
      provinceData.forEach((item, index) => {
        list.push({
          id: String(props.selectionModel == "id" ? item.value : item.label),
          text: String(item.label),
          children: []
        });
      });
      if (props.cityLevel == "province")
        return list;
      cityData.forEach((item, index) => {
        item.forEach((citem, cindex) => {
          list[index].children.push({
            id: props.selectionModel == "id" ? citem.value : citem.label,
            text: citem.label,
            children: []
          });
        });
      });
      if (props.cityLevel == "city")
        return list;
      list.forEach((item, index) => {
        item.children.forEach((citem, cindex) => {
          areaData[index][cindex].forEach((jitem) => {
            list[index].children[cindex].children.push({
              id: props.selectionModel == "id" ? jitem.value : jitem.label,
              text: jitem.label
            });
          });
        });
      });
      return list;
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", { renderWhole: true }, [
        createVNode(tmCascader, {
          value: unref(_value),
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(_value) ? _value.value = $event : _value = $event),
          onChange: changData,
          "default-value": unref(_def),
          color: props.color,
          "active-color": props.activeColor,
          height: props.height,
          slotTabHeigth: 88,
          data: cityAlldata.value
        }, null, 8, ["value", "default-value", "color", "active-color", "height", "data"])
      ]);
    };
  }
});
var tmCityCascader = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-city-cascader/tm-city-cascader.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "city",
  setup(__props) {
    const dateStr = ref("");
    const citydate = ref([]);
    const showdate = ref(false);
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
                  label: "\u57FA\u7840\u793A\u4F8B,\u66F4\u591A\u89C1\u6587\u6863"
                }),
                createVNode(tmDivider),
                createVNode(tmCityCascader)
              ]),
              _: 1
            }),
            createVNode(tmCell, {
              onClick: _cache[0] || (_cache[0] = ($event) => showdate.value = true),
              title: "\u8BF7\u9009\u62E9\u6240\u5728\u533A\u57DF",
              "right-text": dateStr.value || "\u8BF7\u9009\u62E9"
            }, null, 8, ["right-text"]),
            createVNode(tmCityPicker, {
              show: showdate.value,
              "onUpdate:show": _cache[1] || (_cache[1] = ($event) => showdate.value = $event),
              modelValue: citydate.value,
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => citydate.value = $event),
              "model-str": dateStr.value,
              "onUpdate:model-str": _cache[3] || (_cache[3] = ($event) => dateStr.value = $event)
            }, null, 8, ["show", "modelValue", "model-str"])
          ]),
          _: 1
        })
      ]);
    };
  }
});
var city = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/form/city.nvue"]]);
export { city as default };
