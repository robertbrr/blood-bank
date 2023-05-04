package com.example.bloodbank.service.messagehandler.messagesender;

import com.example.bloodbank.service.messagehandler.Message;
import com.twilio.Twilio;

import com.twilio.type.PhoneNumber;

public class SMSSender implements MessageSender{
    @Override
    public void send(Message message) {
        Twilio.init("username", "password");
        com.twilio.rest.api.v2010.account.Message twilioSMS = com.twilio.rest.api.v2010.account.Message.creator(
                        //to
                        new PhoneNumber("sender"),
                        //from
                        new PhoneNumber(message.getRecipient()),
                        //body
                        message.getText())
                .create();
    }
}
