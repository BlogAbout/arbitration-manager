<template>
    <main class="main-container">
        <section class="content-block">
            <div class="wrap">
                <div class="content-block-inner">
                    <h1>
                        Имущество
                        <router-link
                            v-if="isAuthenticated && authorities && authorities.indexOf('ROLE_ADMIN') !== -1"
                            to="/property/add"
                            class="btn btn-right"
                        >Добавить новое</router-link>
                    </h1>
                    <div class="list-items list-property">
                        <div class="row row-stretch row-wrap row-space">
                            <div
                                v-for="(item, index) in property"
                                :key="'property-item-' + index"
                                class="item"
                            >
                                <div
                                    v-if="isAuthenticated && authorities && authorities.indexOf('ROLE_ADMIN') !== -1"
                                    class="property-actions"
                                >
                                    <router-link :to="'/property/' + item.id + '-edit'" class="link-small" title="Редактировать">
                                        <i class="far fa-edit"></i>
                                    </router-link>
                                    <a href="#" class="link-small" title="Удалить" @click.prevent="remove(item.id)">
                                        <i class="far fa-trash-alt"></i>
                                    </a>
                                </div>
                                <div class="item-image">
                                    <img :src="item.image ? '/uploads/' + item.image : '/images/noimage.jpg'" :alt="item.name" />
                                </div>
                                <div class="item-title">{{ item.name }}</div>
                                <div class="row row-stretch">
                                    <div class="col col-2 item-cost">{{ item.cost | costFormat }} руб.</div>
                                    <router-link :to="'/property/' + item.id + '-info'" class="col col-2 btn">Подробнее</router-link>
                                </div>
                            </div>
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
    name: 'Property',
    computed: {
        ...mapState({
            isAuthenticated: state => state.authenticated
        }),
        ...mapGetters({
            property: 'getProperty',
            authorities: 'getAuthorities'
        })
    },
    mounted() {
        this.$store.dispatch("listProperty")
    },
    methods: {
        remove: function(id) {
            this.$store.dispatch('removeProperty', id)
        },
        loadMore: function() {
            this.$store.dispatch('loadPropertyPageAction')
        }
    }
}
</script>