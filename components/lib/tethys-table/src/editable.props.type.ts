export interface PaginationProps {
  align?: string
  small?: boolean
  disabled?: boolean
  background?: boolean
  hideOnSinglePage?: boolean
  layout?: string
  currentPage?: number
  pageSizes?: number[]
  pageSize?: number[]
  total?: number
}

export interface RuleItem {
  min?: number
  max?: number
  require?: boolean
  message?: string
  trigger?: string
}
