<template>
    <main class="main-container">
        <section class="content-block">
            <div class="wrap">
                <div class="content-block-inner">
                    <h1>Редактирование личных данных</h1>
                    <form name="form-registration" action="" method="post" @submit.prevent="submitHandler">
                        <div class="row row-wrap row-space">
                            <div class="col">
                                <div class="field field-checkbox">
                                    <label>
                                        <input
                                            id="entity"
                                            type="checkbox"
                                            name="entity"
                                            v-model="entity"
                                        />
                                        <span>Юридическое лицо</span>
                                    </label>
                                </div>
                            </div>
                            <div class="col col-2">
                                <div class="field">
                                    <label for="lastName">Фамилия</label>
                                    <input
                                        id="lastName"
                                        type="text"
                                        name="lastName"
                                        class="validate"
                                        placeholder="Фамилия"
                                        v-model.trim="lastName"
                                        :class="{invalid: ($v.lastName.$dirty && !$v.lastName.required)}"
                                    />
                                    <span
                                        class="helper-text invalid"
                                        v-if="$v.lastName.$dirty && !$v.lastName.required"
                                    >Поле не должно быть пустым</span>
                                </div>
                            </div>
                            <div class="col col-2">
                                <div class="field">
                                    <label for="firstName">Имя</label>
                                    <input
                                        id="firstName"
                                        type="text"
                                        name="firstName"
                                        class="validate"
                                        placeholder="Имя"
                                        v-model.trim="firstName"
                                        :class="{invalid: ($v.firstName.$dirty && !$v.firstName.required)}"
                                    />
                                    <span
                                        class="helper-text invalid"
                                        v-if="$v.firstName.$dirty && !$v.firstName.required"
                                    >Поле не должно быть пустым</span>
                                </div>
                            </div>
                            <div class="col col-2">
                                <div class="field">
                                    <label for="middleName">Отчество</label>
                                    <input
                                        id="middleName"
                                        type="text"
                                        name="middleName"
                                        placeholder="Отчество"
                                        :disabled="noMiddleName"
                                        v-model.trim="middleName"
                                    />
                                </div>
                            </div>
                            <div class="col col-2">
                                <div class="field field-checkbox">
                                    <label>
                                        <input
                                            id="noMiddleName"
                                            type="checkbox"
                                            name="noMiddleName"
                                            v-model="noMiddleName"
                                        />
                                        <span>Нет отчества</span>
                                    </label>
                                </div>
                            </div>
                            <div class="col col-2" v-if="entity">
                                <div class="field">
                                    <label for="firstName">Компания</label>
                                    <input
                                        id="companyName"
                                        type="text"
                                        name="companyName"
                                        class="validate"
                                        placeholder="Наименование компании"
                                        v-model.trim="companyName"
                                        :class="{invalid: ($v.companyName.$dirty && !$v.companyName.required)}"
                                    />
                                    <span
                                        class="helper-text invalid"
                                        v-if="$v.companyName.$dirty && !$v.companyName.required"
                                    >Поле не должно быть пустым</span>
                                </div>
                            </div>
                            <div class="col col-2" v-if="entity">
                                <div class="field">
                                    <label for="firstName">ИНН</label>
                                    <input
                                        id="inn"
                                        type="text"
                                        name="inn"
                                        class="validate"
                                        placeholder="ИНН"
                                        v-model.trim="inn"
                                        :class="{invalid: ($v.inn.$dirty && !$v.inn.required)}"
                                    />
                                    <span
                                        class="helper-text invalid"
                                        v-if="$v.inn.$dirty && !$v.inn.required"
                                    >Поле не должно быть пустым</span>
                                </div>
                            </div>
                            <div class="col col-2" v-if="entity">
                                <div class="field">
                                    <label for="firstName">КПП</label>
                                    <input
                                        id="kpp"
                                        type="text"
                                        name="kpp"
                                        class="validate"
                                        placeholder="КПП"
                                        v-model.trim="kpp"
                                        :class="{invalid: ($v.kpp.$dirty && !$v.kpp.required)}"
                                    />
                                    <span
                                        class="helper-text invalid"
                                        v-if="$v.kpp.$dirty && !$v.kpp.required"
                                    >Поле не должно быть пустым</span>
                                </div>
                            </div>
                            <div class="col col-2" v-if="entity">
                                <div class="field">
                                    <label for="firstName">ОГРН</label>
                                    <input
                                        id="ogrn"
                                        type="text"
                                        name="ogrn"
                                        class="validate"
                                        placeholder="ОГРН"
                                        v-model.trim="ogrn"
                                        :class="{invalid: ($v.ogrn.$dirty && !$v.ogrn.required)}"
                                    />
                                    <span
                                        class="helper-text invalid"
                                        v-if="$v.ogrn.$dirty && !$v.ogrn.required"
                                    >Поле не должно быть пустым</span>
                                </div>
                            </div>
                            <div class="col col-2">
                                <div class="field">
                                    <label for="username">Логин</label>
                                    <input
                                        id="username"
                                        type="text"
                                        name="username"
                                        class="validate"
                                        placeholder="Логин"
                                        v-model.trim="username"
                                        :class="{invalid: ($v.username.$dirty && !$v.username.required)}"
                                    />
                                    <span
                                        class="helper-text invalid"
                                        v-if="$v.username.$dirty && !$v.username.required"
                                    >Поле не должно быть пустым</span>
                                </div>
                            </div>
                            <div class="col col-2">
                                <div class="field">
                                    <label for="email">E-mail</label>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        class="validate"
                                        placeholder="E-mail"
                                        v-model.trim="email"
                                        :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
                                    />
                                    <span
                                        class="helper-text invalid"
                                        v-if="$v.email.$dirty && !$v.email.required"
                                    >Поле не должно быть пустым</span>
                                    <span
                                        class="helper-text invalid"
                                        v-else-if="$v.email.$dirty && !$v.email.email"
                                    >Введите корректный E-mail</span>
                                </div>
                            </div>
                            <div class="col col-2">
                                <div class="field">
                                    <label for="phone">Телефон</label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        name="phone"
                                        class="validate"
                                        placeholder="Телефон"
                                        v-model.trim="phone"
                                        v-phone
                                        autocomplete="tel"
                                        maxlength="18"
                                        :class="{invalid: ($v.phone.$dirty && !$v.phone.required)}"
                                    />
                                    <span
                                        class="helper-text invalid"
                                        v-if="$v.phone.$dirty && !$v.phone.required"
                                    >Поле не должно быть пустым</span>
                                </div>
                            </div>
                        </div>
                        <div class="row row-wrap row-space">
                            <div class="col col-2">
                                <div class="field">
                                    <input type="submit" value="Сохранить изменения" />
                                </div>
                            </div>
                        </div>
                        <input type="hidden" name="id" id="userId" v-model="id" />
                    </form>
                    <div v-if="message" class="errors">{{ message }}</div>
                </div>
                <div class="links">
                    <router-link to="/profile">Вернуться</router-link>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import { email, required, requiredIf } from 'vuelidate/dist/validators.min'

