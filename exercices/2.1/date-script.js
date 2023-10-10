const dateTimeNow = new Date();

function addDateTime(message){
    return dateTimeNow.toLocaleDateString() + " " + dateTimeNow.toLocaleTimeString() + " " + message;
}
alert(addDateTime("This is the best moment to have a look at this website !"));