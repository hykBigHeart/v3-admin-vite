<template>
  <div>
    <div>medDRA</div>
    <el-tree
      ref="treeRef"
      class="tree-line"
      style="max-width: 600px"
      :data="data"
      node-key="id"
      :props="defaultProps"
      icon="Minus"
      show-checkbox
      check-on-click-node
      :render-content="renderContent"
      :default-expanded-keys="defaultExpanded"
      @node-expand="nodeExpand"
      @check-change="checkChange"
    />

    <div v-for="(item, index) in inputValues" :key="index">
      <el-input v-model="item.value" style="width: 240px" placeholder="Please input" />
      <el-button @click="addInput(index)">add</el-button>
      <el-button type="danger" @click="delInput(index)">del</el-button>
      <!-- <el-input :model-value="item.value" style="width: 240px" placeholder="Please input" /> -->
    </div>
    <div>
      {{ inputValues.map((item) => item.value).join() }}
    </div>
  </div>
</template>

<script setup lang="tsx">
import { ref } from "vue"
import { ElTree } from "element-plus"

// 定义类型
interface InputValue {
  value: string
}

const treeRef = ref<InstanceType<typeof ElTree>>()
const defaultExpanded = ref<number[]>([])
const inputValues = ref<InputValue[]>([{ value: "张三" }, { value: "李四" }, { value: "王武" }])

const addInput = (i: number) => {
  inputValues.value.splice(i + 1, 0, { value: "" })
}

const delInput = (i: number) => {
  inputValues.value.splice(i, 1)
}

const defaultProps = {
  children: "children",
  label: "label",
  disabled: "disabled"
}

const data = [
  {
    id: 1,
    label: "Level one 1",
    title: "LLT",
    titleColor: "red",
    llt_name_en: "Contact dermatitis",
    llt_currency: "Y",
    children: [
      {
        id: 3,
        label: "Level two 2-1",
        titleColor: "blue",
        title: "PT",
        children: [
          {
            id: 4,
            label: "Level three 3-1-1",
            title: "HET",
            titleColor: "green"
          }
        ]
      }
    ]
  },
  {
    id: 11,
    label: "Level one 1",
    title: "LLT",
    titleColor: "red",
    llt_name_en: "Contact dermatitis",
    llt_currency: "Y",
    children: [
      {
        id: 33,
        label: "Level two 2-1",
        titleColor: "blue",
        title: "PT",
        children: [
          {
            id: 44,
            label: "Level three 3-1-1",
            title: "HET",
            titleColor: "green"
          }
        ]
      }
    ]
  }
]

//  节点展示时触发
const nodeExpand = (data: any) => {
  defaultExpanded.value = []
  expandAllNodes(data)
}

// 递归遍历所有子级的id
const expandAllNodes = (data: any) => {
  defaultExpanded.value.push(data.id)
  if (data.children && data.children.length) {
    data.children.forEach((item: any) => {
      expandAllNodes(item)
    })
  }
}

// 实现单选效果
const checkChange = (data: any, checked: boolean) => {
  if (checked) {
    treeRef.value!.setCheckedKeys([data.id], false)
  }
}

const renderContent = (h: any, { node, data, store }: any) => {
  return (
    <div>
      <span style={`color: ${data.titleColor}`}>{data.title}</span> {data.label}
    </div>
  )
}
</script>

<style lang="scss">
.tree-line {
  .el-tree-node {
    position: relative;
    /* 缩进量 */
    padding-left: 16px;
  }
  .el-tree-node__children {
    /* 缩进量 */
    padding-left: 16px;
  }

  /* 竖线 */
  .el-tree-node::before {
    content: "";
    height: 100%;
    width: 1px;
    position: absolute;
    left: -3px;
    top: -26px;
    border-width: 1px;
    border-left: 1px dashed #eee;
  }
  /* 当前层最后一个节点的竖线高度固定 */
  .el-tree-node:last-child::before {
    height: 38px; /* 可以自己调节到合适数值 */
  }

  /* 横线 */
  .el-tree-node::after {
    content: "";
    width: 24px;
    height: 20px;
    position: absolute;
    // left: -3px;
    left: -7px;
    top: 12px;
    border-width: 1px;
    border-top: 1px dashed #eee;
  }

  /* 去掉最顶层的虚线，放最下面样式才不会被上面的覆盖了 */
  & > .el-tree-node::after {
    border-top: none;
  }
  & > .el-tree-node::before {
    border-left: none;
  }

  /* 展开关闭的icon */
  .el-tree-node__expand-icon {
    font-size: 16px;
    /* 叶子节点（无子节点） */
    &.is-leaf {
      color: transparent;
      /* display: none; */ /* 也可以去掉 */
    }
    svg {
      border: 1px solid #ccc;
    }
  }
}
</style>
