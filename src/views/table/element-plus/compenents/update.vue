<script lang="ts" setup>
import { reactive, ref, watch } from "vue"

interface rowValues {
  username: string
}

const props = defineProps<{
  dialogVisible?: boolean
  rowData: rowValues
}>()

const localDialogVisible = ref(props.dialogVisible)

watch(
  () => props.dialogVisible,
  (newVal) => {
    localDialogVisible.value = newVal
  }
)

const emit = defineEmits(["update:dialogVisible"])

const updateDialogVisible = (value: boolean) => {
  emit("update:dialogVisible", value)
}

console.log(props)
</script>

<template>
  <el-dialog
    v-model="localDialogVisible"
    title="修改用户"
    width="30%"
    draggable
    @update:modelValue="updateDialogVisible"
  >
    <!-- {{ props.rowData }} -->
    {{ props.rowData.username }}
  </el-dialog>
</template>

<style lang="scss" scoped></style>
