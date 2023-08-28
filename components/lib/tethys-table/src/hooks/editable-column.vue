<template>
  <div>
    <template
      v-if="columnEdit && currentRowIndex === index && columnKey === column.key"
    >
      <input
        ref="inputRef"
        class="input-column"
        type="text"
        @blur="blur"
        v-model="row[column.key]"
        placeholder="请输入相关数据"
      />
    </template>
    <template v-else>
      <div class="table-column">{{ row[column.key] }}</div>
    </template>
  </div>
</template>
<script lang="ts">
export default {
  name: 'EditableColumn',
}
</script>
<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'
import type { ColumnsType } from '../table.columns.type'

const inputRef = ref()
const columnEdit = ref(false)
const props = defineProps({
  row: {
    type: Object,
    default: () => {},
  },
  column: {
    type: Object,
    default: () => ({}) as ColumnsType,
  },
  index: {
    type: Number,
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

const emits = defineEmits(['removeEdit'])

// 输入框失去焦点
const blur = () => {
  emits('removeEdit', props.row[props.column.key])
}

watch(
  () => props.isEdit,
  () => {
    columnEdit.value = props.isEdit
    if (
      columnEdit.value &&
      props.index === props.currentRowIndex &&
      props.columnKey === props.column.key
    ) {
      nextTick(() => {
        inputRef.value && inputRef.value.focus()
      })
    }
  },
)
</script>
<style scoped lang="scss">
.input-column {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  border: 1px solid var(--el-color-primary);
  color: var(--el-color-primary);
  background-color: var(--el-color-primary-light-9);
  outline: none;
  padding: 0 16px;
}
.table-column {
  color: #606266;
}
</style>
