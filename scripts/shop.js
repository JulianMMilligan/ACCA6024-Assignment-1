
$(function () {
    $.ajaxSetup({cache:false});
    
    $("#listProducts").on("click" , "a" , test);






    
});



function test(e)
{
    console.log("test");
    e.preventDefault();
    return false; 
}

function addToCart (e)
{
    let id = $(this).attr('data-id');
    //test

    console.log (`I hope this working and the id = ${id}`);
    e.preventDefault();
    return false;
}