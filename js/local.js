$(document).ready(function() {

    // kliknięcie na IMG w .portfolio_container pokazuje obrazek (MODAL) 
    $(".portfolio_container img").click(function() {
        $(".modal_image, #modal_caption").removeClass("zoomout"); // upewniamy się, że elementy powiększenia nie mają klasy .zoomout
        $("#shuttersound").get(0).play(); // odtwarzamy dźwięk migawki 
        var bg = $(this).css("background-image"); // odczytujemy wartość background-image klikniętego obrazka...
        bg = bg.replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, ''); // ...  i wydostajemy z niej ścieżkę do pliku obrazka

        $("#modal_container").css("display", "block"); // wyświetlamy kontener powiększenia
        $('#modal_img').attr("src", bg); // ustawiamy źródło wyświetlanego obrazka na to, które ustaliliśmy powyżej
        $('#modal_caption').html($(this).attr("alt")); // ustawiamy podpis obrazka na tekst, który znajduje się w argumencie ALT obrazka
    });

    // kliknięcie w obrazek na MODAL - zamyka modal 
    $("#modal_img").click(function() {
        // odtwarzamy dźwięk kliknięcia 
        $("#mousesound").get(0).play();

        $(".modal_image, #modal_caption").addClass("zoomout");

        setTimeout(function() {
            $("#modal_container").css("display", "none");
        }, 590);
        // $("#modal_container").css("display", "none");
    })



    // Płynne przewijanie strony przy klikaniu w odnośniki prowadzące do innego miejsca na stronie

    $(".navbar a:not('.dropdown-toggle'), #scroll_back_button, .button_black, .button_white").on('click', function(event) {
        // odtwarzamy dźwięk buttona 
        $("#mousesound").get(0).play();
        // Upewniamy się, czy kliknięty element ma jakiś hash w atrybucie href
        if (this.hash !== "") {
            // blokujemy domyślne działanie zdarzenia
            event.preventDefault();

            // zapamiętujemy hash
            var hash = this.hash;

            // Korzystamy z metody animate() z JQuery do płynnego przwijania strony
            // Opcjonalna wartość (900) określa czas przewijania w milisekundach
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 900, function() {

                // Dodajemy hash (#) do URLa po skończonym przewijaniu
                window.location.hash = hash;
            });
        } // End if
    });


    // animacja elementów w momencie ich pojawienia się na ekranie
    $(window).scroll(function() {
        $(".slideanim.full_container").each(function() {
            var pos = $(this).offset().top;

            var winTop = $(window).scrollTop();
            if (pos < winTop + 600) {
                $(this).addClass("slide");
            }
        });
    });

    $(window).scroll(function() {
        $(".slideanim.left_container").each(function() {
            var pos = $(this).offset().top;

            var winTop = $(window).scrollTop();
            if (pos < winTop + 600) {
                $(this).addClass("slide_left");
            }
        });

        $(".slideanim.right_container").each(function() {
            var pos = $(this).offset().top;

            var winTop = $(window).scrollTop();
            if (pos < winTop + 600) {
                $(this).addClass("slide_right");
            }
        });

    });


    // Testowanie pozycji okna podczas scrollowania - wyświetlanie i ukrywanie buttona "scroll top"
    window.onscroll = function() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            document.getElementById("scroll_back_button").style.display = "block";
        } else {
            document.getElementById("scroll_back_button").style.display = "none";
        }
    }

});