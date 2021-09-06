<template>
    <main class="main-container">
        <section class="content-block">
            <div class="wrap">
                <div class="content-block-inner">
                    <h1>Добавить новый вопрос</h1>
                    <form name="form-login" action="" method="post" @submit.prevent="submitHandler">
                        <div class="row row-wrap row-space">
                            <div class="col col-2">
                                <div class="field">
                                    <label for="question">Вопрос</label>
                                    <textarea
                                        id="question"
                                        name="question"
                                        class="validate"
                                        v-model.trim="question"
                                        :class="{invalid: ($v.question.$dirty && !$v.question.required)}"
                                    ></textarea>
                                    <span
                                        class="helper-text invalid"
                                        v-if="$v.question.$dirty && !$v.question.required"
                                    >Поле не должно быть пустым</span>
                                </div>
                            </div>
                            <div class="col col-2">
                                <div class="field">
                                    <label for="answer">Ответ</label>
                                    <textarea
                                        id="answer"
                                        name="answer"
                                        class="validate"
                                        v-model.trim="answer"
                                        :class="{invalid: ($v.answer.$dirty && !$v.answer.required)}"
                                    ></textarea>
                                    <span
                                        class="helper-text invalid"
                                        v-if="$v.answer.$dirty && !$v.answer.required"
                                    >Поле не должно быть пустым</span>
                                </div>
                            </div>
                            <div class="col col-2">
                                <div class="field">
                                    <input type="submit" value="Добавить" />
                                </div>
                            </div>
                        </div>
                        <input type="hidden" name="id" :value="currentId" />
                    </form>
                    <div v-if="message" class="errors">{{ message }}</div>
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
        currentId: 0,
        question: '',
        answer: '',
        message: ''
    }),
    validations: {
        question: { required },
        answer: { required }
    },
    methods: {
        async submitHandler() {
            this.data = ''

            if (this.$v.$invalid) {
                this.$v.$touch()
                return
            }

            const formData = {
                id: this.currentId,
                question: this.question,
                answer: this.answer
            }

            await this.$store.dispatch('addQuestion', formData)
                .then((response) => {
                    if (response.status === 202)
                        this.message = response.data

                    if (response.status === 200)
                        this.$router.push('/question')
                })
                .catch((error) => {
                    if (error.response)
                        console.log('error.response', error.response)
                    else if (error.request)
                        console.log('error.request', error.request)
                    else
                        console.log('error.message', error.message)

                    console.log(error.message)
                })
        }
    }
}
</script>