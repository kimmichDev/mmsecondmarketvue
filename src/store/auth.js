export default {
    state: {
        authenticated: false,
        user: null,
    },
    mutations: {
        SET_USER: (state, payload) => {
            state.user = payload;
            state.authenticated = true
        }
    },
    actions: {
        setUser: ({ commit }, payload) => commit("SET_USER", payload)
    }
}