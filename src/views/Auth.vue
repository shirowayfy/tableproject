<template>
    <div class="overflow flex">
        <form class="auth-form" @submit.prevent="pressed()">
            <h1 class="auth-form__title flex">Авторизация</h1>
            <div class="auth-form__content">
                <input
                    class="auth-form__content-input"
                    :class="{ error }"
                    placeholder="Логин"
                    type="email"
                    v-model="email"
                    required
                    autocomplete
                />
                <input
                    class="auth-form__content-input"
                    :class="{ error }"
                    placeholder="Пароль"
                    type="password"
                    v-model="pass"
                    required
                    autocomplete
                />
                <label for="check" class="auth-form__content-checkbox">
                    <input id="check" type="checkbox" />
                    Запомнить устройство
                </label>
                <a href="#" class="auth-help" @click="alert">Забыли логин или пароль?</a>
                <div class="auth-form__content-btns">
                    <button
                        type="submit"
                        class="auth-form__content-btns__btn blue"
                    >
                        Вход
                    </button>
                    <button
                        type="button"
                        @click="routeTo"
                        class="auth-form__content-btns__btn"
                    >
                        Продолжить
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import firebase from "firebase";
require("firebase/auth");
export default {
    data() {
        return {
            loggedIn: false,
            email: "",
            pass: "",
            error: false,
        };
    },
    computed: {},
    methods: {
        alert() {
            alert('Обратитесь к администратору')
        },
        async pressed() {
            try {
                await firebase
                    .auth()
                    .signInWithEmailAndPassword(this.email, this.pass);

                const user = firebase.auth().currentUser;
                this.$store.dispatch("SET_USER", user);

                this.$router.push({ name: "main" });
            } catch (e) {
                this.pass = "";
                this.error = true;
            }
        },
        routeTo() {
            this.$router.push({ name: "main" });
        },
    },
};
</script>

<style lang="scss" scoped>
.auth-help {
    position: absolute;
    left: 350px;
    top: 17.5px;
    transform: translateY(-50%);

    font-size: 14px;
    font-weight: 400;
    text-decoration: none;
    color: #1177d1;

    &:hover {
        text-decoration: underline;
    }
}
.auth-form {
    width: 800px;
    height: 350px;

    position: fixed;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);

    border: 1px solid rgba(0, 0, 0, 0.15);
    background: #fff;

    &__title {
        width: 100%;
        height: 100px;
        margin: 0;
        text-transform: uppercase;
        font-size: 36px;
        font-weight: 300;
        color: #212529;
        background: rgba(0, 0, 0, 0.03);
        border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    }

    &__content {
        margin: 0 50px 25px;

        position: relative;

        &-input {
            width: 330px;
            height: 35px;

            padding: 5px 10px;
            margin-top: 25px;

            font-size: 16px;

            border: 1px solid #8f959e;

            display: block;

            outline: #1177d1;
            transition: border-color 0.3s;
        }

        &-checkbox {
            font-size: 12px;
            font-weight: 300;

            margin-top: 15px;

            display: flex;
            align-items: center;
        }

        &-btns {
            display: flex;
            justify-content: space-between;

            margin-top: 20px;

            &__btn {
                width: 330px;
                height: 35px;

                border: 1px solid #8f959e;
                background: rgba(0, 0, 0, 0.03);
                opacity: 0.9;

                font-size: 14px;
                cursor: pointer;

                &.blue {
                    background: #1177d1;
                    border: none;

                    font-weight: 700;

                    color: #fff;
                }

                &:hover {
                    opacity: 1;
                }
            }
        }
    }
}
.error {
    border-color: red;
}

@media (max-width: 1000px) {
    .auth-form {
        width: 85%;;
    }
    .auth-help {
        display: none;
    }
    .auth-form__content-btns__btn {
        width: 250px;
    }
    .auth-form__content-input {
        width: 100%;
    }
}

@media (max-width: 700px) {
    .auth-form {
        height: 400px;
    }
    .auth-form__content {
        margin: 0 25px 10px;
    }
    .auth-form__title{
        font-size: 30px;
    }
    .auth-form__content-btns {
        flex-wrap: wrap;
    }
    .auth-form__content-btns__btn {
        width: 100%;
        margin-bottom: 10px;
    }
}
</style>