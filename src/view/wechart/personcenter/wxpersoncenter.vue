<template>
  <div>
    <personhead/>
    <yktcard/>
    <tools/>
  </div>
</template>


<script>
import personhead from './components/personhead'
import yktcard from './components/yktcard'
import tools from './components/tools'

export default {
  components: {
      personhead,
      yktcard,
      tools
    }
}
</script>
<style scoped>
.toolstitle{
  display: inline-block;
  margin: 30px;

}
.tools{
  text-align: center;
}
</style>
