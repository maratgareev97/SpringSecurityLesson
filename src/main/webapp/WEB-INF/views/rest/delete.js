async function delete_user(id) {
    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
    };

    await fetch("http://localhost:8080/api/delete/" + id, requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    
    index();
}