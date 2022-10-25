


const getStorage = (key) => {
    return new Promise(resolve => {
        chrome.storage.local.get([key], (res) => resolve(res[key]))
    })
}
const setStorage = (obj) => {
    chrome.storage.local.set(obj, () => { })
}

document.getElementById("saveDict").onclick = async function () {
    console.log("saveDict")
    let url = document.getElementById("urlDict").value;
    await setStorage({ 'urlDict': url });
    await loadDict(url)
}

document.getElementById("saveLang").onclick = async function () {
    console.log("saveLang")
    let lang = document.getElementById("lang").value;
    await setStorage({ 'lang': lang });
}

async function loadDict(url){
    console.log("loadDict(url)",url)
    let dict = await fetch(url).then(x=>x.json())
    console.log(dict)
    await setStorage({ 'dict': dict });
}

(async ()=>{
    document.getElementById("urlDict").value = await getStorage('urlDict');
    document.getElementById("lang").value = await getStorage('lang');
})();
