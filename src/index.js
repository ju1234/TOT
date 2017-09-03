/**
 * Created by jufei on 2017/6/12.
 *
 * 入口文件
 */
import React from 'react';
import {render} from 'react-dom';
import App from './components/Wrapper';
//========================================================
import './utils/iSroll-polyfill';

render(<App/>, document.getElementById('root'));
