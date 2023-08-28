<template>
  <div>
    <template
      v-if="columnEdit && currentRowIndex === index && columnKey === column.key"
    >
      <el-select
        v-if="column.type === 'select'"
        class="input-column"
        ref="selectRef"
        @blur="selectBlur"
        v-model="row[column.key]"
        placeholder="请选择相应数据"
      >
        <el-option
          v-for="item in column.options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-input
        v-else
        ref="inputRef"
        class="input-column"
        type="text"
        @blur="inputBlur"
        v-model="row[column.key]"
        placeholder="请输入相关数据"
      />
    </template>
    <template v-else>
      <div v-if="column.type === 'select'">
        {{ column.options[row[column.key]]?.label }}
      </div>
      <div class="table-column" v-else>{{ row[column.key] }}</div>
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
import type { ColumnsType } from '../table.columns.type'

const inputRef = ref()
const selectRef = ref()
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

const emits = defineEmits(['finishInputEdit', 'finishSelectEdit'])

// 输入框失去焦点
const inputBlur = () => {
  emits('finishInputEdit', props.row[props.column.key])
}
// 选择框失去焦点
const selectBlur = () => {
  emits('finishSelectEdit', props.row[props.column.key])
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
        selectRef.value && selectRef.value.focus()
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
}
.el-input {
  padding: 0;
  border: none;
  :deep(.el-input__wrapper) {
    box-shadow: none;
    border-radius: 0;
    background-color: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
    border: 1px solid var(--el-color-primary);
  }
  :deep(.el-input__inner) {
    color: var(--el-color-primary);
  }
}
.el-select {
  padding: 0;
  border: none;
  :deep(.el-input__wrapper) {
    box-shadow: none;
    border-radius: 0;
    background-color: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
    border: 1px solid var(--el-color-primary);
  }
  :deep(.el-input__inner) {
    color: var(--el-color-primary);
  }
}
.table-column {
  color: #606266;
}
</style>
