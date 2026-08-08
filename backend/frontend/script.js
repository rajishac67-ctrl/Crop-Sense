async function getSensorData(){

    try{

        const response=await fetch("http://127.0.0.1:5000/sensor");

        const data=await response.json();

        let value=data.moisture;

        document.getElementById("moisture").innerHTML=value+"%";

        document.getElementById("bar").style.width=value+"%";

        document.getElementById("time").innerHTML=new Date().toLocaleTimeString();

        if(value<30){

            document.getElementById("status").innerHTML="🌵 Dry";

            document.getElementById("bar").style.background="red";

        }

        else if(value<70){

            document.getElementById("status").innerHTML="🌿 Normal";

            document.getElementById("bar").style.background="orange";

        }

        else{

            document.getElementById("status").innerHTML="💧 Wet";

            document.getElementById("bar").style.background="green";

        }

    }

    catch(error){

        console.log(error);

    }

}

setInterval(getSensorData,1000);

getSensorData();