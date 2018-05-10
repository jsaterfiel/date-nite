import React from "react";
import Config from "../config";
import GoogleMapLoader from "./GoogleMapsLoader";
import GoogleMap from "./GoogleMap";

export default () => {
  return (
    <div>
      <GoogleMapLoader
        params={{
          key: Config.GoogleConfig.API_KEY,
          libraries: "places,geometry"
        }}
        render={(googleMaps, error) =>
          googleMaps ? (
            <div style={{ height: "300px" }}>
              {error && error}
              <GoogleMap
                googleMaps={googleMaps}
                coordinates={[
                  {
                    title: "Toulouse",
                    position: {
                      lat: 43.604363,
                      lng: 1.443363
                    },
                    onLoaded: (googleMaps, map, marker) => {
                      // Set Marker animation
                      marker.setAnimation(googleMaps.Animation.BOUNCE);

                      // Define Marker InfoWindow
                      const infoWindow = new googleMaps.InfoWindow({
                        content: `
                          <div>
                            <h3>Toulouse<h3>
                            <div>
                              Toulouse is the capital city of the southwestern
                              French department of Haute-Garonne,
                              as well as of the Occitanie region.
                            </div>
                          </div>
                        `
                      });

                      // Open InfoWindow when Marker will be clicked
                      googleMaps.event.addListener(marker, "click", () => {
                        infoWindow.open(map, marker);
                      });

                      // // Change icon when Marker will be hovered
                      // googleMaps.event.addListener(marker, "mouseover", () => {
                      //   marker.setIcon(iconMarkerHover);
                      // });

                      // googleMaps.event.addListener(marker, "mouseout", () => {
                      //   marker.setIcon(iconMarker);
                      // });

                      // Open InfoWindow directly
                      infoWindow.open(map, marker);
                    }
                  }
                ]}
                center={{ lat: 43.604363, lng: 1.443363 }}
                zoom={8}
              />
            </div>
          ) : (
            <div>
              {error === "Network Error" ? <p>{error}</p> : <p>isLoading...</p>}
            </div>
          )
        }
      />
    </div>
  );
};
