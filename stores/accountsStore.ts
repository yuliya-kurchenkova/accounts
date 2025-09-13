import { defineStore } from "pinia";
import { ref, computed } from "vue";

export type AccountType = "LDAP" | "Локальная";
export type LabelObj = { text: string };

type Touched = {
  labels: boolean;
  type: boolean;
  login: boolean;
  password: boolean;
};
type Errors = {
  labels?: string;
  type?: string;
  login?: string;
  password?: string;
};

export type Account = {
  id: string;
  labelsRaw: string;
  type: AccountType | "";
  login: string;
  password: string | undefined;
  labels: LabelObj[];
  touched: Touched;
};

const MAX_LABEL = 50;
const MAX_LOGIN = 100;
const MAX_PASSWORD = 100;

function parseLabels(raw: string): LabelObj[] {
  return raw
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((text) => ({ text }));
}

function uid() {
  return (globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2, 10));
}

export const useAccountsStore = defineStore(
  "accounts",
  () => {
    const accounts = ref<Account[]>([]);
    function addEmpty() {
      accounts.value.push({
        id: uid(),
        labelsRaw: "",
        type: "Локальная",
        login: "",
        password: undefined,
        labels: [],
        touched: { labels: false, type: false, login: false, password: false },
      });
    }

    function removeAccount(id: string) {
      accounts.value = accounts.value.filter((a) => a.id !== id);
    }

    function setField<T extends keyof Account>(
      id: string,
      field: T,
      val: Account[T],
    ) {
      const a = accounts.value.find((x) => x.id === id);
      if (!a) return;

      if (field === "type") {
        a.type = val as AccountType;
        if (a.type === "LDAP") {
          a.password = undefined;
          a.touched.password = false;
        } else if (a.password === undefined) a.password = "";
        a.touched.type = true;
        return;
      }

      a[field] = val as Account[T];
      if (a.type === "LDAP") a.password = undefined;
    }

    function validate(a: Account): Errors {
      const e: Errors = {};
      if (a.labelsRaw.length > MAX_LABEL)
        e.labels = `Максимум ${MAX_LABEL} символов`;
      if (a.type !== "LDAP" && a.type !== "Локальная")
        e.type = "Выберите тип записи";
      if (a.login.trim().length === 0)
        e.login = "Логин обязателен к заполнению";
      else if (a.login.length > MAX_LOGIN)
        e.login = `Максимум ${MAX_LOGIN} символов`;

      if (a.type === "Локальная") {
        const pwd = a.password ?? "";
        if (pwd.trim().length === 0)
          e.password = "Пароль обязателен к заполнению";
        else if (pwd.length > MAX_PASSWORD)
          e.password = `Максимум ${MAX_PASSWORD} символов`;
      }
      return e;
    }

    const errorsById = computed(() => {
      const map = new Map<string, Errors>();
      for (const a of accounts.value) map.set(a.id, validate(a));
      return map;
    });

    function commit(id: string, field: keyof Touched) {
      const a = accounts.value.find((x) => x.id === id);
      if (!a) return false;

      a.touched[field] = true;
      const errs = validate(a);

      const hasError =
        (field === "labels" && !!errs.labels) ||
        (field === "type" && !!errs.type) ||
        (field === "login" && !!errs.login) ||
        (field === "password" && !!errs.password);

      if (!hasError) {
        if (a.type === "LDAP") a.password = undefined;
        a.labels = parseLabels(a.labelsRaw);
        return true;
      }
      return false;
    }

    return { accounts, addEmpty, removeAccount, setField, commit, errorsById };
  },
  {
    persist: { key: "accounts-list" },
  },
);
