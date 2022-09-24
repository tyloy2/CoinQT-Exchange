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
import { defineComponent, getCurrentInstance, ref, computed, onMounted, nextTick, watch, openBlock, createElementBlock, normalizeStyle, unref, createCommentVNode, createVNode, withCtx } from "vue";
import { g as formatAppLog, _ as _export_sfc, t as tmApp, a as tmText } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmRadioGroup, a as tmRadio } from "../../tm-radio.js";
import { e as enable, W as WeexBridge } from "../../index.js";
import { t as tmDivider } from "../../tm-divider.js";
import { t as tmInput } from "../../tm-input.js";
import "pinia";
import "../../tm-icon.js";
import "../../tm-translate.js";
import "../../tm-button.js";
const qrOptsDefault = {
  baseColor: "#fff",
  backgroundImage: null,
  backgroundColor: null,
  size: 300,
  border: 0.05,
  str: "tmui",
  forgroundColor: "#000",
  logoImage: null,
  logoWidth: 20,
  logoHeight: 20,
  ecc: "M",
  linearDir: "tlbr"
};
var ALIGNMENT_DELTA = [
  0,
  11,
  15,
  19,
  23,
  27,
  31,
  16,
  18,
  20,
  22,
  24,
  26,
  28,
  20,
  22,
  24,
  24,
  26,
  28,
  28,
  22,
  24,
  24,
  26,
  26,
  28,
  28,
  24,
  24,
  26,
  26,
  26,
  28,
  28,
  24,
  26,
  26,
  26,
  28,
  28
];
var ECC_BLOCKS = [
  1,
  0,
  19,
  7,
  1,
  0,
  16,
  10,
  1,
  0,
  13,
  13,
  1,
  0,
  9,
  17,
  1,
  0,
  34,
  10,
  1,
  0,
  28,
  16,
  1,
  0,
  22,
  22,
  1,
  0,
  16,
  28,
  1,
  0,
  55,
  15,
  1,
  0,
  44,
  26,
  2,
  0,
  17,
  18,
  2,
  0,
  13,
  22,
  1,
  0,
  80,
  20,
  2,
  0,
  32,
  18,
  2,
  0,
  24,
  26,
  4,
  0,
  9,
  16,
  1,
  0,
  108,
  26,
  2,
  0,
  43,
  24,
  2,
  2,
  15,
  18,
  2,
  2,
  11,
  22,
  2,
  0,
  68,
  18,
  4,
  0,
  27,
  16,
  4,
  0,
  19,
  24,
  4,
  0,
  15,
  28,
  2,
  0,
  78,
  20,
  4,
  0,
  31,
  18,
  2,
  4,
  14,
  18,
  4,
  1,
  13,
  26,
  2,
  0,
  97,
  24,
  2,
  2,
  38,
  22,
  4,
  2,
  18,
  22,
  4,
  2,
  14,
  26,
  2,
  0,
  116,
  30,
  3,
  2,
  36,
  22,
  4,
  4,
  16,
  20,
  4,
  4,
  12,
  24,
  2,
  2,
  68,
  18,
  4,
  1,
  43,
  26,
  6,
  2,
  19,
  24,
  6,
  2,
  15,
  28,
  4,
  0,
  81,
  20,
  1,
  4,
  50,
  30,
  4,
  4,
  22,
  28,
  3,
  8,
  12,
  24,
  2,
  2,
  92,
  24,
  6,
  2,
  36,
  22,
  4,
  6,
  20,
  26,
  7,
  4,
  14,
  28,
  4,
  0,
  107,
  26,
  8,
  1,
  37,
  22,
  8,
  4,
  20,
  24,
  12,
  4,
  11,
  22,
  3,
  1,
  115,
  30,
  4,
  5,
  40,
  24,
  11,
  5,
  16,
  20,
  11,
  5,
  12,
  24,
  5,
  1,
  87,
  22,
  5,
  5,
  41,
  24,
  5,
  7,
  24,
  30,
  11,
  7,
  12,
  24,
  5,
  1,
  98,
  24,
  7,
  3,
  45,
  28,
  15,
  2,
  19,
  24,
  3,
  13,
  15,
  30,
  1,
  5,
  107,
  28,
  10,
  1,
  46,
  28,
  1,
  15,
  22,
  28,
  2,
  17,
  14,
  28,
  5,
  1,
  120,
  30,
  9,
  4,
  43,
  26,
  17,
  1,
  22,
  28,
  2,
  19,
  14,
  28,
  3,
  4,
  113,
  28,
  3,
  11,
  44,
  26,
  17,
  4,
  21,
  26,
  9,
  16,
  13,
  26,
  3,
  5,
  107,
  28,
  3,
  13,
  41,
  26,
  15,
  5,
  24,
  30,
  15,
  10,
  15,
  28,
  4,
  4,
  116,
  28,
  17,
  0,
  42,
  26,
  17,
  6,
  22,
  28,
  19,
  6,
  16,
  30,
  2,
  7,
  111,
  28,
  17,
  0,
  46,
  28,
  7,
  16,
  24,
  30,
  34,
  0,
  13,
  24,
  4,
  5,
  121,
  30,
  4,
  14,
  47,
  28,
  11,
  14,
  24,
  30,
  16,
  14,
  15,
  30,
  6,
  4,
  117,
  30,
  6,
  14,
  45,
  28,
  11,
  16,
  24,
  30,
  30,
  2,
  16,
  30,
  8,
  4,
  106,
  26,
  8,
  13,
  47,
  28,
  7,
  22,
  24,
  30,
  22,
  13,
  15,
  30,
  10,
  2,
  114,
  28,
  19,
  4,
  46,
  28,
  28,
  6,
  22,
  28,
  33,
  4,
  16,
  30,
  8,
  4,
  122,
  30,
  22,
  3,
  45,
  28,
  8,
  26,
  23,
  30,
  12,
  28,
  15,
  30,
  3,
  10,
  117,
  30,
  3,
  23,
  45,
  28,
  4,
  31,
  24,
  30,
  11,
  31,
  15,
  30,
  7,
  7,
  116,
  30,
  21,
  7,
  45,
  28,
  1,
  37,
  23,
  30,
  19,
  26,
  15,
  30,
  5,
  10,
  115,
  30,
  19,
  10,
  47,
  28,
  15,
  25,
  24,
  30,
  23,
  25,
  15,
  30,
  13,
  3,
  115,
  30,
  2,
  29,
  46,
  28,
  42,
  1,
  24,
  30,
  23,
  28,
  15,
  30,
  17,
  0,
  115,
  30,
  10,
  23,
  46,
  28,
  10,
  35,
  24,
  30,
  19,
  35,
  15,
  30,
  17,
  1,
  115,
  30,
  14,
  21,
  46,
  28,
  29,
  19,
  24,
  30,
  11,
  46,
  15,
  30,
  13,
  6,
  115,
  30,
  14,
  23,
  46,
  28,
  44,
  7,
  24,
  30,
  59,
  1,
  16,
  30,
  12,
  7,
  121,
  30,
  12,
  26,
  47,
  28,
  39,
  14,
  24,
  30,
  22,
  41,
  15,
  30,
  6,
  14,
  121,
  30,
  6,
  34,
  47,
  28,
  46,
  10,
  24,
  30,
  2,
  64,
  15,
  30,
  17,
  4,
  122,
  30,
  29,
  14,
  46,
  28,
  49,
  10,
  24,
  30,
  24,
  46,
  15,
  30,
  4,
  18,
  122,
  30,
  13,
  32,
  46,
  28,
  48,
  14,
  24,
  30,
  42,
  32,
  15,
  30,
  20,
  4,
  117,
  30,
  40,
  7,
  47,
  28,
  43,
  22,
  24,
  30,
  10,
  67,
  15,
  30,
  19,
  6,
  118,
  30,
  18,
  31,
  47,
  28,
  34,
  34,
  24,
  30,
  20,
  61,
  15,
  30
];
var ECC_LEVELS = {
  L: 1,
  M: 2,
  Q: 3,
  H: 4
};
var FINAL_FORMAT = [
  30660,
  29427,
  32170,
  30877,
  26159,
  25368,
  27713,
  26998,
  21522,
  20773,
  24188,
  23371,
  17913,
  16590,
  20375,
  19104,
  13663,
  12392,
  16177,
  14854,
  9396,
  8579,
  11994,
  11245,
  5769,
  5054,
  7399,
  6608,
  1890,
  597,
  3340,
  2107
];
var GALOIS_EXPONENT = [
  1,
  2,
  4,
  8,
  16,
  32,
  64,
  128,
  29,
  58,
  116,
  232,
  205,
  135,
  19,
  38,
  76,
  152,
  45,
  90,
  180,
  117,
  234,
  201,
  143,
  3,
  6,
  12,
  24,
  48,
  96,
  192,
  157,
  39,
  78,
  156,
  37,
  74,
  148,
  53,
  106,
  212,
  181,
  119,
  238,
  193,
  159,
  35,
  70,
  140,
  5,
  10,
  20,
  40,
  80,
  160,
  93,
  186,
  105,
  210,
  185,
  111,
  222,
  161,
  95,
  190,
  97,
  194,
  153,
  47,
  94,
  188,
  101,
  202,
  137,
  15,
  30,
  60,
  120,
  240,
  253,
  231,
  211,
  187,
  107,
  214,
  177,
  127,
  254,
  225,
  223,
  163,
  91,
  182,
  113,
  226,
  217,
  175,
  67,
  134,
  17,
  34,
  68,
  136,
  13,
  26,
  52,
  104,
  208,
  189,
  103,
  206,
  129,
  31,
  62,
  124,
  248,
  237,
  199,
  147,
  59,
  118,
  236,
  197,
  151,
  51,
  102,
  204,
  133,
  23,
  46,
  92,
  184,
  109,
  218,
  169,
  79,
  158,
  33,
  66,
  132,
  21,
  42,
  84,
  168,
  77,
  154,
  41,
  82,
  164,
  85,
  170,
  73,
  146,
  57,
  114,
  228,
  213,
  183,
  115,
  230,
  209,
  191,
  99,
  198,
  145,
  63,
  126,
  252,
  229,
  215,
  179,
  123,
  246,
  241,
  255,
  227,
  219,
  171,
  75,
  150,
  49,
  98,
  196,
  149,
  55,
  110,
  220,
  165,
  87,
  174,
  65,
  130,
  25,
  50,
  100,
  200,
  141,
  7,
  14,
  28,
  56,
  112,
  224,
  221,
  167,
  83,
  166,
  81,
  162,
  89,
  178,
  121,
  242,
  249,
  239,
  195,
  155,
  43,
  86,
  172,
  69,
  138,
  9,
  18,
  36,
  72,
  144,
  61,
  122,
  244,
  245,
  247,
  243,
  251,
  235,
  203,
  139,
  11,
  22,
  44,
  88,
  176,
  125,
  250,
  233,
  207,
  131,
  27,
  54,
  108,
  216,
  173,
  71,
  142,
  0
];
var GALOIS_LOG = [
  255,
  0,
  1,
  25,
  2,
  50,
  26,
  198,
  3,
  223,
  51,
  238,
  27,
  104,
  199,
  75,
  4,
  100,
  224,
  14,
  52,
  141,
  239,
  129,
  28,
  193,
  105,
  248,
  200,
  8,
  76,
  113,
  5,
  138,
  101,
  47,
  225,
  36,
  15,
  33,
  53,
  147,
  142,
  218,
  240,
  18,
  130,
  69,
  29,
  181,
  194,
  125,
  106,
  39,
  249,
  185,
  201,
  154,
  9,
  120,
  77,
  228,
  114,
  166,
  6,
  191,
  139,
  98,
  102,
  221,
  48,
  253,
  226,
  152,
  37,
  179,
  16,
  145,
  34,
  136,
  54,
  208,
  148,
  206,
  143,
  150,
  219,
  189,
  241,
  210,
  19,
  92,
  131,
  56,
  70,
  64,
  30,
  66,
  182,
  163,
  195,
  72,
  126,
  110,
  107,
  58,
  40,
  84,
  250,
  133,
  186,
  61,
  202,
  94,
  155,
  159,
  10,
  21,
  121,
  43,
  78,
  212,
  229,
  172,
  115,
  243,
  167,
  87,
  7,
  112,
  192,
  247,
  140,
  128,
  99,
  13,
  103,
  74,
  222,
  237,
  49,
  197,
  254,
  24,
  227,
  165,
  153,
  119,
  38,
  184,
  180,
  124,
  17,
  68,
  146,
  217,
  35,
  32,
  137,
  46,
  55,
  63,
  209,
  91,
  149,
  188,
  207,
  205,
  144,
  135,
  151,
  178,
  220,
  252,
  190,
  97,
  242,
  86,
  211,
  171,
  20,
  42,
  93,
  158,
  132,
  60,
  57,
  83,
  71,
  109,
  65,
  162,
  31,
  45,
  67,
  216,
  183,
  123,
  164,
  118,
  196,
  23,
  73,
  236,
  127,
  12,
  111,
  246,
  108,
  161,
  59,
  82,
  41,
  157,
  85,
  170,
  251,
  96,
  134,
  177,
  187,
  204,
  62,
  90,
  203,
  89,
  95,
  176,
  156,
  169,
  160,
  81,
  11,
  245,
  22,
  235,
  122,
  117,
  44,
  215,
  79,
  174,
  213,
  233,
  230,
  231,
  173,
  232,
  116,
  214,
  244,
  234,
  168,
  80,
  88,
  175
];
var N1 = 3;
var N2 = 3;
var N3 = 40;
var N4 = 10;
var VERSION_BLOCK = [
  3220,
  1468,
  2713,
  1235,
  3062,
  1890,
  2119,
  1549,
  2344,
  2936,
  1117,
  2583,
  1330,
  2470,
  1667,
  2249,
  2028,
  3780,
  481,
  4011,
  142,
  3098,
  831,
  3445,
  592,
  2517,
  1776,
  2234,
  1951,
  2827,
  1070,
  2660,
  1345,
  3177
];
function generateFrame(_str, ecc) {
  var i, j, k, m, t, v, x, y, version, eccLevel = ECC_LEVELS[ecc || "L"] || 1, str = _str || "", width;
  var badBuffer = [];
  var dataBlock;
  var eccBlock, neccBlock1, neccBlock2;
  var eccBuffer = [];
  var frameBuffer = [];
  var frameMask = [];
  var polynomial = [];
  var stringBuffer = [];
  function setMask(_x, _y) {
    var bit, x2 = _x, y2 = _y;
    if (x2 > y2) {
      bit = x2;
      x2 = y2;
      y2 = bit;
    }
    bit = y2;
    bit *= y2;
    bit += y2;
    bit >>= 1;
    bit += x2;
    frameMask[bit] = 1;
  }
  function addAlignment(_x, _y) {
    var i2, x2 = _x, y2 = _y;
    frameBuffer[x2 + width * y2] = 1;
    for (i2 = -2; i2 < 2; i2++) {
      frameBuffer[x2 + i2 + width * (y2 - 2)] = 1;
      frameBuffer[x2 - 2 + width * (y2 + i2 + 1)] = 1;
      frameBuffer[x2 + 2 + width * (y2 + i2)] = 1;
      frameBuffer[x2 + i2 + 1 + width * (y2 + 2)] = 1;
    }
    for (i2 = 0; i2 < 2; i2++) {
      setMask(x2 - 1, y2 + i2);
      setMask(x2 + 1, y2 - i2);
      setMask(x2 - i2, y2 - 1);
      setMask(x2 + i2, y2 + 1);
    }
  }
  function modN(_x) {
    var x2 = _x;
    while (x2 >= 255) {
      x2 -= 255;
      x2 = (x2 >> 8) + (x2 & 255);
    }
    return x2;
  }
  function appendData(_data, _dataLength, _ecc, _eccLength) {
    var bit, i2, j2, data = _data, dataLength = _dataLength, ecc2 = _ecc, eccLength = _eccLength;
    for (i2 = 0; i2 < eccLength; i2++) {
      stringBuffer[ecc2 + i2] = 0;
    }
    for (i2 = 0; i2 < dataLength; i2++) {
      bit = GALOIS_LOG[stringBuffer[data + i2] ^ stringBuffer[ecc2]];
      if (bit !== 255) {
        for (j2 = 1; j2 < eccLength; j2++) {
          stringBuffer[ecc2 + j2 - 1] = stringBuffer[ecc2 + j2] ^ GALOIS_EXPONENT[modN(bit + polynomial[eccLength - j2])];
        }
      } else {
        for (j2 = ecc2; j2 < ecc2 + eccLength; j2++) {
          stringBuffer[j2] = stringBuffer[j2 + 1];
        }
      }
      stringBuffer[ecc2 + eccLength - 1] = bit === 255 ? 0 : GALOIS_EXPONENT[modN(bit + polynomial[0])];
    }
  }
  function isMasked(_x, _y) {
    var bit, x2 = _x, y2 = _y;
    if (x2 > y2) {
      bit = x2;
      x2 = y2;
      y2 = bit;
    }
    bit = y2;
    bit += y2 * y2;
    bit >>= 1;
    bit += x2;
    return frameMask[bit] === 1;
  }
  function applyMask(_mask) {
    var x2, y2, r3x, r3y, mask = _mask;
    if (mask === 0)
      for (y2 = 0; y2 < width; y2++) {
        for (x2 = 0; x2 < width; x2++) {
          if (!(x2 + y2 & 1) && !isMasked(x2, y2)) {
            frameBuffer[x2 + y2 * width] ^= 1;
          }
        }
      }
    if (mask === 1)
      for (y2 = 0; y2 < width; y2++) {
        for (x2 = 0; x2 < width; x2++) {
          if (!(y2 & 1) && !isMasked(x2, y2)) {
            frameBuffer[x2 + y2 * width] ^= 1;
          }
        }
      }
    if (mask === 2)
      for (y2 = 0; y2 < width; y2++) {
        for (r3x = 0, x2 = 0; x2 < width; x2++, r3x++) {
          if (r3x === 3)
            r3x = 0;
          if (!r3x && !isMasked(x2, y2)) {
            frameBuffer[x2 + y2 * width] ^= 1;
          }
        }
      }
    if (mask === 3)
      for (r3y = 0, y2 = 0; y2 < width; y2++, r3y++) {
        if (r3y === 3)
          r3y = 0;
        for (r3x = r3y, x2 = 0; x2 < width; x2++, r3x++) {
          if (r3x === 3)
            r3x = 0;
          if (!r3x && !isMasked(x2, y2)) {
            frameBuffer[x2 + y2 * width] ^= 1;
          }
        }
      }
    if (mask === 4)
      for (y2 = 0; y2 < width; y2++) {
        for (r3x = 0, r3y = y2 >> 1 & 1, x2 = 0; x2 < width; x2++, r3x++) {
          if (r3x === 3) {
            r3x = 0;
            r3y = !r3y;
          }
          if (!r3y && !isMasked(x2, y2)) {
            frameBuffer[x2 + y2 * width] ^= 1;
          }
        }
      }
    if (mask === 5)
      for (r3y = 0, y2 = 0; y2 < width; y2++, r3y++) {
        if (r3y === 3)
          r3y = 0;
        for (r3x = 0, x2 = 0; x2 < width; x2++, r3x++) {
          if (r3x === 3)
            r3x = 0;
          if (!((x2 & y2 & 1) + !(!r3x | !r3y)) && !isMasked(x2, y2)) {
            frameBuffer[x2 + y2 * width] ^= 1;
          }
        }
      }
    if (mask === 6)
      for (r3y = 0, y2 = 0; y2 < width; y2++, r3y++) {
        if (r3y === 3)
          r3y = 0;
        for (r3x = 0, x2 = 0; x2 < width; x2++, r3x++) {
          if (r3x === 3)
            r3x = 0;
          if (!((x2 & y2 & 1) + (r3x && r3x === r3y) & 1) && !isMasked(x2, y2)) {
            frameBuffer[x2 + y2 * width] ^= 1;
          }
        }
      }
    if (mask === 7)
      for (r3y = 0, y2 = 0; y2 < width; y2++, r3y++) {
        if (r3y === 3)
          r3y = 0;
        for (r3x = 0, x2 = 0; x2 < width; x2++, r3x++) {
          if (r3x === 3)
            r3x = 0;
          if (!((r3x && r3x === r3y) + (x2 + y2 & 1) & 1) && !isMasked(x2, y2)) {
            frameBuffer[x2 + y2 * width] ^= 1;
          }
        }
      }
  }
  function getBadRuns(_length) {
    var badRuns = 0;
    var i2;
    var length = _length;
    for (i2 = 0; i2 <= length; i2++) {
      if (badBuffer[i2] >= 5) {
        badRuns += N1 + badBuffer[i2] - 5;
      }
    }
    for (i2 = 3; i2 < length - 1; i2 += 2) {
      if (badBuffer[i2 - 2] === badBuffer[i2 + 2] && badBuffer[i2 + 2] === badBuffer[i2 - 1] && badBuffer[i2 - 1] === badBuffer[i2 + 1] && badBuffer[i2 - 1] * 3 === badBuffer[i2] && (badBuffer[i2 - 3] === 0 || i2 + 3 > length || badBuffer[i2 - 3] * 3 >= badBuffer[i2] * 4 || badBuffer[i2 + 3] * 3 >= badBuffer[i2] * 4)) {
        badRuns += N3;
      }
    }
    return badRuns;
  }
  function checkBadness() {
    var b, b1, bad, big, bw, count, h, x2, y2;
    bad = bw = count = 0;
    for (y2 = 0; y2 < width - 1; y2++) {
      for (x2 = 0; x2 < width - 1; x2++) {
        if (frameBuffer[x2 + width * y2] && frameBuffer[x2 + 1 + width * y2] && frameBuffer[x2 + width * (y2 + 1)] && frameBuffer[x2 + 1 + width * (y2 + 1)] || !(frameBuffer[x2 + width * y2] || frameBuffer[x2 + 1 + width * y2] || frameBuffer[x2 + width * (y2 + 1)] || frameBuffer[x2 + 1 + width * (y2 + 1)])) {
          bad += N2;
        }
      }
    }
    for (y2 = 0; y2 < width; y2++) {
      badBuffer[0] = 0;
      for (h = b = x2 = 0; x2 < width; x2++) {
        if ((b1 = frameBuffer[x2 + width * y2]) === b) {
          badBuffer[h]++;
        } else {
          badBuffer[++h] = 1;
        }
        b = b1;
        bw += b ? 1 : -1;
      }
      bad += getBadRuns(h);
    }
    if (bw < 0)
      bw = -bw;
    big = bw;
    big += big << 2;
    big <<= 1;
    while (big > width * width) {
      big -= width * width;
      count++;
    }
    bad += count * N4;
    for (x2 = 0; x2 < width; x2++) {
      badBuffer[0] = 0;
      for (h = b = y2 = 0; y2 < width; y2++) {
        if ((b1 = frameBuffer[x2 + width * y2]) === b) {
          badBuffer[h]++;
        } else {
          badBuffer[++h] = 1;
        }
        b = b1;
      }
      bad += getBadRuns(h);
    }
    return bad;
  }
  function toUtf8(str2) {
    var out, i2, len, c;
    out = "";
    len = str2.length;
    for (i2 = 0; i2 < len; i2++) {
      c = str2.charCodeAt(i2);
      if (c >= 1 && c <= 127) {
        out += str2.charAt(i2);
      } else if (c > 2047) {
        out += String.fromCharCode(224 | c >> 12 & 15);
        out += String.fromCharCode(128 | c >> 6 & 63);
        out += String.fromCharCode(128 | c >> 0 & 63);
      } else {
        out += String.fromCharCode(192 | c >> 6 & 31);
        out += String.fromCharCode(128 | c >> 0 & 63);
      }
    }
    return out;
  }
  str = toUtf8(str);
  t = str.length;
  version = 0;
  do {
    version++;
    k = (eccLevel - 1) * 4 + (version - 1) * 16;
    neccBlock1 = ECC_BLOCKS[k++];
    neccBlock2 = ECC_BLOCKS[k++];
    dataBlock = ECC_BLOCKS[k++];
    eccBlock = ECC_BLOCKS[k];
    k = dataBlock * (neccBlock1 + neccBlock2) + neccBlock2 - 3 + (version <= 9);
    if (t <= k)
      break;
  } while (version < 40);
  width = 17 + 4 * version;
  v = dataBlock + (dataBlock + eccBlock) * (neccBlock1 + neccBlock2) + neccBlock2;
  for (t = 0; t < v; t++) {
    eccBuffer[t] = 0;
  }
  stringBuffer = str.slice(0);
  for (t = 0; t < width * width; t++) {
    frameBuffer[t] = 0;
  }
  for (t = 0; t < (width * (width + 1) + 1) / 2; t++) {
    frameMask[t] = 0;
  }
  for (t = 0; t < 3; t++) {
    k = y = 0;
    if (t === 1)
      k = width - 7;
    if (t === 2)
      y = width - 7;
    frameBuffer[y + 3 + width * (k + 3)] = 1;
    for (x = 0; x < 6; x++) {
      frameBuffer[y + x + width * k] = 1;
      frameBuffer[y + width * (k + x + 1)] = 1;
      frameBuffer[y + 6 + width * (k + x)] = 1;
      frameBuffer[y + x + 1 + width * (k + 6)] = 1;
    }
    for (x = 1; x < 5; x++) {
      setMask(y + x, k + 1);
      setMask(y + 1, k + x + 1);
      setMask(y + 5, k + x);
      setMask(y + x + 1, k + 5);
    }
    for (x = 2; x < 4; x++) {
      frameBuffer[y + x + width * (k + 2)] = 1;
      frameBuffer[y + 2 + width * (k + x + 1)] = 1;
      frameBuffer[y + 4 + width * (k + x)] = 1;
      frameBuffer[y + x + 1 + width * (k + 4)] = 1;
    }
  }
  if (version > 1) {
    t = ALIGNMENT_DELTA[version];
    y = width - 7;
    for (; ; ) {
      x = width - 7;
      while (x > t - 3) {
        addAlignment(x, y);
        if (x < t)
          break;
        x -= t;
      }
      if (y <= t + 9)
        break;
      y -= t;
      addAlignment(6, y);
      addAlignment(y, 6);
    }
  }
  frameBuffer[8 + width * (width - 8)] = 1;
  for (y = 0; y < 7; y++) {
    setMask(7, y);
    setMask(width - 8, y);
    setMask(7, y + width - 7);
  }
  for (x = 0; x < 8; x++) {
    setMask(x, 7);
    setMask(x + width - 8, 7);
    setMask(x, width - 8);
  }
  for (x = 0; x < 9; x++) {
    setMask(x, 8);
  }
  for (x = 0; x < 8; x++) {
    setMask(x + width - 8, 8);
    setMask(8, x);
  }
  for (y = 0; y < 7; y++) {
    setMask(8, y + width - 7);
  }
  for (x = 0; x < width - 14; x++) {
    if (x & 1) {
      setMask(8 + x, 6);
      setMask(6, 8 + x);
    } else {
      frameBuffer[8 + x + width * 6] = 1;
      frameBuffer[6 + width * (8 + x)] = 1;
    }
  }
  if (version > 6) {
    t = VERSION_BLOCK[version - 7];
    k = 17;
    for (x = 0; x < 6; x++) {
      for (y = 0; y < 3; y++, k--) {
        if (1 & (k > 11 ? version >> k - 12 : t >> k)) {
          frameBuffer[5 - x + width * (2 - y + width - 11)] = 1;
          frameBuffer[2 - y + width - 11 + width * (5 - x)] = 1;
        } else {
          setMask(5 - x, 2 - y + width - 11);
          setMask(2 - y + width - 11, 5 - x);
        }
      }
    }
  }
  for (y = 0; y < width; y++) {
    for (x = 0; x <= y; x++) {
      if (frameBuffer[x + width * y]) {
        setMask(x, y);
      }
    }
  }
  v = stringBuffer.length;
  for (i = 0; i < v; i++) {
    eccBuffer[i] = stringBuffer.charCodeAt(i);
  }
  stringBuffer = eccBuffer.slice(0);
  x = dataBlock * (neccBlock1 + neccBlock2) + neccBlock2;
  if (v >= x - 2) {
    v = x - 2;
    if (version > 9)
      v--;
  }
  i = v;
  if (version > 9) {
    stringBuffer[i + 2] = 0;
    stringBuffer[i + 3] = 0;
    while (i--) {
      t = stringBuffer[i];
      stringBuffer[i + 3] |= 255 & t << 4;
      stringBuffer[i + 2] = t >> 4;
    }
    stringBuffer[2] |= 255 & v << 4;
    stringBuffer[1] = v >> 4;
    stringBuffer[0] = 64 | v >> 12;
  } else {
    stringBuffer[i + 1] = 0;
    stringBuffer[i + 2] = 0;
    while (i--) {
      t = stringBuffer[i];
      stringBuffer[i + 2] |= 255 & t << 4;
      stringBuffer[i + 1] = t >> 4;
    }
    stringBuffer[1] |= 255 & v << 4;
    stringBuffer[0] = 64 | v >> 4;
  }
  i = v + 3 - (version < 10);
  while (i < x) {
    stringBuffer[i++] = 236;
    stringBuffer[i++] = 17;
  }
  polynomial[0] = 1;
  for (i = 0; i < eccBlock; i++) {
    polynomial[i + 1] = 1;
    for (j = i; j > 0; j--) {
      polynomial[j] = polynomial[j] ? polynomial[j - 1] ^ GALOIS_EXPONENT[modN(GALOIS_LOG[polynomial[j]] + i)] : polynomial[j - 1];
    }
    polynomial[0] = GALOIS_EXPONENT[modN(GALOIS_LOG[polynomial[0]] + i)];
  }
  for (i = 0; i <= eccBlock; i++) {
    polynomial[i] = GALOIS_LOG[polynomial[i]];
  }
  k = x;
  y = 0;
  for (i = 0; i < neccBlock1; i++) {
    appendData(y, dataBlock, k, eccBlock);
    y += dataBlock;
    k += eccBlock;
  }
  for (i = 0; i < neccBlock2; i++) {
    appendData(y, dataBlock + 1, k, eccBlock);
    y += dataBlock + 1;
    k += eccBlock;
  }
  y = 0;
  for (i = 0; i < dataBlock; i++) {
    for (j = 0; j < neccBlock1; j++) {
      eccBuffer[y++] = stringBuffer[i + j * dataBlock];
    }
    for (j = 0; j < neccBlock2; j++) {
      eccBuffer[y++] = stringBuffer[neccBlock1 * dataBlock + i + j * (dataBlock + 1)];
    }
  }
  for (j = 0; j < neccBlock2; j++) {
    eccBuffer[y++] = stringBuffer[neccBlock1 * dataBlock + i + j * (dataBlock + 1)];
  }
  for (i = 0; i < eccBlock; i++) {
    for (j = 0; j < neccBlock1 + neccBlock2; j++) {
      eccBuffer[y++] = stringBuffer[x + i + j * eccBlock];
    }
  }
  stringBuffer = eccBuffer;
  x = y = width - 1;
  k = v = 1;
  m = (dataBlock + eccBlock) * (neccBlock1 + neccBlock2) + neccBlock2;
  for (i = 0; i < m; i++) {
    t = stringBuffer[i];
    for (j = 0; j < 8; j++, t <<= 1) {
      if (128 & t) {
        frameBuffer[x + width * y] = 1;
      }
      do {
        if (v) {
          x--;
        } else {
          x++;
          if (k) {
            if (y !== 0) {
              y--;
            } else {
              x -= 2;
              k = !k;
              if (x === 6) {
                x--;
                y = 9;
              }
            }
          } else {
            if (y !== width - 1) {
              y++;
            } else {
              x -= 2;
              k = !k;
              if (x === 6) {
                x--;
                y -= 8;
              }
            }
          }
        }
        v = !v;
      } while (isMasked(x, y));
    }
  }
  stringBuffer = frameBuffer.slice(0);
  t = 0;
  y = 3e4;
  for (k = 0; k < 8; k++) {
    applyMask(k);
    x = checkBadness();
    if (x < y) {
      y = x;
      t = k;
    }
    if (t === 7)
      break;
    frameBuffer = stringBuffer.slice(0);
  }
  if (t !== k) {
    applyMask(t);
  }
  y = FINAL_FORMAT[t + (eccLevel - 1 << 3)];
  for (k = 0; k < 8; k++, y >>= 1) {
    if (y & 1) {
      frameBuffer[width - 1 - k + width * 8] = 1;
      if (k < 6) {
        frameBuffer[8 + width * k] = 1;
      } else {
        frameBuffer[8 + width * (k + 1)] = 1;
      }
    }
  }
  for (k = 0; k < 7; k++, y >>= 1) {
    if (y & 1) {
      frameBuffer[8 + width * (width - 7 + k)] = 1;
      if (k) {
        frameBuffer[6 - k + width * 8] = 1;
      } else {
        frameBuffer[7 + width * 8] = 1;
      }
    }
  }
  return {
    frameBuffer,
    width
  };
}
function computeLogoPos(size, lw, lh) {
  return {
    x: (size - lw) / 2,
    y: (size - lh) / 2,
    w: lw,
    h: lh
  };
}
async function qr(ctx, option, canvas2d) {
  if (!ctx)
    return;
  var defaults = Object.assign(__spreadValues({}, qrOptsDefault), option), size = defaults.size, borderWidth = size * defaults.border, qrSize = size - borderWidth * 2, backgroundColor = defaults.backgroundColor, backgroundImage = defaults.backgroundImage, logoImage = defaults.logoImage, i, j, points, width, fo, px, logoPos, linearDir = defaults.linearDir;
  var c2d = ctx;
  if (!(c2d == null ? void 0 : c2d.width)) {
    c2d.width = size;
  }
  if (!(c2d == null ? void 0 : c2d.height)) {
    c2d.height = size;
  }
  fillStyle(c2d, defaults.baseColor, linearDir);
  c2d.fillRect(0, 0, size, size);
  c2d.save();
  if (backgroundColor) {
    fillStyle(c2d, backgroundColor, linearDir);
    c2d.fillRect(0, 0, size, size);
  }
  c2d.restore();
  if (backgroundImage) {
    if (canvas2d) {
      await drawImage(canvas2d, c2d, { width: size, height: size, src: backgroundImage, x: 0, y: 0 });
    } else {
      c2d.drawImage(backgroundImage, 0, 0, size, size);
    }
  }
  fo = generateFrame(defaults.str, defaults.ecc);
  points = fo.frameBuffer;
  width = fo.width;
  px = qrSize / width;
  fillStyle(c2d, defaults.forgroundColor, linearDir);
  for (i = 0; i < width; i++) {
    for (j = 0; j < width; j++) {
      if (points[j * width + i]) {
        c2d.fillRect(borderWidth + px * i, borderWidth + px * j, px, px);
      }
    }
  }
  if (logoImage) {
    logoPos = computeLogoPos(size, defaults.logoWidth, defaults.logoHeight);
    if (canvas2d) {
      await drawImage(canvas2d, c2d, { width: defaults.logoWidth, height: defaults.logoHeight, src: logoImage, x: logoPos.x, y: logoPos.y });
    } else {
      c2d.drawImage(logoImage, logoPos.x, logoPos.y, defaults.logoWidth, defaults.logoHeight);
    }
  }
  if (!canvas2d) {
    c2d.draw();
  }
  uni.hideLoading();
  return ctx;
}
function fillStyle(ctx, value, linearDir = "left") {
  if (typeof value == "object" && Array.isArray(value)) {
    let w2w = parseInt(String(ctx.width / 2));
    formatAppLog("log", "at tmui/components/tm-qrcode/drawing.ts:125", w2w);
    var gradient = ctx.createLinearGradient(w2w, 0, w2w, ctx.width);
    if (linearDir == "left") {
      gradient = ctx.createLinearGradient(ctx.width, w2w, 0, w2w);
    } else if (linearDir == "bottom") {
      gradient = ctx.createLinearGradient(w2w, 0, w2w, ctx.width);
    } else if (linearDir == "top") {
      gradient = ctx.createLinearGradient(w2w, ctx.width, w2w, 0);
    } else if (linearDir == "right") {
      gradient = ctx.createLinearGradient(0, w2w, ctx.width, w2w);
    } else if (linearDir == "tlbr") {
      gradient = ctx.createLinearGradient(0, 0, ctx.width, ctx.width);
    } else if (linearDir == "trbl") {
      gradient = ctx.createLinearGradient(ctx.width, 0, 0, ctx.width);
    } else if (linearDir == "bltr") {
      gradient = ctx.createLinearGradient(0, ctx.width, ctx.width, 0);
    } else if (linearDir == "brtl") {
      gradient = ctx.createLinearGradient(ctx.width, ctx.width, 0, 0);
    }
    for (let i = 0, len = value.length; i < len; i++) {
      let stop = i / len;
      if (i == 0)
        stop = 0;
      if (i == len - 1)
        stop = 1;
      gradient.addColorStop(stop, value[i]);
    }
    formatAppLog("log", "at tmui/components/tm-qrcode/drawing.ts:150", gradient);
    ctx.strokeStyle = gradient;
    ctx.fillStyle = gradient;
  } else {
    ctx.fillStyle = value;
  }
}
function drawImage(canvas2d, ctx, opts) {
  uni.showLoading({
    title: "..."
  });
  let img = canvas2d.createImage();
  img.width = opts.width;
  img.height = opts.height;
  img.src = opts.src;
  return new Promise((res) => {
    img.onload = function() {
      ctx.drawImage(img, opts.x, opts.y, opts.width, opts.height);
      uni.hideLoading();
      res(true);
    };
  });
}
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "tm-qrcode",
  props: {
    option: {
      type: Object,
      default: () => {
        return qrOptsDefault;
      }
    }
  },
  setup(__props, { expose }) {
    var _a, _b;
    const props = __props;
    const proxy = (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const vnodeCtx = proxy;
    const canvasId = ref("canvasId");
    canvasId.value = "tm" + uni.$tm.u.getUid(5);
    let ctx;
    let canvas2d;
    let opts = computed(() => {
      return __spreadValues(__spreadValues({}, qrOptsDefault), props.option);
    });
    const _width = computed(() => opts.value.size);
    const _height = computed(() => opts.value.size);
    const show = ref(false);
    let isAndroid = false;
    isAndroid = uni.getSystemInfoSync().osName == "android";
    onMounted(() => {
      nextTick(async function() {
        if (isAndroid) {
          setTimeout(() => {
            show.value = true;
            init().then(() => qr(ctx, __spreadProps(__spreadValues({}, opts.value), { size: uni.upx2px(_width.value) }), canvas2d));
            setTimeout(function() {
              init().then(() => qr(ctx, __spreadProps(__spreadValues({}, opts.value), { size: uni.upx2px(_width.value) }), canvas2d));
            }, 50);
          }, 200);
        } else {
          show.value = true;
          init().then(() => qr(ctx, __spreadProps(__spreadValues({}, opts.value), { size: uni.upx2px(_width.value) }), canvas2d));
        }
      });
    });
    watch(() => props.option, () => {
      if (!ctx)
        ;
      else {
        qr(ctx, __spreadProps(__spreadValues({}, opts.value), { size: uni.upx2px(_width.value) }), canvas2d);
      }
    }, { deep: true });
    function init() {
      return new Promise((res, rej) => {
        setTimeout(async function() {
          ctx = await drawNvue_init();
          res(true);
        }, 150);
      });
    }
    function drawNvue_init() {
      var ganvas = vnodeCtx.$refs[canvasId.value];
      var canvasObj = enable(ganvas, {
        bridge: WeexBridge
      });
      return canvasObj.getContext("2d");
    }
    function save() {
      return new Promise((su, fa) => {
        var _a2;
        if (!ctx) {
          uni.showToast({ title: "\u521D\u59CB\u5316\u5931\u8D25", icon: "none" });
          fa("\u521D\u59CB\u5316\u5931\u8D25");
          return;
        }
        let size = (_a2 = props.option.size) != null ? _a2 : 0;
        uni.showLoading({ title: "..." });
        ctx.toTempFilePath(0, 0, size, size, uni.upx2px(size), uni.upx2px(size), "png", 1, function(res) {
          uni.hideLoading();
          formatAppLog("log", "at tmui/components/tm-qrcode/tm-qrcode.vue:185", res.errMsg);
          if (res.errMsg == "canvasToTempFilePath:ok") {
            su(res.tempFilePath);
          } else {
            fa(res.errMsg);
          }
        });
      });
    }
    expose({ save });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        style: normalizeStyle({ width: `${unref(_width)}rpx`, height: `${unref(_height)}rpx` }),
        renderWhole: true
      }, [
        show.value ? (openBlock(), createElementBlock("gcanvas", {
          key: 0,
          id: canvasId.value,
          ref: canvasId.value,
          class: "canvas",
          style: normalizeStyle({ width: `${unref(_width)}rpx`, height: `${unref(_height)}rpx` })
        }, null, 12, ["id"])) : createCommentVNode("v-if", true)
      ], 4);
    };
  }
});
var tmQrcode = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-qrcode/tm-qrcode.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "qrcode",
  setup(__props) {
    const str = ref("\u6211\u7231\u4F60tmui.design");
    const cfig = ref({ str: str.value });
    const vsd = ref("0");
    function change(e) {
      let type = Number(e);
      if (type === 0) {
        cfig.value = { baseColor: "#FFFFFF", forgroundColor: "#000000", str: str.value };
      } else if (type === 1) {
        cfig.value = { baseColor: "#FFFFFF", forgroundColor: "#FF0000", str: str.value };
      } else if (type === 2) {
        cfig.value = { baseColor: "#FFFFFF", forgroundColor: ["#FF0000", "#FFFF00"], str: str.value };
      } else if (type === 3) {
        cfig.value = { baseColor: ["#FF0000", "#FFFF00"], forgroundColor: "#000000", str: str.value };
      } else if (type === 4) {
        cfig.value = { logoImage: "https://cdn.tmui.design/public/design/logoCir.png", str: str.value, logoWidth: 30, logoHeight: 30 };
      } else if (type === 5) {
        cfig.value = { border: 0.1, str };
      } else if (type === 6) {
        cfig.value = { forgroundColor: "#FFFFFF", str, backgroundImage: "https://cdn.tmui.design/public/echart/qrbg.jpg" };
      }
    }
    function changeStr() {
      cfig.value = { baseColor: "#FFFFFF", forgroundColor: "#000000", str: str.value };
      vsd.value = "0";
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
            createVNode(tmSheet, { _class: "flex-col" }, {
              default: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 30,
                  _class: "font-weight-b",
                  label: "\u57FA\u7840\u793A\u4F8B,\u66F4\u591A\u73A9\u6CD5\u89C1\u6587\u6863"
                }),
                createVNode(tmDivider),
                createVNode(tmInput, {
                  border: 1,
                  modelValue: str.value,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => str.value = $event),
                  onSearch: changeStr,
                  searchLabel: "\u751F\u6210"
                }, null, 8, ["modelValue"]),
                createVNode(tmDivider),
                createVNode(tmRadioGroup, {
                  modelValue: vsd.value,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => vsd.value = $event),
                  defaultValue: "0",
                  onChange: change
                }, {
                  default: withCtx(() => [
                    createVNode(tmRadio, {
                      value: "0",
                      label: "\u57FA\u7840"
                    }),
                    createVNode(tmRadio, {
                      value: "1",
                      label: "\u7EA2\u7801"
                    }),
                    createVNode(tmRadio, {
                      value: "2",
                      label: "\u6E10\u53D8"
                    }),
                    createVNode(tmRadio, {
                      value: "3",
                      label: "\u5F69\u8272\u80CC\u666F"
                    }),
                    createVNode(tmRadio, {
                      value: "4",
                      label: "\u52A0logo"
                    }),
                    createVNode(tmRadio, {
                      value: "5",
                      label: "\u6539\u53D8\u8FB9\u8DDD"
                    }),
                    createVNode(tmRadio, {
                      value: "6",
                      label: "\u80CC\u666F\u56FE"
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue"]),
                createVNode(tmDivider),
                createVNode(tmQrcode, { option: cfig.value }, null, 8, ["option"])
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
var qrcode = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/showdata/qrcode.nvue"]]);
export { qrcode as default };
