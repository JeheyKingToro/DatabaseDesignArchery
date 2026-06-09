import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Archers from '../views/Archers.vue'
import Scores from '../views/Scores.vue'
import Competitions from '../views/Competitions.vue'
import Rounds from '../views/Rounds.vue'
import Records from '../views/Records.vue'
import PB from '../views/PB.vue'


const routes = [
    { path: '/', component: Home },
    { path: '/archers', component: Archers },
    { path: '/scores', component: Scores },
    { path: '/competitions', component: Competitions },
    { path: '/rounds', component: Rounds },
    {
        path: '/records',
        component: Records
    },

    {
        path: '/pb',
        component: PB
    },

    


]
const router = createRouter({ history: createWebHistory(), routes })
export default router