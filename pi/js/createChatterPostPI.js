//==============================================================================
/**
@file       createChatterPostPI.js
@brief      Salesforce Plugin
**/
//==============================================================================

function CreateChatterPostPI(inContext, inLanguage, inStreamDeckVersion, inPluginVersion) {
    
    // Init PlatformEventSendPI
    var instance = this;
    console.log("createChatterPostPI.js: createChatterPostPI");
    // Inherit from PI
    PI.call(this, inContext, inLanguage, inStreamDeckVersion, inPluginVersion);

    // Add Event Name and Event Body
    var eventDetail = "<div class='sdpi-item'> \
                            <div class='sdpi-item-label'>Message Text</div> \
                            <input class='inspector sdpi-item-value' id='chatterText' value=''> \
                       </div> \
                       <div class='sdpi-item'> \
                            <div class='sdpi-item-label'>Mention Id</div> \
                            <input class='inspector sdpi-item-value' id='chatterMentionId' value=''> \
                       </div> \
                       <div class='sdpi-item'> \
                            <div class='sdpi-item-label'>Subject Id</div> \
                            <input class='inspector sdpi-item-value' id='chatterSubjectId' value=''> \
                       </div>";

    document.getElementById('placeholder').innerHTML = eventDetail;

    // Add event listener
    document.getElementById('chatterText').addEventListener('change', chatterTextChanged);
    document.getElementById('chatterMentionId').addEventListener('change', chatterMentionIdChanged);
    document.getElementById('chatterSubjectId').addEventListener('change', chatterSubjectIdChanged);
    

    // Event Name changed
    function chatterTextChanged(inEvent) {
    
        settings.chatterText = inEvent.target.value;
        instance.saveSettings();
        instance.loadData();
    
        // Inform the plugin that a new scene is set
        instance.sendToPlugin({ 'piEvent': 'valueChanged' });
    
    }

    // leadLastName select changed
    function chatterMentionIdChanged(inEvent) {

        settings.chatterMentionId = inEvent.target.value;
        instance.saveSettings();
        instance.loadData();
    
        // Inform the plugin that a new scene is set
        instance.sendToPlugin({ 'piEvent': 'valueChanged' });
    }

    // leadStatus select changed
    function chatterSubjectIdChanged(inEvent) {

        settings.chatterSubjectId = inEvent.target.value;
        instance.saveSettings();
        instance.loadData();
    
        // Inform the plugin that a new scene is set
        instance.sendToPlugin({ 'piEvent': 'valueChanged' });
    }
}
