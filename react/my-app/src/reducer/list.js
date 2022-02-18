const initState = {
    list: [],

}
const reducer = (state = initState, action) => {
    switch (action.type) {
        case 'LIST_ADD':
            state.list.push(action.value)
            return ({
                list: state.list
            })
        case 'LIST_SUB':
            return ({
                list: state.list.splice(0, 1)
            })
        default:
            return state
    }
}
module.exports = {
    reducer
}