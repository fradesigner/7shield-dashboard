/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { Request, Server } from '@hapi/hapi';
import { Logger } from 'kibana/server';
import { DEFAULT_APP_CATEGORIES } from '../../../../src/core/server';
import { PLUGIN } from '../common/constants/plugin';
import { compose } from './lib/compose/kibana';
import { initUptimeServer } from './uptime_server';
import { UptimeCorePlugins, UptimeCoreSetup } from './lib/adapters/framework';
import { umDynamicSettings } from './lib/saved_objects/uptime_settings';
import { UptimeRuleRegistry } from './plugin';

export interface KibanaRouteOptions {
  path: string;
  method: string;
  vhost?: string | string[];
  handler: (request: Request) => any;
  options: any;
}

export interface KibanaServer extends Server {
  route: (options: KibanaRouteOptions) => void;
}

export const initServerWithKibana = (
  server: UptimeCoreSetup,
  plugins: UptimeCorePlugins,
  ruleRegistry: UptimeRuleRegistry,
  logger: Logger
) => {
  const { features } = plugins;
  const libs = compose(server);

  features.registerKibanaFeature({
    id: PLUGIN.ID,
    name: PLUGIN.NAME,
    order: 1000,
    category: DEFAULT_APP_CATEGORIES.observability,
    app: ['uptime', 'kibana'],
    catalogue: ['uptime'],
    management: {
      insightsAndAlerting: ['triggersActions'],
    },
    alerting: [
      'xpack.uptime.alerts.tls',
      'xpack.uptime.alerts.tlsCertificate',
      'xpack.uptime.alerts.monitorStatus',
      'xpack.uptime.alerts.durationAnomaly',
    ],
    privileges: {
      all: {
        app: ['uptime', 'kibana'],
        catalogue: ['uptime'],
        api: ['uptime-read', 'uptime-write', 'lists-all'],
        savedObject: {
          all: [umDynamicSettings.name, 'alert'],
          read: [],
        },
        alerting: {
          rule: {
            all: [
              'xpack.uptime.alerts.tls',
              'xpack.uptime.alerts.tlsCertificate',
              'xpack.uptime.alerts.monitorStatus',
              'xpack.uptime.alerts.durationAnomaly',
            ],
          },
          alert: {
            all: [
              'xpack.uptime.alerts.tls',
              'xpack.uptime.alerts.tlsCertificate',
              'xpack.uptime.alerts.monitorStatus',
              'xpack.uptime.alerts.durationAnomaly',
            ],
          },
        },
        management: {
          insightsAndAlerting: ['triggersActions'],
        },
        ui: ['save', 'configureSettings', 'show', 'alerting:save'],
      },
      read: {
        app: ['uptime', 'kibana'],
        catalogue: ['uptime'],
        api: ['uptime-read', 'lists-read'],
        savedObject: {
          all: ['alert'],
          read: [umDynamicSettings.name],
        },
        alerting: {
          rule: {
            read: [
              'xpack.uptime.alerts.tls',
              'xpack.uptime.alerts.tlsCertificate',
              'xpack.uptime.alerts.monitorStatus',
              'xpack.uptime.alerts.durationAnomaly',
            ],
          },
          alert: {
            read: [
              'xpack.uptime.alerts.tls',
              'xpack.uptime.alerts.tlsCertificate',
              'xpack.uptime.alerts.monitorStatus',
              'xpack.uptime.alerts.durationAnomaly',
            ],
          },
        },
        management: {
          insightsAndAlerting: ['triggersActions'],
        },
        ui: ['show', 'alerting:save'],
      },
    },
  });

  initUptimeServer(server, libs, plugins, ruleRegistry, logger);
};