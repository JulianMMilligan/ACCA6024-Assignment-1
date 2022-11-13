$(function () {

	$.ajaxSetup({ cache:false}); //setup ajax

    $("#messageSendersIPText").hide();
	
    
    $("#serverGet-button").click(function (e)
    {

        getUserDetails();
        //console.log("button clicked"); //Testing only
        e.preventDefault();
        return false;
    });

    $("#postsFetch-button").click(function (e)
    {
        var userId = Math.floor(Math.random() * 9) + 1;
        fetchPosts(userId);
        //console.log("button clicked"); //Testing only
        e.preventDefault();
        return false;
    });


    $("#submitMessageButton").click(function (e)
    {
        postMessage();
        e.preventDefault();
        return false;

    });

    $("#deletePostButton").click(function (e)
    {
        var postID = parseInt($("#postIdDelete").val());
        deletePost(postID);
        e.preventDefault();
        return false;
    });

    $("#editPostButton").click(function (e)
    {
        
        var postID = parseInt($("#postIdEdit").val());
        var postBody = $("#postBody"+postID).val();

      
        editPost(postID ,  postBody);
        e.preventDefault();
        return false;
    });


    //main ajax function

    
    function getUserDetails()
    {

        $.ajax({
            cache: false,
            type: "Get",
            url: "https://randomuser.me/api/",
            data: '',
            datatype:"json",
            success: displayUserDetails,
            error: (reg, status, error) => window.alert("We are unable to find any targets - " + status)
        });

    }


    function getLandWater(lon , lat) 
    {
        $.ajax({
            cache: false,
            type: "Get",
            url: `https://api.onwater.io/api/v1/results/${lat},${lon}`,
            data: '',
            datatype:"json",
            success: displayLandWater,
            error: (reg, status, error) => window.alert("Not able to calulate thier location - " + status)

        });
    }

    function fetchPosts(userId)
    {
        
        $.ajax({
            cache: false,
            type: "GET",
            url: `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
            data:'',
            datatype:"json",
            success: displayFetchedPosts,
            error: (reg, status, error) => window.alert("We are unable to get any posts - " + status)

        });
    }

    function postMessage()
    {
        var messageData = {
            title:$("#fullName").val(),
            body:$("#message").val(),
            userId:"1"
        };

        $.ajax({
            cache: false,
            type: "POST",
            url: "https://jsonplaceholder.typicode.com/posts",
            data:JSON.stringify(messageData),
            contentType:"application/json; charset=utf-8",
            datatype:"json",
            success: displayMessageResult,
            error: (reg, status, error) => window.alert("Unable to sent message - " + status)

        });
    }

    function deletePost(postID)
    {
        

        $.ajax({
            cache: false,
            type: "DELETE",
            url:`https://jsonplaceholder.typicode.com/posts/${postID}`,
            data:'',
            datatype:"json",
            success: displayConfirmMessageDelete,
            error: (reg, status, error) => window.alert("We could not delete your message at this time - " + status)

        });

    }

    function editPost(postID , bodyText)
    {

        $.ajax({
            cache:false,
            type: "PATCH",
            url:`https://jsonplaceholder.typicode.com/posts/${postID}`,
            data: JSON.stringify({
                body: bodyText
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
              success: displayConfirmMessageEdit,
              error: (reg, status, error) => window.alert("We could not edit your message at this time - " + status)  


        })
    }


    //main results display functions

    function displayUserDetails (json, status, error)
    {
        var html = "";
        var imageHtml = "";
        var returnStatus = status;
        victimLat = json.results[0].location.coordinates.latitude;
        victimLon = json.results[0].location.coordinates.longitude;
        

        getLandWater(victimLon , victimLat);
        

        html += "<b>Name : </b> " + json.results[0].name.title + " " + json.results[0].name.first + " " + json.results[0].name.last +"<br/>"
             + "<b>Gender : </b> " + json.results[0].gender + "<br/>"
             + "<b>Address : </b> " + json.results[0].location.street.number + " " + json.results[0].location.street.name + " " + json.results[0].location.city + " " + json.results[0].location.country  +"<br/>"
             + "<b>Email : </b> " + json.results[0].email + "<br/>"
             + "<b>Current Username : </b> " + json.results[0].login.username + "<br/>"
             + "<b>Current Password : </b> " + json.results[0].login.password + "<br/>"
             + "<b>Age : </b> " + json.results[0].dob.age + "<br/>";
        
        imageHtml = "<img src= " + json.results[0].picture.medium +">"
        $("#serverResults").hide();
        $("#serverPostResults").html(html);
        $('#serverPostPictureResults').html(imageHtml);


        //testing
        //console.log(json.results[0]);
        //console.log(victimLat);
        //console.log(victimLon);
    }


    function displayLandWater(json, status, error)
    {
        //if (json.water === false)
        //{
            //$("#landWaterGetResults").html("They are on land , should be an easy job.")

        //}else 
        //{
            //$("#landWaterGetResults").html("They are on water , hope you have a boat.")

        //}

        let result = (json.water) ? "They are on water , hope you have a boat." : "They are on land , should be an easy job."  ;
        $("#landWaterGetResults").html(result);

    }

    function displayFetchedPosts(json, status, error)
    {
        
        var postResultsHtml = "";

        

        for (let i = 0; i < Object.keys(json).length ; i++)//loop to show all entires for user
        {
            postResultsHtml += "<label for=\"postTitle" + json[i].id  +"\">Post Title -</label>" 
                            +  "<input id= \"postTitle" + json[i].id  + "\" type=\"text\" name=\"postTitle" + json[i].id + "\" size = \"50\" value=\"" + json[i].title  +"\" readonly >"
                            +  "</br>"
                            +  "<label for=\"postId" + json[i].id  +"\">Post ID -</label>" 
                            +  "<input id= \"postId" + json[i].id  + "\" type=\"text\" name=\"postID" + json[i].id + "\" value=\"" + json[i].id  +"\" readonly size =\"3\">"
                            +  "</br>"
                            +  "<label for=\"postBody" + json[i].id  +"\">Post Text -</label>" 
                            +  "<textarea id= \"postBody" + json[i].id  +"\" name=\"postBody" + json[i].id + "\" required rows=\"6\" cols=\"50\">"+ json[i].body + "</textarea>"
                            +  "</br>"
                            +  ""
                            +  "<input id= \"userId" + json[i].id + "\" type=\"hidden\" name=\"userID" + json[i].id + "\" value=\"" + json[i].userId  +"\" readonly size =\"3\">"
                            +  "</br><hr>";
 
        }


        
        $("#postsFetchResults").html(postResultsHtml);
    }

    function displayMessageResult(json, status, error)
    {
        
        var messageResultHtml = "";

        messageResultHtml   += "Name - " + json.title + "</br>"
                            +  "Message - " + json.body + "</br>"
                            +  "<strong>Thank you for message Joe our super admin will read it some day.</strong>"; 
        $("#userMessage").hide();
        $("#messageResult").html(messageResultHtml);

        $.getJSON("https://api.ipify.org?format=json", function(data) {
        //code used from geeksforgeeks to show GET in a jquery 
        //URL - https://www.geeksforgeeks.org/how-to-get-client-ip-address-using-javascript/
        $("#messageSendersIPText").show();
        $("#messageSendersIP").html(data.ip);


        //testing
        //console.log(json);   
    })


    }

    function displayConfirmMessageDelete (json, status, error )
    {
        $("#postsFetchResults").hide();
        
        
        var messageDeleteHtml = "<strong>The post has been deleted as requested , this action can not be undone</strong>";

        $("#deleteResults").html(messageDeleteHtml);
    }
    
    function displayConfirmMessageEdit (json, status, error )
    {
        var messageEditHtml ="";
        $("#postsFetchResults").hide();
        
        messageEditHtml   += "<strong>The post has been edited as requested , this action can not be undone</strong>"
                            +  "<br>"
                            +  "<p>New post text = " + json.body + "</p>";

        $("#deleteResults").html(messageEditHtml);
    } 


});