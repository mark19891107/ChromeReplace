const getStorage = (key) => {
    return new Promise(resolve => {
        chrome.storage.local.get([key], (res) => resolve(res[key]))
    })
}
const setStorage = (obj) => {
    chrome.storage.local.set(obj, () => { })
}

const run = async () => {
    let urlDict = await getStorage("urlDict")
    let lang = await getStorage("lang")
    let dict = await fetch(urlDict).then(x=>x.json())
    console.log(urlDict)
    dict.map(x=>{
        replaceInText(document.body,x.TW,x[lang]||x.TW)
    })
    
    const observer = new MutationObserver(function(mutations_list) {
        mutations_list.forEach(function(mutation) {
            console.log(mutation)
        });
    });
    
    observer.observe(document.querySelector("html"), { subtree: true, childList: true });
}

function replaceInText(element, pattern, replacement) {
    for (let node of element.childNodes) {
        switch (node.nodeType) {
            case Node.ELEMENT_NODE:
                replaceInText(node, pattern, replacement);
                break;
            case Node.TEXT_NODE:
                node.textContent = node.textContent.replace(pattern, replacement);
                break;
            case Node.DOCUMENT_NODE:
                replaceInText(node, pattern, replacement);
        }
    }
}

run()