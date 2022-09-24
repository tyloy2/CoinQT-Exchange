import { _ as _export_sfc, a as tmText, t as tmApp, g as formatAppLog } from "../../tm-text.js";
import { defineComponent, ref, computed, onMounted, nextTick, watch, openBlock, createElementBlock, normalizeClass, unref, normalizeStyle, createCommentVNode, createElementVNode, Fragment, renderList, createBlock, mergeProps, withCtx, withModifiers, createVNode, renderSlot } from "vue";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmIcon } from "../../tm-icon.js";
import { t as tmDivider } from "../../tm-divider.js";
import { T as TmButton } from "../../tm-button.js";
import { t as tmTag } from "../../tm-tag.js";
import { T as TmSwitch } from "../../tm-switch.js";
import "pinia";
import "../../tm-translate.js";
var _style_0 = { "flex-nowrap": { "": { "flexWrap": "nowrap" } } };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "tm-data-table",
  props: {
    showHeader: {
      type: Boolean,
      default: true
    },
    columns: {
      type: Array,
      default: () => []
    },
    data: {
      type: Object || Array,
      default: () => []
    },
    width: {
      type: Number
    },
    height: {
      type: Number
    },
    cellHeight: {
      type: Number
    },
    headerHeight: {
      type: Number
    },
    unit: {
      type: String,
      default: "rpx"
    },
    showBottomBorder: {
      type: Boolean,
      default: true
    }
  },
  emits: ["sorter"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const isNvue = ref(false);
    ref("");
    ref(0);
    ref(0);
    const columnsList = ref([]), sortKeys = ref({});
    isNvue.value = true;
    const defaultProps = computed(() => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i;
      if (props.unit == "px") {
        return {
          width: (_a = props.width) != null ? _a : 750,
          height: (_b = props.height) != null ? _b : 0,
          cellHeight: (_c = props.cellHeight) != null ? _c : 0,
          headerHeight: (_d = props.headerHeight) != null ? _d : 44,
          unit: props.unit
        };
      }
      return {
        width: (_e = props.width) != null ? _e : 750,
        height: (_f = props.height) != null ? _f : 0,
        cellHeight: (_g = props.cellHeight) != null ? _g : 0,
        headerHeight: (_h = props.headerHeight) != null ? _h : 88,
        unit: (_i = props.unit) != null ? _i : "rpx"
      };
    });
    onMounted(() => {
      nextTick(() => setColData());
    });
    watch([() => props.data, () => props.columns], () => {
      setColData();
    }, { deep: true });
    const _columns = computed(() => {
      return JSON.parse(JSON.stringify(props.columns));
    });
    computed(() => {
      return props.data;
    });
    function setColData() {
      var _a, _b;
      columnsList.value = [];
      let colWidthNum = 0, colWidth = 0, colNum = _columns.value.length, cellWidth = 0;
      (_a = _columns.value) == null ? void 0 : _a.forEach((item) => {
        if (item.width) {
          colWidthNum += 1;
          colWidth += item.width;
        }
      });
      if (defaultProps.value.width > colWidth) {
        cellWidth = parseFloat(String((defaultProps.value.width - colWidth) / (colNum - colWidthNum))).toFixed(2) - 0;
      }
      (_b = _columns.value) == null ? void 0 : _b.forEach((col, index) => {
        var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u;
        const _minWidth = (_a2 = col.minWidth) != null ? _a2 : 0, _width = (_b2 = col.width) != null ? _b2 : 0;
        let _parseWidth = _width;
        if (_width === 0) {
          _parseWidth = cellWidth > _minWidth ? cellWidth : _minWidth;
        }
        if (col == null ? void 0 : col.headerProps) {
          col.headerProps.border = props.showBottomBorder ? 1 : 0;
          col.headerProps.color = (_c = col.headerProps.color) != null ? _c : col.bgColor;
          col.headerProps.text = (_d = col.headerProps.text) != null ? _d : col.light;
          col.headerProps._class = (_e = col.headerProps._class) != null ? _e : `flex-col-center-${col.align || "center"}`;
          col.headerProps.margin = (_f = col.headerProps.margin) != null ? _f : [0, 0];
          col.headerProps.padding = (_g = col.headerProps.padding) != null ? _g : [10, 6];
          col.headerProps.height = (_h = col.headerProps.height) != null ? _h : defaultProps.value.headerHeight - (defaultProps.value.unit == "rpx" ? col.headerProps.padding[1] * 4 : uni.upx2px(col.headerProps.padding[1] * 4));
          col.headerProps.width = (_i = col.headerProps.width) != null ? _i : (_parseWidth == 0 ? 44 : _parseWidth) - (defaultProps.value.unit == "rpx" ? col.headerProps.padding[0] * 2 : uni.upx2px(col.headerProps.padding[0] * 2));
          col.headerProps.unit = (_j = col.headerProps.unit) != null ? _j : defaultProps.value.unit;
          col.headerProps.borderDirection = "bottom";
        } else {
          col.headerProps = {
            border: props.showBottomBorder ? 1 : 0,
            borderDirection: "bottom",
            color: col.bgColor,
            text: col.light,
            _class: `flex-col-center-${col.align || "center"}`,
            height: defaultProps.value.headerHeight - (defaultProps.value.unit == "rpx" ? 24 : uni.upx2px(24)),
            width: _parseWidth - (defaultProps.value.unit == "rpx" ? 40 : uni.upx2px(40)),
            margin: [0, 0],
            padding: [10, 6],
            unit: defaultProps.value.unit
          };
        }
        col._headerProps = {
          width: col.headerProps.width - (col.headerProps.unit == "rpx" ? col.headerProps.padding[0] * 2 : uni.upx2px(col.headerProps.padding[0] * 2)),
          height: col.headerProps.height - (col.headerProps.unit == "rpx" ? col.headerProps.padding[1] * 2 : uni.upx2px(col.headerProps.padding[1] * 2)),
          fontSize: (_k = col.headerFontSize) != null ? _k : col.headerProps.unit == "rpx" ? 26 : 14
        };
        if (col == null ? void 0 : col.cellProps) {
          col.cellProps.border = props.showBottomBorder ? 1 : 0;
          col.cellProps.color = (_l = col.cellProps.color) != null ? _l : col.cellColor;
          col.cellProps.text = (_m = col.cellProps.text) != null ? _m : col.light;
          col.cellProps._class = (_n = col.cellProps._class) != null ? _n : `flex-col-center-${col.align || "center"}`;
          col.cellProps.margin = (_o = col.cellProps.margin) != null ? _o : [0, 0];
          col.cellProps.padding = (_p = col.cellProps.padding) != null ? _p : [10, 6];
          col.cellProps.height = (_q = col.cellProps.height) != null ? _q : defaultProps.value.cellHeight;
          col.cellProps.width = (_r = col.cellProps.width) != null ? _r : _parseWidth == 0 ? 44 : _parseWidth;
          col.cellProps.unit = (_s = col.cellProps.unit) != null ? _s : defaultProps.value.unit;
          col.cellProps.borderDirection = "bottom";
        } else {
          col.cellProps = {
            border: props.showBottomBorder ? 1 : 0,
            borderDirection: "bottom",
            color: col.cellColor,
            text: col.light,
            _class: `flex-col-center-${col.align || "center"}`,
            height: defaultProps.value.cellHeight > 0 ? defaultProps.value.cellHeight - (defaultProps.value.unit == "rpx" ? 24 : uni.upx2px(24)) : 0,
            width: (_parseWidth == 0 ? 44 : _parseWidth) - (defaultProps.value.unit == "rpx" ? 40 : uni.upx2px(40)),
            margin: [0, 0],
            padding: [10, 6],
            unit: defaultProps.value.unit
          };
        }
        col._cellProps = {
          width: col.cellProps.width - (col.cellProps.unit == "rpx" ? col.cellProps.padding[0] * 2 : uni.upx2px(col.cellProps.padding[0] * 2)),
          height: col.cellProps.height > 0 ? col.cellProps.height - (col.cellProps.unit == "rpx" ? col.cellProps.padding[1] * 2 : uni.upx2px(col.cellProps.padding[1] * 2)) : 0,
          fontSize: (_t = col.fontSize) != null ? _t : col.cellProps.unit == "rpx" ? 24 : 13
        };
        col.ellipsis = (_u = col.ellipsis) != null ? _u : false;
        columnsList.value.push(col);
      });
    }
    function headerClick(key, sort) {
      if (sort) {
        if (!sortKeys.value[key] || sortKeys.value[key] == "none") {
          sortKeys.value[key] = "desc";
          dataSort(key, "desc");
        } else if (sortKeys.value[key] == "desc") {
          sortKeys.value[key] = "asc";
          dataSort(key, "asc");
        } else if (sortKeys.value[key] == "asc") {
          sortKeys.value[key] = "none";
          dataSort(key, "none");
        }
        emits("sorter", sortKeys.value);
      }
    }
    function dataSort(key, order = "none") {
      uni.showLoading({
        title: "...",
        mask: true
      });
      if (order == "none" || key === "") {
        setColData();
        uni.hideLoading();
        return;
      }
      if (order == "desc") {
        props.data.sort((a, b) => {
          if (typeof a[key] === "number" && typeof b[key] === "number") {
            return a[key] - b[key];
          } else if (typeof a[key] === "string" && typeof b[key] === "string") {
            return a[key].localeCompare(b[key]);
          }
        });
      }
      if (order == "asc") {
        props.data.sort((b, a) => {
          if (typeof a[key] === "number" && typeof b[key] === "number") {
            return a[key] - b[key];
          } else if (typeof a[key] === "string" && typeof b[key] === "string") {
            return a[key].localeCompare(b[key]);
          }
        });
      }
      nextTick(() => {
        uni.hideLoading();
      });
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", { renderWhole: true }, [
        __props.showHeader ? (openBlock(), createElementBlock("scroll-view", {
          key: 0,
          enableFlex: isNvue.value,
          class: normalizeClass([isNvue.value ? "flex-row flex" : "tableHeader relative"]),
          scrollX: true,
          scrollWithAnimation: false,
          showScrollbar: "",
          scrollY: unref(defaultProps).height > 0,
          style: normalizeStyle([unref(defaultProps).height ? { height: `${unref(defaultProps).height} ${unref(defaultProps).unit}` } : "", { width: `${unref(defaultProps).width}${unref(defaultProps).unit}` }])
        }, [
          createCommentVNode("============ S \u5934\u90E8\u533A\u57DF ============= "),
          createElementVNode("view", {
            class: "flex-1 flex flex-row flex-nowrap absolute zIndex-6",
            style: normalizeStyle({ height: `${unref(defaultProps).headerHeight}${unref(defaultProps).unit}` })
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(columnsList.value, (item, index) => {
              return openBlock(), createBlock(tmSheet, mergeProps(item.headerProps, {
                key: index,
                onClick: ($event) => headerClick(item.key, item.sort)
              }), {
                default: withCtx(() => [
                  createElementVNode("view", {
                    userInteractionEnabled: false,
                    style: normalizeStyle({ width: `${item._headerProps.width}${item.headerProps.unit}`, height: unref(defaultProps).headerHeight - 6 + "rpx" }),
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
                        "font-size": item._headerProps.fontSize,
                        unit: item.headerProps.unit,
                        _class: "text-weight-b text-align-center",
                        label: item.title
                      }, null, 8, ["onClick", "font-size", "unit", "label"])
                    ]),
                    item.sort ? (openBlock(), createElementBlock("view", {
                      key: 0,
                      onClick: _cache[1] || (_cache[1] = withModifiers(() => {
                      }, ["stop"])),
                      class: "flex flex-col flex-col-center-center"
                    }, [
                      createVNode(tmIcon, {
                        "line-height": item._headerProps.fontSize * 0.5,
                        onClick: ($event) => headerClick(item.key, item.sort),
                        _class: sortKeys.value[item.key] == "asc" || sortKeys.value[item.key] == "none" || !sortKeys.value[item.key] ? "" : "opacity-6",
                        "font-size": item._headerProps.fontSize * 0.7,
                        unit: item.headerProps.unit,
                        name: "tmicon-sort-up"
                      }, null, 8, ["line-height", "onClick", "_class", "font-size", "unit"]),
                      createVNode(tmIcon, {
                        "line-height": item._headerProps.fontSize * 0.5,
                        onClick: ($event) => headerClick(item.key, item.sort),
                        _class: sortKeys.value[item.key] == "desc" || sortKeys.value[item.key] == "none" || !sortKeys.value[item.key] ? "" : "opacity-6",
                        "font-size": item._headerProps.fontSize * 0.7,
                        unit: item.headerProps.unit,
                        name: "tmicon-sort-down"
                      }, null, 8, ["line-height", "onClick", "_class", "font-size", "unit"])
                    ])) : createCommentVNode("v-if", true)
                  ], 6)
                ]),
                _: 2
              }, 1040, ["onClick"]);
            }), 128))
          ], 4),
          createCommentVNode("============ E \u5934\u90E8\u533A\u57DF ============= "),
          createCommentVNode("============ S \u5185\u5BB9\u533A\u57DF ============= "),
          createElementVNode("view", {
            style: normalizeStyle({ paddingTop: `${unref(defaultProps).headerHeight}${unref(defaultProps).unit}` })
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(__props.data, (cell, cellIndex) => {
              return openBlock(), createElementBlock("view", {
                class: "flex flex-row flex-nowrap",
                key: cellIndex,
                margin: [0, 0]
              }, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(columnsList.value, (col, colIndex) => {
                  return openBlock(), createBlock(tmSheet, mergeProps(col.cellProps, {
                    key: cellIndex + colIndex
                  }), {
                    default: withCtx(() => {
                      var _a;
                      return [
                        col.slot ? renderSlot(_ctx.$slots, col.slot, {
                          key: 0,
                          record: cell,
                          index: cellIndex,
                          rowIndex: colIndex
                        }) : (openBlock(), createBlock(tmText, {
                          key: 1,
                          fontSize: col._cellProps.fontSize,
                          unit: unref(defaultProps).unit,
                          _class: col.ellipsis ? "text-overflow-1" : "",
                          label: (_a = cell[col.key]) != null ? _a : ""
                        }, null, 8, ["fontSize", "unit", "_class", "label"]))
                      ];
                    }),
                    _: 2
                  }, 1040);
                }), 128))
              ]);
            }), 128))
          ], 4),
          createCommentVNode("============ E \u5185\u5BB9\u533A\u57DF ============= ")
        ], 14, ["enableFlex", "scrollY"])) : createCommentVNode("v-if", true)
      ]);
    };
  }
});
var TmDataTable = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["styles", [_style_0]], ["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-data-table/tm-data-table.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "datatable",
  setup(__props) {
    const columns = ref([
      { title: "\u64CD\u4F5C", bgColor: "grey-4", width: 140, unit: "px", key: "operation", cellColor: "grey-4", slot: "operationSlot" },
      { title: "\u672A\u4ED8\u8BA2\u91D1", bgColor: "blue", width: 120, key: "unpayamount", cellColor: "blue", sort: true },
      { title: "\u5907\u6CE8", bgColor: "grey-4", minWidth: 100, key: "desc", ellipsis: true },
      { title: "\u5BA1\u6838", bgColor: "grey-4", width: 120, key: "status", sort: true, slot: "statusSlot" },
      { title: "\u663E\u793A", bgColor: "grey-4", width: 120, key: "show", sort: true, slot: "showSlot" },
      { title: "\u5DF2\u4ED8\u8BA2\u91D1", bgColor: "grey-4", width: 150, key: "amount", slot: "amountSlot" },
      { title: "\u652F\u4ED8\u65F6\u95F4", bgColor: "grey-4", width: 160, key: "createTime", sort: true }
    ]);
    const { windowWidth, windowHeight, statusBarHeight } = uni.getSystemInfoSync();
    const tableWidth = computed(() => {
      return windowWidth - uni.upx2px(55) * 2;
    });
    const tableData = computed(() => {
      return [
        {
          unpayamount: Math.floor(Math.random() * 1e3),
          amount: Math.floor(Math.random() * 1e3),
          desc: `\u6211\u662F\u63CF\u8FF0`,
          status: 1,
          show: 0,
          createTime: "2020-08-02 18:11:00"
        },
        {
          unpayamount: Math.floor(Math.random() * 1e3),
          amount: -Math.floor(Math.random() * 1e3),
          desc: `\u6211\u662F\u63CF\u8FF0`,
          status: 0,
          show: 1,
          createTime: "2020-08-01 13:25:00"
        },
        {
          unpayamount: Math.floor(Math.random() * 1e3),
          amount: Math.floor(Math.random() * 1e3),
          desc: `\u6211\u662F\u63CF\u8FF0`,
          status: 0,
          show: 0,
          createTime: "2020-08-02 18:11:00"
        },
        {
          unpayamount: Math.floor(Math.random() * 1e3),
          amount: -Math.floor(Math.random() * 1e3),
          desc: `\u6211\u662F\u63CF\u8FF0`,
          status: 0,
          show: 1,
          createTime: "2020-08-01 13:25:00"
        },
        {
          unpayamount: Math.floor(Math.random() * 1e3),
          amount: Math.floor(Math.random() * 1e3),
          desc: `\u6211\u662F\u63CF\u8FF0`,
          status: 1,
          show: 1,
          createTime: "2020-08-02 18:11:00"
        },
        {
          unpayamount: Math.floor(Math.random() * 1e3),
          amount: -Math.floor(Math.random() * 1e3),
          desc: `\u6211\u662F\u63CF\u8FF0`,
          status: 0,
          show: 1,
          createTime: "2020-08-01 13:25:00"
        }
      ];
    });
    function handleButton(type, record, index, rowIndex) {
      formatAppLog("log", "at pages/showdata/datatable.nvue:111", record);
      uni.$tm.u.toast(`\u6309\u94AE\u7C7B\u578B\uFF1A${type},\u884C\uFF1A${String(index)}\uFF0C\u5217\uFF1A${String(rowIndex)}`);
    }
    function handleSwitch(value, record, index, rowIndex) {
      record.show = value ? 1 : 0;
      uni.$tm.u.toast(`\u70B9\u51FB\u4E86\uFF1A\u5F00\u5173\u6309\u94AE,\u884C\uFF1A${String(index)}\uFF0C\u5217\uFF1A${String(rowIndex)}`);
    }
    function handleSort(options) {
      formatAppLog("log", "at pages/showdata/datatable.nvue:119", options);
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
              createVNode(TmDataTable, {
                height: 0,
                width: unref(tableWidth),
                unit: "px",
                data: unref(tableData),
                columns: columns.value,
                onSorter: handleSort
              }, {
                operationSlot: withCtx(({ record, index, rowIndex }) => [
                  createElementVNode("view", { class: "flex flex-row" }, [
                    createVNode(TmButton, {
                      label: "\u7F16\u8F91",
                      size: "small",
                      unit: "px",
                      onClick: ($event) => handleButton("edit", record, index, rowIndex)
                    }, null, 8, ["onClick"]),
                    createVNode(TmButton, {
                      label: "\u5220\u9664",
                      color: "red",
                      style: { "margin-left": "10px" },
                      size: "small",
                      unit: "px",
                      onClick: ($event) => handleButton("del", record, index, rowIndex)
                    }, null, 8, ["onClick"])
                  ])
                ]),
                amountSlot: withCtx(({ record, index, rowIndex }) => [
                  createVNode(tmText, {
                    label: record.amount,
                    unit: "px",
                    fontSize: 13,
                    color: record.amount > 0 ? "green" : "red"
                  }, null, 8, ["label", "color"])
                ]),
                statusSlot: withCtx(({ record, index, rowIndex }) => [
                  record.status == 1 ? (openBlock(), createBlock(tmTag, {
                    key: 0,
                    color: "green",
                    size: "s",
                    label: "\u5DF2\u5BA1\u6838"
                  })) : (openBlock(), createBlock(tmTag, {
                    key: 1,
                    color: "red",
                    size: "s",
                    label: "\u5F85\u5BA1\u6838"
                  }))
                ]),
                showSlot: withCtx(({ record, index, rowIndex }) => [
                  createVNode(TmSwitch, {
                    size: "mini",
                    color: "green",
                    defaultValue: record.show === 1,
                    margin: [12, 0],
                    onChange: ($event) => handleSwitch($event, record, index, rowIndex)
                  }, null, 8, ["defaultValue", "onChange"])
                ]),
                _: 1
              }, 8, ["width", "data", "columns"])
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
});
var datatable = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/showdata/datatable.nvue"]]);
export { datatable as default };
