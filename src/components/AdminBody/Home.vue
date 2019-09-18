<template>
  <section>
    <el-form ref="form" :model="hospital" label-width="80px" v-show="show">
      <el-form-item label="医院ID">
        <el-input v-model="hospital.id" :readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="医院名称">
        <el-input v-model="hospital.name" :readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="医院地址">
        <el-input v-model="hospital.address" :readonly="readonly"></el-input>
      </el-form-item>
      <!-- <el-form-item label="医院简介">
        <el-input v-model="hospital.brief"></el-input>
      </el-form-item> -->
      <el-form-item label="医院logo">
        <el-image
          style="width: 100px; height: 100px;"
          :src="hospital.logo"
          fit="contain">
        </el-image>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-image
          v-for="image in hospital.imageList"
          :key="image.id"
          style="width: 100px; margin-right: 10px"
          :src="image.image"
          fit="contain">
        </el-image>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
export default {
  data () {
    return {
      hospital: {},
      show: false,
      readonly: true
    }
  },
  created () {
    this.axios.post("/hospitalService/findDetailById", {}).then(res => {
      if (res && res.data.data.code === 200) {
        this.hospital = res.data.data.data;
        this.show = true;
      }
    })
  }
}
</script>

<style scoped>

</style>
