//==============================================================================
/**
@file       action.js
@brief      Philips Hue Plugin
@copyright  (c) 2019, Corsair Memory, Inc.
            This source code is licensed under the MIT-style license found in the LICENSE file.
**/
//==============================================================================

// Protype which represents an action
function Action(inContext, inSettings) {
    // Init Action
    var instance = this;

    // Private variable containing the context of the action
    var context = inContext;

    // Private variable containing the settings of the action
    var settings = inSettings;

    // Set the default values
    setDefaults();

    // Public function returning the context
    this.getContext = function() {
        return context;
    };

    // Public function returning the settings
    this.getSettings = function() {
        return settings;
    };

    // Public function for settings the settings
    this.setSettings = function(inSettings) {
        settings = inSettings;
    };

    // Public function called when new cache is available
    this.newCacheAvailable = function(inCallback) {
        // Set default settings
        setDefaults(inCallback);
    };

    // Private function to set the defaults
    function setDefaults(inCallback) {
        
        // Find out type of action
        var action;
        if (instance instanceof PlatformEventSendAction) {
            action = 'uk.co.carlrcarter.salesforce.sendplatformevent';
        }
        //else if (instance instanceof ColorAction) {
        //    action = 'com.elgato.philips-hue.color';
        //}
        
        // If no orgUrl is set for this action
        if (!('orgUrl' in settings)) {
            settings.orgUrl = '';
        }

        // If no username is set for this action
        if (!('username' in settings)) {
            settings.username = '';
        }

        // If no password is set for this action
        if (!('password' in settings)) {
            settings.password = '';
        }

        // If no eventApiName is set for this action
        if (!('eventApiName' in settings)) {
            settings.eventApiName = '';
        }

        // If no eventPayload is set for this action
        if (!('eventPayload' in settings)) {
            settings.eventPayload = '';
        }
        
        // Save the settings
        saveSettings(action, inContext, settings);

    }
}
