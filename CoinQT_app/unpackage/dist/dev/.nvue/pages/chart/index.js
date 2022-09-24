import { defineComponent, ref, openBlock, createElementBlock, createVNode, withCtx, createElementVNode, Fragment, renderList, createBlock } from "vue";
import { _ as _export_sfc, t as tmApp, a as tmText } from "../../tm-text.js";
import { t as tmRow, a as tmCol } from "../../tm-col.js";
import { t as tmIcon } from "../../tm-icon.js";
import { t as tmImage } from "../../tm-image.js";
import "pinia";
import "../../tm-sheet.js";
import "../../tm-translate.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  setup(__props) {
    const list = ref([
      { path: "/pages/chart/chart?key=lineChart", title: "lineChart", img: "https://cdn.tmui.design/public/echart/lineChart.jpg" },
      { path: "/pages/chart/chart?key=areaChart", title: "areaChart", img: "https://cdn.tmui.design/public/echart/areaChart.jpg" },
      { path: "/pages/chart/chart?key=areaChart2", title: "areaChart2", img: "https://cdn.tmui.design/public/echart/areaChart2.jpg" },
      { path: "/pages/chart/chart?key=bar", title: "bar", img: "https://cdn.tmui.design/public/echart/bar.jpg" },
      { path: "/pages/chart/chart?key=pie", title: "pie", img: "https://cdn.tmui.design/public/echart/pie.jpg" },
      { path: "/pages/chart/chart?key=sca", title: "sca", img: "https://cdn.tmui.design/public/echart/sca.jpg" },
      { path: "/pages/chart/chart?key=gau", title: "gau", img: "https://cdn.tmui.design/public/echart/gau.jpg" }
    ]);
    function navto(index2) {
      uni.navigateTo({
        url: list.value[index2].path
      });
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
            createElementVNode("view", { class: "ma-32" }, [
              createVNode(tmRow, {
                width: 686,
                column: 2,
                transprent: "",
                gutter: 10
              }, {
                default: withCtx(() => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(list.value, (item, index2) => {
                    return openBlock(), createBlock(tmCol, {
                      onClick: ($event) => navto(index2),
                      _class: "mb-10 round-2",
                      key: index2,
                      height: 280
                    }, {
                      default: withCtx(() => [
                        createVNode(tmImage, {
                          src: item.img,
                          width: 310,
                          height: 220
                        }, null, 8, ["src"]),
                        createVNode(tmText, {
                          label: "\u56FE\u8868" + item.title,
                          _class: "py-12"
                        }, null, 8, ["label"])
                      ]),
                      _: 2
                    }, 1032, ["onClick"]);
                  }), 128)),
                  createVNode(tmCol, {
                    _class: "mb-10 round-2",
                    height: 280
                  }, {
                    default: withCtx(() => [
                      createVNode(tmIcon, { name: "tmicon-plus" }),
                      createVNode(tmText, {
                        label: "\u66F4\u591A\u89C1Echarts\u5B98\u7F51",
                        _class: "py-12"
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ])
          ]),
          _: 1
        })
      ]);
    };
  }
});
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/chart/index.nvue"]]);
export { index as default };
