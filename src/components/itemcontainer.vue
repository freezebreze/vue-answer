<template>
	<div id="itemcontainer">
		<el-row>
			<el-col id="header" :xs="{span:10,offset:8}" :sm="{span:24,offset:9}" :lg="{span:24,offset:11}">
				<span class="num_tip" v-if="fatherComponent == 'home'">智力大闯关</span>
				<span class="num_tip" v-if="fatherComponent == 'item'">题目{{itemNum}}</span>
			</el-col>
		</el-row>
		<el-row id="btn_answer" v-if="fatherComponent == 'home'">
			<el-col :xs="{span:24,offset:0}" :sm="{span:20,offset:0}" :lg="{span:24,offset:0}">
				<el-button @click = "toItem" type="primary" id="button_style">开始答题</el-button>
			</el-col>
		</el-row>
		<el-row v-if="fatherComponent == 'item'">
			<el-col :xs="{span:10,offset:8}" :lg="{span:24,offset:11}" style="margin-top: 20px;">{{itemDetail[itemNum-1].topic_name}}</el-col>
			<el-col v-if="itemDetail.length > 0" :xs="{span:24}" :lg="{span:24,offset:8}"  style="margin-top: 10px;">
				<ul class="ul_style">
					<li  v-for="(item, index) in itemDetail[itemNum-1].topic_answer" @click="choosed(index, item.topic_answer_id)" class="item_list"
						:key = "index">
							<span class="option_style" v-bind:class="{'has_choosed':choosedNum==index}">{{chooseType(index)}}</span>
							<span class="option_detail">{{item.answer_name}}</span>
					</li>
				</ul>
			</el-col>
		</el-row>
		<el-row>
			<el-col :xs="{span:24,offset:9}" :lg="{span:24,offset:11}" v-if="fatherComponent == 'item'">
				<el-button @click="nextItem" type="primary" v-if="itemNum < itemDetail.length">下一题</el-button>
				<el-button @click="submitAnswer" type="primary" v-else>提交</el-button>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import { mapActions } from 'vuex'
export default {
	name: 'itemcontainer',
	data() {
		return {
			itemId: null, //题目ID
			choosedNum: null, //选中答案索引
			choosedId:null ,//选中答案id
			circleUrl: '../assets/1.jpg'
		}
	},
		props:['fatherComponent'],
		computed: mapState([
	  	'itemNum', //第几题
			'level', //第几周
			'itemDetail', //题目详情
			'timer', //计时器
	]),
		methods: {
			...mapActions([
				'addNum', 'initializeData',
			]),
			//点击下一题
			nextItem(){
				if (this.choosedNum !== null) {
	  			this.choosedNum = null;
	  			//保存答案, 题目索引加一，跳到下一题
	  			this.addNum(this.choosedId)
				}else{
					alert('请作答在继续下一题')
				}
			},
			//索引0-3对应答案A-B
	  	chooseType: type => {
	  		switch(type){
	  			case 0: return 'A';
	  			case 1: return 'B';
	  			case 2: return 'C';
	  			case 3: return 'D';
	  		}
	  	},
	  	//选中的答案信息
	  	choosed(type,id){
	  		this.choosedNum = type;
	  		this.choosedId = id;
	  	},
	  	//到达最后一题，交卷，清空定时器，跳转分数页面
	  	submitAnswer(){
	  		if (this.choosedNum !== null) {
	  			this.addNum(this.choosedId)
	  			clearInterval(this.timer)
	  			this.$router.push('score')
				}else{
					alert('您还没有选择答案哦')
				}
	  	},
		toItem() {
			this.$router.push({path:'/item'});
		}
	},
	created(){
		//初始化信息
		if(this.fatherComponent == 'home') {
			this.initializeData();
		}
	}
}
</script>

<style  scope="scope">
	.num_tip {
		font-size: 24px;
		font-weight: 600;
		text-align: center;
	}
	.item_list {
		list-style: none;
		width: 150px;
	}
	.option_style{
		display: inline-block;
		height: 20px;
		width: 20px;
		padding: 5px;
		border: 1px solid #c3d4be;
		border-radius: 50%;
		text-align: center;
		margin-right: 10px;
		margin-top: 10px;
		font-family: 'Arial';
	}
	.has_choosed{
		background-color: #8cdd95;
		color: #575757;
		border-color: #d2e0ff;
	}
	#btn_answer {
		position: absolute;
		top: 70%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	
	#button_style {
		color: #000;
		border-width: 0;
	}
</style>