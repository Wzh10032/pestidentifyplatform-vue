<template>
  <div class="container">
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
    </div>
    <b-modal
      id="bv-modal-example"
      hide-footer
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
  </div>
</template>

<script>
/* eslint-disable */
    export default {
      data() {
          return {
            busy: false,
            filePreview: 'https://img1.baidu.com/it/u=585921100,858045908&fm=253&fmt=auto&app=138&f=JPG?w=500&h=500'
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
          getCropData() {
            this.$refs.cropper.getCropData((data) => {
            console.log(data)
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
  margin-top: 30px;
}
.justify-content-center {
  margin: 20px;
  height: 300px;
}
</style>