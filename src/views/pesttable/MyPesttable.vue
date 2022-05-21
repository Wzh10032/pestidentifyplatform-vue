<template>
  <div class="container">
    <b-row class="mt-5">
      <b-col>
        <b-card title="有害生物基础库">
          <b-table
            striped
            hover
            :items="pestlist"
            :fields="fields"
          ></b-table>
        </b-card>
      </b-col>
    </b-row>
    <br>
    <div>
      <b-button
        id="show-btn"
        variant="danger"
        @click="$bvModal.show('bv-modal-example')"
        style="float:right"
      >修改有害库基础信息</b-button>

      <b-modal
        ref="bv-modal"
        id="bv-modal-example"
        hide-footer
      >
        <template #modal-title>
          修改有害库基础信息
        </template>
        <b-form>
          <b-form-group>
            <b-form-input
              v-model="id"
              placeholder="所要修改的数据id"
            ></b-form-input>
            <br>
            <b-form-input
              v-model="name"
              placeholder="所要修改的害虫名"
            ></b-form-input>
            <br>
            <b-form-input
              v-model="location"
              placeholder="所要修改的经纬度"
            ></b-form-input>
            <br>
            <b-form-input
              v-model="time"
              placeholder="所要修改的时间"
            ></b-form-input>
          </b-form-group>
          <b-form-group>
            <b-button
              variant="danger"
              @click="changeLocation"
              block
            >确认修改</b-button>
          </b-form-group>
        </b-form>
        <b-button
          class="mt-3"
          block
          variant="success"
          @click="$bvModal.hide('bv-modal-example')"
        >取消</b-button>
      </b-modal>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios';
export default {
    data() {
        return {
            id:"",
            name:"",
            location:"",
            time:"",
            fields: ['Name', 'Lnglat', 'FindTime'],
            pestdata:{
                name:"",
                location:"",
                time:"",
            },
            pestlist:[],
        }
    },
    methods: {
        getEmp() {
            var params = new URLSearchParams();
            var that = this
            axios.get('http://81.69.185.195:8504/api/sendlocation', params).then(function (response){
                var responsedata = response.data.data
                for(let i=0;i<responsedata.length;i++){
                    // that.pestdata['location'] = responsedata[i].Lnglat
                    // that.pestdata['name'] = responsedata[i].Name
                    // that.pestdata['time'] = responsedata[i].FindTime
                    // console.log(responsedata[i])
                    // console.log(that.pestdata)
                    delete responsedata[i].I
                    that.pestlist.push(responsedata[i])
                }
            }); 
            //console.log(that.pestlist)
        },
        changeLocation() {
          // console.log("123"+this.id+this.name+this.location+this.time)
          var that=this
          var params = new URLSearchParams();
          params.append('id', this.id)
          params.append('name',this.name)
          params.append('lnglat',this.location)
          params.append('time', this.time)
          // 2020-1-6 12:34:56
          // that.$refs['bv-modal-example'].hide()
          axios.post('http://81.69.185.195:8504/api/changelocation', params).then(function (response){
            that.$refs['bv-modal'].hide()
            alert("数据修改成功")
          }); 
        }
    },
    mounted:function(){
        this.getEmp();
    }
}
</script>

<style scoped lang="css">
</style>