import React from "react";
import SearchBar from "./SearchBar";
import Youtube from "../apis/Youtube";
import Youtube2 from "../apis/Youtube2";

class App extends React.Component {
  state = { videos: [] };

  onTermSubmit = async (term) => {
    const response = await Youtube.get("/search", {
      params: {
        q: term,
        part: "snippet",
        maxResults: 50,
        type: "video",
        key: Youtube2,
      },
    });
    console.log(response.data.items);
    this.setState({ videos: response.data.items });
  };

  ifVideos() {
    if (this.state.videos.length) {
      return <div>I have found {this.state.videos.length} videos</div>;
    } else {
      return <div>Search for a video...</div>;
    }
  }

  render() {
    return (
      <div className="ui container">
        <SearchBar onTermSubmit={this.onTermSubmit} />
        {this.ifVideos()}
      </div>
    );
  }
}

export default App;
