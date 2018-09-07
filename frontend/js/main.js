var username;

$( document ).ready(function() {
    username = getUsername();
    $("#Username").html(username);
    console.log( "document loaded! checking for username cookie." );
    if (username == undefined) {
        console.log("username is undefined");
        //TODO: Uncomment this in final version
        //alert("User is not logged in! You will now be redirected to login.");
        //window.location.href="index.html";
    }
    $("#searchbox").val("");
    search();
});

function add() {
    var contact = { name: $("#name").val(),
                    phone: $("#phone").val(),
                    address: $("#address").val(),
                    username: username };
    $.post(
        "/COP4331-Small-Project/back-end/testapi/contact/create.php",
        JSON.stringify(contact),
        function(result){console.log(result);});
    
    
    $("#name").val("");
    $("#phone").val("");
    $("#address").val("");
}

function getUsername() {
    return Cookies.get("username");
}

function search()
{
    var json = "{ \"username\":\"" + username + "\", \"keyword\":\"" + $("#searchbox").val() +  "\" }";
    
    // alert(json);
    
    $.post(
        "/COP4331-Small-Project/back-end/testapi/contact/search.php",
        json,
        function(result){     });
    
}

function appendText(name, id)
{
    var text = "<tr id\"" + id + "\" <td>" + name + 
        "<button class=\"btn btn-outline-secondary float-right\" onClick=\"delete();\" type=\"button\"><span class=\"fa fa-trash\"></span></button></td></tr>";
//<tr id="7"><td>Name</td></tr>
    var contactTable = $("#contactTable");
    contactTable.append(text);
}

function delete()
{
    $(this).closest('tr').remove(); 
    //$("#" + id).remove();
}