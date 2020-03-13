<template>
    <div class="reservationPage white">
        <iHeader @doSomething="$emit('hide')" text="预约详情"></iHeader>
        <div class="pa-4">
            <div class="d-flex justify-space-between mb-2">
                <span class="mr-4" style="min-width: 5em">预约时间:</span>
                <v-text-field
                    name="name"
                    readonly
                    outlined
                    dense
                    @click="showPicker=true"
                    id="id"
                    v-model="dateTimeStr"
                    placeholder="请选择预约时间"
                ></v-text-field>
            </div>
            <div class="d-flex justify-space-between">
                <span class="mr-4" style="min-width: 5em">面试方式:</span>
                <v-select
                    :items="items"
                    outlined
                    dense
                    placeholder="请选择面试方式"
                    v-model="type"
                ></v-select>
            </div>
            <div class="py-2">其他要求:</div>
            <v-textarea placeholder="请输入您的要求" v-model="remark" outlined></v-textarea>
            <v-btn @click="reserveNow" large block depressed color="primary">立即预约</v-btn>
        </div>
        <v-bottom-sheet persistent v-model="showPicker">
            <v-sheet>
                <van-datetime-picker
                v-model="pickerDate"
                type="datetime"
                :formatter="formatter"
                :min-date="DateNow"
                @confirm="onConfirm"
                @cancel="showPicker=false"
                />
            </v-sheet>
        </v-bottom-sheet>
    </div>
</template>

<script>
import iHeader from '../public/header'
export default {
    name: 'reservation',
    props: {
        nannyId: {
            type: Number,
            required: true
        },
        compId: {
            type: Number,
            required: true
        },
    },
    components: {
       iHeader
    },
    data: ()=>({
        dateTimeStr: '',
        pickerDate: '',
        remark: '',
        type: null,
        DateNow: new Date(),
        showPicker: false,
        items: [
            {
                text: '门店面试',
                value: 0
            },
            {
                text: '上门面试',
                value: 1
            },
            {
                text: '电话面试',
                value: 2
            },
            {
                text: '视频面试',
                value: 3
            },
        ],
    }),
    created() {

    },
    computed: {
        userId () {
            return this.$store.state.app.userId
        }
    },
    mounted() {

    },
    methods: {
      formatter(type, value) {
        if (type === 'hour') {
          return `${value}时`;
        } 
        else if (type === 'minute') {
          return `${value}分`
        }
        else if (type === 'day') {
          return `${value}日`
        }
        else if (type === 'month') {
          return `${value}月`
        }
        else if (type === 'year') {
          return `${value}年`
        }
        return value;
      },
      onConfirm(e){
          this.showPicker = false
          let y = e.getFullYear()
          let m = e.getMonth()+1
          let d = e.getDate()
          let h = e.getHours()
          let mm = e.getMinutes()
          let s = e.getSeconds()
          m = m<10?'0'+m:m
          d = d<10?'0'+d:d
          h = h<10?'0'+h:h
          mm = mm<10?'0'+mm:mm
          s = s<10?'0'+s:s
          console.log(y)
          console.log(m)
          console.log(d)
          console.log(h)
          console.log(mm)
          console.log(s)
          this.dateTimeStr = y+'-'+m+'-'+d+' '+h+':'+mm+':'+s
      },
      reserveNow() {
          if(!this.dateTimeStr){
              this.$toast('请选择预约时间')
              return
          }
          if(this.type===null){
              this.$toast('请选择面试方式')
              return
          }
          const data = {
              userId: this.userId,
              compId: this.compId,
              nannyId: this.nannyId,
              time: this.dateTimeStr,
              interviewType: this.type,
              remark: this.remark
          }
          this.$http.post('/nanny/addNannySubscribe',data)
          .then(res=>{
              if(res.data.success){
                  this.$toast('预约成功')
                  this.$router.push({
                      path: '/order',
                      query: {
                          type: 4
                      }
                  })
                //   this.$emit('hide')
              }
          })
      }
    }
};
</script>

<style scoped lang="scss">

   .reservationPage{
       position: fixed;
       left: 0;
       right: 0;
       top: 0;
       bottom: 0;
       height: 100vh;
       padding-top: 45px;
       overflow-y: auto;
       z-index: 99; 
   } 
</style>
