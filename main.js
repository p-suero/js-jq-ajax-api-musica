// Con una chiamata ajax, recuperare i dischi musicali restituiti dall'api:
// https://flynn.boolean.careers/exercises/api/array/music
// Ciclare quindi i dischi e ottenuti e per ognuno di essi disegnare in pagina una card utilizzando handlebars.


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
            console.log(data);
            var dischi = data.response;
            // console.log(data.response[3]);
            for (var i = 0; i < dischi.length; i++) {
                //salvo il cd corrente
                var cd_corrente = dischi[i];
                console.log(cd_corrente);
                //creo un oggetto con i dati del singolo cd per compilare il placeholder di Handlebars
                var disco = {
                    "src" : cd_corrente.poster,
                    "titolo" : cd_corrente.title,
                    "autore" : cd_corrente.author,
                    "anno" : cd_corrente.year,
                    "genere" : cd_corrente.genre
                }
                //inserisco nella funzione di handlebars i dati dell'oggetto
                var html_finale = template_function(disco)
                //inserisco in pagina il disco cd_corrente
                $(".cds-container").append(html_finale)
            }
        },
        "error": function() {
            alert("Si è verificato un errore")
        }
    })
});
