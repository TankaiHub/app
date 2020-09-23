import data from './address.json'

function changeTime(time, format) {
	var type = typeof time;
	if (time == null && time == undefined) return "无";
	var date = new Date().getTime() + '';
	if (type == 'number') {
		time = '' + time;
	} 
	if (time.length < date.length) {
		time = time * 1000; 
	} 
	var d = new Date((time)),
		y = d.getFullYear(),
		m = ('0' + (d.getMonth() + 1)).slice(-2),
		day = ('0' + d.getDate()).slice(-2),
		h = ('0' + d.getHours()).slice(-2),
		min = ('0' + d.getMinutes()).slice(-2),
		sec = ('0' + d.getSeconds()).slice(-2);
	switch (format) {
		case 'yy-mm-dd':
			return y + '-' + m + '-' + day;
		case "yy-mm-dd hh-mm-ss":
			return y + '-' + m + '-' + day + '  ' + h + ':' + min + ':' + sec;
		case "yy/mm/dd":
			return y + '/' + m + '/' + day;
		case "yy/mm":
			return y + '/' + m;
		case "yy-mm":
			return y + '-' + m;
	}
}

function merge(target) {
	for (let i = 1, j = arguments.length; i < j; i++) {
		let source = arguments[i] || {};
		for (let prop in source) {
			if (source.hasOwnProperty(prop)) {
				let value = source[prop];
				if (value !== undefined) {
					target[prop] = value;
				}
			}
		}
	}

	return target;
}

function deepClone(origin, target) {
	var target = target || {},
		toStr = Object.prototype.toString,
		arrStr = '[object Array]';
	for (var prop in origin) {
		if (origin.hasOwnProperty(prop)) {
			if (origin[prop] !== 'null' && typeof(origin[prop]) == 'object') {
				target[prop] = (toStr.call(origin[prop]) == arrStr) == arrStr ? [] : {};
				deepClone(origin[prop], target[prop]);
			} else {
				target[prop] = origin[prop];
			}
		}
	}
	return target;
}

function DivideAthousandTime(time) { 
	console.log(time)
	if (time == '') {
		return '';
	} else {
		return Math.floor(time / 1000);
	}
}

function flatData(data = [], arr, rank = 0, parentArr = []) {
	for (var i = 0; i < data.length; i++) {
		var temp = data[i];
		arr.push({
			address: temp.address,
			level: temp.level,
			number: temp.number,
			rank,
			parentArr
		});
		if (Array.isArray(temp.option) && temp.option.length > 0) {
			let parents = [...parentArr];
			parents.push({
				address: temp.address,
				level: temp.level,
				number: temp.number,
			});
			flatData(temp.option, arr, rank + 1, parents);
		}
	}
	return arr;
}

function getAddress(number) {
	var arr = [];
	var all = flatData(data, arr);
	var current;
	for (var i = 0; i < all.length; i++) {
		if (number == all[i].number) {
			current = all[i];
		}
	}
	return current;
}




export {
	changeTime,
	merge,
	DivideAthousandTime,
	getAddress,
	deepClone
}
