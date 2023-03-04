import { loadSkyscannerExt, loadKayakExt } from './vendors';
import { Trip } from './models';
import { fetchSustainabilityScore } from './helpers';
import DOMElement from './DOMElement';

let currentVendor = 1;

const getTrips = (): Trip[] => {
  if (window.location.hostname.includes('skyscanner')) {
    currentVendor = 1;
    return loadSkyscannerExt();
  } else if (window.location.hostname.includes('kayak')) {
    currentVendor = 2;
    return loadKayakExt();
  }
  return [];
};

const fetchScores = async (trips: Trip[]) => {
  if (trips.length) {
    let response = await fetchSustainabilityScore(trips);
    let scoredTrips: Trip[] = [];
    if (response && response.length) {
      response.map((item: any) => scoredTrips.push(new Trip(item)));
    }
    showScores(scoredTrips);
  }
};

const getFormDiv = (): HTMLElement | null => {
  if (currentVendor === 1) {
    return document.getElementById('flights-search-summary-root');
  } else {
    let wrappers = document.getElementsByClassName('header-wrapper');
    if (wrappers.length) return wrappers[0] as HTMLElement;
  }
  return null;
};

const showScores = (trips: Trip[]) => {
  let formElement = getFormDiv();
  if (formElement == null) {
    return;
  }

  trips.map((trip) => {
    if (formElement) {
      let wrapperElement = new DOMElement(formElement, ['ecomio-wrapper']);

      let ecomioLogo = document.createElement('img');
      ecomioLogo.src = 'https://ecomio.com/wp-content/uploads/eco.mio_RGB_white_small.png';
      let locationsElement = new DOMElement(
        wrapperElement.element,
        ['location'],
        `${trip.origin} - ${trip.destination}`,
      );
      locationsElement.appendToDom();
      let scoreClasses = ['score'];
      if (trip.sustainabilityScore < 40) {
        scoreClasses.push('danger');
      }
      let scoreElement = new DOMElement(wrapperElement.element, scoreClasses, [
        'Sustainability score',
        `${trip.sustainabilityScore} out of 100`,
      ]);
      scoreElement.appendToDom();

      wrapperElement.addElementsToDom([ecomioLogo, locationsElement.element, scoreElement.element]);
    }
  });
};

(() => {
  let trips = getTrips();
  fetchScores(trips);
})();
