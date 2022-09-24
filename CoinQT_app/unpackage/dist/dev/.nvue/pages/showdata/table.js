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
import { _ as _export_sfc, a as tmText, t as tmApp, g as formatAppLog } from "../../tm-text.js";
import { defineComponent, computed, ref, onMounted, nextTick, watch, openBlock, createElementBlock, unref, normalizeClass, isRef, normalizeStyle, Fragment, renderList, createBlock, withCtx, createElementVNode, withModifiers, createVNode, createCommentVNode, toRaw } from "vue";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmIcon } from "../../tm-icon.js";
import { T as TmButton } from "../../tm-button.js";
import { t as tmDivider } from "../../tm-divider.js";
import "pinia";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "tm-table",
  props: {
    showHeader: {
      type: Boolean,
      default: true
    },
    header: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Array,
      default: () => [],
      required: true
    },
    width: {
      type: Number,
      default: 750
    },
    height: {
      type: Number,
      default: 0
    },
    cellHeight: {
      type: Number,
      default: 72
    },
    headerHeight: {
      type: Number,
      default: 88
    },
    showBottomBorder: {
      type: Boolean,
      default: true
    }
  },
  emits: ["rowClick"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const defaultProps = computed(() => {
      return {
        width: props.width,
        height: props.height,
        cellHeight: props.cellHeight,
        headerHeight: props.headerHeight
      };
    });
    const _col = ref([]);
    const _tabel = ref([]);
    const _showBottomBorder = computed(() => props.showBottomBorder);
    const _showHeader = computed(() => props.showHeader);
    const isNvue = ref(false);
    isNvue.value = true;
    const headerLeft = ref(0);
    const tableLeft = ref([...new Array(props.tableData.length).fill(0)]);
    let scrollDong = ref("");
    let scrollIndex = ref(NaN);
    function headerScroll(e, index) {
      if (scrollDong.value != "h")
        return;
      nextTick(() => {
        if (scrollIndex.value === index) {
          headerLeft.value = e.detail.scrollLeft;
          tableLeft.value = tableLeft.value.map((el, idx) => {
            return idx !== index ? headerLeft.value : el;
          });
        }
      });
    }
    function tableScroll(e) {
      if (scrollDong.value != "t")
        return;
      nextTick(() => {
        tableLeft.value = [...new Array(props.tableData.length).fill(e.detail.scrollLeft)];
      });
    }
    function touchStartScroll(index) {
      scrollIndex.value = index;
      scrollDong.value = "h";
    }
    onMounted(() => {
      nextTick(() => setColData());
    });
    watch([() => props.tableData, () => props.header], () => {
      setColData();
    }, { deep: true });
    function setColData() {
      _col.value = [];
      _tabel.value = [];
      props.header.forEach((el, index) => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        let defaultSort2 = (_a = el == null ? void 0 : el.sortType) != null ? _a : "none";
        if (defaultSort2 != "none") {
          defaultSort2 = "none";
        }
        _col.value.push({
          title: (_b = el == null ? void 0 : el.title) != null ? _b : "",
          width: (_c = el == null ? void 0 : el.width) != null ? _c : 145,
          align: "flex-row-center-" + ((el == null ? void 0 : el.align) || "center"),
          sort: (_d = el == null ? void 0 : el.sort) != null ? _d : false,
          bgColor: (_e = el == null ? void 0 : el.bgColor) != null ? _e : "white",
          cellColor: (_f = el == null ? void 0 : el.cellColor) != null ? _f : "white",
          light: (_g = el == null ? void 0 : el.light) != null ? _g : false,
          key: (_h = el == null ? void 0 : el.key) != null ? _h : String(index),
          sortType: defaultSort2
        });
      });
      props.tableData.forEach((el, index) => {
        var _a, _b, _c, _d, _e, _f;
        let d = (_a = el == null ? void 0 : el.data) != null ? _a : {};
        let keys = Object.keys(d);
        for (let ik = 0, len = keys.length; ik < len; ik++) {
          if (typeof _col.value[ik] == "undefined") {
            _col.value.push({
              title: String(ik),
              width: (_b = el == null ? void 0 : el.width) != null ? _b : 145,
              align: "flex-col-center-" + ((el == null ? void 0 : el.align) || "center"),
              sort: false,
              bgColor: "white",
              cellColor: "white",
              light: false,
              key: String(ik),
              sortType: "none"
            });
          }
        }
        let dataRuslt = [];
        dataRuslt = _col.value.map((el2, index2) => {
          var _a2, _b2, _c2, _d2, _e2, _f2, _g, _h, _i, _j, _k, _l;
          let color = "white";
          let light = false;
          if (typeof d[el2.key] !== "object") {
            color = (el == null ? void 0 : el.color) || ((_a2 = _col.value[index2]) == null ? void 0 : _a2.cellColor) || color;
            light = (el == null ? void 0 : el.light) || ((_b2 = _col.value[index2]) == null ? void 0 : _b2.light) || light;
          } else {
            color = ((_c2 = d[el2.key]) == null ? void 0 : _c2.color) || (el == null ? void 0 : el.color) || ((_d2 = _col.value[index2]) == null ? void 0 : _d2.color) || color;
            light = ((_e2 = d[el2.key]) == null ? void 0 : _e2.light) || (el == null ? void 0 : el.light) || ((_f2 = _col.value[index2]) == null ? void 0 : _f2.light) || light;
          }
          let cel = {
            key: el2.key,
            text: typeof d[el2.key] !== "object" ? d[el2.key] : (_h = (_g = d[el2.key]) == null ? void 0 : _g.text) != null ? _h : "",
            type: typeof d[el2.key] !== "object" ? "text" : (_j = (_i = d[el2.key]) == null ? void 0 : _i.type) != null ? _j : "text",
            width: (_l = (_k = _col.value[index2]) == null ? void 0 : _k.width) != null ? _l : 145,
            light,
            color
          };
          if (typeof d[el.key] === "object") {
            cel = __spreadValues(__spreadValues({}, cel), d[el.key]);
          }
          return cel;
        });
        _tabel.value.push({
          data: dataRuslt,
          align: (_e = (_d = el == null ? void 0 : el.align) != null ? _d : (_c = _col.value[index]) == null ? void 0 : _c.align) != null ? _e : "flex-row-center-center",
          key: (_f = el == null ? void 0 : el.key) != null ? _f : String(index)
        });
      });
    }
    function headerClick(key, isSort = false) {
      if (!isSort)
        return;
      let valueArray = _col.value.filter((el) => el.key == key);
      let keyDesc = valueArray[0].sortType;
      if (!keyDesc || keyDesc == "none") {
        sort(key, "desc");
        return;
      }
      if (keyDesc == "none") {
        sort(key, "desc");
        return;
      }
      if (keyDesc == "desc") {
        sort(key, "asce");
        return;
      }
      if (keyDesc == "asce") {
        sort(key, "none");
        return;
      }
    }
    function sort(descKey = "", type = "none") {
      uni.showLoading({
        title: "...",
        mask: true
      });
      if (type == "none" || descKey === "") {
        setColData();
        uni.hideLoading();
        return;
      }
      let lsTemp = _tabel.value.map((item, index) => {
        let valueArray = item.data.filter((el) => el.key == descKey);
        return {
          oldIndex: index,
          value: valueArray[0].text
        };
      });
      if (type == "desc") {
        lsTemp.sort((a, b) => a.value - b.value);
      }
      if (type == "asce") {
        lsTemp.sort((a, b) => b.value - a.value);
      }
      const backTable = toRaw(_tabel.value);
      nextTick(() => {
        _col.value = _col.value.map((el) => {
          return __spreadProps(__spreadValues({}, el), { sortType: el.key == descKey ? type : el.sortType });
        });
        _tabel.value = lsTemp.map((el) => {
          return backTable[el.oldIndex];
        });
        uni.hideLoading();
      });
    }
    function rowClick(rowIndex, colIndex) {
      emits("rowClick", rowIndex, colIndex);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", { renderWhole: true }, [
        unref(_showHeader) ? (openBlock(), createElementBlock("scroll-view", {
          key: 0,
          enableFlex: isNvue.value,
          class: normalizeClass([isNvue.value ? "flex-row flex" : "tableHeader"]),
          scrollX: true,
          scrollWithAnimation: false,
          showScrollbar: false,
          onScroll: tableScroll,
          onTouchstart: _cache[2] || (_cache[2] = ($event) => isRef(scrollDong) ? scrollDong.value = "t" : scrollDong = "t"),
          onMouseup: _cache[3] || (_cache[3] = ($event) => isRef(scrollDong) ? scrollDong.value = "t" : scrollDong = "t"),
          scrollLeft: headerLeft.value,
          style: normalizeStyle({ width: `${unref(defaultProps).width}rpx`, height: `${unref(defaultProps).headerHeight}rpx` })
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_col.value, (item, index) => {
            return openBlock(), createBlock(tmSheet, {
              border: unref(_showBottomBorder) ? 1 : 0,
              "border-direction": "bottom",
              color: item.bgColor,
              text: item.light,
              _class: "flex flex-col " + item.align,
              height: unref(defaultProps).headerHeight - 6,
              width: item.width - 10,
              key: index,
              margin: [0, 0],
              padding: [10, 6],
              onClick: ($event) => headerClick(item.key, item.sort)
            }, {
              default: withCtx(() => [
                createElementVNode("view", {
                  userInteractionEnabled: false,
                  style: normalizeStyle({ width: item.width - 10 + "rpx", height: unref(defaultProps).headerHeight - 6 + "rpx" }),
                  class: normalizeClass(["flex flex-row-center-center flex-row", [item.align]])
                }, [
                  createElementVNode("view", {
                    onClick: _cache[0] || (_cache[0] = withModifiers(() => {
                    }, ["stop"])),
                    class: "flex-1 flex",
                    style: { "width": "0px" }
                  }, [
                    createVNode(tmText, {
                      onClick: ($event) => headerClick(item.key, item.sort),
                      _style: "line-height:normal;",
                      "font-size": 26,
                      _class: "text-weight-b text-align-center",
                      label: item.title
                    }, null, 8, ["onClick", "label"])
                  ]),
                  item.sort ? (openBlock(), createElementBlock("view", {
                    key: 0,
                    onClick: _cache[1] || (_cache[1] = withModifiers(() => {
                    }, ["stop"])),
                    class: "flex flex-col flex-col-center-center"
                  }, [
                    createVNode(tmIcon, {
                      lineHeight: 11,
                      onClick: ($event) => headerClick(item.key, item.sort),
                      _class: item.sortType == "asce" || item.sortType == "none" ? "" : "opacity-6",
                      "font-size": 20,
                      name: "tmicon-sort-up"
                    }, null, 8, ["onClick", "_class"]),
                    createVNode(tmIcon, {
                      lineHeight: 11,
                      onClick: ($event) => headerClick(item.key, item.sort),
                      _class: item.sortType == "desc" || item.sortType == "none" ? "" : "opacity-6",
                      "font-size": 20,
                      name: "tmicon-sort-down"
                    }, null, 8, ["onClick", "_class"])
                  ])) : createCommentVNode("v-if", true)
                ], 6)
              ]),
              _: 2
            }, 1032, ["border", "color", "text", "_class", "height", "width", "onClick"]);
          }), 128))
        ], 46, ["enableFlex", "scrollLeft"])) : createCommentVNode("v-if", true),
        createElementVNode("scroll-view", {
          scrollWithAnimation: false,
          enableFlex: isNvue.value,
          class: normalizeClass([isNvue.value ? "flex-col flex" : ""]),
          scrollY: true,
          style: normalizeStyle([unref(defaultProps).height ? { height: `${unref(defaultProps).height}rpx` } : "", { width: `${unref(defaultProps).width}rpx` }])
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_tabel.value, (item2, index2) => {
            return openBlock(), createElementBlock("scroll-view", {
              scrollWithAnimation: false,
              onScroll: ($event) => headerScroll($event, index2),
              onTouchstart: ($event) => touchStartScroll(index2),
              onMouseup: ($event) => touchStartScroll(index2),
              scrollLeft: tableLeft.value[index2],
              showScrollbar: false,
              enableFlex: isNvue.value,
              class: normalizeClass([isNvue.value ? "flex-row flex" : ""]),
              scrollX: true,
              style: normalizeStyle([
                { width: `${unref(defaultProps).width}rpx` }
              ]),
              key: index2,
              margin: [0, 0]
            }, [
              createElementVNode("view", { class: "flex flex-row flex-nowrap" }, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(item2.data, (item, index) => {
                  return openBlock(), createBlock(tmSheet, {
                    border: unref(_showBottomBorder) ? 1 : 0,
                    "border-direction": "bottom",
                    key: index,
                    margin: [0, 0],
                    color: item.color,
                    text: item.light,
                    _class: "flex " + item2.align,
                    height: unref(defaultProps).cellHeight - 6,
                    width: item.width - 10,
                    padding: [10, 6]
                  }, {
                    default: withCtx(() => {
                      var _a;
                      return [
                        item.type == "text" ? (openBlock(), createBlock(tmText, {
                          key: 0,
                          "font-size": 24,
                          label: item.text
                        }, null, 8, ["label"])) : createCommentVNode("v-if", true),
                        item.type == "button" ? (openBlock(), createBlock(TmButton, {
                          key: 1,
                          onClick: ($event) => rowClick(index2, index),
                          margin: [0, 0],
                          size: "small",
                          color: (_a = _col.value[index]) == null ? void 0 : _a.bgColor,
                          width: item.width - 16,
                          "font-size": 24,
                          label: item.text
                        }, null, 8, ["onClick", "color", "width", "label"])) : createCommentVNode("v-if", true)
                      ];
                    }),
                    _: 2
                  }, 1032, ["border", "color", "text", "_class", "height", "width"]);
                }), 128))
              ])
            ], 46, ["onScroll", "onTouchstart", "onMouseup", "scrollLeft", "enableFlex"]);
          }), 128))
        ], 14, ["enableFlex"])
      ]);
    };
  }
});
var tmTable = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-table/tm-table.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "table",
  setup(__props) {
    const header = ref([
      { title: "\u652F\u4ED8\u65F6\u95F4", bgColor: "green", width: 120, key: "paytime" },
      { title: "\u672A\u4ED8\u8BA2\u91D1", bgColor: "green", width: 150, key: "unpayamount", sort: true },
      { title: "\u5907\u6CE8", bgColor: "yellow", width: 160, key: "desc" },
      { title: "\u5BA1\u6838", bgColor: "green", cellColor: "red", width: 100, key: "status" },
      { title: "\u5DF2\u4ED8\u8BA2\u91D1", bgColor: "green", width: 150, key: "amount" }
    ]);
    const tableData = ref([
      {
        data: {
          unpayamount: 100,
          paytime: "2022/2/5",
          amount: "100",
          desc: "\u6CA1\u6709",
          status: "\u901A\u8FC7"
        }
      },
      {
        data: {
          unpayamount: 25,
          paytime: {
            text: "\u83B7\u53D6",
            type: "button"
          },
          amount: "100",
          desc: {
            text: "\u597D\u5427",
            color: "orange",
            light: true
          },
          status: "\u901A\u8FC7"
        }
      },
      {
        data: {
          unpayamount: 36,
          paytime: "2022/2/5",
          amount: "100",
          desc: {
            text: "\u563F",
            type: "button"
          },
          status: "\u901A\u8FC7"
        }
      },
      {
        color: "green",
        light: true,
        data: {
          unpayamount: 200,
          paytime: "2022/2/5",
          amount: "100",
          desc: "\u6CA1\u6709",
          status: "\u901A\u8FC7"
        }
      },
      {
        data: {
          unpayamount: 80,
          paytime: "2022/2/5",
          amount: {
            text: "100"
          },
          desc: "\u6CA1\u6709",
          status: "\u901A\u8FC7"
        }
      },
      {
        data: {
          unpayamount: {
            text: 180,
            color: "green"
          },
          paytime: "2022/2/5",
          amount: "100",
          desc: "\u6CA1\u6709",
          status: "\u901A\u8FC7"
        }
      },
      {
        data: {
          unpayamount: 20,
          paytime: "2022/2/5",
          amount: "100",
          desc: "\u6CA1\u6709",
          status: "\u901A\u8FC7"
        }
      },
      {
        data: {
          unpayamount: 35,
          paytime: "2022/2/5",
          amount: "100",
          desc: "\u6CA1\u6709",
          status: "\u901A\u8FC7"
        }
      },
      {
        data: {
          unpayamount: 40,
          paytime: "2022/2/5",
          amount: "100",
          desc: "\u6CA1\u6709",
          status: "\u901A\u8FC7"
        }
      }
    ]);
    function onClick(row, col) {
      formatAppLog("log", "at pages/showdata/table.nvue:125", row);
      uni.$tm.u.toast("\u884C:" + String(row) + ",\u5217" + String(col));
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(tmApp, null, {
        default: withCtx(() => [
          createVNode(tmSheet, null, {
            default: withCtx(() => [
              createVNode(tmText, {
                "font-size": 24,
                _class: "font-weight-b",
                label: "\u57FA\u7840\u793A\u4F8B,\u66F4\u591A\u89C1\u6587\u6863"
              }),
              createVNode(tmDivider),
              createVNode(tmTable, {
                onRowClick: onClick,
                height: 450,
                width: 638,
                "table-data": tableData.value,
                header: header.value
              }, null, 8, ["table-data", "header"])
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
});
var table = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/showdata/table.nvue"]]);
export { table as default };
