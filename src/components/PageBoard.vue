<template>
    <div class="pageBoard">
        <div class="pageBoard__title">
            <span class="material-icons" @click="changeRoute">
                exit_to_app
            </span>
            {{ title }} {{ group }}
        </div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: ["title", "group"],
    methods: {
        changeRoute() {
            this.$router.push({ name: "main" });
        },
    },
};
</script>

<style lang="scss" scoped>
.pageBoard {
    width: 1400px;
    min-height: 100vh;
    position: absolute;
    top: 150px;
    left: 50%;
    transform: translateX(-50%);
    margin: 0 auto;
    background: #fff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-size: 24px;

    &__title {
        text-transform: uppercase;
        font-size: 1em;
        font-weight: bold;
        text-align: center;
        padding: 8px 0;
        color: #fff;
        background: #1177d1;
        position: relative;

        & > span {
            position: absolute;
            left: 20px;
            top: 50%;
            transform: translateY(-50%) rotate(180deg);
            font-size: 30px;
            transition: all 0.3s;

            &:hover {
            transform: translateX(-5px) translateY(-50%) rotate(180deg);

                cursor: pointer;
            }
        }
    }
}

@media (max-width: 1700px) {
    .pageBoard {
        width: 90%;
    }
}
@media (max-width: 900px) {
    .pageBoard {
        font-size: 20px;
        top: 100px;

        & span {
            left: 10px;
        }
    }
}
</style>