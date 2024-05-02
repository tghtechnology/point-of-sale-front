const initialStore = {
    user: { id: 1, name: 'luis'},
    products: [
        {id: 1, title: 'Product #1'},
        {id: 2, title: 'Product #2'}
    ]
}


const storeReducer = (state, action) => {
    switch(action.type) {
        default:
            return state;
    }
}

export { initialStore }
export default  storeReducer;