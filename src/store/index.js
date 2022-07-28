import { createStore } from "vuex";

// plugin
import createPersistedState from 'vuex-persistedstate'
import SecureLS from "secure-ls";

// module
import auth from "./auth";

let ls = new SecureLS({ isCompression: false });
export default createStore({
    modules: {
        auth
    },
    plugins: [
        createPersistedState({
            storage: {
                getItem: (key) => ls.get(key),
                setItem: (key, value) => ls.set(key, value),
                removeItem: (key) => ls.remove(key),
            },
        }),
    ]
})
