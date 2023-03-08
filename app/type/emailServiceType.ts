'use strict';

import { ISendEmailInfo } from './IEmailContext';

export type SendEmailFunc = (data: ISendEmailInfo) => Promise<void>;
