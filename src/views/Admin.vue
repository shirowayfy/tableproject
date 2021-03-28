<template>
    <div class="admin">
        <div class="success" v-show="isSuccess">Данные успешно отправлены</div>
        <form class="add-modal" @submit.prevent="addToDB" v-show="isOpen">
            <h3 class="add-modal__title">
                {{isEdit ? 'Редактировать' : 'Добавить ученика'}}
                <span class="material-icons close" @click="closeModal">
                    close
                </span>
            </h3>
            <div class="inputs">
                <label for="">
                    <input
                        type="text"
                        placeholder="Имя"
                        v-model="name"
                        class="name"
                        :disabled="isEdit"
                        required
                    />
                </label>
                <label for="">
                    <input
                        type="text"
                        placeholder="Класс"
                        @input="group = group.replace(/\D/g, '').slice(0, 2)"
                        v-model="group"
                        class="group"
                        required
                    />
                    <div class="words">
                        <div
                            :class="{ active: word === 'A' }"
                            @click="word = 'A'"
                        >
                            A
                        </div>
                        <div
                            :class="{ active: word === 'B' }"
                            @click="word = 'B'"
                        >
                            B
                        </div>
                    </div>
                </label>
                <label for="">
                    <input
                        type="text"
                        placeholder="Стол"
                        @input="table = table.replace(/\D/g, '').slice(0, 2)"
                        v-model="table"
                        class="table"
                        required
                    />
                </label>
            </div>
            <div class="select">
                <div
                    :class="{ active: isTown }"
                    class="select-item"
                    @click="isTown = true"
                >
                    Город
                </div>
                <div
                    :class="{ active: !isTown }"
                    class="select-item"
                    @click="isTown = false"
                >
                    Общежитие
                </div>
            </div>
            <div class="days">
                <div
                    class="day"
                    :class="{ active: outDays.includes(day) }"
                    @click="updateDays(day)"
                    v-for="(day, ind) of days"
                    :key="ind"
                >
                    {{ day }}
                </div>
            </div>
            <button class="add-btn">
                {{ isEdit ? "Сохранить" : "Добавить" }}
            </button>
        </form>
        <Navbar :admin="true" />
        <PageBoard :title="'Панель управления'">
            <div class="admin__panel viewport">
                <div class="panel-select">
                    <div
                        class="panel-select__btn"
                        :class="{ active: currentGroup === group }"
                        v-for="(group, i) of groups"
                        @click="currentGroup = group"
                        :key="i"
                    >
                        {{ group }}
                    </div>
                    <div class="panel-select__add" @click="openModal">
                        Добавить
                    </div>
                </div>
                <div
                    class="panel-item"
                    v-for="(student, i) of currentStudents"
                    :key="i"
                >
                    <div class="panel-item__title">{{ student.name }}</div>
                    <div class="panel-item__controls">
                        <button
                            class="controls-btn"
                            @click="changeIsEdit(student)"
                        >
                            Редактировать
                        </button>
                        <button
                            class="controls-btn"
                            @click="deleteFromDB(student)"
                        >
                            Удалить
                        </button>
                    </div>
                </div>
            </div>
        </PageBoard>
    </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import PageBoard from "../components/PageBoard.vue";
