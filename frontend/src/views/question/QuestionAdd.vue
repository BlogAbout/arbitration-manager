<template>
    <main class="main-container">
        <section class="content-block">
            <div class="wrap">
                <div class="content-block-inner">
                    <h1 v-html="currentId === 0 ? 'Добавить новый вопрос' : 'Обновить вопрос'" />
                    <form name="form-login" action="" method="post" @submit.prevent="submitHandler">
                        <div class="row row-wrap row-space">
                            <div class="col col-2">
                                <div class="field">
                                    <label for="question">Вопрос</label>
                                    <textarea
                                        id="question"
                                        name="question"
                                        class="validate"
                                        placeholder="Укажите текст вопроса"
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
                                        placeholder="Укажите текст ответа"
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
                                    <input type="submit" :value="currentId === 0 ? 'Добавить' : 'Обновить'" />
                                </div>
                            </div>
                        </div>
                        <input type="hidden" name="id" :value="currentId" />
                    </form>
                    <div v-if="message" class="errors">{{ message }}</div>
                </div>
                <div class="links">
                    <router-link to="/question">Вернуться</router-link>
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
    mounted() {
        this.currentId = this.$route.params.id || 0
        if (this.currentId !== 0)
            this.$store.dispatch('infoQuestion', this.currentId)
                .then((response) => {
                    this.question = response.data.question
                    this.answer = response.data.answer
                })
                .catch(() => {
                    this.$router.push('/question')
                })
    },
    methods: {
        async submitHandler() {
            this.message = ''

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
                    if (response.status === 200 || response.status === 201)
                        this.$router.push('/question')
                    else
                        this.message = response.data
                })
                .catch((error) => {
                    this.message = error.message
                })
        }
    }
}
</script>