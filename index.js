import axios from 'axios'
let channel_id = [];
let data = [];
let result = [];
let token = [];
let totalResults = [];
let totalPages = [];
let i = 0;

let params = {
  key: "AIzaSyBmXhsqA45sjMjcpii3d_YXJ7JcOZ6q1ko",
  part: "snippet",
  chart: "mostPopular",
  regionCode: "TH",
  maxResults: 50,
  pageToken: ""
}



async function get_channelId() {
  await axios.get('https://www.googleapis.com/youtube/v3/videos', { params }).then( res => {
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

  console.log(totalResults);
  console.log(totalPages);

  token = result.nextPageToken
  while (i < totalPages) {
    console.log(token);
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
}


get_channelId();
