const tourRouter = require('./tour.routes');
const topDestinationRouter = require('./top_destinations.routes');
const faqRouter = require('./faq.routes');
const messageRouter = require('./messages.routes');
const userRouter = require('./user.routes');
const billingRouter = require('./billing.routes');
const emailRouter = require('./email.routes');

module.exports = (app) => {
    app.use('/api/tours', tourRouter);
    app.use('/api/top-destinations', topDestinationRouter);
    app.use('/api/faqs', faqRouter);
    app.use('/api/messages', messageRouter);
    app.use('/api/users', userRouter);
    app.use('/api/billing', billingRouter);
    app.use('/api/email', emailRouter);
}