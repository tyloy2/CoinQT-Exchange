import { defineComponent, ref, computed, onMounted, openBlock, createElementBlock, createElementVNode, normalizeStyle, unref, createBlock, withCtx, createCommentVNode, createVNode, renderSlot, Fragment, renderList } from "vue";
import { _ as _export_sfc, a as tmText, t as tmApp } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmImage } from "../../tm-image.js";
import { t as tmIcon } from "../../tm-icon.js";
import { t as tmDivider } from "../../tm-divider.js";
import "pinia";
import "../../tm-translate.js";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "tm-virtual-list",
  props: {
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 500
    },
    itemHeight: {
      type: Number,
      default: 0,
      required: true
    },
    data: {
      type: Array,
      default: () => []
    },
    load: {
      type: [Function, Boolean],
      default: () => true
    },
    firstLoad: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: "primary"
    }
  },
  emits: ["pullEnd", "pullStart", "status"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const rowHeight = uni.upx2px(props.itemHeight);
    const rootHeight = uni.upx2px(props.height);
    const scrollTop = ref(0);
    const renderAhead = 2;
    const rowCount = computed(() => props.data.length);
    const childPositions = computed(() => {
      const results = [0];
      for (let i = 1; i < rowCount.value; i++) {
        results.push(results[i - 1] + rowHeight);
      }
      return results;
    });
    const totalHeight = computed(() => {
      return rowCount.value ? childPositions.value[rowCount.value - 1] + rowHeight : 0;
    });
    const firstVisibleNode = computed(() => findStartNode());
    const startNode = computed(() => Math.max(0, firstVisibleNode.value - renderAhead));
    const lastVisibleNode = computed(() => findEndNode());
    const endNode = computed(() => Math.min(rowCount.value - 1, lastVisibleNode.value + renderAhead));
    const visibleNodeCount = computed(() => endNode.value - startNode.value + 1);
    const offsetY = computed(() => childPositions.value[startNode.value]);
    const visibleItems = computed(() => {
      return props.data.slice(startNode.value, startNode.value + visibleNodeCount.value);
    });
    const Loading = ref(false);
    const pullType = ref("");
    const status = ref("never");
    function findStartNode() {
      let startRange = 0;
      let endRange = rowCount.value ? rowCount.value - 1 : rowCount.value;
      while (endRange !== startRange) {
        const middle = Math.floor((endRange - startRange) / 2 + startRange);
        if (childPositions.value[middle] <= scrollTop.value && childPositions.value[middle + 1] > scrollTop.value) {
          return middle;
        }
        if (middle === startRange) {
          return endRange;
        }
        if (childPositions.value[middle] <= scrollTop.value) {
          startRange = middle;
        } else {
          endRange = middle;
        }
      }
      return rowCount.value;
    }
    function findEndNode() {
      let endNode2;
      for (endNode2 = firstVisibleNode.value; endNode2 < rowCount.value; endNode2++) {
        if (childPositions.value[endNode2] > childPositions.value[firstVisibleNode.value] + rootHeight) {
          return endNode2;
        }
      }
      return endNode2;
    }
    function scroll(e) {
      let detail = e.detail;
      scrollTop.value = detail.scrollTop;
      if (Math.ceil(scrollTop.value) < -80) {
        pullStart();
      }
      if (Math.ceil(scrollTop.value) >= 0 && status.value == "error") {
        Loading.value = false;
      }
    }
    const pullStart = async (e) => {
      emits("pullStart");
      if (typeof props.load === "function") {
        if (Loading.value)
          return;
        pullType.value = "top";
        Loading.value = true;
        status.value = "loading";
        let p = await props.load("top");
        if (typeof p === "function") {
          p = await p("top");
        }
        if (!p) {
          status.value = "error";
          return;
        }
        Loading.value = false;
        status.value = "success";
      }
    };
    const pullEnd = async (e) => {
      emits("pullEnd");
      if (typeof props.load === "function") {
        if (Loading.value)
          return;
        pullType.value = "bottom";
        Loading.value = true;
        status.value = "loading";
        let p = await props.load("bottom");
        if (typeof p === "function") {
          p = await p("bottom");
        }
        if (!p) {
          status.value = "error";
          return;
        }
        Loading.value = false;
        status.value = "success";
      }
    };
    const reset = function(e) {
      Loading.value = false;
      if (e == "pullEnd") {
        pullEnd();
      } else {
        pullStart();
      }
    };
    onMounted(() => {
      if (props.firstLoad) {
        pullStart();
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        class: "flex flex-col",
        renderWhole: true
      }, [
        createElementVNode("scroll-view", {
          refresherTriggered: Loading.value,
          onScrolltolower: pullEnd,
          scrollWithAnimation: true,
          onScroll: scroll,
          scrollY: true,
          style: normalizeStyle([{ height: unref(rootHeight) + "px", "overflow-anchor": "auto", width: `${props.width}rpx` }])
        }, [
          Loading.value && pullType.value == "top" ? (openBlock(), createBlock(tmSheet, {
            key: 0,
            height: 40,
            unit: "px",
            margin: [0, 0],
            _class: "flex flex-col flex-col-center-center"
          }, {
            default: withCtx(() => [
              status.value == "loading" ? (openBlock(), createBlock(tmIcon, {
                key: 0,
                color: props.color,
                "font-size": 24,
                spin: "",
                name: "tmicon-loading"
              }, null, 8, ["color"])) : createCommentVNode("v-if", true),
              status.value == "error" ? (openBlock(), createElementBlock("view", {
                key: 1,
                onClick: _cache[0] || (_cache[0] = ($event) => reset("pullTop")),
                class: "flex flex-row flex-center"
              }, [
                createVNode(tmIcon, {
                  userInteractionEnabled: false,
                  color: "red",
                  "font-size": 24,
                  name: "tmicon-times-circle-fill"
                }),
                createVNode(tmText, {
                  userInteractionEnabled: false,
                  color: "red",
                  "font-size": 24,
                  _class: "pl-16",
                  label: "\u52A0\u8F7D\u5931\u8D25,\u70B9\u6211\u91CD\u8BD5"
                })
              ])) : createCommentVNode("v-if", true)
            ]),
            _: 1
          })) : createCommentVNode("v-if", true),
          createElementVNode("view", {
            class: "flex flex-col relative",
            style: normalizeStyle([{ height: unref(totalHeight) + "px" }])
          }, [
            createElementVNode("view", {
              class: "absolute l-0 t-0 flex flex-col",
              style: normalizeStyle({ transform: `translateY(${unref(offsetY)}px)`, width: `${props.width}rpx` })
            }, [
              renderSlot(_ctx.$slots, "default", { data: unref(visibleItems) })
            ], 4)
          ], 4),
          Loading.value && pullType.value == "bottom" ? (openBlock(), createBlock(tmSheet, {
            key: 1,
            height: 40,
            unit: "px",
            margin: [0, 0],
            _class: "flex flex-col flex-col-center-center"
          }, {
            default: withCtx(() => [
              status.value == "loading" ? (openBlock(), createBlock(tmIcon, {
                key: 0,
                color: props.color,
                "font-size": 24,
                spin: "",
                name: "tmicon-loading"
              }, null, 8, ["color"])) : createCommentVNode("v-if", true),
              status.value == "error" ? (openBlock(), createElementBlock("view", {
                key: 1,
                onClick: _cache[1] || (_cache[1] = ($event) => reset("pullEnd")),
                class: "flex flex-row flex-center"
              }, [
                createVNode(tmIcon, {
                  userInteractionEnabled: false,
                  color: "red",
                  "font-size": 24,
                  name: "tmicon-times-circle-fill"
                }),
                createVNode(tmText, {
                  userInteractionEnabled: false,
                  color: "red",
                  "font-size": 24,
                  _class: "pl-16",
                  label: "\u52A0\u8F7D\u5931\u8D25,\u70B9\u6211\u91CD\u8BD5"
                })
              ])) : createCommentVNode("v-if", true)
            ]),
            _: 1
          })) : createCommentVNode("v-if", true)
        ], 44, ["refresherTriggered"])
      ]);
    };
  }
});
var tmVirtualList = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-virtual-list/tm-virtual-list.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "virtual",
  setup(__props) {
    const imglist = ref([]);
    const getdata = (e) => {
      return new Promise((res, rej) => {
        setTimeout(function() {
          if (e == "top") {
            imglist.value = [];
            for (let i = 0; i < 10; i++) {
              imglist.value.push({ src: "https://picsum.photos/200/100?id=" + i, index: i });
            }
          } else if (e == "bottom") {
            let len = imglist.value.length;
            for (let i = len; i < 10 + len; i++) {
              imglist.value.push({ src: "https://picsum.photos/200/100?id=" + i, index: i });
            }
          }
          res(true);
        }, 2500);
      });
    };
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
                  label: "\u57FA\u7840\u793A\u4F8B,\u66F4\u591A\u89C1\u6587\u6863\uFF0C\u4EE5\u4E0B\u662F\u5C55\u793A\u4F60\u53EF\u4EE5\u65E0\u9650\u52A0\u8F7D\u56FE\u7247\u5217\u8868\uFF0C\u4F60\u5C06\u770B\u4E0D\u5230\u4EFB\u4F55\u5361\u987F\u6216\u8005\u963B\u585E\u3002\u8D85\u9AD8\u6027\u80FD\u7684\u865A\u62DF\u5217\u8868\u3002"
                }),
                createVNode(tmDivider),
                createElementVNode("view", { class: "flex flex-col flex-col-top-center" }, [
                  createVNode(tmVirtualList, {
                    load: getdata,
                    width: 626,
                    height: 900,
                    data: imglist.value,
                    itemHeight: 160
                  }, {
                    default: withCtx(({ data }) => [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(data, (item, index) => {
                        return openBlock(), createBlock(tmSheet, {
                          border: 1,
                          borderDirection: "bottom",
                          height: 160,
                          width: 626,
                          _class: "flex flex-row flex-row-center-start",
                          padding: [0, 0],
                          margin: [0, 0],
                          key: index
                        }, {
                          default: withCtx(() => [
                            createElementVNode("view", { class: "flex flex-row flex-row-center-between flex-1" }, [
                              createVNode(tmImage, {
                                width: 200,
                                height: 100,
                                src: item.src
                              }, null, 8, ["src"]),
                              createVNode(tmText, {
                                label: "image-Row-" + item.index
                              }, null, 8, ["label"])
                            ])
                          ]),
                          _: 2
                        }, 1024);
                      }), 128))
                    ]),
                    _: 1
                  }, 8, ["data"])
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
var virtual = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/showdata/virtual.nvue"]]);
export { virtual as default };
