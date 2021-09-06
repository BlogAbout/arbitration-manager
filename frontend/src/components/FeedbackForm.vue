<template>
    <div class="feedback-form">
        <div class="form-description">Остались вопросы? Закажите обратный звонок!</div>
        <form name="form-feedback" action="" method="post" @submit.prevent="submitHandler">
            <div class="field">
                <input
                    id="name"
                    type="text"
                    name="name"
                    class="validate"
                    placeholder="Ваше имя"
                    v-model.trim="name"
                    :class="{invalid: ($v.name.$dirty && !$v.name.required)}"
                />
                <span
                    class="helper-text invalid"
                    v-if="$v.name.$dirty && !$v.name.required"
                >Поле Имя не должно быть пустым</span>
            </div>
            <div class="field">
                <input
                    id="phone"
                    type="tel"
                    name="phone"
                    class="validate"
                    v-model.trim="phone"
                    :class="{invalid: ($v.phone.$dirty && !$v.phone.required)}"
                />
                <span
                    class="helper-text invalid"
                    v-if="$v.phone.$dirty && !$v.phone.required"
                >Поле Телефон не должно быть пустым</span>
            </div>
            <div class="field">
                <input type="submit" value="Заказать звонок" />
            </div>
        </form>
    </div>
</template>

<script>
import { required } from 'vuelidate/dist/validators.min'

export default {
    name: 'FeedbackForm',
    data: () => ({
        name: '',
        phone: ''
    }),
    validations: {
        name: {
            required
        },
        phone: {
            required
        }
    },
    methods: {
        async submitHandler() {
            if (this.$v.$invalid) {
                this.$v.$touch()
                return
            }

            const formData = {
                name: this.name,
                phone: this.phone
            }
            console.log(formData)

            // Шлем на почту заявку
        }
    }
}
</script>