<template>
  <div>
    <span>123</span>
    <button @click="backMap">返回</button>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  export default {

    data() {
      return {
        img: require('@/assets/images/menu/test.png'),
      };
    },
    created() {

    },
    computed: {
    },
    methods: {
      ...mapMutations('statisModels', [
        'backMap'
      ])
    }
  };
</script>