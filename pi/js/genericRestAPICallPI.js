//==============================================================================
/**
@file       GenericRestAPICall.js
@brief      Salesforce Plugin
**/
//==============================================================================

function GenericRestAPICall(inContext, inLanguage, inStreamDeckVersion, inPluginVersion) {
    
    // Init GenericRestAPICall
    var instance = this;
    console.log("GenericRestAPICall.js: GenericRestAPICall");
    // Inherit from PI
    PI.call(this, inContext, inLanguage, inStreamDeckVersion, inPluginVersion);

    // Add Event Name and Event Body
    var eventDetail = "<div class='sdpi-item'> \
                            <div class='sdpi-item-label'>API Endpoint</div> \
                            <input class='inspector sdpi-item-value' id='restAPIEndpoint' value=''> \
                        </div> \
                       <div class='sdpi-item' id='select_single'> \
                            <div class='sdpi-item-label'>Method</div> \
                            <select class='sdpi-item-value select inspector' id='restMethod'> \
                                <option value='GET'>GET</option> \
                                <option value='POST'>POST</option> \
                            </select> \
                        </div> \
                        <div type='textarea' class='sdpi-item' id='message_only'> \
                            <div class='sdpi-item-label'>Payload</div> \
                            <span class='sdpi-item-value textarea'> \
                                <textarea class='inspector' type='textarea' id='restPayload'>{}</textarea> \
                            </span> \
                        </div>";

    document.getElementById('placeholder').innerHTML = eventDetail;

    // Add event listener
    document.getElementById('restAPIEndpoint').addEventListener('change', restAPIEndpointChanged);
    document.getElementById('restMethod').addEventListener('change', restMethodChanged);
    document.getElementById('restPayload').addEventListener('change', restPayloadChanged);

    // restAPIEndpoint changed
    function restAPIEndpointChanged(inEvent) {
    
        settings.restAPIEndpoint = inEvent.target.value;
        instance.saveSettings();
        instance.loadData();
    
        // Inform the plugin that a new scene is set
        instance.sendToPlugin({ 'piEvent': 'valueChanged' });
    
    }

    // restMethod select changed
    function restMethodChanged(inEvent) {

        settings.restMethod = inEvent.target.value;
        instance.saveSettings();
        instance.loadData();
    
        // Inform the plugin that a new scene is set
        instance.sendToPlugin({ 'piEvent': 'valueChanged' });
    }

    // restPayload select changed
    function restPayloadChanged(inEvent) {

        settings.restPayload = inEvent.target.value;
        instance.saveSettings();
        instance.loadData();
    
        // Inform the plugin that a new scene is set
        instance.sendToPlugin({ 'piEvent': 'valueChanged' });
    }
}
