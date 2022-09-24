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
import { defineComponent, computed, ref, toRaw, watch, openBlock, createBlock, unref, withCtx, createElementVNode, createCommentVNode, createElementBlock, Fragment, renderList, normalizeClass, createVNode, nextTick, inject } from "vue";
import { _ as _export_sfc, a as tmText, c as custom_props, u as useTmpiniaStore, e as computedDark } from "./tm-text.js";
import { t as tmDrawer } from "./tm-drawer.js";
import { t as tmSheet } from "./tm-sheet.js";
import { t as tmIcon } from "./tm-icon.js";
var _style_0$3 = { "keywordBoradAni": { "": { "transitionDuration": 100, "transitionTimingFunction": "linear", "transitionDelay": 0, "transitionProperty": "transform", "transform": "scale(0.85)" } }, "@TRANSITION": { "keywordBoradAni": { "duration": 100, "timingFunction": "linear", "delay": 0, "property": "transform" } } };
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "keyborad-number",
  props: {
    followTheme: {
      type: [Boolean, String],
      default: true
    },
    random: {
      type: Boolean,
      default: false
    },
    dark: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "primary"
    },
    decimal: {
      type: Boolean,
      default: false
    },
    showInputContent: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue", "change", "confirm"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const _dark = computed(() => props.dark);
    let defaultNum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "."];
    if (!props.decimal) {
      defaultNum.pop();
    }
    const numbersfc = ref(defaultNum);
    if (props.random) {
      numbersfc.value = shuffle(toRaw(numbersfc.value));
    }
    const numberArray = ref([]);
    numberArray.value = uni.$tm.u.splitData(toRaw(numbersfc.value), 3);
    const _value = ref(props.modelValue);
    function keydown(e) {
      let k = String(e);
      _value.value += k;
      emits("update:modelValue", _value.value);
      emits("change", props.modelValue);
    }
    function del() {
      if (_value.value == "" || _value.value.length == 0)
        return;
      _value.value = _value.value.substring(0, _value.value.length - 1);
      emits("update:modelValue", _value.value);
      emits("change", _value.value);
    }
    function confirm() {
      emits("confirm", _value.value);
    }
    function shuffle(arr = []) {
      var i = arr.length, t, j;
      while (--i) {
        j = Math.floor(Math.random() * i);
        t = arr[i];
        arr[i] = arr[j];
        arr[j] = t;
      }
      return arr;
    }
    watch(() => props.modelValue, () => {
      _value.value = props.modelValue;
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(tmSheet, {
        "follow-theme": false,
        "follow-dark": false,
        dark: unref(_dark),
        color: "white",
        transprent: true,
        padding: [4, 4],
        margin: [0, 0],
        _class: "flex flex-col",
        "paren-class": "flex-1"
      }, {
        default: withCtx(() => [
          createElementVNode("view", {
            class: "flex-center flex-row",
            style: { "height": "62rpx" }
          }, [
            !_value.value && !props.showInputConten ? (openBlock(), createBlock(tmText, {
              key: 0,
              "font-size": 28,
              _class: "text-weight-b",
              label: "\u5B89\u5168\u952E\u76D8\u653E\u5FC3\u8F93\u5165"
            })) : createCommentVNode("v-if", true),
            _value.value && props.showInputContent ? (openBlock(), createBlock(tmText, {
              key: 1,
              "font-size": 34,
              _class: "text-weight-b pr-24",
              label: _value.value
            }, null, 8, ["label"])) : createCommentVNode("v-if", true)
          ]),
          createElementVNode("view", { class: "flex flex-row" }, [
            createElementVNode("view", { class: "flex-5 flex flex-col" }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(numberArray.value, (item2, index2) => {
                return openBlock(), createElementBlock("view", {
                  class: "flex-row flex flex-1",
                  key: index2
                }, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(item2, (item, index) => {
                    return openBlock(), createBlock(tmSheet, {
                      "hover-class": "opacity-5 keywordBoradAni",
                      "no-level": "",
                      onClick: ($event) => keydown(item),
                      "follow-theme": false,
                      "follow-dark": false,
                      dark: unref(_dark),
                      round: 2,
                      height: 100,
                      _class: "flex-center",
                      padding: [0, 0],
                      margin: [4, 4],
                      key: index,
                      "paren-class": index2 == 3 && index == 0 ? "flex-3" : "flex-3",
                      class: normalizeClass(index2 == 3 && index == 0 ? "flex-5" : "flex-3")
                    }, {
                      default: withCtx(() => [
                        createElementVNode("view", {
                          style: { "width": "40rpx" },
                          class: "flex flex-center flex-row"
                        }, [
                          createVNode(tmText, {
                            userInteractionEnabled: false,
                            "font-size": 32,
                            _class: "text-weight-b",
                            label: item
                          }, null, 8, ["label"])
                        ])
                      ]),
                      _: 2
                    }, 1032, ["onClick", "dark", "paren-class", "class"]);
                  }), 128))
                ]);
              }), 128))
            ]),
            createElementVNode("view", { class: "flex-1 flex flex-col" }, [
              createElementVNode("view", { class: "flex flex-row" }, [
                createVNode(tmSheet, {
                  "hover-class": "opacity-5 keywordBoradAni",
                  "no-level": "",
                  height: 100,
                  onClick: del,
                  "follow-theme": false,
                  "follow-dark": false,
                  dark: unref(_dark),
                  color: "grey-1",
                  round: 2,
                  _class: "flex-center",
                  padding: [0, 0],
                  margin: [4, 4],
                  class: "flex-1 flex flex-col",
                  "paren-class": "flex-1 flex-row flex-center"
                }, {
                  default: withCtx(() => [
                    createVNode(tmIcon, {
                      userInteractionEnabled: false,
                      name: "tmicon-caret-left"
                    })
                  ]),
                  _: 1
                }, 8, ["dark"])
              ]),
              createElementVNode("view", { class: "flex-6 flex flex-row" }, [
                createVNode(tmSheet, {
                  "hover-class": "opacity-5 keywordBoradAni",
                  onClick: confirm,
                  "follow-theme": props.followTheme,
                  "follow-dark": false,
                  dark: unref(_dark),
                  color: props.color,
                  round: 2,
                  _class: "flex-center ",
                  padding: [0, 0],
                  margin: [4, 4],
                  class: "flex-1 flex flex-col",
                  "paren-class": "flex-1 flex-row flex-center"
                }, {
                  default: withCtx(() => [
                    createVNode(tmIcon, {
                      userInteractionEnabled: false,
                      name: "tmicon-check"
                    })
                  ]),
                  _: 1
                }, 8, ["follow-theme", "dark", "color"])
              ])
            ])
          ])
        ]),
        _: 1
      }, 8, ["dark"]);
    };
  }
});
var keyboradNumber = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["styles", [_style_0$3]], ["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-keyborad/keyborad-number.vue"]]);
function validateIdCard(idCard) {
  var vcity = {
    11: "\u5317\u4EAC",
    12: "\u5929\u6D25",
    13: "\u6CB3\u5317",
    14: "\u5C71\u897F",
    15: "\u5185\u8499\u53E4",
    21: "\u8FBD\u5B81",
    22: "\u5409\u6797",
    23: "\u9ED1\u9F99\u6C5F",
    31: "\u4E0A\u6D77",
    32: "\u6C5F\u82CF",
    33: "\u6D59\u6C5F",
    34: "\u5B89\u5FBD",
    35: "\u798F\u5EFA",
    36: "\u6C5F\u897F",
    37: "\u5C71\u4E1C",
    41: "\u6CB3\u5357",
    42: "\u6E56\u5317",
    43: "\u6E56\u5357",
    44: "\u5E7F\u4E1C",
    45: "\u5E7F\u897F",
    46: "\u6D77\u5357",
    50: "\u91CD\u5E86",
    51: "\u56DB\u5DDD",
    52: "\u8D35\u5DDE",
    53: "\u4E91\u5357",
    54: "\u897F\u85CF",
    61: "\u9655\u897F",
    62: "\u7518\u8083",
    63: "\u9752\u6D77",
    64: "\u5B81\u590F",
    65: "\u65B0\u7586",
    71: "\u53F0\u6E7E",
    81: "\u9999\u6E2F",
    82: "\u6FB3\u95E8",
    91: "\u56FD\u5916"
  };
  if (idCard === "") {
    return false;
  }
  if (isCardNo(idCard) === false) {
    return false;
  }
  if (checkProvince(idCard, vcity) === false) {
    return false;
  }
  if (checkBirthday(idCard) === false) {
    return false;
  }
  if (checkParity(idCard) === false) {
    return false;
  }
  return true;
}
function isCardNo(card) {
  var reg = /(^\d{15}$)|(^\d{17}(\d|X|x)$)/;
  if (reg.test(card) === false) {
    return false;
  }
  return true;
}
function checkProvince(card, vcity) {
  var province = card.substr(0, 2);
  if (vcity[province] == void 0) {
    return false;
  }
  return true;
}
function checkBirthday(card) {
  var len = card.length;
  if (len == "15") {
    var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
    var arr_data = card.match(re_fifteen);
    var year = arr_data[2];
    var month = arr_data[3];
    var day = arr_data[4];
    var birthday = new Date("19" + year + "/" + month + "/" + day);
    return verifyBirthday("19" + year, month, day, birthday);
  }
  if (len == "18") {
    var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X|x)$/;
    var arr_data = card.match(re_eighteen);
    var year = arr_data[2];
    var month = arr_data[3];
    var day = arr_data[4];
    var birthday = new Date(year + "/" + month + "/" + day);
    return verifyBirthday(year, month, day, birthday);
  }
  return false;
}
function verifyBirthday(year, month, day, birthday) {
  var now = new Date();
  var now_year = now.getFullYear();
  if (birthday.getFullYear() == year && birthday.getMonth() + 1 == month && birthday.getDate() == day) {
    var time = now_year - year;
    if (time >= 0 && time <= 100) {
      return true;
    }
    return false;
  }
  return false;
}
function checkParity(card) {
  card = changeFivteenToEighteen(card);
  var len = card.length;
  if (len == "18") {
    var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
    var arrCh = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2");
    var cardTemp = 0, i, valnum;
    for (i = 0; i < 17; i++) {
      cardTemp += card.substr(i, 1) * arrInt[i];
    }
    valnum = arrCh[cardTemp % 11];
    if (valnum == card.substr(17, 1).toLocaleUpperCase()) {
      return true;
    }
    return false;
  }
  return false;
}
function changeFivteenToEighteen(card) {
  if (card.length == "15") {
    var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
    var arrCh = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2");
    var cardTemp = 0, i;
    card = card.substr(0, 6) + "19" + card.substr(6, card.length - 6);
    for (i = 0; i < 17; i++) {
      cardTemp += card.substr(i, 1) * arrInt[i];
    }
    card += arrCh[cardTemp % 11];
    return card;
  }
  return card;
}
var _style_0$2 = { "keywordBoradAni": { "": { "transitionDuration": 100, "transitionTimingFunction": "linear", "transitionDelay": 0, "transitionProperty": "transform", "transform": "scale(0.85)" } }, "@TRANSITION": { "keywordBoradAni": { "duration": 100, "timingFunction": "linear", "delay": 0, "property": "transform" } } };
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "keyborad-card",
  props: {
    followTheme: {
      type: [Boolean, String],
      default: true
    },
    random: {
      type: Boolean,
      default: false
    },
    dark: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "primary"
    },
    showInputContent: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue", "change", "confirm"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const _dark = computed(() => props.dark);
    const numbersfc = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "X"]);
    if (props.random) {
      numbersfc.value = shuffle(toRaw(numbersfc.value));
    }
    const numberArray = ref([]);
    numberArray.value = uni.$tm.u.splitData(toRaw(numbersfc.value), 3);
    const _value = ref(props.modelValue);
    const _isOk = computed(() => validateIdCard(_value.value));
    function keydown(e) {
      let k = String(e);
      _value.value += k;
      emits("update:modelValue", _value.value);
      emits("change", _value.value);
    }
    function del() {
      if (_value.value == "" || _value.value.length == 0)
        return;
      _value.value = _value.value.substring(0, _value.value.length - 1);
      emits("update:modelValue", _value.value);
      emits("change", _value.value);
    }
    function confirm() {
      emits("confirm", _value.value);
    }
    function shuffle(arr = []) {
      var i = arr.length, t, j;
      while (--i) {
        j = Math.floor(Math.random() * i);
        t = arr[i];
        arr[i] = arr[j];
        arr[j] = t;
      }
      return arr;
    }
    watch(() => props.modelValue, () => {
      nextTick(() => _value.value = props.modelValue);
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(tmSheet, {
        "follow-theme": false,
        "follow-dark": false,
        dark: unref(_dark),
        color: "white",
        transprent: true,
        padding: [4, 4],
        margin: [0, 0],
        _class: "flex flex-col",
        "paren-class": "flex-1"
      }, {
        default: withCtx(() => [
          createElementVNode("view", {
            class: "flex-center flex-row",
            style: { "height": "62rpx" }
          }, [
            !_value.value && !props.showInputConten ? (openBlock(), createBlock(tmText, {
              key: 0,
              "font-size": 28,
              _class: "text-weight-b",
              label: "\u5B89\u5168\u952E\u76D8\u653E\u5FC3\u8F93\u5165"
            })) : createCommentVNode("v-if", true),
            _value.value && props.showInputContent ? (openBlock(), createBlock(tmText, {
              key: 1,
              color: unref(_isOk) ? "green" : "red",
              "font-size": 34,
              _class: "text-weight-b pr-24",
              label: _value.value
            }, null, 8, ["color", "label"])) : createCommentVNode("v-if", true),
            unref(_isOk) && props.showInputContent ? (openBlock(), createBlock(tmIcon, {
              key: 2,
              color: "green",
              "font-size": 34,
              name: "tmicon-check-circle-fill"
            })) : createCommentVNode("v-if", true)
          ]),
          createElementVNode("view", { class: "flex flex-row" }, [
            createElementVNode("view", { class: "flex-5 flex flex-col" }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(numberArray.value, (item2, index2) => {
                return openBlock(), createElementBlock("view", {
                  class: "flex-row flex flex-1",
                  key: index2
                }, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(item2, (item, index) => {
                    return openBlock(), createBlock(tmSheet, {
                      "hover-class": "opacity-5 keywordBoradAni",
                      "no-level": "",
                      onClick: ($event) => keydown(item),
                      "follow-theme": false,
                      "follow-dark": false,
                      dark: unref(_dark),
                      round: 2,
                      height: 100,
                      _class: "flex-center",
                      padding: [0, 0],
                      margin: [4, 4],
                      key: index,
                      "paren-class": index2 == 3 && index == 0 ? "flex-3" : "flex-3",
                      class: normalizeClass(index2 == 3 && index == 0 ? "flex-5" : "flex-3")
                    }, {
                      default: withCtx(() => [
                        createElementVNode("view", {
                          style: { "width": "40rpx" },
                          class: "flex flex-center flex-row"
                        }, [
                          createVNode(tmText, {
                            userInteractionEnabled: false,
                            "font-size": 32,
                            _class: "text-weight-b",
                            label: item
                          }, null, 8, ["label"])
                        ])
                      ]),
                      _: 2
                    }, 1032, ["onClick", "dark", "paren-class", "class"]);
                  }), 128))
                ]);
              }), 128))
            ]),
            createElementVNode("view", { class: "flex-1 flex flex-col" }, [
              createElementVNode("view", { class: "flex flex-row" }, [
                createVNode(tmSheet, {
                  "hover-class": "opacity-5 keywordBoradAni",
                  "no-level": "",
                  height: 100,
                  onClick: del,
                  "follow-theme": false,
                  "follow-dark": false,
                  dark: unref(_dark),
                  color: "grey-1",
                  round: 2,
                  _class: "flex-center",
                  padding: [0, 0],
                  margin: [4, 4],
                  class: "flex-1 flex flex-col",
                  "paren-class": "flex-1 flex-row flex-center"
                }, {
                  default: withCtx(() => [
                    createVNode(tmIcon, {
                      userInteractionEnabled: false,
                      name: "tmicon-caret-left"
                    })
                  ]),
                  _: 1
                }, 8, ["dark"])
              ]),
              createElementVNode("view", { class: "flex-6 flex flex-row" }, [
                createVNode(tmSheet, {
                  "hover-class": "opacity-5 keywordBoradAni",
                  "no-level": "",
                  onClick: confirm,
                  "follow-theme": props.followTheme,
                  "follow-dark": false,
                  dark: unref(_dark),
                  color: props.color,
                  round: 2,
                  _class: "flex-center ",
                  padding: [0, 0],
                  margin: [4, 4],
                  class: "flex-1 flex flex-col",
                  "paren-class": "flex-1 flex-row flex-center"
                }, {
                  default: withCtx(() => [
                    createVNode(tmIcon, {
                      userInteractionEnabled: false,
                      name: "tmicon-check"
                    })
                  ]),
                  _: 1
                }, 8, ["follow-theme", "dark", "color"])
              ])
            ])
          ])
        ]),
        _: 1
      }, 8, ["dark"]);
    };
  }
});
var keyboradCard = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["styles", [_style_0$2]], ["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-keyborad/keyborad-card.vue"]]);
var _style_0$1 = { "keywordBoradAni": { "": { "transitionDuration": 100, "transitionTimingFunction": "linear", "transitionDelay": 0, "transitionProperty": "transform", "transform": "scale(0.85)" } }, "@TRANSITION": { "keywordBoradAni": { "duration": 100, "timingFunction": "linear", "delay": 0, "property": "transform" } } };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "keyborad-pass",
  props: {
    followTheme: {
      type: [Boolean, String],
      default: true
    },
    random: {
      type: Boolean,
      default: false
    },
    dark: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "primary"
    },
    showInputContent: {
      type: Boolean,
      default: true
    }
  },
  emits: ["update:modelValue", "change", "confirm"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const _dark = computed(() => props.dark);
    const numberArray = ref([]);
    const _value = ref(props.modelValue);
    const shefitUp = ref(false);
    const changeChart = ref(false);
    getChart();
    function keydown(e) {
      let k = String(e);
      _value.value += k;
      emits("update:modelValue", _value.value);
      emits("change", _value.value);
    }
    function del() {
      if (_value.value == "" || _value.value.length == 0)
        return;
      _value.value = _value.value.substring(0, _value.value.length - 1);
      emits("update:modelValue", _value.value);
      emits("change", _value.value);
    }
    function confirm() {
      emits("confirm", _value.value);
    }
    function changeEnChart() {
      changeChart.value = !changeChart.value;
      getChart();
    }
    function changeEnUp() {
      shefitUp.value = !shefitUp.value;
      getChart();
    }
    function getChart() {
      const numbersfc = ref([
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        0,
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z"
      ]);
      const chartsfc = ref([
        '"',
        "'",
        ".",
        "/",
        "\\",
        "[",
        "]",
        "!",
        "?",
        "_",
        "<",
        ">",
        "%",
        ";",
        "(",
        ")",
        "&",
        "+",
        "=",
        "~",
        "*",
        "#",
        "@"
      ]);
      if (!changeChart.value) {
        if (props.random) {
          numbersfc.value = shuffle(toRaw(numbersfc.value));
        }
        if (shefitUp.value) {
          numbersfc.value = numbersfc.value.map((el) => String(el).toLocaleUpperCase());
        }
        numberArray.value = uni.$tm.u.splitData(toRaw(numbersfc.value), 9);
      } else {
        if (props.random) {
          chartsfc.value = shuffle(toRaw(chartsfc.value));
        }
        numberArray.value = uni.$tm.u.splitData(toRaw(chartsfc.value), 9);
      }
    }
    function shuffle(arr = []) {
      var i = arr.length, t, j;
      while (--i) {
        j = Math.floor(Math.random() * i);
        t = arr[i];
        arr[i] = arr[j];
        arr[j] = t;
      }
      return arr;
    }
    watch(() => props.modelValue, () => {
      nextTick(() => _value.value = props.modelValue);
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(tmSheet, {
        "follow-theme": false,
        "follow-dark": false,
        dark: unref(_dark),
        color: "white",
        transprent: true,
        padding: [4, 4],
        margin: [0, 0],
        _class: "flex flex-col",
        "paren-class": "flex-1"
      }, {
        default: withCtx(() => [
          createElementVNode("view", {
            class: "flex-center flex-row",
            style: { "height": "62rpx" }
          }, [
            !_value.value && !props.showInputConten ? (openBlock(), createBlock(tmText, {
              key: 0,
              "font-size": 28,
              _class: "text-weight-b",
              label: "\u5B89\u5168\u952E\u76D8\u653E\u5FC3\u8F93\u5165"
            })) : createCommentVNode("v-if", true),
            _value.value && props.showInputContent ? (openBlock(), createBlock(tmText, {
              key: 1,
              "font-size": 34,
              _class: "text-weight-b pr-24",
              label: _value.value
            }, null, 8, ["label"])) : createCommentVNode("v-if", true)
          ]),
          createElementVNode("view", { class: "flex flex-row" }, [
            createElementVNode("view", { class: "flex-9 flex flex-col" }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(numberArray.value, (item2, index2) => {
                return openBlock(), createElementBlock("view", {
                  class: "flex-row flex flex-1",
                  key: index2
                }, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(item2, (item, index) => {
                    return openBlock(), createBlock(tmSheet, {
                      "hover-class": "opacity-5 keywordBoradAni",
                      "no-level": "",
                      onClick: ($event) => keydown(item),
                      "follow-theme": false,
                      "follow-dark": false,
                      dark: unref(_dark),
                      round: 2,
                      height: 100,
                      _class: "flex-center",
                      padding: [0, 0],
                      margin: [4, 4],
                      key: index,
                      "paren-class": "flex-1",
                      class: "flex-1"
                    }, {
                      default: withCtx(() => [
                        createElementVNode("view", {
                          style: { "width": "40rpx" },
                          class: "flex flex-center flex-row"
                        }, [
                          createVNode(tmText, {
                            userInteractionEnabled: false,
                            "font-size": 32,
                            _class: "text-weight-b",
                            label: item
                          }, null, 8, ["label"])
                        ])
                      ]),
                      _: 2
                    }, 1032, ["onClick", "dark"]);
                  }), 128))
                ]);
              }), 128))
            ]),
            createElementVNode("view", { class: "flex-1 flex flex-col" }, [
              createElementVNode("view", { class: "flex flex-row" }, [
                createVNode(tmSheet, {
                  "hover-class": "opacity-5 keywordBoradAni",
                  "no-level": "",
                  height: 100,
                  onClick: del,
                  "follow-theme": false,
                  "follow-dark": false,
                  dark: unref(_dark),
                  color: "grey-1",
                  round: 2,
                  _class: "flex-center",
                  padding: [0, 0],
                  margin: [4, 4],
                  class: "flex-1 flex flex-col",
                  "paren-class": "flex-1 flex-row flex-center"
                }, {
                  default: withCtx(() => [
                    createVNode(tmIcon, {
                      userInteractionEnabled: false,
                      name: "tmicon-caret-left"
                    })
                  ]),
                  _: 1
                }, 8, ["dark"])
              ]),
              createElementVNode("view", { class: "flex flex-row" }, [
                !changeChart.value ? (openBlock(), createBlock(tmSheet, {
                  key: 0,
                  "hover-class": "opacity-5 keywordBoradAni",
                  "no-level": "",
                  height: 100,
                  onClick: changeEnUp,
                  "follow-theme": false,
                  "follow-dark": false,
                  dark: unref(_dark),
                  color: shefitUp.value ? "primary" : "grey-1",
                  round: 2,
                  _class: "flex-center",
                  padding: [0, 0],
                  margin: [4, 4],
                  class: "flex-1 flex flex-col",
                  "paren-class": "flex-1 flex-row flex-center"
                }, {
                  default: withCtx(() => [
                    createVNode(tmIcon, {
                      userInteractionEnabled: false,
                      name: "tmicon-arrow-alt-from-botto"
                    })
                  ]),
                  _: 1
                }, 8, ["dark", "color"])) : createCommentVNode("v-if", true)
              ]),
              createElementVNode("view", { class: "flex flex-row" }, [
                createVNode(tmSheet, {
                  "hover-class": "opacity-5 keywordBoradAni",
                  "no-level": "",
                  height: 100,
                  onClick: changeEnChart,
                  "follow-theme": false,
                  "follow-dark": false,
                  dark: unref(_dark),
                  color: "grey-1",
                  round: 2,
                  _class: "flex-center",
                  padding: [0, 0],
                  margin: [4, 4],
                  class: "flex-1 flex flex-col",
                  "paren-class": "flex-1 flex-row flex-center"
                }, {
                  default: withCtx(() => [
                    createVNode(tmText, {
                      userInteractionEnabled: false,
                      "font-size": 32,
                      _class: "text-weight-b",
                      label: !changeChart.value ? ",." : "En"
                    }, null, 8, ["label"])
                  ]),
                  _: 1
                }, 8, ["dark"])
              ]),
              createElementVNode("view", { class: "flex-6 flex flex-row" }, [
                createVNode(tmSheet, {
                  "hover-class": "opacity-5 keywordBoradAni",
                  "no-level": "",
                  onClick: confirm,
                  "follow-theme": props.followTheme,
                  "follow-dark": false,
                  dark: unref(_dark),
                  color: props.color,
                  round: 2,
                  _class: "flex-center ",
                  padding: [0, 0],
                  margin: [4, 4],
                  class: "flex-1 flex flex-col",
                  "paren-class": "flex-1 flex-row flex-center"
                }, {
                  default: withCtx(() => [
                    createVNode(tmIcon, {
                      userInteractionEnabled: false,
                      name: "tmicon-check"
                    })
                  ]),
                  _: 1
                }, 8, ["follow-theme", "dark", "color"])
              ])
            ])
          ])
        ]),
        _: 1
      }, 8, ["dark"]);
    };
  }
});
var keyboradPass = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["styles", [_style_0$1]], ["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-keyborad/keyborad-pass.vue"]]);
var _style_0 = { "keywordBoradAni": { "": { "transitionDuration": 100, "transitionTimingFunction": "linear", "transitionDelay": 0, "transitionProperty": "transform", "transform": "scale(0.85)" } }, "@TRANSITION": { "keywordBoradAni": { "duration": 100, "timingFunction": "linear", "delay": 0, "property": "transform" } } };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "keyborad-car",
  props: {
    followTheme: {
      type: [Boolean, String],
      default: true
    },
    random: {
      type: Boolean,
      default: false
    },
    dark: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "primary"
    },
    showInputContent: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue", "change", "confirm"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const _dark = computed(() => props.dark);
    const numberArray = ref([]);
    const _value = ref(props.modelValue);
    const changeChart = ref(false);
    getChart();
    function keydown(e) {
      let k = String(e);
      _value.value += k;
      emits("update:modelValue", _value.value);
      emits("change", _value.value);
      if (changeChart.value == false) {
        changeEnChart();
      }
    }
    function del() {
      if (_value.value == "" || _value.value.length == 0)
        return;
      _value.value = _value.value.substring(0, _value.value.length - 1);
      emits("update:modelValue", _value.value);
      emits("change", _value.value);
      if (_value.value.length == 0) {
        changeChart.value == true;
        changeEnChart();
      }
    }
    function confirm() {
      emits("confirm", _value.value);
    }
    function changeEnChart() {
      changeChart.value = !changeChart.value;
      getChart();
    }
    function getChart() {
      const numbersfc = ref([
        "\u4EAC",
        "\u6CAA",
        "\u6D25",
        "\u6E1D",
        "\u9C81",
        "\u5180",
        "\u664B",
        "\u8499",
        "\u8FBD",
        "\u5409",
        "\u9ED1",
        "\u82CF",
        "\u6D59",
        "\u7696",
        "\u95FD",
        "\u8D63",
        "\u8C6B",
        "\u6E58",
        "\u9102",
        "\u7CA4",
        "\u6842",
        "\u743C",
        "\u5DDD",
        "\u8D35",
        "\u4E91",
        "\u85CF",
        "\u9655",
        "\u7518",
        "\u9752",
        "\u5B81",
        "\u65B0",
        "\u6E2F",
        "\u6FB3",
        "\u53F0",
        "\u65B0",
        "\u4F7F"
      ]);
      const chartsfc = ref([
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "0",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ]);
      if (!changeChart.value) {
        if (props.random) {
          numbersfc.value = shuffle(toRaw(numbersfc.value));
        }
        numberArray.value = uni.$tm.u.splitData(toRaw(numbersfc.value), 9);
      } else {
        if (props.random) {
          chartsfc.value = shuffle(toRaw(chartsfc.value));
        }
        numberArray.value = uni.$tm.u.splitData(toRaw(chartsfc.value), 9);
      }
    }
    function shuffle(arr = []) {
      var i = arr.length, t, j;
      while (--i) {
        j = Math.floor(Math.random() * i);
        t = arr[i];
        arr[i] = arr[j];
        arr[j] = t;
      }
      return arr;
    }
    watch(() => props.modelValue, () => {
      nextTick(() => _value.value = props.modelValue);
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(tmSheet, {
        "follow-theme": false,
        "follow-dark": false,
        dark: unref(_dark),
        color: "white",
        transprent: true,
        padding: [4, 4],
        margin: [0, 0],
        _class: "flex flex-col",
        "paren-class": "flex-1"
      }, {
        default: withCtx(() => [
          createElementVNode("view", {
            class: "flex-center flex-row",
            style: { "height": "62rpx" }
          }, [
            !_value.value && !props.showInputConten ? (openBlock(), createBlock(tmText, {
              key: 0,
              "font-size": 28,
              _class: "text-weight-b",
              label: "\u5B89\u5168\u952E\u76D8\u653E\u5FC3\u8F93\u5165"
            })) : createCommentVNode("v-if", true),
            _value.value && props.showInputContent ? (openBlock(), createBlock(tmText, {
              key: 1,
              "font-size": 34,
              _class: "text-weight-b pr-24",
              label: _value.value
            }, null, 8, ["label"])) : createCommentVNode("v-if", true)
          ]),
          createElementVNode("view", { class: "flex flex-row" }, [
            createElementVNode("view", { class: "flex-9 flex flex-col" }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(numberArray.value, (item2, index2) => {
                return openBlock(), createElementBlock("view", {
                  class: "flex-row flex flex-1",
                  key: index2
                }, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(item2, (item, index) => {
                    return openBlock(), createBlock(tmSheet, {
                      "hover-class": "opacity-5 keywordBoradAni",
                      "no-level": "",
                      onClick: ($event) => keydown(item),
                      "follow-theme": false,
                      "follow-dark": false,
                      dark: unref(_dark),
                      round: 2,
                      height: 100,
                      _class: "flex-center",
                      padding: [0, 0],
                      margin: [4, 4],
                      key: index,
                      "paren-class": "flex-1",
                      class: "flex-1"
                    }, {
                      default: withCtx(() => [
                        createElementVNode("view", {
                          style: { "width": "40rpx" },
                          class: "flex flex-center flex-row"
                        }, [
                          createVNode(tmText, {
                            userInteractionEnabled: false,
                            "font-size": 32,
                            _class: "text-weight-b",
                            label: item
                          }, null, 8, ["label"])
                        ])
                      ]),
                      _: 2
                    }, 1032, ["onClick", "dark"]);
                  }), 128))
                ]);
              }), 128))
            ]),
            createElementVNode("view", { class: "flex-1 flex flex-col" }, [
              createElementVNode("view", { class: "flex flex-row" }, [
                createVNode(tmSheet, {
                  "hover-class": "opacity-5 keywordBoradAni",
                  "no-level": "",
                  height: 100,
                  onClick: _cache[0] || (_cache[0] = ($event) => keydown("\u5B66")),
                  "follow-theme": false,
                  "follow-dark": false,
                  dark: unref(_dark),
                  round: 2,
                  _class: "flex-center",
                  padding: [0, 0],
                  margin: [4, 4],
                  class: "flex-1 flex flex-col",
                  "paren-class": "flex-1 flex-row flex-center"
                }, {
                  default: withCtx(() => [
                    createVNode(tmText, {
                      userInteractionEnabled: false,
                      "font-size": 32,
                      _class: "text-weight-b",
                      label: "\u5B66"
                    })
                  ]),
                  _: 1
                }, 8, ["dark"])
              ]),
              createElementVNode("view", { class: "flex flex-row" }, [
                createVNode(tmSheet, {
                  "hover-class": "opacity-5 keywordBoradAni",
                  "no-level": "",
                  height: 100,
                  onClick: del,
                  "follow-theme": false,
                  "follow-dark": false,
                  dark: unref(_dark),
                  color: "grey-1",
                  round: 2,
                  _class: "flex-center",
                  padding: [0, 0],
                  margin: [4, 4],
                  class: "flex-1 flex flex-col",
                  "paren-class": "flex-1 flex-row flex-center"
                }, {
                  default: withCtx(() => [
                    createVNode(tmIcon, {
                      userInteractionEnabled: false,
                      name: "tmicon-caret-left"
                    })
                  ]),
                  _: 1
                }, 8, ["dark"])
              ]),
              createElementVNode("view", { class: "flex flex-row" }, [
                createVNode(tmSheet, {
                  "hover-class": "opacity-5 keywordBoradAni",
                  "no-level": "",
                  height: 100,
                  onClick: changeEnChart,
                  "follow-theme": false,
                  "follow-dark": false,
                  dark: unref(_dark),
                  color: "grey-1",
                  round: 2,
                  _class: "flex-center",
                  padding: [0, 0],
                  margin: [4, 4],
                  class: "flex-1 flex flex-col",
                  "paren-class": "flex-1 flex-row flex-center"
                }, {
                  default: withCtx(() => [
                    createVNode(tmText, {
                      userInteractionEnabled: false,
                      "font-size": 32,
                      _class: "text-weight-b",
                      label: !changeChart.value ? "En" : "\u7B80"
                    }, null, 8, ["label"])
                  ]),
                  _: 1
                }, 8, ["dark"])
              ]),
              createElementVNode("view", { class: "flex-6 flex flex-row" }, [
                createVNode(tmSheet, {
                  "hover-class": "opacity-5 keywordBoradAni",
                  onClick: confirm,
                  "follow-theme": props.followTheme,
                  "follow-dark": false,
                  dark: unref(_dark),
                  color: props.color,
                  round: 2,
                  _class: "flex-center ",
                  padding: [0, 0],
                  margin: [4, 4],
                  class: "flex-1 flex flex-col",
                  "paren-class": "flex-1 flex-row flex-center"
                }, {
                  default: withCtx(() => [
                    createVNode(tmIcon, {
                      userInteractionEnabled: false,
                      name: "tmicon-check"
                    })
                  ]),
                  _: 1
                }, 8, ["follow-theme", "dark", "color"])
              ])
            ])
          ])
        ]),
        _: 1
      }, 8, ["dark"]);
    };
  }
});
var keyboradCar = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["styles", [_style_0]], ["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-keyborad/keyborad-car.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tm-keyborad",
  props: __spreadProps(__spreadValues({}, custom_props), {
    followTheme: {
      type: [Boolean, String],
      default: true
    },
    type: {
      type: String,
      default: "number"
    },
    show: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: String,
      default: ""
    },
    defaultValue: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "primary"
    },
    random: {
      type: Boolean,
      default: false
    },
    decimal: {
      type: Boolean,
      default: false
    },
    showInputContent: {
      type: Boolean,
      default: true
    }
  }),
  emits: ["change", "confirm", "update:show", "update:modelValue"],
  setup(__props, { emit: emits }) {
    var _a, _b;
    const props = __props;
    const store = useTmpiniaStore();
    const drawer = ref(null);
    const tmcfg = computed(() => store.tmStore);
    const isDark = computed(() => computedDark(props, tmcfg.value));
    const showPop = ref((_a = props == null ? void 0 : props.show) != null ? _a : false);
    const _value = ref((_b = props == null ? void 0 : props.defaultValue) != null ? _b : "");
    const sysinfo = inject("tmuiSysInfo", computed(() => {
      return { bottom: 0, height: 750, width: uni.upx2px(750), top: 0, isCustomHeader: false, sysinfo: null };
    }));
    const _typemodel = computed(() => props.type);
    watch(() => props.show, () => {
      showPop.value = props.show;
    });
    let timerId = NaN;
    function debounce(func, wait = 200, immediate = false) {
      if (!isNaN(timerId))
        clearTimeout(timerId);
      if (immediate) {
        var callNow = !timerId;
        timerId = setTimeout(() => {
          timerId = NaN;
        }, wait);
        if (callNow)
          typeof func === "function" && func();
      } else {
        timerId = setTimeout(() => {
          typeof func === "function" && func();
        }, wait);
      }
    }
    function drawerClose() {
      emits("update:show", false);
    }
    function drawerOpen() {
      emits("update:show", true);
    }
    watch(() => props.modelValue, () => {
      _value.value = props.modelValue;
    });
    function change() {
      emits("update:modelValue", toRaw(_value.value));
      nextTick(() => {
        _value.value = props.modelValue;
        emits("change", toRaw(_value.value));
      });
    }
    function confirm() {
      debounce(() => {
        var _a2;
        emits("confirm", toRaw(_value.value));
        (_a2 = drawer.value) == null ? void 0 : _a2.close();
      }, 250, true);
    }
    const dHeight = computed(() => {
      return 520 + sysinfo.value.bottom;
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(tmDrawer, {
        ref_key: "drawer",
        ref: drawer,
        onOpen: drawerOpen,
        onClose: drawerClose,
        "onUpdate:show": _cache[4] || (_cache[4] = ($event) => showPop.value = $event),
        show: showPop.value,
        dark: unref(isDark),
        "follow-dark": props.followDark,
        "follow-theme": false,
        height: unref(dHeight),
        "hide-header": true,
        color: "grey-3",
        mask: false
      }, {
        default: withCtx(() => [
          unref(_typemodel) == "number" ? (openBlock(), createBlock(keyboradNumber, {
            key: 0,
            showInputContent: props.showInputContent,
            decimal: props.decimal,
            followTheme: props.followTheme,
            random: props.random,
            color: props.color,
            onChange: change,
            onConfirm: confirm,
            "model-value": _value.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _value.value = $event),
            dark: unref(isDark),
            class: "flex-1"
          }, null, 8, ["showInputContent", "decimal", "followTheme", "random", "color", "model-value", "dark"])) : createCommentVNode("v-if", true),
          unref(_typemodel) == "password" ? (openBlock(), createBlock(keyboradPass, {
            key: 1,
            showInputContent: props.showInputContent,
            followTheme: props.followTheme,
            random: props.random,
            color: props.color,
            onChange: change,
            onConfirm: confirm,
            "model-value": _value.value,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _value.value = $event),
            dark: unref(isDark),
            class: "flex-1"
          }, null, 8, ["showInputContent", "followTheme", "random", "color", "model-value", "dark"])) : createCommentVNode("v-if", true),
          unref(_typemodel) == "car" ? (openBlock(), createBlock(keyboradCar, {
            key: 2,
            showInputContent: props.showInputContent,
            followTheme: props.followTheme,
            random: props.random,
            color: props.color,
            onChange: change,
            onConfirm: confirm,
            "model-value": _value.value,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _value.value = $event),
            dark: unref(isDark),
            class: "flex-1"
          }, null, 8, ["showInputContent", "followTheme", "random", "color", "model-value", "dark"])) : createCommentVNode("v-if", true),
          unref(_typemodel) == "card" ? (openBlock(), createBlock(keyboradCard, {
            key: 3,
            showInputContent: props.showInputContent,
            followTheme: props.followTheme,
            random: props.random,
            color: props.color,
            onChange: change,
            onConfirm: confirm,
            "model-value": _value.value,
            "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => _value.value = $event),
            dark: unref(isDark),
            class: "flex-1"
          }, null, 8, ["showInputContent", "followTheme", "random", "color", "model-value", "dark"])) : createCommentVNode("v-if", true)
        ]),
        _: 1
      }, 8, ["show", "dark", "follow-dark", "height"]);
    };
  }
});
var tmKeyborad = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-keyborad/tm-keyborad.vue"]]);
export { tmKeyborad as t };
