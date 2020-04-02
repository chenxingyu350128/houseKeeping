<template>
  <div class="nursePage white">
    <iHeader
      :text="topText"
      @doSomething="$emit('hide')"
    />
    <v-tabs
      v-model="tab"
      color="primary"
      height="35"
      slider-color="primary"
      grow
    >
      <v-tab 
        v-for="(tab,i) in tabs" 
        :key="i" 
        style="min-width: unset!important"
        class="px-0 caption" 
        @click="tabClick(i,$event)"
      >
        <div class="d-flex align-center flex-fill fill-height">
          <v-divider
            v-if="i"
            inset
            vertical
          />
          <v-spacer />
          {{ tab.title }}
          <v-icon dense>
            {{ tab.reverse?'mdi-chevron-up':'mdi-chevron-down' }}
          </v-icon>
          <v-spacer />                        
        </div>                
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="(item,i) in tabs"
        :key="i"
      > 
        <van-list 
          v-if="nannys.length"
          ref="loadmore"
          :immediate-check="false" 
          :finished="allLoaded" 
          loading-text="加载中..." 
          finished-text="已全部加载完"  
          @load="loadBottom"
        >
          <v-list 
            v-for="(itm,index) in nannys"
            :key="index"
            class="py-0" 
            three-line
            :value="index"                
            @click.native="toDetails(itm.name,itm.nannyId)"
          >
            <v-list-item
              class="px-2"
            >
              <v-avatar
                size="65"
                tile
                class="mr-2"
              >
                <img :src="itm.headImg">
              </v-avatar>
              <v-list-item-content>
                <div class="caption d-flex align-center">
                  <span class="flex-fill no-wrap mr-1">{{ itm.name }}</span>
                  <span class="flex-fill no-wrap mr-1">{{ itm.age }}岁</span>
                  <span class="flex-fill no-wrap mr-1 orange--text flex-fill">{{ item.salary }}/月</span>
                  <span
                    class="flex-fill px-1 grey lighten-1 white--text v-collips"
                    v-text="itm.company"
                  />
                </div>
                <div class="d-flex">
                  <v-btn 
                    dark 
                    rounded 
                    outlined 
                    x-small
                    class="mr-1"
                    color="primary"
                  >
                    {{ itm.experience }}月经验
                  </v-btn>
                  <v-btn 
                    dark 
                    rounded 
                    outlined 
                    x-small
                    class="mr-1"
                    color="primary"
                  >
                    {{ itm.education }}
                  </v-btn>
                  <v-btn 
                    dark 
                    rounded 
                    outlined 
                    x-small
                    class="mr-1"
                    color="primary"
                  >
                    {{ itm.nativePlace }}人
                  </v-btn>                                
                </div>
                <div class="subtitle-2 text--primary">
                  <span
                    v-for="(label,idx) in itm.labels"
                    :key="idx"
                  >
                    <span>
                      {{ label.label }}
                      <span v-if="idx!=itm.labels.length-1">,</span>
                    </span>
                  </span>
                </div>
              </v-list-item-content>   
            </v-list-item>
            <v-divider />                     
          </v-list>
        </van-list>
      </v-tab-item>
    </v-tabs-items>
    <!-- <nannyDetails :nannyName="detailName" :id="detailId" @hide="showDetails=false" v-if="showDetails"/> -->
  </div>
</template>

<script>
import iHeader from '../components/public/header'
// import nannyDetails from '../components/index/nannyDetails'
export default {
    name: 'NannyList',
    components: {
       iHeader
    //    nannyDetails
    },
    props: {
        type: {
            type: Number,
            required: true
        }
    },
    data: () => ({
        tab: 0,
        showDetails: false,
        allLoaded: false,
        detailName: '',
        detailId: 0,
        page: 1,
        rows: 10,
        // showMenu: false,
        tabs: [
            {
                title: '籍贯',
                reverse: false
            },
            {
                title: '工资',
                reverse: false
            },
            {
                title: '学历',
                reverse: false
            },
            {
                title: '年龄',
                reverse: false
            },
            {
                title: '经验',
                reverse: false
            },
            {
                title: '能力',
                reverse: false
            }
            
        ],
        strs: ['native_place', 'salary', 'education', 'age', 'experience', 'power'],
        nannys: []
    }),
    computed: {
        topText() {
            const strs = [
                '住家保姆',
                '非住家保姆',
                '月嫂',
                '护工',
                '育儿嫂'
            ]
            return strs[this.type]
        }
    },
    created() {
        this.loadBottom = this._.debounce(this.loadmore, 200)
    },
    mounted() {
        const params = {
            name: 'native_place',
            val: 'asc',
            type: this.type,
            page: this.page,
            rows: this.rows      
        }
        this.init(params)
    },
    methods: {
        tabClick(i, e) {
            e.preventDefault()
            // const strs = ['native_place','salary','education','age','experience','power']
            // const params = {
            //     name: strs[i],
            //     val: this.tabs[i].reverse?'desc':'asc',
            //     page: this.page,
            //     rows: this.rows
            // }
            console.log('i的数值：' + i)
            console.log('tab:' + this.tab)
            if (i === this.tab) {
                const obj = this.tabs[i]
                obj.reverse = !obj.reverse
                this.$set(this.tabs, i, obj)
                const params = {
                    name: this.strs[i],
                    val: this.tabs[i].reverse ? 'desc' : 'asc',
                    type: this.type,
                    page: this.page,
                    rows: this.rows
                }
                this.init(params)
                console.log(params)
            } else { // 新的tab,page重置为1
                this.page = 1
                const params = {
                    name: this.strs[i],
                    val: this.tabs[i].reverse ? 'desc' : 'asc',
                    type: this.type,
                    page: this.page,
                    rows: this.rows
                }
                console.log(params)
                this.init(params)
            }
        },
        init(params, y) {
            this.$http.get('/nanny/findNannys', { params })
            .then(res => {
                if (res.data.success) {
                    const rows = res.data.rows
                    this.allLoaded = res.data.pager.currentPage === res.data.pager.totalPages
                    this.nannys = y ? this.nannys.concat(rows) : rows
                }
            })
        },
        loadmore() {
            this.page++
            const params = {
                name: this.strs[this.tab],
                val: this.tabs[this.tab].reverse ? 'desc' : 'asc',
                type: this.type,
                page: this.page,
                rows: this.rows
            }
            console.log(params)
            this.init(params, 'Yo')
        },
        toDetails(name, id) {
            this.$router.push({
                path: '/nannyDetails',
                query: {
                    name,
                    id
                }
            })
            // this.detailName = name
            // this.detailId = id
            // console.log('showDetail')
            // this.showDetails = true
        }
    }
};
</script>

<style scoped lang="scss">

   .nursePage{
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
