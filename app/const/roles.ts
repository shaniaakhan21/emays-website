'use strict';

export enum Roles {
    // Virtual client role when launching the e-commerce to our end 
    CLIENT = 'client',
    // Super user (Emmanuel)
    SUPER = 'super',
    // Store manager
    MANAGER = 'manager',
    // Store admin
    ADMIN = 'admin',
    // Store, Store owner
    EXTERNAL_SYSTEM = 'external_system',
    // Driver
    DRIVER = 'driver'
}
