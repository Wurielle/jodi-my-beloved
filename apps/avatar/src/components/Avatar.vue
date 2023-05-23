<template>
  <div
    :style="{
      width: `${width}px`,
    }"
    class="fixed right-0 bottom-0"
  >
    <img ref="img" :src="currentImage" alt="my beloved jodi" />
  </div>
</template>
<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import adjustGlasses from "@/assets/adjust-glasses.png";
import nyan from "@/assets/nyan.png";
import pointAtScreen from "@/assets/point-at-screen.png";
import speaking from "@/assets/speaking.png";
import standard from "@/assets/standard.png";
import surprise from "@/assets/surprise.png";
import gsap from "gsap";
import { useRoute } from "vue-router";
import { socket } from "@/services/socket";
import { useSpeechStore } from "@/store/speech.store.ts";

const debug = false;
const route = useRoute();
const width = computed(() => route.query.w || 500);

const img = ref(null);
const currentImage = ref(standard);
const nextImage = ref("");
const images = [
  adjustGlasses,
  nyan,
  pointAtScreen,
  speaking,
  standard,
  surprise,
];
let interval = null;
let defaultAnimation = null;
let timeout = null;
const speechStore = useSpeechStore();
const random = () => {
  nextImage.value = images[Math.floor(Math.random() * images.length)];
  defaultAnimation?.restart();
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(() => {
    nextImage.value = standard;
    defaultAnimation?.restart();
  }, speechStore.expiration);
};

onMounted(() => {
  defaultAnimation = gsap
    .timeline({ paused: true })
    .set(img.value, { transformOrigin: "center bottom" })
    .to(img.value, { duration: 0.1, scaleY: 0.5, ease: "power4.out" })
    .to(img.value, {
      onStart() {
        currentImage.value = nextImage.value;
      },
      duration: 0.5,
      scaleY: 1,
      ease: "elastic.out",
    });
  images.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
  socket.on("message:start", () => {
    random();
  });
  if (debug) interval = setInterval(random, 1000);
});

onBeforeUnmount(() => {
  clearInterval(interval);
});
</script>
