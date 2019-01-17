import { ZObject, Bundle, HttpResponse } from "zapier-platform-core";
import * as moment from 'moment';

import Constants from "../constants";
import { Holiday } from "../models/holiday";

const listHolidays = async (z: ZObject, bundle: Bundle) => {
    let holidays: Holiday[] = [];
    z.console.log('querying holidays, inputData: ', z.JSON.stringify(bundle.inputData));
    const date: moment.Moment = moment(bundle.inputData.date);
    const response: HttpResponse = await z.request(`${Constants.API_BASE}/holidays`, {
        method: 'GET',
        params: {
            country: 'US',
            year: date.year()
        }
    });

    if (response.json) {
        let apiResponse: any = response.json;
        holidays = apiResponse.holidays;
    }

    return holidays;
};

const Holiday = {
    key: 'holiday',
    noun: 'Holiday',
    list: {
        display: {
            label: 'List of Holidays',
            description: 'This is a hidden trigger',
            hidden: true
        },
        operation: {
            inputFields: [
                {
                    key: 'input_date',
                    required: true
                }
            ],
            perform: listHolidays
        }
    }
};

export default Holiday;