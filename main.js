$(document).ready(function() {
    //recupero la struttura html del template
    var template_html = $("#card-cd").html();
    // preparo la funzione al fine di utilizzare il template con handlebars
    var template_function = Handlebars.compile(template_html);
    //faccio una chiamata ajax per recuperare i dati nell'api
    $.ajax({
        "url": "https://flynn.boolean.careers/exercises/api/array/music",
        "method": "GET",
        "success": function(data) {
            var dischi = data.response;
            // console.log(data.response[3]);
            for (var i = 0; i < dischi.length; i++) {
                //salvo il cd corrente
                var cd_corrente = dischi[i];
                //creo un oggetto con i dati del singolo cd per compilare il placeholder di Handlebars
                var disco = {
                    "image" : cd_corrente.poster,
                    "titolo" : cd_corrente.title,
                    "autore" : cd_corrente.author,
                    "anno" : cd_corrente.year,
                    "genere" : cd_corrente.genre.toLowerCase()
                }
                //inserisco le proprietà dell'oggetto nella funzione Handlebars
                var html_finale = template_function(disco);
                //insericso i dischi nell html
                $(".cds-container").append(html_finale)
            }
        },
        "error": function() {
            alert("Si è verificato un errore")
        }
    })

    //BONUS
    //intercetto il cambio di genere nell'elemento select
    $("#genre-select").change(function() {
        //salvo il valore del genere selezionato
        var genere_sel = $(this).val();
        //al cambio genere rimuovo la classe active a tutti i dischi
        $(".cd").removeClass("active");
        //se viene selezionato "all" nel select, visualizzo tutti i dischi
        if (genere_sel == "all") {
            $(".cd").addClass("active")
        } else {
            //altrimenti seleziono i cd con il data-genere uguale a quello selezionato dal select
            $(".cd[data-genere='" + genere_sel + "']").addClass("active");
        }
    })
});
