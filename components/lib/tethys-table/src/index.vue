<template>
  <el-table
    ref="ElTableRef"
    :data="data"
    :height="height"
    :max-height="maxHeight"
    :border="border"
    :stripe="stripe"
    :size="size"
    :fit="fit"
    :show-header="showHeader"
    :highlight-current-row="highlightCurrentRow"
    :current-row-key="currentRowKey"
    :row-class-name="rowClassName"
    :row-style="rowStyle"
    :cell-class-name="cellClassName"
    :cell-style="cellStyle"
    :header-row-class-name="headerRowClassName"
    :header-row-style="headerRowStyle"
    :header-cell-class-name="headerCellClassName"
    :header-cell-style="headerCellStyle"
    :row-key="rowKey"
    :empty-text="emptyText"
    :default-expand-all="defaultExpandAll"
    :expand-row-keys="expandRowKeys"
    :default-sort="defaultSort"
    :tooltip-effect="tooltipEffect"
    :tooltip-options="tooltipOptions"
    :show-summary="showSummary"
    :sum-text="sumText"
    :summary-method="summaryMethod"
    :span-method="spanMethod"
    :select-on-indeterminate="selectOnIndeterminate"
    :indent="indent"
    :lazy="lazy"
    :load="load"
    :tree-props="treeProps"
    :table-layout="tableLayout"
    :scrollbar-always-on="scrollbarAlwaysOn"
    :show-overflow-tooltip="showOverflowTooltip"
    :flexible="flexible"
    style="width: 100%"
    @select="(selection, row) => emits('select', selection, row)"
    @select-all="(selection) => emits('select-all', selection)"
    @selection-change="(selection) => emits('selection-change', selection)"
    @cell-mouse-enter="
      (row, column, cell, event) =>
        emits('cell-mouse-enter', row, column, cell, event)
    "
    @cell-mouse-leave="
      (row, column, cell, event) =>
        emits('cell-mouse-leave', row, column, cell, event)
    "
    @cell-click="
      (row, column, cell, event) =>
        emits('cell-click', row, column, cell, event)
    "
    @cell-dblclick="cellDblClick"
    @cell-contextmenu="
      (row, column, cell, event) =>
        emits('cell-contextmenu', row, column, cell, event)
    "
    @row-click="(row, column, event) => emits('row-click', row, column, event)"
    @row-contextmenu="
      (row, column, event) => emits('row-contextmenu', row, column, event)
    "
    @row-dblclick="
      (row, column, event) => emits('row-dblclick', row, column, event)
    "
    @header-click="(column, event) => emits('header-click', column, event)"
    @header-contextmenu="
      (column, event) => emits('header-contextmenu', column, event)
    "
    @sort-change="
      ({ column, prop, order }) => emits('sort-change', { column, prop, order })
    "
    @filter-change="(filters) => emits('filter-change', filters)"
    @current-change="
      (currentRow, oldCurrentRow) =>
        emits('current-change', currentRow, oldCurrentRow)
    "
    @header-dragend="
      (newWidth, oldWidth, column, event) =>
        emits('header-dragend', newWidth, oldWidth, column, event)
    "
    @expand-change="(row, expand) => emits('expand-change', row, expand)"
  >
    <TableBody
      :columns="columns"
      :isEdit="isEdit"
      :columnKey="columnKey"
      :currentRowIndex="currentRowIndex"
      @finishInputEdit="finishInputEdit"
      @finishSelectEdit="finishSelectEdit"
    ></TableBody>
    <template #append>
      <slot name="append"></slot>
    </template>
    <template #empty>
      <slot name="empty"></slot>
    </template>
  </el-table>
  <!-- 分页器 -->
  <table-pagination
    v-if="pagination"
    :pagination="pagination"
    @size-change="(value: number) => emits('size-change', value)"
    @current-change="(value: number) => emits('current-change', value)"
  ></table-pagination>
</template>

