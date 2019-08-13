<template>
  <section>
    <el-form ref="form" :model="hospitalInfo" label-width="80px">
      <el-form-item label="医院ID">
        <el-input v-model="hospitalInfo.id"></el-input>
      </el-form-item>
      <el-form-item label="医院名称">
        <el-input v-model="hospitalInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="医院地址">
        <el-input v-model="hospitalInfo.address"></el-input>
      </el-form-item>
      <el-form-item label="医院简介">
        <el-input v-model="hospitalInfo.brief"></el-input>
      </el-form-item>
      <el-form-item label="医院logo">
        <el-image
          style="width: 100px; height: 100px;"
          :src="hospitalInfo.logo"
          fit="contain">
        </el-image>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-image
          v-for="(index, image) in hospitalInfo.imageList"
          :key="index"
          style="width: 100px; margin-right: 10px"
          :src="hospitalInfo.imageList[image]"
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
      hospitalInfo: {
        id: '',
        name: '',
        address: '',
        brief: '',
        logo: '',
        imageList: []
      }
    }
  },
  created () {
    this.axios.post("/hospitalService/queryDetailById", {
      headers: {
        'Content-type': 'application/json'
      }
    }).then((res) => {
      this.hospitalInfo = res.data.data.data;
    })
  }
}
</script>

<style lang="scss">
.image {
  width: 100px;
  height: 100px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
