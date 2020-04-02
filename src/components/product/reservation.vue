<template>
  <div class="reservationPage white">
    <iHeader
      text="预约详情"
      @doSomething="$emit('hide')"
    />
    <div class="pa-4">
      <div class="d-flex justify-space-between mb-2">
        <span
          class="mr-4"
          style="min-width: 5em"
        >预约时间:</span>
        <v-text-field
          id="id"
          v-model="dateTimeStr"
          name="name"
          readonly
          outlined
          dense
          placeholder="请选择预约时间"
          @click="showPicker=true"
        />
      </div>
      <div class="d-flex justify-space-between">
        <span
          class="mr-4"
          style="min-width: 5em"
        >面试方式:</span>
        <v-select
          v-model="type"
          :items="items"
          outlined
          dense
          placeholder="请选择面试方式"
        />
      </div>
      <div class="py-2">
        其他要求:
      </div>
      <v-textarea
        v-model="remark"
        placeholder="请输入您的要求"
        outlined
      />
      <v-btn
        large
        block
        depressed
        color="primary"
        @click="reserveNow"
      >
        立即预约
      </v-btn>
    </div>
    <v-bottom-sheet
      v-model="showPicker"
      persistent
    >
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
    name: 'Reservation',
    components: {
       iHeader
    },
    props: {
        nannyId: {
            type: Number,
            required: true
        },
        compId: {
            type: Number,
            required: true
        }
    },
    data: () => ({
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
            }
        ]
    }),
    computed: {
        userId () {
            return this.$store.state.app.userId
        }
    },
    created() {

    },
    mounted() {

    },
    methods: {
      formatter(type, value) {
        if (type === 'hour') {
          return `${value}时`;
        } else if (type === 'minute') {
          return `${value}分`
        } else if (type === 'day') {
          return `${value}日`
        } else if (type === 'month') {
          return `${value}月`
        } else if (type === 'year') {
          return `${value}年`
        }
        return value;
      },
      onConfirm(e) {
          this.showPicker = false
          const y = e.getFullYear()
          let m = e.getMonth() + 1
          let d = e.getDate()
          let h = e.getHours()
          let mm = e.getMinutes()
          let s = e.getSeconds()
          m = m < 10 ? '0' + m : m
          d = d < 10 ? '0' + d : d
          h = h < 10 ? '0' + h : h
          mm = mm < 10 ? '0' + mm : mm
          s = s < 10 ? '0' + s : s
          console.log(y)
          console.log(m)
          console.log(d)
          console.log(h)
          console.log(mm)
          console.log(s)
          this.dateTimeStr = y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s
      },
      reserveNow() {
          if (!this.dateTimeStr) {
              this.$toast('请选择预约时间')
              return
          }
          if (this.type === null) {
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
          this.$http.post('/nanny/addNannySubscribe', data)
          .then(res => {
              if (res.data.success) {
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
