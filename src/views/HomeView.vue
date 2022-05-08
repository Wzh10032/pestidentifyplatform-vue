<template>
  <div class="container">
    <!-- style="text-align:center;margin-top:8px;" -->
    <h4 style="margin-top:8px;">害虫识别</h4>
    <div
      class="previewBlock"
      @click="chooseFile"
      :style="{ 'background-image': `url(${filePreview})` }"
    >
    </div>
    <b-input-group>
      <b-input-group-prepend is-text>
        <b-icon icon="image-fill"></b-icon>
      </b-input-group-prepend>
      <b-form-file
        class="form-control form-control-lg"
        ref="fileInput"
        type="file"
        @input="selectImgFile"
        id="form-image"
        :disabled="busy"
        accept="image/*"
      ></b-form-file>
    </b-input-group>
    <div class="justify-content-center">
      <b-button
        block
        @click="$bvModal.show('bv-modal-example')"
        variant="success"
        ref="submit"
        type="submit"
        :disabled="busy"
      >裁剪后提交</b-button>
      <div style="margin-top:10px;">
        <a
          href="http://124.221.199.135:10011"
          target="_blank"
        >
          <b-button
            block
            @click="gotoBaidu"
            variant="success"
          >使用自研模型识别</b-button>
        </a>
      </div>
      <div
        v-if="isShowLoading === true"
        class="text-center"
        style="margin-top:30px;"
      >
        <b-spinner
          variant="primary"
          label="Spinning"
        ></b-spinner>
        <b>图片识别中</b>
      </div>
    </div>
    <b-modal
      id="bv-modal-example"
      hide-footer
      ref="modal-image"
    >
      <template #modal-title>
        图片裁剪
      </template>
      <div class="d-block text-center">
        <div style="width:100%;height:500px">
          <vue-cropper
            autoCrop
            :img="filePreview"
            ref="cropper"
            centerBox
          />
        </div>
      </div>
      <b-button
        class="mt-3"
        variant="success"
        block
        @click="getCropData()"
      >获取截图后的图片</b-button>
    </b-modal>
    <b-modal
      ref="modal-info"
      scrollable
      title="信息展示框"
      size="xl"
    >
      <div>
        <b-table
          striped
          hover
          :items="info"
        >
          <template #cell(baike_url)="data">
            <span v-html="data.value"></span>
          </template>
        </b-table>
      </div>
    </b-modal>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios';
    export default {
      data() {
          return {
            isShowLoading: false,
            busy: false,
            filePreview: 'https://pic.rmb.bdstatic.com/bjh/ed81ee20f0befcf8edbc31dd761c9da2.png',
            info:[{
              name: "NULL",
              score: "NULL",
              baike_url: "NULL",
              description: "NULL",
            },
            {
              name: "NULL",
              score: "NULL",
              baike_url: "NULL",
              description: "NULL",
            },
            {
              name: "NULL",
              score: "NULL",
              baike_url: "NULL",
              description: "NULL",
            }]
          };
      },
      methods: {
          chooseFile () {
              this.$refs.fileInput.click()
          },
          selectImgFile () {
            let fileInput = this.$refs.fileInput
            let imgFile = fileInput.files

            if (imgFile && imgFile[0]) {
              let reader = new FileReader
              reader.onload = e => {
                this.filePreview = e.target.result
              }
              reader.readAsDataURL(imgFile[0])
              this.$emit('fileInput', imgFile[0])
            }
          }, 
          // 压缩base64
          dealImage(base64, w, callback) {
	          var newImage = new Image();
	          var quality = 0.6; //压缩系数0-1之间
            newImage.src = base64;
            newImage.setAttribute("crossOrigin", 'Anonymous'); //url为外域时需要
            var imgWidth, imgHeight;
            newImage.onload = function() {
              imgWidth = this.width;
              imgHeight = this.height;
              var canvas = document.createElement("canvas");
              var ctx = canvas.getContext("2d");
              if (Math.max(imgWidth, imgHeight) > w) {
                if (imgWidth > imgHeight) {
                  canvas.width = w;
                  canvas.height = w * imgHeight / imgWidth;
                } else {
                  canvas.height = w;
                  canvas.width = w * imgWidth / imgHeight;
                }
              } else {
                canvas.width = imgWidth;
                canvas.height = imgHeight;
                quality = 0.6;
              }
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
              var base64 = canvas.toDataURL("image/jpeg", quality); //压缩语句
              // 如想确保图片压缩到自己想要的尺寸,如要求在50-150kb之间，请加以下语句，quality初始值根据情况自定
              // while (base64.length / 1024 > 150) {
              // 	quality -= 0.01;
              // 	base64 = canvas.toDataURL("image/jpeg", quality);
              // }
              // 防止最后一次压缩低于最低尺寸，只要quality递减合理，无需考虑
              // while (base64.length / 1024 < 50) {
              // 	quality += 0.001;
              // 	base64 = canvas.toDataURL("image/jpeg", quality);
              // }
              callback(base64); //必须通过回调函数返回，否则无法及时拿到该值
	          }
          },
          getCropData() {
            this.$refs.cropper.getCropData((data) => {
            // 此处进行文件上传
            // console.log(data)
            //var base64 = data
            // console.log(base64.length)
            var str
            this.dealImage(data, 500, useimage);
            var that =this
            function useimage(data){
              str = data
              // console.log(str.length)
              var params = new URLSearchParams();
              params.append('base64', str);
              // 隐藏原来的b-modal
              that.$refs['modal-image'].hide()
              that.isShowLoading=true
              axios.post('http://81.69.185.195:8504/api/uploadimg', params).then(function (response){
                let temp = response.data.data.msg.result
                for(let i = 0 ;i < temp.length;i++) {
                  that.info[i].name = temp[i].name
                  that.info[i].score = temp[i].score.slice(0,6)
                  if(temp[i].baike_info.baike_url==="") {
                    that.info[i].baike_url = "<i>抱歉没有相关词条</i>"
                  }
                  else{
                    that.info[i].baike_url = "<a href='"+temp[i].baike_info.baike_url+"' target='_blank'>百科链接</a>"
                  }
                  that.info[i].description = temp[i].baike_info.description//.slice(0,100) + "..."
                }
                // 显示获取的数据信息
                that.isShowLoading = false;
                that.$refs['modal-info'].show()
              }); 
            }
          });
          },
      },
    }
</script>

<style scoped lang="css">
.container {
  max-width: 600px;
}
.previewBlock {
  display: block;
  cursor: pointer;
  width: 300px;
  height: 280px;
  margin: 0 auto 20px;
  background-position: center center;
  background-size: cover;
  margin-top: 8px;
}
.justify-content-center {
  margin: 20px;
  height: 300px;
}
</style>