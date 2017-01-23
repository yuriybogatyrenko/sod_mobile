$(document).ready(function () {
    // $('body').append('<script src="js/PP.js"></script>');

    if ($('#age_slider').length > 0) {
        var age_slider = new Slider('#age_slider', {
            tooltip: 'always',
            tooltip_split: true
        });
    }

    if ($('#tall_slider').length > 0) {
        var age_slider = new Slider('#tall_slider', {
            tooltip: 'always'
        });
    }

    if ($('#tall_slider_search_form').length > 0) {
        var age_slider = new Slider('#tall_slider_search_form', {
            tooltip: 'always',
            tooltip_split: true
        });
    }

    if ($('#weight_slider').length > 0) {
        var age_slider = new Slider('#weight_slider', {
            tooltip: 'always'
        });
    }

    if ($('#weight_slider_search_form').length > 0) {
        var age_slider = new Slider('#weight_slider_search_form', {
            tooltip: 'always',
            tooltip_split: true
        });
    }

    $(document).on('change', '.meet_goal input[type=radio].row_connector, .meet_goal input[type=checkbox].row_connector', function () {
        var row_bl = $(this).closest('.row');
        if ($(this).is(':checked')) {
            row_bl.addClass('active');
        } else {
            row_bl.removeClass('active');
        }
    });

    $('.no-carousel-interval').carousel({
        interval: false
    })

    $('.folder_menu .clickable_menu').click(function () {
        var bl = $(this).closest('.folder_menu');
        if (!bl.hasClass('active')) {
            $('.folder_menu').removeClass('active');
            bl.addClass('active');
        } else {
            bl.removeClass('active');
        }
    });

    $(document).click(function (e) {
        if ($(e.target).closest('.folder_menu').length < 1) {
            $($('.folder_menu').removeClass('active'));
        }
    })

    $('.meet_goal input[type=radio].row_connector:checked, .meet_goal input[type=checkbox].row_connector:checked').closest('.row').addClass('active');

    $(document).on('click', '.hidden_filter_clickable_block .catch_click', function () {
        $('.toggle_search_add_filter').slideToggle(300);
    })

    $('.carousel.slide').each(function () {
        var bl = $(this)
        bl.swiperight(function () {
            bl.carousel('prev')
        });
        bl.swipeleft(function () {
            bl.carousel('next')
        });
    })
    $("#myCarousel").swiperight(function () {
        $("#myCarousel").carousel('prev');
    });
    $("#myCarousel").swipeleft(function () {
        $("#myCarousel").carousel('next');
    });

    $(document).on('click', '.section_block_separator .clickable_open_hide', function () {
        $(this).closest('.section_block_separator').find('.hidden_block').slideToggle(300);
    })

    $(document).on('click', '.calls_toggle_settings .slider_calls', function (e) {
        var bl = $(this).closest('.calls_toggle_settings');
        if (bl.hasClass('on')) {
            bl.removeClass('on').addClass('off');
            bl.find('.calls_slider_text').text('Звонки отключены');
        } else {
            bl.removeClass('off').addClass('on');
            bl.find('.calls_slider_text').text('Звонки подключены');
        }
        e.preventDefault();
    });

    $(document).on('click', '.settings_page .icon_edit', function () {
        $(this).closest('.line_wrap').find('.hidden_block_settings').slideToggle(300)
    })

    if ($('input[type=checkbox].customized, input[type=radio].customized').length > 0) {
        $('input[type=checkbox].customized, input[type=radio].customized').each(function () {
            if ($(this).attr('type') == 'checkbox') {
                var this_class = $(this).attr('class');
                if ($(this).attr("class") == undefined) {
                    $(this).wrap('<span class="checkbox_el">');
                } else {
                    $(this).wrap('<span class="checkbox_el ' + this_class + '">');
                    // $(this).removeClass(this_class);
                }
            } else if ($(this).attr('type') == 'radio') {
                $(this).wrap('<span class="radio_parent_el">');
                $(this).wrap('<span class="radio_el">');
            }

            if ($(this).is(':checked'))
                $(this).parent().addClass('icon-check');
            else
                $(this).parent().addClass('icon-check-empty');
        });
    }

    $(document).on('change', 'input[type=checkbox].customized, input[type=radio].customized', function () {
        if ($(this).attr('type') == 'checkbox') {
            if (!$(this).is(':checked')) {
                $(this).parent().addClass('icon-check-empty').removeClass('icon-check');
            } else
                $(this).parent().addClass('icon-check').removeClass('icon-check-empty');
        } else {
            if ($(this).is(':checked')) {
                var el = $(this).attr('name');
                $('input[type=radio][name="' + el + '"].customized').parent().removeClass('active');
                $(this).parent().addClass('active');
            }
        }
    });

    /*$(document).on('click', '.clickcable.add_exception', function(){
     $('#add_exception_popup').css({display:'block'});
     $('body').addClass('popup_show')
     });*/

    $(document).on('click', '.close_popup', function () {
        var pop = $(this).closest('.popup');
        $('body').removeClass('popup_show')
        if (pop.is('#profile_submenu')) {
            pop.addClass('trans')
            pop.removeAttr('style');
            set_body_pos();
            setTimeout(function () {
                pop.removeClass('trans')
            }, 500)
        } else {
            pop.css({display: 'none'});
        }

    });

    $(document).on('click', '*[data-call-popup]', function (e) {
        var pop = $(this).data('call-popup');
        $('body').addClass('popup_show');
        if (pop == '#profile_submenu') {
            $(pop).addClass('trans')
            $(pop).css({left: 0});
            get_body_pos();
            setTimeout(function () {
                pop.removeClass('trans')
            }, 500)
        } else {
            $(pop).css({display: 'block'});
        }
        e.preventDefault();
    })

    $('.search_quick_filter .toggle_button').click(function () {
        $(this).siblings('.toggle_hidden').stop().animate({width: 'toggle'}, 200).css({display: 'inline-block'});
    })


    $(document).on('click', '*[data-close-popup]', function (e) {
        var pop = $(this).data('close-popup');
        $('body').removeClass('popup_show');
        if (pop == '#profile_submenu') {
            $(pop).removeClass('active');
            get_body_pos();
        } else {
            $(pop).css({display: 'none'});
        }
        e.preventDefault();
    })

    //modify buttons style
    if ($('*[data-editable-element-active]').length > 0) {
        $.fn.editableform.buttons =
            '<button type="submit" class="red_btn small">Ok</button>';
    }

    $('*[data-editable-element-active]').each(function () {
        var v_type = $(this).data('editable-type');

        if (!v_type)
            v_type = "text";

        $(this).on('shown', function (e, editable) {
            if (editable && $(this).data('phone-mask') == true) {
                editable.input.$input.mask("+7 (999) 999-99-99");
                // console.log($(editable.input.$input).mask("+7 (999) 999-99-99"))
            }

            if (editable && $(this).data('type') == "address") {
                $('.select_ajax').selectpicker();
            }

            var el = $(this).attr("id");
            $('*[data-editable-target=#' + el + ']').addClass('hidden');
        });

        $(this).on('hidden', function (e, editable) {
            var el = $(this).attr("id");
            $('*[data-editable-target=#' + el + ']').removeClass('hidden');
        });

        $(this).editable({
            type: v_type,
            url: '',
            pk: 1,
            placement: 'top',
            title: 'Enter public name',
            toggle: 'manual',
            mode: 'inline'
        });
    })

    $(document).on('click', '*[data-editable-btn]', function (e) {
        e.stopPropagation()
        var target = $(this).data('editable-target');

        $(target).editable('toggle');
    });

    if ($('input[data-inputmask]').length > 0) {
        $('input[data-inputmask]').addClass("data-inputmasked-true").mask("+7 (999) 999-99-99");
    }

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });

    $(document).on('click', '.user_inside_folder_item .favorites', function () {
        if ($(this).hasClass('icon-star-empty'))
            $(this).removeClass('icon-star-empty').addClass('icon-star-1')
        else
            $(this).addClass('icon-star-empty').removeClass('icon-star-1')
    });

    /*$('body').on('swipe', function(e){
     // console.log(e)
     if($(e.target).hasClass('carousel') || $(e.target).closest('.carousel').length > 0 || $('#profile_submenu').length == 0)
     return

     var sstartX = e.swipestart.coords[0]
     var sstartY = e.swipestart.coords[1]

     var sstopX = e.swipestop.coords[0]
     var sstopY = e.swipestop.coords[1]

     var deltaX = sstartX-sstopX;
     var deltaY = sstartY-sstopY;

     if(deltaX > 0 && Math.abs(deltaY) < Math.abs(deltaX))
     direction = "left";
     else if(deltaX < 0 && Math.abs(deltaY) < Math.abs(deltaX))
     direction = "right";
     else
     direction = false

     if(direction == "left" && $('#profile_submenu').hasClass('active')) {
     $('#profile_submenu').removeClass('active');
     $('body').removeClass('popup_show')
     set_body_pos();
     } else if(direction == "right" && !$('#profile_submenu').hasClass('active')) {
     $('#profile_submenu').addClass('active')
     get_body_pos();
     $('body').addClass('popup_show');
     }
     })*/

    startup();

});

