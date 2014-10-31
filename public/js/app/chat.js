// TODO: fix users

$(document).ready(function () {
    var chat = $('.js-get-chat');
    var chatBody = chat.find('.chat__body');
    var arrow = chat.find('.chat__header__arrow');
    var originalHeight = chatBody.height();
    var isOpen = true;

    function action(height, angle) {
        chatBody.css({
            height: height
        });
        arrow.css({
            transform: 'rotate(' +
                        angle +
                        ')'
        });
    }

    arrow.on('click', function () {
        if (isOpen) {
            action(0, '180deg');
            isOpen = false;
        } else {
            action(originalHeight, '0deg');
            isOpen = true;
        }
    });
});
