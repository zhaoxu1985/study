const initState = {
    count: 0,

}
const reducer = (state = initState, action) => {
    switch (action.type) {
        case 'add':
            return ({
                count: state.count + action.value
            })
        case 'sub':
            return ({
                count: state.count - action.value
            })
        default:
            return state
    }
}
module.exports = {
    reducer
}