function startup() {
    var el = document.getElementsByTagName("body")[0];
    var startX, endX, startY, endY, menu_pos, menuWidth, menu_final_pos, win_pos = false, $the_menu = $('#profile_submenu');
    el.addEventListener("touchstart", handleStart, false);
    el.addEventListener("touchend", handleEnd, false);
    el.addEventListener("touchcancel", handleCancel, false);
    el.addEventListener("touchmove", handleMove, false);

    function handleStart(e) {
        if (
            $(e.target).hasClass('carousel')
            || $(e.target).closest('.carousel').length > 0
            || $the_menu.length == 0
            || $(e.target).hasClass('.jquery_bootstrap_slider')
            || $(e.target).closest('.jquery_bootstrap_slider').length > 0
        )
            return

        startX = e.changedTouches[0].clientX;
        startY = e.changedTouches[0].clientY;
        menu_pos = $the_menu.offset().left
        menuWidth = $the_menu.outerWidth();
        win_pos = false;
        menu_final_pos = -menuWidth;
    }

    function handleEnd(e) {
        if (
            $(e.target).hasClass('carousel')
            || $(e.target).closest('.carousel').length > 0
            || $the_menu.length == 0
            || $(e.target).hasClass('.jquery_bootstrap_slider')
            || $(e.target).closest('.jquery_bootstrap_slider').length > 0
        )
            return
        endX = e.changedTouches[0].clientX
        endY = e.changedTouches[0].clientY

        var deltaX, deltaY;

        deltaX = startX - endX;
        deltaY = startY - endY;

        // menuWidth

        if (Math.abs(deltaX) > menuWidth * 0.3 && deltaX < 0) {
            menu_final_pos = 0;
            get_body_pos();
            $the_menu.addClass('active')
            $('body').addClass('popup_show');
        } else if ((Math.abs(deltaX) > menuWidth * 0.3 && deltaX > 0)) {
            menu_final_pos = -menuWidth;
            $('body').removeClass('popup_show')
            set_body_pos();
            $the_menu.removeClass('active')
        } else {
            if ($the_menu.hasClass('active'))
                menu_final_pos = 0;
            else
                menu_final_pos = -menuWidth;
        }

        $the_menu.addClass('trans').css({left: menu_final_pos});

        setTimeout(function () {
            $the_menu.removeClass('trans');
        }, 500)

        if (Math.abs(deltaX) > Math.abs(deltaY))
            console.log('swipe horizontal')
    }

    function handleCancel(e) {
        if (
            $(e.target).hasClass('carousel')
            || $(e.target).closest('.carousel').length > 0
            || $the_menu.length == 0
            || $(e.target).hasClass('.jquery_bootstrap_slider')
            || $(e.target).closest('.jquery_bootstrap_slider').length > 0
        )
            return
        // console.log('cancel')
    }

    function handleMove(e) {
        if (
            $(e.target).hasClass('carousel')
            || $(e.target).closest('.carousel').length > 0
            || $the_menu.length == 0
            || $(e.target).hasClass('.jquery_bootstrap_slider')
            || $(e.target).closest('.jquery_bootstrap_slider').length > 0
        )
            return

        var posX = e.changedTouches[0].clientX;
        var posY = e.changedTouches[0].clientY;
        var deltaX, deltaY;

        deltaX = startX - posX;
        deltaY = startY - posY;

        if (Math.abs(deltaX) > 20 && Math.abs(deltaX) > Math.abs(deltaY) && win_pos == false) {
            win_pos = true;
        } else if (Math.abs(deltaX) < Math.abs(deltaY)) {
            win_pos = false;
        }

        menu_final_pos = menu_pos - deltaX;

        if (menu_final_pos < -menuWidth) {
            menu_final_pos = -menuWidth;
        } else if (menu_final_pos > 0) {
            menu_final_pos = 0;
        }

        if (win_pos != false) {
            get_body_pos();
            $('body').addClass('popup_show');
        }

        $the_menu.css({left: menu_final_pos});
    }
}

