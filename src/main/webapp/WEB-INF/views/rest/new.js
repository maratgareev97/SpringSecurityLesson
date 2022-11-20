async function create_user() {

    var selected = [];
    for (var option of document.getElementById('listRoles_create').options) {
        if (option.selected) {
            selected.push(option.value);
        }
    }


    console.log("selected " + selected)
    let roless;

    let test_mas = []
    for (let i = 0; i < selected.length; i++) {
        test_mas.push({ "id": i + 1, "name": selected[i], "authority": selected[i] })
    }
    console.log("test_mas  " + test_mas)

    roless = test_mas
    console.log("roless   " + roless)
    roless.forEach(e => console.log(e))



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

async function newUser() {

    var roles_List = await fetch("http://localhost:8080/api/employees/roles")
        .then((response) => {
            const data = response.text();
            return data;
        })

    console.log(roles_List)

    let massiv_roles = []

    roles_List = roles_List.substring(3,).split(",")
    roles_List = roles_List.toString()
    roles_List = roles_List.replace(/"/g, "")
    roles_List = roles_List.replace("]", "")
    roles_List = roles_List.substring(1,)
    let roles_List_mas = roles_List.split(',')
    for (let i = 0; i < roles_List_mas.length; i++) {
        roles_List_mas[i] = "ROLE_" + roles_List_mas[i]
    }
    // roles_List_mas.push("ROLE_TEST")
    console.log(roles_List_mas + "----!----")


    let count;
    let roles = "";
    for (let i = 0; i < roles_List_mas.length; i++) {
        count = 0;
        for (let j = 0; j < massiv_roles.length; j++) {
            if (roles_List_mas[i] == massiv_roles[j]) {
                roles += `<option selected>${roles_List_mas[i]}</option>`
                break
            } else {
                count++;
            }
        }
        if (count == massiv_roles.length) {
            roles += `<option>${roles_List_mas[i]}</option>`
        }

    }


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
                        ${roles}               
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


