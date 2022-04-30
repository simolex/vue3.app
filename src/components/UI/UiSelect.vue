<template>
  <select v-model="modelValue" @change="changeOption">
     <option value="" disabled>Выберити из списка</option>
     <option v-for="option in options" :key="option.value" :value="option.value">
        {{option.name}}
     </option>
  </select>
</template>

<script>
export default {
   name:'ui-select',
   props:{
      modelValue:{
         type:String
      },
      options:{
         type: Array,
         default: ()=>[]
      }
   },
   methods:{
      changeOption(e){
         this.$emit("update:modelValue",e.target.value)
      }
   }
}
</script>

<style lang="sass" scoped>

</style>