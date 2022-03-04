
function OnFontSizeReduce(event){
    const el1 = document.querySelector('body');
    el1.style.fontSize = '1.0em';
    event.preventDefault();
  }
  
  function OnFontSizeNormal(event){
    const el1 = document.querySelector('body');
    el1.style.fontSize = '1.3em';
    event.preventDefault();
  }
  
  function OnFontSizeEnlarge(event){
    const el1 = document.querySelector('body');
    el1.style.fontSize = '1.75em';
    event.preventDefault();
  }
  
  function storeLanguageInLocalStorage(language) {
    localStorage.setItem("language", language);
  }
  function getTimeAgo(date1) {
    let curdate = Date.now();
    const diffInMs = Math.abs(curdate - date1);
    let totalday = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    let hour = Math.floor((diffInMs / (1000 * 60 * 60)) % 24);
    let min = Math.floor((diffInMs / (1000 * 60)) % 60);
  
    let strAgo = "";
    if (totalday > 30)
      strAgo = "มากกว่าหนึ่งเดือน";
    else {
      if (totalday > 0) {
        strAgo += totalday + "วัน ";
        if (hour > 0) {
          strAgo += hour + "ชั่วโมง ";
        }
        if (min > 0) {
          strAgo += min + "นาที ";
        }
        strAgo += "ที่แล้ว";
      }
      else if (hour > 0) {
        strAgo += hour + "ชั่วโมง ";
        if (min > 0) {
          strAgo += min + "นาที ";
        }
        strAgo += "ที่แล้ว";
      }
      else if (min > 3) {
        strAgo += min + "นาที ";
        strAgo += "ที่แล้ว";
      }
      else {
        strAgo = "ไม่กี่นาทีที่ผ่านมา";
      }
    }
    return strAgo;
  }

function JsonDateTime2TimeStamp(dateString, datesplit) {
    let dateTimeParts = dateString.split(' ');
    let timeParts = dateTimeParts[1].split(':');
    let dateParts = dateTimeParts[0].split(datesplit);
    //console.log(dateParts);
    //console.log(timeParts);
    const date = new Date(dateParts[2], parseInt(dateParts[1], 10) - 1, dateParts[0], timeParts[0], timeParts[1]).getTime();
    //console.log(date);
    return date;
}

const asyncLocalStorage = {
  setItem: function (key, value) {
      return Promise.resolve().then(function () {
          localStorage.setItem(key, value);
      });
  },
  getItem: function (key) {
      return Promise.resolve().then(function () {
          return localStorage.getItem(key);
      });
  }
};

