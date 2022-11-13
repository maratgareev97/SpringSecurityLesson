async function create_user(){
    var e = document.getElementById("listRoles_create");
    // var text = e.options[e.selectedIndex].text;
    // console.log(text)


    var selected = [];
    for (var option of document.getElementById('listRoles_create').options) {
        if (option.selected) {
            selected.push(option.value);
        }
    }
    
    let roless;
    if (selected.length == 2) {
        console.log(selected.length)
        roless = [
            {
                "id": 1,
                "name": "ROLE_ADMIN",
                "authority": "ROLE_ADMIN"
            },
            {
                "id": 2,
                "name": "ROLE_USER",
                "authority": "ROLE_USER"
            }
        ]
    } else {
        if (selected[0] == "ROLE_ADMIN") {
            roless = [
                {
                    "id": 1,
                    "name": "ROLE_ADMIN",
                    "authority": "ROLE_ADMIN"
                }
            ]
        } else {
            roless = [
                {
                    "id": 2,
                    "name": "ROLE_USER",
                    "authority": "ROLE_USER"
                }
            ]
        }
    }

    let listUser = {
        "name": document.formEdit.name_create.value,
        "age": document.formEdit.age_create.value,
        "username": document.formEdit.username_create.value,
        "password": document.formEdit.password_create.value,
        "email": document.formEdit.email_create.value,
        "roles": roless
    }

    await fetch(`http://localhost:8080/api/employees`, {
        method: 'POST',
        headers: {
            'Access-Control-Request-Method': 'POST',
            // 'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(listUser)
    })
        .then(res => console.log(res));

    alert("Данные занесены")
    
    
}

function newUser(){
    let chek_table = document.querySelector("#chek_table");
    let out_chek_table = `
    <ul class="nav nav-tabs">
        <li class="nav-item">
            <a class="nav-link" aria-current="page" href="index.html">Users table</a>
        </li>
        <li class="nav-item">
            <a class="nav-link active" href="#" onClick="newUser();">New User</a>
        </li>
    </ul>
    `
    chek_table.innerHTML = out_chek_table;


    let placeholder = document.querySelector("#new_user");
    let out1 = `
    <form name="formEdit">
        <div class="form-group">
            <div class="row">
                <div class="col-3">
                </div>
                <div class="col-6">

                    <label for="name" class="pt-3">First name</label>
                    <input class="form-control" type="text" 
                            style="background-color: lightyellow" value="" name="name_create">
                    

                    <label for="username" class="pt-3">Last-name</label>
                    <input class="form-control" type="text" 
                            style="background-color: lightyellow" value="" name="username_create">
                    

                    <label for="age" class="pt-3">Age</label>
                    <input class="form-control" type="text" value="" name="age_create">
                    

                    <label for="email" class="pt-3">Email</label>
                    <input class="form-control" type="text" 
                            style="background-color: lightyellow" value="" name="email_create">
                    

                    <label for="password" class="pt-3">Password</label>
                    <input class="form-control" type="text" value="" name="password_create">
                    

                    <label for="role" class="pt-3">Role</label>
                    <select multiple id="listRoles_create" required="required" class="form-control">
                        <option>ROLE_ADMIN</option>
                        <option>ROLE_USER</option>                 
                    </select>
                </div>
                <div class="col-3">
                </div>

                <div style="padding: 20px">
                <input type="button" onClick="create_user();" value="Add new user!" class="btn btn-success"/>
            </div>

            </div>
           
        </div>

        

    </form>
`;
    placeholder.innerHTML = out1;
}


