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
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios';
export default {
    data() {
        return {
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
        }
    },
    mounted:function(){
        this.getEmp();
    }
}
</script>

<style scoped lang="css">
</style>