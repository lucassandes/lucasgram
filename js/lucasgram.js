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
    $("#create-filter").hide();
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


        // create filters
        $("#create-filter-btn").click(function () {
            $("#create-filter").show();
            $("#apply-filters").hide();
            $("#create-filter-img").attr('src', 'uploads/' + file.name);


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



function rewriteSliderValue(n) {
    return 1 + (n/100)

}


$(document).ready(function() {
    //thanks http://css3.bradshawenterprises.com/filters/
    var controls_input = $("#controls input"),
        image = $("#create-filter-img");

    function updateDisplay() {
        var newCSS = '';
        var value;
        controls_input.each(function(){
            var units = '';
            value = rewriteSliderValue($(this).val());
            if ($(this).attr('id') == 'blur') {
                units = 'px';
                value = $(this).val();
            } else if ($(this).attr('id') == 'hue-rotate') {
                units = 'deg';
                value = $(this).val();
            } else if ($(this).attr('id') == 'sepia' ) {
                value = $(this).val();
            }


            newCSS += $(this).attr('id')+"("+value+units+") ";

            $("#"+$(this).attr('id')+"_output").text($(this).attr('id')+"("+value+units+")");
        })
        image.css("-webkit-filter", newCSS);
        image.css("-moz-filter", newCSS);
        image.css("-ms-filter", newCSS);
        image.css("-o-filter", newCSS);
        image.css("filter", newCSS);
    }
    updateDisplay();

    controls_input.change(updateDisplay);

    $("#reset").click(function(){
        controls_input.each(function(){
            $(this).val($(this).attr('data-default'));
        });
        updateDisplay();
        return false;
    });
});
