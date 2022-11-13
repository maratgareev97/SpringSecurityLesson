// window.alert('1')
// let hhh:HTMLHeadElement=document.getElementById("hhh");
// const bodyElemernt = document.body;
// console.log(bodyElemernt);

// const childNodex = bodyElemernt.childNodes;
// console.log(childNodex);

const elem = document.getElementById('hhh');
console.dir(elem);
elem.textContent="!!!!"

setTimeout(() =>{
    addStylesTo(elem);
},1500)

function addStylesTo(node){
    node.textContent='222222';
    node.style.color='red';
    node.style.textAlign='center';
    node.style.backgroundColor='black';
    node.style.padding='2rem';
}

