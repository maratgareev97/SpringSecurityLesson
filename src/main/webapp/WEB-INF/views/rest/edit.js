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
    let name_edit = document.formEdit.name_edit.value;
    // console.log(document.formEdit.selectet.value);

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

    index();
}


async function aaa(id) {
    await fetch(`http://localhost:8080/api/employees/${id}`)
        .then((response) => {
            const data = response.json();
            console.log(data);
            return data;
        })
        .then((user) => {
                let roles0 = user.roles[0].name;
                console.log(roles0)
                let roles0_0 = "";
                if (roles0 == "ROLE_ADMIN") {
                    roles0_0 = "ROLE_USER"
                } else {
                    roles0_0 = "ROLE_ADMIN"
                }
                let roles1 = user.roles[1];
                let roles1_1 = user.roles;
                if (roles1 == null) {
                    roles1_1 = `<option selected>${roles0}</option><option>${roles0_0}</option>`;
                    console.log(roles1_1)
                } else {
                    roles1 = user.roles[1].name;
                    roles1_1 = `<option selected>${roles0}</option><option selected>${roles1}</option>`
                    console.log(roles1_1);
                }
                ;

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
                                        <!-- ${user.roles.map(e => `<option selected name="selected0">${e.name}</option>`)} 
                                        <option selected>${roles0}</option>   -->
                                        ${roles1_1}
                                </select>
                            </div>
                            <div class="col-3">
                            </div>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <input type="button" onClick="btnClick();" value="Edit" class="btn btn-primary"/>
                    </div>
                </form>
            `;
                placeholder.innerHTML = out1;
            }
        );


}