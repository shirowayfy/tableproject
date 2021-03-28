<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
    computed: {
      ...mapGetters(["allStudents"]),
      ...mapGetters(['allMarked'])
      },
    methods: {
        ...mapActions(["fetchStudents"]),
        ...mapActions(["fetchUsers"]),
    },
    created() {
        const date = new Date()
        const currentDate = `${date.getDate().toString().length > 1 ? date.getDate() : '0' + date.getDate()}:${date.getMonth().toString().length > 1 ? date.getMonth() : '0' + date.getMonth()}`
        const db = this.$firebase.firestore()
        db.collection('currentDate').get().then(qs => {
            qs.forEach(doc => {
                if (currentDate !== doc.data().currentDate) {
                    doc.ref.update({
                        currentDate
                    })
                    db.collection('marked').get().then(qs => {
                        qs.forEach(doc => {
                            doc.ref.delete()
                        })
                    })
                }
            })
        })
    },
    mounted() {
        this.fetchStudents();
        this.fetchUsers();
    },
};
</script>  

<style lang="scss">
*,
*::after,
*::before {
    box-sizing: border-box;
    font-family: "Open Sans", sans-serif;
}

body {
    background: #eee;
}

input {
    border: none;
}

button {
    border: none;

    &:focus {
        outline: none;
    }
}

.flex {
    display: flex;
    justify-content: center;
    align-items: center;
}

.viewport {
    max-width: 1200px;
    margin: 0 auto;
}

</style>
