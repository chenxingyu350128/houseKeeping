<template>
    <div class="addressEdit white pb-11 text--primary">
        <iHeader @doSomething="$emit('hide')" :text="id?'编辑地址':'添加地址'">
          <template v-if="id" v-slot:right>
            <v-icon @click="deleteAddress">mdi-delete-outline</v-icon>
          </template>
        </iHeader>
        <div class="ma-4">

          <v-text-field
            prefix="联系人:"
            outlined
            small
            class="mt-4"
            v-model="receiver"
            placeholder="请填写预约联系人"
          ></v-text-field>
          <v-text-field
            prefix="手机号:"
            outlined
            small
            class=""
            v-model="phone"
            placeholder="请填写手机号码"
          ></v-text-field> 
          <div class="d-flex align-center justify-space-between">
            <span>所在地：</span>
            <div @click="showBS=true" class="d-flex align-center ">{{region||'请选择'}} <v-icon class="ml-2">mdi-chevron-right</v-icon> </div>
          </div>
          <div class="py-2 mt-2">详细地址：</div>
          <v-textarea outlined v-model="address" placeholder="详细地址：如7号楼一单元1208"></v-textarea>
          <div @click="defcode=!defcode" class="d-inline-flex align-end" v-if="id">
            <v-icon :color="defcode?'primary':''">{{defcode?'mdi-check-circle':'mdi-circle-outline'}}</v-icon>
            <span class="ml-2 subtitle-2 grey--text">设为默认地址</span>
          </div>
        </div>
        <v-footer fixed bottom class="pa-0 ma-0 white">
          <v-btn @click="btnClick" large depressed tile block dark color="primary">{{id?'保存':'添加'}}</v-btn>
        </v-footer>
        <v-bottom-sheet v-model="showBS">
          <van-picker 
          show-toolbar  
          @cancel="showBS=false"
          :default-index="defaultIndex"  
          :columns="columns"
          @change="onChange"
          @confirm="onConfirm" />
        </v-bottom-sheet>
        
    </div>
</template>

<script>
import data from '../../assets/regions.json'
import iHeader from '../public/header'
export default {
    name: 'addressEdit',
    props: {
      id: {
        type: Number,
        default: 0
      },
      item: {
        type: Object,
        default: null
      }
    },
    components: {
       iHeader
    },
    data: ()=>({
      tab0: 0,
      tab1: 0,
      tab2: 0,
      address: '',
      auId: 0,
      defaultIndex: 0,
      selectIndex: null,
      communityId: 0,
      communityName: '',
      createTime: '',
      defcode: false,
      phone: '',
      receiver: '',
      region: '',
      updateTime: '',
      zipcode: '',
      showBS: false
    }),
    created() {

    },
    computed: {
      communityList() {
        return this.$store.state.app.communityList
      },
      userId() {
        return this.$store.state.app.userId
      },
      province(){
        return Object.keys(data)
      },
      city(){
        return  Object.keys(Object.values(data)[this.tab0])
      },
      area(){
        return  Object.values(Object.values(data)[this.tab0])[this.tab1]
      },
      columns(){
        return [
          {
            values: this.province,
            className: 'province',
            defaultIndex: this.tab0
          },
          {
            values: this.city,
            className: 'city',
            defaultIndex: this.tab1         
          },
          {
            values: this.area,
            className: 'area',
            defaultIndex: this.tab2
          },
        ]
      },      
      itemGet() {
        if(this.selectIndex===null) {
          return null
        }
        return this.communityList[this.selectIndex]
      }
    },
    mounted() {
      this.getRegion()
      if(this.id){
        this.init()
      }
    },
    methods: {
      init() {
        const params = {
          auId: this.id
        }
        this.$http.get('/user/findAddressById',{params})
        .then(res=>{
          if(res.data.success){
            let obj = res.data.obj
            for(let x in obj) {
              this[x] = obj[x]
            }
            if(this.columns.includes(this.communityName)) {
              this.defaultIndex = this.columns.indexof(this.communityName)
            }
            
          }
        })
      },
      onConfirm(x,y) {
        console.log(x,y)
        this.showBS = false
        this.region = x.join('-')
        this.selectIndex = y
      },
      onChange(picker) {
        this.tab0 = picker.getIndexes()[0]
        this.tab1 = picker.getIndexes()[1]
        this.tab2 = picker.getIndexes()[2]
      },      
      checkPhone(e){
        if(!(/^1[3456789]\d{9}$/.test(e))){ 
            return true; 
        }   
      },
      checkAddress(e){
        if(!(/^.+(楼|单元).+(室|户|#|单元).*$/.test(e))){ 
            return true; 
        } 
      }, 
      btnClick() {
        if(!this.receiver) {
          this.$toast('请填写联系人')
          return
        }
        if(!this.phone) {
          this.$toast('请填写手机号')
          return
        }
        if(!this.region) {
          this.$toast('请选择所在地')
          return
        }
        if(this.checkPhone(this.phone)){
          this.$toast('请输入正确的手机号码')
          return
        }
        const data = {
          userId: this.userId,
          receiver: this.receiver,
          phone: this.phone,
          region: this.region,
          address: this.address,
          defcode: Number(this.defcode)
        }
        //修改
        if(this.id){
          data.auId = this.id
          let modified = false
          for(let x in this.item){
            if(this.item[x]!=this[x]){
              modified = true
              this.$toast('modified')
            }
          }
          if(modified){
            if(data.defcode){
              this.setDefault()
            }
            console.log(data)
            this.editAddress(data)
          }else{
            this.$toast('未作任何修改，无需保存')
          }
          return
        }
        //添加
        this.editAddress(data)
      },
      editAddress(data) {
        this.$http.post('/user/addOrEditAddress',data)
        .then(res=>{
          if(res.data.success){
            this.$toast(this.id?'修改成功':'添加成功')
            this.updateList()
          }
        })
      },
      deleteAddress() {
        const data = {
          id: this.id
        }
        this.$http.post('/user/delAddress',data)
        .then(res=>{
          if(res.data.success){
            this.updateList()
          }
        })
      },
      setDefault() {
        const data = {
          adId: this.id,
          userId: this.userId
        }
        this.$http.post('/user/editDefaultAddr',data)
      },
      updateList() {
        const params = {
            userId: this.userId
        }
        this.$http.get('/user/findAddress',{params})
        .then(res=>{
            if(res.data.success){
                // this.list = res.data.obj
                this.$store.commit('SET_SINGLE_STATE', ['addressList', res.data.obj])
                this.$emit('hide')
            }
        })
      },
      getRegion() {
        const params = {
          parentId: 350100
        }
        this.$http.get('/user/findAreasByParent',{params})
      }    
    }
};
</script>

<style scoped lang="scss">

   .addressEdit{
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
