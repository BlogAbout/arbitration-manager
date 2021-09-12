<template>
    <div id="app">
        <header class="header">
            <div class="top-panel">
                <div class="wrap">
                    <div class="row">
                        <div class="logo">
                            <router-link to="/">
                                <img src="./assets/images/logo.png" alt="Арбитражный управляющий" />
                            </router-link>
                        </div>
                        <div class="contacts">
                            <div class="phone">
                                <a href="tel:+79881554020">+7 (988) 155-40-20</a>
                            </div>
                            <div class="email">
                                <a href="mailto:info@arbitration-manager.ru">info@arbitration-manager.ru</a>
                            </div>
                            <div v-if="isAuthenticated" class="links">
                                <router-link to="/profile">Профиль</router-link>
                                <a href="#" @click.prevent="userSignOut">Выйти</a>
                            </div>
                            <div v-else class="links">
                                <router-link to="/login">Войти</router-link>
                                <router-link to="/registration">Регистрация</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="menu-panel">
                <div class="wrap">
                    <ul class="main-menu row" :class="{ show: mobileMenuShow }">
                        <router-link
                            v-for="(item, index) in menuHeader"
                            :key="'header-link-' + index"
                            :to="item.url"
                            custom
                            v-slot="{ href, route, navigate, isActive, isExactActive }"
                        >
                            <li :class="[isActive && 'active', isExactActive && 'exact-active']">
                                <a :href="href" @click="navigate" v-on:click.capture="mobileMenuShow = false">{{ item.title }}</a>
                            </li>
                        </router-link>
                    </ul>
                    <div class="mobile-toggle-button">
                        <div class="email">
                            <a href="mailto:info@arbitration-manager.ru">info@arbitration-manager.ru</a>
                        </div>
                        <a class="toggle-menu-link" href="#" @click.prevent="mobileMenuShow = !mobileMenuShow">
                            <i class="fas fa-bars"></i>
                        </a>
                    </div>
                </div>
            </div>
        </header>
        <transition name="fade">
            <router-view />
        </transition>
        <footer class="footer">
            <div class="wrap">
                <div class="row">
                    <div class="col col-3">
                        <ul class="footer-menu">
                            <router-link
                                v-for="(item, index) in menuFooter1"
                                :key="'header-link-' + index"
                                :to="item.url"
                                custom
                                v-slot="{ href, route, navigate, isActive, isExactActive }"
                            >
                                <li :class="[isActive && 'active', isExactActive && 'exact-active']">
                                    <a :href="href" @click="navigate">{{ item.title }}</a>
                                </li>
                            </router-link>
                        </ul>
                    </div>
                    <div class="col col-3">
                        <ul class="footer-menu">
                            <router-link
                                v-for="(item, index) in menuFooter2"
                                :key="'header-link-' + index"
                                :to="item.url"
                                custom
                                v-slot="{ href, route, navigate, isActive, isExactActive }"
                            >
                                <li :class="[isActive && 'active', isExactActive && 'exact-active']">
                                    <a :href="href" @click="navigate">{{ item.title }}</a>
                                </li>
                            </router-link>
                        </ul>
                    </div>
                    <div class="col col-3">
                        <div class="copyright">&copy; {{ new Date().getFullYear() }}. All rights reserved. Арбитражный управляющий.</div>
                    </div>
                </div>
            </div>
        </footer>
        <div class="social-links">
            <div
                v-for="(item, index) in socialIcons"
                :key="'social-icon-' + index"
                class="social-icon"
            >
                <a :href="item.link" target="_blank"><i :class="item.icon"></i></a>
            </div>
        </div>
        <div class="goto-up-block">
            <a href="#" @click.prevent="goToTop"><i class="fas fa-level-up-alt"></i></a>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'App',
    computed: {
        ...mapState({
            isAuthenticated: state => state.authenticated
        })
    },
    data: () => ({
        mobileMenuShow: false,
        menuHeader: [
            {title: 'Арбитражный управляющий', url: '/'},
            {title: 'Банкротство юридических лиц', url: '/bankruptcy-entities'},
            {title: 'Банкротство физических лиц', url: '/bankruptcy-individual'},
            {title: 'Имущество', url: '/property'},
            {title: 'Вопросы', url: '/question'},
            {title: 'Обучение', url: '/education'},
            {title: 'Контакты', url: '/contacts'}
        ],
        menuFooter1: [
            {title: 'Арбитражный управляющий', url: '/'},
            {title: 'Банкротство юридических лиц', url: '/bankruptcy-entities'},
            {title: 'Банкротство физических лиц', url: '/bankruptcy-individual'},
            {title: 'Имущество', url: '/property'},
        ],
        menuFooter2: [
            {title: 'Работаем с городами', url: '/city'},
            {title: 'Вопросы', url: '/question'},
            {title: 'Обучение', url: '/education'},
            {title: 'Политика конфиденциальности', url: '/policy'},
            {title: 'Условия использования', url: '/terms'},
            {title: 'Контакты', url: '/contacts'}
        ],
        socialIcons: [
            {icon: 'fab fa-vk', link: '#'},
            {icon: 'fab fa-youtube', link: '#'},
            {icon: 'fab fa-twitter', link: '#'},
            {icon: 'fab fa-instagram', link: '#'},
            {icon: 'fab fa-facebook-f', link: '#'},
        ]
    }),
    methods: {
        ...mapActions([
            'userSignOut'
        ]),
        goToTop() {
            window.scrollTo(0, 0);
        }
    }
}
</script>