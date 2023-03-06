'use strict';

import { Response } from 'express';
import ServiceError from './error/ServiceError';

export type SendErrorResponseFunc =
    (arg0: ServiceError, arg1: Response) => void;
