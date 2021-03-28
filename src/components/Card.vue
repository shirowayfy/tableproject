<template>
    <div class="card" @click="changeRoute">
        <div class="card-overflow flex" v-show="!active">
            <div class="card-overflow-warning">Необходимо авторизироваться</div>
        </div>
        <span>{{ title }}</span>
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    props: ["title", "active"],
    methods: {
        ...mapActions(["fetchUsers"]),
        changeRoute() {
            if (this.title === "Отметить учеников") {
                if (this.active) {
                    this.$router.push({ name: "dashboard" });
                } else {
                    alert("Нет доступа");
                }
            } else {
                this.fetchUsers()
                this.$router.push({ name: "table" });
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.card {
    padding-top: 20px;

    width: 500px;
    height: 300px;

    position: relative;

    background: #fff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    overflow: hidden;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;

    & > span {
        text-transform: uppercase;
        font-size: 32px;

        transition: color 0.5s;
        z-index: 2;
    }

    &::after,
    &::before {
        content: "";
        position: absolute;
    }

    &:hover > span {
        color: #fff;
    }

    &:hover::before {
        transform: scale(1);
    }

    &::before {
        bottom: -500px;
        left: -500px;

        width: 1000px;
        height: 1000px;

        background: #1177d1;
        border-radius: 50%;

        transform: scale(0);
        transition: transform 0.5s;
    }

    &::after {
        top: 0;
        left: 0;

        width: 100%;
        height: 20px;

        background: #1177d1;
    }

    &-overflow {
        background: #ccc;
        z-index: 3;

        position: absolute;
        top: 0px;
        left: 0px;

        overflow: hidden;

        width: 100%;
        height: 100%;

        padding: 30px;

        &-warning {
            color: #fff;
            font-size: 32px;
        }
    }
}

@media (max-width: 1100px) {
    .card {
        width: 70%;
        margin-bottom: 20px;
    }
}

@media (max-width: 600px) {
    .card {
        width: 90%;
        padding: 10px;
    }
    .card > span {
        font-size: 26px;
        text-align: center;
    }

    .card-overflow-flex {
        width: 100%;
        text-align: center;
        padding: 10px;
    }

    .card-overflow-warning {
        font-size: 26px;
    }
}
</style>