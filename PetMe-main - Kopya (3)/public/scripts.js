$(document).ready(function() {
  
    $('#btn-submit').click(function(event) {
        event.preventDefault();
        let inputedName = $("#exampleInputName1").val();
        let inputedEmail = $("#exampleInputEmail1").val();
        let inputedDate = $("#exampleInputName2").val();
        let inputedTime = $("#exampleInputName3").val();
        let service = $("#exampleSelect1 option:selected").val();
        let inputedHours = $("#exampleInputName4").val();
        let petSit = inputedHours*27.6;
        let petWalk = inputedHours*27.6;
        let petB =  55.2;
        let petGroom = 46 ;

        console.log(inputedName);
        console.log(inputedEmail);
        console.log(inputedDate);
        console.log(inputedTime);
        console.log(service);
        console.log(inputedHours);

        if (inputedName=="Name" || inputedEmail=="Enter email" || inputedEmail=="mm/dd/yyyy" || inputedHours == "Number of Hours with Pet" ||service == "Select a Service"){
            alert("Please fill out all details on the form");
        } else if (service == "Pet Sitting"){
          document.getElementById("appointment").innerHTML = ("Your pet sitting appointment is set for " + inputedDate + " at " + inputedTime + " Hours. Your cost is " + petSit + "USD")
        } else if (service == "Pet Walking"){
            document.getElementById("appointment").innerHTML = ("Your pet walking appointment is set for " + inputedDate + " at " + inputedTime + " Hours. Your cost is " + petWalk + "USD")
        }else if (service == "Pet Boarding"){
            document.getElementById("appointment").innerHTML = ("Your pet boarding appointment is set for " + inputedDate + " at " + inputedTime + " Hours. Your cost is " + petB + "USD")
        }else if (service == "Pet Grooming"){
            document.getElementById("appointment").innerHTML = ("Your pet grooming appointment is set for " + inputedDate + " at " + inputedTime + " Hours. Your cost is " + petGroom + "USD")
        }


    });
    
});

// Testimonials carousel
$(".testimonial-carousel").owlCarousel({
    center: true,
    autoplay: true,
    smartSpeed: 2000,
    dots: true,
    loop: true,
    responsive: {
        0:{
            items:1
        },
        576:{
            items:1
        },
        768:{
            items:2
        },
        992:{
            items:3
        }
    }
});