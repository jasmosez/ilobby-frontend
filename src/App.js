import React from 'react';
// import logo from './logo.svg';
import './App.css';
import WelcomeContainer from './Containers/WelcomeContainer'
import LoggedInContainer from './Containers/LoggedInContainer'
import { connect } from 'react-redux'

// Move all this to LoggedInContainer
// const legislatorsEndpoint = `${process.env.REACT_APP_ILOBBY_API}/legislators`
// const committeesEndpoint = `${process.env.REACT_APP_ILOBBY_API}/committees`
// const userDataEndpoint = `${process.env.REACT_APP_ILOBBY_API}/users`

class App extends React.Component {
  
  componentDidMount() {
    
  }

  testForLogin = () => {
    const token = localStorage.token;

    if (this.props.currentUser) {
      console.log("(A) we've got a current user")
      return <LoggedInContainer />
    } else {
      if (token && token !== "undefined") {
        console.log("(B) No current user, but we've got a token! Testing its validity. Token:", token)
        return this.checkAutoLogin(token)
      } else {
        
        console.log("(C) No current user & no token")
        return <WelcomeContainer />
      }
    }
  }

  checkAutoLogin = token => {
    fetch("http://localhost:3000/auto_login", {
      headers: {
        Authorization: token
      }
    })
      .then(resp => resp.json())
      .then(json => {
        if (json.errors) {
          console.log("Autologin Error")
          alert(json.errors);
          return <WelcomeContainer />

        } else {
          console.log("Autologin Success", json)
          this.props.setUser(json)
          return <LoggedInContainer />

        }
      });
  };

      
  render() {

    // if we are not logged in, render the WelcomeContainer
    // otherwise, render LoggedInContainer
    return (
      <div>
        {/* {this.props.currentUser ? <LoggedInContainer /> : <WelcomeContainer /> } */}
        { this.testForLogin() }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    // campaigns: state.campaigns,
    // actions: state.actions,
    // callLists: state.callLists,
    // calls: state.calls
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // storeLegislators: (data) => {
    //   dispatch({ type: "STORE_LEGISLATORS", payload: data })
    // },
    // storeCommittees: (data) => {
    //   dispatch({ type: "STORE_COMMITTEES", payload: data })
    // },
    // storeUserData: (data) => {
    //   dispatch({ type: "STORE_USER_DATA", payload: data })
    // },
    setUser: (json) => {
      console.log("App called setUser")
      dispatch({ type: "SET_USER", payload: json })
    },
    // userDataLoaded: () => {
    //   console.log("User Data Loaded")
    //   dispatch({ type: "USER_DATA_LOADED" })
    // },
    // legislatorDataLoaded: () => {
    //   console.log("Legislator Data Loaded")
    //   dispatch({ type: "LEGISLATOR_DATA_LOADED" })
    // },
    // committeeDataLoaded: () => {
    //   console.log("Committee Data Loaded")
    //   dispatch({ type: "COMMITTEE_DATA_LOADED" })
    // }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);


// CODE FOR TRANSFORMING GeoJSON data into format usable by Google Maps API
// 
// let TestFileHelped = TestFile.features.map(feature => {
//   let coordinatesArray = feature.geometry.coordinates.map(
//     polygon => {
//       let latLongArray = polygon.map(pair => {
//         return {
//           lat: pair[0],
//           lng: pair[1]
//         };
//       });
//       return latLongArray;
//     }
//   );
//   // console.log("coordinatesArray", coordinatesArray);
//   // console.log("feature", feature);
//   let returnItem = {
//     ...feature,
//     geometry: {
//       ...feature.geometry,
//       coordinates: coordinatesArray
//     }
//   };
//   return returnItem;
// });
