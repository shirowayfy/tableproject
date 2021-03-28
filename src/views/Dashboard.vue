<template>
    <div class="dashboard">
        <Navbar />
        <div class="success" v-show="isSuccess">Данные успешно отправлены</div>
        <PageBoard :title="'ученики'" :group="group">
            <div class="viewport">
                <div class="student" v-for="(item, i) of currentStudents" :key="i">
                    <div class="student__name">{{ item.name }}</div>
                    <button
                        class="btn"
                        @click="changeMarked(item)"
                        :class="{
                            active: marked.some((el) => el.name === item.name),
                        }"
                    >
                        Отметить
                    </button>
                </div>
                <button class="btn-apply" @click="sendData">Отправить</button>
            </div>
        </PageBoard>
    </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import PageBoard from "../components/PageBoard.vue";
import { mapActions } from "vuex";

export default {
    data() {
        return {
            group: null,
            isTapped: false,
            students: null,
            marked: null,
            isSuccess: false,
        };
    },
    components: {
        Navbar,
        PageBoard,
    },
    computed: {
        currentStudents() {
            return [...this.students]
                .sort((a, b) => (a.name > b.name ? 1 : -1));
        },
    },
    created() {
        if (!this.$store.getters["GET_USER"].id) {
            this.$router.push({ name: "auth" });
        }
        this.group = this.$store.getters["GET_USER"].group;
        this.marked = this.$store.getters["allMarked"].filter(
            (el) => el.group === this.group
        );
        this.students = this.$store.getters["allStudents"].filter(
            (el) => el.group === this.group
        );
    },
    methods: {
        ...mapActions(["fetchUsers"]),
        sendData() {
            const db = this.$firebase.firestore();
            db.collection("marked")
                .where("group", "==", this.group)
                .get()
                .then((qs) => {
                    qs.forEach((doc) => {
                        doc.ref.delete();
                    });
                    for (let i = 0; i < this.marked.length; i++) {
                        db.collection("marked").doc().set(this.marked[i]);
                    }
                })
                .then(() => {
                    this.isSuccess = true;
                    setTimeout(() => {
                        this.isSuccess = false;
                    }, 1500);
                });
        },
        changeMarked(item) {
            let n = true;
            for (let i = 0; i < this.marked.length; i++) {
                if (this.marked[i].name === item.name) {
                    this.marked.splice(i, 1);
                    n = false;
                }
            }
            if (n) {
                this.marked.push(item);
            }
        },
    },
    mounted() {
        this.fetchUsers();
    },
};
</script>

<style lang="scss" scoped>
.dashboard {
    padding-top: 100px;
}
.viewport {
    padding: 20px 50px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: static;
}
.success {
    position: fixed;
    z-index: 100;
    bottom: 10vh;
    left: 50%;
    transform: translateX(-50%);
    width: 400px;
    height: 40px;
    background: lightgreen;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 20px;
    transition: all 0.3s;
}
.student {
    height: 50px;
    padding: 0 36px;
    margin-bottom: 25px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__name {
        font-size: 1em;
    }

    & > .btn {
        font-size: 0.7em;
        padding: 5px 67px;
        transition: all 0.3s;
        background: #ffffff;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

        &.active {
            color: #fff;
            background: #1177d1;
        }

        &:hover {
            cursor: pointer;
        }
    }
}
.btn-apply {
    padding: 8px 70px;
    font-size: 0.7em;
    color: #fff;
    background: #1177d1;

    &:hover {
        cursor: pointer;
    }
}

@media (max-width: 700px) {
    .viewport {
        padding: 10px 25px;
    }
    .student {
        padding: 20px;
        flex-direction: column;
        height: 100px;

        &__name {
            margin-bottom: 10px;
        }
    }
}
</style>