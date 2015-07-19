$(function() {
    $(window).scroll(function() {
    	var headSize = 90,
    		bottom = 22.5,
    		top = 22.5,
    		stackOffset = 11.25,
    		numStacks = 3,
    		pickupOffset = 45,
    		paddingTop = 45,
    		headStart = bottom + (numStacks - 1) * stackOffset
    		headPickup = headStart + 2 * headSize + pickupOffset,
    		headDropoff = headStart + headSize + pickupOffset,
    		cardPickup = headPickup + paddingTop,
    		cardDropoff = headPickup - paddingTop - headSize,
    		slowDistance = headPickup - headStart - headSize;
        for (var i = 1; i<=11; i++) {
            var $head = $('.heads li[data-head="' + i + '"]'),
            	$card = $('.card[data-card="' + i + '"]'),
            	$prevPrevCard = $('.card[data-card="' + (i - 2) + '"]'),
            	$prevCard = $('.card[data-card="' + (i - 1) + '"]'),
            	$nextCard = $('.card[data-card="' + (i + 1) + '"]'),
            	$nextNextCard = $('.card[data-card="' + (i + 2) + '"]'),
            	getOffsetBottom = function($elem) {
            		if ($elem.offset() === undefined) { return null; }
            		return $(window).scrollTop() + $(window).height() - $elem.offset().top;
            	}
            	getOffsetTop = function($elem) {
            		if ($elem.offset() === undefined) { return null; }
            		return $(window).scrollTop() - $elem.offset().top;
            	}
            	offsetTop = getOffsetTop($card),
            	offsetBottom = getOffsetBottom($card),
            	prevOffset = getOffsetBottom($prevCard),
            	prevPrevOffset = getOffsetBottom($prevPrevCard),
            	nextOffset = getOffsetTop($nextCard),
            	nextNextOffset = getOffsetTop($nextNextCard),
            	percentCompleteBottom = Math.min(Math.max(1 - (cardPickup - offsetBottom) / cardPickup, 0), 1),
            	percentCompleteTop = Math.min(Math.max((cardDropoff + offsetTop) / (2*cardDropoff), 0), 1);
            	if (i == 1)
	            	console.log(i, /*offsetBottom, prevOffset, prevPrevOffset,*/ offsetTop, /*nextOffset, nextNextOffset,*/ cardPickup, cardDropoff, percentCompleteTop, percentCompleteBottom)

            if (prevPrevOffset >= 0 && prevOffset < 0){
            	$head.removeAttr('style');
            	$head.addClass('bottom-1').removeClass('bottom-0 bottom-2 top-0 top-1 top-2 before-pickup after-dropoff fixed');
            	$head.css({"z-index": 240 - parseInt($head.data('head'))});
            } else if (prevOffset >= 0 && offsetBottom < 0) {
            	$head.removeAttr('style');
            	$head.addClass('bottom-2').removeClass('bottom-0 bottom-1 top-0 top-1 top-2 before-pickup after-dropoff fixed');
            	$head.css({"z-index": 240 - parseInt($head.data('head'))});
            } else if (prevPrevOffset < 0) {
            	$head.removeAttr('style');
            	$head.addClass('bottom-0').removeClass('bottom-1 bottom-2 top-0 top-1 top-2 before-pickup after-dropoff fixed');
            	$head.css({"z-index": 240 - parseInt($head.data('head'))});
            } else if (offsetBottom > 0 && offsetBottom < cardPickup) {
            	$head.addClass('before-pickup').removeClass('bottom-0 bottom-1 bottom-2 top-0 top-1 top-2 after-dropoff fixed');
            	$head.css({
            		"top": "auto",
            		"bottom": (headStart + slowDistance*percentCompleteBottom),
            		"z-index": 240 - parseInt($head.data('head'))
            	});
            } else if (offsetBottom >= cardPickup && offsetTop < -1*cardDropoff) {
            	/* fixed to card */
            	// console.log(i, offset, offset - headSize - paddingTop);
            	$head.addClass('fixed').removeClass('bottom-0 bottom-1 bottom-2 top-0 top-1 top-2 before-pickup after-dropoff');
            	$head.css({"z-index": $head.data('head')});
            	$head.css({
            		"bottom": (offsetBottom - headSize - paddingTop),
            		"top": "auto"
            	});
            } else if (offsetTop < (headSize + paddingTop) && offsetTop >= -1*cardDropoff) {
            	$head.addClass('after-dropoff').removeClass('bottom-0 bottom-1 bottom-2 top-0 top-1 top-2 before-pickup fixed');
            	$head.css({
            		"bottom": "auto",
            		"top": (headDropoff - slowDistance*percentCompleteTop),
            		"z-index": 240 - parseInt($head.data('head'))
            	});
            } else if (nextNextOffset < (headSize + paddingTop) && nextOffset >= (headSize + paddingTop)){
            	$head.removeAttr('style');
            	$head.addClass('top-1').removeClass('bottom-0 bottom-1 bottom-2 top-0 top-2 before-pickup after-dropoff fixed');
            	$head.css({"z-index": $head.data('head')});
            } else if (nextOffset < (headSize + paddingTop) && offsetTop >= (headSize + paddingTop)) {
            	$head.removeAttr('style');
            	$head.addClass('top-2').removeClass('bottom-0 bottom-1 bottom-2 top-0 top-1 before-pickup after-dropoff fixed');
            	$head.css({"z-index": $head.data('head')});
            } else if (nextNextOffset > (headSize + paddingTop)) {
            	$head.removeAttr('style');
            	$head.addClass('top-0').removeClass('bottom-0 bottom-1 bottom-2 top-1 top-2 before-pickup after-dropoff fixed');
            	$head.css({"z-index": $head.data('head')});
            }
        }

    });
});
