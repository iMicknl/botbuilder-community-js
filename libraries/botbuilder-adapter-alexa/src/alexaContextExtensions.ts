import { RequestEnvelope } from 'ask-sdk-model';
import { TurnContext } from 'botbuilder';

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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public static deviceHasAudioPlayer(context: TurnContext): boolean {
        return false;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public static sendPermissionConsentRequestActivity(context: TurnContext, message: string, permissions: string[]): boolean {
        return false;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public static getSessionAttributes(context: TurnContext): boolean {
        return false;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public static setRepromptSpeech(context: TurnContext, message: string): void {

    }

}
