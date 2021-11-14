
let sbmBtn=$(".submit");
let frame=$("frame");
let iframe=$("iframe");
let keysDiv=$(".keys");
let getDataBtn=$(".all-key");

sbmBtn.click(async function(){
    let url=$("input[name='url']").val();
    url=url || 'https://engineering.careers360.com/colleges/ranking';
    // url='https://www.w3schools.com';
    console.log(url);
    
    iframe[0].src=url;
    
})

let keyNo=1;

$(".add-key").click(function(){
    let keyDiv=$(`
        <div class="key key-${keyNo}">
            <div class="input-fields">
                <input class="key-text text-${keyNo}" type="text"><button class="find-btn find-${keyNo}">+</button><button class="delete-key delete-${keyNo}">-</button>
            </div>
            <div class="key-name data-${keyNo}"></div>
            <div class="data-divs-${keyNo}"></div>
        </div>
        
    `)

    keysDiv.append(keyDiv);

    $(`.delete-${keyNo}`).click(function(){
        keyDiv.remove();
    });


    $(`.find-${keyNo}`).click(getKeyData);

    keyNo++;
})

getDataBtn.click(async function(){
    let divs=keysDiv.children();
    let wantedList=[];
    let noList=[];
    for(let div of divs){
        let no=div.classList[1].split("-")[1];
        noList.push(no);
        let text=$(`input.text-${no}`).val();
        wantedList.push(text);
    }
    let url=iframe[0].src;
    let body={url,wantedList};
    let res=await axios.post('http://localhost:5000/getAllKeysData', body);
    res=res.data;
    console.log(res);
    let j=0;
    for(let k of Object.keys(res)){
        let data=res[k];
        let no=noList[j];
        j++;
        let keyDiv=$(`div.key-${no}`)
        console.log(data);
        let dataDivs=$(`.data-divs-${no}`);
        dataDivs.empty();
        for(let i of data){
            let dataDiv=$(`<div class="key-data data-${no}">${i}</div>`);
            dataDivs.append(dataDiv);
        }
        keyDiv.append(dataDivs);
    }
    
})

async function getKeyData(e){
    let no=e.target.classList[1].split("-")[1];
    let text=$(`input.text-${no}`).val();
    // console.log(text);
    let url=iframe[0].src;
    let body={url,text};
    // console.log(body);
    let data=await axios.post('http://localhost:5000/getKeyData', body)
    data=data.data;
    let keyDiv=$(`div.key-${no}`)
    console.log(data);
//hello2
    

    let dataDivs=$(`.data-divs-${no}`);
    dataDivs.empty();
    for(let i of data){
        let dataDiv=$(`<div class="key-data data-${no}">${i}</div>`);
        dataDivs.append(dataDiv);
    }
    keyDiv.append(dataDivs);
}




