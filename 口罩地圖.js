//處理日期
var date=new Date();
var day=date.getDay();
console.log(date);
console.log(day);



//星期轉換中文
function judgedate(day){
    switch(day){
        case 1: return ('一');
        case 2: return ('二');
        case 3: return ('三');
        case 4: return ('四');
        case 5: return ('五');
        case 6: return ('六');
        case 7: return ('日');
    }
}
var chinesedate=judgedate(day);

$(document).ready(function(){
    $('.time').text('星期'+chinesedate);
});

$(document).ready(function(){
    $('.day').text(moment().add(10, 'days').calendar());
});

console.log(moment().format('dddd'));


//設定資格
if(moment().format('dddd')=='Monday'|moment().format('dddd')=='Wednesday'|moment().format('dddd')=='Friday'){
    let number='身分證字號末碼單號者';
    let number2="1、3、5、7、9";
    let number3="可購買";
    document.querySelector(".quality").innerHTML=`<span>${number}</span><span style="color:yellow">${number2}</span><span>${number3}</span>`;
}
else if(moment().format('dddd')=='Tuesday'|moment().format('dddd')=='Thursday'|moment().format('dddd')=='Saturday'){
    console.log('身分證字號末碼雙號者 0、2、4、6、8可購買');
}
else{
    console.log('今天休息日，不可購買口罩');
}


//取資料
var xhr=new XMLHttpRequest();
xhr.open('get','https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json',false);
xhr.send(null);
console.log(xhr);
var str= JSON.parse(xhr.responseText);
console.log(str);
console.log(str.features[0].properties.name);
console.log(str.features[0].properties.county)
console.log(str.features);
console.log(str.features.length);

//查藥局function
function changecounty(){
var pharmacy=document.querySelector('.insidepharmacy');
var county=document.querySelector('#county');
var city=county.value;
console.log(city);
array="";
for(let i=0;i<str.features.length;i++){
    if(str.features[i].properties.county ==city){

        const name =str.features[i].properties.name;
        const address =str.features[i].properties.address;
        const phone =str.features[i].properties.phone;
        const timey =str.features[i].properties.note;
        const adult =str.features[i].properties.mask_adult;
        const child =str.features[i].properties.mask_child;
        array=array+`<div class="pharmacy">
                <p id="name">${name}</p>
                <p id="address">${address}</p>
                <p id="phone">${phone}</p>
                <p id="timey">${timey}</p> 
                <div class="inside">
                    <p id="adult" class="capsule">${'成人口罩   '+adult}</p>
                    <p id ="child"  class="capsule">${'小孩口罩   '+child}</p>
               </div>
               
            </div>
            <hr>`
    }
    pharmacy.innerHTML=array;
    }
}
    var countychange=document.querySelector('#county');   
    countychange.addEventListener('change',changecounty,false);   
    changecounty();
   


    console.log(str.features[0].geometry.coordinates[0]);

    //地圖專區
    var countychange1=document.querySelector('#county');
    countychange1.addEventListener('change',changemap,false);
    

    var map = L.map('map').setView([25.033671, 121.564427], 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var greenIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    var markers = new L.MarkerClusterGroup().addTo(map);;

    function changemap(){
    for (let i = 0; i<str.features.length; i++) {
        var county=document.querySelector('#county');
        var city=county.value;
        if(str.features[i].properties.county ==city){
        //L.map('map').setView([str.features[i].geometry.coordinates[1], str.features[i].geometry.coordinates[0]], 16);
        markers.addLayer(L.marker([str.features[i].geometry.coordinates[1], str.features[i].geometry.coordinates[0]], { icon: greenIcon }))
        .bindPopup('<h1>測試藥局</h1><p>成人口罩：50<br>兒童口罩:50</p>')
        
      
    }
    }
    map.addLayer(markers);

    }
    changemap();