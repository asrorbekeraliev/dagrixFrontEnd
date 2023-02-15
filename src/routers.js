import Register from "@/components/Register";
import Login from "@/components/Login";
import Home from "@/components/Home";
import Account from "@/components/Account";
import Users from "@/components/Users.vue";
import DeviceRegister from "@/components/DeviceRegister.vue";
import Vue from "vue";
import VueRouter from 'vue-router'
import WirelessDevices from '@/components/WirelessDevices'
import Charts from '@/components/Charts.vue'
import Fields from "@/components/Fields.vue";
import Profile from "@/components/Profile";

Vue.use(VueRouter);

const routes = [
    {path: '/', component: Home},
    {path: '/register', component: Register},
    {path: '/login', component: Login, name: 'login'},
    {path: '/account', component: Account},
    {path: '/users', component: Users},
    {path: '/deviceregister', component: DeviceRegister},
    {path: '/wirelessdevices', component: WirelessDevices},
    {
        path:'/charts/:nodeId',
        name: 'Charts',
        component: Charts,
        props: true
    },
    {path: '/fields', component: Fields},
    {path: '/profile', component: Profile}

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
   })
    
   export default router
