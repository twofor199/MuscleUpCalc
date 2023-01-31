function handleCalc() {

    //Syncing Data from HTML to JS
    let bodyWeight = document.getElementById("bWeight").value;
    let oneRepMax = document.getElementById("oRMWP").value;
    //console.log(bodyWeight, oneRepMax);
    
    //Send Payload to API
    async function fetchResJSON() {
        let res = await fetch('https://3ieyih9sqi.execute-api.us-west-1.amazonaws.com/Development', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                'BW': bodyWeight,
                'ORM': oneRepMax
            }),
            //mode: 'no-cors'
        });

        //Receive Response
        let resData = await res.json();
        //console.log(resData);
    
        let statusCode = resData['statusCode'];
        let body = JSON.parse(resData['body']);
        //console.log("Body:", body, statusCode)
    
        if (statusCode == 200) {
            let canMuscleUpRes = body['CMU'];
            let bWeightRes = body['BW'];
            let oRMWPRes = body['ORM'];
            let messageRes = body['message'];
            
            console.log("Message:", messageRes);
            document.getElementById("message").innerHTML = messageRes;
        }
        else {
            document.getElementById("message").innerHTML = body['ErrorMessage'];
        }
    
        console.log('the end');

        return;
    }

    fetchResJSON();

}