import { ref, computed } from "vue";

type InputValid = {
  max: number;
  emptyMsg: string;
  maxLength?: (max: number) => string;
};

export function useRequiredMaxValid(valueInput: InputValid) {
  const value = ref("");
  const touched = ref(false);

  const isEmpty = computed(() => value.value.trim().length === 0);
  const isMaxLength = computed(() => value.value.length > valueInput.max);

  const error = computed(() => {
    if (!touched.value) return "";
    if (isEmpty.value) return valueInput.emptyMsg;
    if (isMaxLength.value)
      return (
        valueInput.maxLength?.(valueInput.max) ??
        `Максимум ${valueInput.max} символов`
      );
    return "";
  });

  const isValid = computed(() => !isEmpty.value && !isMaxLength.value);

  function onBlur() {
    touched.value = true;
  }
  function reset() {
    value.value = "";
    touched.value = false;
  }

  return { value, touched, error, isValid, onBlur, reset, MAX: valueInput.max };
}
