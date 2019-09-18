<template>
  <div>
    <keep-alive>
      <router-view :key="$route.path"></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
