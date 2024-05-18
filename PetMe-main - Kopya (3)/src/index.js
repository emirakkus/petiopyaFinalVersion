
function hideBackToTopButton() {
    const bttButton = document.getElementById("bttbutton");

    bttButton.addEventListener("click", e => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
    })

    window.addEventListener("scroll", e => {
        bttButton.style.display = window.scrollY > 15 ? 'block' : 'none';
    })
}



// Tarayıcı ortamında çalıştığından emin olmak için bir kontrol ekle
if (typeof document !== 'undefined') {
    hideBackToTopButton();


    var imageIndex = 0;
    var imagesArray = [
        "url('./Assets/Images/main-heading-body-bg.jpg') center",
        "url('./Assets/Images/main-heading-body-bg2.png') center",
        "url('./Assets/Images/main-heading-body-bg3.png') center",
        "url('./Assets/Images/main-heading-body-bg4.png') center"
    ];

    function changeBackground() {
        var index = imageIndex++ % imagesArray.length;
        document.querySelector(".main-body-section-div").style.background = imagesArray[index];
    }

    document.addEventListener("DOMContentLoaded", function () {
        document.querySelector(".main-body-section-div").style.background = imagesArray[0];
        setInterval(changeBackground, 2000);
    });

    document.addEventListener("DOMContentLoaded", function () {
        const form = document.getElementById("subscription-form");
        const emailInput = document.getElementById("email");
        const errorMessage = document.getElementById("error-message");
        const subscribeButton = document.getElementById("subscribe-button");

        subscribeButton.addEventListener("click", function (event) {
            event.preventDefault();

            if (emailInput.value.trim() === '') {
                alert('Email address is required.');
            } else if (!isValidEmail(emailInput.value)) {
                alert('Invalid email address format.');
            } else {
                form.submit();
            }
        });

        function isValidEmail(email) {
            // Regular expression for email validation
            const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
            return emailRegex.test(email);
        }
    });
} else {
    console.log('Bu kod sadece tarayıcı ortamında çalışır. Node.js ortamında çalıştırmayın.');
}

// scroll to top function

// Change to the stored current theme.
