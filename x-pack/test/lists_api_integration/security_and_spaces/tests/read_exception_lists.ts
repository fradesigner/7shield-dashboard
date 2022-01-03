/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import expect from '@kbn/expect';

import type { ExceptionListSchema } from '@kbn/securitysolution-io-ts-list-types';
import { EXCEPTION_LIST_URL } from '@kbn/securitysolution-list-constants';
import { getExceptionResponseMockWithoutAutoGeneratedValues } from '../../../../plugins/lists/common/schemas/response/exception_list_schema.mock';
import {
  getCreateExceptionListMinimalSchemaMock,
  getCreateExceptionListMinimalSchemaMockWithoutId,
} from '../../../../plugins/lists/common/schemas/request/create_exception_list_schema.mock';
import { FtrProviderContext } from '../../common/ftr_provider_context';

import { deleteAllExceptions, removeExceptionListServerGeneratedProperties } from '../../utils';

// eslint-disable-next-line import/no-default-export
export default ({ getService }: FtrProviderContext) => {
  const supertest = getService('supertest');
  const log = getService('log');

  describe('read_exception_lists', () => {
    describe('reading exception lists', () => {
      afterEach(async () => {
        await deleteAllExceptions(supertest, log);
      });

      it('should be able to read a single exception list using list_id', async () => {
        // create a simple exception list to read
        await supertest
          .post(EXCEPTION_LIST_URL)
          .set('kbn-xsrf', 'true')
          .send(getCreateExceptionListMinimalSchemaMock())
          .expect(200);

        const { body } = await supertest
          .get(`${EXCEPTION_LIST_URL}?list_id=${getCreateExceptionListMinimalSchemaMock().list_id}`)
          .set('kbn-xsrf', 'true')
          .expect(200);

        const bodyToCompare = removeExceptionListServerGeneratedProperties(body);
        expect(bodyToCompare).to.eql(getExceptionResponseMockWithoutAutoGeneratedValues());
      });

      it('should be able to read a single exception list using id', async () => {
        // create a simple exception list to read
        const { body: createListBody } = await supertest
          .post(EXCEPTION_LIST_URL)
          .set('kbn-xsrf', 'true')
          .send(getCreateExceptionListMinimalSchemaMock())
          .expect(200);

        const { body } = await supertest
          .get(`${EXCEPTION_LIST_URL}?id=${createListBody.id}`)
          .set('kbn-xsrf', 'true')
          .expect(200);

        const bodyToCompare = removeExceptionListServerGeneratedProperties(body);
        expect(bodyToCompare).to.eql(getExceptionResponseMockWithoutAutoGeneratedValues());
      });

      it('should be able to read a single list with an auto-generated list_id', async () => {
        // create a simple exception list to read
        const { body: createListBody } = await supertest
          .post(EXCEPTION_LIST_URL)
          .set('kbn-xsrf', 'true')
          .send(getCreateExceptionListMinimalSchemaMockWithoutId())
          .expect(200);

        const { body } = await supertest
          .get(`${EXCEPTION_LIST_URL}?list_id=${createListBody.list_id}`)
          .set('kbn-xsrf', 'true')
          .expect(200);

        const outputtedList: Partial<ExceptionListSchema> = {
          ...getExceptionResponseMockWithoutAutoGeneratedValues(),
          list_id: body.list_id,
        };

        const bodyToCompare = removeExceptionListServerGeneratedProperties(body);
        expect(bodyToCompare).to.eql(outputtedList);
      });

      it('should return 404 if given a fake id', async () => {
        const { body } = await supertest
          .get(`${EXCEPTION_LIST_URL}?id=c1e1b359-7ac1-4e96-bc81-c683c092436f`)
          .set('kbn-xsrf', 'true')
          .expect(404);

        expect(body).to.eql({
          status_code: 404,
          message: 'exception list id: "c1e1b359-7ac1-4e96-bc81-c683c092436f" does not exist',
        });
      });

      it('should return 404 if given a fake list_id', async () => {
        const { body } = await supertest
          .get(`${EXCEPTION_LIST_URL}?list_id=c1e1b359-7ac1-4e96-bc81-c683c092436f`)
          .set('kbn-xsrf', 'true')
          .expect(404);

        expect(body).to.eql({
          status_code: 404,
          message: 'exception list list_id: "c1e1b359-7ac1-4e96-bc81-c683c092436f" does not exist',
        });
      });
    });
  });
};