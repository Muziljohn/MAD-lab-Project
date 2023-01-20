import React from "react";

import * as Yup from "yup";

import { Form, FormField, SubmitButton } from "./forms";

function ContactSellerForm({ listing }) {
  return (
    <Form
      initialValues={{ message: "" }}
      onSubmit={() => {
        console.log("");
      }}
      validationSchema={validationSchema}
    >
      <FormField
        maxLength={255}
        multiline
        name="message"
        numberOfLines={3}
        placeholder="Message..."
      />
      <SubmitButton title="Contact Seller" />
    </Form>
  );
}

const validationSchema = Yup.object().shape({
  message: Yup.string().required().min(1).label("Message"),
});

export default ContactSellerForm;
