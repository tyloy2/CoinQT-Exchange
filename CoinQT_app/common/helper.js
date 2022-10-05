const websiteUrl = 'http://qtadmin.tgbott.com/api';  
const now = Date.now || function () {  
    return new Date().getTime();  
};  
const isArray = Array.isArray || function (obj) {  
    return obj instanceof Array;  
};  
const sysinfo = uni.$tm.u.getWindow();
sysinfo.width = sysinfo.width + 300;
const userinfo = uni.$tm.u.getCookie("userinfo")
export default {  
    websiteUrl,  
    now,  
    isArray,
	 sysinfo,
	 userinfo
	 
}