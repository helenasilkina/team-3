$(document).ready(function () {
    var mainWrap = $('.js-get-main-wrap');
    var popup = null;
    var popupCntnt = '';
    var sockets = new SocketWrap('localhost', 3000);
    var saveButton = mainWrap.find('.js-create-method');

    $(document).on('click', '.js-get-create-doc', function () {
        popupCntnt = '<div class="popup-wrap pos-abs js-get-popup">' +
                            '<div class="popup-close js-get-close pos-abs"></div>' +
                            '<div class="popup--centered">' +
                                '<div class="popup__content pos-rel">' +
                                    '<div class="popup__content__body">' +
                                        '<textarea name="doc" rows="10" class="js-get-doc-text popup__content__body__text"></textarea>' +
                                    '</div>' +
                                    '<div class="popup__content__footer">' +
                                        '<span class="popup__content__footer__info js-get-info">' +
                                        '</span>' +
                                        '<div class="popup__content__footer__btn-wrap">' +
                                            '<button class="btn--ghost js-create-method">Save</button>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>';

        mainWrap.append(popupCntnt);

        sockets.on(function (event) {
            mainWrap.find('.js-get-info').html(event.data);
            saveButton.remove();
        });

        popup = mainWrap.find('.js-get-popup');

        saveButton.on('click', function () {
            sockets.create($('.js-get-doc-text').val());
        });

        popup = mainWrap.find('.js-get-popup');

        $(document).on('click', '.js-get-close', function () {
            popup.remove();
        });
    });
});
