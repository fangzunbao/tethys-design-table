import { createApp } from 'vue'
import '../components/css/index.scss'
import Compoents from '../components/index' 
import App from './App.vue'

const app = createApp(App)
app.use(Compoents)
app.mount('#app')
