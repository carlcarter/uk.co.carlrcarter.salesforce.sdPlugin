//==============================================================================
/**
@file       action.js
@brief      Salesforce Plugin
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
        else if (instance instanceof CreateLeadAction) {
            action = 'uk.co.carlrcarter.salesforce.createlead';
        }
        else if (instance instanceof CreateChatterPostAction) {
            action = 'uk.co.carlrcarter.salesforce.createchatterpost';
        }
        
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

        // If no leadFirstName is set for this action
        if (!('leadFirstName' in settings)) {
            settings.leadFirstName = '';
        }

        // If no leadLastName is set for this action
        if (!('leadLastName' in settings)) {
            settings.leadLastName = '';
        }

        // If no leadStatus is set for this action
        if (!('leadStatus' in settings)) {
            settings.leadStatus = '';
        }

        // If no leadCompanyName is set for this action
        if (!('leadCompanyName' in settings)) {
            settings.leadCompanyName = '';
        }

        // If no chatterText is set for this action
        if (!('chatterText' in settings)) {
            settings.chatterText = '';
        }

        // If no chatterMentionId is set for this action
        if (!('chatterMentionId' in settings)) {
            settings.chatterMentionId = '';
        }

        // If no chatterSubjectId is set for this action
        if (!('chatterSubjectId' in settings)) {
            settings.chatterSubjectId = '';
        }
        
        // Save the settings
        saveSettings(action, inContext, settings);

    }
}
