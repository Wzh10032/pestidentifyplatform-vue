<template>
  <div>
    <div id="shibie">
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
          @click="$bvModal.show('bv-modal-example1')"
          variant="success"
          ref="submit"
          type="submit"
          :disabled="busy"
        >使用百度模型识别</b-button>
        <div style="margin-top:10px;">
          <b-button
            block
            @click="$bvModal.show('bv-modal-example2')"
            variant="success"
            ref="submit"
            type="submit"
            :disabled="busy"
          >使用自研模型识别</b-button>
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
    </div>

    <!-- <div style="background:green;margin:20px 0px 0px 0px">
      123
    </div> -->
    <b-modal
      id="bv-modal-example1"
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
            ref="cropper1"
            centerBox
          />
        </div>
      </div>
      <b-button
        class="mt-3"
        variant="success"
        block
        @click="getCropData1()"
      >获取截图后的图片</b-button>
    </b-modal>
    <b-modal
      id="bv-modal-example2"
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
            ref="cropper2"
            centerBox
          />
        </div>
      </div>
      <b-button
        class="mt-3"
        variant="success"
        block
        @click="getCropData2()"
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
    <b-modal
      ref="modal-info2"
      scrollable
      title="信息展示框"
      size="xl"
    >
      <div>
        <b-table
          striped
          hover
          :items="info2"
        >
          <template #cell(wiki_url)="data">
            <span v-html="data.value"></span>
          </template>
        </b-table>
        <br>
        耗时{{costtime}}ms
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
            costtime:"",
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
            }],
            info2:[{
              name: "NULL",
              wiki_url: "NULL",
              score: "NULL",
            },{
              name: "NULL",
              wiki_url: "NULL",
              score: "NULL",
            },{
              name: "NULL",
              wiki_url: "NULL",
              score: "NULL",
            },{
              name: "NULL",
              wiki_url: "NULL",
              score: "NULL",
            }],
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
          getCropData1() {
            this.$refs.cropper1.getCropData((data) => {
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
                    that.info[i].baike_url = "<a href='"+temp[i].baike_info.baike_url+"' target='_blank'>百度百科链接</a>"
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
          getCropData2() {
            this.$refs.cropper2.getCropData((data) => {
              var str
              this.dealImage(data, 500, useimage);
              let file = document.getElementById('form-image').files[0];
              var that =this
              function useimage(data){
                str = data
                var params = new URLSearchParams();
                params.append('base64', str);
                params.append('name', file.name);
                // 隐藏原来的b-modal
                that.$refs['modal-image'].hide()
                that.isShowLoading=true
                // console.log(str)
                axios.post('http://81.69.185.195:8504/api/model', params).then(function (response){
                  var temp = response.data.data.msg
                  that.costtime=temp.cost_ms
                  console.log(temp)
                  for(let i = 0 ;i < temp.results.length;i++) {
                    that.info2[i].name=temp.results[i].name
                    that.info2[i].score=temp.results[i].score.toFixed(3);
                    that.info2[i].wiki_url= "<a href='https://zh.wikipedia.org/w/index.php?search=" +temp.results[i].name+ "' target='_blank'>维基百科链接</a>"
                  }
                  that.isShowLoading = false;
                  that.$refs['modal-info2'].show()
                }); 
            }
          });
          }
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
  margin: 20px 0px 0px 0px;
  height: 100px;
}
#shibie {
  width: 600px;
  margin: 0 auto;
}
</style>