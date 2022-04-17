<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center mt-5">
        <h1 class="text-primary ">Conv</h1>
        <p class="pb-2 my-0">convert your values</p>
      </div>
      <div class="col-12 justify-content-center d-flex">
        <div class="row mt-5">
          <div class="col-4">
            <select v-model="valFrom" class="form-select w-100" aria-label="Default select example">
              <option
                v-for="option in convert.values"
                :key="option.code + '_' + option.offset"
                :value="option.code"
              >
                {{ option.label }}
              </option>
            </select>
            <div id="valueHelp" class="form-text">Enter in</div>
          </div>
          <div class="col-4">
            <input v-model="val" type="email" class="form-control" id="value" aria-describedby="valueHelp">
            <div id="valueHelp" class="form-text">Enter value</div>
          </div>
          <div class="col-4">
            <select v-model="valTo" :disabled="!valFrom" class="form-select w-100" aria-label="Default select example">
              <option
                v-for="option in optionTo"
                :key="option.code + '_' + option.offset"
                :value="option.code"
              >
                {{ option.label }}
              </option>
            </select>
            <div id="valueHelp" class="form-text">Enter out</div>
          </div>
        </div>
      </div>
      <div v-if="result" class="col-12 text-center mt-4">
        <span class="h4">{{ result }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useConvert } from '../plugins/Convert'
import { computed } from '@vue/runtime-core'

export default {
  name: 'Main',
  setup () {
    const convert = useConvert()

    const valFrom = ref('')
    const valTo = ref('')
    const val = ref(1)

    const optionTo = computed(() => {
      if (!valFrom) return []

      const candidateItem = convert.values.find(item => item.code === valFrom.value)

      if (!candidateItem) return []

      return convert.values.filter(item => item.category === candidateItem.category)
    })

    const result = computed(() => {
      const sum = convert.format(valFrom.value, valTo.value, val.value)
      if (!sum) return false
      const resData = convert.values.find(item => item.code === valTo.value)
      return sum + ' ' + resData.label
    })

    return {
      convert,
      valFrom,
      optionTo,
      valTo,
      val,
      result
    }
  }
}
</script>
