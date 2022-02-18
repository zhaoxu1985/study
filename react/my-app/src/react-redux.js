import React, { PureComponent } from 'react'
import ReactDom from 'react-dom'
import ComA from './components/comA'
import ComB from './components/comB'
import store from './store/index'
import {Provider} from 'react-redux'

ReactDom.render(
  <div style={{textAlign:'center'}}>
    <Provider store={store}> 
      <ComA/>
      <ComB/>
    </Provider>
     
  </div>
  ,
  document.getElementById('root')
)