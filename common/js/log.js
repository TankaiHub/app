import {
	isOpenLog
} from "@/utils/config.js"

 
var getStackTrace = function() {
  var obj = {};
  Error.captureStackTrace(obj, getStackTrace);
  return obj.stack;
};
export default function log() {
	if (isOpenLog) {
		console.log.apply(console, arguments)
		// console.log(getStackTrace().split(/\n+/)[2].replace(/(^\s+|\s+$)at VueComponent\./,""))
		// var console = window.console;
		// 
	}
}
