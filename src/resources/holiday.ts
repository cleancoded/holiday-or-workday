import { ZObject, Bundle, HttpResponse } from "zapier-platform-core";
import Utilities from "../utilities";
import Constants from "../constants";
import moment = require("moment");
import { Holiday } from "../models/holiday";

/*
    Validate and clean holiday list input
    Is today a static date within the holiday list?
    Fetch holidays for date input
    Is there a US holiday today?
        If yes
            Is the holiday in our holiday list?
                If yes, return true
                If no, return false
*/
const isDateHoliday = async (z: ZObject, bundle: Bundle | any) => {
    let isHoliday = false;

    if (Utilities.ValidateHolidayList(bundle)) {
        if (Utilities.IsDateInHolidayList(bundle)) {
            isHoliday = true;
        }
        else {
            let holidaysOnDate: Holiday[] = await queryHolidays(z, bundle);

            if (holidaysOnDate.length > 0) {
                isHoliday = isApiHolidayInList(holidaysOnDate, bundle);
            }
        }
    }

    return { is_holiday: isHoliday };
};

const queryHolidays = async (z: ZObject, bundle: Bundle) => {
    let holidays: Holiday[] = [];
    const date: moment.Moment = moment(bundle.inputData.date);
    const response: HttpResponse = await z.request(`${Constants.API_BASE}/holidays`, {
        method: 'GET',
        params: {
            country: 'US',
            year: date.year(),
            month: date.month() + 1,
            day: date.date()
        }
    });

    if (response.json) {
        let apiResponse: any = response.json;
        holidays = apiResponse.holidays;
    }

    return holidays;
};

const isApiHolidayInList = (apiHolidays: Holiday[], bundle: Bundle): boolean => {
    let isHolidayInList = false;

    const inputHolidayList: string[] = bundle.inputData.holiday_list;

    apiHolidays.forEach((apiHoliday: Holiday) => {
        const foundHolidayIndex = inputHolidayList.findIndex((holiday: string): boolean => {
            return apiHoliday.name === holiday;
        });

        if (foundHolidayIndex > -1) {
            isHolidayInList = true;
        }
    });

    return isHolidayInList;
};

const Holiday = {
    key: 'holiday',
    noun: 'Holiday',
    display: {
        label: 'US Holiday',
        description: 'Determines if a given day is a US holiday from the list provided'
    },

    operation: {
        inputFields: [
            {
                key: 'date',
                label: 'Date',
                required: true,
                type: 'datetime',
                helpText: 'The date we are checking'
            },
            {
                key: 'holiday_list',
                label: 'Holiday List',
                required: true,
                list: true,
                type: 'text',
                helpText: 'The holiday name (Easter) or a static date (12/25)'
            }
        ],
        perform: isDateHoliday,
        outputFields: [
            {
                key: 'is_holiday',
                label: 'The date provided is a holiday',
                type: 'boolean'
            }
        ]
    }
};

export default Holiday;