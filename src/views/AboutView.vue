<template>
  <div class="about">
    <b-row class="mt-5">
      <b-col
        md="8"
        offset-md="2"
        lg="10"
        offset-lg="1"
      >
        <div>
          <b-carousel
            id="carousel-1"
            v-model="slide"
            :interval="4000"
            controls
            fade=true
            indicators
            background="#ababab"
            img-width="1024"
            img-height="480"
            style="text-shadow: 1px 1px 2px #333;"
            @sliding-start="onSlideStart"
            @sliding-end="onSlideEnd"
          >
            <!-- Text slides with image -->
            <b-carousel-slide img-src="https://pic.rmb.bdstatic.com/bjh/25dd4c586a7e4d5e3bcb97a75ba195d1.png"></b-carousel-slide>
            <b-carousel-slide img-src="https://pic.rmb.bdstatic.com/bjh/4eb96c198950cfe39a5113b79d013fc4.png"></b-carousel-slide>
            <!-- Slides with custom text -->
            <b-carousel-slide img-src="https://pic.rmb.bdstatic.com/bjh/f328abee907aad1819a2a519332b4b52.jpeg">
              <h1>Hello world!</h1>
            </b-carousel-slide>

            <!-- Slides with image only -->
            <b-carousel-slide img-src="https://pic.rmb.bdstatic.com/bjh/603ee237b7075f5d5fcc7e40cad3c6f9.jpeg"></b-carousel-slide>

            <!-- Slides with img slot -->
            <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
            <b-carousel-slide>
              <template #img>
                <img
                  class="d-block img-fluid w-100"
                  width="1024"
                  height="480"
                  src="https://pic.rmb.bdstatic.com/bjh/3e3f50ccf9b3b470270c0c0f7d22d2f6.jpeg"
                  alt="image slot"
                >
              </template>
            </b-carousel-slide>
            <!-- Slide with blank fluid image to maintain slide aspect ratio -->
          </b-carousel>
        </div>
        <b-card title="上传害虫数据">
          <b-form-group>
            <b-form-input
              v-model="name"
              placeholder="请输入害虫名"
            ></b-form-input>
            <br>
            <b-form-input
              v-model="count"
              placeholder="请输入害虫个数"
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
      slide: 0,
      count:"",
      sliding: null,
    }
  },
  methods:{
    getLong(){
      if (navigator.geolocation) {
            //开始请求地理位置信息。
            // console.log(this)
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
      // console.log("用户的位置：" + longitude + "," + latitude);
      // console.log("用户地理位置：" + accuracy);
      alert("当前位置的经度为：" + longitude + ",纬度为：" + latitude)

      // 向后端发送数据
      var params = new URLSearchParams();
      params.append('lng', longitude)
      params.append('lat',latitude)
      params.append('name',this.name)
      params.append('count',this.count)
      axios.post('http://81.69.185.195:8504/api/uploadlocation', params).then(function (response){
      }); 
    },
    errFunction(err) { //错误信息
        var err = err.code + ":" + err.message;
        alert(err);
    },
    onSlideStart(slide) {
        this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    }
  }
}
</script>
<style lang="">
</style>