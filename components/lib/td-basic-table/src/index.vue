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
    @cell-dblclick="
      (row, column, cell, event) =>
        emits('cell-dblclick', row, column, cell, event)
    "
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
    <template v-for="col in columns" :key="col.key">
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
        <template #default="scope">
          <slot :name="col.key" :row="scope.row" :index="scope.$index"></slot>
          <template v-if="!col.render">
            <span>{{ scope.row[col.key] }}</span>
          </template>
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
    <template #append>
      <slot name="append"></slot>
    </template>
    <template #empty>
      <slot name="empty"></slot>
    </template>
  </el-table>
</template>

<script lang="ts">
export default {
  name: 'TdBasicTabel',
}
</script>
<script setup lang="ts">
import { PropType, ref, nextTick } from 'vue'
import Render from './render'
import type { ColumnsType } from './type'

const ElTableRef = ref()

defineProps({
  /**
   * 显示的数据
   */
  data: {
    type: Array,
    default: () => [],
  },
  /**
   *  Table 的高度， 默认为自动高度。
   *  如果 height 为 number 类型，单位 px；
   *  如果 height 为 string 类型，则这个高度会设置为 Table 的 style.height 的值，Table 的高度会受控于外部样式。
   */
  height: {
    type: [String, Number],
  },
  /**
   * Table 的最大高度。 合法的值为数字或者单位为 px 的高度。
   */
  maxHeight: {
    type: [String, Number],
  },
  /**
   * 是否为斑马纹 table
   */
  stripe: {
    type: Boolean,
    default: () => false,
  },
  /**
   * 是否带有纵向边框
   */
  border: {
    type: Boolean,
    default: () => false,
  },
  /**
   * Table 的尺寸
   */
  size: {
    type: String,
    default: () => 'default',
  },
  /**
   *  列的宽度是否自撑开
   */
  fit: {
    type: Boolean,
    default: () => true,
  },
  /**
   * 是否显示表头
   */
  showHeader: {
    type: Boolean,
    default: () => true,
  },
  /**
   * 是否要高亮当前行
   */
  highlightCurrentRow: {
    type: Boolean,
    default: () => false,
  },
  /**
   * 当前行的 key，只写属性
   */
  currentRowKey: {
    type: [String, Number],
  },
  /**
   * 行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className。
   */
  rowClassName: {
    type: [Function, String],
  },
  /**
   * 行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style。
   */
  rowStyle: {
    type: [Object, String],
  },
  /**
   * 单元格的 className 的回调方法，也可以使用字符串为所有单元格设置一个固定的 className。
   */
  cellClassName: {
    type: [Function, String],
  },
  /**
   * 单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style。
   */
  cellStyle: {
    type: [Object, String],
  },
  /**
   * 表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className。
   */
  headerRowClassName: {
    type: [Function, String],
  },
  /**
   * 表头行的 style 的回调方法，也可以使用一个固定的 Object 为所有表头行设置一样的 Style。
   */
  headerRowStyle: {
    type: [Object, String],
  },
  /**
   * 表头单元格的 className 的回调方法，也可以使用字符串为所有表头单元格设置一个固定的 className。
   */
  headerCellClassName: {
    type: [Function, String],
  },
  /**
   * 表头单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style
   */
  headerCellStyle: {
    type: [Object, String],
  },
  /**
   * 行数据的 Key，用来优化 Table 的渲染；
   * 在使用reserve-selection功能与显示树形数据时，该属性是必填的。
   * 类型为 String 时，支持多层访问：user.info.id，但不支持 user.info[0].id，此种情况请使用 Function。
   */
  rowKey: {
    type: [Function, String],
  },
  /**
   * 空数据时显示的文本内容， 也可以通过 #empty 设置
   */
  emptyText: {
    type: String,
    default: () => '暂无数据',
  },
  /**
   * 是否默认展开所有行，当 Table 包含展开行存在或者为树形表格时有效
   */
  defaultExpandAll: {
    type: Boolean,
    deault: () => false,
  },
  /**
   * 可以通过该属性设置 Table 目前的展开行，需要设置 row-key 属性才能使用，该属性为展开行的 keys 数组。
   */
  expandRowKeys: {
    type: Array,
    deault: () => [],
  },
  /**
   * 默认的排序列的 prop 和顺序。 它的 prop 属性指定默认的排序的列，order 指定默认排序的顺序
   * order: 'ascending' 'descending', 默认值：descending
   */
  defaultSort: {
    type: Object,
  },
  /**
   * 溢出的 tooltip 的 effect
   */
  tooltipEffect: {
    type: String,
    default: () => 'dark',
  },
  /**
   * 溢出 tooltip 的选项，参见下述 tooltip 组件
   */
  tooltipOptions: {
    type: Object,
  },
  /**
   * 是否在表尾显示合计行
   */
  showSummary: {
    type: Boolean,
    deault: () => false,
  },
  /**
   * 显示摘要行第一列的文本
   */
  sumText: {
    type: String,
    default: () => 'Sum',
  },
  /**
   * 自定义的合计计算方法
   */
  summaryMethod: {
    type: Function,
  },
  /**
   * 合并行或列的计算方法
   */
  spanMethod: {
    type: Function,
  },
  /**
   * 在多选表格中，当仅有部分行被选中时，点击表头的多选框时的行为。
   * 若为 true，则选中所有行；若为 false，则取消选择所有行
   */
  selectOnIndeterminate: {
    type: Boolean,
    deault: () => true,
  },
  /**
   * 展示树形数据时，树节点的缩进
   */
  indent: {
    type: Number,
    default: () => 16,
  },
  lazy: {
    type: Boolean,
    deault: () => false,
  },
  /**
   * 加载子节点数据的函数，lazy 为 true 时生效
   */
  load: {
    type: Function,
  },
  /**
   * 渲染嵌套数据的配置选项
   */
  treeProps: {
    type: Object,
    default: () => ({ hasChildren: 'hasChildren', children: 'children' }),
  },
  /**
   * 设置表格单元、行和列的布局方式
   */
  tableLayout: {
    type: String,
    default: () => 'fixed',
  },
  /**
   * 总是显示滚动条
   */
  scrollbarAlwaysOn: {
    type: Boolean,
    deault: () => false,
  },
  /**
   * 是否隐藏额外内容并在单元格悬停时使用 Tooltip 显示它们。这将影响全部列的展示。
   */
  showOverflowTooltip: {
    type: [Boolean, Object],
  },
  /**
   * 确保主轴的最小尺寸，以便不超过内容
   */
  flexible: {
    type: Boolean,
    deault: () => false,
  },
  /**
   * 列数据
   */
  columns: {
    type: Array as PropType<ColumnsType[]>,
    default: () => [] as ColumnsType[],
  },
})

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
}>()

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
  ElTableRef.value?.scrollTo(options, yCoordf)
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
