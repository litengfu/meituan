<template>
    <div class="m-hcity">
        <dl>
            <dt>热门城市</dt>
            <dd v-for="item in list" :key="item.id" @click="change(item)">
                <nuxt-link to="/">
                    {{item.name==='市辖区'?item.province:item.name}}
                </nuxt-link>
            </dd>
        </dl>
    </div>
</template>

<script>
export default {
    data(){
        return {
            list:[]
        }
    },
    async mounted () {
        let {status,data:{hots}}=await this.$axios.get('/geo/hotCity')
        if(status===200){
            this.list=hots
        }
    },
    methods: {
        change:async function(item){   
            let city=item.name==='市辖区'?item.province:item.name

            let {status,data:{province,city2}}=await this.$axios.get('/geo/getPosition',{
                params:{
                    province:item.province,
                    city:city
                }
            })

            this.$store.commit('geo/setPosition',{province:item.province,city})
            const {status:status2,data:{result}}=await this.$axios.get('/search/hotPlace',{
                params:{
                    city:city.replace('市','')
                }
            })
            if(status2===200){
                this.$store.commit('home/setHotplace',result)
            }else{
                console.log('error')
            }
        }
    }
}
</script>

<style lang="scss">
  @import "@/assets/css/changeCity/hot.scss";
</style>