// FOR DEMO
function parseDemos(x) {
  var race = [];
  var holder = [];

  for (foo = 0; foo < x.length; foo++) {
    // if we're dealing with race
    if (foo == 1) {
      // and race has values
      if (x[foo].length > 0) {
        // be ready to parse out more than one value
        for (bar = 0; bar < x[1].length; bar++) {
        race.push(x[foo][bar]['value']);
        }
        // convert it to a flat string
        race = race.toString();
      } else {race = 'na'}
      holder.push(race);
    } else {
      if (x[foo].length > 0) {
        holder.push(x[foo].val());
      } else {holder.push('na')}
    } 
  } // end global for

  return holder;
}


function parseUrl(name) {
  // function takes as input argument name and returns results formatted for urlArgsToDict
  // kinda messy tbh

  // is it a dict?
  var d = 0;
  // if the name corresponds to a dict
  if (name == 'taskCueCode' || name == 'rtPercentiles') {
    d = 1;
    var regexS = '[\?&](' + name + '.*?&' + name + '.*?[^&]*)'
  } else {
    var regexS = "[\?&]"+name+"=([^&#]*)"; 
  }

  // execute regex
  var regex = new RegExp(regexS);
  var tmpUrl = window.location.href;
  var results = regex.exec(tmpUrl);

  if (results == null) {
    return 'NONE';
  } else {
    // if dict, deparam the results
    if (d) {
      return $.deparam(results[1]);
    } else {
      return results[1];
    }
  }
}

function urlArgsToVar(name) {
  // takes as input 
  var results = parseUrl(name);

  // if it's a dict, index it
  if (typeof(results) == 'object') {
    return results[name];
  } else {
    // if it's the time, convert to int
    if (name == 'experimentStartTime') {
      return parseInt(results);
    } else {
      return results;
    }
  }
}

// specific to DECKS

function rnorm(min, max, skew=1) {
  let u = 0, v = 0;
  while(u === 0) u = Math.random() //Converting [0,1) to (0,1)
  while(v === 0) v = Math.random()
  let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v )
  
  num = num / 10.0 + 0.5 // Translate to 0 -> 1
  if (num > 1 || num < 0) 
    num = randn_bm(min, max, skew) // resample between 0 and 1 if out of range
  
  else{
    num = Math.pow(num, skew) // Skew
    num *= max - min // Stretch to fill range
    num += min // offset to min
  }
  return num
}


function get_deck_location(deckOne, deckTwo) {
  // takes as input deckCode and number of decks
  // returns deckCode updated with location

  var deckCode = {};


  // if it's practice, just randomly generate location
  if (Math.random() < .5) {
    deckCode['left'] = deckOne;
    deckCode['right'] = deckTwo;
  } else {
    deckCode['left'] = deckTwo;
    deckCode['right'] = deckOne;
  }

  
  return deckCode;

}

function getRandomFromBucket(bucket) {
  // from: https://stackoverflow.com/questions/12987719/javascript-how-to-randomly-sample-items-without-replacement
  // don't run more times than length of the bucket being indexed
  var randomIndex = Math.floor(Math.random()*bucket.length);
  return bucket.splice(randomIndex, 1)[0];
}



function registerId(experiment){
  // posts a blank text file to server as a way of recording IDs who at least started the experiment

  subject = getParam('subject', '');

  var dataToServer = {
    'subject': subject,
    'experiment': experiment,
    'sessionCode': 'init',
    'currentData': 'Worker ID: ' + GetWorkerId()
  }

  $.post(
    url = '../../../../../cgi-bin/saveData.py',
    data = dataToServer
    )
}



function code_error(key, condition) {

  if (condition == 'present' & key == 75) {
    return 1
  }
  if (condition == 'absent' & key == 74) {
    return 1
  }
  return 0

}


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



function getRandomFromBucket(bucket) {
  var randomIndex = Math.floor(Math.random()*bucket.length);
  return bucket.splice(randomIndex, 1)[0];
}


function createConditionOrder() {
  // Returns an array of dicts
  // Where each dict:
    // {'name': 'HE', 'outcome': {'safe': 11, 'risky': 14}}
  // these values are DEVIATIONS off 32 (the mid point)

  var conditionHolder = [
    {
      'name': 'HE',
      'outcome': {'safe': 14, 'risky': 28}
    },

    {
      'name': 'HM',
      'outcome': {'safe': 7, 'risky': 14}
    },

    {
      'name': 'EE',
      'outcome': {'safe': -7, 'risky': -14}
    },

    {
      'name': 'EM',
      'outcome': {'safe': -14, 'risky': -28}
    }
  ]

  var conditionOrder = []

  for (i = 0; i < 4; i++) {
    conditionOrder.push(getRandomFromBucket(conditionHolder));
  }

  return conditionOrder;

}

