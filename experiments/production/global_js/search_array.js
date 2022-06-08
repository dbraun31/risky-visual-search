// ========= FOR GENERATING ARRAY ========= 

function generate_stimuli() {
    // generate 64 stimuli with random blue / red coloring to left / right
	// returns array [[div1, div2, div3], ...] where each element is the components for a different stimulus
	// total array is 1000 X 600 px
	var normal_bounds = 60;
	var total_bounds = 52.5;
	var stimuli_container = [];
	var counter = 0;

	var stimuli_scaling_factor = .85;

	for (let i = 1; i < 9; i++) {
		for (let j = 1; j < 9; j++) {
            // these loops create a full set of stimuli, randomly choosing the colors
            // div1 is the border, divs 2&3 are the color panels
			counter += 1;

		  var div1 = document.createElement('div');
		  var div2 = document.createElement('div');
		  var div3 = document.createElement('div');

		  //div1
		  //div1.style.left = 125-50 + 'px';
		  div1.style.left = (1000/8) * j - 100 + Math.max(Math.min(total_bounds, rnorm(normal_bounds*-1, normal_bounds)), total_bounds*-1) + 'px';
		  div1.style.top = (600/8) * i - 50 + Math.max(Math.min(total_bounds, rnorm(normal_bounds*-1, normal_bounds)), total_bounds*-1) + 'px';
		  div1.style.height = 25 * stimuli_scaling_factor + 'px';
		  div1.style.width = 76 * stimuli_scaling_factor + 'px';
		  //div1.style.bottom = '32px';
		  div1.style.display = 'inline-block';
		  div1.style.position = 'absolute';
		  div1.id = counter + 'a';
		  div1.style.boxSizing = 'border-box';
		  div1.classList.add('stimuli');

		  //div2
		  left_color = (Math.random() > .5) ? 'blue' : 'red';

		  div2.style.height = 23 * stimuli_scaling_factor + 'px';
		  div2.style.width = 36 * stimuli_scaling_factor + 'px';
		  div2.style.backgroundColor = left_color;
		  div2.style.display = 'block';
		  div2.style.position = 'absolute';
		  div2.style.boxSizing = 'border-box';
		  div2.classList.add('stimuli');
		  div2.id = counter + 'b';

		  //div3
		  right_color = (left_color == 'blue') ? 'green' : 'blue';

		  div3.style.left = 36 * stimuli_scaling_factor + 'px';
		  div3.style.height = 23 * stimuli_scaling_factor + 'px';
		  div3.style.width = 36 * stimuli_scaling_factor + 'px';
		  div3.style.backgroundColor = right_color;
		  div3.style.display = 'block';
		  div3.style.position = 'absolute';
		  div3.style.boxSizing = 'border-box';
		  div3.classList.add('stimuli');
		  div3.id = counter + 'c';

		  stimuli_container.push([div1, div2, div3])
		  
		}
	}

	return stimuli_container

}


function choose_stimuli(n_stimuli, stimuli_container) {

	// returns randomly chosen stimuli from the container based on number needed
	if (n_stimuli == 64) {
		return stimuli_container
	} 

	var final_stimuli = [];

	for (i = 0; i <= n_stimuli-1; i++) {
		final_stimuli.push(getRandomFromBucket(stimuli_container));
	}

	return final_stimuli

}


function determine_target(final_stimuli) {
	// take the final set of stimuli and pick one to be the target
	target = getRandomFromBucket(final_stimuli);
	target[1].style.backgroundColor = 'red';
	target[2].style.backgroundColor = 'green';
	final_stimuli.push(target);
	return final_stimuli
}



function generate_array(present_or_absent = present_or_absent, n_stimuli = n_stimuli) {

	var stimuli_container = generate_stimuli();

	final_stimuli = choose_stimuli(n_stimuli, stimuli_container);

	if (present_or_absent == 'present') {
		final_stimuli = determine_target(final_stimuli);
	}

	stim_ids = []
	for (i = 0; i < final_stimuli.length; i++) {
		document.getElementById('the_search_array').appendChild(final_stimuli[i][0]).appendChild(final_stimuli[i][1]).appendChild(final_stimuli[i][2]);
		for (j = 0; j < 3; j++) {
			stim_ids.push(final_stimuli[i][j].id)
		}
	}

	return stim_ids

}



// REMOVING STIMULI

function clear_array(stim_ids) {

	for (i = 0; i < stim_ids.length; i++) {
		$('#' + stim_ids[i]).remove();
	}

}
