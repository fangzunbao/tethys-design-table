<template>
  <div
    class="table-pagination"
    :style="{ justifyContent: paginationAlign[pagination['align']] }"
  >
    <el-pagination
      v-model:page-size="page.pageSize"
      v-model:currentPage="page.currentPage"
      :small="small"
      :background="background"
      :disabled="disabled"
      :page-sizes="pageSizes"
      :layout="layout"
      :total="total"
      :hide-on-single-page="hideOnSinglePage"
      @size-change="(value: number) => emits('size-change', value)"
      @current-change="(value: number) => emits('current-change', value)"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'TablePagination',
}
</script>
<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import type { PaginationProps } from '../pagination.props.type'

const paginationAlign = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
}

const page = reactive({
  currentPage: 1,
  pageSize: 10,
})

const props = defineProps({
  pagination: {
    type: [Object, Boolean],
    default: () => (({}) as PaginationProps) || true,
  },
})

const emits = defineEmits(['size-change', 'current-change'])

const layout = computed(() => props.pagination['layout'] || 'prev, pager, next')
const total = computed(() => props.pagination['total'] || 0)
const background = computed(() => props.pagination['background'] || true)
const disabled = computed(() => props.pagination['disabled'] || false)
const small = computed(() => props.pagination['small'] || false)
const hideOnSinglePage = computed(
  () => props.pagination['hideOnSinglePage'] || false,
)
const pageSizes = computed(() => props.pagination['pageSizes'] || [])
const pageSize = computed(() => props.pagination['pageSize'])
const currentPage = computed(() => props.pagination['currentPage'])

watch([() => pageSize.value, () => currentPage.value], () => {
  page.currentPage = currentPage.value
  page.pageSize = pageSize.value
})
</script>
<style scoped lang="scss">
.table-pagination {
  width: 100%;
  padding: 24px 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
