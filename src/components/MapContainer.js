import React from 'react';
import {
  toLatLon, toLatitudeLongitude, headingDistanceTo, moveTo, insidePolygon
} from 'geolocation-utils'

import { useContext } from 'react';
import { MyContext } from './../App';

const MapContainer = () => {

  const [to, setTo, from, setFrom, km, setKm] = useContext(MyContext);


  // calculate the distance between locations, move to a new location
  // console.log("distance is",headingDistanceTo(location1, location2)) 
  let location1 ;
  let location2 ;
  if (Object.keys(to).length && Object.keys(from).length) {
    location1 = to
    location2 = from
  }
  else {
    console.log("error");
  }

  // console.log("distance is",headingDistanceTo(location1, location2)) 
  if (Object.keys(to).length && Object.keys(from).length) {
    setKm(headingDistanceTo(location1, location2))
  }
  else {
    console.log("error");
  }
  // // { 
  // //   heading: 32.182377166258156,  // degrees
  // //   distance: 131.52837683622332  // meters
  // // }
  // console.log(moveTo(location1, {heading: 32.1, distance: 131.5}))
  // // {
  // //   lat: 51.00100069207888,
  // //   lon: 4.000997477543457,
  // // }

  // // check whether a location is inside a circle, bounding box, or polygon
  // const polygon = [
  //   [4.03146, 51.9644],
  //   [4.03151, 51.9643],
  //   [4.03048, 51.9627],
  //   [4.04550, 51.9600],
  //   [4.05279, 51.9605],
  //   [4.05215, 51.9619],
  //   [4.04528, 51.9614],
  //   [4.03146, 51.9644]
  // ]
  // console.log(insidePolygon([4.03324, 51.9632], polygon)) // true

  // // and much more: 
  // // - calculate bounding boxes around a list of locations,
  // // - calculate the closest point of approach of two moving objects, 
  // // - etc...
  return (
    <div>

    </div>
  );
};

export default MapContainer;