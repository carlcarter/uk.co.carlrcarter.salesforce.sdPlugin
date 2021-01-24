//==============================================================================
/**
@file       pi.js
@brief      Philips Hue Plugin
@copyright  (c) 2019, Corsair Memory, Inc.
            This source code is licensed under the MIT-style license found in the LICENSE file.
**/
//==============================================================================

function PI(inContext, inLanguage, inStreamDeckVersion, inPluginVersion) {
    
    // Init PI
    var instance = this;

    // Public localizations for the UI
    this.localization = {};

    // Add event listener
    document.getElementById('orgUrl').addEventListener('change', orgURLChanged);
    document.getElementById('username').addEventListener('change', usernameChanged);
    document.getElementById('password').addEventListener('change', passwordChanged);
    
    this.loadData = function() {

        console.log("pi.js: loadData");

        // Select the currently configured basic settings
        document.getElementById('orgUrl').value = settings.orgUrl || "https://" ;
        document.getElementById('username').value = settings.username || "example@salesforcedev.com";
        document.getElementById('password').value = settings.password || "*******";
        document.getElementById('eventApiName').value = settings.eventApiName || "Custom_Event__e";
        document.getElementById('eventPayload').value = settings.eventPayload || "{'Field': 'Value'}";

    }

    // OrgURL select changed
    function orgURLChanged(inEvent) {
        console.log("pi.js: orgURLChanged");
        settings.orgUrl = inEvent.target.value;
        instance.saveSettings();
        instance.loadData();
    }

    // Username select changed
    function usernameChanged(inEvent) {
        console.log("pi.js: usernameChanged");
        settings.username = inEvent.target.value;
        instance.saveSettings();
        instance.loadData();
    }

    // OrgURL select changed
    function passwordChanged(inEvent) {
        console.log("pi.js: passwordChanged");
        settings.password = inEvent.target.value;
        instance.saveSettings();
        instance.loadData();
    }

    // Private function to return the action identifier
    function getAction() {
        var action
        console.log("pi.js: getAction");
        // Find out type of action
        if (instance instanceof PlatformEventSendPI) {
            action = 'uk.co.carlrcarter.salesforce.sendplatformevent';
        }
        //else if (instance instanceof ChatterPostLikesPI) {
        //    action = 'uk.co.carlrcarter.salesforce.chatterPostLikes';
        //}

        return action;
    }

    // Public function to save the settings
    this.saveSettings = function() {
        console.log("pi.js: saveSettings");
        saveSettings(getAction(), inContext, settings);
    }

    // Public function to send data to the plugin
    this.sendToPlugin = function(inData) {
        console.log("pi.js: sendToPlugin");
        sendToPlugin(getAction(), inContext, inData);
    }
}