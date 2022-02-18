/**
 * @format
 */
// 导入 AppRegistry 组件， 他到作用，就是注册项目首页的
import {AppRegistry} from 'react-native';
import App from './App';
import MyHomeOage from './MyHomePage'
import BtnPage from './BtnPage';
import Rpx from './components/Rpx'
import Login from './components/Login'
import {name as appName} from './app.json';


//当使用AppRegistry 注册项目的时候，方法中的第一个参数，不要修改，否则项目就跑不起来了
//第二个参数。表示把那个页面注册为项目的首页
AppRegistry.registerComponent(appName, () => Login);
