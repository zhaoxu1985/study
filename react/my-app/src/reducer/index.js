import {
    combineReducers
} from 'redux';

//导入自己创建的 reducer 
import {
    reducer as count
} from './count'
import {
    reducer as list
} from './list'

//构建 Store 

export default combineReducers({
    count,
    list
});