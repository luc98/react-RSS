import React, { useState } from "react";
import Moment from 'moment';

export default function App() {
  const [rssUrl, setRssUrl] = useState("");
  const [items, setItems] = useState([]);
  const [show, setShow] = useState(null);

  const getRss = async (e) => {
    e.preventDefault();
    setItems([]);
    const urlRegex = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
    if (!urlRegex.test(rssUrl)) {
      return;
    }
    const res = await fetch(`https://api.allorigins.win/get?url=${rssUrl}`);
    const { contents } = await res.json();
    const feed = new window.DOMParser().parseFromString(contents, "text/xml");
    const items = feed.querySelectorAll("item");
    const feedItems = [...items].map((el) => ({
      title: el.querySelector("title").innerHTML,
      link: el.querySelector("link").innerHTML,
      pubDate: el.querySelector("pubDate").innerHTML,
      category:el.querySelector("category").innerHTML,

    }));
    setItems(feedItems);
  //  console.log(items);
  };

  const getschedule = async(e)=> {
    e.preventDefault();
    const urlRegex = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
    if (!urlRegex.test(rssUrl)) {
      return;
    }
    const urlprueba ="https://subsplease.org/api/?f=schedule&tz=America/Argentina/Buenos_Aires";
    //`https://api.allorigins.win/get?url=${rssUrl}`
    const res = await fetch(urlprueba);
    const data = await res.json();
  
  }

  const getShow= async(e) =>{
    //https://subsplease.org/shows/
    e.preventDefault();
    const urlRegex = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
    if (!urlRegex.test(rssUrl)) {
      return;
    }
    const urlprueba ="https://subsplease.org/shows/";
    //`https://api.allorigins.win/get?url=${rssUrl}`
    const res = await fetch(urlprueba);
    //const data = await res.json();
   
    setShow(res);

  }
  const formatDateSub =(date)=>{
   // const formatDate = Moment().format(date);
    //console.log(formatDate);
    const event = new Date(date);
    const formatDate =Moment(date).format("Do MMMM  h:mm a");
  //  const formatDate =event.toLocaleDateString('en-US');
    return formatDate;
  }

  return (
    <div className="App">
      <form onSubmit={getRss}>
        <div>
          <label> rss url</label>
          <br />
          <input placeholder="url" className="form-control"  onChange={(e) => setRssUrl(e.target.value)} value={rssUrl} />
        </div>
        <input type="submit" className="btn btn-primary" />
      </form>
      {items.length==0? "-0":items.length}
      {items.map((item,i) => {
        return (
       
          <div className="container text-center" key={i}>
            
              <div className="row">
                  <div className="col-2">
              
                  </div>
              </div>
              <div className="card" style={{maxWidth:"50%"}}>

                <div className="card-body">
                        <h3>{item.title}</h3>
                        <p>{ formatDateSub(item.pubDate)}</p>
                        <a href={item.link}>{item.link}</a>
                        <span> {item.category} </span>
                </div>
              </div>
            </div>
        );
      })}
            {show? (show):(<p>nop</p>)}
    

    </div>
  );
}
