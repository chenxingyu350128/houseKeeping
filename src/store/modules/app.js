const app = {
    state: {
      requestLoading: false,
      sessionId: localStorage.getItem('sessionId'),
      token: localStorage.getItem('token'),
      positionCity: localStorage.getItem('positionCity'),
      userId: localStorage.getItem('userId'),
      sex: localStorage.getItem('sex'),
      userName: localStorage.getItem('userName'),
      realName: localStorage.getItem('realName'),
      defaultAddress: JSON.parse(localStorage.getItem('defaultAddress')),
      communityList: JSON.parse(localStorage.getItem('communityList')),
      indexBanners: JSON.parse(localStorage.getItem('indexBanners')),
      cateList: JSON.parse(localStorage.getItem('cateList')),
      couponList: JSON.parse(localStorage.getItem('couponList')),
      indexCates: JSON.parse(localStorage.getItem('indexCates')),
      bestSelling: JSON.parse(localStorage.getItem('bestSelling')),
      hotProduct: JSON.parse(localStorage.getItem('hotProduct')),
      evalsList: JSON.parse(localStorage.getItem('evalsList')),
      addressList: JSON.parse(localStorage.getItem('addressList')),
      orderList: JSON.parse(localStorage.getItem('orderList')),
    },
    mutations: {
      SET_LOADING: (state, status) => {
        state.requestLoading = !!status
      },
      SET_SINGLE_STATE: (state, status) => {
        let x = status[0]
        let y = status[1]
        state[x] = y
        let isObject = [
            // 'memberList',
            'communityList',
            'indexBanners',
            'cateList',
            'indexCates',
            'bestSelling',
            'hotProduct',
            'defaultAddress',
            'couponList',
            'evalsList',
            'orderList',
            'addressList'   
          ]
        if (isObject.includes(x)) {
          localStorage.setItem(x, JSON.stringify(y))
        }else{
          localStorage.setItem(x,y)
        }
      },
      CLEAR_SINGLE_STATE: (state, name) => {
        let isObject = [
          // 'memberList',
          'cityHistory',
          'noticeList',
          'houseList',
          'bannerList',
          'headLines',
          'propertyHL',
          'appList',
          'expBanners'
        ]
        let defaultZero = [
          'rankAgeStart',
          'houseIndex'
        ]      
        if (isObject.includes(name)) {
          state[name] = []
        }
        else if (defaultZero.includes(name)) {
          state[name] = 0
        }
        else if (name == 'positionCity') {
          state[name] = '正在定位'
        }
        else if (name == 'currentColor') {
          state[name] = '#00aaef'
        }
        else if (name == 'rankAgeEnd') {
          state[name] = 99
        } else {
          state[name] = ''
        }
        localStorage.setItem(name,'')
      },
      CLEAR_STATE: (state) => {
        let isObject = [
          // 'memberList',
          'cityHistory',
          'noticeList',
          'houseList',
          'bannerList',
          'appList',
          'headLines',
          'propertyHL',
          'expBanners'        
        ]
        let defaultZero = [
          'rankAgeStart',
          'houseIndex'
        ]
  
        for(let x in state){
          localStorage.clear()
  
          if (isObject.includes(x)){
            state[x] = []
          }
          else if (defaultZero.includes(x)){
            state[x] = 0
          }
          else if (x =='positionCity'){
            state[x] = '正在定位'
          }
          else if (x =='currentColor'){
            state[x] = '#00aaef'
          }
          else if (x =='rankAgeEnd'){
            state[x] = 99
          }else{
            state[x] = ''
          }
        }
        state.guideOver = true
        localStorage.setItem('guideOver', true)
      },
      SET_EACH_STATE: (state,status) => {
        let isObject = [
          // 'memberList',
          'cityHistory',
          'noticeList',
          'houseList',
          'bannerList',
          'propertyHL',
          'headLines',
          'appList',
          'expBanners'
        ]
        for (let x in status) {
          state[x] = status[x]
          if (isObject.includes(x)) {
            localStorage.setItem(x, JSON.stringify(state[x]))
          } else {
            localStorage.setItem(x, state[x])
          }
          // localStorage.setItem(x, state[x])
          // if(status[x]){
  
          // }
        }
      }
    },
    actions: {
      SetLoading({ commit }, status) {
        commit('SET_LOADING', status)
      },
      setSingleState({ commit }, status){
        commit('SET_SINGLE_STATE', status)
      },
      setEachState({ commit }, status){
        commit('SET_EACH_STATE', status)
      },
    }
  }
  
  export default app
  //this.$store.commit('SET_SINGLE_STATE',['',])