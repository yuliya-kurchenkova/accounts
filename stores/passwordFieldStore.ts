import { defineStore } from "pinia";

export const usePasswordFieldStore = defineStore("password-field", () => {
  return useRequiredMaxValid({
    max: 100,
    emptyMsg: "Пароль обязателен к заполнению",
  });
});