function get_body_pos() {
    var pos = $(window).scrollTop();
    $('body').css({top: -pos}).attr('data-wpos', pos);
}

function set_body_pos() {
    var pos = parseInt($('body').attr('data-wpos'));
    $('body').css({top: 0})
    $(window).scrollTop(pos);
}

/* LANGS JS COMES HERE*/

$(document).ready(function () {
    $(document).on('click', '#--langs-popup-close', function (e) {
        e.preventDefault();
        $('body').removeClass('popup_show');
        $(this).closest('.--langs-popup__body').removeClass('active');
    });

    $(document).on('click', '#--langs-popup-call', function (e) {
        e.preventDefault();
        $('body').addClass('popup_show');
        $('.--langs-popup__body').addClass('active');
    });
});

var App = {};

App.photosUpload = function (options) {
    var plugin = {};

    plugin.vars = {};
    plugin.vars.container = $(options.className);
    plugin.vars.deleteIconsClass = '.icon-reg-delete-mask';
    plugin.vars.cropIconsClass = '.icon-reg-crop-mask';
    plugin.vars.moderationIconClass = '.icon-moderation-middle';
    plugin.vars.cropClose = plugin.vars.container.find('.js-close-crop');
    plugin.vars.input = plugin.vars.container.find('.js-registration__upload-input');
    plugin.vars.containerText = plugin.vars.container.find('.js-registration__upload-placeholder');
    plugin.vars.addedPhotos = 0;
    plugin.vars.photosContainer = plugin.vars.container.find('.registration__upload-units');
    plugin.vars.continueButton = $('.js-crop-continue-button');
    plugin.vars.cropContainer = plugin.vars.container.closest('.registration-mask__wrapper');
    plugin.vars.doc = $(document);
    plugin.vars.newPhotosClass = '.registration__upload-added-item';
    plugin.vars.template = function (ev) {
        return '' +
            '<div class="registration__upload-item registration__upload-added-item" style="width: 0;">' +
                '<img src="'+ ev.target.result +'" class="registration__upload-image" alt="">' +
                '<i class="icon-moderation-middle"></i>' +
                '<i class="icon-reg-delete-mask"></i>' +
                '<i class="icon-reg-crop-mask"></i>' +
            '</div>';
    };

    plugin.init = function () {
        plugin.bindings();
    };

    plugin.bindings = function () {
        plugin.vars.doc.on('click', plugin.vars.cropIconsClass, function () {
            plugin.cropOpen();
        });

        plugin.vars.doc.on('click', plugin.vars.deleteIconsClass, function () {
            plugin.cropClose();
        });
    };

    plugin.cropOpen = function () {
        plugin.vars.cropContainer.fadeIn(200);
    };

    plugin.cropClose = function () {
        plugin.vars.cropContainer.fadeOut(200);
    };

    plugin.conditionUpdate = function () {
        console.log(plugin.countUpdate())
        if (plugin.countUpdate() > 0) {
            plugin.vars.containerText.addClass('hidden');
            plugin.vars.continueButton.removeAttr('disabled');
            plugin.vars.continueButton.removeClass('disabled');
        } else {
            plugin.vars.containerText.removeClass('hidden');
            plugin.vars.continueButton.attr('disabled', true);
        }
    };

    plugin.countUpdate = function () {
        var array = plugin.vars.container.find('.registration__upload-added-item');
        return array.length;
    };

    plugin.showNotice = function (bl) {
        // show notice
        bl.classList.add('show-notice-active');
    };

    plugin.hideNotice = function (bl) {
        // hide notice
        bl.classList.remove('show-notice-active');
    };

    plugin.vars.input.on('change', function () {
        if (this.files && this.files[0] && window.FileReader) {
            // console.log(this.files);
            _this = this;
            var the_files = _this.files;
            Object.keys(the_files).map(function (objectKey, index) {
                var value = the_files[objectKey];
                var input = _this;
                var reader = new FileReader();

                reader.onload = function (e) {
                    plugin.vars.photosContainer
                        .append(plugin.vars.template(e));

                    setTimeout(function () {
                        $(plugin.vars.newPhotosClass).removeAttr('style');
                        input.removeAttribute("value");

                        plugin.conditionUpdate();
                        plugin.bindings();
                    }, 20);
                };
                reader.readAsDataURL(value)
            });
        }
    });

    plugin.init();

    if (options)
        return plugin;
};

App.photosUpload({
    className: '.registration__upload-area'
});