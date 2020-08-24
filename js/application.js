let actualScreen = 1;

function adjustScreen(screenId) {
    const thisScreen = $('#screen_' + screenId);
    const screenHeight = thisScreen.height() + 'px';
    
    $('.recipe-slider').animate({
        height: screenHeight
    }, 200)
}

function nextScreen(elementTarget = null, event = null) {
    //Using "next" button
    let nextScreenId = (actualScreen + 1); 

    if(elementTarget !== null) { //Using progress-bar
        nextScreenId = $(event.target).data('screen');
    }

    if((actualScreen + 1) < nextScreenId) {
        nextScreenId = actualScreen + 1;
    }

    let thisScreenElement = $('#screen_' + actualScreen);
    let nextScreenElement = $('#screen_' + nextScreenId);

    if(nextScreenId === actualScreen) {
        return;
    }

    if(nextScreenId > actualScreen) {
        validateScreen(actualScreen);

        if(validatedScreens.indexOf(actualScreen) < 0) {
            return;
        }
    }

    let nextScreenLeft, thisScreenLeft;

    if(nextScreenId > actualScreen) {
        nextScreenLeft = '+=100%';
        thisScreenLeft = '-=100%';
    } else {
        nextScreenLeft = '-=100%';
        thisScreenLeft = '+=100%';
    }

    thisScreenElement.animate({
        left: thisScreenLeft
    }, 300);

    nextScreenElement.css({
        left: nextScreenLeft,
        display: 'block'
    });

    setTimeout(() => {
        thisScreenElement.css({
            display: 'none',
            left: '0'
        }, 300);

        nextScreenElement.animate({
            left: '0'
        }, 300);


        if(nextScreenId > actualScreen) {
            $('#screen_button_' + nextScreenId).addClass('is-active');
            actualScreen++;
        } else {
            for(let i = actualScreen; i > nextScreenId; i--) {
                $('#screen_button_' + i).removeClass('is-active');
            }

            actualScreen = nextScreenId;
        }

        adjustScreen(actualScreen);
    }, 300)
}