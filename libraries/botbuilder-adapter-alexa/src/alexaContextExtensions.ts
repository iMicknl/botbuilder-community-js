import { TurnContext } from 'botbuilder';

export class AlexaContextExtensions {

    public static sendProgressiveResponse(context: TurnContext, content: string) {
        // var progressiveResponse = new ProgressiveResponse(context.GetAlexaRequestBody());
        // await progressiveResponse.SendSpeech(content);
    }

    public static getAlexaRequestBody(context: TurnContext) {
        if (context?.activity?.channelData) {
            return context.activity.channelData;
        } else {
            return null;
        }
    }

    public static deviceHasDisplay(context: TurnContext): boolean {
        const alexaRequest = context.activity.channelData;
        const hasDisplay = alexaRequest?.Context?.System?.Device?.SupportedInterfaces?.ContainsKey('Display');

        return hasDisplay.HasValue && hasDisplay.Value;
    }

    public static deviceHasAudioPlayer(context: TurnContext): boolean {
        return false;
    }

    public static sendPermissionConsentRequestActivity(context: TurnContext, message: string, permissions: string[]): boolean {
        return false;
    }

    public static getSessionAttributes(context: TurnContext): boolean {
        return false;
    }

    public static setRepromptSpeech(context: TurnContext, message: string): void {

    }

}
