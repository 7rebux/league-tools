import React, { useState } from 'react';

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

var css_248z$7 = "@import url(\"https://rsms.me/inter/inter.css\");\n.Badge-module_badge__ZbEBU {\n  min-width: 4rem;\n  min-height: 1.3rem;\n  width: fit-content;\n  padding: 0.3rem 0.8rem 0.3rem 0.8rem;\n  border: 0.4rem solid;\n  border-radius: 100vw;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 0.3rem;\n  user-select: none;\n  pointer-events: none;\n}\n.Badge-module_badge__ZbEBU img {\n  width: 1.3rem;\n  height: 1.3rem;\n}\n.Badge-module_badge__ZbEBU span {\n  font-family: Inter;\n  font-size: 13px;\n  font-weight: normal;\n  color: #fffbf4;\n}";
var styles$7 = {"badge":"Badge-module_badge__ZbEBU"};
styleInject(css_248z$7);

function adjustColor(color, anmount) {
    return color.replace(/\w\w/g, function (m) {
        return Math.min(255, Math.max(0, parseInt(m, 16) + anmount)).toString(16);
    });
}
var Badge = function (_a) {
    var text = _a.text, icon = _a.icon, _b = _a.backgroundColor, backgroundColor = _b === void 0 ? '#d86ada' : _b, _c = _a.color, color = _c === void 0 ? '#fffbf4' : _c;
    var badgeStyle = {
        backgroundColor: backgroundColor,
        borderColor: adjustColor(backgroundColor, -20),
    };
    var textStyle = {
        color: color,
    };
    return (React.createElement("div", { style: badgeStyle, className: styles$7.badge },
        icon !== undefined && React.createElement("img", { src: icon }),
        text !== undefined && React.createElement("span", { style: textStyle }, text)));
};

var css_248z$6 = "@import url(\"https://rsms.me/inter/inter.css\");\n.Button-module_button__18Bed, .Button-module_secondary__j-3rj, .Button-module_primary__st6yY {\n  padding: 9px;\n  min-width: 7rem;\n  width: fit-content;\n  user-select: none;\n  border-radius: 5px;\n  text-align: center;\n}\n.Button-module_button__18Bed:hover, .Button-module_secondary__j-3rj:hover, .Button-module_primary__st6yY:hover {\n  box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 10px;\n}\n.Button-module_button__18Bed span, .Button-module_secondary__j-3rj span, .Button-module_primary__st6yY span {\n  font-family: Inter;\n  font-size: 13px;\n  font-weight: normal;\n  color: #fffbf4;\n  font-size: 16px;\n}\n\n.Button-module_primary__st6yY {\n  background: linear-gradient(72deg, #d86ada, #6957e7);\n}";
var styles$6 = {"button":"Button-module_button__18Bed","secondary":"Button-module_secondary__j-3rj","primary":"Button-module_primary__st6yY"};
styleInject(css_248z$6);

var Button = function (_a) {
    var title = _a.title, _b = _a.variant, variant = _b === void 0 ? 'primary' : _b, onClick = _a.onClick;
    return (React.createElement("div", { className: styles$6[variant], onClick: onClick },
        React.createElement("span", null, title)));
};

var css_248z$5 = "@import url(\"https://rsms.me/inter/inter.css\");\n.SummonerIcon-module_profileIcon__DtiAc {\n  position: relative;\n  box-sizing: border-box;\n  border-radius: 25%;\n}\n.SummonerIcon-module_profileIcon__DtiAc img {\n  pointer-events: none;\n  max-width: 100%;\n  max-height: 100%;\n  border-radius: 25%;\n}\n.SummonerIcon-module_profileIcon__DtiAc[data-selected=true] {\n  border: 4px solid #6957e7;\n}\n\n.SummonerIcon-module_availability__LEzzj[data-availability=chat] {\n  background-color: #29c45a;\n  border-color: #177033;\n}\n\n.SummonerIcon-module_availability__LEzzj[data-availability=away] {\n  background-color: #c73c3c;\n  border-color: #7a2323;\n}\n\n.SummonerIcon-module_availability__LEzzj[data-availability=dnd] {\n  background-color: #4ab3e4;\n  border-color: #1a7fae;\n}\n\n.SummonerIcon-module_availability__LEzzj[data-availability=offline] {\n  background-color: #8f8b8b;\n  border-color: #5c5858;\n}\n\n.SummonerIcon-module_availability__LEzzj[data-availability=mobile] {\n  background-color: #8f8b8b;\n  border-color: #5c5858;\n}\n\n.SummonerIcon-module_availability__LEzzj {\n  position: absolute;\n  bottom: 10%;\n  right: 10%;\n  height: 15%;\n  width: 15%;\n  border-radius: 50%;\n  border: 4px solid;\n}";
var styles$5 = {"profileIcon":"SummonerIcon-module_profileIcon__DtiAc","availability":"SummonerIcon-module_availability__LEzzj"};
styleInject(css_248z$5);

