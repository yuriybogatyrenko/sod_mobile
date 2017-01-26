var ZOLUSHKA = (function () {

    function ZOLUSHKA() {
        var _self = this;

        _self.doc = document;
        _self.window = window;
        _self.html = _self.doc.querySelector('html');

        _self.bootstrap();
    };

    ZOLUSHKA.prototype.bootstrap = function () {
        var _self = this;
    };

    // Window load types (loading, dom, full)
    ZOLUSHKA.prototype.appLoad = function (type, callback) {
        var _self = this;

        switch (type) {
            case 'loading':
                if (_self.doc.readyState === 'loading') callback();

                break;
            case 'dom':
                _self.doc.onreadystatechange = function () {
                    if (_self.doc.readyState === 'complete') callback();
                };

                break;
            case 'full':
                _self.window.onload = function (e) {
                    callback(e);
                };

                break;
            default:
                callback();
        }
    };

    ZOLUSHKA.prototype.photosUpload = function (options) {
        var _self = this;
        var plugin = {};

        plugin.vars = {};
        plugin.vars.container = $(options.className);
        plugin.vars.deleteIconsClass = '.icon-reg-delete-mask';
        plugin.vars.cropIconsClass = '.icon-reg-crop-mask';
        plugin.vars.moderationIconClass = '.icon-moderation-middle';
        plugin.vars.cropCloseButton = plugin.vars.container.find('.js-close-crop');
        plugin.vars.closeNoticeClass = '.js-close-notice';
        plugin.vars.input = plugin.vars.container.find('.js-registration__upload-input');
        plugin.vars.containerText = plugin.vars.container.find('.js-registration__upload-placeholder');
        plugin.vars.addedPhotos = 0;
        plugin.vars.photosContainer = plugin.vars.container.find('.registration__upload-units');
        plugin.vars.continueButton = $('.js-crop-continue-button');
        plugin.vars.cropContainer = plugin.vars.container.closest('.registration-crop__container');
        plugin.vars.doc = $(document);
        plugin.vars.cropPreloader = _self.doc.querySelector('.crop-preloader');
        plugin.vars.newPhotosClass = '.registration__upload-added-item';
        plugin.vars.template = function (ev) {
            return '' +
                '<div class="registration__upload-item registration__upload-added-item" style="width: 0;">' +
                '<img src="' + ev.target.result + '" class="registration__upload-image" alt="">' +
                '<i class="icon-moderation-middle"></i>' +
                '<i class="icon-reg-delete-mask"></i>' +
                '<i class="icon-reg-crop-mask"></i>' +
                '</div>';
        };

        plugin.init = function () {
            plugin.bindings();
        };

        plugin.deleteImage = function (bl) {
            var el = bl.closest(plugin.vars.newPhotosClass);
            el.css({width: 0});
            setTimeout(function () {
                el.remove();
            }, 300);
        };

        plugin.bindings = function () {
            plugin.vars.doc.on('click', plugin.vars.cropIconsClass, function () {
                plugin.cropOpen();
            });

            plugin.vars.doc.on('click', plugin.vars.cropCloseButton, function () {
                plugin.cropClose();
            });

            plugin.vars.doc.on('click', plugin.vars.deleteIconsClass, function () {
                var $this = $(this);
                console.log($this);
                plugin.deleteImage($this);
            });

            plugin.vars.doc.on('click', plugin.vars.newPhotosClass, function () {
                plugin.showNotice();
            });

            plugin.vars.doc.on('click', plugin.vars.closeNoticeClass, function () {
                plugin.hideNotice();
            });
        };

        plugin.showCropPreloader = function () {
            _self.html.classList.add('modal-open');
            _self.doc.querySelector('.crop-preloader').classList.add('active');
        };

        plugin.hideCropPreloader = function () {
            _self.html.classList.remove('modal-open');
            _self.doc.querySelector('.crop-preloader').classList.remove('active');
        };

        plugin.cropOpen = function () {
            plugin.vars.cropContainer.fadeIn(200);
        };

        plugin.cropClose = function () {
            plugin.vars.cropContainer.fadeOut(200);
        };

        plugin.conditionUpdate = function () {
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

        plugin.showNotice = function () {
            // show notice
            document.html.classList.add('show-notice-active');
        };

        plugin.hideNotice = function () {
            // hide notice
            document.html.classList.remove('show-notice-active');
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

    ZOLUSHKA.prototype.registration = function (step) {
        var _self = this;
        var plugin = {};

        plugin.currentStep = 1;

        plugin.bindings = function () {
            $('.js-call-photo-terms').on('click', function () {
                plugin.showImageTerms();
            });

            $('.js-close-reg-popup').on('click', function () {
                plugin.hideImageTerms();
            });

            return false;
        };

        plugin.switchStep = function (step) {
            if (step)
                console.log(step);

            return false;
        };

        plugin.changeStep = function () {
            if (plugin.validateStep() != true)
                return false;
        };

        plugin.validateStep = function () {
            // here validate form and return true or false // default: true
            return true;
        };

        plugin.showImageTerms = function () {
            _self.html.classList.add('modal-open');
            _self.doc.querySelector('.popup-photo-terms').classList.add('active');
        };

        plugin.hideImageTerms = function () {
            _self.html.classList.remove('modal-open');
            _self.doc.querySelector('.popup-photo-terms').classList.remove('active');
        };

        plugin.switchBlocks = function (closing, opening) {
            plugin.showBlock(opening);
            plugin.hideBlock(opening);
        };

        plugin.showBlock = function (bl) {
            bl.show();
        };

        plugin.hideBlock = function (bl) {
            bl.hide();
        };

        plugin.init = function () {

            console.log('hi');
            // plugin.switchStep(plugin.currentStep);

            plugin.bindings();
        };

        if (step)
            plugin.init();

        return plugin;
    };

    ZOLUSHKA.prototype.form = function () {
        var _self = this;
        var plugin = {};

        plugin.showError = function (input) {
            input.addClass('input-error');
            input.closest('.form-line').addClass('input-has-error');
        };

        plugin.hideError = function (input) {
            input.removeClass('input-error');
            input.closest('.form-line').removeClass('input-has-error');
        };

        plugin.addFormPreloader = function (form) {
            form.append('<i class="form-preloader"></i>');
        };

        plugin.showFormPreloader = function (form) {
            if (!form.find('.form-preloader').lenght > 0)
                plugin.addFormPreloader(form);
            form.addClass('preloader-active');
        };

        plugin.hideFormPreloader = function (form) {
            form.removeClass('preloader-active');
        };

        return plugin;
    };

    return ZOLUSHKA;
})();

var app = new ZOLUSHKA();


app.appLoad('full', function (e) {

    var registration = app.registration(1);

    var photos = app.photosUpload({
        className: '.registration__upload-area'
    });
});