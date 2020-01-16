export enum AlexaActivityTypes {
    LaunchRequest = 'LaunchRequest',
    SessionEndedRequest = 'SessionEndedRequest',
    IntentRequest = 'IntentRequest'
}


//TODO Or parse Oauth card to LinkAccount
// https://developer.amazon.com/en-US/docs/alexa/account-linking/account-linking-for-custom-skills.html
// export interface LinkAccountCard {

// }

//https://developer.amazon.com/docs/custom-skills/include-a-card-in-your-skills-response.html


// TODO Import from Alexa models
export interface SimpleCard {
    /** Maximum xx characters */
    title: string;
    content: string;
}

//TODO or parse HeroCard to StandardCard
export interface StandardCard {
    /** Maximum xx characters */
    title: string;
    content: string;
    text: string;
    image?: string | AlexaCardImages;
}

export interface AlexaCardImages {
    smallImageUrl: string;
    largeImageUrl: string;
}
