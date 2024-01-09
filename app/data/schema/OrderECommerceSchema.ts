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
    branchId: { type: String, required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    timeZone: { type: String, required: true },
    experience: { type: String, required: true },
    address: { type: Object, required: true },
    payed: { type: Boolean, default: false },
    deliveryInfo: { type: String, required: true },
    orderItems: [{
        productName: { type: String, required: true },
        productColor: { type: String, required: true },
        productSize: { type: String, required: true },
        productQuantity: { type: Number, required: true },
        productCost: { type: String, required: true },
        productImage: { type: String, required: true },
        productDeliveryInformation: { type: String }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    isPrepared: { type: Boolean, default: false },
    preparedDate: { type: Date, default: null },
    isDelivered: { type: Boolean, default: false },
    deliveredDate: { type: Date, default: null },
    isCanceled: { type: Boolean, default: false },
    canceledDate: { type: Date, default: null },
    isDriverPicked: { type: Boolean, default: false },
    driverPickDate: { type: Date, default: null },
    isDriverApproved: { type: Boolean, default: false },
    driverApprovedDate: { type: Date, default: null },
    driverId: { type: String, required: false, default: '' },
    history: [{
        date: { type: Date, default: Date.now }
    }],
    paymentRef: { type: String, required: false, default: '' },
    paymentRefEndPayment: { type: String, required: false, default: '' },
    serviceFee: { type: Number, require: false, default: 0 },
    currencyType: { type: String, required: true },
    serviceArea: { type: String, required: true },
    payedDate: { type: Date, default: null },
    driverSelectedItems: { type: Array, required: false, default: [] }
});

export default OrderSchema;
