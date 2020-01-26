var SERVER = 'http://172.24.42.60:8080/';

$(function() {

    $('#start_date').datepicker({
        uiLibrary: 'bootstrap',
        format: 'yyyy-mm-dd'
    });

    $('#end_date').datepicker({
        uiLibrary: 'bootstrap',
        format: 'yyyy-mm-dd'
    });
    listEvents();

});

var events=[];
var myIndex;
function saveEvent(){
    var urlParams = new URLSearchParams(window.location.search);
    var data_user = {user:urlParams.get('id')}
    var data = JSON.stringify( getFormData($("#form-edit-event"),data_user) );

    var data_to_validate = getFormData($("#form-edit-event"));

    if (data_to_validate['name'].trim().length>0 &&
        data_to_validate['place'] .trim().length>0 &&
        data_to_validate['address'] .trim().length>0 &&
        data_to_validate['start_date'] .trim().length>0 &&
        data_to_validate['end_date'].trim().length>0 ){

        $.ajax({
            url: SERVER+'api/event/save_update_event',
            type: 'POST',
            data: data ,
            contentType: 'application/json; charset=utf-8',
            success: function (response) {
                if(response.saved != undefined || response.updated != undefined){
                    alertify.success("Evento Almacenado");
                    document.getElementById("form-edit-event").reset();
                    document.getElementById("id").value = "";
                    listEvents()

                }else {
                    console.log(response)
                    alertify.error("Diligencie todos los campos");
                }
            },
            error: function (e) {
                console.log(e)
            }
        });


    }else {
        alertify.error("Diligencie todos los campos");
    }





  //  displayClients()
}

function listEvents(){

    var urlParams = new URLSearchParams(window.location.search);
    var data_user = JSON.stringify({user:urlParams.get('id')})
    $.ajax({
        url: SERVER+'api/event/list_events',
        type: 'POST',
        data: data_user ,
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            events = response;
            document.getElementById("form-list-client-body").innerHTML=""
            for (i=0;i<response.length;i++){
                var myTr=document.createElement("tr")
                delete  response[i].createdAt
                delete  response[i].updatedAt
                delete  response[i].__v
                delete  response[i].user
                response[i].start_date =  response[i].start_date.substring(0, response[i].start_date.indexOf('T'));
                response[i].end_date =  response[i].end_date.substring(0, response[i].end_date.indexOf('T'));

                for(a in response[i]){
                    if(a != '_id' ){
                        var mytd=document.createElement("td")
                        mytd.innerHTML=response[i][a]
                        myTr.appendChild(mytd)
                    }

                }
                var actionTd=document.createElement("td")
                var editBtn=document.createElement("button")
                editBtn.innerHTML="Edit"
                editBtn.setAttribute("class" , "btn btn-sm btn-primary")
                editBtn.setAttribute("onclick" , "editEvent("+i+")")
                editBtn.setAttribute("event_id" , response[i]._id)

                var deletebtn=document.createElement("button")
                deletebtn.innerHTML="Delete"
                deletebtn.setAttribute("class" , "btn btn-sm btn-danger")
                deletebtn.setAttribute("onclick" , "deleteEvent("+i+")")
                deletebtn.setAttribute("event_id" , response[i]._id)

                actionTd.appendChild(editBtn)
                actionTd.appendChild(deletebtn)
                myTr.appendChild(actionTd)
                document.getElementById("form-list-client-body").appendChild(myTr)
            }

        },
        error: function (e) {
            console.log(e)
        }
    });


}

//Editing Client
function editEvent(i){
    console.log(events[i])
    myIndex=i;
    document.getElementById("id").value=events[i]['_id']
    document.getElementById("name").value=events[i].name
    document.getElementById("category").value=events[i].category
    document.getElementById("place").value=events[i].place
    document.getElementById("address").value=events[i].address
    document.getElementById("start_date").value=events[i].start_date
    document.getElementById("end_date").value=events[i].end_date
    document.getElementById("event_type").value=events[i].event_type
}


//deleting client
function deleteEvent(i){
    console.log(events[i])
    var data_event = JSON.stringify({id:events[i]._id})
    $.ajax({
        url: SERVER+'api/event/delete_events',
        type: 'POST',
        data: data_event ,
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
                listEvents()

        },
        error: function (e) {
            console.log(e)
        }
    });



}
