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
    console.log("pi.js: PI");
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

        if (instance instanceof PlatformEventSendPI) {
            //Send Platform Event Variables
            document.getElementById('eventApiName').value = settings.eventApiName || "Custom_Event__e";
            document.getElementById('eventPayload').value = settings.eventPayload || "{'Field': 'Value'}";
        }
        else if (instance instanceof CreateLeadPI) {
            //Create Lead Variables
            document.getElementById('leadFirstName').value = settings.leadFirstName || "John";
            document.getElementById('leadLastName').value = settings.leadLastName || "Smith";
            document.getElementById('leadStatus').value = settings.leadStatus || "New";
            document.getElementById('leadCompanyName').value = settings.leadCompanyName || "ABC Limited";
        }
        else if (instance instanceof CreateChatterPostPI) {
            //Create Chatter Post Variables
            document.getElementById('chatterText').value = settings.chatterText || "";
            document.getElementById('chatterMentionId').value = settings.chatterMentionId || "";
            document.getElementById('chatterSubjectId').value = settings.chatterSubjectId || "";
        }
        else if (instance instanceof GenericRestAPICallPI) {
            //Create Rest API Variables
            document.getElementById('restAPIEndpoint').value = settings.restAPIEndpoint || "";
            document.getElementById('restPayload').value = settings.restPayload || "";
        }

    }

    // OrgURL select changed
    function orgURLChanged(inEvent) {
        settings.orgUrl = inEvent.target.value;
        instance.saveSettings();
        instance.loadData();
    }

    // Username select changed
    function usernameChanged(inEvent) {
        settings.username = inEvent.target.value;
        instance.saveSettings();
        instance.loadData();
    }

    // Password select changed
    function passwordChanged(inEvent) {
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
        else if (instance instanceof CreateLeadPI) {
            action = 'uk.co.carlrcarter.salesforce.createlead';
        }
        else if (instance instanceof CreateChatterPostPI) {
            action = 'uk.co.carlrcarter.salesforce.createchatterpost';
        }
        else if (instance instanceof GenericRestAPICallPI) {
            action = 'uk.co.carlrcarter.salesforce.genericrestapicall';
        }

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
