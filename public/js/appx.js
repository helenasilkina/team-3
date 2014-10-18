$(document).ready(function(){
    var btn = $('.js-get-create-doc'),
        mainWrap = $('.js-get-main-wrap'),
        popup = null,
        popupCntnt = '';
    
    btn.click(function(){
        popupCntnt =    '<div class="popup-wrap pos-abs js-get-popup">'+
                            '<div class="popup-close js-get-close pos-abs"></div>'+
                            '<div class="popup--centered">'+
                                '<div class="popup__content pos-rel">'+
                                    '<div class="popup__content__body">'+
                                        '<textarea name="doc" rows="10" class="js-get-doc-text popup__content__body__text"></textarea>'+
                                    '</div>'+
                                    '<div class="popup__content__footer">'+
                                        '<div class="popup__content__footer__btn-wrap">'+
                                            '<button class="btn--ghost">Save</button>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>';
        mainWrap.append(popupCntnt);

        popup=mainWrap.find('.js-get-popup');



        popupClose = mainWrap.find('.js-get-close');
        
        popupClose.click(function() {
            popup.remove();
        });
    });
});