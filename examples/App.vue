<template>
  <div class="td-container">
    <el-button type="primary" @click="addRow">新增一行</el-button>
    <tethys-table
      border
      stripe
      size="small"
      :data="data"
      :columns="columns"
      @removeEdit="removeEdit"
    ></tethys-table>
  </div>
</template>

<script lang="ts">
export default {
  name: 'App',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'

const columns = [
  {
    key: 'selection',
    width: 60,
  },
  {
    title: '序号',
    key: 'index',
    width: 80,
    align: 'center',
  },
  {
    title: '姓名',
    key: 'name',
    editable: true,
  },
  {
    title: '年龄',
    key: 'age',
  },
  {
    title: '性别',
    key: 'gender',
    render(h, { row }) {
      return row.gender === 0 ? '男' : '女'
    },
  },
  {
    title: '成绩',
    key: 'grade',
    editable: true,
  },
  {
    title: '描述',
    key: 'desc',
    tooltip: true,
  },
]
interface TableType {
  id: number
  name: string
  age: number
  gender: number
  grade: number
  desc: string
}
const data = ref<TableType[]>([
  {
    id: 1,
    name: '张三',
    age: 12,
    gender: 0,
    grade: 80,
    desc: '一个组件需要显式声明它所接受的 props，这样 Vue 才能知道外部传入的哪些是 props，哪些是透传 attribute (关于透传 attribute，我们会在专门的章节中讨论)。',
  },
  {
    id: 2,
    name: '李四',
    age: 15,
    gender: 1,
    grade: 75,
    desc: '',
  },
  {
    id: 3,
    name: '王五',
    age: 13,
    gender: 1,
    grade: 90,
    desc: '',
  },
  {
    id: 4,
    name: '赵六',
    age: 14,
    gender: 0,
    grade: 60,
    desc: '',
  },
  {
    id: 5,
    name: '孙七',
    age: 12,
    gender: 1,
    grade: 100,
    desc: '',
  },
])

const addRow = () => {
  const newRow = {} as TableType
  data.value.push(newRow)
}

const removeEdit = (value: string) => {
  console.log(11, value)
}
</script>
<style scoped>
.td-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
}
</style>
