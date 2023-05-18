package com.example.bloodbank.service.messagehandler.messagefactory;

import com.example.bloodbank.service.messagehandler.messagesender.MailSender;
import com.example.bloodbank.service.messagehandler.messagesender.MessageSender;
import com.example.bloodbank.service.messagehandler.messagesender.SMSSender;
import com.example.bloodbank.types.ReminderType;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MessageSenderFactory {

    private final JavaMailSender javaMailSender;

    public MessageSenderFactory(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public MessageSender create(ReminderType type){
        if(type.equals(ReminderType.EMAIL)) {
            return new MailSender(javaMailSender);
        }else{
            return new SMSSender();
        }
    }
}
