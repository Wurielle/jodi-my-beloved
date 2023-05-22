import { defineStore } from "pinia";
import { ref } from "vue";

export const useSpeechStore = defineStore("speech", () => {
  const limit = ref(3);
  const messages = ref<string[]>([]);
  const addMessage = (message: string) => {
    messages.value.unshift(message);
    if (messages.value.length > limit.value) {
      messages.value.pop();
    }
    setTimeout(() => {
      const index = messages.value.indexOf(message);
      if (messages.value.indexOf(message) > -1) messages.value.splice(index, 1);
    }, 5000);
  };
  return {
    messages,
    addMessage,
    limit,
  };
});