export default {
    data() {
        return {
            days: ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"],
            outDays: ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"],
            groups: ["8A", "8B", "9A", "9B", "10A", "10B", "11A", "11B"],
            currentGroup: "8A",
            name: null,
            group: null,
            table: null,
            students: null,
            word: "A",
            currentStudent: null,
            isOpen: false,
            isSuccess: false,
            isTown: false,
            isEdit: false,
        };
    },
    components: {
        Navbar,
        PageBoard,
    },
    computed: {
        currentStudents() {
            return this.students
                .filter((el) => el.group === this.currentGroup)
                .sort((a, b) => (a.name > b.name ? 1 : -1));
        },
    },
    created() {
        if (!this.$store.getters["GET_USER"].admin) {
            this.$router.push({ name: "auth" });
        }
        this.students = this.$store.getters["allStudents"];
    },
    methods: {
        closeModal() {
            this.isOpen = false;
            this.name = "";
            this.table = "";
            this.isTown = false
            this.outDays = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"]
        },
        openModal() {
            this.isEdit = false;
            this.isOpen = true;
        },
        changeIsEdit(student) {
            this.isEdit = true;
            this.name = student.name;
            this.group = student.group.slice(0, student.group.length - 1);
            this.word = student.group.slice(student.group.length - 1);
            this.table = student.table;
            this.outDays = student.days;
            this.isTown = student.isTown || false;
            this.isOpen = true;
            this.currentStudent = student;
        },
        updateDays(day) {
            if (this.outDays.includes(day)) {
                this.outDays.splice(this.outDays.indexOf(day), 1);
            } else {
                this.outDays.push(day);
            }
        },
        deleteFromDB(item) {
            const db = this.$firebase.firestore();
            const ans = confirm("Вы уверены в этом?");
            if (ans) {
                db.collection("students")
                    .where("name", "==", item.name)
                    .get()
                    .then((qs) => {
                        qs.forEach((doc) => {
                            doc.ref.delete();
                        });
                    })
                    .then(() => {
                        this.students.splice(this.students.indexOf(item), 1);
                    });
            }
        },
        addToDB() {
            const name = this.name.replace(/\s{2,}/g, " ").trim();
            const group = this.group + this.word;
            const obj = {
                name,
                group,
                table: this.table,
                days: this.outDays,
                isTown: this.isTown,
            };
            const db = this.$firebase.firestore();
            if (!this.isEdit) {
                db.collection("students")
                    .doc()
                    .set(obj)
                    .then(() => {
                        this.students.push(obj);
                        this.isSuccess = true;
                        this.name = "";
                        this.table = "";
                        setTimeout(() => {
                            this.isSuccess = false;
                        }, 1500);
                    });
            } else {
                db.collection("students")
                    .where("name", "==", obj.name)
                    .get()
                    .then((qs) => {
                        qs.forEach((doc) => {
                            doc.ref.update(obj);
                        });
                    })
                    .then(() => {
                        this.isSuccess = true;
                        this.name = "";
                        this.table = "";
                        let index;
                        this.students.map((el, i) => {
                            if (el.name === this.currentStudent.name) {
                                index = i;
                            }
                        });
                        this.students.splice(index, 1);
                        this.students.push(obj);
                        this.isOpen = false;
                        setTimeout(() => {
                            this.isSuccess = false;
                        }, 1500);
                    });
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.viewport {
    padding: 20px 50px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.success {
    position: fixed;
    z-index: 2000;
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
.close {
    position: absolute;
    right: 10px;
    top: 21.5px;
    transform: translateY(-50%);
    font-size: 30px;
    transition: all 0.3s;

    &:hover {
        color: red;
        cursor: pointer;
    }
}
.admin {
    font-size: 24px;
}
.admin-panel {
    font-size: 24px;
}
.add-modal {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    z-index: 1000;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 400px;
    background: #fff;
    padding-bottom: 20px;

    & .select {
        height: 30px;
        display: flex;
        justify-content: space-between;
        margin: 0 20px 20px;

        &-item {
            width: 50%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 0.8em;
            transition: all 0.2s;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            cursor: pointer;

            &.active {
                background: #1177d1;
                color: #fff;
            }
        }
    }

    &__title {
        font-size: 1em;
        text-align: center;
        margin: 0 0 20px;
        padding: 5px;
        color: #fff;
        background: #1177d1;
    }

    & .add-btn {
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        font-size: 0.7em;
        padding: 5px 0;
        margin: 0 20px;
        transition: all 0.3s;
        background: #fff;

        &:hover {
            background: #1177d1;
            cursor: pointer;
            color: #fff;
        }
    }

    & .inputs {
        padding: 0 20px;

        & > label {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 40px;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            margin-bottom: 10px;

            & .words {
                display: flex;
                justify-content: space-between;
                align-items: center;
                box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

                & > div {
                    font-size: 0.8em;
                    width: 60px;
                    height: 30px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    transition: all 0.3s;
                    cursor: pointer;

                    &.active {
                        background: #1177d1;
                        color: #fff;
                    }
                }
            }
        }

        & input {
            font-size: 0.8em;
            padding: 2px 7px;
            height: 40px;
            &.name,
            &.table {
                width: 100%;
            }

            &:focus {
                outline: none;
            }
        }
    }

    & .days {
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;

        & .day {
            width: 50px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            transition: all 0.3s;

            &:hover {
                cursor: pointer;
            }

            &.active {
                background: #1177d1;
                color: #fff;
            }
        }
    }
}
.panel-select {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;

    &__add {
        font-size: 0.7em;
        width: 200px;
        height: 30px;
    }

    &__btn {
        width: 80px;
        height: 30px;

        &.active {
            background: #1177d1;
            color: #fff;
        }
    }

    &__add,
    &__btn {
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        margin: 0 5px;
        transition: all 0.2s;

        &:hover {
            background: #1177d1;
            color: #fff;
            cursor: pointer;
        }
    }
}
.panel-item {
    height: 50px;
    padding: 0 36px;
    margin-bottom: 25px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__controls {
        display: flex;
        justify-content: space-between;

        & .controls-btn {
            font-size: 0.6em;
            width: 200px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: all 0.3s;
            background: #ffffff;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

            &:first-of-type {
                margin-right: 30px;
            }

            &.active {
                color: #fff;
                background: #1177d1;
            }

            &:hover {
                cursor: pointer;
                color: #fff;
                background: #1177d1;
            }
        }
    }
}
</style>