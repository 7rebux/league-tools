import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Badge } from 'component-lib';

function render() {
  ReactDOM.render(
    <div>
      <Badge
        text='Welcome'
        icon='https://images.emojiterra.com/google/android-pie/512px/1f44b.png'
      />
      <h2>Hello from React!</h2>
    </div>,
    document.body
  );
}

render();
