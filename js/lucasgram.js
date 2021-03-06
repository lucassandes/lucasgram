/**
 * Created by lucassandes on 10/25/16.
 */
//starting bootstrap tooltip
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});

function startModal() {
    $('#my-dropzone').show();
    $("#filter-or-edit").hide();
    $("#share-to").hide();
    $("#upload-article").hide();
    $("#upload-done").hide();
}

//disable button until user uploads img
$(document).ready(function () {
    startModal();
    $('#next-button').addClass("disabled");

});


$("#close-modal").click(function () {

});


//uploader class
var uploader = new Dropzone('#my-dropzone');
var isCustomFilter = false;
var appliedFilter = null;
function applyFilter(image, isCustomFilter) {

    if (isCustomFilter) {
        image.css("-webkit-filter", customFilterCSS);
        image.css("-moz-filter", customFilterCSS);
        image.css("-ms-filter", customFilterCSS);
        image.css("-o-filter", customFilterCSS);
        image.css("filter", customFilterCSS);
    }
    else {
        image.addClass(appliedFilter);
    }

}


uploader.on('success', function (file, resp) {
    $("#next-button").removeClass("disabled").attr('title', 'Next to chose filters').attr('data-original-title', 'Next to chose filters');
    console.log('beleza');
    console.log(file.name);

    var uploadedImage = 'uploads/' + file.name;
    $("#next-button").click(function () {

        $("#next-button").removeAttr('title').removeAttr('data-original-title');

        $("#uploaded-image").attr('src', uploadedImage);
        $(".uploaded-image-thumb").attr('src', uploadedImage);

        $("#my-dropzone").hide();
        $("#filter-or-edit").show();
        $("#myModalLabel").html('Chose a filter or create your own!');

        //apply filters

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
            $("#uploaded-image").removeClass().addClass('img-responsive walden');
            appliedFilter = 'walden';
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
        $(".uploaded-image").attr('src', uploadedImage);


        //share-to
        $("#next-button").click(function () {

            ($("#has-custom-filter").hasClass('active')) ? isCustomFilter = true : isCustomFilter = false;
            var pictureToShare = $("#picture-to-share").attr('src', uploadedImage);
            applyFilter(pictureToShare, isCustomFilter);
            $("#myModalLabel").html('Share');
            $("#next-button").html('Share');
            $("#filter-or-edit").hide();
            $("#share-to").show();


            $("#next-button").click(function () {
                $("#next-button").html('Share').attr('data-dismiss', 'modal');
                var location = $("#input-location").val();
                var caption = $("#input-caption").val();
                var uploadedImage = $("#upload-image").attr('src', 'uploads/' + file.name);
                $("#upload-location").html(location);
                $("#upload-caption").html(caption);

                applyFilter(uploadedImage, isCustomFilter);

                $("#upload-area").hide();

                $("#next-button").hide();
                $("#share-to").hide();
                $("#upload-done").show();

                $("#myModalLabel").html('Upload done!');

                $("#upload-article").fadeIn("slow", function () {
                    // Animation complete
                });

            });

        });
    });


});


function rewriteSliderValue(n) {
    return 1 + (n / 100)

}

var customFilterCSS = '';
$(document).ready(function () {
    //thanks http://css3.bradshawenterprises.com/filters/
    var controls_input = $("#controls input"),
        image = $(".uploaded-image");

    function updateDisplay() {
        var newCSS = '';
        var value;
        controls_input.each(function () {
            var units = '';
            value = rewriteSliderValue($(this).val());
            if ($(this).attr('id') == 'blur') {
                units = 'px';
                value = $(this).val();
            } else if ($(this).attr('id') == 'hue-rotate') {
                units = 'deg';
                value = $(this).val();
            } else if ($(this).attr('id') == 'sepia') {
                value = $(this).val();
            }


            newCSS += $(this).attr('id') + "(" + value + units + ") ";
            customFilterCSS = newCSS;
            console.log(customFilterCSS);
            $("#" + $(this).attr('id') + "_output").text($(this).attr('id') + "(" + value + units + ")");
        })
        image.css("-webkit-filter", newCSS);
        image.css("-moz-filter", newCSS);
        image.css("-ms-filter", newCSS);
        image.css("-o-filter", newCSS);
        image.css("filter", newCSS);
    }

    updateDisplay();

    controls_input.change(updateDisplay);

    $("#reset").click(function () {
        controls_input.each(function () {
            $(this).val($(this).attr('data-default'));
        });
        updateDisplay();
        return false;
    });
});
