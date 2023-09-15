const { Invoice } = require('../../database/models')

const successfulPurchase = async (req, res) => {
  try {
    const {patientEmail,medicEmail,medicFullname,patientFullname,invoiceId} = req.query

    //First, Update the Invoice with the status accepted
    await Invoice.update(
      {
      status: 'canceled'
      },
      {
        where: {
          id: invoiceId
        }
      })

    //Afterward, send emails for the invoice creation to both patients and medic
    /* await sendEmail(res, medicEmail, `Invoice #${invoiceId} Update`, templateInvoice(invoiceId,'Accepted',medicFullname))
    await sendEmail(res, patientEmail, `Invoice #${invoiceId} Update`, templateInvoice(invoiceId,'Accepted',patientFullname)) */

    return res.redirect(`${process.env.NODE_ENV == "development" ? process.env.DEV_STRIPE_FE_PAGE_SUCCESS : process.env.PRO_STRIPE_FE_PAGE_SUCCESS}?result=success`);
  } catch (error) {
    return res.status(400).json({ message: error.message, error: "Success Stripe" });
  }
};

module.exports = {
  successfulPurchase
};