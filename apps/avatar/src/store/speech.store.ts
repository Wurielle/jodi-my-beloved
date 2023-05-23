import { defineStore } from "pinia";
import { ref } from "vue";

type Message = {
  message: string;
  id: string;
};
export const useSpeechStore = defineStore("speech", () => {
  const limit = ref(3);
  const messages = ref<Message[]>([]);
  const removeMessage = (id: string) => {
    const index = messages.value.findIndex((m) => m.id === id);
    if (index > -1) messages.value.splice(index, 1);
  };
  const addMessage = (message: Message) => {
    messages.value.unshift(message);
    if (messages.value.length > limit.value) {
      messages.value.pop();
    }
    setTimeout(removeMessage, 5000);
  };
  return {
    messages,
    addMessage,
    limit,
  };
});
