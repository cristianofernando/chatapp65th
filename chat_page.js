const firebaseConfig = {
    apiKey: "AIzaSyChnSfDRseDzi4LwpVTdg21tsfizsxce4A",
    authDomain: "chatapp65th.firebaseapp.com",
    databaseURL: "https://chatapp65th-default-rtdb.firebaseio.com",
    projectId: "chatapp65th",
    storageBucket: "chatapp65th.appspot.com",
    messagingSenderId: "152021438146",
    appId: "1:152021438146:web:a9b545287606b2def2755b",
    measurementId: "G-7ML6TLC9VC"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  user_name = localStorage.getItem("user_name");
  room_name = localStorage.getItem("room_name");

   function send()
   {
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name:user_name,
        message:msg,
        like:0

    });


    document.getElementById("msg").value = "";

   }
   function getData() { 
     firebase.database().ref("/"+room_name).on('value', function(snapshot)
     { document.getElementById("output").innerHTML = ""; 
     snapshot.forEach(function(childSnapshot) 
     { childKey = childSnapshot.key; 
        childData = childSnapshot.val(); 
        if(childKey != "purpose") { 
            firebase_message_id = childKey;
             message_data = childData;
            name=message_data['name'];
            message=message_data['message'];
            like=message_data['like']
              row = "<h4> "+ name +"<img class='user_tick' src='tick.png'></h4><h4 class='message_h4'>"+ message +"</h4><button class='btn btn-warning' id='"+firebase_message_id+"' value='"+like+"' onclick='updateLike(this.id)'> <span class='glyphico0n glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";
               document.getElementById("output").innerHTML += row;
             } });
             });
             }
         getData();
function updateLike(message_id)
{
    console.log("clciked on like button - " + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_likes =  Number(likes) + 1;
    console.log(updated_likes);

    firebase.database().ref(room_name).child(message_id).update({
        like : updated_likes
    });
}