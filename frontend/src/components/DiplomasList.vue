<template>
    <section class="diplomas-block">
        <div class="wrap">
            <div class="diplomas-block-inner">
                <h2 class="text-center">Свидетельства Евгении Марченко</h2>
                <div class="row">
                    <div
                        v-for="(src, index) in diplomas"
                        :key="index"
                        class="col col-4"
                    >
                        <a href="#" @click.prevent="showImg(index)">
                            <img :src="src" alt="Свидетельства Евгении Марченко">
                        </a>
                    </div>
                    <vue-easy-lightbox
                        escDisabled
                        moveDisabled
                        :visible="visible"
                        :imgs="diplomas"
                        :index="index"
                        @hide="handleHide"
                    ></vue-easy-lightbox>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import VueEasyLightbox from 'vue-easy-lightbox'

export default {
    name: 'DiplomasList',
    components: {
        VueEasyLightbox
    },
    data: () => ({
        visible: false,
        index: 0,
        diplomas: [
            '/images/sertif-001.jpeg', '/images/sertif-002.jpeg', '/images/sertif-003.jpeg', '/images/sertif-004.jpeg'
        ]
    }),
    methods: {
        showImg(index) {
            this.index = index
            this.visible = true
        },
        handleHide() {
            this.visible = false
        }
    }
}
</script>