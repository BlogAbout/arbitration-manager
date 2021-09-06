<template>
    <section class="diplomas-block">
        <div class="wrap">
            <div class="diplomas-block-inner">
                <h2 class="text-center">Свидетельства Евгении Марченко</h2>
                <div class="row">
                    <div
                        v-for="(item, index) in diplomas"
                        :key="'diplomas-item-' + index"
                        class="col col-4"
                    >
                        <img :src="'/images/' + item" alt="Свидетельства Евгении Марченко" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'DiplomasList',
    data: () => ({
        diplomas: ['sertif-001.jpeg', 'sertif-002.jpeg', 'sertif-003.jpeg', 'sertif-004.jpeg',]
    })
}
</script>