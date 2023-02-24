'use strict';

import Logger from '../logger';

/**
 * Handler save order business logic
 * @param userEmail: string
 * @returns Promise
 */
export const saveOrder = async (
    userEmail: string
): Promise<string> => {
    try {
        Logger.info(`Order information is being saved for the user ${userEmail}.`);
        return await new Promise((resolve, reject) => {
            resolve('Data saved');
        });
    } catch (error) {
        const errorObject: Error = error as Error;
        Logger.error(`Failed to save product information.
        Error stack: ${errorObject.stack as string}.`);
        throw error;
    }
};
