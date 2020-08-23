import axios, { AxiosRequestConfig } from 'axios';

const BASE_URL = "https://hacker-news.firebaseio.com/v0";
const JSON_QUERY = ".json?print=pretty";

class HNClient {  
  client = axios.create({
   baseURL: BASE_URL, 
  } as AxiosRequestConfig);
  construcor() {}

  topStories = async () => this.client.get(`/topstories${JSON_QUERY}`)
  storyByID = async (id: string) => this.client.get(`/item/${id}${JSON_QUERY}`)
}

export default HNClient;