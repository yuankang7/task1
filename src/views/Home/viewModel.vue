<template>
    <div class="viewhtml">
        <div class="viewmodel">
            <div class="sviewleft">
                <svg class="icon userimg font" aria-hidden="true">
                    <use xlink:href="#icon-1yonghu"></use>
                </svg>
            </div>
            <div class="aviewright">
                <p class="viewname">今日新增用户</p>
                <countTo class="num" :userform="userform"  :start-val="0" :end-val="endvaluser" :duration="3300"></countTo>
                <!-- <p  :userform="userform">1029</p> -->
            </div>
        </div>
        <div class="viewmodel">
            <div class="sviewleft">
                <svg class="icon vipimg font" aria-hidden="true">
                    <use xlink:href="#icon-huiyuan"></use>
                </svg>
            </div>
            <div class="aviewright member">
                <p class="viewname">今日新增会员</p>
                <countTo class="num" :vipform="vipform"  :start-val="0" :end-val="endvalvip" :duration="3400"></countTo>
                <!-- <p class="num">2938</p> -->
            </div>
        </div>
        <div class="viewmodel">
            <div class="sviewleft">
                <svg class="icon incomeimg font" aria-hidden="true">
                    <use xlink:href="#icon-shouru"></use>
                </svg>
            </div>
            <div class="aviewright income" :data="revenueData">
                <p class="viewname">今日营收额</p>
                <countTo class="num" prop="total_price"  :start-val="0" :end-val="endvalincome" :duration="3000"></countTo>
                <!-- <p class="num" prop="total_price">{{revenueData.total_price}}</p> -->
            </div>
        </div>
        <div class="viewmodel">
            <div class="sviewleft">
                <svg class="icon profit font" aria-hidden="true">
                    <use xlink:href="#icon-jinqian"></use>
                </svg>
            </div>
            <div class="aviewright" :data="profitData">
                <p class="viewname" >总盈利额</p>
                <countTo class="num" prop="total_price"  :start-val="0" :end-val="endvalprofit" :duration="3000"></countTo>
                <!-- <p class="num" prop="total_price">{{profitData.total_price}}</p> -->
            </div>
        </div>
    </div>
</template>

<script>
// import countTo from 'vue-count-to'
import '@/iconfont/iconfont.js'
    export default {
    components: {
        countTo,
    },
        data(){
            return{
                userform:0,
                vipform:0,
                revenueData:[],
                profitData:[],
                endvalincome:0,
                endvalprofit:0,
                endvaluser:0,
                endvalvip:0,
            }
        },
        created(){
            this.newuser();
            this.newmember();
            this.todayrevenue();
            this.totalprofit();
        },
        methods:{
            newuser(){
                this.$http({
                    url:"http://81.68.121.52:8000/api/currentusers",
                    method:"GET",
                }).then(res => {
                    let response = res.data;
                    console.log(response);
                    if(response.status == "success"){
                        this.userform = response.data.length;
                        this.endvaluser = this.userform
                    }else{
                        this.$message.error(response.error)
                    }
                })
            },
            newmember(){
                this.$http({
                    url:"http://81.68.121.52:8000/api/currentvipusers",
                    method:"GET",
                }).then(res => {
                    let response = res.data;
                    console.log(response);
                    if(response.status == "success"){
                        this.vipform = response.data.length
                        this.endvalvip = this.userform
                    }else{
                        this.$message.error(response.error)
                    }
                })
            },
            todayrevenue(){
                this.$http({
                    url:"http://81.68.121.52:8000/api/currenttotalpay",
                    method:"GET",
                }).then(res => {
                    let response = res.data;
                    // console.log(response);
                    if(response.status == "success"){
                        this.revenueData = response;
                        // if(this.revenueData.total_price.indexOf('.') == -1){
                            this.endvalincome = this.revenueData.total_price
                        // }else{
                        //     this.endvalincome = Number(this.revenueData.total_price.slice(0, this.revenueData.total_price.indexOf(".")))
                        // }
                        // console.log(response,1);
                    }else{
                        this.$message.error(response.error)
                    }
                })
            },
            totalprofit(){
                this.$http({
                    url:"http://81.68.121.52:8000/api/gop",
                    method:"GET",
                }).then(res => {
                    let response = res.data;
                    // console.log(response);
                    if(response.status == "success"){
                        this.profitData = response;
                        if(this.profitData.total_price.indexOf('.') == -1){
                            this.endvalprofit = this.profitData.total_price
                        }else{
                            this.endvalprofit = Number(this.profitData.total_price.slice(0, this.profitData.total_price.indexOf(".")))
                        }
                        // this.endvalprofit = Number(this.profitData.total_price.slice(0, this.profitData.total_price.indexOf(".")))
                        console.log(this.profitData,2)
                    }else{
                        this.$message.error(response.error)
                    }
                })
            }
        }
        
    }
</script>

<style scoped>
.viewhtml{
    width: 100%;
    height: 128px;
    display: flex;
    justify-content: space-between;
}
.viewmodel{
    width: 270px;
    height: 108px;
    background-color: #fff;
    cursor: pointer;
}
.viewhtml .font{
    font-size: 50px;
    border-radius: 6px;
    transition: all .5s;
    padding: 16px;
}
.viewhtml .userimg{
    color: #73c0de;
}
.viewhtml .userimg:hover{
    background-color: #73c0de;
    color: #fff;

}
.viewhtml .vipimg{
    color: rgb(250 200 88);
}
.viewhtml .vipimg:hover{
    background-color: rgb(250 200 88);
    color: #fff;
}
.viewhtml .incomeimg{
    color: rgb(238 102 102);
}
.viewhtml .incomeimg:hover{
    background-color: rgb(238 102 102);
    color: #fff;
}
.viewhtml .profit:hover{
    background-color: rgb(84 168 185);
    color: #fff !important;
}
.viewhtml .sviewleft{
    margin-left: 14px;
    cursor: pointer;

}
.viewhtml .viewmodel{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.viewhtml .aviewright{
    width: 110px;
    height: 52px;
    margin-right: 14px;
    cursor: pointer;
}
.viewhtml .viewname{
    line-height: 18px;
    color: rgba(0,0,0,.45);
    font-size: 16px;
    padding-bottom: 12px;
    margin: 0px;
    font-weight: 700;

}
.viewhtml .num{
    /* padding-top: 12px; */
    font-size: 20px;
    font-weight: 700;
    color: #666;
    /* margin: 0px; */
}
</style>
<style>
.viewhtml .icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>