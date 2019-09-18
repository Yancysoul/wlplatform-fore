<template>
  <section>
    <el-row class="hospital_row">
      <el-col :md="24" :lg="12">
        <el-form ref="form" :model="hospital" label-width="90px" v-loading="show" >
          <el-form-item label="医院ID：">
            <el-input v-model="hospital.id" :readonly="readonly"></el-input>
          </el-form-item>
          <el-form-item label="医院名称：">
            <el-input v-model="hospital.name" :readonly="readonly"></el-input>
          </el-form-item>
          <el-form-item label="医院地址：">
            <el-input v-model="hospital.address" :readonly="readonly"></el-input>
          </el-form-item>
          <el-form-item label="医院简介：">
            <el-input v-model="hospital.brief" :readonly="readonly"></el-input>
          </el-form-item>
          <el-form-item label="医院logo：">
            <el-image
              style="width: 100px; height: 100px;"
              :src="hospital.logo"
              fit="contain">
            </el-image>
          </el-form-item>
          <el-form-item label="图片列表：">
            <el-image
              v-for="image in hospital.imageList"
              :key="image.id"
              style="width: 100px; margin-right: 10px"
              :src="image.image"
              fit="contain">
            </el-image>
          </el-form-item>
          <el-form-item style="text-align: right">
            <el-button type="primary" @click="changeHospital">{{changeText}}</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    
  </section>
</template>

<script>
export default {
  data () {
    return {
      hospital: {},
      show: false,
      readonly: false,
      changeText: "保存医院信息"
    }
  },
  created () {
    this.getHospital();
  },
  methods: {
    // 获取医院信息
    getHospital () {
      this.show = true;
      this.axios.post("/hospitalService/findDetailById", {}).then(res => {
        if (res && res.data.data.code === 200) {
          // console.log(res.data.data.data)
          this.hospital = res.data.data.data;
          this.show = false;
        }
      })
    },
    changeHospital () {
      console.log(this.hospital)
      this.axios.post("/hospitalService/saveHospital", this.hospital, {}).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style scoped lang="scss">
.hospital_row {
  display: flex;
  width: 100%;
  justify-content: center;
}
</style>
