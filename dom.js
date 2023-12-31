/* dom.js */
var colors = ["black", "darkslategray", "darkgreen", "darkgoldenrod", "darkred", "darkmagenta"]

function init() {
    let element = document.getElementById('walkBtn');
    element.addEventListener('click', function () {
        walk();
    });

    element = document.getElementById('advWalkBtn');
    element.addEventListener('click', function () {
        advWalk();
    });

    element = document.getElementById('modifyBtn');
    element.addEventListener('click', function () {
        modify();
    });

    element = document.getElementById('advModifyBtn');
    element.addEventListener('click', function () {
        advModify()
    });

    element = document.getElementById('addBtn');
    element.addEventListener('click', function () {
        add();
    });

    element = document.getElementById('submitBtn');
    element.addEventListener('click', function () {
        selectorAdd();
    });

    element = document.getElementById('removeBtn');
    element.addEventListener('click', function () {
        remove();
    });

    element = document.getElementById('safeDeleteBtn');
    element.addEventListener('click', function () {
        safeRemove();
    });

    element = document.getElementById('selectorDeleteBtn');
    element.addEventListener('click', function () {
        selectorRemove();
    });

    element = document.getElementById('basicCloneBtn');
    element.addEventListener('click', function () {
        basicClone();
    });

    element = document.getElementById('advCloneBtn');
    element.addEventListener('click', function () {
        advClone();
    });
}

function walk() {
   let el;

   el = document.getElementById('p1');
   showNode(el);

   el = el.firstChild;
   showNode(el);

   el = el.nextSibling;
   showNode(el);

   el = el.lastChild;
   showNode(el);

   el = el.parentNode.parentNode.parentNode;
   showNode(el);

   el = el.querySelector('section > *');
   showNode(el);
}

function advWalk() {
    const el = document.getElementById('nodeInfo');
    const root = document.documentElement;
    const formattedText = advWalkIter(root, "");
    el.value = formattedText;
}

function advWalkIter(node, spacer) {
    let formattedText = "";
    if (node.nodeType === Node.ELEMENT_NODE) {
        const nodeName = node.nodeName;
        formattedText += `${spacer} ${nodeName}\n`;
        const childNodes = node.childNodes;
        for (let childNode of childNodes) {
            formattedText += advWalkIter(childNode, `${spacer}|==`);
        }
    }

    return formattedText;
}

function showNode(el) {
    let nodeType = el.nodeType;
    let nodeName = el.nodeName;
    let nodeValue = el.nodeValue;

    document.getElementById("nodeInfo").value+= `Node type: ${nodeType}\nNode name: ${nodeName}\nNode value: ${nodeValue}\n\n`;
    // alert(`Node type: ${nodeType}\nNode name: ${nodeName}\nNode value: ${nodeValue}`);
}

function modify() {
    let el = document.getElementById('p1');

    // You can do all the properties one by one if you know them in HTML
    el.title = 'I was changed by JS';

    // you can update the style as a string
    // el.style = 'color: blue; font-size: 1em;';

    // you also may prefer to update on the CSS object.  This is the same as above
    // el.style.color = 'blue';
    // el.style.fontSize = '1em';
    // be careful doing many styles bit by bit it isn't efficent, might be easier just to set a class

    // you can also update the class list
    el.classList.add('fancy');

    // you can also update the dataset which change data-* attributes
    el.dataset.cool = 'true';       // data-cool="true"
    el.dataset.coolFactor = '9000'; //data-cool-factor="9000"

}

function advModify() {
    let el = document.getElementById('txtChange');
    el.innerHTML = "DOM Manipulation is Fun!";
    el.style.color = colors[Math.floor(Math.random()*6)]
    document.getElementById('p1').classList.toggle("schmancy")
}

function add() {

    let p, em, txt1, txt2, txt3;

    // first we do things the long old-fashioned standard DOM way
    p = document.createElement('p'); // <p></p>
    em = document.createElement('em'); // <em></em>
    txt1 = document.createTextNode('This is a '); // "This is a"
    txt2 = document.createTextNode('test'); // "test"
    txt3 = document.createTextNode(' of the DOM'); // " of the DOM"

    p.appendChild(txt1); // <p>This is a</p>
    em.appendChild(txt2); // <em>test</em>
    p.appendChild(em); // <p>This is a<em>test</em></p>
    p.appendChild(txt3); // <p>This is a<em>test</em> of the DOM</p>

    // go an insert this new copy below the old one
    let oldP = document.getElementById('p1');
    oldP.parentNode.insertBefore(p, oldP.nextSibling);
    // Alternative method using innerHTML and insertAdjacentHTML
    // let oldP = document.getElementById('p1');
    // oldP.insertAdjacentHTML('afterend', '<p>This is a<em>test</em> of the DOM</p>');
    // clearly short hands are pretty easy!
}

function selectorAdd(){
    let newP, txt1, txt2, txt3;
    let date = new Date();
    let newCommentCompare = "newComment"
    let newTextNodeCompare = "textNode"
    let newElementCompare = "newElement"
    let newComment = document.getElementById('elementOptions');
    let val = newComment.options[newComment.selectedIndex].value
    
    if(val == newCommentCompare){ //works
        txt2 = document.createComment(`New Comment created at ${date.toLocaleString("en-US")}`);
        document.body.appendChild(txt2)
    }

    if(val == newTextNodeCompare){ //works
        txt1 = document.createTextNode(`New Text Node created at ${date.toLocaleString("en-US")}`);
        let oldP = document.getElementById('p2');
        oldP.appendChild(txt1);
    }

    if(val == newElementCompare){ //works
        txt3 = document.createTextNode(`New Element created at ${date.toLocaleString("en-US")}`);
        newP = document.createElement('p');
        newP.appendChild(txt3);
        newP.id = "newP";
        let oldP = document.getElementById('p2');
        oldP.parentNode.insertBefore(newP, oldP.nextSibling);   
        document.getElementById('newP').classList.add("newPStyle");
    }
}

function remove() {
    document.body.removeChild(document.body.lastChild);
}

function safeRemove(){ //works
    endOfPage = document.body.lastChild;
    if(endOfPage.id == "controls"){
        document.body.removeChild(endOfPage.previousElementSibling);
    }
    else{
        document.body.removeChild(endOfPage);
    }
}

function selectorRemove(){ //works https://stackoverflow.com/questions/13125817/how-to-remove-elements-that-were-fetched-using-queryselectorall
    let elementType;
    let selectedElement;
    elementType = document.getElementById('selectorDeleteArea').value;
    selectedElement = document.querySelectorAll(elementType);
    //iterates through
    selectedElement.forEach(element => {
        element.remove();
      });
}

function basicClone(){
    const node = document.getElementById("p1");
    const clone = node.cloneNode(true);
    
    document.getElementById("p3").appendChild(clone);
}

function advClone(){
    let rng, cardNumber, text, image, card, cloneCard;
    card = document.getElementById('cardTemplate');
    cloneCard = card.content.cloneNode(true)
    rng = Math.floor(Math.random()*6000);
    cardNumber = "Card #: " + rng;
    image = `https://source.unsplash.com/random/?software&&/` + rng;
    text = "This is " + cardNumber +". This is where the short paragraph is.";
    cloneCard.querySelector('.title').textContent = cardNumber;
    cloneCard.querySelector('.shortParagraph').textContent = text;
    cloneCard.querySelector('.avatar').src = image;
    document.body.appendChild(cloneCard);
}
window.addEventListener('DOMContentLoaded', init);