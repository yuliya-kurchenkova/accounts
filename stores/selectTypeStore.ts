import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { usePasswordFieldStore } from "@/stores/passwordFieldStore";

export type AccountType = "LDAP" | "Локальная";
const TYPES: AccountType[] = ["LDAP", "Локальная"];

export const useSelectTypeStore = defineStore("select-type", () => {
  const value = ref<AccountType | "">("");
  const touched = ref(false);

  const isValid = computed(() => value.value === "LDAP" || value.value === "Локальная");
  const error = computed(() => (touched.value && !isValid.value ? "Выберите тип записи" : ""));

  const showPassword = computed(() => value.value === "Локальная");

  function onChange(next: string) {
    touched.value = true;
    if (next !== "LDAP" && next !== "Локальная") return;

    value.value = next as AccountType;

    const passwordStore = usePasswordFieldStore();
    if (value.value === "LDAP") {
      passwordStore.disableAndNull();
    } else {
      passwordStore.enableString();
    }
  }

  function reset() {
    value.value = "";
    touched.value = false;
  }

  return { value, touched, isValid, error, showPassword, onChange, reset, TYPES };
});