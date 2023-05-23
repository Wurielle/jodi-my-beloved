<template>
  <div
    ref="speech"
    class="text-sm inline-flex border-[3px] border-black max-w-[300px] py-[8px] px-[16px] rounded-full !rounded-br-md bg-white"
  >
    {{ props.message }}
  </div>
</template>
<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

const props = defineProps<{
  message: string;
}>();
const speech = ref(null);
let interval = null;
let defaultAnimation = null;

const onMessageStart = () => {
  defaultAnimation?.restart();
};

onMounted(() => {
  // defaultAnimation = gsap
  //     .timeline({ repeat: 0 })
  //     .set(speech.value, {
  //         transformOrigin: "right bottom",
  //         rotate: -15,
  //         y: 30,
  //         x: 50,
  //         opacity: 0,
  //     }, 'start')
  //     .to(speech.value, { duration: 0.1, scaleY: 0.5, ease: "power4.out" })
  //     .to(speech.value, {
  //         duration: 0.5,
  //         scaleY: 1,
  //         ease: "elastic.out",
  //     })
  //     .to(speech.value, {
  //         duration: 0.7,
  //         rotate: 0,
  //         ease: "elastic.out",
  //         opacity: 1,
  //         y: 0,
  //         x: 0,
  //     }, 'start')
  // interval = setInterval(onMessageStart, 1000);
});

onBeforeUnmount(() => {
  clearInterval(interval);
});
</script>