function get_deck_code(currentCondition) {
  // Takes in current condition (see above)
  // Returns an object sorting the current condition by deck parameters
    // {'left': {'name:' 'risky', 'outcome': {'top': 8, 'bottom': 14}}}

  // Initialize the two decks
  var riskyDeck = {'name': 'riskyDeck'};
  var safeDeck = {'name': 'safeDeck', 'outcome': {'top': currentCondition['outcome']['safe']}};

  // Determine the location (top / bottom) for the two outcomes of the risky deck randomly
  var top = Math.random() > .5 ? 0 : currentCondition['outcome']['risky'];
  var bottom = top == 0 ? currentCondition['outcome']['risky'] : 0;

  // Assign them to riskyDeck
  riskyDeck['outcome'] = {'top': top, 'bottom': bottom};

  // Shuffle left/right and return
  return get_deck_location(riskyDeck, safeDeck);

}


function determine_outcome(chosen_deck_location, deck_code) {
  // Takes in the chosen deck location and deck_code (obv)
  // Returns dict containing selected outcome and the spatial position of the selected outcome:
    // {'outcome': 8, 'horizontal': 'left', 'vertical': 'top'}

  var out = {'horizontal': chosen_deck_location};

  if (deck_code[chosen_deck_location]['name'] == 'safeDeck') {
    out['vertical'] = 'Top';
    out['outcome'] = deck_code[chosen_deck_location]['outcome']['top'];
  } else {
    if (Math.random() > .5) {
      out['outcome'] = deck_code[chosen_deck_location]['outcome']['top']
      out['vertical'] = 'Top';
    } else {
      out['outcome'] = deck_code[chosen_deck_location]['outcome']['bottom']
      out['vertical'] = 'Bottom';
    }
  }

  return out;

}

function update_deck_attributes(deckCode, direction, counterbalance_condition, trial_count, trial_threshold) {
  // this function became a bit of a mess, but it should be working

  plus_or_nothing = direction == 'Harder than Reference' ? '+' : '';

  left_right = ['left', 'right'];
  top_bottom = ['top', 'bottom'];

  for (var horizontal = 0; horizontal < left_right.length; horizontal++) {
    for (var vertical = 0; vertical < top_bottom.length; vertical++) {
    // im being such a snob about wanting to do this as efficiently as possible


    // does the current horizontal side include a bottom?
    no_bottom = !Object.keys(deckCode[left_right[horizontal]]['outcome']).includes('bottom');
    // are we on the bottom position in the loop?
    on_bottom = top_bottom[vertical] == 'bottom';

    if (no_bottom && on_bottom) {
      // if we're on the bottom segment and there's nothing to add, skip
      continue
    }


    // put just the outcome in the outcome string
    outcome_string = deckCode[left_right[horizontal]]['outcome'][top_bottom[vertical]];

    
    if ((counterbalance_condition == 'absolute_first' && trial_count <= trial_threshold/2) || (counterbalance_condition == 'relative_first' && trial_count > trial_threshold/2)) {
      outcome_string += 32
    } else {

      if (outcome_string) {
        // if it's not the reference outcome
        outcome_string = plus_or_nothing + outcome_string;
      } 
    }


    $('#' + left_right[horizontal] + 'Deck' + jsUcfirst(top_bottom[vertical])).html('<p>' + outcome_string + '</p>');

    }
  }
}


function get_active_separator(deckCode) {

  if (deckCode['left']['name'] == 'riskyDeck') {
    return 'left'
  }
  return 'right'
}


function translateSwitchToColor(outcome) {
  // making it so that the ends of the switching limits that subjects will see in the exp (i.e., 2 and 14) correspond to the ends of the color spectrum
  // thus, need to chop the spectrum in any one direction (255) into the number of segments equal to the 
  // absolute value of the difference between the end of switching and reference (eg, 60-32 = 28)
  // function behaves incorrectly for input 32, but that's okay

  // i think this function expects outcome to be in absolute, not relative, terms?
  outcome += 32;

  colorMin = 100;
  colorMax = 200;

  return (((colorMax - colorMin) / 28) * Math.abs(outcome)) + colorMin;
}

function jsUcfirst(string) {
  // capitalize first letter of string
  return string.charAt(0).toUpperCase() + string.slice(1);
}


function compute_remaining_blocks(trial_threshold, block_interval, trial_count) {
  total_blocks = trial_threshold / block_interval
  return total_blocks - (trial_count / trial_threshold) * total_blocks
}



function fill_deck_context(trial_count, trial_threshold, counterbalance_condition) {
  console.log(trial_count)
  console.log(trial_threshold)
  fill_string = 'Extra Objects';
  if ((counterbalance_condition == 'absolute_first' && trial_count <= trial_threshold/2) || (counterbalance_condition == 'relative_first' && trial_count > trial_threshold/2)) {
    fill_string = 'Total Objects';
  }
    $('.deckAttributeContext').html('<p>' + fill_string + '</p>');
}