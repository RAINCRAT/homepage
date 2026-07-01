/* ========================================
   Card Demo JavaScript
   Extracted from card-demo.html
   ======================================== */

$(function () {
    const rotate = (cursorPosition, centerPosition, threshold = 20) => {
        const delta = cursorPosition - centerPosition;
        return delta >= 0
            ? (delta >= threshold ? threshold : delta)
            : (delta <= -threshold ? -threshold : delta);
    };

    const brightness = (cursorPositionY, centerPositionY, strength = 20) =>
        1 - rotate(cursorPositionY, centerPositionY) / strength * 0.05;

    const cardData = new Map();

    $(window).resize(() => {
        $('.card').each(function () {
            const rect = this.getBoundingClientRect();
            cardData.set(this, {
                centerX: rect.left + rect.width / 2,
                centerY: rect.top + rect.height / 2
            });
        });
    }).trigger('resize');

    $('.card-container').hover(
        function () {
            $(this).removeClass('card-ani-out').addClass('card-ani-in').css('z-index', '1');
            setTimeout(() => $(this).css('transition', 'all 0s ease'), 300);
        },
        function () {
            $(this).removeClass('card-ani-in').addClass('card-ani-out')
                .css({ zIndex: '0', transition: 'all .4s ease' });
        }
    );

    $('.card').hover(
        function () {
            const rect = this.getBoundingClientRect();
            cardData.set(this, {
                centerX: rect.left + rect.width / 2,
                centerY: rect.top + rect.height / 2
            });

            $(this).find('.overlay-area').css({
                overflow: 'inherit', left: '-20px', top: '-30px', transform: 'scale(1.2)'
            });
        },
        function () {
            $(this).css({
                transform: 'perspective(500px) scale(1)',
                filter: 'brightness(1) drop-shadow(0 5px 5px rgba(0,0,0,.5))',
                boxShadow: '0 0 0 0 rgba(0, 0, 0, 0.2)'
            }).find('.image-main').css({ left: '0', top: '0', filter: 'none' });

            $(this).find('.overlay-area').css({
                left: '0', top: '0', filter: 'none',
                transform: 'translateZ(0) scale(1)', overflow: 'hidden'
            });

            $(this).find('.overlay-img').css({ left: '0', top: '0' });
        }
    ).mousemove(function (event) {
        const { centerX, centerY } = cardData.get(this) || {};
        const calcX = rotate(event.clientX, centerX);
        const calcY = rotate(event.clientY, centerY);
        const calcX2 = event.clientX - centerX;
        const calcY2 = event.clientY - centerY;
        const $this = $(this);

        $this.css({
            transform: `translateZ(0) perspective(1000px) rotateY(${calcX}deg) rotateX(${-calcY / 1.5}deg)`,
            filter: `brightness(${brightness(event.clientY, centerY)})`,
            boxShadow: `${-calcX}px ${-calcY}px 10px 0 rgba(0, 0, 20, 0.25)`
        });

        $this.find('.overlay-img').css({ left: `${calcX2 / 10}px`, top: `${calcY2 / 15}px` });
        $this.find('.overlay-area').css('filter', `drop-shadow(${-calcX / 7}px ${-calcY / 7}px 0 white)`);
        $this.find('.image-main').css({
            left: `${calcX2 / 8}px`,
            top: `${calcY2 / 13}px`,
            filter: `drop-shadow(${-calcX / 2}px ${-calcY / 2}px 5px rgba(0, 0, 20, 0.2))`
        });
    });
});
