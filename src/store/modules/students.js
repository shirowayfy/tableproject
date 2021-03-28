import firebase from 'firebase';

export default {
    actions: {
        async fetchStudents(ctx) {
            const db = firebase.firestore()

            const students = []

            await db.collection('students')
                .get().then(snap => {
                    snap.forEach(el => {
                        students.push(el.data())
                    });
                })
            ctx.commit('updateStudents', students)
        }
    },
    mutations: {
        updateStudents(state, payload) {
            state.students = payload
        }
    },
    state: {
        students: []
    },
    getters: {
        allStudents(state) {
            return state.students
        }
    }
}