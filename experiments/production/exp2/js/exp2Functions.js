
function getRandomFromBucket(bucket) {
    var randomIndex = Math.floor(Math.random()*bucket.length);
    return bucket.splice(randomIndex, 1)[0];
}


function createConditionOrder(ref=.75, step=.1) {
    // Returns an array of dicts
    // Where each dict:
        // {'id': 'HE', 'pSwitch': {'safe': 11, 'risky': 14}}

    var conditionHolder = [
        {
            'name': 'HE',
            'acc': {
                'safe': ((ref-2*step)+ref)/2, 
                'risky': ref-2*step, 
                'reference': ref}
        },

        {
            'name': 'HM',
            'acc': {
                'safe': ((ref-step) + (ref))/2, 
                'risky': ref-step,
                'reference': ref}
        },

        {
            'name': 'EE',
            'acc': {
                'safe': ((ref+2*step)+(ref))/2, 
                'risky': ref+2*step,
                'reference': ref}
        },

        {
            'name': 'EM',
            'acc': {
                'safe': ((ref+step)+(ref))/2, 
                'risky': ref+step,
                'reference': ref}
        }
    ]

    var conditionOrder = []

    for (i = 0; i < 4; i++) {
        conditionOrder.push(getRandomFromBucket(conditionHolder));
    }

    return conditionOrder;

}

function getDeckCode(currentCondition, ref) {
    // Takes in current condition (see above)
    // Returns an object sorting the current condition by deck parameters
        // {'left': {'name:' 'risky', 'acc': {'top': 8, 'bottom': 14}}}

    // Initialize the two decks
    var riskyDeck = {'name': 'riskyDeck'};
    var safeDeck = {'name': 'safeDeck', 'acc': {'top': currentCondition['acc']['safe']}};

    // Determine the location (top / bottom) for the two outcomes of the risky deck randomly
    var top = Math.random() > .5 ? ref : currentCondition['acc']['risky'];
    var bottom = top == ref ? currentCondition['acc']['risky'] : ref;

    // Assign them to riskyDeck
    riskyDeck['acc'] = {'top': top, 'bottom': bottom};

    // Shuffle left/right and return
    return getDeckLocation(riskyDeck, safeDeck, '', 2);

}


function determineOutcomePswitch(chosenDeckLocation, deckCode) {
    // Takes in the chosen deck location and deckCode (obv)
    // Returns dict containing selected pSwitch and the spatial position of the selected outcome:
        // {'acc': 8, 'horizontal': 'left', 'vertical': 'top'}

    var out = {'horizontal': chosenDeckLocation};

    if (deckCode[chosenDeckLocation]['name'] == 'safeDeck') {
        out['vertical'] = 'Top';
        out['acc'] = deckCode[chosenDeckLocation]['acc']['top'];
    } else {
        if (Math.random() > .5) {
            out['acc'] = deckCode[chosenDeckLocation]['acc']['top']
            out['vertical'] = 'Top';
        } else {
            out['acc'] = deckCode[chosenDeckLocation]['acc']['bottom']
            out['vertical'] = 'Bottom';
        }
    }

    return out;

}

function updateDeckAttributes(deckCode) {
    // Fill deck attributes
	console.log(deckCode);
    $('#leftDeckTop').html('<p>' + translateSwitchForDisplay(deckCode['left']['acc']['top']) + '</p>');
    $('#rightDeckTop').html('<p>' + translateSwitchForDisplay(deckCode['right']['acc']['top']) + '</p>');

    if (deckCode['left']['name'] == 'riskyDeck') {
        $('#leftDeckBottom').html('<p>' + translateSwitchForDisplay(deckCode['left']['acc']['bottom']) + '</p>');
        activeSeparator = 'left';
    } else {
        $('#rightDeckBottom').html('<p>' + translateSwitchForDisplay(deckCode['right']['acc']['bottom']) + '</p>');
        activeSeparator = 'right';
    }

    return activeSeparator;

}

function translateSwitchForDisplay(acc) {
    // rounded absolute value
    // making it so range is -100:100 given step=.1
    return String(Math.abs((Math.round((acc - 0.75)*100)*5))) + '%';
}



function updateAttributeColors(deckCode, ref){
    // update colors based on deck positions and conditions

    safe = deckCode['left']['name'] == 'safeDeck' ? 'left' : 'right';
    risky = safe == 'left' ? 'right' : 'left';

    ref_vert = deckCode[risky]['acc']['top'] == ref ? 'Top' : 'Bottom';
    update_vert = ref_vert == 'Top' ? 'Bottom' : 'Top';

    // loss or gain condition
	
    color_string = deckCode[safe]['acc']['top'] > ref ? 'rgb(0,200,0)' : 'rgb(200,0,0)';
    
    $('#'+safe+'DeckTop').css({'color':color_string});
    $('#'+risky+'Deck'+ref_vert).css({'color':'black'});
    $('#'+risky+'Deck'+update_vert).css({'color':color_string});

}


// OCT 25, 2021 ADDITIONS FOR PY POOL
function getParam( name, defaultValue ) { 
     var regexS = "[\?&]"+name+"=([^&#]*)"; 
     var regex = new RegExp( regexS ); 
     var tmpURL = window.location.href; 
     var results = regex.exec( tmpURL ); 
     if( results == null ) { 
         return defaultValue; 
     } else { 
         return results[1];      
     } 
}
