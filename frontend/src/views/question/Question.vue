<template>
    <main class="main-container">
        <section class="content-block">
            <div class="wrap">
                <div class="content-block-inner">
                    <h1>Вопросы и ответы <router-link to="/question/add" class="btn btn-right">Добавить новый</router-link></h1>
                    <div class="list-items list-question">
                        <div
                            v-for="(item, index) in question"
                            :key="'question-item-' + index"
                            class="item"
                        >
                            <h3>{{ index + 1 }}. {{ item.question }}</h3>
                            <div class="question-item-answer">{{ item.answer }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Question',
    computed: {
        ...mapGetters({
            question: 'getQuestion'
        })
    },
    mounted() {
        this.$store.dispatch("listQuestion")
    },
    methods: {
        remove: function(id) {
            this.$store.dispatch('removeQuestion', id)
        },
        loadMore: function() {
            this.$store.dispatch('loadQuestionPageAction')
        }
    }
}
</script>