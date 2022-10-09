<script setup lang="ts">
import { ref } from "vue";

const currencies = ref<string[]>([
  "EUR",
  "PLN",
  "GEL",
  "DKK",
  "CZK",
  "GBP",
  "SEK",
  "USD",
  "RUB",
]);

const selectedCurrencies = ref<string[]>([]);

const isSelected = (value: string): boolean =>
  selectedCurrencies.value.includes(value);

const handleClick = (currency: string): void => {
  const alreadySelected = isSelected(currency);

  if (alreadySelected) {
    selectedCurrencies.value.splice(
      selectedCurrencies.value.indexOf(currency),
      1
    );
  } else {
    selectedCurrencies.value.push(currency);
  }
};
</script>

<template>
  <div class="container">
    <div class="container--selected">
      <div
        class="currency"
        v-for="currency in selectedCurrencies"
        :key="currency"
      >
        {{ currency }}
        <span class="currency-close" @click="handleClick(currency)">x</span>
      </div>
    </div>

    <div class="container--currencies">
      <label
        class="currency"
        :key="currency"
        v-for="currency in currencies"
        :class="{ selected: isSelected(currency) }"
      >
        <input
          type="checkbox"
          :value="currency"
          :checked="isSelected(currency)"
          @click="handleClick(currency)"
        />
        {{ currency }}
      </label>
    </div>
  </div>
</template>

<style>
:root {
  --white-color: #fff;
  --black-color: #000;
  --gray-color: #aeaeae;
  --shadow-color: rgba(0, 0, 0, 0.26);
  --currency-bg-color: #ececec;
  --selected-currency-bg-color: #e5e5e5;
  --currency-text-bg: #1f426e;
  --currency-hover-bg-color: #dcdcdc;
  --close-btn-bg-color: #333333;
  --checkbox-red-X-mark: #ea3423;
}
.container {
  text-align: center;
  margin: 0 auto;
  background: var(--white-color);
  border: 1px solid var(--gray-color);
  border-radius: 5px;
  box-shadow: 3px 3px 8px var(--shadow-color);
  width: 100%;
  max-width: 37.5rem;
  font-family: sans-serif;
  padding: 1.25rem 0.5rem;
  align-content: space-between;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
}

.currency {
  width: 30%;
  height: 35px;
  display: flex;
  padding: 5px 40px;
  font-size: 20px;
  color: var(--close-btn-bg-color);
}

.container--selected {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px 20px;
}

@media (min-width: 768px) {
  .container--selected {
    grid-template-columns: repeat(3, 1fr);
  }
}

.container--selected .currency {
  background: var(--selected-currency-bg-color);
  border-radius: 2px;
  position: relative;
  width: 100%;
  justify-content: center;
}

.container--selected .currency .currency-close {
  position: absolute;
  top: 0;
  right: 0;
  background: var(--close-btn-bg-color);
  color: var(--white-color);
  border-radius: 9999px;
  border: 2px solid var(--white-color);
  width: 1.5rem;
  font-size: 15px;
  height: 1.5rem;
  margin: -10px;
}

.container--selected .currency .currency-close:hover {
  background: var(--white-color);
  border: 2px solid var(--black-color);
  color: var(--black-color);
  cursor: pointer;
}

.container--currencies {
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem 0.5rem;
}

.container--currencies .currency {
  border: 1px solid var(--gray-color);
  flex-grow: 1;
  color: var(--currency-text-bg);
  background: var(--currency-bg-color);
  text-align: left;
  padding-left: 5px;
}

.container--currencies .selected {
  background: var(--white-color);
}

.container--currencies .currency:hover,
.container--currencies .currency input:hover,
.container--currencies .currency label:hover {
  background: var(--currency-hover-bg-color);
  cursor: pointer;
}

/* Checkbox styles */
input[type="checkbox"] {
  appearance: initial;
  width: 1.25rem;
  height: 1.25rem;
  position: relative;
  margin: 3px 0.5ex;
  margin: 1px 5px 0 0;
  border-radius: 5px;
  border: 1px solid var(--gray-color);
  flex-shrink: 0;
}

input[type="checkbox"]:focus {
  outline: 0;
}

input[type="checkbox"]:checked:after {
  content: "X";
  color: var(--checkbox-red-X-mark);
  font-size: 18px;
  font-weight: bold;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
