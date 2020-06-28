let topBarInfo = document.getElementById("topBar__info");

let entryModal = document.getElementById("entryBlock");
let entryForm = document.getElementById("entryForm");
let entryEmail = document.getElementById("entryFormEmail");
let entryPassword = document.getElementById("entryFormPassword");
let errMes = document.getElementById("errMessage");

let mapBlock = document.getElementById("mapPage");

let usersData = [
    {login: "sasha@mail.ru",
    password: "qwwq"},
    {login: "slava@mail.ru",
    password: "qwwq"}
];

window.addEventListener("load", checkLocalStor);

function checkLocalStor(){
    if(!adminUsers()){
        if(localStorage.getItem("login:")){
            entryModal.style.display="none";
            console.log("user log");
            topBarInfo.innerText=localStorage.getItem("login:");
        }
    }else{
        console.log("admin log");
    };
    function adminUsers (){for(i=0; i<usersData.length; i++){
        if(usersData[i].login==localStorage.getItem("login:")){
            if(usersData[i].password==localStorage.getItem("password:")){
                entryModal.style.display="none";
                return "loginAndPasswordFromLS";
            }
    }
    }}
}



entryEmail.addEventListener("input", checkLength);
entryPassword.addEventListener("input", checkLength);






function checkLength(){
    if (entryEmail.value.length<3 || entryPassword.value.length<3){
        entryButtonLog.disabled="true";

        entryButtonReg.disabled="true";
    }else{
        entryButtonLog.removeAttribute("disabled");

        entryButtonReg.removeAttribute("disabled");
    }
};





function logIn(){
    if(allCheck()=="userNotFound"){
        errMes.innerText="Пользователь не найден"
    }else if(allCheck()=="allGood"){
        entryModal.style.display="none";
        topBarInfo.innerText=entryEmail.value;
    };

    allCheck();

    console.log(check(entryEmail.value));
};


function registration(){
    allCheck();
    if(allCheck()=="allGood" || allCheck()=="badPassword"){
        errMes.innerText="Пользователь уже существует"
    }else if(allCheck()=="userNotFound"){
        localStorage.setItem("login:", entryEmail.value);
        localStorage.setItem("password:", entryPassword.value);
        entryModal.style.display="none";
        topBarInfo.innerText=entryEmail.value;
    // let newUser = {Login: entryEmail.value, password: entryPassword.value};
    // usersData.push(newUser);
    // console.log(usersData);
    }
};




function check (us){
        for(i=0; i<usersData.length; i++){
            if(usersData[i].login==us){
                if(usersData[i].password==entryPassword.value){
                    return "loginAndPasswordCorrect";
                }else{
                    return "loginCorrect";
                }
        }
        }
};






function allCheck(){
    if (entryEmail.value.length<3){
        errMes.innerText="Вы не ввели email или пароль";
        return "shortEmail";
    }else if(!entryEmail.checkValidity()){
        errMes.innerText="Вы ввели некорректный email адрес";
        return "badEmail";
    }else if(check(entryEmail.value)=="loginCorrect"){
        errMes.innerText="Вы ввели неверный пароль";
        return "badPassword";
    }else if(check(entryEmail.value)==="loginAndPasswordCorrect"){
        return "allGood"
    }else if(check(entryEmail.value)==undefined){
        return"userNotFound"
    }
}



//Главная страница

let mainPageData = document.getElementById("mainPage__loginData");

function addMainInformation(){
    let mainpageInfo = `<p>Ваш браузер:${navigator.appCodeName}<br> Ваша платформа:${navigator.platform}</p>`;
    mainPageData.innerHTML=mainpageInfo;
};
addMainInformation();

//Переключения

let menuMain = document.getElementById("menu__main");
let menuClients = document.getElementById("menu__clients");
let menuMap = document.getElementById("menu__map");

let mainPage = document.getElementById("mainPage");
let clientsPage = document.getElementById("clientsBlock");

menuMain.addEventListener("click", menuMainClick);
function menuMainClick(){
    menuMain.style.backgroundColor="rgba(36, 31, 31, 0.801)";
    menuMain.style.border="1px solid rgba(13, 243, 13, 0.801)";

    menuClients.style.backgroundColor="rgba(36, 31, 31, 0.05)";
    menuClients.style.border="none";

    menuMap.style.backgroundColor="rgba(36, 31, 31, 0.05)";
    menuMap.style.border="none";

    mainPage.style.display="block";
    clientsPage.style.display="none";
    mapBlock.style.display="none";
}

menuClients.addEventListener("click", menuClientsClick);
function menuClientsClick(){
    menuMain.style.backgroundColor="rgba(36, 31, 31, 0.05)";
    menuMain.style.border="none";

    menuClients.style.backgroundColor="rgba(36, 31, 31, 0.801)";
    menuClients.style.border="1px solid rgba(13, 243, 13, 0.801)";

    menuMap.style.backgroundColor="rgba(36, 31, 31, 0.05)";
    menuMap.style.border="none";

    mainPage.style.display="none";
    clientsPage.style.display="block";
    mapBlock.style.display="none";
}

menuMap.addEventListener("click", menuMapClick);
function menuMapClick(){
    menuMain.style.backgroundColor="rgba(36, 31, 31, 0.05)";
    menuMain.style.border="none";

    menuClients.style.backgroundColor="rgba(36, 31, 31, 0.05)";
    menuClients.style.border="none";

    menuMap.style.backgroundColor="rgba(36, 31, 31, 0.801)";
    menuMap.style.border="1px solid rgba(13, 243, 13, 0.801)";

    mainPage.style.display="none";
    clientsPage.style.display="none";
    mapBlock.style.display="block";
}


