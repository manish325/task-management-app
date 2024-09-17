import axios, {AxiosInstance} from 'axios'
import { EXTERNAL_API } from '../../../constants/api';

export class Axios {
    private axiosInstance : AxiosInstance | null = null;
    constructor() {
        this.axiosInstance = axios.create({
            baseURL : process.env.VITE_APP_API_URL
        });
        console.log('Logging the base url : ', process.env.VITE_APP_API_URL)
    }

    getAxiosInstance() : AxiosInstance | null {
        console.log(this.axiosInstance?.getUri());
        return this.axiosInstance;
    }
    async getUserDetailsFromGoogle(token : string) {
        const constructedUrl = `${EXTERNAL_API.GOOGLE_OAUTH}?access_token=${token}`;
        console.log('constructedUrl : ', constructedUrl);
        return await (this.axiosInstance as AxiosInstance).get(constructedUrl);
    }
}

export const axiosService = new Axios();