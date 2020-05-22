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
            gestisci_dati(data)
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
        //se viene selezionato un genere nel select, visualizzo i dischi per genere
        if (genere_sel != "") {
            //rimuovo i dischi visualizzati
            $(".cd").removeClass("active");
            //altrimenti seleziono i cd con il data-genere uguale a quello selezionato dal select
            $(".cd[data-genere='" + genere_sel + "']").addClass("active");

        } else {
            //altrimenti visualizzo tutti i dischi
            $(".cd").addClass("active");
        }
    })

    //FUNZIONI
    function gestisci_dati(disco) {
        //recupero l'oggetto contenente i dischi nell'API
        var dischi = disco.response;
        // console.log(data.response[3]);
        for (var i = 0; i < dischi.length; i++) {
            //salvo il cd corrente
            var cd_corrente = dischi[i];
            //aggiungo i cd in pagina html
            aggiungi_disco(cd_corrente)
        }
    }

    function aggiungi_disco(cd) {
        //creo un oggetto con i dati del singolo cd per compilare il placeholder di Handlebars
        var context = {
            "image" : cd.poster,
            "titolo" : cd.title,
            "autore" : cd.author,
            "anno" : cd.year,
            "genere" : cd.genre.toLowerCase()
        }
        //inserisco le proprietà dell'oggetto nella funzione Handlebars
        var html_finale = template_function(context);
        //insericso i dischi nell html
        $(".cds-container").append(html_finale)
    }
});