var ProfileIcon = function (_a) {
    var iconId = _a.iconId, availability = _a.availability, _b = _a.selected, selected = _b === void 0 ? false : _b, _c = _a.favorite, favorite = _c === void 0 ? false : _c, _d = _a.size, size = _d === void 0 ? 128 : _d;
    return (React.createElement("div", { className: styles$5.profileIcon, style: { width: size, height: size }, "data-selected": selected, "data-favorite": favorite },
        React.createElement("img", { loading: 'lazy', src: "https://raw.communitydragon.org/latest/game/assets/ux/summonericons/profileicon".concat(iconId, ".png") }),
        availability !== undefined && (React.createElement("div", { className: "".concat(styles$5.availability), "data-availability": availability }))));
};

var css_248z$4 = "@import url(\"https://rsms.me/inter/inter.css\");\n.Profile-module_profile__h1lkJ {\n  display: flex;\n  gap: 2rem;\n  padding: 1.5rem;\n  border-radius: 30px;\n  background-color: #313131;\n  width: fit-content;\n  user-select: none;\n}\n\n.Profile-module_content__KpGNh {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n\n.Profile-module_header__aCh-O {\n  display: flex;\n  flex-direction: row;\n  gap: 1rem;\n}\n\n.Profile-module_badges__4e8ms {\n  display: flex;\n  gap: 1rem;\n}\n\n.Profile-module_name__XG5Nd {\n  font-family: Inter;\n  font-size: 28px;\n  font-weight: 300;\n  color: #fffbf4;\n}\n\n.Profile-module_riotId__CjT9U {\n  font-family: Inter;\n  font-size: 15px;\n  font-weight: 300;\n  color: #d4cfcd;\n  font-size: 28px;\n}";
var styles$4 = {"profile":"Profile-module_profile__h1lkJ","content":"Profile-module_content__KpGNh","header":"Profile-module_header__aCh-O","badges":"Profile-module_badges__4e8ms","name":"Profile-module_name__XG5Nd","riotId":"Profile-module_riotId__CjT9U"};
styleInject(css_248z$4);

var Profile = function (_a) {
    var name = _a.name, riotId = _a.riotId, iconId = _a.iconId, availability = _a.availability, level = _a.level, rank = _a.rank, region = _a.region;
    return (React.createElement("div", { className: styles$4.profile },
        React.createElement(ProfileIcon, { iconId: iconId, availability: availability }),
        React.createElement("div", { className: styles$4.content },
            React.createElement("div", { className: styles$4.header },
                React.createElement("span", { className: styles$4.name }, name),
                React.createElement("span", { className: styles$4.riotId },
                    "#",
                    riotId)),
            React.createElement("div", { className: styles$4.badges },
                React.createElement(Badge, { text: region, icon: '' }),
                React.createElement(Badge, { text: level.toString(), icon: '' }),
                React.createElement(Badge, { text: rank, icon: '' })))));
};

var css_248z$3 = "@import url(\"https://rsms.me/inter/inter.css\");\n.Checkbox-module_checkbox__D0D4S {\n  display: flex;\n  padding: 0.4rem;\n  min-width: 120px;\n  width: fit-content;\n  align-items: center;\n  justify-content: space-between;\n  user-select: none;\n  box-sizing: border-box;\n  border: 3px solid #6957e7;\n  border-radius: 10px;\n}\n\n.Checkbox-module_title__4wPSH {\n  font-family: Inter;\n  font-size: 13px;\n  font-weight: normal;\n  color: #fffbf4;\n}\n\n.Checkbox-module_box__KLUVK {\n  width: 1rem;\n  height: 1rem;\n  cursor: pointer;\n}";
var styles$3 = {"checkbox":"Checkbox-module_checkbox__D0D4S","title":"Checkbox-module_title__4wPSH","box":"Checkbox-module_box__KLUVK"};
styleInject(css_248z$3);

var Checkbox = function (_a) {
    var title = _a.title, _b = _a.initialState, initialState = _b === void 0 ? false : _b, onChange = _a.onChange;
    return (React.createElement("div", { className: styles$3.checkbox },
        React.createElement("span", { className: styles$3.title }, title),
        React.createElement("input", { className: styles$3.box, type: 'checkbox', defaultChecked: initialState, onChange: function (e) { return onChange(e.currentTarget.checked); } })));
};

