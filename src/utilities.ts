import { Bundle } from "zapier-platform-core";
import * as moment from 'moment';

const holidayNameRegExp = new RegExp('^[a-zA-Z0-9]+[\\s\\w\',.]*$');
const dateRegExp = new RegExp('^[0-9]{1,2}\/[0-9]{1,2}$');

const cleanHolidayList = (holidayList: string[]): string[] => {
    for (let i = 0; i < holidayList.length; i++) {
        holidayList[i] = holidayList[i].trim();

        if (holidayList[i].match(dateRegExp)) {
            holidayList[i] = formatStaticHoliday(holidayList[i]);
        }
    }

    return holidayList;
};

const formatStaticHoliday = (staticHoliday: string): string => {
    const date = moment(staticHoliday, ['MM/DD', 'M/D']);

    return date.format('MM/DD');
};

const isDateInHolidayList = (bundle: Bundle | any): boolean => {
    let result = false;
    const inputDate: moment.Moment = moment(bundle.inputData.input_date);
    const formattedDate: string = inputDate.format('MM/DD');
    const holidayList: string[] = bundle.inputData.holiday_list || [];
    const staticHolidays: string[] = holidayList.filter(filterNamedHolidays);

    if (staticHolidays.length > 0) {
        const index = staticHolidays.findIndex((holiday: string): boolean => {
            return holiday === formattedDate;
        });

        if (index > -1) {
            result = true;
        }
    }

    return result;
};

const validateHolidayList = (bundle: Bundle | any): boolean => {
    let result = false;
    const holidayList: string[] = bundle.inputData.holiday_list || [];
    const cleanedHolidayList: string[] = cleanHolidayList(holidayList);

    if (cleanedHolidayList.length > 0) {
        for (let holiday of cleanedHolidayList) {
            const trimmedHoliday = holiday.trim();
            const dateMatches = trimmedHoliday.match(dateRegExp);
            const nameMatches = trimmedHoliday.match(holidayNameRegExp);

            if (dateMatches || nameMatches) {
                result = true;
            }
            else {
                const errorMessage = buildValidationErrorMessage(trimmedHoliday);
                throw new Error(errorMessage);
            }
        }
    }

    return result;
};

const buildValidationErrorMessage = (badHoliday: string): string => {
    return `We were unable to validate the provide list of holidays.
    There was a problem with the line: ${badHoliday}.
    Make sure the holdays look like this:
        * Christmas
        * New Year's
        * 05/05
        * 5/5`;
};

const filterNamedHolidays = (holiday: string): boolean => {
    if (holiday.match(dateRegExp)) {
        return true;
    }
    
    return false;
};

const Utilities = {
    CleanHolidayList: cleanHolidayList,
    IsDateInHolidayList: isDateInHolidayList,
    ValidateHolidayList: validateHolidayList
};

export default Utilities;