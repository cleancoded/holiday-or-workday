import { Bundle } from 'zapier-platform-core';
import * as should from 'should';
import * as moment from 'moment';

import Utilities from '../utilities';

describe('Utilities', () => {
    describe('ValidateHolidayList', () => {
        it('should return false given empty holiday list', () => {
            const holidayList: string[] = [];
            const bundle = {
                inputData: {
                    holiday_list: holidayList
                }
            };

            const isHoliday = Utilities.ValidateHolidayList(bundle);

            should(isHoliday).be.false();
        });
        
        it('should throw expected error given holiday list with an email address', () => {
            const email = 'skybox@trioptimum.com';
            const holidayList: string[] = [
                email
            ];
            const bundle = {
                inputData: {
                    holiday_list: holidayList
                }
            };

            should(() => Utilities.ValidateHolidayList(bundle))
                .throw(/skybox@trioptimum.com/);
        });
        
        it('should throw expected error given mixed holiday list with an email address', () => {
            const email = 'skybox@trioptimum.com';
            const holidayList: string[] = [
                '12/25',
                email
            ];
            const bundle = {
                inputData: {
                    holiday_list: holidayList
                }
            };

            should(() => Utilities.ValidateHolidayList(bundle))
                .throw(/skybox@trioptimum.com/);
        });
        
        it('should throw error with expected message given holiday list with nonsense', () => {
            const nonsenseHoliday = 'sf/!1';
            const holidayList: string[] = [
                nonsenseHoliday
            ];
            const bundle = {
                inputData: {
                    holiday_list: holidayList
                }
            };

            should(() => Utilities.ValidateHolidayList(bundle))
                .throw(/sf\/!1/);
        });

        it('should return true given list with date of the form DD/MM', () => {
            const holidayList: string[] = [
                '12/25'
            ];
            const bundle = {
                inputData: {
                    holiday_list: holidayList
                }
            };

            const isHoliday = Utilities.ValidateHolidayList(bundle);

            should(isHoliday).be.true();
        });

        it('should return true given list with date of the form D/MM', () => {
            const holidayList: string[] = [
                '1/25'
            ];
            const bundle = {
                inputData: {
                    holiday_list: holidayList
                }
            };

            const isHoliday = Utilities.ValidateHolidayList(bundle);

            should(isHoliday).be.true();
        });

        it('should return true given list with date of the form D/M', () => {
            const holidayList: string[] = [
                '7/4'
            ];
            const bundle = {
                inputData: {
                    holiday_list: holidayList
                }
            };

            const isHoliday = Utilities.ValidateHolidayList(bundle);

            should(isHoliday).be.true();
        });

        it('should return true given list with date of the form DD/M', () => {
            const holidayList: string[] = [
                '07/4'
            ];
            const bundle = {
                inputData: {
                    holiday_list: holidayList
                }
            };

            const isHoliday = Utilities.ValidateHolidayList(bundle);

            should(isHoliday).be.true();
        });

        it('should return true given list with a holiday name', () => {
            const holidayList: string[] = [
                'Christmas'
            ];
            const bundle = {
                inputData: {
                    holiday_list: holidayList
                }
            };

            const isHoliday = Utilities.ValidateHolidayList(bundle);

            should(isHoliday).be.true();
        });

        it('should return true given list with a holiday name', () => {
            const holidayList: string[] = [
                'Black Friday'
            ];
            const bundle = {
                inputData: {
                    holiday_list: holidayList
                }
            };

            const isHoliday = Utilities.ValidateHolidayList(bundle);

            should(isHoliday).be.true();
        });

        it('should return true given list with a holiday name', () => {
            const holidayList: string[] = [
                'New Year\'s Day'
            ];
            const bundle = {
                inputData: {
                    holiday_list: holidayList
                }
            };

            const isHoliday = Utilities.ValidateHolidayList(bundle);

            should(isHoliday).be.true();
        });

        it('should return true given list with a holiday name', () => {
            const holidayList: string[] = [
                'Martin Luther King, Jr. Day'
            ];
            const bundle = {
                inputData: {
                    holiday_list: holidayList
                }
            };

            const isHoliday = Utilities.ValidateHolidayList(bundle);

            should(isHoliday).be.true();
        });

        it('should return true given list with a holiday with leading whitespace', () => {
            const holidayList: string[] = [
                '            New Year\'s Day'
            ];
            const bundle = {
                inputData: {
                    holiday_list: holidayList
                }
            };

            const isHoliday = Utilities.ValidateHolidayList(bundle);

            should(isHoliday).be.true();
        });

        it('should return true given list with a holiday with trailing whitespace', () => {
            const holidayList: string[] = [
                'New Year\'s Day                                  '
            ];
            const bundle = {
                inputData: {
                    holiday_list: holidayList
                }
            };

            const isHoliday = Utilities.ValidateHolidayList(bundle);

            should(isHoliday).be.true();
        });

        it('should return true given list with mixed holidays', () => {
            const holidayList: string[] = [
                'New Year\'s Day',
                'Christmas',
                '07/04',
                'Black Friday',
                '1/1'
            ];
            const bundle = {
                inputData: {
                    holiday_list: holidayList
                }
            };

            const isHoliday = Utilities.ValidateHolidayList(bundle);

            should(isHoliday).be.true();
        });
    });

    describe('IsDateInHolidayList', () => {
        it('should return false given empty holiday list', () => {
            const date = new Date('2019-01-01');
            const holidayList: string[] = [];
            const bundle = {
                inputData: {
                    holiday_list: holidayList,
                    date: date
                }
            };

            const isHoliday = Utilities.IsDateInHolidayList(bundle);

            should(isHoliday).be.false();
        });

        it('should return true given holiday is in holiday list', () => {
            const date: moment.Moment = moment('2019-01-01');
            const holidayList: string[] = [
                '01/01'
            ];
            const bundle = {
                inputData: {
                    holiday_list: holidayList,
                    input_date: date.toDate()
                }
            };

            const isHoliday = Utilities.IsDateInHolidayList(bundle);

            should(isHoliday).be.true();
        });

        it('should return true given holiday is in holiday list among many', () => {
            const date: moment.Moment = moment('2019-01-01');
            const holidayList: string[] = [
                'New Year\'s Day',
                '01/01',
                'Black Friday',
                '07/04'
            ];
            const bundle = {
                inputData: {
                    holiday_list: holidayList,
                    input_date: date.toDate()
                }
            };

            const isHoliday = Utilities.IsDateInHolidayList(bundle);

            should(isHoliday).be.true();
        });
    });

    describe('CleanHolidayList', () => {
        it('should return empty list given empty list', () => {
            const input: string[] = [];

            const cleanedHolidays = Utilities.CleanHolidayList(input);

            should(cleanedHolidays.length).eql(0);
        });

        it('should trim leading whitespace', () => {
            const expectedHoliday = 'Kwanza';
            const input: string[] = [
                `              ${expectedHoliday}`
            ];

            const cleanedHolidays = Utilities.CleanHolidayList(input);
            const actualHoliday = cleanedHolidays[0];

            should(actualHoliday).eql(expectedHoliday);
        });

        it('should trim trailing whitespace', () => {
            const expectedHoliday = 'Kwanza';
            const input: string[] = [
                `${expectedHoliday}            `
            ];

            const cleanedHolidays = Utilities.CleanHolidayList(input);
            const actualHoliday = cleanedHolidays[0];

            should(actualHoliday).eql(expectedHoliday);
        });

        it('should trim any whitespace', () => {
            const expectedHoliday = 'Kwanza';
            const input: string[] = [
                `              ${expectedHoliday}                      `
            ];

            const cleanedHolidays = Utilities.CleanHolidayList(input);
            const actualHoliday = cleanedHolidays[0];

            should(actualHoliday).eql(expectedHoliday);
        });

        it('should format static dates in MM/DD form', () => {
            const expectedHoliday = '12/25';
            const input: string[] = [
                '12/25'
            ];

            const cleanedHolidays = Utilities.CleanHolidayList(input);
            const actualHoliday = cleanedHolidays[0];

            should(actualHoliday).eql(expectedHoliday);
        });

        it('should format static dates in MM/DD form', () => {
            const expectedHoliday = '02/14';
            const input: string[] = [
                '2/14'
            ];

            const cleanedHolidays = Utilities.CleanHolidayList(input);
            const actualHoliday = cleanedHolidays[0];

            should(actualHoliday).eql(expectedHoliday);
        });

        it('should format static dates in MM/DD form', () => {
            const expectedHoliday = '01/01';
            const input: string[] = [
                '1/1'
            ];

            const cleanedHolidays = Utilities.CleanHolidayList(input);
            const actualHoliday = cleanedHolidays[0];

            should(actualHoliday).eql(expectedHoliday);
        });

        it('should format static dates in MM/DD form', () => {
            const expectedHoliday = '01/01';
            const input: string[] = [
                '01/1'
            ];

            const cleanedHolidays = Utilities.CleanHolidayList(input);
            const actualHoliday = cleanedHolidays[0];

            should(actualHoliday).eql(expectedHoliday);
        });

        it('should format static dates in MM/DD form given mixed holiday list', () => {
            const expectedHoliday = '02/14';
            const input: string[] = [
                '2/14',
                'Christmas'
            ];

            const cleanedHolidays = Utilities.CleanHolidayList(input);
            const actualHoliday = cleanedHolidays[0];

            should(actualHoliday).eql(expectedHoliday);
        });
    });
});