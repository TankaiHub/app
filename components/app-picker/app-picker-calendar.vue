<template>
	<view class="cmp_app_picker_calendar c_t_sel">
		<view class="t_s_title_wrap c_t_wrap">
			<view class="t_s_title_bd c_t_bd">
				<text class="t_text_bd" @click="onPickerSelectTitle" :class="{ isActive:currentSelectText == '请选择' }">{{currentSelectText}}</text>
				<view class="t_s_close_btn c_t_close_btn" @click="onSelectClear">X</view>
			</view>
		</view>
		<view class="cmp_app_picker_calendar_wrap_bd" v-if="isShowPickerTime">
			<view class="a_p_mask" @click="onMask"></view>
			<view class="minselCity">
				<view class="itmTps">
					<view class="lf" @click="onBtn(false)">取消</view>
					<view class="rg" @click="onBtn(true)">确定</view>
				</view>
				<view class="c_a_cal_wrap">
					<view class="c_a_cal_top">
						<view class="c_a_cal_top_left_btn c_a_cal_btn" @click="onCalBtn(true)"></view>
						<text>2020</text>
						<view class="c_a_cal_top_right_btn c_a_cal_btn" @click="onCalBtn(false)"></view>
					</view>
					<!-- <view class="c_a_cal_bt">
						<view class="c_a_cal_month_item" v-for="(item, index) in 12" :key="index">
							{{item}}
						</view>
					</view> -->
					<div class="c_a_cal_bt">
						<div class="c_a_cal_day_item" v-for="item in 42">
							<div v-if="item - beginDay > 0 && item - beginDay <= curDays" :class="{
					                   'now-day': `${year}-${month}-${item - beginDay}` === curDate,
					                   'active-day': `${year}-${month}-${item - beginDay}` === `${year}-${month}-${day}`,
									   
					                 }"
							 :data-day="`${year}-${month}-${item - beginDay}`" @click="handleChooseDay($event, year, month, item - beginDay)">
								{{ item - beginDay }}
								<!-- 'concat-day': ( (nextTimeLapse - prevTimeLapse > 0) &&   ) -->
							</div>
							<div @click="handlePrev(year, month, item - beginDay)" v-else-if="item - beginDay <= 0" class="other-day">{{ prevDays - beginDay + item}}</div>
							<div @click="handleNext(year, month, item - beginDay)" v-else class="other-day">{{ item - beginDay - curDays }}</div>
						</div>
					</div>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		computed: {
			//
			beginDay() {
				console.log(new Date(this.year, this.month - 1, 1).getDay())
				return new Date(this.year, this.month - 1, 1).getDay();
			},
			curDays() {
				console.log(new Date(this.year, this.month, 0).getDate())
				return new Date(this.year, this.month, 0).getDate();
			},
			prevDays() {
				console.log(new Date(this.year, this.month - 1, 0).getDate())
				return new Date(this.year, this.month - 1, 0).getDate();
			}
		},
		props: {
			inValue: [Number, String],
			isShowDay: {
				type: Boolean,
				default: false
			}
		},
		// model: {
		// 	prop: "inValue",
		// 	event: "onSelect"
		// },
		data() {
			return {
				year: null,
				month: null,
				day: null,
				curDate: null,
				curDay: null,
				/**
				 * 解决动态设置indicator-style不生效的问题
				 */
				visible: true,
				indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`,
				currentSelectText: "请选择",
				isShowPickerTime: false,
				currentTime: '',
				oldTime: '',
				index: 0,
				allSelectDay: {},


				prevYear: null,
				prevMonth: null,
				prevDay: null,
				nextYear: null,
				nextMonth: null,
				nextDay: null, 
				
				prevTimeLapse:'',
				nextTimeLapse:''
			}
		},

		created() {
			this.getInitTime();
		},
		methods: {
			/**
			 * @param {Object} bool true-->left  false---->right
			 */
			onCalBtn(bool) {
				if (bool) {
					this.handlePrev();
				} else {
					this.handleNext();
				}
			},

			getInitTime() {
				const date = new Date();
				this.year = date.getFullYear();
				this.month = date.getMonth() + 1;
				this.day = date.getDate();
				this.curDay = date.getDate();
				this.curDate = `${this.year}-${this.month}-${this.day}`;
			},
			computedDay(month) {
				const day = this.day;
				const year = this.year;
				const allDay = new Date(year, month, 0).getDate();
				if (day > allDay) {
					this.day = allDay;
				}
			},
			handlePrev() {
				var args = arguments;
				if (args.legth > 0) {
					
				}
				if (this.month === 1) {
					this.month = 12;
					this.year--;
				} else {
					this.month--;
				}
				this.computedDay(this.month);
			},
			handleNext() {
				if (this.month === 12) {
					this.month = 1;
					this.year++;
				} else {
					this.month++;
				}
				this.computedDay(this.month);
			},
			handleChooseDay(e, year, month, day) {
				console.log(e)
				this.day = day;
				if (this.index == 2) {
					this.clearData();
					this.index = 0;
				} 
				if (this.index == 0) {
					this.oldTime = day;
					this.prevYear = year;
					this.prevMonth = month;
					this.prevDay = day;
					this.prevTimeLapse = new Date(year, month, day).getTime();
					++this.index;
				} else if (this.index == 1) {
					this.currentTime = day;
					if (this.oldTime && this.currentTime) { 
						if (this.oldTime > this.currentTime) {
							this.currentTime = '';
							this.oldTime = day;
							this.prevYear = year;
							this.prevMonth = month;
							this.prevDay = day; 
							this.prevTimeLapse = new Date(year, month, day).getTime();
							return;
						}
						if (this.oldTime == this.currentTime) return;
					}
					this.nextYear = year;
					this.nextMonth = month;
					this.nextDay = day;
					this.nextTimeLapse = new Date(year, month, day).getTime();
					++this.index;
				}
			},

			clearData() {
				this.currentTime = null;
				this.nextYear = null;
				this.nextMonth = null;
				this.nextDay = null;
				this.oldTime = null;
				this.prevYear = null;
				this.prevMonth = null;
				this.prevDay = null;
			},




			bindChange(e) {
				const val = e.detail.value;
				console.log(this.currentSelectText, val)
				this.value = val;
			},
			onBtn(flag) { // 回调函数 取消或确定 
				this.isShowPickerTime = false;
				var obj = {};
				obj.year = this.year;
				obj.curDate = this.curDate;
				obj.month = this.month;
				obj.day = this.curDay;
				obj.startTime = this.oldTime;
				obj.endTime = this.currentTime;
				obj.startTimeArr = [this.prevYear, this.prevMonth, this.prevDay];
				obj.endTimeArr = [this.nextYear, this.nextMonth, this.nextDay];
				obj.prevTimeLapse = this.prevTimeLapse;
				obj.nextTimeLapse = this.nextTimeLapse;
				console.log(obj)
				var currntVal = this.currentSelectText;
				if (flag) {
					this.currentSelectText = currntVal;
					// this.allSelectDay = 
				}
			},
			onMask() {
				this.isShowPickerTime = false;
			},
			onPickerSelectTitle() {
				this.isShowPickerTime = true;
			},
			onSelectClear() {
				var oldVal = this.currentSelectText;
				this.currentSelectText = "请选择";
				if (oldVal == this.currentSelectText) {
					return;
				}
				this.currentSelect = {};
				this.$emit("onSelectClear");
			},
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");

	.cmp_app_picker_calendar {
		.isActive {
			color: #ccc;
		}
	}

	.cmp_app_picker_calendar_wrap_bd {
		position: fixed;
		z-index: 5;
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;

		.a_p_mask {
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			background: rgba(0, 0, 0, .5);
			z-index: 100;
		}

		.minselCity {
			position: absolute;
			bottom: 0;
			left: 0;
			margin-top: 20px;
			width: 100vw;
			height: 650upx;
			background-color: #FFFFFF;
			z-index: 100;
		}

		.itmTps {
			width: 100vw;
			height: 88upx;
			border-bottom: 1upx solid #f3f5f9;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.lf,
			.rg {
				font-size: 30upx;
				width: 88upx;
				display: flex;
				justify-content: center;
				align-items: center;
				height: 88upx;
			}

			.lf {
				color: #666;
			}

			.rg {
				color: #000;
			}
		}

		.c_a_cal_wrap {
			.c_a_cal_top {
				margin: 10px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1px solid #ccc;
				height: 35px;

				.c_a_cal_btn {
					width: 20px;
					height: 20px;
					border: 1px solid #ccc;
				}

			}

			.c_a_cal_bt {
				margin: 10px;

				.c_a_cal_day_item {
					float: left;
					width: 14.1%;
					height: 35px;
					text-align: center;

					.other-day {
						color: #ccc;
					}

					.now-day {
						background-color: #007fff;
						color: #fff;
						font-weight: 600;
					}

					.concat-day {
						background-color: red;
					}

					.active-day:not(.now-day) {
						color: #007fff;
						border: 2px solid #007fff;
					}
				}

				.c_a_cal_month_item {
					float: left;
					width: 25%;
					height: 60px;
					line-height: 60px;
					text-align: center;
				}
			}
		}

	}
</style>
