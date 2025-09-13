import { defineStore } from "pinia";
import { computed } from "vue";
import { useMaxOnlyValid } from "../composables/useMaxOnlyValid";

export type LabelObj = { text: string };

export const useLabelFieldStore = defineStore("label-field", () => {
  const valueValid = useMaxOnlyValid(50);

  const parsedLabels = computed<LabelObj[]>(() =>
    valueValid.value.value
      .split(";")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((text) => ({ text })),
  );

  function onBlurCommit(commit?: (labels: LabelObj[]) => void) {
    valueValid.onBlur();
    if (!valueValid.isValid.value) return;
    commit?.(parsedLabels.value);
  }

  return {
    value: valueValid.value,
    touched: valueValid.touched,
    error: valueValid.error,
    isValid: valueValid.isValid,
    MAX: valueValid.MAX,

    parsedLabels,
    onBlurCommit,
    reset: valueValid.reset,
  };
});
