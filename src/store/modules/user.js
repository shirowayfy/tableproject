import firebase from 'firebase';

export default {
    actions: {
        async SET_USER(ctx, name) {
            const db = firebase.firestore()

            await db.collection('users').doc(name.uid).get().then(snap => {
                const data = snap.data()
                data.uid = name.uid
                ctx.commit('UPDATE_USER', data)
            })
        },
        async RESET_USER(ctx) {
            const user = {
                uid: null,
                name: null,
                group: null,
                admin: false
            }
            ctx.commit('UPDATE_USER', user)
        }
    },
    mutations: {
        UPDATE_USER(state, payload) {
            state.id = payload.uid
            state.group = payload.group
            state.name = payload.name
            state.admin = payload.admin
        }
    },
    state: {
        id: null,
        name: null,
        group: null,
        admin: false
    },
    getters: {
        GET_USER(state) {
            return state
        }
    }
}