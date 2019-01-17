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
    let holidayName: string = '';

    if (Utilities.ValidateHolidayList(bundle)) {
        if (Utilities.IsDateInHolidayList(bundle)) {
            isHoliday = true;
        }
        else {
            let holidaysOnDate: Holiday[] = await queryHolidays(z, bundle);

            if (holidaysOnDate.length > 0) {
                let isHolidayResult: any = isApiHolidayInList(holidaysOnDate, bundle);

                if (isHolidayResult.found) {
                    isHoliday = true;
                    holidayName = isHolidayResult.name;
                }
            }
        }
    }

    return { 
        is_holiday: isHoliday,
        holiday_name: holidayName
     };
};

const queryHolidays = async (z: ZObject, bundle: Bundle) => {
    let holidays: Holiday[] = [];
    const date: moment.Moment = moment(bundle.inputData.input_date);
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

const isApiHolidayInList = (apiHolidays: Holiday[], bundle: Bundle): any => {
    let isHolidayInList = {
        found: false,
        name: ''
    };

    const inputHolidayList: string[] = bundle.inputData.holiday_list;

    apiHolidays.forEach((apiHoliday: Holiday) => {
        const foundHolidayIndex = inputHolidayList.findIndex((holiday: string): boolean => {
            return apiHoliday.name === holiday;
        });

        if (foundHolidayIndex > -1) {
            isHolidayInList.found = true;
            isHolidayInList.name = apiHoliday.name;
        }
    });

    return isHolidayInList;
};

const IsHoliday = {
    key: 'is_holiday',
    noun: 'Is Holiday',
    display: {
        label: 'US Holiday',
        description: 'Determines if a given day is a US holiday from the list provided'
    },

    operation: {
        inputFields: [
            {
                key: 'input_date',
                label: 'Date',
                required: true,
                type: 'datetime',
                helpText: 'The date we are checking',
                altersDynamicFields: true
            },
            {
                key: 'holiday_list',
                label: 'Holiday List',
                required: true,
                dynamic: 'holiday.id.name',
                list: true,
                helpText: 'The holiday name (Easter) or a static date (12/25). One holiday per line'
            }
        ],
        perform: isDateHoliday,
        outputFields: [
            {
                key: 'is_holiday',
                label: 'The date provided is a holiday',
                type: 'boolean'
            },
            {
                key: 'holiday_name',
                label: 'Holiday name',
                type: 'string'
            }
        ]
    }
};

export default IsHoliday;