import axios from 'axios'
let channel_id = [];
let data = [];
let dataCH = [];
let result = [];
let token = [];
let totalResults = [];
let totalPages = [];
let i = 0;

let params = {
  key: "AIzaSyCuvdW20d-RmXR1frQViK4-4UVkG435bdY",
  part: "snippet",
  chart: "mostPopular",
  regionCode: "TH",
  maxResults: 50,
  pageToken: "",
}

async function get_channelId() {
  console.log("start getting channel id");
  console.log("************************");
  await axios.get('https://www.googleapis.com/youtube/v3/videos', { params }).then(res => {
    data = res.data.items
    // console.log(data);
    data.forEach(element => {
      // console.log(element.snippet.channelId);
      channel_id.push(element.snippet.channelId);
    });

    result = res.data

  });
  totalResults = result.pageInfo.totalResults
  totalPages = Math.ceil(totalResults / 50);

  /**console.log(totalResults);
  console.log(totalPages);*/

  token = result.nextPageToken
  while (i < totalPages) {
    // console.log(token);
    params["pageToken"] = token
    await axios.get('https://www.googleapis.com/youtube/v3/videos', { params }).then(res => {
      token = res.data.nextPageToken
      data = res.data.items
      // console.log(data);
      data.forEach(element => {
        channel_id.push(element.snippet.channelId);
      });
    });
    i++;
  }
  console.log(channel_id);
  console.log("get channel id end");
  console.log("************************");
}

async function check_sub() {
  console.log("start checking sub");
  console.log("************************");

  // forEach id and then get api 

  channel_id.forEach(async element => {
    await axios.get('https://www.googleapis.com/youtube/v3/channels', {
      params: {
        key: "AIzaSyCuvdW20d-RmXR1frQViK4-4UVkG435bdY",
        part: "snippet,statistics",
        id: element
      }
    }).then(res => {
      dataCH.push(
        {
          Channel_id: element,
          Channel_name: res.data.items[0].snippet.title,
          Sub_count: !res.data.items[0].statistics.hiddenSubscriberCount ? res.data.items[0].statistics.subscriberCount : 0
        })
    });
    console.log(dataCH);
  })
  
}

function Steps() {
  Promise.resolve(get_channelId()).then(x => {
    return check_sub();
  })
}

Steps();