// // main.js
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
// import ReactGoogleMaps from "react-googlemaps"
// var GoogleMapsAPI = window.google.maps;
// var Map = ReactGoogleMaps.Map;
// var OverlayView = ReactGoogleMaps.OverlayView;
// var LatLng = GoogleMapsAPI.LatLng;

// console.log(GoogleMapsAPI)
// console.log(ReactGoogleMaps)
  
// var GoogleMapOverlayViewSimple = React.createClass({
//   getInitialState: function() {
//     return {
//       center: new LatLng(-41.28646, 174.77623),
//       count: 0
//     };
//   },

//   render: function() {
//     return (
//       <Map
//         initialZoom={15}
//         initialCenter={this.state.center}
//         width={700}
//         height={700}>

//         <OverlayView
//           mapPane="floatPane"
//           style={{padding: 15, backgroundColor: '#fff', border: '1px solid #000'}}
//           position={this.state.center}>
//           <h1>Simple overlay!</h1>
//           <button
//             onClick={this.handleButtonClick}>
//             I have been clicked {this.state.count} time{this.state.count === 1 ? '' : 's'}
//           </button>
//         </OverlayView>
//       </Map>
//       );
//   },

//   handleButtonClick: function() {
//     this.setState({
//       count: this.state.count + 1
//     });
//   }
// });
  
    var stooge = {
           "first-name": "Mansur",
           "last-name": "Dehpoor"
       };

    var car = {
        brand : "Porsche",
            specs: {
            model : "911",
            power : "540pk"
        }
    };

if (typeof Object.create !== 'function') {  // hier wordt een nieuwe stoogenaam gemaakt met behulp van het prototype
     Object.create = function (o) {
     var F = function () {};
     F.prototype = o;
     return new F();
     };
    Reflection | 23
}
var another_stooge = Object.create(stooge);
stooge.profession = 'actor'; // de niewe stooge heet actor


var CommentBox = React.createClass({

    render: function() {
        return (
          <div className="commentBox">
            Hello, world! I am a CommentBox. 
            {car.specs.model}
            {another_stooge.profession}
          </div>          
        );
    }
})

var App = React.createClass({
    render: function() {
        return (
                //<GoogleMapOverlayViewSimple />
                <CommentBox />   
            );
        }
})


 ReactDOM.render( <App />, document.getElementById("responder-tool"));
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

