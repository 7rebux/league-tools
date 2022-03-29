import React from 'react';

var Font = {
    text: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
};
var Color = {
    surface: '#150233',
    primary: '#D86ADA',
    secondary: '#6957E7',
    textPrimary: '#FFFBF4',
    textSecondary: '#D4CFCD',
};

function adjustColor(color, anmount) {
    return color.replace(/\w\w/g, function (m) {
        return Math.min(255, Math.max(0, parseInt(m, 16) + anmount)).toString(16);
    });
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

var css_248z$1 = ".Badge-module_badge__ZbEBU {\n  min-width: 4rem;\n  min-height: 1.3rem;\n  width: fit-content;\n  padding: 0.3rem 0.8rem 0.3rem 0.8rem;\n  border: 0.4rem solid;\n  border-radius: 100vw;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 0.3rem;\n  user-select: none;\n  pointer-events: none;\n}\n.Badge-module_badge__ZbEBU img {\n  width: 1.3rem;\n  height: 1.3rem;\n}\n.Badge-module_badge__ZbEBU span {\n  font-size: 15px;\n  font-weight: 300;\n}";
var styles$1 = {"badge":"Badge-module_badge__ZbEBU"};
styleInject(css_248z$1);

function Badge(_a) {
    var text = _a.text, icon = _a.icon, _b = _a.backgroundColor, backgroundColor = _b === void 0 ? Color.primary : _b, _c = _a.color, color = _c === void 0 ? Color.textPrimary : _c;
    var badgeStyle = {
        backgroundColor: backgroundColor,
        borderColor: adjustColor(backgroundColor, -20),
    };
    var textStyle = {
        color: color,
        fontFamily: Font.text,
    };
    return (React.createElement("div", { className: styles$1.badge, style: badgeStyle },
        icon !== undefined && React.createElement("img", { src: icon }),
        text !== undefined && React.createElement("span", { style: textStyle }, text)));
}

var css_248z = ".Button-module_button__18Bed {\n  padding: 8px;\n  min-width: 7rem;\n  width: fit-content;\n  user-select: none;\n  border-radius: 5px;\n  text-align: center;\n}\n.Button-module_button__18Bed span {\n  font-size: 17px;\n  font-weight: 600;\n}";
var styles = {"button":"Button-module_button__18Bed"};
styleInject(css_248z);

function Button(_a) {
    var title = _a.title;
    var buttonStyle = {
        background: "linear-gradient(72deg, ".concat(Color.primary, ", ").concat(Color.secondary, ")"),
    };
    var textStyle = {
        color: Color.textPrimary,
        fontFamily: Font.text,
    };
    return (React.createElement("div", { className: styles.button, style: buttonStyle },
        React.createElement("span", { style: textStyle }, title)));
}

export { Badge, Button };
//# sourceMappingURL=index.js.map
