import React, { useState } from 'react';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign$1 = function() {
    __assign$1 = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign$1.apply(this, arguments);
};

function __rest$1(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$6 = "@import url(\"https://rsms.me/inter/inter.css\");\n.Badge-module_badge__ZbEBU {\n  width: fit-content;\n  min-width: 4rem;\n  min-height: 1.3rem;\n  padding: 0.3rem 0.8rem 0.3rem 0.8rem;\n  border: 0.4rem solid;\n  border-radius: 100vw;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 0.3rem;\n  font-family: Inter;\n  font-size: 13px;\n  font-weight: normal;\n  color: #fffbf4;\n  user-select: none;\n  pointer-events: none;\n}\n.Badge-module_badge__ZbEBU img {\n  width: 1.3rem;\n  height: 1.3rem;\n}";
var styles$6 = {"badge":"Badge-module_badge__ZbEBU"};
styleInject(css_248z$6);

var adjustColor = function (color, anmount) {
    return color.replace(/\w\w/g, function (m) {
        return Math.min(255, Math.max(0, parseInt(m, 16) + anmount)).toString(16);
    });
};
var Badge = React.forwardRef(function (_a, ref) {
    var text = _a.text, icon = _a.icon, _b = _a.backgroundColor, backgroundColor = _b === void 0 ? '#d86ada' : _b, _c = _a.color, color = _c === void 0 ? '#fffbf4' : _c, props = __rest$1(_a, ["text", "icon", "backgroundColor", "color"]);
    var customStyle = {
        backgroundColor: backgroundColor,
        borderColor: adjustColor(backgroundColor, -20),
        color: color,
    };
    return (React.createElement("div", __assign$1({}, props, { ref: ref, style: customStyle, className: styles$6.badge }),
        icon !== undefined && React.createElement("img", { src: icon }),
        text !== undefined && React.createElement("span", null, text)));
});

var css_248z$5 = "@import url(\"https://rsms.me/inter/inter.css\");\n.Button-module_button__18Bed, .Button-module_secondary__j-3rj, .Button-module_primary__st6yY {\n  width: fit-content;\n  min-width: 7rem;\n  border-radius: 5px;\n  font-family: Inter;\n  font-size: 13px;\n  font-weight: normal;\n  color: #fffbf4;\n  font-size: 16px;\n  text-align: center;\n  padding: 9px;\n  user-select: none;\n}\n.Button-module_button__18Bed:hover, .Button-module_secondary__j-3rj:hover, .Button-module_primary__st6yY:hover {\n  box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 10px;\n}\n\n.Button-module_primary__st6yY {\n  background: linear-gradient(72deg, #d86ada, #6957e7);\n}";
var styles$5 = {"button":"Button-module_button__18Bed","secondary":"Button-module_secondary__j-3rj","primary":"Button-module_primary__st6yY"};
styleInject(css_248z$5);

var Button = React.forwardRef(function (_a, ref) {
    var title = _a.title, _b = _a.variant, variant = _b === void 0 ? 'primary' : _b, props = __rest$1(_a, ["title", "variant"]);
    return (React.createElement("div", __assign$1({}, props, { ref: ref, className: styles$5[variant] }),
        React.createElement("span", null, title)));
});

var css_248z$4 = "@import url(\"https://rsms.me/inter/inter.css\");\n.SummonerIcon-module_profileIcon__DtiAc {\n  box-sizing: border-box;\n  position: relative;\n  border-radius: 25%;\n}\n.SummonerIcon-module_profileIcon__DtiAc[data-favorite=true] {\n  border: 4px solid #d86ada;\n}\n.SummonerIcon-module_profileIcon__DtiAc[data-selected=true] {\n  border: 4px solid #6957e7;\n}\n.SummonerIcon-module_profileIcon__DtiAc img {\n  max-width: 100%;\n  max-height: 100%;\n  border-radius: 25%;\n  pointer-events: none;\n}\n\n.SummonerIcon-module_availability__LEzzj {\n  box-sizing: content-box;\n  position: absolute;\n  bottom: 10%;\n  right: 10%;\n  height: 15%;\n  width: 15%;\n  border-radius: 50%;\n  border: 2px solid;\n}\n.SummonerIcon-module_availability__LEzzj[data-availability=chat] {\n  background-color: #29c45a;\n  border-color: #177033;\n}\n.SummonerIcon-module_availability__LEzzj[data-availability=away] {\n  background-color: #c73c3c;\n  border-color: #7a2323;\n}\n.SummonerIcon-module_availability__LEzzj[data-availability=dnd] {\n  background-color: #4ab3e4;\n  border-color: #1a7fae;\n}\n.SummonerIcon-module_availability__LEzzj[data-availability=offline] {\n  background-color: #8f8b8b;\n  border-color: #5c5858;\n}\n.SummonerIcon-module_availability__LEzzj[data-availability=mobile] {\n  background-color: #8f8b8b;\n  border-color: #5c5858;\n}";
var styles$4 = {"profileIcon":"SummonerIcon-module_profileIcon__DtiAc","availability":"SummonerIcon-module_availability__LEzzj"};
styleInject(css_248z$4);

var ICONS_URL = 'https://raw.communitydragon.org/latest/game/assets/ux/summonericons';
var SummonerIcon = React.forwardRef(function (_a, ref) {
    var iconId = _a.iconId, _b = _a.size, size = _b === void 0 ? 128 : _b, selected = _a.selected, favorite = _a.favorite, availability = _a.availability, props = __rest$1(_a, ["iconId", "size", "selected", "favorite", "availability"]);
    return (React.createElement("div", __assign$1({}, props, { ref: ref, className: styles$4.profileIcon, style: { width: size, height: size }, "data-selected": selected, "data-favorite": favorite }),
        React.createElement("img", { loading: 'lazy', src: "".concat(ICONS_URL, "/profileicon").concat(iconId, ".png") }),
        availability !== undefined && (React.createElement("div", { className: styles$4.availability, "data-availability": availability }))));
});

var css_248z$3 = "@import url(\"https://rsms.me/inter/inter.css\");\n.Checkbox-module_checkbox__D0D4S {\n  width: fit-content;\n  min-width: 120px;\n  box-sizing: border-box;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  border: 3px solid #6957e7;\n  border-radius: 10px;\n  font-family: Inter;\n  font-size: 13px;\n  font-weight: normal;\n  color: #fffbf4;\n  padding: 0.4rem;\n  user-select: none;\n}\n.Checkbox-module_checkbox__D0D4S input {\n  width: 1rem;\n  height: 1rem;\n  cursor: pointer;\n}";
var styles$3 = {"checkbox":"Checkbox-module_checkbox__D0D4S"};
styleInject(css_248z$3);

var Checkbox = React.forwardRef(function (_a, ref) {
    var title = _a.title, _b = _a.initialState, initialState = _b === void 0 ? false : _b, onChange = _a.onChange, props = __rest$1(_a, ["title", "initialState", "onChange"]);
    return (React.createElement("div", __assign$1({}, props, { ref: ref, className: styles$3.checkbox }),
        React.createElement("span", null, title),
        React.createElement("input", { type: 'checkbox', defaultChecked: initialState, onChange: function (e) { return onChange(e.currentTarget.checked); } })));
});

var DefaultContext = {
  color: undefined,
  size: undefined,
  className: undefined,
  style: undefined,
  attr: undefined
};
var IconContext = React.createContext && React.createContext(DefaultContext);

var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __rest = undefined && undefined.__rest || function (s, e) {
  var t = {};

  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

function Tree2Element(tree) {
  return tree && tree.map(function (node, i) {
    return React.createElement(node.tag, __assign({
      key: i
    }, node.attr), Tree2Element(node.child));
  });
}

function GenIcon(data) {
  return function (props) {
    return React.createElement(IconBase, __assign({
      attr: __assign({}, data.attr)
    }, props), Tree2Element(data.child));
  };
}
function IconBase(props) {
  var elem = function (conf) {
    var attr = props.attr,
        size = props.size,
        title = props.title,
        svgProps = __rest(props, ["attr", "size", "title"]);

    var computedSize = size || conf.size || "1em";
    var className;
    if (conf.className) className = conf.className;
    if (props.className) className = (className ? className + ' ' : '') + props.className;
    return React.createElement("svg", __assign({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, conf.attr, attr, svgProps, {
      className: className,
      style: __assign(__assign({
        color: props.color || conf.color
      }, conf.style), props.style),
      height: computedSize,
      width: computedSize,
      xmlns: "http://www.w3.org/2000/svg"
    }), title && React.createElement("title", null, title), props.children);
  };

  return IconContext !== undefined ? React.createElement(IconContext.Consumer, null, function (conf) {
    return elem(conf);
  }) : elem(DefaultContext);
}

// THIS FILE IS AUTO GENERATED
function AiFillCaretDown (props) {
  return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 1024 1024"},"child":[{"tag":"path","attr":{"d":"M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"}}]})(props);
}function AiFillCaretUp (props) {
  return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 1024 1024"},"child":[{"tag":"path","attr":{"d":"M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"}}]})(props);
}

var css_248z$2 = "@import url(\"https://rsms.me/inter/inter.css\");\n.Dropdown-module_dropdown__HMCqD {\n  position: relative;\n  user-select: none;\n  width: max-content;\n}\n.Dropdown-module_dropdown__HMCqD[data-extended=true] .Dropdown-module_head__6dcyy {\n  border-radius: 10px 10px 0 0;\n}\n.Dropdown-module_dropdown__HMCqD[data-extended=true] .Dropdown-module_items__COHNO {\n  visibility: visible;\n}\n\n.Dropdown-module_head__6dcyy {\n  position: relative;\n  display: flex;\n  gap: 1rem;\n  background-color: #6957e7;\n  padding: 0.5rem;\n  align-items: center;\n  justify-content: space-between;\n  cursor: pointer;\n  border-radius: 10px;\n}\n\n.Dropdown-module_title__fLsjF {\n  font-family: Inter;\n  font-size: 13px;\n  font-weight: normal;\n  color: #fffbf4;\n}\n\n.Dropdown-module_items__COHNO {\n  position: absolute;\n  visibility: hidden;\n  min-width: 100%;\n  width: max-content;\n  display: grid;\n  grid-template-columns: 100%;\n  grid-auto-rows: max-content;\n}\n\n.Dropdown-module_items__COHNO > * {\n  background-color: #5541e4;\n  width: 100%;\n  position: relative;\n  border-radius: 0;\n}\n\n.Dropdown-module_item__f-Rhh {\n  font-family: Inter;\n  font-size: 13px;\n  font-weight: normal;\n  color: #fffbf4;\n  padding: 0.5rem 0 0.5rem 0;\n  text-align: center;\n}\n.Dropdown-module_item__f-Rhh[data-selected=true] {\n  background-color: #412ae1;\n}";
var styles$2 = {"dropdown":"Dropdown-module_dropdown__HMCqD","head":"Dropdown-module_head__6dcyy","items":"Dropdown-module_items__COHNO","title":"Dropdown-module_title__fLsjF","item":"Dropdown-module_item__f-Rhh"};
styleInject(css_248z$2);

var Dropdown = React.forwardRef(function (_a, ref) {
    var items = _a.items, initialItem = _a.initialItem, onChange = _a.onChange, props = __rest$1(_a, ["items", "initialItem", "onChange"]);
    var _b = useState(false), extended = _b[0], setExtended = _b[1];
    var _c = useState(initialItem), selected = _c[0], setSelected = _c[1];
    var iconColor = '#fff';
    var icon = extended ? (React.createElement(AiFillCaretUp, { color: iconColor })) : (React.createElement(AiFillCaretDown, { color: iconColor }));
    var handleChange = function (item) {
        setExtended(false);
        if (selected === item)
            return;
        setSelected(item);
        onChange(item);
    };
    return (React.createElement("div", __assign$1({}, props, { ref: ref, className: styles$2.dropdown, "data-extended": extended }),
        React.createElement("div", { className: styles$2.head, onClick: function () { return setExtended(!extended); } },
            React.createElement("span", { className: styles$2.title }, selected),
            icon),
        React.createElement("div", { className: styles$2.items }, items.map(function (title) { return (React.createElement("div", { className: styles$2.item, key: title, "data-selected": selected === title, onClick: function () { return handleChange(title); } },
            React.createElement("span", null, title))); }))));
});

var css_248z$1 = "@import url(\"https://rsms.me/inter/inter.css\");\n.Textbox-module_textbox__y3fY0 {\n  all: unset;\n  background-color: #313131;\n  font-family: Inter;\n  font-size: 13px;\n  font-weight: normal;\n  color: #fffbf4;\n  border: 3px solid #6957e7;\n  border-radius: 10px;\n  padding: 0.5rem;\n}";
var styles$1 = {"textbox":"Textbox-module_textbox__y3fY0"};
styleInject(css_248z$1);

var Textbox = React.forwardRef(function (props, ref) {
    return (React.createElement("input", __assign$1({}, props, { ref: ref, className: styles$1.textbox })));
});

var css_248z = "@import url(\"https://rsms.me/inter/inter.css\");\n.Splashart-module_splashart__9th0d {\n  width: 160px;\n  border-radius: 20px;\n}\n.Splashart-module_splashart__9th0d[data-favorite=true] {\n  border: 4px solid #d86ada;\n}\n.Splashart-module_splashart__9th0d[data-selected=true] {\n  border: 4px solid #6957e7;\n}\n.Splashart-module_splashart__9th0d img {\n  max-width: 100%;\n  max-height: 100%;\n  border-radius: 20px;\n  pointer-events: none;\n}";
var styles = {"splashart":"Splashart-module_splashart__9th0d"};
styleInject(css_248z);

var SPLASHART_URL = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes';
var Splashart = React.forwardRef(function (_a, ref) {
    var skinId = _a.skinId, selected = _a.selected, favorite = _a.favorite, props = __rest$1(_a, ["skinId", "selected", "favorite"]);
    var championId = Math.floor(skinId / 1000);
    return (React.createElement("div", __assign$1({}, props, { ref: ref, className: styles.splashart, "data-selected": selected, "data-favorite": favorite }),
        React.createElement("img", { loading: 'lazy', src: "".concat(SPLASHART_URL, "/").concat(championId, "/").concat(skinId, ".jpg") })));
});

export { Badge, Button, Checkbox, Dropdown, Splashart, SummonerIcon, Textbox };
//# sourceMappingURL=index.js.map
