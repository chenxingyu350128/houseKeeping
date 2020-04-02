<template>
  <div class="addressList grey lighten-3 pb-11">
    <iHeader
      text="服务地址管理"
      @doSomething="$emit('hide')"
    />
    <div v-if="list.length">
      <v-card
        v-for="(item,i) in list"
        :key="i"
        class="ma-2"
        @click="addressSelect(i)"
      >
        <div class="d-flex align-center subtitle-2 px-4 py-2 justify-space-between">
          <div class="d-flex align-center">
            <v-icon :color="item.defcode?'primary':'grey'">
              {{ item.defcode?'mdi-check-circle':'mdi-circle-outline' }}
            </v-icon>
            <span class="ml-2">{{ item.receiver }}</span>
          </div>
          <span>{{ item.phone }}</span>
          <v-icon
            dense
            @click.stop="editAddress(item,item.auId)"
          >
            mdi-square-edit-outline
          </v-icon>
        </div>
        <v-divider />
        <div class="px-4 py-2 d-flex flex-column">
          <span class="ml-2 subtitle-2">{{ item.region.split('-').join('') }}</span>
          <span class="ml-2 subtitle-2">{{ item.communityName+item.address }}</span>
        </div>
      </v-card>
    </div>
    <v-row v-else>
      <v-col cols="12">
        <v-img
          max-height="35%"
          contain
          :src="emptyImg"
        />
        <p class="text-center subtitle-2 grey--text mt-2">
          您还没有服务地址，快去添加地址吧
        </p>
      </v-col>
    </v-row>
    <v-footer
      class="pa-0 ma-0"
      bottom
      fixed
    >
      <v-btn
        large
        depressed
        tile
        block
        color="primary"
        dark
        @click="addAddress"
      >
        添加
      </v-btn>
    </v-footer>
    <addressEdit
      v-if="showEdit"
      :id="editId"
      :type="type"
      :item="editItem"
      @hide="showEdit=false"
    />
  </div>
</template>

<script>
import iHeader from '../public/header'
import addressEdit from './addressEdit'
export default {
    name: 'AddressList',
    components: {
       iHeader,
       addressEdit
    },
    props: {
        type:{
            type: Number,
            required: true
        }
    },
    data: () => ({
        editId: 0,
        editItem: null,
        showEdit: false,
        emptyImg: require('../../assets/img/emptyContent.png')
    }),
    computed: {
        userId() {
            return this.$store.state.app.userId
        },
        list() {
            return this.$store.state.app.addressList
        }
    },
    created() {

    },
    mounted() {
        this.getList()
    },
    methods: {
        getList() {
            const params = {
                userId: this.userId,
                goodsType: this.type
            }
            this.$http.get('/user/findAddress', { params })
            .then(res => {
                if (res.data.success) {
                    // this.list = res.data.obj
                    this.$store.commit('SET_SINGLE_STATE', ['addressList', res.data.obj])
                }
            })
        },
        editAddress(item, id) {
            this.editItem = item
            this.editId = id
            this.showEdit = true
        },
        addAddress() {
            this.editId = 0
            this.showEdit = true
        },
        addressSelect(i) {
            this.$emit('addressSelect', this.list[i])
        }
    }
};
</script>

<style scoped lang="scss">

   .addressList{
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
