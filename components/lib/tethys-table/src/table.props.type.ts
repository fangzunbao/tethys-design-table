import { PropType } from 'vue'
import type { ColumnsType } from './table.columns.type'
export default {
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
}
