async function btnClick() {
    var e = document.getElementById("listRoles");
    var text = e.options[e.selectedIndex].text;
    console.log(text)

    var selected = [];
    for (var option of document.getElementById('listRoles').options) {
        if (option.selected) {
            selected.push(option.value);
        }
    }

    let id_edit = document.formEdit.id_edit.value;
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
        "id": document.formEdit.id_edit.value,
        "name": document.formEdit.name_edit.value,
        "age": document.formEdit.age_edit.value,
        "username": document.formEdit.username_edit.value,
        "password": document.formEdit.password_edit.value,
        "email": document.formEdit.email_edit.value,
        "roles": roless
    }
    await fetch(`http://localhost:8080/api/${id_edit}`, {
        method: 'PATCH',
        headers: {
            'Access-Control-Request-Method': 'PATCH',
            // 'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(listUser)
    })
        .then(res => console.log(res));

    let nameEdit = document.getElementById("name_" + document.formEdit.id_edit.value)
    nameEdit.innerHTML = document.formEdit.name_edit.value;
    let ageEdit = document.getElementById("age_" + document.formEdit.id_edit.value)
    ageEdit.innerHTML = document.formEdit.age_edit.value;
    let usernameEdit = document.getElementById("username_" + document.formEdit.id_edit.value)
    usernameEdit.innerHTML = document.formEdit.username_edit.value;
    let emailEdit = document.getElementById("email_" + document.formEdit.id_edit.value)
    emailEdit.innerHTML = document.formEdit.email_edit.value;
    let roleEdit = document.getElementById("role_" + document.formEdit.id_edit.value)
    roleEdit.innerHTML = listUser.roles.map(e => e.name);

    $('#modelArticulo').modal({
        show: false
      });

      
}


async function aaa(id) {
    var roles_List = await fetch("http://localhost:8080/api/employees/roles")
        .then((response) => {
            const data = response.text();
            return data;
        })




    await fetch(`http://localhost:8080/api/employees/${id}`)
        .then((response) => {
            const data = response.json();
            console.log("data   " + data);
            return data;
        })
        .then((user) => {
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

            user.roles.forEach(element => {
                massiv_roles.push(element.name)
            });
            console.log("massiv_roles: " + massiv_roles)

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


            let placeholder = document.querySelector("#edit");
            let out1 = `
                <form name="formEdit">
                    <div class="form-group">
                        <div class="row">
                            <div class="col-3">
                            </div>
                            <div class="col-6">
                                <label for="id" class="pt-3">ID</label>
                                <input class="form-control" type="text" disabled value=${user.id} name="id_edit">

                                <label for="name" class="pt-3">First name</label>
                                <input class="form-control" type="text" 
                                        style="background-color: lightyellow" value=${user.name} name="name_edit">
                                

                                <label for="username" class="pt-3">Last-name</label>
                                <input class="form-control" type="text" 
                                        style="background-color: lightyellow" value=${user.username} name="username_edit">
                                

                                <label for="age" class="pt-3">Age</label>
                                <input class="form-control" type="text" value=${user.age} name="age_edit">
                                

                                <label for="email" class="pt-3">Email</label>
                                <input class="form-control" type="text" 
                                        style="background-color: lightyellow" value=${user.email} name="email_edit">
                                

                                <label for="password" class="pt-3">Password</label>
                                <input class="form-control" type="text" value=${user.password} name="password_edit">
                                

                                <label for="role" class="pt-3">Role</label>
                                <select multiple id="listRoles" required="required" class="form-control">
                                        ${roles}
                                </select>
                            </div>
                            <div class="col-3">
                            </div>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <input type="button" onClick="btnClick();" value="Edit" class="btn btn-primary" data-dismiss="modal"/>
                    </div>
                </form>
            `;
            placeholder.innerHTML = out1;

        }
        );
}