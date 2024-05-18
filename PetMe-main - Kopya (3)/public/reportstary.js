const help_btn = document.querySelector(".help_btn");
    const popup = document.getElementById("popup");
    const Gobtn = document.getElementById("GoButton");
    const close = document.getElementById("close");

    const Gotopage = () => {
        const link = "https://www.google.com/maps/search/veterinary+clinic/";
        const city = document.getElementById("input").value;
        const formattedCity = encodeURIComponent(city); // URL'ye uygun formata dönüştürme
        
        if (formattedCity.trim() !== "") {
            const finalLink = link + formattedCity;
            window.location.href = finalLink;
        }
    };

    help_btn.addEventListener("click", () => {
        popup.style.display = "block";
    });

    close.addEventListener("click", () => {
        popup.style.display = "none";
    });

    Gobtn.addEventListener("click", Gotopage);
