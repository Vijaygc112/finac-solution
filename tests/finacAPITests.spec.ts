import { test, expect } from '@playwright/test'
import ApiUtils from './pageObjects/apiUtils'

test.use(
    {
        baseURL: 'https://reqres.in/'
    }
)

test('1. Get call validation', async ({ request }) => {
    const statusCode = await ApiUtils.getCall(request, 'api/users');
    expect(statusCode).toBe(200);
});