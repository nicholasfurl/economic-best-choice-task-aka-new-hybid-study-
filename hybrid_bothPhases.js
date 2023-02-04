//need different comment style inside script for some reason


    //before anything else, assign participant to condition randomly
    //Participant can have sequence length 8 or 12
    seq_cond = Math.random() < 0.5 ? 1 : 2
    if (seq_cond === 1) { num_options = 8; }
    else { num_options = 12; }
    //Participant can have 3-rank reward scheme or continuous reward scheme
    //1 is 3-rank, 2 is continuous
    reward_cond = Math.random() < 0.5 ? 1 : 2

    reward_cond = 2;  //in case I want to force

    //I'm need tbhis function definition later --- feedback screen and analysis is going to depend on the rank of the ith choice so need the following function definition
    function findRank(j, random_values) {
        let sorted = random_values.slice().sort((a, b) => a - b);
        let value = random_values[j];
        let rank = sorted.indexOf(value) + 1;
        return rank;
    }



    //******************make random_values array for phase 2 sequences****************************/
    var prices = [1008, 1032, 1061.99, 1065.99, 1083, 1113.99, 1115.99, 1123, 1133.99, 1139.99, 1152, 1155.99, 1155, 1187.99, 1201.99, 1225, 1229.99, 1250, 1253.99, 1320, 1322, 1345, 1683, 1691.99, 1709, 1763.99, 359.76, 383.76, 431.76, 432, 480, 504, 528, 551.76, 552, 571, 576, 590.99, 600, 624, 631.92, 631.99, 642.96, 646.08, 667, 673.99, 695.76, 715, 720, 723, 725.99, 735.99, 744, 745.75, 745.99, 746.99, 749.99, 768, 769.75, 779, 787, 792, 795.99, 795, 798.99, 799.99, 801.99, 811, 825.99, 835, 839.75, 843, 845.99, 864, 865.99, 869.99, 871.99, 875.99, 887.99, 893.99, 909.99, 912, 915, 917.99, 918.99, 923.99, 935, 941.99, 945.99, 989.99];
    // Define the number of sequences and options
    var num_seqs = 7;

    // Create an empty 2D array to store the random values
    var random_values = new Array(num_seqs);
    for (var i = 0; i < num_seqs; i++) {
        random_values[i] = new Array(num_options);
    }


    // Make a copy of the prices array so that we don't modify the original
    var prices_copy = prices.slice();

    // Loop through the 2D array and fill it with random values from the prices array
    for (var i = 0; i < num_seqs; i++) {
        for (var j = 0; j < num_options; j++) {

            // Generate a random index within the range of the prices array
            var random_index = Math.floor(Math.random() * prices_copy.length);

            // Use the random index to pick a value from the prices array
            random_values[i][j] = prices_copy[random_index];

            // Remove the value from the prices array so that it is not picked again
            prices_copy.splice(random_index, 1);
        }
    }
    //***********************make random_values for phase 2 sequences*************************


    //Format default screen appearance
    document.body.style.backgroundColor = 'grey'
    document.body.style.color = 'white'


    //initialises jsPsych with display data on finish
    var jsPsych = initJsPsych({
        on_finish: function () {
            /*jsPsych.data.displayData();
            var data = jsPsych.data.get();
            var csv = data.csv();
            var file = new Blob([csv], { type: 'text/csv' });
            var a = document.createElement('a');
            a.href = URL.createObjectURL(file);
            a.download = 'data.csv';
            a.click();*/
        }
    });

    //Pre-configure timeline prior to run
    var timeline = [];






    var information_sheet = {
        type: jsPsychInstructions,
        pages: [
            `<p style= color:white;>This study on decision making is conducted by FurlLab at Royal Holloway, University of London. 
    If you would like to discuss any aspect of the research, please contact nicholas.furl@rhul.ac.uk. 
    We would appreciate your participation because we will use the findings to understand how people 
    make decisions in everyday life.</p>`,

            `<p style= color:white;>The entire study takes place online, and may take approximately 20 minutes to complete.
    In the current study, imagine that you are looking to buy a phone at the lowest price possible. 
    If you decide to take part, you will complete two phases:<br><br>
    In the first phase, you will see different phone prices appear on the screen. You will rate the prices, one at a time, on their attractiveness to you. 
    You will use a slider to rate attractiveness on a scale from very unattractive to very attractive.<br><br>
    In the second phase, you will attempt to choose the most attractive (i.e., lowest possible) phone price when it appears within a sequence of prices.</p>`,

            `<p style= color:white;>Participation is anonymous and confidential. All data will be identified only by a code (participant ID), 
    and stored on a secure computer, according to GDPR guidelines. Copies of the anonymised data may be made 
    available to research data sharing platforms such as the UK Data Archive or the Open Science Framework, 
    and to other relevant researchers for research purposes only. We may also publish summary data in academic 
    journals and conference proceedings and may use the data in future research.<br><br>
    Participation involves no expected risk. You do not have to take part in this study if you do not want to. 
    If, after having taken part, you decide you would like to have your data removed you can do so by emailing nicholas.furl@rhul.ac.uk. 
    You don’t have to give a reason. This study is covered by the Royal Holloway, University of London College Ethics Board.</p>`,
        ],
        button_label_next: "Continue for more information",
        button_label_previous: "Return to previous page",
        show_clickable_nav: true,
        
    }
    timeline.push(information_sheet)

    /*
    `<p style= color:white;>
        </p>`,
        `<p style= color:white;>
        </p>`,
    */

    var consent_screen = {
        type: jsPsychSurveyMultiSelect,
        preamble: `CONSENT FORM<br><br>
            You have been asked to participate in a study about decision making, 
            which is being carried out by FurlLab.<br><br>
            To begin study, please indicate all of the following:`,
        questions: [
            {
                prompt: `<p style="font-size: 12pt;">I have read and understood the information sheet about this study</p>`,
                options: [`<p style="font-size: 12pt;">I agree</p>`],
                horizontal: true,
                required: true,
            },
            {
                prompt: `<p style="font-size: 12pt;">I have had the opportunity to ask questions</p>`,
                options: [`<p style="font-size: 12pt;">I agree</p>`],
                horizontal: true,
                required: true,
            },
            {
                prompt: `<p style="font-size: 12pt;">I have received satisfactory answers to any questions</p>`,
                options: [`<p style="font-size: 12pt;">I agree</p>`],
                horizontal: true,
                required: true,
            },
            {
                prompt: `<p style="font-size: 12pt;">I understand that I am free to withdraw from the study at any time, without giving a reason</p>`,
                options: [`<p style="font-size: 12pt;">I agree</p>`],
                horizontal: true,
                required: true,
            },
            {
                prompt: `<p style="font-size: 12pt;">I understand that my data will be stored anonymously on a secure computer in accordance with GDPR guidelines, and that my data may be used in future research</p>`,
                options: [`<p style="font-size: 12pt;">I agree</p>`],
                horizontal: true,
                required: true,
            },
            {
                prompt: `<p style="font-size: 12pt;">I am 18 years old or over</p>`,
                options: [`<p style="font-size: 12pt;">I agree</p>`],
                horizontal: true,
                required: true,
            },
            {
                prompt: `<p style="font-size: 12pt;">I agree to participate in this study</p>`,
                options: [`<p style="font-size: 12pt;">I agree</p>`],
                horizontal: true,
                required: true,
            },
        ],
        button_label: 'Begin study',
        required_message: 'You must agree to all conditions to begin study'
    }
    timeline.push(consent_screen)


    //get age and gender
    var demographics_survey = {
        type: jsPsychSurvey,
        pages: [
            [
                {
                    type: 'html',
                    prompt: 'Please answer the following questions:',
                },
                {
                    type: 'multi-choice',
                    prompt: "Which best describes your gender?",
                    name: 'gender',
                    options: ['Male', 'Female', 'Non-binary', 'Other', 'Prefer not to say'],
                    required: false,
                    option_reorder: 'random',
                },
                {
                    type: 'text',
                    prompt: "Please enter your age in years",
                    name: 'age',
                    required: false,
                } //question definition
            ]   //individual page definition
        ],    //pages: definition
        button_label_finish: 'Proceed to study instructions',
    };  //demographic survey definition
    timeline.push(demographics_survey)



    //***********************PHASE 1*************************
    var phase1_instructions = {
        type: jsPsychInstructions,
        pages: [
            `
    <p style= color:white;>You will now start phase one of the study.<br><br>
    All phone prices you are about to see are for flagship models by the top brands, on an up to 5 GB plan with unlimited texts and minutes. All prices are actual prices of 2-year contracts offered by various UK retailers. All prices are in pounds (GBP).<br><br>
    You will see different phone prices appear on the screen. You will rate the prices, one at a time, on their attractiveness. <br><br>
    "Attractiveness" refers to the degree that would would like to buy a phone at the given price.
    You will use a slider to rate attractiveness on a scale from very unattractive to very attractive</p>.
    `
        ],
        show_clickable_nav: true
    }
    timeline.push(phase1_instructions)

    //Make list with repetitions of all prices, then randomise big list
    //var long_prices = prices.concat(prices, prices); // concatenates the prices array to itself twice
    var long_prices = prices.slice(0, 5); // short rating phase for testing / debugging purposes
    long_prices = jsPsych.randomization.shuffle(long_prices);

    //Rating trials
    for (var i = 0; i < long_prices.length; i++) {
        timeline.push({
            type: jsPsychHtmlSliderResponse,
            stimulus: 'Price of this smartphone contract: GBP ' + long_prices[i],
            labels: ['Not attracted by this price', 'Extremely attracted by this price'],
            min: 0,
            max: 100,
            slider_width: 400,
            start: 2,
            handle: false,
            require_movement: true,
            data: { price: long_prices[i] }
        });
    }
    //***********************PHASE 1*************************





    //***********************PHASE 2*************************

    //1 is 3-rank, 2 is continuous
    if (reward_cond === 1) {
        instr_text = `
        <p style= color:white;>
            When you make a good choice, we will award you a certain number of stars. <br><br>
            Your main goal is to collect as many stars as possible by the end of the study! <br><br>
            Stars are awarded as follows:<br><br>
            *****5 stars if you choose the best (lowest) price<br>
              ***3 stars if you choose the second best (lowest) price<br>
                *1 star** if you choose the third best (lowest) price<br>
                 0 stars** if you choose any other price<br>
            </p>
        `;
    }
    else {
        instr_text = `
        <p style= color:white;>Choose the most <strong>attractive</strong> price in the sequence.<br>
            That is, try to choose the phones you would most like to buy.
            </p>
        `;
    }

    //phase 2 instructions
    var phase2_instructions = {
        type: jsPsychInstructions,
        pages: [

            `<p style= color:white;>The next part of this study, phase 2, is designed to simulate a real-world decision scenario. When you decide against buying a certain phone at a certain price, 
            you might not be able to get the same deal at a later time. And you don't know for sure whether you'll come across a better deal in the future.</p>`,

            `<p style= color:white;>In phase 2, imagine that you are looking to buy a phone at the lowest price possible. All the phone prices you are about to see are 
            for flagship models by the top brands, on an up to 5 GB plan with unlimited texts and minutes. All prices are actual prices of 2-year contracts offered 
            by various UK retailers. All prices are in pounds (GBP).</p>`,

            `<p style= color:white;>In phase 2, you will be presented with phone prices in a sequence, one after the other. 
            When each price is presented, pretend that this is the deal that is available to you ONLY at that particular moment. <br><br> 
            For each phone price you'll see, you have to decide whether this is the lowest price you can get. If you think you might encounter a better price in the future (i.e., later in the sequence), 
             then you can decline the current option and see another price. Your declined phone prices will be shown towards the bottom of the screen.<br><br>
            If you have not chosen any price by the time you reach the last option in the sequence, 
            that last price will become your choice by default.<br><br>
            Prices shown in each sequence are drawn from a larger pool of prices, and may be unique! </p>`,

            `<p style= color:white;>In each sequence, you will encounter ` + num_options + ` prices each. You will not know the number of sequences so any of the sequences might be your last chance to choose one of the best phones! <br><br>
            We won’t tell you which specific model phone a price pertains to, we will just show you the possible prices, one after the other. 
            You don’t need to try and second-guess which specific phone you would get for a given price – you should assume all the phones are equivalent, 
            and your job is just to try and choose the lowest price.</p>`,

            instr_text,

            `<p style= color:white;>**Please note**: you will advance through the screens automatically, except when asked to press a button. 
                For example, the screen that shows the phone price will be shown for only 4 seconds. This is quite fast!</p>`
        ],
        button_label_next: "Continue to next page",
        button_label_previous: "Return to previous page",
        show_clickable_nav: true
    }

    timeline.push(phase2_instructions)

    //Phase 2 trials
    for (var i = 0; i < num_seqs; i++) {


        //kickoff screen
        var sequence_start = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `
                <h3 style="color: white; text-align: left;">You will buy a: <strong>SMARTPHONE</strong></h3> <br/> 
                <h3 style="color: white; text-align: left;">You can see up to: <strong>`+ num_options + ` options</strong></h3> <br/> 
                <h3 style="color: white; text-align: left;">It is best to buy a SMARTPHONE</h3> <br/> 
                <h3 style="color: white; text-align: left">at the LOWEST PRICE </h3>
                    `,
            trial_duration: 6000,
            data: {
                name: 'sequence start screen'
            }
        }   //sequence start screen def
        timeline.push(sequence_start)



        var past_options = [];
        for (var j = 0; j < num_options; j++) {



            //option screen def
            var option_screen = {
                type: jsPsychHtmlKeyboardResponse,
                stimulus: `
                <h3 style="color: white;">You will buy a: SMARTPHONE</h3> <br/> 
                <h3 style="color: white;">You have only ` + (num_options - j - 1) + ` options left to choose from</h3> <br/> 
                <h3 style="color: white;">Current Option:</h3><br/> 
                <h3 style=" color: black;"> £` + random_values[i][j] + `</h3><br/> 
                <h3 style=" color: black;">Declined Options</span></h3><br/> 
                <h3 style="left: 0; color: black;">` + past_options.join('..   ') + `</h3>
                `,
                choices: ['next'],
                trial_duration: 4000,
                data: {
                    name: 'option screen',
                    price: random_values[i][j],
                    sequence: i + 1,
                    option: j + 1,
                }
            };
            past_options.push('£' + random_values[i][j]);




            //response prompt def
            if (j === num_options - 1) {
                var choice_buttons = ['Take this option'];
            }
            else {
                var choice_buttons = ['Take this option', 'See next option'];
            }

            var response_prompt = {
                type: jsPsychHtmlButtonResponse,
                stimulus: `
                    <p><div style="color:white;">Do you want to take this option?</div></p>
                        `,
                choices: choice_buttons,
                data: {
                    name: 'response prompt',
                    sequence: i + 1,  //correct for zero indexing
                    option: j + 1,    //correct for zero indexing
                    price: random_values[i][j],
                    rank: findRank(j, random_values[i]),
                    num_options: num_options,
                    num_seqs: num_seqs,
                    seq_cond: seq_cond,
                    reward_cond: reward_cond,
                    array: random_values,

                } //closes data update
            }   //closes response prompt





            //make sub timeline that is cancelable
            var node = {
                timeline: [option_screen, response_prompt],
                conditional_function: function () {
                    return (jsPsych.data.get().last(1).values()[0].response !== 0);
                }   //condition function 
            } // node def
            timeline.push(node)


        };    //j (options)



        //Now take care of the reward screen. 
        if (reward_cond === 1) {    //if 3-rank reward scheme

            //feedback screen for the ith sequence
            var feedback_screen = {
                type: jsPsychHtmlKeyboardResponse,
                stimulus:
                    function () {
                        var last_trial = jsPsych.data.get().last(1).values()[0].rank;
                        if (last_trial === 1) {
                            var html = `<p style= color:white;> You win: 5 stars</p>
                        <div style='float: center;'><img src='5_stars.png'></img>`;
                        }
                        else if (last_trial === 2) {
                            var html = `<p style= color:white;> You win: 3 stars</p>
                        <div style='float: center;'><img src='3_stars.png'></img>`;
                        }
                        else if (last_trial === 3) {
                            var html = `<p style= color:white;> You win: 1 star</p>
                        <div style='float: center;'><img src='1_star.png'></img>`;
                        }
                        else {
                            var html = `<p style= color:white;> You win 0 stars</p>`;
                        }
                        return html;
                    },
                trial_duration: 6000,
            }   //feedback dcreen def

        } else {        //if continuous reward scheme

            //feedback screen for the ith sequence
            var feedback_screen = {
                type: jsPsychHtmlSliderResponse,
                stimulus:
                    function () {
                        var last_trial = jsPsych.data.get().last(1).values()[0].price;
                        var html = `<h3 style="color:white; text-align: center;">THIS IS THE PRICE OF YOUR CONTRACT!</h3>
                    <h3 style="color:white; text-align: center;">How rewarding is your choice? Please use the response slider.</h3>
                    <h3 style="color:white; text-align: center;"> £`+ last_trial + `</h3>`;
                        return html;
                    }, //stim function

                /*,*/
                labels: ['Not rewarding', 'Very rewarding'],
                min: 0,
                max: 100,
                slider_width: 400,
                start: 2,
                handle: false,
                require_movement: true,
                data: {
                    name: 'feedback screen',
                    price: function () { return jsPsych.data.get().last(1).values()[0].price; },
                    rank: function () { return jsPsych.data.get().last(1).values()[0].rank; },
                    num_draws: function () { return jsPsych.data.get().last(1).values()[0].option; },
                }
            }   //feedback screen def


        }   //Test which reward condition to decide appearance of feedback screen
        timeline.push(feedback_screen)



    };  //i (sequences)


    jsPsych.run(timeline);