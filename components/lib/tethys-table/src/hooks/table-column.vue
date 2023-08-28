<template>
  <el-table-column
    v-if="col.key === 'index'"
    type="index"
    :label="col.title"
    :width="col.width"
    :align="col.align"
  />
  <el-table-column
    v-else-if="col.key === 'selection'"
    type="selection"
    :width="col.width"
    :align="col.align"
  />
  <el-table-column
    v-else
    :prop="col.key"
    :align="col.align"
    :label="col.title"
    :sortable="col.sortable"
    :show-overflow-tooltip="col.tooltip"
    :columnKey="col.columnKey"
    :min-width="col.minWidth"
    :fixed="col.fixed"
    :renderHeader="col.renderHeader"
    :sortMethod="col.sortMethod"
    :sortBy="col.sortBy"
    :sort-orders="col.sortOrders"
    :resizable="col.resizable"
    :formatter="col.formatter"
    :header-align="col.headerAlign"
    :className="col.className"
    :label-class-name="col.labelClassName"
    :selectable="col.selectable"
    :reserve-selection="col.reserveSelection"
    :filters="col.filters"
    :filter-placement="col.filterPlacement"
    :filter-multiple="col.filterMultiple"
    :filter-method="col.filterMethod"
    :filtered-value="col.filteredValue"
  >
    <!-- 默认插槽 -->
    <template #default="scope">
      <slot :name="col.key" :row="scope.row" :index="scope.$index"></slot>
      <!-- 普通单元格显示 -->
      <!-- 无可编辑，无自定义render -->
      <template v-if="!col.render && !col.editable">
        <span>{{ scope.row[col.key] }}</span>
      </template>
      <!-- 可编辑单元格 -->
      <template v-else-if="col.editable">
        <editable-column
          :row="scope.row"
          :column="col"
          :index="scope.$index"
          :currentRowIndex="currentRowIndex"
          :isEdit="isEdit"
          :columnKey="columnKey"
          @removeEdit="(value) => emits('removeEdit', value)"
        ></editable-column>
      </template>
      <!-- 自定义render -->
      <template v-else>
        <Render
          :row="scope.row"
          :column="col"
          :index="scope.$index"
          :render="col.render"
        />
      </template>
    </template>
  </el-table-column>
</template>

<script lang="ts">
export default {
  name: 'TableColumn',
}
</script>
<script setup lang="ts">
import Render from '../render'
import EditableColumn from './editable-column.vue'
import type { ColumnsType } from '../table.columns.type'

defineProps({
  col: {
    type: Object,
    default: () => ({}) as ColumnsType,
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
</script>
<style scoped lang="scss"></style>
