import { ref, computed } from "vue";

export function useMaxOnlyValid(
  max: number,
  tooLongMsg = (m: number) => `Максимум ${m} символов`,
) {
  const value = ref("");
  const touched = ref(false);

  const isMaxLength = computed(() => value.value.length > max);

  const error = computed(() => {
    if (!touched.value) return "";
    return isMaxLength.value ? tooLongMsg(max) : "";
  });

  const isValid = computed(() => !isMaxLength.value);

  function onBlur() {
    touched.value = true;
  }
  function reset() {
    value.value = "";
    touched.value = false;
  }

  return { value, touched, error, isValid, onBlur, reset, MAX: max };
}
