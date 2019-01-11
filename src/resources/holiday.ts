import { ZObject, Bundle } from "zapier-platform-core";

/*
    Validate holiday list input
    Is today a static date within the holiday list?
    Fetch holidays for date input
    Is there a US holiday today?
        If yes
            Is the holiday in our holiday list?
                If yes, return true
                If no, return false
*/
const queryHolidays = async (z: ZObject, bundle: Bundle) => {
    z.console.log(`inputData: ${JSON.stringify(bundle.inputData)}`);

    return {}
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
        perform: queryHolidays,
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