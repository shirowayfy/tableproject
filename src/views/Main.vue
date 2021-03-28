<template>
    <div class="main">
        <Navbar />
        <div class="viewport">
            <Card title="Отметить учеников" :active="isUserActive" />
            <Card title="Таблица учеников" :active="true" />
        </div>
    </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Card from "@/components/Card.vue";

export default {
    data() {
        return {
            user: null,
        };
    },
    components: {
        Navbar,
        Card,
    },
    computed: {
        isUserActive() {
            return this.$store.getters["GET_USER"].id ? true : false;
        },
    },
    async mounted() {},
};
</script>

<style lang="scss" scoped>
.main {
    padding: 100px 10px 0 10px;


    & > .viewport {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
}
@media (max-width: 1100px) {
    .main {
        & > .viewport {
            justify-content: center;
        }
    }
}

</style>