<template>
    <main class="main-container">
        <section class="content-block property-info">
            <div class="wrap">
                <div v-if="property" class="content-block-inner">
                    <div class="row row-stretch row-wrap">
                        <div class="col col-2">
                            <div class="property-image">
                                <img src="../../assets/images/noimage.jpg" :alt="property.name" />
                            </div>
                        </div>
                        <div class="col col-2">
                            <div class="property-information">
                                <h1>{{ property.name }}</h1>
                                <div class="cost"><span>Стоимость:</span> {{ property.cost | costFormat }} руб.</div>
                                <div class="advanced">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</div>
                                <div class="buttons">
                                    <a href="#" class="btn">Участвовать в аукционе</a>
                                    <a href="#" class="btn">Сделать ставку (+1000 руб.)</a>
                                    <a href="#" class="btn">Задать вопрос</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="property-description">{{ property.description }}</div>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'PropertyInfo',
    data: () => ({
        currentId: 0,
    }),
    computed: {
        ...mapGetters({
            property: 'getCurrentProperty'
        })
    },
    mounted() {
        this.currentId = this.$route.params.id || 0
        this.$store.dispatch("infoProperty", this.currentId)
    },
    methods: {
        remove: function(id) {
            this.$store.dispatch('removeProperty', id)
        }
    }
}
</script>