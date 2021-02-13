//==============================================================================
/**
@file       GenericRestAPICallAction.js
@brief      Salesforce Plugin
**/
//==============================================================================

// Prototype which represents a scene action
function GenericRestAPICallAction(inContext, inSettings) {

    // Init SceneAction
    var instance = this;

    // Inherit from Action
    Action.call(this, inContext, inSettings);

    // Set the default values
    setDefaults();

    // Public function called on key up event
    this.onKeyUp = function(inContext, inSettings, inCoordinates, inUserDesiredState, inState) {
        // If onKeyUp was triggered manually, load settings
        if (inSettings === undefined) {
            inSettings = instance.getSettings();
        }

        console.log(`[onKeyUp] ${JSON.stringify(inSettings)}`);
        
        // If no orgUrl is set for this action
        if (!('orgUrl' in inSettings)) {
            log('orgUrl ' + inSettings.orgUrl + ' not found in cache');
            showAlert(inContext);
            return;
        }

        // If no username is set for this action
        if (!('username' in inSettings)) {
            log('username ' + inSettings.username + ' not found in cache');
            showAlert(inContext);
            return;
        }

        // If no password is set for this action
        if (!('password' in inSettings)) {
            log('password ' + inSettings.password + ' not found in cache');
            showAlert(inContext);
            return;
        }

        // If no restAPIEndpoint is set for this action
        if (!('restAPIEndpoint' in inSettings)) {
            log('restAPIEndpoint ' + inSettings.restAPIEndpoint + ' not found in cache');
            showAlert(inContext);
            return;
        }

        // If no restPayload is set for this action
        if (!('restPayload' in inSettings)) {
            log('restPayload ' + inSettings.restPayload + ' not found in cache');
            showAlert(inContext);
            return;
        }

        var conn = new jsforce.Connection({
          // you can change loginUrl to connect to sandbox or prerelease env.
          loginUrl : inSettings.orgUrl
        });

        conn.login(inSettings.username, inSettings.password, function(err, userInfo) {    
            
            if (err) { 
                showAlert(inContext);
                slackLog(false, err);
                return console.error(err); 
            }
            // Now you can get the access token and instance URL information.
            // Save them to establish connection next time.
            //console.log(conn.accessToken);
            //console.log(conn.instanceUrl);
            // logged in user property
            console.log("User ID: " + userInfo.id);
            console.log("Org ID: " + userInfo.organizationId);
            // ...
           
            fetch(inSettings.restAPIEndpoint, {
                "method": "POST",
                "headers": {
                    "content-type": "application/json",
                    "Authorization": "Bearer " + conn.accessToken,
                },
                "body": inSettings.restPayload
            }).then(
                result => {
                    showOK(inContext), 
                    console.log(result)
                    slackLog(true, result);}
            )
        });
    };

    function slackLog(success, result) {

        const messageBlock = [
            {
                "type": "header",
                "text": {
                    "type": "plain_text",
                    "text": "Generic Rest Post Call",
                    "emoji": true
                }
            },
            {
                "type": "section",
                "fields": [
                    {
                        "type": "mrkdwn",
                        "text": "*Status:*\n" + result.status
                    },
                    {
                        "type": "mrkdwn",
                        "text": "*Message:*\n" + result.statusText
                    }
                ]
            }
        ]

        slackLogger(messageBlock);
    }    


    // Private function to set the defaults
    function setDefaults() {

        // // Set the action automatically to the first one
        // settings.scene = sceneIDsSorted[0];

        // // Save the settings
        // saveSettings('uk.co.carlrcarter.salesforce.sendplatformevent', context, settings);
    }
}
