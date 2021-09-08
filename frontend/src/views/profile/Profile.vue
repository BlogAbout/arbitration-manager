<template>
    <main class="main-container">
        <section class="content-block">
            <div class="wrap">
                <div class="content-block-inner">
                    <h1>Личный кабинет</h1>
                    <div v-if="userInfo" class="user-information">
                        <h3>
                            <span>Личные данные</span>
                            <router-link to="/profile/edit" class="link-small" title="Редактировать">
                                <i class="far fa-edit"></i>
                            </router-link>
                        </h3>
                        <div class="user-information-list">
                            <div class="param">
                                <span class="param-label">Тип:</span>
                                <span v-if="!userInfo.entity" class="param-value">Физическое лицо</span>
                                <span v-else class="param-value">Юридическое лицо</span>
                            </div>
                            <div class="param">
                                <span class="param-label">Фамилия:</span>
                                <span class="param-value">{{ userInfo.lastName }}</span>
                            </div>
                            <div class="param">
                                <span class="param-label">Имя:</span>
                                <span class="param-value">{{ userInfo.firstName }}</span>
                            </div>
                            <div class="param">
                                <span class="param-label">Отчество:</span>
                                <span class="param-value">{{ userInfo.middleName }}</span>
                            </div>
                            <div class="param">
                                <span class="param-label">Логин:</span>
                                <span class="param-value">{{ userInfo.username }}</span>
                            </div>
                            <div class="param">
                                <span class="param-label">Телефон:</span>
                                <span class="param-value">{{ userInfo.phone }}</span>
                            </div>
                            <div class="param">
                                <span class="param-label">E-mail:</span>
                                <span class="param-value">{{ userInfo.email }}</span>
                            </div>
                            <div v-if="userInfo.entity" class="param">
                                <span class="param-label">Компания:</span>
                                <span class="param-value">{{ userInfo.companyName }}</span>
                            </div>
                            <div v-if="userInfo.entity" class="param">
                                <span class="param-label">ИНН:</span>
                                <span class="param-value">{{ userInfo.inn }}</span>
                            </div>
                            <div v-if="userInfo.entity" class="param">
                                <span class="param-label">КПП:</span>
                                <span class="param-value">{{ userInfo.kpp }}</span>
                            </div>
                            <div v-if="userInfo.entity" class="param">
                                <span class="param-label">ОГРН:</span>
                                <span class="param-value">{{ userInfo.ogrn }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="user-information">
                        <h3>
                            <span>Документы</span>
                            <router-link to="/profile/documents" class="link-small" title="Редактировать">
                                <i class="fas fa-download"></i>
                            </router-link>
                        </h3>
                        <div class="user-information-list">
                            <div class="param">
                                <span class="param-label">Паспорт:</span>
                                <span class="param-value">Добавлено</span>
                            </div>
                            <div class="param">
                                <span class="param-label">ИНН:</span>
                                <span class="param-value"><router-link to="/profile/documents">Загрузить</router-link></span>
                            </div>
                            <div class="param">
                                <span class="param-label">Реквизиты:</span>
                                <span class="param-value">Добавлено</span>
                            </div>
                            <div class="param">
                                <span class="param-label">Другое:</span>
                                <span class="param-value"><router-link to="/profile/documents">Загрузить</router-link></span>
                            </div>
                        </div>
                    </div>
                    <div class="user-information">
                        <h3>
                            <span>Состояние</span>
                            <router-link to="/profile/state" class="link-small" title="Подробнее">
                                <i class="far fa-eye"></i>
                            </router-link>
                        </h3>
                        <div class="user-information-inner">
                            <div class="param">
                                <span class="param-label">Статус:</span>
                                <span class="param-value">проверка документов</span>
                            </div>
                            <div class="param">
                                <span class="param-label">Дополнительно:</span>
                                <span class="param-value">сотрудник проверяет корректность документов</span>
                            </div>
                            <div class="param">
                                <span class="param-label">Комментарий:</span>
                                <span class="param-value">Произведите загрузку всех документов в разделе "Документы".</span>
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
    name: 'Profile',
    computed: {
        ...mapGetters({
            userInfo: 'getCurrentUser'
        })
    },
    data: () => ({
        currentLogin: ''
    }),
    mounted() {
        this.currentLogin = this.$store.getters.getUsername
        this.$store.dispatch("userInfo", this.currentLogin)
    },
}
</script>