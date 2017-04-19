var MAILING = (function () {
    function MAILING() {
        var _self = this;
        _self.doc = document;
        _self.window = window;
        _self.location = location;

        _self.bootstrap();
    }

    MAILING.prototype.bootstrap = function () {
        var _self = this;
    };

    // Window load types (loading, dom, full)
    MAILING.prototype.appLoad = function (type, callback) {
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

    MAILING.prototype.steps = function () {
        var _self = this;
        var stepsList = $('[data-mailing-step]');
        var steps = {
            init: function () {
                if(_self.location.hash !== '')
                    steps.changeStep(_self.location.hash.replace('#', ''));
                else
                    steps.changeStep('main');
                steps.bindings();
            },
            bindings: function () {
                $('[data-mailing-change-step]').on('click', function (e) {
                    e.preventDefault();
                    var step = $(this).attr('data-mailing-change-step');

                    steps.changeStep(step);
                });
            },
            changeStep: function (step) {
                stepsList.removeClass('active-step');
                stepsList.filter('[data-mailing-step="'+step+'"]').addClass('active-step');

                steps.changeHash(step);
            },
            changeHash: function (hash) {
                _self.location.hash = hash;
            }
        };

        steps.init();

        return steps;
    };

    MAILING.prototype.interestedPopups = function () {
        var countWrapper = $('[data-interested-count]');
        if(!countWrapper.length > 0)
            return;

        var interested = {
            init: function () {
                interested.bindings();
                interested.changeCaller(countWrapper);
            },
            bindings: function () {
                countWrapper.bind("DOMSubtreeModified",function(){
                    interested.changeCaller($(this));
                });
            },
            changeCaller: function (bl) {
                var popupCaller = bl.closest('[data-popup-name]');
                var count = parseInt(bl.text());
                bl.attr('data-interested-count', count);

                if(count > 0) {
                    popupCaller.attr('data-popup-name', 'interested');
                } else {
                    popupCaller.attr('data-popup-name', 'empty-interested');
                }
            }
        };

        interested.init();

        return interested;
    };

    return MAILING;
})();

var mailing = new MAILING();

var registration = new ZOLUSHKA();

mailing.appLoad('full', function (e) {
    mailing.steps();
    mailing.interestedPopups();
    registration.popups();
});

