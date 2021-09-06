<template>
    <main class="main-container">
        <section class="content-block">
            <div class="wrap">
                <div class="content-block-inner">
                    <h1>Регистрация</h1>
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
                            <div class="col col-2" v-if="!noMiddleName">
                                <div class="field">
                                    <label for="middleName">Отчество</label>
                                    <input
                                        id="middleName"
                                        type="text"
                                        name="middleName"
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
                                        :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email) || ($v.email.$dirty && !$v.email.maxLength)}"
                                    />
                                    <span
                                        class="helper-text invalid"
                                        v-if="$v.email.$dirty && !$v.email.required"
                                    >Поле не должно быть пустым</span>
                                    <span
                                        class="helper-text invalid"
                                        v-else-if="$v.email.$dirty && !$v.email.email"
                                    >Введите корректный E-mail</span>
                                    <span
                                        class="helper-text invalid"
                                        v-else-if="$v.email.$dirty && !$v.email.maxLength"
                                    >E-mail слишком длинный</span>
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
        noMiddleName: '',
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
                            this.submitCode = response.data.code
                            this.code = response.data.code
                        } else {
                            /*if (messages[response.data.code])
                                this.$message(messages[response.data.code])
                            else
                                this.$message(response.data.message)*/
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                        //this.$error(error.message)
                    })
            } else {
                const credentials = {
                    username: this.username,
                    password: this.password
                }

                await this.$store.dispatch('userSignUp', formData)
                    .then((response) => {
                        /*if (messages[response.data.code])
                            this.$message(messages[response.data.code])
                        else
                            this.$message(response.data.message)*/

                        if (response.status === 200) {
                            this.$store.dispatch('userSignIn', credentials)
                                .then(() => {
                                    //this.$message(messages['welcome'])
                                    //this.$emit('dialog', '')
                                    this.$router.push('/profile')
                                })
                                .catch((error) => {
                                    console.log(error)
                                    //this.$error(error.message)
                                })
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                        //this.$error(error.message)
                    })
            }
        }
    }
}
</script>