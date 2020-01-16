import { AlexaActivityTypes } from '../alexaSchema';
import { Middleware, TurnContext } from 'botbuilder';
import { RequestEnvelope } from 'ask-sdk-model';
import { getSlotValue } from 'ask-sdk-core';

/**
 * Intent Slot Name
 * Defaults to 'phrase'
 */
export interface AlexaRequestToMessageEventActivitiesMiddlewareSettings {
    intentSlotName: string;
}

export class AlexaRequestToMessageEventActivitiesMiddleware implements Middleware {

    protected readonly settings: AlexaRequestToMessageEventActivitiesMiddlewareSettings;

    public constructor(settings: AlexaRequestToMessageEventActivitiesMiddlewareSettings) {
        const defaultSettings: AlexaRequestToMessageEventActivitiesMiddlewareSettings = {
            intentSlotName: 'phrase'
        };

        this.settings = { ...defaultSettings, ...settings };
    }

    public async onTurn(context: TurnContext, next: () => Promise<void>): Promise<void> {

        if (context.activity.channelId !== 'alexa') {
            return await next();
        }

        const alexaRequest: RequestEnvelope = context.activity.channelData;

        if (alexaRequest.request.type !== AlexaActivityTypes.IntentRequest) {
            return await next();
        }

        const intentValue = getSlotValue(alexaRequest, this.settings.intentSlotName);
        context.activity.text = intentValue;

        await next();
    }

}