import React, { Component } from "react";
import Header from "../header";
import ErrorBoundry from "../error-boundry";
import RandomPlanet from "../random-planet";
import { PeoplePage, PlantesPage, StarshipsPage } from "../pages";

import { SwapiServiceProvider } from "../swapi-service-context";
import SwapiService from "../../services/swapi-service";
import DummySwapiService from "../../services/dummy-swapi-service";

import "./app.css";

export default class App extends Component {
  state = {
    swapiService: new SwapiService()
  };

  onServiceChange = () => {
    this.setState(({ swapiService }) => {
      const Service =
        swapiService instanceof SwapiService ? DummySwapiService : SwapiService;
      return { swapiService: new Service() };
    });
  };

  render() {
    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <div className="stardb-app">
            <Header onServiceChange={this.onServiceChange} />
            <RandomPlanet updatePlanetInterval={undefined} />
            <PeoplePage />
            <PlantesPage />
            <StarshipsPage />
          </div>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
