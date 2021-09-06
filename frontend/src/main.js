import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import AXIOS from './http-common'

import './assets/styles/style.css'

Vue.prototype.$axios = AXIOS
Vue.config.productionTip = false

Vue.use(Vuelidate)

Vue.directive('phone', {
    bind(el) {
        el.oninput = function(e) {
            if (!e.isTrusted)
                return

            const x = this.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/)
            if (!x[2] && x[1] !== '') {
                this.value = x[1] === '8' ? x[1] : '8 ' + x[1]
            } else {
                this.value = !x[3] ? x[1] + ' ' + x[2] : x[1] + ' (' + x[2] + ') ' + x[3] + (x[4] ? (!x[5] ? '-' + x[4] : '-' + x[4] + '-' + x[5]) : '')
            }
            el.dispatchEvent(new Event('input'))
        }
    },
})

new Vue({
    router,
    store,
    render: h => h(App),
    data: {
        phone: ''
    },
}).$mount('#app')