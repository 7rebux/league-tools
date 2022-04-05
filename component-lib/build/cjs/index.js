'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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

var css_248z$1 = "@import url(\"https://rsms.me/inter/inter.css\");\n.Badge-module_badge__ZbEBU {\n  min-width: 4rem;\n  min-height: 1.3rem;\n  width: fit-content;\n  padding: 0.3rem 0.8rem 0.3rem 0.8rem;\n  border: 0.4rem solid;\n  border-radius: 100vw;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 0.3rem;\n  user-select: none;\n  pointer-events: none;\n}\n.Badge-module_badge__ZbEBU img {\n  width: 1.3rem;\n  height: 1.3rem;\n}\n.Badge-module_badge__ZbEBU span {\n  font-family: Inter;\n  font-size: 13px;\n  font-weight: normal;\n  color: #fffbf4;\n}";
var styles$1 = {"badge":"Badge-module_badge__ZbEBU"};
styleInject(css_248z$1);

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
    return (React__default["default"].createElement("div", { style: badgeStyle, className: styles$1.badge },
        icon !== undefined && React__default["default"].createElement("img", { src: icon }),
        text !== undefined && React__default["default"].createElement("span", { style: textStyle }, text)));
};

var css_248z = "@import url(\"https://rsms.me/inter/inter.css\");\n.Button-module_button__18Bed, .Button-module_secondary__j-3rj, .Button-module_primary__st6yY {\n  padding: 9px;\n  min-width: 7rem;\n  width: fit-content;\n  user-select: none;\n  border-radius: 5px;\n  text-align: center;\n}\n.Button-module_button__18Bed:hover, .Button-module_secondary__j-3rj:hover, .Button-module_primary__st6yY:hover {\n  box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 10px;\n}\n.Button-module_button__18Bed span, .Button-module_secondary__j-3rj span, .Button-module_primary__st6yY span {\n  font-family: Inter;\n  font-size: 13px;\n  font-weight: normal;\n  color: #fffbf4;\n  font-size: 16px;\n}\n\n.Button-module_primary__st6yY {\n  background: linear-gradient(72deg, #d86ada, #6957e7);\n}";
var styles = {"button":"Button-module_button__18Bed","secondary":"Button-module_secondary__j-3rj","primary":"Button-module_primary__st6yY"};
styleInject(css_248z);

var Button = function (_a) {
    var title = _a.title, _b = _a.variant, variant = _b === void 0 ? 'primary' : _b, onClick = _a.onClick;
    return (React__default["default"].createElement("div", { className: styles[variant], onClick: onClick },
        React__default["default"].createElement("span", null, title)));
};

exports.Badge = Badge;
exports.Button = Button;
//# sourceMappingURL=index.js.map
