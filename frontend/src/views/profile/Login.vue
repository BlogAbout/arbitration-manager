<template>
    <main class="main-container">
        <section class="content-block">
            <div class="wrap">
                <div class="content-block-inner">
                    <h1>Вход</h1>
                    <form name="form-login" action="" method="post" @submit.prevent="submitHandler">
                        <div class="row row-wrap row-space">
                            <div class="col col-2">
                                <div class="field">
                                    <label for="username">Логин</label>
                                    <input
                                        id="username"
                                        type="text"
                                        name="username"
                                        class="validate"
                                        placeholder="Логин"
                                        v-model.trim="username"
                                        :class="{invalid: ($v.username.$dirty && !$v.username.required)}"
                                    />
                                    <span
                                        class="helper-text invalid"
                                        v-if="$v.username.$dirty && !$v.username.required"
                                    >Поле не должно быть пустым</span>
                                </div>
                            </div>
                            <div class="col col-2">
                                <div class="field">
                                    <label for="password">Пароль</label>
                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        class="validate"
                                        placeholder="Пароль"
                                        v-model.trim="password"
                                        :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
                                    />
                                    <span
                                        class="helper-text invalid"
                                        v-if="$v.password.$dirty && !$v.password.required"
                                    >Поле не должно быть пустым</span>
                                </div>
                            </div>
                            <div class="col col-2">
                                <div class="field">
                                    <input type="submit" value="Войти" />
                                </div>
                            </div>
                        </div>
                    </form>
                    <div v-if="message" class="errors">{{ message }}</div>
                </div>
                <div class="links">
                    <router-link to="/registration">Регистрация</router-link>
                    <router-link to="/forgot">Восстановить пароль</router-link>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import { required } from 'vuelidate/dist/validators.min'

export default {
    name: 'Login',
    data: () => ({
        username: '',
        password: '',
        message: ''
    }),
    validations: {
        username: { required },
        password: { required }
    },
    methods: {
        async submitHandler() {
            this.message = ''

            if (this.$v.$invalid) {
                this.$v.$touch()
                return
            }

            const credentials = {
                username: this.username,
                password: this.password
            }

            await this.$store.dispatch('userSignIn', credentials)
                .then((response) => {
                    if (response.status === 202)
                        this.message = response.data

                    if (response.status === 200)
                        this.$router.push('/profile')
                })
                .catch((error) => {
                    this.message = error.message
                })
        }
    }
}
</script>