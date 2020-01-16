import { RequestEnvelope } from 'ask-sdk-model';
import { TurnContext } from 'botbuilder';

/**
 * @module botbuildercommunity/adapter-alexa
 */

export class AlexaContextExtensions {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public static sendProgressiveResponse(context: TurnContext, content: string): void {
        // var progressiveResponse = new ProgressiveResponse(context.GetAlexaRequestBody());
        // await progressiveResponse.SendSpeech(content);
    }

    public static getAlexaRequestBody(context: TurnContext): RequestEnvelope {
        if (context?.activity?.channelData) {
            return context.activity.channelData;
        } else {
            return null;
        }
    }

    public static deviceHasDisplay(context: TurnContext): boolean {
        const alexaRequest = this.getAlexaRequestBody(context);
        const hasDisplay = ('Display' in alexaRequest?.context?.System?.device?.supportedInterfaces);

        return hasDisplay;
    }

    public static deviceHasAudioPlayer(context: TurnContext): boolean {
        const alexaRequest = this.getAlexaRequestBody(context);
        const hasAudioPlayer = ('AudioPlayer' in alexaRequest?.context?.System?.device?.supportedInterfaces);

        return hasAudioPlayer;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public static sendPermissionConsentRequestActivity(context: TurnContext, message: string, permissions: string[]): boolean {
        return false;
    }

    public static setSessionAttributes(context: TurnContext, sessionAttributes: {}): void {
        context.turnState.set('AlexaSessionAttributes', sessionAttributes);
    }

    public static getSessionAttributes(context: TurnContext): {} {
        const alexaRequest = this.getAlexaRequestBody(context);

        return alexaRequest?.session?.attributes;
    }

    public static setRepromptSpeech(context: TurnContext, repromptSpeech: string): void {
        context.turnState.set('AlexaReprompt', repromptSpeech);
    }
}
