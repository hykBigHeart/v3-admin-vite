<template>
  <div>
    <input type="file" id="fileInput" accept=".pdf" @change="inputChange" />
    <iframe class="iframe" :src="preview" width="100%" height="100%" :key="customKey" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
const baseUrl = ref<string>("http://1.119.195.93:39000/playedu/pdf/rN12Kt7pVVqbgTm18Dte0qhJWgC7PjK7.pdf")
// const baseUrl = ref<string>('https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf');
const preview = ref<string>(`/static/web/viewer.html?file=${baseUrl.value}`)
const customKey = ref<number>(0)

const inputChange = (e: any) => {
  console.log(e)
  const file = e.target.files[0]

  const blob = new Blob([file], {
    type: "application/pdf"
  })

  // 获取文件的URL
  const fileURL = URL.createObjectURL(blob)
  console.log("fiole", fileURL)
  baseUrl.value = fileURL
  preview.value = `/static/web/viewer.html?file=${baseUrl.value}`
  // customKey.value = new Date().getTime()
}

onMounted(() => {
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible") {
      /* 
        question：当切换页签再回来的话 渲染的pdf经常会出现空白的问题
        solve：当再切回页签需要重新渲染pdf解决
       */
      console.log(1)

      customKey.value = new Date().getTime()
    }
  })
})
</script>

<style scoped></style>
