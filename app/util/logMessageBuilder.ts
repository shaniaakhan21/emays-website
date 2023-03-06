'use strict';

import { BuildErrorMessageFunc, BuildSuccessMessageFunc } from '../type/logMessageBuilderType';

/**
 * Generate error log message
 * @param {OrderServiceError} error Error object
 * @param {string} action Action failed
 * @returns {string} Error log message
 */
export const buildErrorMessage: BuildErrorMessageFunc = (error, action) => {
    return `Failed to complete ${action} due to error ${error.message}.`;
};

/**
 * Generate route is being hit log message
 * @param {string} routePath Route path
 * @param {sting} information More information
 * @returns {string} Success log message
 */
export const buildInfoMessageRouteHit: BuildSuccessMessageFunc = (routePath, information) => {
    return `${routePath} route is being called for ${information}.`;
};

/**
 * Generate method is being hit log message
 * @param {string} routePath Route path
 * @param {sting} information More information
 * @returns {string} Success log message
 */
export const buildInfoMessageMethodCall: BuildSuccessMessageFunc = (routePath, information) => {
    return `${routePath} is being called for ${information}.`;
};

/**
 * Generate process completed log message
 * @param {string} process Process that completed
 * @param {string} information More information
 * @returns {string} Success log message
 */
export const buildInfoMessageUserProcessCompleted: BuildSuccessMessageFunc = (process, information) => {
    return `${process} has been completed for ${information}.`;
};