var css_248z$2 = "@import url(\"https://rsms.me/inter/inter.css\");\n.Dropdown-module_dropdown__HMCqD {\n  user-select: none;\n  width: fit-content;\n}\n\n.Dropdown-module_head__6dcyy {\n  display: flex;\n  gap: 1rem;\n  background-color: #6957e7;\n  padding: 0.5rem;\n  align-items: center;\n  justify-content: space-between;\n  cursor: pointer;\n  border-radius: 10px;\n}\n.Dropdown-module_head__6dcyy[data-custom=true] {\n  border-radius: 10px 10px 0 0;\n}\n\n.Dropdown-module_title__fLsjF {\n  font-family: Inter;\n  font-size: 13px;\n  font-weight: normal;\n  color: #fffbf4;\n}\n\n.Dropdown-module_items__COHNO {\n  max-height: 200px;\n  overflow-y: scroll;\n}\n\n.Dropdown-module_items__COHNO > * {\n  background-color: #5541e4;\n  width: auto;\n  border-radius: 0;\n}\n\n.Dropdown-module_item__f-Rhh {\n  font-family: Inter;\n  font-size: 13px;\n  font-weight: normal;\n  color: #fffbf4;\n  padding: 0.5rem;\n}\n.Dropdown-module_item__f-Rhh[data-custom=true] {\n  background-color: #412ae1;\n}";
var styles$2 = {"dropdown":"Dropdown-module_dropdown__HMCqD","head":"Dropdown-module_head__6dcyy","title":"Dropdown-module_title__fLsjF","items":"Dropdown-module_items__COHNO","item":"Dropdown-module_item__f-Rhh"};
styleInject(css_248z$2);

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

var Dropdown = function (_a) {
    var items = _a.items, _b = _a.initialItem, initialItem = _b === void 0 ? 'Select..' : _b, onChange = _a.onChange;
    var _c = useState(false), extended = _c[0], setExtended = _c[1];
    var _d = useState(initialItem), selected = _d[0], setSelected = _d[1];
    var icon = extended ? (React.createElement(AiFillCaretUp, { color: '#fff' })) : (React.createElement(AiFillCaretDown, { color: '#fff' }));
    var handleChange = function (item) {
        setExtended(false);
        if (selected === item)
            return;
        setSelected(item);
        onChange(item);
    };
    return (React.createElement("div", { className: styles$2.dropdown },
        React.createElement("div", { className: styles$2.head, "data-custom": extended, onClick: function () { return setExtended(!extended); } },
            React.createElement("span", { className: styles$2.title }, selected),
            icon),
        extended && (React.createElement("div", { className: styles$2.items }, items.map(function (title) { return (React.createElement("div", { className: styles$2.item, "data-custom": selected === title, onClick: function () { return handleChange(title); } }, title)); })))));
};

var css_248z$1 = "@import url(\"https://rsms.me/inter/inter.css\");\n.Textbox-module_textbox__y3fY0 {\n  font-family: Inter;\n  font-size: 13px;\n  font-weight: normal;\n  color: #fffbf4;\n  border: 3px solid #6957e7;\n  border-radius: 10px;\n  outline: none;\n  background-color: #313131;\n  padding: 0.5rem;\n}";
var styles$1 = {"textbox":"Textbox-module_textbox__y3fY0"};
styleInject(css_248z$1);

var Textbox = function (_a) {
    var placeholder = _a.placeholder, onInput = _a.onInput;
    var _b = useState(''), input = _b[0], setInput = _b[1];
    function handleInput(e) {
        var value = e.target.value;
        setInput(value);
        onInput(value);
    }
    return (React.createElement("input", { className: styles$1.textbox, value: input, onInput: function (e) { return handleInput(e); }, placeholder: placeholder }));
};

var css_248z = "@import url(\"https://rsms.me/inter/inter.css\");\n.Splashart-module_splashart__9th0d {\n  border-radius: 20px;\n  width: 160px;\n}\n.Splashart-module_splashart__9th0d img {\n  pointer-events: none;\n  max-width: 100%;\n  max-height: 100%;\n  border-radius: 20px;\n}\n.Splashart-module_splashart__9th0d[data-selected=true] {\n  border: 4px solid #6957e7;\n}";
var styles = {"splashart":"Splashart-module_splashart__9th0d"};
styleInject(css_248z);

var Splashart = function (_a) {
    var skinId = _a.skinId, _b = _a.selected, selected = _b === void 0 ? false : _b, _c = _a.favorite, favorite = _c === void 0 ? false : _c;
    var championId = Math.floor(skinId / 1000);
    return (React.createElement("div", { className: styles.splashart, "data-selected": selected, "data-favorite": favorite },
        React.createElement("img", { loading: 'lazy', src: "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/".concat(championId, "/").concat(skinId, ".jpg") })));
};

export { Badge, Button, Checkbox, Dropdown, Profile, Splashart, ProfileIcon as SummonerIcon, Textbox };
//# sourceMappingURL=index.js.map
