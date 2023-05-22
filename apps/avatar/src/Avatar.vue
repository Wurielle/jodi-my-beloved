<template>
  <div>
    <img ref="img" :src="currentImage" alt="my beloved jodi" />
  </div>
</template>
<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import adjustGlasses from "@/assets/adjust-glasses.png";
import nyan from "@/assets/nyan.png";
import pointAtScreen from "@/assets/point-at-screen.png";
import speaking from "@/assets/speaking.png";
import standard from "@/assets/standard.png";
import surprise from "@/assets/surprise.png";
import gsap from "gsap";

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
onMounted(() => {
  const defaultAnimation = gsap
    .timeline({ repeat: 0 })
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

  interval = setInterval(() => {
    nextImage.value = images[Math.floor(Math.random() * images.length)];
    defaultAnimation.restart();
  }, 1000);
});
onBeforeUnmount(() => {
  clearInterval(interval);
});
</script>
