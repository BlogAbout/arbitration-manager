<template>
    <main class="main-container">
        <section class="content-block">
            <div class="wrap">
                <div class="content-block-inner">
                    <h1>Восстановление пароля</h1>
                    <form name="form-forgot" action="" method="post" @submit.prevent="submitHandler">
                        В разработке
                    </form>
                    <div v-if="message" class="errors">{{ message }}</div>
                </div>
                <div class="links">
                    <router-link to="/forgot">Войти</router-link>
                    <router-link to="/registration">Регистрация</router-link>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import { required } from 'vuelidate/dist/validators.min'

export default {
    name: 'Forgot',
    data: () => ({
        email: '',
        message: ''
    }),
    validations: {
        email: { required }
    },
    methods: {
        async submitHandler() {
            this.message = ''

            if (this.$v.$invalid) {
                this.$v.$touch()
                return
            }

            const formData = {
                email: this.email
            }

            console.log(formData)
        }
    }
}
</script>