'use strict';

import { Schema } from 'mongoose';
import { IFAQ } from '../../type/faqType';

const FAQSchema = new Schema<IFAQ>({
    question: { type: String, required: true },
    answer: { type: String, required: true }
});

export default FAQSchema;
