<template>
  <template v-for="col in columns" :key="col.key">
    <table-column
      :col="col"
      :isEdit="isEdit"
      :columnKey="columnKey"
      :currentRowIndex="currentRowIndex"
      @finishInputEdit="(value) => emits('finishInputEdit', value)"
      @finishSelectEdit="(value) => emits('finishSelectEdit', value)"
    ></table-column>
  </template>
</template>

<script lang="ts">
export default {
  name: 'TableBody',
}
</script>
<script setup lang="ts">
import { PropType } from 'vue'
import TableColumn from './table-column.vue'
import type { ColumnsType } from '../table.columns.type'
defineProps({
  columns: {
    type: Array as PropType<ColumnsType[]>,
    default: () => [] as ColumnsType[],
  },
  isEdit: {
    type: Boolean,
  },
  currentRowIndex: {
    type: Number,
  },
  columnKey: {
    type: String,
    default: () => '',
  },
})

const emits = defineEmits(['finishInputEdit', 'finishSelectEdit'])
</script>
<style scoped lang="scss"></style>
