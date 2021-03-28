import firebase from 'firebase';

export default {
    actions: {
        async fetchUsers(ctx) {
            const db = firebase.firestore()

            const marked = []

            await db.collection('marked')
                .get().then(snap => {
                    snap.forEach(el => {
                        marked.push(el.data())
                    });
                })
            ctx.commit('updateMarked', marked)
        }
    },
    mutations: {
        updateMarked(state, payload) {
            state.marked = payload
        }
    },
    state: {
        marked: []
    },
    getters: {
        allMarked(state) {
            return state.marked
        }
    }
}