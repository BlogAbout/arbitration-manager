<template>
    <main class="main-container">
        <section class="content-block">
            <div class="wrap">
                <div class="content-block-inner">
                    <h1>
                        Вопросы и ответы
                        <router-link
                            v-if="isAuthenticated && authorities && authorities.indexOf('ROLE_ADMIN') !== -1"
                            to="/question/add"
                            class="btn btn-right"
                        >Добавить новый</router-link>
                    </h1>
                    <div class="list-items list-question">
                        <div
                            v-for="(item, index) in question"
                            :key="'question-item-' + index"
                            class="item"
                        >
                            <h3 v-if="isAuthenticated && authorities && authorities.indexOf('ROLE_ADMIN') !== -1">
                                <span>{{ index + 1 }}. {{ item.question }}</span>
                                <router-link :to="'/question/' + item.id + '-edit'" class="link-small" title="Редактировать">
                                    <i class="far fa-edit"></i>
                                </router-link>
                                <a href="#" class="link-small" title="Удалить" @click.prevent="remove(item.id)">
                                    <i class="far fa-trash-alt"></i>
                                </a>
                            </h3>
                            <h3 v-else>{{ index + 1 }}. {{ item.question }}</h3>
                            <div class="question-item-answer">{{ item.answer }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
    name: 'Question',
    computed: {
        ...mapState({
            isAuthenticated: state => state.authenticated
        }),
        ...mapGetters({
            question: 'getQuestion',
            authorities: 'getAuthorities'
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