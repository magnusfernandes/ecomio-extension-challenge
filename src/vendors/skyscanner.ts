import moment from 'moment';
import { Trip } from '../models';

export const loadSkyscannerExt = (): Trip[] => {
  let urlParams = window.location.pathname.split('/').filter((item) => (item.length ? item : null));
  if (!validateParams(urlParams)) {
    return [];
  }
  return buildPayload(urlParams);
};

const buildPayload = (params: string[]): Trip[] => {
  let payload: Trip = new Trip({
    vendor: 2,
    origin: params[2],
    destination: params[3],
    start: moment(params[4], 'YYMMDD').format('YYYY-MM-DD'),
  });
  if (params.length > 5) {
    payload.end = moment(params[5], 'YYMMDD').format('YYYY-MM-DD');
  }

  return [payload];
};

const validateParams = (params: string[]): boolean => {
  if (params.length < 5) {
    return false;
  }
  let origin = params[2];
  let destination = params[3];
  let startDate = moment(params[4], 'YYMMDD');

  let result = params.slice(0, 2).includes('transport') && params.slice(0, 2).includes('flights');

  result =
    result &&
    2 < origin.length &&
    origin.length < 5 &&
    2 < destination.length &&
    destination.length < 5 &&
    startDate.isValid();

  if (params.length > 5) {
    let endDate = moment(params[5], 'YYMMDD');
    return result && endDate.isValid();
  }

  return result;
};
