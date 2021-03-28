<template>
    <nav class="navbar">
        <div class="navbar__wrapper">
            <div class="navbar__logo">
                <router-link to="/main">CHOMLI.<span>io</span><b v-if="admin" class="admin-pref">/admin</b></router-link>
            </div>
            <div class="navbar__user">
                <span class="material-icons admin-nav" @click="changeRoute" v-if="user.admin"> admin_panel_settings </span>
                <span class="navbar__user-title">{{ setUserName }}</span>
                <span @click="signOut" class="material-icons navbar__user-btn">
                    exit_to_app
                </span>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    props: ['admin'],
    data() {
        return {
            user: {},
        };
    },
    computed: {
        setUserName() {
            return this.user.name ? this.user.name : "Гость";
        },
    },
    methods: {
        changeRoute() {
            this.$router.push({name: 'admin'})
        },
        async signOut() {
            try {
                await this.$firebase.auth().signOut();
                this.$store.dispatch("RESET_USER");
            } catch (e) {
                console.log(e);
            }
            this.$router.push({ name: "auth" });
        },
    },
    mounted() {},
    async created() {
        this.user = await this.$store.getters["GET_USER"];
        this.setUserName;
    },
};
</script>

<style lang="scss" scoped>
.admin-nav {
    cursor: pointer;
    font-size: 30px;
    transition: all .3s;

    &:hover {
        color: #1177d1;
    }
}
.navbar {
    position: absolute;
    width: 100%;
    height: 80px;
    top: 0;
    left: 0;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.15);

    &__wrapper {
        width: 90%;
        height: 100%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__logo {
        font-size: 28px;
        font-weight: bold;

        cursor: pointer;

        & > a {
            color: #000;
            text-decoration: none;

            & > span {
                color: #1177d1;
            }
        }
    }

    &__user {
        font-size: 20px;

        display: flex;
        justify-content: space-between;
        align-items: center;

        &-title {
            padding: 0 10px;
        }

        &-btn {
            cursor: pointer;
            font-size: 30px;

            transition: all 0.3s;

            &:hover {
                color: #1177d1;
                transform: translateX(5px);
            }
        }
    }
}
</style>