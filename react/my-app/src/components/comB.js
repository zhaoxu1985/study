import { thisExpression } from '@babel/types'
import React, { PureComponent } from 'react'


import { connect } from 'react-redux'
class ComB extends PureComponent {
    state = {
        count:0
    }
    render() {
        return (
            <div>
                {this.props.count}
            </div>
        )
    }
}

const mapStateToProps = (state,ownProps)=>{
    return state
}
export default connect(mapStateToProps)(ComB)