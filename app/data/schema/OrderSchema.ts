'use strict';

import { Schema } from 'mongoose';
import { IOrder } from '../../type/orderType';

const OrderSchema = new Schema<IOrder>({
    email: { type: String, required: true },
    retailerEmail: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    uid: { type: String, required: true, unique: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    timeZone: { type: String, required: true },
    experience: { type: String, required: true },
    address: { type: Object, required: true },
    orderItems: [{
        productName: { type: String, required: true },
        productColor: { type: String, required: true },
        productSize: { type: String, required: true },
        productQuantity: { type: Number, required: true },
        productCost: { type: String, required: true },
        productImage: { type: String, required: true },
        productDeliveryInformation: { type: String }
    }]
});

export default OrderSchema;
