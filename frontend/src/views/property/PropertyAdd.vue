<template>
    <main class="main-container">
        <section class="content-block">
            <div class="wrap">
                <div class="content-block-inner">
                    <h1 v-html="currentId === 0 ? 'Добавить новое имущество' : 'Обновить имущество'" />
                    <form name="form-login" action="" method="post" @submit.prevent="submitHandler">
                        <div class="row row-wrap row-space row-stretch">
                            <div class="col col-2">
                                <div class="field">
                                    <label for="name">Наименование</label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        class="validate"
                                        placeholder="Наименование"
                                        v-model.trim="name"
                                        :class="{invalid: ($v.name.$dirty && !$v.name.required)}"
                                    />
                                    <span
                                        class="helper-text invalid"
                                        v-if="$v.name.$dirty && !$v.name.required"
                                    >Поле не должно быть пустым</span>
                                </div>
                            </div>
                            <div class="col col-2">
                                <div class="field">
                                    <label for="cost">Цена</label>
                                    <input
                                        id="cost"
                                        name="cost"
                                        type="number"
                                        min="0"
                                        step="1"
                                        class="validate"
                                        placeholder="Цена (в рублях)"
                                        v-model.trim="cost"
                                        :class="{invalid: ($v.cost.$dirty && !$v.cost.required)}"
                                    />
                                    <span
                                        class="helper-text invalid"
                                        v-if="$v.cost.$dirty && !$v.cost.required"
                                    >Поле не должно быть пустым</span>
                                </div>
                            </div>
                            <div class="col col-2">
                                <div class="field">
                                    <label for="description">Описание</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        placeholder="Описание"
                                        v-model.trim="description"
                                    ></textarea>
                                </div>
                            </div>
                            <div class="col col-2">
                                <div class="field">
                                    <label>Изображение</label>
                                    <div class="field-image-uploader">
                                        <input
                                            type="file"
                                            ref="file"
                                            hidden
                                            accept="image/*"
                                            @change="readImage"
                                        />
                                        <a href="#" @click.prevent="selectPic">
                                            <img v-if="filePreview" :src="filePreview" :alt="name" />
                                            <img v-else-if="image" :src="'/uploads/' + image" :alt="name" />
                                            <img v-else src="../../assets/images/noimage.jpg" :alt="name" />
                                        </a>
                                    </div>
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
                    <router-link to="/property">Вернуться</router-link>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import { required } from 'vuelidate/dist/validators.min'

export default {
    name: 'PropertyAdd',
    data: () => ({
        currentId: 0,
        name: '',
        cost: 0,
        description: '',
        image: '',
        file: null,
        filePreview: '',
        message: ''
    }),
    validations: {
        name: { required },
        cost: { required }
    },
    mounted() {
        this.currentId = this.$route.params.id || 0
        if (this.currentId !== 0)
            this.$store.dispatch('infoProperty', this.currentId)
                .then((response) => {
                    this.name = response.data.name || ''
                    this.cost = response.data.cost || 0
                    this.description = response.data.description || ''
                    this.image = response.data.image || ''
                })
                .catch(() => {
                    this.$router.push('/property')
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
                name: this.name,
                cost: this.cost,
                description: this.description,
                image: this.image,
                file: this.file
            }

            await this.$store.dispatch('addProperty', formData)
                .then((response) => {
                    if (response.status === 200 || response.status === 201)
                        this.$router.push('/property')
                    else
                        this.message = response.data
                })
                .catch((error) => {
                    this.message = error.message
                })
        },
        selectPic() {
            this.$refs.file.click()
        },
        readImage() {
            this.file = this.$refs.file.files[0]
            let reader = new FileReader()
            reader.addEventListener("load", function() {
                this.filePreview = reader.result
            }.bind(this), false)

            if (this.file) {
                if (/\.(jpe?g|png|gif)$/i.test(this.file.name))
                    reader.readAsDataURL( this.file )
            }
            /*const self = this
            const rawFile = event.target.files[0]
            const image = new Image()
            let file = {}
            image.src = URL.createObjectURL(rawFile)
            image.onload = () => {
                self.originalImgData = {
                    src: image.src,
                    width: image.width,
                    height: image.height
                }
                file = { ...self.originalImgData, raw: rawFile }
            }*/
        },
    }
}
</script>