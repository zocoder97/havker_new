import axios from "axios";


const HACKER_NEWS_API="https://hacker-news.firebaseio.com/v0";

export const getTopStories=async()=>{
    const {data}=await axios.get(`${HACKER_NEWS_API}/topstories.json`);
    //console.log(data);
    const stories = await Promise.all(
        data.slice(0,90).map(async (id:number)=>{
            const story=await axios.get(`${HACKER_NEWS_API}/item/${id}.json`);
            return story.data;
        })
    )
    //console.log(stories);
    return stories;
    
}