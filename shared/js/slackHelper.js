//==============================================================================
/**
@file       slackHelper.js
@author     Carl Carter
**/
//==============================================================================

const UrlPostMessage = 'https://slack.com/api/chat.postMessage';

// Prototype which represents a scene action
function CreateSlackMessage(inContext, inSettings) {

    // Init SceneAction
    var instance = this;





}


function slackError(inMessage) {





}

function slackMessageMarkdown(inMessage) {



}

function slackLogger(messageBlock) {

    const postData = {
        channel: 'U01MUC1JDBM',
        blocks: messageBlock,
        as_user: 'true'};

    const headers = {
        method: 'POST',
        headers: {"Content-type": "application/json; charset=UTF-8;",  
                    "Authorization": "Bearer " + SLACK_BOT_TOKEN},
        body: JSON.stringify(postData)};

    fetch(UrlPostMessage, headers)
        .then(data=>{return data.json()})
        .then(res=>{console.log(res)})
        .catch(error=>console.log(error))

}
