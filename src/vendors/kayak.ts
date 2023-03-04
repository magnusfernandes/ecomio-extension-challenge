import moment from 'moment';
import { Trip } from '../models';

export const loadKayakExt = (): Trip[] => {
  let urlParams = window.location.pathname.split('/').filter((item) => (item.length ? item : null));
  if (!validateParams(urlParams)) {
    return [];
  }
  return buildPayload(urlParams);
};

const buildPayload = (params: string[]): Trip[] => {
  let locations = params[1].split('-');
  let origins = locations[0].split(',');
  let destinations = locations[1].split(',');

  let payload: Trip[] = [];

  origins.map((ori) => {
    destinations.map((dest) => {
      let obj: Trip = new Trip({
        vendor: 1,
        origin: ori,
        destination: dest,
        start: moment(params[2], 'YYYY-MM-DD').format('YYYY-MM-DD'),
      });
      if (params.length > 3) {
        obj.end = moment(params[3], 'YYYY-MM-DD').format('YYYY-MM-DD');
      }
      payload.push(obj);
    });
  });
  return payload;
};

const validateParams = (params: string[]): boolean => {
  if (params.length < 3) {
    return false;
  }
  let locations = params[1].split('-');
  let startDate = moment(params[2], 'YYYY-MM-DD');

  if (locations.length < 2) {
    return false;
  }

  let result = params[0] === 'flights';

  result = result && startDate.isValid();

  if (params.length > 3) {
    let endDate = moment(params[3], 'YYYY-MM-DD');
    return result && endDate.isValid();
  }

  return result;
};
