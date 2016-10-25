/**
 * Created by lucassandes on 10/25/16.
 */
//starting bootstrap tooltip
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

function startModal() {
    $('#my-dropzone').show();
    $("#apply-filters").hide();
    $("#share-to").hide();
    $("#upload-article").hide();
}
;
//disable button until user uploads img
$(document).ready(function () {
    startModal();
    $('#next-button').addClass("disabled");

});


$("#close-modal").click(function () {

});


//uploader class
var uploader = new Dropzone('#my-dropzone');

uploader.on('success', function (file, resp) {
    $("#next-button").removeClass("disabled").attr('title', 'Next to chose filters').attr('data-original-title', 'Next to chose filters');
    console.log('beleza');
    console.log(file.name);


    $("#next-button").click(function () {
        $("#uploaded-image").attr('src', 'uploads/' + file.name);
        $(".uploaded-image-thumb").attr('src', 'uploads/' + file.name);

        $("#my-dropzone").hide();
        $("#apply-filters").show();
        $("#myModalLabel").html('Chose a filter or <a href="#" id="create-filter-btn">create your own!</a>');

        //apply filters
        var appliedFilter;
        //no-filter
        $("#filter-1").click(function () {
            $("#uploaded-image").removeClass().addClass('img-responsive');
            appliedFilter = null;

        });

        //Brannan
        $("#filter-2").click(function () {
            $("#uploaded-image").removeClass().addClass('img-responsive brannan');
            appliedFilter = 'brannan';
        });

        //inkwell
        $("#filter-3").click(function () {
            $("#uploaded-image").removeClass().addClass('img-responsive inkwell');
            appliedFilter = 'inkwell';
        });

        //_1977
        $("#filter-4").click(function () {
            $("#uploaded-image").removeClass().addClass('img-responsive _1977');
            appliedFilter = '_1977';
        });

        //aden
        $("#filter-5").click(function () {
            $("#uploaded-image").removeClass().addClass('img-responsive aden');
            appliedFilter = 'aden';
        });

        //brooklyn
        $("#filter-6").click(function () {
            $("#uploaded-image").removeClass().addClass('img-responsive brooklyn');
        });


        $("#next-button").click(function () {
            //share-to

            $("#myModalLabel").html('Share');


            $("#picture-to-share").attr('src', 'uploads/' + file.name).addClass(appliedFilter);
            $("#apply-filters").hide();
            $("#share-to").show();


            $("#next-button").click(function () {
                $("#next-button").html('Share').attr('data-dismiss', 'modal');
                var location = $("#input-location").val();
                var caption = $("#input-caption").val();

                $("#upload-location").html(location);
                $("#upload-caption").html(caption);
                $("#upload-image").attr('src', 'uploads/' + file.name).addClass(appliedFilter);

                $("#upload-article").fadeIn("slow", function () {
                    // Animation complete
                });

            });

        });
    });


});


//Range sliders

// With JQuery
$('#brightness').slider({
    formatter: function(value) {
        return value;
    }
});


function minTwoDigits(n) {
    return (n < 10 ? '0' : '') + n;
}

function rewriteMinusNumbers(n) {
    return (n < 0 ? '0' : '1');
}

function rewriteSliderValue(n) {
    return rewriteMinusNumbers(n)+'.'+minTwoDigits(Math.abs(n));
}
$("#brightness").on("slide", function(slideEvt) {
    $("#create-filter-img").css({

        'filter': 'brightness('+rewriteSliderValue(slideEvt.value)+')',
        '-webkit-filter': 'brightness('+rewriteSliderValue(slideEvt.value)+')',
        '-moz-filter': 'brightness('+rewriteSliderValue(slideEvt.value)+')',
        '-o-filter': 'brightness('+rewriteSliderValue(slideEvt.value)+')',
        '-ms-filter': 'brightness('+rewriteSliderValue(slideEvt.value)+')'
    });
    //$("#ex6SliderVal").text(minTwoDigits(Math.abs(slideEvt.value)));
    $("#ex6SliderVal").text(rewriteSliderValue(slideEvt.value));
});

/*
.ig-willow {
    -webkit-filter: saturate(0.02) contrast(0.85) brightness(1.2) sepia(0.02);
    filter: saturate(0.02) contrast(0.85) brightness(1.2) sepia(0.02);
}*/