<script lang="ts">
export default {
  name: 'TethysTabel',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import TableBody from './hooks/table-body.vue'
import TablePagination from './hooks/table-pagination.vue'
import TethysTableProps from './table.props.type'

const ElTableRef = ref()

const isEdit = ref(false)
const currentRowIndex = ref<number>()
const columnKey = ref('')

const props = defineProps(TethysTableProps)

const emits = defineEmits<{
  (e: 'select', selection, row): void
  (e: 'select-all', selection): void
  (e: 'selection-change', selection): void
  (e: 'cell-mouse-enter', row, column, cell, event): void
  (e: 'cell-mouse-leave', row, column, cell, event): void
  (e: 'cell-click', row, column, cell, event): void
  (e: 'cell-dblclick', row, column, cell, event): void
  (e: 'cell-contextmenu', row, column, cell, event): void
  (e: 'row-click', row, column, event): void
  (e: 'row-contextmenu', row, column, event): void
  (e: 'row-dblclick', row, column, event): void
  (e: 'header-click', column, event): void
  (e: 'header-contextmenu', column, event): void
  (e: 'sort-change', { column, prop, order }): void
  (e: 'filter-change', filters): void
  (e: 'current-change', currentRow, oldCurrentRow): void
  (e: 'header-dragend', newWidth, oldWidth, column, event): void
  (e: 'expand-change', row, expand): void
  (e: 'finishInputEdit', value): string | number
  (e: 'finishSelectEdit', value): string | number
  (e: 'size-change', value): number
  (e: 'current-change', value): number
}>()

/**
 * 取消编辑
 */
const finishInputEdit = (value, editStatus) => {
  isEdit.value = editStatus
  emits('finishInputEdit', value)
}

/**
 * 完成选项框编辑
 */
const finishSelectEdit = (value) => {
  isEdit.value = false
  emits('finishSelectEdit', value)
}

/**
 * 双击单元格
 */
const cellDblClick = (row, column, cell, event) => {
  currentRowIndex.value = props.data.findIndex(
    (item: any) => item.id === row.id,
  )
  const { key, editable } = props.columns.filter(
    (item: any) => item.key === column.property,
  )[0]
  if (key && editable) {
    columnKey.value = key
    isEdit.value = true
  }
  emits('cell-dblclick', row, column, cell, event)
}

/**
 * 用于多选表格，清空用户的选择
 */
const clearSelection = () => {
  ElTableRef.value?.clearSelection()
}

/**
 * 返回当前选中的行
 */
const getSelectionRows = () => ElTableRef.value?.getSelectionRows()

/**
 * 用于多选表格，切换某一行的选中状态， 如果使用了第二个参数，则可直接设置这一行选中与否
 */
const toggleRowSelection = (row, selected) => {
  ElTableRef.value?.toggleRowSelection(row, selected)
}

/**
 * 用于多选表格，切换全选和全不选
 */
const toggleAllSelection = () => {
  ElTableRef.value?.toggleAllSelection()
}

/**
 * 用于可扩展的表格或树表格，如果某行被扩展，则切换。 使用第二个参数，您可以直接设置该行应该被扩展或折叠。
 */
const toggleRowExpansion = (row, expanded) => {
  ElTableRef.value?.toggleRowExpansion(row, expanded)
}

/**
 * 用于单选表格，设定某一行为选中行， 如果调用时不加参数，则会取消目前高亮行的选中状态。
 */
const setCurrentRow = (row) => {
  ElTableRef.value?.setCurrentRow(row)
}

/**
 * 用于清空排序条件，数据会恢复成未排序的状态
 */
const clearSort = () => {
  ElTableRef.value?.clearSort()
}

/**
 * 传入由columnKey 组成的数组以清除指定列的过滤条件。 如果没有参数，清除所有过滤器
 */
const clearFilter = (columnKeys) => {
  ElTableRef.value?.clearFilter(columnKeys)
}

/**
 * 对 Table 进行重新布局。 当表格可见性变化时，您可能需要调用此方法以获得正确的布局
 */
const doLayout = () => {
  ElTableRef.value?.doLayout()
}

/**
 * 手动排序表格。 参数 prop 属性指定排序列，order 指定排序顺序。
 */
const sort = (prop: string, order: string) => {
  ElTableRef.value?.sort(prop, order)
}

/**
 * 滚动到一组特定坐标
 */
const scrollTo = (options: ScrollToOptions | number, yCoord?: number) => {
  ElTableRef.value?.scrollTo(options, yCoord)
}

/**
 * 设置垂直滚动位置
 */
const setScrollTop = (top) => {
  ElTableRef.value?.setScrollTop(top)
}

/**
 * 设置水平滚动位置
 */
const setScrollLeft = (left) => {
  ElTableRef.value?.setScrollLeft(left)
}

defineExpose({
  clearSelection,
  getSelectionRows,
  toggleRowSelection,
  toggleRowExpansion,
  setCurrentRow,
  clearSort,
  clearFilter,
  doLayout,
  sort,
  scrollTo,
  setScrollTop,
  setScrollLeft,
})
</script>
<style scoped lang="scss"></style>
