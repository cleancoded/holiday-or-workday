import { ZObject, Bundle } from "zapier-platform-core";

const validateHolidayList = (bundle: Bundle | any, z?: ZObject): boolean => {
    let result = false;
    const holidayList: string[] = bundle.inputData.holiday_list || [];
    const holidayNameRegExp = new RegExp('^[\w|\s]+$');
    const dateRegExp = new RegExp('^[0-9]{1,2}\/[0-9]{1,2}$');

    if (holidayList.length > 0) {
        for (let holiday of holidayList) {
            const dateMatches = holiday.match(dateRegExp);

            if (dateMatches) {
                result = true;
            }
            else {
                const errorMessage = buildValidationErrorMessage(holiday);
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

const Utilities = {
    ValidateHolidayList: validateHolidayList
};

export default Utilities;