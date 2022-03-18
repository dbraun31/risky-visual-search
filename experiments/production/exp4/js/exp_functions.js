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


function transform_outcome(o) {
  // center outcomes 

  return (o-32) 
}


function get_deck_code(gambles) {
  // Takes in gambles, each gamble has form {'gamblea': {'outcome1': int, 'probability1': float', ...}}
  // Returns an object sorting the current condition by deck parameters
    // {'left': {'outcome': {'top': 8, 'bottom': 14}, 'probability': {'top' .., 'bottom'}}}

  if (! gambles.length) {
    gambles = refresh_gambles();
  }


  current_gamble = getRandomFromBucket(gambles);

  // Initialize the two decks
  var deck_one = {'outcome': {}, 'probability': {}};
  var deck_two = {'outcome': {}, 'probability': {}};

  // Determine the location (top / bottom) for the two outcomes of deck 1
  outcome_order = Math.random() > .5? [1,2] : [2,1]
  deck_one['outcome']['top'] = transform_outcome(current_gamble['gamblea']['outcome' + outcome_order[0].toString()])
  deck_one['probability']['top'] = current_gamble['gamblea']['probability' + outcome_order[0].toString()]
  deck_one['outcome']['bottom'] = transform_outcome(current_gamble['gamblea']['outcome' + outcome_order[1].toString()])
  deck_one['probability']['bottom'] = current_gamble['gamblea']['probability' + outcome_order[1].toString()]

  // Determine the location (top / bottom) for the two outcomes of deck 2
  outcome_order = Math.random() > .5? [1,2] : [2,1]
  deck_two['outcome']['top'] = transform_outcome(current_gamble['gambleb']['outcome' + outcome_order[0].toString()])
  deck_two['probability']['top'] = current_gamble['gambleb']['probability' + outcome_order[0].toString()]
  deck_two['outcome']['bottom'] = transform_outcome(current_gamble['gambleb']['outcome' + outcome_order[1].toString()])
  deck_two['probability']['bottom'] = current_gamble['gambleb']['probability' + outcome_order[1].toString()]



  // Shuffle left/right and return
  return get_deck_location(deck_one, deck_two);

}


function determine_outcome(chosen_deck_location, deck_code) {
  // Takes in the chosen deck location and deck_code (obv)
  // Returns dict containing selected outcome and the spatial position of the selected outcome:
    // {'outcome': 8, 'horizontal': 'left', 'vertical': 'top'}

  var out = {'horizontal': chosen_deck_location};

  top_p = deck_code[chosen_deck_location]['probability']['top']
  bottom_p = deck_code[chosen_deck_location]['probability']['bottom']
  bigger_p = Math.max(top_p, bottom_p)
  bigger_p_location =  top_p > bottom_p? 'top' : 'bottom';
  smaller_p_location = bigger_p_location == 'bottom'? 'top' : 'bottom';

  if (Math.random() < bigger_p) {
    out['outcome'] = deck_code[chosen_deck_location]['outcome'][bigger_p_location]
    out['vertical'] = jsUcfirst(bigger_p_location);
  } else {
    out['outcome'] = deck_code[chosen_deck_location]['outcome'][smaller_p_location]
    out['vertical'] = jsUcfirst(smaller_p_location);
  }


  return out;

}

function update_deck_attributes(deckCode) {

  left_right = ['left', 'right'];
  top_bottom = ['top', 'bottom'];

  for (var horizontal = 0; horizontal < left_right.length; horizontal++) {
    for (var vertical = 0; vertical < top_bottom.length; vertical++) {
    // im being such a snob about wanting to do this as efficiently as possible

    // put just the outcome in the outcome string
    outcome_string = deckCode[left_right[horizontal]]['outcome'][top_bottom[vertical]].toString();
    probability_string = Math.round(deckCode[left_right[horizontal]]['probability'][top_bottom[vertical]]*100) + '%';
    
    if (! outcome_string.includes('-')) {
      outcome_string = '+' + outcome_string;
    } 

    $('#' + left_right[horizontal] + 'Deck' + jsUcfirst(top_bottom[vertical] + 'Outcome')).html('<p>' + outcome_string + '</p>');
    $('#' + left_right[horizontal] + 'Deck' + jsUcfirst(top_bottom[vertical] + 'Probability')).html('<p>(' + probability_string + ')</p>');

    }
  }
}


function get_active_separator(deckCode) {

  if (deckCode['left']['name'] == 'riskyDeck') {
    return 'left'
  }
  return 'right'
}



function update_attribute_colors(deckCode) {
  // deckCode = {'left': {'top': {'outcome': int, 'probability': float}, 'bottom': {'outcome', 'prob'}}}

  left_right = ['left', 'right']
  top_bottom = ['top', 'bottom']

  // keep colors constant red / green
  red = '(150, 0, 0)';
  green = '(0, 150, 0)';

  for (var horizontal = 0; horizontal < left_right.length; horizontal++) {
    for (var vertical = 0; vertical < top_bottom.length; vertical++) {
      outcome = deckCode[left_right[horizontal]]['outcome'][top_bottom[vertical]]
      if (outcome > 0) {
        $('#' + left_right[horizontal] + 'Deck' + jsUcfirst(top_bottom[vertical]) + 'Outcome').css({'color': 'rgb' + red});
      }
      if (outcome < 0) {
        $('#' + left_right[horizontal] + 'Deck' + jsUcfirst(top_bottom[vertical]) + 'Outcome').css({'color': 'rgb' + green}) 
      }
      if (outcome == 0) {
        $('#' + left_right[horizontal] + 'Deck' + jsUcfirst(top_bottom[vertical]) + 'Outcome').css({'color': 'rgb(0, 0, 0)'})      
      }
    }
  }



}



function translateSwitchToColor(outcome) {
  // making it so that the ends of the switching limits that subjects will see in the exp (i.e., 2 and 14) correspond to the ends of the color spectrum
  // thus, need to chop the spectrum in any one direction (255) into the number of segments equal to the 
  // absolute value of the difference between the end of switching and reference (eg, 60-32 = 28)
  // function behaves incorrectly for input 32, but that's okay

  // i think this function expects outcome to be in absolute, not relative, terms?
  //outcome += 32;

  colorMin = 0;
  colorMax = 150;

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