export default {
    name: 'ProfileEdit',
    mounted() {
        this.currentLogin = this.$store.getters.getUsername
        this.$store.dispatch("userInfo", this.currentLogin)
            .then((response) => {
                this.id = response.data.id
                this.username = response.data.username
                this.email = response.data.email
                this.phone = response.data.phone
                this.firstName = response.data.firstName
                this.lastName = response.data.lastName
                this.middleName = response.data.middleName
                this.companyName = response.data.companyName
                this.noMiddleName = response.data.noMiddleName
                this.entity = response.data.entity
                this.inn = response.data.inn
                this.kpp = response.data.kpp
                this.ogrn = response.data.ogrn
            })
    },
    data: () => ({
        id: 0,
        currentLogin: '',
        username: '',
        email: '',
        phone: '',
        firstName: '',
        lastName: '',
        middleName: '',
        companyName: '',
        noMiddleName: false,
        entity: false,
        inn: '',
        kpp: '',
        ogrn: '',
        message: ''
    }),
    validations: {
        username: {
            required
        },
        email: {
            email,
            required
        },
        phone: {
            required
        },
        firstName: {
            required
        },
        lastName: {
            required
        },
        companyName: {
            required: requiredIf(function() {
                return !!this.entity
            })
        },
        inn: {
            required: requiredIf(function() {
                return !!this.entity
            })
        },
        kpp: {
            required: requiredIf(function() {
                return !!this.entity
            })
        },
        ogrn: {
            required: requiredIf(function() {
                return !!this.entity
            })
        }
    },
    methods: {
        async submitHandler() {
            this.message = ''

            if (this.$v.$invalid) {
                this.$v.$touch()
                return
            }

            const formData = {
                id: this.id,
                username: this.username,
                email: this.email,
                phone: this.phone,
                firstName: this.firstName,
                lastName: this.lastName,
                middleName: this.middleName,
                companyName: this.companyName,
                noMiddleName: this.noMiddleName,
                entity: this.entity,
                inn: this.inn,
                kpp: this.kpp,
                ogrn: this.ogrn
            }

            await this.$store.dispatch('userUpdate', formData)
                .then((response) => {
                    if (response.status === 202)
                        this.message = response.data

                    if (response.status === 200)
                        this.$router.push('/profile')
                })
                .catch((error) => {
                    this.message = error.message
                })
        }
    }
}
</script>