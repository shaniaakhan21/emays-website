'use strict';

export type CreateLoginFunc = (username: string) => Promise<boolean>;
