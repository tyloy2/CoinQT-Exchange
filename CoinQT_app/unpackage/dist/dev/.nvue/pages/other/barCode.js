var __defProp = Object.defineProperty;
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
import { defineComponent, getCurrentInstance, ref, computed, onMounted, nextTick, watch, openBlock, createElementBlock, normalizeStyle, unref, createCommentVNode, createVNode, withCtx, createElementVNode } from "vue";
import { _ as _export_sfc, g as formatAppLog, t as tmApp, a as tmText } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmRadioGroup, a as tmRadio } from "../../tm-radio.js";
import { t as tmDivider } from "../../tm-divider.js";
import { t as tmInput } from "../../tm-input.js";
import { e as enable, W as WeexBridge } from "../../index.js";
import "pinia";
import "../../tm-icon.js";
import "../../tm-translate.js";
import "../../tm-button.js";
var defaults = {
  width: 2,
  height: 60,
  format: "auto",
  displayValue: true,
  fontOptions: "",
  font: "serif",
  text: "123 456 89",
  textAlign: "center",
  textPosition: "bottom",
  textMargin: 2,
  fontSize: 20,
  background: "#ffffff",
  lineColor: "#000000",
  margin: 10,
  marginTop: void 0,
  marginBottom: void 0,
  marginLeft: void 0,
  marginRight: void 0,
  valid: function() {
  }
};
let isAndroid = false;
isAndroid = uni.getSystemInfoSync().osName == "android";
var ctx;
function drawCanvasBarcode(options = defaults, encoding, is2d = false, canvasWidth = 300) {
  var binary = encoding.data;
  var yFrom;
  options.height - 60;
  if (options.textPosition == "top") {
    yFrom = options.marginTop + options.fontSize + options.textMargin;
  } else {
    yFrom = options.marginTop;
  }
  if (is2d) {
    ctx.fillStyle = options.lineColor;
  } else {
    ctx.setFillStyle(options.lineColor);
  }
  let MAR = (canvasWidth - binary.length * options.width) / 2;
  for (var b = 0; b < binary.length; b++) {
    var x = b * options.width + Math.floor(MAR);
    if (binary[b] === "1") {
      ctx.fillRect(x, yFrom, options.width, options.height);
    } else if (binary[b]) {
      ctx.fillRect(x, yFrom, options.width, options.height * Number(binary[b]));
    }
  }
  if (!is2d) {
    ctx.draw();
  }
}
function drawCanvasText(options = defaults, encoding, is2d = false, canvasWidth = 300) {
  ctx.clearRect(0, 0, canvasWidth, options.height + 40);
  var font = "";
  if (isAndroid) {
    font = options.fontSize + "px " + options.font;
  } else {
    font = options.fontSize * uni.getSystemInfoSync().pixelRatio + "px " + options.font;
  }
  if (options.displayValue) {
    var x, y;
    if (options.textPosition == "top") {
      y = options.marginTop + options.fontSize - options.textMargin;
    } else {
      y = options.height + options.textMargin + options.marginTop + options.fontSize;
    }
    ctx.font = font;
    if (options.textAlign == "left") {
      x = 1;
      ctx.textAlign = "left";
    } else if (options.textAlign == "right") {
      x = canvasWidth - 1;
      ctx.textAlign = "right";
    } else {
      x = canvasWidth / 2;
      ctx.textAlign = "center";
    }
    ctx.fillText(encoding.text, x, y);
  }
}
function drawBarCode(context, options = defaults, encoding, is2d = false, canvasWidth = 300) {
  ctx = context;
  drawCanvasText(options, encoding, is2d, canvasWidth);
  drawCanvasBarcode(options, encoding, is2d, canvasWidth);
  if (isAndroid) {
    setTimeout(function() {
      drawCanvasText(options, encoding, is2d, canvasWidth);
      drawCanvasBarcode(options, encoding, is2d, canvasWidth);
    }, 50);
  }
}
class Barcode {
  constructor(data, options) {
    this.data = data;
    this.text = options.text || data;
    this.options = options;
  }
}
class CODE39 extends Barcode {
  constructor(data, options) {
    data = data.toUpperCase();
    if (options.mod43) {
      data += getCharacter(mod43checksum(data));
    }
    super(data, options);
  }
  encode() {
    var result = getEncoding("*");
    for (let i = 0; i < this.data.length; i++) {
      result += getEncoding(this.data[i]) + "0";
    }
    result += getEncoding("*");
    return {
      data: result,
      text: this.text
    };
  }
  valid() {
    return this.data.search(/^[0-9A-Z\-\.\ \$\/\+\%]+$/) !== -1;
  }
}
var characters = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
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
  "Z",
  "-",
  ".",
  " ",
  "$",
  "/",
  "+",
  "%",
  "*"
];
var encodings = [
  20957,
  29783,
  23639,
  30485,
  20951,
  29813,
  23669,
  20855,
  29789,
  23645,
  29975,
  23831,
  30533,
  22295,
  30149,
  24005,
  21623,
  29981,
  23837,
  22301,
  30023,
  23879,
  30545,
  22343,
  30161,
  24017,
  21959,
  30065,
  23921,
  22385,
  29015,
  18263,
  29141,
  17879,
  29045,
  18293,
  17783,
  29021,
  18269,
  17477,
  17489,
  17681,
  20753,
  35770
];
function getEncoding(character) {
  return getBinary(characterValue(character));
}
function getBinary(characterValue2) {
  return encodings[characterValue2].toString(2);
}
function getCharacter(characterValue2) {
  return characters[characterValue2];
}
function characterValue(character) {
  return characters.indexOf(character);
}
function mod43checksum(data) {
  var checksum2 = 0;
  for (let i = 0; i < data.length; i++) {
    checksum2 += characterValue(data[i]);
  }
  checksum2 = checksum2 % 43;
  return checksum2;
}
const SET_A = 0;
const SET_B = 1;
const SET_C = 2;
const SHIFT = 98;
const START_A = 103;
const START_B = 104;
const START_C = 105;
const MODULO = 103;
const STOP = 106;
const FNC1 = 207;
const SET_BY_CODE = {
  [START_A]: SET_A,
  [START_B]: SET_B,
  [START_C]: SET_C
};
const SWAP = {
  101: SET_A,
  100: SET_B,
  99: SET_C
};
const A_START_CHAR = String.fromCharCode(208);
const B_START_CHAR = String.fromCharCode(209);
const C_START_CHAR = String.fromCharCode(210);
const A_CHARS = "[\0-_\xC8-\xCF]";
const B_CHARS = "[ -\x7F\xC8-\xCF]";
const C_CHARS = "(\xCF*[0-9]{2}\xCF*)";
const BARS = [
  11011001100,
  11001101100,
  11001100110,
  10010011e3,
  10010001100,
  10001001100,
  10011001e3,
  10011000100,
  10001100100,
  11001001e3,
  11001000100,
  11000100100,
  10110011100,
  10011011100,
  10011001110,
  10111001100,
  10011101100,
  10011100110,
  11001110010,
  11001011100,
  11001001110,
  11011100100,
  11001110100,
  11101101110,
  11101001100,
  11100101100,
  11100100110,
  11101100100,
  11100110100,
  11100110010,
  11011011e3,
  11011000110,
  11000110110,
  10100011e3,
  10001011e3,
  10001000110,
  10110001e3,
  10001101e3,
  10001100010,
  11010001e3,
  11000101e3,
  11000100010,
  10110111e3,
  10110001110,
  10001101110,
  10111011e3,
  10111000110,
  10001110110,
  11101110110,
  11010001110,
  11000101110,
  11011101e3,
  11011100010,
  11011101110,
  11101011e3,
  11101000110,
  11100010110,
  11101101e3,
  11101100010,
  11100011010,
  11101111010,
  11001000010,
  11110001010,
  1010011e4,
  10100001100,
  1001011e4,
  10010000110,
  10000101100,
  10000100110,
  1011001e4,
  10110000100,
  1001101e4,
  10011000010,
  10000110100,
  10000110010,
  11000010010,
  1100101e4,
  11110111010,
  11000010100,
  10001111010,
  10100111100,
  10010111100,
  10010011110,
  10111100100,
  10011110100,
  10011110010,
  11110100100,
  11110010100,
  11110010010,
  11011011110,
  11011110110,
  11110110110,
  10101111e3,
  10100011110,
  10001011110,
  10111101e3,
  10111100010,
  11110101e3,
  11110100010,
  10111011110,
  10111101110,
  11101011110,
  11110101110,
  11010000100,
  1101001e4,
  11010011100,
  1100011101011
];
class CODE128 extends Barcode {
  constructor(data, options) {
    super(data.substring(1), options);
    this.bytes = data.split("").map((char) => char.charCodeAt(0));
  }
  valid() {
    return /^[\x00-\x7F\xC8-\xD3]+$/.test(this.data);
  }
  encode() {
    const bytes = this.bytes;
    const startIndex = bytes.shift() - 105;
    const startSet = SET_BY_CODE[startIndex];
    if (startSet === void 0) {
      throw new RangeError("The encoding does not start with a start character.");
    }
    if (this.shouldEncodeAsEan128() === true) {
      bytes.unshift(FNC1);
    }
    const encodingResult = CODE128.next(bytes, 1, startSet);
    return {
      text: this.text === this.data ? this.text.replace(/[^\x20-\x7E]/g, "") : this.text,
      data: CODE128.getBar(startIndex) + encodingResult.result + CODE128.getBar((encodingResult.checksum + startIndex) % MODULO) + CODE128.getBar(STOP)
    };
  }
  shouldEncodeAsEan128() {
    let isEAN128 = this.options.ean128 || false;
    if (typeof isEAN128 === "string") {
      isEAN128 = isEAN128.toLowerCase() === "true";
    }
    return isEAN128;
  }
  static getBar(index) {
    return BARS[index] ? BARS[index].toString() : "";
  }
  static correctIndex(bytes, set) {
    if (set === SET_A) {
      const charCode = bytes.shift();
      return charCode < 32 ? charCode + 64 : charCode - 32;
    } else if (set === SET_B) {
      return bytes.shift() - 32;
    } else {
      return (bytes.shift() - 48) * 10 + bytes.shift() - 48;
    }
  }
  static next(bytes, pos, set) {
    if (!bytes.length) {
      return { result: "", checksum: 0 };
    }
    let nextCode, index;
    if (bytes[0] >= 200) {
      index = bytes.shift() - 105;
      const nextSet = SWAP[index];
      if (nextSet !== void 0) {
        nextCode = CODE128.next(bytes, pos + 1, nextSet);
      } else {
        if ((set === SET_A || set === SET_B) && index === SHIFT) {
          bytes[0] = set === SET_A ? bytes[0] > 95 ? bytes[0] - 96 : bytes[0] : bytes[0] < 32 ? bytes[0] + 96 : bytes[0];
        }
        nextCode = CODE128.next(bytes, pos + 1, set);
      }
    } else {
      index = CODE128.correctIndex(bytes, set);
      nextCode = CODE128.next(bytes, pos + 1, set);
    }
    const enc = CODE128.getBar(index);
    const weight = index * pos;
    return {
      result: enc + nextCode.result,
      checksum: weight + nextCode.checksum
    };
  }
}
const matchSetALength = (string) => string.match(new RegExp(`^${A_CHARS}*`))[0].length;
const matchSetBLength = (string) => string.match(new RegExp(`^${B_CHARS}*`))[0].length;
const matchSetC = (string) => string.match(new RegExp(`^${C_CHARS}*`))[0];
function autoSelectFromAB(string, isA) {
  const ranges = isA ? A_CHARS : B_CHARS;
  const untilC = string.match(new RegExp(`^(${ranges}+?)(([0-9]{2}){2,})([^0-9]|$)`));
  if (untilC) {
    return untilC[1] + String.fromCharCode(204) + autoSelectFromC(string.substring(untilC[1].length));
  }
  const chars = string.match(new RegExp(`^${ranges}+`))[0];
  if (chars.length === string.length) {
    return string;
  }
  return chars + String.fromCharCode(isA ? 205 : 206) + autoSelectFromAB(string.substring(chars.length), !isA);
}
function autoSelectFromC(string) {
  const cMatch = matchSetC(string);
  const length = cMatch.length;
  if (length === string.length) {
    return string;
  }
  string = string.substring(length);
  const isA = matchSetALength(string) >= matchSetBLength(string);
  return cMatch + String.fromCharCode(isA ? 206 : 205) + autoSelectFromAB(string, isA);
}
var autoSelectModes = (string) => {
  let newString;
  const cLength = matchSetC(string).length;
  if (cLength >= 2) {
    newString = C_START_CHAR + autoSelectFromC(string);
  } else {
    const isA = matchSetALength(string) > matchSetBLength(string);
    newString = (isA ? A_START_CHAR : B_START_CHAR) + autoSelectFromAB(string, isA);
  }
  return newString.replace(/[\xCD\xCE]([^])[\xCD\xCE]/, (match, char) => String.fromCharCode(203) + char);
};
class CODE128AUTO extends CODE128 {
  constructor(data, options) {
    if (/^[\x00-\x7F\xC8-\xD3]+$/.test(data)) {
      super(autoSelectModes(data), options);
    } else {
      super(data, options);
    }
  }
}
class CODE128A extends CODE128 {
  constructor(string, options) {
    super(A_START_CHAR + string, options);
  }
  valid() {
    return new RegExp(`^${A_CHARS}+$`).test(this.data);
  }
}
class CODE128B extends CODE128 {
  constructor(string, options) {
    super(B_START_CHAR + string, options);
  }
  valid() {
    return new RegExp(`^${B_CHARS}+$`).test(this.data);
  }
}
class CODE128C extends CODE128 {
  constructor(string, options) {
    super(C_START_CHAR + string, options);
  }
  valid() {
    return new RegExp(`^${C_CHARS}+$`).test(this.data);
  }
}
const SIDE_BIN = "101";
const MIDDLE_BIN = "01010";
const BINARIES$1 = {
  "L": [
    "0001101",
    "0011001",
    "0010011",
    "0111101",
    "0100011",
    "0110001",
    "0101111",
    "0111011",
    "0110111",
    "0001011"
  ],
  "G": [
    "0100111",
    "0110011",
    "0011011",
    "0100001",
    "0011101",
    "0111001",
    "0000101",
    "0010001",
    "0001001",
    "0010111"
  ],
  "R": [
    "1110010",
    "1100110",
    "1101100",
    "1000010",
    "1011100",
    "1001110",
    "1010000",
    "1000100",
    "1001000",
    "1110100"
  ],
  "O": [
    "0001101",
    "0011001",
    "0010011",
    "0111101",
    "0100011",
    "0110001",
    "0101111",
    "0111011",
    "0110111",
    "0001011"
  ],
  "E": [
    "0100111",
    "0110011",
    "0011011",
    "0100001",
    "0011101",
    "0111001",
    "0000101",
    "0010001",
    "0001001",
    "0010111"
  ]
};
const EAN2_STRUCTURE = ["LL", "LG", "GL", "GG"];
const EAN5_STRUCTURE = [
  "GGLLL",
  "GLGLL",
  "GLLGL",
  "GLLLG",
  "LGGLL",
  "LLGGL",
  "LLLGG",
  "LGLGL",
  "LGLLG",
  "LLGLG"
];
const EAN13_STRUCTURE = [
  "LLLLLL",
  "LLGLGG",
  "LLGGLG",
  "LLGGGL",
  "LGLLGG",
  "LGGLLG",
  "LGGGLL",
  "LGLGLG",
  "LGLGGL",
  "LGGLGL"
];
const encode$1 = (data, structure, separator) => {
  let encoded = data.split("").map((val, idx) => BINARIES$1[structure[idx]]).map((val, idx) => val ? val[data[idx]] : "");
  if (separator) {
    const last = data.length - 1;
    encoded = encoded.map((val, idx) => idx < last ? val + separator : val);
  }
  return encoded.join("");
};
class EAN extends Barcode {
  constructor(data, options) {
    super(data, options);
    this.fontSize = !options.flat && options.fontSize > options.width * 10 ? options.width * 10 : options.fontSize;
    this.guardHeight = options.height + this.fontSize / 2 + options.textMargin;
  }
  encode() {
    return this.options.flat ? this.encodeFlat() : this.encodeGuarded();
  }
  leftText(from, to) {
    return this.text.substr(from, to);
  }
  leftEncode(data, structure) {
    return encode$1(data, structure);
  }
  rightText(from, to) {
    return this.text.substr(from, to);
  }
  rightEncode(data, structure) {
    return encode$1(data, structure);
  }
  encodeGuarded() {
    const textOptions = { fontSize: this.fontSize };
    const guardOptions = { height: this.guardHeight };
    return [
      { data: SIDE_BIN, options: guardOptions },
      { data: this.leftEncode(), text: this.leftText(), options: textOptions },
      { data: MIDDLE_BIN, options: guardOptions },
      { data: this.rightEncode(), text: this.rightText(), options: textOptions },
      { data: SIDE_BIN, options: guardOptions }
    ];
  }
  encodeFlat() {
    const data = [
      SIDE_BIN,
      this.leftEncode(),
      MIDDLE_BIN,
      this.rightEncode(),
      SIDE_BIN
    ];
    return {
      data: data.join(""),
      text: this.text
    };
  }
}
const checksum$4 = (number) => {
  const res = number.substr(0, 12).split("").map((n) => +n).reduce((sum, a, idx) => idx % 2 ? sum + a * 3 : sum + a, 0);
  return (10 - res % 10) % 10;
};
class EAN13 extends EAN {
  constructor(data, options) {
    if (data.search(/^[0-9]{12}$/) !== -1) {
      data += checksum$4(data);
    }
    super(data, options);
    this.lastChar = options.lastChar;
  }
  valid() {
    return this.data.search(/^[0-9]{13}$/) !== -1 && +this.data[12] === checksum$4(this.data);
  }
  leftText() {
    return super.leftText(1, 6);
  }
  leftEncode() {
    const data = this.data.substr(1, 6);
    const structure = EAN13_STRUCTURE[this.data[0]];
    return super.leftEncode(data, structure);
  }
  rightText() {
    return super.rightText(7, 6);
  }
  rightEncode() {
    const data = this.data.substr(7, 6);
    return super.rightEncode(data, "RRRRRR");
  }
  encodeGuarded() {
    const data = super.encodeGuarded();
    if (this.options.displayValue) {
      data.unshift({
        data: "000000000000",
        text: this.text.substr(0, 1),
        options: { textAlign: "left", fontSize: this.fontSize }
      });
      if (this.options.lastChar) {
        data.push({
          data: "00"
        });
        data.push({
          data: "00000",
          text: this.options.lastChar,
          options: { fontSize: this.fontSize }
        });
      }
    }
    return data;
  }
}
const checksum$3 = (number) => {
  const res = number.substr(0, 7).split("").map((n) => +n).reduce((sum, a, idx) => idx % 2 ? sum + a : sum + a * 3, 0);
  return (10 - res % 10) % 10;
};
class EAN8 extends EAN {
  constructor(data, options) {
    if (data.search(/^[0-9]{7}$/) !== -1) {
      data += checksum$3(data);
    }
    super(data, options);
  }
  valid() {
    return this.data.search(/^[0-9]{8}$/) !== -1 && +this.data[7] === checksum$3(this.data);
  }
  leftText() {
    return super.leftText(0, 4);
  }
  leftEncode() {
    const data = this.data.substr(0, 4);
    return super.leftEncode(data, "LLLL");
  }
  rightText() {
    return super.rightText(4, 4);
  }
  rightEncode() {
    const data = this.data.substr(4, 4);
    return super.rightEncode(data, "RRRR");
  }
}
const checksum$2 = (data) => {
  const result = data.split("").map((n) => +n).reduce((sum, a, idx) => {
    return idx % 2 ? sum + a * 9 : sum + a * 3;
  }, 0);
  return result % 10;
};
class EAN5 extends Barcode {
  constructor(data, options) {
    super(data, options);
  }
  valid() {
    return this.data.search(/^[0-9]{5}$/) !== -1;
  }
  encode() {
    const structure = EAN5_STRUCTURE[checksum$2(this.data)];
    return {
      data: "1011" + encode$1(this.data, structure, "01"),
      text: this.text
    };
  }
}
class EAN2 extends Barcode {
  constructor(data, options) {
    super(data, options);
  }
  valid() {
    return this.data.search(/^[0-9]{2}$/) !== -1;
  }
  encode() {
    const structure = EAN2_STRUCTURE[parseInt(this.data) % 4];
    return {
      data: "1011" + encode$1(this.data, structure, "01"),
      text: this.text
    };
  }
}
class UPC extends Barcode {
  constructor(data, options) {
    if (data.search(/^[0-9]{11}$/) !== -1) {
      data += checksum$1(data);
    }
    super(data, options);
    this.displayValue = options.displayValue;
    if (options.fontSize > options.width * 10) {
      this.fontSize = options.width * 10;
    } else {
      this.fontSize = options.fontSize;
    }
    this.guardHeight = options.height + this.fontSize / 2 + options.textMargin;
  }
  valid() {
    return this.data.search(/^[0-9]{12}$/) !== -1 && this.data[11] == checksum$1(this.data);
  }
  encode() {
    if (this.options.flat) {
      return this.flatEncoding();
    } else {
      return this.guardedEncoding();
    }
  }
  flatEncoding() {
    var result = "";
    result += "101";
    result += encode$1(this.data.substr(0, 6), "LLLLLL");
    result += "01010";
    result += encode$1(this.data.substr(6, 6), "RRRRRR");
    result += "101";
    return {
      data: result,
      text: this.text
    };
  }
  guardedEncoding() {
    var result = [];
    if (this.displayValue) {
      result.push({
        data: "00000000",
        text: this.text.substr(0, 1),
        options: { textAlign: "left", fontSize: this.fontSize }
      });
    }
    result.push({
      data: "101" + encode$1(this.data[0], "L"),
      options: { height: this.guardHeight }
    });
    result.push({
      data: encode$1(this.data.substr(1, 5), "LLLLL"),
      text: this.text.substr(1, 5),
      options: { fontSize: this.fontSize }
    });
    result.push({
      data: "01010",
      options: { height: this.guardHeight }
    });
    result.push({
      data: encode$1(this.data.substr(6, 5), "RRRRR"),
      text: this.text.substr(6, 5),
      options: { fontSize: this.fontSize }
    });
    result.push({
      data: encode$1(this.data[11], "R") + "101",
      options: { height: this.guardHeight }
    });
    if (this.displayValue) {
      result.push({
        data: "00000000",
        text: this.text.substr(11, 1),
        options: { textAlign: "right", fontSize: this.fontSize }
      });
    }
    return result;
  }
}
function checksum$1(number) {
  var result = 0;
  var i;
  for (i = 1; i < 11; i += 2) {
    result += parseInt(number[i]);
  }
  for (i = 0; i < 11; i += 2) {
    result += parseInt(number[i]) * 3;
  }
  return (10 - result % 10) % 10;
}
const EXPANSIONS = [
  "XX00000XXX",
  "XX10000XXX",
  "XX20000XXX",
  "XXX00000XX",
  "XXXX00000X",
  "XXXXX00005",
  "XXXXX00006",
  "XXXXX00007",
  "XXXXX00008",
  "XXXXX00009"
];
const PARITIES = [
  ["EEEOOO", "OOOEEE"],
  ["EEOEOO", "OOEOEE"],
  ["EEOOEO", "OOEEOE"],
  ["EEOOOE", "OOEEEO"],
  ["EOEEOO", "OEOOEE"],
  ["EOOEEO", "OEEOOE"],
  ["EOOOEE", "OEEEOO"],
  ["EOEOEO", "OEOEOE"],
  ["EOEOOE", "OEOEEO"],
  ["EOOEOE", "OEEOEO"]
];
class UPCE extends Barcode {
  constructor(data, options) {
    super(data, options);
    this.isValid = false;
    if (data.search(/^[0-9]{6}$/) !== -1) {
      this.middleDigits = data;
      this.upcA = expandToUPCA(data, "0");
      this.text = options.text || `${this.upcA[0]}${data}${this.upcA[this.upcA.length - 1]}`;
      this.isValid = true;
    } else if (data.search(/^[01][0-9]{7}$/) !== -1) {
      this.middleDigits = data.substring(1, data.length - 1);
      this.upcA = expandToUPCA(this.middleDigits, data[0]);
      if (this.upcA[this.upcA.length - 1] === data[data.length - 1]) {
        this.isValid = true;
      } else {
        return;
      }
    } else {
      return;
    }
    this.displayValue = options.displayValue;
    if (options.fontSize > options.width * 10) {
      this.fontSize = options.width * 10;
    } else {
      this.fontSize = options.fontSize;
    }
    this.guardHeight = options.height + this.fontSize / 2 + options.textMargin;
  }
  valid() {
    return this.isValid;
  }
  encode() {
    if (this.options.flat) {
      return this.flatEncoding();
    } else {
      return this.guardedEncoding();
    }
  }
  flatEncoding() {
    var result = "";
    result += "101";
    result += this.encodeMiddleDigits();
    result += "010101";
    return {
      data: result,
      text: this.text
    };
  }
  guardedEncoding() {
    var result = [];
    if (this.displayValue) {
      result.push({
        data: "00000000",
        text: this.text[0],
        options: { textAlign: "left", fontSize: this.fontSize }
      });
    }
    result.push({
      data: "101",
      options: { height: this.guardHeight }
    });
    result.push({
      data: this.encodeMiddleDigits(),
      text: this.text.substring(1, 7),
      options: { fontSize: this.fontSize }
    });
    result.push({
      data: "010101",
      options: { height: this.guardHeight }
    });
    if (this.displayValue) {
      result.push({
        data: "00000000",
        text: this.text[7],
        options: { textAlign: "right", fontSize: this.fontSize }
      });
    }
    return result;
  }
  encodeMiddleDigits() {
    const numberSystem = this.upcA[0];
    const checkDigit = this.upcA[this.upcA.length - 1];
    const parity = PARITIES[parseInt(checkDigit)][parseInt(numberSystem)];
    return encode$1(this.middleDigits, parity);
  }
}
function expandToUPCA(middleDigits, numberSystem) {
  const lastUpcE = parseInt(middleDigits[middleDigits.length - 1]);
  const expansion = EXPANSIONS[lastUpcE];
  let result = "";
  let digitIndex = 0;
  for (let i = 0; i < expansion.length; i++) {
    let c = expansion[i];
    if (c === "X") {
      result += middleDigits[digitIndex++];
    } else {
      result += c;
    }
  }
  result = `${numberSystem}${result}`;
  return `${result}${checksum$1(result)}`;
}
const START_BIN = "1010";
const END_BIN = "11101";
const BINARIES = [
  "00110",
  "10001",
  "01001",
  "11000",
  "00101",
  "10100",
  "01100",
  "00011",
  "10010",
  "01010"
];
class ITF extends Barcode {
  valid() {
    return this.data.search(/^([0-9]{2})+$/) !== -1;
  }
  encode() {
    const encoded = this.data.match(/.{2}/g).map((pair) => this.encodePair(pair)).join("");
    return {
      data: START_BIN + encoded + END_BIN,
      text: this.text
    };
  }
  encodePair(pair) {
    const second = BINARIES[pair[1]];
    return BINARIES[pair[0]].split("").map((first, idx) => (first === "1" ? "111" : "1") + (second[idx] === "1" ? "000" : "0")).join("");
  }
}
const checksum = (data) => {
  const res = data.substr(0, 13).split("").map((num) => parseInt(num, 10)).reduce((sum, n, idx) => sum + n * (3 - idx % 2 * 2), 0);
  return Math.ceil(res / 10) * 10 - res;
};
class ITF14 extends ITF {
  constructor(data, options) {
    if (data.search(/^[0-9]{13}$/) !== -1) {
      data += checksum(data);
    }
    super(data, options);
  }
  valid() {
    return this.data.search(/^[0-9]{14}$/) !== -1 && +this.data[13] === checksum(this.data);
  }
}
class MSI extends Barcode {
  constructor(data, options) {
    super(data, options);
  }
  encode() {
    var ret = "110";
    for (var i = 0; i < this.data.length; i++) {
      var digit = parseInt(this.data[i]);
      var bin = digit.toString(2);
      bin = addZeroes(bin, 4 - bin.length);
      for (var b = 0; b < bin.length; b++) {
        ret += bin[b] == "0" ? "100" : "110";
      }
    }
    ret += "1001";
    return {
      data: ret,
      text: this.text
    };
  }
  valid() {
    return this.data.search(/^[0-9]+$/) !== -1;
  }
}
function addZeroes(number, n) {
  for (var i = 0; i < n; i++) {
    number = "0" + number;
  }
  return number;
}
function mod10(number) {
  var sum = 0;
  for (var i = 0; i < number.length; i++) {
    var n = parseInt(number[i]);
    if ((i + number.length) % 2 === 0) {
      sum += n;
    } else {
      sum += n * 2 % 10 + Math.floor(n * 2 / 10);
    }
  }
  return (10 - sum % 10) % 10;
}
function mod11(number) {
  var sum = 0;
  var weights = [2, 3, 4, 5, 6, 7];
  for (var i = 0; i < number.length; i++) {
    var n = parseInt(number[number.length - 1 - i]);
    sum += weights[i % weights.length] * n;
  }
  return (11 - sum % 11) % 11;
}
class MSI10 extends MSI {
  constructor(data, options) {
    super(data + mod10(data), options);
  }
}
class MSI11 extends MSI {
  constructor(data, options) {
    super(data + mod11(data), options);
  }
}
class MSI1010 extends MSI {
  constructor(data, options) {
    data += mod10(data);
    data += mod10(data);
    super(data, options);
  }
}
class MSI1110 extends MSI {
  constructor(data, options) {
    data += mod11(data);
    data += mod10(data);
    super(data, options);
  }
}
class pharmacode extends Barcode {
  constructor(data, options) {
    super(data, options);
    this.number = parseInt(data, 10);
  }
  encode() {
    var z = this.number;
    var result = "";
    while (!isNaN(z) && z != 0) {
      if (z % 2 === 0) {
        result = "11100" + result;
        z = (z - 2) / 2;
      } else {
        result = "100" + result;
        z = (z - 1) / 2;
      }
    }
    result = result.slice(0, -2);
    return {
      data: result,
      text: this.text
    };
  }
  valid() {
    return this.number >= 3 && this.number <= 131070;
  }
}
class codabar extends Barcode {
  constructor(data, options) {
    if (data.search(/^[0-9\-\$\:\.\+\/]+$/) === 0) {
      data = "A" + data + "A";
    }
    super(data.toUpperCase(), options);
    this.text = this.options.text || this.text.replace(/[A-D]/g, "");
  }
  valid() {
    return this.data.search(/^[A-D][0-9\-\$\:\.\+\/]+[A-D]$/) !== -1;
  }
  encode() {
    var result = [];
    var encodings2 = this.getEncodings();
    for (var i = 0; i < this.data.length; i++) {
      result.push(encodings2[this.data.charAt(i)]);
      if (i !== this.data.length - 1) {
        result.push("0");
      }
    }
    return {
      text: this.text,
      data: result.join("")
    };
  }
  getEncodings() {
    return {
      "0": "101010011",
      "1": "101011001",
      "2": "101001011",
      "3": "110010101",
      "4": "101101001",
      "5": "110101001",
      "6": "100101011",
      "7": "100101101",
      "8": "100110101",
      "9": "110100101",
      "-": "101001101",
      "$": "101100101",
      ":": "1101011011",
      "/": "1101101011",
      ".": "1101101101",
      "+": "1011011011",
      "A": "1011001001",
      "B": "1001001011",
      "C": "1010010011",
      "D": "1010011001"
    };
  }
}
class GenericBarcode extends Barcode {
  constructor(data, options) {
    super(data, options);
  }
  encode() {
    return {
      data: "10101010101010101010101010101010101010101",
      text: this.text
    };
  }
  valid() {
    return true;
  }
}
var barcodes = {
  CODE39,
  CODE128: CODE128AUTO,
  CODE128A,
  CODE128B,
  CODE128C,
  EAN13,
  EAN8,
  EAN5,
  EAN2,
  UPC,
  UPCE,
  ITF14,
  ITF,
  MSI,
  MSI10,
  MSI11,
  MSI1010,
  MSI1110,
  pharmacode,
  codabar,
  GenericBarcode
};
var merge = (old, replaceObj) => __spreadValues(__spreadValues({}, old), replaceObj);
function linearizeEncodings(encodings2) {
  var linearEncodings = [];
  function nextLevel(encoded) {
    if (Array.isArray(encoded)) {
      for (let i = 0; i < encoded.length; i++) {
        nextLevel(encoded[i]);
      }
    } else {
      encoded.text = encoded.text || "";
      encoded.data = encoded.data || "";
      linearEncodings.push(encoded);
    }
  }
  nextLevel(encodings2);
  return linearEncodings;
}
function fixOptions(options) {
  options.marginTop = options.marginTop || options.margin;
  options.marginBottom = options.marginBottom || options.margin;
  options.marginRight = options.marginRight || options.margin;
  options.marginLeft = options.marginLeft || options.margin;
  return options;
}
function optionsFromStrings(options) {
  var intOptions = [
    "width",
    "height",
    "textMargin",
    "fontSize",
    "margin",
    "marginTop",
    "marginBottom",
    "marginLeft",
    "marginRight"
  ];
  for (var intOption in intOptions) {
    if (intOptions.hasOwnProperty(intOption)) {
      intOption = intOptions[intOption];
      if (typeof options[intOption] === "string") {
        options[intOption] = parseInt(options[intOption], 10);
      }
    }
  }
  if (typeof options["displayValue"] === "string") {
    options["displayValue"] = options["displayValue"] != "false";
  }
  return options;
}
function getOptionsFromElement(element) {
  var options = {};
  for (var property in defaults) {
    if (defaults.hasOwnProperty(property)) {
      if (element.hasAttribute("jsbarcode-" + property.toLowerCase())) {
        options[property] = element.getAttribute("jsbarcode-" + property.toLowerCase());
      }
      if (element.hasAttribute("data-" + property.toLowerCase())) {
        options[property] = element.getAttribute("data-" + property.toLowerCase());
      }
    }
  }
  options["value"] = element.getAttribute("jsbarcode-value") || element.getAttribute("data-value");
  options = optionsFromStrings(options);
  return options;
}
function getEncodingHeight(encoding, options) {
  return options.height + (options.displayValue && encoding.text.length > 0 ? options.fontSize + options.textMargin : 0) + options.marginTop + options.marginBottom;
}
function getBarcodePadding(textWidth, barcodeWidth, options) {
  if (options.displayValue && barcodeWidth < textWidth) {
    if (options.textAlign == "center") {
      return Math.floor((textWidth - barcodeWidth) / 2);
    } else if (options.textAlign == "left") {
      return 0;
    } else if (options.textAlign == "right") {
      return Math.floor(textWidth - barcodeWidth);
    }
  }
  return 0;
}
function calculateEncodingAttributes(encodings2, barcodeOptions, context) {
  for (let i = 0; i < encodings2.length; i++) {
    var encoding = encodings2[i];
    var options = merge(barcodeOptions, encoding.options);
    var textWidth;
    if (options.displayValue) {
      textWidth = messureText(encoding.text, options, context);
    } else {
      textWidth = 0;
    }
    var barcodeWidth = encoding.data.length * options.width;
    encoding.width = Math.ceil(Math.max(textWidth, barcodeWidth));
    encoding.height = getEncodingHeight(encoding, options);
    encoding.barcodePadding = getBarcodePadding(textWidth, barcodeWidth, options);
  }
}
function getTotalWidthOfEncodings(encodings2) {
  var totalWidth = 0;
  for (let i = 0; i < encodings2.length; i++) {
    totalWidth += encodings2[i].width;
  }
  return totalWidth;
}
function getMaximumHeightOfEncodings(encodings2) {
  var maxHeight = 0;
  for (let i = 0; i < encodings2.length; i++) {
    if (encodings2[i].height > maxHeight) {
      maxHeight = encodings2[i].height;
    }
  }
  return maxHeight;
}
function messureText(string, options, context) {
  var ctx2;
  if (context) {
    ctx2 = context;
  } else if (typeof document !== "undefined") {
    ctx2 = document.createElement("canvas").getContext("2d");
  } else {
    return 0;
  }
  ctx2.font = options.fontOptions + " " + options.fontSize + "px " + options.font;
  var measureTextResult = ctx2.measureText(string);
  if (!measureTextResult) {
    return 0;
  }
  var size = measureTextResult.width;
  return size;
}
class CanvasRenderer {
  constructor(canvas, encodings2, options) {
    this.canvas = canvas;
    this.encodings = encodings2;
    this.options = options;
  }
  render() {
    if (!this.canvas.getContext) {
      throw new Error("The browser does not support canvas.");
    }
    this.prepareCanvas();
    for (let i = 0; i < this.encodings.length; i++) {
      var encodingOptions = merge(this.options, this.encodings[i].options);
      this.drawCanvasBarcode(encodingOptions, this.encodings[i]);
      this.drawCanvasText(encodingOptions, this.encodings[i]);
      this.moveCanvasDrawing(this.encodings[i]);
    }
    this.restoreCanvas();
  }
  prepareCanvas() {
    var ctx2 = this.canvas.getContext("2d");
    ctx2.save();
    calculateEncodingAttributes(this.encodings, this.options, ctx2);
    var totalWidth = getTotalWidthOfEncodings(this.encodings);
    var maxHeight = getMaximumHeightOfEncodings(this.encodings);
    this.canvas.width = totalWidth + this.options.marginLeft + this.options.marginRight;
    this.canvas.height = maxHeight;
    ctx2.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.options.background) {
      ctx2.fillStyle = this.options.background;
      ctx2.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    ctx2.translate(this.options.marginLeft, 0);
  }
  drawCanvasBarcode(options, encoding) {
    var ctx2 = this.canvas.getContext("2d");
    var binary = encoding.data;
    var yFrom;
    if (options.textPosition == "top") {
      yFrom = options.marginTop + options.fontSize + options.textMargin;
    } else {
      yFrom = options.marginTop;
    }
    ctx2.fillStyle = options.lineColor;
    for (var b = 0; b < binary.length; b++) {
      var x = b * options.width + encoding.barcodePadding;
      if (binary[b] === "1") {
        ctx2.fillRect(x, yFrom, options.width, options.height);
      } else if (binary[b]) {
        ctx2.fillRect(x, yFrom, options.width, options.height * binary[b]);
      }
    }
  }
  drawCanvasText(options, encoding) {
    var ctx2 = this.canvas.getContext("2d");
    var font = options.fontOptions + " " + options.fontSize + "px " + options.font;
    if (options.displayValue) {
      var x, y;
      if (options.textPosition == "top") {
        y = options.marginTop + options.fontSize - options.textMargin;
      } else {
        y = options.height + options.textMargin + options.marginTop + options.fontSize;
      }
      ctx2.font = font;
      if (options.textAlign == "left" || encoding.barcodePadding > 0) {
        x = 0;
        ctx2.textAlign = "left";
      } else if (options.textAlign == "right") {
        x = encoding.width - 1;
        ctx2.textAlign = "right";
      } else {
        x = encoding.width / 2;
        ctx2.textAlign = "center";
      }
      ctx2.fillText(encoding.text, x, y);
    }
  }
  moveCanvasDrawing(encoding) {
    var ctx2 = this.canvas.getContext("2d");
    ctx2.translate(encoding.width, 0);
  }
  restoreCanvas() {
    var ctx2 = this.canvas.getContext("2d");
    ctx2.restore();
  }
}
var svgns = "http://www.w3.org/2000/svg";
class SVGRenderer {
  constructor(svg, encodings2, options) {
    this.svg = svg;
    this.encodings = encodings2;
    this.options = options;
    this.document = options.xmlDocument || document;
  }
  render() {
    var currentX = this.options.marginLeft;
    this.prepareSVG();
    for (let i = 0; i < this.encodings.length; i++) {
      var encoding = this.encodings[i];
      var encodingOptions = merge(this.options, encoding.options);
      var group = this.createGroup(currentX, encodingOptions.marginTop, this.svg);
      this.setGroupOptions(group, encodingOptions);
      this.drawSvgBarcode(group, encodingOptions, encoding);
      this.drawSVGText(group, encodingOptions, encoding);
      currentX += encoding.width;
    }
  }
  prepareSVG() {
    while (this.svg.firstChild) {
      this.svg.removeChild(this.svg.firstChild);
    }
    calculateEncodingAttributes(this.encodings, this.options);
    var totalWidth = getTotalWidthOfEncodings(this.encodings);
    var maxHeight = getMaximumHeightOfEncodings(this.encodings);
    var width = totalWidth + this.options.marginLeft + this.options.marginRight;
    this.setSvgAttributes(width, maxHeight);
    if (this.options.background) {
      this.drawRect(0, 0, width, maxHeight, this.svg).setAttribute("style", "fill:" + this.options.background + ";");
    }
  }
  drawSvgBarcode(parent, options, encoding) {
    var binary = encoding.data;
    var yFrom;
    if (options.textPosition == "top") {
      yFrom = options.fontSize + options.textMargin;
    } else {
      yFrom = 0;
    }
    var barWidth = 0;
    var x = 0;
    for (var b = 0; b < binary.length; b++) {
      x = b * options.width + encoding.barcodePadding;
      if (binary[b] === "1") {
        barWidth++;
      } else if (barWidth > 0) {
        this.drawRect(x - options.width * barWidth, yFrom, options.width * barWidth, options.height, parent);
        barWidth = 0;
      }
    }
    if (barWidth > 0) {
      this.drawRect(x - options.width * (barWidth - 1), yFrom, options.width * barWidth, options.height, parent);
    }
  }
  drawSVGText(parent, options, encoding) {
    var textElem = this.document.createElementNS(svgns, "text");
    if (options.displayValue) {
      var x, y;
      textElem.setAttribute("style", "font:" + options.fontOptions + " " + options.fontSize + "px " + options.font);
      if (options.textPosition == "top") {
        y = options.fontSize - options.textMargin;
      } else {
        y = options.height + options.textMargin + options.fontSize;
      }
      if (options.textAlign == "left" || encoding.barcodePadding > 0) {
        x = 0;
        textElem.setAttribute("text-anchor", "start");
      } else if (options.textAlign == "right") {
        x = encoding.width - 1;
        textElem.setAttribute("text-anchor", "end");
      } else {
        x = encoding.width / 2;
        textElem.setAttribute("text-anchor", "middle");
      }
      textElem.setAttribute("x", x);
      textElem.setAttribute("y", y);
      textElem.appendChild(this.document.createTextNode(encoding.text));
      parent.appendChild(textElem);
    }
  }
  setSvgAttributes(width, height) {
    var svg = this.svg;
    svg.setAttribute("width", width + "px");
    svg.setAttribute("height", height + "px");
    svg.setAttribute("x", "0px");
    svg.setAttribute("y", "0px");
    svg.setAttribute("viewBox", "0 0 " + width + " " + height);
    svg.setAttribute("xmlns", svgns);
    svg.setAttribute("version", "1.1");
    svg.setAttribute("style", "transform: translate(0,0)");
  }
  createGroup(x, y, parent) {
    var group = this.document.createElementNS(svgns, "g");
    group.setAttribute("transform", "translate(" + x + ", " + y + ")");
    parent.appendChild(group);
    return group;
  }
  setGroupOptions(group, options) {
    group.setAttribute("style", "fill:" + options.lineColor + ";");
  }
  drawRect(x, y, width, height, parent) {
    var rect = this.document.createElementNS(svgns, "rect");
    rect.setAttribute("x", x);
    rect.setAttribute("y", y);
    rect.setAttribute("width", width);
    rect.setAttribute("height", height);
    parent.appendChild(rect);
    return rect;
  }
}
class ObjectRenderer {
  constructor(object, encodings2, options) {
    this.object = object;
    this.encodings = encodings2;
    this.options = options;
  }
  render() {
    this.object.encodings = this.encodings;
  }
}
var renderers = { CanvasRenderer, SVGRenderer, ObjectRenderer };
class InvalidInputException extends Error {
  constructor(symbology, input) {
    super();
    this.name = "InvalidInputException";
    this.symbology = symbology;
    this.input = input;
    this.message = '"' + this.input + '" is not a valid input for ' + this.symbology;
  }
}
class InvalidElementException extends Error {
  constructor() {
    super();
    this.name = "InvalidElementException";
    this.message = "Not supported type to render on";
  }
}
class NoElementException extends Error {
  constructor() {
    super();
    this.name = "NoElementException";
    this.message = "No element to render on.";
  }
}
function getRenderProperties(element) {
  if (typeof element === "string") {
    return querySelectedRenderProperties(element);
  } else if (Array.isArray(element)) {
    var returnArray = [];
    for (let i = 0; i < element.length; i++) {
      returnArray.push(getRenderProperties(element[i]));
    }
    return returnArray;
  } else if (typeof HTMLCanvasElement !== "undefined" && element instanceof HTMLImageElement) {
    return newCanvasRenderProperties(element);
  } else if (element && element.nodeName && element.nodeName.toLowerCase() === "svg" || typeof SVGElement !== "undefined" && element instanceof SVGElement) {
    return {
      element,
      options: getOptionsFromElement(element),
      renderer: renderers.SVGRenderer
    };
  } else if (typeof HTMLCanvasElement !== "undefined" && element instanceof HTMLCanvasElement) {
    return {
      element,
      options: getOptionsFromElement(element),
      renderer: renderers.CanvasRenderer
    };
  } else if (element && element.getContext) {
    return {
      element,
      renderer: renderers.CanvasRenderer
    };
  } else if (element && typeof element === "object" && !element.nodeName) {
    return {
      element,
      renderer: renderers.ObjectRenderer
    };
  } else {
    throw new InvalidElementException();
  }
}
function querySelectedRenderProperties(string) {
  var selector = document.querySelectorAll(string);
  if (selector.length === 0) {
    return void 0;
  } else {
    let returnArray = [];
    for (let i = 0; i < selector.length; i++) {
      returnArray.push(getRenderProperties(selector[i]));
    }
    return returnArray;
  }
}
function newCanvasRenderProperties(imgElement) {
  var canvas = document.createElement("canvas");
  return {
    element: canvas,
    options: getOptionsFromElement(imgElement),
    renderer: renderers.CanvasRenderer,
    afterRender: function() {
      imgElement.setAttribute("src", canvas.toDataURL());
    }
  };
}
class ErrorHandler {
  constructor(api) {
    this.api = api;
  }
  handleCatch(e) {
    if (e.name === "InvalidInputException") {
      if (this.api._options.valid !== this.api._defaults.valid) {
        this.api._options.valid(false);
      } else {
        throw e.message;
      }
    } else {
      throw e;
    }
    this.api.render = function() {
    };
  }
  wrapBarcodeCall(func) {
    try {
      var result = func(...arguments);
      this.api._options.valid(true);
      return result;
    } catch (e) {
      this.handleCatch(e);
      return this.api;
    }
  }
}
let API = function() {
};
let JsBarcode = function(element, text, options) {
  var api = new API();
  if (typeof element === "undefined") {
    throw Error("No element to render on was provided.");
  }
  api._renderProperties = getRenderProperties(element);
  api._encodings = [];
  api._options = defaults;
  api._errorHandler = new ErrorHandler(api);
  if (typeof text !== "undefined") {
    options = options || {};
    if (!options.format || options.format == "auto") {
      options.format = autoSelectBarcode();
    }
    api.options(options)[options.format](text, options).render();
  }
  return api;
};
JsBarcode.getModule = function(name) {
  return barcodes[name];
};
for (var name in barcodes) {
  if (barcodes.hasOwnProperty(name)) {
    registerBarcode(barcodes, name);
  }
}
function registerBarcode(barcodes2, name) {
  API.prototype[name] = API.prototype[name.toUpperCase()] = API.prototype[name.toLowerCase()] = function(text, options) {
    var api = this;
    return api._errorHandler.wrapBarcodeCall(function() {
      options.text = typeof options.text === "undefined" ? void 0 : "" + options.text;
      var newOptions = merge(api._options, options);
      newOptions = optionsFromStrings(newOptions);
      var Encoder = barcodes2[name];
      var encoded = encode(text, Encoder, newOptions);
      api._encodings.push(encoded);
      return api;
    });
  };
}
function encode(text, Encoder, options) {
  text = "" + text;
  var encoder = new Encoder(text, options);
  if (!encoder.valid()) {
    throw new InvalidInputException(encoder.constructor.name, text);
  }
  var encoded = encoder.encode();
  encoded = linearizeEncodings(encoded);
  for (let i = 0; i < encoded.length; i++) {
    encoded[i].options = merge(options, encoded[i].options);
  }
  return encoded;
}
function autoSelectBarcode() {
  if (barcodes["CODE128"]) {
    return "CODE128";
  }
  return Object.keys(barcodes)[0];
}
API.prototype.options = function(options) {
  this._options = merge(this._options, options);
  return this;
};
API.prototype.blank = function(size) {
  const zeroes = new Array(size + 1).join("0");
  this._encodings.push({ data: zeroes });
  return this;
};
API.prototype.init = function() {
  if (!this._renderProperties) {
    return;
  }
  if (!Array.isArray(this._renderProperties)) {
    this._renderProperties = [this._renderProperties];
  }
  var renderProperty;
  for (let i in this._renderProperties) {
    renderProperty = this._renderProperties[i];
    var options = merge(this._options, renderProperty.options);
    if (options.format == "auto") {
      options.format = autoSelectBarcode();
    }
    this._errorHandler.wrapBarcodeCall(function() {
      var text = options.value;
      var Encoder = barcodes[options.format.toUpperCase()];
      var encoded = encode(text, Encoder, options);
      render(renderProperty, encoded, options);
    });
  }
};
API.prototype.render = function() {
  if (!this._renderProperties) {
    throw new NoElementException();
  }
  if (Array.isArray(this._renderProperties)) {
    for (var i = 0; i < this._renderProperties.length; i++) {
      render(this._renderProperties[i], this._encodings, this._options);
    }
  } else {
    render(this._renderProperties, this._encodings, this._options);
  }
  return this;
};
API.prototype._defaults = defaults;
function render(renderProperties, encodings2, options) {
  encodings2 = linearizeEncodings(encodings2);
  for (let i = 0; i < encodings2.length; i++) {
    encodings2[i].options = merge(options, encodings2[i].options);
    fixOptions(encodings2[i].options);
  }
  fixOptions(options);
  var Renderer = renderProperties.renderer;
  var renderer = new Renderer(renderProperties.element, encodings2, options);
  renderer.render();
  if (renderProperties.afterRender) {
    renderProperties.afterRender();
  }
}
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "tm-barcode",
  props: {
    option: {
      type: Object,
      default: () => {
        return defaults;
      }
    },
    width: {
      type: Number,
      default: 600
    },
    height: {
      type: Number,
      default: 240
    }
  },
  setup(__props, { expose }) {
    var _a, _b;
    const props = __props;
    const proxy = (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const vnodeCtx = proxy;
    const canvasId = ref("canvasId");
    canvasId.value = "tm" + uni.$tm.u.getUid(5);
    let ctx2;
    let optsCode = computed(() => {
      let ops = __spreadValues(__spreadValues({}, defaults), props.option);
      ops.height = uni.upx2px(props.height) - 40;
      return ops;
    });
    const _width = computed(() => props.width);
    const _height = computed(() => props.height);
    const show = ref(false);
    onMounted(() => {
      nextTick(function() {
        if (uni.getSystemInfoSync().osName == "android") {
          setTimeout(function() {
            show.value = true;
            init().then(() => draw());
          }, 200);
        } else {
          show.value = true;
          init().then(() => draw());
        }
      });
    });
    function draw(opts = optsCode.value) {
      let bcode = JsBarcode(ctx2, opts.text, opts);
      let BarcodeObj = bcode._encodings[0][0];
      let is2d = false;
      drawBarCode(ctx2, BarcodeObj.options, BarcodeObj, is2d, uni.upx2px(_width.value));
    }
    watch(() => props.option, () => {
      if (!ctx2) {
        init().then(() => draw(__spreadValues({}, optsCode.value)));
      } else {
        draw(__spreadValues({}, optsCode.value));
      }
    }, { deep: true });
    function init() {
      return new Promise((res, rej) => {
        setTimeout(async function() {
          ctx2 = await drawNvue_init();
          res(true);
        }, 100);
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
        if (!ctx2) {
          uni.showToast({ title: "\u521D\u59CB\u5316\u5931\u8D25", icon: "none" });
          fa("\u521D\u59CB\u5316\u5931\u8D25");
          return;
        }
        let width = props.width;
        let height = props.height;
        uni.showLoading({ title: "..." });
        ctx2.toTempFilePath(0, 0, width, height, uni.upx2px(width), uni.upx2px(height), "png", 1, function(res) {
          uni.hideLoading();
          formatAppLog("log", "at tmui/components/tm-barcode/tm-barcode.vue:195", res.errMsg);
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
var tmBarcode = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-barcode/tm-barcode.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "barCode",
  setup(__props) {
    let opts = ref({ lineColor: "#000000", fontSize: 20, width: 2, text: "123 456 89" });
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
            createVNode(tmSheet, { followDark: false }, {
              default: withCtx(() => [
                createVNode(tmText, {
                  _class: "text-weight-b",
                  label: "\u6761\u5F62\u7801\uFF0C\u5168\u7AEF\u652F\u6301"
                }),
                createVNode(tmText, {
                  "font-size": 24,
                  label: "\u652F\u6301\u7684\u7801\u5236\u975E\u5E38\u7684\u4E30\u5BCC\uFF0C\u7531\u4E8E\u6211\u672C\u4EBA\u975E\u5DE5\u4E1A\u4EBA\u5458\uFF0C\u5BF9\u4E8E\u6761\u7801\u5236\u5F0F\u4E0D\u592A\u4E86\u89E3\uFF0C\u4F46\u7A0B\u5E8F\u63D0\u4F9B\u4E86\u5E38\u89C1\u7684:CODE128 CODE39 EAN_UPC\u7CFB\u5217 ITF MSI pharmacode"
                }),
                createVNode(tmText, {
                  color: "red",
                  label: "\u5C3D\u91CF\u6A2A\u5C4F\u751F\u6210\uFF0C\u6570\u5B57\u591A\uFF0C\u751F\u6210\u7684\u6761\u5F62\u4F1A\u6EA2\u51FA\u753B\u5E03\u5BFC\u81F4\u6570\u636E\u6B8B\u7F3A\uFF0C\u65E0\u6CD5\u8BC6\u522B\u54E6~"
                }),
                createElementVNode("view", { class: "flex flex-center" }, [
                  createVNode(tmBarcode, {
                    width: 636,
                    option: unref(opts)
                  }, null, 8, ["option"])
                ])
              ]),
              _: 1
            }),
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createElementVNode("view", { class: "flex flex-row flex-row-bottom-start" }, [
                  createVNode(tmText, { label: "\u5C5E\u6027\u8BBE\u7F6E" }),
                  createVNode(tmText, {
                    "font-size": 22,
                    _class: "ml-10",
                    label: "(\u5B9E\u65F6\u751F\u6548)"
                  })
                ]),
                createVNode(tmDivider),
                createVNode(tmRadioGroup, {
                  modelValue: unref(opts).lineColor,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => unref(opts).lineColor = $event),
                  defaultValue: "#000000"
                }, {
                  default: withCtx(() => [
                    createVNode(tmRadio, {
                      value: "#000000",
                      label: "\u9ED1\u8272"
                    }),
                    createVNode(tmRadio, {
                      value: "#0000FF",
                      label: "\u84DD\u8272"
                    }),
                    createVNode(tmRadio, {
                      value: "#FF0000",
                      label: "\u7EA2\u8272"
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue"]),
                createVNode(tmDivider),
                createVNode(tmInput, {
                  prefixLabel: "\u6587\u672C\u5185\u5BB9",
                  align: "right",
                  placeholder: "\u8BF7\u8F93\u5165\u6587\u672C",
                  modelValue: unref(opts).text,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => unref(opts).text = $event),
                  type: "text"
                }, null, 8, ["modelValue"]),
                createVNode(tmInput, {
                  margin: [0, 24],
                  prefixLabel: "\u5B57\u4F53\u5927\u5C0F",
                  align: "right",
                  placeholder: "\u8BF7\u8F93\u5165\u5B57\u53F7",
                  modelValue: unref(opts).fontSize,
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => unref(opts).fontSize = $event),
                  type: "number"
                }, null, 8, ["modelValue"]),
                createVNode(tmInput, {
                  prefixLabel: "\u7EBF\u5BBDPX",
                  align: "right",
                  placeholder: "\u8BF7\u8F93\u5165\u7EBF\u6761\u5BBD\u5EA6",
                  modelValue: unref(opts).width,
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => unref(opts).width = $event),
                  type: "number"
                }, null, 8, ["modelValue"])
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
var barCode = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/other/barCode.nvue"]]);
export { barCode as default };
