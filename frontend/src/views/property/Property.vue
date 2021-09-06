<template>
    <main class="main-container">
        <section class="content-block">
            <div class="wrap">
                <div class="content-block-inner">
                    <h1>Имущество <router-link to="/property/add" class="btn btn-right">Добавить новое</router-link></h1>
                    <div class="list-items list-property">
                        <div class="row row-stretch row-wrap row-space">
                            <div
                                v-for="(item, index) in property"
                                :key="'property-item-' + index"
                                class="item"
                            >
                                <div class="item-image">
                                    <img src="../../assets/images/noimage.jpg" :alt="item.name" />
                                </div>
                                <div class="item-title">{{ item.name }}</div>
                                <div class="row row-stretch">
                                    <div class="col col-2 item-cost">{{ item.cost }} руб.</div>
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
import { mapGetters } from 'vuex'

export default {
    name: 'Property',
    computed: {
        ...mapGetters({
            property: 'getProperty'
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