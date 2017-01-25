(function () {
    Zolushka = function (doc) {
        var _self = this;

        _self.doc = document;
        _self.window = window;

        _self.bootstrap();
    };

    Zolushka.prototype.bootstrap = function () {
        var _self = this;
    };

    // Window load types (loading, dom, full)
    Zolushka.prototype.appLoad = function (type, callback) {
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

    Zolushka.prototype.photosUpload = function (options) {
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
            console.log(_self);
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

    Zolushka.prototype.registration = function (step) {
        var _self = this;
        var plugin = {};

        plugin.currentStep = step;

        plugin.init = function () {
            plugin.switchStep(step);
        };

        plugin.switchStep = function (step) {
            console.log(step);
        };

        plugin.changeStep = function () {
            if(plugin.validateStep() != true)
                return false;
        };

        plugin.validateStep = function () {
            // here validate form and return true or false // default: true
            return true;
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

        if(step)
            plugin.init();

        return plugin;
    };

    Zolushka.prototype.form = function () {
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
            if(!form.find('.form-preloader').lenght > 0)
                plugin.addFormPreloader(form);
            form.addClass('preloader-active');
        };

        plugin.hideFormPreloader = function (form) {
            form.removeClass('preloader-active');
        };

        return plugin;
    };

    var app = new Zolushka(document);


    app.appLoad('full', function (e) {

        app.registration(1);

        app.photosUpload({
            className: '.registration__upload-area'
        });
    });

})();