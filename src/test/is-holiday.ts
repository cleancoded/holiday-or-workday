import { createAppTester } from "zapier-platform-core";
import * as should from 'should';
import * as nock from 'nock';
import * as moment from 'moment';

import App from '../index';
import Constants from "../constants";

const appTester = createAppTester(App);

describe('Holiday', () => {
    describe('isDateHoliday', () => {
        it('should return false given empty holiday list', async () => {
            const bundle = {
                inputData: {
                    holiday_list: [],
                    input_date: new Date()
                }
            };

            const result = await appTester(App.creates.is_holiday.operation.perform, bundle);

            should(result.is_holiday).be.false();
        });

        it('should return true given static date is in holiday list', async () => {
            const date = moment('2019-01-01').toDate();
            const bundle = {
                inputData: {
                    holiday_list: [
                        'Black Friday',
                        '01/01',
                        'Christmas',
                        '7/4'
                    ],
                    input_date: date
                }
            };

            const result = await appTester(App.creates.is_holiday.operation.perform, bundle);

            should(result.is_holiday).be.true();
        });

        it('should return false given no US holidays for input date', async () => {
            const expectedDay = '12';
            const expectedYear = '2019';
            const expectedMonth = '12';
            const date: Date = moment(`${expectedYear}-${expectedMonth}-${expectedDay}`).toDate();
            const bundle = {
                inputData: {
                    holiday_list: [
                    ],
                    input_date: date
                }
            };

            nock(Constants.API_BASE)
                .get('/holidays')
                .query((query: any) => {
                    const month = query.month;
                    const year = query.year;
                    const day = query.day;

                    return year === expectedYear &&
                        month === expectedMonth &&
                        day === expectedDay;
                })
                .reply(200, {
                    status: 200,
                    holidays: []
                });

            const result = await appTester(App.creates.is_holiday.operation.perform, bundle);

            should(result.is_holiday).be.false();
        });

        it('should return true given US holiday exists for input date and is in holiday list', async () => {
            const expectedDay = '25';
            const expectedYear = '2019';
            const expectedMonth = '12';
            const date: Date = moment(`${expectedYear}-${expectedMonth}-${expectedDay}`).toDate();
            const bundle = {
                inputData: {
                    holiday_list: [
                        'Christmas'
                    ],
                    input_date: date
                }
            };

            nock(Constants.API_BASE)
                .get('/holidays')
                .query((query: any) => {
                    const month = query.month;
                    const year = query.year;
                    const day = query.day;

                    return year === expectedYear &&
                        month === expectedMonth &&
                        day === expectedDay;
                })
                .reply(200, {
                    status: 200,
                    holidays: [
                        {
                            name: "Christmas",
                            country: "US",
                            date: "2019-12-25"
                        }
                    ]
                });

            const result = await appTester(App.creates.is_holiday.operation.perform, bundle);

            should(result.is_holiday).be.true();
        });

        it('should return true given US holiday exists for input date and is in holiday list', async () => {
            const expectedDay = '25';
            const expectedYear = '2019';
            const expectedMonth = '12';
            const date: Date = moment(`${expectedYear}-${expectedMonth}-${expectedDay}`).toDate();
            const bundle = {
                inputData: {
                    holiday_list: [
                        'Christmas',
                        'New Year\'s Day'
                    ],
                    input_date: date
                }
            };

            nock(Constants.API_BASE)
                .get('/holidays')
                .query((query: any) => {
                    const month = query.month;
                    const year = query.year;
                    const day = query.day;

                    return year === expectedYear &&
                        month === expectedMonth &&
                        day === expectedDay;
                })
                .reply(200, {
                    status: 200,
                    holidays: [
                        {
                            name: "Some Holiday",
                            country: "US",
                            date: "2019-12-25"
                        },
                        {
                            name: "Christmas",
                            country: "US",
                            date: "2019-12-25"
                        }
                    ]
                });

            const result = await appTester(App.creates.is_holiday.operation.perform, bundle);

            should(result.is_holiday).be.true();
        });
    });
});