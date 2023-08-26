import TdBasicTable from './lib/td-basic-table/src/index.vue'

import type { App, Component } from 'vue'
const components: { [name: string]: Component } = { TdBasicTable }
export default {
  install(app: App) {
    Object.keys(components).forEach((key: string) => {
      app.component(key, components[key])
    })
  },
}
