<template>
  <div class="about">
    <h1>This is an about page</h1>
    <b-row class="mt-5">
      <b-col
        md="8"
        offset-md="2"
        lg="6"
        offset-lg="3"
      >
        <b-card title="上传害虫数据">
          <b-form-group>
            <b-form-input
              v-model="name"
              placeholder="请输入害虫名"
            ></b-form-input>
          </b-form-group>
          <b-form-group>
            <b-button
              variant="success"
              @click="getLong"
              block
            >在当前位置上传害虫数据</b-button>
          </b-form-group>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return{
      name:"",
    }
  },
  methods:{
    getLong(){
      if (navigator.geolocation) {
            //开始请求地理位置信息。
            console.log(this)
            navigator.geolocation.getCurrentPosition(this.succFunction, this.errFunction);
        } else {
            x.innerHTML = "此浏览器不支持geolocation属性";
        }
    },
    succFunction(position){
      // 获取当前的经纬度
      var latitude = position.coords.latitude; //十进制纬度
      var longitude = position.coords.longitude; //十进制经度
      var accuracy = position.coords.accuracy; //位置精度，以米为单位
      console.log("用户的位置：" + longitude + "," + latitude);
      console.log("用户地理位置：" + accuracy);
      alert("当前位置的经度为：" + longitude + ",纬度为：" + latitude)

      // 向后端发送数据
      var params = new URLSearchParams();
      params.append('lng', longitude)
      params.append('lat',latitude)
      params.append('name',this.name)
      axios.post('http://81.69.185.195:8504/api/uploadlocation', params).then(function (response){
      }); 
    },
    errFunction(err) { //错误信息
        var err = err.code + ":" + err.message;
        alert(err);
    }
  }
}
</script>
<style lang="">
</style>