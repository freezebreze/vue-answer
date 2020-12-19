<template>
	<div id="scorecontainer">
		<el-row style="margin-bottom: 20px;">
			<el-col :xs="{span:24,offset:8}" :lg="{span:24,offset:11}">最终得分：{{score}}分</el-col>
		</el-row>
		<el-row style="margin-bottom: 20px;">
			<el-col :xs="{span:24,offset:8}" :lg="{span:24,offset:11}">{{scoreTips}}</el-col>
		</el-row>
		<el-row>
			<el-col :xs="{span:24,offset:8}" :lg="{span:24,offset:11}">
				<el-button type="success" @click = "reset">再来一次</el-button>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import {mapState} from 'vuex';
export default {
	name: 'score',
    data(){
        return {
            showHide: false, //是否显示提示
            score: 0, //分数
            scoreTips:'', //分数提示
            rightAnswer: [2, 7, 12, 13, 18], //正确答案
            scoreTipsArr:['就这？','也不行！','勉强及格！','龟龟!，差一点','牛啊！，没百度吧？'],
        }
    },
    computed: mapState(['answerid']),
	created(){
        this.computedScore();
        this.getScoreTip();
    },
    methods: {
        //计算分数
        computedScore(){
            this.answerid.forEach((item, index) => {
                if (item == this.rightAnswer[index]) {
                    this.score += 20;
                }
            })
        },
        //根据分数显示提示
        getScoreTip() {
          let index = Math.ceil(this.score/20)-1;
          this.scoreTips = this.scoreTipsArr[index];
        },
        reset() {
            this.$router.push({path: '/'});
        }
    },
}

</script>

<style scoped="scoped">
    #scorecontainer {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
		font-size: 24px;
		width: 100%;
	}
</style>
