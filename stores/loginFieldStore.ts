import { defineStore } from "pinia";


export const useLoginFieldStore = defineStore("login-field", () => {
  return useRequiredMaxValid({
    max: 100,
    emptyMsg: "Логин обязателен к заполнению",
  });
});
