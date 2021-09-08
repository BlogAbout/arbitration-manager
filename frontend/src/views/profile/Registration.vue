<template>
    <main class="main-container">
        <section class="content-block">
            <div class="wrap">
                <div class="content-block-inner">
                    <h1>Регистрация</h1>
                    <form name="form-registration" action="" method="post" @submit.prevent="submitHandler">
                        <div v-if="!submitCode" class="row row-wrap row-space">
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
                                        v-model.trim="companyName"
                                        :class="{invalid: ($v.companyName.$dirty && !$v.companyName.required)}"
                                    />
                                    <span
                                        class="helper-text invalid"
                                        v-if="$v.companyName.$dirty && !$v.companyName.required"
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
                                    <label for="password">Пароль</label>
                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        class="validate"
                                        v-model.trim="password"
                                        :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
                                    />
                                    <span
                                        class="helper-text invalid"
                                        v-if="$v.password.$dirty && !$v.password.required"
                                    >Поле не должно быть пустым</span>
                                    <span
                                        class="helper-text invalid"
                                        v-else-if="$v.password.$dirty && !$v.password.minLength"
                                    >Минимальная длина пароля 6 символов, текущая длина {{ password.length }} символов</span>
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
                            <div class="col">
                                <div class="field field-checkbox">
                                    <label>
                                        <input
                                            id="agree"
                                            type="checkbox"
                                            name="agree"
                                            v-model="agree"
                                        />
                                        <span>Принимаю условия политики конфиденциальности</span>
                                    </label>
                                </div>
                            </div>
                            <div class="col col-2">
                                <div class="field">
                                    <input type="submit" value="Регистрация" />
                                </div>
                            </div>
                        </div>
                        <div v-else class="row row-wrap row-space">
                            <div class="col col-2">
                                <div class="field">
                                    <label for="code">На номер {{ phone }} отправлено СМС с кодом подтверждения</label>
                                    <input
                                        id="code"
                                        type="number"
                                        name="code"
                                        class="validate"
                                        v-model.trim="code"
                                        :class="{invalid: ($v.code.$dirty && !$v.code.required)}"
                                    />
                                    <span
                                        class="helper-text invalid"
                                        v-if="$v.code.$dirty && !$v.code.required"
                                    >Укажите код из СМС</span>
                                </div>
                            </div>
                            <div class="col col-2">
                                <div class="field">
                                    <input type="submit" value="Подтвердить" />
                                </div>
                            </div>
                        </div>
                    </form>
                    <div v-if="message" class="errors">{{ message }}</div>
                </div>
                <div class="links">
                    <router-link to="/login">Войти</router-link>
                    <router-link to="/forgot">Восстановить пароль</router-link>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import { email, required, requiredIf, minLength } from 'vuelidate/dist/validators.min'

export default {
    name: 'Registration',
    data: () => ({
        username: '',
        password: '',
        email: '',
        phone: '',
        firstName: '',
        lastName: '',
        middleName: '',
        companyName: '',
        noMiddleName: false,
        entity: false,
        agree: false,
        code: '',
        submitCode: '',
        message: ''
    }),
    validations: {
        username: {
            required
        },
        password: {
            required,
            minLength: minLength(6)
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
        code: {
            required: requiredIf(function() {
                return this.submitCode !== ''
            })
        },
        agree: {
            checked: v => v
        }
    },
    methods: {
        async submitHandler() {
            this.data = ''

            if (this.$v.$invalid) {
                this.$v.$touch()
                return
            }

            const formData = {
                username: this.username,
                password: this.password,
                email: this.email,
                phone: this.phone,
                firstName: this.firstName,
                lastName: this.lastName,
                middleName: this.middleName,
                companyName: this.companyName,
                noMiddleName: this.noMiddleName,
                entity: this.entity,
                code: this.code
            }

            if (!this.submitCode) {
                await this.$store.dispatch('userSignUp', formData)
                    .then((response) => {
                        if (response.status === 200) {
                            this.submitCode = response.data.validationCode
                            this.code = response.data.validationCode
                        } else {
                            this.message = response.data
                        }
                    })
                    .catch((error) => {
                        this.message = error.message
                    })
            } else {
                const credentials = {
                    username: this.username,
                    password: this.password
                }

                await this.$store.dispatch('userSignUp', formData)
                    .then((response) => {
                        if (response.status === 202)
                            this.message = response.data

                        if (response.status === 200) {
                            this.$store.dispatch('userSignIn', credentials)
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
                    })
                    .catch((error) => {
                        this.message = error.message
                    })
            }
        }
    }
}
</script>