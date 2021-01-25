//==============================================================================
/**
@file       createLeadPI.js
@brief      Salesforce Plugin
**/
//==============================================================================

function CreateLeadPI(inContext, inLanguage, inStreamDeckVersion, inPluginVersion) {
    // Init PlatformEventSendPI
    var instance = this;
    console.log("createLeadPI.js: createLeadPI");
    // Inherit from PI
    PI.call(this, inContext, inLanguage, inStreamDeckVersion, inPluginVersion);

    // Add Event Name and Event Body
    var eventDetail = "<div class='sdpi-item'> \
                            <div class='sdpi-item-label'>Lead First Name</div> \
                            <input class='inspector sdpi-item-value' id='leadFirstName' value=''> \
                       </div> \
                       <div class='sdpi-item'> \
                            <div class='sdpi-item-label'>Lead Last Name</div> \
                            <input class='inspector sdpi-item-value' id='leadLastName' value=''> \
                       </div> \
                       <div class='sdpi-item'> \
                            <div class='sdpi-item-label'>Lead Status</div> \
                            <input class='inspector sdpi-item-value' id='leadStatus' value=''> \
                       </div> \
                       <div class='sdpi-item'> \
                            <div class='sdpi-item-label'>Lead Company Name</div> \
                            <input class='inspector sdpi-item-value' id='leadCompanyName' value=''> \
                       </div>";

    document.getElementById('placeholder').innerHTML = eventDetail;

    // Add event listener
    document.getElementById('leadFirstName').addEventListener('change', leadFirstNameChanged);
    document.getElementById('leadLastName').addEventListener('change', leadLastNameChanged);
    document.getElementById('leadStatus').addEventListener('change', leadStatusChanged);
    document.getElementById('leadCompanyName').addEventListener('change', leadCompanyNameChanged);

    // Event Name changed
    function leadFirstNameChanged(inEvent) {
    
        settings.leadFirstName = inEvent.target.value;
        instance.saveSettings();
        instance.loadData();
    
        // Inform the plugin that a new scene is set
        instance.sendToPlugin({ 'piEvent': 'valueChanged' });
    
    }

    // leadLastName select changed
    function leadLastNameChanged(inEvent) {

        settings.leadLastName = inEvent.target.value;
        instance.saveSettings();
        instance.loadData();
    
        // Inform the plugin that a new scene is set
        instance.sendToPlugin({ 'piEvent': 'valueChanged' });
    }

    // leadStatus select changed
    function leadStatusChanged(inEvent) {

        settings.leadStatus = inEvent.target.value;
        instance.saveSettings();
        instance.loadData();
    
        // Inform the plugin that a new scene is set
        instance.sendToPlugin({ 'piEvent': 'valueChanged' });
    }
    
    // leadCompanyName select changed
    function leadCompanyNameChanged(inEvent) {

        settings.leadCompanyName = inEvent.target.value;
        instance.saveSettings();
        instance.loadData();
    
        // Inform the plugin that a new scene is set
        instance.sendToPlugin({ 'piEvent': 'valueChanged' });
    }    

}
