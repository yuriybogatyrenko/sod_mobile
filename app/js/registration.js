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
        plugin.vars.deleteIconsClass = '.js-delete-upload-element';
        plugin.vars.cropIconsClass = '.js-open-crop';
        plugin.vars.moderationIconClass = '.icon-reg-moderation-middle';
        plugin.vars.editIconClass = '.icon-reg-crop-edit';
        plugin.vars.cropCloseButton = plugin.vars.container.find('.js-close-crop');
        plugin.vars.input = $('.js-registration__upload-input');
        plugin.vars.containerText = plugin.vars.container.find('.js-registration__upload-placeholder');
        plugin.vars.addedPhotos = 0;
        plugin.vars.photosContainer = plugin.vars.container.find('.registration__upload-units');
        plugin.vars.continueButton = $('.js-crop-continue-button');
        plugin.vars.cropContainer = plugin.vars.container.closest('.registration-crop__container');
        plugin.vars.doc = $(document);
        plugin.vars.cropPreloader = _self.doc.querySelector('.crop-preloader');
        plugin.vars.newPhotosClass = '.registration__upload-added-item';
        plugin.imagesCount = 0;
        plugin.vars.template = function (ev) {
            return '' +
                '<div data-item-key="' + plugin.imagesCount + '" class="registration__upload-item registration__upload-added-item" style="width: 0;">' +
                '<img src="' + ev.target.result + '" class="registration__upload-image" alt="">' +
                '<i class="js-open-popup icon-reg-moderation-middle" data-popup-name="moderation-notice"></i>' +
                '<i data-element-key="' + plugin.imagesCount + '" class="js-open-popup icon-reg-crop-edit" data-popup-name="edit-element"></i>' +
                '</div>';
        };

        plugin.init = function () {
            plugin.bindings();
        };

        plugin.deleteImage = function (key) {
            el = $(plugin.vars.newPhotosClass).filter('[data-item-key="' + key + '"]');
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
                plugin.deleteImage($this.attr('data-element-key'));
            });

            plugin.vars.doc.on('click', plugin.vars.moderationIconClass, function () {
                _self.popups().popupOpen('moderation-notice');
            });

            plugin.vars.doc.on('click', plugin.vars.editIconClass, function () {
                var key = this.getAttribute('data-element-key');
                $('[data-popup="edit-element"]').find('.js-delete-upload-element').attr('data-element-key', key);
                _self.popups().popupOpen('edit-element');
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

        plugin.vars.input.on('change', function () {
            if (this.files && this.files[0] && window.FileReader) {
                // console.log(this.files);
                _this = this;
                var the_files = _this.files;
                Object.keys(the_files).map(function (objectKey, index) {
                    var value = the_files[objectKey];
                    var input = _this;
                    var reader = new FileReader();

                    // open crop preloader
                    plugin.showCropPreloader();

                    reader.onload = function (e) {
                        // hide crop preloader
                        plugin.hideCropPreloader();
                        plugin.imagesCount += 1;

                        // switch block to upload area
                        _self
                            .registration()
                            .switchBlocks(
                                $('.js-registration-step1__can-be-hidden'),
                                $('.js-registration__step1-comes-visible')
                            );

                        // insert image into upload area
                        plugin.vars.photosContainer
                            .append(plugin.vars.template(e));

                        // make some animation
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

        plugin.currentStep = step;
        if(_self.doc.location.hash != '') {
            plugin.currentStep = _self.doc.location.hash.replace('#', '');
        }

        plugin.bindings = function () {
            var steps = _self.doc.querySelectorAll('.js-change-step');
            for (i = 0; i < steps.length; i++) {
                steps[i].addEventListener('click', function (e) {
                    e.preventDefault();
                    var step = this.getAttribute('data-moveto-step');

                    plugin.switchStep(step);
                });
            }

            var regForms = _self.doc.querySelectorAll('[data-validate-form]');
            for (i = 0; i < regForms.length; i++) {
                plugin.validateStep(regForms[i]);
            }
        };

        plugin.switchStep = function (step) {
            var stepBlocks = document.querySelectorAll('[data-step]');

            for (i = 0; i < stepBlocks.length; i++) {
                if (stepBlocks[i].getAttribute('data-step') !== step)
                    stepBlocks[i].classList.add('hidden-step');
                else {
                    stepBlocks[i].classList.remove('hidden-step');
                    _self.doc.location.hash = step;
                }
            }
        };

        plugin.validateStep = function (bl) {
            bl.addEventListener('submit', function (e) {
                e.preventDefault();

                //simple validation on empty field
                var input = this.querySelector('input');
                if (input && input.value != '') {
                    input.classList.remove('error');
                    // show form preloader
                    _self.form().showFormPreloader($(bl));

                    // remove form preloader in server response
                    setTimeout(function () {
                        _self.form().hideFormPreloader($(bl));
                        _self.form().showFormNotification($(bl));
                    }, 2000);
                } else if (input && input.value == '') {
                    input.classList.add('error');
                }

                return false;
            });
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
            plugin.hideBlock(closing);
        };

        plugin.showBlock = function (bl) {
            bl.show();
        };

        plugin.hideBlock = function (bl) {
            bl.hide();
        };

        plugin.init = function () {
            plugin.switchStep(plugin.currentStep);

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
            if (!form.find('.form-preloader').length > 0)
                plugin.addFormPreloader(form);
            form.addClass('preloader-active');
        };

        plugin.hideFormPreloader = function (form) {
            form.removeClass('preloader-active');
        };

        plugin.showFormNotification = function (form) {
            form.addClass('show-form-notification');
        };

        plugin.hideFormNotification = function (form) {
            form.removeClass('show-form-notification');
        };

        return plugin;
    };

    ZOLUSHKA.prototype.popups = function () {
        var _self = this;

        var plugin = {};

        plugin.init = function () {
            plugin.bindings();
        };

        plugin.bindings = function () {
            $('.js-open-reg-popup').on('click', function (e) {
                e.preventDefault();
                plugin.popupOpen(this.getAttribute('data-popup-name'));
            });

            $('.js-switch-reg-popup').on('click', function (e) {
                e.preventDefault();
                plugin.switchPopup(this.getAttribute('data-popup-close-name'), this.getAttribute('data-popup-name'));
            });

            $('.js-close-reg-popup').on('click', function (e) {
                e.preventDefault();
                if (this.hasAttribute('data-popup-name')) {
                    plugin.popupClose(this.getAttribute('data-popup-name'));
                } else {
                    plugin.popupClose($(this).closest('.reg-popup').attr('data-popup'));
                }
            });
        };

        plugin.popupOpen = function (name) {
            _self.html.classList.add('modal-open');
            document.body.style.overflowY = 'scroll';

            var popup = _self.doc.querySelector('[data-popup="' + name + '"]');
            popup.classList.add('active')
        };

        plugin.popupClose = function (name) {
            _self.html.classList.remove('modal-open');
            document.body.style.overflow = 'initial';

            var popup = _self.doc.querySelector('[data-popup="' + name + '"]');
            popup.classList.remove('active');
        };

        plugin.switchPopup = function (closeName, openName) {
            plugin.popupClose(closeName);
            plugin.popupOpen(openName);
        };

        plugin.init();

        return plugin;
    };

    return ZOLUSHKA;
})();

var app = new ZOLUSHKA();


app.appLoad('full', function (e) {

    app.popups();

    var registration = app.registration("upload-photo");

    var photos = app.photosUpload({
        className: '.registration__upload-area'
    });

    // photos.init();
});