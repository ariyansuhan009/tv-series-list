import React, { Component } from "react";
import SeriesList from "../../components/SeriesList";
import Loader from "../../components/Loader";
import Intro from "../../components/Intro";


class Series extends Component {
     state = {
          series: [],
          seriesName: '',
          isFetching: false
     }
     

     onSeriesInputChange = (data) => {
          this.setState({ seriesName: data.target.value, isFetching: true });

          fetch(`http://api.tvmaze.com/search/shows?q=${data.target.value}`)
            .then((res) => res.json())
               .then(json => this.setState({ series: json, isFetching: false}));
     }

     render() {
          const { series, seriesName, isFetching } = this.state;
          return (
               <div>
                    <Intro message="Here you can find all your most popular TV series" />
                    <div>
                         <input
                              value={seriesName}
                              type="text"
                              onChange={this.onSeriesInputChange} />
                    </div>
                    {
                         !isFetching && series.length === 0 && seriesName.trim() === ''
                         && 
                         <p>Please Enter a series name into the input</p>
                    }
                    {
                         !isFetching && series.length === 0 && seriesName.trim() !== ''
                         && 
                         <p>No TV series have been found with this name.</p>
                    }
                    {
                         isFetching && <Loader />
                    }
                    {
                         !isFetching && <SeriesList list={this.state.series} />
                    }
                    
               </div>
               
          )
     }
}

export default  Series;