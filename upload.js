function upload(){
    // Attraper l'élément input pour l'image téléchargée
    var input = $('#input-image');

    // Attraper l'élément img pour afficher les images divisées
    var img = $('#img');

    // Écouter l'événement change sur l'élément input directement
    $('#input-image').change(function() {
        // Récupérer l'image téléchargée
        var image = input.prop('files')[0];

        // Vérifier que l'image est une image
        if (!image.type.match('image.*')) {
            alert('Seules les images sont acceptées');
            return;
        }

        // Créer un lecteur d'image pour lire l'image téléchargée
        var reader = new FileReader();
        reader.onload = function(e) {
            // Récupérer les données de l'image
            var data = e.target.result;

            // Charger l'image dans l'élément img pour obtenir les propriétés de l'image
            img.attr('src', data);
            img.on('load', function() {
                // Récupérer les propriétés de l'image
                var width = img.width();
                var height = img.height();

                // Diviser l'image en 48 tranches horizontales égales
                var sliceWidth = width / 48;
                for (var i = 0; i < 48; i++) {
                    var canvas = document.createElement('canvas');
                    var context = canvas.getContext('2d');
                    canvas.width = sliceWidth;
                    canvas.height = height;

                    context.drawImage(img[0], i * sliceWidth, 0, sliceWidth, height, 0, 0, sliceWidth, height);

                    // Afficher l'image divisée sur la page web
                    var image = $('<img>').attr('src', canvas.toDataURL());
                    var number = $('<p>').text(i + 1);
                    $('#slices').append(number, image);
                }
            });
        };
        reader.readAsDataURL(image);
    });
}

window.upload = upload;

