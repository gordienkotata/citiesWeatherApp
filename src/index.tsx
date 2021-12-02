import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { Store } from './store/store';

import "antd/lib/button/style/index.css";
import "antd/lib/input/style/index.css";
import "antd/lib/form/style/index.css";
import "antd/lib/date-picker/style/index.css";
import "antd/dist/antd.css";


import MainApp from './pages/MainApp';

render(<Provider store={Store}><MainApp /></Provider>, document.getElementById('root'));