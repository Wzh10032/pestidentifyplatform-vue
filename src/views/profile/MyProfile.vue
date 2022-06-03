<template>
  <div>
    <h3>你好 <span v-if="userInfo">{{userInfo.name}}</span></h3>
    <b-card
      border-variant="info"
      header="地图页详情"
      align="center"
    >
      <iframe
        v-show="show1"
        id="inlineFrameExample"
        title="Inline Frame Example"
        height="600px"
        src="https://maplab.amap.com/share/mapv/8d5a13d5febf464127aa9b78b12d5ab8"
      >
      </iframe>
      <iframe
        v-show="show2"
        id="inlineFrameExample"
        title="Inline Frame Example"
        height="600px"
        src="https://maplab.amap.com/share/mapv/731ad04c546c1c42ea3ebeebad21059e"
      >
      </iframe>
      <div style="float:left">
        <div v-show="show1">
          <a
            href="https://maplab.amap.com/share/mapv/8d5a13d5febf464127aa9b78b12d5ab8"
            target='_blank'
          >点击以大图显示</a>
        </div>
        <div v-show="show2">
          <a
            href="https://maplab.amap.com/share/mapv/731ad04c546c1c42ea3ebeebad21059e"
            target='_blank'
          >点击以大图显示</a>
        </div>
        <div>
          <b-link @click="$router.replace({name: 'pesttable'})">点击以图表形式展示</b-link>
        </div>
      </div>
      <b-button
        class="mt-3"
        variant="success"
        style="float:right"
        @click="change()"
      >切换为{{name}}</b-button>
    </b-card>
  </div>

</template>
<script>

import { mapState } from 'vuex';

export default {
  data() {
    return{
      show1:true,
      show2:false,
      name:"热力图"
    }
  },
  computed: mapState({
    userInfo: (state) => state.userModule.userInfo,
  }),
  methods: {
    change(){
      this.show1=!this.show1
      this.show2=!this.show2
      if(this.show1==true){
        this.name="热力图"
      }
      else{
        this.name="散点图"
      }
    },
  }
};
</script>
<style lang="scss" scoped>
iframe {
  margin-top: 20px;
  border: 1px solid black;
  width: 100%;
}

.output {
  background: #eee;
}
</style>
