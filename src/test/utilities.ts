import * as should from 'should';
import { Bundle } from 'zapier-platform-core';
import Utilities from '../utilities';

describe('Utilities', () => {
    describe('validateHolidayList', () => {
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
                '4th of July'
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
});