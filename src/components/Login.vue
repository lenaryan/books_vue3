<template>
    <section class="container">
        <transition
            appear
            appear-class="title-hidden"
            appear-to-class="title-shown"
            appear-active-class="title-shown-active"
        >
            <h1 class="center">Вход</h1>
        </transition>
        <transition
            appear
            appear-class="form-hidden"
            appear-to-class="form-shown"
            appear-active-class="form-shown-active"
        >
            <form class="login" @submit.prevent="logIn">
                <div class="login__field">
                    <label for="login__email">E-mail</label>
                    <input id="login__email" type="email" v-model="email">
                </div>
                <div class="login__field">
                    <label for="login__pass">Пароль</label>
                    <input id="login__pass" type="password" v-model="password">
                </div>
                <p v-if="error" class="feedback center">Заполни форму нормально</p>
                <button type="submit" class="btn-large deep-purple darken-3 login__btn">Войти</button>
            </form>
        </transition>
    </section>
</template>

<script>
import { ref } from 'vue'
import { firebase } from '../firebase/init'

export default {
    name: 'Login',
    setup() {
        let email = ref(null)
        let password = ref(null)
        let error = ref(false)

        const logIn = () => {
            if (email.value && password.value) {
                firebase.auth().signInWithEmailAndPassword(email.value, password.value)
                    .then(cred => {
                        this.$router.push({ name: 'Books' })
                    }).catch(err => error.value = true)
                error.value = false
            } else {
                error.value = true
            }
        }

        return { email, password, error, logIn }
    }
}
</script>

<style>
.login {
    margin-top: 40px;
}
.login input {
    font-size: 18px;
}
.login input[type=email]:focus:not([readonly]),
.login input[type=password]:focus:not([readonly]) {
    border-bottom: 1px solid #4527a0;
    box-shadow: 0 1px 0 0 #4527a0;
}
.login__btn {
    display: block;
    margin: 40px auto 0;
}
.form-hidden,
.title-hidden {
    opacity: 0;
}
.form-shown,
.title-shown {
    opacity: 1;
}
.title-shown-active {
    transition: all 0.3s ease;
}
.form-shown-active {
    transition: all 0.7s ease;
}
</style>
