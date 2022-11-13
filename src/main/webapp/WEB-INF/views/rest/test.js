// let response = await fetch("https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits");

// if (response.ok) { // если HTTP-статус в диапазоне 200-299
//   // получаем тело ответа (см. про этот метод ниже)
//   let json = await response.json();
// } else {
//   alert("Ошибка HTTP: " + response.status);
// }


// async function test() {
//     const response = await fetch('https://jsonplaceholder.typicode.com/todos');
//     const data = await response.json();
//     return data;
//   }
  
//   test().then(data => console.log(data))
//   .then(data => {
//     let placeholder = document.querySelector("#data-output");
//     let out = "";
//     for (let product of data){
//         out +=`
//         <tr>
//             <td>${product.userId}</td>
//             <td>${product.id}</td>
//             <td>${product.title}</td>
//             <td>${product.complected}</td>
//         </tr>
//         `;
//     }
//     placeholder.innerHTML = out;
//   })

  
  fetch("https://jsonplaceholder.typicode.com/todos")
  .then((response) =>{
     const data = response.json();
     console.log(data);
     return data;
  })
  .then((products) => {
    let placeholder = document.querySelector("#data-output");
    let out = "";
    for (let product of products){
        out +=`
        <tr>
            <td>${product.userId}</td>
            <td>${product.id}</td>
            <td>${product.title}</td>
            <td>${product.complected}</td>
        </tr>
        `;
    }
    placeholder.innerHTML = out;
  })