//Страница клиенты

let tableClients = document.getElementById("clients");

let answ; 
function getData(){
    let response = fetch("https://gist.githubusercontent.com/oDASCo/3f4014d24dc79e1e29b58bfa96afaa1b/raw/677516ee3bd278f7e3d805108596ca431d00b629/db.json")
    .then(response=>response.json())
    .then (data=>{
        answ=data;

        console.log(answ);
    })


    .then(

       ()=>{ createTab()} 

        
    )
    
}; 

getData();





//функция создания таблицы

let hMW = 0;
let hMM = 0;
let maxMoney = 0;
let clientsInfBlock = document.getElementById("clientsInformationBlock");

let createTab= function(){
    for(i=0; i<answ.length; i++){
        //дата
        let strData = answ[i].registered;
        let arrData = strData.split(" ");
        let strRData = arrData.join("");
        let dataParse = Date.parse(strRData);
        let normalDate = new Date(dataParse);
        let day = normalDate.getDate();
        if(day<10){day=`0${day}`;};
        let mounths = normalDate.getMonth();
        if(mounths<10){mounths=`0${mounths}`;};
        let year = normalDate.getFullYear();
        let readyDate = `${day}.${mounths}.${year}`;

        //заполнение таблицы
        let k = document.createElement("tr");
        k.id=i;
        k.className="myTableRow";
        k.innerHTML=`<td>${i+1}</td> <td>${answ[i].name}</td> <td>${answ[i].company}</td> <td>${answ[i].email}</td> <td>${answ[i].phone}</td> <td>${answ[i].balance}</td> <td>${readyDate}</td> <td><button class="deleteButtons" onclick="deleteRow(${i})">Удалить</button></td>`;
        tableClients.append(k);

        //цвет строчек
        if(answ[i].isActive==false){
            k.style.backgroundColor="grey";
        };
        //добавление информации в шапку
        if(answ[i].gender=="female"){
            hMW +=1;
        }else if(answ[i].gender=="male"){
            hMM +=1;
        };
        //добавление max money
        let someMoney;
        someMoney=answ[i].balance;
        someMoney=someMoney.replace("$","");
        someMoney=someMoney.replace(",","");
        someMoney=someMoney.replace(".","");
        if(someMoney>maxMoney){
            maxMoney=someMoney;
        }

    };
    clientsInfBlock.innerHTML=`<p>Число женщин: ${hMW}<br>Число мужчин: ${hMM}<br>Максимальная сумма: $${maxMoney}</p>`;
    hMW = 0;
    hMM = 0;
    maxMoney = 0;
};







//Кнопки удаления
let modalMes = document.getElementById("modalMessage");

let modalDel = document.getElementById("modalDelete");
let numOfDel;
function deleteRow (num){
    numOfDel=num;
    modalDel.style.display="block";
};
function clickDel(answer){
    if(!answer){
        modalDel.style.display="none";
    }else{
        answ.splice(numOfDel, 1);
        console.log(answ);

        let oldTable = document.querySelectorAll(".myTableRow");
        for(i=0; i<oldTable.length; i++){
            let el = oldTable[i];
            el.remove();
        };
        createTab();
        modalDel.style.display="none";
        modalMes.style.display="block";
        setTimeout(()=>{
            modalMes.style.display="none";
        },5000);
    }
};
//Модалка об успешном удалении
function closeModalMessage (){
    modalMes.style.display="none";
};

//стрелка для скролла вверх
let arrow = document.getElementById("upButton");
window.addEventListener("scroll", ()=>{
    console.log(window.pageYOffset);
    if(window.pageYOffset>1484){
        arrow.style.display="block";
    }else{
        arrow.style.display="none";
    }
});
function moveUp(){
    window.scrollTo(0,0);
}

//карта
function initMap(){
    let myLatlng = new google.maps.LatLng(53.895867, 27.548020);
    let myOptions = {
		zoom: 13,
		center: myLatlng,
		
    }
    let map = new google.maps.Map(document.getElementById("mapPage"), myOptions);
    
    let mark1 = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title:"Офис"
    });
    let mark2 = new google.maps.Marker({
        position: {lat:53.894625, lng:27.555458},
        map: map,
        title:"Склад"
    });
    let mark3 = new google.maps.Marker({
        position:{lat:53.885031, lng:27.540063},
        map: map,
        title:"Наш магазин"
    });
    // создание инфы
    let contentMark1 = "<div id=content>Это офис</div>";
    let infWind1 = new google.maps.InfoWindow({
        content: contentMark1
    });
    google.maps.event.addListener(mark1, "click", ()=>{
        infWind1.open(map, mark1);
    });

    let contentMark2 = "<div id=content>Это склад</div>";
    let infWind2 = new google.maps.InfoWindow({
        content: contentMark2
    });
    google.maps.event.addListener(mark2, "click", ()=>{
        infWind2.open(map, mark2);
    });

    let contentMark3 = "<div id=content>Это наш магазин</div>";
    let infWind3 = new google.maps.InfoWindow({
        content: contentMark3
    });
    google.maps.event.addListener(mark3, "click", ()=>{
        infWind3.open(map, mark3);
    });
};

