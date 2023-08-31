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
      <el-popover
        v-else
        placement="top-start"
        :visible="inputError"
        :content="inputErrorMessage"
      >
        <template #reference>
          <el-input
            ref="inputRef"
            :class="inputError ? 'input-column error_input' : 'input-column'"
            type="text"
            @blur="inputBlur"
            @change="changeInput"
            @input="inputInput"
            v-model="row[column.key]"
            placeholder="请输入相关数据"
          />
        </template>
        <div class="error-message">
          <el-icon><Warning /></el-icon>
          <span>{{ inputErrorMessage }}</span>
        </div>
      </el-popover>
    </template>
    <template v-else>
      <div v-if="column.type === 'select'">
        {{ column.options[row[column.key]]?.label }}
      </div>
      <div class="table-column" v-else>
        {{ row[column.key] }}
      </div>
    </template>
  </div>
</template>
<script lang="ts">
export default {
  name: 'EditableColumn',
}
</script>
<script setup lang="ts">
import { ref, watch, nextTick, computed } from 'vue'
import type { ColumnsType } from '../table.columns.type'
import type { RuleItem } from '../editable.props.type'
import { Warning } from '@element-plus/icons-vue'

const inputRef = ref()
const selectRef = ref()
const inputError = ref(false)
const inputErrorMessage = ref('')
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
const rules = computed((): RuleItem[] => props.column.rule)
const inputRules = computed(
  (): RuleItem[] =>
    rules.value?.filter((item: RuleItem) => item.trigger === 'change'),
)
const changeRules = computed(
  (): RuleItem[] =>
    rules.value?.filter((item: RuleItem) => item.trigger === 'blur'),
)

const emits = defineEmits(['finishInputEdit', 'finishSelectEdit'])

// 输入框失去焦点
const inputBlur = () => {
  emits('finishInputEdit', props.row[props.column.key], inputError.value)
}

// 输入框触发change
const changeInput = (value: string | number) => {
  if (changeRules.value && changeRules.value.length > 0) {
    changeRules.value.forEach((item) => {
      if (item?.require && !value) {
        inputRef.value && inputRef.value.focus()
        inputError.value = true
        inputErrorMessage.value = item?.message || ''
      } else if (
        item?.min &&
        item?.max &&
        (value.toString().trim().length < item?.min ||
          value.toString().trim().length > item?.max)
      ) {
        inputRef.value && inputRef.value.focus()
        inputError.value = true
        inputErrorMessage.value = item?.message || ''
      } else {
        inputError.value = false
        inputRef.value && inputRef.value.blur()
      }
    })
  }
}

// 输入框触发input
const inputInput = (value: string | number) => {
  if (inputRules.value && inputRules.value.length > 0) {
    inputRules.value.forEach((item) => {
      if (item?.require && !value) {
        inputError.value = true
        inputErrorMessage.value = item?.message || ''
      } else if (
        item?.min &&
        item?.max &&
        (value.toString().trim().length < item?.min ||
          value.toString().trim().length > item?.max)
      ) {
        inputError.value = true
        inputErrorMessage.value = item?.message || ''
      } else {
        inputError.value = false
      }
    })
  }
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
.error_input {
  padding: 0;
  border: none;
  :deep(.el-input__wrapper) {
    box-shadow: none;
    border-radius: 0;
    background-color: var(--el-color-danger-light-9);
    color: var(--el-color-danger);
    border: 1px solid var(--el-color-danger);
  }
  :deep(.el-input__inner) {
    color: var(--el-color-danger);
  }
}

.error-message {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--el-color-danger);
}

.table-column {
  color: #606266;
}
</style>
