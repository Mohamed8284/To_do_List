function returnDate() {
    let taskDate=new Date();
    return `${taskDate.getFullYear()}/${taskDate.getMonth()+1}/${taskDate.getDate()}`;
}
let directionLtrRtl="ltr";
let LtrRtl=document.querySelector(".header .language");
let languageelement=document.querySelector(".header .language");
let language={
    header:{
        bar:{
            barName:{
                "Arabic":"المهام",
                "English":"Tasks"
            },
            barButtn:{
                add:{
                    "Arabic":"أضف",
                    "English":"add"
                },
                new:{
                    "Arabic":"جديد",
                    "English":"new"
                }
            }
        },
        direction:{
            "Arabic":"عربي", 
            "English":"English"
        },
        deleteAll:{
            "Arabic":"حذف الكل", 
            "English":"Delete All"
        }
    },
    task:{
        taskName:{
            taskPlaceHolder:{
                "Arabic":"اسم المهمة",
                "English":"Task Name"
            },
            taskPlaceHolderError:{
                "Arabic":"اسم المهمة مطلوب",
                "English":"task Name is requird"
            }
        },
        content:{
            placeHolder:{
                "Arabic":"اكتب المحتوي",
                "English":"Type the Content"
            }
        }
    },
    popup:{
        "Arabic":"متأكد؟",
        "English":"Sure?"
    }
};
let tasksElement = {
    createTask(taskName,taskContent,taskDate,taskKind="output")
    {
        let handeler;
        // console.log(taskContent);
        let task = document.createElement("div");
        task.className = "task";
        let tasks;
        if(taskKind==="output")
            tasks= document.querySelector(".tasks .content");
        else if(taskKind==="input")
            tasks = document.querySelector(".tasks .header");
        tasks.appendChild(task);
        let move=document.createElement("div");
        task.appendChild(move);
        let expandedContent = document.createElement("div");
        let p = document.createElement("p");
        let screen = document.createElement("div");
        let cleared;
        function createChoises() {
            let choises=document.createElement("div");
            choises.className = "choises";
            task.appendChild(choises);
        }
        function craeteCheck()
        {
            let check = document.createElement("div");
            check.className = "check";
            // check.setAttribute("check-content",`\f00c`);
            check.onclick = function() {
                check.classList.toggle("checked");
                if (check.classList.contains("checked")) {
                    check.innerHTML=`<i class="fa-solid fa-check"></i>`;
                    check.nextElementSibling.style.backgroundColor = "#ecfb54";
                } else {
                    if(check.innerHTML!=="")check.innerHTML="";
                    check.nextElementSibling.removeAttribute("style");
                }
            }
            task.appendChild(check);
        }
        function createTaskName()
        {
            if(taskKind==="output") {
                let nameE = document.createElement("div");
                task.appendChild(nameE);
                nameE.className = "task-name";
                nameE.classList.add("output");
                nameE.innerHTML = `${taskName}`;
            }
            else if(taskKind==="input"){
                let nameE = document.createElement("input");
                task.appendChild(nameE);
                nameE.className = "task-name";
                nameE.classList.add("input-p");
                nameE.addEventListener("blur",function(){
                    taskName=nameE.value;
                });
            }
        }
        function createMove()
        {
            move.className="move";
            move.classList.add(directionLtrRtl);
            move.style.top = "30%";
            function createUp()
            {
                let up = document.createElement("div");
                up.className = "up";
                move.appendChild(up);
                up.onclick = function() {
                    if (task.previousElementSibling !== null) {
                        let x = task.previousElementSibling;
                        task.previousElementSibling.remove();
                        task.after(x);
                    }
                }
            }
            function createDown()
            {
                let down = document.createElement("div");
                down.className = "down";
                down.onclick = function() {
                    if (task.nextElementSibling !== null) {
                        let x = task.nextElementSibling;
                        task.nextElementSibling.remove();
                        task.before(x);
                    }
                }
                move.appendChild(down);
            }
            createUp();
            createDown();
        }
        function createDetails(){
            let details = document.createElement("div");
            task.appendChild(details);
            details.className = "details";
            details.classList.add(directionLtrRtl);
            details.innerHTML = `<i class="fa-solid fa-angle-down"></i>`;
            details.addEventListener("click",function() {
                details.classList.toggle("clicked");
                if (!task.classList.contains("expanded-task")) {
                    details.innerHTML = `<i class="fa-solid fa-angle-up"></i>`;
                    move.style.top = "53%";
                    move.style.transition = "0.3s";
                    task.classList.add("expanded-task");
                    task.style.height = "225px";
                    task.style.transition = "0.3s";
                    task.style.alignItems = "flex-start";
                    move.style.transform = "translateY(-10px)";
                    expandedContent.style.opacity = "1";
                    if(taskKind==="output"){
                        let sIndex = 0;
                        function update( contentTxt) {
                            // console.log(contentTxt,)
                            if(contentTxt.length>0){
                                p.innerHTML += contentTxt[sIndex];
                                if (sIndex === contentTxt.length - 1) {
                                    clearInterval(handeler);
                                    cleared = true;
                                }cleared = false;
                                sIndex++;
                            }
                        }
                        function updateScreenContent(contentTxt) {
                            if (p.innerHTML !== "") {
                                p.innerHTML = "";
                            }
                            handeler = setInterval(update, 90, contentTxt);
                        }
                        updateScreenContent(taskContent);
                    }
                } else {
                    if (!cleared) {
                        clearInterval(handeler);
                    }
                    details.innerHTML = `<i class="fa-solid fa-angle-down"></i>`;
                    move.style.top = "30%";
                    task.classList.remove("expanded-task");
                    task.style.height = "60px";
                    task.style.alignItems = "center";
                    move.style.transform = "translateY(0)";
                    expandedContent.style.opacity = "0";
                }
                if(taskKind==="input"){
                    content=document.querySelector(".tasks .header .task .screen textarea");
                    content.focus();
                }
            })
        }
        function createExpandedContent()
        {
            task.appendChild(expandedContent);
            expandedContent.style.opacity = "0";
            expandedContent.className = "expanded-content";
            let text  = document.createElement("a");
            // text.innerHTML=`<i class="fa-regular fa-pen-to-square"></i>`;
            let audio = document.createElement("a");
            let vedio = document.createElement("a");
            function createExtentions(){
                let extentions = document.createElement("div");
                expandedContent.appendChild(extentions);
                extentions.className = "extentions";
                expandedContent.appendChild(extentions);
                function createText(){
                    text.className = "text";
                    let iEle=document.createElement("i");
                    iEle.className="fa-regular fa-clipboard";
                    iEle.addEventListener("click",()=>{
                        addActiveClass(text);
                    })
                    text.appendChild(iEle);
                    text.classList.add("active");
                    text.addEventListener("click",()=>{
                        addActiveClass(text);
                    })
                    extentions.appendChild(text);
                }
                function createAudio(){
                    audio.className = "audio";
                    let iEle=document.createElement("i");
                    iEle.className="fa-solid fa-circle-play";
                    iEle.addEventListener("click",()=>{
                        addActiveClass(audio);
                    })
                    audio.appendChild(iEle);
                    audio.addEventListener("click",()=>{
                        addActiveClass(audio);
                    })
                    extentions.appendChild(audio);
                }
                function createVedio(){
                    vedio.className = "vedio";
                    let iEle=document.createElement("i");
                    iEle.className="fa-solid fa-file";
                    iEle.addEventListener("click",()=>{
                        addActiveClass(vedio);
                    })
                    vedio.appendChild(iEle);
                    vedio.addEventListener("click",(e)=>{
                        addActiveClass(vedio);
                    })
                    extentions.appendChild(vedio);
                }
                function addActiveClass(Element)
                {
                    if(text.classList.contains("active"))
                        text.classList.remove("active");
                    if(audio.classList.contains("active"))
                        audio.classList.remove("active");
                    if(vedio.classList.contains("active"))
                        vedio.classList.remove("active");
                    Element.classList.add("active");
                }
                createText();
                createAudio();
                createVedio();
            }
            function createScreen(){
                screen.className = "screen";
                expandedContent.appendChild(screen);
                if(taskKind==="output"){
                    function createP()
                    {
                        screen.appendChild(p);
                    }
                    function createvedio(){}
                    function createAudio(){}
                    createP();
                }else if(taskKind==="input"){
                    function createInputP()
                    {
                        InputP=document.createElement("textarea");
                        InputP.className="input-P";
                        screen.appendChild(InputP);
                        InputP.onblur=function(){
                            taskContent=InputP.value;
                        }
                    }
                    createInputP();
                }
            }
            createExtentions();
            createScreen();
        }
        function createDate(){
            let date = document.createElement("div");
            task.appendChild(date)
            date.className = "date";
            date.classList.add(directionLtrRtl);
            date.innerHTML = taskDate;
        }
        createChoises();
        craeteCheck();
        createTaskName();
        createMove();
        createExpandedContent();
        createDetails();
        createDate();
    },
    
    
};
function importFromLocalStorage()
{
    if(window.localStorage.length)
    {
        for(let [key,value] of Object.entries(localStorage))
        {
            if(key!=="LtrRtl")tasksElement.createTask(value.split(",")[0],value.split(",")[1],value.split(",")[2]);
        }
    }
    if(localStorage.getItem("LtrRtl")==="Arabic")LtrRtl.click();
}
function headerInput()
    {
        let butn=document.querySelector(".header .butn");
        let header=document.querySelector(".header");
        let cancel=document.querySelector(".header .cancel");
        let thisTask;
        let name;
        let content;
        butn.onclick=function()
        {
            function exprotToLocalStorage(nameValue,contentValue,dateValue)
            {
                let taskData=[];
                taskData[0]=nameValue;
                taskData[1]=contentValue;
                taskData[2]=dateValue;
                // console.log(taskData[1]);
                localStorage.setItem(localStorage.length,taskData);
                tasksElement.createTask(nameValue,contentValue,dateValue)
            }
            if(butn.innerHTML==language.header.bar.barButtn.new[LtrRtl.innerHTML]){
                butn.innerHTML=language.header.bar.barButtn.add[LtrRtl.innerHTML];
                header.classList.add("expanded");
                header.nextElementSibling.classList.add("translate");
                tasksElement.createTask("","",returnDate(),"input");
                thisTask=document.querySelector(".tasks .header .task");
                let thisTaskMove=document.querySelector(".tasks .header .task .move");
                thisTaskMove.remove();
                name=document.querySelector(".tasks .header .task .task-name");
                content=document.querySelector(".tasks .header .task .screen textarea");
                name.setAttribute("placeholder",language.task.taskName.taskPlaceHolder[LtrRtl.innerHTML]);
                content.setAttribute("placeholder",language.task.content.placeHolder[LtrRtl.innerHTML]);
                cancel.classList.add("expanded");
                cancel.classList.add("ltr");
                thisTaskName=document.querySelector(".tasks .header .task .task-name");
                thisTaskName.focus();
            }
            else if(butn.innerHTML===language.header.bar.barButtn.add[LtrRtl.innerHTML]){
                
                if(name.value!=="")
                {
                    header.classList.remove("expanded");
                    header.nextElementSibling.classList.remove("translate");
                    butn.innerHTML=language.header.bar.barButtn.new[LtrRtl.innerHTML];
                    exprotToLocalStorage(name.value,content.value,returnDate());
                    thisTask.remove(); 
                    cancel.classList.remove("expanded");
                }
                else{
                    thisTaskName=document.querySelector(".tasks .header .task .task-name");
                    thisTaskName.focus();
                    name.setAttribute("placeholder",language.task.taskName.taskPlaceHolderError[LtrRtl.innerHTML]);
                    handler=setTimeout(() => {
                        name.setAttribute("placeholder",language.task.taskName.taskPlaceHolder[LtrRtl.innerHTML]);
                    }, 700);
                }
            }
        }
        cancel.onclick=function(){
            header.classList.remove("expanded");
            header.nextElementSibling.classList.remove("translate");
            butn.innerHTML=language.header.bar.barButtn.new[LtrRtl.innerHTML];
            thisTask.remove();
            cancel.classList.remove("expanded");
        }
        LtrRtl.onclick=function(){
            let oldDirectionLtrRtl=directionLtrRtl;
            if(directionLtrRtl==="ltr")directionLtrRtl="rtl";
            else directionLtrRtl="ltr";
            document.documentElement.style.setProperty("direction",directionLtrRtl);
            let dateElements=document.querySelectorAll(".date");
            dateElements.forEach((e)=>{
                e.classList.remove(oldDirectionLtrRtl);
                e.classList.add(directionLtrRtl);
            })
            let moveElements=document.querySelectorAll(".move");
            moveElements.forEach((e)=>{
                e.classList.remove(oldDirectionLtrRtl);
                e.classList.add(directionLtrRtl);
            })
            let detailsElements=document.querySelectorAll(".details");
            detailsElements.forEach((e)=>{
                e.classList.remove(oldDirectionLtrRtl);
                e.classList.add(directionLtrRtl);
            })
            if(directionLtrRtl==="ltr")LtrRtl.innerHTML="English";
            else LtrRtl.innerHTML="Arabic";
            localStorage.setItem("LtrRtl",LtrRtl.innerHTML);
            let projectName=document.querySelector(".tasks .header .bar .name");
            projectName.innerHTML=language.header.bar.barName[LtrRtl.innerHTML];
            let headerButtn=document.querySelector(".tasks .header .butn");
            if(headerButtn.innerHTML===language.header.bar.barButtn.new["Arabic"]||headerButtn.innerHTML===language.header.bar.barButtn.new["English"])
                headerButtn.innerHTML=language.header.bar.barButtn.new[LtrRtl.innerHTML];
            else
                headerButtn.innerHTML=language.header.bar.barButtn.add[LtrRtl.innerHTML];
            let name=document.querySelector(".tasks .header .task .task-name");
            if(name)name.setAttribute("placeholder",language.task.taskName.taskPlaceHolder[LtrRtl.innerHTML]);
            letcontent=document.querySelector(".tasks .header .task .screen textarea");
            if(content)content.setAttribute("placeholder",language.task.content.placeHolder[LtrRtl.innerHTML]);
            
            let deleteAll=document.querySelector(".tasks .header .clear-all");
            if(deleteAll) deleteAll.innerHTML=language.header.deleteAll[LtrRtl.innerHTML];
            let popup=document.querySelector(".PopUp-message");
        }
        function showPopUp(){
            let message=document.createElement("div");
            message.textContent=language.popup[LtrRtl.innerHTML];
            message.className="PopUp-message";
            message.style.opacity="0";
            message.style.zIndex="-1";
            let yes=document.createElement("input");
            yes.className="yes";
            yes.setAttribute("type","button");
            yes.setAttribute("value","yes");
            let no=document.createElement("input");
            no.className="no";
            no.setAttribute("type","button");
            no.setAttribute("value","no");
            no.textContent="no";
            message.appendChild(yes);
            message.appendChild(no);
            document.body.appendChild(message);
        }
        showPopUp();
        let clearAllTasks=document.querySelector(".header .clear-all");
        let message=document.querySelector(".PopUp-message");
        clearAllTasks.onclick=function(){
            // if(){
                message.style.setProperty("opacity","1");
                message.style.zIndex="1";
            // }
            clearAllTasks.innerHTML="Select";
        }
        let yes=document.querySelector(".PopUp-message .yes");
        yes.addEventListener("click",()=>{
            localStorage.clear();
            let allTasks=document.querySelectorAll(".content .task");
            allTasks.forEach((t)=>{
                t.remove();
            })
            message.style.setProperty("opacity","0");
            message.style.zIndex="-1";
        })
        let no=document.querySelector(".PopUp-message .no");
        no.addEventListener("click",()=>{
            message.style.setProperty("opacity","0");
            message.style.zIndex="-1";
        })
    }
    window.addEventListener("keydown",(e)=>{
        let butn=document.querySelector(".header .butn");
        if(e.key==="Control"){
            butn.click();
        }
        else if(e.key==="Escape"){
            let cancel=document.querySelector(".tasks .header .cancel.expanded");
            if(cancel) cancel.click();
        }
    })
headerInput();
importFromLocalStorage();

