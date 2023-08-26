import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'Render',
  functional: true,
  props: {
    row: Object,
    column: {
      type: Object,
      default: null,
    },
    index: Number,
    render: Function,
  },

  render(ctx: any) {
    const params = {
      row: ctx.row,
      column: ctx.column,
      index: ctx.index,
    }
    return ctx.render(h, params)
  },
})