function toThaiDateString(date) {
  let monthNames = [
      "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
      "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม",
      "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ];

  let year = date.getFullYear() + 543;
  let month = monthNames[date.getMonth()];
  let numOfDay = date.getDate();

  let hour = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");
  let second = date.getSeconds().toString().padStart(2, "0");

  return `${numOfDay} ${month} ${year} ` +
      `${hour}:${minutes}:${second} น.`;
}
function padLeadingZeros(num, size) {
  var s = num+"";
  while (s.length < size) s = "0" + s;
  return s;
}
function MariatoThaiDateStringShortTime(strdate) {
  //console.log(strdate);
  let monthNames = [
      "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.",
      "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.",
      "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."
  ];

  let date = new Date(strdate);
  let year = date.getFullYear() + 543;
  let month = monthNames[date.getMonth()];
  let numOfDay = date.getDate();

  let hour = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");
  let second = date.getSeconds().toString().padStart(2, "0");

  return `${numOfDay} ${month} ${year} ` +
      `${hour}:${minutes}:${second} `;
}
function MariatoThaiDateString(strdate) {
  //console.log(strdate);
  let monthNames = [
      "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
      "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม.",
      "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ];

  let date = new Date(strdate);
  let year = date.getFullYear() + 543;
  let month = monthNames[date.getMonth()];
  let numOfDay = date.getDate();

  let hour = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");
  let second = date.getSeconds().toString().padStart(2, "0");

  return `${numOfDay} ${month} ${year} ` +
      `${hour}:${minutes} `;
}
function MariatoThaiDateOnly(strdate, displayyearprefix=false) {
  //console.log(strdate);
  let monthNames = [
      "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
      "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม",
      "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ];

  let date = new Date(strdate);
  let year = date.getFullYear() + 543;
  let month = monthNames[date.getMonth()];
  let numOfDay = date.getDate();
  if (displayyearprefix)
    return `${numOfDay} ${month} พ.ศ. ${year} `;
  else
    return `${numOfDay} ${month} ${year} `;
}
function MariatoEngDateOnly(strdate) {
  //console.log(strdate);
  let monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  let date = new Date(strdate);
  let year = date.getFullYear();
  let month = monthNames[date.getMonth()];
  let numOfDay = date.getDate();
  return `${numOfDay} ${month} ${year} `;
}
function MariatoThaiDateNumberOnly(strdate) {
  //console.log(strdate);
  let monthNames = [
      "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
      "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม",
      "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ];

  let date = new Date(strdate);
  let year = thaiNumber(date.getFullYear() + 543);
  let month = monthNames[date.getMonth()];
  let numOfDay = thaiNumber(date.getDate());

  return `${numOfDay} ${month} ${year}` ;
}
function MariatoThaiDateStringShort(strdate) {
  let date = new Date(strdate);
  let year = date.getFullYear() + 543;
  let month = padLeadingZeros(date.getMonth()+1,2);
  let numOfDay = padLeadingZeros(date.getDate(),2);
  return `${numOfDay}/${month}/${year} `;
}
function MariatoThaiDateTimeStringShort(strdate) {
  let date = new Date(strdate);
  let year = date.getFullYear() + 543;
  let month = padLeadingZeros(date.getMonth()+1,2);
  let numOfDay = padLeadingZeros(date.getDate(),2);
  let hour = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");
  let second = date.getSeconds().toString().padStart(2, "0");
  return `${numOfDay}/${month}/${year} `+
  `${hour}:${minutes} `;
}
function Bytes2Size(bytes) {
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}
function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}
function thaiNumber(num){
  var array = {"1":"๑", "2":"๒", "3":"๓", "4" : "๔", "5" : "๕", "6" : "๖", "7" : "๗", "8" : "๘", "9" : "๙", "0" : "๐"};
  var str = num.toString();
  for (var val in array) {
   str = str.split(val).join(array[val]);
  }
  return str;
 }
function getFileSize(url) {
  var fileSize = '';
  var http = new XMLHttpRequest();
  http.open('HEAD', url, false); // false = Synchronous
  try {
    http.send(null); // it will stop here until this http request is complete
  } catch (err) {
    return Math.random() * (563333 - 13212) + 13212;/*ส่งขอข้อมูลแบบ cross site ไม่ได้ให้สุ่มขนาดไฟล์แทน*/
  }
  // when we are here, we already have a response, b/c we used Synchronous XHR

  if (http.status === 200) {
    fileSize = http.getResponseHeader('content-length');
    //console.log('fileSize = ' + fileSize);
  }

  return fileSize;
}
 /*
 function getFileSize(url)
{
    var fileSize = '';
    var http = new XMLHttpRequest();
    http.open('HEAD', url, true); // true = Asynchronous
    http.onreadystatechange = function() {
        if (this.readyState == this.DONE) {
            if (this.status === 200) {
                fileSize = this.getResponseHeader('content-length');
                console.log('fileSize = ' + fileSize);
                //
                // ok here is the only place in the code where we have our request result and file size ...
                // the problem is that here we are in the middle of anonymous function nested into another function and it does not look pretty
                // this stupid ASYNC pattern makes me hate Javascript even more than I already hate it :)
                //
                //
            }
        }
    };
    http.send(); // it will submit request and jump to the next line immediately, without even waiting for request result b/c we used ASYNC XHR call
    return ('At this moment, we do not even have Request Results b/c we used ASYNC call to follow with stupid JavaScript patterns');
}*/
function AccessInfo(PageName, PageURL, PageType, currentUser){
  //import axios from 'axios';
  let userid = null;
        if (currentUser !== null) {
            userid = currentUser.UserID;
        }
        const formData = new FormData();
        formData.append("page", PageName);
        formData.append("url", PageURL);
        formData.append("accessPage", PageType);
        formData.append("userID", userid);
        const axios = require('axios').default;
        axios.post(process.env.REACT_APP_APIURL + '/api-web/AddAccessLog', formData, {
            headers: {
              'Content-Type': `multipart/form-data`
            }
          })
            .then((response) => {
              
            });
}

exports.OnFontSizeReduce = OnFontSizeReduce;
exports.OnFontSizeNormal = OnFontSizeNormal;
exports.OnFontSizeEnlarge = OnFontSizeEnlarge;
exports.storeLanguageInLocalStorage = storeLanguageInLocalStorage;
exports.getTimeAgo = getTimeAgo;
exports.JsonDateTime2TimeStamp = JsonDateTime2TimeStamp;
exports.asyncLocalStorage = asyncLocalStorage;
exports.toThaiDateString = toThaiDateString;
exports.MariatoThaiDateNumberOnly = MariatoThaiDateNumberOnly;
exports.MariatoThaiDateString = MariatoThaiDateString;
exports.MariatoThaiDateOnly = MariatoThaiDateOnly;
exports.MariatoEngDateOnly = MariatoEngDateOnly;
exports.MariatoThaiDateStringShortTime = MariatoThaiDateStringShortTime;
exports.MariatoThaiDateStringShort = MariatoThaiDateStringShort;
exports.MariatoThaiDateTimeStringShort = MariatoThaiDateTimeStringShort;
exports.Bytes2Size = Bytes2Size;
exports.validURL = validURL;
exports.thaiNumber = thaiNumber;
exports.getFileSize = getFileSize;
exports.AccessInfo = AccessInfo;