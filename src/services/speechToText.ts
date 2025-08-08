import SpeechToTextV1 from "ibm-watson/speech-to-text/v1";
import { IamAuthenticator } from "ibm-watson/auth";

const apiKey: string = process.env.SPEECH2TEXT_API_KEY ?? "";
const serviceUrl: string = process.env.SPEECH2TEXT_SERVICE_URL ?? "";

const authenticator = new IamAuthenticator({
  apikey: apiKey
});
const speechToText = new SpeechToTextV1({
  authenticator: authenticator,
  serviceUrl: serviceUrl,
})

export default speechToText;
