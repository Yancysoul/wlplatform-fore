<template>
  <el-row>
    <el-col :span="24">
      <div>
        <el-autocomplete
        class="inline-input"
        v-model="state1"
        :fetch-suggestions="querySearch"
        placeholder="搜索科室、医生、疾病"
        @select="handleSelect"
        size="medium"
        >
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-autocomplete>
      </div>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data() {
      return {
        restaurants: [],
        state1: '',
        state2: ''
      };
    },
    methods: {
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return [
          { "value": "新生儿科", "address": "长宁区新渔路144号" },
          { "value": "小儿科", "address": "上海市长宁区淞虹路661号" },
          { "value": "妇科门诊", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
          { "value": "儿科门诊", "address": "天山西路438号" },
          { "value": "骨伤科", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
          { "value": "中医科","adress": "上海市长宁区金钟路633号" },
          { "value": "内科", "address": "上海市嘉定区曹安公路曹安路1685号" }
        ];
      },
      handleSelect(item) {
        console.log(item);
      }
    },
    mounted() {
      this.restaurants = this.loadAll();
    }
}
</script>
<style scoped>
.el-autocomplete{
  width: 100%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
