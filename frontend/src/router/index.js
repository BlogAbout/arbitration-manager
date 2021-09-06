import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        meta: {
            title: 'Арбитражный управляющий',
            nonRequiresAuth: true
        },
        component: () => import('../views/Main.vue')
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: 'Вход',
            nonRequiresAuth: true
        },
        component: () => import('../views/profile/Login.vue')
    },
    {
        path: '/registration',
        name: 'Registration',
        meta: {
            title: 'Регистрация',
            nonRequiresAuth: true
        },
        component: () => import('../views/profile/Registration.vue')
    },
    {
        path: '/profile',
        name: 'Profile',
        meta: {
            title: 'Личный кабинет'
        },
        component: () => import('../views/profile/Profile.vue')
    },
    {
        path: '/bankruptcy-entities',
        name: 'BankruptcyEntities',
        meta: {
            title: 'Банкротство юридических лиц',
            nonRequiresAuth: true
        },
        component: () => import('../views/BankruptcyEntities.vue')
    },
    {
        path: '/bankruptcy-individual',
        name: 'BankruptcyIndividual',
        meta: {
            title: 'Банкротство физических лиц',
            nonRequiresAuth: true
        },
        component: () => import('../views/BankruptcyIndividual.vue')
    },
    {
        path: '/property',
        name: 'Property',
        meta: {
            title: 'Имущество',
            nonRequiresAuth: true
        },
        component: () => import('../views/property/Property.vue')
    },
    {
        path: '/property/add',
        name: 'PropertyAdd',
        meta: {
            title: 'Новое имущество'
        },
        component: () => import('../views/property/PropertyAdd.vue'),
    },
    {
        path: '/property/:id-edit',
        name: 'PropertyEdit',
        meta: {
            title: 'Редактировать имущество',
        },
        component: () => import('../views/property/PropertyAdd.vue'),
    },
    {
        path: '/property/:id-info',
        name: 'PropertyInfo',
        meta: {
            title: 'Имущество',
            nonRequiresAuth: true
        },
        component: () => import('../views/property/PropertyInfo.vue')
    },
    {
        path: '/question',
        name: 'Question',
        meta: {
            title: 'Вопросы',
            nonRequiresAuth: true
        },
        component: () => import('../views/question/Question.vue')
    },
    {
        path: '/question/add',
        name: 'QuestionAdd',
        meta: {
            title: 'Новый вопрос'
        },
        component: () => import('../views/question/QuestionAdd.vue'),
    },
    {
        path: '/question/:id-edit',
        name: 'QuestionEdit',
        meta: {
            title: 'Редактировать вопрос',
        },
        component: () => import('../views/question/QuestionAdd.vue'),
    },
    {
        path: '/education',
        name: 'Education',
        meta: {
            title: 'Обучение',
            nonRequiresAuth: true
        },
        component: () => import('../views/Education.vue')
    },
    {
        path: '/contacts',
        name: 'Contacts',
        meta: {
            title: 'Контакты',
            nonRequiresAuth: true
        },
        component: () => import('../views/Contacts.vue')
    },
    {
        path: '/city',
        name: 'City',
        meta: {
            title: 'Контакты',
            nonRequiresAuth: true
        },
        component: () => import('../views/City.vue')
    },
    {
        path: '/policy',
        name: 'Policy',
        meta: {
            title: 'Контакты',
            nonRequiresAuth: true
        },
        component: () => import('../views/Policy.vue')
    },
    {
        path: '/terms',
        name: 'Terms',
        meta: {
            title: 'Контакты',
            nonRequiresAuth: true
        },
        component: () => import('../views/Terms.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior() {
        return { x: 0, y: 0 }
    }
})

router.beforeResolve((to, from, next) => {
    if (to.name)
        NProgress.start()
    next()
})

router.afterEach(() => {
    NProgress.done()
})

router.beforeEach((to, from, next) => {
    const { title } = to.meta
    const brand = 'Арбитражный управляющий'

    if (to.matched.some(route => !route.meta.nonRequiresAuth)) {
        if (localStorage.getItem('AuthState')) {
            next()
            return
        } else {
            next('/?message=not-auth')
        }
    } else {
        next()
    }

    document.title = `${title ? title + ' | ' : ''}${brand}`
})

export default router