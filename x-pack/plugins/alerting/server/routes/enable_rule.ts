/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { IRouter } from 'kibana/server';
import { schema } from '@kbn/config-schema';
import { ILicenseState, AlertTypeDisabledError } from '../lib';
import { verifyAccessAndContext } from './lib';
import { AlertingRequestHandlerContext, BASE_ALERTING_API_PATH } from '../types';

const paramSchema = schema.object({
  id: schema.string(),
});

export const enableRuleRoute = (
  router: IRouter<AlertingRequestHandlerContext>,
  licenseState: ILicenseState
) => {
  router.post(
    {
      path: `${BASE_ALERTING_API_PATH}/rule/{id}/_enable`,
      validate: {
        params: paramSchema,
      },
    },
    router.handleLegacyErrors(
      verifyAccessAndContext(licenseState, async function (context, req, res) {
        const rulesClient = context.alerting.getRulesClient();
        const { id } = req.params;
        try {
          await rulesClient.enable({ id });
          return res.noContent();
        } catch (e) {
          if (e instanceof AlertTypeDisabledError) {
            return e.sendResponse(res);
          }
          throw e;
        }
      })
    )
  );
};