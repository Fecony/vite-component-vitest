import { DOMWrapper, mount } from "@vue/test-utils";
import CurrencySelector from "../components/CurrencySelector.vue";

const currencies: string[] = [
  "EUR",
  "PLN",
  "GEL",
  "DKK",
  "CZK",
  "GBP",
  "SEK",
  "USD",
  "RUB",
];

describe("CurrencySelector component", () => {
  it("mounts component", () => {
    expect(CurrencySelector).toBeTruthy();

    const wrapper = mount(CurrencySelector);

    expect(wrapper.text()).toContain("EUR");
  });

  it("displays all currencies", async () => {
    const wrapper = mount(CurrencySelector);

    currencies.forEach((currency) => {
      let selector = wrapper.find(`[data-test-currency='${currency}']`);

      expect(selector.exists()).toBeTruthy();
      expect(selector.text()).toContain(currency);
    });
  });

  it("initial selected currencies are empty", async () => {
    const wrapper = mount(CurrencySelector);

    expect(wrapper.find("[data-test-selected]").exists()).toBeTruthy();
    expect(wrapper.find("[data-test-selected]").isVisible()).toBeTruthy();
    expect(wrapper.find("[data-test-selected]").text()).toContain("");
  });

  // Cannot test due to https://github.com/vuejs/test-utils/issues/1058 issues
  //   it("selected currencies are displayed correctly", async () => {
  //     const wrapper = mount(CurrencySelector);

  //     await wrapper.vm.setData({ selectedCurrencies: ["EUR", "USD"] });

  //     expect(wrapper.find("[data-test-selected]").exists()).toBeTruthy();
  //     expect(wrapper.find("[data-test-selected]").isVisible()).toBeTruthy();
  //     expect(wrapper.find("[data-test-selected]").text()).toContain("EUR");
  //   });

  it("currency selection is handled correctly", async () => {
    const wrapper = mount(CurrencySelector);
    const EURcheckbox: DOMWrapper<HTMLInputElement> = wrapper.find(
      "[data-test-currency='EUR'] > input[type='checkbox']"
    );
    const USDcheckbox: DOMWrapper<HTMLInputElement> = wrapper.find(
      "[data-test-currency='USD'] > input[type='checkbox']"
    );

    await EURcheckbox.trigger("click");

    expect(EURcheckbox.element.checked).toBe(true);
    expect(USDcheckbox.element.checked).toBe(false);

    expect(wrapper.find("[data-test-currency='EUR']").classes("selected")).toBe(
      true
    );

    expect(wrapper.find("[data-test-currency='USD']").classes("currency")).toBe(
      true
    );

    expect(wrapper.find("[data-test-currency='USD']").classes("selected")).toBe(
      false
    );

    expect(wrapper.find("[data-test-selected]").exists()).toBeTruthy();
    expect(wrapper.find("[data-test-selected]").isVisible()).toBeTruthy();
    expect(wrapper.find("[data-test-selected]").text()).toContain("EUR");
  });

  it("currency is unselected correctly", async () => {
    const wrapper = mount(CurrencySelector);
    const EURcheckbox: DOMWrapper<HTMLInputElement> = wrapper.find(
      "[data-test-currency='EUR'] > input[type='checkbox']"
    );
    const USDcheckbox: DOMWrapper<HTMLInputElement> = wrapper.find(
      "[data-test-currency='USD'] > input[type='checkbox']"
    );

    await EURcheckbox.trigger("click");

    expect(EURcheckbox.element.checked).toBe(true);
    expect(USDcheckbox.element.checked).toBe(false);

    expect(wrapper.find("[data-test-currency='EUR']").classes("selected")).toBe(
      true
    );

    expect(wrapper.find("[data-test-currency='USD']").classes("currency")).toBe(
      true
    );

    expect(wrapper.find("[data-test-currency='USD']").classes("selected")).toBe(
      false
    );

    expect(wrapper.find("[data-test-selected]").exists()).toBeTruthy();
    expect(wrapper.find("[data-test-selected]").isVisible()).toBeTruthy();
    expect(wrapper.find("[data-test-selected]").text()).toContain("EUR");

    await EURcheckbox.trigger("click");

    expect(EURcheckbox.element.checked).toBe(false);
    expect(USDcheckbox.element.checked).toBe(false);

    expect(wrapper.find("[data-test-currency='EUR']").classes("selected")).toBe(
      false
    );

    expect(wrapper.find("[data-test-currency='USD']").classes("selected")).toBe(
      false
    );

    expect(wrapper.find("[data-test-selected]").text()).toBe("");
  });

  it("currency is unselected by clicking X is handled correctly", async () => {
    const wrapper = mount(CurrencySelector);
    const EURcheckbox: DOMWrapper<HTMLInputElement> = wrapper.find(
      "[data-test-currency='EUR'] > input[type='checkbox']"
    );

    await EURcheckbox.trigger("click");

    expect(EURcheckbox.element.checked).toBe(true);

    expect(wrapper.find("[data-test-currency='EUR']").classes("selected")).toBe(
      true
    );

    expect(wrapper.find("[data-test-selected]").text()).toContain("EUR");

    // Unselect by clicking X

    const selectedEURCurrency: DOMWrapper<HTMLDivElement> = wrapper.find(
      "[data-test-selected-currency='EUR']"
    );

    await selectedEURCurrency
      .find("[data-test-remove-selected-currency]")
      .trigger("click");

    expect(EURcheckbox.element.checked).toBe(false);

    expect(wrapper.find("[data-test-currency='EUR']").classes("selected")).toBe(
      false
    );

    expect(wrapper.find("[data-test-selected]").text()).toContain("");
  });

  it("multiple currency selection is handled correctly", async () => {
    const wrapper = mount(CurrencySelector);
    const EURcheckbox: DOMWrapper<HTMLInputElement> = wrapper.find(
      "[data-test-currency='EUR'] > input[type='checkbox']"
    );
    const USDcheckbox: DOMWrapper<HTMLInputElement> = wrapper.find(
      "[data-test-currency='USD'] > input[type='checkbox']"
    );
    const PLNcheckbox: DOMWrapper<HTMLInputElement> = wrapper.find(
      "[data-test-currency='PLN'] > input[type='checkbox']"
    );

    await EURcheckbox.trigger("click");
    await PLNcheckbox.trigger("click");

    expect(EURcheckbox.element.checked).toBe(true);
    expect(PLNcheckbox.element.checked).toBe(true);

    expect(USDcheckbox.element.checked).toBe(false);

    expect(wrapper.find("[data-test-currency='EUR']").classes("currency")).toBe(
      true
    );

    expect(wrapper.find("[data-test-currency='PLN']").classes("currency")).toBe(
      true
    );

    expect(wrapper.find("[data-test-currency='USD']").classes("selected")).toBe(
      false
    );

    expect(wrapper.find("[data-test-selected]").exists()).toBeTruthy();
    expect(wrapper.find("[data-test-selected]").isVisible()).toBeTruthy();
    expect(wrapper.find("[data-test-selected]").text()).toContain("EUR");
    expect(wrapper.find("[data-test-selected]").text()).toContain("PLN");
  });

  it("can select each currency", async () => {
    const wrapper = mount(CurrencySelector);

    currencies.forEach(async (currency) => {
      await wrapper
        .find(`[data-test-currency='${currency}'] > input[type='checkbox']`)
        .trigger("click");

      expect(
        wrapper.find(`[data-test-currency='${currency}']`).classes("selected")
      ).toBe(true);

      expect(
        wrapper.find<HTMLInputElement>(
          `[data-test-currency='${currency}'] > input[type='checkbox']`
        ).element.checked
      ).toBe(true);

      expect(wrapper.find("[data-test-selected]").text()).toContain(currency);
    });
  });
});
