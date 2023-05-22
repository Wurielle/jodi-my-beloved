<template>
  <Avatar
    :style="{
      width: `${route.query.w || 500}px`,
    }"
    class="fixed right-0 bottom-0"
  />
</template>
<script lang="ts" setup>
import Avatar from "../Avatar.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>
