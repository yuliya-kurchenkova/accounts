import { defineStore } from "pinia";
import { ref, computed } from "vue";

const MAX = 100;

export const useLoginFieldStore = defineStore("login-field", () => {
  const value = ref("");
  const touched = ref(false);

  const validation = computed(() => {
    const v = value.value.trim();
    return {
      isEmpty: v.length === 0,
      isTooLong: v.length > MAX,
    };
  });

  const error = computed(() => {
    if (validation.value.isEmpty) return "Логин обязателен...";
    if (validation.value.isTooLong) return `Максимум ${MAX} символов`;
    return "";
  });

  const isValid = computed(
    () => !validation.value.isEmpty && !validation.value.isTooLong,
  );

  function onBlur() {
    touched.value = true;
    if (!isValid.value) return;
  }

  function reset() {
    value.value = "";
    touched.value = false;
  }

  return { value, isValid, touched, error, reset, onBlur };
});
