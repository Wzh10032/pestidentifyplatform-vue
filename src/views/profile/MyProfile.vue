<template>
  <div>
    <h3>你好 <span v-if="userInfo">{{userInfo.name}}</span></h3>
    <b-card
      border-variant="info"
      header="地图页详情"
      align="center"
    >
      <iframe
        id="inlineFrameExample"
        title="Inline Frame Example"
        height="600px"
        src="https://maplab.amap.com/share/mapv/8d5a13d5febf464127aa9b78b12d5ab8"
      >
      </iframe>
      <div>
        <a
          href="https://maplab.amap.com/share/mapv/8d5a13d5febf464127aa9b78b12d5ab8"
          target='_blank'
        >点击以大图显示</a>
      </div>

      <div>
        <b-link @click="$router.replace({name: 'pesttable'})">点击以图表形式展示</b-link>
      </div>
    </b-card>
  </div>

</template>
<script>

import { mapState } from 'vuex';

export default {
  computed: mapState({
    userInfo: (state) => state.userModule.userInfo,
  }),
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
