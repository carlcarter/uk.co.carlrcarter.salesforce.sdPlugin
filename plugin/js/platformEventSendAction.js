//==============================================================================
/**
@file       platformEventSendAction.js
@brief      Philips Hue Plugin
@copyright  (c) 2019, Corsair Memory, Inc.
            This source code is licensed under the MIT-style license found in the LICENSE file.
**/
//==============================================================================

// Prototype which represents a scene action
function PlatformEventSendAction(inContext, inSettings) {

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

        // If no eventApiName is set for this action
        if (!('eventApiName' in inSettings)) {
            log('eventApiName ' + inSettings.eventApiName + ' not found in cache');
            showAlert(inContext);
            return;
        }

        // If no eventPayload is set for this action
        if (!('eventPayload' in inSettings)) {
            log('eventPayload ' + inSettings.eventPayload + ' not found in cache');
            showAlert(inContext);
            return;
        }

        var conn = new jsforce.Connection({
          // you can change loginUrl to connect to sandbox or prerelease env.
          loginUrl : inSettings.orgUrl
        });

        console.log("event: " + inSettings.eventApiName);
        console.log("payLoad: " + inSettings.eventPayload);

        conn.login(inSettings.username, inSettings.password, function(err, userInfo) {    
            if (err) { return console.error(err); }
            // Now you can get the access token and instance URL information.
            // Save them to establish connection next time.
            //console.log(conn.accessToken);
            //console.log(conn.instanceUrl);
            // logged in user property
            console.log("User ID: " + userInfo.id);
            console.log("Org ID: " + userInfo.organizationId);
            // ...
            /**
            const leadData = {
                FirstName: 'Carl',
                LastName: 'Carter',
                Status: 'New',
                FinServ__ReferredByUser__c: '0053z00000BTXFHAA5',
                Company: 'ABC Limited'
              };
            conn.sobject('Lead').create(leadData, (err, res) => {
            if (err) {
                console.log("error: " + err);
                } else {
                    console.log("Lead Created");
                }
            });
            **/
            
            conn.sobject(inSettings.eventApiName).create(JSON.parse(inSettings.eventPayload), (err, res) => {
            if (err) {
                console.log("error: " + err);
            } else {
                console.log("Event published");
            }
            });
        });
        
    };


    // Private function to set the defaults
    function setDefaults() {

        // // Get the settings and the context
        // var settings = instance.getSettings();
        // var context = instance.getContext();

        // // Check if any bridge is configured
        // if (!('bridge' in settings)) {
        //     return;
        // }

        // // Check if the configured bridge is in the cache
        // if (!(settings.bridge in cache.data)) {
        //     return;
        // }

        // // Find the configured bridge
        // var bridgeCache = cache.data[settings.bridge];

        // // Check if a light was set for this action
        // if (!('light' in settings)) {
        //     return;
        // }

        // // Check if the light was set to a group
        // if (!(settings.light.indexOf('g-') !== -1)) {
        //     return;
        // }

        // // Check if the configured group is in the cache
        // if (!(settings.light in bridgeCache.groups)) {
        //     return;
        // }

        // // Find the configured group
        // var groupCache = bridgeCache.groups[settings.light];

        // // Check if a scene was configured for this action
        // if ('scene' in settings) {
        //     // Check if the scene is part of the set group
        //     if (settings.scene in groupCache.scenes) {
        //         return;
        //     }
        // }

        // // Check if the group has at least one scene
        // if (!(Object.keys(groupCache.scenes).length > 0)) {
        //     return;
        // }

        // // Sort the scenes alphabetically
        // var sceneIDsSorted = Object.keys(groupCache.scenes).sort(function(a, b) {
        //     return groupCache.scenes[a].name.localeCompare(groupCache.scenes[b].name);
        // });

        // // Set the action automatically to the first one
        // settings.scene = sceneIDsSorted[0];

        // // Save the settings
        // saveSettings('uk.co.carlrcarter.salesforce.sendplatformevent', context, settings);
    }
}
