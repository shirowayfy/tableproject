<template>
    <div>
        <Navbar />
        <PageBoard :title="'Отсутствующие'">
            <div class="table viewport">
                <div class="table-items">
                    <div
                        class="table-item"
                        v-for="(group, i) of groups"
                        :key="i"
                        :style="{
                            height: !marked.filter(
                                (el) => el.group === group.title
                            ).length
                                ? '120px'
                                : group.height,
                        }"
                    >
                        <div class="table-item__title">{{ group.title }}</div>
                        <div
                            class="open-btn"
                            v-show="
                                marked.filter((el) => el.group === group.title)
                                    .length > 4
                            "
                            @click="
                                changeHeight(
                                    i,
                                    marked.filter(
                                        (el) => el.group === group.title
                                    ).length
                                )
                            "
                        >
                            <span
                                :class="{ rotate: group.isOpen }"
                                class="material-icons"
                            >
                                keyboard_arrow_down
                            </span>
                        </div>
                        <div class="table-item__students">
                            <div
                                class="students-item"
                                v-for="(student, index) of marked
                                    .filter((el) => el.group === group.title)
                                    .sort((a, b) => (a.name > b.name ? 1 : -1))
                                    .slice(0, group.end)"
                                :key="index"
                            >
                                {{ student.name }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="table-info">
                    <div class="table-select">
                        <button class="table-select__btn" @click="updateMarked">
                            Обновить
                        </button>
                    </div>
                    <div class="table-students">
                        <div class="table-students__item">
                            <div class="row">
                                <ul class="row-list blue">
                                    <li class="row-list__item">Класс</li>
                                    <li class="row-list__item">Завтрак</li>
                                    <li class="row-list__item">Обед</li>
                                    <li class="row-list__item">Полдник</li>
                                    <li class="row-list__item">Ужин</li>
                                </ul>
                                <ul
                                    class="row-list"
                                    v-for="(group, index) of groups"
                                    :key="index"
                                >
                                    <li class="row-list__item">
                                        {{ group.title }}
                                    </li>
                                    <li class="row-list__item">
                                        {{
                                            countPeople[group.title]
                                                .breakfast || 0
                                        }}
                                    </li>
                                    <li class="row-list__item">
                                        {{
                                            countPeople[group.title].lunch || 0
                                        }}
                                    <li class="row-list__item">
                                        {{
                                            countPeople[group.title].sublunch ||
                                            0
                                        }}
                                    </li>
                                    <li class="row-list__item">
                                        {{
                                            countPeople[group.title]
                                                .breakfast || 0
                                        }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="table-students__item">
                            <div class="table-students__item-title">
                                Рассадка
                            </div>
                            <ul class="row-list breakfast">
                                <li class="row-list__item">Стол</li>
                                <li class="row-list__item">Смена 1</li>
                                <li class="row-list__item">Стол</li>
                                <li class="row-list__item">Смена 2</li>
                            </ul>
                            <ul
                                class="row-list breakfast"
                                v-for="(n, j) of 18"
                                :key="j"
                            >
                                <li class="row-list__item">{{ n }}</li>
                                <li class="row-list__item">{{listOfPeople.row1[n] || 0}} ч.</li>
                                <li class="row-list__item">{{ n }}</li>
                                <li class="row-list__item">{{listOfPeople.row2[n] || 0}} ч.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </PageBoard>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import PageBoard from "../components/PageBoard.vue";
import Navbar from "../components/Navbar.vue";

export default {
    components: {
        Navbar,
        PageBoard,
    },
    data() {
        return {
            part: 1,
            days: ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"],
            groups: [
                {
                    title: "8A",
                    height: "200px",
                    end: 4,
                    isOpen: false,
                },
                {
                    title: "8B",
                    height: "200px",
                    end: 4,
                    isOpen: false,
                },
                {
                    title: "9A",
                    height: "200px",
                    end: 4,
                    isOpen: false,
                },
                {
                    title: "9B",
                    height: "200px",
                    end: 4,
                    isOpen: false,
                },
                {
                    title: "10A",
                    height: "200px",
                    end: 4,
                    isOpen: false,
                },
                {
                    title: "10B",
                    height: "200px",
                    end: 4,
                    isOpen: false,
                },
                {
                    title: "11A",
                    height: "200px",
                    end: 4,
                    isOpen: false,
                },
                {
                    title: "11B",
                    height: "200px",
                    end: 4,
                    isOpen: false,
                },
            ],
        };
    },
    created() {},
    mounted() {},
    computed: {
        ...mapState({
            students: (state) => {
                return state.students.students;
            },
            marked: (state) => {
                return state.marked.marked;
            },
        }),
        countPeople() {
            const data = {};

            const marked = [];

            for (let i of this.marked) {
                marked.push(i.name);
            }

            const students = this.students;

            const currentDay = this.days[new Date().getDay() - 1];

            for (let i of students) {
                if (!marked.includes(i.name)) {
                    if (!data[i.group]) {
                        data[i.group] = {};
                    }

                    if (!i.isTown) {
                        if (!data[i.group].breakfast) {
                            data[i.group].breakfast = 1;
                        } else {
                            data[i.group].breakfast += 1;
                        }
                    }

                    if (!data[i.group].lunch) {
                        data[i.group].lunch = 1;
                    } else {
                        data[i.group].lunch += 1;
                    }

                    if (i.days.includes(currentDay)) {
                        if (!data[i.group].sublunch) {
                            data[i.group].sublunch = 1;
                        } else {
                            data[i.group].sublunch += 1;
                        }
                    }
                }
            }

            return data;
        },
        listOfPeople() {
            const data = {
                row1: {},
                row2: {},
            };

            const marked = [];

            for (let i of this.marked) {
                marked.push(i.name);
            }

            for (let i of this.students) {
                if (!marked.includes(i.name)) {
                    if (i.group.includes("9") || i.group.includes("10")) {
                        if (!data.row2[i.table]) {
                            data.row2[i.table] = 1;
                        } else {
                            data.row2[i.table] += 1;
                        }
                    } else {
                        if (!data.row1[i.table]) {
                            data.row1[i.table] = 1;
                        } else {
                            data.row1[i.table] += 1;
                        }
                    }
                }
            }
            //const currentDay = this.days[new Date().getDay() - 1];

            return data;
        },
    },
    methods: {
        ...mapActions(['fetchUsers']),
        changeHeight(i, len) {
            if (!this.groups[i].isOpen && len > 4) {
                this.groups[i].isOpen = true;
                const endLen = len * 33 + 70 + "px";
                this.groups[i].height = endLen;
                this.groups[i].end = len;
            } else {
                this.groups[i].isOpen = false;
                this.groups[i].height = "200px";
                this.groups[i].end = 4;
            }
        },
        updateMarked() {
            this.fetchUsers()
        },
    },
};
</script>

<style lang="scss" scoped>
.viewport {
    padding: 20px 50px;
    margin: 0 auto 25px;
    display: flex;
    justify-content: center;
    flex-direction: column;

    & > .table-items {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
}
.rotate {
    transform: rotate(180deg);
}
.open-btn {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    position: absolute;
    bottom: 20px;
    right: 20px;
    opacity: 0.8;
    transition: all 0.3s;

    & > span {
        font-size: 25px;
    }

    &:hover {
        opacity: 1;
        cursor: pointer;
    }
}
.table-item {
    width: 500px;
    height: 300px;
    font-size: 24px;
    padding-bottom: 20px;
    position: relative;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    margin-bottom: 20px;

    &__title {
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #1177d1;
        color: #fff;
        font-weight: bold;
        font-size: 1em;
    }

    &__students {
        font-size: 0.9em;
        padding: 15px 20px;
    }
}

.table-select {
    display: flex;
    justify-content: center;
    font-size: 24px;
    margin-bottom: 25px;
    &__btn {
        padding: 10px 40px;
        font-size: 0.8em;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        transition: all 0.3s;
        cursor: pointer;
        margin-right: 20px;

        &:hover {
            background: #1177d1;
            color: #fff;
        }

        &.active {
            background: #1177d1;
            color: #fff;
        }

        &:last-of-type {
            margin-right: 0;
        }
    }
}

ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.table-students {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: flex-start;

    &__item {
        width: 49%;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        margin-bottom: 20px;

        &-title {
            font-size: 0.8em;
            padding: 10px;
            background: #1177d1;
            color: #fff;
            text-align: center;
        }

        & .row {
            &-list {
                width: 100%;
                display: flex;

                &.blue {
                    background: #1177d1;
                    color: #fff;
                }
                &__item {
                    font-size: 0.8em;
                    padding: 10px;
                    width: 20%;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    &:not(.blue) {
                        border-top: 1px solid #ccc;
                        border-bottom: 1px solid #ccc;
                    }

                    &:not(:last-of-type) {
                        border-right: 1px solid #ccc;
                    }

                    &:not(:first-of-type) {
                        border-left: 1px solid #ccc;
                    }
                }
            }
        }
    }
}

.row-list.breakfast {
    & > .row-list__item {
        width: 25%;
    }
}

@media (max-width: 1400px) {
    .table-items {
        justify-content: center;
    }

    .table-item {
        margin: 0 auto 20px;
        width: 400px;
    }
}

@media (max-width: 1150px) {
    .table-students {
        align-items: center;
        flex-direction: column;

        &__item {
            width: 100%;
        }

        & .row {
            &-list {
            }
        }
    }
}

@media (max-width: 900px) {
    .viewport {
        padding: 10px 30px;
    }
    .table-item {
        font-size: 22px;
    }
    .table-select {
        font-size: 20px;
    }
}

@media (max-width: 600px) {
    .table-item {
        width: 100%;
    }
    .table-select {
        font-size: 18px;
    }
    .table-students {
        text-align: center;
        font-size: 18px;
    }
}

@media (max-width: 400px) {
    .viewport {
        padding: 10px 15px;
    }
}
</style>