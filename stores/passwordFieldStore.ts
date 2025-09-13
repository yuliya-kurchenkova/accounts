import { defineStore } from "pinia";

export const usePasswordFieldStore = defineStore("password-field", () => {
  const valueValid = useRequiredMaxValid({
    max: 100,
    emptyMsg: "Пароль обязателен к заполнению",
  });

  const disabledByType = ref(false);

  const persistedValue = computed<string | null>(() =>
    disabledByType.value ? null : valueValid.value.value,
  );

  const isValid = computed(
    () => disabledByType.value || valueValid.isValid.value,
  );
  const error = computed(() =>
    disabledByType.value ? "" : valueValid.error.value,
  );

  function disableAndNull() {
    disabledByType.value = true;
    valueValid.touched.value = false;
  }
  function enableString() {
    disabledByType.value = false;
    if (valueValid.value.value == null) valueValid.value.value = "";
  }

  return {
    value: valueValid.value,
    touched: valueValid.touched,
    onBlur: valueValid.onBlur,
    reset: valueValid.reset,
    MAX: valueValid.MAX,
    disabledByType,
    persistedValue,
    isValid,
    error,
    disableAndNull,
    enableString,
  };
});
