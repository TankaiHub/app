import allUrl from './url.js'
import log from '../common/js/base.js'
class Request {
	// baseUrl = 'http://api.cqgmaq.com/'
	baseUrl = 'http://spmsapi.cqxddwl.com/'
	getData(obj, isShowLoading, isJudge) {
		if (isShowLoading) {
			uni.showLoading({
			    title: '加载中'
			});
		}
		var _this = this;
		obj.url = this.baseUrl + allUrl[obj["url"]];
		try {
			const token = uni.getStorageSync('token');
			if (token) {
				if (obj.header) {
					obj.header["pp-token"] = token;
				} else {
					obj.header = {
						"pp-token": token
					};
				} 
			}
			return new Promise((resolve, reject) => {
				uni.request({
					...obj,
					success(res) {
						if (isShowLoading) {
							uni.hideLoading();
						}
						if (res.statusCode) {
							if (res.data.code == 200) {
								resolve(res.data);
							} else {
								if(isJudge) {
									resolve(res);
								}else {
									_this._showError(res.data);
								}
								
							}
						}
						
					},
					fail(err) {
						if (isShowLoading) {
							uni.hideLoading();
						}
						reject(err);
						_this._showError(err, true);
						
					}, 
				})
			})
		} catch (e) {
			log(e);
			log("获取不到token");
			if (isShowLoading) {
				uni.hideLoading();
			}
		}

	} 
	/**
	 * url  
	 * data
	 * isShowLoading 是否显loading
	 * isJudge 是否判断
	 */
	post(url, data = {}, isShowLoading = true, isJudge = false) {
		return this.getData({
			url,
			data,
			method: "POST"
		}, isShowLoading, isJudge);
	}
	get(url, data = {}, isShowLoading = true, isJudge = false) {
		return this.getData({
			url,
			data,
			method: "GET"
		},isShowLoading, isJudge);
	}

	_showError(data, bool) {
		if (bool) {
			uni.showToast({
				title: "网络错误",
				icon: "none"
			})
		} else {
			var text = data.msg
			uni.showToast({
				title: text,
				icon: "none"
			})
		}
	}
}

export {
	Request
}
