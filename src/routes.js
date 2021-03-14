
import Orders from './components/Orders.vue'
import PageContent from './components/PageContent.vue'
import Modify from './components/Modify.vue'
import Dashboard from './components/Dashboard.vue'

export default [
    { path: '/', component: PageContent },
    { path: '/orders', component: Orders },
    { path: '/dashboard', component: Dashboard },
    { path: '/modify/:id', component: Modify, props: true},
]