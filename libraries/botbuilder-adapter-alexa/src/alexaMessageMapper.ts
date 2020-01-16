import { AlexaActivityTypes } from './alexaSchema';
import { AlexaAdapter } from './alexaAdapter';
import { RequestEnvelope, Response, ResponseEnvelope, interfaces as AlexaInterfaces } from 'ask-sdk-model';
import { Activity, TurnContext, InputHints, ActivityTypes } from 'botbuilder';
import { escapeXmlCharacters, getLocale, getUserId, getIntentName, getRequestType, getApiAccessToken } from 'ask-sdk-core';

/**
 * @module botbuildercommunity/adapter-alexa
 */

export class AlexaMessageMapper {

    /**
     * Transform Alexa Request to Bot Framework Activity
     * @param alexaRequestBody Request to transform
     */
    public static alexaRequestToActivity(alexaRequestBody: RequestEnvelope): Partial<Activity> {

        const message = alexaRequestBody.request;
        const system: AlexaInterfaces.system.SystemState = alexaRequestBody.context.System;

        // Handle events
        const activity: Partial<Activity> = {
            id: message.requestId,
            timestamp: new Date(message.timestamp),
            channelId: AlexaAdapter.channel,
            conversation: {
                id: alexaRequestBody.session.sessionId,
                isGroup: false,
                conversationType: message.type,
                tenantId: null,
                name: ''
            },
            from: {
                id: getUserId(alexaRequestBody), // TODO Or use personId when speaker is recognized??
                name: 'skill'
            },
            recipient: {
                id: system.application.applicationId,
                name: 'user'
            },
            locale: getLocale(alexaRequestBody),
            text: message.type === AlexaActivityTypes.IntentRequest ? getIntentName(alexaRequestBody) : '',
            channelData: alexaRequestBody,
            localTimezone: null,
            callerId: null,
            serviceUrl: `${ system.apiEndpoint }?token=${ getApiAccessToken(alexaRequestBody) }`,
            listenFor: null,
            label: null,
            valueType: null,
            type: getRequestType(alexaRequestBody)
        };


        // TODO Handle isNewSession??

        // Set Activity Type
        switch (message.type) {

            case AlexaActivityTypes.LaunchRequest:
                activity.type = ActivityTypes.ConversationUpdate;
                break;

            case AlexaActivityTypes.SessionEndedRequest:
                activity.type = ActivityTypes.EndOfConversation;
                break;

            case AlexaActivityTypes.IntentRequest:
                activity.type = ActivityTypes.Message;
                break;

        }

        return activity;

    }

    /**
     * Transform Bot Framework Activity to a Alexa Response Message.
     * @param activity Activity to transform
     */
    public static activityToAlexaResponse(activity: Partial<Activity>, context: TurnContext): Response {

        // Create response
        const response: Response = {};

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const responseEnvelope: ResponseEnvelope = { version: '1.0', response: {} };

        // Add SSML or text response
        if (activity.speak) {
            if (!activity.speak.startsWith('<speak>') && !activity.speak.endsWith('</speak>')) {
                activity.speak = `<speak>${ escapeXmlCharacters(activity.speak) }</speak>`;
            }

            response.outputSpeech = {
                type: 'SSML',
                ssml: activity.speak
            };
        } else {
            response.outputSpeech = {
                type: 'PlainText',
                text: activity.text
            };
        }

        // TODO: Handle reprompt

        // TODO: Handle cards
        // TODO: Handle attachments


        if (context.activity?.attachments) {

            // Check attachment type

            // Convert HeroCard to StandardCard

            // Map to Alexa types
            response.card = null;
        }


        // TODO: Add sessionAttributes
        // TODO: Needs validation?
        // const sessionAttributes = context.turnState.get('AlexaSessionAttributes');

        // Tranform inputHint to shouldEndSession
        switch (activity.inputHint) {
            case InputHints.IgnoringInput:
                response.shouldEndSession = true;
                break;
            case InputHints.ExpectingInput:
                response.shouldEndSession = false;
                break;
            case InputHints.AcceptingInput:
            default:
                break;
        }

        return response;
    }

}
