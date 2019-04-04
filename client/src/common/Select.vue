<template>
  <select
    v-bind:class="['selectControl', { selectControlError: error }]"
    v-model="selected"
    :options="options"
    @change="onChange($event.target.value)"
    required
  >
    <option value="" disabled selected hidden>{{ placeholder }}</option>
    <option v-for="option in options" :value="option.id" v-bind:key="option.id">
      {{ option.value }}
    </option>
  </select>
</template>

<style>
.selectControl {
  width: 100%;
  height: 40px;
  margin-bottom: 5px;
  border: none;
  font-size: 16px;
  color: var(--text-color);
  outline: none;
}

.selectControlError {
  border: 1px solid red;
}
</style>

<script>
export default {
  name: 'qSelect',
  props: ['value', 'error', 'options', 'placeholder'],
  data: function() {
    return {
      selected: this.value,
    };
  },
  methods: {
    onChange(value) {
      if (value === '') {
        value = null;
      }
      this.$emit('input', value);
    },
  },
};
</script>
