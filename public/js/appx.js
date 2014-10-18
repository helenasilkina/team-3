$(document).ready(function(){
    var btn = $('.js-get-create-doc'),
        saveButton = null,
        mainWrap = $('.js-get-main-wrap'),
        popup = null,
        popupCntnt = '',
        sockets = new SocketWrap("localhost", 3000)
    
    btn.click(function(){
        popupCntnt =    '<div class="popup-wrap pos-abs js-get-popup">'+
                            '<div class="popup-close js-get-close pos-abs"></div>'+
                            '<div class="popup--centered">'+
                                '<div class="popup__content pos-rel">'+
                                    '<div class="popup__content__body">'+
                                        '<textarea name="doc" rows="10" class="js-get-doc-text popup__content__body__text"></textarea>'+
                                    '</div>'+
                                    '<div class="popup__content__footer">'+
                                        '<span class="popup__content__footer__info js-get-info">'+
                                        '</span>'+
                                        '<div class="popup__content__footer__btn-wrap">'+
                                            '<button class="btn--ghost js-create-method">Save</button>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>';

        mainWrap.append(popupCntnt);

        sockets.on(function(event) {
            mainWrap.find(".js-get-info").html(event.data);
            saveButton.remove();

        })               

        popup=mainWrap.find('.js-get-popup');

        saveButton = mainWrap.find(".js-create-method");

        saveButton.on("click", function() {
            sockets.create($(".js-get-doc-text").val());
        })

        popupClose = mainWrap.find('.js-get-close');
        
        popupClose.click(function() {
            popup.remove();
        });
    });



});