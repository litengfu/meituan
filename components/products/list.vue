<template>
  <div class="m-products-list">
    <dl>
      <dd
        v-for="item in nav"
        :key="item.name"
        :class="[item.name,item.acitve?'s-nav-active':'']"
        @click="navSelect(item)"
      >{{ item.txt }}</dd>
    </dl>
    <ul>
      <Item
        v-for="(item,idx) in list"
        :key="idx"
        :meta="item"/>
    </ul>
  </div>
</template>

<script>
import Item from './product.vue'
export default {
  components: {
    Item
  },
  props: {
    list: {
      type:Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {
      nav: [
        {
          name: 's-default',
          txt: '智能排序',
          acitve: true
        }, {
          name: 's-price',
          txt: '价格最低',
          active: false
        }, {
          name: 's-visit',
          txt: '人气最高',
          active: false
        }, {
          name: 's-comment',
          txt: '评价最高',
          active: false
        }
      ],
      bigToSmall:false,
      commentSort:true,
      rateSort:true,
    }
  },
  async asyncData({app}) {
    let { data } = await app.$axios.get('searchList')
    return { items: data.list }
  },
  methods: {
    navSelect: function (item) {
       if(item.txt==='价格最低'){
          if(this.bigToSmall===false){
            this.list=this.list.sort(function(a,b){
                return a.price-b.price
            })
            this.bigToSmall=true
          }else{
            this.list=this.list.sort(function(a,b){
                return b.price-a.price
            })
            this.bigToSmall=false
          }
       }
       else if(item.txt==='人气最高'){
        if(this.commentSort===false){
            this.list=this.list.sort(function(a,b){
                return a.comment-b.comment
            })
            this.commentSort=true
          }else{
            this.list=this.list.sort(function(a,b){
                return b.comment-a.comment
            })
            this.commentSort=false
          }
       }
       else if(item.txt==='评价最高'){
        if(this.rateSort===false){
            this.list=this.list.sort(function(a,b){
                return a.rate-b.rate
            })
            this.rateSort=true
          }else{
            this.list=this.list.sort(function(a,b){
                return b.rate-a.rate
            })
            this.rateSort=false
          }
       }
    }
  }
}
</script>
