function changeTime(time, str) {
	var d = new Date(time * 1000),
		y = d.getFullYear(),
		m = ('0' + (d.getMonth() + 1)).slice(-2),
		day = ('0' + d.getDate()).slice(-2);
	return y + str + m + str + day;
}

export {
	changeTime
}