let dict = [
    {
        "TW":"技術問答",
        "EN":"Tech Q&A"
    },
    {
        "TW":"技術文章",
        "EN":"Tech Article"
    },
    {
        "TW":"最新",
        "EN":"Newest"
    }
]

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

window.onload = function(){
    dict.map(x=>{
        replaceInText(document.body,x.TW,x.EN)
    })
    document.body.style.opacity = 1
}

const observer = new MutationObserver(function(mutations_list) {
	mutations_list.forEach(function(mutation) {
		console.log(mutation)
	});
});

observer.observe(document.querySelector("body"), { subtree: true, childList: true });