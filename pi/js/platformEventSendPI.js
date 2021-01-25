//==============================================================================
/**
@file       platformEventSendPI.js
@brief      Philips Hue Plugin
**/
//==============================================================================

function PlatformEventSendPI(inContext, inLanguage, inStreamDeckVersion, inPluginVersion) {
    // Init PlatformEventSendPI
    var instance = this;
    console.log("PlatformEventSendPI.js: PlatformEventSendPI");
    // Inherit from PI
    PI.call(this, inContext, inLanguage, inStreamDeckVersion, inPluginVersion);

    // Add Event Name and Event Body
    var eventDetail = "<div class='sdpi-item'> \
                            <div class='sdpi-item-label'>Event API Name</div> \
                            <input class='inspector sdpi-item-value' id='eventApiName' value=''> \
                       </div> \
                       <div type='textarea' class='sdpi-item' id='message_only'> \
                            <div class='sdpi-item-label'>Event Payload</div> \
                            <span class='sdpi-item-value textarea'> \
                                <textarea class='inspector' type='textarea' id='eventPayload'>{}</textarea> \
                            </span> \
                        </div>";

    document.getElementById('placeholder').innerHTML = eventDetail;

    // Add event listener
    document.getElementById('eventApiName').addEventListener('change', eventNameChanged);
    document.getElementById('eventPayload').addEventListener('change', eventPayloadChanged);

    // Event Name changed
    function eventNameChanged(inEvent) {
        console.log("PlatformEventSendPI.js: eventNameChanged");
        // Save the new scene settings
        settings.eventApiName = inEvent.target.value;
        instance.saveSettings();
        instance.loadData();

        // Inform the plugin that a new scene is set
        instance.sendToPlugin({ 'piEvent': 'valueChanged' });
    
    }

    // Event Payload changed
    function eventPayloadChanged(inEvent) {
        console.log("PlatformEventSendPI.js: eventPayloadChanged");
        // Save the new scene settings
        settings.eventPayload = inEvent.target.value;
        instance.saveSettings();
        instance.loadData();

        // Inform the plugin that a new scene is set
        instance.sendToPlugin({ 'piEvent': 'valueChanged' });

    }

}
