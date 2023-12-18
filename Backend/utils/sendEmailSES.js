const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");
require("dotenv").config();
const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};

let region = process.env.AWS_REGION;
console.log("Region : ", region);
console.log("Access Key : ", credentials.accessKeyId);
const ses = new SESClient({ region, credentials });

const sendWelcomeEmail = async (recipientEmail, name) => {
  let params = {
    Source: "gokulmsfag@gmail.com",
    Destination: {
      ToAddresses: [recipientEmail],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `<div
      class="navbar"
      style="background-color: #228be6; text-align: center; padding: 10px"
    >
      <h1 class="color-primary" style="color: #fff">Aves Air</h1>
    </div>
    <div
      class="container"
      style="
        width: 80%;
        margin: 0 auto;
        background-repeat: no-repeat;
        background-position: center;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
      "
    >
      <p
        class="text template"
        style="
          font-size: 1.2rem;
          line-height: 1.5;
          margin-top: 20px;
          position: absolute;
          text-align: center;
        "
      >
        Hi ${name} 🤩 , Welcome to <b> Aves Air </b> , your one-stop solution
        for seamless flight bookings! We are thrilled to have you on board and
        ready to take you on an incredible journey in the skies .
      </p>
    </div>
    <div>
      <p class="" style="text-align: center; font-size: 0.8rem">
        © 2023 Aves Air. All rights reserved.
      </p>
    </div>`,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Welcome to Aves Air",
      },
    },
  };

  try {
    const sendEmailCommand = new SendEmailCommand(params);
    const res = await ses.send(sendEmailCommand);
  } catch (err) {
    console.log(err);
  }
};

const sendBookingConfirmation = async (recipientEmail, name, booking) => {
  let params = {
    Source: "gokulmsfag@gmail.com",
    Destination: {
      ToAddresses: [recipientEmail],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `<div style="background-color: #228be6; text-align: center; padding: 3px">
      <h1 style="color: #fff">Aves Air</h1>
    </div>
    <div>
      <p>
        Congratulations! Your flight booking with Aves Air has been confirmed!
        We are excited to have you as our valued passenger on your upcoming
        journey.
      </p>
      <p>Your booking is confirmed.</p>
      <div
        style="
          box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
          width: 500px;
          padding: 1rem;
        "
      >
        <p style="font-weight: bold">ID : ${booking._id}</p>
        <p style="font-weight: bold">
          Seats : ${booking.seatNumbers.toString()}
        </p>
        <p style="font-weight: bold">Price : ${booking.price}</p>
        <p>
          Thank you for choosing Aves Air for your journey. We look forward to
          welcoming you onboard!
        </p>
      </div>
      <p>Happy Journey</p>
      <p>By Aves Air Team</p>
    </div>`,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Aves Air - Booking Confirmation",
      },
    },
  };

  try {
    const sendEmailCommand = new SendEmailCommand(params);
    const res = await ses.send(sendEmailCommand);
  } catch (err) {
    console.log(err);
  }
};

const sendBookingCancellation = async (recipientEmail, name) => {
  let params = {
    Source: "gokulmsfag@gmail.com",
    Destination: {
      ToAddresses: [recipientEmail],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `<div style="background-color: #228be6; text-align: center; padding: 3px">
      <h1 style="color: #fff">Aves Air</h1>
    </div>
    <div>
    <p style="font-size: 1.2rem; font-weight: bold; text-align: center">
      This is to inform you that your flight booking with Aves Air has been
      successfully cancelled. We understand that plans can change, and we
      appreciate you choosing our services for your travel needs.
    </p>
    <p>Thank you for choosing Aves Air, and we wish you smooth travels ahead.</p>
    <p>By Aves Air Team</p>
    <div>
      <p class="" style="text-align: center; font-size: 0.8rem">
        © 2023 Aves Air. All rights reserved.
      </p>
    </div>`,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Aves Air - Booking Cancellation",
      },
    },
  };

  try {
    const sendEmailCommand = new SendEmailCommand(params);
    const res = await ses.send(sendEmailCommand);
  } catch (err) {
    console.log(err);
  }
};

const sendFlightCancellation = async (recipientEmail, name) => {
  let params = {
    Source: "gokulmsfag@gmail.com",
    Destination: {
      ToAddresses: [recipientEmail],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `<div style="background-color: #228be6; text-align: center; padding: 3px">
      <h1 style="color: #fff">Aves Air</h1>
    </div>
    <div>
    <p style="font-size: 1.2rem; font-weight: bold; text-align: center">
      This is to inform you that your flight booking with Aves Air has been
      successfully cancelled. We understand that plans can change, and we
      appreciate you choosing our services for your travel needs.
    </p>
    <p>Thank you for choosing Aves Air, and we wish you smooth travels ahead.</p>
    <p>By Aves Air Team</p>
    <div>
      <p class="" style="text-align: center; font-size: 0.8rem">
        © 2023 Aves Air. All rights reserved.
      </p>
    </div>`,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Aves Air - Flight Cancellation",
      },
    },
  };

  try {
    const sendEmailCommand = new SendEmailCommand(params);
    const res = await ses.send(sendEmailCommand);
  } catch (err) {
    console.log(err);
  }
};

const sendPasswordReset = async (recipientEmail, url) => {
  let params = {
    Source: "gokulmsfag@gmail.com",
    Destination: {
      ToAddresses: [recipientEmail],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `<h3>Click on the link to reset your password.</h3>
                <a href=" ${url}">Reset Password</a>`,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Aves Air - Password Reset",
      },
    },
  };

  try {
    const sendEmailCommand = new SendEmailCommand(params);
    const res = await ses.send(sendEmailCommand);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  sendWelcomeEmail,
  sendBookingConfirmation,
  sendBookingCancellation,
  sendFlightCancellation,
  sendPasswordReset,
};
