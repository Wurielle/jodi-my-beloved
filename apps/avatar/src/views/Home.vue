<template>
  <Avatar
    :style="{
      width: `${width}px`,
    }"
    class="fixed right-0 bottom-0"
  />
  <div class="opacity-0">
    <Speech
      v-for="({ message, id }, i) in speechStore.messages"
      :key="id"
      :data-ghost-speech-id="id"
      :data-ghost-speech-index="i"
      :message="message"
      class="fixed"
    />
  </div>
  <TransitionGroup
    :css="false"
    tag="div"
    @beforeEnter="
      (el) => {
        gsap.set(el, {
          transformOrigin: 'right bottom',
          rotate: -15,
          y: 30,
          x: 50,
          opacity: 0,
        });
      }
    "
    @enter="
      (el, done) => {
        gsap
          .timeline({ repeat: 0 })
          .to(el, { duration: 0.1, scaleY: 0.5, ease: 'power4.out' }, 'start')
          .to(el, {
            duration: 0.5,
            scaleY: 1,
            ease: 'elastic.out',
          })
          .to(
            el,
            {
              duration: 0.7,
              rotate: 0,
              ease: 'elastic.out',
              opacity: 1,
              y: 0,
              x: 0,
              onComplete: done,
            },
            'start'
          );
      }
    "
    @leave="
      (el, done) => {
        const height = getTotalHeight(Number(el.dataset.speechIndex));
        gsap.timeline({ repeat: 0 }).to(el, {
          duration: 0.3,
          y: -50 - height,
          ease: 'power4.out',
          opacity: 0,
          onComplete: done,
        });
      }
    "
  >
    <Speech
      v-for="({ message, id }, i) in speechStore.messages"
      :key="id"
      :data-speech-id="id"
      :data-speech-index="i"
      :message="message"
      :style="{
        right: `${width / 1.4}px`,
        bottom: `${width / 1.8}px`,
        zIndex: `${speechStore.messages.length - i}`,
      }"
      class="fixed"
    />
  </TransitionGroup>
</template>
<script lang="ts" setup>
import Avatar from "@/components/Avatar.vue";
import Speech from "@/components/Speech.vue";
import { useRoute } from "vue-router";
import { computed, nextTick, onMounted, watch } from "vue";
import { useSpeechStore } from "../store/speech.store.ts";
import gsap from "gsap";
import { v4 as uuid } from "uuid";

const route = useRoute();
const width = computed(() => route.query.w || 500);
const speechStore = useSpeechStore();
let interval = null;
onMounted(() => {
  var randomSentences = [
    "The quick brown fox jumps over the lazy dog.",
    "She sells seashells by the seashore.",
    "I enjoy playing tennis on weekends.",
    "The sun sets in the west.",
    "Coding is fun and challenging.",
    "I love eating pizza with extra cheese.",
    "Life is full of surprises.",
    "The moonlight shone through the trees.",
    "Music is a universal language.",
    "I prefer tea over coffee in the morning.",
  ];
  interval = setInterval(() => {
    speechStore.addMessage({
      message:
        randomSentences[Math.floor(Math.random() * randomSentences.length)],
      id: uuid(),
    });
  }, 1000);
});

watch(
  () => speechStore.messages,
  (messages) => {
    nextTick(() => {
      messages.forEach((message, i) => {
        const el = document.querySelector(`[data-speech-index="${i}"]`);
        const ghostEl = document.querySelector(
          `[data-ghost-speech-index="${i}"]`
        );
        if (!el || !ghostEl) return;
        const index = Number(ghostEl.dataset.ghostSpeechIndex);
        if (el && ghostEl) {
          gsap.to(el, {
            y: -getTotalHeight(index),
          });
        }
      });
    });
  },
  { deep: true }
);

function getTotalHeight(index) {
  const elements = document.querySelectorAll("[data-ghost-speech-index]");
  const filteredElements = Array.from(elements).filter(
    (el) => Number(el.dataset.ghostSpeechIndex) < index
  );
  let totalHeight = 0;

  filteredElements.forEach((el) => {
    totalHeight += el.offsetHeight + 12;
  });

  return totalHeight;
}
</script>
